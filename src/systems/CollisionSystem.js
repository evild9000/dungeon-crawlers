import { CELL_SIZE, PLAYER_RADIUS, ENEMY_COLLISION_RADIUS } from '../utils/constants.js';

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
     * Check walls AND enemy proximity.
     * Returns { blocked, enemy } where `enemy` is the Enemy that blocked
     * movement (or null if blocked by a wall or not blocked at all).
     */
    checkMoveAgainstEnemies(worldX, worldZ, enemies) {
        if (!this.canMoveTo(worldX, worldZ)) {
            return { blocked: true, enemy: null };
        }

        const minDist = PLAYER_RADIUS + ENEMY_COLLISION_RADIUS;
        const minDist2 = minDist * minDist;
        for (const enemy of enemies) {
            const dx = worldX - enemy.worldX;
            const dz = worldZ - enemy.worldZ;
            if (dx * dx + dz * dz < minDist2) {
                return { blocked: true, enemy };
            }
        }
        return { blocked: false, enemy: null };
    }

    /**
     * Resolve movement with axis-independent wall sliding.
     * Returns { x, z, encounteredEnemy }.
     * `encounteredEnemy` is the first enemy that blocked the player's
     * desired movement, or null if no enemy was in the way.
     */
    resolveMovement(currentX, currentZ, desiredX, desiredZ, enemies = []) {
        let newX = currentX;
        let newZ = currentZ;
        let encounteredEnemy = null;

        // Try X axis independently
        const xCheck = this.checkMoveAgainstEnemies(desiredX, currentZ, enemies);
        if (!xCheck.blocked) {
            newX = desiredX;
        } else if (xCheck.enemy) {
            encounteredEnemy = xCheck.enemy;
        }

        // Try Z axis independently (using the potentially updated X)
        const zCheck = this.checkMoveAgainstEnemies(newX, desiredZ, enemies);
        if (!zCheck.blocked) {
            newZ = desiredZ;
        } else if (zCheck.enemy && !encounteredEnemy) {
            encounteredEnemy = zCheck.enemy;
        }

        return { x: newX, z: newZ, encounteredEnemy };
    }
}
