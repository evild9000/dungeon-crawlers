import {
    MAGE_FAMILIAR_GOLD_PER_LEVEL,
} from '../utils/constants.js';
import { getFamiliarDef, FAMILIAR_TYPES } from '../entities/Familiars.js';

export class FamiliarUI {
    constructor(getState, onChanged, systems = {}) {
        this._getState = getState;
        this._onChanged = onChanged || (() => {});
        this._log = typeof systems.logger === 'function' ? systems.logger : () => {};
        this._selectedMageId = null;
        this._overlay = null;
        this._body = null;
        this._buildDOM();
    }

    get isOpen() {
        return this._overlay && this._overlay.style.display === 'flex';
    }

    show() {
        const mages = this._eligibleMages();
        if (mages.length > 0 && (!this._selectedMageId || !mages.find(m => m.id === this._selectedMageId))) {
            this._selectedMageId = mages[0].id;
        }
        this._render();
        this._overlay.style.display = 'flex';
        return true;
    }

    hide() {
        if (this._overlay) this._overlay.style.display = 'none';
    }

    _eligibleMages() {
        const state = this._getState();
        if (!state || !Array.isArray(state.party)) return [];
        return state.party.filter(m => !m.isSummoned && m.classId === 'mage' && (m.level || 0) >= 25);
    }

    _buildDOM() {
        const overlay = document.createElement('div');
        overlay.id = 'familiar-overlay';
        Object.assign(overlay.style, {
            display: 'none',
            position: 'fixed',
            inset: '0',
            background: 'rgba(0,0,0,0.78)',
            zIndex: '1250',
            alignItems: 'center',
            justifyContent: 'center',
        });

        const panel = document.createElement('div');
        Object.assign(panel.style, {
            background: '#16162a',
            border: '2px solid #6666aa',
            borderRadius: '10px',
            padding: '20px 24px',
            minWidth: '360px',
            maxWidth: '540px',
            maxHeight: '82vh',
            overflowY: 'auto',
            color: '#ddd',
            fontFamily: 'monospace',
            boxShadow: '0 0 24px rgba(100,100,255,0.35)',
        });

        const header = document.createElement('div');
        Object.assign(header.style, {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '14px',
            borderBottom: '1px solid #4a4a8a',
            paddingBottom: '8px',
        });

        const title = document.createElement('span');
        title.textContent = '🪄 Mage Familiar  [F]';
        Object.assign(title.style, { fontSize: '16px', fontWeight: 'bold', color: '#b8b8ff' });

        const closeBtn = document.createElement('button');
        closeBtn.textContent = '✕';
        Object.assign(closeBtn.style, {
            background: 'none',
            border: 'none',
            color: '#aaa',
            cursor: 'pointer',
            fontSize: '18px',
            lineHeight: '1',
        });
        closeBtn.addEventListener('click', () => this.hide());
        header.append(title, closeBtn);

        this._body = document.createElement('div');
        panel.append(header, this._body);
        overlay.append(panel);
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) this.hide();
        });
        document.body.appendChild(overlay);
        this._overlay = overlay;
    }

    _render() {
        if (!this._body) return;
        const state = this._getState();
        this._body.innerHTML = '';
        if (!state) return;

        const mages = this._eligibleMages();
        if (mages.length === 0) {
            const empty = document.createElement('div');
            empty.textContent = 'No valid mages. A mage must be level 25 or higher to summon or manage a familiar.';
            empty.style.color = '#888';
            this._body.appendChild(empty);
            return;
        }

        const mage = mages.find(m => m.id === this._selectedMageId) || mages[0];
        this._selectedMageId = mage.id;

        const gold = document.createElement('div');
        gold.textContent = `💰 Gold: ${state.inventory.gold.toLocaleString()}`;
        gold.style.marginBottom = '10px';
        this._body.appendChild(gold);

        const pickerRow = document.createElement('div');
        pickerRow.style.marginBottom = '12px';
        const label = document.createElement('label');
        label.textContent = 'Mage: ';
        pickerRow.appendChild(label);
        const select = document.createElement('select');
        Object.assign(select.style, {
            background: '#202040',
            color: '#ddd',
            border: '1px solid #666',
            borderRadius: '4px',
            padding: '4px 8px',
        });
        for (const entry of mages) {
            const opt = document.createElement('option');
            opt.value = entry.id;
            opt.textContent = `${entry.name} (Lv ${entry.level})`;
            if (entry.id === mage.id) opt.selected = true;
            select.appendChild(opt);
        }
        select.addEventListener('change', () => {
            this._selectedMageId = select.value;
            this._render();
        });
        pickerRow.appendChild(select);
        this._body.appendChild(pickerRow);

        const cap = mage.getFamiliarLevelCap ? mage.getFamiliarLevelCap() : 0;
        const fam = mage.getFamiliarSummary ? mage.getFamiliarSummary() : null;
        const summary = document.createElement('div');
        summary.style.cssText = 'margin-bottom:12px;padding:10px;border:1px solid #444a77;border-radius:8px;background:#1d1d36;';
        summary.innerHTML = fam
            ? `<div style="font-weight:bold;margin-bottom:4px;">${fam.icon} ${fam.name} the ${fam.typeName}</div>
               <div>Level ${fam.level}/${cap}</div>
               <div>Bonuses: +${fam.magicBonusPct}% magic/AoE damage, +${fam.defenseBonus} defense</div>`
            : `<div style="font-weight:bold;margin-bottom:4px;">No familiar summoned</div>
               <div>This mage can summon a permanent familiar beginning at level 1.</div>
               <div>Current level cap: ${cap}</div>`;
        this._body.appendChild(summary);

        if (!fam) {
            this._body.appendChild(this._buildSummonForm(state, mage));
        } else {
            this._body.appendChild(this._buildUpgradePanel(state, mage, fam, cap));
        }
    }

    _buildSummonForm(state, mage) {
        const wrap = document.createElement('div');
        wrap.style.cssText = 'display:grid;gap:10px;';

        const info = document.createElement('div');
        info.textContent = `First summon cost: ${MAGE_FAMILIAR_GOLD_PER_LEVEL.toLocaleString()} gold. Familiar type and name cannot be changed later.`;
        info.style.color = '#bbb';
        wrap.appendChild(info);

        const typeRow = document.createElement('div');
        const typeLabel = document.createElement('div');
        typeLabel.textContent = 'Familiar type';
        typeLabel.style.marginBottom = '4px';
        typeRow.appendChild(typeLabel);
        const typeSelect = document.createElement('select');
        Object.assign(typeSelect.style, {
            width: '100%',
            background: '#202040',
            color: '#ddd',
            border: '1px solid #666',
            borderRadius: '4px',
            padding: '6px 8px',
        });
        for (const def of FAMILIAR_TYPES) {
            const opt = document.createElement('option');
            opt.value = def.id;
            opt.textContent = `${def.icon} ${def.name}`;
            typeSelect.appendChild(opt);
        }
        typeRow.appendChild(typeSelect);
        wrap.appendChild(typeRow);

        const nameRow = document.createElement('div');
        const nameLabel = document.createElement('div');
        nameLabel.textContent = 'Familiar name';
        nameLabel.style.marginBottom = '4px';
        nameRow.appendChild(nameLabel);
        const nameInput = document.createElement('input');
        nameInput.type = 'text';
        nameInput.maxLength = 24;
        nameInput.placeholder = 'Enter permanent familiar name';
        Object.assign(nameInput.style, {
            width: '100%',
            background: '#202040',
            color: '#ddd',
            border: '1px solid #666',
            borderRadius: '4px',
            padding: '6px 8px',
            boxSizing: 'border-box',
        });
        nameRow.appendChild(nameInput);
        wrap.appendChild(nameRow);

        const btn = document.createElement('button');
        btn.textContent = `Summon Familiar (${MAGE_FAMILIAR_GOLD_PER_LEVEL.toLocaleString()}g)`;
        Object.assign(btn.style, this._primaryButtonStyle(state.inventory.gold >= MAGE_FAMILIAR_GOLD_PER_LEVEL));
        btn.disabled = state.inventory.gold < MAGE_FAMILIAR_GOLD_PER_LEVEL;
        btn.addEventListener('click', () => {
            const chosen = getFamiliarDef(typeSelect.value);
            const name = (nameInput.value || '').trim();
            if (!chosen) return;
            if (!name) {
                this._log('Choose a permanent name before summoning the familiar.');
                return;
            }
            if (state.inventory.gold < MAGE_FAMILIAR_GOLD_PER_LEVEL) {
                this._log('Not enough gold to summon a familiar.');
                return;
            }
            mage.familiar = { typeId: chosen.id, name: name.slice(0, 24), level: 1 };
            state.inventory.gold -= MAGE_FAMILIAR_GOLD_PER_LEVEL;
            this._log(`🪄 ${mage.name} summons ${chosen.icon} ${mage.familiar.name} the ${chosen.name}!`);
            this._onChanged();
            this._render();
        });
        wrap.appendChild(btn);

        return wrap;
    }

    _buildUpgradePanel(state, mage, fam, cap) {
        const wrap = document.createElement('div');
        wrap.style.cssText = 'display:grid;gap:10px;';

        const locked = document.createElement('div');
        locked.textContent = `Type: ${fam.icon} ${fam.typeName}  •  Name: ${fam.name}`;
        locked.style.color = '#bbb';
        wrap.appendChild(locked);

        if (fam.level >= cap) {
            const capMsg = document.createElement('div');
            capMsg.textContent = `Current cap reached. Raise ${mage.name} above level ${24 + fam.level} to upgrade further.`;
            capMsg.style.color = '#bbb';
            wrap.appendChild(capMsg);
            return wrap;
        }

        const newLevel = fam.level + 1;
        const cost = MAGE_FAMILIAR_GOLD_PER_LEVEL * newLevel;
        const nextBonusPct = newLevel * 10;
        const nextDefense = newLevel;

        const details = document.createElement('div');
        details.innerHTML = `Next level: <b>${newLevel}</b><br>Cost: <b>${cost.toLocaleString()} gold</b><br>Next bonuses: +${nextBonusPct}% magic/AoE damage, +${nextDefense} defense`;
        wrap.appendChild(details);

        const btn = document.createElement('button');
        btn.textContent = `Upgrade to Level ${newLevel} (${cost.toLocaleString()}g)`;
        Object.assign(btn.style, this._primaryButtonStyle(state.inventory.gold >= cost));
        btn.disabled = state.inventory.gold < cost;
        btn.addEventListener('click', () => {
            if (state.inventory.gold < cost) {
                this._log('Not enough gold to upgrade this familiar.');
                return;
            }
            state.inventory.gold -= cost;
            mage.familiar.level = newLevel;
            this._log(`🪄 ${mage.name}'s familiar ${fam.name} grows to level ${newLevel}.`);
            this._onChanged();
            this._render();
        });
        wrap.appendChild(btn);

        return wrap;
    }

    _primaryButtonStyle(enabled) {
        return {
            background: enabled ? '#3f4fb3' : '#444',
            color: enabled ? '#fff' : '#999',
            border: '1px solid #6a78d1',
            borderRadius: '6px',
            padding: '8px 10px',
            cursor: enabled ? 'pointer' : 'not-allowed',
            fontWeight: 'bold',
        };
    }
}
