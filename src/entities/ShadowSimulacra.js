import { PHOTOMANCER_SIMULACRUM_GOLD_PER_LEVEL } from '../utils/constants.js';

export const SHADOW_SIMULACRA_TYPE = 'shadow_simulacra';
export const LEGACY_SIMULACRUM_TYPE = 'simulacrum';

export function isShadowSimulacra(member) {
    return !!member
        && member.isSummoned
        && (member.summonType === SHADOW_SIMULACRA_TYPE || member.summonType === LEGACY_SIMULACRUM_TYPE);
}

export const SHADOW_SIMULACRA_ATTACK_POWER_IDS = ['extra_melee', 'extra_ranged', 'extra_magic', 'aoe_attack'];
export const SHADOW_SIMULACRA_ATTACK_TYPES = ['melee', 'ranged', 'magic'];

export const SHADOW_SIMULACRA_DOT_POWERS = {
    dot_fire:      { label: 'Fire DoT',      effect: 'shadow_fire_dot',      immune: 'fire',      frac: 0.40, icon: '🔥' },
    dot_ice:       { label: 'Ice DoT',       effect: 'shadow_ice_dot',       immune: 'cold',      frac: 0.40, icon: '❄️' },
    dot_lightning: { label: 'Lightning DoT', effect: 'shadow_lightning_dot', immune: 'lightning', frac: 0.40, icon: '⚡' },
    dot_acid:      { label: 'Acid DoT',      effect: 'shadow_acid_dot',      immune: 'acid',      frac: 0.40, icon: '🟢' },
    dot_poison:    { label: 'Poison DoT',    effect: 'shadow_poison_dot',    immune: 'poison',    frac: 0.60, icon: '☠️' },
    dot_psychic:   { label: 'Psychic DoT',   effect: 'shadow_psychic_dot',   immune: 'psychic',   frac: 0.60, icon: '💜' },
    dot_sonic:     { label: 'Sonic DoT',     effect: 'shadow_sonic_dot',     immune: 'sonic',     frac: 0.60, icon: '🔊' },
    dot_bleed:     { label: 'Bleed DoT',     effect: 'shadow_bleed_dot',     immune: 'bleed',     frac: 0.60, icon: '🩸' },
};

export const SHADOW_SIMULACRA_POWERS = [
    { id: 'extra_melee', name: 'Extra Melee Attacks', group: 'attack_mode', row: 'front', desc: 'Adds floor(level/5) melee attacks beyond the basic attack; counts as melee contact.' },
    { id: 'extra_ranged', name: 'Extra Ranged Attacks', group: 'attack_mode', row: 'back', desc: 'Adds floor(level/5) ranged attacks beyond the basic attack.' },
    { id: 'extra_magic', name: 'Extra Magic Attacks', group: 'attack_mode', row: 'front', desc: 'Adds floor(level/5) single-target magic attacks beyond the basic attack.' },
    { id: 'aoe_attack', name: 'AOE Attack', group: 'attack_mode', desc: 'The basic attack hits floor(level/5) enemies for 66% damage; disables extra melee/ranged/magic attacks.' },
    { id: 'dot_fire', name: 'Fire DoT', desc: 'Hits add a stacking fire DoT for 40% damage per round.' },
    { id: 'dot_ice', name: 'Ice DoT', desc: 'Hits add a stacking ice DoT for 40% damage per round.' },
    { id: 'dot_lightning', name: 'Lightning DoT', desc: 'Hits add a stacking lightning DoT for 40% damage per round.' },
    { id: 'dot_acid', name: 'Acid DoT', desc: 'Hits add a stacking acid DoT for 40% damage per round.' },
    { id: 'dot_poison', name: 'Poison DoT', desc: 'Hits add a stacking poison DoT for 60% damage per round.' },
    { id: 'dot_psychic', name: 'Psychic DoT', desc: 'Hits add a stacking psychic DoT for 60% damage per round.' },
    { id: 'dot_sonic', name: 'Sonic DoT', desc: 'Hits add a stacking sonic DoT for 60% damage per round.' },
    { id: 'dot_bleed', name: 'Bleed DoT', desc: 'Hits add a stacking bleed DoT for 60% damage per round.' },
    { id: 'stun_attack', name: 'Stun Attack', desc: 'Hits have level/3% chance to stun for 1 round through normal stun resistance.' },
    { id: 'hold_attack', name: 'Hold Attack', desc: 'Hits have level/3% chance to hold through normal hold resistance.' },
    { id: 'extra_offense', name: 'Extra Offense', desc: '+50% melee, ranged, and magic skill.' },
    { id: 'extra_defense', name: 'Extra Defense', desc: '+50% defense.' },
    { id: 'extra_health', name: 'Extra Health', repeatable: true, desc: '+50% max health. Can be selected multiple times.' },
    { id: 'regen', name: 'Regen', desc: 'Regenerates floor(level/3)% of max HP on its turn.' },
    { id: 'immune_fire', name: 'Immunity: Fire', desc: 'Immune to fire damage and fire DoTs.' },
    { id: 'immune_ice', name: 'Immunity: Ice', desc: 'Immune to ice/cold damage and DoTs.' },
    { id: 'immune_lightning', name: 'Immunity: Lightning', desc: 'Immune to lightning damage and DoTs.' },
    { id: 'immune_acid', name: 'Immunity: Acid', desc: 'Immune to acid damage and DoTs.' },
    { id: 'resource_drain', name: 'Stamina and Mana Drain', desc: 'Hits drain stamina and mana equal to base damage times level%.' },
    { id: 'life_drain', name: 'Life Drain', desc: 'Restores health equal to level/2% of damage dealt.' },
    { id: 'immune_holds', name: 'Immunity to Holds', desc: 'Immune to all hold/web/paralyze style restraints.' },
    { id: 'phase_strike', name: 'Phase Strike Attacks', desc: 'Attacks ignore armor and defense.' },
    { id: 'offense_debuff', name: 'Offense Debuff', desc: 'Hits reduce target melee, ranged, and magic damage by floor(level/8).' },
    { id: 'defense_debuff', name: 'Defense Debuff', desc: 'Hits reduce target defense by floor(level/8).' },
    { id: 'heal_party', name: 'Heal Party', desc: '50% chance to mass-heal acceptable allies instead of attacking.' },
    { id: 'block_dodge', name: 'Block or Dodge', desc: 'level/2% chance to avoid single-target melee, ranged, or magic attacks.' },
    { id: 'retributive_damage', name: 'Retributive Damage', desc: 'Reflects level*2% of suffered melee damage back to the attacker.' },
];

export const SHADOW_SIMULACRA_POWER_BY_ID = Object.fromEntries(
    SHADOW_SIMULACRA_POWERS.map(power => [power.id, power]),
);

export function getShadowPower(id) {
    return SHADOW_SIMULACRA_POWER_BY_ID[id] || null;
}

export function getShadowPowerName(id) {
    return getShadowPower(id)?.name || id;
}

export function shadowPowerCount(powers, id) {
    return (Array.isArray(powers) ? powers : []).filter(p => p === id).length;
}

export function normalizeShadowPowers(powers, slots = Infinity) {
    const out = [];
    let attackMode = null;
    for (const id of Array.isArray(powers) ? powers : []) {
        const def = getShadowPower(id);
        if (!def) continue;
        if (def.group === 'attack_mode') {
            if (attackMode && attackMode !== id) continue;
            attackMode = id;
        }
        if (!def.repeatable && out.includes(id)) continue;
        out.push(id);
        if (out.length >= slots) break;
    }
    return out;
}

export function getAvailableShadowPowers(selected, slotIndex) {
    const current = selected?.[slotIndex] || '';
    const chosenAttackMode = (selected || []).find(id => SHADOW_SIMULACRA_ATTACK_POWER_IDS.includes(id));
    return SHADOW_SIMULACRA_POWERS.filter(power => {
        if (power.group === 'attack_mode' && chosenAttackMode && chosenAttackMode !== power.id && current !== power.id) return false;
        if (!power.repeatable && selected.includes(power.id) && current !== power.id) return false;
        return true;
    });
}

export function normalizeShadowSimulacraAttackType(attackType) {
    return SHADOW_SIMULACRA_ATTACK_TYPES.includes(attackType) ? attackType : 'melee';
}

export function buildShadowSimulacraStats(photo, selectedPowers, attackType = 'melee') {
    const level = Math.max(1, photo?.level || 1);
    const powers = normalizeShadowPowers(selectedPowers);
    const normalizedAttackType = normalizeShadowSimulacraAttackType(attackType);
    const baseSkill = Math.max(1, level * 2);
    const offenseSkill = powers.includes('extra_offense') ? Math.floor(baseSkill * 1.5) : baseSkill;
    const defense = powers.includes('extra_defense') ? Math.floor(baseSkill * 1.5) : baseSkill;
    const healthMult = 1 + 0.5 * shadowPowerCount(powers, 'extra_health');
    const maxHealth = Math.max(1, Math.floor((photo?.maxHealth || level * 10) * healthMult));
    const attackMode = powers.find(id => SHADOW_SIMULACRA_ATTACK_POWER_IDS.includes(id)) || 'basic_melee';
    const row = normalizedAttackType === 'melee' ? 'front' : 'back';
    const immune = [
        'stun', 'poison', 'psychic', 'paralyze', 'bleed', 'stamina_drain', 'mana_drain',
    ];
    if (powers.includes('immune_fire')) immune.push('fire');
    if (powers.includes('immune_ice')) immune.push('cold', 'ice');
    if (powers.includes('immune_lightning')) immune.push('lightning');
    if (powers.includes('immune_acid')) immune.push('acid');
    if (powers.includes('immune_holds')) immune.push('hold', 'web');

    return {
        maxHealth,
        maxStamina: 0,
        maxMana: 0,
        row,
        summonStats: {
            shadowSimulacra: true,
            simulacrum: true,
            powers,
            defense,
            meleeMin: offenseSkill,
            meleeMax: offenseSkill + 4,
            rangedMin: offenseSkill,
            rangedMax: offenseSkill + 4,
            magicMin: offenseSkill,
            magicMax: offenseSkill + 4,
            photomancerLevel: level,
            attackMode,
            attackType: normalizedAttackType,
            damageBonusPct: level,
            immune: [...new Set(immune)],
            tags: ['construct'],
            kind: 'construct',
        },
    };
}

export function getShadowSimulacraCost(photo) {
    return Math.max(1, photo?.level || 1) * PHOTOMANCER_SIMULACRUM_GOLD_PER_LEVEL;
}

export function getShadowSimulacraLimit(photo) {
    return Math.max(1, Math.floor(Math.max(1, photo?.level || 1) / 10));
}

export function getShadowSimulacraSlotCount(photo) {
    return Math.max(1, Math.floor(Math.max(1, photo?.level || 1) / 5));
}
