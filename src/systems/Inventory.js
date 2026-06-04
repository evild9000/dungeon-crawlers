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
                this._rechargeEntry(existing, def);
                existing.quantity += quantity;
                if (def.maxCharges) existing.quantity = Math.min(def.maxCharges, existing.quantity);
            } else {
                const entry = { itemId, quantity: def.maxCharges ? Math.min(def.maxCharges, quantity) : quantity };
                if (def.rechargeMs) entry.lastRechargeAt = Date.now();
                this.items.push(entry);
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
        this._rechargeEntry(entry);
        if (entry.quantity < quantity) return false;

        entry.quantity -= quantity;
        if (entry.quantity <= 0) {
            this.items.splice(idx, 1);
        }
        return true;
    }

    hasItem(itemId, quantity = 1) {
        const entry = this.items.find(i => i.itemId === itemId);
        if (entry) this._rechargeEntry(entry);
        return entry ? entry.quantity >= quantity : false;
    }

    getItemCount(itemId) {
        let total = 0;
        for (const entry of this.items) {
            if (!entry || entry.itemId !== itemId) continue;
            this._rechargeEntry(entry);
            total += entry.quantity || 0;
        }
        return total;
    }

    _rechargeEntry(entry, def = null) {
        if (!entry) return;
        const itemDef = def || getItemDef(entry.itemId);
        if (!itemDef || !itemDef.rechargeMs || !itemDef.maxCharges) return;
        const now = Date.now();
        if (!entry.lastRechargeAt) entry.lastRechargeAt = now;
        if (entry.quantity >= itemDef.maxCharges) {
            entry.quantity = itemDef.maxCharges;
            entry.lastRechargeAt = now;
            return;
        }
        const elapsed = now - entry.lastRechargeAt;
        if (elapsed < itemDef.rechargeMs) return;
        const gained = Math.floor(elapsed / itemDef.rechargeMs);
        if (gained <= 0) return;
        entry.quantity = Math.min(itemDef.maxCharges, entry.quantity + gained);
        entry.lastRechargeAt += gained * itemDef.rechargeMs;
        if (entry.quantity >= itemDef.maxCharges) entry.lastRechargeAt = now;
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
        if (tier === 'uncommon')  return this.getItemCount('reagent_uncommon');
        if (tier === 'rare')      return this.getItemCount('reagent_rare');
        if (tier === 'epic')      return this.getItemCount('reagent_epic');
        if (tier === 'legendary') return this.getItemCount('reagent_legendary');
        if (tier === 'mythic')    return this.getItemCount('reagent_mythic');
        if (tier === 'divine')    return this.getItemCount('reagent_divine');
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
        if (tier === 'uncommon')  return this.removeItem('reagent_uncommon',  quantity);
        if (tier === 'rare')      return this.removeItem('reagent_rare',      quantity);
        if (tier === 'epic')      return this.removeItem('reagent_epic',      quantity);
        if (tier === 'legendary') return this.removeItem('reagent_legendary', quantity);
        if (tier === 'mythic')    return this.removeItem('reagent_mythic',    quantity);
        if (tier === 'divine')    return this.removeItem('reagent_divine',    quantity);
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
