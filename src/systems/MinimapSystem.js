/**
 * MinimapSystem — tracks which dungeon cells the party has explored.
 *
 * Exploration is per-dungeon-level: descending to level 2 doesn't reveal
 * level 1's fog and vice versa. Each level's grid is stored as a flat
 * Uint8Array (1 byte per cell) for memory efficiency, with 1 = explored,
 * 0 = fog-of-war.
 *
 * Exploration is revealed in a small radius around the player each frame
 * so moving through a corridor naturally fills in the area around you.
 * We do a simple axis-aligned reveal (no line-of-sight raycasting) —
 * walls still render black on the minimap so the shape of the dungeon
 * reads clearly, but you won't see *through* walls because the far side
 * of a wall isn't flagged until you physically move there.
 */

export const MINIMAP_REVEAL_RADIUS = 3; // cells in each direction (Chebyshev)

export class MinimapSystem {
    constructor() {
        /**
         * Map<dungeonLevel, { rows, cols, data: Uint8Array }>
         * `data` is a flat row-major grid: data[z * cols + x].
         */
        this.levels = new Map();
    }

    /**
     * Ensure a grid exists for the given dungeon level & dimensions.
     * If one already exists at different dimensions, it's replaced
     * (dungeon regenerated or a corrupt save).
     */
    ensureLevel(level, rows, cols) {
        const existing = this.levels.get(level);
        if (existing && existing.rows === rows && existing.cols === cols) return existing;
        const fresh = { rows, cols, data: new Uint8Array(rows * cols) };
        this.levels.set(level, fresh);
        return fresh;
    }

    /**
     * Reveal a circle of cells around the given grid coordinate on the
     * given level. `radius` defaults to MINIMAP_REVEAL_RADIUS. Cells
     * outside the grid are silently ignored.
     */
    reveal(level, gx, gz, radius = MINIMAP_REVEAL_RADIUS) {
        const g = this.levels.get(level);
        if (!g) return;
        const { rows, cols, data } = g;
        const x0 = Math.max(0, gx - radius);
        const x1 = Math.min(cols - 1, gx + radius);
        const z0 = Math.max(0, gz - radius);
        const z1 = Math.min(rows - 1, gz + radius);
        for (let z = z0; z <= z1; z++) {
            for (let x = x0; x <= x1; x++) {
                data[z * cols + x] = 1;
            }
        }
    }

    /** Returns the Uint8Array grid for a level, or null if absent. */
    getGrid(level) {
        return this.levels.get(level) || null;
    }

    /**
     * Returns true if the given cell has been explored on this level.
     * Returns false if the level isn't tracked at all.
     */
    isExplored(level, gx, gz) {
        const g = this.levels.get(level);
        if (!g) return false;
        if (gx < 0 || gx >= g.cols || gz < 0 || gz >= g.rows) return false;
        return g.data[gz * g.cols + gx] === 1;
    }

    // ── Serialization ──────────────────────────────────────────────
    // Store each grid as an object { rows, cols, data: number[] } so it
    // round-trips through JSON / IndexedDB. Uint8Array doesn't survive
    // a JSON trip directly.
    serialize() {
        const out = {};
        for (const [level, g] of this.levels.entries()) {
            out[level] = {
                rows: g.rows,
                cols: g.cols,
                data: Array.from(g.data),
            };
        }
        return out;
    }

    restore(serialized) {
        this.levels.clear();
        if (!serialized || typeof serialized !== 'object') return;
        for (const key of Object.keys(serialized)) {
            const lvl = Number(key);
            if (!Number.isFinite(lvl)) continue;
            const g = serialized[key];
            if (!g || typeof g !== 'object') continue;
            const { rows, cols, data } = g;
            if (!Array.isArray(data) || data.length !== rows * cols) continue;
            this.levels.set(lvl, {
                rows: rows | 0,
                cols: cols | 0,
                data: Uint8Array.from(data),
            });
        }
    }
}
