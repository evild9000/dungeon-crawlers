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
    { id: 'skeleton',     name: 'Skeleton',     icon: '\u{1F480}',          portraitClass: 'warrior', portraitSpecies: 'human',
        speciesLabel: 'Undead \u2022 Skeleton',
        kind: 'undead',
        abilities: ['Tier 1 baseline undead.', ...UNDEAD_COMMON_ABILITIES] },
    { id: 'zombie',       name: 'Zombie',       icon: '\u{1F9DF}',          portraitClass: 'warrior', portraitSpecies: 'orc',
        speciesLabel: 'Undead \u2022 Zombie',
        kind: 'undead',
        abilities: ['Tier 2: +50% HP, +2 dmg, +1 defense.', ...UNDEAD_COMMON_ABILITIES] },
    { id: 'ghoul',        name: 'Ghoul',        icon: '\u{1F9DF}\u200D\u2640\uFE0F', portraitClass: 'rogue', portraitSpecies: 'orc',
        speciesLabel: 'Undead \u2022 Ghoul',
        kind: 'undead',
        abilities: ['Tier 3: +125% HP, +4 dmg, +2 defense.', ...UNDEAD_COMMON_ABILITIES] },
    { id: 'spectre',      name: 'Spectre',      icon: '\u{1F47B}',          portraitClass: 'mage',    portraitSpecies: 'elf',
        speciesLabel: 'Undead \u2022 Spectre',
        kind: 'undead',
        abilities: ['Tier 4: +240% HP, +6 dmg, +3 defense.', ...UNDEAD_COMMON_ABILITIES] },
    { id: 'mummy',        name: 'Mummy',        icon: '\u{1F9DF}\u200D\u2642\uFE0F', portraitClass: 'warrior', portraitSpecies: 'human',
        speciesLabel: 'Undead \u2022 Mummy',
        kind: 'undead',
        abilities: ['Tier 5: +406% HP, +8 dmg, +4 defense.', ...UNDEAD_COMMON_ABILITIES] },
    { id: 'ghost',        name: 'Ghost',        icon: '\u{1F47B}',          portraitClass: 'mage',    portraitSpecies: 'human',
        speciesLabel: 'Undead \u2022 Ghost',
        kind: 'undead',
        abilities: ['Tier 6: +659% HP, +10 dmg, +5 defense.', ...UNDEAD_COMMON_ABILITIES] },
    { id: 'vampire',      name: 'Vampire',      icon: '\u{1F9DB}',          portraitClass: 'rogue',   portraitSpecies: 'human',
        speciesLabel: 'Undead \u2022 Vampire',
        kind: 'undead',
        abilities: ['Tier 7: +1038% HP, +12 dmg, +6 defense.', ...UNDEAD_COMMON_ABILITIES] },
    { id: 'death_knight', name: 'Death Knight', icon: '\u{2620}\uFE0F',     portraitClass: 'warrior', portraitSpecies: 'dwarf',
        speciesLabel: 'Undead \u2022 Death Knight',
        kind: 'undead',
        abilities: ['Tier 8+: +1607% HP, +14 dmg, +7 defense (scales further with Necromancer level).', ...UNDEAD_COMMON_ABILITIES] },
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
 * Past death_knight (tierIndex 7), continues scaling with the same formula.
 *
 * @param {number} tierIndex
 */
export function rollUndeadStats(tierIndex) {
    const t = Math.max(0, tierIndex);
    const hpMult = Math.pow(1.5, t);
    const dmgBoost = t * 2;
    const defBoost = t;

    const roll = (min, max) => min + Math.floor(Math.random() * (max - min + 1));
    const hp = Math.round(roll(UNDEAD_BASE.hpMin, UNDEAD_BASE.hpMax) * hpMult);
    const st = Math.round(roll(UNDEAD_BASE.stMin, UNDEAD_BASE.stMax) * hpMult);

    return {
        maxHealth:  hp,
        maxStamina: st,
        maxMana:    0,
        meleeMin:   UNDEAD_BASE.meleeMin + dmgBoost,
        meleeMax:   UNDEAD_BASE.meleeMax + dmgBoost,
        defense:    UNDEAD_BASE.defense + defBoost,
    };
}

// ────────────────────────────────────────────
// Ranger woodland beasts
// ────────────────────────────────────────────

export const BEAST_TYPES = {
    bear: {
        id: 'bear',
        name: 'Bear',
        icon: '\u{1F43B}',
        portraitClass: 'warrior', portraitSpecies: 'orc',
        attackType: 'melee',
        speciesLabel: 'Beast \u2022 Bear',
        kind: 'beast',
        description: 'High HP, strong melee, stun chance matches ranger crit.',
        abilities: [
            'Single-target melee attack.',
            'High HP tank.',
            'Stun chance equal to summoner\u2019s ranged crit.',
            'Can be healed by potions and Cleric heal.',
        ],
    },
    eagle: {
        id: 'eagle',
        name: 'Eagle',
        icon: '\u{1F985}',
        portraitClass: 'ranger', portraitSpecies: 'elf',
        attackType: 'ranged',
        speciesLabel: 'Beast \u2022 Eagle',
        kind: 'beast',
        description: 'Ranged striker, lower HP, crit chance matches ranger crit.',
        abilities: [
            'Single-target ranged attack.',
            'Lower HP, higher damage.',
            'Crit chance equal to summoner\u2019s ranged crit (2\u00D7 damage on crit).',
            'Can be healed by potions and Cleric heal.',
        ],
    },
    pixie: {
        id: 'pixie',
        name: 'Pixie',
        icon: '\u{1F9DA}',
        portraitClass: 'mage', portraitSpecies: 'gnome',
        attackType: 'magic',
        speciesLabel: 'Beast \u2022 Pixie',
        kind: 'beast',
        description: 'Low HP, weak AoE magic, dodge chance matches ranger crit.',
        abilities: [
            'AoE faerie-dust magic (hits all enemies).',
            'Fragile \u2014 lowest HP of all beasts.',
            'Dodge chance equal to summoner\u2019s ranged crit.',
            'Can be healed by potions and Cleric heal.',
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
export function getSummonPreset(member) {
    if (!member || !member.isSummoned || !member.summonType) return null;
    if (BEAST_TYPES[member.summonType]) return BEAST_TYPES[member.summonType];
    const tier = UNDEAD_TIERS.find(t => t.id === member.summonType);
    if (tier) return tier;
    const golem = GOLEM_PRESETS[member.summonType];
    if (golem) return golem;
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
            portraitClass: 'warrior',
            portraitSpecies: 'dwarf',
            speciesLabel: `Golem \u2022 ${t.name}`,
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
 *   HP  = baseHp + hpPerAL × AL
 *   Def = baseDef + AL
 *   Damage = [meleeMin + AL, meleeMax + AL]
 *
 * @param {string} tierId
 * @param {number} artificerLevel
 */
export function rollGolemStats(tierId, artificerLevel = 1) {
    const tier = GOLEM_TIERS_CONST.find(t => t.id === tierId) || GOLEM_TIERS_CONST[0];
    const AL = Math.max(1, artificerLevel | 0);
    const hp = tier.baseHp + tier.hpPerAL * AL;
    return {
        maxHealth:  hp,
        maxStamina: 0,
        maxMana:    0,
        meleeMin:   tier.meleeMin + AL,
        meleeMax:   tier.meleeMax + AL,
        defense:    tier.baseDef + AL,
        tierId:     tier.id,
        regenPercent:   tier.regenPercent || 0,
        reflectChance:  tier.reflectChance || 0,
        reflectFraction:tier.reflectFraction || 0,
        slamEvery:      tier.slamEvery || 0,
        slamStunChance: tier.slamStunChance || 0,
        cleaveTargets:  tier.cleaveTargets || 0,
        immune:         Array.isArray(tier.immune) ? tier.immune.slice() : [],
    };
}

/**
 * Roll stats for a ranger beast.
 * Scaling: per ranger level, +2 HP and +1 to min/max damage.
 */
export function rollBeastStats(beastId, rangerLevel = 1) {
    const lvBoost = Math.max(0, rangerLevel - 1);
    const roll = (min, max) => min + Math.floor(Math.random() * (max - min + 1));

    switch (beastId) {
        case 'bear':
            return {
                maxHealth:  roll(24, 32) + lvBoost * 3,
                maxStamina: roll(20, 28),
                maxMana:    0,
                meleeMin:   3 + lvBoost,
                meleeMax:   10 + lvBoost,
                defense:    1,
            };
        case 'eagle':
            return {
                maxHealth:  roll(12, 18) + lvBoost * 2,
                maxStamina: roll(20, 28),
                maxMana:    0,
                rangedMin:  3 + lvBoost,
                rangedMax:  8 + lvBoost,
                defense:    0,
            };
        case 'pixie':
            return {
                maxHealth:  roll(8, 14) + lvBoost,
                maxStamina: 0,
                maxMana:    roll(15, 22),
                magicMin:   1 + Math.floor(lvBoost / 2),
                magicMax:   5 + lvBoost,
                defense:    0,
            };
        default:
            return rollBeastStats('bear', rangerLevel);
    }
}
