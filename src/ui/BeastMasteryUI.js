import { PartyMember } from '../entities/PartyMember.js';
import { buildBeastCompanionStats } from '../entities/Summons.js';
import {
    RANGER_L35_UNLOCK_LEVEL,
    RANGER_BEAST_COMPANION_TYPES,
    RANGER_BEAST_MASTERY_REVIVE_COST_PER_LV,
} from '../utils/constants.js';
import { generateEnemySprite } from '../utils/SpriteGenerator.js';

export class BeastMasteryUI {
    constructor(getState, onChanged, systems = {}) {
        this._getState = getState;
        this._onChanged = onChanged || (() => {});
        this._log = typeof systems.logger === 'function' ? systems.logger : () => {};
        this._selectedRangerId = null;
        this._selectedBeastType = Object.keys(RANGER_BEAST_COMPANION_TYPES)[0];
        this._overlay = null;
        this._body = null;
        this._buildDOM();
    }

    get isOpen() {
        return this._overlay && this._overlay.style.display === 'flex';
    }

    show() {
        const rangers = this._eligibleRangers();
        if (rangers.length > 0 && (!this._selectedRangerId || !rangers.find(r => r.id === this._selectedRangerId))) {
            this._selectedRangerId = rangers[0].id;
        }
        this._render();
        this._overlay.style.display = 'flex';
        return true;
    }

    hide() {
        if (this._overlay) this._overlay.style.display = 'none';
    }

    _eligibleRangers() {
        const state = this._getState();
        if (!state || !Array.isArray(state.party)) return [];
        return state.party.filter(m => !m.isSummoned && m.classId === 'ranger' && m.health > 0 && (m.level || 0) >= RANGER_L35_UNLOCK_LEVEL);
    }

    _companionFor(ranger) {
        const state = this._getState();
        if (!state || !Array.isArray(state.party)) return null;
        return state.party.find(m =>
            m.isSummoned && m.isPersistent &&
            m.summonStats && m.summonStats.isBeastCompanion &&
            m.summonStats.summonerId === ranger.id
        ) || null;
    }

    _buildDOM() {
        const overlay = document.createElement('div');
        overlay.id = 'beast-mastery-overlay';
        Object.assign(overlay.style, {
            display: 'none',
            position: 'fixed',
            inset: '0',
            background: 'rgba(0,0,0,0.78)',
            zIndex: '1260',
            alignItems: 'center',
            justifyContent: 'center',
        });

        const panel = document.createElement('div');
        Object.assign(panel.style, {
            background: '#111a0f',
            border: '2px solid #4a8840',
            borderRadius: '10px',
            padding: '20px 24px',
            minWidth: '440px',
            maxWidth: '640px',
            maxHeight: '84vh',
            overflowY: 'auto',
            color: '#ddd',
            fontFamily: 'monospace',
            boxShadow: '0 0 26px rgba(80,180,60,0.28)',
        });

        const header = document.createElement('div');
        Object.assign(header.style, {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '14px',
            borderBottom: '1px solid #3d6a34',
            paddingBottom: '8px',
        });

        const title = document.createElement('span');
        title.textContent = '🐾 Beast Mastery  [P]';
        Object.assign(title.style, { fontSize: '16px', fontWeight: 'bold', color: '#a8e078' });

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
        overlay.addEventListener('click', (e) => { if (e.target === overlay) this.hide(); });
        overlay.addEventListener('keydown', (e) => { if (e.key === 'Escape') this.hide(); });
        document.body.appendChild(overlay);
        this._overlay = overlay;
    }

    _render() {
        if (!this._body) return;
        const state = this._getState();
        this._body.innerHTML = '';
        if (!state) return;

        const rangers = this._eligibleRangers();
        if (rangers.length === 0) {
            const empty = document.createElement('p');
            empty.style.color = '#aaa';
            empty.textContent = 'No living level 35+ ranger is available.';
            this._body.appendChild(empty);
            return;
        }

        const ranger = rangers.find(r => r.id === this._selectedRangerId) || rangers[0];
        this._selectedRangerId = ranger.id;
        const companion = this._companionFor(ranger);
        const gold = (state.inventory?.gold || 0);

        // Ranger selector + gold display
        const top = document.createElement('div');
        top.style.cssText = 'display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:12px;';
        const rangerSelect = document.createElement('select');
        rangerSelect.style.cssText = this._selectStyle();
        for (const r of rangers) {
            const opt = document.createElement('option');
            opt.value = r.id;
            opt.textContent = `${r.name} L${r.level}`;
            rangerSelect.appendChild(opt);
        }
        rangerSelect.value = ranger.id;
        rangerSelect.addEventListener('change', () => {
            this._selectedRangerId = rangerSelect.value;
            this._render();
        });
        const goldDiv = document.createElement('div');
        goldDiv.style.cssText = 'align-self:center;color:#ffd86a;text-align:right;';
        goldDiv.textContent = `Gold: ${gold.toLocaleString()}`;
        top.append(rangerSelect, goldDiv);
        this._body.appendChild(top);

        // Current companion status
        const statusBox = document.createElement('div');
        statusBox.style.cssText = 'background:#0e1a0a;border:1px solid #3a6030;border-radius:6px;padding:10px;margin-bottom:14px;color:#b8e8a0;';
        if (companion) {
            const alive = companion.health > 0;
            const bdef = RANGER_BEAST_COMPANION_TYPES[companion.summonStats.beastTypeId];
            statusBox.innerHTML = `<b>Current Companion:</b> ${bdef ? bdef.icon : '🐾'} ${companion.name}<br>`
                + `<span style="color:${alive ? '#7dde55' : '#e06060'}">Status: ${alive ? '✔ Alive' : '✖ Dead'}</span>`
                + (alive ? `  HP: ${companion.health}/${companion.maxHealth}` : '');
            if (!alive) {
                const reviveCost = (ranger.level || 1) * RANGER_BEAST_MASTERY_REVIVE_COST_PER_LV;
                const reviveBtn = document.createElement('button');
                reviveBtn.textContent = `Revive — ${reviveCost.toLocaleString()} gold`;
                reviveBtn.style.cssText = this._buttonStyle('#5a3010', '#c07020') + 'margin-top:8px;display:block;';
                reviveBtn.disabled = gold < reviveCost;
                reviveBtn.title = gold < reviveCost ? 'Not enough gold.' : 'Restore your fallen companion.';
                reviveBtn.addEventListener('click', () => this._reviveCompanion(ranger, companion, reviveCost));
                statusBox.appendChild(reviveBtn);
            }
        } else {
            statusBox.textContent = 'No companion bonded yet. Select a beast type and press Bond.';
        }
        this._body.appendChild(statusBox);

        // Beast type selector
        const selectLabel = document.createElement('label');
        selectLabel.style.cssText = 'display:flex;flex-direction:column;gap:5px;color:#a8e078;font-size:12px;margin-bottom:10px;';
        selectLabel.textContent = 'Choose Beast Type';
        const beastSelect = document.createElement('select');
        beastSelect.style.cssText = this._selectStyle();
        for (const [key, def] of Object.entries(RANGER_BEAST_COMPANION_TYPES)) {
            const opt = document.createElement('option');
            opt.value = key;
            opt.textContent = `${def.icon} ${def.name}`;
            beastSelect.appendChild(opt);
        }
        if (!RANGER_BEAST_COMPANION_TYPES[this._selectedBeastType]) {
            this._selectedBeastType = Object.keys(RANGER_BEAST_COMPANION_TYPES)[0];
        }
        beastSelect.value = this._selectedBeastType;
        beastSelect.addEventListener('change', () => {
            this._selectedBeastType = beastSelect.value;
            this._render();
        });
        selectLabel.appendChild(beastSelect);
        this._body.appendChild(selectLabel);

        // Description box
        const beastDef = RANGER_BEAST_COMPANION_TYPES[this._selectedBeastType];
        const descBox = document.createElement('div');
        descBox.style.cssText = 'background:#0e1a0a;border:1px solid #3a6030;border-radius:6px;padding:10px;margin-bottom:12px;color:#c8e8b0;font-size:12px;display:flex;gap:10px;align-items:flex-start;';
        const stat = (ranger.level || 1) * 2;
        const maxHp = Math.max(1, Math.floor((ranger.maxHealth || 1) * 1.5));

        const spriteCanvas = generateEnemySprite(beastDef.enemySprite, 42);
        const spriteImg = document.createElement('img');
        spriteImg.src = spriteCanvas.toDataURL();
        spriteImg.style.cssText = 'width:64px;height:64px;image-rendering:pixelated;flex-shrink:0;border:1px solid #3a6030;border-radius:4px;background:#050e04;';

        const textDiv = document.createElement('div');
        textDiv.style.cssText = 'flex:1;white-space:pre-line;';
        textDiv.textContent = `${beastDef.icon} ${beastDef.name}\n\n${beastDef.description}\n\nStats (at L${ranger.level}): HP ${maxHp}, ATK ${stat}–${stat * 2}, DEF ${stat}`;

        descBox.append(spriteImg, textDiv);
        this._body.appendChild(descBox);

        // Bond / Change button
        const alreadyThisType = companion && companion.health > 0 && companion.summonStats.beastTypeId === this._selectedBeastType;
        const companionAlive = companion && companion.health > 0;
        const bondBtn = document.createElement('button');
        if (!companion) {
            bondBtn.textContent = `Bond — ${beastDef.icon} ${beastDef.name} (free)`;
        } else if (companionAlive && companion.summonStats.beastTypeId !== this._selectedBeastType) {
            bondBtn.textContent = `Change to ${beastDef.icon} ${beastDef.name} (free)`;
        } else if (!companionAlive) {
            bondBtn.textContent = `Change to ${beastDef.icon} ${beastDef.name} (free — dismissed dead companion)`;
        } else {
            bondBtn.textContent = `${beastDef.icon} ${beastDef.name} — already bonded`;
        }
        bondBtn.style.cssText = this._buttonStyle('#244518', '#5db040') + 'width:100%;';
        bondBtn.disabled = alreadyThisType;
        bondBtn.addEventListener('click', () => this._bondBeast(ranger, companion));
        this._body.appendChild(bondBtn);
    }

    _bondBeast(ranger, existingCompanion) {
        const state = this._getState();
        if (!state || !Array.isArray(state.party)) return;

        // Remove existing companion (alive or dead — free change)
        if (existingCompanion) {
            const idx = state.party.indexOf(existingCompanion);
            if (idx !== -1) state.party.splice(idx, 1);
        }

        const bdef = RANGER_BEAST_COMPANION_TYPES[this._selectedBeastType];
        const stats = buildBeastCompanionStats(ranger, this._selectedBeastType);
        const beast = new PartyMember({
            name: `${ranger.name}'s ${bdef.name}`,
            classId: 'summoned',
            speciesId: 'beast',
            level: ranger.level || 1,
            maxHealth: stats.maxHealth,
            maxStamina: 0,
            maxMana: 0,
            isSummoned: true,
            isPersistent: true,
            summonType: bdef.summonType,
            summonerId: ranger.id,
            canBeHealed: true,
            row: bdef.row,
            summonStats: stats,
        });
        beast.health = beast.maxHealth;
        state.party.push(beast);
        this._log(`🐾 ${ranger.name} bonds with a ${bdef.name}!`);
        this._onChanged();
        this._render();
    }

    _reviveCompanion(ranger, companion, cost) {
        const state = this._getState();
        if (!state || !state.inventory) return;
        if ((state.inventory.gold || 0) < cost) return;
        if (typeof state.inventory.removeGold === 'function') state.inventory.removeGold(cost);
        else state.inventory.gold = Math.max(0, (state.inventory.gold || 0) - cost);

        companion.health = companion.maxHealth;
        this._log(`🐾 ${ranger.name}'s ${companion.name} is revived for ${cost} gold!`);
        this._onChanged();
        this._render();
    }

    _selectStyle() {
        return 'width:100%;background:#111f0c;color:#d8f0c0;border:1px solid #4a7a30;border-radius:4px;padding:6px;';
    }

    _buttonStyle(bg, border) {
        return `background:${bg};border:1px solid ${border};color:#e8f8d8;border-radius:4px;padding:7px 10px;cursor:pointer;`;
    }
}
