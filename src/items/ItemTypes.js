/**
 * ItemTypes — master catalog of all items in the game.
 *
 * Categories: CONSUMABLE, WEAPON, ARMOR, SHIELD, TRINKET
 * Designed for easy expansion — add new entries here and they
 * automatically become available for loot drops and inventory.
 *
 * Phase 8: new trinket system (cloak / neck / ring / belt) gated to
 * five equipment slots (cloak, neck, ring1, ring2, belt). Trinkets grant
 * one of four bonuses — defense / melee / ranged / magic — at +1..+4.
 */

export const ITEM_CATEGORY = {
    CONSUMABLE: 'consumable',
    WEAPON: 'weapon',
    ARMOR: 'armor',
    SHIELD: 'shield',
    TRINKET: 'trinket',
};

export const WEAPON_SUBTYPE = {
    MELEE: 'melee',
    RANGED: 'ranged',
    MAGIC: 'magic',
};

/**
 * Trinket "slot kind" values map to how the item can be worn:
 *   'cloak' → cloak slot only
 *   'neck'  → neck slot only
 *   'ring'  → either ring1 or ring2 slot
 *   'belt'  → belt slot only
 */
export const TRINKET_KIND = {
    CLOAK: 'cloak',
    NECK:  'neck',
    RING:  'ring',
    BELT:  'belt',
};

/**
 * Trinket bonus categories (one per item):
 *   defense   — reduces damage taken (stacks with armor blocking)
 *   melee     — flat +N to melee damage
 *   ranged    — flat +N to ranged damage
 *   magic     — flat +N to magic damage
 */
export const TRINKET_BONUS = {
    DEFENSE: 'defense',
    MELEE:   'melee',
    RANGED:  'ranged',
    MAGIC:   'magic',
};

// ──────────────────────────────────────────
// Consumables
// ──────────────────────────────────────────

export const CONSUMABLES = {
    food: {
        id: 'food',
        name: 'Food',
        category: ITEM_CATEGORY.CONSUMABLE,
        description: 'Used to rest and recover the party.',
        icon: '\u{1F35E}',
        stackable: true,
    },
    healing_potion: {
        id: 'healing_potion',
        name: 'Healing Potion',
        category: ITEM_CATEGORY.CONSUMABLE,
        description: "Fully restores one character's health.",
        icon: '\u{1F9EA}',
        stackable: true,
    },
    resurrection_potion: {
        id: 'resurrection_potion',
        name: 'Resurrection Potion',
        category: ITEM_CATEGORY.CONSUMABLE,
        description: 'Revives a fallen party member to full health. Sold by the Tinkerer.',
        icon: '\u{1F56F}\uFE0F', // candle
        stackable: true,
    },
    // ── Light sources ─────────────────────────────────────────────
    torch: {
        id: 'torch',
        name: 'Torch',
        category: ITEM_CATEGORY.CONSUMABLE,
        description: 'Lights a 5-square radius around the party for 10 minutes. Press [T] to pick a light source.',
        icon: '\u{1F526}', // 🔦 flashlight (fire-style lighting)
        stackable: true,
    },
    lantern: {
        id: 'lantern',
        name: 'Lantern',
        category: ITEM_CATEGORY.CONSUMABLE,
        description: 'A brass lantern. Needs lantern oil to burn — sheds steady light in an 8-square radius.',
        icon: '\u{1FAD9}', // lantern-like glyph; falls back cleanly
        stackable: true,
    },
    lantern_oil: {
        id: 'lantern_oil',
        name: 'Lantern Oil',
        category: ITEM_CATEGORY.CONSUMABLE,
        description: 'Fuels a lantern for 15 minutes of steady light. One lantern + one oil = one burn.',
        icon: '\u{1F6E2}\uFE0F', // 🛢️ oil drum
        stackable: true,
    },
    magical_reagent: {
        id: 'magical_reagent',
        name: 'Magical Reagent',
        category: ITEM_CATEGORY.CONSUMABLE,
        description: 'Legacy generic reagent from old saves. Treated as a common reagent for crafting.',
        icon: '\u2728', // ✨
        stackable: true,
    },

    // Phase 12 — tiered crafting reagents. Common drops from L1-3 enemies,
    // uncommon from L4-6, rare from L7+ (and bosses grant extra rare).
    // All classes can carry them; the artificer is the only class that can
    // spend them at the crafting table.
    reagent_common: {
        id: 'reagent_common',
        name: 'Common Reagent',
        category: ITEM_CATEGORY.CONSUMABLE,
        description: 'A pinch of bone dust or slime jelly. Dropped by low-level monsters. Used by artificers for basic crafting. Legacy Magical Reagents from old saves count as common reagents too.',
        icon: '\u2728', // ✨ — shared with the legacy magical_reagent item
        stackable: true,
        reagentTier: 'common',
    },
    reagent_uncommon: {
        id: 'reagent_uncommon',
        name: 'Uncommon Reagent',
        category: ITEM_CATEGORY.CONSUMABLE,
        description: 'A vial of witch-dew or ogre hair. Dropped by mid-level monsters. Used by artificers for enchantments and elixirs.',
        icon: '\u{1F535}', // 🔵
        stackable: true,
        reagentTier: 'uncommon',
    },
    reagent_rare: {
        id: 'reagent_rare',
        name: 'Rare Reagent',
        category: ITEM_CATEGORY.CONSUMABLE,
        description: 'Dragon scale, demon ichor, or archmage dust. Dropped by deep-dungeon and boss monsters. Required for the finest enchantments and iron golems.',
        icon: '\u{1F7E3}', // 🟣
        stackable: true,
        reagentTier: 'rare',
    },

    // Phase 12 — potions (craftable at an artificer's workbench).
    minor_healing_potion: {
        id: 'minor_healing_potion',
        name: 'Minor Healing Potion',
        category: ITEM_CATEGORY.CONSUMABLE,
        description: 'Restores 40% of one character\'s max HP. Usable in and out of combat.',
        icon: '\u{2695}\uFE0F', // ⚕️
        stackable: true,
        potionKind: 'heal_minor',
    },
    greater_healing_potion: {
        id: 'greater_healing_potion',
        name: 'Greater Healing Potion',
        category: ITEM_CATEGORY.CONSUMABLE,
        description: 'Restores 75% of one character\'s max HP. Usable in and out of combat.',
        icon: '\u{1F489}', // 💉
        stackable: true,
        potionKind: 'heal_greater',
    },
    elixir_warding: {
        id: 'elixir_warding',
        name: 'Elixir of Warding',
        category: ITEM_CATEGORY.CONSUMABLE,
        description: 'Drink: +2 defense for 5 minutes of exploration (or 20 combat rounds).',
        icon: '\u{1F6E1}\uFE0F', // 🛡️
        stackable: true,
        potionKind: 'buff_warding',
    },
    elixir_wrath: {
        id: 'elixir_wrath',
        name: 'Elixir of Wrath',
        category: ITEM_CATEGORY.CONSUMABLE,
        description: 'Drink: +2 to melee, ranged, and magic damage for 5 minutes of exploration (or 20 combat rounds).',
        icon: '\u{1F525}', // 🔥
        stackable: true,
        potionKind: 'buff_wrath',
    },
};

// ──────────────────────────────────────────
// Weapons — 4 tiers x 3 subtypes = 12 weapons
// ──────────────────────────────────────────

export const WEAPONS = {
    // Melee (power 1-4)
    rusty_sword:  { id: 'rusty_sword',  name: 'Rusty Sword',  category: ITEM_CATEGORY.WEAPON, subtype: WEAPON_SUBTYPE.MELEE, power: 1, description: '+1 melee damage',  icon: '\u{1F5E1}' },
    iron_sword:   { id: 'iron_sword',   name: 'Iron Sword',   category: ITEM_CATEGORY.WEAPON, subtype: WEAPON_SUBTYPE.MELEE, power: 2, description: '+2 melee damage',  icon: '\u{2694}' },
    steel_blade:  { id: 'steel_blade',  name: 'Steel Blade',  category: ITEM_CATEGORY.WEAPON, subtype: WEAPON_SUBTYPE.MELEE, power: 3, description: '+3 melee damage',  icon: '\u{2694}' },
    flame_sword:  { id: 'flame_sword',  name: 'Flame Sword',  category: ITEM_CATEGORY.WEAPON, subtype: WEAPON_SUBTYPE.MELEE, power: 4, description: '+4 melee damage',  icon: '\u{1F525}' },

    // Ranged (power 1-4)
    shortbow:     { id: 'shortbow',     name: 'Shortbow',     category: ITEM_CATEGORY.WEAPON, subtype: WEAPON_SUBTYPE.RANGED, power: 1, description: '+1 ranged damage', icon: '\u{1F3F9}' },
    longbow:      { id: 'longbow',      name: 'Longbow',      category: ITEM_CATEGORY.WEAPON, subtype: WEAPON_SUBTYPE.RANGED, power: 2, description: '+2 ranged damage', icon: '\u{1F3F9}' },
    crossbow:     { id: 'crossbow',     name: 'Crossbow',     category: ITEM_CATEGORY.WEAPON, subtype: WEAPON_SUBTYPE.RANGED, power: 3, description: '+3 ranged damage', icon: '\u{1F3F9}' },
    arbalest:     { id: 'arbalest',     name: 'Arbalest',     category: ITEM_CATEGORY.WEAPON, subtype: WEAPON_SUBTYPE.RANGED, power: 4, description: '+4 ranged damage', icon: '\u{1F3F9}' },

    // Magic (power 1-4)
    apprentice_wand: { id: 'apprentice_wand', name: "Apprentice's Wand", category: ITEM_CATEGORY.WEAPON, subtype: WEAPON_SUBTYPE.MAGIC, power: 1, description: '+1 magic damage', icon: '\u{1FA84}' },
    oak_staff:       { id: 'oak_staff',       name: 'Oak Staff',         category: ITEM_CATEGORY.WEAPON, subtype: WEAPON_SUBTYPE.MAGIC, power: 2, description: '+2 magic damage', icon: '\u{1FA84}' },
    crystal_staff:   { id: 'crystal_staff',   name: 'Crystal Staff',     category: ITEM_CATEGORY.WEAPON, subtype: WEAPON_SUBTYPE.MAGIC, power: 3, description: '+3 magic damage', icon: '\u{1F52E}' },
    archmage_staff:  { id: 'archmage_staff',  name: "Archmage's Staff",  category: ITEM_CATEGORY.WEAPON, subtype: WEAPON_SUBTYPE.MAGIC, power: 4, description: '+4 magic damage', icon: '\u{1F52E}' },
};

// ──────────────────────────────────────────
// Armor — 4 tiers, blocking 1-4
// ──────────────────────────────────────────

// armorType: 'cloth' | 'leather' | 'chain' | 'plate' — gates which classes can equip.
export const ARMOR = {
    cloth_armor:     { id: 'cloth_armor',     name: 'Cloth Armor',   category: ITEM_CATEGORY.ARMOR, armorType: 'cloth',   blocking: 1, description: 'Blocks 1 damage. (Cloth)',   icon: '\u{1F455}' },
    leather_armor:   { id: 'leather_armor',   name: 'Leather Armor', category: ITEM_CATEGORY.ARMOR, armorType: 'leather', blocking: 2, description: 'Blocks 2 damage. (Leather)', icon: '\u{1F9E5}' },
    chainmail_armor: { id: 'chainmail_armor', name: 'Chainmail',     category: ITEM_CATEGORY.ARMOR, armorType: 'chain',   blocking: 3, description: 'Blocks 3 damage. (Chain)',   icon: '\u{26D3}\uFE0F' },
    plate_armor:     { id: 'plate_armor',     name: 'Plate Mail',    category: ITEM_CATEGORY.ARMOR, armorType: 'plate',   blocking: 4, description: 'Blocks 4 damage. (Plate)',   icon: '\u{1F9FE}' },
};

// ──────────────────────────────────────────
// Shields — 25% chance to block an attack entirely
// ──────────────────────────────────────────

export const SHIELDS = {
    wooden_shield: {
        id: 'wooden_shield',
        name: 'Wooden Shield',
        category: ITEM_CATEGORY.SHIELD,
        blockChance: 0.25,
        description: '25% chance to completely block an incoming attack.',
        icon: '\u{1F6E1}\uFE0F', // 🛡️ — distinct-looking variation for shields
    },
};

// ──────────────────────────────────────────
// Trinkets — cloak / neck / ring / belt, 4 bonus kinds × 4 power tiers
// ──────────────────────────────────────────
// Creative names arranged by tier (1 = common, 4 = legendary).

// Per-tier quality descriptor used in tooltips/tooltips.
const TIER_ADJ = ['', 'Common', 'Uncommon', 'Rare', 'Legendary'];
const TIER_ICONS = ['', '', '\u2728', '\u{1F31F}', '\u{1F525}']; // decorations for t3/t4

/**
 * Manually-curated name table. Indexed as NAMES[kind][bonus][tier-1].
 * Higher tiers get more evocative / powerful-sounding names.
 */
const TRINKET_NAMES = {
    cloak: {
        defense: ['Patched Cloak',          'Traveler\'s Cloak',        'Cloak of the Bastion',      'Mantle of the Aegis Eternal'],
        melee:   ['Brigand\'s Cloak',       'Reaver\'s Mantle',         'Cloak of the Crimson Edge', 'Mantle of the Warlord Unending'],
        ranged:  ['Scout\'s Cloak',         'Hunter\'s Mantle',         'Cloak of the Wind-Stalker', 'Mantle of the Phantom Archer'],
        magic:   ['Novice\'s Cloak',        'Seer\'s Mantle',           'Cloak of Starweave',        'Mantle of the Astral Conduit'],
    },
    neck: {
        defense: ['Tin Pendant',            'Iron Gorget',              'Amulet of the Stalwart',    'Choker of the Immovable Mountain'],
        melee:   ['Tooth Necklace',         'Boar-tusk Amulet',         'Amulet of the Wrathful',    'Pendant of the Bloodsworn Titan'],
        ranged:  ['Feathered Charm',        'Hawkbone Amulet',          'Amulet of the True Shot',   'Pendant of the Eagle-Eyed God'],
        magic:   ['Cracked Talisman',       'Runed Amulet',             'Amulet of the Weaver',      'Pendant of the Archon\'s Voice'],
    },
    ring: {
        defense: ['Copper Band',            'Steel Signet',             'Ring of the Dauntless',     'Signet of the Worldshield'],
        melee:   ['Iron Knuckle-Ring',      'Ring of the Berserker',    'Ring of the Reaving Hand',  'Band of the Deathbringer'],
        ranged:  ['Archer\'s Loop',         'Hunter\'s Ring',           'Ring of the Swift Arrow',   'Band of the Unerring Marksman'],
        magic:   ['Chipped Opal Ring',      'Ring of Minor Focus',      'Ring of the Runesmith',     'Band of the Archmage\'s Will'],
    },
    belt: {
        defense: ['Leather Belt',           'Studded Girdle',           'Belt of the Wardstone',     'Cinch of the Adamant Bulwark'],
        melee:   ['Warrior\'s Sash',        'Belt of the Slayer',       'Girdle of the Crimson Gauntlet', 'Cinch of the Godslayer'],
        ranged:  ['Quiver-strap',           'Ranger\'s Belt',           'Girdle of the Winged Hunter','Cinch of the Starborn Archer'],
        magic:   ['Hempen Sash',            'Belt of Lesser Focus',     'Girdle of Arcane Flow',     'Cinch of the Eternal Mysteries'],
    },
};

const TRINKET_KIND_META = {
    cloak: { slots: ['cloak'],           icon: '\u{1F9E3}', defaultSlotLabel: 'Cloak' },
    neck:  { slots: ['neck'],            icon: '\u{1F4FF}', defaultSlotLabel: 'Neck'  },
    ring:  { slots: ['ring1', 'ring2'],  icon: '\u{1F48D}', defaultSlotLabel: 'Ring'  },
    belt:  { slots: ['belt'],            icon: '\u{1F45D}', defaultSlotLabel: 'Belt'  },
};

/** All generated trinket definitions: TRINKETS[id] = def */
export const TRINKETS = {};

// Programmatically build 4 × 4 × 4 = 64 trinket entries from the name table.
(function buildTrinkets() {
    const kinds   = ['cloak', 'neck', 'ring', 'belt'];
    const bonuses = ['defense', 'melee', 'ranged', 'magic'];
    for (const kind of kinds) {
        for (const bonus of bonuses) {
            for (let tier = 1; tier <= 4; tier++) {
                const name = TRINKET_NAMES[kind][bonus][tier - 1];
                const id = name.toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_|_$/g, '');
                const bonusLabel = bonus.charAt(0).toUpperCase() + bonus.slice(1);
                const tierAdj = TIER_ADJ[tier];
                const deco = TIER_ICONS[tier];
                TRINKETS[id] = {
                    id,
                    name: (deco ? deco + ' ' : '') + name,
                    category: ITEM_CATEGORY.TRINKET,
                    trinketKind: kind,                 // cloak|neck|ring|belt
                    trinketSlots: TRINKET_KIND_META[kind].slots,
                    bonusType:  bonus,
                    bonusValue: tier,
                    tier,
                    description: `${tierAdj} trinket. +${tier} ${bonusLabel} bonus.`,
                    icon: TRINKET_KIND_META[kind].icon,
                };
            }
        }
    }
})();

// ──────────────────────────────────────────
// Combined lookup
// ──────────────────────────────────────────

export const ALL_ITEMS = { ...CONSUMABLES, ...WEAPONS, ...ARMOR, ...SHIELDS, ...TRINKETS };

export function getItemDef(itemId) {
    return ALL_ITEMS[itemId] || null;
}

// ──────────────────────────────────────────
// Loot helpers
// ──────────────────────────────────────────

export const WEAPON_IDS  = Object.keys(WEAPONS);
export const ARMOR_IDS   = Object.keys(ARMOR);
export const SHIELD_IDS  = Object.keys(SHIELDS);
export const TRINKET_IDS = Object.keys(TRINKETS);

/** Pick a random weapon, weighted toward lower tiers. */
export function randomWeaponDrop() {
    const roll = Math.random();
    let tier;
    if (roll < 0.40)      tier = 1;
    else if (roll < 0.70) tier = 2;
    else if (roll < 0.90) tier = 3;
    else                  tier = 4;

    const candidates = WEAPON_IDS.filter(id => WEAPONS[id].power === tier);
    return candidates[Math.floor(Math.random() * candidates.length)];
}

/** Pick a random armor drop, weighted toward lower tiers. */
export function randomArmorDrop() {
    const roll = Math.random();
    let tier;
    if (roll < 0.40)      tier = 1;
    else if (roll < 0.70) tier = 2;
    else if (roll < 0.90) tier = 3;
    else                  tier = 4;

    const candidates = ARMOR_IDS.filter(id => ARMOR[id].blocking === tier);
    return candidates[Math.floor(Math.random() * candidates.length)];
}

/** Pick a random shield drop (currently only one type). */
export function randomShieldDrop() {
    return SHIELD_IDS[Math.floor(Math.random() * SHIELD_IDS.length)];
}

/**
 * Pick a random trinket drop — weighted toward lower tiers so legendary
 * items stay rare. Returns an itemId from TRINKETS.
 */
export function randomTrinketDrop() {
    const roll = Math.random();
    let tier;
    if (roll < 0.55)      tier = 1;
    else if (roll < 0.85) tier = 2;
    else if (roll < 0.97) tier = 3;
    else                  tier = 4;

    const candidates = TRINKET_IDS.filter(id => TRINKETS[id].tier === tier);
    return candidates[Math.floor(Math.random() * candidates.length)];
}

// ──────────────────────────────────────────
// Shop pricing — buy/sell helpers
// ──────────────────────────────────────────

/**
 * Get the buy price for an item. Returns 0 if not purchasable.
 * Weapons: 50g per power, Armor: 50g per blocking, Shield: 150g,
 * Food: 50g, Healing potion: 50g.
 * Trinkets: 150g × tier (shop only sells tier 1; higher tiers are loot-only).
 */
export function getItemBuyPrice(itemId) {
    const def = getItemDef(itemId);
    if (!def) return 0;
    if (def.category === ITEM_CATEGORY.WEAPON) return (def.power || 1) * 50;
    if (def.category === ITEM_CATEGORY.ARMOR) return (def.blocking || 1) * 50;
    if (def.category === ITEM_CATEGORY.SHIELD) return 150;
    if (def.category === ITEM_CATEGORY.TRINKET) return (def.tier || 1) * 150;
    if (itemId === 'food') return 50;
    if (itemId === 'healing_potion') return 50;
    if (itemId === 'resurrection_potion') return 200;
    if (itemId === 'torch') return 25;
    if (itemId === 'lantern') return 100;
    if (itemId === 'lantern_oil') return 30;
    // magical_reagent / tiered reagents — not sold; only drop from monsters.
    // Potions are CRAFTED by artificers, not bought; sell-value only.
    return 0;
}

/**
 * Get the sell price for an item. Normally half of buy price, but a few
 * craft-only items have a sell-only floor (so dump-selling spare reagents or
 * potions isn't completely worthless).
 */
export function getItemSellPrice(itemId) {
    const buy = getItemBuyPrice(itemId);
    if (buy > 0) return Math.floor(buy / 2);
    // Craft-only fallbacks:
    if (itemId === 'reagent_common')        return 10;
    if (itemId === 'reagent_uncommon')      return 25;
    if (itemId === 'reagent_rare')          return 75;
    if (itemId === 'magical_reagent')       return 10;
    if (itemId === 'minor_healing_potion')  return 25;
    if (itemId === 'greater_healing_potion')return 75;
    if (itemId === 'elixir_warding')        return 125;
    if (itemId === 'elixir_wrath')          return 125;
    return 0;
}
