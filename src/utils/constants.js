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

// Fog
// Phase 10: lifted from near-pure-black (0x050505) to a dim warm tone so
// distant walls aren't swallowed whole; also pushed FOG_FAR out from 42 → 60.
export const FOG_COLOR = 0x1a1410;
export const FOG_NEAR = 4;
export const FOG_FAR = 60;

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
    slime:    { name: 'Slime',    spriteW: 1.2, spriteH: 1.0, poisonChance: 0.25, tags: ['vermin'] },
    goblin:   { name: 'Goblin',   spriteW: 1.2, spriteH: 1.4, tags: ['humanoid'] },
    // Phase 11: spider gains webChance on top of its existing poison bite.
    // The two effects roll independently — a single hit can poison, web,
    // both, or neither.
    spider:   { name: 'Spider',   spriteW: 1.8, spriteH: 1.2, poisonChance: 0.35, webChance: 0.25, tags: ['beast', 'vermin'] },
    wraith:   { name: 'Wraith',   spriteW: 1.4, spriteH: 2.0, tags: ['undead'] },
    bat:      { name: 'Bat',      spriteW: 1.6, spriteH: 1.0, tags: ['beast', 'vermin'] },
    rat:      { name: 'Giant Rat', spriteW: 1.4, spriteH: 1.0, tags: ['beast', 'vermin'] },
    zombie:   { name: 'Zombie',   spriteW: 1.4, spriteH: 1.8, tags: ['undead'] },
    troll:    { name: 'Troll',    spriteW: 1.6, spriteH: 2.0, stunChance: 0.33, regenPercent: 0.15, tags: ['humanoid'] },
    ghost:    { name: 'Ghost',    spriteW: 1.4, spriteH: 1.8, tags: ['undead'] },
    drake:    { name: 'Drake',    spriteW: 1.6, spriteH: 1.4, tags: ['beast', 'monster'] },
    mimic:    { name: 'Mimic',    spriteW: 1.4, spriteH: 1.2, tags: ['monster'] },
    orc:      { name: 'Orc',      spriteW: 1.4, spriteH: 1.8, tags: ['humanoid'] },
    imp:      { name: 'Imp',      spriteW: 1.0, spriteH: 1.2, tags: ['demon'] },
    basilisk: { name: 'Basilisk', spriteW: 1.8, spriteH: 1.4, poisonChance: 0.30, tags: ['beast', 'monster'] },
    cultist:  { name: 'Cultist',  spriteW: 1.4, spriteH: 1.9, aoeMagic: true, tags: ['humanoid', 'cultist'] },

    // ── Phase 11: early-dungeon roster (dungeon levels 1-3 only) ──────
    centipede:    { name: 'Giant Centipede', spriteW: 2.0, spriteH: 0.8, poisonChance: 0.45, maxLevel: 3, tags: ['beast', 'vermin'] },
    cave_crawler: { name: 'Cave Crawler',    spriteW: 1.4, spriteH: 1.0, stunChance: 0.30, maxLevel: 3, tags: ['beast', 'vermin'] },
    widow:        { name: 'Black Widow',     spriteW: 1.6, spriteH: 1.4, poisonChance: 0.40, webChance: 0.35, maxLevel: 3, tags: ['beast', 'vermin'] },
    spore_fungus: { name: 'Spore Fungus',    spriteW: 1.4, spriteH: 1.6, aoeMagic: true, aoePoisonChance: 0.35, maxLevel: 3, tags: ['monster'] },
    shrieker:     { name: 'Shrieker',        spriteW: 1.2, spriteH: 1.6, aoeMagic: true, aoeStunChance: 0.20, maxLevel: 3, tags: ['monster'] },
    kobold:       { name: 'Kobold',          spriteW: 1.0, spriteH: 1.4, maxLevel: 3, tags: ['humanoid'] },
    kobold_shaman:{ name: 'Kobold Shaman',   spriteW: 1.0, spriteH: 1.5, aoeMagic: true, maxLevel: 3, tags: ['humanoid'] },
    cave_fisher:  { name: 'Cave Fisher',     spriteW: 1.8, spriteH: 1.4, webChance: 0.50, maxLevel: 3, tags: ['beast', 'vermin'] },
    stirge:       { name: 'Stirge',          spriteW: 1.2, spriteH: 1.0, regenPercent: 0.10, maxLevel: 3, tags: ['beast', 'vermin'] },
    acid_slime:   { name: 'Acid Slime',      spriteW: 1.2, spriteH: 1.0, poisonChance: 0.55, maxLevel: 3, tags: ['vermin'] },
    flame_imp:    { name: 'Flame Imp',       spriteW: 1.0, spriteH: 1.2, aoeMagic: true, maxLevel: 3, tags: ['demon'] },
    bone_gnasher: { name: 'Bone Gnasher',    spriteW: 1.4, spriteH: 1.4, stunChance: 0.35, maxLevel: 3, tags: ['undead'] },
    blood_wasp:   { name: 'Blood Wasp',      spriteW: 1.4, spriteH: 1.0, poisonChance: 0.40, maxLevel: 3, tags: ['beast', 'vermin'] },
    ice_sprite:   { name: 'Ice Sprite',      spriteW: 1.0, spriteH: 1.2, aoeMagic: true, aoeStunChance: 0.15, maxLevel: 3, tags: ['monster'] },
    stone_hag:    { name: 'Stone Hag',       spriteW: 1.4, spriteH: 1.8, stunChance: 0.30, regenPercent: 0.08, maxLevel: 3, tags: ['humanoid'] },
    ghoul_pup:    { name: 'Ghoul Pup',       spriteW: 1.2, spriteH: 1.2, poisonChance: 0.30, stunChance: 0.20, maxLevel: 3, tags: ['undead'] },
    myconid:      { name: 'Myconid',         spriteW: 1.4, spriteH: 1.8, aoeMagic: true, aoePoisonChance: 0.25, maxLevel: 3, tags: ['monster'] },
    dust_devil:   { name: 'Dust Devil',      spriteW: 1.4, spriteH: 1.8, aoeMagic: true, aoeStunChance: 0.10, maxLevel: 3, tags: ['demon'] },
    vampire_bat:  { name: 'Vampire Bat',     spriteW: 1.6, spriteH: 1.0, regenPercent: 0.12, maxLevel: 3, tags: ['beast', 'vermin'] },
    tunnel_worm:  { name: 'Tunnel Worm',     spriteW: 1.8, spriteH: 1.0, poisonChance: 0.40, webChance: 0.15, maxLevel: 3, tags: ['beast', 'vermin'] },
};
// Only enemy types (excludes tinkerer for spawning purposes)
export const ENEMY_TYPE_KEYS = Object.keys(ENEMY_TYPES);

// Tinkerer NPC (friendly, non-combat)
export const TINKERER_TYPE = { name: 'Tinkerer', spriteW: 1.4, spriteH: 1.8 };

// Combat — player costs & damage
export const MELEE_STAMINA_COST = 3;
export const MELEE_DAMAGE_MIN = 2;
export const MELEE_DAMAGE_MAX = 12;
export const RANGED_STAMINA_COST = 2;
// Phase 8 rule 11: +1 to both min and max.
export const RANGED_DAMAGE_MIN = 2;
export const RANGED_DAMAGE_MAX = 9;
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
export const LOOT_FOOD_CHANCE = 0.40;
export const LOOT_POTION_CHANCE = 0.15;
export const LOOT_WEAPON_CHANCE = 0.10;
export const LOOT_ARMOR_CHANCE = 0.10;
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

export const MAGE_SHIELD_MANA_COST    = 6;   // mana cost for mage shield spell
export const MAGE_SHIELD_BASE_DEF     = 3;   // base defense bonus for all back-row members
export const MAGE_SHIELD_BASE_ROUNDS  = 3;   // base duration in rounds
export const MAGE_SHIELD_BONUS_EVERY  = 5;   // +1 def and +1 round per this many mage levels
export const MAGE_SHIELD_MIN_LEVEL    = 3;   // mage must be at least this level

export const NECRO_SUMMON_MANA_COST = 7;
export const NECRO_LIFE_DRAIN_CHANCE = 0.20;
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
export const RANGER_CRIT_PER_LEVEL = 0.03;    // +3% ranged crit per level
export const MAGE_STUN_PER_LEVEL = 0.01;      // +1% magic stun per level
export const ROGUE_INSTAKILL_PER_LEVEL = 0.01;// +1% backstab instakill per level beyond 1
export const MONK_DODGE_PER_LEVEL = 0.01;     // +1% dodge per level beyond 1
export const MONK_WHIRLWIND_PER_LEVEL = 0.01; // +1% whirlwind per level beyond 1
export const CLERIC_HEAL_PER_LEVEL = 0.02;    // +2% heal amount per level beyond 1
export const NECRO_DRAIN_PER_LEVEL = 1;       // +1 drain per level beyond 1

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
export const LOOT_TORCH_CHANCE    = 0.03; // 3% per slain enemy
export const LOOT_REAGENT_CHANCE  = 0.05; // 5% per slain enemy

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
export const FOOD_CHECK_INTERVAL    = 1800; // 30 minutes of exploration time
export const FOOD_HUNGRY_PENALTY    = 1;    // -1 damage & defense per missed check tier
export const FOOD_DYING_HP_PER_MIN  = 2;    // HP drained per real minute when 'dying'

// ──────────────────────────────────────────
// Phase 12 — Artificer / Paladin / Reagent tiers / Crafting
// ──────────────────────────────────────────

// Reagent drop tiers — keyed by dungeon level of the slain enemy.
// L1-3 drops common, L4-6 uncommon, L7+ rare. Bosses drop 1-2 rare on top.
export const REAGENT_TIER_COMMON_MAX    = 3;   // levels 1-3
export const REAGENT_TIER_UNCOMMON_MAX  = 6;   // levels 4-6
// Level 7+ → rare
export const REAGENT_BOSS_RARE_MIN      = 1;
export const REAGENT_BOSS_RARE_MAX      = 2;

// Artificer class scaling
export const ARTIFICER_RANGED_PER_LEVEL = 1;
// Scatter Shot: main target + N splash at half damage. N = SCATTER_SPLASH_BASE
// at L1, +1 per SCATTER_SPLASH_EVERY levels (L5 → 3 splashes, L10 → 4, …).
export const SCATTER_SPLASH_BASE    = 2;
export const SCATTER_SPLASH_EVERY   = 5;
export const SCATTER_SPLASH_FRACTION = 0.5; // splash damage = half

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
export const PALADIN_HEAL_PERCENT   = CLERIC_HEAL_PERCENT / 2;       // 12.5%
export const PALADIN_HEAL_PER_LEVEL = CLERIC_HEAL_PER_LEVEL / 2;     // +1% per level

// Crafting — enchantment pricing and ingredient costs.
// Weapons get flat +N damage; armor gets flat +N defense.
// Values are indexed by enchant level (1..3).
export const ENCHANT_WEAPON_COSTS = [
    null,
    { gold: 100, common: 3, uncommon: 0, rare: 0 },
    { gold: 400, common: 2, uncommon: 2, rare: 0 },
    { gold: 900, common: 1, uncommon: 2, rare: 1 },
];
export const ENCHANT_ARMOR_COSTS = [
    null,
    { gold: 100, common: 3, uncommon: 0, rare: 0 },
    { gold: 400, common: 2, uncommon: 2, rare: 0 },
    { gold: 900, common: 1, uncommon: 2, rare: 1 },
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
export const POTION_WARD_DEF_BONUS    = 2;
export const POTION_WRATH_DMG_BONUS   = 2;
export const POTION_COSTS = {
    minor_healing_potion:  { gold: 25, common: 2, uncommon: 0, rare: 0 },
    greater_healing_potion:{ gold: 25, common: 1, uncommon: 1, rare: 0 },
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
        cost: { gold: 0, common: 5, uncommon: 0, rare: 0 },
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
        icon: '\u{1F9F1}',
        unlockLevel: 5,
        reagentTier: 'uncommon',
        cost: { gold: 0, common: 10, uncommon: 3, rare: 0 },
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
        cost: { gold: 0, common: 15, uncommon: 5, rare: 1 },
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
        icon: '\u{1F9FE}',
        unlockLevel: 15,
        reagentTier: 'rare',
        cost: { gold: 0, common: 20, uncommon: 8, rare: 3 },
        baseHp: 200, hpPerAL: 5,
        baseDef: 10,
        meleeMin: 8, meleeMax: 18,
        // Cleaves one extra target on melee; immune to poison, stun, web.
        cleaveTargets: 1,
        immune: ['poison', 'stun', 'web'],
        description: 'Forged war-engine. Cleaves one extra enemy each melee. Immune to poison, stun, and web.',
    },
];

export const ARTIFICER_HEAL_GOLEM_PCT = 0.5;   // uses 1 reagent of tier → 50% max HP

// Enemy tag categories — used by paladin Smite, crafted rider flavour, etc.
// Mirrors the existing UNDEAD_TIERS kind='undead' and BEAST_TYPES kind='beast'.
// Per-enemy tags are applied via the optional `tags` array on each ENEMY_TYPES
// entry. A monster may carry multiple tags (e.g. imp = ['demon']).
// Known tags today: 'undead', 'demon', 'beast'.
export const MONSTER_TAG_UNDEAD = 'undead';
export const MONSTER_TAG_DEMON  = 'demon';
export const MONSTER_TAG_BEAST  = 'beast';
