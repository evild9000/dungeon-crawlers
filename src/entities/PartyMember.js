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
import { getSpeciesDef, SPECIES_IDS } from './Species.js';
import {
    INITIAL_HEALTH, INITIAL_STAMINA, INITIAL_MANA,
    REGEN_HP_PER_MIN, REGEN_ST_PER_MIN, REGEN_MP_PER_MIN,
    LEVEL_HP_PER, LEVEL_ST_PER, LEVEL_MP_PER,
    MAX_LEVEL, XP_LEVEL_BASE,
    MONK_DODGE_CHANCE, MONK_DODGE_MAX,
} from '../utils/constants.js';

function generateId() {
    return 'pm_' + Date.now().toString(36) + '_' + Math.random().toString(36).slice(2, 8);
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
        portraitSeed, inventory, equipment, equipmentEnchants,
        classId, speciesId,
        isSummoned, summonType, summonerId, canBeHealed, summonStats,
        isPersistent,
        level, xp, row,
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

        // Transient combat state (not serialized; cleared when combat ends)
        this.activeEffects = [];  // e.g. [{ type:'poison', rounds:3, damage:4 }, { type:'song', bonus:2 }]
        this.stunned = false;
        this.webbedRounds = 0;   // Phase 11 — web lockdown counter (rounds left)
        this.usedBardSong = false;  // "once per combat" tracker

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

        // Per-member equipment enchantments. Keyed by equipment slot
        // ('weapon', 'armor'). Enchants persist on the slot; unequipping
        // removes the enchant (crafting cost is a commitment).
        //   equipmentEnchants.weapon = { level:1..3, rider:'fire'|'acid'|'poison'|'lightning'|'ice'|null }
        //   equipmentEnchants.armor  = { level:1..3 }
        const DEFAULT_ENCHANTS = { weapon: null, armor: null };
        this.equipmentEnchants = equipmentEnchants
            ? { ...DEFAULT_ENCHANTS, ...equipmentEnchants }
            : { ...DEFAULT_ENCHANTS };

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
            if (def.bonusType === bonusType) total += (def.bonusValue || 0);
        }
        return total;
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
            if (kind === 'damage'  && typeof e.damageBonus  === 'number') total += e.damageBonus;
            if (kind === 'defense' && typeof e.defenseBonus === 'number') total += e.defenseBonus;
        }
        return total;
    }

    /** Flat damage bonus for a given attack type, including per-level scaling and trinkets. */
    getClassDamageBonus(type) {
        const c = this.classDef, s = this.speciesDef;
        const bonusBeyondL1 = Math.max(0, this.level - 1);
        const trinket = this.getTrinketBonus(type);
        const effect  = this.getEffectModifier('damage');
        if (type === 'melee') {
            return (c.meleeBonus || 0) + (s.meleeBonus || 0)
                 + (c.meleePerLevel || 0) * bonusBeyondL1
                 + trinket + effect;
        }
        if (type === 'ranged') {
            return (c.rangedBonus || 0) + (s.rangedBonus || 0)
                 + (c.rangedPerLevel || 0) * bonusBeyondL1
                 + trinket + effect;
        }
        if (type === 'magic') {
            return (c.magicBonus || 0) + (s.magicBonus || 0)
                 + (c.magicPerLevel || 0) * bonusBeyondL1
                 + trinket + effect;
        }
        return 0;
    }

    /** Total defense = species + class base + class-per-level + summon defense + trinkets + effects. */
    getTotalDefense() {
        if (this.isSummoned) return (this.summonStats && this.summonStats.defense) || 0;
        const c = this.classDef, s = this.speciesDef;
        const beyond = Math.max(0, this.level - 1);
        return (c.defenseBonus || 0)
             + (s.defenseBonus || 0)
             + (c.defensePerLevel || 0) * beyond
             + this.getTrinketBonus('defense')
             + this.getEffectModifier('defense');
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
     * Extra melee swings per turn (warriors only). +1 swing at every multiple
     * of 5 levels: L5→+1, L10→+2, L15→+3, L20→+4.
     */
    getExtraMeleeAttacks() {
        return this.classId === 'warrior' ? Math.floor(this.level / 5) : 0;
    }

    /**
     * Extra ranged shots per turn (rangers only). Same cadence as warrior
     * extra melees: +1 shot at every multiple of 5 levels.
     */
    getExtraRangedAttacks() {
        return this.classId === 'ranger' ? Math.floor(this.level / 5) : 0;
    }

    /** Regen rate per minute for a given pool, including class + species bonuses. */
    getRegenRate(pool) {
        const c = this.classDef, s = this.speciesDef;
        if (pool === 'hp') return REGEN_HP_PER_MIN + (c.regenHp || 0) + (s.regenHp || 0);
        if (pool === 'st') return REGEN_ST_PER_MIN + (c.regenSt || 0) + (s.regenSt || 0);
        if (pool === 'mp') return REGEN_MP_PER_MIN + (c.regenMp || 0) + (s.regenMp || 0);
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
        if (slot === 'weapon' || slot === 'armor') {
            if (this.equipmentEnchants) this.equipmentEnchants[slot] = null;
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

        // Dual-wield: add off-hand melee weapon power (no enchant for off hand).
        if (attackType === 'melee') {
            const offId = this.equipment.offhand;
            if (offId) {
                const def = WEAPONS[offId];
                if (def && def.subtype === 'melee') {
                    bonus += (def.power || 0);
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

    /** Current weapon enchant level (0-3). */
    getWeaponEnchantLevel() {
        const ench = this.equipmentEnchants && this.equipmentEnchants.weapon;
        return (ench && ench.level) || 0;
    }

    /** Current armor enchant level (0-3). */
    getArmorEnchantLevel() {
        const ench = this.equipmentEnchants && this.equipmentEnchants.armor;
        return (ench && ench.level) || 0;
    }

    getShieldBlockChance() {
        const shieldId = this.equipment.shield;
        if (!shieldId) return 0;
        const def = getItemDef(shieldId);
        if (!def || def.category !== ITEM_CATEGORY.SHIELD) return 0;
        return def.blockChance || 0;
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
        this.activeEffects = this.activeEffects.filter(e => {
            if (!e) return false;
            if (typeof e.expiresAt === 'number' && e.expiresAt <= now) return false;
            if ('rounds' in e && e.rounds <= 0) return false;
            return true;
        });
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
        // Keep: poison (so out-of-combat DoT tick works) and any timed elixirs
        //       (warding/wrath) that still have wall-clock time remaining.
        this.activeEffects = (this.activeEffects || []).filter(e => {
            if (!e) return false;
            if (e.type === 'poison') return true;
            if (typeof e.expiresAt === 'number' && e.expiresAt > Date.now()) return true;
            return false;
        });
        this.stunned = false;
        this.webbedRounds = 0;
        this.usedBardSong = false;
    }

    // ──────────────────────────────────────────
    // Regen
    // ──────────────────────────────────────────

    tickRegen(dt) {
        if (this.health <= 0) return;

        // Expire any timed elixir buffs / other wall-clock effects.
        this.expireEffects();

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
            equipmentEnchants: {
                weapon: this.equipmentEnchants && this.equipmentEnchants.weapon
                    ? { ...this.equipmentEnchants.weapon } : null,
                armor:  this.equipmentEnchants && this.equipmentEnchants.armor
                    ? { ...this.equipmentEnchants.armor } : null,
            },
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
