/**
 * Summons — reusable preset definitions for all summoned combat allies.
 *
 * A "summon preset" is consumed by CombatSystem when a character casts
 * their summon ability. Each preset creates a new PartyMember with
 *    - isSummoned = true
 *    - summonType = preset id
 *    - summonerId = caster's id (so life-drain / heals know who owns it)
 *    - canBeHealed (true = clerics / life-drain can target it)
 *
 * Necromancer undead tiers (Phase 8 rule 2 — skeleton added at L1):
 *   level 1:  skeleton
 *   level 3:  zombie
 *   level 5:  ghoul
 *   level 7:  spectre
 *   level 9:  mummy
 *   level 11: ghost
 *   level 13: vampire
 *   level 15+: death_knight (scales further)
 *
 * Ranger woodland beasts (rule 17):
 *   bear   — high HP, strong melee, stun chance = ranger's crit chance
 *   eagle  — ranged, lower HP, crit chance = ranger's crit chance
 *   pixie  — low HP, weak AoE magic (weaker than mage), dodge chance = ranger's crit chance
 */

import {
    NECRO_TIER_UPGRADE_EVERY,
    GOLEM_TIERS as GOLEM_TIERS_CONST,
    GOLEM_ATTACHMENT_TRINKET_HP_MULT,
    GOLEM_ATTACHMENT_SHIELD_DEFENSE,
    VK_VERMIN_TYPES, VK_SLIME_TYPES,
    VK_VERMIN_HP_MULT, VK_VERMIN_MELEE_PER_LEVEL, VK_VERMIN_DEFENSE_PER_LEVEL,
    VK_SWARM_HP_MULT, VK_SWARM_DEFENSE_PER_LEVEL,
    WARLOCK_DEMON_TYPES,
    ENEMY_TYPES,
} from '../utils/constants.js';

// ────────────────────────────────────────────
// Necromancer undead (ordered tiers)
// ────────────────────────────────────────────
// Base stats; later tiers inherit from earlier ones via tier index.
// HP multiplier & damage increments are applied by PartyMember/CombatSystem.

// Abilities common to every undead summon (used for HUD tooltips).
const UNDEAD_COMMON_ABILITIES = [
    'Undead: cannot be healed by potions or Cleric heal.',
    'Drained: restored by its summoner\u2019s Necromancer life-drain.',
    'Melee single-target attack.',
];

export const UNDEAD_TIERS = [
    { id: 'skeleton',     name: 'Skeleton',     icon: '\u{1F480}',          portraitClass: 'summoned', portraitSpecies: 'human',
        speciesLabel: 'Skeleton',
        kind: 'undead',
        abilities: ['Tier 1 baseline undead.', ...UNDEAD_COMMON_ABILITIES] },
    { id: 'zombie',       name: 'Zombie',       icon: '\u{1F9DF}',          portraitClass: 'summoned', portraitSpecies: 'human',
        speciesLabel: 'Zombie',
        kind: 'undead',
        abilities: ['Tier 2: +50% HP, +2 dmg, +1 defense.', ...UNDEAD_COMMON_ABILITIES] },
    { id: 'ghoul',        name: 'Ghoul',        icon: '\u{1F9DF}\u200D\u2640\uFE0F', portraitClass: 'summoned', portraitSpecies: 'human',
        speciesLabel: 'Ghoul',
        kind: 'undead',
        abilities: ['Tier 3: +125% HP, +4 dmg, +2 defense.', '40% chance to paralyze target for 1 round on melee (undead & incorporeal are immune).', ...UNDEAD_COMMON_ABILITIES] },
    { id: 'spectre',      name: 'Spectre',      icon: '\u{1F47B}',          portraitClass: 'summoned', portraitSpecies: 'elf',
        speciesLabel: 'Spectre',
        kind: 'undead',
        incorporeal: true,   // immune to web, entangle, paralysis, constrict, stun; attacks ignore target armor
        abilities: [
            'Tier 4: +240% HP, +6 dmg, +3 defense.',
            'Incorporeal: attacks ignore ALL enemy armor and defense.',
            'Incorporeal: immune to web, entangle, paralysis, constrict, and physical stun.',
            ...UNDEAD_COMMON_ABILITIES,
        ] },
    { id: 'mummy',        name: 'Mummy',        icon: '\u{1F9DF}\u200D\u2642\uFE0F', portraitClass: 'summoned', portraitSpecies: 'human',
        speciesLabel: 'Mummy',
        kind: 'undead',
        abilities: [
            'Tier 5: +406% HP, +8 dmg, +4 defense.',
            'Mummy Rot: each hit afflicts a permanent DoT (half attack damage/round until target dies). Also blocks enemy healing/regen (bosses and mega-bosses instead heal/regen at half rate). Does not affect undead or incorporeal.',
            '33% chance to stun target on melee (undead & incorporeal immune).',
            ...UNDEAD_COMMON_ABILITIES,
        ] },
    { id: 'ghost',        name: 'Ghost',        icon: '\u{1F47B}',          portraitClass: 'summoned', portraitSpecies: 'human',
        speciesLabel: 'Ghost',
        kind: 'undead',
        incorporeal: true,   // immune to web, entangle, paralysis, constrict, stun; attacks ignore target armor
        abilities: [
            'Tier 6: +659% HP, +10 dmg, +5 defense.',
            'Incorporeal: attacks ignore ALL enemy armor and defense.',
            'Incorporeal: immune to web, entangle, paralysis, constrict, and physical stun.',
            'Fear: each attack may fear up to [necroLevel] enemies \u2014 50% resist, -3 atk/-3 def for the rest of combat. Undead are immune.',
            ...UNDEAD_COMMON_ABILITIES,
        ] },
    { id: 'vampire',      name: 'Vampire',      icon: '\u{1F9DB}',          portraitClass: 'summoned', portraitSpecies: 'human',
        speciesLabel: 'Vampire',
        kind: 'undead',
        abilities: [
            'Tier 7: +1038% HP, +12 dmg, +6 defense.',
            'Life Drain: heals the vampire for every point of damage dealt.',
            'Minion Summoning: 33% chance (+1% per 3 necromancer levels) to summon a Wolf or Vampire Bat (50/50) — skips own attack that round.',
            'Gaseous Form: when reduced to 0 HP, becomes immune to damage, cannot attack, regenerates 10% max HP/turn. Exits gaseous form at 30%+ HP.',
            ...UNDEAD_COMMON_ABILITIES,
        ] },
    { id: 'death_knight', name: 'Death Knight', icon: '\u{2620}\uFE0F',     portraitClass: 'summoned', portraitSpecies: 'dwarf',
        speciesLabel: 'Death Knight',
        kind: 'undead',
        abilities: [
            'Tier 8+: +1607% HP, +14 dmg, +7 defense (scales further with Necromancer level).',
            '25% chance to block any incoming melee attack.',
            'Stun chance: (33 + necroLevel)% on melee hit (undead & incorporeal immune).',
            '5% max HP regeneration at the start of each turn.',
            'Instakill non-boss enemies: (2 + necroLevel)% chance.',
            ...UNDEAD_COMMON_ABILITIES,
        ] },
];

/**
 * Given a necromancer's level, return the array of unlocked undead tiers
 * (lowest tier first, highest last).
 */
export function getNecromancerUnlocked(level) {
    const lv = Math.max(1, level | 0);
    // level 1 = 1 tier, level 3 = 2 tiers, level 5 = 3 tiers…
    // i.e. tiersUnlocked = floor((lv-1)/2) + 1, capped at UNDEAD_TIERS.length
    const idx = Math.min(UNDEAD_TIERS.length,
        Math.floor((lv - 1) / NECRO_TIER_UPGRADE_EVERY) + 1);
    return UNDEAD_TIERS.slice(0, idx);
}

// Base (tier-0) undead stats — skeleton baseline (lighter than the old zombie
// baseline to reflect that level-1 necromancers now summon skeletons).
const UNDEAD_BASE = {
    hpMin: 12, hpMax: 18,
    stMin: 12, stMax: 18,
    mpMin: 0,  mpMax: 0,
    meleeMin: 1, meleeMax: 6,
    defense: 0,
};

/**
 * Roll stats for an undead tier. tierIndex 0 = skeleton, 1 = zombie, …
 * Per-tier scaling: HP ×1.5 compounding, +2 min/max damage, +1 defense.
 * Additionally, the necromancer's level directly adds +1 to both melee
 * damage (min & max) and defense on top of the tier base.
 *
 * @param {number} tierIndex
 * @param {number} [necroLevel=1]
 */
export function rollUndeadStats(tierIndex, necroLevel = 1) {
    const t  = Math.max(0, tierIndex);
    const nl = Math.max(1, necroLevel | 0);
    const hpMult  = Math.pow(1.5, t);
    const dmgBoost = t * 2;
    const defBoost = t;

    const roll = (min, max) => min + Math.floor(Math.random() * (max - min + 1));
    const hp = Math.round(roll(UNDEAD_BASE.hpMin, UNDEAD_BASE.hpMax) * hpMult);
    const st = Math.round(roll(UNDEAD_BASE.stMin, UNDEAD_BASE.stMax) * hpMult);

    return {
        maxHealth:  hp,
        maxStamina: st,
        maxMana:    0,
        meleeMin:   UNDEAD_BASE.meleeMin + dmgBoost + nl,
        meleeMax:   UNDEAD_BASE.meleeMax + dmgBoost + nl,
        defense:    UNDEAD_BASE.defense  + defBoost + nl,
    };
}

// ────────────────────────────────────────────
// Ranger woodland beasts
// ────────────────────────────────────────────

export const BEAST_TYPES = {
    wolf: {
        id: 'wolf',
        name: 'Wolf',
        icon: '\u{1F43A}',
        portraitClass: 'summoned', portraitSpecies: 'human',
        attackType: 'melee',
        speciesLabel: 'Wolf',
        kind: 'beast',
        description: 'Swift melee striker. Bite inflicts stacking Bleed (100% of hit/round). Bleed duration = 3+level/33 rounds. Extra attack at level 33+ targets a different enemy.',
        abilities: [
            'Single-target bite attack. Extra attack at level 33+ (level÷33) targets a separate enemy.',
            'Applies stacking Bleed per bite: 100% of hit damage per round for 3+⌊level/33⌋ rounds.',
            'Multiple bleeds from the same or different wolves stack independently on the same target.',
            'Medium HP, faster initiative. +7 HP and +1 defense per summoner level.',
            'Can be healed by potions and Cleric heal.',
        ],
    },
    bear: {
        id: 'bear',
        name: 'Bear',
        icon: '\u{1F43B}',
        portraitClass: 'summoned', portraitSpecies: 'human',
        attackType: 'melee',
        speciesLabel: 'Bear',
        kind: 'beast',
        description: 'High HP tank. Stun chance = 15%+level\u00d72%. Extra attack at level 25+. Stun resistance = level%. Giant Bear: +25% HP, +1 dmg/3 levels extra.',
        abilities: [
            'Single-target melee attack. Extra attack at level 25+ (level\u00f725).',
            'High HP tank. +2 defense per summoner level, +1 damage per 5 levels.',
            'Stun chance = 15% + (summoner level \u00d7 2%). Same for Giant Bear.',
            'Stun resistance: summoner level% chance to shrug off incoming stuns.',
            'Giant Bear: +25% max HP, bonus damage (+level/3 extra).',
            'Can be healed by potions and Cleric heal.',
        ],
    },
    eagle: {
        id: 'eagle',
        name: 'Eagle',
        icon: '\u{1F985}',
        portraitClass: 'summoned', portraitSpecies: 'elf',
        attackType: 'ranged',
        speciesLabel: 'Eagle',
        kind: 'beast',
        description: 'Ranged striker. Crit = 20%+level\u00D72%. Crit mult = \u00D7(4+level\u00D72%). Defense = summoner level. Extra attack at level 33+ (same target). Golden Eagle: +25% HP, +5 def.',
        abilities: [
            'Single-target ranged attack. Extra attack at level 33+ (\u230Alevel\u00F733\u230B) targets same enemy.',
            '+5 HP per summoner level. Defense = summoner level.',
            'Crit chance = 20% + (summoner level \u00D7 2%). Crit multiplier = \u00D7(4 + summoner level \u00D7 2%).',
            'Golden Eagle: +25% max HP, +5 defense, bonus ranged damage.',
            'Can be healed by potions and Cleric heal.',
        ],
    },
    vampire_bat: {
        id: 'vampire_bat',
        name: 'Vampire Bat',
        icon: '\u{1F987}',
        enemySprite: 'vampire_bat',
        portraitClass: 'summoned', portraitSpecies: 'human',
        attackType: 'ranged',
        speciesLabel: 'Vampire Bat',
        kind: 'beast',
        description: 'Undead ranged striker from a vampire. Lower HP, life drain heals. No crit. Summoned to back row. +5 HP per vampire summoner level.',
        abilities: [
            'Single-target ranged attack.',
            'Lower HP, higher damage. +5 HP per vampire summoner level.',
            'Life Drain: heals the vampire bat for every point of damage dealt.',
            'No crit ability.',
            'Summoned to back row.',
            'Can be healed by potions and Cleric heal.',
        ],
    },
    pixie: {
        id: 'pixie',
        name: 'Pixie',
        icon: '\u{1F9DA}',
        portraitClass: 'summoned', portraitSpecies: 'gnome',
        attackType: 'magic',
        speciesLabel: 'Pixie',
        kind: 'beast',
        description: 'Low HP, AoE magic hits all enemies. Dodge = 25%+level% (cap 90%). Defense = \u230alevel/2\u230b. Pixie Princess: +3 def, bonus magic damage. Takes half damage from AoE magic.',
        abilities: [
            'AoE faerie-dust magic attack (hits all enemies simultaneously).',
            'Fragile \u2014 lowest HP of all beasts. +2 HP per summoner level.',
            'Fey Nature: takes half damage from AoE magic attacks.',
            'Dodge = 25% + summoner level% (capped at 90%). Defense = \u230blevel/2\u230b.',
            'Pixie Princess upgrade: higher magic damage, +3 defense.',
            'Can be healed by potions and Cleric heal.',
        ],
    },
    treant: {
        id: 'treant',
        name: 'Treant',
        icon: '\u{1F333}',
        portraitClass: 'summoned', portraitSpecies: 'human',
        attackType: 'melee',
        speciesLabel: 'Treant',
        kind: 'beast',
        druidOnly: true,
        description: 'Ancient tree spirit. Heavy front-row melee. 33% hold per hit. Defense = level×1.5. Extra attack at level 33+. Immune to stun, paralysis, and bleed. Vulnerable to fire DoTs (+50%).',
        abilities: [
            'Front-row melee: branch slam. Extra attack at level 33+ (level÷33) targets a different enemy.',
            '33% chance per hit to Hold target (incorporeal and bosses immune).',
            'High HP. Defense = ⌊summoner level × 1.5⌋. +12 HP per summoner level.',
            'Plant — immune to stun, paralysis, and bleed DoTs.',
            'Weakness: takes 50% extra damage from fire/burn DoTs.',
            'Elder Treant upgrade: bonus damage (+level).',
            'Druid only. Unlocks at level 5. Can be healed by potions and Cleric heal.',
        ],
    },
    shambling_mound: {
        id: 'shambling_mound',
        name: 'Shambling Mound',
        icon: '\u{1FAB4}',
        portraitClass: 'summoned', portraitSpecies: 'human',
        attackType: 'melee',
        speciesLabel: 'Shambling Mound',
        kind: 'beast',
        druidOnly: true,
        unlockLevel: 25,
        description: 'Massive regenerative plant horror. 4× druid max HP. 45% stun on hit. 20% HP regen. Protects summoner. Max living mounds per druid = level/2. Plant — immune to stun, paralysis, and bleed.',
        abilities: [
            'Front-row melee summon. Costs 100 mana.',
            'Health = 4× druid max HP. Defense = 20 + druid level.',
            'Single-target slam: base melee + 2× druid level, 45% chance to stun enemies.',
            'Regenerates 20% of max HP at the start of each turn.',
            'If already full after regenerating, the original mound spawns a Mini Shambler (cannot spawn on summon round; grown minis cannot spawn more minis).',
            'Living Shambling Mounds, including minis and grown minis, are capped at druid level / 2.',
            'Intercepts hits aimed at its summoner after warrior intercept checks.',
            'Plant — immune to stun, paralysis, and bleed DoTs.',
        ],
    },
};

/**
 * Look up the summon preset record for a PartyMember (or null if it isn't a
 * summon). Used by UI code that needs the summon icon, species label, and
 * ability list without hard-coding the summon type anywhere else.
 *
 * @param {{isSummoned?:boolean, summonType?:string}} member
 * @returns {null|object}
 */
/** Preset for the Druid L20 Faerie Queen summon. */
export const FAERIE_QUEEN_PRESET = {
    id:           'faerie_queen',
    name:         'Faerie Queen',
    icon:         '\u{1F9DA}‍♀️',  // 🧚‍♀️ woman fairy
    portraitClass: 'summoned',
    portraitSpecies: 'elf',
    speciesLabel:  'Faerie Queen',
    kind:          'fae',
    abilities: [
        'Back row. 2× druid max HP, 30+druidLevel defense.',
        'Wrath of Nature: magic/AoE attack hitting ⌊druid-level/4⌋ targets per turn.',
        'Each hit applies Fae Poison DoT and a 33%+ chance to Hold for 2 rounds.',
        '50% resistance to magic and AoE damage.',
        'Can be healed by Cleric or potions.',
    ],
};

export const CORPSE_HORROR_PRESET = {
    id:           'corpse_horror',
    name:         'Corpse Horror',
    icon:         '\u{1F9DF}',
    enemySprite:  'zombie_giant',
    speciesLabel: 'Undead',
    kind:         'undead',
    abilities: [
        'Front-row melee. Absorbs fallen enemies to grow stronger.',
        'Each absorbed corpse adds HP, melee skill, and defense without limit.',
        'Attack count is capped at necromancer level.',
        'Cannot be healed by potions or Cleric heal.',
        'Restored only by its summoner\'s Necromancer life-drain.',
    ],
};

export const RIFT_ELEMENTAL_PRESETS = {
    rift_fire: {
        id: 'rift_fire',
        name: 'Fire Elemental',
        icon: '\u{1F525}',
        enemySprite: 'fire_elemental',
        speciesLabel: 'Elemental',
        kind: 'elemental',
        abilities: [
            'Summoned through an Elemental Rift.',
            'Magic melee attack. Incorporeal — immune to stun, hold, web.',
            'Immune to fire and poison.',
        ],
    },
    rift_water: {
        id: 'rift_water',
        name: 'Water Elemental',
        icon: '\u{1F30A}',
        enemySprite: 'water_elemental',
        speciesLabel: 'Elemental',
        kind: 'elemental',
        abilities: [
            'Summoned through an Elemental Rift.',
            'Magic melee attack. Incorporeal — immune to stun, hold, web.',
            'Immune to cold and poison.',
        ],
    },
    rift_air: {
        id: 'rift_air',
        name: 'Air Elemental',
        icon: '\u{1F4A8}',
        enemySprite: 'air_elemental',
        speciesLabel: 'Elemental',
        kind: 'elemental',
        abilities: [
            'Summoned through an Elemental Rift.',
            'Magic melee attack. Incorporeal — immune to stun, hold, web.',
            'Immune to lightning and poison.',
        ],
    },
    rift_earth: {
        id: 'rift_earth',
        name: 'Earth Elemental',
        icon: '\u{1FAA8}',
        enemySprite: 'earth_elemental',
        speciesLabel: 'Elemental',
        kind: 'elemental',
        abilities: [
            'Summoned through an Elemental Rift.',
            'Front-row magic melee attack. High HP and defense.',
            'Immune to stun and poison.',
        ],
    },
};

export const DEMI_LICH_PRESET = {
    id:            'demi_lich',
    name:          'Demi-Lich',
    icon:          '\u{1F480}',
    portraitClass: 'summoned',
    portraitSpecies: 'human',
    speciesLabel:  'Demi-Lich',
    kind:          'undead',
    abilities: [
        'Back row undead spellcaster. Requires the necromancer to be in Lich Form.',
        'Magic/AoE attack ignores enemy defense and strikes floor(necromancer level / 5) targets.',
        'Takes half damage from magic and AoE attacks.',
        'Immune to stun, web, holds, and poison.',
        'Fear: same as Ghost, attempting to terrify up to necromancer level enemies after acting.',
    ],
};

// ────────────────────────────────────────────
// Vermin Keeper — vermin summons (L3)
// ────────────────────────────────────────────

export const VERMIN_PRESETS = {
    spider: {
        id: 'spider', name: 'Spider', icon: '\u{1F577}️',
        enemySprite: 'spider',
        portraitClass: 'summoned', portraitSpecies: 'human',
        speciesLabel: 'Spider', kind: 'vermin',
        abilities: ['Front-row melee. 25% chance to poison on hit (bypasses immunity for vermin targets). Web: 20% chance to hold target for 1 round.', 'Can be healed by potions and Cleric heal.'],
    },
    bat: {
        id: 'bat', name: 'Bat', icon: '\u{1F987}',
        enemySprite: 'bat',
        portraitClass: 'summoned', portraitSpecies: 'human',
        speciesLabel: 'Bat', kind: 'vermin',
        abilities: ['Front-row melee. High dodge (30%). Applies bleed on hit (30%).', 'Can be healed by potions and Cleric heal.'],
    },
    giant_bat: {
        id: 'giant_bat', name: 'Giant Bat', icon: '\u{1F987}',
        enemySprite: 'bat',
        portraitClass: 'summoned', portraitSpecies: 'human',
        speciesLabel: 'Giant Bat', kind: 'vermin',
        abilities: ['Front-row melee. Sonic screech stuns enemies (20% per hit). High HP.', 'Can be healed by potions and Cleric heal.'],
    },
    giant_centipede: {
        id: 'giant_centipede', name: 'Giant Centipede', icon: '\u{1F41E}',
        enemySprite: 'centipede',
        portraitClass: 'summoned', portraitSpecies: 'human',
        speciesLabel: 'Giant Centipede', kind: 'vermin',
        abilities: ['Front-row melee. Applies strong poison on every hit. Multiple attacks per round.', 'Can be healed by potions and Cleric heal.'],
    },
    cave_crawler: {
        id: 'cave_crawler', name: 'Cave Crawler', icon: '\u{1F41B}',
        enemySprite: 'cave_crawler',
        portraitClass: 'summoned', portraitSpecies: 'human',
        speciesLabel: 'Cave Crawler', kind: 'vermin',
        abilities: ['Front-row melee. 30% chance to Hold target (not bosses/incorporeal). High defense.', 'Can be healed by potions and Cleric heal.'],
    },
    black_widow: {
        id: 'black_widow', name: 'Black Widow', icon: '\u{1F577}️',
        enemySprite: 'spider',
        portraitClass: 'summoned', portraitSpecies: 'human',
        speciesLabel: 'Black Widow', kind: 'vermin',
        abilities: ['Front-row melee. Powerful neurotoxin: 40% chance to apply strong poison (×2 normal DoT damage). Web: 25% hold chance.', 'Can be healed by potions and Cleric heal.'],
    },
    cave_fisher: {
        id: 'cave_fisher', name: 'Cave Fisher', icon: '\u{1F99E}',
        enemySprite: 'cave_fisher',
        portraitClass: 'summoned', portraitSpecies: 'human',
        speciesLabel: 'Cave Fisher', kind: 'vermin',
        abilities: ['Front-row melee. Adhesive filament: 35% chance to hold target. Deals extra damage to held targets.', 'Can be healed by potions and Cleric heal.'],
    },
    stirge: {
        id: 'stirge', name: 'Stirge', icon: '\u{1F987}',
        enemySprite: 'stirge',
        portraitClass: 'summoned', portraitSpecies: 'human',
        speciesLabel: 'Stirge', kind: 'vermin',
        abilities: ['Front-row melee. Blood drain: heals itself for every point of damage dealt.', 'Can be healed by potions and Cleric heal.'],
    },
    blood_wasp: {
        id: 'blood_wasp', name: 'Blood Wasp', icon: '\u{1F41D}',
        enemySprite: 'blood_wasp',
        portraitClass: 'summoned', portraitSpecies: 'human',
        speciesLabel: 'Blood Wasp', kind: 'vermin',
        abilities: ['Front-row melee. Sting applies bleed and poison simultaneously. 20% stun chance.', 'Can be healed by potions and Cleric heal.'],
    },
    vampire_bat: {
        id: 'vampire_bat', name: 'Vampire Bat', icon: '\u{1F987}',
        enemySprite: 'vampire_bat',
        portraitClass: 'summoned', portraitSpecies: 'human',
        speciesLabel: 'Vampire Bat', kind: 'vermin',
        abilities: ['Front-row melee. Blood drain: heals for damage dealt. Applies bleed on hit.', 'Can be healed by potions and Cleric heal.'],
    },
    tunnel_worm: {
        id: 'tunnel_worm', name: 'Tunnel Worm', icon: '\u{1F40D}',
        enemySprite: 'tunnel_worm',
        portraitClass: 'summoned', portraitSpecies: 'human',
        speciesLabel: 'Tunnel Worm', kind: 'vermin',
        abilities: ['Front-row melee. Constrict: 30% chance to hold target. High HP pool.', 'Can be healed by potions and Cleric heal.'],
    },
    giant_scorpion: {
        id: 'giant_scorpion', name: 'Giant Scorpion', icon: '\u{1F982}',
        enemySprite: 'giant_scorpion',
        portraitClass: 'summoned', portraitSpecies: 'human',
        speciesLabel: 'Giant Scorpion', kind: 'vermin',
        abilities: ['Front-row melee. Two claw attacks + stinger: poison on sting (50% chance, strong DoT). High armor.', 'Can be healed by potions and Cleric heal.'],
    },
    phase_spider: {
        id: 'phase_spider', name: 'Phase Spider', icon: '\u{1F577}️',
        enemySprite: 'phase_spider',
        portraitClass: 'summoned', portraitSpecies: 'human',
        speciesLabel: 'Phase Spider', kind: 'vermin',
        incorporeal: true,
        abilities: ['Front-row melee. Incorporeal: attacks ignore all enemy armor and defense. Immune to stun, hold, web.', 'Phase venom: 35% chance to apply paralyzing poison on hit.', 'Can be healed by potions and Cleric heal.'],
    },
    rust_monster: {
        id: 'rust_monster', name: 'Rust Monster', icon: '\u{1F9A7}',
        enemySprite: 'rust_monster',
        portraitClass: 'summoned', portraitSpecies: 'human',
        speciesLabel: 'Rust Monster', kind: 'vermin',
        abilities: ['Front-row melee. Rust corrosion: reduces enemy defense by 1 permanently per hit (stacks). Attacks ignore armor.', 'Can be healed by potions and Cleric heal.'],
    },
};

// ────────────────────────────────────────────
// Vermin Keeper — slime summons (L6)
// ────────────────────────────────────────────

export const SLIME_PRESETS = {
    slime: {
        id: 'slime', name: 'Slime', icon: '\u{1FAA1}',
        enemySprite: 'slime',
        portraitClass: 'summoned', portraitSpecies: 'human',
        speciesLabel: 'Slime', kind: 'slime',
        immune: ['bleed', 'stun', 'hold', 'web', 'paralyze'],
        abilities: ['Front-row melee. Engulf: 25% chance to hold target. Immune to bleed, stun, holds, webs, and paralysis. Splits: on death spawns a Mini Slime at 50% HP.', 'Can be healed by potions and Cleric heal.'],
    },
    acid_slime: {
        id: 'acid_slime', name: 'Acid Slime', icon: '\u{1FAA1}',
        enemySprite: 'acid_slime',
        portraitClass: 'summoned', portraitSpecies: 'human',
        speciesLabel: 'Acid Slime', kind: 'slime',
        immune: ['acid', 'bleed', 'stun', 'hold', 'web', 'paralyze'],
        abilities: ['Front-row melee. Every hit applies an acid DoT (20% dealt/round for 2 rounds). Immune to acid, bleed, stun, holds, webs, and paralysis. Engulf: 25% hold.', 'Can be healed by potions and Cleric heal.'],
    },
    gelatinous_cube: {
        id: 'gelatinous_cube', name: 'Gelatinous Cube', icon: '\u{1FAA1}',
        enemySprite: 'gelatinous_cube',
        portraitClass: 'summoned', portraitSpecies: 'human',
        speciesLabel: 'Gelatinous Cube', kind: 'slime',
        immune: ['acid', 'poison', 'bleed', 'stun', 'hold', 'web', 'paralyze'],
        abilities: ['Front-row melee. Engulf (50% hold chance). Paralysis on engulf (40%). Acid body: each melee hit on the cube deals acid DoT back to attacker. High HP. Immune to acid, poison, bleed, stun, holds, webs, and paralysis.', 'Can be healed by potions and Cleric heal.'],
    },
};

// ────────────────────────────────────────────
// Vermin Keeper — swarm summons (L30)
// ────────────────────────────────────────────

export const VERMIN_SWARM_PRESET = {
    id: 'vermin_swarm', name: 'Vermin Swarm', icon: '\u{1F41C}',
    portraitClass: 'summoned', portraitSpecies: 'human',
    speciesLabel: 'Vermin Swarm', kind: 'vermin',
    isSwarm: true, swarmType: 'vermin',
    abilities: [
        'Front-row AoE melee (incorporeal). Attacks ALL enemies each turn.',
        'Each attack: poison DoT (2/3 base dmg for 2 rds, stacks independently).',
        'Unique debuff: -⌊keeper level/4⌋ attack/ranged/magic for 2 rds (refreshed by any vermin swarm).',
        'Takes only 10% damage from melee/ranged. ×1.5 from magic/AoE. ×2 from fire.',
        'Grows automatically after its own attack turn: +keeper max HP and +1 AoE attack for future turns, capped at floor(keeper level / 5) upgrades.',
        'Immune to poison, psychic damage/DoTs, charms, holds, stuns, paralysis, and death-roll holds.',
        'Incorporeal tag. Once summoned, Acid Swarm button is locked until this swarm dies.',
    ],
};

export const ACID_SWARM_PRESET = {
    id: 'acid_swarm', name: 'Acid Swarm', icon: '\u{1FAA1}',
    portraitClass: 'summoned', portraitSpecies: 'human',
    speciesLabel: 'Acid Swarm', kind: 'slime',
    enemySprite: 'acid_slime', spriteTint: '#ff8a00',
    isSwarm: true, swarmType: 'acid',
    abilities: [
        'Front-row AoE melee. Attacks ALL enemies each turn.',
        'Each attack: acid DoT (40% base dmg for 2 rds, stacks independently).',
        'Unique debuff: -⌊keeper level/4⌋ defense/ranged/magic for 2 rds (refreshed by any acid swarm).',
        'Takes only 10% damage from melee/ranged. ×1.5 from magic/AoE. ×3 from lightning.',
        'Grows automatically after its own attack turn: +keeper max HP and +1 AoE attack for future turns, capped at floor(keeper level / 5) upgrades.',
        'Immune to acid and acid DoTs.',
        'Immune to psychic damage/DoTs, charms, holds, stuns, paralysis, and death-roll holds.',
        'Slime tag. Once summoned, Vermin Swarm button is locked until this swarm dies.',
    ],
};

export const ILLUSIONARY_WARRIOR_PRESET = {
    id: 'illusionary_warrior', name: 'Illusionary Warrior', icon: '\u{1F5E1}\uFE0F',
    portraitClass: 'summoned', portraitSpecies: 'human',
    speciesLabel: 'Illusion', kind: 'illusion',
    abilities: [
        'Front-row illusion. Immune to all damage, DoTs, and effects.',
        'Cannot receive healing, regeneration, cleansing, or living-only buffs.',
        'Constructs, undead, and magic-immune enemies ignore or disbelieve it.',
        'Attacks randomly using the photomancer magic skill as armor-ignoring magic damage.',
    ],
};

export const SIMULACRUM_PRESET = {
    id: 'shadow_simulacra', name: 'Shadow Simulacra', icon: '🌑',
    enemySprite: 'shadow',
    portraitClass: 'summoned', portraitSpecies: 'human',
    speciesLabel: 'Shadow Simulacra', kind: 'construct',
    abilities: [
        'Permanent shadow-magic construct formed outside combat from selected powers.',
        'Cannot be healed, repaired, cleansed, revived, or buffed as a living ally.',
        'Defense and melee/ranged/magic skill equal photomancer level x2 before selected upgrades.',
        'Attack type is selected when formed: melee starts front row; ranged and magic start back row.',
        'Immune to stun, poison, psychic effects, paralyze-style holds, bleed DoTs, and stamina/mana drain.',
    ],
};

// ────────────────────────────────────────────
// Warlock — demon summons
// ────────────────────────────────────────────

export const WARLOCK_DEMON_PRESETS = (() => {
    const out = {};
    for (const entry of WARLOCK_DEMON_TYPES) {
        const def = ENEMY_TYPES[entry.id] || {};
        const name = def.name || entry.id.replace(/_/g, ' ');
        out[entry.id] = {
            id: entry.id,
            name,
            icon: entry.id === 'hell_hound' ? '\u{1F525}' : entry.id === 'quasit' ? '\u{1F47F}' : '\u{1F608}',
            enemySprite: entry.id,
            portraitClass: 'summoned',
            portraitSpecies: 'human',
            speciesLabel: name,
            kind: 'demon',
            unlockLevel: entry.unlockLevel,
            immune: Array.isArray(def.immune) ? def.immune.slice() : [],
            abilities: [
                `Warlock demon — unlocks at level ${entry.unlockLevel}.`,
                'Bound summon: HP = warlock max HP, doubled while the warlock is in Tentacled Horror form; attack and defense key from warlock magic skill.',
                'Uses the matching monster variant ability profile against enemy parties.',
                'Costs the warlock 3 HP per round to maintain. Vanishes if its warlock dies.',
            ],
        };
    }
    return out;
})();

export function getWarlockUnlockedDemons(level) {
    const lv = Math.max(1, level | 0);
    return WARLOCK_DEMON_TYPES
        .filter(d => lv >= d.unlockLevel)
        .map(d => WARLOCK_DEMON_PRESETS[d.id])
        .filter(Boolean);
}

export function rollWarlockDemonStats(warlockLevel = 1, warlockMaxHealth = 20, warlockMagicSkill = 1, demonId = 'imp') {
    const skill = Math.max(1, Math.floor(warlockMagicSkill || 1));
    const hpMults = {
        ice_demon: 2.0,
        acid_demon: 1.8,
        bloat_demon: 2.5,
        pit_fiend: 3.0,
    };
    const defenseMults = {
        ice_demon: 1.5,
        pit_fiend: 2.0,
    };
    const hpMult = hpMults[demonId] || 1;
    const defenseMult = defenseMults[demonId] || 1;
    return {
        maxHealth: Math.max(1, Math.floor(warlockMaxHealth * hpMult)),
        maxStamina: 0,
        maxMana: 0,
        meleeMin: skill,
        meleeMax: skill + 4,
        rangedMin: skill,
        rangedMax: skill + 4,
        magicMin: skill,
        magicMax: skill + 4,
        defense: Math.max(1, Math.floor(skill * defenseMult)),
        warlockLevel: Math.max(1, warlockLevel | 0),
        beastKind: 'warlock_demon',
        demonType: demonId,
        halfMagicDamage: demonId === 'efreeti',
        immune: (WARLOCK_DEMON_PRESETS[demonId]?.immune || []).slice(),
    };
}

/**
 * Roll stats for a Vermin Keeper summon (vermin or slime).
 * HP = keeper maxHealth, melee = keeperLevel×2, defense = keeperLevel×1.5
 */
export function rollVerminStats(keeperLevel = 1, keeperMaxHealth = 20) {
    const lv = Math.max(1, keeperLevel | 0);
    return {
        maxHealth:  Math.max(1, Math.floor(keeperMaxHealth * VK_VERMIN_HP_MULT)),
        maxStamina: 0,
        maxMana:    0,
        meleeMin:   Math.max(1, lv * VK_VERMIN_MELEE_PER_LEVEL - 2),
        meleeMax:   Math.max(1, lv * VK_VERMIN_MELEE_PER_LEVEL + 2),
        defense:    Math.floor(lv * VK_VERMIN_DEFENSE_PER_LEVEL),
        keeperLevel: lv,
    };
}

/**
 * Roll stats for a Vermin Keeper swarm.
 * HP = keeper maxHealth, magic = keeper magic skill, defense = keeperLevel×2
 */
export function rollSwarmStats(keeperLevel = 1, keeperMaxHealth = 20, keeperMagicBonus = 0) {
    const lv = Math.max(1, keeperLevel | 0);
    return {
        maxHealth:  Math.max(1, Math.floor(keeperMaxHealth * VK_SWARM_HP_MULT)),
        maxStamina: 0,
        maxMana:    0,
        magicMin:   Math.max(1, keeperMagicBonus + lv - 2),
        magicMax:   Math.max(1, keeperMagicBonus + lv + 2),
        defense:    Math.floor(lv * VK_SWARM_DEFENSE_PER_LEVEL),
        keeperLevel: lv,
        attackCount: 1,
    };
}

export function getSummonPreset(member) {
    if (!member || !member.isSummoned || !member.summonType) return null;
    if (BEAST_TYPES[member.summonType]) return BEAST_TYPES[member.summonType];
    const tier = UNDEAD_TIERS.find(t => t.id === member.summonType);
    if (tier) return tier;
    const golem = GOLEM_PRESETS[member.summonType];
    if (golem) return golem;
    if (member.summonType === 'corpse_horror') return CORPSE_HORROR_PRESET;
    if (RIFT_ELEMENTAL_PRESETS[member.summonType]) return RIFT_ELEMENTAL_PRESETS[member.summonType];
    if (member.summonType === 'faerie_queen') return FAERIE_QUEEN_PRESET;
    if (member.summonType === 'demi_lich') return DEMI_LICH_PRESET;
    if (VERMIN_PRESETS[member.summonType]) return VERMIN_PRESETS[member.summonType];
    if (SLIME_PRESETS[member.summonType]) return SLIME_PRESETS[member.summonType];
    if (member.summonType === 'vermin_swarm') return VERMIN_SWARM_PRESET;
    if (member.summonType === 'acid_swarm') return ACID_SWARM_PRESET;
    if (WARLOCK_DEMON_PRESETS[member.summonType]) return WARLOCK_DEMON_PRESETS[member.summonType];
    if (member.summonType === 'illusionary_warrior') return ILLUSIONARY_WARRIOR_PRESET;
    if (member.summonType === 'simulacrum' || member.summonType === 'shadow_simulacra') return SIMULACRUM_PRESET;
    return null;
}

// ────────────────────────────────────────────
// Artificer golems (Phase 12) — PERSISTENT summons.
// Unlike beasts/undead, golems survive across combat, rest, dungeon travel,
// and save/load. They have permadeath (no cleric revive, no resurrect potion)
// and only the owning artificer can heal them, spending 1 reagent of the
// golem's tier for 50% max HP.
// ────────────────────────────────────────────

// Public alias so consumers import from one place.
export const GOLEM_TIERS = GOLEM_TIERS_CONST;

/** Lookup map: golem id -> tier definition with UI-friendly fields. */
export const GOLEM_PRESETS = (() => {
    const out = {};
    for (const t of GOLEM_TIERS_CONST) {
        out[t.id] = {
            id: t.id,
            name: t.name,
            icon: t.icon,
            portraitClass: 'summoned',
            portraitSpecies: 'dwarf',
            speciesLabel: `${t.name}`,
            kind: 'golem',
            persistent: true,
            reagentTier: t.reagentTier,
            description: t.description,
            abilities: [
                `Tier ${GOLEM_TIERS_CONST.indexOf(t) + 1} golem — unlocks at artificer level ${t.unlockLevel}.`,
                t.description,
                'Persistent ally: survives between fights, rest, dungeon travel, and saves.',
                'Permadeath: cannot be revived by Cleric or Resurrection potion.',
                `Only the owning Artificer can heal it (1 ${t.reagentTier} reagent → 50% max HP).`,
            ],
        };
    }
    return out;
})();

/**
 * Given an artificer's level, return the array of unlocked golem tiers.
 */
export function getArtificerUnlockedGolems(level) {
    const lv = Math.max(1, level | 0);
    return GOLEM_TIERS_CONST.filter(t => lv >= t.unlockLevel);
}

/**
 * Roll stats for a golem at a given artificer level. Artificer level (AL)
 * adds flat scaling:
 *   HP      = baseHp + hpPerAL × AL
 *   Defense = 2 × AL
 *   Damage  = [2 + floor(AL × 1.5),  12 + floor(AL × 1.5)]
 *
 * @param {string} tierId
 * @param {number} artificerLevel
 */
export function rollGolemStats(tierId, artificerLevel = 1) {
    const tier = GOLEM_TIERS_CONST.find(t => t.id === tierId) || GOLEM_TIERS_CONST[0];
    const AL = Math.max(1, artificerLevel | 0);
    const hp = tier.baseHp + tier.hpPerAL * AL;
    const meleeBonus = Math.floor(AL * 1.5);
    return {
        maxHealth:       hp,
        maxStamina:      0,
        maxMana:         0,
        meleeMin:        2  + meleeBonus,
        meleeMax:        12 + meleeBonus,
        defense:         AL * 2,
        tierId:          tier.id,
        artificerLevel:  AL,           // stored so AI can scale abilities (forceAoe targets, bolts, etc.)
        regenPercent:    tier.regenPercent    || 0,
        reflectChance:   tier.reflectChance   || 0,
        reflectFraction: tier.reflectFraction || 0,
        slamEvery:       tier.slamEvery       || 0,
        slamStunChance:  tier.slamStunChance  || 0,
        cleaveTargets:   tier.cleaveTargets   || 0,
        drainOnKill:     tier.drainOnKill     || 0,
        forceAoe:        tier.forceAoe        || false,
        adamantineBolts: tier.adamantineBolts || false,
        halfDmgSpecial:  tier.halfDmgSpecial  || false,
        divineSoul:      tier.divineSoul      || false,
        immune:          Array.isArray(tier.immune) ? tier.immune.slice() : [],
    };
}

/**
 * Sync every persistent golem in `party` to its owning artificer's current level.
 * Safe to call unconditionally — skips golems whose stats already match.
 * @param {import('../entities/PartyMember.js').PartyMember[]} party
 */
export function syncGolemStats(party) {
    for (const golem of party) {
        if (!golem.isSummoned || !golem.isPersistent) continue;
        if (!golem.summonStats || !golem.summonStats.tierId) continue;
        const artificer = party.find(m => m.id === golem.summonerId && !m.isSummoned);
        if (!artificer) continue;
        const newLevel = artificer.level;
        const s = rollGolemStats(golem.summonStats.tierId, newLevel);
        const att = golem.summonStats.attachments || {};
        // Re-apply attachment bonuses on top of the new base stats so that
        // trinket HP sockets and shield defense are not lost after a level-up.
        const newMaxHp = Math.max(1, Math.floor(
            s.maxHealth * (1 + (att.trinkets || 0) * GOLEM_ATTACHMENT_TRINKET_HP_MULT)
        ));
        const newDefense = s.defense + (att.shield ? GOLEM_ATTACHMENT_SHIELD_DEFENSE : 0);
        // Skip only when every derived value already matches — guards against
        // saves that stored a wrong maxHealth from an earlier trinket-unaware sync.
        if (golem.summonStats.artificerLevel === newLevel
            && golem.maxHealth === newMaxHp
            && golem.summonStats.defense === newDefense) continue;
        golem.maxHealth                   = newMaxHp;
        if (golem.health > newMaxHp) golem.health = newMaxHp;
        golem.level                       = newLevel;
        golem.summonStats.baseMaxHealth   = s.maxHealth;
        golem.summonStats.baseDefense     = s.defense;
        golem.summonStats.defense         = newDefense;
        golem.summonStats.meleeMin        = s.meleeMin;
        golem.summonStats.meleeMax        = s.meleeMax;
        golem.summonStats.artificerLevel  = newLevel;
        golem.summonStats.regenPercent    = s.regenPercent;
        golem.summonStats.reflectChance   = s.reflectChance;
        golem.summonStats.reflectFraction = s.reflectFraction;
        golem.summonStats.slamEvery       = s.slamEvery;
        golem.summonStats.slamStunChance  = s.slamStunChance;
        golem.summonStats.cleaveTargets   = s.cleaveTargets;
        golem.summonStats.drainOnKill     = s.drainOnKill;
        golem.summonStats.forceAoe        = s.forceAoe;
        golem.summonStats.adamantineBolts = s.adamantineBolts;
        golem.summonStats.halfDmgSpecial  = s.halfDmgSpecial;
        golem.summonStats.divineSoul      = s.divineSoul;
        golem.summonStats.immune          = s.immune;
    }
}

/**
 * Roll stats for a ranger beast.
 * Scaling: per ranger level, +2 HP and +1 to min/max damage.
 */
export function rollBeastStats(beastId, rangerLevel = 1) {
    const lvBoost = Math.max(0, rangerLevel - 1);
    const roll = (min, max) => min + Math.floor(Math.random() * (max - min + 1));

    switch (beastId) {
        case 'wolf':
            return {
                maxHealth:  roll(16, 24) + lvBoost * 7,   // +7 HP/level (was +5)
                maxStamina: roll(18, 26),
                maxMana:    0,
                meleeMin:   3 + lvBoost * 2,
                meleeMax:   8 + lvBoost * 2,
                defense:    lvBoost,                       // +1 defense/level (was 0)
            };
        case 'bear':
            return {
                maxHealth:  roll(24, 32) + lvBoost * 10,
                maxStamina: roll(20, 28),
                maxMana:    0,
                meleeMin:   3 + lvBoost * 2 + Math.floor(rangerLevel / 5),
                meleeMax:   10 + lvBoost * 2 + Math.floor(rangerLevel / 5),
                defense:    1 + lvBoost * 2,
                stunResistChance: rangerLevel * 0.01,
            };
        case 'eagle':
            return {
                maxHealth:  roll(12, 18) + lvBoost * 5,
                maxStamina: roll(20, 28),
                maxMana:    0,
                rangedMin:  3 + lvBoost * 2,
                rangedMax:  8 + lvBoost * 2,
                defense:    rangerLevel,
            };
        case 'vampire_bat':
            // Vampire bat uses eagle stats (back row, ranged) but with life drain
            return {
                maxHealth:  roll(12, 18) + lvBoost * 5,   // +5 HP/level, same as eagle
                maxStamina: roll(20, 28),
                maxMana:    0,
                rangedMin:  3 + lvBoost * 2,
                rangedMax:  8 + lvBoost * 2,
                defense:    0,
            };
        case 'pixie':
            return {
                maxHealth:  roll(8, 14) + lvBoost * 2,
                maxStamina: 0,
                maxMana:    roll(15, 22),
                magicMin:   1 + lvBoost * 2,
                magicMax:   5 + lvBoost * 2,
                defense:    Math.floor(rangerLevel / 2),
            };
        case 'treant':
            return {
                maxHealth:  roll(30, 45) + lvBoost * 12,
                maxStamina: roll(20, 28),
                maxMana:    0,
                meleeMin:   rangerLevel + 2,
                meleeMax:   rangerLevel * 2 + 4,
                defense:    Math.floor(rangerLevel * 1.5),
            };
        case 'shambling_mound':
            return {
                maxHealth: 1,
                maxStamina: 0,
                maxMana: 0,
                meleeMin: 1,
                meleeMax: 1,
                defense: 1,
            };
        default:
            return rollBeastStats('bear', rangerLevel);
    }
}
