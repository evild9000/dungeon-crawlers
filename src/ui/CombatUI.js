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
    NECRO_SUMMON_MANA_COST, NECRO_LIFE_DRAIN_CHANCE, NECRO_LIFE_DRAIN_AMOUNT,
    MONK_MELEE_MANA_COST, MONK_WHIRLWIND_CHANCE,
    MONK_DODGE_CHANCE, MONK_DODGE_STAMINA_COST, MONK_DODGE_MANA_COST,
    RANGER_SUMMON_MANA_COST,
    BARD_SONG_MANA_COST, BARD_SONG_BASE_BONUS,
    DRUID_ENTANGLE_MANA_COST, DRUID_ENTANGLE_BASE_DEBUFF, DRUID_ENTANGLE_CHANCE,
    DRUID_SUMMON_MANA_COST,
    SCATTER_SPLASH_BASE, SCATTER_SPLASH_EVERY, SCATTER_SPLASH_FRACTION,
    PALADIN_SMITE_MANA_COST,
    PALADIN_SMITE_INSTAKILL_BASE, PALADIN_SMITE_INSTAKILL_PER_LEVEL,
    PALADIN_HEAL_MANA_COST, PALADIN_HEAL_PERCENT,
    ARTIFICER_HEAL_GOLEM_PCT,
    GOLEM_TIERS,
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

        this.overlay    = document.getElementById('combat-overlay');
        this.enemyCards = document.getElementById('combat-enemies');
        this.logEl      = document.getElementById('combat-log');
        this.turnInfo   = document.getElementById('combat-turn-info');
        this.actionsEl  = document.getElementById('combat-actions');
    }

    show(onEnd) {
        this._onCombatEnd = onEnd;
        this._active = true;
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

        for (const enemy of this.combat.enemies) {
            const card = document.createElement('div');
            card.className = 'combat-enemy-card';
            card.dataset.enemyId = enemy.id;

            const canvas = generateEnemySprite(enemy.type, enemy.seed);
            const img = document.createElement('img');
            img.className = 'combat-enemy-sprite';
            img.src = canvas.toDataURL();
            card.appendChild(img);

            const name = document.createElement('div');
            name.className = 'combat-enemy-name';
            const base = (ENEMY_TYPES[enemy.type] || { name: 'Enemy' }).name;
            name.textContent = enemy.level > 1 ? `${base} L${enemy.level}` : base;
            if (enemy.defense) {
                name.title = `Defense ${enemy.defense} (reduces incoming damage)`;
            }
            card.appendChild(name);

            card.appendChild(this._bar('combat-bar-health'));
            card.appendChild(this._bar('combat-bar-stamina'));
            card.appendChild(this._bar('combat-bar-mana'));

            const stunBadge = document.createElement('div');
            stunBadge.className = 'combat-stun-badge';
            stunBadge.textContent = '\u26A1 Stunned';
            stunBadge.style.display = 'none';
            card.appendChild(stunBadge);

            card.addEventListener('click', () => {
                if (!this._selectingTarget || enemy.health <= 0) return;
                this._selectingTarget = false;
                this._clearTargetable();
                if (this._targetCallback) this._targetCallback(enemy);
            });

            this.enemyCards.appendChild(card);
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
        for (const enemy of this.combat.enemies) {
            const card = this.enemyCards.querySelector(
                `[data-enemy-id="${enemy.id}"]`,
            );
            if (!card) continue;

            const fills = card.querySelectorAll('.combat-stat-fill');
            fills[0].style.width = `${Math.max(0, (enemy.health / enemy.maxHealth) * 100)}%`;
            fills[1].style.width = `${Math.max(0, (enemy.stamina / enemy.maxStamina) * 100)}%`;
            fills[2].style.width = `${enemy.maxMana > 0 ? Math.max(0, (enemy.mana / enemy.maxMana) * 100) : 0}%`;

            card.classList.toggle('defeated', enemy.health <= 0);

            const stunBadge = card.querySelector('.combat-stun-badge');
            if (stunBadge) stunBadge.style.display = enemy.stunned ? 'block' : 'none';
        }
    }

    // ────────────────────────────────────────────
    // Combat log
    // ────────────────────────────────────────────

    _updateLog() {
        this.logEl.innerHTML = '';
        const recent = this.combat.log.slice(-14);
        for (const msg of recent) {
            const p = document.createElement('p');
            p.textContent = msg;
            if (msg.includes('CRITICAL'))           p.classList.add('log-crit');
            else if (msg.includes('STUNNED') ||
                     msg.includes('is stunned'))    p.classList.add('log-stun');
            else if (msg.includes('shield blocks')) p.classList.add('log-shield');
            else if (msg.includes('BACKSTAB'))      p.classList.add('log-crit');
            else if (msg.includes('Whirlwind'))     p.classList.add('log-crit');
            else if (msg.includes('dodges'))        p.classList.add('log-shield');
            else if (msg.includes('heals'))         p.classList.add('log-heal');
            else if (msg.includes('Life drain'))    p.classList.add('log-heal');
            else if (msg.includes('summons'))       p.classList.add('log-summon');
            else if (msg.includes('reached level')) p.classList.add('log-levelup');
            else if (msg.includes('XP'))            p.classList.add('log-levelup');
            this.logEl.appendChild(p);
        }
        this.logEl.scrollTop = this.logEl.scrollHeight;
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

        // ── Melee (gated by row)
        const canMelee = this.combat.canMelee(m);
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
        if (isMonk) {
            const ww = (MONK_WHIRLWIND_CHANCE + m.getWhirlwindBonus()) * 100;
            meleeTipParts.push(`Whirlwind: ${ww.toFixed(0)}% chance to also hit each other enemy.`);
            const dodgePct = m.getEffectiveDodgePct() * 100;
            meleeTipParts.push(`Dodge: ${dodgePct.toFixed(0)}% chance to avoid melee hits (caps 95%). All incoming damage is reduced by this same %.`);
        }
        if (!canMelee) meleeTipParts.push('Cannot melee from back row (rogues only).');
        meleeBtn.title = meleeTipParts.join('\n');

        // ── Ranged (Artificers fire Scatter Shot instead of a normal single-target shot.)
        const rangedExhausted = m.stamina < RANGED_STAMINA_COST;
        const rangedWeaponBonus = m.getWeaponBonus('ranged');
        const rangedTotalBonus = rangedWeaponBonus + rBonus;
        const isArtificer = m.classId === 'artificer';
        const splashCount = SCATTER_SPLASH_BASE + Math.floor(m.level / SCATTER_SPLASH_EVERY);
        let rangedLabel = isArtificer
            ? `\u{1F4A3} Scatter Shot (-${RANGED_STAMINA_COST} ST, 1+${splashCount})`
            : `Ranged (-${RANGED_STAMINA_COST} ST)`;
        if (rangedTotalBonus > 0) rangedLabel += ` +${rangedTotalBonus}`;
        if (rangedExhausted) rangedLabel += ' [HALF]';
        const rangedBtn = this._addBtn(rangedLabel, true, () => {
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
                `Primary target takes a full ranged hit; ${splashCount} splash shot${splashCount === 1 ? '' : 's'} hit other enemies for ${Math.round(SCATTER_SPLASH_FRACTION * 100)}% damage.`,
                `Splashes gain +1 every ${SCATTER_SPLASH_EVERY} artificer levels.`,
                `${crit.toFixed(0)}% crit chance on each shot.`,
            ]
            : [
                `Ranged attack. Costs ${RANGED_STAMINA_COST} stamina.`,
                `${crit.toFixed(0)}% chance for critical hit (double damage).`,
            ];
        if (rBonus > 0) rangedTip.push(`Damage bonus (class/species/level): +${rBonus}`);
        rangedBtn.title = rangedTip.join('\n');

        // ── Magic
        const magicExhausted = m.mana < MAGIC_MANA_COST;
        const magicWeaponBonus = m.getWeaponBonus('magic');
        const magicTotalBonus = magicWeaponBonus + gBonus;
        let magicLabel = `Magic (-${MAGIC_MANA_COST} MP)`;
        if (magicTotalBonus > 0) magicLabel += ` +${magicTotalBonus}`;
        if (magicExhausted) magicLabel += ' [HALF]';
        const magicBtn = this._addBtn(magicLabel, true, () => {
            soundManager.playMagic();
            this.combat.magicAttack();
        });
        const magicStunPct = m.getMagicStunBonus() * 100;
        const magicTip = [
            `Magic attack. Costs ${MAGIC_MANA_COST} mana.`,
            `Hits ALL enemies.`,
        ];
        if (gBonus > 0) magicTip.push(`Damage bonus (class/species/level): +${gBonus}`);
        if (magicStunPct > 0) magicTip.push(`Mage: ${magicStunPct.toFixed(0)}% chance to stun foes with magic.`);
        if (m.classId === 'necromancer') {
            const drainAmt = NECRO_LIFE_DRAIN_AMOUNT + m.getDrainBonus();
            magicTip.push(`Necromancer: ${Math.round(NECRO_LIFE_DRAIN_CHANCE * 100)}% to drain ${drainAmt} HP (self + own undead).`);
        }
        magicBtn.title = magicTip.join('\n');

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
                `${instakill.toFixed(0)}% chance for an INSTANT KILL.`,
                'Rogues can also spot and disarm dungeon traps while exploring.',
            ].join('\n');
        }

        if (m.classId === 'cleric') {
            const can = m.mana >= CLERIC_HEAL_MANA_COST;
            const label = `\u2728 Heal (-${CLERIC_HEAL_MANA_COST} MP)`;
            const btn = this._addBtn(label, can, () => {
                this._pickPartyTarget(t => this.combat.clericHeal(t), {
                    filter: (pm) => pm.health > 0 && pm.health < pm.maxHealth && (!pm.isSummoned || pm.canBeHealed),
                    prompt: 'Heal whom?',
                });
            });
            btn.classList.add('combat-special-btn');
            const healPct = (CLERIC_HEAL_PERCENT + m.getHealPercentBonus()) * 100;
            btn.title = [
                'Cleric special: Heal.',
                `Costs ${CLERIC_HEAL_MANA_COST} mana.`,
                `Restores ${healPct.toFixed(0)}% of target's max HP.`,
                'Heals ranger summons; cannot heal undead (those use necromancer life drain).',
                !can ? 'Not enough mana.' : '',
            ].filter(Boolean).join('\n');

            // Phase 10 — Cleric Revive, unlocked at level 3.
            const hasDead = (this.combat.party || []).some(
                pm => !pm.isSummoned && pm.health <= 0,
            );
            const reviveUnlocked = m.level >= CLERIC_REVIVE_MIN_LEVEL;
            const canRevive = reviveUnlocked && m.mana >= CLERIC_REVIVE_MANA_COST && hasDead;
            const reviveLabel = reviveUnlocked
                ? `\u{1F54A}\uFE0F Revive (-${CLERIC_REVIVE_MANA_COST} MP)`
                : `\u{1F54A}\uFE0F Revive (L${CLERIC_REVIVE_MIN_LEVEL})`;
            const reviveBtn = this._addBtn(reviveLabel, canRevive, () => {
                this._pickPartyTarget(t => this.combat.clericRevive(t), {
                    filter: (pm) => !pm.isSummoned && pm.health <= 0,
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
        }

        if (m.classId === 'necromancer') {
            const can = m.mana >= NECRO_SUMMON_MANA_COST;
            const label = `\u{1F480} Summon Undead (-${NECRO_SUMMON_MANA_COST} MP)`;
            const btn = this._addBtn(label, can, () => this._showUndeadPicker(m));
            btn.classList.add('combat-special-btn');
            const tiers = this.combat.getAvailableNecroTiers(m.level);
            btn.title = [
                'Necromancer special: Summon Undead.',
                `Costs ${NECRO_SUMMON_MANA_COST} mana.`,
                `Unlocked tiers at level ${m.level}: ${tiers.map(t => t.name).join(', ')}.`,
                'Undead cannot be healed by clerics — use life-drain instead.',
                'Higher tiers = +50% HP, +2 damage, +1 defense per step.',
                !can ? 'Not enough mana.' : '',
            ].filter(Boolean).join('\n');
        }

        if (m.classId === 'ranger' || m.classId === 'druid') {
            const summonCost = m.classId === 'druid' ? DRUID_SUMMON_MANA_COST : RANGER_SUMMON_MANA_COST;
            const can = m.mana >= summonCost;
            const label = `\u{1F3F9} Summon Beast (-${summonCost} MP)`;
            const btn = this._addBtn(label, can, () => this._showBeastPicker(m));
            btn.classList.add('combat-special-btn');
            btn.title = [
                `${m.classDef.name} special: Summon Woodland Beast.`,
                `Costs ${summonCost} mana.`,
                'Bear (melee, high HP, stun chance), Eagle (ranged crits), Pixie (AoE magic, dodges).',
                m.classId === 'ranger'
                    ? 'Bonus chances scale with your ranged crit chance.'
                    : 'Beasts come from a druid\'s bond with wild creatures.',
                'Beasts CAN be healed by clerics.',
                !can ? 'Not enough mana.' : '',
            ].filter(Boolean).join('\n');
        }

        // Bard: Sing an inspiring song (once per combat)
        if (m.classId === 'bard') {
            const can = m.mana >= BARD_SONG_MANA_COST && !m.usedBardSong;
            const bonus = BARD_SONG_BASE_BONUS + Math.floor(Math.max(0, m.level - 1) / 2);
            const label = m.usedBardSong
                ? '\u{1F3B6} Song (already sung)'
                : `\u{1F3B6} Sing Song (-${BARD_SONG_MANA_COST} MP, +${bonus})`;
            const btn = this._addBtn(label, can, () => this.combat.bardSong());
            btn.classList.add('combat-special-btn');
            btn.title = [
                'Bard special: Inspiring Song.',
                `Costs ${BARD_SONG_MANA_COST} mana. One use per combat.`,
                `Grants the whole party +${bonus} defense and +${bonus} melee/ranged/magic damage for the rest of the fight.`,
                'Bonus rises by +1 every other level beyond L1 (L3=+3, L5=+4\u2026).',
                m.usedBardSong ? 'You have already sung this battle.' : '',
                !can && !m.usedBardSong ? 'Not enough mana.' : '',
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
                !can ? 'Not enough mana.' : '',
            ].filter(Boolean).join('\n');
        }

        // Paladin: Smite + Lay On Hands
        if (m.classId === 'paladin') {
            // ── Smite (targets an enemy)
            const smiteCan = m.mana >= PALADIN_SMITE_MANA_COST && canMelee;
            let smiteLabel = `\u2728 Smite (-${PALADIN_SMITE_MANA_COST} MP)`;
            if (!canMelee) smiteLabel += ' [BACK ROW]';
            const smiteBtn = this._addBtn(smiteLabel, smiteCan, () => {
                soundManager.playMelee();
                this._pickTarget(e => this.combat.paladinSmite(e));
            });
            smiteBtn.classList.add('combat-special-btn');
            const baseKill  = PALADIN_SMITE_INSTAKILL_BASE * 100;
            const perLvlKill = PALADIN_SMITE_INSTAKILL_PER_LEVEL * 100;
            const curKill = Math.min(100, PALADIN_SMITE_INSTAKILL_BASE * 100 + PALADIN_SMITE_INSTAKILL_PER_LEVEL * 100 * m.level);
            smiteBtn.title = [
                'Paladin special: Smite.',
                `Costs ${PALADIN_SMITE_MANA_COST} mana. Front-row only (armor-ignoring melee strike).`,
                `Vs undead or demon foes: +${2 * m.level} holy damage (2 per paladin level) AND ${curKill.toFixed(0)}% chance to instantly purge (${baseKill}% base +${perLvlKill}%/level).`,
                'Against mortal foes it is still a full melee hit.',
                !canMelee ? 'Cannot Smite from back row.' : '',
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
            btn.textContent = `${tier.icon} ${tier.name}`;
            btn.title = `Summon a ${tier.name} (tier ${idx + 1}).`;
            btn.addEventListener('click', () => this.combat.summonUndead(idx));
            this.actionsEl.appendChild(btn);
        });
        const cancel = document.createElement('button');
        cancel.className = 'combat-action-btn';
        cancel.textContent = 'Cancel';
        cancel.addEventListener('click', () => this._refresh());
        this.actionsEl.appendChild(cancel);
    }

    _showBeastPicker() {
        this.actionsEl.innerHTML = '';
        this.turnInfo.textContent = 'Summon which beast?';
        for (const [id, preset] of Object.entries(BEAST_TYPES)) {
            const btn = document.createElement('button');
            btn.className = 'combat-action-btn combat-special-btn';
            btn.textContent = `${preset.icon} ${preset.name}`;
            btn.title = preset.description;
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

    _pickTarget(callback) {
        const alive = this.combat.aliveEnemies;
        if (alive.length === 1) { callback(alive[0]); return; }

        this._selectingTarget = true;
        this._targetCallback = callback;
        this.turnInfo.textContent = 'Select a target...';

        for (const e of alive) {
            const card = this.enemyCards.querySelector(`[data-enemy-id="${e.id}"]`);
            if (card) card.classList.add('targetable');
        }
    }

    _clearTargetable() {
        this.enemyCards.querySelectorAll('.combat-enemy-card')
            .forEach(c => c.classList.remove('targetable'));
    }

    // ────────────────────────────────────────────
    // Party target selection
    // ────────────────────────────────────────────

    _pickPartyTarget(callback, { filter, prompt } = {}) {
        const candidates = this.combat.party.filter(pm => filter ? filter(pm) : pm.health > 0);
        if (candidates.length === 0) {
            this._addBlockingNotice('No valid targets.');
            return;
        }

        this.actionsEl.innerHTML = '';
        this.turnInfo.textContent = prompt || 'Select a target...';

        for (const pm of candidates) {
            const btn = document.createElement('button');
            btn.className = 'combat-action-btn combat-heal-target-btn';
            const pct = Math.round((pm.health / pm.maxHealth) * 100);
            btn.textContent = `${pm.classDef.icon} ${pm.name}  (${pm.health}/${pm.maxHealth} HP \u2014 ${pct}%)`;
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
