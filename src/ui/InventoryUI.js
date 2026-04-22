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

import { getItemDef, ITEM_CATEGORY } from '../items/ItemTypes.js';
import { generatePortrait } from '../utils/PortraitGenerator.js';
import { soundManager } from '../utils/SoundManager.js';
import {
    POTION_MINOR_HEAL_PCT, POTION_GREATER_HEAL_PCT,
    POTION_WARD_DEF_BONUS, POTION_WRATH_DMG_BONUS,
    POTION_BUFF_DURATION_SEC,
} from '../utils/constants.js';

/**
 * Apply a potion's effect to a PartyMember. Returns true if the potion
 * actually did something (e.g. healed someone already at full HP returns
 * false so we don't consume the item). Timed elixirs always "work".
 */
function _applyPotion(member, itemId) {
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
            member.addEffect({
                type: 'elixir_warding',
                defenseBonus: POTION_WARD_DEF_BONUS,
                expiresAt: Date.now() + POTION_BUFF_DURATION_SEC * 1000,
            });
            return true;
        }
        case 'elixir_wrath': {
            member.addEffect({
                type: 'elixir_wrath',
                damageBonus: POTION_WRATH_DMG_BONUS,
                expiresAt: Date.now() + POTION_BUFF_DURATION_SEC * 1000,
            });
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

        // Items
        const summary = inv.getItemSummary();
        if (summary.length === 0) {
            const empty = document.createElement('div');
            empty.className = 'inv-empty';
            empty.textContent = 'No items in group inventory.';
            this.groupContent.appendChild(empty);
        } else {
            for (const { itemId, quantity } of summary) {
                const def = getItemDef(itemId);
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

                // Transfer button (any item, to any non-summoned party member)
                const eligible = party.filter(m => !m.isSummoned);
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
        portrait.src = this._getPortraitURL(member.portraitSeed, member.speciesId);
        header.appendChild(portrait);

        const idBlock = document.createElement('div');
        idBlock.className = 'pinv-id-block';

        const nameEl = document.createElement('div');
        nameEl.className = 'pinv-name';
        nameEl.textContent = `${member.name}  L${member.level}`;
        idBlock.appendChild(nameEl);

        const cls = member.classDef;
        const sp  = member.speciesDef;
        const subtitle = document.createElement('div');
        subtitle.className = 'pinv-subtitle';
        subtitle.textContent = `${cls.icon} ${cls.name}  ·  ${sp.icon} ${sp.name}`;
        subtitle.title = `${cls.description}\n\n${sp.description}`;
        idBlock.appendChild(subtitle);

        // XP progress bar
        idBlock.appendChild(this._buildXpBar(member));

        header.appendChild(idBlock);

        this.personalContent.appendChild(header);

        // Combat Stats panel
        this.personalContent.appendChild(this._buildCombatStats(member));

        // Combat Row toggle
        this.personalContent.appendChild(this._buildRowToggle(member));

        // Equipment slots
        const eqSection = document.createElement('div');
        eqSection.className = 'pinv-section';
        eqSection.innerHTML = '<div class="pinv-section-title">Equipment</div>';

        eqSection.appendChild(this._equipSlot(member, 'weapon', 'Weapon'));
        eqSection.appendChild(this._equipSlot(member, 'armor',  'Armor'));
        eqSection.appendChild(this._equipSlot(member, 'shield', 'Shield'));

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

                // Equip button (weapons, armor, shields, trinkets)
                if (def.category === ITEM_CATEGORY.WEAPON ||
                    def.category === ITEM_CATEGORY.ARMOR ||
                    def.category === ITEM_CATEGORY.SHIELD ||
                    def.category === ITEM_CATEGORY.TRINKET) {
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
                        useBtn.addEventListener('click', () => {
                            const applied = _applyPotion(member, entry.itemId);
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
        if (cls.stunPerLevel)         perk.push(`Stun on hit: ${(member.getMeleeStunBonus() * 100).toFixed(0)}%`);
        if (cls.critPerLevel)         perk.push(`Ranged crit: ${(member.getRangedCritBonus() * 100).toFixed(0)}%`);
        if (cls.magicStunPerLevel)    perk.push(`Magic stun: ${(member.getMagicStunBonus() * 100).toFixed(0)}%`);
        if (cls.instakillPerLevel)    perk.push(`Instakill: ${(member.getInstakillBonus() * 100).toFixed(0)}%`);
        if (cls.dodgePerLevel)        perk.push(`Dodge: ${(member.getEffectiveDodgePct() * 100).toFixed(0)}% (all dmg taken reduced by same %; cap 95%)`);
        if (cls.whirlwindPerLevel)    perk.push(`Whirlwind: ${(member.getWhirlwindBonus() * 100).toFixed(0)}%`);
        if (cls.healPercentPerLevel)  perk.push(`Heal+: ${(member.getHealPercentBonus() * 100).toFixed(0)}%`);
        if (cls.drainPerLevel)        perk.push(`Drain +${member.getDrainBonus()} HP`);

        if (perk.length > 0) {
            const perkRow = document.createElement('div');
            perkRow.className = 'pinv-stat-row pinv-perk-row';
            perkRow.innerHTML = `<span class="pinv-stat-label">Class perks:</span>
                <span class="pinv-stat-value">${perk.join(', ')}</span>`;
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
            if (def) nameEl.title = this._getItemTooltip(def);
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

    /** Generate detailed tooltip text for an item. */
    _getItemTooltip(def) {
        if (!def) return '';
        const lines = [def.name];
        if (def.category === ITEM_CATEGORY.WEAPON) {
            const subtypeName = def.subtype ? def.subtype.charAt(0).toUpperCase() + def.subtype.slice(1) : '';
            lines.push(`${subtypeName} weapon`);
            lines.push(`+${def.power} ${subtypeName.toLowerCase()} damage`);
        } else if (def.category === ITEM_CATEGORY.ARMOR) {
            const type = def.armorType ? def.armorType.charAt(0).toUpperCase() + def.armorType.slice(1) : '';
            if (type) lines.push(`${type} armor`);
            lines.push(`Blocks ${def.blocking} incoming damage`);
        } else if (def.category === ITEM_CATEGORY.SHIELD) {
            lines.push('25% chance to completely block an attack');
            lines.push('Cannot be used while wielding a ranged weapon.');
            lines.push('Mages, Monks, and Necromancers cannot use shields.');
        } else if (def.category === ITEM_CATEGORY.TRINKET) {
            const kind  = def.trinketKind ? def.trinketKind.charAt(0).toUpperCase() + def.trinketKind.slice(1) : '';
            const bonus = def.bonusType   ? def.bonusType.charAt(0).toUpperCase()   + def.bonusType.slice(1)   : '';
            if (kind)  lines.push(`${kind} trinket (tier ${def.tier || 1})`);
            if (bonus) lines.push(`+${def.bonusValue || 0} ${bonus}`);
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
}
