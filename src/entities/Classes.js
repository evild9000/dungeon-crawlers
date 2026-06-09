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
    PALADIN_SMITE_MANA_COST,
    PALADIN_HEAL_MANA_COST,
    BARBARIAN_MELEE_PER_LEVEL,
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
        description: 'Front-line tank. +50% HP, +50% ST, no mana. +1 melee, +1 HP/ST regen. Any armor + shield. Per level: +1 melee, +1 defense, +3% melee stun chance. +1 extra melee swing every 5 levels (L5, L10, L15…) — each swing pays stamina independently. L20: Stun Resistance (30% at L20, +1% per 2 levels); Defend Mode — toggle to add +1%/3 levels to shield block, intercept ally attacks at augmented block chance (20% damage pass-through), attacks disabled while active. L25: Retaliatory Strike — successful intercepts have a 25% + (level/2)% chance to hit back for 75% melee damage. L30: Summon Squire(s) — once per combat, spend 10 ST to summon 1/2/3 front-row warrior squires (at L30/60/90) with 66% of your HP, stamina, melee, and defense; each makes 1 attack per 15 levels per round, and has a 25% chance to block any incoming attack outright. L30: Formation (FREE toggle, costs 10 ST/round each) — warrior and squires fight in formation; with ≥2 members deals +100% + 15%/member damage to all formation attacks, with a formation crit chance; while in both Defend Mode and Formation, squires gain opportunity attacks after each retaliatory strike. L35: Shield Riposte — personal shield blocks can also trigger Retaliatory Strike, and formation squires can make opportunity strikes from those retaliation chains. L35: Formation Shield Wall — level 35+ real warriors contribute, and each counts their own active formation squires; each contributor adds floor(average contributor level/17) to all formation members as defense and the same percent to shield block, defense-mode intercept, defense-mode retaliation, squire opportunity strikes, and formation crit. L35: Taunt — free toggle, 1 ST/round; taunting warriors are checked highest HP first to draw single-target melee, ranged, or magic attacks at level% chance (+10% in Defend Mode), and the redirected attack suffers -level/6 attack (-level/4 in Defend Mode).',
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
        description: 'Skilled bowman. +25% HP/ST, -50% mana. +1 ranged, +1 HP/ST regen. Cloth/leather/chain armor (no plate). Shields OK — but equipping a ranged weapon auto-unequips a shield. Per level: +1 ranged, +3% ranged crit. Normal ranged attacks fire 1 + floor(level/5) arrows (L5 = 2, L10 = 3, etc.); Wolf Totem adds +1 more arrow. Each shot pays stamina and rolls its own crit. Ranger crits deal normal 2× damage, then +level×2% more damage; this stacks with Favored Enemy damage. Summon Woodland Beast (7 MP): wolf, bear, eagle, or pixie. Choose a Favored Enemy: ignore its defense, deal +level×2% ranged damage, and gain 1%/3 levels instakill chance (bosses/mega-bosses are immune to instant death; triggered procs deal x4 ranged damage instead). L20: Explosive Arrow (6 ST) — one arrow detonates among ALL enemies for half post-defense damage each, half crit chance, half instakill vs favored (boss/mega-boss procs convert to x4 damage instead of instant death). L20+: unlock extra Favored Enemy slots every 5 levels (+1 at L20, +2 at L25, etc.). L25: Animal Totem — free combat stance costing 5 MP/round; Wolf adds bleed and +1 extra ranged attack each round, Bear adds stun/defense, Eagle adds damage and ranged deflection (checked before warrior/shambling intercept), Pixie adds poison and magic/AoE resistance. L30: Hunter\'s Mark — stamina and mana upkeep each round; marked target takes +10% damage. L30: Beastlord — free toggle (5 MP/round) that auto-summons woodland beasts each round. L35: Beast Mastery (passive) — bond with a permanent beast companion out of combat [P key]; select from 7 types (Dire Wolf, Cave Bear, Roc, Sabre Tooth Cat, Mega-conda, Megaloceros, Sasquatch); beast stats scale with ranger level (HP = ranger maxHP × 1.5, ATK/DEF = level × 3, damage +ranger level%); if the beast dies, revive it for level × 100 gold. Changing companion type is always free. L35: Ricochet Shot (passive) — every normal ranged arrow from the 1 + floor(level/5) arrow sequence (plus Wolf Totem arrow, if active) can start its own ricochet chain against other enemies; the chain chance starts at 75% and drops by 10% after each successful ricochet (75%, 65%, 55%, 45%, 35%, 25%, 15%, 5%), stopping on the first failure. Each ricochet costs 1 MP, rerolls fresh ranged damage against its target at 50% damage, can crit at normal crit chance, can instakill favored enemies at 50% of normal chance, and applies weapon riders and totem effects; does NOT apply to Explosive Arrows. Crafted Manticore Ballista (Artificer L35) is a ranger/artificer ranged weapon with +7 ranged, +5% crit chance, +15% critical damage, +5% per Ricochet cascade step, +2 Scatter Shot targets, and prone on core ranged/scatter targets.',
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
        description: 'Arcane caster. -25% HP/ST, +50% mana. +1 magic, +2 MP regen. Cloth armor only; cannot use shields. Per level: +1 magic, +1% chance to stun foes with magic, and +1% magic/AoE defense penetration (ignores enemy defense by mage level%). L20: Mirror Image (35 MP) — summons floor(level/7) illusory duplicates; each absorbs one incoming hit. AoE magic attacks gain a 1%/2-mage-levels crit chance for ×2 + mage-level% bonus damage. L25: Summon Familiar outside combat with F; the familiar levels up to mage level - 24, costs 10,000 gold per new level, and grants +10% magic/AoE damage plus +1 defense per familiar level. L30: Arcane Overload (passive) — after any magic attack, there is a (40% + mage level%) chance for a cascading overload burst hitting all enemies again; each successive burst reduces the chance by 15%, multiplies the mana cost by ×1.5, and is capped at floor(mage level/6) total bursts. L30: Elemental Rift (free action, once per combat) — tears open a dimensional rift costing 100 MP initially + 10 MP/round; each round there is a (20 + mage level)% chance to summon a level-appropriate elemental to fight for the party (multiple elementals can accumulate); the rift closes when dismissed or mana runs out. L35: Mana Shield (free action, 1/combat, 50 MP) — grants temporary HP equal to the mage\'s max mana; this pool is checked as the final step before HP damage and absorbs all incoming damage first, with overflow spilling into normal HP. L35: Death Burst (passive) — when the mage dies, all enemies not immune to magic are blasted for max mana × (2 + level × 2%). Crafted Hag Eye Rod (Artificer L35) equips in the off hand for mages, grants +7 magic and +15% max mana, adds +5% magic AoE crit chance, adds +1 Mirror Image, and empowers rift/device elementals with +15% HP/damage and +5 defense.',
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
        description: 'Stealthy striker. +100% ST, no mana. +1 melee, +2 ST regen. Cloth or leather armor. Backstab: 3× stamina for 2× damage + 10% damage per rogue level + 5% instakill (+1%/level). Can melee from back row. Rogues also spot and disarm traps. Per level: +1 melee, +1% backstab instakill, +10% backstab damage. L20: Backstab Bleed — every backstab passively applies a bleed DoT for 50% of damage dealt per round, lasting floor(level/5) rounds. L25: successful disarms recover Captured Traps for combat AoE melee damage and trap-wound DoT; also gains level% chance to evade magic/AoE attacks for 2 stamina. Bleed/trap immunities include incorporeal creatures. L30: Twin Fangs — equip a second melee weapon for an offhand follow-up strike on every Backstab (1.5× fresh offhand roll, half instakill). L30: Shadow Step — vanish for 2 rounds (untargetable); Backstab deals ×2 damage while active. L35: Trap Mastery (passive) — trap damage is doubled (×4 total), DoT lasts +2 rounds, and every DoT tick triggers one random effect: stun, hold, −floor(level/4) attack, or −floor(level/4) defense. Normal stun/hold resistances apply. L35: Extra Loot (passive) — each living L35+ rogue adds +(100% + rogue level%) gold from combat, magical chests, and trap-disarm treasure caches; multiple rogues are additive.',
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
        description: 'Martial artist. Balanced stats (no bonuses/penalties). +1 melee, +1 ST/MP regen. Cloth armor only; cannot use shields. Melee costs both ST & MP; 50% whirlwind hits each other foe; 33% dodge (2 ST + 2 MP). Per level: +1 melee, +1% whirlwind, +1% dodge. L20: Quivering Palm — strike for 2× melee damage and plant a multiplying internal DoT (starts at base roll, bypasses defense) lasting 2+ rounds. L25: Avatar — free toggle costing 10 MP/round; regenerates 10% HP/round, can shrug harmful effects, and adds a chosen elemental DoT to landed non-Quivering attacks. L35: Kick Trip — heavy rapid kicks that can crit, stun, and knock prone as a hold-style trip. L35: Explosive Palm — spend 20 MP to detonate your own Quivering Palm at 3+ doublings, ending the stack and blasting other enemies.',
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
        description: 'Holy healer. +25% HP, -50% ST, +25% mana. Any armor + shield. Heal: 5 MP to restore 25% of target max HP (+2% per level). L20: Mass Regen (15 MP) — HoT on all living allies healing ~10%+/round for 5+ rounds. L20: Mass Revive (30 MP) — revives floor(level/7) fallen allies at 33%+ HP. L25: Heal and Mass Heal have a level×2% chance to purge harmful states; each state removed costs 3 extra mana. L30: Spiritual Weapon and Banishment. L35: Banishment becomes AOE Banish, affecting all demon/elemental targets and adding cleric level% damage. L35: Divine Shroud costs 15 MP/round, reduces all damage including DoTs by level/2%, and can auto-revive the cleric at 50% HP. Crafted Holy Symbol of Potent Power (Artificer L35, Cleric 25+) grants +7 magic/+7 defense, triples Turn Undead damage, strengthens undead debuffs, and improves Mass Heal cleanse, Mass Revive, Banishment, and Divine Shroud.',
    },
    necromancer: {
        id: 'necromancer',
        name: 'Necromancer',
        icon: '\u{1F480}',
        hpMod: -0.25, stMod: -0.5, mpMod: 0.75,
        regenHp: 0, regenSt: 0, regenMp: 0,
        meleeBonus: 0, rangedBonus: 0, magicBonus: 0,
        defenseBonus: 0,
        armorAllowed: ['cloth'],
        canUseShield: false, // Rule 8
        drainPerLevel: NECRO_DRAIN_PER_LEVEL,
        special: 'summon',
        description: 'Dark caster. -25% HP, -50% ST, +75% mana. Cloth armor only; cannot use shields. Summon undead (7 MP, combat only) — L1 Skeleton, then Zombie / Ghoul / Spectre / Mummy / Ghost / Vampire / Death Knight unlocked at odd levels. Life Drain (25% per enemy hit by magic) heals that necromancer\'s own undead for 5% + level/2% of each undead minion\'s max HP. L20: Lich Form — transforms into a lich with a phial as a life-anchor; on death the soul retreats into the phial for 3 rounds then revives at 50%+ HP. Lich Form grants resistance to magic/AoE, immunity to poison/stun/paralysis/mummy rot, lets you summon a Demi-Lich (20 MP), and Life Drain also heals the lich-form necromancer for 5% of the magic damage dealt by that hit. L25: while in Lich Form, summon a Demi-Lich for 20 MP — back-row undead caster with defense-ignoring AoE magic, Ghost Fear, half magic/AoE damage, and immunity to stun/web/holds/poison. L30: Dark Apotheosis — unleash two powers. Corpse Horror: the entire party shares ONE Corpse Horror; every enemy killed during combat (by anyone) feeds the single horror; its HP, defense, and offense scale with total corpse count without limit, while attacks/round cap at necromancer level. Plague Bringer (35 MP): infect all living enemies with a necromantic plague — each infected enemy\'s damage ticks spread to adjacent enemies; undead are immune. L35: Control the Dead (50 MP) dominates one undead enemy using bard-style charm chance and duration while bypassing undead charm immunity (bosses remain immune). L35: Siphon Power is passive — necromancer magic attacks fold the old Siphon Power into Life Drain, draining each vulnerable enemy hit for level/2 to level×2 ST and MP; undead, constructs, elementals, and drain-immune enemies are immune. Crafted Staff of Necromancy (Artificer L35) reduces Lich Phial return to 2 rounds, gives summoned undead +25% damage, increases necromancer magic/AoE damage by 50%, doubles life-drain healing to controlled undead, and adds +5% to Control the Dead.',
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
        description: 'Inspiring minstrel. -20% ST, +20% mana. Cloth/leather/chain armor (no plate). Can use shields. Sing a song (7 MP, once per combat): party-wide +2 defense and +2 melee/ranged/magic damage — does NOT affect golems or summoned undead. Bonus rises by +1 at levels 3, 5, 7… Per level: +1 magic damage. L20: Charm Monster (50 MP) — attempt to charm a single enemy to fight for the party (50% base + 1% per 2 bard levels, max 95%; 4 rounds at L20). Undead, elementals, constructs, and plants are immune; bosses and mega-bosses always resist. Charmed monsters fight on your side and can be healed (except undead/constructs). L25: Rallying Melody (40 MP) — restores 10% HP, mana, and stamina to all living party members except the casting bard (another bard\'s melody still heals you); does NOT affect golems or summoned undead; each additional bard in the party beyond the first adds +1% to the restore fraction, up to 15% maximum. L30: Thunderous Drums (10 MP/round toggle) — the bard beats war drums that weaken all incoming sonic and psychic attacks; reduction scales with level, up to 80% maximum. L30: Symphony of Destruction (once per combat, channeled) — each round the symphony deals escalating AoE damage to ALL enemies; cost starts at 10 MP + 10 ST and doubles each round; simultaneous active symphonies multiply each bard\'s Symphony damage by 1.5^(active bards - 1); keep channeling until you run out of resources or choose to stop. L35: Quickstep Song (100 MP) — grants haste to all qualifying party members for the entire combat; each hasted member makes 1 bonus attack per turn matching their attack type (melee/ranged/magic). Affects all real party members plus summoned beasts (ranger/druid/VK) and warlock demons; also benefits barbarian rage attacks, druid wildshape summons, and warlock tentacle strikes. Does NOT affect AoE abilities, backstab, explosive arrows, golems, undead summons, spiritual weapons, or illusionary warriors. Newly summoned qualifying allies automatically gain haste each round. L35: Soulful Melody (passive reaction, 20 MP) — triggers automatically when any party member dies; the bard with the most mana (who is L35+, not in Symphony, and has 20+ MP) immediately plays a memorial anthem granting all survivors +floor(bardLevel/4) attack and defense for 3 rounds, shown on HUD cards. Stacks with each additional fallen ally: +1 atk, +1 def, +1 round per death. Triggers once per fallen ally per combat. Crafted Instrument of the Bards (Artificer L35, Bard 35+) replaces the main hand with +7 magic/+7 defense, triples Disrupt damage, doubles Symphony damage, improves Melody/Song/Drums, and adds +15% regular magic attack damage.',
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
        description: 'Inventor & golem-smith. +50% ST, -50% mana. +1 ranged, +2 ST regen. Cloth/leather only; no shields. Scatter Shot: ranged hit spreads to 2 splash targets at (50%+level)% damage, capped at 100% (+1 splash every 5 levels), each with its own crit. Press [K] to craft: enchant weapons/armor, brew healing and mana potions, scribe party-wide Scrolls of Warding/Wrath, build permanent golems, and create L35 magic items. Repairing a golem has artificer level × 2% chance to cost no reagent. Per level: +1 ranged. L25: Advanced Augments — add separate vitality augments (+5/10/15/20% max HP/ST/MP) and regen augments (+1/2/3/4% max HP/ST/MP per combat round and per exploration minute) to level 4+ trinkets, add Dragon Hide armor augments, and install golem attachments: extra limbs, golem shields, and golem trinkets. L25: Enchanted Drone — each scatter splash has a (level)% chance (cap 75%) to spawn a drone with random support or offense effects. L25: Deconstruct (passive) — Scatter Shot gains +20% + level/2% crit chance against constructs and deals ×3 armor-ignoring bonus damage; 50% chance per hit to scavenge parts and repair your own golem(s) for 5% max HP. L30: Golem Berserk Mode (free action, once per golem per combat) — overclock one golem or all eligible owned golems to deal ×(1 + artificer level × 2%) damage; each berserk golem takes 2% of its current HP as self-damage each round and auto-disengages at 10% max HP. Turning berserk off marks that golem\'s charge used for the combat. L30: Multi Golem Protocol — maintain up to 2 simultaneous golems (3 at L50, 4 at L70, 5 at L90). L35: Magic Items — craft Mismatched Golem, elemental devices, Girdle of Giant Strength, Staff of Necromancy, Eldritch Amulet, Hag Eye Rod, Lance of the Dragon King, Sash of the Vermin Keeper, Staff of the World Tree, Manticore Ballista, Instrument of the Bards, Yeti Totem, Werewolf Blood Vial, and Holy Symbol of Potent Power from monster materials; the Displacer Beast Hide recipe now adds Cloak of Displacement from the Trinkets tab to an equipped cloak. Charged devices hold 10 charges and regain 1 charge per real-life hour. L35: Dual Drone (passive) — when a splash procs a drone, roll one extra drone proc at the same chance. L35: Sabotage (passive) — each construct hit adds sabotage counters, a stacking permanent defense debuff of level/10, and a stacking malfunction DoT for 50% of the hit over 3 rounds; each counter rolls a (level/33)% instant-destroy check immediately (bosses/mega-bosses/super-bosses immune to the instant destroy). Sabotage detonations blast other enemies for level/3% of remaining construct HP and fully repair your own golems.',
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
        description: `Holy warrior. +20% HP, -20% mana. +1 melee, +1 HP regen. Any armor + shield. Heal: ${PALADIN_HEAL_MANA_COST} MP restores 12.5% of target max HP (+1%/level — half cleric strength). Smite (${PALADIN_SMITE_MANA_COST} MP): armor-ignoring melee with a 1%/level purge chance against undead and demon foes. Per level: +1 melee, +1 defense. Extra attack every 7 levels. L20: Revive and AoE Smite. L25: Dragonslayer. L30: Aura of Righteousness and Divine Judgment. L35: Summon Steed (once/combat, mounted melee/HP/Smite crits and half melee damage) and Martyr’s Covenant (toggle, redirects grievous single hits from recruited living allies to the paladin). Crafted Lance of the Dragon King (Artificer L35) gives Smite/AoE Smite +50% damage and adds +10% more damage against dragon-tagged monsters while Dragonslayer is active.`,
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
        description: 'Nature caster. -15% HP/ST, +30% mana. Cloth/leather armor only (no chain or plate). Entangle (8 MP): vines target all enemies, each with 50% chance to suffer -2 defense and -2 damage (scales +1 at levels 3, 5, 7…). Also summons a Woodland Beast like the ranger (7 MP). Per level: +1 magic damage. L20: Commune — accumulated Fae Tokens (earned in combat) can summon the Faerie Queen at 3 tokens (2 tokens at level 30+, 1 token at level 40+); she holds enemies, poisons them, and resists magic/AoE. L25: Shambling Mound (100 MP) — 4× druid max HP, 20+druid level defense, stunning slam, 20% regen, mini-shambler growth (not on the summon round), and only the original mound can bud new minis (grown minis cannot). Max living mounds, including minis, = druid level/2. Intercepts hits aimed at its druid. L30: Verdant Wrath (passive upgrade to Entangle) — entangled enemies now also suffer a nature DoT each round in addition to the defense and damage penalty; each entangled enemy has a 25% chance per round to lose its action entirely as the vines tighten. L30: Wild Shape (30 MP + 5 MP/round) — transform into a powerful animal form (Bear, Wolf, Storm Eagle, Pixie, or Treant); each form boosts HP, grants a unique multi-attack pattern, and enhances summons of the matching beast type. L35: Nature\'s Charms (50 MP toggle) — each round automatically attempts to charm eligible living beast and plant enemies at druidLevel/2% chance until one succeeds, bypassing normal plant charm immunity; at most one enemy can be charmed this way per round; 3 resists from the same target makes them immune for the combat; charmed minions cost 5 MP/round each to maintain (mana exhaustion releases all and ends the toggle); charmed minions deal +1% bonus damage per druid level; charm duration = floor(level/5)+1 rounds. L35: Wither Plants (35 MP AoE) — magic attack that hits all plant-tagged enemies only; damage = base magic × (3.0 + level/100); level/5% chance to instantly destroy non-boss plants. Crafted Staff of the World Tree (Artificer L35) increases Verdant Surge DoT by 50%, empowers treants and shambling mounds with +25% damage/health and +level/5 defense, and makes Treant Wild Shape into World Tree form with triple health.',
    },
    barbarian: {
        id: 'barbarian',
        name: 'Barbarian',
        icon: '\u{1FA93}', // 🪓
        hpMod: 0.60, stMod: 0.40, mpMod: -1.0,
        regenHp: 1, regenSt: 2, regenMp: 0,
        meleeBonus: 2, rangedBonus: 0, magicBonus: 0,
        defenseBonus: 0,
        armorAllowed: ['cloth', 'leather'],
        canUseShield: false,
        meleePerLevel: BARBARIAN_MELEE_PER_LEVEL,
        special: 'rage',
        description: 'Berserker. +60% HP, +40% ST, no mana. +2 melee, +1 HP/+2 ST regen. Cloth or leather only; no shields. Rage (once per combat, free action): halves all incoming damage, grants stun immunity, regens 5% max HP per round, adds +1 melee per barbarian level, and grants 1 extra attack per 4 levels (each costs 3 ST). Per level: +1 melee. L20: Blood Rage — while raging, gain temporary HP (1% max HP per hit landed) until rage ends or stamina depletes; also gain wound multipliers: at 75% HP ×2 damage, at 50% HP ×4 damage, at 25% HP ×6 damage. L25: while raging, encourages other living party members for +3% damage per round, max +60%; multiple barbarians do not stack on the same recipient. L30: Blood Frenzy (passive) — each active bleed DoT on the target adds +10% to all melee damage dealt to that target (cap level×3%, increased while Werebear is active). L30: Heroic Deeds (free action token system) — earn one Heroic Deed token per kill (tokens vanish at end of combat); spend tokens at any time during combat without using your turn. 1. Rapid Assault (1 token) — perform twice as many attacks this round. 2. Reckless Move (1 token) — knock back up to 4 random enemies while attacking; knocked enemies lose their next turn and take single-melee damage (incorporeal/boss/mega-boss immune to the knock; all targets take damage). 3. Refreshing Mead (1 token) — restore 50% max HP and max stamina and cleanse all negative effects. 4. Battle Horn (1 token) — blow a war horn to fear all living non-undead/non-construct/non-elemental/non-plant/non-incorporeal enemies (50% resist roll per target); feared enemies suffer reduced attack and defense (−floor(level/3)) for the remainder of combat. L35: Odin\'s Ravens (passive) — when the barbarian falls, there is a one-time per-combat chance to summon a Valkyrie that revives the barbarian at 25% HP and fights as a non-living front-line ally. L35: Werebear (active, once per combat) — costs 50 stamina to transform, then 5 stamina/round upkeep; grants +50% max/current HP, +floor(level/3) defense, 10% max HP regen each round, suppresses weapon riders, and grants heavy bleeding mauls that scale from level.',
    },
    verminkeeper: {
        id: 'verminkeeper',
        name: 'Vermin Keeper',
        icon: '\u{1F577}️',
        hpMod: 0.25, stMod: -0.5, mpMod: 0.25,
        regenHp: 0, regenSt: 0, regenMp: 2,
        meleeBonus: 0, rangedBonus: 0, magicBonus: 0,
        defenseBonus: 0,
        armorAllowed: ['cloth', 'leather'],
        canUseShield: false,
        magicPerLevel: 1,
        special: 'verminkeeper',
        description: 'Vermin master. +25% HP, -50% ST, +25% mana. +2 MP regen. Cloth/leather only; no shields. New recruits join the back row. Per level: +1 magic damage. L1: Poison Attack and Acid Attack (1 MP each) — single-target magic attacks; +1 attack per 5 levels (all to same target). Each hit applies a DoT (20% of dealt damage per round, 1 round per attack). Additional hits in the same turn stack the DoT damage and extend duration. New attacks in later turns start a fresh DoT. Poison attacks gain +15% damage. Acid attacks also debuff enemy defense by -1 for the entire combat (once per turn). L3: Summon Vermin (5 MP) — random vermin type summoned to front row; HP = keeper max HP, melee = level×2, defense = level×1.5; mimics monster abilities; cascade like necromancer. L6: Summon Slime (10 MP) — random slime type; same stat scaling; cascade. L20: Charm Vermin (50 MP) — charm a vermin/slime/insect enemy using bard-equivalent mechanics. L25: Insect Plague (50 MP) — magic AoE hits all enemies; applies poison DoT = half initial damage per round for 3 rounds. L30: Summon Vermin Swarm or Acid Swarm (75 MP) — creates one swarm; it grows automatically after its own attack turns, adding keeper max HP and +1 AoE attack for future turns per growth, capped at keeper level/5 upgrades; once type is chosen the other button is locked until swarm dies. Vermin swarm: 10% physical resist, ×1.5 magic, ×2 fire; AoE melee + stacking poison DoT (2/3 base for 2 rds); unique debuff (-level/4 atk/rng/magic, 2 rds); immune to poison, psychic, charms, holds, death-roll holds, stuns, paralysis; incorporeal. Acid swarm: 10% physical resist, ×1.5 magic, ×3 lightning; AoE melee + stacking acid DoT (40% base for 2 rds); unique debuff (-level/4 def/rng/magic, 2 rds); immune to acid, psychic, charms, holds, death-roll holds, stuns, paralysis; slime tag. L30: Swarm Protect (25 MP toggle) — swarm intercepts attacks aimed at its keeper (50% + level/300 chance), identical to Shambling Mound mechanics. L35: Minions\' Frenzy (passive) — this keeper\'s summoned/charmed vermin and slimes (excluding special swarms) gain guaranteed second actions, escalating chances for actions 3-8, and deal bonus damage equal to (keeper level × 2)% + 100%. L35: Hive Mind Control (free action) — mark one enemy; this keeper\'s summoned/charmed vermin and slimes prioritize that target. Costs 2 MP/round to maintain and supports multi-keeper overlapping marks. Crafted Sash of the Vermin Keeper (Artificer L35) grants +20% max health, gives vermin/slime minions and swarms +25% damage, increases Insect Plague damage/DoT by 20%, and adds +5% to each Minions Frenzy extra-action roll.',
    },
    warlock: {
        id: 'warlock',
        name: 'Warlock',
        icon: '\u{1F9FF}',
        hpMod: 0.375, stMod: -0.75, mpMod: 0.375,
        regenHp: 1, regenSt: 0, regenMp: 1,
        meleeBonus: 0, rangedBonus: 0, magicBonus: 1,
        defenseBonus: 0,
        armorAllowed: ['cloth'],
        canUseShield: false,
        magicPerLevel: 1,
        special: 'warlock',
        description: 'Demon-binding occultist. +37.5% HP, -75% ST, +37.5% MP. +1 magic, +1 HP regen, +1 MP regen. Cloth armor only; cannot use shields. New recruits join the back row. Per level: +1 magic damage. L1: Evil Eye Hex is a free action once per round; costs 1 MP/round while active, debuffs one enemy by -floor(level/3) defense, melee, ranged, and magic for floor(level/7) rounds, minimum 1. L1: Eldritch Bolt is a single-target armor-bypassing magic attack using normal magic cost and +level% damage. L3: Tend Cauldron of Summoning toggles an HP-fed cauldron (5 HP to cast, no mana); while on, it auto-summons the selected unlocked demon every round at 100% chance. Each demon costs 3 HP/round to maintain, and a slain warlock loses all bound demons. Demon stats key from the warlock: HP = warlock max HP (doubled while Tentacled Horror form is active), attack and defense = warlock magic skill, and demon variants use their monster-style abilities. L20: Wasting Curse (35 MP) applies one self-maintaining curse per target; it deals 1% of current HP on round 1, +1% each round up to 5%, lasts 4 + floor(level/20) rounds capped at 9, and non-magic-immune targets have a 5% chance per round to shrug it off. L25: Charm Demon (50 MP) charms demon-tagged enemies using bard-style charm rules. L30: Protection from Demons passively reduces all party damage from demons by warlock level%, capped at 66%. L30: Tentacled Horror of the Abyss is a once-per-combat form lasting until killed, toggled off, or combat end: doubles HP, doubles current and future bound demon HP, adds level to defense, keeps the back row, disables melee/ranged/normal magic/Wasting Curse/Charm Demon, grants level/3 back-row tentacle melee attacks using magic damage with level% stun chance and 100%+level×3% damage, halves magic/AoE/acid/cold damage, and grants immunity to psychic, charm, poison, holds, paralysis, and stun. Evil Eye and Cauldron remain available. Eldritch Sign replaces tentacles when ready, applying Wasting Curse to random level/5 enemies; it recharges on a 1-in-3 roll each round. L35: Hooked Tentacles (passive) adds level% crit chance on each tentacle hit for +100% + (level x2)% damage and an independent 33%+level% chance to inflict Bleed DoT for floor(level/7) rounds at half the hit damage per tick. L35: Awaken (free toggle) empowers the cauldron: after every 5 successful summons, those queued demons are consumed and replaced by one unique Awakened Lord (global no-duplicates across warlocks in the same combat); Awakened Lords have melee/ranged/magic skills = warlock level x2, each attack rolls 10-20 + that skill, then gains +(warlock level/10 x 100)% damage before individual Lord adjustments. If all eligible Lords are exhausted, the trigger is bypassed without consuming queued summons. Crafted Eldritch Amulet (Artificer L35) grants +7 magic/+7 defense, adds +1 Abyss Form tentacle, gives tentacle attacks +10% damage, and gives summoned demons and Awakened Lords +15% damage.',
    },
    photomancer: {
        id: 'photomancer',
        name: 'Photomancer',
        icon: '\u{1F308}',
        hpMod: 0, stMod: -0.75, mpMod: 0.75,
        regenHp: 0, regenSt: 0, regenMp: 2,
        meleeBonus: 0, rangedBonus: 0, magicBonus: 0,
        defenseBonus: 0,
        armorAllowed: ['cloth'],
        canUseShield: false,
        magicPerLevel: MAGE_MAGIC_PER_LEVEL,
        special: 'photomancer',
        description: 'Light-and-shadow illusionist. -75% stamina, +75% mana, +2 MP regen. Cloth only; cannot use shields. New recruits join the back row. Per level: +1 magic damage. L1: Color Spray (1 MP) hits level+1 enemies as magic/AoE and has level% stun chance. L3: Mirror Image (35 MP) works like Mage Mirror Image with +1 extra image. L6: Blur (30 MP) gives the party 20% miss chance vs melee/ranged for 3+floor(level/10) rounds; Invisibility (10 MP) hides one ally from melee/ranged/single-target magic for 5+floor(level/10) rounds and ends when that ally damages an enemy. L10: Illusionary Warriors (25 MP) creates floor(level/10) front-row illusions; each is immune to damage/effects, cannot receive healing/regeneration/cleansing/living-only buffs, attacks floor(level/5) times using the photomancer magic skill as magic damage, ignores armor/defense, and can be disbelieved by monsters. L20: Improved Invisibility replaces Invisibility and does not break on attack. L25: Disintegrate (20 MP) fires focused magic beams for normal magic damage +300% + level×3%, ignoring defense; each beam has 3% + level/2% instant-kill chance, with bosses/mega-bosses taking x4 damage instead, and gains +1 extra beam every 10 levels above 20. L30: Prismatic Sphere (100 MP, once/combat) absorbs level*100 ranged/magic/AoE damage to the party. L30: Shadow Simulacra are created outside combat from the N menu, limited to floor(level/10), costing level*100 gold. Each gets one selectable power per 5 photomancer levels plus a final melee/ranged/magic attack-type choice; melee starts front row, ranged/magic start back row. Defense and melee/ranged/magic skill equal level*2 before selected upgrades, with a level% damage bonus, construct-like immunities, and no healing/revive/cleanse/living-only buffs. L35: Radiant Burst (75 MP) is a living-only magic AoE that can blind non-bosses at level% chance; bosses use 20%. L35: Eternal Rainbow (100 MP, once/combat) builds red/orange/yellow/green/blue/indigo/violet phases for living-party regen, offense/defense, revive, instant cleanse chance, and a Leprechaun that curses enemies and can add final victory gold.',
    },
    summoned: {
        // Pseudo-class used by all summoned creatures (undead, beasts, golems).
        // Zero stat modifiers so summons are driven entirely by their summonStats.
        id: 'summoned',
        name: 'Summoned',
        icon: '\u2728',
        hpMod: 0, stMod: 0, mpMod: 0,
        regenHp: 0, regenSt: 0, regenMp: 0,
        meleeBonus: 0, rangedBonus: 0, magicBonus: 0,
        defenseBonus: 0,
        armorAllowed: [],
        canUseShield: false,
        special: null,
        description: 'A summoned creature bound to its master\u2019s will.',
    },
};

export const CLASS_IDS = Object.keys(CLASSES);

export function getClassDef(id) {
    return CLASSES[id] || CLASSES.warrior;
}
