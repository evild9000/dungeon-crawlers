export const FAMILIAR_TYPES = [
    { id: 'cat',        name: 'Cat',        icon: '🐈' },
    { id: 'toad',       name: 'Toad',       icon: '🐸' },
    { id: 'raven',      name: 'Raven',      icon: '🐦' },
    { id: 'hawk',       name: 'Hawk',       icon: '🦅' },
    { id: 'spider',     name: 'Spider',     icon: '🕷️' },
    { id: 'centipede',  name: 'Centipede',  icon: '🐛' },
    { id: 'owl',        name: 'Owl',        icon: '🦉' },
    { id: 'rat',        name: 'Rat',        icon: '🐀' },
    { id: 'lizard',     name: 'Lizard',     icon: '🦎' },
    { id: 'rabbit',     name: 'Rabbit',     icon: '🐇' },
    { id: 'snake',      name: 'Snake',      icon: '🐍' },
];

export function getFamiliarDef(typeId) {
    return FAMILIAR_TYPES.find(f => f.id === typeId) || null;
}
