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
    LOOT_TORCH_CHANCE, LOOT_REAGENT_CHANCE,
    CLERIC_REVIVE_MANA_COST, CLERIC_REVIVE_MIN_LEVEL, CLERIC_REVIVE_HEAL_FRAC,
    REAGENT_TIER_COMMON_MAX, REAGENT_TIER_UNCOMMON_MAX,
    REAGENT_BOSS_RARE_MIN, REAGENT_BOSS_RARE_MAX,
    SCATTER_SPLASH_BASE, SCATTER_SPLASH_EVERY, SCATTER_SPLASH_FRACTION,
    ARTIFICER_HEAL_GOLEM_PCT,
    PALADIN_SMITE_MANA_COST,
    PALADIN_SMITE_INSTAKILL_BASE, PALADIN_SMITE_INSTAKILL_PER_LEVEL,
    PALADIN_HEAL_MANA_COST, PALADIN_HEAL_PERCENT,
    RIDER_PROC_CHANCE, RIDER_DOT_DAMAGE_FRACTION,
    RIDER_FIRE_DAMAGE_BONUS_MULT, RIDER_FIRE_BONUS_ROUNDS,
    RIDER_DOT_BASE_ROUNDS, RIDER_DEBUFF_BASE_ROUNDS,
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
        this.enemies = [...enemies];
        if (inventory) this.inventory = inventory;
        this.currentMemberIndex = 0;
        this.log = [];
        this.loot = null;
        this._mageShieldCasterId = null;
        this.xpEarned = 0;
        this.levelUpLogs = [];
        this.turnNumber = 1;
        this.dungeonLevel = Math.max(1, dungeonLevel | 0);

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
    hasFullMana(m) { return m.mana >= MAGIC_MANA_COST; }

    // ────────────────────────────────────────────
    // Player actions
    // ────────────────────────────────────────────

    meleeAttack(targetEnemy) {
        const m = this.currentMember;
        if (!m || m.health <= 0) return;
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
            targetEnemy.stunned = true;
            this._addLog(`\u26A1 ${eName} is STUNNED and will skip next turn!`);
        }

        // Weapon rider proc (fire/acid/poison/lightning/ice) — main-hand then off-hand
        this._applyWeaponRider(m, targetEnemy, dealt);
        this._applyWeaponRider(m, targetEnemy, dealt, 'offhand');

        if (targetEnemy.health <= 0) this._addLog(`${eName} is defeated!`);

        if (isMonk) {
            const ww = MONK_WHIRLWIND_CHANCE + m.getWhirlwindBonus();
            for (const other of this.aliveEnemies) {
                if (other === targetEnemy) continue;
                if (Math.random() < ww) {
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
                curTarget.stunned = true;
                this._addLog(`\u26A1 ${swingName} is STUNNED and will skip next turn!`);
            }
            this._applyWeaponRider(m, curTarget, sDealt);
            this._applyWeaponRider(m, curTarget, sDealt, 'offhand');
            if (curTarget.health <= 0) this._addLog(`${swingName} is defeated!`);
        }

        this._advancePlayerTurn();
    }

    rangedAttack(targetEnemy) {
        const m = this.currentMember;
        if (!m || m.health <= 0) return;

        const exhausted = m.stamina < RANGED_STAMINA_COST;
        m.stamina = Math.max(0, m.stamina - RANGED_STAMINA_COST);

        // Ranger favored enemy check
        const favoredTag = m.classId === 'ranger' ? m.favoredEnemy : null;
        const targetDef = ENEMY_TYPES[targetEnemy.type];
        const targetTags = (targetDef && targetDef.tags) ? targetDef.tags : [];
        const isFavored = favoredTag && targetTags.includes(favoredTag);

        // Instakill: 1% per 3 ranger levels vs favored enemy
        if (isFavored) {
            const instakillChance = m.getFavoredEnemyInstakillChance();
            if (instakillChance > 0 && Math.random() < instakillChance) {
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
            const xtFavored = favoredTag && xtTags.includes(favoredTag);
            if (xtFavored) {
                const xtInstakill = m.getFavoredEnemyInstakillChance();
                if (xtInstakill > 0 && Math.random() < xtInstakill) {
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
     * then N splash hits at SCATTER_SPLASH_FRACTION (50%) of rolled damage.
     * Splash count = SCATTER_SPLASH_BASE + floor(level / SCATTER_SPLASH_EVERY).
     *   L1 → 2 splashes, L5 → 3, L10 → 4, L15 → 5, …
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
        // Build splash target pool: alive enemies excluding the primary, then
        // fall back to any alive enemy so leftover shots still connect.
        for (let i = 0; i < splashCount; i++) {
            const others = this.aliveEnemies.filter(e => e !== targetEnemy);
            let t = others[i % Math.max(1, others.length)];
            if (!t || t.health <= 0) t = this.aliveEnemies[0];
            if (!t || t.health <= 0) break;

            let sdmg = randomInt(RANGED_DAMAGE_MIN, RANGED_DAMAGE_MAX);
            sdmg += m.getWeaponBonus('ranged');
            sdmg += m.getClassDamageBonus('ranged');
            if (exhausted) sdmg = Math.max(1, Math.floor(sdmg / 2));
            sdmg = Math.max(1, Math.floor(sdmg * SCATTER_SPLASH_FRACTION));

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

        const exhausted = m.mana < MAGIC_MANA_COST;
        m.mana = Math.max(0, m.mana - MAGIC_MANA_COST);

        let dmg = randomInt(MAGIC_DAMAGE_MIN, MAGIC_DAMAGE_MAX);
        dmg += m.getWeaponBonus('magic');
        dmg += m.getClassDamageBonus('magic');
        if (exhausted) dmg = Math.max(1, Math.floor(dmg / 2));

        const suffix = exhausted ? ' (exhausted!)' : '';
        this._addLog(`${m.name} casts a spell for ${dmg} damage to all enemies!${suffix}`);

        const stunChance = m.getMagicStunBonus();

        for (const e of this.aliveEnemies) {
            this._damageEnemy(e, dmg);
            if (e.health > 0 && stunChance > 0 && Math.random() < stunChance) {
                e.stunned = true;
                this._addLog(`\u26A1 ${this._eName(e)} is stunned by arcane force!`);
            }
            if (e.health <= 0) this._addLog(`${this._eName(e)} is defeated!`);
            // Necromancer drain: roll independently per enemy hit
            if (m.classId === 'necromancer' && Math.random() < NECRO_LIFE_DRAIN_CHANCE) {
                const amount = NECRO_LIFE_DRAIN_AMOUNT + m.getDrainBonus();
                this._drainHeal(m, amount);
            }
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
        if (Math.random() < instakillChance) {
            targetEnemy.health = 0;
            this._addLog(`\u{1F5E1}\uFE0F ${m.name} BACKSTABS ${this._eName(targetEnemy)} — INSTANT KILL!`);
            this._addLog(`${this._eName(targetEnemy)} is defeated!`);
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

    /**
     * Mage Shield (level 3+). Costs MAGE_SHIELD_MANA_COST mana.
     * Applies a defense buff to all back-row party members for several rounds.
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

        const backRow = this.party.filter(t => t.health > 0 && t.row === 'back');
        for (const t of backRow) {
            t.activeEffects = (t.activeEffects || []).filter(e => e.type !== 'mage_shield');
            t.activeEffects.push({ type: 'mage_shield', defenseBonus: bonus, rounds, casterId: m.id });
        }

        this._addLog(`\u{1F6E1}\uFE0F ${m.name} raises an Arcane Shield! Back row gains +${bonus} def for ${rounds} rounds.`);
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
        if (m.mana < NECRO_SUMMON_MANA_COST) {
            this._addLog(`${m.name} has too little mana to summon (needs ${NECRO_SUMMON_MANA_COST}).`);
            return;
        }

        const unlocked = getNecromancerUnlocked(m.level);
        const idx = Math.max(0, Math.min(tierIndex | 0, unlocked.length - 1));
        const effectiveTierIndex = Math.max(0, Math.min(idx, UNDEAD_TIERS.length - 1));
        const scalingIndex = Math.max(effectiveTierIndex, Math.floor((m.level - 1) / 2));

        const preset = UNDEAD_TIERS[effectiveTierIndex];
        const stats = rollUndeadStats(scalingIndex);

        m.mana -= NECRO_SUMMON_MANA_COST;

        const undead = new PartyMember({
            name: `${m.name}'s ${preset.name}`,
            classId:   preset.portraitClass,
            speciesId: preset.portraitSpecies,
            maxHealth: stats.maxHealth,
            maxStamina: stats.maxStamina,
            maxMana:    stats.maxMana,
            portraitSeed: Math.floor(Math.random() * 100000),
            isSummoned: true,
            summonType: preset.id,
            summonerId: m.id,
            canBeHealed: false, // undead — only life-drain heals them
            row: 'front', // undead fight on the front line
            summonStats: {
                meleeMin: stats.meleeMin,
                meleeMax: stats.meleeMax,
                defense:  stats.defense,
            },
        });
        this.party.push(undead);

        this._addLog(`\u{1F480} ${m.name} summons a ${preset.name} to fight alongside the party!`);
        this._registerNewSummon(undead);
        this._advancePlayerTurn();
    }

    /** Legacy alias — old saves / code paths may call summonSkeleton(). */
    summonSkeleton() { this.summonUndead(0); }

    /**
     * Ranger OR druid summon — bear / eagle / pixie.
     * @param {'bear'|'eagle'|'pixie'} beastId
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

        const stats = rollBeastStats(beastId, m.level);
        m.mana -= cost;

        const beast = new PartyMember({
            name: `${m.name}'s ${preset.name}`,
            classId:   preset.portraitClass,
            speciesId: preset.portraitSpecies,
            maxHealth: stats.maxHealth,
            maxStamina: stats.maxStamina,
            maxMana:    stats.maxMana,
            portraitSeed: Math.floor(Math.random() * 100000),
            isSummoned: true,
            summonType: preset.id,
            summonerId: m.id,
            canBeHealed: true,
            // Bear and wolf are melee brawlers → front row; eagle and pixie stay back.
            row: (beastId === 'bear' || beastId === 'wolf') ? 'front' : 'back',
            summonStats: {
                meleeMin:  stats.meleeMin,  meleeMax:  stats.meleeMax,
                rangedMin: stats.rangedMin, rangedMax: stats.rangedMax,
                magicMin:  stats.magicMin,  magicMax:  stats.magicMax,
                defense:   stats.defense,
                beastKind: beastId,
            },
        });
        this.party.push(beast);

        this._addLog(`${preset.icon} ${m.name} summons a ${preset.name}!`);
        this._registerNewSummon(beast);
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
        if ((cost.gold || 0) > 0 && inv.gold < cost.gold) {
            this._addLog(`Not enough gold to forge a ${tier.name} (needs ${cost.gold}g).`);
            return null;
        }
        if ((cost.common || 0) > 0 && !inv.hasItem('reagent_common', cost.common)) {
            this._addLog(`Not enough common reagents (needs ${cost.common}).`);
            return null;
        }
        if ((cost.uncommon || 0) > 0 && !inv.hasItem('reagent_uncommon', cost.uncommon)) {
            this._addLog(`Not enough uncommon reagents (needs ${cost.uncommon}).`);
            return null;
        }
        if ((cost.rare || 0) > 0 && !inv.hasItem('reagent_rare', cost.rare)) {
            this._addLog(`Not enough rare reagents (needs ${cost.rare}).`);
            return null;
        }

        // Deduct costs (now that all checks passed).
        if ((cost.gold     || 0) > 0) inv.removeGold(cost.gold);
        if ((cost.common   || 0) > 0) inv.removeItem('reagent_common',   cost.common);
        if ((cost.uncommon || 0) > 0) inv.removeItem('reagent_uncommon', cost.uncommon);
        if ((cost.rare     || 0) > 0) inv.removeItem('reagent_rare',     cost.rare);

        const preset = GOLEM_PRESETS[tierId];
        const stats = rollGolemStats(tierId, m.level);

        const golem = new PartyMember({
            name: `${m.name}'s ${tier.name}`,
            classId:   preset.portraitClass,
            speciesId: preset.portraitSpecies,
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
                regenPercent:    stats.regenPercent,
                reflectChance:   stats.reflectChance,
                reflectFraction: stats.reflectFraction,
                slamEvery:       stats.slamEvery,
                slamStunChance:  stats.slamStunChance,
                cleaveTargets:   stats.cleaveTargets,
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
        if (m.mana < PALADIN_SMITE_MANA_COST) {
            this._addLog(`${m.name} has too little mana to Smite (needs ${PALADIN_SMITE_MANA_COST}).`);
            return;
        }

        m.mana = Math.max(0, m.mana - PALADIN_SMITE_MANA_COST);

        const typeDef = ENEMY_TYPES[targetEnemy.type] || {};
        const tags = Array.isArray(typeDef.tags) ? typeDef.tags : [];
        const isSmitable = tags.indexOf('undead') !== -1 || tags.indexOf('demon') !== -1;

        const eName = this._eName(targetEnemy);

        // Instakill roll (holy purge).
        if (isSmitable) {
            const chance = Math.min(1, PALADIN_SMITE_INSTAKILL_BASE + PALADIN_SMITE_INSTAKILL_PER_LEVEL * m.level);
            if (Math.random() < chance) {
                const overkill = targetEnemy.health;
                targetEnemy.health = 0;
                this._addLog(`\u2728 ${m.name} SMITES ${eName} with holy light! (${overkill} damage — purged!)`);
                this._addLog(`${eName} is defeated!`);
                this._advancePlayerTurn();
                return;
            }
        }

        // Otherwise a flat holy strike: melee roll + paladin scaling.
        let dmg = this._rollPlayerMeleeDamage(m);
        // Divine flavour bonus against smitable foes — +2 per paladin level.
        if (isSmitable) dmg += 2 * m.level;
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

        const scale   = Math.max(1, Math.floor(m.level / 5));
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
            const dealt = this._damageEnemy(e, dmg);
            const eName = this._eName(e);
            this._addLog(`  🎵 ${eName} takes ${dealt} magic dmg (-${debuff} atk/-${debuff} def)`);
            if (e.health <= 0) this._addLog(`${eName} is defeated!`);

            // 50% stun
            if (Math.random() < 0.5) {
                e.stunned = true;
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
        const targets = this.aliveEnemies;
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
                    const dmg = randomInt(stats.meleeMin ?? 4, stats.meleeMax ?? 10);
                    this._addLog(`\u{1FAA8} ${m.name} SLAMS the ground — shockwave rocks the battlefield!`);
                    for (const e of [...targets]) {
                        if (e.health <= 0) continue;
                        const dealt = this._damageEnemy(e, dmg);
                        this._addLog(`  ↪️ ${this._eName(e)} takes ${dealt} damage!`);
                        if (e.health > 0 && stats.slamStunChance && Math.random() < stats.slamStunChance) {
                            e.stunned = true;
                            this._addLog(`  \u26A1 ${this._eName(e)} is stunned!`);
                        }
                        if (e.health <= 0) this._addLog(`${this._eName(e)} is defeated!`);
                    }
                    return;
                }
            }

            // Default golem action: melee single target, with optional cleave.
            const primary = targets[Math.floor(Math.random() * targets.length)];
            let dmg = randomInt(stats.meleeMin ?? 3, stats.meleeMax ?? 8);
            const dealt = this._damageEnemy(primary, dmg);
            const preset = GOLEM_PRESETS[m.summonType];
            const icon = (preset && preset.icon) || '\u{1F9F1}';
            this._addLog(`${icon} ${m.name} hammers ${this._eName(primary)} for ${dealt}!`);
            if (primary.health <= 0) this._addLog(`${this._eName(primary)} is defeated!`);

            // Iron Golem — cleave additional targets at same damage roll.
            if (stats.cleaveTargets && stats.cleaveTargets > 0) {
                const extras = this.aliveEnemies.filter(e => e !== primary);
                for (let i = 0; i < stats.cleaveTargets && i < extras.length; i++) {
                    const t = extras[i];
                    if (!t || t.health <= 0) continue;
                    const cleaveDmg = randomInt(stats.meleeMin ?? 3, stats.meleeMax ?? 8);
                    const cleaveDealt = this._damageEnemy(t, cleaveDmg);
                    this._addLog(`  ↪️ cleave hits ${this._eName(t)} for ${cleaveDealt}!`);
                    if (t.health <= 0) this._addLog(`${this._eName(t)} is defeated!`);
                }
            }
            return;
        }

        const beastKind = stats.beastKind;

        if (beastKind === 'pixie') {
            const dmg = randomInt(stats.magicMin ?? 1, stats.magicMax ?? 3);
            this._addLog(`\u{1F9DA} ${m.name} whirls a storm of faerie dust for ${dmg}!`);
            for (const e of targets) {
                this._damageEnemy(e, dmg);
                if (e.health <= 0) this._addLog(`${this._eName(e)} is defeated!`);
            }
            return;
        }

        if (beastKind === 'eagle') {
            const t = targets[Math.floor(Math.random() * targets.length)];
            let dmg = randomInt(stats.rangedMin ?? 2, stats.rangedMax ?? 6);
            const ranger = this.party.find(p => p.id === m.summonerId);
            const critChance = ranger ? ranger.getRangedCritBonus() + RANGED_CRIT_CHANCE : RANGED_CRIT_CHANCE;
            const isCrit = Math.random() < critChance;
            if (isCrit) dmg *= 2;
            const dealt = this._damageEnemy(t, dmg);
            this._addLog(`\u{1F985} ${m.name} dives on ${this._eName(t)} for ${dealt}!${isCrit ? ' \u{1F4A5} CRIT!' : ''}`);
            if (t.health <= 0) this._addLog(`${this._eName(t)} is defeated!`);
            return;
        }

        if (beastKind === 'wolf') {
            const t = targets[Math.floor(Math.random() * targets.length)];
            const dmg = randomInt(stats.meleeMin ?? 2, stats.meleeMax ?? 7);
            const dealt = this._damageEnemy(t, dmg);
            this._addLog(`\u{1F43A} ${m.name} bites ${this._eName(t)} for ${dealt}!`);
            // Apply bleed: 50% of dealt damage per round for 3 rounds
            if (t.health > 0 && dealt > 0) {
                const bleedDmg = Math.max(1, Math.round(dealt * 0.5));
                this._applyEnemyEffect(t, { type: 'bleed', damage: bleedDmg, rounds: 3 });
                this._addLog(`\u{1F7E5} ${this._eName(t)} is Bleeding! (${bleedDmg}/round)`);
            }
            if (t.health <= 0) this._addLog(`${this._eName(t)} is defeated!`);
            return;
        }

        if (beastKind === 'bear') {
            const t = targets[Math.floor(Math.random() * targets.length)];
            const dmg = randomInt(stats.meleeMin ?? 2, stats.meleeMax ?? 8);
            const dealt = this._damageEnemy(t, dmg);
            this._addLog(`\u{1F43B} ${m.name} mauls ${this._eName(t)} for ${dealt}!`);
            const ranger = this.party.find(p => p.id === m.summonerId);
            const stunChance = ranger ? RANGED_CRIT_CHANCE + ranger.getRangedCritBonus() : RANGED_CRIT_CHANCE;
            if (t.health > 0 && Math.random() < stunChance) {
                t.stunned = true;
                this._addLog(`\u26A1 ${this._eName(t)} is stunned!`);
            }
            if (t.health <= 0) this._addLog(`${this._eName(t)} is defeated!`);
            return;
        }

        // Undead / fallback: melee single-target
        const t = targets[Math.floor(Math.random() * targets.length)];
        const dmg = randomInt(stats.meleeMin ?? 2, stats.meleeMax ?? 8);
        const dealt = this._damageEnemy(t, dmg);
        this._addLog(`${m.name} strikes ${this._eName(t)} for ${dealt}!`);
        if (t.health <= 0) this._addLog(`${this._eName(t)} is defeated!`);
    }

    // ────────────────────────────────────────────
    // Initiative helpers
    // ────────────────────────────────────────────

    /**
     * Roll initiative for a single participant.
     * Rogues, monks, and rangers get +1.
     * Golems and undead summons get -1. Enemy undead (tagged) get -1.
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
            if (ref.isSummoned && ref.summonStats) {
                const ss = ref.summonStats;
                const isGolem  = Boolean(ss.tierId);
                const isUndead = !ss.beastKind && !ss.tierId;
                if (isGolem || isUndead) bonus -= 1;
            }
            // Haste song initiative bonus
            const hasteEffect = Array.isArray(ref.activeEffects)
                ? ref.activeEffects.find(e => e && e.type === 'bard_song_haste')
                : null;
            if (hasteEffect && typeof hasteEffect.initiativeBonus === 'number') {
                bonus += hasteEffect.initiativeBonus;
            }
        } else {
            const typeDef = ENEMY_TYPES[ref.type] || {};
            const tags = Array.isArray(typeDef.tags) ? typeDef.tags : [];
            if (tags.includes('undead')) bonus -= 1;
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
     * Register a newly summoned member into the initiative order at the
     * correct sorted position. Flagged to skip this round — acts next round.
     * Only runs when combat is actively in progress.
     */
    _registerNewSummon(member) {
        if (this.phase !== 'PLAYER_TURN' && this.phase !== 'ENEMY_TURN') return;
        if (!this._initiativeOrder.length) return;
        const init = this._rollInitiative(member, 'party');
        this._addLog(`\u26A1 ${member.name} enters the fray (initiative ${init}) — acts next round.`);
        // Find insertion position (keep sorted descending)
        let insertIdx = this._initiativeOrder.length;
        for (let i = 0; i < this._initiativeOrder.length; i++) {
            if (init > this._initiativeOrder[i].init) { insertIdx = i; break; }
        }
        this._initiativeOrder.splice(insertIdx, 0, { kind: 'party', ref: member, init, skipThisRound: true });
        // If we inserted before the current turn, adjust index to keep position
        if (insertIdx <= this._initTurnIdx) this._initTurnIdx++;
    }

    // ────────────────────────────────────────────
    // Turn flow
    // ────────────────────────────────────────────

    /**
     * Start a new initiative round: reset defending, tick all effects,
     * then advance through the order.
     */
    _beginInitiativeRound() {
        for (const m of this.party) m._defending = false;

        this._tickPartyEffects();
        if (this.aliveParty.length === 0) {
            this.phase = 'DEFEAT';
            this._addLog('--- Your party has been defeated! ---');
            this._notify();
            return;
        }

        this._tickEnemyEffects();
        if (this.aliveEnemies.length === 0) {
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
                this._executeOneEnemyTurn(ref);
                if (this.phase === 'DEFEAT' || this.phase === 'FLED' || this.phase === 'VICTORY') return;
                if (this.phase === 'NEED_PROMOTION') return; // _initTurnIdx already handled
                if (this.aliveEnemies.length === 0) { this._finishVictory(); return; }
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

            // Stun-skip
            if (m.stunned) {
                this._addLog(`${m.name} is stunned and cannot act!`);
                m.stunned = false;
                this._initTurnIdx++;
                continue;
            }

            // Summoned AI auto-turn
            if (m.isSummoned) {
                this._addLog(`--- ${m.name}'s turn ---`);
                this._takeSummonTurn(m);
                if (this.aliveEnemies.length === 0) { this._finishVictory(); return; }
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
        if (this.aliveEnemies.length === 0) {
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

        // Stun skip.
        if (e.stunned) {
            this._addLog(`${eName} is stunned and cannot act!`);
            e.stunned = false;
            return;
        }

        const dlvl = this.dungeonLevel;
        const lvlBoost      = Math.max(0, dlvl - 1);
        const lvlThreeBonus = Math.max(0, dlvl - (MONSTER_DAMAGE_BONUS_THRESHOLD - 1));
        const typeDef = ENEMY_TYPES[e.type] || {};

        // AoE magic (cultist) path — hits all party members.
        if (typeDef.aoeMagic && e.mana >= MONSTER_MAGIC_MANA_COST) {
            e.mana -= MONSTER_MAGIC_MANA_COST;
            const dmin = MONSTER_MAGIC_DAMAGE_MIN + MONSTER_DAMAGE_PER_LEVEL * lvlBoost + MONSTER_DAMAGE_BONUS_PER_LEVEL * lvlThreeBonus;
            const dmax = MONSTER_MAGIC_DAMAGE_MAX + MONSTER_DAMAGE_PER_LEVEL * lvlBoost + MONSTER_DAMAGE_BONUS_PER_LEVEL * lvlThreeBonus;
            let dmg = randomInt(dmin, dmax);
            dmg = Math.max(1, Math.round(dmg * MONSTER_DAMAGE_MULTIPLIER));
            dmg = Math.max(1, dmg + this._getEnemyDamageMod(e));
            this._addLog(`\u{1F52E} ${eName} unleashes a roaring chant of dark power — the whole party is caught in the blast!`);
            const aoeTargets = this.aliveParty.slice();
            for (const target of aoeTargets) {
                this._applyEnemyHit(e, target, dmg, 'magic', { aoe: true });
                if (this.aliveParty.length === 0) break;
            }
        } else {
            const target = liveFront[Math.floor(Math.random() * liveFront.length)];
            if (e.stamina >= MONSTER_MELEE_STAMINA_COST) {
                e.stamina -= MONSTER_MELEE_STAMINA_COST;
                const dmin = MONSTER_MELEE_DAMAGE_MIN + MONSTER_DAMAGE_PER_LEVEL * lvlBoost + MONSTER_DAMAGE_BONUS_PER_LEVEL * lvlThreeBonus;
                const dmax = MONSTER_MELEE_DAMAGE_MAX + MONSTER_DAMAGE_PER_LEVEL * lvlBoost + MONSTER_DAMAGE_BONUS_PER_LEVEL * lvlThreeBonus;
                let dmg = randomInt(dmin, dmax);
                dmg = Math.max(1, Math.round(dmg * MONSTER_DAMAGE_MULTIPLIER));
                dmg = Math.max(1, dmg + this._getEnemyDamageMod(e));
                this._applyEnemyHit(e, target, dmg, 'melee');
            } else if (e.mana >= MONSTER_MAGIC_MANA_COST) {
                e.mana -= MONSTER_MAGIC_MANA_COST;
                const dmin = MONSTER_MAGIC_DAMAGE_MIN + MONSTER_DAMAGE_PER_LEVEL * lvlBoost + MONSTER_DAMAGE_BONUS_PER_LEVEL * lvlThreeBonus;
                const dmax = MONSTER_MAGIC_DAMAGE_MAX + MONSTER_DAMAGE_PER_LEVEL * lvlBoost + MONSTER_DAMAGE_BONUS_PER_LEVEL * lvlThreeBonus;
                let dmg = randomInt(dmin, dmax);
                dmg = Math.max(1, Math.round(dmg * MONSTER_DAMAGE_MULTIPLIER));
                dmg = Math.max(1, dmg + this._getEnemyDamageMod(e));
                this._applyEnemyHit(e, target, dmg, 'magic');
            } else {
                this._applyEnemyHit(e, target, 1, 'weak');
            }
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
        if (attackKind === 'melee') {
            const shieldChance = target.getShieldBlockChance();
            if (shieldChance > 0 && Math.random() < shieldChance) {
                this._addLog(`\u{1F6E1}\uFE0F ${target.name}'s shield blocks ${eName}'s attack!`);
                return;
            }
        }

        const armorBlock = target.getArmorBlocking();
        const innateDef  = target.getTotalDefense();

        let dmg = rawDmg;
        if (target._defending) dmg = Math.max(1, Math.floor(dmg / 2));
        dmg = Math.max(1, dmg - armorBlock - innateDef);

        // Phase 8 rule 6: monks reduce all incoming damage by their current
        // dodge %, even when the dodge roll failed (or wasn't eligible). This
        // compensates for their cloth-only / no-shield restrictions.
        if (monkDodgePct > 0) {
            const reduced = Math.round(dmg * (1 - monkDodgePct));
            dmg = Math.max(1, reduced);
        }

        if (attackKind === 'melee') {
            const details = [];
            if (target._defending) details.push('defended');
            if (armorBlock > 0)    details.push(`${armorBlock} armor`);
            if (innateDef > 0)     details.push(`${innateDef} def`);
            const detailStr = details.length ? ` (${details.join(', ')})` : '';
            this._addLog(`${eName} attacks ${target.name} for ${dmg} damage!${detailStr}`);
        } else if (attackKind === 'magic') {
            const aoe = opts.aoe ? ' (AoE)' : '';
            this._addLog(`${eName} blasts ${target.name} with dark magic for ${dmg}!${aoe}`);
        } else {
            this._addLog(`${eName} weakly swipes at ${target.name} for ${dmg} damage.`);
        }

        target.health = Math.max(0, target.health - dmg);

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

        // ── Iron Golem (and anything else with summonStats.immune) — skip
        //    poison/stun/web attempts entirely. We compute once and branch.
        const immune = (target.isSummoned && target.summonStats && target.summonStats.immune) || null;
        const isImmune = (tag) => Array.isArray(immune) && immune.indexOf(tag) !== -1;

        // Poison (melee only — matches spider/slime/basilisk behaviour)
        if (attackKind === 'melee'
            && target.health > 0
            && !isImmune('poison')
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
            && typeDef.stunChance
            && Math.random() < typeDef.stunChance) {
            target.stunned = true;
            this._addLog(`\u26A1 ${target.name} is STUNNED by ${eName}!`);
        }

        // Phase 11 — Web (melee only). Locks the target out of their next
        // WEB_DURATION_ROUNDS turns. Uses the same per-turn skip mechanic
        // as stun via a round counter on the party member.
        if (attackKind === 'melee'
            && target.health > 0
            && !isImmune('web')
            && typeDef.webChance
            && Math.random() < typeDef.webChance) {
            target.webbedRounds = Math.max(target.webbedRounds || 0, WEB_DURATION_ROUNDS);
            this._addLog(`\u{1F578}\uFE0F ${target.name} is ENSNARED in sticky webbing by ${eName}! (${WEB_DURATION_ROUNDS} rds)`);
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
                target.stunned = true;
                this._addLog(`\u26A1 ${target.name} is dazed by the blast!`);
            }
        }

        if (target.health <= 0) {
            this._addLog(`${target.name} has fallen!`);
        }
    }

    // ────────────────────────────────────────────
    // Damage / effect ticks
    // ────────────────────────────────────────────

    /** Apply raw damage to an enemy after its entangle defense debuff is taken into account. */
    _damageEnemy(enemy, amount, ignoreDefense = false) {
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
    _getEnemyDamageMod(enemy) {
        const effects = (enemy && enemy.activeEffects) || [];
        let mod = 0;
        for (const x of effects) {
            if (typeof x.damageBonus === 'number') mod += x.damageBonus;
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

        switch (rider) {
            case 'fire': {
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
                // Undead enemies are immune to poison
                const enemyTypeDef = ENEMY_TYPES[enemy.type];
                if (Array.isArray(enemyTypeDef?.tags) && enemyTypeDef.tags.includes('undead')) {
                    this._addLog(`\u{1F480} ${eName} is undead \u2014 immune to poison!`);
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
                enemy.stunned = true;
                refresh({
                    type: 'shocked',
                    rounds: debuffRounds,
                    damageBonus: -debuffMag,
                });
                this._addLog(`\u26A1 ${eName} is shocked! (stunned 1 rd, -${debuffMag} dmg for ${debuffRounds} rds)`);
                break;
            }
            case 'ice': {
                enemy.stunned = true;
                refresh({
                    type: 'chilled',
                    rounds: debuffRounds,
                    defenseBonus: -debuffMag,
                });
                this._addLog(`\u2744\uFE0F ${eName} is frozen! (stunned 1 rd, -${debuffMag} def for ${debuffRounds} rds)`);
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

            let totalPoison = 0;
            for (const e of effects) {
                if (e.type === 'poison' && e.rounds > 0) {
                    totalPoison += (e.damage || 0);
                    e.rounds--;
                }
                // Tick down mage shield duration
                if (e.type === 'mage_shield' && e.rounds > 0) {
                    e.rounds--;
                    if (e.rounds <= 0 && this._mageShieldCasterId === e.casterId) {
                        this._mageShieldCasterId = null;
                    }
                }
            }
            if (totalPoison > 0) {
                m.health = Math.max(0, m.health - totalPoison);
                this._addLog(`\u{1F7E2} ${m.name} suffers ${totalPoison} poison damage!`);
                if (m.health <= 0) this._addLog(`${m.name} has fallen to the poison!`);
            }
            m.expireEffects();
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
            const DOT_TYPES = { burn: '\u{1F525} burn', acid_dot: '\u{1F7E2} acid', poison_weapon: '\u{1F40D} venom', bleed: '\u{1F7E5} bleed' };
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

            // Decrement and expire.
            for (const fx of effects) {
                if ('rounds' in fx && fx.rounds > 0) fx.rounds--;
            }
            e.activeEffects = effects.filter(x => !('rounds' in x) || x.rounds > 0);
        }
    }

    // ────────────────────────────────────────────
    // Victory / loot
    // ────────────────────────────────────────────

    _finishVictory() {
        this.phase = 'VICTORY';
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
            totalXP += XP_PER_MONSTER_LEVEL * lvl;
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
            totalGold += randomInt(LOOT_GOLD_MIN, LOOT_GOLD_MAX) * lvl;

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
            // Phase 8 rule 20/21 — 2% chance of a trinket bonus drop.
            if (Math.random() < TRINKET_DROP_CHANCE + dlvlBoost) {
                items.push({ itemId: randomTrinketDrop(), quantity: 1 });
            }
            // Phase 10 — 3% torch, 5% magical reagent per slain enemy.
            if (Math.random() < LOOT_TORCH_CHANCE) {
                const existing = items.find(i => i.itemId === 'torch');
                if (existing) existing.quantity++;
                else items.push({ itemId: 'torch', quantity: 1 });
            }
            // Tiered reagents — one roll per enemy, tier depends on enemy level.
            if (Math.random() < LOOT_REAGENT_CHANCE) {
                const reagentId = lvl <= REAGENT_TIER_COMMON_MAX   ? 'reagent_common'
                                : lvl <= REAGENT_TIER_UNCOMMON_MAX ? 'reagent_uncommon'
                                :                                    'reagent_rare';
                const existing = items.find(i => i.itemId === reagentId);
                if (existing) existing.quantity++;
                else items.push({ itemId: reagentId, quantity: 1 });
            }
            // Bosses (flagged via `e.isBoss`) always drop 1-2 extra rare reagents.
            if (e.isBoss) {
                const n = randomInt(REAGENT_BOSS_RARE_MIN, REAGENT_BOSS_RARE_MAX);
                if (n > 0) {
                    const existing = items.find(i => i.itemId === 'reagent_rare');
                    if (existing) existing.quantity += n;
                    else items.push({ itemId: 'reagent_rare', quantity: n });
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
        return Math.max(1, base);
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
        const base = (ENEMY_TYPES[enemy.type] || { name: 'Enemy' }).name;
        return enemy.level && enemy.level > 1 ? `${base} L${enemy.level}` : base;
    }

    _addLog(msg) { this.log.push(msg); }
    _notify()   { if (this.onUpdate) this.onUpdate(); }
}
