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

    // Advanced artificer materials (L25+ monster drops, separate from reagents).
    material_hide: {
        id: 'material_hide',
        name: 'Hide',
        category: ITEM_CATEGORY.CONSUMABLE,
        description: 'A durable hide used for advanced artificer crafting.',
        icon: '\u{1F9F5}',
        stackable: true,
    },
    material_displacer_beast_hide: {
        id: 'material_displacer_beast_hide',
        name: 'Displacer Beast Hide',
        category: ITEM_CATEGORY.CONSUMABLE,
        description: 'Phase-warped hide from a displacer beast.',
        icon: '\u{1F9E5}',
        stackable: true,
    },
    material_dragon_hide: {
        id: 'material_dragon_hide',
        name: 'Dragon Hide',
        category: ITEM_CATEGORY.CONSUMABLE,
        description: 'Uncolored dragon hide for defensive armor augments.',
        icon: '\u{1F409}',
        stackable: true,
    },
    material_red_dragon_hide: {
        id: 'material_red_dragon_hide',
        name: 'Red Dragon Hide',
        category: ITEM_CATEGORY.CONSUMABLE,
        description: 'Red dragon hide for fire resistance armor augments.',
        icon: '\u{1F525}',
        stackable: true,
    },
    material_white_dragon_hide: {
        id: 'material_white_dragon_hide',
        name: 'White Dragon Hide',
        category: ITEM_CATEGORY.CONSUMABLE,
        description: 'White dragon hide for cold resistance armor augments.',
        icon: '\u2744\uFE0F',
        stackable: true,
    },
    material_black_dragon_hide: {
        id: 'material_black_dragon_hide',
        name: 'Black Dragon Hide',
        category: ITEM_CATEGORY.CONSUMABLE,
        description: 'Black dragon hide for acid resistance armor augments.',
        icon: '\u{1F9EA}',
        stackable: true,
    },
    material_green_dragon_hide: {
        id: 'material_green_dragon_hide',
        name: 'Green Dragon Hide',
        category: ITEM_CATEGORY.CONSUMABLE,
        description: 'Green dragon hide for poison resistance armor augments.',
        icon: '\u{1F7E2}',
        stackable: true,
    },
    material_blue_dragon_hide: {
        id: 'material_blue_dragon_hide',
        name: 'Blue Dragon Hide',
        category: ITEM_CATEGORY.CONSUMABLE,
        description: 'Blue dragon hide for lightning resistance armor augments.',
        icon: '\u26A1',
        stackable: true,
    },
    material_construct_heart: {
        id: 'material_construct_heart',
        name: 'Golem Heart',
        category: ITEM_CATEGORY.CONSUMABLE,
        description: 'A pulsing core salvaged from a construct or golem.',
        icon: '\u{2699}\uFE0F',
        stackable: true,
    },
    material_construct_head: {
        id: 'material_construct_head',
        name: 'Golem Head',
        category: ITEM_CATEGORY.CONSUMABLE,
        description: 'An intact construct cranial housing suitable for a golem.',
        icon: '\u{1F916}',
        stackable: true,
    },
    material_construct_arm: {
        id: 'material_construct_arm',
        name: 'Golem Arm',
        category: ITEM_CATEGORY.CONSUMABLE,
        description: 'A reinforced construct limb segment suitable for a golem.',
        icon: '\u{1F9BE}',
        stackable: true,
    },
    material_construct_leg: {
        id: 'material_construct_leg',
        name: 'Golem Leg',
        category: ITEM_CATEGORY.CONSUMABLE,
        description: 'A heavy construct locomotion limb suitable for a golem.',
        icon: '\u{1F9BF}',
        stackable: true,
    },
    material_construct_torso: {
        id: 'material_construct_torso',
        name: 'Golem Torso',
        category: ITEM_CATEGORY.CONSUMABLE,
        description: 'A construct torso frame with mounting points for a golem.',
        icon: '\u{1F9F1}',
        stackable: true,
    },
    material_fire_essence: {
        id: 'material_fire_essence',
        name: 'Fire Essence',
        category: ITEM_CATEGORY.CONSUMABLE,
        description: 'Condensed elemental flame.',
        icon: '\u{1F525}',
        stackable: true,
    },
    material_air_essence: {
        id: 'material_air_essence',
        name: 'Air Essence',
        category: ITEM_CATEGORY.CONSUMABLE,
        description: 'Condensed elemental wind.',
        icon: '\u{1F4A8}',
        stackable: true,
    },
    material_earth_essence: {
        id: 'material_earth_essence',
        name: 'Earth Essence',
        category: ITEM_CATEGORY.CONSUMABLE,
        description: 'Condensed elemental stone.',
        icon: '\u{1FAA8}',
        stackable: true,
    },
    material_water_essence: {
        id: 'material_water_essence',
        name: 'Water Essence',
        category: ITEM_CATEGORY.CONSUMABLE,
        description: 'Condensed elemental tide.',
        icon: '\u{1F4A7}',
        stackable: true,
    },
    material_void_essence: {
        id: 'material_void_essence',
        name: 'Void Essence',
        category: ITEM_CATEGORY.CONSUMABLE,
        description: 'Condensed emptiness from void-touched elementals.',
        icon: '\u{1F311}',
        stackable: true,
    },
    material_giant_heart: {
        id: 'material_giant_heart',
        name: 'Giant Heart',
        category: ITEM_CATEGORY.CONSUMABLE,
        description: 'A massive giant heart still warm with power.',
        icon: '\u{1FAC0}',
        stackable: true,
    },
    material_dragon_heart: {
        id: 'material_dragon_heart',
        name: 'Dragon Heart',
        category: ITEM_CATEGORY.CONSUMABLE,
        description: 'A dragon heart charged with ancient might.',
        icon: '\u{1F9E1}',
        stackable: true,
    },
    material_undead_essence: {
        id: 'material_undead_essence',
        name: 'Undead Essence',
        category: ITEM_CATEGORY.CONSUMABLE,
        description: 'Residual necrotic essence from undead remains.',
        icon: '\u2620\uFE0F',
        stackable: true,
    },
    material_lich_part: {
        id: 'material_lich_part',
        name: 'Lich Part',
        category: ITEM_CATEGORY.CONSUMABLE,
        description: 'A potent remnant from a lich or dracolich.',
        icon: '\u{1F9B4}',
        stackable: true,
    },
    material_troll_blood: {
        id: 'material_troll_blood',
        name: 'Troll Blood',
        category: ITEM_CATEGORY.CONSUMABLE,
        description: 'Thick regenerative blood harvested from a troll.',
        icon: '\u{1FA78}',
        stackable: true,
    },
    material_vermin_parts: {
        id: 'material_vermin_parts',
        name: 'Vermin Parts',
        category: ITEM_CATEGORY.CONSUMABLE,
        description: 'Carapace, fangs, and glands from vermin.',
        icon: '\u{1F577}\uFE0F',
        stackable: true,
    },
    material_venom: {
        id: 'material_venom',
        name: 'Venom',
        category: ITEM_CATEGORY.CONSUMABLE,
        description: 'Potent venom harvested from poisonous monsters. Used for advanced artificer crafting.',
        icon: '\u{1F40D}',
        stackable: true,
    },
    material_ichor: {
        id: 'material_ichor',
        name: 'Ichor',
        category: ITEM_CATEGORY.CONSUMABLE,
        description: 'Viscous ichor collected from slimes.',
        icon: '\u{1F9EA}',
        stackable: true,
    },
    material_plant_parts: {
        id: 'material_plant_parts',
        name: 'Plant Parts',
        category: ITEM_CATEGORY.CONSUMABLE,
        description: 'Fibers, spores, and roots from hostile flora.',
        icon: '\u{1FAB4}',
        stackable: true,
    },
    material_demon_ichor: {
        id: 'material_demon_ichor',
        name: 'Demon Ichor',
        category: ITEM_CATEGORY.CONSUMABLE,
        description: 'Corrupt infernal ichor from demons.',
        icon: '\u{1F47F}',
        stackable: true,
    },
    material_aberration_parts: {
        id: 'material_aberration_parts',
        name: 'Aberration Parts',
        category: ITEM_CATEGORY.CONSUMABLE,
        description: 'Unnatural fragments from aberrant creatures.',
        icon: '\u{1F47E}',
        stackable: true,
    },
    material_hag_eye: {
        id: 'material_hag_eye',
        name: 'Hag Eye',
        category: ITEM_CATEGORY.CONSUMABLE,
        description: 'A preserved hag eye for occult artificing.',
        icon: '\u{1F441}\uFE0F',
        stackable: true,
    },
    material_manticore_spikes: {
        id: 'material_manticore_spikes',
        name: 'Manticore Spikes',
        category: ITEM_CATEGORY.CONSUMABLE,
        description: 'Razor-sharp manticore tail spikes.',
        icon: '\u{1F4CC}',
        stackable: true,
    },
    material_yeti_hide: {
        id: 'material_yeti_hide',
        name: 'Yeti Hide',
        category: ITEM_CATEGORY.CONSUMABLE,
        description: 'Dense fur hide from a yeti.',
        icon: '\u{1F9A3}',
        stackable: true,
    },
    material_werewolf_blood: {
        id: 'material_werewolf_blood',
        name: 'Werewolf Blood',
        category: ITEM_CATEGORY.CONSUMABLE,
        description: 'Cursed blood taken from a werewolf.',
        icon: '\u{1F43A}',
        stackable: true,
    },
    material_harpy_parts: {
        id: 'material_harpy_parts',
        name: 'Harpy Parts',
        category: ITEM_CATEGORY.CONSUMABLE,
        description: 'Talons and feathers from a harpy.',
        icon: '\u{1FAB6}',
        stackable: true,
    },
    material_shrieker_parts: {
        id: 'material_shrieker_parts',
        name: 'Shrieker Parts',
        category: ITEM_CATEGORY.CONSUMABLE,
        description: 'Resonant fungal tissue from a shrieker.',
        icon: '\u{1F344}',
        stackable: true,
    },
    material_dark_treant_wood: {
        id: 'material_dark_treant_wood',
        name: 'Dark Treant Wood',
        category: ITEM_CATEGORY.CONSUMABLE,
        description: 'Cursed heartwood cut from a dark treant.',
        icon: '\u{1FAB5}',
        stackable: true,
    },
    material_mummy_wraps: {
        id: 'material_mummy_wraps',
        name: 'Mummy Wraps',
        category: ITEM_CATEGORY.CONSUMABLE,
        description: 'Ancient funerary wraps steeped in desert necromancy.',
        icon: '\u{1F9FB}',
        stackable: true,
    },
    material_evil_berserker_furs: {
        id: 'material_evil_berserker_furs',
        name: 'Evil Berserker Furs',
        category: ITEM_CATEGORY.CONSUMABLE,
        description: 'Blood-matted furs stripped from an evil berserker.',
        icon: '\u{1F9E5}',
        stackable: true,
    },
    material_cavebear_claws: {
        id: 'material_cavebear_claws',
        name: 'Cavebear Claws',
        category: ITEM_CATEGORY.CONSUMABLE,
        description: 'Massive claws taken from a cave bear.',
        icon: '\u{1F43B}',
        stackable: true,
    },
    material_assassin_lord_blade: {
        id: 'material_assassin_lord_blade',
        name: 'Assassin Lord Blade',
        category: ITEM_CATEGORY.CONSUMABLE,
        description: 'A sinister blade recovered from an assassin lord.',
        icon: '\u{1F5E1}\uFE0F',
        stackable: true,
    },
    material_beholder_eye_lens: {
        id: 'material_beholder_eye_lens',
        name: 'Beholder Eye Lens',
        category: ITEM_CATEGORY.CONSUMABLE,
        description: 'A polished lens from a beholder eye stalk.',
        icon: '\u{1F441}\uFE0F',
        stackable: true,
    },
    material_spellcaster_focus: {
        id: 'material_spellcaster_focus',
        name: 'Spellcaster Focus',
        category: ITEM_CATEGORY.CONSUMABLE,
        description: 'A spell focus salvaged from a defeated spellcaster.',
        icon: '\u{1F52E}',
        stackable: true,
    },
    material_archer_quiver: {
        id: 'material_archer_quiver',
        name: 'Archer Quiver',
        category: ITEM_CATEGORY.CONSUMABLE,
        description: 'A reinforced quiver recovered from a skilled archer.',
        icon: '\u{1F3F9}',
        stackable: true,
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
    mana_potion: {
        id: 'mana_potion',
        name: 'Mana Potion',
        category: ITEM_CATEGORY.CONSUMABLE,
        description: 'Restores 20% of one character\'s max MP. Usable in and out of combat.',
        icon: '\u{1F499}',
        stackable: true,
        potionKind: 'mana',
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
    elemental_bowl: {
        id: 'elemental_bowl',
        name: 'Bowl of Water Elementals',
        category: ITEM_CATEGORY.CONSUMABLE,
        description: 'Crafted by a level 35+ artificer. Use in combat to summon a water elemental. Holds up to 10 charges and regains 1 charge each real-life hour.',
        icon: '\u{1F30A}',
        stackable: true,
        combatUsable: true,
        targetParty: true,
        elementalDevice: 'water',
        maxCharges: 10,
        rechargeMs: 3600000,
        sellValue: 7500,
    },
    elemental_stone: {
        id: 'elemental_stone',
        name: 'Stone of Earth Elementals',
        category: ITEM_CATEGORY.CONSUMABLE,
        description: 'Crafted by a level 35+ artificer. Use in combat to summon an earth elemental. Holds up to 10 charges and regains 1 charge each real-life hour.',
        icon: '\u{1FAA8}',
        stackable: true,
        combatUsable: true,
        targetParty: true,
        elementalDevice: 'earth',
        maxCharges: 10,
        rechargeMs: 3600000,
        sellValue: 7500,
    },
    elemental_censer: {
        id: 'elemental_censer',
        name: 'Censer of Air Elementals',
        category: ITEM_CATEGORY.CONSUMABLE,
        description: 'Crafted by a level 35+ artificer. Use in combat to summon an air elemental. Holds up to 10 charges and regains 1 charge each real-life hour.',
        icon: '\u{1F4A8}',
        stackable: true,
        combatUsable: true,
        targetParty: true,
        elementalDevice: 'air',
        maxCharges: 10,
        rechargeMs: 3600000,
        sellValue: 7500,
    },
    elemental_brazier: {
        id: 'elemental_brazier',
        name: 'Brazier of Fire Elementals',
        category: ITEM_CATEGORY.CONSUMABLE,
        description: 'Crafted by a level 35+ artificer. Use in combat to summon a fire elemental. Holds up to 10 charges and regains 1 charge each real-life hour.',
        icon: '\u{1F525}',
        stackable: true,
        combatUsable: true,
        targetParty: true,
        elementalDevice: 'fire',
        maxCharges: 10,
        rechargeMs: 3600000,
        sellValue: 7500,
    },
    elemental_sceptre: {
        id: 'elemental_sceptre',
        name: 'Sceptre of Void Elementals',
        category: ITEM_CATEGORY.CONSUMABLE,
        description: 'Crafted by a level 35+ artificer. Use in combat to summon a void elemental. Holds up to 10 charges and regains 1 charge each real-life hour.',
        icon: '\u{1F311}',
        stackable: true,
        combatUsable: true,
        targetParty: true,
        elementalDevice: 'void',
        maxCharges: 10,
        rechargeMs: 3600000,
        sellValue: 7500,
    },
    yeti_totem: {
        id: 'yeti_totem',
        name: 'Yeti Totem',
        category: ITEM_CATEGORY.CONSUMABLE,
        description: 'Crafted by a level 35+ artificer. Use in combat to summon a charmed yeti for the entire fight. Holds up to 10 charges and regains 1 charge each real-life hour.',
        icon: '\u2744\uFE0F',
        stackable: true,
        combatUsable: true,
        targetParty: true,
        charmedMonsterDevice: 'yeti',
        maxCharges: 10,
        rechargeMs: 3600000,
        sellValue: 15000,
    },
    werewolf_blood_vial: {
        id: 'werewolf_blood_vial',
        name: 'Werewolf Blood Vial',
        category: ITEM_CATEGORY.CONSUMABLE,
        description: 'Crafted by a level 35+ artificer. Use in combat to summon the White Werewolf Lord as a charmed ally for the entire fight. The Lord empowers party wolves while alive. Holds up to 10 charges and regains 1 charge each real-life hour.',
        icon: '\u{1FA78}',
        stackable: true,
        combatUsable: true,
        targetParty: true,
        charmedMonsterDevice: 'werewolf',
        maxCharges: 10,
        rechargeMs: 3600000,
        sellValue: 20000,
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
    manticore_ballista: {
        id: 'manticore_ballista',
        name: 'Manticore Ballista',
        category: ITEM_CATEGORY.WEAPON,
        subtype: WEAPON_SUBTYPE.RANGED,
        power: 7,
        enchantLevel: 7,
        isLegendary: true,
        requiredClasses: ['ranger', 'artificer'],
        requiredLevel: 35,
        sellValue: 75000,
        description: '+7 ranged. Ranger or Artificer 35+: core ranged/scatter targets can be knocked prone; +5% crit chance, +15% critical damage, +5% to each Ricochet cascade chance, and +2 Scatter Shot targets. Drones are not affected.',
        icon: '\u{1F3F9}',
    },

    // Magic (power 1-4)
    apprentice_wand: { id: 'apprentice_wand', name: "Apprentice's Wand", category: ITEM_CATEGORY.WEAPON, subtype: WEAPON_SUBTYPE.MAGIC, power: 1, description: '+1 magic damage', icon: '\u{1FA84}' },
    oak_staff:       { id: 'oak_staff',       name: 'Oak Staff',         category: ITEM_CATEGORY.WEAPON, subtype: WEAPON_SUBTYPE.MAGIC, power: 2, description: '+2 magic damage', icon: '\u{1FA84}' },
    crystal_staff:   { id: 'crystal_staff',   name: 'Crystal Staff',     category: ITEM_CATEGORY.WEAPON, subtype: WEAPON_SUBTYPE.MAGIC, power: 3, description: '+3 magic damage', icon: '\u{1F52E}' },
    archmage_staff:  { id: 'archmage_staff',  name: "Archmage's Staff",  category: ITEM_CATEGORY.WEAPON, subtype: WEAPON_SUBTYPE.MAGIC, power: 4, description: '+4 magic damage', icon: '\u{1F52E}' },
    instrument_bards: {
        id: 'instrument_bards',
        name: 'Instrument of the Bards',
        category: ITEM_CATEGORY.WEAPON,
        subtype: WEAPON_SUBTYPE.MAGIC,
        power: 7,
        enchantLevel: 7,
        isLegendary: true,
        defenseBonus: 7,
        requiredClass: 'bard',
        requiredLevel: 35,
        sellValue: 75000,
        description: '+7 magic and +7 defense. Bard 35+: Disrupt deals triple damage and is harder to resist, Symphony damage doubles, Melody restores +5%, Bard Song gains +1 initiative/attack/defense/regen, Thunderous Drums gains +5% potency, and regular magic attacks deal +15% damage.',
        icon: '\u{1F3B5}',
    },
    staff_of_necromancy: {
        id: 'staff_of_necromancy',
        name: 'Staff of Necromancy',
        category: ITEM_CATEGORY.WEAPON,
        subtype: WEAPON_SUBTYPE.MAGIC,
        power: 7,
        enchantLevel: 7,
        isLegendary: true,
        requiredClass: 'necromancer',
        requiredLevel: 35,
        sellValue: 75000,
        description: '+7 magic. Necromancer 35+: shorter Lich Form phylactery, stronger undead summons, stronger necromantic AoE, and +5% Control the Dead.',
        icon: '\u{1F480}',
    },
    staff_world_tree: {
        id: 'staff_world_tree',
        name: 'Staff of the World Tree',
        category: ITEM_CATEGORY.WEAPON,
        subtype: WEAPON_SUBTYPE.MAGIC,
        power: 7,
        enchantLevel: 7,
        isLegendary: true,
        requiredClass: 'druid',
        requiredLevel: 35,
        sellValue: 75000,
        description: '+7 magic. Druid 35+: empowers Verdant Surge, plant summons, and Treant Wild Shape into World Tree form.',
        icon: '\u{1F333}',
    },
    hag_eye_rod: {
        id: 'hag_eye_rod',
        name: 'Hag Eye Rod',
        category: ITEM_CATEGORY.WEAPON,
        subtype: WEAPON_SUBTYPE.MAGIC,
        power: 7,
        enchantLevel: 7,
        isLegendary: true,
        requiredClass: 'mage',
        requiredLevel: 35,
        specialOffhandSlot: true,
        noAdditionalEnhancements: true,
        maxManaPct: 0.15,
        sellValue: 75000,
        description: '+7 magic. Mage 35+: equips in the off hand, +15% max mana, +5% magic AoE crit chance, +1 Mirror Image, and empowers rift/device elementals with +15% health, +15% damage, and +5 defense.',
        icon: '\u{1FA84}',
    },
    lance_dragon_king: {
        id: 'lance_dragon_king',
        name: 'Lance of the Dragon King',
        category: ITEM_CATEGORY.WEAPON,
        subtype: WEAPON_SUBTYPE.MELEE,
        power: 7,
        enchantLevel: 7,
        isLegendary: true,
        requiredClass: 'paladin',
        requiredLevel: 35,
        sellValue: 75000,
        description: '+7 melee. Paladin 35+: Smite and AoE Smite deal +50% damage; Dragonslayer adds +10% damage against dragons.',
        icon: '\u{1F531}',
    },
    mummy_fist_wraps: {
        id: 'mummy_fist_wraps',
        name: 'Mummy Fist Wraps',
        category: ITEM_CATEGORY.WEAPON,
        subtype: WEAPON_SUBTYPE.MELEE,
        power: 7,
        enchantLevel: 7,
        isLegendary: true,
        requiredClass: 'monk',
        requiredLevel: 35,
        sellValue: 75000,
        description: '+7 melee. Monk 35+: +5% Whirlwind chance, +15% Whirlwind damage, Quivering Palm calculates as +5 monk levels, Avatar cleanse +5%, and Ki Surge damage +10%.',
        icon: '\u{1F94A}',
    },
    assassins_blade: {
        id: 'assassins_blade',
        name: "Assassin's Blade",
        category: ITEM_CATEGORY.WEAPON,
        subtype: WEAPON_SUBTYPE.MELEE,
        power: 7,
        enchantLevel: 7,
        isLegendary: true,
        requiredClass: 'rogue',
        requiredLevel: 35,
        sellValue: 75000,
        description: '+7 melee. Rogue 35+: main hand or off hand. +2% Backstab instakill, +10% Backstab damage, +5% evasion, and +5% Backstab bleed damage.',
        icon: '\u{1F5E1}\uFE0F',
    },
    claws_cavebear: {
        id: 'claws_cavebear',
        name: 'Claws of the Cavebear',
        category: ITEM_CATEGORY.WEAPON,
        subtype: WEAPON_SUBTYPE.MELEE,
        power: 7,
        enchantLevel: 7,
        isLegendary: true,
        requiredClass: 'barbarian',
        requiredLevel: 35,
        specialOffhandSlot: true,
        allowMainHand: true,
        sellValue: 75000,
        description: '+7 melee. Barbarian 35+: main hand or off hand. In Werebear form: +10% damage, +1 rage strike, and +15% Blood Frenzy cap.',
        icon: '\u{1F43B}',
    },
    lens_photomancy: {
        id: 'lens_photomancy',
        name: 'Lens of Photomancy',
        category: ITEM_CATEGORY.WEAPON,
        subtype: WEAPON_SUBTYPE.MAGIC,
        power: 7,
        enchantLevel: 7,
        isLegendary: true,
        requiredClass: 'photomancer',
        requiredLevel: 35,
        specialOffhandSlot: true,
        noAdditionalEnhancements: true,
        sellValue: 75000,
        description: '+7 magic. Photomancer 35+: off-hand focus; Color Spray hits +2 enemies and gains +10% stun chance, Disintegrate gains +5% instant-kill chance, +20% damage, +1 beam, Radiant Burst blind chance +5%, and simulacra gain +20% damage.',
        icon: '\u{1F50E}',
    },
    quiver_piercer: {
        id: 'quiver_piercer',
        name: 'Quiver of the Piercer',
        category: ITEM_CATEGORY.WEAPON,
        subtype: WEAPON_SUBTYPE.RANGED,
        power: 14,
        defenseBonus: 7,
        enchantLevel: 7,
        isLegendary: true,
        requiredClasses: ['ranger', 'artificer'],
        requiredLevel: 35,
        specialOffhandSlot: true,
        noAdditionalEnhancements: true,
        sellValue: 75000,
        description: '+14 ranged and +7 defense. Ranger or Artificer 35+: special off-hand quiver.',
        icon: '\u{1F3F9}',
    },
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
    fur_loincloth: {
        id: 'fur_loincloth',
        name: 'Fur Loincloth',
        category: ITEM_CATEGORY.ARMOR,
        armorType: 'leather',
        blocking: 7,
        enchantLevel: 7,
        isLegendary: true,
        requiredClass: 'barbarian',
        requiredLevel: 35,
        sellValue: 75000,
        description: '+7 defense. Barbarian 35+: Rage regen +2%, +1 rage strike, Werebear max health +10%, and Blood Frenzy cap +15%.',
        icon: '\u{1F9E5}',
    },
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
    shield_dark_wood: {
        id: 'shield_dark_wood',
        name: 'Shield of the Dark Wood',
        category: ITEM_CATEGORY.SHIELD,
        blockChance: 0.30,
        defenseBonus: 7,
        enchantLevel: 7,
        isLegendary: true,
        requiredClass: 'warrior',
        requiredLevel: 35,
        sellValue: 75000,
        description: '+7 defense shield. Warrior 35+: +5% block, intercept, retaliatory strike, shield riposte, and taunt chance.',
        icon: '\u{1F6E1}\uFE0F',
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

TRINKETS.girdle_giant_strength = {
    id: 'girdle_giant_strength',
    name: 'Girdle of Giant Strength',
    category: ITEM_CATEGORY.TRINKET,
    trinketKind: TRINKET_KIND.BELT,
    trinketSlots: ['belt'],
    bonusTypes: { melee: 14, defense: 7 },
    tier: 7,
    enchantLevel: 7,
    isLegendary: true,
    sellValue: 75000,
    description: 'Crafted belt. +14 melee and +7 defense.',
    icon: '\u{1F4AA}',
};

TRINKETS.eldritch_amulet = {
    id: 'eldritch_amulet',
    name: 'Eldritch Amulet',
    category: ITEM_CATEGORY.TRINKET,
    trinketKind: TRINKET_KIND.NECK,
    trinketSlots: ['neck'],
    bonusTypes: { magic: 7, defense: 7 },
    requiredClass: 'warlock',
    requiredLevel: 35,
    tier: 7,
    enchantLevel: 7,
    isLegendary: true,
    sellValue: 75000,
    description: 'Warlock 35+ amulet. +7 magic and +7 defense. Abyss Form gains +1 tentacle attack and +10% tentacle damage; summoned demons and awakened lords gain +15% damage.',
    icon: '\u{1F4FF}',
};

TRINKETS.holy_symbol_potent_power = {
    id: 'holy_symbol_potent_power',
    name: 'Holy Symbol of Potent Power',
    category: ITEM_CATEGORY.TRINKET,
    trinketKind: TRINKET_KIND.NECK,
    trinketSlots: ['neck'],
    bonusTypes: { magic: 7, defense: 7 },
    requiredClass: 'cleric',
    requiredLevel: 25,
    tier: 7,
    enchantLevel: 7,
    isLegendary: true,
    sellValue: 75000,
    description: 'Cleric 25+ neck trinket. +7 magic and +7 defense. Turn Undead deals +200% damage and stronger debuffs; Mass Heal cleansing, Mass Revive, Banishment, and Divine Shroud are empowered.',
    icon: '\u{1F4FF}',
};

TRINKETS.sash_vermin_keeper = {
    id: 'sash_vermin_keeper',
    name: 'Sash of the Vermin Keeper',
    category: ITEM_CATEGORY.TRINKET,
    trinketKind: TRINKET_KIND.BELT,
    trinketSlots: ['belt'],
    bonusTypes: { defense: 7 },
    maxHealthPct: 0.20,
    requiredClass: 'verminkeeper',
    requiredLevel: 35,
    tier: 7,
    enchantLevel: 7,
    isLegendary: true,
    sellValue: 75000,
    description: 'Vermin Keeper 35+ belt. +20% max health and empowers vermin/slime summons, swarms, Insect Plague, and Minions Frenzy.',
    icon: '\u{1F577}\uFE0F',
};

TRINKETS.ring_spell_focus = {
    id: 'ring_spell_focus',
    name: 'Ring of Spell Focus',
    category: ITEM_CATEGORY.TRINKET,
    trinketKind: TRINKET_KIND.RING,
    trinketSlots: ['ring1', 'ring2'],
    bonusTypes: { magic: 14, defense: 7 },
    requiredLevel: 35,
    tier: 7,
    enchantLevel: 7,
    isLegendary: true,
    sellValue: 75000,
    description: 'Level 35+ ring. +14 magic and +7 defense. Already maxed for stat enchantments, but can still receive the Ring of Regeneration add-on.',
    icon: '\u{1F48D}',
};

// ──────────────────────────────────────────
// Legendary Items — awarded only from Statue Events (DL30+)
// Weapons: power 11 (base 4 + 7 baked-in enchant), isLegendary stops further enchanting
// Armor:   blocking = base+7, isLegendary stops further enchanting
// Trinkets: dual-aspect +7/+7, isLegendary, all 4 slots × 3 secondaries
// ──────────────────────────────────────────

export const LEGENDARY_ITEMS = {
    // Legacy only: old saves may still have the pre-augment Displacer Cloak.
    // New Displacement is crafted as a cloak trinket add-on instead.
    displacer_cloak: {
        id: 'displacer_cloak',
        name: 'Legacy Displacer Cloak',
        category: ITEM_CATEGORY.TRINKET,
        trinketKind: TRINKET_KIND.CLOAK,
        trinketSlots: ['cloak'],
        bonusTypes: { defense: 7, melee: 7, ranged: 7, magic: 7 },
        tier: 7,
        enchantLevel: 7,
        isLegendary: true,
        sellValue: 75000,
        description: 'Legacy crafted cloak. New Displacement crafting is now added to an equipped cloak from the Trinkets tab.',
        icon: '\u{1F9E5}',
    },

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

export const ARTIFICER_SPECIAL_ITEM_IDS = new Set([
    'displacer_cloak',
    'elemental_bowl',
    'elemental_stone',
    'elemental_censer',
    'elemental_brazier',
    'elemental_sceptre',
    'girdle_giant_strength',
    'manticore_ballista',
    'instrument_bards',
    'yeti_totem',
    'werewolf_blood_vial',
    'holy_symbol_potent_power',
    'staff_of_necromancy',
    'eldritch_amulet',
    'hag_eye_rod',
    'lance_dragon_king',
    'staff_world_tree',
    'sash_vermin_keeper',
    'shield_dark_wood',
    'mummy_fist_wraps',
    'fur_loincloth',
    'assassins_blade',
    'claws_cavebear',
    'lens_photomancy',
    'ring_spell_focus',
    'quiver_piercer',
]);

export function getItemDisplayColor(itemId, enchant = null) {
    if (typeof itemId === 'string' && itemId.startsWith('legendary_')) return '#c678ff';
    if (ARTIFICER_SPECIAL_ITEM_IDS.has(itemId)) return '#ff9f2f';
    if (enchant && (enchant.roundRegenAugment || enchant.displacementAugment || enchant.regenAugmentLevel || enchant.augmentLevel)) return '#ff9f2f';
    return '';
}

// ──────────────────────────────────────────
// Loot helpers
// ──────────────────────────────────────────

export const WEAPON_IDS  = Object.keys(WEAPONS);
export const ARMOR_IDS   = Object.keys(ARMOR);
export const SHIELD_IDS  = Object.keys(SHIELDS);
export const TRINKET_IDS = Object.keys(TRINKETS);

function isGenericLootEligible(itemId) {
    return !ARTIFICER_SPECIAL_ITEM_IDS.has(itemId);
}

/** Pick a random weapon, weighted toward lower tiers. */
export function randomWeaponDrop() {
    const roll = Math.random();
    let tier;
    if (roll < 0.40)      tier = 1;
    else if (roll < 0.70) tier = 2;
    else if (roll < 0.90) tier = 3;
    else                  tier = 4;

    const candidates = WEAPON_IDS.filter(id => isGenericLootEligible(id) && WEAPONS[id].power === tier);
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

    const candidates = ARMOR_IDS.filter(id => isGenericLootEligible(id) && ARMOR[id].blocking === tier);
    return candidates[Math.floor(Math.random() * candidates.length)];
}

/** Pick a random non-crafted shield drop. */
export function randomShieldDrop() {
    const candidates = SHIELD_IDS.filter(isGenericLootEligible);
    return candidates[Math.floor(Math.random() * candidates.length)];
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

    const candidates = TRINKET_IDS.filter(id => isGenericLootEligible(id) && TRINKETS[id].tier === tier && !TRINKETS[id].dualAspect);
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
    if (itemId === 'reagent_epic')      return 10000;
    if (itemId === 'reagent_legendary') return 25000;
    if (itemId === 'reagent_mythic')    return 50000;
    if (itemId === 'reagent_divine')    return 100000;
    // magical_reagent (legacy) not sold; potions crafted by artificers only.
    return 0;
}

/**
 * Get the sell price for an item. Normally half of buy price, but a few
 * craft-only items have a sell-only floor (so dump-selling spare reagents or
 * potions isn't completely worthless).
 */
export function getItemSellPrice(itemId) {
    const def = getItemDef(itemId);
    if (def && typeof def.sellValue === 'number') return Math.max(0, Math.floor(def.sellValue));
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
    if (itemId === 'mana_potion')           return 75;
    if (itemId === 'elixir_warding')        return 125;
    if (itemId === 'elixir_wrath')          return 125;
    return 0;
}
