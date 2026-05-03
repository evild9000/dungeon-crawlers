import {
    MELEE_STAMINA_COST, MELEE_DAMAGE_MIN, MELEE_DAMAGE_MAX,
    RANGED_STAMINA_COST, RANGED_DAMAGE_MIN, RANGED_DAMAGE_MAX,
    MAGIC_MANA_COST, MAGIC_DAMAGE_MIN, MAGIC_DAMAGE_MAX,
    MONSTER_MELEE_STAMINA_COST, MONSTER_MELEE_DAMAGE_MIN, MONSTER_MELEE_DAMAGE_MAX,
    MONSTER_MAGIC_MANA_COST, MONSTER_MAGIC_DAMAGE_MIN, MONSTER_MAGIC_DAMAGE_MAX,
    MONSTER_DAMAGE_PER_LEVEL,
    MONSTER_DAMAGE_BONUS_THRESHOLD, MONSTER_DAMAGE_BONUS_PER_LEVEL,
    INITIATIVE_DIE,
    FLEE_CHANCE, POST_COMBAT_RECOVERY,
    ENEMY_TYPES,
    LOOT_GOLD_MIN, LOOT_GOLD_MAX,
    LOOT_FOOD_CHANCE, LOOT_POTION_CHANCE,
    LOOT_WEAPON_CHANCE, LOOT_ARMOR_CHANCE, LOOT_SHIELD_CHANCE,
    LOOT_EXTRA_CHAR_BONUS, LOOT_DROP_PER_LEVEL,
    MONSTER_DAMAGE_MULTIPLIER,
    RANGED_CRIT_CHANCE,
    MELEE_STUN_CHANCE,
    BACKSTAB_STAMINA_MULT, BACKSTAB_DAMAGE_MULT,
    BACKSTAB_DAMAGE_PER_LEVEL, BACKSTAB_INSTAKILL_CHANCE,
    CLERIC_HEAL_MANA_COST, CLERIC_HEAL_PERCENT,
    MAGE_SHIELD_MANA_COST, MAGE_SHIELD_BASE_DEF, MAGE_SHIELD_BASE_ROUNDS, MAGE_SHIELD_BONUS_EVERY, MAGE_SHIELD_MIN_LEVEL,
    NECRO_SUMMON_MANA_COST, NECRO_LIFE_DRAIN_CHANCE, NECRO_LIFE_DRAIN_AMOUNT,
    NECRO_UNDEAD_MANA_UPKEEP,
    NECRO_DARK_HARVEST_HP_FRAC, NECRO_DARK_HARVEST_ST_FRAC, NECRO_DARK_HARVEST_MANA_FRAC,
    BARBARIAN_RAGE_STAMINA_COST, BARBARIAN_RAGE_HP_REGEN,
    MONK_MELEE_MANA_COST, MONK_WHIRLWIND_CHANCE,
    MONK_DODGE_CHANCE, MONK_DODGE_STAMINA_COST, MONK_DODGE_MANA_COST,
    RANGER_SUMMON_MANA_COST,
    BARD_SONG_MANA_COST, BARD_SONG_BASE_BONUS,
    BARD_DISRUPT_MANA_COST,
    DRUID_ENTANGLE_MANA_COST, DRUID_ENTANGLE_BASE_DEBUFF, DRUID_ENTANGLE_CHANCE,
    DRUID_SUMMON_MANA_COST,
    POISON_DURATION_ROUNDS, POISON_DAMAGE_FRACTION,
    WEB_DURATION_ROUNDS,
    TRINKET_DROP_CHANCE,
    XP_PER_MONSTER_LEVEL,
    LOOT_TORCH_CHANCE,
    LOOT_REAGENT_COMMON_BASE, LOOT_REAGENT_UNCOMMON_BASE, LOOT_REAGENT_RARE_BASE,
    LOOT_REAGENT_EPIC_BASE, LOOT_REAGENT_LEGENDARY_BASE, LOOT_REAGENT_MYTHIC_BASE, LOOT_REAGENT_DIVINE_BASE,
    LOOT_REAGENT_CHANCE_PER_LVL, LOOT_REAGENT_CHANCE_MAX,
    REAGENT_TIER_UNCOMMON_MIN, REAGENT_TIER_RARE_MIN,
    REAGENT_TIER_EPIC_MIN, REAGENT_TIER_LEGENDARY_MIN, REAGENT_TIER_MYTHIC_MIN, REAGENT_TIER_DIVINE_MIN,
    CLERIC_REVIVE_MANA_COST, CLERIC_REVIVE_MIN_LEVEL, CLERIC_REVIVE_HEAL_FRAC,
    CLERIC_TURN_UNDEAD_MIN_LEVEL, CLERIC_TURN_UNDEAD_MANA_COST,
    CLERIC_TURN_UNDEAD_DAMAGE_MULT, CLERIC_TURN_UNDEAD_DEBUFF_BASE, CLERIC_TURN_UNDEAD_DEBUFF_EVERY,
    REAGENT_BOSS_RARE_MIN, REAGENT_BOSS_RARE_MAX,
    REAGENT_BOSS_HIGH_TIER_AMOUNT, REAGENT_MEGABOSS_HIGH_TIER_AMOUNT,
    SCATTER_SPLASH_BASE, SCATTER_SPLASH_EVERY, SCATTER_SPLASH_FRACTION,
    ARTIFICER_HEAL_GOLEM_PCT,
    PALADIN_SMITE_MANA_COST,
    PALADIN_SMITE_INSTAKILL_BASE, PALADIN_SMITE_INSTAKILL_PER_LEVEL,
    PALADIN_HEAL_MANA_COST, PALADIN_HEAL_PERCENT,
    PALADIN_FIRE_AURA_MANA_PER_ROUND,
    RIDER_PROC_CHANCE, RIDER_DOT_DAMAGE_FRACTION,
    RIDER_FIRE_DAMAGE_BONUS_MULT, RIDER_FIRE_BONUS_ROUNDS,
    RIDER_DOT_BASE_ROUNDS, RIDER_DEBUFF_BASE_ROUNDS,
    WRAITH_DRAIN_FRACTION, DRAKE_FIRE_BURN_ROUNDS, DRAKE_FIRE_BURN_FRACTION,
    GHOUL_PARALYZE_CHANCE, TREANT_HOLD_CHANCE,
    STUN_BOSS_RESIST_CHANCE, STUN_MEGABOSS_RESIST_CHANCE,
    DRUID_COMMUNE_UNLOCK_LEVEL, DRUID_COMMUNE_FAE_TOKENS_NEEDED,
    FAERIE_QUEEN_DEFENSE_BASE, FAERIE_QUEEN_HOLD_BASE, FAERIE_QUEEN_HOLD_PER_3LV,
    FAERIE_QUEEN_POISON_FRAC_BASE, FAERIE_QUEEN_POISON_FRAC_PER_LV,
    FAERIE_QUEEN_MAGIC_DMG_RESIST, FAERIE_QUEEN_HP_MULT,
    MAGE_MIRROR_IMAGE_UNLOCK_LEVEL, MAGE_MIRROR_IMAGE_MANA_COST, MAGE_MIRROR_IMAGE_COUNT_DIVISOR,
    MAGE_AOE_CRIT_CHANCE_PER_2LV, MAGE_AOE_CRIT_DAMAGE_BASE, MAGE_AOE_CRIT_DAMAGE_PER_LV,
    NECRO_LICH_FORM_UNLOCK_LEVEL, NECRO_LICH_FORM_MANA_PER_ROUND,
    NECRO_LICH_REVIVE_HP_BASE, NECRO_LICH_REVIVE_HP_PER_2LV, NECRO_LICH_REVIVE_ROUNDS,
    NECRO_LICH_MAGIC_RESIST_BASE, NECRO_LICH_MAGIC_RESIST_PER_4LV,
    BARBARIAN_BLOOD_RAGE_UNLOCK_LEVEL, BARBARIAN_TEMP_HP_PER_HIT_FRAC,
    BARBARIAN_WOUND_THRESH_1, BARBARIAN_WOUND_THRESH_2, BARBARIAN_WOUND_THRESH_3,
    BARBARIAN_WOUND_MULT_1, BARBARIAN_WOUND_MULT_2, BARBARIAN_WOUND_MULT_3,
    WARRIOR_DEFEND_MODE_UNLOCK_LEVEL, WARRIOR_INTERCEPT_DAMAGE_MULT,
    MONK_QUIVERING_PALM_UNLOCK_LEVEL, MONK_QUIVERING_PALM_DURATION_BASE,
    MONK_QUIVERING_PALM_DURATION_PER_10LV, MONK_QUIVERING_PALM_STACK_CAP_DIVISOR,
    MONK_QUIVERING_PALM_STACK_CAP_MAX,
    PALADIN_L20_UNLOCK_LEVEL, PALADIN_AOE_SMITE_MANA_MULT,
    PALADIN_AOE_SMITE_DAMAGE_MULT, PALADIN_AOE_SMITE_INSTAKILL_MULT,
    PALADIN_SMITE_INSTAKILL_CAP, PALADIN_SMITE_BOSS_DAMAGE_MULT,
    CLERIC_MASS_REGEN_UNLOCK_LEVEL, CLERIC_MASS_REGEN_BASE_PCT,
    CLERIC_MASS_REGEN_PER_3_LEVELS, CLERIC_MASS_REGEN_DURATION_PER_4LV,
    CLERIC_MASS_REGEN_MANA_COST,
    CLERIC_MASS_REVIVE_UNLOCK_LEVEL, CLERIC_MASS_REVIVE_COUNT_DIVISOR,
    CLERIC_MASS_REVIVE_HEAL_BASE, CLERIC_MASS_REVIVE_HEAL_PER_3LV,
    CLERIC_MASS_REVIVE_MANA_COST,
    BARD_CHARM_UNLOCK_LEVEL, BARD_CHARM_MANA_COST,
    BARD_CHARM_BASE_CHANCE, BARD_CHARM_CHANCE_PER_2_LV,
    BARD_CHARM_DURATION_DIVISOR, BARD_CHARM_IMMUNE_TAGS,
    RANGER_EXPLOSIVE_ARROW_UNLOCK_LEVEL, RANGER_EXPLOSIVE_ARROW_STAMINA_MULT,
    RANGER_EXPLOSIVE_ARROW_DAMAGE_MULT, RANGER_EXPLOSIVE_ARROW_CRIT_MULT,
    RANGER_EXPLOSIVE_ARROW_INSTAKILL_MULT,
    ROGUE_BACKSTAB_BLEED_UNLOCK_LEVEL, ROGUE_BACKSTAB_BLEED_FRAC,
    ROGUE_BACKSTAB_BLEED_DURATION_DIVISOR,
} from '../utils/constants.js';
import {
    randomWeaponDrop, randomArmorDrop, randomShieldDrop,
    randomTrinketDrop, getItemDef,
} from '../items/ItemTypes.js';
import { PartyMember } from '../entities/PartyMember.js';
import {
    UNDEAD_TIERS, getNecromancerUnlocked, rollUndeadStats,
    BEAST_TYPES, rollBeastStats,
    GOLEM_TIERS, GOLEM_PRESETS, getArtificerUnlockedGolems, rollGolemStats,
} from '../entities/Summons.js';

function randomInt(min, max) {
    return min + Math.floor(Math.random() * (max - min + 1));
}

/**
 * CombatSystem — turn-based combat engine with class specials.
 *
 * Class-specific actions (exposed as public methods called by CombatUI):
 *   - backstab(target)        — rogue only (can use from back row)
 *   - clericHeal(target)      — cleric only
 *   - summonUndead(tierIdx)   — necromancer only (L1 Skeleton, L3 Zombie, …)
 *   - summonBeast(beastId)    — ranger OR druid ('bear' | 'eagle' | 'pixie')
 *   - bardSong()              — bard only (once per combat; party-wide buff)
 *   - druidEntangle()         — druid only (AoE debuff)
 *
 * Phase 8 mechanics:
 *   - Fallen PartyMembers STAY fallen after combat (no auto-revive).
 *   - Summons are pushed directly into gameState.party so the PartyHUD
 *     reflects them. After VICTORY/DEFEAT/FLED, Game.js cleans them up.
 *   - DoTs / buffs / debuffs are stored on `activeEffects` arrays for both
 *     party members and enemies; they tick at the start of each round.
 *   - Poison: applied on some monster melee (spiders, slimes, basilisks).
 *     Pattern is reusable for player-side DoTs.
 *   - Stun: Trolls have a chance to stun on hit (same semantics as warrior
 *     melee stun); template also used for any future "lose your turn" abilities.
 *   - Troll regen: 25% of max HP per turn at the start of the enemy round.
 *   - Cultist AoE magic: magic attacks hit every front-row member at once.
 *   - Backstab damage = base × 2 × (1 + 0.10 × rogueLevel). Instakill stays 5%+1%/level.
 */
export class CombatSystem {
    constructor() {
        this.party = [];
        this.enemies = [];
        this.currentMemberIndex = 0;
        this.phase = 'IDLE';
        this.log = [];
        this.playerLog  = [];   // messages from player-turn actions
        this.enemyLog   = [];   // messages from enemy-turn actions
        this._logTarget = 'player'; // 'player' | 'enemy'
        this.loot = null;
        this.xpEarned = 0;
        this.levelUpLogs = [];
        this.onUpdate = null;
        this.turnNumber = 0;
        this.dungeonLevel = 1;
        // Initiative — sorted list of {kind:'party'|'enemy', ref, init, skipThisRound}
        this._initiativeOrder = [];
        this._initTurnIdx = 0;
        // Tracks which mage has an active shield so only one can be up at a time.
        this._mageShieldCasterId = null;
        // Shared reference to the party inventory (artificer golem crafting /
        // healing consumes reagents). Set via startCombat or setInventory.
        this.inventory = null;
    }

    /** Game.js can assign the live inventory reference (also set in startCombat). */
    setInventory(inv) { this.inventory = inv || null; }

    // ────────────────────────────────────────────
    // Lifecycle
    // ────────────────────────────────────────────

    /**
     * Begin combat. NOTE: `party` is stored *by reference* so that any summons
     * we push into `this.party` are also visible on gameState.party (used by
     * PartyHUD). Do NOT slice the party array here.
     *
     * @param {PartyMember[]} party
     * @param {Enemy[]} enemies
     * @param {number} [dungeonLevel=1]
     */
    startCombat(party, enemies, dungeonLevel = 1, inventory = null) {
        this.party = party;                 // live reference (see note above)
        // Guard: only bring in enemies that are actually alive.  Dead entries
        // (health ≤ 0) can sneak in when a trigger enemy was dying on the same
        // frame, or when force-spawned extras race with the previous combat's
        // cleanup. Filtering here prevents the "instant victory" on entry.
        this.enemies = enemies.filter(e => e.health > 0);
        if (inventory) this.inventory = inventory;
        this.currentMemberIndex = 0;
        this.log = [];
        this.loot = null;
        this._mageShieldCasterId = null;
        this.xpEarned = 0;
        this.levelUpLogs = [];
        this.turnNumber = 1;
        this.dungeonLevel = Math.max(1, dungeonLevel | 0);
        this.phase = 'IDLE'; // Reset any stale phase from a previous combat.

        // If the enemy list is empty after filtering abort and signal a free win
        // so Game.js cleans up properly rather than leaving combat in a bad state.
        if (this.enemies.length === 0) {
            this._addLog('--- No living enemies found — victory! ---');
            this.phase = 'VICTORY';
            this.loot = { gold: 0, items: [] };
            this._notify();
            return;
        }

        for (const e of this.enemies) {
            e.stunned = false;
            e.activeEffects = e.activeEffects || [];
            e.activeEffects.length = 0;
        }
        for (const m of this.party) {
            if (typeof m.clearCombatState === 'function') m.clearCombatState();
        }

        this._addLog('--- Combat begins! ---');
        const n = this.enemies.length;
        const lvlStr = this.dungeonLevel > 1 ? ` (dungeon L${this.dungeonLevel})` : '';
        this._addLog(`${n} enem${n > 1 ? 'ies' : 'y'} encountered${lvlStr}!`);

        // Roll initiative for all combatants and log the order.
        this._initiativeOrder = this._buildInitiativeOrder();
        this._initTurnIdx = 0;
        const initStr = this._initiativeOrder
            .map(s => {
                const name = s.kind === 'party' ? s.ref.name : this._eName(s.ref);
                return `${name}(${s.init})`;
            })
            .join(', ');
        this._addLog(`\u26A1 Initiative: ${initStr}`);

        this._advanceThroughInitiative();
    }

    // ────────────────────────────────────────────
    // Queries
    // ────────────────────────────────────────────

    get currentMember() { return this.party[this.currentMemberIndex] ?? null; }
    get aliveParty()   { return this.party.filter(m => m.health > 0); }
    get aliveFront()   { return this.party.filter(m => m.health > 0 && m.row === 'front'); }
    get aliveBack()    { return this.party.filter(m => m.health > 0 && m.row === 'back'); }
    get aliveEnemies() { return this.enemies.filter(e => e.health > 0); }

    /** Alive enemies that are NOT currently charmed — used for victory checks. */
    get aliveHostileEnemies() { return this.enemies.filter(e => e.health > 0 && !(e.charmedRounds > 0)); }

    canMelee(m) {
        if (!m || m.health <= 0) return false;
        if (m.row === 'back' && m.classId !== 'rogue') return false;
        return true;
    }
    canRanged(m) { return m && m.health > 0; }
    canMagic(m)  { return m && m.health > 0; }
    canAct(m)    { return m && m.health > 0; }

    hasFullStaminaFor(m, type) {
        const cost = type === 'melee' ? MELEE_STAMINA_COST : RANGED_STAMINA_COST;
        return m.stamina >= cost;
    }
    hasFullMana(m) { return m.mana >= this.getMagicManaCost(m); }

    /**
     * Scaled mana cost for magic attack: base 3 + 1 per 3 caster levels.
     * @param {PartyMember} m
     * @returns {number}
     */
    getMagicManaCost(m) {
        return MAGIC_MANA_COST + Math.floor((m.level || 1) / 3);
    }

    // ────────────────────────────────────────────
    // Player actions
    // ────────────────────────────────────────────

    meleeAttack(targetEnemy) {
        const m = this.currentMember;
        if (!m || m.health <= 0) return;
        if (m.isDefendMode) {
            this._addLog(`${m.name} is in Defend Mode — attacks are disabled.`);
            return;
        }
        if (!this.canMelee(m)) {
            this._addLog(`${m.name} cannot melee from the back row!`);
            return;
        }

        const isMonk = m.classId === 'monk';
        const exhausted = m.stamina < MELEE_STAMINA_COST ||
                          (isMonk && m.mana < MONK_MELEE_MANA_COST);

        m.stamina = Math.max(0, m.stamina - MELEE_STAMINA_COST);
        if (isMonk) m.mana = Math.max(0, m.mana - MONK_MELEE_MANA_COST);

        let base = this._rollPlayerMeleeDamage(m);
        if (exhausted) base = Math.max(1, Math.floor(base / 2));

        const dealt = this._damageEnemy(targetEnemy, base);

        const eName = this._eName(targetEnemy);
        const suffix = exhausted ? ' (exhausted!)' : '';
        this._addLog(`${m.name} strikes ${eName} for ${dealt} damage!${suffix}`);

        const stunChance = MELEE_STUN_CHANCE + m.getMeleeStunBonus();
        if (targetEnemy.health > 0 && Math.random() < stunChance) {
            if (this._tryStunEnemy(targetEnemy))
                this._addLog(`\u26A1 ${eName} is STUNNED and will skip next turn!`);
        }

        // Barbarian L20 Blood Rage: gain temp HP on hit while raging
        if (m.classId === 'barbarian' && m.isRaging && m.level >= BARBARIAN_BLOOD_RAGE_UNLOCK_LEVEL) {
            const gain = Math.max(1, Math.floor(m.maxHealth * BARBARIAN_TEMP_HP_PER_HIT_FRAC));
            m.tempHp = (m.tempHp || 0) + gain;
        }

        // Weapon rider proc (fire/acid/poison/lightning/ice) — main-hand then off-hand
        this._applyWeaponRider(m, targetEnemy, dealt);
        this._applyWeaponRider(m, targetEnemy, dealt, 'offhand');

        if (targetEnemy.health <= 0) this._addLog(`${eName} is defeated!`);

        if (isMonk) {
            const ww = MONK_WHIRLWIND_CHANCE + m.getWhirlwindBonus();
            const wwCap = (m.level || 1) + 2;
            let wwHits = 0;
            for (const other of this.aliveEnemies) {
                if (other === targetEnemy) continue;
                if (wwHits >= wwCap) break;
                if (Math.random() < ww) {
                    wwHits++;
                    let dmg = this._rollPlayerMeleeDamage(m);
                    if (exhausted) dmg = Math.max(1, Math.floor(dmg / 2));
                    const d = this._damageEnemy(other, dmg);
                    this._addLog(`\u{1F300} Whirlwind hits ${this._eName(other)} for ${d}!`);
                    this._applyWeaponRider(m, other, d);
                    this._applyWeaponRider(m, other, d, 'offhand');
                    if (other.health <= 0) this._addLog(`${this._eName(other)} is defeated!`);
                }
            }
        }

        // Warrior extra attacks — +1 swing per 5 levels. Each swing pays
        // stamina, rolls fresh damage, and rolls stun independently. If the
        // current target drops, we retarget to another living enemy.
        const extra = m.getExtraMeleeAttacks();
        let curTarget = targetEnemy;
        for (let i = 0; i < extra; i++) {
            if (curTarget.health <= 0) {
                curTarget = this.aliveEnemies[0];
                if (!curTarget) break;
            }
            const swingExhausted = m.stamina < MELEE_STAMINA_COST;
            m.stamina = Math.max(0, m.stamina - MELEE_STAMINA_COST);
            let sdmg = this._rollPlayerMeleeDamage(m);
            if (swingExhausted) sdmg = Math.max(1, Math.floor(sdmg / 2));
            const swingName = this._eName(curTarget);
            const sDealt = this._damageEnemy(curTarget, sdmg);
            const sSuffix = swingExhausted ? ' (exhausted!)' : '';
            this._addLog(`\u{1F5E1}\uFE0F ${m.name} follows up on ${swingName} for ${sDealt} damage!${sSuffix}`);
            const sStunChance = MELEE_STUN_CHANCE + m.getMeleeStunBonus();
            if (curTarget.health > 0 && Math.random() < sStunChance) {
                if (this._tryStunEnemy(curTarget))
                    this._addLog(`\u26A1 ${swingName} is STUNNED and will skip next turn!`);
            }
            this._applyWeaponRider(m, curTarget, sDealt);
            this._applyWeaponRider(m, curTarget, sDealt, 'offhand');
            if (curTarget.health <= 0) this._addLog(`${swingName} is defeated!`);
        }


        // Barbarian rage extra attacks: 1 per 3 levels, each costs BARBARIAN_RAGE_STAMINA_COST ST
        if (m.classId === 'barbarian' && m.isRaging && targetEnemy && targetEnemy.health > 0) {
            const rageExtraCount = Math.floor((m.level || 1) / 3);
            for (let ra = 0; ra < rageExtraCount; ra++) {
                if (targetEnemy.health <= 0) break;
                const hasStamina = m.stamina >= BARBARIAN_RAGE_STAMINA_COST;
                m.stamina = Math.max(0, m.stamina - BARBARIAN_RAGE_STAMINA_COST);
                let rageDmg = this._rollPlayerMeleeDamage(m);
                if (!hasStamina) {
                    rageDmg = Math.max(1, Math.floor(rageDmg / 2));
                    // Blood Rage: temp HP lost when doing half damage
                    if (m.level >= BARBARIAN_BLOOD_RAGE_UNLOCK_LEVEL && m.tempHp) {
                        m.tempHp = 0;
                        this._addLog(m.name + "'s Battle Fury fades — stamina exhausted!");
                    }
                }
                const rageDealt = this._damageEnemy(targetEnemy, rageDmg);
                const rageSfx = !hasStamina ? ' (exhausted!)' : '';
                this._addLog(`\u{1F534} ${m.name} rage-strikes ${this._eName(targetEnemy)} for ${rageDealt}!${rageSfx}`);
                this._applyWeaponRider(m, targetEnemy, rageDealt);
                // Blood Rage: gain temp HP per rage hit (if stamina OK)
                if (m.level >= BARBARIAN_BLOOD_RAGE_UNLOCK_LEVEL && hasStamina) {
                    const rGain = Math.max(1, Math.floor(m.maxHealth * BARBARIAN_TEMP_HP_PER_HIT_FRAC));
                    m.tempHp = (m.tempHp || 0) + rGain;
                }
                if (targetEnemy.health <= 0) {
                    this._addLog(`${this._eName(targetEnemy)} is defeated!`);
                    break;
                }
            }
        }
        this._advancePlayerTurn();
    }

    rangedAttack(targetEnemy) {
        const m = this.currentMember;
        if (!m || m.health <= 0) return;
        if (m.isDefendMode) {
            this._addLog(`${m.name} is in Defend Mode — attacks are disabled.`);
            return;
        }

        const exhausted = m.stamina < RANGED_STAMINA_COST;
        m.stamina = Math.max(0, m.stamina - RANGED_STAMINA_COST);

        // Ranger favored enemy check (supports multiple favored tags at L20+)
        const favoredTags = m.classId === 'ranger' ? m.getAllFavoredEnemies() : [];
        const targetDef = ENEMY_TYPES[targetEnemy.type];
        const targetTags = (targetDef && targetDef.tags) ? targetDef.tags : [];
        const isFavored = favoredTags.length > 0 && favoredTags.some(tag => targetTags.includes(tag));

        // Instakill: 1% per 3 ranger levels vs favored enemy
        if (isFavored) {
            const instakillChance = m.getFavoredEnemyInstakillChance();
            if (instakillChance > 0 && Math.random() < instakillChance) {
                if (targetEnemy.isBoss || targetEnemy.isMegaBoss) {
                    // Boss/mega-boss immune to instakill — deal x4 pre-defense damage instead
                    let bRangeDmg = randomInt(RANGED_DAMAGE_MIN, RANGED_DAMAGE_MAX);
                    bRangeDmg += m.getWeaponBonus('ranged');
                    bRangeDmg += m.getClassDamageBonus('ranged');
                    if (exhausted) bRangeDmg = Math.max(1, Math.floor(bRangeDmg / 2));
                    bRangeDmg = Math.max(1, Math.round(bRangeDmg * 4));
                    const bRangeDealt = this._damageEnemy(targetEnemy, bRangeDmg, true);
                    this._addLog(`🎯 ${m.name} scores a lethal shot on ${this._eName(targetEnemy)} — Boss resists instant death! (x4 ranged: ${bRangeDealt} damage)`);
                    this._advancePlayerTurn();
                    return;
                }
                targetEnemy.health = 0;
                this._addLog(`🎯 ${m.name} lands a LETHAL SHOT on the ${this._eName(targetEnemy)}! (Favored enemy instakill!)`);
                this._advancePlayerTurn();
                return;
            }
        }

        let dmg = randomInt(RANGED_DAMAGE_MIN, RANGED_DAMAGE_MAX);
        dmg += m.getWeaponBonus('ranged');
        dmg += m.getClassDamageBonus('ranged');
        if (exhausted) dmg = Math.max(1, Math.floor(dmg / 2));

        let isCrit = false;
        const critChance = RANGED_CRIT_CHANCE + m.getRangedCritBonus();
        if (Math.random() < critChance) {
            dmg *= 2;
            isCrit = true;
        }

        const dealt = this._damageEnemy(targetEnemy, dmg, isFavored);

        const eName = this._eName(targetEnemy);
        const exhaustStr = exhausted ? ' (exhausted!)' : '';
        const critStr = isCrit ? ' \u{1F4A5} CRITICAL HIT!' : '';
        const favoredStr = isFavored ? ' [Favored Enemy — armor ignored]' : '';
        this._addLog(`${m.name} shoots ${eName} for ${dealt} damage!${exhaustStr}${critStr}${favoredStr}`);

        this._applyWeaponRider(m, targetEnemy, dealt);

        if (targetEnemy.health <= 0) this._addLog(`${eName} is defeated!`);

        // Ranger extra shots — +1 per 5 levels. Each shot pays stamina,
        // rolls fresh damage + crit independently. Retargets if dead.
        const extraShots = m.getExtraRangedAttacks();
        let curT = targetEnemy;
        for (let i = 0; i < extraShots; i++) {
            if (curT.health <= 0) {
                curT = this.aliveEnemies[0];
                if (!curT) break;
            }
            const shotExhausted = m.stamina < RANGED_STAMINA_COST;
            m.stamina = Math.max(0, m.stamina - RANGED_STAMINA_COST);
            // Check favored enemy instakill for extra shots too
            const xtDef = ENEMY_TYPES[curT.type];
            const xtTags = (xtDef && xtDef.tags) ? xtDef.tags : [];
            const xtFavored = favoredTags.length > 0 && favoredTags.some(tag => xtTags.includes(tag));
            if (xtFavored) {
                const xtInstakill = m.getFavoredEnemyInstakillChance();
                if (xtInstakill > 0 && Math.random() < xtInstakill) {
                    if (curT.isBoss || curT.isMegaBoss) {
                        // Boss/mega-boss immune to instakill — x4 pre-defense damage
                        let bXtDmg = randomInt(RANGED_DAMAGE_MIN, RANGED_DAMAGE_MAX);
                        bXtDmg += m.getWeaponBonus('ranged');
                        bXtDmg += m.getClassDamageBonus('ranged');
                        if (shotExhausted) bXtDmg = Math.max(1, Math.floor(bXtDmg / 2));
                        bXtDmg = Math.max(1, Math.round(bXtDmg * 4));
                        const bXtDealt = this._damageEnemy(curT, bXtDmg, true);
                        this._addLog(`🎯 ${m.name} scores a lethal shot on ${this._eName(curT)} — Boss resists instant death! (x4 ranged: ${bXtDealt} damage)`);
                        if (curT.health <= 0) this._addLog(`${this._eName(curT)} is defeated!`);
                        continue;
                    }
                    curT.health = 0;
                    this._addLog(`🎯 ${m.name} lands a LETHAL SHOT on the ${this._eName(curT)}! (Favored enemy instakill!)`);
                    continue;
                }
            }
            let sdmg = randomInt(RANGED_DAMAGE_MIN, RANGED_DAMAGE_MAX);
            sdmg += m.getWeaponBonus('ranged');
            sdmg += m.getClassDamageBonus('ranged');
            if (shotExhausted) sdmg = Math.max(1, Math.floor(sdmg / 2));
            let scrit = false;
            const scritChance = RANGED_CRIT_CHANCE + m.getRangedCritBonus();
            if (Math.random() < scritChance) { sdmg *= 2; scrit = true; }
            const sTargetName = this._eName(curT);
            const sDealt = this._damageEnemy(curT, sdmg, xtFavored);
            const sExhaust = shotExhausted ? ' (exhausted!)' : '';
            const sCrit = scrit ? ' \u{1F4A5} CRITICAL HIT!' : '';
            const sFav = xtFavored ? ' [Favored Enemy — armor ignored]' : '';
            this._addLog(`\u{1F3F9} ${m.name} looses another arrow at ${sTargetName} for ${sDealt} damage!${sExhaust}${sCrit}${sFav}`);
            this._applyWeaponRider(m, curT, sDealt);
            if (curT.health <= 0) this._addLog(`${sTargetName} is defeated!`);
        }

        this._advancePlayerTurn();
    }

    /**
     * Artificer Scatter Shot — single stamina cost, main target at full damage,
     * then N splash hits at (50% + artificerLevel%) of rolled damage, capped at 100%.
     * Splash count = SCATTER_SPLASH_BASE + floor(level / SCATTER_SPLASH_EVERY).
     *   L1 → 2 splashes @ 51%, L5 → 3 splashes @ 55%, L50 → 12 splashes @ 100%, …
     * Each shot rolls damage + crit independently. Splash targets are the
     * other alive enemies (nearest-to-front first). If no extra enemies exist,
     * extra shots pile onto the remaining targets (skipping dead ones).
     */
    scatterShot(targetEnemy) {
        const m = this.currentMember;
        if (!m || m.health <= 0) return;
        if (m.classId !== 'artificer') return;

        const exhausted = m.stamina < RANGED_STAMINA_COST;
        m.stamina = Math.max(0, m.stamina - RANGED_STAMINA_COST);

        // Primary shot
        let dmg = randomInt(RANGED_DAMAGE_MIN, RANGED_DAMAGE_MAX);
        dmg += m.getWeaponBonus('ranged');
        dmg += m.getClassDamageBonus('ranged');
        if (exhausted) dmg = Math.max(1, Math.floor(dmg / 2));

        let isCrit = false;
        const critChance = RANGED_CRIT_CHANCE + m.getRangedCritBonus();
        if (Math.random() < critChance) { dmg *= 2; isCrit = true; }

        const dealt = this._damageEnemy(targetEnemy, dmg);
        const eName = this._eName(targetEnemy);
        const exhaustStr = exhausted ? ' (exhausted!)' : '';
        const critStr = isCrit ? ' \u{1F4A5} CRITICAL HIT!' : '';
        this._addLog(`\u{1F4A3} ${m.name} fires Scatter Shot at ${eName} for ${dealt} damage!${exhaustStr}${critStr}`);
        this._applyWeaponRider(m, targetEnemy, dealt);
        if (targetEnemy.health <= 0) this._addLog(`${eName} is defeated!`);

        // Splash shots
        const splashCount = SCATTER_SPLASH_BASE + Math.floor(m.level / SCATTER_SPLASH_EVERY);
        // Splash fraction: 50% base + 1% per artificer level, capped at 100%.
        const splashFraction = Math.min(1.0, SCATTER_SPLASH_FRACTION + m.level * 0.01);
        // Build splash target pool: alive enemies excluding the primary, then
        // fall back to any alive enemy so leftover shots still connect.
        for (let i = 0; i < splashCount; i++) {
            const others = this.aliveHostileEnemies.filter(e => e !== targetEnemy);
            let t = others[i % Math.max(1, others.length)];
            if (!t || t.health <= 0) t = this.aliveEnemies[0];
            if (!t || t.health <= 0) break;

            let sdmg = randomInt(RANGED_DAMAGE_MIN, RANGED_DAMAGE_MAX);
            sdmg += m.getWeaponBonus('ranged');
            sdmg += m.getClassDamageBonus('ranged');
            if (exhausted) sdmg = Math.max(1, Math.floor(sdmg / 2));
            sdmg = Math.max(1, Math.floor(sdmg * splashFraction));

            let sCritFlag = false;
            if (Math.random() < critChance) { sdmg *= 2; sCritFlag = true; }

            const sName = this._eName(t);
            const sDealt = this._damageEnemy(t, sdmg);
            const sCritStr = sCritFlag ? ' \u{1F4A5} CRIT!' : '';
            this._addLog(`  \u21AA\uFE0F splash hits ${sName} for ${sDealt} damage!${sCritStr}`);
            this._applyWeaponRider(m, t, sDealt);
            if (t.health <= 0) this._addLog(`${sName} is defeated!`);
        }

        this._advancePlayerTurn();
    }

    magicAttack() {
        const m = this.currentMember;
        if (!m || m.health <= 0) return;
        if (m.isDefendMode) {
            this._addLog(`${m.name} is in Defend Mode — attacks are disabled.`);
            return;
        }

        const manaCost = this.getMagicManaCost(m);
        const exhausted = m.mana < manaCost;
        m.mana = Math.max(0, m.mana - manaCost);

        let dmg = randomInt(MAGIC_DAMAGE_MIN, MAGIC_DAMAGE_MAX);
        dmg += m.getWeaponBonus('magic');
        dmg += m.getClassDamageBonus('magic');
        if (exhausted) dmg = Math.max(1, Math.floor(dmg / 2));

        // Number of targets = caster level + 4; mages get +2 extra targets.
        const baseTargets = (m.level || 1) + 4 + (m.classId === 'mage' ? 2 : 0);
        const alive = this.aliveHostileEnemies;

        // Each enemy may only be hit once \u2014 shuffle and take up to baseTargets unique targets.
        const shuffled = alive.slice().sort(() => Math.random() - 0.5);
        const hitCounts = new Map();
        const targetsHit = Math.min(baseTargets, shuffled.length);
        for (let i = 0; i < targetsHit; i++) hitCounts.set(shuffled[i], 1);

        const suffix = exhausted ? ' (exhausted!)' : '';
        this._addLog(`\u2728 ${m.name} casts a spell (${manaCost} MP) striking up to ${baseTargets} enemies!${suffix}`);

        const stunChance = m.getMagicStunBonus();

        for (const [e] of hitCounts) {
            if (e.health <= 0) continue;
            // Mage L20: AoE crit chance = floor(level/2) × 1% per 2 levels
            let finalDmg = dmg;
            let critNote = '';
            if (m.classId === 'mage' && m.level >= MAGE_MIRROR_IMAGE_UNLOCK_LEVEL) {
                const critChance = Math.floor(m.level / 2) * MAGE_AOE_CRIT_CHANCE_PER_2LV;
                if (critChance > 0 && Math.random() < critChance) {
                    const critMult = MAGE_AOE_CRIT_DAMAGE_BASE + m.level * MAGE_AOE_CRIT_DAMAGE_PER_LV;
                    finalDmg = Math.floor(finalDmg * critMult);
                    critNote = ' (ARCANE CRIT!)';
                }
            }
            const dealt = this._damageEnemy(e, finalDmg, false, true);
            this._addLog(`  → ${this._eName(e)} takes ${dealt} magic damage.${critNote}`);
            if (e.health > 0 && stunChance > 0 && Math.random() < stunChance) {
                if (this._tryStunEnemy(e))
                    this._addLog(`  ⚡ ${this._eName(e)} is stunned by arcane force!`);
            }
            // Necromancer drain: roll per target hit
            if (m.classId === 'necromancer' && Math.random() < NECRO_LIFE_DRAIN_CHANCE) {
                const amount = NECRO_LIFE_DRAIN_AMOUNT + m.getDrainBonus();
                this._drainHeal(m, amount);
            }
            if (e.health <= 0) this._addLog(`  ☠️ ${this._eName(e)} is defeated!`);
        }

        this._advancePlayerTurn();
    }

    _drainHeal(necro, amount) {
        const targets = [necro, ...this.party.filter(
            p => p.isSummoned && p.summonerId === necro.id && p.canBeHealed === false && p.health > 0,
        )];
        let totalGained = 0;
        for (const t of targets) {
            if (t.health <= 0) continue;
            const before = t.health;
            t.health = Math.min(t.maxHealth, t.health + amount);
            totalGained += (t.health - before);
        }
        if (totalGained > 0) {
            this._addLog(`\u{1FA78} Life drain! ${necro.name} and their undead recover ${amount} HP.`);
        }
    }

    /**
     * Barbarian Rage — barbarian only, once per combat.
     * Activates rage: halves damage taken, stun immune, +5% HP regen/round,
     * +level to melee damage, +Math.floor(level/3) extra swings at 3 ST each.
     */
    barbarianRage() {
        const m = this.currentMember;
        if (!m || m.health <= 0) return;
        if (m.classId !== 'barbarian') return;
        if (m.usedRage) {
            this._addLog(`\u{1F534} ${m.name} has already raged this combat!`);
            return;
        }
        m.isRaging = true;
        m.usedRage = true;
        const extraAttacks = Math.floor((m.level || 1) / 3);
        this._addLog(`\u{1F534} ${m.name} flies into a RAGE! (half damage, stun immune, +${m.level} melee dmg, ${extraAttacks} bonus attack(s)/round, 5% HP regen/round)`);
        // Rage is a free action — the UI will immediately prompt the player to
        // pick a target and strike. Turn advances after the melee resolves.
        this._notify();
    }

    /**
     * Rogue backstab — 3× stamina cost, 2× damage then +10%/level,
     * 5% + 1%/level instakill. Can be used from back row too.
     */
    backstab(targetEnemy) {
        const m = this.currentMember;
        if (!m || m.health <= 0) return;
        if (m.classId !== 'rogue') return;

        const cost = MELEE_STAMINA_COST * BACKSTAB_STAMINA_MULT;
        const exhausted = m.stamina < cost;
        m.stamina = Math.max(0, m.stamina - cost);

        const instakillChance = BACKSTAB_INSTAKILL_CHANCE + m.getInstakillBonus();
        const bossImmune = !!(targetEnemy.isBoss || targetEnemy.isMegaBoss);
        if (!bossImmune && Math.random() < instakillChance) {
            targetEnemy.health = 0;
            this._addLog(`\u{1F5E1}\uFE0F ${m.name} BACKSTABS ${this._eName(targetEnemy)} — INSTANT KILL!`);
            this._addLog(`${this._eName(targetEnemy)} is defeated!`);
            this._advancePlayerTurn();
            return;
        }
        if (bossImmune && Math.random() < instakillChance) {
            // Boss resists instant death — deal x4 pre-defense damage instead
            let bBase = this._rollPlayerMeleeDamage(m);
            if (exhausted) bBase = Math.max(1, Math.floor(bBase / 2));
            const bLevelMult = 1 + BACKSTAB_DAMAGE_PER_LEVEL * Math.max(1, m.level);
            const bBossDmg = Math.max(1, Math.round(bBase * BACKSTAB_DAMAGE_MULT * bLevelMult * 4));
            const bBossDealt = this._damageEnemy(targetEnemy, bBossDmg);
            this._addLog(`\u{1F5E1}️ ${m.name} scores a killing blow on ${this._eName(targetEnemy)} — Boss resists instant death! (x4 backstab: ${bBossDealt} damage)`);
            this._applyWeaponRider(m, targetEnemy, bBossDealt);
            this._applyWeaponRider(m, targetEnemy, bBossDealt, 'offhand');
            if (targetEnemy.health <= 0) this._addLog(`${this._eName(targetEnemy)} is defeated!`);
            this._advancePlayerTurn();
            return;
        }

        let base = this._rollPlayerMeleeDamage(m);
        if (exhausted) base = Math.max(1, Math.floor(base / 2));
        // base × 2 × (1 + 0.10 × level)
        const levelMult = 1 + BACKSTAB_DAMAGE_PER_LEVEL * Math.max(1, m.level);
        const dmg = Math.max(1, Math.round(base * BACKSTAB_DAMAGE_MULT * levelMult));

        const dealt = this._damageEnemy(targetEnemy, dmg);
        const suffix = exhausted ? ' (exhausted!)' : '';
        this._addLog(`\u{1F5E1}\uFE0F ${m.name} BACKSTABS ${this._eName(targetEnemy)} for ${dealt} damage!${suffix}`);
        this._applyWeaponRider(m, targetEnemy, dealt);
        this._applyWeaponRider(m, targetEnemy, dealt, 'offhand');
        if (targetEnemy.health <= 0) this._addLog(`${this._eName(targetEnemy)} is defeated!`);

        // L20+ Rogue: Backstab applies a bleed DoT (immune: undead, construct, elemental, incorporeal)
        if (targetEnemy.health > 0 && m.level >= ROGUE_BACKSTAB_BLEED_UNLOCK_LEVEL && dealt > 0) {
            const tDef = ENEMY_TYPES[targetEnemy.type] || {};
            const tTags = tDef.tags || [];
            const bleedImmune = tTags.some(t => ['undead', 'construct', 'elemental', 'incorporeal'].includes(t));
            if (!bleedImmune) {
                const bleedDmg    = Math.max(1, Math.floor(dealt * ROGUE_BACKSTAB_BLEED_FRAC));
                const bleedRounds = Math.max(1, Math.floor(m.level / ROGUE_BACKSTAB_BLEED_DURATION_DIVISOR));
                if (!Array.isArray(targetEnemy.activeEffects)) targetEnemy.activeEffects = [];
                const existingIdx = targetEnemy.activeEffects.findIndex(fx => fx.type === 'bleed');
                const bleedFx = { type: 'bleed', damage: bleedDmg, rounds: bleedRounds };
                if (existingIdx !== -1) {
                    if (bleedDmg >= (targetEnemy.activeEffects[existingIdx].damage || 0)) {
                        targetEnemy.activeEffects[existingIdx] = bleedFx;
                    }
                } else {
                    targetEnemy.activeEffects.push(bleedFx);
                }
                this._addLog(`\u{1F7E5} ${this._eName(targetEnemy)} begins to bleed! (${bleedDmg}/rd, ${bleedRounds} rounds)`);
            }
        }

        this._advancePlayerTurn();
    }

    clericHeal(targetMember) {
        const m = this.currentMember;
        if (!m || m.health <= 0) return;
        if (m.classId !== 'cleric') return;
        if (!targetMember || targetMember.health <= 0) return;

        if (targetMember.isSummoned && !targetMember.canBeHealed) {
            this._addLog(`${m.name} cannot heal undead minions.`);
            return;
        }
        if (m.mana < CLERIC_HEAL_MANA_COST) {
            this._addLog(`${m.name} has too little mana to cast Heal (needs ${CLERIC_HEAL_MANA_COST}).`);
            return;
        }

        m.mana -= CLERIC_HEAL_MANA_COST;
        const pct = CLERIC_HEAL_PERCENT + m.getHealPercentBonus();
        const amt = Math.max(1, Math.ceil(targetMember.maxHealth * pct));
        const before = targetMember.health;
        targetMember.health = Math.min(targetMember.maxHealth, targetMember.health + amt);
        const healed = targetMember.health - before;
        this._addLog(`\u2728 ${m.name} heals ${targetMember.name} for ${healed} HP!`);

        this._advancePlayerTurn();
    }

    /**
     * Cleric Mass Heal (level 4+). Costs CLERIC_HEAL_MANA_COST mana and heals
     * every living party member for 50% of the normal single-target heal.
     */
    clericMassHeal() {
        const m = this.currentMember;
        if (!m || m.health <= 0) return;
        if (m.classId !== 'cleric') return;
        if (m.level < 4) {
            this._addLog(`${m.name} must be level 4 to cast Mass Heal.`);
            return;
        }
        if (m.mana < CLERIC_HEAL_MANA_COST) {
            this._addLog(`${m.name} has too little mana to cast Mass Heal (needs ${CLERIC_HEAL_MANA_COST}).`);
            return;
        }

        m.mana -= CLERIC_HEAL_MANA_COST;
        const pct = (CLERIC_HEAL_PERCENT + m.getHealPercentBonus()) * 0.5;
        const targets = this.aliveParty;
        let parts = [];
        for (const t of targets) {
            if (t.isSummoned && !t.canBeHealed) continue;
            const amt = Math.max(1, Math.ceil(t.maxHealth * pct));
            const before = t.health;
            t.health = Math.min(t.maxHealth, t.health + amt);
            parts.push(`${t.name} +${t.health - before}`);
        }
        this._addLog(`\u2728 ${m.name} calls down a Mass Heal! (${parts.join(', ')})`);

        this._advancePlayerTurn();
    }

    /**
     * Cleric Turn Undead (level 6+). Costs CLERIC_TURN_UNDEAD_MANA_COST mana.
     * Deals 2× magic-attack damage to every undead enemy (ignores random-target
     * cap — hits ALL undead). Also debuffs their attack and defense.
     */
    clericTurnUndead() {
        const m = this.currentMember;
        if (!m || m.health <= 0) return;
        if (m.classId !== 'cleric') return;
        if (m.level < CLERIC_TURN_UNDEAD_MIN_LEVEL) {
            this._addLog(`${m.name} must be level ${CLERIC_TURN_UNDEAD_MIN_LEVEL} to Turn Undead.`);
            return;
        }
        if (m.mana < CLERIC_TURN_UNDEAD_MANA_COST) {
            this._addLog(`${m.name} has too little mana to Turn Undead (needs ${CLERIC_TURN_UNDEAD_MANA_COST}).`);
            return;
        }

        const undead = this.aliveHostileEnemies.filter(e => {
            const tags = (ENEMY_TYPES[e.type] || {}).tags || [];
            return tags.includes('undead');
        });

        if (undead.length === 0) {
            this._addLog(`\u271D\uFE0F ${m.name} raises the holy symbol — but there are no undead to turn!`);
            return;
        }

        m.mana -= CLERIC_TURN_UNDEAD_MANA_COST;

        let baseDmg = randomInt(MAGIC_DAMAGE_MIN, MAGIC_DAMAGE_MAX);
        baseDmg += m.getWeaponBonus('magic');
        baseDmg += m.getClassDamageBonus('magic');
        // 2× base damage, then ×(1 + 2% per cleric level)
        baseDmg = Math.max(1, Math.round(baseDmg * CLERIC_TURN_UNDEAD_DAMAGE_MULT * (1 + 0.02 * m.level)));

        const debuffMag = CLERIC_TURN_UNDEAD_DEBUFF_BASE + Math.floor(m.level / CLERIC_TURN_UNDEAD_DEBUFF_EVERY);
        const debuffRounds = 2 + Math.floor(m.level / CLERIC_TURN_UNDEAD_DEBUFF_EVERY);

        this._addLog(`\u271D\uFE0F ${m.name} channels divine power — holy light sears the undead!`);

        for (const e of undead) {
            const dealt = this._damageEnemy(e, baseDmg, /*ignoreDefense*/ false, /*isMagic*/ true);
            const eName = this._eName(e);
            this._addLog(`  \u2728 ${eName} takes ${dealt} holy damage!`);

            if (e.health > 0) {
                // Debuff attack and defense
                e.activeEffects = e.activeEffects || [];
                e.activeEffects = e.activeEffects.filter(x => x.type !== 'turned');
                e.activeEffects.push({
                    type: 'turned',
                    rounds: debuffRounds,
                    damageBonus: -debuffMag,
                    defenseBonus: -debuffMag,
                });
                this._addLog(`  ${eName} is turned! (-${debuffMag} atk/-${debuffMag} def for ${debuffRounds} rds)`);
            } else {
                this._addLog(`  ${eName} is destroyed!`);
            }
        }

        this._advancePlayerTurn();
    }

    /**
     * Phase 10 — Cleric Revive (level 3+). Costs CLERIC_REVIVE_MANA_COST mana
     * and brings a fallen ally back at CLERIC_REVIVE_HEAL_FRAC of max HP.
     * Cannot revive undead summons or living targets.
     */
    clericRevive(targetMember) {
        const m = this.currentMember;
        if (!m || m.health <= 0) return;
        if (m.classId !== 'cleric') return;
        if (m.level < CLERIC_REVIVE_MIN_LEVEL) {
            this._addLog(`${m.name} must be level ${CLERIC_REVIVE_MIN_LEVEL} to Revive.`);
            return;
        }
        if (!targetMember || targetMember.health > 0) {
            this._addLog(`${m.name} can only Revive a fallen ally.`);
            return;
        }
        if (targetMember.isSummoned) {
            this._addLog(`${m.name} cannot revive summoned creatures.`);
            return;
        }
        if (targetMember.lichPhial) {
            this._addLog(`${m.name}: ${targetMember.name}'s soul is sealed in a Phylactery \u2014 they will revive on their own!`);
            return;
        }
        if (m.mana < CLERIC_REVIVE_MANA_COST) {
            this._addLog(`${m.name} has too little mana to Revive (needs ${CLERIC_REVIVE_MANA_COST}).`);
            return;
        }
        m.mana -= CLERIC_REVIVE_MANA_COST;
        const amt = Math.max(1, Math.ceil(targetMember.maxHealth * CLERIC_REVIVE_HEAL_FRAC));
        targetMember.health = amt;
        targetMember.stunned = false;
        // Revive removes transient poison so the newly-revived ally isn't
        // killed again on their own turn.
        if (Array.isArray(targetMember.activeEffects)) {
            targetMember.activeEffects = targetMember.activeEffects.filter(
                e => e && e.type !== 'poison',
            );
        }
        this._addLog(`\u{1F54A}\uFE0F ${m.name} calls ${targetMember.name} back from the brink! (+${amt} HP)`);
        this._advancePlayerTurn();
    }

    // ═══════════════════════════════════════════════════════════════
    // CLERIC L20 SPECIALS — Mass Regen  &  Mass Revive
    // ═══════════════════════════════════════════════════════════════

    /**
     * Cleric L20: Mass Regeneration.
     * Costs CLERIC_MASS_REGEN_MANA_COST MP.
     * Applies a combat HoT to every living non-golem non-undead party member:
     *   healPct = CLERIC_MASS_REGEN_BASE_PCT + floor(clericLevel/3) × CLERIC_MASS_REGEN_PER_3_LEVELS
     * Duration  = floor(clericLevel / 4) rounds  (5 rounds at L20).
     * The HoT ticks at the start of every new round via _tickPartyEffects().
     */
    clericMassRegen() {
        const m = this.currentMember;
        if (!m || m.health <= 0 || m.classId !== 'cleric') return;
        if (m.level < CLERIC_MASS_REGEN_UNLOCK_LEVEL) {
            this._addLog(`${m.name} must be level ${CLERIC_MASS_REGEN_UNLOCK_LEVEL} to cast Mass Regeneration.`);
            return;
        }
        if (m.mana < CLERIC_MASS_REGEN_MANA_COST) {
            this._addLog(`${m.name} needs ${CLERIC_MASS_REGEN_MANA_COST} MP for Mass Regeneration.`);
            return;
        }

        m.mana -= CLERIC_MASS_REGEN_MANA_COST;

        const healPct  = CLERIC_MASS_REGEN_BASE_PCT + Math.floor(m.level / 3) * CLERIC_MASS_REGEN_PER_3_LEVELS;
        const duration = Math.max(1, Math.floor(m.level / 4));   // floor(level/4) rounds

        const isUndead = (t) => t.isSummoned && UNDEAD_TIERS.some(u => u.id === t.summonType);
        const isGolem  = (t) => t.isSummoned && GOLEM_PRESETS[t.summonType];
        const eligible = this.party.filter(t =>
            t.health > 0 && !isUndead(t) && !isGolem(t)
        );

        for (const t of eligible) {
            // Replace any existing mass_regen effect (refresh, don't stack).
            t.activeEffects = (t.activeEffects || []).filter(e => e.type !== 'combat_regen');
            t.activeEffects.push({ type: 'combat_regen', rounds: duration, healPct });
        }

        const pctStr = Math.round(healPct * 100);
        this._addLog(`✨ ${m.name} channels divine renewal — ${eligible.length} allies regenerate ${pctStr}% HP/round for ${duration} rounds!`);
        this._advancePlayerTurn();
    }

    /**
     * Cleric L20: Mass Revive.
     * Costs CLERIC_MASS_REVIVE_MANA_COST MP.
     * Revives floor(clericLevel / CLERIC_MASS_REVIVE_COUNT_DIVISOR) fallen non-summoned allies.
     * Each is restored to (CLERIC_MASS_REVIVE_HEAL_BASE + floor(level/3) × PER_3_LV) of max HP.
     * Targets are chosen automatically (first N fallen in party order).
     */
    clericMassRevive() {
        const m = this.currentMember;
        if (!m || m.health <= 0 || m.classId !== 'cleric') return;
        if (m.level < CLERIC_MASS_REVIVE_UNLOCK_LEVEL) {
            this._addLog(`${m.name} must be level ${CLERIC_MASS_REVIVE_UNLOCK_LEVEL} to cast Mass Revive.`);
            return;
        }
        if (m.mana < CLERIC_MASS_REVIVE_MANA_COST) {
            this._addLog(`${m.name} needs ${CLERIC_MASS_REVIVE_MANA_COST} MP for Mass Revive.`);
            return;
        }

        const fallen = this.party.filter(p => !p.isSummoned && p.health <= 0 && !p.lichPhial);
        if (fallen.length === 0) {
            this._addLog(`${m.name}: No fallen allies to revive (any Phylactery-bound members will revive on their own).`);
            return;
        }

        const count    = Math.max(1, Math.floor(m.level / CLERIC_MASS_REVIVE_COUNT_DIVISOR));
        const healFrac = CLERIC_MASS_REVIVE_HEAL_BASE
            + Math.floor(m.level / 3) * CLERIC_MASS_REVIVE_HEAL_PER_3LV;
        const toRevive = fallen.slice(0, count);

        m.mana -= CLERIC_MASS_REVIVE_MANA_COST;

        const parts = [];
        for (const t of toRevive) {
            const amt = Math.max(1, Math.ceil(t.maxHealth * healFrac));
            t.health  = amt;
            t.stunned = false;
            if (Array.isArray(t.activeEffects)) {
                t.activeEffects = t.activeEffects.filter(e => e && e.type !== 'poison');
            }
            parts.push(`${t.name} +${amt} HP`);
        }

        const pctStr = Math.round(healFrac * 100);
        this._addLog(`✨ ${m.name} invokes divine mercy — ${toRevive.length} fallen ally/allies revived at ${pctStr}% HP! (${parts.join(', ')})`);
        this._advancePlayerTurn();
    }

    // ═══════════════════════════════════════════════════════════════
    // PALADIN L20 SPECIALS — Revive  &  AoE Smite
    // ═══════════════════════════════════════════════════════════════

    /**
     * Paladin L20: Revive — mirrors clericRevive at same mana cost / heal fraction.
     * Unlocked at PALADIN_L20_UNLOCK_LEVEL.
     */
    paladinRevive(targetMember) {
        const m = this.currentMember;
        if (!m || m.health <= 0 || m.classId !== 'paladin') return;
        if (m.level < PALADIN_L20_UNLOCK_LEVEL) {
            this._addLog(`${m.name} must be level ${PALADIN_L20_UNLOCK_LEVEL} to use Revive.`);
            return;
        }
        if (!targetMember || targetMember.health > 0) {
            this._addLog(`${m.name} can only Revive a fallen ally.`);
            return;
        }
        if (targetMember.isSummoned) {
            this._addLog(`${m.name} cannot revive summoned creatures.`);
            return;
        }
        if (targetMember.lichPhial) {
            this._addLog(`${m.name}: ${targetMember.name}'s soul is held in a Phylactery — divine power cannot reach them there!`);
            return;
        }
        if (m.mana < CLERIC_REVIVE_MANA_COST) {
            this._addLog(`${m.name} needs ${CLERIC_REVIVE_MANA_COST} MP to Revive.`);
            return;
        }
        m.mana -= CLERIC_REVIVE_MANA_COST;
        const amt = Math.max(1, Math.ceil(targetMember.maxHealth * CLERIC_REVIVE_HEAL_FRAC));
        targetMember.health  = amt;
        targetMember.stunned = false;
        if (Array.isArray(targetMember.activeEffects)) {
            targetMember.activeEffects = targetMember.activeEffects.filter(
                e => e && e.type !== 'poison',
            );
        }
        this._addLog(`\u{1F54A}️ ${m.name} reaches across the veil — ${targetMember.name} is restored! (+${amt} HP)`);
        this._advancePlayerTurn();
    }

    /**
     * Paladin L20: AoE Smite.
     * Costs PALADIN_SMITE_MANA_COST × PALADIN_AOE_SMITE_MANA_MULT mana.
     * Hits EVERY alive undead/demon enemy for half normal smite damage,
     * with half the normal instakill (purge) chance.
     * Requires front row.
     */
    paladinAoeSmite() {
        const m = this.currentMember;
        if (!m || m.health <= 0 || m.classId !== 'paladin') return;
        if (m.level < PALADIN_L20_UNLOCK_LEVEL) return;
        if (!this.canMelee(m)) {
            this._addLog(`${m.name} cannot AoE Smite from the back row!`);
            return;
        }

        const aoeCost = PALADIN_SMITE_MANA_COST * PALADIN_AOE_SMITE_MANA_MULT;
        if (m.mana < aoeCost) {
            this._addLog(`${m.name} needs ${aoeCost} MP for AoE Smite.`);
            return;
        }

        const smitableEnemies = this.aliveHostileEnemies.filter(e => {
            const td   = ENEMY_TYPES[e.type] || {};
            const tags = Array.isArray(td.tags) ? td.tags : [];
            return tags.includes('undead') || tags.includes('demon');
        });

        if (smitableEnemies.length === 0) {
            this._addLog(`✨ ${m.name} calls down holy light — but there are no undead or demons to smite!`);
            return;
        }

        m.mana -= aoeCost;
        this._addLog(`✨ ${m.name} releases a holy nova — smiting all undead and demons!`);

                // Purge chance computed per-target below (capped at 50%, x1/3 mult).

        for (const target of smitableEnemies.slice()) {
            if (target.health <= 0) continue;
            const eName = this._eName(target);

                        // 1/3 purge chance (base capped at 50%)
            const aoePurge = Math.min(PALADIN_SMITE_INSTAKILL_CAP,
                PALADIN_SMITE_INSTAKILL_BASE + PALADIN_SMITE_INSTAKILL_PER_LEVEL * m.level)
                * PALADIN_AOE_SMITE_INSTAKILL_MULT;
            if (Math.random() < aoePurge) {
                if (target.isBoss || target.isMegaBoss) {
                    // Bosses resist instant death — take x4 AoE smite damage instead
                    let bossDmg = this._rollPlayerMeleeDamage(m);
                    bossDmg += 2 * m.level;
                    bossDmg *= (2 + 0.10 * m.level);
                    bossDmg  = Math.floor(bossDmg * PALADIN_AOE_SMITE_DAMAGE_MULT * PALADIN_SMITE_BOSS_DAMAGE_MULT);
                    const bossDealt = this._damageEnemy(target, Math.max(1, bossDmg));
                    this._addLog(`✨ ${eName} resists the holy nova instant-kill! (x4 AoE smite: ${bossDealt} damage)`);
                    if (target.health <= 0) this._addLog(`${eName} is defeated!`);
                    if (this.aliveEnemies.length === 0) break;
                    continue;
                }
                target.health = 0;
                this._addLog(`✨ ${eName} is purged by the holy nova!`);
                if (this.aliveEnemies.length === 0) break;
                continue;
            }

            // 1/3 smite damage (no armor-ignore; uses _damageEnemy for defence)
            let dmg = this._rollPlayerMeleeDamage(m);
            dmg    += 2 * m.level;                     // paladin holy bonus
            dmg    *= (2 + 0.10 * m.level);            // smite scaling
            dmg     = Math.floor(dmg * PALADIN_AOE_SMITE_DAMAGE_MULT);
            const dealt = this._damageEnemy(target, Math.max(1, dmg));
            this._addLog(`✨ ${eName} is scorched by the holy nova for ${dealt}!`);
            if (target.health <= 0) this._addLog(`${eName} is defeated!`);
        }

        this._advancePlayerTurn();
    }

    // ═══════════════════════════════════════════════════════════════
    // MONK L20 SPECIAL — Quivering Palm
    // ═══════════════════════════════════════════════════════════════

    /**
     * Monk L20: Quivering Palm.
     * A single-target melee strike (costs ST + MP like normal monk melee, front row only).
     * Deals 2× the base melee roll as direct damage.
     * Applies a doubling internal DoT:
     *   - Initial tick damage = base melee roll (pre-doubled)
     *   - Damage doubles each round (bypasses enemy defence — internal disruption)
     *   - Duration = MONK_QUIVERING_PALM_DURATION_BASE + floor((monkLevel-20)/10) rounds
     * If target already has a quivering_palm DoT, +1 round is added (capped at
     *   min(floor(highestMonkLevel / STACK_CAP_DIVISOR), STACK_CAP_MAX)).
     */
    monkQuiveringPalm(targetEnemy) {
        const m = this.currentMember;
        if (!m || m.health <= 0 || m.classId !== 'monk') return;
        if (m.level < MONK_QUIVERING_PALM_UNLOCK_LEVEL) return;
        if (!this.canMelee(m)) {
            this._addLog(`${m.name} cannot use Quivering Palm from the back row!`);
            return;
        }
        if (!targetEnemy || targetEnemy.health <= 0) return;
        if (m.stamina < MELEE_STAMINA_COST) {
            this._addLog(`${m.name} does not have enough stamina for Quivering Palm.`);
            return;
        }
        if (m.mana < MONK_MELEE_MANA_COST) {
            this._addLog(`${m.name} does not have enough mana for Quivering Palm.`);
            return;
        }

        m.stamina -= MELEE_STAMINA_COST;
        m.mana    -= MONK_MELEE_MANA_COST;

        const base = this._rollPlayerMeleeDamage(m);  // unmodified melee roll
        const eName = this._eName(targetEnemy);

        // Double damage on the strike itself
        const dealt = this._damageEnemy(targetEnemy, base * 2);
        this._addLog(`✋ ${m.name} strikes ${eName} with the Quivering Palm for ${dealt} damage!`);

        if (targetEnemy.health > 0) {
            // Duration for this cast
            const newDur = MONK_QUIVERING_PALM_DURATION_BASE
                + Math.floor(Math.max(0, m.level - MONK_QUIVERING_PALM_UNLOCK_LEVEL)
                    / 10) * MONK_QUIVERING_PALM_DURATION_PER_10LV;

            // Highest-level living monk in party (for stack cap)
            const maxMonkLv = this.party.reduce((best, p) =>
                (p.classId === 'monk' && p.health > 0 && p.level > best) ? p.level : best, 0);
            const stackCap  = Math.min(
                Math.floor(maxMonkLv / MONK_QUIVERING_PALM_STACK_CAP_DIVISOR),
                MONK_QUIVERING_PALM_STACK_CAP_MAX,
            );

            targetEnemy.activeEffects = targetEnemy.activeEffects || [];
            const existing = targetEnemy.activeEffects.find(e => e.type === 'quivering_palm');

            if (existing && existing.rounds > 0) {
                // Refresh: +1 round, capped
                existing.rounds = Math.min(existing.rounds + 1, stackCap);
                this._addLog(`✋ Quivering Palm refreshed on ${eName}! (${existing.rounds} rds, ${existing.damage} dmg/rd doubling)`);
            } else {
                // Fresh application
                targetEnemy.activeEffects = targetEnemy.activeEffects.filter(e => e.type !== 'quivering_palm');
                targetEnemy.activeEffects.push({
                    type:      'quivering_palm',
                    rounds:    newDur,
                    damage:    base,   // starts at base roll; doubles after each tick
                    doublings: 0,      // tracks how many times damage has doubled (cap 10)
                });
                this._addLog(`✋ ${eName} is afflicted by the Quivering Palm! (${base} internal dmg/rd, doubling, ${newDur} rds)`);
            }
        } else {
            this._addLog(`${eName} is defeated!`);
        }

        this._advancePlayerTurn();
    }

    /**
     * Necromancer: Dark Harvest.
     * Sacrifices 10% max HP + 10% max Stamina to gain 10% max Mana.
     * Cannot reduce HP to 0 (must keep ≥1 HP). Uses the player's turn.
     */
    necromancerDarkHarvest() {
        const m = this.currentMember;
        if (!m || m.health <= 0) return;
        if (m.classId !== 'necromancer') return;

        const hpCost = Math.max(1, Math.floor(m.maxHealth  * NECRO_DARK_HARVEST_HP_FRAC));
        const stCost = Math.max(1, Math.floor(m.maxStamina * NECRO_DARK_HARVEST_ST_FRAC));
        const mpGain = Math.max(1, Math.floor(m.maxMana    * NECRO_DARK_HARVEST_MANA_FRAC));

        if (m.health <= hpCost) {
            this._addLog(`💀 ${m.name} cannot Dark Harvest — not enough health (must keep ≥1 HP).`);
            return;
        }
        if (m.mana >= m.maxMana) {
            this._addLog(`💀 ${m.name}'s mana is already full.`);
            return;
        }

        m.health  = Math.max(1, m.health  - hpCost);
        m.stamina = Math.max(0, m.stamina - stCost);
        m.mana    = Math.min(m.maxMana, m.mana + mpGain);

        this._addLog(`💀 ${m.name} Dark Harvest: −${hpCost} HP, −${stCost} ST → +${mpGain} MP!`);
        this._advancePlayerTurn();
    }

    // ── Necromancer L20: Lich Form ────────────────────────────────────────────

    /**
     * Necromancer L20: Toggle Lich Form on/off.
     * While active costs NECRO_LICH_FORM_MANA_PER_ROUND mana/round.
     * Grants magic/AoE resist, stun/poison immunity.
     * On death: soul retreats to phial, revives in NECRO_LICH_REVIVE_ROUNDS rounds.
     */
    necromancerToggleLichForm() {
        const m = this.currentMember;
        if (!m || m.classId !== 'necromancer' || m.level < NECRO_LICH_FORM_UNLOCK_LEVEL || m.health <= 0) return;
        m.isLichForm = !m.isLichForm;
        if (m.isLichForm) {
            this._addLog(`💀 ${m.name} undergoes the Lich transformation! (magic/AoE resist, stun/poison immune, phial death)`);
        } else {
            this._addLog(`💀 ${m.name} reverts to mortal form.`);
        }
        this._advancePlayerTurn();
    }

    // ── Mage L20: Mirror Image ────────────────────────────────────────────────

    /**
     * Mage L20: Create Mirror Images.
     * Costs MAGE_MIRROR_IMAGE_MANA_COST mana; creates floor(level/7) images.
     * Each image absorbs one attack (any type) directed at the mage.
     */
    mageCreateMirrorImages() {
        const m = this.currentMember;
        if (!m || m.classId !== 'mage' || m.level < MAGE_MIRROR_IMAGE_UNLOCK_LEVEL || m.health <= 0) return;
        if (m.mana < MAGE_MIRROR_IMAGE_MANA_COST) {
            this._addLog(`🪞 ${m.name} needs ${MAGE_MIRROR_IMAGE_MANA_COST} MP for Mirror Image (has ${m.mana}).`);
            return;
        }
        m.mana -= MAGE_MIRROR_IMAGE_MANA_COST;
        const count = Math.max(1, Math.floor(m.level / MAGE_MIRROR_IMAGE_COUNT_DIVISOR));
        m.mirrorImages = (m.mirrorImages || 0) + count;
        this._addLog(`🪞 ${m.name} conjures ${count} Mirror Image${count > 1 ? 's' : ''}! (${m.mirrorImages} total)`);
        this._advancePlayerTurn();
    }

    // ── Druid L20: Commune / Faerie Queen ────────────────────────────────────

    /**
     * Druid L20: Commune with nature. Grants 1 Fae token.
     * At 3 tokens, auto-summons the Faerie Queen (only one active at a time).
     * Tokens cap at 3 so they're ready to immediately resummon when the FQ dies.
     */
    druidCommune() {
        const m = this.currentMember;
        if (!m || m.classId !== 'druid' || m.level < DRUID_COMMUNE_UNLOCK_LEVEL || m.health <= 0) return;

        // Cap tokens at 3 (they're saved for when the active FQ dies)
        const currentTokens = m.faeTokens || 0;
        if (currentTokens < DRUID_COMMUNE_FAE_TOKENS_NEEDED) {
            m.faeTokens = currentTokens + 1;
        }
        const t = m.faeTokens;
        this._addLog(`🌿 ${m.name} communes with nature! Fae tokens: ${t}/${DRUID_COMMUNE_FAE_TOKENS_NEEDED}`);

        // Attempt summon if tokens are full and no FQ is alive
        if (t >= DRUID_COMMUNE_FAE_TOKENS_NEEDED) {
            const activeFQ = this.party.find(p =>
                p.isSummoned && p.summonType === 'faerie_queen' && p.summonerId === m.id && p.health > 0);
            if (!activeFQ) {
                m.faeTokens = 0;
                this._summonFaerieQueen(m);
            } else {
                this._addLog(`🌿 A Faerie Queen already serves — tokens held until she falls.`);
            }
        }
        this._advancePlayerTurn();
    }

    /** Spawn a Faerie Queen for the given druid. */
    _summonFaerieQueen(druid) {
        const lvl       = druid.level;
        const magicBonus = druid.getWeaponBonus('magic') + druid.getClassDamageBonus('magic');
        const defense   = FAERIE_QUEEN_DEFENSE_BASE + lvl;
        const maxHp     = Math.max(1, Math.floor(druid.maxHealth * FAERIE_QUEEN_HP_MULT));

        const fq = new PartyMember({
            name:         `${druid.name}'s Faerie Queen`,
            classId:      'druid',
            speciesId:    'human',
            level:        lvl,
            maxHealth:    maxHp,
            maxStamina:   40,
            maxMana:      40,
            portraitSeed: Math.floor(Math.random() * 100000),
            isSummoned:   true,
            summonType:   'faerie_queen',
            summonerId:   druid.id,
            canBeHealed:  true,
            row:          'back',
            summonStats: {
                defense:     defense,
                magicMin:    MAGIC_DAMAGE_MIN + magicBonus,
                magicMax:    MAGIC_DAMAGE_MAX + magicBonus,
                druidLevel:  lvl,
                magicBonus:  magicBonus,
            },
        });
        this.party.push(fq);
        this._registerNewSummon(fq);
        this._addLog(`🌟 The Faerie Queen answers the call! (HP:${maxHp} Def:${defense} Atk:${MAGIC_DAMAGE_MIN+magicBonus}–${MAGIC_DAMAGE_MAX+magicBonus})`);
    }

    /**
     * Called each round: if a Faerie Queen died and her druid has enough tokens,
     * auto-summon a replacement and reset the token counter.
     */
    _checkFaerieQueenRevive() {
        const deadFQs = this.party.filter(p =>
            p.isSummoned && p.summonType === 'faerie_queen' && p.health <= 0);
        for (const fq of deadFQs) {
            const druid = this.party.find(p =>
                p.id === fq.summonerId && p.health > 0 && !p.isSummoned);
            if (!druid) continue;
            if ((druid.faeTokens || 0) >= DRUID_COMMUNE_FAE_TOKENS_NEEDED) {
                // Remove the dead FQ from party
                const idx = this.party.indexOf(fq);
                if (idx !== -1) this.party.splice(idx, 1);
                druid.faeTokens = 0;
                this._summonFaerieQueen(druid);
            }
        }
    }

    /**
     * Bard L20 Charm Monster. Costs BARD_CHARM_MANA_COST mana.
     * Attempts to charm a single enemy monster to fight for the party.
     * Chance = BARD_CHARM_BASE_CHANCE + (BARD_CHARM_CHANCE_PER_2_LV × bardLevel).
     * Duration = floor(bardLevel / BARD_CHARM_DURATION_DIVISOR) rounds.
     * Immune: undead, elemental, construct tags; bosses and mega-bosses.
     */
    bardCharm(targetEnemy) {
        const m = this.currentMember;
        if (!m || m.health <= 0) return;
        if (m.classId !== 'bard') return;
        if (m.level < BARD_CHARM_UNLOCK_LEVEL) {
            this._addLog(`${m.name} must be level ${BARD_CHARM_UNLOCK_LEVEL} to use Charm Monster.`);
            return;
        }
        if (m.mana < BARD_CHARM_MANA_COST) {
            this._addLog(`${m.name} doesn't have enough mana for Charm Monster (needs ${BARD_CHARM_MANA_COST} MP).`);
            return;
        }
        if (!targetEnemy || targetEnemy.health <= 0) return;

        const eName = this._eName(targetEnemy);
        const tDef  = ENEMY_TYPES[targetEnemy.type] || {};
        const tTags = tDef.tags || [];

        // Immunity: bosses / mega-bosses
        if (targetEnemy.isBoss || targetEnemy.isMegaBoss) {
            m.mana -= BARD_CHARM_MANA_COST;
            this._addLog(`🎵 ${m.name} plays an enchanting melody… but ${eName} is too powerful to charm!`);
            this._advancePlayerTurn();
            return;
        }
        // Immunity: undead, elemental, construct
        const immuneTag = BARD_CHARM_IMMUNE_TAGS.find(tag => tTags.includes(tag));
        if (immuneTag) {
            m.mana -= BARD_CHARM_MANA_COST;
            this._addLog(`🎵 ${m.name} plays an enchanting melody… but ${eName} (${immuneTag}) is immune to charm!`);
            this._advancePlayerTurn();
            return;
        }
        // Already charmed?
        if (targetEnemy.charmedRounds > 0) {
            this._addLog(`${eName} is already charmed!`);
            return;
        }

        m.mana -= BARD_CHARM_MANA_COST;

        const charmChance = Math.min(0.95, BARD_CHARM_BASE_CHANCE + BARD_CHARM_CHANCE_PER_2_LV * m.level);
        const duration    = Math.max(1, Math.floor(m.level / BARD_CHARM_DURATION_DIVISOR));

        if (Math.random() < charmChance) {
            targetEnemy.charmedRounds = duration;
            targetEnemy.charmerId     = m.id;
            this._addLog(`🎵 ${m.name} weaves a hypnotic song — ${eName} falls under the spell! (${duration} rounds)`);
        } else {
            this._addLog(`🎵 ${m.name} plays an enchanting melody… but ${eName} shakes it off! (${Math.round(charmChance * 100)}% chance)`);
        }

        this._advancePlayerTurn();
    }

    /**
     * Ranger L20 Explosive Arrow. Costs 3× normal ranged stamina.
     * Fires a single explosive arrow that hits ALL alive hostile enemies
     * at half post-defense damage, half normal crit chance, and half normal
     * instakill chance vs favored enemies.
     */
    rangerExplosiveArrow() {
        const m = this.currentMember;
        if (!m || m.health <= 0) return;
        if (m.classId !== 'ranger') return;
        if (m.level < RANGER_EXPLOSIVE_ARROW_UNLOCK_LEVEL) {
            this._addLog(`${m.name} must be level ${RANGER_EXPLOSIVE_ARROW_UNLOCK_LEVEL} to use Explosive Arrow.`);
            return;
        }

        const totalCost = RANGED_STAMINA_COST * RANGER_EXPLOSIVE_ARROW_STAMINA_MULT;
        const exhausted = m.stamina < totalCost;
        m.stamina = Math.max(0, m.stamina - totalCost);

        const favoredTags = m.getAllFavoredEnemies();
        const targets     = this.aliveHostileEnemies.slice(); // snapshot before damage loop

        if (targets.length === 0) {
            this._addLog('No enemies to target!');
            this._advancePlayerTurn();
            return;
        }

        this._addLog(`💥 ${m.name} fires an Explosive Arrow — it detonates among ALL enemies!${exhausted ? ' (exhausted!)' : ''}`);

        for (const target of targets) {
            if (target.health <= 0) continue;

            const tDef  = ENEMY_TYPES[target.type] || {};
            const tTags = tDef.tags || [];
            const isFav = favoredTags.length > 0 && favoredTags.some(tag => tTags.includes(tag));

            // Half instakill chance vs favored enemies
            if (isFav) {
                const ikChance = m.getFavoredEnemyInstakillChance() * RANGER_EXPLOSIVE_ARROW_INSTAKILL_MULT;
                if (ikChance > 0 && Math.random() < ikChance) {
                    target.health = 0;
                    this._addLog(`🎯 Explosive Arrow: ${this._eName(target)} is blown apart! (favored enemy instakill)`);
                    continue;
                }
            }

            // Roll base ranged damage
            let raw = randomInt(RANGED_DAMAGE_MIN, RANGED_DAMAGE_MAX);
            raw += m.getWeaponBonus('ranged');
            raw += m.getClassDamageBonus('ranged');
            if (exhausted) raw = Math.max(1, Math.floor(raw / 2));

            // Half normal crit chance
            const critChance = (RANGED_CRIT_CHANCE + m.getRangedCritBonus()) * RANGER_EXPLOSIVE_ARROW_CRIT_MULT;
            let isCrit = false;
            if (Math.random() < critChance) { raw *= 2; isCrit = true; }

            // Replicate _damageEnemy defense calculation without modifying health yet,
            // then halve the post-defense value (explosive = splash damage).
            const effects = target.activeEffects || [];
            let defMod = 0;
            for (const x of effects) {
                if (typeof x.defenseBonus === 'number') defMod += x.defenseBonus;
            }
            let postDef = raw;
            if (defMod < 0) postDef = Math.max(1, raw - defMod);
            if (!isFav) postDef = Math.max(1, postDef - (target.defense || 0));
            postDef = Math.max(1, Math.round(postDef));

            // Half post-defense damage (explosion splash)
            const dealt = Math.max(1, Math.floor(postDef * RANGER_EXPLOSIVE_ARROW_DAMAGE_MULT));
            target.health = Math.max(0, target.health - dealt);

            const eName   = this._eName(target);
            const critStr = isCrit ? ' 💥 CRIT!' : '';
            const favStr  = isFav ? ' [Favored — armor ignored]' : '';
            this._addLog(`  ➡️ ${eName} takes ${dealt} explosion damage!${critStr}${favStr}`);
            this._applyWeaponRider(m, target, dealt);
            if (target.health <= 0) this._addLog(`${eName} is destroyed in the blast!`);
        }

        this._advancePlayerTurn();
    }

    /**
     * Mage Shield (level 3+). Costs MAGE_SHIELD_MANA_COST mana.
     * Applies a defense buff to ALL party members (front + back) for several rounds,
     * so AoE magic that sweeps every row is also mitigated.
     * Only one mage shield can be active at a time; falls if the caster is defeated.
     * Defense bonus = MAGE_SHIELD_BASE_DEF + floor(level / MAGE_SHIELD_BONUS_EVERY).
     * Duration = MAGE_SHIELD_BASE_ROUNDS + floor(level / MAGE_SHIELD_BONUS_EVERY) rounds.
     */
    mageShield() {
        const m = this.currentMember;
        if (!m || m.health <= 0) return;
        if (m.classId !== 'mage') return;
        if (m.level < MAGE_SHIELD_MIN_LEVEL) {
            this._addLog(`${m.name} must be level ${MAGE_SHIELD_MIN_LEVEL} to cast Arcane Shield.`);
            return;
        }
        if (m.mana < MAGE_SHIELD_MANA_COST) {
            this._addLog(`${m.name} has too little mana to cast Arcane Shield (needs ${MAGE_SHIELD_MANA_COST}).`);
            return;
        }
        if (this._mageShieldCasterId !== null) {
            this._addLog(`An Arcane Shield is already active — only one shield at a time.`);
            return;
        }

        const bonus = MAGE_SHIELD_BASE_DEF + Math.floor(m.level / MAGE_SHIELD_BONUS_EVERY);
        const rounds = MAGE_SHIELD_BASE_ROUNDS + Math.floor(m.level / MAGE_SHIELD_BONUS_EVERY);

        m.mana -= MAGE_SHIELD_MANA_COST;
        this._mageShieldCasterId = m.id;

        // Shield covers ALL alive party members — front and back — so AoE magic
        // that sweeps every row is also mitigated.
        const allAlive = this.party.filter(t => t.health > 0);
        for (const t of allAlive) {
            t.activeEffects = (t.activeEffects || []).filter(e => e.type !== 'mage_shield');
            t.activeEffects.push({ type: 'mage_shield', defenseBonus: bonus, rounds, casterId: m.id });
        }

        this._addLog(`\u{1F6E1}\uFE0F ${m.name} raises an Arcane Shield! Entire party gains +${bonus} def for ${rounds} rounds.`);
        this._advancePlayerTurn();
    }

    /** Remove mage shield effects for a given caster (called when caster is defeated). */
    _removeMageShield(casterId) {
        if (!casterId) return;
        for (const t of this.party) {
            if (!t.activeEffects) continue;
            t.activeEffects = t.activeEffects.filter(e => !(e.type === 'mage_shield' && e.casterId === casterId));
        }
        if (this._mageShieldCasterId === casterId) this._mageShieldCasterId = null;
    }

    getAvailableNecroTiers(necroLevel) {
        return getNecromancerUnlocked(necroLevel);
    }

    /**
     * Necromancer summon — L1=Skeleton (tier 0), L3=Zombie (tier 1), etc.
     */
    summonUndead(tierIndex = 0) {
        const m = this.currentMember;
        if (!m || m.health <= 0) return;
        if (m.classId !== 'necromancer') return;

        const unlocked = getNecromancerUnlocked(m.level);
        const idx = Math.max(0, Math.min(tierIndex | 0, unlocked.length - 1));
        const effectiveTierIndex = Math.max(0, Math.min(idx, UNDEAD_TIERS.length - 1));
        // Tier cost: skeleton=7, zombie=8, ghoul=9, spectre=10 ... +1 per tier
        const tierCost = NECRO_SUMMON_MANA_COST + effectiveTierIndex;

        if (m.mana < tierCost) {
            this._addLog(`${m.name} needs ${tierCost} MP to summon this undead (has ${m.mana}).`);
            return;
        }


        const preset = UNDEAD_TIERS[effectiveTierIndex];
        // Stats scale per tier base + necromancer level (+1 melee/def per level).
        const stats = rollUndeadStats(effectiveTierIndex, m.level);

        m.mana -= tierCost;

        /** Helper: create and register one undead of the chosen tier. */
        const _spawnOne = () => {
            const s = rollUndeadStats(effectiveTierIndex, m.level);
            const u = new PartyMember({
                name: `${m.name}'s ${preset.name}`,
                classId:   preset.portraitClass,
                speciesId: preset.portraitSpecies,
                level:     m.level,
                maxHealth: s.maxHealth,
                maxStamina: s.maxStamina,
                maxMana:    s.maxMana,
                portraitSeed: Math.floor(Math.random() * 100000),
                isSummoned: true,
                summonType: preset.id,
                summonerId: m.id,
                canBeHealed: false,
                row: 'front',
                summonStats: {
                    meleeMin:  s.meleeMin,
                    meleeMax:  s.meleeMax,
                    defense:   s.defense,
                    incorporeal: preset.incorporeal || false,
                    necroLevel:  m.level,
                },
            });
            this.party.push(u);
            this._registerNewSummon(u);
            return u;
        };

        // ── Summon the first undead (costs mana) ────────────────────────────
        _spawnOne();
        this._addLog(`\u{1F480} ${m.name} summons a ${preset.name}!`);

        // Lich Form bonus: summon one additional undead of the same tier for free
        if (m.isLichForm) {
            _spawnOne();
            this._addLog(`\u{1F480}✨ ${m.name}'s Lich Form channels dark power — a second ${preset.name} rises unbidden!`);
        }

        // ── Cascade: each additional undead is free but decreasingly likely ──
        // Base chances: 2nd = 40%, 3rd = 35%, 4th = 30%, …  Each roll is 5%
        // lower than the last, and the necromancer's level adds +1% to every
        // roll in the chain (a level 100 necro auto-chains 8+ summons before
        // the compounding drop-off brings them below 100%).
        let extraCount = 0;
        let baseChance = 0.40;          // chance for the 2nd undead
        const levelBonus = m.level * 0.01;
        while (true) {
            const chance = Math.min(1, baseChance + levelBonus);
            if (chance <= 0) break;
            if (Math.random() >= chance) break;   // roll failed — chain ends
            _spawnOne();
            extraCount++;
            baseChance -= 0.05;                  // next undead is 5% harder
        }

        if (extraCount === 0) {
            // Single summon — nothing more to announce
        } else {
            // Horde: costs another tierCost MP (x2 total for any horde size)
            m.mana = Math.max(0, m.mana - tierCost);
            if (extraCount === 1) {
                this._addLog(`\u{1F480}\u{1F480} Dark power surges — a second ${preset.name} rises! (-${tierCost} MP)`);
            } else {
                this._addLog(`\u{1F480}\u2728 A HORDE RISES! ${m.name} summons ${1 + extraCount} ${preset.name}s! (-${tierCost} MP for horde)`);
            }
        }
        this._advancePlayerTurn();
    }

    /** Legacy alias — old saves / code paths may call summonSkeleton(). */
    summonSkeleton() { this.summonUndead(0); }

    /**
     * Ranger OR druid summon — wolf / bear / eagle / pixie / treant.
     *
     * Level-10+ upgrades (ranger or druid):
     *   Wolf  — pack cascade: 40% chance for a 2nd wolf, -5%/wolf, +1%/lvl above 9.
     *   Bear  — 10% + 1%/lvl above 10 → Giant Bear (+lvl melee dmg, +lvl% stun).
     *   Eagle — 10% + 1%/lvl above 10 → Golden Eagle (+lvl ranged dmg, +lvl% crit).
     *   Pixie — 10% + 1%/lvl above 10 → Pixie Princess (+lvl magic dmg, +lvl% dodge).
     *   Treant— 10% + 1%/lvl above 10 → Elder Treant (+lvl melee dmg, +lvl% hold).
     *
     * @param {'wolf'|'bear'|'eagle'|'pixie'|'treant'} beastId
     */
    summonBeast(beastId) {
        const m = this.currentMember;
        if (!m || m.health <= 0) return;
        if (m.classId !== 'ranger' && m.classId !== 'druid') return;
        const cost = m.classId === 'druid' ? DRUID_SUMMON_MANA_COST : RANGER_SUMMON_MANA_COST;
        if (m.mana < cost) {
            this._addLog(`${m.name} has too little mana to summon (needs ${cost}).`);
            return;
        }
        const preset = BEAST_TYPES[beastId];
        if (!preset) return;

        // Treant is druid-only and requires level 5.
        if (beastId === 'treant') {
            if (m.classId !== 'druid') {
                this._addLog(`Only a druid can call upon a Treant.`);
                return;
            }
            if (m.level < 5) {
                this._addLog(`${m.name} must reach druid level 5 to summon a Treant.`);
                return;
            }
        }

        const stats = rollBeastStats(beastId, m.level);
        m.mana -= cost;

        // ── Level-10+ upgrades for single-beast summons (bear/eagle/pixie/treant) ──
        // upgradeChance = 25% base + 2% per summoner level above 10.
        let upgradeName = null;
        let upgradeBonus = 0; // stored in summonStats for combat use (% as decimal)
        if (m.level >= 10 && beastId !== 'wolf') {
            const lvl = m.level;
            const upgradeChance = 0.25 + Math.max(0, lvl - 10) * 0.02;
            if (Math.random() < upgradeChance) {
                upgradeBonus = lvl * 0.01; // +level% to the relevant chance stat
                if (beastId === 'bear') {
                    upgradeName = 'giant_bear';
                    stats.meleeMin = (stats.meleeMin || 0) + lvl;
                    stats.meleeMax = (stats.meleeMax || 0) + lvl;
                } else if (beastId === 'eagle') {
                    upgradeName = 'golden_eagle';
                    stats.rangedMin = (stats.rangedMin || 0) + lvl;
                    stats.rangedMax = (stats.rangedMax || 0) + lvl;
                } else if (beastId === 'pixie') {
                    upgradeName = 'pixie_princess';
                    stats.magicMin = (stats.magicMin || 0) + lvl;
                    stats.magicMax = (stats.magicMax || 0) + lvl;
                } else if (beastId === 'treant') {
                    upgradeName = 'elder_treant';
                    stats.meleeMin = (stats.meleeMin || 0) + lvl;
                    stats.meleeMax = (stats.meleeMax || 0) + lvl;
                }
            }
        }

        // Map upgrade keys to display names.
        const UPGRADE_LABELS = {
            giant_bear:    'Giant Bear',
            golden_eagle:  'Golden Eagle',
            pixie_princess:'Pixie Princess',
            elder_treant:  'Elder Treant',
        };
        const displayName = upgradeName
            ? `${m.name}'s ${UPGRADE_LABELS[upgradeName]}`
            : `${m.name}'s ${preset.name}`;

        // ── Helper: create and register one beast with the current stats ──────
        const _spawnOne = (nameOverride) => {
            const beast = new PartyMember({
                name: nameOverride ?? displayName,
                classId:   preset.portraitClass,
                speciesId: preset.portraitSpecies,
                level:     m.level,
                maxHealth: stats.maxHealth,
                maxStamina: stats.maxStamina,
                maxMana:    stats.maxMana,
                portraitSeed: Math.floor(Math.random() * 100000),
                isSummoned: true,
                summonType: preset.id,
                summonerId: m.id,
                canBeHealed: true,
                row: (beastId === 'bear' || beastId === 'wolf' || beastId === 'treant') ? 'front' : 'back',
                summonStats: {
                    meleeMin:  stats.meleeMin,  meleeMax:  stats.meleeMax,
                    rangedMin: stats.rangedMin, rangedMax: stats.rangedMax,
                    magicMin:  stats.magicMin,  magicMax:  stats.magicMax,
                    defense:   stats.defense,
                    beastKind: beastId,
                    // Upgrade bonus stored here for use at combat time.
                    ...(upgradeName ? { upgradeName, upgradeBonus } : {}),
                },
            });
            this.party.push(beast);
            this._registerNewSummon(beast);
            return beast;
        };

        // ── Summon the first beast ────────────────────────────────────────────
        _spawnOne();

        if (upgradeName) {
            const label = UPGRADE_LABELS[upgradeName];
            this._addLog(`${preset.icon} ${m.name} summons a *** ${label} ***! ✨✨✨ UPGRADED SUMMON! ✨✨✨`);
        } else {
            this._addLog(`${preset.icon} ${m.name} summons a ${preset.name}!`);
        }

        // ── Wolf pack cascade (level 10+): 40% → 35% → … chance for extra wolves ──
        if (beastId === 'wolf' && m.level >= 10) {
            let extraCount = 0;
            let baseChance = 0.40;
            // +1% per level above 9 (so level 10 = +1%, level 20 = +11%, etc.)
            const levelBonus = Math.max(0, m.level - 9) * 0.01;
            while (true) {
                const chance = Math.min(1, baseChance + levelBonus);
                if (chance <= 0) break;
                if (Math.random() >= chance) break;
                _spawnOne(`${m.name}'s Wolf`);
                extraCount++;
                baseChance -= 0.05;
            }
            if (extraCount === 1) {
                this._addLog(`\u{1F43A}\u{1F43A} The pack grows — a second wolf answers the call!`);
            } else if (extraCount > 1) {
                this._addLog(`\u{1F43A}✨ A PACK RISES! ${m.name} summons ${1 + extraCount} wolves at once!`);
            }
        }

        this._advancePlayerTurn();
    }

    /**
     * Artificer golem summon — PERSISTENT. One golem per artificer at a time.
     * Costs gold + reagents (per GOLEM_TIERS[tier].cost) paid from group inventory.
     * Golem stats scale with artificer level. Only the owning artificer can heal it.
     *
     * Also callable out-of-combat via the Crafting UI: in that case `this.party`
     * may be empty, so the caller passes `artificerMember` explicitly.
     *
     * @param {string} tierId   'flesh' | 'clay' | 'stone' | 'iron'
     * @param {PartyMember}  [artificerMember]  optional — defaults to currentMember
     * @param {boolean}      [spendTurn=true]   if false, do not advance combat turn
     * @param {Inventory}    [inventoryOverride] optional — falls back to this.inventory
     * @returns {null|PartyMember}  the new golem, or null on failure
     */
    summonGolem(tierId, artificerMember = null, spendTurn = true, inventoryOverride = null) {
        const m = artificerMember || this.currentMember;
        if (!m || m.health <= 0) {
            this._addLog('Cannot summon a golem — artificer is unavailable.');
            return null;
        }
        if (m.classId !== 'artificer') {
            this._addLog(`${m.name} is not an Artificer — only Artificers can forge golems.`);
            return null;
        }
        const tier = GOLEM_TIERS.find(t => t.id === tierId);
        if (!tier) return null;
        if (m.level < tier.unlockLevel) {
            this._addLog(`${m.name} is too low-level to forge a ${tier.name} (requires L${tier.unlockLevel}).`);
            return null;
        }
        // One golem per artificer at a time (persistent — they stack forever otherwise).
        const existing = (this.party || []).find(p =>
            p && p.isSummoned && p.summonerId === m.id &&
            p.summonStats && p.summonStats.tierId && p.health > 0 &&
            GOLEM_PRESETS[p.summonType]
        );
        if (existing) {
            this._addLog(`${m.name} already commands a ${existing.name.replace(`${m.name}'s `, '')} — dismiss or lose it first.`);
            return null;
        }

        const inv = inventoryOverride || this.inventory;
        if (!inv) {
            this._addLog('Cannot access inventory to pay golem costs.');
            return null;
        }
        const cost = tier.cost || {};
        // Verify all costs before charging any of them.
        if ((cost.gold      || 0) > 0 && inv.gold < cost.gold) {
            this._addLog(`Not enough gold to forge a ${tier.name} (needs ${cost.gold}g).`);
            return null;
        }
        if ((cost.common    || 0) > 0 && !inv.hasReagent('common',    cost.common)) {
            this._addLog(`Not enough common reagents (needs ${cost.common}).`);
            return null;
        }
        if ((cost.uncommon  || 0) > 0 && !inv.hasReagent('uncommon',  cost.uncommon)) {
            this._addLog(`Not enough uncommon reagents (needs ${cost.uncommon}).`);
            return null;
        }
        if ((cost.rare      || 0) > 0 && !inv.hasReagent('rare',      cost.rare)) {
            this._addLog(`Not enough rare reagents (needs ${cost.rare}).`);
            return null;
        }
        if ((cost.epic      || 0) > 0 && !inv.hasReagent('epic',      cost.epic)) {
            this._addLog(`Not enough epic reagents (needs ${cost.epic}).`);
            return null;
        }
        if ((cost.legendary || 0) > 0 && !inv.hasReagent('legendary', cost.legendary)) {
            this._addLog(`Not enough legendary reagents (needs ${cost.legendary}).`);
            return null;
        }
        if ((cost.mythic    || 0) > 0 && !inv.hasReagent('mythic',    cost.mythic)) {
            this._addLog(`Not enough mythic reagents (needs ${cost.mythic}).`);
            return null;
        }
        if ((cost.divine    || 0) > 0 && !inv.hasReagent('divine',    cost.divine)) {
            this._addLog(`Not enough divine reagents (needs ${cost.divine}).`);
            return null;
        }

        // Deduct costs (now that all checks passed).
        if ((cost.gold      || 0) > 0) inv.removeGold(cost.gold);
        if ((cost.common    || 0) > 0) inv.removeReagent('common',    cost.common);
        if ((cost.uncommon  || 0) > 0) inv.removeReagent('uncommon',  cost.uncommon);
        if ((cost.rare      || 0) > 0) inv.removeReagent('rare',      cost.rare);
        if ((cost.epic      || 0) > 0) inv.removeReagent('epic',      cost.epic);
        if ((cost.legendary || 0) > 0) inv.removeReagent('legendary', cost.legendary);
        if ((cost.mythic    || 0) > 0) inv.removeReagent('mythic',    cost.mythic);
        if ((cost.divine    || 0) > 0) inv.removeReagent('divine',    cost.divine);

        const preset = GOLEM_PRESETS[tierId];
        const stats = rollGolemStats(tierId, m.level);

        const golem = new PartyMember({
            name: `${m.name}'s ${tier.name}`,
            classId:   preset.portraitClass,
            speciesId: preset.portraitSpecies,
            level:     m.level, // golem level = artificer level
            maxHealth: stats.maxHealth,
            maxStamina: 0,
            maxMana:    0,
            portraitSeed: Math.floor(Math.random() * 100000),
            isSummoned: true,
            isPersistent: true,                // survives combat/rest/travel/save
            summonType: tier.id,
            summonerId: m.id,
            canBeHealed: false,                // only artificer heals via healGolem
            row: 'front',
            summonStats: {
                meleeMin:        stats.meleeMin,
                meleeMax:        stats.meleeMax,
                defense:         stats.defense,
                tierId:          stats.tierId,
                artificerLevel:  stats.artificerLevel,
                regenPercent:    stats.regenPercent,
                reflectChance:   stats.reflectChance,
                reflectFraction: stats.reflectFraction,
                slamEvery:       stats.slamEvery,
                slamStunChance:  stats.slamStunChance,
                cleaveTargets:   stats.cleaveTargets,
                drainOnKill:     stats.drainOnKill,
                forceAoe:        stats.forceAoe,
                adamantineBolts: stats.adamantineBolts,
                halfDmgSpecial:  stats.halfDmgSpecial,
                divineSoul:      stats.divineSoul,
                immune:          stats.immune,
                slamCounter:     0, // internal counter for stone slam cadence
            },
        });
        // Full HP on spawn.
        golem.health = golem.maxHealth;

        if (Array.isArray(this.party)) this.party.push(golem);
        this._addLog(`${tier.icon} ${m.name} forges a ${tier.name}! It thunders into line.`);

        if (spendTurn && this.party && this.party.length) {
            this._registerNewSummon(golem);
            this._advancePlayerTurn();
        }
        return golem;
    }

    /**
     * Artificer heal on their own golem. Costs 1 reagent of the golem's tier
     * and restores ARTIFICER_HEAL_GOLEM_PCT (50%) of the golem's max HP.
     * Can be used in or out of combat; pass `spendTurn=false` from the UI
     * when used out of combat.
     *
     * @param {PartyMember} golemMember
     * @param {PartyMember} [artificerMember]
     * @param {boolean}     [spendTurn=true]
     * @returns {boolean}   true on success
     */
    healGolem(golemMember, artificerMember = null, spendTurn = true) {
        const m = artificerMember || this.currentMember;
        if (!m || m.health <= 0) return false;
        if (m.classId !== 'artificer') {
            this._addLog(`${m.name} cannot channel the Artificer's forge.`);
            return false;
        }
        if (!golemMember || !golemMember.isSummoned || !golemMember.summonStats ||
            !golemMember.summonStats.tierId || !GOLEM_PRESETS[golemMember.summonType]) {
            this._addLog('Target is not a golem.');
            return false;
        }
        if (golemMember.summonerId !== m.id) {
            this._addLog(`${m.name} cannot repair another Artificer's golem.`);
            return false;
        }
        if (golemMember.health <= 0) {
            this._addLog(`The ${golemMember.name} lies broken — it cannot be repaired.`);
            return false;
        }

        const tierId = golemMember.summonStats.tierId;
        const tier = GOLEM_TIERS.find(t => t.id === tierId);
        const reagentTier = (tier && tier.reagentTier) || 'common';
        const reagentId = `reagent_${reagentTier}`;

        const inv = this.inventory;
        if (!inv || !inv.hasItem(reagentId, 1)) {
            this._addLog(`${m.name} needs 1 ${reagentTier} reagent to repair the ${tier ? tier.name : 'golem'}.`);
            return false;
        }
        inv.removeItem(reagentId, 1);

        const heal = Math.max(1, Math.floor(golemMember.maxHealth * ARTIFICER_HEAL_GOLEM_PCT));
        const before = golemMember.health;
        golemMember.health = Math.min(golemMember.maxHealth, golemMember.health + heal);
        const dealt = golemMember.health - before;
        this._addLog(`\u{1F527} ${m.name} repairs the ${tier ? tier.name : 'golem'} for ${dealt} HP (spent 1 ${reagentTier} reagent).`);

        if (spendTurn && this.party && this.party.length) this._advancePlayerTurn();
        return true;
    }

    /**
     * Paladin Smite — armor-ignoring holy melee strike. Costs PALADIN_SMITE_MANA_COST
     * mana. Damage is rolled as a normal melee hit (plus paladin melee scaling).
     * Against enemies tagged 'undead' or 'demon' in ENEMY_TYPES, there's a
     * (PALADIN_SMITE_INSTAKILL_BASE + PALADIN_SMITE_INSTAKILL_PER_LEVEL × level)
     * chance to drop them in one blow (capped at 100%).
     *
     * Note: player melee already bypasses any enemy armor model (see
     * _damageEnemy — it doesn't subtract enemy armor), so "armor-ignoring"
     * is preserved naturally; we document the intent for future-proofing.
     */
    paladinSmite(targetEnemy) {
        const m = this.currentMember;
        if (!m || m.health <= 0) return;
        if (m.classId !== 'paladin') return;
        if (!this.canMelee(m)) {
            this._addLog(`${m.name} cannot Smite from the back row!`);
            return;
        }
        if (!targetEnemy || targetEnemy.health <= 0) return;

        // Smite is only effective against undead or demon.
        const smiteTypeDef = ENEMY_TYPES[targetEnemy.type] || {};
        const smiteTags = Array.isArray(smiteTypeDef.tags) ? smiteTypeDef.tags : [];
        if (!smiteTags.includes('undead') && !smiteTags.includes('demon')) {
            this._addLog(`\u2728 ${m.name}'s divine Smite can only purge the unholy — undead and demons only!`);
            return;
        }

        if (m.mana < PALADIN_SMITE_MANA_COST) {
            this._addLog(`${m.name} has too little mana to Smite (needs ${PALADIN_SMITE_MANA_COST}).`);
            return;
        }

        m.mana = Math.max(0, m.mana - PALADIN_SMITE_MANA_COST);

        const typeDef = ENEMY_TYPES[targetEnemy.type] || {};
        const tags = Array.isArray(typeDef.tags) ? typeDef.tags : [];
        const isSmitable = tags.indexOf('undead') !== -1 || tags.indexOf('demon') !== -1;

        const eName = this._eName(targetEnemy);

                // Purge roll — capped at PALADIN_SMITE_INSTAKILL_CAP (50%).
        if (isSmitable) {
            const chance = Math.min(PALADIN_SMITE_INSTAKILL_CAP,
                PALADIN_SMITE_INSTAKILL_BASE + PALADIN_SMITE_INSTAKILL_PER_LEVEL * m.level);
            if (Math.random() < chance) {
                if (targetEnemy.isBoss || targetEnemy.isMegaBoss) {
                    // Bosses resist instant death — take x4 smite damage instead
                    let bossDmg = this._rollPlayerMeleeDamage(m);
                    bossDmg += 2 * m.level;
                    bossDmg *= (2 + 0.10 * m.level);
                    bossDmg  = Math.floor(bossDmg * PALADIN_SMITE_BOSS_DAMAGE_MULT);
                    const bossDealt = this._damageEnemy(targetEnemy, Math.max(1, bossDmg));
                    this._addLog(`✨ ${m.name}'s divine purge strikes ${eName} — Boss resists instant death! (x4 smite: ${bossDealt} damage)`);
                    this._applyWeaponRider(m, targetEnemy, bossDealt);
                    this._applyWeaponRider(m, targetEnemy, bossDealt, 'offhand');
                    if (targetEnemy.health <= 0) this._addLog(`${eName} is defeated!`);
                    this._advancePlayerTurn();
                    return;
                }
                const overkill = targetEnemy.health;
                targetEnemy.health = 0;
                this._addLog(`✨ ${m.name} SMITES ${eName} with holy light! (${overkill} damage — purged!)`);
                this._addLog(`${eName} is defeated!`);
                this._advancePlayerTurn();
                return;
            }
        }

        // Otherwise a flat holy strike: melee roll + paladin scaling.
        let dmg = this._rollPlayerMeleeDamage(m);
        // Divine flavour bonus against smitable foes — +2 per paladin level.
        if (isSmitable) {
            // Fold in +2 per level first
            dmg += 2 * m.level;
            dmg *= (2 + 0.10 * m.level);
        }

        const dealt = this._damageEnemy(targetEnemy, dmg);

        const flavour = isSmitable
            ? `\u2728 ${m.name} Smites ${eName} with searing holy light for ${dealt}!`
            : `\u2728 ${m.name} Smites ${eName} for ${dealt} damage.`;
        this._addLog(flavour);

        this._applyWeaponRider(m, targetEnemy, dealt);
        this._applyWeaponRider(m, targetEnemy, dealt, 'offhand');

        if (targetEnemy.health <= 0) this._addLog(`${eName} is defeated!`);
        this._advancePlayerTurn();
    }

    /**
     * Paladin Heal — half-strength Cleric heal. PALADIN_HEAL_MANA_COST mana for
     * PALADIN_HEAL_PERCENT of target's max HP, plus per-level scaling via the
     * paladin classDef.healPercentPerLevel (already halved in Classes.js).
     * Cannot heal uncontrolled summons (undead, golems).
     */
    paladinHeal(targetMember) {
        const m = this.currentMember;
        if (!m || m.health <= 0) return;
        if (m.classId !== 'paladin') return;
        if (!targetMember || targetMember.health <= 0) return;

        if (targetMember.isSummoned && !targetMember.canBeHealed) {
            this._addLog(`${m.name}'s prayer cannot mend ${targetMember.name}.`);
            return;
        }
        if (m.mana < PALADIN_HEAL_MANA_COST) {
            this._addLog(`${m.name} has too little mana to Lay On Hands (needs ${PALADIN_HEAL_MANA_COST}).`);
            return;
        }

        m.mana -= PALADIN_HEAL_MANA_COST;
        const pct = PALADIN_HEAL_PERCENT + m.getHealPercentBonus();
        const amt = Math.max(1, Math.ceil(targetMember.maxHealth * pct));
        const before = targetMember.health;
        targetMember.health = Math.min(targetMember.maxHealth, targetMember.health + amt);
        const healed = targetMember.health - before;
        this._addLog(`\u{1F64F} ${m.name} lays hands on ${targetMember.name} and restores ${healed} HP.`);
        this._advancePlayerTurn();
    }

    /**
     * Paladin Fire Aura — toggleable. When active, reflects melee damage dealt
     * to this paladin back at the attacker as fire damage. Costs
     * PALADIN_FIRE_AURA_MANA_PER_ROUND MP per round (deducted in _tickPartyEffects).
     */
    paladinFireAura() {
        const m = this.currentMember;
        if (!m || m.health <= 0) return;
        if (m.classId !== 'paladin') return;

        if (m.fireAuraActive) {
            // Toggle off — uses the turn
            m.fireAuraActive = false;
            this._addLog(`\u{1F525} ${m.name} extinguishes their Fire Aura.`);
            this._advancePlayerTurn();
        } else {
            // Toggle on — FREE action; paladin may still act this turn
            if (m.mana < PALADIN_FIRE_AURA_MANA_PER_ROUND) {
                this._addLog(`${m.name} doesn't have enough mana to ignite their Fire Aura (needs ${PALADIN_FIRE_AURA_MANA_PER_ROUND} MP/round).`);
                return;
            }
            m.fireAuraActive = true;
            this._addLog(`\u{1F525} ${m.name} ignites a blazing Fire Aura! (reflects melee damage as fire; costs ${PALADIN_FIRE_AURA_MANA_PER_ROUND} MP/round)`);
            this._notify(); // refresh UI so player sees it's on, but keep their turn
        }
    }

    /**
     * Bard Disrupt — once per combat AoE. Targets all enemies:
     *   - Applies attack/defense debuff (-1 per 5 bard levels)
     *   - Deals magic damage scaled with bard magic bonus + debuff scale
     *   - 50% chance to stun each enemy for 1 round
     * Costs BARD_DISRUPT_MANA_COST mana.
     */
    bardDisrupt() {
        const m = this.currentMember;
        if (!m || m.health <= 0) return;
        if (m.classId !== 'bard') return;
        if (m.usedBardSong) {
            this._addLog(`${m.name} has already used their disrupt this fight.`);
            return;
        }
        if (m.mana < BARD_DISRUPT_MANA_COST) {
            this._addLog(`${m.name} has too little mana to disrupt (needs ${BARD_DISRUPT_MANA_COST}).`);
            return;
        }

        m.mana -= BARD_DISRUPT_MANA_COST;
        m.usedBardSong = true;

        const scale   = Math.max(1, Math.floor(m.level / 3));
        const debuff  = scale;
        const dmgBase = m.getClassDamageBonus('magic') + scale;

        this._addLog(`\u{1F3B6} ${m.name} unleashes a dissonant chord! AoE disruption!`);

        let stunCount = 0;
        for (const e of this.aliveEnemies) {
            // Debuff
            e.activeEffects = e.activeEffects || [];
            e.activeEffects = e.activeEffects.filter(x => x.type !== 'bard_disrupt');
            e.activeEffects.push({
                type: 'bard_disrupt',
                rounds: 1,
                damageBonus:  -debuff,
                defenseBonus: -debuff,
            });

            // Magic damage via _damageEnemy (handles entangle/debuff interactions)
            const dmg = Math.max(1, dmgBase + randomInt(1, 4));
            const dealt = this._damageEnemy(e, dmg, false, true);
            const eName = this._eName(e);
            this._addLog(`  🎵 ${eName} takes ${dealt} magic dmg (-${debuff} atk/-${debuff} def)`);
            if (e.health <= 0) this._addLog(`${eName} is defeated!`);

            // 50% stun (boss/mega-boss resist applies)
            if (Math.random() < 0.5 && this._tryStunEnemy(e)) {
                stunCount++;
            }
        }

        if (stunCount > 0) {
            this._addLog(`  ⚡ ${stunCount} enem${stunCount === 1 ? 'y' : 'ies'} stunned!`);
        }

        this._advancePlayerTurn();
    }

    /**
     * Druid Entangle — 50% chance per enemy to apply -2 defense / -2 damage
     * debuff for POISON_DURATION_ROUNDS rounds (we reuse the rounds counter).
     * Debuff magnitude scales +1 per odd level beyond L1.
     */
    druidEntangle() {
        const m = this.currentMember;
        if (!m || m.health <= 0) return;
        if (m.classId !== 'druid') return;
        if (m.mana < DRUID_ENTANGLE_MANA_COST) {
            this._addLog(`${m.name} has too little mana to cast Entangle (needs ${DRUID_ENTANGLE_MANA_COST}).`);
            return;
        }

        m.mana -= DRUID_ENTANGLE_MANA_COST;
        const debuff = DRUID_ENTANGLE_BASE_DEBUFF + Math.floor(Math.max(0, m.level - 1) / 2);
        this._addLog(`\u{1F33F} ${m.name} calls forth thorny vines!`);

        let affected = 0;
        for (const e of this.aliveEnemies) {
            // Incorporeal creatures cannot be physically entangled.
            const eDef = ENEMY_TYPES[e.type] || {};
            if (Array.isArray(eDef.tags) && eDef.tags.includes('incorporeal')) {
                this._addLog(`\u{1F33F} The vines pass harmlessly through ${this._eName(e)}!`);
                continue;
            }
            if (Math.random() < DRUID_ENTANGLE_CHANCE) {
                e.activeEffects = e.activeEffects || [];
                // Remove any existing entangle before re-applying
                e.activeEffects = e.activeEffects.filter(x => x.type !== 'entangle');
                e.activeEffects.push({
                    type: 'entangle',
                    rounds: POISON_DURATION_ROUNDS,
                    damageBonus:  -debuff,
                    defenseBonus: -debuff,
                });
                affected++;
                this._addLog(`\u{1F33F} ${this._eName(e)} is entangled! (-${debuff} dmg, -${debuff} def)`);
            } else {
                this._addLog(`${this._eName(e)} resists the vines.`);
            }
        }
        if (affected === 0) this._addLog('The vines fail to take hold!');

        this._advancePlayerTurn();
    }

    defend() {
        const m = this.currentMember;
        if (!m) return;
        m._defending = true;
        this._addLog(`${m.name} takes a defensive stance.`);
        this._advancePlayerTurn();
    }

    /**
     * Warrior L20: toggle Defend Mode on/off.
     * Toggling is the warrior's action for this turn (turn advances).
     * While Defend Mode is active, the warrior intercepts attacks on
     * party members using their augmented shield block chance.
     */
    warriorDefendModeToggle() {
        const m = this.currentMember;
        if (!m || m.classId !== 'warrior' || m.level < WARRIOR_DEFEND_MODE_UNLOCK_LEVEL) return;
        m.isDefendMode = !m.isDefendMode;
        if (m.isDefendMode) {
            const bonus  = Math.round(m.getDefendModeShieldBonus() * 100);
            const total  = Math.round(m.getAugmentedShieldBlock()  * 100);
            this._addLog(`\u{1F6E1}️ ${m.name} enters Defend Mode! Shield block +${bonus}% → ${total}% total. Attacks disabled; intercepts ally hits.`);
        } else {
            this._addLog(`⚔️ ${m.name} exits Defend Mode and readies for combat.`);
        }
        this._advancePlayerTurn();
    }

    /**
     * Pass the current turn without attacking (used when warrior is in Defend Mode
     * and the player does not want to toggle it off or use Defend/Flee).
     */
    endTurn() {
        const m = this.currentMember;
        if (!m) return;
        this._addLog(`\u{1F6E1}️ ${m.name} stands guard.`);
        this._advancePlayerTurn();
    }

    flee() {
        if (Math.random() < FLEE_CHANCE) {
            this._addLog('Your party flees from combat!');
            this.phase = 'FLED';
            this._notify();
        } else {
            this._addLog('Failed to flee! The enemies close in...');
            this._advancePlayerTurn();
        }
    }

    promoteToFront(memberId) {
        const m = this.party.find(p => p.id === memberId);
        if (!m || m.health <= 0) return;
        m.row = 'front';
        this._addLog(`${m.name} moves to the front row!`);
        this._advanceThroughInitiative();
    }

    // ────────────────────────────────────────────
    // Summon combat AI
    // ────────────────────────────────────────────

    _takeSummonTurn(m) {
        const stats = m.summonStats || {};
        const targets = this.aliveHostileEnemies;
        if (targets.length === 0) return;

        // ── Golem AI (persistent artificer summons) ──
        // Identified by summonStats.tierId matching a GOLEM_PRESETS entry.
        if (stats.tierId && GOLEM_PRESETS[m.summonType]) {
            // Flesh Golem — regen at start of own turn.
            if (stats.regenPercent && stats.regenPercent > 0 && m.health < m.maxHealth) {
                const regen = Math.max(1, Math.floor(m.maxHealth * stats.regenPercent));
                const before = m.health;
                m.health = Math.min(m.maxHealth, m.health + regen);
                const healed = m.health - before;
                if (healed > 0) this._addLog(`\u{1F9A0} ${m.name} knits flesh and recovers ${healed} HP.`);
            }

            // Stone Golem — AoE slam every N rounds.
            if (stats.slamEvery && stats.slamEvery > 0) {
                stats.slamCounter = (stats.slamCounter || 0) + 1;
                if (stats.slamCounter >= stats.slamEvery) {
                    stats.slamCounter = 0;
                    const dmg = randomInt(stats.meleeMin ?? 3, stats.meleeMax ?? 13);
                    this._addLog(`\u{1FAA8} ${m.name} SLAMS the ground — shockwave rocks the battlefield!`);
                    for (const e of [...targets]) {
                        if (e.health <= 0) continue;
                        const dealt = this._damageSummonEnemy(e, dmg);
                        this._addLog(`  ↪️ ${this._eName(e)} takes ${dealt} damage!`);
                        if (e.health > 0 && stats.slamStunChance && Math.random() < stats.slamStunChance) {
                            if (this._tryStunEnemy(e))
                                this._addLog(`  \u26A1 ${this._eName(e)} is stunned!`);
                        }
                        if (e.health <= 0) this._addLog(`${this._eName(e)} is defeated!`);
                    }
                    return;
                }
            }

            // ── Mithril Golem — Force AoE: blasts floor(AL/3) targets ──────────
            if (stats.forceAoe) {
                const AL = stats.artificerLevel || 1;
                const numTargets = Math.max(1, Math.floor(AL / 3));
                const preset = GOLEM_PRESETS[m.summonType];
                const icon = (preset && preset.icon) || '⚙️';
                this._addLog(`${icon} ${m.name} unleashes a kinetic force wave (${numTargets} target${numTargets > 1 ? 's' : ''})!`);
                const shuffled = [...targets].sort(() => Math.random() - 0.5);
                for (let i = 0; i < numTargets && i < shuffled.length; i++) {
                    const t = shuffled[i];
                    if (!t || t.health <= 0) continue;
                    const dmg = randomInt(stats.meleeMin ?? 3, stats.meleeMax ?? 13);
                    const dealt = this._damageSummonEnemy(t, dmg);
                    this._addLog(`  ↪️ force blast hits ${this._eName(t)} for ${dealt}!`);
                    if (t.health <= 0) this._addLog(`${this._eName(t)} is defeated!`);
                }
                return;
            }

            // ── Adamantine Golem — Armor-Piercing Bolts ─────────────────────────
            if (stats.adamantineBolts) {
                const AL = stats.artificerLevel || 1;
                const boltCount  = Math.max(1, Math.floor(AL / 5));
                const critChance = 0.20 + Math.floor(AL / 2) * 0.01;
                const preset = GOLEM_PRESETS[m.summonType];
                const icon = (preset && preset.icon) || '\u{1F5FF}';
                this._addLog(`${icon} ${m.name} fires ${boltCount} armor-piercing bolt${boltCount > 1 ? 's' : ''}!`);
                const aliveNow = this.aliveEnemies;
                for (let i = 0; i < boltCount; i++) {
                    if (aliveNow.length === 0) break;
                    const t = aliveNow[Math.floor(Math.random() * aliveNow.length)];
                    if (!t || t.health <= 0) continue;
                    let dmg = randomInt(stats.meleeMin ?? 3, stats.meleeMax ?? 13);
                    const isCrit = Math.random() < critChance;
                    if (isCrit) dmg *= 2;
                    // Bolts ignore defense — pass directly
                    const dealt = this._damageSummonEnemy(t, dmg, /* ignoreDefense */ true);
                    this._addLog(`  ↪️ bolt ${i + 1} hits ${this._eName(t)} for ${dealt}!${isCrit ? ' \u{1F4A5} CRIT!' : ''}`);
                    if (t.health <= 0) this._addLog(`${this._eName(t)} is defeated!`);
                }
                return;
            }

            // ── Divine Soul Golem — AoE divine strikes + per-member party heal ────
            if (stats.divineSoul) {
                const AL = stats.artificerLevel || 1;
                const numTargets = Math.max(1, Math.floor(AL / 3));
                const preset = GOLEM_PRESETS[m.summonType];
                const icon = (preset && preset.icon) || '\u{1F4AB}';
                this._addLog(`${icon} ${m.name} smites with divine power — striking ${numTargets} enem${numTargets !== 1 ? 'ies' : 'y'}!`);
                const shuffled = [...targets].sort(() => Math.random() - 0.5);
                for (let i = 0; i < numTargets && i < shuffled.length; i++) {
                    const t = shuffled[i];
                    if (!t || t.health <= 0) continue;
                    const dmg = randomInt(stats.meleeMin ?? 3, stats.meleeMax ?? 13);
                    // Ignores half of enemy defense
                    const dealt = this._damageSummonEnemy(t, dmg, false, true);
                    this._addLog(`  ↪️ divine smite hits ${this._eName(t)} for ${dealt}!`);
                    // 20% chance to stun — respects stun immunity
                    if (t.health > 0) {
                        const eTDef = ENEMY_TYPES[t.type] || {};
                        const eTImmune = Array.isArray(eTDef.immune) ? eTDef.immune : [];
                        const stunImmune = eTImmune.includes('stun')
                            || (Array.isArray(eTDef.tags) && eTDef.tags.includes('undead'));
                        if (!stunImmune && Math.random() < 0.20) {
                            if (this._tryStunEnemy(t))
                                this._addLog(`  ⚡ ${this._eName(t)} is stunned by divine force!`);
                        }
                    }
                    if (t.health <= 0) this._addLog(`${this._eName(t)} is slain!`);
                }
                // 33% chance PER living party member to be healed.
                // Includes regular members + summoned animals/pixie.
                // Excludes summoned undead and golems.
                const lostHp = m.maxHealth - m.health;
                if (lostHp > 0) {
                    const healAmt = Math.max(1, Math.floor(lostHp * 0.10));
                    const healable = this.party.filter(p => {
                        if (!p || p.health <= 0) return false;
                        if (!p.isSummoned) return true;            // regular party members
                        if (BEAST_TYPES[p.summonType]) return true; // animals & pixie
                        return false;                               // golems & undead excluded
                    });
                    for (const p of healable) {
                        if (Math.random() < 0.33) {
                            p.health = Math.min(p.maxHealth, p.health + healAmt);
                            this._addLog(`✨ ${p.name} is mended by divine radiance! (+${healAmt} HP)`);
                        }
                    }
                }
                return;
            }

            // Default golem action: melee single target, with optional cleave.
            const primary = targets[Math.floor(Math.random() * targets.length)];
            let dmg = randomInt(stats.meleeMin ?? 3, stats.meleeMax ?? 13);
            const dealt = this._damageSummonEnemy(primary, dmg);
            const preset = GOLEM_PRESETS[m.summonType];
            const icon = (preset && preset.icon) || '\u{1F9F1}';
            this._addLog(`${icon} ${m.name} hammers ${this._eName(primary)} for ${dealt}!`);
            if (primary.health <= 0) this._addLog(`${this._eName(primary)} is defeated!`);

            // Iron Golem — cleave additional targets.
            if (stats.cleaveTargets && stats.cleaveTargets > 0) {
                const extras = this.aliveEnemies.filter(e => e !== primary);
                for (let i = 0; i < stats.cleaveTargets && i < extras.length; i++) {
                    const t = extras[i];
                    if (!t || t.health <= 0) continue;
                    const cleaveDmg = randomInt(stats.meleeMin ?? 3, stats.meleeMax ?? 13);
                    const cleaveDealt = this._damageSummonEnemy(t, cleaveDmg);
                    this._addLog(`  ↪️ cleave hits ${this._eName(t)} for ${cleaveDealt}!`);
                    if (t.health <= 0) this._addLog(`${this._eName(t)} is defeated!`);
                }
            }
            return;
        }

        // ── Faerie Queen: Wrath of Nature ────────────────────────────────────
        if (m.summonType === 'faerie_queen') {
            const fqLvl      = stats.druidLevel || m.level || 1;
            const numTargets = Math.max(1, Math.floor(fqLvl / 4));
            const dmgPerHit  = randomInt(stats.magicMin ?? 5, stats.magicMax ?? 15);
            this._addLog(`\u{1F9DA}‍♀️ ${m.name} unleashes Wrath of Nature! (${numTargets} target${numTargets > 1 ? 's' : ''})`);

            const holdChance  = FAERIE_QUEEN_HOLD_BASE + Math.floor(fqLvl / 3) * FAERIE_QUEEN_HOLD_PER_3LV;
            const poisonFrac  = Math.min(2.0, FAERIE_QUEEN_POISON_FRAC_BASE + fqLvl * FAERIE_QUEEN_POISON_FRAC_PER_LV);
            // Shuffle alive targets; hit up to numTargets unique targets (recycle if fewer enemies)
            const shuffled = [...targets].sort(() => Math.random() - 0.5);
            for (let i = 0; i < numTargets; i++) {
                const t = shuffled[i % shuffled.length];
                if (!t || t.health <= 0) continue;
                const dealt   = this._damageSummonEnemy(t, dmgPerHit);
                const fqEName = this._eName(t);
                this._addLog(`  ↪️ ${fqEName} struck for ${dealt} magic damage!`);
                if (t.health <= 0) { this._addLog(`${fqEName} is defeated!`); continue; }

                // Hold (incorporeal immune)
                const fqTTags = Array.isArray((ENEMY_TYPES[t.type] || {}).tags) ? (ENEMY_TYPES[t.type].tags) : [];
                if (!fqTTags.includes('incorporeal') && Math.random() < holdChance) {
                    if (this._tryStunEnemy(t)) {
                        t.activeEffects = (t.activeEffects || []).filter(x => x.type !== 'fae_hold');
                        t.activeEffects.push({ type: 'fae_hold', rounds: 1 });
                        this._addLog(`\u{1F33F} ${fqEName} is held fast by fae magic! (2 rounds)`);
                    }
                }
                // Poison DoT: applies/refreshes per hit
                const poisonDmg = Math.max(1, Math.floor(dealt * poisonFrac));
                t.activeEffects = (t.activeEffects || []).filter(x => x.type !== 'fae_poison');
                t.activeEffects.push({ type: 'fae_poison', damage: poisonDmg, rounds: POISON_DURATION_ROUNDS });
                this._addLog(`\u{1F33F} ${fqEName} is poisoned by fae venom! (${poisonDmg} dmg/rd)`);
            }
            return;
        }

        const beastKind = stats.beastKind;

        if (beastKind === 'pixie') {
            const dmg = randomInt(stats.magicMin ?? 1, stats.magicMax ?? 3);
            const isPrincess = stats.upgradeName === 'pixie_princess';
            this._addLog(`\u{1F9DA}${isPrincess ? ' Pixie Princess' : ''} ${m.name} whirls a storm of faerie dust for ${dmg}!`);
            for (const e of targets) {
                this._damageSummonEnemy(e, dmg);
                if (e.health <= 0) this._addLog(`${this._eName(e)} is defeated!`);
            }
            return;
        }

        if (beastKind === 'eagle') {
            const t = targets[Math.floor(Math.random() * targets.length)];
            let dmg = randomInt(stats.rangedMin ?? 2, stats.rangedMax ?? 6);
            const ranger = this.party.find(p => p.id === m.summonerId);
            const baseCrit = ranger ? ranger.getRangedCritBonus() + RANGED_CRIT_CHANCE : RANGED_CRIT_CHANCE;
            const critChance = baseCrit + (stats.upgradeBonus || 0);
            const isCrit = Math.random() < critChance;
            if (isCrit) dmg *= 4;
            const dealt = this._damageSummonEnemy(t, dmg);
            const isGolden = stats.upgradeName === 'golden_eagle';
            this._addLog(`\u{1F985}${isGolden ? ' Golden Eagle' : ''} ${m.name} dives on ${this._eName(t)} for ${dealt}!${isCrit ? ' \u{1F4A5} CRIT! (4\u00D7)' : ''}`);
            if (t.health <= 0) this._addLog(`${this._eName(t)} is defeated!`);
            return;
        }

        if (beastKind === 'treant') {
            const t = targets[Math.floor(Math.random() * targets.length)];
            const dmg = randomInt(stats.meleeMin ?? 3, stats.meleeMax ?? 10);
            const dealt = this._damageSummonEnemy(t, dmg);
            const isElder = stats.upgradeName === 'elder_treant';
            this._addLog(`\u{1F333}${isElder ? ' Elder Treant' : ''} ${m.name} SLAMS ${this._eName(t)} with ancient branches for ${dealt}!`);
            if (t.health > 0) {
                // 33% base hold + any Elder Treant upgrade bonus; undead & incorporeal immune
                const tDef = ENEMY_TYPES[t.type] || {};
                const tTags = Array.isArray(tDef.tags) ? tDef.tags : [];
                const holdImmune = tTags.includes('undead') || tTags.includes('incorporeal');
                const holdChance = TREANT_HOLD_CHANCE + (stats.upgradeBonus || 0);
                if (!holdImmune && Math.random() < holdChance) {
                    if (this._tryStunEnemy(t))
                        this._addLog(`\u{1F333} ${this._eName(t)} is held fast by grasping roots!`);
                }
            }
            if (t.health <= 0) this._addLog(`${this._eName(t)} is defeated!`);
            return;
        }

        if (beastKind === 'wolf') {
            const t = targets[Math.floor(Math.random() * targets.length)];
            const dmg = randomInt(stats.meleeMin ?? 2, stats.meleeMax ?? 7);
            const dealt = this._damageSummonEnemy(t, dmg);
            this._addLog(`\u{1F43A} ${m.name} bites ${this._eName(t)} for ${dealt}!`);
            // Apply bleed: 100% of dealt damage per round for 3 rounds
            // Undead enemies are immune to bleeding
            const targetTags = (ENEMY_TYPES[t.type] || {}).tags || [];
            const isUndeadTarget = targetTags.includes('undead');
            if (t.health > 0 && dealt > 0 && !isUndeadTarget) {
                const bleedDmg = Math.max(1, Math.round(dealt * 1.0));
                t.activeEffects = t.activeEffects || [];
                t.activeEffects.push({ type: 'bleed', damage: bleedDmg, rounds: 3 });
                this._addLog(`\u{1F7E5} ${this._eName(t)} is Bleeding! (${bleedDmg}/round)`);
            }
            if (t.health <= 0) this._addLog(`${this._eName(t)} is defeated!`);
            return;
        }

        if (beastKind === 'bear') {
            const t = targets[Math.floor(Math.random() * targets.length)];
            const dmg = randomInt(stats.meleeMin ?? 2, stats.meleeMax ?? 8);
            const dealt = this._damageSummonEnemy(t, dmg);
            const isGiant = stats.upgradeName === 'giant_bear';
            this._addLog(`\u{1F43B}${isGiant ? ' Giant Bear' : ''} ${m.name} mauls ${this._eName(t)} for ${dealt}!${isGiant ? ' \u{1F4AA}' : ''}`);
            const ranger = this.party.find(p => p.id === m.summonerId);
            const baseStun = ranger ? RANGED_CRIT_CHANCE + ranger.getRangedCritBonus() : RANGED_CRIT_CHANCE;
            const stunChance = baseStun + (stats.upgradeBonus || 0);
            if (t.health > 0 && Math.random() < stunChance) {
                if (this._tryStunEnemy(t))
                    this._addLog(`\u26A1 ${this._eName(t)} is stunned!`);
            }
            if (t.health <= 0) this._addLog(`${this._eName(t)} is defeated!`);
            return;
        }

        // ── Death Knight: 5% HP regen at start of own turn ──────────────────
        if (m.summonType === 'death_knight' && m.health < m.maxHealth) {
            const regen = Math.max(1, Math.floor(m.maxHealth * 0.05));
            const before = m.health;
            m.health = Math.min(m.maxHealth, m.health + regen);
            const healed = m.health - before;
            if (healed > 0) this._addLog(`\u2620\uFE0F ${m.name} draws on dark energy and recovers ${healed} HP.`);
        }

        // ── Vampire: gaseous form — regenerate and skip attack until recovered ─
        if (m.summonType === 'vampire' && m.summonStats && m.summonStats.gaseousForm) {
            const regen = Math.max(1, Math.floor(m.maxHealth * 0.10));
            const before = m.health;
            m.health = Math.min(m.maxHealth, m.health + regen);
            const healed = m.health - before;
            if (healed > 0) this._addLog(`\u{1F32B}\uFE0F ${m.name} drifts in gaseous form, recovering ${healed} HP.`);
            if (m.health >= Math.ceil(m.maxHealth * 0.30)) {
                m.summonStats.gaseousForm = false;
                this._addLog(`\u{1F9DB} ${m.name} coalesces back into corporeal form!`);
            }
            return; // cannot attack while gaseous
        }

        // ── Undead / fallback: melee single-target ───────────────────────────
        // Spectre and Ghost are incorporeal — attacks phase through ALL armor.
        const isIncorporeal = m.summonType === 'spectre'
            || m.summonType === 'ghost'
            || (m.summonStats && m.summonStats.incorporeal);
        const t = targets[Math.floor(Math.random() * targets.length)];
        const dmg = randomInt(stats.meleeMin ?? 2, stats.meleeMax ?? 8);
        const dealt = isIncorporeal
            ? this._damageSummonEnemy(t, dmg, true)   // true = ignore armor/defense
            : this._damageSummonEnemy(t, dmg);
        if (isIncorporeal) {
            this._addLog(`\u{1F47B} ${m.name} phases through ${this._eName(t)}'s defences for ${dealt}!`);
        } else {
            this._addLog(`${m.name} strikes ${this._eName(t)} for ${dealt}!`);
        }

        // ── Ghoul: 40% paralysis chance ──────────────────────────────────────
        if (t.health > 0 && m.summonType === 'ghoul') {
            const tDef = ENEMY_TYPES[t.type] || {};
            const tTags = Array.isArray(tDef.tags) ? tDef.tags : [];
            const paralyzeImmune = tTags.includes('undead') || tTags.includes('incorporeal');
            if (!paralyzeImmune && Math.random() < GHOUL_PARALYZE_CHANCE) {
                if (this._tryStunEnemy(t))
                    this._addLog(`\u{1F9DF}\u200D\u2640\uFE0F ${this._eName(t)} is PARALYZED by the ghoul's touch!`);
            }
        }

        // ── Mummy: 33% stun + permanent Mummy Rot DoT ───────────────────────
        if (t.health > 0 && m.summonType === 'mummy') {
            const tDef = ENEMY_TYPES[t.type] || {};
            const tTags = Array.isArray(tDef.tags) ? tDef.tags : [];
            const mummyImmune = tTags.includes('undead') || tTags.includes('incorporeal');
            if (!mummyImmune) {
                if (Math.random() < 0.33) {
                    if (this._tryStunEnemy(t))
                        this._addLog(`\u{1F9DF}\u200D\u2642\uFE0F ${this._eName(t)} is STUNNED by the mummy's curse!`);
                }
                // Mummy Rot: permanent DoT at half the attack damage per round.
                // Re-applying refreshes the damage value but does not stack.
                t.activeEffects = (t.activeEffects || []).filter(x => x.type !== 'mummy_rot');
                const rotDmg = Math.max(1, Math.floor(dealt * 0.5));
                t.activeEffects.push({ type: 'mummy_rot', damage: rotDmg, rounds: 9999, permanent: true });
                this._addLog(`\u{1F7E4} ${this._eName(t)} is afflicted with Mummy Rot! (${rotDmg}/round, permanent)`);
            }
        }

        // ── Ghost: fear up to [necroLevel] enemies after each attack ─────────
        if (t.health > 0 && m.summonType === 'ghost') {
            const nl = (m.summonStats && m.summonStats.necroLevel) || m.level || 1;
            // Shuffle alive targets and try to fear up to nl of them.
            const fearCandidates = [...targets].sort(() => Math.random() - 0.5).slice(0, nl);
            for (const ft of fearCandidates) {
                if (ft.health <= 0) continue;
                const ftDef  = ENEMY_TYPES[ft.type] || {};
                const ftTags = Array.isArray(ftDef.tags) ? ftDef.tags : [];
                if (ftTags.includes('undead')) continue; // undead immune to fear
                if (Math.random() < 0.50) continue;     // 50% resist
                // Don't stack; already feared enemies keep existing debuff.
                const alreadyFeared = (ft.activeEffects || []).some(x => x.type === 'ghost_fear');
                if (!alreadyFeared) {
                    ft.activeEffects = ft.activeEffects || [];
                    ft.activeEffects.push({
                        type: 'ghost_fear',
                        damageBonus:  -3,
                        defenseBonus: -3,
                        rounds: 9999,
                        permanent: true,
                    });
                    this._addLog(`\u{1F628} ${this._eName(ft)} is SEIZED with Fear! (-3 atk / -3 def, until combat ends)`);
                }
            }
        }

        // ── Vampire: life drain — heal self for damage dealt (even on kill) ────
        if (dealt > 0 && m.summonType === 'vampire') {
            const before = m.health;
            m.health = Math.min(m.maxHealth, m.health + dealt);
            const healed = m.health - before;
            if (healed > 0) this._addLog(`\u{1F9DB} ${m.name} drains ${healed} HP from ${this._eName(t)}!`);
        }

        // ── Death Knight: stun chance + instakill non-boss ───────────────────
        if (t.health > 0 && m.summonType === 'death_knight') {
            const nl = (m.summonStats && m.summonStats.necroLevel) || m.level || 1;
            const tDef  = ENEMY_TYPES[t.type] || {};
            const tTags = Array.isArray(tDef.tags) ? tDef.tags : [];
            const dkStunImmune = tTags.includes('undead') || tTags.includes('incorporeal');
            if (!dkStunImmune && Math.random() < (0.33 + nl * 0.01)) {
                if (this._tryStunEnemy(t))
                    this._addLog(`\u2620\uFE0F ${this._eName(t)} is STUNNED by the Death Knight's strike!`);
            }
            const dkInstakillRoll = Math.random() < (0.02 + nl * 0.01);
            if (dkInstakillRoll) {
                if (t.isBoss || t.isMegaBoss) {
                    // Boss/mega-boss immune to instant death — x4 pre-defense damage instead
                    const dkBossDmg = Math.max(1, Math.round(dmg * 4));
                    const dkBossDealt = this._damageSummonEnemy(t, dkBossDmg);
                    this._addLog(`\u{1F480} ${m.name} attempts a death strike on ${this._eName(t)} — Boss resists! (x4: ${dkBossDealt} damage)`);
                    if (t.health <= 0) this._addLog(`${this._eName(t)} is defeated!`);
                } else {
                    t.health = 0;
                    this._addLog(`\u{1F480} ${m.name} performs a death strike — ${this._eName(t)} is SLAIN INSTANTLY!`);
                }
            }
        }

        if (t.health <= 0) this._addLog(`${this._eName(t)} is defeated!`);
    }

    // ────────────────────────────────────────────
    // Initiative helpers
    // ────────────────────────────────────────────

    /**
     * Roll initiative for a single participant.
     * Rogues, monks, and rangers get +1.
     */
    _rollInitiative(ref, kind) {
        const roll = randomInt(1, INITIATIVE_DIE);
        let bonus = 0;
        if (kind === 'party') {
            const classId = ref.classId;
            if (classId === 'rogue' || classId === 'monk' || classId === 'ranger') {
                bonus += 1;
                // Additional +1 per 5 levels beyond 1
                bonus += Math.floor((ref.level || 1) / 5);
            }
            // Haste song initiative bonus
            const hasteEffect = Array.isArray(ref.activeEffects)
                ? ref.activeEffects.find(e => e && e.type === 'bard_song_haste')
                : null;
            if (hasteEffect && typeof hasteEffect.initiativeBonus === 'number') {
                bonus += hasteEffect.initiativeBonus;
            }
        }
        return Math.max(1, roll + bonus);
    }

    /**
     * Build the sorted initiative order for the current combatants.
     * Returns array of slots sorted descending by initiative; ties broken randomly.
     */
    _buildInitiativeOrder() {
        const entries = [];
        for (const m of this.party) {
            if (m.health <= 0) continue;
            const init = this._rollInitiative(m, 'party');
            entries.push({ kind: 'party', ref: m, init, skipThisRound: false });
        }
        for (const e of this.enemies) {
            if (e.health <= 0) continue;
            const init = this._rollInitiative(e, 'enemy');
            entries.push({ kind: 'enemy', ref: e, init, skipThisRound: false });
        }
        entries.sort((a, b) => b.init - a.init || (Math.random() < 0.5 ? -1 : 1));
        return entries;
    }

    /**
     * Register a newly summoned member into the initiative order immediately
     * after the current turn slot, inheriting the caster's initiative value.
     * The summon acts this round (no skip). Only runs during active combat.
     */
    _registerNewSummon(member) {
        if (this.phase !== 'PLAYER_TURN' && this.phase !== 'ENEMY_TURN') return;
        if (!this._initiativeOrder.length) return;
        const casterSlot = this._initiativeOrder[this._initTurnIdx];
        const init = casterSlot ? casterSlot.init : this._rollInitiative(member, 'party');
        // Insert immediately after the current turn slot (and after any summons
        // already queued for the same summoner) so the creature acts this round.
        let insertIdx = this._initTurnIdx + 1;
        while (insertIdx < this._initiativeOrder.length) {
            const s = this._initiativeOrder[insertIdx];
            if (s.kind === 'party' && s.ref.isSummoned && s.ref.summonerId === member.summonerId) {
                insertIdx++;
            } else { break; }
        }
        this._initiativeOrder.splice(insertIdx, 0, { kind: 'party', ref: member, init, skipThisRound: false });
        this._addLog(`⚡ ${member.name} enters the fray — acts immediately!`);
    }

    // ────────────────────────────────────────────
    // Turn flow
    // ────────────────────────────────────────────

    /**
     * Start a new initiative round: reset defending, tick all effects,
     * then advance through the order.
     */
    _beginInitiativeRound() {
        this._logTarget = 'player';
        for (const m of this.party) m._defending = false;

        this._tickPartyEffects();
        this._checkFaerieQueenRevive();
        if (this.aliveParty.length === 0) {
            // If a necromancer's soul lingers in its phylactery, release it now.
            // The battle is still lost, but the necromancer survives post-combat
            // in normal form with minimal HP.
            const lichNecro = this.party.find(p => !p.isSummoned && p.lichPhial);
            if (lichNecro) {
                const reviveHp = Math.max(1, Math.floor(lichNecro.maxHealth * 0.10));
                lichNecro.health = reviveHp;
                lichNecro.lichPhial  = false;
                lichNecro.isLichForm = false;
                this._addLog(`\u{1F9F4} ${lichNecro.name}'s soul escapes the phylactery — they survive the defeat in mortal form (${reviveHp} HP).`);
            }
            this.phase = 'DEFEAT';
            this._addLog('--- Your party has been defeated! ---');
            this._notify();
            return;
        }

        this._logTarget = 'enemy';
        this._tickEnemyEffects();
        this._logTarget = 'player';
        if (this.aliveHostileEnemies.length === 0) {
            this._finishVictory();
            return;
        }

        this._initTurnIdx = 0;
        this._advanceThroughInitiative();
    }

    /**
     * Advance through the initiative order until we reach a player-controlled
     * member (pause for input) or a terminal phase (DEFEAT/VICTORY/etc.).
     * Enemy and summon turns execute automatically without pausing.
     */
    _advanceThroughInitiative() {
        while (this._initTurnIdx < this._initiativeOrder.length) {
            const slot = this._initiativeOrder[this._initTurnIdx];
            const ref  = slot.ref;

            // Skip dead participants.
            if (ref.health <= 0) { this._initTurnIdx++; continue; }

            // Skip summons that were created this round — they act next round.
            if (slot.skipThisRound) {
                slot.skipThisRound = false;
                this._initTurnIdx++;
                continue;
            }

            if (slot.kind === 'enemy') {
                // Boss monsters act multiple times per round:
                //   Mega Boss → 3 actions, Boss → 2 actions, others → 1.
                const actionCount = ref.isMegaBoss ? 3 : (ref.isBoss ? 2 : 1);
                if (actionCount > 1) {
                    const tier = ref.isMegaBoss ? 'MEGA BOSS' : 'BOSS';
                    this._addLog(`⚔️ ${this._eName(ref)} surges — ${tier} takes ${actionCount} actions this turn!`);
                }
                for (let _a = 0; _a < actionCount; _a++) {
                    if (ref.health <= 0) break;
                    this._executeOneEnemyTurn(ref);
                    if (this.phase === 'DEFEAT' || this.phase === 'FLED' || this.phase === 'VICTORY') return;
                    if (this.phase === 'NEED_PROMOTION') return;
                    if (this.aliveHostileEnemies.length === 0) { this._finishVictory(); return; }
                }
                this._initTurnIdx++;
                continue;
            }

            // Party member's turn.
            const m = ref;

            // Web-skip
            if (m.webbedRounds && m.webbedRounds > 0) {
                this._addLog(`\u{1F578}\uFE0F ${m.name} struggles against the webbing and cannot act! (${m.webbedRounds} rd left)`);
                m.webbedRounds--;
                this._initTurnIdx++;
                continue;
            }

            // Stun-skip (raging barbarians shrug off stun; warriors have level-based shrug)
            if (m.stunned) {
                if (m.classId === 'barbarian' && m.isRaging) {
                    this._addLog(`\u{1F534} ${m.name}'s rage burns through the stun!`);
                    m.stunned = false;
                    // Fall through — barbarian takes their normal turn
                } else if (m.classId === 'warrior') {
                    const shrugs = Math.min(0.95, (m.level || 1) * 0.02);
                    if (Math.random() < shrugs) {
                        this._addLog(`\u{1F6E1}️ ${m.name} shrugs off the stun through sheer willpower! (${Math.round(shrugs * 100)}%)`);
                        m.stunned = false;
                        // Fall through — warrior takes their normal turn
                    } else {
                        this._addLog(`${m.name} is stunned and cannot act!`);
                        m.stunned = false;
                        this._initTurnIdx++;
                        continue;
                    }
                } else {
                    this._addLog(`${m.name} is stunned and cannot act!`);
                    m.stunned = false;
                    this._initTurnIdx++;
                    continue;
                }
            }

            // Summoned AI auto-turn
            if (m.isSummoned) {
                this._addLog(`--- ${m.name}'s turn ---`);
                this._takeSummonTurn(m);
                if (this.aliveHostileEnemies.length === 0) { this._finishVictory(); return; }
                this._initTurnIdx++;
                continue;
            }

            // Human-controlled: set currentMemberIndex and wait for player input.
            this.currentMemberIndex = this.party.indexOf(m);
            this.phase = 'PLAYER_TURN';
            this._addLog(`--- Turn ${this.turnNumber}: ${m.name}'s turn ---`);
            this._notify();
            return;
        }

        // All slots exhausted — start a new round.
        this.turnNumber++;
        this._beginInitiativeRound();
    }

    _advancePlayerTurn() {
        this._logTarget = 'player';
        if (this.aliveHostileEnemies.length === 0) {
            this._finishVictory();
            return;
        }
        this._initTurnIdx++;
        this._advanceThroughInitiative();
    }

    /**
     * Execute a single enemy's turn. Handles stun-skip, AoE magic, and
     * melee/magic attacks with the level-3+ damage bonus.
     *
     * NEED_PROMOTION logic:
     *   Pre-attack (front already empty): sets phase, does NOT increment
     *     _initTurnIdx — the enemy will try again after promotion.
     *   Post-attack (front fell from this hit): pre-increments _initTurnIdx
     *     so the caller knows this slot is done before returning.
     */
    _executeOneEnemyTurn(e) {
        this._logTarget = 'enemy';
        const eName = this._eName(e);

        // Pre-attack check: can't attack without a front row.
        const liveFront = this.aliveFront;
        if (liveFront.length === 0) {
            if (this.aliveBack.length > 0) {
                this.phase = 'NEED_PROMOTION';
                this._addLog('\u26A0\uFE0F The front line has fallen! Promote a back-row ally forward.');
                this._notify();
                return;
            }
            this.phase = 'DEFEAT';
            this._addLog('--- Your party has been defeated! ---');
            this._notify();
            return;
        }

        // Charmed enemy: fights for the party this turn
        if (e.charmedRounds > 0) {
            this._charmedMonsterAttack(e);
            return;
        }

        // webbedRounds immunity for boss/mega-boss
        if (e.webbedRounds > 0 && (e.isBoss || e.isMegaBoss)) {
            this._addLog(`\u{1F451} ${eName} tears free from the immobilization!`);
            e.webbedRounds = 0;
        }

        // Stun resistance:
        //   Mega Boss — 80% chance to shrug off any stun / hold effect.
        //   Boss      — 50% chance.
        //   Others    — always stunned (lose turn).
        if (e.stunned) {
            e.stunned = false;
            const resistChance = e.isMegaBoss ? 0.80 : (e.isBoss ? 0.50 : 0);
            if (resistChance > 0 && Math.random() < resistChance) {
                const flavour = e.isMegaBoss ? 'with terrifying might' : 'with sheer force';
                this._addLog(`⚡ ${eName} resists the stun ${flavour}! (${Math.round(resistChance * 100)}% resist)`);
                // Fall through — boss still acts this turn.
            } else {
                this._addLog(`${eName} is stunned and cannot act!`);
                return;
            }
        }

        const dlvl = this.dungeonLevel;
        const lvlBoost      = Math.max(0, dlvl - 1);
        const lvlThreeBonus = Math.max(0, dlvl - (MONSTER_DAMAGE_BONUS_THRESHOLD - 1));
        const typeDef = ENEMY_TYPES[e.type] || {};

        // ── Drake: AoE fire breath (hits all, applies burn DoT) ──────────
        if (typeDef.aoeFire && e.mana >= MONSTER_MAGIC_MANA_COST) {
            e.mana -= MONSTER_MAGIC_MANA_COST;
            const dmin = MONSTER_MELEE_DAMAGE_MIN + MONSTER_DAMAGE_PER_LEVEL * lvlBoost + MONSTER_DAMAGE_BONUS_PER_LEVEL * lvlThreeBonus;
            const dmax = MONSTER_MELEE_DAMAGE_MAX + MONSTER_DAMAGE_PER_LEVEL * lvlBoost + MONSTER_DAMAGE_BONUS_PER_LEVEL * lvlThreeBonus;
            let dmg = randomInt(dmin, dmax);
            dmg = Math.max(1, Math.round(dmg * MONSTER_DAMAGE_MULTIPLIER));
            dmg = Math.max(1, dmg + this._getEnemyDamageMod(e, 'magic'));
            this._addLog(`\u{1F525} ${eName} unleashes a torrent of fire — the whole party is scorched!`);
            const aoeTargets = this.aliveParty.slice();
            for (const target of aoeTargets) {
                this._applyEnemyHit(e, target, dmg, 'magic', { aoe: true, fireBurn: true });
                if (this.aliveParty.length === 0) break;
            }

        // ── Water Elemental: AoE drowning surge — hits all, applies drowning DoT ──
        } else if (typeDef.aoeDrowning && e.mana >= MONSTER_MAGIC_MANA_COST) {
            e.mana -= MONSTER_MAGIC_MANA_COST;
            const dmin = MONSTER_MAGIC_DAMAGE_MIN + MONSTER_DAMAGE_PER_LEVEL * lvlBoost + MONSTER_DAMAGE_BONUS_PER_LEVEL * lvlThreeBonus;
            const dmax = MONSTER_MAGIC_DAMAGE_MAX + MONSTER_DAMAGE_PER_LEVEL * lvlBoost + MONSTER_DAMAGE_BONUS_PER_LEVEL * lvlThreeBonus;
            let dmg = randomInt(dmin, dmax);
            dmg = Math.max(1, Math.round(dmg * MONSTER_DAMAGE_MULTIPLIER));
            dmg = Math.max(1, dmg + this._getEnemyDamageMod(e, 'magic'));
            this._addLog(`\u{1F30A} ${eName} unleashes a surging torrent — the whole party is pulled under!`);
            const aoeTargets = this.aliveParty.slice();
            for (const target of aoeTargets) {
                this._applyEnemyHit(e, target, dmg, 'magic', { aoe: true, drowning: true, drowningDmg: dmg });
                if (this.aliveParty.length === 0) break;
            }

        // ── AoE magic (cultist etc.) path — hits all party members ───────
        } else if (typeDef.aoeMagic && e.mana >= MONSTER_MAGIC_MANA_COST) {
            e.mana -= MONSTER_MAGIC_MANA_COST;
            const dmin = MONSTER_MAGIC_DAMAGE_MIN + MONSTER_DAMAGE_PER_LEVEL * lvlBoost + MONSTER_DAMAGE_BONUS_PER_LEVEL * lvlThreeBonus;
            const dmax = MONSTER_MAGIC_DAMAGE_MAX + MONSTER_DAMAGE_PER_LEVEL * lvlBoost + MONSTER_DAMAGE_BONUS_PER_LEVEL * lvlThreeBonus;
            let dmg = randomInt(dmin, dmax);
            dmg = Math.max(1, Math.round(dmg * MONSTER_DAMAGE_MULTIPLIER));
            dmg = Math.max(1, dmg + this._getEnemyDamageMod(e, 'magic'));
            this._addLog(`\u{1F52E} ${eName} unleashes a roaring chant of dark power — the whole party is caught in the blast!`);
            const aoeTargets = this.aliveParty.slice();
            for (const target of aoeTargets) {
                this._applyEnemyHit(e, target, dmg, 'magic', { aoe: true });
                if (this.aliveParty.length === 0) break;
            }

        // ── Beholder: 6 random eye beams per turn ────────────────────────
        } else if (typeDef.isBeholderAI) {
            const beamCount = 6;
            const beamTypes = ['magic_blast', 'death_ray', 'stun_ray', 'anti_magic', 'petrify', 'slow_ray'];
            const dmin = MONSTER_MAGIC_DAMAGE_MIN + MONSTER_DAMAGE_PER_LEVEL * lvlBoost + MONSTER_DAMAGE_BONUS_PER_LEVEL * lvlThreeBonus;
            const dmax = MONSTER_MAGIC_DAMAGE_MAX + MONSTER_DAMAGE_PER_LEVEL * lvlBoost + MONSTER_DAMAGE_BONUS_PER_LEVEL * lvlThreeBonus;
            this._addLog(`\u{1F441}️ ${eName} opens all its eyes — eye beams lance across the battlefield!`);
            for (let bi = 0; bi < beamCount && this.aliveParty.length > 0; bi++) {
                const beam = beamTypes[Math.floor(Math.random() * beamTypes.length)];
                const anyAlive = this.aliveParty;
                const frontRow = this.aliveFront;
                let target;
                if (beam === 'magic_blast') {
                    // AoE magic blast
                    e.mana = Math.max(0, e.mana - MONSTER_MAGIC_MANA_COST);
                    let dmg = randomInt(dmin, dmax);
                    dmg = Math.max(1, Math.round(dmg * MONSTER_DAMAGE_MULTIPLIER));
                    this._addLog(`\u{1F4AB} Beholder: Magic Blast eye hits the whole party!`);
                    for (const t of anyAlive.slice()) {
                        this._applyEnemyHit(e, t, dmg, 'magic', { aoe: true });
                        if (this.aliveParty.length === 0) break;
                    }
                } else if (beam === 'death_ray') {
                    // Double damage, can hit back row — goes through _applyEnemyHit so intercept works
                    target = anyAlive[Math.floor(Math.random() * anyAlive.length)];
                    let dmg = randomInt(dmin, dmax) * 2;
                    dmg = Math.max(1, Math.round(dmg * MONSTER_DAMAGE_MULTIPLIER));
                    this._addLog(`\u{1F480} Beholder: Death Ray hits ${target.name} for ${dmg}!`);
                    this._applyEnemyHit(e, target, dmg, 'magic');
                } else if (beam === 'stun_ray') {
                    // Stun 1-3 rounds
                    target = frontRow.length > 0 ? frontRow[Math.floor(Math.random() * frontRow.length)] : anyAlive[Math.floor(Math.random() * anyAlive.length)];
                    if (this._tryApplyStun(target)) {
                        this._addLog(`⚡ Beholder: Stun Ray hits ${target.name}! (stunned)`);
                    }
                } else if (beam === 'anti_magic') {
                    // -10 magic, targets back row (debuff effect 2 rounds)
                    target = anyAlive[Math.floor(Math.random() * anyAlive.length)];
                    target.addEffect({ type: 'anti_magic_beam', damageBonus: -10, rounds: 2 });
                    this._addLog(`\u{1F52E} Beholder: Anti-Magic Ray hits ${target.name}! (-10 magic dmg for 2 rounds)`);
                } else if (beam === 'petrify') {
                    // Stun 3 rounds + +200 defense
                    target = frontRow.length > 0 ? frontRow[Math.floor(Math.random() * frontRow.length)] : anyAlive[Math.floor(Math.random() * anyAlive.length)];
                    if (Math.random() < 0.5) {
                        target.webbedRounds = Math.max(target.webbedRounds || 0, 3);
                        target.addEffect({ type: 'petrified', defenseBonus: 200, rounds: 3 });
                        this._addLog(`\u{1FAA8} Beholder: Petrify Ray hits ${target.name}! (locked 3 rounds, +200 def — turned to stone!)`);
                    } else {
                        this._addLog(`\u{1FAA8} Beholder: Petrify Ray misses ${target ? target.name : 'target'}!`);
                    }
                } else if (beam === 'slow_ray') {
                    // -level/2 melee and defense for front row target
                    target = frontRow.length > 0 ? frontRow[Math.floor(Math.random() * frontRow.length)] : anyAlive[Math.floor(Math.random() * anyAlive.length)];
                    const penalty = Math.max(1, Math.floor(dlvl / 2));
                    target.addEffect({ type: 'slow_ray', damageBonus: -penalty, defenseBonus: -penalty, rounds: 2 });
                    this._addLog(`\u{1F40C} Beholder: Slow Ray hits ${target.name}! (-${penalty} melee & defense for 2 rounds)`);
                }
            }

        // ── Dragon: 50% AoE breath / 50% 2 claws + bite ─────────────────
        } else if (typeDef.isDragonAI) {
            const dmin = MONSTER_MELEE_DAMAGE_MIN + MONSTER_DAMAGE_PER_LEVEL * lvlBoost + MONSTER_DAMAGE_BONUS_PER_LEVEL * lvlThreeBonus;
            const dmax = MONSTER_MELEE_DAMAGE_MAX + MONSTER_DAMAGE_PER_LEVEL * lvlBoost + MONSTER_DAMAGE_BONUS_PER_LEVEL * lvlThreeBonus;
            const bType = typeDef.dragonBreathType || 'fire';
            if (Math.random() < 0.50 && e.mana >= MONSTER_MAGIC_MANA_COST) {
                // Breath weapon AoE
                e.mana -= MONSTER_MAGIC_MANA_COST;
                const breathIcons = { fire: '\u{1F525}', acid: '\u{1F7E2}', lightning: '⚡', poison: '\u{1F922}', cold: '\u{1F9CA}' };
                const icon = breathIcons[bType] || '\u{1F525}';
                let dmg = randomInt(dmin, dmax);
                dmg = Math.max(1, Math.round(dmg * MONSTER_DAMAGE_MULTIPLIER));
                const breathVerbs = { fire: 'fire', acid: 'acid', lightning: 'lightning', cold: 'frost', poison: 'poison' };
                const breathVerb = breathVerbs[bType] || bType;
                this._addLog(`${icon} ${eName} exhales a ${breathVerb} breath weapon — the whole party is engulfed!`);
                const targets = this.aliveParty.slice();
                for (const t of targets) {
                    this._applyEnemyHit(e, t, dmg, 'magic', { aoe: true, dragonBreath: bType });
                    if (this.aliveParty.length === 0) break;
                }
            } else {
                // 2 claw attacks + 1 bite
                const attacks = [
                    { label: 'claw', times: 2 },
                    { label: 'bite', times: 1 },
                ];
                for (const atk of attacks) {
                    for (let ai = 0; ai < atk.times; ai++) {
                        if (this.aliveFront.length === 0 && this.aliveBack.length === 0) break;
                        const frontNow = this.aliveFront;
                        const tgt = frontNow.length > 0 ? frontNow[Math.floor(Math.random() * frontNow.length)] : this.aliveParty[0];
                        if (!tgt) break;
                        if (e.stamina < MONSTER_MELEE_STAMINA_COST) break;
                        e.stamina -= MONSTER_MELEE_STAMINA_COST;
                        let dmg = randomInt(dmin, dmax);
                        dmg = Math.max(1, Math.round(dmg * MONSTER_DAMAGE_MULTIPLIER));
                        dmg = Math.max(1, dmg + this._getEnemyDamageMod(e));
                        this._addLog(`\u{1F409} ${eName} ${atk.label}s ${tgt.name} for ${dmg}!`);
                        this._applyEnemyHit(e, tgt, dmg, 'melee');
                    }
                }
            }

        // ── Ettin: attacks twice (one per head) ──────────────────────────
        } else if (typeDef.isEttinAI) {
            const dmin = MONSTER_MELEE_DAMAGE_MIN + MONSTER_DAMAGE_PER_LEVEL * lvlBoost + MONSTER_DAMAGE_BONUS_PER_LEVEL * lvlThreeBonus;
            const dmax = MONSTER_MELEE_DAMAGE_MAX + MONSTER_DAMAGE_PER_LEVEL * lvlBoost + MONSTER_DAMAGE_BONUS_PER_LEVEL * lvlThreeBonus;
            this._addLog(`\u{1F9CC} ${eName} swings both clubs with its two heads!`);
            for (let hi = 0; hi < 2; hi++) {
                if (this.aliveFront.length === 0) break;
                const target = this.aliveFront[Math.floor(Math.random() * this.aliveFront.length)];
                if (e.stamina < MONSTER_MELEE_STAMINA_COST) break;
                e.stamina -= MONSTER_MELEE_STAMINA_COST;
                let dmg = randomInt(dmin, dmax);
                dmg = Math.max(1, Math.round(dmg * MONSTER_DAMAGE_MULTIPLIER));
                dmg = Math.max(1, dmg + this._getEnemyDamageMod(e));
                this._applyEnemyHit(e, target, dmg, 'melee');
            }

        // ── Fire Giant: melee+10, 2 attacks, fire DoT ────────────────────
        } else if (typeDef.isFireGiantAI) {
            const bonus = 10;
            const dmin = MONSTER_MELEE_DAMAGE_MIN + bonus + MONSTER_DAMAGE_PER_LEVEL * lvlBoost + MONSTER_DAMAGE_BONUS_PER_LEVEL * lvlThreeBonus;
            const dmax = MONSTER_MELEE_DAMAGE_MAX + bonus + MONSTER_DAMAGE_PER_LEVEL * lvlBoost + MONSTER_DAMAGE_BONUS_PER_LEVEL * lvlThreeBonus;
            this._addLog(`\u{1F525} ${eName} hammers with blazing strikes!`);
            for (let hi = 0; hi < 2; hi++) {
                if (this.aliveFront.length === 0) break;
                const target = this.aliveFront[Math.floor(Math.random() * this.aliveFront.length)];
                if (e.stamina < MONSTER_MELEE_STAMINA_COST) break;
                e.stamina -= MONSTER_MELEE_STAMINA_COST;
                let dmg = randomInt(dmin, dmax);
                dmg = Math.max(1, Math.round(dmg * MONSTER_DAMAGE_MULTIPLIER));
                dmg = Math.max(1, dmg + this._getEnemyDamageMod(e));
                this._applyEnemyHit(e, target, dmg, 'melee', { fireBurn: true });
            }

        // ── Ice Giant: melee+10, 2 attacks, ice DoT ──────────────────────
        } else if (typeDef.isIceGiantAI) {
            const bonus = 10;
            const dmin = MONSTER_MELEE_DAMAGE_MIN + bonus + MONSTER_DAMAGE_PER_LEVEL * lvlBoost + MONSTER_DAMAGE_BONUS_PER_LEVEL * lvlThreeBonus;
            const dmax = MONSTER_MELEE_DAMAGE_MAX + bonus + MONSTER_DAMAGE_PER_LEVEL * lvlBoost + MONSTER_DAMAGE_BONUS_PER_LEVEL * lvlThreeBonus;
            this._addLog(`\u{1F9CA} ${eName} pounds with glacial force!`);
            for (let hi = 0; hi < 2; hi++) {
                if (this.aliveFront.length === 0) break;
                const target = this.aliveFront[Math.floor(Math.random() * this.aliveFront.length)];
                if (e.stamina < MONSTER_MELEE_STAMINA_COST) break;
                e.stamina -= MONSTER_MELEE_STAMINA_COST;
                let dmg = randomInt(dmin, dmax);
                dmg = Math.max(1, Math.round(dmg * MONSTER_DAMAGE_MULTIPLIER));
                dmg = Math.max(1, dmg + this._getEnemyDamageMod(e));
                const dealt = Math.max(1, dmg - target.getArmorBlocking() - target.getTotalDefense());
                this._applyEnemyHit(e, target, dmg, 'melee');
                // Ice DoT: 50% of damage dealt
                if (target.health > 0) {
                    const iceTick = Math.max(1, Math.floor(dealt * 0.5));
                    target.addEffect({ type: 'ice_chill', damageBonus: -2, rounds: 2 });
                    target.health = Math.max(0, target.health - iceTick);
                    this._addLog(`\u{1F9CA} ${target.name} is chilled by the icy blow! (${iceTick} cold DoT)`);
                }
            }

        // ── Stone Giant: ranged+10, throws boulders twice ────────────────
        } else if (typeDef.isStoneGiantAI) {
            const bonus = 10;
            const dmin = MONSTER_MELEE_DAMAGE_MIN + bonus + MONSTER_DAMAGE_PER_LEVEL * lvlBoost + MONSTER_DAMAGE_BONUS_PER_LEVEL * lvlThreeBonus;
            const dmax = MONSTER_MELEE_DAMAGE_MAX + bonus + MONSTER_DAMAGE_PER_LEVEL * lvlBoost + MONSTER_DAMAGE_BONUS_PER_LEVEL * lvlThreeBonus;
            this._addLog(`\u{1FAA8} ${eName} hurls massive boulders!`);
            const anyAlive = this.aliveParty;
            for (let hi = 0; hi < 2; hi++) {
                if (anyAlive.length === 0) break;
                const target = anyAlive[Math.floor(Math.random() * anyAlive.length)];
                if (e.stamina < MONSTER_MELEE_STAMINA_COST) break;
                e.stamina -= MONSTER_MELEE_STAMINA_COST;
                let dmg = randomInt(dmin, dmax);
                dmg = Math.max(1, Math.round(dmg * MONSTER_DAMAGE_MULTIPLIER));
                dmg = Math.max(1, dmg + this._getEnemyDamageMod(e));
                this._applyEnemyHit(e, target, dmg, 'melee');
            }

        // ── Storm Giant: lightning bolt hits 3 random back row ───────────
        } else if (typeDef.isStormGiantAI && e.mana >= MONSTER_MAGIC_MANA_COST) {
            e.mana -= MONSTER_MAGIC_MANA_COST;
            const bonus = 10;
            const dmin = MONSTER_MAGIC_DAMAGE_MIN + bonus + MONSTER_DAMAGE_PER_LEVEL * lvlBoost + MONSTER_DAMAGE_BONUS_PER_LEVEL * lvlThreeBonus;
            const dmax = MONSTER_MAGIC_DAMAGE_MAX + bonus + MONSTER_DAMAGE_PER_LEVEL * lvlBoost + MONSTER_DAMAGE_BONUS_PER_LEVEL * lvlThreeBonus;
            this._addLog(`⚡ ${eName} calls down lightning on the party!`);
            const anyAlive = this.aliveParty.slice();
            const targets = [];
            for (let ti = 0; ti < 3; ti++) {
                if (anyAlive.length > 0) targets.push(anyAlive[Math.floor(Math.random() * anyAlive.length)]);
            }
            for (const target of targets) {
                if (this.aliveParty.length === 0) break;
                let dmg = randomInt(dmin, dmax);
                dmg = Math.max(1, Math.round(dmg * MONSTER_DAMAGE_MULTIPLIER));
                dmg = Math.max(1, dmg + this._getEnemyDamageMod(e, 'magic'));
                this._applyEnemyHit(e, target, dmg, 'magic');
                // 25% stun per bolt
                if (target.health > 0 && Math.random() < 0.25) {
                    if (this._tryApplyStun(target)) {
                        this._addLog(`⚡ ${target.name} is stunned by the lightning!`);
                    }
                }
            }

        // ── Medusa: 3 poison arrows + 50% petrify attempt ────────────────
        } else if (typeDef.isMedusaAI) {
            const dmin = MONSTER_MELEE_DAMAGE_MIN + MONSTER_DAMAGE_PER_LEVEL * lvlBoost + MONSTER_DAMAGE_BONUS_PER_LEVEL * lvlThreeBonus;
            const dmax = MONSTER_MELEE_DAMAGE_MAX + MONSTER_DAMAGE_PER_LEVEL * lvlBoost + MONSTER_DAMAGE_BONUS_PER_LEVEL * lvlThreeBonus;
            this._addLog(`\u{1F3F9} ${eName} looses a volley of envenomed arrows!`);
            const anyAlive = this.aliveParty;
            for (let ai = 0; ai < 3 && anyAlive.length > 0; ai++) {
                const target = anyAlive[Math.floor(Math.random() * anyAlive.length)];
                if (e.stamina < MONSTER_MELEE_STAMINA_COST) break;
                e.stamina -= MONSTER_MELEE_STAMINA_COST;
                let dmg = randomInt(dmin, dmax);
                dmg = Math.max(1, Math.round(dmg * MONSTER_DAMAGE_MULTIPLIER));
                dmg = Math.max(1, dmg + this._getEnemyDamageMod(e));
                this._applyEnemyHit(e, target, dmg, 'melee', { poisonChance: 0.40 });
                if (target.health > 0 && Math.random() < 0.40) {
                    const perTick = Math.max(1, Math.floor(dmg * 0.33));
                    target.addEffect({ type: 'poison', rounds: 3, damage: perTick });
                    this._addLog(`\u{1F7E2} ${target.name} is poisoned by Medusa's arrow!`);
                }
            }
            // Petrify attempt
            if (Math.random() < 0.50 && anyAlive.length > 0) {
                const frontRow = this.aliveFront;
                const petrifyTarget = frontRow.length > 0 ? frontRow[Math.floor(Math.random() * frontRow.length)] : anyAlive[Math.floor(Math.random() * anyAlive.length)];
                if (Math.random() < 0.50) {
                    this._tryApplyStun(petrifyTarget); // stun resist may block the stunned flag only
                    petrifyTarget.webbedRounds = Math.max(petrifyTarget.webbedRounds || 0, 3);
                    petrifyTarget.addEffect({ type: 'petrified', defenseBonus: 200, rounds: 3 });
                    this._addLog(`\u{1FAA8} ${eName} meets ${petrifyTarget.name}'s gaze — PETRIFIED! (3 rounds, +200 def)`);
                } else {
                    this._addLog(`\u{1FAA8} ${eName} attempts to petrify ${petrifyTarget.name}, but they avert their eyes!`);
                }
            }

        // ── Hydra: attacks with each head, regen already handled by regenPercent ──
        } else if (typeDef.isHydraAI) {
            const dmin = MONSTER_MELEE_DAMAGE_MIN + MONSTER_DAMAGE_PER_LEVEL * lvlBoost + MONSTER_DAMAGE_BONUS_PER_LEVEL * lvlThreeBonus;
            const dmax = MONSTER_MELEE_DAMAGE_MAX + MONSTER_DAMAGE_PER_LEVEL * lvlBoost + MONSTER_DAMAGE_BONUS_PER_LEVEL * lvlThreeBonus;
            const headCount = 6 + Math.floor(dlvl / 5);
            this._addLog(`\u{1F40D} ${eName} attacks with ${headCount} heads!`);
            for (let hi = 0; hi < headCount && this.aliveFront.length > 0; hi++) {
                const target = this.aliveFront[Math.floor(Math.random() * this.aliveFront.length)];
                if (e.stamina < MONSTER_MELEE_STAMINA_COST) { e.stamina = Math.min(e.maxStamina || 30, e.stamina + 2); continue; }
                e.stamina -= MONSTER_MELEE_STAMINA_COST;
                let dmg = randomInt(dmin, dmax);
                dmg = Math.max(1, Math.round(dmg * MONSTER_DAMAGE_MULTIPLIER));
                dmg = Math.max(1, dmg + this._getEnemyDamageMod(e));
                this._applyEnemyHit(e, target, dmg, 'melee');
                if (this.aliveFront.length === 0) break;
            }

        // ── Manticore: 5 ranged attacks, poison tail DoT ─────────────────
        } else if (typeDef.isManticoreAI) {
            const bonus = 3;
            const dmin = MONSTER_MELEE_DAMAGE_MIN + bonus + MONSTER_DAMAGE_PER_LEVEL * lvlBoost + MONSTER_DAMAGE_BONUS_PER_LEVEL * lvlThreeBonus;
            const dmax = MONSTER_MELEE_DAMAGE_MAX + bonus + MONSTER_DAMAGE_PER_LEVEL * lvlBoost + MONSTER_DAMAGE_BONUS_PER_LEVEL * lvlThreeBonus;
            this._addLog(`\u{1F981} ${eName} launches a volley of venomous spikes!`);
            const anyAlive = this.aliveParty;
            for (let ai = 0; ai < 5 && anyAlive.length > 0; ai++) {
                const target = anyAlive[Math.floor(Math.random() * anyAlive.length)];
                if (e.stamina < MONSTER_MELEE_STAMINA_COST) break;
                e.stamina -= MONSTER_MELEE_STAMINA_COST;
                let dmg = randomInt(dmin, dmax);
                dmg = Math.max(1, Math.round(dmg * MONSTER_DAMAGE_MULTIPLIER));
                dmg = Math.max(1, dmg + this._getEnemyDamageMod(e));
                const dealt = Math.max(1, dmg - target.getArmorBlocking() - target.getTotalDefense());
                this._applyEnemyHit(e, target, dmg, 'melee');
                // Poison tail: DoT = damage dealt
                if (target.health > 0) {
                    target.addEffect({ type: 'poison', rounds: 3, damage: Math.max(1, Math.floor(dealt / 3)) });
                    this._addLog(`\u{1F7E2} ${target.name} is stung by the manticore's poisonous tail spike!`);
                }
            }

        // ── Evil Priest: mass heal or AoE magic ──────────────────────────
        } else if (typeDef.isEvilPriestAI) {
            const dmin = MONSTER_MAGIC_DAMAGE_MIN + MONSTER_DAMAGE_PER_LEVEL * lvlBoost + MONSTER_DAMAGE_BONUS_PER_LEVEL * lvlThreeBonus;
            const dmax = MONSTER_MAGIC_DAMAGE_MAX + MONSTER_DAMAGE_PER_LEVEL * lvlBoost + MONSTER_DAMAGE_BONUS_PER_LEVEL * lvlThreeBonus;
            if (Math.random() < 0.50) {
                // Mass heal all living non-undead enemies
                const healPct = 0.15;
                this._addLog(`\u{1F4FF} ${eName} invokes dark blessing — enemies are healed!`);
                for (const ally of this.enemies) {
                    if (ally.health <= 0) continue;
                    const def = ENEMY_TYPES[ally.type] || {};
                    if ((def.tags || []).includes('undead')) continue;
                    const healAmt = Math.max(1, Math.floor(ally.maxHealth * healPct));
                    const before = ally.health;
                    ally.health = Math.min(ally.maxHealth, ally.health + healAmt);
                    if (ally.health > before) {
                        this._addLog(`\u{1F4AB} ${ally.name || ally.type} is healed for ${ally.health - before} HP!`);
                    }
                }
            } else if (e.mana >= MONSTER_MAGIC_MANA_COST) {
                e.mana -= MONSTER_MAGIC_MANA_COST;
                let dmg = randomInt(dmin, dmax);
                dmg = Math.max(1, Math.round(dmg * MONSTER_DAMAGE_MULTIPLIER));
                dmg = Math.max(1, dmg + this._getEnemyDamageMod(e, 'magic'));
                this._addLog(`\u{1F52E} ${eName} channels dark power — a wave of unholy energy hits the party!`);
                for (const target of this.aliveParty.slice()) {
                    this._applyEnemyHit(e, target, dmg, 'magic', { aoe: true });
                    if (this.aliveParty.length === 0) break;
                }
            }

        // ── Werewolf: regen handled by regenPercent; does standard melee ─
        } else if (typeDef.isWerewolfAI) {
            // Werewolf regen is handled by regenPercent:0.25 in _tickEnemyEffects.
            // In combat it does a powerful standard melee attack.
            const target = this.aliveFront.length > 0 ? this.aliveFront[Math.floor(Math.random() * this.aliveFront.length)] : null;
            if (target && e.stamina >= MONSTER_MELEE_STAMINA_COST) {
                e.stamina -= MONSTER_MELEE_STAMINA_COST;
                const dmin = MONSTER_MELEE_DAMAGE_MIN + MONSTER_DAMAGE_PER_LEVEL * lvlBoost + MONSTER_DAMAGE_BONUS_PER_LEVEL * lvlThreeBonus;
                const dmax = MONSTER_MELEE_DAMAGE_MAX + MONSTER_DAMAGE_PER_LEVEL * lvlBoost + MONSTER_DAMAGE_BONUS_PER_LEVEL * lvlThreeBonus;
                let dmg = randomInt(dmin, dmax);
                dmg = Math.max(1, Math.round(dmg * MONSTER_DAMAGE_MULTIPLIER));
                dmg = Math.max(1, dmg + this._getEnemyDamageMod(e));
                this._addLog(`\u{1F43A} ${eName} lunges with savage fury at ${target.name}!`);
                this._applyEnemyHit(e, target, dmg, 'melee');
            }

        // ── Yeti: two fist attacks + stun + ice DoT ──────────────────────
        } else if (typeDef.isYetiAI) {
            const dmin = MONSTER_MELEE_DAMAGE_MIN + MONSTER_DAMAGE_PER_LEVEL * lvlBoost + MONSTER_DAMAGE_BONUS_PER_LEVEL * lvlThreeBonus;
            const dmax = MONSTER_MELEE_DAMAGE_MAX + MONSTER_DAMAGE_PER_LEVEL * lvlBoost + MONSTER_DAMAGE_BONUS_PER_LEVEL * lvlThreeBonus;
            this._addLog(`☃️ ${eName} slams with both fists!`);
            for (let hi = 0; hi < 2; hi++) {
                if (this.aliveFront.length === 0) break;
                const target = this.aliveFront[Math.floor(Math.random() * this.aliveFront.length)];
                if (e.stamina < MONSTER_MELEE_STAMINA_COST) break;
                e.stamina -= MONSTER_MELEE_STAMINA_COST;
                let dmg = randomInt(dmin, dmax);
                dmg = Math.max(1, Math.round(dmg * MONSTER_DAMAGE_MULTIPLIER));
                dmg = Math.max(1, dmg + this._getEnemyDamageMod(e));
                const dealt = Math.max(1, dmg - target.getArmorBlocking() - target.getTotalDefense());
                this._applyEnemyHit(e, target, dmg, 'melee');
                // Ice DoT on each hit
                if (target.health > 0) {
                    const iceTick = Math.max(1, Math.floor(dealt * 0.33));
                    target.health = Math.max(0, target.health - iceTick);
                    target.addEffect({ type: 'ice_chill', damageBonus: -2, rounds: 2 });
                    this._addLog(`\u{1F9CA} ${target.name} is frozen by the yeti's icy fists! (${iceTick} cold)`);
                }
            }

        // ── Imp: single ranged attack targeting any row ───────────────────
        } else if (typeDef.rangedAny && e.stamina >= MONSTER_MELEE_STAMINA_COST) {
            e.stamina -= MONSTER_MELEE_STAMINA_COST;
            // Pick a random living party member from *any* row
            const anyAlive = this.aliveParty;
            const target = anyAlive[Math.floor(Math.random() * anyAlive.length)];
            const dmin = MONSTER_MELEE_DAMAGE_MIN + MONSTER_DAMAGE_PER_LEVEL * lvlBoost + MONSTER_DAMAGE_BONUS_PER_LEVEL * lvlThreeBonus;
            const dmax = MONSTER_MELEE_DAMAGE_MAX + MONSTER_DAMAGE_PER_LEVEL * lvlBoost + MONSTER_DAMAGE_BONUS_PER_LEVEL * lvlThreeBonus;
            let dmg = randomInt(dmin, dmax);
            dmg = Math.max(1, Math.round(dmg * MONSTER_DAMAGE_MULTIPLIER));
            dmg = Math.max(1, dmg + this._getEnemyDamageMod(e, 'magic'));
            this._addLog(`\u{1F47F} ${eName} hurls a bolt of hellfire at ${target.name}!`);
            this._applyEnemyHit(e, target, dmg, 'magic');

        } else {
            // ── Earth Elemental: earthquake AOE (50% chance to quake instead of single hit) ──
            if (typeDef.earthquakeChance && Math.random() < typeDef.earthquakeChance
                    && e.stamina >= MONSTER_MELEE_STAMINA_COST) {
                e.stamina -= MONSTER_MELEE_STAMINA_COST;
                const dmin = MONSTER_MELEE_DAMAGE_MIN + MONSTER_DAMAGE_PER_LEVEL * lvlBoost + MONSTER_DAMAGE_BONUS_PER_LEVEL * lvlThreeBonus;
                const dmax = MONSTER_MELEE_DAMAGE_MAX + MONSTER_DAMAGE_PER_LEVEL * lvlBoost + MONSTER_DAMAGE_BONUS_PER_LEVEL * lvlThreeBonus;
                let dmg = randomInt(dmin, dmax);
                dmg = Math.max(1, Math.round(dmg * MONSTER_DAMAGE_MULTIPLIER));
                dmg = Math.max(1, dmg + this._getEnemyDamageMod(e));
                this._addLog(`\u{1FAA8} ${eName} SLAMS the ground — a violent earthquake rocks the entire party!`);
                const aoeTargets = this.aliveParty.slice();
                for (const target of aoeTargets) {
                    this._applyEnemyHit(e, target, dmg, 'melee', { aoe: true });
                    if (this.aliveParty.length === 0) break;
                }
            } else {
            // ── Ghost: phase-strike melee (ignores armor) ─────────────────
            const target = liveFront[Math.floor(Math.random() * liveFront.length)];
            if (e.stamina >= MONSTER_MELEE_STAMINA_COST) {
                e.stamina -= MONSTER_MELEE_STAMINA_COST;
                const dmin = MONSTER_MELEE_DAMAGE_MIN + MONSTER_DAMAGE_PER_LEVEL * lvlBoost + MONSTER_DAMAGE_BONUS_PER_LEVEL * lvlThreeBonus;
                const dmax = MONSTER_MELEE_DAMAGE_MAX + MONSTER_DAMAGE_PER_LEVEL * lvlBoost + MONSTER_DAMAGE_BONUS_PER_LEVEL * lvlThreeBonus;
                let dmg = randomInt(dmin, dmax);
                dmg = Math.max(1, Math.round(dmg * MONSTER_DAMAGE_MULTIPLIER));
                dmg = Math.max(1, dmg + this._getEnemyDamageMod(e));
                this._applyEnemyHit(e, target, dmg, 'melee', { phaseStrike: typeDef.phaseStrike });
            } else if (e.mana >= MONSTER_MAGIC_MANA_COST) {
                e.mana -= MONSTER_MAGIC_MANA_COST;
                const dmin = MONSTER_MAGIC_DAMAGE_MIN + MONSTER_DAMAGE_PER_LEVEL * lvlBoost + MONSTER_DAMAGE_BONUS_PER_LEVEL * lvlThreeBonus;
                const dmax = MONSTER_MAGIC_DAMAGE_MAX + MONSTER_DAMAGE_PER_LEVEL * lvlBoost + MONSTER_DAMAGE_BONUS_PER_LEVEL * lvlThreeBonus;
                let dmg = randomInt(dmin, dmax);
                dmg = Math.max(1, Math.round(dmg * MONSTER_DAMAGE_MULTIPLIER));
                dmg = Math.max(1, dmg + this._getEnemyDamageMod(e, 'magic'));
                this._applyEnemyHit(e, target, dmg, 'magic');
            } else {
                this._applyEnemyHit(e, target, 1, 'weak');
            }
            } // end inner earthquake else
        }

        // Mega-boss: 33% chance per turn to summon a normal copy of itself
        if (e.isMegaBoss && this.aliveParty.length > 0 && Math.random() < 0.33) {
            this._megaBossSummonMinion(e);
        }

        // Post-attack checks.
        if (this.aliveParty.length === 0) {
            this.phase = 'DEFEAT';
            this._addLog('--- Your party has been defeated! ---');
            this._notify();
            return;
        }

        // If the front row just fell from this attack, bump past this slot
        // so promoteToFront resumes at the next enemy / party slot.
        if (this.aliveFront.length === 0 && this.aliveBack.length > 0) {
            this._initTurnIdx++;
            this.phase = 'NEED_PROMOTION';
            this._addLog('\u26A0\uFE0F The front line has fallen! Promote a back-row ally forward.');
            this._notify();
        }
    }

    /**
     * Apply a single incoming hit to a party member, handling dodge / shield /
     * defense / defending / poison / stun. `attackKind` in {'melee','magic','weak'}
     * controls flavour text and which secondary effects trigger.
     */
    _applyEnemyHit(e, target, rawDmg, attackKind, opts = {}) {
        const eName = this._eName(e);
        const typeDef = ENEMY_TYPES[e.type] || {};

        // ── Armor special quality: AoE Ward (applies before mitigation) ───────
        // +4 armor → 10%, +5 → 20%, +6 → 30%, +7 → 40% reduction to AoE hits.
        if (opts.aoe && !target.isSummoned) {
            const armorEnch = target.equipmentEnchants && target.equipmentEnchants.armor;
            if (armorEnch && armorEnch.aoeWard && armorEnch.level >= 4) {
                const reducePct = 0.10 * (armorEnch.level - 3);
                rawDmg = Math.max(1, Math.floor(rawDmg * (1 - reducePct)));
            }
        }

        // Vampire gaseous form: completely immune to all incoming damage.
        if (target.isSummoned
            && target.summonType === 'vampire'
            && target.summonStats
            && target.summonStats.gaseousForm) {
            this._addLog(`\u{1F32B}\uFE0F ${eName}'s attack passes harmlessly through ${target.name}'s gaseous form!`);
            return;
        }

        // ── Warrior L20 Defend Mode: intercept check ────────────────────────────
        // A warrior in defend mode rolls their augmented shield block chance to
        // intercept any attack aimed at another party member. The warrior takes
        // 10% of post-defense damage; the original target is unharmed.
        if (target.health > 0) {
            const interceptors = this.party.filter(w => w !== target && w.canIntercept && w.canIntercept());
            for (const warrior of interceptors) {
                const interceptChance = warrior.getAugmentedShieldBlock();
                if (interceptChance > 0 && Math.random() < interceptChance) {
                    const warriorArmor = warrior.getArmorBlocking();
                    const warriorDef   = warrior.getTotalDefense() + this._getSummonDefenseBonus(warrior);
                    const postDef      = Math.max(1, rawDmg - warriorArmor - warriorDef);
                    const interceptDmg = Math.max(1, Math.floor(postDef * WARRIOR_INTERCEPT_DAMAGE_MULT));
                    warrior.health = Math.max(0, warrior.health - interceptDmg);
                    this._addLog(`\u{1F6E1}\uFE0F ${warrior.name} intercepts the blow aimed at ${target.name} and absorbs ${interceptDmg} damage!`);
                    if (warrior.health <= 0) {
                        this._addLog(`${warrior.name} has fallen protecting their allies!`);
                        warrior.isDefendMode = false;
                    }
                    return;
                }
            }
        }

        // ── Mage L20: Mirror Image absorbs any hit ───────────────────────────────
        if (!target.isSummoned && target.mirrorImages && target.mirrorImages > 0 && target.health > 0) {
            target.mirrorImages--;
            this._addLog(`🪞 A Mirror Image of ${target.name} absorbs the blow and shatters! (${target.mirrorImages} remaining)`);
            return;
        }

        // Monk dodge (melee only — matches prior behaviour). Capped at MONK_DODGE_MAX.
        const monkDodgePct = target.getEffectiveDodgePct(); // 0 for non-monks
        if (attackKind === 'melee'
            && monkDodgePct > 0
            && target.stamina >= MONK_DODGE_STAMINA_COST
            && target.mana >= MONK_DODGE_MANA_COST
            && Math.random() < monkDodgePct) {
            target.stamina -= MONK_DODGE_STAMINA_COST;
            target.mana    -= MONK_DODGE_MANA_COST;
            this._addLog(`\u{1F343} ${target.name} dodges ${eName}'s attack!`);
            return;
        }

        // Shield block (melee/ranged only — magic bypasses)
        if (attackKind === 'melee' && !opts.phaseStrike) {
            const shieldChance = target.getShieldBlockChance();
            if (shieldChance > 0 && Math.random() < shieldChance) {
                this._addLog(`\u{1F6E1}\uFE0F ${target.name}'s shield blocks ${eName}'s attack!`);
                return;
            }
        }

        // Death Knight: 25% chance to block any incoming melee attack.
        if (attackKind === 'melee'
            && target.isSummoned
            && target.summonType === 'death_knight'
            && Math.random() < 0.25) {
            this._addLog(`\u2620\uFE0F ${target.name} blocks the blow with their spectral shield!`);
            return;
        }

        // Pixie / Pixie Princess dodge — chance equals summoner's ranged crit
        // plus any upgrade bonus stored in summonStats.upgradeBonus.
        if (target.isSummoned
            && target.summonStats
            && target.summonStats.beastKind === 'pixie') {
            const summoner = this.party.find(p => p.id === target.summonerId);
            const baseDodge = summoner
                ? RANGED_CRIT_CHANCE + summoner.getRangedCritBonus()
                : RANGED_CRIT_CHANCE;
            const dodgeChance = baseDodge + (target.summonStats.upgradeBonus || 0);
            if (Math.random() < dodgeChance) {
                const label = target.summonStats.upgradeName === 'pixie_princess'
                    ? '\u{1F9DA}✨ Pixie Princess'
                    : '\u{1F9DA}';
                this._addLog(`${label} ${target.name} flits away — evades the attack!`);
                return;
            }
        }

        // Ghost phaseStrike — bypasses armor and innate defense entirely.
        const armorBlock = opts.phaseStrike ? 0 : target.getArmorBlocking();
        const innateDef  = opts.phaseStrike ? 0
            : target.getTotalDefense() + this._getSummonDefenseBonus(target);

        if (opts.phaseStrike) {
            this._addLog(`\u{1F47B} ${eName} phases through ${target.name}'s defences!`);
        }

        let dmg = rawDmg;
        if (target._defending) dmg = Math.max(1, Math.floor(dmg / 2));
        dmg = Math.max(1, dmg - armorBlock - innateDef);
        // Barbarian rage halves all incoming damage
        if (target.classId === 'barbarian' && target.isRaging) {
            dmg = Math.max(1, Math.floor(dmg / 2));
        }

        // Phase 8 rule 6: monks reduce all incoming damage by their current
        // dodge %, even when the dodge roll failed (or wasn't eligible). This
        // compensates for their cloth-only / no-shield restrictions.
        // Rule: the passive reduction is also suspended when the monk has no
        // stamina OR no mana — they're too exhausted to flow with the blow.
        if (monkDodgePct > 0 && target.stamina > 0 && target.mana > 0) {
            const reduced = Math.round(dmg * (1 - monkDodgePct));
            dmg = Math.max(1, reduced);
        }

        // Pixie: fey nature halves all AoE magic damage.
        if (opts.aoe && attackKind === 'magic'
            && target.isSummoned
            && target.summonStats
            && target.summonStats.beastKind === 'pixie') {
            dmg = Math.max(1, Math.floor(dmg * 0.5));
        }

        // Adamantine / Divine Soul golem: half damage from magic, AoE, and ranged hits.
        if (target.isSummoned
            && target.summonStats
            && target.summonStats.halfDmgSpecial
            && (attackKind === 'magic' || opts.aoe || attackKind === 'ranged')) {
            dmg = Math.max(1, Math.floor(dmg * 0.5));
        }

        // ── Faerie Queen: 50% less from magic and AoE ───────────────────────────
        if (target.isSummoned && target.summonType === 'faerie_queen'
            && (attackKind === 'magic' || opts.aoe)) {
            dmg = Math.max(1, Math.floor(dmg * (1 - FAERIE_QUEEN_MAGIC_DMG_RESIST)));
        }

        // ── Necromancer Lich Form: magic/AoE resistance (50% + 1%/4 levels over 20) ─
        if (!target.isSummoned && target.isLichForm
            && (attackKind === 'magic' || opts.aoe)) {
            const lichOver  = Math.max(0, (target.level || 0) - NECRO_LICH_FORM_UNLOCK_LEVEL);
            const lichResist = Math.min(0.90,
                NECRO_LICH_MAGIC_RESIST_BASE + Math.floor(lichOver / 4) * NECRO_LICH_MAGIC_RESIST_PER_4LV);
            dmg = Math.max(1, Math.floor(dmg * (1 - lichResist)));
        }

        if (attackKind === 'melee') {
            const details = []
            if (target._defending) details.push('defended');
            if (armorBlock > 0)    details.push(`${armorBlock} armor`);
            if (innateDef > 0)     details.push(`${innateDef} def`);
            const detailStr = details.length ? ` (${details.join(', ')})` : '';
            this._addLog(`${eName} attacks ${target.name} for ${dmg} damage!${detailStr}`);
        } else if (attackKind === 'magic') {
            if (opts.dragonBreath) {
                const breathNames = { fire: 'fire breath', acid: 'acid breath', lightning: 'lightning breath', cold: 'frost breath', poison: 'poison breath' };
                const bLabel = breathNames[opts.dragonBreath] || 'breath weapon';
                this._addLog(`${eName}'s ${bLabel} sears ${target.name} for ${dmg}!`);
            } else {
                const aoe = opts.aoe ? ' (AoE)' : '';
                this._addLog(`${eName} blasts ${target.name} with dark magic for ${dmg}!${aoe}`);
            }
        } else {
            this._addLog(`${eName} weakly swipes at ${target.name} for ${dmg} damage.`);
        }

        // ── Barbarian L20: temp HP absorbs incoming damage (after defenses) ──────
        if (target.classId === 'barbarian' && (target.tempHp || 0) > 0) {
            if (target.tempHp >= dmg) {
                target.tempHp -= dmg;
                this._addLog(`🔴 ${target.name}'s Battle Fury absorbs ${dmg} damage! (${target.tempHp} temp HP left)`);
                return; // fully absorbed — no HP loss
            } else {
                dmg -= target.tempHp;
                this._addLog(`🔴 ${target.name}'s Battle Fury buffer depleted! (${dmg} bleeds through)`);
                target.tempHp = 0;
            }
        }

        target.health = Math.max(0, target.health - dmg);

        // ── Lich Phial: necromancer in lich form caught at 0 HP ─────────────────
        if (target.health <= 0 && !target.isSummoned && target.isLichForm && !target.lichPhial) {
            target.lichPhial = true;
            target.lichReviveRoundsLeft = NECRO_LICH_REVIVE_ROUNDS;
            target.health = 0;
            this._addLog(`💀 ${target.name}'s soul retreats to their Lich Phial! (returns in ${NECRO_LICH_REVIVE_ROUNDS} rounds)`);
            return; // don't process further damage effects
        }

        // ── Vampire gaseous form: triggered when the vampire would die ────────
        if (target.health <= 0
            && target.isSummoned
            && target.summonType === 'vampire'
            && target.summonStats
            && !target.summonStats.gaseousForm) {
            target.health = 1; // stay alive in gaseous form
            target.summonStats.gaseousForm = true;
            this._addLog(`\u{1F32B}\uFE0F ${target.name} dissolves into gaseous mist, escaping death!`);
            return; // skip all further status-effect applications
        }

        // ── Clay Golem reflect: when this summon is a clay golem, there's a
        //    chance each incoming hit reflects a fraction back at the attacker.
        //    Reflect uses the POST-mitigation `dmg` so armor counts.
        if (target.isSummoned
            && target.summonStats
            && target.summonStats.reflectChance
            && Math.random() < target.summonStats.reflectChance
            && e && e.health > 0) {
            const frac = target.summonStats.reflectFraction || 0.5;
            const reflect = Math.max(1, Math.floor(dmg * frac));
            const reflected = this._damageEnemy(e, reflect);
            this._addLog(`\u{1F9F1} ${target.name}'s hardened shell reflects ${reflected} damage back at ${eName}!`);
            if (e.health <= 0) this._addLog(`${eName} is defeated by their own blow!`);
        }

        // ── Paladin Fire Aura: melee hits on an aura-active paladin trigger a
        //    counter-strike dealing the paladin's own rolled melee damage as fire
        //    damage to the attacker (ignores the attacker's defense).
        if (attackKind === 'melee'
            && !target.isSummoned
            && target.classId === 'paladin'
            && target.fireAuraActive
            && dmg > 0
            && e && e.health > 0) {
            const reflected = this._rollPlayerMeleeDamage(target);
            e.health = Math.max(0, e.health - reflected);
            this._addLog(`\u{1F525} ${target.name}'s Fire Aura scorches ${eName} for ${reflected} fire damage!`);
            if (e.health <= 0) this._addLog(`${eName} is consumed by the flames!`);
        }

        // ── Armor special quality: Spikes ─────────────────────────────────────
        // +4 armor → 25% reflect, +5 → 50%, +6 → 75%, +7 → 100% of post-mitigation dmg.
        if (attackKind === 'melee'
            && !target.isSummoned
            && dmg > 0
            && e && e.health > 0) {
            const armorEnch = target.equipmentEnchants && target.equipmentEnchants.armor;
            if (armorEnch && armorEnch.spiked && armorEnch.level >= 4) {
                const spikePct = 0.25 * (armorEnch.level - 3);
                const spikeReflect = Math.max(1, Math.floor(dmg * spikePct));
                e.health = Math.max(0, e.health - spikeReflect);
                this._addLog(`\u{1F5E1}️ ${target.name}'s spiked armor reflects ${spikeReflect} damage back at ${eName}!`);
                if (e.health <= 0) this._addLog(`${eName} is impaled on the spikes!`);
            }
        }

        // ── Iron Golem (and anything else with summonStats.immune) — skip
        //    poison/stun/web attempts entirely. We compute once and branch.
        const immune = (target.isSummoned && target.summonStats && target.summonStats.immune) || null;
        const isImmune = (tag) => Array.isArray(immune) && immune.indexOf(tag) !== -1;

        // ── Necromancer undead are immune to poison and stun.
        // ── Incorporeal summons (spectres) are also immune to web, paralysis,
        //    and constrict — physical effects pass right through them.
        const isNecroUndead   = target.isSummoned && UNDEAD_TIERS.some(ut => ut.id === target.summonType);
        const isIncorporealSummon = target.isSummoned
            && target.summonStats
            && target.summonStats.incorporeal === true;

        // Poison (melee only — matches spider/slime/basilisk behaviour)
        if (attackKind === 'melee'
            && target.health > 0
            && !isImmune('poison')
            && !isNecroUndead          // undead immune to poison
            && typeDef.poisonChance
            && Math.random() < typeDef.poisonChance) {
            const perTick = Math.max(1, Math.floor(dmg * POISON_DAMAGE_FRACTION));
            target.addEffect({
                type: 'poison',
                rounds: POISON_DURATION_ROUNDS,
                damage: perTick,
            });
            this._addLog(`\u{1F7E2} ${target.name} is poisoned! (${perTick}/rd for ${POISON_DURATION_ROUNDS} rds)`);
        }

        // Stun (melee only — matches troll behaviour)
        if (attackKind === 'melee'
            && target.health > 0
            && !isImmune('stun')
            && !isNecroUndead          // undead immune to stun
            && !(target.classId === 'barbarian' && target.isRaging)  // raging barbarian shrugs stun
            && typeDef.stunChance
            && Math.random() < typeDef.stunChance) {
            if (this._tryApplyStun(target)) {
                this._addLog(`\u26A1 ${target.name} is STUNNED by ${eName}!`);
            }
        }

        // Phase 11 — Web (melee only). Locks the target out of their next
        // WEB_DURATION_ROUNDS turns. Uses the same per-turn skip mechanic
        // as stun via a round counter on the party member.
        if (attackKind === 'melee'
            && target.health > 0
            && !isImmune('web')
            && !isIncorporealSummon    // incorporeal immune to web
            && typeDef.webChance
            && Math.random() < typeDef.webChance) {
            target.webbedRounds = Math.max(target.webbedRounds || 0, WEB_DURATION_ROUNDS);
            this._addLog(`\u{1F578}\uFE0F ${target.name} is ENSNARED in sticky webbing by ${eName}! (${WEB_DURATION_ROUNDS} rds)`);
        }

        // Gelatinous Cube — paralyzingBite: melee hit paralyzes for N rounds
        // (same mechanic as webbed, shared round-counter).
        if (attackKind === 'melee'
            && target.health > 0
            && !isImmune('stun')
            && !isNecroUndead          // undead immune
            && !isIncorporealSummon    // incorporeal immune
            && typeDef.paralyzingBite) {
            const pRounds = typeDef.paralyzingBite;
            target.webbedRounds = Math.max(target.webbedRounds || 0, pRounds);
            this._addLog(`\u{1F9EA} ${target.name} is PARALYZED by the cube's acidic touch! (${pRounds} rds)`);
        }

        // Naga — constrict: melee hit coils around the target, pinning them
        // for N rounds (uses webbedRounds).
        if (attackKind === 'melee'
            && target.health > 0
            && !isImmune('stun')
            && !isNecroUndead          // undead immune
            && !isIncorporealSummon    // incorporeal immune
            && typeDef.constrict
            && Math.random() < 0.35) {
            const cRounds = typeDef.constrict;
            target.webbedRounds = Math.max(target.webbedRounds || 0, cRounds);
            this._addLog(`\u{1F40D} ${target.name} is CONSTRICTED by the naga's coils! (${cRounds} rds)`);
        }

        // Ice Troll — attackDebuff: freezing chill reduces target's damage
        // output for 2 rounds. Represented as a negative damageBonus effect.
        if (attackKind === 'melee'
            && target.health > 0
            && typeDef.attackDebuff) {
            const debuffMag = typeof typeDef.attackDebuff === 'number' ? typeDef.attackDebuff : 2;
            const debuffRounds = 2;
            // Remove any existing attack debuff first so it doesn't stack.
            target.activeEffects = (target.activeEffects || []).filter(x => x.type !== 'ice_chill');
            target.addEffect({
                type: 'ice_chill',
                damageBonus: -debuffMag,
                rounds: debuffRounds,
            });
            this._addLog(`\u2744\uFE0F ${target.name} is CHILLED by the ice troll — attack reduced by ${debuffMag} for ${debuffRounds} rds!`);
        }

        // Phase 11 — AoE-magic riders. When a monster with aoePoisonChance or
        // aoeStunChance does its AoE blast, each hit target rolls independently.
        // Spore clouds, shrieks, frost bursts — all reuse the same code path.
        if (opts.aoe && attackKind === 'magic' && target.health > 0) {
            if (typeDef.aoePoisonChance && Math.random() < typeDef.aoePoisonChance) {
                const perTick = Math.max(1, Math.floor(dmg * POISON_DAMAGE_FRACTION));
                target.addEffect({
                    type: 'poison',
                    rounds: POISON_DURATION_ROUNDS,
                    damage: perTick,
                });
                this._addLog(`\u{1F7E2} ${target.name} breathes in the toxic cloud and is poisoned!`);
            }
            if (typeDef.aoeStunChance && Math.random() < typeDef.aoeStunChance) {
                if (this._tryApplyStun(target)) {
                    this._addLog(`\u26A1 ${target.name} is dazed by the blast!`);
                }
            }
        }

        // Water Elemental drowning — half-damage DoT for 3 rounds + -2 defense for 3 rounds.
        if (opts.drowning && target.health > 0) {
            const drownTick = Math.max(1, Math.floor((opts.drowningDmg || dmg) * 0.5));
            target.addEffect({
                type: 'drowning',
                rounds: 3,
                damage: drownTick,
            });
            // Armor-weakening effect: -2 defense for 3 rounds (stacks with existing)
            target.addEffect({
                type: 'drown_armor_break',
                defenseBonus: -2,
                rounds: 3,
            });
            this._addLog(`\u{1F30A} ${target.name} is drowning! (${drownTick}/rd for 3 rds, -2 def for 3 rds)`);
        }

        // Drake fire breath — applies burn DoT to each target hit.
        if (opts.fireBurn && target.health > 0) {
            const burnTick = Math.max(1, Math.floor(dmg * DRAKE_FIRE_BURN_FRACTION));
            target.addEffect({
                type: 'burn',
                rounds: DRAKE_FIRE_BURN_ROUNDS,
                damage: burnTick,
            });
            this._addLog(`\u{1F525} ${target.name} is set ablaze! (${burnTick}/rd for ${DRAKE_FIRE_BURN_ROUNDS} rds)`);
        }

        // Dragon breath weapon rider effects — each breath type applies the
        // matching elemental DoT / debuff, identical to player weapon riders
        // but applied to party members instead of enemies.
        if (opts.dragonBreath && target.health > 0) {
            const bType = opts.dragonBreath;
            const perTick = Math.max(1, Math.floor(dmg * 0.33));
            if (bType === 'fire') {
                // Red dragon: burn DoT (same as fire weapon rider)
                target.addEffect({ type: 'burn', rounds: 2, damage: perTick });
                this._addLog(`\u{1F525} ${target.name} is set ablaze by the fire breath! (${perTick}/rd for 2 rds)`);
            } else if (bType === 'acid') {
                // Black dragon: acid DoT + defense debuff (same as acid weapon rider)
                target.addEffect({ type: 'acid_dot', rounds: 2, damage: perTick, defenseBonus: -2 });
                this._addLog(`\u{1F7E2} ${target.name} is corroded by the acid breath! (${perTick}/rd, -2 def for 2 rds)`);
            } else if (bType === 'lightning') {
                // Blue dragon: stun + damage debuff (same as lightning weapon rider)
                this._tryApplyStun(target);
                target.addEffect({ type: 'shocked', rounds: 2, damageBonus: -3 });
                this._addLog(`⚡ ${target.name} is shocked by the lightning breath! (stunned 1 rd, -3 dmg for 2 rds)`);
            } else if (bType === 'cold') {
                // White dragon: stun + defense debuff (same as ice weapon rider)
                this._tryApplyStun(target);
                target.addEffect({ type: 'chilled', rounds: 2, defenseBonus: -3 });
                this._addLog(`❄️ ${target.name} is frozen by the frost breath! (stunned 1 rd, -3 def for 2 rds)`);
            } else if (bType === 'poison') {
                // Green dragon: poison DoT (same as poison weapon rider — skip undead & golems)
                const isNecroUndeadTarget = target.isSummoned && UNDEAD_TIERS.some(ut => ut.id === target.summonType);
                const isGolemImmune = target.isSummoned
                    && Array.isArray(target.summonStats?.immune)
                    && target.summonStats.immune.includes('poison');
                if (!isNecroUndeadTarget && !isGolemImmune) {
                    target.addEffect({ type: 'poison', rounds: 3, damage: perTick });
                    this._addLog(`\u{1F922} ${target.name} is envenomed by the poison breath! (${perTick}/rd for 3 rds)`);
                } else {
                    this._addLog(`\u{1F922} ${target.name} resists the poison breath!`);
                }
            }
        }

        // Wraith life drain — steals a fraction of dealt damage as HP.
        if (typeDef.lifeDrain && dmg > 0 && e.health > 0) {
            const stolen = Math.max(1, Math.floor(dmg * WRAITH_DRAIN_FRACTION));
            const before = e.health;
            e.health = Math.min(e.maxHealth, e.health + stolen);
            const gained = e.health - before;
            if (gained > 0) {
                this._addLog(`\u{1F480} ${eName} drains life from ${target.name}, recovering ${gained} HP!`);
            }
        }

        if (target.health <= 0) {
            this._addLog(`${target.name} has fallen!`);
        }
    }

    // ────────────────────────────────────────────
    // Damage / effect ticks
    // ────────────────────────────────────────────

    /** Apply raw damage to an enemy after its entangle defense debuff is taken into account.
     *  @param {boolean} isMagic  — if true, checks enemy halfMagicDamage flag (efreeti etc.)
     */
    _damageEnemy(enemy, amount, ignoreDefense = false, isMagic = false) {
        // Efreeti / fireborn magic resistance: half magic damage.
        if (isMagic) {
            const eDef = ENEMY_TYPES[enemy.type] || {};
            if (eDef.halfMagicDamage) {
                amount = Math.max(1, Math.floor(amount * 0.5));
            }
        }

        // Entangle adds to `defenseBonus` which is negative; so it *lowers* the
        // enemy's effective defense — i.e., player damage goes UP. That matches
        // "victim takes more damage" because defenseBonus comes off the top.
        const effects = enemy.activeEffects || [];
        let defMod = 0;
        for (const x of effects) {
            if (typeof x.defenseBonus === 'number') defMod += x.defenseBonus;
        }
        // If defMod is negative, damage is amplified by `-defMod`.
        let final = amount;
        if (defMod < 0) final = Math.max(1, amount - defMod); // - of negative = +
        // Apply enemy base defense as flat damage reduction (min 1 dealt).
        // ignoreDefense = true bypasses this (e.g. ranger vs favored enemy).
        if (!ignoreDefense) {
            final = Math.max(1, final - (enemy.defense || 0));
        }
        final = Math.max(1, Math.round(final));
        enemy.health = Math.max(0, enemy.health - final);
        return final;
    }

    /**
     * Sum damage-output modifiers on an enemy (from poison-weapon rider,
     * lightning/ice debuffs, entangle, etc.). Returns a number to ADD to the
     * enemy's rolled damage — usually negative (so the enemy hits softer).
     */
    _getEnemyDamageMod(enemy, attackType = 'melee') {
        const effects = (enemy && enemy.activeEffects) || [];
        let mod = 0;
        for (const x of effects) {
            if (typeof x.damageBonus === 'number') mod += x.damageBonus;
        }
        // Boss/mega-boss attack bonus split by attack type.
        // bossDL = the dungeon level at spawn time.
        // Melee/ranged: boss +DL×3, mega-boss +DL×4.
        // Magic/AoE:    boss +DL×2, mega-boss +DL×3.
        if (enemy && enemy.bossDL) {
            const dl = enemy.bossDL;
            const isMagic = (attackType === 'magic');
            if (enemy.isMegaBoss) {
                mod += isMagic ? dl * 3 : dl * 4;
            } else if (enemy.isBoss) {
                mod += isMagic ? dl * 2 : dl * 3;
            }
        } else if (enemy && enemy.bossAtkBonus) {
            // Fallback for older saves without bossDL stored
            mod += enemy.bossAtkBonus;
        }
        return mod;
    }

    /**
     * Roll a weapon-rider proc after a player hit. Applies DoT and/or status
     * debuff onto `enemy` according to the attacker's current weapon rider.
     * Uses `rawDamage` (the damage actually dealt) to compute DoT tick size.
     *
     * No-ops if the attacker has no rider, if the enemy is already dead, or
     * if the proc roll fails.
     *
     * @param {PartyMember} attacker
     * @param {object}      enemy
     * @param {number}      rawDamage  damage dealt on THIS hit
     */
    _applyWeaponRider(attacker, enemy, rawDamage, slot = 'weapon') {
        if (!attacker || !enemy || enemy.health <= 0) return;
        const isOffhand = slot === 'offhand';
        const getRider   = isOffhand ? 'getOffhandRider'        : 'getWeaponRider';
        const getEnchLvl = isOffhand ? 'getOffhandEnchantLevel' : 'getWeaponEnchantLevel';
        if (typeof attacker[getRider] !== 'function') return;
        const rider = attacker[getRider]();
        if (!rider) return;
        if (Math.random() >= RIDER_PROC_CHANCE) return;

        const enchLvl = attacker[getEnchLvl] ? attacker[getEnchLvl]() : 0;
        const dotRounds    = RIDER_DOT_BASE_ROUNDS    + enchLvl;
        const debuffRounds = RIDER_DEBUFF_BASE_ROUNDS + enchLvl;
        const debuffMag    = 1 + enchLvl;
        const baseDotTick  = Math.max(1, Math.floor(rawDamage * RIDER_DOT_DAMAGE_FRACTION));
        enemy.activeEffects = enemy.activeEffects || [];

        // Helper: remove any existing effect of this type, then push a fresh one.
        const refresh = (effect) => {
            enemy.activeEffects = enemy.activeEffects.filter(x => x.type !== effect.type);
            enemy.activeEffects.push(effect);
        };
        const eName = this._eName(enemy);

        // Helper: check enemy's immune array for a damage type.
        const enemyTypeDef = ENEMY_TYPES[enemy.type] || {};
        const enemyImmune  = Array.isArray(enemyTypeDef.immune) ? enemyTypeDef.immune : [];
        const isEnemyImmuneTo = (dmgType) => enemyImmune.includes(dmgType)
            || (dmgType === 'poison' && Array.isArray(enemyTypeDef.tags) && enemyTypeDef.tags.includes('undead'));

        switch (rider) {
            case 'fire': {
                if (isEnemyImmuneTo('fire')) {
                    this._addLog(`\u{1F525} ${eName} is immune to fire!`);
                    break;
                }
                const fireTick = Math.max(1, Math.floor(baseDotTick * RIDER_FIRE_DAMAGE_BONUS_MULT));
                refresh({
                    type: 'burn',
                    rounds: dotRounds + RIDER_FIRE_BONUS_ROUNDS,
                    damage: fireTick,
                });
                this._addLog(`\u{1F525} ${eName} is set ablaze! (${fireTick}/rd for ${dotRounds + RIDER_FIRE_BONUS_ROUNDS} rds)`);
                break;
            }
            case 'acid': {
                if (isEnemyImmuneTo('acid')) {
                    this._addLog(`\u{1F7E2} ${eName} is immune to acid!`);
                    break;
                }
                refresh({
                    type: 'acid_dot',
                    rounds: dotRounds,
                    damage: baseDotTick,
                    defenseBonus: -debuffMag, // softens armor — player damage up
                });
                this._addLog(`\u{1F7E2} ${eName} is splashed with corrosive acid! (${baseDotTick}/rd, -${debuffMag} def for ${dotRounds} rds)`);
                break;
            }
            case 'poison': {
                if (isEnemyImmuneTo('poison')) {
                    this._addLog(`\u{1F480} ${eName} is immune to poison!`);
                    break;
                }
                refresh({
                    type: 'poison_weapon',
                    rounds: dotRounds,
                    damage: baseDotTick,
                    damageBonus: -debuffMag, // enemy hits softer
                });
                this._addLog(`\u{1F40D} ${eName} is envenomed! (${baseDotTick}/rd, -${debuffMag} dmg for ${dotRounds} rds)`);
                break;
            }
            case 'lightning': {
                if (isEnemyImmuneTo('lightning')) {
                    this._addLog(`⚡ ${eName} is immune to lightning!`);
                    break;
                }
                const _lightningStunLanded = !isEnemyImmuneTo('stun') && this._tryStunEnemy(enemy);
                refresh({
                    type: 'shocked',
                    rounds: debuffRounds,
                    damageBonus: -debuffMag,
                });
                const stunNote = _lightningStunLanded ? ', stunned 1 rd' : '';
                this._addLog(`⚡ ${eName} is shocked! (-${debuffMag} dmg for ${debuffRounds} rds${stunNote})`);
                break;
            }
            case 'ice': {
                if (isEnemyImmuneTo('cold')) {
                    this._addLog(`❄️ ${eName} is immune to cold!`);
                    break;
                }
                const _iceStunLanded = !isEnemyImmuneTo('stun') && this._tryStunEnemy(enemy);
                refresh({
                    type: 'chilled',
                    rounds: debuffRounds,
                    defenseBonus: -debuffMag,
                });
                const stunNoteIce = _iceStunLanded ? ', stunned 1 rd' : '';
                this._addLog(`❄️ ${eName} is frozen! (-${debuffMag} def for ${debuffRounds} rds${stunNoteIce})`);
                break;
            }
        }
    }

    /**
     * Tick party-side effects (poison) and decrement durations of temporary
     * buffs (song). Song has no `rounds` so it persists through the whole fight.
     */
    _tickPartyEffects() {
        for (const m of this.party) {
            if (m.health <= 0) continue;
            const effects = m.activeEffects || [];
            if (effects.length === 0) continue;

            // Necromancer undead summons are immune to poison and burn.
            const isNecroUndead = m.isSummoned && UNDEAD_TIERS.some(ut => ut.id === m.summonType);

            let totalPoison   = 0;
            let totalBurn     = 0;
            let totalDrowning = 0;
            let totalAcid     = 0;
            for (const e of effects) {
                if (e.type === 'poison' && e.rounds > 0) {
                    if (!isNecroUndead && !m.isLichForm) totalPoison += (e.damage || 0);
                    e.rounds--;
                }
                // Burn DoT (drake/red dragon fire breath)
                if (e.type === 'burn' && e.rounds > 0) {
                    if (!isNecroUndead) totalBurn += (e.damage || 0);
                    e.rounds--;
                }
                // Acid DoT (black dragon breath)
                if (e.type === 'acid_dot' && e.rounds > 0) {
                    totalAcid += (e.damage || 0);
                    e.rounds--;
                }
                // Drowning DoT from water elemental
                if (e.type === 'drowning' && e.rounds > 0) {
                    totalDrowning += (e.damage || 0);
                    e.rounds--;
                }
                // Tick down water elemental armor-break debuff
                if (e.type === 'drown_armor_break' && e.rounds > 0) {
                    e.rounds--;
                }
                // Tick down mage shield duration
                if (e.type === 'mage_shield' && e.rounds > 0) {
                    e.rounds--;
                    if (e.rounds <= 0 && this._mageShieldCasterId === e.casterId) {
                        this._mageShieldCasterId = null;
                    }
                }
                // Tick down ice troll / frost breath chill debuff
                if (e.type === 'ice_chill' && e.rounds > 0) {
                    e.rounds--;
                }
                // Tick down lightning breath shock debuff (-damage)
                if (e.type === 'shocked' && e.rounds > 0) {
                    e.rounds--;
                }
                // Tick down frost breath chill debuff (-defense)
                if (e.type === 'chilled' && e.rounds > 0) {
                    e.rounds--;
                }
            }
            if (totalPoison > 0) {
                m.health = Math.max(0, m.health - totalPoison);
                this._addLog(`\u{1F7E2} ${m.name} suffers ${totalPoison} poison damage!`);
                if (m.health <= 0) this._addLog(`${m.name} has fallen to the poison!`);
            }
            if (totalBurn > 0 && m.health > 0) {
                m.health = Math.max(0, m.health - totalBurn);
                this._addLog(`\u{1F525} ${m.name} takes ${totalBurn} burn damage!`);
                if (m.health <= 0) this._addLog(`${m.name} has been consumed by the flames!`);
            }
            if (totalAcid > 0 && m.health > 0) {
                m.health = Math.max(0, m.health - totalAcid);
                this._addLog(`\u{1F7E2} ${m.name} suffers ${totalAcid} acid damage!`);
                if (m.health <= 0) this._addLog(`${m.name} has been dissolved by the acid!`);
            }
            if (totalDrowning > 0 && m.health > 0) {
                m.health = Math.max(0, m.health - totalDrowning);
                this._addLog(`\u{1F30A} ${m.name} chokes on water, taking ${totalDrowning} drowning damage!`);
                if (m.health <= 0) this._addLog(`${m.name} has drowned!`);
            }
            // Barbarian rage: regenerate 5% max HP per round
            if (m.classId === 'barbarian' && m.isRaging && m.health > 0) {
                const regenAmt = Math.max(1, Math.floor(m.maxHealth * BARBARIAN_RAGE_HP_REGEN));
                const healed = Math.min(regenAmt, m.maxHealth - m.health);
                if (healed > 0) {
                    m.health += healed;
                    this._addLog(`\u{1F534} ${m.name} rages, healing ${healed} HP!`);
                }
            }
            // Paladin Fire Aura: drain MP per round; auto-extinguish if out of mana.
            if (m.classId === 'paladin' && m.fireAuraActive && m.health > 0) {
                if (m.mana >= PALADIN_FIRE_AURA_MANA_PER_ROUND) {
                    m.mana -= PALADIN_FIRE_AURA_MANA_PER_ROUND;
                    this._addLog(`\u{1F525} ${m.name}'s Fire Aura flickers (-${PALADIN_FIRE_AURA_MANA_PER_ROUND} MP).`);
                } else {
                    m.mana = 0;
                    m.fireAuraActive = false;
                    this._addLog(`\u{1F525} ${m.name}'s Fire Aura sputters out — no mana left!`);
                }
            }
            // Lich Form: 15 MP/round upkeep; stamina→mana conversion on mana exhaustion
            if (m.classId === 'necromancer' && m.isLichForm && !m.lichPhial) {
                if (m.mana >= NECRO_LICH_FORM_MANA_PER_ROUND) {
                    m.mana -= NECRO_LICH_FORM_MANA_PER_ROUND;
                    this._addLog(`💀 ${m.name}'s Lich Form drains ${NECRO_LICH_FORM_MANA_PER_ROUND} MP.`);
                } else if (m.stamina > 0) {
                    const stamConv = m.stamina;
                    m.mana    = stamConv;
                    m.stamina = 0;
                    this._addLog(`💀 ${m.name}'s mana exhausted — converting ${stamConv} stamina to mana to sustain Lich Form!`);
                } else {
                    m.isLichForm = false;
                    this._addLog(`💀 ${m.name}'s mana and stamina exhausted — Lich Form collapses!`);
                }
            }

            // Necromancer undead upkeep: 1 MP per living undead per round
            if (m.classId === 'necromancer' && m.health > 0) {
                const myUndead = this.party.filter(p =>
                    p.isSummoned && p.summonerId === m.id &&
                    UNDEAD_TIERS.some(ut => ut.id === p.summonType) && p.health > 0,
                );
                if (myUndead.length > 0) {
                    const upkeep = myUndead.length * NECRO_UNDEAD_MANA_UPKEEP;
                    m.mana = Math.max(0, m.mana - upkeep);
                    this._addLog(`💀 ${m.name}'s ${myUndead.length} undead drain ${upkeep} MP/round.`);
                }
            }
            // Combat Regen HoT (Cleric Mass Regen — L20)
            for (const e of effects) {
                if (e.type === 'combat_regen' && e.rounds > 0 && m.health < m.maxHealth) {
                    const healAmt = Math.max(1, Math.floor(m.maxHealth * (e.healPct || 0)));
                    const healed  = Math.min(healAmt, m.maxHealth - m.health);
                    if (healed > 0) {
                        m.health += healed;
                        this._addLog(`✨ ${m.name} regenerates ${healed} HP from Mass Regen!`);
                    }
                    e.rounds--;
                }
            }
            m.expireEffects();
        }

        // Lich phial countdown (runs even when health === 0)
        for (const pm of this.party) {
            if (!pm.lichPhial || pm.isSummoned) continue;
            pm.lichReviveRoundsLeft = (pm.lichReviveRoundsLeft || 0) - 1;
            if (pm.lichReviveRoundsLeft > 0) {
                this._addLog(`💀 ${pm.name}'s soul stirs in the phial... (${pm.lichReviveRoundsLeft} rds)`);
            } else {
                const overLv   = Math.max(0, Math.floor(((pm.level || 0) - NECRO_LICH_FORM_UNLOCK_LEVEL) / 2));
                const reviveFrac = Math.min(1, NECRO_LICH_REVIVE_HP_BASE + overLv * NECRO_LICH_REVIVE_HP_PER_2LV);
                const reviveHp = Math.max(1, Math.floor(pm.maxHealth * reviveFrac));
                pm.health   = reviveHp;
                pm.lichPhial = false;
                this._addLog(`💀 ${pm.name} is reborn from the phial at ${reviveHp} HP!`);
            }
        }

        // Remove mage shield if the caster has been defeated.
        if (this._mageShieldCasterId !== null) {
            const caster = this.party.find(t => t.id === this._mageShieldCasterId);
            if (!caster || caster.health <= 0) {
                this._removeMageShield(this._mageShieldCasterId);
                this._addLog(`\u{1F6E1}\uFE0F The Arcane Shield collapses as its caster falls!`);
            }
        }
    }

    /**
     * Tick enemy-side effects (entangle duration) and apply per-turn regen
     * for monsters with a `regenPercent` (e.g. troll).
     */
    /**
     * Mega-boss summon: 33%/turn chance to spawn a normal (non-boss) version of itself.
     * The minion enters the initiative order and acts from next round onward.
     */
    _megaBossSummonMinion(megaBoss) {
        const typeDef = ENEMY_TYPES[megaBoss.type];
        if (!typeDef) return;
        const lvl    = Math.max(1, megaBoss.level || this.dungeonLevel || 1);
        const baseHp = Math.max(5, Math.round((10 + lvl * 14) * (0.75 + Math.random() * 0.5)));
        const baseSt = Math.max(5, Math.round(10 + lvl * 4));
        const baseMp = Math.max(5, Math.round(10 + lvl * 4));
        const def    = Math.floor(lvl / 2);
        const minion = {
            id:            'mb_minion_' + Date.now().toString(36) + '_' + Math.random().toString(36).slice(2, 6),
            type:          megaBoss.type,
            level:         lvl,
            health:        baseHp,
            maxHealth:     baseHp,
            stamina:       baseSt,
            maxStamina:    baseSt,
            mana:          baseMp,
            maxMana:       baseMp,
            defense:       def,
            activeEffects: [],
            stunned:       false,
            isBoss:        false,
            isMegaBoss:    false,
            bossAtkBonus:  0,
            bossDL:        0,
            charmedRounds: 0,
            name:          null,
            sprite:        null,
            createSprite:  () => {},
            addEffect:     function(fx) { this.activeEffects.push(fx); },
        };
        this.enemies.push(minion);
        // Insert at end of initiative order; acts next round
        const init = 1 + Math.floor(Math.random() * 6);
        this._initiativeOrder.push({ kind: 'enemy', ref: minion, init, skipThisRound: true });
        this._addLog(`💀 ${this._eName(megaBoss)} tears a rift — a ${this._eName(minion)} materializes from the void!`);
    }

    /**
     * Execute a charmed monster's turn: it attacks a random hostile enemy.
     * Deals standard melee damage (using its own stats). If no hostile enemies
     * remain, the charmed monster passes its turn.
     */
    _charmedMonsterAttack(e) {
        const eName = this._eName(e);
        const hostile = this.aliveHostileEnemies.filter(h => h !== e);
        if (hostile.length === 0) {
            this._addLog(`🎵 ${eName} (charmed) looks around but finds no one to fight.`);
            return;
        }
        const target = hostile[Math.floor(Math.random() * hostile.length)];
        const tName  = this._eName(target);

        const dlvl   = this.dungeonLevel;
        const lvlBoost     = Math.max(0, dlvl - 1);
        const lvlThreeBonus = Math.max(0, dlvl - (MONSTER_DAMAGE_BONUS_THRESHOLD - 1));
        const dmin = MONSTER_MELEE_DAMAGE_MIN + MONSTER_DAMAGE_PER_LEVEL * lvlBoost + MONSTER_DAMAGE_BONUS_PER_LEVEL * lvlThreeBonus;
        const dmax = MONSTER_MELEE_DAMAGE_MAX + MONSTER_DAMAGE_PER_LEVEL * lvlBoost + MONSTER_DAMAGE_BONUS_PER_LEVEL * lvlThreeBonus;
        let dmg = randomInt(dmin, dmax);
        dmg = Math.max(1, Math.round(dmg * MONSTER_DAMAGE_MULTIPLIER));
        // Apply defense of the target
        const dealt = Math.max(1, dmg - (target.defense || 0));
        target.health = Math.max(0, target.health - dealt);
        this._addLog(`🎵 ${eName} (charmed) attacks ${tName} for ${dealt} damage!`);
        if (target.health <= 0) this._addLog(`${tName} is defeated!`);
    }

    _tickEnemyEffects() {
        for (const e of this.enemies) {
            if (e.health <= 0) continue;

            const typeDef = ENEMY_TYPES[e.type] || {};
            if (typeDef.regenPercent && e.health < e.maxHealth) {
                const heal = Math.max(1, Math.ceil(e.maxHealth * typeDef.regenPercent));
                const before = e.health;
                e.health = Math.min(e.maxHealth, e.health + heal);
                const gained = e.health - before;
                if (gained > 0) {
                    this._addLog(`\u{1F9EC} ${this._eName(e)} regenerates ${gained} HP!`);
                }
            }

            // ── Weapon-rider DoTs on enemies (burn, acid_dot, poison_weapon).
            //    Each ticks per player round; damage rolled once per round.
            const effects = e.activeEffects || [];
            const DOT_TYPES = { burn: '\u{1F525} burn', acid_dot: '\u{1F7E2} acid', poison_weapon: '\u{1F40D} venom', bleed: '\u{1F7E5} bleed', mummy_rot: '\u{1F7E4} Mummy Rot', fae_poison: '\u{1F33F} fae venom' };
            for (const fx of effects) {
                if (!fx || fx.rounds === undefined || fx.rounds <= 0) continue;
                if (DOT_TYPES[fx.type] && fx.damage > 0 && e.health > 0) {
                    e.health = Math.max(0, e.health - fx.damage);
                    this._addLog(`${DOT_TYPES[fx.type]}: ${this._eName(e)} suffers ${fx.damage} damage!`);
                    if (e.health <= 0) {
                        this._addLog(`${this._eName(e)} is consumed by the ${fx.type.replace('_', ' ')}!`);
                        break;
                    }
                }
            }

            // Fae hold — re-apply stun for remaining hold rounds then expire
            const faeHold = effects.find(fx => fx && fx.type === 'fae_hold' && fx.rounds > 0);
            if (faeHold && e.health > 0) {
                e.stunned = true;   // cleared at turn start after skipping
                faeHold.rounds--;
            }

            // Quivering Palm — internal damage that doubles each round (bypasses all defense)
            for (const fx of effects) {
                if (fx.type === 'quivering_palm' && fx.rounds > 0 && fx.damage > 0 && e.health > 0) {
                    e.health = Math.max(0, e.health - fx.damage);
                    this._addLog(`✋ Quivering Palm: ${this._eName(e)} shudders for ${fx.damage} internal damage!`);
                    // Doubles each round, but caps at 10 total doublings
                    if ((fx.doublings || 0) < 10) {
                        fx.damage *= 2;
                        fx.doublings = (fx.doublings || 0) + 1;
                    }
                    if (e.health <= 0) {
                        this._addLog(`${this._eName(e)} collapses from the Quivering Palm!`);
                        break;
                    }
                }
            }

            // Charm duration tick: decrement charmedRounds each enemy round
            if (e.charmedRounds > 0) {
                e.charmedRounds--;
                if (e.charmedRounds <= 0) {
                    e.charmedRounds = 0;
                    e.charmerId = null;
                    this._addLog(`🎵 ${this._eName(e)}'s charm has worn off — it returns to the enemy ranks!`);
                }
            }

            // Decrement and expire. Permanent effects (e.g. Mummy Rot, Ghost Fear)
            // are never decremented and never expired.
            for (const fx of effects) {
                if (!fx.permanent && 'rounds' in fx && fx.rounds > 0) fx.rounds--;
            }
            e.activeEffects = effects.filter(x => x.permanent || !('rounds' in x) || x.rounds > 0);
        }
    }

    // ────────────────────────────────────────────
    // Victory / loot
    // ────────────────────────────────────────────

    _finishVictory() {
        this.phase = 'VICTORY';
        // Clear charm state from any surviving (formerly charmed) monsters that fled
        for (const e of this.enemies) {
            if (e.charmedRounds > 0) {
                e.charmedRounds = 0;
                e.charmerId = null;
            }
        }
        this._addLog('--- Victory! All enemies defeated! ---');
        this._applyVictoryRecovery();
        this._awardXP();
        this._generateLoot();
        this._notify();
    }

    _awardXP() {
        let totalXP = 0;
        for (const e of this.enemies) {
            const lvl = Math.max(1, e.level || 1);
            const xpMult = e.isMegaBoss ? 10 : (e.isBoss ? 3 : 1);
            totalXP += XP_PER_MONSTER_LEVEL * lvl * xpMult;
        }
        this.xpEarned = totalXP;

        const eligible = this.party.filter(m => !m.isSummoned && m.health > 0);
        if (eligible.length === 0 || totalXP === 0) return;

        const share = Math.floor(totalXP / eligible.length);
        this._addLog(`Party gains ${totalXP} XP (${share} each).`);

        for (const m of eligible) {
            const records = m.gainXP(share);
            for (const r of records) {
                this._addLog(`\u2B50 ${m.name} reached level ${r.toLevel}! (+${r.hpGain} HP, +${r.stGain} ST, +${r.mpGain} MP)`);
                this.levelUpLogs.push({ member: m.name, ...r });
            }
        }
    }

    /**
     * Phase 8 rule 9: fallen characters STAY dead after combat. No auto-revive.
     * Survivors still receive a small recovery tick.
     */
    _applyVictoryRecovery() {
        let anyRecovered = false;
        for (const m of this.party) {
            if (m.isSummoned) continue;
            m.tempHp    = 0; // Blood Rage temp HP resets after combat
            m.mirrorImages = 0; // mirror images reset
            m.lichPhial = false; // lich phial cleared after combat
            m.isLichForm = false; // lich form reset
            m.faeTokens = 0; // fae tokens reset
            if (m.health <= 0) continue;          // do NOT revive
            m.health  = Math.min(m.maxHealth,  m.health  + POST_COMBAT_RECOVERY);
            m.stamina = Math.min(m.maxStamina, m.stamina + POST_COMBAT_RECOVERY);
            m.mana    = Math.min(m.maxMana,    m.mana    + POST_COMBAT_RECOVERY);
            anyRecovered = true;
        }
        if (anyRecovered) {
            this._addLog(`Surviving party recovers slightly. (+${POST_COMBAT_RECOVERY} each stat)`);
        }
        const fallen = this.party.filter(m => !m.isSummoned && m.health <= 0);
        if (fallen.length > 0) {
            this._addLog(`\u26B0\uFE0F ${fallen.length} party member${fallen.length > 1 ? 's' : ''} fell in battle — use a Resurrection Potion to revive them.`);
        }
    }

    _generateLoot() {
        const partySize = this.party.filter(m => !m.isSummoned).length;
        const extraChance = Math.max(0, partySize - 1) * LOOT_EXTRA_CHAR_BONUS;
        const dlvlBoost = LOOT_DROP_PER_LEVEL * Math.max(0, this.dungeonLevel - 1);

        let totalGold = 0;
        const items = [];

        for (const e of this.enemies) {
            if (e.health > 0) continue;

            const lvl = Math.max(1, e.level || 1);
            const isBoss     = !!e.isBoss;
            const isMegaBoss = !!e.isMegaBoss;
            // Mega boss: 10× gold, 5 loot rolls.  Normal boss: 5× gold, 5 rolls.
            const lootRolls = isBoss ? 5 : 1;
            const goldMult  = isMegaBoss ? 10 : (isBoss ? 5 : 1);

            totalGold += randomInt(LOOT_GOLD_MIN, LOOT_GOLD_MAX) * lvl * goldMult;

            for (let roll = 0; roll < lootRolls; roll++) {
                if (Math.random() < LOOT_FOOD_CHANCE) {
                    const existing = items.find(i => i.itemId === 'food');
                    if (existing) existing.quantity++;
                    else items.push({ itemId: 'food', quantity: 1 });
                }

                if (Math.random() < LOOT_POTION_CHANCE) {
                    const existing = items.find(i => i.itemId === 'healing_potion');
                    if (existing) existing.quantity++;
                    else items.push({ itemId: 'healing_potion', quantity: 1 });
                }

                if (Math.random() < LOOT_WEAPON_CHANCE + extraChance + dlvlBoost) {
                    items.push({ itemId: randomWeaponDrop(), quantity: 1 });
                }
                if (Math.random() < LOOT_ARMOR_CHANCE + extraChance + dlvlBoost) {
                    items.push({ itemId: randomArmorDrop(), quantity: 1 });
                }
                if (Math.random() < LOOT_SHIELD_CHANCE + extraChance + dlvlBoost) {
                    items.push({ itemId: randomShieldDrop(), quantity: 1 });
                }
                // Mega bosses get 5 trinket rolls per loot roll; normal bosses get 3× chance per roll.
                const trinketChance = TRINKET_DROP_CHANCE + dlvlBoost;
                const trinketRolls = isMegaBoss ? 5 : 1;
                for (let tr = 0; tr < trinketRolls; tr++) {
                    if (Math.random() < (isBoss ? trinketChance * 3 : trinketChance)) {
                        items.push({ itemId: randomTrinketDrop(this.dungeonLevel), quantity: 1 });
                    }
                }
                // Phase 10 — 3% torch, reagent drop per enemy.
                if (Math.random() < LOOT_TORCH_CHANCE) {
                    const existing = items.find(i => i.itemId === 'torch');
                    if (existing) existing.quantity++;
                    else items.push({ itemId: 'torch', quantity: 1 });
                }
                // Tiered reagents — each tier rolls independently when the
                // dungeon level qualifies. Base chance + 1%/level, capped at 10%.
                {
                    const dlvlHere = this.dungeonLevel;
                    const lvlBonus = Math.min(LOOT_REAGENT_CHANCE_MAX,
                        LOOT_REAGENT_CHANCE_PER_LVL * (dlvlHere - 1));
                    // Common: all levels
                    if (Math.random() < Math.min(LOOT_REAGENT_CHANCE_MAX, LOOT_REAGENT_COMMON_BASE + lvlBonus)) {
                        const ex = items.find(i => i.itemId === 'reagent_common');
                        if (ex) ex.quantity++; else items.push({ itemId: 'reagent_common', quantity: 1 });
                    }
                    // Uncommon: level 4+
                    if (dlvlHere >= REAGENT_TIER_UNCOMMON_MIN &&
                        Math.random() < Math.min(LOOT_REAGENT_CHANCE_MAX, LOOT_REAGENT_UNCOMMON_BASE + lvlBonus)) {
                        const ex = items.find(i => i.itemId === 'reagent_uncommon');
                        if (ex) ex.quantity++; else items.push({ itemId: 'reagent_uncommon', quantity: 1 });
                    }
                    // Rare: level 7+
                    if (dlvlHere >= REAGENT_TIER_RARE_MIN &&
                        Math.random() < Math.min(LOOT_REAGENT_CHANCE_MAX, LOOT_REAGENT_RARE_BASE + lvlBonus)) {
                        const ex = items.find(i => i.itemId === 'reagent_rare');
                        if (ex) ex.quantity++; else items.push({ itemId: 'reagent_rare', quantity: 1 });
                    }
                    // Epic: level 15+  (flat 1% — no level bonus)
                    if (dlvlHere >= REAGENT_TIER_EPIC_MIN && Math.random() < LOOT_REAGENT_EPIC_BASE) {
                        const ex = items.find(i => i.itemId === 'reagent_epic');
                        if (ex) ex.quantity++; else items.push({ itemId: 'reagent_epic', quantity: 1 });
                    }
                    // Legendary: level 20+
                    if (dlvlHere >= REAGENT_TIER_LEGENDARY_MIN && Math.random() < LOOT_REAGENT_LEGENDARY_BASE) {
                        const ex = items.find(i => i.itemId === 'reagent_legendary');
                        if (ex) ex.quantity++; else items.push({ itemId: 'reagent_legendary', quantity: 1 });
                    }
                    // Mythic: level 25+
                    if (dlvlHere >= REAGENT_TIER_MYTHIC_MIN && Math.random() < LOOT_REAGENT_MYTHIC_BASE) {
                        const ex = items.find(i => i.itemId === 'reagent_mythic');
                        if (ex) ex.quantity++; else items.push({ itemId: 'reagent_mythic', quantity: 1 });
                    }
                    // Divine: level 30+
                    if (dlvlHere >= REAGENT_TIER_DIVINE_MIN && Math.random() < LOOT_REAGENT_DIVINE_BASE) {
                        const ex = items.find(i => i.itemId === 'reagent_divine');
                        if (ex) ex.quantity++; else items.push({ itemId: 'reagent_divine', quantity: 1 });
                    }
                }
            }

            // Bosses always drop extra rare reagents on top of the rolled loot.
            if (isBoss) {
                const n = randomInt(REAGENT_BOSS_RARE_MIN, REAGENT_BOSS_RARE_MAX);
                if (n > 0) {
                    const existing = items.find(i => i.itemId === 'reagent_rare');
                    if (existing) existing.quantity += n;
                    else items.push({ itemId: 'reagent_rare', quantity: n });
                }
                // High-tier reagent guaranteed drops — one each of every qualifying tier.
                const highTierGuarantees = [
                    { minDlvl: REAGENT_TIER_EPIC_MIN,      itemId: 'reagent_epic' },
                    { minDlvl: REAGENT_TIER_LEGENDARY_MIN, itemId: 'reagent_legendary' },
                    { minDlvl: REAGENT_TIER_MYTHIC_MIN,    itemId: 'reagent_mythic' },
                    { minDlvl: REAGENT_TIER_DIVINE_MIN,    itemId: 'reagent_divine' },
                ];
                const bossAmt = isMegaBoss ? REAGENT_MEGABOSS_HIGH_TIER_AMOUNT : REAGENT_BOSS_HIGH_TIER_AMOUNT;
                for (const { minDlvl, itemId } of highTierGuarantees) {
                    if (this.dungeonLevel >= minDlvl) {
                        const ex = items.find(i => i.itemId === itemId);
                        if (ex) ex.quantity += bossAmt;
                        else items.push({ itemId, quantity: bossAmt });
                    }
                }
            }
        }

        this.loot = { gold: totalGold, items };

        if (totalGold > 0) this._addLog(`Found ${totalGold} gold!`);
        for (const item of items) {
            const def = getItemDef(item.itemId);
            const name = def ? def.name : item.itemId;
            if (item.quantity > 1) this._addLog(`Found ${item.quantity}x ${name}!`);
            else this._addLog(`Found ${name}!`);
        }
        if (totalGold === 0 && items.length === 0) {
            this._addLog('No loot found.');
        }
    }

    // ────────────────────────────────────────────
    // Helpers
    // ────────────────────────────────────────────

    _rollPlayerMeleeDamage(m) {
        let base = randomInt(MELEE_DAMAGE_MIN, MELEE_DAMAGE_MAX);
        base += m.getWeaponBonus('melee');
        base += m.getClassDamageBonus('melee');
        base += this._getPartyMemberDamageMod(m);
        // Barbarian rage grants +level to melee damage
        if (m.classId === 'barbarian' && m.isRaging) base += (m.level || 1);
        // Barbarian L20 Blood Rage: wound multiplier — only when no temp HP buffer
        if (m.classId === 'barbarian' && m.isRaging && m.level >= BARBARIAN_BLOOD_RAGE_UNLOCK_LEVEL
            && !(m.tempHp > 0)) {
            const hpRatio = m.health / Math.max(1, m.maxHealth);
            let woundMult = 1;
            if      (hpRatio <= BARBARIAN_WOUND_THRESH_3) woundMult = BARBARIAN_WOUND_MULT_3;
            else if (hpRatio <= BARBARIAN_WOUND_THRESH_2) woundMult = BARBARIAN_WOUND_MULT_2;
            else if (hpRatio <= BARBARIAN_WOUND_THRESH_1) woundMult = BARBARIAN_WOUND_MULT_1;
            if (woundMult > 1) base = Math.floor(base * woundMult);
        }
        return Math.max(1, base);
    }

    /**
     * Sum any active damageBonus effects on a party member (e.g. ice_chill debuff,
     * elixir_wrath). Returns the total modifier to add to the raw damage roll.
     */
    _getPartyMemberDamageMod(m) {
        if (!Array.isArray(m.activeEffects)) return 0;
        let mod = 0;
        for (const x of m.activeEffects) {
            if (typeof x.damageBonus === 'number') mod += x.damageBonus;
        }
        return mod;
    }

    /**
     * Returns true if any living non-summoned party member has an active
     * fountain_summon buff.  Used to gate summon stat bonuses.
     */
    _hasSummonBuff() {
        const now = Date.now();
        for (const m of this.party) {
            if (m.isSummoned || m.health <= 0) continue;
            if (!Array.isArray(m.activeEffects)) continue;
            if (m.activeEffects.some(e => e && e.type === 'fountain_summon'
                    && typeof e.expiresAt === 'number' && e.expiresAt > now)) {
                return true;
            }
        }
        return false;
    }

    /**
     * Like _damageEnemy but pre-multiplied by the active summon damage bonus.
     * Used by _takeSummonTurn so fountain_summon buffs apply to outgoing damage.
     * halfDefense = true: enemy.defense is halved for this hit only (divine soul).
     */
    _damageSummonEnemy(enemy, amount, ignoreDefense = false, halfDefense = false) {
        const mult = this._hasSummonBuff() ? 1.2 : 1.0;
        if (halfDefense && !ignoreDefense) {
            const origDef = enemy.defense;
            enemy.defense = Math.floor((enemy.defense || 0) / 2);
            const result = this._damageEnemy(enemy, Math.round(amount * mult), false);
            enemy.defense = origDef;
            return result;
        }
        return this._damageEnemy(enemy, Math.round(amount * mult), ignoreDefense);
    }

    /**
     * Flat defense bonus to add to an active summon's innate defense when the
     * fountain_summon buff is active.  Returns 20% of summonStats.defense.
     */
    _getSummonDefenseBonus(target) {
        if (!target.isSummoned || !this._hasSummonBuff()) return 0;
        return Math.floor(((target.summonStats && target.summonStats.defense) || 0) * 0.2);
    }

    _skipDead() {
        while (
            this.currentMemberIndex < this.party.length &&
            this.party[this.currentMemberIndex].health <= 0
        ) {
            this.currentMemberIndex++;
        }
    }

    _eName(enemy) {
        // Boss enemies have a custom .name set on spawn (includes crown emoji).
        if (enemy.name) return enemy.name;
        const base = (ENEMY_TYPES[enemy.type] || { name: 'Enemy' }).name;
        return enemy.level && enemy.level > 1 ? `${base} L${enemy.level}` : base;
    }

    /**
     * Warrior L20 Stun Resistance.
     * Rolls resistance for the target; if resisted, logs a message and returns false.
     * If not resisted, sets target.stunned = true and returns true.
     * Pass `skipResist: true` to bypass resistance (e.g. raging barbarian's OWN stun immunity
     * is handled separately; this only applies stun resist for warriors).
     */
    /**
     * Attempt to stun an ENEMY. Checks mega-boss / boss resist before setting
     * `enemy.stunned`. Returns true if the stun landed, false if resisted.
     * All player-inflicted stuns must go through this gate.
     */
    _tryStunEnemy(enemy) {
        if (!enemy || enemy.health <= 0) return false;
        if (enemy.isMegaBoss) {
            this._addLog(`\u{1F451} ${this._eName(enemy)} is immune to stun!`);
            return false;
        }
        if (enemy.isBoss) {
            this._addLog(`\u{1F451} ${this._eName(enemy)} is immune to stun!`);
            return false;
        }
        // Level-based stun resist (all sources): level% chance, capped at 50%
        const levelResist = Math.min(0.50, (enemy.level || 1) * 0.01);
        if (levelResist > 0 && Math.random() < levelResist) {
            this._addLog(`⚡ ${this._eName(enemy)} resists the stun!`);
            return false;
        }
        enemy.stunned = true;
        return true;
    }

    _tryApplyStun(target) {
        if (!target || target.health <= 0) return false;
        // Lich form is immune to stun
        if (target.isLichForm) {
            this._addLog(`💀 ${target.name}'s lich form shrugs off the stun!`);
            return false;
        }
        // Golems with 'stun' in their summonStats.immune array are immune
        if (target.isSummoned && Array.isArray(target.summonStats?.immune)
            && target.summonStats.immune.includes('stun')) {
            this._addLog(`⚙️ ${target.name} is immune to stun!`);
            return false;
        }
        const resistChance = (typeof target.getStunResistChance === 'function')
            ? target.getStunResistChance()
            : 0;
        if (resistChance > 0 && Math.random() < resistChance) {
            this._addLog(`⛏️ ${target.name} shrugs off the stun! (${Math.round(resistChance * 100)}% resist)`);
            return false;
        }
        target.stunned = true;
        return true;
    }

    _addLog(msg) {
        this.log.push(msg);
        if (this._logTarget === 'enemy') {
            this.enemyLog.push(msg);
            if (this.enemyLog.length > 200) this.enemyLog.shift();
        } else {
            this.playerLog.push(msg);
            if (this.playerLog.length > 200) this.playerLog.shift();
        }
    }
    _notify()   { if (this.onUpdate) this.onUpdate(); }
}
