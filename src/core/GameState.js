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

        return s;
    }
}
