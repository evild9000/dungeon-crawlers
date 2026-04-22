/**
 * ShopUI — Tinkerer shop interface for buying and selling items.
 *
 * Buy: weapons (50g/power), armor (50g/blocking), shield (150g),
 *      food (50g), healing potion (50g).
 * Sell: items from group inventory at half buy price.
 */

import {
    getItemDef, getItemBuyPrice, getItemSellPrice,
    WEAPONS, ARMOR, SHIELDS, TRINKETS, ITEM_CATEGORY,
    ALL_ITEMS,
} from '../items/ItemTypes.js';
import { soundManager } from '../utils/SoundManager.js';

export class ShopUI {
    /**
     * @param {() => import('../core/GameState.js').GameState} getState
     * @param {() => void} onChanged — called after any inventory mutation
     */
    constructor(getState, onChanged) {
        this._getState = getState;
        this._onChanged = onChanged;

        this.overlay = document.getElementById('shop-overlay');
        this.content = document.getElementById('shop-content');
        document.getElementById('btn-close-shop')
            .addEventListener('click', () => this.hide());

        this._tab = 'buy'; // 'buy' | 'sell'
    }

    show() {
        this.overlay.style.display = 'flex';
        soundManager.playShop();
        this._render();
    }

    hide() {
        this.overlay.style.display = 'none';
    }

    get isOpen() {
        return this.overlay.style.display === 'flex';
    }

    _render() {
        const state = this._getState();
        if (!state) return;

        this.content.innerHTML = '';

        // Header
        const header = document.createElement('div');
        header.className = 'shop-header';
        header.innerHTML = `<span class="shop-title">\u{1F6E0}\uFE0F Wandering Tinkerer</span>
            <span class="shop-gold">\u{1F4B0} ${state.inventory.gold} Gold</span>`;
        this.content.appendChild(header);

        // Tab buttons
        const tabBar = document.createElement('div');
        tabBar.className = 'shop-tab-bar';

        const buyTab = document.createElement('button');
        buyTab.className = `shop-tab ${this._tab === 'buy' ? 'active' : ''}`;
        buyTab.textContent = 'Buy';
        buyTab.addEventListener('click', () => { this._tab = 'buy'; this._render(); });
        tabBar.appendChild(buyTab);

        const sellTab = document.createElement('button');
        sellTab.className = `shop-tab ${this._tab === 'sell' ? 'active' : ''}`;
        sellTab.textContent = 'Sell';
        sellTab.addEventListener('click', () => { this._tab = 'sell'; this._render(); });
        tabBar.appendChild(sellTab);

        this.content.appendChild(tabBar);

        if (this._tab === 'buy') {
            this._renderBuy(state);
        } else {
            this._renderSell(state);
        }
    }

    _renderBuy(state) {
        const inv = state.inventory;

        // All purchasable items — only tier-1 trinkets are sold; higher tiers
        // are loot-only so they stay special.
        const shopItems = [
            'food', 'healing_potion', 'resurrection_potion',
            'torch', 'lantern', 'lantern_oil',
            ...Object.keys(WEAPONS),
            ...Object.keys(ARMOR),
            ...Object.keys(SHIELDS),
            ...Object.keys(TRINKETS).filter(id => TRINKETS[id].tier === 1),
        ];

        for (const itemId of shopItems) {
            const def = getItemDef(itemId);
            if (!def) continue;
            const price = getItemBuyPrice(itemId);
            if (price <= 0) continue;

            const row = document.createElement('div');
            row.className = 'shop-item-row';

            const info = document.createElement('div');
            info.className = 'shop-item-info';
            const icon = def.icon || '';
            info.innerHTML = `<span class="shop-item-icon">${icon}</span>
                <span class="shop-item-name">${def.name}</span>
                <span class="shop-item-desc">${def.description}</span>`;
            info.title = this._getTooltip(def);
            row.appendChild(info);

            const priceEl = document.createElement('span');
            priceEl.className = 'shop-item-price';
            priceEl.textContent = `${price}g`;
            row.appendChild(priceEl);

            const buyBtn = document.createElement('button');
            buyBtn.className = 'shop-action-btn shop-buy-btn';
            buyBtn.textContent = 'Buy';
            buyBtn.disabled = inv.gold < price;
            buyBtn.addEventListener('click', () => {
                if (inv.gold >= price) {
                    inv.removeGold(price);
                    inv.addItem(itemId);
                    soundManager.playGold();
                    this._onChanged();
                    this._render();
                }
            });
            row.appendChild(buyBtn);

            this.content.appendChild(row);
        }
    }

    _renderSell(state) {
        const inv = state.inventory;
        const summary = inv.getItemSummary();

        if (summary.length === 0) {
            const empty = document.createElement('div');
            empty.className = 'shop-empty';
            empty.textContent = 'No items to sell.';
            this.content.appendChild(empty);
            return;
        }

        for (const { itemId, quantity } of summary) {
            const def = getItemDef(itemId);
            if (!def) continue;
            const sellPrice = getItemSellPrice(itemId);
            if (sellPrice <= 0) continue;

            const row = document.createElement('div');
            row.className = 'shop-item-row';

            const info = document.createElement('div');
            info.className = 'shop-item-info';
            const icon = def.icon || '';
            info.innerHTML = `<span class="shop-item-icon">${icon}</span>
                <span class="shop-item-name">${def.name}</span>
                <span class="shop-item-qty">x${quantity}</span>`;
            info.title = this._getTooltip(def);
            row.appendChild(info);

            const priceEl = document.createElement('span');
            priceEl.className = 'shop-item-price shop-sell-price';
            priceEl.textContent = `+${sellPrice}g`;
            row.appendChild(priceEl);

            const sellBtn = document.createElement('button');
            sellBtn.className = 'shop-action-btn shop-sell-btn';
            sellBtn.textContent = 'Sell';
            sellBtn.addEventListener('click', () => {
                if (inv.removeItem(itemId)) {
                    inv.addGold(sellPrice);
                    soundManager.playGold();
                    this._onChanged();
                    this._render();
                }
            });
            row.appendChild(sellBtn);

            this.content.appendChild(row);
        }
    }

    _getTooltip(def) {
        if (!def) return '';
        const lines = [def.name];
        if (def.category === ITEM_CATEGORY.WEAPON) {
            const st = def.subtype ? def.subtype.charAt(0).toUpperCase() + def.subtype.slice(1) : '';
            lines.push(`${st} weapon — +${def.power} damage`);
        } else if (def.category === ITEM_CATEGORY.ARMOR) {
            const type = def.armorType ? def.armorType.charAt(0).toUpperCase() + def.armorType.slice(1) : '';
            if (type) lines.push(`${type} armor`);
            lines.push(`Blocks ${def.blocking} incoming damage`);
        } else if (def.category === ITEM_CATEGORY.SHIELD) {
            lines.push('25% chance to completely block an attack');
        } else if (def.category === ITEM_CATEGORY.TRINKET) {
            const kind  = def.trinketKind ? def.trinketKind.charAt(0).toUpperCase() + def.trinketKind.slice(1) : '';
            const bonus = def.bonusType   ? def.bonusType.charAt(0).toUpperCase()   + def.bonusType.slice(1)   : '';
            if (kind)  lines.push(`${kind} trinket (tier ${def.tier || 1})`);
            if (bonus) lines.push(`+${def.bonusValue || 0} ${bonus}`);
        } else {
            lines.push(def.description);
        }
        return lines.join('\n');
    }
}
