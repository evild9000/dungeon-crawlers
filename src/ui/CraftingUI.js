/**
 * CraftingUI — Artificer's workshop (K hotkey).
 *
 * Only opens when an Artificer is present in the party and the party is
 * out of combat. Four tabs:
 *   - Enchant: apply +1..+7 damage/defense to weapon/armor; attach weapon
 *     riders (fire/acid/poison/lightning/ice) at +1+; add armor quality
 *     (spikes or AoE reduction) at +4+.
 *   - Trinkets: upgrade equipped trinket bonusValue (+1 per level, 1..7),
 *     and at Artificer L25 add separate vitality/regen augments to L4+ trinkets.
 *     Requires artificer level 20+. Dual-aspect trinkets cost 2×.
 *   - Potions & Scrolls: craft Minor / Greater healing potions and
 *     Warding / Wrath scrolls. Finished items go into the group inventory.
 *   - Golems: forge a persistent artificer summon, then at L25 install
 *     golem attachments. Max golems scales with level (1/2/3/4/5 at <30/30/50/70/90); permadeath.
 */

import {
    ENCHANT_WEAPON_COSTS, ENCHANT_ARMOR_COSTS,
    RIDER_TYPES, RIDER_COST,
    ARTIFICER_TRINKET_AUGMENT_UNLOCK_LEVEL,
    TRINKET_AUGMENT_MIN_LEVEL, TRINKET_AUGMENT_MAX_LEVEL,
    TRINKET_AUGMENT_POOL_PCT_BY_LEVEL, TRINKET_AUGMENT_REGEN_BY_LEVEL,
    ARTIFICER_GOLEM_ATTACHMENT_UNLOCK_LEVEL,
    GOLEM_ATTACHMENT_LIMB_DAMAGE_MULT, GOLEM_ATTACHMENT_MAX_LIMBS,
    GOLEM_ATTACHMENT_SHIELD_DEFENSE, GOLEM_ATTACHMENT_SHIELD_BLOCK_CHANCE,
    GOLEM_ATTACHMENT_MAX_TRINKETS, GOLEM_ATTACHMENT_TRINKET_HP_MULT,
    POTION_COSTS,
    POTION_MINOR_HEAL_PCT, POTION_GREATER_HEAL_PCT,
    POTION_WARD_DEF_BONUS, POTION_WRATH_DMG_BONUS,
    calcScrollBonus, calcScrollCost,
    ARTIFICER_MULTI_GOLEM_UNLOCK_LEVEL,
    ARTIFICER_HEAL_GOLEM_PCT, ARTIFICER_FREE_REPAIR_CHANCE_PER_LEVEL,
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

        this._tab = 'enchant';          // 'enchant' | 'trinkets' | 'potions' | 'golems'
        this._enchantTarget = null;     // selected party member id
        this._trinketTarget = null;     // selected party member id for trinket upgrade
        this._golemTarget = null;       // selected artificer id for golem tab
        this._craftArtificer = null;    // selected artificer for enchant/trinkets/potions tabs

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

        const allArtificers = this._findAllArtificers();
        const defaultArtificer = this._findArtificer();
        if (!defaultArtificer) { this.hide(); return; }

        // Resolve the active crafting artificer (enchant / trinkets / potions tabs)
        if (!this._craftArtificer || !allArtificers.find(m => m.id === this._craftArtificer)) {
            this._craftArtificer = defaultArtificer.id;
        }
        const craftArtificer = allArtificers.find(m => m.id === this._craftArtificer) || defaultArtificer;

        // Header
        const header = document.createElement('div');
        header.className = 'craft-header';
        const inv = state.inventory;
        header.innerHTML =
            `<span class="craft-title">\u{1F527} ${craftArtificer.name}'s Workshop</span>` +
            `<span class="craft-gold">\u{1F4B0} ${inv.gold}g` +
            ` &nbsp; \u2728 C:${inv.getReagentCount('common')}` +
            ` &nbsp; \u{1F535} U:${inv.getReagentCount('uncommon')}` +
            ` &nbsp; \u{1F7E3} R:${inv.getReagentCount('rare')}` +
            ` &nbsp; \u{1F536} E:${inv.getReagentCount('epic')}` +
            ` &nbsp; \u{1F537} L:${inv.getReagentCount('legendary')}` +
            ` &nbsp; \u{1F31F} M:${inv.getReagentCount('mythic')}` +
            ` &nbsp; \u2728\u2728 D:${inv.getReagentCount('divine')}</span>`;
        this.content.appendChild(header);

        // Artificer picker \u2014 shown when multiple artificers are present and not on golems tab
        if (allArtificers.length > 1 && this._tab !== 'golems') {
            const apRow = document.createElement('div');
            apRow.className = 'craft-picker';
            apRow.style.marginBottom = '8px';
            const apLbl = document.createElement('label');
            apLbl.className = 'craft-label';
            apLbl.textContent = '\u{1F527} Crafting Artificer:';
            apRow.appendChild(apLbl);
            const apSel = document.createElement('select');
            apSel.className = 'craft-select';
            for (const a of allArtificers) {
                const opt = document.createElement('option');
                opt.value = a.id;
                opt.textContent = `${a.name} (Lv ${a.level})`;
                if (a.id === this._craftArtificer) opt.selected = true;
                apSel.appendChild(opt);
            }
            apSel.addEventListener('change', () => {
                this._craftArtificer = apSel.value;
                this._render();
            });
            apRow.appendChild(apSel);
            this.content.appendChild(apRow);
        }

        // Tabs
        const tabs = document.createElement('div');
        tabs.className = 'craft-tab-bar';
        for (const [id, label] of [
            ['enchant',  'Enchant'],
            ['trinkets', 'Trinkets'],
            ['potions',  'Potions & Scrolls'],
            ['golems',   'Golems'],
        ]) {
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

        if (this._tab === 'enchant') {
            this._renderEnchant(body, state, craftArtificer);
        } else if (this._tab === 'trinkets') {
            this._renderTrinkets(body, state, craftArtificer);
        } else if (this._tab === 'potions') {
            this._renderPotions(body, state, craftArtificer);
        } else {
            // For golems, allow choosing which artificer manages the golem.
            if (!this._golemTarget || !allArtificers.find(m => m.id === this._golemTarget)) {
                this._golemTarget = defaultArtificer.id;
            }
            const golemArtificer = allArtificers.find(m => m.id === this._golemTarget) || defaultArtificer;
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
        // Shield panel
        body.appendChild(this._enchantSlotPanel(state, artificer, target, 'shield'));
    }

    _enchantSlotPanel(state, artificer, target, slot) {
        const panel = document.createElement('div');
        panel.className = 'craft-slot-panel';

        const isOffhand = slot === 'offhand';
        const equippedId = target.equipment && target.equipment[slot];
        const itemDef = equippedId ? getItemDef(equippedId) : null;
        const enchLvl = isOffhand ? target.getOffhandEnchantLevel() :
                        slot === 'weapon' ? target.getWeaponEnchantLevel() :
                        slot === 'shield' ? target.getShieldEnchantLevel() : target.getArmorEnchantLevel();
        const rider = (slot === 'weapon' || isOffhand)
            ? (isOffhand ? target.getOffhandRider() : target.getWeaponRider())
            : null;

        const slotLabel = isOffhand ? 'Off-hand' : slot[0].toUpperCase() + slot.slice(1);

        const title = document.createElement('div');
        title.className = 'craft-slot-title';
        if (!itemDef) {
            title.textContent = `${slot === 'armor' || slot === 'shield' ? '\u{1F6E1}\uFE0F' : '\u{1F5E1}\uFE0F'} ${slotLabel}: (none equipped)`;
            panel.appendChild(title);
            return panel;
        }
        const riderStr = rider ? ` — ${RIDER_ICONS[rider]} ${rider}` : '';
        title.textContent = `${itemDef.icon || ''} ${slotLabel}: ${itemDef.name}   +${enchLvl}${riderStr}`;
        panel.appendChild(title);

        // Level-up buttons (enchLvl + 1 is next target, up to +7)
        const costsTable = (slot === 'weapon' || slot === 'offhand') ? ENCHANT_WEAPON_COSTS : ENCHANT_ARMOR_COSTS;
        if (enchLvl < 7) {
            const next = enchLvl + 1;
            const cost = costsTable[next];
            const canPay = this._canPay(state, cost);
            const btn = document.createElement('button');
            btn.className = `craft-btn ${canPay ? '' : 'craft-btn-disabled'}`;
            btn.disabled = !canPay;
            btn.textContent = `Upgrade to +${next} — ${this._formatCost(cost)}`;
            btn.title = (slot === 'weapon' || slot === 'offhand')
                ? `Adds +1 damage to the weapon's attack type.`
                : slot === 'shield'
                ? `Adds +1% block chance and +1 defense per rank.`
                : `Adds +1 armor to this piece.`;
            btn.addEventListener('click', () => {
                if (!this._canPay(state, cost)) return;
                this._pay(state, cost);
                const existing = target.equipmentEnchants[slot] || { level: 0, rider: null, quality: null };
                target.equipmentEnchants[slot] = { ...existing, level: next };
                this._log(`\u{1F527} ${artificer.name} enchants ${target.name}'s ${slotLabel} ${itemDef.name} to +${next}.`);
                this._onChanged();
                this._render();
            });
            panel.appendChild(btn);
        } else {
            const max = document.createElement('div');
            max.className = 'craft-note';
            max.textContent = 'Already at +7 — maximum enchantment.';
            panel.appendChild(max);
        }

        // ── Armor qualities (armor slot only, requires +4 or higher) ──────────
        // Both Spikes and AoE Ward can be applied independently; each is purchased
        // separately at the same cost as the current enchant level.
        if (slot === 'armor' && enchLvl >= 4) {
            const armorEnch = target.equipmentEnchants[slot] || {};
            const hasSpiked  = !!armorEnch.spiked;
            const hasAoeWard = !!armorEnch.aoeWard;
            const qualityCost = costsTable[enchLvl];

            const qualityHeader = document.createElement('div');
            qualityHeader.className = 'craft-note';
            qualityHeader.textContent = '✨ Armor qualities — each purchased independently (both can be active):';
            panel.appendChild(qualityHeader);

            const qRow = document.createElement('div');
            qRow.className = 'craft-rider-row';

            // Spikes
            if (hasSpiked) {
                const done = document.createElement('div');
                done.className = 'craft-note';
                done.textContent = `\u{1F5E1}️ Spikes applied — reflects ${Math.floor(25*(enchLvl-3))}% of incoming melee damage. Upgrade enchant to improve.`;
                panel.appendChild(done);
            } else {
                const spikePct = Math.floor(25 * (enchLvl - 3));
                const canPay = this._canPay(state, qualityCost);
                const sb = document.createElement('button');
                sb.className = `craft-rider-btn ${canPay ? '' : 'craft-btn-disabled'}`;
                sb.disabled = !canPay;
                sb.innerHTML = `\u{1F5E1}️ Spikes`;
                sb.title = `Reflects ${spikePct}% of incoming melee damage back at the attacker. Scales with enchant level.\nCost: ${this._formatCost(qualityCost)}`;
                sb.addEventListener('click', () => {
                    if (!this._canPay(state, qualityCost)) return;
                    this._pay(state, qualityCost);
                    const ex = target.equipmentEnchants[slot] || { level: enchLvl, rider: null };
                    target.equipmentEnchants[slot] = { ...ex, spiked: true };
                    this._log(`\u{1F527} ${artificer.name} studs ${target.name}'s ${itemDef.name} with iron spikes.`);
                    this._onChanged();
                    this._render();
                });
                qRow.appendChild(sb);
            }

            // AoE Ward
            if (hasAoeWard) {
                const done = document.createElement('div');
                done.className = 'craft-note';
                done.textContent = `\u{1F6E1}️ AoE Ward applied — reduces incoming AoE damage by ${Math.floor(10*(enchLvl-3))}%. Upgrade enchant to improve.`;
                panel.appendChild(done);
            } else {
                const aoeReduction = Math.floor(10 * (enchLvl - 3));
                const canPay = this._canPay(state, qualityCost);
                const ab = document.createElement('button');
                ab.className = `craft-rider-btn ${canPay ? '' : 'craft-btn-disabled'}`;
                ab.disabled = !canPay;
                ab.innerHTML = `\u{1F6E1}️ AoE Ward`;
                ab.title = `Reduces all incoming AoE damage by ${aoeReduction}%. Scales with enchant level.\nCost: ${this._formatCost(qualityCost)}`;
                ab.addEventListener('click', () => {
                    if (!this._canPay(state, qualityCost)) return;
                    this._pay(state, qualityCost);
                    const ex = target.equipmentEnchants[slot] || { level: enchLvl, rider: null };
                    target.equipmentEnchants[slot] = { ...ex, aoeWard: true };
                    this._log(`\u{1F527} ${artificer.name} weaves an AoE ward into ${target.name}'s ${itemDef.name}.`);
                    this._onChanged();
                    this._render();
                });
                qRow.appendChild(ab);
            }

            if (qRow.children.length > 0) panel.appendChild(qRow);

        } else if (slot === 'armor' && enchLvl > 0 && enchLvl < 4) {
            const hint = document.createElement('div');
            hint.className = 'craft-note';
            hint.textContent = 'Enchant to +4 or higher to unlock armor qualities (Spikes and/or AoE Ward).';
            panel.appendChild(hint);
        }

        // Weapon rider (only for weapon/offhand slot, only if enchanted, only if no rider yet)
        if (slot === 'weapon' || slot === 'offhand') {
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

    // ── Potions & Scrolls tab ───────────────────
    _renderPotions(body, state, artificer) {
        const AL = artificer.level;
        const scrollDuration = 5 + Math.floor(AL / 2); // minutes
        const scrollBonus = calcScrollBonus(AL);
        const entries = [
            { id: 'minor_healing_potion',   isScroll: false, name: 'Minor Healing Potion',   icon: '\u{1F9EA}', desc: `Restores ${Math.round(POTION_MINOR_HEAL_PCT*100)}% of max HP to one character.` },
            { id: 'greater_healing_potion', isScroll: false, name: 'Greater Healing Potion', icon: '\u{1F48A}', desc: `Restores ${Math.round(POTION_GREATER_HEAL_PCT*100)}% of max HP to one character.` },
            { id: 'elixir_warding',  isScroll: true, name: 'Scroll of Warding', icon: '\u{1F6E1}️', desc: `+${scrollBonus} defense for the ENTIRE party (base +2, +1 per 5 AL). Duration: ${scrollDuration} min.` },
            { id: 'elixir_wrath',    isScroll: true, name: 'Scroll of Wrath',   icon: '\u{1F525}',        desc: `+${scrollBonus} damage (all types) for the ENTIRE party (base +2, +1 per 5 AL). Duration: ${scrollDuration} min.` },
        ];
        for (const entry of entries) {
            const row = document.createElement('div');
            row.className = 'craft-row';
            const cost = entry.isScroll ? calcScrollCost(AL) : POTION_COSTS[entry.id];
            const owned = state.inventory.getItemCount(entry.id);
            const info = document.createElement('div');
            info.className = 'craft-row-info';
            info.innerHTML = `<b>${entry.icon} ${entry.name}</b> <span class="craft-owned">(own ${owned})</span><br><span class="craft-desc">${entry.desc}</span>`;
            row.appendChild(info);

            const btn = document.createElement('button');
            const canPay = this._canPay(state, cost);
            btn.className = `craft-btn ${canPay ? '' : 'craft-btn-disabled'}`;
            btn.disabled = !canPay;
            btn.textContent = `${entry.isScroll ? 'Scribe' : 'Brew'} — ${this._formatCost(cost)}`;
            btn.addEventListener('click', () => {
                if (!this._canPay(state, cost)) return;
                this._pay(state, cost);
                state.inventory.addItem(entry.id, 1);
                if (typeof state.recordPotionCraft === 'function') {
                    state.recordPotionCraft(artificer, entry.isScroll);
                }
                const verb = entry.isScroll ? 'scribes' : 'brews';
                this._log(`\u{1F4DC} ${artificer.name} ${verb} a ${entry.name}.`);
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
        const existingGolems = (state.party || []).filter(
            p => p && p.isSummoned && p.summonerId === artificer.id &&
                 p.summonStats && p.summonStats.tierId && p.health > 0 && GOLEM_PRESETS[p.summonType],
        );
        const maxGolems = artificer.level >= 90 ? 5
                        : artificer.level >= 70 ? 4
                        : artificer.level >= 50 ? 3
                        : artificer.level >= ARTIFICER_MULTI_GOLEM_UNLOCK_LEVEL ? 2
                        : 1;
        const atCap = existingGolems.length >= maxGolems;

        for (const existingGolem of existingGolems) {
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
                const healPct = Math.round(ARTIFICER_HEAL_GOLEM_PCT * 100);
                const freeRepairPct = Math.round(Math.min(1, (artificer.level || 1) * ARTIFICER_FREE_REPAIR_CHANCE_PER_LEVEL) * 100);
                const repairRow = document.createElement('div');
                repairRow.className = 'craft-row';
                repairRow.innerHTML = `<div class="craft-row-info"><b>Repair Golem</b><br>` +
                    `<span class="craft-desc">Restores ${healPct}% max HP. ${freeRepairPct}% chance to cost no reagent; otherwise uses 1 ${tier ? tier.reagentTier : 'common'} reagent.</span></div>`;
                const btn = document.createElement('button');
                const canPay = state.inventory.hasItem(reagentId, 1);
                const canTryFreeRepair = freeRepairPct > 0;
                btn.className = `craft-btn ${(canPay || canTryFreeRepair) ? '' : 'craft-btn-disabled'}`;
                btn.disabled = !(canPay || canTryFreeRepair);
                btn.textContent = `Repair — ${freeRepairPct}% free`;
                btn.title = canPay
                    ? `Repair has a ${freeRepairPct}% chance to cost no reagent.`
                    : `No matching reagent; repair must roll free (${freeRepairPct}%) or it will fail.`;
                btn.addEventListener('click', () => {
                    if (!this._combatSystem) return;
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

            if (artificer.level >= ARTIFICER_GOLEM_ATTACHMENT_UNLOCK_LEVEL) {
                this._renderGolemAttachments(body, state, artificer, existingGolem);
            } else {
                body.appendChild(this._note(`Golem attachments unlock at Artificer level ${ARTIFICER_GOLEM_ATTACHMENT_UNLOCK_LEVEL}.`));
            }
        }

        if (existingGolems.length > 0) {
            const separator = document.createElement('div');
            separator.className = 'craft-sep';
            separator.textContent = `— Golems: ${existingGolems.length} / ${maxGolems} —`;
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

            const canPay = isUnlocked && !atCap && this._canPay(state, tier.cost);
            const btn = document.createElement('button');
            btn.className = `craft-btn ${canPay ? '' : 'craft-btn-disabled'}`;
            btn.disabled = !canPay;
            btn.textContent = `Forge — ${this._formatCost(tier.cost)}`;
            btn.title = atCap
                ? `You command ${existingGolems.length}/${maxGolems} golems. Dismiss one first.`
                : (isUnlocked ? 'Forge this golem.' : `Requires artificer level ${tier.unlockLevel}.`);
            btn.addEventListener('click', () => {
                if (!this._combatSystem) return;
                this._combatSystem.setInventory(state.inventory);
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
        if ((cost.gold      || 0) > 0 && inv.gold < cost.gold) return false;
        if ((cost.common    || 0) > 0 && !inv.hasReagent('common',    cost.common))    return false;
        if ((cost.uncommon  || 0) > 0 && !inv.hasReagent('uncommon',  cost.uncommon))  return false;
        if ((cost.rare      || 0) > 0 && !inv.hasReagent('rare',      cost.rare))      return false;
        if ((cost.epic      || 0) > 0 && !inv.hasReagent('epic',      cost.epic))      return false;
        if ((cost.legendary || 0) > 0 && !inv.hasReagent('legendary', cost.legendary)) return false;
        if ((cost.mythic    || 0) > 0 && !inv.hasReagent('mythic',    cost.mythic))    return false;
        if ((cost.divine    || 0) > 0 && !inv.hasReagent('divine',    cost.divine))    return false;
        return true;
    }

    _pay(state, cost) {
        const inv = state.inventory;
        if ((cost.gold      || 0) > 0) inv.removeGold(cost.gold);
        if ((cost.common    || 0) > 0) inv.removeReagent('common',    cost.common);
        if ((cost.uncommon  || 0) > 0) inv.removeReagent('uncommon',  cost.uncommon);
        if ((cost.rare      || 0) > 0) inv.removeReagent('rare',      cost.rare);
        if ((cost.epic      || 0) > 0) inv.removeReagent('epic',      cost.epic);
        if ((cost.legendary || 0) > 0) inv.removeReagent('legendary', cost.legendary);
        if ((cost.mythic    || 0) > 0) inv.removeReagent('mythic',    cost.mythic);
        if ((cost.divine    || 0) > 0) inv.removeReagent('divine',    cost.divine);
    }

    _formatCost(cost) {
        if (!cost) return '—';
        const parts = [];
        if (cost.gold)      parts.push(`${cost.gold}g`);
        if (cost.common)    parts.push(`${cost.common}✨C`);
        if (cost.uncommon)  parts.push(`${cost.uncommon}🔵U`);
        if (cost.rare)      parts.push(`${cost.rare}🟣R`);
        if (cost.epic)      parts.push(`${cost.epic}🔶E`);
        if (cost.legendary) parts.push(`${cost.legendary}🔷L`);
        if (cost.mythic)    parts.push(`${cost.mythic}🌟M`);
        if (cost.divine)    parts.push(`${cost.divine}✨✨D`);
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

    _attachmentCostForTier(tier) {
        const cost = {};
        for (const key of ['common', 'uncommon', 'rare', 'epic', 'legendary', 'mythic', 'divine']) {
            const amount = Math.floor(((tier.cost && tier.cost[key]) || 0) / 5);
            if (amount > 0) cost[key] = amount;
        }
        return cost;
    }

    _recalcGolemAttachmentStats(golem) {
        if (!golem || !golem.summonStats) return;
        const stats = golem.summonStats;
        const attachments = stats.attachments || {};
        const baseDefense = stats.baseDefense ?? stats.defense ?? 0;
        const baseMaxHealth = stats.baseMaxHealth ?? golem.maxHealth;
        const oldMax = golem.maxHealth;
        stats.baseDefense = baseDefense;
        stats.baseMaxHealth = baseMaxHealth;
        stats.defense = baseDefense + (attachments.shield ? GOLEM_ATTACHMENT_SHIELD_DEFENSE : 0);
        golem.maxHealth = Math.max(1, Math.floor(baseMaxHealth * (1 + (attachments.trinkets || 0) * GOLEM_ATTACHMENT_TRINKET_HP_MULT)));
        if (golem.maxHealth > oldMax) golem.health += golem.maxHealth - oldMax;
        golem.health = Math.min(golem.health, golem.maxHealth);
    }

    _renderGolemAttachments(body, state, artificer, golem) {
        const stats = golem.summonStats || {};
        const tier = GOLEM_TIERS.find(t => t.id === stats.tierId);
        if (!tier) return;
        if (!stats.attachments) stats.attachments = { limbs: 0, shield: false, trinkets: 0 };
        const attachments = stats.attachments;
        const cost = this._attachmentCostForTier(tier);

        const panel = document.createElement('div');
        panel.className = 'craft-slot-panel';
        const title = document.createElement('div');
        title.className = 'craft-slot-title';
        title.textContent = `⚙️ Golem Attachments — ${golem.name}`;
        panel.appendChild(title);

        const summary = document.createElement('div');
        summary.className = 'craft-note';
        const dmgPct = Math.round((attachments.limbs || 0) * GOLEM_ATTACHMENT_LIMB_DAMAGE_MULT * 100);
        summary.textContent = `Main hand: ${(attachments.limbs || 0) >= 1 ? 'Extra Limb' : 'empty'} | Off hand: ${(attachments.limbs || 0) >= 2 ? 'Extra Limb' : (attachments.shield ? 'Golem Shield' : 'empty')} | Trinkets: ${attachments.trinkets || 0}/${GOLEM_ATTACHMENT_MAX_TRINKETS}. Current bonuses: +${dmgPct}% damage, +${attachments.shield ? GOLEM_ATTACHMENT_SHIELD_DEFENSE : 0} defense, +${Math.round((attachments.trinkets || 0) * GOLEM_ATTACHMENT_TRINKET_HP_MULT * 100)}% HP.`;
        panel.appendChild(summary);

        const row = document.createElement('div');
        row.className = 'craft-rider-row';
        const addButton = (label, enabled, titleText, onClick) => {
            const btn = document.createElement('button');
            btn.className = `craft-rider-btn ${enabled ? '' : 'craft-btn-disabled'}`;
            btn.disabled = !enabled;
            btn.textContent = label;
            btn.title = titleText;
            btn.addEventListener('click', onClick);
            row.appendChild(btn);
        };

        const canPay = this._canPay(state, cost);
        const costText = this._formatCost(cost);
        const limbs = attachments.limbs || 0;
        addButton(
            `🦾 Extra Limb (${limbs}/${GOLEM_ATTACHMENT_MAX_LIMBS})`,
            canPay && limbs < GOLEM_ATTACHMENT_MAX_LIMBS && !(limbs === 1 && attachments.shield),
            `Adds +${Math.round(GOLEM_ATTACHMENT_LIMB_DAMAGE_MULT * 100)}% golem attack damage. First limb fills main hand; second fills off hand.\nCost: ${costText}` + (attachments.shield ? '\nRemove/dismiss the shield by rebuilding the golem if you want a second limb.' : ''),
            () => {
                if (!this._canPay(state, cost) || (attachments.limbs || 0) >= GOLEM_ATTACHMENT_MAX_LIMBS) return;
                if ((attachments.limbs || 0) === 1 && attachments.shield) return;
                this._pay(state, cost);
                attachments.limbs = (attachments.limbs || 0) + 1;
                stats.attachments = attachments;
                this._log(`🦾 ${artificer.name} fits an extra limb onto ${golem.name}.`);
                this._onChanged();
                this._render();
            },
        );

        addButton(
            `🛡️ Golem Shield`,
            canPay && !attachments.shield && limbs < GOLEM_ATTACHMENT_MAX_LIMBS,
            `Fills the off hand unless a second limb is installed. Adds +${GOLEM_ATTACHMENT_SHIELD_DEFENSE} defense and ${Math.round(GOLEM_ATTACHMENT_SHIELD_BLOCK_CHANCE * 100)}% block chance.\nCost: ${costText}`,
            () => {
                if (!this._canPay(state, cost) || attachments.shield || (attachments.limbs || 0) >= GOLEM_ATTACHMENT_MAX_LIMBS) return;
                this._pay(state, cost);
                attachments.shield = true;
                stats.attachments = attachments;
                this._recalcGolemAttachmentStats(golem);
                this._log(`🛡️ ${artificer.name} mounts a shield onto ${golem.name}.`);
                this._onChanged();
                this._render();
            },
        );

        addButton(
            `💎 Golem Trinket (${attachments.trinkets || 0}/${GOLEM_ATTACHMENT_MAX_TRINKETS})`,
            canPay && (attachments.trinkets || 0) < GOLEM_ATTACHMENT_MAX_TRINKETS,
            `Installs a golem-only trinket in any open golem trinket socket. Each grants +${Math.round(GOLEM_ATTACHMENT_TRINKET_HP_MULT * 100)}% max HP.\nCost: ${costText}`,
            () => {
                if (!this._canPay(state, cost) || (attachments.trinkets || 0) >= GOLEM_ATTACHMENT_MAX_TRINKETS) return;
                this._pay(state, cost);
                attachments.trinkets = (attachments.trinkets || 0) + 1;
                stats.attachments = attachments;
                this._recalcGolemAttachmentStats(golem);
                this._log(`💎 ${artificer.name} sockets a golem trinket into ${golem.name}.`);
                this._onChanged();
                this._render();
            },
        );

        panel.appendChild(row);
        body.appendChild(panel);
    }

    // ── Trinket upgrade tab (Artificer L20+) ────────────────────────────────────────
    _renderTrinkets(body, state, artificer) {
        if (artificer.level < 20) {
            body.appendChild(this._note(`Trinket upgrading unlocks at Artificer level 20. (Current: ${artificer.level})`));
            return;
        }
        const candidates = (state.party || []).filter(m => !m.isSummoned);
        if (candidates.length === 0) {
            body.appendChild(this._note('No party members to upgrade trinkets for.'));
            return;
        }
        if (!this._trinketTarget || !candidates.find(m => m.id === this._trinketTarget)) {
            this._trinketTarget = candidates[0].id;
        }

        const picker = document.createElement('div');
        picker.className = 'craft-picker';
        picker.appendChild(this._label('Upgrade target:'));
        const sel = document.createElement('select');
        sel.className = 'craft-select';
        for (const m of candidates) {
            const opt = document.createElement('option');
            opt.value = m.id;
            opt.textContent = `${m.name} (Lv ${m.level} ${m.classDef ? m.classDef.name : ''})`;
            if (m.id === this._trinketTarget) opt.selected = true;
            sel.appendChild(opt);
        }
        sel.addEventListener('change', () => { this._trinketTarget = sel.value; this._render(); });
        picker.appendChild(sel);
        body.appendChild(picker);

        const target = candidates.find(m => m.id === this._trinketTarget);
        if (!target) return;

        const trinketSlots = ['cloak', 'neck', 'ring1', 'ring2', 'belt'];
        const slotNames = { cloak: 'Cloak', neck: 'Neck', ring1: 'Ring 1', ring2: 'Ring 2', belt: 'Belt' };
        let anyTrinket = false;

        for (const slot of trinketSlots) {
            const itemId = target.equipment && target.equipment[slot];
            if (!itemId) continue;
            const def = getItemDef(itemId);
            if (!def) continue;
            anyTrinket = true;

            const isDual = !!(def.bonusType2 && def.bonusValue2);
            const enchObj = target.trinketEnchants && target.trinketEnchants[slot];
            const enchLvl = (enchObj && enchObj.level) || 0;
            const costMult = isDual ? 2 : 1;

            const panel = document.createElement('div');
            panel.className = 'craft-slot-panel';

            const titleEl = document.createElement('div');
            titleEl.className = 'craft-slot-title';
            const bonusDesc  = def.bonusType  ? `+${(def.bonusValue  || 0) + enchLvl} ${def.bonusType}`  : '';
            const bonus2Desc = isDual         ? ` / +${(def.bonusValue2 || 0) + enchLvl} ${def.bonusType2}` : '';
            const augmentLevel = (enchObj && enchObj.augmentLevel) || 0;
            const augmentPct = TRINKET_AUGMENT_POOL_PCT_BY_LEVEL[augmentLevel] || 0;
            const regenAugmentLevel = (enchObj && enchObj.regenAugmentLevel) || 0;
            const regenAugmentBonus = TRINKET_AUGMENT_REGEN_BY_LEVEL[regenAugmentLevel] || 0;
            const augmentBits = [`+${enchLvl} enchant`];
            if (augmentLevel) augmentBits.push(`L${augmentLevel} vitality`);
            if (regenAugmentLevel) augmentBits.push(`L${regenAugmentLevel} regen`);
            titleEl.textContent = `${def.icon || ''} ${slotNames[slot]}: ${def.name}  ${bonusDesc}${bonus2Desc}  [${augmentBits.join(', ')}]`;
            panel.appendChild(titleEl);

            if (enchLvl < 7) {
                const next = enchLvl + 1;
                // Cost tier is based on TOTAL bonus (base bonusValue + enchant level + 1).
                // A +4 trinket going to +5 costs the same as any other +4 -> +5 upgrade.
                const costTier = Math.min(7, (def.bonusValue || 0) + enchLvl + 1);
                const base = ENCHANT_WEAPON_COSTS[costTier];
                const cost = {};
                for (const [k, v] of Object.entries(base)) {
                    cost[k] = costMult > 1 ? v * costMult : v;
                }
                const canPay = this._canPay(state, cost);
                const upgradeBtn = document.createElement('button');
                upgradeBtn.className = `craft-btn ${canPay ? '' : 'craft-btn-disabled'}`;
                upgradeBtn.disabled = !canPay;
                // Show total effective bonus after upgrade (base bonusValue + new enchant level)
                const nextTotal = (def.bonusValue || 0) + next;
                upgradeBtn.textContent = `Upgrade to +${nextTotal} — ${this._formatCost(cost)}${isDual ? ' (dual ×2)' : ''}`;
                upgradeBtn.title = isDual
                    ? 'Upgrades both bonus aspects by +1. Costs twice as much.'
                    : 'Adds +1 to the trinket bonus value.';
                upgradeBtn.addEventListener('click', () => {
                    if (!this._canPay(state, cost)) return;
                    this._pay(state, cost);
                    const existing = target.trinketEnchants[slot] || {};
                    target.trinketEnchants[slot] = { ...existing, level: next };
                    this._log(`✨ ${artificer.name} upgrades ${target.name}'s ${def.name} to +${next}.`);
                    this._onChanged();
                    this._render();
                });
                panel.appendChild(upgradeBtn);
            } else {
                panel.appendChild(this._note('Already at +7 — maximum trinket upgrade.'));
            }

            const totalTrinketLevel = (def.bonusValue || 0) + enchLvl;
            if (artificer.level >= ARTIFICER_TRINKET_AUGMENT_UNLOCK_LEVEL) {
                if (totalTrinketLevel >= TRINKET_AUGMENT_MIN_LEVEL) {
                    if (augmentLevel < TRINKET_AUGMENT_MAX_LEVEL) {
                        const nextAugment = augmentLevel > 0 ? augmentLevel + 1 : TRINKET_AUGMENT_MIN_LEVEL;
                        const base = ENCHANT_WEAPON_COSTS[nextAugment];
                        const augCost = {};
                        for (const [k, v] of Object.entries(base)) augCost[k] = costMult > 1 ? v * costMult : v;
                        const canAug = this._canPay(state, augCost);
                        const augBtn = document.createElement('button');
                        augBtn.className = `craft-btn ${canAug ? '' : 'craft-btn-disabled'}`;
                        augBtn.disabled = !canAug;
                        augBtn.textContent = augmentLevel
                            ? `Upgrade Vitality Augment to L${nextAugment} — ${this._formatCost(augCost)}${isDual ? ' (dual ×2)' : ''}`
                            : `Add Vitality Augment L${nextAugment} — ${this._formatCost(augCost)}${isDual ? ' (dual ×2)' : ''}`;
                        augBtn.title = [
                            `Separate Artificer L${ARTIFICER_TRINKET_AUGMENT_UNLOCK_LEVEL} trinket augment.`,
                            `Requires an effective trinket level of ${TRINKET_AUGMENT_MIN_LEVEL}+; this trinket is level ${totalTrinketLevel}.`,
                            `Grants +${Math.round((TRINKET_AUGMENT_POOL_PCT_BY_LEVEL[nextAugment] || 0) * 100)}% max health, stamina, and mana while equipped.`,
                            `Current augment: ${augmentLevel ? `L${augmentLevel} (+${Math.round(augmentPct * 100)}%)` : 'none'}.`,
                            'Cost is tracked separately from the normal trinket enchant.',
                        ].join('\n');
                        augBtn.addEventListener('click', () => {
                            if (!this._canPay(state, augCost)) return;
                            this._pay(state, augCost);
                            const existing = target.trinketEnchants[slot] || {};
                            target.trinketEnchants[slot] = { ...existing, augmentLevel: nextAugment };
                            if (typeof target.refreshTrinketPoolBonuses === 'function') {
                                target.refreshTrinketPoolBonuses(true);
                            }
                            this._log(`💠 ${artificer.name} adds a L${nextAugment} vitality augment to ${target.name}'s ${def.name}.`);
                            this._onChanged();
                            this._render();
                        });
                        panel.appendChild(augBtn);
                    } else {
                        panel.appendChild(this._note(`Vitality augment maxed at L${TRINKET_AUGMENT_MAX_LEVEL}: +${Math.round(augmentPct * 100)}% HP/ST/MP.`));
                    }

                    if (regenAugmentLevel < TRINKET_AUGMENT_MAX_LEVEL) {
                        const nextRegenAugment = regenAugmentLevel > 0 ? regenAugmentLevel + 1 : TRINKET_AUGMENT_MIN_LEVEL;
                        const base = ENCHANT_WEAPON_COSTS[nextRegenAugment];
                        const regenCost = {};
                        for (const [k, v] of Object.entries(base)) regenCost[k] = costMult > 1 ? v * costMult : v;
                        const canRegenAug = this._canPay(state, regenCost);
                        const regenBtn = document.createElement('button');
                        regenBtn.className = `craft-btn ${canRegenAug ? '' : 'craft-btn-disabled'}`;
                        regenBtn.disabled = !canRegenAug;
                        regenBtn.textContent = regenAugmentLevel
                            ? `Upgrade Regen Augment to L${nextRegenAugment} — ${this._formatCost(regenCost)}${isDual ? ' (dual ×2)' : ''}`
                            : `Add Regen Augment L${nextRegenAugment} — ${this._formatCost(regenCost)}${isDual ? ' (dual ×2)' : ''}`;
                        regenBtn.title = [
                            `Separate Artificer L${ARTIFICER_TRINKET_AUGMENT_UNLOCK_LEVEL} trinket regen augment.`,
                            `Requires an effective trinket level of ${TRINKET_AUGMENT_MIN_LEVEL}+; this trinket is level ${totalTrinketLevel}.`,
                            `Grants +${TRINKET_AUGMENT_REGEN_BY_LEVEL[nextRegenAugment] || 0} HP, stamina, and mana regeneration per minute while equipped.`,
                            `Current regen augment: ${regenAugmentLevel ? `L${regenAugmentLevel} (+${regenAugmentBonus}/min)` : 'none'}.`,
                            'Cost is tracked separately from normal trinket enchant and vitality augment.',
                            'Characters with 0 maximum mana cannot regenerate mana above 0.',
                        ].join('\n');
                        regenBtn.addEventListener('click', () => {
                            if (!this._canPay(state, regenCost)) return;
                            this._pay(state, regenCost);
                            const existing = target.trinketEnchants[slot] || {};
                            target.trinketEnchants[slot] = { ...existing, regenAugmentLevel: nextRegenAugment };
                            this._log(`🔄 ${artificer.name} adds a L${nextRegenAugment} regen augment to ${target.name}'s ${def.name}.`);
                            this._onChanged();
                            this._render();
                        });
                        panel.appendChild(regenBtn);
                    } else {
                        panel.appendChild(this._note(`Regen augment maxed at L${TRINKET_AUGMENT_MAX_LEVEL}: +${regenAugmentBonus}/min HP/ST/MP regen.`));
                    }
                } else {
                    panel.appendChild(this._note(`Vitality and regen augments require an effective trinket level of ${TRINKET_AUGMENT_MIN_LEVEL}+; this trinket is currently level ${totalTrinketLevel}.`));
                }
            } else {
                panel.appendChild(this._note(`Vitality and regen augments unlock at Artificer level ${ARTIFICER_TRINKET_AUGMENT_UNLOCK_LEVEL}.`));
            }

            body.appendChild(panel);
        }

        if (!anyTrinket) {
            body.appendChild(this._note(`${target.name} has no trinkets equipped.`));
        }
    }
}
