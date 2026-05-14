// Grid & geometry
export const CELL_SIZE = 4;
export const WALL_HEIGHT = 4;

// Procedural dungeon layout (Phase 9: doubled from 20×20 → 40×40)
export const DUNGEON_SIZE = 40;                // rows == cols
export const DUNGEON_ROOM_ATTEMPTS = 28;       // BSP-style room seeds per level
export const DUNGEON_ROOM_MIN = 4;             // min room side (cells)
export const DUNGEON_ROOM_MAX = 8;             // max room side (cells)
export const TORCH_SPACING_CELLS = 4;          // target lit-cell interval for uniform lighting

// Post-processing / lighting upgrades (Phase 9)
export const ACTIVE_TORCH_LIGHT_CAP = 8;       // keep only the N nearest torches as real PointLights
export const BLOOM_STRENGTH   = 0.55;
export const BLOOM_RADIUS     = 0.55;
export const BLOOM_THRESHOLD  = 0.9;
export const ENABLE_SHADOWS   = true;          // player torch casts soft shadows

// Player
export const PLAYER_HEIGHT = 1.6;
export const PLAYER_RADIUS = 0.35;
export const MOVE_SPEED = 7;
export const MOUSE_SENSITIVITY = 0.002;

// Initial player stats
export const INITIAL_HEALTH = 20;
export const INITIAL_STAMINA = 20;
export const INITIAL_MANA = 20;

// Lighting
// Phase 10: with static wall torches removed, the party light is the only
// source of illumination. Ambient was bumped from 0.08 → 0.18 so corridors
// aren't pitch-black at the edges of the carried-light radius.
export const AMBIENT_INTENSITY = 0.18;
export const TORCH_COLOR = 0xffaa44;
export const PLAYER_TORCH_INTENSITY = 1.8;
export const PLAYER_TORCH_DISTANCE = 22;
export const WALL_TORCH_INTENSITY = 1.0;
export const WALL_TORCH_DISTANCE = 14;

// Fog — normal (light active)
// Phase 10: lifted from near-pure-black (0x050505) to a dim warm tone so
// distant walls aren't swallowed whole; also pushed FOG_FAR out from 42 → 60.
export const FOG_COLOR = 0x1a1410;
export const FOG_NEAR = 4;
export const FOG_FAR = 60;

// Fog / ambient — no-light mode (torch/lantern/spell burned out or never lit).
// Visibility collapses to ~1 cell (CELL_SIZE = 4 units).  Ambient drops to a
// near-zero value so geometry is essentially invisible beyond arm's reach.
export const FOG_COLOR_DARK    = 0x000000;
export const FOG_NEAR_DARK     = 0;
export const FOG_FAR_DARK      = 5;    // just under CELL_SIZE*1.5 — walls touching you are barely visible
export const AMBIENT_DARK      = 0.015; // ~90% darker than normal ambient

// Magical fountains (spawned per dungeon level)
export const FOUNTAIN_SPAWN_CHANCE     = 0.25;              // 25% chance per roll (roll once per DL, capped at 5)
export const FOUNTAIN_PROXIMITY        = 2.5;               // world units (~0.6 cells) to trigger interaction
export const FOUNTAIN_BUFF_DURATION_MS = 10 * 60 * 1000;   // 10 minutes (all timed fountain buffs)

// Magical chests (spawned per dungeon level)
// Uses the same roll cadence as fountains: min(dungeonLevel, 5) rolls.
export const CHEST_SPAWN_CHANCE = 0.25;
export const CHEST_PROXIMITY = FOUNTAIN_PROXIMITY;

// Enemy system — quadrupled to suit the 40×40 procedural dungeon.
export const ENEMY_SPAWN_INTERVAL = 8;     // seconds between spawns (quadrupled rate)
export const ENEMY_MOVE_INTERVAL = 15;     // seconds between moves
export const ENEMY_MOVE_DURATION = 1.5;    // seconds for smooth interpolation
export const ENEMY_MAX_COUNT = 213;        // soft cap on active enemies (scaled with initial count)
export const ENEMY_MIN_SPAWN_DISTANCE = 5; // grid cells from player
export const ENEMY_COLLISION_RADIUS = 0.9; // world units
export const ENEMY_INITIAL_COUNT = 43;     // enemies spawned on new game (+33%)

// Enemy stat range (randomised per enemy)
export const ENEMY_STAT_MIN = 15;
export const ENEMY_STAT_MAX = 25;

// Enemy type definitions (sprite/display only — stats are randomised)
// Phase 8:
//   `poisonChance` — chance this monster's melee attack applies the poison DoT.
//   `stunChance`   — chance this monster's melee attack stuns the target (troll).
//   `regenPercent` — per-turn self-heal as a fraction of maxHealth (troll).
//   `aoeMagic`     — true for monsters whose magic hits the whole party (cultist).
//
// Phase 11 additions:
//   `webChance`       — melee attack wraps target in webbing for WEB_DURATION_ROUNDS
//                       (same lockdown as stun, just longer). Rolls independent
//                       of poisonChance/stunChance so a monster can carry all three.
//   `aoePoisonChance` — during an aoeMagic attack, each hit target rolls poison
//                       (e.g. myconid spore clouds).
//   `aoeStunChance`   — during an aoeMagic attack, each hit target rolls stun
//                       (e.g. shrieker / ice sprite burst).
//   `maxLevel`        — if set, the enemy only spawns on dungeon levels ≤ maxLevel.
//                       Used by Phase 11 to keep the new early-dungeon roster
//                       from polluting deeper floors.
//
// Phase 12 addition: optional `tags` array on each monster. Used by paladin
// Smite (undead/demon instakill), and by any future ability that cares about
// monster categories. Existing `kind` on UNDEAD_TIERS / BEAST_TYPES does the
// same job for summons; `tags` plays that role for ENEMY_TYPES.
// Supported tags today: 'undead', 'demon', 'beast'.
export const ENEMY_TYPES = {
    // ── Original roster (unbounded dungeon level) ─────────────────────
    skeleton: { name: 'Skeleton', spriteW: 1.4, spriteH: 1.8, tags: ['undead'] },
    slime:    { name: 'Slime',    spriteW: 1.2, spriteH: 1.0, poisonChance: 0.25, tags: ['vermin'], immune: ['acid'] },
    goblin:   { name: 'Goblin',   spriteW: 1.2, spriteH: 1.4, tags: ['humanoid'] },
    // Phase 11: spider gains webChance on top of its existing poison bite.
    // The two effects roll independently — a single hit can poison, web,
    // both, or neither.
    spider:   { name: 'Spider',   spriteW: 1.8, spriteH: 1.2, poisonChance: 0.35, webChance: 0.25, tags: ['beast', 'vermin'] },
    // lifeDrain: melee hits also steal HP from the target and heal the wraith.
    wraith:   { name: 'Wraith',   spriteW: 1.4, spriteH: 2.0, lifeDrain: 0.25, tags: ['undead', 'incorporeal'] },
    bat:      { name: 'Bat',      spriteW: 1.6, spriteH: 1.0, tags: ['beast', 'vermin'] },
    rat:      { name: 'Giant Rat', spriteW: 1.4, spriteH: 1.0, tags: ['beast', 'vermin'] },
    zombie:   { name: 'Zombie',   spriteW: 1.4, spriteH: 1.8, tags: ['undead'] },
    troll:    { name: 'Troll',    spriteW: 1.6, spriteH: 2.0, stunChance: 0.33, regenPercent: 0.15, tags: ['humanoid'] },
    // phaseStrike: ignores all armor and innate defense — only raw HP.
    ghost:    { name: 'Ghost',    spriteW: 1.4, spriteH: 1.8, phaseStrike: true, tags: ['undead', 'incorporeal'] },
    // aoeFire: drake breathes fire on the whole party, applying a burn DoT.
    drake:    { name: 'Drake',    spriteW: 1.6, spriteH: 1.4, aoeFire: true, tags: ['dragon'], immune: ['fire'] },
    mimic:    { name: 'Mimic',    spriteW: 1.4, spriteH: 1.2, tags: ['monster'] },
    orc:      { name: 'Orc',      spriteW: 1.4, spriteH: 1.8, tags: ['humanoid'] },
    // rangedAny: imp uses a ranged attack that can target any row (front or back).
    imp:      { name: 'Imp',      spriteW: 1.0, spriteH: 1.2, rangedAny: true, tags: ['demon'], immune: ['fire'] },
    basilisk: { name: 'Basilisk', spriteW: 1.8, spriteH: 1.4, poisonChance: 0.30, tags: ['beast', 'monster'] },
    cultist:  { name: 'Cultist',  spriteW: 1.4, spriteH: 1.9, aoeMagic: true, tags: ['humanoid'] },

    centipede:    { name: 'Giant Centipede', spriteW: 2.0, spriteH: 0.8, poisonChance: 0.45, tags: ['beast', 'vermin'] },
    cave_crawler: { name: 'Cave Crawler',    spriteW: 1.4, spriteH: 1.0, stunChance: 0.30, tags: ['beast', 'vermin'] },
    widow:        { name: 'Black Widow',     spriteW: 1.6, spriteH: 1.4, poisonChance: 0.40, webChance: 0.35, tags: ['beast', 'vermin'] },
    spore_fungus: { name: 'Spore Fungus',    spriteW: 1.4, spriteH: 1.6, aoeMagic: true, aoePoisonChance: 0.35, tags: ['monster'] },
    shrieker:     { name: 'Shrieker',        spriteW: 1.2, spriteH: 1.6, aoeMagic: true, aoeStunChance: 0.20, tags: ['monster'] },
    kobold:       { name: 'Kobold',          spriteW: 1.0, spriteH: 1.4, tags: ['humanoid'] },
    kobold_shaman:{ name: 'Kobold Shaman',   spriteW: 1.0, spriteH: 1.5, aoeMagic: true, tags: ['humanoid'] },
    cave_fisher:  { name: 'Cave Fisher',     spriteW: 1.8, spriteH: 1.4, webChance: 0.50, tags: ['beast', 'vermin'] },
    stirge:       { name: 'Stirge',          spriteW: 1.2, spriteH: 1.0, regenPercent: 0.10, tags: ['beast', 'vermin'] },
    acid_slime:   { name: 'Acid Slime',      spriteW: 1.2, spriteH: 1.0, poisonChance: 0.55, tags: ['vermin'], immune: ['acid'] },
    flame_imp:    { name: 'Flame Imp',       spriteW: 1.0, spriteH: 1.2, aoeMagic: true, tags: ['demon'], immune: ['fire'] },
    bone_gnasher: { name: 'Bone Gnasher',    spriteW: 1.4, spriteH: 1.4, stunChance: 0.35, tags: ['undead'] },
    blood_wasp:   { name: 'Blood Wasp',      spriteW: 1.4, spriteH: 1.0, poisonChance: 0.40, tags: ['beast', 'vermin'] },
    ice_sprite:   { name: 'Ice Sprite',      spriteW: 1.0, spriteH: 1.2, aoeMagic: true, aoeStunChance: 0.15, tags: ['monster'], immune: ['cold'] },
    stone_hag:    { name: 'Stone Hag',       spriteW: 1.4, spriteH: 1.8, stunChance: 0.30, regenPercent: 0.08, tags: ['humanoid'] },
    ghoul_pup:    { name: 'Ghoul Pup',       spriteW: 1.2, spriteH: 1.2, poisonChance: 0.30, stunChance: 0.20, tags: ['undead'] },
    myconid:      { name: 'Myconid',         spriteW: 1.4, spriteH: 1.8, aoeMagic: true, aoePoisonChance: 0.25, tags: ['monster'] },
    dust_devil:   { name: 'Dust Devil',      spriteW: 1.4, spriteH: 1.8, aoeMagic: true, aoeStunChance: 0.10, tags: ['demon'] },
    vampire_bat:  { name: 'Vampire Bat',     spriteW: 1.6, spriteH: 1.0, regenPercent: 0.12, tags: ['beast', 'vermin'] },
    tunnel_worm:  { name: 'Tunnel Worm',     spriteW: 1.8, spriteH: 1.0, poisonChance: 0.40, webChance: 0.15, tags: ['beast', 'vermin'] },

    // ── New monsters (unbounded dungeon level) ────────────────────────
    banshee:         { name: 'Banshee',          spriteW: 1.4, spriteH: 2.0, aoeMagic: true, aoeStunChance: 0.40, tags: ['undead', 'incorporeal'] },
    lich:            { name: 'Lich',             spriteW: 1.4, spriteH: 2.0, aoeMagic: true, regenPercent: 0.05, tags: ['undead'] },
    minotaur:        { name: 'Minotaur',         spriteW: 1.8, spriteH: 2.2, stunChance: 0.40, tags: ['humanoid', 'beast'] },
    shadow:          { name: 'Shadow',           spriteW: 1.2, spriteH: 2.0, phaseStrike: true, lifeDrain: 0.30, tags: ['undead', 'incorporeal'] },
    ogre:            { name: 'Ogre',             spriteW: 2.0, spriteH: 2.2, stunChance: 0.45, tags: ['humanoid'] },
    dark_elf:        { name: 'Dark Elf',         spriteW: 1.2, spriteH: 1.8, rangedAny: true, poisonChance: 0.30, tags: ['humanoid'] },
    harpy:           { name: 'Harpy',            spriteW: 1.6, spriteH: 1.8, aoeMagic: true, aoeStunChance: 0.25, tags: ['beast', 'monster'] },
    giant_scorpion:  { name: 'Giant Scorpion',   spriteW: 2.0, spriteH: 1.2, poisonChance: 0.50, tags: ['beast', 'vermin'] },
    wight:           { name: 'Wight',            spriteW: 1.4, spriteH: 1.8, lifeDrain: 0.35, stunChance: 0.25, tags: ['undead'] },
    gargoyle:        { name: 'Gargoyle',         spriteW: 1.6, spriteH: 2.0, stunChance: 0.35, regenPercent: 0.05, tags: ['construct', 'monster'] },
    phase_spider:    { name: 'Phase Spider',     spriteW: 1.8, spriteH: 1.2, phaseStrike: true, poisonChance: 0.40, tags: ['beast', 'vermin'] },
    tentacle_horror: { name: 'Tentacle Horror',  spriteW: 2.0, spriteH: 1.6, aoeMagic: true, aoePoisonChance: 0.30, webChance: 0.40, tags: ['aberration'] },
    ice_troll:       { name: 'Ice Troll',        spriteW: 1.8, spriteH: 2.2, stunChance: 0.30, regenPercent: 0.20, attackDebuff: 2, tags: ['humanoid'], immune: ['cold'] },
    vampire_spawn:   { name: 'Vampire Spawn',    spriteW: 1.4, spriteH: 1.8, lifeDrain: 0.30, regenPercent: 0.08, tags: ['undead'] },
    mind_flayer:     { name: 'Mind Flayer',      spriteW: 1.4, spriteH: 2.0, aoeMagic: true, aoeStunChance: 0.50, tags: ['aberration'] },
    fire_elemental:  { name: 'Fire Elemental',   spriteW: 1.6, spriteH: 2.0, aoeFire: true, tags: ['construct', 'elemental', 'incorporeal'], immune: ['fire', 'stun', 'poison'] },
    gnoll:           { name: 'Gnoll',            spriteW: 1.4, spriteH: 1.8, rangedAny: true, poisonChance: 0.20, tags: ['humanoid', 'beast'] },
    demon_knight:    { name: 'Demon Knight',     spriteW: 1.8, spriteH: 2.2, stunChance: 0.40, tags: ['demon', 'humanoid'] },
    naga:            { name: 'Naga',             spriteW: 1.8, spriteH: 1.6, poisonChance: 0.45, constrict: 3, rangedAny: true, tags: ['monster', 'beast'] },
    gelatinous_cube: { name: 'Gelatinous Cube',  spriteW: 1.8, spriteH: 1.8, poisonChance: 0.35, paralyzingBite: 2, tags: ['monster', 'vermin'], immune: ['acid'] },

    // ── Elemental triad ───────────────────────────────────────────────
    // earth_elemental: double HP & defense vs a normal high-level mob.
    //   stunChance:0.30 applies to both single-target melee and the
    //   earthquakeChance AOE (50% chance to quake instead of single hit).
    //   hpMult / defenseMult are applied by EnemyManager after spawn.
    earth_elemental: { name: 'Earth Elemental', spriteW: 1.8, spriteH: 2.2,
        stunChance: 0.30, earthquakeChance: 0.50,
        hpMult: 2.0, defenseMult: 2.0,
        tags: ['construct', 'elemental'], immune: ['stun', 'poison'] },
    // air_elemental: AoE magic blast with 33% stun chance per target.
    air_elemental:   { name: 'Air Elemental',   spriteW: 1.6, spriteH: 2.0,
        aoeMagic: true, aoeStunChance: 0.33,
        tags: ['construct', 'elemental', 'incorporeal'], immune: ['stun', 'poison'] },
    // water_elemental: AoE + drowning DoT (half-dmg × 3 rds) + -2 def × 3 rds.
    water_elemental: { name: 'Water Elemental', spriteW: 1.6, spriteH: 2.0,
        aoeDrowning: true,
        tags: ['construct', 'elemental', 'incorporeal'], immune: ['stun', 'poison'] },

    // ── Phase 13: 18 New Monsters ────────────────────────────────────
    // dungeon_ape: large ape, high HP, melee, can stun.
    dungeon_ape:  { name: 'Dungeon Ape',  spriteW: 2.0, spriteH: 2.2,
        stunChance: 0.35, hpMult: 1.5,
        tags: ['beast'] },

    // hag: old witch, AoE magic caster.
    hag:          { name: 'Hag',          spriteW: 1.4, spriteH: 1.8,
        aoeMagic: true,
        tags: ['humanoid'] },

    // bandit: rogue mercenary, can attack back row.
    bandit:       { name: 'Bandit',       spriteW: 1.2, spriteH: 1.8,
        rangedAny: true, poisonChance: 0.20,
        tags: ['humanoid'] },

    // beholder: aberration, 6 random eye beams per turn with varied effects.
    // Special AI handles the eye beams; isBeholderAI flags it in _executeOneEnemyTurn.
    beholder:     { name: 'Beholder',     spriteW: 2.0, spriteH: 1.8,
        isBeholderAI: true, hpMult: 2.0, defenseMult: 1.5,
        tags: ['aberration'] },

    // Dragons — 50% AoE breath + DoT, 50% multi-attack (2 claws + bite).
    // All mega-boss eligible. High HP.
    red_dragon:   { name: 'Red Dragon',   spriteW: 2.4, spriteH: 2.0,
        isDragonAI: true, dragonBreathType: 'fire',
        hpMult: 3.0, defenseMult: 2.0,
        tags: ['dragon'], immune: ['fire'] },
    black_dragon: { name: 'Black Dragon', spriteW: 2.4, spriteH: 2.0,
        isDragonAI: true, dragonBreathType: 'acid',
        hpMult: 3.0, defenseMult: 2.0,
        tags: ['dragon'], immune: ['acid'] },
    blue_dragon:  { name: 'Blue Dragon',  spriteW: 2.4, spriteH: 2.0,
        isDragonAI: true, dragonBreathType: 'lightning',
        hpMult: 3.0, defenseMult: 2.0,
        tags: ['dragon'], immune: ['lightning'] },
    green_dragon: { name: 'Green Dragon', spriteW: 2.4, spriteH: 2.0,
        isDragonAI: true, dragonBreathType: 'poison',
        hpMult: 3.0, defenseMult: 2.0,
        tags: ['dragon'], immune: ['poison'] },
    white_dragon: { name: 'White Dragon', spriteW: 2.4, spriteH: 2.0,
        isDragonAI: true, dragonBreathType: 'cold',
        hpMult: 3.0, defenseMult: 2.0,
        tags: ['dragon'], immune: ['cold'] },

    // efreeti: fire genie, half magic damage taken, AoE fire attack.
    efreeti:      { name: 'Efreeti',      spriteW: 1.8, spriteH: 2.2,
        aoeFire: true, halfMagicDamage: true,
        tags: ['demon'], immune: ['fire'] },

    // ettin: two-headed giant, attacks twice, can stun.
    ettin:        { name: 'Ettin',        spriteW: 2.0, spriteH: 2.4,
        isEttinAI: true, stunChance: 0.30,
        tags: ['humanoid'] },

    // fire_giant: melee+10, hits twice, stun, fire DoT.
    fire_giant:   { name: 'Fire Giant',   spriteW: 2.0, spriteH: 2.4,
        isFireGiantAI: true, stunChance: 0.25,
        tags: ['humanoid'], immune: ['fire'] },

    // ice_giant: melee+10, hits twice, stun, ice DoT.
    ice_giant:    { name: 'Ice Giant',    spriteW: 2.0, spriteH: 2.4,
        isIceGiantAI: true, stunChance: 0.25,
        tags: ['humanoid'], immune: ['cold'] },

    // stone_giant: ranged+10, throws boulders twice, stun, extra defense.
    stone_giant:  { name: 'Stone Giant',  spriteW: 2.0, spriteH: 2.4,
        isStoneGiantAI: true, stunChance: 0.25, defenseMult: 1.5,
        tags: ['humanoid'] },

    // storm_giant: magic+10, lightning bolt hits 3 random back row + stun.
    storm_giant:  { name: 'Storm Giant',  spriteW: 2.0, spriteH: 2.4,
        isStormGiantAI: true,
        tags: ['humanoid'], immune: ['lightning'] },

    // giant_frog: poison bite + DoT.
    giant_frog:   { name: 'Giant Frog',   spriteW: 1.6, spriteH: 1.2,
        poisonChance: 0.45,
        tags: ['beast'] },

    // medusa: 3 poison arrows/turn, can hit back row, petrify attempt.
    medusa:       { name: 'Medusa',       spriteW: 1.6, spriteH: 2.0,
        isMedusaAI: true,
        tags: ['humanoid', 'monster'] },

    // hydra: 6+ heads (1 per 5 dungeon levels), each attacks per round, regen 15%/round.
    hydra:        { name: 'Hydra',        spriteW: 2.4, spriteH: 1.8,
        isHydraAI: true, regenPercent: 0.15, hpMult: 2.0,
        tags: ['beast', 'monster'] },

    // manticore: 5 ranged attacks/turn, +3 bonus, can hit back row, poison tail DoT.
    manticore:    { name: 'Manticore',    spriteW: 2.2, spriteH: 1.8,
        isManticoreAI: true,
        tags: ['beast'] },

    // evil_priest: 50/50 mass heal (15% HP to non-undead enemies) or AoE magic.
    evil_priest:  { name: 'Evil Priest',  spriteW: 1.4, spriteH: 1.9,
        isEvilPriestAI: true,
        tags: ['humanoid'] },

    // werewolf: +50% defense bonus, regen 25%/turn.
    werewolf:     { name: 'Werewolf',     spriteW: 1.8, spriteH: 2.2,
        isWerewolfAI: true, regenPercent: 0.25, defenseMult: 1.5,
        tags: ['beast', 'humanoid'] },

    // yeti: two fist attacks/turn, stun, ice DoT.
    yeti:         { name: 'Yeti',         spriteW: 2.0, spriteH: 2.2,
        isYetiAI: true, stunChance: 0.30,
        tags: ['beast'], immune: ['cold'] },
};
// Only enemy types (excludes tinkerer for spawning purposes)
export const ENEMY_TYPE_KEYS = Object.keys(ENEMY_TYPES);

// Tinkerer NPC (friendly, non-combat)
export const TINKERER_TYPE = { name: 'Tinkerer', spriteW: 1.4, spriteH: 1.8 };

// Combat — player costs & damage
export const MELEE_STAMINA_COST = 3;
export const MELEE_DAMAGE_MIN = 2;
export const MELEE_DAMAGE_MAX = 12;
export const MELEE_DAMAGE_BONUS_MULT = 1.20;  // 20% constant bonus to all melee damage
export const RANGED_STAMINA_COST = 2;
// Phase 8 rule 11: +1 to both min and max.
export const RANGED_DAMAGE_MIN = 2;
export const RANGED_DAMAGE_MAX = 9;
export const RANGED_DAMAGE_BONUS_MULT = 1.10;  // 10% constant bonus to all ranged damage
export const MAGIC_MANA_COST = 3;
export const MAGIC_DAMAGE_MIN = 1;
export const MAGIC_DAMAGE_MAX = 8;

// Combat — monster costs & damage (base values; monster level adds more)
// +2 flat at all levels to keep monsters relevant vs. class/species bonuses.
export const MONSTER_MELEE_STAMINA_COST = 2;
export const MONSTER_MELEE_DAMAGE_MIN = 4;
export const MONSTER_MELEE_DAMAGE_MAX = 10;
export const MONSTER_MAGIC_MANA_COST = 3;
export const MONSTER_MAGIC_DAMAGE_MIN = 3;
export const MONSTER_MAGIC_DAMAGE_MAX = 8;

// Monster level scaling — each dungeon level deeper = more dangerous monsters.
export const MONSTER_DAMAGE_PER_LEVEL = 2;   // +2 min & +2 max per level above 1
export const MONSTER_DEFENSE_PER_2_LVL = 1;  // +1 defense per 2 levels (floor)
export const MONSTER_HP_PER_LEVEL_MULT = 1.0; // stats rolled × level

// Extra scaling at dungeon level 3+
export const MONSTER_DAMAGE_BONUS_THRESHOLD = 3; // dungeon level where extra damage starts
export const MONSTER_DAMAGE_BONUS_PER_LEVEL = 1; // +1 flat damage per level at/above threshold
export const MONSTER_HP_BONUS_THRESHOLD = 3;     // dungeon level where HP compound bonus starts
export const MONSTER_HP_BONUS_PER_LEVEL = 0.15;  // +15% HP (compound) per level at/above threshold

// Initiative
export const INITIATIVE_DIE = 12; // d12 roll for each participant

// Combat — misc
export const FLEE_CHANCE = 0.5;
export const POST_COMBAT_RECOVERY = 2; // each stat recovered after victory

// Loot
export const LOOT_GOLD_MIN = 10;
export const LOOT_GOLD_MAX = 20;
export const LOOT_FOOD_CHANCE = 0.30;
export const LOOT_POTION_CHANCE = 0.05;
export const LOOT_WEAPON_CHANCE = 0.05;
export const LOOT_ARMOR_CHANCE = 0.05;
export const LOOT_SHIELD_CHANCE = 0.05;
export const LOOT_EXTRA_CHAR_BONUS = 0.01; // +1% per extra character for equipment

// Rest
export const REST_RECOVERY_PERCENT = 0.33;

// Recruit
export const RECRUIT_BASE_COST = 100;

// Starting supplies
export const STARTING_GOLD = 0;
export const STARTING_FOOD = 3;

// Combat special mechanics
export const MONSTER_DAMAGE_MULTIPLIER = 0.9;  // monsters deal 90% damage
export const RANGED_CRIT_CHANCE = 0.20;         // 20% chance for double damage
export const MELEE_STUN_CHANCE = 0.20;          // 20% chance to stun enemy
export const SHIELD_BLOCK_CHANCE = 0.25;        // 25% chance to block attack entirely

// Monster special powers (wraith, ghost, drake, imp)
export const WRAITH_DRAIN_FRACTION = 0.25;       // wraith lifeDrain: steals 25% of dealt dmg as HP
export const DRAKE_FIRE_BURN_ROUNDS = 2;         // drake aoeFire: burn DoT lasts 2 rounds
export const DRAKE_FIRE_BURN_FRACTION = 0.33;    // drake aoeFire: burn DoT = 33% of hit damage/rd

// ──────────────────────────────────────────
// Regen (per MINUTE, base for every character)
// Class + species add bonuses on top of this.
// ──────────────────────────────────────────
export const REGEN_HP_PER_MIN = 1;
export const REGEN_ST_PER_MIN = 3;
export const REGEN_MP_PER_MIN = 2;

// ──────────────────────────────────────────
// Class special-ability tuning
// ──────────────────────────────────────────
// Phase 8 rule 4:  Backstab deals 2× damage, then adds +10% damage
// per rogue level. Stamina cost and instakill chance are unchanged.
export const BACKSTAB_STAMINA_MULT = 3;   // rogue: costs 3x normal melee stamina
export const BACKSTAB_DAMAGE_MULT = 2;    // rogue: 2x damage (then +10%/level)
export const BACKSTAB_DAMAGE_PER_LEVEL = 0.10; // +10% damage per rogue level, added AFTER the doubling
export const BACKSTAB_INSTAKILL_CHANCE = 0.05; // rogue: 5% chance to drop enemy to 0

export const CLERIC_HEAL_MANA_COST = 5;
export const CLERIC_HEAL_PERCENT = 0.25;  // heals 25% of target's max HP

// Turn Undead — cleric level 6+. Costs mana, hits every undead enemy as a
// 2× magic attack (all undead, ignoring the random-target cap). Also debuffs
// undead attack and defense by 2 + 1 per 2 cleric levels.
export const CLERIC_TURN_UNDEAD_MIN_LEVEL  = 6;
export const CLERIC_TURN_UNDEAD_MANA_COST  = 20;
export const CLERIC_TURN_UNDEAD_DAMAGE_MULT = 2;      // base ×2; also ×(1+0.02×clericLevel) — see clericTurnUndead()
export const CLERIC_TURN_UNDEAD_DEBUFF_BASE = 2;      // base atk/def debuff
export const CLERIC_TURN_UNDEAD_DEBUFF_EVERY = 2;     // +1 debuff per N cleric levels

export const MAGE_SHIELD_MANA_COST    = 6;   // mana cost for mage shield spell
export const MAGE_SHIELD_BASE_DEF     = 3;   // base defense bonus for all back-row members
export const MAGE_SHIELD_BASE_ROUNDS  = 3;   // base duration in rounds
export const MAGE_SHIELD_BONUS_EVERY  = 5;   // +1 def and +1 round per this many mage levels
export const MAGE_SHIELD_MIN_LEVEL    = 3;   // mage must be at least this level

export const NECRO_SUMMON_MANA_COST = 7;
export const NECRO_UNDEAD_MANA_UPKEEP  = 1;   // mana drained per undead summon per round
export const NECRO_DARK_HARVEST_HP_FRAC   = 0.10; // fraction of maxHealth lost
export const NECRO_DARK_HARVEST_ST_FRAC   = 0.10; // fraction of maxStamina lost
export const NECRO_DARK_HARVEST_MANA_FRAC = 0.10; // fraction of maxMana gained
export const NECRO_LIFE_DRAIN_CHANCE = 0.25;
export const NECRO_LIFE_DRAIN_AMOUNT = 2;

export const MONK_MELEE_MANA_COST = 1;    // monks also burn mana on melee
export const MONK_WHIRLWIND_CHANCE = 0.5; // 50% chance to also hit each other enemy
// Phase 8 rule 6: monks get 40% base dodge (up from 33%), capped at 95%,
// and take reduced damage on non-dodged hits by their current dodge %.
export const MONK_DODGE_CHANCE = 0.40;
export const MONK_DODGE_MAX   = 0.95;
export const MONK_DODGE_STAMINA_COST = 2;
export const MONK_DODGE_MANA_COST = 2;

// ──────────────────────────────────────────
// Level / XP system
// ──────────────────────────────────────────
export const MAX_LEVEL = 100;
export const XP_PER_MONSTER_LEVEL = 10;     // each monster gives 10 XP × its level
export const XP_LEVEL_BASE = 100;           // XP to next = XP_LEVEL_BASE × currentLevel²
export const LEVEL_HP_PER = 12;             // +12 HP × (1+hpMod) per level
export const LEVEL_ST_PER = 12;
export const LEVEL_MP_PER = 12;

// Per-level class bonuses (beyond level 1)
export const WARRIOR_MELEE_PER_LEVEL = 1;
export const ROGUE_MELEE_PER_LEVEL = 1;
export const MONK_MELEE_PER_LEVEL = 1;
export const RANGER_RANGED_PER_LEVEL = 1;
export const MAGE_MAGIC_PER_LEVEL = 1;

export const WARRIOR_DEFENSE_PER_LEVEL = 1;   // +1 def per level
export const WARRIOR_STUN_PER_LEVEL = 0.03;   // +3% melee stun per level

// Warrior L20 special abilities
export const WARRIOR_DEFEND_MODE_UNLOCK_LEVEL   = 20;
export const WARRIOR_DEFEND_BLOCK_BONUS_PER_3LV = 0.01; // +1% intercept/block per 3 warrior levels
export const WARRIOR_INTERCEPT_DAMAGE_MULT      = 0.20; // intercepted damage reduced to 20% post-defense
export const WARRIOR_STUN_RESIST_BASE           = 0.20; // 20% base stun resistance at L20
export const WARRIOR_STUN_RESIST_PER_2_LEVELS   = 0.01; // +1% per 2 levels beyond 1 (so 30% at L20)
export const WARRIOR_RETALIATION_UNLOCK_LEVEL   = 25;
export const WARRIOR_RETALIATION_BASE_CHANCE    = 0.25; // 25% base on successful intercept
export const WARRIOR_RETALIATION_PER_LEVEL      = 0.005; // +0.5% per level (= level / 2 %)
export const WARRIOR_RETALIATION_DAMAGE_MULT    = 0.75; // 75% of a normal melee strike
export const RANGER_CRIT_PER_LEVEL = 0.03;    // +3% ranged crit per level
export const MAGE_STUN_PER_LEVEL = 0.01;      // +1% magic stun per level
export const ROGUE_INSTAKILL_PER_LEVEL = 0.01;// +1% backstab instakill per level beyond 1
export const MONK_DODGE_PER_LEVEL = 0.01;     // +1% dodge per level beyond 1
export const MONK_WHIRLWIND_PER_LEVEL = 0.01; // +1% whirlwind per level beyond 1
export const CLERIC_HEAL_PER_LEVEL = 0.02;    // +2% heal amount per level beyond 1
export const CLERIC_CLEANSE_UNLOCK_LEVEL       = 25;
export const CLERIC_CLEANSE_CHANCE_PER_LEVEL   = 0.02; // cleric level × 2%
export const CLERIC_CLEANSE_MANA_PER_STATE     = 3;
export const NECRO_DRAIN_PER_LEVEL = 1;       // +1 drain per level beyond 1

// Barbarian class constants
export const BARBARIAN_MELEE_PER_LEVEL = 1;   // +1 melee per level beyond 1
export const BARBARIAN_RAGE_STAMINA_COST = 3; // each rage attack costs 3 ST
export const BARBARIAN_RAGE_HP_REGEN = 0.05;  // regen 5% max HP per round while raging
// Extra rage attacks = Math.floor(level / 3)  — baked into barbarianRage() logic
// Rage damage bonus = +level to base roll    — baked into _rollPlayerMeleeDamage() logic

// ── Barbarian L20 — Blood Rage (temp HP + wound multiplier) ──────────────────
export const BARBARIAN_BLOOD_RAGE_UNLOCK_LEVEL = 20;
export const BARBARIAN_TEMP_HP_PER_HIT_FRAC    = 0.01; // 1% of max HP per hit while raging
export const BARBARIAN_WOUND_THRESH_1          = 0.75; // at 75% HP → ×2 dmg (no tempHp)
export const BARBARIAN_WOUND_THRESH_2          = 0.50; // at 50% HP → ×4 dmg
export const BARBARIAN_WOUND_THRESH_3          = 0.25; // at 25% HP → ×6 dmg
export const BARBARIAN_WOUND_MULT_1            = 2;
export const BARBARIAN_WOUND_MULT_2            = 4;
export const BARBARIAN_WOUND_MULT_3            = 6;

// ── Barbarian L25 — Battle Encouragement ───────────────────────────────────
export const BARBARIAN_ENCOURAGE_UNLOCK_LEVEL = 25;
export const BARBARIAN_ENCOURAGE_DAMAGE_PER_ROUND = 0.03;
export const BARBARIAN_ENCOURAGE_MAX_ROUNDS = 20;
export const BARBARIAN_ENCOURAGE_MAX_DAMAGE_MULT = 0.60;

// ── Ranger L25 — Animal Totems ─────────────────────────────────────────────
export const RANGER_TOTEM_UNLOCK_LEVEL = 25;
export const RANGER_TOTEM_MANA_PER_ROUND = 5;
export const RANGER_TOTEM_DURATION_DIVISOR = 8;
export const RANGER_WOLF_TOTEM_BLEED_FRACTION = 0.50;
export const RANGER_BEAR_TOTEM_STUN_CHANCE = 0.25;
export const RANGER_BEAR_TOTEM_DEFENSE_DIVISOR = 3;
export const RANGER_EAGLE_TOTEM_DAMAGE_PER_LEVEL = 0.005; // level / 2 percent
export const RANGER_EAGLE_TOTEM_DEFLECT_PER_LEVEL = 0.005; // level / 2 percent
export const RANGER_EAGLE_TOTEM_REFLECT_FRACTION = 0.50;
export const RANGER_PIXIE_TOTEM_POISON_FRACTION = 0.33;
export const RANGER_PIXIE_TOTEM_MAGIC_RESIST = 0.50;

// ── Monk L25 — Avatar ─────────────────────────────────────────────────────
export const MONK_AVATAR_UNLOCK_LEVEL = 25;
export const MONK_AVATAR_MANA_PER_ROUND = 10;
export const MONK_AVATAR_HP_REGEN = 0.10;
export const MONK_AVATAR_CLEANSE_BASE = 0.16;
export const MONK_AVATAR_CLEANSE_PER_LEVEL = 0.005; // level / 2 percent
export const MONK_AVATAR_DOT_FRACTION = 0.50;
export const MONK_AVATAR_DOT_DURATION_DIVISOR = 8;

// ── Necromancer L25 — Demi-Lich ────────────────────────────────────────────
export const NECRO_DEMI_LICH_UNLOCK_LEVEL = 25;
export const NECRO_DEMI_LICH_MANA_COST = 20;
export const NECRO_DEMI_LICH_DEFENSE_BASE = 10;
export const NECRO_DEMI_LICH_DEFENSE_PER_LEVEL = 2;
export const NECRO_DEMI_LICH_TARGET_DIVISOR = 5;
export const NECRO_DEMI_LICH_DAMAGE_PER_LEVEL = 2;
export const NECRO_DEMI_LICH_MAGIC_RESIST = 0.50;

// Summons
export const RANGER_SUMMON_MANA_COST = 7;
export const NECRO_TIER_UPGRADE_EVERY = 2;    // new undead tier every 2 levels (L1,3,5,7...)
export const SUMMON_TIER_HP_MULT = 1.5;       // each tier = +50% HP of previous
export const SUMMON_TIER_DMG_PER = 2;         // each tier = +2 min/max damage
export const SUMMON_TIER_DEF_PER = 1;         // each tier = +1 defense

// Loot scaling by dungeon level
export const LOOT_DROP_PER_LEVEL = 0.01;   // +1% equipment drop chance per level beyond 1

// Resurrection potion (Tinkerer shop only)
export const RESURRECTION_POTION_COST = 200;

// Dungeon portals
export const DUNGEON_LEVEL_MAX = 100; // sanity cap
export const DUNGEON_PORTAL_RADIUS = 1.2; // world units: how close to trigger portal

// ──────────────────────────────────────────
// Phase 8 — Bard & Druid abilities
// ──────────────────────────────────────────
// Song (bard): 7 MP, party-wide +2 defense & +2 to melee/ranged/magic damage.
// Scales +1 per odd level beyond 1 (level 3 = +3, level 5 = +4…).
export const BARD_SONG_MANA_COST = 7;
export const BARD_SONG_BASE_BONUS = 2;

// Out-of-combat bard songs — opened via V-key party spell modal.
// Max active songs = Math.max(1, Math.floor(bardLevel / 5)).
// Bonus per song scales as Math.max(1, Math.floor(bardLevel / 5)).
export const BARD_DISRUPT_MANA_COST  = 7;   // in-combat AoE disruption (replaces old song in combat)
export const BARD_HASTE_MANA_COST    = 5;   // initiative bonus for whole party
export const BARD_BATTLE_MANA_COST   = 6;   // attack + defense bonus for whole party
export const BARD_HEALING_MANA_COST  = 5;   // HP regen bonus for whole party
export const BARD_HASTE_MAX          = 5;   // cap on initiative bonus per member
export const BARD_BATTLE_MAX         = 10;  // cap on attack/defense bonus per member

// Entangle (druid): 8 MP, targets all enemies. Each roll-independent 50%
// chance to apply -2 defense / -2 damage debuff. Debuff magnitude scales
// +1 per odd level beyond 1 (level 3 = -3, level 5 = -4…).
export const DRUID_ENTANGLE_MANA_COST = 8;
export const DRUID_ENTANGLE_BASE_DEBUFF = 2;
export const DRUID_ENTANGLE_CHANCE = 0.5;

// Druid's beast summon — same mechanics as ranger.
export const DRUID_SUMMON_MANA_COST = 7;

// ──────────────────────────────────────────
// Phase 8 — Poison / DoT
// ──────────────────────────────────────────
// Poison DoT applied by some monster melee attacks (spiders/slimes/basilisks).
// Lasts 3 rounds after application, dealing 1/3 of the triggering hit each
// round. Ignores defense. The same DoT system is used for any future player
// abilities that inflict DoT.
export const POISON_DURATION_ROUNDS = 3;
export const POISON_DAMAGE_FRACTION = 1 / 3;

// Phase 11 — Web immobilize duration in combat rounds. Uses the same
// lockdown mechanic as stun, but lasts multiple rounds instead of one.
export const WEB_DURATION_ROUNDS = 2;

// ──────────────────────────────────────────
// Phase 8 — Traps
// ──────────────────────────────────────────
// Each walkable cell (except player start and portals) rolls TRAP_CHANCE
// on dungeon generation. If spotted by a rogue the party may attempt to
// disarm — success may reveal a small treasure cache. Damage is 3d6 × dlvl.
// A floor of TRAP_MIN_PER_LEVEL ensures every level has enough traps to
// matter, even when the RNG is unlucky.
export const TRAP_CHANCE = 0.03;
export const TRAP_MIN_PER_LEVEL = 12;
export const TRAP_DICE_COUNT = 3;
export const TRAP_DICE_SIDES = 6;
export const TRAP_SPOT_BASE = 0.75;       // rogue L1 = 75%
export const TRAP_SPOT_PER_LEVEL = 0.01;  // +1% per level beyond 1
export const TRAP_DISARM_BASE = 0.66;     // rogue L1 = 66%
export const TRAP_DISARM_PER_LEVEL = 0.01;// +1% per level beyond 1
export const TRAP_TREASURE_CHANCE = 0.5;  // 50% chance of treasure on disarm
export const TRAP_TREASURE_MIN = 10;      // × dungeon level
export const TRAP_TREASURE_MAX = 20;      // × dungeon level

/**
 * Trap variety — each generated trap is assigned one of these flavours.
 *   `name`   — shown in the modal title
 *   `icon`   — decorative icon for messages
 *   `verb`   — sentence fragment for "spring" messages
 *                 e.g. "A swinging blade slices across {names}!"
 *   `hint`   — rogue flavour when a trap is spotted
 *   `kind`   — 'physical' | 'poison' (poison traps may apply a DoT on survivors)
 */
export const TRAP_TYPES = [
    { id: 'pit',       name: 'Spiked Pit',        icon: '\u{1F573}\uFE0F', verb: 'A concealed pit yawns open beneath',          hint: 'Telltale seams outline a hinged floor plate.', kind: 'physical' },
    { id: 'blade',     name: 'Swinging Blade',    icon: '\u{1FA93}',       verb: 'A razor-edged blade sweeps out at',           hint: 'Scoring on the opposite wall tracks its arc.', kind: 'physical' },
    { id: 'darts',     name: 'Dart Volley',       icon: '\u{1F3AF}',       verb: 'A volley of poisoned darts peppers',          hint: 'Tiny pinholes dot the stonework.',             kind: 'poison' },
    { id: 'arrow',     name: 'Arrow Trap',        icon: '\u{1F3F9}',       verb: 'Hidden crossbows loose a shower of bolts at', hint: 'Arrow slits are barely visible in the wall.',  kind: 'physical' },
    { id: 'rocks',     name: 'Falling Rocks',     icon: '\u{1FAA8}',       verb: 'A cascade of stones crashes down on',         hint: 'Loose rubble shifts uneasily overhead.',       kind: 'physical' },
    { id: 'poison',    name: 'Poison Spray',      icon: '\u{1F9EA}',       verb: 'A sickly green mist sprays over',             hint: 'A greasy film dulls the pressure plate.',      kind: 'poison' },
    { id: 'acid',      name: 'Acid Jet',          icon: '\u{1F9EC}',       verb: 'A searing jet of acid lances across',         hint: 'Acrid fumes hiss from a fine crack.',          kind: 'physical' },
    { id: 'fire',      name: 'Fire Blast',        icon: '\u{1F525}',       verb: 'A gout of flame roars through',               hint: 'Soot-blackened stone betrays its reach.',      kind: 'physical' },
    { id: 'lightning', name: 'Lightning Rune',    icon: '\u{26A1}',        verb: 'A crackling bolt of lightning arcs into',     hint: 'A dim runic circle flickers underfoot.',       kind: 'physical' },
    { id: 'gas',       name: 'Choking Gas',       icon: '\u{1F4A8}',       verb: 'Choking green gas billows around',            hint: 'Old skulls and rusted armour lie nearby.',     kind: 'poison' },
    { id: 'crusher',   name: 'Ceiling Crusher',   icon: '\u{1F5FF}',       verb: 'The ceiling slams down onto',                 hint: 'Four deep grooves frame a massive slab.',      kind: 'physical' },
    { id: 'scythe',    name: 'Scything Pendulum', icon: '\u{2692}\uFE0F',  verb: 'A pendulum scythe sweeps through',            hint: 'A long pendulum slot is cut into the wall.',   kind: 'physical' },
    { id: 'net',       name: 'Snare Net',         icon: '\u{1F578}\uFE0F', verb: 'A weighted snare net drops over',             hint: 'A bundled net hides in the rafters.',          kind: 'physical' },
    { id: 'spikes',    name: 'Spring Spikes',     icon: '\u{1FA78}',       verb: 'Iron spikes spring up out of the floor beneath', hint: 'A row of flagstones rocks ever-so-slightly.', kind: 'physical' },
];

// ──────────────────────────────────────────
// Phase 8 — Trinket drops & bonuses
// ──────────────────────────────────────────
// Monsters have a 2% chance to drop a trinket (cloak / amulet / ring / belt).
// Trinkets grant +1..+4 to one of: defense, melee, ranged, magic.
export const TRINKET_DROP_CHANCE = 0.02;
export const TRINKET_SLOTS = ['cloak', 'neck', 'ring1', 'ring2', 'belt'];

// ──────────────────────────────────────────
// Phase 8 — Monster stun template (troll, and any future "lose your turn")
// ──────────────────────────────────────────
// Stun semantics: target's `stunned` flag is set true. On the target's next
// turn the stun is consumed (they skip) and cleared.
// See Enemy.stunChance and PartyMember.stunned.

// Auto-save
export const AUTO_SAVE_INTERVAL = 10; // seconds

// ──────────────────────────────────────────
// Phase 10 — Party light sources
// ──────────────────────────────────────────
// The party now carries its own light. Static dungeon torches are gone:
// what you bring is what you see. Durations are in seconds of exploration
// time (combat paused). Radii are expressed in grid CELLS and converted to
// world units via CELL_SIZE where used.
//
//   torch       → 5-cell radius, 10 minutes, flickering warm flame
//   lantern     → 8-cell radius, burns one oil for 15 minutes, steady warm
//   light spell → 6-cell radius, 5 minutes, bright cool white (mage, 10 MP)
//
// Hotkey: T opens the Light Picker (torches / lanterns-with-oil / mages with
// ≥ LIGHT_SPELL_MANA_COST mana).
// Radii tripled from the original design after playtesting. Intensities are
// tuned for `useLegacyLights=true` + `decay=1` (linear falloff) — see
// Game.js and PartyLightSystem.js. With static wall torches gone, the party
// light is the ONLY source besides ambient, so the numbers are generous.
export const LIGHT_TORCH_RADIUS_CELLS   = 12;
export const LIGHT_TORCH_DURATION_SEC   = 10 * 60;
export const LIGHT_TORCH_COLOR          = 0xffaa44;
export const LIGHT_TORCH_INTENSITY      = 3.0;

export const LIGHT_LANTERN_RADIUS_CELLS = 24;
export const LIGHT_LANTERN_DURATION_SEC = 15 * 60;
export const LIGHT_LANTERN_COLOR        = 0xffcc77;
export const LIGHT_LANTERN_INTENSITY    = 3.5;

export const LIGHT_SPELL_RADIUS_CELLS   = 14;
export const LIGHT_SPELL_DURATION_SEC   = 5 * 60;
export const LIGHT_SPELL_COLOR          = 0xcfe6ff;
export const LIGHT_SPELL_INTENSITY      = 2.0;
export const LIGHT_SPELL_MANA_COST      = 10;

// Monster non-equipment drops
export const LOOT_TORCH_CHANCE         = 0.03; // 3% per slain enemy
// Base reagent drop chance per tier, before dungeon-level bonus.
// Each tier rolls independently when the dungeon level qualifies.
// +1% per dungeon level added at roll time, capped at 10%.
export const LOOT_REAGENT_COMMON_BASE    = 0.05; // common drops on all levels
export const LOOT_REAGENT_UNCOMMON_BASE  = 0.05; // uncommon drops level 4+
export const LOOT_REAGENT_RARE_BASE      = 0.05; // rare drops level 7+
export const LOOT_REAGENT_CHANCE_PER_LVL = 0.01; // +1% per dungeon level
export const LOOT_REAGENT_CHANCE_MAX     = 0.10; // capped at 10%
// Epic and higher reagents have a flat 1% drop rate (no level bonus) starting at the
// specified dungeon level. Bosses guarantee 1, mega-bosses guarantee 2 of each.
export const LOOT_REAGENT_EPIC_BASE      = 0.01; // epic drops level 15+
export const LOOT_REAGENT_LEGENDARY_BASE = 0.01; // legendary drops level 20+
export const LOOT_REAGENT_MYTHIC_BASE    = 0.01; // mythic drops level 25+
export const LOOT_REAGENT_DIVINE_BASE    = 0.01; // divine drops level 30+

// Cleric revive (level 3+)
export const CLERIC_REVIVE_MANA_COST   = 25;
export const CLERIC_REVIVE_MIN_LEVEL   = 3;
export const CLERIC_REVIVE_HEAL_FRAC   = 0.25; // heals back to 25% HP

// Trap poison out-of-combat tick
export const POISON_EXPLORATION_TICK_SEC = 10; // one "round" every 10 seconds outside combat

// ──────────────────────────────────────────
// Food / Hunger system
// ──────────────────────────────────────────
// Food is consumed once per FOOD_CHECK_INTERVAL seconds of exploration time.
// Missed checks advance: null → 'hungry' → 'starving' → 'dying'.
// Eating immediately resets to null (fed).
export const FOOD_CHECK_INTERVAL    = 900;  // 15 minutes of exploration time
export const FOOD_HUNGRY_PENALTY    = 1;    // -1 damage & defense per missed check tier
export const FOOD_DYING_HP_PER_MIN  = 2;    // HP drained per real minute when 'dying'

// ──────────────────────────────────────────
// Phase 12 — Artificer / Paladin / Reagent tiers / Crafting
// ──────────────────────────────────────────

// Reagent drop tiers — keyed by dungeon level of the slain enemy.
// L1-3 drops common, L4-6 uncommon, L7+ rare, L15+ epic, L20+ legendary, L25+ mythic, L30+ divine.
// Bosses guarantee 1 (mega-bosses 2) of every qualifying tier on top of random drops.
export const REAGENT_TIER_UNCOMMON_MIN   = 4;   // uncommon starts dropping at level 4
export const REAGENT_TIER_RARE_MIN       = 7;   // rare starts dropping at level 7
export const REAGENT_TIER_EPIC_MIN       = 15;  // epic starts dropping at level 15
export const REAGENT_TIER_LEGENDARY_MIN  = 20;  // legendary starts dropping at level 20
export const REAGENT_TIER_MYTHIC_MIN     = 25;  // mythic starts dropping at level 25
export const REAGENT_TIER_DIVINE_MIN     = 30;  // divine starts dropping at level 30
// Guaranteed boss drops (per qualifying tier)
export const REAGENT_BOSS_RARE_MIN      = 1;
export const REAGENT_BOSS_RARE_MAX      = 2;
// Boss guarantees 1, mega-boss guarantees 2 for epic/legendary/mythic/divine (each)
export const REAGENT_BOSS_HIGH_TIER_AMOUNT      = 1;
export const REAGENT_MEGABOSS_HIGH_TIER_AMOUNT  = 2;

// Artificer class scaling
export const ARTIFICER_RANGED_PER_LEVEL = 1;
// Scatter Shot: main target + N splash at half damage. N = SCATTER_SPLASH_BASE
// at L1, +1 per SCATTER_SPLASH_EVERY levels (L5 → 3 splashes, L10 → 4, …).
export const SCATTER_SPLASH_BASE    = 2;
export const SCATTER_SPLASH_EVERY   = 5;
export const SCATTER_SPLASH_FRACTION = 0.5; // splash damage = half
export const ARTIFICER_DRONE_UNLOCK_LEVEL = 25;
export const ARTIFICER_DRONE_CHANCE_CAP   = 0.75; // level% chance, capped at 75%

// Paladin class
export const PALADIN_MELEE_PER_LEVEL   = 1;
export const PALADIN_DEFENSE_PER_LEVEL = 1;
// Smite: armor-ignoring holy melee; 5 MP; % chance to instakill undead/demon tags.
// Base 1% + 1% per paladin level.
export const PALADIN_SMITE_MANA_COST   = 5;
export const PALADIN_SMITE_INSTAKILL_BASE      = 0.01;
export const PALADIN_SMITE_INSTAKILL_PER_LEVEL = 0.01;
// Paladin heals at half cleric effectiveness.
export const PALADIN_HEAL_MANA_COST = 5;
// Fire Aura: 4 MP/round upkeep; reflects melee dmg back as fire damage.
export const PALADIN_FIRE_AURA_MANA_PER_ROUND = 4;
export const PALADIN_HEAL_PERCENT   = CLERIC_HEAL_PERCENT / 2;       // 12.5%
export const PALADIN_HEAL_PER_LEVEL = CLERIC_HEAL_PER_LEVEL / 2;     // +1% per level

// Paladin L20 special abilities
export const PALADIN_L20_UNLOCK_LEVEL        = 20;
export const PALADIN_SMITE_INSTAKILL_CAP     = 0.50; // purge chance hard cap (50%)
export const PALADIN_SMITE_BOSS_DAMAGE_MULT  = 4;    // on bosses/mega-bosses: x4 damage instead of instant kill
export const PALADIN_AOE_SMITE_MANA_MULT     = 3;    // 3× normal smite mana
export const PALADIN_AOE_SMITE_DAMAGE_MULT   = (1 / 3); // 1/3 normal smite damage
export const PALADIN_AOE_SMITE_INSTAKILL_MULT = (1 / 3); // 1/3 normal purge chance
export const PALADIN_DRAGONSLAYER_UNLOCK_LEVEL = 25;
export const PALADIN_DRAGONSLAYER_MANA_PER_ROUND = 15;
export const PALADIN_DRAGON_AURA_PERCENT_OFFSET = 10; // base: level + 10 %
export const PALADIN_DRAGON_AURA_PERCENT_CAP    = 90; // hard cap: 90%

// Monk L20 special: Quivering Palm
export const MONK_QUIVERING_PALM_UNLOCK_LEVEL    = 20;
export const MONK_QUIVERING_PALM_DURATION_BASE   = 2; // 2 rounds at L20
export const MONK_QUIVERING_PALM_DURATION_PER_10LV = 1; // +1 per 10 levels above 20
export const MONK_QUIVERING_PALM_STACK_CAP_DIVISOR = 5; // cap = floor(highestMonkLevel/5)
export const MONK_QUIVERING_PALM_STACK_CAP_MAX   = 10;  // absolute max cap rounds
export const MONK_QUIVERING_PALM_STAMINA_MULT    = 2;   // costs 2x normal melee stamina
export const MONK_QUIVERING_PALM_MANA_MULT       = 2;   // costs 2x normal monk melee mana

// Cleric L20 special abilities
export const CLERIC_MASS_REGEN_UNLOCK_LEVEL      = 20;
export const CLERIC_MASS_REGEN_BASE_PCT          = 0.10;  // 10% max HP healed per round
export const CLERIC_MASS_REGEN_PER_3_LEVELS      = 0.01;  // +1% per 3 cleric levels
export const CLERIC_MASS_REGEN_DURATION_PER_4LV  = 1;     // floor(level/4) rounds total
export const CLERIC_MASS_REGEN_MANA_COST         = 15;
export const CLERIC_MASS_REVIVE_UNLOCK_LEVEL     = 20;
export const CLERIC_MASS_REVIVE_COUNT_DIVISOR    = 7;     // revives floor(level/7) allies
export const CLERIC_MASS_REVIVE_HEAL_BASE        = 0.33;  // 33% max HP base restore
export const CLERIC_MASS_REVIVE_HEAL_PER_3LV     = 0.01;  // +1% per 3 cleric levels
export const CLERIC_MASS_REVIVE_MANA_COST        = 30;

// Crafting — enchantment pricing and ingredient costs.
// Weapons get flat +N damage; armor gets flat +N defense.
// Values are indexed by enchant level (1..7).
// +4 requires the first epic reagent; +5 legendary; +6 mythic; +7 divine.
export const ENCHANT_WEAPON_COSTS = [
    null,
    { gold:   100, common: 3, uncommon:  0, rare:  0, epic: 0, legendary: 0, mythic: 0, divine: 0 },
    { gold:   400, common: 2, uncommon:  2, rare:  0, epic: 0, legendary: 0, mythic: 0, divine: 0 },
    { gold:   900, common: 1, uncommon:  2, rare:  1, epic: 0, legendary: 0, mythic: 0, divine: 0 },
    { gold:  5000, common:10, uncommon:  5, rare:  3, epic: 1, legendary: 0, mythic: 0, divine: 0 },
    { gold: 10000, common:15, uncommon: 10, rare:  5, epic: 3, legendary: 1, mythic: 0, divine: 0 },
    { gold: 25000, common:20, uncommon: 15, rare: 10, epic: 5, legendary: 3, mythic: 1, divine: 0 },
    { gold: 50000, common:25, uncommon: 20, rare: 15, epic:10, legendary: 5, mythic: 3, divine: 1 },
];
export const ENCHANT_ARMOR_COSTS = [
    null,
    { gold:   100, common: 3, uncommon:  0, rare:  0, epic: 0, legendary: 0, mythic: 0, divine: 0 },
    { gold:   400, common: 2, uncommon:  2, rare:  0, epic: 0, legendary: 0, mythic: 0, divine: 0 },
    { gold:   900, common: 1, uncommon:  2, rare:  1, epic: 0, legendary: 0, mythic: 0, divine: 0 },
    { gold:  5000, common:10, uncommon:  5, rare:  3, epic: 1, legendary: 0, mythic: 0, divine: 0 },
    { gold: 10000, common:15, uncommon: 10, rare:  5, epic: 3, legendary: 1, mythic: 0, divine: 0 },
    { gold: 25000, common:20, uncommon: 15, rare: 10, epic: 5, legendary: 3, mythic: 1, divine: 0 },
    { gold: 50000, common:25, uncommon: 20, rare: 15, epic:10, legendary: 5, mythic: 3, divine: 1 },
];

// Weapon "rider" enchantments — added on top of a +N weapon. Each costs 1 uncommon + 1 rare.
// Proc chance = RIDER_PROC_CHANCE on player melee/ranged hits.
// - fire      : strong burn DoT. DoT deals 50% more base damage and lasts 1 extra round.
// - acid      : DoT + defense debuff (armor softens).
// - poison    : DoT + attack (damage) debuff.
// - lightning : 1-round stun + attack (damage) debuff.
// - ice       : 1-round stun + defense debuff.
// DoT lasts (1 + weapon enchant level) rounds; damage = 33% of the original hit.
// Debuff magnitude = 1 + enchant level; debuff duration = 1 + enchant level rounds.
// Debuffs do NOT stack but REFRESH on new hit. DoTs are tracked per rider type.
export const RIDER_PROC_CHANCE              = 0.25;
export const RIDER_DOT_DAMAGE_FRACTION      = 1 / 3;
export const RIDER_FIRE_DAMAGE_BONUS_MULT   = 1.5;   // fire DoT = 50% more than base
export const RIDER_FIRE_BONUS_ROUNDS        = 1;     // fire lasts 1 extra round
export const RIDER_DOT_BASE_ROUNDS          = 1;     // + enchant level
export const RIDER_DEBUFF_BASE_ROUNDS       = 1;     // + enchant level
export const RIDER_COST = { gold: 300, common: 0, uncommon: 1, rare: 1 };
export const RIDER_TYPES = ['fire', 'acid', 'poison', 'lightning', 'ice'];

// Potions
export const POTION_BUFF_DURATION_SEC = 5 * 60;         // exploration-time seconds
export const POTION_BUFF_ROUNDS       = 20;             // combat-round fallback cap
export const POTION_MINOR_HEAL_PCT    = 0.40;
export const POTION_GREATER_HEAL_PCT  = 0.75;
export const POTION_WARD_DEF_BONUS    = 2;   // base value (AL 0); use calcScrollBonus() for scaled value
export const POTION_WRATH_DMG_BONUS   = 2;   // base value (AL 0); use calcScrollBonus() for scaled value

// Scroll bonus scales with artificer level: +2 base, +1 per 5 AL.
export const SCROLL_BONUS_BASE    = 2;
export const SCROLL_BONUS_PER_5AL = 1;

/** Bonus granted by a Warding/Wrath scroll crafted by an artificer of this level. */
export function calcScrollBonus(AL) {
    return SCROLL_BONUS_BASE + Math.floor((AL || 0) / 5);
}

/**
 * Crafting cost for one Warding or Wrath scroll at a given artificer level.
 *   Common:   = bonus (2 base + 1 per extra bonus point)
 *   Uncommon: +1 per +5 total bonus  → floor(bonus / 5)
 *   Rare:     +1 per +10 total bonus → floor(bonus / 10)
 */
export function calcScrollCost(AL) {
    const bonus = calcScrollBonus(AL);
    return {
        gold:     25,
        common:   bonus,
        uncommon: Math.floor(bonus / 5),
        rare:     Math.floor(bonus / 10),
    };
}

export const POTION_COSTS = {
    minor_healing_potion:  { gold: 25, common: 2, uncommon: 0, rare: 0 },
    greater_healing_potion:{ gold: 25, common: 1, uncommon: 1, rare: 0 },
    // Scroll costs are dynamic — use calcScrollCost(AL) in UI. These are AL-0 fallbacks.
    elixir_warding:        { gold: 25, common: 2, uncommon: 0, rare: 0 },
    elixir_wrath:          { gold: 25, common: 2, uncommon: 0, rare: 0 },
};

// Golems — persistent artificer summons. Damage = melee roll + artificer level.
// HP = BASE_HP + HP_PER_AL × artificerLevel. Defense = BASE_DEF + artificerLevel.
// Permadeath — no cleric revive, no resurrect potion. Only artificer can heal
// golems, using 1 reagent of the golem's tier to restore 50% max HP.
export const GOLEM_TIERS = [
    {
        id: 'flesh',
        name: 'Flesh Golem',
        icon: '\u{1F9DF}',
        unlockLevel: 1,
        reagentTier: 'common',
        cost: { gold: 100, common: 5, uncommon: 0, rare: 0 },
        baseHp: 40, hpPerAL: 5,
        baseDef: 2,
        meleeMin: 3, meleeMax: 8,
        // Regenerates 10% of max HP per own turn.
        regenPercent: 0.10,
        immune: ['poison', 'stun'],
        description: 'Crude stitched flesh. Regenerates 10% of max HP each round. Cheap but soft. Immune to poison and stun.',
    },
    {
        id: 'clay',
        name: 'Clay Golem',
        icon: '\u{1F5FF}',
        unlockLevel: 5,
        reagentTier: 'uncommon',
        cost: { gold: 500, common: 10, uncommon: 3, rare: 0 },
        baseHp: 70, hpPerAL: 5,
        baseDef: 4,
        meleeMin: 5, meleeMax: 12,
        // 25% chance to reflect 50% of incoming damage back at attacker.
        reflectChance: 0.25,
        reflectFraction: 0.5,
        immune: ['poison', 'stun'],
        description: 'Hardened clay shell. 25% chance to reflect 50% of incoming damage. Immune to poison and stun.',
    },
    {
        id: 'stone',
        name: 'Stone Golem',
        icon: '\u{1FAA8}',
        unlockLevel: 10,
        reagentTier: 'rare',
        cost: { gold: 2500, common: 15, uncommon: 5, rare: 1 },
        baseHp: 120, hpPerAL: 5,
        baseDef: 7,
        meleeMin: 6, meleeMax: 14,
        // AoE slam every 3 rounds; 25% stun on slam.
        slamEvery: 3,
        slamStunChance: 0.25,
        immune: ['poison', 'stun'],
        description: 'Living masonry. Every 3rd round it slams the ground, hitting every enemy (25% stun). Immune to poison and stun.',
    },
    {
        id: 'iron',
        name: 'Iron Golem',
        icon: '\u{1F916}',
        unlockLevel: 15,
        reagentTier: 'rare',
        cost: { gold: 12500, common: 20, uncommon: 8, rare: 3 },
        baseHp: 200, hpPerAL: 5,
        baseDef: 10,
        meleeMin: 8, meleeMax: 18,
        // Cleaves one extra target on melee; immune to poison, stun, web.
        cleaveTargets: 1,
        immune: ['poison', 'stun', 'web'],
        description: 'Forged war-engine. Cleaves one extra enemy each melee. Immune to poison, stun, and web.',
    },
    {
        id: 'mithril',
        name: 'Mithril Golem',
        icon: '\u{1F47E}',  // 👾 alien/construct face (distinct from iron golem's 🤖)
        unlockLevel: 20,
        reagentTier: 'rare',
        cost: { gold: 62500, common: 30, uncommon: 15, rare: 8 },
        baseHp: 320, hpPerAL: 8,
        baseDef: 14,
        meleeMin: 14, meleeMax: 28,
        // Force AoE: each turn blasts floor(artificerLevel / 3) enemies
        // (minimum 1) with melee-range force damage.
        forceAoe: true,
        immune: ['poison', 'stun', 'web'],
        description: 'Living mithril construct. Each turn unleashes a wave of kinetic force, striking floor(AL/3) enemies at once. Immune to poison, stun, and web.',
    },
    {
        id: 'adamantine',
        name: 'Adamantine Golem',
        icon: '\u{1F5FF}',  // reuse stone icon (dark statue look)
        unlockLevel: 25,
        reagentTier: 'epic',
        cost: { gold: 250000, common: 40, uncommon: 25, rare: 15, epic: 5, legendary: 1 },
        baseHp: 500, hpPerAL: 10,
        baseDef: 20,
        meleeMin: 18, meleeMax: 36,
        // Fires floor(AL/5) armor-piercing bolts per turn, each with
        // (20 + floor(AL/2))% crit chance for double damage.
        // Takes half damage from magic, AoE, and ranged attacks.
        adamantineBolts: true,
        halfDmgSpecial: true,
        immune: ['poison', 'stun', 'web'],
        description: 'Near-indestructible alloy engine. Fires floor(AL/5) armor-piercing bolts per turn, each bypassing armor (each crits at 20%+AL/2%). Takes half damage from magic, AoE, and ranged. Immune to poison, stun, and web.',
    },
    {
        id: 'divine_soul',
        name: 'Divine Soul Golem',
        icon: '\u{1F4AB}',  // 💫
        unlockLevel: 30,
        reagentTier: 'divine',
        cost: { gold: 1000000, common: 50, uncommon: 35, rare: 25, epic: 10, legendary: 5, mythic: 3, divine: 1 },
        baseHp: 800, hpPerAL: 15,
        baseDef: 28,
        meleeMin: 25, meleeMax: 50,
        // AoE divine purge: hits floor(AL/3) enemies per turn.
        // 33% chance each round to heal living, non-undead, non-golem party members
        // for 10% of that ally's lost HP.
        // Takes half damage from magic, AoE, and ranged.
        divineSoul: true,
        halfDmgSpecial: true,
        immune: ['poison', 'stun', 'web'],
        description: 'A vessel of pure divine will. Each turn strikes floor(AL/3) enemies with divine melee damage, ignoring half their defense, with a 20% chance to stun each target. Each living ally (including summoned beasts) has a 33% independent chance per round to be healed for 10% of that ally\'s lost HP. Takes half damage from magic, AoE, and ranged. Immune to poison, stun, and web.',
    },
];

export const ARTIFICER_HEAL_GOLEM_PCT = 0.5;   // uses 1 reagent of tier → 50% max HP
export const ARTIFICER_TRINKET_AUGMENT_UNLOCK_LEVEL = 25;
export const TRINKET_AUGMENT_MIN_LEVEL = 4;
export const TRINKET_AUGMENT_MAX_LEVEL = 7;
export const TRINKET_AUGMENT_POOL_PCT_BY_LEVEL = {
    4: 0.05,
    5: 0.10,
    6: 0.15,
    7: 0.20,
};
export const TRINKET_AUGMENT_REGEN_BY_LEVEL = {
    4: 2,
    5: 4,
    6: 6,
    7: 8,
};
export const ARTIFICER_GOLEM_ATTACHMENT_UNLOCK_LEVEL = 25;
export const GOLEM_ATTACHMENT_LIMB_DAMAGE_MULT = 0.50;
export const GOLEM_ATTACHMENT_MAX_LIMBS = 2;
export const GOLEM_ATTACHMENT_SHIELD_DEFENSE = 10;
export const GOLEM_ATTACHMENT_SHIELD_BLOCK_CHANCE = 0.25;
export const GOLEM_ATTACHMENT_MAX_TRINKETS = 5;
export const GOLEM_ATTACHMENT_TRINKET_HP_MULT = 0.20;

// Enemy tag categories — used by paladin Smite, crafted rider flavour, etc.
// Mirrors the existing UNDEAD_TIERS kind='undead' and BEAST_TYPES kind='beast'.
// Per-enemy tags are applied via the optional `tags` array on each ENEMY_TYPES
// entry. A monster may carry multiple tags (e.g. imp = ['demon']).
// Known tags today: 'undead', 'demon', 'beast', 'humanoid', 'vermin', 'monster', 'construct', 'aberration', 'fireborn', 'incorporeal'.
export const MONSTER_TAG_UNDEAD = 'undead';
export const MONSTER_TAG_DEMON  = 'demon';
export const MONSTER_TAG_BEAST  = 'beast';

export const MONSTER_TAG_INCORPOREAL = 'incorporeal';
export const GHOUL_PARALYZE_CHANCE   = 0.40;   // necromancer ghoul: 40% to paralyze on hit
export const TREANT_HOLD_CHANCE      = 0.33;   // treant branch: 33% to hold target 1 round

// ── Boss stun/turn-loss resistance ───────────────────────────────────────────
// All player-inflicted stuns (melee, magic, summon abilities, weapon riders)
// are gated through _tryStunEnemy() which rolls these resist chances.
export const STUN_BOSS_RESIST_CHANCE     = 1.0;   // regular boss: fully immune to player stuns
export const STUN_MEGABOSS_RESIST_CHANCE = 1.0;   // mega-boss: fully immune to player stuns
export const BARD_SONG_MANA_PER_MIN  = 5;      // ongoing mana drain while bard song is active
export const BARD_SONG_ACTIVATION_MANA = 0;    // no upfront activation cost

// ── Bard L20: Charm Monster ───────────────────────────────────────────────
// Chance = BARD_CHARM_BASE_CHANCE + (1% per 2 bard levels).
// Duration = floor(bardLevel / BARD_CHARM_DURATION_DIVISOR) rounds.
// Tags immune to charm: 'undead', 'elemental', 'construct'. Bosses/mega-bosses also immune.
export const BARD_CHARM_UNLOCK_LEVEL     = 20;
export const BARD_CHARM_MANA_COST        = 50;
export const BARD_CHARM_BASE_CHANCE      = 0.50;   // 50% at L1; +1%/2 levels → 60% at L20
export const BARD_CHARM_CHANCE_PER_2_LV  = 0.005;  // 0.5% per level = 1% per 2 levels
export const BARD_CHARM_DURATION_DIVISOR = 5;       // floor(bardLevel/5) rounds; L20 → 4 rounds
export const BARD_CHARM_IMMUNE_TAGS      = ['undead', 'elemental', 'construct'];
export const BARD_RALLYING_MELODY_UNLOCK_LEVEL = 25;
export const BARD_RALLYING_MELODY_MANA_COST = 40;
export const BARD_RALLYING_MELODY_RESTORE_FRACTION = 0.10;

// ── Ranger L20: Explosive Arrow ───────────────────────────────────────────
// Hits ALL alive enemies at half post-defense damage.
// Half normal crit chance and half normal instakill chance vs favored enemies.
// Costs RANGED_STAMINA_COST * RANGER_EXPLOSIVE_ARROW_STAMINA_MULT stamina.
export const RANGER_EXPLOSIVE_ARROW_UNLOCK_LEVEL  = 20;
export const RANGER_EXPLOSIVE_ARROW_STAMINA_MULT  = 3;    // 3× normal ranged stamina = 6 ST
export const RANGER_EXPLOSIVE_ARROW_DAMAGE_MULT   = 0.667; // ~⅔ post-defense damage per target
export const RANGER_EXPLOSIVE_ARROW_CRIT_MULT     = 0.667; // ~⅔ normal crit chance (≈66%)
export const RANGER_EXPLOSIVE_ARROW_INSTAKILL_MULT = 0.5; // half normal instakill chance

// ── Ranger L20+: Extra Favored Enemy slots ────────────────────────────────
// At L20 rangers gain 1 extra favored enemy slot; +1 more every 5 levels.
// floor((level - 15) / 5) extra slots (0 below L20, 1 at L20, 2 at L25, etc.)
export const RANGER_EXTRA_FAVORED_UNLOCK_LEVEL = 20;
export const RANGER_EXTRA_FAVORED_BASE_LEVEL   = 15;  // offset so floor((20-15)/5)=1
export const RANGER_EXTRA_FAVORED_PER_5_LV     = 5;   // gain one slot every 5 levels

// ── Rogue L20: Backstab Bleed ─────────────────────────────────────────────
// After a backstab at L20+, the target gains a bleed DoT.
// Bleed damage = floor(dealt * ROGUE_BACKSTAB_BLEED_FRAC) per round.
// Duration = floor(rogueLevel / ROGUE_BACKSTAB_BLEED_DURATION_DIVISOR) rounds.
// Tags immune to bleed: 'undead', 'construct', 'elemental', 'incorporeal'.
export const ROGUE_BACKSTAB_BLEED_UNLOCK_LEVEL   = 20;
export const ROGUE_BACKSTAB_BLEED_FRAC           = 0.50;  // 50% of dealt damage per tick
export const ROGUE_BACKSTAB_BLEED_DURATION_DIVISOR = 5;   // floor(level/5) rounds; L20 → 4

// ── Druid L20 — Commune / Faerie Queen ───────────────────────────────────────
export const DRUID_COMMUNE_UNLOCK_LEVEL      = 20;
export const DRUID_COMMUNE_FAE_TOKENS_NEEDED = 3;   // tokens to summon FQ
export const FAERIE_QUEEN_DEFENSE_BASE       = 30;  // +1 per druid level
export const FAERIE_QUEEN_HOLD_BASE          = 0.33; // +1% per 3 levels of FQ
export const FAERIE_QUEEN_HOLD_PER_3LV       = 0.01;
export const FAERIE_QUEEN_POISON_FRAC_BASE   = 0.50; // fraction of hit damage as poison/round
export const FAERIE_QUEEN_POISON_FRAC_PER_LV = 0.01; // +1% per FQ level
export const FAERIE_QUEEN_MAGIC_DMG_RESIST   = 0.50; // 50% less from magic/AoE
export const FAERIE_QUEEN_HP_MULT            = 2;    // 2× druid maxHealth

// ── Mage L20 — Mirror Image & AoE Crit ──────────────────────────────────────
export const MAGE_MIRROR_IMAGE_UNLOCK_LEVEL  = 20;
export const MAGE_MIRROR_IMAGE_MANA_COST     = 35;
export const MAGE_MIRROR_IMAGE_COUNT_DIVISOR = 7;    // floor(level/7) images
export const MAGE_AOE_CRIT_CHANCE_PER_2LV    = 0.01; // 1% per 2 mage levels
export const MAGE_AOE_CRIT_DAMAGE_BASE       = 2.0;  // ×2 base (+100%)
export const MAGE_AOE_CRIT_DAMAGE_PER_LV     = 0.01; // +1% per mage level
export const MAGE_FAMILIAR_UNLOCK_LEVEL      = 25;
export const MAGE_FAMILIAR_MAX_LEVEL         = 20;
export const MAGE_FAMILIAR_GOLD_PER_LEVEL    = 10000;
export const MAGE_FAMILIAR_MAGIC_PER_LEVEL   = 0.10; // +10% magic / AoE damage per familiar level
export const MAGE_FAMILIAR_DEFENSE_PER_LEVEL = 1;

// Druid L25: Shambling Mound summon
export const DRUID_SHAMBLING_MOUND_UNLOCK_LEVEL = 25;
export const DRUID_SHAMBLING_MOUND_MANA_COST    = 100;

// Rogue L25: field trap tools + anti-magic evasion
export const ROGUE_TRAP_UNLOCK_LEVEL        = 25;
export const ROGUE_TRAP_DOT_FRACTION        = 0.50;
export const ROGUE_TRAP_DOT_ROUNDS          = 3;
export const ROGUE_EVASION_STAMINA_COST     = 2;

// ── Necromancer L20 — Lich Form ──────────────────────────────────────────────
export const NECRO_LICH_FORM_UNLOCK_LEVEL    = 20;
export const NECRO_LICH_FORM_MANA_PER_ROUND  = 15;   // mana upkeep per round in lich form
export const NECRO_LICH_REVIVE_HP_BASE       = 0.50; // 50% HP on phial revive
export const NECRO_LICH_REVIVE_HP_PER_2LV    = 0.01; // +1% per 2 levels over 20
export const NECRO_LICH_REVIVE_ROUNDS        = 3;    // rounds in phial before revival
export const NECRO_LICH_MAGIC_RESIST_BASE    = 0.50; // 50% magic/AoE resistance
export const NECRO_LICH_MAGIC_RESIST_PER_4LV = 0.01; // +1% per 4 levels over 20
