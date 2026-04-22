import * as THREE from 'three';
import {
    CELL_SIZE,
    ENEMY_MOVE_INTERVAL,
    ENEMY_MOVE_DURATION,
    ENEMY_TYPES,
    ENEMY_STAT_MIN,
    ENEMY_STAT_MAX,
    TINKERER_TYPE,
    MONSTER_DEFENSE_PER_2_LVL,
    MONSTER_HP_BONUS_THRESHOLD,
    MONSTER_HP_BONUS_PER_LEVEL,
} from '../utils/constants.js';
import { generateEnemySprite } from '../utils/SpriteGenerator.js';

/**
 * Enemy — a dungeon creature with grid-based movement and a billboard sprite.
 *
 * Movement: every ENEMY_MOVE_INTERVAL seconds the enemy picks a random
 * adjacent walkable cell and smoothly interpolates to it over
 * ENEMY_MOVE_DURATION seconds.
 *
 * Stats (health / stamina / mana) are randomised in [ENEMY_STAT_MIN,
 * ENEMY_STAT_MAX] for new spawns and restored from saved data on load.
 */

function generateId() {
    return 'en_' + Date.now().toString(36) + '_' + Math.random().toString(36).slice(2, 8);
}

function randomStat() {
    return ENEMY_STAT_MIN + Math.floor(Math.random() * (ENEMY_STAT_MAX - ENEMY_STAT_MIN + 1));
}

export class Enemy {
    constructor({ id, type, gridX, gridZ, seed, health, maxHealth, stamina, maxStamina, mana, maxMana, friendly, level, defense }) {
        this.id = id || generateId();
        this.type = type;
        this.seed = seed ?? Math.floor(Math.random() * 100000);

        // Grid position (authoritative)
        this.gridX = gridX;
        this.gridZ = gridZ;

        // World position (interpolated for smooth movement)
        this.worldX = (gridX + 0.5) * CELL_SIZE;
        this.worldZ = (gridZ + 0.5) * CELL_SIZE;

        // Monster level (dungeon-floor-driven). Level 1 = baseline.
        this.level = Math.max(1, (level | 0) || 1);

        // Stats — random for new enemies, saved values for loaded ones.
        // New spawns have their rolls multiplied by level.
        const lvMult = this.level;
        const rH = Math.round(randomStat() * lvMult);
        const rS = Math.round(randomStat() * lvMult);
        const rM = Math.round(randomStat() * lvMult);

        // Extra HP bonus at dungeon level 3+: compound +15% per level above threshold.
        const hpExtraLevels = Math.max(0, this.level - (MONSTER_HP_BONUS_THRESHOLD - 1));
        const hpBonus = hpExtraLevels > 0 ? Math.pow(1 + MONSTER_HP_BONUS_PER_LEVEL, hpExtraLevels) : 1;
        const baseH = hpExtraLevels > 0 ? Math.round(rH * hpBonus) : rH;

        this.health     = health    ?? baseH;
        this.maxHealth  = maxHealth ?? this.health;
        this.stamina    = stamina   ?? rS;
        this.maxStamina = maxStamina ?? this.stamina;
        this.mana       = mana     ?? rM;
        this.maxMana    = maxMana  ?? this.mana;

        // Defense — +1 per 2 levels (floor)
        this.defense = defense ?? Math.floor(this.level / 2) * MONSTER_DEFENSE_PER_2_LVL;

        // Movement state
        this.moveTimer = Math.random() * ENEMY_MOVE_INTERVAL; // stagger start
        this.isMoving = false;
        this.moveProgress = 0;
        this.startWorldX = this.worldX;
        this.startWorldZ = this.worldZ;
        this.targetWorldX = this.worldX;
        this.targetWorldZ = this.worldZ;
        this.targetGridX = gridX;
        this.targetGridZ = gridZ;

        // Encounter flag — set when the enemy tries to move into the player's cell
        this.wantsToAttackPlayer = false;

        // Friendly NPCs don't trigger combat
        this.friendly = friendly || false;

        // Stun state (for combat — stunned enemies skip their next turn)
        this.stunned = false;

        // Transient combat effects (DoTs, entangle debuff). Cleared on
        // startCombat; never serialized.
        this.activeEffects = [];

        // Three.js sprite (created lazily by createSprite)
        this.sprite = null;
    }

    /**
     * Create a *lit* billboard plane for the enemy and add it to the scene.
     *
     * We use a MeshStandardMaterial on a PlaneGeometry so torchlight and
     * portal glow actually illuminate enemies (old SpriteMaterial was
     * fullbright). `onBeforeRender` rotates the plane to face the active
     * camera each frame — cheap, no signature change through the manager.
     */
    createSprite(scene) {
        const canvas = generateEnemySprite(this.type, this.seed);
        const texture = new THREE.CanvasTexture(canvas);
        texture.magFilter = THREE.NearestFilter;
        texture.minFilter = THREE.NearestFilter;
        texture.colorSpace = THREE.SRGBColorSpace;

        const def = ENEMY_TYPES[this.type] || (this.type === 'tinkerer' ? TINKERER_TYPE : ENEMY_TYPES.skeleton);

        const material = new THREE.MeshStandardMaterial({
            map: texture,
            transparent: true,
            alphaTest: 0.05,
            side: THREE.DoubleSide,
            roughness: 1.0,
            metalness: 0.0,
            // Tiny emissive lift so creatures don't vanish into pitch black
            // when the nearest torch is culled. Kept very low — the party
            // light should dominate, and higher values cause the sprite to
            // "glow" against the bloom pass.
            emissive: 0xffffff,
            emissiveMap: texture,
            emissiveIntensity: 0.03,
            fog: true,
        });

        const geo = new THREE.PlaneGeometry(def.spriteW, def.spriteH);
        this.sprite = new THREE.Mesh(geo, material);
        this._updateSpritePosition();

        // Y-axis billboard — face the camera horizontally each frame.
        // Only update rotation when the enemy sprite is within render range and
        // when the camera has moved enough to matter (throttle distant enemies).
        const _camPos = new THREE.Vector3();
        let _lastRotFrame = 0;
        this.sprite.onBeforeRender = (_r, _s, cam) => {
            // Throttle: skip every other frame for enemies > 12 units away,
            // skip 3 out of 4 frames for enemies > 24 units away.
            const frameId = ++_lastRotFrame;
            const dx0 = cam.position.x - this.sprite.position.x;
            const dz0 = cam.position.z - this.sprite.position.z;
            const distSq = dx0 * dx0 + dz0 * dz0;
            if (distSq > 576 && (frameId & 3) !== 0) return; // > 24 units: update 1/4 frames
            if (distSq > 144 && (frameId & 1) !== 0) return; // > 12 units: update 1/2 frames
            cam.getWorldPosition(_camPos);
            const dx = _camPos.x - this.sprite.position.x;
            const dz = _camPos.z - this.sprite.position.z;
            this.sprite.rotation.y = Math.atan2(dx, dz);
        };

        scene.add(this.sprite);
    }

    /** Remove sprite from scene and dispose resources. */
    removeSprite(scene) {
        if (this.sprite) {
            scene.remove(this.sprite);
            if (this.sprite.material) {
                if (this.sprite.material.map) this.sprite.material.map.dispose();
                this.sprite.material.dispose();
            }
            if (this.sprite.geometry) this.sprite.geometry.dispose();
            this.sprite = null;
        }
    }

    /**
     * Per-frame update: handles movement timing and interpolation.
     * @param {number} dt
     * @param {number[][]} map
     * @param {Enemy[]} allEnemies
     * @param {number} playerGridX — player grid col (-1 to skip encounter check)
     * @param {number} playerGridZ — player grid row (-1 to skip encounter check)
     */
    update(dt, map, allEnemies, playerGridX = -1, playerGridZ = -1) {
        if (this.isMoving) {
            this.moveProgress += dt / ENEMY_MOVE_DURATION;
            if (this.moveProgress >= 1) {
                this.moveProgress = 1;
                this.isMoving = false;
                this.gridX = this.targetGridX;
                this.gridZ = this.targetGridZ;
                this.worldX = this.targetWorldX;
                this.worldZ = this.targetWorldZ;
                this.moveTimer = 0;
            } else {
                const t = this.moveProgress;
                const ease = t * t * (3 - 2 * t); // smoothstep
                this.worldX = this.startWorldX + (this.targetWorldX - this.startWorldX) * ease;
                this.worldZ = this.startWorldZ + (this.targetWorldZ - this.startWorldZ) * ease;
            }
        } else {
            this.moveTimer += dt;
            if (this.moveTimer >= ENEMY_MOVE_INTERVAL) {
                this._tryMove(map, allEnemies, playerGridX, playerGridZ);
            }
        }

        this._updateSpritePosition();
    }

    /** Attempt to move to a random adjacent walkable cell. */
    _tryMove(map, allEnemies, playerGridX, playerGridZ) {
        const dirs = [[0, -1], [0, 1], [-1, 0], [1, 0]];
        // Fisher-Yates shuffle
        for (let i = dirs.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [dirs[i], dirs[j]] = [dirs[j], dirs[i]];
        }

        for (const [dx, dz] of dirs) {
            const nx = this.gridX + dx;
            const nz = this.gridZ + dz;

            // Bounds + wall check
            if (nz < 0 || nz >= map.length || nx < 0 || nx >= map[0].length) continue;
            if (map[nz][nx] !== 0) continue;

            // Player cell check — flag encounter instead of moving
            if (nx === playerGridX && nz === playerGridZ) {
                this.wantsToAttackPlayer = true;
                this.moveTimer = 0;
                return;
            }

            // Occupancy check — no two enemies in the same cell
            const occupied = allEnemies.some(
                e => e !== this && e.gridX === nx && e.gridZ === nz,
            );
            if (occupied) continue;

            // Valid move
            this.isMoving = true;
            this.moveProgress = 0;
            this._spritePosSet = false;
            this.targetGridX = nx;
            this.targetGridZ = nz;
            this.startWorldX = this.worldX;
            this.startWorldZ = this.worldZ;
            this.targetWorldX = (nx + 0.5) * CELL_SIZE;
            this.targetWorldZ = (nz + 0.5) * CELL_SIZE;
            return;
        }

        // No valid direction — try again next cycle
        this.moveTimer = 0;
    }

    _updateSpritePosition() {
        if (!this.sprite) return;
        if (!this.isMoving && this._spritePosSet) return; // skip if not moving and already placed
        const def = ENEMY_TYPES[this.type] || (this.type === 'tinkerer' ? TINKERER_TYPE : ENEMY_TYPES.skeleton);
        this.sprite.position.set(this.worldX, def.spriteH / 2, this.worldZ);
        this._spritePosSet = true;
    }

    /** Serialise to a plain object for IndexedDB. */
    serialize() {
        return {
            id: this.id,
            type: this.type,
            gridX: this.gridX,
            gridZ: this.gridZ,
            seed: this.seed,
            health: this.health,
            maxHealth: this.maxHealth,
            stamina: this.stamina,
            maxStamina: this.maxStamina,
            mana: this.mana,
            maxMana: this.maxMana,
            friendly: this.friendly,
            level: this.level,
            defense: this.defense,
        };
    }
}
