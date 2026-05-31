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

// Wandering monster encounter system — per-round attraction to active combat
// Each round, every hostile enemy within WANDERER_MAX_DISTANCE grid cells of the
// encounter centre rolls a chance to join.  Chance = max(0, BASE − dist × PER_CELL).
// At distance 0 → 50 %, distance 5 → 25 %, distance 10 → 0 % (never joins).
// Distance is Euclidean: a monster 5E+3S is sqrt(34) ≈ 5.83 cells away.
export const WANDERER_BASE_CHANCE        = 0.50;  // 50 % base chance at distance 0
export const WANDERER_CHANCE_PER_CELL    = 0.05;  // −5 % per grid cell of distance
export const WANDERER_MAX_DISTANCE       = 10;    // monsters beyond 10 cells never join (round 1)
export const WANDERER_ROUND_CHANCE_BONUS = 0.05;  // +5 % base chance per round elapsed
export const WANDERER_ROUND_DIST_BONUS   = 1;     // +1 cell max distance per round elapsed

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
    slime:    { name: 'Slime',    spriteW: 1.2, spriteH: 1.0, poisonChance: 0.25, tags: ['slime'], immune: ['acid', 'stun', 'hold', 'web', 'paralyze'] },
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
    spore_fungus: { name: 'Spore Fungus',    spriteW: 1.4, spriteH: 1.6, aoeMagic: true, aoePoisonChance: 0.35, tags: ['monster', 'plant'] },
    shrieker:     { name: 'Shrieker',        spriteW: 1.2, spriteH: 1.6, aoeMagic: true, aoeStunChance: 0.20, sonic: true, tags: ['monster', 'plant'] },
    kobold:       { name: 'Kobold',          spriteW: 1.0, spriteH: 1.4, tags: ['humanoid'] },
    kobold_shaman:{ name: 'Kobold Shaman',   spriteW: 1.0, spriteH: 1.5, aoeMagic: true, tags: ['humanoid'] },
    cave_fisher:  { name: 'Cave Fisher',     spriteW: 1.8, spriteH: 1.4, webChance: 0.50, tags: ['beast', 'vermin'] },
    stirge:       { name: 'Stirge',          spriteW: 1.2, spriteH: 1.0, isStirgeAI: true, tags: ['beast', 'vermin'] },
    acid_slime:   { name: 'Acid Slime',      spriteW: 1.2, spriteH: 1.0, poisonChance: 0.55, tags: ['slime'], immune: ['acid', 'stun', 'hold', 'web', 'paralyze'] },
    flame_imp:    { name: 'Flame Imp',       spriteW: 1.0, spriteH: 1.2, aoeMagic: true, tags: ['demon'], immune: ['fire'] },
    bone_gnasher: { name: 'Bone Gnasher',    spriteW: 1.4, spriteH: 1.4, stunChance: 0.35, tags: ['undead'] },
    blood_wasp:   { name: 'Blood Wasp',      spriteW: 1.4, spriteH: 1.0, poisonChance: 0.40, tags: ['beast', 'vermin'] },
    ice_sprite:   { name: 'Ice Sprite',      spriteW: 1.0, spriteH: 1.2, aoeMagic: true, aoeStunChance: 0.15, tags: ['monster'], immune: ['cold'] },
    stone_hag:    { name: 'Stone Hag',       spriteW: 1.4, spriteH: 1.8, isHagAI: true, hagCurseChance: 0.30, stunChance: 0.30, regenPercent: 0.08, tags: ['humanoid'] },
    ghoul_pup:    { name: 'Ghoul Pup',       spriteW: 1.2, spriteH: 1.2, poisonChance: 0.30, stunChance: 0.20, tags: ['undead'] },
    myconid:      { name: 'Myconid',         spriteW: 1.4, spriteH: 1.8, aoeMagic: true, aoePoisonChance: 0.25, tags: ['monster', 'plant'] },
    dust_devil:   { name: 'Dust Devil',      spriteW: 1.4, spriteH: 1.8, aoeMagic: true, aoeStunChance: 0.10, tags: ['demon'] },
    vampire_bat:  { name: 'Vampire Bat',     spriteW: 1.6, spriteH: 1.0, isVampireBatAI: true, tags: ['beast', 'vermin'] },
    tunnel_worm:  { name: 'Tunnel Worm',     spriteW: 1.8, spriteH: 1.0, poisonChance: 0.40, webChance: 0.15, tags: ['beast', 'vermin'] },

    // ── New monsters (unbounded dungeon level) ────────────────────────
    banshee:         { name: 'Banshee',          spriteW: 1.4, spriteH: 2.0, aoeMagic: true, aoeStunChance: 0.40, sonic: true, tags: ['undead', 'incorporeal'] },
    lich:            { name: 'Lich',             spriteW: 1.4, spriteH: 2.0, aoeMagic: true, aoeMagicDamageMult: 1.25, regenPercent: 0.05, tags: ['undead'] },
    minotaur:        { name: 'Minotaur',         spriteW: 1.8, spriteH: 2.2, stunChance: 0.40, tags: ['humanoid', 'beast'] },
    shadow:          { name: 'Shadow',           spriteW: 1.2, spriteH: 2.0, phaseStrike: true, lifeDrain: 0.30, tags: ['undead', 'incorporeal'] },
    ogre:            { name: 'Ogre',             spriteW: 2.0, spriteH: 2.2, stunChance: 0.45, tags: ['humanoid'] },
    dark_elf:        { name: 'Dark Elf',         spriteW: 1.2, spriteH: 1.8, rangedAny: true, poisonChance: 0.30, tags: ['humanoid'] },
    harpy:           { name: 'Harpy',            spriteW: 1.6, spriteH: 1.8, aoeMagic: true, aoeStunChance: 0.25, sonic: true, tags: ['beast', 'monster'] },
    giant_scorpion:  { name: 'Giant Scorpion',   spriteW: 2.0, spriteH: 1.2, poisonChance: 0.50, tags: ['beast', 'vermin'] },
    wight:           { name: 'Wight',            spriteW: 1.4, spriteH: 1.8, lifeDrain: 0.35, stunChance: 0.25, tags: ['undead'] },
    gargoyle:        { name: 'Gargoyle',         spriteW: 1.6, spriteH: 2.0, stunChance: 0.35, regenPercent: 0.05, tags: ['construct', 'monster'] },
    phase_spider:    { name: 'Phase Spider',     spriteW: 1.8, spriteH: 1.2, phaseStrike: true, poisonChance: 0.40, tags: ['beast', 'vermin'] },
    tentacle_horror: { name: 'Tentacle Horror',  spriteW: 2.0, spriteH: 1.6, aoeMagic: true, aoePoisonChance: 0.30, webChance: 0.40, tags: ['aberration'] },
    ice_troll:       { name: 'Ice Troll',        spriteW: 1.8, spriteH: 2.2, stunChance: 0.30, regenPercent: 0.20, attackDebuff: 2, tags: ['humanoid'], immune: ['cold'] },
    vampire_spawn:   { name: 'Vampire Spawn',    spriteW: 1.4, spriteH: 1.8, lifeDrain: 0.30, regenPercent: 0.08, tags: ['undead'] },
    mind_flayer:     { name: 'Mind Flayer',      spriteW: 1.4, spriteH: 2.0, aoeMagic: true, aoeStunChance: 0.50, aoeStunPsychic: true, tags: ['aberration'] },
    fire_elemental:  { name: 'Fire Elemental',   spriteW: 1.6, spriteH: 2.0, aoeFire: true, tags: ['construct', 'elemental', 'incorporeal'], immune: ['fire', 'stun', 'poison'] },
    gnoll:           { name: 'Gnoll',            spriteW: 1.4, spriteH: 1.8, rangedAny: true, poisonChance: 0.20, tags: ['humanoid', 'beast'] },
    demon_knight:    { name: 'Demon Knight',     spriteW: 1.8, spriteH: 2.2, stunChance: 0.40, tags: ['demon', 'humanoid'] },
    naga:            { name: 'Naga',             spriteW: 1.8, spriteH: 1.6, poisonChance: 0.45, constrict: 3, rangedAny: true, tags: ['monster', 'beast'] },
    gelatinous_cube: { name: 'Gelatinous Cube',  spriteW: 1.8, spriteH: 1.8, poisonChance: 0.35, paralyzingBite: 2, tags: ['slime'], immune: ['acid', 'stun', 'hold', 'web', 'paralyze'] },

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
        isHagAI: true, hagCurseChance: 0.30, aoeMagic: true,
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
        tags: ['humanoid', 'giant'] },

    // fire_giant: melee+10, hits twice, stun, fire DoT.
    fire_giant:   { name: 'Fire Giant',   spriteW: 2.0, spriteH: 2.4,
        isFireGiantAI: true, stunChance: 0.25,
        tags: ['humanoid', 'giant'], immune: ['fire'] },

    // ice_giant: melee+10, hits twice, stun, ice DoT.
    ice_giant:    { name: 'Ice Giant',    spriteW: 2.0, spriteH: 2.4,
        isIceGiantAI: true, stunChance: 0.25,
        tags: ['humanoid', 'giant'], immune: ['cold'] },

    // stone_giant: ranged+10, throws boulders twice, stun, extra defense.
    stone_giant:  { name: 'Stone Giant',  spriteW: 2.0, spriteH: 2.4,
        isStoneGiantAI: true, stunChance: 0.25, defenseMult: 1.5,
        tags: ['humanoid', 'giant'] },

    // storm_giant: magic+10, lightning bolt hits 3 random back row + stun.
    storm_giant:  { name: 'Storm Giant',  spriteW: 2.0, spriteH: 2.4,
        isStormGiantAI: true,
        tags: ['humanoid', 'giant'], immune: ['lightning'] },

    // giant_frog: poison bite + DoT.
    giant_frog:   { name: 'Giant Frog',   spriteW: 1.6, spriteH: 1.2,
        poisonChance: 0.45,
        tags: ['beast'] },

    // medusa: 3 poison arrows/turn, can hit back row, petrify attempt.
    medusa:       { name: 'Medusa',       spriteW: 1.6, spriteH: 2.0,
        isMedusaAI: true,
        tags: ['humanoid', 'monster'] },

    // hydra: 6+ melee-contact heads (1 per 5 dungeon levels), each can reach any row, regen 15%/round.
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

    // ── Phase 14: Level 25+ Deep Dungeon Monsters ────────────────────
    // ice_demon: 4 powerful melee attacks with ice DoT, immune to cold.
    ice_demon:      { name: 'Ice Demon',           spriteW: 1.8, spriteH: 2.2,
        isIceDemonAI: true,
        hpMult: 2.0, defenseMult: 1.5,
        tags: ['demon'], immune: ['cold'],
        minLevel: 25 },

    // acid_demon: AoE acid blast + DoT, summons acid slimes.
    acid_demon:     { name: 'Acid Demon',           spriteW: 1.8, spriteH: 2.2,
        isAcidDemonAI: true,
        hpMult: 1.8,
        tags: ['demon'], immune: ['acid'],
        minLevel: 25 },

    // bloat_demon: 6 ranged toxin blasts, each inflicting poison DoT.
    bloat_demon:    { name: 'Foul Toxin Bloat Demon', spriteW: 2.2, spriteH: 2.0,
        isBloatDemonAI: true,
        hpMult: 2.5,
        tags: ['demon'], immune: ['poison'],
        minLevel: 25 },

    // dracolich: undead dragon — random breath each turn or 2 claws + bite;
    //            immune to cold, half damage from magic/AoE, undead immunities.
    dracolich:      { name: 'Dracolich',            spriteW: 2.4, spriteH: 2.0,
        isDracolichAI: true,
        hpMult: 3.0, defenseMult: 2.0, halfMagicDamage: true,
        tags: ['undead', 'dragon'], immune: ['cold'],
        minLevel: 25 },

    // evil_necromancer: 60% chance summons 1-3 random undead; else AoE magic + necrotic DoT.
    evil_necromancer: { name: 'Evil Necromancer',   spriteW: 1.4, spriteH: 1.9,
        isEvilNecromancerAI: true,
        hpMult: 1.5,
        tags: ['humanoid'],
        minLevel: 25 },

    // hell_hound: 50% bite (melee + fire DoT) / 50% fire breath (front-row AoE + fire DoT).
    hell_hound:     { name: 'Hell Hound',           spriteW: 1.8, spriteH: 1.4,
        isHellHoundAI: true,
        tags: ['beast', 'demon'], immune: ['fire'],
        minLevel: 25 },

    // evil_berserker: resistPhysical (half from all physical), level/5 base attacks.
    evil_berserker: { name: 'Evil Berserker',       spriteW: 1.8, spriteH: 2.2,
        isEvilBerserkerAI: true,
        hpMult: 1.5, defenseMult: 1.2, resistPhysical: true,
        tags: ['humanoid'],
        minLevel: 25 },

    // ── New Undead Monsters ─────────────────────────────────────────────────
    // mummy: melee-only, resistPhysical 50%, takesDoubleFire, applies Mummy Rot on hit (no healing 3 rds).
    mummy: { name: 'Mummy', spriteW: 1.4, spriteH: 2.0,
        isMummyAI: true,
        resistPhysical: true, takesDoubleFire: true,
        tags: ['undead'],
        minLevel: 3 },

    // revenant: incorporeal phase-strike, teleports past front-row, one-time revive at 50% HP (+50% dmg after).
    revenant: { name: 'Revenant', spriteW: 1.4, spriteH: 2.0,
        isRevenantAI: true,
        phaseStrike: true,
        tags: ['undead', 'incorporeal'], immune: ['cold'],
        minLevel: 6 },

    // bone_archer: ranged-any; at lvl 15+ fires 3-arrow volley; 25% fracture DoT per arrow.
    bone_archer: { name: 'Bone Archer', spriteW: 1.2, spriteH: 1.9,
        isBoneArcherAI: true, rangedAny: true,
        tags: ['undead'],
        minLevel: 4 },

    // poltergeist: 50/50 ranged debris (40% stun) or phase-strike melee; cannot be backstabbed.
    poltergeist: { name: 'Poltergeist', spriteW: 1.2, spriteH: 1.6,
        isPoltergeistAI: true,
        noBackstab: true,
        tags: ['undead', 'incorporeal'],
        minLevel: 5 },

    // zombie_giant: hpMult:3, front-row AoE stomp +50%, 50% prone per target.
    zombie_giant: { name: 'Zombie Giant', spriteW: 2.0, spriteH: 2.4,
        isZombieGiantAI: true,
        hpMult: 3.0,
        tags: ['undead'],
        minLevel: 8 },

    // death_knight (hostile): 2 melee, +30% defense, 30% necrotic curse, 25% shield block, immune cold.
    death_knight: { name: 'Death Knight', spriteW: 1.8, spriteH: 2.2,
        isDeathKnightAI: true,
        defenseMult: 1.3, shieldBlock: 0.25,
        tags: ['undead'], immune: ['cold'],
        minLevel: 10 },

    // ── Bestiary Expansion ────────────────────────────────────────────────
    succubus:         { name: 'Succubus',           spriteW: 1.4, spriteH: 2.0,
        isSuccubusAI: true,
        tags: ['demon'], immune: ['fire', 'poison'] },

    chain_devil:      { name: 'Chain Devil',         spriteW: 1.8, spriteH: 2.0,
        isChainDevilAI: true,
        tags: ['demon'], immune: ['fire'] },

    blood_demon:      { name: 'Blood Demon',         spriteW: 1.8, spriteH: 2.2,
        isBloodDemonAI: true,
        tags: ['demon'], immune: ['fire', 'bleed'] },

    pit_fiend:        { name: 'Pit Fiend',           spriteW: 2.0, spriteH: 2.4,
        isPitFiendAI: true,
        hpMult: 3.0, defenseMult: 2.0,
        tags: ['demon'], immune: ['fire', 'cold'],
        minLevel: 25 },

    quasit:           { name: 'Quasit',              spriteW: 0.8, spriteH: 1.0,
        isQuasitAI: true,
        tags: ['demon'], immune: ['fire', 'poison'] },

    giant_crocodile:  { name: 'Giant Crocodile',     spriteW: 2.2, spriteH: 1.2,
        isGiantCrocodileAI: true,
        hpMult: 1.8,
        tags: ['beast'] },

    chimera:          { name: 'Chimera',             spriteW: 2.2, spriteH: 1.8,
        isChimeraAI: true,
        hpMult: 2.0, defenseMult: 1.5,
        tags: ['beast', 'dragon', 'monster'], immune: ['fire'],
        minLevel: 25 },

    wyvern:           { name: 'Wyvern',              spriteW: 2.0, spriteH: 1.6,
        isWyvernAI: true,
        tags: ['beast', 'dragon'], immune: ['poison'] },

    displacer_beast:  { name: 'Displacer Beast',     spriteW: 1.8, spriteH: 1.4,
        isDisplacerBeastAI: true, displaceChance: 0.40,
        tags: ['beast', 'monster'] },

    remorhaz:         { name: 'Remorhaz',            spriteW: 2.4, spriteH: 1.0,
        isRemorhazAI: true, halfMagicDamage: true, burnRetaliate: 0.30,
        hpMult: 1.6,
        tags: ['beast'], immune: ['fire', 'cold'] },

    thunderbird:      { name: 'Thunderbird',         spriteW: 2.0, spriteH: 1.6,
        isThunderbirdAI: true,
        tags: ['beast', 'monster'], immune: ['lightning'] },

    rust_monster:     { name: 'Rust Monster',        spriteW: 1.6, spriteH: 1.0,
        isRustMonsterAI: true,
        tags: ['beast', 'vermin'] },

    witch_doctor:     { name: 'Witch Doctor',        spriteW: 1.4, spriteH: 1.9,
        isWitchDoctorAI: true, hpMult: 0.5,
        tags: ['humanoid'] },

    gladiator:        { name: 'Gladiator',           spriteW: 1.8, spriteH: 2.0,
        isGladiatorAI: true, defenseMult: 1.5,
        tags: ['humanoid'] },

    assassin_lord:    { name: 'Assassin Lord',       spriteW: 1.4, spriteH: 1.9,
        isAssassinLordAI: true, displaceChance: 0.25,
        tags: ['humanoid'],
        minLevel: 25 },

    battle_mage:      { name: 'Battle Mage',         spriteW: 1.6, spriteH: 2.0,
        isBattleMageAI: true, defenseMult: 1.3, hpMult: 1.5,
        tags: ['humanoid'],
        minLevel: 25 },

    iron_golem:       { name: 'Iron Golem',          spriteW: 2.0, spriteH: 2.4,
        isIronGolemAI: true,
        hpMult: 3.0, defenseMult: 2.0, halfMagicDamage: true,
        tags: ['construct'], immune: ['poison', 'stun', 'bleed', 'fire', 'cold', 'lightning', 'acid'],
        minLevel: 25 },

    clockwork_horror: { name: 'Clockwork Horror',    spriteW: 1.8, spriteH: 1.8,
        isClockworkHorrorAI: true, fullMagicImmune: true, fullDoTImmune: true, acidWeakness: true,
        tags: ['construct'], immune: ['stun', 'poison', 'bleed', 'fire'] },

    gargoyle_sentinel:{ name: 'Gargoyle Sentinel',   spriteW: 1.8, spriteH: 2.2,
        isGargoyleSentinelAI: true, regenPercent: 0.10,
        tags: ['construct', 'monster'] },

    gibbering_mouther:{ name: 'Gibbering Mouther',   spriteW: 1.6, spriteH: 1.4,
        isGibberingMoutherAI: true,
        tags: ['aberration'], immune: ['stun'] },

    aboleth:          { name: 'Aboleth',             spriteW: 2.4, spriteH: 1.6,
        isAbolethAI: true, resistPhysical: true,
        tags: ['aberration'], immune: ['stun'] },

    star_spawn:       { name: 'Star Spawn',          spriteW: 2.0, spriteH: 2.0,
        isStarSpawnAI: true, fullDoTImmune: true,
        tags: ['aberration'], immune: ['stun', 'poison'],
        minLevel: 30 },

    void_wraith:      { name: 'Void Wraith',         spriteW: 1.6, spriteH: 2.2,
        isVoidWraithAI: true, resistPhysical: true, phaseStrike: true,
        tags: ['undead', 'incorporeal', 'elemental'], immune: ['cold', 'poison', 'stun', 'bleed', 'fire'],
        minLevel: 25 },

    vampire_lord:     { name: 'Vampire Lord',        spriteW: 1.8, spriteH: 2.2,
        isVampireLordAI: true, lifeDrain: 0.40, regenPercent: 0.05,
        hpMult: 3.0, defenseMult: 1.5,
        tags: ['undead'], immune: ['poison', 'stun'],
        minLevel: 30 },

    myconid_sovereign:{ name: 'Myconid Sovereign',   spriteW: 1.8, spriteH: 2.0,
        isMyconidSovereignAI: true,
        hpMult: 1.8, defenseMult: 1.3,
        tags: ['monster', 'plant'],
        minLevel: 20 },

    will_o_wisp:      { name: "Will-o'-Wisp",        spriteW: 1.0, spriteH: 1.2,
        isWillOWispAI: true,
        hpMult: 0.7, resistMagic90: true, resistPhysical: true,
        tags: ['undead', 'incorporeal'],
        immune: ['psychic', 'sonic', 'poison', 'bleed', 'stun'],
        minLevel: 30 },

    roper:            { name: 'Roper',               spriteW: 2.2, spriteH: 2.0,
        isRoperAI: true,
        hpMult: 2.5, defenseMult: 1.2,
        tags: ['aberration'],
        minLevel: 30 },

    invisible_stalker:{ name: 'Invisible Stalker',   spriteW: 1.6, spriteH: 2.0,
        isInvisibleStalkerAI: true, isInvisible: true,
        hpMult: 1.3,
        tags: ['elemental'],
        immune: ['poison', 'stun', 'bleed'],
        minLevel: 30 },

    // ── New monsters ─────────────────────────────────────────────────────────
    evil_wizard:   { name: 'Evil Wizard',    spriteW: 1.4, spriteH: 1.9,
        aoeMagic: true, halfMagicDamage: true,
        tags: ['humanoid'] },

    dark_treant:   { name: 'Dark Treant',    spriteW: 2.0, spriteH: 2.4,
        isDarkTreantAI: true, hpMult: 1.5,
        tags: ['monster', 'plant'] },

    mandrake_root: { name: 'Mandrake Root',  spriteW: 1.2, spriteH: 1.6,
        isMandrakeRootAI: true, mandrakeScream: true,
        tags: ['monster', 'plant'] },

    killer_vine:   { name: 'Killer Vine',    spriteW: 2.0, spriteH: 1.4,
        isKillerVineAI: true,
        tags: ['monster', 'plant'] },

    cave_bear:     { name: 'Cave Bear',      spriteW: 2.0, spriteH: 2.0,
        isCaveBearAI: true, hpMult: 1.4,
        tags: ['beast'] },

    cave_lion:     { name: 'Cave Lion',      spriteW: 1.8, spriteH: 1.6,
        isCaveLionAI: true,
        tags: ['beast'] },

    winter_wolf:   { name: 'Winter Wolf',    spriteW: 1.8, spriteH: 1.4,
        isWinterWolfAI: true,
        tags: ['beast'], immune: ['cold'] },

    lizard_folk:   { name: 'Lizard Folk',    spriteW: 1.4, spriteH: 1.8,
        isLizardFolkAI: true, shieldBlock: 0.25,
        tags: ['humanoid'] },

    dread_cultist: { name: 'Dread Cultist',  spriteW: 1.4, spriteH: 1.9,
        isDreadCultistAI: true,
        tags: ['humanoid'], minLevel: 20 },
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
export const MONSTER_MELEE_DAMAGE_BONUS_PER_LEVEL = 0.02;   // monster melee: +2% per level (level 25 → +50%)
export const MONSTER_RANGED_DAMAGE_BONUS_PER_LEVEL = 0.015; // monster ranged: +1.5% per level (level 25 → +37.5%)
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
export const WARRIOR_INTERCEPT_DAMAGE_MULT      = 0.40; // intercepted damage: warrior absorbs 40% post-defense
export const WARRIOR_STUN_RESIST_BASE           = 0.20; // 20% base stun resistance at L20
export const WARRIOR_STUN_RESIST_PER_2_LEVELS   = 0.01; // +1% per 2 levels beyond 1 (so 30% at L20)
export const WARRIOR_RETALIATION_UNLOCK_LEVEL   = 25;
export const WARRIOR_RETALIATION_BASE_CHANCE    = 0.25; // 25% base on successful intercept
export const WARRIOR_RETALIATION_PER_LEVEL      = 0.005; // +0.5% per level (= level / 2 %)
export const WARRIOR_RETALIATION_DAMAGE_MULT    = 0.75; // 75% of a normal melee strike
export const WARRIOR_PERSONAL_BLOCK_RETALIATION_UNLOCK_LEVEL = 35;
export const WARRIOR_TAUNT_UNLOCK_LEVEL         = 35;
export const WARRIOR_TAUNT_STAMINA_PER_ROUND    = 1;
export const WARRIOR_TAUNT_DEFEND_CHANCE_BONUS  = 0.10;
export const WARRIOR_TAUNT_PENALTY_DIVISOR      = 6;
export const WARRIOR_TAUNT_DEFEND_PENALTY_DIVISOR = 4;
export const RANGER_CRIT_PER_LEVEL = 0.03;    // +3% ranged crit per level
export const MAGE_STUN_PER_LEVEL = 0.01;      // +1% magic stun per level
export const ROGUE_INSTAKILL_PER_LEVEL = 0.01;// +1% backstab instakill per level beyond 1
export const MONK_DODGE_PER_LEVEL = 0.005;    // +0.5% dodge per level beyond 1 (+1% per 2 levels)
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
// Extra rage attacks = Math.floor(level / 4)  — baked into barbarianRage() logic
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
export const MONK_AVATAR_DOT_FRACTION = 0.75;
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
// Monsters have a 2% chance to drop a trinket (cloak / amulet / ring / belt),
// scaling with dungeon level up to 30%.
// Trinkets grant +1..+4 to one of: defense, melee, ranged, magic.
export const TRINKET_DROP_CHANCE = 0.02;
export const TRINKET_DROP_CHANCE_MAX = 0.30;
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
export const PALADIN_SMITE_DAMAGE_BONUS_MULT = 1.75; // all Smite/AoE Smite damage gets +75%
export const PALADIN_AOE_SMITE_MANA_MULT     = 3;    // 3× normal smite mana
export const PALADIN_AOE_SMITE_DAMAGE_MULT   = (1 / 3); // 1/3 normal smite damage
export const PALADIN_AOE_SMITE_INSTAKILL_MULT = (1 / 3); // 1/3 normal purge chance
export const PALADIN_DRAGONSLAYER_UNLOCK_LEVEL = 25;
export const PALADIN_DRAGONSLAYER_MANA_PER_ROUND = 15;
export const PALADIN_DRAGON_AURA_PERCENT_OFFSET = 10; // base: level + 10 %
export const PALADIN_DRAGON_AURA_PERCENT_CAP    = 90; // hard cap: 90%

// ── Paladin L30 — Aura of Righteousness + Divine Judgment ───────────────────
export const PALADIN_L30_UNLOCK_LEVEL                 = 30;
export const PALADIN_AURA_RIGHTEOUSNESS_REDUCTION     = 0.05;       // 5% base incoming damage reduction
export const PALADIN_AURA_RIGHTEOUSNESS_HEAL_FRAC     = 0.05;       // 5% of dealt damage healed to party
export const PALADIN_DIVINE_JUDGMENT_STAMINA_COST     = 50;
export const PALADIN_DIVINE_JUDGMENT_MANA_COST        = 50;
export const PALADIN_DIVINE_JUDGMENT_BASE_PCT         = 0.33;       // 33% of target current HP
export const PALADIN_DIVINE_JUDGMENT_PER_LEVEL        = 1 / 300;    // (level/3)% = level/300 as fraction
export const PALADIN_DIVINE_JUDGMENT_BOSS_DIVISOR     = 2;          // halved vs bosses
export const PALADIN_DIVINE_JUDGMENT_MEGABOSS_DIVISOR = 4;          // quartered vs mega bosses

// ── Paladin L35 — Summon Steed + Martyr's Covenant ───────────────────────────
export const PALADIN_L35_UNLOCK_LEVEL                 = 35;
export const PALADIN_STEED_MANA_COST                  = 100;
export const PALADIN_STEED_MANA_PER_ROUND             = 10;
export const PALADIN_STEED_HEALTH_BONUS               = 0.50;
export const PALADIN_STEED_MELEE_DAMAGE_BASE_BONUS    = 1.00; // +100%
export const PALADIN_STEED_MELEE_DAMAGE_PER_LEVEL     = 0.01; // +level%
export const PALADIN_STEED_MELEE_RESIST               = 0.50;
export const PALADIN_STEED_SMITE_CRIT_BASE            = 0.20;
export const PALADIN_STEED_SMITE_CRIT_PER_LEVEL       = 0.005; // +level/2%
export const PALADIN_STEED_SMITE_CRIT_MULT            = 2;
export const PALADIN_COVENANT_MANA_PER_ROUND          = 8;
export const PALADIN_COVENANT_TRIGGER_MAX_HP_FRAC     = 0.30;
export const PALADIN_COVENANT_MIN_HP_FRAC             = 0.10;

// Monk L20 special: Quivering Palm
export const MONK_QUIVERING_PALM_UNLOCK_LEVEL    = 20;
export const MONK_QUIVERING_PALM_DURATION_BASE   = 2; // 2 rounds at L20
export const MONK_QUIVERING_PALM_DURATION_PER_10LV = 1; // +1 per 10 levels above 20
export const MONK_QUIVERING_PALM_STACK_CAP_DIVISOR = 5; // cap = floor(highestMonkLevel/5)
export const MONK_QUIVERING_PALM_STACK_CAP_MAX   = 10;  // absolute max cap rounds
export const MONK_QUIVERING_PALM_STAMINA_MULT    = 2;   // costs 2x normal melee stamina
export const MONK_QUIVERING_PALM_MANA_MULT       = 2;   // costs 2x normal monk melee mana

// Monk L30 special abilities: Ki Charges & Pressure Points
export const MONK_KI_UNLOCK_LEVEL               = 30;

// Monk L35 special abilities: Kick Trip & Explosive Palm
export const MONK_L35_UNLOCK_LEVEL              = 35;
export const MONK_KICK_TRIP_ATTACK_DIVISOR      = 10;
export const MONK_KICK_TRIP_DAMAGE_BASE_BONUS   = 1.00; // +100%
export const MONK_KICK_TRIP_DAMAGE_PER_LEVEL    = 0.02; // +level×2%
export const MONK_KICK_TRIP_CRIT_PER_LEVEL      = 0.005; // level/2%
export const MONK_KICK_TRIP_STUN_CHANCE         = 0.20;
export const MONK_KICK_TRIP_PRONE_BASE_CHANCE   = 0.33;
export const MONK_KICK_TRIP_PRONE_PER_10_LEVELS = 0.01;
export const MONK_EXPLOSIVE_PALM_MANA_COST      = 20;
export const MONK_EXPLOSIVE_PALM_MIN_DOUBLINGS  = 3;
export const MONK_EXPLOSIVE_PALM_STUN_CHANCE    = 0.40;
export const MONK_EXPLOSIVE_PALM_SHOCKWAVE_FRAC = 0.50;

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

// Cleric L30 special abilities
export const CLERIC_SPIRITUAL_WEAPON_UNLOCK_LEVEL = 30;
export const CLERIC_SPIRITUAL_WEAPON_SUMMON_COST  = 10;  // MP to summon one weapon
export const CLERIC_SPIRITUAL_WEAPON_UPKEEP       = 3;   // MP per round per active weapon
export const CLERIC_SPIRITUAL_WEAPON_ATK_DIVISOR  = 8;   // floor(level/8) attacks per weapon per round
export const CLERIC_BANISHMENT_UNLOCK_LEVEL        = 30;
export const CLERIC_BANISHMENT_MANA_COST           = 50;
export const CLERIC_BANISHMENT_DAMAGE_MULT         = 20; // × magic roll if not instakilled
export const CLERIC_BANISHMENT_TAGS                = ['elemental', 'demon'];
export const CLERIC_L35_UNLOCK_LEVEL               = 35;
export const CLERIC_DIVINE_SHROUD_MANA_PER_ROUND   = 15;
export const CLERIC_DIVINE_SHROUD_REDUCTION_PER_LEVEL = 0.005; // level/2 %
export const CLERIC_DIVINE_SHROUD_REVIVE_HP_FRAC   = 0.50;

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
// - fire      : stacking burn DoT — 50% more base damage, +1 extra round.
// - acid      : stacking acid DoT + defense debuff (armor softens).
// - poison    : stacking venom DoT (same potency as fire) + attack (damage) debuff.
// - lightning : stacking lightning DoT (75% of base) + 1-round stun + attack debuff.
// - ice       : stacking frost DoT (75% of base) + 1-round stun + defense debuff.
// DoT damage = 33% × RIDER_DOT_DAMAGE_MULT of the original hit (fire/poison ×1.5 on top; lightning/ice ×0.75).
// Each proc pushes a NEW independent DoT instance — multiple DoTs of the same type stack.
// Debuffs (acid_debuff, poison_debuff, shocked, chilled) do NOT stack: new hits refresh duration/magnitude.
// Debuff magnitude = 1 + enchant level; debuff duration = 1 + enchant level rounds.
export const RIDER_PROC_CHANCE              = 0.25;
export const RIDER_DOT_DAMAGE_FRACTION      = 1 / 3;
export const RIDER_DOT_DAMAGE_MULT          = 0.50;  // global DoT scale — compensates for stacking
export const RIDER_FIRE_DAMAGE_BONUS_MULT   = 1.5;   // fire & poison DoT = 50% more than base
export const RIDER_FIRE_BONUS_ROUNDS        = 1;     // fire & poison last 1 extra round
export const RIDER_STUN_DOT_MULT            = 0.75;  // lightning & ice DoT scale (reduced — they also stun+debuff)
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
        description: 'Crude stitched flesh. Regenerates 10% of max HP each round. Cheap but soft. As a construct: immune to poison, stun, paralysis, and petrification.',
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
        description: 'Hardened clay shell. 25% chance to reflect 50% of incoming damage. As a construct: immune to poison, stun, paralysis, and petrification.',
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
        description: 'Living masonry. Every 3rd round it slams the ground, hitting every enemy (25% stun). As a construct: immune to poison, stun, paralysis, and petrification.',
    },
    {
        id: 'iron',
        name: 'Iron Golem',
        icon: '\u{1F916}',
        unlockLevel: 15,
        reagentTier: 'rare',
        cost: { gold: 12500, common: 20, uncommon: 8, rare: 3, epic: 1 },
        baseHp: 200, hpPerAL: 5,
        baseDef: 10,
        meleeMin: 8, meleeMax: 18,
        // Cleaves one extra target on melee; immune to poison, stun, web.
        cleaveTargets: 1,
        immune: ['poison', 'stun', 'web'],
        description: 'Forged war-engine. Cleaves one extra enemy each melee. As a construct: immune to poison, stun, paralysis, and petrification.',
    },
    {
        id: 'mithril',
        name: 'Mithril Golem',
        icon: '\u{1F47E}',  // 👾 alien/construct face (distinct from iron golem's 🤖)
        unlockLevel: 20,
        reagentTier: 'rare',
        cost: { gold: 62500, common: 30, uncommon: 15, rare: 8, epic: 3, legendary: 1 },
        baseHp: 320, hpPerAL: 8,
        baseDef: 14,
        meleeMin: 14, meleeMax: 28,
        // Force AoE: each turn blasts floor(artificerLevel / 3) enemies
        // (minimum 1) with melee-range force damage.
        forceAoe: true,
        immune: ['poison', 'stun', 'web'],
        description: 'Living mithril construct. Each turn unleashes a wave of kinetic force, striking floor(AL/3) enemies at once. As a construct: immune to poison, stun, paralysis, and petrification.',
    },
    {
        id: 'adamantine',
        name: 'Adamantine Golem',
        icon: '\u{1F5FF}',  // reuse stone icon (dark statue look)
        unlockLevel: 25,
        reagentTier: 'epic',
        cost: { gold: 250000, common: 40, uncommon: 25, rare: 15, epic: 5, legendary: 3, mythic: 1 },
        baseHp: 500, hpPerAL: 10,
        baseDef: 20,
        meleeMin: 18, meleeMax: 36,
        // Fires floor(AL/5) armor-piercing bolts per turn, each with
        // (20 + floor(AL/2))% crit chance for double damage.
        // Takes half damage from magic, AoE, and ranged attacks.
        adamantineBolts: true,
        halfDmgSpecial: true,
        immune: ['poison', 'stun', 'web'],
        description: 'Near-indestructible alloy engine. Fires floor(AL/5) armor-piercing bolts per turn, each bypassing armor (each crits at 20%+AL/2%). Takes half damage from magic, AoE, and ranged. As a construct: immune to poison, stun, paralysis, and petrification.',
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
        description: 'A vessel of pure divine will. Each turn strikes floor(AL/3) enemies with divine melee damage, ignoring half their defense, with a 20% chance to stun each target. Each living ally (including summoned beasts) has a 33% independent chance per round to be healed for 10% of that ally\'s lost HP. Takes half damage from magic, AoE, and ranged. As a construct: immune to poison, stun, paralysis, and petrification.',
    },
];

export const ARTIFICER_HEAL_GOLEM_PCT = 0.5;   // uses 1 reagent of tier -> 50% max HP
export const ARTIFICER_FREE_REPAIR_CHANCE_PER_LEVEL = 0.02; // level x2% chance repair costs no reagent

// ── Necromancer L30 — Dark Apotheosis ────────────────────────────────────────
export const NECRO_DARK_APOTHEOSIS_UNLOCK_LEVEL    = 30;
export const NECRO_CORPSE_HORROR_HP_FRACTION       = 0.02;
export const NECRO_CORPSE_HORROR_DEF_DIVISOR       = 2;
export const NECRO_CORPSE_HORROR_SKILL_PER_CORPSE  = 5;
export const NECRO_CORPSE_HORROR_ATTACKS_PER_CORPSE = 2;
export const NECRO_CORPSE_HORROR_ATTACK_CAP_BONUS  = 0;

// ── Necromancer L30 — Plague Bringer ─────────────────────────────────────────
export const NECRO_PLAGUE_BRINGER_UNLOCK_LEVEL     = 30;
export const NECRO_PLAGUE_BRINGER_MANA_COST        = 35;

// ── Artificer L30 — Golem Berserk Mode ───────────────────────────────────────
export const ARTIFICER_BERSERK_UNLOCK_LEVEL  = 30;
export const ARTIFICER_BERSERK_DMG_PER_LEVEL = 0.02;   // +2% per artificer level
export const ARTIFICER_BERSERK_OVERLOAD_PCT  = 0.02;   // 2% current HP per round
export const ARTIFICER_BERSERK_MIN_HP_PCT    = 0.10;   // auto-stop at 10% max HP

// ── Artificer L30 — Multi Golem Protocol ─────────────────────────────────────
export const ARTIFICER_MULTI_GOLEM_UNLOCK_LEVEL = 30;

// ── Artificer L30 — Deconstruct ──────────────────────────────────────────────
export const ARTIFICER_DECONSTRUCT_UNLOCK_LEVEL    = 30;
export const ARTIFICER_DECONSTRUCT_BONUS_MULT      = 3;    // ×3 bonus damage (ignores armor)
export const ARTIFICER_DECONSTRUCT_SCAVENGE_CHANCE = 0.50;
export const ARTIFICER_DECONSTRUCT_GOLEM_HEAL_PCT  = 0.05;
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
export const BARD_CHARM_IMMUNE_TAGS      = ['undead', 'elemental', 'construct', 'plant'];
export const BARD_RALLYING_MELODY_UNLOCK_LEVEL = 25;
export const BARD_RALLYING_MELODY_MANA_COST = 40;
export const BARD_RALLYING_MELODY_RESTORE_FRACTION = 0.10;

// ── Bard L30: Thunderous Drums (toggle) ─────────────────────────────────────
export const BARD_THUNDEROUS_DRUMS_UNLOCK_LEVEL  = 30;
export const BARD_THUNDEROUS_DRUMS_MANA_PER_ROUND = 10;
export const BARD_THUNDEROUS_DRUMS_MAX_REDUCTION  = 0.80; // 80% damage/effect reduction cap

// ── Bard L30: Symphony of Destruction (1/combat channeled AoE) ──────────────
export const BARD_SYMPHONY_UNLOCK_LEVEL   = 30;
export const BARD_SYMPHONY_BASE_MANA_COST = 10; // doubles each round
export const BARD_SYMPHONY_BASE_STA_COST  = 10; // doubles each round

// ── Bard L35: Quickstep Song ──────────────────────────────────────────────────
// 100 MP activation — grants haste to all qualifying party members for entire combat.
// Hasted members make 1 extra melee/ranged/magic attack per turn.
// Excludes: golems, undead, spiritual weapons, illusionary warriors, simulacra, rift elementals.
// Includes: all real members + summoned beasts (ranger/druid/VK) + warlock demons.
// Refreshed each round onto newly-added qualifying combatants.
export const BARD_QUICKSTEP_SONG_UNLOCK_LEVEL = 35;
export const BARD_QUICKSTEP_SONG_MANA_COST    = 100;

// ── Bard L35: Soulful Melody (passive reaction) ───────────────────────────────
// Triggers automatically when any party member dies; costs 20 MP.
// Bard with most mana plays (must be L35+, not in Symphony).
// Grants survivors +floor(bardLevel/4) attack and defense for 3 rounds.
// Stacks: each additional fallen ally +1 atk, +1 def, +1 round to the ongoing anthem.
// Triggers once per fallen ally per combat.
export const BARD_SOULFUL_MELODY_UNLOCK_LEVEL    = 35;
export const BARD_SOULFUL_MELODY_MANA_COST       = 20;
export const BARD_SOULFUL_MELODY_DURATION        = 3;    // base rounds
export const BARD_SOULFUL_MELODY_ATK_DEF_DIVISOR = 4;   // floor(bardLevel / 4)
export const BARD_SOULFUL_MELODY_STACK_ATK_BONUS = 1;   // +1 attack per additional fallen
export const BARD_SOULFUL_MELODY_STACK_DEF_BONUS = 1;   // +1 defense per additional fallen
export const BARD_SOULFUL_MELODY_STACK_DUR_BONUS = 1;   // +1 round per additional fallen

// ── Barbarian L30: Blood Frenzy (passive) ───────────────────────────────────
export const BARBARIAN_BLOOD_FRENZY_UNLOCK_LEVEL    = 30;
export const BARBARIAN_BLOOD_FRENZY_DAMAGE_PER_BLEED = 0.05; // +5% per bleed DoT on target; cap = level×3%

// ── Barbarian L30: Heroic Deeds ──────────────────────────────────────────────
export const BARBARIAN_HEROIC_DEEDS_UNLOCK_LEVEL = 30;

// ── Barbarian L35: Odin's Ravens (passive) ───────────────────────────────────
export const BARBARIAN_ODINS_RAVENS_UNLOCK_LEVEL = 35;
export const BARBARIAN_ODINS_RAVENS_BASE_CHANCE = 0.10;   // 10%
export const BARBARIAN_ODINS_RAVENS_LEVEL_CHANCE = 0.01;  // +level%
export const BARBARIAN_ODINS_RAVENS_MAX_CHANCE = 0.90;    // cap 90%
export const BARBARIAN_ODINS_RAVENS_REVIVE_FRAC = 0.25;   // revive at 25% HP
export const BARBARIAN_VALKYRIE_DEF_PER_LEVEL = 2;        // defense = level * 2
export const BARBARIAN_VALKYRIE_ATK_PER_ROUND_DIVISOR = 7; // attacks/round = floor(level/7)
export const BARBARIAN_VALKYRIE_DAMAGE_MIN = 5;
export const BARBARIAN_VALKYRIE_DAMAGE_MAX = 10;
export const BARBARIAN_VALKYRIE_DAMAGE_PER_LEVEL = 2;      // +level*2 to min/max
export const BARBARIAN_VALKYRIE_CRIT_CHANCE = 0.20;
export const BARBARIAN_VALKYRIE_BLOCK_CHANCE = 0.25;
export const BARBARIAN_VALKYRIE_MAGIC_AOE_DAMAGE_MULT = 2 / 3;

// ── Barbarian L35: Werebear ──────────────────────────────────────────────────
export const BARBARIAN_WEREBEAR_UNLOCK_LEVEL = 35;
export const BARBARIAN_WEREBEAR_STAMINA_COST = 50;
export const BARBARIAN_WEREBEAR_STAMINA_PER_ROUND = 5;
export const BARBARIAN_WEREBEAR_HP_BONUS_FRAC = 0.50;
export const BARBARIAN_WEREBEAR_REGEN = 0.10;
export const BARBARIAN_WEREBEAR_DEF_PER_LEVEL_DIVISOR = 3; // +floor(level/3) defense
export const BARBARIAN_WEREBEAR_BLEED_CHANCE_PER_LEVEL = 0.01; // level%
export const BARBARIAN_WEREBEAR_BLEED_DAMAGE_FRAC = 0.50;       // 50% of dealt damage per round
export const BARBARIAN_WEREBEAR_BLEED_DURATION_DIVISOR = 7;     // floor(level/7) rounds
export const BARBARIAN_WEREBEAR_BLOOD_FRENZY_CAP_BONUS_PER_LEVEL = 0.005; // +(level/2)% cap

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
export const ROGUE_BACKSTAB_BLEED_FRAC           = 0.33;  // 33% of dealt damage per tick
export const ROGUE_BACKSTAB_BLEED_DURATION_DIVISOR = 7;   // floor(level/7) rounds; L20 → 2, L30 → 4

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
export const DRUID_SHAMBLING_MOUND_CAP_DIVISOR  = 2;

// Rogue L25: field trap tools + anti-magic evasion
export const ROGUE_TRAP_UNLOCK_LEVEL        = 25;
export const ROGUE_TRAP_DOT_FRACTION        = 0.50;
export const ROGUE_TRAP_DOT_ROUNDS          = 3;
export const ROGUE_EVASION_STAMINA_COST     = 2;

// ── Rogue L30 — Twin Fangs & Shadow Step ─────────────────────────────────────
export const ROGUE_TWIN_FANGS_UNLOCK_LEVEL     = 30;
export const ROGUE_TWIN_FANGS_OFFHAND_MULT     = 1.5;  // 1.5× base melee on offhand strike
export const ROGUE_TWIN_FANGS_INSTAKILL_MULT   = 0.5;  // half instakill chance on offhand
export const ROGUE_SHADOW_STEP_UNLOCK_LEVEL    = 30;
export const ROGUE_SHADOW_STEP_STAMINA_COST    = 50;
export const ROGUE_SHADOW_STEP_DURATION        = 2;    // 2 rounds untargetable
export const ROGUE_SHADOW_STEP_BACKSTAB_MULT   = 2;    // ×2 backstab damage while in Shadow Step

// ── Rogue L35 — Trap Mastery & Extra Loot ────────────────────────────────────
export const ROGUE_TRAP_MASTERY_UNLOCK_LEVEL    = 35;
export const ROGUE_TRAP_MASTERY_DAMAGE_MULT     = 2;   // ×2 on top of existing ×2 = ×4 total
export const ROGUE_TRAP_MASTERY_EXTRA_ROUNDS    = 2;   // DoT lasts +2 rounds (3 → 5)
export const ROGUE_TRAP_MASTERY_PENALTY_DIVISOR = 4;   // floor(rogueLevel/4) atk/def penalty
export const ROGUE_EXTRA_LOOT_UNLOCK_LEVEL      = 35;
// Extra Loot gold bonus = rogueLevel% per living L35+ rogue, additive across rogues

// ── Ranger L35 — Beast Mastery & Ricochet Shot ────────────────────────────────
export const RANGER_L35_UNLOCK_LEVEL                  = 35;
export const RANGER_BEAST_MASTERY_HEALTH_MULT         = 1.5;
export const RANGER_BEAST_MASTERY_STAT_MULT           = 2;
export const RANGER_BEAST_MASTERY_REVIVE_COST_PER_LV  = 100;
export const RANGER_RICOCHET_CHANCES    = [0.50, 0.25, 0.12, 0.06, 0.03, 0.01];
export const RANGER_RICOCHET_DAMAGE_MULT              = 0.50;
export const RANGER_RICOCHET_MP_COST                  = 1;
export const RANGER_RICOCHET_INSTAKILL_MULT           = 0.50;
export const RANGER_BEAST_COMPANION_TYPES = {
    dire_wolf:   { id: 'dire_wolf',   summonType: 'bc_dire_wolf',   beastKind: 'bc_dire_wolf',
        name: 'Dire Wolf',       icon: '🐺', row: 'front', attackType: 'melee',
        description: 'Pack predator. floor(level/10) melee bite attacks, all targeting the same foe. Each bite inflicts 100%-of-damage Bleed DoT for floor(level/6) rounds.' },
    cave_bear:   { id: 'cave_bear',   summonType: 'bc_cave_bear',   beastKind: 'bc_cave_bear',
        name: 'Cave Bear',       icon: '🐻', row: 'front', attackType: 'melee',
        description: 'Hulking predator. floor(level/10) melee attacks, all same foe. Claw (50%): 100% damage Bleed for floor(level/6) rds. Bite (50%): level% hold chance for 2 rounds (normal resistances).' },
    roc:         { id: 'roc',         summonType: 'bc_roc',         beastKind: 'bc_roc',
        name: 'Roc',             icon: '🦅', row: 'back',  attackType: 'ranged',
        description: 'Colossal bird of prey. floor(level/10) ranged claw attacks, all same foe. Crit chance = ranger crit chance. Crit multiplier = ×(4 + level×0.02).' },
    sabre_tooth: { id: 'sabre_tooth', summonType: 'bc_sabre_tooth', beastKind: 'bc_sabre_tooth',
        name: 'Sabre Tooth Cat', icon: '🐯', row: 'front', attackType: 'melee',
        description: 'Apex ambush predator. floor(level/10) attacks, all same foe. Claw (50%): 100% damage Bleed for floor(level/6) rds. Bite (50%): floor(level/3)% instakill chance. Bosses: ×4 dmg. Immune types (undead/elemental/construct/incorporeal/plant): normal damage.' },
    megaconda:   { id: 'megaconda',   summonType: 'bc_megaconda',   beastKind: 'bc_megaconda',
        name: 'Mega-conda',      icon: '🐍', row: 'front', attackType: 'melee',
        description: 'Titanic serpent. Single-target constrict: (300%+100%×floor(level/10)) base damage. Attempts hold for floor(level/5) rounds (normal resistances). On successful hold: escalating crush DoT (base→×1.5→×2.0... per tick).' },
    megaloceros: { id: 'megaloceros', summonType: 'bc_megaloceros', beastKind: 'bc_megaloceros',
        name: 'Megaloceros',     icon: '🦌', row: 'front', attackType: 'melee',
        description: 'Ancient war-elk. AOE charge hitting floor(level/5) targets. Damage: base×(1+level×0.02). Each hit: 100% prone attempt (1-round hold, normal hold resistances apply).' },
    sasquatch:   { id: 'sasquatch',   summonType: 'bc_sasquatch',   beastKind: 'bc_sasquatch',
        name: 'Sasquatch',       icon: '🦍', row: 'front', attackType: 'melee',
        description: 'Primordial giant. floor(level/6) attacks. Each: 50/50 Fist (same target) or Boulder (any target). Both: base×(1+level×0.02) damage, 20%+floor(level/3)% stun chance.' },
};

// ── Necromancer L20 — Lich Form ──────────────────────────────────────────────
export const NECRO_LICH_FORM_UNLOCK_LEVEL    = 20;
export const NECRO_LICH_FORM_MANA_PER_ROUND  = 15;   // mana upkeep per round in lich form
export const NECRO_LICH_REVIVE_HP_BASE       = 0.50; // 50% HP on phial revive
export const NECRO_LICH_REVIVE_HP_PER_2LV    = 0.01; // +1% per 2 levels over 20
export const NECRO_LICH_REVIVE_ROUNDS        = 3;    // rounds in phial before revival
export const NECRO_LICH_MAGIC_RESIST_BASE    = 0.50; // 50% magic/AoE resistance
export const NECRO_LICH_MAGIC_RESIST_PER_4LV = 0.01; // +1% per 4 levels over 20

// ── Warrior L30 — Squire Summon ──────────────────────────────────────────────
export const WARRIOR_SQUIRE_UNLOCK_LEVEL          = 30;
export const WARRIOR_SQUIRE_STAMINA_COST          = 10;
export const WARRIOR_SQUIRE_HP_FRACTION           = 0.66;
export const WARRIOR_SQUIRE_STAMINA_FRACTION      = 0.66;
export const WARRIOR_SQUIRE_MELEE_FRACTION        = 0.66;
export const WARRIOR_SQUIRE_DEFENSE_FRACTION      = 0.66;
export const WARRIOR_SQUIRE_SHIELD_BLOCK          = 0.25;
export const WARRIOR_SQUIRE_ATTACKS_PER_LEVELS    = 15;
export const WARRIOR_SQUIRE_COUNT_L60             = 60;
export const WARRIOR_SQUIRE_COUNT_L90             = 90;

// ── Warrior L30 — Formation ──────────────────────────────────────────────────
export const WARRIOR_FORMATION_UNLOCK_LEVEL       = 30;
export const WARRIOR_FORMATION_STAMINA_PER_ROUND  = 10;
export const WARRIOR_FORMATION_BASE_BONUS         = 0.00;
export const WARRIOR_FORMATION_BONUS_PER_MEMBER   = 0.15;
export const WARRIOR_FORMATION_MIN_MEMBERS        = 2;
export const WARRIOR_FORMATION_OPPORTUNITY_OFFSET = 10;
export const WARRIOR_FORMATION_CRIT_DIVISOR       = 200; // retained for reference; crit = (level/2)%
export const WARRIOR_FORMATION_CRIT_BASE          = 1.00; // +100% base crit bonus
export const WARRIOR_FORMATION_CRIT_PER_LEVEL     = 0.01; // +1% per level added to crit mult
export const WARRIOR_SHIELD_WALL_UNLOCK_LEVEL     = 35;
export const WARRIOR_SHIELD_WALL_LEVEL_DIVISOR    = 17;

// Ranger L30 abilities
export const RANGER_HUNTERS_MARK_UNLOCK_LEVEL    = 30;
export const RANGER_HUNTERS_MARK_STAMINA_COST    = 5;
export const RANGER_HUNTERS_MARK_MANA_COST       = 5;
export const RANGER_HUNTERS_MARK_DAMAGE_BONUS    = 0.15; // +15% damage from all sources
export const RANGER_HUNTERS_MARK_UPKEEP_MANA     = 3;
export const RANGER_HUNTERS_MARK_UPKEEP_STAMINA  = 3;
export const RANGER_BEASTLORD_UNLOCK_LEVEL       = 30;
export const RANGER_BEASTLORD_MANA_PER_ROUND     = 5;    // base upkeep for beastlord toggle
export const RANGER_BEASTLORD_SUMMON_BASE        = 10;   // base % added to level/2 for summon chance
export const RANGER_BEASTLORD_UPKEEP_PER_SUMMON  = 1;   // extra 1 MP/round per beastlord-summoned beast

// ── Druid L30 — Wild Shape ────────────────────────────────────────────────────
export const DRUID_WILD_SHAPE_UNLOCK_LEVEL          = 30;
export const DRUID_WILD_SHAPE_MANA_INITIAL          = 30;   // MP to activate form
export const DRUID_WILD_SHAPE_MANA_PER_ROUND        = 5;    // MP upkeep each round

// Bear Form — front row, single-target magic-melee, HP doubles, stun
export const DRUID_WILD_BEAR_ATTACKS_DIVISOR        = 7;    // floor(level/7) attacks
export const DRUID_WILD_BEAR_STUN_BASE              = 0.25;
export const DRUID_WILD_BEAR_STUN_PER_LEVEL         = 0.005; // +level/200
export const DRUID_WILD_BEAR_DEFENSE_DIVISOR        = 3;    // +floor(level/3) def

// Wolf Form — front row, random-front-enemy magic-melee multi-hit, bleed
export const DRUID_WILD_WOLF_ATTACKS_DIVISOR        = 5;    // floor(level/5) attacks
export const DRUID_WILD_WOLF_BLEED_BASE             = 0.50;
export const DRUID_WILD_WOLF_BLEED_PER_LEVEL        = 0.005; // +level/200
export const DRUID_WILD_WOLF_BLEED_FRACTION         = 0.50; // bleed dmg = dealt/2
export const DRUID_WILD_WOLF_BLEED_DURATION_DIVISOR = 5;    // floor(level/5) rounds
export const DRUID_WILD_WOLF_DEFENSE_DIVISOR        = 4;    // +floor(level/4) def

// Storm Eagle Form — back row, single-target magic-ranged, crits, ranged evasion
export const DRUID_WILD_EAGLE_ATTACKS_DIVISOR       = 6;    // floor(level/6) attacks
export const DRUID_WILD_EAGLE_CRIT_BASE             = 0.50;
export const DRUID_WILD_EAGLE_CRIT_PER_LEVEL        = 0.005; // +level/200
export const DRUID_WILD_EAGLE_CRIT_MULT_BASE        = 2.0;
export const DRUID_WILD_EAGLE_CRIT_MULT_PER_LEVEL   = 0.02;  // 2 + level*0.02 → 260% at L30
export const DRUID_WILD_EAGLE_EVASION_PER_LEVEL     = 0.01;  // ranged evasion = level%

// Pixie Form — back row, AoE all enemies, half magic/AoE damage taken
export const DRUID_WILD_PIXIE_MAGIC_RESIST          = 0.50;

// Treant Form — front row, random-front-enemy magic-melee multi-hit, hold, HP doubles
export const DRUID_WILD_TREANT_ATTACKS_DIVISOR      = 7;    // floor(level/7) attacks
export const DRUID_WILD_TREANT_HOLD_BASE            = 0.25;
export const DRUID_WILD_TREANT_HOLD_PER_LEVEL       = 0.005; // +level/200
export const DRUID_WILD_TREANT_DEFENSE_DIVISOR      = 3;    // +floor(level/3) def

// Matching summon buffs while in wild shape
export const DRUID_WILD_SUMMON_DMG_MULT             = 1.50; // +50% dmg for matching beasts
export const DRUID_WILD_SUMMON_DMG_MULT_PIXIE       = 1.75; // +75% dmg for pixies
export const DRUID_WILD_SUMMON_DEF_BONUS_DIVISOR    = 3;    // +floor(level/3) def (bear/wolf/eagle/treant)
export const DRUID_WILD_SUMMON_DEF_DIVISOR_PIXIE    = 4;    // +floor(level/4) def (pixie)

// Wolf cascade cascade base when in Wolf Form (65% vs normal 40%)
export const DRUID_WILD_WOLF_CASCADE_BASE           = 0.65;

// Verdant Surge — L30 enhancement to Entangle
export const DRUID_VERDANT_SURGE_UNLOCK_LEVEL       = 30;
export const DRUID_VERDANT_SURGE_ACTION_LOSS_CHANCE = 0.25; // 25%/round action loss

// L35: Nature's Charms — toggle, bypasses plant charm immunity
export const DRUID_NATURES_CHARM_UNLOCK_LEVEL      = 35;
export const DRUID_NATURES_CHARM_MANA_COST         = 50;   // activation cost (ends turn)
export const DRUID_NATURES_CHARM_UPKEEP_PER_ROUND  = 5;    // MP/round per charmed minion
export const DRUID_NATURES_CHARM_CHANCE_DIVISOR    = 2;    // chance = druidLevel/2 %
export const DRUID_NATURES_CHARM_TAGS              = ['beast', 'plant'];
export const DRUID_NATURES_CHARM_RESIST_CAP        = 3;    // 3 resists = immune for this combat
export const DRUID_NATURES_CHARM_DURATION_BONUS    = 1;    // floor(level/5) + 1 rounds
export const DRUID_NATURES_CHARM_BOLSTER_PER_LEVEL = 0.01; // +1% dmg per druid level

// L35: Wither Plants — magic AoE vs plants only
export const DRUID_WITHER_PLANTS_UNLOCK_LEVEL      = 35;
export const DRUID_WITHER_PLANTS_MANA_COST         = 35;
export const DRUID_WITHER_PLANTS_DAMAGE_BASE       = 3.0;  // base damage multiplier
export const DRUID_WITHER_PLANTS_DAMAGE_PER_LEVEL  = 0.01; // +level/100 added to base
export const DRUID_WITHER_PLANTS_INSTAKILL_DIVISOR = 5;    // level/5 % instakill chance
export const DRUID_WITHER_PLANTS_TARGET_TAG        = 'plant';

// ── Mage L30 — Arcane Overload ────────────────────────────────────────────────
export const MAGE_ARCANE_OVERLOAD_UNLOCK_LEVEL   = 30;
export const MAGE_ARCANE_OVERLOAD_BURST_BASE     = 0.40;  // 2nd burst chance (same as necro cascade)
export const MAGE_ARCANE_OVERLOAD_BURST_STEP     = 0.10;  // drops per successive burst (reduced from 0.05)

// ── Mage L30 — Elemental Rift ─────────────────────────────────────────────────
export const MAGE_ELEMENTAL_RIFT_UNLOCK_LEVEL    = 30;
export const MAGE_ELEMENTAL_RIFT_MANA_INITIAL    = 100;
export const MAGE_ELEMENTAL_RIFT_MANA_PER_ROUND  = 10;
export const MAGE_ELEMENTAL_RIFT_SUMMON_BASE     = 20;    // base% + mageLevel; cap 100

// ── Mage L35 — Mana Shield & Death Burst ──────────────────────────────────────
export const MAGE_L35_UNLOCK_LEVEL               = 35;
export const MAGE_MANA_SHIELD_MANA_COST          = 50;
export const MAGE_DEATH_BURST_DAMAGE_BASE_MULT   = 2.0;   // maxMana * (2 + level*0.02)
export const MAGE_DEATH_BURST_DAMAGE_PER_LEVEL   = 0.02;

// ── Statue Event System (DL30+) ──────────────────────────────────────────────
// Mysterious statues spawn at DL30+. Activating one starts a 15-wave gauntlet
// themed around a random monster tag. Waves clear → next wave spawns;
// the battle never ends before wave 15.  Wave 5 = boss, 10 = mega boss,
// 15 = named super mega boss (4 actions, ×20 HP, purple HUD border).
export const STATUE_MIN_DUNGEON_LEVEL              = 30;
export const STATUE_SPAWN_CHANCE                   = 0.125;  // half of CHEST_SPAWN_CHANCE
export const STATUE_PROXIMITY                      = 2.5;    // same trigger radius as chests

// Wave schedule
export const STATUE_EVENT_ROUND_BOSS               = 5;
export const STATUE_EVENT_ROUND_MEGA_BOSS          = 10;
export const STATUE_EVENT_ROUND_SUPER_BOSS         = 15;

// Super boss stat multipliers (stacked on mega boss base)
export const SUPER_BOSS_HP_MULT                    = 20;    // ×20 base enemy HP
export const SUPER_BOSS_DEFENSE_PER_DL             = 2.5;   // +DL×2.5 defense
export const SUPER_BOSS_MELEE_PER_DL               = 4.5;   // +DL×4.5 melee/ranged
export const SUPER_BOSS_MAGIC_PER_DL               = 3.5;   // +DL×3.5 magic
export const SUPER_BOSS_ACTIONS_PER_TURN           = 4;
export const SUPER_BOSS_SUMMON_COUNT               = 2;     // summons 2 at once

// Super boss aura/mechanic overrides
export const STATUE_BOSS_AURA_MULT                 = 0.66;  // +66% aura from alive super boss
export const PALADIN_DIVINE_JUDGMENT_SUPERBOSS_DIVISOR = 8; // 1/8 divine judgment cap
export const SUPER_BOSS_MUMMY_ROT_MULT             = 0.25;  // mummy rot heals only 25% vs super boss

// Statue event loot multipliers
export const STATUE_GOLD_MULT                      = 10;
export const STATUE_XP_MULT                        = 2;

// Possible themes for the statue encounter (drawn from monster tag categories)
export const STATUE_THEMES = [
    'undead', 'demon', 'beast', 'humanoid', 'construct',
    'aberration', 'dragon', 'monster', 'vermin',
];

// Named super bosses — keyed by enemy type id.
// Each entry is an array of possible names; one is chosen at random on spawn.
export const SUPERBOSS_NAMES = {
    // ── Undead ───────────────────────────────────────────────────────────────
    skeleton:         ['Morvak the Endless', 'Xal\'drath, Bone Sovereign'],
    zombie:           ['Grothmur the Revived', 'Putrax the Undying'],
    ghost:            ['Lethias the Hollow', 'Vaelgroth, Echo of Despair'],
    wraith:           ['Sshareth the Consuming', 'Nilvar the Soulless'],
    mummy:            ['Amenhotekh the Deathless', 'Khasekhemui, Lord of Rot'],
    revenant:         ['Valdris the Returned', 'Kael\'morn, Oath of Vengeance'],
    banshee:          ['Morrigan the Wailing', 'Shrieka, Voice of the Damned'],
    lich:             ['Arkados the Eternal', 'Zyrathos, Archmage of Bone'],
    zombie_giant:     ['Grul the Massive', 'Vrothgar, Titan of Decay'],
    bone_gnasher:     ['Ossric the Crusher', 'Gnathax the Jawbreaker'],
    death_knight:     ['Sarevoth the Unyielding', 'Malgrath, Knight Eternal'],
    bone_archer:      ['Skeln the Deadeye', 'Vrakar, Arrow of Night'],
    poltergeist:      ['Phasix the Unseen', 'Wrex, Chaos Unbound'],
    shadow:           ['Umbrath the Formless', 'Kelvindras the Shade'],
    wight:            ['Corthax the Draining', 'Mortheus, Drinker of Life'],
    void_wraith:      ['Velthrax the Annihilator', 'Zerophis, End of Light'],
    will_o_wisp:      ['Ixivara the Luring', 'Phosphen the Deceiver'],
    vampire_spawn:    ['Vorcath the Bloodborn', 'Serafina the Undying'],
    vampire_lord:     ['Lord Strahvikar the Ageless', 'Countess Lytheria the Ancient'],
    dracolich:        ['Vyrixas the Dread', 'Necrofang the Immortal'],
    // ── Demons ───────────────────────────────────────────────────────────────
    imp:              ['Infernicus the Wicked', 'Pyrax the Hellborn Trickster'],
    flame_imp:        ['Cindrix the Burning', 'Ashflare the Cackling'],
    dust_devil:       ['Maelstrix the Whirling', 'Vorticus the Desert Fury'],
    succubus:         ['Lilythrix the Seductive', 'Vexara the Heartstealer'],
    chain_devil:      ['Barbakor the Binding', 'Chainlord Vexior'],
    blood_demon:      ['Gorethax the Crimson', 'Sanguine Destruction Incarnate'],
    ice_demon:        ['Frostmaw Zerothax', 'Shivrak the Abyssal Glacier'],
    acid_demon:       ['Corrosivus the Melting', 'Acidrix the Pit of Dissolution'],
    bloat_demon:      ['Putraxis the Vile', 'Toxifax the Plague Eternal'],
    efreeti:          ['Sultan Ifraak the Undying', 'Blazemark the Djinn-King'],
    pit_fiend:        ['Lord Infernus Zak\'rath', 'Tartarian Commander Grael'],
    quasit:           ['Chaos-Spawn Rix', 'Vexrix the Uncontrollable'],
    demon_knight:     ['Azgarak the Hellbound', 'Baltheron the Champion of Ruin'],
    // ── Humanoids ────────────────────────────────────────────────────────────
    goblin:           ['Grimtooth the Vicious', 'Skrag the King of Filth'],
    orc:              ['Gruumkar the Warchief', 'Dragmar Ironhide'],
    troll:            ['Grrlog the Unkillable', 'Borash Stonefist'],
    ice_troll:        ['Fridrek the Frozen', 'Vorgral Icefang'],
    minotaur:         ['Arkhoss the Labyrinthine', 'Gorethax Blood-and-Thunder'],
    ogre:             ['Cragmoor the Enormous', 'Thumdar the Mountain\'s Fist'],
    kobold:           ['Rixek the Tunnelmaster', 'Spikrix the Cunning'],
    kobold_shaman:    ['Zizrix the All-Seeing', 'Hexvrak the Voice of Scales'],
    dark_elf:         ['Syl\'zarrath the Poisoner', 'Drow\'xilvan the Unseen'],
    gnoll:            ['Fang-Master Greth', 'Hyenax the Pack\'s Fury'],
    hag:              ['Wyrdlach the Ancient', 'Morass the Withered'],
    stone_hag:        ['Grannax the Petrifier', 'Lithrix the Stonebound'],
    bandit:           ['Rorkan the Merciless', 'Shadowblade Jynn'],
    gladiator:        ['Maxivar the Undefeated', 'Gore-Spit Brandor'],
    assassin_lord:    ['Umbra the Silent', 'Kythren the Death\'s Shadow'],
    battle_mage:      ['Arcforce Zelphar', 'Verrikan the Obliterator'],
    medusa:           ['Gorgorath the Staring', 'Petrix the Queen of Coils'],
    witch_doctor:     ['Hexmaw the Twisted', 'Zibrix the Bone-Caller'],
    ettin:            ['Thrug-Druul the Two-Headed', 'Grak-Mak the Bellowing'],
    fire_giant:       ['Embrar the Scorching', 'Pyrokhan the Lord of Flame'],
    ice_giant:        ['Glacior the Freezing', 'Hrimthor Winter\'s Wrath'],
    stone_giant:      ['Rockfall Garumn', 'Petravar the Immovable'],
    storm_giant:      ['Thunderlord Stormok', 'Cyclonia the Storm\'s Voice'],
    evil_priest:      ['Malgorum the Defiler', 'Hexrath the Apostate'],
    evil_necromancer: ['Lich-Caller Varusk', 'Morticus the Unbinder'],
    evil_berserker:   ['Bloodthirst Garal', 'Wrathborn Ulkarc'],
    werewolf:         ['Lycavrath the Eternal', 'Bloodmoon the Howling'],
    // ── Beasts ───────────────────────────────────────────────────────────────
    spider:           ['Arachnorix the Many-Eyed', 'Venom Mother Lyraxis'],
    bat:              ['Noctraxis the Swooping', 'Grimbat the Wing of Night'],
    rat:              ['Gnawmore the Plague-Bringer', 'Ratking Skrix'],
    basilisk:         ['Stonegaze Petravax', 'Lythrix the Petrifying'],
    phase_spider:     ['Spectrix the Untouchable', 'Warpfang the Phantom'],
    giant_scorpion:   ['Skorpathax the Deadly', 'Venomclaw Praxix'],
    giant_frog:       ['Sludgethax the Enormous', 'Phlogrix the Swallowing'],
    giant_crocodile:  ['Jaws-of-Iron Mawrix', 'Swampther the Ancient'],
    displacer_beast:  ['Shiftrix the Unreal', 'Paradox-Fang the Flickering'],
    manticore:        ['Thorns-of-Ruin Keldrix', 'Vespix the Merciless'],
    hydra:            ['Nine-Heads Lernathos', 'Hydravax the Regrown'],
    remorhaz:         ['Permafrost Korrix', 'Deep-Burner the Unyielding'],
    thunderbird:      ['Stormwing the Thunderous', 'Zaprix the Storm-Caller'],
    wyvern:           ['Veyrix the Swooping', 'Talonrath the Terrible'],
    chimera:          ['Chimrix the Triple-Threat', 'Abominus the Fused'],
    dungeon_ape:      ['Grimfist the Dominant', 'Gorix the Mighty'],
    yeti:             ['Shiver-Crush the Ancient', 'Glacial Fury Borrix'],
    hell_hound:       ['Kerberos the Eternal', 'Scorch-Fang the Deathless'],
    naga:             ['Nagavrath the Coiling', 'Serpent-Queen Sythrix'],
    harpy:            ['Screech-Queen Harpix', 'Sky-Torment Valkrix'],
    // ── Vermin ───────────────────────────────────────────────────────────────
    centipede:        ['Myriapodix the Hundred', 'Venomfang Skarix'],
    cave_crawler:     ['Gripclaw Korr', 'Thoraxix the Unmovable'],
    widow:            ['Weaverix the Black', 'Venom-Bride Sylthrix'],
    blood_wasp:       ['Queen Vespra the Stinging', 'Styxrix the Swarm'],
    cave_fisher:      ['Tendraxis the Lurking', 'Hookmaster Skalrix'],
    stirge:           ['Drainix the Blood-Drunk', 'Exsanguia the Feeding'],
    tunnel_worm:      ['Chthonis the Burrowing', 'Maw-Beast Grumrix'],
    vampire_bat:      ['Nocfarang the Predator', 'Duskling the Swarm-Lord'],
    // ── Constructs & Elementals ───────────────────────────────────────────────
    gargoyle:         ['Stonewrath the Guardian', 'Grimveil the Watcher'],
    gargoyle_sentinel:['Fortress-Soul Granavax', 'Sentinel Eternal Lithrix'],
    iron_golem:       ['Ironwall Forgevax', 'Adamant-Eternal Steelrix'],
    clockwork_horror: ['Tick-Tock Chronovax', 'The Final Machine Gearix'],
    earth_elemental:  ['Living Mountain Gorrix', 'Tectovax the Unyielding'],
    air_elemental:    ['Gale-Force Anemorix', 'Cyclotrix the Unbound'],
    water_elemental:  ['Deep-Tide Hydrix', 'Tidal Ruin Nereivax'],
    fire_elemental:   ['Conflagrix the Undying', 'Pyrevax the All-Consuming'],
    invisible_stalker:['Invisible Death Wrex', 'The Shape Between Shapes'],
    // ── Aberrations ──────────────────────────────────────────────────────────
    beholder:         ['The All-Seeing Ocuvax', 'Eyerix the Dread Gazer'],
    mind_flayer:      ['Elder Brain Fragment Psiovax', 'The Mindripper Eternal'],
    tentacle_horror:  ['Vile-Flesh Cthovrix', 'Deep-One Kraken-Spawn'],
    gibbering_mouther:['Madrix the Screaming', 'Cacovax the Unhinged'],
    aboleth:          ['Ancient Memory Abolix', 'Dreamsink the Corrupting'],
    star_spawn:       ['Outer-Kin Stellrix', 'Void-Touched Astravax'],
    roper:            ['The Patient Strangler', 'Tendrax the Ceiling Terror'],
    // ── Dragons ──────────────────────────────────────────────────────────────
    drake:            ['Embrix the Scorching', 'Wyrmling-Eternal Drakavax'],
    red_dragon:       ['Inferno-Lord Pyrathos', 'Vulcanus the World-Burner'],
    black_dragon:     ['Acid-Scale Korrathos', 'Dissolution Eternal Mordrix'],
    blue_dragon:      ['Storm-King Zephyrax', 'Lightning-Soul Volthos'],
    green_dragon:     ['Venom-Sage Sylvrix', 'Poison-Ancient Toxathos'],
    white_dragon:     ['Frostfall Glacovax', 'The Endless Blizzard Frigoth'],
    // ── Monsters & Plants ────────────────────────────────────────────────────
    mimic:            ['The Grand Deceiver', 'Morphax the Unmasked'],
    spore_fungus:     ['Sporifax the Infecting', 'Myceleth the Spreading'],
    shrieker:         ['Discordrix the Deafening', 'Resonance-Death Vrix'],
    myconid:          ['Elder Fungus Portifax', 'Hyphavax the Entangling'],
    myconid_sovereign:['Sovereign Sporix', 'Grand-Mycelium Phrix'],
    rust_monster:     ['Ironbane Corraxis', 'Tarnisher of Legends'],
    // ── Slimes ───────────────────────────────────────────────────────────────
    slime:            ['Oozedrix the Consuming', 'Primordial Slime Lord'],
    acid_slime:       ['Corrosifax the Spreading', 'Acidflesh the Devouring'],
    gelatinous_cube:  ['Cube-Eternal Velorix', 'The Consuming Void of Halls'],
    // ── New Monsters ─────────────────────────────────────────────────────────
    evil_wizard:    ['Arcanis the Maleficent', 'Vexathor the Spellbinder'],
    dark_treant:    ['Root-of-Ruin Morbranx', 'Darkwood-Ancient Thraxix'],
    mandrake_root:  ['The Screaming Harvest', 'Echosoul Morrifax'],
    killer_vine:    ['Stranglewood Virix', 'Thornmass the Consuming'],
    cave_bear:      ['Grizzlix the Crushmaster', 'Cave-Lord Ursorath'],
    cave_lion:      ['Mane-of-Shadows Leonrix', 'Cavefang the Eternal'],
    winter_wolf:    ['Blizzard-Fang Nivalix', 'Glacial-Pack-Leader Frigorath'],
    lizard_folk:    ['Scale-King Sibilrix', 'Iron-Hide Lacertis'],
    dread_cultist:  ['The Abyssal Preacher', 'Dreadlord Veximus'],
};

// Legendary item IDs — always awarded at the end of a statue event.
export const LEGENDARY_ITEM_IDS = [
    'legendary_warblade',
    'legendary_arbalest',
    'legendary_archmage_staff',
    'legendary_cloth_armor',
    'legendary_leather_armor',
    'legendary_chainmail_armor',
    'legendary_plate_armor',
    'legendary_shield',
    'legendary_cloak_melee',
    'legendary_cloak_ranged',
    'legendary_cloak_magic',
    'legendary_neck_melee',
    'legendary_neck_ranged',
    'legendary_neck_magic',
    'legendary_ring_melee',
    'legendary_ring_ranged',
    'legendary_ring_magic',
    'legendary_belt_melee',
    'legendary_belt_ranged',
    'legendary_belt_magic',
];

// ── Vermin Keeper ───────────────────────────────────────────────────────────
// L1: Single-target magic attack (poison or acid) + DoT.
export const VK_ATTACK_MANA_COST_BASE = 1;      // 1 MP per attack
export const VK_ATTACK_EXTRA_PER_5LV  = 5;      // +1 attack per this many levels
export const VK_DOT_DAMAGE_FRAC       = 0.20;   // each attack adds 20% of its dmg to the round's DoT
export const VK_DOT_ROUNDS_PER_ATTACK = 1;      // each attack in the same round extends DoT by 1 round
export const VK_POISON_DAMAGE_BONUS   = 0.15;   // poison variant: +15% damage bonus
export const VK_ACID_DEF_DEBUFF       = -1;     // acid variant: -1 defense debuff per round of attacks

// L3: Summon Vermin
export const VK_SUMMON_VERMIN_MANA_COST  = 5;   // MP cost to summon a vermin
export const VK_SUMMON_VERMIN_UNLOCK_LEVEL = 3; // unlock level
export const VK_VERMIN_HP_MULT           = 1.0; // summon HP = keeper maxHealth × this
export const VK_VERMIN_MELEE_PER_LEVEL   = 2;   // melee skill = keeper level × this
export const VK_VERMIN_DEFENSE_PER_LEVEL = 1.5; // defense = keeper level × this
export const VK_VERMIN_TYPES = [
    'spider', 'bat', 'giant_bat', 'giant_centipede', 'cave_crawler', 'black_widow',
    'cave_fisher', 'stirge', 'blood_wasp', 'vampire_bat',
    'tunnel_worm', 'giant_scorpion', 'phase_spider', 'rust_monster',
];

// L6: Summon Slime
export const VK_SUMMON_SLIME_MANA_COST    = 10; // MP cost to summon a slime
export const VK_SUMMON_SLIME_UNLOCK_LEVEL = 6;  // unlock level
export const VK_SLIME_TYPES = ['slime', 'acid_slime', 'gelatinous_cube'];

// Cascade (shared by both vermin and slime summons — same as necromancer pattern)
export const VK_SUMMON_CASCADE_BASE    = 0.40;  // 40% chance for 2nd summon
export const VK_SUMMON_CASCADE_DROP    = 0.05;  // -5% per additional summon
export const VK_SUMMON_CASCADE_LEVEL_BONUS = 0.01; // +1% per keeper level

// Passive: Poison/acid resistance — 1% per level, always active
export const VK_RESIST_PER_LEVEL = 0.01; // 1% damage reduction per VK level for poison & acid DoTs

// L20: Charm Vermin
export const VK_CHARM_VERMIN_UNLOCK_LEVEL = 20;
export const VK_CHARM_VERMIN_MANA_COST    = 50;
export const VK_CHARM_VERMIN_TAGS         = ['vermin', 'slime', 'insect'];  // target must have one of these tags
// reuses BARD_CHARM_BASE_CHANCE, BARD_CHARM_CHANCE_PER_2_LV, BARD_CHARM_DURATION_DIVISOR

// L25: Insect Plague
export const VK_INSECT_PLAGUE_UNLOCK_LEVEL = 25;
export const VK_INSECT_PLAGUE_MANA_COST    = 50;
export const VK_INSECT_PLAGUE_DOT_FRAC     = 0.75; // DoT per round = 75% of initial hit damage
export const VK_INSECT_PLAGUE_LEVEL_DMG_BONUS = 0.02; // +2% damage per VK level (× level = level*2%)
// Duration is dynamic: floor(VK level / 4), minimum 1 round

// L30: Summon Swarm
export const VK_SWARM_UNLOCK_LEVEL        = 30;
export const VK_SWARM_SUMMON_MANA_COST    = 75;  // initial summon MP cost
export const VK_SWARM_MAX_UPGRADE_DIVISOR = 5;   // max growth upgrades = floor(keeper level / 5)
export const VK_SWARM_HP_MULT             = 1.0; // swarm HP = keeper health × this
export const VK_SWARM_DEFENSE_PER_LEVEL   = 2;   // swarm defense = keeper level × 2
// Vermin Swarm resistances/vulnerabilities
export const VK_VSWARM_MELEE_RESIST       = 0.10; // takes only 10% from melee/ranged
export const VK_VSWARM_MAGIC_WEAKNESS     = 1.50; // ×1.5 damage from magic/AoE
export const VK_VSWARM_FIRE_WEAKNESS      = 2.00; // ×2 damage from fire
export const VK_VSWARM_POISON_DOT_FRAC    = 0.667; // poison DoT = 2/3 base damage
export const VK_VSWARM_POISON_DOT_ROUNDS  = 2;    // DoT lasts 2 rounds
export const VK_VSWARM_DEBUFF_DIV         = 4;    // swarm debuff = keeper level / 4
export const VK_VSWARM_DEBUFF_ROUNDS      = 2;    // debuff duration
// Acid Swarm resistances/vulnerabilities
export const VK_ASWARM_MELEE_RESIST       = 0.10; // takes only 10% from melee/ranged
export const VK_ASWARM_MAGIC_WEAKNESS     = 1.50; // ×1.5 damage from magic/AoE
export const VK_ASWARM_LIGHTNING_WEAKNESS = 3.00; // ×3 damage from lightning
export const VK_ASWARM_ACID_DOT_FRAC      = 0.40; // acid DoT = 40% base damage
export const VK_ASWARM_ACID_DOT_ROUNDS    = 2;    // DoT lasts 2 rounds
export const VK_ASWARM_DEBUFF_DIV         = 4;    // acid debuff = keeper level / 4
export const VK_ASWARM_DEBUFF_ROUNDS      = 2;    // debuff duration

// L30: Swarm Protect  — same intercept formula as Shambling Mound (50% + keeperLevel/300)
export const VK_SWARM_PROTECT_BASE_CHANCE = 0.50;
export const VK_SWARM_PROTECT_LEVEL_DIV   = 300;
export const VK_SWARM_PROTECT_MANA_COST   = 25;  // MP to toggle swarm protect

// ── Warlock ────────────────────────────────────────────────────────────────
export const WARLOCK_HEX_UPKEEP_MANA       = 1;
export const WARLOCK_HEX_PENALTY_DIVISOR   = 3;
export const WARLOCK_HEX_DURATION_DIVISOR  = 7;
export const WARLOCK_CURSE_UNLOCK_LEVEL    = 20;
export const WARLOCK_CURSE_MANA_COST       = 35;
export const WARLOCK_CURSE_BASE_PCT        = 0.01;
export const WARLOCK_CURSE_MAX_PCT         = 0.05;
export const WARLOCK_CURSE_BASE_ROUNDS     = 4;
export const WARLOCK_CURSE_LEVEL_DIVISOR   = 20;
export const WARLOCK_CURSE_MAX_ROUNDS      = 9;
export const WARLOCK_CURSE_SHRUG_CHANCE    = 0.05;
export const WARLOCK_CHARM_UNLOCK_LEVEL    = 25;
export const WARLOCK_CHARM_MANA_COST       = 50;
export const WARLOCK_CAULDRON_UNLOCK_LEVEL = 3;
export const WARLOCK_CAULDRON_HP_COST      = 5;
export const WARLOCK_DEMON_UPKEEP_HP       = 3;
export const WARLOCK_ABYSS_FORM_UNLOCK_LEVEL = 30;
export const WARLOCK_ABYSS_MAGIC_RESIST    = 0.50;
export const WARLOCK_ABYSS_COLD_ACID_RESIST = 0.50;
export const WARLOCK_DEMON_PROTECTION_CAP  = 0.66;
export const WARLOCK_ELDRITCH_SIGN_TARGET_DIVISOR = 5;
export const WARLOCK_ELDRITCH_SIGN_RECHARGE_CHANCE = 1 / 3;

// Photomancer
export const PHOTOMANCER_COLOR_SPRAY_MANA_COST = 1;
export const PHOTOMANCER_MIRROR_IMAGE_UNLOCK_LEVEL = 3;
export const PHOTOMANCER_MIRROR_IMAGE_MANA_COST = 35;
export const PHOTOMANCER_BLUR_UNLOCK_LEVEL = 6;
export const PHOTOMANCER_BLUR_MANA_COST = 30;
export const PHOTOMANCER_BLUR_MISS_CHANCE = 0.20;
export const PHOTOMANCER_INVISIBILITY_MANA_COST = 10;
export const PHOTOMANCER_ILLUSION_UNLOCK_LEVEL = 10;
export const PHOTOMANCER_ILLUSION_MANA_COST = 25;
export const PHOTOMANCER_IMPROVED_INVIS_UNLOCK_LEVEL = 20;
export const PHOTOMANCER_DISINTEGRATE_UNLOCK_LEVEL = 25;
export const PHOTOMANCER_DISINTEGRATE_MANA_COST = 100;
export const PHOTOMANCER_DISINTEGRATE_BASE_KILL = 0.03;
export const PHOTOMANCER_DISINTEGRATE_BOSS_MULT = 4;
export const PHOTOMANCER_PRISMATIC_SPHERE_UNLOCK_LEVEL = 30;
export const PHOTOMANCER_PRISMATIC_SPHERE_MANA_COST = 100;
export const PHOTOMANCER_SIMULACRUM_UNLOCK_LEVEL = 30;
export const PHOTOMANCER_SIMULACRUM_GOLD_PER_LEVEL = 100;

export const WARLOCK_DEMON_TYPES = [
    { id: 'imp', unlockLevel: 3 },
    { id: 'flame_imp', unlockLevel: 6 },
    { id: 'dust_devil', unlockLevel: 6 },
    { id: 'demon_knight', unlockLevel: 10 },
    { id: 'quasit', unlockLevel: 10 },
    { id: 'efreeti', unlockLevel: 15 },
    { id: 'ice_demon', unlockLevel: 20 },
    { id: 'acid_demon', unlockLevel: 20 },
    { id: 'bloat_demon', unlockLevel: 20 },
    { id: 'hell_hound', unlockLevel: 20 },
    { id: 'succubus', unlockLevel: 25 },
    { id: 'chain_devil', unlockLevel: 25 },
    { id: 'blood_demon', unlockLevel: 25 },
    { id: 'pit_fiend', unlockLevel: 30 },
];
