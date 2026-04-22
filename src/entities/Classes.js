/**
 * Classes — definitions for each character class.
 *
 * Each class has:
 *   - stat modifiers (% of INITIAL_* applied to max stats)
 *   - regen bonuses (extra points per minute above the base rate)
 *   - flat damage bonuses (melee / ranged / magic)
 *   - armorAllowed: Array<'cloth'|'leather'|'chain'|'plate'> — types they can equip
 *   - canUseShield: boolean (default true) — mage / monk / necromancer cannot
 *   - defenseBonus (flat)
 *   - Per-level scaling fields (applied each level beyond 1):
 *       meleePerLevel, rangedPerLevel, magicPerLevel, defensePerLevel
 *       stunPerLevel (melee warrior), critPerLevel (ranger ranged),
 *       magicStunPerLevel (mage), instakillPerLevel (rogue),
 *       dodgePerLevel, whirlwindPerLevel (monk),
 *       healPercentPerLevel (cleric), drainPerLevel (necromancer)
 *       backstabDamagePerLevel (rogue: +10% dmg per level)
 *   - optional `special` id (interpreted by CombatSystem / CombatUI)
 *
 * Base regen (everyone): 1 HP/min, 3 ST/min, 2 MP/min.
 */

import {
    WARRIOR_MELEE_PER_LEVEL, ROGUE_MELEE_PER_LEVEL, MONK_MELEE_PER_LEVEL,
    RANGER_RANGED_PER_LEVEL, MAGE_MAGIC_PER_LEVEL,
    WARRIOR_DEFENSE_PER_LEVEL, WARRIOR_STUN_PER_LEVEL,
    RANGER_CRIT_PER_LEVEL, MAGE_STUN_PER_LEVEL,
    ROGUE_INSTAKILL_PER_LEVEL,
    MONK_DODGE_PER_LEVEL, MONK_WHIRLWIND_PER_LEVEL,
    CLERIC_HEAL_PER_LEVEL, NECRO_DRAIN_PER_LEVEL,
    BACKSTAB_DAMAGE_PER_LEVEL,
    ARTIFICER_RANGED_PER_LEVEL,
    PALADIN_MELEE_PER_LEVEL, PALADIN_DEFENSE_PER_LEVEL,
    PALADIN_SMITE_INSTAKILL_PER_LEVEL,
    PALADIN_HEAL_PER_LEVEL,
} from '../utils/constants.js';

export const CLASSES = {
    warrior: {
        id: 'warrior',
        name: 'Warrior',
        icon: '\u2694\uFE0F',
        hpMod: 0.5, stMod: 0.5, mpMod: -1.0,
        regenHp: 1, regenSt: 1, regenMp: 0,
        meleeBonus: 1, rangedBonus: 0, magicBonus: 0,
        defenseBonus: 0,
        armorAllowed: ['cloth', 'leather', 'chain', 'plate'],
        canUseShield: true,
        meleePerLevel: WARRIOR_MELEE_PER_LEVEL,
        defensePerLevel: WARRIOR_DEFENSE_PER_LEVEL,
        stunPerLevel: WARRIOR_STUN_PER_LEVEL,
        special: null,
        description: 'Front-line tank. +50% HP, +50% ST, no mana. +1 melee, +1 HP/ST regen. Any armor + shield. Per level: +1 melee, +1 defense, +3% melee stun chance. +1 extra melee swing every 5 levels (L5, L10, L15…) — each swing pays stamina independently.',
    },
    ranger: {
        id: 'ranger',
        name: 'Ranger',
        icon: '\u{1F3F9}',
        hpMod: 0.25, stMod: 0.25, mpMod: -0.5,
        regenHp: 1, regenSt: 1, regenMp: 0,
        meleeBonus: 0, rangedBonus: 1, magicBonus: 0,
        defenseBonus: 0,
        armorAllowed: ['cloth', 'leather', 'chain'], // no plate
        canUseShield: true,
        rangedPerLevel: RANGER_RANGED_PER_LEVEL,
        critPerLevel: RANGER_CRIT_PER_LEVEL,
        special: 'ranger_summon',
        description: 'Skilled bowman. +25% HP/ST, -50% mana. +1 ranged, +1 HP/ST regen. Cloth/leather/chain armor (no plate). Shields OK — but equipping a ranged weapon auto-unequips a shield. Per level: +1 ranged, +3% ranged crit. +1 extra ranged shot every 5 levels (L5, L10, L15…) — each shot pays stamina and rolls its own crit. Summon Woodland Beast (7 MP): bear, eagle, or pixie.',
    },
    mage: {
        id: 'mage',
        name: 'Mage',
        icon: '\u{1FA84}',
        hpMod: -0.25, stMod: -0.25, mpMod: 0.5,
        regenHp: 0, regenSt: 0, regenMp: 2,
        meleeBonus: 0, rangedBonus: 0, magicBonus: 1,
        defenseBonus: 0,
        armorAllowed: ['cloth'],
        canUseShield: false,
        magicPerLevel: MAGE_MAGIC_PER_LEVEL,
        magicStunPerLevel: MAGE_STUN_PER_LEVEL,
        special: null,
        description: 'Arcane caster. -25% HP/ST, +50% mana. +1 magic, +2 MP regen. Cloth armor only; cannot use shields. Per level: +1 magic, +1% chance to stun foes with magic.',
    },
    rogue: {
        id: 'rogue',
        name: 'Rogue',
        icon: '\u{1F5E1}\uFE0F',
        hpMod: 0, stMod: 1.0, mpMod: -1.0,
        regenHp: 0, regenSt: 2, regenMp: 0,
        meleeBonus: 1, rangedBonus: 0, magicBonus: 0,
        defenseBonus: 0,
        armorAllowed: ['cloth', 'leather'], // cloth or leather
        canUseShield: true,
        meleePerLevel: ROGUE_MELEE_PER_LEVEL,
        instakillPerLevel: ROGUE_INSTAKILL_PER_LEVEL,
        backstabDamagePerLevel: BACKSTAB_DAMAGE_PER_LEVEL,
        special: 'backstab',
        description: 'Stealthy striker. +100% ST, no mana. +1 melee, +2 ST regen. Cloth or leather armor. Backstab: 3× stamina for 2× damage + 10% damage per rogue level + 5% instakill (+1%/level). Can melee from back row. Rogues also spot and disarm traps. Per level: +1 melee, +1% backstab instakill, +10% backstab damage.',
    },
    monk: {
        id: 'monk',
        name: 'Monk',
        // Rule 13: neutral starting stats.
        icon: '\u{1F9D8}',
        hpMod: 0, stMod: 0, mpMod: 0,
        regenHp: 0, regenSt: 1, regenMp: 1,
        meleeBonus: 1, rangedBonus: 0, magicBonus: 0,
        defenseBonus: 0,
        armorAllowed: ['cloth'],
        canUseShield: false, // Rule 6
        meleePerLevel: MONK_MELEE_PER_LEVEL,
        dodgePerLevel: MONK_DODGE_PER_LEVEL,
        whirlwindPerLevel: MONK_WHIRLWIND_PER_LEVEL,
        special: 'monk',
        description: 'Martial artist. Balanced stats (no bonuses/penalties). +1 melee, +1 ST/MP regen. Cloth armor only; cannot use shields. Melee costs both ST & MP; 50% whirlwind hits each other foe; 33% dodge (2 ST + 2 MP). Per level: +1 melee, +1% whirlwind, +1% dodge.',
    },
    cleric: {
        id: 'cleric',
        name: 'Cleric',
        icon: '\u2728',
        hpMod: 0.25, stMod: -0.5, mpMod: 0.25,
        regenHp: 0, regenSt: 0, regenMp: 0,
        meleeBonus: 0, rangedBonus: 0, magicBonus: 0,
        defenseBonus: 0,
        armorAllowed: ['cloth', 'leather', 'chain', 'plate'],
        canUseShield: true,
        healPercentPerLevel: CLERIC_HEAL_PER_LEVEL,
        special: 'heal',
        description: 'Holy healer. +25% HP, -50% ST, +25% mana. Any armor + shield. Heal: 5 MP to restore 25% of target max HP (+2% per level).',
    },
    necromancer: {
        id: 'necromancer',
        name: 'Necromancer',
        icon: '\u{1F480}',
        hpMod: -0.5, stMod: -0.5, mpMod: 1.0,
        regenHp: 0, regenSt: 0, regenMp: 0,
        meleeBonus: 0, rangedBonus: 0, magicBonus: 0,
        defenseBonus: 0,
        armorAllowed: ['cloth'],
        canUseShield: false, // Rule 8
        drainPerLevel: NECRO_DRAIN_PER_LEVEL,
        special: 'summon',
        description: 'Dark caster. -50% HP/ST, +100% mana. Cloth armor only; cannot use shields. Summon undead (7 MP, combat only) — L1 Skeleton, then Zombie / Ghoul / Spectre / Mummy / Ghost / Vampire / Death Knight unlocked at odd levels. Life drain (25% per enemy hit by magic) heals self AND own undead; +1 per level.',
    },
    bard: {
        // Phase 8 rule 14 — support caster with a party-wide song buff.
        id: 'bard',
        name: 'Bard',
        icon: '\u{1F3B6}',
        hpMod: 0, stMod: -0.2, mpMod: 0.2,
        regenHp: 0, regenSt: 0, regenMp: 1,
        meleeBonus: 0, rangedBonus: 0, magicBonus: 0,
        defenseBonus: 0,
        armorAllowed: ['cloth', 'leather', 'chain'], // no plate
        canUseShield: true,
        magicPerLevel: 1, // +1 magic damage per level beyond 1
        special: 'bard_song',
        description: 'Inspiring minstrel. -20% ST, +20% mana. Cloth/leather/chain armor (no plate). Can use shields. Sing a song (7 MP, once per combat): party-wide +2 defense and +2 melee/ranged/magic damage. Bonus rises by +1 at levels 3, 5, 7… Per level: +1 magic damage.',
    },
    artificer: {
        // Phase 12 — tinkerer / golem-smith. Secondary ranged striker that
        // shines out of combat: the only class that can spend reagents at the
        // crafting table (enchanting gear, brewing potions, building golems).
        id: 'artificer',
        name: 'Artificer',
        icon: '\u{1F527}', // 🔧
        hpMod: 0, stMod: 0.5, mpMod: -0.5,
        regenHp: 0, regenSt: 2, regenMp: 0,
        meleeBonus: 0, rangedBonus: 1, magicBonus: 0,
        defenseBonus: 0,
        armorAllowed: ['cloth', 'leather'],
        canUseShield: false,
        rangedPerLevel: ARTIFICER_RANGED_PER_LEVEL,
        special: 'artificer',
        description: 'Inventor & golem-smith. +50% ST, -50% mana. +1 ranged, +2 ST regen. Cloth/leather only; no shields. Scatter Shot: ranged hit spreads to 2 splash targets at half damage (+1 splash every 5 levels), each with its own crit. Press [K] to craft: enchant weapons/armor, brew healing/elixir potions, and build permanent golems. Per level: +1 ranged.',
    },
    paladin: {
        // Phase 12 — front-line holy warrior with minor heals and a smite.
        id: 'paladin',
        name: 'Paladin',
        icon: '\u{1F6E1}\uFE0F', // 🛡️
        hpMod: 0.20, stMod: 0, mpMod: -0.20,
        regenHp: 1, regenSt: 0, regenMp: 0,
        meleeBonus: 1, rangedBonus: 0, magicBonus: 0,
        defenseBonus: 0,
        armorAllowed: ['cloth', 'leather', 'chain', 'plate'],
        canUseShield: true,
        meleePerLevel:     PALADIN_MELEE_PER_LEVEL,
        defensePerLevel:   PALADIN_DEFENSE_PER_LEVEL,
        healPercentPerLevel: PALADIN_HEAL_PER_LEVEL,     // half of cleric per-level
        instakillPerLevel: PALADIN_SMITE_INSTAKILL_PER_LEVEL, // reused for Smite
        special: 'paladin',
        description: 'Holy warrior. +20% HP, -20% mana. +1 melee, +1 HP regen. Any armor + shield. Heal: 5 MP restores 12.5% of target max HP (+1%/level — half cleric strength). Smite (5 MP): armor-ignoring melee with 1%/level chance to instakill Undead or Demon foes. Per level: +1 melee, +1 defense.',
    },
    druid: {
        // Phase 8 rule 15 — nature caster with entangle + beast summon.
        id: 'druid',
        name: 'Druid',
        icon: '\u{1F33F}',
        hpMod: -0.15, stMod: -0.15, mpMod: 0.3,
        regenHp: 0, regenSt: 0, regenMp: 1,
        meleeBonus: 0, rangedBonus: 0, magicBonus: 0,
        defenseBonus: 0,
        armorAllowed: ['cloth', 'leather'], // no chain or plate
        canUseShield: true,
        magicPerLevel: 1, // +1 magic damage per level beyond 1
        special: 'druid',
        description: 'Nature caster. -15% HP/ST, +30% mana. Cloth/leather armor only (no chain or plate). Entangle (8 MP): vines target all enemies, each with 50% chance to suffer -2 defense and -2 damage (scales +1 at levels 3, 5, 7…). Also summons a Woodland Beast like the ranger (7 MP). Per level: +1 magic damage.',
    },
};

export const CLASS_IDS = Object.keys(CLASSES);

export function getClassDef(id) {
    return CLASSES[id] || CLASSES.warrior;
}
