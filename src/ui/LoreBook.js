import { ENEMY_TYPES } from '../utils/constants.js';
import { generateEnemySprite } from '../utils/SpriteGenerator.js';

// Tag display info: key -> { label, color }
const TAG_INFO = {
    undead:       { label: '🧟 Undead',       color: '#8a9a6a' },
    incorporeal:  { label: '👻 Incorporeal',  color: '#aabbcc' },
    demon:        { label: '😈 Demon',        color: '#c04040' },
    beast:        { label: '🐺 Beast',        color: '#a07040' },
    aberration:   { label: '🧠 Aberration',   color: '#8060c0' },
    venomous:     { label: '🐍 Venomous',     color: '#60a040' },
    construct:    { label: '🪆 Construct',    color: '#7090b0' },
    elemental:    { label: '🌀 Elemental',    color: '#60a0c0' },
    humanoid:     { label: '🧍 Humanoid',     color: '#709090' },
    monster:      { label: '👾 Monster',      color: '#907070' },
    vermin:       { label: '🐛 Vermin',       color: '#708050' },
    dragon:       { label: '🐉 Dragon',       color: '#c06020' },
    plant:        { label: '🌿 Plant',        color: '#4a8040' },
    slime:        { label: '🧪 Slime',        color: '#8a8f63' },
    archer:       { label: '🏹 Archer',       color: '#b08a40' },
    spellcaster:  { label: '🔮 Spellcaster',  color: '#8060d0' },
};

function buildAbilityList(def) {
    const lines = [];
    const tags = def.tags || [];
    const name = String(def.name || '').toLowerCase();

    // Passive tag-based traits
    if (tags.includes('incorporeal')) {
        lines.push('Incorporeal: immune to Druid Entangle and Verdant Surge nature DoT — physical vines and nature magic pass harmlessly through this ethereal form');
        lines.push('Incorporeal: immune to stun, hold, paralysis, and petrification — all CC effects pass through the ethereal form');
        lines.push('Incorporeal: immune to Artificer Drone Arcane Bindings (already noted above) and Beholder/Medusa Petrify Ray');
        lines.push('Incorporeal: immune to mummy rot — no living flesh to decay');
        lines.push('Incorporeal: immune to Rogue Backstab Bleed — has no blood to shed');
        lines.push('Incorporeal: immune to Rogue Captured Traps — mechanisms pass through the creature');
        lines.push('Incorporeal: immune to Trap Mastery stun and hold procs — incorporeal form cannot be physically stunned or held');
        lines.push('Incorporeal: immune to Web and constrict effects — ethereal form cannot be physically ensnared');
        lines.push('Incorporeal: immune to Artificer Drone Arcane Bindings — no physical form to ensnare');
        lines.push('Incorporeal: immune to Ranger Beast Companion Sabre Tooth Cat instakill — ethereal form cannot be slain by a physical bite; normal damage applies');
        lines.push('Incorporeal: immune to Ranger Beast Companion Mega-conda hold and constrict — ethereal form cannot be physically grasped');
        // stun+paralysis already covered in the combined line above
    }
    if (tags.includes('undead')) {
        lines.push('Undead: immune to stun and paralysis — undead physiology resists physical disruption; Trap Mastery stun procs will be resisted');
        lines.push('Undead: immune to Photomancer Radiant Burst and its blind effect — the spell only affects living targets');
        lines.push('Undead: immune to mummy rot — no living flesh to decay');
        lines.push('Undead: can be held by treant or faerie queen — hold bypasses stun immunity');
        lines.push('Undead: immune to bleed and poison effects — no living blood or metabolism');
        lines.push('Undead: immune to Ranger Beast Companion Sabre Tooth Cat instakill — undead cannot be slain by a physical killing bite; normal damage applies');
        // ghoul paralysis immunity covered by stun+paralysis line above
        lines.push('Undead: immune to Bard Charm Monster — cannot be mind-controlled');
        lines.push('Undead: exception — Necromancer Control the Dead (L35) can dominate non-boss undead');
        lines.push('Undead: immune to all psychic effects — fear, charm, mental enslavement, and psychic stun have no effect on the mindless undead');
        lines.push('Undead: immune to Necromancer Plague Bringer (L30) — cannot be infected with necrotic plague');
        lines.push('Undead: immune to Necromancer Siphon Power (L35) — no living vigor to drain');
        lines.push('Undead: cannot be stitched by Necromancer Dark Apotheosis (L30) — already animated; no suitable remains to repurpose');
        if ((def.name || '').toLowerCase().includes('lich')) {
            lines.push('Lich Remains: liches and dracoliches have a 33% chance to drop a Lich Part in addition to normal undead materials');
        }
    }
    if (tags.includes('elemental')) {
        lines.push('Elemental: immune to Photomancer Radiant Burst and its blind effect — the spell only affects living targets');
        lines.push('Elemental: immune to Bard Charm Monster — pure elemental energy resists mind magic');
        lines.push('Elemental: immune to stun and paralysis — no nervous system to disrupt; Trap Mastery stun procs will be resisted');
        lines.push('Elemental: immune to poison — pure elemental energy has no biology to corrupt');
        lines.push('Elemental: immune to mummy rot — no living flesh to decay');
        lines.push('Elemental: immune to Necromancer Siphon Power (L35) — no mortal stamina/mana reserves to drain');
        lines.push('Elemental: immune to Ranger Beast Companion Sabre Tooth Cat instakill — elemental energy cannot be slain by a physical killing bite; normal damage applies');
        lines.push('Elemental: vulnerable to Cleric Banishment (L30) — elemental energy can be torn from the mortal plane; cleric level% instant destruction (bosses/mega-bosses immune to instant kill but still take ×20 holy force damage) or ×20 magic damage ignoring all defense');
        lines.push('Elemental Essence: elemental creatures can drop matching essence for Artificer L35 elemental devices; void-touched elementals can drop Void Essence');
    }
    if (tags.includes('demon')) {
        lines.push('Demon: vulnerable to Paladin Smite — Smite and AoE Smite deal bonus damage and can destroy demons outright');
        lines.push('Demon: vulnerable to Cleric Banishment (L30) — divine power can expel demonic entities; cleric level% instant destruction (bosses/mega-bosses immune to instant kill but still take ×20 holy force damage) or ×20 magic damage ignoring all defense');
        lines.push('Demon Lore: Warlock L35 Awaken can manifest ten unique Awakened Lords from repeated cauldron summons; no duplicate Lord can exist across warlocks in the same combat. Their offensive skills are warlock level x2, each attack starts at 10-20 + skill damage, and they gain +(warlock level/10 x 100)% damage before Lord-specific modifiers');
    }
    if (tags.includes('plant')) {
        lines.push('Plant: fungal or plant-type creature — vulnerable to fire and nature magic');
        lines.push('Plant: immune to Photomancer Radiant Burst and its blind effect — plant bodies do not count as living targets for this spell');
        lines.push('Plant: vulnerable to Druid Wither Plants (L35) — magic AoE at 3× its prior formula, base × 3 × (3 + druid level/100); non-boss plants have a level/5% chance of instant destruction');
        lines.push('Plant: susceptible to Druid Nature\'s Charms (L35) — charm bypasses normal plant charm immunity; 3 resists grant immunity for the rest of combat');
        lines.push('Plant: immune to Ranger Beast Companion Sabre Tooth Cat instakill — plant physiology resists a predator\'s killing bite; normal damage applies');
    }
    if (tags.includes('construct')) {
        lines.push('Construct: immune to Bard Charm Monster — no mind to enchant');
        lines.push('Construct: immune to Photomancer Radiant Burst and its blind effect — the spell only affects living targets');
        lines.push('Construct: immune to all psychic effects — fear, charm, mental enslavement, and psychic stun cannot affect mechanical or magically-animated beings');
        lines.push('Construct: immune to stun and paralysis — mechanical body resists physical disruption; Trap Mastery stun procs will be resisted');
        lines.push('Construct: immune to poison — no biology to corrupt');
        lines.push('Construct: immune to mummy rot — no living flesh to decay');
        lines.push('Construct: immune to Necromancer Siphon Power (L35) — no living stamina/mana to siphon');
        lines.push('Construct: immune to Ranger Beast Companion Sabre Tooth Cat instakill — mechanical construction cannot be slain by a physical killing bite; normal damage applies');
        lines.push('Construct: vulnerable to Artificer Deconstruct (L25) — Scatter Shot hits gain bonus crit chance and deal +200% bonus damage; 50% chance each hit scavenges parts to repair the artificer\'s own golems for 5% max HP');
        lines.push('Construct: vulnerable to Artificer Sabotage (L35) — each Scatter hit adds sabotage counters, permanent defense loss, and stacking malfunction DoTs; bosses, mega-bosses, and super-bosses are immune to sabotage instakill but not the debuffs');
        lines.push('Construct: cannot be stitched by Necromancer Dark Apotheosis (L30) — no flesh to animate as a Corpse Horror');
    }
    if (tags.includes('dragon')) {
        lines.push('Dragon: Dragonslayer lets level 25 paladins Smite and AoE Smite dragons');
        lines.push('Dragon: shielded level 25 paladins reduce this creature’s magic/AoE damage against the party by (paladin level + 10)%, capped at 90%, before defenses apply');
        lines.push('Dragon Hide: dragon-tagged monsters have a 40% hide drop chance; colored dragons usually drop matching colored hide, while dracoliches are skeletal and do not drop hides');
    }
    if (tags.includes('vermin')) {
        lines.push('Vermin: valid target for Vermin Keeper Charm Vermin (L20)');
        lines.push('Vermin: if charmed/summoned under a level 35 Vermin Keeper, can gain Minions\' Frenzy extra actions and obey that keeper\'s Hive Mind mark');
    }
    if (tags.includes('slime')) {
        lines.push('Slime: valid target for Vermin Keeper Charm Vermin (L20)');
        lines.push('Slime: immune to bleed effects — ooze bodies have no blood-bearing anatomy');
        lines.push('Slime: immune to Photomancer Radiant Burst and its blind effect');
        lines.push('Slime: if charmed/summoned under a level 35 Vermin Keeper, can gain Minions\' Frenzy extra actions and obey that keeper\'s Hive Mind mark (special swarms excluded)');
    }
    if (tags.includes('spellcaster')) {
        lines.push('Spellcaster Material: level 25+ spellcaster-tagged monsters have an independent chance to drop a Spellcaster Focus in addition to other materials');
    }
    if (tags.includes('archer')) {
        lines.push('Archer Material: level 25+ archer-tagged monsters have an independent chance to drop an Archer Quiver in addition to other materials');
    }
    if (name === 'dark treant') {
        lines.push('Material Drop: level 25+ dark treants have an independent chance to drop Dark Treant Wood in addition to normal plant materials');
    }
    if (name === 'mummy') {
        lines.push('Material Drop: level 25+ mummies have an independent chance to drop Mummy Wraps in addition to normal undead materials');
    }
    if (name === 'evil berserker') {
        lines.push('Material Drop: level 25+ evil berserkers have an independent chance to drop Evil Berserker Furs');
    }
    if (name === 'assassin lord') {
        lines.push('Material Drop: level 25+ assassin lords have an independent chance to drop an Assassin Lord Blade');
    }
    if (name === 'beholder') {
        lines.push('Material Drop: level 25+ beholders have an independent chance to drop a Beholder Eye Lens in addition to normal aberration materials');
    }
    // Immunity from the immune[] array on the type definition.
    // Elemental types (fire, cold, lightning, acid, poison) get "damage and DoT" wording.
    // Non-elemental types (stun, poison-as-status) get plain wording.
    if (Array.isArray(def.immune) && def.immune.length > 0) {
        const immuneIcons  = { fire: '🔥', cold: '❄️', lightning: '⚡', acid: '🟢', poison: '☠️', stun: '💫' };
        const elementalSet = new Set(['fire', 'cold', 'lightning', 'acid', 'poison']);
        const elementals   = def.immune.filter(t => elementalSet.has(t));
        const statusTypes  = def.immune.filter(t => !elementalSet.has(t));
        if (elementals.length > 0) {
            const labels = elementals.map(t => `${immuneIcons[t] || '🛡️'} ${t}`).join(', ');
            lines.push(`Elemental Immunity: immune to ${labels} damage and DoT effects`);
        }
        if (statusTypes.length > 0) {
            const labels = statusTypes.map(t => `${immuneIcons[t] || '🛡️'} ${t}`).join(', ');
            lines.push(`Status Immunity: immune to ${labels} effects`);
        }
    }
    if (def.hpMult && def.hpMult > 1) {
        lines.push(`Reinforced: spawns with ${def.hpMult}× normal HP`);
    }
    if (def.defenseMult && def.defenseMult > 1) {
        lines.push(`Fortified: spawns with ${def.defenseMult}× normal defense`);
    }

    // Active combat abilities
    // If a ranged monster also poisons, label it "venom arrow" instead of "venom bite"
    if (def.poisonChance) {
        const label = def.rangedAny ? 'Venom arrow' : 'Venom bite';
        lines.push(`${label}: ${Math.round(def.poisonChance * 100)}% chance to poison on hit (damage over time)`);
    }
    if (def.webChance)        lines.push(`Web: ${Math.round(def.webChance * 100)}% chance to immobilize target for 1 round`);
    if (def.paralyzingBite)   lines.push(`Paralyzing touch: every melee hit paralyzes the target for ${def.paralyzingBite} rounds; undead, constructs, elementals, incorporeal creatures, and other paralysis-immune targets ignore it`);
    if (def.constrict)        lines.push(`Constrict: 35% chance to coil around the target, pinning it for ${def.constrict} rounds`);
    if (def.stunChance)       lines.push(`Stunning blow: ${Math.round(def.stunChance * 100)}% chance to stun on melee hit`);
    if (def.attackDebuff)     lines.push(`Icy chill: freezing melee strikes reduce the target\u2019s attack power by ${def.attackDebuff} for 2 rounds`);
    if (def.regenPercent)     lines.push(`Regeneration: heals ${Math.round(def.regenPercent * 100)}% max HP at the start of each round`);
    if (def.isStirgeAI || def.isVampireBatAI) {
        const drainName = def.isVampireBatAI ? 'Vampire Bat' : 'Stirge';
        lines.push(`Blood Drain: melee hit heals the ${drainName} for the damage dealt; bleed-immune targets such as undead, constructs, elementals, incorporeal creatures, and plants cannot be drained`);
    }
    if (def.aoeMagic)         lines.push('AoE spell: magic attack hits ALL party members (including back row)');
    if (def.aoeFire)          lines.push('Inferno breath: fire AoE attack — hits all party members, may apply burn');
    if (def.aoePoisonChance)  lines.push(`AoE venom cloud: ${Math.round(def.aoePoisonChance * 100)}% chance per party member to poison`);
    if (def.aoeStunChance)    lines.push(`AoE concussion: ${Math.round(def.aoeStunChance * 100)}% chance per target to stun`);
    if (def.sonic)            lines.push('Sonic Attack: this creature\'s AoE magic/stun effects are sonic; Thunderous Drums can reduce sonic damage and help resist sonic stun effects');
    if (def.aoeStunPsychic)   lines.push('Psychic Attack: this creature\'s AoE stun effect is psychic; psychic immunity applies and Thunderous Drums can help resist it');
    if (def.earthquakeChance) lines.push(`Earthquake: ${Math.round(def.earthquakeChance * 100)}% chance per melee turn to slam the ground — AoE melee hit to ALL party members${def.stunChance ? ` (${Math.round(def.stunChance * 100)}% stun on single-target hits)` : ''}`);
    if (def.aoeDrowning)      lines.push('Surging torrent: AoE magic attack hits ALL party members — survivors suffer drowning damage over 3 rounds and −2 defense for 3 rounds');
    if (def.lifeDrain)        lines.push(`Life drain: steals ${Math.round(def.lifeDrain * 100)}% of damage dealt as HP for itself`);
    if (def.phaseStrike)      lines.push('Phase strike: ignores all armor and defense bonuses on hit');
    if (def.rangedAny)        lines.push('Ranged attack: can strike back-row party members from a distance');

    // Phase 13 new monster abilities
    if (def.isBeholderAI)    lines.push('Eye Beams: fires 6 random eye beams per turn — magic blast AoE, death ray, stun ray, anti-magic debuff, petrify, or slow ray');
    if (def.isDragonAI)      lines.push('Dragon Combat: 50% chance — AoE breath weapon with elemental DoT; 50% — 2 claw attacks + 1 bite attack');
    if (def.halfMagicDamage) lines.push('Magic Resistance: takes only half damage from magical attacks');
    if (def.isEttinAI)       lines.push('Twin Heads: attacks twice per turn (one per head)');
    if (def.isFireGiantAI)   lines.push('Fire Giant: +10 melee bonus, attacks twice, fire DoT on hits (50% damage/round)');
    if (def.isIceGiantAI)    lines.push('Ice Giant: +10 melee bonus, attacks twice, ice DoT on hits (50% damage/round)');
    if (def.isStoneGiantAI)  lines.push('Stone Giant: +10 ranged bonus, throws boulders twice, stunning blows');
    if (def.isStormGiantAI)  lines.push('Storm Giant: +10 magic bonus, lightning bolt strikes 3 random back-row members with possible stun');
    if (def.isMedusaAI)      lines.push('Poison Arrows: looses 3 poison arrows per turn that can hit back row; 50% chance each round to petrify a target (stun 3 rounds + +200 defense)');
    if (def.isHydraAI)       lines.push('Multi-Head: attacks with each head every round (6 base + 1 per 5 dungeon levels); heads count as melee contact attacks but can reach back-row targets; regenerates 15% HP per round');
    if (def.isManticoreAI)   lines.push('Spike Volley: 5 ranged attacks per turn (+3 bonus), can hit back row; poison tail DoT equal to damage dealt');
    if (def.isEvilPriestAI)  lines.push('Dark Ministry: 50% chance to mass-heal all non-undead enemies for 15% HP; 50% chance to unleash AoE magic blast');
    if (def.isWerewolfAI)    lines.push('Lycanthropy: regenerates 25% max HP per round; defense bonus (+50%). A crafted Werewolf Blood Vial can summon a White Werewolf Lord; while alive it empowers allied wolves with +25% HP, +25% damage, +10 defense, and 15% HP regeneration per round.');
    if (def.isYetiAI)        lines.push('Feral Fury: attacks twice with fists each turn, can stun, applies ice DoT on hits. A crafted Yeti Totem can summon a charmed yeti ally for the full fight.');

    // Phase 14: Level-25+ Deep Dungeon monster abilities
    if (def.isIceDemonAI)           lines.push('Glacial Fury: 4 powerful melee strikes per turn with +5 bonus; each hit applies ice chill (30% bonus cold damage, -2 attack for 2 rounds)');
    if (def.isAcidDemonAI)          lines.push('Acid Assault: AoE acid wave hits all party members (magic damage) with acid DoT (25% per round, -2 def, 3 rounds); 50% chance per turn to summon an Acid Slime minion; falls back to melee if out of mana');
    if (def.isBloatDemonAI)         lines.push('Toxic Volley: 6 ranged bile blasts per turn — each hits any party member and immediately applies poison DoT (33% hit damage per round)');
    if (def.isDracolichAI)          lines.push('Undead Dragon: 50% — random elemental breath (fire/acid/lightning/cold/poison) AoE hits all party; 50% — 2 claw attacks + 1 bite to front row; all undead immunities apply');
    if (def.isEvilNecromancerAI)    lines.push('Dark Sorcery: 60% chance — raises 1-3 random undead minions (skeleton, zombie, ghoul, wight, shadow, wraith…); 40% — AoE necrotic magic blast with necrotic poison DoT on all party');
    if (def.isHellHoundAI)          lines.push('Infernal Predator: 50% — burning bite (melee, single front-row target) + fire DoT; 50% — hellfire breath (AoE magic, front row only) + fire DoT on all hit targets');
    if (def.isEvilBerserkerAI)      lines.push('Berserk Frenzy: attacks (dungeon level ÷ 5) times per turn against the front row (+3 melee bonus each); each primary strike independently rolls for level 25+ follow-up attacks — total blow count can be very high at deep dungeon levels; takes only half damage from all non-magic (physical) attacks');

    // Hag abilities
    if (def.hagCurseChance)         lines.push(`Hag's Curse: ${Math.round(def.hagCurseChance * 100)}% chance per turn to hex a random target — reduces all damage dealt (melee/ranged/magic) and defense by level÷8 for several rounds`);

    // Undead hostile enemy abilities
    if (def.isMummyAI)              lines.push('Mummy Rot: every melee strike inflicts Mummy Rot (3 rounds) — completely blocks all healing on the target; immune: undead, constructs, elementals, incorporeal, and necromancers in Lich Form');
    if (def.isRevenantAI)           lines.push('Death Denied: phase-strikes any party member (ignores armor); when first reduced to 0 HP, rises again at 50% HP in a permanent ENRAGED state (+damage for rest of combat)');
    if (def.isBoneArcherAI)         lines.push('Bone Arrow: ranged attack hits any row; at dungeon level 15+, fires a 3-arrow volley per turn; 25% chance per arrow to inflict Fracture (bleed DoT: 30% arrow damage per round)');
    if (def.isPoltergeistAI)        lines.push('Spectral Assault: 50% hurls invisible debris (ranged, 40% stun chance); 50% phase-strikes any party member through armor (ignores all defenses and armor)');
    if (def.isZombieGiantAI)        lines.push('Thunderous Stomp: AoE melee strike at 150% damage to all front-row members — 50% chance per target to knock them Prone (cannot act next round)');
    if (def.isDeathKnightAI)        lines.push('Dark Blade: attacks twice per turn with +2 bonus; 25% chance to block non-magic attacks with shield; 30% chance per turn to inflict Necrotic Curse (reduces all damage dealt for 2 rounds)');

    // Bestiary Expansion — Demons
    if (def.isSuccubusAI)           lines.push('Drain Kiss: ranged magic attack on any party member — drains mana equal to damage dealt; 35% chance to Charm the target (psychic effect; cannot act 1 round; Thunderous Drums can help resist); below 50% HP switches to AoE Psychic Shriek hitting all party members');
    if (def.isChainDevilAI)         lines.push('Animated Chains: lashes 2 chain attacks per turn (3 at dungeon level 30+) at any party member; 50% chance per hit to Bind the target in chains (webbed, cannot act for ' + (typeof WEB_DURATION_ROUNDS !== 'undefined' ? WEB_DURATION_ROUNDS : 2) + ' rounds)');
    if (def.isBloodDemonAI)         lines.push('Blood Frenzy: powerful front-row melee +2 bonus; life-steals 40% of damage dealt as HP; on any kill — fully heals to max HP AND gains +2 permanent damage bonus for the rest of combat (stacks)');
    if (def.isPitFiendAI)           lines.push('Hellfire Pillar: 50% chance per turn — calls down an infernal pillar of fire on the ENTIRE party (AoE magic + burn DoT); otherwise delivers 3 crushing melee strikes (+5 bonus) to the front row');
    if (def.isQuasitAI)             lines.push('Venom Swarm: 5 rapid ranged attacks per turn at 60% damage each — ANY party member; every hit injects Quasit Venom (DoT = damage dealt per round, duration = dungeon level ÷ 4) which IGNORES armor on each subsequent tick');

    // Bestiary Expansion — Beasts
    if (def.isGiantCrocodileAI)     lines.push('Death Roll: powerful bite at front row (+2 bonus); if the bite connects — immediately follows with a Death Roll that holds the target in its jaws for 2 rounds AND applies a bleed DoT (30% bite damage per round)');
    if (def.isChimeraAI)            lines.push('Triple Assault: attacks with ALL THREE heads every round simultaneously — Lion Claws (2 melee hits on front row, each opens a bleed DoT equal to damage dealt); Goat Horns (single massive melee hit at 150% damage with stun attempt); Dragon Breath (fire AoE magic hitting the ENTIRE party with burn DoT)');
    if (def.isWyvernAI)             lines.push('Aerial Predator: each turn delivers all of — Claw (front-row melee); Poison Sting (ranged, any target, double-strength venom DoT); and 25% chance of a Dive-Bomb melee strike on a back-row target normally safe from melee');
    if (def.isDisplacerBeastAI)     lines.push('Displacement: illusory doubles grant a permanent 40% dodge chance against ALL melee and ranged physical attacks — this dodge never deactivates and cannot be disabled');
    if (def.isRemorhazAI)           lines.push('Searing Hide: 30% chance — any physical attack on this creature burns the attacker (fire DoT equal to a fraction of the attacker\'s damage); takes only half damage from magic; immune to fire and cold');
    if (def.isThunderbirdAI)        lines.push('Storm Strike: 2 ranged lightning attacks per turn; 35% chance each bolt chains to an adjacent party member for half damage; every 3rd round unleashes a Thunderclap AoE against the front row (25% stun chance per target)');
    if (def.isRustMonsterAI)        lines.push('Corrosive Touch: on any hit against a target wearing Chainmail or Plate Mail — permanently corrodes the armor (defense penalty = rust monster level − 5, lasts the entire combat); this debuff cannot be removed by Cleric or any cleansing ability');

    // Slime variants
    if (def.isGreyOozeAI)           lines.push('Grey Ooze: unleashes 3 corrosive pseudopod strikes each turn; hits apply mild acid dissolve and can partially engulf targets');
    if (def.isBlackPuddingAI)       lines.push('Black Pudding: sweeps the whole front line with caustic sludge (acid dissolve) and can split off a Grey Ooze');
    if (def.isOchreJellyAI)         lines.push('Ochre Jelly: lashes sticky tendrils at any row with adhesive acid; can glue targets in place for multiple rounds');

    // Bestiary Expansion — Humanoids
    if (def.isWitchDoctorAI)        lines.push('Dark Rituals: each turn rolls one of four spells — Hex (reduces target defense for 2 rounds); Wither (reduces target\'s ALL damage output by level÷4 for level÷4 rounds); Plague (AoE poison DoT on whole party); Soul Siphon (tears 20% of target\'s MAX HP from current HP ignoring armor, adds that HP to witch doctor\'s current and maximum HP); spawns with only 50% normal HP');
    if (def.isGladiatorAI)          lines.push('Arena Master: 2 melee attacks per turn (+2 bonus); 30% chance to Taunt the entire party (reduces all damage dealt for 1 round); 40% chance — any target it strikes retaliates for 50% of the damage received back at the gladiator; high base defense');
    if (def.isAssassinLordAI)       lines.push('Shadow Strike: on its first turn, phase-strikes the lowest-HP party member for 3× damage (ignores all armor and defenses); thereafter attacks twice per turn (+3 bonus) with 30% bleed chance on hits; 25% dodge chance vs all physical attacks');
    if (def.isBattleMageAI)         lines.push('Arcane Warrior: alternates — odd turns deliver 2 melee strikes (+20% arcane bonus); even turns unleash an AoE magic blast on the whole party; below 50% HP enters Arcane Overload — performs BOTH attacks in one turn but takes 15% max HP backlash damage');

    // Bestiary Expansion — Constructs
    if (def.isIronGolemAI)          lines.push('Iron Juggernaut: single devastating melee strike (+25 bonus); 50% chance each round to exhale Poison Gas (can occur the same round as melee — poison DoT on ALL party members); takes only half magic damage; triple HP, double defense');
    if (def.isClockworkHorrorAI)    lines.push('Mechanical Fury: 3 rapid melee strikes per turn (75% damage each) at any party member; FULLY IMMUNE to all magic, AoE, DoT effects, and weapon riders — spells, fire, poison, lightning, ice and all elemental damage deal zero; EXCEPTION: acid weapon rider still procs and acid DoT deals DOUBLE damage — corroded gears are the one vulnerability');
    if (def.isGargoyleSentinelAI)   lines.push('Stone Shell — Phase 1: while above 50% HP takes only 50% damage from ALL sources; regenerates 10% HP per round; Phase 2 (≤50% HP): shell cracks — loses damage reduction, gains +5 melee bonus AND adds AoE Wing Buffet (front-row melee AoE with stun attempt each target)');
    if (def.fullMagicImmune && !def.isGargoyleSentinelAI) lines.push('Total Magic Immunity: completely unaffected by all magical attacks, AoE, and damage-over-time effects');

    // Bestiary Expansion — Aberrations
    if (def.isGibberingMoutherAI)   lines.push('Gibbering Madness: attacks ALL front-row members each turn (individual rolls per target at 75% damage); 30% chance per hit — target is driven to psychic madness (cannot act 1 round; psychic immunity applies and Thunderous Drums can help resist); at 50% HP the original form splits into 2 smaller copies (each with 30% of original HP) — only the original can split');
    if (def.isAbolethAI)            lines.push('Psychic Domination: AoE psychic assault hits ALL party members; 40% chance per target to mentally enslave them (psychic effect; cannot act for dungeon level ÷ 10 rounds; Thunderous Drums can help resist); takes only half damage from physical attacks; Water Elemental Synergy: if a water elemental is present in the same combat, both the aboleth AND the elemental deal +25% damage');
    if (def.isStarSpawnAI)          lines.push('Reality Distortion: each turn applies a random eldritch effect to EVERY party member independently — 35% magic damage, 20% mana drain (20% max mana), 20% Wither debuff (−damage 2 rds), 25% stun attempt; completely immune to all DoT effects (poison, burn, acid, bleed, etc.)');
    if (def.isRoperAI)              lines.push('Grasping Tentacles: lashes 6 ranged tentacle attacks per turn at any party member; each hit can weaken muscles (melee damage reduced by roper level for level÷10 rounds) and has a 50% chance to paralyze for the same duration. After lashing, bites a front-row target for 150% melee damage and coats the wound in acid DoT (50% of bite damage per round for level÷6 rounds)');

    // Bestiary Expansion — Mixed
    if (def.isVampireLordAI)        lines.push('Vampire Lord: 40% life drain on melee hits; summons Vampire Spawn (40% per turn); AoE Hypnotic Gaze is a psychic charm effect that charms 1-2 party members for 2 rounds (20% per turn; Thunderous Drums can help resist); when HP drops below 15% dissolves into Gaseous Form (takes only 1 damage from all sources, regenerates 10% HP per round for 2 rounds, then re-solidifies); Paladin Smite deals triple bonus damage');
    if (def.isMyconidSovereignAI)   lines.push('Spore Sovereign: every turn blasts the ENTIRE party with toxic spore cloud (AoE magic + 40% poison DoT); 60% chance per turn to spawn 1-2 Myconid minions; higher HP, defense, and minimum dungeon level than standard Myconid');

    // New Monsters
    if (def.mandrakeScream)         lines.push('Retributive Scream: whenever this creature takes non-reflected damage it unleashes a piercing sonic scream — AoE magic sonic blast hits the ENTIRE party using the Mandrake Root’s own monster magic damage scaling (triggers on every direct hit, including AoE; Thunderous Drums can reduce the sonic damage)');
    if (def.isDarkTreantAI)         lines.push('Branch Barrage: lashes out with 4 powerful branch strikes per turn against random front-row targets; each hit has a 35% chance to hold the target in grasping bark for 2 rounds');
    if (def.isMandrakeRootAI)       lines.push('Gnarled Strike: single melee attack with twisted root fists; see Retributive Scream above — every non-reflected hit taken triggers an AoE sonic counter-blast');
    if (def.isKillerVineAI)         lines.push('Vine Grasp: extends crushing vines to ensnare up to (dungeon level ÷ 6) targets simultaneously — each grappled target takes thorn and constriction melee damage with a 45% chance per target to be held fast for 2 rounds');
    if (def.isCaveBearAI)           lines.push('Bear Assault: attacks with 2 savage claw rakes followed by 1 powerful bite — all 3 strikes target the front row');
    if (def.isCaveLionAI)           lines.push('Lion Assault: delivers 2 claw swipes followed by 1 fierce bite — all 3 strikes target the front row');
    if (def.isWinterWolfAI)         lines.push('Frost Predator: bites a front-row target each turn; 50% chance to follow up with an AoE cold breath that hits the ENTIRE party (magic damage) and inflicts a frost DoT (50% of breath damage per round for 3 rounds)');
    if (def.isLizardFolkAI)         lines.push('Scaled Warrior: single melee attack per turn with 25% shield block — deflects any non-magic attack');
    if (def.isDreadCultistAI)       lines.push('Abyssal Rites: unleashes AoE dark magic blast hitting the ENTIRE party each turn; 50% chance per turn to tear open a rift and summon a random demon into the fight');

    return lines;
}

export class LoreBook {
    constructor() {
        this.isOpen = false;
        this._pages = [];   // array of type keys in sorted order
        this._pageIdx = 0;
        this._discovered = new Set();
        this._el = null;
        this._build();
    }

    _build() {
        const overlay = document.createElement('div');
        overlay.id = 'lore-book-overlay';
        overlay.style.cssText = `
            display:none; position:fixed; inset:0; z-index:9000;
            background:rgba(0,0,0,0.75); align-items:center; justify-content:center;
        `;

        const book = document.createElement('div');
        book.style.cssText = `
            position:relative; background:#1a140e; border:2px solid #6b4a1e;
            border-radius:8px; width:min(520px,96vw); max-height:90vh;
            display:flex; flex-direction:column; box-shadow:0 0 40px #000a;
            font-family:'Segoe UI',sans-serif; color:#e0d5c0; overflow:hidden;
        `;

        // Header
        const header = document.createElement('div');
        header.style.cssText = `
            background:#2a1c0e; border-bottom:1px solid #6b4a1e; padding:12px 16px;
            display:flex; align-items:center; justify-content:space-between; flex-shrink:0;
        `;
        const title = document.createElement('div');
        title.textContent = '📖 Lore Book';
        title.style.cssText = 'font-size:18px; font-weight:bold; color:#f5d98a;';

        this._pageCounter = document.createElement('div');
        this._pageCounter.style.cssText = 'font-size:12px; color:#a09070;';

        const closeBtn = document.createElement('button');
        closeBtn.textContent = '✕';
        closeBtn.style.cssText = `
            background:none; border:1px solid #6b4a1e; color:#e0d5c0; cursor:pointer;
            padding:2px 8px; border-radius:4px; font-size:14px;
        `;
        closeBtn.addEventListener('click', () => this.hide());
        header.appendChild(title);
        header.appendChild(this._pageCounter);
        header.appendChild(closeBtn);

        // Body
        this._body = document.createElement('div');
        this._body.style.cssText = `
            flex:1; overflow-y:auto; padding:20px;
            scrollbar-color:#6b4a1e #1a140e;
        `;

        // Navigation footer
        const nav = document.createElement('div');
        nav.style.cssText = `
            background:#2a1c0e; border-top:1px solid #6b4a1e; padding:10px 16px;
            display:flex; align-items:center; justify-content:space-between; flex-shrink:0;
        `;

        this._prevBtn = document.createElement('button');
        this._prevBtn.textContent = '← Prev';
        this._prevBtn.style.cssText = `
            background:#3a2810; border:1px solid #6b4a1e; color:#e0d5c0; cursor:pointer;
            padding:6px 14px; border-radius:4px; font-size:13px;
        `;
        this._prevBtn.addEventListener('click', () => this._navigate(-1));

        this._nextBtn = document.createElement('button');
        this._nextBtn.textContent = 'Next →';
        this._nextBtn.style.cssText = `
            background:#3a2810; border:1px solid #6b4a1e; color:#e0d5c0; cursor:pointer;
            padding:6px 14px; border-radius:4px; font-size:13px;
        `;
        this._nextBtn.addEventListener('click', () => this._navigate(1));

        this._navLabel = document.createElement('div');
        this._navLabel.style.cssText = 'font-size:13px; color:#c0a86a; text-align:center; flex:1; padding:0 12px;';

        nav.appendChild(this._prevBtn);
        nav.appendChild(this._navLabel);
        nav.appendChild(this._nextBtn);

        book.appendChild(header);
        book.appendChild(this._body);
        book.appendChild(nav);
        overlay.appendChild(book);
        document.body.appendChild(overlay);

        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) this.hide();
        });

        // Arrow key navigation
        this._keyHandler = (e) => {
            if (!this.isOpen) return;
            if (e.key === 'ArrowLeft')  this._navigate(-1);
            if (e.key === 'ArrowRight') this._navigate(1);
            if (e.key === 'Escape')     this.hide();
        };
        window.addEventListener('keydown', this._keyHandler);

        this._el = overlay;
    }

    show(discoveredSet) {
        this._discovered = discoveredSet || new Set();

        // Build sorted page list from discovered monsters, preserving ENEMY_TYPES order
        this._pages = Object.keys(ENEMY_TYPES).filter(k => this._discovered.has(k));

        if (this._pages.length === 0) {
            this._pages = [];
            this._body.innerHTML = `
                <div style="text-align:center;padding:40px;color:#a09070;font-size:15px;">
                    No monsters encountered yet.<br>
                    <span style="font-size:12px;">Explore the dungeon to fill the Lore Book.</span>
                </div>`;
            this._pageCounter.textContent = '';
            this._prevBtn.disabled = true;
            this._nextBtn.disabled = true;
            this._navLabel.textContent = '';
            this._el.style.display = 'flex';
            this.isOpen = true;
            return;
        }

        this._pageIdx = 0;
        this._render();
        this._el.style.display = 'flex';
        this.isOpen = true;
    }

    hide() {
        this._el.style.display = 'none';
        this.isOpen = false;
    }

    _navigate(dir) {
        if (!this._pages.length) return;
        this._pageIdx = (this._pageIdx + dir + this._pages.length) % this._pages.length;
        this._render();
    }

    _render() {
        const key = this._pages[this._pageIdx];
        const def = ENEMY_TYPES[key];
        if (!def) return;

        const total = this._pages.length;
        const idx = this._pageIdx;
        this._pageCounter.textContent = `${idx + 1} / ${total}`;
        this._prevBtn.disabled = total <= 1;
        this._nextBtn.disabled = total <= 1;
        this._navLabel.textContent = total > 1 ? def.name : '';

        // Tags
        const tags = def.tags || [];
        const tagHtml = tags.map(t => {
            const info = TAG_INFO[t] || { label: t, color: '#808080' };
            return `<span style="background:${info.color}22;border:1px solid ${info.color}88;color:${info.color};
                padding:2px 8px;border-radius:3px;font-size:11px;margin-right:4px;">${info.label}</span>`;
        }).join('');

        // Special abilities
        const abilities = buildAbilityList(def);
        const abilityHtml = abilities.length
            ? abilities.map(a => `<li style="margin-bottom:4px;">${a}</li>`).join('')
            : '<li style="color:#806050;">No special abilities</li>';

        // All monsters spawn on all dungeon levels
        const maxLvl = 'Spawns on all dungeon levels';

        // Sprite
        const spriteCanvas = generateEnemySprite(key, 42);
        spriteCanvas.style.cssText = `
            width:96px; height:96px; image-rendering:pixelated;
            border:1px solid #6b4a1e; border-radius:4px; background:#0a0806;
        `;

        this._body.innerHTML = '';

        // Top row: sprite + name/tags
        const topRow = document.createElement('div');
        topRow.style.cssText = 'display:flex; gap:16px; align-items:flex-start; margin-bottom:16px;';

        const spriteWrap = document.createElement('div');
        spriteWrap.style.cssText = 'flex-shrink:0;';
        spriteWrap.appendChild(spriteCanvas);

        const infoBlock = document.createElement('div');
        infoBlock.style.cssText = 'flex:1;';
        infoBlock.innerHTML = `
            <div style="font-size:22px; font-weight:bold; color:#f5d98a; margin-bottom:6px;">${def.name}</div>
            <div style="margin-bottom:8px;">${tagHtml || '<span style="color:#806050;font-size:12px;">No tags</span>'}</div>
            <div style="font-size:12px; color:#a09070;">${maxLvl}</div>
        `;

        topRow.appendChild(spriteWrap);
        topRow.appendChild(infoBlock);
        this._body.appendChild(topRow);

        // Divider
        const divider = document.createElement('div');
        divider.style.cssText = 'height:1px; background:#3a2810; margin-bottom:14px;';
        this._body.appendChild(divider);

        // Abilities section
        const abSection = document.createElement('div');
        abSection.innerHTML = `
            <div style="font-size:13px; font-weight:bold; color:#c8a860; margin-bottom:8px; text-transform:uppercase; letter-spacing:1px;">Special Abilities</div>
            <ul style="margin:0; padding-left:20px; font-size:13px; color:#c0b090; line-height:1.7;">
                ${abilityHtml}
            </ul>
        `;
        this._body.appendChild(abSection);
    }
}
