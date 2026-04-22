import {
    CELL_SIZE,
    ENEMY_SPAWN_INTERVAL,
    ENEMY_MAX_COUNT,
    ENEMY_MIN_SPAWN_DISTANCE,
    ENEMY_TYPE_KEYS,
    ENEMY_TYPES,
} from '../utils/constants.js';
import { Enemy } from '../entities/Enemy.js';

/**
 * EnemyManager — spawning, movement updates, and lifecycle for all
 * enemies and NPCs in the dungeon.
 *
 * After each `update()`, check:
 *  - `encounteringEnemies` — hostile enemies that tried to enter the player's cell
 *  - `encounteringFriendlies` — friendly NPCs near the player (for shop etc.)
 */
export class EnemyManager {
    constructor(scene, dungeonMap, dungeonLevel = 1) {
        this.scene = scene;
        this.map = dungeonMap;
        this.enemies = [];
        this.dungeonLevel = Math.max(1, dungeonLevel | 0);

        /** Enemies that tried to enter the player's cell this frame. */
        this.encounteringEnemies = [];

        /** Friendly NPCs that tried to enter the player's cell this frame. */
        this.encounteringFriendlies = [];

        // Pre-compute walkable cells for fast spawn-point selection
        this._walkableCells = [];
        for (let z = 0; z < dungeonMap.length; z++) {
            for (let x = 0; x < dungeonMap[0].length; x++) {
                if (dungeonMap[z][x] === 0) {
                    this._walkableCells.push({ x, z });
                }
            }
        }

        // Phase 11: filter the spawn pool by dungeon level. Types whose
        // `maxLevel` is below this dungeon level are excluded here so every
        // spawn site (_trySpawn, forceSpawnNear) can pick uniformly.
        this._spawnableTypes = ENEMY_TYPE_KEYS.filter(k => {
            const def = ENEMY_TYPES[k] || {};
            if (typeof def.maxLevel === 'number' && this.dungeonLevel > def.maxLevel) return false;
            if (typeof def.minLevel === 'number' && this.dungeonLevel < def.minLevel) return false;
            return true;
        });
        // Safety net — if nothing passed, fall back to the full roster so
        // we never try to sample from an empty array.
        if (this._spawnableTypes.length === 0) this._spawnableTypes = ENEMY_TYPE_KEYS;
    }

    /** Restore enemies from serialised save data. */
    loadFromData(enemyDataArray) {
        for (const data of enemyDataArray) {
            const enemy = new Enemy(data);
            enemy.createSprite(this.scene);
            this.enemies.push(enemy);
        }
    }

    /** Returns the live enemy array (used for collision checks). */
    getEnemies() {
        return this.enemies;
    }

    /** Serialise all enemies for saving. */
    serializeAll() {
        return this.enemies.map(e => e.serialize());
    }

    /**
     * Spawn a batch of initial enemies (for a brand-new game).
     * @param {number} count
     * @param {number} playerGridX
     * @param {number} playerGridZ
     */
    spawnInitialEnemies(count, playerGridX, playerGridZ) {
        for (let i = 0; i < count; i++) {
            this._trySpawn(playerGridX, playerGridZ);
        }
        // Also spawn the tinkerer
        this._trySpawnTinkerer(playerGridX, playerGridZ);
    }

    /**
     * Per-frame update.
     * @returns {number} updated lastSpawnTime
     */
    update(dt, gameTime, lastSpawnTime, playerGridX, playerGridZ) {
        this.encounteringEnemies = [];
        this.encounteringFriendlies = [];

        // --- Update existing enemies (pass player grid for encounter check) ---
        for (const enemy of this.enemies) {
            enemy.update(dt, this.map, this.enemies, playerGridX, playerGridZ);
            if (enemy.wantsToAttackPlayer) {
                if (enemy.friendly) {
                    this.encounteringFriendlies.push(enemy);
                } else {
                    this.encounteringEnemies.push(enemy);
                }
                enemy.wantsToAttackPlayer = false;
            }
        }

        // --- Spawn check ---
        if (
            this.enemies.filter(e => !e.friendly).length < ENEMY_MAX_COUNT &&
            gameTime - lastSpawnTime >= ENEMY_SPAWN_INTERVAL
        ) {
            const spawned = this._trySpawn(playerGridX, playerGridZ);
            if (spawned) {
                // Also check if we need a tinkerer
                if (!this.enemies.some(e => e.type === 'tinkerer')) {
                    this._trySpawnTinkerer(playerGridX, playerGridZ);
                }
                return gameTime;
            }
        }

        return lastSpawnTime;
    }

    /** Attempt to spawn a new enemy far enough from the player. */
    _trySpawn(playerGridX, playerGridZ) {
        const candidates = [...this._walkableCells];
        // Fisher-Yates shuffle
        for (let i = candidates.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [candidates[i], candidates[j]] = [candidates[j], candidates[i]];
        }

        for (const cell of candidates) {
            const dx = cell.x - playerGridX;
            const dz = cell.z - playerGridZ;
            if (Math.abs(dx) + Math.abs(dz) < ENEMY_MIN_SPAWN_DISTANCE) continue;

            const occupied = this.enemies.some(e => e.gridX === cell.x && e.gridZ === cell.z);
            if (occupied) continue;

            const type = this._spawnableTypes[Math.floor(Math.random() * this._spawnableTypes.length)];
            const enemy = new Enemy({ type, gridX: cell.x, gridZ: cell.z, level: this.dungeonLevel });
            enemy.createSprite(this.scene);
            this.enemies.push(enemy);
            return true;
        }

        return false;
    }

    /** Spawn a single tinkerer NPC if none exists. */
    _trySpawnTinkerer(playerGridX, playerGridZ) {
        // Only one tinkerer at a time
        if (this.enemies.some(e => e.type === 'tinkerer')) return false;

        const candidates = [...this._walkableCells];
        for (let i = candidates.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [candidates[i], candidates[j]] = [candidates[j], candidates[i]];
        }

        for (const cell of candidates) {
            const dx = cell.x - playerGridX;
            const dz = cell.z - playerGridZ;
            if (Math.abs(dx) + Math.abs(dz) < ENEMY_MIN_SPAWN_DISTANCE) continue;

            const occupied = this.enemies.some(e => e.gridX === cell.x && e.gridZ === cell.z);
            if (occupied) continue;

            const tinkerer = new Enemy({
                type: 'tinkerer',
                gridX: cell.x,
                gridZ: cell.z,
                friendly: true,
            });
            tinkerer.createSprite(this.scene);
            this.enemies.push(tinkerer);
            return true;
        }

        return false;
    }

    /**
     * Force-spawn up to `count` fresh hostile enemies near the given grid cell
     * (used by combat to guarantee N=partySize foes per Phase 8 rule 5).
     * Ignores the minimum-distance constraint so they can appear adjacent.
     *
     * @param {number} centerX
     * @param {number} centerZ
     * @param {number} count
     * @returns {Enemy[]} newly-spawned enemies
     */
    forceSpawnNear(centerX, centerZ, count) {
        const spawned = [];
        if (count <= 0) return spawned;

        // Sort walkable cells by distance to center (closest first).
        const candidates = this._walkableCells
            .map(c => ({
                x: c.x, z: c.z,
                d: Math.abs(c.x - centerX) + Math.abs(c.z - centerZ),
            }))
            .sort((a, b) => a.d - b.d);

        for (const cell of candidates) {
            if (spawned.length >= count) break;
            if (cell.d < 1) continue;   // don't spawn on the player's own cell
            const occupied = this.enemies.some(e => e.gridX === cell.x && e.gridZ === cell.z);
            if (occupied) continue;

            const type = this._spawnableTypes[Math.floor(Math.random() * this._spawnableTypes.length)];
            const enemy = new Enemy({
                type, gridX: cell.x, gridZ: cell.z, level: this.dungeonLevel,
            });
            enemy.createSprite(this.scene);
            this.enemies.push(enemy);
            spawned.push(enemy);
        }
        return spawned;
    }

    /** Remove a single enemy from the scene and the array. */
    removeEnemy(enemy) {
        enemy.removeSprite(this.scene);
        this.enemies = this.enemies.filter(e => e !== enemy);
    }

    /** Remove all enemies from the scene. */
    removeAll() {
        for (const enemy of this.enemies) {
            enemy.removeSprite(this.scene);
        }
        this.enemies = [];
    }
}
