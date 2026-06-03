/**
 * PartyMember — data model for a character in the player's party.
 *
 * Each character has:
 *   - a class (warrior, ranger, mage, rogue, monk, cleric, necromancer)
 *   - a species (human, elf, dwarf, orc, gnome, halfling)
 *   - a level (1..MAX_LEVEL) and XP toward the next level
 *   - a combat row ('front' | 'back')
 *
 * Class + species contribute stat modifiers, regen rates (per minute),
 * flat damage bonuses (melee / ranged / magic), defense, and PER-LEVEL
 * scaling values. These stack with equipped weapon/armor/shield bonuses.
 *
 * Slow regen: each character recovers fractions of HP/ST/MP every second,
 * driven by Game._tickRegen() via `tickRegen(dt)`.
 *
 * Summoned creatures (necromancer undead, ranger beasts) also use
 * PartyMember with:
 *    isSummoned = true
 *    summonType = preset id (e.g. 'zombie', 'bear')
 *    summonerId = id of the caster who created them
 *    canBeHealed = true/false (ranger beasts heal; necro undead drain-heal)
 *    summonStats = { meleeMin, meleeMax, rangedMin, rangedMax, magicMin, magicMax, defense }
 *
 * Summoned creatures cannot wear gear, cannot be auto-revived, and are
 * skipped by the shop/inventory UIs.
 */

import { getItemDef, ITEM_CATEGORY, WEAPONS, TRINKETS } from '../items/ItemTypes.js';
import { getClassDef, CLASS_IDS } from './Classes.js';
import { getFamiliarDef } from './Familiars.js';
import { getSpeciesDef, SPECIES_IDS } from './Species.js';
import {
    INITIAL_HEALTH, INITIAL_STAMINA, INITIAL_MANA,
    REGEN_HP_PER_MIN, REGEN_ST_PER_MIN, REGEN_MP_PER_MIN,
    LEVEL_HP_PER, LEVEL_ST_PER, LEVEL_MP_PER,
    MAX_LEVEL, XP_LEVEL_BASE,
    MONK_DODGE_CHANCE, MONK_DODGE_MAX,
    FOOD_HUNGRY_PENALTY, FOOD_DYING_HP_PER_MIN,
    WARRIOR_DEFEND_MODE_UNLOCK_LEVEL,
    WARRIOR_DEFEND_BLOCK_BONUS_PER_3LV,
    WARRIOR_STUN_RESIST_BASE,
    WARRIOR_STUN_RESIST_PER_2_LEVELS,
    RANGER_EXTRA_FAVORED_UNLOCK_LEVEL,
    RANGER_EXTRA_FAVORED_BASE_LEVEL,
    RANGER_EXTRA_FAVORED_PER_5_LV,
    WARRIOR_RETALIATION_UNLOCK_LEVEL,
    WARRIOR_RETALIATION_BASE_CHANCE,
    WARRIOR_RETALIATION_PER_LEVEL,
    PALADIN_DRAGONSLAYER_UNLOCK_LEVEL,
    PALADIN_DRAGON_AURA_PERCENT_OFFSET,
    PALADIN_DRAGON_AURA_PERCENT_CAP,
    CLERIC_CLEANSE_UNLOCK_LEVEL,
    CLERIC_CLEANSE_CHANCE_PER_LEVEL,
    MAGE_FAMILIAR_UNLOCK_LEVEL,
    MAGE_FAMILIAR_MAX_LEVEL,
    MAGE_FAMILIAR_MAGIC_PER_LEVEL,
    MAGE_FAMILIAR_DEFENSE_PER_LEVEL,
    TRINKET_AUGMENT_POOL_PCT_BY_LEVEL,
    TRINKET_AUGMENT_REGEN_BY_LEVEL,
    RANGER_TOTEM_UNLOCK_LEVEL,
    RANGER_BEAR_TOTEM_DEFENSE_DIVISOR,
} from '../utils/constants.js';

function generateId() {
    return 'pm_' + Date.now().toString(36) + '_' + Math.random().toString(36).slice(2, 8);
}

function normalizeFamiliar(familiar) {
    if (!familiar || typeof familiar !== 'object') return null;
    const def = getFamiliarDef(familiar.typeId);
    if (!def) return null;
    const level = Math.max(1, Math.min(MAGE_FAMILIAR_MAX_LEVEL, familiar.level | 0));
    const rawName = typeof familiar.name === 'string' ? familiar.name.trim() : '';
    if (!rawName) return null;
    return {
        typeId: def.id,
        name: rawName.slice(0, 24),
        level,
    };
}

/**
 * Compute max stats for a given class at level 1.
 * @param {object} classDef
 * @returns {{maxHealth:number,maxStamina:number,maxMana:number}}
 */
export function computeClassMaxStats(classDef) {
    const maxHealth  = Math.max(1, Math.round(INITIAL_HEALTH  * (1 + (classDef.hpMod || 0))));
    const maxStamina = Math.max(0, Math.round(INITIAL_STAMINA * (1 + (classDef.stMod || 0))));
    const maxMana    = Math.max(0, Math.round(INITIAL_MANA    * (1 + (classDef.mpMod || 0))));
    return { maxHealth, maxStamina, maxMana };
}

/** XP required to reach nextLevel from 0 (cumulative). */
export function xpNeededFor(level) {
    return XP_LEVEL_BASE * level * level;
}

export class PartyMember {
    constructor({
        id, name,
        health, maxHealth, stamina, maxStamina, mana, maxMana,
        portraitSeed, inventory, equipment, equipmentEnchants, trinketEnchants, trinketPoolBonus,
        classId, speciesId,
        isSummoned, summonType, summonerId, canBeHealed, summonStats,
        isPersistent,
        level, xp, row,
        activeSongs,
        favoredEnemy,
        extraFavoredEnemies,
        familiar,
        hungerState, foodTimer,
        savedEffects,
        abolethEnslavedRounds,
    }) {
        this.id = id || generateId();
        this.name = name;

        // Class / species — default to warrior/human if missing (legacy saves).
        this.classId = CLASS_IDS.includes(classId) ? classId : 'warrior';
        this.speciesId = SPECIES_IDS.includes(speciesId) ? speciesId : 'human';

        // Level & XP (default to 1/0 for legacy saves)
        this.level = Math.max(1, Math.min(MAX_LEVEL, (level | 0) || 1));
        this.xp    = Math.max(0, xp | 0);

        // Combat row
        this.row = (row === 'back') ? 'back' : 'front';

        // Compute class-derived maxes if caller didn't supply them.
        const classDef = getClassDef(this.classId);
        const defaults = computeClassMaxStats(classDef);

        this.maxHealth  = maxHealth  ?? defaults.maxHealth;
        this.maxStamina = maxStamina ?? defaults.maxStamina;
        this.maxMana    = maxMana    ?? defaults.maxMana;

        // Current pools — default to full if omitted.
        this.health  = health  ?? this.maxHealth;
        this.stamina = stamina ?? this.maxStamina;
        this.mana    = mana    ?? this.maxMana;

        this.portraitSeed = portraitSeed ?? Math.floor(Math.random() * 100000);

        // Personal inventory
        this.inventory = inventory ? inventory.map(i => ({ ...i })) : [];

        // Equipment slots. Phase 8 adds five trinket slots
        // (cloak, neck, ring1, ring2, belt). offhand supports dual-wielding
        // a second melee weapon.
        const DEFAULT_SLOTS = {
            weapon: null, offhand: null, armor: null, shield: null,
            cloak: null, neck: null, ring1: null, ring2: null, belt: null,
        };
        this.equipment = equipment
            ? { ...DEFAULT_SLOTS, ...equipment }
            : { ...DEFAULT_SLOTS };

        // Transient combat state. Scroll buffs (expiresAt) are re-populated
        // from savedEffects on load so they survive saves.
        this.activeEffects = [];  // e.g. [{ type:'poison', rounds:3, damage:4 }, { type:'song', bonus:2 }]
        if (Array.isArray(savedEffects)) {
            const now = Date.now();
            for (const e of savedEffects) {
                if (e && typeof e.expiresAt === 'number' && e.expiresAt > now) {
                    this.activeEffects.push({ ...e });
                }
            }
        }
        this.stunned = false;
        this._webbedRounds = 0;  // Phase 11 — web/hold lockdown counter (rounds left)
        this.abolethEnslavedRounds = Math.max(0, abolethEnslavedRounds | 0);
        this.usedBardSong = false;  // "once per combat" tracker
        this.isRaging = false;   // Barbarian: active rage flag
        this.usedRage = false;   // Barbarian: once-per-combat rage tracker
        this.rageEncourageRounds = 0; // Barbarian L25 party damage aura ramp
        this.werebearActive = false;  // Barbarian L35: Werebear form active
        this.werebearUsed = false;    // Barbarian L35: once-per-combat tracker
        this.werebearHpBonus = 0;
        this.werebearDefenseBonus = 0;
        this.odinsRavensTriggered = false; // Barbarian L35: successful proc this combat
        this.fireAuraActive = false; // Paladin: Fire Aura toggle
        this.dragonslayerActive = false; // Paladin L25: Dragonslayer toggle
        this.paladinSteedActive = false; // Paladin L35: mounted combat
        this.paladinSteedUsed = false;
        this.paladinSteedHpBonus = 0;
        this.martyrsCovenantActive = false; // Paladin L35: damage transfer anchor
        this.martyrsCovenantSuppressedRound = 0;
        this.rangerTotem = null; // Ranger L25: wolf | bear | eagle | pixie
        this.avatarActive = false; // Monk L25: Avatar toggle
        this.avatarElement = 'fire'; // Monk L25: fire | lightning | acid | ice
        this.divineShroudActive = false; // Cleric L35: damage reduction + death save
        this.isDefendMode = false;  // Warrior L20: Defend Mode toggle (persists turn-to-turn)
        this.warriorTauntActive = false; // Warrior L35: passive taunt toggle

        // Druid L30: Wild Shape — combat-only transformation
        this.wildShapeForm    = null;  // 'bear'|'wolf'|'eagle'|'pixie'|'treant'|null
        this.wildShapeHpBonus = 0;     // HP added to maxHealth (bear/treant double)
        this.wildShapeDefBonus = 0;    // Defense bonus from form
        this.wildShapeOrigRow  = null; // Original row before form promotion

        // Mage L30: Elemental Rift — once-per-combat free-action toggle
        this.elementalRiftOpen = false;
        this.elementalRiftUsed = false;
        this.manaShieldActive = false;      // Mage L35: Mana Shield active this combat
        this.manaShieldUsed = false;        // Mage L35: once-per-combat tracker
        this.manaShieldHp = 0;              // Mage L35: temporary shield pool
        this.mageDeathBurstTriggered = false; // Mage L35: passive trigger lock

        // Warlock: demon cauldron and L30 abyss form are combat-only.
        this.warlockCauldronOpen = false;
        this.warlockSelectedDemon = 'imp';
        this.warlockAwakenActive = false;
        this.warlockAwakenSummons = 0;
        this.warlockAwakenSummonIds = [];
        this.abyssFormActive = false;
        this.abyssFormUsed = false;
        this.abyssFormHpBonus = 0;
        this.abyssFormDefBonus = 0;
        this.abyssFormOrigRow = null;
        this.eldritchSignReady = true;
        Object.defineProperty(this, 'webbedRounds', {
            enumerable: true,
            configurable: true,
            get: () => this._webbedRounds || 0,
            set: (value) => {
                const rounds = Math.max(0, value | 0);
                const actualRounds = (!this.isSummoned && this.classId === 'warlock' && this.abyssFormActive && rounds > 0)
                    ? 0
                    : rounds;
                this._webbedRounds = actualRounds;
                if (actualRounds <= 0) this.abolethEnslavedRounds = 0;
            },
        });

        // Persistent bard out-of-combat songs (serialized). Array of song IDs:
        //   'haste' | 'battle' | 'healing'
        // Effects are re-applied to all party members via Game._reapplySongEffects().
        this.activeSongs = Array.isArray(activeSongs) ? [...activeSongs] : [];

        // Ranger favored enemy tag — one of: 'vermin', 'beast', 'undead', 'humanoid',
        // 'demon', 'monster', 'dragon', 'elemental', 'construct', 'aberration'.
        // Rangers ignore defense of enemies with this tag and gain an instakill
        // chance scaling with level. null = none selected yet.
        this.favoredEnemy = favoredEnemy || null;

        // Ranger L20+: additional favored enemy slots (one per 5 levels above L15).
        // Stored as an array of tag strings (same pool as favoredEnemy).
        // Backward-compatible: legacy saves that omit this field default to [].
        this.extraFavoredEnemies = Array.isArray(extraFavoredEnemies) ? [...extraFavoredEnemies] : [];
        this.familiar = normalizeFamiliar(familiar);

        // ── Food / Hunger ──
        // hungerState: null (fed) | 'hungry' | 'starving' | 'dying'
        // foodTimer: seconds of exploration elapsed since the last successful meal.
        // requiresFood: false for all summoned/constructed creatures (undead, beasts,
        //   golems). Set true for future permanent animals/familiars at creation time.
        this.hungerState = hungerState || null;
        this.foodTimer   = (typeof foodTimer === 'number') ? foodTimer : 0;
        this.requiresFood = !isSummoned; // summoned creatures never need food
        this._dyingDrainAcc = 0;         // accumulator for sub-1 HP drain ticks

        // Summoned state
        this.isSummoned   = !!isSummoned;
        this.summonType   = summonType || null;
        this.summonerId   = summonerId || null;
        this.canBeHealed  = canBeHealed !== false; // default true
        this.summonStats  = summonStats || null;   // { meleeMin, meleeMax, rangedMin, rangedMax, magicMin, magicMax, defense }
        // Persistent summons (golems) survive across fights, rest, dungeon
        // travel, and save/load. Non-persistent summons are stripped by
        // Game._onCombatEnd as before.
        this.isPersistent = !!isPersistent;

        // Artificer L30: Golem Berserk Mode
        this.golemBerserkActive = false;
        this.golemBerserkUsed   = false;

        // Bard L30: Thunderous Drums
        this.thunderousDrumsActive = false;

        // Per-member equipment enchantments. Keyed by equipment slot
        // ('weapon', 'offhand', 'armor'). Enchants persist on the slot; unequipping
        // removes the enchant (crafting cost is a commitment).
        //   equipmentEnchants.weapon  = { level:1..7, rider:'fire'|'acid'|'poison'|'lightning'|'ice'|null }
        //   equipmentEnchants.offhand = { level:1..7, rider:'fire'|'acid'|'poison'|'lightning'|'ice'|null }
        //   equipmentEnchants.armor   = { level:1..7, spiked:bool, aoeWard:bool }
        //   equipmentEnchants.shield  = { level:1..7 }  +1% block chance and +1 defense per rank
        //   Both spiked and aoeWard can be true simultaneously (purchased independently).
        const DEFAULT_ENCHANTS = { weapon: null, offhand: null, armor: null, shield: null };
        this.equipmentEnchants = equipmentEnchants
            ? { ...DEFAULT_ENCHANTS, ...equipmentEnchants }
            : { ...DEFAULT_ENCHANTS };

        // Per-trinket-slot enchant levels (Artificer L20+ trinket upgrade crafting).
        // Each key is a trinket slot ('cloak','neck','ring1','ring2','belt').
        // Value = { level: 1..7 } — adds +level to the equipped trinket's bonusValue
        // (and bonusValue2 if the trinket has a dual aspect).
        const DEFAULT_TRINKET_ENCHANTS = { cloak: null, neck: null, ring1: null, ring2: null, belt: null };
        this.trinketEnchants = trinketEnchants
            ? { ...DEFAULT_TRINKET_ENCHANTS, ...trinketEnchants }
            : { ...DEFAULT_TRINKET_ENCHANTS };
        this._trinketPoolBonus = trinketPoolBonus
            ? { health: trinketPoolBonus.health || 0, stamina: trinketPoolBonus.stamina || 0, mana: trinketPoolBonus.mana || 0 }
            : { health: 0, stamina: 0, mana: 0 };
        this.refreshTrinketPoolBonuses(false);

        // Regen accumulators (fractions of a point)
        this._regenHpAcc = 0;
        this._regenStAcc = 0;
        this._regenMpAcc = 0;
    }

    // ──────────────────────────────────────────
    // Class / species lookups
    // ──────────────────────────────────────────

    get classDef()   { return getClassDef(this.classId); }
    get speciesDef() { return getSpeciesDef(this.speciesId); }

    // ──────────────────────────────────────────
    // Damage / defense / XP helpers
    // ──────────────────────────────────────────

    /**
     * Sum trinket bonuses of a given bonusType ('defense' | 'melee' | 'ranged' | 'magic')
     * across all five trinket slots.
     */
    getTrinketBonus(bonusType) {
        if (this.isSummoned) return 0;
        let total = 0;
        const slots = ['cloak', 'neck', 'ring1', 'ring2', 'belt'];
        for (const s of slots) {
            const id = this.equipment[s];
            if (!id) continue;
            const def = TRINKETS[id] || getItemDef(id);
            if (!def) continue;
            // Enchant bonus: trinketEnchants[slot].level adds to both aspects.
            const enchLvl = (this.trinketEnchants && this.trinketEnchants[s] && this.trinketEnchants[s].level) || 0;
            if (def.bonusType  === bonusType) total += (def.bonusValue  || 0) + (enchLvl > 0 ? enchLvl : 0);
            // Dual-aspect trinkets carry a second bonus (DL10+ drops).
            if (def.bonusType2 === bonusType) total += (def.bonusValue2 || 0) + (enchLvl > 0 ? enchLvl : 0);
        }
        return total;
    }

    getTrinketPoolAugmentPct() {
        if (this.isSummoned) return 0;
        let pct = 0;
        const slots = ['cloak', 'neck', 'ring1', 'ring2', 'belt'];
        for (const s of slots) {
            if (!this.equipment[s]) continue;
            const augLevel = (this.trinketEnchants && this.trinketEnchants[s] && this.trinketEnchants[s].augmentLevel) || 0;
            pct += TRINKET_AUGMENT_POOL_PCT_BY_LEVEL[augLevel] || 0;
        }
        return pct;
    }

    getTrinketRegenAugmentBonus() {
        if (this.isSummoned) return 0;
        let bonus = 0;
        const slots = ['cloak', 'neck', 'ring1', 'ring2', 'belt'];
        for (const s of slots) {
            if (!this.equipment[s]) continue;
            const augLevel = (this.trinketEnchants && this.trinketEnchants[s] && this.trinketEnchants[s].regenAugmentLevel) || 0;
            bonus += TRINKET_AUGMENT_REGEN_BY_LEVEL[augLevel] || 0;
        }
        return bonus;
    }

    refreshTrinketPoolBonuses(fillAdded = false) {
        if (this.isSummoned) return;
        const old = this._trinketPoolBonus || { health: 0, stamina: 0, mana: 0 };
        const baseHealth = Math.max(1, this.maxHealth - (old.health || 0));
        const baseStamina = Math.max(0, this.maxStamina - (old.stamina || 0));
        const baseMana = Math.max(0, this.maxMana - (old.mana || 0));
        const pct = this.getTrinketPoolAugmentPct();
        const next = {
            health: Math.floor(baseHealth * pct),
            stamina: Math.floor(baseStamina * pct),
            mana: Math.floor(baseMana * pct),
        };
        this.maxHealth = baseHealth + next.health;
        this.maxStamina = baseStamina + next.stamina;
        this.maxMana = baseMana + next.mana;
        if (fillAdded) {
            this.health += Math.max(0, next.health - (old.health || 0));
            this.stamina += Math.max(0, next.stamina - (old.stamina || 0));
            this.mana += Math.max(0, next.mana - (old.mana || 0));
        }
        this.health = Math.min(this.health, this.maxHealth);
        this.stamina = Math.min(this.stamina, this.maxStamina);
        this.mana = Math.min(this.mana, this.maxMana);
        this._trinketPoolBonus = next;
    }

    /**
     * Sum all active-effect modifiers of a given kind.
     *   kind: 'damage' (song / entangle debuff)  → applies to melee/ranged/magic
     *   kind: 'defense' (song buff / entangle debuff)
     * Returns a signed integer (positive = buff, negative = debuff).
     */
    getEffectModifier(kind) {
        let total = 0;
        for (const e of this.activeEffects) {
            if (kind === 'damage'  && typeof e.damageBonus      === 'number') total += e.damageBonus;
            if (kind === 'melee'   && typeof e.meleeDamageBonus === 'number') total += e.meleeDamageBonus;
            if (kind === 'defense' && typeof e.defenseBonus     === 'number') total += e.defenseBonus;
        }
        return total;
    }

    /** Flat damage bonus for a given attack type, including per-level scaling and trinkets. */
    /** Returns the hunger tier (0=fed, 1=hungry, 2=starving, 3=dying). */
    getHungerTier() {
        if (this.hungerState === 'dying')    return 3;
        if (this.hungerState === 'starving') return 2;
        if (this.hungerState === 'hungry')   return 1;
        return 0;
    }

    getClassDamageBonus(type) {
        const c = this.classDef, s = this.speciesDef;
        const bonusBeyondL1 = Math.max(0, this.level - 1);
        const trinket = this.getTrinketBonus(type);
        const effect  = this.getEffectModifier('damage');
        const hunger  = this.getHungerTier() * FOOD_HUNGRY_PENALTY;
        if (type === 'melee') {
            return (c.meleeBonus || 0) + (s.meleeBonus || 0)
                 + (c.meleePerLevel || 0) * bonusBeyondL1
                 + trinket + effect + this.getEffectModifier('melee') - hunger;
        }
        if (type === 'ranged') {
            return (c.rangedBonus || 0) + (s.rangedBonus || 0)
                 + (c.rangedPerLevel || 0) * bonusBeyondL1
                 + trinket + effect - hunger;
        }
        if (type === 'magic') {
            return (c.magicBonus || 0) + (s.magicBonus || 0)
                 + (c.magicPerLevel || 0) * bonusBeyondL1
                 + trinket + effect - hunger;
        }
        return 0;
    }

    getFamiliarLevelCap() {
        if (this.classId !== 'mage') return 0;
        if (this.level < MAGE_FAMILIAR_UNLOCK_LEVEL) return 0;
        return Math.max(0, Math.min(MAGE_FAMILIAR_MAX_LEVEL, this.level - (MAGE_FAMILIAR_UNLOCK_LEVEL - 1)));
    }

    getFamiliarLevel() {
        const cap = this.getFamiliarLevelCap();
        if (!this.familiar || cap <= 0) return 0;
        return Math.max(0, Math.min(cap, this.familiar.level | 0));
    }

    getFamiliarDefenseBonus() {
        if (this.classId !== 'mage') return 0;
        return this.getFamiliarLevel() * MAGE_FAMILIAR_DEFENSE_PER_LEVEL;
    }

    getMagicDamageMultiplier() {
        if (this.classId !== 'mage') return 1;
        return 1 + this.getFamiliarLevel() * MAGE_FAMILIAR_MAGIC_PER_LEVEL;
    }

    getFamiliarSummary() {
        if (this.classId !== 'mage') return null;
        const level = this.getFamiliarLevel();
        if (!this.familiar || level <= 0) return null;
        const def = getFamiliarDef(this.familiar.typeId);
        return {
            ...this.familiar,
            level,
            icon: def?.icon || '',
            typeName: def?.name || this.familiar.typeId,
            defenseBonus: this.getFamiliarDefenseBonus(),
            magicBonusPct: Math.round((this.getMagicDamageMultiplier() - 1) * 100),
        };
    }

    getRangerTotemDefenseBonus() {
        if (this.classId !== 'ranger') return 0;
        if ((this.level || 1) < RANGER_TOTEM_UNLOCK_LEVEL) return 0;
        if (this.rangerTotem !== 'bear') return 0;
        return Math.floor((this.level || 1) / RANGER_BEAR_TOTEM_DEFENSE_DIVISOR);
    }

    /** Total defense = species + class base + class-per-level + summon defense + trinkets + effects. */
    getTotalDefense() {
        if (this.isSummoned) return (this.summonStats && this.summonStats.defense) || 0;
        const c = this.classDef, s = this.speciesDef;
        const beyond = Math.max(0, this.level - 1);
        const hunger  = this.getHungerTier() * FOOD_HUNGRY_PENALTY;
        return (c.defenseBonus || 0)
             + (s.defenseBonus || 0)
             + (c.defensePerLevel || 0) * beyond
             + this.getFamiliarDefenseBonus()
             + this.getRangerTotemDefenseBonus()
             + this.getTrinketBonus('defense')
             + this.getEffectModifier('defense')
             + (this.wildShapeDefBonus || 0)
             + (this.abyssFormDefBonus || 0)
             + this.getShieldDefenseBonus()
             - hunger;
    }

    /** Warrior melee-stun chance (beyond base). */
    getMeleeStunBonus()   { return (this.classDef.stunPerLevel || 0) * Math.max(0, this.level - 1); }
    getRangedCritBonus()  { return (this.classDef.critPerLevel || 0) * Math.max(0, this.level - 1); }
    getMagicStunBonus()   { return (this.classDef.magicStunPerLevel || 0) * Math.max(0, this.level - 1); }
    getInstakillBonus()   { return (this.classDef.instakillPerLevel || 0) * Math.max(0, this.level - 1); }
    getDodgeBonus()       { return (this.classDef.dodgePerLevel || 0) * Math.max(0, this.level - 1); }

    /**
     * Monks get a total dodge chance of MONK_DODGE_CHANCE + level scaling, capped
     * at MONK_DODGE_MAX. Returns 0 for non-monks. Used by combat for both the
     * dodge roll AND the damage-reduction-on-failed-dodge mechanic (Phase 8 rule 6).
     */
    getEffectiveDodgePct() {
        if (this.classId !== 'monk') return 0;
        return Math.min(MONK_DODGE_MAX, MONK_DODGE_CHANCE + this.getDodgeBonus());
    }

    getWhirlwindBonus()   { return (this.classDef.whirlwindPerLevel || 0) * Math.max(0, this.level - 1); }
    getHealPercentBonus() { return (this.classDef.healPercentPerLevel || 0) * Math.max(0, this.level - 1); }
    getDrainBonus()       { return (this.classDef.drainPerLevel || 0) * Math.max(0, this.level - 1); }

    /**
     * Ranger favored-enemy instakill chance: 1% per 3 ranger levels (floor).
     * Only rangers have this; returns 0 for all other classes.
     */
    getFavoredEnemyInstakillChance() {
        if (this.classId !== 'ranger' || !this.getAllFavoredEnemies().length) return 0;
        return Math.floor(this.level / 3) * 0.01;
    }

    /**
     * All favored enemy tags for this ranger: primary + any extra slots.
     * Returns an array of tag strings (empty for non-rangers or if none chosen).
     */
    getAllFavoredEnemies() {
        if (this.classId !== 'ranger') return [];
        const all = [];
        if (this.favoredEnemy) all.push(this.favoredEnemy);
        for (const tag of (this.extraFavoredEnemies || [])) {
            if (tag && !all.includes(tag)) all.push(tag);
        }
        return all;
    }

    /**
     * How many extra favored enemy slots this ranger currently has.
     * 0 below L20; +1 per 5 levels above L15 (1 at L20, 2 at L25, …).
     */
    getExtraFavoredEnemySlots() {
        if (this.classId !== 'ranger') return 0;
        if (this.level < RANGER_EXTRA_FAVORED_UNLOCK_LEVEL) return 0;
        return Math.floor((this.level - RANGER_EXTRA_FAVORED_BASE_LEVEL) / RANGER_EXTRA_FAVORED_PER_5_LV);
    }

    /**
     * Extra melee swings per turn.
     * Warriors:  +1 swing every 5 levels (L5→+1, L10→+2, L15→+3, L20→+4).
     * Paladins:  +1 swing every 7 levels (L7→+1, L14→+2, L21→+3).
     */
    getExtraMeleeAttacks() {
        if (this.classId === 'warrior') return Math.floor(this.level / 5);
        if (this.classId === 'paladin') return Math.floor(this.level / 7);
        return 0;
    }

    /**
     * Extra ranged shots per turn (rangers only). Same cadence as warrior
     * extra melees: +1 shot at every multiple of 5 levels.
     */
    getExtraRangedAttacks() {
        if (this.classId !== 'ranger') return 0;
        let extra = Math.floor(this.level / 5);
        if (this.level >= RANGER_TOTEM_UNLOCK_LEVEL && this.rangerTotem === 'wolf') {
            extra += 1;
        }
        return extra;
    }

    /** Regen rate per minute for a given pool, including class + species bonuses. */
    getRegenRate(pool) {
        const c = this.classDef, s = this.speciesDef;
        const trinketRegen = this.getTrinketRegenAugmentBonus();
        if (pool === 'hp') {
            const songEffect = this.activeEffects.find(e => e && e.type === 'bard_song_healing');
            const songBonus  = songEffect ? (songEffect.hpPerMin || 0) : 0;
            return REGEN_HP_PER_MIN + (c.regenHp || 0) + (s.regenHp || 0) + songBonus + trinketRegen;
        }
        if (pool === 'st') {
            return REGEN_ST_PER_MIN + (c.regenSt || 0) + (s.regenSt || 0) + trinketRegen;
        }
        if (pool === 'mp') {
            if (this.maxMana <= 0) return 0;
            return REGEN_MP_PER_MIN + (c.regenMp || 0) + (s.regenMp || 0) + trinketRegen;
        }
        return 0;
    }

    // ──────────────────────────────────────────
    // XP / level-up
    // ──────────────────────────────────────────

    xpNeededForNext() { return xpNeededFor(this.level); }
    xpNeededForPrev() { return this.level > 1 ? xpNeededFor(this.level - 1) : 0; }
    xpProgressThisLevel() { return Math.max(0, this.xp - this.xpNeededForPrev()); }
    xpSpanThisLevel() { return this.xpNeededForNext() - this.xpNeededForPrev(); }

    /**
     * Add XP. Returns an array of level-up records:
     *   [{ fromLevel, toLevel, hpGain, stGain, mpGain }, ...]
     * Caller should log these.
     */
    gainXP(amount) {
        if (this.isSummoned) return [];
        if (amount <= 0) return [];
        this.xp += amount;

        const records = [];
        while (this.level < MAX_LEVEL && this.xp >= this.xpNeededForNext()) {
            const rec = this._levelUp();
            records.push(rec);
        }
        // Clamp XP at cap
        if (this.level >= MAX_LEVEL && this.xp > this.xpNeededForNext()) {
            this.xp = this.xpNeededForNext();
        }
        return records;
    }

    _levelUp() {
        const fromLevel = this.level;
        this.level++;
        const c = this.classDef;

        // HP/ST/MP gain scales with class modifier (negative mods can reduce gain,
        // but we clamp to 0 minimum).
        const hpGain = Math.max(0, Math.round(LEVEL_HP_PER * (1 + (c.hpMod || 0))));
        const stGain = Math.max(0, Math.round(LEVEL_ST_PER * (1 + (c.stMod || 0))));
        const mpGain = Math.max(0, Math.round(LEVEL_MP_PER * (1 + (c.mpMod || 0))));

        this.maxHealth  += hpGain;
        this.maxStamina += stGain;
        this.maxMana    += mpGain;
        this.refreshTrinketPoolBonuses(false);

        // Full refill on level-up, as a reward.
        this.health  = this.maxHealth;
        this.stamina = this.maxStamina;
        this.mana    = this.maxMana;

        return { fromLevel, toLevel: this.level, hpGain, stGain, mpGain };
    }

    // ──────────────────────────────────────────
    // Personal inventory
    // ──────────────────────────────────────────

    addItem(itemId, quantity = 1) {
        if (this.isSummoned) return;
        const def = getItemDef(itemId);
        if (!def) return;

        const isStackable = def.stackable || def.category === ITEM_CATEGORY.CONSUMABLE;
        if (isStackable) {
            const existing = this.inventory.find(i => i.itemId === itemId);
            if (existing) existing.quantity += quantity;
            else this.inventory.push({ itemId, quantity });
        } else {
            for (let i = 0; i < quantity; i++) {
                this.inventory.push({ itemId, quantity: 1 });
            }
        }
    }

    removeItem(itemId, quantity = 1) {
        const idx = this.inventory.findIndex(i => i.itemId === itemId);
        if (idx === -1) return false;
        const entry = this.inventory[idx];
        if (entry.quantity < quantity) return false;
        entry.quantity -= quantity;
        if (entry.quantity <= 0) this.inventory.splice(idx, 1);
        return true;
    }

    hasItem(itemId, quantity = 1) {
        const entry = this.inventory.find(i => i.itemId === itemId);
        return entry ? entry.quantity >= quantity : false;
    }

    // ──────────────────────────────────────────
    // Equipment
    // ──────────────────────────────────────────

    /**
     * Check if this member is allowed to equip the given item.
     * @param {string} itemId
     * @param {string} [slotHint]  for rings: 'ring1' or 'ring2'
     * @returns {{ok:boolean, reason?:string}}
     */
    canEquip(itemId, slotHint) {
        if (this.isSummoned) return { ok: false, reason: 'Summoned creatures cannot equip items.' };

        const def = getItemDef(itemId);
        if (!def) return { ok: false, reason: 'Unknown item.' };

        // Armor type gating via armorAllowed array
        if (def.category === ITEM_CATEGORY.ARMOR) {
            const allowed = this.classDef.armorAllowed;
            if (allowed && def.armorType && !allowed.includes(def.armorType)) {
                const list = allowed.map(a => a.charAt(0).toUpperCase() + a.slice(1)).join('/');
                return {
                    ok: false,
                    reason: `${this.classDef.name}s can only wear: ${list}.`,
                };
            }
        }

        // Shield gating — some classes cannot use shields at all (mage, monk, necromancer).
        if (def.category === ITEM_CATEGORY.SHIELD) {
            if (this.classDef.canUseShield === false) {
                return { ok: false, reason: `${this.classDef.name}s cannot use shields.` };
            }
            // Rule 7: cannot wield a shield while a ranged weapon is equipped.
            const weaponId = this.equipment.weapon;
            if (weaponId) {
                const wdef = WEAPONS[weaponId];
                if (wdef && wdef.subtype === 'ranged') {
                    return {
                        ok: false,
                        reason: 'Cannot use a shield while a ranged weapon is equipped.',
                    };
                }
            }
            // Cannot equip a shield while dual-wielding (off-hand auto-unequips,
            // so we allow it — equip() will clear the offhand slot).
        }

        // Off-hand weapon validation.
        if (slotHint === 'offhand') {
            if (def.category !== ITEM_CATEGORY.WEAPON || def.subtype !== 'melee') {
                return { ok: false, reason: 'Only melee weapons can be used in the off hand.' };
            }
            // A shield blocks the off hand (will be auto-unequipped, allow it).
        }

        // Trinket gating — slotHint must match one of the allowed slots for this kind.
        if (def.category === ITEM_CATEGORY.TRINKET) {
            const slots = def.trinketSlots || [];
            if (slots.length === 0) return { ok: false, reason: 'Trinket has no slot.' };
            if (slotHint && !slots.includes(slotHint)) {
                return { ok: false, reason: `That trinket cannot go in the ${slotHint} slot.` };
            }
        }

        return { ok: true };
    }

    /**
     * Equip an item. For rings, pass slotHint='ring1' or 'ring2' to choose
     * which finger — if omitted, picks the first empty ring slot, or ring1
     * if both are occupied.
     */
    equip(itemId, slotHint) {
        const def = getItemDef(itemId);
        if (!def) return false;

        const check = this.canEquip(itemId, slotHint);
        if (!check.ok) return false;

        let slot;
        if (def.category === ITEM_CATEGORY.WEAPON) {
            // Dual-wield: place in offhand slot when explicitly requested.
            slot = (slotHint === 'offhand') ? 'offhand' : 'weapon';
        } else if (def.category === ITEM_CATEGORY.ARMOR)    slot = 'armor';
        else if (def.category === ITEM_CATEGORY.SHIELD)   slot = 'shield';
        else if (def.category === ITEM_CATEGORY.TRINKET) {
            if (slotHint && (def.trinketSlots || []).includes(slotHint)) {
                slot = slotHint;
            } else if (def.trinketKind === 'ring') {
                // Auto-pick empty ring slot; prefer ring1.
                slot = this.equipment.ring1 ? (this.equipment.ring2 ? 'ring1' : 'ring2') : 'ring1';
            } else {
                slot = (def.trinketSlots || [])[0];
            }
        }
        else return false;

        if (!this.hasItem(itemId)) return false;

        if (this.equipment[slot]) this.unequip(slot);

        this.removeItem(itemId);
        this.equipment[slot] = itemId;
        if (def.category === ITEM_CATEGORY.TRINKET) {
            this.refreshTrinketPoolBonuses(true);
        }

        // Rule 7: equipping a ranged weapon auto-unequips any shield.
        if (def.category === ITEM_CATEGORY.WEAPON
            && def.subtype === 'ranged'
            && this.equipment.shield) {
            this.unequip('shield');
        }

        // Dual-wield: equipping an off-hand weapon auto-unequips any shield.
        if (slot === 'offhand' && this.equipment.shield) {
            this.unequip('shield');
        }

        // Equipping a shield auto-unequips any off-hand weapon.
        if (def.category === ITEM_CATEGORY.SHIELD && this.equipment.offhand) {
            this.unequip('offhand');
        }

        return true;
    }

    unequip(slot) {
        const itemId = this.equipment[slot];
        if (!itemId) return false;
        this.equipment[slot] = null;
        // Unequipping a weapon or armor wipes its enchantment (the artificer
        // "kit-tuned" the item to its wielder; swapping breaks the binding).
        if (slot === 'weapon' || slot === 'offhand' || slot === 'armor' || slot === 'shield') {
            if (this.equipmentEnchants) this.equipmentEnchants[slot] = null;
        }
        if (['cloak', 'neck', 'ring1', 'ring2', 'belt'].includes(slot)) {
            this.refreshTrinketPoolBonuses(false);
        }
        this.addItem(itemId);
        return true;
    }

    getWeaponBonus(attackType) {
        const weaponId = this.equipment.weapon;
        let bonus = 0;

        if (weaponId) {
            const def = WEAPONS[weaponId];
            if (def && def.subtype === attackType) {
                // Flat enchant level adds to damage (applies to whichever attack type
                // matches the weapon subtype, so a war blade buffs melee only).
                const ench = this.equipmentEnchants && this.equipmentEnchants.weapon;
                const enchLvl = ench && ench.level ? ench.level : 0;
                bonus += (def.power || 0) + enchLvl;
            }
        }

        // Dual-wield: add off-hand melee weapon power + enchant level.
        if (attackType === 'melee') {
            const offId = this.equipment.offhand;
            if (offId) {
                const def = WEAPONS[offId];
                if (def && def.subtype === 'melee') {
                    const offEnch = this.equipmentEnchants && this.equipmentEnchants.offhand;
                    const offEnchLvl = offEnch && offEnch.level ? offEnch.level : 0;
                    bonus += (def.power || 0) + offEnchLvl;
                }
            }
        }

        return bonus;
    }

    getArmorBlocking() {
        const armorId = this.equipment.armor;
        if (!armorId) return 0;
        const def = getItemDef(armorId);
        if (!def || def.category !== ITEM_CATEGORY.ARMOR) return 0;
        const ench = this.equipmentEnchants && this.equipmentEnchants.armor;
        const enchLvl = ench && ench.level ? ench.level : 0;
        return (def.blocking || 0) + enchLvl;
    }

    /** Current weapon rider ('fire'|'acid'|'poison'|'lightning'|'ice'|null). */
    getWeaponRider() {
        const ench = this.equipmentEnchants && this.equipmentEnchants.weapon;
        return (ench && ench.rider) || null;
    }

    /** Current weapon enchant level (0-7). Legendary items bake in enchantLevel on the def. */
    getWeaponEnchantLevel() {
        const ench = this.equipmentEnchants && this.equipmentEnchants.weapon;
        const slotLevel = (ench && ench.level) || 0;
        const wpnId = this.equipment && this.equipment.weapon;
        const def = wpnId ? getItemDef(wpnId) : null;
        const defLevel = (def && def.enchantLevel) || 0;
        return Math.max(slotLevel, defLevel);
    }

    /** Returns true when this member has an offhand melee weapon equipped. */
    hasOffhandMeleeWeapon() {
        const offId = this.equipment && this.equipment.offhand;
        if (!offId) return false;
        const def = WEAPONS[offId];
        return !!(def && def.subtype === 'melee');
    }

    /** Off-hand melee weapon power + enchant level (0 if none / not melee). */
    getOffhandWeaponPower() {
        const offId = this.equipment && this.equipment.offhand;
        if (!offId) return 0;
        const def = WEAPONS[offId];
        if (!def || def.subtype !== 'melee') return 0;
        const offEnch = this.equipmentEnchants && this.equipmentEnchants.offhand;
        return (def.power || 0) + ((offEnch && offEnch.level) ? offEnch.level : 0);
    }

    /** Off-hand weapon rider (dual-wield only). */
    getOffhandRider() {
        const ench = this.equipmentEnchants && this.equipmentEnchants.offhand;
        return (ench && ench.rider) || null;
    }

    /** Off-hand weapon enchant level (0-7, dual-wield only). Legendary items bake in enchantLevel. */
    getOffhandEnchantLevel() {
        const ench = this.equipmentEnchants && this.equipmentEnchants.offhand;
        const slotLevel = (ench && ench.level) || 0;
        const offId = this.equipment && this.equipment.offhand;
        const def = offId ? getItemDef(offId) : null;
        const defLevel = (def && def.enchantLevel) || 0;
        return Math.max(slotLevel, defLevel);
    }

    /** Current armor enchant level (0-3). */
    getArmorEnchantLevel() {
        const ench = this.equipmentEnchants && this.equipmentEnchants.armor;
        return (ench && ench.level) || 0;
    }

    /** Current shield enchant level (0-7). Legendary items bake in enchantLevel on the def. */
    getShieldEnchantLevel() {
        const ench = this.equipmentEnchants && this.equipmentEnchants.shield;
        const slotLevel = (ench && ench.level) || 0;
        const shieldId = this.equipment && this.equipment.shield;
        const def = shieldId ? getItemDef(shieldId) : null;
        const defLevel = (def && def.enchantLevel) || 0;
        return Math.max(slotLevel, defLevel);
    }

    getShieldBlockChance() {
        const shieldId = this.equipment.shield;
        if (!shieldId) return 0;
        const def = getItemDef(shieldId);
        if (!def || def.category !== ITEM_CATEGORY.SHIELD) return 0;
        const ench = this.equipmentEnchants && this.equipmentEnchants.shield;
        const slotLevel = (ench && ench.level) || 0;
        return (def.blockChance || 0) + slotLevel * 0.01;
    }

    /** Defense bonus from shield: base blocking stat + 1 per enchant rank. */
    getShieldDefenseBonus() {
        const shieldId = this.equipment && this.equipment.shield;
        if (!shieldId) return 0;
        const def = getItemDef(shieldId);
        if (!def || def.category !== ITEM_CATEGORY.SHIELD) return 0;
        const ench = this.equipmentEnchants && this.equipmentEnchants.shield;
        const slotLevel = (ench && ench.level) || 0;
        return (def.blocking || 0) + slotLevel;
    }

    /**
     * Warrior L20 Defend Mode: bonus added to shield block while in defend mode.
     * +1% per 3 warrior levels.
     */
    getDefendModeShieldBonus() {
        if (this.classId !== 'warrior') return 0;
        if (this.level < WARRIOR_DEFEND_MODE_UNLOCK_LEVEL) return 0;
        if (!this.isDefendMode) return 0;
        return Math.floor(this.level / 3) * WARRIOR_DEFEND_BLOCK_BONUS_PER_3LV;
    }

    /**
     * Total shield block chance including Defend Mode bonus.
     * Used for both self-blocking and intercept rolls.
     */
    getAugmentedShieldBlock() {
        return this.getShieldBlockChance() + this.getDefendModeShieldBonus();
    }

    /**
     * Warrior L20 Stun Resistance: chance to ignore a stun effect.
     * Base 20% + 1% per 2 warrior levels (30% at L20).
     */
    getStunResistChance() {
        if (this.classId !== 'warrior') return 0;
        if (this.isSummoned) return 0; // squires haven't trained this ability
        if (this.level < WARRIOR_DEFEND_MODE_UNLOCK_LEVEL) return 0;
        return WARRIOR_STUN_RESIST_BASE + Math.floor(this.level / 2) * WARRIOR_STUN_RESIST_PER_2_LEVELS;
    }

    getRetaliationChance() {
        if (this.classId !== 'warrior') return 0;
        if (this.level < WARRIOR_RETALIATION_UNLOCK_LEVEL) return 0;
        return Math.min(0.95, WARRIOR_RETALIATION_BASE_CHANCE + this.level * WARRIOR_RETALIATION_PER_LEVEL);
    }

    getDragonAuraReduction() {
        if (this.classId !== 'paladin') return 0;
        if (this.level < PALADIN_DRAGONSLAYER_UNLOCK_LEVEL) return 0;
        return Math.min(PALADIN_DRAGON_AURA_PERCENT_CAP, this.level + PALADIN_DRAGON_AURA_PERCENT_OFFSET);
    }

    getClericCleanseChance() {
        if (this.classId !== 'cleric') return 0;
        if (this.level < CLERIC_CLEANSE_UNLOCK_LEVEL) return 0;
        return Math.min(1, this.level * CLERIC_CLEANSE_CHANCE_PER_LEVEL);
    }

    /**
     * Whether this warrior can currently intercept attacks targeting party members.
     * Requires: warrior class, L20+, defend mode ON, shield equipped, alive,
     * not stunned, not held/webbed/petrified/paralyzed.
     */
    canIntercept() {
        if (this.classId !== 'warrior') return false;
        if (this.level < WARRIOR_DEFEND_MODE_UNLOCK_LEVEL) return false;
        if (!this.isDefendMode) return false;
        if (!this.equipment.shield) return false;
        if (this.health <= 0) return false;
        if (this.stunned) return false;
        if (this.webbedRounds > 0) return false;  // covers web, paralysis, constrict, petrify
        return true;
    }

    hasShield() {
        return !!this.equipment.shield;
    }

    // ──────────────────────────────────────────
    // Active combat effects (DoTs, buffs, stun)
    // ──────────────────────────────────────────

    /**
     * Add or refresh an effect. Effects are matched by `type`:
     *  - 'poison': { type:'poison', rounds, damage }
     *  - 'song':   { type:'song', damageBonus, defenseBonus, rounds? }  (bard)
     *  - 'entangle': { type:'entangle', rounds, damageBonus:-N, defenseBonus:-N }
     *
     * If an effect of the same type already exists it is replaced (and for
     * poison the damage is the max of the old and new per-tick value — users
     * can always apply a bigger dose).
     */
    addEffect(effect) {
        if (!effect || !effect.type) return;
        if (this.isSummoned && this.summonStats?.illusionaryWarrior) return;
        if (this.isSummoned && (this.summonType === 'simulacrum' || this.summonType === 'shadow_simulacra') && effect.source === 'bard_song') return;
        if (this.isSummoned && Array.isArray(this.summonStats?.immune)) {
            const immune = this.summonStats.immune;
            if (immune.includes('all_dots') && typeof effect.damage === 'number' && (effect.rounds || 0) > 0) return;
            const byType = {
                poison: 'poison',
                vk_poison: 'poison',
                quasit_poison: 'poison',
                bloat_poison: 'poison',
                bleed: 'bleed',
                ranger_totem_bleed: 'bleed',
                burn: 'fire',
                avatar_fire: 'fire',
                acid_dot: 'acid',
                vk_acid_dot: 'acid',
                chilled: 'cold',
                frost_dot: 'cold',
                shocked: 'lightning',
                lightning_dot: 'lightning',
                psychic_dot: 'psychic',
                drowning: 'all_dots',
                poison_weapon: 'all_dots',
                rogue_trap_dot: 'all_dots',
                insect_plague_poison: 'all_dots',
                vk_swarm_poison: 'all_dots',
                vk_swarm_acid: 'all_dots',
                shadow_fire_dot: 'all_dots',
                shadow_ice_dot: 'all_dots',
                shadow_lightning_dot: 'all_dots',
                shadow_acid_dot: 'all_dots',
                shadow_poison_dot: 'all_dots',
                shadow_psychic_dot: 'all_dots',
                shadow_sonic_dot: 'all_dots',
                shadow_bleed_dot: 'all_dots',
                awakened_ember_brand: 'all_dots',
                awakened_void_rot: 'all_dots',
                awakened_grave_rot: 'all_dots',
                awakened_pox: 'all_dots',
                awakened_mind_burn: 'all_dots',
                awakened_saint_scorch: 'all_dots',
            };
            const immuneTag = byType[effect.type];
            if (immuneTag && immune.includes(immuneTag)) return;
        }
        // Shadow Step: immune to all hostile debuffs while vanished
        if (this.activeEffects.some(e => e.type === 'shadow_step' && (e.rounds || 0) > 0)) {
            const _HOSTILE = new Set(['poison','burn','acid_dot','drowning','drown_armor_break',
                'ice_chill','shocked','chilled','petrified','anti_magic_beam','slow_ray',
                'mummy_rot','hag_curse','fracture','necrotic_curse','hex','wither',
                'rust_corrosion','taunted','quasit_poison','rogue_trap_dot']);
            if (_HOSTILE.has(effect.type)) return;
        }
        const existingIdx = this.activeEffects.findIndex(e => e.type === effect.type);
        if (existingIdx !== -1) {
            const prev = this.activeEffects[existingIdx];
            if (effect.type === 'poison') {
                effect = {
                    ...effect,
                    damage: Math.max(prev.damage || 0, effect.damage || 0),
                };
            }
            this.activeEffects[existingIdx] = effect;
        } else {
            this.activeEffects.push({ ...effect });
        }
    }

    hasEffect(type) {
        return this.activeEffects.some(e => e.type === type);
    }

    /**
     * Remove all expired effects (rounds <= 0, OR timed `expiresAt` in the past).
     * Called at the start of each combat round AND from tickRegen() so that
     * time-bounded buffs like elixir_warding / elixir_wrath expire correctly
     * whether the player is in combat or exploring.
     */
    expireEffects() {
        const now = Date.now();
        const expired = [];
        this.activeEffects = this.activeEffects.filter(e => {
            if (!e) return false;
            if (typeof e.expiresAt === 'number' && e.expiresAt <= now) { expired.push(e); return false; }
            if ('rounds' in e && e.rounds <= 0) { expired.push(e); return false; }
            return true;
        });
        // Handle pool-bonus expiry: reduce maxHealth/maxMana/maxStamina and clamp current values.
        for (const e of expired) {
            if (e.type === 'fountain_hp' && e.poolBonus > 0) {
                this.maxHealth = Math.max(1, this.maxHealth - e.poolBonus);
                if (this.health > this.maxHealth) this.health = this.maxHealth;
            }
            if (e.type === 'fountain_mp' && e.poolBonus > 0) {
                this.maxMana = Math.max(0, this.maxMana - e.poolBonus);
                if (this.mana > this.maxMana) this.mana = this.maxMana;
            }
            if (e.type === 'fountain_st' && e.poolBonus > 0) {
                this.maxStamina = Math.max(0, this.maxStamina - e.poolBonus);
                if (this.stamina > this.maxStamina) this.stamina = this.maxStamina;
            }
        }
    }

    /**
     * Clear combat-only state when leaving combat.
     *
     * Phase 10: poison must persist across the combat boundary so the
     * out-of-combat DoT tick (once per 10s of exploration time) can
     * keep working. All other effects (song buffs, entangle debuffs,
     * etc.) are stripped as before.
     */
    clearCombatState() {
        // Keep: poison (so out-of-combat DoT tick works), timed elixirs that
        // still have wall-clock time remaining, and persistent bard song buffs.
        this.activeEffects = (this.activeEffects || []).filter(e => {
            if (!e) return false;
            if (e.type === 'poison') return true;
            if (e.source === 'bard_song') return true;
            if (typeof e.expiresAt === 'number' && e.expiresAt > Date.now()) return true;
            return false;
        });
        this.stunned = false;
        this.webbedRounds = 0;
        this.usedBardSong = false;
        this.isRaging = false;
        this.usedRage = false;
        this.rageEncourageRounds = 0;
        if (this.werebearHpBonus > 0) {
            this.maxHealth = Math.max(1, this.maxHealth - this.werebearHpBonus);
            this.health = Math.min(this.health, this.maxHealth);
        }
        this.werebearActive = false;
        this.werebearUsed = false;
        this.werebearHpBonus = 0;
        this.werebearDefenseBonus = 0;
        this.odinsRavensTriggered = false;
        this.fireAuraActive = false;
        this.dragonslayerActive = false;
        if (this.paladinSteedHpBonus > 0) {
            this.maxHealth = Math.max(1, this.maxHealth - this.paladinSteedHpBonus);
            this.health = Math.min(this.health, this.maxHealth);
        }
        this.paladinSteedActive = false;
        this.paladinSteedUsed = false;
        this.paladinSteedHpBonus = 0;
        this.martyrsCovenantActive = false;
        this.martyrsCovenantSuppressedRound = 0;
        this.rangerTotem = null;
        this.avatarActive = false;
        this.avatarElement = 'fire';
        this.isDefendMode        = false;
        this.warriorTauntActive  = false;
        this.isInFormation       = false;
        this.squiresSummoned     = false;
        this.manaShieldActive    = false;
        this.manaShieldUsed      = false;
        this.manaShieldHp        = 0;
        this.mageDeathBurstTriggered = false;
        this.divineJudgmentUsed  = false;
        this.kiCharges           = 0;
        this.spiritualWeapons    = [];
        this.divineShroudActive  = false;
        this.shadowStepUsed      = false;
        this.prismaticSphereUsed = false;
        this.eternalRainbowUsed  = false;
        this.hunterMarkEnemyId   = null;
        this.bonusTurnPending    = false;
        this.beastlordActive     = false;
        // Lich form is a combat-only transformation — always collapse it when
        // leaving combat (flee, defeat, victory all call clearCombatState).
        this.isLichForm = false;
        this.lichPhial  = false;
        // Wild Shape — undo HP doubling and restore row when leaving combat.
        if (this.wildShapeHpBonus > 0) {
            this.maxHealth = Math.max(1, this.maxHealth - this.wildShapeHpBonus);
            this.health = Math.min(this.health, this.maxHealth);
        }
        if (this.wildShapeOrigRow) this.row = this.wildShapeOrigRow;
        this.wildShapeForm    = null;
        this.wildShapeHpBonus  = 0;
        this.wildShapeDefBonus = 0;
        this.wildShapeOrigRow  = null;
        this.elementalRiftOpen = false;
        this.elementalRiftUsed = false;
        this.warlockCauldronOpen = false;
        this.warlockAwakenActive = false;
        this.warlockAwakenSummons = 0;
        this.warlockAwakenSummonIds = [];
        if (this.abyssFormHpBonus > 0) {
            this.maxHealth = Math.max(1, this.maxHealth - this.abyssFormHpBonus);
            this.health = Math.min(this.health, this.maxHealth);
        }
        if (this.abyssFormOrigRow) this.row = this.abyssFormOrigRow;
        this.abyssFormActive = false;
        this.abyssFormUsed = false;
        this.abyssFormHpBonus = 0;
        this.abyssFormDefBonus = 0;
        this.abyssFormOrigRow = null;
        this.eldritchSignReady = true;
        this.golemBerserkActive = false;
        this.golemBerserkUsed   = false;
        this.thunderousDrumsActive = false;
        this.symphonyActive = false;
        this.symphonyRound = 0;
        this.symphonyManaCost = 0;
        this.symphonyStaCost = 0;
        this.symphonyUsedThisCombat = false;
        this.heroicDeedTokens = 0;
        this.rapidAssaultPending = false;
    }

    // ──────────────────────────────────────────
    // Regen
    // ──────────────────────────────────────────

    tickRegen(dt) {
        if (this.health <= 0) return;

        // Expire any timed elixir buffs / other wall-clock effects.
        this.expireEffects();

        // Photomancer Illusionary Warriors are not living bodies; they do not
        // receive passive HP/ST/MP regeneration or healing buffs.
        if (this.isSummoned && this.summonStats?.illusionaryWarrior) return;

        // Dying HP drain — applied even when dead-by-hunger, before regen block.
        if (this.hungerState === 'dying') {
            this._dyingDrainAcc += FOOD_DYING_HP_PER_MIN * dt / 60;
            if (this._dyingDrainAcc >= 1) {
                const dmg = Math.floor(this._dyingDrainAcc);
                this._dyingDrainAcc -= dmg;
                this.health = Math.max(0, this.health - dmg);
            }
        }

        // Starving / dying blocks all regeneration.
        if (this.hungerState === 'starving' || this.hungerState === 'dying') return;

        this._regenHpAcc += this.getRegenRate('hp') * dt / 60;
        this._regenStAcc += this.getRegenRate('st') * dt / 60;
        this._regenMpAcc += this.getRegenRate('mp') * dt / 60;

        if (this._regenHpAcc >= 1 && this.health < this.maxHealth) {
            const inc = Math.floor(this._regenHpAcc);
            this._regenHpAcc -= inc;
            this.health = Math.min(this.maxHealth, this.health + inc);
        }
        if (this._regenStAcc >= 1 && this.stamina < this.maxStamina) {
            const inc = Math.floor(this._regenStAcc);
            this._regenStAcc -= inc;
            this.stamina = Math.min(this.maxStamina, this.stamina + inc);
        }
        if (this._regenMpAcc >= 1 && this.mana < this.maxMana) {
            const inc = Math.floor(this._regenMpAcc);
            this._regenMpAcc -= inc;
            this.mana = Math.min(this.maxMana, this.mana + inc);
        }

        if (this.health  >= this.maxHealth)  this._regenHpAcc = 0;
        if (this.stamina >= this.maxStamina) this._regenStAcc = 0;
        if (this.mana    >= this.maxMana)    this._regenMpAcc = 0;
    }

    // ──────────────────────────────────────────
    // Serialization
    // ──────────────────────────────────────────

    serialize() {
        const out = {
            id: this.id,
            name: this.name,
            classId: this.classId,
            speciesId: this.speciesId,
            level: this.level,
            xp: this.xp,
            row: this.row,
            health: this.health,
            maxHealth: this.maxHealth,
            stamina: this.stamina,
            maxStamina: this.maxStamina,
            mana: this.mana,
            maxMana: this.maxMana,
            portraitSeed: this.portraitSeed,
            inventory: this.inventory.map(i => ({ ...i })),
            // Deep-copy equipment because slots can hold instance objects
            // (itemId + enchant) as well as plain strings.
            equipment: this._serializeEquipment(),
            activeSongs: [...(this.activeSongs || [])],
            favoredEnemy: this.favoredEnemy || null,
            extraFavoredEnemies: [...(this.extraFavoredEnemies || [])],
            familiar: this.familiar ? { ...this.familiar } : null,
            hungerState: this.hungerState || null,
            foodTimer:   this.foodTimer   || 0,
            // Persist wall-clock-based active buffs (scroll of warding/wrath) so
            // they survive saves. Only effects with a future expiresAt are kept.
            savedEffects: (this.activeEffects || [])
                .filter(e => e && typeof e.expiresAt === 'number' && e.expiresAt > Date.now())
                .map(e => ({ ...e })),
            equipmentEnchants: {
                weapon:  this.equipmentEnchants && this.equipmentEnchants.weapon
                    ? { ...this.equipmentEnchants.weapon }  : null,
                offhand: this.equipmentEnchants && this.equipmentEnchants.offhand
                    ? { ...this.equipmentEnchants.offhand } : null,
                armor:   this.equipmentEnchants && this.equipmentEnchants.armor
                    ? { ...this.equipmentEnchants.armor }   : null,
                shield:  this.equipmentEnchants && this.equipmentEnchants.shield
                    ? { ...this.equipmentEnchants.shield }  : null,
            },
            trinketEnchants: {
                cloak: this.trinketEnchants && this.trinketEnchants.cloak
                    ? { ...this.trinketEnchants.cloak } : null,
                neck:  this.trinketEnchants && this.trinketEnchants.neck
                    ? { ...this.trinketEnchants.neck }  : null,
                ring1: this.trinketEnchants && this.trinketEnchants.ring1
                    ? { ...this.trinketEnchants.ring1 } : null,
                ring2: this.trinketEnchants && this.trinketEnchants.ring2
                    ? { ...this.trinketEnchants.ring2 } : null,
                belt:  this.trinketEnchants && this.trinketEnchants.belt
                    ? { ...this.trinketEnchants.belt }  : null,
            },
            trinketPoolBonus: { ...(this._trinketPoolBonus || { health: 0, stamina: 0, mana: 0 }) },
        };
        // Persist summon fields so PERSISTENT summons (golems) survive save/load.
        // Non-persistent summons are stripped by Game._onCombatEnd before save.
        if (this.isSummoned) {
            out.isSummoned  = true;
            out.summonType  = this.summonType;
            out.summonerId  = this.summonerId;
            out.canBeHealed = this.canBeHealed;
            out.summonStats = this.summonStats ? { ...this.summonStats } : null;
            out.isPersistent = !!this.isPersistent;
        }
        return out;
    }

    _serializeEquipment() {
        const copy = {};
        for (const [slot, val] of Object.entries(this.equipment)) {
            if (val && typeof val === 'object') {
                copy[slot] = {
                    itemId: val.itemId,
                    enchant: val.enchant ? { ...val.enchant } : null,
                };
            } else {
                copy[slot] = val;
            }
        }
        return copy;
    }

    static deserialize(data) {
        return new PartyMember(data);
    }
}
