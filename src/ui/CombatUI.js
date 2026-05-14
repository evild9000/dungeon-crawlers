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
    ARTIFICER_HEAL_GOLEM_PCT,
    BARBARIAN_RAGE_STAMINA_COST,
    GOLEM_TIERS,
    WARRIOR_DEFEND_MODE_UNLOCK_LEVEL,
    MONK_QUIVERING_PALM_UNLOCK_LEVEL,
    MONK_QUIVERING_PALM_DURATION_BASE, MONK_QUIVERING_PALM_DURATION_PER_10LV,
    MONK_QUIVERING_PALM_STAMINA_MULT, MONK_QUIVERING_PALM_MANA_MULT,
    PALADIN_L20_UNLOCK_LEVEL,
    PALADIN_AOE_SMITE_MANA_MULT, PALADIN_AOE_SMITE_INSTAKILL_MULT,
    CLERIC_MASS_REGEN_UNLOCK_LEVEL, CLERIC_MASS_REGEN_MANA_COST,
    CLERIC_MASS_REGEN_BASE_PCT, CLERIC_MASS_REGEN_PER_3_LEVELS,
    CLERIC_MASS_REGEN_DURATION_PER_4LV,
    CLERIC_MASS_REVIVE_UNLOCK_LEVEL, CLERIC_MASS_REVIVE_MANA_COST,
    CLERIC_MASS_REVIVE_HEAL_BASE, CLERIC_MASS_REVIVE_HEAL_PER_3LV,
    CLERIC_MASS_REVIVE_COUNT_DIVISOR,
    CLERIC_CLEANSE_UNLOCK_LEVEL, CLERIC_CLEANSE_MANA_PER_STATE,
    BARD_CHARM_UNLOCK_LEVEL, BARD_CHARM_MANA_COST,
    BARD_CHARM_BASE_CHANCE, BARD_CHARM_CHANCE_PER_2_LV,
    BARD_CHARM_DURATION_DIVISOR, BARD_CHARM_IMMUNE_TAGS,
    BARD_RALLYING_MELODY_UNLOCK_LEVEL, BARD_RALLYING_MELODY_MANA_COST,
    BARD_RALLYING_MELODY_RESTORE_FRACTION,
    RANGER_EXPLOSIVE_ARROW_UNLOCK_LEVEL, RANGER_EXPLOSIVE_ARROW_STAMINA_MULT,
    RANGER_EXPLOSIVE_ARROW_DAMAGE_MULT,
    ROGUE_BACKSTAB_BLEED_UNLOCK_LEVEL, ROGUE_BACKSTAB_BLEED_FRAC,
    ROGUE_BACKSTAB_BLEED_DURATION_DIVISOR,
    ROGUE_TRAP_UNLOCK_LEVEL, ROGUE_TRAP_DOT_FRACTION, ROGUE_TRAP_DOT_ROUNDS,
    ROGUE_EVASION_STAMINA_COST,
    MAGE_MIRROR_IMAGE_UNLOCK_LEVEL, MAGE_MIRROR_IMAGE_MANA_COST, MAGE_MIRROR_IMAGE_COUNT_DIVISOR,
    NECRO_LICH_FORM_UNLOCK_LEVEL, NECRO_LICH_FORM_MANA_PER_ROUND,
    NECRO_LICH_REVIVE_ROUNDS,
    DRUID_COMMUNE_UNLOCK_LEVEL, DRUID_COMMUNE_FAE_TOKENS_NEEDED,
    DRUID_SHAMBLING_MOUND_UNLOCK_LEVEL, DRUID_SHAMBLING_MOUND_MANA_COST,
    NECRO_DEMI_LICH_UNLOCK_LEVEL, NECRO_DEMI_LICH_MANA_COST,
    RANGER_TOTEM_UNLOCK_LEVEL, RANGER_TOTEM_MANA_PER_ROUND,
    RANGER_TOTEM_DURATION_DIVISOR, RANGER_BEAR_TOTEM_DEFENSE_DIVISOR,
    RANGER_EAGLE_TOTEM_DAMAGE_PER_LEVEL, RANGER_EAGLE_TOTEM_DEFLECT_PER_LEVEL,
    MONK_AVATAR_UNLOCK_LEVEL, MONK_AVATAR_MANA_PER_ROUND,
    MONK_AVATAR_HP_REGEN, MONK_AVATAR_CLEANSE_BASE, MONK_AVATAR_CLEANSE_PER_LEVEL,
    MONK_AVATAR_DOT_DURATION_DIVISOR,
} from '../utils/constants.js';
import { generateEnemySprite } from '../utils/SpriteGenerator.js';
import { getItemDef } from '../items/ItemTypes.js';
import { soundManager } from '../utils/SoundManager.js';
import { BEAST_TYPES, GOLEM_PRESETS, getSummonPreset } from '../entities/Summons.js';

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
    }

    show(onEnd) {
        this._onCombatEnd = onEnd;
        this._active = true;
        this._prevMemberHealth = {}; // track previous health to detect KO events
        this.overlay.style.display = 'flex';
        this._buildEnemyCards();
        this._refresh();

        for (const e of this.combat.enemies) {
            soundManager.playMonsterSound(e.type);
        }
    }

    hide() {
        this._active = false;
        this._selectingTarget = false;
        this.overlay.style.display = 'none';
    }

    _refresh() {
        if (!this._active) return;

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

        // Mega bosses get a gold/crimson border; normal bosses get purple.
        if (enemy.isMegaBoss) {
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
            name.style.color = enemy.isMegaBoss ? '#ff8888' : '#c39bd3';
            if (enemy.isMegaBoss) name.style.fontWeight = 'bold';
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

            card.classList.toggle('defeated', enemy.health <= 0);

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
                if (ent) mkB('🌿', 'Entangled', 'rgba(30,130,30,0.9)',
                    'Entangled: -' + (ent.defenseBonus||0) + ' def, -' + (ent.damageBonus||0) + ' dmg — ' + ent.rounds + ' rds left');
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
                        tip: (fx) => 'Acid: ' + (fx.damage||0) + ' dmg/round, -' + (fx.defenseBonus||0) + ' def — ' + (fx.permanent ? 'permanent' : fx.rounds + ' rds left')
                    },
                    poison: {
                        icon: '🐢', label: 'Poison', bg: 'rgba(100,140,0,0.9)',
                        tip: (fx) => 'Poison: ' + (fx.damage||0) + ' dmg/round — ' + fx.rounds + ' rds left'
                    },
                    poison_weapon: {
                        icon: '🐍', label: 'Poisoned', bg: 'rgba(100,0,170,0.9)',
                        tip: (fx) => 'Venom: ' + (fx.damage||0) + ' dmg/round, -' + Math.abs(fx.damageBonus||0) + ' dmg dealt — ' + (fx.permanent ? 'permanent' : fx.rounds + ' rds left')
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
                    drone_binding: {
                        icon: '⚙️', label: 'Bound', bg: 'rgba(80,80,200,0.9)',
                        tip: (fx) => 'Drone Binding: -' + Math.abs(fx.damageBonus||0) + ' atk, -' + Math.abs(fx.defenseBonus||0) + ' def — ' + fx.rounds + ' rds left'
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
                const fr = efx.find(x => x && x.type === 'ghost_fear');
                if (fr) mkB('😨', 'Feared', 'rgba(80,0,100,0.9)',
                    'Ghost Fear: -3 attack, -3 defense (lasts entire combat)');
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
                    mkB('✋', `QP:${source}`, 'rgba(140,30,100,0.9)',
                        `Quivering Palm (${source}): ${(qp.damage || 0)} internal dmg/round — Level ${(qp.doublings || 0)}/10 doublings — ${qp.rounds} rds left`);
                }

                // Fae hold badge
                const fh = efx.find(x => x && x.type === 'fae_hold' && x.rounds > 0);
                if (fh) mkB('\u{1F9DA}', 'Held ' + fh.rounds + 'rd', 'rgba(60,200,60,0.9)',
                    'Faerie Hold: stunned for ' + fh.rounds + ' round(s) — immune to this turn’s action.');
                // Charm status badge (shown in the charmed panel; keep a small indicator too)
                if (enemy.charmedRounds > 0)
                    mkB('🎵', 'CHARMED ' + enemy.charmedRounds + 'rd', 'rgba(0,160,80,0.95)',
                        'Charmed by Bard! Fighting for your party. ' + enemy.charmedRounds + ' round(s) remaining.');
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
                if (enemy.isMegaBoss) {
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
            this.turnInfo.textContent =
                this.combat.phase === 'ENEMY_TURN' ? 'Enemies attacking...' : '';
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

        const mBonus = m.getClassDamageBonus('melee');
        const rBonus = m.getClassDamageBonus('ranged');
        const gBonus = m.getClassDamageBonus('magic');

        // Warrior L20 Defend Mode blocks all attacks this turn
        const inDefendMode = m.classId === 'warrior' && !!m.isDefendMode;

        // ── Melee (gated by row)
        const canMelee = this.combat.canMelee(m) && !inDefendMode;
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
        const rangedExhausted = m.stamina < RANGED_STAMINA_COST || inDefendMode;
        const rangedWeaponBonus = m.getWeaponBonus('ranged');
        const rangedTotalBonus = rangedWeaponBonus + rBonus;
        const isArtificer = m.classId === 'artificer';
        const splashCount = SCATTER_SPLASH_BASE + Math.floor(m.level / SCATTER_SPLASH_EVERY);
        let rangedLabel = isArtificer
            ? `\u{1F4A3} Scatter Shot (-${RANGED_STAMINA_COST} ST, 1+${splashCount})`
            : `Ranged (-${RANGED_STAMINA_COST} ST)`;
        if (rangedTotalBonus > 0) rangedLabel += ` +${rangedTotalBonus}`;
        if (rangedExhausted) rangedLabel += ' [HALF]';
        const rangedBtn = this._addBtn(rangedLabel, !inDefendMode, () => {
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
        const magicExhausted = m.mana < magicManaCost || inDefendMode;
        const magicWeaponBonus = m.getWeaponBonus('magic');
        const magicTotalBonus = magicWeaponBonus + gBonus;
        let magicLabel = `Magic (-${magicManaCost} MP)`;
        if (magicTotalBonus > 0) magicLabel += ` +${magicTotalBonus}`;
        if (magicExhausted) magicLabel += ' [HALF]';
        const magicBtn = this._addBtn(magicLabel, !inDefendMode, () => {
            soundManager.playMagic();
            this.combat.magicAttack();
        });
        const magicStunPct = m.getMagicStunBonus() * 100;
        const magicTip = [
            `Magic attack. Costs ${magicManaCost} mana.`,
            `Hits ALL enemies.`,
        ];
        if (gBonus > 0) magicTip.push(`Damage bonus (class/species/level): +${gBonus}`);
        if (magicStunPct > 0) magicTip.push(`Mage: ${magicStunPct.toFixed(0)}% chance to stun foes with magic.`);
        if (m.classId === 'mage') magicTip.push(`Mage: ignores ${Math.min(100, m.level || 1)}% enemy defense on magic/AoE hits (level%).`);
        if (m.classId === 'necromancer') {
            const drainAmt = NECRO_LIFE_DRAIN_AMOUNT + m.getDrainBonus();
            magicTip.push(`Necromancer: ${Math.round(NECRO_LIFE_DRAIN_CHANCE * 100)}% to drain ${drainAmt} HP (self + own undead).`);
        }
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
        }

        // ── Class specials
        if (m.classId === 'rogue') {
            const cost = MELEE_STAMINA_COST * BACKSTAB_STAMINA_MULT;
            const exhausted = m.stamina < cost;
            const label = `\u{1F5E1}\uFE0F Backstab (-${cost} ST)${exhausted ? ' [HALF]' : ''}`;
            const btn = this._addBtn(label, true, () => {
                soundManager.playMelee();
                this._pickTarget(e => this.combat.backstab(e));
            });
            btn.classList.add('combat-special-btn');
            const instakill = (BACKSTAB_INSTAKILL_CHANCE + m.getInstakillBonus()) * 100;
            const bonusPct = Math.round(BACKSTAB_DAMAGE_PER_LEVEL * m.level * 100);
            btn.title = [
                'Rogue special: Backstab. (Works from any row.)',
                `Costs ${cost} stamina (3\u00D7 melee cost).`,
                `Deals ${BACKSTAB_DAMAGE_MULT}\u00D7 melee damage, then +${bonusPct}% (10% per rogue level).`,
                `${instakill.toFixed(0)}% chance for an INSTANT KILL (not vs. Bosses or Mega Bosses).`,
                'Rogues can also spot and disarm dungeon traps while exploring.',
                m.level >= ROGUE_TRAP_UNLOCK_LEVEL
                    ? `L${ROGUE_TRAP_UNLOCK_LEVEL}: successful disarms recover Captured Traps; magic/AoE evasion chance ${m.level}% for ${ROGUE_EVASION_STAMINA_COST} stamina.`
                    : `L${ROGUE_TRAP_UNLOCK_LEVEL}: recover traps and evade magic/AoE attacks.`,
                m.level >= ROGUE_BACKSTAB_BLEED_UNLOCK_LEVEL
                    ? `L${ROGUE_BACKSTAB_BLEED_UNLOCK_LEVEL}+: Backstab Bleed — applies ${Math.round(ROGUE_BACKSTAB_BLEED_FRAC*100)}% bleed DoT for ${Math.floor(m.level/ROGUE_BACKSTAB_BLEED_DURATION_DIVISOR)} rounds (immune: undead, construct, elemental, incorporeal).`
                    : `L${ROGUE_BACKSTAB_BLEED_UNLOCK_LEVEL}: Backstab Bleed unlocks — every backstab will apply a stacking bleed DoT.`,
            ].join('\n');

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
        }

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
                rageDisabled ? 'Already used this combat.' : 'Lasts until end of combat.',
            ].filter(Boolean).join('\n');
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
                'Deals 2× magic attack damage to ALL undead enemies.',
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
            const hasFallenAllies    = (this.combat.party || []).some(pm => !pm.isSummoned && pm.health <= 0);
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
            const allFavored = m.getAllFavoredEnemies();
            xaBtn.title = [
                'Ranger L20 Special: Explosive Arrow.',
                `Costs ${xaCost} stamina (3× normal ranged).`,
                'Fires an explosive arrow that hits ALL hostile enemies.',
                `Each enemy takes ${Math.round(RANGER_EXPLOSIVE_ARROW_DAMAGE_MULT * 100)}% of normal post-defense ranged damage.`,
                'Half normal crit chance per target.',
                allFavored.length > 0
                    ? `Half normal instakill chance vs favored enemies: ${allFavored.join(', ')}. Bosses/mega-bosses are immune to instant death; triggered procs deal x4 ranged damage instead.`
                    : `No favored enemies set — choose them in the character screen (K).`,
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
                `Deals magic damage (+${scale} bonus) to each enemy.`,
                '50% chance to stun each enemy for 1 round.',
                `Bonus scales +1 per 5 bard levels (currently scale: ${scale}).`,
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
            const canMound = moundUnlocked && m.mana >= DRUID_SHAMBLING_MOUND_MANA_COST;
            const moundLabel = moundUnlocked
                ? `🪴 Summon Shambling Mound (-${DRUID_SHAMBLING_MOUND_MANA_COST} MP)`
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
                'After warrior intercepts, each mound can intercept hits aimed at its druid at 50% + druid level/3 percent.',
                !moundUnlocked ? `Requires druid level ${DRUID_SHAMBLING_MOUND_UNLOCK_LEVEL}.` : '',
                moundUnlocked && !canMound ? 'Not enough mana.' : '',
            ].filter(Boolean).join('\n');

            // ── Commune (L20) — summon Faerie Queen at 3 fae tokens
            const communeUnlocked = m.level >= DRUID_COMMUNE_UNLOCK_LEVEL;
            const tokens          = m.faeTokens || 0;
            const communeLabel    = communeUnlocked
                ? `\u{1F9DA} Commune (✨${tokens}/${DRUID_COMMUNE_FAE_TOKENS_NEEDED} fae tokens)`
                : `\u{1F9DA} Commune (L${DRUID_COMMUNE_UNLOCK_LEVEL})`;
            // Can always press the button if unlocked (gains a token, or summons at threshold)
            const communeCanAct   = communeUnlocked;
            const communeBtn = this._addBtn(communeLabel, communeCanAct, () => this.combat.druidCommune());
            communeBtn.classList.add('combat-special-btn');
            if (tokens >= DRUID_COMMUNE_FAE_TOKENS_NEEDED - 1 && communeUnlocked) {
                communeBtn.style.boxShadow = '0 0 8px #ffdd44, 0 0 16px #ffaa0066';
            }
            communeBtn.title = [
                `Druid L${DRUID_COMMUNE_UNLOCK_LEVEL}: Commune with the Fae (free action).`,
                `Each use grants 1 fae token. At ${DRUID_COMMUNE_FAE_TOKENS_NEEDED} tokens the Faerie Queen is summoned.`,
                'Faerie Queen: 2× druid HP, 30+level defense. Uses Wrath of Nature (magic attack, 33%+ chance to Hold enemies for 2 rounds).',
                'Applies fae poison DoT and has 50% magic/AoE damage resistance.',
                'Tokens carry over between rounds. Summoning consumes all tokens.',
                !communeUnlocked ? `Requires druid level ${DRUID_COMMUNE_UNLOCK_LEVEL}.` : '',
                communeUnlocked && tokens >= DRUID_COMMUNE_FAE_TOKENS_NEEDED
                    ? '✨ READY — next use will summon the Faerie Queen!' : '',
            ].filter(Boolean).join('\n');
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
            // Determine whether the tier reagent is in stock for any living golem.
            const inv = this.combat.inventory;
            const canPayAny = !!inv && myGolems.some(g => {
                const tier = GOLEM_TIERS.find(t => t.id === g.summonStats.tierId);
                const rTier = (tier && tier.reagentTier) || 'common';
                return inv.hasItem(`reagent_${rTier}`, 1);
            });
            const canHeal = hasLive && needsHeal && canPayAny;
            const label = `\u{1F527} Heal Golem (1 reagent)`;
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
                `Consumes 1 reagent matching the golem's tier (common / uncommon / rare).`,
                `Restores ${healPct}% of the golem's max HP.`,
                'Only works on your own golem.',
                !hasLive ? 'No living golem summoned.' : '',
                hasLive && !needsHeal ? 'Your golem is already at full HP.' : '',
                hasLive && needsHeal && !canPayAny ? 'No matching reagent in inventory.' : '',
                'Out of combat, use the Crafting menu (K) to forge, repair, or dismiss a golem.',
            ].filter(Boolean).join('\n');
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

        // ── Defend
        const defendBtn = this._addBtn('Defend', true, () => this.combat.defend());
        defendBtn.title = 'Reduce incoming damage by half this turn.';

        // ── Flee
        const fleeBtn = this._addBtn('Flee', true, () => this.combat.flee());
        fleeBtn.title = '50% chance to escape combat.';
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

    _addBtn(label, enabled, onClick) {
        const btn = document.createElement('button');
        btn.className = 'combat-action-btn';
        btn.textContent = label;
        btn.disabled = !enabled;
        if (enabled) btn.addEventListener('click', onClick);
        this.actionsEl.appendChild(btn);
        return btn;
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
                this.actionsEl.appendChild(xpDiv);
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
                this.actionsEl.appendChild(lootDiv);
            }
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
