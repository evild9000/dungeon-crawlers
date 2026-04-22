/**
 * Species — definitions for each character species.
 *
 * Each species contributes flat damage bonuses and regen bonuses
 * (per minute) that stack with the character's class bonuses.
 *
 * Species also carry a small portrait "trait" hint (color, ears,
 * beard, tusks, etc.) consumed by PortraitGenerator.
 */

export const SPECIES = {
    human: {
        id: 'human',
        name: 'Human',
        icon: '\u{1F464}',
        regenHp: 1, regenSt: 1, regenMp: 0,
        meleeBonus: 0, rangedBonus: 0, magicBonus: 0,
        defenseBonus: 0,
        portraitTrait: { skinShift: 0, ears: 'round', beard: false, tusks: false, skinTint: null, heightScale: 1.0 },
        description: 'Well-rounded. +1 HP regen/min, +1 ST regen/min.',
    },
    elf: {
        id: 'elf',
        name: 'Elf',
        icon: '\u{1F9DD}',
        regenHp: 0, regenSt: 0, regenMp: 0,
        meleeBonus: 0, rangedBonus: 1, magicBonus: 1,
        defenseBonus: 0,
        portraitTrait: { skinShift: 0, ears: 'pointed', beard: false, tusks: false, skinTint: null, heightScale: 1.0 },
        description: 'Graceful archer-mages. +1 ranged damage, +1 magic damage.',
    },
    dwarf: {
        id: 'dwarf',
        name: 'Dwarf',
        icon: '\u26CF\uFE0F',
        regenHp: 0, regenSt: 1, regenMp: 0,
        meleeBonus: 1, rangedBonus: 0, magicBonus: 0,
        defenseBonus: 0,
        portraitTrait: { skinShift: 0, ears: 'round', beard: true, tusks: false, skinTint: null, heightScale: 0.92 },
        description: 'Stout mountain-folk. +1 melee damage, +1 ST regen/min.',
    },
    orc: {
        id: 'orc',
        name: 'Orc',
        icon: '\u{1F479}',
        regenHp: 1, regenSt: 0, regenMp: 0,
        meleeBonus: 1, rangedBonus: 0, magicBonus: 0,
        defenseBonus: 0,
        portraitTrait: { skinShift: 0, ears: 'pointed', beard: false, tusks: true, skinTint: '#5a8a4a', heightScale: 1.05 },
        description: 'Brutish warriors. +1 melee damage, +1 HP regen/min.',
    },
    gnome: {
        id: 'gnome',
        name: 'Gnome',
        icon: '\u{1F9D9}',
        regenHp: 0, regenSt: 0, regenMp: 1,
        meleeBonus: 0, rangedBonus: 0, magicBonus: 1,
        defenseBonus: 0,
        portraitTrait: { skinShift: 0, ears: 'pointed', beard: true, tusks: false, skinTint: null, heightScale: 0.85 },
        description: 'Tinkering illusionists. +1 magic damage, +1 MP regen/min.',
    },
    halfling: {
        id: 'halfling',
        name: 'Halfling',
        icon: '\u{1F9D1}',
        regenHp: 0, regenSt: 1, regenMp: 0,
        meleeBonus: 0, rangedBonus: 0, magicBonus: 0,
        defenseBonus: 1, // nimble & small — harder to hit
        portraitTrait: { skinShift: 0, ears: 'round', beard: false, tusks: false, skinTint: null, heightScale: 0.88 },
        description: 'Nimble wanderers. +1 defense (less damage taken), +1 ST regen/min.',
    },
};

export const SPECIES_IDS = Object.keys(SPECIES);

export function getSpeciesDef(id) {
    return SPECIES[id] || SPECIES.human;
}
