import {
    ENEMY_TYPES,
    MELEE_STAMINA_COST,
    RANGED_STAMINA_COST,
    MAGIC_MANA_COST,
    RANGED_CRIT_CHANCE,
    MELEE_STUN_CHANCE,
    BACKSTAB_STAMINA_MULT, BACKSTAB_DAMAGE_MULT,
    BACKSTAB_DAMAGE_PER_LEVEL, BACKSTAB_INSTAKILL_CHANCE,
    CLERIC_HEAL_MANA_COST, CLERIC_HEAL_PERCENT,
    CLERIC_REVIVE_MANA_COST, CLERIC_REVIVE_MIN_LEVEL, CLERIC_REVIVE_HEAL_FRAC,
    CLERIC_TURN_UNDEAD_MIN_LEVEL, CLERIC_TURN_UNDEAD_MANA_COST,
    CLERIC_TURN_UNDEAD_DEBUFF_BASE, CLERIC_TURN_UNDEAD_DEBUFF_EVERY,
    MAGE_SHIELD_MANA_COST, MAGE_SHIELD_BASE_DEF, MAGE_SHIELD_BASE_ROUNDS, MAGE_SHIELD_BONUS_EVERY, MAGE_SHIELD_MIN_LEVEL,
    NECRO_SUMMON_MANA_COST, NECRO_LIFE_DRAIN_CHANCE, NECRO_LIFE_DRAIN_AMOUNT,
    NECRO_DARK_HARVEST_HP_FRAC, NECRO_DARK_HARVEST_ST_FRAC, NECRO_DARK_HARVEST_MANA_FRAC,
    MONK_MELEE_MANA_COST, MONK_WHIRLWIND_CHANCE,
    MONK_DODGE_CHANCE, MONK_DODGE_STAMINA_COST, MONK_DODGE_MANA_COST,
    RANGER_SUMMON_MANA_COST,
    BARD_SONG_MANA_COST, BARD_SONG_BASE_BONUS, BARD_DISRUPT_MANA_COST,
    DRUID_ENTANGLE_MANA_COST, DRUID_ENTANGLE_BASE_DEBUFF, DRUID_ENTANGLE_CHANCE,
    DRUID_SUMMON_MANA_COST,
    SCATTER_SPLASH_BASE, SCATTER_SPLASH_EVERY, SCATTER_SPLASH_FRACTION,
    ARTIFICER_DRONE_UNLOCK_LEVEL, ARTIFICER_DRONE_CHANCE_CAP,
    PALADIN_SMITE_MANA_COST,
    PALADIN_SMITE_INSTAKILL_BASE, PALADIN_SMITE_INSTAKILL_PER_LEVEL,
    PALADIN_HEAL_MANA_COST, PALADIN_HEAL_PERCENT,
    PALADIN_FIRE_AURA_MANA_PER_ROUND,
    PALADIN_DRAGONSLAYER_UNLOCK_LEVEL, PALADIN_DRAGONSLAYER_MANA_PER_ROUND,
    ARTIFICER_HEAL_GOLEM_PCT, ARTIFICER_FREE_REPAIR_CHANCE_PER_LEVEL,
    BARBARIAN_RAGE_STAMINA_COST,
    GOLEM_TIERS,
    WARRIOR_DEFEND_MODE_UNLOCK_LEVEL,
    MONK_QUIVERING_PALM_UNLOCK_LEVEL,
    MONK_QUIVERING_PALM_DURATION_BASE, MONK_QUIVERING_PALM_DURATION_PER_10LV,
    MONK_QUIVERING_PALM_STAMINA_MULT, MONK_QUIVERING_PALM_MANA_MULT,
    PALADIN_L20_UNLOCK_LEVEL,
    PALADIN_AOE_SMITE_MANA_MULT, PALADIN_AOE_SMITE_INSTAKILL_MULT,
    PALADIN_L30_UNLOCK_LEVEL,
    PALADIN_AURA_RIGHTEOUSNESS_REDUCTION, PALADIN_AURA_RIGHTEOUSNESS_HEAL_FRAC,
    PALADIN_DIVINE_JUDGMENT_STAMINA_COST, PALADIN_DIVINE_JUDGMENT_MANA_COST,
    PALADIN_DIVINE_JUDGMENT_BASE_PCT, PALADIN_DIVINE_JUDGMENT_PER_LEVEL,
    PALADIN_DIVINE_JUDGMENT_BOSS_DIVISOR, PALADIN_DIVINE_JUDGMENT_MEGABOSS_DIVISOR,
    CLERIC_MASS_REGEN_UNLOCK_LEVEL, CLERIC_MASS_REGEN_MANA_COST,
    CLERIC_MASS_REGEN_BASE_PCT, CLERIC_MASS_REGEN_PER_3_LEVELS,
    CLERIC_MASS_REGEN_DURATION_PER_4LV,
    CLERIC_MASS_REVIVE_UNLOCK_LEVEL, CLERIC_MASS_REVIVE_MANA_COST,
    CLERIC_MASS_REVIVE_HEAL_BASE, CLERIC_MASS_REVIVE_HEAL_PER_3LV,
    CLERIC_MASS_REVIVE_COUNT_DIVISOR,
    CLERIC_CLEANSE_UNLOCK_LEVEL, CLERIC_CLEANSE_MANA_PER_STATE,
    CLERIC_SPIRITUAL_WEAPON_UNLOCK_LEVEL, CLERIC_SPIRITUAL_WEAPON_SUMMON_COST,
    CLERIC_SPIRITUAL_WEAPON_UPKEEP, CLERIC_SPIRITUAL_WEAPON_ATK_DIVISOR,
    CLERIC_BANISHMENT_UNLOCK_LEVEL, CLERIC_BANISHMENT_MANA_COST,
    CLERIC_BANISHMENT_TAGS,
    BARD_CHARM_UNLOCK_LEVEL, BARD_CHARM_MANA_COST,
    BARD_CHARM_BASE_CHANCE, BARD_CHARM_CHANCE_PER_2_LV,
    BARD_CHARM_DURATION_DIVISOR, BARD_CHARM_IMMUNE_TAGS,
    BARD_RALLYING_MELODY_UNLOCK_LEVEL, BARD_RALLYING_MELODY_MANA_COST,
    BARD_RALLYING_MELODY_RESTORE_FRACTION,
    BARD_THUNDEROUS_DRUMS_UNLOCK_LEVEL, BARD_THUNDEROUS_DRUMS_MANA_PER_ROUND,
    BARD_THUNDEROUS_DRUMS_MAX_REDUCTION,
    BARD_SYMPHONY_UNLOCK_LEVEL, BARD_SYMPHONY_BASE_MANA_COST, BARD_SYMPHONY_BASE_STA_COST,
    BARBARIAN_BLOOD_FRENZY_UNLOCK_LEVEL, BARBARIAN_BLOOD_FRENZY_DAMAGE_PER_BLEED,
    BARBARIAN_HEROIC_DEEDS_UNLOCK_LEVEL,
    RANGER_EXPLOSIVE_ARROW_UNLOCK_LEVEL, RANGER_EXPLOSIVE_ARROW_STAMINA_MULT,
    RANGER_EXPLOSIVE_ARROW_DAMAGE_MULT, RANGER_EXPLOSIVE_ARROW_CRIT_MULT,
    ROGUE_BACKSTAB_BLEED_UNLOCK_LEVEL, ROGUE_BACKSTAB_BLEED_FRAC,
    ROGUE_BACKSTAB_BLEED_DURATION_DIVISOR,
    ROGUE_TRAP_UNLOCK_LEVEL, ROGUE_TRAP_DOT_FRACTION, ROGUE_TRAP_DOT_ROUNDS,
    ROGUE_EVASION_STAMINA_COST,
    ROGUE_TWIN_FANGS_UNLOCK_LEVEL, ROGUE_TWIN_FANGS_OFFHAND_MULT, ROGUE_TWIN_FANGS_INSTAKILL_MULT,
    ROGUE_SHADOW_STEP_UNLOCK_LEVEL, ROGUE_SHADOW_STEP_STAMINA_COST,
    ROGUE_SHADOW_STEP_DURATION, ROGUE_SHADOW_STEP_BACKSTAB_MULT,
    MAGE_MIRROR_IMAGE_UNLOCK_LEVEL, MAGE_MIRROR_IMAGE_MANA_COST, MAGE_MIRROR_IMAGE_COUNT_DIVISOR,
    MAGE_ARCANE_OVERLOAD_UNLOCK_LEVEL, MAGE_ARCANE_OVERLOAD_BURST_BASE, MAGE_ARCANE_OVERLOAD_BURST_STEP,
    MAGE_ELEMENTAL_RIFT_UNLOCK_LEVEL, MAGE_ELEMENTAL_RIFT_MANA_INITIAL, MAGE_ELEMENTAL_RIFT_MANA_PER_ROUND, MAGE_ELEMENTAL_RIFT_SUMMON_BASE,
    NECRO_LICH_FORM_UNLOCK_LEVEL, NECRO_LICH_FORM_MANA_PER_ROUND,
    NECRO_LICH_REVIVE_ROUNDS,
    DRUID_COMMUNE_UNLOCK_LEVEL, DRUID_COMMUNE_FAE_TOKENS_NEEDED,
    DRUID_SHAMBLING_MOUND_UNLOCK_LEVEL, DRUID_SHAMBLING_MOUND_MANA_COST, DRUID_SHAMBLING_MOUND_CAP_DIVISOR,
    DRUID_WILD_SHAPE_UNLOCK_LEVEL, DRUID_WILD_SHAPE_MANA_INITIAL, DRUID_WILD_SHAPE_MANA_PER_ROUND,
    DRUID_WILD_BEAR_ATTACKS_DIVISOR, DRUID_WILD_BEAR_STUN_BASE, DRUID_WILD_BEAR_STUN_PER_LEVEL, DRUID_WILD_BEAR_DEFENSE_DIVISOR,
    DRUID_WILD_WOLF_ATTACKS_DIVISOR, DRUID_WILD_WOLF_BLEED_BASE, DRUID_WILD_WOLF_BLEED_PER_LEVEL, DRUID_WILD_WOLF_BLEED_DURATION_DIVISOR, DRUID_WILD_WOLF_DEFENSE_DIVISOR,
    DRUID_WILD_EAGLE_ATTACKS_DIVISOR, DRUID_WILD_EAGLE_CRIT_BASE, DRUID_WILD_EAGLE_CRIT_PER_LEVEL, DRUID_WILD_EAGLE_CRIT_MULT_BASE, DRUID_WILD_EAGLE_CRIT_MULT_PER_LEVEL, DRUID_WILD_EAGLE_EVASION_PER_LEVEL,
    DRUID_WILD_PIXIE_MAGIC_RESIST,
    DRUID_WILD_TREANT_ATTACKS_DIVISOR, DRUID_WILD_TREANT_HOLD_BASE, DRUID_WILD_TREANT_HOLD_PER_LEVEL, DRUID_WILD_TREANT_DEFENSE_DIVISOR,
    DRUID_VERDANT_SURGE_UNLOCK_LEVEL, DRUID_VERDANT_SURGE_ACTION_LOSS_CHANCE,
    NECRO_DEMI_LICH_UNLOCK_LEVEL, NECRO_DEMI_LICH_MANA_COST,
    NECRO_PLAGUE_BRINGER_UNLOCK_LEVEL, NECRO_PLAGUE_BRINGER_MANA_COST,
    ARTIFICER_BERSERK_UNLOCK_LEVEL, ARTIFICER_BERSERK_DMG_PER_LEVEL,
    ARTIFICER_BERSERK_OVERLOAD_PCT, ARTIFICER_BERSERK_MIN_HP_PCT,
    ARTIFICER_MULTI_GOLEM_UNLOCK_LEVEL,
    ARTIFICER_DECONSTRUCT_UNLOCK_LEVEL,
    RANGER_TOTEM_UNLOCK_LEVEL, RANGER_TOTEM_MANA_PER_ROUND,
    RANGER_TOTEM_DURATION_DIVISOR, RANGER_BEAR_TOTEM_DEFENSE_DIVISOR,
    RANGER_EAGLE_TOTEM_DAMAGE_PER_LEVEL, RANGER_EAGLE_TOTEM_DEFLECT_PER_LEVEL,
    MONK_AVATAR_UNLOCK_LEVEL, MONK_AVATAR_MANA_PER_ROUND,
    MONK_AVATAR_HP_REGEN, MONK_AVATAR_CLEANSE_BASE, MONK_AVATAR_CLEANSE_PER_LEVEL,
    MONK_AVATAR_DOT_DURATION_DIVISOR,
    MONK_KI_UNLOCK_LEVEL,
    WARRIOR_SQUIRE_UNLOCK_LEVEL, WARRIOR_SQUIRE_STAMINA_COST,
    WARRIOR_SQUIRE_ATTACKS_PER_LEVELS, WARRIOR_SQUIRE_COUNT_L60, WARRIOR_SQUIRE_COUNT_L90,
    WARRIOR_SQUIRE_SHIELD_BLOCK, WARRIOR_SQUIRE_HP_FRACTION, WARRIOR_SQUIRE_STAMINA_FRACTION,
    WARRIOR_FORMATION_UNLOCK_LEVEL, WARRIOR_FORMATION_STAMINA_PER_ROUND,
    WARRIOR_FORMATION_BONUS_PER_MEMBER, WARRIOR_FORMATION_BASE_BONUS,
    WARRIOR_FORMATION_MIN_MEMBERS, WARRIOR_FORMATION_OPPORTUNITY_OFFSET,
    RANGER_HUNTERS_MARK_UNLOCK_LEVEL, RANGER_HUNTERS_MARK_STAMINA_COST,
    RANGER_HUNTERS_MARK_MANA_COST, RANGER_HUNTERS_MARK_DAMAGE_BONUS,
    RANGER_HUNTERS_MARK_UPKEEP_MANA, RANGER_HUNTERS_MARK_UPKEEP_STAMINA,
    RANGER_BEASTLORD_UNLOCK_LEVEL, RANGER_BEASTLORD_MANA_PER_ROUND,
    RANGER_BEASTLORD_SUMMON_BASE, RANGER_BEASTLORD_UPKEEP_PER_SUMMON,
    VK_ATTACK_MANA_COST_BASE, VK_ATTACK_EXTRA_PER_5LV,
    VK_POISON_DAMAGE_BONUS,
    VK_SUMMON_VERMIN_MANA_COST, VK_SUMMON_VERMIN_UNLOCK_LEVEL,
    VK_SUMMON_SLIME_MANA_COST, VK_SUMMON_SLIME_UNLOCK_LEVEL,
    VK_CHARM_VERMIN_UNLOCK_LEVEL, VK_CHARM_VERMIN_MANA_COST, VK_CHARM_VERMIN_TAGS,
    VK_INSECT_PLAGUE_UNLOCK_LEVEL, VK_INSECT_PLAGUE_MANA_COST,
    VK_SWARM_UNLOCK_LEVEL, VK_SWARM_SUMMON_MANA_COST, VK_SWARM_GROWTH_MANA_COST,
    VK_SWARM_MAX_UPGRADE_DIVISOR,
    VK_SWARM_PROTECT_MANA_COST,
    WARLOCK_HEX_UPKEEP_MANA, WARLOCK_HEX_PENALTY_DIVISOR, WARLOCK_HEX_DURATION_DIVISOR,
    WARLOCK_CURSE_UNLOCK_LEVEL, WARLOCK_CURSE_MANA_COST,
    WARLOCK_CHARM_UNLOCK_LEVEL, WARLOCK_CHARM_MANA_COST,
    WARLOCK_CAULDRON_UNLOCK_LEVEL, WARLOCK_CAULDRON_HP_COST, WARLOCK_DEMON_UPKEEP_HP,
    WARLOCK_ABYSS_FORM_UNLOCK_LEVEL, WARLOCK_ELDRITCH_SIGN_TARGET_DIVISOR,
} from '../utils/constants.js';
import { generateEnemySprite } from '../utils/SpriteGenerator.js';
import { getItemDef } from '../items/ItemTypes.js';
import { soundManager } from '../utils/SoundManager.js';
import { BEAST_TYPES, GOLEM_PRESETS, getSummonPreset, getWarlockUnlockedDemons, WARLOCK_DEMON_PRESETS } from '../entities/Summons.js';

/**
 * CombatUI — full-screen overlay for turn-based combat.
 *
 * Class-specific action buttons appear only when the current member's
 * class matches (rogue → Backstab, cleric → Heal, necromancer → Summon
 * Undead tier picker, ranger → Summon Beast picker).
 *
 * Row system: back-row non-rogues cannot melee. If the front row
 * collapses mid-combat, an in-place row-promotion picker is shown.
 */
export class CombatUI {
    constructor(combatSystem) {
        this.combat = combatSystem;
        this._active = false;
        this._onCombatEnd = null;
        this._selectingTarget = false;
        this._targetCallback = null;

        this.overlay      = document.getElementById('combat-overlay');
        this.enemyCards   = document.getElementById('combat-enemies');
        this.logEl        = document.getElementById('combat-log'); // legacy / L-key combined log
        this.playerLogEl  = document.getElementById('combat-log-player-inner');
        this.enemyLogEl   = document.getElementById('combat-log-enemy-inner');
        this.charmedCardsEl = document.getElementById('combat-charmed');
        this.turnInfo     = document.getElementById('combat-turn-info');
        this.actionsEl    = document.getElementById('combat-actions');

        this._manualMode      = false;
        this._spacebarHandler = null;
        this._roundCounterEl  = null;
        this._layoutChangeHandler = () => this._applyLayoutMode();
        window.addEventListener('game-layout-change', this._layoutChangeHandler);
    }

    show(onEnd) {
        this._onCombatEnd = onEnd;
        this._active = true;
        this._actionInProgress = false;
        this._prevMemberHealth = {}; // track previous health to detect KO events
        this.overlay.style.display = '';
        this.overlay.classList.add('combat-active');
        this._applyLayoutMode();
        this._buildEnemyCards();

        // Round counter — inserted just before the turn-info bar
        if (!this._roundCounterEl) {
            this._roundCounterEl = document.createElement('div');
            this._roundCounterEl.id = 'combat-round-counter';
            this.overlay.insertBefore(this._roundCounterEl, this.turnInfo);
        }

        // Spacebar handler for manual mode
        this._spacebarHandler = (e) => {
            if (e.key === ' ' && this._manualMode && this.combat.phase === 'ENEMY_TURN') {
                e.preventDefault();
                this.combat.resumeManualTurn();
            }
        };
        document.addEventListener('keydown', this._spacebarHandler);

        this._refresh();

        for (const e of this.combat.enemies) {
            soundManager.playMonsterSound(e.type);
        }
    }

    hide() {
        this._active = false;
        this._selectingTarget = false;
        this._clearTurnIndicators();
        this.overlay.classList.remove('combat-active');
        this.overlay.style.display = 'none';
        if (this._spacebarHandler) {
            document.removeEventListener('keydown', this._spacebarHandler);
            this._spacebarHandler = null;
        }
        if (this._roundCounterEl) {
            this._roundCounterEl.remove();
            this._roundCounterEl = null;
        }
        this.overlay.style.paddingBottom = '';
    }

    _applyLayoutMode() {
        if (!this.overlay) return;
        const layout2 = document.body.classList.contains('layout2');
        if (layout2) this.overlay.style.paddingBottom = '';
    }

    _clearTurnIndicators() {
        // Indicators are rendered on both Party HUD cards and combat enemy cards.
        // Remove them explicitly so no stale "acted" checkmarks persist after combat.
        const roots = [document.getElementById('party-hud'), this.overlay].filter(Boolean);
        for (const root of roots) {
            const indicators = root.querySelectorAll('.turn-indicator');
            for (const ind of indicators) ind.remove();
        }
    }

    _refresh() {
        if (!this._active) return;

        // Reset action guard and stale target-selection state every refresh so
        // a missed or double-click from the previous turn can never carry over.
        this._actionInProgress = false;
        if (this._selectingTarget) {
            this._selectingTarget = false;
            this._targetCallback  = null;
            this._clearTargetable();
        }

        // Detect newly knocked-out party members (play sorrowful tone once per KO)
        if (this.combat.party) {
            for (const m of this.combat.party) {
                if (m.isSummoned) continue;
                const prev = this._prevMemberHealth[m.id];
                if (prev > 0 && m.health <= 0) {
                    soundManager.playPartyMemberKO();
                }
                this._prevMemberHealth[m.id] = m.health;
            }
        }

        this._updateEnemyCards();
        this._updateLog();
        this._updateActions();
        if (this._roundCounterEl) {
            this._roundCounterEl.textContent = `Round ${this.combat.turnNumber}`;
        }
        this._updateTurnIndicators();

        // Layout 1 keeps combat above the bottom party HUD. Layout 2 reserves
        // left/right columns in CSS, so no bottom padding is needed.
        if (document.body.classList.contains('layout2')) {
            this.overlay.style.paddingBottom = '';
        } else {
            const hud = document.getElementById('party-hud');
            if (hud) {
                const hudH = hud.offsetHeight;
                if (hudH > 0) this.overlay.style.paddingBottom = (hudH + 16) + 'px';
            }
        }

        const p = this.combat.phase;
        if (p === 'VICTORY' || p === 'DEFEAT' || p === 'FLED') {
            this._showEndScreen();
        }
    }

    // ────────────────────────────────────────────
    // Enemy cards
    // ────────────────────────────────────────────

    _buildEnemyCards() {
        this.enemyCards.innerHTML = '';
        if (this.charmedCardsEl) this.charmedCardsEl.innerHTML = '';

        for (const enemy of this.combat.enemies) {
            this.enemyCards.appendChild(this._createEnemyCard(enemy));
        }
    }

    _createEnemyCard(enemy) {
        const card = document.createElement('div');
        card.className = 'combat-enemy-card';
        card.dataset.enemyId = enemy.id;

        // Super bosses get a vivid purple border; mega bosses get gold/crimson; normal bosses get muted purple.
        if (enemy.isSuperBoss) {
            card.style.border = '2px solid rgba(128,0,200,1)';
            card.style.boxShadow = '0 0 18px 6px rgba(128,0,200,0.85), 0 0 8px 3px rgba(200,100,255,0.7)';
        } else if (enemy.isMegaBoss) {
            card.style.border = '2px solid #ff4444';
            card.style.boxShadow = '0 0 12px 4px rgba(255,68,68,0.7), 0 0 6px 2px rgba(255,200,0,0.5)';
        } else if (enemy.isBoss) {
            card.style.border = '2px solid #9b59b6';
            card.style.boxShadow = '0 0 8px 2px rgba(155,89,182,0.6)';
        }

        const canvas = generateEnemySprite(enemy.type, enemy.seed);
        const img = document.createElement('img');
        img.className = 'combat-enemy-sprite';
        img.src = canvas.toDataURL();
        card.appendChild(img);

        const name = document.createElement('div');
        name.className = 'combat-enemy-name';
        const base = (ENEMY_TYPES[enemy.type] || { name: 'Enemy' }).name;
        // If enemy has a custom name override (boss title set by EnemyManager) use it,
        // otherwise use the standard base+level format.
        if (enemy.name) {
            name.textContent = enemy.name;
            name.style.color = enemy.isSuperBoss ? '#cc44ff' : enemy.isMegaBoss ? '#ff8888' : '#c39bd3';
            if (enemy.isSuperBoss || enemy.isMegaBoss) name.style.fontWeight = 'bold';
        } else {
            name.textContent = enemy.level > 1 ? `${base} L${enemy.level}` : base;
        }
        if (enemy.defense) {
            name.title = `Defense ${enemy.defense} (reduces incoming damage)`;
        }
        card.appendChild(name);

        card.appendChild(this._bar('combat-bar-health'));
        card.appendChild(this._bar('combat-bar-stamina'));
        card.appendChild(this._bar('combat-bar-mana'));

        const statusRow = document.createElement('div');
        statusRow.className = 'combat-status-row';
        statusRow.style.cssText = 'display:flex;flex-wrap:wrap;gap:2px;justify-content:center;padding:2px 0;min-height:4px;';
        card.appendChild(statusRow);

        card.addEventListener('click', () => {
            if (!this._selectingTarget || enemy.health <= 0) return;
            this._selectingTarget = false;
            this._clearTargetable();
            if (this._targetCallback) this._targetCallback(enemy);
        });

        return card;
    }

    _ensureEnemyCards() {
        for (const enemy of this.combat.enemies) {
            if (enemy.health <= 0) continue;
            const selector = `[data-enemy-id="${enemy.id}"]`;
            const existing = this.enemyCards.querySelector(selector)
                || (this.charmedCardsEl && this.charmedCardsEl.querySelector(selector));
            if (!existing) this.enemyCards.appendChild(this._createEnemyCard(enemy));
        }
    }

    _bar(cls) {
        const bar = document.createElement('div');
        bar.className = `combat-stat-bar ${cls}`;
        const fill = document.createElement('div');
        fill.className = 'combat-stat-fill';
        bar.appendChild(fill);
        return bar;
    }

    _updateEnemyCards() {
        this._ensureEnemyCards();
        for (const enemy of this.combat.enemies) {
            const selector = `[data-enemy-id="${enemy.id}"]`;
            const card = this.enemyCards.querySelector(selector)
                || (this.charmedCardsEl && this.charmedCardsEl.querySelector(selector));
            if (!card) continue;

            if (enemy.health <= 0) {
                card.remove();
                continue;
            }

            const fills = card.querySelectorAll('.combat-stat-fill');
            fills[0].style.width = `${Math.max(0, (enemy.health / enemy.maxHealth) * 100)}%`;
            fills[1].style.width = `${Math.max(0, (enemy.stamina / enemy.maxStamina) * 100)}%`;
            fills[2].style.width = `${enemy.maxMana > 0 ? Math.max(0, (enemy.mana / enemy.maxMana) * 100) : 0}%`;

            // Update per-bar tooltips with live values.
            const hpPct   = Math.round((enemy.health  / enemy.maxHealth)  * 100);
            const stPct   = Math.round((enemy.stamina / enemy.maxStamina) * 100);
            const mpPct   = enemy.maxMana > 0 ? Math.round((enemy.mana / enemy.maxMana) * 100) : 0;
            const defLine = enemy.defense ? `DEF  ${enemy.defense}\n` : '';
            const charmLine = enemy.charmedRounds > 0
                ? `CHARMED  ${enemy.charmedRounds} round(s) remaining\n`
                : '';
            const tip = `${enemy.health}/${enemy.maxHealth} HP (${hpPct}%)\n`
                      + `${enemy.stamina}/${enemy.maxStamina} ST (${stPct}%)\n`
                      + `${enemy.mana}/${enemy.maxMana} MP (${mpPct}%)\n`
                      + defLine
                      + charmLine;
            fills[0].parentElement.title = `${enemy.health}/${enemy.maxHealth} HP (${hpPct}%)`;
            fills[1].parentElement.title = `${enemy.stamina}/${enemy.maxStamina} ST (${stPct}%)`;
            fills[2].parentElement.title = `${enemy.mana}/${enemy.maxMana} MP (${mpPct}%)`;
            // Also set it on the whole card so any part of the card shows full info.
            card.title = tip.trimEnd();

            const statusRow = card.querySelector('.combat-status-row');
            if (statusRow) {
                statusRow.innerHTML = '';
                const efx = enemy.activeEffects || [];
                const mkB = (icon, label, bg, tip) => {
                    const b = document.createElement('span');
                    b.style.cssText = 'background:' + bg + ';color:#fff;font-size:10px;padding:1px 4px;border-radius:3px;cursor:default;white-space:nowrap;display:inline-block;';
                    b.textContent = icon + ' ' + label;
                    b.title = tip;
                    statusRow.appendChild(b);
                };
                if (enemy.stunned)
                    mkB('⚡', 'Stunned', 'rgba(220,200,0,0.9)', 'Stunned: skips next turn');
                const ent = efx.find(x => x && x.type === 'entangle' && x.rounds > 0);
                if (ent) {
                    const entLabel = ent.verdantSurge ? 'Verdant Surge' : 'Entangled';
                    const entTip = ent.verdantSurge
                        ? `Verdant Surge: -${Math.abs(ent.defenseBonus||0)} def, -${Math.abs(ent.damageBonus||0)} dmg, nature DoT ${ent.verdantMin}-${ent.verdantMax}/rd, 25% action loss — ${ent.rounds} rds left`
                        : `Entangled: -${Math.abs(ent.defenseBonus||0)} def, -${Math.abs(ent.damageBonus||0)} dmg — ${ent.rounds} rds left`;
                    mkB('🌿', entLabel, ent.verdantSurge ? 'rgba(0,120,60,0.95)' : 'rgba(30,130,30,0.9)', entTip);
                }
                // ── Render all DoT-type effects using a comprehensive map ──
                const DOT_MAP = {
                    bleed: {
                        icon: '🟥', label: 'Bleeding', bg: 'rgba(160,0,0,0.9)',
                        tip: (fx) => 'Bleeding: ' + (fx.damage||0) + ' dmg/round — ' + fx.rounds + ' rds left'
                    },
                    burn: {
                        icon: '🔥', label: 'Burning', bg: 'rgba(200,70,0,0.9)',
                        tip: (fx) => 'Burning: ' + (fx.damage||0) + ' dmg/round — ' + fx.rounds + ' rds left'
                    },
                    acid_dot: {
                        icon: '🟢', label: 'Acid', bg: 'rgba(60,160,0,0.9)',
                        tip: (fx) => 'Acid DoT: ' + (fx.damage||0) + ' dmg/round — ' + (fx.permanent ? 'permanent' : fx.rounds + ' rds left')
                    },
                    acid_debuff: {
                        icon: '🟢', label: 'Corroded', bg: 'rgba(30,110,0,0.9)',
                        tip: (fx) => 'Acid Corrosion: -' + Math.abs(fx.defenseBonus||0) + ' def — ' + fx.rounds + ' rds left'
                    },
                    poison: {
                        icon: '🐢', label: 'Poison', bg: 'rgba(100,140,0,0.9)',
                        tip: (fx) => 'Poison: ' + (fx.damage||0) + ' dmg/round — ' + fx.rounds + ' rds left'
                    },
                    poison_weapon: {
                        icon: '🐍', label: 'Poisoned', bg: 'rgba(100,0,170,0.9)',
                        tip: (fx) => 'Venom DoT: ' + (fx.damage||0) + ' dmg/round — ' + (fx.permanent ? 'permanent' : fx.rounds + ' rds left')
                    },
                    poison_debuff: {
                        icon: '🐍', label: 'Weakened', bg: 'rgba(60,0,110,0.9)',
                        tip: (fx) => 'Venom Weakness: -' + Math.abs(fx.damageBonus||0) + ' dmg dealt — ' + fx.rounds + ' rds left'
                    },
                    lightning_dot: {
                        icon: '⚡', label: 'Shocked', bg: 'rgba(60,100,240,0.9)',
                        tip: (fx) => 'Lightning DoT: ' + (fx.damage||0) + ' dmg/round — ' + fx.rounds + ' rds left'
                    },
                    frost_dot: {
                        icon: '❄️', label: 'Frostbite', bg: 'rgba(100,180,240,0.9)',
                        tip: (fx) => 'Frost DoT: ' + (fx.damage||0) + ' dmg/round — ' + fx.rounds + ' rds left'
                    },
                    shocked: {
                        icon: '⚡', label: 'Shocked', bg: 'rgba(40,80,220,0.9)',
                        tip: (fx) => 'Shocked (lightning): -' + Math.abs(fx.damageBonus||0) + ' dmg — ' + fx.rounds + ' rds left'
                    },
                    chilled: {
                        icon: '❄️', label: 'Chilled', bg: 'rgba(80,150,220,0.9)',
                        tip: (fx) => 'Chilled (ice): -' + Math.abs(fx.defenseBonus||0) + ' def — ' + fx.rounds + ' rds left'
                    },
                    ice_chill: {
                        icon: '❄️', label: 'Ice Chill', bg: 'rgba(100,200,240,0.9)',
                        tip: (fx) => 'Ice Chill: -' + Math.abs(fx.damageBonus||0) + ' dmg dealt — ' + fx.rounds + ' rds left'
                    },
                    fae_poison: {
                        icon: '\u{1F9DA}', label: 'Fae Poison', bg: 'rgba(0,160,100,0.9)',
                        tip: (fx) => 'Fae Poison: ' + (fx.damage||0) + ' magic DoT/round — ' + fx.rounds + ' rds left'
                    },
                    ranger_totem_bleed: {
                        icon: '🐺', label: 'Totem Bleed', bg: 'rgba(140,0,0,0.9)',
                        tip: (fx) => 'Wolf Totem Bleed: ' + (fx.damage||0) + ' dmg/round — ' + fx.rounds + ' rds left'
                    },
                    ranger_totem_poison: {
                        icon: '🧚', label: 'Totem Poison', bg: 'rgba(70,120,0,0.9)',
                        tip: (fx) => 'Pixie Totem Poison: ' + (fx.damage||0) + ' dmg/round — ' + fx.rounds + ' rds left'
                    },
                    rogue_trap_dot: {
                        icon: '🪤', label: 'Trap Wound', bg: 'rgba(150,100,30,0.9)',
                        tip: (fx) => 'Trap Wound: ' + (fx.damage||0) + ' dmg/round — ' + fx.rounds + ' rds left'
                    },
                    mummy_rot: {
                        icon: '🟤', label: 'Rotting', bg: 'rgba(110,55,0,0.9)',
                        tip: (fx) => 'Mummy Rot: ' + (fx.damage||0) + ' dmg/round (permanent)'
                    },
                    revenant_rage: {
                        icon: '👻', label: 'Enraged', bg: 'rgba(80,0,120,0.9)',
                        tip: (fx) => 'Revenant Fury: +' + (fx.damageBonus||0) + ' damage (risen from death)'
                    },
                    hag_curse: {
                        icon: '🧙', label: 'Hexed', bg: 'rgba(80,0,80,0.9)',
                        tip: (fx) => 'Hag\'s Curse: ' + (fx.damageBonus||0) + ' all damage, ' + (fx.defenseBonus||0) + ' def — ' + fx.rounds + ' rds left'
                    },
                    drone_binding: {
                        icon: '⚙️', label: 'Bound', bg: 'rgba(80,80,200,0.9)',
                        tip: (fx) => 'Drone Binding: -' + Math.abs(fx.damageBonus||0) + ' atk, -' + Math.abs(fx.defenseBonus||0) + ' def — ' + fx.rounds + ' rds left'
                    },
                    quasit_poison: {
                        icon: '\u{1F47F}', label: 'Venom', bg: 'rgba(60,0,120,0.9)',
                        tip: (fx) => 'Quasit Venom: ' + (fx.damage||0) + ' dmg/round (ignores armor) — ' + fx.rounds + ' rds left'
                    },
                    wither: {
                        icon: '\u{1F9B4}', label: 'Withered', bg: 'rgba(80,40,0,0.9)',
                        tip: (fx) => 'Wither: ' + (fx.damageBonus||0) + ' all damage dealt — ' + fx.rounds + ' rds left'
                    },
                    hex: {
                        icon: '\u{1F480}', label: 'Hexed', bg: 'rgba(100,0,0,0.9)',
                        tip: (fx) => 'Hex: ' + (fx.defenseBonus||0) + ' defense — ' + fx.rounds + ' rds left'
                    },
                    taunted: {
                        icon: '⚔️', label: 'Taunted', bg: 'rgba(140,60,0,0.9)',
                        tip: (fx) => 'Taunted: ' + (fx.damageBonus||0) + ' all damage — ' + fx.rounds + ' rd left'
                    },
                    rust_corrosion: {
                        icon: '\u{1F99F}', label: 'Corroded', bg: 'rgba(100,50,10,0.9)',
                        tip: (fx) => 'Rust Corrosion: ' + (fx.defenseBonus||0) + ' defense (lasts full combat)'
                    },
                    insect_plague_poison: {
                        icon: '\u{1F41C}', label: 'Plague', bg: 'rgba(70,110,0,0.95)',
                        tip: (fx) => 'Insect Plague: ' + (fx.damage||0) + ' dmg/round — ' + fx.rounds + ' rds left'
                    },
                    vk_poison: {
                        icon: '\u{1F577}️', label: 'VK Venom', bg: 'rgba(80,120,0,0.9)',
                        tip: (fx) => 'Vermin Venom: ' + (fx.damage||0) + ' dmg/round — ' + fx.rounds + ' rds left'
                    },
                    vk_acid_dot: {
                        icon: '\u{1FAA1}', label: 'VK Acid', bg: 'rgba(40,140,0,0.9)',
                        tip: (fx) => 'Slime Acid: ' + (fx.damage||0) + ' dmg/round — ' + fx.rounds + ' rds left'
                    },
                    vk_swarm_poison: {
                        icon: '\u{1F41C}', label: 'Swarm Venom', bg: 'rgba(60,100,10,0.9)',
                        tip: (fx) => 'Swarm Venom: ' + (fx.damage||0) + ' dmg/round — ' + fx.rounds + ' rds left'
                    },
                    vk_swarm_acid: {
                        icon: '\u{1FAA1}', label: 'Swarm Acid', bg: 'rgba(30,130,20,0.9)',
                        tip: (fx) => 'Swarm Acid: ' + (fx.damage||0) + ' dmg/round — ' + fx.rounds + ' rds left'
                    },
                    vk_vswarm_debuff: {
                        icon: '\u{1F41C}', label: 'Infested', bg: 'rgba(90,60,10,0.9)',
                        tip: (fx) => 'Vermin Swarm: ' + Math.abs(fx.damageBonus||0) + ' atk/range/magic — ' + fx.rounds + ' rds left'
                    },
                    vk_aswarm_debuff: {
                        icon: '\u{1FAA1}', label: 'Dissolved', bg: 'rgba(20,100,40,0.9)',
                        tip: (fx) => 'Acid Swarm: -' + Math.abs(fx.defenseBonus||0) + ' def/range/magic — ' + fx.rounds + ' rds left'
                    },
                    warlock_hex: {
                        icon: '\u{1F441}', label: 'Evil Eye', bg: 'rgba(90,0,120,0.95)',
                        tip: (fx) => 'Evil Eye: -' + Math.abs(fx.defenseBonus||0) + ' def/melee/ranged/magic — ' + fx.rounds + ' rds left'
                    },
                    wasting_curse: {
                        icon: '\u{1F56F}\uFE0F', label: 'Wasting', bg: 'rgba(80,0,20,0.95)',
                        tip: (fx) => 'Wasting Curse: ' + Math.round((fx.pct || 0.01) * 100) + '% current HP this round — ' + fx.rounds + ' rds left'
                    }
                };

                for (const fx of efx) {
                    if (!fx || !fx.type) continue;
                    if (DOT_MAP[fx.type]) {
                        const isActive = fx.rounds > 0 || fx.permanent;
                        if (isActive) {
                            const info = DOT_MAP[fx.type];
                            mkB(info.icon, info.label, info.bg, info.tip(fx));
                        }
                    } else if (/^avatar_/.test(fx.type) && fx.rounds > 0) {
                        mkB('🧘', 'Avatar', 'rgba(40,120,160,0.9)',
                            'Avatar element: ' + (fx.damage||0) + ' dmg/round — ' + fx.rounds + ' rds left');
                    }
                }

                // ── Non-DoT status effects ──
                const fearFx = efx.find(x => x && ['ghost_fear', 'battle_horn_fear', 'demi_lich_fear'].includes(x.type));
                if (fearFx) {
                    const pen = Math.abs(fearFx.damageBonus || 3);
                    const src = fearFx.type === 'battle_horn_fear' ? 'Battle Horn'
                              : fearFx.type === 'demi_lich_fear'   ? 'Demi-Lich'
                              : 'Ghost';
                    mkB('😨', 'Feared', 'rgba(80,0,100,0.9)',
                        `${src} Fear: -${pen} attack, -${pen} defense (lasts entire combat)`);
                }
                const tu = efx.find(x => x && x.type === 'turned' && x.rounds > 0);
                if (tu) mkB('✝️', 'Turned', 'rgba(200,180,0,0.9)',
                    'Turned Undead: -' + Math.abs(tu.defenseBonus||0) + ' def, -' + Math.abs(tu.damageBonus||0) + ' atk — ' + tu.rounds + ' rds left');
                const di = efx.find(x => x && x.type === 'bard_disrupt' && x.rounds > 0);
                if (di) mkB('🎵', 'Disrupted', 'rgba(140,0,140,0.9)',
                    'Disrupted: -' + Math.abs(di.damageBonus||0) + ' atk, -' + Math.abs(di.defenseBonus||0) + ' def — ' + di.rounds + ' rds left');

                // ── Render Quivering Palm (supports multiple per source monk) ──
                const qpEffects = efx
                    .filter(x => x && x.type === 'quivering_palm' && x.rounds > 0)
                    .sort((a, b) => {
                        const aName = (a.sourceName || '').toLowerCase();
                        const bName = (b.sourceName || '').toLowerCase();
                        if (aName < bName) return -1;
                        if (aName > bName) return 1;
                        return (b.rounds || 0) - (a.rounds || 0);
                    });
                for (const qp of qpEffects) {
                    const source = qp.sourceName || 'Unknown Monk';
                    const doublings = qp.doublings || 0;
                    mkB('✋', `QP ${qp.damage || 0}/rd`, 'rgba(140,30,100,0.9)',
                        `Quivering Palm (${source}): ${(qp.damage || 0)} dmg/round — ${doublings}/10 doublings — ${qp.rounds} rds left`);
                }

                // ── Invisible Stalker badge ──
                if ((ENEMY_TYPES[enemy.type] || {}).isInvisible)
                    mkB('👁️', 'Invisible', 'rgba(60,60,100,0.9)',
                        'Invisible: all attacks have a 60% chance to miss.');

                // ── Pressure Points debuff tag ──
                const ppFx = efx.find(x => x && x.type === 'pressure_points');
                if (ppFx) mkB('✋', 'Pressure Pts', 'rgba(100,30,160,0.9)',
                    `Pressure Points: ${ppFx.defenseBonus||0} defense penalty (persists until all Quivering Palms expire)`);

                // Fae hold badge
                const fh = efx.find(x => x && x.type === 'fae_hold' && x.rounds > 0);
                if (fh) mkB('\u{1F9DA}', 'Held ' + fh.rounds + 'rd', 'rgba(60,200,60,0.9)',
                    'Faerie Hold: stunned for ' + fh.rounds + ' round(s) — immune to this turn’s action.');
                // Charm status badge (shown in the charmed panel; keep a small indicator too)
                if (enemy.charmedRounds > 0)
                    mkB('🎵', 'CHARMED ' + enemy.charmedRounds + 'rd', 'rgba(0,160,80,0.95)',
                        'Charmed by Bard! Fighting for your party. ' + enemy.charmedRounds + ' round(s) remaining.');

                // ── Hunter's Mark debuff tags — one card per active mark ──
                const _hmFxAll = efx.filter(x => x && x.type === 'hunters_mark');
                if (_hmFxAll.length > 0) {
                    const _hmPct = Math.round(RANGER_HUNTERS_MARK_DAMAGE_BONUS * 100);
                    const _hmTotalPct = _hmPct * _hmFxAll.length;
                    for (const _hmFx of _hmFxAll) {
                        const _hmRanger = (this.combat.party || []).find(p => p.id === _hmFx.markerId);
                        const _hmName = _hmRanger ? _hmRanger.name : 'Ranger';
                        const _stackNote = _hmFxAll.length > 1 ? `\nTotal from all marks: +${_hmTotalPct}%` : '';
                        mkB('🎯', `Marked +${_hmPct}%`, 'rgba(180,60,0,0.92)',
                            `Hunter's Mark (${_hmName}): +${_hmPct}% damage from all sources. Upkeep ${RANGER_HUNTERS_MARK_UPKEEP_MANA} MP + ${RANGER_HUNTERS_MARK_UPKEEP_STAMINA} ST/rd.${_stackNote}`);
                    }
                }

                // ── Boss Aura buff tag — non-boss enemies deal bonus damage while a boss/mega/super-boss lives ──
                if (!enemy.isBoss && !enemy.isMegaBoss && !enemy.isSuperBoss && enemy.health > 0) {
                    let _auraBoss = false, _auraMega = false, _auraSuper = false;
                    for (const _ae of this.combat.enemies) {
                        if (_ae === enemy || _ae.health <= 0) continue;
                        if (_ae.isSuperBoss) _auraSuper = true;
                        else if (_ae.isMegaBoss) _auraMega = true;
                        else if (_ae.isBoss) _auraBoss = true;
                    }
                    if (_auraSuper) mkB('🟣', '+66% dmg', 'rgba(100,0,160,0.95)',
                        'Super-Boss Aura: the Super Boss\'s dark power infuses this creature — +66% damage dealt.');
                    else if (_auraMega) mkB('💀', '+50% dmg', 'rgba(160,0,0,0.95)',
                        'Mega-Boss Aura: the Mega Boss empowers this creature — +50% damage dealt this combat.');
                    else if (_auraBoss) mkB('👑', '+25% dmg', 'rgba(120,30,140,0.85)',
                        'Boss Aura: the Boss\'s presence emboldens this creature — +25% damage dealt this combat.');
                }
            }
        }
        // Charmed card management: move charmed enemy cards to/from charmedCardsEl
        this._updateCharmedCards();
    }

    _updateCharmedCards() {
        if (!this.charmedCardsEl) return;
        for (const enemy of this.combat.enemies) {
            const card = this.enemyCards.querySelector(`[data-enemy-id="${enemy.id}"]`)
                      || (this.charmedCardsEl && this.charmedCardsEl.querySelector(`[data-enemy-id="${enemy.id}"]`));
            if (!card) continue;
            const isCharmed = (enemy.charmedRounds || 0) > 0;
            const inCharmed = card.parentElement === this.charmedCardsEl;
            const inEnemies = card.parentElement === this.enemyCards;
            if (isCharmed && !inCharmed) {
                // Move card to charmed area; dim enemy area slot
                card.style.border = '2px solid #22aa66';
                card.style.boxShadow = '0 0 8px rgba(0,200,100,0.5)';
                this.charmedCardsEl.appendChild(card);
            } else if (!isCharmed && inCharmed) {
                // Charm expired — move back to enemy area
                card.style.border = '';
                card.style.boxShadow = '';
                if (enemy.isSuperBoss) {
                    card.style.border = '2px solid rgba(128,0,200,1)';
                    card.style.boxShadow = '0 0 18px 6px rgba(128,0,200,0.85), 0 0 8px 3px rgba(200,100,255,0.7)';
                } else if (enemy.isMegaBoss) {
                    card.style.border = '2px solid #ff4444';
                    card.style.boxShadow = '0 0 12px 4px rgba(255,68,68,0.7)';
                } else if (enemy.isBoss) {
                    card.style.border = '2px solid #9b59b6';
                    card.style.boxShadow = '0 0 8px 2px rgba(155,89,182,0.6)';
                }
                this.enemyCards.appendChild(card);
            }
        }
    }

    // ────────────────────────────────────────────
    // Combat log
    // ────────────────────────────────────────────

    /** Classify a log message string and return a CSS class (or ''). */
    _logClass(msg) {
        if (msg.includes('CRITICAL'))           return 'log-crit';
        if (msg.includes('STUNNED') ||
            msg.includes('is stunned') ||
            msg.includes('PARALYZED') ||
            msg.includes('held fast'))          return 'log-stun';
        if (msg.includes('entangled'))          return 'log-entangle';
        if (msg.includes('shield blocks'))      return 'log-shield';
        if (msg.includes('BACKSTAB'))           return 'log-crit';
        if (msg.includes('Whirlwind'))          return 'log-crit';
        if (msg.includes('dodges'))             return 'log-shield';
        if (msg.includes('heals'))              return 'log-heal';
        if (msg.includes('Life drain'))         return 'log-heal';
        if (msg.includes('summons'))            return 'log-summon';
        if (msg.includes('reached level'))      return 'log-levelup';
        if (msg.includes('XP'))                 return 'log-levelup';
        return '';
    }

    _fillLogEl(containerEl, messages) {
        const wasNearBottom =
            (containerEl.scrollHeight - containerEl.scrollTop - containerEl.clientHeight) < 24;
        containerEl.innerHTML = '';
        for (const msg of messages) {
            const p = document.createElement('p');
            p.textContent = msg;
            const cls = this._logClass(msg);
            if (cls) p.classList.add(cls);
            containerEl.appendChild(p);
        }
        if (wasNearBottom) {
            containerEl.scrollTop = containerEl.scrollHeight;
        }
    }

    _updateLog() {
        // Split panels (in-combat view)
        if (this.playerLogEl) this._fillLogEl(this.playerLogEl, this.combat.playerLog || []);
        if (this.enemyLogEl)  this._fillLogEl(this.enemyLogEl,  this.combat.enemyLog  || []);
        // Legacy combined log kept in sync (used by L-key adventure log outside combat)
        if (this.logEl) {
            this._fillLogEl(this.logEl, this.combat.log || []);
        }
    }

    // ────────────────────────────────────────────
    // Action buttons
    // ────────────────────────────────────────────

    _updateActions() {
        this.actionsEl.innerHTML = '';

        if (this.combat.phase === 'NEED_PROMOTION') {
            this._showRowPromotion();
            return;
        }

        if (this.combat.phase !== 'PLAYER_TURN') {
            if (this.combat.phase === 'ENEMY_TURN' && this._manualMode) {
                this.turnInfo.textContent = '⏸️ Manual — review the log, then continue...';
                const contBtn = this._addBtn('▶ Continue [Space]', true, () => this.combat.resumeManualTurn());
                contBtn.style.cssText += ';border-color:#44aa44;color:#88ee88;font-size:15px;padding:11px 28px;';
            } else {
                this.turnInfo.textContent = this.combat.phase === 'ENEMY_TURN' ? 'Enemies attacking...' : '';
            }
            this._addModeToggleBtn();
            return;
        }

        const m = this.combat.currentMember;
        if (!m) return;

        const summon  = getSummonPreset(m);
        const clsIcon = summon ? summon.icon           : (m.classDef.icon || '');
        const spIcon  = summon ? ''                    : (m.speciesDef.icon || '');
        const label   = summon ? (summon.speciesLabel || summon.name) : '';
        const rowStr = m.row === 'back' ? ' [Back]' : ' [Front]';
        const dLvl = this.combat.dungeonLevel || 1;
        const dLvlStr = dLvl > 1 ? `  D${dLvl}` : '';
        const nameTag = summon
            ? `${clsIcon} ${m.name} [${label}] L${m.level}`
            : `${clsIcon} ${spIcon} ${m.name} L${m.level}`;
        this.turnInfo.textContent =
            `${nameTag}${rowStr}${dLvlStr}  |  HP ${m.health}/${m.maxHealth}  ST ${m.stamina}/${m.maxStamina}  MP ${m.mana}/${m.maxMana}`;
        if (summon) {
            const abilityLines = (summon.abilities || []).map(a => `\u2022 ${a}`).join('\n');
            this.turnInfo.title = abilityLines
                ? `${label}\n\nAbilities:\n${abilityLines}`
                : label;
        } else {
            this.turnInfo.title = '';
        }

        const weaponDef = m.equipment.weapon ? getItemDef(m.equipment.weapon) : null;
        const armorDef  = m.equipment.armor  ? getItemDef(m.equipment.armor)  : null;
        const shieldDef = m.equipment.shield ? getItemDef(m.equipment.shield) : null;
        const eqParts = [];
        if (weaponDef) eqParts.push(weaponDef.name);
        if (armorDef)  eqParts.push(armorDef.name);
        if (shieldDef) eqParts.push(shieldDef.name);
        if (eqParts.length > 0) this.turnInfo.textContent += `  [${eqParts.join(' | ')}]`;

        // ── Symphony of Destruction: while channeling, show only symphony controls ──
        if (m.classId === 'bard' && m.symphonyActive) {
            const nextRound = (m.symphonyRound || 1) + 1;
            const nextMult  = Math.pow(2, nextRound - 1);
            const mc = m.symphonyManaCost || (BARD_SYMPHONY_BASE_MANA_COST * 2);
            const sc = m.symphonyStaCost  || (BARD_SYMPHONY_BASE_STA_COST  * 2);
            const canContinue = m.mana >= mc && m.stamina >= sc;

            const contBtn = this._addBtn(
                `♪ Continue Symphony (-${mc} MP / -${sc} ST)`,
                canContinue,
                () => this.combat.bardContinueSymphony(),
            );
            contBtn.classList.add('combat-special-btn');
            contBtn.style.background = 'linear-gradient(135deg,#3a1060,#7a20b0)';
            contBtn.title = [
                `Symphony of Destruction — Round ${nextRound}`,
                `Deals sonic AoE damage to ALL enemies at ×${nextMult} the base magic damage.`,
                `Costs ${mc} MP and ${sc} ST this round (doubles each round).`,
                `Incorporeal enemies are immune to the symphony.`,
                !canContinue ? `Not enough mana and/or stamina (needs ${mc} MP, ${sc} ST).` : '',
            ].filter(Boolean).join('\n');

            const stopBtn = this._addBtn(
                `♪ Stop Symphony (free)`,
                true,
                () => this.combat.bardStopSymphony(),
            );
            stopBtn.classList.add('combat-special-btn');
            stopBtn.style.background = 'linear-gradient(135deg,#4a3000,#7a5500)';
            stopBtn.title = [
                `Stop the Symphony of Destruction (free action — does not end your turn).`,
                `All other abilities will become available again after stopping.`,
                `Current round: ${m.symphonyRound || 1}  |  Next round cost: ${mc} MP / ${sc} ST`,
            ].join('\n');
            return;
        }

        const mBonus = m.getClassDamageBonus('melee');
        const rBonus = m.getClassDamageBonus('ranged');
        const gBonus = m.getClassDamageBonus('magic');

        // Warrior L20 Defend Mode blocks all attacks this turn
        const inDefendMode = m.classId === 'warrior' && !!m.isDefendMode;
        const inAbyssForm = m.classId === 'warlock' && !!m.abyssFormActive;

        // ── Melee (gated by row)
        const canMelee = this.combat.canMelee(m) && !inDefendMode && !m.wildShapeForm && !inAbyssForm;
        const isMonk = m.classId === 'monk';
        const meleeStMiss = m.stamina < MELEE_STAMINA_COST;
        const meleeMpMiss = isMonk && m.mana < MONK_MELEE_MANA_COST;
        const meleeExhausted = meleeStMiss || meleeMpMiss;
        const meleeWeaponBonus = m.getWeaponBonus('melee');
        const meleeTotalBonus = meleeWeaponBonus + mBonus;
        let meleeLabel = `Melee (-${MELEE_STAMINA_COST} ST${isMonk ? ` / -${MONK_MELEE_MANA_COST} MP` : ''})`;
        if (meleeTotalBonus > 0) meleeLabel += ` +${meleeTotalBonus}`;
        if (meleeExhausted) meleeLabel += ' [HALF]';
        if (!canMelee) meleeLabel += ' [BACK ROW]';
        const meleeBtn = this._addBtn(meleeLabel, canMelee, () => {
            soundManager.playMelee();
            this._pickTarget(e => this.combat.meleeAttack(e));
        });
        const meleeStun = (MELEE_STUN_CHANCE + m.getMeleeStunBonus()) * 100;
        const meleeTipParts = [
            `Melee attack. Costs ${MELEE_STAMINA_COST} stamina${isMonk ? ` and ${MONK_MELEE_MANA_COST} mana (monk)` : ''}.`,
            `${meleeStun.toFixed(0)}% chance to stun enemy.`,
        ];
        if (mBonus > 0) meleeTipParts.push(`Damage bonus (class/species/level): +${mBonus}`);
        const extraMeleeCount = m.getExtraMeleeAttacks();
        if (extraMeleeCount > 0) {
            const nextBreak = m.classId === 'paladin' ? 7 : 5;
            const nextAt = (Math.floor(m.level / nextBreak) + 1) * nextBreak;
            meleeTipParts.push(`Extra attacks this turn: +${extraMeleeCount} (next at L${nextAt}).`);
        }
        if (isMonk) {
            const ww = (MONK_WHIRLWIND_CHANCE + m.getWhirlwindBonus()) * 100;
            meleeTipParts.push(`Whirlwind: ${ww.toFixed(0)}% chance to also hit each other enemy.`);
            const dodgePct = m.getEffectiveDodgePct() * 100;
            meleeTipParts.push(`Dodge: ${dodgePct.toFixed(0)}% chance to avoid melee hits (caps 95%). All incoming damage is reduced by this same %.`);
        }
        if (!canMelee && !inDefendMode) meleeTipParts.push('Cannot melee from back row (rogues only).');
        if (inDefendMode) meleeTipParts.push('Attacks disabled while in Defend Mode.');
        meleeBtn.title = meleeTipParts.join('\n');

        // ── Ranged (Artificers fire Scatter Shot instead of a normal single-target shot.)
        const rangedExhausted = m.stamina < RANGED_STAMINA_COST || inDefendMode || inAbyssForm;
        const rangedWeaponBonus = m.getWeaponBonus('ranged');
        const rangedTotalBonus = rangedWeaponBonus + rBonus;
        const isArtificer = m.classId === 'artificer';
        const splashCount = SCATTER_SPLASH_BASE + Math.floor(m.level / SCATTER_SPLASH_EVERY);
        let rangedLabel = isArtificer
            ? `\u{1F4A3} Scatter Shot (-${RANGED_STAMINA_COST} ST, 1+${splashCount})`
            : `Ranged (-${RANGED_STAMINA_COST} ST)`;
        if (rangedTotalBonus > 0) rangedLabel += ` +${rangedTotalBonus}`;
        if (rangedExhausted) rangedLabel += ' [HALF]';
        const rangedBtn = this._addBtn(rangedLabel, !inDefendMode && !m.wildShapeForm && !inAbyssForm, () => {
            soundManager.playRanged();
            if (isArtificer) {
                this._pickTarget(e => this.combat.scatterShot(e));
            } else {
                this._pickTarget(e => this.combat.rangedAttack(e));
            }
        });
        if (isArtificer) rangedBtn.classList.add('combat-special-btn');
        const crit = (RANGED_CRIT_CHANCE + m.getRangedCritBonus()) * 100;
        const rangedTip = isArtificer
            ? [
                `Artificer Scatter Shot. Costs ${RANGED_STAMINA_COST} stamina.`,
                `Primary target takes a full ranged hit; ${splashCount} splash shot${splashCount === 1 ? '' : 's'} hit other enemies for ${Math.round(Math.min(1.0, SCATTER_SPLASH_FRACTION + m.level * 0.01) * 100)}% damage (50% base + 1% per artificer level, max 100%).`,
                `Splashes gain +1 every ${SCATTER_SPLASH_EVERY} artificer levels.`,
                `${crit.toFixed(0)}% crit chance on each shot.`,
                ...(m.level >= ARTIFICER_DRONE_UNLOCK_LEVEL ? [
                    `L25 Enchanted Drone: each splash has a ${Math.round(Math.min(ARTIFICER_DRONE_CHANCE_CAP, m.level / 100) * 100)}% chance to spawn a drone. Drone randomly: revives a fallen ally, heals 5% missing HP (non-undead), grants 2 mirror images to a party member, AoE blasts all enemies, stuns a random enemy, crits a random enemy (×4), or ensnares a random enemy in bindings (-${Math.max(1,Math.floor(m.level/6))} atk/def for ${Math.max(1,Math.floor(m.level/6))} rds; incorporeal immune).`,
                ] : []),
            ]
            : [
                `Ranged attack. Costs ${RANGED_STAMINA_COST} stamina.`,
                `${crit.toFixed(0)}% chance for critical hit (double damage).`,
            ];
        if (rBonus > 0) rangedTip.push(`Damage bonus (class/species/level): +${rBonus}`);
        rangedBtn.title = rangedTip.join('\n');

        // ── Magic
        const magicManaCost = this.combat.getMagicManaCost(m);
        const magicExhausted = m.mana < magicManaCost || inDefendMode || inAbyssForm;
        const magicWeaponBonus = m.getWeaponBonus('magic');
        const magicTotalBonus = magicWeaponBonus + gBonus;
        let magicLabel = m.classId === 'warlock' ? `\u{1F9FF} Eldritch Bolt (-${magicManaCost} MP)` : `Magic (-${magicManaCost} MP)`;
        if (magicTotalBonus > 0) magicLabel += ` +${magicTotalBonus}`;
        if (magicExhausted) magicLabel += ' [HALF]';
        const magicBtn = this._addBtn(magicLabel, !inDefendMode && !m.wildShapeForm && !inAbyssForm, () => {
            soundManager.playMagic();
            if (m.classId === 'warlock') {
                this._pickTarget(e => this.combat.warlockBolt(e), {
                    prompt: '\u{1F9FF} Choose a target for Eldritch Bolt...',
                });
            } else {
                this.combat.magicAttack();
            }
        });
        const magicStunPct = m.getMagicStunBonus() * 100;
        const magicTip = [
            m.classId === 'warlock'
                ? `Warlock Eldritch Bolt. Costs ${magicManaCost} mana. Single target, bypasses armor/defense, +${m.level || 1}% damage.`
                : `Magic attack. Costs ${magicManaCost} mana.`,
            m.classId === 'warlock' ? null : `Hits ALL enemies.`,
        ];
        if (gBonus > 0) magicTip.push(`Damage bonus (class/species/level): +${gBonus}`);
        if (magicStunPct > 0) magicTip.push(`Mage: ${magicStunPct.toFixed(0)}% chance to stun foes with magic.`);
        if (m.classId === 'mage') magicTip.push(`Mage: ignores ${Math.min(100, m.level || 1)}% enemy defense on magic/AoE hits (level%).`);
        if (m.classId === 'necromancer') {
            const drainAmt = NECRO_LIFE_DRAIN_AMOUNT + m.getDrainBonus();
            magicTip.push(`Necromancer: ${Math.round(NECRO_LIFE_DRAIN_CHANCE * 100)}% to drain ${drainAmt} HP (self + own undead).`);
        }
        if (inAbyssForm) magicTip.push('Disabled while in Tentacled Horror form.');
        magicBtn.title = magicTip.join('\n');

        // ── Mage-specific: Arcane Shield (level 3+)
        if (m.classId === 'mage') {
            const shieldUnlocked = m.level >= MAGE_SHIELD_MIN_LEVEL;
            const shieldActive = (this.combat._mageShieldCasterId !== null);
            const canShield = shieldUnlocked && !shieldActive && m.mana >= MAGE_SHIELD_MANA_COST;
            const shieldBonus = MAGE_SHIELD_BASE_DEF + Math.floor(m.level / MAGE_SHIELD_BONUS_EVERY);
            const shieldRounds = MAGE_SHIELD_BASE_ROUNDS + Math.floor(m.level / MAGE_SHIELD_BONUS_EVERY);
            const shieldLabel = shieldUnlocked
                ? `\u{1F6E1}\uFE0F Arcane Shield (-${MAGE_SHIELD_MANA_COST} MP)`
                : `\u{1F6E1}\uFE0F Arcane Shield (L${MAGE_SHIELD_MIN_LEVEL})`;
            const shieldBtn = this._addBtn(shieldLabel, canShield, () => this.combat.mageShield());
            shieldBtn.classList.add('combat-special-btn');
            shieldBtn.title = [
                `Mage special: Arcane Shield (unlocks at level ${MAGE_SHIELD_MIN_LEVEL}).`,
                `Costs ${MAGE_SHIELD_MANA_COST} mana.`,
                `Grants all party members +${shieldBonus} defense for ${shieldRounds} rounds. Also absorbs AoE attacks targeting all rows.`,
                'Only one Arcane Shield can be active at a time. Falls if the mage is defeated.',
                !shieldUnlocked ? `Requires mage level ${MAGE_SHIELD_MIN_LEVEL}.` : '',
                shieldActive ? 'An Arcane Shield is already active.' : '',
                shieldUnlocked && !shieldActive && !canShield ? 'Not enough mana.' : '',
            ].filter(Boolean).join('\n');

            // ── Mirror Image (L20)
            const miUnlocked = m.level >= MAGE_MIRROR_IMAGE_UNLOCK_LEVEL;
            const miCount    = Math.floor(m.level / MAGE_MIRROR_IMAGE_COUNT_DIVISOR);
            const miActive   = (m.mirrorImages || 0) > 0;
            const miCan      = miUnlocked && !miActive && m.mana >= MAGE_MIRROR_IMAGE_MANA_COST;
            const miLabel    = miUnlocked
                ? (miActive
                    ? `\u{1FA9E} Mirror Image (${m.mirrorImages} remaining)`
                    : `\u{1FA9E} Mirror Image (-${MAGE_MIRROR_IMAGE_MANA_COST} MP)`)
                : `\u{1FA9E} Mirror Image (L${MAGE_MIRROR_IMAGE_UNLOCK_LEVEL})`;
            const miBtn = this._addBtn(miLabel, miCan, () => this.combat.mageCreateMirrorImages());
            miBtn.classList.add('combat-special-btn');
            if (miActive) miBtn.style.boxShadow = '0 0 8px #88aaff, 0 0 16px #4466ff66';
            miBtn.title = [
                `Mage L${MAGE_MIRROR_IMAGE_UNLOCK_LEVEL}: Mirror Image.`,
                `Costs ${MAGE_MIRROR_IMAGE_MANA_COST} mana. Creates ${miCount} illusory duplicate(s).`,
                'Each image absorbs ONE hit of any type (melee, ranged, magic, or AoE) before shattering.',
                'While images remain, all incoming hits strike a random image instead of the mage.',
                !miUnlocked ? `Requires mage level ${MAGE_MIRROR_IMAGE_UNLOCK_LEVEL}.` : '',
                miActive ? `${m.mirrorImages} image(s) still active — cannot cast again while images remain.` : '',
                miUnlocked && !miActive && !miCan ? 'Not enough mana.' : '',
            ].filter(Boolean).join('\n');

            // ── Mage L30: Arcane Overload (passive — fires automatically on magic attack; indicator only)
            if (m.level >= MAGE_ARCANE_OVERLOAD_UNLOCK_LEVEL) {
                const aoBurstChance = Math.round(Math.min(100, (MAGE_ARCANE_OVERLOAD_BURST_BASE + m.level * 0.01) * 100));
                const aoInfo = document.createElement('div');
                aoInfo.style.cssText = `
                    margin-top:4px; padding:4px 8px; font-size:11px; color:#cc88ff;
                    border:1px solid #664488; border-radius:4px; background:#22113344;
                `;
                aoInfo.textContent = `✨ Arcane Overload active — ${aoBurstChance}% 2nd burst (×2 MP), cascading`;
                aoInfo.title = [
                    `Mage L${MAGE_ARCANE_OVERLOAD_UNLOCK_LEVEL}: Arcane Overload (passive).`,
                    `Each Magic Attack has a ${aoBurstChance}% chance to fire an extra burst at 2× mana cost.`,
                    `Each successive burst is ${Math.round(MAGE_ARCANE_OVERLOAD_BURST_STEP * 100)}% less likely but doubles the mana cost again.`,
                    'If mana is insufficient for the next burst, the chain collapses.',
                    'Bursts use the same damage formula, target count, and AoE crit chance as the base attack.',
                ].join('\n');
                this.actionsEl.appendChild(aoInfo);
            }

            // ── Mage L30: Elemental Rift (free action, once per combat)
            if (m.level >= MAGE_ELEMENTAL_RIFT_UNLOCK_LEVEL) {
                const riftOpen   = !!m.elementalRiftOpen;
                const riftUsed   = !!m.elementalRiftUsed;
                const riftAfford = m.mana >= MAGE_ELEMENTAL_RIFT_MANA_INITIAL;
                const riftCan    = !riftUsed && riftAfford;
                const summonPct  = Math.min(100, m.level + MAGE_ELEMENTAL_RIFT_SUMMON_BASE);
                const riftLabel  = riftOpen
                    ? `\u{1F300} Elemental Rift (open — ${MAGE_ELEMENTAL_RIFT_MANA_PER_ROUND} MP/round)`
                    : riftUsed
                        ? `\u{1F300} Elemental Rift (spent)`
                        : `\u{1F300} Elemental Rift (-${MAGE_ELEMENTAL_RIFT_MANA_INITIAL} MP)`;
                const riftBtn = this._addBtn(riftLabel, riftCan, () => this.combat.mageOpenElementalRift());
                riftBtn.classList.add('combat-special-btn');
                if (riftOpen) riftBtn.style.boxShadow = '0 0 8px #44ccff, 0 0 18px #2288ff66';
                riftBtn.title = [
                    `Mage L${MAGE_ELEMENTAL_RIFT_UNLOCK_LEVEL}: Elemental Rift (free action, once per combat).`,
                    `Costs ${MAGE_ELEMENTAL_RIFT_MANA_INITIAL} MP to open; ${MAGE_ELEMENTAL_RIFT_MANA_PER_ROUND} MP/round upkeep.`,
                    `Each round the rift is open: ${summonPct}% chance to summon a random elemental (fire/water/earth/air).`,
                    'Elementals are immune to charm/enslavement and their respective element DoTs.',
                    'Fire Elemental: AoE magic + burn DoT + stun chance.',
                    'Water Elemental: AoE magic + drowning DoT (living targets).',
                    'Air Elemental: AoE magic + stun chance (incorporeal — immune to physical CC).',
                    'Earth Elemental: 2× HP, +20 def; melee or AoE, stun chance.',
                    riftUsed ? 'Already used this combat.' : '',
                    !riftAfford && !riftUsed ? `Not enough mana (needs ${MAGE_ELEMENTAL_RIFT_MANA_INITIAL} MP).` : '',
                ].filter(Boolean).join('\n');
            }
        }

        // ── Class specials
        if (m.classId === 'rogue') {
            const cost = MELEE_STAMINA_COST * BACKSTAB_STAMINA_MULT;
            const exhausted = m.stamina < cost;
            const label = `\u{1F5E1}\uFE0F Backstab (-${cost} ST)${exhausted ? ' [HALF]' : ''}`;
            const backstabFilter = e => {
                const def = ENEMY_TYPES[e.type] || {};
                const tags = def.tags || [];
                return !tags.includes('incorporeal') && !tags.includes('slime') && !def.noBackstab;
            };
            const btn = this._addBtn(label, true, () => {
                soundManager.playMelee();
                this._pickTarget(e => this.combat.backstab(e), {
                    filter: backstabFilter,
                    prompt: '🗡️ Backstab — choose a target!',
                });
            });
            btn.classList.add('combat-special-btn');
            const instakill = (BACKSTAB_INSTAKILL_CHANCE + m.getInstakillBonus()) * 100;
            const bonusPct = Math.round(BACKSTAB_DAMAGE_PER_LEVEL * m.level * 100);
                        const hasTwinFangs = m.level >= ROGUE_TWIN_FANGS_UNLOCK_LEVEL && typeof m.hasOffhandMeleeWeapon === 'function' && m.hasOffhandMeleeWeapon();
            const shadowActive = Array.isArray(m.activeEffects) && m.activeEffects.some(fx => fx.type === 'shadow_step' && fx.rounds > 0);
            btn.title = [
                'Rogue special: Backstab. (Works from any row.)',
                `Costs ${cost} stamina (3× melee cost).`,
                `Deals ${BACKSTAB_DAMAGE_MULT}× melee damage, then +${bonusPct}% (10% per rogue level).`,
                `${instakill.toFixed(0)}% chance for an INSTANT KILL (not vs. Bosses or Mega Bosses).`,
                'Rogues can also spot and disarm dungeon traps while exploring.',
                m.level >= ROGUE_TRAP_UNLOCK_LEVEL
                    ? `L${ROGUE_TRAP_UNLOCK_LEVEL}: successful disarms recover Captured Traps; magic/AoE evasion chance ${m.level}% for ${ROGUE_EVASION_STAMINA_COST} stamina.`
                    : `L${ROGUE_TRAP_UNLOCK_LEVEL}: recover traps and evade magic/AoE attacks.`,
                m.level >= ROGUE_BACKSTAB_BLEED_UNLOCK_LEVEL
                    ? `L${ROGUE_BACKSTAB_BLEED_UNLOCK_LEVEL}+: Backstab Bleed — applies ${Math.round(ROGUE_BACKSTAB_BLEED_FRAC*100)}% of dealt dmg as bleed DoT for ${Math.floor(m.level/ROGUE_BACKSTAB_BLEED_DURATION_DIVISOR)} rounds (immune: undead, construct, elemental, incorporeal, plant, slime).`
                    : `L${ROGUE_BACKSTAB_BLEED_UNLOCK_LEVEL}: Backstab Bleed unlocks — every backstab applies a stacking bleed DoT (${Math.round(ROGUE_BACKSTAB_BLEED_FRAC*100)}% dealt dmg/rd, floor(level/${ROGUE_BACKSTAB_BLEED_DURATION_DIVISOR}) rounds).`,
                m.level >= ROGUE_TWIN_FANGS_UNLOCK_LEVEL
                    ? hasTwinFangs
                        ? `L${ROGUE_TWIN_FANGS_UNLOCK_LEVEL} Twin Fangs ACTIVE: offhand follows up at ${ROGUE_TWIN_FANGS_OFFHAND_MULT}× fresh offhand weapon roll × level scaling (NOT multiplied by the ×${BACKSTAB_DAMAGE_MULT} backstab multiplier); half normal backstab instakill chance; independent bleed DoT.`
                        : `L${ROGUE_TWIN_FANGS_UNLOCK_LEVEL} Twin Fangs: equip an offhand melee weapon to unlock the second strike.`
                    : `L${ROGUE_TWIN_FANGS_UNLOCK_LEVEL}: Twin Fangs unlocks — offhand melee follow-up strike on every Backstab.`,
                shadowActive ? `🌑 Shadow Step active (${(m.activeEffects.find(fx => fx.type === 'shadow_step') || {}).rounds || 0} rds) — Backstab deals ×${ROGUE_SHADOW_STEP_BACKSTAB_MULT} damage!` : '',
            ].filter(Boolean).join('\n')

            if (m.level >= ROGUE_TRAP_UNLOCK_LEVEL) {
                const trapCount = (m.inventory || []).reduce((sum, item) =>
                    sum + (item && item.itemId === 'captured_trap' ? item.quantity || 0 : 0), 0);
                const canTrap = trapCount > 0 && this.combat.aliveHostileEnemies.length > 0;
                const trapBtn = this._addBtn(`🪤 Spring Trap (${trapCount})`, canTrap, () => this.combat.rogueSetTrap());
                trapBtn.classList.add('combat-special-btn');
                trapBtn.title = [
                    `Rogue L${ROGUE_TRAP_UNLOCK_LEVEL}: Spring Captured Trap.`,
                    'Consumes one Captured Trap from this rogue.',
                    'Hits ALL hostile monsters for melee-type damage equal to twice a normal rogue melee roll.',
                    `Applies a trap wound DoT for ${Math.round(ROGUE_TRAP_DOT_FRACTION * 100)}% of initial damage per round for ${ROGUE_TRAP_DOT_ROUNDS} rounds; newer trap wounds overwrite older ones.`,
                    'Incorporeal enemies are immune.',
                    trapCount <= 0 ? 'No Captured Traps in this rogue inventory.' : '',
                ].filter(Boolean).join('\n');
            }

            // L30 Shadow Step button
            if (m.level >= ROGUE_SHADOW_STEP_UNLOCK_LEVEL) {
                const ssActive  = Array.isArray(m.activeEffects) && m.activeEffects.some(fx => fx.type === 'shadow_step' && fx.rounds > 0);
                const ssUsed    = !!m.shadowStepUsed;
                const ssCanCast = !ssUsed && !ssActive && m.stamina >= ROGUE_SHADOW_STEP_STAMINA_COST;
                const _ssFx     = ssActive ? m.activeEffects.find(fx => fx.type === 'shadow_step') : null;
                const ssRounds  = _ssFx ? (_ssFx.rounds || 0) : 0;
                const ssLabel   = ssActive
                    ? `🌑 Shadow Step (${ssRounds} rds left)`
                    : ssUsed ? '🌑 Shadow Step (used)' : `🌑 Shadow Step (-${ROGUE_SHADOW_STEP_STAMINA_COST} ST)`;
                const ssBtn = this._addBtn(ssLabel, ssCanCast, () => this.combat.rogueShadowStep());
                ssBtn.classList.add('combat-special-btn');
                ssBtn.title = [
                    `Rogue L${ROGUE_SHADOW_STEP_UNLOCK_LEVEL}: Shadow Step (1×/combat).`,
                    `Costs ${ROGUE_SHADOW_STEP_STAMINA_COST} stamina. Lasts ${ROGUE_SHADOW_STEP_DURATION} rounds.`,
                    'While active: completely untargetable — all enemy attacks and status effects pass through harmlessly.',
                    `Backstab deals ×${ROGUE_SHADOW_STEP_BACKSTAB_MULT} damage while in Shadow Step (stacks with Twin Fangs and all other bonuses).`,
                    ssActive ? `Currently active: ${ssRounds} round(s) remaining.` : '',
                    ssUsed && !ssActive ? 'Already used this combat.' : '',
                    !ssUsed && !ssActive && m.stamina < ROGUE_SHADOW_STEP_STAMINA_COST ? `Need ${ROGUE_SHADOW_STEP_STAMINA_COST} stamina (have ${m.stamina}).` : '',
                ].filter(Boolean).join('\n');
            }        }

        if (m.classId === 'barbarian') {
            const rageExtraAttacks = Math.floor((m.level || 1) / 3);
            const rageDisabled = m.usedRage || false;
            const rageLabel = rageDisabled
                ? '\u{1F534} Rage (used)'
                : `\u{1F534} Rage (+${m.level} dmg, ${rageExtraAttacks} extra atk/rd)`;
            const rageBtn = this._addBtn(rageLabel, !rageDisabled, () => {
                this.combat.barbarianRage();
                // Rage is a free action — immediately prompt target selection so
                // the player chooses who to unleash the first strike on.
                if (this.combat.currentMember?.isRaging) {
                    this._pickTarget(e => this.combat.meleeAttack(e), {
                        prompt: '\u{1F534} RAGING — choose your target!',
                    });
                }
            });
            rageBtn.classList.add('combat-special-btn');
            rageBtn.title = [
                'Barbarian special: Rage (once per combat, free action).',
                'Halves ALL incoming damage while raging.',
                'Immune to stun while raging.',
                `Regens ${Math.round(5)}% max HP per round while raging.`,
                `+${m.level} to melee damage rolls while raging.`,
                `${rageExtraAttacks} extra melee strike(s) per attack (each costs ${BARBARIAN_RAGE_STAMINA_COST} ST).`,
                m.level >= BARBARIAN_BLOOD_FRENZY_UNLOCK_LEVEL
                    ? `L${BARBARIAN_BLOOD_FRENZY_UNLOCK_LEVEL} Blood Frenzy: +${Math.round(BARBARIAN_BLOOD_FRENZY_DAMAGE_PER_BLEED * 100)}% melee damage per bleed DoT on target while raging (cap: level×3%).`
                    : null,
                rageDisabled ? 'Already used this combat.' : 'Lasts until end of combat.',
            ].filter(Boolean).join('\n');

            // Heroic Deeds (L30)
            if (m.level >= BARBARIAN_HEROIC_DEEDS_UNLOCK_LEVEL) {
                const tokens = m.heroicDeedTokens || 0;
                const hasToken = tokens >= 1;
                const deedLabel = `🏆 Heroic Deeds (${tokens})`;
                const deedBtn = this._addBtn(deedLabel, hasToken, () => {
                    // Toggle a sub-panel with the four deed buttons
                    const existing = this.actionsEl.querySelector('.heroic-deeds-panel');
                    if (existing) { existing.remove(); return; }
                    const panel = document.createElement('div');
                    panel.className = 'heroic-deeds-panel combat-subpanel';
                    panel.style.cssText = 'display:flex;flex-direction:column;gap:4px;margin-top:4px;padding:4px;border:1px solid #a07030;background:#1a1008;';

                    // 1. Rapid Assault
                    const raBtn = document.createElement('button');
                    raBtn.textContent = '⚡ Rapid Assault';
                    raBtn.className = 'combat-special-btn';
                    raBtn.disabled = !hasToken;
                    raBtn.title = 'Free action. Double your attacks this round — fires a second full melee chain on your target.';
                    raBtn.onclick = () => {
                        this.combat.barbarianRapidAssault();
                        panel.remove();
                        this._refresh();
                        if (this.combat.currentMember?.rapidAssaultPending) {
                            this._pickTarget(e => this.combat.meleeAttack(e), {
                                prompt: '⚡ RAPID ASSAULT — choose your target!',
                            });
                        }
                    };
                    panel.appendChild(raBtn);

                    // 2. Reckless Move
                    const rmBtn = document.createElement('button');
                    rmBtn.textContent = '💥 Reckless Move';
                    rmBtn.className = 'combat-special-btn';
                    rmBtn.disabled = !hasToken;
                    rmBtn.title = [
                        'Free action. Slam into up to 4 random enemies.',
                        'Each takes single melee damage (Blood Frenzy applies).',
                        'Non-incorporeal, non-boss enemies may be knocked back (lose next turn).',
                        'Resist chance = enemy level% (cap 90%).',
                    ].join('\n');
                    rmBtn.onclick = () => {
                        this.combat.barbarianRecklessMove();
                        panel.remove();
                        this._refresh();
                        const cur = this.combat.currentMember;
                        if (cur && cur.health > 0) {
                            const prompt = cur.isRaging
                                ? '\u{1F534} RAGING — choose your attack target!'
                                : '💥 Reckless Move done — choose your attack target!';
                            this._pickTarget(e => this.combat.meleeAttack(e), { prompt });
                        }
                    };
                    panel.appendChild(rmBtn);

                    // 3. Refreshing Mead
                    const meadBtn = document.createElement('button');
                    meadBtn.textContent = '🍺 Refreshing Mead';
                    meadBtn.className = 'combat-special-btn';
                    meadBtn.disabled = !hasToken;
                    meadBtn.title = [
                        'Free action. Quaff a legendary mead.',
                        'Restore 50% max HP and 50% max stamina.',
                        'Remove all negative effects, DoTs, and status ailments.',
                    ].join('\n');
                    meadBtn.onclick = () => {
                        this.combat.barbarianRefreshingMead();
                        panel.remove();
                        this._refresh();
                    };
                    panel.appendChild(meadBtn);

                    // 4. Battle Horn
                    const hornBtn = document.createElement('button');
                    hornBtn.textContent = '📯 Battle Horn';
                    hornBtn.className = 'combat-special-btn';
                    hornBtn.disabled = !hasToken;
                    const hornPenalty = Math.floor(m.level / 3);
                    hornBtn.title = [
                        'Free action. Blow the Battle Horn — sonic + psychic fear AoE.',
                        `Applies -${hornPenalty} attack and -${hornPenalty} defense to all affected enemies (entire combat).`,
                        'Immune: undead, constructs, elementals, plants, incorporeal.',
                        '50% resist chance per enemy.',
                    ].join('\n');
                    hornBtn.onclick = () => {
                        this.combat.barbarianBattleHorn();
                        panel.remove();
                        this._refresh();
                    };
                    panel.appendChild(hornBtn);

                    this.actionsEl.appendChild(panel);
                });
                deedBtn.classList.add('combat-special-btn');
                deedBtn.title = [
                    `Barbarian L${BARBARIAN_HEROIC_DEEDS_UNLOCK_LEVEL}: Heroic Deeds (free actions).`,
                    'Earn 1 token per enemy kill. Tokens vanish at end of combat.',
                    `Current tokens: ${tokens}.`,
                    'Deeds: Rapid Assault (×2 attacks), Reckless Move (knock 4 enemies), Refreshing Mead (+50% HP/ST, clear effects), Battle Horn (fear AoE).',
                ].join('\n');
            }
        }

        if (m.classId === 'cleric') {
            const can = m.mana >= CLERIC_HEAL_MANA_COST;
            const label = `\u2728 Heal (-${CLERIC_HEAL_MANA_COST} MP)`;
            const btn = this._addBtn(label, can, () => {
                this._pickPartyTarget(t => this.combat.clericHeal(t), {
                    filter: (pm) => pm.health > 0 && pm.health < pm.maxHealth && (!pm.isSummoned || pm.canBeHealed),
                    prompt: 'Heal whom?',
                    includeCharmed: true,
                });
            });
            btn.classList.add('combat-special-btn');
            const healPct = (CLERIC_HEAL_PERCENT + m.getHealPercentBonus()) * 100;
            btn.title = [
                'Cleric special: Heal.',
                `Costs ${CLERIC_HEAL_MANA_COST} mana.`,
                `Restores ${healPct.toFixed(0)}% of target's max HP.`,
                'Heals ranger summons and charmed monsters (non-undead/construct/elemental types); cannot heal undead (those use necromancer life drain).',
                m.level >= CLERIC_CLEANSE_UNLOCK_LEVEL ? `L25 passive: ${Math.round(m.getClericCleanseChance() * 100)}% chance to purge harmful states; ${CLERIC_CLEANSE_MANA_PER_STATE} MP per state removed.` : '',
                !can ? 'Not enough mana.' : '',
            ].filter(Boolean).join('\n');

            // Phase 10 — Cleric Revive, unlocked at level 3.
            const hasDead = (this.combat.party || []).some(
                pm => !pm.isSummoned && pm.health <= 0 && !pm.lichPhial,
            );
            const reviveUnlocked = m.level >= CLERIC_REVIVE_MIN_LEVEL;
            const canRevive = reviveUnlocked && m.mana >= CLERIC_REVIVE_MANA_COST && hasDead;
            const reviveLabel = reviveUnlocked
                ? `\u{1F54A}\uFE0F Revive (-${CLERIC_REVIVE_MANA_COST} MP)`
                : `\u{1F54A}\uFE0F Revive (L${CLERIC_REVIVE_MIN_LEVEL})`;
            const reviveBtn = this._addBtn(reviveLabel, canRevive, () => {
                this._pickPartyTarget(t => this.combat.clericRevive(t), {
                    filter: (pm) => !pm.isSummoned && pm.health <= 0 && !pm.lichPhial,
                    prompt: 'Revive whom?',
                });
            });
            reviveBtn.classList.add('combat-special-btn');
            const revPct = Math.round(CLERIC_REVIVE_HEAL_FRAC * 100);
            reviveBtn.title = [
                'Cleric special: Revive (unlocks at level 3).',
                `Costs ${CLERIC_REVIVE_MANA_COST} mana.`,
                `Brings a fallen ally back at ${revPct}% of max HP.`,
                'Cannot target the living, summons, or undead minions.',
                !reviveUnlocked ? `Requires cleric level ${CLERIC_REVIVE_MIN_LEVEL}.` : '',
                reviveUnlocked && !hasDead ? 'No fallen allies to revive.' : '',
                reviveUnlocked && m.mana < CLERIC_REVIVE_MANA_COST ? 'Not enough mana.' : '',
            ].filter(Boolean).join('\n');

            // Mass Heal — unlocked at level 4
            const massUnlocked = m.level >= 4;
            const canMass = massUnlocked && m.mana >= CLERIC_HEAL_MANA_COST;
            const massLabel = massUnlocked
                ? `\u2728\u2728 Mass Heal (-${CLERIC_HEAL_MANA_COST} MP)`
                : `\u2728\u2728 Mass Heal (L4)`;
            const massBtn = this._addBtn(massLabel, canMass, () => this.combat.clericMassHeal());
            massBtn.classList.add('combat-special-btn');
            const massPct = Math.round((CLERIC_HEAL_PERCENT + m.getHealPercentBonus()) * 50);
            massBtn.title = [
                'Cleric special: Mass Heal (unlocks at level 4).',
                `Costs ${CLERIC_HEAL_MANA_COST} mana.`,
                `Heals all living party members for ${massPct}% of their max HP.`,
                m.level >= CLERIC_CLEANSE_UNLOCK_LEVEL ? `L25 passive: ${Math.round(m.getClericCleanseChance() * 100)}% chance to purge harmful states across healed allies; ${CLERIC_CLEANSE_MANA_PER_STATE} MP per state removed.` : '',
                !massUnlocked ? 'Requires cleric level 4.' : '',
                massUnlocked && !canMass ? 'Not enough mana.' : '',
            ].filter(Boolean).join('\n');

            // Turn Undead — unlocked at level 6
            const turnUnlocked = m.level >= CLERIC_TURN_UNDEAD_MIN_LEVEL;
            const hasUndead = (this.combat.aliveEnemies || []).some(e => {
                const tags = (ENEMY_TYPES[e.type] || {}).tags || [];
                return tags.includes('undead');
            });
            const canTurn = turnUnlocked && m.mana >= CLERIC_TURN_UNDEAD_MANA_COST && hasUndead;
            const turnLabel = turnUnlocked
                ? `\u271D\uFE0F Turn Undead (-${CLERIC_TURN_UNDEAD_MANA_COST} MP)`
                : `\u271D\uFE0F Turn Undead (L${CLERIC_TURN_UNDEAD_MIN_LEVEL})`;
            const turnBtn = this._addBtn(turnLabel, canTurn, () => this.combat.clericTurnUndead());
            turnBtn.classList.add('combat-special-btn');
            const turnDebuff = CLERIC_TURN_UNDEAD_DEBUFF_BASE + Math.floor(m.level / CLERIC_TURN_UNDEAD_DEBUFF_EVERY);
            turnBtn.title = [
                `Cleric special: Turn Undead (unlocks at level ${CLERIC_TURN_UNDEAD_MIN_LEVEL}).`,
                `Costs ${CLERIC_TURN_UNDEAD_MANA_COST} mana.`,
                `Deals 2× magic attack damage × (1 + 5% per cleric level) to ALL undead enemies (at L${m.level}: ×${(2 * (1 + 0.05 * (m.level || 1))).toFixed(1)} total multiplier).`,
                `Debuffs undead: -${turnDebuff} attack & defense for several rounds.`,
                !turnUnlocked ? `Requires cleric level ${CLERIC_TURN_UNDEAD_MIN_LEVEL}.` : '',
                turnUnlocked && !hasUndead ? 'No undead enemies in this fight.' : '',
                turnUnlocked && hasUndead && m.mana < CLERIC_TURN_UNDEAD_MANA_COST ? 'Not enough mana.' : '',
            ].filter(Boolean).join('\n');

            // ── Mass Regen — unlocked at level 20
            const massRegenUnlocked = m.level >= CLERIC_MASS_REGEN_UNLOCK_LEVEL;
            const canMassRegen = massRegenUnlocked && m.mana >= CLERIC_MASS_REGEN_MANA_COST;
            const massRegenLabel = massRegenUnlocked
                ? `🌿 Mass Regen (-${CLERIC_MASS_REGEN_MANA_COST} MP)`
                : `🌿 Mass Regen (L${CLERIC_MASS_REGEN_UNLOCK_LEVEL})`;
            const massRegenBtn = this._addBtn(massRegenLabel, canMassRegen, () => this.combat.clericMassRegen());
            massRegenBtn.classList.add('combat-special-btn');
            const regenHealPct  = Math.round((CLERIC_MASS_REGEN_BASE_PCT + Math.floor(m.level / 3) * CLERIC_MASS_REGEN_PER_3_LEVELS) * 100);
            const regenDuration = Math.floor(m.level / CLERIC_MASS_REGEN_DURATION_PER_4LV);
            massRegenBtn.title = [
                `Cleric L20 special: Mass Regen (unlocks at level ${CLERIC_MASS_REGEN_UNLOCK_LEVEL}).`,
                `Costs ${CLERIC_MASS_REGEN_MANA_COST} mana.`,
                `Applies a healing over time to ALL living party members (except undead/golems).`,
                `Heals ${regenHealPct}% of max HP per round for ${regenDuration} rounds.`,
                'Refreshes if cast again while already active.',
                !massRegenUnlocked ? `Requires cleric level ${CLERIC_MASS_REGEN_UNLOCK_LEVEL}.` : '',
                massRegenUnlocked && !canMassRegen ? 'Not enough mana.' : '',
            ].filter(Boolean).join('\n');

            // ── Mass Revive — unlocked at level 20
            const massReviveUnlocked = m.level >= CLERIC_MASS_REVIVE_UNLOCK_LEVEL;
            const massReviveCount    = Math.floor(m.level / CLERIC_MASS_REVIVE_COUNT_DIVISOR);
            const hasFallenAllies    = (this.combat.party || []).some(pm => !pm.isSummoned && pm.health <= 0 && !pm.lichPhial);
            const canMassRevive = massReviveUnlocked && m.mana >= CLERIC_MASS_REVIVE_MANA_COST && hasFallenAllies;
            const massReviveLabel = massReviveUnlocked
                ? `🕊️ Mass Revive (-${CLERIC_MASS_REVIVE_MANA_COST} MP)`
                : `🕊️ Mass Revive (L${CLERIC_MASS_REVIVE_UNLOCK_LEVEL})`;
            const massReviveBtn = this._addBtn(massReviveLabel, canMassRevive, () => this.combat.clericMassRevive());
            massReviveBtn.classList.add('combat-special-btn');
            const reviveHealPct = Math.round((CLERIC_MASS_REVIVE_HEAL_BASE + Math.floor(m.level / 3) * CLERIC_MASS_REVIVE_HEAL_PER_3LV) * 100);
            massReviveBtn.title = [
                `Cleric L20 special: Mass Revive (unlocks at level ${CLERIC_MASS_REVIVE_UNLOCK_LEVEL}).`,
                `Costs ${CLERIC_MASS_REVIVE_MANA_COST} mana.`,
                `Revives up to ${massReviveCount} fallen allies at ${reviveHealPct}% HP (auto-selects first in party order).`,
                'Cannot target summons or undead minions.',
                !massReviveUnlocked ? `Requires cleric level ${CLERIC_MASS_REVIVE_UNLOCK_LEVEL}.` : '',
                massReviveUnlocked && !hasFallenAllies ? 'No fallen allies to revive.' : '',
                massReviveUnlocked && hasFallenAllies && m.mana < CLERIC_MASS_REVIVE_MANA_COST ? 'Not enough mana.' : '',
            ].filter(Boolean).join('\n');

            // ── Spiritual Weapon — L30
            if (m.level >= CLERIC_SPIRITUAL_WEAPON_UNLOCK_LEVEL) {
                const swActive = (m.spiritualWeapons || []).length;
                const swCan    = m.mana >= CLERIC_SPIRITUAL_WEAPON_SUMMON_COST;
                const swAtks   = Math.max(1, Math.floor((m.level || 1) / CLERIC_SPIRITUAL_WEAPON_ATK_DIVISOR));
                const swUpkeep = swActive * CLERIC_SPIRITUAL_WEAPON_UPKEEP;
                const swLabel  = swActive > 0
                    ? `⚔️ Spiritual Weapon (-${CLERIC_SPIRITUAL_WEAPON_SUMMON_COST} MP) [${swActive} active]`
                    : `⚔️ Spiritual Weapon (-${CLERIC_SPIRITUAL_WEAPON_SUMMON_COST} MP)`;
                const swBtn = this._addBtn(swLabel, swCan, () => this.combat.clericSummonSpiritualWeapon());
                swBtn.classList.add('combat-special-btn');
                swBtn.title = [
                    `Cleric L${CLERIC_SPIRITUAL_WEAPON_UNLOCK_LEVEL}: Spiritual Weapon.`,
                    `Costs ${CLERIC_SPIRITUAL_WEAPON_SUMMON_COST} MP to summon. Multiples allowed.`,
                    `Each weapon attacks ${swAtks} time${swAtks !== 1 ? 's' : ''} per round (floor(level/8)), hitting a random enemy.`,
                    `Damage: melee weapon roll + magic class bonus. Qualifies as ranged and magic (force).`,
                    `Upkeep: ${CLERIC_SPIRITUAL_WEAPON_UPKEEP} MP/round per weapon. Currently maintaining: ${swActive > 0 ? `${swActive} weapon${swActive !== 1 ? 's' : ''} (${swUpkeep} MP/round)` : 'none'}.`,
                    `Immune to all damage, debuffs, DoTs, holds, and stuns. Back-row construct of force.`,
                    `Dismissed if cleric dies or at end of combat. Fires immediately when summoned.`,
                    !swCan ? `Not enough mana (need ${CLERIC_SPIRITUAL_WEAPON_SUMMON_COST} MP).` : '',
                ].filter(Boolean).join('\n');
            }

            // ── Banishment — L30
            if (m.level >= CLERIC_BANISHMENT_UNLOCK_LEVEL) {
                const banCan = m.mana >= CLERIC_BANISHMENT_MANA_COST;
                // Valid targets: alive enemies with elemental or demon tag
                const validTargets = (this.combat.aliveHostileEnemies || []).filter(e =>
                    CLERIC_BANISHMENT_TAGS.some(t => (this.combat._getEnemyTags(e) || []).includes(t)));
                const hasTarget = validTargets.length > 0;
                const canBanish = banCan && hasTarget;
                const banLabel  = canBanish
                    ? `✨ Banishment (-${CLERIC_BANISHMENT_MANA_COST} MP)`
                    : hasTarget
                        ? `✨ Banishment (need ${CLERIC_BANISHMENT_MANA_COST} MP)`
                        : `✨ Banishment [no valid targets]`;
                const banBtn = this._addBtn(banLabel, canBanish, () => {
                    this._pickTarget(e => this.combat.clericBanishment(e), {
                        prompt: '✨ Choose a target for Banishment (elemental or demon)...',
                        filter: e => CLERIC_BANISHMENT_TAGS.some(t => (this.combat._getEnemyTags(e) || []).includes(t)),
                    });
                });
                banBtn.classList.add('combat-special-btn');
                const banishChance = Math.min(100, m.level);
                banBtn.title = [
                    `Cleric L${CLERIC_BANISHMENT_UNLOCK_LEVEL}: Banishment.`,
                    `Costs ${CLERIC_BANISHMENT_MANA_COST} MP. Target must be an elemental or demon.`,
                    `${banishChance}% chance to instantly destroy the target outright.`,
                    `Bosses & mega-bosses: immune to instant destruction, but still take the full ×20 holy force damage.`,
                    `If not destroyed: deals magic roll × 20 holy force damage, bypassing all defense.`,
                    `Valid targets currently: ${validTargets.length > 0 ? validTargets.map(e => this.combat._eName(e)).join(', ') : 'none'}.`,
                    !banCan ? `Not enough mana (need ${CLERIC_BANISHMENT_MANA_COST} MP).` : '',
                    !hasTarget ? 'No elemental or demon targets in this fight.' : '',
                ].filter(Boolean).join('\n');
            }
        }

        if (m.classId === 'necromancer') {
            // Can afford at least skeleton (tier 0 = 7 MP)
            const can = m.mana >= NECRO_SUMMON_MANA_COST;
            const label = `\u{1F480} Summon Undead (${NECRO_SUMMON_MANA_COST}–${NECRO_SUMMON_MANA_COST + 7} MP)`;
            const btn = this._addBtn(label, can, () => this._showUndeadPicker(m));
            btn.classList.add('combat-special-btn');
            const tiers = this.combat.getAvailableNecroTiers(m.level);
            btn.title = [
                'Necromancer special: Summon Undead.',
                `Mana cost by tier: Skeleton 7, Zombie 8, Ghoul 9, Spectre 10, Mummy 11, Ghost 12, Vampire 13, Death Knight 14. Horde = ×2.`,
                `Unlocked tiers at level ${m.level}: ${tiers.map(t => t.name).join(', ')}.`,
                'Undead cannot be healed by clerics — use life-drain instead (also heals your undead).',
                'Higher tiers = +50% HP, +2 damage, +1 defense per step (plus +1 melee & +1 defense per necromancer level).',
                '40% chance to summon a 2nd undead (free), then 35% for a 3rd, etc. (+1% per necromancer level).',
                'Acts immediately on summon (inherits caster initiative).',
                !can ? 'Not enough mana.' : '',
            ].filter(Boolean).join('\n');

            // Dark Harvest button
            const dhHpCost = Math.max(1, Math.floor(m.maxHealth  * NECRO_DARK_HARVEST_HP_FRAC));
            const dhStCost = Math.max(1, Math.floor(m.maxStamina * NECRO_DARK_HARVEST_ST_FRAC));
            const dhMpGain = Math.max(1, Math.floor(m.maxMana    * NECRO_DARK_HARVEST_MANA_FRAC));
            const dhCan = m.health > dhHpCost && m.mana < m.maxMana;
            const dhBtn = this._addBtn(`\u{1F480} Dark Harvest (−${dhHpCost}HP −${dhStCost}ST → +${dhMpGain}MP)`, dhCan, () => {
                this.combat.necromancerDarkHarvest();
            });
            dhBtn.classList.add('combat-special-btn');
            dhBtn.title = [
                'Necromancer special: Dark Harvest.',
                `Sacrifices ${Math.round(NECRO_DARK_HARVEST_HP_FRAC * 100)}% max HP (${dhHpCost}) and ${Math.round(NECRO_DARK_HARVEST_ST_FRAC * 100)}% max Stamina (${dhStCost})`,
                `to gain ${Math.round(NECRO_DARK_HARVEST_MANA_FRAC * 100)}% max Mana (${dhMpGain}).`,
                'Cannot reduce HP to 0. Uses the turn.',
                !dhCan && m.mana >= m.maxMana ? 'Mana is already full.' : '',
                !dhCan && m.health <= dhHpCost ? 'Not enough health (must keep ≥1 HP).' : '',
            ].filter(Boolean).join('\n');

            // ── Lich Form (L20)
            const lichUnlocked = m.level >= NECRO_LICH_FORM_UNLOCK_LEVEL;
            const lichActive   = !!m.isLichForm;
            const lichPhial    = !!m.lichPhial;
            const lichCan      = lichUnlocked && (lichActive || m.mana >= NECRO_LICH_FORM_MANA_PER_ROUND);
            let lichLabel;
            if (!lichUnlocked) {
                lichLabel = `\u{1F9B4} Lich Form (L${NECRO_LICH_FORM_UNLOCK_LEVEL})`;
            } else if (lichPhial) {
                lichLabel = `\u{1F9B4} Lich Form: PHIAL (reviving in ${m.lichPhialCountdown || NECRO_LICH_REVIVE_ROUNDS} rounds)`;
            } else if (lichActive) {
                lichLabel = `\u{1F9B4} Lich Form: ON (-${NECRO_LICH_FORM_MANA_PER_ROUND} MP/round)`;
            } else {
                lichLabel = `\u{1F9B4} Lich Form: OFF (-${NECRO_LICH_FORM_MANA_PER_ROUND} MP/round)`;
            }
            const lichBtn = this._addBtn(lichLabel, lichCan && !lichPhial, () => this.combat.necromancerToggleLichForm());
            lichBtn.classList.add('combat-special-btn');
            if (lichActive) lichBtn.style.boxShadow = '0 0 8px #aa44ff, 0 0 16px #6600cc66';
            if (lichPhial)  lichBtn.style.boxShadow = '0 0 8px #44ffaa, 0 0 16px #00cc6666';
            lichBtn.title = [
                `Necromancer L${NECRO_LICH_FORM_UNLOCK_LEVEL}: Lich Form (toggle).`,
                'Turning ON is a free action; turning OFF uses the necromancer\'s turn.',
                `Costs ${NECRO_LICH_FORM_MANA_PER_ROUND} MP per round to maintain. Toggle OFF to stop the drain.`,
                'While active: gains immunity to poison and stun; partial magic/AoE resistance.',
                'When mana reaches 0 while Lich Form is active: stamina converts to mana automatically.',
                'On fatal damage: soul transfers to a Phylactery — revives after 3 rounds at 50%+ HP.',
                'Clerics cannot revive a necromancer currently held in the Phylactery.',
                !lichUnlocked ? `Requires necromancer level ${NECRO_LICH_FORM_UNLOCK_LEVEL}.` : '',
                lichPhial ? `Soul is in the Phylactery — reviving in ${m.lichPhialCountdown || NECRO_LICH_REVIVE_ROUNDS} round(s).` : '',
                lichUnlocked && !lichActive && !lichCan ? 'Not enough mana.' : '',
            ].filter(Boolean).join('\n');

            if (m.level >= NECRO_DEMI_LICH_UNLOCK_LEVEL) {
                const demiCan = lichActive && !lichPhial && m.mana >= NECRO_DEMI_LICH_MANA_COST;
                const demiBtn = this._addBtn(`💀 Demi-Lich (-${NECRO_DEMI_LICH_MANA_COST} MP)`, demiCan, () => this.combat.summonDemiLich());
                demiBtn.classList.add('combat-special-btn');
                demiBtn.title = [
                    `Necromancer L${NECRO_DEMI_LICH_UNLOCK_LEVEL}: Summon Demi-Lich.`,
                    'Requires active Lich Form.',
                    'Back-row undead caster; HP equals the necromancer\'s current HP.',
                    'Defense = 10 + necromancer level × 2.',
                    'Magic/AoE hits floor(level / 5) targets and ignores enemy defense.',
                    'Half damage from magic/AoE; immune to stun, web, holds, and poison.',
                    !lichActive ? 'Turn on Lich Form first.' : '',
                    m.mana < NECRO_DEMI_LICH_MANA_COST ? 'Not enough mana.' : '',
                ].filter(Boolean).join('\n');
            }

            // L30 Plague Bringer
            if (m.level >= NECRO_PLAGUE_BRINGER_UNLOCK_LEVEL) {
                const plagueCan = m.mana >= NECRO_PLAGUE_BRINGER_MANA_COST;
                const plagueBtn = this._addBtn(`☣️ Plague Bringer (-${NECRO_PLAGUE_BRINGER_MANA_COST} MP)`, plagueCan, () => this.combat.necroPlagueBringer());
                plagueBtn.classList.add('combat-special-btn');
                plagueBtn.title = [
                    `Necromancer L${NECRO_PLAGUE_BRINGER_UNLOCK_LEVEL}: Plague Bringer (${NECRO_PLAGUE_BRINGER_MANA_COST} MP).`,
                    'Inflicts Mummy Rot (permanent DoT) and Plague Infection on all qualifying enemies.',
                    'Immune: undead, constructs, elementals, incorporeal, plants.',
                    'When a plague-infected enemy dies, it explodes — dealing necrotic damage to all other enemies (chain reaction).',
                    m.mana < NECRO_PLAGUE_BRINGER_MANA_COST ? 'Not enough mana.' : '',
                ].filter(Boolean).join('\n');
            }
        }

        if (m.classId === 'ranger' && m.level >= RANGER_TOTEM_UNLOCK_LEVEL) {
            const row = document.createElement('div');
            row.style.display = 'flex';
            row.style.gap = '6px';
            row.style.alignItems = 'center';
            row.style.flexWrap = 'wrap';
            const sel = document.createElement('select');
            sel.className = 'combat-action-btn combat-special-btn';
            sel.style.minWidth = '140px';
            const options = [
                ['wolf', '🐺 Wolf'],
                ['bear', '🐻 Bear'],
                ['eagle', '🦅 Eagle'],
                ['pixie', '🧚 Pixie'],
            ];
            for (const [id, label] of options) {
                const opt = document.createElement('option');
                opt.value = id;
                opt.textContent = label;
                if ((m.rangerTotem || 'wolf') === id) opt.selected = true;
                sel.appendChild(opt);
            }
            const btn = document.createElement('button');
            btn.className = 'combat-action-btn combat-special-btn';
            btn.textContent = m.rangerTotem ? `Totem: ${m.rangerTotem}` : `Activate Totem (-${RANGER_TOTEM_MANA_PER_ROUND} MP/rd)`;
            btn.disabled = m.mana < RANGER_TOTEM_MANA_PER_ROUND && !m.rangerTotem;
            btn.title = [
                `Ranger L${RANGER_TOTEM_UNLOCK_LEVEL}: Animal Totem (free action).`,
                `Costs ${RANGER_TOTEM_MANA_PER_ROUND} MP per round while active; may change each round.`,
                `Wolf: ranged/explosive hits apply bleed for floor(level/${RANGER_TOTEM_DURATION_DIVISOR}) rounds.`,
                `Bear: ranged hits have 25% stun chance and grant +floor(level/${RANGER_BEAR_TOTEM_DEFENSE_DIVISOR}) defense.`,
                `Eagle: ranged/explosive damage +${Math.round((m.level || 1) * RANGER_EAGLE_TOTEM_DAMAGE_PER_LEVEL * 100)}%; ${Math.round((m.level || 1) * RANGER_EAGLE_TOTEM_DEFLECT_PER_LEVEL * 100)}% chance to deflect ranged attacks.`,
                `Pixie: ranged/explosive hits poison; ranger takes 50% less magic/AoE damage before defense.`,
            ].join('\n');
            btn.addEventListener('click', () => this.combat.rangerSetTotem(sel.value));
            row.appendChild(sel);
            row.appendChild(btn);
            this.actionsEl.appendChild(row);
        }

        if (m.classId === 'ranger' || m.classId === 'druid') {
            const summonCost = m.classId === 'druid' ? DRUID_SUMMON_MANA_COST : RANGER_SUMMON_MANA_COST;
            const can = m.mana >= summonCost;
            const label = `\u{1F3F9} Summon Beast (-${summonCost} MP)`;
            const btn = this._addBtn(label, can, () => this._showBeastPicker(m));
            btn.classList.add('combat-special-btn');
            const lvl10Unlocked = m.level >= 10;
            btn.title = [
                `${m.classDef.name} special: Summon Woodland Beast.`,
                `Costs ${summonCost} mana.`,
                'Wolf: melee + Bleed (100% hit damage/round × 3 rounds), +7 HP/level, +1 defense/level.',
                '  ▶ L10+: Wolf Pack — summons an extra wolf with each cast.',
                'Bear: high HP melee tank, +2 defense/level, stun chance = ranger crit.',
                '  ▶ L10+: Giant Bear — stun chance doubled, much higher HP.',
                'Eagle: ranged crits (4× damage), +5 HP/level.',
                '  ▶ L10+: Golden Eagle — crit chance doubled, bonus HP.',
                'Pixie: AoE magic, dodge, takes HALF damage from AoE magic, +2 HP/level.',
                '  ▶ L10+: Pixie Princess — dodge chance doubled, +1 AoE hit.',
                m.classId === 'ranger'
                    ? 'Stun/crit/dodge chances scale with your ranged crit chance.'
                    : `Druids also unlock Treant at level 5 and Shambling Mound at level ${DRUID_SHAMBLING_MOUND_UNLOCK_LEVEL}.`,
                lvl10Unlocked ? '★ Level 10+ upgrades ACTIVE.' : `Level ${m.level}/10 — upgrades unlock at level 10.`,
                'Beasts CAN be healed by clerics. Acts immediately on summon.',
                !can ? 'Not enough mana.' : '',
            ].filter(Boolean).join('\n');
        }

        // Ranger L20: Explosive Arrow
        if (m.classId === 'ranger' && m.level >= RANGER_EXPLOSIVE_ARROW_UNLOCK_LEVEL) {
            const xaCost     = RANGED_STAMINA_COST * RANGER_EXPLOSIVE_ARROW_STAMINA_MULT;
            const xaExhausted = m.stamina < xaCost;
            const xaLabel    = `💥 Explosive Arrow (-${xaCost} ST)${xaExhausted ? ' [HALF]' : ''}`;
            const xaBtn      = this._addBtn(xaLabel, true, () => {
                soundManager.playRanged();
                this.combat.rangerExplosiveArrow();
            });
            xaBtn.classList.add('combat-special-btn');
            xaBtn.title = [
                `Ranger L${RANGER_EXPLOSIVE_ARROW_UNLOCK_LEVEL}: Explosive Arrow.`,
                `Costs ${xaCost} ST. Hits ALL enemies for ~${Math.round(RANGER_EXPLOSIVE_ARROW_DAMAGE_MULT * 100)}% of normal ranged damage each.`,
                `Crit chance ~${Math.round(RANGER_EXPLOSIVE_ARROW_CRIT_MULT * 100)}% of normal. Instakill chance half normal.`,
                xaExhausted ? 'Not enough stamina — fires at half power.' : '',
            ].filter(Boolean).join('\n');
        }

        // Ranger L30: Hunter's Mark (free action)
        if (m.classId === 'ranger' && m.level >= RANGER_HUNTERS_MARK_UNLOCK_LEVEL) {
            const hmCanCost = m.stamina >= RANGER_HUNTERS_MARK_STAMINA_COST && m.mana >= RANGER_HUNTERS_MARK_MANA_COST;
            const hmActive = !!(m.hunterMarkEnemyId);
            let hmLabel;
            if (hmActive) {
                const hmTarget = this.combat.enemies.find(e => e.id === m.hunterMarkEnemyId);
                const hmName = hmTarget ? (hmTarget.name || hmTarget.type) : 'unknown';
                hmLabel = `🎯 Mark: ${hmName}`;
            } else {
                hmLabel = `🎯 Hunter's Mark (-${RANGER_HUNTERS_MARK_STAMINA_COST} ST -${RANGER_HUNTERS_MARK_MANA_COST} MP)`;
            }
            const hmBtn = this._addBtn(hmLabel, hmCanCost || hmActive, () => {
                this._pickTarget(e => this.combat.rangerHuntersMark(e), {
                    prompt: `🎯 Choose a target for Hunter's Mark...`,
                });
            });
            hmBtn.classList.add('combat-special-btn');
            const hmMarkPct = Math.round(RANGER_HUNTERS_MARK_DAMAGE_BONUS * 100);
            hmBtn.title = [
                `Ranger L${RANGER_HUNTERS_MARK_UNLOCK_LEVEL}: Hunter's Mark (free action — does not use your turn).`,
                `Place a mark on a single enemy. Costs ${RANGER_HUNTERS_MARK_STAMINA_COST} ST + ${RANGER_HUNTERS_MARK_MANA_COST} MP.`,
                `Marked target receives +${hmMarkPct}% damage from ALL sources (all player attacks, summons, DoTs).`,
                `Upkeep: ${RANGER_HUNTERS_MARK_UPKEEP_MANA} MP + ${RANGER_HUNTERS_MARK_UPKEEP_STAMINA} ST per round.`,
                `If the ranger kills the marked target, the ranger gains a FREE BONUS TURN.`,
                `On the bonus turn, the mark can be moved to a new target (free again), potentially chain-killing.`,
                hmActive ? 'Mark is currently active — click to move it to a new target.' : 'No mark active.',
                !hmCanCost && !hmActive ? `Not enough resources (needs ${RANGER_HUNTERS_MARK_STAMINA_COST} ST and ${RANGER_HUNTERS_MARK_MANA_COST} MP).` : '',
            ].filter(Boolean).join('\n');
        }

        // Ranger L30: Beastlord Toggle (free action)
        if (m.classId === 'ranger' && m.level >= RANGER_BEASTLORD_UNLOCK_LEVEL) {
            const blActive = !!m.beastlordActive;
            const blCanActivate = m.mana >= RANGER_BEASTLORD_MANA_PER_ROUND;
            const blBeastCount = this.combat.party.filter(p => p.isSummoned && p.summonerId === m.id && p.summonStats && p.summonStats.beastlordSummoned && p.health > 0).length;
            const blTotalUpkeep = RANGER_BEASTLORD_MANA_PER_ROUND + blBeastCount * RANGER_BEASTLORD_UPKEEP_PER_SUMMON;
            const blSummonPct = Math.floor((m.level || 1) / 2) + RANGER_BEASTLORD_SUMMON_BASE;
            const blLabel = blActive
                ? `🦎 Beastlord ON (${blSummonPct}% auto | -${blTotalUpkeep} MP/rd)`
                : `🦎 Beastlord Toggle (-${RANGER_BEASTLORD_MANA_PER_ROUND} MP/rd)`;
            const blBtn = this._addBtn(blLabel, blCanActivate || blActive, () => this.combat.rangerToggleBeastlord());
            blBtn.classList.add('combat-special-btn');
            if (blActive) blBtn.style.background = '#2a4a2a';
            blBtn.title = [
                `Ranger L${RANGER_BEASTLORD_UNLOCK_LEVEL}: Beastlord (free action toggle — does not use your turn).`,
                `Base cost: ${RANGER_BEASTLORD_MANA_PER_ROUND} MP per round.`,
                `While active, each round: ${blSummonPct}% chance to auto-summon a random beast (wolf/bear/eagle/pixie).`,
                'Auto-summoned beasts cost 1 MP/round each as additional upkeep.',
                'Summons follow all normal rules: wolf packs, upgrades (Giant Bear/Golden Eagle/Pixie Princess).',
                blActive ? `Active — ${blBeastCount} Beastlord beast(s) alive. Total upkeep: ${blTotalUpkeep} MP/round.` : 'Not active.',
                !blCanActivate && !blActive ? 'Not enough mana.' : '',
            ].filter(Boolean).join('\n');
        }

        // Bard: AoE Disrupt (once per combat)
        if (m.classId === 'bard') {
            const scale  = Math.max(1, Math.floor(m.level / 5));
            const can = m.mana >= BARD_DISRUPT_MANA_COST && !m.usedBardSong;
            const label = m.usedBardSong
                ? '\u{1F3B6} Disrupt (used)'
                : `\u{1F3B6} Disrupt (-${BARD_DISRUPT_MANA_COST} MP)`;
            const btn = this._addBtn(label, can, () => this.combat.bardDisrupt());
            btn.classList.add('combat-special-btn');
            btn.title = [
                'Bard special: Dissonant Chord (AoE Disruption).',
                `Costs ${BARD_DISRUPT_MANA_COST} mana. One use per combat.`,
                `Hits ALL enemies: -${scale} attack, -${scale} defense for 1 round.`,
                `Deals magic damage with +${m.level * 2}% damage per bard level.`,
                '50% chance to stun each enemy for 1 round.',
                `Debuff scales +1 per 5 bard levels (currently scale: ${scale}).`,
                m.usedBardSong ? 'Already used this fight.' : '',
                !can && !m.usedBardSong ? 'Not enough mana.' : '',
            ].filter(Boolean).join('\n');
        }

        // Bard L20: Charm Monster
        if (m.classId === 'bard' && m.level >= BARD_CHARM_UNLOCK_LEVEL) {
            const charmCost    = BARD_CHARM_MANA_COST;
            const charmCan     = m.mana >= charmCost;
            const charmChancePct = Math.round(Math.min(95, (BARD_CHARM_BASE_CHANCE + BARD_CHARM_CHANCE_PER_2_LV * m.level) * 100));
            const charmDur     = Math.max(1, Math.floor(m.level / BARD_CHARM_DURATION_DIVISOR));
            const charmLabel   = `🎵 Charm Monster (-${charmCost} MP)`;
            const charmBtnEl   = this._addBtn(charmLabel, charmCan, () => {
                this._pickTarget(e => this.combat.bardCharm(e), {
                    prompt: '🎵 Choose a monster to charm...',
                    filter: e => !(e.charmedRounds > 0),
                });
            });
            charmBtnEl.classList.add('combat-special-btn');
            charmBtnEl.title = [
                'Bard L20 Special: Charm Monster.',
                `Costs ${charmCost} MP.`,
                `${charmChancePct}% chance to charm target (50% base + 1% per 2 bard levels, max 95%).`,
                `Charmed monster fights for your party for ${charmDur} round(s) (floor(level / 5)).`,
                'Immune: undead, elemental, constructs. Bosses and mega-bosses always resist.',
                'Charmed monsters can be healed (except undead or constructs).',
                !charmCan ? 'Not enough mana.' : '',
            ].filter(Boolean).join('\n');
        }

        if (m.classId === 'bard' && m.level >= BARD_RALLYING_MELODY_UNLOCK_LEVEL) {
            const canRally = m.mana >= BARD_RALLYING_MELODY_MANA_COST;
            const restorePct = Math.round(BARD_RALLYING_MELODY_RESTORE_FRACTION * 100);
            const rallyLabel = `🎶 Rallying Melody (-${BARD_RALLYING_MELODY_MANA_COST} MP)`;
            const rallyBtn = this._addBtn(rallyLabel, canRally, () => this.combat.bardRallyingMelody());
            rallyBtn.classList.add('combat-special-btn');
            rallyBtn.title = [
                `Bard L${BARD_RALLYING_MELODY_UNLOCK_LEVEL}: Rallying Melody.`,
                `Costs ${BARD_RALLYING_MELODY_MANA_COST} mana.`,
                `Restores ${restorePct}% of max HP, mana, and stamina to living party members.`,
                'Does NOT affect golems or summoned undead.',
                !canRally ? 'Not enough mana.' : '',
            ].filter(Boolean).join('\n');
        }

        // Bard L30: Symphony of Destruction (1/combat channeled AoE)
        if (m.classId === 'bard' && m.level >= BARD_SYMPHONY_UNLOCK_LEVEL && !m.symphonyUsedThisCombat) {
            const symManaCost = BARD_SYMPHONY_BASE_MANA_COST;
            const symStaCost  = BARD_SYMPHONY_BASE_STA_COST;
            const canSym = m.mana >= symManaCost && m.stamina >= symStaCost;
            const symBtn = this._addBtn(
                `♪♪ Symphony of Destruction (-${symManaCost} MP/-${symStaCost} ST)`,
                canSym,
                () => this.combat.bardStartSymphony(),
            );
            symBtn.classList.add('combat-special-btn');
            symBtn.style.background = 'linear-gradient(135deg,#3a1060,#7a20b0)';
            symBtn.title = [
                `Bard L${BARD_SYMPHONY_UNLOCK_LEVEL}: Symphony of Destruction (1/combat).`,
                `Costs ${symManaCost} MP and ${symStaCost} ST to start; doubles each round.`,
                `Round 1: ×1 damage to ALL enemies.  Round 2: ×2.  Round 3: ×4, etc.`,
                `Each round costs twice the previous round (10→20→40→80 MP/ST).`,
                `Deals sonic AoE magic damage. Incorporeal enemies are immune.`,
                `While channeling: all other abilities are locked. Stop is a free action.`,
                `Ends if bard is stunned, webbed, or can no longer pay the doubled cost.`,
                !canSym ? `Not enough mana/stamina (needs ${symManaCost} MP and ${symStaCost} ST).` : '',
            ].filter(Boolean).join('\n');
        }

        // Bard L30: Thunderous Drums toggle
        if (m.classId === 'bard' && m.level >= BARD_THUNDEROUS_DRUMS_UNLOCK_LEVEL) {
            const maxRedPct = Math.round(BARD_THUNDEROUS_DRUMS_MAX_REDUCTION * 100);
            const curRedPct = Math.min(maxRedPct, m.level);
            if (!m.thunderousDrumsActive) {
                const canDrum = m.mana >= BARD_THUNDEROUS_DRUMS_MANA_PER_ROUND;
                const drumOnBtn = this._addBtn(`🥁 Thunderous Drums`, canDrum, () => this.combat.bardThunderousDrumsOn());
                drumOnBtn.classList.add('combat-special-btn');
                drumOnBtn.title = [
                    `Bard L${BARD_THUNDEROUS_DRUMS_UNLOCK_LEVEL}: Thunderous Drums.`,
                    `Costs ${BARD_THUNDEROUS_DRUMS_MANA_PER_ROUND} MP/round to maintain.`,
                    `Reduces all sonic and psychic attack damage by ${curRedPct}% (cap ${maxRedPct}%).`,
                    `Gives all party members a ${curRedPct}% chance to resist stun, charm, enslave, and other sonic/psychic effects (cap ${maxRedPct}%).`,
                    'Sonic: shrieker screech, harpy song, banshee wail.',
                    'Psychic: vampire charm, succubus kiss, aboleth enslavement, and similar mind attacks.',
                    'Drums cease if mana runs out.',
                    !canDrum ? 'Not enough mana.' : '',
                ].filter(Boolean).join('\n');
            } else {
                const drumOffBtn = this._addBtn(`🥁 Stop Drums`, true, () => this.combat.bardThunderousDrumsOff());
                drumOffBtn.classList.add('combat-special-btn');
                drumOffBtn.style.background = 'linear-gradient(135deg,#4a3000,#7a5500)';
                drumOffBtn.title = [
                    `Thunderous Drums are ACTIVE (-${BARD_THUNDEROUS_DRUMS_MANA_PER_ROUND} MP/round).`,
                    `Currently reducing sonic/psychic damage by ${curRedPct}% and granting ${curRedPct}% effect resist.`,
                    'Click to stop the drums (free action).',
                ].filter(Boolean).join('\n');
            }
        }

        // Druid: Entangle
        if (m.classId === 'druid') {
            const can = m.mana >= DRUID_ENTANGLE_MANA_COST;
            const debuff = DRUID_ENTANGLE_BASE_DEBUFF + Math.floor(Math.max(0, m.level - 1) / 2);
            const label = `\u{1F33F} Entangle (-${DRUID_ENTANGLE_MANA_COST} MP)`;
            const btn = this._addBtn(label, can, () => this.combat.druidEntangle());
            btn.classList.add('combat-special-btn');
            btn.title = [
                'Druid special: Entangle.',
                `Costs ${DRUID_ENTANGLE_MANA_COST} mana. Targets all enemies.`,
                `Each enemy has a ${Math.round(DRUID_ENTANGLE_CHANCE * 100)}% chance to suffer -${debuff} defense and -${debuff} damage for 3 rounds.`,
                'Debuff rises by +1 every other level beyond L1.',
                '\u26A0\uFE0F Incorporeal creatures (ghost, wraith, shadow, banshee, spectre) are completely immune \u2014 vines pass through them.',
                !can ? 'Not enough mana.' : '',
            ].filter(Boolean).join('\n');

            // Treant summon (level 5+, druid only)
            const treantUnlocked = m.level >= 5;
            const treantCost = DRUID_SUMMON_MANA_COST;
            const canTreant = treantUnlocked && m.mana >= treantCost;
            const treantLabel = treantUnlocked
                ? `\u{1F333} Summon Treant (-${treantCost} MP)`
                : `\u{1F333} Summon Treant (L5)`;
            const treantBtn = this._addBtn(treantLabel, canTreant, () => this.combat.summonBeast('treant'));
            treantBtn.classList.add('combat-special-btn');
            const treantL10 = m.level >= 10;
            treantBtn.title = [
                'Druid special: Summon Treant (unlocks at druid level 5).',
                `Costs ${treantCost} mana.`,
                'Ancient tree spirit — front-row melee tank with druid-level-scaled damage.',
                '33% chance per hit to Hold (stun for 1 round) — undead and incorporeal are immune.',
                '  ▶ L10+: Elder Treant — Hold chance increased, bonus HP and damage.',
                treantL10 ? '★ Elder Treant upgrade ACTIVE.' : `Level ${m.level}/10 — Elder Treant unlocks at level 10.`,
                !treantUnlocked ? 'Requires druid level 5.' : '',
                treantUnlocked && !canTreant ? 'Not enough mana.' : '',
            ].filter(Boolean).join('\n');

            const moundUnlocked = m.level >= DRUID_SHAMBLING_MOUND_UNLOCK_LEVEL;
            const moundCap = Math.max(1, Math.floor((m.level || 1) / DRUID_SHAMBLING_MOUND_CAP_DIVISOR));
            const livingMounds = (this.combat.party || []).filter(p =>
                p && p.health > 0 && p.isSummoned && p.summonerId === m.id
                && p.summonType === 'shambling_mound'
            ).length;
            const moundAtCap = livingMounds >= moundCap;
            const canMound = moundUnlocked && !moundAtCap && m.mana >= DRUID_SHAMBLING_MOUND_MANA_COST;
            const moundLabel = moundUnlocked
                ? (moundAtCap
                    ? `🪴 Shambling Mound [${livingMounds}/${moundCap} max]`
                    : `🪴 Summon Shambling Mound (-${DRUID_SHAMBLING_MOUND_MANA_COST} MP)`)
                : `🪴 Summon Shambling Mound (L${DRUID_SHAMBLING_MOUND_UNLOCK_LEVEL})`;
            const moundBtn = this._addBtn(moundLabel, canMound, () => this.combat.summonBeast('shambling_mound'));
            moundBtn.classList.add('combat-special-btn');
            moundBtn.title = [
                `Druid L${DRUID_SHAMBLING_MOUND_UNLOCK_LEVEL}: Summon Shambling Mound.`,
                `Costs ${DRUID_SHAMBLING_MOUND_MANA_COST} mana.`,
                'Front-row plant guardian. HP = 4× druid max HP. Defense = 20 + druid level.',
                'Slam damage = base melee + 2× druid level with a 45% stun chance.',
                'Regenerates 20% max HP at the start of its turn. If full after regen, the original mound spawns a Mini Shambler (not on the summon round).',
                'Mini Shamblers grow over 3 turns: 67%, 84%, then 100% of full mound HP/defense.',
                'Only the original mound can spawn minis; grown minis cannot bud new minis.',
                `Maximum living Shambling Mounds for this druid: ${moundCap} (level / ${DRUID_SHAMBLING_MOUND_CAP_DIVISOR}). Current: ${livingMounds}/${moundCap}.`,
                'After warrior intercepts, each mound can intercept hits aimed at its druid at 50% + druid level/3 percent.',
                !moundUnlocked ? `Requires druid level ${DRUID_SHAMBLING_MOUND_UNLOCK_LEVEL}.` : '',
                moundUnlocked && moundAtCap ? 'At the living mound cap.' : '',
                moundUnlocked && !moundAtCap && m.mana < DRUID_SHAMBLING_MOUND_MANA_COST ? 'Not enough mana.' : '',
            ].filter(Boolean).join('\n');

            // ── Commune (L20) — summon Faerie Queen at level-scaled fae token thresholds
            const communeUnlocked = m.level >= DRUID_COMMUNE_UNLOCK_LEVEL;
            const tokensNeeded    = m.level >= 40 ? 1 : (m.level >= 30 ? 2 : DRUID_COMMUNE_FAE_TOKENS_NEEDED);
            const tokens          = m.faeTokens || 0;
            const communeLabel    = communeUnlocked
                ? `\u{1F9DA} Commune (✨${tokens}/${tokensNeeded} fae tokens)`
                : `\u{1F9DA} Commune (L${DRUID_COMMUNE_UNLOCK_LEVEL})`;
            // Can always press the button if unlocked (gains a token, or summons at threshold)
            const communeCanAct   = communeUnlocked;
            const communeBtn = this._addBtn(communeLabel, communeCanAct, () => this.combat.druidCommune());
            communeBtn.classList.add('combat-special-btn');
            if (tokens >= tokensNeeded - 1 && communeUnlocked) {
                communeBtn.style.boxShadow = '0 0 8px #ffdd44, 0 0 16px #ffaa0066';
            }
            communeBtn.title = [
                `Druid L${DRUID_COMMUNE_UNLOCK_LEVEL}: Commune with the Fae (free action).`,
                `Each use grants 1 fae token. At ${tokensNeeded} token${tokensNeeded === 1 ? '' : 's'} the Faerie Queen is summoned.`,
                'Token requirement scales with druid level: 3 (<30), 2 (30+), 1 (40+).',
                'Faerie Queen: 2× druid HP, 30+level defense. Uses Wrath of Nature (magic attack, 33%+ chance to Hold enemies for 2 rounds).',
                'Applies fae poison DoT and has 50% magic/AoE damage resistance.',
                'Tokens carry over between rounds. Summoning consumes all tokens.',
                !communeUnlocked ? `Requires druid level ${DRUID_COMMUNE_UNLOCK_LEVEL}.` : '',
                communeUnlocked && tokens >= tokensNeeded
                    ? '✨ READY — next use will summon the Faerie Queen!' : '',
            ].filter(Boolean).join('\n');

            // ── Wild Shape (L30) ─────────────────────────────────────────────────
            if (m.level >= DRUID_WILD_SHAPE_UNLOCK_LEVEL) {
                const wsActive  = !!m.wildShapeForm;
                const wsCanAfford = m.mana >= DRUID_WILD_SHAPE_MANA_INITIAL;
                const lvl = m.level;

                if (!wsActive) {
                    // Show form selection buttons
                    const FORMS = [
                        { id: 'bear',   icon: '\u{1F43B}', name: 'Bear Form',         defDiv: DRUID_WILD_BEAR_DEFENSE_DIVISOR,   row: 'front' },
                        { id: 'wolf',   icon: '\u{1F43A}', name: 'Wolf Form',          defDiv: DRUID_WILD_WOLF_DEFENSE_DIVISOR,   row: 'front' },
                        { id: 'eagle',  icon: '\u{1F985}', name: 'Storm Eagle Form',   defDiv: 0,                                  row: 'back'  },
                        { id: 'pixie',  icon: '\u{1F9DA}', name: 'Pixie Form',         defDiv: 0,                                  row: 'back'  },
                        { id: 'treant', icon: '\u{1F333}', name: 'Treant Form',        defDiv: DRUID_WILD_TREANT_DEFENSE_DIVISOR, row: 'front' },
                    ];
                    for (const f of FORMS) {
                        const formLabel = `${f.icon} ${f.name} (-${DRUID_WILD_SHAPE_MANA_INITIAL} MP)`;
                        const formBtn = this._addBtn(formLabel, wsCanAfford, () => this.combat.druidActivateWildShape(f.id));
                        formBtn.classList.add('combat-special-btn');
                        formBtn.style.borderLeft = '3px solid #2a6';
                        const defBonus = f.defDiv > 0 ? Math.floor(lvl / f.defDiv) : 0;
                        const formTitles = {
                            bear:   [`Bear Form: HP doubles, front row, ${Math.max(1,Math.floor(lvl/DRUID_WILD_BEAR_ATTACKS_DIVISOR))} magic-melee hits/turn.`,
                                     `Stun chance: ${Math.round((DRUID_WILD_BEAR_STUN_BASE + lvl*DRUID_WILD_BEAR_STUN_PER_LEVEL)*100)}%. +${defBonus} defense.`,
                                     'Bears in party: +50% dmg, +def, extra attack.'],
                            wolf:   [`Wolf Form: front row, ${Math.max(1,Math.floor(lvl/DRUID_WILD_WOLF_ATTACKS_DIVISOR))} magic-melee hits on random front enemies.`,
                                     `Bleed chance: ${Math.round((DRUID_WILD_WOLF_BLEED_BASE + lvl*DRUID_WILD_WOLF_BLEED_PER_LEVEL)*100)}%, ${Math.max(1,Math.floor(lvl/DRUID_WILD_WOLF_BLEED_DURATION_DIVISOR))} rounds. +${Math.floor(lvl/DRUID_WILD_WOLF_DEFENSE_DIVISOR)} defense.`,
                                     'Wolves in party: +50% dmg, +def, extra attack. Wolf pack cascade 65%.'],
                            eagle:  [`Storm Eagle Form: back row, ${Math.max(1,Math.floor(lvl/DRUID_WILD_EAGLE_ATTACKS_DIVISOR))} magic-ranged strikes/turn.`,
                                     `Crit: ${Math.round((DRUID_WILD_EAGLE_CRIT_BASE + lvl*DRUID_WILD_EAGLE_CRIT_PER_LEVEL)*100)}% chance, ${(DRUID_WILD_EAGLE_CRIT_MULT_BASE + lvl*DRUID_WILD_EAGLE_CRIT_MULT_PER_LEVEL).toFixed(1)}× mult.`,
                                     `Ranged evasion: ${Math.round(Math.min(95, lvl*DRUID_WILD_EAGLE_EVASION_PER_LEVEL*100))}%.`,
                                     'Eagles in party: +50% dmg, +def, extra attack.'],
                            pixie:  [`Pixie Form: back row, AoE hits ALL enemies each turn.`,
                                     `${Math.round(DRUID_WILD_PIXIE_MAGIC_RESIST*100)}% less magic/AoE damage while in form.`,
                                     'Pixies in party: +75% dmg, +def, extra burst.'],
                            treant: [`Treant Form: HP doubles, front row, ${Math.max(1,Math.floor(lvl/DRUID_WILD_TREANT_ATTACKS_DIVISOR))} magic-melee hits on random front enemies.`,
                                     `Hold chance: ${Math.round((DRUID_WILD_TREANT_HOLD_BASE + lvl*DRUID_WILD_TREANT_HOLD_PER_LEVEL)*100)}%. +${defBonus} defense.`,
                                     'Treants in party: +50% dmg, +def, extra attack.'],
                        };
                        formBtn.title = [
                            `Druid L${DRUID_WILD_SHAPE_UNLOCK_LEVEL}: Wild Shape — ${f.name} (free action).`,
                            `Costs ${DRUID_WILD_SHAPE_MANA_INITIAL} MP to activate + ${DRUID_WILD_SHAPE_MANA_PER_ROUND} MP/round upkeep.`,
                            ...(formTitles[f.id] || []),
                            'Summoning a matching beast while in form: extra beast spawned + wild shape buffs applied.',
                            !wsCanAfford ? `Not enough mana (needs ${DRUID_WILD_SHAPE_MANA_INITIAL} MP).` : '',
                        ].filter(Boolean).join('\n');
                    }
                } else {
                    // In Wild Shape — show attack button + exit button
                    const FORM_META = {
                        bear:   { icon: '\u{1F43B}', name: 'Bear Form',       needTarget: true,  atk: (t) => this.combat.druidBearAttack(t)   },
                        wolf:   { icon: '\u{1F43A}', name: 'Wolf Form',       needTarget: true,  atk: (t) => this.combat.druidWolfAttack(t)   },
                        eagle:  { icon: '\u{1F985}', name: 'Eagle Form',      needTarget: true,  atk: (t) => this.combat.druidEagleAttack(t)   },
                        pixie:  { icon: '\u{1F9DA}', name: 'Pixie Form',      needTarget: false, atk: ()  => this.combat.druidPixieAttack()    },
                        treant: { icon: '\u{1F333}', name: 'Treant Form',     needTarget: true,  atk: (t) => this.combat.druidTreantAttack(t)  },
                    };
                    const meta = FORM_META[m.wildShapeForm] || { icon: '\u{1F43E}', name: m.wildShapeForm, needTarget: false };
                    const atkLabel = `${meta.icon} ${meta.name} Attack`;
                    const atkBtn = this._addBtn(atkLabel, true, () => {
                        if (meta.needTarget) {
                            this._pickTarget(t => meta.atk(t), { prompt: `${meta.icon} Choose a target...` });
                        } else {
                            meta.atk();
                        }
                    });
                    atkBtn.classList.add('combat-action-btn');
                    atkBtn.style.background = '#1a3a1a';
                    atkBtn.style.borderLeft = '3px solid #4a4';

                    const exitBtn = this._addBtn(`\u{1F43E} Exit Wild Shape`, true, () => this.combat.druidDeactivateWildShape());
                    exitBtn.classList.add('combat-special-btn');
                    exitBtn.title = [
                        'Exit Wild Shape (free action — does not use your turn).',
                        'Must exit current form before entering a different one.',
                        'HP bonus from Bear/Treant form is removed on exit (HP clamped to new max).',
                    ].join('\n');
                }
            }
        }

        // ── Vermin Keeper ───────────────────────────────────────────────────────
        if (m.classId === 'verminkeeper') {
            const attackCount = 1 + Math.floor(m.level / VK_ATTACK_EXTRA_PER_5LV);
            const attackMana  = attackCount * VK_ATTACK_MANA_COST_BASE;
            const canAttack   = m.mana >= attackMana;

            // Poison Attack (L1)
            const poisonLabel = `\u{1F577}️ Poison Attack (-${attackMana} MP)`;
            const poisonBtn = this._addBtn(poisonLabel, canAttack, () => {
                this._pickTarget(e => this.combat.vkPoisonAttack(e), {
                    prompt: '\u{1F577}️ Choose a target for Poison Attack...',
                });
            });
            poisonBtn.classList.add('combat-special-btn');
            poisonBtn.title = [
                'Vermin Keeper: Poison Attack.',
                `Costs ${attackMana} MP (${attackCount} attack${attackCount > 1 ? 's' : ''} × ${VK_ATTACK_MANA_COST_BASE} MP each).`,
                `Deals magic damage with +${Math.round(VK_POISON_DAMAGE_BONUS * 100)}% bonus. Stacks 1 attack per ${VK_ATTACK_EXTRA_PER_5LV} levels.`,
                `Adds a poison DoT: 20% of total dealt damage per round for ${attackCount} round(s).`,
                !canAttack ? `Not enough mana (need ${attackMana} MP).` : '',
            ].filter(Boolean).join('\n');

            // Acid Attack (L1)
            const acidLabel = `\u{1F7E2} Acid Attack (-${attackMana} MP)`;
            const acidBtn = this._addBtn(acidLabel, canAttack, () => {
                this._pickTarget(e => this.combat.vkAcidAttack(e), {
                    prompt: '\u{1F7E2} Choose a target for Acid Attack...',
                });
            });
            acidBtn.classList.add('combat-special-btn');
            acidBtn.title = [
                'Vermin Keeper: Acid Attack.',
                `Costs ${attackMana} MP (${attackCount} attack${attackCount > 1 ? 's' : ''} × ${VK_ATTACK_MANA_COST_BASE} MP each).`,
                `Deals magic damage. Stacks 1 attack per ${VK_ATTACK_EXTRA_PER_5LV} levels.`,
                'Adds an acid DoT (20% of dealt damage per round) and a permanent -1 defense debuff per attack this turn.',
                !canAttack ? `Not enough mana (need ${attackMana} MP).` : '',
            ].filter(Boolean).join('\n');

            // Summon Vermin (L3)
            {
                const unlocked = m.level >= VK_SUMMON_VERMIN_UNLOCK_LEVEL;
                const canSummon = unlocked && m.mana >= VK_SUMMON_VERMIN_MANA_COST;
                const label = unlocked
                    ? `\u{1F577}️ Summon Vermin (-${VK_SUMMON_VERMIN_MANA_COST} MP)`
                    : `\u{1F577}️ Summon Vermin (L${VK_SUMMON_VERMIN_UNLOCK_LEVEL})`;
                const btn = this._addBtn(label, canSummon, () => this.combat.vkSummonVermin());
                btn.classList.add('combat-special-btn');
                btn.title = [
                    `Vermin Keeper L${VK_SUMMON_VERMIN_UNLOCK_LEVEL}: Summon Vermin.`,
                    `Costs ${VK_SUMMON_VERMIN_MANA_COST} MP. Randomly summons one of 14 vermin types.`,
                    'HP = keeper max HP. Melee = level × 2. Defense = level × 1.5.',
                    'Cascade: 40% chance to summon additional vermin (-5% each, +1% per level).',
                    !unlocked ? `Requires level ${VK_SUMMON_VERMIN_UNLOCK_LEVEL}.` : '',
                    unlocked && !canSummon ? `Not enough mana (need ${VK_SUMMON_VERMIN_MANA_COST} MP).` : '',
                ].filter(Boolean).join('\n');
            }

            // Summon Slime (L6)
            {
                const unlocked = m.level >= VK_SUMMON_SLIME_UNLOCK_LEVEL;
                const canSummon = unlocked && m.mana >= VK_SUMMON_SLIME_MANA_COST;
                const label = unlocked
                    ? `\u{1FAA1} Summon Slime (-${VK_SUMMON_SLIME_MANA_COST} MP)`
                    : `\u{1FAA1} Summon Slime (L${VK_SUMMON_SLIME_UNLOCK_LEVEL})`;
                const btn = this._addBtn(label, canSummon, () => this.combat.vkSummonSlime());
                btn.classList.add('combat-special-btn');
                btn.title = [
                    `Vermin Keeper L${VK_SUMMON_SLIME_UNLOCK_LEVEL}: Summon Slime.`,
                    `Costs ${VK_SUMMON_SLIME_MANA_COST} MP. Randomly summons a slime, acid slime, or gelatinous cube.`,
                    'HP = keeper max HP. Melee = level × 2. Defense = level × 1.5.',
                    'Cascade: 40% chance to summon additional slimes (-5% each, +1% per level).',
                    !unlocked ? `Requires level ${VK_SUMMON_SLIME_UNLOCK_LEVEL}.` : '',
                    unlocked && !canSummon ? `Not enough mana (need ${VK_SUMMON_SLIME_MANA_COST} MP).` : '',
                ].filter(Boolean).join('\n');
            }

            // Charm Vermin (L20)
            if (m.level >= VK_CHARM_VERMIN_UNLOCK_LEVEL) {
                const validTargets = (this.combat.aliveHostileEnemies || []).filter(e =>
                    !e.charmedRounds &&
                    !e.isBoss &&
                    VK_CHARM_VERMIN_TAGS.some(t => (this.combat._getEnemyTags(e) || []).includes(t)));
                const hasTarget = validTargets.length > 0;
                const canCharm  = m.mana >= VK_CHARM_VERMIN_MANA_COST && hasTarget;
                const charmChancePct = Math.round(Math.min(95, (BARD_CHARM_BASE_CHANCE + BARD_CHARM_CHANCE_PER_2_LV * m.level) * 100));
                const charmDur  = Math.max(1, Math.floor(m.level / BARD_CHARM_DURATION_DIVISOR));
                const label = hasTarget
                    ? `\u{1F577}️ Charm Vermin (-${VK_CHARM_VERMIN_MANA_COST} MP)`
                    : `\u{1F577}️ Charm Vermin [no valid targets]`;
                const btn = this._addBtn(label, canCharm, () => {
                    this._pickTarget(e => this.combat.vkCharmVermin(e), {
                        prompt: '\u{1F577}️ Choose a vermin/slime/insect to charm...',
                        filter: e => !e.charmedRounds && !e.isBoss &&
                            VK_CHARM_VERMIN_TAGS.some(t => (this.combat._getEnemyTags(e) || []).includes(t)),
                    });
                });
                btn.classList.add('combat-special-btn');
                btn.title = [
                    `Vermin Keeper L${VK_CHARM_VERMIN_UNLOCK_LEVEL}: Charm Vermin.`,
                    `Costs ${VK_CHARM_VERMIN_MANA_COST} MP. Target must have vermin, slime, or insect tag.`,
                    `${charmChancePct}% charm chance. Duration: ${charmDur} round(s).`,
                    'Bosses cannot be charmed.',
                    `Valid targets: ${validTargets.length > 0 ? validTargets.map(e => this.combat._eName(e)).join(', ') : 'none'}.`,
                    !hasTarget ? 'No vermin/slime/insect targets available.' : '',
                    hasTarget && !canCharm ? `Not enough mana (need ${VK_CHARM_VERMIN_MANA_COST} MP).` : '',
                ].filter(Boolean).join('\n');
            }

            // Insect Plague (L25)
            if (m.level >= VK_INSECT_PLAGUE_UNLOCK_LEVEL) {
                const canPlague = m.mana >= VK_INSECT_PLAGUE_MANA_COST;
                const label = `\u{1F41C} Insect Plague (-${VK_INSECT_PLAGUE_MANA_COST} MP)`;
                const btn = this._addBtn(label, canPlague, () => this.combat.vkInsectPlague());
                btn.classList.add('combat-special-btn');
                btn.title = [
                    `Vermin Keeper L${VK_INSECT_PLAGUE_UNLOCK_LEVEL}: Insect Plague.`,
                    `Costs ${VK_INSECT_PLAGUE_MANA_COST} MP. Hits ALL enemies with magic damage.`,
                    'Applies a poison DoT to each enemy: 50% of hit damage per round for 3 rounds.',
                    !canPlague ? `Not enough mana (need ${VK_INSECT_PLAGUE_MANA_COST} MP).` : '',
                ].filter(Boolean).join('\n');
            }

            // Summon Vermin Swarm / Acid Swarm + Swarm Protect (L30)
            if (m.level >= VK_SWARM_UNLOCK_LEVEL) {
                const party     = this.combat.party || [];
                const vSwarm    = party.find(p => p.summonType === 'vermin_swarm' && p.summonerId === m.id && p.health > 0);
                const aSwarm    = party.find(p => p.summonType === 'acid_swarm' && p.summonerId === m.id && p.health > 0);
                const hasVSwarm = !!vSwarm;
                const hasASwarm = !!aSwarm;
                const maxSwarmUpgrades = Math.max(0, Math.floor((m.level || 1) / VK_SWARM_MAX_UPGRADE_DIVISOR));

                // Vermin Swarm button — greyed if acid swarm alive
                {
                    const blocked = hasASwarm;
                    const cost    = hasVSwarm ? VK_SWARM_GROWTH_MANA_COST : VK_SWARM_SUMMON_MANA_COST;
                    const upgrades = hasVSwarm ? Math.max(0, vSwarm.summonStats?.growthUpgrades ?? ((vSwarm.summonStats?.attackCount || 1) - 1)) : 0;
                    const atUpgradeCap = hasVSwarm && upgrades >= maxSwarmUpgrades;
                    const canSwarm = !blocked && !atUpgradeCap && m.mana >= cost;
                    const label = blocked
                        ? `\u{1F577}️ Vermin Swarm [acid swarm active]`
                        : atUpgradeCap
                            ? `\u{1F577}️ Vermin Swarm [${upgrades}/${maxSwarmUpgrades} upgrades]`
                        : hasVSwarm
                            ? `\u{1F577}️ Grow Vermin Swarm (-${cost} MP)`
                            : `\u{1F577}️ Summon Vermin Swarm (-${cost} MP)`;
                    const btn = this._addBtn(label, canSwarm, () => this.combat.vkSummonSwarm('vermin'));
                    btn.classList.add('combat-special-btn');
                    if (hasVSwarm) btn.style.background = 'linear-gradient(135deg,#1a2a0a,#3a5a0a)';
                    btn.title = [
                        `Vermin Keeper L${VK_SWARM_UNLOCK_LEVEL}: Summon/Grow Vermin Swarm.`,
                        `Costs ${cost} MP. Cannot have both swarm types at once.`,
                        hasVSwarm ? `Swarm is ACTIVE — growth upgrades ${upgrades}/${maxSwarmUpgrades}; each upgrade adds +keeper HP and +1 AoE attack.` : '',
                        `Max upgrades = keeper level / ${VK_SWARM_MAX_UPGRADE_DIVISOR}.`,
                        'Vermin Swarm: 10% melee resist, ×1.5 magic, ×2 fire damage. Immune to poison/psychic/charms/stuns.',
                        'AoE attack hits all enemies; applies poison DoT and attack/range/magic debuff.',
                        blocked ? 'Cannot summon while Acid Swarm is alive.' : '',
                        atUpgradeCap ? 'At maximum swarm upgrades.' : '',
                        !blocked && !atUpgradeCap && m.mana < cost ? `Not enough mana (need ${cost} MP).` : '',
                    ].filter(Boolean).join('\n');
                }

                // Acid Swarm button — greyed if vermin swarm alive
                {
                    const blocked = hasVSwarm;
                    const cost    = hasASwarm ? VK_SWARM_GROWTH_MANA_COST : VK_SWARM_SUMMON_MANA_COST;
                    const upgrades = hasASwarm ? Math.max(0, aSwarm.summonStats?.growthUpgrades ?? ((aSwarm.summonStats?.attackCount || 1) - 1)) : 0;
                    const atUpgradeCap = hasASwarm && upgrades >= maxSwarmUpgrades;
                    const canSwarm = !blocked && !atUpgradeCap && m.mana >= cost;
                    const label = blocked
                        ? `\u{1FAA1} Acid Swarm [vermin swarm active]`
                        : atUpgradeCap
                            ? `\u{1FAA1} Acid Swarm [${upgrades}/${maxSwarmUpgrades} upgrades]`
                        : hasASwarm
                            ? `\u{1FAA1} Grow Acid Swarm (-${cost} MP)`
                            : `\u{1FAA1} Summon Acid Swarm (-${cost} MP)`;
                    const btn = this._addBtn(label, canSwarm, () => this.combat.vkSummonSwarm('acid'));
                    btn.classList.add('combat-special-btn');
                    if (hasASwarm) btn.style.background = 'linear-gradient(135deg,#0a2a1a,#0a5a3a)';
                    btn.title = [
                        `Vermin Keeper L${VK_SWARM_UNLOCK_LEVEL}: Summon/Grow Acid Swarm.`,
                        `Costs ${cost} MP. Cannot have both swarm types at once.`,
                        hasASwarm ? `Swarm is ACTIVE — growth upgrades ${upgrades}/${maxSwarmUpgrades}; each upgrade adds +keeper HP and +1 AoE attack.` : '',
                        `Max upgrades = keeper level / ${VK_SWARM_MAX_UPGRADE_DIVISOR}.`,
                        'Acid Swarm: 10% melee resist, ×1.5 magic, ×3 lightning damage. Immune to acid/psychic/charms/stuns.',
                        'AoE attack hits all enemies; applies acid DoT and defense/range/magic debuff.',
                        blocked ? 'Cannot summon while Vermin Swarm is alive.' : '',
                        atUpgradeCap ? 'At maximum swarm upgrades.' : '',
                        !blocked && !atUpgradeCap && m.mana < cost ? `Not enough mana (need ${cost} MP).` : '',
                    ].filter(Boolean).join('\n');
                }

                // Swarm Protect toggle — only if a swarm is alive
                if (hasVSwarm || hasASwarm) {
                    const active  = !!m.vkSwarmProtectActive;
                    const canProt = active || m.mana >= VK_SWARM_PROTECT_MANA_COST;
                    const label   = active
                        ? `\u{1F6E1}️ Swarm Protect: ON`
                        : `\u{1F6E1}️ Swarm Protect (-${VK_SWARM_PROTECT_MANA_COST} MP)`;
                    const btn = this._addBtn(label, canProt, () => this.combat.vkSwarmProtect());
                    btn.classList.add('combat-special-btn');
                    if (active) btn.style.background = 'linear-gradient(135deg,#1a1a40,#3a3a80)';
                    btn.title = [
                        `Vermin Keeper L${VK_SWARM_UNLOCK_LEVEL}: Swarm Protect (toggle).`,
                        `Costs ${VK_SWARM_PROTECT_MANA_COST} MP to activate. Works like Shambling Mound intercept.`,
                        'While active: the swarm intercepts hits aimed at you (50% + level/300 chance per hit).',
                        active ? 'ACTIVE — swarm is intercepting attacks for you.' : 'Inactive.',
                        !active && !canProt ? `Not enough mana (need ${VK_SWARM_PROTECT_MANA_COST} MP).` : '',
                    ].filter(Boolean).join('\n');
                }
            }
        }

        // Warlock: hexes, demon cauldron, curses, and abyss form
        if (m.classId === 'warlock') {
            const hexPenalty = Math.max(1, Math.floor(m.level / WARLOCK_HEX_PENALTY_DIVISOR));
            const hexRounds = Math.max(1, Math.floor(m.level / WARLOCK_HEX_DURATION_DIVISOR));
            const canHex = m.mana >= WARLOCK_HEX_UPKEEP_MANA;
            const hexBtn = this._addBtn(`\u{1F441} Evil Eye Hex (free)`, canHex, () => {
                this._pickTarget(e => this.combat.warlockEvilEye(e), { prompt: 'Hex which enemy?' });
            });
            hexBtn.classList.add('combat-special-btn');
            hexBtn.title = [
                'Warlock L1: Free action. Does not consume the turn.',
                `Applies -${hexPenalty} defense, melee, ranged, and magic damage for ${hexRounds} round(s).`,
                `Costs ${WARLOCK_HEX_UPKEEP_MANA} MP per round to maintain while any of this warlock's hexes remain.`,
                !canHex ? `Need ${WARLOCK_HEX_UPKEEP_MANA} MP to maintain a hex.` : '',
            ].filter(Boolean).join('\n');

            if (m.level >= WARLOCK_CAULDRON_UNLOCK_LEVEL) {
                const unlocked = getWarlockUnlockedDemons(m.level);
                const selected = unlocked.some(d => d.id === m.warlockSelectedDemon)
                    ? m.warlockSelectedDemon
                    : (unlocked[0]?.id || 'imp');
                m.warlockSelectedDemon = selected;

                const picker = document.createElement('select');
                picker.className = 'combat-special-btn';
                picker.style.cssText = 'min-height:32px;background:#20130d;color:#f2d9a0;border:1px solid #6b4a24;border-radius:4px;padding:4px 8px;';
                for (const d of unlocked) {
                    const opt = document.createElement('option');
                    const preset = WARLOCK_DEMON_PRESETS[d.id];
                    opt.value = d.id;
                    opt.textContent = `${preset?.icon || '\u{1F47F}'} ${preset?.name || d.id}`;
                    if (d.id === selected) opt.selected = true;
                    picker.appendChild(opt);
                }
                picker.title = 'Choose which demon the cauldron will auto-summon each round while active.';
                picker.addEventListener('change', () => {
                    m.warlockSelectedDemon = picker.value;
                    const preset = WARLOCK_DEMON_PRESETS[picker.value];
                    this.combat._addLog(`${m.name} prepares the cauldron for ${preset?.name || picker.value}.`, 'player');
                    this.combat._notify();
                });
                this.actionsEl.appendChild(picker);

                const boundDemons = (this.combat.party || [])
                    .filter(p => p.health > 0 && p.isSummoned && p.summonerId === m.id && WARLOCK_DEMON_PRESETS[p.summonType]);
                const upkeep = boundDemons.length * WARLOCK_DEMON_UPKEEP_HP;
                const canCauldron = m.warlockCauldronOpen || m.health > WARLOCK_CAULDRON_HP_COST;
                const cauldronLabel = m.warlockCauldronOpen
                    ? `\u{1F372} Cauldron: ON (${upkeep} HP/round)`
                    : `\u{1F372} Tend Cauldron (-${WARLOCK_CAULDRON_HP_COST} HP)`;
                const cauldronBtn = this._addBtn(cauldronLabel, canCauldron, () => this.combat.warlockToggleCauldron(m.warlockSelectedDemon));
                cauldronBtn.classList.add('combat-special-btn');
                if (m.warlockCauldronOpen) cauldronBtn.style.background = 'linear-gradient(135deg,#2a0718,#5a1238)';
                cauldronBtn.title = [
                    `Warlock L${WARLOCK_CAULDRON_UNLOCK_LEVEL}: Free action toggle.`,
                    `Opening costs ${WARLOCK_CAULDRON_HP_COST} HP. While open, summons one selected demon every round at 100% chance.`,
                    `Each bound demon costs ${WARLOCK_DEMON_UPKEEP_HP} HP per round to maintain. Current upkeep: ${upkeep} HP/round.`,
                    'If the warlock falls, all demons bound to that cauldron vanish.',
                    !canCauldron ? `Need more than ${WARLOCK_CAULDRON_HP_COST} HP to open the cauldron.` : '',
                ].filter(Boolean).join('\n');
            }

            if (m.level >= WARLOCK_CURSE_UNLOCK_LEVEL && !inAbyssForm) {
                const canCurse = m.mana >= WARLOCK_CURSE_MANA_COST;
                const rounds = Math.min(9, 4 + Math.floor(m.level / 20));
                const curseBtn = this._addBtn(`\u{1F56F}\uFE0F Wasting Curse (-${WARLOCK_CURSE_MANA_COST} MP)`, canCurse, () => {
                    this._pickTarget(e => this.combat.warlockWastingCurse(e), { prompt: 'Curse which enemy?' });
                });
                curseBtn.classList.add('combat-special-btn');
                curseBtn.title = [
                    `Warlock L${WARLOCK_CURSE_UNLOCK_LEVEL}: single-target magic curse.`,
                    `Deals 1% of the target's current HP this round, increasing by 1% per round to a 5% cap.`,
                    `Duration: ${rounds} round(s). Only one Wasting Curse can be active per target.`,
                    'Magic-immune targets are immune. Other targets have a 5% chance each round to shrug it off.',
                    !canCurse ? `Not enough mana (need ${WARLOCK_CURSE_MANA_COST} MP).` : '',
                ].filter(Boolean).join('\n');
            }

            if (m.level >= WARLOCK_CHARM_UNLOCK_LEVEL && !inAbyssForm) {
                const canCharm = m.mana >= WARLOCK_CHARM_MANA_COST;
                const charmBtn = this._addBtn(`\u{1F47F} Charm Demon (-${WARLOCK_CHARM_MANA_COST} MP)`, canCharm, () => {
                    this._pickTarget(e => this.combat.warlockCharmDemon(e), {
                        filter: e => this.combat._isDemonEnemy(e),
                        prompt: 'Charm which demon?',
                    });
                });
                charmBtn.classList.add('combat-special-btn');
                charmBtn.title = [
                    `Warlock L${WARLOCK_CHARM_UNLOCK_LEVEL}: works like Bard Charm Monster, but only against demons.`,
                    'Bosses, mega-bosses, and super-bosses cannot be charmed.',
                    !canCharm ? `Not enough mana (need ${WARLOCK_CHARM_MANA_COST} MP).` : '',
                ].filter(Boolean).join('\n');
            }

            if (m.level >= WARLOCK_ABYSS_FORM_UNLOCK_LEVEL) {
                const formLabel = m.abyssFormActive
                    ? '\u{1F419} Abyss Form: ON'
                    : m.abyssFormUsed
                        ? '\u{1F419} Abyss Form [used]'
                        : '\u{1F419} Abyss Form';
                const formBtn = this._addBtn(formLabel, m.abyssFormActive || !m.abyssFormUsed, () => this.combat.warlockToggleAbyssForm());
                formBtn.classList.add('combat-special-btn');
                if (m.abyssFormActive) formBtn.style.background = 'linear-gradient(135deg,#120b2d,#3a1b68)';
                formBtn.title = [
                    `Warlock L${WARLOCK_ABYSS_FORM_UNLOCK_LEVEL}: once per combat, lasts until killed, toggled off, or combat ends.`,
                    'Doubles health, adds level to defense, stays back row, disables normal melee/ranged/magic, curse, and charm.',
                    'Gains tentacle attacks from the back row, half magic/AoE damage, poison/psychic/charm/hold/stun immunity, and half cold/acid damage.',
                    m.abyssFormActive ? 'Currently transformed. Click to return to normal form.' : '',
                    !m.abyssFormActive && m.abyssFormUsed ? 'Already used this combat.' : '',
                ].filter(Boolean).join('\n');

                if (m.abyssFormActive) {
                    const tentacleCount = Math.max(1, Math.floor(m.level / 3));
                    const tentacleBtn = this._addBtn(`\u{1F419} Tentacles x${tentacleCount}`, true, () => this.combat.warlockTentacleAttack());
                    tentacleBtn.classList.add('combat-special-btn');
                    tentacleBtn.title = [
                        `Attacks ${tentacleCount} random available target(s) from the back row.`,
                        `Uses warlock magic skill for melee damage with +${m.level}% bonus.`,
                        `${m.level}% stun chance per hit; normal monster and type immunities still apply.`,
                    ].join('\n');

                    const targets = Math.max(1, Math.floor(m.level / WARLOCK_ELDRITCH_SIGN_TARGET_DIVISOR));
                    const signBtn = this._addBtn(`\u{1F52E} Eldritch Sign (${targets})`, !!m.eldritchSignReady, () => this.combat.warlockEldritchSign());
                    signBtn.classList.add('combat-special-btn');
                    if (!m.eldritchSignReady) signBtn.style.opacity = '0.55';
                    signBtn.title = [
                        `Applies Wasting Curse to ${targets} random enemy target(s), ignoring mana cost.`,
                        'After use, it is disabled until it rolls a 1-in-3 recharge at the start of a round.',
                        !m.eldritchSignReady ? 'Not recharged yet.' : 'Ready.',
                    ].join('\n');
                }
            }
        }

        // Paladin: Smite + Lay On Hands
        if (m.classId === 'paladin') {
            if (m.level >= PALADIN_DRAGONSLAYER_UNLOCK_LEVEL) {
                const dragonslayerActive = !!m.dragonslayerActive;
                const dragonslayerCan = dragonslayerActive || m.mana >= PALADIN_DRAGONSLAYER_MANA_PER_ROUND;
                const dragonslayerLabel = dragonslayerActive
                    ? `🐉 Dragonslayer: ON (-${PALADIN_DRAGONSLAYER_MANA_PER_ROUND} MP/round)`
                    : `🐉 Dragonslayer: OFF (-${PALADIN_DRAGONSLAYER_MANA_PER_ROUND} MP/round)`;
                const dragonslayerBtn = this._addBtn(dragonslayerLabel, dragonslayerCan, () => {
                    this.combat.paladinDragonslayerToggle();
                });
                dragonslayerBtn.classList.add('combat-special-btn');
                if (dragonslayerActive) dragonslayerBtn.style.boxShadow = '0 0 8px #ffd166, 0 0 16px #b06a0066';
                const auraReduction = m.getDragonAuraReduction();
                dragonslayerBtn.title = [
                    `Paladin L${PALADIN_DRAGONSLAYER_UNLOCK_LEVEL}: Dragonslayer (toggle).`,
                    `Costs ${PALADIN_DRAGONSLAYER_MANA_PER_ROUND} MP per round.`,
                    'Smite and AoE Smite can target dragons while active.',
                    `If shielded, dragon magic/AoE damage is reduced by ${auraReduction}% (level + 10%, cap 90%) for the whole party before defenses.`,
                    dragonslayerActive ? 'Currently ACTIVE.' : 'Currently inactive.',
                    !dragonslayerCan ? 'Not enough mana to invoke.' : '',
                ].filter(Boolean).join('\n');
            }

            // ── Smite (targets an enemy — undead/demons, plus dragons while Dragonslayer is active)
            const smiteFilter = (e) => this.combat.canPaladinSmiteTarget(m, e);
            const hasSmiteTarget = this.combat.aliveEnemies.some(smiteFilter);
            const smiteCan = m.mana >= PALADIN_SMITE_MANA_COST && canMelee && hasSmiteTarget;
            let smiteLabel = `\u2728 Smite (-${PALADIN_SMITE_MANA_COST} MP)`;
            if (!canMelee) smiteLabel += ' [BACK ROW]';
            else if (!hasSmiteTarget) smiteLabel += ' [NO TARGET]';
            const smiteBtn = this._addBtn(smiteLabel, smiteCan, () => {
                soundManager.playMelee();
                this._pickTarget(e => this.combat.paladinSmite(e), {
                    filter: smiteFilter,
                    prompt: m.level >= PALADIN_DRAGONSLAYER_UNLOCK_LEVEL && m.dragonslayerActive
                        ? 'Smite which marked foe?'
                        : 'Smite which unholy foe?',
                });
            });
            smiteBtn.classList.add('combat-special-btn');
            const baseKill  = PALADIN_SMITE_INSTAKILL_BASE * 100;
            const perLvlKill = PALADIN_SMITE_INSTAKILL_PER_LEVEL * 100;
            const curKill = Math.min(100, PALADIN_SMITE_INSTAKILL_BASE * 100 + PALADIN_SMITE_INSTAKILL_PER_LEVEL * 100 * m.level);
            smiteBtn.title = [
                'Paladin special: Smite.',
                `Costs ${PALADIN_SMITE_MANA_COST} mana. Front-row only.`,
                `Deals +${2 * m.level} holy bonus damage and has a ${curKill.toFixed(0)}% chance to instantly purge the target (${baseKill}% base +${perLvlKill}%/level).`,
                m.level >= PALADIN_DRAGONSLAYER_UNLOCK_LEVEL && m.dragonslayerActive
                    ? 'Dragonslayer is active: dragons are valid Smite targets too.'
                    : 'Targets undead and demons; dragons are added while Dragonslayer is active.',
                !canMelee ? 'Cannot Smite from back row.' : '',
                !hasSmiteTarget ? 'No valid Smite targets in this fight.' : '',
                m.mana < PALADIN_SMITE_MANA_COST ? 'Not enough mana.' : '',
            ].filter(Boolean).join('\n');

            // ── Lay On Hands (targets an ally)
            const healCan = m.mana >= PALADIN_HEAL_MANA_COST;
            const healLabel = `\u{1F64F} Lay On Hands (-${PALADIN_HEAL_MANA_COST} MP)`;
            const healBtn = this._addBtn(healLabel, healCan, () => {
                this._pickPartyTarget(t => this.combat.paladinHeal(t), {
                    filter: (pm) => pm.health > 0 && pm.health < pm.maxHealth && (!pm.isSummoned || pm.canBeHealed),
                    prompt: 'Lay hands on whom?',
                });
            });
            healBtn.classList.add('combat-special-btn');
            const palHealPct = (PALADIN_HEAL_PERCENT + m.getHealPercentBonus()) * 100;
            healBtn.title = [
                'Paladin special: Lay On Hands.',
                `Costs ${PALADIN_HEAL_MANA_COST} mana.`,
                `Restores ${palHealPct.toFixed(0)}% of target's max HP (half a cleric's heal; scales +1%/level).`,
                'Cannot mend uncontrolled summons (undead, golems).',
                !healCan ? 'Not enough mana.' : '',
            ].filter(Boolean).join('\n');

            // ── Fire Aura (toggle)
            const auraActive = !!m.fireAuraActive;
            const auraCan = auraActive || m.mana >= PALADIN_FIRE_AURA_MANA_PER_ROUND;
            const auraLabel = auraActive
                ? `\u{1F525} Fire Aura: ON (-${PALADIN_FIRE_AURA_MANA_PER_ROUND} MP/round)`
                : `\u{1F525} Fire Aura: OFF (-${PALADIN_FIRE_AURA_MANA_PER_ROUND} MP/round)`;
            const auraBtn = this._addBtn(auraLabel, auraCan, () => {
                soundManager.playMelee();
                this.combat.paladinFireAura();
            });
            auraBtn.classList.add('combat-special-btn');
            if (auraActive) auraBtn.style.boxShadow = '0 0 8px #ff6600, 0 0 16px #ff330066';
            auraBtn.title = [
                'Paladin special: Fire Aura (toggle).',
                `When active, reflects ALL incoming melee damage back at the attacker as fire damage.`,
                `Costs ${PALADIN_FIRE_AURA_MANA_PER_ROUND} MP per round to maintain. Auto-extinguishes if out of mana.`,
                auraActive ? 'Currently ACTIVE.' : 'Currently inactive.',
                !auraCan ? 'Not enough mana to ignite.' : '',
            ].filter(Boolean).join('\n');

            // ── Paladin L20: Revive (mirrors cleric revive)
            if (m.level >= PALADIN_L20_UNLOCK_LEVEL) {
                const palHasDead = (this.combat.party || []).some(pm => !pm.isSummoned && pm.health <= 0 && !pm.lichPhial);
                const canPalRevive = m.mana >= CLERIC_REVIVE_MANA_COST && palHasDead;
                const palReviveLabel = `🕊️ Revive (-${CLERIC_REVIVE_MANA_COST} MP)`;
                const palReviveBtn = this._addBtn(palReviveLabel, canPalRevive, () => {
                    this._pickPartyTarget(t => this.combat.paladinRevive(t), {
                        filter: (pm) => !pm.isSummoned && pm.health <= 0 && !pm.lichPhial,
                        prompt: 'Revive whom?',
                    });
                });
                palReviveBtn.classList.add('combat-special-btn');
                const palRevHealPct = Math.round(CLERIC_REVIVE_HEAL_FRAC * 100);
                palReviveBtn.title = [
                    `Paladin L20 special: Revive.`,
                    `Costs ${CLERIC_REVIVE_MANA_COST} mana.`,
                    `Brings a fallen ally back at ${palRevHealPct}% of max HP.`,
                    'Cannot target the living, summons, or undead minions.',
                    !palHasDead ? 'No fallen allies to revive.' : '',
                    palHasDead && !canPalRevive ? 'Not enough mana.' : '',
                ].filter(Boolean).join('\n');

                // ── Paladin L20: AoE Smite (hits all undead/demons at half damage & purge)
                const aoeCost = PALADIN_SMITE_MANA_COST * PALADIN_AOE_SMITE_MANA_MULT;
                const aoeSmiteFilter = (e) => this.combat.canPaladinSmiteTarget(m, e);
                const hasAoeSmiteTarget = this.combat.aliveEnemies.some(aoeSmiteFilter);
                const canAoeSmite = m.mana >= aoeCost && canMelee && hasAoeSmiteTarget;
                let aoeSmiteLabel = `✨ AoE Smite (-${aoeCost} MP)`;
                if (!canMelee) aoeSmiteLabel += ' [BACK ROW]';
                else if (!hasAoeSmiteTarget) aoeSmiteLabel += ' [NO TARGET]';
                const aoeSmiteBtn = this._addBtn(aoeSmiteLabel, canAoeSmite, () => {
                    // Cancel any active single-target selection (e.g. regular Smite was clicked first)
                    if (this._selectingTarget) {
                        this._selectingTarget = false;
                        this._targetCallback = null;
                        this._clearTargetable();
                    }
                    soundManager.playMelee();
                    this.combat.paladinAoeSmite();
                });
                aoeSmiteBtn.classList.add('combat-special-btn');
                const fullPurge    = Math.min(100, Math.round((PALADIN_SMITE_INSTAKILL_BASE + PALADIN_SMITE_INSTAKILL_PER_LEVEL * m.level) * 100));
                const halfPurge    = Math.round(fullPurge * PALADIN_AOE_SMITE_INSTAKILL_MULT);
                aoeSmiteBtn.title = [
                    'Paladin L20 special: AoE Smite.',
                    `Costs ${aoeCost} mana. Front-row only.`,
                    'Calls down holy light on every valid Smite target simultaneously.',
                    `Deals half of normal Smite damage to each target.`,
                    `${halfPurge}% chance to instantly purge each target (half of single-target ${fullPurge}%).`,
                    m.level >= PALADIN_DRAGONSLAYER_UNLOCK_LEVEL && m.dragonslayerActive
                        ? 'Dragonslayer is active: dragons are included too.'
                        : 'Targets undead and demons; dragons are added while Dragonslayer is active.',
                    !canMelee ? 'Cannot AoE Smite from back row.' : '',
                    !hasAoeSmiteTarget ? 'No valid AoE Smite targets in this fight.' : '',
                    canMelee && hasAoeSmiteTarget && !canAoeSmite ? 'Not enough mana.' : '',
                ].filter(Boolean).join('\n');
            }

            // ── Paladin L30: Aura of Righteousness (passive) + Divine Judgment ────
            if (m.level >= PALADIN_L30_UNLOCK_LEVEL) {
                // Compute current stacked aura reduction across all alive L30+ paladins
                const _auraPaladins = (this.combat.party || []).filter(p =>
                    p && p.health > 0 && !p.isSummoned
                    && p.classId === 'paladin' && p.level >= PALADIN_L30_UNLOCK_LEVEL,
                ).length;
                let _auraTotalReduction = 0;
                let _auraStep = PALADIN_AURA_RIGHTEOUSNESS_REDUCTION;
                for (let _i = 0; _i < _auraPaladins; _i++) {
                    _auraTotalReduction += _auraStep;
                    _auraStep /= 2;
                }
                const _auraReductionPct = (_auraTotalReduction * 100).toFixed(1);
                const _auraHealPct      = Math.round(PALADIN_AURA_RIGHTEOUSNESS_HEAL_FRAC * 100);

                const auraPassiveBtn = this._addBtn(`✝️ Aura of Righteousness (passive)`, false, () => {});
                auraPassiveBtn.title = [
                    `Paladin L${PALADIN_L30_UNLOCK_LEVEL} passive: Aura of Righteousness.`,
                    `Party damage reduction: ${_auraReductionPct}% before defenses (${_auraPaladins > 1 ? _auraPaladins + ' L30+ paladins stacking' : 'single paladin'}).`,
                    `Stacking formula: each additional paladin contributes half the previous (5%, 2.5%, 1.25%…, hard cap ~10%).`,
                    `Each regular melee hit by this paladin also heals every living non-undead/non-golem party member for ${_auraHealPct}% of damage dealt (min 1).`,
                    `Paladin must be alive for the damage reduction to apply.`,
                ].join('\n');

                // ── Divine Judgment (once per combat)
                const djUsed        = !!m.divineJudgmentUsed;
                const djFilter      = (e) => this.combat.canPaladinSmiteTarget(m, e);
                const hasJudgeTarget = this.combat.aliveEnemies.some(djFilter);
                const djCanAfford   = m.stamina >= PALADIN_DIVINE_JUDGMENT_STAMINA_COST
                                   && m.mana    >= PALADIN_DIVINE_JUDGMENT_MANA_COST;
                const djCan         = !djUsed && canMelee && hasJudgeTarget && djCanAfford;
                let djLabel = `⚡✨ Divine Judgment (-${PALADIN_DIVINE_JUDGMENT_STAMINA_COST} ST / -${PALADIN_DIVINE_JUDGMENT_MANA_COST} MP)`;
                if (djUsed)              djLabel += ' [USED]';
                else if (!canMelee)      djLabel += ' [BACK ROW]';
                else if (!hasJudgeTarget) djLabel += ' [NO TARGET]';

                const djBtn = this._addBtn(djLabel, djCan, () => {
                    soundManager.playMelee();
                    this._pickTarget(e => this.combat.paladinDivineJudgment(e), {
                        filter: djFilter,
                        prompt: 'Call Divine Judgment upon whom?',
                    });
                });
                djBtn.classList.add('combat-special-btn');

                const _curPct     = (PALADIN_DIVINE_JUDGMENT_BASE_PCT + m.level * PALADIN_DIVINE_JUDGMENT_PER_LEVEL) * 100;
                const _bossPct    = _curPct / PALADIN_DIVINE_JUDGMENT_BOSS_DIVISOR;
                const _megaPct    = _curPct / PALADIN_DIVINE_JUDGMENT_MEGABOSS_DIVISOR;
                djBtn.title = [
                    `Paladin L${PALADIN_L30_UNLOCK_LEVEL} special: Divine Judgment (once per combat).`,
                    `Costs ${PALADIN_DIVINE_JUDGMENT_STAMINA_COST} stamina and ${PALADIN_DIVINE_JUDGMENT_MANA_COST} mana. Front-row only.`,
                    `Calls holy wrath on a smiteable target, dealing ${_curPct.toFixed(1)}% of their current HP as holy damage (ignores all defense).`,
                    `vs bosses: ${_bossPct.toFixed(1)}% of current HP. vs mega bosses: ${_megaPct.toFixed(1)}% of current HP.`,
                    `Hits hardest on healthy targets — powerful opener.`,
                    m.level >= PALADIN_DRAGONSLAYER_UNLOCK_LEVEL && m.dragonslayerActive
                        ? 'Targets: undead, demons, dragons (Dragonslayer active).'
                        : 'Targets undead and demons; activate Dragonslayer to include dragons.',
                    djUsed ? 'Already used this combat.' : '',
                    !canMelee ? 'Cannot use from back row.' : '',
                    !hasJudgeTarget ? 'No valid smiteable targets.' : '',
                    canMelee && hasJudgeTarget && !djUsed && !djCanAfford ? 'Not enough stamina or mana.' : '',
                ].filter(Boolean).join('\n');
            }
        }

        // Artificer: Heal Golem (own golem only; uses 1 reagent of the golem's tier)
        if (m.classId === 'artificer') {
            const myGolems = (this.combat.party || []).filter(pm =>
                pm && pm.isSummoned && pm.summonerId === m.id &&
                pm.summonStats && pm.summonStats.tierId &&
                GOLEM_PRESETS[pm.summonType] && pm.health > 0
            );
            const hasLive = myGolems.length > 0;
            const needsHeal = myGolems.some(g => g.health < g.maxHealth);
            const freeRepairPct = Math.round(Math.min(1, (m.level || 1) * ARTIFICER_FREE_REPAIR_CHANCE_PER_LEVEL) * 100);
            // Determine whether the tier reagent is in stock for any living golem.
            const inv = this.combat.inventory;
            const canPayAny = !!inv && myGolems.some(g => {
                const tier = GOLEM_TIERS.find(t => t.id === g.summonStats.tierId);
                const rTier = (tier && tier.reagentTier) || 'common';
                return inv.hasItem(`reagent_${rTier}`, 1);
            });
            const canTryFreeRepair = freeRepairPct > 0;
            const canHeal = hasLive && needsHeal && (canPayAny || canTryFreeRepair);
            const label = `\u{1F527} Heal Golem (${freeRepairPct}% free)`;
            const btn = this._addBtn(label, canHeal, () => {
                this._pickPartyTarget(t => this.combat.healGolem(t), {
                    filter: (pm) => pm && pm.isSummoned && pm.summonerId === m.id &&
                        pm.summonStats && pm.summonStats.tierId &&
                        GOLEM_PRESETS[pm.summonType] && pm.health > 0 &&
                        pm.health < pm.maxHealth,
                    prompt: 'Repair which golem?',
                });
            });
            btn.classList.add('combat-special-btn');
            const healPct = Math.round(ARTIFICER_HEAL_GOLEM_PCT * 100);
            btn.title = [
                'Artificer special: Repair Golem.',
                `Consumes 1 reagent matching the golem's tier unless the free repair chance succeeds.`,
                `${freeRepairPct}% chance to repair for free without spending a reagent.`,
                `Restores ${healPct}% of the golem's max HP.`,
                'Only works on your own golem.',
                !hasLive ? 'No living golem summoned.' : '',
                hasLive && !needsHeal ? 'Your golem is already at full HP.' : '',
                hasLive && needsHeal && !canPayAny ? 'No matching reagent in inventory; the repair must roll free or it will fail.' : '',
                'Out of combat, use the Crafting menu (K) to forge, repair, or dismiss a golem.',
            ].filter(Boolean).join('\n');

            // L30 Golem Berserk Mode (free action — ON and OFF buttons)
            if (m.level >= ARTIFICER_BERSERK_UNLOCK_LEVEL) {
                const berserkGolems = myGolems.filter(g => !g.golemBerserkUsed);
                const anyBerserk    = myGolems.some(g => g.golemBerserkActive);
                const canActivate   = berserkGolems.some(g => !g.golemBerserkActive && !g.golemBerserkUsed);
                const canDeactivate = anyBerserk;

                const bOnBtn = this._addBtn('⚡ Berserk ON (free)', canActivate, () => {
                    this._pickPartyTarget(t => this.combat.golemBerserkOn(t), {
                        filter: (pm) => pm && pm.isSummoned && pm.summonerId === m.id &&
                            GOLEM_PRESETS[pm.summonType] && pm.health > 0 &&
                            !pm.golemBerserkActive && !pm.golemBerserkUsed,
                        prompt: 'Activate Berserk on which golem?',
                    });
                });
                bOnBtn.classList.add('combat-special-btn');
                const dmgPct = Math.round(ARTIFICER_BERSERK_DMG_PER_LEVEL * 100);
                bOnBtn.title = [
                    `Artificer L${ARTIFICER_BERSERK_UNLOCK_LEVEL}: Golem Berserk Mode (free action, one use per combat).`,
                    `Damage multiplier: 1 + level × ${dmgPct}% (e.g. level 30 = +60%).`,
                    `Overload: ${Math.round(ARTIFICER_BERSERK_OVERLOAD_PCT * 100)}% current HP self-damage per round.`,
                    `Auto-exits at ${Math.round(ARTIFICER_BERSERK_MIN_HP_PCT * 100)}% max HP; cannot repair while berserk.`,
                    !canActivate ? (hasLive ? 'No eligible golem (already berserk, used, or dead).' : 'No living golem.') : '',
                ].filter(Boolean).join('\n');

                const bOffBtn = this._addBtn('⚙️ Berserk OFF (free)', canDeactivate, () => {
                    this._pickPartyTarget(t => this.combat.golemBerserkOff(t), {
                        filter: (pm) => pm && pm.isSummoned && pm.summonerId === m.id &&
                            GOLEM_PRESETS[pm.summonType] && pm.golemBerserkActive,
                        prompt: 'Disengage Berserk on which golem?',
                    });
                });
                bOffBtn.classList.add('combat-special-btn');
                bOffBtn.title = [
                    'Disengage Berserk Mode on a golem (free action).',
                    'Marks the charge as used for this combat — cannot re-enter.',
                    !canDeactivate ? 'No golem is currently in Berserk Mode.' : '',
                ].filter(Boolean).join('\n');
            }
        }

        if (isMonk && m.level >= MONK_AVATAR_UNLOCK_LEVEL) {
            const row = document.createElement('div');
            row.style.display = 'flex';
            row.style.gap = '6px';
            row.style.alignItems = 'center';
            row.style.flexWrap = 'wrap';
            const sel = document.createElement('select');
            sel.className = 'combat-action-btn combat-special-btn';
            for (const [id, label] of [['fire', '🔥 Fire'], ['lightning', '⚡ Air'], ['acid', '🟢 Earth'], ['ice', '❄️ Water']]) {
                const opt = document.createElement('option');
                opt.value = id;
                opt.textContent = label;
                if ((m.avatarElement || 'fire') === id) opt.selected = true;
                sel.appendChild(opt);
            }
            sel.addEventListener('change', () => this.combat.monkSetAvatarElement(sel.value));
            const avBtn = document.createElement('button');
            avBtn.className = 'combat-action-btn combat-special-btn';
            avBtn.textContent = m.avatarActive ? `Avatar: ON (-${MONK_AVATAR_MANA_PER_ROUND} MP/rd)` : `Avatar: OFF`;
            avBtn.disabled = !m.avatarActive && m.mana < MONK_AVATAR_MANA_PER_ROUND;
            avBtn.addEventListener('click', () => this.combat.monkToggleAvatar());
            avBtn.title = [
                `Monk L${MONK_AVATAR_UNLOCK_LEVEL}: Avatar (free toggle on).`,
                `${MONK_AVATAR_MANA_PER_ROUND} MP per round; regenerates ${Math.round(MONK_AVATAR_HP_REGEN * 100)}% max HP per round.`,
                `At turn start, each harmful state has ${Math.round((MONK_AVATAR_CLEANSE_BASE + (m.level || 1) * MONK_AVATAR_CLEANSE_PER_LEVEL) * 100)}% chance to be shrugged off.`,
                `Landed attacks add an elemental DoT for floor(level/${MONK_AVATAR_DOT_DURATION_DIVISOR}) rounds. Quivering Palm does not apply this DoT.`,
                'Element can be changed for free each round.',
            ].join('\n');
            row.appendChild(sel);
            row.appendChild(avBtn);
            this.actionsEl.appendChild(row);
        }

        // ── Monk L20: Quivering Palm
        if (isMonk && m.level >= MONK_QUIVERING_PALM_UNLOCK_LEVEL) {
            const qpStCost = MELEE_STAMINA_COST * MONK_QUIVERING_PALM_STAMINA_MULT;
            const qpMpCost = MONK_MELEE_MANA_COST * MONK_QUIVERING_PALM_MANA_MULT;
            const qpStMiss = m.stamina < qpStCost;
            const qpMpMiss = m.mana    < qpMpCost;
            const qpCan    = canMelee && !qpStMiss && !qpMpMiss;
            let qpLabel = `✋ Quivering Palm (-${qpStCost} ST / -${qpMpCost} MP)`;
            if (!canMelee) qpLabel += ' [BACK ROW]';
            const qpDuration = MONK_QUIVERING_PALM_DURATION_BASE
                + Math.floor(Math.max(0, m.level - MONK_QUIVERING_PALM_UNLOCK_LEVEL) / 10)
                * MONK_QUIVERING_PALM_DURATION_PER_10LV;
            const qpBtn = this._addBtn(qpLabel, qpCan, () => {
                soundManager.playMelee();
                this._pickTarget(e => this.combat.monkQuiveringPalm(e), {
                    prompt: '✋ Choose a target for Quivering Palm...',
                });
            });
            qpBtn.classList.add('combat-special-btn');
            qpBtn.title = [
                `Monk L20 special: Quivering Palm.`,
                `Costs ${qpStCost} stamina and ${qpMpCost} mana. Front-row only.`,
                `Strikes for 2× normal melee damage, then applies an internal disruption DoT.`,
                `DoT starts at the base melee roll and DOUBLES each round — bypasses all armor and defense.`,
                `Duration: ${qpDuration} rounds at this level. Stacking adds 1 round (capped).`,
                'If the target already has Quivering Palm active, +1 round is added instead of restarting.',
                !canMelee ? 'Cannot use from back row.' : '',
                qpStMiss ? 'Not enough stamina.' : '',
                qpMpMiss ? 'Not enough mana.' : '',
            ].filter(Boolean).join('\n');
        }

        // ── Monk L30: Ki Surge
        if (isMonk && m.level >= MONK_KI_UNLOCK_LEVEL) {
            const ki = m.kiCharges || 0;
            const kiCan = canMelee && ki > 0;
            let kiLabel = `\u{1F9D8} Ki Surge (${ki} charge${ki !== 1 ? 's' : ''})`;
            if (!canMelee) kiLabel += ' [BACK ROW]';
            else if (ki <= 0) kiLabel += ' [NO KI]';
            const kiBtn = this._addBtn(kiLabel, kiCan, () => {
                soundManager.playMelee();
                this.combat.monkKiSurge();
            });
            kiBtn.classList.add('combat-special-btn');
            kiBtn.title = [
                `Monk L${MONK_KI_UNLOCK_LEVEL}: Ki Surge.`,
                `Strikes ALL enemies for melee × Ki Charges damage. Bypasses all defense. Counts as magic/AoE.`,
                `Ki Charges: ${ki}. Banked by dodging (L30+) or Avatar cleansing harmful effects.`,
                'Expends all Ki Charges. Front-row only.',
                !canMelee ? 'Cannot use from back row.' : '',
                ki <= 0 ? 'No Ki Charges available.' : '',
            ].filter(Boolean).join('\n');
        }

        // ── Warrior L20: Defend Mode toggle
        if (m.classId === 'warrior' && m.level >= WARRIOR_DEFEND_MODE_UNLOCK_LEVEL) {
            const defendModeOn = !!m.isDefendMode;
            const blockBonus   = Math.round(m.getDefendModeShieldBonus() * 100);
            const totalBlock   = Math.round(m.getAugmentedShieldBlock()  * 100);
            const dmLabel = defendModeOn
                ? `\u{1F6E1}️ Defend Mode: ON (block ${totalBlock}%)`
                : `\u{1F6E1}️ Defend Mode: OFF (unlocked L${WARRIOR_DEFEND_MODE_UNLOCK_LEVEL})`;
            const dmBtn = this._addBtn(dmLabel, true, () => this.combat.warriorDefendModeToggle());
            dmBtn.classList.add('combat-special-btn');
            if (defendModeOn) dmBtn.style.boxShadow = '0 0 8px #3399ff, 0 0 16px #003399aa';
            const stunResist = Math.round(m.getStunResistChance() * 100);
            dmBtn.title = [
                'Warrior L20 special: Defend Mode (toggle).',
                `When ON: adds +${blockBonus}% to shield block chance (total ${totalBlock}%).`,
                'Attacks on fellow party members are checked against your augmented block chance — on a success, the raw hit is reduced by YOUR own armor and defense, then you take 20% of that remainder (min 1). The original target is unharmed.',
                'Intercept applies to melee, ranged, and magic/AoE attacks alike.',
                'Cannot intercept while stunned, held, petrified, or dead.',
                m.level >= 25 ? `L25 passive: successful intercepts have a ${Math.round(m.getRetaliationChance() * 100)}% chance to retaliate for 75% melee damage.` : 'L25 passive: successful intercepts can trigger a retaliatory strike.',
                'Toggling costs your action for the turn. Use End Turn to pass without toggling.',
                `⚡ Stun Resistance (L20 passive): ${stunResist}% chance to ignore stun effects.`,
                defendModeOn ? 'Currently ACTIVE — attacks disabled.' : 'Currently INACTIVE.',
            ].join('\n');

            // When in defend mode, show an End Turn button so they can pass without toggling
            if (defendModeOn) {
                const etBtn = this._addBtn('⏭️ End Turn', true, () => this.combat.endTurn());
                etBtn.title = 'Pass this turn while remaining in Defend Mode.';
            }
        }

        // ── Warrior L30: Summon Squire(s)
        if (m.classId === 'warrior' && m.level >= WARRIOR_SQUIRE_UNLOCK_LEVEL) {
            const alreadySummoned = !!m.squiresSummoned;
            const canAfford       = m.stamina >= WARRIOR_SQUIRE_STAMINA_COST;
            const sqCount         = m.level >= WARRIOR_SQUIRE_COUNT_L90 ? 3 : m.level >= WARRIOR_SQUIRE_COUNT_L60 ? 2 : 1;
            const sqLabel = alreadySummoned
                ? `⚔️ Squires (summoned)`
                : `⚔️ Summon Squire${sqCount > 1 ? 's' : ''} (${WARRIOR_SQUIRE_STAMINA_COST} ST)`;
            const sqBtn = this._addBtn(sqLabel, !alreadySummoned && canAfford, () => this.combat.warriorSummonSquires());
            sqBtn.classList.add('combat-special-btn');
            const sqAttacks = Math.max(1, Math.floor(m.level / WARRIOR_SQUIRE_ATTACKS_PER_LEVELS));
            sqBtn.title = [
                `Warrior L${WARRIOR_SQUIRE_UNLOCK_LEVEL}: Summon Squire${sqCount > 1 ? 's' : ''}. Costs ${WARRIOR_SQUIRE_STAMINA_COST} ST. Once per combat.`,
                `Summons ${sqCount} front-row squire${sqCount > 1 ? 's' : ''} with ${Math.round(WARRIOR_SQUIRE_HP_FRACTION * 100)}% of your HP, stamina, melee, and defense.`,
                `Each squire makes ${sqAttacks} melee attack${sqAttacks > 1 ? 's' : ''} per round (1 per ${WARRIOR_SQUIRE_ATTACKS_PER_LEVELS} levels).`,
                `Squires have a ${Math.round(WARRIOR_SQUIRE_SHIELD_BLOCK * 100)}% chance to block any incoming attack outright.`,
                `Squires automatically enter/leave Formation with you.`,
                alreadySummoned ? 'Already summoned this combat.' : (!canAfford ? `Not enough stamina (need ${WARRIOR_SQUIRE_STAMINA_COST} ST).` : ''),
            ].filter(Boolean).join('\n');
        }

        // ── Warrior L30: Formation toggle (FREE action)
        if (m.classId === 'warrior' && m.level >= WARRIOR_FORMATION_UNLOCK_LEVEL) {
            const formOn    = !!m.isInFormation;
            const formLabel = formOn
                ? `🗡️ Formation: ON (${WARRIOR_FORMATION_STAMINA_PER_ROUND} ST/rnd)`
                : `🗡️ Formation: OFF (toggle)`;
            const formBtn = this._addBtn(formLabel, true, () => this.combat.warriorFormationToggle());
            formBtn.classList.add('combat-special-btn');
            if (formOn) formBtn.style.boxShadow = '0 0 8px #ff9900, 0 0 16px #cc660088';
            const mySquires = this.combat.party.filter(p =>
                p.isSummoned && p.summonType === 'squire' && p.summonerId === m.id && p.health > 0);
            const allFormation = this.combat.party.filter(p =>
                p.health > 0 && p.isInFormation && p.classId === 'warrior');
            const n       = formOn ? allFormation.length : 0;
            const multStr = n >= WARRIOR_FORMATION_MIN_MEMBERS
                ? `×${(1 + WARRIOR_FORMATION_BASE_BONUS + WARRIOR_FORMATION_BONUS_PER_MEMBER * n).toFixed(2)}`
                : `none yet (need ≥${WARRIOR_FORMATION_MIN_MEMBERS} members)`;
            const oppChance = Math.round(((m.level || 1) + WARRIOR_FORMATION_OPPORTUNITY_OFFSET));
            formBtn.title = [
                `Warrior L${WARRIOR_FORMATION_UNLOCK_LEVEL}: Formation — FREE action (does not use your turn).`,
                `With ≥${WARRIOR_FORMATION_MIN_MEMBERS} members: +100% + ${Math.round(WARRIOR_FORMATION_BONUS_PER_MEMBER * 100)}% per member to all formation attacks.`,
                `Applies to: warrior attacks, extra swings, squire attacks, and retaliatory strikes.`,
                `Formation crit: (level ÷ 2)% chance for ×(2 + level÷100) damage.`,
                `Costs ${WARRIOR_FORMATION_STAMINA_PER_ROUND} ST/round for you and each squire independently. Warrior failure drops all squires from formation too.`,
                mySquires.length > 0
                    ? `Your squires: ${mySquires.map(s => s.name).join(', ')} — auto-sync with your formation toggle.`
                    : `No squires present (summon them first for the best bonus).`,
                `While in BOTH Defend Mode AND Formation: squires get a ${oppChance}% opportunity attack after each retaliatory strike.`,
                formOn ? `ACTIVE — formation members: ${n}. Damage multiplier: ${multStr}.` : `INACTIVE.`,
            ].join('\n');
        }

        // ── Reposition Summons (free action — available any time there are living summons)
        const liveSummons = this.combat.party.filter(p => p.isSummoned && p.health > 0);
        if (liveSummons.length > 0) {
            const repoBtn = this._addBtn('↕️ Reposition Summons (free)', true, () => this._showSummonReposition());
            repoBtn.classList.add('combat-special-btn');
            repoBtn.title = 'Move any of your living summons between front and back row. Free action — does not end your turn.';
        }

        // ── Use Item
        const usableItems = this._getUsableCombatItems(m);
        const useItemBtn = this._addBtn(`\u{1F9EA} Use Item${usableItems.length > 0 ? ` (${usableItems.length})` : ' (none)'}`, usableItems.length > 0, () => this._showUseItemPanel(m));
        useItemBtn.classList.add('combat-special-btn');
        useItemBtn.title = usableItems.length > 0
            ? `Use a potion or scroll from your personal or group inventory.\nAvailable: ${usableItems.map(i => i.def.name).join(', ')}`
            : 'No usable items available (potions and scrolls only).';

        // ── Defend
        const defendBtn = this._addBtn('Defend', true, () => this.combat.defend());
        defendBtn.title = 'Reduce incoming damage by half this turn.';

        // ── Delay
        const delayBtn = this._addBtn('⏱️ Delay', true, () => this.combat.delayAction());
        delayBtn.title = 'Delay your turn until the end of the round. Multiple characters can delay; the most recent delay goes last. Useful for healers who want to act after allies take damage.';

        // ── Flee
        const fleeBtn = this._addBtn('Flee', true, () => this.combat.flee());
        fleeBtn.title = '50% chance to escape combat.';

        // ── Manual/Auto mode toggle
        this._addModeToggleBtn();
    }

    _showUndeadPicker(necro) {
        this.actionsEl.innerHTML = '';
        this.turnInfo.textContent = 'Summon which undead?';
        const tiers = this.combat.getAvailableNecroTiers(necro.level);
        tiers.forEach((tier, idx) => {
            const btn = document.createElement('button');
            btn.className = 'combat-action-btn combat-special-btn';
            const tierMpCost = NECRO_SUMMON_MANA_COST + idx;
            btn.textContent = `${tier.icon} ${tier.name} (${tierMpCost} MP)`;
            btn.title = [`${tier.name} (${tierMpCost} MP).`, ...(tier.abilities || [])].join('\n');
            btn.addEventListener('click', () => this.combat.summonUndead(idx));
            this.actionsEl.appendChild(btn);
        });
        const cancel = document.createElement('button');
        cancel.className = 'combat-action-btn';
        cancel.textContent = 'Cancel';
        cancel.addEventListener('click', () => this._refresh());
        this.actionsEl.appendChild(cancel);
    }

    _showBeastPicker(caster) {
        this.actionsEl.innerHTML = '';
        this.turnInfo.textContent = 'Summon which creature?';
        const m = caster || this.combat.currentMember;
        for (const [id, preset] of Object.entries(BEAST_TYPES)) {
            // Treant is druid-only and requires level 5
            if (id === 'treant') {
                if (!m || m.classId !== 'druid' || m.level < 5) continue;
            }
            if (id === 'shambling_mound') {
                if (!m || m.classId !== 'druid' || m.level < DRUID_SHAMBLING_MOUND_UNLOCK_LEVEL) continue;
            }
            // Vampire bat is exclusive to necromancer vampires — never shown to ranger/druid
            if (id === 'vampire_bat') continue;
            // Wolf, bear, eagle, pixie available to ranger and druid
            const btn = document.createElement('button');
            btn.className = 'combat-action-btn combat-special-btn';
            btn.textContent = `${preset.icon} ${preset.name}`;
            btn.title = preset.description || (preset.abilities || []).join('\n');
            btn.addEventListener('click', () => this.combat.summonBeast(id));
            this.actionsEl.appendChild(btn);
        }
        const cancel = document.createElement('button');
        cancel.className = 'combat-action-btn';
        cancel.textContent = 'Cancel';
        cancel.addEventListener('click', () => this._refresh());
        this.actionsEl.appendChild(cancel);
    }

    _showRowPromotion() {
        this.actionsEl.innerHTML = '';
        this.turnInfo.textContent = '\u26A0\uFE0F Front line fallen! Promote a back-row ally:';
        const candidates = this.combat.aliveBack;
        for (const m of candidates) {
            const btn = document.createElement('button');
            btn.className = 'combat-action-btn combat-special-btn';
            btn.textContent = `${m.classDef.icon} ${m.name} (${m.health}/${m.maxHealth})`;
            btn.title = 'Move this character to the front row. Enemies can now target them.';
            btn.addEventListener('click', () => this.combat.promoteToFront(m.id));
            this.actionsEl.appendChild(btn);
        }
    }

    _showSummonReposition() {
        this.actionsEl.innerHTML = '';
        this.turnInfo.textContent = '\u2195\uFE0F Reposition Summons (free action):';
        const liveSummons = this.combat.party.filter(p => p.isSummoned && p.health > 0);
        for (const m of liveSummons) {
            const rowLabel = m.row === 'front' ? '[Front] \u2192 Back' : '[Back] \u2192 Front';
            const btn = document.createElement('button');
            btn.className = 'combat-action-btn combat-special-btn';
            const summonPreset = getSummonPreset(m);
            const icon = summonPreset ? summonPreset.icon : (m.classDef ? m.classDef.icon : '');
            btn.textContent = `${icon} ${m.name} (${m.health}/${m.maxHealth}) ${rowLabel}`;
            btn.title = `Currently in ${m.row} row. Click to move to ${m.row === 'front' ? 'back' : 'front'} row.`;
            btn.addEventListener('click', () => {
                this.combat.repositionSummon(m.id);
                this._showSummonReposition();
            });
            this.actionsEl.appendChild(btn);
        }
        const doneBtn = document.createElement('button');
        doneBtn.className = 'combat-action-btn';
        doneBtn.textContent = 'Done';
        doneBtn.title = 'Return to action menu.';
        doneBtn.addEventListener('click', () => this._refresh());
        this.actionsEl.appendChild(doneBtn);
    }

    _addBtn(label, enabled, onClick) {
        const btn = document.createElement('button');
        btn.className = 'combat-action-btn';
        btn.textContent = label;
        btn.disabled = !enabled;
        if (enabled) btn.addEventListener('click', () => {
            // Guard: ignore if another action is already being processed (prevents
            // double-click and stale-callback bugs).
            if (this._actionInProgress) return;
            this._actionInProgress = true;
            // Disable every action button immediately so no second click can land
            // before _refresh() rebuilds them.
            this.actionsEl.querySelectorAll('button').forEach(b => { b.disabled = true; });
            try {
                onClick();
            } catch (err) {
                console.error('Combat action failed:', err);
                this._actionInProgress = false;
                this._refresh();
                return;
            }
            // Safety net: most combat actions synchronously rebuild the action
            // panel via _notify(). If a branch returns without doing so, do not
            // leave manual Continue or action buttons permanently disabled.
            setTimeout(() => {
                if (!this._active || !this._actionInProgress) return;
                this._actionInProgress = false;
                this._refresh();
            }, 80);
        });
        this.actionsEl.appendChild(btn);
        return btn;
    }

    /** Returns array of { itemId, source:'personal'|'group', def, qty } for usable combat items. */
    _getUsableCombatItems(member) {
        const results = [];
        const seen = new Set();

        const addEntry = (itemId, source, qty) => {
            const def = getItemDef(itemId);
            if (!def || !def.combatUsable) return;
            const key = `${source}:${itemId}`;
            if (seen.has(key)) return;
            seen.add(key);
            results.push({ itemId, source, def, qty });
        };

        // Personal inventory
        for (const entry of (member.inventory || [])) {
            if (entry.quantity > 0) addEntry(entry.itemId, 'personal', entry.quantity);
        }
        // Group inventory
        for (const entry of (this.combat.inventory?.items || [])) {
            if (entry.quantity > 0) addEntry(entry.itemId, 'group', entry.quantity);
        }

        return results;
    }

    /** Replaces the actions panel with a Use Item picker. */
    _showUseItemPanel(member) {
        this.actionsEl.innerHTML = '';

        const title = document.createElement('div');
        title.style.cssText = 'color:#ffcc66;font-size:13px;font-weight:bold;margin-bottom:6px;padding:4px 0;border-bottom:1px solid #444;';
        title.textContent = '\u{1F9EA} Use Item — select from inventory:';
        this.actionsEl.appendChild(title);

        const usable = this._getUsableCombatItems(member);

        // Item dropdown
        const sel = document.createElement('select');
        sel.style.cssText = 'width:100%;padding:5px 6px;background:#1a1a2e;color:#eee;border:1px solid #556;border-radius:4px;font-size:13px;margin-bottom:6px;';
        const placeholder = document.createElement('option');
        placeholder.value = '';
        placeholder.textContent = '— select an item —';
        placeholder.disabled = true;
        placeholder.selected = true;
        sel.appendChild(placeholder);
        for (const entry of usable) {
            const opt = document.createElement('option');
            opt.value = JSON.stringify({ itemId: entry.itemId, source: entry.source });
            const srcLabel = entry.source === 'personal' ? 'Personal' : 'Group';
            opt.textContent = `${entry.def.icon || ''} ${entry.def.name}  ×${entry.qty}  [${srcLabel}]`;
            sel.appendChild(opt);
        }
        this.actionsEl.appendChild(sel);

        // Target selector — shown for healing/resurrection items
        const targetRow = document.createElement('div');
        targetRow.style.cssText = 'display:none;margin-bottom:6px;';
        const targetLabel = document.createElement('span');
        targetLabel.style.cssText = 'color:#aaa;font-size:12px;margin-right:6px;';
        targetLabel.textContent = 'Target:';
        const targetSel = document.createElement('select');
        targetSel.style.cssText = 'padding:4px 6px;background:#1a1a2e;color:#eee;border:1px solid #556;border-radius:4px;font-size:12px;flex:1;';
        targetRow.appendChild(targetLabel);
        targetRow.appendChild(targetSel);
        targetRow.style.display = 'flex';
        targetRow.style.alignItems = 'center';
        this.actionsEl.appendChild(targetRow);

        const _rebuildTargets = (def) => {
            targetSel.innerHTML = '';
            const needsDead = def && def.targetDead;
            const isParty = def && def.targetParty;
            if (isParty) {
                // Party-wide scrolls — no target needed
                targetRow.style.display = 'none';
                return;
            }
            targetRow.style.display = 'flex';
            const candidates = this.combat.party.filter(p => {
                if (p.isSummoned) return false;
                return needsDead ? p.health <= 0 : p.health > 0;
            });
            if (candidates.length === 0) {
                const opt = document.createElement('option');
                opt.value = '';
                opt.textContent = needsDead ? '(no fallen allies)' : '(no living allies)';
                opt.disabled = true;
                targetSel.appendChild(opt);
            }
            for (const p of candidates) {
                const opt = document.createElement('option');
                opt.value = p.id;
                const hpStr = needsDead ? '(down)' : `HP ${p.health}/${p.maxHealth}`;
                opt.textContent = `${p.name}  ${hpStr}`;
                if (p.id === member.id) opt.selected = true;
                targetSel.appendChild(opt);
            }
        };
        // Initially hide target row
        targetRow.style.display = 'none';

        // Confirm button — greyed until item selected
        const btnRow = document.createElement('div');
        btnRow.style.cssText = 'display:flex;gap:8px;margin-top:4px;';

        const confirmBtn = document.createElement('button');
        confirmBtn.className = 'combat-action-btn combat-special-btn';
        confirmBtn.textContent = '✅ Use Item';
        confirmBtn.disabled = true;
        confirmBtn.style.cssText += ';flex:1;opacity:0.45;cursor:not-allowed;';
        confirmBtn.title = 'Select an item first.';

        const cancelBtn = document.createElement('button');
        cancelBtn.className = 'combat-action-btn';
        cancelBtn.textContent = '✖ Cancel';
        cancelBtn.style.flex = '1';
        cancelBtn.addEventListener('click', () => this._refresh());

        sel.addEventListener('change', () => {
            const val = sel.value;
            if (!val) {
                confirmBtn.disabled = true;
                confirmBtn.style.opacity = '0.45';
                confirmBtn.style.cursor = 'not-allowed';
                targetRow.style.display = 'none';
                return;
            }
            const parsed = JSON.parse(val);
            const def = getItemDef(parsed.itemId);
            _rebuildTargets(def);
            confirmBtn.disabled = false;
            confirmBtn.style.opacity = '1';
            confirmBtn.style.cursor = 'pointer';
            confirmBtn.title = `Use ${def?.name || parsed.itemId}. Ends your turn.`;
        });

        confirmBtn.addEventListener('click', () => {
            if (confirmBtn.disabled) return;
            const val = sel.value;
            if (!val) return;
            const { itemId, source } = JSON.parse(val);
            const def = getItemDef(itemId);
            const targetId = (def && (def.targetDead || (!def.targetParty)))
                ? (targetSel.value || member.id)
                : undefined;
            this.combat.useItemInCombat(itemId, source, targetId);
        });

        btnRow.appendChild(confirmBtn);
        btnRow.appendChild(cancelBtn);
        this.actionsEl.appendChild(btnRow);

        if (usable.length === 0) {
            const empty = document.createElement('div');
            empty.style.cssText = 'color:#888;font-size:12px;margin-top:4px;';
            empty.textContent = 'No usable items in personal or group inventory.';
            this.actionsEl.appendChild(empty);
        }
    }

    _addModeToggleBtn() {
        const btn = document.createElement('button');
        btn.className = 'combat-action-btn combat-mode-btn';
        if (this._manualMode) {
            btn.textContent = '⏸️ Manual';
            btn.title = 'Manual Mode: each enemy/summon turn pauses for you to review. Press Space or click Continue to advance. Click to switch to Auto.';
            btn.style.borderColor = '#aa6622';
            btn.style.color = '#ddaa44';
        } else {
            btn.textContent = '▶ Auto';
            btn.title = 'Auto Mode: enemy and summon turns resolve instantly. Click to switch to Manual.';
            btn.style.borderColor = '#224466';
            btn.style.color = '#4488aa';
        }
        btn.addEventListener('click', () => {
            this._manualMode = !this._manualMode;
            this.combat.pauseAfterEachTurn = this._manualMode;
            // If we just turned off manual while mid-pause, resume immediately
            if (!this._manualMode && this.combat.phase === 'ENEMY_TURN') {
                this.combat.pauseAfterEachTurn = false;
                this.combat.resumeManualTurn();
            } else {
                this._refresh();
            }
        });
        this.actionsEl.appendChild(btn);
    }

    _updateTurnIndicators() {
        if (!this._active || !this.combat._initiativeOrder) return;
        const initOrder = this.combat._initiativeOrder;
        const initIdx   = this.combat._initTurnIdx;

        const setIndicator = (el, state) => {
            if (!el) return;
            let ind = el.querySelector('.turn-indicator');
            if (state === 'none') { if (ind) ind.remove(); return; }
            if (!ind) {
                ind = document.createElement('div');
                ind.className = 'turn-indicator';
                el.appendChild(ind);
            }
            if (state === 'done') {
                ind.textContent = '✓';
                ind.style.cssText = 'position:absolute;top:2px;right:3px;font-size:12px;color:#44dd44;font-weight:bold;z-index:5;pointer-events:none;text-shadow:0 0 4px rgba(0,180,0,0.5);';
            } else if (state === 'active') {
                ind.textContent = '▶';
                ind.style.cssText = 'position:absolute;top:2px;right:3px;font-size:10px;color:#ffcc00;font-weight:bold;z-index:5;pointer-events:none;animation:turn-active-pulse 0.5s infinite alternate;';
            }
        };

        // Party HUD cards
        for (const m of this.combat.party) {
            const hudCard = document.querySelector(`#party-hud [data-member-id="${m.id}"]`);
            if (!hudCard) continue;
            if (m.health <= 0) { setIndicator(hudCard, 'none'); continue; }
            const isActive = this.combat.phase === 'PLAYER_TURN' && this.combat.currentMember === m;
            const idx = initOrder.findIndex(s => s.ref === m);
            const hasDone = idx >= 0 && idx < initIdx;
            setIndicator(hudCard, isActive ? 'active' : hasDone ? 'done' : 'none');
        }

        // Enemy cards
        for (const enemy of this.combat.enemies) {
            if (enemy.health <= 0) continue;
            const card = this.enemyCards.querySelector(`[data-enemy-id="${enemy.id}"]`)
                || (this.charmedCardsEl && this.charmedCardsEl.querySelector(`[data-enemy-id="${enemy.id}"]`));
            if (!card) continue;
            const idx = initOrder.findIndex(s => s.ref === enemy);
            const hasDone = idx >= 0 && idx < initIdx;
            setIndicator(card, hasDone ? 'done' : 'none');
        }
    }

    // ────────────────────────────────────────────
    // Enemy target selection
    // ────────────────────────────────────────────

    _pickTarget(callback, { filter, prompt, allowCharmed = false } = {}) {
        this._ensureEnemyCards();
        const alive = this.combat.aliveEnemies;
        // By default, exclude charmed enemies from attack targeting
        const base  = allowCharmed ? alive : alive.filter(e => !(e.charmedRounds > 0));
        const valid = filter ? base.filter(filter) : base;

        if (valid.length === 0) {
            this._addBlockingNotice('No valid targets for this action.');
            return;
        }
        if (valid.length === 1) { callback(valid[0]); return; }

        this._selectingTarget = true;
        this._targetCallback = callback;
        this.turnInfo.textContent = prompt || 'Select a target...';

        // Replace action buttons with a single Cancel button so the player can back out
        this.actionsEl.innerHTML = '';
        const _cancelBtn = document.createElement('button');
        _cancelBtn.className = 'combat-action-btn';
        _cancelBtn.textContent = '← Cancel';
        _cancelBtn.title = 'Cancel target selection and return to your action choices.';
        _cancelBtn.addEventListener('click', () => this._refresh());
        this.actionsEl.appendChild(_cancelBtn);

        // Mark only valid targets as clickable; dim invalid ones (uses base, not alive, so charmed are also hidden)
        for (const e of base) {
            const card = this.enemyCards.querySelector(`[data-enemy-id="${e.id}"]`);
            if (!card) continue;
            if (valid.includes(e)) {
                card.classList.add('targetable');
            } else {
                card.style.opacity = '0.4';
                card.style.pointerEvents = 'none';
            }
        }
    }

    _clearTargetable() {
        this.enemyCards.querySelectorAll('.combat-enemy-card').forEach(c => {
            c.classList.remove('targetable');
            c.style.opacity = '';
            c.style.pointerEvents = '';
        });
    }

    // ────────────────────────────────────────────
    // Party target selection
    // ────────────────────────────────────────────

    _pickPartyTarget(callback, { filter, prompt, includeCharmed = false } = {}) {
        let candidates = this.combat.party.filter(pm => filter ? filter(pm) : pm.health > 0);

        // Optionally include wounded charmed enemies as heal targets (excludes undead/construct/elemental)
        if (includeCharmed) {
            const healableCharmed = (this.combat.enemies || []).filter(e => {
                if (!e || e.health <= 0 || e.health >= e.maxHealth) return false;
                if (!(e.charmedRounds > 0)) return false;
                const tags = ((ENEMY_TYPES[e.type] || {}).tags) || [];
                return !tags.includes('undead') && !tags.includes('construct') && !tags.includes('elemental');
            });
            candidates = candidates.concat(healableCharmed);
        }

        if (candidates.length === 0) {
            this._addBlockingNotice('No valid targets.');
            return;
        }

        // Sort most-injured first (lowest HP% at the top)
        candidates = candidates.slice().sort((a, b) => {
            const pctA = a.maxHealth > 0 ? a.health / a.maxHealth : 1;
            const pctB = b.maxHealth > 0 ? b.health / b.maxHealth : 1;
            return pctA - pctB;
        });

        this.actionsEl.innerHTML = '';
        this.turnInfo.textContent = prompt || 'Select a target...';

        for (const pm of candidates) {
            const btn = document.createElement('button');
            btn.className = 'combat-action-btn combat-heal-target-btn';
            const pct = Math.round((pm.health / pm.maxHealth) * 100);
            // For charmed enemies, use their monster icon; for party members use class icon
            const icon = pm.classDef ? pm.classDef.icon : '\ud83c\udfb5';
            // Enemy objects may not have .name set \u2014 fall back to ENEMY_TYPES display name or type key
            const displayName = pm.name || (pm.type && ENEMY_TYPES[pm.type] && ENEMY_TYPES[pm.type].name) || pm.type || 'Monster';
            btn.textContent = `${icon} ${displayName}  (${pm.health}/${pm.maxHealth} HP \u2014 ${pct}%)`;
            // Highlight critically wounded targets (< 25% HP) in red
            if (pm.maxHealth > 0 && pm.health / pm.maxHealth < 0.25) {
                btn.style.color = '#ff4444';
                btn.style.borderColor = '#ff4444';
            }
            btn.addEventListener('click', () => callback(pm));
            this.actionsEl.appendChild(btn);
        }

        const cancel = document.createElement('button');
        cancel.className = 'combat-action-btn';
        cancel.textContent = 'Cancel';
        cancel.addEventListener('click', () => this._refresh());
        this.actionsEl.appendChild(cancel);
    }

    _addBlockingNotice(msg) {
        this.actionsEl.innerHTML = '';
        const n = document.createElement('div');
        n.className = 'combat-end-msg';
        n.textContent = msg;
        this.actionsEl.appendChild(n);
        const back = document.createElement('button');
        back.className = 'combat-action-btn';
        back.textContent = 'Back';
        back.addEventListener('click', () => this._refresh());
        this.actionsEl.appendChild(back);
    }

    // ────────────────────────────────────────────
    // End screen
    // ────────────────────────────────────────────

    _showEndScreen() {
        this.actionsEl.innerHTML = '';

        const msg = document.createElement('div');
        msg.className = 'combat-end-msg';

        if (this.combat.phase === 'VICTORY') {
            msg.textContent = 'Victory!';
            msg.classList.add('victory');
            soundManager.playGold();
        } else if (this.combat.phase === 'DEFEAT') {
            msg.textContent = 'Defeated...';
            msg.classList.add('defeat');
        } else {
            msg.textContent = 'Escaped!';
            msg.classList.add('fled');
        }
        this.actionsEl.appendChild(msg);

        if (this.combat.phase === 'VICTORY') {
            const scrollWrap = document.createElement('div');
            scrollWrap.className = 'combat-loot-scroll';

            // XP + level-up summary
            if (this.combat.xpEarned > 0 || this.combat.levelUpLogs.length > 0) {
                const xpDiv = document.createElement('div');
                xpDiv.className = 'combat-loot-summary';
                if (this.combat.xpEarned > 0) {
                    const xpEl = document.createElement('div');
                    xpEl.className = 'loot-line loot-xp';
                    xpEl.textContent = `+${this.combat.xpEarned} XP (shared)`;
                    xpDiv.appendChild(xpEl);
                }
                for (const r of this.combat.levelUpLogs) {
                    const lvl = document.createElement('div');
                    lvl.className = 'loot-line loot-levelup';
                    lvl.textContent = `\u2B50 ${r.member} \u2192 Level ${r.toLevel}  (+${r.hpGain} HP / +${r.stGain} ST / +${r.mpGain} MP)`;
                    xpDiv.appendChild(lvl);
                }
                scrollWrap.appendChild(xpDiv);
            }

            if (this.combat.loot) {
                const lootDiv = document.createElement('div');
                lootDiv.className = 'combat-loot-summary';

                const loot = this.combat.loot;
                if (loot.gold > 0) {
                    const goldEl = document.createElement('div');
                    goldEl.className = 'loot-line loot-gold';
                    goldEl.textContent = `+${loot.gold} Gold`;
                    lootDiv.appendChild(goldEl);
                }
                for (const item of loot.items) {
                    const def = getItemDef(item.itemId);
                    const itemEl = document.createElement('div');
                    itemEl.className = 'loot-line';
                    const icon = def && def.icon ? def.icon + ' ' : '';
                    itemEl.textContent = item.quantity > 1
                        ? `${icon}${item.quantity}x ${def ? def.name : item.itemId}`
                        : `${icon}${def ? def.name : item.itemId}`;
                    lootDiv.appendChild(itemEl);
                }
                if (loot.gold === 0 && loot.items.length === 0) {
                    const noneEl = document.createElement('div');
                    noneEl.className = 'loot-line';
                    noneEl.textContent = 'No loot found.';
                    lootDiv.appendChild(noneEl);
                }
                scrollWrap.appendChild(lootDiv);
            }

            this.actionsEl.appendChild(scrollWrap);
        }

        const btn = document.createElement('button');
        btn.className = 'combat-action-btn combat-continue-btn';
        btn.textContent = this.combat.phase === 'DEFEAT' ? 'Game Over' : 'Continue';
        btn.addEventListener('click', () => {
            this.hide();
            if (this._onCombatEnd) this._onCombatEnd(this.combat.phase.toLowerCase());
        });
        this.actionsEl.appendChild(btn);
    }
}
