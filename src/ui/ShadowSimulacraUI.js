import { PartyMember } from '../entities/PartyMember.js';
import { PHOTOMANCER_SIMULACRUM_UNLOCK_LEVEL } from '../utils/constants.js';
import {
    SHADOW_SIMULACRA_TYPE,
    buildShadowSimulacraStats,
    getAvailableShadowPowers,
    getShadowPower,
    getShadowPowerName,
    getShadowSimulacraCost,
    getShadowSimulacraLimit,
    getShadowSimulacraSlotCount,
    isShadowSimulacra,
    normalizeShadowSimulacraAttackType,
    normalizeShadowPowers,
} from '../entities/ShadowSimulacra.js';

export class ShadowSimulacraUI {
    constructor(getState, onChanged, systems = {}) {
        this._getState = getState;
        this._onChanged = onChanged || (() => {});
        this._log = typeof systems.logger === 'function' ? systems.logger : () => {};
        this._selectedPhotomancerId = null;
        this._selectedPowers = [];
        this._selectedAttackType = 'melee';
        this._overlay = null;
        this._body = null;
        this._buildDOM();
    }

    get isOpen() {
        return this._overlay && this._overlay.style.display === 'flex';
    }

    show() {
        const photos = this._eligiblePhotomancers();
        if (photos.length > 0 && (!this._selectedPhotomancerId || !photos.find(p => p.id === this._selectedPhotomancerId))) {
            this._selectedPhotomancerId = photos[0].id;
        }
        this._render();
        this._overlay.style.display = 'flex';
        return true;
    }

    hide() {
        if (this._overlay) this._overlay.style.display = 'none';
    }

    _eligiblePhotomancers() {
        const state = this._getState();
        if (!state || !Array.isArray(state.party)) return [];
        return state.party.filter(m => !m.isSummoned && m.classId === 'photomancer' && m.health > 0 && (m.level || 0) >= PHOTOMANCER_SIMULACRUM_UNLOCK_LEVEL);
    }

    _ensureTemplates(state) {
        if (!Array.isArray(state.shadowSimulacraTemplates)) state.shadowSimulacraTemplates = [];
        return state.shadowSimulacraTemplates;
    }

    _buildDOM() {
        const overlay = document.createElement('div');
        overlay.id = 'shadow-simulacra-overlay';
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
            background: '#11121c',
            border: '2px solid #7b5cad',
            borderRadius: '10px',
            padding: '20px 24px',
            minWidth: '420px',
            maxWidth: '760px',
            maxHeight: '84vh',
            overflowY: 'auto',
            color: '#ddd',
            fontFamily: 'monospace',
            boxShadow: '0 0 26px rgba(150,90,220,0.32)',
        });

        const header = document.createElement('div');
        Object.assign(header.style, {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '14px',
            borderBottom: '1px solid #5f4a8f',
            paddingBottom: '8px',
        });

        const title = document.createElement('span');
        title.textContent = '🌑 Shadow Simulacra  [N]';
        Object.assign(title.style, { fontSize: '16px', fontWeight: 'bold', color: '#d5c0ff' });

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
        overlay.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') this.hide();
        });
        document.body.appendChild(overlay);
        this._overlay = overlay;
    }

    _render() {
        if (!this._body) return;
        const state = this._getState();
        this._body.innerHTML = '';
        if (!state) return;

        const photos = this._eligiblePhotomancers();
        if (photos.length === 0) {
            const empty = document.createElement('p');
            empty.style.color = '#aaa';
            empty.textContent = 'No living level 30+ photomancer is available.';
            this._body.appendChild(empty);
            return;
        }

        const selected = photos.find(p => p.id === this._selectedPhotomancerId) || photos[0];
        this._selectedPhotomancerId = selected.id;
        const slotCount = getShadowSimulacraSlotCount(selected);
        this._selectedPowers = normalizeShadowPowers(this._selectedPowers, slotCount);
        while (this._selectedPowers.length < slotCount) this._selectedPowers.push('');

        const top = document.createElement('div');
        top.style.cssText = 'display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:12px;';
        const photoSelect = document.createElement('select');
        photoSelect.style.cssText = this._selectStyle();
        for (const p of photos) {
            const opt = document.createElement('option');
            opt.value = p.id;
            opt.textContent = `${p.name} L${p.level}`;
            photoSelect.appendChild(opt);
        }
        photoSelect.value = selected.id;
        photoSelect.addEventListener('change', () => {
            this._selectedPhotomancerId = photoSelect.value;
            this._selectedPowers = [];
            this._selectedAttackType = 'melee';
            this._render();
        });

        const gold = document.createElement('div');
        gold.style.cssText = 'align-self:center;color:#ffd86a;text-align:right;';
        gold.textContent = `Gold: ${(state.inventory?.gold || 0).toLocaleString()}`;
        top.append(photoSelect, gold);
        this._body.appendChild(top);

        const owned = (state.party || []).filter(p => isShadowSimulacra(p) && p.isPersistent && p.summonerId === selected.id);
        const cap = getShadowSimulacraLimit(selected);
        const cost = getShadowSimulacraCost(selected);
        const summary = document.createElement('div');
        summary.style.cssText = 'color:#bbaee5;margin-bottom:12px;line-height:1.45;';
        summary.textContent = `Limit ${owned.length}/${cap}. Cost ${cost.toLocaleString()} gold. ${slotCount} power slot${slotCount !== 1 ? 's' : ''} from photomancer level.`;
        this._body.appendChild(summary);

        this._body.appendChild(this._buildExistingSimulacraSection(state, selected, owned));

        this._body.appendChild(this._buildTemplateRow(state, slotCount));

        const grid = document.createElement('div');
        grid.style.cssText = 'display:grid;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));gap:8px;margin:12px 0;';
        for (let i = 0; i < slotCount; i++) {
            grid.appendChild(this._buildPowerSelect(i));
        }
        this._body.appendChild(grid);

        this._body.appendChild(this._buildAttackTypeSelect());

        const preview = document.createElement('div');
        preview.style.cssText = 'background:#171326;border:1px solid #433665;padding:10px;border-radius:6px;color:#cfc6ec;margin-bottom:12px;white-space:pre-line;';
        preview.textContent = this._previewText(selected);
        this._body.appendChild(preview);

        const formBtn = document.createElement('button');
        formBtn.textContent = `Form Shadow Simulacra — ${cost.toLocaleString()} gold`;
        formBtn.style.cssText = this._buttonStyle('#4d2f78', '#8f67d0');
        const hasPower = this._selectedPowers.some(Boolean);
        formBtn.disabled = !hasPower || owned.length >= cap || !state.inventory || (state.inventory.gold || 0) < cost;
        formBtn.title = hasPower
            ? 'Create a permanent Shadow Simulacra from the selected powers.'
            : 'Select at least one power.';
        formBtn.addEventListener('click', () => this._formSimulacra(selected));
        this._body.appendChild(formBtn);
    }

    _buildExistingSimulacraSection(state, photo, owned) {
        const wrap = document.createElement('div');
        wrap.style.cssText = 'background:#151225;border:1px solid #40325f;border-radius:6px;padding:10px;margin-bottom:12px;';
        const title = document.createElement('div');
        title.style.cssText = 'color:#d5c0ff;font-weight:bold;margin-bottom:8px;';
        title.textContent = 'Existing Shadow Simulacra';
        wrap.appendChild(title);

        if (!owned.length) {
            const empty = document.createElement('div');
            empty.style.cssText = 'color:#8f82b8;font-size:12px;';
            empty.textContent = 'None formed by this photomancer.';
            wrap.appendChild(empty);
            return wrap;
        }

        for (const sim of owned) {
            const row = document.createElement('div');
            row.style.cssText = 'display:grid;grid-template-columns:1fr auto;gap:8px;align-items:center;margin-top:6px;';
            const info = document.createElement('div');
            const powers = (sim.summonStats?.powers || []).map(getShadowPowerName).join(', ');
            info.style.cssText = 'color:#cfc6ec;font-size:12px;min-width:0;overflow-wrap:anywhere;';
            info.textContent = `${sim.name} (${sim.health}/${sim.maxHealth} HP, ${sim.row || 'front'} row${powers ? `, ${powers}` : ''})`;
            const removeBtn = document.createElement('button');
            removeBtn.textContent = 'Remove';
            removeBtn.style.cssText = this._buttonStyle('#4e1f2a', '#9b3d52');
            removeBtn.title = 'Permanently removes this Shadow Simulacra from the party.';
            removeBtn.addEventListener('click', () => {
                const idx = state.party.findIndex(p => p && p.id === sim.id);
                if (idx === -1) return;
                state.party.splice(idx, 1);
                this._log(`🌑 ${photo.name} releases ${sim.name}.`);
                this._onChanged();
                this._render();
            });
            row.append(info, removeBtn);
            wrap.appendChild(row);
        }
        return wrap;
    }

    _buildTemplateRow(state, slotCount) {
        const row = document.createElement('div');
        row.style.cssText = 'display:grid;grid-template-columns:1.2fr auto 1.2fr auto;gap:8px;align-items:center;margin-bottom:10px;';
        const templates = this._ensureTemplates(state);

        const loadSelect = document.createElement('select');
        loadSelect.style.cssText = this._selectStyle();
        const blank = document.createElement('option');
        blank.value = '';
        blank.textContent = 'Load template...';
        loadSelect.appendChild(blank);
        for (const tmpl of templates) {
            const opt = document.createElement('option');
            opt.value = tmpl.name;
            opt.textContent = tmpl.name;
            loadSelect.appendChild(opt);
        }

        const loadBtn = document.createElement('button');
        loadBtn.textContent = 'Load';
        loadBtn.style.cssText = this._buttonStyle('#25365e', '#5576bf');
        loadBtn.addEventListener('click', () => {
            const tmpl = templates.find(t => t.name === loadSelect.value);
            if (!tmpl) return;
            this._selectedPowers = normalizeShadowPowers(tmpl.powers || [], slotCount);
            this._selectedAttackType = normalizeShadowSimulacraAttackType(tmpl.attackType);
            this._render();
        });

        const nameInput = document.createElement('input');
        nameInput.type = 'text';
        nameInput.placeholder = 'Template name';
        nameInput.maxLength = 40;
        nameInput.style.cssText = this._inputStyle();

        const saveBtn = document.createElement('button');
        saveBtn.textContent = 'Save';
        saveBtn.style.cssText = this._buttonStyle('#31533d', '#65a875');
        saveBtn.addEventListener('click', () => {
            const name = nameInput.value.trim();
            const powers = normalizeShadowPowers(this._selectedPowers.filter(Boolean), slotCount);
            if (!name || powers.length === 0) return;
            const existing = templates.find(t => t.name.toLowerCase() === name.toLowerCase());
            const attackType = normalizeShadowSimulacraAttackType(this._selectedAttackType);
            if (existing) {
                existing.powers = powers;
                existing.attackType = attackType;
            } else {
                templates.push({ name, powers, attackType });
            }
            this._onChanged();
            this._log(`🌑 Saved Shadow Simulacra template "${name}".`);
            this._render();
        });

        row.append(loadSelect, loadBtn, nameInput, saveBtn);
        return row;
    }

    _buildPowerSelect(index) {
        const wrap = document.createElement('label');
        wrap.style.cssText = 'display:flex;flex-direction:column;gap:4px;color:#a99ad0;font-size:12px;';
        wrap.textContent = `Power ${index + 1}`;
        const select = document.createElement('select');
        select.style.cssText = this._selectStyle();
        const empty = document.createElement('option');
        empty.value = '';
        empty.textContent = 'Choose power...';
        select.appendChild(empty);
        for (const power of getAvailableShadowPowers(this._selectedPowers, index)) {
            const opt = document.createElement('option');
            opt.value = power.id;
            opt.textContent = power.name;
            opt.title = power.desc || '';
            select.appendChild(opt);
        }
        select.value = this._selectedPowers[index] || '';
        select.addEventListener('change', () => {
            this._selectedPowers[index] = select.value;
            this._selectedPowers = normalizeShadowPowers(this._selectedPowers);
            this._render();
        });
        wrap.appendChild(select);
        const desc = document.createElement('span');
        desc.style.cssText = 'color:#8677ad;font-size:11px;min-height:30px;';
        desc.textContent = getShadowPower(select.value)?.desc || '';
        wrap.appendChild(desc);
        return wrap;
    }

    _buildAttackTypeSelect() {
        const wrap = document.createElement('label');
        wrap.style.cssText = 'display:flex;flex-direction:column;gap:5px;color:#d0c2f5;font-size:12px;margin:4px 0 12px;';
        wrap.textContent = 'Attack type';
        const select = document.createElement('select');
        select.style.cssText = this._selectStyle();
        const options = [
            ['melee', 'Melee attacks — front row, melee contact'],
            ['ranged', 'Ranged attacks — back row'],
            ['magic', 'Magic attacks — back row, checked against magic immunity'],
        ];
        for (const [value, label] of options) {
            const opt = document.createElement('option');
            opt.value = value;
            opt.textContent = label;
            select.appendChild(opt);
        }
        select.value = normalizeShadowSimulacraAttackType(this._selectedAttackType);
        select.addEventListener('change', () => {
            this._selectedAttackType = normalizeShadowSimulacraAttackType(select.value);
            this._render();
        });
        wrap.appendChild(select);
        const desc = document.createElement('span');
        desc.style.cssText = 'color:#8677ad;font-size:11px;';
        desc.textContent = 'This final choice controls monster immunity checks and row placement. Selected powers still determine extra attacks, AOE, riders, and defenses.';
        wrap.appendChild(desc);
        return wrap;
    }

    _previewText(photo) {
        const stats = buildShadowSimulacraStats(photo, this._selectedPowers.filter(Boolean), this._selectedAttackType);
        const st = stats.summonStats;
        const names = (st.powers || []).map(getShadowPowerName);
        return [
            `Preview: HP ${stats.maxHealth}, DEF ${st.defense}, melee/ranged/magic ${st.meleeMin}-${st.meleeMax}`,
            `Attack type: ${st.attackType}. Row: ${stats.row}. Damage bonus: +${st.damageBonusPct}%.`,
            `Base immunities: stun, poison, psychic, paralyze-style holds, bleed, stamina/mana drain.`,
            names.length ? `Powers: ${names.join(', ')}` : 'Powers: none selected',
        ].join('\n');
    }

    _formSimulacra(photo) {
        const state = this._getState();
        if (!state || !state.inventory || !Array.isArray(state.party)) return;
        const powers = normalizeShadowPowers(this._selectedPowers.filter(Boolean), getShadowSimulacraSlotCount(photo));
        if (powers.length === 0) return;
        const owned = state.party.filter(p => isShadowSimulacra(p) && p.isPersistent && p.summonerId === photo.id);
        const cap = getShadowSimulacraLimit(photo);
        const cost = getShadowSimulacraCost(photo);
        if (owned.length >= cap || (state.inventory.gold || 0) < cost) return;
        if (typeof state.inventory.removeGold === 'function') state.inventory.removeGold(cost);
        else state.inventory.gold = Math.max(0, (state.inventory.gold || 0) - cost);

        const attackType = normalizeShadowSimulacraAttackType(this._selectedAttackType);
        const built = buildShadowSimulacraStats(photo, powers, attackType);
        const num = owned.length + 1;
        const sim = new PartyMember({
            name: `${photo.name}'s Shadow Simulacra #${num}`,
            classId: 'summoned',
            speciesId: 'human',
            level: photo.level || 1,
            maxHealth: built.maxHealth,
            maxStamina: built.maxStamina,
            maxMana: built.maxMana,
            portraitSeed: Math.floor(Math.random() * 100000),
            isSummoned: true,
            isPersistent: true,
            summonType: SHADOW_SIMULACRA_TYPE,
            summonerId: photo.id,
            canBeHealed: false,
            row: built.row,
            summonStats: built.summonStats,
        });
        sim.health = sim.maxHealth;
        sim.stamina = sim.maxStamina;
        sim.mana = sim.maxMana;
        state.party.push(sim);
        this._log(`🌑 ${photo.name} forms ${sim.name}.`);
        this._onChanged();
        this._render();
    }

    _selectStyle() {
        return 'width:100%;background:#1c1830;color:#f0e8ff;border:1px solid #6a4a88;border-radius:4px;padding:6px;';
    }

    _inputStyle() {
        return 'width:100%;box-sizing:border-box;background:#1c1830;color:#f0e8ff;border:1px solid #6a4a88;border-radius:4px;padding:6px;';
    }

    _buttonStyle(bg, border) {
        return `background:${bg};border:1px solid ${border};color:#f5edff;border-radius:4px;padding:7px 10px;cursor:pointer;`;
    }
}
