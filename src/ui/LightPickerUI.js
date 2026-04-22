import {
    LIGHT_SPELL_MANA_COST,
    LIGHT_TORCH_DURATION_SEC,
    LIGHT_LANTERN_DURATION_SEC,
    LIGHT_SPELL_DURATION_SEC,
    LIGHT_TORCH_RADIUS_CELLS,
    LIGHT_LANTERN_RADIUS_CELLS,
    LIGHT_SPELL_RADIUS_CELLS,
} from '../utils/constants.js';
import { soundManager } from '../utils/SoundManager.js';

/**
 * LightPickerUI — modal triggered by pressing T.
 *
 * Lists every light option available *right now*:
 *   • Each torch in the group inventory (uses 1 torch, 10 min, 5 sq)
 *   • Each unit of lantern oil (requires at least 1 lantern owned, 15 min, 8 sq)
 *   • Each mage with ≥ LIGHT_SPELL_MANA_COST mana (5 min, 6 sq, costs 10 MP)
 *
 * Selecting one extinguishes the current light and starts the new one.
 */
export class LightPickerUI {
    constructor({ getState, getLightSystem, onChanged, log }) {
        this._getState = getState;
        this._getLight = getLightSystem;
        this._onChanged = onChanged || (() => {});
        this._log = log || (() => {});

        this.modal = document.getElementById('lightpick-modal');
        this.list  = document.getElementById('lightpick-list');
        this.sub   = document.getElementById('lightpick-sub');

        const cancel = document.getElementById('btn-lightpick-cancel');
        if (cancel) cancel.addEventListener('click', () => this.hide());
    }

    get isOpen() {
        return this.modal && this.modal.style.display === 'flex';
    }

    show() {
        if (!this.modal) return;
        this._render();
        this.modal.style.display = 'flex';
    }

    hide() {
        if (this.modal) this.modal.style.display = 'none';
    }

    _render() {
        const state = this._getState();
        const light = this._getLight();
        if (!state || !light) return;

        this.list.innerHTML = '';
        const inv = state.inventory;

        // --- Current status line ---
        if (this.sub) {
            if (light.isLit()) {
                const sec = Math.ceil(light.remaining());
                const mins = Math.floor(sec / 60);
                const rem = sec % 60;
                this.sub.textContent =
                    `Currently burning: ${light.currentLabel()} — ${mins}m ${rem}s remaining. Picking a new light replaces it.`;
            } else {
                this.sub.textContent =
                    'You are in darkness. Choose a light source. Only one may burn at a time.';
            }
        }

        const options = [];

        // Torches (1 per use)
        const torchCount = inv.getItemCount('torch');
        if (torchCount > 0) {
            options.push({
                key: 'torch',
                label: `\u{1F526} Light a Torch`,
                sub: `x${torchCount} available — ${LIGHT_TORCH_DURATION_SEC/60} min, ${LIGHT_TORCH_RADIUS_CELLS}-sq radius, flickering flame`,
                enabled: true,
                onClick: () => this._lightTorch(),
            });
        } else {
            options.push({
                key: 'torch',
                label: `\u{1F526} Light a Torch`,
                sub: 'You have no torches. Buy them from the Tinkerer (25g).',
                enabled: false,
            });
        }

        // Lantern (needs lantern + oil)
        const lanternCount = inv.getItemCount('lantern');
        const oilCount = inv.getItemCount('lantern_oil');
        if (lanternCount > 0 && oilCount > 0) {
            options.push({
                key: 'lantern',
                label: `\u{1FAD9} Burn Lantern Oil`,
                sub: `Lantern x${lanternCount}, Oil x${oilCount} — ${LIGHT_LANTERN_DURATION_SEC/60} min, ${LIGHT_LANTERN_RADIUS_CELLS}-sq steady light (consumes 1 oil)`,
                enabled: true,
                onClick: () => this._lightLantern(),
            });
        } else {
            const reason = lanternCount === 0
                ? 'You own no lantern. Buy one from the Tinkerer (100g).'
                : 'You have no lantern oil. Buy oil from the Tinkerer (30g).';
            options.push({
                key: 'lantern',
                label: `\u{1FAD9} Burn Lantern Oil`,
                sub: reason,
                enabled: false,
            });
        }

        // Mage Light spells
        const mages = (state.party || []).filter(
            m => !m.isSummoned && m.classId === 'mage' && m.health > 0,
        );
        if (mages.length === 0) {
            options.push({
                key: 'spell-none',
                label: `\u{2728} Cast Light Spell`,
                sub: 'No living mage in the party.',
                enabled: false,
            });
        } else {
            for (const mage of mages) {
                const ok = mage.mana >= LIGHT_SPELL_MANA_COST;
                options.push({
                    key: `spell-${mage.id}`,
                    label: `\u{2728} ${mage.name} casts Light`,
                    sub: `Mage L${mage.level} — ${mage.mana}/${mage.maxMana} MP. Costs ${LIGHT_SPELL_MANA_COST} MP, ${LIGHT_SPELL_DURATION_SEC/60} min, ${LIGHT_SPELL_RADIUS_CELLS}-sq bright light.`,
                    enabled: ok,
                    onClick: ok ? () => this._castLight(mage) : null,
                });
            }
        }

        // --- Render rows ---
        for (const opt of options) {
            const row = document.createElement('button');
            row.className = 'menu-btn';
            row.style.display = 'flex';
            row.style.flexDirection = 'column';
            row.style.alignItems = 'flex-start';
            row.style.gap = '2px';
            row.style.padding = '10px 14px';
            row.style.textAlign = 'left';
            row.style.width = '100%';
            row.style.margin = '0';
            row.style.cursor = opt.enabled ? 'pointer' : 'not-allowed';
            row.style.opacity = opt.enabled ? '1' : '0.45';
            row.disabled = !opt.enabled;

            const top = document.createElement('div');
            top.style.fontWeight = 'bold';
            top.style.fontSize = '15px';
            top.textContent = opt.label;

            const bot = document.createElement('div');
            bot.style.fontSize = '12px';
            bot.style.color = '#9bb0d4';
            bot.textContent = opt.sub;

            row.appendChild(top);
            row.appendChild(bot);
            if (opt.enabled && opt.onClick) {
                row.addEventListener('click', opt.onClick);
            }
            this.list.appendChild(row);
        }
    }

    _lightTorch() {
        const state = this._getState();
        const light = this._getLight();
        if (!state.inventory.removeItem('torch', 1)) return;
        light.start('torch');
        state.activeLight = light.serialize();
        try { soundManager.playGold(); } catch {}
        this._log('\u{1F525} A torch is kindled — warm firelight pushes back the dark.');
        this._onChanged();
        this.hide();
    }

    _lightLantern() {
        const state = this._getState();
        const light = this._getLight();
        // Consume one oil; lantern itself is reusable.
        if (!state.inventory.removeItem('lantern_oil', 1)) return;
        light.start('lantern');
        state.activeLight = light.serialize();
        try { soundManager.playGold(); } catch {}
        this._log('\u{1F4A1} You fill the lantern with oil — steady golden light fills the passage.');
        this._onChanged();
        this.hide();
    }

    _castLight(mage) {
        if (!mage || mage.mana < LIGHT_SPELL_MANA_COST) return;
        mage.mana = Math.max(0, mage.mana - LIGHT_SPELL_MANA_COST);
        const state = this._getState();
        const light = this._getLight();
        light.start('light');
        state.activeLight = light.serialize();
        this._log(`\u{2728} ${mage.name} casts Light — a clean white radiance blooms around the party!`);
        this._onChanged();
        this.hide();
    }
}
