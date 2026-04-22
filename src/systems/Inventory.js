/**
 * Inventory — group-level inventory holding gold and shared items.
 *
 * Items are stored as { itemId: string, quantity: number }.
 * Consumables stack; equipment items are stored individually.
 */

import { getItemDef, ITEM_CATEGORY } from '../items/ItemTypes.js';

export class Inventory {
    constructor() {
        this.gold = 0;
        this.items = []; // [{ itemId, quantity }]
    }

    addGold(amount) {
        this.gold += amount;
    }

    removeGold(amount) {
        if (this.gold < amount) return false;
        this.gold -= amount;
        return true;
    }

    addItem(itemId, quantity = 1) {
        const def = getItemDef(itemId);
        if (!def) return;

        const isStackable = def.stackable || def.category === ITEM_CATEGORY.CONSUMABLE;
        if (isStackable) {
            const existing = this.items.find(i => i.itemId === itemId);
            if (existing) {
                existing.quantity += quantity;
            } else {
                this.items.push({ itemId, quantity });
            }
        } else {
            // Equipment: add as individual entries
            for (let i = 0; i < quantity; i++) {
                this.items.push({ itemId, quantity: 1 });
            }
        }
    }

    /**
     * Remove an item (or quantity of a stackable) from inventory.
     * @returns {boolean} true if successful
     */
    removeItem(itemId, quantity = 1) {
        const idx = this.items.findIndex(i => i.itemId === itemId);
        if (idx === -1) return false;

        const entry = this.items[idx];
        if (entry.quantity < quantity) return false;

        entry.quantity -= quantity;
        if (entry.quantity <= 0) {
            this.items.splice(idx, 1);
        }
        return true;
    }

    hasItem(itemId, quantity = 1) {
        const entry = this.items.find(i => i.itemId === itemId);
        return entry ? entry.quantity >= quantity : false;
    }

    getItemCount(itemId) {
        const entry = this.items.find(i => i.itemId === itemId);
        return entry ? entry.quantity : 0;
    }

    /**
     * Reagent accounting that honours the legacy `magical_reagent` item — it is
     * treated as a common reagent for crafting. For 'common' tier checks we
     * sum `reagent_common` + `magical_reagent`; for other tiers it's the plain
     * typed count.
     */
    getReagentCount(tier) {
        if (tier === 'common') {
            return this.getItemCount('reagent_common') + this.getItemCount('magical_reagent');
        }
        if (tier === 'uncommon') return this.getItemCount('reagent_uncommon');
        if (tier === 'rare')     return this.getItemCount('reagent_rare');
        return 0;
    }

    hasReagent(tier, quantity = 1) {
        return this.getReagentCount(tier) >= quantity;
    }

    /**
     * Spend reagents of the given tier. For 'common', legacy `magical_reagent`
     * stock is consumed first (burning down old saves), then typed
     * `reagent_common`. Returns true on success, false if not enough stock.
     */
    removeReagent(tier, quantity = 1) {
        if (quantity <= 0) return true;
        if (!this.hasReagent(tier, quantity)) return false;
        if (tier === 'uncommon') return this.removeItem('reagent_uncommon', quantity);
        if (tier === 'rare')     return this.removeItem('reagent_rare', quantity);
        // common: drain legacy first
        let remaining = quantity;
        const legacy = this.getItemCount('magical_reagent');
        if (legacy > 0 && remaining > 0) {
            const take = Math.min(legacy, remaining);
            this.removeItem('magical_reagent', take);
            remaining -= take;
        }
        if (remaining > 0) this.removeItem('reagent_common', remaining);
        return true;
    }

    /** Get a deduplicated summary of items (for UI). */
    getItemSummary() {
        const map = new Map();
        for (const entry of this.items) {
            if (map.has(entry.itemId)) {
                map.set(entry.itemId, map.get(entry.itemId) + entry.quantity);
            } else {
                map.set(entry.itemId, entry.quantity);
            }
        }
        return [...map.entries()].map(([itemId, quantity]) => ({ itemId, quantity }));
    }

    serialize() {
        return {
            gold: this.gold,
            items: this.items.map(i => ({ ...i })),
        };
    }

    static deserialize(data) {
        const inv = new Inventory();
        if (!data) return inv;
        inv.gold = data.gold || 0;
        inv.items = (data.items || []).map(i => ({ ...i }));
        return inv;
    }
}
