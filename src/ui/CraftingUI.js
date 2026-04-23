/**
 * CraftingUI — Artificer's workshop (K hotkey).
 *
 * Only opens when an Artificer is present in the party and the party is
 * out of combat. Three tabs:
 *   - Enchant: apply +N damage/defense enchantments to a party member's
 *     equipped weapon or armor, and (at +1 or higher) attach a weapon
 *     rider (fire/acid/poison/lightning/ice).
 *   - Potions: craft Minor / Greater healing potions and Warding / Wrath
 *     elixirs. Finished potions go into the group inventory.
 *   - Golems: forge a persistent artificer summon (Flesh / Clay / Stone /
 *     Iron). Only one golem per artificer at a time; permadeath.
 */

import {
    ENCHANT_WEAPON_COSTS, ENCHANT_ARMOR_COSTS,
    RIDER_TYPES, RIDER_COST,
    POTION_COSTS,
    POTION_MINOR_HEAL_PCT, POTION_GREATER_HEAL_PCT,
    POTION_WARD_DEF_BONUS, POTION_WRATH_DMG_BONUS,
    POTION_BUFF_DURATION_SEC,
} from '../utils/constants.js';
import { getItemDef, WEAPONS } from '../items/ItemTypes.js';
import { GOLEM_TIERS, GOLEM_PRESETS, getArtificerUnlockedGolems } from '../entities/Summons.js';

const RIDER_ICONS = {
    fire:      '\u{1F525}',
    acid:      '\u{1F7E2}',
    poison:    '\u{1F40D}',
    lightning: '\u26A1',
    ice:       '\u2744\uFE0F',
};
const RIDER_DESCRIPTIONS = {
    fire:      'Burn DoT (50% more damage, lasts 1 extra round).',
    acid:      'Acid DoT + defense debuff (melts armor).',
    poison:    'Venom DoT + attack debuff (softens their blows).',
    lightning: '1-round stun + attack (damage) debuff.',
    ice:       '1-round stun + defense debuff.',
};

export class CraftingUI {
    /**
     * @param {() => import('../core/GameState.js').GameState} getState
     * @param {() => void} onChanged
     * @param {object}     systems  { combatSystem, logger }
     */
    constructor(getState, onChanged, systems = {}) {
        this._getState = getState;
        this._onChanged = onChanged;
        this._combatSystem = systems.combatSystem || null;
        this._log = typeof systems.logger === 'function' ? systems.logger : () => {};

        this._tab = 'enchant';          // 'enchant' | 'potions' | 'golems'
        this._enchantTarget = null;     // selected party member id
        this._golemTarget = null;       // selected artificer id for golem tab

        this._ensureOverlay();
    }

    // ──────────────────────────────────────────
    // Lifecycle
    // ──────────────────────────────────────────

    _ensureOverlay() {
        if (document.getElementById('crafting-overlay')) {
            this.overlay = document.getElementById('crafting-overlay');
            this.content = document.getElementById('crafting-content');
            return;
        }
        const overlay = document.createElement('div');
        overlay.id = 'crafting-overlay';
        overlay.className = 'craft-overlay';
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) this.hide();
        });
        const content = document.createElement('div');
        content.id = 'crafting-content';
        content.className = 'craft-content';
        overlay.appendChild(content);
        document.body.appendChild(overlay);
        this.overlay = overlay;
        this.content = content;
    }

    get isOpen() { return this.overlay.style.display === 'flex'; }

    /** Returns the first live artificer in the party (or null). */
    _findArtificer() {
        const state = this._getState();
        if (!state || !state.party) return null;
        return state.party.find(m => !m.isSummoned && m.classId === 'artificer' && m.health > 0) || null;
    }

    /** Returns all live artificers in the party. */
    _findAllArtificers() {
        const state = this._getState();
        if (!state || !state.party) return [];
        return state.party.filter(m => !m.isSummoned && m.classId === 'artificer' && m.health > 0);
    }

    /**
     * Try to open the workshop. Returns false with a user-facing log line if
     * no artificer is available (Game.js uses the return value).
     */
    show() {
        const artificer = this._findArtificer();
        if (!artificer) {
            this._log('No Artificer in the party — the workshop stays dark.');
            return false;
        }
        this.overlay.style.display = 'flex';
        this._render();
        return true;
    }

    hide() { this.overlay.style.display = 'none'; }

    // ──────────────────────────────────────────
    // Rendering
    // ──────────────────────────────────────────

    _render() {
        const state = this._getState();
        if (!state) return;
        this.content.innerHTML = '';

        const artificer = this._findArtificer();
        if (!artificer) { this.hide(); return; }

        // Header
        const header = document.createElement('div');
        header.className = 'craft-header';
        header.innerHTML =
            `<span class="craft-title">\u{1F527} ${artificer.name}'s Workshop</span>` +
            `<span class="craft-gold">\u{1F4B0} ${state.inventory.gold}g` +
            ` &nbsp; \u2728 C:${state.inventory.getReagentCount('common')}` +
            ` &nbsp; \u{1F535} U:${state.inventory.getReagentCount('uncommon')}` +
            ` &nbsp; \u{1F7E3} R:${state.inventory.getReagentCount('rare')}</span>`;
        this.content.appendChild(header);

        // Tabs
        const tabs = document.createElement('div');
        tabs.className = 'craft-tab-bar';
        for (const [id, label] of [['enchant', 'Enchant'], ['potions', 'Potions'], ['golems', 'Golems']]) {
            const btn = document.createElement('button');
            btn.className = `craft-tab ${this._tab === id ? 'active' : ''}`;
            btn.textContent = label;
            btn.addEventListener('click', () => { this._tab = id; this._render(); });
            tabs.appendChild(btn);
        }
        this.content.appendChild(tabs);

        // Close
        const closeBtn = document.createElement('button');
        closeBtn.className = 'craft-close';
        closeBtn.textContent = '\u2715';
        closeBtn.title = 'Close (Esc)';
        closeBtn.addEventListener('click', () => this.hide());
        this.content.appendChild(closeBtn);

        // Body
        const body = document.createElement('div');
        body.className = 'craft-body';
        this.content.appendChild(body);

        if (this._tab === 'enchant') this._renderEnchant(body, state, artificer);
        else if (this._tab === 'potions') this._renderPotions(body, state, artificer);
        else {
            // For golems, allow choosing which artificer manages the golem.
            const allArtificers = this._findAllArtificers();
            if (!this._golemTarget || !allArtificers.find(m => m.id === this._golemTarget)) {
                this._golemTarget = artificer.id;
            }
            const golemArtificer = allArtificers.find(m => m.id === this._golemTarget) || artificer;
            this._renderGolems(body, state, golemArtificer, allArtificers);
        }
    }

    // ── Enchant tab ─────────────────────────────
    _renderEnchant(body, state, artificer) {
        // Pick target member (any non-summon party member with a weapon or armor)
        const candidates = (state.party || []).filter(m => !m.isSummoned);
        if (candidates.length === 0) {
            body.appendChild(this._note('No party members to enchant for.'));
            return;
        }
        if (!this._enchantTarget || !candidates.find(m => m.id === this._enchantTarget)) {
            this._enchantTarget = artificer.id;
        }

        const picker = document.createElement('div');
        picker.className = 'craft-picker';
        picker.appendChild(this._label('Enchant target:'));
        const sel = document.createElement('select');
        sel.className = 'craft-select';
        for (const m of candidates) {
            const opt = document.createElement('option');
            opt.value = m.id;
            opt.textContent = `${m.name} (Lv ${m.level} ${m.classDef ? m.classDef.name : ''})`;
            if (m.id === this._enchantTarget) opt.selected = true;
            sel.appendChild(opt);
        }
        sel.addEventListener('change', () => { this._enchantTarget = sel.value; this._render(); });
        picker.appendChild(sel);
        body.appendChild(picker);

        const target = candidates.find(m => m.id === this._enchantTarget);
        if (!target) return;

        // Weapon panel
        body.appendChild(this._enchantSlotPanel(state, artificer, target, 'weapon'));
        // Off-hand weapon panel (dual-wield only)
        if (target.equipment && target.equipment.offhand) {
            const offDef = getItemDef(target.equipment.offhand);
            if (offDef && offDef.category === 'weapon') {
                body.appendChild(this._enchantSlotPanel(state, artificer, target, 'offhand'));
            }
        }
        // Armor panel
        body.appendChild(this._enchantSlotPanel(state, artificer, target, 'armor'));
    }

    _enchantSlotPanel(state, artificer, target, slot) {
        const panel = document.createElement('div');
        panel.className = 'craft-slot-panel';

        const isOffhand = slot === 'offhand';
        const equippedId = target.equipment && target.equipment[slot];
        const itemDef = equippedId ? getItemDef(equippedId) : null;
        const enchLvl = isOffhand ? target.getOffhandEnchantLevel() :
                        slot === 'weapon' ? target.getWeaponEnchantLevel() : target.getArmorEnchantLevel();
        const rider = (slot === 'weapon' || isOffhand)
            ? (isOffhand ? target.getOffhandRider() : target.getWeaponRider())
            : null;

        const slotLabel = isOffhand ? 'Off-hand' : slot[0].toUpperCase() + slot.slice(1);

        const title = document.createElement('div');
        title.className = 'craft-slot-title';
        if (!itemDef) {
            title.textContent = `${slot === 'armor' ? '\u{1F6E1}\uFE0F' : '\u{1F5E1}\uFE0F'} ${slotLabel}: (none equipped)`;
            panel.appendChild(title);
            return panel;
        }
        const riderStr = rider ? ` — ${RIDER_ICONS[rider]} ${rider}` : '';
        title.textContent = `${itemDef.icon || ''} ${slotLabel}: ${itemDef.name}   +${enchLvl}${riderStr}`;
        panel.appendChild(title);

        // Level-up buttons (enchLvl + 1 is next target, if < 3)
        const costsTable = slot === 'weapon' ? ENCHANT_WEAPON_COSTS : ENCHANT_ARMOR_COSTS;
        if (enchLvl < 3) {
            const next = enchLvl + 1;
            const cost = costsTable[next];
            const canPay = this._canPay(state, cost);
            const btn = document.createElement('button');
            btn.className = `craft-btn ${canPay ? '' : 'craft-btn-disabled'}`;
            btn.disabled = !canPay;
            btn.textContent = `Upgrade to +${next} — ${this._formatCost(cost)}`;
            btn.title = slot === 'weapon'
                ? `Adds +1 damage to the weapon's attack type.`
                : `Adds +1 armor to this piece.`;
            btn.addEventListener('click', () => {
                if (!this._canPay(state, cost)) return;
                this._pay(state, cost);
                const existing = target.equipmentEnchants[slot] || { level: 0, rider: null };
                target.equipmentEnchants[slot] = { ...existing, level: next };
                this._log(`\u{1F527} ${artificer.name} enchants ${target.name}'s ${slotLabel} ${itemDef.name} to +${next}.`);
                this._onChanged();
                this._render();
            });
            panel.appendChild(btn);
        } else {
            const max = document.createElement('div');
            max.className = 'craft-note';
            max.textContent = 'Already at +3 — maximum enchantment.';
            panel.appendChild(max);
        }

        // Weapon rider (only for weapon/offhand slot, only if enchanted, only if no rider yet)
        if (slot === 'weapon' || isOffhand) {
            if (enchLvl === 0) {
                const hint = document.createElement('div');
                hint.className = 'craft-note';
                hint.textContent = 'Enchant to +1 or higher before adding an elemental rider.';
                panel.appendChild(hint);
            } else if (!rider) {
                const row = document.createElement('div');
                row.className = 'craft-rider-row';
                for (const r of RIDER_TYPES) {
                    const canPay = this._canPay(state, RIDER_COST);
                    const rb = document.createElement('button');
                    rb.className = `craft-rider-btn ${canPay ? '' : 'craft-btn-disabled'}`;
                    rb.disabled = !canPay;
                    rb.innerHTML = `${RIDER_ICONS[r]} ${r[0].toUpperCase()}${r.slice(1)}`;
                    rb.title = `${RIDER_DESCRIPTIONS[r]}\nCost: ${this._formatCost(RIDER_COST)}`;
                    rb.addEventListener('click', () => {
                        if (!this._canPay(state, RIDER_COST)) return;
                        this._pay(state, RIDER_COST);
                        const existing = target.equipmentEnchants[slot] || { level: enchLvl, rider: null };
                        target.equipmentEnchants[slot] = { ...existing, rider: r };
                        this._log(`${RIDER_ICONS[r]} ${artificer.name} imbues ${target.name}'s ${itemDef.name} with ${r}.`);
                        this._onChanged();
                        this._render();
                    });
                    row.appendChild(rb);
                }
                panel.appendChild(row);
            } else {
                const done = document.createElement('div');
                done.className = 'craft-note';
                done.textContent = `${RIDER_ICONS[rider]} ${rider} rider already applied — unequip to remove.`;
                panel.appendChild(done);
            }
        }

        return panel;
    }

    // ── Potions tab ─────────────────────────────
    _renderPotions(body, state, artificer) {
        const entries = [
            { id: 'minor_healing_potion',   name: 'Minor Healing Potion',   icon: '\u{1F9EA}', desc: `Restores ${Math.round(POTION_MINOR_HEAL_PCT*100)}% of max HP.` },
            { id: 'greater_healing_potion', name: 'Greater Healing Potion', icon: '\u{1F48A}', desc: `Restores ${Math.round(POTION_GREATER_HEAL_PCT*100)}% of max HP.` },
            { id: 'elixir_warding',         name: 'Elixir of Warding',      icon: '\u{1F6E1}\uFE0F', desc: `+${POTION_WARD_DEF_BONUS} defense for ${Math.round(POTION_BUFF_DURATION_SEC/60)} min.` },
            { id: 'elixir_wrath',           name: 'Elixir of Wrath',        icon: '\u{1F525}', desc: `+${POTION_WRATH_DMG_BONUS} damage (all types) for ${Math.round(POTION_BUFF_DURATION_SEC/60)} min.` },
        ];
        for (const entry of entries) {
            const row = document.createElement('div');
            row.className = 'craft-row';
            const cost = POTION_COSTS[entry.id];
            const owned = state.inventory.getItemCount(entry.id);
            const info = document.createElement('div');
            info.className = 'craft-row-info';
            info.innerHTML = `<b>${entry.icon} ${entry.name}</b> <span class="craft-owned">(own ${owned})</span><br><span class="craft-desc">${entry.desc}</span>`;
            row.appendChild(info);

            const btn = document.createElement('button');
            const canPay = this._canPay(state, cost);
            btn.className = `craft-btn ${canPay ? '' : 'craft-btn-disabled'}`;
            btn.disabled = !canPay;
            btn.textContent = `Brew — ${this._formatCost(cost)}`;
            btn.addEventListener('click', () => {
                if (!this._canPay(state, cost)) return;
                this._pay(state, cost);
                state.inventory.addItem(entry.id, 1);
                this._log(`\u{1F9EA} ${artificer.name} brews a ${entry.name}.`);
                this._onChanged();
                this._render();
            });
            row.appendChild(btn);
            body.appendChild(row);
        }
    }

    // ── Golems tab ──────────────────────────────
    _renderGolems(body, state, artificer, allArtificers = []) {
        // Artificer picker (shown only when >1 artificer is present)
        if (allArtificers.length > 1) {
            const picker = document.createElement('div');
            picker.className = 'craft-picker';
            picker.appendChild(this._label('Forging artificer:'));
            const sel = document.createElement('select');
            sel.className = 'craft-select';
            for (const m of allArtificers) {
                const opt = document.createElement('option');
                opt.value = m.id;
                opt.textContent = `${m.name} (Lv ${m.level})`;
                if (m.id === artificer.id) opt.selected = true;
                sel.appendChild(opt);
            }
            sel.addEventListener('change', () => { this._golemTarget = sel.value; this._render(); });
            picker.appendChild(sel);
            body.appendChild(picker);
        }

        const unlocked = getArtificerUnlockedGolems(artificer.level);
        const existingGolem = (state.party || []).find(
            p => p && p.isSummoned && p.summonerId === artificer.id &&
                 p.summonStats && p.summonStats.tierId && p.health > 0 && GOLEM_PRESETS[p.summonType],
        );

        if (existingGolem) {
            const row = document.createElement('div');
            row.className = 'craft-row';
            row.innerHTML = `<div class="craft-row-info"><b>${GOLEM_PRESETS[existingGolem.summonType].icon} ${existingGolem.name}</b><br>` +
                `<span class="craft-desc">HP ${existingGolem.health}/${existingGolem.maxHealth}</span></div>`;
            const dismissBtn = document.createElement('button');
            dismissBtn.className = 'craft-btn craft-btn-warn';
            dismissBtn.textContent = 'Dismiss (permadeath)';
            dismissBtn.title = 'The golem is decommissioned. It cannot be recovered.';
            dismissBtn.addEventListener('click', () => {
                if (!confirm('Dismiss the golem? This is permanent.')) return;
                existingGolem.health = 0;
                state.party = state.party.filter(p => p !== existingGolem);
                this._log(`\u{1F527} ${artificer.name} dismisses the ${existingGolem.name}.`);
                this._onChanged();
                this._render();
            });
            row.appendChild(dismissBtn);
            body.appendChild(row);

            // Repair button
            if (existingGolem.health < existingGolem.maxHealth) {
                const tier = GOLEM_TIERS.find(t => t.id === existingGolem.summonStats.tierId);
                const reagentId = `reagent_${tier ? tier.reagentTier : 'common'}`;
                const repairRow = document.createElement('div');
                repairRow.className = 'craft-row';
                repairRow.innerHTML = `<div class="craft-row-info"><b>Repair Golem</b><br>` +
                    `<span class="craft-desc">Restores 50% max HP. Uses 1 ${tier ? tier.reagentTier : 'common'} reagent.</span></div>`;
                const btn = document.createElement('button');
                const canPay = state.inventory.hasItem(reagentId, 1);
                btn.className = `craft-btn ${canPay ? '' : 'craft-btn-disabled'}`;
                btn.disabled = !canPay;
                btn.textContent = `Repair — 1 ${tier ? tier.reagentTier : 'common'}`;
                btn.addEventListener('click', () => {
                    if (!this._combatSystem) return;
                    // Out-of-combat repair: route through CombatSystem.healGolem with spendTurn=false.
                    this._combatSystem.setInventory(state.inventory);
                    const ok = this._combatSystem.healGolem(existingGolem, artificer, /*spendTurn*/ false);
                    if (ok) {
                        this._onChanged();
                        this._render();
                    }
                });
                repairRow.appendChild(btn);
                body.appendChild(repairRow);
            }

            const separator = document.createElement('div');
            separator.className = 'craft-sep';
            separator.textContent = '— One golem per artificer at a time —';
            body.appendChild(separator);
        }

        for (const tier of GOLEM_TIERS) {
            const row = document.createElement('div');
            row.className = 'craft-row';
            const preset = GOLEM_PRESETS[tier.id];
            const isUnlocked = unlocked.indexOf(tier) !== -1;
            row.innerHTML = `<div class="craft-row-info"><b>${preset.icon} ${tier.name}</b>` +
                (isUnlocked ? '' : ` <span class="craft-locked">(unlocks at Lv ${tier.unlockLevel})</span>`) +
                `<br><span class="craft-desc">${tier.description}</span></div>`;

            const canPay = isUnlocked && !existingGolem && this._canPay(state, tier.cost);
            const btn = document.createElement('button');
            btn.className = `craft-btn ${canPay ? '' : 'craft-btn-disabled'}`;
            btn.disabled = !canPay;
            btn.textContent = `Forge — ${this._formatCost(tier.cost)}`;
            btn.title = existingGolem
                ? 'You already command a golem. Dismiss it first.'
                : (isUnlocked ? 'Forge this golem.' : `Requires artificer level ${tier.unlockLevel}.`);
            btn.addEventListener('click', () => {
                if (!this._combatSystem) return;
                this._combatSystem.setInventory(state.inventory);
                // Temporarily set currentMember path isn't available out of combat;
                // use the explicit-member signature + spendTurn=false.
                // We also need the CombatSystem to see the party so it can push the
                // new golem into it.
                this._combatSystem.party = state.party;
                const golem = this._combatSystem.summonGolem(tier.id, artificer, /*spendTurn*/ false, state.inventory);
                if (golem) {
                    this._onChanged();
                    this._render();
                }
            });
            row.appendChild(btn);
            body.appendChild(row);
        }
    }

    // ──────────────────────────────────────────
    // Cost helpers
    // ──────────────────────────────────────────

    _canPay(state, cost) {
        if (!cost) return false;
        const inv = state.inventory;
        if ((cost.gold || 0) > 0 && inv.gold < cost.gold) return false;
        if ((cost.common || 0) > 0 && !inv.hasReagent('common', cost.common)) return false;
        if ((cost.uncommon || 0) > 0 && !inv.hasReagent('uncommon', cost.uncommon)) return false;
        if ((cost.rare || 0) > 0 && !inv.hasReagent('rare', cost.rare)) return false;
        return true;
    }

    _pay(state, cost) {
        const inv = state.inventory;
        if ((cost.gold || 0) > 0) inv.removeGold(cost.gold);
        if ((cost.common || 0) > 0) inv.removeReagent('common', cost.common);
        if ((cost.uncommon || 0) > 0) inv.removeReagent('uncommon', cost.uncommon);
        if ((cost.rare || 0) > 0) inv.removeReagent('rare', cost.rare);
    }

    _formatCost(cost) {
        if (!cost) return '—';
        const parts = [];
        if (cost.gold)     parts.push(`${cost.gold}g`);
        if (cost.common)   parts.push(`${cost.common}\u2728C`);
        if (cost.uncommon) parts.push(`${cost.uncommon}\u{1F535}U`);
        if (cost.rare)     parts.push(`${cost.rare}\u{1F7E3}R`);
        return parts.join(' + ') || 'free';
    }

    _label(text) {
        const el = document.createElement('div');
        el.className = 'craft-label';
        el.textContent = text;
        return el;
    }

    _note(text) {
        const el = document.createElement('div');
        el.className = 'craft-note';
        el.textContent = text;
        return el;
    }
}
