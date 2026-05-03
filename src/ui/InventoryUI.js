/**
 * InventoryUI — group inventory overlay and personal inventory modal.
 *
 * Group inventory: shows gold, consumables, and equipment with the
 * ability to transfer items to a party member's personal inventory.
 *
 * Personal inventory: modal per character showing:
 *   - Portrait, name, class/species
 *   - Level header + XP progress bar
 *   - Combat Stats panel: aggregated Defense, Melee, Ranged, Magic bonuses
 *   - Combat Row toggle (Front / Back)
 *   - Equipped gear (weapon/armor/shield) with equip/unequip controls
 *   - Backpack items (equip/use/move-to-group)
 *
 * Summoned creatures are skipped here — they have no inventory UI.
 */

import { getItemDef, ITEM_CATEGORY, WEAPON_SUBTYPE } from '../items/ItemTypes.js';
import { generatePortrait } from '../utils/PortraitGenerator.js';
import { soundManager } from '../utils/SoundManager.js';
import { getSummonPreset } from '../entities/Summons.js';
import {
    POTION_MINOR_HEAL_PCT, POTION_GREATER_HEAL_PCT,
    POTION_WARD_DEF_BONUS, POTION_WRATH_DMG_BONUS,
    POTION_BUFF_DURATION_SEC, calcScrollBonus,
    MELEE_STUN_CHANCE, RANGED_CRIT_CHANCE,
    BACKSTAB_INSTAKILL_CHANCE, MONK_DODGE_CHANCE, MONK_WHIRLWIND_CHANCE,
    CLERIC_HEAL_PERCENT, CLERIC_HEAL_MANA_COST,
    NECRO_LIFE_DRAIN_CHANCE, NECRO_LIFE_DRAIN_AMOUNT,
    NECRO_SUMMON_MANA_COST,
    MONK_MELEE_MANA_COST,
    MONK_DODGE_STAMINA_COST, MONK_DODGE_MANA_COST,
    PALADIN_SMITE_MANA_COST, PALADIN_SMITE_INSTAKILL_BASE,
    PALADIN_HEAL_MANA_COST, PALADIN_HEAL_PERCENT,
} from '../utils/constants.js';

/**
 * Compute scroll buff duration (ms) based on the highest-level artificer in party.
 * Base: 5 min. Bonus: +1 min per 2 artificer levels.
 */
function _scrollDurationMs(party) {
    const level = (party || []).reduce((max, m) => {
        if (!m.isSummoned && m.classId === 'artificer' && m.health > 0) return Math.max(max, m.level || 1);
        return max;
    }, 0);
    return (5 + Math.floor(level / 2)) * 60 * 1000;
}

/** Highest living Artificer level in the party (0 if none). */
function _artificerLevel(party) {
    return (party || []).reduce((max, m) => {
        if (!m.isSummoned && m.classId === 'artificer' && m.health > 0) return Math.max(max, m.level || 1);
        return max;
    }, 0);
}

/**
 * Apply a potion/scroll effect. Returns true if something was applied.
 * Scrolls (elixir_warding / elixir_wrath) affect ALL living non-summoned
 * party members — pass the full party array as the third argument.
 */
function _applyPotion(member, itemId, party) {
    if (!member || member.health <= 0) return false;
    switch (itemId) {
        case 'minor_healing_potion': {
            if (member.health >= member.maxHealth) return false;
            const amt = Math.max(1, Math.ceil(member.maxHealth * POTION_MINOR_HEAL_PCT));
            member.health = Math.min(member.maxHealth, member.health + amt);
            return true;
        }
        case 'greater_healing_potion': {
            if (member.health >= member.maxHealth) return false;
            const amt = Math.max(1, Math.ceil(member.maxHealth * POTION_GREATER_HEAL_PCT));
            member.health = Math.min(member.maxHealth, member.health + amt);
            return true;
        }
        case 'healing_potion': {
            if (member.health >= member.maxHealth) return false;
            member.health = member.maxHealth;
            return true;
        }
        case 'elixir_warding': {
            const durMs = _scrollDurationMs(party);
            const bonus  = calcScrollBonus(_artificerLevel(party));
            const targets = party ? party.filter(m => !m.isSummoned && m.health > 0) : [member];
            for (const t of targets) {
                t.addEffect({ type: 'elixir_warding', defenseBonus: bonus, expiresAt: Date.now() + durMs });
            }
            return true;
        }
        case 'elixir_wrath': {
            const durMs = _scrollDurationMs(party);
            const bonus  = calcScrollBonus(_artificerLevel(party));
            const targets = party ? party.filter(m => !m.isSummoned && m.health > 0) : [member];
            for (const t of targets) {
                t.addEffect({ type: 'elixir_wrath', damageBonus: bonus, expiresAt: Date.now() + durMs });
            }
            return true;
        }
    }
    return false;
}

export class InventoryUI {
    /**
     * @param {() => import('../core/GameState.js').GameState} getState
     * @param {() => void} onChanged — called after any inventory mutation
     */
    constructor(getState, onChanged) {
        this._getState = getState;
        this._onChanged = onChanged;
        this._portraitCache = new Map();

        // Group inventory overlay
        this.groupOverlay = document.getElementById('inventory-overlay');
        this.groupContent = document.getElementById('inventory-content');
        document.getElementById('btn-close-inventory')
            .addEventListener('click', () => this.hideGroup());

        // Personal inventory modal
        this.personalOverlay = document.getElementById('personal-inventory-overlay');
        this.personalContent = document.getElementById('personal-inventory-content');
        document.getElementById('btn-close-personal')
            .addEventListener('click', () => this.hidePersonal());

        this._activeMemberId = null;

        // Arrow-key navigation between party members while bag is open
        this._bagKeyHandler = (e) => {
            if (!this.isPersonalOpen) return;
            if (e.key === 'ArrowLeft')  this._navigatePersonal(-1);
            if (e.key === 'ArrowRight') this._navigatePersonal(1);
        };
        window.addEventListener('keydown', this._bagKeyHandler);
    }

    /**
     * Cycle the personal inventory to the prev/next non-summoned party member.
     * @param {number} dir  -1 = previous, +1 = next
     */
    _navigatePersonal(dir) {
        const state = this._getState();
        if (!state) return;
        // Only show non-summoned members in the bag modal
        const eligible = state.party.filter(m => !m.isSummoned);
        if (eligible.length < 2) return;
        const idx = eligible.findIndex(m => m.id === this._activeMemberId);
        if (idx === -1) return;
        const next = (idx + dir + eligible.length) % eligible.length;
        this._activeMemberId = eligible[next].id;
        this._renderPersonal();
    }

    // ────────────────────────────────────────────
    // Group inventory
    // ────────────────────────────────────────────

    showGroup() {
        this.groupOverlay.style.display = 'flex';
        soundManager.playInventory();
        this._renderGroup();
    }

    hideGroup() {
        this.groupOverlay.style.display = 'none';
    }

    get isGroupOpen() {
        return this.groupOverlay.style.display === 'flex';
    }

    /**
     * Sort the items within a group bucket for display.
     *
     * Weapons  — by subtype (ranged → magic → melee), then power low→high.
     * Armor    — by blocking value low→high (shields, which have no blocking, go last).
     * Trinkets — by trinketKind (cloak → neck/amulet → ring → belt), then bonusValue low→high.
     * Others   — unchanged (natural inventory order).
     */
    _sortGroupItems(key, items) {
        const clone = [...items];
        if (key === 'weapon') {
            const sub = { ranged: 0, magic: 1, melee: 2 };
            clone.sort((a, b) => {
                const sd = (sub[a.def?.subtype] ?? 9) - (sub[b.def?.subtype] ?? 9);
                return sd !== 0 ? sd : (a.def?.power ?? 0) - (b.def?.power ?? 0);
            });
        } else if (key === 'armor') {
            // blocking undefined = shield → sort last
            clone.sort((a, b) => (a.def?.blocking ?? 999) - (b.def?.blocking ?? 999));
        } else if (key === 'melee' || key === 'ranged' || key === 'magic' || key === 'defense') {
            const kind = { cloak: 0, neck: 1, ring: 2, belt: 3 };
            clone.sort((a, b) => {
                const kd = (kind[a.def?.trinketKind] ?? 9) - (kind[b.def?.trinketKind] ?? 9);
                return kd !== 0 ? kd : (a.def?.bonusValue ?? 0) - (b.def?.bonusValue ?? 0);
            });
        }
        return clone;
    }

    /**
     * Classify an item into one of 9 display groups for the bag view.
     * Dual-aspect trinkets go into their secondary (non-defense) category.
     */
    _getBagGroup(itemId, def) {
        if (!def) return 'consumable';
        if (def.reagentTier || itemId === 'magical_reagent') return 'reagent';
        if (itemId === 'torch' || itemId === 'lantern' || itemId === 'lantern_oil') return 'light';
        if (def.category === 'weapon') return 'weapon';
        if (def.category === 'armor' || def.category === 'shield') return 'armor';
        if (def.category === 'trinket') {
            // Dual-aspect: sort by the non-defense secondary bonus
            if (def.dualAspect && def.bonusType2) return def.bonusType2; // 'melee'|'ranged'|'magic'
            return def.bonusType; // 'defense'|'melee'|'ranged'|'magic'
        }
        return 'consumable'; // food, potions, elixirs, scrolls, etc.
    }

    _renderGroup() {
        const state = this._getState();
        if (!state) return;
        const inv = state.inventory;
        const party = state.party;

        this.groupContent.innerHTML = '';

        // Gold
        const goldRow = document.createElement('div');
        goldRow.className = 'inv-gold-row';
        goldRow.innerHTML = `<span class="inv-gold-icon">&#x1F4B0;</span> <span class="inv-gold-amount">${inv.gold} Gold</span>`;
        this.groupContent.appendChild(goldRow);

        const summary = inv.getItemSummary();
        if (summary.length === 0) {
            const empty = document.createElement('div');
            empty.className = 'inv-empty';
            empty.textContent = 'No items in group inventory.';
            this.groupContent.appendChild(empty);
            return;
        }

        // Group definitions — order determines display order in the bag.
        const GROUP_META = [
            { key: 'reagent',    label: '🧪 Reagents'         },
            { key: 'light',      label: '🔦 Light Sources'    },
            { key: 'weapon',     label: '⚔️ Weapons'           },
            { key: 'armor',      label: '🛡️ Armor & Shields'   },
            { key: 'consumable', label: '🧴 Consumables'       },
            { key: 'magic',      label: '🔮 Magic Trinkets'    },
            { key: 'ranged',     label: '🏹 Ranged Trinkets'   },
            { key: 'melee',      label: '🗡️ Melee Trinkets'    },
            { key: 'defense',    label: '🛡️ Defense Trinkets'  },
        ];

        // Bucket items by group key
        const buckets = {};
        for (const g of GROUP_META) buckets[g.key] = [];
        for (const entry of summary) {
            const def = getItemDef(entry.itemId);
            const key = this._getBagGroup(entry.itemId, def);
            if (!buckets[key]) buckets[key] = [];
            buckets[key].push({ ...entry, def });
        }

        const eligible = party.filter(m => !m.isSummoned);

        // Render each non-empty group with a subheading
        for (const { key, label } of GROUP_META) {
            const raw = buckets[key];
            if (!raw || raw.length === 0) continue;
            const items = this._sortGroupItems(key, raw);

            // Subheading
            const heading = document.createElement('div');
            heading.className = 'inv-group-heading';
            heading.textContent = label;
            this.groupContent.appendChild(heading);

            for (const { itemId, quantity, def } of items) {
                if (!def) continue;

                const row = document.createElement('div');
                row.className = 'inv-item-row';

                const info = document.createElement('div');
                info.className = 'inv-item-info';
                const icon = def.icon || '';
                info.innerHTML = `<span class="inv-item-icon">${icon}</span>
                    <span class="inv-item-name">${def.name}</span>
                    <span class="inv-item-qty">x${quantity}</span>
                    <span class="inv-item-desc">${def.description}</span>`;
                info.title = this._getItemTooltip(def);
                row.appendChild(info);

                if (eligible.length > 0) {
                    const transferBtn = document.createElement('button');
                    transferBtn.className = 'inv-transfer-btn';
                    transferBtn.textContent = 'Give to...';
                    transferBtn.addEventListener('click', () => {
                        this._showTransferPicker(itemId, row);
                    });
                    row.appendChild(transferBtn);

                    // Use button for resurrection potion from group bag
                    if (itemId === 'resurrection_potion') {
                        const useBtn = document.createElement('button');
                        useBtn.className = 'inv-transfer-btn';
                        useBtn.textContent = 'Revive...';
                        useBtn.addEventListener('click', () => {
                            this._showRevivePicker(itemId, row, /*fromGroup*/ true);
                        });
                        row.appendChild(useBtn);
                    }
                    // Read button for party-wide scrolls from group bag
                    if (itemId === 'elixir_warding' || itemId === 'elixir_wrath') {
                        const readBtn = document.createElement('button');
                        readBtn.className = 'inv-transfer-btn';
                        readBtn.textContent = 'Read (party)';
                        const scrollAL = _artificerLevel(party);
                        const scrollBonusVal = calcScrollBonus(scrollAL);
                        const scrollDurMin = 5 + Math.floor(scrollAL / 2);
                        const scrollBonusKind = itemId === 'elixir_warding' ? 'defense' : 'all damage';
                        readBtn.title = `Grants all living party members +${scrollBonusVal} ${scrollBonusKind} for ${scrollDurMin} min.\n(Bonus = +2 base +1 per 5 AL; AL ${scrollAL} → +${scrollBonusVal})`;
                        readBtn.addEventListener('click', () => {
                            const anyone = party.find(m => !m.isSummoned && m.health > 0);
                            if (!anyone) return;
                            const applied = _applyPotion(anyone, itemId, party);
                            if (applied && state.inventory.removeItem(itemId)) {
                                soundManager.playPotion();
                                this._onChanged();
                                this._renderGroup();
                            }
                        });
                        row.appendChild(readBtn);
                    }
                }

                this.groupContent.appendChild(row);
            }
        }
    }

    _showTransferPicker(itemId, rowEl) {
        // Remove any existing picker
        const existing = rowEl.querySelector('.inv-transfer-picker');
        if (existing) { existing.remove(); return; }

        const state = this._getState();
        const picker = document.createElement('div');
        picker.className = 'inv-transfer-picker';

        for (const member of state.party) {
            if (member.isSummoned) continue;
            const btn = document.createElement('button');
            btn.className = 'inv-transfer-member-btn';
            btn.textContent = member.name;
            btn.addEventListener('click', () => {
                if (state.inventory.removeItem(itemId)) {
                    member.addItem(itemId);
                    this._onChanged();
                    this._renderGroup();
                }
            });
            picker.appendChild(btn);
        }

        rowEl.appendChild(picker);
    }

    /** Show picker for which (deceased) party member to revive. */
    _showRevivePicker(itemId, rowEl, fromGroup) {
        const existing = rowEl.querySelector('.inv-transfer-picker');
        if (existing) { existing.remove(); return; }

        const state = this._getState();
        const picker = document.createElement('div');
        picker.className = 'inv-transfer-picker';

        const deceased = state.party.filter(m => !m.isSummoned && m.health <= 0);
        if (deceased.length === 0) {
            const msg = document.createElement('div');
            msg.className = 'inv-revive-msg';
            msg.textContent = 'No fallen allies to revive.';
            picker.appendChild(msg);
        } else {
            for (const member of deceased) {
                const btn = document.createElement('button');
                btn.className = 'inv-transfer-member-btn';
                btn.textContent = `Revive ${member.name}`;
                btn.addEventListener('click', () => {
                    const removed = fromGroup
                        ? state.inventory.removeItem(itemId)
                        : member.removeItem(itemId);
                    if (removed) {
                        member.health  = member.maxHealth;
                        member.stamina = member.maxStamina;
                        member.mana    = member.maxMana;
                        soundManager.playPotion();
                        this._onChanged();
                        if (fromGroup) this._renderGroup();
                        else this._renderPersonal();
                    }
                });
                picker.appendChild(btn);
            }
        }

        rowEl.appendChild(picker);
    }

    // ────────────────────────────────────────────
    // Personal inventory
    // ────────────────────────────────────────────

    showPersonal(memberId) {
        this._activeMemberId = memberId;
        this.personalOverlay.style.display = 'flex';
        soundManager.playInventory();
        this._renderPersonal();
    }

    hidePersonal() {
        this.personalOverlay.style.display = 'none';
        this._activeMemberId = null;
    }

    get isPersonalOpen() {
        return this.personalOverlay.style.display === 'flex';
    }

    _renderPersonal() {
        const state = this._getState();
        if (!state) return;
        const member = state.party.find(m => m.id === this._activeMemberId);
        if (!member) return;

        this.personalContent.innerHTML = '';

        // Header with portrait and name
        const header = document.createElement('div');
        header.className = 'pinv-header';

        const portrait = document.createElement('img');
        portrait.className = 'pinv-portrait';
        const summonPreset = getSummonPreset(member);
        if (summonPreset) {
            portrait.src = this._getSummonPortraitURL(summonPreset);
        } else {
            portrait.src = this._getPortraitURL(member.portraitSeed, member.speciesId);
        }
        header.appendChild(portrait);

        const idBlock = document.createElement('div');
        idBlock.className = 'pinv-id-block';

        const nameEl = document.createElement('div');
        nameEl.className = 'pinv-name';
        // Show which character this is out of eligible (non-summoned) members
        const stateNow = this._getState();
        const eligibleMembers = stateNow ? stateNow.party.filter(m => !m.isSummoned) : [];
        const memberIdx = eligibleMembers.findIndex(m => m.id === this._activeMemberId);
        const navHint = eligibleMembers.length > 1
            ? ` (${memberIdx + 1}/${eligibleMembers.length}  ← →)`
            : '';
        nameEl.textContent = `${member.name}  L${member.level}${navHint}`;
        nameEl.title = eligibleMembers.length > 1 ? 'Use ← → arrow keys to cycle between party members' : '';
        idBlock.appendChild(nameEl);

        const cls = member.classDef;
        const sp  = member.speciesDef;
        const subtitle = document.createElement('div');
        subtitle.className = 'pinv-subtitle';
        if (summonPreset) {
            subtitle.textContent = `${summonPreset.icon}  ${summonPreset.speciesLabel || summonPreset.name}`;
            subtitle.title = summonPreset.description || '';
        } else {
            subtitle.textContent = `${cls.icon} ${cls.name}  ·  ${sp.icon} ${sp.name}`;
            subtitle.title = `${cls.description}\n\n${sp.description}`;
        }
        idBlock.appendChild(subtitle);

        // XP progress bar
        idBlock.appendChild(this._buildXpBar(member));

        header.appendChild(idBlock);

        this.personalContent.appendChild(header);

        // Combat Stats panel
        this.personalContent.appendChild(this._buildCombatStats(member));

        // Combat Row toggle
        this.personalContent.appendChild(this._buildRowToggle(member));

        // Ranger favored enemy picker
        if (member.classId === 'ranger' && !member.isSummoned) {
            this.personalContent.appendChild(this._buildFavoredEnemy(member));
        }

        // Equipment slots
        const eqSection = document.createElement('div');
        eqSection.className = 'pinv-section';
        eqSection.innerHTML = '<div class="pinv-section-title">Equipment</div>';

        eqSection.appendChild(this._equipSlot(member, 'weapon',  'Main Hand'));
        eqSection.appendChild(this._equipSlot(member, 'offhand', 'Off Hand'));
        eqSection.appendChild(this._equipSlot(member, 'armor',   'Armor'));
        eqSection.appendChild(this._equipSlot(member, 'shield',  'Shield'));

        // Trinket slots (Phase 8)
        eqSection.appendChild(this._equipSlot(member, 'cloak',  '\u{1F9E3} Cloak'));
        eqSection.appendChild(this._equipSlot(member, 'neck',   '\u{1F4FF} Neck'));
        eqSection.appendChild(this._equipSlot(member, 'ring1',  '\u{1F48D} Ring I'));
        eqSection.appendChild(this._equipSlot(member, 'ring2',  '\u{1F48D} Ring II'));
        eqSection.appendChild(this._equipSlot(member, 'belt',   '\u{1F45D} Belt'));

        this.personalContent.appendChild(eqSection);

        // Personal items
        const itemSection = document.createElement('div');
        itemSection.className = 'pinv-section';
        itemSection.innerHTML = '<div class="pinv-section-title">Backpack</div>';

        if (member.inventory.length === 0) {
            const empty = document.createElement('div');
            empty.className = 'pinv-empty';
            empty.textContent = 'Empty.';
            itemSection.appendChild(empty);
        } else {
            for (const entry of member.inventory) {
                const def = getItemDef(entry.itemId);
                if (!def) continue;

                const row = document.createElement('div');
                row.className = 'pinv-item-row';

                const icon = def.icon || '';
                const info = document.createElement('span');
                info.className = 'pinv-item-info';
                info.textContent = `${icon} ${def.name}${entry.quantity > 1 ? ` x${entry.quantity}` : ''}`;
                info.title = this._getItemTooltip(def);
                row.appendChild(info);

                const btnGroup = document.createElement('div');
                btnGroup.className = 'pinv-item-actions';

                // Equip button(s) — melee weapons get separate Main / Off buttons;
                // all other equippable categories get a single Equip button.
                if (def.category === ITEM_CATEGORY.WEAPON ||
                    def.category === ITEM_CATEGORY.ARMOR ||
                    def.category === ITEM_CATEGORY.SHIELD ||
                    def.category === ITEM_CATEGORY.TRINKET) {

                    const isMelee = def.category === ITEM_CATEGORY.WEAPON
                        && def.subtype === WEAPON_SUBTYPE.MELEE;

                    if (isMelee) {
                        // Main hand button
                        const mainBtn = document.createElement('button');
                        mainBtn.className = 'pinv-action-btn pinv-equip-btn';
                        mainBtn.textContent = 'Main';
                        const mainCheck = member.canEquip(entry.itemId, 'weapon');
                        if (!mainCheck.ok) {
                            mainBtn.disabled = true;
                            mainBtn.title = mainCheck.reason;
                            mainBtn.classList.add('pinv-equip-btn-disabled');
                        } else {
                            mainBtn.addEventListener('click', () => {
                                member.equip(entry.itemId, 'weapon');
                                this._onChanged();
                                this._renderPersonal();
                            });
                        }
                        btnGroup.appendChild(mainBtn);

                        // Off hand button
                        const offBtn = document.createElement('button');
                        offBtn.className = 'pinv-action-btn pinv-equip-btn';
                        offBtn.textContent = 'Off';
                        const offCheck = member.canEquip(entry.itemId, 'offhand');
                        if (!offCheck.ok) {
                            offBtn.disabled = true;
                            offBtn.title = offCheck.reason;
                            offBtn.classList.add('pinv-equip-btn-disabled');
                        } else {
                            offBtn.addEventListener('click', () => {
                                member.equip(entry.itemId, 'offhand');
                                this._onChanged();
                                this._renderPersonal();
                            });
                        }
                        btnGroup.appendChild(offBtn);
                    } else {
                        // Single Equip button for ranged/magic weapons, armor, shields, trinkets.
                        const equipBtn = document.createElement('button');
                        equipBtn.className = 'pinv-action-btn pinv-equip-btn';
                        equipBtn.textContent = 'Equip';
                        const check = member.canEquip(entry.itemId);
                        if (!check.ok) {
                            equipBtn.disabled = true;
                            equipBtn.title = check.reason || 'Cannot equip this item.';
                            equipBtn.classList.add('pinv-equip-btn-disabled');
                        } else {
                            equipBtn.addEventListener('click', () => {
                                member.equip(entry.itemId);
                                this._onChanged();
                                this._renderPersonal();
                            });
                        }
                        btnGroup.appendChild(equipBtn);
                    }
                }

                // Use button (consumables)
                if (def.category === ITEM_CATEGORY.CONSUMABLE) {
                    const USABLE_POTIONS = [
                        'healing_potion',
                        'minor_healing_potion',
                        'greater_healing_potion',
                        'elixir_warding',
                        'elixir_wrath',
                    ];
                    if (USABLE_POTIONS.indexOf(entry.itemId) !== -1) {
                        const useBtn = document.createElement('button');
                        useBtn.className = 'pinv-action-btn pinv-use-btn';
                        useBtn.textContent = 'Use';
                        // Scrolls: show dynamic bonus in tooltip
                        if (entry.itemId === 'elixir_warding' || entry.itemId === 'elixir_wrath') {
                            const sAL = _artificerLevel(state.party);
                            const sBonusVal = calcScrollBonus(sAL);
                            const sDurMin = 5 + Math.floor(sAL / 2);
                            const sBonusKind = entry.itemId === 'elixir_warding' ? 'defense' : 'all damage';
                            useBtn.title = `Grants all living party members +${sBonusVal} ${sBonusKind} for ${sDurMin} min.\n(+2 base +1 per 5 AL; AL ${sAL} → +${sBonusVal})`;
                        }
                        useBtn.addEventListener('click', () => {
                            const applied = _applyPotion(member, entry.itemId, state.party);
                            if (applied && member.removeItem(entry.itemId)) {
                                soundManager.playPotion();
                                this._onChanged();
                                this._renderPersonal();
                            }
                        });
                        btnGroup.appendChild(useBtn);
                    } else if (entry.itemId === 'resurrection_potion') {
                        const useBtn = document.createElement('button');
                        useBtn.className = 'pinv-action-btn pinv-use-btn';
                        useBtn.textContent = 'Revive...';
                        useBtn.addEventListener('click', () => {
                            this._showRevivePicker(entry.itemId, row, /*fromGroup*/ false);
                        });
                        btnGroup.appendChild(useBtn);
                    }
                }

                // Move to group
                const moveBtn = document.createElement('button');
                moveBtn.className = 'pinv-action-btn pinv-move-btn';
                moveBtn.textContent = 'To Group';
                moveBtn.addEventListener('click', () => {
                    if (member.removeItem(entry.itemId)) {
                        state.inventory.addItem(entry.itemId);
                        this._onChanged();
                        this._renderPersonal();
                    }
                });
                btnGroup.appendChild(moveBtn);

                row.appendChild(btnGroup);
                itemSection.appendChild(row);
            }
        }

        this.personalContent.appendChild(itemSection);

        // ── Party order reposition (non-summoned only) ───────────────────────
        if (!member.isSummoned && eligibleMembers.length > 1) {
            const reorderSection = document.createElement('div');
            reorderSection.className = 'pinv-section';
            reorderSection.innerHTML = '<div class="pinv-section-title">\u{1F500} Party Order</div>';

            const reorderRow = document.createElement('div');
            reorderRow.className = 'pinv-item-row';

            const label = document.createElement('span');
            label.className = 'pinv-item-info';
            label.textContent = 'Swap position with:';
            reorderRow.appendChild(label);

            const swapSel = document.createElement('select');
            swapSel.className = 'pinv-swap-select';
            const others = eligibleMembers.filter(m => m.id !== member.id);
            for (const other of others) {
                const opt = document.createElement('option');
                opt.value = other.id;
                opt.textContent = other.name;
                swapSel.appendChild(opt);
            }
            reorderRow.appendChild(swapSel);

            const swapBtn = document.createElement('button');
            swapBtn.className = 'pinv-action-btn';
            swapBtn.textContent = 'Swap';
            swapBtn.title = 'Swap this character\'s position in the party order (affects HUD slot display).';
            swapBtn.addEventListener('click', () => {
                const targetId = swapSel.value;
                const stateRef = this._getState();
                if (!stateRef) return;
                const idxA = stateRef.party.findIndex(m => m.id === member.id);
                const idxB = stateRef.party.findIndex(m => m.id === targetId);
                if (idxA !== -1 && idxB !== -1 && idxA !== idxB) {
                    const tmp = stateRef.party[idxA];
                    stateRef.party[idxA] = stateRef.party[idxB];
                    stateRef.party[idxB] = tmp;
                    this._onChanged();
                    this._renderPersonal();
                }
            });
            reorderRow.appendChild(swapBtn);

            reorderSection.appendChild(reorderRow);
            this.personalContent.appendChild(reorderSection);
        }
    }

    // ────────────────────────────────────────────
    // Stat panel helpers
    // ────────────────────────────────────────────

    _buildXpBar(member) {
        const wrap = document.createElement('div');
        wrap.className = 'pinv-xp-wrap';

        const label = document.createElement('div');
        label.className = 'pinv-xp-label';
        const progress = member.xpProgressThisLevel();
        const span     = member.xpSpanThisLevel();
        label.textContent = `XP ${member.xp} / ${member.xpNeededForNext()}  (this level: ${progress}/${span})`;
        wrap.appendChild(label);

        const bar = document.createElement('div');
        bar.className = 'xp-bar';
        const fill = document.createElement('div');
        fill.className = 'xp-bar-fill';
        const pct = span > 0 ? Math.min(100, (progress / span) * 100) : 100;
        fill.style.width = pct.toFixed(1) + '%';
        bar.appendChild(fill);
        wrap.appendChild(bar);

        return wrap;
    }

    _buildCombatStats(member) {
        const section = document.createElement('div');
        section.className = 'pinv-section pinv-stats';
        section.innerHTML = '<div class="pinv-section-title">Combat Stats</div>';

        const cls = member.classDef;
        const sp  = member.speciesDef;
        const beyond = Math.max(0, member.level - 1);

        // --- Pools (HP / ST / MP) ---
        const poolRow = document.createElement('div');
        poolRow.className = 'pinv-stat-row pinv-pool-row';
        poolRow.innerHTML = `
            <span class="pinv-stat-label">Pools:</span>
            <span class="pinv-stat-value">
              <span class="pool-hp">❤ ${member.health}/${member.maxHealth}</span>
              &nbsp;&nbsp;
              <span class="pool-st">⚡ ${member.stamina}/${member.maxStamina}</span>
              &nbsp;&nbsp;
              <span class="pool-mp">✨ ${member.mana}/${member.maxMana}</span>
            </span>`;
        poolRow.title =
            `Health / Stamina / Mana — current and maximum.\n` +
            `HP max scales with class (hpMod) and level-up gains.\n` +
            `Stamina fuels combat moves; mana fuels spells and summons.\n` +
            `Regen per minute:\n` +
            `  HP: ${member.getRegenRate('hp')}\n` +
            `  ST: ${member.getRegenRate('st')}\n` +
            `  MP: ${member.getRegenRate('mp')}`;
        section.appendChild(poolRow);

        // --- Defense breakdown ---
        const classDef  = (cls.defenseBonus || 0);
        const speciesDef = (sp.defenseBonus || 0);
        const perLevelDef = (cls.defensePerLevel || 0) * beyond;
        const armorBlock = member.getArmorBlocking();
        const trinketDef = member.getTrinketBonus('defense');
        const totalDef   = classDef + speciesDef + perLevelDef + armorBlock + trinketDef;

        const defRow = document.createElement('div');
        defRow.className = 'pinv-stat-row defense-row';
        defRow.innerHTML = `
            <span class="pinv-stat-label">🛡 Defense:</span>
            <span class="pinv-stat-value">${totalDef}</span>
            <span class="pinv-stat-breakdown">
              (class ${classDef} + species ${speciesDef} + level ${perLevelDef} + armor ${armorBlock} + trinkets ${trinketDef})
            </span>`;
        defRow.title =
            `Defense reduces incoming damage by this amount.\n` +
            `Class base:        ${classDef}\n` +
            `Species bonus:     ${speciesDef}\n` +
            `Per-level bonus:   ${perLevelDef} (+${cls.defensePerLevel || 0}/level)\n` +
            `Armor blocking:    ${armorBlock}\n` +
            `Trinket bonuses:   ${trinketDef}\n` +
            `Total:             ${totalDef}`;
        section.appendChild(defRow);

        // --- Damage bonuses ---
        section.appendChild(this._damageBonusRow(member, 'melee',  '⚔ Melee'));
        section.appendChild(this._damageBonusRow(member, 'ranged', '🏹 Ranged'));
        section.appendChild(this._damageBonusRow(member, 'magic',  '✨ Magic'));

        // --- Per-class scaling percentages, if any ---
        const perk = [];
        const perkDetails = [];

        if (cls.stunPerLevel) {
            const base = Math.round(MELEE_STUN_CHANCE * 100);
            const cur  = Math.round((MELEE_STUN_CHANCE + member.getMeleeStunBonus()) * 100);
            perk.push(`Stun on hit: ${cur}%`);
            perkDetails.push(`Warrior Stun: base ${base}% + ${cur - base}% from levels = ${cur}% total\n  (+${Math.round(cls.stunPerLevel * 100)}%/level, applied on melee hits)`);
        }
        if (cls.critPerLevel) {
            const base = Math.round(RANGED_CRIT_CHANCE * 100);
            const cur  = Math.round((RANGED_CRIT_CHANCE + member.getRangedCritBonus()) * 100);
            perk.push(`Ranged crit: ${cur}%`);
            perkDetails.push(`Ranger Crit: base ${base}% + ${cur - base}% from levels = ${cur}% total\n  (crit = 2× ranged damage; +${Math.round(cls.critPerLevel * 100)}%/level)`);
        }
        if (cls.magicStunPerLevel) {
            const base = 0;
            const cur  = Math.round(member.getMagicStunBonus() * 100);
            perk.push(`Magic stun: ${cur}%`);
            perkDetails.push(`Mage Magic Stun: base ${base}% + ${cur}% from levels = ${cur}% total\n  (+${Math.round(cls.magicStunPerLevel * 100)}%/level)`);
        }
        if (cls.instakillPerLevel) {
            const isRogue   = member.classId === 'rogue';
            const isPaladin = member.classId === 'paladin';
            if (isRogue) {
                const base = Math.round(BACKSTAB_INSTAKILL_CHANCE * 100);
                const cur  = Math.round((BACKSTAB_INSTAKILL_CHANCE + member.getInstakillBonus()) * 100);
                perk.push(`Backstab instakill: ${cur}%`);
                perkDetails.push(`Rogue Backstab Instakill: base ${base}% + ${cur - base}% from levels = ${cur}% total\n  (+${Math.round(cls.instakillPerLevel * 100)}%/level)`);
            } else if (isPaladin) {
                const base = Math.round((PALADIN_SMITE_INSTAKILL_BASE || 0) * 100);
                const cur  = Math.round(((PALADIN_SMITE_INSTAKILL_BASE || 0) + member.getInstakillBonus()) * 100);
                perk.push(`Smite instakill (Undead/Demon): ${cur}%`);
                perkDetails.push(`Paladin Smite Instakill vs Undead/Demon: base ${base}% + ${cur - base}% from levels = ${cur}% total\n  (Smite costs ${PALADIN_SMITE_MANA_COST} MP; +${Math.round(cls.instakillPerLevel * 100)}%/level)`);
            }
        }
        if (cls.dodgePerLevel) {
            const base = Math.round(MONK_DODGE_CHANCE * 100);
            const cur  = Math.round(member.getEffectiveDodgePct() * 100);
            perk.push(`Dodge: ${cur}%`);
            perkDetails.push(`Monk Dodge: base ${base}% + ${cur - base}% from levels = ${cur}% (cap 95%)\n  Costs ${MONK_DODGE_STAMINA_COST} ST + ${MONK_DODGE_MANA_COST} MP; reduces all damage by dodge% on non-dodge hits.\n  (+${Math.round(cls.dodgePerLevel * 100)}%/level)`);
        }
        if (cls.whirlwindPerLevel) {
            const base = Math.round(MONK_WHIRLWIND_CHANCE * 100);
            const cur  = Math.round((MONK_WHIRLWIND_CHANCE + member.getWhirlwindBonus()) * 100);
            perk.push(`Whirlwind: ${cur}%`);
            perkDetails.push(`Monk Whirlwind: base ${base}% + ${cur - base}% from levels = ${cur}% total\n  Chance to also hit EACH other enemy on melee. Costs ${MONK_MELEE_MANA_COST} extra MP per melee.\n  (+${Math.round(cls.whirlwindPerLevel * 100)}%/level)`);
        }
        if (cls.healPercentPerLevel) {
            const isCleric  = member.classId === 'cleric';
            const isPaladin = member.classId === 'paladin';
            const baseHeal  = isCleric ? CLERIC_HEAL_PERCENT : (PALADIN_HEAL_PERCENT || 0);
            const basePct   = Math.round(baseHeal * 100);
            const cur       = Math.round((baseHeal + member.getHealPercentBonus()) * 100);
            const costMP    = isCleric ? CLERIC_HEAL_MANA_COST : PALADIN_HEAL_MANA_COST;
            perk.push(`Heal: ${cur}% max HP`);
            perkDetails.push(`${isCleric ? 'Cleric' : 'Paladin'} Heal: base ${basePct}% + ${cur - basePct}% from levels = ${cur}% max HP restored\n  Costs ${costMP} MP per cast. (+${Math.round(cls.healPercentPerLevel * 100)}%/level)`);
        }
        if (cls.drainPerLevel) {
            const base = NECRO_LIFE_DRAIN_AMOUNT;
            const cur  = base + member.getDrainBonus();
            perk.push(`Life drain: ${Math.round(NECRO_LIFE_DRAIN_CHANCE * 100)}% chance, +${cur} HP`);
            perkDetails.push(`Necromancer Life Drain: ${Math.round(NECRO_LIFE_DRAIN_CHANCE * 100)}% chance per enemy hit by magic (AoE rolls independently)\n  Base drain: ${base} HP, current: ${cur} HP (heals self and own undead)\n  (+${cls.drainPerLevel} HP/level)`);
        }
        // Ranger favored enemy — show all selected tags + instakill pct
        if (member.classId === 'ranger') {
            const allFav = member.getAllFavoredEnemies();
            if (allFav.length > 0) {
                const ikPct  = Math.round(member.getFavoredEnemyInstakillChance() * 100);
                const tagStr = allFav.join(', ');
                perk.push(`Favored [${tagStr}]: ${ikPct}% instakill`);
                perkDetails.push(`Ranger Favored Enemies (${tagStr}): ignores defense, ${ikPct}% instakill chance\n  (1% per 3 levels; currently L${member.level})\n  Extra slots unlocked at L20, L25, L30…`);
            }
        }

        if (perk.length > 0) {
            const perkRow = document.createElement('div');
            perkRow.className = 'pinv-stat-row pinv-perk-row';
            perkRow.innerHTML = `<span class="pinv-stat-label">Class perks:</span>
                <span class="pinv-stat-value">${perk.join(', ')}</span>`;
            perkRow.title = perkDetails.join('\n\n');
            section.appendChild(perkRow);
        }

        return section;
    }

    _damageBonusRow(member, type, label) {
        const row = document.createElement('div');
        row.className = 'pinv-stat-row';
        const cls = member.classDef, sp = member.speciesDef;
        const beyond = Math.max(0, member.level - 1);
        const base =
            (type === 'melee'  ? (cls.meleeBonus  || 0) :
             type === 'ranged' ? (cls.rangedBonus || 0) :
                                 (cls.magicBonus  || 0));
        const speciesB =
            (type === 'melee'  ? (sp.meleeBonus  || 0) :
             type === 'ranged' ? (sp.rangedBonus || 0) :
                                 (sp.magicBonus  || 0));
        const perLevel =
            (type === 'melee'  ? (cls.meleePerLevel  || 0) :
             type === 'ranged' ? (cls.rangedPerLevel || 0) :
                                 (cls.magicPerLevel  || 0)) * beyond;
        const weapon  = member.getWeaponBonus(type);
        const trinket = member.getTrinketBonus(type);
        const total   = base + speciesB + perLevel + weapon + trinket;

        row.innerHTML = `
            <span class="pinv-stat-label">${label}:</span>
            <span class="pinv-stat-value">+${total}</span>
            <span class="pinv-stat-breakdown">
              (class ${base} + species ${speciesB} + level ${perLevel} + weapon ${weapon} + trinkets ${trinket})
            </span>`;
        row.title =
            `${label} damage bonus on top of weapon base roll.\n` +
            `Class bonus:     +${base}\n` +
            `Species bonus:   +${speciesB}\n` +
            `Per-level bonus: +${perLevel}\n` +
            `Weapon subtype:  +${weapon}\n` +
            `Trinket bonuses: +${trinket}\n` +
            `Total:           +${total}`;
        return row;
    }

    _buildRowToggle(member) {
        const section = document.createElement('div');
        section.className = 'pinv-section pinv-row-toggle';
        section.innerHTML = '<div class="pinv-section-title">Combat Row</div>';

        const help = document.createElement('div');
        help.className = 'pinv-row-help';
        help.textContent =
            'Front-row fighters draw all enemy attacks. Back-row characters ' +
            'are protected but cannot melee (rogues excepted).';
        section.appendChild(help);

        const btnWrap = document.createElement('div');
        btnWrap.className = 'pinv-row-btn-wrap';

        const mkBtn = (rowValue, label) => {
            const btn = document.createElement('button');
            btn.className = 'pinv-row-btn';
            if (member.row === rowValue) btn.classList.add('pinv-row-btn-active');
            btn.textContent = label;
            btn.addEventListener('click', () => {
                if (member.row !== rowValue) {
                    member.row = rowValue;
                    this._onChanged();
                    this._renderPersonal();
                }
            });
            return btn;
        };

        btnWrap.appendChild(mkBtn('front', '⚔ Front Row'));
        btnWrap.appendChild(mkBtn('back',  '🏹 Back Row'));
        section.appendChild(btnWrap);

        return section;
    }

    _buildFavoredEnemy(member) {
        const section = document.createElement('div');
        section.className = 'pinv-section pinv-favored-enemy';
        section.innerHTML = '<div class="pinv-section-title">🎯 Favored Enemy</div>';

        const inCombat = !!(this._inCombat);
        const extraSlots = member.getExtraFavoredEnemySlots();   // 0 below L20
        const instakillPct = Math.round(member.getFavoredEnemyInstakillChance() * 100);
        const allFav = member.getAllFavoredEnemies();

        const help = document.createElement('div');
        help.className = 'pinv-row-help';
        if (allFav.length > 0) {
            help.textContent = `Selected: ${allFav.join(', ')}. Ignores defense and has ${instakillPct}% instakill chance (1% per 3 levels) vs. these types.${extraSlots > 0 ? ` ${extraSlots} extra slot${extraSlots > 1 ? 's' : ''} unlocked.` : ''} Change any time outside combat.`;
        } else {
            help.textContent = `Choose a monster category to specialize against. Rangers ignore defense and gain a 1% per 3 levels instakill chance vs. their favored type.${extraSlots > 0 ? ` L20+ bonus: you have ${extraSlots} extra favored enemy slot${extraSlots > 1 ? 's' : ''}.` : ''}`;
        }
        section.appendChild(help);

        const FAVORED_TAGS = [
            { id: 'vermin',      label: '🐛 Vermin',      desc: 'Slimes, spiders, rats, bats, wasps, worms…' },
            { id: 'beast',       label: '🐾 Beasts',      desc: 'Spiders, bats, rats, basilisks, cave crawlers, yetis…' },
            { id: 'undead',      label: '💀 Undead',      desc: 'Skeletons, zombies, ghosts, wraiths, bone gnashers…' },
            { id: 'humanoid',    label: '👺 Humanoids',   desc: 'Goblins, orcs, trolls, kobolds, giants, stone hags…' },
            { id: 'demon',       label: '😈 Demons',      desc: 'Imps, flame imps, efreeti, dust devils…' },
            { id: 'monster',     label: '👾 Monsters',    desc: 'Mimics, fungi, shriekers, hydras, nagas…' },
            { id: 'dragon',      label: '🐉 Dragons',     desc: 'Drakes, red, black, blue, green, and white dragons…' },
            { id: 'elemental',   label: '🌀 Elementals',  desc: 'Fire, air, water, and earth elementals…' },
            { id: 'construct',   label: '🪆 Constructs',  desc: 'Gargoyles, golems, mechanical creatures…' },
            { id: 'aberration',  label: '🧠 Aberrations', desc: 'Beholders, mind flayers, tentacle horrors…' },
        ];

        // ── Slot builder helper ─────────────────────────────────────────────
        const buildSlot = (slotIndex) => {
            // slotIndex 0 = primary (favoredEnemy), 1+ = extraFavoredEnemies[slotIndex-1]
            const isPrimary = slotIndex === 0;
            const currentTag = isPrimary
                ? member.favoredEnemy
                : (member.extraFavoredEnemies[slotIndex - 1] || null);
            const slotLabel = document.createElement('div');
            slotLabel.className = 'pinv-row-help';
            slotLabel.style.fontWeight = 'bold';
            slotLabel.style.marginTop = slotIndex > 0 ? '6px' : '0';
            slotLabel.textContent = isPrimary
                ? `Primary Favored Enemy: ${currentTag || '(none)'}`
                : `Extra Slot ${slotIndex}: ${currentTag || '(none)'}`;
            section.appendChild(slotLabel);

            const btnWrap = document.createElement('div');
            btnWrap.className = 'pinv-row-btn-wrap';
            btnWrap.style.flexWrap = 'wrap';
            btnWrap.style.maxWidth = '340px';

            for (const tag of FAVORED_TAGS) {
                // A tag can only be in one slot at a time — disable if used in another slot
                const usedElsewhere = isPrimary
                    ? (member.extraFavoredEnemies || []).includes(tag.id)
                    : (member.favoredEnemy === tag.id ||
                       (member.extraFavoredEnemies || []).some((t, i) => i !== slotIndex - 1 && t === tag.id));

                const btn = document.createElement('button');
                btn.className = 'pinv-row-btn';
                if (currentTag === tag.id) btn.classList.add('pinv-row-btn-active');
                btn.textContent = tag.label;
                btn.title = tag.desc
                    + (usedElsewhere ? '\n(Already selected in another slot)' : '')
                    + (inCombat ? '\n(Cannot change during combat)' : '');

                if (inCombat || usedElsewhere) {
                    btn.disabled = true;
                    if (usedElsewhere) btn.style.opacity = '0.35';
                    else btn.style.opacity = '0.5';
                } else {
                    btn.addEventListener('click', () => {
                        if (isPrimary) {
                            member.favoredEnemy = (member.favoredEnemy === tag.id) ? null : tag.id;
                        } else {
                            if (!Array.isArray(member.extraFavoredEnemies)) member.extraFavoredEnemies = [];
                            const i = slotIndex - 1;
                            // Expand array if needed
                            while (member.extraFavoredEnemies.length < i) member.extraFavoredEnemies.push(null);
                            member.extraFavoredEnemies[i] = (member.extraFavoredEnemies[i] === tag.id) ? null : tag.id;
                            // Trim trailing nulls
                            while (member.extraFavoredEnemies.length > 0 &&
                                   !member.extraFavoredEnemies[member.extraFavoredEnemies.length - 1]) {
                                member.extraFavoredEnemies.pop();
                            }
                        }
                        this._onChanged();
                        this._renderPersonal();
                    });
                }
                btnWrap.appendChild(btn);
            }
            section.appendChild(btnWrap);
        };

        // Always show primary slot
        buildSlot(0);

        // Show extra slots for L20+ rangers
        for (let s = 1; s <= extraSlots; s++) {
            buildSlot(s);
        }

        if (extraSlots === 0 && member.level >= 15) {
            const nextUnlock = document.createElement('div');
            nextUnlock.className = 'pinv-row-help';
            nextUnlock.style.marginTop = '4px';
            nextUnlock.style.color = '#aaa';
            nextUnlock.textContent = `Reach level 20 to unlock an extra favored enemy slot (+1 more every 5 levels).`;
            section.appendChild(nextUnlock);
        }

        return section;
    }

    _equipSlot(member, slot, label) {
        const row = document.createElement('div');
        row.className = 'pinv-equip-slot';

        const slotLabel = document.createElement('span');
        slotLabel.className = 'pinv-slot-label';
        slotLabel.textContent = `${label}: `;
        row.appendChild(slotLabel);

        const itemId = member.equipment[slot];
        if (itemId) {
            const def = getItemDef(itemId);
            const nameEl = document.createElement('span');
            nameEl.className = 'pinv-equipped-name';
            const icon = def && def.icon ? def.icon + ' ' : '';
            nameEl.textContent = `${icon}${def ? def.name : itemId}`;
            const enchant = member.equipmentEnchants && member.equipmentEnchants[slot];
            if (def) nameEl.title = this._getItemTooltip(def, enchant);
            row.appendChild(nameEl);

            const unequipBtn = document.createElement('button');
            unequipBtn.className = 'pinv-action-btn pinv-unequip-btn';
            unequipBtn.textContent = 'Unequip';
            unequipBtn.addEventListener('click', () => {
                member.unequip(slot);
                this._onChanged();
                this._renderPersonal();
            });
            row.appendChild(unequipBtn);
        } else {
            const emptyEl = document.createElement('span');
            emptyEl.className = 'pinv-slot-empty';
            emptyEl.textContent = '(empty)';
            row.appendChild(emptyEl);
        }

        return row;
    }

    /** Generate detailed tooltip text for an item.
     * @param {object} def - Item definition
     * @param {object|null} enchant - Optional enchant info { level, rider, spiked, aoeWard }
     */
    _getItemTooltip(def, enchant) {
        if (!def) return '';
        const lines = [def.name];
        if (def.category === ITEM_CATEGORY.WEAPON) {
            const subtypeName = def.subtype ? def.subtype.charAt(0).toUpperCase() + def.subtype.slice(1) : '';
            lines.push(`${subtypeName} weapon`);
            lines.push(`+${def.power} ${subtypeName.toLowerCase()} damage`);
            if (enchant && enchant.level > 0) {
                lines.push(`✨ Enchanted +${enchant.level} (bonus damage)`);
            }
            if (enchant && enchant.rider) {
                const riderIcons = { fire: '🔥', acid: '🟢', poison: '🐍', lightning: '⚡', ice: '❄️' };
                const riderDescs = {
                    fire:      'Fire rider: deals bonus fire damage and may Burn target.',
                    acid:      'Acid rider: deals bonus acid damage and may reduce target defense.',
                    poison:    'Poison rider: applies venom DoT (damage over time) and reduces enemy damage output.',
                    lightning: 'Lightning rider: deals bonus lightning damage and may Shock target (-dmg).',
                    ice:       'Ice rider: deals bonus ice damage and may Chill target (-defense).',
                };
                const icon = riderIcons[enchant.rider] || '';
                const desc = riderDescs[enchant.rider] || `${enchant.rider} rider`;
                lines.push(`${icon} ${desc}`);
            }
        } else if (def.category === ITEM_CATEGORY.ARMOR) {
            const type = def.armorType ? def.armorType.charAt(0).toUpperCase() + def.armorType.slice(1) : '';
            if (type) lines.push(`${type} armor`);
            lines.push(`Blocks ${def.blocking} incoming damage`);
            if (enchant && enchant.level > 0) {
                lines.push(`✨ Enchanted +${enchant.level} (bonus defense)`);
            }
            if (enchant && enchant.spiked) {
                lines.push('🗡️ Spiked: reflects damage back to melee attackers.');
            }
            if (enchant && enchant.aoeWard) {
                lines.push('🛡️ AoE Ward: reduces incoming AoE magic damage.');
            }
        } else if (def.category === ITEM_CATEGORY.SHIELD) {
            lines.push('25% chance to completely block an attack');
            lines.push('Cannot be used while wielding a ranged weapon.');
            lines.push('Mages, Monks, and Necromancers cannot use shields.');
        } else if (def.category === ITEM_CATEGORY.TRINKET) {
            const kind  = def.trinketKind ? def.trinketKind.charAt(0).toUpperCase() + def.trinketKind.slice(1) : '';
            const bonus = def.bonusType   ? def.bonusType.charAt(0).toUpperCase()   + def.bonusType.slice(1)   : '';
            if (kind)  lines.push(`${kind} trinket (tier ${def.tier || 1})` + (def.dualAspect ? ' — Dual Aspect' : ''));
            if (bonus) lines.push(`+${def.bonusValue || 0} ${bonus}`);
            if (def.bonusType2) {
                const bonus2 = def.bonusType2.charAt(0).toUpperCase() + def.bonusType2.slice(1);
                lines.push(`+${def.bonusValue2 || 0} ${bonus2}`);
            }
            lines.push('Equips to: ' + (def.trinketSlots || []).join(' or '));
        } else if (def.category === ITEM_CATEGORY.CONSUMABLE) {
            lines.push(def.description);
        }
        return lines.join('\n');
    }

    _getPortraitURL(seed, speciesId) {
        const key = `${seed}:${speciesId || 'human'}`;
        if (!this._portraitCache.has(key)) {
            const canvas = generatePortrait(seed, speciesId);
            this._portraitCache.set(key, canvas.toDataURL());
        }
        return this._portraitCache.get(key);
    }

    _getSummonPortraitURL(summon) {
        const key = `summon:${summon.id}`;
        if (this._portraitCache.has(key)) return this._portraitCache.get(key);
        const size = 96;
        const canvas = document.createElement('canvas');
        canvas.width = size; canvas.height = size;
        const ctx = canvas.getContext('2d');
        const isUndead = summon.kind === 'undead';
        const grad = ctx.createRadialGradient(size/2, size/2, 6, size/2, size/2, size/2);
        if (isUndead) { grad.addColorStop(0, '#3b2a55'); grad.addColorStop(1, '#0e0a1b'); }
        else          { grad.addColorStop(0, '#2f5c2a'); grad.addColorStop(1, '#0c1a0a'); }
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, size, size);
        ctx.strokeStyle = isUndead ? '#6a4a9a' : '#4a8a44';
        ctx.lineWidth = 2;
        ctx.strokeRect(1, 1, size-2, size-2);
        ctx.font = `${Math.round(size * 0.52)}px serif`;
        ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
        ctx.fillText(summon.icon || '?', size/2, size/2 + 2);
        const url = canvas.toDataURL();
        this._portraitCache.set(key, url);
        return url;
    }
}
