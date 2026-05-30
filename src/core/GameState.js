import { PartyMember } from '../entities/PartyMember.js';
import { Inventory } from '../systems/Inventory.js';
import { CELL_SIZE, INITIAL_HEALTH, INITIAL_STAMINA, INITIAL_MANA, STARTING_GOLD, STARTING_FOOD } from '../utils/constants.js';
import { PLAYER_START } from '../dungeon/DungeonGenerator.js';

/**
 * GameState — serializable snapshot of the entire game.
 *
 * Contains party data, group inventory, enemy data, player position,
 * and timing info. Pure data — no Three.js objects — so it can
 * round-trip through IndexedDB.
 */
export class GameState {
    constructor() {
        this.saveId = null;
        this.saveName = '';
        this.createdAt = 0;
        this.party = [];
        this.inventory = new Inventory();   // group inventory
        this.enemies = [];                  // plain objects (serialized enemy data)
        this.playerPosition = { x: 0, z: 0, yaw: 0, pitch: 0 };
        this.gameTime = 0;                  // total seconds of active gameplay
        this.lastSpawnTime = 0;             // gameTime when last enemy spawned
        this.recruitsHired = 0;             // total recruits ever hired (for cost scaling)
        this.dungeonLevel = 1;              // current floor (1 = surface, descends via red portals)
        this.gameLog = [];                  // rolling log of combat / events shown on 'L' key
        this.activeLight = null;            // { type:'torch'|'lantern'|'light', remaining:sec } — party light
        this.explored = null;               // serialized MinimapSystem grids (object keyed by dungeonLevel)
        this.discoveredMonsters = new Set(); // monster type keys encountered in combat
        this.tinkererEncountered = false;    // whether the wandering tinkerer has been met
        this.bardMusicEnabled = true;        // whether the bard song loop plays (persisted toggle)
        this.shadowSimulacraTemplates = [];  // saved Photomancer Shadow Simulacra power templates
        this.achievementStats = GameState.createAchievementStats();
    }

    static createAchievementStats() {
        return {
            version: 1,
            totals: {
                damageDealt: 0,
                damageTaken: 0,
                kills: 0,
                killsByDot: 0,
                killsBySummon: 0,
                goldCollected: 0,
                itemsFound: 0,
                foodFound: 0,
                chestsSolved: 0,
                fountainsDrunk: 0,
                potionsCrafted: 0,
                scrollsCrafted: 0,
                golemsCrafted: 0,
                abilitiesUsed: 0,
                retaliations: 0,
                intercepts: 0,
                stunsInflicted: 0,
            },
            byMember: {},
            byClass: {},
            byTag: {},
            craftedGolemsByTier: {},
            abilityUses: {},
        };
    }

    ensureAchievementStats() {
        if (!this.achievementStats || typeof this.achievementStats !== 'object') {
            this.achievementStats = GameState.createAchievementStats();
            return this.achievementStats;
        }
        const base = GameState.createAchievementStats();
        const stats = this.achievementStats;
        stats.version = 1;
        stats.totals = stats.totals || {};
        for (const k of Object.keys(base.totals)) {
            if (typeof stats.totals[k] !== 'number') stats.totals[k] = 0;
        }
        if (!stats.byMember || typeof stats.byMember !== 'object') stats.byMember = {};
        if (!stats.byClass || typeof stats.byClass !== 'object') stats.byClass = {};
        if (!stats.byTag || typeof stats.byTag !== 'object') stats.byTag = {};
        if (!stats.craftedGolemsByTier || typeof stats.craftedGolemsByTier !== 'object') stats.craftedGolemsByTier = {};
        if (!stats.abilityUses || typeof stats.abilityUses !== 'object') stats.abilityUses = {};
        return stats;
    }

    _getMemberStats(member) {
        const stats = this.ensureAchievementStats();
        if (!member || !member.id) return null;
        if (!stats.byMember[member.id]) {
            stats.byMember[member.id] = {
                id: member.id,
                name: member.name || 'Unknown',
                classId: member.classId || 'unknown',
                damageDealt: 0,
                damageTaken: 0,
                kills: 0,
                killsByDot: 0,
                killsBySummon: 0,
                goldCollected: 0,
                itemsFound: 0,
                abilitiesUsed: 0,
                retaliations: 0,
                intercepts: 0,
                stunsInflicted: 0,
                potionsCrafted: 0,
                scrollsCrafted: 0,
                golemsCrafted: 0,
            };
        } else {
            const bucket = stats.byMember[member.id];
            bucket.name = member.name || bucket.name || 'Unknown';
            bucket.classId = member.classId || bucket.classId || 'unknown';
        }
        return stats.byMember[member.id];
    }

    _getClassStats(classId) {
        const stats = this.ensureAchievementStats();
        const key = classId || 'unknown';
        if (!stats.byClass[key]) {
            stats.byClass[key] = {
                damageDealt: 0,
                damageTaken: 0,
                kills: 0,
                abilitiesUsed: 0,
                stunsInflicted: 0,
            };
        }
        return stats.byClass[key];
    }

    _getTagStats(tag) {
        const stats = this.ensureAchievementStats();
        if (!tag) return null;
        if (!stats.byTag[tag]) {
            stats.byTag[tag] = { kills: 0, damageDealt: 0, damageTaken: 0 };
        }
        return stats.byTag[tag];
    }

    _incBucket(bucket, key, amount = 1) {
        if (!bucket || !key) return;
        const n = Number.isFinite(amount) ? amount : 0;
        if (!n) return;
        if (typeof bucket[key] !== 'number') bucket[key] = 0;
        bucket[key] += n;
    }

    recordDamageDealt(sourceMember, enemyType, enemyTags, amount) {
        const stats = this.ensureAchievementStats();
        const n = Math.max(0, Math.floor(Number(amount) || 0));
        if (n <= 0) return;
        this._incBucket(stats.totals, 'damageDealt', n);
        if (sourceMember) {
            const m = this._getMemberStats(sourceMember);
            this._incBucket(m, 'damageDealt', n);
            const c = this._getClassStats(sourceMember.classId);
            this._incBucket(c, 'damageDealt', n);
        }
        for (const t of (enemyTags || [])) {
            const tagBucket = this._getTagStats(t);
            this._incBucket(tagBucket, 'damageDealt', n);
        }
    }

    recordDamageTaken(targetMember, enemyType, enemyTags, amount) {
        const stats = this.ensureAchievementStats();
        const n = Math.max(0, Math.floor(Number(amount) || 0));
        if (n <= 0) return;
        this._incBucket(stats.totals, 'damageTaken', n);
        if (targetMember) {
            const m = this._getMemberStats(targetMember);
            this._incBucket(m, 'damageTaken', n);
            const c = this._getClassStats(targetMember.classId);
            this._incBucket(c, 'damageTaken', n);
        }
        for (const t of (enemyTags || [])) {
            const tagBucket = this._getTagStats(t);
            this._incBucket(tagBucket, 'damageTaken', n);
        }
    }

    recordKill(killerMember, enemyType, enemyTags, killSource = 'direct') {
        const stats = this.ensureAchievementStats();
        this._incBucket(stats.totals, 'kills', 1);
        if (killSource === 'dot') this._incBucket(stats.totals, 'killsByDot', 1);
        if (killSource === 'summon') this._incBucket(stats.totals, 'killsBySummon', 1);
        if (killerMember) {
            const m = this._getMemberStats(killerMember);
            this._incBucket(m, 'kills', 1);
            if (killSource === 'dot') this._incBucket(m, 'killsByDot', 1);
            if (killSource === 'summon') this._incBucket(m, 'killsBySummon', 1);
            const c = this._getClassStats(killerMember.classId);
            this._incBucket(c, 'kills', 1);
        }
        for (const t of (enemyTags || [])) {
            const tagBucket = this._getTagStats(t);
            this._incBucket(tagBucket, 'kills', 1);
        }
    }

    recordAbilityUse(member, abilityId) {
        const stats = this.ensureAchievementStats();
        this._incBucket(stats.totals, 'abilitiesUsed', 1);
        if (abilityId) {
            if (typeof stats.abilityUses[abilityId] !== 'number') stats.abilityUses[abilityId] = 0;
            stats.abilityUses[abilityId] += 1;
        }
        if (!member) return;
        const m = this._getMemberStats(member);
        this._incBucket(m, 'abilitiesUsed', 1);
        const c = this._getClassStats(member.classId);
        this._incBucket(c, 'abilitiesUsed', 1);
    }

    recordStunInflicted(member) {
        const stats = this.ensureAchievementStats();
        this._incBucket(stats.totals, 'stunsInflicted', 1);
        if (!member) return;
        const m = this._getMemberStats(member);
        this._incBucket(m, 'stunsInflicted', 1);
        const c = this._getClassStats(member.classId);
        this._incBucket(c, 'stunsInflicted', 1);
    }

    recordRetaliation(member) {
        const stats = this.ensureAchievementStats();
        this._incBucket(stats.totals, 'retaliations', 1);
        if (!member) return;
        const m = this._getMemberStats(member);
        this._incBucket(m, 'retaliations', 1);
    }

    recordIntercept(member) {
        const stats = this.ensureAchievementStats();
        this._incBucket(stats.totals, 'intercepts', 1);
        if (!member) return;
        const m = this._getMemberStats(member);
        this._incBucket(m, 'intercepts', 1);
    }

    recordGoldCollected(amount, collector = null) {
        const stats = this.ensureAchievementStats();
        const n = Math.max(0, Math.floor(Number(amount) || 0));
        if (n <= 0) return;
        this._incBucket(stats.totals, 'goldCollected', n);
        if (collector) {
            const m = this._getMemberStats(collector);
            this._incBucket(m, 'goldCollected', n);
        }
    }

    recordItemFound(itemId, qty = 1, collector = null) {
        const stats = this.ensureAchievementStats();
        const n = Math.max(0, Math.floor(Number(qty) || 0));
        if (n <= 0) return;
        this._incBucket(stats.totals, 'itemsFound', n);
        if (itemId === 'food') this._incBucket(stats.totals, 'foodFound', n);
        if (collector) {
            const m = this._getMemberStats(collector);
            this._incBucket(m, 'itemsFound', n);
        }
    }

    recordChestSolved() {
        const stats = this.ensureAchievementStats();
        this._incBucket(stats.totals, 'chestsSolved', 1);
    }

    recordFountainDrink() {
        const stats = this.ensureAchievementStats();
        this._incBucket(stats.totals, 'fountainsDrunk', 1);
    }

    recordPotionCraft(member, isScroll = false) {
        const stats = this.ensureAchievementStats();
        const key = isScroll ? 'scrollsCrafted' : 'potionsCrafted';
        this._incBucket(stats.totals, key, 1);
        if (!member) return;
        const m = this._getMemberStats(member);
        this._incBucket(m, key, 1);
    }

    recordGolemCraft(member, tierId) {
        const stats = this.ensureAchievementStats();
        this._incBucket(stats.totals, 'golemsCrafted', 1);
        const tierKey = tierId || 'unknown';
        if (typeof stats.craftedGolemsByTier[tierKey] !== 'number') stats.craftedGolemsByTier[tierKey] = 0;
        stats.craftedGolemsByTier[tierKey] += 1;
        if (!member) return;
        const m = this._getMemberStats(member);
        this._incBucket(m, 'golemsCrafted', 1);
    }

    toSaveData() {
        const data = {
            name: this.saveName,
            createdAt: this.createdAt,
            party: this.party.map(m => m.serialize()),
            inventory: this.inventory.serialize(),
            enemies: this.enemies,
            player: { ...this.playerPosition },
            gameTime: this.gameTime,
            lastSpawnTime: this.lastSpawnTime,
            recruitsHired: this.recruitsHired,
            dungeonLevel: this.dungeonLevel,
            gameLog: this.gameLog.slice(-500), // cap saved log
            activeLight: this.activeLight ? { ...this.activeLight } : null,
            explored: this.explored || null,
            discoveredMonsters: [...this.discoveredMonsters],
            tinkererEncountered: this.tinkererEncountered || false,
            bardMusicEnabled: this.bardMusicEnabled !== false,
            shadowSimulacraTemplates: Array.isArray(this.shadowSimulacraTemplates)
                ? this.shadowSimulacraTemplates.map(t => ({
                    name: String(t.name || '').slice(0, 40),
                    powers: Array.isArray(t.powers) ? t.powers.slice() : [],
                })).filter(t => t.name)
                : [],
            achievementStats: this.ensureAchievementStats(),
        };
        // Only include id when updating an existing save;
        // omitting it lets IndexedDB auto-generate the key.
        if (this.saveId != null) data.id = this.saveId;
        return data;
    }

    static fromSaveData(data) {
        const s = new GameState();
        s.saveId = data.id;
        s.saveName = data.name;
        s.createdAt = data.createdAt;
        s.party = (data.party || []).map(p => PartyMember.deserialize(p));
        s.inventory = Inventory.deserialize(data.inventory);
        s.enemies = data.enemies || [];
        s.playerPosition = data.player || {
            x: (PLAYER_START.x + 0.5) * CELL_SIZE,
            z: (PLAYER_START.z + 0.5) * CELL_SIZE,
            yaw: 0, pitch: 0,
        };
        s.gameTime = data.gameTime || 0;
        s.lastSpawnTime = data.lastSpawnTime || 0;
        s.recruitsHired = data.recruitsHired || 0;
        s.dungeonLevel = Math.max(1, data.dungeonLevel || 1);
        s.gameLog = Array.isArray(data.gameLog) ? data.gameLog.slice() : [];
        s.activeLight = data.activeLight && typeof data.activeLight === 'object'
            ? { type: data.activeLight.type, remaining: data.activeLight.remaining || 0 }
            : null;
        s.explored = (data.explored && typeof data.explored === 'object') ? data.explored : null;
        s.discoveredMonsters = new Set(Array.isArray(data.discoveredMonsters) ? data.discoveredMonsters : []);
        s.tinkererEncountered = data.tinkererEncountered || false;
        s.bardMusicEnabled = data.bardMusicEnabled !== false; // default true for old saves
        s.shadowSimulacraTemplates = Array.isArray(data.shadowSimulacraTemplates)
            ? data.shadowSimulacraTemplates.map(t => ({
                name: String(t.name || '').slice(0, 40),
                powers: Array.isArray(t.powers) ? t.powers.slice() : [],
            })).filter(t => t.name)
            : [];
        s.achievementStats = (data.achievementStats && typeof data.achievementStats === 'object')
            ? data.achievementStats
            : GameState.createAchievementStats();
        s.ensureAchievementStats();
        return s;
    }

    /**
     * Create a fresh game state with one starting hero.
     * @param {string} saveName   — display name for the save slot
     * @param {string} playerName — character name entered by the player
     * @param {string} [classId]
     * @param {string} [speciesId]
     */
    static createNew(saveName, playerName, classId = 'warrior', speciesId = 'human') {
        const s = new GameState();
        s.saveName = saveName;
        s.createdAt = Date.now();

        // PartyMember will compute its own max stats from the class modifiers
        // when maxHealth/maxStamina/maxMana are omitted.
        s.party.push(new PartyMember({
            name: playerName || 'Hero',
            classId,
            speciesId,
        }));

        // Starting supplies
        s.inventory.gold = STARTING_GOLD;
        s.inventory.addItem('food', STARTING_FOOD);
        // Phase 10: the party now carries its own light. Start with 3 torches
        // so a brand-new game can see immediately.
        s.inventory.addItem('torch', 3);

        s.playerPosition = {
            x: (PLAYER_START.x + 0.5) * CELL_SIZE,
            z: (PLAYER_START.z + 0.5) * CELL_SIZE,
            yaw: 0,
            pitch: 0,
        };

        s.ensureAchievementStats();

        return s;
    }
}
