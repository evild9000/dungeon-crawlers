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

        this._spawnableTypes = ENEMY_TYPE_KEYS;

        // Boss tracking — one boss per dungeon level.
        this._bossSpawned = false;
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
            if (enemy.health <= 0) continue; // dead enemies don't move or trigger encounters
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

            // Apply type-level stat multipliers (e.g. earth_elemental has double HP & defense).
            const spawnTypeDef = ENEMY_TYPES[type] || {};
            if (spawnTypeDef.hpMult && spawnTypeDef.hpMult !== 1) {
                enemy.health    = Math.round(enemy.health    * spawnTypeDef.hpMult);
                enemy.maxHealth = Math.round(enemy.maxHealth * spawnTypeDef.hpMult);
            }
            if (spawnTypeDef.defenseMult && spawnTypeDef.defenseMult !== 1) {
                enemy.defense = Math.round((enemy.defense || 0) * spawnTypeDef.defenseMult);
            }

            // Boss spawn: one per dungeon level. A boss is a supercharged version
            // of a normal monster with much better loot (handled in CombatSystem).
            // There is a 10% chance the boss becomes a MEGA BOSS with even more power.
            if (!this._bossSpawned && this.dungeonLevel >= 1) {
                this._bossSpawned = true;
                enemy.isBoss = true;
                const dlvl = this.dungeonLevel;

                // Shared title generation
                const bDef = ENEMY_TYPES[type] || {};
                const bTags = Array.isArray(bDef.tags) ? bDef.tags : [];
                const bName = bDef.name || type;
                const BOSS_TITLES = {
                    undead:    ['Ancient', 'Dread', 'Wailing', 'Cursed', 'Spectral'],
                    demon:     ['Infernal', 'Abyssal', 'Hellborn', 'Dread'],
                    humanoid:  ['Warchief', 'Overlord', 'Champion', 'Warlord'],
                    beast:     ['Dire', 'Elder', 'Ancient', 'Great'],
                    construct: ['Masterwork', 'Ancient', 'Runed'],
                    aberration:['Elder', 'Void-touched', 'Abominable'],
                    monster:   ['Greater', 'Elder', 'Ancient'],
                    default:   ['Dread', 'Elder', 'Greater', 'Ancient'],
                };
                let titlePool = BOSS_TITLES.default;
                for (const tag of bTags) {
                    if (BOSS_TITLES[tag]) { titlePool = BOSS_TITLES[tag]; break; }
                }
                const bTitle = titlePool[Math.floor(Math.random() * titlePool.length)];

                if (Math.random() < 0.10) {
                    // ── MEGA BOSS (10% chance) ─────────────────────────────────
                    // 10× HP, defense = base + DL×2, melee/ranged +DL×4, magic +DL×3.
                    enemy.isMegaBoss   = true;
                    enemy.health       = Math.round(enemy.health    * 10);
                    enemy.maxHealth    = Math.round(enemy.maxHealth  * 10);
                    enemy.defense      = (enemy.defense || 0) + dlvl * 2;
                    enemy.bossAtkBonus = dlvl * 2;
                    enemy.bossDL       = dlvl;
                    enemy.name = `\u{1F480} Mega ${bTitle} ${bName}`;
                } else {
                    // ── Normal boss ────────────────────────────────────────────
                    // 5× HP, defense = base + DL, melee/ranged +DL×3, magic +DL×2.
                    enemy.health       = Math.round(enemy.health    * 5);
                    enemy.maxHealth    = Math.round(enemy.maxHealth  * 5);
                    enemy.defense      = (enemy.defense || 0) + dlvl;
                    enemy.bossAtkBonus = dlvl;
                    enemy.bossDL       = dlvl;
                    enemy.name = `\u{1F451} ${bTitle} ${bName}`;
                }
            }

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
     * If `triggerType` is supplied (the type string of the enemy that triggered
     * combat), the extras are drawn from the same tag group to keep encounters
     * thematic (all undead, all humanoids, all vermin, etc.). Falls back to the
     * full spawnable pool when no matching same-tag types exist.
     *
     * @param {number} centerX
     * @param {number} centerZ
     * @param {number} count
     * @param {string} [triggerType]  optional trigger enemy type key
     * @returns {Enemy[]} newly-spawned enemies
     */
    forceSpawnNear(centerX, centerZ, count, triggerType) {
        const spawned = [];
        if (count <= 0) return spawned;

        // Build a thematic pool from the trigger enemy's tags.
        let pool = this._spawnableTypes;
        if (triggerType) {
            const triggerDef = ENEMY_TYPES[triggerType];
            const triggerTags = (triggerDef && triggerDef.tags) ? triggerDef.tags : [];
            if (triggerTags.length > 0) {
                // Pick the most-specific first tag as the primary group key.
                const primaryTag = triggerTags[0];
                const themed = this._spawnableTypes.filter(t => {
                    const def = ENEMY_TYPES[t];
                    return def && def.tags && def.tags.includes(primaryTag);
                });
                if (themed.length > 0) pool = themed;
            }
        }

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

            const type = pool[Math.floor(Math.random() * pool.length)];
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
        if (enemy && typeof enemy.removeSprite === 'function') {
            enemy.removeSprite(this.scene);
        }
        this.enemies = this.enemies.filter(e => e !== enemy);
    }

    /** Remove all enemies from the scene. */
    removeAll() {
        for (const enemy of this.enemies) {
            if (enemy && typeof enemy.removeSprite === 'function') {
                enemy.removeSprite(this.scene);
            }
        }
        this.enemies = [];
    }
}
