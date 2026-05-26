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
        combatUsable: true,
    },
    resurrection_potion: {
        id: 'resurrection_potion',
        name: 'Resurrection Potion',
        category: ITEM_CATEGORY.CONSUMABLE,
        description: 'Revives a fallen party member to full health. Sold by the Tinkerer.',
        icon: '\u{1F56F}\uFE0F', // candle
        stackable: true,
        combatUsable: true,
        targetDead: true,
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

    // Tier 4–7 reagents — drop at dungeon level 15 / 20 / 25 / 30 (1% per monster,
    // guaranteed 1 per boss and 2 per mega boss at the appropriate depth).
    // Required for +4/+5/+6/+7 enchantments, advanced golems, and trinket upgrades.
    reagent_epic: {
        id: 'reagent_epic',
        name: 'Epic Reagent',
        category: ITEM_CATEGORY.CONSUMABLE,
        description: 'A fragment of elder-dragon bone or planar crystal. Drops from dungeon level 15+ monsters. Required for +4 enchantments and adamantine golems.',
        icon: '\u{1F536}', // 🔶
        stackable: true,
        reagentTier: 'epic',
    },
    reagent_legendary: {
        id: 'reagent_legendary',
        name: 'Legendary Reagent',
        category: ITEM_CATEGORY.CONSUMABLE,
        description: 'Condensed stardust or archon feather. Drops from dungeon level 20+ monsters. Required for +5 enchantments and the mightiest golem tiers.',
        icon: '\u{1F537}', // 🔷
        stackable: true,
        reagentTier: 'legendary',
    },
    reagent_mythic: {
        id: 'reagent_mythic',
        name: 'Mythic Reagent',
        category: ITEM_CATEGORY.CONSUMABLE,
        description: 'A shard of the primordial void or godsteel splinter. Drops from dungeon level 25+ monsters. Required for +6 enchantments.',
        icon: '\u{1F31F}', // 🌟
        stackable: true,
        reagentTier: 'mythic',
    },
    reagent_divine: {
        id: 'reagent_divine',
        name: 'Divine Reagent',
        category: ITEM_CATEGORY.CONSUMABLE,
        description: 'A crystallised divine spark or tear of an angel. Drops only from dungeon level 30+ monsters. Required for +7 enchantments and the divine soul golem.',
        icon: '\u{2728}', // ✨ (distinct from common by context)
        stackable: true,
        reagentTier: 'divine',
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
        combatUsable: true,
    },
    greater_healing_potion: {
        id: 'greater_healing_potion',
        name: 'Greater Healing Potion',
        category: ITEM_CATEGORY.CONSUMABLE,
        description: 'Restores 75% of one character\'s max HP. Usable in and out of combat.',
        icon: '\u{1F489}', // 💉
        stackable: true,
        potionKind: 'heal_greater',
        combatUsable: true,
    },
    elixir_warding: {
        id: 'elixir_warding',
        name: 'Scroll of Warding',
        category: ITEM_CATEGORY.CONSUMABLE,
        description: 'Read aloud: grants the entire party bonus defense (+2 base, +1 per 5 artificer levels). Duration: 5 min + 1 min per 2 artificer levels.',
        icon: '\u{1F6E1}️', // 🛡️
        stackable: true,
        potionKind: 'buff_warding',
        combatUsable: true,
        targetParty: true,
    },
    elixir_wrath: {
        id: 'elixir_wrath',
        name: 'Scroll of Wrath',
        category: ITEM_CATEGORY.CONSUMABLE,
        description: 'Read aloud: grants the entire party bonus damage to all attack types (+2 base, +1 per 5 artificer levels). Duration: 5 min + 1 min per 2 artificer levels.',
        icon: '\u{1F525}', // 🔥
        stackable: true,
        potionKind: 'buff_wrath',
        combatUsable: true,
        targetParty: true,
    },
    captured_trap: {
        id: 'captured_trap',
        name: 'Captured Trap',
        category: ITEM_CATEGORY.CONSUMABLE,
        description: 'Recovered by a level 25+ rogue after a successful trap disarm. In combat, a rogue can spring one to blast all monsters for heavy melee-type damage and a 3-round damage-over-time effect. Incorporeal foes are immune.',
        icon: '\u{1FAA4}', // mouse trap-ish
        stackable: true,
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
    flame_sword:  { id: 'flame_sword',  name: 'War Blade',    category: ITEM_CATEGORY.WEAPON, subtype: WEAPON_SUBTYPE.MELEE, power: 4, description: '+4 melee damage',  icon: '\u{1F5E1}' },

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

// Programmatically build 4 × 4 × 4 = 64 single-aspect trinket entries.
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
                    trinketKind: kind,
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

// ── Dual-aspect trinkets (DL10+ loot only) ──────────────────────────────────
// Each has +tier Defense AND +tier <secondary> (melee / ranged / magic).
// 4 kinds × 3 secondaries × 4 tiers = 48 entries, all flagged dualAspect:true.
// IDs follow the pattern: dual_<kind>_<secondary>_t<tier>
(function buildDualTrinkets() {
    const kinds       = ['cloak', 'neck', 'ring', 'belt'];
    const secondaries = ['melee', 'ranged', 'magic'];
    // Epithets give dual-aspect items a distinct flavour while still using the
    // defense name as the base (keeps them recognizable by slot).
    const epithet = { melee: 'of Blades', ranged: 'of Arrows', magic: 'of Sorcery' };
    for (const kind of kinds) {
        for (const secondary of secondaries) {
            for (let tier = 1; tier <= 4; tier++) {
                const baseName = TRINKET_NAMES[kind]['defense'][tier - 1];
                const deco     = TIER_ICONS[tier];
                const name     = (deco ? deco + ' ' : '') + baseName + ' ' + epithet[secondary];
                const id       = `dual_${kind}_${secondary}_t${tier}`;
                const secLabel = secondary.charAt(0).toUpperCase() + secondary.slice(1);
                const tierAdj  = TIER_ADJ[tier];
                TRINKETS[id] = {
                    id,
                    name,
                    category:     ITEM_CATEGORY.TRINKET,
                    trinketKind:  kind,
                    trinketSlots: TRINKET_KIND_META[kind].slots,
                    bonusType:    'defense',
                    bonusValue:   tier,
                    bonusType2:   secondary,
                    bonusValue2:  tier,
                    tier,
                    dualAspect:   true,
                    description:  `${tierAdj} dual-aspect trinket. +${tier} Defense, +${tier} ${secLabel}. (DL10+ loot only)`,
                    icon:         TRINKET_KIND_META[kind].icon,
                };
            }
        }
    }
})();

// ──────────────────────────────────────────
// Legendary Items — awarded only from Statue Events (DL30+)
// Weapons: power 11 (base 4 + 7 baked-in enchant), isLegendary stops further enchanting
// Armor:   blocking = base+7, isLegendary stops further enchanting
// Trinkets: dual-aspect +7/+7, isLegendary, all 4 slots × 3 secondaries
// ──────────────────────────────────────────

export const LEGENDARY_ITEMS = {
    // ── Weapons ──────────────────────────────────────────────────────────────
    legendary_warblade: {
        id: 'legendary_warblade',
        name: '\u{2B50} Warblade of the Eternal Champion',
        category: ITEM_CATEGORY.WEAPON, subtype: WEAPON_SUBTYPE.MELEE,
        power: 11, enchantLevel: 7, isLegendary: true,
        description: 'A supreme melee blade, pre-enchanted to +7. Grants +11 melee damage. Add your own rider enchantment.',
        icon: '\u{1F5E1}',
    },
    legendary_arbalest: {
        id: 'legendary_arbalest',
        name: '\u{2B50} Arbalest of the Deadeye Eternal',
        category: ITEM_CATEGORY.WEAPON, subtype: WEAPON_SUBTYPE.RANGED,
        power: 11, enchantLevel: 7, isLegendary: true,
        description: 'A supreme crossbow, pre-enchanted to +7. Grants +11 ranged damage. Add your own rider enchantment.',
        icon: '\u{1F3F9}',
    },
    legendary_archmage_staff: {
        id: 'legendary_archmage_staff',
        name: '\u{2B50} Staff of the Archon Supreme',
        category: ITEM_CATEGORY.WEAPON, subtype: WEAPON_SUBTYPE.MAGIC,
        power: 11, enchantLevel: 7, isLegendary: true,
        description: 'A supreme magic staff, pre-enchanted to +7. Grants +11 magic damage. Add your own rider enchantment.',
        icon: '\u{1F52E}',
    },
    // ── Armor ─────────────────────────────────────────────────────────────────
    legendary_cloth_armor: {
        id: 'legendary_cloth_armor',
        name: '\u{2B50} Robes of the Arcane Sovereign',
        category: ITEM_CATEGORY.ARMOR, armorType: 'cloth',
        blocking: 8, enchantLevel: 7, isLegendary: true,
        description: 'Supreme cloth armor, pre-enchanted to +7. Blocks 8 damage. Add your own wards.',
        icon: '\u{1F455}',
    },
    legendary_leather_armor: {
        id: 'legendary_leather_armor',
        name: '\u{2B50} Leathers of the Shadow Eternal',
        category: ITEM_CATEGORY.ARMOR, armorType: 'leather',
        blocking: 9, enchantLevel: 7, isLegendary: true,
        description: 'Supreme leather armor, pre-enchanted to +7. Blocks 9 damage. Add your own wards.',
        icon: '\u{1F9E5}',
    },
    legendary_chainmail_armor: {
        id: 'legendary_chainmail_armor',
        name: '\u{2B50} Chainmail of the Ironborn Titan',
        category: ITEM_CATEGORY.ARMOR, armorType: 'chain',
        blocking: 10, enchantLevel: 7, isLegendary: true,
        description: 'Supreme chainmail, pre-enchanted to +7. Blocks 10 damage. Add your own wards.',
        icon: '\u{26D3}️',
    },
    legendary_plate_armor: {
        id: 'legendary_plate_armor',
        name: '\u{2B50} Plate of the Undying Champion',
        category: ITEM_CATEGORY.ARMOR, armorType: 'plate',
        blocking: 11, enchantLevel: 7, isLegendary: true,
        description: 'Supreme plate armor, pre-enchanted to +7. Blocks 11 damage. Add your own wards.',
        icon: '\u{1F9FE}',
    },
    legendary_shield: {
        id: 'legendary_shield',
        name: '\u{2B50} Aegis of the Eternal Bulwark',
        category: ITEM_CATEGORY.SHIELD,
        blockChance: 0.40, blocking: 7, enchantLevel: 7, isLegendary: true,
        description: 'Supreme shield, pre-enchanted to +7. 40% block chance, adds +7 defense. Add your own ward spikes.',
        icon: '\u{1F6E1}️',
    },
    // ── Trinkets: dual-aspect +7/+7, 4 slots × 3 secondaries = 12 ──────────
    legendary_cloak_melee: {
        id: 'legendary_cloak_melee', name: '\u{2B50} Mantle of Boundless Valor',
        category: ITEM_CATEGORY.TRINKET, trinketKind: 'cloak', trinketSlots: ['cloak'],
        bonusType: 'defense', bonusValue: 7, bonusType2: 'melee', bonusValue2: 7,
        tier: 7, dualAspect: true, isLegendary: true,
        description: 'Legendary dual-aspect cloak. +7 Defense, +7 Melee. (Statue Event loot)',
        icon: '\u{1F9E3}',
    },
    legendary_cloak_ranged: {
        id: 'legendary_cloak_ranged', name: '\u{2B50} Mantle of the Eternal Hunter',
        category: ITEM_CATEGORY.TRINKET, trinketKind: 'cloak', trinketSlots: ['cloak'],
        bonusType: 'defense', bonusValue: 7, bonusType2: 'ranged', bonusValue2: 7,
        tier: 7, dualAspect: true, isLegendary: true,
        description: 'Legendary dual-aspect cloak. +7 Defense, +7 Ranged. (Statue Event loot)',
        icon: '\u{1F9E3}',
    },
    legendary_cloak_magic: {
        id: 'legendary_cloak_magic', name: '\u{2B50} Mantle of the Archmage Eternal',
        category: ITEM_CATEGORY.TRINKET, trinketKind: 'cloak', trinketSlots: ['cloak'],
        bonusType: 'defense', bonusValue: 7, bonusType2: 'magic', bonusValue2: 7,
        tier: 7, dualAspect: true, isLegendary: true,
        description: 'Legendary dual-aspect cloak. +7 Defense, +7 Magic. (Statue Event loot)',
        icon: '\u{1F9E3}',
    },
    legendary_neck_melee: {
        id: 'legendary_neck_melee', name: '\u{2B50} Pendant of the Deathbringer',
        category: ITEM_CATEGORY.TRINKET, trinketKind: 'neck', trinketSlots: ['neck'],
        bonusType: 'defense', bonusValue: 7, bonusType2: 'melee', bonusValue2: 7,
        tier: 7, dualAspect: true, isLegendary: true,
        description: 'Legendary dual-aspect amulet. +7 Defense, +7 Melee. (Statue Event loot)',
        icon: '\u{1F4FF}',
    },
    legendary_neck_ranged: {
        id: 'legendary_neck_ranged', name: '\u{2B50} Pendant of the Marksman Supreme',
        category: ITEM_CATEGORY.TRINKET, trinketKind: 'neck', trinketSlots: ['neck'],
        bonusType: 'defense', bonusValue: 7, bonusType2: 'ranged', bonusValue2: 7,
        tier: 7, dualAspect: true, isLegendary: true,
        description: 'Legendary dual-aspect amulet. +7 Defense, +7 Ranged. (Statue Event loot)',
        icon: '\u{1F4FF}',
    },
    legendary_neck_magic: {
        id: 'legendary_neck_magic', name: '\u{2B50} Pendant of the Void Conduit',
        category: ITEM_CATEGORY.TRINKET, trinketKind: 'neck', trinketSlots: ['neck'],
        bonusType: 'defense', bonusValue: 7, bonusType2: 'magic', bonusValue2: 7,
        tier: 7, dualAspect: true, isLegendary: true,
        description: 'Legendary dual-aspect amulet. +7 Defense, +7 Magic. (Statue Event loot)',
        icon: '\u{1F4FF}',
    },
    legendary_ring_melee: {
        id: 'legendary_ring_melee', name: '\u{2B50} Signet of the Worldbreaker',
        category: ITEM_CATEGORY.TRINKET, trinketKind: 'ring', trinketSlots: ['ring1', 'ring2'],
        bonusType: 'defense', bonusValue: 7, bonusType2: 'melee', bonusValue2: 7,
        tier: 7, dualAspect: true, isLegendary: true,
        description: 'Legendary dual-aspect ring. +7 Defense, +7 Melee. (Statue Event loot)',
        icon: '\u{1F48D}',
    },
    legendary_ring_ranged: {
        id: 'legendary_ring_ranged', name: '\u{2B50} Signet of the Deadeye God',
        category: ITEM_CATEGORY.TRINKET, trinketKind: 'ring', trinketSlots: ['ring1', 'ring2'],
        bonusType: 'defense', bonusValue: 7, bonusType2: 'ranged', bonusValue2: 7,
        tier: 7, dualAspect: true, isLegendary: true,
        description: 'Legendary dual-aspect ring. +7 Defense, +7 Ranged. (Statue Event loot)',
        icon: '\u{1F48D}',
    },
    legendary_ring_magic: {
        id: 'legendary_ring_magic', name: '\u{2B50} Signet of the Arcane Infinite',
        category: ITEM_CATEGORY.TRINKET, trinketKind: 'ring', trinketSlots: ['ring1', 'ring2'],
        bonusType: 'defense', bonusValue: 7, bonusType2: 'magic', bonusValue2: 7,
        tier: 7, dualAspect: true, isLegendary: true,
        description: 'Legendary dual-aspect ring. +7 Defense, +7 Magic. (Statue Event loot)',
        icon: '\u{1F48D}',
    },
    legendary_belt_melee: {
        id: 'legendary_belt_melee', name: '\u{2B50} Girdle of the God-Slayer',
        category: ITEM_CATEGORY.TRINKET, trinketKind: 'belt', trinketSlots: ['belt'],
        bonusType: 'defense', bonusValue: 7, bonusType2: 'melee', bonusValue2: 7,
        tier: 7, dualAspect: true, isLegendary: true,
        description: 'Legendary dual-aspect belt. +7 Defense, +7 Melee. (Statue Event loot)',
        icon: '\u{1F45D}',
    },
    legendary_belt_ranged: {
        id: 'legendary_belt_ranged', name: '\u{2B50} Girdle of the Starborn Archer',
        category: ITEM_CATEGORY.TRINKET, trinketKind: 'belt', trinketSlots: ['belt'],
        bonusType: 'defense', bonusValue: 7, bonusType2: 'ranged', bonusValue2: 7,
        tier: 7, dualAspect: true, isLegendary: true,
        description: 'Legendary dual-aspect belt. +7 Defense, +7 Ranged. (Statue Event loot)',
        icon: '\u{1F45D}',
    },
    legendary_belt_magic: {
        id: 'legendary_belt_magic', name: '\u{2B50} Girdle of the Eternal Mysteries',
        category: ITEM_CATEGORY.TRINKET, trinketKind: 'belt', trinketSlots: ['belt'],
        bonusType: 'defense', bonusValue: 7, bonusType2: 'magic', bonusValue2: 7,
        tier: 7, dualAspect: true, isLegendary: true,
        description: 'Legendary dual-aspect belt. +7 Defense, +7 Magic. (Statue Event loot)',
        icon: '\u{1F45D}',
    },
};

// ──────────────────────────────────────────
// Combined lookup
// ──────────────────────────────────────────

export const ALL_ITEMS = { ...CONSUMABLES, ...WEAPONS, ...ARMOR, ...SHIELDS, ...TRINKETS, ...LEGENDARY_ITEMS };

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
 *
 * At DL10+, rolls first for a dual-aspect (Defense + one other bonus):
 *   25% base chance at DL10, +1% per level above 10, capped at 100% at DL85.
 * The tier roll (55/30/12/3%) is the same for both single- and dual-aspect.
 *
 * @param {number} [dungeonLevel=1]
 */
export function randomTrinketDrop(dungeonLevel = 1) {
    // ── Dual-aspect check (DL10+ only) ──
    if (dungeonLevel >= 10) {
        const dualChance = Math.min(1.0, 0.25 + (dungeonLevel - 10) * 0.01);
        if (Math.random() < dualChance) {
            const roll = Math.random();
            let tier;
            if (roll < 0.55)      tier = 1;
            else if (roll < 0.85) tier = 2;
            else if (roll < 0.97) tier = 3;
            else                  tier = 4;

            const kinds       = ['cloak', 'neck', 'ring', 'belt'];
            const secondaries = ['melee', 'ranged', 'magic'];
            const kind      = kinds[Math.floor(Math.random() * kinds.length)];
            const secondary = secondaries[Math.floor(Math.random() * secondaries.length)];
            const id = `dual_${kind}_${secondary}_t${tier}`;
            if (TRINKETS[id]) return id;
        }
    }

    // ── Single-aspect (original logic) ──
    const roll = Math.random();
    let tier;
    if (roll < 0.55)      tier = 1;
    else if (roll < 0.85) tier = 2;
    else if (roll < 0.97) tier = 3;
    else                  tier = 4;

    const candidates = TRINKET_IDS.filter(id => TRINKETS[id].tier === tier && !TRINKETS[id].dualAspect);
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
    // Tiered reagents — purchasable at the Wandering Tinkerer.
    if (itemId === 'reagent_common')    return 500;
    if (itemId === 'reagent_uncommon')  return 2000;
    if (itemId === 'reagent_rare')      return 5000;
    if (itemId === 'reagent_epic')      return 20000;
    if (itemId === 'reagent_legendary') return 75000;
    if (itemId === 'reagent_mythic')    return 250000;
    if (itemId === 'reagent_divine')    return 1000000;
    // magical_reagent (legacy) not sold; potions crafted by artificers only.
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
    if (itemId === 'reagent_epic')          return 200;
    if (itemId === 'reagent_legendary')     return 750;
    if (itemId === 'reagent_mythic')        return 2500;
    if (itemId === 'reagent_divine')        return 10000;
    if (itemId === 'magical_reagent')       return 10;
    if (itemId === 'minor_healing_potion')  return 25;
    if (itemId === 'greater_healing_potion')return 75;
    if (itemId === 'elixir_warding')        return 125;
    if (itemId === 'elixir_wrath')          return 125;
    return 0;
}
