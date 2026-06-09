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
        const highestPartyLevel = Math.max(
            0,
            ...(state.party || [])
                .filter(member => member && !member.isSummoned)
                .map(member => member.level || 1)
        );
        const reagentItems = ['reagent_common', 'reagent_uncommon', 'reagent_rare'];
        if (highestPartyLevel >= 35) {
            reagentItems.push('reagent_epic', 'reagent_legendary', 'reagent_mythic', 'reagent_divine');
        }

        // All purchasable items — only tier-1 trinkets are sold; higher tiers
        // are loot-only so they stay special.
        const shopItems = [
            'food', 'healing_potion', 'resurrection_potion',
            'torch', 'lantern', 'lantern_oil',
            ...reagentItems,
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

            const purchaseQuantities = def.reagentTier ? [1, 10, 100] : [1];
            for (const quantity of purchaseQuantities) {
                const totalPrice = price * quantity;
                const buyBtn = document.createElement('button');
                buyBtn.className = 'shop-action-btn shop-buy-btn';
                buyBtn.textContent = quantity === 1 ? 'Buy' : `Buy ${quantity}`;
                buyBtn.disabled = inv.gold < totalPrice;
                buyBtn.title = quantity === 1 ? `Buy for ${totalPrice}g` : `Buy ${quantity} for ${totalPrice}g`;
                buyBtn.addEventListener('click', () => {
                    if (inv.gold >= totalPrice) {
                        inv.removeGold(totalPrice);
                        inv.addItem(itemId, quantity);
                        soundManager.playGold();
                        this._onChanged();
                        this._render();
                    }
                });
                row.appendChild(buyBtn);
            }

            this.content.appendChild(row);
        }
    }

    _renderSell(state) {
        const inv = state.inventory;
        const summary = inv.getItemSummary();

        // Pre-filter to only sellable items
        const sellable = summary
            .map(entry => ({ ...entry, def: getItemDef(entry.itemId), sellPrice: getItemSellPrice(entry.itemId) }))
            .filter(e => e.def && e.sellPrice > 0);

        if (sellable.length === 0) {
            const empty = document.createElement('div');
            empty.className = 'shop-empty';
            empty.textContent = 'No items to sell.';
            this.content.appendChild(empty);
            return;
        }

        // Mirror the group-inventory bucketing + sort order
        const GROUP_META = [
            { key: 'reagent',    label: '🧪 Reagents'        },
            { key: 'light',      label: '🔦 Light Sources'   },
            { key: 'weapon',     label: '⚔️ Weapons'          },
            { key: 'armor',      label: '🛡️ Armor & Shields'  },
            { key: 'consumable', label: '🧴 Consumables'      },
            { key: 'magic',      label: '🔮 Magic Trinkets'   },
            { key: 'ranged',     label: '🏹 Ranged Trinkets'  },
            { key: 'melee',      label: '🗡️ Melee Trinkets'   },
            { key: 'defense',    label: '🛡️ Defense Trinkets' },
        ];

        const buckets = {};
        for (const g of GROUP_META) buckets[g.key] = [];
        for (const entry of sellable) {
            const key = this._getBagGroup(entry.itemId, entry.def);
            if (!buckets[key]) buckets[key] = [];
            buckets[key].push(entry);
        }

        for (const { key, label } of GROUP_META) {
            const raw = buckets[key];
            if (!raw || raw.length === 0) continue;
            const items = this._sortGroupItems(key, raw);

            // Section heading
            const heading = document.createElement('div');
            heading.className = 'inv-group-heading';
            heading.textContent = label;
            this.content.appendChild(heading);

            for (const { itemId, quantity, def, sellPrice } of items) {
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
                priceEl.textContent = `+${sellPrice}g ea`;
                row.appendChild(priceEl);

                // Sell one
                const sellBtn = document.createElement('button');
                sellBtn.className = 'shop-action-btn shop-sell-btn';
                sellBtn.textContent = 'Sell 1';
                sellBtn.addEventListener('click', () => {
                    if (inv.removeItem(itemId)) {
                        inv.addGold(sellPrice);
                        soundManager.playGold();
                        this._onChanged();
                        this._render();
                    }
                });
                row.appendChild(sellBtn);

                // Sell all (only when quantity > 1)
                if (quantity > 1) {
                    const sellAllBtn = document.createElement('button');
                    sellAllBtn.className = 'shop-action-btn shop-sell-btn';
                    sellAllBtn.textContent = `Sell All (+${sellPrice * quantity}g)`;
                    sellAllBtn.style.marginLeft = '4px';
                    sellAllBtn.addEventListener('click', () => {
                        const total = sellPrice * quantity;
                        for (let i = 0; i < quantity; i++) inv.removeItem(itemId);
                        inv.addGold(total);
                        soundManager.playGold();
                        this._onChanged();
                        this._render();
                    });
                    row.appendChild(sellAllBtn);
                }

                this.content.appendChild(row);
            }
        }
    }

    /**
     * Classify an item into one of 9 display buckets — mirrors InventoryUI._getBagGroup.
     */
    _getBagGroup(itemId, def) {
        if (!def) return 'consumable';
        if (def.reagentTier || itemId === 'magical_reagent') return 'reagent';
        if (itemId === 'torch' || itemId === 'lantern' || itemId === 'lantern_oil') return 'light';
        if (def.category === 'weapon') return 'weapon';
        if (def.category === 'armor' || def.category === 'shield') return 'armor';
        if (def.category === 'trinket') {
            if (def.bonusTypes && typeof def.bonusTypes === 'object') {
                if (typeof def.bonusTypes.melee === 'number') return 'melee';
                if (typeof def.bonusTypes.ranged === 'number') return 'ranged';
                if (typeof def.bonusTypes.magic === 'number') return 'magic';
                if (typeof def.bonusTypes.defense === 'number') return 'defense';
            }
            if (def.dualAspect && def.bonusType2) return def.bonusType2;
            return def.bonusType; // 'defense'|'melee'|'ranged'|'magic'
        }
        return 'consumable';
    }

    /**
     * Sort items within a bucket — mirrors InventoryUI._sortGroupItems.
     * Weapons: ranged → magic → melee, then power low→high.
     * Armor:   blocking low→high (shields last).
     * Trinkets: cloak → neck → ring → belt, then bonusValue low→high.
     * Others:  natural order.
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

    _getTooltip(def) {
        if (!def) return '';
        const lines = [def.name];
        if (def.category === ITEM_CATEGORY.WEAPON) {
            const st = def.subtype ? def.subtype.charAt(0).toUpperCase() + def.subtype.slice(1) : '';
            lines.push(`${st} weapon — +${def.power} damage`);
            if (def.specialOffhandSlot) lines.push('Equips in the off hand.');
            if (typeof def.maxManaPct === 'number') lines.push(`+${Math.round(def.maxManaPct * 100)}% max mana`);
        } else if (def.category === ITEM_CATEGORY.ARMOR) {
            const type = def.armorType ? def.armorType.charAt(0).toUpperCase() + def.armorType.slice(1) : '';
            if (type) lines.push(`${type} armor`);
            lines.push(`Blocks ${def.blocking} incoming damage`);
        } else if (def.category === ITEM_CATEGORY.SHIELD) {
            lines.push('25% chance to completely block an attack');
        } else if (def.category === ITEM_CATEGORY.TRINKET) {
            const kind   = def.trinketKind ? def.trinketKind.charAt(0).toUpperCase() + def.trinketKind.slice(1) : '';
            const bonus  = def.bonusType   ? def.bonusType.charAt(0).toUpperCase()   + def.bonusType.slice(1)   : '';
            const bonus2 = def.bonusType2  ? def.bonusType2.charAt(0).toUpperCase()  + def.bonusType2.slice(1)  : '';
            const dualTag = def.dualAspect ? ' ✦ dual-aspect' : '';
            if (kind)   lines.push(`${kind} trinket (tier ${def.tier || 1})${dualTag}`);
            if (def.bonusTypes && typeof def.bonusTypes === 'object') {
                for (const [type, value] of Object.entries(def.bonusTypes)) {
                    if (typeof value !== 'number' || value === 0) continue;
                    lines.push(`+${value} ${type.charAt(0).toUpperCase() + type.slice(1)}`);
                }
            }
            if (bonus)  lines.push(`+${def.bonusValue  || 0} ${bonus}`);
            if (bonus2) lines.push(`+${def.bonusValue2 || 0} ${bonus2}`);
        } else {
            lines.push(def.description);
        }
        return lines.join('\n');
    }
}
