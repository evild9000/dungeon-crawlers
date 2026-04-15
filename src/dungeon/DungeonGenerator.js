/**
 * DungeonGenerator — provides the dungeon layout as a 2D grid.
 *
 * Cell values:  0 = floor (walkable),  1 = wall (solid)
 *
 * The map is hand-crafted for the initial release.
 * Future versions can swap in procedural generation here without
 * touching the renderer, collision, or entity code.
 */

// 20 × 20 grid — an asymmetric dungeon with varied room sizes,
// corridors, pillars, and multiple routes between areas.
const MAP = [
    // 0  1  2  3  4  5  6  7  8  9 10 11 12 13 14 15 16 17 18 19
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], // 0
    [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1], // 1
    [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1], // 2
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], // 3
    [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1], // 4
    [1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1], // 5
    [1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1], // 6
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], // 7
    [1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1], // 8
    [1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1], // 9
    [1, 1, 0, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 0, 1, 1], // 10
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], // 11
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], // 12
    [1, 0, 0, 1, 1, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 1, 1, 0, 0, 1], // 13
    [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1], // 14
    [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1], // 15
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], // 16
    [1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1], // 17
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], // 18
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], // 19
];

/*
 * Layout key:
 *   Rows 1-4,  Cols 1-4   — Entry Chamber (top-left)
 *   Rows 1-4,  Cols 6-13  — Grand Hall (top-center, wide open)
 *   Rows 1-4,  Cols 15-18 — Guard Room (top-right)
 *   Row 5                 — Divider wall with three doorways
 *   Rows 6-9              — Mid-section with pillars & alcoves
 *   Row 10                — Narrow divider with side openings
 *   Rows 11-12            — Wide central corridor
 *   Rows 13-17            — Southern wing with two side chambers
 *   Row 16                — Open crossroads (player start)
 *   Rows 17-18            — Southern hall with structural pillars
 */

// Player spawn (grid coords) — center of the open crossroads
export const PLAYER_START = { x: 9, z: 16 };

// Torch positions (grid coords of nearby floor cells)
// Placed to illuminate rooms and key intersections.
export const TORCH_POSITIONS = [
    // Entry Chamber
    { x: 1, z: 1 },
    { x: 4, z: 4 },
    // Grand Hall
    { x: 8, z: 2 },
    { x: 12, z: 2 },
    // Guard Room
    { x: 18, z: 1 },
    { x: 15, z: 4 },
    // Mid-section corridors
    { x: 1, z: 7 },
    { x: 18, z: 7 },
    // Central area
    { x: 9, z: 9 },
    { x: 10, z: 9 },
    // Wide corridor
    { x: 4, z: 12 },
    { x: 15, z: 12 },
    // Southern chambers
    { x: 2, z: 15 },
    { x: 17, z: 15 },
    // Player start area
    { x: 9, z: 18 },
];

export function getDungeonData() {
    return {
        map: MAP,
        rows: MAP.length,
        cols: MAP[0].length,
        playerStart: PLAYER_START,
        torchPositions: TORCH_POSITIONS,
    };
}
