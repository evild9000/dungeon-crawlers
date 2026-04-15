import { CELL_SIZE, PLAYER_RADIUS } from '../utils/constants.js';

export class CollisionSystem {
    constructor(dungeonMap) {
        this.map = dungeonMap;
    }

    /** Returns true if the given world-space position is walkable. */
    isWalkable(worldX, worldZ) {
        const gx = Math.floor(worldX / CELL_SIZE);
        const gz = Math.floor(worldZ / CELL_SIZE);
        // Out-of-bounds counts as wall
        if (gz < 0 || gz >= this.map.length) return false;
        if (gx < 0 || gx >= this.map[0].length) return false;
        return this.map[gz][gx] === 0;
    }

    /**
     * Check if a circle at (worldX, worldZ) with PLAYER_RADIUS
     * overlaps any wall cell.
     */
    canMoveTo(worldX, worldZ) {
        const r = PLAYER_RADIUS;
        // Check the 4 corners of the player's bounding square
        return (
            this.isWalkable(worldX - r, worldZ - r) &&
            this.isWalkable(worldX + r, worldZ - r) &&
            this.isWalkable(worldX - r, worldZ + r) &&
            this.isWalkable(worldX + r, worldZ + r)
        );
    }

    /**
     * Resolve movement with axis-independent wall sliding.
     * Returns the corrected position { x, z }.
     */
    resolveMovement(currentX, currentZ, desiredX, desiredZ) {
        let newX = currentX;
        let newZ = currentZ;

        // Try X axis independently
        if (this.canMoveTo(desiredX, currentZ)) {
            newX = desiredX;
        }
        // Try Z axis independently (using the potentially updated X)
        if (this.canMoveTo(newX, desiredZ)) {
            newZ = desiredZ;
        }

        return { x: newX, z: newZ };
    }
}
