/**
 * DungeonGenerator — procedurally generates a DUNGEON_SIZE × DUNGEON_SIZE
 * grid per dungeon level (rooms-and-corridors, fully connected).
 *
 * Cell values:  0 = floor (walkable),  1 = wall (solid)
 *
 * Deterministic — the same dungeonLevel always produces the same layout,
 * same player start, same portals, same torches, and same traps. This keeps
 * saves reloadable and makes debugging reproducible.
 *
 * Generation pipeline (all on one LCG seeded from the dungeonLevel):
 *   1. Fill grid with walls.
 *   2. Drop DUNGEON_ROOM_ATTEMPTS randomly-sized rectangular rooms (rejected
 *      if they overlap a previous room).
 *   3. Connect every room's center to the previous room's center with an
 *      L-shaped corridor. This guarantees full connectivity.
 *   4. Choose PLAYER_START as the first room's center.
 *   5. Pick portals in far-away rooms (down always, up when level > 1).
 *   6. Scatter torches along walls adjacent to floors so every walkable
 *      cell is within TORCH_SPACING_CELLS of a torch.
 *   7. Roll TRAP_CHANCE per remaining floor cell; assign a random trap type.
 */

import {
    TRAP_CHANCE,
    TRAP_MIN_PER_LEVEL,
    TRAP_TYPES,
    DUNGEON_SIZE,
    DUNGEON_ROOM_ATTEMPTS,
    DUNGEON_ROOM_MIN,
    DUNGEON_ROOM_MAX,
    TORCH_SPACING_CELLS,
} from '../utils/constants.js';

// ──────────────────────────────────────────
// Per-level cached layout
// ──────────────────────────────────────────
const _cache = new Map();

function _lcg(seed) {
    let s = seed | 0;
    return () => {
        s = (s * 1664525 + 1013904223) | 0;
        return (s >>> 0) / 4294967296;
    };
}

function _randInt(rng, min, max) {
    return min + Math.floor(rng() * (max - min + 1));
}

function _mapFloors(map) {
    const out = [];
    for (let z = 0; z < map.length; z++) {
        for (let x = 0; x < map[0].length; x++) {
            if (map[z][x] === 0) out.push({ x, z });
        }
    }
    return out;
}

function _carveRoom(map, r) {
    for (let z = r.z; z < r.z + r.h; z++) {
        for (let x = r.x; x < r.x + r.w; x++) {
            map[z][x] = 0;
        }
    }
}

function _roomsOverlap(a, b, pad = 1) {
    return !(
        a.x + a.w + pad <= b.x ||
        b.x + b.w + pad <= a.x ||
        a.z + a.h + pad <= b.z ||
        b.z + b.h + pad <= a.z
    );
}

function _carveCorridor(map, x1, z1, x2, z2, rng) {
    // L-shaped corridor — decide which leg to do first.
    if (rng() < 0.5) {
        for (let x = Math.min(x1, x2); x <= Math.max(x1, x2); x++) map[z1][x] = 0;
        for (let z = Math.min(z1, z2); z <= Math.max(z1, z2); z++) map[z][x2] = 0;
    } else {
        for (let z = Math.min(z1, z2); z <= Math.max(z1, z2); z++) map[z][x1] = 0;
        for (let x = Math.min(x1, x2); x <= Math.max(x1, x2); x++) map[z2][x] = 0;
    }
}

/**
 * Generate the MAP + rooms[] for a dungeon level (cached).
 * @returns {{map:number[][], rooms:{x:number,z:number,w:number,h:number,cx:number,cz:number}[]}}
 */
function _buildLayout(dungeonLevel) {
    const size = DUNGEON_SIZE;
    const rng = _lcg((dungeonLevel * 2654435761) ^ 0xABCDEF01);

    // Fill with walls
    const map = [];
    for (let z = 0; z < size; z++) {
        const row = new Array(size);
        for (let x = 0; x < size; x++) row[x] = 1;
        map.push(row);
    }

    const rooms = [];
    for (let i = 0; i < DUNGEON_ROOM_ATTEMPTS; i++) {
        const w = _randInt(rng, DUNGEON_ROOM_MIN, DUNGEON_ROOM_MAX);
        const h = _randInt(rng, DUNGEON_ROOM_MIN, DUNGEON_ROOM_MAX);
        const x = _randInt(rng, 1, size - w - 2);
        const z = _randInt(rng, 1, size - h - 2);
        const r = { x, z, w, h, cx: x + (w >> 1), cz: z + (h >> 1) };
        if (rooms.some(o => _roomsOverlap(o, r, 1))) continue;
        rooms.push(r);
        _carveRoom(map, r);
    }

    // Guarantee at least a few rooms (nudge in if too sparse)
    while (rooms.length < 4) {
        const w = DUNGEON_ROOM_MIN;
        const h = DUNGEON_ROOM_MIN;
        const x = _randInt(rng, 1, size - w - 2);
        const z = _randInt(rng, 1, size - h - 2);
        const r = { x, z, w, h, cx: x + (w >> 1), cz: z + (h >> 1) };
        if (rooms.some(o => _roomsOverlap(o, r, 0))) continue;
        rooms.push(r);
        _carveRoom(map, r);
    }

    // Connect each room to the previous one → guarantees connectivity
    for (let i = 1; i < rooms.length; i++) {
        const a = rooms[i - 1];
        const b = rooms[i];
        _carveCorridor(map, a.cx, a.cz, b.cx, b.cz, rng);
    }
    // Extra corridor ring for loops (every 3rd room back to room 0)
    for (let i = 3; i < rooms.length; i += 3) {
        _carveCorridor(map, rooms[i].cx, rooms[i].cz, rooms[0].cx, rooms[0].cz, rng);
    }

    return { map, rooms };
}

function _getLayout(dungeonLevel) {
    if (!_cache.has(dungeonLevel)) _cache.set(dungeonLevel, _buildLayout(dungeonLevel));
    return _cache.get(dungeonLevel);
}

// ──────────────────────────────────────────
// Public exports
// ──────────────────────────────────────────

// `PLAYER_START` is kept for API compatibility. Cold boots (no dungeonLevel
// yet) use a safe fallback; the real per-level start is resolved inside
// `getDungeonData()` below.
export const PLAYER_START = { x: Math.floor(DUNGEON_SIZE / 2), z: Math.floor(DUNGEON_SIZE / 2) };

/** Pick portal grid positions for a given dungeon level. */
export function getPortalPositions(dungeonLevel) {
    const { map, rooms } = _getLayout(dungeonLevel);
    const rng = _lcg((dungeonLevel * 2654435761) ^ 0x13579BDF);
    const start = rooms[0];

    // Build candidate list of "far" rooms (skip the start room)
    const far = rooms.slice(1).sort((a, b) => {
        const da = Math.abs(a.cx - start.cx) + Math.abs(a.cz - start.cz);
        const db = Math.abs(b.cx - start.cx) + Math.abs(b.cz - start.cz);
        return db - da; // farthest first
    });

    // Verify candidate cell is still floor (defensive)
    const floorCell = (r) =>
        map[r.cz] && map[r.cz][r.cx] === 0 ? { x: r.cx, z: r.cz } : null;

    const down = floorCell(far[0] || start) || { x: start.cx, z: start.cz };

    let up = null;
    if (dungeonLevel > 1) {
        // Pick another far room distinct from `down`'s room
        for (const r of far) {
            const c = floorCell(r);
            if (!c) continue;
            if (Math.abs(c.x - down.x) + Math.abs(c.z - down.z) >= 8) { up = c; break; }
        }
        if (!up && far.length > 1) up = floorCell(far[1]);
        // Deterministic jitter so up/down never collide
        if (up && up.x === down.x && up.z === down.z) {
            up = { x: Math.max(1, up.x - 1), z: up.z };
        }
    }
    // Suppress unused warnings — `rng` reserved for future extensions
    void rng;
    return { down, up };
}

/**
 * Uniform torch placement: find wall cells that border a floor and place
 * torches on them so every walkable cell sits within TORCH_SPACING_CELLS
 * (Chebyshev distance) of the nearest torch. This avoids dark pockets in
 * procedurally generated rooms without requiring hand-authored positions.
 */
export function getTorchPositions(dungeonLevel) {
    const { map } = _getLayout(dungeonLevel);
    const rows = map.length, cols = map[0].length;

    const isWall  = (x, z) => x < 0 || z < 0 || x >= cols || z >= rows || map[z][x] === 1;
    const isFloor = (x, z) => !isWall(x, z);

    // Candidate torch positions: wall cells adjacent to a floor (4-neighbour)
    const candidates = [];
    for (let z = 0; z < rows; z++) {
        for (let x = 0; x < cols; x++) {
            if (!isWall(x, z)) continue;
            if (isFloor(x - 1, z) || isFloor(x + 1, z) ||
                isFloor(x, z - 1) || isFloor(x, z + 1)) {
                candidates.push({ x, z });
            }
        }
    }

    const torches = [];
    // Distance-from-nearest-torch grid, one entry per floor cell
    const coverage = Array.from({ length: rows }, () => new Array(cols).fill(Infinity));
    const uncovered = () => {
        for (let z = 0; z < rows; z++) {
            for (let x = 0; x < cols; x++) {
                if (isFloor(x, z) && coverage[z][x] > TORCH_SPACING_CELLS) return true;
            }
        }
        return false;
    };

    // Greedy cover: at each step pick the candidate that lights the most
    // currently-uncovered floor cells. Caps at a sensible upper bound so
    // perversely open levels can't spawn hundreds of lights.
    const MAX_TORCHES = Math.ceil((rows * cols) / (TORCH_SPACING_CELLS * TORCH_SPACING_CELLS * 2)) + 12;
    let guard = 0;
    while (uncovered() && torches.length < MAX_TORCHES && guard++ < MAX_TORCHES + 20) {
        let best = null, bestScore = -1;
        for (const c of candidates) {
            if (torches.some(t => t.x === c.x && t.z === c.z)) continue;
            let score = 0;
            for (let dz = -TORCH_SPACING_CELLS; dz <= TORCH_SPACING_CELLS; dz++) {
                for (let dx = -TORCH_SPACING_CELLS; dx <= TORCH_SPACING_CELLS; dx++) {
                    const nx = c.x + dx, nz = c.z + dz;
                    if (!isFloor(nx, nz)) continue;
                    if (Math.max(Math.abs(dx), Math.abs(dz)) > TORCH_SPACING_CELLS) continue;
                    if (coverage[nz][nx] > TORCH_SPACING_CELLS) score++;
                }
            }
            if (score > bestScore) { bestScore = score; best = c; }
        }
        if (!best) break;
        torches.push(best);
        for (let dz = -TORCH_SPACING_CELLS; dz <= TORCH_SPACING_CELLS; dz++) {
            for (let dx = -TORCH_SPACING_CELLS; dx <= TORCH_SPACING_CELLS; dx++) {
                const nx = best.x + dx, nz = best.z + dz;
                if (nx < 0 || nz < 0 || nx >= cols || nz >= rows) continue;
                const d = Math.max(Math.abs(dx), Math.abs(dz));
                if (d < coverage[nz][nx]) coverage[nz][nx] = d;
            }
        }
    }
    return torches;
}

/**
 * Generate the trap set for a given level. Deterministic, excludes player
 * start, portals, and their immediate neighbours. Each trap receives a
 * random type id from TRAP_TYPES.
 */
export function getTrapPositions(dungeonLevel, portalDown, portalUp, playerStart) {
    const { map } = _getLayout(dungeonLevel);
    const rows = map.length, cols = map[0].length;
    const start = playerStart || PLAYER_START;

    const rng = _lcg(((dungeonLevel * 2654435761) ^ 0x9E3779B1) | 0);
    const traps = [];

    // First pass: roll TRAP_CHANCE per eligible floor cell.
    const eligible = []; // cells that passed the exclusion filters
    for (let z = 0; z < rows; z++) {
        for (let x = 0; x < cols; x++) {
            if (map[z][x] !== 0) continue;
            if (Math.abs(x - start.x) + Math.abs(z - start.z) <= 1) continue;
            if (portalDown && portalDown.x === x && portalDown.z === z) continue;
            if (portalUp   && portalUp.x   === x && portalUp.z   === z) continue;
            eligible.push({ x, z });
            if (rng() < TRAP_CHANCE) {
                const typeIdx = Math.floor(rng() * TRAP_TYPES.length) % TRAP_TYPES.length;
                traps.push({ x, z, triggered: false, type: TRAP_TYPES[typeIdx].id });
            }
        }
    }

    // Second pass: if the RNG was stingy, top up to TRAP_MIN_PER_LEVEL by
    // picking additional random eligible cells. Keeps every level trappy
    // even when the seed rolls cold.
    const used = new Set(traps.map(t => `${t.x},${t.z}`));
    while (traps.length < TRAP_MIN_PER_LEVEL && eligible.length > used.size) {
        const pick = eligible[Math.floor(rng() * eligible.length)];
        const key = `${pick.x},${pick.z}`;
        if (used.has(key)) continue;
        used.add(key);
        const typeIdx = Math.floor(rng() * TRAP_TYPES.length) % TRAP_TYPES.length;
        traps.push({ x: pick.x, z: pick.z, triggered: false, type: TRAP_TYPES[typeIdx].id });
    }
    return traps;
}

export function getDungeonData(dungeonLevel = 1) {
    const { map, rooms } = _getLayout(dungeonLevel);
    const playerStart = { x: rooms[0].cx, z: rooms[0].cz };
    const portals = getPortalPositions(dungeonLevel);
    const torchPositions = getTorchPositions(dungeonLevel);
    const traps = getTrapPositions(dungeonLevel, portals.down, portals.up, playerStart);

    return {
        map,
        rows: map.length,
        cols: map[0].length,
        playerStart,
        torchPositions,
        dungeonLevel,
        portalDown: portals.down,
        portalUp: portals.up,
        traps,
    };
}
