import {
    MELEE_STAMINA_COST, MELEE_DAMAGE_MIN, MELEE_DAMAGE_MAX,
    RANGED_STAMINA_COST, RANGED_DAMAGE_MIN, RANGED_DAMAGE_MAX,
    MAGIC_MANA_COST, MAGIC_DAMAGE_MIN, MAGIC_DAMAGE_MAX,
    MONSTER_MELEE_STAMINA_COST, MONSTER_MELEE_DAMAGE_MIN, MONSTER_MELEE_DAMAGE_MAX,
    MONSTER_MAGIC_MANA_COST, MONSTER_MAGIC_DAMAGE_MIN, MONSTER_MAGIC_DAMAGE_MAX,
    MONSTER_DAMAGE_PER_LEVEL,
    MONSTER_DAMAGE_BONUS_THRESHOLD, MONSTER_DAMAGE_BONUS_PER_LEVEL,
    INITIATIVE_DIE,
    FLEE_CHANCE, POST_COMBAT_RECOVERY,
    ENEMY_TYPES,
    LOOT_GOLD_MIN, LOOT_GOLD_MAX,
    LOOT_FOOD_CHANCE, LOOT_POTION_CHANCE,
    LOOT_WEAPON_CHANCE, LOOT_ARMOR_CHANCE, LOOT_SHIELD_CHANCE,
    LOOT_EXTRA_CHAR_BONUS, LOOT_DROP_PER_LEVEL,
    MONSTER_DAMAGE_MULTIPLIER,
    RANGED_CRIT_CHANCE,
    MELEE_STUN_CHANCE,
    BACKSTAB_STAMINA_MULT, BACKSTAB_DAMAGE_MULT,
    BACKSTAB_DAMAGE_PER_LEVEL, BACKSTAB_INSTAKILL_CHANCE,
    MELEE_DAMAGE_BONUS_MULT, RANGED_DAMAGE_BONUS_MULT,
    MONSTER_MELEE_DAMAGE_BONUS_PER_LEVEL, MONSTER_RANGED_DAMAGE_BONUS_PER_LEVEL,
    CLERIC_HEAL_MANA_COST, CLERIC_HEAL_PERCENT,
    MAGE_SHIELD_MANA_COST, MAGE_SHIELD_BASE_DEF, MAGE_SHIELD_BASE_ROUNDS, MAGE_SHIELD_BONUS_EVERY, MAGE_SHIELD_MIN_LEVEL,
    NECRO_SUMMON_MANA_COST, NECRO_LIFE_DRAIN_CHANCE,
    NECRO_UNDEAD_MANA_UPKEEP,
    NECRO_DARK_HARVEST_HP_FRAC, NECRO_DARK_HARVEST_ST_FRAC, NECRO_DARK_HARVEST_MANA_FRAC,
    BARBARIAN_RAGE_STAMINA_COST, BARBARIAN_RAGE_HP_REGEN,
    BARBARIAN_WEREBEAR_UNLOCK_LEVEL, BARBARIAN_WEREBEAR_STAMINA_COST,
    BARBARIAN_WEREBEAR_STAMINA_PER_ROUND, BARBARIAN_WEREBEAR_HP_BONUS_FRAC,
    BARBARIAN_WEREBEAR_REGEN, BARBARIAN_WEREBEAR_DEF_PER_LEVEL_DIVISOR,
    BARBARIAN_WEREBEAR_BLEED_CHANCE_PER_LEVEL, BARBARIAN_WEREBEAR_BLEED_DAMAGE_FRAC,
    BARBARIAN_WEREBEAR_BLEED_DURATION_DIVISOR, BARBARIAN_WEREBEAR_BLOOD_FRENZY_CAP_BONUS_PER_LEVEL,
    MONK_MELEE_MANA_COST, MONK_WHIRLWIND_CHANCE,
    MONK_DODGE_CHANCE, MONK_DODGE_STAMINA_COST, MONK_DODGE_MANA_COST,
    RANGER_SUMMON_MANA_COST,
    BARD_SONG_MANA_COST, BARD_SONG_BASE_BONUS,
    BARD_DISRUPT_MANA_COST,
    DRUID_ENTANGLE_MANA_COST, DRUID_ENTANGLE_BASE_DEBUFF, DRUID_ENTANGLE_CHANCE,
    DRUID_SUMMON_MANA_COST,
    POISON_DURATION_ROUNDS, POISON_DAMAGE_FRACTION,
    WEB_DURATION_ROUNDS,
    TRINKET_DROP_CHANCE, TRINKET_DROP_CHANCE_MAX,
    XP_PER_MONSTER_LEVEL,
    LOOT_TORCH_CHANCE,
    LOOT_REAGENT_COMMON_BASE, LOOT_REAGENT_UNCOMMON_BASE, LOOT_REAGENT_RARE_BASE,
    LOOT_REAGENT_EPIC_BASE, LOOT_REAGENT_LEGENDARY_BASE, LOOT_REAGENT_MYTHIC_BASE, LOOT_REAGENT_DIVINE_BASE,
    LOOT_REAGENT_CHANCE_PER_LVL, LOOT_REAGENT_CHANCE_MAX,
    ADVANCED_MATERIAL_DROP_MIN_LEVEL, ADVANCED_MATERIAL_DROP_CHANCE,
    REAGENT_TIER_UNCOMMON_MIN, REAGENT_TIER_RARE_MIN,
    REAGENT_TIER_EPIC_MIN, REAGENT_TIER_LEGENDARY_MIN, REAGENT_TIER_MYTHIC_MIN, REAGENT_TIER_DIVINE_MIN,
    CLERIC_REVIVE_MANA_COST, CLERIC_REVIVE_MIN_LEVEL, CLERIC_REVIVE_HEAL_FRAC,
    CLERIC_TURN_UNDEAD_MIN_LEVEL, CLERIC_TURN_UNDEAD_MANA_COST,
    CLERIC_TURN_UNDEAD_DAMAGE_MULT, CLERIC_TURN_UNDEAD_DEBUFF_BASE, CLERIC_TURN_UNDEAD_DEBUFF_EVERY,
    REAGENT_BOSS_RARE_MIN, REAGENT_BOSS_RARE_MAX,
    REAGENT_BOSS_HIGH_TIER_AMOUNT, REAGENT_MEGABOSS_HIGH_TIER_AMOUNT,
    SCATTER_SPLASH_BASE, SCATTER_SPLASH_EVERY, SCATTER_SPLASH_FRACTION,
    ARTIFICER_DRONE_UNLOCK_LEVEL, ARTIFICER_DRONE_CHANCE_CAP,
    ARTIFICER_DUAL_DRONE_UNLOCK_LEVEL,
    ARTIFICER_SABOTAGE_UNLOCK_LEVEL, ARTIFICER_SABOTAGE_CHANCE_DIVISOR,
    ARTIFICER_HEAL_GOLEM_PCT, ARTIFICER_FREE_REPAIR_CHANCE_PER_LEVEL,
    PALADIN_SMITE_MANA_COST,
    PALADIN_SMITE_INSTAKILL_BASE, PALADIN_SMITE_INSTAKILL_PER_LEVEL,
    PALADIN_SMITE_DAMAGE_BONUS_MULT,
    PALADIN_HEAL_MANA_COST, PALADIN_HEAL_PERCENT,
    PALADIN_FIRE_AURA_MANA_PER_ROUND,
    RIDER_PROC_CHANCE, RIDER_DOT_DAMAGE_FRACTION, RIDER_DOT_DAMAGE_MULT,
    RIDER_FIRE_DAMAGE_BONUS_MULT, RIDER_FIRE_BONUS_ROUNDS, RIDER_STUN_DOT_MULT,
    RIDER_DOT_BASE_ROUNDS, RIDER_DEBUFF_BASE_ROUNDS,
    WRAITH_DRAIN_FRACTION, DRAKE_FIRE_BURN_ROUNDS, DRAKE_FIRE_BURN_FRACTION,
    GHOUL_PARALYZE_CHANCE, TREANT_HOLD_CHANCE,
    STUN_BOSS_RESIST_CHANCE, STUN_MEGABOSS_RESIST_CHANCE,
    DRUID_COMMUNE_UNLOCK_LEVEL, DRUID_COMMUNE_FAE_TOKENS_NEEDED,
    FAERIE_QUEEN_DEFENSE_BASE, FAERIE_QUEEN_HOLD_BASE, FAERIE_QUEEN_HOLD_PER_3LV,
    FAERIE_QUEEN_POISON_FRAC_BASE, FAERIE_QUEEN_POISON_FRAC_PER_LV,
    FAERIE_QUEEN_MAGIC_DMG_RESIST, FAERIE_QUEEN_HP_MULT,
    MAGE_MIRROR_IMAGE_UNLOCK_LEVEL, MAGE_MIRROR_IMAGE_MANA_COST, MAGE_MIRROR_IMAGE_COUNT_DIVISOR,
    MAGE_AOE_CRIT_CHANCE_PER_2LV, MAGE_AOE_CRIT_DAMAGE_BASE, MAGE_AOE_CRIT_DAMAGE_PER_LV,
    MAGE_ARCANE_OVERLOAD_UNLOCK_LEVEL, MAGE_ARCANE_OVERLOAD_BURST_BASE, MAGE_ARCANE_OVERLOAD_BURST_STEP,
    MAGE_ELEMENTAL_RIFT_UNLOCK_LEVEL, MAGE_ELEMENTAL_RIFT_MANA_INITIAL, MAGE_ELEMENTAL_RIFT_MANA_PER_ROUND, MAGE_ELEMENTAL_RIFT_SUMMON_BASE,
    MAGE_L35_UNLOCK_LEVEL, MAGE_MANA_SHIELD_MANA_COST,
    MAGE_DEATH_BURST_DAMAGE_BASE_MULT, MAGE_DEATH_BURST_DAMAGE_PER_LEVEL,
    NECRO_LICH_FORM_UNLOCK_LEVEL, NECRO_LICH_FORM_MANA_PER_ROUND,
    NECRO_LICH_REVIVE_HP_BASE, NECRO_LICH_REVIVE_HP_PER_2LV, NECRO_LICH_REVIVE_ROUNDS,
    NECRO_LICH_MAGIC_RESIST_BASE, NECRO_LICH_MAGIC_RESIST_PER_4LV,
    BARBARIAN_BLOOD_RAGE_UNLOCK_LEVEL, BARBARIAN_TEMP_HP_PER_HIT_FRAC,
    BARBARIAN_WOUND_THRESH_1, BARBARIAN_WOUND_THRESH_2, BARBARIAN_WOUND_THRESH_3,
    BARBARIAN_WOUND_MULT_1, BARBARIAN_WOUND_MULT_2, BARBARIAN_WOUND_MULT_3,
    WARRIOR_DEFEND_MODE_UNLOCK_LEVEL, WARRIOR_INTERCEPT_DAMAGE_MULT,
    WARRIOR_RETALIATION_UNLOCK_LEVEL, WARRIOR_RETALIATION_DAMAGE_MULT,
    WARRIOR_PERSONAL_BLOCK_RETALIATION_UNLOCK_LEVEL,
    WARRIOR_TAUNT_UNLOCK_LEVEL, WARRIOR_TAUNT_STAMINA_PER_ROUND,
    WARRIOR_TAUNT_DEFEND_CHANCE_BONUS, WARRIOR_TAUNT_PENALTY_DIVISOR,
    WARRIOR_TAUNT_DEFEND_PENALTY_DIVISOR,
    MONK_QUIVERING_PALM_UNLOCK_LEVEL, MONK_QUIVERING_PALM_DURATION_BASE,
    MONK_QUIVERING_PALM_DURATION_PER_10LV, MONK_QUIVERING_PALM_STACK_CAP_DIVISOR,
    MONK_QUIVERING_PALM_STACK_CAP_MAX,
    MONK_QUIVERING_PALM_STAMINA_MULT, MONK_QUIVERING_PALM_MANA_MULT,
    MONK_L35_UNLOCK_LEVEL, MONK_KICK_TRIP_ATTACK_DIVISOR,
    MONK_KICK_TRIP_DAMAGE_BASE_BONUS, MONK_KICK_TRIP_DAMAGE_PER_LEVEL,
    MONK_KICK_TRIP_CRIT_PER_LEVEL, MONK_KICK_TRIP_STUN_CHANCE,
    MONK_KICK_TRIP_PRONE_BASE_CHANCE, MONK_KICK_TRIP_PRONE_PER_10_LEVELS,
    MONK_EXPLOSIVE_PALM_MANA_COST, MONK_EXPLOSIVE_PALM_MIN_DOUBLINGS,
    MONK_EXPLOSIVE_PALM_STUN_CHANCE, MONK_EXPLOSIVE_PALM_SHOCKWAVE_FRAC,
    PALADIN_L20_UNLOCK_LEVEL, PALADIN_AOE_SMITE_MANA_MULT,
    PALADIN_AOE_SMITE_DAMAGE_MULT, PALADIN_AOE_SMITE_INSTAKILL_MULT,
    PALADIN_SMITE_INSTAKILL_CAP, PALADIN_SMITE_BOSS_DAMAGE_MULT,
    PALADIN_DRAGONSLAYER_UNLOCK_LEVEL, PALADIN_DRAGONSLAYER_MANA_PER_ROUND,
    PALADIN_L30_UNLOCK_LEVEL,
    PALADIN_AURA_RIGHTEOUSNESS_REDUCTION, PALADIN_AURA_RIGHTEOUSNESS_HEAL_FRAC,
    PALADIN_DIVINE_JUDGMENT_STAMINA_COST, PALADIN_DIVINE_JUDGMENT_MANA_COST,
    PALADIN_DIVINE_JUDGMENT_BASE_PCT, PALADIN_DIVINE_JUDGMENT_PER_LEVEL,
    PALADIN_DIVINE_JUDGMENT_BOSS_DIVISOR, PALADIN_DIVINE_JUDGMENT_MEGABOSS_DIVISOR,
    PALADIN_L35_UNLOCK_LEVEL, PALADIN_STEED_MANA_COST, PALADIN_STEED_MANA_PER_ROUND,
    PALADIN_STEED_HEALTH_BONUS, PALADIN_STEED_MELEE_DAMAGE_BASE_BONUS,
    PALADIN_STEED_MELEE_DAMAGE_PER_LEVEL, PALADIN_STEED_MELEE_RESIST,
    PALADIN_STEED_SMITE_CRIT_BASE, PALADIN_STEED_SMITE_CRIT_PER_LEVEL,
    PALADIN_STEED_SMITE_CRIT_MULT, PALADIN_COVENANT_MANA_PER_ROUND,
    PALADIN_COVENANT_TRIGGER_MAX_HP_FRAC, PALADIN_COVENANT_MIN_HP_FRAC,
    CLERIC_MASS_REGEN_UNLOCK_LEVEL, CLERIC_MASS_REGEN_BASE_PCT,
    CLERIC_MASS_REGEN_PER_3_LEVELS, CLERIC_MASS_REGEN_DURATION_PER_4LV,
    CLERIC_MASS_REGEN_MANA_COST,
    CLERIC_MASS_REVIVE_UNLOCK_LEVEL, CLERIC_MASS_REVIVE_COUNT_DIVISOR,
    CLERIC_MASS_REVIVE_HEAL_BASE, CLERIC_MASS_REVIVE_HEAL_PER_3LV,
    CLERIC_MASS_REVIVE_MANA_COST, CLERIC_CLEANSE_MANA_PER_STATE,
    BARD_CHARM_UNLOCK_LEVEL, BARD_CHARM_MANA_COST,
    BARD_CHARM_BASE_CHANCE, BARD_CHARM_CHANCE_PER_2_LV,
    BARD_CHARM_DURATION_DIVISOR, BARD_CHARM_IMMUNE_TAGS,
    BARD_RALLYING_MELODY_UNLOCK_LEVEL, BARD_RALLYING_MELODY_MANA_COST,
    BARD_RALLYING_MELODY_RESTORE_FRACTION,
    RANGER_EXPLOSIVE_ARROW_UNLOCK_LEVEL, RANGER_EXPLOSIVE_ARROW_STAMINA_MULT,
    RANGER_EXPLOSIVE_ARROW_DAMAGE_MULT, RANGER_EXPLOSIVE_ARROW_CRIT_MULT,
    RANGER_EXPLOSIVE_ARROW_INSTAKILL_MULT,
    ROGUE_BACKSTAB_BLEED_UNLOCK_LEVEL, ROGUE_BACKSTAB_BLEED_FRAC,
    ROGUE_BACKSTAB_BLEED_DURATION_DIVISOR,
    DRUID_SHAMBLING_MOUND_UNLOCK_LEVEL, DRUID_SHAMBLING_MOUND_MANA_COST, DRUID_SHAMBLING_MOUND_CAP_DIVISOR,
    ROGUE_TRAP_UNLOCK_LEVEL, ROGUE_TRAP_DOT_FRACTION, ROGUE_TRAP_DOT_ROUNDS,
    ROGUE_EVASION_STAMINA_COST,
    ROGUE_TWIN_FANGS_UNLOCK_LEVEL, ROGUE_TWIN_FANGS_OFFHAND_MULT, ROGUE_TWIN_FANGS_INSTAKILL_MULT,
    ROGUE_SHADOW_STEP_UNLOCK_LEVEL, ROGUE_SHADOW_STEP_STAMINA_COST,
    ROGUE_SHADOW_STEP_DURATION, ROGUE_SHADOW_STEP_BACKSTAB_MULT,
    ROGUE_TRAP_MASTERY_UNLOCK_LEVEL, ROGUE_TRAP_MASTERY_DAMAGE_MULT,
    ROGUE_TRAP_MASTERY_EXTRA_ROUNDS, ROGUE_TRAP_MASTERY_PENALTY_DIVISOR,
    ROGUE_EXTRA_LOOT_UNLOCK_LEVEL, ROGUE_EXTRA_LOOT_GOLD_PCT_PER_LEVEL,
    GOLEM_ATTACHMENT_LIMB_DAMAGE_MULT, GOLEM_ATTACHMENT_SHIELD_BLOCK_CHANCE,
    BARBARIAN_ENCOURAGE_UNLOCK_LEVEL, BARBARIAN_ENCOURAGE_DAMAGE_PER_ROUND,
    BARBARIAN_ENCOURAGE_MAX_ROUNDS, BARBARIAN_ENCOURAGE_MAX_DAMAGE_MULT,
    NECRO_DEMI_LICH_UNLOCK_LEVEL, NECRO_DEMI_LICH_MANA_COST,
    NECRO_DEMI_LICH_DEFENSE_BASE, NECRO_DEMI_LICH_DEFENSE_PER_LEVEL,
    NECRO_DEMI_LICH_TARGET_DIVISOR, NECRO_DEMI_LICH_DAMAGE_PER_LEVEL,
    NECRO_DEMI_LICH_MAGIC_RESIST,
    RANGER_TOTEM_UNLOCK_LEVEL, RANGER_TOTEM_MANA_PER_ROUND,
    RANGER_TOTEM_DURATION_DIVISOR, RANGER_WOLF_TOTEM_BLEED_FRACTION,
    RANGER_BEAR_TOTEM_STUN_CHANCE, RANGER_EAGLE_TOTEM_DAMAGE_PER_LEVEL,
    RANGER_EAGLE_TOTEM_DEFLECT_PER_LEVEL, RANGER_EAGLE_TOTEM_REFLECT_FRACTION,
    RANGER_PIXIE_TOTEM_POISON_FRACTION, RANGER_PIXIE_TOTEM_MAGIC_RESIST,
    MONK_AVATAR_UNLOCK_LEVEL, MONK_AVATAR_MANA_PER_ROUND, MONK_AVATAR_HP_REGEN,
    MONK_AVATAR_CLEANSE_BASE, MONK_AVATAR_CLEANSE_PER_LEVEL,
    MONK_AVATAR_DOT_FRACTION, MONK_AVATAR_DOT_DURATION_DIVISOR,
    WARRIOR_SQUIRE_UNLOCK_LEVEL, WARRIOR_SQUIRE_STAMINA_COST,
    WARRIOR_SQUIRE_HP_FRACTION, WARRIOR_SQUIRE_STAMINA_FRACTION,
    WARRIOR_SQUIRE_MELEE_FRACTION, WARRIOR_SQUIRE_DEFENSE_FRACTION,
    WARRIOR_SQUIRE_SHIELD_BLOCK, WARRIOR_SQUIRE_ATTACKS_PER_LEVELS,
    WARRIOR_SQUIRE_COUNT_L60, WARRIOR_SQUIRE_COUNT_L90,
    WARRIOR_FORMATION_UNLOCK_LEVEL, WARRIOR_FORMATION_STAMINA_PER_ROUND,
    WARRIOR_FORMATION_BASE_BONUS, WARRIOR_FORMATION_BONUS_PER_MEMBER,
    WARRIOR_FORMATION_MIN_MEMBERS, WARRIOR_FORMATION_OPPORTUNITY_OFFSET,
    WARRIOR_FORMATION_CRIT_DIVISOR, WARRIOR_FORMATION_CRIT_BASE,
    WARRIOR_FORMATION_CRIT_PER_LEVEL,
    WARRIOR_SHIELD_WALL_UNLOCK_LEVEL, WARRIOR_SHIELD_WALL_LEVEL_DIVISOR,
    ENEMY_STAT_MIN, ENEMY_STAT_MAX,
    MONSTER_HP_BONUS_THRESHOLD, MONSTER_HP_BONUS_PER_LEVEL,
    MONSTER_DEFENSE_PER_2_LVL,
    RANGER_HUNTERS_MARK_UNLOCK_LEVEL, RANGER_HUNTERS_MARK_STAMINA_COST, RANGER_HUNTERS_MARK_MANA_COST,
    RANGER_HUNTERS_MARK_DAMAGE_BONUS, RANGER_HUNTERS_MARK_UPKEEP_MANA, RANGER_HUNTERS_MARK_UPKEEP_STAMINA,
    RANGER_BEASTLORD_UNLOCK_LEVEL, RANGER_BEASTLORD_MANA_PER_ROUND,
    RANGER_BEASTLORD_SUMMON_BASE, RANGER_BEASTLORD_UPKEEP_PER_SUMMON,
    DRUID_WILD_SHAPE_UNLOCK_LEVEL, DRUID_WILD_SHAPE_MANA_INITIAL, DRUID_WILD_SHAPE_MANA_PER_ROUND,
    DRUID_WILD_BEAR_ATTACKS_DIVISOR, DRUID_WILD_BEAR_STUN_BASE, DRUID_WILD_BEAR_STUN_PER_LEVEL,
    DRUID_WILD_BEAR_DEFENSE_DIVISOR,
    DRUID_WILD_WOLF_ATTACKS_DIVISOR, DRUID_WILD_WOLF_BLEED_BASE, DRUID_WILD_WOLF_BLEED_PER_LEVEL,
    DRUID_WILD_WOLF_BLEED_FRACTION, DRUID_WILD_WOLF_BLEED_DURATION_DIVISOR, DRUID_WILD_WOLF_DEFENSE_DIVISOR,
    DRUID_WILD_EAGLE_ATTACKS_DIVISOR, DRUID_WILD_EAGLE_CRIT_BASE, DRUID_WILD_EAGLE_CRIT_PER_LEVEL,
    DRUID_WILD_EAGLE_CRIT_MULT_BASE, DRUID_WILD_EAGLE_CRIT_MULT_PER_LEVEL, DRUID_WILD_EAGLE_EVASION_PER_LEVEL,
    DRUID_WILD_PIXIE_MAGIC_RESIST,
    DRUID_WILD_TREANT_ATTACKS_DIVISOR, DRUID_WILD_TREANT_HOLD_BASE, DRUID_WILD_TREANT_HOLD_PER_LEVEL,
    DRUID_WILD_TREANT_DEFENSE_DIVISOR,
    DRUID_WILD_SUMMON_DMG_MULT, DRUID_WILD_SUMMON_DMG_MULT_PIXIE,
    DRUID_WILD_SUMMON_DEF_BONUS_DIVISOR, DRUID_WILD_SUMMON_DEF_DIVISOR_PIXIE,
    DRUID_WILD_WOLF_CASCADE_BASE,
    DRUID_VERDANT_SURGE_UNLOCK_LEVEL, DRUID_VERDANT_SURGE_ACTION_LOSS_CHANCE,
    DRUID_NATURES_CHARM_UNLOCK_LEVEL, DRUID_NATURES_CHARM_MANA_COST,
    DRUID_NATURES_CHARM_UPKEEP_PER_ROUND, DRUID_NATURES_CHARM_CHANCE_DIVISOR,
    DRUID_NATURES_CHARM_TAGS, DRUID_NATURES_CHARM_RESIST_CAP,
    DRUID_NATURES_CHARM_DURATION_BONUS, DRUID_NATURES_CHARM_BOLSTER_PER_LEVEL,
    DRUID_WITHER_PLANTS_UNLOCK_LEVEL, DRUID_WITHER_PLANTS_MANA_COST,
    DRUID_WITHER_PLANTS_DAMAGE_BASE, DRUID_WITHER_PLANTS_DAMAGE_PER_LEVEL,
    DRUID_WITHER_PLANTS_INSTAKILL_DIVISOR, DRUID_WITHER_PLANTS_TARGET_TAG,
    MONK_KI_UNLOCK_LEVEL,
    CLERIC_SPIRITUAL_WEAPON_UNLOCK_LEVEL, CLERIC_SPIRITUAL_WEAPON_SUMMON_COST,
    CLERIC_SPIRITUAL_WEAPON_UPKEEP, CLERIC_SPIRITUAL_WEAPON_ATK_DIVISOR,
    CLERIC_BANISHMENT_UNLOCK_LEVEL, CLERIC_BANISHMENT_MANA_COST,
    CLERIC_BANISHMENT_DAMAGE_MULT, CLERIC_BANISHMENT_TAGS,
    CLERIC_L35_UNLOCK_LEVEL, CLERIC_DIVINE_SHROUD_MANA_PER_ROUND,
    CLERIC_DIVINE_SHROUD_REDUCTION_PER_LEVEL, CLERIC_DIVINE_SHROUD_REVIVE_HP_FRAC,
    NECRO_DARK_APOTHEOSIS_UNLOCK_LEVEL, NECRO_CORPSE_HORROR_HP_FRACTION,
    NECRO_CORPSE_HORROR_DEF_DIVISOR, NECRO_CORPSE_HORROR_SKILL_PER_CORPSE,
    NECRO_CORPSE_HORROR_ATTACKS_PER_CORPSE, NECRO_CORPSE_HORROR_ATTACK_CAP_BONUS,
    NECRO_PLAGUE_BRINGER_UNLOCK_LEVEL, NECRO_PLAGUE_BRINGER_MANA_COST,
    NECRO_L35_UNLOCK_LEVEL, NECRO_CONTROL_DEAD_MANA_COST,
    NECRO_SIPHON_POWER_MANA_COST, NECRO_SIPHON_POWER_MIN_DIVISOR, NECRO_SIPHON_POWER_MAX_MULT,
    ARTIFICER_BERSERK_UNLOCK_LEVEL, ARTIFICER_BERSERK_DMG_PER_LEVEL,
    ARTIFICER_BERSERK_OVERLOAD_PCT, ARTIFICER_BERSERK_MIN_HP_PCT,
    ARTIFICER_MULTI_GOLEM_UNLOCK_LEVEL,
    ARTIFICER_DECONSTRUCT_UNLOCK_LEVEL, ARTIFICER_DECONSTRUCT_BONUS_MULT,
    ARTIFICER_DECONSTRUCT_SCAVENGE_CHANCE, ARTIFICER_DECONSTRUCT_GOLEM_HEAL_PCT,
    BARBARIAN_BLOOD_FRENZY_UNLOCK_LEVEL, BARBARIAN_BLOOD_FRENZY_DAMAGE_PER_BLEED,
    BARBARIAN_HEROIC_DEEDS_UNLOCK_LEVEL,
    BARBARIAN_ODINS_RAVENS_UNLOCK_LEVEL, BARBARIAN_ODINS_RAVENS_BASE_CHANCE,
    BARBARIAN_ODINS_RAVENS_LEVEL_CHANCE, BARBARIAN_ODINS_RAVENS_MAX_CHANCE,
    BARBARIAN_ODINS_RAVENS_REVIVE_FRAC, BARBARIAN_VALKYRIE_DEF_PER_LEVEL,
    BARBARIAN_VALKYRIE_ATK_PER_ROUND_DIVISOR, BARBARIAN_VALKYRIE_DAMAGE_MIN,
    BARBARIAN_VALKYRIE_DAMAGE_MAX, BARBARIAN_VALKYRIE_DAMAGE_PER_LEVEL,
    BARBARIAN_VALKYRIE_CRIT_CHANCE, BARBARIAN_VALKYRIE_BLOCK_CHANCE,
    BARBARIAN_VALKYRIE_MAGIC_AOE_DAMAGE_MULT,
    BARD_THUNDEROUS_DRUMS_UNLOCK_LEVEL, BARD_THUNDEROUS_DRUMS_MANA_PER_ROUND,
    BARD_THUNDEROUS_DRUMS_MAX_REDUCTION,
    BARD_SYMPHONY_UNLOCK_LEVEL, BARD_SYMPHONY_BASE_MANA_COST, BARD_SYMPHONY_BASE_STA_COST,
    BARD_QUICKSTEP_SONG_UNLOCK_LEVEL, BARD_QUICKSTEP_SONG_MANA_COST,
    BARD_SOULFUL_MELODY_UNLOCK_LEVEL, BARD_SOULFUL_MELODY_MANA_COST,
    BARD_SOULFUL_MELODY_DURATION, BARD_SOULFUL_MELODY_ATK_DEF_DIVISOR,
    BARD_SOULFUL_MELODY_STACK_ATK_BONUS, BARD_SOULFUL_MELODY_STACK_DEF_BONUS,
    BARD_SOULFUL_MELODY_STACK_DUR_BONUS,
    STATUE_EVENT_ROUND_BOSS, STATUE_EVENT_ROUND_MEGA_BOSS, STATUE_EVENT_ROUND_SUPER_BOSS,
    SUPER_BOSS_HP_MULT, SUPER_BOSS_DEFENSE_PER_DL, SUPER_BOSS_MELEE_PER_DL, SUPER_BOSS_MAGIC_PER_DL,
    SUPER_BOSS_ACTIONS_PER_TURN, SUPER_BOSS_SUMMON_COUNT,
    STATUE_BOSS_AURA_MULT, PALADIN_DIVINE_JUDGMENT_SUPERBOSS_DIVISOR,
    SUPER_BOSS_MUMMY_ROT_MULT, STATUE_GOLD_MULT, STATUE_XP_MULT,
    SUPERBOSS_NAMES, LEGENDARY_ITEM_IDS,
    VK_ATTACK_MANA_COST_BASE, VK_ATTACK_EXTRA_PER_5LV,
    VK_DOT_DAMAGE_FRAC, VK_DOT_ROUNDS_PER_ATTACK,
    VK_POISON_DAMAGE_BONUS, VK_ACID_DEF_DEBUFF,
    VK_SUMMON_VERMIN_MANA_COST, VK_SUMMON_VERMIN_UNLOCK_LEVEL,
    VK_VERMIN_TYPES,
    VK_SUMMON_SLIME_MANA_COST, VK_SUMMON_SLIME_UNLOCK_LEVEL,
    VK_SLIME_TYPES,
    VK_SUMMON_CASCADE_BASE, VK_SUMMON_CASCADE_DROP, VK_SUMMON_CASCADE_LEVEL_BONUS,
    VK_CHARM_VERMIN_UNLOCK_LEVEL, VK_CHARM_VERMIN_MANA_COST, VK_CHARM_VERMIN_TAGS,
    VK_INSECT_PLAGUE_UNLOCK_LEVEL, VK_INSECT_PLAGUE_MANA_COST,
    VK_INSECT_PLAGUE_DOT_FRAC,
    VK_SWARM_UNLOCK_LEVEL, VK_SWARM_SUMMON_MANA_COST,
    VK_SWARM_MAX_UPGRADE_DIVISOR,
    VK_SWARM_DEFENSE_PER_LEVEL,
    VK_VSWARM_MELEE_RESIST, VK_VSWARM_MAGIC_WEAKNESS, VK_VSWARM_FIRE_WEAKNESS,
    VK_VSWARM_POISON_DOT_FRAC, VK_VSWARM_POISON_DOT_ROUNDS,
    VK_VSWARM_DEBUFF_DIV, VK_VSWARM_DEBUFF_ROUNDS,
    VK_ASWARM_MELEE_RESIST, VK_ASWARM_MAGIC_WEAKNESS, VK_ASWARM_LIGHTNING_WEAKNESS,
    VK_ASWARM_ACID_DOT_FRAC, VK_ASWARM_ACID_DOT_ROUNDS,
    VK_ASWARM_DEBUFF_DIV, VK_ASWARM_DEBUFF_ROUNDS,
    VK_SWARM_PROTECT_BASE_CHANCE, VK_SWARM_PROTECT_LEVEL_DIV, VK_SWARM_PROTECT_MANA_COST,
    VK_L35_UNLOCK_LEVEL, VK_FRENZY_DAMAGE_BASE_MULT, VK_FRENZY_DAMAGE_PER_LEVEL,
    VK_HIVE_MIND_UPKEEP_MANA, VK_FRENZY_EXTRA_ACTION_CHANCES,
    VK_RESIST_PER_LEVEL,
    VK_INSECT_PLAGUE_LEVEL_DMG_BONUS,
    WARLOCK_HEX_UPKEEP_MANA, WARLOCK_HEX_PENALTY_DIVISOR, WARLOCK_HEX_DURATION_DIVISOR,
    WARLOCK_CURSE_UNLOCK_LEVEL, WARLOCK_CURSE_MANA_COST, WARLOCK_CURSE_BASE_PCT,
    WARLOCK_CURSE_MAX_PCT, WARLOCK_CURSE_BASE_ROUNDS, WARLOCK_CURSE_LEVEL_DIVISOR,
    WARLOCK_CURSE_MAX_ROUNDS, WARLOCK_CURSE_SHRUG_CHANCE,
    WARLOCK_CHARM_UNLOCK_LEVEL, WARLOCK_CHARM_MANA_COST,
    WARLOCK_CAULDRON_UNLOCK_LEVEL, WARLOCK_CAULDRON_HP_COST, WARLOCK_DEMON_UPKEEP_HP,
    WARLOCK_ABYSS_FORM_UNLOCK_LEVEL, WARLOCK_ABYSS_MAGIC_RESIST, WARLOCK_ABYSS_COLD_ACID_RESIST,
    WARLOCK_DEMON_PROTECTION_CAP, WARLOCK_ELDRITCH_SIGN_TARGET_DIVISOR,
    WARLOCK_ELDRITCH_SIGN_RECHARGE_CHANCE,
    WARLOCK_L35_UNLOCK_LEVEL,
    WARLOCK_HOOKED_TENTACLE_CRIT_PER_LEVEL,
    WARLOCK_HOOKED_TENTACLE_CRIT_BONUS_BASE,
    WARLOCK_HOOKED_TENTACLE_CRIT_BONUS_PER_LEVEL,
    WARLOCK_HOOKED_TENTACLE_BLEED_BASE_CHANCE,
    WARLOCK_HOOKED_TENTACLE_BLEED_CHANCE_PER_LEVEL,
    WARLOCK_HOOKED_TENTACLE_BLEED_ROUNDS_DIVISOR,
    WARLOCK_AWAKEN_TRIGGER_SUMMONS,
    PHOTOMANCER_COLOR_SPRAY_MANA_COST, PHOTOMANCER_MIRROR_IMAGE_UNLOCK_LEVEL,
    PHOTOMANCER_MIRROR_IMAGE_MANA_COST, PHOTOMANCER_BLUR_UNLOCK_LEVEL,
    PHOTOMANCER_BLUR_MANA_COST, PHOTOMANCER_BLUR_MISS_CHANCE,
    PHOTOMANCER_INVISIBILITY_MANA_COST, PHOTOMANCER_ILLUSION_UNLOCK_LEVEL,
    PHOTOMANCER_ILLUSION_MANA_COST, PHOTOMANCER_IMPROVED_INVIS_UNLOCK_LEVEL,
    PHOTOMANCER_DISINTEGRATE_UNLOCK_LEVEL, PHOTOMANCER_DISINTEGRATE_MANA_COST,
    PHOTOMANCER_DISINTEGRATE_BASE_KILL, PHOTOMANCER_DISINTEGRATE_BOSS_MULT,
    PHOTOMANCER_PRISMATIC_SPHERE_UNLOCK_LEVEL, PHOTOMANCER_PRISMATIC_SPHERE_MANA_COST,
    POTION_MINOR_HEAL_PCT, POTION_GREATER_HEAL_PCT, POTION_MANA_RESTORE_PCT,
    calcScrollBonus,
    RANGER_L35_UNLOCK_LEVEL,
    RANGER_BEAST_COMPANION_TYPES,
    RANGER_RICOCHET_CHANCES,
    RANGER_RICOCHET_DAMAGE_MULT,
    RANGER_RICOCHET_MP_COST,
    RANGER_RICOCHET_INSTAKILL_MULT,
} from '../utils/constants.js';
import { soundManager } from '../utils/SoundManager.js';
import {
    randomWeaponDrop, randomArmorDrop, randomShieldDrop,
    randomTrinketDrop, getItemDef,
} from '../items/ItemTypes.js';
import { PartyMember } from '../entities/PartyMember.js';
import { Enemy } from '../entities/Enemy.js';
import {
    UNDEAD_TIERS, getNecromancerUnlocked, rollUndeadStats,
    BEAST_TYPES, rollBeastStats,
    GOLEM_TIERS, GOLEM_PRESETS, getArtificerUnlockedGolems, rollGolemStats,
    VERMIN_PRESETS, SLIME_PRESETS, VERMIN_SWARM_PRESET, ACID_SWARM_PRESET,
    rollVerminStats, rollSwarmStats,
    WARLOCK_DEMON_PRESETS, getWarlockUnlockedDemons, rollWarlockDemonStats,
    WARLOCK_AWAKENED_PRESETS, WARLOCK_AWAKENED_IDS, rollWarlockAwakenedStats,
    ILLUSIONARY_WARRIOR_PRESET,
} from '../entities/Summons.js';
import {
    SHADOW_SIMULACRA_DOT_POWERS,
    isShadowSimulacra,
} from '../entities/ShadowSimulacra.js';

function randomInt(min, max) {
    return min + Math.floor(Math.random() * (max - min + 1));
}

/**
 * CombatSystem — turn-based combat engine with class specials.
 *
 * Class-specific actions (exposed as public methods called by CombatUI):
 *   - backstab(target)        — rogue only (can use from back row)
 *   - clericHeal(target)      — cleric only
 *   - summonUndead(tierIdx)   — necromancer only (L1 Skeleton, L3 Zombie, …)
 *   - summonBeast(beastId)    — ranger OR druid ('bear' | 'eagle' | 'pixie')
 *   - bardSong()              — bard only (once per combat; party-wide buff)
 *   - druidEntangle()         — druid only (AoE debuff)
 *
 * Phase 8 mechanics:
 *   - Fallen PartyMembers STAY fallen after combat (no auto-revive).
 *   - Summons are pushed directly into gameState.party so the PartyHUD
 *     reflects them. After VICTORY/DEFEAT/FLED, Game.js cleans them up.
 *   - DoTs / buffs / debuffs are stored on `activeEffects` arrays for both
 *     party members and enemies; they tick at the start of each round.
 *   - Poison: applied on some monster melee (spiders, slimes, basilisks).
 *     Pattern is reusable for player-side DoTs.
 *   - Stun: Trolls have a chance to stun on hit (same semantics as warrior
 *     melee stun); template also used for any future "lose your turn" abilities.
 *   - Troll regen: 25% of max HP per turn at the start of the enemy round.
 *   - Cultist AoE magic: magic attacks hit every front-row member at once.
 *   - Backstab damage = base × 2 × (1 + 0.10 × rogueLevel). Instakill stays 5%+1%/level.
 */
export class CombatSystem {
    constructor() {
        this.party = [];
        this.enemies = [];
        this.currentMemberIndex = 0;
        this.phase = 'IDLE';
        this.log = [];
        this.playerLog  = [];   // messages from player-turn actions
        this.enemyLog   = [];   // messages from enemy-turn actions
        this._logTarget = 'player'; // 'player' | 'enemy'
        this.loot = null;
        this.xpEarned = 0;
        this.levelUpLogs = [];
        this.onUpdate = null;
        // Optional callback fired at the start of each new round (before initiative
        // is rebuilt).  Game.js uses this to run the wandering monster check.
        // Signature: () => Array<{ enemy: Enemy }> — return newcomers to add.
        this.onRoundBegin = null;
        this.turnNumber = 0;
        this.dungeonLevel = 1;
        // Initiative — sorted list of {kind:'party'|'enemy', ref, init, skipThisRound}
        this._initiativeOrder = [];
        this._initTurnIdx = 0;
        this.pauseAfterEachTurn = false; // manual combat mode — pause after each enemy/summon turn
        // Tracks which mage has an active shield so only one can be up at a time.
        this._mageShieldCasterId = null;
        // Shared reference to the party inventory (artificer golem crafting /
        // healing consumes reagents). Set via startCombat or setInventory.
        this.inventory = null;
        this.telemetry = null;
        this._lastDamageByEnemyId = Object.create(null);
        this.prismaticSphere = null;
    }

    /** Game.js can assign the live inventory reference (also set in startCombat). */
    setInventory(inv) { this.inventory = inv || null; }
    setTelemetry(handler) {
        this.telemetry = typeof handler === 'function' ? handler : null;
    }

    _emitTelemetry(event, payload = {}) {
        if (!this.telemetry) return;
        try {
            this.telemetry(event, payload);
        } catch (err) {
            // Telemetry failures must never break combat resolution.
        }
    }

    // ────────────────────────────────────────────
    // Lifecycle
    // ────────────────────────────────────────────

    /**
     * Begin combat. NOTE: `party` is stored *by reference* so that any summons
     * we push into `this.party` are also visible on gameState.party (used by
     * PartyHUD). Do NOT slice the party array here.
     *
     * @param {PartyMember[]} party
     * @param {Enemy[]} enemies
     * @param {number} [dungeonLevel=1]
     */
    startCombat(party, enemies, dungeonLevel = 1, inventory = null, options = {}) {
        this.party = party;                 // live reference (see note above)
        // Guard: only bring in enemies that are actually alive.  Dead entries
        // (health ≤ 0) can sneak in when a trigger enemy was dying on the same
        // frame, or when force-spawned extras race with the previous combat's
        // cleanup. Filtering here prevents the "instant victory" on entry.
        this.enemies = enemies.filter(e => e.health > 0);
        if (inventory) this.inventory = inventory;
        this.currentMemberIndex = 0;
        this.log = [];
        this.loot = null;
        this._mageShieldCasterId = null;
        this.xpEarned = 0;
        this.levelUpLogs = [];
        this.turnNumber = 1;
        this.dungeonLevel = Math.max(1, dungeonLevel | 0);
        this.phase = 'IDLE'; // Reset any stale phase from a previous combat.
        // Statue gauntlet state
        this.isStatueEvent        = !!(options && options.isStatueEvent);
        this.statueTheme          = (options && options.statueTheme) || 'undead';
        this.statueWave           = 1;
        this.statueSuperBossSpawned = false;

        // If the enemy list is empty after filtering abort and signal a free win
        // so Game.js cleans up properly rather than leaving combat in a bad state.
        if (this.enemies.length === 0) {
            this._addLog('--- No living enemies found — victory! ---');
            this.phase = 'VICTORY';
            this.loot = { gold: 0, items: [] };
            this._notify();
            return;
        }

        for (const e of this.enemies) {
            e.stunned = false;
            e.activeEffects = e.activeEffects || [];
            e.activeEffects.length = 0;
        }
        for (const m of this.party) {
            if (typeof m.clearCombatState === 'function') m.clearCombatState();
        }
        this.prismaticSphere = null;

        this._addLog('--- Combat begins! ---');
        const n = this.enemies.length;
        const lvlStr = this.dungeonLevel > 1 ? ` (dungeon L${this.dungeonLevel})` : '';
        this._addLog(`${n} enem${n > 1 ? 'ies' : 'y'} encountered${lvlStr}!`);

        // Roll initiative for all combatants and log the order.
        this._initiativeOrder = this._buildInitiativeOrder();
        this._initTurnIdx = 0;
        const initStr = this._initiativeOrder
            .map(s => {
                const name = s.kind === 'party' ? s.ref.name : this._eName(s.ref);
                return `${name}(${s.init})`;
            })
            .join(', ');
        this._addLog(`\u26A1 Initiative: ${initStr}`);

        this._advanceThroughInitiative();
    }

    // ────────────────────────────────────────────
    // Queries
    // ────────────────────────────────────────────

    get currentMember() { return this.party[this.currentMemberIndex] ?? null; }
    get charmedAllies() {
        return this.enemies
            .filter(e => e.health > 0 && e.charmedRounds > 0)
            .map(e => this._prepareCharmedAlly(e));
    }
    get aliveParty()   { return this.party.filter(m => m.health > 0).concat(this.charmedAllies); }
    get aliveFront()   { return this.party.filter(m => m.health > 0 && m.row === 'front').concat(this.charmedAllies); }
    get aliveBack()    { return this.party.filter(m => m.health > 0 && m.row === 'back'); }
    get aliveEnemies() { return this.enemies.filter(e => e.health > 0); }

    /** Alive enemies that are NOT currently charmed — used for victory checks. */
    get aliveHostileEnemies() { return this.enemies.filter(e => e.health > 0 && !(e.charmedRounds > 0)); }

    /** True when every real (non-summoned) party member is at 0 HP — even if summoned undead remain. */
    get allRealMembersDefeated() { return this.party.filter(p => !p.isSummoned).every(p => p.health <= 0); }

    _prepareCharmedAlly(enemy) {
        if (!enemy) return enemy;
        enemy.activeEffects = enemy.activeEffects || [];
        if (typeof enemy.addEffect !== 'function') {
            enemy.addEffect = function(effect) {
                if (!this.activeEffects) this.activeEffects = [];
                this.activeEffects.push(effect);
            };
        }
        if (typeof enemy.getArmorBlocking !== 'function') enemy.getArmorBlocking = () => 0;
        if (typeof enemy.getTotalDefense !== 'function') {
            enemy.getTotalDefense = function() {
                const effects = this.activeEffects || [];
                const effectDefense = effects.reduce((sum, fx) => sum + (typeof fx?.defenseBonus === 'number' ? fx.defenseBonus : 0), 0);
                return Math.max(0, (this.defense || 0) + effectDefense);
            };
        }
        if (typeof enemy.getEffectiveDodgePct !== 'function') enemy.getEffectiveDodgePct = () => 0;
        if (typeof enemy.getShieldBlockChance !== 'function') enemy.getShieldBlockChance = () => 0;
        if (typeof enemy.getStunResistChance !== 'function') enemy.getStunResistChance = () => 0;
        // Several monster rider logs use target.name directly. Preserve the
        // full combat label, including level, once a monster switches sides.
        if (!enemy.name) enemy.name = this._eName(enemy);
        return enemy;
    }

    _getEnemyTags(enemy) {
        const def = ENEMY_TYPES[enemy?.type] || {};
        return Array.isArray(def.tags) ? def.tags : [];
    }

    _getVKById(id) {
        if (!id) return null;
        return (this.party || []).find(p => p && p.id === id && !p.isSummoned && p.classId === 'verminkeeper') || null;
    }

    _isVKFrenzyEligibleMember(member, stats = null) {
        if (!member || member.health <= 0) return false;
        const st = stats || member.summonStats || {};
        const kind = st.beastKind;
        if (!(kind === 'vermin' || kind === 'slime')) return false;
        if (kind === 'vermin_swarm' || kind === 'acid_swarm') return false;
        return true;
    }

    _getVKFrenzyDamageMultiplier(keeperLevel) {
        const lvl = Math.max(1, Number(keeperLevel) || 1);
        return VK_FRENZY_DAMAGE_BASE_MULT + lvl * VK_FRENZY_DAMAGE_PER_LEVEL;
    }

    _getVKFrenzyActionCount(keeperLevel) {
        const lvl = Math.max(1, Number(keeperLevel) || 1);
        if (lvl < VK_L35_UNLOCK_LEVEL) return 1;
        let actions = 2; // base action + guaranteed second action
        for (const chance of VK_FRENZY_EXTRA_ACTION_CHANCES) {
            if (Math.random() < chance) actions++;
            else break;
        }
        return actions;
    }

    _getVKHiveMarkTarget(vkId) {
        const vk = this._getVKById(vkId);
        if (!vk || !vk.vkHiveMindEnemyId) return null;
        const marked = this.aliveHostileEnemies.find(e => e.id === vk.vkHiveMindEnemyId);
        return marked || null;
    }

    _clearVKHiveMark(vk, reason = null) {
        if (!vk) return;
        const oldId = vk.vkHiveMindEnemyId;
        if (!oldId) return;
        const old = this.enemies.find(e => e.id === oldId);
        if (old) {
            old.activeEffects = (old.activeEffects || []).filter(fx => fx && !(fx.type === 'vk_hive_mark' && fx.markerId === vk.id));
        }
        vk.vkHiveMindEnemyId = null;
        if (reason) this._addLog(`🕸️ ${vk.name}'s Hive Mind mark fades (${reason}).`);
    }

    _setVKHiveMark(vk, enemy) {
        if (!vk || !enemy) return;
        this._clearVKHiveMark(vk);
        vk.vkHiveMindEnemyId = enemy.id;
        enemy.activeEffects = enemy.activeEffects || [];
        enemy.activeEffects.push({ type: 'vk_hive_mark', markerId: vk.id });
    }

    _addLootItemStack(items, itemId, quantity = 1) {
        if (!Array.isArray(items) || !itemId || quantity <= 0) return;
        const existing = items.find(i => i.itemId === itemId);
        if (existing) existing.quantity += quantity;
        else items.push({ itemId, quantity });
    }

    _getElementalEssenceItemId(enemy) {
        const type = String(enemy?.type || '').toLowerCase();
        if (type.includes('fire')) return 'material_fire_essence';
        if (type.includes('air')) return 'material_air_essence';
        if (type.includes('earth') || type.includes('stone')) return 'material_earth_essence';
        if (type.includes('water')) return 'material_water_essence';

        // Fallback for atypical elemental IDs.
        const fallback = [
            'material_fire_essence',
            'material_air_essence',
            'material_earth_essence',
            'material_water_essence',
        ];
        return fallback[Math.floor(Math.random() * fallback.length)];
    }

    _getAdvancedMaterialDropPool(enemy) {
        if (!enemy) return [];

        const tags = this._getEnemyTags(enemy);
        const type = String(enemy.type || '').toLowerCase();
        const pool = new Set();

        if (type === 'displacer_beast') pool.add('material_hide');

        if (tags.includes('construct')) {
            pool.add('material_construct_heart');
            pool.add('material_construct_head');
            pool.add('material_construct_arm');
            pool.add('material_construct_leg');
            pool.add('material_construct_torso');
        }

        if (tags.includes('elemental')) {
            pool.add(this._getElementalEssenceItemId(enemy));
        }

        if (tags.includes('giant')) pool.add('material_giant_heart');

        if (tags.includes('dragon')) {
            pool.add('material_hide');
            pool.add('material_dragon_heart');
        }

        if (tags.includes('undead')) pool.add('material_undead_essence');
        if (type.includes('troll')) pool.add('material_troll_blood');
        if (tags.includes('vermin')) pool.add('material_vermin_parts');
        if (tags.includes('slime')) pool.add('material_ichor');
        if (tags.includes('plant')) pool.add('material_plant_parts');
        if (tags.includes('demon')) pool.add('material_demon_ichor');
        if (tags.includes('aberration')) pool.add('material_aberration_parts');

        if (type.includes('hag')) pool.add('material_hag_eye');
        if (type === 'manticore') pool.add('material_manticore_spikes');
        if (type === 'yeti') pool.add('material_yeti_hide');
        if (type === 'werewolf') pool.add('material_werewolf_blood');
        if (type === 'harpy') pool.add('material_harpy_parts');
        if (type === 'shrieker') pool.add('material_shrieker_parts');

        return [...pool];
    }

    _rollAdvancedMaterialDrop(enemy) {
        const lvl = Math.max(1, Number(enemy?.level) || 1);
        if (lvl < ADVANCED_MATERIAL_DROP_MIN_LEVEL) return null;
        if (Math.random() >= ADVANCED_MATERIAL_DROP_CHANCE) return null;

        const pool = this._getAdvancedMaterialDropPool(enemy);
        if (pool.length === 0) return null;
        return pool[Math.floor(Math.random() * pool.length)] || null;
    }

    _isDragonEnemy(enemy) {
        return this._getEnemyTags(enemy).includes('dragon');
    }

    _isDemonEnemy(enemy) {
        return this._getEnemyTags(enemy).includes('demon');
    }

    _healArtificerOwnedGolemsToFull(artificer) {
        if (!artificer) return 0;
        const golems = (this.party || []).filter(p =>
            p && p.isSummoned && p.summonerId === artificer.id && GOLEM_PRESETS[p.summonType] && p.health > 0
        );
        let healedCount = 0;
        for (const g of golems) {
            if (g.health >= g.maxHealth) continue;
            g.health = g.maxHealth;
            healedCount++;
        }
        if (healedCount > 0) {
            this._addLog(`🔧⚙️ Sabotage cascade: ${artificer.name}'s golems are restored to full integrity! (${healedCount} healed)`);
        }
        return healedCount;
    }

    _applyArtificerSabotage(artificer, enemy) {
        if (!artificer || !enemy || enemy.health <= 0) return false;
        if ((artificer.level || 1) < ARTIFICER_SABOTAGE_UNLOCK_LEVEL) return false;
        const tags = this._getEnemyTags(enemy);
        if (!tags.includes('construct')) return false;

        if (enemy.isBoss || enemy.isMegaBoss || enemy.isSuperBoss) {
            this._addLog(`🛠️ Sabotage fails to compromise ${this._eName(enemy)} — boss-tier frame is immune to instant destruction.`);
            return false;
        }

        enemy.sabotageCountersByArtificerId = enemy.sabotageCountersByArtificerId || {};
        const key = String(artificer.id);
        const counters = (enemy.sabotageCountersByArtificerId[key] || 0) + 1;
        enemy.sabotageCountersByArtificerId[key] = counters;

        const perCounterChance = Math.min(0.95, Math.max(0, (artificer.level || 1) / (ARTIFICER_SABOTAGE_CHANCE_DIVISOR * 100)));
        const totalChance = 1 - Math.pow(1 - perCounterChance, counters);
        this._addLog(`🛠️ Sabotage stack ${counters} on ${this._eName(enemy)} (${Math.round(perCounterChance * 100)}% per stack, ${Math.round(totalChance * 100)}% total).`);

        let detonate = false;
        for (let i = 0; i < counters; i++) {
            if (Math.random() < perCounterChance) {
                detonate = true;
                break;
            }
        }
        if (!detonate) return false;

        enemy.health = 0;
        if (!enemy._deathHandled) {
            enemy._deathHandled = true;
            this._onEnemyDeath(enemy);
        }
        this._addLog(`💥🛠️ SABOTAGE DETONATION! ${this._eName(enemy)} catastrophically fails and is instantly destroyed!`);
        this._healArtificerOwnedGolemsToFull(artificer);
        return true;
    }

    _getWarlockDemonProtectionReduction() {
        let best = 0;
        for (const m of this.party || []) {
            if (!m || m.health <= 0 || m.isSummoned || m.classId !== 'warlock') continue;
            if ((m.level || 1) < WARLOCK_ABYSS_FORM_UNLOCK_LEVEL) continue;
            best = Math.max(best, Math.min(WARLOCK_DEMON_PROTECTION_CAP, (m.level || 1) / 100));
        }
        return best;
    }

    _getWarlockMagicSkill(warlock) {
        if (!warlock) return 1;
        return Math.max(1,
            (warlock.getWeaponBonus?.('magic') || 0)
            + (warlock.getClassDamageBonus?.('magic') || 0)
            + this._getPartyMemberDamageMod(warlock));
    }

    _isWarlockBoundSummon(unit) {
        if (!unit || !unit.isSummoned) return false;
        return !!(WARLOCK_DEMON_PRESETS[unit.summonType] || WARLOCK_AWAKENED_PRESETS[unit.summonType]);
    }

    _getWarlockBoundDemons(warlock, includeDead = false) {
        if (!warlock) return [];
        return (this.party || []).filter(p =>
            p
            && p.isSummoned
            && p.summonerId === warlock.id
            && this._isWarlockBoundSummon(p)
            && (includeDead || p.health > 0));
    }

    _getActiveAwakenedIds() {
        const ids = new Set();
        for (const p of this.party || []) {
            if (!p || p.health <= 0 || !p.isSummoned) continue;
            if (WARLOCK_AWAKENED_PRESETS[p.summonType]) ids.add(p.summonType);
        }
        return ids;
    }

    _queueWarlockAwakenSummon(warlock, demon) {
        if (!warlock || !demon || !warlock.warlockAwakenActive) return;
        warlock.warlockAwakenSummons = (warlock.warlockAwakenSummons || 0) + 1;
        warlock.warlockAwakenSummonIds = Array.isArray(warlock.warlockAwakenSummonIds)
            ? warlock.warlockAwakenSummonIds
            : [];
        warlock.warlockAwakenSummonIds.push(demon.id);

        if ((warlock.warlockAwakenSummons || 0) >= WARLOCK_AWAKEN_TRIGGER_SUMMONS) {
            this._tryWarlockAwaken(warlock);
        }
    }

    _tryWarlockAwaken(warlock) {
        if (!warlock || warlock.health <= 0 || !warlock.warlockAwakenActive) return false;
        if ((warlock.warlockAwakenSummons || 0) < WARLOCK_AWAKEN_TRIGGER_SUMMONS) return false;

        const activeAwakened = this._getActiveAwakenedIds();
        const available = WARLOCK_AWAKENED_IDS.filter(id => !activeAwakened.has(id));
        if (available.length === 0) {
            this._addLog(`🕳️ ${warlock.name}'s Awaken ritual strains against the void, but every known horror is already present.`);
            return false;
        }

        const chosenId = available[Math.floor(Math.random() * available.length)];
        const preset = WARLOCK_AWAKENED_PRESETS[chosenId];
        if (!preset) return false;

        const trackedIds = Array.isArray(warlock.warlockAwakenSummonIds) ? warlock.warlockAwakenSummonIds.slice() : [];
        const consumeIds = trackedIds.slice(0, WARLOCK_AWAKEN_TRIGGER_SUMMONS);
        let removed = 0;
        for (const id of consumeIds) {
            const summon = (this.party || []).find(p => p && p.id === id && p.health > 0 && p.summonerId === warlock.id && this._isWarlockBoundSummon(p));
            if (!summon) continue;
            summon.health = 0;
            removed++;
            this._addLog(`🕳️ ${summon.name} is swallowed by ${warlock.name}'s awakening ritual.`);
        }

        const awakenStats = rollWarlockAwakenedStats(warlock.level || 1, warlock.maxHealth, chosenId);
        const existingCount = (this.party || []).filter(p => p && p.isSummoned && p.summonerId === warlock.id && p.summonType === chosenId).length;
        const awakened = new PartyMember({
            name: `${warlock.name}'s ${preset.name}${existingCount > 0 ? ` #${existingCount + 1}` : ''}`,
            classId: 'summoned',
            speciesId: 'human',
            level: warlock.level || 1,
            maxHealth: awakenStats.maxHealth,
            maxStamina: 0,
            maxMana: 0,
            portraitSeed: Math.floor(Math.random() * 100000),
            isSummoned: true,
            summonType: chosenId,
            summonerId: warlock.id,
            canBeHealed: true,
            row: 'back',
            summonStats: awakenStats,
        });
        this.party.push(awakened);
        this._registerNewSummon(awakened);

        if (this._initiativeOrder.length > 0 && !this._initiativeOrder.some(slot => slot.ref === awakened)) {
            const baseInit = this._initiativeOrder[this._initTurnIdx]?.init ?? 0;
            this._initiativeOrder.splice(this._initTurnIdx + 1, 0, { kind: 'party', ref: awakened, init: baseInit, skipThisRound: false });
        }

        warlock.warlockAwakenSummons = Math.max(0, (warlock.warlockAwakenSummons || 0) - WARLOCK_AWAKEN_TRIGGER_SUMMONS);
        warlock.warlockAwakenSummonIds = trackedIds.slice(WARLOCK_AWAKEN_TRIGGER_SUMMONS);

        this._addLog(`🕳️ ${warlock.name} awakens ${preset.name}! ${removed} bound demon${removed === 1 ? '' : 's'} are sacrificed to the void.`);
        return true;
    }

    _getDragonBreathDamageBonusPct(enemy) {
        const lvl = Math.max(1, Number(enemy?.level) || 1);
        return lvl / 3;
    }

    _applyDragonBreathLevelBonus(baseDamage, enemy) {
        const bonusPct = this._getDragonBreathDamageBonusPct(enemy);
        return Math.max(1, Math.round(baseDamage * (1 + bonusPct / 100)));
    }

    _getFaerieQueenTokensNeeded(druidLevel) {
        const lvl = Math.max(1, Number(druidLevel) || 1);
        if (lvl >= 40) return 1;
        if (lvl >= 30) return 2;
        return DRUID_COMMUNE_FAE_TOKENS_NEEDED;
    }

    canPaladinSmiteTarget(member, enemy) {
        if (!member || member.classId !== 'paladin' || !enemy || enemy.health <= 0) return false;
        const tags = this._getEnemyTags(enemy);
        if (tags.includes('undead') || tags.includes('demon')) return true;
        return member.level >= PALADIN_DRAGONSLAYER_UNLOCK_LEVEL
            && !!member.dragonslayerActive
            && tags.includes('dragon');
    }

    _getDragonAuraProtector() {
        const candidates = this.party.filter(m =>
            m
            && !m.isSummoned
            && m.health > 0
            && m.classId === 'paladin'
            && m.level >= PALADIN_DRAGONSLAYER_UNLOCK_LEVEL
            && m.dragonslayerActive
            && typeof m.hasShield === 'function'
            && m.hasShield(),
        );
        if (candidates.length === 0) return null;
        return candidates.sort((a, b) => (b.level || 0) - (a.level || 0))[0];
    }

    /** Returns total incoming damage reduction fraction from all alive L30+ paladins (stacking with halving). */
    _getPaladinAuraDamageReduction() {
        const count = this.party.filter(m =>
            m && m.health > 0 && !m.isSummoned
            && m.classId === 'paladin'
            && m.level >= PALADIN_L30_UNLOCK_LEVEL,
        ).length;
        let reduction = 0;
        let step = PALADIN_AURA_RIGHTEOUSNESS_REDUCTION;
        for (let i = 0; i < count; i++) {
            reduction += step;
            step /= 2;
        }
        return reduction;
    }

    /** Returns true if this party member should be healed by the Righteousness aura (alive, not undead, not golem). */
    _isHealableByRighteousnessAura(member) {
        return this._canReceiveLivingHealOrBuff(member);
    }

    _getMountedPaladinMeleeMultiplier(member) {
        if (!member || member.classId !== 'paladin' || !member.paladinSteedActive) return 1;
        return 1 + PALADIN_STEED_MELEE_DAMAGE_BASE_BONUS + (member.level || 1) * PALADIN_STEED_MELEE_DAMAGE_PER_LEVEL;
    }

    _applyMountedPaladinMeleeBonus(member, damage) {
        const mult = this._getMountedPaladinMeleeMultiplier(member);
        return mult > 1 ? Math.max(1, Math.floor(damage * mult)) : damage;
    }

    _maybeMountedSmiteCrit(member, damage) {
        if (!member || member.classId !== 'paladin' || !member.paladinSteedActive) {
            return { damage, crit: false, chance: 0 };
        }
        const chance = Math.min(0.95, PALADIN_STEED_SMITE_CRIT_BASE + (member.level || 1) * PALADIN_STEED_SMITE_CRIT_PER_LEVEL);
        if (Math.random() >= chance) return { damage, crit: false, chance };
        return { damage: Math.max(1, Math.floor(damage * PALADIN_STEED_SMITE_CRIT_MULT)), crit: true, chance };
    }

    _getMartyrsCovenantAnchor(target) {
        if (!target || target.isSummoned || target.health <= 0 || !this._canReceiveLivingHealOrBuff(target)) return null;
        const currentRound = this.turnNumber || 0;
        const anchors = (this.party || []).filter(p =>
            p && p !== target && !p.isSummoned && p.health > 0
            && p.classId === 'paladin'
            && (p.level || 1) >= PALADIN_L35_UNLOCK_LEVEL
            && p.martyrsCovenantActive
            && p.martyrsCovenantSuppressedRound !== currentRound,
        );
        if (anchors.length === 0) return null;
        return anchors.sort((a, b) => (b.health || 0) - (a.health || 0))[0];
    }

    /** Paladin L30 aura: heal every eligible party member for 5% of damage the paladin just dealt. */
    _triggerRighteousnessHeal(paladin, dealtDamage) {
        if (dealtDamage <= 0) return;
        const healAmt = Math.max(1, Math.floor(dealtDamage * PALADIN_AURA_RIGHTEOUSNESS_HEAL_FRAC));
        const healedNames = [];
        for (const member of this.party) {
            if (!this._isHealableByRighteousnessAura(member)) continue;
            if (member.health >= member.maxHealth) continue;
            member.health = Math.min(member.health + healAmt, member.maxHealth);
            healedNames.push(member.name);
        }
        if (healedNames.length > 0) {
            this._addLog(`✝️ ${paladin.name}'s Righteous Aura mends ${healedNames.join(', ')} for ${healAmt} HP!`);
        }
    }

    _removeClericHarmfulStates(caster, target) {
        if (!caster || caster.classId !== 'cleric' || !target || target.health <= 0) {
            return { removed: 0, labels: [] };
        }
        if (isShadowSimulacra(target)) {
            return { removed: 0, labels: [] };
        }

        const labels = [];
        let removed = 0;
        const harmfulTypes = new Map([
            ['poison', 'poison'],
            ['burn', 'burn'],
            ['acid_dot', 'acid corrosion'],
            ['drowning', 'drowning'],
            ['drown_armor_break', 'water weakness'],
            ['ice_chill', 'icy weakness'],
            ['shocked', 'shock'],
            ['chilled', 'frost slow'],
            ['anti_magic_beam', 'anti-magic'],
            ['slow_ray', 'slow ray'],
            ['mummy_rot', 'mummy rot'],
            ['fracture', 'fracture'],
            ['necrotic_curse', 'necrotic curse'],
            ['hag_curse', 'hag curse'],
            ['wither', 'wither'],
            ['taunted', 'taunted'],
            ['hex', 'hex'],
            ['quasit_poison', 'quasit venom'],
        ]);

        const consumeMana = (label) => {
            if (caster.mana < CLERIC_CLEANSE_MANA_PER_STATE) return false;
            caster.mana -= CLERIC_CLEANSE_MANA_PER_STATE;
            labels.push(label);
            removed++;
            return true;
        };

        if (target.stunned) {
            if (consumeMana('stun')) target.stunned = false;
        }

        const effects = Array.isArray(target.activeEffects) ? target.activeEffects : [];
        const hasPetrified = effects.some(e => e && e.type === 'petrified');
        if (hasPetrified) {
            if (consumeMana('petrification')) {
                target.webbedRounds = 0;
                target.activeEffects = effects.filter(e => !(e && e.type === 'petrified'));
            }
        } else if ((target.webbedRounds || 0) > 0) {
            if (consumeMana('immobilization')) target.webbedRounds = 0;
        }

        // Prone (Zombie Giant stomp) — cleric mass heal can restore fallen allies
        if ((target.proneRounds || 0) > 0) {
            if (consumeMana('prone')) target.proneRounds = 0;
        }

        if (!Array.isArray(target.activeEffects) || target.activeEffects.length === 0) {
            return { removed, labels };
        }

        const remaining = [];
        for (const effect of target.activeEffects) {
            if (!effect || !effect.type) continue;
            const label = harmfulTypes.get(effect.type);
            if (!label) {
                remaining.push(effect);
                continue;
            }
            if (!consumeMana(label)) {
                remaining.push(effect);
            }
        }
        target.activeEffects = remaining;
        return { removed, labels };
    }

    _getDivineShroudReduction(member) {
        if (!member || member.isSummoned || member.health <= 0) return 0;
        if (member.classId !== 'cleric' || !member.divineShroudActive || (member.level || 1) < CLERIC_L35_UNLOCK_LEVEL) return 0;
        return Math.min(0.95, (member.level || 1) * CLERIC_DIVINE_SHROUD_REDUCTION_PER_LEVEL);
    }

    _applyDivineShroudReduction(member, damage, sourceLabel = 'damage') {
        const reduction = this._getDivineShroudReduction(member);
        if (reduction <= 0 || damage <= 0) return Math.max(0, damage);
        const reduced = Math.max(1, Math.floor(damage * (1 - reduction)));
        if (reduced < damage) {
            this._addLog(`✨ ${member.name}'s Divine Shroud reduces ${sourceLabel} by ${Math.round(reduction * 100)}% (${damage}→${reduced}).`);
        }
        return reduced;
    }

    _tryDivineShroudRevive(member) {
        if (!member || member.isSummoned || member.health > 0) return false;
        if (member.classId !== 'cleric' || !member.divineShroudActive || (member.level || 1) < CLERIC_L35_UNLOCK_LEVEL) return false;
        const chance = Math.min(1, (member.level || 1) / 100);
        if (Math.random() < chance) {
            const restored = Math.max(1, Math.ceil((member.maxHealth || 1) * CLERIC_DIVINE_SHROUD_REVIVE_HP_FRAC));
            member.health = restored;
            member.stunned = false;
            member.webbedRounds = 0;
            member.proneRounds = 0;
            this._addLog(`✨ ${member.name}'s Divine Shroud flares — divine grace revives them at ${restored} HP!`);
            return true;
        }
        member.divineShroudActive = false;
        this._addLog(`✨ ${member.name}'s Divine Shroud fails to catch their soul and fades.`);
        return false;
    }

    _maybeTriggerClericCleanse(caster, targets) {
        if (!caster || caster.classId !== 'cleric' || caster.health <= 0) return;
        const cleanseChance = typeof caster.getClericCleanseChance === 'function'
            ? caster.getClericCleanseChance()
            : 0;
        if (cleanseChance <= 0 || Math.random() >= cleanseChance) return;

        const cleaned = [];
        for (const target of targets) {
            if (!target || target.health <= 0 || caster.mana < CLERIC_CLEANSE_MANA_PER_STATE) continue;
            const result = this._removeClericHarmfulStates(caster, target);
            if (result.removed > 0) {
                cleaned.push(`${target.name} (${result.labels.join(', ')})`);
            }
        }

        if (cleaned.length > 0) {
            this._addLog(`✨ ${caster.name}'s cleansing prayer purges harmful effects: ${cleaned.join('; ')}.`);
        }
    }

    _isUndeadOrGolemMember(member) {
        if (!member || !member.isSummoned) return false;
        if (member.summonStats?.nonLiving) return true;
        if (member.summonStats && member.summonStats.tierId && GOLEM_PRESETS[member.summonType]) return true;
        return UNDEAD_TIERS.some(ut => ut.id === member.summonType) || member.summonType === 'demi_lich' || member.summonType === 'corpse_horror';
    }

    _isIllusionaryWarriorMember(member) {
        return !!(member && member.isSummoned && (member.summonType === 'illusionary_warrior' || member.summonStats?.illusionaryWarrior));
    }

    _canReceiveLivingHealOrBuff(member) {
        if (!member || member.health <= 0) return false;
        if (member.type && ENEMY_TYPES[member.type]) {
            const tags = ENEMY_TYPES[member.type].tags || [];
            if (tags.includes('undead') || tags.includes('construct') || tags.includes('elemental')) return false;
        }
        if (member.canBeHealed === false || isShadowSimulacra(member) || this._isIllusionaryWarriorMember(member)) return false;
        if (member.summonStats?.nonLiving) return false;
        if (member.isLichForm || this._isUndeadOrGolemMember(member) || this._isRiftElemental(member)) return false;
        return true;
    }

    _isPsychicImmunePartyMember(target) {
        if (!target || target.health <= 0) return false;
        if (!target.isSummoned && target.classId === 'warlock' && target.abyssFormActive) return true;
        if (this._isVKSwarm(target)) return true;
        if (!target.isSummoned) return false;
        if (Array.isArray(target.summonStats?.immune) && target.summonStats.immune.includes('psychic')) return true;
        // Undead summons have no living mind
        if (UNDEAD_TIERS.some(ut => ut.id === target.summonType) || target.summonType === 'demi_lich' || target.summonType === 'corpse_horror') return true;
        // Construct summons (golems, spiritual weapon) — no organic mind
        if (GOLEM_PRESETS[target.summonType]) return true;
        if (target.summonType === 'spiritual_weapon') return true;
        // Rift elementals — pure elemental energy; no mind to charm or enslave
        if (['rift_fire', 'rift_water', 'rift_earth', 'rift_air'].includes(target.summonType)) return true;
        // Plant summons — no animal mind; immune to psychic and charm
        if (['treant', 'shambling_mound'].includes(target.summonStats?.beastKind)) return true;
        return false;
    }

    _isPoisonImmunePartyMember(target) {
        if (!target) return false;
        if (target.isLichForm) return true;
        if (!target.isSummoned && target.classId === 'warlock' && target.abyssFormActive) return true;
        if (this._isVKSwarm(target)) return true;
        if (target.speciesId === 'undead' || target.speciesId === 'elemental' || target.speciesId === 'construct' || target.speciesId === 'incorporeal') return true;
        if (!target.isSummoned) return false;
        if (UNDEAD_TIERS.some(ut => ut.id === target.summonType) || target.summonType === 'demi_lich' || target.summonType === 'corpse_horror') return true;
        if (GOLEM_PRESETS[target.summonType]) return true;
        if (Array.isArray(target.summonStats?.immune) && target.summonStats.immune.includes('poison')) return true;
        return false;
    }

    _isSlimePartyMember(target) {
        if (!target || !target.isSummoned) return false;
        if (SLIME_PRESETS[target.summonType]) return true;
        if (target.summonStats?.kind === 'slime' || target.summonStats?.beastKind === 'slime') return true;
        return false;
    }

    _isVKSwarm(target) {
        if (!target || !target.isSummoned) return false;
        return target.summonType === 'vermin_swarm'
            || target.summonType === 'acid_swarm'
            || target.summonStats?.beastKind === 'vermin_swarm'
            || target.summonStats?.beastKind === 'acid_swarm';
    }

    _isHoldImmunePartyMember(target) {
        if (!target) return false;
        if (!target.isSummoned && target.classId === 'warlock' && target.abyssFormActive) return true;
        if (this._isVKSwarm(target)) return true;
        if (this._isSlimePartyMember(target)) return true;
        if (Array.isArray(target.summonStats?.immune)
            && (target.summonStats.immune.includes('hold') || target.summonStats.immune.includes('web'))) return true;
        return false;
    }

    _isParalysisImmunePartyMember(target) {
        if (!target) return false;
        if (target.isLichForm) return true;
        if (!target.isSummoned && target.classId === 'warlock' && target.abyssFormActive) return true;
        if (!target.isSummoned) return false;
        if (UNDEAD_TIERS.some(ut => ut.id === target.summonType) || target.summonType === 'demi_lich' || target.summonType === 'corpse_horror') return true;
        if (GOLEM_PRESETS[target.summonType]) return true;
        if (target.summonType === 'spiritual_weapon') return true;
        if (this._isRiftElemental(target) || target.speciesId === 'elemental') return true;
        if (target.summonStats?.incorporeal === true) return true;
        if (['treant', 'shambling_mound'].includes(target.summonStats?.beastKind)) return true;
        if (this._isVKSwarm(target)) return true;
        if (this._isSlimePartyMember(target)) return true;
        const immune = target.summonStats?.immune;
        if (Array.isArray(immune) && (immune.includes('paralyze') || immune.includes('stun') || immune.includes('hold'))) return true;
        return false;
    }

    _isFractureImmunePartyMember(target) {
        if (!target || !target.isSummoned) return false;
        if (this._isVKSwarm(target)) return true;
        if (Array.isArray(target.summonStats?.immune) && target.summonStats.immune.includes('bleed')) return true;
        if (UNDEAD_TIERS.some(ut => ut.id === target.summonType) || target.summonType === 'demi_lich' || target.summonType === 'corpse_horror') return true;
        if (GOLEM_PRESETS[target.summonType]) return true;
        if (target.summonStats?.incorporeal === true) return true;
        if (this._isRiftElemental(target)) return true;
        // Plant summons (treants, shambling mounds) are immune to bleed DoTs
        if (['treant', 'shambling_mound'].includes(target.summonStats?.beastKind)) return true;
        return false;
    }

    _isRiftElemental(target) {
        if (!target || !target.isSummoned) return false;
        return ['rift_fire', 'rift_water', 'rift_earth', 'rift_air'].includes(target.summonType);
    }

    _isImmuneTo(target, tag) {
        return target && target.isSummoned
            && Array.isArray(target.summonStats?.immune)
            && target.summonStats.immune.includes(tag);
    }

    _isResourceDrainImmunePartyMember(target, resource = 'mana') {
        if (!target) return false;
        const immuneTag = resource === 'stamina' ? 'stamina_drain' : 'mana_drain';
        return Array.isArray(target.summonStats?.immune) && target.summonStats.immune.includes(immuneTag);
    }

    _isEnemySiphonPowerImmune(enemy) {
        if (!enemy || enemy.health <= 0) return true;
        const tags = this._getEnemyTags(enemy);
        if (tags.some(t => ['undead', 'construct', 'elemental'].includes(t))) return true;
        return this._enemyHasImmunity(enemy, 'stamina_drain') || this._enemyHasImmunity(enemy, 'mana_drain');
    }

    _isPetrifyImmunePartyMember(target) {
        if (!target) return false;
        if (target.isLichForm) return true;
        if (!target.isSummoned) return false;
        if (UNDEAD_TIERS.some(ut => ut.id === target.summonType) || target.summonType === 'demi_lich' || target.summonType === 'corpse_horror') return true;
        if (GOLEM_PRESETS[target.summonType]) return true;
        if (target.summonStats?.incorporeal === true) return true;
        if (this._isRiftElemental(target)) return true;
        if (this._isSlimePartyMember(target)) return true;
        return false;
    }

    // Returns the active bard who has Thunderous Drums running, or null.
    _getBardWithDrums() {
        return (this.party || []).find(p =>
            p && p.health > 0 && !p.isSummoned && p.classId === 'bard'
            && p.thunderousDrumsActive && p.level >= BARD_THUNDEROUS_DRUMS_UNLOCK_LEVEL
        ) || null;
    }

    // Returns all active bards with Thunderous Drums running (supports multi-bard parties).
    _getAllBardsWithDrums() {
        return (this.party || []).filter(p =>
            p && p.health > 0 && !p.isSummoned && p.classId === 'bard'
            && p.thunderousDrumsActive && p.level >= BARD_THUNDEROUS_DRUMS_UNLOCK_LEVEL
        );
    }

    // Returns extra damage fraction from Blood Frenzy (barbarian L30, raging, bleeds on target).
    _getBloodFrenzyBonus(barbarian, target) {
        if (!barbarian.isRaging || barbarian.level < BARBARIAN_BLOOD_FRENZY_UNLOCK_LEVEL) return 0;
        const bleeds = (target.activeEffects || []).filter(fx =>
            fx && (fx.type === 'bleed' || fx.type === 'ranger_totem_bleed')
        );
        const raw = bleeds.length * BARBARIAN_BLOOD_FRENZY_DAMAGE_PER_BLEED;
        let cap = barbarian.level * 0.03;
        if (barbarian.werebearActive) {
            cap += (barbarian.level || 1) * BARBARIAN_WEREBEAR_BLOOD_FRENZY_CAP_BONUS_PER_LEVEL;
        }
        return Math.min(raw, cap);
    }

    _getBarbarianEncourageMultiplier(attacker) {
        if (!attacker || attacker.health <= 0) return 1;
        if (this._isUndeadOrGolemMember(attacker)) return 1;
        let best = 0;
        for (const barb of this.party || []) {
            if (!barb || barb === attacker || barb.health <= 0) continue;
            if (barb.classId !== 'barbarian' || barb.level < BARBARIAN_ENCOURAGE_UNLOCK_LEVEL || !barb.isRaging) continue;
            const rounds = Math.min(BARBARIAN_ENCOURAGE_MAX_ROUNDS, barb.rageEncourageRounds || 0);
            best = Math.max(best, Math.min(BARBARIAN_ENCOURAGE_MAX_DAMAGE_MULT, rounds * BARBARIAN_ENCOURAGE_DAMAGE_PER_ROUND));
        }
        return 1 + best;
    }

    _applyOutgoingDamageBonuses(attacker, amount, kind = 'melee') {
        let out = Math.max(1, Math.round(amount));
        // Apply constant damage bonuses
        if (kind === 'melee') {
            out = Math.max(1, Math.round(out * MELEE_DAMAGE_BONUS_MULT));
        } else if (kind === 'ranged') {
            out = Math.max(1, Math.round(out * RANGED_DAMAGE_BONUS_MULT));
        }
        out = Math.max(1, Math.round(out * this._getBarbarianEncourageMultiplier(attacker)));
        if (attacker && attacker.classId === 'ranger' && attacker.rangerTotem === 'eagle'
            && (kind === 'ranged' || kind === 'aoe')) {
            out = Math.max(1, Math.round(out * (1 + (attacker.level || 1) * RANGER_EAGLE_TOTEM_DAMAGE_PER_LEVEL)));
        }
        return out;
    }

    _enemyHasImmunity(enemy, damageType) {
        const def = ENEMY_TYPES[enemy?.type] || {};
        const immune = Array.isArray(def.immune) ? def.immune : [];
        const tags = Array.isArray(def.tags) ? def.tags : [];
        if (immune.includes(damageType)) return true;
        if (damageType === 'poison' && tags.some(t => ['undead', 'construct', 'elemental'].includes(t))) return true;
        if (damageType === 'bleed' && tags.some(t => ['undead', 'construct', 'elemental', 'incorporeal', 'plant', 'slime'].includes(t))) return true;
        if (damageType === 'stun'  && tags.some(t => ['undead', 'construct', 'elemental', 'incorporeal', 'plant', 'slime'].includes(t))) return true;
        if ((damageType === 'hold' || damageType === 'web' || damageType === 'paralyze') && tags.includes('slime')) return true;
        if (damageType === 'psychic' && tags.some(t => ['plant', 'undead', 'construct', 'elemental'].includes(t))) return true;
        return false;
    }

    _enemyIsTireless(enemy) {
        const def = ENEMY_TYPES[enemy?.type] || {};
        const tags = Array.isArray(def.tags) ? def.tags : [];
        return tags.some(t => t === 'construct' || t === 'undead' || t === 'elemental');
    }

    _enemyCanAttemptStaminaAttack(enemy) {
        return !!enemy && enemy.health > 0;
    }

    _enemyCanAttemptManaAttack(enemy) {
        return !!enemy && enemy.health > 0;
    }

    _spendEnemyStamina(enemy) {
        if (!enemy) return true;
        if (this._enemyIsTireless(enemy)) {
            enemy._enemyAttackExhausted = false;
            return false;
        }
        const exhausted = (enemy.stamina || 0) < MONSTER_MELEE_STAMINA_COST;
        enemy.stamina = Math.max(0, (enemy.stamina || 0) - MONSTER_MELEE_STAMINA_COST);
        enemy._enemyAttackExhausted = exhausted;
        return exhausted;
    }

    _spendEnemyMana(enemy) {
        if (!enemy) return true;
        const exhausted = (enemy.mana || 0) < MONSTER_MAGIC_MANA_COST;
        enemy.mana = Math.max(0, (enemy.mana || 0) - MONSTER_MAGIC_MANA_COST);
        enemy._enemyAttackExhausted = exhausted;
        return exhausted;
    }

    _applyEnemyResourceExhaustion(enemy, amount) {
        if (!enemy || !enemy._enemyAttackExhausted) return amount;
        return Math.max(1, Math.floor(amount / 2));
    }

    _refreshEnemyEffect(enemy, effect) {
        if (!enemy || !effect || !effect.type) return;
        enemy.activeEffects = (enemy.activeEffects || []).filter(fx => fx && fx.type !== effect.type);
        enemy.activeEffects.push(effect);
    }

    _getMummyRotHealMultiplier(enemy) {
        if (!enemy || enemy.health <= 0) return 1;
        const hasMummyRot = (enemy.activeEffects || []).some(fx =>
            fx && fx.type === 'mummy_rot' && (fx.permanent || fx.rounds > 0));
        if (!hasMummyRot) return 1;
        if (enemy.isSuperBoss) return SUPER_BOSS_MUMMY_ROT_MULT;
        return (enemy.isBoss || enemy.isMegaBoss) ? 0.5 : 0;
    }

    _applyRangerTotemOnHit(ranger, enemy, dealt, kind = 'ranged') {
        if (!ranger || ranger.classId !== 'ranger' || ranger.level < RANGER_TOTEM_UNLOCK_LEVEL) return;
        if (!ranger.rangerTotem || !enemy || enemy.health <= 0 || dealt <= 0) return;
        if (kind !== 'ranged' && kind !== 'aoe') return;
        const rounds = Math.max(1, Math.floor((ranger.level || 1) / RANGER_TOTEM_DURATION_DIVISOR));
        const eName = this._eName(enemy);
        if (ranger.rangerTotem === 'wolf') {
            if (this._enemyHasImmunity(enemy, 'bleed')) return;
            const damage = Math.max(1, Math.floor(dealt * RANGER_WOLF_TOTEM_BLEED_FRACTION));
            enemy.activeEffects = enemy.activeEffects || [];
            enemy.activeEffects.push({ type: 'ranger_totem_bleed', damage, rounds });
            this._addLog(`🐺 Wolf Totem opens a wound on ${eName}! (${damage}/rd for ${rounds} rds)`);
        } else if (ranger.rangerTotem === 'bear') {
            if (!this._enemyHasImmunity(enemy, 'stun') && Math.random() < RANGER_BEAR_TOTEM_STUN_CHANCE) {
                if (this._tryStunEnemy(enemy)) this._addLog(`🐻 Bear Totem staggers ${eName}!`);
            }
        } else if (ranger.rangerTotem === 'pixie') {
            if (this._enemyHasImmunity(enemy, 'poison')) return;
            const damage = Math.max(1, Math.floor(dealt * RANGER_PIXIE_TOTEM_POISON_FRACTION));
            this._refreshEnemyEffect(enemy, { type: 'ranger_totem_poison', damage, rounds });
            this._addLog(`🧚 Pixie Totem poisons ${eName}! (${damage}/rd for ${rounds} rds)`);
        }
    }

    _applyRangedRicochet(shooter, origDmg, favoredTags, initialHitEnemy) {
        if (!shooter || shooter.classId !== 'ranger' || (shooter.level || 0) < RANGER_L35_UNLOCK_LEVEL) return;
        if (!Array.isArray(this.aliveHostileEnemies) || this.aliveHostileEnemies.length < 2) return;
        const alreadyHit = new Set();
        if (initialHitEnemy) alreadyHit.add(initialHitEnemy.id);
        for (const chance of RANGER_RICOCHET_CHANCES) {
            if ((shooter.mana || 0) < RANGER_RICOCHET_MP_COST) break;
            if (Math.random() >= chance) break;
            const validTargets = this.aliveHostileEnemies.filter(e => !alreadyHit.has(e.id) && e.health > 0);
            if (validTargets.length === 0) break;
            shooter.mana = Math.max(0, (shooter.mana || 0) - RANGER_RICOCHET_MP_COST);
            const rTarget = validTargets[Math.floor(Math.random() * validTargets.length)];
            alreadyHit.add(rTarget.id);
            let rDmg = Math.max(1, Math.round(origDmg * RANGER_RICOCHET_DAMAGE_MULT));
            let rCrit = false;
            const rCritChance = RANGED_CRIT_CHANCE + shooter.getRangedCritBonus();
            if (Math.random() < rCritChance && !this._isCritImmune(rTarget)) { rDmg *= 2; rCrit = true; }
            const rTargetDef = ENEMY_TYPES[rTarget.type];
            const rTargetTags = (rTargetDef && rTargetDef.tags) ? rTargetDef.tags : [];
            const rIsFavored = favoredTags.length > 0 && favoredTags.some(tag => rTargetTags.includes(tag));
            if (rIsFavored) {
                const rInstakill = shooter.getFavoredEnemyInstakillChance() * RANGER_RICOCHET_INSTAKILL_MULT;
                if (rInstakill > 0 && Math.random() < rInstakill) {
                    if (rTarget.isBoss || rTarget.isMegaBoss || rTarget.isSuperBoss) {
                        const bDmg = Math.max(1, Math.round(origDmg * 4));
                        const bDealt = this._damageEnemy(rTarget, bDmg, true, false, 0, true);
                        this._addLog(`🏹 Ricochet! ${shooter.name}'s arrow strikes ${this._eName(rTarget)} — Boss resists! (×4: ${bDealt})`);
                        this._applyWeaponRider(shooter, rTarget, bDealt);
                        this._applyRangerTotemOnHit(shooter, rTarget, bDealt, 'ranged');
                        if (rTarget.health <= 0) { this._addLog(`${this._eName(rTarget)} is defeated!`); this._checkHunterMarkKill(rTarget); }
                    } else {
                        rTarget.health = 0;
                        if (!rTarget._deathHandled) { rTarget._deathHandled = true; this._onEnemyDeath(rTarget); }
                        this._addLog(`🏹 Ricochet LETHAL SHOT on ${this._eName(rTarget)}! (Favored Enemy)`);
                        this._checkHunterMarkKill(rTarget);
                    }
                    continue;
                }
            }
            const rDealt = this._damageEnemy(rTarget, rDmg, rIsFavored, false, 0, true);
            const rCritStr = rCrit ? ' 💥 CRIT!' : '';
            const rFavStr = rIsFavored ? ' [Favored]' : '';
            this._addLog(`🏹 Ricochet! ${shooter.name}'s arrow strikes ${this._eName(rTarget)} for ${rDealt}!${rCritStr}${rFavStr}`);
            this._applyWeaponRider(shooter, rTarget, rDealt);
            this._applyRangerTotemOnHit(shooter, rTarget, rDealt, 'ranged');
            if (rTarget.health <= 0) { this._addLog(`${this._eName(rTarget)} is defeated!`); this._checkHunterMarkKill(rTarget); }
        }
    }

    _applyMonkAvatarOnHit(monk, enemy, dealt, isQuivering = false) {
        if (!monk || monk.classId !== 'monk' || monk.level < MONK_AVATAR_UNLOCK_LEVEL) return;
        if (!monk.avatarActive || isQuivering || !enemy || enemy.health <= 0 || dealt <= 0) return;
        const element = monk.avatarElement || 'fire';
        const typeMap = {
            fire: { type: 'avatar_fire', immune: 'fire', label: '🔥 Avatar flame' },
            lightning: { type: 'avatar_lightning', immune: 'lightning', label: '⚡ Avatar lightning' },
            acid: { type: 'avatar_acid', immune: 'acid', label: '🟢 Avatar acid' },
            ice: { type: 'avatar_ice', immune: 'cold', label: '❄️ Avatar ice' },
        };
        const meta = typeMap[element] || typeMap.fire;
        if (this._enemyHasImmunity(enemy, meta.immune)) return;
        const rounds = Math.max(1, Math.floor((monk.level || 1) / MONK_AVATAR_DOT_DURATION_DIVISOR));
        const damage = Math.max(1, Math.floor(dealt * MONK_AVATAR_DOT_FRACTION));
        // Each hit adds an independent stack — same monk hitting twice or two monks
        // with the same element both apply separately.
        enemy.activeEffects = enemy.activeEffects || [];
        enemy.activeEffects.push({ type: meta.type, damage, rounds });
        this._addLog(`${meta.label} clings to ${this._eName(enemy)}! (${damage}/rd for ${rounds} rds)`);
    }

    _avatarCleanseAtTurnStart(member) {
        if (!member || member.classId !== 'monk' || !member.avatarActive || member.level < MONK_AVATAR_UNLOCK_LEVEL) return;
        const chance = Math.min(0.95, MONK_AVATAR_CLEANSE_BASE + (member.level || 1) * MONK_AVATAR_CLEANSE_PER_LEVEL);
        const removed = [];
        if (member.stunned && Math.random() < chance) {
            member.stunned = false;
            removed.push('stun');
        }
        if ((member.webbedRounds || 0) > 0 && Math.random() < chance) {
            member.webbedRounds = 0;
            removed.push('immobilization');
        }
        const harmful = new Set(['poison', 'burn', 'acid_dot', 'drowning', 'drown_armor_break', 'ice_chill', 'shocked', 'chilled', 'petrified', 'anti_magic_beam', 'slow_ray', 'mummy_rot', 'hag_curse', 'frost_dot']);
        const kept = [];
        for (const fx of member.activeEffects || []) {
            if (fx && harmful.has(fx.type) && Math.random() < chance) {
                removed.push(fx.type.replace(/_/g, ' '));
            } else {
                kept.push(fx);
            }
        }
        member.activeEffects = kept;
        if (removed.length) {
            this._addLog(`🧘 ${member.name}'s Avatar shrugs off ${removed.join(', ')}.`);
            if (member.level >= MONK_KI_UNLOCK_LEVEL) {
                member.kiCharges = (member.kiCharges || 0) + 1;
                this._addLog(`\u{1F9D8} ${member.name} transmutes the cleansed energy into Ki! (${member.kiCharges} charge${member.kiCharges !== 1 ? 's' : ''})`);
            }
        }
    }

    /** Members currently eligible for Formation bonus: alive, in formation, front row, warrior class. */
    _getFormationMembers() {
        return this.party.filter(m =>
            m && m.health > 0
            && m.isInFormation
            && m.row === 'front'
            && m.classId === 'warrior',
        );
    }

    /** Damage multiplier for a formation attacker. Returns 1 if inactive or below min members. */
    _getFormationMultiplier(attacker) {
        if (!attacker || !attacker.isInFormation) return 1;
        const n = this._getFormationMembers().length;
        if (n < WARRIOR_FORMATION_MIN_MEMBERS) return 1;
        return 1 + WARRIOR_FORMATION_BONUS_PER_MEMBER * n;
    }

    _getFormationShieldWallInfo(member = null) {
        const members = this._getFormationMembers();
        if (members.length < WARRIOR_FORMATION_MIN_MEMBERS) {
            return { active: false, members, contributors: [], averageLevel: 0, step: 0, totalDefense: 0, chanceBonus: 0 };
        }
        if (member && !members.includes(member)) {
            return { active: false, members, contributors: [], averageLevel: 0, step: 0, totalDefense: 0, chanceBonus: 0 };
        }
        const eligibleWarriorIds = new Set(members
            .filter(m => !m.isSummoned && (m.level || 1) >= WARRIOR_SHIELD_WALL_UNLOCK_LEVEL)
            .map(m => m.id));
        const contributors = members.filter(m => {
            if (!m.isSummoned) return eligibleWarriorIds.has(m.id);
            return m.summonType === 'squire' && eligibleWarriorIds.has(m.summonerId);
        });
        if (contributors.length === 0) {
            return { active: false, members, contributors, averageLevel: 0, step: 0, totalDefense: 0, chanceBonus: 0 };
        }
        const averageLevel = contributors.reduce((sum, m) => sum + (m.level || 1), 0) / contributors.length;
        const step = Math.max(0, Math.floor(averageLevel / WARRIOR_SHIELD_WALL_LEVEL_DIVISOR));
        const totalDefense = step * contributors.length;
        return {
            active: step > 0 && totalDefense > 0,
            members,
            contributors,
            averageLevel,
            step,
            totalDefense,
            chanceBonus: totalDefense / 100,
        };
    }

    _getFormationShieldWallDefenseBonus(member) {
        const info = this._getFormationShieldWallInfo(member);
        return info.active ? info.totalDefense : 0;
    }

    _getFormationShieldWallChanceBonus(member) {
        const info = this._getFormationShieldWallInfo(member);
        return info.active ? info.chanceBonus : 0;
    }

    /** Returns true if the enemy's slime tag makes it immune to crits. */
    _isCritImmune(enemy) {
        if (!enemy || !enemy.type) return false;
        const def = ENEMY_TYPES[enemy.type] || {};
        return (def.tags || []).includes('slime');
    }

    /** Roll a Formation crit. Returns { damage, crit }. Crit chance = (level/2)%. Crit damage = base + 100% + level% (e.g. L30: +130% → ×2.30). */
    _applyFormationCrit(attacker, damage) {
        const lvl = attacker.level || 1;
        const critChance = Math.min(lvl / 2 / 100 + this._getFormationShieldWallChanceBonus(attacker), 0.95);
        if (Math.random() < critChance) {
            // damage + 100% + level%  →  damage × (1 + 1.00 + level/100)
            const mult = 1 + WARRIOR_FORMATION_CRIT_BASE + (lvl / 100);
            return { damage: Math.max(1, Math.floor(damage * mult)), crit: true };
        }
        return { damage, crit: false };
    }

    /**
     * After a warrior's successful retaliatory strike, each of their squires that
     * is alive, in formation, and in the front row gets an independent opportunity
     * attack chance equal to (warrior.level + OPPORTUNITY_OFFSET)%.
     * Only fires when warrior is in BOTH Defend Mode AND Formation.
     */
    _triggerSquireOpportunityStrikes(warrior, enemy) {
        if (!warrior || !warrior.isDefendMode || !warrior.isInFormation) return;
        if (!enemy || enemy.health <= 0) return;
        const mySquires = this.party.filter(s =>
            s && s.health > 0
            && s.isSummoned
            && s.summonType === 'squire'
            && s.summonerId === warrior.id
            && s.isInFormation,
        );
        if (mySquires.length === 0) return;
        const chance = Math.min(0.95, ((warrior.level || 1) + WARRIOR_FORMATION_OPPORTUNITY_OFFSET) / 100
            + this._getFormationShieldWallChanceBonus(warrior));
        for (const sq of mySquires) {
            if (Math.random() >= chance) continue;
            let dmg = Math.max(1, Math.floor(this._rollPlayerMeleeDamage(warrior) * WARRIOR_SQUIRE_MELEE_FRACTION));
            const formMult = this._getFormationMultiplier(sq);
            if (formMult > 1) dmg = Math.max(1, Math.floor(dmg * formMult));
            let critRes = this._applyFormationCrit(warrior, dmg);
            if (critRes.crit && this._isCritImmune(enemy)) critRes = { damage: dmg, crit: false };
            dmg = critRes.damage;
            const dealt = this._damageSummonEnemy(enemy, dmg, false, false, { contactAttacker: sq });
            let oMsg = `⚔️ ${sq.name} seizes an opportunity and strikes ${this._eName(enemy)} for ${dealt}!`;
            if (critRes.crit) oMsg += ` 💥 FORMATION CRIT!`;
            this._addLog(oMsg);
            if (enemy.health <= 0) {
                this._addLog(`${this._eName(enemy)} is defeated!`);
                break;
            }
        }
    }

    _getActiveTauntingWarriors() {
        return (this.party || [])
            .filter(m => m && m.health > 0 && !m.isSummoned && m.classId === 'warrior'
                && (m.level || 1) >= WARRIOR_TAUNT_UNLOCK_LEVEL && m.warriorTauntActive)
            .map(m => ({ member: m, tie: Math.random() }))
            .sort((a, b) => (b.member.health || 0) - (a.member.health || 0) || a.tie - b.tie)
            .map(x => x.member);
    }

    _applyWarriorTauntTargeting(currentTarget, rawDmg, attackKind, opts = {}) {
        if (opts.aoe || opts.skipTaunt || !['melee', 'ranged', 'magic'].includes(attackKind)) return null;
        const taunts = this._getActiveTauntingWarriors();
        if (taunts.length === 0) return null;
        let chosen = null;
        for (const warrior of taunts) {
            const chance = Math.min(0.95, (warrior.level || 1) / 100
                + (warrior.isDefendMode ? WARRIOR_TAUNT_DEFEND_CHANCE_BONUS : 0));
            if (warrior === currentTarget || Math.random() < chance) {
                chosen = warrior;
                break;
            }
        }
        if (!chosen) return null;
        const divisor = chosen.isDefendMode ? WARRIOR_TAUNT_DEFEND_PENALTY_DIVISOR : WARRIOR_TAUNT_PENALTY_DIVISOR;
        const penalty = Math.max(1, Math.floor((chosen.level || 1) / divisor));
        const newRaw = Math.max(1, rawDmg - penalty);
        if (chosen !== currentTarget) {
            const oldName = currentTarget?.name || (currentTarget?.type ? this._eName(currentTarget) : 'the original target');
            this._addLog(`🛡️ ${chosen.name}'s taunt pulls the ${attackKind} attack away from ${oldName}! (-${penalty} attack)`);
        } else {
            this._addLog(`🛡️ ${chosen.name}'s taunt rattles the attacker! (-${penalty} attack)`);
        }
        return { target: chosen, rawDmg: newRaw };
    }

    _performWarriorRetaliation(warrior, enemy) {
        if (!warrior || !enemy || warrior.health <= 0 || enemy.health <= 0) return;
        if (warrior.classId !== 'warrior' || warrior.level < WARRIOR_RETALIATION_UNLOCK_LEVEL) return;
        const chance = typeof warrior.getRetaliationChance === 'function'
            ? warrior.getRetaliationChance()
            : 0;
        const shieldWallRetaliationBonus = warrior.isDefendMode
            ? this._getFormationShieldWallChanceBonus(warrior)
            : 0;
        const finalChance = Math.min(0.95, chance + shieldWallRetaliationBonus);
        if (finalChance <= 0 || Math.random() >= finalChance) return;

        const enemyName = this._eName(enemy);
        let retaliateDamage = Math.max(1, Math.floor(this._rollPlayerMeleeDamage(warrior) * WARRIOR_RETALIATION_DAMAGE_MULT));
        // Formation bonus on retaliatory strikes
        let retFormCrit = false;
        if (warrior.isInFormation) {
            const formMult = this._getFormationMultiplier(warrior);
            if (formMult > 1) {
                retaliateDamage = Math.max(1, Math.floor(retaliateDamage * formMult));
                let critRes = this._applyFormationCrit(warrior, retaliateDamage);
                if (critRes.crit && this._isCritImmune(enemy)) critRes = { damage: retaliateDamage, crit: false };
                retaliateDamage = critRes.damage;
                retFormCrit = critRes.crit;
            }
        }
        const dealt = this._damageEnemy(enemy, retaliateDamage, false, false, 0, false, { contactAttacker: warrior });
        this._emitTelemetry('retaliation', { member: warrior, enemy, damage: dealt });
        let retLog = `⚔️ ${warrior.name} retaliates against ${enemyName} for ${dealt} damage!`;
        if (retFormCrit) retLog += ` 💥 FORMATION CRIT!`;
        this._addLog(retLog);

        const stunChance = MELEE_STUN_CHANCE + warrior.getMeleeStunBonus();
        if (dealt > 0 && enemy.health > 0 && Math.random() < stunChance) {
            if (this._tryStunEnemy(enemy)) {
                this._emitTelemetry('stunInflicted', { member: warrior, enemy, source: 'retaliation' });
                this._addLog(`⚡ ${enemyName} is STUNNED by the retaliatory strike!`);
            }
        }
        this._applyWeaponRider(warrior, enemy, dealt);
        this._applyWeaponRider(warrior, enemy, dealt, 'offhand');
        this._triggerSquireOpportunityStrikes(warrior, enemy);
        if (enemy.health <= 0) this._addLog(`${enemyName} is defeated!`);
    }

    _getShamblingMoundInterceptors(target) {
        if (!target || target.health <= 0 || target.isSummoned || target.classId !== 'druid') return [];
        return this.party.filter(m =>
            m
            && m.health > 0
            && m.isSummoned
            && m.summonStats
            && m.summonStats.beastKind === 'shambling_mound'
            && m.summonerId === target.id,
        );
    }

    _getShamblingMoundCap(druid) {
        return Math.max(1, Math.floor(((druid && druid.level) || 1) / DRUID_SHAMBLING_MOUND_CAP_DIVISOR));
    }

    _getLivingShamblingMoundsFor(druid) {
        if (!druid) return [];
        return (this.party || []).filter(p =>
            p && p.health > 0 && p.isSummoned && p.summonerId === druid.id
            && p.summonType === 'shambling_mound'
            && p.summonStats && p.summonStats.beastKind === 'shambling_mound'
        );
    }

    _spawnMiniShambler(sourceMound, druid) {
        if (!sourceMound || !druid || druid.health <= 0) return null;
        const cap = this._getShamblingMoundCap(druid);
        if (this._getLivingShamblingMoundsFor(druid).length >= cap) {
            if (!sourceMound.summonStats._shamblingCapLoggedTurn || sourceMound.summonStats._shamblingCapLoggedTurn !== this.turnNumber) {
                sourceMound.summonStats._shamblingCapLoggedTurn = this.turnNumber;
                this._addLog(`🌿 ${sourceMound.name} is ready to bud, but ${druid.name} is already maintaining ${cap}/${cap} Shambling Mounds.`);
            }
            return null;
        }
        const baseMaxHealth = sourceMound.summonStats?.baseMaxHealth || sourceMound.maxHealth;
        const baseDefense = sourceMound.summonStats?.baseDefense || sourceMound.summonStats?.defense || 1;
        const meleeMin = sourceMound.summonStats?.meleeMin || (MELEE_DAMAGE_MIN + druid.level * 2);
        const meleeMax = sourceMound.summonStats?.meleeMax || (MELEE_DAMAGE_MAX + druid.level * 2);
        const miniNum = this.party.filter(p => p.isSummoned && p.summonType === 'shambling_mound' && p.summonStats && p.summonStats.shamblingGrowthStage === 0 && p.summonerId === druid.id).length + 1;
        const mini = new PartyMember({
            name: `${druid.name}'s Mini Shambler #${miniNum}`,
            classId: 'druid',
            speciesId: 'human',
            level: druid.level,
            maxHealth: Math.max(1, Math.floor(baseMaxHealth * 0.5)),
            maxStamina: 0,
            maxMana: 0,
            portraitSeed: Math.floor(Math.random() * 100000),
            isSummoned: true,
            summonType: 'shambling_mound',
            summonerId: druid.id,
            canBeHealed: true,
            row: 'front',
            summonStats: {
                beastKind: 'shambling_mound',
                defense: Math.max(1, Math.floor(baseDefense * 0.5)),
                baseDefense,
                baseMaxHealth,
                meleeMin,
                meleeMax,
                shamblingGrowthStage: 0,
                canSpawnMini: false,
                summonedRound: this.turnNumber,
            },
        });
        mini.health = mini.maxHealth;
        this.party.push(mini);
        this._registerNewSummon(mini);
        this._addLog(`🌿 ${sourceMound.name} buds off a Mini Shambler!`);
        return mini;
    }

    _updateShamblingMoundState(mound) {
        if (!mound || mound.health <= 0 || !mound.summonStats || mound.summonStats.beastKind !== 'shambling_mound') return;
        const stats = mound.summonStats;
        const regen = Math.max(1, Math.floor(mound.maxHealth * 0.20));
        const before = mound.health;
        mound.health = Math.min(mound.maxHealth, mound.health + regen);
        const healed = mound.health - before;
        if (healed > 0) this._addLog(`🌿 ${mound.name} regenerates ${healed} HP.`);

        const stage = stats.shamblingGrowthStage ?? 3;
        if (stage < 3) {
            const nextStage = stage + 1;
            const scale = [0.5, 0.67, 0.84, 1.0][nextStage];
            mound.maxHealth = Math.max(1, Math.floor((stats.baseMaxHealth || mound.maxHealth) * scale));
            stats.defense = Math.max(1, Math.floor((stats.baseDefense || stats.defense || 1) * scale));
            mound.health = Math.min(mound.maxHealth, Math.max(mound.health, Math.ceil(mound.maxHealth * 0.75)));
            stats.shamblingGrowthStage = nextStage;
            if (nextStage >= 3) {
                mound.name = mound.name.replace('Mini Shambler', 'Shambling Mound');
                this._addLog(`🌿 ${mound.name} grows into a full Shambling Mound!`);
            } else {
                this._addLog(`🌿 ${mound.name} grows (${Math.round(scale * 100)}% of full strength).`);
            }
            return;
        }

        const druid = this.party.find(p => p.id === mound.summonerId && p.health > 0);
        const summonedRound = stats.summonedRound ?? 0;
        if (this.turnNumber <= summonedRound) return;
        if (druid && stats.canSpawnMini && mound.health >= mound.maxHealth) {
            this._spawnMiniShambler(mound, druid);
        }
    }

    canMelee(m) {
        if (!m || m.health <= 0) return false;
        if (m.row === 'back' && m.classId !== 'rogue') return false;
        return true;
    }
    canRanged(m) { return m && m.health > 0; }
    canMagic(m)  { return m && m.health > 0; }
    canAct(m)    { return m && m.health > 0; }

    hasFullStaminaFor(m, type) {
        const cost = type === 'melee' ? MELEE_STAMINA_COST : RANGED_STAMINA_COST;
        return m.stamina >= cost;
    }
    hasFullMana(m) { return m.mana >= this.getMagicManaCost(m); }

    /**
     * Scaled mana cost for magic attack: base 3 + 1 per 3 caster levels.
     * @param {PartyMember} m
     * @returns {number}
     */
    getMagicManaCost(m) {
        return MAGIC_MANA_COST + Math.floor((m.level || 1) / 3);
    }

    // ────────────────────────────────────────────
    // Player actions
    // ────────────────────────────────────────────

    meleeAttack(targetEnemy) {
        const m = this.currentMember;
        if (!m || m.health <= 0) return;
        if (m.isDefendMode) {
            this._addLog(`${m.name} is in Defend Mode — attacks are disabled.`);
            return;
        }
        if (!this.canMelee(m)) {
            this._addLog(`${m.name} cannot melee from the back row!`);
            return;
        }

        const isMonk = m.classId === 'monk';
        const exhausted = m.stamina < MELEE_STAMINA_COST ||
                          (isMonk && m.mana < MONK_MELEE_MANA_COST);

        m.stamina = Math.max(0, m.stamina - MELEE_STAMINA_COST);
        if (isMonk) m.mana = Math.max(0, m.mana - MONK_MELEE_MANA_COST);

        let base = this._rollPlayerMeleeDamage(m);
        if (exhausted) base = Math.max(1, Math.floor(base / 2));
        base = this._applyOutgoingDamageBonuses(m, base, 'melee');
        const mountedPaladinMult = this._getMountedPaladinMeleeMultiplier(m);
        if (mountedPaladinMult > 1) base = this._applyMountedPaladinMeleeBonus(m, base);

        // Formation bonus for warriors
        let formMult = 1;
        let formCrit = false;
        if (m.classId === 'warrior' && m.isInFormation) {
            formMult = this._getFormationMultiplier(m);
            if (formMult > 1) {
                base = Math.max(1, Math.floor(base * formMult));
                let critRes = this._applyFormationCrit(m, base);
                if (critRes.crit && this._isCritImmune(targetEnemy)) critRes = { damage: base, crit: false };
                base = critRes.damage;
                formCrit = critRes.crit;
            }
        }

        // Blood Frenzy (L30 passive): +7% per bleed DoT on target while raging
        let _bfPct = 0;
        if (m.classId === 'barbarian') {
            _bfPct = this._getBloodFrenzyBonus(m, targetEnemy);
            if (_bfPct > 0) base = Math.max(1, Math.round(base * (1 + _bfPct)));
        }

        const dealt = this._damageEnemy(targetEnemy, base, false, false, 0, false, { contactAttacker: m });

        const eName = this._eName(targetEnemy);
        const suffix = exhausted ? ' (exhausted!)' : '';
        let meleeLog = `${m.name} strikes ${eName} for ${dealt} damage!${suffix}`;
        if (_bfPct > 0) meleeLog += ` [🩸 Blood Frenzy +${Math.round(_bfPct * 100)}%]`;
        if (mountedPaladinMult > 1) meleeLog += ` [🐎 Steed +${Math.round((mountedPaladinMult - 1) * 100)}%]`;
        if (formMult > 1) meleeLog += ` [⚔️ Formation +${Math.round((formMult - 1) * 100)}%]`;
        if (formCrit) meleeLog += ` 💥 FORMATION CRIT!`;
        this._addLog(meleeLog);

        const stunChance = MELEE_STUN_CHANCE + m.getMeleeStunBonus();
        if (dealt > 0 && targetEnemy.health > 0 && Math.random() < stunChance) {
            if (this._tryStunEnemy(targetEnemy)) {
                this._emitTelemetry('stunInflicted', { member: m, enemy: targetEnemy, source: 'melee' });
                this._addLog(`\u26A1 ${eName} is STUNNED and will skip next turn!`);
            }
        }

        // Barbarian L20 Blood Rage: gain temp HP on hit while raging
        if (dealt > 0 && m.classId === 'barbarian' && m.isRaging && m.level >= BARBARIAN_BLOOD_RAGE_UNLOCK_LEVEL) {
            const gain = Math.max(1, Math.floor(m.maxHealth * BARBARIAN_TEMP_HP_PER_HIT_FRAC));
            m.tempHp = (m.tempHp || 0) + gain;
        }

        const suppressWeaponRiders = m.classId === 'barbarian' && m.werebearActive;

        // Weapon rider proc (fire/acid/poison/lightning/ice) — main-hand then off-hand
        if (!suppressWeaponRiders) {
            this._applyWeaponRider(m, targetEnemy, dealt);
            this._applyWeaponRider(m, targetEnemy, dealt, 'offhand');
        }
        if (m.classId === 'barbarian') this._applyWerebearBleedOnHit(m, targetEnemy, dealt);
        this._applyMonkAvatarOnHit(m, targetEnemy, dealt);

        if (targetEnemy.health <= 0) { this._addLog(`${eName} is defeated!`); this._checkHunterMarkKill(targetEnemy); }

        // Paladin L30 Aura of Righteousness: party heal on regular melee hit (once per attack action)
        if (m.classId === 'paladin' && m.level >= PALADIN_L30_UNLOCK_LEVEL && dealt > 0) {
            this._triggerRighteousnessHeal(m, dealt);
        }

        if (isMonk) {
            const ww = MONK_WHIRLWIND_CHANCE + m.getWhirlwindBonus();
            const wwCap = (m.level || 1) + 2;
            let wwHits = 0;
            for (const other of this.aliveEnemies) {
                if (other === targetEnemy) continue;
                if (wwHits >= wwCap) break;
                if (Math.random() < ww) {
                    wwHits++;
                    let dmg = this._rollPlayerMeleeDamage(m);
                    if (exhausted) dmg = Math.max(1, Math.floor(dmg / 2));
                    dmg = this._applyOutgoingDamageBonuses(m, dmg, 'melee');
                    dmg = Math.round(dmg * (1 + m.level * 0.005));
                    const d = this._damageEnemy(other, dmg, false, false, 0, false, { contactAttacker: m });
                    this._addLog(`\u{1F300} Whirlwind hits ${this._eName(other)} for ${d}! [+${Math.floor(m.level / 2)}% level bonus]`);
                    if (!suppressWeaponRiders) {
                        this._applyWeaponRider(m, other, d);
                        this._applyWeaponRider(m, other, d, 'offhand');
                    }
                    if (m.classId === 'barbarian') this._applyWerebearBleedOnHit(m, other, d);
                    this._applyMonkAvatarOnHit(m, other, d);
                    if (other.health <= 0) this._addLog(`${this._eName(other)} is defeated!`);
                }
            }
        }

        // Warrior extra attacks — +1 swing per 5 levels. Each swing pays
        // stamina, rolls fresh damage, and rolls stun independently. If the
        // current target drops, we retarget to another living enemy.
        const extra = m.getExtraMeleeAttacks();
        let curTarget = targetEnemy;
        for (let i = 0; i < extra; i++) {
            if (curTarget.health <= 0) {
                curTarget = this.aliveEnemies[0];
                if (!curTarget) break;
            }
            const swingExhausted = m.stamina < MELEE_STAMINA_COST;
            m.stamina = Math.max(0, m.stamina - MELEE_STAMINA_COST);
            let sdmg = this._rollPlayerMeleeDamage(m);
            if (swingExhausted) sdmg = Math.max(1, Math.floor(sdmg / 2));
            sdmg = this._applyOutgoingDamageBonuses(m, sdmg, 'melee');
            if (mountedPaladinMult > 1) sdmg = this._applyMountedPaladinMeleeBonus(m, sdmg);
            // Formation bonus for warrior extra attacks
            let swingFormCrit = false;
            if (m.classId === 'warrior' && m.isInFormation) {
                const formMult = this._getFormationMultiplier(m);
                if (formMult > 1) {
                    sdmg = Math.max(1, Math.floor(sdmg * formMult));
                    let critRes = this._applyFormationCrit(m, sdmg);
                    if (critRes.crit && this._isCritImmune(curTarget)) critRes = { damage: sdmg, crit: false };
                    sdmg = critRes.damage;
                    swingFormCrit = critRes.crit;
                }
            }
            let _swingBfPct = 0;
            if (m.classId === 'barbarian') {
                _swingBfPct = this._getBloodFrenzyBonus(m, curTarget);
                if (_swingBfPct > 0) sdmg = Math.max(1, Math.round(sdmg * (1 + _swingBfPct)));
            }
            const swingName = this._eName(curTarget);
            const sDealt = this._damageEnemy(curTarget, sdmg, false, false, 0, false, { contactAttacker: m });
            const sSuffix = swingExhausted ? ' (exhausted!)' : '';
            let swingLog = `\u{1F5E1}\uFE0F ${m.name} follows up on ${swingName} for ${sDealt} damage!${sSuffix}`;
            if (swingFormCrit) swingLog += ` \uD83D\uDCA5 FORMATION CRIT!`;
            if (_swingBfPct > 0) swingLog += ` [\uD83E\uDE78 Blood Frenzy +${Math.round(_swingBfPct * 100)}%]`;
            if (mountedPaladinMult > 1) swingLog += ` [🐎 Steed +${Math.round((mountedPaladinMult - 1) * 100)}%]`;
            this._addLog(swingLog);
            const sStunChance = MELEE_STUN_CHANCE + m.getMeleeStunBonus();
            if (sDealt > 0 && curTarget.health > 0 && Math.random() < sStunChance) {
                if (this._tryStunEnemy(curTarget))
                    this._addLog(`\u26A1 ${swingName} is STUNNED and will skip next turn!`);
            }
            if (!suppressWeaponRiders) {
                this._applyWeaponRider(m, curTarget, sDealt);
                this._applyWeaponRider(m, curTarget, sDealt, 'offhand');
            }
            if (m.classId === 'barbarian') this._applyWerebearBleedOnHit(m, curTarget, sDealt);
            this._applyMonkAvatarOnHit(m, curTarget, sDealt);
            if (curTarget.health <= 0) this._addLog(`${swingName} is defeated!`);
            // Paladin L30 Aura of Righteousness: also heals on iterative attacks
            if (m.classId === 'paladin' && m.level >= PALADIN_L30_UNLOCK_LEVEL && sDealt > 0) {
                this._triggerRighteousnessHeal(m, sDealt);
            }
        }


        // Barbarian rage extra attacks: 1 per 4 levels, each costs BARBARIAN_RAGE_STAMINA_COST ST
        if (m.classId === 'barbarian' && m.isRaging && targetEnemy && targetEnemy.health > 0) {
            const rageExtraCount = Math.floor((m.level || 1) / 4);
            for (let ra = 0; ra < rageExtraCount; ra++) {
                if (targetEnemy.health <= 0) break;
                const hasStamina = m.stamina >= BARBARIAN_RAGE_STAMINA_COST;
                m.stamina = Math.max(0, m.stamina - BARBARIAN_RAGE_STAMINA_COST);
                let rageDmg = this._rollPlayerMeleeDamage(m);
                if (!hasStamina) {
                    rageDmg = Math.max(1, Math.floor(rageDmg / 2));
                    // Blood Rage: temp HP lost when doing half damage
                    if (m.level >= BARBARIAN_BLOOD_RAGE_UNLOCK_LEVEL && m.tempHp) {
                        m.tempHp = 0;
                        this._addLog(m.name + "'s Battle Fury fades — stamina exhausted!");
                    }
                }
                rageDmg = this._applyOutgoingDamageBonuses(m, rageDmg, 'melee');
                const _rageBfPct = this._getBloodFrenzyBonus(m, targetEnemy);
                if (_rageBfPct > 0) rageDmg = Math.max(1, Math.round(rageDmg * (1 + _rageBfPct)));
                const rageDealt = this._damageEnemy(targetEnemy, rageDmg, false, false, 0, false, { contactAttacker: m });
                const rageSfx = !hasStamina ? ' (exhausted!)' : '';
                const _rageBfSuffix = _rageBfPct > 0 ? ` [🩸 Blood Frenzy +${Math.round(_rageBfPct * 100)}%]` : '';
                this._addLog(`\u{1F534} ${m.name} rage-strikes ${this._eName(targetEnemy)} for ${rageDealt}!${rageSfx}${_rageBfSuffix}`);
                if (!suppressWeaponRiders) this._applyWeaponRider(m, targetEnemy, rageDealt);
                this._applyWerebearBleedOnHit(m, targetEnemy, rageDealt);
                // Blood Rage: gain temp HP per rage hit (if stamina OK)
                if (m.level >= BARBARIAN_BLOOD_RAGE_UNLOCK_LEVEL && hasStamina) {
                    const rGain = Math.max(1, Math.floor(m.maxHealth * BARBARIAN_TEMP_HP_PER_HIT_FRAC));
                    m.tempHp = (m.tempHp || 0) + rGain;
                }
                if (targetEnemy.health <= 0) {
                    this._addLog(`${this._eName(targetEnemy)} is defeated!`);
                    break;
                }
            }
        }

        // Heroic Deeds — Rapid Assault: second full attack chain on the same target
        if (m.rapidAssaultPending && targetEnemy.health > 0) {
            m.rapidAssaultPending = false;
            this._addLog(`⚡ ${m.name}'s RAPID ASSAULT — second strike!`);
            const raExhausted = m.stamina < MELEE_STAMINA_COST;
            m.stamina = Math.max(0, m.stamina - MELEE_STAMINA_COST);
            let raBase = this._rollPlayerMeleeDamage(m);
            if (raExhausted) raBase = Math.max(1, Math.floor(raBase / 2));
            raBase = this._applyOutgoingDamageBonuses(m, raBase, 'melee');
            const raBfPct = this._getBloodFrenzyBonus(m, targetEnemy);
            if (raBfPct > 0) raBase = Math.max(1, Math.round(raBase * (1 + raBfPct)));
            const raDealt = this._damageEnemy(targetEnemy, raBase, false, false, 0, false, { contactAttacker: m });
            const raSuffix = raExhausted ? ' (exhausted!)' : '';
            let raLog = `${m.name} strikes ${this._eName(targetEnemy)} for ${raDealt}!${raSuffix}`;
            if (raBfPct > 0) raLog += ` [🩸 Blood Frenzy +${Math.round(raBfPct * 100)}%]`;
            this._addLog(raLog);
            if (!suppressWeaponRiders) this._applyWeaponRider(m, targetEnemy, raDealt);
            if (m.classId === 'barbarian') this._applyWerebearBleedOnHit(m, targetEnemy, raDealt);
            if (targetEnemy.health <= 0) {
                this._addLog(`${this._eName(targetEnemy)} is defeated!`);
            } else if (m.isRaging) {
                // Rage extra attacks for the second pass
                const raRageCount = Math.floor((m.level || 1) / 4);
                for (let rr = 0; rr < raRageCount; rr++) {
                    if (targetEnemy.health <= 0) break;
                    const rrSta = m.stamina >= BARBARIAN_RAGE_STAMINA_COST;
                    m.stamina = Math.max(0, m.stamina - BARBARIAN_RAGE_STAMINA_COST);
                    let rrDmg = this._rollPlayerMeleeDamage(m);
                    if (!rrSta) rrDmg = Math.max(1, Math.floor(rrDmg / 2));
                    rrDmg = this._applyOutgoingDamageBonuses(m, rrDmg, 'melee');
                    const rrBfPct = this._getBloodFrenzyBonus(m, targetEnemy);
                    if (rrBfPct > 0) rrDmg = Math.max(1, Math.round(rrDmg * (1 + rrBfPct)));
                    const rrDealt = this._damageEnemy(targetEnemy, rrDmg, false, false, 0, false, { contactAttacker: m });
                    this._addLog(`🔴 ${m.name} rage-strikes ${this._eName(targetEnemy)} for ${rrDealt}!${!rrSta ? ' (exhausted!)' : ''}`);
                    if (!suppressWeaponRiders) this._applyWeaponRider(m, targetEnemy, rrDealt);
                    this._applyWerebearBleedOnHit(m, targetEnemy, rrDealt);
                    if (targetEnemy.health <= 0) { this._addLog(`${this._eName(targetEnemy)} is defeated!`); break; }
                }
            }
        }

        // Quickstep Song haste: one extra melee strike (backstab is a separate function, unaffected)
        if (m.quickstepHasteActive && this.aliveHostileEnemies.length > 0) {
            const _qsTarget = targetEnemy.health > 0 ? targetEnemy : this.aliveHostileEnemies[0];
            if (_qsTarget && _qsTarget.health > 0) {
                const _qsExh = m.stamina < MELEE_STAMINA_COST;
                m.stamina = Math.max(0, m.stamina - MELEE_STAMINA_COST);
                let _qsDmg = this._rollPlayerMeleeDamage(m);
                if (_qsExh) _qsDmg = Math.max(1, Math.floor(_qsDmg / 2));
                _qsDmg = this._applyOutgoingDamageBonuses(m, _qsDmg, 'melee');
                const _qsDealt = this._damageEnemy(_qsTarget, _qsDmg, false, false, 0, false, { contactAttacker: m });
                this._addLog(`⚡ ${m.name}'s Quickstep haste — bonus strike on ${this._eName(_qsTarget)} for ${_qsDealt}!${_qsExh ? ' (exhausted!)' : ''}`);
                if (!suppressWeaponRiders) {
                    this._applyWeaponRider(m, _qsTarget, _qsDealt);
                    this._applyWeaponRider(m, _qsTarget, _qsDealt, 'offhand');
                }
                if (m.classId === 'barbarian') this._applyWerebearBleedOnHit(m, _qsTarget, _qsDealt);
                if (_qsTarget.health <= 0) this._addLog(`${this._eName(_qsTarget)} is defeated!`);
            }
        }

        this._advancePlayerTurn();
    }

    rangedAttack(targetEnemy) {
        const m = this.currentMember;
        if (!m || m.health <= 0) return;
        if (m.isDefendMode) {
            this._addLog(`${m.name} is in Defend Mode — attacks are disabled.`);
            return;
        }

        const exhausted = m.stamina < RANGED_STAMINA_COST;
        m.stamina = Math.max(0, m.stamina - RANGED_STAMINA_COST);

        // Ranger favored enemy check (supports multiple favored tags at L20+)
        const favoredTags = m.classId === 'ranger' ? m.getAllFavoredEnemies() : [];
        const targetDef = ENEMY_TYPES[targetEnemy.type];
        const targetTags = (targetDef && targetDef.tags) ? targetDef.tags : [];
        const isFavored = favoredTags.length > 0 && favoredTags.some(tag => targetTags.includes(tag));

        // Instakill: 1% per 3 ranger levels vs favored enemy
        if (isFavored) {
            const instakillChance = m.getFavoredEnemyInstakillChance();
            if (instakillChance > 0 && Math.random() < instakillChance) {
                if (targetEnemy.isBoss || targetEnemy.isMegaBoss) {
                    // Boss/mega-boss immune to instakill — deal x4 pre-defense damage instead
                    let bRangeDmg = randomInt(RANGED_DAMAGE_MIN, RANGED_DAMAGE_MAX);
                    bRangeDmg += m.getWeaponBonus('ranged');
                    bRangeDmg += m.getClassDamageBonus('ranged');
                    if (exhausted) bRangeDmg = Math.max(1, Math.floor(bRangeDmg / 2));
                    bRangeDmg = Math.max(1, Math.round(bRangeDmg * 4));
                    bRangeDmg = this._applyOutgoingDamageBonuses(m, bRangeDmg, 'ranged');
                    const bRangeDealt = this._damageEnemy(targetEnemy, bRangeDmg, true, false, 0, true);
                    this._addLog(`🎯 ${m.name} scores a lethal shot on ${this._eName(targetEnemy)} — Boss resists instant death! (x4 ranged: ${bRangeDealt} damage)`);
                    this._advancePlayerTurn();
                    return;
                }
                targetEnemy.health = 0;
                if (!targetEnemy._deathHandled) { targetEnemy._deathHandled = true; this._onEnemyDeath(targetEnemy); }
                this._addLog(`🎯 ${m.name} lands a LETHAL SHOT on the ${this._eName(targetEnemy)}! (Favored enemy instakill!)`);
                this._advancePlayerTurn();
                return;
            }
        }

        let dmg = randomInt(RANGED_DAMAGE_MIN, RANGED_DAMAGE_MAX);
        dmg += m.getWeaponBonus('ranged');
        dmg += m.getClassDamageBonus('ranged');
        dmg += this._getPartyMemberDamageMod(m);
        if (exhausted) dmg = Math.max(1, Math.floor(dmg / 2));

        let isCrit = false;
        const critChance = RANGED_CRIT_CHANCE + m.getRangedCritBonus();
        if (Math.random() < critChance && !this._isCritImmune(targetEnemy)) {
            dmg *= 2;
            isCrit = true;
        }
        dmg = this._applyOutgoingDamageBonuses(m, dmg, 'ranged');
        if (isFavored) dmg = Math.round(dmg * (1 + m.level * 0.02));

        const dealt = this._damageEnemy(targetEnemy, dmg, isFavored, false, 0, true);

        const eName = this._eName(targetEnemy);
        const exhaustStr = exhausted ? ' (exhausted!)' : '';
        const critStr = isCrit ? ' \u{1F4A5} CRITICAL HIT!' : '';
        const favoredStr = isFavored ? ` [Favored Enemy — armor ignored, +${m.level * 2}% dmg]` : '';
        this._addLog(`${m.name} shoots ${eName} for ${dealt} damage!${exhaustStr}${critStr}${favoredStr}`);

        this._applyWeaponRider(m, targetEnemy, dealt);
        this._applyRangerTotemOnHit(m, targetEnemy, dealt, 'ranged');

        if (targetEnemy.health <= 0) this._addLog(`${eName} is defeated!`);
        this._checkHunterMarkKill(targetEnemy);
        this._applyRangedRicochet(m, dmg, favoredTags, targetEnemy);

        // Ranger extra shots — +1 per 5 levels. Each shot pays stamina,
        // rolls fresh damage + crit independently. Retargets if dead.
        const extraShots = m.getExtraRangedAttacks();
        let curT = targetEnemy;
        for (let i = 0; i < extraShots; i++) {
            if (curT.health <= 0) {
                curT = this.aliveEnemies[0];
                if (!curT) break;
            }
            const shotExhausted = m.stamina < RANGED_STAMINA_COST;
            m.stamina = Math.max(0, m.stamina - RANGED_STAMINA_COST);
            // Check favored enemy instakill for extra shots too
            const xtDef = ENEMY_TYPES[curT.type];
            const xtTags = (xtDef && xtDef.tags) ? xtDef.tags : [];
            const xtFavored = favoredTags.length > 0 && favoredTags.some(tag => xtTags.includes(tag));
            if (xtFavored) {
                const xtInstakill = m.getFavoredEnemyInstakillChance();
                if (xtInstakill > 0 && Math.random() < xtInstakill) {
                    if (curT.isBoss || curT.isMegaBoss) {
                        // Boss/mega-boss immune to instakill — x4 pre-defense damage
                        let bXtDmg = randomInt(RANGED_DAMAGE_MIN, RANGED_DAMAGE_MAX);
                        bXtDmg += m.getWeaponBonus('ranged');
                        bXtDmg += m.getClassDamageBonus('ranged');
                        if (shotExhausted) bXtDmg = Math.max(1, Math.floor(bXtDmg / 2));
                        bXtDmg = Math.max(1, Math.round(bXtDmg * 4));
                        bXtDmg = this._applyOutgoingDamageBonuses(m, bXtDmg, 'ranged');
                        const bXtDealt = this._damageEnemy(curT, bXtDmg, true, false, 0, true);
                        this._addLog(`🎯 ${m.name} scores a lethal shot on ${this._eName(curT)} — Boss resists instant death! (x4 ranged: ${bXtDealt} damage)`);
                        if (curT.health <= 0) this._addLog(`${this._eName(curT)} is defeated!`);
                        continue;
                    }
                    curT.health = 0;
                    if (!curT._deathHandled) { curT._deathHandled = true; this._onEnemyDeath(curT); }
                    this._addLog(`🎯 ${m.name} lands a LETHAL SHOT on the ${this._eName(curT)}! (Favored enemy instakill!)`);
                    continue;
                }
            }
            let sdmg = randomInt(RANGED_DAMAGE_MIN, RANGED_DAMAGE_MAX);
            sdmg += m.getWeaponBonus('ranged');
            sdmg += m.getClassDamageBonus('ranged');
            if (shotExhausted) sdmg = Math.max(1, Math.floor(sdmg / 2));
            let scrit = false;
            const scritChance = RANGED_CRIT_CHANCE + m.getRangedCritBonus();
            if (Math.random() < scritChance && !this._isCritImmune(curT)) { sdmg *= 2; scrit = true; }
            sdmg = this._applyOutgoingDamageBonuses(m, sdmg, 'ranged');
            if (xtFavored) sdmg = Math.round(sdmg * (1 + m.level * 0.02));
            const sTargetName = this._eName(curT);
            const sDealt = this._damageEnemy(curT, sdmg, xtFavored, false, 0, true);
            const sExhaust = shotExhausted ? ' (exhausted!)' : '';
            const sCrit = scrit ? ' \u{1F4A5} CRITICAL HIT!' : '';
            const sFav = xtFavored ? ` [Favored Enemy — armor ignored, +${m.level * 2}% dmg]` : '';
            this._addLog(`\u{1F3F9} ${m.name} looses another arrow at ${sTargetName} for ${sDealt} damage!${sExhaust}${sCrit}${sFav}`);
            this._applyWeaponRider(m, curT, sDealt);
            this._applyRangerTotemOnHit(m, curT, sDealt, 'ranged');
            if (curT.health <= 0) { this._addLog(`${sTargetName} is defeated!`); this._checkHunterMarkKill(curT); }
            this._applyRangedRicochet(m, sdmg, favoredTags, curT);
        }

        // Quickstep Song haste: one extra ranged shot (explosive arrows is a separate function, unaffected)
        if (m.quickstepHasteActive && this.aliveHostileEnemies.length > 0) {
            const _qsrTarget = targetEnemy.health > 0 ? targetEnemy : this.aliveHostileEnemies[0];
            if (_qsrTarget && _qsrTarget.health > 0) {
                const _qsrExh = m.stamina < RANGED_STAMINA_COST;
                m.stamina = Math.max(0, m.stamina - RANGED_STAMINA_COST);
                let _qsrDmg = randomInt(RANGED_DAMAGE_MIN, RANGED_DAMAGE_MAX);
                _qsrDmg += m.getWeaponBonus('ranged');
                _qsrDmg += m.getClassDamageBonus('ranged');
                _qsrDmg += this._getPartyMemberDamageMod(m);
                if (_qsrExh) _qsrDmg = Math.max(1, Math.floor(_qsrDmg / 2));
                _qsrDmg = this._applyOutgoingDamageBonuses(m, _qsrDmg, 'ranged');
                const _qsrDealt = this._damageEnemy(_qsrTarget, _qsrDmg, false, false, 0, true);
                this._addLog(`⚡ ${m.name}'s Quickstep haste — bonus shot at ${this._eName(_qsrTarget)} for ${_qsrDealt}!${_qsrExh ? ' (exhausted!)' : ''}`);
                this._applyWeaponRider(m, _qsrTarget, _qsrDealt);
                this._applyRangerTotemOnHit(m, _qsrTarget, _qsrDealt, 'ranged');
                if (_qsrTarget.health <= 0) this._addLog(`${this._eName(_qsrTarget)} is defeated!`);
                this._applyRangedRicochet(m, _qsrDmg, favoredTags, _qsrTarget);
            }
        }

        this._advancePlayerTurn();
    }

    /**
     * Artificer Scatter Shot — single stamina cost, main target at full damage,
     * then N splash hits at (50% + artificerLevel%) of rolled damage, capped at 100%.
     * Splash count = SCATTER_SPLASH_BASE + floor(level / SCATTER_SPLASH_EVERY).
     *   L1 → 2 splashes @ 51%, L5 → 3 splashes @ 55%, L50 → 12 splashes @ 100%, …
     * Each shot rolls damage + crit independently. Splash targets are the
     * other alive enemies (nearest-to-front first). If no extra enemies exist,
     * extra shots pile onto the remaining targets (skipping dead ones).
     */
    scatterShot(targetEnemy) {
        const m = this.currentMember;
        if (!m || m.health <= 0) return;
        if (m.classId !== 'artificer') return;

        const exhausted = m.stamina < RANGED_STAMINA_COST;
        m.stamina = Math.max(0, m.stamina - RANGED_STAMINA_COST);

        // Deconstruct (L25) crit bonus: +20% + level/2% when primary target is a construct.
        const primaryTargetDef  = ENEMY_TYPES[targetEnemy.type] || {};
        const primaryIsConstruct = m.level >= ARTIFICER_DECONSTRUCT_UNLOCK_LEVEL &&
            Array.isArray(primaryTargetDef.tags) && primaryTargetDef.tags.includes('construct');
        const deconstructCritBonus = primaryIsConstruct ? (0.20 + m.level * 0.005) : 0;

        // Primary shot
        let dmg = randomInt(RANGED_DAMAGE_MIN, RANGED_DAMAGE_MAX);
        dmg += m.getWeaponBonus('ranged');
        dmg += m.getClassDamageBonus('ranged');
        dmg += this._getPartyMemberDamageMod(m);
        if (exhausted) dmg = Math.max(1, Math.floor(dmg / 2));

        let isCrit = false;
        const critChance = RANGED_CRIT_CHANCE + m.getRangedCritBonus() + deconstructCritBonus;
        if (Math.random() < critChance && !this._isCritImmune(targetEnemy)) { dmg *= 2; isCrit = true; }
        dmg = this._applyOutgoingDamageBonuses(m, dmg, 'ranged');

        const dealt = this._damageEnemy(targetEnemy, dmg, false, false, 0, true);
        const eName = this._eName(targetEnemy);
        const exhaustStr = exhausted ? ' (exhausted!)' : '';
        const critStr = isCrit ? ' \u{1F4A5} CRITICAL HIT!' : '';
        const deconStr = primaryIsConstruct ? ` [Deconstruct crit +${Math.round((0.20 + m.level * 0.005) * 100)}%]` : '';
        this._addLog(`\u{1F4A3} ${m.name} fires Scatter Shot at ${eName} for ${dealt} damage!${exhaustStr}${critStr}${deconStr}`);
        this._applyWeaponRider(m, targetEnemy, dealt);
        this._applyRangerTotemOnHit(m, targetEnemy, dealt, 'ranged');
        if (targetEnemy.health <= 0) this._addLog(`${eName} is defeated!`);

        // L25 Deconstruct — bonus damage vs constructs + scavenge heal on own golems
        if (m.level >= ARTIFICER_DECONSTRUCT_UNLOCK_LEVEL && targetEnemy.health > 0) {
            const primaryDef  = ENEMY_TYPES[targetEnemy.type] || {};
            const primaryTags = Array.isArray(primaryDef.tags) ? primaryDef.tags : [];
            if (primaryTags.includes('construct')) {
                this._applyArtificerSabotage(m, targetEnemy);
                if (targetEnemy.health <= 0) {
                    this._addLog(`${eName} is torn apart!`);
                } else {
                    const bonusDmg = dealt * ARTIFICER_DECONSTRUCT_BONUS_MULT;
                    this._damageEnemy(targetEnemy, bonusDmg, true);
                    this._addLog(`\u{1F527} DECONSTRUCT! ${m.name} exploits ${eName}'s weak points for ${bonusDmg} bonus damage! [×${ARTIFICER_DECONSTRUCT_BONUS_MULT}, ignores armor]`);
                    if (targetEnemy.health <= 0) this._addLog(`${eName} is torn apart!`);
                    if (Math.random() < ARTIFICER_DECONSTRUCT_SCAVENGE_CHANCE) {
                        const myGolems = (this.party || []).filter(p =>
                            p && p.isSummoned && p.summonerId === m.id && GOLEM_PRESETS[p.summonType] && p.health > 0 && p.health < p.maxHealth
                        );
                        for (const g of myGolems) {
                            const healAmt = Math.max(1, Math.ceil(g.maxHealth * ARTIFICER_DECONSTRUCT_GOLEM_HEAL_PCT));
                            g.health = Math.min(g.maxHealth, g.health + healAmt);
                            this._addLog(`\u{1F527} ${m.name} scavenges parts — ${g.name} repairs ${healAmt} HP!`);
                        }
                    }
                }
            }
        }

        // Splash shots
        const splashCount = SCATTER_SPLASH_BASE + Math.floor(m.level / SCATTER_SPLASH_EVERY);
        // Splash fraction: 50% base + 1% per artificer level, capped at 100%.
        const splashFraction = Math.min(1.0, SCATTER_SPLASH_FRACTION + m.level * 0.01);
        // Build splash target pool: alive enemies excluding the primary, then
        // fall back to any alive enemy so leftover shots still connect.
        for (let i = 0; i < splashCount; i++) {
            const others = this.aliveHostileEnemies.filter(e => e !== targetEnemy);
            let t = others[i % Math.max(1, others.length)];
            if (!t || t.health <= 0) t = this.aliveEnemies[0];
            if (!t || t.health <= 0) break;

            let sdmg = randomInt(RANGED_DAMAGE_MIN, RANGED_DAMAGE_MAX);
            sdmg += m.getWeaponBonus('ranged');
            sdmg += m.getClassDamageBonus('ranged');
            if (exhausted) sdmg = Math.max(1, Math.floor(sdmg / 2));
            sdmg = Math.max(1, Math.floor(sdmg * splashFraction));

            let sCritFlag = false;
            if (Math.random() < critChance && !this._isCritImmune(t)) { sdmg *= 2; sCritFlag = true; }
            sdmg = this._applyOutgoingDamageBonuses(m, sdmg, 'ranged');

            const sName = this._eName(t);
            const sDealt = this._damageEnemy(t, sdmg, false, false, 0, true);
            const sCritStr = sCritFlag ? ' \u{1F4A5} CRIT!' : '';
            this._addLog(`  \u21AA\uFE0F splash hits ${sName} for ${sDealt} damage!${sCritStr}`);
            this._applyWeaponRider(m, t, sDealt);
            this._applyRangerTotemOnHit(m, t, sDealt, 'ranged');
            if (t.health <= 0) this._addLog(`${sName} is defeated!`);

            // L25 Deconstruct — bonus damage vs constructs on splash hits
            if (m.level >= ARTIFICER_DECONSTRUCT_UNLOCK_LEVEL && t.health > 0) {
                const sDef  = ENEMY_TYPES[t.type] || {};
                const sTags = Array.isArray(sDef.tags) ? sDef.tags : [];
                if (sTags.includes('construct')) {
                    this._applyArtificerSabotage(m, t);
                    if (t.health <= 0) {
                        this._addLog(`${sName} is torn apart!`);
                    } else {
                        const sBonusDmg = sDealt * ARTIFICER_DECONSTRUCT_BONUS_MULT;
                        this._damageEnemy(t, sBonusDmg, true);
                        this._addLog(`  \u{1F527} DECONSTRUCT! ${m.name} exploits ${sName}'s weak points for ${sBonusDmg} bonus damage! [×${ARTIFICER_DECONSTRUCT_BONUS_MULT}, ignores armor]`);
                        if (t.health <= 0) this._addLog(`${sName} is torn apart!`);
                        if (Math.random() < ARTIFICER_DECONSTRUCT_SCAVENGE_CHANCE) {
                            const myGolems = (this.party || []).filter(p =>
                                p && p.isSummoned && p.summonerId === m.id && GOLEM_PRESETS[p.summonType] && p.health > 0 && p.health < p.maxHealth
                            );
                            for (const g of myGolems) {
                                const sHealAmt = Math.max(1, Math.ceil(g.maxHealth * ARTIFICER_DECONSTRUCT_GOLEM_HEAL_PCT));
                                g.health = Math.min(g.maxHealth, g.health + sHealAmt);
                                this._addLog(`  🔧 ${m.name} scavenges parts — ${g.name} repairs ${sHealAmt} HP!`);
                            }
                        }
                    }
                }
            }

            // L25 Enchanted Drone — checked per splash independently
            if (m.level >= ARTIFICER_DRONE_UNLOCK_LEVEL) {
                const dChance = Math.min(ARTIFICER_DRONE_CHANCE_CAP, m.level / 100);
                if (Math.random() < dChance) {
                    this._fireEnchantedDrone(m);
                    if (m.level >= ARTIFICER_DUAL_DRONE_UNLOCK_LEVEL && Math.random() < dChance) {
                        this._addLog(`⚙️⚙️ Dual Drone triggers — a second drone activates!`);
                        this._fireEnchantedDrone(m);
                    }
                }
            }
        }

        this._advancePlayerTurn();
    }

    /**
     * L25 Enchanted Drone — spawned by each scatter splash with a (level)% chance,
     * capped at ARTIFICER_DRONE_CHANCE_CAP. Picks one of 7 random effects.
     * Revive re-rolls to another effect if no party members are fallen.
     */
    _fireEnchantedDrone(artificer) {
        const al  = artificer.level;
        const ico = '⚙️';

        const fallen = this.party.filter(p => !p.isSummoned && p.health <= 0);
        // Build effect pool: 0=revive only when someone is fallen
        const pool = fallen.length > 0 ? [0, 1, 2, 3, 4, 5, 6] : [1, 2, 3, 4, 5, 6];
        const roll = pool[Math.floor(Math.random() * pool.length)];

        switch (roll) {
            case 0: { // Revive a fallen character
                const t = fallen[Math.floor(Math.random() * fallen.length)];
                const amt = Math.max(1, Math.ceil(t.maxHealth * CLERIC_REVIVE_HEAL_FRAC));
                t.health = amt;
                t.stunned = false;
                if (Array.isArray(t.activeEffects))
                    t.activeEffects = t.activeEffects.filter(fx => fx && fx.type !== 'poison');
                this._addLog(`${ico} Enchanted Drone zips to ${t.name} and revives them! (+${amt} HP)`);
                break;
            }
            case 1: { // Heal 5% of missing HP — golems + living non-undead
                const healable = this.party.filter(p => {
                    if (!p || p.health <= 0 || p.health >= p.maxHealth) return false;
                    if (this._isIllusionaryWarriorMember(p) || isShadowSimulacra(p)) return false;
                    if (!p.isSummoned) return true;
                    if (GOLEM_PRESETS[p.summonType]) return true;
                    if (UNDEAD_TIERS.some(ut => ut.id === p.summonType) || p.summonType === 'demi_lich') return false;
                    return p.canBeHealed !== false; // beast and other living summons
                });
                if (healable.length === 0) {
                    this._addLog(`${ico} Enchanted Drone fires repair beam — no wounded targets!`);
                    break;
                }
                const t = healable[Math.floor(Math.random() * healable.length)];
                const heal = Math.max(1, Math.floor((t.maxHealth - t.health) * 0.05));
                t.health = Math.min(t.maxHealth, t.health + heal);
                this._addLog(`${ico} Enchanted Drone pulses a repair beam on ${t.name}! (+${heal} HP)`);
                break;
            }
            case 2: { // 2 Mirror Images on a random living party member
                const living = this.party.filter(p => this._canReceiveLivingHealOrBuff(p));
                if (living.length === 0) break;
                const t = living[Math.floor(Math.random() * living.length)];
                t.mirrorImages = (t.mirrorImages || 0) + 2;
                this._addLog(`${ico} Enchanted Drone projects 2 Mirror Images around ${t.name}! (${t.mirrorImages} total)`);
                break;
            }
            case 3: { // AoE magic blast — all enemies
                const targets = [...this.aliveHostileEnemies];
                if (targets.length === 0) break;
                let dmg = randomInt(RANGED_DAMAGE_MIN, RANGED_DAMAGE_MAX);
                dmg += artificer.getWeaponBonus('ranged');
                dmg += artificer.getClassDamageBonus('ranged');
                dmg = this._applyOutgoingDamageBonuses(artificer, dmg, 'ranged');
                this._addLog(`${ico} Enchanted Drone detonates — arcane shrapnel shreds the enemy ranks!`);
                for (const e of targets) {
                    if (e.health <= 0) continue;
                    const dealt = this._damageEnemy(e, dmg, false, true);
                    this._addLog(`  ↪️ ${this._eName(e)} takes ${dealt} magic damage!`);
                    if (e.health <= 0) this._addLog(`${this._eName(e)} is obliterated!`);
                }
                break;
            }
            case 4: { // Attempt stun on a random enemy
                const targets = this.aliveHostileEnemies;
                if (targets.length === 0) break;
                const t = targets[Math.floor(Math.random() * targets.length)];
                if (this._tryStunEnemy(t)) {
                    this._addLog(`${ico} Enchanted Drone electro-shocks ${this._eName(t)} — STUNNED!`);
                } else {
                    this._addLog(`${ico} Enchanted Drone attempts to stun ${this._eName(t)} — resisted!`);
                }
                break;
            }
            case 5: { // Critical hit ×4 on a random enemy
                const targets = this.aliveHostileEnemies;
                if (targets.length === 0) break;
                const t = targets[Math.floor(Math.random() * targets.length)];
                let dmg = randomInt(RANGED_DAMAGE_MIN, RANGED_DAMAGE_MAX);
                dmg += artificer.getWeaponBonus('ranged');
                dmg += artificer.getClassDamageBonus('ranged');
                dmg *= 4;
                dmg = this._applyOutgoingDamageBonuses(artificer, dmg, 'ranged');
                const dealt = this._damageEnemy(t, dmg);
                this._addLog(`${ico} Enchanted Drone CRITICAL STRIKE hits ${this._eName(t)} for ${dealt}! 💥`);
                if (t.health <= 0) this._addLog(`${this._eName(t)} is obliterated!`);
                break;
            }
            case 6: { // Arcane bindings — reduce target atk & def, incorporeal+boss immune
                const targets = this.aliveHostileEnemies.filter(e =>
                    !this._getEnemyTags(e).includes('incorporeal') && !e.isBoss && !e.isMegaBoss);
                if (targets.length === 0) {
                    this._addLog(`${ico} Enchanted Drone fires bindings — no valid targets!`);
                    break;
                }
                const t = targets[Math.floor(Math.random() * targets.length)];
                const penalty = Math.max(1, Math.floor(al / 6));
                const rounds  = Math.max(1, Math.floor(al / 6));
                this._refreshEnemyEffect(t, {
                    type: 'drone_binding',
                    damageBonus:  -penalty,
                    defenseBonus: -penalty,
                    rounds,
                });
                this._addLog(`${ico} Enchanted Drone ensnares ${this._eName(t)} in arcane bindings! (-${penalty} atk/-${penalty} def for ${rounds} rds)`);
                break;
            }
        }
    }

    magicAttack() {
        const m = this.currentMember;
        if (!m || m.health <= 0) return;
        if (m.isDefendMode) {
            this._addLog(`${m.name} is in Defend Mode — attacks are disabled.`);
            return;
        }

        const manaCost = this.getMagicManaCost(m);
        const exhausted = m.mana < manaCost;
        m.mana = Math.max(0, m.mana - manaCost);

        let dmg = randomInt(MAGIC_DAMAGE_MIN, MAGIC_DAMAGE_MAX);
        dmg += m.getWeaponBonus('magic');
        dmg += m.getClassDamageBonus('magic');
        dmg += this._getPartyMemberDamageMod(m);
        dmg = Math.max(1, Math.round(dmg * (m.getMagicDamageMultiplier?.() || 1)));
        if (exhausted) dmg = Math.max(1, Math.floor(dmg / 2));

        // Number of targets = caster level + 4; mages get +2 extra targets.
        const baseTargets = (m.level || 1) + 4 + (m.classId === 'mage' ? 2 : 0);
        const alive = this.aliveHostileEnemies;

        // Each enemy may only be hit once \u2014 shuffle and take up to baseTargets unique targets.
        const shuffled = alive.slice().sort(() => Math.random() - 0.5);
        const hitCounts = new Map();
        const targetsHit = Math.min(baseTargets, shuffled.length);
        for (let i = 0; i < targetsHit; i++) hitCounts.set(shuffled[i], 1);

        const suffix = exhausted ? ' (exhausted!)' : '';
        this._addLog(`\u2728 ${m.name} casts a spell (${manaCost} MP) striking up to ${baseTargets} enemies!${suffix}`);

        const stunChance = m.getMagicStunBonus();

        for (const [e] of hitCounts) {
            if (e.health <= 0) continue;
            // Mage L20: AoE crit chance = floor(level/2) × 1% per 2 levels
            let finalDmg = dmg;
            let critNote = '';
            if (m.classId === 'mage' && m.level >= MAGE_MIRROR_IMAGE_UNLOCK_LEVEL) {
                const critChance = Math.floor(m.level / 2) * MAGE_AOE_CRIT_CHANCE_PER_2LV;
                if (critChance > 0 && Math.random() < critChance && !this._isCritImmune(e)) {
                    const critMult = MAGE_AOE_CRIT_DAMAGE_BASE + m.level * MAGE_AOE_CRIT_DAMAGE_PER_LV;
                    finalDmg = Math.floor(finalDmg * critMult);
                    critNote = ' (ARCANE CRIT!)';
                }
            }
            finalDmg = this._applyOutgoingDamageBonuses(m, finalDmg, 'magic');
            const mageDefenseIgnorePct = m.classId === 'mage' ? Math.min(1, (m.level || 1) / 100) : 0;
            const dealt = this._damageEnemy(e, finalDmg, false, true, mageDefenseIgnorePct);
            this._addLog(`  → ${this._eName(e)} takes ${dealt} magic damage.${critNote}`);
            if (e.health > 0 && stunChance > 0 && Math.random() < stunChance) {
                if (this._tryStunEnemy(e))
                    this._addLog(`  ⚡ ${this._eName(e)} is stunned by arcane force!`);
            }
            // Necromancer drain: roll per target hit
            if (m.classId === 'necromancer' && Math.random() < NECRO_LIFE_DRAIN_CHANCE) {
                this._drainHeal(m);
            }
            if (e.health <= 0) this._addLog(`  ☠️ ${this._eName(e)} is defeated!`);
        }

        // Arcane Overload (Mage L30): cascading bursts; each costs ×1.5 mana, capped at floor(level/6) bursts
        if (m.classId === 'mage' && m.level >= MAGE_ARCANE_OVERLOAD_UNLOCK_LEVEL) {
            let aoChance = Math.min(1, MAGE_ARCANE_OVERLOAD_BURST_BASE + m.level * 0.01);
            let aoMult = 1.5;
            const aoMaxBursts = Math.max(1, Math.floor(m.level / 6));
            let aoBursts = 0;
            while (this.aliveHostileEnemies.length > 0 && aoBursts < aoMaxBursts && Math.random() < aoChance) {
                const aoCost = Math.ceil(manaCost * aoMult);
                if (m.mana < aoCost) {
                    this._addLog(`✨ ${m.name}'s Arcane Overload surges — collapses! (needs ${aoCost} MP)`);
                    break;
                }
                m.mana -= aoCost;
                const aoAlive = this.aliveHostileEnemies.slice().sort(() => Math.random() - 0.5);
                const aoCount = Math.min(baseTargets, aoAlive.length);
                this._addLog(`✨✨ ARCANE OVERLOAD — ${m.name} erupts with another burst! (-${aoCost} MP)`);
                for (let bi = 0; bi < aoCount; bi++) {
                    const e = aoAlive[bi];
                    if (e.health <= 0) continue;
                    let bDmg = randomInt(MAGIC_DAMAGE_MIN, MAGIC_DAMAGE_MAX);
                    bDmg += m.getWeaponBonus('magic');
                    bDmg += m.getClassDamageBonus('magic');
                    bDmg += this._getPartyMemberDamageMod(m);
                    bDmg = Math.max(1, Math.round(bDmg * (m.getMagicDamageMultiplier?.() || 1)));
                    let bCritNote = '';
                    const bCritChance = Math.floor(m.level / 2) * MAGE_AOE_CRIT_CHANCE_PER_2LV;
                    if (bCritChance > 0 && Math.random() < bCritChance && !this._isCritImmune(e)) {
                        const bCritMult = MAGE_AOE_CRIT_DAMAGE_BASE + m.level * MAGE_AOE_CRIT_DAMAGE_PER_LV;
                        bDmg = Math.floor(bDmg * bCritMult);
                        bCritNote = ' (ARCANE CRIT!)';
                    }
                    bDmg = this._applyOutgoingDamageBonuses(m, bDmg, 'magic');
                    const bDefIgn = Math.min(1, (m.level || 1) / 100);
                    const bDealt = this._damageEnemy(e, bDmg, false, true, bDefIgn);
                    this._addLog(`  → ${this._eName(e)} takes ${bDealt} magic damage.${bCritNote}`);
                    if (e.health > 0 && stunChance > 0 && Math.random() < stunChance) {
                        if (this._tryStunEnemy(e))
                            this._addLog(`  ⚡ ${this._eName(e)} is stunned by arcane force!`);
                    }
                    if (e.health <= 0) this._addLog(`  ☠️ ${this._eName(e)} is defeated!`);
                }
                aoChance -= MAGE_ARCANE_OVERLOAD_BURST_STEP;
                aoMult *= 1.5;
                aoBursts++;
            }
        }

        // Quickstep Song haste: one extra single-target magic bolt
        // (AoE named abilities like Wither Plants, Fireball, etc. are separate functions, unaffected)
        if (m.quickstepHasteActive && this.aliveHostileEnemies.length > 0) {
            const _qsmTargets = this.aliveHostileEnemies;
            const _qsmTarget = _qsmTargets[Math.floor(Math.random() * _qsmTargets.length)];
            if (_qsmTarget && _qsmTarget.health > 0) {
                const _qsmCost = this.getMagicManaCost(m);
                const _qsmExh = m.mana < _qsmCost;
                m.mana = Math.max(0, m.mana - _qsmCost);
                let _qsmDmg = randomInt(MAGIC_DAMAGE_MIN, MAGIC_DAMAGE_MAX);
                _qsmDmg += m.getWeaponBonus('magic');
                _qsmDmg += m.getClassDamageBonus('magic');
                _qsmDmg += this._getPartyMemberDamageMod(m);
                _qsmDmg = Math.max(1, Math.round(_qsmDmg * (m.getMagicDamageMultiplier?.() || 1)));
                if (_qsmExh) _qsmDmg = Math.max(1, Math.floor(_qsmDmg / 2));
                _qsmDmg = this._applyOutgoingDamageBonuses(m, _qsmDmg, 'magic');
                const _qsmDefIgnore = m.classId === 'mage' ? Math.min(1, (m.level || 1) / 100) : 0;
                const _qsmDealt = this._damageEnemy(_qsmTarget, _qsmDmg, false, true, _qsmDefIgnore);
                this._addLog(`⚡ ${m.name}'s Quickstep haste — bonus bolt at ${this._eName(_qsmTarget)} for ${_qsmDealt}!${_qsmExh ? ' (exhausted!)' : ''}`);
                if (_qsmTarget.health <= 0) this._addLog(`  \u{1F480} ${this._eName(_qsmTarget)} is defeated!`);
            }
        }

        this._advancePlayerTurn();
    }

    _drainHeal(necro) {
        const healPct = 0.05 + ((necro.level || 1) / 2) / 100;
        const targets = this.party.filter(
            p => p.isSummoned
                && p.summonerId === necro.id
                && (UNDEAD_TIERS.some(ut => ut.id === p.summonType) || p.summonType === 'demi_lich' || p.summonType === 'corpse_horror')
                && p.health > 0,
        );
        let totalGained = 0;
        let healedCount = 0;
        for (const t of targets) {
            if (t.health <= 0) continue;
            const amount = Math.max(1, Math.floor((t.maxHealth || 1) * healPct));
            const before = t.health;
            t.health = Math.min(t.maxHealth, t.health + amount);
            const gained = t.health - before;
            if (gained > 0) healedCount++;
            totalGained += gained;
        }
        if (totalGained > 0) {
            this._addLog(`\u{1FA78} Life drain! ${necro.name}'s undead recover ${totalGained} total HP (${Math.round(healPct * 100)}% max HP each, ${healedCount} healed).`);
        }
    }

    /**
     * Barbarian Rage — barbarian only, once per combat.
     * Activates rage: halves damage taken, stun immune, +5% HP regen/round,
     * +level to melee damage, +Math.floor(level/4) extra swings at 3 ST each.
     */
    barbarianRage() {
        const m = this.currentMember;
        if (!m || m.health <= 0) return;
        if (m.classId !== 'barbarian') return;
        if (m.usedRage) {
            this._addLog(`\u{1F534} ${m.name} has already raged this combat!`);
            return;
        }
        m.isRaging = true;
        m.usedRage = true;
        const extraAttacks = Math.floor((m.level || 1) / 4);
        this._addLog(`\u{1F534} ${m.name} flies into a RAGE! (half damage, stun immune, +${m.level} melee dmg, ${extraAttacks} bonus attack(s)/round, 5% HP regen/round)`);
        // Rage is a free action — the UI will immediately prompt the player to
        // pick a target and strike. Turn advances after the melee resolves.
        this._notify();
    }

    _endWerebearForm(m, reason = '') {
        if (!m || !m.werebearActive) return;
        if (m.werebearHpBonus > 0) {
            m.maxHealth = Math.max(1, (m.maxHealth || 1) - m.werebearHpBonus);
            m.health = Math.min(Math.max(0, m.health || 0), m.maxHealth);
        }
        m.werebearActive = false;
        m.werebearHpBonus = 0;
        m.werebearDefenseBonus = 0;
        m.activeEffects = (m.activeEffects || []).filter(fx => !(fx && fx.type === 'werebear_defense'));
        if (reason) this._addLog(`🐻 ${m.name}'s Werebear form fades${reason}.`);
    }

    barbarianWerebear() {
        const m = this.currentMember;
        if (!m || m.health <= 0 || m.classId !== 'barbarian') return;
        if ((m.level || 1) < BARBARIAN_WEREBEAR_UNLOCK_LEVEL) return;
        if (m.werebearActive) {
            this._addLog(`🐻 ${m.name} is already in Werebear form.`);
            return;
        }
        if (m.werebearUsed) {
            this._addLog(`🐻 ${m.name} has already used Werebear this combat.`);
            return;
        }
        if ((m.stamina || 0) < BARBARIAN_WEREBEAR_STAMINA_COST) {
            this._addLog(`🐻 ${m.name} needs ${BARBARIAN_WEREBEAR_STAMINA_COST} stamina for Werebear (has ${m.stamina || 0}).`);
            return;
        }

        m.stamina = Math.max(0, (m.stamina || 0) - BARBARIAN_WEREBEAR_STAMINA_COST);
        m.werebearUsed = true;
        m.werebearActive = true;
        m.werebearHpBonus = Math.max(1, Math.floor((m.maxHealth || 1) * BARBARIAN_WEREBEAR_HP_BONUS_FRAC));
        m.maxHealth += m.werebearHpBonus;
        m.health += m.werebearHpBonus;

        const defBonus = Math.max(1, Math.floor((m.level || 1) / BARBARIAN_WEREBEAR_DEF_PER_LEVEL_DIVISOR));
        m.werebearDefenseBonus = defBonus;
        m.activeEffects = (m.activeEffects || []).filter(fx => !(fx && fx.type === 'werebear_defense'));
        m.activeEffects.push({ type: 'werebear_defense', defenseBonus: defBonus, permanent: true, rounds: 9999 });

        this._emitTelemetry('abilityUsed', { member: m, abilityId: 'barbarian_werebear' });
        this._addLog(`🐻 ${m.name} transforms into a Werebear! (-${BARBARIAN_WEREBEAR_STAMINA_COST} ST, +${m.werebearHpBonus} max/current HP, +${defBonus} DEF, +${Math.round(BARBARIAN_WEREBEAR_REGEN * 100)}% HP regen/round, -${BARBARIAN_WEREBEAR_STAMINA_PER_ROUND} ST/round).`);
        this._notify();
    }

    _applyWerebearBleedOnHit(barbarian, enemy, dealt) {
        if (!barbarian || !barbarian.werebearActive || !enemy || enemy.health <= 0 || dealt <= 0) return;
        const chance = Math.min(1, Math.max(0, (barbarian.level || 1) * BARBARIAN_WEREBEAR_BLEED_CHANCE_PER_LEVEL));
        if (Math.random() >= chance) return;
        if (this._enemyHasImmunity(enemy, 'bleed')) {
            this._addLog(`🩸 ${this._eName(enemy)} is immune to Werebear bleeding wounds!`);
            return;
        }
        const rounds = Math.max(1, Math.floor((barbarian.level || 1) / BARBARIAN_WEREBEAR_BLEED_DURATION_DIVISOR));
        const bleedDmg = Math.max(1, Math.floor(dealt * BARBARIAN_WEREBEAR_BLEED_DAMAGE_FRAC));
        enemy.activeEffects = enemy.activeEffects || [];
        enemy.activeEffects.push({ type: 'bleed', damage: bleedDmg, rounds });
        this._addLog(`🩸 Werebear maul opens a deep wound on ${this._eName(enemy)}! (${bleedDmg}/rd × ${rounds} rds)`);
    }

    _tryOdinsRavens(member) {
        if (!member || member.health > 0 || member.isSummoned) return false;
        if (member.classId !== 'barbarian' || (member.level || 1) < BARBARIAN_ODINS_RAVENS_UNLOCK_LEVEL) return false;
        if (member.odinsRavensTriggered) return false;

        const chance = Math.min(
            BARBARIAN_ODINS_RAVENS_MAX_CHANCE,
            BARBARIAN_ODINS_RAVENS_BASE_CHANCE + (member.level || 1) * BARBARIAN_ODINS_RAVENS_LEVEL_CHANCE,
        );
        if (Math.random() >= chance) return false;

        member.odinsRavensTriggered = true;
        this._endWerebearForm(member);

        const lvl = Math.max(1, member.level || 1);
        const valkMin = BARBARIAN_VALKYRIE_DAMAGE_MIN + lvl * BARBARIAN_VALKYRIE_DAMAGE_PER_LEVEL;
        const valkMax = BARBARIAN_VALKYRIE_DAMAGE_MAX + lvl * BARBARIAN_VALKYRIE_DAMAGE_PER_LEVEL;
        const valkyrie = new PartyMember({
            name: `${member.name}'s Valkyrie`,
            classId: 'summoned',
            speciesId: 'human',
            level: lvl,
            maxHealth: Math.max(1, member.maxHealth || 1),
            maxStamina: 0,
            maxMana: 0,
            portraitSeed: Math.floor(Math.random() * 100000),
            isSummoned: true,
            summonType: 'valkyrie',
            summonerId: member.id,
            canBeHealed: false,
            row: 'front',
            summonStats: {
                beastKind: 'valkyrie',
                race: 'valkyrie',
                nonLiving: true,
                defense: lvl * BARBARIAN_VALKYRIE_DEF_PER_LEVEL,
                meleeMin: valkMin,
                meleeMax: valkMax,
                attacksPerRound: Math.max(1, Math.floor(lvl / BARBARIAN_VALKYRIE_ATK_PER_ROUND_DIVISOR)),
                critChance: BARBARIAN_VALKYRIE_CRIT_CHANCE,
                shieldBlockChance: BARBARIAN_VALKYRIE_BLOCK_CHANCE,
                magicAoeDamageMult: BARBARIAN_VALKYRIE_MAGIC_AOE_DAMAGE_MULT,
            },
        });
        valkyrie.health = valkyrie.maxHealth;
        this.party.push(valkyrie);
        this._registerNewSummon(valkyrie);

        const reviveHp = Math.max(1, Math.ceil((member.maxHealth || 1) * BARBARIAN_ODINS_RAVENS_REVIVE_FRAC));
        member.health = reviveHp;
        member.stunned = false;
        member.webbedRounds = 0;
        member.proneRounds = 0;

        this._addLog(`🦅 ${member.name}'s Odin's Ravens answer the call! A Valkyrie descends, revives ${member.name} at ${reviveHp} HP, and joins the front line.`);
        return true;
    }

    _tryHandlePartyDeathRescue(member) {
        if (!member || member.health > 0) return false;
        if (this._tryOdinsRavens(member)) return true;
        if (this._tryDivineShroudRevive(member)) return true;
        return false;
    }

    // ── Barbarian L30: Heroic Deeds ──────────────────────────────────────────

    /** Rapid Assault — free action: doubles attacks this round (second melee chain). */
    barbarianRapidAssault() {
        const m = this.currentMember;
        if (!m || m.health <= 0 || m.classId !== 'barbarian') return;
        if (m.level < BARBARIAN_HEROIC_DEEDS_UNLOCK_LEVEL) return;
        if ((m.heroicDeedTokens || 0) < 1) {
            this._addLog(`${m.name} has no Heroic Deed tokens!`);
            return;
        }
        m.heroicDeedTokens--;
        m.rapidAssaultPending = true;
        this._emitTelemetry('abilityUsed', { member: m, abilityId: 'barbarian_rapid_assault' });
        this._addLog(`⚡ ${m.name} spends a Heroic Deed token — RAPID ASSAULT! Next attack fires twice. (${m.heroicDeedTokens} tokens remaining)`);
        this._notify();
    }

    /** Reckless Move — free action: deal melee damage to up to 4 random enemies and knock them back (lose next turn). */
    barbarianRecklessMove() {
        const m = this.currentMember;
        if (!m || m.health <= 0 || m.classId !== 'barbarian') return;
        if (m.level < BARBARIAN_HEROIC_DEEDS_UNLOCK_LEVEL) return;
        if ((m.heroicDeedTokens || 0) < 1) {
            this._addLog(`${m.name} has no Heroic Deed tokens!`);
            return;
        }
        const candidates = [...this.aliveHostileEnemies].sort(() => Math.random() - 0.5).slice(0, 4);
        if (candidates.length === 0) {
            this._addLog(`${m.name}: no enemies to knock back!`);
            return;
        }
        m.heroicDeedTokens--;
        this._emitTelemetry('abilityUsed', { member: m, abilityId: 'barbarian_reckless_move' });
        this._addLog(`💥 ${m.name} spends a Heroic Deed token — RECKLESS MOVE! (${m.heroicDeedTokens} tokens remaining)`);

        let dmg = this._rollPlayerMeleeDamage(m);
        dmg = this._applyOutgoingDamageBonuses(m, dmg, 'melee');
        const bfPct = this._getBloodFrenzyBonus(m, candidates[0]);
        if (bfPct > 0) dmg = Math.max(1, Math.round(dmg * (1 + bfPct)));

        for (const enemy of candidates) {
            if (enemy.health <= 0) continue;
            const eDef = ENEMY_TYPES[enemy.type] || {};
            const eTags = Array.isArray(eDef.tags) ? eDef.tags : [];
            const dealt = this._damageEnemy(enemy, dmg, false, false, 0, false, { contactAttacker: m });
            if (enemy.health <= 0) {
                this._addLog(`  💥 ${this._eName(enemy)} takes ${dealt} damage and is SLAIN!`);
                continue;
            }
            this._addLog(`  💥 ${this._eName(enemy)} takes ${dealt} damage!`);
            // Incorporeal and bosses immune to the knock effect (still take damage)
            if (eTags.includes('incorporeal') || enemy.isBoss || enemy.isMegaBoss) {
                this._addLog(`  🛡️ ${this._eName(enemy)} cannot be knocked back!`);
                continue;
            }
            // Level-based resist (same chance as stun resist)
            const levelResist = Math.min(0.90, (enemy.level || 1) * 0.01);
            if (Math.random() < levelResist) {
                this._addLog(`  ${this._eName(enemy)} resists the knockback!`);
                continue;
            }
            enemy.knocked = true;
            this._addLog(`  ${this._eName(enemy)} is knocked back and will lose their next turn!`);
        }
        this._notify();
    }

    /** Refreshing Mead — free action: restore 50% max HP + 50% max stamina, remove all negative effects. */
    barbarianRefreshingMead() {
        const m = this.currentMember;
        if (!m || m.health <= 0 || m.classId !== 'barbarian') return;
        if (m.level < BARBARIAN_HEROIC_DEEDS_UNLOCK_LEVEL) return;
        if ((m.heroicDeedTokens || 0) < 1) {
            this._addLog(`${m.name} has no Heroic Deed tokens!`);
            return;
        }
        m.heroicDeedTokens--;
        this._emitTelemetry('abilityUsed', { member: m, abilityId: 'barbarian_refreshing_mead' });
        const hpGain = Math.floor(m.maxHealth * 0.5);
        const stGain = Math.floor(m.maxStamina * 0.5);
        m.health   = Math.min(m.maxHealth,   m.health   + hpGain);
        m.stamina  = Math.min(m.maxStamina,  m.stamina  + stGain);
        // Remove all negative effects and status ailments
        const negativeTypes = new Set([
            'burn', 'poison', 'bleed', 'acid', 'wither', 'necrotic_curse',
            'hag_curse', 'taunted', 'hex', 'quasit_poison', 'entangled', 'held',
            'charm_dominated', 'ghost_fear', 'battle_horn_fear', 'demi_lich_fear',
            'petrified', 'held_web',
        ]);
        const before = (m.activeEffects || []).length;
        m.activeEffects = (m.activeEffects || []).filter(e => !e || !negativeTypes.has(e.type));
        m.stunned     = false;
        m.webbedRounds = 0;
        m.proneRounds  = 0;
        const cleared = before - m.activeEffects.length;
        const clearedStr = cleared > 0 ? `, cleared ${cleared} effect(s)` : '';
        this._addLog(`🍺 ${m.name} spends a Heroic Deed token — REFRESHING MEAD! +${hpGain} HP, +${stGain} ST${clearedStr}. (${m.heroicDeedTokens} tokens remaining)`);
        this._notify();
    }

    /** Battle Horn — free action: AoE sonic+psychic fear on all enemies (entire combat duration). */
    barbarianBattleHorn() {
        const m = this.currentMember;
        if (!m || m.health <= 0 || m.classId !== 'barbarian') return;
        if (m.level < BARBARIAN_HEROIC_DEEDS_UNLOCK_LEVEL) return;
        if ((m.heroicDeedTokens || 0) < 1) {
            this._addLog(`${m.name} has no Heroic Deed tokens!`);
            return;
        }
        m.heroicDeedTokens--;
        this._emitTelemetry('abilityUsed', { member: m, abilityId: 'barbarian_battle_horn' });
        const penalty = Math.floor(m.level / 3);
        const immuneTags = ['undead', 'construct', 'elemental', 'plant', 'incorporeal'];
        this._addLog(`📯 ${m.name} spends a Heroic Deed token — BATTLE HORN! (${m.heroicDeedTokens} tokens remaining)`);
        let feared = 0;
        for (const enemy of this.aliveHostileEnemies) {
            if (enemy.health <= 0) continue;
            const eDef = ENEMY_TYPES[enemy.type] || {};
            const eTags = Array.isArray(eDef.tags) ? eDef.tags : [];
            if (immuneTags.some(t => eTags.includes(t))) continue;
            if (Math.random() < 0.50) {
                this._addLog(`  🛡️ ${this._eName(enemy)} shrugs off the horn!`);
                continue;
            }
            const fearTypes = ['ghost_fear', 'battle_horn_fear', 'demi_lich_fear'];
            const existingFear = (enemy.activeEffects || []).find(x => x && fearTypes.includes(x.type));
            if (existingFear) {
                const existingPenalty = Math.abs(existingFear.damageBonus || 0);
                if (penalty > existingPenalty) {
                    // Battle horn is stronger — replace the weaker fear
                    enemy.activeEffects = enemy.activeEffects.filter(x => !x || !fearTypes.includes(x.type));
                    enemy.activeEffects.push({ type: 'battle_horn_fear', damageBonus: -penalty, defenseBonus: -penalty, rounds: 9999, permanent: true });
                    this._addLog(`  😨 ${this._eName(enemy)}'s fear is OVERWHELMED by the Battle Horn! (-${penalty} atk / -${penalty} def replaces -${existingPenalty})`);
                    feared++;
                } else {
                    // Existing fear is equal or stronger — refresh its duration
                    existingFear.rounds = 9999;
                    existingFear.permanent = true;
                    this._addLog(`  😨 ${this._eName(enemy)}'s existing fear (-${existingPenalty}) is reinforced by the Battle Horn!`);
                }
            } else {
                enemy.activeEffects = enemy.activeEffects || [];
                enemy.activeEffects.push({ type: 'battle_horn_fear', damageBonus: -penalty, defenseBonus: -penalty, rounds: 9999, permanent: true });
                this._addLog(`  😨 ${this._eName(enemy)} is TERRIFIED by the Battle Horn! (-${penalty} atk / -${penalty} def, until combat ends)`);
                feared++;
            }
        }
        if (feared === 0) this._addLog(`  No enemies were affected by the Battle Horn.`);
        this._notify();
    }

    /** Bard L30: Thunderous Drums — activate per-round sonic/psychic protection. */
    bardThunderousDrumsOn() {
        const m = this.currentMember;
        if (!m || m.health <= 0) return;
        if (m.classId !== 'bard') return;
        if (m.level < BARD_THUNDEROUS_DRUMS_UNLOCK_LEVEL) return;
        if (m.thunderousDrumsActive) {
            this._addLog(`🥁 ${m.name} is already beating the Thunderous Drums!`);
            return;
        }
        if (m.mana < BARD_THUNDEROUS_DRUMS_MANA_PER_ROUND) {
            this._addLog(`${m.name} needs at least ${BARD_THUNDEROUS_DRUMS_MANA_PER_ROUND} MP to start Thunderous Drums.`);
            return;
        }
        m.thunderousDrumsActive = true;
        this._emitTelemetry('abilityUsed', { member: m, abilityId: 'bard_thunderous_drums' });
        this._addLog(`🥁 ${m.name} begins beating the Thunderous Drums! Sonic and psychic attacks on the party are weakened.`);
        soundManager.playThunderousDrums();
        this._advancePlayerTurn();
    }

    /** Bard L30: Stop Thunderous Drums (free action). */
    bardThunderousDrumsOff() {
        const m = this.currentMember;
        if (!m || m.classId !== 'bard') return;
        if (!m.thunderousDrumsActive) return;
        m.thunderousDrumsActive = false;
        this._addLog(`🥁 ${m.name} stops the Thunderous Drums.`);
        this._notify();
    }

    /**
     * Rogue backstab — 3× stamina cost, 2× damage then +10%/level,
     * 5% + 1%/level instakill. Can be used from back row too.
     */
    backstab(targetEnemy) {
        const m = this.currentMember;
        if (!m || m.health <= 0) return;
        if (m.classId !== 'rogue') return;
        this._emitTelemetry('abilityUsed', { member: m, abilityId: 'backstab' });
        // Cannot backstab incorporeal enemies
        if (targetEnemy && targetEnemy.type) {
            const tDef = ENEMY_TYPES[targetEnemy.type] || {};
            const tTags = tDef.tags || [];
            if (tTags.includes('incorporeal')) {
                this._addLog(`🚫 ${m.name} cannot backstab the incorporeal ${this._eName(targetEnemy)}!`);
                return;
            }
            if (tTags.includes('slime')) {
                this._addLog(`🚫 ${m.name} cannot backstab the amorphous ${this._eName(targetEnemy)}!`);
                return;
            }
            // Cannot backstab a poltergeist — it phases unpredictably
            if (tDef.noBackstab) {
                this._addLog(`🚫 ${m.name} cannot backstab the elusive ${this._eName(targetEnemy)}!`);
                return;
            }
        }

        const cost = MELEE_STAMINA_COST * BACKSTAB_STAMINA_MULT;
        const exhausted = m.stamina < cost;
        m.stamina = Math.max(0, m.stamina - cost);

        // Shadow Step: ×2 backstab damage bonus while vanished
        const shadowMult = this._hasShadowStep(m) ? ROGUE_SHADOW_STEP_BACKSTAB_MULT : 1;
        const shadowSuffix = shadowMult > 1 ? ' [Shadow Step ×2]' : '';

        const instakillChance = BACKSTAB_INSTAKILL_CHANCE + m.getInstakillBonus();
        const bossImmune = !!(targetEnemy.isBoss || targetEnemy.isMegaBoss);
        const levelMult = 1 + BACKSTAB_DAMAGE_PER_LEVEL * Math.max(1, m.level);
        const twinFangsReady = targetEnemy.health > 0
            && m.level >= ROGUE_TWIN_FANGS_UNLOCK_LEVEL
            && m.hasOffhandMeleeWeapon();

        if (!bossImmune && Math.random() < instakillChance) {
            targetEnemy.health = 0;
            if (!targetEnemy._deathHandled) { targetEnemy._deathHandled = true; this._onEnemyDeath(targetEnemy); }
            this._addLog(`🗡️ ${m.name} BACKSTABS ${this._eName(targetEnemy)} — INSTANT KILL!${shadowSuffix}`);
            this._addLog(`${this._eName(targetEnemy)} is defeated!`);
            this._advancePlayerTurn();
            return;
        }
        if (bossImmune && Math.random() < instakillChance) {
            // Boss resists instant death — deal x4 pre-defense damage instead
            let bBase = this._rollPlayerMeleeDamage(m);
            if (exhausted) bBase = Math.max(1, Math.floor(bBase / 2));
            const bBossDmg = this._applyOutgoingDamageBonuses(m, Math.max(1, Math.round(bBase * BACKSTAB_DAMAGE_MULT * levelMult * 4 * shadowMult)), 'melee');
            const bBossDealt = this._damageEnemy(targetEnemy, bBossDmg, false, false, 0, false, { contactAttacker: m });
            this._addLog(`🗡️ ${m.name} scores a killing blow on ${this._eName(targetEnemy)} — Boss resists instant death! (×4 backstab: ${bBossDealt} damage)${shadowSuffix}`);
            this._applyWeaponRider(m, targetEnemy, bBossDealt);
            this._applyWeaponRider(m, targetEnemy, bBossDealt, 'offhand');
            if (targetEnemy.health <= 0) this._addLog(`${this._eName(targetEnemy)} is defeated!`);
            if (targetEnemy.health > 0 && twinFangsReady) {
                this._rogueTwinFangsOffhand(m, targetEnemy, levelMult, shadowMult, exhausted);
            }
            this._advancePlayerTurn();
            return;
        }

        let base = this._rollPlayerMeleeDamage(m);
        if (exhausted) base = Math.max(1, Math.floor(base / 2));
        // base × 2 × (1 + 0.10 × level) × shadowMult
        const dmg = this._applyOutgoingDamageBonuses(m, Math.max(1, Math.round(base * BACKSTAB_DAMAGE_MULT * levelMult * shadowMult)), 'melee');

        const dealt = this._damageEnemy(targetEnemy, dmg, false, false, 0, false, { contactAttacker: m });
        const suffix = (exhausted ? ' (exhausted!)' : '') + shadowSuffix;
        this._addLog(`🗡️ ${m.name} BACKSTABS ${this._eName(targetEnemy)} for ${dealt} damage!${suffix}`);
        this._applyWeaponRider(m, targetEnemy, dealt);
        this._applyWeaponRider(m, targetEnemy, dealt, 'offhand');
        if (targetEnemy.health <= 0) this._addLog(`${this._eName(targetEnemy)} is defeated!`);

        // L20+ Rogue: Backstab applies a bleed DoT (immune: undead, construct, elemental, incorporeal, plant)
        if (targetEnemy.health > 0 && m.level >= ROGUE_BACKSTAB_BLEED_UNLOCK_LEVEL && dealt > 0) {
            const tDef = ENEMY_TYPES[targetEnemy.type] || {};
            const tTags = tDef.tags || [];
            const bleedImmune = tTags.some(t => ['undead', 'construct', 'elemental', 'incorporeal', 'plant', 'slime'].includes(t));
            if (!bleedImmune) {
                const bleedDmg    = Math.max(1, Math.floor(dealt * ROGUE_BACKSTAB_BLEED_FRAC));
                const bleedRounds = Math.max(1, Math.floor(m.level / ROGUE_BACKSTAB_BLEED_DURATION_DIVISOR));
                if (!Array.isArray(targetEnemy.activeEffects)) targetEnemy.activeEffects = [];
                targetEnemy.activeEffects.push({ type: 'bleed', damage: bleedDmg, rounds: bleedRounds });
                this._addLog(`🟥 ${this._eName(targetEnemy)} bleeds from the backstab wound! (${bleedDmg}/rd, ${bleedRounds} rounds)`);
            }
        }

        // L30 Twin Fangs: second offhand strike
        if (targetEnemy.health > 0 && twinFangsReady) {
            this._rogueTwinFangsOffhand(m, targetEnemy, levelMult, shadowMult, exhausted);
        }

        this._advancePlayerTurn();
    }

    /**
     * L30 Twin Fangs — offhand follow-up strike.
     * 1.5× base backstab damage, half instakill chance, independent bleed.
     */
    _rogueTwinFangsOffhand(m, targetEnemy, levelMult, shadowMult, exhausted) {
        if (!targetEnemy || targetEnemy.health <= 0) return;
        const eName = this._eName(targetEnemy);
        this._addLog(`🗡️ ${m.name}'s Twin Fangs: offhand strike!`);

        const bossImmune = !!(targetEnemy.isBoss || targetEnemy.isMegaBoss);
        const ofInstakill = (BACKSTAB_INSTAKILL_CHANCE + m.getInstakillBonus()) * ROGUE_TWIN_FANGS_INSTAKILL_MULT;

        if (!bossImmune && Math.random() < ofInstakill) {
            targetEnemy.health = 0;
            if (!targetEnemy._deathHandled) { targetEnemy._deathHandled = true; this._onEnemyDeath(targetEnemy); }
            this._addLog(`🗡️ Twin Fangs offhand — INSTANT KILL!`);
            this._addLog(`${eName} is defeated!`);
            return;
        }
        if (bossImmune && Math.random() < ofInstakill) {
            // Boss resists: offhand ×4 damage (same rule as main hand)
            let bBase = randomInt(MELEE_DAMAGE_MIN, MELEE_DAMAGE_MAX);
            bBase += m.getOffhandWeaponPower();
            bBase += m.getClassDamageBonus('melee');
            bBase += this._getPartyMemberDamageMod(m);
            if (exhausted) bBase = Math.max(1, Math.floor(bBase / 2));
            bBase = Math.max(1, bBase);
            const bDmg = this._applyOutgoingDamageBonuses(m, Math.max(1, Math.round(bBase * ROGUE_TWIN_FANGS_OFFHAND_MULT * levelMult * shadowMult * 4)), 'melee');
            const bDealt = this._damageEnemy(targetEnemy, bDmg, false, false, 0, false, { contactAttacker: m });
            this._addLog(`🗡️ Twin Fangs boss — resists instant death! (×4 offhand: ${bDealt} damage)`);
            this._applyWeaponRider(m, targetEnemy, bDealt, 'offhand');
            if (targetEnemy.health <= 0) this._addLog(`${eName} is defeated!`);
            return;
        }

        // Normal offhand hit
        let ofBase = randomInt(MELEE_DAMAGE_MIN, MELEE_DAMAGE_MAX);
        ofBase += m.getOffhandWeaponPower();
        ofBase += m.getClassDamageBonus('melee');
        ofBase += this._getPartyMemberDamageMod(m);
        if (exhausted) ofBase = Math.max(1, Math.floor(ofBase / 2));
        ofBase = Math.max(1, ofBase);
        const ofDmg = this._applyOutgoingDamageBonuses(m, Math.max(1, Math.round(ofBase * ROGUE_TWIN_FANGS_OFFHAND_MULT * levelMult * shadowMult)), 'melee');
        const ofDealt = this._damageEnemy(targetEnemy, ofDmg, false, false, 0, false, { contactAttacker: m });
        this._addLog(`🗡️ Twin Fangs offhand strikes ${eName} for ${ofDealt} damage!`);
        this._applyWeaponRider(m, targetEnemy, ofDealt, 'offhand');
        if (targetEnemy.health <= 0) { this._addLog(`${eName} is defeated!`); return; }

        // Offhand bleed (L20+, independent DoT)
        if (m.level >= ROGUE_BACKSTAB_BLEED_UNLOCK_LEVEL && ofDealt > 0) {
            const tDef = ENEMY_TYPES[targetEnemy.type] || {};
            const tTags = tDef.tags || [];
            const bleedImmune = tTags.some(t => ['undead', 'construct', 'elemental', 'incorporeal', 'plant', 'slime'].includes(t));
            if (!bleedImmune) {
                const bleedDmg    = Math.max(1, Math.floor(ofDealt * ROGUE_BACKSTAB_BLEED_FRAC));
                const bleedRounds = Math.max(1, Math.floor(m.level / ROGUE_BACKSTAB_BLEED_DURATION_DIVISOR));
                if (!Array.isArray(targetEnemy.activeEffects)) targetEnemy.activeEffects = [];
                targetEnemy.activeEffects.push({ type: 'bleed', damage: bleedDmg, rounds: bleedRounds });
                this._addLog(`🟥 ${eName} bleeds from the offhand strike! (${bleedDmg}/rd, ${bleedRounds} rounds)`);
            }
        }
    }

    /**
     * L30 Rogue: Shadow Step — vanish for ROGUE_SHADOW_STEP_DURATION rounds.
     * Completely untargetable; backstab damage multiplied by ROGUE_SHADOW_STEP_BACKSTAB_MULT.
     * 1×/combat.
     */
    rogueShadowStep() {
        const m = this.currentMember;
        if (!m || m.health <= 0 || m.classId !== 'rogue') return;
        if (m.shadowStepUsed) {
            this._addLog(`🌑 ${m.name} has already used Shadow Step this combat!`);
            return;
        }
        if (m.stamina < ROGUE_SHADOW_STEP_STAMINA_COST) {
            this._addLog(`❌ ${m.name} doesn't have enough stamina for Shadow Step! (${ROGUE_SHADOW_STEP_STAMINA_COST} ST required)`);
            return;
        }
        m.stamina -= ROGUE_SHADOW_STEP_STAMINA_COST;
        m.shadowStepUsed = true;
        m.activeEffects = (m.activeEffects || []).filter(fx => fx.type !== 'shadow_step');
        m.activeEffects.push({ type: 'shadow_step', rounds: ROGUE_SHADOW_STEP_DURATION });
        this._addLog(`🌑 ${m.name} vanishes into the shadows! (untargetable for ${ROGUE_SHADOW_STEP_DURATION} rounds, ×${ROGUE_SHADOW_STEP_BACKSTAB_MULT} backstab — free action)`);
        this._notify();
    }

    /** Returns true if the party member is currently in Shadow Step (untargetable). */
    _hasShadowStep(m) {
        return !!(m && m.activeEffects && m.activeEffects.some(fx => fx.type === 'shadow_step' && (fx.rounds || 0) > 0));
    }

    rogueSetTrap() {
        const m = this.currentMember;
        if (!m || m.health <= 0) return;
        if (m.classId !== 'rogue' || m.level < ROGUE_TRAP_UNLOCK_LEVEL) return;

        if (!m.hasItem || !m.hasItem('captured_trap', 1)) {
            this._addLog(`🪤 ${m.name} has no recovered trap to spring.`);
            return;
        }

        const targets = this.aliveHostileEnemies;
        if (targets.length === 0) {
            this._addLog('🪤 There are no hostile monsters to trap.');
            return;
        }

        if (!m.removeItem('captured_trap', 1)) return;

        const isMastery = m.level >= ROGUE_TRAP_MASTERY_UNLOCK_LEVEL;
        const dmgMult   = isMastery ? 2 * ROGUE_TRAP_MASTERY_DAMAGE_MULT : 2;
        const dotRounds = ROGUE_TRAP_DOT_ROUNDS + (isMastery ? ROGUE_TRAP_MASTERY_EXTRA_ROUNDS : 0);

        const raw = this._applyOutgoingDamageBonuses(m, Math.max(1, Math.round(this._rollPlayerMeleeDamage(m) * dmgMult)), 'melee');
        this._addLog(`🪤 ${m.name} springs a recovered trap${isMastery ? ' (Trap Mastery!)' : ''} across the battlefield!`);
        for (const enemy of [...targets]) {
            if (!enemy || enemy.health <= 0) continue;
            const tags = this._getEnemyTags(enemy);
            if (tags.includes('incorporeal')) {
                this._addLog(`  ↪️ ${this._eName(enemy)} is incorporeal — the trap passes through harmlessly.`);
                continue;
            }
            const dealt = this._damageEnemy(enemy, raw);
            this._addLog(`  ↪️ ${this._eName(enemy)} takes ${dealt} melee trap damage!`);
            if (enemy.health > 0 && dealt > 0) {
                if (!Array.isArray(enemy.activeEffects)) enemy.activeEffects = [];
                const dotDamage = Math.max(1, Math.floor(dealt * ROGUE_TRAP_DOT_FRACTION));
                enemy.activeEffects.push({
                    type: 'rogue_trap_dot',
                    damage: dotDamage,
                    rounds: dotRounds,
                    rogueLevel: isMastery ? m.level : undefined,
                });
                this._addLog(`    🪤 Wounding mechanism: ${dotDamage}/round for ${dotRounds} rounds${isMastery ? ' + random effect each tick' : ''}.`);
            }
            if (enemy.health <= 0) this._addLog(`${this._eName(enemy)} is defeated!`);
        }

        this._advancePlayerTurn();
    }

    /**
     * L35 Trap Mastery: applies a random effect on each DoT tick.
     * Called from _tickEnemyEffects when fx.rogueLevel is set.
     */
    _applyTrapMasteryProc(enemy, rogueLevel) {
        const penalty = Math.floor(rogueLevel / ROGUE_TRAP_MASTERY_PENALTY_DIVISOR);
        const roll    = Math.floor(Math.random() * 4);
        const eName   = this._eName(enemy);
        if (roll === 0) {
            if (this._tryStunEnemy(enemy)) this._addLog(`🪤 Trap Mastery: ${eName} is stunned!`);
        } else if (roll === 1) {
            if (this._tryHoldEnemy(enemy)) this._addLog(`🪤 Trap Mastery: ${eName} is held!`);
        } else if (roll === 2) {
            if (!Array.isArray(enemy.activeEffects)) enemy.activeEffects = [];
            enemy.activeEffects.push({ type: 'trap_mastery_atk_pen', damageBonus: -penalty, rounds: 2 });
            this._addLog(`🪤 Trap Mastery: ${eName} suffers −${penalty} attack penalty!`);
        } else {
            if (!Array.isArray(enemy.activeEffects)) enemy.activeEffects = [];
            enemy.activeEffects.push({ type: 'trap_mastery_def_pen', defenseBonus: -penalty, rounds: 2 });
            this._addLog(`🪤 Trap Mastery: ${eName} suffers −${penalty} defense penalty!`);
        }
    }

    clericHeal(targetMember) {
        const m = this.currentMember;
        if (!m || m.health <= 0) return;
        if (m.classId !== 'cleric') return;
        if (!targetMember || targetMember.health <= 0) return;

        if (targetMember.isSummoned && !this._canReceiveLivingHealOrBuff(targetMember)) {
            this._addLog(`${m.name} cannot heal ${targetMember.name}.`);
            return;
        }
        if (m.mana < CLERIC_HEAL_MANA_COST) {
            this._addLog(`${m.name} has too little mana to cast Heal (needs ${CLERIC_HEAL_MANA_COST}).`);
            return;
        }

        m.mana -= CLERIC_HEAL_MANA_COST;

        // Mummy Rot blocks single-target healing (mass heal can still cleanse it)
        const hasRot = (targetMember.activeEffects || []).some(fx => fx && fx.type === 'mummy_rot' && (fx.permanent || fx.rounds > 0));
        if (hasRot) {
            this._addLog(`\ud83d\udfe4 ${targetMember.name}'s Mummy Rot suppresses ${m.name}'s healing!`);
            this._advancePlayerTurn();
            return;
        }

        const pct = CLERIC_HEAL_PERCENT + m.getHealPercentBonus();
        const amt = Math.max(1, Math.ceil(targetMember.maxHealth * pct));
        const before = targetMember.health;
        targetMember.health = Math.min(targetMember.maxHealth, targetMember.health + amt);
        const healed = targetMember.health - before;
        this._addLog(`\u2728 ${m.name} heals ${targetMember.name} for ${healed} HP!`);
        this._maybeTriggerClericCleanse(m, [targetMember]);

        this._advancePlayerTurn();
    }

    /**
     * Cleric Mass Heal (level 4+). Costs CLERIC_HEAL_MANA_COST mana and heals
     * every living party member for 50% of the normal single-target heal.
     */
    clericMassHeal() {
        const m = this.currentMember;
        if (!m || m.health <= 0) return;
        if (m.classId !== 'cleric') return;
        if (m.level < 4) {
            this._addLog(`${m.name} must be level 4 to cast Mass Heal.`);
            return;
        }
        if (m.mana < CLERIC_HEAL_MANA_COST) {
            this._addLog(`${m.name} has too little mana to cast Mass Heal (needs ${CLERIC_HEAL_MANA_COST}).`);
            return;
        }

        m.mana -= CLERIC_HEAL_MANA_COST;
        const pct = (CLERIC_HEAL_PERCENT + m.getHealPercentBonus()) * 0.5;
        const targets = this.aliveParty;
        let parts = [];
        for (const t of targets) {
            if (!this._canReceiveLivingHealOrBuff(t)) continue;
            const amt = Math.max(1, Math.ceil(t.maxHealth * pct));
            const before = t.health;
            t.health = Math.min(t.maxHealth, t.health + amt);
            parts.push(`${t.name} +${t.health - before}`);
        }
        this._addLog(`\u2728 ${m.name} calls down a Mass Heal! (${parts.join(', ')})`);
        this._maybeTriggerClericCleanse(m, targets.filter(t => this._canReceiveLivingHealOrBuff(t)));

        this._advancePlayerTurn();
    }

    /**
     * Cleric Turn Undead (level 6+). Costs CLERIC_TURN_UNDEAD_MANA_COST mana.
     * Deals 2× magic-attack damage to every undead enemy (ignores random-target
     * cap — hits ALL undead). Also debuffs their attack and defense.
     */
    clericTurnUndead() {
        const m = this.currentMember;
        if (!m || m.health <= 0) return;
        if (m.classId !== 'cleric') return;
        if (m.level < CLERIC_TURN_UNDEAD_MIN_LEVEL) {
            this._addLog(`${m.name} must be level ${CLERIC_TURN_UNDEAD_MIN_LEVEL} to Turn Undead.`);
            return;
        }
        if (m.mana < CLERIC_TURN_UNDEAD_MANA_COST) {
            this._addLog(`${m.name} has too little mana to Turn Undead (needs ${CLERIC_TURN_UNDEAD_MANA_COST}).`);
            return;
        }

        const undead = this.aliveHostileEnemies.filter(e => {
            const tags = (ENEMY_TYPES[e.type] || {}).tags || [];
            return tags.includes('undead');
        });

        if (undead.length === 0) {
            this._addLog(`\u271D\uFE0F ${m.name} raises the holy symbol — but there are no undead to turn!`);
            return;
        }

        m.mana -= CLERIC_TURN_UNDEAD_MANA_COST;

        let baseDmg = randomInt(MAGIC_DAMAGE_MIN, MAGIC_DAMAGE_MAX);
        baseDmg += m.getWeaponBonus('magic');
        baseDmg += m.getClassDamageBonus('magic');
        // 2× base damage, then ×(1 + 5% per cleric level)
        baseDmg = Math.max(1, Math.round(baseDmg * CLERIC_TURN_UNDEAD_DAMAGE_MULT * (1 + 0.05 * m.level)));

        const debuffMag = CLERIC_TURN_UNDEAD_DEBUFF_BASE + Math.floor(m.level / CLERIC_TURN_UNDEAD_DEBUFF_EVERY);
        const debuffRounds = 2 + Math.floor(m.level / CLERIC_TURN_UNDEAD_DEBUFF_EVERY);

        this._addLog(`\u271D\uFE0F ${m.name} channels divine power — holy light sears the undead!`);

        for (const e of undead) {
            const dealt = this._damageEnemy(e, baseDmg, /*ignoreDefense*/ true, /*isMagic*/ true);
            const eName = this._eName(e);
            this._addLog(`  \u2728 ${eName} takes ${dealt} holy damage!`);

            if (e.health > 0) {
                // Debuff attack and defense
                e.activeEffects = e.activeEffects || [];
                e.activeEffects = e.activeEffects.filter(x => x.type !== 'turned');
                e.activeEffects.push({
                    type: 'turned',
                    rounds: debuffRounds,
                    damageBonus: -debuffMag,
                    defenseBonus: -debuffMag,
                });
                this._addLog(`  ${eName} is turned! (-${debuffMag} atk/-${debuffMag} def for ${debuffRounds} rds)`);
            } else {
                this._addLog(`  ${eName} is destroyed!`);
            }
        }

        this._advancePlayerTurn();
    }

    /**
     * Phase 10 — Cleric Revive (level 3+). Costs CLERIC_REVIVE_MANA_COST mana
     * and brings a fallen ally back at CLERIC_REVIVE_HEAL_FRAC of max HP.
     * Cannot revive undead summons or living targets.
     */
    clericRevive(targetMember) {
        const m = this.currentMember;
        if (!m || m.health <= 0) return;
        if (m.classId !== 'cleric') return;
        if (m.level < CLERIC_REVIVE_MIN_LEVEL) {
            this._addLog(`${m.name} must be level ${CLERIC_REVIVE_MIN_LEVEL} to Revive.`);
            return;
        }
        if (!targetMember || targetMember.health > 0) {
            this._addLog(`${m.name} can only Revive a fallen ally.`);
            return;
        }
        if (targetMember.isSummoned) {
            this._addLog(`${m.name} cannot revive summoned creatures.`);
            return;
        }
        if (targetMember.lichPhial) {
            this._addLog(`${m.name}: ${targetMember.name}'s soul is sealed in a Phylactery \u2014 they will revive on their own!`);
            return;
        }
        if (m.mana < CLERIC_REVIVE_MANA_COST) {
            this._addLog(`${m.name} has too little mana to Revive (needs ${CLERIC_REVIVE_MANA_COST}).`);
            return;
        }
        m.mana -= CLERIC_REVIVE_MANA_COST;
        const amt = Math.max(1, Math.ceil(targetMember.maxHealth * CLERIC_REVIVE_HEAL_FRAC));
        targetMember.health = amt;
        targetMember.stunned = false;
        // Revive removes transient poison so the newly-revived ally isn't
        // killed again on their own turn.
        if (Array.isArray(targetMember.activeEffects)) {
            targetMember.activeEffects = targetMember.activeEffects.filter(
                e => e && e.type !== 'poison',
            );
        }
        this._addLog(`\u{1F54A}\uFE0F ${m.name} calls ${targetMember.name} back from the brink! (+${amt} HP)`);
        this._advancePlayerTurn();
    }

    // ═══════════════════════════════════════════════════════════════
    // CLERIC L20 SPECIALS — Mass Regen  &  Mass Revive
    // ═══════════════════════════════════════════════════════════════

    /**
     * Cleric L20: Mass Regeneration.
     * Costs CLERIC_MASS_REGEN_MANA_COST MP.
        * Applies a combat HoT to every living non-golem non-undead non-demi-lich party member:
     *   healPct = CLERIC_MASS_REGEN_BASE_PCT + floor(clericLevel/3) × CLERIC_MASS_REGEN_PER_3_LEVELS
     * Duration  = floor(clericLevel / 4) rounds  (5 rounds at L20).
     * The HoT ticks at the start of every new round via _tickPartyEffects().
     */
    clericMassRegen() {
        const m = this.currentMember;
        if (!m || m.health <= 0 || m.classId !== 'cleric') return;
        if (m.level < CLERIC_MASS_REGEN_UNLOCK_LEVEL) {
            this._addLog(`${m.name} must be level ${CLERIC_MASS_REGEN_UNLOCK_LEVEL} to cast Mass Regeneration.`);
            return;
        }
        if (m.mana < CLERIC_MASS_REGEN_MANA_COST) {
            this._addLog(`${m.name} needs ${CLERIC_MASS_REGEN_MANA_COST} MP for Mass Regeneration.`);
            return;
        }

        m.mana -= CLERIC_MASS_REGEN_MANA_COST;
        this._emitTelemetry('abilityUsed', { member: m, abilityId: 'cleric_mass_regen' });

        const healPct  = CLERIC_MASS_REGEN_BASE_PCT + Math.floor(m.level / 3) * CLERIC_MASS_REGEN_PER_3_LEVELS;
        const duration = Math.max(1, Math.floor(m.level / 4));   // floor(level/4) rounds

        const eligible = this.party.filter(t =>
            this._canReceiveLivingHealOrBuff(t)
        );

        for (const t of eligible) {
            // Replace any existing mass_regen effect (refresh, don't stack).
            t.activeEffects = (t.activeEffects || []).filter(e => e.type !== 'combat_regen');
            t.activeEffects.push({ type: 'combat_regen', rounds: duration, healPct });
        }

        const pctStr = Math.round(healPct * 100);
        this._addLog(`✨ ${m.name} channels divine renewal — ${eligible.length} allies regenerate ${pctStr}% HP/round for ${duration} rounds!`);
        this._advancePlayerTurn();
    }

    /**
     * Cleric L20: Mass Revive.
     * Costs CLERIC_MASS_REVIVE_MANA_COST MP.
     * Revives floor(clericLevel / CLERIC_MASS_REVIVE_COUNT_DIVISOR) fallen non-summoned allies.
     * Each is restored to (CLERIC_MASS_REVIVE_HEAL_BASE + floor(level/3) × PER_3_LV) of max HP.
     * Targets are chosen automatically (first N fallen in party order).
     */
    clericMassRevive() {
        const m = this.currentMember;
        if (!m || m.health <= 0 || m.classId !== 'cleric') return;
        if (m.level < CLERIC_MASS_REVIVE_UNLOCK_LEVEL) {
            this._addLog(`${m.name} must be level ${CLERIC_MASS_REVIVE_UNLOCK_LEVEL} to cast Mass Revive.`);
            return;
        }
        if (m.mana < CLERIC_MASS_REVIVE_MANA_COST) {
            this._addLog(`${m.name} needs ${CLERIC_MASS_REVIVE_MANA_COST} MP for Mass Revive.`);
            return;
        }

        const fallen = this.party.filter(p => !p.isSummoned && p.health <= 0 && !p.lichPhial);
        if (fallen.length === 0) {
            this._addLog(`${m.name}: No fallen allies to revive (any Phylactery-bound members will revive on their own).`);
            this._advancePlayerTurn();
            return;
        }

        const count    = Math.max(1, Math.floor(m.level / CLERIC_MASS_REVIVE_COUNT_DIVISOR));
        const healFrac = CLERIC_MASS_REVIVE_HEAL_BASE
            + Math.floor(m.level / 3) * CLERIC_MASS_REVIVE_HEAL_PER_3LV;
        const toRevive = fallen.slice(0, count);

        m.mana -= CLERIC_MASS_REVIVE_MANA_COST;
        this._emitTelemetry('abilityUsed', { member: m, abilityId: 'cleric_mass_revive' });

        const parts = [];
        for (const t of toRevive) {
            const amt = Math.max(1, Math.ceil(t.maxHealth * healFrac));
            t.health  = amt;
            t.stunned = false;
            if (Array.isArray(t.activeEffects)) {
                t.activeEffects = t.activeEffects.filter(e => e && e.type !== 'poison');
            }
            parts.push(`${t.name} +${amt} HP`);
        }

        const pctStr = Math.round(healFrac * 100);
        this._addLog(`✨ ${m.name} invokes divine mercy — ${toRevive.length} fallen ally/allies revived at ${pctStr}% HP! (${parts.join(', ')})`);
        this._advancePlayerTurn();
    }

    // ═══════════════════════════════════════════════════════════════
    // CLERIC L30 SPECIALS — Spiritual Weapon  &  Banishment
    // ═══════════════════════════════════════════════════════════════

    /**
     * Fire all of m's spiritual weapons: deduct upkeep (3 MP each), fade weapons
     * that can no longer be afforded, then fire floor(level/8) attacks per weapon.
     * Called automatically by _advancePlayerTurn() whenever a cleric ends their turn.
     */
    _processSpiritualWeapons(cleric) {
        if (!cleric || cleric.health <= 0 || !cleric.spiritualWeapons || cleric.spiritualWeapons.length === 0) return;

        // Deduct upkeep FIFO — first summoned weapons are maintained first.
        const surviving = [];
        for (const w of cleric.spiritualWeapons) {
            if (cleric.mana >= CLERIC_SPIRITUAL_WEAPON_UPKEEP) {
                cleric.mana -= CLERIC_SPIRITUAL_WEAPON_UPKEEP;
                surviving.push(w);
            } else {
                this._addLog(`✨ ${cleric.name}'s Spiritual Weapon dissipates — insufficient mana!`);
            }
        }
        cleric.spiritualWeapons = surviving;
        if (surviving.length === 0) return;

        const attacksPerWeapon = Math.max(1, Math.floor((cleric.level || 1) / CLERIC_SPIRITUAL_WEAPON_ATK_DIVISOR));
        const hostile = this.aliveHostileEnemies;
        if (hostile.length === 0) return;

        for (const _w of surviving) {
            for (let i = 0; i < attacksPerWeapon; i++) {
                const alive = this.aliveHostileEnemies;
                if (alive.length === 0) return;
                const target = alive[Math.floor(Math.random() * alive.length)];

                // Damage = melee roll + magic class bonus + cleric level% bonus, then outgoing bonuses
                let dmg = this._rollPlayerMeleeDamage(cleric);
                dmg += cleric.getClassDamageBonus('magic');
                dmg = Math.max(1, Math.round(dmg * (1 + (cleric.level || 1) / 100)));
                dmg = this._applyOutgoingDamageBonuses(cleric, dmg, 'ranged');

                // Force magic: isMagic=true (skips physResist/shieldBlock/displace/remorhaz), isRanged=true
                const dealt = this._damageEnemy(target, dmg, false, true, 0, true);
                this._addLog(`⚔️ ${cleric.name}'s Spiritual Weapon strikes ${this._eName(target)} for ${dealt} force damage!`);
                if (target.health <= 0) this._addLog(`${this._eName(target)} is destroyed by divine force!`);
            }
        }
    }

    /**
     * Cleric L30: Summon Spiritual Weapon.
     * Costs CLERIC_SPIRITUAL_WEAPON_SUMMON_COST MP. Adds one weapon to the cleric's
     * spiritualWeapons array. Multiple weapons may be active simultaneously.
     * The new weapon fires immediately (via _processSpiritualWeapons in _advancePlayerTurn).
     * Weapons disappear if the cleric dies or at combat end.
     */
    clericSummonSpiritualWeapon() {
        const m = this.currentMember;
        if (!m || m.health <= 0 || m.classId !== 'cleric') return;
        if (m.level < CLERIC_SPIRITUAL_WEAPON_UNLOCK_LEVEL) {
            this._addLog(`${m.name} must be level ${CLERIC_SPIRITUAL_WEAPON_UNLOCK_LEVEL} to summon a Spiritual Weapon.`);
            return;
        }
        if (m.mana < CLERIC_SPIRITUAL_WEAPON_SUMMON_COST) {
            this._addLog(`${m.name} needs ${CLERIC_SPIRITUAL_WEAPON_SUMMON_COST} MP to summon a Spiritual Weapon.`);
            return;
        }
        m.mana -= CLERIC_SPIRITUAL_WEAPON_SUMMON_COST;
        m.spiritualWeapons = m.spiritualWeapons || [];
        const weaponId = 'sw_' + Date.now().toString(36) + '_' + Math.random().toString(36).slice(2, 5);
        m.spiritualWeapons.push({ id: weaponId });
        const count = m.spiritualWeapons.length;
        const atkCount = Math.max(1, Math.floor((m.level || 1) / CLERIC_SPIRITUAL_WEAPON_ATK_DIVISOR));
        this._addLog(`⚔️ ${m.name} summons a Spiritual Weapon! (${count} active, ${atkCount} attack${atkCount !== 1 ? 's' : ''}/round, ${CLERIC_SPIRITUAL_WEAPON_UPKEEP} MP/round upkeep)`);
        this._advancePlayerTurn();
    }

    _rollClericBanishmentDamage(cleric) {
        let dmg = randomInt(MAGIC_DAMAGE_MIN, MAGIC_DAMAGE_MAX);
        dmg += cleric.getWeaponBonus('magic');
        dmg += cleric.getClassDamageBonus('magic');
        dmg += this._getPartyMemberDamageMod(cleric);
        dmg = Math.max(1, Math.round(dmg * (cleric.getMagicDamageMultiplier?.() || 1)));
        dmg = this._applyOutgoingDamageBonuses(cleric, dmg, 'magic');
        let total = Math.max(1, Math.floor(dmg * CLERIC_BANISHMENT_DAMAGE_MULT));
        if ((cleric.level || 1) >= CLERIC_L35_UNLOCK_LEVEL) {
            total = Math.max(1, Math.floor(total * (1 + (cleric.level || 1) / 100)));
        }
        return total;
    }

    _resolveClericBanishmentTarget(cleric, targetEnemy, isAoe = false) {
        const eName = this._eName(targetEnemy);
        const isBoss = !!(targetEnemy.isBoss || targetEnemy.isMegaBoss || targetEnemy.isSuperBoss);
        const banishRoll = !isBoss && Math.random() < Math.min(1, (cleric.level || 1) / 100);
        if (banishRoll) {
            targetEnemy.health = 0;
            if (!targetEnemy._deathHandled) { targetEnemy._deathHandled = true; this._onEnemyDeath(targetEnemy); }
            this._addLog(`✨ ${eName} is BANISHED from existence!`);
            return;
        }
        const totalDmg = this._rollClericBanishmentDamage(cleric);
        const dealt = this._damageEnemy(targetEnemy, totalDmg, true, true);
        const aoeNote = isAoe ? 'AoE ' : '';
        if (isBoss) {
            this._addLog(`✨ ${eName} resists ${aoeNote}Banishment's annihilation but is blasted for ${dealt} holy force damage!`);
        } else {
            this._addLog(`✨ ${eName} withstands ${aoeNote}Banishment but suffers ${dealt} holy force damage!`);
        }
        if (targetEnemy.health <= 0) this._addLog(`${eName} is obliterated by divine force!`);
    }

    /**
     * Cleric L30/L35: Banishment.
     * L30: single target. L35: upgraded to AoE across all valid targets.
     */
    clericBanishment(targetEnemy = null) {
        const m = this.currentMember;
        if (!m || m.health <= 0 || m.classId !== 'cleric') return;
        this._emitTelemetry('abilityUsed', { member: m, abilityId: 'cleric_banishment' });
        if (m.level < CLERIC_BANISHMENT_UNLOCK_LEVEL) {
            this._addLog(`${m.name} must be level ${CLERIC_BANISHMENT_UNLOCK_LEVEL} to cast Banishment.`);
            return;
        }
        if (m.mana < CLERIC_BANISHMENT_MANA_COST) {
            this._addLog(`${m.name} needs ${CLERIC_BANISHMENT_MANA_COST} MP to cast Banishment.`);
            return;
        }

        const validTargets = this.aliveHostileEnemies.filter(e =>
            CLERIC_BANISHMENT_TAGS.some(t => this._getEnemyTags(e).includes(t)));
        if ((m.level || 1) >= CLERIC_L35_UNLOCK_LEVEL) {
            if (validTargets.length === 0) {
                this._addLog(`${m.name}: AoE Banishment finds no elementals or demons!`);
                return;
            }
            m.mana -= CLERIC_BANISHMENT_MANA_COST;
            this._addLog(`✨ ${m.name} invokes AOE Banishment over ${validTargets.length} extraplanar foe${validTargets.length !== 1 ? 's' : ''}! (+${m.level}% damage on survivors)`);
            for (const target of validTargets.slice()) {
                if (target.health > 0) this._resolveClericBanishmentTarget(m, target, true);
            }
        } else {
            if (!targetEnemy || targetEnemy.health <= 0) return;
            const tTags = this._getEnemyTags(targetEnemy);
            const isValidTarget = CLERIC_BANISHMENT_TAGS.some(t => tTags.includes(t));
            if (!isValidTarget) {
                this._addLog(`${m.name}: Banishment only affects elementals and demons!`);
                return;
            }
            m.mana -= CLERIC_BANISHMENT_MANA_COST;
            this._addLog(`✨ ${m.name} invokes Banishment against ${this._eName(targetEnemy)}!`);
            this._resolveClericBanishmentTarget(m, targetEnemy, false);
        }
        this._advancePlayerTurn();
    }

    clericDivineShroudToggle() {
        const m = this.currentMember;
        if (!m || m.health <= 0 || m.classId !== 'cleric' || (m.level || 1) < CLERIC_L35_UNLOCK_LEVEL) return;
        if (m.divineShroudActive) {
            m.divineShroudActive = false;
            this._addLog(`✨ ${m.name} lowers Divine Shroud.`);
            this._notify();
            return;
        }
        if (m.mana < CLERIC_DIVINE_SHROUD_MANA_PER_ROUND) {
            this._addLog(`${m.name} needs ${CLERIC_DIVINE_SHROUD_MANA_PER_ROUND} MP to invoke Divine Shroud.`);
            return;
        }
        m.divineShroudActive = true;
        this._addLog(`✨ ${m.name} invokes Divine Shroud! (${Math.round(this._getDivineShroudReduction(m) * 100)}% all-source damage reduction, ${CLERIC_DIVINE_SHROUD_MANA_PER_ROUND} MP/round)`);
        this._notify();
    }

    // ═══════════════════════════════════════════════════════════════
    // PALADIN L20 SPECIALS — Revive  &  AoE Smite
    // ═══════════════════════════════════════════════════════════════

    /**
     * Paladin L20: Revive — mirrors clericRevive at same mana cost / heal fraction.
     * Unlocked at PALADIN_L20_UNLOCK_LEVEL.
     */
    paladinRevive(targetMember) {
        const m = this.currentMember;
        if (!m || m.health <= 0 || m.classId !== 'paladin') return;
        if (m.level < PALADIN_L20_UNLOCK_LEVEL) {
            this._addLog(`${m.name} must be level ${PALADIN_L20_UNLOCK_LEVEL} to use Revive.`);
            return;
        }
        if (!targetMember || targetMember.health > 0) {
            this._addLog(`${m.name} can only Revive a fallen ally.`);
            return;
        }
        if (targetMember.isSummoned) {
            this._addLog(`${m.name} cannot revive summoned creatures.`);
            return;
        }
        if (targetMember.lichPhial) {
            this._addLog(`${m.name}: ${targetMember.name}'s soul is held in a Phylactery — divine power cannot reach them there!`);
            return;
        }
        if (m.mana < CLERIC_REVIVE_MANA_COST) {
            this._addLog(`${m.name} needs ${CLERIC_REVIVE_MANA_COST} MP to Revive.`);
            return;
        }
        m.mana -= CLERIC_REVIVE_MANA_COST;
        const amt = Math.max(1, Math.ceil(targetMember.maxHealth * CLERIC_REVIVE_HEAL_FRAC));
        targetMember.health  = amt;
        targetMember.stunned = false;
        if (Array.isArray(targetMember.activeEffects)) {
            targetMember.activeEffects = targetMember.activeEffects.filter(
                e => e && e.type !== 'poison',
            );
        }
        this._addLog(`\u{1F54A}️ ${m.name} reaches across the veil — ${targetMember.name} is restored! (+${amt} HP)`);
        this._advancePlayerTurn();
    }

    /**
     * Paladin L20: AoE Smite.
     * Costs PALADIN_SMITE_MANA_COST × PALADIN_AOE_SMITE_MANA_MULT mana.
     * Hits EVERY alive undead/demon enemy for half normal smite damage,
     * with half the normal instakill (purge) chance.
     * Requires front row.
     */
    paladinAoeSmite() {
        const m = this.currentMember;
        if (!m || m.health <= 0 || m.classId !== 'paladin') return;
        if (m.level < PALADIN_L20_UNLOCK_LEVEL) return;
        if (!this.canMelee(m)) {
            this._addLog(`${m.name} cannot AoE Smite from the back row!`);
            return;
        }

        const aoeCost = PALADIN_SMITE_MANA_COST * PALADIN_AOE_SMITE_MANA_MULT;
        if (m.mana < aoeCost) {
            this._addLog(`${m.name} needs ${aoeCost} MP for AoE Smite.`);
            return;
        }

        const smitableEnemies = this.aliveHostileEnemies.filter(e => this.canPaladinSmiteTarget(m, e));

        if (smitableEnemies.length === 0) {
            this._addLog(`✨ ${m.name} calls down holy light — but there are no valid targets for AoE Smite!`);
            return;
        }

        m.mana -= aoeCost;
        this._emitTelemetry('abilityUsed', { member: m, abilityId: 'paladin_aoe_smite' });
        const dragonslayerNote = m.level >= PALADIN_DRAGONSLAYER_UNLOCK_LEVEL && m.dragonslayerActive
            ? ' Dragonslayer widens the nova to dragons as well!'
            : '';
        this._addLog(`✨ ${m.name} releases a holy nova — smiting every marked foe in sight!${dragonslayerNote}`);

        // Purge chance computed per-target below (capped at 50%, x1/3 mult).
        for (const target of smitableEnemies.slice()) {
            if (target.health <= 0) continue;
            const eName = this._eName(target);

                        // 1/3 purge chance (base capped at 50%)
            const aoePurge = Math.min(PALADIN_SMITE_INSTAKILL_CAP,
                PALADIN_SMITE_INSTAKILL_BASE + PALADIN_SMITE_INSTAKILL_PER_LEVEL * m.level)
                * PALADIN_AOE_SMITE_INSTAKILL_MULT;
            if (Math.random() < aoePurge) {
                if (target.isBoss || target.isMegaBoss) {
                    // Bosses resist instant death — take x4 AoE smite damage instead
                    let bossDmg = this._rollPlayerMeleeDamage(m);
                    bossDmg += 2 * m.level;
                    bossDmg *= (2 + 0.10 * m.level);
                    bossDmg  = Math.floor(bossDmg * PALADIN_AOE_SMITE_DAMAGE_MULT * PALADIN_SMITE_BOSS_DAMAGE_MULT * PALADIN_SMITE_DAMAGE_BONUS_MULT);
                    bossDmg = this._applyOutgoingDamageBonuses(m, bossDmg, 'aoe');
                    const bossCrit = this._maybeMountedSmiteCrit(m, bossDmg);
                    bossDmg = bossCrit.damage;
                    const bossDealt = this._damageEnemy(target, Math.max(1, bossDmg));
                    this._addLog(`✨ ${eName} resists the holy nova instant-kill! (x4 AoE smite: ${bossDealt} damage)${bossCrit.crit ? ' 💥 MOUNTED CRIT!' : ''}`);
                    if (target.health <= 0) this._addLog(`${eName} is defeated!`);
                    if (this.aliveEnemies.length === 0) break;
                    continue;
                }
                target.health = 0;
                if (!target._deathHandled) { target._deathHandled = true; this._onEnemyDeath(target); }
                this._addLog(`✨ ${eName} is purged by the holy nova!`);
                if (this.aliveEnemies.length === 0) break;
                continue;
            }

            // 1/3 smite damage (no armor-ignore; uses _damageEnemy for defence)
            let dmg = this._rollPlayerMeleeDamage(m);
            dmg    += 2 * m.level;                     // paladin holy bonus
            dmg    *= (2 + 0.10 * m.level);            // smite scaling
            dmg     = Math.floor(dmg * PALADIN_AOE_SMITE_DAMAGE_MULT * PALADIN_SMITE_DAMAGE_BONUS_MULT);
            dmg = this._applyOutgoingDamageBonuses(m, dmg, 'aoe');
            const smiteCrit = this._maybeMountedSmiteCrit(m, dmg);
            dmg = smiteCrit.damage;
            const dealt = this._damageEnemy(target, Math.max(1, dmg));
            this._addLog(`✨ ${eName} is scorched by the holy nova for ${dealt}!${smiteCrit.crit ? ' 💥 MOUNTED CRIT!' : ''}`);
            if (target.health <= 0) this._addLog(`${eName} is defeated!`);
        }

        this._advancePlayerTurn();
    }

    // ═══════════════════════════════════════════════════════════════
    // MONK L20 SPECIAL — Quivering Palm
    // ═══════════════════════════════════════════════════════════════

    /**
     * Monk L20: Quivering Palm.
     * A single-target melee strike (costs ST + MP like normal monk melee, front row only).
     * Deals 2× the base melee roll as direct damage.
     * Applies a doubling internal DoT:
     *   - Initial tick damage = base melee roll (pre-doubled)
     *   - Damage doubles each round (bypasses enemy defence — internal disruption)
     *   - Duration = MONK_QUIVERING_PALM_DURATION_BASE + floor((monkLevel-20)/10) rounds
        * Each monk tracks their own Quivering Palm effect on each target:
        *   - Multiple monks can each maintain one separate QP DoT on the same target.
        *   - Recasting by the same monk refreshes only that monk's own effect
        *     (+1 round, capped at min(floor(highestMonkLevel / STACK_CAP_DIVISOR), STACK_CAP_MAX)).
     */
    monkQuiveringPalm(targetEnemy) {
        const m = this.currentMember;
        if (!m || m.health <= 0 || m.classId !== 'monk') return;
        if (m.level < MONK_QUIVERING_PALM_UNLOCK_LEVEL) return;
        this._emitTelemetry('abilityUsed', { member: m, abilityId: 'monk_quivering_palm' });
        if (!this.canMelee(m)) {
            this._addLog(`${m.name} cannot use Quivering Palm from the back row!`);
            return;
        }
        if (!targetEnemy || targetEnemy.health <= 0) return;
        const staminaCost = MELEE_STAMINA_COST * MONK_QUIVERING_PALM_STAMINA_MULT;
        const manaCost = MONK_MELEE_MANA_COST * MONK_QUIVERING_PALM_MANA_MULT;

        if (m.stamina < staminaCost) {
            this._addLog(`${m.name} does not have enough stamina for Quivering Palm.`);
            return;
        }
        if (m.mana < manaCost) {
            this._addLog(`${m.name} does not have enough mana for Quivering Palm.`);
            return;
        }

        m.stamina -= staminaCost;
        m.mana    -= manaCost;

        const base = this._rollPlayerMeleeDamage(m);  // unmodified melee roll
        const eName = this._eName(targetEnemy);

        // Strike multiplier = 2 + level/100 (e.g. L30 → ×2.3, L100 → ×3.0)
        const qpMult = 2 + (m.level / 100);
        const dealt = this._damageEnemy(targetEnemy, this._applyOutgoingDamageBonuses(m, Math.round(base * qpMult), 'melee'), false, false, 0, false, { contactAttacker: m });
        this._addLog(`✋ ${m.name} strikes ${eName} with the Quivering Palm for ${dealt} damage! (×${qpMult.toFixed(1)})`);

        if (targetEnemy.health > 0) {
            // Duration for this cast
            const newDur = MONK_QUIVERING_PALM_DURATION_BASE
                + Math.floor(Math.max(0, m.level - MONK_QUIVERING_PALM_UNLOCK_LEVEL)
                    / 10) * MONK_QUIVERING_PALM_DURATION_PER_10LV;

            // Highest-level living monk in party (for stack cap)
            const maxMonkLv = this.party.reduce((best, p) =>
                (p.classId === 'monk' && p.health > 0 && p.level > best) ? p.level : best, 0);
            const stackCap  = Math.min(
                Math.floor(maxMonkLv / MONK_QUIVERING_PALM_STACK_CAP_DIVISOR),
                MONK_QUIVERING_PALM_STACK_CAP_MAX,
            );

            targetEnemy.activeEffects = targetEnemy.activeEffects || [];
            const existing = targetEnemy.activeEffects.find(e =>
                e
                && e.type === 'quivering_palm'
                && (e.sourceId === m.id || (!e.sourceId && e.sourceName === m.name)));

            if (existing && existing.rounds > 0) {
                // Refresh only this monk's own Quivering Palm: +1 round, capped.
                existing.rounds = Math.min(existing.rounds + 1, stackCap);
                this._addLog(`✋ Quivering Palm refreshed on ${eName}! (${existing.rounds} rds, ${existing.damage} dmg/rd ×${(existing.mult || 2).toFixed(1)})`);
            } else {
                // Fresh application for this monk (other monks' QP effects remain).
                targetEnemy.activeEffects = targetEnemy.activeEffects.filter(e => !(
                    e
                    && e.type === 'quivering_palm'
                    && (e.sourceId === m.id || (!e.sourceId && e.sourceName === m.name))
                ));
                targetEnemy.activeEffects.push({
                    type:      'quivering_palm',
                    sourceId:  m.id,
                    sourceName: m.name,
                    rounds:    newDur,
                    damage:    base,     // starts at base roll; multiplied each tick
                    mult:      qpMult,   // ×(2 + level/100) per round; replaces fixed doubling
                    doublings: 0,        // tracks how many multiplications (cap 10)
                });
                this._addLog(`✋ ${eName} is afflicted by the Quivering Palm! (${base} internal dmg/rd, ×${qpMult.toFixed(1)} per rd, ${newDur} rds)`);
            }

            // ── Pressure Points (L30+): -1 defense per QP application; immune: undead/incorporeal/elemental/construct
            if (m.level >= MONK_KI_UNLOCK_LEVEL) {
                const ppTags = this._getEnemyTags(targetEnemy);
                const ppImmune = ['undead', 'incorporeal', 'elemental', 'construct'].some(t => ppTags.includes(t));
                if (!ppImmune) {
                    const ppFx = targetEnemy.activeEffects.find(e => e && e.type === 'pressure_points');
                    if (ppFx) {
                        ppFx.defenseBonus -= 1;
                        this._addLog(`✋ Pressure Points deepen on ${eName}! (${ppFx.defenseBonus} defense)`);
                    } else {
                        targetEnemy.activeEffects.push({ type: 'pressure_points', sourceId: m.id, defenseBonus: -1 });
                        this._addLog(`✋ Pressure Points applied to ${eName}! (-1 defense)`);
                    }
                }
            }
        } else {
            this._addLog(`${eName} is defeated!`);
        }

        this._advancePlayerTurn();
    }

    _tryTripEnemy(enemy, monk) {
        if (!enemy || enemy.health <= 0) return false;
        const eName = this._eName(enemy);
        const def = ENEMY_TYPES[enemy.type] || {};
        const tags = Array.isArray(def.tags) ? def.tags : [];
        const immune = Array.isArray(def.immune) ? def.immune : [];
        if (tags.includes('incorporeal')) {
            this._addLog(`⏬ ${eName} has no solid body to trip — incorporeal immunity.`);
            return false;
        }
        if (tags.includes('vermin')) {
            this._addLog(`⏬ ${eName} cannot be tripped — vermin are too small, many-legged, flying, or slithery.`);
            return false;
        }
        if (tags.includes('slime') || immune.includes('hold')) {
            this._addLog(`⏬ ${eName} cannot be tripped — its blobby body ignores hold-style trips.`);
            return false;
        }
        if (tags.includes('dragon')) {
            this._addLog(`⏬ ${eName} cannot be tripped — dragons have flight, bulk, and too many points of balance.`);
            return false;
        }
        if (enemy.isSuperBoss) {
            this._addLog(`\u{1F7E3} ${eName} cannot be tripped!`);
            return false;
        }
        if (enemy.isMegaBoss || enemy.isBoss) {
            this._addLog(`\u{1F451} ${eName} is too powerful to be tripped!`);
            return false;
        }
        if ((enemy.stunImmuneRounds || 0) > 0) {
            this._addLog(`⏬ ${eName} has recovered its footing too recently to be tripped again.`);
            return false;
        }
        if (tags.includes('beast') && Math.random() < 0.50) {
            this._addLog(`⏬ ${eName}'s beastly stance absorbs the sweep — many beasts have extra legs or low balance.`);
            return false;
        }
        const levelResist = Math.min(0.90, (enemy.level || 1) * 0.01);
        if (levelResist > 0 && Math.random() < levelResist) {
            this._addLog(`⏬ ${eName} keeps its footing — hold resisted!`);
            return false;
        }
        enemy.proneRounds = Math.max(enemy.proneRounds || 0, 1);
        return true;
    }

    monkKickTrip(targetEnemy) {
        const m = this.currentMember;
        if (!m || m.health <= 0 || m.classId !== 'monk') return;
        if ((m.level || 1) < MONK_L35_UNLOCK_LEVEL) return;
        if (!this.canMelee(m)) {
            this._addLog(`${m.name} cannot Kick Trip from the back row!`);
            return;
        }
        if (!targetEnemy || targetEnemy.health <= 0) return;
        if (m.stamina < MELEE_STAMINA_COST) {
            this._addLog(`${m.name} does not have enough stamina for Kick Trip.`);
            return;
        }
        if (m.mana < MONK_MELEE_MANA_COST) {
            this._addLog(`${m.name} does not have enough mana for Kick Trip.`);
            return;
        }

        m.stamina = Math.max(0, m.stamina - MELEE_STAMINA_COST);
        m.mana = Math.max(0, m.mana - MONK_MELEE_MANA_COST);

        const kicks = Math.max(1, Math.floor((m.level || 1) / MONK_KICK_TRIP_ATTACK_DIVISOR));
        const dmgMult = 1 + MONK_KICK_TRIP_DAMAGE_BASE_BONUS + (m.level || 1) * MONK_KICK_TRIP_DAMAGE_PER_LEVEL;
        const critChance = Math.min(0.95, (m.level || 1) * MONK_KICK_TRIP_CRIT_PER_LEVEL);
        const tripChance = Math.min(0.95, MONK_KICK_TRIP_PRONE_BASE_CHANCE + ((m.level || 1) / 10) * MONK_KICK_TRIP_PRONE_PER_10_LEVELS);
        this._addLog(`🥾 ${m.name} unleashes Kick Trip on ${this._eName(targetEnemy)}! (${kicks} heavy kick${kicks !== 1 ? 's' : ''})`);

        for (let i = 0; i < kicks; i++) {
            if (!targetEnemy || targetEnemy.health <= 0) break;
            let dmg = Math.max(1, Math.floor(this._rollPlayerMeleeDamage(m) * dmgMult));
            let critText = '';
            if (Math.random() < critChance) {
                dmg = Math.max(1, Math.floor(dmg * 2));
                critText = ' CRIT!';
            }
            dmg = this._applyOutgoingDamageBonuses(m, dmg, 'melee');
            const dealt = this._damageEnemy(targetEnemy, dmg, false, false, 0, false, { contactAttacker: m, sourceMember: m });
            this._breakInvisibility(m);
            this._addLog(`  🥾 Kick ${i + 1}: ${this._eName(targetEnemy)} takes ${dealt} damage.${critText}`);
            if (targetEnemy.health <= 0) {
                this._addLog(`${this._eName(targetEnemy)} is kicked down for good!`);
                break;
            }
            if (Math.random() < MONK_KICK_TRIP_STUN_CHANCE) {
                if (this._tryStunEnemy(targetEnemy)) this._addLog(`  ⚡ ${this._eName(targetEnemy)} is stunned by the crushing kick!`);
            }
            if (Math.random() < tripChance) {
                if (this._tryTripEnemy(targetEnemy, m)) this._addLog(`  ⏬ ${this._eName(targetEnemy)} is swept prone and will lose its next action!`);
            }
            this._applyMonkAvatarOnHit(m, targetEnemy, dealt, false);
        }

        this._advancePlayerTurn();
    }

    _getExplosivePalmEffect(monk, enemy) {
        if (!monk || !enemy || !Array.isArray(enemy.activeEffects)) return null;
        return enemy.activeEffects.find(fx =>
            fx && fx.type === 'quivering_palm'
            && (fx.sourceId === monk.id || (!fx.sourceId && fx.sourceName === monk.name))
            && (fx.rounds || 0) > 0
            && (fx.doublings || 0) >= MONK_EXPLOSIVE_PALM_MIN_DOUBLINGS);
    }

    monkExplosivePalm(targetEnemy) {
        const m = this.currentMember;
        if (!m || m.health <= 0 || m.classId !== 'monk') return;
        if ((m.level || 1) < MONK_L35_UNLOCK_LEVEL) return;
        if (!targetEnemy || targetEnemy.health <= 0) return;
        if (m.mana < MONK_EXPLOSIVE_PALM_MANA_COST) {
            this._addLog(`${m.name} needs ${MONK_EXPLOSIVE_PALM_MANA_COST} MP to trigger Explosive Palm.`);
            return;
        }
        const fx = this._getExplosivePalmEffect(m, targetEnemy);
        if (!fx) {
            this._addLog(`${this._eName(targetEnemy)} does not have ${m.name}'s Quivering Palm at ${MONK_EXPLOSIVE_PALM_MIN_DOUBLINGS}+ doublings.`);
            return;
        }

        m.mana -= MONK_EXPLOSIVE_PALM_MANA_COST;
        const accelerated = Math.max(1, Math.round((fx.damage || 1) * (fx.mult || 2)));
        fx.rounds = 0;
        fx.damage = 0;
        const eName = this._eName(targetEnemy);
        targetEnemy.health = Math.max(0, targetEnemy.health - accelerated);
        this._addLog(`💥✋ ${m.name} accelerates Explosive Palm in ${eName} for ${accelerated} internal damage! The Quivering Palm stack ends.`);
        if (targetEnemy.health > 0 && Math.random() < MONK_EXPLOSIVE_PALM_STUN_CHANCE) {
            if (this._tryStunEnemy(targetEnemy)) this._addLog(`  ⚡ ${eName} is stunned by the internal burst!`);
        }
        if (targetEnemy.health <= 0 && !targetEnemy._deathHandled) {
            targetEnemy._deathHandled = true;
            this._onEnemyDeath(targetEnemy);
        }

        const shock = Math.max(1, Math.floor(accelerated * MONK_EXPLOSIVE_PALM_SHOCKWAVE_FRAC));
        const others = this.aliveHostileEnemies.filter(e => e !== targetEnemy && e.health > 0);
        if (others.length > 0) this._addLog(`💥 Explosive Palm shockwave erupts for ${shock} damage to other enemies!`);
        for (const other of others) {
            const dealt = this._damageEnemy(other, shock, true, true, 0, false, { sourceMember: m });
            this._addLog(`  → ${this._eName(other)} takes ${dealt} shockwave damage.`);
            if (other.health <= 0 && !other._deathHandled) {
                other._deathHandled = true;
                this._onEnemyDeath(other);
            }
        }

        this._advancePlayerTurn();
    }

    /**
     * Monk L30: Ki Surge.
     * Expends all ki charges, striking every alive enemy for melee × kiCharges damage.
     * Damage bypasses defense (ignoreDefense=true) and counts as magic/AoE for resist purposes.
     * Drains all ki charges. Replaces the monk's action for the round.
     */
    monkKiSurge() {
        const m = this.currentMember;
        if (!m || m.health <= 0 || m.classId !== 'monk') return;
        if (m.level < MONK_KI_UNLOCK_LEVEL) return;
        if (!this.canMelee(m)) {
            this._addLog(`${m.name} cannot use Ki Surge from the back row!`);
            return;
        }
        const ki = m.kiCharges || 0;
        if (ki <= 0) {
            this._addLog(`${m.name} has no Ki Charges to release!`);
            return;
        }

        const base = this._rollPlayerMeleeDamage(m);
        const raw  = this._applyOutgoingDamageBonuses(m, base * ki, 'melee');

        this._addLog(`\u{1F9D8} ${m.name} unleashes a Ki Surge! (${ki} charge${ki !== 1 ? 's' : ''} × ${base} melee = ${raw} raw)`);

        let totalDealt = 0;
        for (const enemy of [...this.aliveHostileEnemies]) {
            if (enemy.health <= 0) continue;
            const dealt = this._damageEnemy(enemy, raw, true, true);
            totalDealt += dealt;
            this._addLog(`  \u{1F9D8} ${this._eName(enemy)} takes ${dealt} ki damage!`);
            if (enemy.health <= 0) this._addLog(`${this._eName(enemy)} is overwhelmed by the ki surge!`);
        }

        m.kiCharges = 0;
        if (totalDealt === 0) this._addLog(`The Ki Surge dissipates with no targets remaining.`);

        this._advancePlayerTurn();
    }

    /**
     * Necromancer: Dark Harvest.
     * Sacrifices 10% max HP + 10% max Stamina to gain 10% max Mana.
     * Cannot reduce HP to 0 (must keep ≥1 HP). Uses the player's turn.
     */
    necromancerDarkHarvest() {
        const m = this.currentMember;
        if (!m || m.health <= 0) return;
        if (m.classId !== 'necromancer') return;

        const hpCost = Math.max(1, Math.floor(m.maxHealth  * NECRO_DARK_HARVEST_HP_FRAC));
        const stCost = Math.max(1, Math.floor(m.maxStamina * NECRO_DARK_HARVEST_ST_FRAC));
        const mpGain = Math.max(1, Math.floor(m.maxMana    * NECRO_DARK_HARVEST_MANA_FRAC));

        if (m.health <= hpCost) {
            this._addLog(`💀 ${m.name} cannot Dark Harvest — not enough health (must keep ≥1 HP).`);
            return;
        }
        if (m.mana >= m.maxMana) {
            this._addLog(`💀 ${m.name}'s mana is already full.`);
            return;
        }

        m.health  = Math.max(1, m.health  - hpCost);
        m.stamina = Math.max(0, m.stamina - stCost);
        m.mana    = Math.min(m.maxMana, m.mana + mpGain);

        this._addLog(`💀 ${m.name} Dark Harvest: −${hpCost} HP, −${stCost} ST → +${mpGain} MP!`);
        this._advancePlayerTurn();
    }

    // ── Necromancer L20: Lich Form ────────────────────────────────────────────

    /**
     * Necromancer L20: Toggle Lich Form on/off.
     * Turning it on is a free action; turning it off uses the turn.
     * While active costs NECRO_LICH_FORM_MANA_PER_ROUND mana/round.
     * Grants magic/AoE resist, stun/poison immunity.
     * On death: soul retreats to phial, revives in NECRO_LICH_REVIVE_ROUNDS rounds.
     */
    necromancerToggleLichForm() {
        const m = this.currentMember;
        if (!m || m.classId !== 'necromancer' || m.level < NECRO_LICH_FORM_UNLOCK_LEVEL || m.health <= 0) return;

        if (m.isLichForm) {
            m.isLichForm = false;
            this._addLog(`💀 ${m.name} reverts to mortal form.`);
            this._advancePlayerTurn();
            return;
        }

        if (m.mana < NECRO_LICH_FORM_MANA_PER_ROUND) {
            this._addLog(`${m.name} needs ${NECRO_LICH_FORM_MANA_PER_ROUND} MP to assume Lich Form.`);
            return;
        }

        m.isLichForm = true;
        this._addLog(`💀 ${m.name} undergoes the Lich transformation! (magic/AoE resist, stun/poison immune, phial death)`);
        this._notify();
    }

    // ── Mage L20: Mirror Image ────────────────────────────────────────────────

    /**
     * Mage L20: Create Mirror Images.
     * Costs MAGE_MIRROR_IMAGE_MANA_COST mana; creates floor(level/7) images.
     * Each image absorbs one attack (any type) directed at the mage.
     */
    mageCreateMirrorImages() {
        const m = this.currentMember;
        if (!m || m.classId !== 'mage' || m.level < MAGE_MIRROR_IMAGE_UNLOCK_LEVEL || m.health <= 0) return;
        if (m.mana < MAGE_MIRROR_IMAGE_MANA_COST) {
            this._addLog(`🪞 ${m.name} needs ${MAGE_MIRROR_IMAGE_MANA_COST} mana for Mirror Image.`);
            return;
        }
        m.mana -= MAGE_MIRROR_IMAGE_MANA_COST;
        const count = Math.max(1, Math.floor(m.level / MAGE_MIRROR_IMAGE_COUNT_DIVISOR));
        m.mirrorImages = (m.mirrorImages || 0) + count;
        this._addLog(`🪞 ${m.name} conjures ${count} Mirror Image${count > 1 ? 's' : ''}! (${m.mirrorImages} total)`);
        this._advancePlayerTurn();
    }

    _rollPhotomancerMagicDamage(m, mult = 1) {
        let dmg = randomInt(MAGIC_DAMAGE_MIN, MAGIC_DAMAGE_MAX);
        dmg += m.getWeaponBonus?.('magic') || 0;
        dmg += m.getClassDamageBonus?.('magic') || 0;
        dmg += this._getPartyMemberDamageMod(m);
        dmg = Math.max(1, Math.round(dmg * (m.getMagicDamageMultiplier?.() || 1) * mult));
        return this._applyOutgoingDamageBonuses(m, dmg, 'magic');
    }

    _hasInvisibility(target) {
        return !!(target && (target.activeEffects || []).some(fx =>
            fx && (fx.type === 'invisibility' || fx.type === 'improved_invisibility') && (fx.rounds || 0) > 0));
    }

    _breakInvisibility(actor) {
        if (!actor || !actor.activeEffects) return;
        const before = actor.activeEffects.length;
        actor.activeEffects = actor.activeEffects.filter(fx => !(fx && fx.type === 'invisibility'));
        if (actor.activeEffects.length !== before) {
            this._addLog(`\u{1F441} ${actor.name}'s invisibility breaks as they strike!`);
        }
    }

    photomancerColorSpray() {
        const m = this.currentMember;
        if (!m || m.health <= 0 || m.classId !== 'photomancer') return;
        if (m.mana < PHOTOMANCER_COLOR_SPRAY_MANA_COST) {
            this._addLog(`${m.name} needs ${PHOTOMANCER_COLOR_SPRAY_MANA_COST} MP for Color Spray.`);
            return;
        }
        const targets = this.aliveHostileEnemies.slice().sort(() => Math.random() - 0.5).slice(0, Math.max(1, (m.level || 1) + 1));
        if (!targets.length) return;
        m.mana -= PHOTOMANCER_COLOR_SPRAY_MANA_COST;
        const stunChance = Math.min(0.95, (m.level || 1) / 100);
        this._addLog(`\u{1F308} ${m.name} releases a Color Spray over ${targets.length} target${targets.length !== 1 ? 's' : ''}!`);
        for (const e of targets) {
            const dealt = this._damageEnemy(e, this._rollPhotomancerMagicDamage(m), false, true);
            this._addLog(`  \u2192 ${this._eName(e)} takes ${dealt} prismatic damage.`);
            if (e.health > 0 && Math.random() < stunChance) {
                if (this._tryStunEnemy(e)) this._addLog(`  \u26A1 ${this._eName(e)} is dazzled and stunned!`);
            }
            if (e.health <= 0) this._addLog(`${this._eName(e)} is defeated!`);
        }
        this._advancePlayerTurn();
    }

    photomancerMirrorImage() {
        const m = this.currentMember;
        if (!m || m.health <= 0 || m.classId !== 'photomancer' || m.level < PHOTOMANCER_MIRROR_IMAGE_UNLOCK_LEVEL) return;
        if (m.mana < PHOTOMANCER_MIRROR_IMAGE_MANA_COST) {
            this._addLog(`${m.name} needs ${PHOTOMANCER_MIRROR_IMAGE_MANA_COST} MP for Mirror Image.`);
            return;
        }
        m.mana -= PHOTOMANCER_MIRROR_IMAGE_MANA_COST;
        const count = Math.max(1, Math.floor((m.level || 1) / MAGE_MIRROR_IMAGE_COUNT_DIVISOR)) + 1;
        m.mirrorImages = (m.mirrorImages || 0) + count;
        this._addLog(`\u{1FA9E} ${m.name} splits light into ${count} Mirror Images! (${m.mirrorImages} total)`);
        this._advancePlayerTurn();
    }

    photomancerBlur() {
        const m = this.currentMember;
        if (!m || m.health <= 0 || m.classId !== 'photomancer' || m.level < PHOTOMANCER_BLUR_UNLOCK_LEVEL) return;
        if (m.mana < PHOTOMANCER_BLUR_MANA_COST) {
            this._addLog(`${m.name} needs ${PHOTOMANCER_BLUR_MANA_COST} MP for Blur.`);
            return;
        }
        m.mana -= PHOTOMANCER_BLUR_MANA_COST;
        const rounds = 3 + Math.floor((m.level || 1) / 10);
        for (const ally of this.aliveParty) {
            ally.addEffect?.({ type: 'blur', rounds, missChance: PHOTOMANCER_BLUR_MISS_CHANCE });
        }
        this._addLog(`\u{1F300} ${m.name} blurs the whole party! (${Math.round(PHOTOMANCER_BLUR_MISS_CHANCE * 100)}% melee/ranged miss, ${rounds} rounds)`);
        this._advancePlayerTurn();
    }

    photomancerInvisibility(targetMember) {
        const m = this.currentMember;
        if (!m || m.health <= 0 || m.classId !== 'photomancer' || m.level < PHOTOMANCER_BLUR_UNLOCK_LEVEL) return;
        if (!targetMember || targetMember.health <= 0) return;
        if (m.mana < PHOTOMANCER_INVISIBILITY_MANA_COST) {
            this._addLog(`${m.name} needs ${PHOTOMANCER_INVISIBILITY_MANA_COST} MP for Invisibility.`);
            return;
        }
        m.mana -= PHOTOMANCER_INVISIBILITY_MANA_COST;
        const improved = (m.level || 1) >= PHOTOMANCER_IMPROVED_INVIS_UNLOCK_LEVEL;
        const rounds = 5 + Math.floor((m.level || 1) / 10);
        targetMember.addEffect?.({ type: improved ? 'improved_invisibility' : 'invisibility', rounds });
        this._addLog(`\u{1F441} ${m.name} cloaks ${targetMember.name} in ${improved ? 'Improved ' : ''}Invisibility for ${rounds} rounds.`);
        this._advancePlayerTurn();
    }

    photomancerCreateIllusionaryWarriors() {
        const m = this.currentMember;
        if (!m || m.health <= 0 || m.classId !== 'photomancer' || m.level < PHOTOMANCER_ILLUSION_UNLOCK_LEVEL) return;
        if (m.mana < PHOTOMANCER_ILLUSION_MANA_COST) {
            this._addLog(`${m.name} needs ${PHOTOMANCER_ILLUSION_MANA_COST} MP to create Illusionary Warriors.`);
            return;
        }
        m.mana -= PHOTOMANCER_ILLUSION_MANA_COST;
        const count = Math.max(1, Math.floor((m.level || 1) / 10));
        for (let i = 0; i < count; i++) {
            const num = this.party.filter(p => p.isSummoned && p.summonerId === m.id && p.summonType === 'illusionary_warrior').length + 1;
            const iw = new PartyMember({
                name: `${m.name}'s Illusionary Warrior #${num}`,
                classId: 'summoned',
                speciesId: 'human',
                level: m.level,
                maxHealth: 1,
                maxStamina: 0,
                maxMana: 0,
                portraitSeed: Math.floor(Math.random() * 100000),
                isSummoned: true,
                summonType: 'illusionary_warrior',
                summonerId: m.id,
                canBeHealed: false,
                row: 'front',
                summonStats: {
                    illusionaryWarrior: true,
                    icon: ILLUSIONARY_WARRIOR_PRESET.icon,
                    defense: 9999,
                    photomancerLevel: m.level || 1,
                },
            });
            iw.health = iw.maxHealth;
            this.party.push(iw);
            this._registerNewSummon(iw);
        }
        this._addLog(`\u{1FA9E} ${m.name} creates ${count} Illusionary Warrior${count !== 1 ? 's' : ''}!`);
        this._advancePlayerTurn();
    }

    photomancerDisintegrate(targetEnemy) {
        const m = this.currentMember;
        if (!m || m.health <= 0 || m.classId !== 'photomancer' || m.level < PHOTOMANCER_DISINTEGRATE_UNLOCK_LEVEL) return;
        if (!targetEnemy || targetEnemy.health <= 0) return;
        if (m.mana < PHOTOMANCER_DISINTEGRATE_MANA_COST) {
            this._addLog(`${m.name} needs ${PHOTOMANCER_DISINTEGRATE_MANA_COST} MP for Disintegrate.`);
            return;
        }
        m.mana -= PHOTOMANCER_DISINTEGRATE_MANA_COST;
        const beams = 1 + Math.floor((m.level || 1) / 33);
        const killChance = Math.min(0.95, PHOTOMANCER_DISINTEGRATE_BASE_KILL + ((m.level || 1) / 2) / 100);
        const dmgMult = 1 + 2 + ((m.level || 1) * 2) / 100;
        this._addLog(`\u{1F52C} ${m.name} fires ${beams} disintegrating light beam${beams !== 1 ? 's' : ''}!`);
        for (let i = 0; i < beams; i++) {
            if (!targetEnemy || targetEnemy.health <= 0) break;
            if ((ENEMY_TYPES[targetEnemy.type] || {}).fullMagicImmune || this._enemyHasImmunity(targetEnemy, 'magic')) {
                this._addLog(`${this._eName(targetEnemy)} is immune to Disintegrate's magic.`);
                break;
            }
            if (Math.random() < killChance) {
                if (targetEnemy.isBoss || targetEnemy.isMegaBoss || targetEnemy.isSuperBoss) {
                    const dealt = this._damageEnemy(targetEnemy, Math.max(1, Math.round(this._rollPhotomancerMagicDamage(m, dmgMult) * PHOTOMANCER_DISINTEGRATE_BOSS_MULT)), true, true);
                    this._addLog(`  \u{1F52C} ${this._eName(targetEnemy)} resists annihilation but takes ${dealt} damage!`);
                } else {
                    const hp = targetEnemy.health;
                    targetEnemy.health = 0;
                    if (!targetEnemy._deathHandled) { targetEnemy._deathHandled = true; this._onEnemyDeath(targetEnemy); }
                    this._addLog(`  \u{1F52C} ${this._eName(targetEnemy)} is disintegrated! (${hp} damage)`);
                }
            } else {
                const dealt = this._damageEnemy(targetEnemy, this._rollPhotomancerMagicDamage(m, dmgMult), true, true);
                this._addLog(`  \u{1F52C} ${this._eName(targetEnemy)} takes ${dealt} radiant force damage.`);
            }
        }
        if (targetEnemy.health <= 0) this._addLog(`${this._eName(targetEnemy)} is defeated!`);
        this._advancePlayerTurn();
    }

    photomancerPrismaticSphere() {
        const m = this.currentMember;
        if (!m || m.health <= 0 || m.classId !== 'photomancer' || m.level < PHOTOMANCER_PRISMATIC_SPHERE_UNLOCK_LEVEL) return;
        if (m.prismaticSphereUsed) {
            this._addLog(`${m.name} has already shaped a Prismatic Sphere this combat.`);
            return;
        }
        if (this.prismaticSphere && this.prismaticSphere.hp > 0) {
            this._addLog('A Prismatic Sphere already protects the party.');
            return;
        }
        if (m.mana < PHOTOMANCER_PRISMATIC_SPHERE_MANA_COST) {
            this._addLog(`${m.name} needs ${PHOTOMANCER_PRISMATIC_SPHERE_MANA_COST} MP for Prismatic Sphere.`);
            return;
        }
        m.mana -= PHOTOMANCER_PRISMATIC_SPHERE_MANA_COST;
        m.prismaticSphereUsed = true;
        this.prismaticSphere = { hp: Math.max(1, (m.level || 1) * 100), casterId: m.id };
        this._addLog(`\u{1F308} ${m.name} raises a Prismatic Sphere! (${this.prismaticSphere.hp} absorption)`);
        this._advancePlayerTurn();
    }

    // ── Druid L20: Commune / Faerie Queen ────────────────────────────────────

    /**
     * Druid L20: Commune with nature. Grants 1 Fae token.
        * Auto-summons the Faerie Queen at the current token threshold
        * (3 below L30, 2 at L30+, 1 at L40+).
        * Tokens cap at that threshold so they're ready to immediately resummon when the FQ dies.
     */
    druidCommune() {
        const m = this.currentMember;
        if (!m || m.classId !== 'druid' || m.level < DRUID_COMMUNE_UNLOCK_LEVEL || m.health <= 0) return;

        const tokensNeeded = this._getFaerieQueenTokensNeeded(m.level);

        // Cap tokens at the current requirement (they're saved for when the active FQ dies)
        const currentTokens = m.faeTokens || 0;
        if (currentTokens < tokensNeeded) {
            m.faeTokens = currentTokens + 1;
        } else {
            m.faeTokens = tokensNeeded;
        }
        this._emitTelemetry('abilityUsed', { member: m, abilityId: 'druid_commune' });
        const t = m.faeTokens;
        this._addLog(`🌿 ${m.name} communes with nature! Fae tokens: ${t}/${tokensNeeded}`);

        // Attempt summon if tokens are full and no FQ is alive
        if (t >= tokensNeeded) {
            const activeFQ = this.party.find(p =>
                p.isSummoned && p.summonType === 'faerie_queen' && p.summonerId === m.id && p.health > 0);
            if (!activeFQ) {
                m.faeTokens = 0;
                this._summonFaerieQueen(m);
            } else {
                this._addLog(`🌿 A Faerie Queen already serves — tokens held until she falls.`);
            }
        }
        this._advancePlayerTurn();
    }

    /** Spawn a Faerie Queen for the given druid. */
    _summonFaerieQueen(druid) {
        const lvl       = druid.level;
        const magicBonus = druid.getWeaponBonus('magic') + druid.getClassDamageBonus('magic');
        const defense   = FAERIE_QUEEN_DEFENSE_BASE + lvl;
        const maxHp     = Math.max(1, Math.floor(druid.maxHealth * FAERIE_QUEEN_HP_MULT));

        const fqNum = this.party.filter(p => p.isSummoned && p.summonType === 'faerie_queen' && p.summonerId === druid.id).length + 1;
        const fq = new PartyMember({
            name:         `${druid.name}'s Faerie Queen #${fqNum}`,
            speciesId:    'human',
            level:        lvl,
            maxHealth:    maxHp,
            maxStamina:   40,
            maxMana:      40,
            portraitSeed: Math.floor(Math.random() * 100000),
            isSummoned:   true,
            summonType:   'faerie_queen',
            summonerId:   druid.id,
            canBeHealed:  true,
            row:          'back',
            summonStats: {
                defense:     defense,
                magicMin:    MAGIC_DAMAGE_MIN + magicBonus,
                magicMax:    MAGIC_DAMAGE_MAX + magicBonus,
                druidLevel:  lvl,
                magicBonus:  magicBonus,
            },
        });
        this.party.push(fq);
        this._registerNewSummon(fq);
        this._addLog(`🌟 The Faerie Queen answers the call!`);
    }

    /**
     * Called each round: if a Faerie Queen died and her druid has enough tokens,
     * auto-summon a replacement and reset the token counter.
     */
    _checkFaerieQueenRevive() {
        const deadFQs = this.party.filter(p =>
            p.isSummoned && p.summonType === 'faerie_queen' && p.health <= 0);
        for (const fq of deadFQs) {
            const druid = this.party.find(p =>
                p.id === fq.summonerId && p.health > 0 && !p.isSummoned);
            if (!druid) continue;
            const tokensNeeded = this._getFaerieQueenTokensNeeded(druid.level);
            if ((druid.faeTokens || 0) >= tokensNeeded) {
                // Remove the dead FQ from party
                const idx = this.party.indexOf(fq);
                if (idx !== -1) this.party.splice(idx, 1);
                druid.faeTokens = 0;
                this._summonFaerieQueen(druid);
            }
        }
    }

    /**
     * Bard L20 Charm Monster. Costs BARD_CHARM_MANA_COST mana.
     * Attempts to charm a single enemy monster to fight for the party.
     * Chance = BARD_CHARM_BASE_CHANCE + (BARD_CHARM_CHANCE_PER_2_LV × bardLevel).
     * Duration = floor(bardLevel / BARD_CHARM_DURATION_DIVISOR) rounds.
     * Immune: undead, elemental, construct tags; bosses and mega-bosses.
     */
    bardCharm(targetEnemy) {
        const m = this.currentMember;
        if (!m || m.health <= 0) return;
        if (m.classId !== 'bard') return;
        if (m.level < BARD_CHARM_UNLOCK_LEVEL) {
            this._addLog(`${m.name} must be level ${BARD_CHARM_UNLOCK_LEVEL} to use Charm Monster.`);
            return;
        }
        if (m.mana < BARD_CHARM_MANA_COST) {
            this._addLog(`${m.name} doesn't have enough mana for Charm Monster (needs ${BARD_CHARM_MANA_COST} MP).`);
            return;
        }
        if (!targetEnemy || targetEnemy.health <= 0) return;

        const eName = this._eName(targetEnemy);
        const tDef  = ENEMY_TYPES[targetEnemy.type] || {};
        const tTags = tDef.tags || [];

        // Immunity: bosses / mega-bosses
        if (targetEnemy.isBoss || targetEnemy.isMegaBoss) {
            m.mana -= BARD_CHARM_MANA_COST;
            this._addLog(`🎵 ${m.name} plays an enchanting melody… but ${eName} is too powerful to charm!`);
            this._advancePlayerTurn();
            return;
        }
        // Immunity: undead, elemental, construct
        const immuneTag = BARD_CHARM_IMMUNE_TAGS.find(tag => tTags.includes(tag));
        if (immuneTag) {
            m.mana -= BARD_CHARM_MANA_COST;
            this._addLog(`🎵 ${m.name} plays an enchanting melody… but ${eName} (${immuneTag}) is immune to charm!`);
            this._advancePlayerTurn();
            return;
        }
        // Already charmed?
        if (targetEnemy.charmedRounds > 0) {
            this._addLog(`${eName} is already charmed!`);
            return;
        }

        m.mana -= BARD_CHARM_MANA_COST;

        const charmChance = Math.min(0.95, BARD_CHARM_BASE_CHANCE + BARD_CHARM_CHANCE_PER_2_LV * m.level);
        const duration    = Math.max(1, Math.floor(m.level / BARD_CHARM_DURATION_DIVISOR));

        if (Math.random() < charmChance) {
            this._prepareCharmedAlly(targetEnemy);
            targetEnemy.charmedRounds = duration;
            targetEnemy.charmerId     = m.id;
            this._addLog(`🎵 ${m.name} weaves a hypnotic song — ${eName} falls under the spell! (${duration} rounds)`);
        } else {
            this._addLog(`🎵 ${m.name} plays an enchanting melody… but ${eName} shakes it off! (${Math.round(charmChance * 100)}% chance)`);
        }

        this._advancePlayerTurn();
    }

    /**
     * Ranger L20 Explosive Arrow. Costs 3× normal ranged stamina.
     * Fires a single explosive arrow that hits ALL alive hostile enemies
     * at half post-defense damage, half normal crit chance, and half normal
     * instakill chance vs favored enemies.
     */
    rangerExplosiveArrow() {
        const m = this.currentMember;
        if (!m || m.health <= 0) return;
        if (m.classId !== 'ranger') return;
        if (m.level < RANGER_EXPLOSIVE_ARROW_UNLOCK_LEVEL) {
            this._addLog(`${m.name} must be level ${RANGER_EXPLOSIVE_ARROW_UNLOCK_LEVEL} to use Explosive Arrow.`);
            return;
        }

        const totalCost = RANGED_STAMINA_COST * RANGER_EXPLOSIVE_ARROW_STAMINA_MULT;
        const exhausted = m.stamina < totalCost;
        m.stamina = Math.max(0, m.stamina - totalCost);

        const favoredTags = m.getAllFavoredEnemies();
        const targets     = this.aliveHostileEnemies.slice(); // snapshot before damage loop

        if (targets.length === 0) {
            this._addLog('No enemies to target!');
            this._advancePlayerTurn();
            return;
        }

        this._addLog(`🏹 ${m.name} looses an Explosive Arrow — it detonates among ALL enemies!${exhausted ? ' (exhausted!)' : ''}`);

        for (const target of targets) {
            if (target.health <= 0) continue;

            const tDef  = ENEMY_TYPES[target.type] || {};
            const tTags = tDef.tags || [];
            const isFav = favoredTags.length > 0 && favoredTags.some(tag => tTags.includes(tag));

            // Half instakill chance vs favored enemies
            if (isFav) {
                const ikChance = m.getFavoredEnemyInstakillChance() * RANGER_EXPLOSIVE_ARROW_INSTAKILL_MULT;
                if (ikChance > 0 && Math.random() < ikChance) {
                    if (target.isBoss || target.isMegaBoss) {
                        let bossDmg = randomInt(RANGED_DAMAGE_MIN, RANGED_DAMAGE_MAX);
                        bossDmg += m.getWeaponBonus('ranged');
                        bossDmg += m.getClassDamageBonus('ranged');
                        if (exhausted) bossDmg = Math.max(1, Math.floor(bossDmg / 2));
                        bossDmg = Math.max(1, Math.round(bossDmg * 4));
                        bossDmg = this._applyOutgoingDamageBonuses(m, bossDmg, 'ranged');
                        const dealtBoss = this._damageEnemy(target, bossDmg, true, false, 0, true);
                        this._addLog(`🎯 Explosive Arrow: ${this._eName(target)} resists instant death! (x4 ranged: ${dealtBoss} damage)`);
                        if (target.health <= 0) this._addLog(`${this._eName(target)} is destroyed in the blast!`);
                        continue;
                    }
                    target.health = 0;
                    if (!target._deathHandled) { target._deathHandled = true; this._onEnemyDeath(target); }
                    this._addLog(`🎯 Explosive Arrow: ${this._eName(target)} is blown apart! (favored enemy instakill)`);
                    continue;
                }
            }

            // Roll base ranged damage
            let raw = randomInt(RANGED_DAMAGE_MIN, RANGED_DAMAGE_MAX);
            raw += m.getWeaponBonus('ranged');
            raw += m.getClassDamageBonus('ranged');
            if (exhausted) raw = Math.max(1, Math.floor(raw / 2));

            // Half normal crit chance
            const critChance = (RANGED_CRIT_CHANCE + m.getRangedCritBonus()) * RANGER_EXPLOSIVE_ARROW_CRIT_MULT;
            let isCrit = false;
            if (Math.random() < critChance && !this._isCritImmune(target)) { raw *= 2; isCrit = true; }
            raw = this._applyOutgoingDamageBonuses(m, raw, 'aoe');
            if (isFav) raw = Math.round(raw * (1 + m.level * 0.02));

            // Replicate _damageEnemy defense calculation without modifying health yet,
            // then halve the post-defense value (explosive = splash damage).
            const effects = target.activeEffects || [];
            let defMod = 0;
            for (const x of effects) {
                if (typeof x.defenseBonus === 'number') defMod += x.defenseBonus;
            }
            let postDef = raw;
            if (defMod < 0) postDef = Math.max(1, raw - defMod);
            if (!isFav) postDef = Math.max(1, postDef - (target.defense || 0));
            postDef = Math.max(1, Math.round(postDef));

            // Half post-defense damage (explosion splash)
            const dealt = Math.max(1, Math.floor(postDef * RANGER_EXPLOSIVE_ARROW_DAMAGE_MULT));
            target.health = Math.max(0, target.health - dealt);

            const eName   = this._eName(target);
            const critStr = isCrit ? ' 💥 CRIT!' : '';
            const favStr  = isFav ? ` [Favored — armor ignored, +${m.level * 2}% dmg]` : '';
            this._addLog(`  ➡️ ${eName} takes ${dealt} explosion damage!${critStr}${favStr}`);
            this._applyWeaponRider(m, target, dealt);
            this._applyRangerTotemOnHit(m, target, dealt, 'aoe');
            if (target.health <= 0) { this._addLog(`${eName} is destroyed in the blast!`); this._checkHunterMarkKill(target); }
        }

        this._advancePlayerTurn();
    }

    /**
     * Mage Shield (level 3+). Costs MAGE_SHIELD_MANA_COST mana.
     * Applies a defense buff to ALL party members (front + back) for several rounds,
     * so AoE magic that sweeps every row is also mitigated.
     * Only one mage shield can be active at a time; falls if the caster is defeated.
     * Defense bonus = MAGE_SHIELD_BASE_DEF + floor(level / MAGE_SHIELD_BONUS_EVERY).
     * Duration = MAGE_SHIELD_BASE_ROUNDS + floor(level / MAGE_SHIELD_BONUS_EVERY) rounds.
     */
    mageShield() {
        const m = this.currentMember;
        if (!m || m.health <= 0) return;
        if (m.classId !== 'mage') return;
        if (m.level < MAGE_SHIELD_MIN_LEVEL) {
            this._addLog(`${m.name} must be level ${MAGE_SHIELD_MIN_LEVEL} to cast Arcane Shield.`);
            return;
        }
        if (m.mana < MAGE_SHIELD_MANA_COST) {
            this._addLog(`${m.name} has too little mana to cast Arcane Shield (needs ${MAGE_SHIELD_MANA_COST}).`);
            return;
        }
        if (this._mageShieldCasterId !== null) {
            this._addLog(`An Arcane Shield is already active — only one shield at a time.`);
            return;
        }

        const bonus = MAGE_SHIELD_BASE_DEF + Math.floor(m.level / MAGE_SHIELD_BONUS_EVERY);
        const rounds = MAGE_SHIELD_BASE_ROUNDS + Math.floor(m.level / MAGE_SHIELD_BONUS_EVERY);

        m.mana -= MAGE_SHIELD_MANA_COST;
        this._mageShieldCasterId = m.id;

        // Shield covers ALL alive party members — front and back — so AoE magic
        // that sweeps every row is also mitigated.
        const allAlive = this.party.filter(t => t.health > 0);
        for (const t of allAlive) {
            t.activeEffects = (t.activeEffects || []).filter(e => e.type !== 'mage_shield');
            t.activeEffects.push({ type: 'mage_shield', defenseBonus: bonus, rounds, casterId: m.id });
        }

        this._addLog(`\u{1F6E1}\uFE0F ${m.name} raises an Arcane Shield! Entire party gains +${bonus} def for ${rounds} rounds.`);
        this._advancePlayerTurn();
    }

    /** Mage L35: Mana Shield (free action, once per combat). */
    mageManaShield() {
        const m = this.currentMember;
        if (!m || m.health <= 0 || m.classId !== 'mage') return;
        if ((m.level || 0) < MAGE_L35_UNLOCK_LEVEL) {
            this._addLog(`${m.name} must be level ${MAGE_L35_UNLOCK_LEVEL} to cast Mana Shield.`);
            return;
        }
        if (m.manaShieldUsed) {
            this._addLog(`🧿 ${m.name} has already used Mana Shield this combat.`);
            return;
        }
        if (m.mana < MAGE_MANA_SHIELD_MANA_COST) {
            this._addLog(`${m.name} needs ${MAGE_MANA_SHIELD_MANA_COST} MP to cast Mana Shield.`);
            return;
        }
        m.mana -= MAGE_MANA_SHIELD_MANA_COST;
        m.manaShieldActive = true;
        m.manaShieldUsed = true;
        m.manaShieldHp = Math.max(1, Math.round(m.maxMana || 0));
        this._addLog(`🧿 ${m.name} weaves Mana Shield! (${m.manaShieldHp} shield HP)`);
        this._notify(); // free action
    }

    /**
     * Final pre-HP damage gate for Mage L35 Mana Shield.
     * Returns remaining damage after shield absorption.
     */
    _absorbMageManaShield(target, dmg, sourceLabel = 'damage') {
        if (!target || dmg <= 0) return Math.max(0, Math.round(dmg || 0));
        if (target.isSummoned || target.classId !== 'mage') return dmg;
        if (!target.manaShieldActive || (target.manaShieldHp || 0) <= 0) return dmg;

        const pool = Math.max(0, target.manaShieldHp || 0);
        if (pool >= dmg) {
            target.manaShieldHp = pool - dmg;
            this._addLog(`🧿 ${target.name}'s Mana Shield absorbs ${dmg} ${sourceLabel}! (${target.manaShieldHp} shield HP left)`);
            if (target.manaShieldHp <= 0) {
                target.manaShieldActive = false;
                this._addLog(`🧿 ${target.name}'s Mana Shield shatters!`);
            }
            return 0;
        }

        const overflow = dmg - pool;
        target.manaShieldHp = 0;
        target.manaShieldActive = false;
        this._addLog(`🧿 ${target.name}'s Mana Shield absorbs ${pool} ${sourceLabel} and shatters! (${overflow} gets through)`);
        return overflow;
    }

    /** Mage L35 passive: on death, blast all enemies not immune to magic. */
    _triggerMageDeathBurst(mage, sourceLabel = '') {
        if (!mage || mage.isSummoned || mage.classId !== 'mage') return;
        if ((mage.level || 0) < MAGE_L35_UNLOCK_LEVEL) return;
        if (mage.health > 0 || mage.mageDeathBurstTriggered) return;

        mage.mageDeathBurstTriggered = true;
        const mult = MAGE_DEATH_BURST_DAMAGE_BASE_MULT + (mage.level || 1) * MAGE_DEATH_BURST_DAMAGE_PER_LEVEL;
        const baseDamage = Math.max(1, Math.round((mage.maxMana || 0) * mult));
        const cause = sourceLabel ? ` (${sourceLabel})` : '';
        this._addLog(`💥 ${mage.name}'s Death Burst detonates${cause}!`);

        const targets = this.aliveHostileEnemies.filter(e => {
            if (!e || e.health <= 0) return false;
            const def = ENEMY_TYPES[e.type] || {};
            return !def.fullMagicImmune && !this._enemyHasImmunity(e, 'magic');
        });

        if (targets.length === 0) {
            this._addLog(`💥 No valid enemies are vulnerable to ${mage.name}'s Death Burst.`);
            return;
        }

        let total = 0;
        for (const e of targets) {
            const dealt = this._damageEnemy(e, baseDamage, true, true);
            if (dealt > 0) total += dealt;
            if (e.health <= 0 && !e._deathHandled) {
                e._deathHandled = true;
                this._onEnemyDeath(e);
            }
        }
        this._addLog(`💥 Death Burst hits ${targets.length} target${targets.length === 1 ? '' : 's'} for ${total} total damage.`);
    }

    /** Remove mage shield effects for a given caster (called when caster is defeated). */
    _removeMageShield(casterId) {
        if (!casterId) return;
        for (const t of this.party) {
            if (!t.activeEffects) continue;
            t.activeEffects = t.activeEffects.filter(e => !(e.type === 'mage_shield' && e.casterId === casterId));
        }
        if (this._mageShieldCasterId === casterId) this._mageShieldCasterId = null;
    }

    /**
     * Mage L30 — Elemental Rift (free action, once per combat).
     * Opens a rift that costs MAGE_ELEMENTAL_RIFT_MANA_PER_ROUND MP/round and
     * each round has a (mageLevel + MAGE_ELEMENTAL_RIFT_SUMMON_BASE)% chance to
     * summon a random elemental (fire/water/earth/air) that fights for the party.
     */
    mageOpenElementalRift() {
        const m = this.currentMember;
        if (!m || m.classId !== 'mage' || m.level < MAGE_ELEMENTAL_RIFT_UNLOCK_LEVEL || m.health <= 0) return;
        if (m.elementalRiftUsed) {
            this._addLog(`\u{1F300} ${m.name} can only open one Elemental Rift per combat!`);
            return;
        }
        if (m.mana < MAGE_ELEMENTAL_RIFT_MANA_INITIAL) {
            this._addLog(`${m.name} needs ${MAGE_ELEMENTAL_RIFT_MANA_INITIAL} MP to open an Elemental Rift.`);
            return;
        }
        m.mana -= MAGE_ELEMENTAL_RIFT_MANA_INITIAL;
        m.elementalRiftOpen = true;
        m.elementalRiftUsed = true;
        this._addLog(`\u{1F300} ${m.name} tears open an Elemental Rift! (-${MAGE_ELEMENTAL_RIFT_MANA_INITIAL} MP; ${MAGE_ELEMENTAL_RIFT_MANA_PER_ROUND} MP/round upkeep)`);
        this._notify(); // free action — refresh UI without advancing turn
    }

    /** Internal: summon one random elemental through the active rift. */
    _riftSummonElemental(mage) {
        const elemTypes = ['fire', 'water', 'earth', 'air'];
        const elemType  = elemTypes[Math.floor(Math.random() * elemTypes.length)];
        const lvl     = mage.level;
        const skill   = Math.floor(lvl * 1.5);
        const baseHp  = Math.floor((lvl * lvl) / 3);
        const defense = Math.floor(lvl * 1.5);
        const dmgMin  = MAGIC_DAMAGE_MIN + skill;
        const dmgMax  = MAGIC_DAMAGE_MAX + skill;

        const ELEM_CFG = {
            fire:  { hp: baseHp,     def: defense,      row: 'back',  immune: ['fire',      'stun', 'poison', 'web', 'hold', 'bleed', 'rot'], icon: '\u{1F525}', name: 'Fire Elemental',  incorporeal: true  },
            water: { hp: baseHp,     def: defense,      row: 'back',  immune: ['cold',      'stun', 'poison', 'web', 'hold', 'bleed', 'rot'], icon: '\u{1F30A}', name: 'Water Elemental', incorporeal: true  },
            air:   { hp: baseHp,     def: defense,      row: 'back',  immune: ['lightning', 'stun', 'poison', 'web', 'hold', 'bleed', 'rot'], icon: '\u{1F4A8}', name: 'Air Elemental',   incorporeal: true  },
            earth: { hp: baseHp * 2, def: defense + 20, row: 'front', immune: [             'stun', 'poison',              'bleed', 'rot'], icon: '\u{1FAA8}', name: 'Earth Elemental', incorporeal: false },
        };
        const cfg = ELEM_CFG[elemType];

        const elem = new PartyMember({
            name: `${mage.name}'s ${cfg.name}`,
            classId: 'summoned', speciesId: 'elemental',
            level: lvl,
            maxHealth:  cfg.hp,
            maxStamina: 50,
            maxMana:    999,
            portraitSeed: Math.floor(Math.random() * 100000),
            isSummoned:  true,
            summonType:  `rift_${elemType}`,
            summonerId:  mage.id,
            canBeHealed: false,   // construct/elemental — no potions, cleric, or regen
            row: cfg.row,
            summonStats: {
                meleeMin: dmgMin, meleeMax: dmgMax,
                magicMin: dmgMin, magicMax: dmgMax,
                defense: cfg.def,
                immune:  cfg.immune,
                beastKind:   `rift_${elemType}`,
                mageLevel:   lvl,
                incorporeal: cfg.incorporeal,
            },
        });
        elem.health = cfg.hp;
        this.party.push(elem);
        this._registerNewSummon(elem);
        this._addLog(`\u{1F300}${cfg.icon} A ${cfg.name} surges through the rift!`);
    }

    getAvailableNecroTiers(necroLevel) {
        return getNecromancerUnlocked(necroLevel);
    }

    /**
     * Necromancer summon — L1=Skeleton (tier 0), L3=Zombie (tier 1), etc.
     */
    summonUndead(tierIndex = 0) {
        const m = this.currentMember;
        if (!m || m.health <= 0) return;
        if (m.classId !== 'necromancer') return;

        const unlocked = getNecromancerUnlocked(m.level);
        const idx = Math.max(0, Math.min(tierIndex | 0, unlocked.length - 1));
        const effectiveTierIndex = Math.max(0, Math.min(idx, UNDEAD_TIERS.length - 1));
        // Tier cost: skeleton=7, zombie=8, ghoul=9, spectre=10 ... +1 per tier
        const tierCost = NECRO_SUMMON_MANA_COST + effectiveTierIndex;

        if (m.mana < tierCost) {
            this._addLog(`${m.name} needs ${tierCost} MP to summon this undead (has ${m.mana}).`);
            return;
        }


        const preset = UNDEAD_TIERS[effectiveTierIndex];
        // Stats scale per tier base + necromancer level (+1 melee/def per level).
        const stats = rollUndeadStats(effectiveTierIndex, m.level);

        m.mana -= tierCost;

        /** Helper: create and register one undead of the chosen tier. */
        const spawnedThisAction = [];
        const _spawnOne = () => {
            const s = rollUndeadStats(effectiveTierIndex, m.level);
            const summonNum = this.party.filter(p => p.isSummoned && p.summonType === preset.id && p.summonerId === m.id).length + 1;
            const u = new PartyMember({
                name: `${m.name}'s ${preset.name} #${summonNum}`,
                classId:   preset.portraitClass,
                speciesId: preset.portraitSpecies,
                level:     m.level,
                maxHealth: s.maxHealth,
                maxStamina: s.maxStamina,
                maxMana:    s.maxMana,
                portraitSeed: Math.floor(Math.random() * 100000),
                isSummoned: true,
                summonType: preset.id,
                summonerId: m.id,
                canBeHealed: false,
                row: 'front',
                summonStats: {
                    meleeMin:  s.meleeMin,
                    meleeMax:  s.meleeMax,
                    defense:   s.defense,
                    incorporeal: preset.incorporeal || false,
                    necroLevel:  m.level,
                },
            });
            this.party.push(u);
            this._registerNewSummon(u);
            spawnedThisAction.push(u);
            return u;
        };

        // ── Summon the first undead (costs mana) ────────────────────────────
        _spawnOne();
        this._addLog(`\u{1F480} ${m.name} summons a ${preset.name}!`);

        // Lich Form bonus: summon one additional undead of the same tier for free
        if (m.isLichForm) {
            _spawnOne();
            this._addLog(`\u{1F480}✨ ${m.name}'s Lich Form channels dark power — a second ${preset.name} rises unbidden!`);
        }

        // ── Cascade: each additional undead is free but decreasingly likely ──
        // Base chances: 2nd = 40%, 3rd = 35%, 4th = 30%, … Each roll is 5%
        // lower than the last, and the necromancer's level adds +1% to every
        // roll in the chain (a level 100 necro auto-chains 8+ summons before
        // the compounding drop-off brings them below 100%).
        let extraCount = 0;
        let baseChance = 0.40;          // chance for the 2nd undead
        const levelBonus = m.level * 0.01;
        while (true) {
            const chance = Math.min(1, baseChance + levelBonus);
            if (chance <= 0) break;
            if (Math.random() >= chance) break;   // roll failed — chain ends
            _spawnOne();
            extraCount++;
            baseChance -= 0.05;                  // next undead is 5% harder
        }

        if (extraCount === 0) {
            // Single summon — nothing more to announce
        } else {
            // Horde: costs another tierCost MP (x2 total for any horde size)
            m.mana = Math.max(0, m.mana - tierCost);
            if (extraCount === 1) {
                this._addLog(`\u{1F480}\u{1F480} Dark power surges — a second ${preset.name} rises! (-${tierCost} MP)`);
            } else {
                this._addLog(`\u{1F480}\u2728 A HORDE RISES! ${m.name} summons ${1 + extraCount} ${preset.name}s! (-${tierCost} MP for horde)`);
            }
        }
        // Safety net: guarantee every freshly summoned undead has an initiative slot
        // this round. _registerNewSummon covers the normal path; this catches the
        // rare edge case where its phase/order-length guard caused a silent early return.
        if (this._initiativeOrder.length > 0) {
            const baseInit = this._initiativeOrder[this._initTurnIdx]?.init ?? 0;
            for (let si = spawnedThisAction.length - 1; si >= 0; si--) {
                const sp = spawnedThisAction[si];
                if (!this._initiativeOrder.some(slot => slot.ref === sp)) {
                    this._initiativeOrder.splice(this._initTurnIdx + 1, 0,
                        { kind: 'party', ref: sp, init: baseInit, skipThisRound: false });
                    this._addLog(`⚡ ${sp.name} joins the fray!`);
                }
            }
        }
        this._advancePlayerTurn();
    }

    /** Legacy alias — old saves / code paths may call summonSkeleton(). */
    summonSkeleton() { this.summonUndead(0); }

    summonDemiLich() {
        const m = this.currentMember;
        if (!m || m.health <= 0 || m.classId !== 'necromancer') return;
        if (m.level < NECRO_DEMI_LICH_UNLOCK_LEVEL) {
            this._addLog(`${m.name} must reach level ${NECRO_DEMI_LICH_UNLOCK_LEVEL} to summon a Demi-Lich.`);
            return;
        }
        if (!m.isLichForm) {
            this._addLog(`${m.name} must be in Lich Form to summon a Demi-Lich.`);
            return;
        }
        if (m.mana < NECRO_DEMI_LICH_MANA_COST) {
            this._addLog(`${m.name} needs ${NECRO_DEMI_LICH_MANA_COST} MP to summon a Demi-Lich.`);
            return;
        }

        m.mana -= NECRO_DEMI_LICH_MANA_COST;
        const magicBonus = m.getWeaponBonus('magic') + m.getClassDamageBonus('magic');
        const maxHp = Math.max(1, m.health);
        const defense = NECRO_DEMI_LICH_DEFENSE_BASE + m.level * NECRO_DEMI_LICH_DEFENSE_PER_LEVEL;
        const demiNum = this.party.filter(p => p.isSummoned && p.summonType === 'demi_lich' && p.summonerId === m.id).length + 1;
        const dl = new PartyMember({
            name: `${m.name}'s Demi-Lich #${demiNum}`,
            classId: 'necromancer',
            speciesId: 'human',
            level: m.level,
            maxHealth: maxHp,
            maxStamina: 0,
            maxMana: 0,
            portraitSeed: Math.floor(Math.random() * 100000),
            isSummoned: true,
            summonType: 'demi_lich',
            summonerId: m.id,
            canBeHealed: false,
            row: 'back',
            summonStats: {
                defense,
                magicMin: MAGIC_DAMAGE_MIN + magicBonus + m.level * NECRO_DEMI_LICH_DAMAGE_PER_LEVEL,
                magicMax: MAGIC_DAMAGE_MAX + magicBonus + m.level * NECRO_DEMI_LICH_DAMAGE_PER_LEVEL,
                necroLevel: m.level,
                demiLich: true,
                immune: ['stun', 'web', 'hold', 'poison'],
            },
        });
        this.party.push(dl);
        this._registerNewSummon(dl);
        this._addLog(`💀 ${m.name} calls forth a Demi-Lich! (HP:${maxHp} Def:${defense}, back row)`);
        this._advancePlayerTurn();
    }

    rangerSetTotem(totem) {
        const m = this.currentMember;
        if (!m || m.health <= 0 || m.classId !== 'ranger' || m.level < RANGER_TOTEM_UNLOCK_LEVEL) return;
        const valid = ['wolf', 'bear', 'eagle', 'pixie'];
        if (!valid.includes(totem)) return;
        if (m.mana < RANGER_TOTEM_MANA_PER_ROUND && m.rangerTotem !== totem) {
            this._addLog(`${m.name} needs ${RANGER_TOTEM_MANA_PER_ROUND} MP to awaken a totem.`);
            return;
        }
        m.rangerTotem = totem;
        const names = { wolf: 'Wolf', bear: 'Bear', eagle: 'Eagle', pixie: 'Pixie' };
        this._addLog(`🪶 ${m.name} channels the ${names[totem]} Totem. (free action, ${RANGER_TOTEM_MANA_PER_ROUND} MP/round)`);
        this._notify();
    }

    /**
     * Ranger L30 Hunter's Mark — free action (does not consume turn).
     * Places a mark on a target; marked target takes +15% damage from all sources.
     * Costs 5 ST + 5 MP to place; 3 MP + 3 ST/round upkeep.
     * If the ranger kills the marked target, they gain a bonus turn.
     */
    rangerHuntersMark(targetEnemy) {
        const m = this.currentMember;
        if (!m || m.health <= 0 || m.classId !== 'ranger') return;
        if (m.level < RANGER_HUNTERS_MARK_UNLOCK_LEVEL) {
            this._addLog(`${m.name} must reach level ${RANGER_HUNTERS_MARK_UNLOCK_LEVEL} to use Hunter's Mark.`);
            return;
        }
        if (!targetEnemy || targetEnemy.health <= 0) {
            this._addLog(`No valid target for Hunter's Mark.`);
            return;
        }
        if (m.stamina < RANGER_HUNTERS_MARK_STAMINA_COST || m.mana < RANGER_HUNTERS_MARK_MANA_COST) {
            this._addLog(`${m.name} needs ${RANGER_HUNTERS_MARK_STAMINA_COST} ST and ${RANGER_HUNTERS_MARK_MANA_COST} MP to place Hunter's Mark.`);
            return;
        }
        // Remove existing mark from previous target (if any)
        // Remove only this ranger's previous mark (other rangers' marks on the same enemy are unaffected)
        if (m.hunterMarkEnemyId) {
            const oldTarget = this.enemies.find(e => e.id === m.hunterMarkEnemyId);
            if (oldTarget) oldTarget.activeEffects = (oldTarget.activeEffects || []).filter(
                fx => fx && !(fx.type === 'hunters_mark' && fx.markerId === m.id)
            );
        }
        m.stamina -= RANGER_HUNTERS_MARK_STAMINA_COST;
        m.mana    -= RANGER_HUNTERS_MARK_MANA_COST;
        m.hunterMarkEnemyId = targetEnemy.id;
        targetEnemy.activeEffects = targetEnemy.activeEffects || [];
        targetEnemy.activeEffects.push({ type: 'hunters_mark', markerId: m.id });
        const _hmTotalMarks = targetEnemy.activeEffects.filter(fx => fx && fx.type === 'hunters_mark').length;
        const _hmTotalPct = Math.round(_hmTotalMarks * RANGER_HUNTERS_MARK_DAMAGE_BONUS * 100);
        const _hmStackNote = _hmTotalMarks > 1 ? ` (×${_hmTotalMarks} marks stacked — total +${_hmTotalPct}%)` : ` (+${_hmTotalPct}% incoming damage)`;
        this._addLog(`🎯 ${m.name} places Hunter's Mark on ${this._eName(targetEnemy)}!${_hmStackNote}`);
        this._notify();
    }

    /**
     * Ranger L30 Beastlord Toggle — free action (does not consume turn).
     * When active: each round auto-rolls (level/2+10)% chance to summon a random beast.
     * Costs 5 MP/round base + 1 MP/round per beastlord-summoned beast alive.
     */
    rangerToggleBeastlord() {
        const m = this.currentMember;
        if (!m || m.health <= 0 || m.classId !== 'ranger') return;
        if (m.level < RANGER_BEASTLORD_UNLOCK_LEVEL) {
            this._addLog(`${m.name} must reach level ${RANGER_BEASTLORD_UNLOCK_LEVEL} to use Beastlord.`);
            return;
        }
        if (m.beastlordActive) {
            m.beastlordActive = false;
            this._addLog(`🦎 ${m.name} releases the Beastlord bond.`);
            this._notify();
            return;
        }
        if (m.mana < RANGER_BEASTLORD_MANA_PER_ROUND) {
            this._addLog(`${m.name} needs at least ${RANGER_BEASTLORD_MANA_PER_ROUND} MP to activate Beastlord.`);
            return;
        }
        m.beastlordActive = true;
        const pct = Math.floor(m.level / 2) + RANGER_BEASTLORD_SUMMON_BASE;
        this._addLog(`🦎 ${m.name} awakens as Beastlord! (${pct}% auto-summon chance per round, ${RANGER_BEASTLORD_MANA_PER_ROUND} MP/round base)`);
        this._notify();
    }

    /**
     * Internal: auto-summon a random beast for beastlord (no mana cost, no turn advance).
     */
    _beastlordAutoSummon(ranger) {
        const pool = ['wolf', 'bear', 'eagle', 'pixie'];
        const beastId = pool[Math.floor(Math.random() * pool.length)];
        const preset = BEAST_TYPES[beastId];
        if (!preset) return;
        const stats = rollBeastStats(beastId, ranger.level);
        // Level-10+ upgrade roll
        let upgradeName = null;
        if (ranger.level >= 10) {
            const upgradeChance = 0.25 + Math.max(0, ranger.level - 10) * 0.02;
            if (Math.random() < upgradeChance) {
                if (beastId === 'bear')  {
                    upgradeName = 'giant_bear';
                    stats.meleeMin  = (stats.meleeMin  || 0) + ranger.level + Math.floor(ranger.level / 3);
                    stats.meleeMax  = (stats.meleeMax  || 0) + ranger.level + Math.floor(ranger.level / 3);
                    stats.maxHealth = Math.round((stats.maxHealth || 0) * 1.25);
                }
                if (beastId === 'eagle') {
                    upgradeName = 'golden_eagle';
                    stats.rangedMin = (stats.rangedMin || 0) + ranger.level;
                    stats.rangedMax = (stats.rangedMax || 0) + ranger.level;
                    stats.defense   = (stats.defense   || 0) + 5;
                    stats.maxHealth = Math.round((stats.maxHealth || 0) * 1.25);
                }
                if (beastId === 'pixie') {
                    upgradeName = 'pixie_princess';
                    stats.magicMin = (stats.magicMin || 0) + ranger.level;
                    stats.magicMax = (stats.magicMax || 0) + ranger.level;
                    stats.defense  = (stats.defense  || 0) + 3;
                }
            }
        }
        // Wolf pack for wolves
        const UPGRADE_LABELS_BL = { giant_bear: 'Giant Bear', golden_eagle: 'Golden Eagle', pixie_princess: 'Pixie Princess' };
        const displayName = upgradeName ? `${ranger.name}'s ${UPGRADE_LABELS_BL[upgradeName]}` : `${ranger.name}'s ${preset.name}`;
        const beastNum = this.party.filter(p => p.isSummoned && p.summonType === preset.id && p.summonerId === ranger.id).length + 1;
        const beast = new PartyMember({
            name: `${ranger.name}'s ${preset.name} #${beastNum}`,
            classId:   preset.portraitClass,
            speciesId: preset.portraitSpecies,
            level:     ranger.level,
            maxHealth: stats.maxHealth,
            maxStamina: stats.maxStamina,
            maxMana:    stats.maxMana,
            portraitSeed: Math.floor(Math.random() * 100000),
            isSummoned: true,
            summonType: preset.id,
            summonerId: ranger.id,
            canBeHealed: true,
            row: (beastId === 'bear' || beastId === 'wolf') ? 'front' : 'back',
            summonStats: {
                meleeMin: stats.meleeMin, meleeMax: stats.meleeMax,
                rangedMin: stats.rangedMin, rangedMax: stats.rangedMax,
                magicMin: stats.magicMin, magicMax: stats.magicMax,
                defense: stats.defense, baseDefense: stats.baseDefense,
                baseMaxHealth: stats.baseMaxHealth, stunChance: stats.stunChance,
                beastKind: beastId, beastlordSummoned: true,
                stunResistChance: stats.stunResistChance ?? 0,
                ...(upgradeName ? { upgradeName, upgradeBonus: ranger.level * 0.01 } : {}),
            },
        });
        this.party.push(beast);
        this._registerNewSummon(beast);
        if (upgradeName) {
            this._addLog(`🦎✨ ${preset.icon} Beastlord summons a rare ${UPGRADE_LABELS_BL[upgradeName]}!`);
        } else {
            this._addLog(`🦎 ${preset.icon} Beastlord summons ${displayName}!`);
        }
        // Wolf pack cascade for beastlord wolves
        if (beastId === 'wolf' && ranger.level >= 10) {
            let extraCount = 0;
            let baseChance = 0.40;
            const levelBonus = Math.max(0, ranger.level - 9) * 0.01;
            while (true) {
                const chance = Math.min(1, baseChance + levelBonus);
                if (chance <= 0) break;
                if (Math.random() >= chance) break;
                const beastNum2 = this.party.filter(p => p.isSummoned && p.summonType === preset.id && p.summonerId === ranger.id).length + 1;
                const packWolf = new PartyMember({
                    name: `${ranger.name}'s ${preset.name} #${beastNum2}`,
                    classId: preset.portraitClass, speciesId: preset.portraitSpecies,
                    level: ranger.level, maxHealth: stats.maxHealth, maxStamina: stats.maxStamina, maxMana: stats.maxMana,
                    portraitSeed: Math.floor(Math.random() * 100000),
                    isSummoned: true, summonType: preset.id, summonerId: ranger.id, canBeHealed: true, row: 'front',
                    summonStats: { meleeMin: stats.meleeMin, meleeMax: stats.meleeMax, rangedMin: stats.rangedMin, rangedMax: stats.rangedMax,
                        magicMin: stats.magicMin, magicMax: stats.magicMax, defense: stats.defense, baseDefense: stats.baseDefense,
                        baseMaxHealth: stats.baseMaxHealth, stunChance: stats.stunChance, beastKind: beastId, beastlordSummoned: true },
                });
                this.party.push(packWolf);
                this._registerNewSummon(packWolf);
                extraCount++;
                baseChance -= 0.05;
            }
            if (extraCount > 0) this._addLog(`🐺 Beastlord wolf pack: ${1 + extraCount} wolves answer the call!`);
        }
    }

    /**
     * Internal: check if a just-killed enemy was the ranger's Hunter's Mark target.
     * If so, grant that ranger a bonus turn.
     */
    _checkHunterMarkKill(enemy) {
        if (!enemy || enemy.health > 0) return;
        const marks = (enemy.activeEffects || []).filter(fx => fx && fx.type === 'hunters_mark');
        for (const mark of marks) {
            const ranger = this.party.find(p => p.id === mark.markerId && p.health > 0);
            if (!ranger) continue;
            ranger.hunterMarkEnemyId = null;
            if (this.currentMember === ranger) ranger.bonusTurnPending = true;
        }
    }
    monkToggleAvatar() {
        const m = this.currentMember;
        if (!m || m.health <= 0 || m.classId !== 'monk' || m.level < MONK_AVATAR_UNLOCK_LEVEL) return;
        if (m.avatarActive) {
            m.avatarActive = false;
            this._addLog(`🧘 ${m.name} releases Avatar form.`);
            this._notify();
            return;
        }
        if (m.mana < MONK_AVATAR_MANA_PER_ROUND) {
            this._addLog(`${m.name} needs ${MONK_AVATAR_MANA_PER_ROUND} MP to enter Avatar form.`);
            return;
        }
        m.avatarActive = true;
        m.avatarElement = m.avatarElement || 'fire';
        this._addLog(`🧘 ${m.name} enters Avatar form! (${MONK_AVATAR_MANA_PER_ROUND} MP/round)`);
        this._notify();
    }

    monkSetAvatarElement(element) {
        const m = this.currentMember;
        if (!m || m.classId !== 'monk' || m.level < MONK_AVATAR_UNLOCK_LEVEL) return;
        const valid = ['fire', 'lightning', 'acid', 'ice'];
        if (!valid.includes(element)) return;
        m.avatarElement = element;
        this._addLog(`🧘 ${m.name}'s Avatar attunes to ${element}.`);
        this._notify();
    }

    /**
     * Ranger OR druid summon — wolf / bear / eagle / pixie / treant.
     *
     * Level-10+ upgrades (ranger or druid):
     *   Wolf  — pack cascade: 40% chance for a 2nd wolf, -5%/wolf, +1%/lvl above 9.
     *   Bear  — 10% + 1%/lvl above 10 → Giant Bear (+lvl melee dmg, +lvl% stun).
     *   Eagle — 10% + 1%/lvl above 10 → Golden Eagle (+lvl ranged dmg, +lvl% crit).
     *   Pixie — 10% + 1%/lvl above 10 → Pixie Princess (+lvl magic dmg, +lvl% dodge).
     *   Treant— 10% + 1%/lvl above 10 → Elder Treant (+lvl melee dmg, +lvl% hold).
     *
     * @param {'wolf'|'bear'|'eagle'|'pixie'|'treant'} beastId
     */
    summonBeast(beastId) {
        const m = this.currentMember;
        if (!m || m.health <= 0) return;
        if (m.classId !== 'ranger' && m.classId !== 'druid') return;
        let cost = m.classId === 'druid' ? DRUID_SUMMON_MANA_COST : RANGER_SUMMON_MANA_COST;
        const preset = BEAST_TYPES[beastId];
        if (!preset) return;

        // Vampire bat is exclusively summoned by necromancer vampires, not by rangers/druids.
        if (beastId === 'vampire_bat') {
            this._addLog(`Only a vampire can summon a Vampire Bat.`);
            return;
        }

        // Treant is druid-only and requires level 5.
        if (beastId === 'treant') {
            if (m.classId !== 'druid') {
                this._addLog(`Only a druid can call upon a Treant.`);
                return;
            }
            if (m.level < 5) {
                this._addLog(`${m.name} must reach druid level 5 to summon a Treant.`);
                return;
            }
        }

        if (beastId === 'shambling_mound') {
            if (m.classId !== 'druid') {
                this._addLog('Only a druid can call upon a Shambling Mound.');
                return;
            }
            if (m.level < DRUID_SHAMBLING_MOUND_UNLOCK_LEVEL) {
                this._addLog(`${m.name} must reach druid level ${DRUID_SHAMBLING_MOUND_UNLOCK_LEVEL} to summon a Shambling Mound.`);
                return;
            }
            cost = DRUID_SHAMBLING_MOUND_MANA_COST;
            const cap = this._getShamblingMoundCap(m);
            const currentMounds = this._getLivingShamblingMoundsFor(m).length;
            if (currentMounds >= cap) {
                this._addLog(`${m.name} is already maintaining ${currentMounds}/${cap} Shambling Mounds.`);
                return;
            }
        }

        if (m.mana < cost) {
            this._addLog(`${m.name} has too little mana to summon (needs ${cost}).`);
            return;
        }

        const stats = rollBeastStats(beastId, m.level);
        if (beastId === 'shambling_mound') {
            stats.maxHealth = Math.max(1, m.maxHealth * 4);
            stats.maxStamina = 0;
            stats.maxMana = 0;
            stats.meleeMin = MELEE_DAMAGE_MIN + m.level * 2;
            stats.meleeMax = MELEE_DAMAGE_MAX + m.level * 2;
            stats.defense = 20 + m.level;
            stats.baseDefense = stats.defense;
            stats.baseMaxHealth = stats.maxHealth;
            stats.shamblingGrowthStage = 3;
            stats.stunChance = 0.45;
        }
        m.mana -= cost;

        // ── Level-10+ upgrades for single-beast summons (bear/eagle/pixie/treant) ──
        // upgradeChance = 25% base + 2% per summoner level above 10.
        let upgradeName = null;
        let upgradeBonus = 0; // stored in summonStats for combat use (% as decimal)
        if (m.level >= 10 && beastId !== 'wolf' && beastId !== 'shambling_mound') {
            const lvl = m.level;
            const upgradeChance = 0.25 + Math.max(0, lvl - 10) * 0.02;
            if (Math.random() < upgradeChance) {
                upgradeBonus = lvl * 0.01;
                if (beastId === 'bear') {
                    upgradeName = 'giant_bear';
                    stats.meleeMin  = (stats.meleeMin  || 0) + lvl + Math.floor(lvl / 3);
                    stats.meleeMax  = (stats.meleeMax  || 0) + lvl + Math.floor(lvl / 3);
                    stats.maxHealth = Math.round((stats.maxHealth || 0) * 1.25);
                } else if (beastId === 'eagle') {
                    upgradeName = 'golden_eagle';
                    stats.rangedMin = (stats.rangedMin || 0) + lvl;
                    stats.rangedMax = (stats.rangedMax || 0) + lvl;
                    stats.defense   = (stats.defense   || 0) + 5;
                    stats.maxHealth = Math.round((stats.maxHealth || 0) * 1.25);
                } else if (beastId === 'pixie') {
                    upgradeName = 'pixie_princess';
                    stats.magicMin = (stats.magicMin || 0) + lvl;
                    stats.magicMax = (stats.magicMax || 0) + lvl;
                    stats.defense  = (stats.defense  || 0) + 3;
                } else if (beastId === 'treant') {
                    upgradeName = 'elder_treant';
                    stats.meleeMin = (stats.meleeMin || 0) + lvl;
                    stats.meleeMax = (stats.meleeMax || 0) + lvl;
                }
            }
        }

        // Map upgrade keys to display names.
        const UPGRADE_LABELS = {
            giant_bear:    'Giant Bear',
            golden_eagle:  'Golden Eagle',
            pixie_princess:'Pixie Princess',
            elder_treant:  'Elder Treant',
        };
        const displayName = upgradeName
            ? `${m.name}'s ${UPGRADE_LABELS[upgradeName]}`
            : `${m.name}'s ${preset.name}`;

        // ── Helper: create and register one beast with the current stats ──────
        const _spawnOne = () => {
            const beastNum = this.party.filter(p => p.isSummoned && p.summonType === preset.id && p.summonerId === m.id).length + 1;
            const beast = new PartyMember({
                name: `${m.name}'s ${preset.name} #${beastNum}`,
                classId:   preset.portraitClass,
                speciesId: preset.portraitSpecies,
                level:     m.level,
                maxHealth: stats.maxHealth,
                maxStamina: stats.maxStamina,
                maxMana:    stats.maxMana,
                portraitSeed: Math.floor(Math.random() * 100000),
                isSummoned: true,
                summonType: preset.id,
                summonerId: m.id,
                canBeHealed: true,
                row: (beastId === 'bear' || beastId === 'wolf' || beastId === 'treant' || beastId === 'shambling_mound') ? 'front' : 'back',
                summonStats: {
                    meleeMin:  stats.meleeMin,  meleeMax:  stats.meleeMax,
                    rangedMin: stats.rangedMin, rangedMax: stats.rangedMax,
                    magicMin:  stats.magicMin,  magicMax:  stats.magicMax,
                    defense:   stats.defense,
                    baseDefense: stats.baseDefense,
                    baseMaxHealth: stats.baseMaxHealth,
                    shamblingGrowthStage: stats.shamblingGrowthStage,
                    ...(beastId === 'shambling_mound' ? { canSpawnMini: true } : {}),
                    stunChance: stats.stunChance,
                    beastKind: beastId,
                    stunResistChance: stats.stunResistChance ?? 0,
                    ...(beastId === 'shambling_mound' ? { summonedRound: this.turnNumber } : {}),
                    // Upgrade bonus stored here for use at combat time.
                    ...(upgradeName ? { upgradeName, upgradeBonus } : {}),
                },
            });
            this.party.push(beast);
            this._registerNewSummon(beast);
            return beast;
        };

        // ── Summon the first beast ────────────────────────────────────────────
        const firstBeast = _spawnOne();

        if (upgradeName) {
            const label = UPGRADE_LABELS[upgradeName];
            this._addLog(`${preset.icon} ${m.name} summons a rare ${label}!`);
        } else {
            this._addLog(`${preset.icon} ${m.name} summons a ${preset.name}!`);
        }

        // ── Wild Shape: if druid is in matching form, apply buff to new summon + summon an extra ──
        if (m.classId === 'druid' && m.wildShapeForm === beastId) {
            this._applySingleSummonWildShapeBuff(m, firstBeast);
            const bonusBeast = _spawnOne();
            this._applySingleSummonWildShapeBuff(m, bonusBeast);
            this._addLog(`${preset.icon} Wild Shape resonance — an extra ${preset.name} joins the call!`);
        }

        // ── Wolf pack cascade (level 10+): 40% → 35% → … chance for extra wolves ──
        // In Wolf Form, base cascade chance is 65% instead of 40%.
        if (beastId === 'wolf' && m.level >= 10) {
            let extraCount = 0;
            const inWolfForm = m.classId === 'druid' && m.wildShapeForm === 'wolf';
            let baseChance = inWolfForm ? DRUID_WILD_WOLF_CASCADE_BASE : 0.40;
            // +1% per level above 9 (so level 10 = +1%, level 20 = +11%, etc.)
            const levelBonus = Math.max(0, m.level - 9) * 0.01;
            while (true) {
                const chance = Math.min(1, baseChance + levelBonus);
                if (chance <= 0) break;
                if (Math.random() >= chance) break;
                const extraWolf = _spawnOne();
                if (inWolfForm) this._applySingleSummonWildShapeBuff(m, extraWolf);
                extraCount++;
                baseChance -= 0.05;
            }
            if (extraCount === 1) {
                this._addLog(`\u{1F43A}\u{1F43A} The pack grows — a second wolf answers the call!`);
            } else if (extraCount > 1) {
                this._addLog(`\u{1F43A}✨ A PACK RISES! ${m.name} summons ${1 + extraCount} wolves at once!`);
            }
        }

        this._advancePlayerTurn();
    }

    /** Apply Wild Shape buff to a single newly-summoned beast. */
    _applySingleSummonWildShapeBuff(druid, beast) {
        if (!druid || !beast || !beast.summonStats) return;
        const form    = druid.wildShapeForm;
        const dmgMult = (form === 'pixie') ? DRUID_WILD_SUMMON_DMG_MULT_PIXIE : DRUID_WILD_SUMMON_DMG_MULT;
        const defDiv  = (form === 'pixie') ? DRUID_WILD_SUMMON_DEF_DIVISOR_PIXIE : DRUID_WILD_SUMMON_DEF_BONUS_DIVISOR;
        const defBonus = Math.floor((druid.level || 1) / defDiv);
        const s = beast.summonStats;
        s.wildShapeDmgMult     = dmgMult;
        s.wildShapeDefBonus    = defBonus;
        s.wildShapeExtraAttack = true;
        s.defense              = (s.defense || 0) + defBonus;
    }

    /**
     * Called when a vampire summons a wolf or vampire bat.
     * Uses the vampire's summoner (necromancer) level for scaling.
     * No mana cost — the vampire paid by summoning during its turn.
     *
     * @param {'wolf'|'vampire_bat'} beastId
     */
    summonBeastFromVampire(beastId, vampire) {
        if (!vampire) vampire = this.currentMember;
        if (!vampire || vampire.summonType !== 'vampire' || vampire.health <= 0) return;

        const necromancer = this.party.find(p => p.id === vampire.summonerId);
        if (!necromancer) return;

        const preset = BEAST_TYPES[beastId];
        if (!preset) return;

        const stats = rollBeastStats(beastId, necromancer.level);

        // Vampire bat is back-row; wolf is front-row
        const row = beastId === 'vampire_bat' ? 'back' : 'front';
        const vampBeastNum = this.party.filter(p => p.isSummoned && p.summonType === beastId && p.summonerId === vampire.id).length + 1;
        const displayName = `${vampire.name}'s ${preset.name} #${vampBeastNum}`;
        const beast = new PartyMember({
            name: displayName,
            classId:   preset.portraitClass,
            speciesId: preset.portraitSpecies,
            level:     necromancer.level,
            maxHealth: stats.maxHealth,
            maxStamina: stats.maxStamina,
            maxMana:    stats.maxMana,
            portraitSeed: Math.floor(Math.random() * 100000),
            isSummoned: true,
            summonType: preset.id,
            summonerId: vampire.id, // the VAMPIRE owns this beast, not the necromancer directly
            canBeHealed: true,
            row,
            summonStats: {
                meleeMin:  stats.meleeMin,  meleeMax:  stats.meleeMax,
                rangedMin: stats.rangedMin, rangedMax: stats.rangedMax,
                magicMin:  stats.magicMin,  magicMax:  stats.magicMax,
                defense:   stats.defense,
                baseDefense: stats.baseDefense,
                baseMaxHealth: stats.baseMaxHealth,
                stunChance: stats.stunChance,
                beastKind: beastId,
                vampireBeast: true, // flag to identify vampire-spawned beasts
                vampireNecromancer: necromancer.id, // track the original necromancer for mana upkeep
            },
        });

        this.party.push(beast);
        this._registerNewSummon(beast);
        this._addLog(`${preset.icon} ${vampire.name} summons a ${preset.name}!`);
    }

    /**
     * Artificer golem summon — PERSISTENT. One golem per artificer at a time.
     * Costs gold + reagents (per GOLEM_TIERS[tier].cost) paid from group inventory.
     * Golem stats scale with artificer level. Only the owning artificer can heal it.
     *
     * Also callable out-of-combat via the Crafting UI: in that case `this.party`
     * may be empty, so the caller passes `artificerMember` explicitly.
     *
     * @param {string} tierId   'flesh' | 'clay' | 'stone' | 'iron'
     * @param {PartyMember}  [artificerMember]  optional — defaults to currentMember
     * @param {boolean}      [spendTurn=true]   if false, do not advance combat turn
     * @param {Inventory}    [inventoryOverride] optional — falls back to this.inventory
     * @returns {null|PartyMember}  the new golem, or null on failure
     */
    summonGolem(tierId, artificerMember = null, spendTurn = true, inventoryOverride = null) {
        const m = artificerMember || this.currentMember;
        if (!m || m.health <= 0) {
            this._addLog('Cannot summon a golem — artificer is unavailable.');
            return null;
        }
        if (m.classId !== 'artificer') {
            this._addLog(`${m.name} is not an Artificer — only Artificers can forge golems.`);
            return null;
        }
        const tier = GOLEM_TIERS.find(t => t.id === tierId);
        if (!tier) return null;
        if (m.level < tier.unlockLevel) {
            this._addLog(`${m.name} is too low-level to forge a ${tier.name} (requires L${tier.unlockLevel}).`);
            return null;
        }
        // Multi Golem Protocol (L30+): max golems scales with artificer level
        const activeGolems = (this.party || []).filter(p =>
            p && p.isSummoned && p.summonerId === m.id && p.summonStats && p.summonStats.tierId && p.health > 0 && GOLEM_PRESETS[p.summonType]
        ).length;
        const maxGolems = this._getMaxGolems(m.level);
        if (activeGolems >= maxGolems) {
            this._addLog(`${m.name} already commands ${activeGolems} golem${activeGolems > 1 ? 's' : ''} (max: ${maxGolems}). Dismiss or lose one first.`);
            return null;
        }

        const inv = inventoryOverride || this.inventory;
        if (!inv) {
            this._addLog('Cannot access inventory to pay golem costs.');
            return null;
        }
        const cost = tier.cost || {};
        // Verify all costs before charging any of them.
        if ((cost.gold      || 0) > 0 && inv.gold < cost.gold) {
            this._addLog(`Not enough gold to forge a ${tier.name} (needs ${cost.gold}g).`);
            return null;
        }
        if ((cost.common    || 0) > 0 && !inv.hasReagent('common',    cost.common)) {
            this._addLog(`Not enough common reagents (needs ${cost.common}).`);
            return null;
        }
        if ((cost.uncommon  || 0) > 0 && !inv.hasReagent('uncommon',  cost.uncommon)) {
            this._addLog(`Not enough uncommon reagents (needs ${cost.uncommon}).`);
            return null;
        }
        if ((cost.rare      || 0) > 0 && !inv.hasReagent('rare',      cost.rare)) {
            this._addLog(`Not enough rare reagents (needs ${cost.rare}).`);
            return null;
        }
        if ((cost.epic      || 0) > 0 && !inv.hasReagent('epic',      cost.epic)) {
            this._addLog(`Not enough epic reagents (needs ${cost.epic}).`);
            return null;
        }
        if ((cost.legendary || 0) > 0 && !inv.hasReagent('legendary', cost.legendary)) {
            this._addLog(`Not enough legendary reagents (needs ${cost.legendary}).`);
            return null;
        }
        if ((cost.mythic    || 0) > 0 && !inv.hasReagent('mythic',    cost.mythic)) {
            this._addLog(`Not enough mythic reagents (needs ${cost.mythic}).`);
            return null;
        }
        if ((cost.divine    || 0) > 0 && !inv.hasReagent('divine',    cost.divine)) {
            this._addLog(`Not enough divine reagents (needs ${cost.divine}).`);
            return null;
        }

        // Deduct costs (now that all checks passed).
        if ((cost.gold      || 0) > 0) inv.removeGold(cost.gold);
        if ((cost.common    || 0) > 0) inv.removeReagent('common',    cost.common);
        if ((cost.uncommon  || 0) > 0) inv.removeReagent('uncommon',  cost.uncommon);
        if ((cost.rare      || 0) > 0) inv.removeReagent('rare',      cost.rare);
        if ((cost.epic      || 0) > 0) inv.removeReagent('epic',      cost.epic);
        if ((cost.legendary || 0) > 0) inv.removeReagent('legendary', cost.legendary);
        if ((cost.mythic    || 0) > 0) inv.removeReagent('mythic',    cost.mythic);
        if ((cost.divine    || 0) > 0) inv.removeReagent('divine',    cost.divine);

        const preset = GOLEM_PRESETS[tierId];
        const stats = rollGolemStats(tierId, m.level);

        const golem = new PartyMember({
            name: `${m.name}'s ${tier.name}`,
            classId:   preset.portraitClass,
            speciesId: preset.portraitSpecies,
            level:     m.level, // golem level = artificer level
            maxHealth: stats.maxHealth,
            maxStamina: 0,
            maxMana:    0,
            portraitSeed: Math.floor(Math.random() * 100000),
            isSummoned: true,
            isPersistent: true,                // survives combat/rest/travel/save
            summonType: tier.id,
            summonerId: m.id,
            canBeHealed: false,                // only artificer heals via healGolem
            row: 'front',
            summonStats: {
                meleeMin:        stats.meleeMin,
                meleeMax:        stats.meleeMax,
                defense:         stats.defense,
                baseDefense:     stats.defense,
                baseMaxHealth:   stats.maxHealth,
                tierId:          stats.tierId,
                artificerLevel:  stats.artificerLevel,
                regenPercent:    stats.regenPercent,
                reflectChance:   stats.reflectChance,
                reflectFraction: stats.reflectFraction,
                slamEvery:       stats.slamEvery,
                slamStunChance:  stats.slamStunChance,
                cleaveTargets:   stats.cleaveTargets,
                drainOnKill:     stats.drainOnKill,
                forceAoe:        stats.forceAoe,
                adamantineBolts: stats.adamantineBolts,
                halfDmgSpecial:  stats.halfDmgSpecial,
                divineSoul:      stats.divineSoul,
                immune:          stats.immune,
                attachments:     { limbs: 0, shield: false, trinkets: 0 },
                slamCounter:     0, // internal counter for stone slam cadence
            },
        });
        // Full HP on spawn.
        golem.health = golem.maxHealth;

        if (Array.isArray(this.party)) this.party.push(golem);
        this._emitTelemetry('golemForged', { member: m, tierId: tier.id, golem });
        this._addLog(`${tier.icon} ${m.name} forges a ${tier.name}! It thunders into line.`);

        if (spendTurn && this.party && this.party.length) {
            this._registerNewSummon(golem);
            this._advancePlayerTurn();
        }
        return golem;
    }

    /**
     * Artificer heal on their own golem. Usually costs 1 reagent of the golem's
     * tier, but has an artificer-level free repair chance.
     * Restores ARTIFICER_HEAL_GOLEM_PCT (50%) of the golem's max HP.
     * Can be used in or out of combat; pass `spendTurn=false` from the UI
     * when used out of combat.
     *
     * @param {PartyMember} golemMember
     * @param {PartyMember} [artificerMember]
     * @param {boolean}     [spendTurn=true]
     * @returns {boolean}   true on success
     */
    healGolem(golemMember, artificerMember = null, spendTurn = true) {
        const m = artificerMember || this.currentMember;
        if (!m || m.health <= 0) return false;
        if (m.classId !== 'artificer') {
            this._addLog(`${m.name} cannot channel the Artificer's forge.`);
            return false;
        }
        if (!golemMember || !golemMember.isSummoned || !golemMember.summonStats ||
            !golemMember.summonStats.tierId || !GOLEM_PRESETS[golemMember.summonType]) {
            this._addLog('Target is not a golem.');
            return false;
        }
        if (golemMember.summonerId !== m.id) {
            this._addLog(`${m.name} cannot repair another Artificer's golem.`);
            return false;
        }
        if (golemMember.health <= 0) {
            this._addLog(`The ${golemMember.name} lies broken — it cannot be repaired.`);
            return false;
        }
        if (golemMember.golemBerserkActive) {
            this._addLog(`${m.name} cannot repair a golem in Berserk Mode — disengage first!`);
            return false;
        }

        const tierId = golemMember.summonStats.tierId;
        const tier = GOLEM_TIERS.find(t => t.id === tierId);
        const reagentTier = (tier && tier.reagentTier) || 'common';
        const reagentId = `reagent_${reagentTier}`;
        const freeChance = Math.min(1, Math.max(0, (m.level || 1) * ARTIFICER_FREE_REPAIR_CHANCE_PER_LEVEL));
        const freeRepair = Math.random() < freeChance;

        const inv = this.inventory;
        if (!freeRepair && (!inv || !inv.hasItem(reagentId, 1))) {
            this._addLog(`${m.name} needs 1 ${reagentTier} reagent to repair the ${tier ? tier.name : 'golem'}.`);
            return false;
        }
        if (!freeRepair) inv.removeItem(reagentId, 1);

        const heal = Math.max(1, Math.floor(golemMember.maxHealth * ARTIFICER_HEAL_GOLEM_PCT));
        const before = golemMember.health;
        golemMember.health = Math.min(golemMember.maxHealth, golemMember.health + heal);
        const dealt = golemMember.health - before;
        const costMsg = freeRepair
            ? `forge insight: no ${reagentTier} reagent spent`
            : `spent 1 ${reagentTier} reagent`;
        this._addLog(`\u{1F527} ${m.name} repairs the ${tier ? tier.name : 'golem'} for ${dealt} HP (${costMsg}).`);

        if (spendTurn && this.party && this.party.length) this._advancePlayerTurn();
        return true;
    }

    // ── Artificer L30: Multi Golem Protocol ──────────────────────────────────
    _getMaxGolems(artificerLevel) {
        if (artificerLevel >= 90) return 5;
        if (artificerLevel >= 70) return 4;
        if (artificerLevel >= 50) return 3;
        if (artificerLevel >= ARTIFICER_MULTI_GOLEM_UNLOCK_LEVEL) return 2;
        return 1;
    }

    // ── Artificer L30: Golem Berserk Mode ────────────────────────────────────
    golemBerserkOn(golemMember) {
        const m = this.currentMember;
        if (!m || m.health <= 0) return;
        if (m.classId !== 'artificer') return;
        if (m.level < ARTIFICER_BERSERK_UNLOCK_LEVEL) {
            this._addLog(`${m.name} needs to reach level ${ARTIFICER_BERSERK_UNLOCK_LEVEL} to use Golem Berserk Mode.`);
            return;
        }
        if (!golemMember || !golemMember.isSummoned || !GOLEM_PRESETS[golemMember.summonType]) {
            this._addLog(`${m.name}: that is not a valid golem!`);
            return;
        }
        if (golemMember.summonerId !== m.id) {
            this._addLog(`${m.name} cannot command another artificer's golem.`);
            return;
        }
        if (golemMember.health <= 0) {
            this._addLog(`${m.name} cannot activate Berserk Mode on a destroyed golem.`);
            return;
        }
        if (golemMember.golemBerserkActive) {
            this._addLog(`⚡ ${golemMember.name} is already in Berserk Mode!`);
            return;
        }
        if (golemMember.golemBerserkUsed) {
            this._addLog(`⚙️ ${golemMember.name} has already spent its Berserk charge this combat.`);
            return;
        }
        golemMember.golemBerserkActive = true;
        this._addLog(`⚡⚙️ ${m.name} overclocks ${golemMember.name} — BERSERK MODE ENGAGED! Damage x(1+level*${ARTIFICER_BERSERK_DMG_PER_LEVEL}) but ${Math.round(ARTIFICER_BERSERK_OVERLOAD_PCT * 100)}% HP overload per round. Auto-exits at ${Math.round(ARTIFICER_BERSERK_MIN_HP_PCT * 100)}% HP.`);
        // Free action — notify so UI refreshes back to the player action panel.
        this._notify();
    }

    golemBerserkOff(golemMember) {
        const m = this.currentMember;
        if (!m || m.health <= 0) return;
        if (m.classId !== 'artificer') return;
        if (!golemMember || !golemMember.isSummoned || !GOLEM_PRESETS[golemMember.summonType]) {
            this._addLog(`${m.name}: that is not a valid golem!`);
            return;
        }
        if (golemMember.summonerId !== m.id) {
            this._addLog(`${m.name} cannot command another artificer's golem.`);
            return;
        }
        if (!golemMember.golemBerserkActive) {
            this._addLog(`⚙️ ${golemMember.name} is not in Berserk Mode.`);
            return;
        }
        golemMember.golemBerserkActive = false;
        golemMember.golemBerserkUsed   = true;
        this._addLog(`⚙️ ${m.name} disengages ${golemMember.name}'s Berserk Mode. (used for this combat)`);
        // Free action — notify so UI refreshes back to the player action panel.
        this._notify();
    }

    // ── Enemy death hook ─────────────────────────────────────────────────────
    _onEnemyDeath(enemy) {
        this._checkHunterMarkKill(enemy);
        this._maybeFeedCorpseHorror(enemy);
        this._triggerPlagueExplosion(enemy);
        const last = enemy && enemy.id ? this._lastDamageByEnemyId[enemy.id] : null;
        if (enemy && enemy.id) delete this._lastDamageByEnemyId[enemy.id];
        this._emitTelemetry('kill', {
            enemy,
            member: last ? last.member : this.currentMember,
            killSource: last ? last.killSource : 'direct',
        });
        // Heroic Deeds: award token to active L30+ barbarian on each kill
        const killer = this.currentMember;
        if (killer && !killer.isSummoned && killer.classId === 'barbarian'
            && killer.level >= BARBARIAN_HEROIC_DEEDS_UNLOCK_LEVEL && killer.health > 0) {
            killer.heroicDeedTokens = (killer.heroicDeedTokens || 0) + 1;
            this._addLog(`🏆 ${killer.name} earns a Heroic Deed token! (${killer.heroicDeedTokens} total)`);
        }
    }

    // ── Necromancer L30: Dark Apotheosis — Corpse Horror ─────────────────────
    _maybeFeedCorpseHorror(enemy) {
        // Find L30+ necromancers currently in Lich Form with no phylactery remaining
        const necros = (this.party || []).filter(p =>
            p && !p.isSummoned && p.classId === 'necromancer' &&
            p.isLichForm && !p.lichPhial &&
            p.level >= NECRO_DARK_APOTHEOSIS_UNLOCK_LEVEL &&
            p.health > 0
        );
        if (necros.length === 0) return;

        const typeDef = ENEMY_TYPES[enemy.type] || {};
        const tags    = Array.isArray(typeDef.tags) ? typeDef.tags : [];

        // Enemies immune to Dark Apotheosis (can't be stitched into a horror)
        const immuneTags = ['undead', 'construct', 'elemental', 'incorporeal', 'plant', 'demon', 'slime'];
        if (immuneTags.some(t => tags.includes(t))) return;

        // Only the first eligible necromancer stitches the corpse; others stand aside.
        const necro = necros[0];

        // Only one Corpse Horror can exist at a time — all necromancers feed the same one
        const existing = (this.party || []).find(p =>
            p && p.isSummoned && p.summonType === 'corpse_horror' && p.health > 0
        );

        // HP added by this corpse = 2% of the slain enemy's max HP
        const corpseHp = Math.max(1, Math.ceil((enemy.maxHealth || 10) * NECRO_CORPSE_HORROR_HP_FRACTION));

        if (existing) {
            // Strengthen the existing horror
            const oldStat    = existing.summonStats || {};
            const cc         = (oldStat.corpseCount || 1) + 1;
            const newSkill   = necro.level + cc * NECRO_CORPSE_HORROR_SKILL_PER_CORPSE;
            const attackCap  = (necro.level || 1) + NECRO_CORPSE_HORROR_ATTACK_CAP_BONUS;
            const rawAttacks = cc * NECRO_CORPSE_HORROR_ATTACKS_PER_CORPSE;
            const newAttacks = Math.min(rawAttacks, attackCap);
            const baseDef    = Math.max(1, Math.floor(necro.level / NECRO_CORPSE_HORROR_DEF_DIVISOR));
            const newDef     = baseDef + Math.max(0, cc - 1);
            const baseMin    = Math.max(1, Math.floor(necro.level / 6));
            const baseMax    = Math.max(2, Math.floor(necro.level / 3));
            const newMin     = baseMin + Math.floor(cc / 2);
            const newMax     = Math.max(newMin + 1, baseMax + cc);
            existing.maxHealth += corpseHp;
            existing.health     = Math.min(existing.maxHealth, existing.health + corpseHp);
            existing.summonStats = {
                ...oldStat,
                corpseCount: cc,
                meleeSkill: newSkill,
                attackCount: newAttacks,
                rawAttackCount: rawAttacks,
                attackCap,
                necromancerLevel: necro.level,
                meleeMin: newMin,
                meleeMax: newMax,
                defense: newDef,
            };
            const capNote = rawAttacks > newAttacks ? `, attacks capped at ${attackCap}` : '';
            this._addLog(`\u{1FA78}\u{1F480} ${necro.name} stitches ${this._eName(enemy)}'s remains into the Corpse Horror — it swells with new flesh! (now ${existing.health}/${existing.maxHealth} HP, ${cc} corpses, ${newAttacks} atk/rd${capNote}, skill ${newSkill}, DEF ${newDef})`);
        } else {
            // Spawn a new Corpse Horror — 1 corpse
            const necroLvl  = necro.level;
            const baseDef   = Math.max(1, Math.floor(necroLvl / NECRO_CORPSE_HORROR_DEF_DIVISOR));
            const initSkill = necroLvl + NECRO_CORPSE_HORROR_SKILL_PER_CORPSE; // necroLevel + 5
            const horror    = new PartyMember({
                name:        `${necro.name}'s Corpse Horror`,
                classId:     'summoned',
                speciesId:   'undead',
                level:       necroLvl,
                maxHealth:   corpseHp,
                maxStamina:  0,
                maxMana:     0,
                portraitSeed: Math.floor(Math.random() * 100000),
                isSummoned:  true,
                summonType:  'corpse_horror',
                summonerId:  necro.id,
                canBeHealed: false,
                row:         'front',
                summonStats: {
                    corpseCount: 1,
                    meleeMin:    Math.max(1, Math.floor(necroLvl / 6)),
                    meleeMax:    Math.max(2, Math.floor(necroLvl / 3)),
                    meleeSkill:  initSkill,
                    defense:     baseDef,
                    attackCount: NECRO_CORPSE_HORROR_ATTACKS_PER_CORPSE,
                    rawAttackCount: NECRO_CORPSE_HORROR_ATTACKS_PER_CORPSE,
                    attackCap: necroLvl + NECRO_CORPSE_HORROR_ATTACK_CAP_BONUS,
                    necromancerLevel: necroLvl,
                },
            });
            horror.health = corpseHp;
            this.party.push(horror);
            this._registerNewSummon(horror);
            this._addLog(`\u{1F480}\u{1FA78} ${necro.name}'s Dark Apotheosis tears apart ${this._eName(enemy)} — a CORPSE HORROR lurches into being! (${corpseHp} HP, ${NECRO_CORPSE_HORROR_ATTACKS_PER_CORPSE} atk/rd, skill ${initSkill})`);
        }
        this._notify();
    }

    // ── Necromancer L30: Plague Bringer — explosion on plague-infected death ──
    _triggerPlagueExplosion(deadEnemy) {
        if (!(deadEnemy.activeEffects || []).some(fx => fx && fx.type === 'plague_infection')) return;

        const necro = (this.party || []).find(p =>
            p && !p.isSummoned && p.classId === 'necromancer' && p.health > 0
        );
        if (!necro) return;

        const targets = this.aliveHostileEnemies.filter(e => e !== deadEnemy);
        if (targets.length === 0) return;

        const plagueMin = Math.max(1, Math.floor(necro.level * 1.6));
        const plagueMax = Math.max(2, Math.floor(necro.level * 3.2));
        this._addLog(`💀☣️ ${this._eName(deadEnemy)}'s plague erupts — necrotic bile sprays all enemies!`);

        for (const t of targets) {
            if (t.health <= 0) continue;
            const dmg = randomInt(plagueMin, plagueMax);
            this._damageEnemy(t, dmg, true /* ignoreDefense */);
            this._addLog(`  ↪️ ☣️ ${this._eName(t)} takes ${dmg} plague damage!`);
            if (t.health <= 0) {
                this._addLog(`${this._eName(t)} is consumed by the plague!`);
                // Chain reaction: if this enemy also had plague_infection, _deathHandled
                // will have been set by _damageEnemy, so no double-fire.
            }
        }
    }

    // ── Necromancer L30: Plague Bringer spell ────────────────────────────────
    necroPlagueBringer() {
        const m = this.currentMember;
        if (!m || m.health <= 0) return;
        if (m.classId !== 'necromancer') return;
        if (m.level < NECRO_PLAGUE_BRINGER_UNLOCK_LEVEL) {
            this._addLog(`${m.name} needs to reach level ${NECRO_PLAGUE_BRINGER_UNLOCK_LEVEL} to cast Plague Bringer.`);
            return;
        }
        if (m.mana < NECRO_PLAGUE_BRINGER_MANA_COST) {
            this._addLog(`${m.name} lacks the mana to cast Plague Bringer (needs ${NECRO_PLAGUE_BRINGER_MANA_COST} MP).`);
            return;
        }

        m.mana = Math.max(0, m.mana - NECRO_PLAGUE_BRINGER_MANA_COST);

        const immuneTags = ['undead', 'construct', 'elemental', 'incorporeal', 'plant', 'slime'];
        const targets    = this.aliveHostileEnemies.filter(e => {
            const def  = ENEMY_TYPES[e.type] || {};
            const tags = Array.isArray(def.tags) ? def.tags : [];
            return !immuneTags.some(t => tags.includes(t));
        });

        if (targets.length === 0) {
            this._addLog(`💀☣️ ${m.name} casts Plague Bringer — but all enemies are immune!`);
            this._advancePlayerTurn();
            return;
        }

        this._addLog(`💀☣️ ${m.name} unleashes Plague Bringer! Necrotic disease spreads to ${targets.length} enemy${targets.length > 1 ? 's' : ''}! (-${NECRO_PLAGUE_BRINGER_MANA_COST} MP)`);

        const rotDmg  = Math.max(1, Math.floor(m.level * 0.4));

        for (const t of targets) {
            // Apply mummy_rot (permanent DoT)
            t.activeEffects = (t.activeEffects || []).filter(x => x.type !== 'mummy_rot');
            t.activeEffects.push({ type: 'mummy_rot', damage: rotDmg, rounds: 9999, permanent: true });

            // Apply plague_infection marker (non-ticking; triggers explosion on death)
            t.activeEffects = t.activeEffects.filter(x => x.type !== 'plague_infection');
            t.activeEffects.push({ type: 'plague_infection', rounds: 9999 });

            this._addLog(`  ↪️ 💀 ${this._eName(t)} is infected with Mummy Rot (${rotDmg}/round) and Plague Infection!`);
        }

        this._advancePlayerTurn();
    }

    /**
     * Necromancer L35: Control the Dead.
     * Single-target undead charm that bypasses undead charm immunity.
     * Chance and duration use Bard charm scaling.
     */
    necroControlTheDead(targetEnemy) {
        const m = this.currentMember;
        if (!m || m.health <= 0 || m.classId !== 'necromancer') return;
        if ((m.level || 1) < NECRO_L35_UNLOCK_LEVEL) {
            this._addLog(`${m.name} must reach level ${NECRO_L35_UNLOCK_LEVEL} to control the dead.`);
            return;
        }
        if (m.mana < NECRO_CONTROL_DEAD_MANA_COST) {
            this._addLog(`${m.name} needs ${NECRO_CONTROL_DEAD_MANA_COST} MP to cast Control the Dead.`);
            return;
        }
        if (!targetEnemy || targetEnemy.health <= 0) return;

        const eName = this._eName(targetEnemy);
        const tTags = this._getEnemyTags(targetEnemy);
        if (!tTags.includes('undead')) {
            this._addLog(`${eName} is not undead and cannot be dominated by Control the Dead.`);
            return;
        }
        if (targetEnemy.isBoss || targetEnemy.isMegaBoss || targetEnemy.isSuperBoss) {
            m.mana -= NECRO_CONTROL_DEAD_MANA_COST;
            this._addLog(`💀 ${m.name} invokes Control the Dead, but ${eName} is too powerful to dominate!`);
            this._advancePlayerTurn();
            return;
        }
        if ((targetEnemy.charmedRounds || 0) > 0) {
            this._addLog(`${eName} is already charmed.`);
            return;
        }

        m.mana -= NECRO_CONTROL_DEAD_MANA_COST;
        const charmChance = Math.min(0.95, BARD_CHARM_BASE_CHANCE + BARD_CHARM_CHANCE_PER_2_LV * (m.level || 1));
        const duration = Math.max(1, Math.floor((m.level || 1) / BARD_CHARM_DURATION_DIVISOR));

        if (Math.random() < charmChance) {
            this._prepareCharmedAlly(targetEnemy);
            targetEnemy.charmedRounds = duration;
            targetEnemy.charmerId = m.id;
            this._addLog(`💀 ${m.name} dominates ${eName}'s undead will! (${duration} rounds)`);
        } else {
            this._addLog(`💀 ${m.name} reaches into ${eName}'s dead mind, but it resists! (${Math.round(charmChance * 100)}% chance)`);
        }

        this._advancePlayerTurn();
    }

    /**
     * Necromancer L35: Siphon Power.
     * AoE stamina/mana drain vs all enemies, except undead/construct/elemental.
     */
    necroSiphonPower() {
        const m = this.currentMember;
        if (!m || m.health <= 0 || m.classId !== 'necromancer') return;
        if ((m.level || 1) < NECRO_L35_UNLOCK_LEVEL) {
            this._addLog(`${m.name} must reach level ${NECRO_L35_UNLOCK_LEVEL} to use Siphon Power.`);
            return;
        }
        if (m.mana < NECRO_SIPHON_POWER_MANA_COST) {
            this._addLog(`${m.name} needs ${NECRO_SIPHON_POWER_MANA_COST} MP to cast Siphon Power.`);
            return;
        }

        const targets = this.aliveHostileEnemies.slice();
        if (targets.length === 0) {
            this._addLog('No enemies to siphon.');
            return;
        }

        m.mana -= NECRO_SIPHON_POWER_MANA_COST;
        const minDrain = Math.max(1, Math.floor((m.level || 1) / NECRO_SIPHON_POWER_MIN_DIVISOR));
        const maxDrain = Math.max(minDrain, Math.floor((m.level || 1) * NECRO_SIPHON_POWER_MAX_MULT));
        this._addLog(`💀🧿 ${m.name} unleashes Siphon Power! (-${NECRO_SIPHON_POWER_MANA_COST} MP)`);

        let affected = 0;
        for (const t of targets) {
            if (!t || t.health <= 0) continue;
            if (this._isEnemySiphonPowerImmune(t)) {
                this._addLog(`  ↪️ ${this._eName(t)} is immune to Siphon Power.`);
                continue;
            }

            const roll = randomInt(minDrain, maxDrain);
            const beforeSt = Math.max(0, t.stamina || 0);
            const beforeMp = Math.max(0, t.mana || 0);
            const stDrained = Math.min(beforeSt, roll);
            const mpDrained = Math.min(beforeMp, roll);
            t.stamina = Math.max(0, beforeSt - stDrained);
            t.mana = Math.max(0, beforeMp - mpDrained);
            affected++;
            this._addLog(`  ↪️ ${this._eName(t)} loses ${stDrained} ST and ${mpDrained} MP.`);
        }

        if (affected === 0) {
            this._addLog('💀🧿 The siphon finds no vulnerable minds to drain.');
        }
        this._advancePlayerTurn();
    }

    /**
     * Paladin Smite — armor-ignoring holy melee strike. Costs PALADIN_SMITE_MANA_COST
     * mana. Damage is rolled as a normal melee hit (plus paladin melee scaling).
     * Against enemies tagged 'undead' or 'demon' in ENEMY_TYPES, there's a
     * (PALADIN_SMITE_INSTAKILL_BASE + PALADIN_SMITE_INSTAKILL_PER_LEVEL × level)
     * chance to drop them in one blow (capped at 100%).
     *
     * Note: player melee already bypasses any enemy armor model (see
     * _damageEnemy — it doesn't subtract enemy armor), so "armor-ignoring"
     * is preserved naturally; we document the intent for future-proofing.
     */
    paladinSmite(targetEnemy) {
        const m = this.currentMember;
        if (!m || m.health <= 0) return;
        if (m.classId !== 'paladin') return;
        this._emitTelemetry('abilityUsed', { member: m, abilityId: 'paladin_smite' });
        if (!this.canMelee(m)) {
            this._addLog(`${m.name} cannot Smite from the back row!`);
            return;
        }
        if (!targetEnemy || targetEnemy.health <= 0) return;

        if (!this.canPaladinSmiteTarget(m, targetEnemy)) {
            const dragonslayerNote = m.level >= PALADIN_DRAGONSLAYER_UNLOCK_LEVEL
                ? ' Activate Dragonslayer to Smite dragons.'
                : '';
            this._addLog(`\u2728 ${m.name}'s divine Smite can only strike undead, demons, and Dragonslayer-marked dragons!${dragonslayerNote}`);
            return;
        }

        if (m.mana < PALADIN_SMITE_MANA_COST) {
            this._addLog(`${m.name} has too little mana to Smite (needs ${PALADIN_SMITE_MANA_COST}).`);
            return;
        }

        m.mana = Math.max(0, m.mana - PALADIN_SMITE_MANA_COST);

        const typeDef = ENEMY_TYPES[targetEnemy.type] || {};
        const tags = Array.isArray(typeDef.tags) ? typeDef.tags : [];
        const isSmitable = tags.includes('undead') || tags.includes('demon') || (m.dragonslayerActive && tags.includes('dragon'));

        const eName = this._eName(targetEnemy);

                // Purge roll — capped at PALADIN_SMITE_INSTAKILL_CAP (50%).
        if (isSmitable) {
            const chance = Math.min(PALADIN_SMITE_INSTAKILL_CAP,
                PALADIN_SMITE_INSTAKILL_BASE + PALADIN_SMITE_INSTAKILL_PER_LEVEL * m.level);
            if (Math.random() < chance) {
                if (targetEnemy.isBoss || targetEnemy.isMegaBoss) {
                    // Bosses resist instant death — take x4 smite damage instead
                    let bossDmg = this._rollPlayerMeleeDamage(m);
                    bossDmg += 2 * m.level;
                    bossDmg *= (2 + 0.10 * m.level);
                    bossDmg  = Math.floor(bossDmg * PALADIN_SMITE_BOSS_DAMAGE_MULT * PALADIN_SMITE_DAMAGE_BONUS_MULT);
                    bossDmg = this._applyOutgoingDamageBonuses(m, bossDmg, 'melee');
                    const bossCrit = this._maybeMountedSmiteCrit(m, bossDmg);
                    bossDmg = bossCrit.damage;
                    const bossDealt = this._damageEnemy(targetEnemy, Math.max(1, bossDmg), false, false, 0, false, { contactAttacker: m });
                    this._addLog(`✨ ${m.name}'s divine purge strikes ${eName} — Boss resists instant death! (x4 smite: ${bossDealt} damage)${bossCrit.crit ? ' 💥 MOUNTED CRIT!' : ''}`);
                    this._applyWeaponRider(m, targetEnemy, bossDealt);
                    this._applyWeaponRider(m, targetEnemy, bossDealt, 'offhand');
                    if (targetEnemy.health <= 0) this._addLog(`${eName} is defeated!`);
                    this._advancePlayerTurn();
                    return;
                }
                const overkill = targetEnemy.health;
                targetEnemy.health = 0;
                if (!targetEnemy._deathHandled) { targetEnemy._deathHandled = true; this._onEnemyDeath(targetEnemy); }
                this._addLog(`✨ ${m.name} SMITES ${eName} with holy light! (${overkill} damage — purged!)`);
                this._addLog(`${eName} is defeated!`);
                this._advancePlayerTurn();
                return;
            }
        }

        // Otherwise a flat holy strike: melee roll + paladin scaling.
        let dmg = this._rollPlayerMeleeDamage(m);
        // Divine flavour bonus against smitable foes — +2 per paladin level.
        if (isSmitable) {
            // Fold in +2 per level first
            dmg += 2 * m.level;
            dmg *= (2 + 0.10 * m.level);
        }
        dmg = Math.floor(dmg * PALADIN_SMITE_DAMAGE_BONUS_MULT);
        dmg = this._applyOutgoingDamageBonuses(m, dmg, 'melee');
        const smiteCrit = this._maybeMountedSmiteCrit(m, dmg);
        dmg = smiteCrit.damage;

        const dealt = this._damageEnemy(targetEnemy, dmg, false, false, 0, false, { contactAttacker: m });

        const flavour = isSmitable
            ? `\u2728 ${m.name} Smites ${eName} with searing holy light for ${dealt}!`
            : `\u2728 ${m.name} Smites ${eName} for ${dealt} damage.`;
        this._addLog(flavour + (smiteCrit.crit ? ' 💥 MOUNTED CRIT!' : ''));

        this._applyWeaponRider(m, targetEnemy, dealt);
        this._applyWeaponRider(m, targetEnemy, dealt, 'offhand');

        if (targetEnemy.health <= 0) this._addLog(`${eName} is defeated!`);
        this._advancePlayerTurn();
    }

    /**
     * Paladin L30: Divine Judgment — once per combat, 50 ST + 50 MP.
     * Deals (33% + level/3%) of the target's CURRENT health as holy damage,
     * ignoring all defense. Bosses take half; mega bosses take one quarter.
     * Target must be smiteable (undead, demon, or dragon with Dragonslayer active).
     */
    paladinDivineJudgment(targetEnemy) {
        const m = this.currentMember;
        if (!m || m.health <= 0 || m.classId !== 'paladin') return;
        if (m.level < PALADIN_L30_UNLOCK_LEVEL) return;
        if (!this.canMelee(m)) {
            this._addLog(`${m.name} cannot call Divine Judgment from the back row!`);
            return;
        }
        if (m.divineJudgmentUsed) {
            this._addLog(`${m.name} has already called down Divine Judgment this combat.`);
            return;
        }
        if (!targetEnemy || targetEnemy.health <= 0) return;
        if (!this.canPaladinSmiteTarget(m, targetEnemy)) {
            this._addLog(`✨ ${m.name}'s Divine Judgment can only strike undead, demons, and Dragonslayer-marked dragons!`);
            return;
        }
        if (m.stamina < PALADIN_DIVINE_JUDGMENT_STAMINA_COST) {
            this._addLog(`${m.name} needs ${PALADIN_DIVINE_JUDGMENT_STAMINA_COST} stamina for Divine Judgment.`);
            return;
        }
        if (m.mana < PALADIN_DIVINE_JUDGMENT_MANA_COST) {
            this._addLog(`${m.name} needs ${PALADIN_DIVINE_JUDGMENT_MANA_COST} mana for Divine Judgment.`);
            return;
        }

        m.stamina = Math.max(0, m.stamina - PALADIN_DIVINE_JUDGMENT_STAMINA_COST);
        m.mana    = Math.max(0, m.mana    - PALADIN_DIVINE_JUDGMENT_MANA_COST);
        m.divineJudgmentUsed = true;
        this._emitTelemetry('abilityUsed', { member: m, abilityId: 'paladin_divine_judgment' });

        const eName      = this._eName(targetEnemy);
        const isSuper    = !!(targetEnemy.isSuperBoss);
        const isMega     = !!(targetEnemy.isMegaBoss);
        const isBoss     = !!(targetEnemy.isBoss) || isMega || isSuper;
        const divisor    = isSuper ? PALADIN_DIVINE_JUDGMENT_SUPERBOSS_DIVISOR
                         : isMega  ? PALADIN_DIVINE_JUDGMENT_MEGABOSS_DIVISOR
                         : isBoss  ? PALADIN_DIVINE_JUDGMENT_BOSS_DIVISOR
                         : 1;

        const basePct = PALADIN_DIVINE_JUDGMENT_BASE_PCT + (m.level || 1) * PALADIN_DIVINE_JUDGMENT_PER_LEVEL;
        const effPct  = basePct / divisor;
        const rawDmg  = Math.max(1, Math.floor(targetEnemy.health * effPct));

        // isMagic=true: skips remorhaz burn retaliate, shieldBlock, displaceChance, physResist
        // ignoreDefense=true: holy wrath bypasses all defense
        const dealt = this._damageEnemy(targetEnemy, rawDmg, true, true);

        const pctStr = (effPct * 100).toFixed(1);
        let jLog = `⚡✨ ${m.name} calls down Divine Judgment upon ${eName} — ${pctStr}% of current HP! (${dealt} holy damage)`;
        if (isSuper)     jLog += ' [super boss: ⅛ effect]';
        else if (isMega) jLog += ' [mega boss: ¼ effect]';
        else if (isBoss) jLog += ' [boss: ½ effect]';
        this._addLog(jLog);

        if (targetEnemy.health <= 0) this._addLog(`${eName} is destroyed by holy wrath!`);
        this._advancePlayerTurn();
    }

    /**
     * Paladin Heal — half-strength Cleric heal. PALADIN_HEAL_MANA_COST mana for
     * PALADIN_HEAL_PERCENT of target's max HP, plus per-level scaling via the
     * paladin classDef.healPercentPerLevel (already halved in Classes.js).
     * Cannot heal uncontrolled summons (undead, golems).
     */
    paladinHeal(targetMember) {
        const m = this.currentMember;
        if (!m || m.health <= 0) return;
        if (m.classId !== 'paladin') return;
        if (!targetMember || targetMember.health <= 0) return;

        if (targetMember.isSummoned && !this._canReceiveLivingHealOrBuff(targetMember)) {
            this._addLog(`${m.name}'s prayer cannot mend ${targetMember.name}.`);
            return;
        }
        if (m.mana < PALADIN_HEAL_MANA_COST) {
            this._addLog(`${m.name} has too little mana to Lay On Hands (needs ${PALADIN_HEAL_MANA_COST}).`);
            return;
        }

        m.mana -= PALADIN_HEAL_MANA_COST;
        const pct = PALADIN_HEAL_PERCENT + m.getHealPercentBonus();
        const amt = Math.max(1, Math.ceil(targetMember.maxHealth * pct));
        const before = targetMember.health;
        targetMember.health = Math.min(targetMember.maxHealth, targetMember.health + amt);
        const healed = targetMember.health - before;
        this._addLog(`\u{1F64F} ${m.name} lays hands on ${targetMember.name} and restores ${healed} HP.`);
        this._advancePlayerTurn();
    }

    /**
     * Paladin Fire Aura — toggleable. When active, reflects melee damage dealt
     * to this paladin back at the attacker as fire damage. Costs
     * PALADIN_FIRE_AURA_MANA_PER_ROUND MP per round (deducted in _tickPartyEffects).
     */
    paladinFireAura() {
        const m = this.currentMember;
        if (!m || m.health <= 0) return;
        if (m.classId !== 'paladin') return;

        if (m.fireAuraActive) {
            // Toggle off — uses the turn
            m.fireAuraActive = false;
            this._addLog(`\u{1F525} ${m.name} extinguishes their Fire Aura.`);
            this._advancePlayerTurn();
        } else {
            // Toggle on — FREE action; paladin may still act this turn
            if (m.mana < PALADIN_FIRE_AURA_MANA_PER_ROUND) {
                this._addLog(`${m.name} doesn't have enough mana to ignite their Fire Aura (needs ${PALADIN_FIRE_AURA_MANA_PER_ROUND} MP/round).`);
                return;
            }
            m.fireAuraActive = true;
            this._addLog(`\u{1F525} ${m.name} ignites a blazing Fire Aura! (reflects melee damage as fire; costs ${PALADIN_FIRE_AURA_MANA_PER_ROUND} MP/round)`);
            this._notify(); // refresh UI so player sees it's on, but keep their turn
        }
    }

    paladinDragonslayerToggle() {
        const m = this.currentMember;
        if (!m || m.health <= 0) return;
        if (m.classId !== 'paladin') return;
        if (m.level < PALADIN_DRAGONSLAYER_UNLOCK_LEVEL) return;

        if (m.dragonslayerActive) {
            m.dragonslayerActive = false;
            this._addLog(`🐉 ${m.name} lets Dragonslayer fade.`);
            this._notify();
            return;
        }

        if (m.mana < PALADIN_DRAGONSLAYER_MANA_PER_ROUND) {
            this._addLog(`${m.name} needs ${PALADIN_DRAGONSLAYER_MANA_PER_ROUND} MP to invoke Dragonslayer.`);
            return;
        }

        m.dragonslayerActive = true;
        this._addLog(`🐉 ${m.name} invokes Dragonslayer! Smite now reaches dragons and the stance costs ${PALADIN_DRAGONSLAYER_MANA_PER_ROUND} MP/round.`);
        this._notify();
    }

    _dismissPaladinSteed(paladin, reason = '') {
        if (!paladin || !paladin.paladinSteedActive) return;
        if (paladin.paladinSteedHpBonus > 0) {
            paladin.maxHealth = Math.max(1, paladin.maxHealth - paladin.paladinSteedHpBonus);
            paladin.health = Math.min(paladin.health, paladin.maxHealth);
        }
        paladin.paladinSteedActive = false;
        paladin.paladinSteedHpBonus = 0;
        if (reason) this._addLog(`🐎 ${paladin.name}'s summoned steed fades${reason}.`);
    }

    paladinSummonSteed() {
        const m = this.currentMember;
        if (!m || m.health <= 0 || m.classId !== 'paladin') return;
        if ((m.level || 1) < PALADIN_L35_UNLOCK_LEVEL) return;
        if (m.paladinSteedUsed) {
            this._addLog(`${m.name} has already summoned a steed this combat.`);
            return;
        }
        if (m.mana < PALADIN_STEED_MANA_COST) {
            this._addLog(`${m.name} needs ${PALADIN_STEED_MANA_COST} MP to summon a steed.`);
            return;
        }
        m.mana -= PALADIN_STEED_MANA_COST;
        m.paladinSteedUsed = true;
        m.paladinSteedActive = true;
        m.paladinSteedHpBonus = Math.max(1, Math.floor(m.maxHealth * PALADIN_STEED_HEALTH_BONUS));
        m.maxHealth += m.paladinSteedHpBonus;
        m.health += m.paladinSteedHpBonus;
        const meleeBonus = Math.round((this._getMountedPaladinMeleeMultiplier(m) - 1) * 100);
        const crit = Math.round(Math.min(0.95, PALADIN_STEED_SMITE_CRIT_BASE + (m.level || 1) * PALADIN_STEED_SMITE_CRIT_PER_LEVEL) * 100);
        this._addLog(`🐎 ${m.name} summons a radiant steed! (+50% max HP, +${meleeBonus}% regular melee damage, ${crit}% Smite crit, ${PALADIN_STEED_MANA_PER_ROUND} MP/round)`);
        this._advancePlayerTurn();
    }

    paladinMartyrsCovenantToggle() {
        const m = this.currentMember;
        if (!m || m.health <= 0 || m.classId !== 'paladin') return;
        if ((m.level || 1) < PALADIN_L35_UNLOCK_LEVEL) return;
        if (m.martyrsCovenantActive) {
            m.martyrsCovenantActive = false;
            this._addLog(`✝️ ${m.name} releases Martyr's Covenant.`);
            this._notify();
            return;
        }
        if (m.martyrsCovenantSuppressedRound === (this.turnNumber || 0)) {
            this._addLog(`✝️ ${m.name}'s Martyr's Covenant is broken for the rest of this round.`);
            return;
        }
        if (m.mana < PALADIN_COVENANT_MANA_PER_ROUND) {
            this._addLog(`${m.name} needs ${PALADIN_COVENANT_MANA_PER_ROUND} MP to anchor Martyr's Covenant.`);
            return;
        }
        m.martyrsCovenantActive = true;
        m.martyrsCovenantSuppressedRound = 0;
        this._addLog(`✝️ ${m.name} anchors Martyr's Covenant! Heavy hits on recruited allies transfer to the paladin (${PALADIN_COVENANT_MANA_PER_ROUND} MP/round).`);
        this._notify();
    }

    /**
     * Bard Disrupt — once per combat AoE. Targets all enemies:
     *   - Applies attack/defense debuff (-1 per 5 bard levels)
        *   - Deals magic damage with +2% damage per bard level
     *   - 50% chance to stun each enemy for 1 round
     * Costs BARD_DISRUPT_MANA_COST mana.
     */
    bardDisrupt() {
        const m = this.currentMember;
        if (!m || m.health <= 0) return;
        if (m.classId !== 'bard') return;
        if (m.usedBardSong) {
            this._addLog(`${m.name} has already used their disrupt this fight.`);
            return;
        }
        if (m.mana < BARD_DISRUPT_MANA_COST) {
            this._addLog(`${m.name} has too little mana to disrupt (needs ${BARD_DISRUPT_MANA_COST}).`);
            return;
        }

        m.mana -= BARD_DISRUPT_MANA_COST;
        m.usedBardSong = true;

        const scale   = Math.max(1, Math.floor(m.level / 3));
        const debuff  = scale;
        const dmgBonusPct = Math.max(0, m.level * 2);

        this._addLog(`\u{1F3B6} ${m.name} unleashes a dissonant chord! AoE disruption!`);

        let stunCount = 0;
        for (const e of this.aliveEnemies) {
            // Debuff
            e.activeEffects = e.activeEffects || [];
            e.activeEffects = e.activeEffects.filter(x => x.type !== 'bard_disrupt');
            e.activeEffects.push({
                type: 'bard_disrupt',
                rounds: Math.max(1, Math.floor(m.level / 7)),
                damageBonus:  -debuff,
                defenseBonus: -debuff,
            });

            // Magic damage via _damageEnemy (handles entangle/debuff interactions)
            const baseDmg = Math.max(1, randomInt(1, 4) + m.getClassDamageBonus('magic'));
            const dmg = this._applyOutgoingDamageBonuses(m, Math.max(1, Math.round(baseDmg * (1 + (dmgBonusPct / 100)))), 'magic');
            const dealt = this._damageEnemy(e, dmg, false, true);
            const eName = this._eName(e);
            this._addLog(`  🎵 ${eName} takes ${dealt} magic dmg (+${dmgBonusPct}% damage, -${debuff} atk/-${debuff} def)`);
            if (e.health <= 0) this._addLog(`${eName} is defeated!`);

            // 50% stun (boss/mega-boss resist applies)
            if (Math.random() < 0.5 && this._tryStunEnemy(e)) {
                stunCount++;
            }
        }

        if (stunCount > 0) {
            this._addLog(`  ⚡ ${stunCount} enem${stunCount === 1 ? 'y' : 'ies'} stunned!`);
        }

        this._advancePlayerTurn();
    }

    bardRallyingMelody() {
        const m = this.currentMember;
        if (!m || m.health <= 0) return;
        if (m.classId !== 'bard') return;
        if (m.level < BARD_RALLYING_MELODY_UNLOCK_LEVEL) return;
        this._emitTelemetry('abilityUsed', { member: m, abilityId: 'bard_rallying_melody' });
        if (m.mana < BARD_RALLYING_MELODY_MANA_COST) {
            this._addLog(`${m.name} needs ${BARD_RALLYING_MELODY_MANA_COST} MP to play Rallying Melody.`);
            return;
        }

        // Each additional living non-summoned bard in the party (beyond the caster) adds +1% restore
        const otherBards = (this.party || []).filter(t =>
            t && t !== m && t.health > 0 && !t.isSummoned && t.classId === 'bard'
        ).length;
        const restoreFrac = Math.min(0.15, BARD_RALLYING_MELODY_RESTORE_FRACTION + Math.min(5, otherBards) * 0.01);

        // Caster cannot benefit from their own melody; exclude summoned undead and golems
        const targets = this.party.filter(t => {
            if (!t || t.health <= 0) return false;
            if (t === m) return false;
            if (!t.isSummoned) return true;  // living party members
            if (BEAST_TYPES[t.summonType]) return true;  // animals & pixie
            return false;  // exclude golems & undead
        });
        if (targets.length === 0) return;

        m.mana -= BARD_RALLYING_MELODY_MANA_COST;
        const parts = [];
        for (const t of targets) {
            const hpGain = Math.min(Math.max(1, Math.floor(t.maxHealth * restoreFrac)), Math.max(0, t.maxHealth - t.health));
            // Symphony bard cannot benefit from MP/ST restoration while channeling
            const symphonyBlocked = t.classId === 'bard' && t.symphonyActive;
            const mpGain = symphonyBlocked ? 0 : Math.min(Math.max(0, Math.floor(t.maxMana * restoreFrac)), Math.max(0, t.maxMana - t.mana));
            const stGain = symphonyBlocked ? 0 : Math.min(Math.max(0, Math.floor(t.maxStamina * restoreFrac)), Math.max(0, t.maxStamina - t.stamina));
            t.health += hpGain;
            t.mana += mpGain;
            t.stamina += stGain;
            parts.push(`${t.name} +${hpGain} HP/+${mpGain} MP/+${stGain} ST${symphonyBlocked ? ' [symphony]' : ''}`);
        }
        const pct = Math.round(restoreFrac * 100);
        const bonusNote = otherBards > 0 ? ` (+${otherBards}% from ${otherBards} other bard${otherBards > 1 ? 's' : ''})` : '';
        this._addLog(`🎶 ${m.name} plays a Rallying Melody! [${pct}% restore${bonusNote}] (${parts.join(', ')})`);
        this._advancePlayerTurn();
    }

    /**
     * Bard L30: Symphony of Destruction — 1/combat channeled AoE.
     * Round 1 fires immediately (×1 damage, costs 10 MP + 10 ST).
     * Each subsequent round doubles damage and cost.
     * Ends when resources run dry, bard is incapacitated, or player stops it.
     */
    bardStartSymphony() {
        const m = this.currentMember;
        if (!m || m.health <= 0) return;
        if (m.classId !== 'bard') return;
        if (m.level < BARD_SYMPHONY_UNLOCK_LEVEL) return;
        this._emitTelemetry('abilityUsed', { member: m, abilityId: 'bard_symphony' });
        if (m.symphonyUsedThisCombat) {
            this._addLog(`♪ ${m.name} can only call the Symphony of Destruction once per combat!`);
            return;
        }
        if (m.mana < BARD_SYMPHONY_BASE_MANA_COST || m.stamina < BARD_SYMPHONY_BASE_STA_COST) {
            this._addLog(`♪ ${m.name} needs ${BARD_SYMPHONY_BASE_MANA_COST} MP and ${BARD_SYMPHONY_BASE_STA_COST} ST to begin the Symphony.`);
            return;
        }
        m.mana    -= BARD_SYMPHONY_BASE_MANA_COST;
        m.stamina -= BARD_SYMPHONY_BASE_STA_COST;
        m.symphonyActive         = true;
        m.symphonyRound          = 1;
        m.symphonyManaCost       = BARD_SYMPHONY_BASE_MANA_COST * 2;  // cost for round 2
        m.symphonyStaCost        = BARD_SYMPHONY_BASE_STA_COST  * 2;
        m.symphonyUsedThisCombat = true;
        this._addLog(`♪♪ ${m.name} begins the SYMPHONY OF DESTRUCTION! (Round 1, ×1 damage, -${BARD_SYMPHONY_BASE_MANA_COST} MP/-${BARD_SYMPHONY_BASE_STA_COST} ST)`);
        this._bardFireSymphony(m, 1);
        this._advancePlayerTurn();
    }

    /** Bard continues the symphony this round (regular action, doubles cost each time). */
    bardContinueSymphony() {
        const m = this.currentMember;
        if (!m || m.health <= 0 || !m.symphonyActive) return;
        const mc = m.symphonyManaCost;
        const sc = m.symphonyStaCost;
        if (m.mana < mc || m.stamina < sc) {
            this._bardEndSymphony(m, 'exhausted');
            this._advancePlayerTurn();
            return;
        }
        m.mana    -= mc;
        m.stamina -= sc;
        m.symphonyRound++;
        const mult = Math.pow(2, m.symphonyRound - 1);
        this._addLog(`♪♪ ${m.name}'s Symphony of Destruction crescendos! (Round ${m.symphonyRound}, ×${mult} damage, -${mc} MP/-${sc} ST)`);
        this._bardFireSymphony(m, m.symphonyRound);
        m.symphonyManaCost = mc * 2;
        m.symphonyStaCost  = sc * 2;
        this._advancePlayerTurn();
    }

    /** Bard voluntarily stops the symphony (free action — does not advance turn). */
    bardStopSymphony() {
        const m = this.currentMember;
        if (!m || m.classId !== 'bard' || !m.symphonyActive) return;
        this._bardEndSymphony(m, 'stopped');
        this._notify();
    }

    _bardEndSymphony(m, reason) {
        m.symphonyActive = false;
        if (reason === 'stopped') {
            this._addLog(`♪ ${m.name} brings the Symphony of Destruction to a close.`);
        } else if (reason === 'exhausted') {
            this._addLog(`♪ ${m.name}'s Symphony fades — not enough mana and stamina to continue!`);
        } else {
            this._addLog(`♪ ${m.name}'s Symphony of Destruction is broken!`);
        }
    }

    /** Fire one round of the symphony AoE (all enemies, sonic damage, incorporeal immune). */
    _bardFireSymphony(m, round) {
        const damageMult = Math.pow(2, round - 1);
        let dmg = randomInt(MAGIC_DAMAGE_MIN, MAGIC_DAMAGE_MAX);
        dmg += m.getWeaponBonus('magic');
        dmg += m.getClassDamageBonus('magic');
        dmg += this._getPartyMemberDamageMod(m);
        dmg = Math.max(1, Math.round(dmg * (m.getMagicDamageMultiplier?.() || 1)));
        dmg = Math.max(1, Math.round(dmg * damageMult));
        dmg = this._applyOutgoingDamageBonuses(m, dmg, 'magic');

        const enemies = this.aliveHostileEnemies.slice();
        let hit = 0;
        for (const e of enemies) {
            if (e.health <= 0) continue;
            const eDef = ENEMY_TYPES[e.type] || {};
            const eTags = eDef.tags || [];
            if (eTags.includes('incorporeal')) {
                this._addLog(`  ♪ ${this._eName(e)} is incorporeal — immune to the symphony!`);
                continue;
            }
            let eDmg = dmg;
            if (eDef.sonicResist) eDmg = Math.max(1, Math.floor(eDmg * (1 - eDef.sonicResist)));
            const dealt = this._damageEnemy(e, eDmg, false, true);
            this._addLog(`  ♪ ${this._eName(e)} takes ${dealt} sonic damage!`);
            if (e.health <= 0) this._addLog(`  ♪ ${this._eName(e)} is struck down!`);
            hit++;
        }
        if (hit === 0) this._addLog(`  ♪ The symphony echoes — no enemies can be harmed!`);
    }

    // ── Bard L35: Quickstep Song ─────────────────────────────────────────────

    /** Returns true if the party member qualifies for Quickstep Song haste. */
    _isQuickstepHasteQualifier(m) {
        if (!m || m.health <= 0) return false;
        if (!m.isSummoned) return true; // all real party members qualify
        // For summons: only beasts (ranger/druid/VK) and warlock demons qualify
        if (BEAST_TYPES[m.summonType]) return true;
        if (this._isWarlockBoundSummon(m)) return true;
        if (VERMIN_PRESETS[m.summonType]) return true;
        if (SLIME_PRESETS[m.summonType]) return true;
        return false;
    }

    /** Bard L35: Quickstep Song — 100 MP to activate; grants haste to all qualifying party members. */
    bardQuickstepSong() {
        const m = this.currentMember;
        if (!m || m.health <= 0 || m.classId !== 'bard') return;
        if (m.level < BARD_QUICKSTEP_SONG_UNLOCK_LEVEL) {
            this._addLog(`${m.name} must be level ${BARD_QUICKSTEP_SONG_UNLOCK_LEVEL} to use Quickstep Song.`);
            return;
        }
        if (m.quickstepSongActive) {
            this._addLog(`⚡ ${m.name}'s Quickstep Song is already active!`);
            return;
        }
        if (m.mana < BARD_QUICKSTEP_SONG_MANA_COST) {
            this._addLog(`${m.name} needs ${BARD_QUICKSTEP_SONG_MANA_COST} MP to play Quickstep Song.`);
            return;
        }
        m.mana -= BARD_QUICKSTEP_SONG_MANA_COST;
        m.quickstepSongActive = true;
        let hastedCount = 0;
        for (const p of this.party) {
            if (p.health <= 0 || p.quickstepHasteActive) continue;
            if (this._isQuickstepHasteQualifier(p)) {
                p.quickstepHasteActive = true;
                hastedCount++;
            }
        }
        this._addLog(`⚡ ${m.name} plays the Quickstep Song! (-${BARD_QUICKSTEP_SONG_MANA_COST} MP) ${hastedCount} ally${hastedCount !== 1 ? 's gain' : ' gains'} haste — bonus attacks this combat!`);
        this._advancePlayerTurn();
    }

    // ── Bard L35: Soulful Melody (passive reaction) ───────────────────────────

    /**
     * Triggers automatically when a non-summoned party member dies.
     * The bard with the most mana (L35+, not in Symphony) plays a memorial anthem.
     * Costs BARD_SOULFUL_MELODY_MANA_COST MP.
     * Grants survivors +floor(bardLevel/4) atk/def for BARD_SOULFUL_MELODY_DURATION rounds.
     * Stacks: each successive fallen ally enhances the existing anthem rather than starting fresh.
     */
    _triggerSoulfulMelody(deceased) {
        if (!deceased || deceased.soulfulMelodyPlayed) return;
        deceased.soulfulMelodyPlayed = true;

        const bards = (this.party || []).filter(p =>
            p && p.health > 0 && !p.isSummoned && p.classId === 'bard'
            && (p.level || 1) >= BARD_SOULFUL_MELODY_UNLOCK_LEVEL
            && !p.symphonyActive
            && p.mana >= BARD_SOULFUL_MELODY_MANA_COST
        );
        if (bards.length === 0) return;

        const bard = bards.reduce((best, b) => b.mana > best.mana ? b : best, bards[0]);
        bard.mana -= BARD_SOULFUL_MELODY_MANA_COST;

        const baseBonus = Math.max(1, Math.floor((bard.level || 1) / BARD_SOULFUL_MELODY_ATK_DEF_DIVISOR));
        const survivors = (this.party || []).filter(p => p && p.health > 0 && p !== deceased);

        for (const survivor of survivors) {
            if (!Array.isArray(survivor.activeEffects)) survivor.activeEffects = [];
            const existing = survivor.activeEffects.find(e => e && e.type === 'soulful_melody_anthem');
            if (existing) {
                existing.damageBonus = (existing.damageBonus || 0) + BARD_SOULFUL_MELODY_STACK_ATK_BONUS;
                existing.defenseBonus = (existing.defenseBonus || 0) + BARD_SOULFUL_MELODY_STACK_DEF_BONUS;
                existing.rounds = (existing.rounds || 0) + BARD_SOULFUL_MELODY_STACK_DUR_BONUS;
            } else {
                survivor.activeEffects.push({
                    type: 'soulful_melody_anthem',
                    damageBonus: baseBonus,
                    defenseBonus: baseBonus,
                    rounds: BARD_SOULFUL_MELODY_DURATION,
                });
            }
        }
        const bonusNote = `+${baseBonus} atk/def, ${BARD_SOULFUL_MELODY_DURATION} rds`;
        this._addLog(`\u{1F3B5} ${bard.name} plays a Soulful Melody for the fallen ${deceased.name}! (-${BARD_SOULFUL_MELODY_MANA_COST} MP) [${bonusNote}] — ${survivors.length} surviving ${survivors.length !== 1 ? 'allies' : 'ally'} inspired!`);
    }

    /**
     * Druid Entangle — 50% chance per enemy to apply -2 defense / -2 damage
     * debuff for POISON_DURATION_ROUNDS rounds (we reuse the rounds counter).
     * Debuff magnitude scales +1 per odd level beyond L1.
     */
    druidEntangle() {
        const m = this.currentMember;
        if (!m || m.health <= 0) return;
        if (m.classId !== 'druid') return;
        if (m.mana < DRUID_ENTANGLE_MANA_COST) {
            this._addLog(`${m.name} has too little mana to cast Entangle (needs ${DRUID_ENTANGLE_MANA_COST}).`);
            return;
        }

        m.mana -= DRUID_ENTANGLE_MANA_COST;
        const debuff = DRUID_ENTANGLE_BASE_DEBUFF + Math.floor(Math.max(0, m.level - 1) / 2);
        this._addLog(`\u{1F33F} ${m.name} calls forth thorny vines!`);

        let affected = 0;
        for (const e of this.aliveEnemies) {
            // Incorporeal creatures cannot be physically entangled.
            const eDef = ENEMY_TYPES[e.type] || {};
            if (Array.isArray(eDef.tags) && eDef.tags.includes('incorporeal')) {
                this._addLog(`\u{1F33F} The vines pass harmlessly through ${this._eName(e)}!`);
                continue;
            }
            if (Math.random() < DRUID_ENTANGLE_CHANCE) {
                e.activeEffects = e.activeEffects || [];
                // Remove any existing entangle before re-applying
                e.activeEffects = e.activeEffects.filter(x => x.type !== 'entangle');
                const entangleEffect = {
                    type: 'entangle',
                    rounds: POISON_DURATION_ROUNDS,
                    damageBonus:  -debuff,
                    defenseBonus: -debuff,
                };
                // Verdant Surge (L30): add nature DoT + action loss to entangle effect
                if (m.level >= DRUID_VERDANT_SURGE_UNLOCK_LEVEL) {
                    const vMin = Math.max(1, MAGIC_DAMAGE_MIN + m.getWeaponBonus('magic') + m.getClassDamageBonus('magic') + this._getPartyMemberDamageMod(m));
                    const vMax = Math.max(vMin, MAGIC_DAMAGE_MAX + m.getWeaponBonus('magic') + m.getClassDamageBonus('magic') + this._getPartyMemberDamageMod(m));
                    entangleEffect.verdantSurge = true;
                    entangleEffect.verdantMin = vMin;
                    entangleEffect.verdantMax = vMax;
                }
                e.activeEffects.push(entangleEffect);
                affected++;
                const surgeNote = (m.level >= DRUID_VERDANT_SURGE_UNLOCK_LEVEL) ? ' 🌿 Verdant Surge!' : '';
                this._addLog(`\u{1F33F} ${this._eName(e)} is entangled! (-${debuff} dmg, -${debuff} def)${surgeNote}`);
            } else {
                this._addLog(`${this._eName(e)} resists the vines.`);
            }
        }
        if (affected === 0) this._addLog('The vines fail to take hold!');

        this._advancePlayerTurn();
    }

    // ──────────────────────────────────────────────────────────────────────
    // Druid L30: Wild Shape (free-action transformation)
    // ──────────────────────────────────────────────────────────────────────

    /**
     * Toggle Wild Shape on (free action — does NOT advance player turn).
     * form: 'bear' | 'wolf' | 'eagle' | 'pixie' | 'treant'
     */
    druidActivateWildShape(form) {
        const m = this.currentMember;
        if (!m || m.classId !== 'druid' || m.level < DRUID_WILD_SHAPE_UNLOCK_LEVEL) return;
        if (m.health <= 0) return;
        if (m.wildShapeForm) {
            this._addLog(`\u{1F43E} ${m.name} must exit Wild Shape before changing forms.`);
            return;
        }
        if (m.mana < DRUID_WILD_SHAPE_MANA_INITIAL) {
            this._addLog(`${m.name} needs ${DRUID_WILD_SHAPE_MANA_INITIAL} MP to enter Wild Shape.`);
            return;
        }
        m.mana -= DRUID_WILD_SHAPE_MANA_INITIAL;
        m.wildShapeForm = form;
        this._emitTelemetry('abilityUsed', { member: m, abilityId: `druid_wildshape_${form}` });

        // Row management: save original row, then move to the appropriate row for this form.
        const frontForms = ['bear', 'wolf', 'treant'];
        const backForms  = ['eagle', 'pixie'];
        m.wildShapeOrigRow = m.row;
        if (frontForms.includes(form) && m.row !== 'front') m.row = 'front';
        if (backForms.includes(form)  && m.row !== 'back')  m.row = 'back';

        // HP doubling for bear and treant
        if (form === 'bear' || form === 'treant') {
            m.wildShapeHpBonus = m.maxHealth;
            m.maxHealth += m.wildShapeHpBonus;
            m.health   += m.wildShapeHpBonus;
        }

        // Defense bonus
        const defDivisor = {
            bear:   DRUID_WILD_BEAR_DEFENSE_DIVISOR,
            wolf:   DRUID_WILD_WOLF_DEFENSE_DIVISOR,
            eagle:  0,
            pixie:  0,
            treant: DRUID_WILD_TREANT_DEFENSE_DIVISOR,
        }[form] || 0;
        m.wildShapeDefBonus = defDivisor > 0 ? Math.floor(m.level / defDivisor) : 0;

        // Buff all living matching summons immediately
        this._applyWildShapeSummonBuff(m, form, true);

        const formIcons = { bear: '\u{1F43B}', wolf: '\u{1F43A}', eagle: '\u{1F985}', pixie: '\u{1F9DA}', treant: '\u{1F333}' };
        const formNames = { bear: 'Bear Form', wolf: 'Wolf Form', eagle: 'Storm Eagle Form', pixie: 'Pixie Form', treant: 'Treant Form' };
        this._addLog(`\u{1F43E} ${m.name} transforms into ${formIcons[form]} ${formNames[form]}! (-${DRUID_WILD_SHAPE_MANA_INITIAL} MP; ${DRUID_WILD_SHAPE_MANA_PER_ROUND} MP/round)`);
        this._notify();
    }

    /**
     * Toggle Wild Shape off (free action — does NOT advance player turn).
     */
    druidDeactivateWildShape() {
        const m = this.currentMember;
        if (!m || !m.wildShapeForm) return;
        this._exitWildShape(m);
        this._notify();
    }

    /**
     * Druid L35 Nature's Charms — toggle.
     * Activation costs DRUID_NATURES_CHARM_MANA_COST and ends the druid's turn.
     * Deactivation is a free action (no turn advance) and releases all charmed minions.
     * Per-round charm attempts and upkeep are handled in _tickPartyEffects.
     */
    druidNaturesCharmToggle() {
        const m = this.currentMember;
        if (!m || m.health <= 0) return;
        if (m.classId !== 'druid') return;
        if (m.level < DRUID_NATURES_CHARM_UNLOCK_LEVEL) {
            this._addLog(`${m.name} must be level ${DRUID_NATURES_CHARM_UNLOCK_LEVEL} to use Nature's Charms.`);
            return;
        }
        if (m.naturesCharmActive) {
            // Deactivate — free action, releases all charmed minions
            m.naturesCharmActive = false;
            for (const e of this.enemies) {
                if (e.naturesCharmed && e.charmerId === m.id && e.charmedRounds > 0) {
                    e.charmedRounds = 0;
                    e.charmerId = null;
                    e.naturesCharmed = false;
                    this._addLog(`\u{1F33F} ${this._eName(e)} returns to the enemy ranks.`);
                }
            }
            this._addLog(`\u{1F33F} ${m.name} releases Nature's Charms.`);
            this._notify();
            return;
        }
        if (m.mana < DRUID_NATURES_CHARM_MANA_COST) {
            this._addLog(`${m.name} needs ${DRUID_NATURES_CHARM_MANA_COST} MP to activate Nature's Charms.`);
            return;
        }
        m.mana -= DRUID_NATURES_CHARM_MANA_COST;
        m.naturesCharmActive = true;
        this._addLog(`\u{1F33F} ${m.name} opens their spirit to the wild — Nature's Charms active! (-${DRUID_NATURES_CHARM_MANA_COST} MP)`);
        this._advancePlayerTurn();
    }

    /**
     * Druid L35 Wither Plants — magic AoE targeting all plant-tagged enemies.
     * Damage = base_magic × (DRUID_WITHER_PLANTS_DAMAGE_BASE + level/100).
     * level/5 % instakill chance vs non-boss/mega-boss/super-boss plants.
     */
    druidWitherPlants() {
        const m = this.currentMember;
        if (!m || m.health <= 0) return;
        if (m.classId !== 'druid') return;
        if (m.level < DRUID_WITHER_PLANTS_UNLOCK_LEVEL) {
            this._addLog(`${m.name} must be level ${DRUID_WITHER_PLANTS_UNLOCK_LEVEL} to use Wither Plants.`);
            return;
        }
        if (m.mana < DRUID_WITHER_PLANTS_MANA_COST) {
            this._addLog(`${m.name} needs ${DRUID_WITHER_PLANTS_MANA_COST} MP to cast Wither Plants.`);
            return;
        }

        const targets = this.aliveHostileEnemies.filter(e => {
            const tags = this._getEnemyTags(e);
            return tags.includes(DRUID_WITHER_PLANTS_TARGET_TAG);
        });

        if (targets.length === 0) {
            this._addLog(`\u{1F342} ${m.name} calls upon Wither Plants… but there are no plant enemies to wither!`);
            return;
        }

        m.mana -= DRUID_WITHER_PLANTS_MANA_COST;

        let baseHit = randomInt(MAGIC_DAMAGE_MIN, MAGIC_DAMAGE_MAX);
        baseHit += m.getWeaponBonus('magic');
        baseHit += m.getClassDamageBonus('magic');
        baseHit += this._getPartyMemberDamageMod(m);
        baseHit = Math.max(1, baseHit);

        const mult = DRUID_WITHER_PLANTS_DAMAGE_BASE + m.level * DRUID_WITHER_PLANTS_DAMAGE_PER_LEVEL;
        const instakillChance = Math.min(0.95, (m.level / DRUID_WITHER_PLANTS_INSTAKILL_DIVISOR) / 100);

        this._addLog(`\u{1F342} ${m.name} channels nature's decay — Wither Plants strikes all plants! (-${DRUID_WITHER_PLANTS_MANA_COST} MP)`);

        for (const target of targets) {
            if (target.health <= 0) continue;
            const tName = this._eName(target);
            const canInstakill = !target.isBoss && !target.isMegaBoss && !target.isSuperBoss;

            if (canInstakill && instakillChance > 0 && Math.random() < instakillChance) {
                this._addLog(`\u{1F342} ${tName} withers to dust! (instant death)`);
                target.health = 0;
                if (!target._deathHandled) { target._deathHandled = true; this._onEnemyDeath(target); }
                continue;
            }

            const rawDmg = Math.max(1, Math.round(baseHit * mult));
            const dmg = this._applyOutgoingDamageBonuses(m, rawDmg, 'magic');
            const dealt = this._damageEnemy(target, dmg, false, true);
            this._addLog(`\u{1F342} ${tName} takes ${dealt} magic damage from Wither Plants!`);
            if (target.health <= 0 && !target._deathHandled) { target._deathHandled = true; this._onEnemyDeath(target); }
        }

        this._advancePlayerTurn();
    }

    /** Internal: clean up a druid's wild shape state. Called on deactivate, upkeep fail, or death. */
    _exitWildShape(m) {
        if (!m || !m.wildShapeForm) return;
        const form = m.wildShapeForm;
        // Remove summon buffs
        this._applyWildShapeSummonBuff(m, form, false);
        // Undo HP doubling
        if (m.wildShapeHpBonus > 0) {
            m.maxHealth = Math.max(1, m.maxHealth - m.wildShapeHpBonus);
            m.health    = Math.min(m.health, m.maxHealth);
        }
        // Restore row
        if (m.wildShapeOrigRow) m.row = m.wildShapeOrigRow;
        m.wildShapeForm    = null;
        m.wildShapeHpBonus  = 0;
        m.wildShapeDefBonus = 0;
        m.wildShapeOrigRow  = null;
        this._addLog(`\u{1F43E} ${m.name} returns to their natural form.`);
    }

    /**
     * Apply or remove Wild Shape buff on all living matching beasts owned by druid.
     * apply=true → add buff; apply=false → remove buff.
     */
    _applyWildShapeSummonBuff(druid, form, apply) {
        const dmgMult   = (form === 'pixie') ? DRUID_WILD_SUMMON_DMG_MULT_PIXIE : DRUID_WILD_SUMMON_DMG_MULT;
        const defDiv    = (form === 'pixie') ? DRUID_WILD_SUMMON_DEF_DIVISOR_PIXIE : DRUID_WILD_SUMMON_DEF_BONUS_DIVISOR;
        const defBonus  = Math.floor((druid.level || 1) / defDiv);

        const beasts = this.party.filter(p =>
            p.isSummoned && p.summonerId === druid.id && p.health > 0
            && p.summonStats && p.summonStats.beastKind === form,
        );
        for (const b of beasts) {
            const s = b.summonStats;
            if (apply) {
                s.wildShapeDmgMult      = dmgMult;
                s.wildShapeDefBonus     = defBonus;
                s.wildShapeExtraAttack  = true;
                s.defense               = (s.defense || 0) + defBonus;
            } else {
                s.defense = Math.max(0, (s.defense || 0) - (s.wildShapeDefBonus || 0));
                delete s.wildShapeDmgMult;
                delete s.wildShapeDefBonus;
                delete s.wildShapeExtraAttack;
            }
        }
    }

    /** Compute druid magic-skill attack damage (same formula as magicAttack). */
    _rollDruidWildShapeDmg(m) {
        let dmg = randomInt(MAGIC_DAMAGE_MIN, MAGIC_DAMAGE_MAX);
        dmg += m.getWeaponBonus('magic');
        dmg += m.getClassDamageBonus('magic');
        dmg += this._getPartyMemberDamageMod(m);
        dmg = Math.max(1, Math.round(dmg * (m.getMagicDamageMultiplier?.() || 1)));
        return dmg;
    }

    /** Bear Form attack — player picks target; floor(level/7) magic-melee hits with stun. */
    druidBearAttack(targetEnemy) {
        const m = this.currentMember;
        if (!m || m.wildShapeForm !== 'bear' || m.health <= 0) return;
        if (!targetEnemy || targetEnemy.health <= 0) return;
        if (m.row !== 'front') {
            this._addLog(`\u{1F43B} ${m.name} must be in the front row to attack in Bear Form!`);
            return;
        }
        const lvl   = m.level;
        const hits  = Math.max(1, Math.floor(lvl / DRUID_WILD_BEAR_ATTACKS_DIVISOR));
        const stunC = DRUID_WILD_BEAR_STUN_BASE + lvl * DRUID_WILD_BEAR_STUN_PER_LEVEL;
        this._addLog(`\u{1F43B} ${m.name} rears up in Bear Form!`);
        for (let i = 0; i < hits; i++) {
            if (targetEnemy.health <= 0) break;
            const dmg  = Math.max(1, Math.round(this._rollDruidWildShapeDmg(m) * 2.0));
            const out  = this._applyOutgoingDamageBonuses(m, dmg, 'magic');
            const dealt = this._damageEnemy(targetEnemy, out, false, false, 0, false, { contactAttacker: m });
            this._addLog(`\u{1F43B} ${m.name} mauls ${this._eName(targetEnemy)} for ${dealt}!`);
            if (targetEnemy.health > 0 && Math.random() < stunC) {
                if (this._tryStunEnemy(targetEnemy))
                    this._addLog(`⚡ ${this._eName(targetEnemy)} is stunned by the bear's crushing blow!`);
            }
        }
        if (targetEnemy.health <= 0) this._addLog(`${this._eName(targetEnemy)} is defeated!`);
        this._advancePlayerTurn();
    }

    /** Wolf Form attack — floor(level/5) magic-melee hits on chosen primary target, each bleeds. */
    druidWolfAttack(targetEnemy) {
        const m = this.currentMember;
        if (!m || m.wildShapeForm !== 'wolf' || m.health <= 0) return;
        if (!targetEnemy || targetEnemy.health <= 0) return;
        if (m.row !== 'front') {
            this._addLog(`\u{1F43A} ${m.name} must be in the front row to attack in Wolf Form!`);
            return;
        }
        const lvl      = m.level;
        const hits     = Math.max(1, Math.floor(lvl / DRUID_WILD_WOLF_ATTACKS_DIVISOR));
        const bleedC   = DRUID_WILD_WOLF_BLEED_BASE + lvl * DRUID_WILD_WOLF_BLEED_PER_LEVEL;
        const bleedDur = Math.max(1, Math.floor(lvl / DRUID_WILD_WOLF_BLEED_DURATION_DIVISOR));
        const bleedImmune = ['undead', 'construct', 'elemental', 'incorporeal', 'plant'];
        this._addLog(`\u{1F43A} ${m.name} lunges in Wolf Form!`);
        for (let i = 0; i < hits; i++) {
            if (targetEnemy.health <= 0) break;
            const target = targetEnemy;
            const dmg    = Math.max(1, Math.round(this._rollDruidWildShapeDmg(m) * 1.5));
            const out    = this._applyOutgoingDamageBonuses(m, dmg, 'magic');
            const dealt  = this._damageEnemy(target, out, false, false, 0, false, { contactAttacker: m });
            this._addLog(`\u{1F43A} ${m.name} bites ${this._eName(target)} for ${dealt}!`);
            const eTags = (ENEMY_TYPES[target.type] || {}).tags || [];
            if (target.health > 0 && dealt > 0 && Math.random() < bleedC && !eTags.some(t => bleedImmune.includes(t))) {
                const bleedDmg = Math.max(1, Math.round(dealt * DRUID_WILD_WOLF_BLEED_FRACTION));
                target.activeEffects = target.activeEffects || [];
                target.activeEffects.push({ type: 'bleed', damage: bleedDmg, rounds: bleedDur });
                this._addLog(`\u{1F7E5} ${this._eName(target)} bleeds! (${bleedDmg}/rd × ${bleedDur} rds)`);
            }
            if (target.health <= 0) this._addLog(`${this._eName(target)} is defeated!`);
        }
        this._advancePlayerTurn();
    }

    /** Storm Eagle Form attack — player picks target; floor(level/6) magic-ranged crits. */
    druidEagleAttack(targetEnemy) {
        const m = this.currentMember;
        if (!m || m.wildShapeForm !== 'eagle' || m.health <= 0) return;
        if (!targetEnemy || targetEnemy.health <= 0) return;
        const lvl   = m.level;
        const hits  = Math.max(1, Math.floor(lvl / DRUID_WILD_EAGLE_ATTACKS_DIVISOR));
        const critC = DRUID_WILD_EAGLE_CRIT_BASE + lvl * DRUID_WILD_EAGLE_CRIT_PER_LEVEL;
        const critM = DRUID_WILD_EAGLE_CRIT_MULT_BASE + lvl * DRUID_WILD_EAGLE_CRIT_MULT_PER_LEVEL;
        this._addLog(`\u{1F985} ${m.name} swoops in Storm Eagle Form!`);
        for (let i = 0; i < hits; i++) {
            if (targetEnemy.health <= 0) break;
            let dmg  = Math.max(1, Math.round(this._rollDruidWildShapeDmg(m) * 1.5));
            const isCrit = Math.random() < critC;
            if (isCrit) dmg = Math.max(1, Math.round(dmg * critM));
            const out  = this._applyOutgoingDamageBonuses(m, dmg, 'magic');
            const dealt = this._damageEnemy(targetEnemy, out, false, false, 0, true);
            const critNote = isCrit ? ` \u{1F4A5} CRIT! (×${critM.toFixed(1)})` : '';
            this._addLog(`\u{1F985} ${m.name} strikes ${this._eName(targetEnemy)} for ${dealt}!${critNote}`);
        }
        if (targetEnemy.health <= 0) this._addLog(`${this._eName(targetEnemy)} is defeated!`);
        this._advancePlayerTurn();
    }

    /** Pixie Form attack — magic AoE hits ALL enemies; druid takes half magic/AoE damage while active. */
    druidPixieAttack() {
        const m = this.currentMember;
        if (!m || m.wildShapeForm !== 'pixie' || m.health <= 0) return;
        const enemies = this.aliveHostileEnemies;
        if (enemies.length === 0) { this._addLog('No enemies to target.'); return; }
        this._addLog(`\u{1F9DA} ${m.name} unleashes pixie magic in Pixie Form!`);
        for (const e of enemies) {
            if (e.health <= 0) continue;
            const dmg    = Math.max(1, Math.round(this._rollDruidWildShapeDmg(m) * 1.2));
            const out    = this._applyOutgoingDamageBonuses(m, dmg, 'magic');
            const dealt  = this._damageEnemy(e, out, false, true);
            this._addLog(`\u{1F9DA} ${m.name} hits ${this._eName(e)} for ${dealt} magic damage!`);
            if (e.health <= 0) this._addLog(`${this._eName(e)} is defeated!`);
        }
        this._advancePlayerTurn();
    }

    /** Treant Form attack — floor(level/7) magic-melee hits on chosen primary target, hold chance. */
    druidTreantAttack(targetEnemy) {
        const m = this.currentMember;
        if (!m || m.wildShapeForm !== 'treant' || m.health <= 0) return;
        if (!targetEnemy || targetEnemy.health <= 0) return;
        if (m.row !== 'front') {
            this._addLog(`\u{1F333} ${m.name} must be in the front row to attack in Treant Form!`);
            return;
        }
        const lvl   = m.level;
        const hits  = Math.max(1, Math.floor(lvl / DRUID_WILD_TREANT_ATTACKS_DIVISOR));
        const holdC = DRUID_WILD_TREANT_HOLD_BASE + lvl * DRUID_WILD_TREANT_HOLD_PER_LEVEL;
        this._addLog(`\u{1F333} ${m.name} looms in Treant Form!`);
        for (let i = 0; i < hits; i++) {
            if (targetEnemy.health <= 0) break;
            const target = targetEnemy;
            const dmg    = Math.max(1, Math.round(this._rollDruidWildShapeDmg(m) * 2.0));
            const out    = this._applyOutgoingDamageBonuses(m, dmg, 'magic');
            const dealt  = this._damageEnemy(target, out, false, false, 0, false, { contactAttacker: m });
            this._addLog(`\u{1F333} ${m.name} slams ${this._eName(target)} with ancient branches for ${dealt}!`);
            if (target.health > 0 && Math.random() < holdC) {
                if (this._tryHoldEnemy(target))
                    this._addLog(`\u{1F333} ${this._eName(target)} is held fast by grasping roots!`);
            }
            if (target.health <= 0) this._addLog(`${this._eName(target)} is defeated!`);
        }
        this._advancePlayerTurn();
    }

    defend() {
        const m = this.currentMember;
        if (!m) return;
        m._defending = true;
        this._addLog(`${m.name} takes a defensive stance.`);
        this._advancePlayerTurn();
    }

    /**
     * Warrior L20: toggle Defend Mode on/off.
     * Toggling is the warrior's action for this turn (turn advances).
     * While Defend Mode is active, the warrior intercepts attacks on
     * party members using their augmented shield block chance.
     */
    warriorDefendModeToggle() {
        const m = this.currentMember;
        if (!m || m.classId !== 'warrior' || m.level < WARRIOR_DEFEND_MODE_UNLOCK_LEVEL) return;
        m.isDefendMode = !m.isDefendMode;
        if (m.isDefendMode) {
            const bonus  = Math.round(m.getDefendModeShieldBonus() * 100);
            const total  = Math.round(m.getAugmentedShieldBlock()  * 100);
            this._addLog(`\u{1F6E1}️ ${m.name} enters Defend Mode! Shield block +${bonus}% → ${total}% total. Attacks disabled; intercepts ally hits.`);
        } else {
            this._addLog(`⚔️ ${m.name} exits Defend Mode and readies for combat.`);
        }
        this._advancePlayerTurn();
    }

    /**
     * Pass the current turn without attacking (used when warrior is in Defend Mode
     * and the player does not want to toggle it off or use Defend/Flee).
     */
    endTurn() {
        const m = this.currentMember;
        if (!m) return;
        this._addLog(`\u{1F6E1}️ ${m.name} stands guard.`);
        this._advancePlayerTurn();
    }

    _summonMagicItemAlly(kind, actor) {
        const level = Math.max(1, actor?.level || 1);
        const makeId = (prefix) => `${prefix}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 6)}`;
        const add = (member) => {
            this.party.push(member);
            this._registerNewSummon(member);
            return member;
        };

        if (kind === 'einherjar') {
            const count = randomInt(2, 5);
            for (let i = 0; i < count; i++) {
                const hp = Math.max(1, Math.floor((actor?.maxHealth || 100) * 0.75));
                const warrior = new PartyMember({
                    id: makeId('einherjar'),
                    name: `Einherjar ${i + 1}`,
                    classId: 'summoned',
                    speciesId: 'human',
                    level,
                    maxHealth: hp,
                    maxStamina: 100,
                    maxMana: 0,
                    isSummoned: true,
                    summonType: 'magic_item_einherjar',
                    summonerId: actor?.id || null,
                    canBeHealed: false,
                    row: 'front',
                    summonStats: {
                        magicItemSummon: 'einherjar',
                        meleeMin: 8 + level,
                        meleeMax: 18 + level * 2,
                        defense: level,
                        incorporeal: true,
                        immune: ['stun', 'poison', 'web', 'hold', 'bleed', 'rot'],
                    },
                });
                warrior.health = hp;
                add(warrior);
            }
            this._addLog(`\u{1F4EF} ${actor.name} sounds the Horn of Valhalla — ${count} Einherjar answer!`);
            return true;
        }

        if (kind === 'rat_swarm') {
            const hp = Math.max(1, Math.floor((actor?.maxHealth || 100) * 2));
            const swarm = new PartyMember({
                id: makeId('rat_swarm'),
                name: `${actor.name}'s Rat Swarm`,
                classId: 'summoned',
                speciesId: 'human',
                level,
                maxHealth: hp,
                maxStamina: 100,
                maxMana: 0,
                isSummoned: true,
                summonType: 'magic_item_rat_swarm',
                summonerId: actor?.id || null,
                canBeHealed: true,
                row: 'front',
                summonStats: {
                    magicItemSummon: 'rat_swarm',
                    meleeMin: 10 + level,
                    meleeMax: 25 + level * 2,
                    defense: Math.max(1, Math.floor(level / 2)),
                    immune: ['stun', 'web', 'hold'],
                },
            });
            swarm.health = hp;
            add(swarm);
            this._addLog(`\u{1FA88} ${actor.name} plays the Pipes of the Sewers — a rat swarm floods in!`);
            return true;
        }

        if (kind === 'bound_demon') {
            const names = ['Bound Imp', 'Bound Quasit', 'Bound Hellion', 'Bound Chain Fiend', 'Bound Ash Devil'];
            const name = names[Math.floor(Math.random() * names.length)];
            const hp = Math.max(1, Math.floor((actor?.maxHealth || 100) * 1.25));
            const demon = new PartyMember({
                id: makeId('bound_demon'),
                name,
                classId: 'summoned',
                speciesId: 'human',
                level,
                maxHealth: hp,
                maxStamina: 75,
                maxMana: 999,
                isSummoned: true,
                summonType: 'magic_item_bound_demon',
                summonerId: actor?.id || null,
                canBeHealed: false,
                row: 'back',
                summonStats: {
                    magicItemSummon: 'bound_demon',
                    magicMin: 12 + level,
                    magicMax: 28 + level * 2,
                    defense: Math.max(1, Math.floor(level / 2)),
                    immune: ['fire', 'poison'],
                },
            });
            demon.health = hp;
            add(demon);
            this._addLog(`\u{1F52F} ${actor.name} opens a Demon Pentagram — ${name} is bound to the party!`);
            return true;
        }

        return false;
    }

    /**
     * Use a combat-usable item from personal or group inventory.
     * @param {string} itemId      — item to use
     * @param {string} source      — 'personal' | 'group'
     * @param {string} [targetId]  — party member id to receive the effect (defaults to current member)
     */
    useItemInCombat(itemId, source, targetId) {
        const actor = this.currentMember;
        if (!actor || actor.health <= 0) return;
        if (this.phase !== 'PLAYER_TURN') return;

        const def = getItemDef(itemId);
        if (!def || !def.combatUsable) return;

        // Determine target party member
        const target = targetId
            ? this.party.find(p => p.id === targetId)
            : actor;
        if (!target) return;

        // Apply the effect
        let applied = false;
        switch (itemId) {
            case 'healing_potion': {
                if (target.health <= 0) {
                    // resurrection_potion handles dead targets; healing_potion requires alive
                    this._addLog(`\u{1F9EA} ${target.name} is unconscious — use a Resurrection Potion instead.`);
                    return;
                }
                if (target.health >= target.maxHealth) {
                    this._addLog(`\u{1F9EA} ${target.name} is already at full health.`);
                    return;
                }
                target.health = target.maxHealth;
                this._addLog(`\u{1F9EA} ${actor.name} uses a Healing Potion on ${target.name} — fully restored to ${target.maxHealth} HP!`);
                applied = true;
                break;
            }
            case 'resurrection_potion': {
                if (target.health > 0) {
                    this._addLog(`\u{1F56F}️ ${target.name} is still alive — Resurrection Potion is for fallen allies.`);
                    return;
                }
                target.health = target.maxHealth;
                target.stamina = target.maxStamina;
                this._addLog(`\u{1F56F}️ ${actor.name} uses a Resurrection Potion on ${target.name} — they rise to full health!`);
                applied = true;
                break;
            }
            case 'minor_healing_potion': {
                if (target.health <= 0) { this._addLog(`Cannot heal an unconscious ally with this potion.`); return; }
                if (target.health >= target.maxHealth) { this._addLog(`${target.name} is already at full health.`); return; }
                const minAmt = Math.max(1, Math.ceil(target.maxHealth * POTION_MINOR_HEAL_PCT));
                target.health = Math.min(target.maxHealth, target.health + minAmt);
                this._addLog(`\u{2695}️ ${actor.name} uses a Minor Healing Potion on ${target.name} — restored ${minAmt} HP (now ${target.health}/${target.maxHealth}).`);
                applied = true;
                break;
            }
            case 'greater_healing_potion': {
                if (target.health <= 0) { this._addLog(`Cannot heal an unconscious ally with this potion.`); return; }
                if (target.health >= target.maxHealth) { this._addLog(`${target.name} is already at full health.`); return; }
                const gtAmt = Math.max(1, Math.ceil(target.maxHealth * POTION_GREATER_HEAL_PCT));
                target.health = Math.min(target.maxHealth, target.health + gtAmt);
                this._addLog(`\u{1F489} ${actor.name} uses a Greater Healing Potion on ${target.name} — restored ${gtAmt} HP (now ${target.health}/${target.maxHealth}).`);
                applied = true;
                break;
            }
            case 'mana_potion': {
                if (target.health <= 0) { this._addLog(`Cannot restore mana to an unconscious ally with this potion.`); return; }
                if (target.mana >= target.maxMana) { this._addLog(`${target.name} is already at full mana.`); return; }
                const mpAmt = Math.max(1, Math.ceil(target.maxMana * POTION_MANA_RESTORE_PCT));
                target.mana = Math.min(target.maxMana, target.mana + mpAmt);
                this._addLog(`\u{1F499} ${actor.name} uses a Mana Potion on ${target.name} — restored ${mpAmt} MP (now ${target.mana}/${target.maxMana}).`);
                applied = true;
                break;
            }
            case 'elixir_warding': {
                const alLevel = this.party.reduce((max, p) => (!p.isSummoned && p.classId === 'artificer' && p.health > 0 ? Math.max(max, p.level || 1) : max), 0);
                const wBonus = calcScrollBonus(alLevel);
                const wDurMs = (5 + Math.floor(alLevel / 2)) * 60 * 1000;
                const wTargets = this.party.filter(p => !p.isSummoned && p.health > 0);
                for (const t of wTargets) t.addEffect({ type: 'elixir_warding', defenseBonus: wBonus, expiresAt: Date.now() + wDurMs });
                this._addLog(`\u{1F6E1}️ ${actor.name} reads the Scroll of Warding — +${wBonus} defense to all ${wTargets.length} living allies!`);
                applied = true;
                break;
            }
            case 'elixir_wrath': {
                const alLevel = this.party.reduce((max, p) => (!p.isSummoned && p.classId === 'artificer' && p.health > 0 ? Math.max(max, p.level || 1) : max), 0);
                const rBonus = calcScrollBonus(alLevel);
                const rDurMs = (5 + Math.floor(alLevel / 2)) * 60 * 1000;
                const rTargets = this.party.filter(p => !p.isSummoned && p.health > 0);
                for (const t of rTargets) t.addEffect({ type: 'elixir_wrath', damageBonus: rBonus, expiresAt: Date.now() + rDurMs });
                this._addLog(`\u{1F525} ${actor.name} reads the Scroll of Wrath — +${rBonus} damage to all ${rTargets.length} living allies!`);
                applied = true;
                break;
            }
            case 'cloak_of_displacement': {
                if (target.health <= 0) { this._addLog(`Cannot cloak an unconscious ally.`); return; }
                target.activeEffects = (target.activeEffects || []).filter(fx => !fx || fx.type !== 'cloak_of_displacement');
                target.addEffect({ type: 'cloak_of_displacement', permanent: true });
                this._addLog(`\u{1F9E5} ${actor.name} activates a Cloak of Displacement on ${target.name} — 30% avoidance vs melee, ranged, and single-target magic this combat.`);
                applied = true;
                break;
            }
            case 'horn_of_valhalla': {
                applied = this._summonMagicItemAlly('einherjar', actor);
                break;
            }
            case 'pipes_of_the_sewers': {
                applied = this._summonMagicItemAlly('rat_swarm', actor);
                break;
            }
            case 'demon_pentagram': {
                applied = this._summonMagicItemAlly('bound_demon', actor);
                break;
            }
            default:
                this._addLog(`${itemId} cannot be used in combat.`);
                return;
        }

        if (!applied) return;

        // Consume the item
        if (source === 'personal') {
            actor.removeItem(itemId, 1);
        } else {
            this.inventory.removeItem(itemId, 1);
        }

        soundManager.playPotion?.();
        this._notify();
        this._advancePlayerTurn();
    }

    /**
     * Warrior L30: Summon Squire(s). Costs WARRIOR_SQUIRE_STAMINA_COST ST. Once per combat.
     * Creates 1 (L30), 2 (L60), or 3 (L90) front-row warrior squires at 66% of warrior's stats.
     * Squires auto-join formation if warrior is already in formation.
     */
    warriorSummonSquires() {
        const m = this.currentMember;
        if (!m || m.classId !== 'warrior' || m.isSummoned || m.level < WARRIOR_SQUIRE_UNLOCK_LEVEL) return;
        if (m.squiresSummoned) {
            this._addLog(`${m.name} has already summoned squires this combat.`);
            return;
        }
        if (m.stamina < WARRIOR_SQUIRE_STAMINA_COST) {
            this._addLog(`${m.name} needs ${WARRIOR_SQUIRE_STAMINA_COST} ST to summon squires.`);
            return;
        }
        const squireCount = m.level >= WARRIOR_SQUIRE_COUNT_L90 ? 3
            : m.level >= WARRIOR_SQUIRE_COUNT_L60 ? 2 : 1;
        m.stamina = Math.max(0, m.stamina - WARRIOR_SQUIRE_STAMINA_COST);
        m.squiresSummoned = true;
        const wl         = m.level;
        const maxHp      = Math.max(1, Math.floor(m.maxHealth  * WARRIOR_SQUIRE_HP_FRACTION));
        const maxSt      = Math.max(1, Math.floor(m.maxStamina * WARRIOR_SQUIRE_STAMINA_FRACTION));
        const meleeBonus = m.getWeaponBonus('melee') + m.getClassDamageBonus('melee');
        const sqMeleeMin = Math.max(1, Math.floor((MELEE_DAMAGE_MIN + meleeBonus) * WARRIOR_SQUIRE_MELEE_FRACTION));
        const sqMeleeMax = Math.max(2, Math.floor((MELEE_DAMAGE_MAX + meleeBonus) * WARRIOR_SQUIRE_MELEE_FRACTION));
        const defense    = Math.max(0, Math.floor((m.getTotalDefense() + m.getArmorBlocking()) * WARRIOR_SQUIRE_DEFENSE_FRACTION));
        for (let i = 0; i < squireCount; i++) {
            const sq = new PartyMember({
                name:         `${m.name}'s Squire ${i + 1}`,
                classId:      'warrior',
                speciesId:    'human',
                level:        wl,
                maxHealth:    maxHp,
                maxStamina:   maxSt,
                maxMana:      0,
                portraitSeed: Math.floor(Math.random() * 100000),
                isSummoned:   true,
                summonType:   'squire',
                summonerId:   m.id,
                canBeHealed:  true,
                row:          'front',
            });
            sq.summonStats    = { defense, meleeMin: sqMeleeMin, meleeMax: sqMeleeMax };
            sq.isInFormation  = !!m.isInFormation;
            this.party.push(sq);
            this._registerNewSummon(sq);
        }
        const attacks = Math.max(1, Math.floor(wl / WARRIOR_SQUIRE_ATTACKS_PER_LEVELS));
        this._addLog(`⚔️ ${m.name} calls for aid! ${squireCount} squire${squireCount > 1 ? 's' : ''} answer the call! (HP:${maxHp} ST:${maxSt} Def:${defense} Atk:${sqMeleeMin}-${sqMeleeMax} ×${attacks}/rnd)`);
        this._advancePlayerTurn();
    }

    /**
     * Warrior L30: Toggle Formation stance. FREE action — does NOT consume the turn.
     * Warrior and own squires enter/exit formation together.
     * With ≥2 alive formation members, all deal increased melee damage.
     */
    warriorFormationToggle() {
        const m = this.currentMember;
        if (!m || m.classId !== 'warrior' || m.isSummoned || m.level < WARRIOR_FORMATION_UNLOCK_LEVEL) return;
        m.isInFormation = !m.isInFormation;
        // Auto-sync all of this warrior's squires
        for (const sq of this.party) {
            if (sq.isSummoned && sq.summonType === 'squire' && sq.summonerId === m.id) {
                sq.isInFormation = m.isInFormation && sq.health > 0;
            }
        }
        if (m.isInFormation) {
            const n    = this._getFormationMembers().length;
            const mult = n >= WARRIOR_FORMATION_MIN_MEMBERS
                ? `×${(1 + WARRIOR_FORMATION_BONUS_PER_MEMBER * n).toFixed(2)}`
                : `none yet (need ≥${WARRIOR_FORMATION_MIN_MEMBERS} members)`;
            this._addLog(`⚔️ ${m.name} enters Formation! Current bonus: ${mult}.`);
        } else {
            this._addLog(`⚔️ ${m.name} breaks Formation.`);
        }
        this._notify();
    }

    warriorTauntToggle() {
        const m = this.currentMember;
        if (!m || m.classId !== 'warrior' || m.isSummoned || m.level < WARRIOR_TAUNT_UNLOCK_LEVEL) return;
        m.warriorTauntActive = !m.warriorTauntActive;
        if (m.warriorTauntActive) {
            const chance = Math.min(95, (m.level || 1) + (m.isDefendMode ? Math.round(WARRIOR_TAUNT_DEFEND_CHANCE_BONUS * 100) : 0));
            const penalty = Math.max(1, Math.floor((m.level || 1) / (m.isDefendMode ? WARRIOR_TAUNT_DEFEND_PENALTY_DIVISOR : WARRIOR_TAUNT_PENALTY_DIVISOR)));
            this._addLog(`🛡️ ${m.name} begins taunting! (${chance}% draw check, -${penalty} attack on redirected hits, ${WARRIOR_TAUNT_STAMINA_PER_ROUND} ST/round)`);
        } else {
            this._addLog(`🛡️ ${m.name} stops taunting.`);
        }
        this._notify();
    }

    flee() {
        if (Math.random() < FLEE_CHANCE) {
            this._addLog('Your party flees from combat!');
            this.phase = 'FLED';
            this._notify();
        } else {
            this._addLog('Failed to flee! The enemies close in...');
            this._advancePlayerTurn();
        }
    }

    promoteToFront(memberId) {
        const m = this.party.find(p => p.id === memberId);
        if (!m || m.health <= 0) return;
        m.row = 'front';
        if (m.activeEffects) {
            const hadShadowStep = m.activeEffects.some(fx => fx && fx.type === 'shadow_step');
            m.activeEffects = m.activeEffects.filter(fx => !fx || fx.type !== 'shadow_step');
            if (hadShadowStep) this._addLog(`🌑 ${m.name} breaks from the shadows to take the front line!`);
        }
        this._addLog(`${m.name} moves to the front row!`);
        // Clear the stale NEED_PROMOTION phase so _advanceThroughInitiative doesn't
        // bail out at line "if (this.phase === 'NEED_PROMOTION') return" after an
        // enemy attack that doesn't trigger a new promotion — causing the UI to
        // appear frozen with the same promotion screen showing.
        this.phase = 'IDLE';
        this._advanceThroughInitiative();
    }

    /** Free action: toggle any living summon between front and back row. Does not advance the turn. */
    repositionSummon(memberId) {
        const m = this.party.find(p => p.id === memberId && p.isSummoned);
        if (!m || m.health <= 0) return;
        m.row = m.row === 'front' ? 'back' : 'front';
        this._addLog(`${m.name} repositions to the ${m.row} row.`);
        this._notify();
    }

    // ────────────────────────────────────────────
    // Summon combat AI
    // ────────────────────────────────────────────

    _processIllusionaryWarriorAttack(m) {
        const photomancer = this.party.find(p => p.id === m.summonerId && p.health > 0);
        const level = photomancer?.level || m.summonStats?.photomancerLevel || m.level || 1;
        const attacks = Math.max(1, Math.floor(level / 5));
        this._addLog(`\u{1FA9E} ${m.name} flickers into motion (${attacks} illusion attack${attacks !== 1 ? 's' : ''}).`);
        for (let i = 0; i < attacks; i++) {
            const targets = this.aliveHostileEnemies;
            if (!targets.length) break;
            const t = targets[Math.floor(Math.random() * targets.length)];
            const def = ENEMY_TYPES[t.type] || {};
            const tags = this._getEnemyTags(t);
            if (tags.includes('undead') || tags.includes('construct') || def.fullMagicImmune) {
                this._addLog(`  \u2192 ${this._eName(t)} ignores the illusion.`);
                continue;
            }
            if (Math.random() < Math.min(0.95, (t.level || 1) / 100)) {
                this._addLog(`  \u2192 ${this._eName(t)} disbelieves the strike; it passes harmlessly.`);
                continue;
            }
            let dmg = photomancer ? this._rollPhotomancerMagicDamage(photomancer, 1 + level / 100) : Math.max(1, randomInt(MAGIC_DAMAGE_MIN, MAGIC_DAMAGE_MAX));
            const dealt = this._damageEnemy(t, dmg, true, true, 0, false, { contactAttacker: m });
            this._addLog(`  \u2192 ${m.name} cuts ${this._eName(t)} with solid light for ${dealt}.`);
            if (t.health <= 0) this._addLog(`${this._eName(t)} is defeated!`);
        }
    }

    _processSimulacrumAttack(m) {
        const st = m.summonStats || {};
        const targets = this.aliveHostileEnemies;
        if (!targets.length) return;
        const level = st.photomancerLevel || m.level || 1;
        const powers = Array.isArray(st.powers) ? st.powers : [];
        const has = (id) => powers.includes(id);
        const dmgMult = 1 + (st.damageBonusPct ?? level) / 100;

        if (has('regen') && m.health > 0 && m.health < m.maxHealth) {
            const regenPct = Math.max(1, Math.floor(level / 3)) / 100;
            const heal = Math.max(1, Math.floor(m.maxHealth * regenPct));
            const before = m.health;
            m.health = Math.min(m.maxHealth, m.health + heal);
            if (m.health > before) this._addLog(`🌑 ${m.name} knits shadow-stuff for ${m.health - before} HP.`);
        }

        if (has('heal_party') && Math.random() < 0.50) {
            const healPct = Math.max(1, Math.floor(level / 3)) / 100;
            const healed = [];
            for (const ally of this.party || []) {
                if (!ally || ally.health <= 0 || ally.health >= ally.maxHealth) continue;
                if (ally.canBeHealed === false || isShadowSimulacra(ally)) continue;
                if (this._isUndeadOrGolemMember(ally) || ally.isLichForm) continue;
                const amt = Math.max(1, Math.floor(ally.maxHealth * healPct));
                const before = ally.health;
                ally.health = Math.min(ally.maxHealth, ally.health + amt);
                if (ally.health > before) healed.push(`${ally.name} +${ally.health - before}`);
            }
            if (healed.length) {
                this._addLog(`🌑 ${m.name} reshapes shadow into a mass heal: ${healed.join(', ')}.`);
                return;
            }
        }

        let kind = ['melee', 'ranged', 'magic'].includes(st.attackType) ? st.attackType : null;
        if (!kind) {
            kind = 'melee';
            if (has('extra_ranged')) kind = 'ranged';
            else if (has('extra_magic')) kind = 'magic';
        }
        const extraAttacks = has('extra_melee') || has('extra_ranged') || has('extra_magic')
            ? Math.max(1, Math.floor(level / 5))
            : 0;
        const attacks = 1 + extraAttacks;
        const isAoe = has('aoe_attack');
        const targetsPerAttack = isAoe ? Infinity : 1;
        const hitMult = isAoe ? 0.66 : 1;
        this._addLog(`🌑 ${m.name} attacks as a Shadow Simulacra (${attacks} ${kind}${isAoe ? ', all enemies' : ''}).`);

        for (let i = 0; i < attacks; i++) {
            const alive = this.aliveHostileEnemies;
            if (!alive.length) break;
            const chosen = alive.slice().sort(() => Math.random() - 0.5).slice(0, targetsPerAttack);
            for (const t of chosen) {
                if (!t || t.health <= 0) continue;
                const min = kind === 'magic' ? (st.magicMin || 1) : kind === 'ranged' ? (st.rangedMin || 1) : (st.meleeMin || 1);
                const max = kind === 'magic' ? (st.magicMax || min) : kind === 'ranged' ? (st.rangedMax || min) : (st.meleeMax || min);
                const baseRaw = Math.max(1, randomInt(min, max));
                const raw = Math.max(1, Math.round(baseRaw * hitMult * dmgMult));
                const options = {
                    sourceMember: m,
                    isMagic: kind === 'magic',
                    isRanged: kind === 'ranged',
                };
                if (kind === 'melee') options.contactAttacker = m;
                const dealt = this._damageSummonEnemy(t, raw, has('phase_strike'), false, options);
                this._addLog(`  \u2192 ${m.name} ${kind === 'magic' ? 'lashes' : kind === 'ranged' ? 'shoots' : 'strikes'} ${this._eName(t)} for ${dealt} damage.`);
                if (dealt > 0) this._applyShadowSimulacraRiders(m, t, dealt, baseRaw, powers, level);
                if (t.health <= 0) this._addLog(`${this._eName(t)} is defeated!`);
            }
        }
    }

    _applyShadowSimulacraRiders(m, target, dealt, baseRaw, powers, level) {
        if (!target || target.health <= 0 || dealt <= 0) return;
        const has = (id) => powers.includes(id);
        const dotRounds = Math.max(1, Math.floor(level / 7));
        for (const id of Object.keys(SHADOW_SIMULACRA_DOT_POWERS)) {
            if (!has(id)) continue;
            const dot = SHADOW_SIMULACRA_DOT_POWERS[id];
            if (this._enemyHasImmunity(target, dot.immune)) {
                this._addLog(`    ${this._eName(target)} is immune to ${dot.label}.`);
                continue;
            }
            const tick = Math.max(1, Math.floor(dealt * dot.frac));
            if (!Array.isArray(target.activeEffects)) target.activeEffects = [];
            target.activeEffects.push({ type: dot.effect, damage: tick, rounds: dotRounds });
            this._addLog(`    ${dot.icon} ${dot.label}: ${tick}/rd for ${dotRounds} rd${dotRounds !== 1 ? 's' : ''}.`);
        }
        if (has('stun_attack') && Math.random() < Math.max(0, level / 3) / 100) {
            if (this._tryStunEnemy(target)) this._addLog(`    ⚡ ${this._eName(target)} is stunned by the shadow strike!`);
        }
        if (has('hold_attack') && Math.random() < Math.max(0, level / 3) / 100) {
            if (this._tryHoldEnemy(target)) this._addLog(`    ⛓️ ${this._eName(target)} is held by shadow bonds!`);
        }
        if (has('resource_drain')) {
            const tags = this._getEnemyTags(target);
            if (tags.some(t => ['construct', 'undead', 'elemental'].includes(t))) {
                this._addLog(`    ${this._eName(target)} cannot have stamina or mana drained.`);
            } else {
                const drain = Math.max(1, Math.floor(baseRaw * (level / 100)));
                if (typeof target.stamina === 'number') target.stamina = Math.max(0, target.stamina - drain);
                if (typeof target.mana === 'number') target.mana = Math.max(0, target.mana - drain);
                this._addLog(`    🌑 ${this._eName(target)} loses ${drain} stamina and ${drain} mana.`);
            }
        }
        if (has('life_drain')) {
            const heal = Math.max(1, Math.floor(dealt * (level / 2) / 100));
            const before = m.health;
            m.health = Math.min(m.maxHealth, m.health + heal);
            if (m.health > before) this._addLog(`    🌑 ${m.name} drains ${m.health - before} HP.`);
        }
        const debuffRounds = Math.max(1, Math.floor(level / 10));
        const penalty = Math.max(1, Math.floor(level / 8));
        if (has('offense_debuff')) {
            if (!Array.isArray(target.activeEffects)) target.activeEffects = [];
            target.activeEffects.push({
                type: 'shadow_offense_debuff',
                damageBonus: -penalty,
                rangedBonus: -penalty,
                magicBonus: -penalty,
                rounds: debuffRounds,
            });
            this._addLog(`    🌑 ${this._eName(target)} loses ${penalty} melee/ranged/magic for ${debuffRounds} rd${debuffRounds !== 1 ? 's' : ''}.`);
        }
        if (has('defense_debuff')) {
            if (!Array.isArray(target.activeEffects)) target.activeEffects = [];
            target.activeEffects.push({
                type: 'shadow_defense_debuff',
                defenseBonus: -penalty,
                rounds: debuffRounds,
            });
            this._addLog(`    🌑 ${this._eName(target)} loses ${penalty} defense for ${debuffRounds} rd${debuffRounds !== 1 ? 's' : ''}.`);
        }
    }

    _takeSummonTurn(m) {
        const stats = m.summonStats || {};
        const targets = this.aliveHostileEnemies;
        if (stats.beastKind === 'shambling_mound') {
            this._updateShamblingMoundState(m);
        }
        if (targets.length === 0) return;

        if (m.isSummoned && m.summonType === 'illusionary_warrior') {
            this._processIllusionaryWarriorAttack(m);
            return;
        }
        if (isShadowSimulacra(m)) {
            this._processSimulacrumAttack(m);
            return;
        }

        if (stats.magicItemSummon) {
            const target = targets[Math.floor(Math.random() * targets.length)];
            if (!target) return;
            if (stats.magicItemSummon === 'einherjar') {
                const dmg = randomInt(stats.meleeMin || 1, stats.meleeMax || 1);
                const dealt = this._damageSummonEnemy(target, dmg, false, false, { contactAttacker: m });
                this._addLog(`\u{1F4EF} ${m.name} strikes ${this._eName(target)} for ${dealt}.`);
                if (target.health <= 0) this._addLog(`${this._eName(target)} is defeated!`);
                return;
            }
            if (stats.magicItemSummon === 'rat_swarm') {
                const hpRatio = Math.max(0.25, (m.health || 1) / Math.max(1, m.maxHealth || 1));
                const raw = Math.max(1, Math.round(randomInt(stats.meleeMin || 1, stats.meleeMax || 1) * hpRatio));
                const dealt = this._damageSummonEnemy(target, raw, false, false, { contactAttacker: m });
                this._addLog(`\u{1FA88} ${m.name} swarms ${this._eName(target)} for ${dealt}.`);
                if (target.health <= 0) this._addLog(`${this._eName(target)} is defeated!`);
                return;
            }
            if (stats.magicItemSummon === 'bound_demon') {
                const raw = randomInt(stats.magicMin || 1, stats.magicMax || 1);
                const dealt = this._damageSummonEnemy(target, raw, false, false, { isMagic: true });
                this._addLog(`\u{1F52F} ${m.name} hurls infernal force at ${this._eName(target)} for ${dealt}.`);
                if (target.health <= 0) this._addLog(`${this._eName(target)} is defeated!`);
                return;
            }
        }

        // ── Squire AI (warrior L30 summoned allies) ────────────────────────────
        if (m.isSummoned && m.summonType === 'squire') {
            const warrior = this.party.find(p => p.id === m.summonerId && p.health > 0);
            if (!warrior) return;
            const attackCount = Math.max(1, Math.floor((m.level || 1) / WARRIOR_SQUIRE_ATTACKS_PER_LEVELS));
            for (let atk = 0; atk < attackCount; atk++) {
                const livingTargets = this.aliveHostileEnemies;
                if (!livingTargets.length) break;
                const t = livingTargets[Math.floor(Math.random() * livingTargets.length)];
                const exhausted = m.stamina < MELEE_STAMINA_COST;
                m.stamina = Math.max(0, m.stamina - MELEE_STAMINA_COST);
                let dmg = Math.max(1, Math.floor(this._rollPlayerMeleeDamage(warrior) * WARRIOR_SQUIRE_MELEE_FRACTION));
                if (exhausted) dmg = Math.max(1, Math.floor(dmg / 2));
                const formMult = this._getFormationMultiplier(m);
                let sqFormCrit = false;
                if (formMult > 1) {
                    dmg = Math.max(1, Math.floor(dmg * formMult));
                    const critRes = this._applyFormationCrit(warrior, dmg);
                    dmg = critRes.damage;
                    sqFormCrit = critRes.crit;
                }
                const dealt = this._damageSummonEnemy(t, dmg, false, false, { contactAttacker: m });
                let sqLog = `⚔️ ${m.name} strikes ${this._eName(t)} for ${dealt}!${exhausted ? ' (exhausted!)' : ''}`;
                if (sqFormCrit) sqLog += ` 💥 FORMATION CRIT!`;
                this._addLog(sqLog);
                if (t.health <= 0) this._addLog(`${this._eName(t)} is defeated!`);
            }
            return;
        }

        // ── Golem AI (persistent artificer summons) ──
        // Identified by summonStats.tierId matching a GOLEM_PRESETS entry.
        if (stats.tierId && GOLEM_PRESETS[m.summonType]) {
            const golemDamageMult = 1 + ((stats.attachments && stats.attachments.limbs) || 0) * GOLEM_ATTACHMENT_LIMB_DAMAGE_MULT;
            const berserkMult = m.golemBerserkActive
                ? (1 + (stats.artificerLevel || 0) * ARTIFICER_BERSERK_DMG_PER_LEVEL)
                : 1.0;
            const rollGolemDamage = (min, max) => Math.max(1, Math.round(randomInt(min, max) * golemDamageMult * berserkMult));
            // Flesh Golem — regen at start of own turn.
            if (stats.regenPercent && stats.regenPercent > 0 && m.health < m.maxHealth) {
                const regen = Math.max(1, Math.floor(m.maxHealth * stats.regenPercent));
                const before = m.health;
                m.health = Math.min(m.maxHealth, m.health + regen);
                const healed = m.health - before;
                if (healed > 0) this._addLog(`\u{1F9A0} ${m.name} knits flesh and recovers ${healed} HP.`);
            }

            // Stone Golem — AoE slam every N rounds.
            if (stats.slamEvery && stats.slamEvery > 0) {
                stats.slamCounter = (stats.slamCounter || 0) + 1;
                if (stats.slamCounter >= stats.slamEvery) {
                    stats.slamCounter = 0;
                    const dmg = rollGolemDamage(stats.meleeMin ?? 3, stats.meleeMax ?? 13);
                    this._addLog(`\u{1FAA8} ${m.name} SLAMS the ground — shockwave rocks the battlefield!`);
                    for (const e of [...targets]) {
                        if (e.health <= 0) continue;
                        const dealt = this._damageSummonEnemy(e, dmg);
                        this._addLog(`  ↪️ ${this._eName(e)} takes ${dealt} damage!`);
                        if (e.health > 0 && stats.slamStunChance && Math.random() < stats.slamStunChance) {
                            if (this._tryStunEnemy(e))
                                this._addLog(`  \u26A1 ${this._eName(e)} is stunned!`);
                        }
                        if (e.health <= 0) this._addLog(`${this._eName(e)} is defeated!`);
                    }
                    return;
                }
            }

            // ── Mithril Golem — Force AoE: blasts floor(AL/3) targets ──────────
            if (stats.forceAoe) {
                const AL = stats.artificerLevel || 1;
                const numTargets = Math.max(1, Math.floor(AL / 3));
                const preset = GOLEM_PRESETS[m.summonType];
                const icon = (preset && preset.icon) || '⚙️';
                this._addLog(`${icon} ${m.name} unleashes a kinetic force wave (${numTargets} target${numTargets > 1 ? 's' : ''})!`);
                const shuffled = [...targets].sort(() => Math.random() - 0.5);
                for (let i = 0; i < numTargets && i < shuffled.length; i++) {
                    const t = shuffled[i];
                    if (!t || t.health <= 0) continue;
                    const dmg = rollGolemDamage(stats.meleeMin ?? 3, stats.meleeMax ?? 13);
                    const dealt = this._damageSummonEnemy(t, dmg);
                    this._addLog(`  ↪️ force blast hits ${this._eName(t)} for ${dealt}!`);
                    if (t.health <= 0) this._addLog(`${this._eName(t)} is defeated!`);
                }
                return;
            }

            // ── Adamantine Golem — Armor-Piercing Bolts ─────────────────────────
            if (stats.adamantineBolts) {
                const AL = stats.artificerLevel || 1;
                const boltCount  = Math.max(1, Math.floor(AL / 5));
                const critChance = 0.20 + Math.floor(AL / 2) * 0.01;
                const preset = GOLEM_PRESETS[m.summonType];
                const icon = (preset && preset.icon) || '\u{1F5FF}';
                this._addLog(`${icon} ${m.name} fires ${boltCount} armor-piercing bolt${boltCount > 1 ? 's' : ''}!`);
                const aliveNow = this.aliveEnemies;
                for (let i = 0; i < boltCount; i++) {
                    if (aliveNow.length === 0) break;
                    const t = aliveNow[Math.floor(Math.random() * aliveNow.length)];
                    if (!t || t.health <= 0) continue;
                    let dmg = rollGolemDamage(stats.meleeMin ?? 3, stats.meleeMax ?? 13);
                    const isCrit = Math.random() < critChance && !this._isCritImmune(t);
                    if (isCrit) dmg *= 2;
                    // Bolts ignore defense — pass directly
                    const dealt = this._damageSummonEnemy(t, dmg, /* ignoreDefense */ true);
                    this._addLog(`  ↪️ bolt ${i + 1} hits ${this._eName(t)} for ${dealt}!${isCrit ? ' \u{1F4A5} CRIT!' : ''}`);
                    if (t.health <= 0) this._addLog(`${this._eName(t)} is defeated!`);
                }
                return;
            }

            // ── Divine Soul Golem — AoE divine strikes + per-member party heal ────
            if (stats.divineSoul) {
                const AL = stats.artificerLevel || 1;
                const numTargets = Math.max(1, Math.floor(AL / 3));
                const preset = GOLEM_PRESETS[m.summonType];
                const icon = (preset && preset.icon) || '\u{1F4AB}';
                this._addLog(`${icon} ${m.name} smites with divine power — striking ${numTargets} enem${numTargets !== 1 ? 'ies' : 'y'}!`);
                const shuffled = [...targets].sort(() => Math.random() - 0.5);
                for (let i = 0; i < numTargets && i < shuffled.length; i++) {
                    const t = shuffled[i];
                    if (!t || t.health <= 0) continue;
                    const dmg = rollGolemDamage(stats.meleeMin ?? 3, stats.meleeMax ?? 13);
                    // Ignores half of enemy defense
                    const dealt = this._damageSummonEnemy(t, dmg, false, true);
                    this._addLog(`  ↪️ divine smite hits ${this._eName(t)} for ${dealt}!`);
                    // 20% chance to stun — respects stun immunity
                    if (t.health > 0) {
                        const eTDef = ENEMY_TYPES[t.type] || {};
                        const eTImmune = Array.isArray(eTDef.immune) ? eTDef.immune : [];
                        const stunImmune = eTImmune.includes('stun')
                            || (Array.isArray(eTDef.tags) && eTDef.tags.includes('undead'));
                        if (!stunImmune && Math.random() < 0.20) {
                            if (this._tryStunEnemy(t))
                                this._addLog(`  ⚡ ${this._eName(t)} is stunned by divine force!`);
                        }
                    }
                    if (t.health <= 0) this._addLog(`${this._eName(t)} is slain!`);
                }
                // 33% chance PER living party member to be healed for 10% of that member's lost HP.
                // Includes regular members + summoned animals/pixie.
                // Excludes summoned undead and golems.
                const healable = this.party.filter(p => {
                    if (!p || p.health <= 0) return false;
                    if (!p.isSummoned) return true;            // regular party members
                    if (BEAST_TYPES[p.summonType]) return true; // animals & pixie
                    return false;                               // golems & undead excluded
                });
                for (const p of healable) {
                    if (Math.random() < 0.33) {
                        const allyLostHp = p.maxHealth - p.health;
                        const healAmt = Math.max(1, Math.floor(allyLostHp * 0.10));
                        p.health = Math.min(p.maxHealth, p.health + healAmt);
                        this._addLog(`✨ ${p.name} is mended by divine radiance! (+${healAmt} HP)`);
                    }
                }
                return;
            }

            // Default golem action: melee single target, with optional cleave.
            const primary = targets[Math.floor(Math.random() * targets.length)];
            let dmg = rollGolemDamage(stats.meleeMin ?? 3, stats.meleeMax ?? 13);
            const dealt = this._damageSummonEnemy(primary, dmg, false, false, { contactAttacker: m });
            const preset = GOLEM_PRESETS[m.summonType];
            const icon = (preset && preset.icon) || '\u{1F9F1}';
            this._addLog(`${icon} ${m.name} hammers ${this._eName(primary)} for ${dealt}!`);
            if (primary.health <= 0) this._addLog(`${this._eName(primary)} is defeated!`);

            // Iron Golem — cleave additional targets.
            if (stats.cleaveTargets && stats.cleaveTargets > 0) {
                const extras = this.aliveEnemies.filter(e => e !== primary);
                for (let i = 0; i < stats.cleaveTargets && i < extras.length; i++) {
                    const t = extras[i];
                    if (!t || t.health <= 0) continue;
                    const cleaveDmg = rollGolemDamage(stats.meleeMin ?? 3, stats.meleeMax ?? 13);
                    const cleaveDealt = this._damageSummonEnemy(t, cleaveDmg, false, false, { contactAttacker: m });
                    this._addLog(`  ↪️ cleave hits ${this._eName(t)} for ${cleaveDealt}!`);
                    if (t.health <= 0) this._addLog(`${this._eName(t)} is defeated!`);
                }
            }
            return;
        }

        // ── Corpse Horror AI (Necromancer L30 Dark Apotheosis) ───────────────────
        if (m.summonType === 'corpse_horror') {
            const attackCap = stats.attackCap || ((stats.necromancerLevel || m.level || 1) + NECRO_CORPSE_HORROR_ATTACK_CAP_BONUS);
            const attackCount = Math.min(stats.attackCount || 2, attackCap);
            let firstHit = true;
            for (let atk = 0; atk < attackCount; atk++) {
                const alive = this.aliveHostileEnemies;
                if (alive.length === 0) break;
                const t = alive[Math.floor(Math.random() * alive.length)];
                const dmg = Math.max(1, randomInt(stats.meleeMin ?? 1, stats.meleeMax ?? 3) + (stats.meleeSkill || 0));
                const dealt = this._damageSummonEnemy(t, dmg, false, false, { contactAttacker: m });
                const enemyName = this._eName(t);
                if (firstHit) {
                    this._addLog(`💀🩸 ${m.name} rakes ${enemyName} for ${dealt}! (${attackCount} attacks)`);
                    firstHit = false;
                } else {
                    this._addLog(`  ↪️ ${m.name} claws ${enemyName} for ${dealt}!`);
                }
                if (t.health <= 0) this._addLog(`${enemyName} is torn apart!`);
            }
            return;
        }

        if (m.summonType === 'demi_lich') {
            const nl = stats.necroLevel || m.level || 1;
            const count = Math.max(1, Math.floor(nl / NECRO_DEMI_LICH_TARGET_DIVISOR));
            const shuffled = [...targets].sort(() => Math.random() - 0.5).slice(0, count);
            this._addLog(`💀 ${m.name} releases a deathly spell (${shuffled.length} target${shuffled.length === 1 ? '' : 's'})!`);
            for (const t of shuffled) {
                if (!t || t.health <= 0) continue;
                const tDef = ENEMY_TYPES[t.type] || {};
                if (tDef.fullMagicImmune) {
                    this._addLog(`  ↪️ ⚙️ ${this._eName(t)} is immune to the deathly magic!`);
                    continue;
                }
                const dmg = randomInt(stats.magicMin ?? MAGIC_DAMAGE_MIN, stats.magicMax ?? MAGIC_DAMAGE_MAX);
                const dealt = this._damageSummonEnemy(t, dmg, true);
                this._addLog(`  ↪️ ${this._eName(t)} takes ${dealt} defense-ignoring magic damage!`);
                if (t.health <= 0) this._addLog(`${this._eName(t)} is defeated!`);
            }
            this._applyGhostFear(m, targets);
            return;
        }

        // ── Faerie Queen: Wrath of Nature ─────────────────────────
        if (m.summonType === 'faerie_queen') {
            const fqLvl      = stats.druidLevel || m.level || 1;
            const numTargets = Math.max(1, Math.floor(fqLvl / 4));
            const dmgPerHit  = randomInt(stats.magicMin ?? 5, stats.magicMax ?? 15);
            this._addLog(`\u{1F9DA}‍♀️ ${m.name} unleashes Wrath of Nature on ${numTargets} target${numTargets > 1 ? 's' : ''}!`);

            const holdChance  = FAERIE_QUEEN_HOLD_BASE + Math.floor(fqLvl / 3) * FAERIE_QUEEN_HOLD_PER_3LV;
            const poisonFrac  = Math.min(2.0, FAERIE_QUEEN_POISON_FRAC_BASE + fqLvl * FAERIE_QUEEN_POISON_FRAC_PER_LV);
            // Shuffle alive targets; hit up to numTargets unique targets (recycle if fewer enemies)
            const shuffled = [...targets].sort(() => Math.random() - 0.5);
            for (let i = 0; i < numTargets; i++) {
                const t = shuffled[i % shuffled.length];
                if (!t || t.health <= 0) continue;
                const dealt   = this._damageSummonEnemy(t, dmgPerHit);
                const fqEName = this._eName(t);
                const effects = [];

                if (t.health <= 0) {
                    this._addLog(`  → ${fqEName}: ${dealt} magic damage — defeated!`);
                    continue;
                }

                // Hold (incorporeal immune; undead/constructs/elementals CAN be held by fae magic)
                if (Math.random() < holdChance && this._tryHoldEnemy(t)) {
                    t.activeEffects = (t.activeEffects || []).filter(x => x.type !== 'fae_hold');
                    t.activeEffects.push({ type: 'fae_hold', rounds: 1 });
                    effects.push('HELD (2 rds)');
                }
                // Poison DoT: applies/refreshes per hit; respects full immunity list
                if (!this._enemyHasImmunity(t, 'poison')) {
                    const poisonDmg = Math.max(1, Math.floor(dealt * poisonFrac));
                    t.activeEffects = (t.activeEffects || []).filter(x => x.type !== 'fae_poison');
                    t.activeEffects.push({ type: 'fae_poison', damage: poisonDmg, rounds: POISON_DURATION_ROUNDS });
                    effects.push(`poisoned (${poisonDmg}/rd)`);
                }
                const effectStr = effects.length ? ` — ${effects.join(', ')}` : '';
                this._addLog(`  → ${fqEName}: ${dealt} magic damage${effectStr}`);
            }
            return;
        }

        const beastKind = stats.beastKind;

        if (beastKind === 'valkyrie') {
            const attacks = Math.max(1, stats.attacksPerRound || 1);
            const critChance = Math.max(0, Math.min(1, stats.critChance || 0));
            this._addLog(`🪽 ${m.name} dives from above (${attacks} strike${attacks !== 1 ? 's' : ''})!`);
            for (let i = 0; i < attacks; i++) {
                const alive = this.aliveHostileEnemies;
                if (!alive.length) break;
                const t = alive[Math.floor(Math.random() * alive.length)];
                let dmg = randomInt(stats.meleeMin ?? 1, stats.meleeMax ?? 3);
                let crit = false;
                if (Math.random() < critChance && !this._isCritImmune(t)) {
                    dmg *= 2;
                    crit = true;
                }
                const dealt = this._damageSummonEnemy(t, dmg, false, false, { contactAttacker: m });
                this._addLog(`  ↪️ ${m.name} cleaves ${this._eName(t)} for ${dealt}!${crit ? ' 💥 CRIT!' : ''}`);
                if (t.health <= 0) this._addLog(`${this._eName(t)} is defeated!`);
            }
            return;
        }

        if (beastKind === 'pixie') {
            const dmgMult    = stats.wildShapeDmgMult || 1;
            let baseDmg      = randomInt(stats.magicMin ?? 1, stats.magicMax ?? 3);
            baseDmg          = Math.max(1, Math.round(baseDmg * dmgMult));
            const isPrincess = stats.upgradeName === 'pixie_princess';
            const wsTag      = dmgMult > 1 ? ' \u2728' : '';
            this._addLog(`\u{1F9DA}${isPrincess ? ' Pixie Princess' : ''} ${m.name} whirls a storm of faerie dust for ${baseDmg}!${wsTag}`);
            for (const e of this.aliveHostileEnemies.slice()) {
                this._damageSummonEnemy(e, baseDmg);
                if (e.health <= 0) this._addLog(`${this._eName(e)} is defeated!`);
            }
            // Wild Shape extra attack
            if (stats.wildShapeExtraAttack) {
                const bonus = randomInt(stats.magicMin ?? 1, stats.magicMax ?? 3);
                const bonusDmg = Math.max(1, Math.round(bonus * dmgMult));
                this._addLog(`\u{1F9DA}\u{1F43E} ${m.name} shimmers \u2014 bonus pixie burst!`);
                for (const e of this.aliveHostileEnemies) {
                    this._damageSummonEnemy(e, bonusDmg);
                    if (e.health <= 0) this._addLog(`${this._eName(e)} is defeated!`);
                }
            }
            return;
        }

        if (beastKind === 'eagle') {
            const summoner = this.party.find(p => p.id === m.summonerId);
            const summonerLevel = summoner?.level ?? 1;
            const critChance = 0.20 + summonerLevel * 0.02;
            const critMult   = 4 + summonerLevel * 0.02;
            const dmgMult    = stats.wildShapeDmgMult || 1;
            let extraAttacks = Math.floor(summonerLevel / 33);
            if (stats.wildShapeExtraAttack) extraAttacks++;
            const isGolden = stats.upgradeName === 'golden_eagle';
            const t = targets[Math.floor(Math.random() * targets.length)];
            const _eagleDive = (target) => {
                let dmg = randomInt(stats.rangedMin ?? 2, stats.rangedMax ?? 6);
                dmg = Math.max(1, Math.round(dmg * dmgMult));
                const isCrit = Math.random() < critChance && !this._isCritImmune(target);
                if (isCrit) dmg = Math.round(dmg * critMult);
                const dealt = this._damageSummonEnemy(target, dmg);
                const critLabel = isCrit ? ` \u{1F4A5} CRIT! (\u00D7${critMult.toFixed(1)})` : '';
                this._addLog(`\u{1F985}${isGolden ? ' Golden Eagle' : ''} ${m.name} dives on ${this._eName(target)} for ${dealt}!${critLabel}`);
                if (target.health <= 0) this._addLog(`${this._eName(target)} is defeated!`);
            };
            _eagleDive(t);
            for (let i = 0; i < extraAttacks; i++) {
                if (t.health <= 0) break;
                _eagleDive(t);
            }
            return;
        }

        if (beastKind === 'vampire_bat') {
            const t = targets[Math.floor(Math.random() * targets.length)];
            const dmg = randomInt(stats.rangedMin ?? 2, stats.rangedMax ?? 6);
            const dealt = this._damageSummonEnemy(t, dmg, false, false, { contactAttacker: m });
            this._addLog(`\u{1F987} ${m.name} strikes ${this._eName(t)} for ${dealt}!`);
            // Vampire bat life drain: heals for damage dealt
            if (dealt > 0) {
                if (this._enemyHasImmunity(t, 'bleed')) {
                    this._addLog(`\u{1F987} ${this._eName(t)} cannot be blood-drained!`);
                } else {
                    const before = m.health;
                    m.health = Math.min(m.maxHealth, m.health + dealt);
                    const healed = m.health - before;
                    if (healed > 0) this._addLog(`\u{1F987} ${m.name} drains ${healed} HP from ${this._eName(t)}!`);
                }
            }
            if (t.health <= 0) this._addLog(`${this._eName(t)} is defeated!`);
            return;
        }

        if (beastKind === 'treant') {
            const summoner = this.party.find(p => p.id === m.summonerId);
            const summonerLevel = summoner?.level ?? 1;
            const dmgMult    = stats.wildShapeDmgMult || 1;
            let extraAttacks = Math.floor(summonerLevel / 33);
            if (stats.wildShapeExtraAttack) extraAttacks++;
            const isElder = stats.upgradeName === 'elder_treant';
            const holdChance = TREANT_HOLD_CHANCE + (stats.upgradeBonus || 0);
            const _treantSlam = () => {
                const alive = this.aliveHostileEnemies;
                if (alive.length === 0) return;
                const t = alive[Math.floor(Math.random() * alive.length)];
                let dmg = randomInt(stats.meleeMin ?? 3, stats.meleeMax ?? 10);
                dmg = Math.max(1, Math.round(dmg * dmgMult));
                const dealt = this._damageSummonEnemy(t, dmg, false, false, { contactAttacker: m });
                this._addLog(`\u{1F333}${isElder ? ' Elder Treant' : ''} ${m.name} SLAMS ${this._eName(t)} with ancient branches for ${dealt}!`);
                if (t.health > 0 && Math.random() < holdChance) {
                    if (this._tryHoldEnemy(t))
                        this._addLog(`\u{1F333} ${this._eName(t)} is held fast by grasping roots!`);
                }
                if (t.health <= 0) this._addLog(`${this._eName(t)} is defeated!`);
            };
            _treantSlam();
            for (let i = 0; i < extraAttacks; i++) {
                if (this.aliveHostileEnemies.length === 0) break;
                _treantSlam();
            }
            return;
        }

        if (beastKind === 'shambling_mound') {
            const t = targets[Math.floor(Math.random() * targets.length)];
            const dmg = randomInt(stats.meleeMin ?? MELEE_DAMAGE_MIN, stats.meleeMax ?? MELEE_DAMAGE_MAX);
            const dealt = this._damageSummonEnemy(t, dmg, false, false, { contactAttacker: m });
            this._addLog(`🪴 ${m.name} slams ${this._eName(t)} for ${dealt} damage!`);
            if (t.health > 0 && Math.random() < (stats.stunChance ?? 0.45)) {
                if (this._tryStunEnemy(t)) {
                    this._addLog(`  ⚡ ${this._eName(t)} is stunned by the crushing vines!`);
                }
            }
            if (t.health <= 0) this._addLog(`${this._eName(t)} is defeated!`);
            return;
        }

        if (beastKind === 'wolf') {
            const summoner = this.party.find(p => p.id === m.summonerId);
            const summonerLevel = summoner?.level ?? 1;
            const bleedDuration = Math.floor(3 + summonerLevel / 33);
            const dmgMult_wolf  = stats.wildShapeDmgMult || 1;
            let extraAttacks = Math.floor(summonerLevel / 33);
            if (stats.wildShapeExtraAttack) extraAttacks++;
            const bleedImmuneTags = ['undead', 'construct', 'elemental', 'incorporeal', 'plant'];
            const _wolfBite = (target) => {
                let dmg = randomInt(stats.meleeMin ?? 2, stats.meleeMax ?? 7);
                dmg = Math.max(1, Math.round(dmg * dmgMult_wolf));
                const dealt = this._damageSummonEnemy(target, dmg, false, false, { contactAttacker: m });
                this._addLog(`\u{1F43A} ${m.name} bites ${this._eName(target)} for ${dealt}!`);
                const tTags = (ENEMY_TYPES[target.type] || {}).tags || [];
                if (target.health > 0 && dealt > 0 && !tTags.some(t => bleedImmuneTags.includes(t))) {
                    const bleedDmg = Math.max(1, Math.round(dealt * 1.0));
                    target.activeEffects = target.activeEffects || [];
                    target.activeEffects.push({ type: 'bleed', damage: bleedDmg, rounds: bleedDuration });
                    this._addLog(`\u{1F7E5} ${this._eName(target)} is Bleeding! (${bleedDmg}/round × ${bleedDuration} rds)`);
                }
                if (target.health <= 0) this._addLog(`${this._eName(target)} is defeated!`);
            };
            const t = targets[Math.floor(Math.random() * targets.length)];
            _wolfBite(t);
            for (let i = 0; i < extraAttacks; i++) {
                const alive = this.aliveHostileEnemies;
                if (alive.length === 0) break;
                _wolfBite(alive[Math.floor(Math.random() * alive.length)]);
            }
            return;
        }

        if (beastKind === 'bear') {
            const summoner = this.party.find(p => p.id === m.summonerId);
            const summonerLevel = summoner?.level ?? 1;
            const stunChance = 0.15 + summonerLevel * 0.02;
            const dmgMult_bear  = stats.wildShapeDmgMult || 1;
            let extraAttacks = Math.floor(summonerLevel / 25);
            if (stats.wildShapeExtraAttack) extraAttacks++;
            const isGiant = stats.upgradeName === 'giant_bear';
            const _bearMaul = (target) => {
                let dmg = randomInt(stats.meleeMin ?? 2, stats.meleeMax ?? 8);
                dmg = Math.max(1, Math.round(dmg * dmgMult_bear));
                const dealt = this._damageSummonEnemy(target, dmg, false, false, { contactAttacker: m });
                this._addLog(`\u{1F43B}${isGiant ? ' Giant Bear' : ''} ${m.name} mauls ${this._eName(target)} for ${dealt}!${isGiant ? ' \u{1F4AA}' : ''}`);
                if (target.health > 0 && Math.random() < stunChance) {
                    if (this._tryStunEnemy(target))
                        this._addLog(`\u26A1 ${this._eName(target)} is stunned!`);
                }
                if (target.health <= 0) this._addLog(`${this._eName(target)} is defeated!`);
            };
            const t = targets[Math.floor(Math.random() * targets.length)];
            _bearMaul(t);
            for (let i = 0; i < extraAttacks; i++) {
                const alive = this.aliveHostileEnemies;
                if (alive.length === 0) break;
                _bearMaul(alive[Math.floor(Math.random() * alive.length)]);
            }
            return;
        }

        // ── Beast Companion attacks (Ranger L35 Beast Mastery) ────────────────
        if (beastKind === 'bc_dire_wolf') {
            const ranger = this.party.find(p => p.id === m.summonStats.summonerId && !p.isSummoned);
            const rl = ranger ? (ranger.level || 1) : (stats.rangerLevel || 1);
            const numAttacks = Math.max(1, Math.floor(rl / 10));
            const bleedRounds = Math.max(1, Math.floor(rl / 6));
            const bleedImmune = ['undead', 'construct', 'elemental', 'incorporeal', 'plant'];
            const t = targets[Math.floor(Math.random() * targets.length)];
            for (let i = 0; i < numAttacks; i++) {
                if (t.health <= 0) break;
                const dmg = randomInt(stats.meleeMin ?? 2, stats.meleeMax ?? 8);
                const dealt = this._damageSummonEnemy(t, dmg, false, false, { contactAttacker: m });
                this._addLog(`🐺 ${m.name} bites ${this._eName(t)} for ${dealt}!`);
                const tTags = (ENEMY_TYPES[t.type] || {}).tags || [];
                if (t.health > 0 && dealt > 0 && !tTags.some(tag => bleedImmune.includes(tag))) {
                    t.activeEffects = t.activeEffects || [];
                    t.activeEffects.push({ type: 'bleed', damage: Math.max(1, dealt), rounds: bleedRounds });
                    this._addLog(`🟥 ${this._eName(t)} is Bleeding! (${Math.max(1, dealt)}/rd × ${bleedRounds} rds)`);
                }
            }
            if (t.health <= 0) this._addLog(`${this._eName(t)} is defeated!`);
            return;
        }

        if (beastKind === 'bc_cave_bear') {
            const ranger = this.party.find(p => p.id === m.summonStats.summonerId && !p.isSummoned);
            const rl = ranger ? (ranger.level || 1) : (stats.rangerLevel || 1);
            const numAttacks = Math.max(1, Math.floor(rl / 10));
            const bleedRounds = Math.max(1, Math.floor(rl / 6));
            const bleedImmune = ['undead', 'construct', 'elemental', 'incorporeal', 'plant'];
            const t = targets[Math.floor(Math.random() * targets.length)];
            for (let i = 0; i < numAttacks; i++) {
                if (t.health <= 0) break;
                const dmg = randomInt(stats.meleeMin ?? 2, stats.meleeMax ?? 8);
                const dealt = this._damageSummonEnemy(t, dmg, false, false, { contactAttacker: m });
                if (Math.random() < 0.5) {
                    // Claw: bleed
                    this._addLog(`🐻 ${m.name} claws ${this._eName(t)} for ${dealt}!`);
                    const tTags = (ENEMY_TYPES[t.type] || {}).tags || [];
                    if (t.health > 0 && dealt > 0 && !tTags.some(tag => bleedImmune.includes(tag))) {
                        t.activeEffects = t.activeEffects || [];
                        t.activeEffects.push({ type: 'bleed', damage: Math.max(1, dealt), rounds: bleedRounds });
                        this._addLog(`🟥 ${this._eName(t)} is Bleeding! (${Math.max(1, dealt)}/rd × ${bleedRounds} rds)`);
                    }
                } else {
                    // Bite: hold chance = rl%
                    this._addLog(`🐻 ${m.name} bites ${this._eName(t)} for ${dealt}!`);
                    if (t.health > 0 && Math.random() < rl / 100) {
                        if (this._tryHoldEnemy(t)) {
                            t.stunned = false;
                            t.webbedRounds = Math.max(t.webbedRounds || 0, 2);
                            this._addLog(`🐻 ${this._eName(t)} is held in the bear's jaws! (2 rounds)`);
                        }
                    }
                }
            }
            if (t.health <= 0) this._addLog(`${this._eName(t)} is defeated!`);
            return;
        }

        if (beastKind === 'bc_roc') {
            const ranger = this.party.find(p => p.id === m.summonStats.summonerId && !p.isSummoned);
            const rl = ranger ? (ranger.level || 1) : (stats.rangerLevel || 1);
            const numAttacks = Math.max(1, Math.floor(rl / 10));
            const critChance = RANGED_CRIT_CHANCE + (ranger ? ranger.getRangedCritBonus() : 0);
            const critMult = 4 + rl * 0.02;
            const t = targets[Math.floor(Math.random() * targets.length)];
            for (let i = 0; i < numAttacks; i++) {
                if (t.health <= 0) break;
                let dmg = randomInt(stats.rangedMin ?? 2, stats.rangedMax ?? 8);
                const isCrit = Math.random() < critChance && !this._isCritImmune(t);
                if (isCrit) dmg = Math.round(dmg * critMult);
                const dealt = this._damageSummonEnemy(t, dmg);
                const critLabel = isCrit ? ` 💥 CRIT! (×${critMult.toFixed(1)})` : '';
                this._addLog(`🦅 ${m.name} dives on ${this._eName(t)} for ${dealt}!${critLabel}`);
            }
            if (t.health <= 0) this._addLog(`${this._eName(t)} is defeated!`);
            return;
        }

        if (beastKind === 'bc_sabre_tooth') {
            const ranger = this.party.find(p => p.id === m.summonStats.summonerId && !p.isSummoned);
            const rl = ranger ? (ranger.level || 1) : (stats.rangerLevel || 1);
            const numAttacks = Math.max(1, Math.floor(rl / 10));
            const bleedRounds = Math.max(1, Math.floor(rl / 6));
            const bleedImmune = ['undead', 'construct', 'elemental', 'incorporeal', 'plant'];
            const instakillImmune = ['undead', 'elemental', 'construct', 'incorporeal', 'plant'];
            const instakillChance = Math.floor(rl / 3) / 100;
            const t = targets[Math.floor(Math.random() * targets.length)];
            for (let i = 0; i < numAttacks; i++) {
                if (t.health <= 0) break;
                const dmg = randomInt(stats.meleeMin ?? 2, stats.meleeMax ?? 8);
                const dealt = this._damageSummonEnemy(t, dmg, false, false, { contactAttacker: m });
                if (Math.random() < 0.5) {
                    // Claw: bleed
                    this._addLog(`🐯 ${m.name} claws ${this._eName(t)} for ${dealt}!`);
                    const tTags = (ENEMY_TYPES[t.type] || {}).tags || [];
                    if (t.health > 0 && dealt > 0 && !tTags.some(tag => bleedImmune.includes(tag))) {
                        t.activeEffects = t.activeEffects || [];
                        t.activeEffects.push({ type: 'bleed', damage: Math.max(1, dealt), rounds: bleedRounds });
                        this._addLog(`🟥 ${this._eName(t)} is Bleeding! (${Math.max(1, dealt)}/rd × ${bleedRounds} rds)`);
                    }
                } else {
                    // Bite: instakill check
                    this._addLog(`🐯 ${m.name} bites ${this._eName(t)} for ${dealt}!`);
                    if (t.health > 0 && instakillChance > 0) {
                        const tTags = (ENEMY_TYPES[t.type] || {}).tags || [];
                        const isImmune = tTags.some(tag => instakillImmune.includes(tag));
                        if (!isImmune && Math.random() < instakillChance) {
                            if (t.isBoss || t.isMegaBoss || t.isSuperBoss) {
                                const bDmg = Math.max(1, Math.round(dmg * 4));
                                const bDealt = this._damageSummonEnemy(t, bDmg);
                                this._addLog(`🐯 Boss resists the killing bite! (×4: ${bDealt})`);
                            } else {
                                t.health = 0;
                                if (!t._deathHandled) { t._deathHandled = true; this._onEnemyDeath(t); }
                                this._addLog(`🐯 ${m.name}'s KILLING BITE slays ${this._eName(t)}!`);
                            }
                        }
                    }
                }
            }
            if (t.health <= 0) this._addLog(`${this._eName(t)} is defeated!`);
            return;
        }

        if (beastKind === 'bc_megaconda') {
            const ranger = this.party.find(p => p.id === m.summonStats.summonerId && !p.isSummoned);
            const rl = ranger ? (ranger.level || 1) : (stats.rangerLevel || 1);
            const holdRounds = Math.max(1, Math.floor(rl / 5));
            const baseDmgMult = 3 + Math.floor(rl / 10);
            const t = targets[Math.floor(Math.random() * targets.length)];
            const baseDmg = randomInt(stats.meleeMin ?? 2, stats.meleeMax ?? 8);
            const constrictDmg = Math.max(1, Math.round(baseDmg * baseDmgMult));
            const dealt = this._damageSummonEnemy(t, constrictDmg, false, false, { contactAttacker: m });
            this._addLog(`🐍 ${m.name} constricts ${this._eName(t)} for ${dealt}! (${baseDmgMult}× base)`);
            if (t.health > 0) {
                // Try hold for holdRounds
                const held = this._tryHoldEnemy(t);
                if (held) {
                    t.stunned = false;
                    t.webbedRounds = Math.max(t.webbedRounds || 0, holdRounds);
                    this._addLog(`🐍 ${this._eName(t)} is CONSTRICTED for ${holdRounds} rounds! Escalating crush DoT begins!`);
                    t.activeEffects = t.activeEffects || [];
                    t.activeEffects.push({ type: 'megaconda_constrict', baseDamage: baseDmg, rounds: holdRounds, mcTickNum: 0 });
                } else {
                    this._addLog(`🐍 ${this._eName(t)} wrenches free of the coils!`);
                }
            }
            if (t.health <= 0) this._addLog(`${this._eName(t)} is defeated!`);
            return;
        }

        if (beastKind === 'bc_megaloceros') {
            const ranger = this.party.find(p => p.id === m.summonStats.summonerId && !p.isSummoned);
            const rl = ranger ? (ranger.level || 1) : (stats.rangerLevel || 1);
            const numTargets = Math.max(1, Math.floor(rl / 5));
            const dmgMult = 1 + rl * 0.02;
            const alive = this.aliveHostileEnemies.slice();
            const chargeTargets = alive.length <= numTargets ? alive : alive.sort(() => Math.random() - 0.5).slice(0, numTargets);
            this._addLog(`🦌 ${m.name} charges into the fray!`);
            for (const ct of chargeTargets) {
                if (ct.health <= 0) continue;
                const baseDmg = randomInt(stats.meleeMin ?? 2, stats.meleeMax ?? 8);
                const dmg = Math.max(1, Math.round(baseDmg * dmgMult));
                const dealt = this._damageSummonEnemy(ct, dmg, false, false, { contactAttacker: m });
                this._addLog(`  🦌 ${m.name} smashes ${this._eName(ct)} for ${dealt}!`);
                if (ct.health > 0) {
                    if (this._tryHoldEnemy(ct)) {
                        this._addLog(`  🦌 ${this._eName(ct)} is knocked prone! (1 round)`);
                    }
                }
                if (ct.health <= 0) this._addLog(`  ${this._eName(ct)} is defeated!`);
            }
            return;
        }

        if (beastKind === 'bc_sasquatch') {
            const ranger = this.party.find(p => p.id === m.summonStats.summonerId && !p.isSummoned);
            const rl = ranger ? (ranger.level || 1) : (stats.rangerLevel || 1);
            const numAttacks = Math.max(1, Math.floor(rl / 6));
            const dmgMult = 1 + rl * 0.02;
            const stunChance = Math.min(0.95, 0.20 + Math.floor(rl / 3) / 100);
            for (let i = 0; i < numAttacks; i++) {
                const alive = this.aliveHostileEnemies;
                if (alive.length === 0) break;
                const isBoulder = Math.random() < 0.5;
                const at = isBoulder
                    ? alive[Math.floor(Math.random() * alive.length)]
                    : (targets[0] && targets[0].health > 0 ? targets[0] : alive[0]);
                if (!at || at.health <= 0) continue;
                const baseDmg = randomInt(stats.meleeMin ?? 2, stats.meleeMax ?? 8);
                const dmg = Math.max(1, Math.round(baseDmg * dmgMult));
                const dealt = this._damageSummonEnemy(at, dmg, false, false, isBoulder ? undefined : { contactAttacker: m });
                if (isBoulder) {
                    this._addLog(`🦍 ${m.name} hurls a boulder at ${this._eName(at)} for ${dealt}!`);
                } else {
                    this._addLog(`🦍 ${m.name} punches ${this._eName(at)} for ${dealt}!`);
                }
                if (at.health > 0 && Math.random() < stunChance) {
                    if (this._tryStunEnemy(at)) {
                        this._addLog(`⚡ ${this._eName(at)} is stunned!`);
                    }
                }
                if (at.health <= 0) this._addLog(`${this._eName(at)} is defeated!`);
            }
            return;
        }

        // ── Rift Elementals ──────────────────────────────────────────────────
        if (beastKind === 'rift_earth') {
            const mLvl = stats.mageLevel ?? 1;
            const aoeChance = Math.min(1, (20 + mLvl / 2) / 100);
            const stunChance_earth = Math.min(1, mLvl / 100);
            const halfStun = Math.min(1, mLvl / 200);
            if (Math.random() < aoeChance) {
                // Earthquake AoE
                let dmg = randomInt(stats.meleeMin ?? 1, stats.meleeMax ?? 5);
                this._addLog(`\u{1FAA8} ${m.name} slams the earth — shockwave ripples through all enemies!`);
                for (const e of this.aliveHostileEnemies.slice()) {
                    const dealt = this._damageSummonEnemy(e, dmg);
                    this._addLog(`  → ${this._eName(e)} takes ${dealt} damage.`);
                    if (e.health > 0 && !this._enemyHasImmunity(e, 'stun') && Math.random() < halfStun)
                        if (this._tryStunEnemy(e)) this._addLog(`  ⚡ ${this._eName(e)} is stunned!`);
                    if (e.health <= 0) this._addLog(`${this._eName(e)} is defeated!`);
                }
            } else {
                // Single melee
                const t = targets[Math.floor(Math.random() * targets.length)];
                let dmg = randomInt(stats.meleeMin ?? 1, stats.meleeMax ?? 5);
                const dealt = this._damageSummonEnemy(t, dmg, false, false, { contactAttacker: m });
                this._addLog(`\u{1FAA8} ${m.name} slams ${this._eName(t)} for ${dealt}!`);
                if (t.health > 0 && !this._enemyHasImmunity(t, 'stun') && Math.random() < stunChance_earth)
                    if (this._tryStunEnemy(t)) this._addLog(`  ⚡ ${this._eName(t)} is stunned!`);
                if (t.health <= 0) this._addLog(`${this._eName(t)} is defeated!`);
            }
            return;
        }

        if (beastKind === 'rift_air') {
            const mLvl = stats.mageLevel ?? 1;
            const stunChance_air = Math.min(1, mLvl / 100);
            let dmg = randomInt(stats.magicMin ?? 1, stats.magicMax ?? 5);
            this._addLog(`\u{1F4A8} ${m.name} unleashes a howling gale — all enemies are battered!`);
            for (const e of this.aliveHostileEnemies.slice()) {
                const dealt = this._damageSummonEnemy(e, dmg, false, true);
                this._addLog(`  → ${this._eName(e)} takes ${dealt} magic damage.`);
                if (e.health > 0 && !this._enemyHasImmunity(e, 'stun') && Math.random() < stunChance_air)
                    if (this._tryStunEnemy(e)) this._addLog(`  ⚡ ${this._eName(e)} is stunned!`);
                if (e.health <= 0) this._addLog(`${this._eName(e)} is defeated!`);
            }
            return;
        }

        if (beastKind === 'rift_water') {
            const mLvl = stats.mageLevel ?? 1;
            const drownRounds = Math.max(1, Math.floor(mLvl / 10));
            const drownImmuneTags = ['undead', 'elemental', 'construct', 'incorporeal', 'demon', 'plant'];
            let dmg = randomInt(stats.magicMin ?? 1, stats.magicMax ?? 5);
            this._addLog(`\u{1F30A} ${m.name} erupts in a surging wave — all enemies are swept under!`);
            for (const e of this.aliveHostileEnemies.slice()) {
                const dealt = this._damageSummonEnemy(e, dmg, false, true);
                this._addLog(`  → ${this._eName(e)} takes ${dealt} magic damage.`);
                if (e.health > 0 && drownRounds > 0) {
                    const eTags = Array.isArray((ENEMY_TYPES[e.type] || {}).tags) ? (ENEMY_TYPES[e.type] || {}).tags : [];
                    if (!drownImmuneTags.some(t => eTags.includes(t))) {
                        const drownTick = Math.max(1, Math.floor(dmg * 0.5));
                        e.activeEffects = (e.activeEffects || []).filter(fx => fx.type !== 'rift_drown' && fx.type !== 'rift_drown_def');
                        e.activeEffects.push({ type: 'rift_drown', damage: drownTick, rounds: drownRounds });
                        e.activeEffects.push({ type: 'rift_drown_def', defenseBonus: -2, rounds: drownRounds });
                        this._addLog(`  \u{1F30A} ${this._eName(e)} is drowning! (${drownTick}/rd for ${drownRounds} rds, -2 def)`);
                    }
                }
                if (e.health <= 0) this._addLog(`${this._eName(e)} is defeated!`);
            }
            return;
        }

        if (beastKind === 'rift_fire') {
            const mLvl = stats.mageLevel ?? 1;
            const stunChance_fire = Math.min(1, mLvl / 100);
            const burnRounds = Math.max(1, Math.floor(mLvl / 10));
            let dmg = randomInt(stats.magicMin ?? 1, stats.magicMax ?? 5);
            this._addLog(`\u{1F525} ${m.name} erupts in a column of fire — all enemies are scorched!`);
            for (const e of this.aliveHostileEnemies.slice()) {
                if (this._enemyHasImmunity(e, 'fire')) {
                    this._addLog(`  → ${this._eName(e)} is immune to fire!`);
                    continue;
                }
                const dealt = this._damageSummonEnemy(e, dmg, false, true);
                this._addLog(`  → ${this._eName(e)} takes ${dealt} magic damage.`);
                if (e.health > 0) {
                    if (!this._enemyHasImmunity(e, 'stun') && Math.random() < stunChance_fire)
                        if (this._tryStunEnemy(e)) this._addLog(`  ⚡ ${this._eName(e)} is stunned!`);
                    if (burnRounds > 0 && !this._enemyHasImmunity(e, 'fire')) {
                        const burnTick = Math.max(1, Math.floor(dmg * 0.5));
                        this._refreshEnemyEffect(e, { type: 'burn', damage: burnTick, rounds: burnRounds });
                        this._addLog(`  \u{1F525} ${this._eName(e)} is set ablaze! (${burnTick}/rd for ${burnRounds} rds)`);
                    }
                }
                if (e.health <= 0) this._addLog(`${this._eName(e)} is defeated!`);
            }
            return;
        }

        // ── Warlock demon summons ───────────────────────────────────────────────
        if (beastKind === 'warlock_demon' || (m.isSummoned && this._isWarlockBoundSummon(m))) {
            this._processWarlockDemonAttack(m);
            return;
        }

        // ── Vermin Keeper: vermin summon attack ─────────────────────────────────
        if (beastKind === 'vermin' || (m.isSummoned && VERMIN_PRESETS[m.summonType])) {
            const sType = m.summonType;
            const keeper = this._getVKById(m.summonerId);
            const frenzyEligible = !!(keeper && keeper.health > 0 && this._isVKFrenzyEligibleMember(m, stats));
            const frenzyMult = frenzyEligible ? this._getVKFrenzyDamageMultiplier(keeper.level) : 1;
            const frenzyActions = frenzyEligible ? this._getVKFrenzyActionCount(keeper.level) : 1;
            const pickTarget = () => {
                const marked = keeper ? this._getVKHiveMarkTarget(keeper.id) : null;
                if (marked && marked.health > 0) return marked;
                return targets[Math.floor(Math.random() * targets.length)];
            };

            if (frenzyEligible && frenzyActions > 1) {
                this._addLog(`🕷️ Frenzy! ${m.name} surges to ${frenzyActions} actions this turn at ×${frenzyMult.toFixed(2)} damage.`);
            }

            const _vHit = (tgt, ignoreArmor = false) => {
                let dmg = randomInt(stats.meleeMin || 1, stats.meleeMax || 3);
                dmg = Math.max(1, Math.round(dmg * frenzyMult));
                return this._damageSummonEnemy(tgt, dmg, ignoreArmor, false, { contactAttacker: m });
            };
            const _vPoison = (tgt, dealt, mult = 1) => {
                if (dealt > 0 && tgt.health > 0 && !this._enemyHasImmunity(tgt, 'poison')) {
                    const dot = Math.max(1, Math.floor(dealt * POISON_DAMAGE_FRACTION * mult));
                    if (!Array.isArray(tgt.activeEffects)) tgt.activeEffects = [];
                    tgt.activeEffects.push({ type: 'vk_poison', damage: dot, rounds: POISON_DURATION_ROUNDS });
                    this._addLog(`  ☠️ ${this._eName(tgt)} poisoned! (${dot}/rd \xd7${POISON_DURATION_ROUNDS} rds)`);
                }
            };
            const _vWeb = (tgt) => {
                if (tgt.health <= 0 || tgt.isBoss || tgt.isMegaBoss || tgt.isSuperBoss) return;
                tgt.webbedRounds = Math.max(tgt.webbedRounds || 0, WEB_DURATION_ROUNDS);
                this._addLog(`  \u{1F578}️ ${this._eName(tgt)} is WEBBED! (${WEB_DURATION_ROUNDS} rds)`);
            };
            const _vBleed = (tgt, dealt) => {
                if (dealt > 0 && tgt.health > 0 && !this._enemyHasImmunity(tgt, 'bleed')) {
                    const dot = Math.max(1, Math.floor(dealt * 0.5));
                    if (!Array.isArray(tgt.activeEffects)) tgt.activeEffects = [];
                    tgt.activeEffects.push({ type: 'bleed', damage: dot, rounds: 2 });
                    this._addLog(`  \u{1F7E5} ${this._eName(tgt)} bleeds! (${dot}/rd \xd72 rds)`);
                }
            };
            const _vDrain = (tgt, dealt) => {
                if (dealt > 0) {
                    if (this._enemyHasImmunity(tgt, 'bleed')) {
                        this._addLog(`  \u{1F987} ${this._eName(tgt)} cannot be blood-drained!`);
                        return;
                    }
                    const before = m.health;
                    m.health = Math.min(m.maxHealth, m.health + dealt);
                    const healed = m.health - before;
                    if (healed > 0) this._addLog(`  \u{1F987} ${m.name} drains ${healed} HP!`);
                }
            };
            const _vKill = (tgt) => { if (tgt.health <= 0) this._addLog(`${this._eName(tgt)} is defeated!`); };

            const _runVerminAction = () => {
            let t = pickTarget();
            switch (sType) {
                case 'spider': {
                    const d = _vHit(t);
                    this._addLog(`\u{1F577}️ ${m.name} bites ${this._eName(t)} for ${d}!`);
                    if (t.health > 0 && Math.random() < 0.35) _vPoison(t, d);
                    if (t.health > 0 && Math.random() < 0.25) _vWeb(t);
                    _vKill(t); break;
                }
                case 'bat': {
                    const d = _vHit(t);
                    this._addLog(`\u{1F987} ${m.name} bites ${this._eName(t)} for ${d}!`);
                    if (t.health > 0 && Math.random() < 0.30) _vBleed(t, d);
                    _vKill(t); break;
                }
                case 'giant_bat': {
                    // 2 attacks
                    for (let i = 0; i < 2; i++) {
                        if (targets.length === 0) break;
                        const tgt = pickTarget();
                        const d = _vHit(tgt);
                        this._addLog(`\u{1F987} ${m.name} slams ${this._eName(tgt)} for ${d}!`);
                        if (d > 0 && tgt.health > 0 && Math.random() < 0.20) {
                            if (this._tryStunEnemy(tgt)) this._addLog(`  ⚡ ${this._eName(tgt)} is stunned by the sonic screech!`);
                        }
                        _vKill(tgt);
                        if (tgt.health <= 0) targets.splice(targets.indexOf(tgt), 1);
                    }
                    break;
                }
                case 'giant_centipede': {
                    // 3 attacks
                    for (let i = 0; i < 3; i++) {
                        if (targets.length === 0) break;
                        const tgt = pickTarget();
                        const d = _vHit(tgt);
                        this._addLog(`\u{1F41E} ${m.name} bites ${this._eName(tgt)} for ${d}!`);
                        if (d > 0 && Math.random() < 0.45) _vPoison(tgt, d);
                        _vKill(tgt);
                        if (tgt.health <= 0) targets.splice(targets.indexOf(tgt), 1);
                    }
                    break;
                }
                case 'cave_crawler': {
                    const d = _vHit(t);
                    this._addLog(`\u{1F41B} ${m.name} slams ${this._eName(t)} for ${d}!`);
                    if (d > 0 && t.health > 0 && Math.random() < 0.30) {
                        if (this._tryHoldEnemy(t)) this._addLog(`  \u{1F9B5} ${this._eName(t)} is HELD!`);
                    }
                    _vKill(t); break;
                }
                case 'black_widow': {
                    const d = _vHit(t);
                    this._addLog(`\u{1F577}️ ${m.name} bites ${this._eName(t)} for ${d}!`);
                    if (t.health > 0 && Math.random() < 0.40) _vPoison(t, d, 2);
                    if (t.health > 0 && Math.random() < 0.35) _vWeb(t);
                    _vKill(t); break;
                }
                case 'cave_fisher': {
                    const held = (t.stunned || (t.webbedRounds || 0) > 0);
                    const d = _vHit(t);
                    const bonus = held ? Math.max(0, Math.floor(d * 0.5)) : 0;
                    const total = d + bonus;
                    if (bonus > 0) {
                        t.health = Math.max(0, t.health - bonus);
                        this._addLog(`\u{1F99E} ${m.name} snares ${this._eName(t)} for ${d} (+${bonus} vs held) = ${total}!`);
                    } else {
                        this._addLog(`\u{1F99E} ${m.name} hooks ${this._eName(t)} for ${d}!`);
                    }
                    if (t.health > 0 && Math.random() < 0.50) _vWeb(t);
                    _vKill(t); break;
                }
                case 'stirge': {
                    const d = _vHit(t);
                    this._addLog(`\u{1F987} ${m.name} latches onto ${this._eName(t)} for ${d}!`);
                    _vDrain(t, d);
                    _vKill(t); break;
                }
                case 'blood_wasp': {
                    // 2 attacks
                    for (let i = 0; i < 2; i++) {
                        if (targets.length === 0) break;
                        const tgt = pickTarget();
                        const d = _vHit(tgt);
                        this._addLog(`\u{1F41D} ${m.name} stings ${this._eName(tgt)} for ${d}!`);
                        if (tgt.health > 0 && Math.random() < 0.40) _vPoison(tgt, d);
                        if (tgt.health > 0 && Math.random() < 0.30) _vBleed(tgt, d);
                        if (d > 0 && tgt.health > 0 && Math.random() < 0.20) {
                            if (this._tryStunEnemy(tgt)) this._addLog(`  ⚡ ${this._eName(tgt)} is stunned!`);
                        }
                        _vKill(tgt);
                        if (tgt.health <= 0) targets.splice(targets.indexOf(tgt), 1);
                    }
                    break;
                }
                case 'vampire_bat': {
                    const d = _vHit(t);
                    this._addLog(`\u{1F987} ${m.name} bites ${this._eName(t)} for ${d}!`);
                    _vDrain(t, d);
                    if (t.health > 0 && Math.random() < 0.30) _vBleed(t, d);
                    _vKill(t); break;
                }
                case 'tunnel_worm': {
                    const d = _vHit(t);
                    this._addLog(`\u{1F40D} ${m.name} constricts ${this._eName(t)} for ${d}!`);
                    if (t.health > 0 && Math.random() < 0.40) _vPoison(t, d);
                    if (t.health > 0 && Math.random() < 0.15) _vWeb(t);
                    _vKill(t); break;
                }
                case 'giant_scorpion': {
                    // 2 claw attacks + stinger
                    for (let i = 0; i < 2; i++) {
                        if (targets.length === 0) break;
                        const tgt = pickTarget();
                        const d = _vHit(tgt);
                        this._addLog(`\u{1F982} ${m.name} claws ${this._eName(tgt)} for ${d}!`);
                        _vKill(tgt);
                        if (tgt.health <= 0) targets.splice(targets.indexOf(tgt), 1);
                    }
                    if (targets.length > 0) {
                        const tgt = pickTarget();
                        const d = _vHit(tgt);
                        this._addLog(`\u{1F982} ${m.name}'s stinger strikes ${this._eName(tgt)} for ${d}!`);
                        if (d > 0 && tgt.health > 0 && Math.random() < 0.50) _vPoison(tgt, d, 1.5);
                        _vKill(tgt);
                    }
                    break;
                }
                case 'phase_spider': {
                    const d = _vHit(t, true); // ignores armor
                    this._addLog(`\u{1F577}️ ${m.name} phases through ${this._eName(t)} for ${d}!`);
                    if (d > 0 && t.health > 0 && Math.random() < 0.35) {
                        if (this._tryHoldEnemy(t)) this._addLog(`  \u{1F9EA} ${this._eName(t)} is PARALYZED by phase venom!`);
                    }
                    _vKill(t); break;
                }
                case 'rust_monster': {
                    const d = _vHit(t, true); // ignores armor
                    this._addLog(`\u{1F9A7} ${m.name} corrodes ${this._eName(t)} for ${d}!`);
                    if (d > 0 && t.health > 0) {
                        if (!Array.isArray(t.activeEffects)) t.activeEffects = [];
                        t.activeEffects.push({ type: 'rust_corrosion', defenseBonus: -1, permanent: true });
                        this._addLog(`  \u{1F7E4} ${this._eName(t)}'s armor is corroded! (-1 defense)`);
                    }
                    _vKill(t); break;
                }
                default: {
                    const d = _vHit(t);
                    this._addLog(`\u{1F577}️ ${m.name} strikes ${this._eName(t)} for ${d}!`);
                    _vKill(t);
                }
            }
            };

            for (let act = 0; act < frenzyActions; act++) {
                if (targets.length === 0) break;
                if (act > 0) this._addLog(`  ⚡ ${m.name} takes an extra frenzy action (${act + 1}/${frenzyActions})!`);
                _runVerminAction();
            }
            return;
        }

        // ── Vermin Keeper: slime summon attack ──────────────────────────────────
        if (beastKind === 'slime' || (m.isSummoned && SLIME_PRESETS[m.summonType])) {
            const sType = m.summonType;
            const keeper = this._getVKById(m.summonerId);
            const frenzyEligible = !!(keeper && keeper.health > 0 && this._isVKFrenzyEligibleMember(m, stats));
            const frenzyMult = frenzyEligible ? this._getVKFrenzyDamageMultiplier(keeper.level) : 1;
            const frenzyActions = frenzyEligible ? this._getVKFrenzyActionCount(keeper.level) : 1;
            const pickTarget = () => {
                const marked = keeper ? this._getVKHiveMarkTarget(keeper.id) : null;
                if (marked && marked.health > 0) return marked;
                return targets[Math.floor(Math.random() * targets.length)];
            };

            if (frenzyEligible && frenzyActions > 1) {
                this._addLog(`🧪 Frenzy! ${m.name} surges to ${frenzyActions} actions this turn at ×${frenzyMult.toFixed(2)} damage.`);
            }

            const _sHit = (tgt) => {
                let dmg = randomInt(stats.meleeMin || 1, stats.meleeMax || 3);
                dmg = Math.max(1, Math.round(dmg * frenzyMult));
                return this._damageSummonEnemy(tgt, dmg, false, false, { contactAttacker: m });
            };
            const _sHold = (tgt) => {
                if (tgt.isBoss || tgt.isMegaBoss || tgt.isSuperBoss) return false;
                return this._tryHoldEnemy(tgt);
            };
            const _sKill = (tgt) => { if (tgt.health <= 0) this._addLog(`${this._eName(tgt)} is defeated!`); };

            const _runSlimeAction = () => {
            const t = pickTarget();
            switch (sType) {
                case 'slime': {
                    const d = _sHit(t);
                    this._addLog(`\u{1FAA1} ${m.name} engulfs ${this._eName(t)} for ${d}!`);
                    if (d > 0 && t.health > 0 && Math.random() < 0.25) {
                        if (_sHold(t)) this._addLog(`  \u{1F9B7} ${this._eName(t)} is HELD by the slime!`);
                    }
                    _sKill(t); break;
                }
                case 'acid_slime': {
                    const d = _sHit(t);
                    this._addLog(`\u{1FAA1} ${m.name} splashes ${this._eName(t)} for ${d}!`);
                    if (d > 0 && t.health > 0) {
                        const dot = Math.max(1, Math.floor(d * 0.20));
                        if (!Array.isArray(t.activeEffects)) t.activeEffects = [];
                        t.activeEffects.push({ type: 'acid_dot', damage: dot, rounds: 2 });
                        this._addLog(`  \u{1F7E2} ${this._eName(t)} is corroded! (${dot}/rd \xd72 rds)`);
                    }
                    if (d > 0 && t.health > 0 && Math.random() < 0.25) {
                        if (_sHold(t)) this._addLog(`  \u{1F9B7} ${this._eName(t)} is HELD!`);
                    }
                    _sKill(t); break;
                }
                case 'gelatinous_cube': {
                    const d = _sHit(t);
                    this._addLog(`\u{1FAA1} ${m.name} engulfs ${this._eName(t)} for ${d}!`);
                    if (d > 0 && t.health > 0 && Math.random() < 0.50) {
                        if (_sHold(t)) {
                            this._addLog(`  \u{1F9B7} ${this._eName(t)} is ENGULFED and held!`);
                            if (Math.random() < 0.40) {
                                if (this._tryParalyzeEnemy(t)) this._addLog(`  \u{1F9EA} ${this._eName(t)} is PARALYZED by the cube's acid!`);
                            }
                        }
                    }
                    _sKill(t); break;
                }
                default: {
                    const d = _sHit(t);
                    this._addLog(`\u{1FAA1} ${m.name} engulfs ${this._eName(t)} for ${d}!`);
                    _sKill(t);
                }
            }
            };

            for (let act = 0; act < frenzyActions; act++) {
                if (targets.length === 0) break;
                if (act > 0) this._addLog(`  ⚡ ${m.name} takes an extra frenzy action (${act + 1}/${frenzyActions})!`);
                _runSlimeAction();
            }
            return;
        }

        // ── Vermin Keeper: vermin/acid swarm attack ─────────────────────────────
        if (beastKind === 'vermin_swarm' || beastKind === 'acid_swarm') {
            this._processVKSwarmAttack(m);
            return;
        }

        // ── Death Knight: 5% HP regen at start of own turn ──────────────────
        if (m.summonType === 'death_knight' && m.health < m.maxHealth) {
            const regen = Math.max(1, Math.floor(m.maxHealth * 0.05));
            const before = m.health;
            m.health = Math.min(m.maxHealth, m.health + regen);
            const healed = m.health - before;
            if (healed > 0) this._addLog(`\u2620\uFE0F ${m.name} draws on dark energy and recovers ${healed} HP.`);
        }

        // ── Vampire: gaseous form — regenerate and skip attack until recovered ─
        if (m.summonType === 'vampire' && m.summonStats && m.summonStats.gaseousForm) {
            const regen = Math.max(1, Math.floor(m.maxHealth * 0.10));
            const before = m.health;
            m.health = Math.min(m.maxHealth, m.health + regen);
            const healed = m.health - before;
            if (healed > 0) this._addLog(`\u{1F32B}\uFE0F ${m.name} drifts in gaseous form, recovering ${healed} HP.`);
            if (m.health >= Math.ceil(m.maxHealth * 0.30)) {
                m.summonStats.gaseousForm = false;
                this._addLog(`\u{1F9DB} ${m.name} coalesces back into corporeal form!`);
            }
            return; // cannot attack while gaseous
        }

        // ── Vampire: minion summoning chance ──────────────────────────────────
        if (m.summonType === 'vampire') {
            const necromancer = this.party.find(p => p.id === m.summonerId);
            if (necromancer) {
                const summonChance = 0.33 + (necromancer.level * 0.01 / 3);
                if (Math.random() < summonChance) {
                    const isBat = Math.random() < 0.5;
                    this.summonBeastFromVampire(isBat ? 'vampire_bat' : 'wolf', m);
                    return; // vampire does not attack this round
                }
            }
        }

        // ── Undead / fallback: melee single-target ───────────────────────────
        // Spectre and Ghost are incorporeal — attacks phase through ALL armor.
        const isIncorporeal = m.summonType === 'spectre'
            || m.summonType === 'ghost'
            || (m.summonStats && m.summonStats.incorporeal);
        const t = targets[Math.floor(Math.random() * targets.length)];
        const dmg = randomInt(stats.meleeMin ?? 2, stats.meleeMax ?? 8);
        const dealt = isIncorporeal
            ? this._damageSummonEnemy(t, dmg, true, false, { contactAttacker: m })   // true = ignore armor/defense
            : this._damageSummonEnemy(t, dmg, false, false, { contactAttacker: m });
        if (isIncorporeal) {
            this._addLog(`\u{1F47B} ${m.name} phases through ${this._eName(t)}'s defences for ${dealt}!`);
        } else {
            this._addLog(`${m.name} strikes ${this._eName(t)} for ${dealt}!`);
        }

        // ── Ghoul: 40% paralysis chance ──────────────────────────────────────
        if (t.health > 0 && m.summonType === 'ghoul') {
            // Paralysis: undead/construct/elemental/incorporeal immune (handled by _tryParalyzeEnemy)
            if (Math.random() < GHOUL_PARALYZE_CHANCE) {
                if (this._tryParalyzeEnemy(t))
                    this._addLog(`\u{1F9DF}\u200D\u2640\uFE0F ${this._eName(t)} is PARALYZED by the ghoul's touch!`);
            }
        }

        // ── Mummy: 33% stun + permanent Mummy Rot DoT ───────────────────────
        if (t.health > 0 && m.summonType === 'mummy') {
            const tDef = ENEMY_TYPES[t.type] || {};
            const tTags = Array.isArray(tDef.tags) ? tDef.tags : [];
            // Stun: undead/construct/elemental/incorporeal immunity handled by _tryStunEnemy
            if (Math.random() < 0.33) {
                if (this._tryStunEnemy(t))
                    this._addLog(`\u{1F9DF}\u200D\u2642\uFE0F ${this._eName(t)} is STUNNED by the mummy's curse!`);
            }
            // Mummy Rot: undead/construct/elemental/incorporeal/slime have no living flesh to rot
            if (!tTags.some(t => ['undead', 'construct', 'elemental', 'incorporeal', 'slime'].includes(t))) {
                // Mummy Rot: permanent DoT at half the attack damage per round.
                // Re-applying refreshes the damage value but does not stack.
                t.activeEffects = (t.activeEffects || []).filter(x => x.type !== 'mummy_rot');
                const rotDmg = Math.max(1, Math.floor(dealt * 0.5));
                t.activeEffects.push({ type: 'mummy_rot', damage: rotDmg, rounds: 9999, permanent: true });
                this._addLog(`\u{1F7E4} ${this._eName(t)} is afflicted with Mummy Rot! (${rotDmg}/round, permanent)`);
            }
        }

        // ── Ghost: fear up to [necroLevel] enemies after each attack ─────────
        if (t.health > 0 && m.summonType === 'ghost') {
            this._applyGhostFear(m, targets);
        }

        // ── Vampire: life drain — heal self for damage dealt (even on kill) ────
        if (dealt > 0 && m.summonType === 'vampire') {
            const before = m.health;
            m.health = Math.min(m.maxHealth, m.health + dealt);
            const healed = m.health - before;
            if (healed > 0) this._addLog(`\u{1F9DB} ${m.name} drains ${healed} HP from ${this._eName(t)}!`);
        }

        // ── Death Knight: stun chance + instakill non-boss ───────────────────
        if (t.health > 0 && m.summonType === 'death_knight') {
            const nl = (m.summonStats && m.summonStats.necroLevel) || m.level || 1;
            const tDef  = ENEMY_TYPES[t.type] || {};
            const tTags = Array.isArray(tDef.tags) ? tDef.tags : [];
            // Stun: undead/construct/elemental/incorporeal immunity handled by _tryStunEnemy
            if (Math.random() < (0.33 + nl * 0.01)) {
                if (this._tryStunEnemy(t))
                    this._addLog(`\u2620\uFE0F ${this._eName(t)} is STUNNED by the Death Knight's strike!`);
            }
            const dkInstakillRoll = !tTags.includes('undead') && Math.random() < (0.02 + nl * 0.005);
            if (dkInstakillRoll) {
                if (t.isBoss || t.isMegaBoss) {
                    // Boss/mega-boss immune to instant death — x4 pre-defense damage instead
                    const dkBossDmg = Math.max(1, Math.round(dmg * 4));
                    const dkBossDealt = this._damageSummonEnemy(t, dkBossDmg, false, false, { contactAttacker: m });
                    this._addLog(`\u{1F480} ${m.name} attempts a death strike on ${this._eName(t)} — Boss resists! (x4: ${dkBossDealt} damage)`);
                    if (t.health <= 0) this._addLog(`${this._eName(t)} is defeated!`);
                } else {
                    t.health = 0;
                    if (!t._deathHandled) { t._deathHandled = true; this._onEnemyDeath(t); }
                    this._addLog(`\u{1F480} ${m.name} performs a death strike — ${this._eName(t)} is SLAIN INSTANTLY!`);
                }
            }
        }

        if (t.health <= 0) this._addLog(`${this._eName(t)} is defeated!`);
    }

    _applyGhostFear(summon, targetPool = null) {
        const targets = targetPool || this.aliveHostileEnemies;
        const nl = (summon.summonStats && summon.summonStats.necroLevel) || summon.level || 1;
        const fearCandidates = [...targets].sort(() => Math.random() - 0.5).slice(0, nl);
        for (const ft of fearCandidates) {
            if (!ft || ft.health <= 0) continue;
            const ftDef = ENEMY_TYPES[ft.type] || {};
            const ftTags = Array.isArray(ftDef.tags) ? ftDef.tags : [];
            if (ftTags.includes('undead') || ftTags.includes('construct')) continue;
            if (Math.random() < 0.50) continue;
            const alreadyFeared = (ft.activeEffects || []).some(x => x.type === 'ghost_fear');
            if (!alreadyFeared) {
                ft.activeEffects = ft.activeEffects || [];
                ft.activeEffects.push({
                    type: 'ghost_fear',
                    damageBonus: -3,
                    defenseBonus: -3,
                    rounds: 9999,
                    permanent: true,
                });
                this._addLog(`😨 ${this._eName(ft)} is SEIZED with Fear! (-3 atk / -3 def, until combat ends)`);
            }
        }
    }

    // ────────────────────────────────────────────
    // Initiative helpers
    // ────────────────────────────────────────────

    /**
     * Roll initiative for a single participant.
     * Rogues, monks, and rangers get +1.
     */
    _rollInitiative(ref, kind) {
        const roll = randomInt(1, INITIATIVE_DIE);
        let bonus = 0;
        if (kind === 'party') {
            const classId = ref.classId;
            if (classId === 'rogue' || classId === 'monk' || classId === 'ranger') {
                bonus += 1;
                // Additional +1 per 5 levels beyond 1
                bonus += Math.floor((ref.level || 1) / 5);
            }
            // Haste song initiative bonus
            const hasteEffect = Array.isArray(ref.activeEffects)
                ? ref.activeEffects.find(e => e && e.type === 'bard_song_haste')
                : null;
            if (hasteEffect && typeof hasteEffect.initiativeBonus === 'number') {
                bonus += hasteEffect.initiativeBonus;
            }
        }
        return Math.max(1, roll + bonus);
    }

    /**
     * Build the sorted initiative order for the current combatants.
     * Returns array of slots sorted descending by initiative; ties broken randomly.
     */
    _buildInitiativeOrder() {
        const entries = [];
        for (const m of this.party) {
            if (m.health <= 0) continue;
            const init = this._rollInitiative(m, 'party');
            entries.push({ kind: 'party', ref: m, init, skipThisRound: false });
        }
        for (const e of this.enemies) {
            if (e.health <= 0) continue;
            const init = this._rollInitiative(e, 'enemy');
            entries.push({ kind: 'enemy', ref: e, init, skipThisRound: false });
        }
        entries.sort((a, b) => b.init - a.init || (Math.random() < 0.5 ? -1 : 1));
        return entries;
    }

    /**
     * Register a newly summoned member into the initiative order immediately
     * after the current turn slot, inheriting the caster's initiative value.
     * The summon acts this round (no skip). Only runs during active combat.
     */
    _registerNewSummon(member) {
        if (this.phase !== 'PLAYER_TURN' && this.phase !== 'ENEMY_TURN') return;
        if (!this._initiativeOrder.length) return;
        const casterSlot = this._initiativeOrder[this._initTurnIdx];
        const init = casterSlot ? casterSlot.init : this._rollInitiative(member, 'party');
        // Insert immediately after the current turn slot (and after any summons
        // already queued for the same summoner) so the creature acts this round.
        let insertIdx = this._initTurnIdx + 1;
        while (insertIdx < this._initiativeOrder.length) {
            const s = this._initiativeOrder[insertIdx];
            if (s.kind === 'party' && s.ref.isSummoned && s.ref.summonerId === member.summonerId) {
                insertIdx++;
            } else { break; }
        }
        this._initiativeOrder.splice(insertIdx, 0, { kind: 'party', ref: member, init, skipThisRound: false });
        this._addLog(`⚡ ${member.name} enters the fray — acts immediately!`);
    }

    // ────────────────────────────────────────────
    // Turn flow
    // ────────────────────────────────────────────

    /**
     * Start a new initiative round: reset defending, tick all effects,
     * then advance through the order.
     */
    _beginInitiativeRound() {
        this._logTarget = 'player';
        for (const m of this.party) m._defending = false;

        this._tickPartyEffects();
        this._checkFaerieQueenRevive();
        if (this.aliveParty.length === 0) {
            // If a necromancer's soul lingers in its phylactery, release it now.
            // The battle is still lost, but the necromancer survives post-combat
            // in normal form with minimal HP.
            const lichNecro = this.party.find(p => !p.isSummoned && p.lichPhial);
            if (lichNecro) {
                const reviveHp = Math.max(1, Math.floor(lichNecro.maxHealth * 0.10));
                lichNecro.health = reviveHp;
                lichNecro.lichPhial  = false;
                lichNecro.isLichForm = false;
                this._addLog(`\u{1F9F4} ${lichNecro.name}'s soul escapes the phylactery — they survive the defeat in mortal form (${reviveHp} HP).`);
            }
            this.phase = 'DEFEAT';
            this._addLog('--- Your party has been defeated! ---');
            this._notify();
            return;
        }
        // Even if summoned undead are still alive, defeat if all real members are gone/phylactery.
        if (this.allRealMembersDefeated) {
            this.phase = 'DEFEAT';
            this._addLog('--- Your party has been defeated! ---');
            this._notify();
            return;
        }

        this._logTarget = 'enemy';
        this._tickEnemyEffects();
        this._logTarget = 'player';
        if (this.aliveHostileEnemies.length === 0) {
            this._finishVictory();
            return;
        }

        // Wandering monster check — ask Game.js if any nearby enemies heard the
        // battle and want to join.  The callback returns an array of { enemy }
        // objects; we initialize each for combat and push them into this.enemies
        // so _buildInitiativeOrder picks them up in the new round.
        if (typeof this.onRoundBegin === 'function') {
            const newcomers = this.onRoundBegin(this.turnNumber);
            if (Array.isArray(newcomers) && newcomers.length > 0) {
                for (const { enemy } of newcomers) {
                    if (!enemy || enemy.health <= 0) continue;
                    enemy.stunned = false;
                    enemy.activeEffects = enemy.activeEffects || [];
                    enemy.activeEffects.length = 0;
                    this.enemies.push(enemy);
                    this._addLog(
                        `👂 The sounds of battle draw ${this._eName(enemy)} into the fight!`
                    );
                }
            }
        }

        this._initiativeOrder = this._buildInitiativeOrder();
        if (this._initiativeOrder.length === 0) return;
        this._initTurnIdx = 0;
        this._advanceThroughInitiative();
    }

    /**
     * Advance through the initiative order until we reach a player-controlled
     * member (pause for input) or a terminal phase (DEFEAT/VICTORY/etc.).
     * Enemy and summon turns execute automatically without pausing.
     */
    _advanceThroughInitiative() {
        while (this._initTurnIdx < this._initiativeOrder.length) {
            const slot = this._initiativeOrder[this._initTurnIdx];
            const ref  = slot.ref;

            // Skip dead participants.
            if (ref.health <= 0) { this._initTurnIdx++; continue; }

            // Skip summons that were created this round — they act next round.
            if (slot.skipThisRound) {
                slot.skipThisRound = false;
                this._initTurnIdx++;
                continue;
            }

            if (slot.kind === 'enemy') {
                // Boss monsters act multiple times per round:
                //   Super Boss → 4 actions, Mega Boss → 3, Boss → 2, others → 1.
                const actionCount = ref.isSuperBoss ? SUPER_BOSS_ACTIONS_PER_TURN
                                  : ref.isMegaBoss  ? 3
                                  : (ref.isBoss     ? 2 : 1);
                if (actionCount > 1) {
                    const tier = ref.isSuperBoss ? 'SUPER BOSS' : ref.isMegaBoss ? 'MEGA BOSS' : 'BOSS';
                    this._addLog(`⚔️ ${this._eName(ref)} surges — ${tier} takes ${actionCount} actions this turn!`);
                }
                for (let _a = 0; _a < actionCount; _a++) {
                    if (ref.health <= 0) break;
                    try {
                        this._executeOneEnemyTurn(ref);
                    } catch (err) {
                        this._handleAutoTurnError(slot, err);
                        break;
                    }
                    if (this.phase === 'DEFEAT' || this.phase === 'FLED' || this.phase === 'VICTORY') return;
                    if (this.phase === 'NEED_PROMOTION') return;
                    if (this.aliveHostileEnemies.length === 0) { this._finishVictory(); return; }
                }
                this._initTurnIdx++;
                if (this.pauseAfterEachTurn) { this.phase = 'ENEMY_TURN'; this._notify(); return; }
                continue;
            }

            // Party member's turn.
            const m = ref;
            this._avatarCleanseAtTurnStart(m);

            // Web-skip
            if (m.webbedRounds && m.webbedRounds > 0) {
                if ((m.abolethEnslavedRounds || 0) > 0) {
                    const drumCount = this._getAllBardsWithDrums().length;
                    const shrugChance = Math.min(1, 0.33 + drumCount * 0.10);
                    if (Math.random() < shrugChance) {
                        m.abolethEnslavedRounds = 0;
                        m.webbedRounds = 0;
                        this._addLog(`🧠 ${m.name} shrugs off the aboleth's enslavement! (${Math.round(shrugChance * 100)}% chance)`);
                    } else {
                        this._addLog(`🧠 ${m.name} is mentally enslaved and cannot act! (${m.abolethEnslavedRounds} rd left)`);
                        if (m.symphonyActive) this._bardEndSymphony(m, 'interrupted');
                        m.webbedRounds--;
                        m.abolethEnslavedRounds = Math.max(0, (m.abolethEnslavedRounds || 0) - 1);
                        this._initTurnIdx++;
                        continue;
                    }
                }
                if (m.webbedRounds > 0) {
                    this._addLog(`\u{1F578}\uFE0F ${m.name} struggles against the webbing and cannot act! (${m.webbedRounds} rd left)`);
                    if (m.symphonyActive) this._bardEndSymphony(m, 'interrupted');
                    m.webbedRounds--;
                    this._initTurnIdx++;
                    continue;
                }
            }

            // Prone-skip (Zombie Giant stomp)
            if (m.proneRounds && m.proneRounds > 0) {
                this._addLog(`\u23EC ${m.name} is knocked PRONE and cannot act! (${m.proneRounds} rd left)`);
                if (m.symphonyActive) this._bardEndSymphony(m, 'interrupted');
                m.proneRounds--;
                this._initTurnIdx++;
                continue;
            }

            // Stun-skip (raging barbarians shrug off stun; warriors have level-based shrug)
            if (m.stunned) {
                if (m.classId === 'barbarian' && m.isRaging) {
                    this._addLog(`\u{1F534} ${m.name}'s rage burns through the stun!`);
                    m.stunned = false;
                    // Fall through — barbarian takes their normal turn
                } else if (m.classId === 'warrior') {
                    const shrugs = Math.min(0.95, (m.level || 1) * 0.02);
                    if (Math.random() < shrugs) {
                        this._addLog(`\u{1F6E1}️ ${m.name} shrugs off the stun through sheer willpower! (${Math.round(shrugs * 100)}%)`);
                        m.stunned = false;
                        // Fall through — warrior takes their normal turn
                    } else {
                        this._addLog(`${m.name} is stunned and cannot act!`);
                        m.stunned = false;
                        this._initTurnIdx++;
                        continue;
                    }
                } else {
                    this._addLog(`${m.name} is stunned and cannot act!`);
                    if (m.symphonyActive) this._bardEndSymphony(m, 'interrupted');
                    m.stunned = false;
                    this._initTurnIdx++;
                    continue;
                }
            }

            // Summoned AI auto-turn
            if (m.isSummoned) {
                this._logTarget = 'player'; // summon acts for the player's side
                this._addLog(`--- ${m.name}'s turn ---`);
                try {
                    this._takeSummonTurn(m);
                } catch (err) {
                    this._handleAutoTurnError(slot, err);
                }
                // Quickstep Song haste: qualifying summons get one bonus auto-attack
                if (m.health > 0 && m.quickstepHasteActive && this.aliveHostileEnemies.length > 0) {
                    try {
                        this._addLog(`⚡ ${m.name} moves with supernatural speed — bonus attack!`);
                        this._takeSummonTurn(m);
                    } catch (_err) {
                        // ignore errors on haste bonus turn
                    }
                }
                if (this.aliveHostileEnemies.length === 0) { this._finishVictory(); return; }
                if (this.allRealMembersDefeated) {
                    this.phase = 'DEFEAT';
                    this._addLog('--- Your party has been defeated! ---');
                    this._notify();
                    return;
                }
                this._initTurnIdx++;
                if (this.pauseAfterEachTurn) { this.phase = 'ENEMY_TURN'; this._notify(); return; }
                continue;
            }

            // Human-controlled: set currentMemberIndex and wait for player input.
            this._logTarget = 'player'; // reset before player acts so all action logs go to the party window
            this.currentMemberIndex = this.party.indexOf(m);
            this.phase = 'PLAYER_TURN';
            this._addLog(`--- Turn ${this.turnNumber}: ${m.name}'s turn ---`);
            this._notify();
            return;
        }

        // All slots exhausted — start a new round.
        this.turnNumber++;
        this._beginInitiativeRound();
    }

    _handleAutoTurnError(slot, err) {
        const ref = slot && slot.ref;
        const actorName = slot?.kind === 'enemy'
            ? this._eName(ref)
            : (ref?.name || 'Unknown combatant');
        const errMsg = err && (err.message || String(err)) || 'unknown error';
        this._addLog(`⚠️ ${actorName}'s turn was skipped due to a combat script error: ${errMsg}`);
        try {
            console.error('Combat auto-turn failed:', { actor: actorName, slot, err });
        } catch (_) {}
    }

    _advancePlayerTurn() {
        this._logTarget = 'player';
        if (this.aliveHostileEnemies.length === 0) {
            this._finishVictory();
            return;
        }

        // ── Spiritual Weapons: fire once per cleric turn, before advancing ──
        const _sw = this.currentMember;
        if (_sw && _sw.classId === 'cleric' && _sw.health > 0 && (_sw.spiritualWeapons || []).length > 0) {
            this._processSpiritualWeapons(_sw);
        }

        // Re-check victory: weapon strikes might have killed the last enemy.
        if (this.aliveHostileEnemies.length === 0) {
            this._finishVictory();
            return;
        }

        // Hunter's Mark bonus turn: if the ranger killed the marked enemy, they go again
        const _cm = this.currentMember;
        if (_cm && _cm.bonusTurnPending) {
            _cm.bonusTurnPending = false;
            this._addLog(`🎯 ${_cm.name}'s Hunter's Mark grants a BONUS TURN!`);
            this._notify();
            return;
        }
        this._initTurnIdx++;
        this._advanceThroughInitiative();
    }

    /** Resume after a manual-mode pause (phase === 'ENEMY_TURN'). */
    resumeManualTurn() {
        if (this.phase !== 'ENEMY_TURN') return;
        const beforeIdx = this._initTurnIdx;
        const beforeRound = this.turnNumber;
        try {
            this._advanceThroughInitiative();
        } catch (err) {
            const slot = this._initiativeOrder[this._initTurnIdx];
            this._handleAutoTurnError(slot, err);
            this._initTurnIdx++;
            this.phase = 'ENEMY_TURN';
            this._notify();
            return;
        }
        if (this.phase === 'ENEMY_TURN'
            && this._initTurnIdx === beforeIdx
            && this.turnNumber === beforeRound) {
            const slot = this._initiativeOrder[this._initTurnIdx];
            this._handleAutoTurnError(slot, new Error('manual advance made no progress'));
            this._initTurnIdx++;
            this._advanceThroughInitiative();
        }
    }

    /** Move the current player's initiative slot to the end of the round. */
    delayAction() {
        const m = this.currentMember;
        if (!m || this.phase !== 'PLAYER_TURN') return;
        // Block infinite delay: require at least one auto-acting entity (enemy/summon) still to go
        const remainingAutoActors = this._initiativeOrder.slice(this._initTurnIdx + 1)
            .some(s => s.ref.health > 0 && (s.kind === 'enemy' || s.ref.isSummoned));
        if (!remainingAutoActors) {
            this._addLog(`⏱️ ${m.name} can't delay — no more enemies or summons act this round.`);
            this._notify();
            return;
        }
        const [slot] = this._initiativeOrder.splice(this._initTurnIdx, 1);
        this._initiativeOrder.push(slot);
        this._addLog(`⏱️ ${m.name} delays their action until the end of the round.`);
        this._advanceThroughInitiative();
    }

    /** Returns true if the given entity has already taken its turn this round. */
    hasActedThisRound(entity) {
        const idx = this._initiativeOrder.findIndex(s => s.ref === entity);
        return idx >= 0 && idx < this._initTurnIdx;
    }

    /**
     * Execute a single enemy's turn. Handles stun-skip, AoE magic, and
     * melee/magic attacks with the level-3+ damage bonus.
     *
     * NEED_PROMOTION logic:
     *   Pre-attack (front already empty): sets phase, does NOT increment
     *     _initTurnIdx — the enemy will try again after promotion.
     *   Post-attack (front fell from this hit): pre-increments _initTurnIdx
     *     so the caller knows this slot is done before returning.
     */
    _executeOneEnemyTurn(e) {
        this._logTarget = 'enemy';
        const eName = this._eName(e);
        const liveFront = this.aliveFront;
        if (liveFront.length === 0) {
            if (this.aliveBack.length > 0 && !this.allRealMembersDefeated) {
                this.phase = 'NEED_PROMOTION';
                this._addLog('\u26A0\uFE0F The front line has fallen! Promote a back-row ally forward.');
                this._notify();
                return;
            }
            this.phase = 'DEFEAT';
            this._addLog('--- Your party has been defeated! ---');
            this._notify();
            return;
        }
        this._addLog(`--- ${eName}'s turn ---`);

        // Charmed enemy: fights for the party this turn
        if (e.charmedRounds > 0) {
            const tags = this._getEnemyTags(e);
            const vk = this._getVKById(e.charmerId);
            const frenzyEligible = !!(vk && vk.health > 0 && (vk.level || 1) >= VK_L35_UNLOCK_LEVEL && (tags.includes('vermin') || tags.includes('slime')));
            const frenzyActions = frenzyEligible ? this._getVKFrenzyActionCount(vk.level) : 1;
            if (frenzyEligible && frenzyActions > 1) {
                this._addLog(`🕷️ ${eName} acts with Minions' Frenzy (${frenzyActions} actions)!`);
            }
            for (let i = 0; i < frenzyActions; i++) {
                if (this.aliveHostileEnemies.length === 0 || e.health <= 0) break;
                if (i > 0) this._addLog(`  ⚡ ${eName} takes an extra frenzy action (${i + 1}/${frenzyActions})!`);
                this._charmedMonsterAttack(e);
            }
            return;
        }

        // webbedRounds: bosses break free instantly; regular enemies lose their turn
        if (e.webbedRounds > 0 && (e.isBoss || e.isMegaBoss || e.isSuperBoss)) {
            this._addLog(`\u{1F451} ${eName} tears free from the immobilization!`);
            e.webbedRounds = 0;
        }
        if (e.webbedRounds > 0) {
            this._addLog(`\u{1F578}️ ${eName} is webbed and cannot act! (${e.webbedRounds} rd left)`);
            e.webbedRounds--;
            return;
        }
        if ((e.proneRounds || 0) > 0) {
            this._addLog(`⏬ ${eName} is prone and cannot act! (${e.proneRounds} rd left)`);
            e.proneRounds = Math.max(0, (e.proneRounds || 0) - 1);
            return;
        }

        // Stun resistance:
        //   Super Boss — 100% immune (cannot be stunned).
        //   Mega Boss  — 80% chance to shrug off.
        //   Boss       — 50% chance.
        //   Others     — always stunned (lose turn).
        if (e.stunned) {
            e.stunned = false;
            const resistChance = e.isSuperBoss ? 1.0 : e.isMegaBoss ? 0.80 : (e.isBoss ? 0.50 : 0);
            if (resistChance > 0 && Math.random() < resistChance) {
                const flavour = e.isSuperBoss ? 'with godlike fury' : e.isMegaBoss ? 'with terrifying might' : 'with sheer force';
                this._addLog(`⚡ ${eName} resists the stun ${flavour}!`);
                // Fall through — boss still acts this turn.
            } else {
                this._addLog(`${eName} is stunned and cannot act!`);
                e.stunImmuneRounds = 2;
                return;
            }
        }

        // Reckless Move knock: enemy loses its next turn
        if (e.knocked) {
            e.knocked = false;
            this._addLog(`💥 ${eName} is knocked back and cannot act this turn!`);
            return;
        }

        const dlvl = this.dungeonLevel;
        const lvlBoost      = Math.max(0, dlvl - 1);
        const lvlThreeBonus = Math.max(0, dlvl - (MONSTER_DAMAGE_BONUS_THRESHOLD - 1));
        const typeDef = ENEMY_TYPES[e.type] || {};
        e._enemyAttackExhausted = false;

        // ── Drake: AoE fire breath (hits all, applies burn DoT) ──────────
        if (typeDef.aoeFire && this._enemyCanAttemptManaAttack(e)) {
            this._spendEnemyMana(e);
            const dmin = MONSTER_MELEE_DAMAGE_MIN + MONSTER_DAMAGE_PER_LEVEL * lvlBoost + MONSTER_DAMAGE_BONUS_PER_LEVEL * lvlThreeBonus;
            const dmax = MONSTER_MELEE_DAMAGE_MAX + MONSTER_DAMAGE_PER_LEVEL * lvlBoost + MONSTER_DAMAGE_BONUS_PER_LEVEL * lvlThreeBonus;
            let dmg = randomInt(dmin, dmax);
            dmg = Math.max(1, Math.round(dmg * MONSTER_DAMAGE_MULTIPLIER));
            dmg = Math.max(1, dmg + this._getEnemyDamageMod(e, 'magic'));
            this._addLog(`\u{1F525} ${eName} unleashes a torrent of fire — the whole party is scorched!`);
            const aoeTargets = this.aliveParty.slice();
            for (const target of aoeTargets) {
                this._applyEnemyHit(e, target, dmg, 'magic', { aoe: true, fireBurn: true });
                if (this.aliveParty.length === 0) break;
            }

        // ── Water Elemental: AoE drowning surge — hits all, applies drowning DoT ──
        } else if (typeDef.aoeDrowning && this._enemyCanAttemptManaAttack(e)) {
            this._spendEnemyMana(e);
            const dmin = MONSTER_MAGIC_DAMAGE_MIN + MONSTER_DAMAGE_PER_LEVEL * lvlBoost + MONSTER_DAMAGE_BONUS_PER_LEVEL * lvlThreeBonus;
            const dmax = MONSTER_MAGIC_DAMAGE_MAX + MONSTER_DAMAGE_PER_LEVEL * lvlBoost + MONSTER_DAMAGE_BONUS_PER_LEVEL * lvlThreeBonus;
            let dmg = randomInt(dmin, dmax);
            dmg = Math.max(1, Math.round(dmg * MONSTER_DAMAGE_MULTIPLIER));
            dmg = Math.max(1, dmg + this._getEnemyDamageMod(e, 'magic'));
            this._addLog(`\u{1F30A} ${eName} unleashes a surging torrent — the whole party is pulled under!`);
            const aoeTargets = this.aliveParty.slice();
            for (const target of aoeTargets) {
                this._applyEnemyHit(e, target, dmg, 'magic', { aoe: true, drowning: true, drowningDmg: dmg });
                if (this.aliveParty.length === 0) break;
            }

        // ── AoE magic (cultist, lich, etc.) path — hits all party members ──
        } else if (typeDef.aoeMagic && this._enemyCanAttemptManaAttack(e)) {
            this._spendEnemyMana(e);
            const dmin = MONSTER_MAGIC_DAMAGE_MIN + MONSTER_DAMAGE_PER_LEVEL * lvlBoost + MONSTER_DAMAGE_BONUS_PER_LEVEL * lvlThreeBonus;
            const dmax = MONSTER_MAGIC_DAMAGE_MAX + MONSTER_DAMAGE_PER_LEVEL * lvlBoost + MONSTER_DAMAGE_BONUS_PER_LEVEL * lvlThreeBonus;
            let dmg = randomInt(dmin, dmax);
            const aoeDmgMult = MONSTER_DAMAGE_MULTIPLIER * (typeDef.aoeMagicDamageMult || 1.0);
            dmg = Math.max(1, Math.round(dmg * aoeDmgMult));
            dmg = Math.max(1, dmg + this._getEnemyDamageMod(e, 'magic'));
            this._addLog(`\u{1F52E} ${eName} unleashes a roaring chant of dark power — the whole party is caught in the blast!`);
            const aoeTargets = this.aliveParty.slice();
            for (const target of aoeTargets) {
                this._applyEnemyHit(e, target, dmg, 'magic', { aoe: true });
                if (this.aliveParty.length === 0) break;
            }

        // ── Beholder: 6 random eye beams per turn ────────────────────────
        } else if (typeDef.isBeholderAI) {
            const beamCount = 6;
            const beamTypes = ['magic_blast', 'death_ray', 'stun_ray', 'anti_magic', 'petrify', 'slow_ray'];
            const dmin = MONSTER_MAGIC_DAMAGE_MIN + MONSTER_DAMAGE_PER_LEVEL * lvlBoost + MONSTER_DAMAGE_BONUS_PER_LEVEL * lvlThreeBonus;
            const dmax = MONSTER_MAGIC_DAMAGE_MAX + MONSTER_DAMAGE_PER_LEVEL * lvlBoost + MONSTER_DAMAGE_BONUS_PER_LEVEL * lvlThreeBonus;
            this._addLog(`\u{1F441}️ ${eName} opens all its eyes — eye beams lance across the battlefield!`);
            for (let bi = 0; bi < beamCount && this.aliveParty.length > 0; bi++) {
                const beam = beamTypes[Math.floor(Math.random() * beamTypes.length)];
                const anyAlive = this.aliveParty;
                const frontRow = this.aliveFront;
                let target;
                if (beam === 'magic_blast') {
                    // AoE magic blast
                    this._spendEnemyMana(e);
                    let dmg = randomInt(dmin, dmax);
                    dmg = Math.max(1, Math.round(dmg * MONSTER_DAMAGE_MULTIPLIER));
                    this._addLog(`\u{1F4AB} Beholder: Magic Blast eye hits the whole party!`);
                    for (const t of anyAlive.slice()) {
                        this._applyEnemyHit(e, t, dmg, 'magic', { aoe: true });
                        if (this.aliveParty.length === 0) break;
                    }
                } else if (beam === 'death_ray') {
                    // Double damage, can hit back row — goes through _applyEnemyHit so intercept works
                    target = anyAlive[Math.floor(Math.random() * anyAlive.length)];
                    let dmg = randomInt(dmin, dmax) * 2;
                    dmg = Math.max(1, Math.round(dmg * MONSTER_DAMAGE_MULTIPLIER));
                    this._addLog(`\u{1F480} Beholder: Death Ray hits ${target.name} for ${dmg}!`);
                    this._applyEnemyHit(e, target, dmg, 'magic');
                } else if (beam === 'stun_ray') {
                    // Stun 1-3 rounds
                    target = frontRow.length > 0 ? frontRow[Math.floor(Math.random() * frontRow.length)] : anyAlive[Math.floor(Math.random() * anyAlive.length)];
                    if (this._tryApplyStun(target)) {
                        this._addLog(`⚡ Beholder: Stun Ray hits ${target.name}! (stunned)`);
                    }
                } else if (beam === 'anti_magic') {
                    // -10 magic, targets back row (debuff effect 2 rounds)
                    target = anyAlive[Math.floor(Math.random() * anyAlive.length)];
                    target.addEffect({ type: 'anti_magic_beam', damageBonus: -10, rounds: 2 });
                    this._addLog(`\u{1F52E} Beholder: Anti-Magic Ray hits ${target.name}! (-10 magic dmg for 2 rounds)`);
                } else if (beam === 'petrify') {
                    // Stun 3 rounds + +200 defense; incorporeal/construct/undead immune
                    target = frontRow.length > 0 ? frontRow[Math.floor(Math.random() * frontRow.length)] : anyAlive[Math.floor(Math.random() * anyAlive.length)];
                    if (this._isPetrifyImmunePartyMember(target)) {
                        this._addLog(`\u{1FAA8} Beholder: Petrify Ray hits ${target.name} — immune to petrification!`);
                    } else if (Math.random() < 0.5) {
                        target.webbedRounds = Math.max(target.webbedRounds || 0, 3);
                        target.addEffect({ type: 'petrified', defenseBonus: 200, rounds: 3 });
                        this._addLog(`\u{1FAA8} Beholder: Petrify Ray hits ${target.name}! (locked 3 rounds, +200 def — turned to stone!)`);
                    } else {
                        this._addLog(`\u{1FAA8} Beholder: Petrify Ray misses ${target ? target.name : 'target'}!`);
                    }
                                } else if (beam === 'slow_ray') {
                    // -level/2 melee and defense for front row target
                    target = frontRow.length > 0 ? frontRow[Math.floor(Math.random() * frontRow.length)] : anyAlive[Math.floor(Math.random() * anyAlive.length)];
                    const penalty = Math.max(1, Math.floor(dlvl / 2));
                    target.addEffect({ type: 'slow_ray', damageBonus: -penalty, defenseBonus: -penalty, rounds: 2 });
                    this._addLog(`\u{1F40C} Beholder: Slow Ray hits ${target.name}! (-${penalty} melee & defense for 2 rounds)`);
                }
            }

        // ── Dragon: 50% AoE breath / 50% 2 claws + bite ─────────────────
        } else if (typeDef.isDragonAI) {
            const dmin = MONSTER_MELEE_DAMAGE_MIN + MONSTER_DAMAGE_PER_LEVEL * lvlBoost + MONSTER_DAMAGE_BONUS_PER_LEVEL * lvlThreeBonus;
            const dmax = MONSTER_MELEE_DAMAGE_MAX + MONSTER_DAMAGE_PER_LEVEL * lvlBoost + MONSTER_DAMAGE_BONUS_PER_LEVEL * lvlThreeBonus;
            const bType = typeDef.dragonBreathType || 'fire';
            if (Math.random() < 0.50 && this._enemyCanAttemptManaAttack(e)) {
                // Breath weapon AoE
                this._spendEnemyMana(e);
                const breathIcons = { fire: '\u{1F525}', acid: '\u{1F7E2}', lightning: '⚡', poison: '\u{1F922}', cold: '\u{1F9CA}' };
                const icon = breathIcons[bType] || '\u{1F525}';
                let dmg = randomInt(dmin, dmax);
                dmg = Math.max(1, Math.round(dmg * MONSTER_DAMAGE_MULTIPLIER));
                dmg = this._applyDragonBreathLevelBonus(dmg, e);
                dmg = Math.max(1, dmg + this._getEnemyDamageMod(e, 'magic'));
                const breathVerbs = { fire: 'fire', acid: 'acid', lightning: 'lightning', cold: 'frost', poison: 'poison' };
                const breathVerb = breathVerbs[bType] || bType;
                this._addLog(`${icon} ${eName} exhales a ${breathVerb} breath weapon — the whole party is engulfed!`);
                const targets = this.aliveParty.slice();
                const hitOpts = { aoe: true, dragonBreath: bType };
                for (const t of targets) {
                    this._applyEnemyHit(e, t, dmg, 'magic', hitOpts);
                    if (this.aliveParty.length === 0) break;
                }
            } else {
                // 2 claw attacks + 1 bite
                const attacks = [
                    { label: 'claw', times: 2 },
                    { label: 'bite', times: 1 },
                ];
                for (const atk of attacks) {
                    for (let ai = 0; ai < atk.times; ai++) {
                        if (this.aliveFront.length === 0 && this.aliveBack.length === 0) break;
                        const frontNow = this.aliveFront;
                        const tgt = frontNow.length > 0 ? frontNow[Math.floor(Math.random() * frontNow.length)] : this.aliveParty[0];
                        if (!tgt) break;
                        if (!this._enemyCanAttemptStaminaAttack(e)) break;
                        this._spendEnemyStamina(e);
                        let dmg = randomInt(dmin, dmax);
                        dmg = Math.max(1, Math.round(dmg * MONSTER_DAMAGE_MULTIPLIER));
                        dmg = Math.max(1, dmg + this._getEnemyDamageMod(e));
                        this._addLog(`\u{1F409} ${eName} ${atk.label}s ${tgt.name} for ${dmg}!`);
                        this._applyEnemyHit(e, tgt, dmg, 'melee');
                    }
                }
            }

        // ── Ettin: attacks twice (one per head) ──────────────────────────
        } else if (typeDef.isEttinAI) {
            const dmin = MONSTER_MELEE_DAMAGE_MIN + MONSTER_DAMAGE_PER_LEVEL * lvlBoost + MONSTER_DAMAGE_BONUS_PER_LEVEL * lvlThreeBonus;
            const dmax = MONSTER_MELEE_DAMAGE_MAX + MONSTER_DAMAGE_PER_LEVEL * lvlBoost + MONSTER_DAMAGE_BONUS_PER_LEVEL * lvlThreeBonus;
            this._addLog(`\u{1F9CC} ${eName} swings both clubs with its two heads!`);
            for (let hi = 0; hi < 2; hi++) {
                if (this.aliveFront.length === 0) break;
                const target = this.aliveFront[Math.floor(Math.random() * this.aliveFront.length)];
                if (!this._enemyCanAttemptStaminaAttack(e)) break;
                this._spendEnemyStamina(e);
                let dmg = randomInt(dmin, dmax);
                dmg = Math.max(1, Math.round(dmg * MONSTER_DAMAGE_MULTIPLIER));
                dmg = Math.max(1, dmg + this._getEnemyDamageMod(e));
                this._applyEnemyHit(e, target, dmg, 'melee');
            }

        // ── Fire Giant: melee+10, 2 attacks, fire DoT ────────────────────
        } else if (typeDef.isFireGiantAI) {
            const bonus = 10;
            const dmin = MONSTER_MELEE_DAMAGE_MIN + bonus + MONSTER_DAMAGE_PER_LEVEL * lvlBoost + MONSTER_DAMAGE_BONUS_PER_LEVEL * lvlThreeBonus;
            const dmax = MONSTER_MELEE_DAMAGE_MAX + bonus + MONSTER_DAMAGE_PER_LEVEL * lvlBoost + MONSTER_DAMAGE_BONUS_PER_LEVEL * lvlThreeBonus;
            this._addLog(`\u{1F525} ${eName} hammers with blazing strikes!`);
            for (let hi = 0; hi < 2; hi++) {
                if (this.aliveFront.length === 0) break;
                const target = this.aliveFront[Math.floor(Math.random() * this.aliveFront.length)];
                if (!this._enemyCanAttemptStaminaAttack(e)) break;
                this._spendEnemyStamina(e);
                let dmg = randomInt(dmin, dmax);
                dmg = Math.max(1, Math.round(dmg * MONSTER_DAMAGE_MULTIPLIER));
                dmg = Math.max(1, dmg + this._getEnemyDamageMod(e));
                this._applyEnemyHit(e, target, dmg, 'melee', { fireBurn: true });
            }

        // ── Ice Giant: melee+10, 2 attacks, ice DoT ──────────────────────
        } else if (typeDef.isIceGiantAI) {
            const bonus = 10;
            const dmin = MONSTER_MELEE_DAMAGE_MIN + bonus + MONSTER_DAMAGE_PER_LEVEL * lvlBoost + MONSTER_DAMAGE_BONUS_PER_LEVEL * lvlThreeBonus;
            const dmax = MONSTER_MELEE_DAMAGE_MAX + bonus + MONSTER_DAMAGE_PER_LEVEL * lvlBoost + MONSTER_DAMAGE_BONUS_PER_LEVEL * lvlThreeBonus;
            this._addLog(`\u{1F9CA} ${eName} pounds with glacial force!`);
            for (let hi = 0; hi < 2; hi++) {
                if (this.aliveFront.length === 0) break;
                const target = this.aliveFront[Math.floor(Math.random() * this.aliveFront.length)];
                if (!this._enemyCanAttemptStaminaAttack(e)) break;
                this._spendEnemyStamina(e);
                let dmg = randomInt(dmin, dmax);
                dmg = Math.max(1, Math.round(dmg * MONSTER_DAMAGE_MULTIPLIER));
                dmg = Math.max(1, dmg + this._getEnemyDamageMod(e));
                const dealt = Math.max(1, dmg - target.getArmorBlocking() - target.getTotalDefense());
                const _hit = this._applyEnemyHit(e, target, dmg, 'ranged');
                // Ice DoT: 50% of damage dealt
                if (_hit && _hit.health > 0 && !this._isImmuneTo(_hit, 'cold')) {
                    const iceTick = Math.max(1, Math.floor(dealt * 0.5));
                    _hit.addEffect({ type: 'ice_chill', damageBonus: -2, rounds: 2 });
                    _hit.health = Math.max(0, _hit.health - iceTick);
                    this._addLog(`\u{1F9CA} ${_hit.name} is chilled by the icy blow! (${iceTick} cold DoT)`);
                }
            }

        // ── Stone Giant: ranged+10, throws boulders twice ────────────────
        } else if (typeDef.isStoneGiantAI) {
            const bonus = 10;
            const dmin = MONSTER_MELEE_DAMAGE_MIN + bonus + MONSTER_DAMAGE_PER_LEVEL * lvlBoost + MONSTER_DAMAGE_BONUS_PER_LEVEL * lvlThreeBonus;
            const dmax = MONSTER_MELEE_DAMAGE_MAX + bonus + MONSTER_DAMAGE_PER_LEVEL * lvlBoost + MONSTER_DAMAGE_BONUS_PER_LEVEL * lvlThreeBonus;
            this._addLog(`\u{1FAA8} ${eName} hurls massive boulders!`);
            const anyAlive = this.aliveParty;
            for (let hi = 0; hi < 2; hi++) {
                if (anyAlive.length === 0) break;
                const target = anyAlive[Math.floor(Math.random() * anyAlive.length)];
                if (!this._enemyCanAttemptStaminaAttack(e)) break;
                this._spendEnemyStamina(e);
                let dmg = randomInt(dmin, dmax);
                dmg = Math.max(1, Math.round(dmg * MONSTER_DAMAGE_MULTIPLIER));
                dmg = Math.max(1, dmg + this._getEnemyDamageMod(e));
                this._applyEnemyHit(e, target, dmg, 'melee');
            }

        // ── Storm Giant: lightning bolt hits 3 random back row ───────────
        } else if (typeDef.isStormGiantAI && this._enemyCanAttemptManaAttack(e)) {
            this._spendEnemyMana(e);
            const bonus = 10;
            const dmin = MONSTER_MAGIC_DAMAGE_MIN + bonus + MONSTER_DAMAGE_PER_LEVEL * lvlBoost + MONSTER_DAMAGE_BONUS_PER_LEVEL * lvlThreeBonus;
            const dmax = MONSTER_MAGIC_DAMAGE_MAX + bonus + MONSTER_DAMAGE_PER_LEVEL * lvlBoost + MONSTER_DAMAGE_BONUS_PER_LEVEL * lvlThreeBonus;
            this._addLog(`⚡ ${eName} calls down lightning on the party!`);
            const anyAlive = this.aliveParty.slice();
            const targets = [];
            for (let ti = 0; ti < 3; ti++) {
                if (anyAlive.length > 0) targets.push(anyAlive[Math.floor(Math.random() * anyAlive.length)]);
            }
            for (const target of targets) {
                if (this.aliveParty.length === 0) break;
                let dmg = randomInt(dmin, dmax);
                dmg = Math.max(1, Math.round(dmg * MONSTER_DAMAGE_MULTIPLIER));
                dmg = Math.max(1, dmg + this._getEnemyDamageMod(e, 'magic'));
                const _hit = this._applyEnemyHit(e, target, dmg, 'magic');
                // 25% stun per bolt
                if (_hit && _hit.health > 0 && Math.random() < 0.25) {
                    if (this._tryApplyStun(_hit)) {
                        this._addLog(`⚡ ${_hit.name} is stunned by the lightning!`);
                    }
                }
            }

        // ── Medusa: 3 poison arrows + 50% petrify attempt ────────────────
        } else if (typeDef.isMedusaAI) {
            const dmin = MONSTER_MELEE_DAMAGE_MIN + MONSTER_DAMAGE_PER_LEVEL * lvlBoost + MONSTER_DAMAGE_BONUS_PER_LEVEL * lvlThreeBonus;
            const dmax = MONSTER_MELEE_DAMAGE_MAX + MONSTER_DAMAGE_PER_LEVEL * lvlBoost + MONSTER_DAMAGE_BONUS_PER_LEVEL * lvlThreeBonus;
            this._addLog(`\u{1F3F9} ${eName} looses a volley of envenomed arrows!`);
            const anyAlive = this.aliveParty;
            for (let ai = 0; ai < 3 && anyAlive.length > 0; ai++) {
                const target = anyAlive[Math.floor(Math.random() * anyAlive.length)];
                if (!this._enemyCanAttemptStaminaAttack(e)) break;
                this._spendEnemyStamina(e);
                let dmg = randomInt(dmin, dmax);
                dmg = Math.max(1, Math.round(dmg * MONSTER_DAMAGE_MULTIPLIER));
                dmg = Math.max(1, dmg + this._getEnemyDamageMod(e));
                const _hit = this._applyEnemyHit(e, target, dmg, 'ranged', { poisonChance: 0.40 });
                if (_hit && _hit.health > 0 && Math.random() < 0.40) {
                    if (this._isPoisonImmunePartyMember(_hit)) {
                        this._addLog(`🟢 ${_hit.name} is immune to Medusa's poison!`);
                    } else {
                        const perTick = Math.max(1, Math.floor(dmg * 0.33));
                        _hit.addEffect({ type: 'poison', rounds: 3, damage: perTick });
                        this._addLog(`\u{1F7E2} ${_hit.name} is poisoned by Medusa's arrow!`);
                    }
                }
            }
            // Petrify attempt — incorporeal/construct/undead immune
            if (Math.random() < 0.50 && anyAlive.length > 0) {
                const frontRow = this.aliveFront;
                const petrifyTarget = frontRow.length > 0 ? frontRow[Math.floor(Math.random() * frontRow.length)] : anyAlive[Math.floor(Math.random() * anyAlive.length)];
                if (this._isPetrifyImmunePartyMember(petrifyTarget)) {
                    this._addLog(`\u{1FAA8} ${eName} tries to meet ${petrifyTarget.name}'s gaze — immune to petrification!`);
                } else if (Math.random() < 0.50) {
                    this._tryApplyStun(petrifyTarget);
                    petrifyTarget.webbedRounds = Math.max(petrifyTarget.webbedRounds || 0, 3);
                    petrifyTarget.addEffect({ type: 'petrified', defenseBonus: 200, rounds: 3 });
                    this._addLog(`\u{1FAA8} ${eName} meets ${petrifyTarget.name}'s gaze — PETRIFIED! (3 rounds, +200 def)`);
                } else {
                    this._addLog(`\u{1FAA8} ${eName} attempts to petrify ${petrifyTarget.name}, but they avert their eyes!`);
                }
            }

        // ── Stirge / Vampire Bat: blood drain on damaging hit; bleed-immune targets cannot be drained ──
        } else if (typeDef.isStirgeAI || typeDef.isVampireBatAI) {
            const target = this.aliveParty[Math.floor(Math.random() * this.aliveParty.length)];
            if (target && this._enemyCanAttemptStaminaAttack(e)) {
                this._spendEnemyStamina(e);
                const dmin = MONSTER_MELEE_DAMAGE_MIN + MONSTER_DAMAGE_PER_LEVEL * lvlBoost + MONSTER_DAMAGE_BONUS_PER_LEVEL * lvlThreeBonus;
                const dmax = MONSTER_MELEE_DAMAGE_MAX + MONSTER_DAMAGE_PER_LEVEL * lvlBoost + MONSTER_DAMAGE_BONUS_PER_LEVEL * lvlThreeBonus;
                let dmg = randomInt(dmin, dmax);
                dmg = Math.max(1, Math.round(dmg * MONSTER_DAMAGE_MULTIPLIER));
                dmg = Math.max(1, dmg + this._getEnemyDamageMod(e));
                const beforeHp = new Map(this.aliveParty.map(p => [p, p.health]));
                const drainName = typeDef.isVampireBatAI ? 'sinks its fangs into' : 'latches onto';
                this._addLog(`\u{1F987} ${eName} ${drainName} ${target.name} and drinks deep!`);
                const _hit = this._applyEnemyHit(e, target, dmg, 'melee');
                if (_hit) {
                    const dealt = Math.max(0, (beforeHp.get(_hit) ?? _hit.health) - _hit.health);
                    if (dealt > 0) {
                        if (this._isFractureImmunePartyMember(_hit)) {
                            this._addLog(`\u{1F987} ${_hit.name} cannot be blood-drained!`);
                        } else {
                            const before = e.health;
                            e.health = Math.min(e.maxHealth, e.health + dealt);
                            const healed = e.health - before;
                            if (healed > 0) this._addLog(`\u{1F987} ${eName} drains ${healed} HP from ${_hit.name}!`);
                        }
                    }
                }
            }

        // ── Hydra: attacks with each head, regen already handled by regenPercent ──
        } else if (typeDef.isHydraAI) {
            const dmin = MONSTER_MELEE_DAMAGE_MIN + MONSTER_DAMAGE_PER_LEVEL * lvlBoost + MONSTER_DAMAGE_BONUS_PER_LEVEL * lvlThreeBonus;
            const dmax = MONSTER_MELEE_DAMAGE_MAX + MONSTER_DAMAGE_PER_LEVEL * lvlBoost + MONSTER_DAMAGE_BONUS_PER_LEVEL * lvlThreeBonus;
            const headCount = 6 + Math.floor(dlvl / 5);
            this._addLog(`\u{1F40D} ${eName} attacks with ${headCount} heads!`);
            for (let hi = 0; hi < headCount && this.aliveParty.length > 0; hi++) {
                const anyAlive = this.aliveParty;
                const target = anyAlive[Math.floor(Math.random() * anyAlive.length)];
                if (!this._enemyCanAttemptStaminaAttack(e)) { e.stamina = Math.min(e.maxStamina || 30, e.stamina + 2); continue; }
                this._spendEnemyStamina(e);
                let dmg = randomInt(dmin, dmax);
                dmg = Math.max(1, Math.round(dmg * MONSTER_DAMAGE_MULTIPLIER));
                dmg = Math.max(1, dmg + this._getEnemyDamageMod(e));
                this._applyEnemyHit(e, target, dmg, 'melee');
            }

        // ── Manticore: 5 ranged attacks, poison tail DoT ─────────────────
        } else if (typeDef.isManticoreAI) {
            const bonus = 3;
            const dmin = MONSTER_MELEE_DAMAGE_MIN + bonus + MONSTER_DAMAGE_PER_LEVEL * lvlBoost + MONSTER_DAMAGE_BONUS_PER_LEVEL * lvlThreeBonus;
            const dmax = MONSTER_MELEE_DAMAGE_MAX + bonus + MONSTER_DAMAGE_PER_LEVEL * lvlBoost + MONSTER_DAMAGE_BONUS_PER_LEVEL * lvlThreeBonus;
            this._addLog(`\u{1F981} ${eName} launches a volley of venomous spikes!`);
            const anyAlive = this.aliveParty;
            for (let ai = 0; ai < 5 && anyAlive.length > 0; ai++) {
                const target = anyAlive[Math.floor(Math.random() * anyAlive.length)];
                if (!this._enemyCanAttemptStaminaAttack(e)) break;
                this._spendEnemyStamina(e);
                let dmg = randomInt(dmin, dmax);
                dmg = Math.max(1, Math.round(dmg * MONSTER_DAMAGE_MULTIPLIER));
                dmg = Math.max(1, dmg + this._getEnemyDamageMod(e));
                const dealt = Math.max(1, dmg - target.getArmorBlocking() - target.getTotalDefense());
                const _hit = this._applyEnemyHit(e, target, dmg, 'melee');
                // Poison tail: DoT = damage dealt
                if (_hit && _hit.health > 0) {
                    if (this._isPoisonImmunePartyMember(_hit)) {
                        this._addLog(`🟢 ${_hit.name} is immune to the manticore's venom!`);
                    } else {
                        _hit.addEffect({ type: 'poison', rounds: 3, damage: Math.max(1, Math.floor(dealt / 3)) });
                        this._addLog(`\u{1F7E2} ${_hit.name} is stung by the manticore's poisonous tail spike!`);
                    }
                }
            }

        // ── Evil Priest: mass heal or AoE magic ──────────────────────────
        } else if (typeDef.isEvilPriestAI) {
            const dmin = MONSTER_MAGIC_DAMAGE_MIN + MONSTER_DAMAGE_PER_LEVEL * lvlBoost + MONSTER_DAMAGE_BONUS_PER_LEVEL * lvlThreeBonus;
            const dmax = MONSTER_MAGIC_DAMAGE_MAX + MONSTER_DAMAGE_PER_LEVEL * lvlBoost + MONSTER_DAMAGE_BONUS_PER_LEVEL * lvlThreeBonus;
            if (Math.random() < 0.50) {
                // Mass heal all living non-undead enemies
                const healPct = 0.15;
                this._addLog(`\u{1F4FF} ${eName} invokes dark blessing — enemies are healed!`);
                for (const ally of this.enemies) {
                    if (ally.health <= 0) continue;
                    const def = ENEMY_TYPES[ally.type] || {};
                    if ((def.tags || []).includes('undead')) continue;
                    const baseHeal = Math.max(1, Math.floor(ally.maxHealth * healPct));
                    const rotMult = this._getMummyRotHealMultiplier(ally);
                    if (rotMult <= 0) {
                        this._addLog(`🟤 ${this._eName(ally)} cannot be healed while afflicted by Mummy Rot!`);
                        continue;
                    }
                    const healAmt = Math.max(1, Math.floor(baseHeal * rotMult));
                    const before = ally.health;
                    ally.health = Math.min(ally.maxHealth, ally.health + healAmt);
                    if (ally.health > before) {
                        this._addLog(`\u{1F4AB} ${ally.name || ally.type} is healed for ${ally.health - before} HP!`);
                    }
                }
            } else if (this._enemyCanAttemptManaAttack(e)) {
                this._spendEnemyMana(e);
                let dmg = randomInt(dmin, dmax);
                dmg = Math.max(1, Math.round(dmg * MONSTER_DAMAGE_MULTIPLIER));
                dmg = Math.max(1, dmg + this._getEnemyDamageMod(e, 'magic'));
                this._addLog(`\u{1F52E} ${eName} channels dark power — a wave of unholy energy hits the party!`);
                for (const target of this.aliveParty.slice()) {
                    this._applyEnemyHit(e, target, dmg, 'magic', { aoe: true });
                    if (this.aliveParty.length === 0) break;
                }
            }

        // ── Werewolf: regen handled by rse if (typeDef.isWerewolfAI) {
            // Werewolf regen is handled by regenPercent:0.25 in _tickEnemyEffects.
            // In combat it does a powerful standard melee attack.
            const target = this.aliveFront.length > 0 ? this.aliveFront[Math.floor(Math.random() * this.aliveFront.length)] : null;
            if (target && this._enemyCanAttemptStaminaAttack(e)) {
                this._spendEnemyStamina(e);
                const dmin = MONSTER_MELEE_DAMAGE_MIN + MONSTER_DAMAGE_PER_LEVEL * lvlBoost + MONSTER_DAMAGE_BONUS_PER_LEVEL * lvlThreeBonus;
                const dmax = MONSTER_MELEE_DAMAGE_MAX + MONSTER_DAMAGE_PER_LEVEL * lvlBoost + MONSTER_DAMAGE_BONUS_PER_LEVEL * lvlThreeBonus;
                let dmg = randomInt(dmin, dmax);
                dmg = Math.max(1, Math.round(dmg * MONSTER_DAMAGE_MULTIPLIER));
                dmg = Math.max(1, dmg + this._getEnemyDamageMod(e));
                this._addLog(`\u{1F43A} ${eName} lunges with savage fury at ${target.name}!`);
                this._applyEnemyHit(e, target, dmg, 'melee');
            }

        // ── Yeti: two fist attacks + stun + ice DoT ──────────────────────
        } else if (typeDef.isYetiAI) {
            const dmin = MONSTER_MELEE_DAMAGE_MIN + MONSTER_DAMAGE_PER_LEVEL * lvlBoost + MONSTER_DAMAGE_BONUS_PER_LEVEL * lvlThreeBonus;
            const dmax = MONSTER_MELEE_DAMAGE_MAX + MONSTER_DAMAGE_PER_LEVEL * lvlBoost + MONSTER_DAMAGE_BONUS_PER_LEVEL * lvlThreeBonus;
            this._addLog(`☃️ ${eName} slams with both fists!`);
            for (let hi = 0; hi < 2; hi++) {
                if (this.aliveFront.length === 0) break;
                const target = this.aliveFront[Math.floor(Math.random() * this.aliveFront.length)];
                if (!this._enemyCanAttemptStaminaAttack(e)) break;
                this._spendEnemyStamina(e);
                let dmg = randomInt(dmin, dmax);
                dmg = Math.max(1, Math.round(dmg * MONSTER_DAMAGE_MULTIPLIER));
                dmg = Math.max(1, dmg + this._getEnemyDamageMod(e));
                const dealt = Math.max(1, dmg - target.getArmorBlocking() - target.getTotalDefense());
                const _hit = this._applyEnemyHit(e, target, dmg, 'melee');
                // Ice DoT on each hit
                if (_hit && _hit.health > 0 && !this._isImmuneTo(_hit, 'cold')) {
                    const iceTick = Math.max(1, Math.floor(dealt * 0.33));
                    _hit.health = Math.max(0, _hit.health - iceTick);
                    _hit.addEffect({ type: 'ice_chill', damageBonus: -2, rounds: 2 });
                    this._addLog(`\u{1F9CA} ${_hit.name} is frozen by the yeti's icy fists! (${iceTick} cold)`);
                }
            }

        // ── Ice Demon: 4 melee strikes with ice DoT ──────────────────────
        } else if (typeDef.isIceDemonAI) {
            const bonus = 5;
            const dmin = MONSTER_MELEE_DAMAGE_MIN + bonus + MONSTER_DAMAGE_PER_LEVEL * lvlBoost + MONSTER_DAMAGE_BONUS_PER_LEVEL * lvlThreeBonus;
            const dmax = MONSTER_MELEE_DAMAGE_MAX + bonus + MONSTER_DAMAGE_PER_LEVEL * lvlBoost + MONSTER_DAMAGE_BONUS_PER_LEVEL * lvlThreeBonus;
            this._addLog(`❄️ ${eName} strikes with razor-sharp ice claws!`);
            for (let hi = 0; hi < 4; hi++) {
                if (this.aliveFront.length === 0) break;
                const target = this.aliveFront[Math.floor(Math.random() * this.aliveFront.length)];
                if (!this._enemyCanAttemptStaminaAttack(e)) break;
                this._spendEnemyStamina(e);
                let dmg = randomInt(dmin, dmax);
                dmg = Math.max(1, Math.round(dmg * MONSTER_DAMAGE_MULTIPLIER));
                dmg = Math.max(1, dmg + this._getEnemyDamageMod(e));
                const preDef = Math.max(1, dmg - target.getArmorBlocking() - target.getTotalDefense());
                const _hit = this._applyEnemyHit(e, target, dmg, 'melee');
                if (_hit && _hit.health > 0 && !this._isImmuneTo(_hit, 'cold')) {
                    const iceTick = Math.max(1, Math.floor(preDef * 0.30));
                    _hit.addEffect({ type: 'ice_chill', damageBonus: -2, rounds: 2 });
                    _hit.health = Math.max(0, _hit.health - iceTick);
                    this._addLog(`❄️ ${_hit.name} is chilled by infernal frost! (${iceTick} cold, -2 dmg 2 rds)`);
                }
            }

        // ── Acid Demon: AoE acid blast + DoT, summons acid slimes ────────
        } else if (typeDef.isAcidDemonAI) {
            const dmin = MONSTER_MELEE_DAMAGE_MIN + MONSTER_DAMAGE_PER_LEVEL * lvlBoost + MONSTER_DAMAGE_BONUS_PER_LEVEL * lvlThreeBonus;
            const dmax = MONSTER_MELEE_DAMAGE_MAX + MONSTER_DAMAGE_PER_LEVEL * lvlBoost + MONSTER_DAMAGE_BONUS_PER_LEVEL * lvlThreeBonus;
            if (this._enemyCanAttemptManaAttack(e)) {
                this._spendEnemyMana(e);
                let dmg = randomInt(dmin, dmax);
                dmg = Math.max(1, Math.round(dmg * MONSTER_DAMAGE_MULTIPLIER));
                dmg = Math.max(1, dmg + this._getEnemyDamageMod(e, 'magic'));
                this._addLog(`\u{1F7E2} ${eName} spews a wave of corrosive acid!`);
                for (const target of this.aliveParty.slice()) {
                    const _hit = this._applyEnemyHit(e, target, dmg, 'magic', { aoe: true });
                    if (_hit && _hit.health > 0) {
                        const acidTick = Math.max(1, Math.floor(dmg * 0.25));
                        _hit.addEffect({ type: 'acid_dot', rounds: 3, damage: acidTick, defenseBonus: -2 });
                        this._addLog(`\u{1F7E2} ${_hit.name} is corroded! (${acidTick}/rd, -2 def 3 rds)`);
                    }
                    if (this.aliveParty.length === 0) break;
                }
            } else if (this.aliveFront.length > 0 && this._enemyCanAttemptStaminaAttack(e)) {
                this._spendEnemyStamina(e);
                const target = this.aliveFront[Math.floor(Math.random() * this.aliveFront.length)];
                let dmg = randomInt(dmin, dmax);
                dmg = Math.max(1, Math.round(dmg * MONSTER_DAMAGE_MULTIPLIER));
                dmg = Math.max(1, dmg + this._getEnemyDamageMod(e));
                this._applyEnemyHit(e, target, dmg, 'melee');
            }
            if (Math.random() < 0.50 && this.aliveParty.length > 0) {
                this._summonEnemyMinion(e, 'acid_slime', '\u{1F7E2}');
            }

        // ── Grey Ooze: corrosive pseudopod, mild dissolve + occasional engulf ─
        } else if (typeDef.isGreyOozeAI) {
            const dmin = MONSTER_MELEE_DAMAGE_MIN + MONSTER_DAMAGE_PER_LEVEL * lvlBoost + MONSTER_DAMAGE_BONUS_PER_LEVEL * lvlThreeBonus;
            const dmax = MONSTER_MELEE_DAMAGE_MAX + MONSTER_DAMAGE_PER_LEVEL * lvlBoost + MONSTER_DAMAGE_BONUS_PER_LEVEL * lvlThreeBonus;
            const pseudopodAttacks = 3;
            this._addLog(`\u{1F9EA} ${eName} surges forward with ${pseudopodAttacks} corrosive pseudopod strikes!`);
            for (let ai = 0; ai < pseudopodAttacks && this.aliveParty.length > 0; ai++) {
                const target = this.aliveFront.length > 0
                    ? this.aliveFront[Math.floor(Math.random() * this.aliveFront.length)]
                    : this.aliveParty[Math.floor(Math.random() * this.aliveParty.length)];
                if (!target || !this._enemyCanAttemptStaminaAttack(e)) break;
                this._spendEnemyStamina(e);
                let dmg = randomInt(dmin, dmax);
                dmg = Math.max(1, Math.round(dmg * MONSTER_DAMAGE_MULTIPLIER));
                dmg = Math.max(1, dmg + this._getEnemyDamageMod(e));
                const _hit = this._applyEnemyHit(e, target, dmg, 'melee');
                if (_hit && _hit.health > 0) {
                    const acidTick = Math.max(1, Math.floor(dmg * 0.25));
                    _hit.addEffect({ type: 'acid_dot', rounds: 2, damage: acidTick, defenseBonus: -1 });
                    this._addLog(`\u{1F7E2} ${_hit.name}'s armor sizzles! (${acidTick}/rd, -1 def for 2 rds)`);
                    if (Math.random() < 0.30 && !this._isHoldImmunePartyMember(_hit)) {
                        _hit.webbedRounds = Math.max(_hit.webbedRounds || 0, 1);
                        this._addLog(`\u{1F9B7} ${_hit.name} is partially engulfed by the ooze!`);
                    }
                }
            }

        // ── Black Pudding: front-line acid sweep + split chance ─────────────
        } else if (typeDef.isBlackPuddingAI) {
            const dmin = MONSTER_MELEE_DAMAGE_MIN + MONSTER_DAMAGE_PER_LEVEL * lvlBoost + MONSTER_DAMAGE_BONUS_PER_LEVEL * lvlThreeBonus;
            const dmax = MONSTER_MELEE_DAMAGE_MAX + MONSTER_DAMAGE_PER_LEVEL * lvlBoost + MONSTER_DAMAGE_BONUS_PER_LEVEL * lvlThreeBonus;
            const targets = this.aliveFront.length > 0 ? this.aliveFront.slice() : this.aliveParty.slice();
            if (targets.length > 0 && this._enemyCanAttemptStaminaAttack(e)) {
                this._spendEnemyStamina(e);
                let dmg = randomInt(dmin, dmax);
                dmg = Math.max(1, Math.round(dmg * MONSTER_DAMAGE_MULTIPLIER));
                dmg = Math.max(1, dmg + this._getEnemyDamageMod(e));
                this._addLog(`\u{1F9EA} ${eName} surges forward, splashing caustic sludge in a wide arc!`);
                for (const t of targets) {
                    const _hit = this._applyEnemyHit(e, t, dmg, 'melee', { aoe: true });
                    if (_hit && _hit.health > 0) {
                        const acidTick = Math.max(1, Math.floor(dmg * 0.33));
                        _hit.addEffect({ type: 'acid_dot', rounds: 3, damage: acidTick, defenseBonus: -2 });
                        this._addLog(`\u{1F7E2} ${_hit.name} is dissolving in black slime! (${acidTick}/rd, -2 def 3 rds)`);
                    }
                    if (this.aliveParty.length === 0) break;
                }
            }
            if (Math.random() < 0.35 && this.aliveParty.length > 0) {
                this._summonEnemyMinion(e, 'grey_ooze', '\u{1F9EA}');
            }

        // ── Ochre Jelly: adhesive lashes that can lock targets in place ──────
        } else if (typeDef.isOchreJellyAI) {
            const dmin = MONSTER_MELEE_DAMAGE_MIN + MONSTER_DAMAGE_PER_LEVEL * lvlBoost + MONSTER_DAMAGE_BONUS_PER_LEVEL * lvlThreeBonus;
            const dmax = MONSTER_MELEE_DAMAGE_MAX + MONSTER_DAMAGE_PER_LEVEL * lvlBoost + MONSTER_DAMAGE_BONUS_PER_LEVEL * lvlThreeBonus;
            const attacks = 2;
            this._addLog(`\u{1F7E1} ${eName} whips out adhesive tendrils!`);
            for (let i = 0; i < attacks && this.aliveParty.length > 0; i++) {
                const target = this.aliveParty[Math.floor(Math.random() * this.aliveParty.length)];
                if (!target || !this._enemyCanAttemptStaminaAttack(e)) break;
                this._spendEnemyStamina(e);
                let dmg = randomInt(dmin, dmax);
                dmg = Math.max(1, Math.round(dmg * MONSTER_DAMAGE_MULTIPLIER));
                dmg = Math.max(1, dmg + this._getEnemyDamageMod(e));
                const _hit = this._applyEnemyHit(e, target, dmg, 'ranged');
                if (_hit && _hit.health > 0) {
                    const acidTick = Math.max(1, Math.floor(dmg * 0.20));
                    _hit.addEffect({ type: 'acid_dot', rounds: 2, damage: acidTick, defenseBonus: -1 });
                    if (Math.random() < 0.40 && !this._isHoldImmunePartyMember(_hit)) {
                        _hit.webbedRounds = Math.max(_hit.webbedRounds || 0, 2);
                        this._addLog(`\u{1F9B7} ${_hit.name} is glued in place by sticky jelly! (2 rds)`);
                    }
                }
            }

        // ── Bloat Demon: 6 ranged toxin blasts, each inflicts poison DoT ──
        } else if (typeDef.isBloatDemonAI) {
            const dmin = MONSTER_MELEE_DAMAGE_MIN + MONSTER_DAMAGE_PER_LEVEL * lvlBoost + MONSTER_DAMAGE_BONUS_PER_LEVEL * lvlThreeBonus;
            const dmax = MONSTER_MELEE_DAMAGE_MAX + MONSTER_DAMAGE_PER_LEVEL * lvlBoost + MONSTER_DAMAGE_BONUS_PER_LEVEL * lvlThreeBonus;
            this._addLog(`\u{1F922} ${eName} erupts with a volley of toxic bile blasts!`);
            const anyAlive = this.aliveParty;
            for (let ai = 0; ai < 6 && anyAlive.length > 0; ai++) {
                const target = anyAlive[Math.floor(Math.random() * anyAlive.length)];
                if (!this._enemyCanAttemptStaminaAttack(e)) break;
                this._spendEnemyStamina(e);
                let dmg = randomInt(dmin, dmax);
                dmg = Math.max(1, Math.round(dmg * MONSTER_DAMAGE_MULTIPLIER));
                dmg = Math.max(1, dmg + this._getEnemyDamageMod(e));
                const _hit = this._applyEnemyHit(e, target, dmg, 'ranged');
                if (_hit && _hit.health > 0) {
                    if (this._isPoisonImmunePartyMember(_hit)) {
                        this._addLog(`🟢 ${_hit.name} is immune to the foul bile!`);
                    } else {
                        const perTick = Math.max(1, Math.floor(dmg * 0.33));
                        _hit.addEffect({ type: 'poison', rounds: POISON_DURATION_ROUNDS, damage: perTick });
                        this._addLog(`\u{1F7E2} ${_hit.name} is poisoned by foul bile! (${perTick}/rd ${POISON_DURATION_ROUNDS} rds)`);
                    }
                }
            }

        // ── Dracolich: random breath (50%) or 2 claws + bite; undead dragon ──
        } else if (typeDef.isDracolichAI) {
            const breathTypes = ['fire', 'acid', 'lightning', 'cold', 'poison'];
            const bType = breathTypes[Math.floor(Math.random() * breathTypes.length)];
            const dmin = MONSTER_MELEE_DAMAGE_MIN + MONSTER_DAMAGE_PER_LEVEL * lvlBoost + MONSTER_DAMAGE_BONUS_PER_LEVEL * lvlThreeBonus;
            const dmax = MONSTER_MELEE_DAMAGE_MAX + MONSTER_DAMAGE_PER_LEVEL * lvlBoost + MONSTER_DAMAGE_BONUS_PER_LEVEL * lvlThreeBonus;
            if (Math.random() < 0.50 && this._enemyCanAttemptManaAttack(e)) {
                this._spendEnemyMana(e);
                const breathIcons = { fire: '\u{1F525}', acid: '\u{1F7E2}', lightning: '⚡', poison: '\u{1F922}', cold: '❄️' };
                const breathVerbs = { fire: 'necrotic fire', acid: 'corrosive acid', lightning: 'dark lightning', cold: 'deathly frost', poison: 'vile poison' };
                this._addLog(`${breathIcons[bType] || '\u{1F480}'} ${eName} exhales ${breathVerbs[bType] || 'dark breath'} from its skeletal maw!`);
                let dmg = randomInt(dmin, dmax);
                dmg = Math.max(1, Math.round(dmg * MONSTER_DAMAGE_MULTIPLIER));
                dmg = this._applyDragonBreathLevelBonus(dmg, e);
                dmg = Math.max(1, dmg + this._getEnemyDamageMod(e, 'magic'));
                for (const t of this.aliveParty.slice()) {
                    this._applyEnemyHit(e, t, dmg, 'magic', { aoe: true, dragonBreath: bType });
                    if (this.aliveParty.length === 0) break;
                }
            } else {
                this._addLog(`\u{1F480} ${eName} tears at the party with undead talons!`);
                const attacks = [{ label: 'claw', times: 2 }, { label: 'bite', times: 1 }];
                for (const atk of attacks) {
                    for (let ai = 0; ai < atk.times; ai++) {
                        if (this.aliveFront.length === 0 && this.aliveBack.length === 0) break;
                        const frontNow = this.aliveFront;
                        const tgt = frontNow.length > 0 ? frontNow[Math.floor(Math.random() * frontNow.length)] : this.aliveParty[0];
                        if (!tgt || !this._enemyCanAttemptStaminaAttack(e)) break;
                        this._spendEnemyStamina(e);
                        let dmg = randomInt(dmin, dmax);
                        dmg = Math.max(1, Math.round(dmg * MONSTER_DAMAGE_MULTIPLIER));
                        dmg = Math.max(1, dmg + this._getEnemyDamageMod(e));
                        this._applyEnemyHit(e, tgt, dmg, 'melee');
                    }
                }
            }

        // ── Evil Necromancer: 60% summon 1-3 undead, else AoE necrotic + poison DoT ──
        } else if (typeDef.isEvilNecromancerAI) {
            const undeadPool = ['skeleton', 'zombie', 'ghoul_pup', 'wight', 'bone_gnasher', 'shadow', 'wraith'];
            if (Math.random() < 0.60) {
                const count = 1 + Math.floor(Math.random() * 3);
                this._addLog(`\u{1F480} ${eName} raises skeletal hands and calls forth the dead!`);
                for (let si = 0; si < count; si++) {
                    const undeadType = undeadPool[Math.floor(Math.random() * undeadPool.length)];
                    this._summonEnemyMinion(e, undeadType, '\u{1F480}');
                }
            } else if (this._enemyCanAttemptManaAttack(e)) {
                this._spendEnemyMana(e);
                const dmin = MONSTER_MAGIC_DAMAGE_MIN + MONSTER_DAMAGE_PER_LEVEL * lvlBoost + MONSTER_DAMAGE_BONUS_PER_LEVEL * lvlThreeBonus;
                const dmax = MONSTER_MAGIC_DAMAGE_MAX + MONSTER_DAMAGE_PER_LEVEL * lvlBoost + MONSTER_DAMAGE_BONUS_PER_LEVEL * lvlThreeBonus;
                let dmg = randomInt(dmin, dmax);
                dmg = Math.max(1, Math.round(dmg * MONSTER_DAMAGE_MULTIPLIER));
                dmg = Math.max(1, dmg + this._getEnemyDamageMod(e, 'magic'));
                this._addLog(`\u{1F52E} ${eName} channels necrotic energy — a wave of death washes over the party!`);
                for (const target of this.aliveParty.slice()) {
                    const _hit = this._applyEnemyHit(e, target, dmg, 'magic', { aoe: true });
                    if (_hit && _hit.health > 0) {
                        if (this._isPoisonImmunePartyMember(_hit)) {
                            this._addLog(`🟢 ${_hit.name} is immune to necrotic rot!`);
                        } else {
                            const perTick = Math.max(1, Math.floor(dmg * 0.25));
                            _hit.addEffect({ type: 'poison', rounds: POISON_DURATION_ROUNDS, damage: perTick });
                            this._addLog(`\u{1F9DF} ${_hit.name} is afflicted with necrotic rot! (${perTick}/rd ${POISON_DURATION_ROUNDS} rds)`);
                        }
                    }
                    if (this.aliveParty.length === 0) break;
                }
            }

        // ── Hell Hound: 50% bite (melee + fire DoT) / 50% fire breath (front AoE) ──
        } else if (typeDef.isHellHoundAI) {
            const dmin = MONSTER_MELEE_DAMAGE_MIN + MONSTER_DAMAGE_PER_LEVEL * lvlBoost + MONSTER_DAMAGE_BONUS_PER_LEVEL * lvlThreeBonus;
            const dmax = MONSTER_MELEE_DAMAGE_MAX + MONSTER_DAMAGE_PER_LEVEL * lvlBoost + MONSTER_DAMAGE_BONUS_PER_LEVEL * lvlThreeBonus;
            const canBite = this.aliveFront.length > 0 && this._enemyCanAttemptStaminaAttack(e);
            const canBreathe = this._enemyCanAttemptManaAttack(e) && this.aliveFront.length > 0;
            if (canBite && (Math.random() < 0.50 || !canBreathe)) {
                const target = this.aliveFront[Math.floor(Math.random() * this.aliveFront.length)];
                this._spendEnemyStamina(e);
                let dmg = randomInt(dmin, dmax);
                dmg = Math.max(1, Math.round(dmg * MONSTER_DAMAGE_MULTIPLIER));
                dmg = Math.max(1, dmg + this._getEnemyDamageMod(e));
                this._addLog(`\u{1F525} ${eName} lunges with a burning bite at ${target.name}!`);
                const _hellBite = this._applyEnemyHit(e, target, dmg, 'melee');
                if (_hellBite && _hellBite.health > 0) {
                    const burnTick = Math.max(1, Math.floor(dmg * DRAKE_FIRE_BURN_FRACTION));
                    _hellBite.addEffect({ type: 'burn', rounds: DRAKE_FIRE_BURN_ROUNDS, damage: burnTick });
                    this._addLog(`\u{1F525} ${_hellBite.name} is set ablaze! (${burnTick}/rd ${DRAKE_FIRE_BURN_ROUNDS} rds)`);
                }
            } else if (canBreathe) {
                this._spendEnemyMana(e);
                let dmg = randomInt(dmin, dmax);
                dmg = Math.max(1, Math.round(dmg * MONSTER_DAMAGE_MULTIPLIER));
                dmg = Math.max(1, dmg + this._getEnemyDamageMod(e, 'magic'));
                this._addLog(`\u{1F525} ${eName} breathes a column of hellfire at the front line!`);
                for (const target of this.aliveFront.slice()) {
                    const _hit = this._applyEnemyHit(e, target, dmg, 'magic', { aoe: true });
                    if (_hit && _hit.health > 0) {
                        const burnTick = Math.max(1, Math.floor(dmg * DRAKE_FIRE_BURN_FRACTION));
                        _hit.addEffect({ type: 'burn', rounds: DRAKE_FIRE_BURN_ROUNDS, damage: burnTick });
                        this._addLog(`\u{1F525} ${_hit.name} is engulfed in hellfire! (${burnTick}/rd ${DRAKE_FIRE_BURN_ROUNDS} rds)`);
                    }
                    if (this.aliveParty.length === 0) break;
                }
            } else if (canBite) {
                const target = this.aliveFront[Math.floor(Math.random() * this.aliveFront.length)];
                this._spendEnemyStamina(e);
                let dmg = randomInt(dmin, dmax);
                dmg = Math.max(1, Math.round(dmg * MONSTER_DAMAGE_MULTIPLIER));
                dmg = Math.max(1, dmg + this._getEnemyDamageMod(e));
                this._applyEnemyHit(e, target, dmg, 'melee');
            }

        // ── Evil Berserker: level/5 melee strikes, resists physical damage ──
        } else if (typeDef.isEvilBerserkerAI) {
            const attackCount = Math.max(1, Math.floor(dlvl / 5));
            const bonus = 3;
            const dmin = MONSTER_MELEE_DAMAGE_MIN + bonus + MONSTER_DAMAGE_PER_LEVEL * lvlBoost + MONSTER_DAMAGE_BONUS_PER_LEVEL * lvlThreeBonus;
            const dmax = MONSTER_MELEE_DAMAGE_MAX + bonus + MONSTER_DAMAGE_PER_LEVEL * lvlBoost + MONSTER_DAMAGE_BONUS_PER_LEVEL * lvlThreeBonus;
            this._addLog(`⚔️ ${eName} charges into a berserk frenzy — ${attackCount} strikes!`);
            for (let ai = 0; ai < attackCount; ai++) {
                if (this.aliveFront.length === 0) break;
                const target = this.aliveFront[Math.floor(Math.random() * this.aliveFront.length)];
                if (!this._enemyCanAttemptStaminaAttack(e)) break;
                this._spendEnemyStamina(e);
                let dmg = randomInt(dmin, dmax);
                dmg = Math.max(1, Math.round(dmg * MONSTER_DAMAGE_MULTIPLIER));
                dmg = Math.max(1, dmg + this._getEnemyDamageMod(e));
                this._applyEnemyHit(e, target, dmg, 'melee');
            }

        // ── Mummy: front-row melee + Mummy Rot (blocks healing 3 rounds) ───
        } else if (typeDef.isMummyAI) {
            const dmin = MONSTER_MELEE_DAMAGE_MIN + MONSTER_DAMAGE_PER_LEVEL * lvlBoost + MONSTER_DAMAGE_BONUS_PER_LEVEL * lvlThreeBonus;
            const dmax = MONSTER_MELEE_DAMAGE_MAX + MONSTER_DAMAGE_PER_LEVEL * lvlBoost + MONSTER_DAMAGE_BONUS_PER_LEVEL * lvlThreeBonus;
            if (this.aliveFront.length > 0 && this._enemyCanAttemptStaminaAttack(e)) {
                const target = this.aliveFront[Math.floor(Math.random() * this.aliveFront.length)];
                this._spendEnemyStamina(e);
                let dmg = randomInt(dmin, dmax);
                dmg = Math.max(1, Math.round(dmg * MONSTER_DAMAGE_MULTIPLIER));
                dmg = Math.max(1, dmg + this._getEnemyDamageMod(e));
                this._addLog(`🟤 ${eName} lurches forward with rotting fists at ${target.name}!`);
                const _mummyHit = this._applyEnemyHit(e, target, dmg, 'melee');
                if (_mummyHit && _mummyHit.health > 0 && !_mummyHit.isLichForm && !this._isImmuneTo(_mummyHit, 'rot')) {
                    _mummyHit.activeEffects = (_mummyHit.activeEffects || []).filter(x => x.type !== 'mummy_rot');
                    _mummyHit.activeEffects.push({ type: 'mummy_rot', rounds: 3 });
                    this._addLog(`🟤 ${_mummyHit.name} is infected with Mummy Rot! (no healing for 3 rounds)`);
                }
            }

        // ── Revenant: phase-strike teleport to any party member; one-time revive ─
        } else if (typeDef.isRevenantAI) {
            const dmin = MONSTER_MELEE_DAMAGE_MIN + 2 + MONSTER_DAMAGE_PER_LEVEL * lvlBoost + MONSTER_DAMAGE_BONUS_PER_LEVEL * lvlThreeBonus;
            const dmax = MONSTER_MELEE_DAMAGE_MAX + 2 + MONSTER_DAMAGE_PER_LEVEL * lvlBoost + MONSTER_DAMAGE_BONUS_PER_LEVEL * lvlThreeBonus;
            const anyTarget = this.aliveParty;
            if (anyTarget.length > 0 && this._enemyCanAttemptStaminaAttack(e)) {
                const target = anyTarget[Math.floor(Math.random() * anyTarget.length)];
                this._spendEnemyStamina(e);
                let dmg = randomInt(dmin, dmax);
                dmg = Math.max(1, Math.round(dmg * MONSTER_DAMAGE_MULTIPLIER));
                dmg = Math.max(1, dmg + this._getEnemyDamageMod(e));
                const enragedStr = e.revenantRevived ? ' [ENRAGED]' : '';
                this._addLog(`👻 ${eName}${enragedStr} phases through space and strikes ${target.name}!`);
                this._applyEnemyHit(e, target, dmg, 'melee', { phaseStrike: true, skipInterceptors: true });
            }

        // ── Bone Archer: ranged-any; lvl 15+ fires 3-arrow volley, 25% fracture DoT ─
        } else if (typeDef.isBoneArcherAI) {
            const dmin = MONSTER_MELEE_DAMAGE_MIN + MONSTER_DAMAGE_PER_LEVEL * lvlBoost + MONSTER_DAMAGE_BONUS_PER_LEVEL * lvlThreeBonus;
            const dmax = MONSTER_MELEE_DAMAGE_MAX + MONSTER_DAMAGE_PER_LEVEL * lvlBoost + MONSTER_DAMAGE_BONUS_PER_LEVEL * lvlThreeBonus;
            const arrowCount = dlvl >= 15 ? 3 : 1;
            const fractureDuration = Math.max(1, Math.floor(dlvl / 8));
            this._addLog(arrowCount > 1
                ? `💀🏹 ${eName} draws a splintered bow and looses a three-arrow volley!`
                : `💀🏹 ${eName} draws a splintered bow and sights down an arrow!`);
            for (let ai = 0; ai < arrowCount; ai++) {
                if (this.aliveParty.length === 0) break;
                const target = this.aliveParty[Math.floor(Math.random() * this.aliveParty.length)];
                if (!this._enemyCanAttemptStaminaAttack(e)) break;
                this._spendEnemyStamina(e);
                let dmg = randomInt(dmin, dmax);
                dmg = Math.max(1, Math.round(dmg * MONSTER_DAMAGE_MULTIPLIER));
                dmg = Math.max(1, dmg + this._getEnemyDamageMod(e, 'ranged'));
                this._addLog(`🏹 ${eName} shoots a bone arrow at ${target.name}!`);
                const _hit = this._applyEnemyHit(e, target, dmg, 'ranged');
                if (_hit && _hit.health > 0 && Math.random() < 0.25) {
                    if (this._isFractureImmunePartyMember(_hit)) {
                        this._addLog(`🦴 ${_hit.name} is immune to splintering arrow wounds!`);
                    } else {
                        const fractureTick = Math.max(1, Math.floor(dmg * 0.30));
                        _hit.addEffect({ type: 'fracture', damage: fractureTick, rounds: fractureDuration });
                        this._addLog(`🦴 A bone arrow splinters in ${_hit.name}'s wound! (${fractureTick} bleed/rd, ${fractureDuration} rds)`);
                    }
                }
            }

        // ── Poltergeist: 50/50 ranged debris (40% stun) or phase-strike melee ─
        } else if (typeDef.isPoltergeistAI) {
            const dmin = MONSTER_MELEE_DAMAGE_MIN + MONSTER_DAMAGE_PER_LEVEL * lvlBoost + MONSTER_DAMAGE_BONUS_PER_LEVEL * lvlThreeBonus;
            const dmax = MONSTER_MELEE_DAMAGE_MAX + MONSTER_DAMAGE_PER_LEVEL * lvlBoost + MONSTER_DAMAGE_BONUS_PER_LEVEL * lvlThreeBonus;
            if (Math.random() < 0.50 && this.aliveParty.length > 0 && this._enemyCanAttemptStaminaAttack(e)) {
                // Ranged debris — any target
                const target = this.aliveParty[Math.floor(Math.random() * this.aliveParty.length)];
                this._spendEnemyStamina(e);
                let dmg = randomInt(dmin, dmax);
                dmg = Math.max(1, Math.round(dmg * MONSTER_DAMAGE_MULTIPLIER));
                dmg = Math.max(1, dmg + this._getEnemyDamageMod(e));
                this._addLog(`👻 ${eName} hurls spectral debris at ${target.name}!`);
                const _polterHit = this._applyEnemyHit(e, target, dmg, 'ranged');
                if (_polterHit && _polterHit.health > 0 && !_polterHit.stunned && Math.random() < 0.40) {
                    if (this._tryApplyStun(_polterHit)) {
                        this._addLog(`⚡ ${_polterHit.name} is stunned by the flying debris!`);
                    }
                }
            } else if (this.aliveParty.length > 0 && this._enemyCanAttemptStaminaAttack(e)) {
                // Phase-strike melee — any target, ignores armor
                const target = this.aliveParty[Math.floor(Math.random() * this.aliveParty.length)];
                this._spendEnemyStamina(e);
                let dmg = randomInt(dmin, dmax);
                dmg = Math.max(1, Math.round(dmg * MONSTER_DAMAGE_MULTIPLIER));
                dmg = Math.max(1, dmg + this._getEnemyDamageMod(e));
                this._addLog(`👻 ${eName} phases through ${target.name}'s defences!`);
                this._applyEnemyHit(e, target, dmg, 'melee', { phaseStrike: true, skipInterceptors: true });
            }

        // ── Zombie Giant: AoE front-row stomp +50%, 50% prone per target ───
        } else if (typeDef.isZombieGiantAI) {
            const bonus = 4;
            const dmin = MONSTER_MELEE_DAMAGE_MIN + bonus + MONSTER_DAMAGE_PER_LEVEL * lvlBoost + MONSTER_DAMAGE_BONUS_PER_LEVEL * lvlThreeBonus;
            const dmax = MONSTER_MELEE_DAMAGE_MAX + bonus + MONSTER_DAMAGE_PER_LEVEL * lvlBoost + MONSTER_DAMAGE_BONUS_PER_LEVEL * lvlThreeBonus;
            if (this.aliveFront.length > 0 && this._enemyCanAttemptStaminaAttack(e)) {
                this._spendEnemyStamina(e);
                let dmg = randomInt(dmin, dmax);
                dmg = Math.max(1, Math.round(dmg * MONSTER_DAMAGE_MULTIPLIER));
                dmg = Math.max(1, dmg + this._getEnemyDamageMod(e));
                dmg = Math.round(dmg * 1.50); // +50% stomp bonus
                this._addLog(`🧟 ${eName} SLAMS the ground with a devastating stomp!`);
                for (const target of this.aliveFront.slice()) {
                    const _hit = this._applyEnemyHit(e, target, dmg, 'melee', { aoe: true });
                    if (_hit && _hit.health > 0 && Math.random() < 0.50) {
                        _hit.proneRounds = 1;
                        this._addLog(`⏬ ${_hit.name} is knocked PRONE! (1 round)`);
                    }
                    if (this.aliveParty.length === 0) break;
                }
            }

        // ── Death Knight (hostile): 2 melee, 30% necrotic curse, 25% shield block ─
        } else if (typeDef.isDeathKnightAI) {
            const bonus = 2;
            const dmin = MONSTER_MELEE_DAMAGE_MIN + bonus + MONSTER_DAMAGE_PER_LEVEL * lvlBoost + MONSTER_DAMAGE_BONUS_PER_LEVEL * lvlThreeBonus;
            const dmax = MONSTER_MELEE_DAMAGE_MAX + bonus + MONSTER_DAMAGE_PER_LEVEL * lvlBoost + MONSTER_DAMAGE_BONUS_PER_LEVEL * lvlThreeBonus;
            this._addLog(`⚔️ ${eName} advances with dark purpose!`);
            for (let hi = 0; hi < 2; hi++) {
                if (this.aliveFront.length === 0) break;
                const target = this.aliveFront[Math.floor(Math.random() * this.aliveFront.length)];
                if (!this._enemyCanAttemptStaminaAttack(e)) break;
                this._spendEnemyStamina(e);
                let dmg = randomInt(dmin, dmax);
                dmg = Math.max(1, Math.round(dmg * MONSTER_DAMAGE_MULTIPLIER));
                dmg = Math.max(1, dmg + this._getEnemyDamageMod(e));
                const _hit = this._applyEnemyHit(e, target, dmg, 'melee');
                if (_hit && _hit.health > 0 && Math.random() < 0.30) {
                    const penalty = Math.max(1, Math.floor(dlvl / 8));
                    _hit.addEffect({ type: 'necrotic_curse', damageBonus: -penalty, rounds: 2 });
                    this._addLog(`💀 ${_hit.name} is cursed with necrotic energy! (-${penalty} all damage, 2 rds)`);
                }
            }

        // ── Succubus: Drain Kiss (ranged, drains mana = damage), 35% charm, AoE psychic at <50% HP ─
        } else if (typeDef.isSuccubusAI) {
            const dmin = MONSTER_MAGIC_DAMAGE_MIN + MONSTER_DAMAGE_PER_LEVEL * lvlBoost + MONSTER_DAMAGE_BONUS_PER_LEVEL * lvlThreeBonus;
            const dmax = MONSTER_MAGIC_DAMAGE_MAX + MONSTER_DAMAGE_PER_LEVEL * lvlBoost + MONSTER_DAMAGE_BONUS_PER_LEVEL * lvlThreeBonus;
            if (e.health <= e.maxHealth * 0.50 && this._enemyCanAttemptManaAttack(e) && this.aliveParty.length > 0) {
                // Psychic scream AoE
                this._spendEnemyMana(e);
                let dmg = randomInt(dmin, dmax);
                dmg = Math.max(1, Math.round(dmg * MONSTER_DAMAGE_MULTIPLIER));
                dmg = Math.max(1, dmg + this._getEnemyDamageMod(e, 'magic'));
                this._addLog(`\u{1F49C} ${eName} unleashes a psychic shriek — everyone reels!`);
                for (const target of this.aliveParty.slice()) {
                    this._applyEnemyHit(e, target, dmg, 'magic', { aoe: true, psychic: true });
                    if (this.aliveParty.length === 0) break;
                }
            } else if (this.aliveParty.length > 0 && this._enemyCanAttemptStaminaAttack(e)) {
                // Drain Kiss — any target
                const target = this.aliveParty[Math.floor(Math.random() * this.aliveParty.length)];
                this._spendEnemyStamina(e);
                let dmg = randomInt(dmin, dmax);
                dmg = Math.max(1, Math.round(dmg * MONSTER_DAMAGE_MULTIPLIER));
                dmg = Math.max(1, dmg + this._getEnemyDamageMod(e, 'magic'));
                this._addLog(`\u{1F48B} ${eName} leans close and plants a draining kiss on ${target.name}!`);
                const _succHit = this._applyEnemyHit(e, target, dmg, 'magic');
                if (_succHit && _succHit.health > 0 && _succHit.mana > 0) {
                    if (this._isResourceDrainImmunePartyMember(_succHit, 'mana')) {
                        this._addLog(`\u{1F49C} ${_succHit.name} cannot have mana drained!`);
                    } else {
                        const manaDrain = Math.min(_succHit.mana, dmg);
                        _succHit.mana = Math.max(0, _succHit.mana - manaDrain);
                        this._addLog(`\u{1F49C} ${_succHit.name} loses ${manaDrain} mana to the succubus!`);
                    }
                }
                // 35% chance to charm (skip turn via webbedRounds = 1); psychic — undead/constructs immune
                if (_succHit && _succHit.health > 0 && Math.random() < 0.35) {
                    if (this._isPsychicImmunePartyMember(_succHit)) {
                        this._addLog(`\u{1F49C} ${_succHit.name} is immune to psychic charm!`);
                    } else {
                        let _sucCharmResisted = false;
                        for (const _bd of this._getAllBardsWithDrums()) {
                            if (Math.random() < Math.min(BARD_THUNDEROUS_DRUMS_MAX_REDUCTION, _bd.level / 100)) {
                                this._addLog(`🥁 ${_succHit.name} resists ${eName}'s charm — ${_bd.name}'s Thunderous Drums shields their mind!`);
                                soundManager.playThunderousDrums();
                                _sucCharmResisted = true;
                                break;
                            }
                        }
                        if (!_sucCharmResisted) {
                            if (this._isHoldImmunePartyMember(_succHit)) {
                                this._addLog(`\u{1F49C} ${_succHit.name} cannot be left dazed by the charm!`);
                            } else {
                                _succHit.webbedRounds = Math.max(_succHit.webbedRounds || 0, 1);
                                this._addLog(`\u{1F49C} ${_succHit.name} is charmed — they stand dazed, unable to act!`);
                            }
                        }
                    }
                }
            }

        // ── Chain Devil: ranged chain attacks, 50% bind (web), 2 targets/turn (3 at dlvl 30+) ──
        } else if (typeDef.isChainDevilAI) {
            const attackCount = dlvl >= 30 ? 3 : 2;
            const dmin = MONSTER_MELEE_DAMAGE_MIN + MONSTER_DAMAGE_PER_LEVEL * lvlBoost + MONSTER_DAMAGE_BONUS_PER_LEVEL * lvlThreeBonus;
            const dmax = MONSTER_MELEE_DAMAGE_MAX + MONSTER_DAMAGE_PER_LEVEL * lvlBoost + MONSTER_DAMAGE_BONUS_PER_LEVEL * lvlThreeBonus;
            this._addLog(`\u{26D3}️ ${eName} whips animated chains at the party!`);
            const anyAlive = this.aliveParty;
            for (let ai = 0; ai < attackCount && anyAlive.length > 0; ai++) {
                const target = anyAlive[Math.floor(Math.random() * anyAlive.length)];
                if (!this._enemyCanAttemptStaminaAttack(e)) break;
                this._spendEnemyStamina(e);
                let dmg = randomInt(dmin, dmax);
                dmg = Math.max(1, Math.round(dmg * MONSTER_DAMAGE_MULTIPLIER));
                dmg = Math.max(1, dmg + this._getEnemyDamageMod(e));
                const _hit = this._applyEnemyHit(e, target, dmg, 'ranged');
                if (_hit && _hit.health > 0 && Math.random() < 0.50) {
                    if (this._isHoldImmunePartyMember(_hit)) {
                        this._addLog(`\u{26D3}️ ${_hit.name} cannot be bound by the chains!`);
                    } else {
                        _hit.webbedRounds = Math.max(_hit.webbedRounds || 0, WEB_DURATION_ROUNDS);
                        this._addLog(`\u{26D3}️ ${_hit.name} is bound in chains! (${WEB_DURATION_ROUNDS} rounds)`);
                    }
                }
            }

        // ── Blood Demon: life steal 40%, on kill heals to full + permanent +2 damage ──
        } else if (typeDef.isBloodDemonAI) {
            const bonus = 2 + (e.bloodDemonKillBonus || 0);
            const dmin = MONSTER_MELEE_DAMAGE_MIN + bonus + MONSTER_DAMAGE_PER_LEVEL * lvlBoost + MONSTER_DAMAGE_BONUS_PER_LEVEL * lvlThreeBonus;
            const dmax = MONSTER_MELEE_DAMAGE_MAX + bonus + MONSTER_DAMAGE_PER_LEVEL * lvlBoost + MONSTER_DAMAGE_BONUS_PER_LEVEL * lvlThreeBonus;
            if (this.aliveFront.length > 0 && this._enemyCanAttemptStaminaAttack(e)) {
                const target = this.aliveFront[Math.floor(Math.random() * this.aliveFront.length)];
                this._spendEnemyStamina(e);
                let dmg = randomInt(dmin, dmax);
                dmg = Math.max(1, Math.round(dmg * MONSTER_DAMAGE_MULTIPLIER));
                dmg = Math.max(1, dmg + this._getEnemyDamageMod(e));
                const prevHP = target.health;
                this._addLog(`\u{1F9B7} ${eName} tears into ${target.name} with blood-drenched claws!`);
                this._applyEnemyHit(e, target, dmg, 'melee');
                const dealt = Math.max(0, prevHP - target.health);
                if (dealt > 0) {
                    const stolen = Math.floor(dealt * 0.40);
                    e.health = Math.min(e.maxHealth, e.health + stolen);
                    if (stolen > 0) this._addLog(`\u{1F9B7} ${eName} drains ${stolen} HP from the wound!`);
                }
                if (target.health <= 0) {
                    e.health = e.maxHealth;
                    e.bloodDemonKillBonus = (e.bloodDemonKillBonus || 0) + 2;
                    this._addLog(`\u{1F9B7} ${eName} bathes in ${target.name}'s blood — fully healed and empowered! (+2 dmg, permanent)`);
                }
            }

        // ── Pit Fiend: 3 melee attacks +5 bonus, 50% Hellfire Pillar AoE whole party ──
        } else if (typeDef.isPitFiendAI) {
            const bonus = 5;
            const dmin = MONSTER_MELEE_DAMAGE_MIN + bonus + MONSTER_DAMAGE_PER_LEVEL * lvlBoost + MONSTER_DAMAGE_BONUS_PER_LEVEL * lvlThreeBonus;
            const dmax = MONSTER_MELEE_DAMAGE_MAX + bonus + MONSTER_DAMAGE_PER_LEVEL * lvlBoost + MONSTER_DAMAGE_BONUS_PER_LEVEL * lvlThreeBonus;
            if (this._enemyCanAttemptManaAttack(e) && Math.random() < 0.50 && this.aliveParty.length > 0) {
                this._spendEnemyMana(e);
                let dmg = randomInt(dmin, dmax);
                dmg = Math.max(1, Math.round(dmg * MONSTER_DAMAGE_MULTIPLIER));
                dmg = Math.max(1, dmg + this._getEnemyDamageMod(e, 'magic'));
                this._addLog(`\u{1F525} ${eName} calls down a HELLFIRE PILLAR — infernal flames engulf the entire party!`);
                for (const target of this.aliveParty.slice()) {
                    const _hit = this._applyEnemyHit(e, target, dmg, 'magic', { aoe: true });
                    if (_hit && _hit.health > 0) {
                        const burnTick = Math.max(1, Math.floor(dmg * DRAKE_FIRE_BURN_FRACTION));
                        _hit.addEffect({ type: 'burn', rounds: DRAKE_FIRE_BURN_ROUNDS, damage: burnTick });
                        this._addLog(`\u{1F525} ${_hit.name} is wreathed in hellfire! (${burnTick}/rd ${DRAKE_FIRE_BURN_ROUNDS} rds)`);
                    }
                    if (this.aliveParty.length === 0) break;
                }
            } else {
                this._addLog(`\u{1F608} ${eName} assaults the party with titanic blows!`);
                for (let ai = 0; ai < 3; ai++) {
                    if (this.aliveFront.length === 0) break;
                    const target = this.aliveFront[Math.floor(Math.random() * this.aliveFront.length)];
                    if (!this._enemyCanAttemptStaminaAttack(e)) break;
                    this._spendEnemyStamina(e);
                    let dmg = randomInt(dmin, dmax);
                    dmg = Math.max(1, Math.round(dmg * MONSTER_DAMAGE_MULTIPLIER));
                    dmg = Math.max(1, dmg + this._getEnemyDamageMod(e));
                    this._applyEnemyHit(e, target, dmg, 'melee');
                }
            }

        // ── Quasit: 5 ranged attacks at 60% dmg, each applies quasit_poison DoT = dealt, dur level/4 ──
        } else if (typeDef.isQuasitAI) {
            const dmin = MONSTER_MELEE_DAMAGE_MIN + MONSTER_DAMAGE_PER_LEVEL * lvlBoost + MONSTER_DAMAGE_BONUS_PER_LEVEL * lvlThreeBonus;
            const dmax = MONSTER_MELEE_DAMAGE_MAX + MONSTER_DAMAGE_PER_LEVEL * lvlBoost + MONSTER_DAMAGE_BONUS_PER_LEVEL * lvlThreeBonus;
            const poisonDuration = Math.max(2, Math.floor(dlvl / 4));
            this._addLog(`\u{1F47F} ${eName} swarms with a flurry of venomous strikes!`);
            const anyAlive = this.aliveParty;
            for (let ai = 0; ai < 5 && anyAlive.length > 0; ai++) {
                const target = anyAlive[Math.floor(Math.random() * anyAlive.length)];
                if (!this._enemyCanAttemptStaminaAttack(e)) break;
                this._spendEnemyStamina(e);
                let dmg = randomInt(dmin, dmax);
                dmg = Math.max(1, Math.round(dmg * MONSTER_DAMAGE_MULTIPLIER * 0.60));
                dmg = Math.max(1, dmg + this._getEnemyDamageMod(e));
                const prevHP = target.health;
                const _quasitHit = this._applyEnemyHit(e, target, dmg, 'ranged');
                // If warrior intercepted, prevHP was target's — approximate dealt for warrior via defense subtraction
                const dealt = _quasitHit ? (_quasitHit === target
                    ? Math.max(0, prevHP - target.health)
                    : Math.max(1, dmg - (_quasitHit.getArmorBlocking ? _quasitHit.getArmorBlocking() : 0) - (_quasitHit.getTotalDefense ? _quasitHit.getTotalDefense() : 0)))
                    : 0;
                if (_quasitHit && _quasitHit.health > 0 && dealt > 0) {
                    if (this._isPoisonImmunePartyMember(_quasitHit) || this._isFractureImmunePartyMember(_quasitHit)) {
                        this._addLog(`👾 ${_quasitHit.name} is immune to quasit venom!`);
                    } else {
                        _quasitHit.addEffect({ type: 'quasit_poison', damage: dealt, rounds: poisonDuration });
                        this._addLog(`\u{1F47F} ${_quasitHit.name} is injected with quasit venom! (${dealt}/rd, ${poisonDuration} rds, ignores armor)`);
                    }
                }
            }

        // ── Giant Crocodile: bite; if bite connects, Death Roll (held + bleed DoT) ──
        } else if (typeDef.isGiantCrocodileAI) {
            const dmin = MONSTER_MELEE_DAMAGE_MIN + 2 + MONSTER_DAMAGE_PER_LEVEL * lvlBoost + MONSTER_DAMAGE_BONUS_PER_LEVEL * lvlThreeBonus;
            const dmax = MONSTER_MELEE_DAMAGE_MAX + 2 + MONSTER_DAMAGE_PER_LEVEL * lvlBoost + MONSTER_DAMAGE_BONUS_PER_LEVEL * lvlThreeBonus;
            if (this.aliveFront.length > 0 && this._enemyCanAttemptStaminaAttack(e)) {
                const target = this.aliveFront[Math.floor(Math.random() * this.aliveFront.length)];
                this._spendEnemyStamina(e);
                let dmg = randomInt(dmin, dmax);
                dmg = Math.max(1, Math.round(dmg * MONSTER_DAMAGE_MULTIPLIER));
                dmg = Math.max(1, dmg + this._getEnemyDamageMod(e));
                this._addLog(`\u{1F40A} ${eName} lunges with a crushing bite at ${target.name}!`);
                const _crocHit = this._applyEnemyHit(e, target, dmg, 'melee');
                if (_crocHit && _crocHit.health > 0) {
                    // Death Roll: held + bleed DoT
                    const bleedDuration = Math.max(2, Math.floor(dlvl / 5));
                    const holdImmune = this._isHoldImmunePartyMember(_crocHit);
                    if (!holdImmune) {
                        _crocHit.webbedRounds = Math.max(_crocHit.webbedRounds || 0, 2);
                    }
                    if (this._isFractureImmunePartyMember(_crocHit)) {
                        const holdText = holdImmune ? 'hold resisted' : 'held in its jaws 2 rds';
                        this._addLog(`\u{1F40A} ${eName} DEATH ROLLS ${_crocHit.name}! (${holdText} — immune to bleed)`);
                    } else {
                        const bleedTick = Math.max(1, Math.floor(dmg * 0.30));
                        _crocHit.addEffect({ type: 'fracture', damage: bleedTick, rounds: bleedDuration });
                        const holdText = holdImmune ? 'hold resisted' : 'held in its jaws 2 rds';
                        this._addLog(`\u{1F40A} ${eName} DEATH ROLLS ${_crocHit.name}! (${holdText}, bleed ${bleedTick}/rd ${bleedDuration} rds)`);
                    }
                }
            }

        // ── Chimera: all three attacks each round — lion claws (front bleed), goat horns (stun), dragon breath (fire AoE all) ──
        } else if (typeDef.isChimeraAI) {
            const dmin = MONSTER_MELEE_DAMAGE_MIN + 3 + MONSTER_DAMAGE_PER_LEVEL * lvlBoost + MONSTER_DAMAGE_BONUS_PER_LEVEL * lvlThreeBonus;
            const dmax = MONSTER_MELEE_DAMAGE_MAX + 3 + MONSTER_DAMAGE_PER_LEVEL * lvlBoost + MONSTER_DAMAGE_BONUS_PER_LEVEL * lvlThreeBonus;
            this._addLog(`\u{1F981}\u{1F410}\u{1F432} ${eName} attacks with all three heads simultaneously!`);
            // Lion claws: 2 melee on front row, each with bleed DoT = original hit, dur level/6
            const bleedDur = Math.max(1, Math.floor(dlvl / 6));
            for (let ai = 0; ai < 2; ai++) {
                if (this.aliveFront.length === 0) break;
                const target = this.aliveFront[Math.floor(Math.random() * this.aliveFront.length)];
                if (!this._enemyCanAttemptStaminaAttack(e)) break;
                this._spendEnemyStamina(e);
                let dmg = randomInt(dmin, dmax);
                dmg = Math.max(1, Math.round(dmg * MONSTER_DAMAGE_MULTIPLIER));
                dmg = Math.max(1, dmg + this._getEnemyDamageMod(e));
                const _chiPrevHP = target.health;
                const _chiHit = this._applyEnemyHit(e, target, dmg, 'melee');
                const dealt = _chiHit ? (_chiHit === target
                    ? Math.max(0, _chiPrevHP - target.health)
                    : Math.max(1, dmg - (_chiHit.getArmorBlocking ? _chiHit.getArmorBlocking() : 0) - (_chiHit.getTotalDefense ? _chiHit.getTotalDefense() : 0)))
                    : 0;
                if (_chiHit && _chiHit.health > 0 && dealt > 0) {
                    if (this._isFractureImmunePartyMember(_chiHit)) {
                        this._addLog(`🦁 ${_chiHit.name} is immune to bleed from lion claws!`);
                    } else {
                        _chiHit.addEffect({ type: 'fracture', damage: dealt, rounds: bleedDur });
                        this._addLog(`\u{1F981} ${_chiHit.name} is raked by lion claws! (bleed ${dealt}/rd ${bleedDur} rds)`);
                    }
                }
            }
            // Goat horns: single massive melee hit + stun attempt
            if (this.aliveFront.length > 0 && this._enemyCanAttemptStaminaAttack(e)) {
                const target = this.aliveFront[Math.floor(Math.random() * this.aliveFront.length)];
                this._spendEnemyStamina(e);
                let dmg = randomInt(dmin, dmax);
                dmg = Math.max(1, Math.round(dmg * MONSTER_DAMAGE_MULTIPLIER * 1.5)); // massive damage
                dmg = Math.max(1, dmg + this._getEnemyDamageMod(e));
                this._addLog(`\u{1F410} ${eName} GORES ${target.name} with iron horns!`);
                const _hornHit = this._applyEnemyHit(e, target, dmg, 'melee');
                if (_hornHit && _hornHit.health > 0) {
                    this._tryApplyStun(_hornHit);
                }
            }
            // Dragon breath: fire AoE all party members
            if (this._enemyCanAttemptManaAttack(e) && this.aliveParty.length > 0) {
                this._spendEnemyMana(e);
                let dmg = randomInt(dmin, dmax);
                dmg = Math.max(1, Math.round(dmg * MONSTER_DAMAGE_MULTIPLIER));
                dmg = Math.max(1, dmg + this._getEnemyDamageMod(e, 'magic'));
                this._addLog(`\u{1F525} ${eName} belches a torrent of fire at the entire party!`);
                for (const target of this.aliveParty.slice()) {
                    const _hit = this._applyEnemyHit(e, target, dmg, 'magic', { aoe: true, dragonBreath: 'fire' });
                    if (_hit && _hit.health > 0) {
                        const burnTick = Math.max(1, Math.floor(dmg * DRAKE_FIRE_BURN_FRACTION));
                        _hit.addEffect({ type: 'burn', rounds: DRAKE_FIRE_BURN_ROUNDS, damage: burnTick });
                    }
                    if (this.aliveParty.length === 0) break;
                }
            }

        // ── Wyvern: claw melee front row + ranged-any poison sting (double DoT) + 25% dive-bomb back row ──
        } else if (typeDef.isWyvernAI) {
            const dmin = MONSTER_MELEE_DAMAGE_MIN + 2 + MONSTER_DAMAGE_PER_LEVEL * lvlBoost + MONSTER_DAMAGE_BONUS_PER_LEVEL * lvlThreeBonus;
            const dmax = MONSTER_MELEE_DAMAGE_MAX + 2 + MONSTER_DAMAGE_PER_LEVEL * lvlBoost + MONSTER_DAMAGE_BONUS_PER_LEVEL * lvlThreeBonus;
            // Claw: front row melee
            if (this.aliveFront.length > 0 && this._enemyCanAttemptStaminaAttack(e)) {
                const clawTarget = this.aliveFront[Math.floor(Math.random() * this.aliveFront.length)];
                this._spendEnemyStamina(e);
                let dmg = randomInt(dmin, dmax);
                dmg = Math.max(1, Math.round(dmg * MONSTER_DAMAGE_MULTIPLIER));
                dmg = Math.max(1, dmg + this._getEnemyDamageMod(e));
                this._addLog(`\u{1F985} ${eName} rakes ${clawTarget.name} with its talons!`);
                this._applyEnemyHit(e, clawTarget, dmg, 'melee');
            }
            // Poison sting: any target, double-strength DoT
            if (this.aliveParty.length > 0 && this._enemyCanAttemptStaminaAttack(e)) {
                const stingTarget = this.aliveParty[Math.floor(Math.random() * this.aliveParty.length)];
                this._spendEnemyStamina(e);
                let dmg = randomInt(dmin, dmax);
                dmg = Math.max(1, Math.round(dmg * MONSTER_DAMAGE_MULTIPLIER));
                dmg = Math.max(1, dmg + this._getEnemyDamageMod(e));
                this._addLog(`\u{1F9AA} ${eName} whips its venomous tail at ${stingTarget.name}!`);
                const _stingHit = this._applyEnemyHit(e, stingTarget, dmg, 'ranged');
                if (_stingHit && _stingHit.health > 0) {
                    if (this._isPoisonImmunePartyMember(_stingHit)) {
                        this._addLog(`🟢 ${_stingHit.name} is immune to wyvern venom!`);
                    } else {
                        const poisonTick = Math.max(1, Math.floor(dmg * 0.50)); // double-strength DoT
                        _stingHit.addEffect({ type: 'poison', rounds: POISON_DURATION_ROUNDS, damage: poisonTick });
                        this._addLog(`\u{1F7E2} ${_stingHit.name} is injected with wyvern venom! (${poisonTick}/rd ${POISON_DURATION_ROUNDS} rds)`);
                    }
                }
            }
            // 25% dive-bomb: melee strike on a back-row target
            if (Math.random() < 0.25 && this.aliveBack.length > 0 && this._enemyCanAttemptStaminaAttack(e)) {
                const diveTarget = this.aliveBack[Math.floor(Math.random() * this.aliveBack.length)];
                this._spendEnemyStamina(e);
                let dmg = randomInt(dmin, dmax);
                dmg = Math.max(1, Math.round(dmg * MONSTER_DAMAGE_MULTIPLIER));
                dmg = Math.max(1, dmg + this._getEnemyDamageMod(e));
                this._addLog(`\u{1F985} ${eName} dive-bombs ${diveTarget.name} in the back row!`);
                this._applyEnemyHit(e, diveTarget, dmg, 'melee');
            }

        // ── Displacer Beast: standard melee; dodge implemented in _damageEnemy ──
        } else if (typeDef.isDisplacerBeastAI) {
            const dmin = MONSTER_MELEE_DAMAGE_MIN + MONSTER_DAMAGE_PER_LEVEL * lvlBoost + MONSTER_DAMAGE_BONUS_PER_LEVEL * lvlThreeBonus;
            const dmax = MONSTER_MELEE_DAMAGE_MAX + MONSTER_DAMAGE_PER_LEVEL * lvlBoost + MONSTER_DAMAGE_BONUS_PER_LEVEL * lvlThreeBonus;
            if (this.aliveFront.length > 0 && this._enemyCanAttemptStaminaAttack(e)) {
                const target = this.aliveFront[Math.floor(Math.random() * this.aliveFront.length)];
                this._spendEnemyStamina(e);
                let dmg = randomInt(dmin, dmax);
                dmg = Math.max(1, Math.round(dmg * MONSTER_DAMAGE_MULTIPLIER));
                dmg = Math.max(1, dmg + this._getEnemyDamageMod(e));
                this._addLog(`\u{1F406} ${eName} attacks ${target.name} through its illusory doubles!`);
                this._applyEnemyHit(e, target, dmg, 'melee');
            }

        // ── Remorhaz: powerful melee (half magic, burn retaliate implemented in _damageEnemy) ──
        } else if (typeDef.isRemorhazAI) {
            const bonus = 3;
            const dmin = MONSTER_MELEE_DAMAGE_MIN + bonus + MONSTER_DAMAGE_PER_LEVEL * lvlBoost + MONSTER_DAMAGE_BONUS_PER_LEVEL * lvlThreeBonus;
            const dmax = MONSTER_MELEE_DAMAGE_MAX + bonus + MONSTER_DAMAGE_PER_LEVEL * lvlBoost + MONSTER_DAMAGE_BONUS_PER_LEVEL * lvlThreeBonus;
            if (this.aliveFront.length > 0 && this._enemyCanAttemptStaminaAttack(e)) {
                const target = this.aliveFront[Math.floor(Math.random() * this.aliveFront.length)];
                this._spendEnemyStamina(e);
                let dmg = randomInt(dmin, dmax);
                dmg = Math.max(1, Math.round(dmg * MONSTER_DAMAGE_MULTIPLIER));
                dmg = Math.max(1, dmg + this._getEnemyDamageMod(e));
                this._addLog(`\u{1F525} ${eName} crashes into ${target.name} with searing fury!`);
                this._applyEnemyHit(e, target, dmg, 'melee');
            }

        // ── Thunderbird: 2 lightning strikes (35% chain to adjacent), thunderclap every 3 rounds ──
        } else if (typeDef.isThunderbirdAI) {
            const dmin = MONSTER_MAGIC_DAMAGE_MIN + MONSTER_DAMAGE_PER_LEVEL * lvlBoost + MONSTER_DAMAGE_BONUS_PER_LEVEL * lvlThreeBonus;
            const dmax = MONSTER_MAGIC_DAMAGE_MAX + MONSTER_DAMAGE_PER_LEVEL * lvlBoost + MONSTER_DAMAGE_BONUS_PER_LEVEL * lvlThreeBonus;
            e.thunderbirdTurnCount = (e.thunderbirdTurnCount || 0) + 1;
            if (e.thunderbirdTurnCount % 3 === 0 && this.aliveFront.length > 0 && this._enemyCanAttemptManaAttack(e)) {
                // Thunderclap AoE: front row, 25% stun each
                this._spendEnemyMana(e);
                let dmg = randomInt(dmin, dmax);
                dmg = Math.max(1, Math.round(dmg * MONSTER_DAMAGE_MULTIPLIER * 1.25));
                dmg = Math.max(1, dmg + this._getEnemyDamageMod(e, 'magic'));
                this._addLog(`⚡ ${eName} THUNDERCLAPS with a deafening boom!`);
                for (const target of this.aliveFront.slice()) {
                    const _hit = this._applyEnemyHit(e, target, dmg, 'magic', { aoe: true });
                    if (_hit && _hit.health > 0 && Math.random() < 0.25) {
                        this._tryApplyStun(_hit);
                    }
                    if (this.aliveParty.length === 0) break;
                }
            } else {
                // 2 ranged lightning strikes with chain
                for (let ai = 0; ai < 2; ai++) {
                    if (this.aliveParty.length === 0) break;
                    const anyAlive = this.aliveParty;
                    const target = anyAlive[Math.floor(Math.random() * anyAlive.length)];
                    if (!this._enemyCanAttemptStaminaAttack(e)) break;
                    this._spendEnemyStamina(e);
                    let dmg = randomInt(dmin, dmax);
                    dmg = Math.max(1, Math.round(dmg * MONSTER_DAMAGE_MULTIPLIER));
                    dmg = Math.max(1, dmg + this._getEnemyDamageMod(e, 'magic'));
                    this._addLog(`⚡ ${eName} hurls a lightning bolt at ${target.name}!`);
                    this._applyEnemyHit(e, target, dmg, 'magic');
                    // 35% chain to adjacent party member for half damage
                    if (Math.random() < 0.35 && this.aliveParty.length > 1) {
                        const others = this.aliveParty.filter(m => m !== target);
                        if (others.length > 0) {
                            const chainTarget = others[Math.floor(Math.random() * others.length)];
                            const chainDmg = Math.max(1, Math.floor(dmg * 0.5));
                            this._addLog(`⚡ Lightning chains to ${chainTarget.name} for ${chainDmg} damage!`);
                            this._applyEnemyHit(e, chainTarget, chainDmg, 'magic', { aoe: true });
                        }
                    }
                }
            }

        // ── Rust Monster: corrodes chainmail/platemail — defense debuff = level-5, 9999 rounds ──
        } else if (typeDef.isRustMonsterAI) {
            const dmin = MONSTER_MELEE_DAMAGE_MIN + MONSTER_DAMAGE_PER_LEVEL * lvlBoost + MONSTER_DAMAGE_BONUS_PER_LEVEL * lvlThreeBonus;
            const dmax = MONSTER_MELEE_DAMAGE_MAX + MONSTER_DAMAGE_PER_LEVEL * lvlBoost + MONSTER_DAMAGE_BONUS_PER_LEVEL * lvlThreeBonus;
            if (this.aliveFront.length > 0 && this._enemyCanAttemptStaminaAttack(e)) {
                const target = this.aliveFront[Math.floor(Math.random() * this.aliveFront.length)];
                this._spendEnemyStamina(e);
                let dmg = randomInt(dmin, dmax);
                dmg = Math.max(1, Math.round(dmg * MONSTER_DAMAGE_MULTIPLIER * 0.5)); // weak damage
                dmg = Math.max(1, dmg + this._getEnemyDamageMod(e));
                this._addLog(`\u{1F99F} ${eName} gnaws at ${target.name}!`);
                const _rustHit = this._applyEnemyHit(e, target, dmg, 'melee');
                // Check if target wears chain or plate — apply rust corrosion
                const armorId = _rustHit && _rustHit.equipment && _rustHit.equipment.armor;
                if (armorId && _rustHit && _rustHit.health > 0) {
                    const armorDef = (typeof getItemDef === 'function' ? getItemDef(armorId) : null) || null;
                    const armorType = armorDef && armorDef.armorType;
                    if ((armorType === 'chain' || armorType === 'plate') && !_rustHit.activeEffects.some(x => x.type === 'rust_corrosion')) {
                        const defPenalty = Math.max(1, (e.level || dlvl) - 5);
                        _rustHit.addEffect({ type: 'rust_corrosion', defenseBonus: -defPenalty, rounds: 9999 });
                        this._addLog(`\u{1F99F} ${eName} CORRODES ${_rustHit.name}'s armor! (-${defPenalty} defense, permanent combat debuff)`);
                    }
                }
            }

        // ── Witch Doctor: Hex, Wither, Plague (AoE poison), Soul Siphon ──
        } else if (typeDef.isWitchDoctorAI) {
            const dmin = MONSTER_MAGIC_DAMAGE_MIN + MONSTER_DAMAGE_PER_LEVEL * lvlBoost + MONSTER_DAMAGE_BONUS_PER_LEVEL * lvlThreeBonus;
            const dmax = MONSTER_MAGIC_DAMAGE_MAX + MONSTER_DAMAGE_PER_LEVEL * lvlBoost + MONSTER_DAMAGE_BONUS_PER_LEVEL * lvlThreeBonus;
            const roll = Math.random();
            if (roll < 0.25 && this.aliveParty.length > 0) {
                // Hex: defense debuff for 2 rounds
                const target = this.aliveParty[Math.floor(Math.random() * this.aliveParty.length)];
                target.addEffect({ type: 'hex', damageBonus: 0, defenseBonus: -Math.max(2, Math.floor(dlvl * 0.5)), rounds: 2 });
                this._addLog(`\u{1F480} ${eName} casts a Hex on ${target.name}! (-def 2 rounds)`);
            } else if (roll < 0.50 && this.aliveParty.length > 0) {
                // Wither: penalty to damage = level/4, lasting level/4 rounds
                const target = this.aliveParty[Math.floor(Math.random() * this.aliveParty.length)];
                const penalty = Math.max(1, Math.floor(dlvl / 4));
                const witherDur = Math.max(2, Math.floor(dlvl / 4));
                target.addEffect({ type: 'wither', damageBonus: -penalty, rounds: witherDur });
                this._addLog(`\u{1F9B4} ${eName} withers ${target.name}! (-${penalty} all damage for ${witherDur} rds)`);
            } else if (roll < 0.75 && this._enemyCanAttemptManaAttack(e)) {
                // Plague: AoE poison DoT on whole party
                this._spendEnemyMana(e);
                let dmg = randomInt(dmin, dmax);
                dmg = Math.max(1, Math.round(dmg * MONSTER_DAMAGE_MULTIPLIER));
                this._addLog(`\u{1F480} ${eName} calls down a foul Plague on the party!`);
                for (const target of this.aliveParty.slice()) {
                    if (this._isPoisonImmunePartyMember(target)) {
                        this._addLog(`🟢 ${target.name} is immune to plague!`);
                    } else {
                        const poisonTick = Math.max(1, Math.floor(dmg * 0.30));
                        target.addEffect({ type: 'poison', rounds: POISON_DURATION_ROUNDS, damage: poisonTick });
                        this._addLog(`\u{1F7E2} ${target.name} is afflicted by plague! (${poisonTick}/rd ${POISON_DURATION_ROUNDS} rds)`);
                    }
                    if (this.aliveParty.length === 0) break;
                }
            } else if (this.aliveParty.length > 0) {
                // Soul Siphon: takes 20% of target's max HP, heals witch doctor equally
                const target = this.aliveParty[Math.floor(Math.random() * this.aliveParty.length)];
                const siphon = Math.max(1, Math.floor(target.maxHealth * 0.20));
                const prevHP = target.health;
                target.health = Math.max(0, target.health - siphon);
                const actualDrain = Math.max(0, prevHP - target.health);
                if (actualDrain > 0) {
                    // Heal witch doctor and expand its max HP
                    e.maxHealth = Math.floor(e.maxHealth + actualDrain * 0.20);
                    e.health = Math.min(e.maxHealth, e.health + actualDrain);
                    this._addLog(`\u{1FAE5} ${eName} tears ${target.name}'s soul! (${actualDrain} dmg, ignores armor — witch doctor empowered!)`);
                }
                if (target.health <= 0) this._addLog(`${target.name} has had their soul siphoned away!`);
            }

        // ── Gladiator: 2 melee + 40% retaliate + Taunt AoE ──────────────────
        } else if (typeDef.isGladiatorAI) {
            const bonus = 2;
            const dmin = MONSTER_MELEE_DAMAGE_MIN + bonus + MONSTER_DAMAGE_PER_LEVEL * lvlBoost + MONSTER_DAMAGE_BONUS_PER_LEVEL * lvlThreeBonus;
            const dmax = MONSTER_MELEE_DAMAGE_MAX + bonus + MONSTER_DAMAGE_PER_LEVEL * lvlBoost + MONSTER_DAMAGE_BONUS_PER_LEVEL * lvlThreeBonus;
            // 30% chance to Taunt instead
            if (Math.random() < 0.30 && this.aliveParty.length > 0) {
                const tauntPenalty = Math.max(2, Math.floor(dlvl / 4));
                this._addLog(`⚔️ ${eName} TAUNTS the party! Their focus is disrupted — ranged/magic damage reduced!`);
                for (const target of this.aliveParty) {
                    target.addEffect({ type: 'taunted', damageBonus: -tauntPenalty, rounds: 1 });
                }
            }
            // 2 melee attacks with 40% retaliate chance
            this._addLog(`⚔️ ${eName} advances with disciplined strikes!`);
            for (let ai = 0; ai < 2; ai++) {
                if (this.aliveFront.length === 0) break;
                const target = this.aliveFront[Math.floor(Math.random() * this.aliveFront.length)];
                if (!this._enemyCanAttemptStaminaAttack(e)) break;
                this._spendEnemyStamina(e);
                let dmg = randomInt(dmin, dmax);
                dmg = Math.max(1, Math.round(dmg * MONSTER_DAMAGE_MULTIPLIER));
                dmg = Math.max(1, dmg + this._getEnemyDamageMod(e));
                const prevHP = target.health;
                this._applyEnemyHit(e, target, dmg, 'melee');
                const received = Math.max(0, prevHP - target.health);
                // 40% retaliate: target deals 50% of received damage back to gladiator
                if (received > 0 && target.health > 0 && Math.random() < 0.40) {
                    const retDmg = Math.max(1, Math.floor(received * 0.50));
                    e.health = Math.max(0, e.health - retDmg);
                    this._addLog(`⚔️ ${target.name} retaliates against ${eName} for ${retDmg} damage!`);
                }
            }

        // ── Assassin Lord: opening backstab (3× phase, lowest HP), then 2 melee + 30% bleed ──
        } else if (typeDef.isAssassinLordAI) {
            const dmin = MONSTER_MELEE_DAMAGE_MIN + 3 + MONSTER_DAMAGE_PER_LEVEL * lvlBoost + MONSTER_DAMAGE_BONUS_PER_LEVEL * lvlThreeBonus;
            const dmax = MONSTER_MELEE_DAMAGE_MAX + 3 + MONSTER_DAMAGE_PER_LEVEL * lvlBoost + MONSTER_DAMAGE_BONUS_PER_LEVEL * lvlThreeBonus;
            const bleedDuration = Math.max(2, Math.floor(dlvl / 6));
            if (!e.assassinOpened && this.aliveParty.length > 0) {
                e.assassinOpened = true;
                // Find lowest HP target
                const sortedByHP = this.aliveParty.slice().sort((a, b) => a.health - b.health);
                const backstabTarget = sortedByHP[0];
                this._spendEnemyStamina(e);
                let dmg = randomInt(dmin, dmax);
                dmg = Math.max(1, Math.round(dmg * MONSTER_DAMAGE_MULTIPLIER * 3)); // 3× damage
                dmg = Math.max(1, dmg + this._getEnemyDamageMod(e));
                this._addLog(`\u{1F5E1}️ ${eName} materialises from shadow and BACKSTABS ${backstabTarget.name}! (3× phase strike!)`);
                this._applyEnemyHit(e, backstabTarget, dmg, 'melee', { phaseStrike: true, skipInterceptors: true });
            } else {
                // 2 melee attacks + 30% bleed
                for (let ai = 0; ai < 2; ai++) {
                    if (this.aliveFront.length === 0) break;
                    const target = this.aliveFront[Math.floor(Math.random() * this.aliveFront.length)];
                    if (!this._enemyCanAttemptStaminaAttack(e)) break;
                    this._spendEnemyStamina(e);
                    let dmg = randomInt(dmin, dmax);
                    dmg = Math.max(1, Math.round(dmg * MONSTER_DAMAGE_MULTIPLIER));
                    dmg = Math.max(1, dmg + this._getEnemyDamageMod(e));
                    const _asnPrevHP = target.health;
                    const _asnHit = this._applyEnemyHit(e, target, dmg, 'melee');
                    const dealt = _asnHit ? (_asnHit === target
                        ? Math.max(0, _asnPrevHP - target.health)
                        : Math.max(1, dmg - (_asnHit.getArmorBlocking ? _asnHit.getArmorBlocking() : 0) - (_asnHit.getTotalDefense ? _asnHit.getTotalDefense() : 0)))
                        : 0;
                    if (_asnHit && _asnHit.health > 0 && dealt > 0 && Math.random() < 0.30) {
                        if (this._isFractureImmunePartyMember(_asnHit)) {
                            this._addLog(`🗡️ ${_asnHit.name} is immune to bleed from the assassin's blade!`);
                        } else {
                            const bleedTick = Math.max(1, Math.floor(dealt * 0.25));
                            _asnHit.addEffect({ type: 'fracture', damage: bleedTick, rounds: bleedDuration });
                            this._addLog(`\u{1F5E1}️ ${_asnHit.name} bleeds from the assassin's blade! (${bleedTick}/rd ${bleedDuration} rds)`);
                        }
                    }
                }
            }

        // ── Battle Mage: melee on odd turns, AoE magic on even turns; Arcane Overload at <50% HP ──
        } else if (typeDef.isBattleMageAI) {
            const dmin = MONSTER_MELEE_DAMAGE_MIN + 2 + MONSTER_DAMAGE_PER_LEVEL * lvlBoost + MONSTER_DAMAGE_BONUS_PER_LEVEL * lvlThreeBonus;
            const dmax = MONSTER_MELEE_DAMAGE_MAX + 2 + MONSTER_DAMAGE_PER_LEVEL * lvlBoost + MONSTER_DAMAGE_BONUS_PER_LEVEL * lvlThreeBonus;
            const mdmin = MONSTER_MAGIC_DAMAGE_MIN + 2 + MONSTER_DAMAGE_PER_LEVEL * lvlBoost + MONSTER_DAMAGE_BONUS_PER_LEVEL * lvlThreeBonus;
            const mdmax = MONSTER_MAGIC_DAMAGE_MAX + 2 + MONSTER_DAMAGE_PER_LEVEL * lvlBoost + MONSTER_DAMAGE_BONUS_PER_LEVEL * lvlThreeBonus;
            e.battleMageTurn = (e.battleMageTurn || 0) + 1;
            const arcaneOverload = e.health <= e.maxHealth * 0.50;
            if (arcaneOverload) {
                // Both attacks: 2 melee + AoE magic, then take backlash
                this._addLog(`\u{1F9D9} ${eName} enters ARCANE OVERLOAD — unleashes everything!`);
                for (let ai = 0; ai < 2; ai++) {
                    if (this.aliveFront.length === 0) break;
                    const target = this.aliveFront[Math.floor(Math.random() * this.aliveFront.length)];
                    if (!this._enemyCanAttemptStaminaAttack(e)) break;
                    this._spendEnemyStamina(e);
                    let dmg = randomInt(dmin, dmax);
                    dmg = Math.max(1, Math.round(dmg * MONSTER_DAMAGE_MULTIPLIER * 1.20));
                    dmg = Math.max(1, dmg + this._getEnemyDamageMod(e));
                    this._applyEnemyHit(e, target, dmg, 'melee');
                }
                if (this._enemyCanAttemptManaAttack(e) && this.aliveParty.length > 0) {
                    this._spendEnemyMana(e);
                    let dmg = randomInt(mdmin, mdmax);
                    dmg = Math.max(1, Math.round(dmg * MONSTER_DAMAGE_MULTIPLIER));
                    dmg = Math.max(1, dmg + this._getEnemyDamageMod(e, 'magic'));
                    for (const target of this.aliveParty.slice()) {
                        this._applyEnemyHit(e, target, dmg, 'magic', { aoe: true });
                        if (this.aliveParty.length === 0) break;
                    }
                }
                // Backlash: 15% max HP
                const backlash = Math.max(1, Math.floor(e.maxHealth * 0.15));
                e.health = Math.max(1, e.health - backlash);
                this._addLog(`\u{1F9D9} ${eName} takes ${backlash} arcane backlash damage!`);
            } else if (e.battleMageTurn % 2 === 1) {
                // Odd turns: 2 melee attacks
                for (let ai = 0; ai < 2; ai++) {
                    if (this.aliveFront.length === 0) break;
                    const target = this.aliveFront[Math.floor(Math.random() * this.aliveFront.length)];
                    if (!this._enemyCanAttemptStaminaAttack(e)) break;
                    this._spendEnemyStamina(e);
                    let dmg = randomInt(dmin, dmax);
                    dmg = Math.max(1, Math.round(dmg * MONSTER_DAMAGE_MULTIPLIER * 1.20));
                    dmg = Math.max(1, dmg + this._getEnemyDamageMod(e));
                    this._applyEnemyHit(e, target, dmg, 'melee');
                }
            } else if (this._enemyCanAttemptManaAttack(e) && this.aliveParty.length > 0) {
                // Even turns: AoE magic blast
                this._spendEnemyMana(e);
                let dmg = randomInt(mdmin, mdmax);
                dmg = Math.max(1, Math.round(dmg * MONSTER_DAMAGE_MULTIPLIER));
                dmg = Math.max(1, dmg + this._getEnemyDamageMod(e, 'magic'));
                this._addLog(`\u{1F9D9} ${eName} unleashes an arcane blast at the party!`);
                for (const target of this.aliveParty.slice()) {
                    this._applyEnemyHit(e, target, dmg, 'magic', { aoe: true });
                    if (this.aliveParty.length === 0) break;
                }
            }

        // ── Iron Golem: 1 powerful melee + 50%/round poison gas AoE; half magic (via halfMagicDamage) ──
        } else if (typeDef.isIronGolemAI) {
            const bonus = 25;
            const dmin = MONSTER_MELEE_DAMAGE_MIN + bonus + MONSTER_DAMAGE_PER_LEVEL * lvlBoost + MONSTER_DAMAGE_BONUS_PER_LEVEL * lvlThreeBonus;
            const dmax = MONSTER_MELEE_DAMAGE_MAX + bonus + MONSTER_DAMAGE_PER_LEVEL * lvlBoost + MONSTER_DAMAGE_BONUS_PER_LEVEL * lvlThreeBonus;
            // 50% chance each round to exhale poison gas (can combine with melee in the same round)
            if (Math.random() < 0.50 && this.aliveParty.length > 0) {
                this._addLog(`⚙️ ${eName} exhales a choking cloud of POISON GAS!`);
                for (const target of this.aliveParty.slice()) {
                    if (this._isPoisonImmunePartyMember(target)) {
                        this._addLog(`🟢 ${target.name} is immune to the poison gas!`);
                    } else {
                        const poisonTick = Math.max(2, Math.floor(dlvl * 0.5));
                        target.addEffect({ type: 'poison', rounds: POISON_DURATION_ROUNDS + 2, damage: poisonTick });
                        this._addLog(`\u{1F7E2} ${target.name} chokes on poison gas! (${poisonTick}/rd)`);
                    }
                    if (this.aliveParty.length === 0) break;
                }
            }
            if (this.aliveFront.length > 0 && this._enemyCanAttemptStaminaAttack(e)) {
                const target = this.aliveFront[Math.floor(Math.random() * this.aliveFront.length)];
                this._spendEnemyStamina(e);
                let dmg = randomInt(dmin, dmax);
                dmg = Math.max(1, Math.round(dmg * MONSTER_DAMAGE_MULTIPLIER));
                dmg = Math.max(1, dmg + this._getEnemyDamageMod(e));
                this._addLog(`⚙️ ${eName} swings a massive iron fist at ${target.name}!`);
                this._applyEnemyHit(e, target, dmg, 'melee');
            }

        // ── Clockwork Horror: 3 rapid attacks; fully immune to magic/DoTs (in _damageEnemy/_tickEnemyEffects); double acid ──
        } else if (typeDef.isClockworkHorrorAI) {
            const dmin = MONSTER_MELEE_DAMAGE_MIN + MONSTER_DAMAGE_PER_LEVEL * lvlBoost + MONSTER_DAMAGE_BONUS_PER_LEVEL * lvlThreeBonus;
            const dmax = MONSTER_MELEE_DAMAGE_MAX + MONSTER_DAMAGE_PER_LEVEL * lvlBoost + MONSTER_DAMAGE_BONUS_PER_LEVEL * lvlThreeBonus;
            this._addLog(`⚙️ ${eName} lashes out with rapid mechanical strikes!`);
            const anyAlive = this.aliveParty;
            for (let ai = 0; ai < 3 && anyAlive.length > 0; ai++) {
                const target = anyAlive[Math.floor(Math.random() * anyAlive.length)];
                if (!this._enemyCanAttemptStaminaAttack(e)) break;
                this._spendEnemyStamina(e);
                let dmg = randomInt(dmin, dmax);
                dmg = Math.max(1, Math.round(dmg * MONSTER_DAMAGE_MULTIPLIER));
                dmg = Math.max(1, dmg + this._getEnemyDamageMod(e));
                this._applyEnemyHit(e, target, dmg, 'melee');
            }

        // ── Gargoyle Sentinel: Phase 1 (>50% HP, 50% dmg reduction in _damageEnemy), Phase 2 (AoE stun), regen ──
        } else if (typeDef.isGargoyleSentinelAI) {
            const dmin = MONSTER_MELEE_DAMAGE_MIN + 2 + MONSTER_DAMAGE_PER_LEVEL * lvlBoost + MONSTER_DAMAGE_BONUS_PER_LEVEL * lvlThreeBonus;
            const dmax = MONSTER_MELEE_DAMAGE_MAX + 2 + MONSTER_DAMAGE_PER_LEVEL * lvlBoost + MONSTER_DAMAGE_BONUS_PER_LEVEL * lvlThreeBonus;
            // Transition to Phase 2
            if (!e.gargoylePhase2 && e.health <= e.maxHealth * 0.50) {
                e.gargoylePhase2 = true;
                this._addLog(`\u{1FAA8} ${eName}'s stone shell CRACKS — it erupts into a furious Phase 2!`);
            }
            if (e.gargoylePhase2) {
                // Phase 2: standard melee +5 bonus + AoE wing buffet stun attempt
                const bonus2 = 5;
                const p2dmin = MONSTER_MELEE_DAMAGE_MIN + bonus2 + MONSTER_DAMAGE_PER_LEVEL * lvlBoost + MONSTER_DAMAGE_BONUS_PER_LEVEL * lvlThreeBonus;
                const p2dmax = MONSTER_MELEE_DAMAGE_MAX + bonus2 + MONSTER_DAMAGE_PER_LEVEL * lvlBoost + MONSTER_DAMAGE_BONUS_PER_LEVEL * lvlThreeBonus;
                if (this.aliveFront.length > 0 && this._enemyCanAttemptStaminaAttack(e)) {
                    const target = this.aliveFront[Math.floor(Math.random() * this.aliveFront.length)];
                    this._spendEnemyStamina(e);
                    let dmg = randomInt(p2dmin, p2dmax);
                    dmg = Math.max(1, Math.round(dmg * MONSTER_DAMAGE_MULTIPLIER));
                    dmg = Math.max(1, dmg + this._getEnemyDamageMod(e));
                    this._addLog(`\u{1FAA8} ${eName} batters ${target.name} with savage stone fists!`);
                    this._applyEnemyHit(e, target, dmg, 'melee');
                }
                // Wing buffet AoE: front row, stun attempt each
                if (this._enemyCanAttemptManaAttack(e) && this.aliveFront.length > 0) {
                    this._spendEnemyMana(e);
                    let buffetDmg = randomInt(p2dmin, p2dmax);
                    buffetDmg = Math.max(1, Math.round(buffetDmg * MONSTER_DAMAGE_MULTIPLIER * 0.6));
                    this._addLog(`\u{1FAA8} ${eName} beats its wings — a crushing buffet hits the front line!`);
                    for (const target of this.aliveFront.slice()) {
                        const _hit = this._applyEnemyHit(e, target, buffetDmg, 'melee', { aoe: true });
                        if (_hit && _hit.health > 0) this._tryApplyStun(_hit);
                        if (this.aliveParty.length === 0) break;
                    }
                }
            } else {
                // Phase 1: standard melee (damage reduction in _damageEnemy)
                if (this.aliveFront.length > 0 && this._enemyCanAttemptStaminaAttack(e)) {
                    const target = this.aliveFront[Math.floor(Math.random() * this.aliveFront.length)];
                    this._spendEnemyStamina(e);
                    let dmg = randomInt(dmin, dmax);
                    dmg = Math.max(1, Math.round(dmg * MONSTER_DAMAGE_MULTIPLIER));
                    dmg = Math.max(1, dmg + this._getEnemyDamageMod(e));
                    this._addLog(`\u{1FAA8} ${eName} [PHASE 1] swings with a ponderous stone arm at ${target.name}!`);
                    this._applyEnemyHit(e, target, dmg, 'melee');
                }
            }

        // ── Gibbering Mouther: attacks all front row, 30% gibbering madness, splits at 50% HP once ──
        } else if (typeDef.isGibberingMoutherAI) {
            const dmin = MONSTER_MELEE_DAMAGE_MIN + MONSTER_DAMAGE_PER_LEVEL * lvlBoost + MONSTER_DAMAGE_BONUS_PER_LEVEL * lvlThreeBonus;
            const dmax = MONSTER_MELEE_DAMAGE_MAX + MONSTER_DAMAGE_PER_LEVEL * lvlBoost + MONSTER_DAMAGE_BONUS_PER_LEVEL * lvlThreeBonus;
            // Split at 50% HP (only original, not split copies)
            if (!e.gibberingHasSplit && !e.isGibberingCopy && e.health <= e.maxHealth * 0.50) {
                e.gibberingHasSplit = true;
                this._addLog(`\u{1F9EB} ${eName} splits into two writhing masses!`);
                // Spawn 2 copies each with 30% of original max HP
                for (let si = 0; si < 2; si++) {
                    const copyHP = Math.max(1, Math.floor(e.maxHealth * 0.30));
                    const copyDef = Math.floor((e.defense || 0) * 0.5);
                    const copyId = 'gibbering_copy_' + Date.now().toString(36) + '_' + si;
                    const copy = {
                        id: copyId, type: e.type, health: copyHP, maxHealth: copyHP,
                        defense: copyDef, stamina: e.maxStamina || 20, maxStamina: e.maxStamina || 20,
                        mana: e.maxMana || 10, maxMana: e.maxMana || 10,
                        level: e.level || dlvl, activeEffects: [], isGibberingCopy: true,
                        isMegaBoss: false, isBoss: false, charmedRounds: 0, gibberingHasSplit: true,
                        stunned: false, bossAtkBonus: 0, bossDL: 0, charmerId: null,
                        seed: Math.floor(Math.random() * 100000),
                        name: null, sprite: null, createSprite: () => {},
                        addEffect: function(fx) { this.activeEffects.push(fx); },
                    };
                    this.enemies.push(copy);
                    const copyInit = 1 + Math.floor(Math.random() * 6);
                    this._initiativeOrder.push({ kind: 'enemy', ref: copy, init: copyInit, skipThisRound: true });
                    this._addLog(`\u{1F9EB} A smaller Gibbering Mouther mass lurches forward!`);
                }
            }
            // Attack entire front row
            if (this.aliveFront.length > 0 && this._enemyCanAttemptStaminaAttack(e)) {
                this._addLog(`\u{1F9EB} ${eName} chomps at everything in the front row!`);
                for (const target of this.aliveFront.slice()) {
                    if (!this._enemyCanAttemptStaminaAttack(e)) break;
                    this._spendEnemyStamina(e);
                    let dmg = randomInt(dmin, dmax);
                    dmg = Math.max(1, Math.round(dmg * MONSTER_DAMAGE_MULTIPLIER * 0.75)); // weaker per target since hitting all
                    dmg = Math.max(1, dmg + this._getEnemyDamageMod(e));
                    const _hit = this._applyEnemyHit(e, target, dmg, 'melee');
                    if (_hit && _hit.health > 0 && Math.random() < 0.30) {
                        if (this._isPsychicImmunePartyMember(_hit)) {
                            this._addLog(`\u{1F9EB} ${_hit.name} is immune to the psychic madness!`);
                        } else {
                            let resistedByDrums = false;
                            for (const bard of this._getAllBardsWithDrums()) {
                                if (Math.random() < Math.min(BARD_THUNDEROUS_DRUMS_MAX_REDUCTION, bard.level / 100)) {
                                    this._addLog(`🥁 ${_hit.name} resists the psychic madness — ${bard.name}'s Thunderous Drums shields their mind!`);
                                    soundManager.playThunderousDrums();
                                    resistedByDrums = true;
                                    break;
                                }
                            }
                            if (!resistedByDrums && this._tryApplyStun(_hit)) {
                                this._addLog(`\u{1F9EB} ${_hit.name} is driven to gibbering madness — stunned with psychic confusion!`);
                            }
                        }
                    }
                    if (this.aliveParty.length === 0) break;
                }
            }

        // ── Aboleth: AoE psychic attack; 40%/target loses turn (level/10 rounds); half physical; water elemental bonus ──
        } else if (typeDef.isAbolethAI) {
            const dmin = MONSTER_MAGIC_DAMAGE_MIN + 2 + MONSTER_DAMAGE_PER_LEVEL * lvlBoost + MONSTER_DAMAGE_BONUS_PER_LEVEL * lvlThreeBonus;
            const dmax = MONSTER_MAGIC_DAMAGE_MAX + 2 + MONSTER_DAMAGE_PER_LEVEL * lvlBoost + MONSTER_DAMAGE_BONUS_PER_LEVEL * lvlThreeBonus;
            // Water elemental bonus: if a water_elemental is in the enemy roster (hostile), both gain +25% dmg
            const hasWaterEleAlly = this.aliveHostileEnemies.some(ally => ally !== e && ally.type === 'water_elemental');
            let dmgMult = MONSTER_DAMAGE_MULTIPLIER * (hasWaterEleAlly ? 1.25 : 1.0);
            if (hasWaterEleAlly) this._addLog(`\u{1F30A} ${eName} and its water elemental ally surge in power! (+25% damage)`);
            if (this._enemyCanAttemptManaAttack(e) && this.aliveParty.length > 0) {
                this._spendEnemyMana(e);
                let dmg = randomInt(dmin, dmax);
                dmg = Math.max(1, Math.round(dmg * dmgMult));
                dmg = Math.max(1, dmg + this._getEnemyDamageMod(e, 'magic'));
                this._addLog(`\u{1F9E0} ${eName} assaults every mind with psychic tendrils!`);
                const enslaveDuration = Math.max(1, Math.floor(dlvl / 10));
                for (const target of this.aliveParty.slice()) {
                    const _hit = this._applyEnemyHit(e, target, dmg, 'magic', { aoe: true, psychic: true });
                    if (_hit && _hit.health > 0 && Math.random() < 0.40) {
                        if (this._isPsychicImmunePartyMember(_hit)) {
                            this._addLog(`\u{1F9E0} ${_hit.name} is immune to psychic enslavement!`);
                        } else if (this._isHoldImmunePartyMember(_hit)) {
                            this._addLog(`\u{1F9E0} ${_hit.name} cannot be restrained by the enslavement!`);
                        } else {
                            let _abolResisted = false;
                            for (const _bd of this._getAllBardsWithDrums()) {
                                if (Math.random() < Math.min(BARD_THUNDEROUS_DRUMS_MAX_REDUCTION, _bd.level / 100)) {
                                    this._addLog(`🥁 ${_hit.name} resists ${eName}'s enslavement — ${_bd.name}'s Thunderous Drums shields their mind!`);
                                    soundManager.playThunderousDrums();
                                    _abolResisted = true;
                                    break;
                                }
                            }
                            if (!_abolResisted) {
                                _hit.webbedRounds = Math.max(_hit.webbedRounds || 0, enslaveDuration);
                                if ((_hit.webbedRounds || 0) > 0) {
                                    _hit.abolethEnslavedRounds = Math.max(_hit.abolethEnslavedRounds || 0, enslaveDuration);
                                    this._addLog(`\u{1F9E0} ${_hit.name} is mentally enslaved — too confused to act! (${enslaveDuration} rds)`);
                                }
                            }
                        }
                    }
                    if (this.aliveParty.length === 0) break;
                }
            }

        // ── Star Spawn: AoE random effect each turn (magic dmg / mana drain / debuff / stun); DoT immune ──
        } else if (typeDef.isStarSpawnAI) {
            const dmin = MONSTER_MAGIC_DAMAGE_MIN + 3 + MONSTER_DAMAGE_PER_LEVEL * lvlBoost + MONSTER_DAMAGE_BONUS_PER_LEVEL * lvlThreeBonus;
            const dmax = MONSTER_MAGIC_DAMAGE_MAX + 3 + MONSTER_DAMAGE_PER_LEVEL * lvlBoost + MONSTER_DAMAGE_BONUS_PER_LEVEL * lvlThreeBonus;
            this._addLog(`⭐ ${eName} warps reality — eldritch energy washes over the party!`);
            for (const target of this.aliveParty.slice()) {
                const roll = Math.random();
                if (roll < 0.35) {
                    // Magic damage
                    let dmg = randomInt(dmin, dmax);
                    dmg = Math.max(1, Math.round(dmg * MONSTER_DAMAGE_MULTIPLIER));
                    this._applyEnemyHit(e, target, dmg, 'magic', { aoe: true });
                } else if (roll < 0.55) {
                    // Mana drain
                    const drain = Math.max(1, Math.floor(target.maxMana * 0.20));
                    if (this._isResourceDrainImmunePartyMember(target, 'mana')) {
                        this._addLog(`⭐ ${target.name}'s mind cannot be hollowed for mana drain!`);
                    } else {
                        target.mana = Math.max(0, target.mana - drain);
                        this._addLog(`⭐ ${target.name}'s mind is hollowed — loses ${drain} mana!`);
                    }
                } else if (roll < 0.75) {
                    // Stat debuff
                    const penalty = Math.max(1, Math.floor(dlvl / 5));
                    target.addEffect({ type: 'wither', damageBonus: -penalty, rounds: 2 });
                    this._addLog(`⭐ ${target.name} is warped by eldritch energy! (-${penalty} damage for 2 rds)`);
                } else {
                    // Stun
                    this._tryApplyStun(target);
                }
                if (this.aliveParty.length === 0) break;
            }

        // ── Void Wraith: phase-strike drains HP+mana, half physical (resistPhysical), on kill +10% damage ──
        } else if (typeDef.isVoidWraithAI) {
            const dmin = MONSTER_MELEE_DAMAGE_MIN + 2 + MONSTER_DAMAGE_PER_LEVEL * lvlBoost + MONSTER_DAMAGE_BONUS_PER_LEVEL * lvlThreeBonus;
            const dmax = MONSTER_MELEE_DAMAGE_MAX + 2 + MONSTER_DAMAGE_PER_LEVEL * lvlBoost + MONSTER_DAMAGE_BONUS_PER_LEVEL * lvlThreeBonus;
            const dmgBonus = 1.0 + (e.voidWraithKillBonus || 0) * 0.10;
            const anyAlive = this.aliveParty;
            if (anyAlive.length > 0 && this._enemyCanAttemptStaminaAttack(e)) {
                const target = anyAlive[Math.floor(Math.random() * anyAlive.length)];
                this._spendEnemyStamina(e);
                let dmg = randomInt(dmin, dmax);
                dmg = Math.max(1, Math.round(dmg * MONSTER_DAMAGE_MULTIPLIER * dmgBonus));
                dmg = Math.max(1, dmg + this._getEnemyDamageMod(e));
                const prevHP = target.health;
                this._addLog(`\u{1F573}️ ${eName} phases through the void and tears at ${target.name}'s life force!`);
                this._applyEnemyHit(e, target, dmg, 'melee', { phaseStrike: true, skipInterceptors: true });
                const dealt = Math.max(0, prevHP - target.health);
                if (dealt > 0) {
                    // Drain 25% of dealt as HP and mana
                    const drain = Math.floor(dealt * 0.25);
                    e.health = Math.min(e.maxHealth, e.health + drain);
                    if (this._isResourceDrainImmunePartyMember(target, 'mana')) {
                        this._addLog(`\u{1F573}️ ${eName} drains ${drain} HP from ${target.name}, but cannot drain mana!`);
                    } else {
                        target.mana = Math.max(0, target.mana - Math.min(target.mana, drain));
                        this._addLog(`\u{1F573}️ ${eName} drains ${drain} HP and mana from ${target.name}!`);
                    }
                }
                if (target.health <= 0) {
                    e.voidWraithKillBonus = (e.voidWraithKillBonus || 0) + 1;
                    this._addLog(`\u{1F573}️ ${eName} absorbs ${target.name}'s essence — grows ${((e.voidWraithKillBonus) * 10)}% stronger!`);
                }
            }

        // ── Vampire Lord: gaseous near death, life drain, summons spawn, AoE hypnotic gaze ──
        } else if (typeDef.isVampireLordAI) {
            const dmin = MONSTER_MELEE_DAMAGE_MIN + 4 + MONSTER_DAMAGE_PER_LEVEL * lvlBoost + MONSTER_DAMAGE_BONUS_PER_LEVEL * lvlThreeBonus;
            const dmax = MONSTER_MELEE_DAMAGE_MAX + 4 + MONSTER_DAMAGE_PER_LEVEL * lvlBoost + MONSTER_DAMAGE_BONUS_PER_LEVEL * lvlThreeBonus;
            // Gaseous form: enter when HP < 15%, exit after 2 rounds
            if (!e.vampireLordGaseous && e.health < e.maxHealth * 0.15 && !e.vampireLordGaseousUsed) {
                e.vampireLordGaseous = true;
                e.vampireLordGaseousUsed = true;
                e.vampireLordGaseousRounds = 2;
                this._addLog(`\u{1F9DB} ${eName} dissolves into a gaseous mist — nearly impossible to harm!`);
                return;
            }
            if (e.vampireLordGaseous) {
                e.vampireLordGaseousRounds = (e.vampireLordGaseousRounds || 1) - 1;
                this._addLog(`\u{1F9DB} ${eName} swirls as mist, regenerating...`);
                e.health = Math.min(e.maxHealth, e.health + Math.floor(e.maxHealth * 0.10));
                if (e.vampireLordGaseousRounds <= 0) {
                    e.vampireLordGaseous = false;
                    this._addLog(`\u{1F9DB} ${eName} re-solidifies, restored and dangerous!`);
                }
                return;
            }
            const roll = Math.random();
            if (roll < 0.20 && this._enemyCanAttemptManaAttack(e) && this.aliveParty.length > 0) {
                // AoE hypnotic gaze: charm 1-2 party members (webbedRounds)
                this._spendEnemyMana(e);
                const count = 1 + (Math.random() < 0.50 ? 1 : 0);
                const shuffled = this.aliveParty.slice().sort(() => Math.random() - 0.5);
                this._addLog(`\u{1F9DB} ${eName} fixes the party with a hypnotic gaze!`);
                for (let gi = 0; gi < Math.min(count, shuffled.length); gi++) {
                    if (this._isPsychicImmunePartyMember(shuffled[gi])) {
                        this._addLog(`\u{1F49C} ${shuffled[gi].name} is immune to the hypnotic gaze!`);
                    } else if (this._isHoldImmunePartyMember(shuffled[gi])) {
                        this._addLog(`\u{1F49C} ${shuffled[gi].name} cannot be held by the hypnotic gaze!`);
                    } else {
                        let _vampResisted = false;
                        for (const _bd of this._getAllBardsWithDrums()) {
                            if (Math.random() < Math.min(BARD_THUNDEROUS_DRUMS_MAX_REDUCTION, _bd.level / 100)) {
                                this._addLog(`🥁 ${shuffled[gi].name} resists the hypnotic gaze — ${_bd.name}'s Thunderous Drums!`);
                                soundManager.playThunderousDrums();
                                _vampResisted = true;
                                break;
                            }
                        }
                        if (!_vampResisted) {
                            shuffled[gi].webbedRounds = Math.max(shuffled[gi].webbedRounds || 0, 2);
                            this._addLog(`\u{1F49C} ${shuffled[gi].name} is hypnotised — cannot act for 2 rounds!`);
                        }
                    }
                }
            } else if (roll < 0.40 && this.aliveParty.length > 0) {
                // Summon Vampire Spawn
                this._summonEnemyMinion(e, 'vampire_spawn', '\u{1F9DB}');
            } else if (this.aliveParty.length > 0 && this._enemyCanAttemptStaminaAttack(e)) {
                // Life drain melee — any target
                const target = this.aliveParty[Math.floor(Math.random() * this.aliveParty.length)];
                this._spendEnemyStamina(e);
                let dmg = randomInt(dmin, dmax);
                dmg = Math.max(1, Math.round(dmg * MONSTER_DAMAGE_MULTIPLIER));
                dmg = Math.max(1, dmg + this._getEnemyDamageMod(e));
                const prevHP = target.health;
                this._addLog(`\u{1F9DB} ${eName} lunges at ${target.name} with fanged fury!`);
                this._applyEnemyHit(e, target, dmg, 'melee');
                const dealt = Math.max(0, prevHP - target.health);
                if (dealt > 0) {
                    const lifeSteal = Math.floor(dealt * typeDef.lifeDrain);
                    e.health = Math.min(e.maxHealth, e.health + lifeSteal);
                    if (lifeSteal > 0) this._addLog(`\u{1F9DB} ${eName} drains ${lifeSteal} HP!`);
                }
            }

        // ── Myconid Sovereign: AoE spore every turn; 60% spawn 1-2 myconids; death spore on death ──
        } else if (typeDef.isMyconidSovereignAI) {
            const dmin = MONSTER_MAGIC_DAMAGE_MIN + MONSTER_DAMAGE_PER_LEVEL * lvlBoost + MONSTER_DAMAGE_BONUS_PER_LEVEL * lvlThreeBonus;
            const dmax = MONSTER_MAGIC_DAMAGE_MAX + MONSTER_DAMAGE_PER_LEVEL * lvlBoost + MONSTER_DAMAGE_BONUS_PER_LEVEL * lvlThreeBonus;
            if (this._enemyCanAttemptManaAttack(e) && this.aliveParty.length > 0) {
                this._spendEnemyMana(e);
                let dmg = randomInt(dmin, dmax);
                dmg = Math.max(1, Math.round(dmg * MONSTER_DAMAGE_MULTIPLIER));
                dmg = Math.max(1, dmg + this._getEnemyDamageMod(e, 'magic'));
                this._addLog(`\u{1F344} ${eName} erupts in a toxic spore cloud!`);
                for (const target of this.aliveParty.slice()) {
                    const _hit = this._applyEnemyHit(e, target, dmg, 'magic', { aoe: true });
                    if (_hit && _hit.health > 0) {
                        if (this._isPoisonImmunePartyMember(_hit)) {
                            this._addLog(`🟢 ${_hit.name} is immune to the spores!`);
                        } else {
                            const poisonTick = Math.max(1, Math.floor(dmg * 0.40));
                            _hit.addEffect({ type: 'poison', rounds: POISON_DURATION_ROUNDS, damage: poisonTick });
                            this._addLog(`\u{1F7E2} ${_hit.name} chokes on spores! (${poisonTick}/rd)`);
                        }
                    }
                    if (this.aliveParty.length === 0) break;
                }
            }
            if (Math.random() < 0.60) {
                const spawnCount = 1 + (Math.random() < 0.50 ? 1 : 0);
                for (let si = 0; si < spawnCount; si++) {
                    this._summonEnemyMinion(e, 'myconid', '\u{1F344}');
                }
            }

        // ── Will-o'-Wisp: flat 25% max-HP ethereal strike + 50% death chance (lich form immune) ──
        } else if (typeDef.isWillOWispAI) {
            const wispTargets = this.aliveParty.filter(t => {
                if (!t || t.health <= 0) return false;
                if (this._hasShadowStep(t)) return false;
                if (t.isLichForm) return false;
                if (t.isSummoned) {
                    if (UNDEAD_TIERS.some(ut => ut.id === t.summonType) || t.summonType === 'demi_lich' || t.summonType === 'corpse_horror') return false;
                    if (GOLEM_PRESETS[t.summonType] || t.summonType === 'spiritual_weapon') return false;
                    if (['rift_fire', 'rift_water', 'rift_earth', 'rift_air'].includes(t.summonType)) return false;
                }
                return true;
            });
            if (wispTargets.length === 0) {
                this._addLog(`👻 ${eName} drifts past — no living souls to haunt.`);
            } else {
                const target = wispTargets[Math.floor(Math.random() * wispTargets.length)];
                const flatDmg = Math.max(1, Math.floor(target.maxHealth * 0.25));
                this._addLog(`👻 ${eName}'s eerie death-light engulfs ${target.name}!`);
                target.health = Math.max(0, target.health - flatDmg);
                if (target.health <= 0) {
                    this._addLog(`👻 ${target.name} suffers ${flatDmg} ethereal damage and is defeated!`);
                } else {
                    this._addLog(`👻 ${target.name} suffers ${flatDmg} ethereal damage!`);
                    // 50% death chance reduced by random(0..level)%
                    const reduction = Math.random() * (target.level || 1) * 0.01;
                    const deathChance = Math.max(0, 0.50 - reduction);
                    if (deathChance > 0 && Math.random() < deathChance) {
                        target.health = 0;
                        this._addLog(`💀 The wisp's death-light snuffs out ${target.name}'s life force!`);
                    }
                }
            }

        // ── Roper: 6 ranged tentacle attacks + 1 melee bite ──────────────
        } else if (typeDef.isRoperAI) {
            const rLvl = e.level || 1;
            const tentacleDur = Math.max(1, Math.floor(rLvl / 10));
            const dminT = MONSTER_MELEE_DAMAGE_MIN + 2 + MONSTER_DAMAGE_PER_LEVEL * lvlBoost + MONSTER_DAMAGE_BONUS_PER_LEVEL * lvlThreeBonus;
            const dmaxT = MONSTER_MELEE_DAMAGE_MAX + 2 + MONSTER_DAMAGE_PER_LEVEL * lvlBoost + MONSTER_DAMAGE_BONUS_PER_LEVEL * lvlThreeBonus;
            for (let ti = 0; ti < 6; ti++) {
                if (this.aliveParty.length === 0) break;
                if (!this._enemyCanAttemptStaminaAttack(e)) break;
                this._spendEnemyStamina(e);
                const target = this.aliveParty[Math.floor(Math.random() * this.aliveParty.length)];
                let dmg = randomInt(dminT, dmaxT);
                dmg = Math.max(1, Math.round(dmg * MONSTER_DAMAGE_MULTIPLIER));
                dmg = Math.max(1, dmg + this._getEnemyDamageMod(e));
                this._addLog(`🦑 ${eName} lashes at ${target.name} with a tentacle!`);
                const _roperHit = this._applyEnemyHit(e, target, dmg, 'ranged');
                if (_roperHit && _roperHit.health > 0) {
                    const poisonImmune = this._isPoisonImmunePartyMember(_roperHit)
                        || (_roperHit.isSummoned && _roperHit.summonStats?.incorporeal === true)
                        || (_roperHit.isSummoned && ['rift_fire', 'rift_water', 'rift_earth', 'rift_air'].includes(_roperHit.summonType));
                    if (!poisonImmune) {
                        // Melee stat debuff (does not stack; refresh duration)
                        const existing = (_roperHit.activeEffects || []).find(x => x && x.type === 'roper_weakness');
                        if (!existing) {
                            _roperHit.addEffect({ type: 'roper_weakness', meleeDamageBonus: -rLvl, rounds: tentacleDur });
                            this._addLog(`🦑 ${_roperHit.name}'s muscles weaken! (-${rLvl} melee for ${tentacleDur} rds)`);
                        }
                        // 50% paralysis (webbedRounds)
                        if (!this._isParalysisImmunePartyMember(_roperHit) && Math.random() < 0.50) {
                            _roperHit.webbedRounds = Math.max(_roperHit.webbedRounds || 0, tentacleDur);
                            this._addLog(`🦑 ${_roperHit.name} is PARALYZED by the roper's grip! (${tentacleDur} rds)`);
                        }
                    }
                }
            }
            // Bite: melee ×1.5 + acid DoT 50% of dealt damage for floor(level/6) rounds
            if (this.aliveParty.length > 0 && this._enemyCanAttemptStaminaAttack(e)) {
                const biteRow = this.aliveFront.length > 0 ? this.aliveFront : this.aliveParty;
                const biteTarget = biteRow[Math.floor(Math.random() * biteRow.length)];
                this._spendEnemyStamina(e);
                const dminB = MONSTER_MELEE_DAMAGE_MIN + 4 + MONSTER_DAMAGE_PER_LEVEL * lvlBoost + MONSTER_DAMAGE_BONUS_PER_LEVEL * lvlThreeBonus;
                const dmaxB = MONSTER_MELEE_DAMAGE_MAX + 4 + MONSTER_DAMAGE_PER_LEVEL * lvlBoost + MONSTER_DAMAGE_BONUS_PER_LEVEL * lvlThreeBonus;
                let biteDmg = randomInt(dminB, dmaxB);
                biteDmg = Math.max(1, Math.round(biteDmg * MONSTER_DAMAGE_MULTIPLIER));
                biteDmg = Math.max(1, biteDmg + this._getEnemyDamageMod(e));
                biteDmg = Math.max(1, Math.round(biteDmg * 1.5));
                const _ropBitePrevHP = biteTarget.health;
                this._addLog(`🦑 ${eName} lunges forward and BITES ${biteTarget.name}!`);
                const _ropBiteHit = this._applyEnemyHit(e, biteTarget, biteDmg, 'melee');
                const dealtBite = _ropBiteHit ? (_ropBiteHit === biteTarget
                    ? Math.max(0, _ropBitePrevHP - biteTarget.health)
                    : Math.max(1, biteDmg - (_ropBiteHit.getArmorBlocking ? _ropBiteHit.getArmorBlocking() : 0) - (_ropBiteHit.getTotalDefense ? _ropBiteHit.getTotalDefense() : 0)))
                    : 0;
                if (_ropBiteHit && _ropBiteHit.health > 0 && dealtBite > 0) {
                    const acidTick = Math.max(1, Math.floor(dealtBite * 0.50));
                    const acidDur  = Math.max(1, Math.floor(rLvl / 6));
                    _ropBiteHit.addEffect({ type: 'acid_dot', damage: acidTick, rounds: acidDur });
                    this._addLog(`🟢 ${_ropBiteHit.name} is coated in corrosive acid! (${acidTick}/rd for ${acidDur} rds)`);
                }
            }

        // ── Invisible Stalker: 2 melee attacks, can hit any row ──────────
        } else if (typeDef.isInvisibleStalkerAI) {
            const dmin = MONSTER_MELEE_DAMAGE_MIN + 3 + MONSTER_DAMAGE_PER_LEVEL * lvlBoost + MONSTER_DAMAGE_BONUS_PER_LEVEL * lvlThreeBonus;
            const dmax = MONSTER_MELEE_DAMAGE_MAX + 3 + MONSTER_DAMAGE_PER_LEVEL * lvlBoost + MONSTER_DAMAGE_BONUS_PER_LEVEL * lvlThreeBonus;
            for (let ai = 0; ai < 2; ai++) {
                if (this.aliveParty.length === 0) break;
                if (!this._enemyCanAttemptStaminaAttack(e)) break;
                this._spendEnemyStamina(e);
                const target = this.aliveParty[Math.floor(Math.random() * this.aliveParty.length)];
                let dmg = randomInt(dmin, dmax);
                dmg = Math.max(1, Math.round(dmg * MONSTER_DAMAGE_MULTIPLIER));
                dmg = Math.max(1, dmg + this._getEnemyDamageMod(e));
                this._addLog(`👁️ ${eName} strikes ${target.name} from the unseen void!`);
                this._applyEnemyHit(e, target, dmg, 'melee');
            }

        // ── Dark Treant: 4 branch strikes, 35% hold per hit ──────────────
        } else if (typeDef.isDarkTreantAI) {
            for (let _ti = 0; _ti < 4; _ti++) {
                if (liveFront.length === 0) break;
                if (!this._enemyCanAttemptStaminaAttack(e)) break;
                this._spendEnemyStamina(e);
                const _tTarget = liveFront[Math.floor(Math.random() * liveFront.length)];
                const _tdmin = MONSTER_MELEE_DAMAGE_MIN + MONSTER_DAMAGE_PER_LEVEL * lvlBoost + MONSTER_DAMAGE_BONUS_PER_LEVEL * lvlThreeBonus;
                const _tdmax = MONSTER_MELEE_DAMAGE_MAX + MONSTER_DAMAGE_PER_LEVEL * lvlBoost + MONSTER_DAMAGE_BONUS_PER_LEVEL * lvlThreeBonus;
                let _tdmg = randomInt(_tdmin, _tdmax);
                _tdmg = Math.max(1, Math.round(_tdmg * MONSTER_DAMAGE_MULTIPLIER));
                _tdmg = Math.max(1, _tdmg + this._getEnemyDamageMod(e));
                this._addLog(`🌑 ${eName} lashes ${_tTarget.name} with a dark branch!`);
                this._applyEnemyHit(e, _tTarget, _tdmg, 'melee');
                if (_tTarget.health > 0 && Math.random() < 0.35) {
                    if (this._isHoldImmunePartyMember(_tTarget)) {
                        this._addLog(`🌿 ${_tTarget.name} cannot be held by grasping bark!`);
                    } else {
                        _tTarget.addEffect({ type: 'web', rounds: WEB_DURATION_ROUNDS });
                        this._addLog(`🌿 ${_tTarget.name} is held fast by grasping bark! (${WEB_DURATION_ROUNDS} rds)`);
                    }
                }
            }

        // ── Mandrake Root: single melee (scream fires from _damageEnemy) ──
        } else if (typeDef.isMandrakeRootAI) {
            if (this._enemyCanAttemptStaminaAttack(e) && liveFront.length > 0) {
                this._spendEnemyStamina(e);
                const _mTarget = liveFront[Math.floor(Math.random() * liveFront.length)];
                const _mdmin = MONSTER_MELEE_DAMAGE_MIN + MONSTER_DAMAGE_PER_LEVEL * lvlBoost + MONSTER_DAMAGE_BONUS_PER_LEVEL * lvlThreeBonus;
                const _mdmax = MONSTER_MELEE_DAMAGE_MAX + MONSTER_DAMAGE_PER_LEVEL * lvlBoost + MONSTER_DAMAGE_BONUS_PER_LEVEL * lvlThreeBonus;
                let _mdmg = randomInt(_mdmin, _mdmax);
                _mdmg = Math.max(1, Math.round(_mdmg * MONSTER_DAMAGE_MULTIPLIER));
                _mdmg = Math.max(1, _mdmg + this._getEnemyDamageMod(e));
                this._addLog(`🌱 ${eName} batters ${_mTarget.name} with gnarled roots!`);
                this._applyEnemyHit(e, _mTarget, _mdmg, 'melee');
            }

        // ── Killer Vine: grabs level÷6 targets, thorn melee, 45% hold ────
        } else if (typeDef.isKillerVineAI) {
            const _kvMax = Math.max(1, Math.floor((e.level || 1) / 6));
            const _kvAll = this.aliveParty.slice();
            for (let _kvi = 0; _kvi < Math.min(_kvMax, _kvAll.length); _kvi++) {
                if (_kvAll.length === 0) break;
                if (!this._enemyCanAttemptStaminaAttack(e)) break;
                const _kvIdx = Math.floor(Math.random() * _kvAll.length);
                const _kvTarget = _kvAll.splice(_kvIdx, 1)[0];
                if (!_kvTarget || _kvTarget.health <= 0) continue;
                this._spendEnemyStamina(e);
                const _kvdmin = MONSTER_MELEE_DAMAGE_MIN + MONSTER_DAMAGE_PER_LEVEL * lvlBoost + MONSTER_DAMAGE_BONUS_PER_LEVEL * lvlThreeBonus;
                const _kvdmax = MONSTER_MELEE_DAMAGE_MAX + MONSTER_DAMAGE_PER_LEVEL * lvlBoost + MONSTER_DAMAGE_BONUS_PER_LEVEL * lvlThreeBonus;
                let _kvdmg = randomInt(_kvdmin, _kvdmax);
                _kvdmg = Math.max(1, Math.round(_kvdmg * MONSTER_DAMAGE_MULTIPLIER));
                _kvdmg = Math.max(1, _kvdmg + this._getEnemyDamageMod(e));
                this._addLog(`🌿 ${eName} ensnares ${_kvTarget.name} with razor vines!`);
                this._applyEnemyHit(e, _kvTarget, _kvdmg, 'melee');
                if (_kvTarget.health > 0 && Math.random() < 0.45) {
                    if (this._isHoldImmunePartyMember(_kvTarget)) {
                        this._addLog(`🌿 ${_kvTarget.name} cannot be pinned by constricting vines!`);
                    } else {
                        _kvTarget.addEffect({ type: 'web', rounds: WEB_DURATION_ROUNDS });
                        this._addLog(`🌿 ${_kvTarget.name} is pinned by constricting vines! (${WEB_DURATION_ROUNDS} rds)`);
                    }
                }
            }

        // ── Cave Bear: 2 claw attacks + 1 bite (front row) ───────────────
        } else if (typeDef.isCaveBearAI) {
            const _cbAtks = [
                { emoji: '🐻', verb: 'slashes' },
                { emoji: '🐻', verb: 'rakes' },
                { emoji: '🐻', verb: 'bites' },
            ];
            for (const _cbAtk of _cbAtks) {
                if (liveFront.length === 0) break;
                if (!this._enemyCanAttemptStaminaAttack(e)) break;
                this._spendEnemyStamina(e);
                const _cbTarget = liveFront[Math.floor(Math.random() * liveFront.length)];
                const _cbdmin = MONSTER_MELEE_DAMAGE_MIN + MONSTER_DAMAGE_PER_LEVEL * lvlBoost + MONSTER_DAMAGE_BONUS_PER_LEVEL * lvlThreeBonus;
                const _cbdmax = MONSTER_MELEE_DAMAGE_MAX + MONSTER_DAMAGE_PER_LEVEL * lvlBoost + MONSTER_DAMAGE_BONUS_PER_LEVEL * lvlThreeBonus;
                let _cbdmg = randomInt(_cbdmin, _cbdmax);
                _cbdmg = Math.max(1, Math.round(_cbdmg * MONSTER_DAMAGE_MULTIPLIER));
                _cbdmg = Math.max(1, _cbdmg + this._getEnemyDamageMod(e));
                this._addLog(`${_cbAtk.emoji} ${eName} ${_cbAtk.verb} ${_cbTarget.name}!`);
                this._applyEnemyHit(e, _cbTarget, _cbdmg, 'melee');
            }

        // ── Cave Lion: 2 claw attacks + 1 bite (front row) ───────────────
        } else if (typeDef.isCaveLionAI) {
            const _clAtks = [
                { emoji: '🦁', verb: 'claws' },
                { emoji: '🦁', verb: 'rakes' },
                { emoji: '🦁', verb: 'bites' },
            ];
            for (const _clAtk of _clAtks) {
                if (liveFront.length === 0) break;
                if (!this._enemyCanAttemptStaminaAttack(e)) break;
                this._spendEnemyStamina(e);
                const _clTarget = liveFront[Math.floor(Math.random() * liveFront.length)];
                const _cldmin = MONSTER_MELEE_DAMAGE_MIN + MONSTER_DAMAGE_PER_LEVEL * lvlBoost + MONSTER_DAMAGE_BONUS_PER_LEVEL * lvlThreeBonus;
                const _cldmax = MONSTER_MELEE_DAMAGE_MAX + MONSTER_DAMAGE_PER_LEVEL * lvlBoost + MONSTER_DAMAGE_BONUS_PER_LEVEL * lvlThreeBonus;
                let _cldmg = randomInt(_cldmin, _cldmax);
                _cldmg = Math.max(1, Math.round(_cldmg * MONSTER_DAMAGE_MULTIPLIER));
                _cldmg = Math.max(1, _cldmg + this._getEnemyDamageMod(e));
                this._addLog(`${_clAtk.emoji} ${eName} ${_clAtk.verb} ${_clTarget.name}!`);
                this._applyEnemyHit(e, _clTarget, _cldmg, 'melee');
            }

        // ── Winter Wolf: bite + 50% cold breath AoE with frost DoT ────────
        } else if (typeDef.isWinterWolfAI) {
            if (this._enemyCanAttemptStaminaAttack(e) && liveFront.length > 0) {
                this._spendEnemyStamina(e);
                const _wwTarget = liveFront[Math.floor(Math.random() * liveFront.length)];
                const _wwdmin = MONSTER_MELEE_DAMAGE_MIN + MONSTER_DAMAGE_PER_LEVEL * lvlBoost + MONSTER_DAMAGE_BONUS_PER_LEVEL * lvlThreeBonus;
                const _wwdmax = MONSTER_MELEE_DAMAGE_MAX + MONSTER_DAMAGE_PER_LEVEL * lvlBoost + MONSTER_DAMAGE_BONUS_PER_LEVEL * lvlThreeBonus;
                let _wwdmg = randomInt(_wwdmin, _wwdmax);
                _wwdmg = Math.max(1, Math.round(_wwdmg * MONSTER_DAMAGE_MULTIPLIER));
                _wwdmg = Math.max(1, _wwdmg + this._getEnemyDamageMod(e));
                this._addLog(`🐺 ${eName} snaps at ${_wwTarget.name} with frost-rimed jaws!`);
                this._applyEnemyHit(e, _wwTarget, _wwdmg, 'melee');
            }
            if (Math.random() < 0.50 && this._enemyCanAttemptManaAttack(e) && this.aliveParty.length > 0) {
                this._spendEnemyMana(e);
                const _wwbdmin = MONSTER_MAGIC_DAMAGE_MIN + MONSTER_DAMAGE_PER_LEVEL * lvlBoost + MONSTER_DAMAGE_BONUS_PER_LEVEL * lvlThreeBonus;
                const _wwbdmax = MONSTER_MAGIC_DAMAGE_MAX + MONSTER_DAMAGE_PER_LEVEL * lvlBoost + MONSTER_DAMAGE_BONUS_PER_LEVEL * lvlThreeBonus;
                let _wwbdmg = randomInt(_wwbdmin, _wwbdmax);
                _wwbdmg = Math.max(1, Math.round(_wwbdmg * MONSTER_DAMAGE_MULTIPLIER));
                _wwbdmg = Math.max(1, _wwbdmg + this._getEnemyDamageMod(e, 'magic'));
                this._addLog(`❄️ ${eName} exhales a blizzard — the whole party is engulfed in freezing cold!`);
                const _wwBreathTargets = this.aliveParty.slice();
                for (const _wwbt of _wwBreathTargets) {
                    if (_wwbt.health <= 0) continue;
                    this._applyEnemyHit(e, _wwbt, _wwbdmg, 'magic', { aoe: true });
                    if (_wwbt.health > 0) {
                        const _wwFrostTick = Math.max(1, Math.floor(_wwbdmg * 0.50));
                        _wwbt.addEffect({ type: 'frost_dot', rounds: 3, damage: _wwFrostTick });
                        this._addLog(`❄️ ${_wwbt.name} is frostbitten! (${_wwFrostTick}/rd, 3 rds)`);
                    }
                    if (this.aliveParty.length === 0) break;
                }
            }

        // ── Lizard Folk: single melee (shieldBlock handled by _damageEnemy) ─
        } else if (typeDef.isLizardFolkAI) {
            if (this._enemyCanAttemptStaminaAttack(e) && liveFront.length > 0) {
                this._spendEnemyStamina(e);
                const _lfTarget = liveFront[Math.floor(Math.random() * liveFront.length)];
                const _lfdmin = MONSTER_MELEE_DAMAGE_MIN + MONSTER_DAMAGE_PER_LEVEL * lvlBoost + MONSTER_DAMAGE_BONUS_PER_LEVEL * lvlThreeBonus;
                const _lfdmax = MONSTER_MELEE_DAMAGE_MAX + MONSTER_DAMAGE_PER_LEVEL * lvlBoost + MONSTER_DAMAGE_BONUS_PER_LEVEL * lvlThreeBonus;
                let _lfdmg = randomInt(_lfdmin, _lfdmax);
                _lfdmg = Math.max(1, Math.round(_lfdmg * MONSTER_DAMAGE_MULTIPLIER));
                _lfdmg = Math.max(1, _lfdmg + this._getEnemyDamageMod(e));
                this._addLog(`🦎 ${eName} strikes ${_lfTarget.name} with a scaled fist!`);
                this._applyEnemyHit(e, _lfTarget, _lfdmg, 'melee');
            }

        // ── Dread Cultist: AoE magic + 50% summon random demon ────────────
        } else if (typeDef.isDreadCultistAI) {
            if (this._enemyCanAttemptManaAttack(e)) {
                this._spendEnemyMana(e);
                const _dcdmin = MONSTER_MAGIC_DAMAGE_MIN + MONSTER_DAMAGE_PER_LEVEL * lvlBoost + MONSTER_DAMAGE_BONUS_PER_LEVEL * lvlThreeBonus;
                const _dcdmax = MONSTER_MAGIC_DAMAGE_MAX + MONSTER_DAMAGE_PER_LEVEL * lvlBoost + MONSTER_DAMAGE_BONUS_PER_LEVEL * lvlThreeBonus;
                let _dcdmg = randomInt(_dcdmin, _dcdmax);
                _dcdmg = Math.max(1, Math.round(_dcdmg * MONSTER_DAMAGE_MULTIPLIER));
                _dcdmg = Math.max(1, _dcdmg + this._getEnemyDamageMod(e, 'magic'));
                this._addLog(`😈 ${eName} screams an abyssal chant — dark energy tears through the party!`);
                const _dcAoeTargets = this.aliveParty.slice();
                for (const _dct of _dcAoeTargets) {
                    this._applyEnemyHit(e, _dct, _dcdmg, 'magic', { aoe: true });
                    if (this.aliveParty.length === 0) break;
                }
            }
            if (Math.random() < 0.50 && this.aliveParty.length > 0) {
                const _demonPool = ['imp', 'flame_imp', 'quasit', 'dust_devil', 'demon_knight', 'succubus', 'chain_devil'];
                const _demonType = _demonPool[Math.floor(Math.random() * _demonPool.length)];
                this._summonEnemyMinion(e, _demonType, '😈');
            }

        // ── Imp: single ranged attack targeting any row ───────────────────
        } else if (typeDef.rangedAny && this._enemyCanAttemptStaminaAttack(e)) {
            this._spendEnemyStamina(e);
            // Pick a random living party member from *any* row
            const anyAlive = this.aliveParty;
            const target = anyAlive[Math.floor(Math.random() * anyAlive.length)];
            const dmin = MONSTER_MELEE_DAMAGE_MIN + MONSTER_DAMAGE_PER_LEVEL * lvlBoost + MONSTER_DAMAGE_BONUS_PER_LEVEL * lvlThreeBonus;
            const dmax = MONSTER_MELEE_DAMAGE_MAX + MONSTER_DAMAGE_PER_LEVEL * lvlBoost + MONSTER_DAMAGE_BONUS_PER_LEVEL * lvlThreeBonus;
            let dmg = randomInt(dmin, dmax);
            dmg = Math.max(1, Math.round(dmg * MONSTER_DAMAGE_MULTIPLIER));
            dmg = Math.max(1, dmg + this._getEnemyDamageMod(e, 'magic'));
            this._addLog(`\u{1F47F} ${eName} hurls a bolt of hellfire at ${target.name}!`);
            this._applyEnemyHit(e, target, dmg, 'magic');

        } else {
            // ── Earth Elemental: earthquake AOE (50% chance to quake instead of single hit) ──
            if (typeDef.earthquakeChance && Math.random() < typeDef.earthquakeChance
                    && this._enemyCanAttemptStaminaAttack(e)) {
                this._spendEnemyStamina(e);
                const dmin = MONSTER_MELEE_DAMAGE_MIN + MONSTER_DAMAGE_PER_LEVEL * lvlBoost + MONSTER_DAMAGE_BONUS_PER_LEVEL * lvlThreeBonus;
                const dmax = MONSTER_MELEE_DAMAGE_MAX + MONSTER_DAMAGE_PER_LEVEL * lvlBoost + MONSTER_DAMAGE_BONUS_PER_LEVEL * lvlThreeBonus;
                let dmg = randomInt(dmin, dmax);
                dmg = Math.max(1, Math.round(dmg * MONSTER_DAMAGE_MULTIPLIER));
                dmg = Math.max(1, dmg + this._getEnemyDamageMod(e));
                this._addLog(`\u{1FAA8} ${eName} SLAMS the ground — a violent earthquake rocks the entire party!`);
                const aoeTargets = this.aliveParty.slice();
                for (const target of aoeTargets) {
                    this._applyEnemyHit(e, target, dmg, 'melee', { aoe: true });
                    if (this.aliveParty.length === 0) break;
                }
            } else {
            // ── Ghost: phase-strike melee (ignores armor) ─────────────────
            const target = liveFront[Math.floor(Math.random() * liveFront.length)];
            if (this._enemyCanAttemptStaminaAttack(e)) {
                this._spendEnemyStamina(e);
                const dmin = MONSTER_MELEE_DAMAGE_MIN + MONSTER_DAMAGE_PER_LEVEL * lvlBoost + MONSTER_DAMAGE_BONUS_PER_LEVEL * lvlThreeBonus;
                const dmax = MONSTER_MELEE_DAMAGE_MAX + MONSTER_DAMAGE_PER_LEVEL * lvlBoost + MONSTER_DAMAGE_BONUS_PER_LEVEL * lvlThreeBonus;
                let dmg = randomInt(dmin, dmax);
                dmg = Math.max(1, Math.round(dmg * MONSTER_DAMAGE_MULTIPLIER));
                dmg = Math.max(1, dmg + this._getEnemyDamageMod(e));
                this._applyEnemyHit(e, target, dmg, 'melee', { phaseStrike: typeDef.phaseStrike });
            } else if (this._enemyCanAttemptManaAttack(e)) {
                this._spendEnemyMana(e);
                const dmin = MONSTER_MAGIC_DAMAGE_MIN + MONSTER_DAMAGE_PER_LEVEL * lvlBoost + MONSTER_DAMAGE_BONUS_PER_LEVEL * lvlThreeBonus;
                const dmax = MONSTER_MAGIC_DAMAGE_MAX + MONSTER_DAMAGE_PER_LEVEL * lvlBoost + MONSTER_DAMAGE_BONUS_PER_LEVEL * lvlThreeBonus;
                let dmg = randomInt(dmin, dmax);
                dmg = Math.max(1, Math.round(dmg * MONSTER_DAMAGE_MULTIPLIER));
                dmg = Math.max(1, dmg + this._getEnemyDamageMod(e, 'magic'));
                this._applyEnemyHit(e, target, dmg, 'magic');
            } else {
                this._applyEnemyHit(e, target, 1, 'weak');
            }
            } // end inner earthquake else
        }

        // ── Hag's Curse: 30% post-attack hex (level/8 penalty to all stats) ──
        if (typeDef.hagCurseChance && this.aliveParty.length > 0 && Math.random() < typeDef.hagCurseChance) {
            const curseTarget = this.aliveParty[Math.floor(Math.random() * this.aliveParty.length)];
            const penalty = Math.max(1, Math.floor((e.level || 1) / 8));
            const curseDuration = Math.max(2, Math.floor((e.level || 1) / 4));
            curseTarget.addEffect({ type: 'hag_curse', damageBonus: -penalty, defenseBonus: -penalty, rounds: curseDuration });
            this._addLog(`🧙 ${eName} cackles and hexes ${curseTarget.name}! (-${penalty} all combat stats, ${curseDuration} rds)`);
        }

        // Mega-boss: 33% chance per turn to summon a normal copy of itself
        if (e.isMegaBoss && this.aliveParty.length > 0 && Math.random() < 0.33) {
            this._megaBossSummonMinion(e);
        }

        // Post-attack checks.
        if (this.aliveParty.length === 0 || this.allRealMembersDefeated) {
            this.phase = 'DEFEAT';
            this._addLog('--- Your party has been defeated! ---');
            this._notify();
            return;
        }

        // If the front row just fell from this attack, bump past this slot
        // so promoteToFront resumes at the next enemy / party slot.
        if (this.aliveFront.length === 0 && this.aliveBack.length > 0 && !this.allRealMembersDefeated) {
            this._initTurnIdx++;
            this.phase = 'NEED_PROMOTION';
            this._addLog('\u26A0\uFE0F The front line has fallen! Promote a back-row ally forward.');
            this._notify();
        }
    }

    /**
     * Apply a single incoming hit to a party member, handling dodge / shield /
     * defense / defending / poison / stun. `attackKind` in {'melee','magic','weak'}
     * controls flavour text and which secondary effects trigger.
     */
    _applyEnemyHit(e, target, rawDmg, attackKind, opts = {}) {
        const eName = this._eName(e);
        const typeDef = ENEMY_TYPES[e.type] || {};
        rawDmg = this._applyEnemyResourceExhaustion(e, rawDmg);
        const tauntResult = opts.covenantTransfer ? null : this._applyWarriorTauntTargeting(target, rawDmg, attackKind, opts);
        if (tauntResult) {
            target = tauntResult.target;
            rawDmg = tauntResult.rawDmg;
        }

        if (target?.isSummoned && target.summonStats?.immuneToLifeDrainAttack && (typeDef.lifeDrain || 0) > 0) {
            this._addLog(`🕳️ ${target.name} ignores ${eName}'s life-drain assault.`);
            return null;
        }

        if (target && target.type && target.charmedRounds > 0) {
            const tName = this._eName(target);
            const kindLabel = opts.aoe ? 'AoE' : attackKind;
            this._prepareCharmedAlly(target);
            const dealt = this._damageEnemy(
                target,
                Math.max(1, Math.round(rawDmg)),
                false,
                attackKind === 'magic' || opts.aoe,
                0,
                attackKind === 'ranged',
                { contactAttacker: e, sourceMember: null },
            );
            this._addLog(`🎵 ${eName}'s ${kindLabel} attack hits charmed ${tName} for ${dealt} damage!`);
            if (target.health <= 0) this._addLog(`🎵 ${tName} is defeated while fighting for the party!`);
            return target.health > 0 ? target : null;
        }

        // Shadow Step: rogue is completely untargetable — all attacks pass through harmlessly
        if (!opts.covenantTransfer && this._hasShadowStep(target)) {
            this._addLog(`\u{1F311} ${eName}'s attack passes harmlessly through ${target.name}'s shadow!`);
            return null;
        }

        if (!opts.covenantTransfer && !opts.aoe && this._hasInvisibility(target) && ['melee', 'ranged', 'magic'].includes(attackKind)) {
            this._addLog(`\u{1F441} ${eName} cannot find invisible ${target.name}!`);
            return null;
        }

        if (!opts.covenantTransfer && !opts.aoe && ['melee', 'ranged', 'magic'].includes(attackKind)
            && Array.isArray(target.activeEffects)
            && target.activeEffects.some(fx => fx && fx.type === 'cloak_of_displacement')) {
            if (Math.random() < 0.30) {
                this._addLog(`\u{1F9E5} ${target.name}'s Cloak of Displacement bends ${eName}'s ${attackKind} attack aside!`);
                return null;
            }
        }

        if (this._isVKSwarm(target) && opts.psychic) {
            this._addLog(`🕸️ ${target.name} is immune to psychic damage and effects!`);
            return null;
        }

        if (isShadowSimulacra(target)) {
            const immune = Array.isArray(target.summonStats?.immune) ? target.summonStats.immune : [];
            const blocksPsychic = opts.psychic && immune.includes('psychic');
            const breath = opts.dragonBreath === 'ice' ? 'cold' : opts.dragonBreath;
            const blocksElement = breath && immune.includes(breath);
            const blocksFire = opts.fireBurn && immune.includes('fire');
            if (blocksPsychic || blocksElement || blocksFire) {
                this._addLog(`🌑 ${target.name}'s semi-real shadow body ignores ${eName}'s ${blocksPsychic ? 'psychic' : (breath || 'fire')} effect!`);
                return null;
            }
            if (!opts.aoe && ['melee', 'ranged', 'magic'].includes(attackKind)
                && (target.summonStats?.powers || []).includes('block_dodge')) {
                const chance = Math.min(0.95, ((target.summonStats?.photomancerLevel || target.level || 1) / 2) / 100);
                if (Math.random() < chance) {
                    this._addLog(`🌑 ${target.name} flickers aside from ${eName}'s ${attackKind} attack!`);
                    return null;
                }
            }
        }

        if (target.isSummoned && target.summonStats?.illusionaryWarrior) {
            const tags = this._getEnemyTags(e);
            if (tags.includes('undead') || tags.includes('construct') || (ENEMY_TYPES[e.type] || {}).fullMagicImmune) {
                this._addLog(`${eName} ignores ${target.name}'s illusion.`);
                return null;
            }
            const photoLevel = target.summonStats.photomancerLevel || target.level || 1;
            const disbelieve = Math.max(0, ((e.level || 1) - Math.floor(photoLevel / 2)) / 100);
            if (Math.random() < disbelieve) {
                target.health = 0;
                this._addLog(`\u{1FA9E} ${eName} disbelieves ${target.name}; the illusion vanishes!`);
            } else {
                this._addLog(`\u{1FA9E} ${eName}'s attack passes through ${target.name}!`);
            }
            return null;
        }

        // Boss aura: alive boss = +25% dmg, mega boss = +50% (stack; self excluded)
        rawDmg = Math.max(1, Math.round(rawDmg * this._getBossAuraMult(e)));

        if (!opts.covenantTransfer && this._isDragonEnemy(e) && (attackKind === 'magic' || opts.aoe)) {
            const protector = this._getDragonAuraProtector();
            if (protector) {
                const reducedBy = protector.getDragonAuraReduction();
                if (reducedBy > 0) {
                    rawDmg = Math.max(1, Math.floor(rawDmg * (1 - reducedBy / 100)));
                    this._addLog(`🛡️ ${protector.name}'s shield aura softens the dragon's magic for the whole party (-${reducedBy}% damage before defenses).`);
                    opts._dragonAuraLogged = true;
                }
            }
        }

        // Apply per-level monster damage bonus: melee +2%/level, ranged +1.5%/level.
        const eLvl = e.level || 1;
        if (attackKind === 'melee')       rawDmg = Math.max(1, Math.round(rawDmg * (1 + eLvl * MONSTER_MELEE_DAMAGE_BONUS_PER_LEVEL)));
        else if (attackKind === 'ranged') rawDmg = Math.max(1, Math.round(rawDmg * (1 + eLvl * MONSTER_RANGED_DAMAGE_BONUS_PER_LEVEL)));

        if (!opts.covenantTransfer && attackKind === 'ranged' && !opts._eagleDeflected) {
            if (this.prismaticSphere && this.prismaticSphere.hp > 0) {
                const before = this.prismaticSphere.hp;
                const absorbed = Math.min(before, rawDmg);
                this.prismaticSphere.hp = Math.max(0, before - rawDmg);
                rawDmg = Math.max(0, rawDmg - absorbed);
                this._addLog(`\u{1F308} Prismatic Sphere absorbs ${absorbed} ranged damage (${Math.max(0, this.prismaticSphere.hp)} left).`);
                if (this.prismaticSphere.hp <= 0) this._addLog(`\u{1F308} The Prismatic Sphere shatters!`);
                if (rawDmg <= 0) return null;
            }
            const eagleRangers = (this.party || []).filter(p =>
                p && p.health > 0 && !p.isSummoned && p.classId === 'ranger'
                && p.level >= RANGER_TOTEM_UNLOCK_LEVEL && p.rangerTotem === 'eagle');
            for (const ranger of eagleRangers) {
                const chance = Math.min(0.95, (ranger.level || 1) * RANGER_EAGLE_TOTEM_DEFLECT_PER_LEVEL);
                if (Math.random() < chance) {
                    const reflected = Math.max(1, Math.floor(rawDmg * RANGER_EAGLE_TOTEM_REFLECT_FRACTION));
                    e.health = Math.max(0, e.health - reflected);
                    this._addLog(`🦅 ${ranger.name}'s Eagle Totem deflects ${eName}'s shot back for ${reflected} damage!`);
                    if (e.health <= 0) this._addLog(`${eName} is struck down by the deflected shot!`);
                    return null;
                }
            }
        }

        if (!target.isSummoned && target.classId === 'ranger' && target.rangerTotem === 'pixie'
            && (attackKind === 'magic' || opts.aoe)) {
            rawDmg = Math.max(1, Math.floor(rawDmg * (1 - RANGER_PIXIE_TOTEM_MAGIC_RESIST)));
        }

        if (!opts.covenantTransfer && (attackKind === 'magic' || opts.aoe) && this.prismaticSphere && this.prismaticSphere.hp > 0) {
            const before = this.prismaticSphere.hp;
            const absorbed = Math.min(before, rawDmg);
            this.prismaticSphere.hp = Math.max(0, before - rawDmg);
            rawDmg = Math.max(0, rawDmg - absorbed);
            this._addLog(`\u{1F308} Prismatic Sphere absorbs ${absorbed} ${opts.aoe ? 'AoE' : 'magic'} damage (${Math.max(0, this.prismaticSphere.hp)} left).`);
            if (this.prismaticSphere.hp <= 0) this._addLog(`\u{1F308} The Prismatic Sphere shatters!`);
            if (rawDmg <= 0) return null;
        }

        // Wild Shape Pixie Form: 50% less magic/AoE damage
        if (!target.isSummoned && target.classId === 'druid' && target.wildShapeForm === 'pixie'
            && (attackKind === 'magic' || opts.aoe)) {
            rawDmg = Math.max(1, Math.floor(rawDmg * (1 - DRUID_WILD_PIXIE_MAGIC_RESIST)));
        }

        if (target.isSummoned && target.summonType === 'demi_lich'
            && (attackKind === 'magic' || opts.aoe)) {
            rawDmg = Math.max(1, Math.floor(rawDmg * (1 - NECRO_DEMI_LICH_MAGIC_RESIST)));
        }

        if (target.isSummoned && target.summonStats?.halfMagicDamage
            && (attackKind === 'magic' || opts.aoe)) {
            rawDmg = Math.max(1, Math.floor(rawDmg * 0.5));
            this._addLog(`\u{1F4A0} ${target.name}'s infernal ward halves the magic damage!`);
        }

        if (target.isSummoned
            && target.summonStats?.beastKind === 'valkyrie'
            && (attackKind === 'magic' || opts.aoe)) {
            const mult = Math.max(0, target.summonStats.magicAoeDamageMult || BARBARIAN_VALKYRIE_MAGIC_AOE_DAMAGE_MULT);
            rawDmg = Math.max(1, Math.floor(rawDmg * mult));
            this._addLog(`🪽 ${target.name} turns the blast aside with divine wings.`);
        }

        // ── Armor special quality: AoE Ward (applies before mitigation) ───────
        // +4 armor → 10%, +5 → 20%, +6 → 30%, +7 → 40% reduction to AoE hits.
        if (opts.aoe && !target.isSummoned) {
            const armorEnch = target.equipmentEnchants && target.equipmentEnchants.armor;
            if (armorEnch && armorEnch.aoeWard && armorEnch.level >= 4) {
                const reducePct = 0.10 * (armorEnch.level - 3);
                rawDmg = Math.max(1, Math.floor(rawDmg * (1 - reducePct)));
            }
        }

        // Vampire gaseous form: completely immune to all incoming damage.
        if (target.isSummoned
            && target.summonType === 'vampire'
            && target.summonStats
            && target.summonStats.gaseousForm) {
            this._addLog(`\u{1F32B}\uFE0F ${eName}'s attack passes harmlessly through ${target.name}'s gaseous form!`);
            return null;
        }

        // ── Paladin L30 Aura of Righteousness: reduce rawDmg before any defense ─
        // Applied before intercept so the warrior who intercepts also benefits.
        {
            const _auraPct = this._getPaladinAuraDamageReduction();
            if (_auraPct > 0) rawDmg = Math.max(1, Math.floor(rawDmg * (1 - _auraPct)));
        }

        // Cleric L35 Divine Shroud: all-source reduction before armor/defense.
        rawDmg = this._applyDivineShroudReduction(target, rawDmg, `${attackKind}${opts.aoe ? '/AoE' : ''} hit`);

        // Wild Shape Storm Eagle Form: ranged evasion
        if (!target.isSummoned && target.classId === 'druid' && target.wildShapeForm === 'eagle'
            && attackKind === 'ranged' && !opts.aoe) {
            const _eagleEvasion = Math.min(0.95, (target.level || 1) * DRUID_WILD_EAGLE_EVASION_PER_LEVEL);
            if (Math.random() < _eagleEvasion) {
                this._addLog(`\u{1F985} ${target.name}'s eagle form evades ${eName}'s ranged attack!`);
                return;
            }
        }


        if (!target.isSummoned
            && target.classId === 'rogue'
            && target.level >= ROGUE_TRAP_UNLOCK_LEVEL
            && (attackKind === 'magic' || opts.aoe)
            && target.stamina >= ROGUE_EVASION_STAMINA_COST) {
            const chance = Math.min(1, (target.level || 1) * 0.01);
            if (Math.random() < chance) {
                target.stamina = Math.max(0, target.stamina - ROGUE_EVASION_STAMINA_COST);
                this._addLog(`🗡️ ${target.name} evades ${eName}'s ${opts.aoe ? 'AoE' : 'magic'} attack! (-${ROGUE_EVASION_STAMINA_COST} ST)`);
                return null;
            }
        }

        // ── Mage L20: Mirror Image absorbs any hit ───────────────────────────────
        if (!target.isSummoned && target.mirrorImages && target.mirrorImages > 0 && target.health > 0) {
            target.mirrorImages--;
            this._addLog(`🪞 A Mirror Image of ${target.name} absorbs the blow and shatters! (${target.mirrorImages} remaining)`);
            return null;
        }

        // Monk dodge (melee only — matches prior behaviour). Capped at MONK_DODGE_MAX.
        const monkDodgePct = target.getEffectiveDodgePct(); // 0 for non-monks
        if (attackKind === 'melee'
            && monkDodgePct > 0
            && target.stamina >= MONK_DODGE_STAMINA_COST
            && target.mana >= MONK_DODGE_MANA_COST
            && Math.random() < monkDodgePct) {
            target.stamina -= MONK_DODGE_STAMINA_COST;
            target.mana    -= MONK_DODGE_MANA_COST;
            this._addLog(`\u{1F343} ${target.name} dodges ${eName}'s attack!`);
            if (target.level >= MONK_KI_UNLOCK_LEVEL) {
                target.kiCharges = (target.kiCharges || 0) + 1;
                this._addLog(`\u{1F9D8} ${target.name} channels the evasion into Ki! (${target.kiCharges} charge${target.kiCharges !== 1 ? 's' : ''})`);
            }
            return null;
        }

        // Shield block — applies to melee, ranged, and magic/AoE (not phaseStrike)
        if (!opts.phaseStrike) {
            const shieldWallBlock = target.hasShield && target.hasShield()
                ? this._getFormationShieldWallChanceBonus(target)
                : 0;
            const shieldChance = Math.min(0.95, target.getShieldBlockChance() + shieldWallBlock);
            if (shieldChance > 0 && Math.random() < shieldChance) {
                this._addLog(`\u{1F6E1}\uFE0F ${target.name}'s shield blocks ${eName}'s attack!`);
                if (!target.isSummoned
                    && target.classId === 'warrior'
                    && (target.level || 1) >= WARRIOR_PERSONAL_BLOCK_RETALIATION_UNLOCK_LEVEL
                    && e && e.health > 0) {
                    this._performWarriorRetaliation(target, e);
                }
                return null;
            }
        }

        // Death Knight: 25% chance to block any incoming attack (melee, ranged, or magic/AoE).
        if (target.isSummoned
            && target.summonType === 'death_knight'
            && Math.random() < 0.25) {
            this._addLog(`\u2620\uFE0F ${target.name} blocks the blow with their spectral shield!`);
            return null;
        }

        if (target.isSummoned
            && target.summonStats
            && target.summonStats.tierId
            && GOLEM_PRESETS[target.summonType]
            && target.summonStats.attachments
            && target.summonStats.attachments.shield
            && Math.random() < GOLEM_ATTACHMENT_SHIELD_BLOCK_CHANCE) {
            this._addLog(`🛡️ ${target.name}'s golem shield blocks ${eName}'s attack!`);
            return null;
        }

        // Squire: 25% chance to block any incoming attack outright.
        if (target.isSummoned
            && target.summonType === 'squire'
            && Math.random() < Math.min(0.95, WARRIOR_SQUIRE_SHIELD_BLOCK + this._getFormationShieldWallChanceBonus(target))) {
            this._addLog(`🛡️ ${target.name} raises their shield and blocks ${eName}'s attack!`);
            return null;
        }

        if (target.isSummoned
            && target.summonStats?.beastKind === 'valkyrie') {
            const valkBlock = Math.max(0, Math.min(0.95, target.summonStats.shieldBlockChance || BARBARIAN_VALKYRIE_BLOCK_CHANCE));
            if (Math.random() < valkBlock) {
                this._addLog(`🪽 ${target.name} parries ${eName}'s attack with a shining shield!`);
                return null;
            }
        }

        // Pixie / Pixie Princess dodge — 25% + summoner level%, capped at 90%.
        if (target.isSummoned
            && target.summonStats
            && target.summonStats.beastKind === 'pixie') {
            const summoner = this.party.find(p => p.id === target.summonerId);
            const summonerLevel = summoner?.level ?? 1;
            const dodgeChance = Math.min(0.90, 0.25 + summonerLevel * 0.01);
            if (Math.random() < dodgeChance) {
                const label = target.summonStats.upgradeName === 'pixie_princess'
                    ? '\u{1F9DA}✨ Pixie Princess'
                    : '\u{1F9DA}';
                this._addLog(`${label} ${target.name} flits away — evades the attack!`);
                return null;
            }
        }

        // ── Vermin/Acid Swarm protect intercept (checked before shambling mound) ─
        if (!opts.skipInterceptors && target.health > 0) {
            const swarmProtectors = this._getVKSwarmInterceptors(target);
            for (const swarm of swarmProtectors) {
                const chance = Math.min(1, VK_SWARM_PROTECT_BASE_CHANCE + Math.max(0, target.level || 1) / VK_SWARM_PROTECT_LEVEL_DIV);
                if (Math.random() < chance) {
                    const swarmDef = (typeof swarm.getTotalDefense === 'function' ? swarm.getTotalDefense() : 0) + this._getSummonDefenseBonus(swarm);
                    const dmg = Math.max(1, rawDmg - swarmDef);
                    swarm.health = Math.max(0, swarm.health - dmg);
                    this._emitTelemetry('intercept', { member: swarm, enemy: e, damage: dmg, interceptorType: 'vk_swarm' });
                    this._addLog(`\u{1F41C} ${swarm.name} intercepts the blow aimed at ${target.name} and absorbs ${dmg} damage!`);
                    if (swarm.health <= 0) this._addLog(`${swarm.name} is scattered!`);
                    // Counter-attack: swarm erupts outward and hits all enemies for half normal damage
                    if (swarm.health > 0) {
                        const st2 = swarm.summonStats || {};
                        const counterBase = Math.max(1, Math.floor(randomInt(st2.magicMin || 1, st2.magicMax || 5) * 0.75));
                        const isAcid = swarm.summonType === 'acid_swarm';
                        this._addLog(`\u{1F41C} ${swarm.name} erupts outward — ${isAcid ? 'acid' : 'stinging'} AoE counter-attack!`);
                        for (const ce of this.aliveHostileEnemies.slice()) {
                            if (ce.health <= 0) continue;
                            const cDealt = this._damageSummonEnemy(ce, counterBase);
                            if (cDealt > 0) this._addLog(`  → ${this._eName(ce)} takes ${cDealt} damage!`);
                            if (isAcid && cDealt > 0 && ce.health > 0) {
                                const aDot = Math.max(1, Math.floor(cDealt * 0.20));
                                if (!Array.isArray(ce.activeEffects)) ce.activeEffects = [];
                                ce.activeEffects.push({ type: 'vk_swarm_acid', damage: aDot, rounds: 2 });
                            }
                            if (ce.health <= 0 && !ce._deathHandled) { ce._deathHandled = true; this._onEnemyDeath(ce); }
                        }
                    }
                    return null;
                }
            }
        }

        // ── Shambling Mound intercept (checked before warrior — disposable plant) ─
        if (!opts.skipInterceptors && target.health > 0) {
            const mounds = this._getShamblingMoundInterceptors(target);
            for (const mound of mounds) {
                const chance = Math.min(1, 0.50 + Math.max(0, target.level || 1) / 300);
                if (Math.random() < chance) {
                    const moundArmor = typeof mound.getArmorBlocking === 'function' ? mound.getArmorBlocking() : 0;
                    const moundDef = (typeof mound.getTotalDefense === 'function' ? mound.getTotalDefense() : 0)
                        + this._getSummonDefenseBonus(mound);
                    const dmg = Math.max(1, rawDmg - moundArmor - moundDef);
                    mound.health = Math.max(0, mound.health - dmg);
                    this._emitTelemetry('intercept', { member: mound, enemy: e, damage: dmg, interceptorType: 'shambling_mound' });
                    this._emitTelemetry('damageTaken', { target: mound, enemy: e, amount: dmg, attackKind, intercepted: true });
                    this._addLog(`🪴 ${mound.name} intercepts the attack aimed at ${target.name} and takes ${dmg} damage!`);
                    if (mound.health <= 0) this._addLog(`${mound.name} collapses into torn vines!`);
                    return null;
                }
            }
        }

        // ── Warrior L20 Defend Mode: intercept check ────────────────────────────
        // A warrior in defend mode rolls their augmented shield block chance to
        // intercept any attack aimed at another party member. The warrior takes
        // 10% of post-defense damage; the original target is unharmed.
        if (!opts.skipInterceptors && target.health > 0) {
            const interceptors = this.party
                .filter(w => w !== target && w.canIntercept && w.canIntercept())
                .sort((a, b) => (b.health || 0) - (a.health || 0));
            for (const warrior of interceptors) {
                const interceptChance = Math.min(0.95, warrior.getAugmentedShieldBlock() + this._getFormationShieldWallChanceBonus(warrior));
                if (interceptChance > 0 && Math.random() < interceptChance) {
                    const warriorArmor = warrior.getArmorBlocking();
                    const warriorDef   = warrior.getTotalDefense() + this._getSummonDefenseBonus(warrior) + this._getFormationShieldWallDefenseBonus(warrior);
                    const postDef      = Math.max(1, rawDmg - warriorArmor - warriorDef);
                    const interceptDmg = Math.max(1, Math.floor(postDef * WARRIOR_INTERCEPT_DAMAGE_MULT));
                    warrior.health = Math.max(0, warrior.health - interceptDmg);
                    this._emitTelemetry('intercept', { member: warrior, enemy: e, damage: interceptDmg, interceptorType: 'warrior_defend' });
                    this._emitTelemetry('damageTaken', { target: warrior, enemy: e, amount: interceptDmg, attackKind, intercepted: true });
                    this._addLog(`\u{1F6E1}\uFE0F ${warrior.name} intercepts the blow aimed at ${target.name} and absorbs ${interceptDmg} damage!`);
                    if (e && e.health > 0) this._performWarriorRetaliation(warrior, e);
                    if (warrior.health <= 0) {
                        this._addLog(`${warrior.name} has fallen protecting their allies!`);
                        warrior.isDefendMode = false;
                    }
                    return warrior;
                }
            }
        }


        // Ghost phaseStrike — bypasses armor and innate defense entirely.
        const armorBlock = opts.phaseStrike ? 0 : target.getArmorBlocking();
        const innateDef  = opts.phaseStrike ? 0
            : target.getTotalDefense() + this._getSummonDefenseBonus(target) + this._getFormationShieldWallDefenseBonus(target);

        if (opts.phaseStrike) {
            this._addLog(`\u{1F47B} ${eName} phases through ${target.name}'s defences!`);
        }

        const prePersonalDefenseDamage = Math.max(1, Math.round(rawDmg));
        let dmg = rawDmg;
        if (target._defending) dmg = Math.max(1, Math.floor(dmg / 2));
        dmg = Math.max(1, dmg - armorBlock - innateDef);
        // Barbarian rage halves all incoming damage
        if (target.classId === 'barbarian' && target.isRaging) {
            dmg = Math.max(1, Math.floor(dmg / 2));
        }
        if (!target.isSummoned
            && target.classId === 'paladin'
            && target.paladinSteedActive
            && attackKind === 'melee') {
            dmg = Math.max(1, Math.floor(dmg * PALADIN_STEED_MELEE_RESIST));
        }

        // Phase 8 rule 6: monks reduce all incoming damage by their current dodge %.
        // Magic/AoE attacks use 2/3 of the dodge % for this reduction.
        // Suspended when monk has no ST or MP — too exhausted to flow with the blow.
        if (monkDodgePct > 0 && target.stamina > 0 && target.mana > 0) {
            const effectivePct = (opts.aoe || attackKind === 'magic')
                ? monkDodgePct * (2 / 3)
                : monkDodgePct;
            dmg = Math.max(1, Math.round(dmg * (1 - effectivePct)));
        }

        // Pixie: fey nature halves all AoE magic damage.
        if (opts.aoe && attackKind === 'magic'
            && target.isSummoned
            && target.summonStats
            && target.summonStats.beastKind === 'pixie') {
            dmg = Math.max(1, Math.floor(dmg * 0.5));
        }

        // Adamantine / Divine Soul golem: half damage from magic, AoE, and ranged hits.
        if (target.isSummoned
            && target.summonStats
            && target.summonStats.halfDmgSpecial
            && (attackKind === 'magic' || opts.aoe || attackKind === 'ranged')) {
            dmg = Math.max(1, Math.floor(dmg * 0.5));
        }

        // ── Faerie Queen: 50% less from magic and AoE ───────────────────────────
        if (target.isSummoned && target.summonType === 'faerie_queen'
            && (attackKind === 'magic' || opts.aoe)) {
            dmg = Math.max(1, Math.floor(dmg * (1 - FAERIE_QUEEN_MAGIC_DMG_RESIST)));
        }

        // ── Necromancer Lich Form: magic/AoE resistance (50% + 1%/4 levels over 20) ─
        if (!target.isSummoned && target.isLichForm
            && (attackKind === 'magic' || opts.aoe)) {
            const lichOver  = Math.max(0, (target.level || 0) - NECRO_LICH_FORM_UNLOCK_LEVEL);
            const lichResist = Math.min(0.90,
                NECRO_LICH_MAGIC_RESIST_BASE + Math.floor(lichOver / 4) * NECRO_LICH_MAGIC_RESIST_PER_4LV);
            dmg = Math.max(1, Math.floor(dmg * (1 - lichResist)));
        }

        if (!opts.covenantTransfer
            && (attackKind === 'melee' || attackKind === 'ranged')
            && (target.activeEffects || []).some(fx => fx && fx.type === 'blur' && (fx.rounds || 0) > 0)
            && Math.random() < PHOTOMANCER_BLUR_MISS_CHANCE) {
            this._addLog(`\u{1F300} ${target.name}'s blur makes ${eName}'s ${attackKind} attack miss!`);
            return null;
        }

        // Warlock L30 abyss form resistances.
        if (!target.isSummoned && target.classId === 'warlock' && target.abyssFormActive) {
            if (attackKind === 'magic' || opts.aoe) dmg = Math.max(1, Math.floor(dmg * (1 - WARLOCK_ABYSS_MAGIC_RESIST)));
            if (opts.dragonBreath === 'acid' || opts.dragonBreath === 'cold' || this._enemyHasImmunity(e, 'acid') || this._enemyHasImmunity(e, 'cold')) {
                dmg = Math.max(1, Math.floor(dmg * (1 - WARLOCK_ABYSS_COLD_ACID_RESIST)));
            }
        }

        // ── Bard L30 Thunderous Drums: reduce sonic or psychic damage (all active drums combined, applied once) ───
        if (typeDef.sonic || opts.sonic || opts.psychic) {
            const _drumBards = this._getAllBardsWithDrums();
            if (_drumBards.length > 0) {
                const _drumReduction = Math.min(BARD_THUNDEROUS_DRUMS_MAX_REDUCTION,
                    _drumBards.reduce((sum, b) => sum + b.level / 100, 0));
                const _dmgBefore = dmg;
                dmg = Math.max(1, Math.floor(dmg * (1 - _drumReduction)));
                if (_dmgBefore !== dmg) {
                    const _drumLabel = _drumBards.length > 1 ? `Thunderous Drums (×${_drumBards.length})` : 'Thunderous Drums';
                    this._addLog(`🥁 ${_drumLabel} absorbs ${Math.round(_drumReduction * 100)}% of ${eName}'s ${(typeDef.sonic || opts.sonic) ? 'sonic' : 'psychic'} blast on ${target.name}!`);
                    soundManager.playThunderousDrums();
                }
            }
        }

        // Plant summons (treants, shambling mounds) take half damage from sonic attacks
        if (typeDef.sonic && target.isSummoned
            && ['treant', 'shambling_mound'].includes(target.summonStats?.beastKind)) {
            dmg = Math.max(1, Math.floor(dmg * 0.5));
        }

        // Warlock L30 Protection from Demons: best living warlock protects the party.
        if (Array.isArray(typeDef.tags) && typeDef.tags.includes('demon')) {
            const demonRed = this._getWarlockDemonProtectionReduction();
            if (demonRed > 0) {
                dmg = Math.max(1, Math.floor(dmg * (1 - demonRed)));
            }
        }

        if (attackKind === 'melee') {
            const details = []
            if (target._defending) details.push('defended');
            if (armorBlock > 0)    details.push(`${armorBlock} armor`);
            if (innateDef > 0)     details.push(`${innateDef} def`);
            const detailStr = details.length ? ` (${details.join(', ')})` : '';
            this._addLog(`${eName} attacks ${target.name} for ${dmg} damage!${detailStr}`);
        } else if (attackKind === 'magic') {
            if (opts.dragonBreath) {
                const breathNames = { fire: 'fire breath', acid: 'acid breath', lightning: 'lightning breath', cold: 'frost breath', poison: 'poison breath' };
                const bLabel = breathNames[opts.dragonBreath] || 'breath weapon';
                this._addLog(`${eName}'s ${bLabel} sears ${target.name} for ${dmg}!`);
            } else {
                const aoe = opts.aoe ? ' (AoE)' : '';
                this._addLog(`${eName} blasts ${target.name} with dark magic for ${dmg}!${aoe}`);
            }
        } else {
            this._addLog(`${eName} weakly swipes at ${target.name} for ${dmg} damage.`);
        }

        // ── Barbarian L20: temp HP absorbs incoming damage (after defenses) ──────
        if (target.classId === 'barbarian' && (target.tempHp || 0) > 0) {
            if (target.tempHp >= dmg) {
                target.tempHp -= dmg;
                this._addLog(`🔴 ${target.name}'s Battle Fury absorbs ${dmg} damage! (${target.tempHp} temp HP left)`);
                return target; // fully absorbed — attack connected
            } else {
                dmg -= target.tempHp;
                this._addLog(`🔴 ${target.name}'s Battle Fury buffer depleted! (${dmg} bleeds through)`);
                target.tempHp = 0;
            }
        }

        if (!opts.covenantTransfer
            && !opts.aoe
            && target && !target.isSummoned
            && target.health > 0
            && this._canReceiveLivingHealOrBuff(target)
            && ['melee', 'ranged', 'magic', 'weak'].includes(attackKind)
            && dmg > Math.max(1, Math.floor((target.maxHealth || 1) * PALADIN_COVENANT_TRIGGER_MAX_HP_FRAC))) {
            const anchor = this._getMartyrsCovenantAnchor(target);
            if (anchor) {
                this._addLog(`✝️ ${anchor.name}'s Martyr's Covenant takes ${target.name}'s grievous wound! ${dmg} damage is prevented; ${prePersonalDefenseDamage} raw damage transfers to the paladin.`);
                this._applyEnemyHit(e, anchor, prePersonalDefenseDamage, attackKind, {
                    ...opts,
                    aoe: false,
                    covenantTransfer: true,
                    skipInterceptors: true,
                    skipTaunt: true,
                    phaseStrike: false,
                });
                return anchor.health > 0 ? anchor : null;
            }
        }

        if (opts.covenantTransfer
            && !target.isSummoned
            && target.classId === 'paladin'
            && target.health - dmg <= 0) {
            const minHp = Math.max(1, Math.ceil((target.maxHealth || 1) * PALADIN_COVENANT_MIN_HP_FRAC));
            const applied = Math.max(0, target.health - minHp);
            target.health = Math.max(minHp, target.health - applied);
            target.martyrsCovenantActive = false;
            target.martyrsCovenantSuppressedRound = this.turnNumber || 0;
            this._emitTelemetry('damageTaken', { target, enemy: e, amount: applied, attackKind, intercepted: true, covenantTransfer: true });
            this._addLog(`✝️ ${target.name}'s Martyr's Covenant shatters before death, leaving them at ${target.health} HP. It cannot be re-anchored until next round.`);
            return target;
        }

        // Mage L35 Mana Shield: final pre-HP check for all incoming damage.
        dmg = this._absorbMageManaShield(target, dmg, 'damage');
        if (dmg <= 0) {
            this._emitTelemetry('damageTaken', { target, enemy: e, amount: 0, attackKind, intercepted: false, manaShieldAbsorb: true });
            return target;
        }

        target.health = Math.max(0, target.health - dmg);
        this._emitTelemetry('damageTaken', { target, enemy: e, amount: dmg, attackKind, intercepted: !!opts.covenantTransfer, covenantTransfer: !!opts.covenantTransfer });

        if (target.health <= 0 && this._tryHandlePartyDeathRescue(target)) {
            return target;
        }

        if (target.health <= 0
            && !target.isSummoned
            && target.classId === 'barbarian'
            && target.werebearActive) {
            this._endWerebearForm(target);
        }

        // ── Wild Shape: druid falls — exit form immediately ──────────────────
        if (target.health <= 0 && !target.isSummoned && target.classId === 'druid' && target.wildShapeForm) {
            this._exitWildShape(target);
        }

        if (target.health <= 0 && !target.isSummoned && target.classId === 'warlock') {
            if (target.abyssFormActive) this._exitAbyssForm(target);
            this._removeWarlockSummons(target);
            target.warlockCauldronOpen = false;
        }

        if (target.health <= 0 && !target.isSummoned && target.classId === 'paladin') {
            if (target.paladinSteedActive) this._dismissPaladinSteed(target, ' as they fall');
            target.martyrsCovenantActive = false;
        }

        // ── Lich Phial: necromancer in lich form caught at 0 HP ─────────────────
        if (target.health <= 0 && !target.isSummoned && target.isLichForm && !target.lichPhial) {
            target.lichPhial = true;
            target.lichReviveRoundsLeft = NECRO_LICH_REVIVE_ROUNDS;
            target.health = 0;
            this._addLog(`💀 ${target.name}'s soul retreats to their Lich Phial! (returns in ${NECRO_LICH_REVIVE_ROUNDS} rounds)`);
            return target; // don't process further damage effects
        }

        // ── Soulful Melody: trigger on real (non-summoned) party member death ────
        if (target.health <= 0 && !target.isSummoned) {
            this._triggerMageDeathBurst(target, `${eName} ${attackKind} attack`);
            this._triggerSoulfulMelody(target);
        }

        // ── Vampire gaseous form: triggered when the vampire would die ────────
        if (target.health <= 0
            && target.isSummoned
            && target.summonType === 'vampire'
            && target.summonStats
            && !target.summonStats.gaseousForm) {
            target.health = 1; // stay alive in gaseous form
            target.summonStats.gaseousForm = true;
            this._addLog(`\u{1F32B}\uFE0F ${target.name} dissolves into gaseous mist, escaping death!`);
            return null; // skip all further status-effect applications (gaseous form)
        }

        // ── Clay Golem reflect: when this summon is a clay golem, there's a
        //    chance each incoming hit reflects a fraction back at the attacker.
        //    Reflect uses the POST-mitigation `dmg` so armor counts.
        if (target.isSummoned
            && target.summonStats
            && target.summonStats.reflectChance
            && Math.random() < target.summonStats.reflectChance
            && e && e.health > 0) {
            const frac = target.summonStats.reflectFraction || 0.5;
            const reflect = Math.max(1, Math.floor(dmg * frac));
            const reflected = this._damageEnemy(e, reflect);
            this._addLog(`\u{1F9F1} ${target.name}'s hardened shell reflects ${reflected} damage back at ${eName}!`);
            if (e.health <= 0) this._addLog(`${eName} is defeated by their own blow!`);
        }

        if (attackKind === 'melee'
            && isShadowSimulacra(target)
            && (target.summonStats?.powers || []).includes('retributive_damage')
            && dmg > 0
            && e && e.health > 0) {
            const level = target.summonStats?.photomancerLevel || target.level || 1;
            const reflect = Math.max(1, Math.floor(dmg * (level * 2 / 100)));
            const reflected = this._damageEnemy(e, reflect, true, false, 0, false, { sourceMember: target });
            this._addLog(`🌑 ${target.name}'s shadow thorns retaliate for ${reflected} damage against ${eName}!`);
            if (e.health <= 0) this._addLog(`${eName} is shredded by the backlash!`);
        }

        // ── Gelatinous Cube acid body: any melee hit on the cube splashes the
        //    attacker with acid DoT (25% of post-mitigation damage for 2 rounds).
        if (attackKind === 'melee'
            && target.isSummoned
            && target.summonType === 'gelatinous_cube'
            && dmg > 0
            && e && e.health > 0) {
            const acidTick = Math.max(1, Math.floor(dmg * 0.25));
            if (!Array.isArray(e.activeEffects)) e.activeEffects = [];
            e.activeEffects.push({ type: 'acid_dot', damage: acidTick, rounds: 2 });
            this._addLog(`\u{1FAA1} ${eName} is splashed by the cube's acid body! (${acidTick}/rd for 2 rds)`);
        }

        // ── Paladin Fire Aura: melee hits on an aura-active paladin trigger a
        //    counter-strike dealing the paladin's own rolled melee damage as fire
        //    damage to the attacker (ignores the attacker's defense).
        if (attackKind === 'melee'
            && !target.isSummoned
            && target.classId === 'paladin'
            && target.fireAuraActive
            && dmg > 0
            && e && e.health > 0) {
            const reflected = this._rollPlayerMeleeDamage(target);
            e.health = Math.max(0, e.health - reflected);
            this._addLog(`\u{1F525} ${target.name}'s Fire Aura scorches ${eName} for ${reflected} fire damage!`);
            if (e.health <= 0) this._addLog(`${eName} is consumed by the flames!`);
        }

        // ── Armor special quality: Spikes ─────────────────────────────────────
        // +4 armor → 25% reflect, +5 → 50%, +6 → 75%, +7 → 100% of post-mitigation dmg.
        if (attackKind === 'melee'
            && !target.isSummoned
            && dmg > 0
            && e && e.health > 0) {
            const armorEnch = target.equipmentEnchants && target.equipmentEnchants.armor;
            if (armorEnch && armorEnch.spiked && armorEnch.level >= 4) {
                const spikePct = 0.25 * (armorEnch.level - 3);
                const spikeReflect = Math.max(1, Math.floor(dmg * spikePct));
                e.health = Math.max(0, e.health - spikeReflect);
                this._addLog(`\u{1F5E1}️ ${target.name}'s spiked armor reflects ${spikeReflect} damage back at ${eName}!`);
                if (e.health <= 0) this._addLog(`${eName} is impaled on the spikes!`);
            }
        }

        // ── Iron Golem (and anything else with summonStats.immune) — skip
        //    poison/stun/web attempts entirely. We compute once and branch.
        const immune = (target.isSummoned && target.summonStats && target.summonStats.immune) || null;
        const isImmune = (tag) => Array.isArray(immune) && immune.indexOf(tag) !== -1;

        // ── Necromancer undead are immune to poison and stun.
        // ── Incorporeal summons (spectres) are also immune to web, paralysis,
        //    and constrict — physical effects pass right through them.
        const isNecroUndead   = target.isSummoned && (UNDEAD_TIERS.some(ut => ut.id === target.summonType) || target.summonType === 'demi_lich' || target.summonType === 'corpse_horror');
        const isIncorporealSummon = target.isSummoned
            && target.summonStats
            && target.summonStats.incorporeal === true;
        // Plant summons (treants, shambling mounds) are immune to paralysis
        const isPlantSummon = target.isSummoned
            && ['treant', 'shambling_mound'].includes(target.summonStats?.beastKind);

        // Poison (melee only — matches spider/slime/basilisk behaviour)
        if (attackKind === 'melee'
            && target.health > 0
            && !isImmune('poison')
            && !isNecroUndead          // undead immune to poison
            && typeDef.poisonChance
            && Math.random() < typeDef.poisonChance) {
            const perTick = Math.max(1, Math.floor(dmg * POISON_DAMAGE_FRACTION));
            target.addEffect({
                type: 'poison',
                rounds: POISON_DURATION_ROUNDS,
                damage: perTick,
            });
            this._addLog(`\u{1F7E2} ${target.name} is poisoned! (${perTick}/rd for ${POISON_DURATION_ROUNDS} rds)`);
        }

        // Stun (melee only — matches troll behaviour)
        if (attackKind === 'melee'
            && target.health > 0
            && !isImmune('stun')
            && !isNecroUndead          // undead immune to stun
            && !(target.classId === 'barbarian' && target.isRaging)  // raging barbarian shrugs stun
            && typeDef.stunChance
            && Math.random() < typeDef.stunChance) {
            if (this._tryApplyStun(target)) {
                this._addLog(`\u26A1 ${target.name} is STUNNED by ${eName}!`);
            }
        }

        // Phase 11 — Web (melee only). Locks the target out of their next
        // WEB_DURATION_ROUNDS turns. Uses the same per-turn skip mechanic
        // as stun via a round counter on the party member.
        if (attackKind === 'melee'
            && target.health > 0
            && !isImmune('web')
            && !isIncorporealSummon    // incorporeal immune to web
            && !this._isHoldImmunePartyMember(target)
            && typeDef.webChance
            && Math.random() < typeDef.webChance) {
            target.webbedRounds = Math.max(target.webbedRounds || 0, WEB_DURATION_ROUNDS);
            this._addLog(`\u{1F578}\uFE0F ${target.name} is ENSNARED in sticky webbing by ${eName}! (${WEB_DURATION_ROUNDS} rds)`);
        }

        // Gelatinous Cube — paralyzingBite: melee hit paralyzes for N rounds
        // (same mechanic as webbed, shared round-counter).
        if (attackKind === 'melee'
            && target.health > 0
            && !isImmune('stun')
            && !isImmune('hold')
            && !this._isParalysisImmunePartyMember(target)
            && typeDef.paralyzingBite) {
            const pRounds = typeDef.paralyzingBite;
            target.webbedRounds = Math.max(target.webbedRounds || 0, pRounds);
            this._addLog(`\u{1F9EA} ${target.name} is PARALYZED by the cube's acidic touch! (${pRounds} rds)`);
        }

        // Naga — constrict: melee hit coils around the target, pinning them
        // for N rounds (uses webbedRounds).
        if (attackKind === 'melee'
            && target.health > 0
            && !isImmune('stun')
            && !isImmune('hold')
            && !isNecroUndead          // undead immune
            && !isIncorporealSummon    // incorporeal immune
            && !isPlantSummon          // plant summons immune to paralysis
            && !this._isHoldImmunePartyMember(target)
            && typeDef.constrict
            && Math.random() < 0.35) {
            const cRounds = typeDef.constrict;
            target.webbedRounds = Math.max(target.webbedRounds || 0, cRounds);
            this._addLog(`\u{1F40D} ${target.name} is CONSTRICTED by the naga's coils! (${cRounds} rds)`);
        }

        // Ice Troll — attackDebuff: freezing chill reduces target's damage
        // output for 2 rounds. Represented as a negative damageBonus effect.
        if (attackKind === 'melee'
            && target.health > 0
            && !isImmune('cold')
            && typeDef.attackDebuff) {
            const debuffMag = typeof typeDef.attackDebuff === 'number' ? typeDef.attackDebuff : 2;
            const debuffRounds = 2;
            // Remove any existing attack debuff first so it doesn't stack.
            target.activeEffects = (target.activeEffects || []).filter(x => x.type !== 'ice_chill');
            target.addEffect({
                type: 'ice_chill',
                damageBonus: -debuffMag,
                rounds: debuffRounds,
            });
            this._addLog(`\u2744\uFE0F ${target.name} is CHILLED by the ice troll — attack reduced by ${debuffMag} for ${debuffRounds} rds!`);
        }

        // Phase 11 — AoE-magic riders. When a monster with aoePoisonChance or
        // aoeStunChance does its AoE blast, each hit target rolls independently.
        // Spore clouds, shrieks, frost bursts — all reuse the same code path.
        if (opts.aoe && attackKind === 'magic' && target.health > 0) {
            if (typeDef.aoePoisonChance && Math.random() < typeDef.aoePoisonChance) {
                if (this._isPoisonImmunePartyMember(target) || isNecroUndead || isImmune('poison')) {
                    this._addLog(`🟢 ${target.name} is immune to the toxic cloud!`);
                } else {
                    const perTick = Math.max(1, Math.floor(dmg * POISON_DAMAGE_FRACTION));
                    target.addEffect({
                        type: 'poison',
                        rounds: POISON_DURATION_ROUNDS,
                        damage: perTick,
                    });
                    this._addLog(`\u{1F7E2} ${target.name} breathes in the toxic cloud and is poisoned!`);
                }
            }
            if (typeDef.aoeStunChance && Math.random() < typeDef.aoeStunChance) {
                if (typeDef.aoeStunPsychic && this._isPsychicImmunePartyMember(target)) {
                    this._addLog(`\u{1F9E0} ${target.name} is immune to the psychic blast!`);
                } else {
                    const _isStunSonicPsychic = typeDef.sonic || typeDef.aoeStunPsychic;
                    let _stunResisted = false;
                    if (_isStunSonicPsychic) {
                        for (const _bd of this._getAllBardsWithDrums()) {
                            if (Math.random() < Math.min(BARD_THUNDEROUS_DRUMS_MAX_REDUCTION, _bd.level / 100)) {
                                const _label = typeDef.sonic ? 'sonic' : 'psychic';
                                this._addLog(`\uD83E\uDD41 ${target.name} resists the ${_label} stun \u2014 ${_bd.name}'s Thunderous Drums!`);
                                soundManager.playThunderousDrums();
                                _stunResisted = true;
                                break;
                            }
                        }
                    }
                    if (!_stunResisted && this._tryApplyStun(target)) {
                        this._addLog(`\u26A1 ${target.name} is dazed by the blast!`);
                    }
                }
            }
        }

        // Water Elemental drowning — half-damage DoT for 3 rounds + -2 defense for 3 rounds.
        // Undead, incorporeal, and elemental summons are immune.
        if (opts.drowning && target.health > 0) {
            const isUndeadSummon = target.isSummoned &&
                (UNDEAD_TIERS.some(ut => ut.id === target.summonType) || target.summonType === 'demi_lich' || target.summonType === 'corpse_horror');
            if (isUndeadSummon || isIncorporealSummon || this._isRiftElemental(target)) {
                this._addLog(`\u{1F30A} ${target.name} is immune to drowning!`);
            } else {
                const drownTick = Math.max(1, Math.floor((opts.drowningDmg || dmg) * 0.5));
                target.addEffect({
                    type: 'drowning',
                    rounds: 3,
                    damage: drownTick,
                });
                // Armor-weakening effect: -2 defense for 3 rounds (stacks with existing)
                target.addEffect({
                    type: 'drown_armor_break',
                    defenseBonus: -2,
                    rounds: 3,
                });
                this._addLog(`\u{1F30A} ${target.name} is drowning! (${drownTick}/rd for 3 rds, -2 def for 3 rds)`);
            }
        }

        // Drake fire breath — applies burn DoT to each target hit.
        if (opts.fireBurn && target.health > 0) {
            const _riftFireImmune = target.isSummoned && Array.isArray(target.summonStats?.immune)
                && target.summonStats.immune.includes('fire');
            if (_riftFireImmune) {
                this._addLog(`\u{1F525} ${target.name} is immune to fire!`);
            } else {
                const burnTick = Math.max(1, Math.floor(dmg * DRAKE_FIRE_BURN_FRACTION));
                target.addEffect({
                    type: 'burn',
                    rounds: DRAKE_FIRE_BURN_ROUNDS,
                    damage: burnTick,
                });
                this._addLog(`\u{1F525} ${target.name} is set ablaze! (${burnTick}/rd for ${DRAKE_FIRE_BURN_ROUNDS} rds)`);
            }
        }

        // Dragon breath weapon rider effects — each breath type applies the
        // matching elemental DoT / debuff, identical to player weapon riders
        // but applied to party members instead of enemies.
        if (opts.dragonBreath && target.health > 0) {
            const bType = opts.dragonBreath;
            const perTick = Math.max(1, Math.floor(dmg * 0.33));
            const _riftSummonImmune = (dmgType) => target.isSummoned
                && Array.isArray(target.summonStats?.immune)
                && target.summonStats.immune.includes(dmgType);
            if (bType === 'fire') {
                if (_riftSummonImmune('fire')) {
                    this._addLog(`\u{1F525} ${target.name} is immune to fire!`);
                } else {
                    // Red dragon: burn DoT (same as fire weapon rider)
                    target.addEffect({ type: 'burn', rounds: 2, damage: perTick });
                    this._addLog(`\u{1F525} ${target.name} is set ablaze by the fire breath! (${perTick}/rd for 2 rds)`);
                }
            } else if (bType === 'acid') {
                // Black dragon: acid DoT + defense debuff (same as acid weapon rider)
                target.addEffect({ type: 'acid_dot', rounds: 2, damage: perTick, defenseBonus: -2 });
                this._addLog(`\u{1F7E2} ${target.name} is corroded by the acid breath! (${perTick}/rd, -2 def for 2 rds)`);
            } else if (bType === 'lightning') {
                if (_riftSummonImmune('lightning')) {
                    this._addLog(`⚡ ${target.name} is immune to lightning!`);
                } else {
                    // Blue dragon: stun + damage debuff (same as lightning weapon rider)
                    this._tryApplyStun(target);
                    target.addEffect({ type: 'shocked', rounds: 2, damageBonus: -3 });
                    this._addLog(`⚡ ${target.name} is shocked by the lightning breath! (stunned 1 rd, -3 dmg for 2 rds)`);
                }
            } else if (bType === 'cold') {
                if (_riftSummonImmune('cold')) {
                    this._addLog(`❄️ ${target.name} is immune to cold!`);
                } else {
                    // White dragon: stun + defense debuff (same as ice weapon rider)
                    this._tryApplyStun(target);
                    target.addEffect({ type: 'chilled', rounds: 2, defenseBonus: -3 });
                    this._addLog(`❄️ ${target.name} is frozen by the frost breath! (stunned 1 rd, -3 def for 2 rds)`);
                }
            } else if (bType === 'poison') {
                // Green dragon: poison DoT (same as poison weapon rider — skip undead & golems)
                const isNecroUndeadTarget = target.isSummoned && (UNDEAD_TIERS.some(ut => ut.id === target.summonType) || target.summonType === 'demi_lich' || target.summonType === 'corpse_horror');
                const isGolemImmune = target.isSummoned
                    && Array.isArray(target.summonStats?.immune)
                    && target.summonStats.immune.includes('poison');
                if (!isNecroUndeadTarget && !isGolemImmune) {
                    target.addEffect({ type: 'poison', rounds: 3, damage: perTick });
                    this._addLog(`\u{1F922} ${target.name} is envenomed by the poison breath! (${perTick}/rd for 3 rds)`);
                } else {
                    this._addLog(`\u{1F922} ${target.name} resists the poison breath!`);
                }
            }
        }

        // Wraith life drain — steals a fraction of dealt damage as HP.
        if (typeDef.lifeDrain && dmg > 0 && e.health > 0) {
            const stolenBase = Math.max(1, Math.floor(dmg * WRAITH_DRAIN_FRACTION));
            const rotMult = this._getMummyRotHealMultiplier(e);
            const stolen = Math.max(0, Math.floor(stolenBase * rotMult));
            if (stolen <= 0) {
                this._addLog(`🟤 ${eName}'s life drain is nullified by Mummy Rot!`);
            } else {
                const before = e.health;
                e.health = Math.min(e.maxHealth, e.health + stolen);
                const gained = e.health - before;
                if (gained > 0) {
                    this._addLog(`\u{1F480} ${eName} drains life from ${target.name}, recovering ${gained} HP!`);
                }
            }
        }

        // Level-25+ follow-up attack chain — triggered once per primary hit, not on follow-ups or AoE.
        if (!opts.isFollowup && !opts.aoe && (attackKind === 'melee' || attackKind === 'ranged')) {
            this._triggerMonsterFollowupAttacks(e, attackKind);
        }

        if (target.health <= 0) {
            this._addLog(`${target.name} has fallen!`);
            // Cleric death: dismiss all Spiritual Weapons
            if (target.classId === 'cleric' && (target.spiritualWeapons || []).length > 0) {
                target.spiritualWeapons = [];
                this._addLog(`✨ ${target.name}'s Spiritual Weapons fade as their master falls!`);
            }
        }
        return target;
    }

    /**
     * Spawn an enemy minion into the current combat (used by acid demon and evil necromancer).
     * The minion enters the initiative order and acts from next round onward.
     */
    _summonEnemyMinion(summoner, type, icon = '\u{1F47A}') {
        // Super boss summons twice per call
        const count = summoner && summoner.isSuperBoss ? SUPER_BOSS_SUMMON_COUNT : 1;
        for (let _sc = 0; _sc < count; _sc++) this._spawnOneEnemyMinion(summoner, type, icon);
    }

    _spawnOneEnemyMinion(summoner, type, icon = '\u{1F47A}') {
        const typeDef = ENEMY_TYPES[type];
        if (!typeDef) return;
        const lvl = this.dungeonLevel;

        // Match Enemy.js stat generation: randomStat() × level + compound HP bonus
        const rH = Math.round(randomInt(ENEMY_STAT_MIN, ENEMY_STAT_MAX) * lvl);
        const rS = Math.round(randomInt(ENEMY_STAT_MIN, ENEMY_STAT_MAX) * lvl);
        const rM = Math.round(randomInt(ENEMY_STAT_MIN, ENEMY_STAT_MAX) * lvl);
        const hpExtra = Math.max(0, lvl - (MONSTER_HP_BONUS_THRESHOLD - 1));
        const hpScale = hpExtra > 0 ? Math.pow(1 + MONSTER_HP_BONUS_PER_LEVEL, hpExtra) : 1;
        const baseHp = Math.max(5, Math.round((hpExtra > 0 ? Math.round(rH * hpScale) : rH) * (typeDef.hpMult || 1)));
        const baseSt = Math.max(5, type === 'hydra' ? rS * 3 : rS);
        const baseMp = Math.max(5, rM);
        const def    = Math.max(0, Math.round(Math.floor(lvl / 2) * MONSTER_DEFENSE_PER_2_LVL * (typeDef.defenseMult || 1)));
        const minion = {
            id:            'minion_' + Date.now().toString(36) + '_' + Math.random().toString(36).slice(2, 6),
            type,
            seed:          Math.floor(Math.random() * 100000),
            level:         lvl,
            health:        baseHp,
            maxHealth:     baseHp,
            stamina:       baseSt,
            maxStamina:    baseSt,
            mana:          baseMp,
            maxMana:       baseMp,
            defense:       def,
            activeEffects: [],
            stunned:       false,
            isBoss:        false,
            isMegaBoss:    false,
            bossAtkBonus:  0,
            bossDL:        0,
            charmedRounds: 0,
            charmerId:     null,
            name:          null,
            sprite:        null,
            createSprite:  () => {},
            addEffect:     function(fx) { this.activeEffects.push(fx); },
        };
        this.enemies.push(minion);
        const init = 1 + Math.floor(Math.random() * 6);
        this._initiativeOrder.push({ kind: 'enemy', ref: minion, init, skipThisRound: true });
        this._addLog(`${icon} ${this._eName(summoner)} summons a ${typeDef.name}!`);
    }

    /**
     * L25+ monster multi-attack chain. Each tier is rolled independently —
     * a failed tier does not cancel subsequent ones.
     * 2nd (level%), 3rd (level/2%), 4th (level/4%),
     * 5th (level/8%, L50+), 6th (level/16%, L80+).
     * Follow-up attacks apply the same secondary riders as primary attacks.
     */
    _triggerMonsterFollowupAttacks(e, attackKind) {
        const dlvl = this.dungeonLevel;
        if (dlvl < 25 || e.health <= 0 || this.aliveParty.length === 0) return;

        const typeDef = ENEMY_TYPES[e.type] || {};
        const lvlBoost      = Math.max(0, dlvl - 1);
        const lvlThreeBonus = Math.max(0, dlvl - (MONSTER_DAMAGE_BONUS_THRESHOLD - 1));
        const dmin = MONSTER_MELEE_DAMAGE_MIN + MONSTER_DAMAGE_PER_LEVEL * lvlBoost + MONSTER_DAMAGE_BONUS_PER_LEVEL * lvlThreeBonus;
        const dmax = MONSTER_MELEE_DAMAGE_MAX + MONSTER_DAMAGE_PER_LEVEL * lvlBoost + MONSTER_DAMAGE_BONUS_PER_LEVEL * lvlThreeBonus;

        // All tiers rolled independently — a failed roll does not stop the chain.
        const tiers = [
            dlvl / 100,                       // 2nd attack
            dlvl / 200,                       // 3rd attack
            dlvl / 400,                       // 4th attack
            dlvl >= 50 ? dlvl / 800  : null,  // 5th attack (L50+)
            dlvl >= 80 ? dlvl / 1600 : null,  // 6th attack (L80+)
        ];

        for (const chance of tiers) {
            if (chance === null) continue;
            if (Math.random() >= chance) continue;
            if (e.health <= 0 || this.aliveParty.length === 0) break;

            const pool = attackKind === 'melee' ? (this.aliveFront.length > 0 ? this.aliveFront : this.aliveParty) : this.aliveParty;
            const target = pool[Math.floor(Math.random() * pool.length)];
            if (!target) continue;

            let dmg = randomInt(dmin, dmax);
            dmg = Math.max(1, Math.round(dmg * MONSTER_DAMAGE_MULTIPLIER));
            dmg = Math.max(1, dmg + this._getEnemyDamageMod(e));
            const _fhHit = this._applyEnemyHit(e, target, dmg, attackKind, { isFollowup: true });

            // Apply monster-specific riders on follow-up hits
            if (_fhHit && _fhHit.health > 0) {
                // Roper tentacle riders (ranged follow-ups)
                if (typeDef.isRoperAI && attackKind === 'ranged') {
                    const rLvl = e.level || 1;
                    const tentacleDur = Math.max(1, Math.floor(rLvl / 10));
                    const poisonImmune = this._isPoisonImmunePartyMember(_fhHit)
                        || (_fhHit.isSummoned && _fhHit.summonStats?.incorporeal === true)
                        || (_fhHit.isSummoned && ['rift_fire', 'rift_water', 'rift_earth', 'rift_air'].includes(_fhHit.summonType));
                    if (!poisonImmune) {
                        const existing = (_fhHit.activeEffects || []).find(x => x && x.type === 'roper_weakness');
                        if (!existing) {
                            _fhHit.addEffect({ type: 'roper_weakness', meleeDamageBonus: -rLvl, rounds: tentacleDur });
                            this._addLog(`\u{1F991} ${_fhHit.name}'s muscles weaken! (-${rLvl} melee for ${tentacleDur} rds)`);
                        }
                        if (!this._isParalysisImmunePartyMember(_fhHit) && Math.random() < 0.50) {
                            _fhHit.webbedRounds = Math.max(_fhHit.webbedRounds || 0, tentacleDur);
                            this._addLog(`\u{1F991} ${_fhHit.name} is PARALYZED by the roper's grip! (${tentacleDur} rds)`);
                        }
                    }
                }
            }
        }
    }

    // ────────────────────────────────────────────
    // Damage / effect ticks
    // ────────────────────────────────────────────

    /** Apply raw damage to an enemy after its entangle defense debuff is taken into account.
     *  @param {boolean} isMagic  — if true, checks enemy halfMagicDamage flag (efreeti etc.)
     */
    _damageEnemy(enemy, amount, ignoreDefense = false, isMagic = false, defenseIgnorePct = 0, isRanged = false, options = {}) {
        // Invisible Stalker: 60% miss chance on all incoming attacks
        {
            const eDef = ENEMY_TYPES[enemy?.type] || {};
            if (eDef.isInvisible && Math.random() < 0.60) {
                this._addLog(`👁️ ${this._eName(enemy)} is invisible — the attack passes through empty air!`);
                return 0;
            }
        }
        // Efreeti / fireborn magic resistance: half magic damage.
        if (isMagic) {
            const eDef = ENEMY_TYPES[enemy.type] || {};
            if (eDef.halfMagicDamage) {
                amount = Math.max(1, Math.floor(amount * 0.5));
            }
        }
        // Will-o'-Wisp: 90% magic/AoE resistance
        if (isMagic) {
            const eDef = ENEMY_TYPES[enemy?.type] || {};
            if (eDef.resistMagic90) {
                amount = Math.max(1, Math.floor(amount * 0.10));
            }
        }
        // Clockwork Horror: fully immune to all magic attacks
        if (isMagic) {
            const _eDef = ENEMY_TYPES[enemy.type] || {};
            if (_eDef.fullMagicImmune) {
                this._addLog(`⚙️ ${this._eName(enemy)} is fully immune to magic!`);
                return 0;
            }
        }
        // Gargoyle Sentinel Phase 1: 50% damage reduction (all sources) while above 50% HP
        {
            const _eDef = ENEMY_TYPES[enemy.type] || {};
            if (_eDef.isGargoyleSentinelAI && !enemy.gargoylePhase2 && enemy.health > enemy.maxHealth * 0.50) {
                amount = Math.max(1, Math.floor(amount * 0.5));
            }
        }
        // Vampire Lord gaseous form: takes 1 damage from all sources
        {
            const _eDef = ENEMY_TYPES[enemy.type] || {};
            if (_eDef.isVampireLordAI && enemy.vampireLordGaseous) {
                this._addLog(`\u{1F9DB} ${this._eName(enemy)} is in gaseous form — barely any damage penetrates!`);
                return 1;
            }
        }
        // Physical resistance (evil berserker etc.): half damage from all non-magic attacks.
        if (!isMagic) {
            const eDef = ENEMY_TYPES[enemy?.type] || {};
            if (eDef.resistPhysical) amount = Math.max(1, Math.floor(amount * 0.5));
            // Death Knight enemy: 25% shield block vs physical/ranged
            if (eDef.shieldBlock && Math.random() < eDef.shieldBlock) {
                this._addLog(`🛡️ ${this._eName(enemy)}'s shield deflects the blow!`);
                return 0;
            }
            // Displacer Beast / Assassin Lord displacement: dodge vs physical attacks
            const _eDef2 = ENEMY_TYPES[enemy.type] || {};
            if (_eDef2.displaceChance && Math.random() < _eDef2.displaceChance) {
                this._addLog(`\u{1F406} ${this._eName(enemy)} phases out of the way — the attack misses!`);
                return 0;
            }
            // Remorhaz burn retaliate: only direct contact melee burns the actual attacker.
            const contactAttacker = options && options.contactAttacker;
            if (!isRanged && !isMagic && _eDef2.burnRetaliate && contactAttacker && contactAttacker.health > 0 && Math.random() < _eDef2.burnRetaliate) {
                const _reflectDmg = Math.max(1, Math.floor(amount * 0.30));
                contactAttacker.health = Math.max(0, contactAttacker.health - _reflectDmg);
                const _burnTick = Math.max(1, Math.floor(amount * DRAKE_FIRE_BURN_FRACTION));
                const burnEffect = { type: 'burn', rounds: DRAKE_FIRE_BURN_ROUNDS, damage: _burnTick };
                if (typeof contactAttacker.addEffect === 'function') contactAttacker.addEffect(burnEffect);
                else {
                    contactAttacker.activeEffects = contactAttacker.activeEffects || [];
                    contactAttacker.activeEffects.push(burnEffect);
                }
                const attackerName = contactAttacker.type ? this._eName(contactAttacker) : contactAttacker.name;
                this._addLog(`\u{1F525} ${this._eName(enemy)}'s searing heat scorches ${attackerName} for ${_reflectDmg} instant fire damage and burns them! (${_burnTick}/rd)`);
                if (contactAttacker.health <= 0) {
                    this._addLog(`${attackerName} has been incinerated by the remorhaz's heat!`);
                    if (contactAttacker.type && !contactAttacker._deathHandled) {
                        contactAttacker._deathHandled = true;
                        this._onEnemyDeath(contactAttacker);
                    }
                }
            }
        }

        // Entangle adds to `defenseBonus` which is negative; so it *lowers* the
        // enemy's effective defense — i.e., player damage goes UP. That matches
        // "victim takes more damage" because defenseBonus comes off the top.
        // Hunter's Mark: each mark adds +15% damage (additive stacking)
        const _hmMarkCount = (enemy.activeEffects || []).filter(fx => fx && fx.type === 'hunters_mark').length;
        if (_hmMarkCount > 0) {
            amount = Math.max(1, Math.round(amount * (1 + _hmMarkCount * RANGER_HUNTERS_MARK_DAMAGE_BONUS)));
        }
        const effects = enemy.activeEffects || [];
        let defMod = 0;
        for (const x of effects) {
            if (typeof x.defenseBonus === 'number') defMod += x.defenseBonus;
        }
        // If defMod is negative, damage is amplified by `-defMod`.
        let final = amount;
        if (defMod < 0) final = Math.max(1, amount - defMod); // - of negative = +
        // Apply enemy base defense as flat damage reduction (min 1 dealt).
        // ignoreDefense = true bypasses this (e.g. ranger vs favored enemy).
        if (!ignoreDefense) {
            const clampedIgnore = Math.max(0, Math.min(1, defenseIgnorePct || 0));
            const effectiveDefense = Math.max(0, Math.floor((enemy.defense || 0) * (1 - clampedIgnore)));
            final = Math.max(1, final - effectiveDefense);
        }
        final = Math.max(1, Math.round(final));
        enemy.health = Math.max(0, enemy.health - final);
        const src = Object.prototype.hasOwnProperty.call(options, 'sourceMember')
            ? options.sourceMember
            : (this.currentMember || null);
        const damagingActor = options.contactAttacker || src;
        if (final > 0) this._breakInvisibility(damagingActor);
        if (enemy && enemy.id) {
            this._lastDamageByEnemyId[enemy.id] = {
                member: src,
                killSource: src && src.isSummoned ? 'summon' : 'direct',
            };
        }
        this._emitTelemetry('damageDealt', {
            member: src,
            enemy,
            amount: final,
            isMagic,
            isRanged,
        });

        // Revenant: one-time revive at 50% HP when first killed
        // Must run BEFORE _onEnemyDeath so a reviving enemy is not fed to Corpse Horror
        if (enemy.health <= 0) {
            const rDef = ENEMY_TYPES[enemy?.type] || {};
            if (rDef.isRevenantAI && !enemy.revenantRevived) {
                enemy.revenantRevived = true;
                enemy.health = Math.ceil(enemy.maxHealth * 0.50);
                const rageBonus = Math.max(2, Math.ceil(enemy.level * 0.5));
                enemy.activeEffects = enemy.activeEffects || [];
                enemy.activeEffects.push({ type: 'revenant_rage', damageBonus: rageBonus, rounds: 9999, permanent: true });
                this._addLog(`👻 ${this._eName(enemy)} refuses to die — it rises again at 50% HP with UNNATURAL FURY! (+${rageBonus} dmg)`);
            }
        }

        // Trigger enemy death events AFTER revenant check (revived enemies don't feed the Corpse Horror)
        if (enemy.health <= 0 && !enemy._deathHandled) {
            enemy._deathHandled = true;
            this._onEnemyDeath(enemy);
        }

        // Mandrake Root: retributive sonic scream AoE whenever it takes damage
        if (final > 0 && ENEMY_TYPES[enemy?.type]?.mandrakeScream && this.aliveParty.length > 0) {
            const _screamDmg = Math.max(1, Math.floor(final * 0.40));
            this._addLog(`😱 ${this._eName(enemy)} SHRIEKS in agony — a sonic blast erupts!`);
            for (const _screamTarget of this.aliveParty.slice()) {
                if (_screamTarget.health <= 0) continue;
                this._applyEnemyHit(enemy, _screamTarget, _screamDmg, 'magic', { aoe: true, sonic: true });
                if (this.aliveParty.length === 0) break;
            }
        }

        return final;
    }

    _getBossAuraMult(enemy) {
        let hasBoss = false;
        let hasMegaBoss = false;
        let hasSuperBoss = false;
        for (const e of this.enemies) {
            if (e === enemy || e.health <= 0) continue;
            if (e.isSuperBoss) hasSuperBoss = true;
            else if (e.isMegaBoss) hasMegaBoss = true;
            else if (e.isBoss) hasBoss = true;
        }
        let mult = 1.0;
        if (hasBoss)      mult += 0.25;
        if (hasMegaBoss)  mult += 0.50;
        if (hasSuperBoss) mult += STATUE_BOSS_AURA_MULT;
        return mult;
    }

    /**
     * Sum damage-output modifiers on an enemy (from poison-weapon rider,
     * lightning/ice debuffs, entangle, etc.). Returns a number to ADD to the
     * enemy's rolled damage — usually negative (so the enemy hits softer).
     */
    _getEnemyDamageMod(enemy, attackType = 'melee') {
        const effects = (enemy && enemy.activeEffects) || [];
        let mod = 0;
        for (const x of effects) {
            if (typeof x.damageBonus === 'number') mod += x.damageBonus;
            if (attackType === 'ranged' && typeof x.rangedBonus === 'number') mod += x.rangedBonus;
            if (attackType === 'magic' && typeof x.magicBonus === 'number') mod += x.magicBonus;
        }
        // Boss/mega-boss/super-boss attack bonus split by attack type.
        // bossDL = the dungeon level at spawn time.
        // Melee/ranged: boss +DL×3, mega-boss +DL×4, super-boss +DL×4.5.
        // Magic/AoE:    boss +DL×2, mega-boss +DL×3, super-boss +DL×3.5.
        if (enemy && enemy.bossDL) {
            const dl = enemy.bossDL;
            const isMagic = (attackType === 'magic');
            if (enemy.isSuperBoss) {
                mod += isMagic ? dl * SUPER_BOSS_MAGIC_PER_DL : dl * SUPER_BOSS_MELEE_PER_DL;
            } else if (enemy.isMegaBoss) {
                mod += isMagic ? dl * 3 : dl * 4;
            } else if (enemy.isBoss) {
                mod += isMagic ? dl * 2 : dl * 3;
            }
        } else if (enemy && enemy.bossAtkBonus) {
            // Fallback for older saves without bossDL stored
            mod += enemy.bossAtkBonus;
        }
        return mod;
    }
    /**
     * Roll a weapon-rider proc after a player hit. Applies DoT and/or status
     * debuff onto `enemy` according to the attacker's current weapon rider.
     * Uses `rawDamage` (the damage actually dealt) to compute DoT tick size.
     *
     * No-ops if the attacker has no rider, if the enemy is already dead, or
     * if the proc roll fails.
     *
     * @param {PartyMember} attacker
     * @param {object}      enemy
     * @param {number}      rawDamage  damage dealt on THIS hit
     */
    _applyWeaponRider(attacker, enemy, rawDamage, slot = 'weapon') {
        if (!attacker || !enemy || enemy.health <= 0 || rawDamage <= 0) return;
        const isOffhand = slot === 'offhand';
        const getRider   = isOffhand ? 'getOffhandRider'        : 'getWeaponRider';
        const getEnchLvl = isOffhand ? 'getOffhandEnchantLevel' : 'getWeaponEnchantLevel';
        if (typeof attacker[getRider] !== 'function') return;
        const rider = attacker[getRider]();
        if (!rider) return;

        // fullDoTImmune enemies (e.g. Clockwork Horror) are immune to all weapon
        // riders except acid, which bypasses this immunity.
        const riderEnemyDef = ENEMY_TYPES[enemy.type] || {};
        if (riderEnemyDef.fullDoTImmune && rider !== 'acid') return;

        if (Math.random() >= RIDER_PROC_CHANCE) return;

        const enchLvl = attacker[getEnchLvl] ? attacker[getEnchLvl]() : 0;
        const dotRounds    = RIDER_DOT_BASE_ROUNDS    + enchLvl;
        const debuffRounds = RIDER_DEBUFF_BASE_ROUNDS + enchLvl;
        const debuffMag    = 1 + enchLvl;
        const baseDotTick  = Math.max(1, Math.floor(rawDamage * RIDER_DOT_DAMAGE_FRACTION * RIDER_DOT_DAMAGE_MULT));
        enemy.activeEffects = enemy.activeEffects || [];

        // Push a new independent DoT instance (stacks with existing ones of the same type).
        const pushDoT = (effect) => { enemy.activeEffects.push(effect); };

        // Refresh a debuff: update rounds + magnitude if one already exists, else push new.
        const refreshDebuff = (effect) => {
            const existing = enemy.activeEffects.find(x => x && x.type === effect.type);
            if (existing) {
                existing.rounds = effect.rounds;
                if (typeof effect.defenseBonus === 'number') existing.defenseBonus = effect.defenseBonus;
                if (typeof effect.damageBonus  === 'number') existing.damageBonus  = effect.damageBonus;
            } else {
                enemy.activeEffects.push(effect);
            }
        };

        const eName = this._eName(enemy);

        const enemyTypeDef = ENEMY_TYPES[enemy.type] || {};
        const enemyImmune  = Array.isArray(enemyTypeDef.immune) ? enemyTypeDef.immune : [];
        const isEnemyImmuneTo = (dmgType) => enemyImmune.includes(dmgType)
            || (dmgType === 'poison' && Array.isArray(enemyTypeDef.tags) && enemyTypeDef.tags.includes('undead'));

        switch (rider) {
            case 'fire': {
                if (isEnemyImmuneTo('fire')) {
                    this._addLog(`\u{1F525} ${eName} is immune to fire!`);
                    break;
                }
                let fireTick = Math.max(1, Math.floor(baseDotTick * RIDER_FIRE_DAMAGE_BONUS_MULT));
                if (enemyTypeDef.takesDoubleFire) fireTick *= 2;
                const fireRounds = dotRounds + RIDER_FIRE_BONUS_ROUNDS;
                pushDoT({ type: 'burn', rounds: fireRounds, damage: fireTick });
                const fireDoubleStr = enemyTypeDef.takesDoubleFire ? ' (double — weak to fire!)' : '';
                this._addLog(`\u{1F525} ${eName} is set ablaze! (${fireTick}/rd for ${fireRounds} rds)${fireDoubleStr}`);
                break;
            }
            case 'acid': {
                if (isEnemyImmuneTo('acid')) {
                    this._addLog(`\u{1F7E2} ${eName} is immune to acid!`);
                    break;
                }
                pushDoT({ type: 'acid_dot', rounds: dotRounds, damage: baseDotTick });
                refreshDebuff({ type: 'acid_debuff', rounds: debuffRounds, defenseBonus: -debuffMag });
                this._addLog(`\u{1F7E2} ${eName} is splashed with corrosive acid! (${baseDotTick}/rd for ${dotRounds} rds, -${debuffMag} def for ${debuffRounds} rds)`);
                break;
            }
            case 'poison': {
                if (isEnemyImmuneTo('poison')) {
                    this._addLog(`\u{1F480} ${eName} is immune to poison!`);
                    break;
                }
                const poisonTick   = Math.max(1, Math.floor(baseDotTick * RIDER_FIRE_DAMAGE_BONUS_MULT));
                const poisonRounds = dotRounds + RIDER_FIRE_BONUS_ROUNDS;
                pushDoT({ type: 'poison_weapon', rounds: poisonRounds, damage: poisonTick });
                refreshDebuff({ type: 'poison_debuff', rounds: debuffRounds, damageBonus: -debuffMag });
                this._addLog(`\u{1F40D} ${eName} is envenomed! (${poisonTick}/rd for ${poisonRounds} rds, -${debuffMag} dmg for ${debuffRounds} rds)`);
                break;
            }
            case 'lightning': {
                if (isEnemyImmuneTo('lightning')) {
                    this._addLog(`⚡ ${eName} is immune to lightning!`);
                    break;
                }
                const lightningTick = Math.max(1, Math.floor(baseDotTick * RIDER_STUN_DOT_MULT));
                pushDoT({ type: 'lightning_dot', rounds: dotRounds, damage: lightningTick });
                const _lightningStunLanded = !isEnemyImmuneTo('stun') && this._tryStunEnemy(enemy);
                if (_lightningStunLanded) {
                    this._emitTelemetry('stunInflicted', { member: attacker, enemy, source: 'weapon_rider_lightning' });
                }
                refreshDebuff({ type: 'shocked', rounds: debuffRounds, damageBonus: -debuffMag });
                const stunNote = _lightningStunLanded ? ', stunned 1 rd' : '';
                this._addLog(`⚡ ${eName} is shocked! (${lightningTick}/rd for ${dotRounds} rds, -${debuffMag} dmg for ${debuffRounds} rds${stunNote})`);
                break;
            }
            case 'ice': {
                if (isEnemyImmuneTo('cold')) {
                    this._addLog(`❄️ ${eName} is immune to cold!`);
                    break;
                }
                const frostTick = Math.max(1, Math.floor(baseDotTick * RIDER_STUN_DOT_MULT));
                pushDoT({ type: 'frost_dot', rounds: dotRounds, damage: frostTick });
                const _iceStunLanded = !isEnemyImmuneTo('stun') && this._tryStunEnemy(enemy);
                if (_iceStunLanded) {
                    this._emitTelemetry('stunInflicted', { member: attacker, enemy, source: 'weapon_rider_ice' });
                }
                refreshDebuff({ type: 'chilled', rounds: debuffRounds, defenseBonus: -debuffMag });
                const stunNoteIce = _iceStunLanded ? ', stunned 1 rd' : '';
                this._addLog(`❄️ ${eName} is frozen! (${frostTick}/rd for ${dotRounds} rds, -${debuffMag} def for ${debuffRounds} rds${stunNoteIce})`);
                break;
            }
        }
    }

    /**
     * Tick party-side effects (poison) and decrement durations of temporary
     * buffs (song). Song has no `rounds` so it persists through the whole fight.
     */
    _tickPartyEffects() {
        for (const m of this.party) {
            if (m.health <= 0) continue;
            const effects = m.activeEffects || [];

            // Necromancer undead summons are immune to poison.
            const isNecroUndead = m.isSummoned && (UNDEAD_TIERS.some(ut => ut.id === m.summonType) || m.summonType === 'demi_lich' || m.summonType === 'corpse_horror');
            const isPoisonImmune = m.isSummoned
                && Array.isArray(m.summonStats?.immune)
                && m.summonStats.immune.includes('poison');

            let totalPoison   = 0;
            let totalBurn     = 0;
            let totalDrowning = 0;
            let totalAcid     = 0;
            let totalFrost    = 0;
            for (const e of effects) {
                if (e.type === 'poison' && e.rounds > 0) {
                    if (!isNecroUndead && !isPoisonImmune && !m.isLichForm) totalPoison += (e.damage || 0);
                    e.rounds--;
                }
                // Burn DoT (drake/red dragon fire breath)
                if (e.type === 'burn' && e.rounds > 0) {
                    totalBurn += (e.damage || 0);
                    e.rounds--;
                }
                // Acid DoT (black dragon breath)
                if (e.type === 'acid_dot' && e.rounds > 0) {
                    totalAcid += (e.damage || 0);
                    e.rounds--;
                }
                // Drowning DoT from water elemental
                if (e.type === 'drowning' && e.rounds > 0) {
                    totalDrowning += (e.damage || 0);
                    e.rounds--;
                }
                // Tick down water elemental armor-break debuff
                if (e.type === 'drown_armor_break' && e.rounds > 0) {
                    e.rounds--;
                }
                // Tick down mage shield duration
                if (e.type === 'mage_shield' && e.rounds > 0) {
                    e.rounds--;
                    if (e.rounds <= 0 && this._mageShieldCasterId === e.casterId) {
                        this._mageShieldCasterId = null;
                    }
                }
                // Tick down ice troll / frost breath chill debuff
                if (e.type === 'ice_chill' && e.rounds > 0) {
                    e.rounds--;
                }
                // Tick down lightning breath shock debuff (-damage)
                if (e.type === 'shocked' && e.rounds > 0) {
                    e.rounds--;
                }
                // Tick down frost breath chill debuff (-defense)
                if (e.type === 'chilled' && e.rounds > 0) {
                    e.rounds--;
                }
                // Tick down petrified (Beholder / Medusa) — +200 defense, immobilised
                if (e.type === 'petrified' && e.rounds > 0) {
                    e.rounds--;
                    if (e.rounds <= 0) {
                        this._addLog(`🪨 ${m.name} shakes off the stone — petrification ends!`);
                    }
                }
                // Tick down Mummy Rot (non-permanent version from hostile mummy)
                if (e.type === 'mummy_rot' && !e.permanent && e.rounds > 0) {
                    e.rounds--;
                    if (e.rounds <= 0) {
                        this._addLog(`🟤 ${m.name}'s Mummy Rot has run its course!`);
                    }
                }
                // Tick down necrotic curse (Death Knight debuff)
                if (e.type === 'necrotic_curse' && e.rounds > 0) {
                    e.rounds--;
                    if (e.rounds <= 0) {
                        this._addLog(`💀 ${m.name} shakes off the necrotic curse!`);
                    }
                }
                // Tick down Hag's Curse (multistat debuff from hag/stone hag)
                if (e.type === 'hag_curse' && e.rounds > 0) {
                    e.rounds--;
                    if (e.rounds <= 0) {
                        this._addLog(`🧙 ${m.name} shakes off the hag's hex!`);
                    }
                }
                // Quasit venom DoT tick-down (damage summed below like fracture)
                if (e.type === 'quasit_poison' && e.rounds > 0) {
                    e.rounds--;
                }
                // Wither (Witch Doctor) — stat debuff, tick down
                if (e.type === 'wither' && e.rounds > 0) {
                    e.rounds--;
                    if (e.rounds <= 0) {
                        this._addLog(`\u{1F9B4} ${m.name} shakes off the Wither!`);
                    }
                }
                // Rust corrosion — permanent combat debuff, tick down (will not expire at 9999 rounds for a long time)
                if (e.type === 'rust_corrosion' && e.rounds > 0) {
                    e.rounds--;
                }
                // Taunted (Gladiator) — tick down
                if (e.type === 'taunted' && e.rounds > 0) {
                    e.rounds--;
                    if (e.rounds <= 0) {
                        this._addLog(`⚔️ ${m.name} is no longer taunted!`);
                    }
                }
                // Hex (Witch Doctor) — tick down
                if (e.type === 'hex' && e.rounds > 0) {
                    e.rounds--;
                    if (e.rounds <= 0) {
                        this._addLog(`\u{1F480} ${m.name} shakes off the Hex!`);
                    }
                }
                // Shadow Step — tick down; log when expired
                if (e.type === 'shadow_step' && e.rounds > 0) {
                    e.rounds--;
                    if (e.rounds <= 0) {
                        this._addLog(`\u{1F311} ${m.name} emerges from the shadows!`);
                    }
                }
                // Roper tentacle weakness — melee damage debuff
                if (e.type === 'roper_weakness' && e.rounds > 0) {
                    e.rounds--;
                    if (e.rounds <= 0) {
                        this._addLog(`🦑 ${m.name} shakes off the roper's grip — melee strength restored!`);
                    }
                }
                // Frost DoT from Winter Wolf cold breath (50% breath dmg/rd for 3 rounds)
                if (e.type === 'frost_dot' && e.rounds > 0) {
                    totalFrost += (e.damage || 0);
                    e.rounds--;
                }
            }
            // Fracture DoT (Bone Archer — bleed from shattered bone)
            let totalFracture = 0;
            for (const e of effects) {
                if (e.type === 'fracture' && e.rounds > 0) {
                    totalFracture += (e.damage || 0);
                    e.rounds--;
                }
            }
            if (totalFracture > 0 && m.health > 0) {
                totalFracture = this._applyDivineShroudReduction(m, totalFracture, 'fracture DoT');
                totalFracture = this._absorbMageManaShield(m, totalFracture, 'fracture damage');
                if (totalFracture <= 0) continue;
                m.health = Math.max(0, m.health - totalFracture);
                this._addLog(`🦴 ${m.name} bleeds from fractures — ${totalFracture} damage!`);
                if (m.health <= 0 && this._tryHandlePartyDeathRescue(m)) continue;
                if (m.health <= 0) {
                    this._triggerMageDeathBurst(m, 'fracture wounds');
                    this._addLog(`${m.name} has succumbed to the fracture wounds!`);
                }
            }
            // Quasit venom: armor-ignoring poison DoT (summed after fracture)
            let totalQuasitPoison = 0;
            for (const e of effects) {
                if (e.type === 'quasit_poison' && e.rounds >= 0) {
                    totalQuasitPoison += (e.damage || 0);
                }
            }
            if (totalQuasitPoison > 0 && m.health > 0) {
                totalQuasitPoison = this._applyDivineShroudReduction(m, totalQuasitPoison, 'quasit venom');
                totalQuasitPoison = this._absorbMageManaShield(m, totalQuasitPoison, 'quasit venom');
                if (totalQuasitPoison <= 0) continue;
                m.health = Math.max(0, m.health - totalQuasitPoison);
                this._addLog(`\u{1F47F} ${m.name} writhes in quasit venom — ${totalQuasitPoison} poison damage! (armor-ignoring)`);
                if (m.health <= 0 && this._tryHandlePartyDeathRescue(m)) continue;
                if (m.health <= 0) {
                    this._triggerMageDeathBurst(m, 'quasit venom');
                    this._addLog(`${m.name} has succumbed to quasit venom!`);
                }
            }
            if (totalPoison > 0) {
                if (!m.isSummoned && m.classId === 'verminkeeper') {
                    const resist = Math.min(0.75, (m.level || 1) * VK_RESIST_PER_LEVEL);
                    totalPoison = Math.max(1, Math.floor(totalPoison * (1 - resist)));
                    this._addLog(`\u{1F577}️ ${m.name}'s toxin affinity reduces the poison! (${Math.round(resist * 100)}% resist)`);
                }
                totalPoison = this._applyDivineShroudReduction(m, totalPoison, 'poison DoT');
                totalPoison = this._absorbMageManaShield(m, totalPoison, 'poison damage');
                if (totalPoison <= 0) continue;
                m.health = Math.max(0, m.health - totalPoison);
                this._addLog(`\u{1F7E2} ${m.name} suffers ${totalPoison} poison damage!`);
                if (m.health <= 0 && this._tryHandlePartyDeathRescue(m)) continue;
                if (m.health <= 0) {
                    this._triggerMageDeathBurst(m, 'poison');
                    this._addLog(`${m.name} has fallen to the poison!`);
                }
            }
            if (totalBurn > 0 && m.health > 0) {
                // Plant summons (treants, shambling mounds) take double fire DoT damage
                const isPlantSummon = m.isSummoned && ['treant', 'shambling_mound'].includes(m.summonStats?.beastKind);
                let effectiveBurn = isPlantSummon ? Math.round(totalBurn * 2.0) : totalBurn;
                effectiveBurn = this._applyDivineShroudReduction(m, effectiveBurn, 'burn DoT');
                effectiveBurn = this._absorbMageManaShield(m, effectiveBurn, 'burn damage');
                if (effectiveBurn <= 0) continue;
                m.health = Math.max(0, m.health - effectiveBurn);
                this._addLog(`\u{1F525} ${m.name} takes ${effectiveBurn} burn damage!${isPlantSummon ? ' \u{1F333} (plant vulnerability!)' : ''}`);
                if (m.health <= 0 && this._tryHandlePartyDeathRescue(m)) continue;
                if (m.health <= 0) {
                    this._triggerMageDeathBurst(m, 'burn');
                    this._addLog(`${m.name} has been consumed by the flames!`);
                }
            }
            if (totalAcid > 0 && m.health > 0) {
                if (!m.isSummoned && m.classId === 'verminkeeper') {
                    const resist = Math.min(0.75, (m.level || 1) * VK_RESIST_PER_LEVEL);
                    totalAcid = Math.max(1, Math.floor(totalAcid * (1 - resist)));
                    this._addLog(`\u{1F577}️ ${m.name}'s corrosion resistance blunts the acid! (${Math.round(resist * 100)}% resist)`);
                }
                totalAcid = this._applyDivineShroudReduction(m, totalAcid, 'acid DoT');
                totalAcid = this._absorbMageManaShield(m, totalAcid, 'acid damage');
                if (totalAcid <= 0) continue;
                m.health = Math.max(0, m.health - totalAcid);
                this._addLog(`\u{1F7E2} ${m.name} suffers ${totalAcid} acid damage!`);
                if (m.health <= 0 && this._tryHandlePartyDeathRescue(m)) continue;
                if (m.health <= 0) {
                    this._triggerMageDeathBurst(m, 'acid');
                    this._addLog(`${m.name} has been dissolved by the acid!`);
                }
            }
            if (totalDrowning > 0 && m.health > 0) {
                totalDrowning = this._applyDivineShroudReduction(m, totalDrowning, 'drowning DoT');
                totalDrowning = this._absorbMageManaShield(m, totalDrowning, 'drowning damage');
                if (totalDrowning <= 0) continue;
                m.health = Math.max(0, m.health - totalDrowning);
                this._addLog(`\u{1F30A} ${m.name} chokes on water, taking ${totalDrowning} drowning damage!`);
                if (m.health <= 0 && this._tryHandlePartyDeathRescue(m)) continue;
                if (m.health <= 0) {
                    this._triggerMageDeathBurst(m, 'drowning');
                    this._addLog(`${m.name} has drowned!`);
                }
            }
            if (totalFrost > 0 && m.health > 0) {
                totalFrost = this._applyDivineShroudReduction(m, totalFrost, 'frost DoT');
                totalFrost = this._absorbMageManaShield(m, totalFrost, 'frost damage');
                if (totalFrost <= 0) continue;
                m.health = Math.max(0, m.health - totalFrost);
                this._addLog(`❄️ ${m.name} suffers ${totalFrost} frost damage!`);
                if (m.health <= 0 && this._tryHandlePartyDeathRescue(m)) continue;
                if (m.health <= 0) {
                    this._triggerMageDeathBurst(m, 'frost');
                    this._addLog(`${m.name} has been frozen solid!`);
                }
            }
            if (m.classId === 'barbarian' && m.werebearActive && m.health > 0) {
                if ((m.stamina || 0) >= BARBARIAN_WEREBEAR_STAMINA_PER_ROUND) {
                    m.stamina = Math.max(0, (m.stamina || 0) - BARBARIAN_WEREBEAR_STAMINA_PER_ROUND);
                } else {
                    this._endWerebearForm(m, ' from exhaustion');
                }
            }
            if (m.classId === 'barbarian' && m.werebearActive && m.health > 0) {
                const regenAmt = Math.max(1, Math.floor(m.maxHealth * BARBARIAN_WEREBEAR_REGEN));
                const healed = Math.min(regenAmt, m.maxHealth - m.health);
                if (healed > 0) {
                    m.health += healed;
                    this._addLog(`🐻 ${m.name}'s Werebear vitality restores ${healed} HP!`);
                }
            }
            if (m.classId === 'barbarian' && m.isRaging && m.health > 0 && m.level >= BARBARIAN_ENCOURAGE_UNLOCK_LEVEL) {
                m.rageEncourageRounds = Math.min(BARBARIAN_ENCOURAGE_MAX_ROUNDS, (m.rageEncourageRounds || 0) + 1);
            }
            // Barbarian rage: regenerate 5% max HP per round
            if (m.classId === 'barbarian' && m.isRaging && !m.werebearActive && m.health > 0) {
                const regenAmt = Math.max(1, Math.floor(m.maxHealth * BARBARIAN_RAGE_HP_REGEN));
                const healed = Math.min(regenAmt, m.maxHealth - m.health);
                if (healed > 0) {
                    m.health += healed;
                    this._addLog(`\u{1F534} ${m.name} rages, healing ${healed} HP!`);
                }
            }
            // Hunter's Mark: verify target alive, then deduct upkeep
            if (m.classId === 'ranger' && m.hunterMarkEnemyId && m.health > 0) {
                const _markedEnemy = this.enemies.find(e => e.id === m.hunterMarkEnemyId);
                if (!_markedEnemy || _markedEnemy.health <= 0) {
                    // Target already dead — just clean up the reference
                    m.hunterMarkEnemyId = null;
                } else if (m.stamina >= RANGER_HUNTERS_MARK_UPKEEP_STAMINA && m.mana >= RANGER_HUNTERS_MARK_UPKEEP_MANA) {
                    m.stamina -= RANGER_HUNTERS_MARK_UPKEEP_STAMINA;
                    m.mana    -= RANGER_HUNTERS_MARK_UPKEEP_MANA;
                    this._addLog(`🎯 ${m.name}'s Hunter's Mark holds on ${this._eName(_markedEnemy)} (-${RANGER_HUNTERS_MARK_UPKEEP_MANA} MP, -${RANGER_HUNTERS_MARK_UPKEEP_STAMINA} ST).`);
                } else {
                    m.hunterMarkEnemyId = null;
                    _markedEnemy.activeEffects = (_markedEnemy.activeEffects || []).filter(fx => fx && !(fx.type === 'hunters_mark' && fx.markerId === m.id));
                    this._addLog(`🎯 ${m.name}'s Hunter's Mark fades — insufficient resources!`);
                }
            }
            // Vermin Keeper Hive Mind Control: mark upkeep and auto-cleanup
            if (m.classId === 'verminkeeper' && m.health > 0 && (m.level || 1) >= VK_L35_UNLOCK_LEVEL && m.vkHiveMindEnemyId) {
                const marked = this.enemies.find(e => e.id === m.vkHiveMindEnemyId);
                if (!marked || marked.health <= 0 || (marked.charmedRounds || 0) > 0) {
                    this._clearVKHiveMark(m);
                } else if ((m.mana || 0) >= VK_HIVE_MIND_UPKEEP_MANA) {
                    m.mana = Math.max(0, (m.mana || 0) - VK_HIVE_MIND_UPKEEP_MANA);
                    this._addLog(`🕸️ ${m.name} sustains Hive Mind on ${this._eName(marked)} (-${VK_HIVE_MIND_UPKEEP_MANA} MP).`);
                } else {
                    this._clearVKHiveMark(m, 'insufficient mana');
                }
            }
            // Beastlord: base mana upkeep and per-summon upkeep
            if (m.classId === 'ranger' && m.beastlordActive && m.health > 0) {
                const _beastlordBeasts = this.party.filter(p => p.isSummoned && p.summonerId === m.id && p.summonStats && p.summonStats.beastlordSummoned && p.health > 0);
                const _beastlordTotal = RANGER_BEASTLORD_MANA_PER_ROUND + _beastlordBeasts.length * RANGER_BEASTLORD_UPKEEP_PER_SUMMON;
                if (m.mana >= _beastlordTotal) {
                    m.mana -= _beastlordTotal;
                    this._addLog(`🦎 ${m.name}'s Beastlord burns ${_beastlordTotal} MP (-${RANGER_BEASTLORD_MANA_PER_ROUND} base, -${_beastlordBeasts.length * RANGER_BEASTLORD_UPKEEP_PER_SUMMON} upkeep).`);
                    // Auto-summon roll
                    const _summonChance = (Math.floor(m.level / 2) + RANGER_BEASTLORD_SUMMON_BASE) / 100;
                    if (Math.random() < _summonChance) {
                        this._beastlordAutoSummon(m);
                    }
                } else {
                    m.mana = 0;
                    m.beastlordActive = false;
                    this._addLog(`🦎 ${m.name}'s Beastlord fades — no mana left!`);
                }
            }
            if (m.classId === 'ranger' && m.rangerTotem && m.health > 0) {
                if (m.mana >= RANGER_TOTEM_MANA_PER_ROUND) {
                    m.mana -= RANGER_TOTEM_MANA_PER_ROUND;
                    this._addLog(`🪶 ${m.name}'s ${m.rangerTotem} totem consumes ${RANGER_TOTEM_MANA_PER_ROUND} MP.`);
                } else {
                    m.mana = 0;
                    this._addLog(`🪶 ${m.name}'s animal totem fades — no mana left.`);
                    m.rangerTotem = null;
                }
            }
            // Elemental Rift (Mage L30): 10 MP/round upkeep; close rift if out of mana; roll elemental summon
            if (m.classId === 'mage' && m.elementalRiftOpen && m.health > 0) {
                if (m.mana >= MAGE_ELEMENTAL_RIFT_MANA_PER_ROUND) {
                    m.mana -= MAGE_ELEMENTAL_RIFT_MANA_PER_ROUND;
                    const riftChance = Math.min(1, (m.level + MAGE_ELEMENTAL_RIFT_SUMMON_BASE) / 100);
                    if (Math.random() < riftChance) {
                        this._riftSummonElemental(m);
                    } else {
                        this._addLog(`\u{1F300} ${m.name}'s Elemental Rift pulses... (-${MAGE_ELEMENTAL_RIFT_MANA_PER_ROUND} MP)`);
                    }
                } else {
                    m.mana = 0;
                    m.elementalRiftOpen = false;
                    this._addLog(`\u{1F300} ${m.name}'s Elemental Rift collapses — no mana left!`);
                }
            }
            if (m.classId === 'warlock' && m.health > 0) {
                const hasHex = this.aliveHostileEnemies.some(e =>
                    (e.activeEffects || []).some(fx => fx && fx.type === 'warlock_hex' && fx.casterId === m.id && fx.rounds > 0));
                if (hasHex) {
                    if (m.mana >= WARLOCK_HEX_UPKEEP_MANA) {
                        m.mana -= WARLOCK_HEX_UPKEEP_MANA;
                        this._addLog(`\u{1F9FF} ${m.name}'s Evil Eye feeds on ${WARLOCK_HEX_UPKEEP_MANA} MP.`);
                    } else {
                        for (const e of this.enemies) {
                            e.activeEffects = (e.activeEffects || []).filter(fx => !(fx && fx.type === 'warlock_hex' && fx.casterId === m.id));
                        }
                        this._addLog(`\u{1F9FF} ${m.name}'s Evil Eye fades — no mana left.`);
                    }
                }
                if (m.warlockCauldronOpen) {
                    const demons = this._getWarlockBoundDemons(m);
                    const upkeep = demons.length * WARLOCK_DEMON_UPKEEP_HP;
                    if (upkeep > 0) {
                        m.health = Math.max(0, m.health - upkeep);
                        this._addLog(`\u{1F608} ${m.name}'s bound demons drink ${upkeep} HP in upkeep.`);
                    }
                    if (m.health <= 0) {
                        this._addLog(`${m.name} is consumed by the cauldron's bargain!`);
                        m.warlockCauldronOpen = false;
                        this._removeWarlockSummons(m);
                    } else {
                        this._warlockSummonDemon(m, m.warlockSelectedDemon);
                    }
                }
                if (m.abyssFormActive && !m.eldritchSignReady && Math.random() < WARLOCK_ELDRITCH_SIGN_RECHARGE_CHANCE) {
                    m.eldritchSignReady = true;
                    this._addLog(`\u{1F9FF} The Eldritch Sign reforms before ${m.name}.`);
                }
            }
            // Druid Wild Shape: 5 MP/round upkeep; exit form if out of mana.
            if (m.classId === 'druid' && m.wildShapeForm && m.health > 0) {
                if (m.mana >= DRUID_WILD_SHAPE_MANA_PER_ROUND) {
                    m.mana -= DRUID_WILD_SHAPE_MANA_PER_ROUND;
                    this._addLog(`\u{1F43E} ${m.name}'s Wild Shape burns ${DRUID_WILD_SHAPE_MANA_PER_ROUND} MP.`);
                } else {
                    m.mana = 0;
                    this._addLog(`\u{1F43E} ${m.name}'s Wild Shape fades — no mana left!`);
                    this._exitWildShape(m);
                }
            }
            // Druid L35 Nature's Charms: per-charmed-minion upkeep + per-round charm attempts
            if (m.classId === 'druid' && m.naturesCharmActive && m.health > 0) {
                const _ncCharmed = this.enemies.filter(e => e.naturesCharmed && e.charmedRounds > 0 && e.charmerId === m.id);
                const _ncUpkeep  = _ncCharmed.length * DRUID_NATURES_CHARM_UPKEEP_PER_ROUND;
                if (_ncUpkeep > 0) {
                    if (m.mana >= _ncUpkeep) {
                        m.mana -= _ncUpkeep;
                        this._addLog(`\u{1F33F} ${m.name}'s Nature's Charms maintains ${_ncCharmed.length} minion${_ncCharmed.length > 1 ? 's' : ''} (-${_ncUpkeep} MP).`);
                    } else {
                        m.mana = 0;
                        m.naturesCharmActive = false;
                        for (const _nce of _ncCharmed) {
                            _nce.charmedRounds = 0;
                            _nce.charmerId     = null;
                            _nce.naturesCharmed = false;
                            this._addLog(`\u{1F33F} ${this._eName(_nce)} breaks free — ${m.name}'s mana is exhausted!`);
                        }
                        this._addLog(`\u{1F33F} ${m.name}'s Nature's Charms fades — no mana left!`);
                    }
                }
                // Attempt eligible plant/beast enemies until one charm succeeds this round.
                if (m.naturesCharmActive) {
                    const _ncChance   = Math.min(0.95, (m.level / DRUID_NATURES_CHARM_CHANCE_DIVISOR) / 100);
                    const _ncDuration = Math.max(1, Math.floor(m.level / BARD_CHARM_DURATION_DIVISOR) + DRUID_NATURES_CHARM_DURATION_BONUS);
                    let _ncCharmedThisRound = false;
                    for (const _nce of this.aliveHostileEnemies.slice()) {
                        if (_ncCharmedThisRound) break;
                        if (_nce.health <= 0 || _nce.charmedRounds > 0 || _nce.naturesCharmImmune) continue;
                        if (_nce.isBoss || _nce.isMegaBoss || _nce.isSuperBoss) continue;
                        const _ncTags = this._getEnemyTags(_nce);
                        if (!DRUID_NATURES_CHARM_TAGS.some(t => _ncTags.includes(t))) continue;
                        if (Math.random() < _ncChance) {
                            this._prepareCharmedAlly(_nce);
                            _nce.charmedRounds        = _ncDuration;
                            _nce.charmerId            = m.id;
                            _nce.naturesCharmed       = true;
                            _nce.naturesCharmBolster  = m.level * DRUID_NATURES_CHARM_BOLSTER_PER_LEVEL;
                            _ncCharmedThisRound = true;
                            this._addLog(`\u{1F33F} ${m.name}'s Nature's Charms wins over ${this._eName(_nce)}! (${_ncDuration} rds, +${Math.round(_nce.naturesCharmBolster * 100)}% dmg)`);
                        } else {
                            _nce.naturesCharmResists = (_nce.naturesCharmResists || 0) + 1;
                            if (_nce.naturesCharmResists >= DRUID_NATURES_CHARM_RESIST_CAP) {
                                _nce.naturesCharmImmune = true;
                                this._addLog(`\u{1F33F} ${this._eName(_nce)} resists Nature's Charms ${_nce.naturesCharmResists}× — now immune this combat!`);
                            }
                        }
                    }
                }
            }
            if (m.classId === 'monk' && m.avatarActive && m.health > 0) {
                if (m.mana >= MONK_AVATAR_MANA_PER_ROUND) {
                    m.mana -= MONK_AVATAR_MANA_PER_ROUND;
                    const regenAmt = Math.max(1, Math.floor(m.maxHealth * MONK_AVATAR_HP_REGEN));
                    const healed = Math.min(regenAmt, m.maxHealth - m.health);
                    if (healed > 0) {
                        m.health += healed;
                        this._addLog(`🧘 ${m.name}'s Avatar restores ${healed} HP.`);
                    } else {
                        this._addLog(`🧘 ${m.name}'s Avatar burns ${MONK_AVATAR_MANA_PER_ROUND} MP.`);
                    }
                } else {
                    m.mana = 0;
                    m.avatarActive = false;
                    this._addLog(`🧘 ${m.name}'s Avatar fades — no mana left.`);
                }
            }
            // Paladin Fire Aura: drain MP per round; auto-extinguish if out of mana.
            if (m.classId === 'paladin' && m.fireAuraActive && m.health > 0) {
                if (m.mana >= PALADIN_FIRE_AURA_MANA_PER_ROUND) {
                    m.mana -= PALADIN_FIRE_AURA_MANA_PER_ROUND;
                    this._addLog(`\u{1F525} ${m.name}'s Fire Aura flickers (-${PALADIN_FIRE_AURA_MANA_PER_ROUND} MP).`);
                } else {
                    m.mana = 0;
                    m.fireAuraActive = false;
                    this._addLog(`\u{1F525} ${m.name}'s Fire Aura sputters out — no mana left!`);
                }
            }
            if (m.classId === 'paladin' && m.dragonslayerActive && m.health > 0) {
                if (m.mana >= PALADIN_DRAGONSLAYER_MANA_PER_ROUND) {
                    m.mana -= PALADIN_DRAGONSLAYER_MANA_PER_ROUND;
                    this._addLog(`🐉 ${m.name}'s Dragonslayer stance burns ${PALADIN_DRAGONSLAYER_MANA_PER_ROUND} MP.`);
                } else {
                    m.mana = 0;
                    m.dragonslayerActive = false;
                    this._addLog(`🐉 ${m.name}'s Dragonslayer stance fades — no mana left!`);
                }
            }
            if (m.classId === 'paladin' && m.paladinSteedActive && m.health > 0) {
                if (m.mana >= PALADIN_STEED_MANA_PER_ROUND) {
                    m.mana -= PALADIN_STEED_MANA_PER_ROUND;
                    this._addLog(`🐎 ${m.name}'s summoned steed draws ${PALADIN_STEED_MANA_PER_ROUND} MP.`);
                } else {
                    m.mana = 0;
                    this._dismissPaladinSteed(m, ' as their mana runs dry');
                }
            }
            if (m.classId === 'paladin' && m.martyrsCovenantActive && m.health > 0) {
                if (m.mana >= PALADIN_COVENANT_MANA_PER_ROUND) {
                    m.mana -= PALADIN_COVENANT_MANA_PER_ROUND;
                    this._addLog(`✝️ ${m.name}'s Martyr's Covenant draws ${PALADIN_COVENANT_MANA_PER_ROUND} MP.`);
                } else {
                    m.mana = 0;
                    m.martyrsCovenantActive = false;
                    this._addLog(`✝️ ${m.name}'s Martyr's Covenant breaks — no mana left!`);
                }
            }
            if (m.classId === 'cleric' && m.divineShroudActive && m.health > 0) {
                if (m.mana >= CLERIC_DIVINE_SHROUD_MANA_PER_ROUND) {
                    m.mana -= CLERIC_DIVINE_SHROUD_MANA_PER_ROUND;
                    this._addLog(`✨ ${m.name}'s Divine Shroud draws ${CLERIC_DIVINE_SHROUD_MANA_PER_ROUND} MP.`);
                } else {
                    m.mana = 0;
                    m.divineShroudActive = false;
                    this._addLog(`✨ ${m.name}'s Divine Shroud fades — no mana left!`);
                }
            }
            // Lich Form: 15 MP/round upkeep; stamina→mana conversion on mana exhaustion
            if (m.classId === 'necromancer' && m.isLichForm && !m.lichPhial) {
                if (m.mana >= NECRO_LICH_FORM_MANA_PER_ROUND) {
                    m.mana -= NECRO_LICH_FORM_MANA_PER_ROUND;
                    this._addLog(`💀 ${m.name}'s Lich Form drains ${NECRO_LICH_FORM_MANA_PER_ROUND} MP.`);
                } else if (m.stamina > 0) {
                    const stamConv = m.stamina;
                    m.mana    = stamConv;
                    m.stamina = 0;
                    this._addLog(`💀 ${m.name}'s mana exhausted — converting ${stamConv} stamina to mana to sustain Lich Form!`);
                } else {
                    m.isLichForm = false;
                    this._addLog(`💀 ${m.name}'s mana and stamina exhausted — Lich Form collapses!`);
                }
            }

            // Warrior Formation: 10 ST/round; warrior failure also drops all their squires.
            if (m.classId === 'warrior' && !m.isSummoned && m.isInFormation && m.health > 0) {
                if (m.stamina >= WARRIOR_FORMATION_STAMINA_PER_ROUND) {
                    m.stamina -= WARRIOR_FORMATION_STAMINA_PER_ROUND;
                    this._addLog(`⚔️ ${m.name}'s Formation consumes ${WARRIOR_FORMATION_STAMINA_PER_ROUND} ST.`);
                } else {
                    m.stamina = 0;
                    m.isInFormation = false;
                    for (const sq of this.party) {
                        if (sq.isSummoned && sq.summonType === 'squire' && sq.summonerId === m.id && sq.isInFormation) {
                            sq.isInFormation = false;
                        }
                    }
                    this._addLog(`⚔️ ${m.name}'s stamina fails — Formation breaks!`);
                }
            }
            // Warrior Taunt: 1 ST/round; automatically drops when stamina is gone.
            if (m.classId === 'warrior' && !m.isSummoned && m.warriorTauntActive && m.health > 0) {
                if (m.stamina >= WARRIOR_TAUNT_STAMINA_PER_ROUND) {
                    m.stamina -= WARRIOR_TAUNT_STAMINA_PER_ROUND;
                    this._addLog(`🛡️ ${m.name}'s Taunt consumes ${WARRIOR_TAUNT_STAMINA_PER_ROUND} ST.`);
                } else {
                    m.stamina = 0;
                    m.warriorTauntActive = false;
                    this._addLog(`🛡️ ${m.name}'s Taunt drops — no stamina left.`);
                }
            }
            // Squire Formation: 10 ST/round; only this squire drops if it can't pay.
            if (m.isSummoned && m.summonType === 'squire' && m.isInFormation && m.health > 0) {
                if (m.stamina >= WARRIOR_FORMATION_STAMINA_PER_ROUND) {
                    m.stamina -= WARRIOR_FORMATION_STAMINA_PER_ROUND;
                } else {
                    m.stamina = 0;
                    m.isInFormation = false;
                    this._addLog(`⚔️ ${m.name} breaks formation — stamina exhausted.`);
                }
            }

            // Golem Berserk overload: 5% current HP self-damage per round; auto-exit at 10% max HP
            if (m.isSummoned && GOLEM_PRESETS[m.summonType] && m.golemBerserkActive && m.health > 0) {
                const minHp = Math.max(1, Math.ceil(m.maxHealth * ARTIFICER_BERSERK_MIN_HP_PCT));
                const overload = Math.max(1, Math.ceil(m.health * ARTIFICER_BERSERK_OVERLOAD_PCT));
                const newHp = Math.max(minHp, m.health - overload);
                const actual = m.health - newHp;
                m.health = newHp;
                if (actual > 0) this._addLog(`⚡⚙️ ${m.name} overloads: ${actual} self-damage from Berserk Mode! (${m.health}/${m.maxHealth} HP)`);
                if (m.health <= minHp) {
                    m.golemBerserkActive = false;
                    m.golemBerserkUsed = true;
                    this._addLog(`⚙️ ${m.name} hits critical HP threshold — Berserk Mode automatically exits! Cannot re-enter this combat.`);
                }
            }

            // Thunderous Drums (Bard L30): 10 MP/round; auto-stop if out of mana.
            if (m.classId === 'bard' && m.thunderousDrumsActive && m.health > 0) {
                if (m.mana >= BARD_THUNDEROUS_DRUMS_MANA_PER_ROUND) {
                    m.mana -= BARD_THUNDEROUS_DRUMS_MANA_PER_ROUND;
                    this._addLog(`🥁 ${m.name}'s Thunderous Drums beat on (-${BARD_THUNDEROUS_DRUMS_MANA_PER_ROUND} MP).`);
                } else {
                    m.mana = 0;
                    m.thunderousDrumsActive = false;
                    this._addLog(`🥁 ${m.name}'s Thunderous Drums fade — no mana left!`);
                }
            }
            // Quickstep Song (Bard L35): refresh haste onto newly-added qualifying combatants each round
            if (m.classId === 'bard' && m.quickstepSongActive && m.health > 0) {
                for (const _qsp of this.party) {
                    if (_qsp.health <= 0 || _qsp.quickstepHasteActive) continue;
                    if (this._isQuickstepHasteQualifier(_qsp)) {
                        _qsp.quickstepHasteActive = true;
                        this._addLog(`⚡ ${_qsp.name} steps into ${m.name}'s Quickstep rhythm!`);
                    }
                }
            }
            // Necromancer undead upkeep: 1 MP per living undead per round
            if (m.classId === 'necromancer' && m.health > 0) {
                const myUndead = this.party.filter(p =>
                    p.isSummoned && p.summonerId === m.id &&
                    (UNDEAD_TIERS.some(ut => ut.id === p.summonType) || p.summonType === 'corpse_horror') && p.health > 0,
                );
                // Also count beasts summoned by this necromancer's vampires
                const myVampireBeasts = this.party.filter(p =>
                    p.isSummoned && p.summonStats && p.summonStats.vampireBeast &&
                    p.summonStats.vampireNecromancer === m.id && p.health > 0,
                );
                const totalUndead = myUndead.length;
                const totalBeasts = myVampireBeasts.length;
                const totalUpkeep = (totalUndead + totalBeasts) * NECRO_UNDEAD_MANA_UPKEEP;

                if (totalUpkeep > 0) {
                    m.mana = Math.max(0, m.mana - totalUpkeep);
                    let msg = `💀 ${m.name}'s`;
                    if (totalUndead > 0) msg += ` ${totalUndead} undead`;
                    if (totalUndead > 0 && totalBeasts > 0) msg += ' and';
                    if (totalBeasts > 0) msg += ` ${totalBeasts} minions`;
                    msg += ` drain ${totalUpkeep} MP/round.`;
                    this._addLog(msg);
                }
            }
            // Combat Regen HoT (Cleric Mass Regen — L20)
            for (const e of effects) {
                if (e.type === 'combat_regen' && e.rounds > 0 && m.health < m.maxHealth) {
                    if (!this._canReceiveLivingHealOrBuff(m)) {
                        e.rounds = 0;
                        continue;
                    }
                    const healAmt = Math.max(1, Math.floor(m.maxHealth * (e.healPct || 0)));
                    const healed  = Math.min(healAmt, m.maxHealth - m.health);
                    if (healed > 0) {
                        m.health += healed;
                        this._addLog(`✨ ${m.name} regenerates ${healed} HP from Mass Regen!`);
                    }
                    e.rounds--;
                }
            }
            m.expireEffects();
        }

        // Lich phial countdown (runs even when health === 0)
        for (const pm of this.party) {
            if (!pm.lichPhial || pm.isSummoned) continue;
            pm.lichReviveRoundsLeft = (pm.lichReviveRoundsLeft || 0) - 1;
            if (pm.lichReviveRoundsLeft > 0) {
                this._addLog(`💀 ${pm.name}'s soul stirs in the phial... (${pm.lichReviveRoundsLeft} rds)`);
            } else {
                const overLv   = Math.max(0, Math.floor(((pm.level || 0) - NECRO_LICH_FORM_UNLOCK_LEVEL) / 2));
                const reviveFrac = Math.min(1, NECRO_LICH_REVIVE_HP_BASE + overLv * NECRO_LICH_REVIVE_HP_PER_2LV);
                const reviveHp = Math.max(1, Math.floor(pm.maxHealth * reviveFrac));
                pm.health   = reviveHp;
                pm.lichPhial = false;
                this._addLog(`💀 ${pm.name} is reborn from the phial in Lich Form at ${reviveHp} HP!`);
            }
        }

        // Remove mage shield if the caster has been defeated.
        if (this._mageShieldCasterId !== null) {
            const caster = this.party.find(t => t.id === this._mageShieldCasterId);
            if (!caster || caster.health <= 0) {
                this._removeMageShield(this._mageShieldCasterId);
                this._addLog(`\u{1F6E1}\uFE0F The Arcane Shield collapses as its caster falls!`);
            }
        }
    }

    /**
     * Tick enemy-side effects (entangle duration) and apply per-turn regen
     * for monsters with a `regenPercent` (e.g. troll).
     */
    /**
     * Mega-boss summon: 33%/turn chance to spawn a normal (non-boss) version of itself.
     * The minion enters the initiative order and acts from next round onward.
     */
    _megaBossSummonMinion(megaBoss) {
        const typeDef = ENEMY_TYPES[megaBoss.type];
        if (!typeDef) return;
        const lvl = Math.max(1, megaBoss.level || this.dungeonLevel || 1);

        // Use the exact same stat generation as Enemy constructor + EnemyManager.
        const rH = Math.round(randomInt(ENEMY_STAT_MIN, ENEMY_STAT_MAX) * lvl);
        const rS = Math.round(randomInt(ENEMY_STAT_MIN, ENEMY_STAT_MAX) * lvl);
        const rM = Math.round(randomInt(ENEMY_STAT_MIN, ENEMY_STAT_MAX) * lvl);
        const hpExtraLevels = Math.max(0, lvl - (MONSTER_HP_BONUS_THRESHOLD - 1));
        const hpBonus = hpExtraLevels > 0 ? Math.pow(1 + MONSTER_HP_BONUS_PER_LEVEL, hpExtraLevels) : 1;
        let baseHp = hpExtraLevels > 0 ? Math.round(rH * hpBonus) : rH;
        let baseDef = Math.floor(lvl / 2) * MONSTER_DEFENSE_PER_2_LVL;
        // Apply type-level multipliers (e.g. earth_elemental double HP/defense)
        if (typeDef.hpMult && typeDef.hpMult !== 1) baseHp = Math.round(baseHp * typeDef.hpMult);
        if (typeDef.defenseMult && typeDef.defenseMult !== 1) baseDef = Math.round(baseDef * typeDef.defenseMult);

        const minion = {
            id:            'mb_minion_' + Date.now().toString(36) + '_' + Math.random().toString(36).slice(2, 6),
            type:          megaBoss.type,
            seed:          Math.floor(Math.random() * 100000),
            level:         lvl,
            health:        baseHp,
            maxHealth:     baseHp,
            stamina:       megaBoss.type === 'hydra' ? rS * 3 : rS,
            maxStamina:    megaBoss.type === 'hydra' ? rS * 3 : rS,
            mana:          rM,
            maxMana:       rM,
            defense:       baseDef,
            activeEffects: [],
            stunned:       false,
            isBoss:        false,
            isMegaBoss:    false,
            bossAtkBonus:  0,
            bossDL:        0,
            charmedRounds: 0,
            charmerId:     null,
            name:          null,
            sprite:        null,
            createSprite:  () => {},
            addEffect:     function(fx) { this.activeEffects.push(fx); },
        };
        this.enemies.push(minion);
        // Insert at end of initiative order; acts next round
        const init = 1 + Math.floor(Math.random() * 6);
        this._initiativeOrder.push({ kind: 'enemy', ref: minion, init, skipThisRound: true });
        this._addLog(`💀 ${this._eName(megaBoss)} tears a rift — a ${this._eName(minion)} materializes from the void!`);
    }

    _charmedMonsterAttack(e) {
        const eName = this._eName(e);
        const hostile = () => this.aliveHostileEnemies.filter(h => h !== e && h.health > 0);
        if (hostile().length === 0) {
            this._addLog(`🎵 ${eName} (charmed) looks around but finds no one to fight.`);
            return;
        }

        const dlvl = this.dungeonLevel;
        const typeDef = ENEMY_TYPES[e.type] || {};
        e._enemyAttackExhausted = false;
        const eTags = this._getEnemyTags(e);
        const vkController = this._getVKById(e.charmerId);
        const frenzyEligible = !!(vkController && vkController.health > 0 && (vkController.level || 1) >= VK_L35_UNLOCK_LEVEL
            && (eTags.includes('vermin') || eTags.includes('slime')));
        const frenzyMult = frenzyEligible ? this._getVKFrenzyDamageMultiplier(vkController.level) : 1;
        const lvlBoost = Math.max(0, dlvl - 1);
        const lvlThreeBonus = Math.max(0, dlvl - (MONSTER_DAMAGE_BONUS_THRESHOLD - 1));

        // Damage helpers — use _damageEnemy so resistances / death callbacks all fire correctly
        const cHit = (target, dmg, isMagic = false, contactAttacker = null, opts = {}) => {
            if (!target || target.health <= 0) return 0;
            dmg = Math.max(1, Math.round(dmg * frenzyMult));
            const attackKind = opts.attackKind || (isMagic ? 'magic' : 'melee');
            const options = contactAttacker ? { contactAttacker } : {};
            dmg = this._applyEnemyResourceExhaustion(e, dmg);
            // Nature's Charms bolster: +1% per druid level bonus damage
            if (e.naturesCharmBolster > 0) dmg = Math.max(1, Math.round(dmg * (1 + e.naturesCharmBolster)));
            const ignoreDefense = !!opts.phaseStrike || (!isMagic && !!typeDef.phaseStrike);
            const dealt = this._damageEnemy(target, dmg, ignoreDefense, isMagic, 0, attackKind === 'ranged', options);
            this._addLog(`  \u2192 ${eN(target)} takes ${dealt}${isMagic ? ' magic' : ''} damage.`);
            cRiders(target, dealt, attackKind, opts);
            return dealt;
        };
        const cEffect = (target, effect) => {
            if (!target || target.health <= 0 || !effect) return;
            if (typeof target.addEffect === 'function') target.addEffect(effect);
            else {
                target.activeEffects = target.activeEffects || [];
                target.activeEffects.push(effect);
            }
            const bits = [];
            if (typeof effect.damage === 'number') bits.push(`${effect.damage}/rd`);
            if (typeof effect.damageBonus === 'number') bits.push(`${effect.damageBonus} dmg`);
            if (typeof effect.defenseBonus === 'number') bits.push(`${effect.defenseBonus} def`);
            if (typeof effect.rounds === 'number') bits.push(`${effect.rounds} rd${effect.rounds === 1 ? '' : 's'}`);
            this._addLog(`    \u21B3 ${eN(target)} gains ${effect.type}${bits.length ? ` (${bits.join(', ')})` : ''}.`);
        };
        const cRiders = (target, dealt, attackKind = 'melee', opts = {}) => {
            if (!target || target.health <= 0 || dealt <= 0) return;
            const melee = attackKind === 'melee';
            const aoeMagic = attackKind === 'magic' && (opts.aoe || typeDef.aoeMagic || typeDef.aoeFire || typeDef.aoeDrowning);

            if (melee && typeDef.poisonChance && !this._enemyHasImmunity(target, 'poison') && Math.random() < typeDef.poisonChance) {
                const perTick = Math.max(1, Math.floor(dealt * POISON_DAMAGE_FRACTION));
                cEffect(target, { type: 'poison', rounds: POISON_DURATION_ROUNDS, damage: perTick });
                this._addLog(`🟢 ${eN(target)} is poisoned by ${eName}!`);
            }
            if (melee && typeDef.stunChance && Math.random() < typeDef.stunChance) {
                if (this._tryStunEnemy(target)) this._addLog(`⚡ ${eN(target)} is STUNNED by charmed ${eName}!`);
            }
            if (melee && typeDef.webChance && Math.random() < typeDef.webChance) {
                if (this._tryHoldEnemy(target)) this._addLog(`🕸️ ${eN(target)} is ENSNARED by charmed ${eName}!`);
            }
            if (melee && typeDef.paralyzingBite) {
                if (this._tryParalyzeEnemy(target)) this._addLog(`🧪 ${eN(target)} is PARALYZED by charmed ${eName}!`);
            }
            if (melee && typeDef.constrict && Math.random() < 0.35) {
                if (this._tryHoldEnemy(target)) this._addLog(`🐍 ${eN(target)} is CONSTRICTED by charmed ${eName}!`);
            }
            if (melee && typeDef.attackDebuff && !this._enemyHasImmunity(target, 'cold')) {
                const debuffMag = typeof typeDef.attackDebuff === 'number' ? typeDef.attackDebuff : 2;
                target.activeEffects = (target.activeEffects || []).filter(x => x.type !== 'ice_chill');
                cEffect(target, { type: 'ice_chill', damageBonus: -debuffMag, rounds: 2 });
                this._addLog(`❄️ ${eN(target)} is CHILLED by charmed ${eName}!`);
            }

            if (aoeMagic) {
                if (typeDef.aoePoisonChance && Math.random() < typeDef.aoePoisonChance) {
                    if (this._enemyHasImmunity(target, 'poison')) {
                        this._addLog(`🟢 ${eN(target)} is immune to the toxic cloud!`);
                    } else {
                        const perTick = Math.max(1, Math.floor(dealt * POISON_DAMAGE_FRACTION));
                        cEffect(target, { type: 'poison', rounds: POISON_DURATION_ROUNDS, damage: perTick });
                        this._addLog(`🟢 ${eN(target)} breathes in the toxic cloud and is poisoned!`);
                    }
                }
                if (typeDef.aoeStunChance && Math.random() < typeDef.aoeStunChance) {
                    if (typeDef.aoeStunPsychic && this._enemyHasImmunity(target, 'psychic')) {
                        this._addLog(`🧠 ${eN(target)} is immune to the psychic blast!`);
                    } else if (this._tryStunEnemy(target)) {
                        this._addLog(`⚡ ${eN(target)} is dazed by charmed ${eName}'s blast!`);
                    }
                }
            }

            if (typeDef.lifeDrain && e.health > 0) {
                const stolenBase = Math.max(1, Math.floor(dealt * WRAITH_DRAIN_FRACTION));
                const rotMult = this._getMummyRotHealMultiplier(e);
                const stolen = Math.max(0, Math.floor(stolenBase * rotMult));
                if (stolen <= 0) {
                    this._addLog(`🟤 ${eName}'s life drain is nullified by Mummy Rot!`);
                } else {
                    const before = e.health;
                    e.health = Math.min(e.maxHealth, e.health + stolen);
                    const gained = e.health - before;
                    if (gained > 0) this._addLog(`💀 ${eName} drains life from ${eN(target)}, recovering ${gained} HP!`);
                }
            }

            // Match hostile monster L25+ follow-up chains. These roll once per
            // primary melee/ranged hit, but never recurse from follow-up hits.
            if (!opts.isFollowup && !opts.aoe && (attackKind === 'melee' || attackKind === 'ranged')) {
                cFollowups(attackKind);
            }
        };
        const cFollowups = (attackKind) => {
            const dlvl = this.dungeonLevel;
            if (dlvl < 25 || e.health <= 0 || hostile().length === 0) return;
            const tiers = [
                dlvl / 100,
                dlvl / 200,
                dlvl / 400,
                dlvl >= 50 ? dlvl / 800 : null,
                dlvl >= 80 ? dlvl / 1600 : null,
            ];
            for (const chance of tiers) {
                if (chance === null) continue;
                if (Math.random() >= chance) continue;
                const t = pick();
                if (!t || e.health <= 0) continue;
                let dmg = Math.max(1, Math.round(randomInt(dmin, dmax) * MONSTER_DAMAGE_MULTIPLIER));
                dmg = Math.max(1, dmg + this._getEnemyDamageMod(e, attackKind));
                this._addLog(`🎵⚔️ ${eName} (charmed) presses the attack with a bonus ${attackKind} strike at ${eN(t)}!`);
                cHit(t, dmg, false, e, { attackKind, isFollowup: true });
            }
        };
        const pick = () => {
            const h = hostile();
            if (!h.length) return null;
            const marked = frenzyEligible ? this._getVKHiveMarkTarget(vkController.id) : null;
            if (marked && marked.health > 0) return marked;
            return h[Math.floor(Math.random() * h.length)];
        };
        const eN = t => this._eName(t);
        const tickDeath = t => { if (t.health <= 0 && !t._deathHandled) { t._deathHandled = true; this._onEnemyDeath(t); } };

        const dmin  = MONSTER_MELEE_DAMAGE_MIN  + MONSTER_DAMAGE_PER_LEVEL * lvlBoost + MONSTER_DAMAGE_BONUS_PER_LEVEL * lvlThreeBonus;
        const dmax  = MONSTER_MELEE_DAMAGE_MAX  + MONSTER_DAMAGE_PER_LEVEL * lvlBoost + MONSTER_DAMAGE_BONUS_PER_LEVEL * lvlThreeBonus;
        const mdmin = MONSTER_MAGIC_DAMAGE_MIN  + MONSTER_DAMAGE_PER_LEVEL * lvlBoost + MONSTER_DAMAGE_BONUS_PER_LEVEL * lvlThreeBonus;
        const mdmax = MONSTER_MAGIC_DAMAGE_MAX  + MONSTER_DAMAGE_PER_LEVEL * lvlBoost + MONSTER_DAMAGE_BONUS_PER_LEVEL * lvlThreeBonus;

        if (typeDef.aoeFire && this._enemyCanAttemptManaAttack(e)) {
            this._spendEnemyMana(e);
            let dmg = Math.max(1, Math.round(randomInt(dmin, dmax) * MONSTER_DAMAGE_MULTIPLIER));
            dmg = Math.max(1, dmg + this._getEnemyDamageMod(e, 'magic'));
            this._addLog(`🎵🔥 ${eName} (charmed) breathes fire at the enemy group!`);
            for (const t of hostile()) {
                cHit(t, dmg, true);
                if (t.health > 0) cEffect(t, { type: 'burn', rounds: DRAKE_FIRE_BURN_ROUNDS, damage: Math.max(1, Math.floor(dmg * DRAKE_FIRE_BURN_FRACTION)) });
            }

        } else if (typeDef.aoeDrowning && this._enemyCanAttemptManaAttack(e)) {
            this._spendEnemyMana(e);
            let dmg = Math.max(1, Math.round(randomInt(mdmin, mdmax) * MONSTER_DAMAGE_MULTIPLIER));
            dmg = Math.max(1, dmg + this._getEnemyDamageMod(e, 'magic'));
            this._addLog(`🎵🌊 ${eName} (charmed) unleashes a drowning surge at the enemy group!`);
            for (const t of hostile()) cHit(t, dmg, true);

        } else if (typeDef.aoeMagic && this._enemyCanAttemptManaAttack(e)) {
            this._spendEnemyMana(e);
            const aoeMult = MONSTER_DAMAGE_MULTIPLIER * (typeDef.aoeMagicDamageMult || 1.0);
            let dmg = Math.max(1, Math.round(randomInt(mdmin, mdmax) * aoeMult));
            dmg = Math.max(1, dmg + this._getEnemyDamageMod(e, 'magic'));
            this._addLog(`🎵🔮 ${eName} (charmed) unleashes dark energy at the enemy group!`);
            for (const t of hostile()) cHit(t, dmg, true);

        } else if (typeDef.isBeholderAI) {
            this._addLog(`🎵👁️ ${eName} (charmed) turns its eye beams on its former allies!`);
            for (let bi = 0; bi < 6 && hostile().length > 0; bi++) {
                const t = pick(); if (!t) break;
                this._spendEnemyMana(e);
                let dmg = Math.max(1, Math.round(randomInt(mdmin, mdmax) * MONSTER_DAMAGE_MULTIPLIER));
                dmg = Math.max(1, dmg + this._getEnemyDamageMod(e, 'magic'));
                cHit(t, dmg, true);
            }

        } else if (typeDef.isDragonAI) {
            const bType = typeDef.dragonBreathType || 'fire';
            const breathIcons = { fire: '🔥', acid: '🟢', lightning: '⚡', poison: '🤢', cold: '🧊' };
            if (Math.random() < 0.50 && this._enemyCanAttemptManaAttack(e)) {
                this._spendEnemyMana(e);
                let dmg = Math.max(1, Math.round(randomInt(dmin, dmax) * MONSTER_DAMAGE_MULTIPLIER));
                dmg = this._applyDragonBreathLevelBonus(dmg, e);
                dmg = Math.max(1, dmg + this._getEnemyDamageMod(e, 'magic'));
                this._addLog(`🎵${breathIcons[bType]||'🔥'} ${eName} (charmed) exhales ${bType} breath at the enemy group!`);
                for (const t of hostile()) {
                    cHit(t, dmg, true);
                    tickDeath(t);
                }
            } else {
                this._addLog(`🎵🐉 ${eName} (charmed) tears into its former allies with claw and bite!`);
                const attacks = [{ label: 'claw', times: 2 }, { label: 'bite', times: 1 }];
                for (const atk of attacks) {
                    for (let ai = 0; ai < atk.times; ai++) {
                        const t = pick(); if (!t || !this._enemyCanAttemptStaminaAttack(e)) break;
                        this._spendEnemyStamina(e);
                        let dmg = Math.max(1, Math.round(randomInt(dmin, dmax) * MONSTER_DAMAGE_MULTIPLIER));
                        dmg = Math.max(1, dmg + this._getEnemyDamageMod(e));
                        cHit(t, dmg, false, e);
                        tickDeath(t);
                    }
                }
            }

        } else if (typeDef.isEttinAI) {
            this._addLog(`🎵🧟 ${eName} (charmed) swings both clubs at its former allies!`);
            for (let hi = 0; hi < 2; hi++) {
                const t = pick(); if (!t || !this._enemyCanAttemptStaminaAttack(e)) break;
                this._spendEnemyStamina(e);
                let dmg = Math.max(1, Math.round(randomInt(dmin, dmax) * MONSTER_DAMAGE_MULTIPLIER));
                dmg = Math.max(1, dmg + this._getEnemyDamageMod(e));
                cHit(t, dmg);
            }

        } else if (typeDef.isFireGiantAI) {
            this._addLog(`🎵🔥 ${eName} (charmed) hammers with blazing strikes at its former allies!`);
            for (let hi = 0; hi < 2; hi++) {
                const t = pick(); if (!t || !this._enemyCanAttemptStaminaAttack(e)) break;
                this._spendEnemyStamina(e);
                let dmg = Math.max(1, Math.round(randomInt(dmin + 10, dmax + 10) * MONSTER_DAMAGE_MULTIPLIER));
                dmg = Math.max(1, dmg + this._getEnemyDamageMod(e));
                cHit(t, dmg);
                if (t.health > 0) cEffect(t, { type: 'burn', rounds: DRAKE_FIRE_BURN_ROUNDS, damage: Math.max(1, Math.floor(dmg * DRAKE_FIRE_BURN_FRACTION)) });
            }

        } else if (typeDef.isIceGiantAI) {
            this._addLog(`🎵🧊 ${eName} (charmed) pounds former allies with glacial force!`);
            for (let hi = 0; hi < 2; hi++) {
                const t = pick(); if (!t || !this._enemyCanAttemptStaminaAttack(e)) break;
                this._spendEnemyStamina(e);
                let dmg = Math.max(1, Math.round(randomInt(dmin + 10, dmax + 10) * MONSTER_DAMAGE_MULTIPLIER));
                dmg = Math.max(1, dmg + this._getEnemyDamageMod(e));
                const dealt = cHit(t, dmg);
                if (t.health > 0 && dealt > 0) {
                    cEffect(t, { type: 'ice_chill', damageBonus: -2, rounds: 2 });
                    const iceTick = Math.max(1, Math.floor(dealt * 0.5));
                    t.health = Math.max(0, t.health - iceTick);
                    this._addLog(`🧊 ${eN(t)} is chilled! (${iceTick} cold)`);
                    tickDeath(t);
                }
            }

        } else if (typeDef.isStoneGiantAI) {
            this._addLog(`🎵🪨 ${eName} (charmed) hurls boulders at its former allies!`);
            for (let hi = 0; hi < 2; hi++) {
                const t = pick(); if (!t || !this._enemyCanAttemptStaminaAttack(e)) break;
                this._spendEnemyStamina(e);
                let dmg = Math.max(1, Math.round(randomInt(dmin + 10, dmax + 10) * MONSTER_DAMAGE_MULTIPLIER));
                dmg = Math.max(1, dmg + this._getEnemyDamageMod(e));
                cHit(t, dmg);
            }

        } else if (typeDef.isStormGiantAI && this._enemyCanAttemptManaAttack(e)) {
            this._spendEnemyMana(e);
            let dmg = Math.max(1, Math.round(randomInt(mdmin + 10, mdmax + 10) * MONSTER_DAMAGE_MULTIPLIER));
            dmg = Math.max(1, dmg + this._getEnemyDamageMod(e, 'magic'));
            this._addLog(`🎵⚡ ${eName} (charmed) calls down lightning on its former allies!`);
            const h = hostile();
            const targets = [];
            for (let ti = 0; ti < 3 && h.length > 0; ti++) targets.push(h[Math.floor(Math.random() * h.length)]);
            for (const t of targets) { if (hostile().length === 0) break; cHit(t, dmg, true); }

        } else if (typeDef.isMedusaAI) {
            this._addLog(`🎵🏹 ${eName} (charmed) looses envenomed arrows at its former allies!`);
            for (let ai = 0; ai < 3; ai++) {
                const t = pick(); if (!t || !this._enemyCanAttemptStaminaAttack(e)) break;
                this._spendEnemyStamina(e);
                let dmg = Math.max(1, Math.round(randomInt(dmin, dmax) * MONSTER_DAMAGE_MULTIPLIER));
                dmg = Math.max(1, dmg + this._getEnemyDamageMod(e));
                cHit(t, dmg);
                if (t.health > 0 && Math.random() < 0.40) {
                    cEffect(t, { type: 'poison', rounds: 3, damage: Math.max(1, Math.floor(dmg * 0.33)) });
                    this._addLog(`🟢 ${eN(t)} is poisoned by Medusa's arrow!`);
                }
            }

        } else if (typeDef.isStirgeAI || typeDef.isVampireBatAI) {
            const t = pick();
            if (t && this._enemyCanAttemptStaminaAttack(e)) {
                this._spendEnemyStamina(e);
                let dmg = Math.max(1, Math.round(randomInt(dmin, dmax) * MONSTER_DAMAGE_MULTIPLIER));
                dmg = Math.max(1, dmg + this._getEnemyDamageMod(e));
                const drainVerb = typeDef.isVampireBatAI ? 'sinks its fangs into' : 'latches onto';
                this._addLog(`🎵🦇 ${eName} (charmed) ${drainVerb} ${eN(t)} and drinks deep!`);
                const dealt = cHit(t, dmg, false, e);
                if (dealt > 0) {
                    if (this._enemyHasImmunity(t, 'bleed')) {
                        this._addLog(`🦇 ${eN(t)} cannot be blood-drained!`);
                    } else {
                        const before = e.health;
                        e.health = Math.min(e.maxHealth, e.health + dealt);
                        const healed = e.health - before;
                        if (healed > 0) this._addLog(`🦇 ${eName} drains ${healed} HP from ${eN(t)}!`);
                    }
                }
            }

        } else if (typeDef.isHydraAI) {
            const headCount = 6 + Math.floor(dlvl / 5);
            this._addLog(`🎵🐍 ${eName} (charmed) attacks with ${headCount} heads!`);
            for (let hi = 0; hi < headCount; hi++) {
                const t = pick();
                if (!t) break;
                if (!this._enemyCanAttemptStaminaAttack(e)) { e.stamina = Math.min(e.maxStamina || 30, e.stamina + 2); continue; }
                this._spendEnemyStamina(e);
                let dmg = Math.max(1, Math.round(randomInt(dmin, dmax) * MONSTER_DAMAGE_MULTIPLIER));
                dmg = Math.max(1, dmg + this._getEnemyDamageMod(e));
                cHit(t, dmg, false, e);
            }

        } else if (typeDef.isManticoreAI) {
            this._addLog(`🎵🦁 ${eName} (charmed) launches venomous spikes at its former allies!`);
            for (let ai = 0; ai < 5; ai++) {
                const t = pick(); if (!t || !this._enemyCanAttemptStaminaAttack(e)) break;
                this._spendEnemyStamina(e);
                let dmg = Math.max(1, Math.round(randomInt(dmin + 3, dmax + 3) * MONSTER_DAMAGE_MULTIPLIER));
                dmg = Math.max(1, dmg + this._getEnemyDamageMod(e));
                const dealt = cHit(t, dmg);
                if (t.health > 0 && dealt > 0) {
                    cEffect(t, { type: 'poison', rounds: 3, damage: Math.max(1, Math.floor(dealt / 3)) });
                    this._addLog(`🟢 ${eN(t)} is stung by venomous spikes!`);
                }
            }

        } else if (typeDef.isEvilPriestAI && this._enemyCanAttemptManaAttack(e)) {
            this._spendEnemyMana(e);
            let dmg = Math.max(1, Math.round(randomInt(mdmin, mdmax) * MONSTER_DAMAGE_MULTIPLIER));
            dmg = Math.max(1, dmg + this._getEnemyDamageMod(e, 'magic'));
            this._addLog(`🎵📿 ${eName} (charmed) channels dark power against its former allies!`);
            for (const t of hostile()) cHit(t, dmg, true);

        } else if (typeDef.isWerewolfAI) {
            const t = pick();
            if (t && this._enemyCanAttemptStaminaAttack(e)) {
                this._spendEnemyStamina(e);
                let dmg = Math.max(1, Math.round(randomInt(dmin, dmax) * MONSTER_DAMAGE_MULTIPLIER));
                dmg = Math.max(1, dmg + this._getEnemyDamageMod(e));
                this._addLog(`🎵🐺 ${eName} (charmed) lunges with savage fury at ${eN(t)}!`);
                cHit(t, dmg);
            }

        } else if (typeDef.isYetiAI) {
            this._addLog(`🎵☃️ ${eName} (charmed) slams with both fists!`);
            for (let hi = 0; hi < 2; hi++) {
                const t = pick(); if (!t || !this._enemyCanAttemptStaminaAttack(e)) break;
                this._spendEnemyStamina(e);
                let dmg = Math.max(1, Math.round(randomInt(dmin, dmax) * MONSTER_DAMAGE_MULTIPLIER));
                dmg = Math.max(1, dmg + this._getEnemyDamageMod(e));
                const dealt = cHit(t, dmg);
                if (t.health > 0 && dealt > 0) {
                    const iceTick = Math.max(1, Math.floor(dealt * 0.33));
                    t.health = Math.max(0, t.health - iceTick);
                    cEffect(t, { type: 'ice_chill', damageBonus: -2, rounds: 2 });
                    this._addLog(`🧊 ${eN(t)} is frozen by icy fists! (${iceTick} cold)`);
                    tickDeath(t);
                }
            }

        } else if (typeDef.isIceDemonAI) {
            this._addLog(`🎵❄️ ${eName} (charmed) strikes with ice claws at its former allies!`);
            for (let hi = 0; hi < 4; hi++) {
                const t = pick(); if (!t || !this._enemyCanAttemptStaminaAttack(e)) break;
                this._spendEnemyStamina(e);
                let dmg = Math.max(1, Math.round(randomInt(dmin + 5, dmax + 5) * MONSTER_DAMAGE_MULTIPLIER));
                dmg = Math.max(1, dmg + this._getEnemyDamageMod(e));
                const dealt = cHit(t, dmg);
                if (t.health > 0 && dealt > 0) {
                    const iceTick = Math.max(1, Math.floor(dealt * 0.30));
                    cEffect(t, { type: 'ice_chill', damageBonus: -2, rounds: 2 });
                    t.health = Math.max(0, t.health - iceTick);
                    this._addLog(`❄️ ${eN(t)} is chilled by infernal frost! (${iceTick} cold)`);
                    tickDeath(t);
                }
            }

        } else if (typeDef.isAcidDemonAI && this._enemyCanAttemptManaAttack(e)) {
            this._spendEnemyMana(e);
            let dmg = Math.max(1, Math.round(randomInt(dmin, dmax) * MONSTER_DAMAGE_MULTIPLIER));
            dmg = Math.max(1, dmg + this._getEnemyDamageMod(e, 'magic'));
            this._addLog(`🎵🟢 ${eName} (charmed) spews corrosive acid at its former allies!`);
            for (const t of hostile()) {
                cHit(t, dmg, true);
                if (t.health > 0) cEffect(t, { type: 'acid_dot', rounds: 3, damage: Math.max(1, Math.floor(dmg * 0.25)), defenseBonus: -2 });
            }

        } else if (typeDef.isBloatDemonAI) {
            this._addLog(`🎵🤢 ${eName} (charmed) erupts with toxic blasts at its former allies!`);
            for (let ai = 0; ai < 6; ai++) {
                const t = pick(); if (!t || !this._enemyCanAttemptStaminaAttack(e)) break;
                this._spendEnemyStamina(e);
                let dmg = Math.max(1, Math.round(randomInt(dmin, dmax) * MONSTER_DAMAGE_MULTIPLIER));
                dmg = Math.max(1, dmg + this._getEnemyDamageMod(e));
                const dealt = cHit(t, dmg);
                if (t.health > 0 && dealt > 0) cEffect(t, { type: 'poison', rounds: POISON_DURATION_ROUNDS, damage: Math.max(1, Math.floor(dmg * 0.33)) });
            }

        } else if (typeDef.isDracolichAI) {
            const breathTypes = ['fire', 'acid', 'lightning', 'cold', 'poison'];
            const bType = breathTypes[Math.floor(Math.random() * breathTypes.length)];
            if (Math.random() < 0.50 && this._enemyCanAttemptManaAttack(e)) {
                this._spendEnemyMana(e);
                let dmg = Math.max(1, Math.round(randomInt(dmin, dmax) * MONSTER_DAMAGE_MULTIPLIER));
                dmg = this._applyDragonBreathLevelBonus(dmg, e);
                dmg = Math.max(1, dmg + this._getEnemyDamageMod(e, 'magic'));
                this._addLog(`🎵💀 ${eName} (charmed) exhales ${bType} breath at its former allies!`);
                for (const t of hostile()) cHit(t, dmg, true);
            } else {
                this._addLog(`🎵💀 ${eName} (charmed) tears into former allies with undead talons!`);
                const attacks = [{ times: 2 }, { times: 1 }];
                for (const atk of attacks) {
                    for (let ai = 0; ai < atk.times; ai++) {
                        const t = pick(); if (!t || !this._enemyCanAttemptStaminaAttack(e)) break;
                        this._spendEnemyStamina(e);
                        let dmg = Math.max(1, Math.round(randomInt(dmin, dmax) * MONSTER_DAMAGE_MULTIPLIER));
                        dmg = Math.max(1, dmg + this._getEnemyDamageMod(e));
                        cHit(t, dmg);
                    }
                }
            }

        } else if (typeDef.isEvilNecromancerAI && this._enemyCanAttemptManaAttack(e)) {
            this._spendEnemyMana(e);
            let dmg = Math.max(1, Math.round(randomInt(mdmin, mdmax) * MONSTER_DAMAGE_MULTIPLIER));
            dmg = Math.max(1, dmg + this._getEnemyDamageMod(e, 'magic'));
            this._addLog(`🎵🔮 ${eName} (charmed) channels necrotic energy at its former allies!`);
            for (const t of hostile()) {
                cHit(t, dmg, true);
                if (t.health > 0) cEffect(t, { type: 'poison', rounds: POISON_DURATION_ROUNDS, damage: Math.max(1, Math.floor(dmg * 0.25)) });
            }

        } else if (typeDef.isHellHoundAI) {
            if (this._enemyCanAttemptManaAttack(e)) {
                this._spendEnemyMana(e);
                let dmg = Math.max(1, Math.round(randomInt(dmin, dmax) * MONSTER_DAMAGE_MULTIPLIER));
                dmg = Math.max(1, dmg + this._getEnemyDamageMod(e, 'magic'));
                this._addLog(`🎵🔥 ${eName} (charmed) breathes hellfire at its former allies!`);
                for (const t of hostile()) {
                    cHit(t, dmg, true);
                    if (t.health > 0) cEffect(t, { type: 'burn', rounds: DRAKE_FIRE_BURN_ROUNDS, damage: Math.max(1, Math.floor(dmg * DRAKE_FIRE_BURN_FRACTION)) });
                }
            } else {
                const t = pick();
                if (t && this._enemyCanAttemptStaminaAttack(e)) {
                    this._spendEnemyStamina(e);
                    let dmg = Math.max(1, Math.round(randomInt(dmin, dmax) * MONSTER_DAMAGE_MULTIPLIER));
                    dmg = Math.max(1, dmg + this._getEnemyDamageMod(e));
                    this._addLog(`🎵🔥 ${eName} (charmed) lunges with a burning bite at ${eN(t)}!`);
                    cHit(t, dmg);
                    if (t.health > 0) cEffect(t, { type: 'burn', rounds: DRAKE_FIRE_BURN_ROUNDS, damage: Math.max(1, Math.floor(dmg * DRAKE_FIRE_BURN_FRACTION)) });
                }
            }

        } else if (typeDef.isEvilBerserkerAI) {
            const attackCount = Math.max(1, Math.floor(dlvl / 5));
            this._addLog(`🎵⚔️ ${eName} (charmed) charges into a berserk frenzy — ${attackCount} strikes!`);
            for (let ai = 0; ai < attackCount; ai++) {
                const t = pick(); if (!t || !this._enemyCanAttemptStaminaAttack(e)) break;
                this._spendEnemyStamina(e);
                let dmg = Math.max(1, Math.round(randomInt(dmin + 3, dmax + 3) * MONSTER_DAMAGE_MULTIPLIER));
                dmg = Math.max(1, dmg + this._getEnemyDamageMod(e));
                cHit(t, dmg);
            }

        } else if (typeDef.isMummyAI) {
            const t = pick();
            if (t && this._enemyCanAttemptStaminaAttack(e)) {
                this._spendEnemyStamina(e);
                let dmg = Math.max(1, Math.round(randomInt(dmin, dmax) * MONSTER_DAMAGE_MULTIPLIER));
                dmg = Math.max(1, dmg + this._getEnemyDamageMod(e));
                this._addLog(`🎵🟤 ${eName} (charmed) lurches at ${eN(t)} with rotting fists!`);
                cHit(t, dmg);
                if (t.health > 0) {
                    t.activeEffects = (t.activeEffects || []).filter(x => x.type !== 'mummy_rot');
                    cEffect(t, { type: 'mummy_rot', rounds: 3 });
                    this._addLog(`🟤 ${eN(t)} is infected with Mummy Rot! (no regen 3 rds)`);
                }
            }

        } else if (typeDef.isRevenantAI) {
            const t = pick();
            if (t && this._enemyCanAttemptStaminaAttack(e)) {
                this._spendEnemyStamina(e);
                let dmg = Math.max(1, Math.round(randomInt(dmin + 2, dmax + 2) * MONSTER_DAMAGE_MULTIPLIER));
                dmg = Math.max(1, dmg + this._getEnemyDamageMod(e));
                this._addLog(`🎵👻 ${eName} (charmed) phases through space and strikes ${eN(t)}!`);
                cHit(t, dmg);
            }

        } else if (typeDef.isBoneArcherAI) {
            const arrowCount = dlvl >= 15 ? 3 : 1;
            const fractureDur = Math.max(1, Math.floor(dlvl / 8));
            this._addLog(arrowCount > 1
                ? `🎵💀🏹 ${eName} (charmed) looses a three-arrow volley at its former allies!`
                : `🎵💀🏹 ${eName} (charmed) draws a splintered bow on its former allies!`);
            for (let ai = 0; ai < arrowCount; ai++) {
                const t = pick(); if (!t || !this._enemyCanAttemptStaminaAttack(e)) break;
                this._spendEnemyStamina(e);
                let dmg = Math.max(1, Math.round(randomInt(dmin, dmax) * MONSTER_DAMAGE_MULTIPLIER));
                dmg = Math.max(1, dmg + this._getEnemyDamageMod(e, 'ranged'));
                this._addLog(`🎵🏹 ${eName} (charmed) shoots a bone arrow at ${eN(t)}!`);
                const dealt = cHit(t, dmg);
                if (t.health > 0 && dealt > 0 && Math.random() < 0.25) {
                    const fractureTick = Math.max(1, Math.floor(dealt * 0.30));
                    cEffect(t, { type: 'fracture', damage: fractureTick, rounds: fractureDur });
                    this._addLog(`🦴 A bone arrow splinters in ${eN(t)}'s wound! (${fractureTick} bleed/rd, ${fractureDur} rds)`);
                }
            }

        } else if (typeDef.isPoltergeistAI) {
            const t = pick();
            if (t && this._enemyCanAttemptStaminaAttack(e)) {
                this._spendEnemyStamina(e);
                let dmg = Math.max(1, Math.round(randomInt(dmin, dmax) * MONSTER_DAMAGE_MULTIPLIER));
                dmg = Math.max(1, dmg + this._getEnemyDamageMod(e));
                this._addLog(`🎵👻 ${eName} (charmed) hurls spectral debris at ${eN(t)}!`);
                cHit(t, dmg);
            }

        } else if (typeDef.isZombieGiantAI && this._enemyCanAttemptStaminaAttack(e)) {
            this._spendEnemyStamina(e);
            let dmg = Math.max(1, Math.round(randomInt(dmin + 4, dmax + 4) * MONSTER_DAMAGE_MULTIPLIER));
            dmg = Math.max(1, dmg + this._getEnemyDamageMod(e));
            dmg = Math.round(dmg * 1.50);
            this._addLog(`🎵🧟 ${eName} (charmed) SLAMS with a devastating stomp at its former allies!`);
            for (const t of hostile()) cHit(t, dmg);

        } else if (typeDef.isDeathKnightAI) {
            this._addLog(`🎵⚔️ ${eName} (charmed) advances with dark purpose on its former allies!`);
            for (let hi = 0; hi < 2; hi++) {
                const t = pick(); if (!t || !this._enemyCanAttemptStaminaAttack(e)) break;
                this._spendEnemyStamina(e);
                let dmg = Math.max(1, Math.round(randomInt(dmin + 2, dmax + 2) * MONSTER_DAMAGE_MULTIPLIER));
                dmg = Math.max(1, dmg + this._getEnemyDamageMod(e));
                cHit(t, dmg);
                if (t.health > 0 && Math.random() < 0.30) {
                    cEffect(t, { type: 'necrotic_curse', damageBonus: -Math.max(1, Math.floor(dlvl / 8)), rounds: 2 });
                    this._addLog(`💀 ${eN(t)} is cursed with necrotic energy!`);
                }
            }

        } else if (typeDef.isSuccubusAI && this._enemyCanAttemptStaminaAttack(e)) {
            this._spendEnemyStamina(e);
            const t = pick();
            if (t) {
                let dmg = Math.max(1, Math.round(randomInt(mdmin, mdmax) * MONSTER_DAMAGE_MULTIPLIER));
                dmg = Math.max(1, dmg + this._getEnemyDamageMod(e, 'magic'));
                this._addLog(`🎵💋 ${eName} (charmed) plants a draining kiss on ${eN(t)}!`);
                cHit(t, dmg, true);
            }

        } else if (typeDef.isChainDevilAI) {
            const attackCount = dlvl >= 30 ? 3 : 2;
            this._addLog(`🎵⛓️ ${eName} (charmed) whips chains at its former allies!`);
            for (let ai = 0; ai < attackCount; ai++) {
                const t = pick(); if (!t || !this._enemyCanAttemptStaminaAttack(e)) break;
                this._spendEnemyStamina(e);
                let dmg = Math.max(1, Math.round(randomInt(dmin, dmax) * MONSTER_DAMAGE_MULTIPLIER));
                dmg = Math.max(1, dmg + this._getEnemyDamageMod(e));
                cHit(t, dmg);
                if (t.health > 0 && Math.random() < 0.50) {
                    if (this._enemyHasImmunity(t, 'hold')) {
                        this._addLog(`⛓️ ${eN(t)} cannot be bound in chains!`);
                    } else {
                        t.webbedRounds = Math.max(t.webbedRounds || 0, WEB_DURATION_ROUNDS);
                        this._addLog(`⛓️ ${eN(t)} is bound in chains!`);
                    }
                }
            }

        } else if (typeDef.isBloodDemonAI) {
            const bonus = 2 + (e.bloodDemonKillBonus || 0);
            const t = pick();
            if (t && this._enemyCanAttemptStaminaAttack(e)) {
                this._spendEnemyStamina(e);
                let dmg = Math.max(1, Math.round(randomInt(dmin + bonus, dmax + bonus) * MONSTER_DAMAGE_MULTIPLIER));
                dmg = Math.max(1, dmg + this._getEnemyDamageMod(e));
                const prevHP = t.health;
                this._addLog(`🎵🩸 ${eName} (charmed) tears into ${eN(t)} with blood-drenched claws!`);
                cHit(t, dmg);
                const dealt = Math.max(0, prevHP - t.health);
                if (dealt > 0) {
                    const stolen = Math.floor(dealt * 0.40);
                    e.health = Math.min(e.maxHealth, e.health + stolen);
                    if (stolen > 0) this._addLog(`🩸 ${eName} drains ${stolen} HP!`);
                }
                if (t.health <= 0) { e.health = e.maxHealth; e.bloodDemonKillBonus = (e.bloodDemonKillBonus || 0) + 2; }
            }

        } else if (typeDef.isPitFiendAI) {
            if (this._enemyCanAttemptManaAttack(e) && Math.random() < 0.50) {
                this._spendEnemyMana(e);
                let dmg = Math.max(1, Math.round(randomInt(dmin + 5, dmax + 5) * MONSTER_DAMAGE_MULTIPLIER));
                dmg = Math.max(1, dmg + this._getEnemyDamageMod(e, 'magic'));
                this._addLog(`🎵🔥 ${eName} (charmed) calls down HELLFIRE on its former allies!`);
                for (const t of hostile()) {
                    cHit(t, dmg, true);
                    if (t.health > 0) cEffect(t, { type: 'burn', rounds: DRAKE_FIRE_BURN_ROUNDS, damage: Math.max(1, Math.floor(dmg * DRAKE_FIRE_BURN_FRACTION)) });
                }
            } else {
                this._addLog(`🎵😈 ${eName} (charmed) assaults its former allies with titanic blows!`);
                for (let ai = 0; ai < 3; ai++) {
                    const t = pick(); if (!t || !this._enemyCanAttemptStaminaAttack(e)) break;
                    this._spendEnemyStamina(e);
                    let dmg = Math.max(1, Math.round(randomInt(dmin + 5, dmax + 5) * MONSTER_DAMAGE_MULTIPLIER));
                    dmg = Math.max(1, dmg + this._getEnemyDamageMod(e));
                    cHit(t, dmg);
                }
            }

        } else if (typeDef.isQuasitAI) {
            const poisonDuration = Math.max(2, Math.floor(dlvl / 4));
            this._addLog(`🎵👿 ${eName} (charmed) swarms with venomous strikes!`);
            for (let ai = 0; ai < 5; ai++) {
                const t = pick(); if (!t || !this._enemyCanAttemptStaminaAttack(e)) break;
                this._spendEnemyStamina(e);
                let dmg = Math.max(1, Math.round(randomInt(dmin, dmax) * MONSTER_DAMAGE_MULTIPLIER * 0.60));
                dmg = Math.max(1, dmg + this._getEnemyDamageMod(e));
                const dealt = cHit(t, dmg);
                if (t.health > 0 && dealt > 0) cEffect(t, { type: 'quasit_poison', damage: dealt, rounds: poisonDuration });
            }

        } else if (typeDef.isGiantCrocodileAI) {
            const t = pick();
            if (t && this._enemyCanAttemptStaminaAttack(e)) {
                this._spendEnemyStamina(e);
                let dmg = Math.max(1, Math.round(randomInt(dmin + 2, dmax + 2) * MONSTER_DAMAGE_MULTIPLIER));
                dmg = Math.max(1, dmg + this._getEnemyDamageMod(e));
                this._addLog(`🎵🐊 ${eName} (charmed) lunges with a crushing bite at ${eN(t)}!`);
                cHit(t, dmg);
                if (t.health > 0) {
                    const holdText = this._enemyHasImmunity(t, 'hold') ? 'hold resisted' : 'held in its jaws';
                    if (!this._enemyHasImmunity(t, 'hold')) {
                        t.webbedRounds = Math.max(t.webbedRounds || 0, 2);
                    }
                    const bleedDur = Math.max(2, Math.floor(dlvl / 5));
                    cEffect(t, { type: 'fracture', damage: Math.max(1, Math.floor(dmg * 0.30)), rounds: bleedDur });
                    this._addLog(`🐊 ${eN(t)} is DEATH ROLLED! (${holdText}, bleed)`);
                }
            }

        } else if (typeDef.isChimeraAI) {
            const bleedDur = Math.max(1, Math.floor(dlvl / 6));
            this._addLog(`🎵🦁🐐🐉 ${eName} (charmed) attacks with all three heads!`);
            for (let ai = 0; ai < 2; ai++) {
                const t = pick(); if (!t || !this._enemyCanAttemptStaminaAttack(e)) break;
                this._spendEnemyStamina(e);
                let dmg = Math.max(1, Math.round(randomInt(dmin + 3, dmax + 3) * MONSTER_DAMAGE_MULTIPLIER));
                dmg = Math.max(1, dmg + this._getEnemyDamageMod(e));
                const dealt = cHit(t, dmg);
                if (t.health > 0 && dealt > 0) cEffect(t, { type: 'fracture', damage: dealt, rounds: bleedDur });
            }
            const tGore = pick();
            if (tGore && this._enemyCanAttemptStaminaAttack(e)) {
                this._spendEnemyStamina(e);
                let dmg = Math.max(1, Math.round(randomInt(dmin + 3, dmax + 3) * MONSTER_DAMAGE_MULTIPLIER * 1.5));
                dmg = Math.max(1, dmg + this._getEnemyDamageMod(e));
                cHit(tGore, dmg);
            }
            if (this._enemyCanAttemptManaAttack(e) && hostile().length > 0) {
                this._spendEnemyMana(e);
                let dmg = Math.max(1, Math.round(randomInt(dmin + 3, dmax + 3) * MONSTER_DAMAGE_MULTIPLIER));
                dmg = Math.max(1, dmg + this._getEnemyDamageMod(e, 'magic'));
                for (const t of hostile()) {
                    cHit(t, dmg, true);
                    if (t.health > 0) cEffect(t, { type: 'burn', rounds: DRAKE_FIRE_BURN_ROUNDS, damage: Math.max(1, Math.floor(dmg * DRAKE_FIRE_BURN_FRACTION)) });
                }
            }

        } else if (typeDef.isWyvernAI) {
            const bonus = 2;
            const t1 = pick();
            if (t1 && this._enemyCanAttemptStaminaAttack(e)) {
                this._spendEnemyStamina(e);
                let dmg = Math.max(1, Math.round(randomInt(dmin + bonus, dmax + bonus) * MONSTER_DAMAGE_MULTIPLIER));
                dmg = Math.max(1, dmg + this._getEnemyDamageMod(e));
                this._addLog(`🎵🦅 ${eName} (charmed) rakes ${eN(t1)} with talons!`);
                cHit(t1, dmg);
            }
            const t2 = pick();
            if (t2 && this._enemyCanAttemptStaminaAttack(e)) {
                this._spendEnemyStamina(e);
                let dmg = Math.max(1, Math.round(randomInt(dmin + bonus, dmax + bonus) * MONSTER_DAMAGE_MULTIPLIER));
                dmg = Math.max(1, dmg + this._getEnemyDamageMod(e));
                this._addLog(`🎵🦂 ${eName} (charmed) whips its venomous tail at ${eN(t2)}!`);
                cHit(t2, dmg);
                if (t2.health > 0) {
                    cEffect(t2, { type: 'poison', rounds: POISON_DURATION_ROUNDS, damage: Math.max(1, Math.floor(dmg * 0.50)) });
                    this._addLog(`🟢 ${eN(t2)} is injected with wyvern venom!`);
                }
            }

        } else if (typeDef.isDisplacerBeastAI) {
            const t = pick();
            if (t && this._enemyCanAttemptStaminaAttack(e)) {
                this._spendEnemyStamina(e);
                let dmg = Math.max(1, Math.round(randomInt(dmin, dmax) * MONSTER_DAMAGE_MULTIPLIER));
                dmg = Math.max(1, dmg + this._getEnemyDamageMod(e));
                this._addLog(`🎵🐆 ${eName} (charmed) attacks through its illusory doubles!`);
                cHit(t, dmg);
            }

        } else if (typeDef.isRemorhazAI) {
            const t = pick();
            if (t && this._enemyCanAttemptStaminaAttack(e)) {
                this._spendEnemyStamina(e);
                let dmg = Math.max(1, Math.round(randomInt(dmin + 3, dmax + 3) * MONSTER_DAMAGE_MULTIPLIER));
                dmg = Math.max(1, dmg + this._getEnemyDamageMod(e));
                this._addLog(`🎵🔥 ${eName} (charmed) crashes into ${eN(t)} with searing fury!`);
                cHit(t, dmg);
            }

        } else if (typeDef.isThunderbirdAI) {
            e.thunderbirdTurnCount = (e.thunderbirdTurnCount || 0) + 1;
            if (e.thunderbirdTurnCount % 3 === 0 && this._enemyCanAttemptManaAttack(e) && hostile().length > 0) {
                this._spendEnemyMana(e);
                let dmg = Math.max(1, Math.round(randomInt(mdmin, mdmax) * MONSTER_DAMAGE_MULTIPLIER * 1.25));
                dmg = Math.max(1, dmg + this._getEnemyDamageMod(e, 'magic'));
                this._addLog(`🎵⚡ ${eName} (charmed) THUNDERCLAPS at its former allies!`);
                for (const t of hostile()) cHit(t, dmg, true);
            } else {
                this._addLog(`🎵⚡ ${eName} (charmed) hurls lightning at its former allies!`);
                for (let ai = 0; ai < 2; ai++) {
                    const t = pick(); if (!t || !this._enemyCanAttemptStaminaAttack(e)) break;
                    this._spendEnemyStamina(e);
                    let dmg = Math.max(1, Math.round(randomInt(mdmin, mdmax) * MONSTER_DAMAGE_MULTIPLIER));
                    dmg = Math.max(1, dmg + this._getEnemyDamageMod(e, 'magic'));
                    cHit(t, dmg, true);
                    if (Math.random() < 0.35 && hostile().length > 1) {
                        const others = hostile().filter(h => h !== t);
                        if (others.length > 0) {
                            const chainT = others[Math.floor(Math.random() * others.length)];
                            const chainDmg = Math.max(1, Math.floor(dmg * 0.5));
                            this._addLog(`⚡ Lightning chains to ${eN(chainT)} for ${chainDmg}!`);
                            cHit(chainT, chainDmg, true);
                        }
                    }
                }
            }

        } else if (typeDef.isRustMonsterAI) {
            const t = pick();
            if (t && this._enemyCanAttemptStaminaAttack(e)) {
                this._spendEnemyStamina(e);
                let dmg = Math.max(1, Math.round(randomInt(dmin, dmax) * MONSTER_DAMAGE_MULTIPLIER * 0.5));
                dmg = Math.max(1, dmg + this._getEnemyDamageMod(e));
                this._addLog(`🎵🦟 ${eName} (charmed) gnaws at ${eN(t)}!`);
                cHit(t, dmg);
                if (t.health > 0 && !(t.activeEffects || []).some(x => x.type === 'rust_corrosion')) {
                    const defPenalty = Math.max(1, (e.level || dlvl) - 5);
                    cEffect(t, { type: 'rust_corrosion', defenseBonus: -defPenalty, rounds: 9999 });
                    this._addLog(`🦟 ${eN(t)}'s armor is corroded! (-${defPenalty} defense)`);
                }
            }

        } else if (typeDef.isWitchDoctorAI) {
            const roll = Math.random();
            const t = pick();
            if (roll < 0.25 && t) {
                const penalty = Math.max(2, Math.floor(dlvl * 0.5));
                cEffect(t, { type: 'hex', damageBonus: 0, defenseBonus: -penalty, rounds: 2 });
                this._addLog(`🎵💀 ${eName} (charmed) hexes ${eN(t)}! (-def 2 rds)`);
            } else if (roll < 0.50 && t) {
                const penalty = Math.max(1, Math.floor(dlvl / 4));
                cEffect(t, { type: 'wither', damageBonus: -penalty, rounds: Math.max(2, Math.floor(dlvl / 4)) });
                this._addLog(`🎵🦴 ${eName} (charmed) withers ${eN(t)}! (-${penalty} dmg)`);
            } else if (roll < 0.75 && this._enemyCanAttemptManaAttack(e)) {
                this._spendEnemyMana(e);
                this._addLog(`🎵💀 ${eName} (charmed) calls down plague on its former allies!`);
                const poisonTick = Math.max(1, Math.floor(Math.max(1, Math.round(randomInt(mdmin, mdmax) * MONSTER_DAMAGE_MULTIPLIER)) * 0.30));
                for (const t2 of hostile()) cEffect(t2, { type: 'poison', rounds: POISON_DURATION_ROUNDS, damage: poisonTick });
            } else if (t) {
                const siphon = Math.max(1, Math.floor((t.maxHealth || t.health * 2) * 0.20));
                const prevHP = t.health;
                t.health = Math.max(0, t.health - siphon);
                const actualDrain = Math.max(0, prevHP - t.health);
                if (actualDrain > 0) {
                    e.health = Math.min(e.maxHealth, e.health + actualDrain);
                    this._addLog(`🎵🫥 ${eName} (charmed) siphons ${eN(t)}'s soul! (${actualDrain} dmg)`);
                    tickDeath(t);
                }
            }

        } else if (typeDef.isGladiatorAI) {
            this._addLog(`🎵⚔️ ${eName} (charmed) advances with disciplined strikes!`);
            for (let ai = 0; ai < 2; ai++) {
                const t = pick(); if (!t || !this._enemyCanAttemptStaminaAttack(e)) break;
                this._spendEnemyStamina(e);
                let dmg = Math.max(1, Math.round(randomInt(dmin + 2, dmax + 2) * MONSTER_DAMAGE_MULTIPLIER));
                dmg = Math.max(1, dmg + this._getEnemyDamageMod(e));
                cHit(t, dmg);
            }

        } else if (typeDef.isAssassinLordAI) {
            const bleedDur = Math.max(2, Math.floor(dlvl / 6));
            for (let ai = 0; ai < 2; ai++) {
                const t = pick(); if (!t || !this._enemyCanAttemptStaminaAttack(e)) break;
                this._spendEnemyStamina(e);
                let dmg = Math.max(1, Math.round(randomInt(dmin + 3, dmax + 3) * MONSTER_DAMAGE_MULTIPLIER));
                dmg = Math.max(1, dmg + this._getEnemyDamageMod(e));
                const dealt = cHit(t, dmg);
                if (t.health > 0 && dealt > 0 && Math.random() < 0.30) {
                    cEffect(t, { type: 'fracture', damage: Math.max(1, Math.floor(dealt * 0.25)), rounds: bleedDur });
                    this._addLog(`🗡️ ${eN(t)} bleeds from the assassin's blade!`);
                }
            }

        } else if (typeDef.isBattleMageAI) {
            const bonus = 2;
            e.battleMageTurn = (e.battleMageTurn || 0) + 1;
            if (e.battleMageTurn % 2 === 1) {
                for (let ai = 0; ai < 2; ai++) {
                    const t = pick(); if (!t || !this._enemyCanAttemptStaminaAttack(e)) break;
                    this._spendEnemyStamina(e);
                    let dmg = Math.max(1, Math.round(randomInt(dmin + bonus, dmax + bonus) * MONSTER_DAMAGE_MULTIPLIER * 1.20));
                    dmg = Math.max(1, dmg + this._getEnemyDamageMod(e));
                    cHit(t, dmg);
                }
            } else if (this._enemyCanAttemptManaAttack(e) && hostile().length > 0) {
                this._spendEnemyMana(e);
                let dmg = Math.max(1, Math.round(randomInt(mdmin + bonus, mdmax + bonus) * MONSTER_DAMAGE_MULTIPLIER));
                dmg = Math.max(1, dmg + this._getEnemyDamageMod(e, 'magic'));
                this._addLog(`🎵🧙 ${eName} (charmed) unleashes an arcane blast at its former allies!`);
                for (const t of hostile()) cHit(t, dmg, true);
            }

        } else if (typeDef.isIronGolemAI) {
            if (Math.random() < 0.50 && hostile().length > 0) {
                this._addLog(`🎵⚙️ ${eName} (charmed) exhales poison gas at its former allies!`);
                const poisonTick = Math.max(2, Math.floor(dlvl * 0.5));
                for (const t of hostile()) cEffect(t, { type: 'poison', rounds: POISON_DURATION_ROUNDS + 2, damage: poisonTick });
            }
            const t = pick();
            if (t && this._enemyCanAttemptStaminaAttack(e)) {
                this._spendEnemyStamina(e);
                let dmg = Math.max(1, Math.round(randomInt(dmin + 25, dmax + 25) * MONSTER_DAMAGE_MULTIPLIER));
                dmg = Math.max(1, dmg + this._getEnemyDamageMod(e));
                this._addLog(`🎵⚙️ ${eName} (charmed) swings an iron fist at ${eN(t)}!`);
                cHit(t, dmg);
            }

        } else if (typeDef.isClockworkHorrorAI) {
            this._addLog(`🎵⚙️ ${eName} (charmed) lashes out with rapid mechanical strikes!`);
            for (let ai = 0; ai < 3; ai++) {
                const t = pick(); if (!t || !this._enemyCanAttemptStaminaAttack(e)) break;
                this._spendEnemyStamina(e);
                let dmg = Math.max(1, Math.round(randomInt(dmin, dmax) * MONSTER_DAMAGE_MULTIPLIER));
                dmg = Math.max(1, dmg + this._getEnemyDamageMod(e));
                cHit(t, dmg);
            }

        } else if (typeDef.isGargoyleSentinelAI) {
            const bonus = e.gargoylePhase2 ? 5 : 0;
            const t = pick();
            if (t && this._enemyCanAttemptStaminaAttack(e)) {
                this._spendEnemyStamina(e);
                let dmg = Math.max(1, Math.round(randomInt(dmin + bonus, dmax + bonus) * MONSTER_DAMAGE_MULTIPLIER));
                dmg = Math.max(1, dmg + this._getEnemyDamageMod(e));
                this._addLog(`🎵🪨 ${eName} (charmed) strikes ${eN(t)} with stone fists!`);
                cHit(t, dmg);
            }

        } else if (typeDef.isGibberingMoutherAI && this._enemyCanAttemptStaminaAttack(e)) {
            this._addLog(`🎵🧫 ${eName} (charmed) chomps at its former allies!`);
            for (const t of hostile()) {
                if (!this._enemyCanAttemptStaminaAttack(e)) break;
                this._spendEnemyStamina(e);
                let dmg = Math.max(1, Math.round(randomInt(dmin, dmax) * MONSTER_DAMAGE_MULTIPLIER * 0.75));
                dmg = Math.max(1, dmg + this._getEnemyDamageMod(e));
                const dealt = cHit(t, dmg);
                if (t.health > 0 && dealt > 0 && Math.random() < 0.30) {
                    if (this._enemyHasImmunity(t, 'psychic')) {
                        this._addLog(`🧫 ${eN(t)} is immune to psychic madness!`);
                    } else {
                        t.stunned = true;
                        this._addLog(`🧫 ${eN(t)} is driven to gibbering madness — stunned with psychic confusion!`);
                    }
                }
            }

        } else if (typeDef.isAbolethAI && this._enemyCanAttemptManaAttack(e)) {
            this._spendEnemyMana(e);
            let dmg = Math.max(1, Math.round(randomInt(mdmin + 2, mdmax + 2) * MONSTER_DAMAGE_MULTIPLIER));
            dmg = Math.max(1, dmg + this._getEnemyDamageMod(e, 'magic'));
            this._addLog(`🎵🧠 ${eName} (charmed) assaults former allies with psychic tendrils!`);
            for (const t of hostile()) cHit(t, dmg, true);

        } else if (typeDef.isStarSpawnAI) {
            this._addLog(`🎵⭐ ${eName} (charmed) warps reality at its former allies!`);
            for (const t of hostile()) {
                const roll = Math.random();
                if (roll < 0.35) {
                    let dmg = Math.max(1, Math.round(randomInt(mdmin + 3, mdmax + 3) * MONSTER_DAMAGE_MULTIPLIER));
                    cHit(t, dmg, true);
                } else if (roll < 0.55 && t.mana) {
                    const drain = Math.max(1, Math.floor(t.mana * 0.20));
                    t.mana = Math.max(0, t.mana - drain);
                    this._addLog(`⭐ ${eN(t)} loses ${drain} mana!`);
                } else if (roll < 0.75) {
                    const penalty = Math.max(1, Math.floor(dlvl / 5));
                    cEffect(t, { type: 'wither', damageBonus: -penalty, rounds: 2 });
                    this._addLog(`⭐ ${eN(t)} is warped! (-${penalty} dmg, 2 rds)`);
                } else {
                    if (this._enemyHasImmunity(t, 'stun')) {
                        this._addLog(`⭐ ${eN(t)} is immune to stun!`);
                    } else {
                        t.stunned = true;
                        this._addLog(`⭐ ${eN(t)} is stunned!`);
                    }
                }
            }

        } else if (typeDef.isVoidWraithAI) {
            const dmgBonus = 1.0 + (e.voidWraithKillBonus || 0) * 0.10;
            const t = pick();
            if (t && this._enemyCanAttemptStaminaAttack(e)) {
                this._spendEnemyStamina(e);
                let dmg = Math.max(1, Math.round(randomInt(dmin + 2, dmax + 2) * MONSTER_DAMAGE_MULTIPLIER * dmgBonus));
                dmg = Math.max(1, dmg + this._getEnemyDamageMod(e));
                const prevHP = t.health;
                this._addLog(`🎵🕳️ ${eName} (charmed) phases through the void and tears at ${eN(t)}!`);
                cHit(t, dmg);
                const dealt = Math.max(0, prevHP - t.health);
                if (dealt > 0) {
                    const drain = Math.floor(dealt * 0.25);
                    e.health = Math.min(e.maxHealth, e.health + drain);
                    if (t.mana) t.mana = Math.max(0, t.mana - Math.min(t.mana, drain));
                }
                if (t.health <= 0) e.voidWraithKillBonus = (e.voidWraithKillBonus || 0) + 1;
            }

        } else if (typeDef.isVampireLordAI) {
            const t = pick();
            if (t && this._enemyCanAttemptStaminaAttack(e)) {
                this._spendEnemyStamina(e);
                let dmg = Math.max(1, Math.round(randomInt(dmin + 4, dmax + 4) * MONSTER_DAMAGE_MULTIPLIER));
                dmg = Math.max(1, dmg + this._getEnemyDamageMod(e));
                const prevHP = t.health;
                this._addLog(`🎵🧛 ${eName} (charmed) lunges at ${eN(t)} with fanged fury!`);
                cHit(t, dmg);
                const dealt = Math.max(0, prevHP - t.health);
                if (dealt > 0 && typeDef.lifeDrain) {
                    const lifeSteal = Math.floor(dealt * typeDef.lifeDrain);
                    e.health = Math.min(e.maxHealth, e.health + lifeSteal);
                    if (lifeSteal > 0) this._addLog(`🧛 ${eName} drains ${lifeSteal} HP!`);
                }
            }

        } else if (typeDef.isMyconidSovereignAI && this._enemyCanAttemptManaAttack(e)) {
            this._spendEnemyMana(e);
            let dmg = Math.max(1, Math.round(randomInt(mdmin, mdmax) * MONSTER_DAMAGE_MULTIPLIER));
            dmg = Math.max(1, dmg + this._getEnemyDamageMod(e, 'magic'));
            this._addLog(`🎵🍄 ${eName} (charmed) erupts in toxic spores at its former allies!`);
            for (const t of hostile()) {
                cHit(t, dmg, true);
                if (t.health > 0) cEffect(t, { type: 'poison', rounds: POISON_DURATION_ROUNDS, damage: Math.max(1, Math.floor(dmg * 0.40)) });
            }

        } else if (typeDef.isWillOWispAI) {
            const t = pick();
            if (t) {
                const flatDmg = Math.max(1, Math.floor((t.maxHealth || t.health * 2) * 0.25));
                this._addLog(`🎵👻 ${eName} (charmed) turns its death-light on ${eN(t)}!`);
                t.health = Math.max(0, t.health - flatDmg);
                this._addLog(`👻 ${eN(t)} suffers ${flatDmg} ethereal damage!`);
                tickDeath(t);
            }

        } else if (typeDef.isRoperAI) {
            const rLvl = e.level || 1;
            const tentacleDur = Math.max(1, Math.floor(rLvl / 10));
            this._addLog(`🎵🦑 ${eName} (charmed) lashes tentacles at its former allies!`);
            for (let ti = 0; ti < 6; ti++) {
                const t = pick(); if (!t || !this._enemyCanAttemptStaminaAttack(e)) break;
                this._spendEnemyStamina(e);
                let dmg = Math.max(1, Math.round(randomInt(dmin + 2, dmax + 2) * MONSTER_DAMAGE_MULTIPLIER));
                dmg = Math.max(1, dmg + this._getEnemyDamageMod(e));
                const dealt = cHit(t, dmg);
                if (t.health > 0 && dealt > 0) {
                    if (!(t.activeEffects || []).some(x => x.type === 'roper_weakness')) {
                        cEffect(t, { type: 'roper_weakness', meleeDamageBonus: -rLvl, rounds: tentacleDur });
                    }
                    if (Math.random() < 0.50) {
                        if (this._enemyHasImmunity(t, 'paralyze')) {
                            this._addLog(`🦑 ${eN(t)} cannot be paralyzed by the roper's grip!`);
                        } else {
                            t.webbedRounds = Math.max(t.webbedRounds || 0, tentacleDur);
                        }
                    }
                }
            }

        } else if (typeDef.isInvisibleStalkerAI) {
            for (let ai = 0; ai < 2; ai++) {
                const t = pick(); if (!t || !this._enemyCanAttemptStaminaAttack(e)) break;
                this._spendEnemyStamina(e);
                let dmg = Math.max(1, Math.round(randomInt(dmin + 3, dmax + 3) * MONSTER_DAMAGE_MULTIPLIER));
                dmg = Math.max(1, dmg + this._getEnemyDamageMod(e));
                this._addLog(`🎵👁️ ${eName} (charmed) strikes ${eN(t)} from the unseen void!`);
                cHit(t, dmg);
            }

        } else if (typeDef.isDarkTreantAI) {
            for (let _cti = 0; _cti < 4; _cti++) {
                const _ct = pick(); if (!_ct || !this._enemyCanAttemptStaminaAttack(e)) break;
                this._spendEnemyStamina(e);
                let _ctdmg = Math.max(1, Math.round(randomInt(dmin, dmax) * MONSTER_DAMAGE_MULTIPLIER));
                _ctdmg = Math.max(1, _ctdmg + this._getEnemyDamageMod(e));
                this._addLog(`🎵🌑 ${eName} (charmed) lashes ${eN(_ct)} with a dark branch!`);
                cHit(_ct, _ctdmg);
                if (_ct.health > 0 && Math.random() < 0.35) {
                    if (this._enemyHasImmunity(_ct, 'hold')) {
                        this._addLog(`🌿 ${eN(_ct)} cannot be held by grasping bark!`);
                    } else {
                        _ct.activeEffects = (_ct.activeEffects || []); _ct.activeEffects.push({ type: 'web', rounds: WEB_DURATION_ROUNDS });
                        this._addLog(`🌿 ${eN(_ct)} is held fast by grasping bark! (${WEB_DURATION_ROUNDS} rds)`);
                    }
                }
            }

        } else if (typeDef.isMandrakeRootAI) {
            const _cmt = pick();
            if (_cmt && this._enemyCanAttemptStaminaAttack(e)) {
                this._spendEnemyStamina(e);
                let _cmdmg = Math.max(1, Math.round(randomInt(dmin, dmax) * MONSTER_DAMAGE_MULTIPLIER));
                _cmdmg = Math.max(1, _cmdmg + this._getEnemyDamageMod(e));
                this._addLog(`🎵🌱 ${eName} (charmed) batters ${eN(_cmt)} with gnarled roots!`);
                cHit(_cmt, _cmdmg);
            }

        } else if (typeDef.isKillerVineAI) {
            const _ckvMax = Math.max(1, Math.floor((e.level || 1) / 6));
            const _ckvPool = hostile().slice();
            for (let _ckvi = 0; _ckvi < Math.min(_ckvMax, _ckvPool.length); _ckvi++) {
                const _ckvIdx = Math.floor(Math.random() * _ckvPool.length);
                const _ckvt = _ckvPool.splice(_ckvIdx, 1)[0];
                if (!_ckvt || _ckvt.health <= 0 || !this._enemyCanAttemptStaminaAttack(e)) break;
                this._spendEnemyStamina(e);
                let _ckvdmg = Math.max(1, Math.round(randomInt(dmin, dmax) * MONSTER_DAMAGE_MULTIPLIER));
                _ckvdmg = Math.max(1, _ckvdmg + this._getEnemyDamageMod(e));
                this._addLog(`🎵🌿 ${eName} (charmed) ensnares ${eN(_ckvt)} with razor vines!`);
                cHit(_ckvt, _ckvdmg);
                if (_ckvt.health > 0 && Math.random() < 0.45) {
                    if (this._enemyHasImmunity(_ckvt, 'hold')) {
                        this._addLog(`🌿 ${eN(_ckvt)} cannot be pinned by constricting vines!`);
                    } else {
                        _ckvt.activeEffects = (_ckvt.activeEffects || []); _ckvt.activeEffects.push({ type: 'web', rounds: WEB_DURATION_ROUNDS });
                        this._addLog(`🌿 ${eN(_ckvt)} is pinned by constricting vines! (${WEB_DURATION_ROUNDS} rds)`);
                    }
                }
            }

        } else if (typeDef.isCaveBearAI) {
            const _cbChAtks = [{ emoji: '🐻', verb: 'slashes' }, { emoji: '🐻', verb: 'rakes' }, { emoji: '🐻', verb: 'bites' }];
            for (const _cbChAtk of _cbChAtks) {
                const _cbt = pick(); if (!_cbt || !this._enemyCanAttemptStaminaAttack(e)) break;
                this._spendEnemyStamina(e);
                let _cbcdmg = Math.max(1, Math.round(randomInt(dmin, dmax) * MONSTER_DAMAGE_MULTIPLIER));
                _cbcdmg = Math.max(1, _cbcdmg + this._getEnemyDamageMod(e));
                this._addLog(`🎵${_cbChAtk.emoji} ${eName} (charmed) ${_cbChAtk.verb} ${eN(_cbt)}!`);
                cHit(_cbt, _cbcdmg);
            }

        } else if (typeDef.isCaveLionAI) {
            const _clChAtks = [{ emoji: '🦁', verb: 'claws' }, { emoji: '🦁', verb: 'rakes' }, { emoji: '🦁', verb: 'bites' }];
            for (const _clChAtk of _clChAtks) {
                const _clt = pick(); if (!_clt || !this._enemyCanAttemptStaminaAttack(e)) break;
                this._spendEnemyStamina(e);
                let _clcdmg = Math.max(1, Math.round(randomInt(dmin, dmax) * MONSTER_DAMAGE_MULTIPLIER));
                _clcdmg = Math.max(1, _clcdmg + this._getEnemyDamageMod(e));
                this._addLog(`🎵${_clChAtk.emoji} ${eName} (charmed) ${_clChAtk.verb} ${eN(_clt)}!`);
                cHit(_clt, _clcdmg);
            }

        } else if (typeDef.isWinterWolfAI) {
            const _cwwt = pick();
            if (_cwwt && this._enemyCanAttemptStaminaAttack(e)) {
                this._spendEnemyStamina(e);
                let _cwwdmg = Math.max(1, Math.round(randomInt(dmin, dmax) * MONSTER_DAMAGE_MULTIPLIER));
                _cwwdmg = Math.max(1, _cwwdmg + this._getEnemyDamageMod(e));
                this._addLog(`🎵🐺 ${eName} (charmed) bites ${eN(_cwwt)}!`);
                cHit(_cwwt, _cwwdmg);
            }
            if (Math.random() < 0.50 && this._enemyCanAttemptManaAttack(e) && hostile().length > 0) {
                this._spendEnemyMana(e);
                let _cwwbdmg = Math.max(1, Math.round(randomInt(mdmin, mdmax) * MONSTER_DAMAGE_MULTIPLIER));
                _cwwbdmg = Math.max(1, _cwwbdmg + this._getEnemyDamageMod(e, 'magic'));
                this._addLog(`🎵❄️ ${eName} (charmed) exhales a freezing blizzard at its former allies!`);
                for (const _cwwbt of hostile()) { cHit(_cwwbt, _cwwbdmg, true); tickDeath(_cwwbt); }
            }

        } else if (typeDef.isLizardFolkAI) {
            const _clft = pick();
            if (_clft && this._enemyCanAttemptStaminaAttack(e)) {
                this._spendEnemyStamina(e);
                let _clfdmg = Math.max(1, Math.round(randomInt(dmin, dmax) * MONSTER_DAMAGE_MULTIPLIER));
                _clfdmg = Math.max(1, _clfdmg + this._getEnemyDamageMod(e));
                this._addLog(`🎵🦎 ${eName} (charmed) strikes ${eN(_clft)}!`);
                cHit(_clft, _clfdmg);
            }

        } else if (typeDef.isDreadCultistAI) {
            if (this._enemyCanAttemptManaAttack(e) && hostile().length > 0) {
                this._spendEnemyMana(e);
                let _dccdmg = Math.max(1, Math.round(randomInt(mdmin, mdmax) * MONSTER_DAMAGE_MULTIPLIER));
                _dccdmg = Math.max(1, _dccdmg + this._getEnemyDamageMod(e, 'magic'));
                this._addLog(`🎵😈 ${eName} (charmed) unleashes abyssal energy at the enemy group!`);
                for (const _dcct of hostile()) { cHit(_dcct, _dccdmg, true); tickDeath(_dcct); }
            }

        } else if (typeDef.rangedAny && this._enemyCanAttemptStaminaAttack(e)) {
            this._spendEnemyStamina(e);
            const t = pick();
            if (t) {
                let dmg = Math.max(1, Math.round(randomInt(dmin, dmax) * MONSTER_DAMAGE_MULTIPLIER));
                dmg = Math.max(1, dmg + this._getEnemyDamageMod(e, 'magic'));
                this._addLog(`🎵👿 ${eName} (charmed) hurls a bolt at ${eN(t)}!`);
                cHit(t, dmg, true);
            }

        } else if (typeDef.earthquakeChance && Math.random() < typeDef.earthquakeChance && this._enemyCanAttemptStaminaAttack(e)) {
            this._spendEnemyStamina(e);
            let dmg = Math.max(1, Math.round(randomInt(dmin, dmax) * MONSTER_DAMAGE_MULTIPLIER));
            dmg = Math.max(1, dmg + this._getEnemyDamageMod(e));
            this._addLog(`🎵🪨 ${eName} (charmed) SLAMS — earthquake hits its former allies!`);
            for (const t of hostile()) cHit(t, dmg);

        } else {
            // Default: proper melee using monster's actual level/stats
            const t = pick();
            if (this._enemyCanAttemptStaminaAttack(e) && t) {
                this._spendEnemyStamina(e);
                let dmg = Math.max(1, Math.round(randomInt(dmin, dmax) * MONSTER_DAMAGE_MULTIPLIER));
                dmg = Math.max(1, dmg + this._getEnemyDamageMod(e));
                this._addLog(`🎵 ${eName} (charmed) attacks ${eN(t)}!`);
                cHit(t, dmg);
            } else if (this._enemyCanAttemptManaAttack(e) && t) {
                this._spendEnemyMana(e);
                let dmg = Math.max(1, Math.round(randomInt(mdmin, mdmax) * MONSTER_DAMAGE_MULTIPLIER));
                dmg = Math.max(1, dmg + this._getEnemyDamageMod(e, 'magic'));
                this._addLog(`🎵 ${eName} (charmed) attacks ${eN(t)}!`);
                cHit(t, dmg, true);
            } else if (t) {
                this._addLog(`🎵 ${eName} (charmed) weakly strikes ${eN(t)}!`);
                t.health = Math.max(0, t.health - 1);
                tickDeath(t);
            }
        }
    }

    _tickEnemyEffects() {
        for (const e of this.enemies) {
            if (e.health <= 0) continue;

            const typeDef = ENEMY_TYPES[e.type] || {};

            // fullDoTImmune (Star Spawn, Clockwork Horror): skip all DoT processing but still tick down rounds.
            // Exception: acid_dot bypasses this immunity (and deals double damage on fullMagicImmune enemies).
            if (typeDef.fullDoTImmune) {
                const effects = e.activeEffects || [];
                for (const fx of effects) {
                    if (!fx.permanent && 'rounds' in fx && fx.rounds > 0) {
                        if (fx.type === 'acid_dot' && fx.damage > 0 && e.health > 0) {
                            let tickDmg = fx.damage;
                            if (typeDef.acidWeakness) tickDmg *= 2;
                            e.health = Math.max(0, e.health - tickDmg);
                            this._addLog(`\u{1F7E2} acid: ${this._eName(e)} suffers ${tickDmg} damage!`);
                            if (e.health <= 0) {
                                this._addLog(`${this._eName(e)} is consumed by the acid!`);
                                if (!e._deathHandled) { e._deathHandled = true; this._onEnemyDeath(e); }
                            }
                        }
                        fx.rounds--;
                    }
                }
                e.activeEffects = effects.filter(x => x.permanent || !('rounds' in x) || x.rounds > 0);
                continue;
            }

            if (typeDef.regenPercent && e.health < e.maxHealth) {
                const baseHeal = Math.max(1, Math.ceil(e.maxHealth * typeDef.regenPercent));
                const rotMult = this._getMummyRotHealMultiplier(e);
                if (rotMult <= 0) {
                    this._addLog(`🟤 ${this._eName(e)} cannot regenerate while afflicted by Mummy Rot!`);
                }
                const heal = rotMult > 0 ? Math.max(1, Math.floor(baseHeal * rotMult)) : 0;
                const before = e.health;
                e.health = Math.min(e.maxHealth, e.health + heal);
                const gained = e.health - before;
                if (gained > 0) {
                    this._addLog(`\u{1F9EC} ${this._eName(e)} regenerates ${gained} HP!`);
                }
            }

            // ── Weapon-rider DoTs on enemies (burn, acid_dot, poison_weapon).
            //    Each ticks per player round; damage rolled once per round.
            const effects = e.activeEffects || [];
            const DOT_TYPES = { burn: '\u{1F525} burn', acid_dot: '\u{1F7E2} acid', poison_weapon: '\u{1F40D} venom', lightning_dot: '⚡ lightning', frost_dot: '❄️ frost', bleed: '\u{1F7E5} bleed', mummy_rot: '\u{1F7E4} Mummy Rot', fae_poison: '\u{1F33F} fae venom', rogue_trap_dot: '\u{1FAA4} trap wound', ranger_totem_bleed: '🐺 totem bleed', ranger_totem_poison: '🧚 totem poison', avatar_fire: '🔥 avatar fire', avatar_lightning: '⚡ avatar lightning', avatar_acid: '🟢 avatar acid', avatar_ice: '❄️ avatar ice', rift_drown: '\u{1F30A} drowning', vk_poison: '\u{1F577}️ venom', quasit_poison: '\u{1F47F} quasit venom', bloat_poison: '\u{1F922} toxic bile', vk_acid_dot: '\u{1F7E2} acid corrosion', insect_plague_poison: '\u{1F41C} plague poison', vk_swarm_poison: '\u{1F41C} swarm venom', vk_swarm_acid: '\u{1FAA1} swarm acid', shadow_fire_dot: '🌑🔥 shadow fire', shadow_ice_dot: '🌑❄️ shadow ice', shadow_lightning_dot: '🌑⚡ shadow lightning', shadow_acid_dot: '🌑🟢 shadow acid', shadow_poison_dot: '🌑☠️ shadow poison', shadow_psychic_dot: '🌑💜 shadow psychic', shadow_sonic_dot: '🌑🔊 shadow sonic', shadow_bleed_dot: '🌑🩸 shadow bleed', awakened_ember_brand: '🔥 ember brand', awakened_void_rot: '🕳️ void rot', awakened_grave_rot: '☠️ grave rot', awakened_pox: '☣️ eldritch pox', awakened_mind_burn: '🧠 mind burn', awakened_saint_scorch: '🌘 saint scorch' };
            for (const fx of effects) {
                if (!fx || fx.rounds === undefined || fx.rounds <= 0) continue;
                if (DOT_TYPES[fx.type] && fx.damage > 0 && e.health > 0) {
                    let tickDmg = fx.damage;
                    // Mummy takes double fire/burn damage
                    if (fx.type === 'burn' && typeDef.takesDoubleFire) tickDmg *= 2;
                    // Plant-tagged enemies take double fire DoT damage
                    if (fx.type === 'burn' && Array.isArray(typeDef.tags) && typeDef.tags.includes('plant')) tickDmg *= 2;
                    e.health = Math.max(0, e.health - tickDmg);
                    this._addLog(`${DOT_TYPES[fx.type]}: ${this._eName(e)} suffers ${tickDmg} damage!`);
                    // Trap Mastery (L35): every tick triggers a random debuff effect
                    if (fx.type === 'rogue_trap_dot' && fx.rogueLevel && e.health > 0) {
                        this._applyTrapMasteryProc(e, fx.rogueLevel);
                    }
                    if (e.health <= 0) {
                        this._addLog(`${this._eName(e)} is consumed by the ${fx.type.replace(/_/g, ' ')}!`);
                        if (!e._deathHandled) { e._deathHandled = true; this._onEnemyDeath(e); }
                        break;
                    }
                }
            }

            const wasting = effects.find(fx => fx && fx.type === 'wasting_curse' && fx.rounds > 0);
            if (wasting && e.health > 0) {
                if (Math.random() < WARLOCK_CURSE_SHRUG_CHANCE) {
                    wasting.rounds = 0;
                    this._addLog(`\u{1F9FF} ${this._eName(e)} shrugs off the Wasting Curse!`);
                } else {
                    const pct = Math.min(WARLOCK_CURSE_MAX_PCT, wasting.pct || WARLOCK_CURSE_BASE_PCT);
                    const dmg = Math.max(1, Math.floor(e.health * pct));
                    e.health = Math.max(0, e.health - dmg);
                    this._addLog(`\u{1F9FF} Wasting Curse: ${this._eName(e)} loses ${dmg} HP (${Math.round(pct * 100)}% current HP)!`);
                    wasting.pct = Math.min(WARLOCK_CURSE_MAX_PCT, pct + WARLOCK_CURSE_BASE_PCT);
                    if (e.health <= 0 && !e._deathHandled) {
                        e._deathHandled = true;
                        this._onEnemyDeath(e);
                    }
                }
            }

            // Verdant Surge — nature DoT + 25% action loss per round for entangled enemies (L30 druid)
            const verdantEntangle = effects.find(fx => fx && fx.type === 'entangle' && fx.verdantSurge && fx.rounds > 0);
            if (verdantEntangle && e.health > 0) {
                const vTags = Array.isArray(typeDef.tags) ? typeDef.tags : [];
                if (!vTags.includes('incorporeal')) {
                    const vDotDmg = randomInt(verdantEntangle.verdantMin, verdantEntangle.verdantMax);
                    e.health = Math.max(0, e.health - vDotDmg);
                    this._addLog(`\u{1F33F} Verdant Surge: ${this._eName(e)} withers for ${vDotDmg} nature damage!`);
                    if (e.health <= 0) this._addLog(`${this._eName(e)} is consumed by the verdant surge!`);
                }
                if (e.health > 0 && !e.isBoss && !e.isMegaBoss
                    && Math.random() < DRUID_VERDANT_SURGE_ACTION_LOSS_CHANCE) {
                    if (this._tryHoldEnemy(e))
                        this._addLog(`\u{1F33F} ${this._eName(e)}'s movement is seized — loses its action!`);
                }
            }

            // Fae hold — re-apply stun for remaining hold rounds then expire
            const faeHold = effects.find(fx => fx && fx.type === 'fae_hold' && fx.rounds > 0);
            if (faeHold && e.health > 0) {
                e.stunned = true;   // cleared at turn start after skipping
                faeHold.rounds--;
            }

            // Quivering Palm — internal damage that multiplies each round by (2 + monkLevel/100) (bypasses all defense)
            for (const fx of effects) {
                if (fx.type === 'quivering_palm' && fx.rounds > 0 && fx.damage > 0 && e.health > 0) {
                    e.health = Math.max(0, e.health - fx.damage);
                    this._addLog(`✋ Quivering Palm: ${this._eName(e)} shudders for ${fx.damage} internal damage!`);
                    // Multiply by stored mult each round, caps at 10 total multiplications
                    if ((fx.doublings || 0) < 10) {
                        fx.damage = Math.round(fx.damage * (fx.mult || 2));
                        fx.doublings = (fx.doublings || 0) + 1;
                    }
                    if (e.health <= 0) {
                        this._addLog(`${this._eName(e)} collapses from the Quivering Palm!`);
                        break;
                    }
                }
            }

            // Mega-conda escalating crush DoT
            const megaCondaDoT = effects.find(fx => fx && fx.type === 'megaconda_constrict' && fx.rounds > 0);
            if (megaCondaDoT && e.health > 0) {
                const tickNum = megaCondaDoT.mcTickNum || 0;
                const tickDmg = Math.max(1, Math.floor(megaCondaDoT.baseDamage * (1 + 0.5 * tickNum)));
                e.health = Math.max(0, e.health - tickDmg);
                megaCondaDoT.mcTickNum = tickNum + 1;
                this._addLog(`🐍 Constrict: ${this._eName(e)} is crushed for ${tickDmg} damage! (×${(1 + 0.5 * tickNum).toFixed(1)})`);
                if (e.health <= 0) {
                    this._addLog(`${this._eName(e)} is crushed to death!`);
                    if (!e._deathHandled) { e._deathHandled = true; this._onEnemyDeath(e); }
                }
            }

            // Charm duration tick: decrement charmedRounds each enemy round
            if (e.charmedRounds > 0) {
                e.charmedRounds--;
                if (e.charmedRounds <= 0) {
                    e.charmedRounds = 0;
                    e.charmerId = null;
                    this._addLog(`🎵 ${this._eName(e)}'s charm has worn off — it returns to the enemy ranks!`);
                }
            }

            // Decrement and expire. Permanent effects (e.g. Mummy Rot, Ghost Fear)
            // are never decremented and never expired.
            for (const fx of effects) {
                if (!fx.permanent && 'rounds' in fx && fx.rounds > 0) fx.rounds--;
            }

            // Pressure Points: remove when the last Quivering Palm expires
            const hasExpiredQp = effects.some(fx => fx && fx.type === 'quivering_palm' && 'rounds' in fx && fx.rounds === 0);
            const hasActiveQp  = effects.some(fx => fx && fx.type === 'quivering_palm' && 'rounds' in fx && fx.rounds > 0);
            if (hasExpiredQp && !hasActiveQp) {
                const ppIdx = effects.findIndex(x => x && x.type === 'pressure_points');
                if (ppIdx !== -1) {
                    effects.splice(ppIdx, 1);
                    this._addLog(`✋ Pressure Points on ${this._eName(e)} dissipate as the Quivering Palm fades.`);
                }
            }

            // Stun immunity countdown (granted after losing a turn to stun)
            if ((e.stunImmuneRounds || 0) > 0) e.stunImmuneRounds--;
            e.activeEffects = effects.filter(x => x.permanent || !('rounds' in x) || x.rounds > 0);
        }
    }

    // ────────────────────────────────────────────
    // Victory / loot
    // ────────────────────────────────────────────

    _finishVictory() {
        // Statue gauntlet: suppress true victory until wave 15 clears.
        if (this.isStatueEvent && !this._checkStatueEventContinue()) return;

        this.phase = 'VICTORY';
        // Clear charm state from any surviving (formerly charmed) monsters that fled
        for (const e of this.enemies) {
            if (e.charmedRounds > 0) {
                e.charmedRounds = 0;
                e.charmerId = null;
            }
        }
        this._addLog('--- Victory! All enemies defeated! ---');
        this._applyVictoryRecovery();
        this._awardXP();
        this._generateLoot();
        this._notify();
    }

    _awardXP() {
        let totalXP = 0;
        for (const e of this.enemies) {
            const lvl = Math.max(1, e.level || 1);
            const xpMult = e.isSuperBoss ? 30 : e.isMegaBoss ? 10 : (e.isBoss ? 3 : 1);
            totalXP += XP_PER_MONSTER_LEVEL * lvl * xpMult;
        }
        if (this.isStatueEvent) totalXP = Math.floor(totalXP * STATUE_XP_MULT);
        this.xpEarned = totalXP;

        const eligible = this.party.filter(m => !m.isSummoned && m.health > 0);
        if (eligible.length === 0 || totalXP === 0) return;

        const share = Math.floor(totalXP / eligible.length);
        this._addLog(`Party gains ${totalXP} XP (${share} each).`);

        for (const m of eligible) {
            const records = m.gainXP(share);
            for (const r of records) {
                this._addLog(`\u2B50 ${m.name} reached level ${r.toLevel}! (+${r.hpGain} HP, +${r.stGain} ST, +${r.mpGain} MP)`);
                this.levelUpLogs.push({ member: m.name, ...r });
            }
        }
    }

    /**
     * Phase 8 rule 9: fallen characters STAY dead after combat. No auto-revive.
     * Survivors still receive a small recovery tick.
     */
    _applyVictoryRecovery() {
        let anyRecovered = false;
        for (const m of this.party) {
            if (m.isSummoned) continue;
            if (m.abyssFormActive) this._exitAbyssForm(m);
            m.tempHp    = 0; // Blood Rage temp HP resets after combat
            m.rageEncourageRounds = 0;
            m.mirrorImages = 0; // mirror images reset
            m.lichPhial = false; // lich phial cleared after combat
            m.isLichForm = false; // lich form reset
            m.faeTokens = 0; // fae tokens reset
            m.rangerTotem = null;
            m.avatarActive = false;
            m.avatarElement = 'fire';
            m.activeEffects = (m.activeEffects || []).filter(fx => !(fx && fx.type === 'cloak_of_displacement'));
            if (m.health <= 0) continue;          // do NOT revive
            m.health  = Math.min(m.maxHealth,  m.health  + POST_COMBAT_RECOVERY);
            m.stamina = Math.min(m.maxStamina, m.stamina + POST_COMBAT_RECOVERY);
            m.mana    = Math.min(m.maxMana,    m.mana    + POST_COMBAT_RECOVERY);
            anyRecovered = true;
        }
        if (anyRecovered) {
            this._addLog(`Surviving party recovers slightly. (+${POST_COMBAT_RECOVERY} each stat)`);
        }
        const fallen = this.party.filter(m => !m.isSummoned && m.health <= 0);
        if (fallen.length > 0) {
            this._addLog(`\u26B0\uFE0F ${fallen.length} party member${fallen.length > 1 ? 's' : ''} fell in battle — use a Resurrection Potion to revive them.`);
        }
    }

    _generateLoot() {
        const partySize = this.party.filter(m => !m.isSummoned).length;
        const extraChance = Math.max(0, partySize - 1) * LOOT_EXTRA_CHAR_BONUS;
        const dlvlBoost = LOOT_DROP_PER_LEVEL * Math.max(0, this.dungeonLevel - 1);

        let totalGold = 0;
        const items = [];
        const hasSuperBoss = this.enemies.some(e => e.isSuperBoss);

        for (const e of this.enemies) {
            if (e.health > 0) continue;

            const lvl = Math.max(1, e.level || 1);
            const isSuperBoss = !!e.isSuperBoss;
            const isBoss     = !!e.isBoss || isSuperBoss;
            const isMegaBoss = !!e.isMegaBoss || isSuperBoss;
            // Super boss: 10 loot rolls, 20× gold.  Mega boss: 10× gold, 5 loot rolls.  Normal boss: 5× gold, 5 rolls.
            const lootRolls = isSuperBoss ? 10 : (isBoss ? 5 : 1);
            const goldMult  = isSuperBoss ? 20 : isMegaBoss ? 10 : (isBoss ? 5 : 1);

            totalGold += randomInt(LOOT_GOLD_MIN, LOOT_GOLD_MAX) * lvl * goldMult;

            // Advanced materials: one independent, per-enemy roll (separate from reagents).
            const advancedMat = this._rollAdvancedMaterialDrop(e);
            if (advancedMat) this._addLootItemStack(items, advancedMat, 1);

            for (let roll = 0; roll < lootRolls; roll++) {
                if (Math.random() < LOOT_FOOD_CHANCE) {
                    const existing = items.find(i => i.itemId === 'food');
                    if (existing) existing.quantity++;
                    else items.push({ itemId: 'food', quantity: 1 });
                }

                if (Math.random() < LOOT_POTION_CHANCE) {
                    const existing = items.find(i => i.itemId === 'healing_potion');
                    if (existing) existing.quantity++;
                    else items.push({ itemId: 'healing_potion', quantity: 1 });
                }

                if (Math.random() < LOOT_WEAPON_CHANCE + extraChance + dlvlBoost) {
                    items.push({ itemId: randomWeaponDrop(), quantity: 1 });
                }
                if (Math.random() < LOOT_ARMOR_CHANCE + extraChance + dlvlBoost) {
                    items.push({ itemId: randomArmorDrop(), quantity: 1 });
                }
                if (Math.random() < LOOT_SHIELD_CHANCE + extraChance + dlvlBoost) {
                    items.push({ itemId: randomShieldDrop(), quantity: 1 });
                }
                // Mega bosses get 5 trinket rolls per loot roll; normal bosses get 3× chance per roll.
                const trinketChance = Math.min(TRINKET_DROP_CHANCE_MAX, TRINKET_DROP_CHANCE + dlvlBoost);
                const trinketRolls = isMegaBoss ? 5 : 1;
                for (let tr = 0; tr < trinketRolls; tr++) {
                    if (Math.random() < (isBoss ? trinketChance * 3 : trinketChance)) {
                        items.push({ itemId: randomTrinketDrop(this.dungeonLevel), quantity: 1 });
                    }
                }
                // Phase 10 — 3% torch, reagent drop per enemy.
                if (Math.random() < LOOT_TORCH_CHANCE) {
                    const existing = items.find(i => i.itemId === 'torch');
                    if (existing) existing.quantity++;
                    else items.push({ itemId: 'torch', quantity: 1 });
                }
                // Tiered reagents — each tier rolls independently when the
                // dungeon level qualifies. Base chance + 1%/level, capped at 10%.
                {
                    const dlvlHere = this.dungeonLevel;
                    const lvlBonus = Math.min(LOOT_REAGENT_CHANCE_MAX,
                        LOOT_REAGENT_CHANCE_PER_LVL * (dlvlHere - 1));
                    // Common: all levels
                    if (Math.random() < Math.min(LOOT_REAGENT_CHANCE_MAX, LOOT_REAGENT_COMMON_BASE + lvlBonus)) {
                        const ex = items.find(i => i.itemId === 'reagent_common');
                        if (ex) ex.quantity++; else items.push({ itemId: 'reagent_common', quantity: 1 });
                    }
                    // Uncommon: level 4+
                    if (dlvlHere >= REAGENT_TIER_UNCOMMON_MIN &&
                        Math.random() < Math.min(LOOT_REAGENT_CHANCE_MAX, LOOT_REAGENT_UNCOMMON_BASE + lvlBonus)) {
                        const ex = items.find(i => i.itemId === 'reagent_uncommon');
                        if (ex) ex.quantity++; else items.push({ itemId: 'reagent_uncommon', quantity: 1 });
                    }
                    // Rare: level 7+
                    if (dlvlHere >= REAGENT_TIER_RARE_MIN &&
                        Math.random() < Math.min(LOOT_REAGENT_CHANCE_MAX, LOOT_REAGENT_RARE_BASE + lvlBonus)) {
                        const ex = items.find(i => i.itemId === 'reagent_rare');
                        if (ex) ex.quantity++; else items.push({ itemId: 'reagent_rare', quantity: 1 });
                    }
                    // Epic: level 15+ — same level-scaled formula as common/uncommon/rare
                    // bonus = (dungeonLevel - tierMinLevel) × 1%, capped at 10%
                    if (dlvlHere >= REAGENT_TIER_EPIC_MIN) {
                        const epicBonus = Math.min(LOOT_REAGENT_CHANCE_MAX,
                            Math.max(0, (dlvlHere - REAGENT_TIER_EPIC_MIN) * LOOT_REAGENT_CHANCE_PER_LVL));
                        if (Math.random() < Math.min(LOOT_REAGENT_CHANCE_MAX, LOOT_REAGENT_EPIC_BASE + epicBonus)) {
                            const ex = items.find(i => i.itemId === 'reagent_epic');
                            if (ex) ex.quantity++; else items.push({ itemId: 'reagent_epic', quantity: 1 });
                        }
                    }
                    // Legendary: level 20+
                    if (dlvlHere >= REAGENT_TIER_LEGENDARY_MIN) {
                        const legendBonus = Math.min(LOOT_REAGENT_CHANCE_MAX,
                            Math.max(0, (dlvlHere - REAGENT_TIER_LEGENDARY_MIN) * LOOT_REAGENT_CHANCE_PER_LVL));
                        if (Math.random() < Math.min(LOOT_REAGENT_CHANCE_MAX, LOOT_REAGENT_LEGENDARY_BASE + legendBonus)) {
                            const ex = items.find(i => i.itemId === 'reagent_legendary');
                            if (ex) ex.quantity++; else items.push({ itemId: 'reagent_legendary', quantity: 1 });
                        }
                    }
                    // Mythic: level 25+
                    if (dlvlHere >= REAGENT_TIER_MYTHIC_MIN) {
                        const mythicBonus = Math.min(LOOT_REAGENT_CHANCE_MAX,
                            Math.max(0, (dlvlHere - REAGENT_TIER_MYTHIC_MIN) * LOOT_REAGENT_CHANCE_PER_LVL));
                        if (Math.random() < Math.min(LOOT_REAGENT_CHANCE_MAX, LOOT_REAGENT_MYTHIC_BASE + mythicBonus)) {
                            const ex = items.find(i => i.itemId === 'reagent_mythic');
                            if (ex) ex.quantity++; else items.push({ itemId: 'reagent_mythic', quantity: 1 });
                        }
                    }
                    // Divine: level 30+
                    if (dlvlHere >= REAGENT_TIER_DIVINE_MIN) {
                        const divineBonus = Math.min(LOOT_REAGENT_CHANCE_MAX,
                            Math.max(0, (dlvlHere - REAGENT_TIER_DIVINE_MIN) * LOOT_REAGENT_CHANCE_PER_LVL));
                        if (Math.random() < Math.min(LOOT_REAGENT_CHANCE_MAX, LOOT_REAGENT_DIVINE_BASE + divineBonus)) {
                            const ex = items.find(i => i.itemId === 'reagent_divine');
                            if (ex) ex.quantity++; else items.push({ itemId: 'reagent_divine', quantity: 1 });
                        }
                    }
                }
            }

            // Bosses always drop extra rare reagents on top of the rolled loot.
            if (isBoss) {
                const n = randomInt(REAGENT_BOSS_RARE_MIN, REAGENT_BOSS_RARE_MAX);
                if (n > 0) {
                    const existing = items.find(i => i.itemId === 'reagent_rare');
                    if (existing) existing.quantity += n;
                    else items.push({ itemId: 'reagent_rare', quantity: n });
                }
                // High-tier reagent guaranteed drops — one each of every qualifying tier.
                const highTierGuarantees = [
                    { minDlvl: REAGENT_TIER_EPIC_MIN,      itemId: 'reagent_epic' },
                    { minDlvl: REAGENT_TIER_LEGENDARY_MIN, itemId: 'reagent_legendary' },
                    { minDlvl: REAGENT_TIER_MYTHIC_MIN,    itemId: 'reagent_mythic' },
                    { minDlvl: REAGENT_TIER_DIVINE_MIN,    itemId: 'reagent_divine' },
                ];
                const bossAmt = isMegaBoss ? REAGENT_MEGABOSS_HIGH_TIER_AMOUNT : REAGENT_BOSS_HIGH_TIER_AMOUNT;
                for (const { minDlvl, itemId } of highTierGuarantees) {
                    if (this.dungeonLevel >= minDlvl) {
                        const ex = items.find(i => i.itemId === itemId);
                        if (ex) ex.quantity += bossAmt;
                        else items.push({ itemId, quantity: bossAmt });
                    }
                }
            }
        }

        // Statue event: 10× gold, guaranteed legendary item
        if (this.isStatueEvent) {
            totalGold = Math.floor(totalGold * STATUE_GOLD_MULT);
            // Super boss drops an extra legendary roll on top
            if (hasSuperBoss) {
                const bonusLeg = this._rollLegendaryItem();
                items.push({ itemId: bonusLeg, quantity: 1 });
            }
            // Always award one guaranteed legendary from the statue gauntlet
            const guaranteedLeg = this._rollLegendaryItem();
            items.push({ itemId: guaranteedLeg, quantity: 1 });
        }

        // Rogue Extra Loot (L35+): each living L35+ rogue adds rogueLevel x 2% gold (additive)
        const _extraLootRogues = this.party.filter(
            m => !m.isSummoned && m.health > 0 && m.classId === 'rogue' && m.level >= ROGUE_EXTRA_LOOT_UNLOCK_LEVEL
        );
        if (_extraLootRogues.length > 0 && totalGold > 0) {
            const _extraPct  = _extraLootRogues.reduce((s, m) => s + m.level * ROGUE_EXTRA_LOOT_GOLD_PCT_PER_LEVEL, 0);
            const _extraGold = Math.floor(totalGold * _extraPct / 100);
            const _rNames    = _extraLootRogues.map(m => m.name).join(' & ');
            totalGold += _extraGold;
            this._addLog(`🪙 Extra Loot (${_rNames}): +${_extraPct}% gold bonus! (+${_extraGold})`);
        }

        this.loot = { gold: totalGold, items };

        if (totalGold > 0) this._addLog(`Found ${totalGold} gold!`);
        for (const item of items) {
            const def = getItemDef(item.itemId);
            const name = def ? def.name : item.itemId;
            if (item.quantity > 1) this._addLog(`Found ${item.quantity}x ${name}!`);
            else this._addLog(`Found ${name}!`);
        }
        if (totalGold === 0 && items.length === 0) {
            this._addLog('No loot found.');
        }
    }

    _rollLegendaryItem() {
        return LEGENDARY_ITEM_IDS[Math.floor(Math.random() * LEGENDARY_ITEM_IDS.length)];
    }

    // ────────────────────────────────────────────
    // Statue Gauntlet Wave System
    // ────────────────────────────────────────────

    /**
     * Called when all enemies are dead during a statue event.
     * Returns true if the gauntlet is done (wave > 15), false if a new wave starts.
     */
    _checkStatueEventContinue() {
        this.statueWave++;
        if (this.statueWave > STATUE_EVENT_ROUND_SUPER_BOSS) {
            // All 15 waves cleared — let _finishVictory proceed.
            return true;
        }
        this._onStatueWaveStart(this.statueWave);
        return false;
    }

    _onStatueWaveStart(wave) {
        const waveLabel = wave === STATUE_EVENT_ROUND_SUPER_BOSS ? 'FINAL WAVE — SUPER BOSS!'
                        : wave === STATUE_EVENT_ROUND_MEGA_BOSS  ? 'MEGA BOSS WAVE!'
                        : wave === STATUE_EVENT_ROUND_BOSS       ? 'BOSS WAVE!'
                        : `Wave ${wave} of ${STATUE_EVENT_ROUND_SUPER_BOSS}`;
        this._addLog(`\u{1F5FF} *** STATUE GAUNTLET: ${waveLabel} ***`);

        const newEnemies = this._buildStatueWaveEnemies(wave);
        for (const e of newEnemies) {
            e.activeEffects = [];
            e.stunned = false;
            this.enemies.push(e);
        }

        // Rebuild initiative to include the new arrivals.
        this._initiativeOrder = this._buildInitiativeOrder();
        this._initTurnIdx = 0;
        this._advanceThroughInitiative();
    }

    _buildStatueWaveEnemies(wave) {
        const dl = this.dungeonLevel;
        const theme = this.statueTheme;

        if (wave === STATUE_EVENT_ROUND_SUPER_BOSS) {
            return [this._createStatueSuperBoss(theme)];
        }

        // Determine tier
        const isMegaBossWave = (wave === STATUE_EVENT_ROUND_MEGA_BOSS);
        const isBossWave     = (wave === STATUE_EVENT_ROUND_BOSS);

        // Count living recruited (non-summoned) party members
        const livingCount = Math.max(1, this.party.filter(m => !m.isSummoned && m.health > 0).length);

        // Pick eligible enemy types for this theme
        const eligible = Object.entries(ENEMY_TYPES).filter(([, def]) =>
            Array.isArray(def.tags) && def.tags.includes(theme),
        ).map(([key]) => key);

        const pool = eligible.length > 0 ? eligible : Object.keys(ENEMY_TYPES);

        const result = [];
        for (let i = 0; i < livingCount; i++) {
            const type = pool[Math.floor(Math.random() * pool.length)];
            const e = new Enemy({ type, gridX: 0, gridZ: 0, level: dl });
            if (isMegaBossWave) {
                e.isMegaBoss = true;
                e.isBoss = true;
                e.bossDL = dl;
                e.health    = Math.floor(e.health * 5);
                e.maxHealth = e.health;
                e.stamina   = Math.floor(e.stamina * 5);
                e.maxStamina = e.stamina;
                e.mana      = Math.floor(e.mana * 5);
                e.maxMana   = e.mana;
                e.defense   = Math.floor(e.defense * 2);
            } else if (isBossWave) {
                e.isBoss = true;
                e.bossDL = dl;
                e.health    = Math.floor(e.health * 2);
                e.maxHealth = e.health;
                e.stamina   = Math.floor(e.stamina * 2);
                e.maxStamina = e.stamina;
                e.mana      = Math.floor(e.mana * 2);
                e.maxMana   = e.mana;
            }
            result.push(e);
        }
        return result;
    }

    _createStatueSuperBoss(theme) {
        const dl = this.dungeonLevel;
        const eligible = Object.entries(ENEMY_TYPES).filter(([, def]) =>
            Array.isArray(def.tags) && def.tags.includes(theme),
        ).map(([key]) => key);
        const pool = eligible.length > 0 ? eligible : Object.keys(ENEMY_TYPES);
        const type = pool[Math.floor(Math.random() * pool.length)];

        const e = new Enemy({ type, gridX: 0, gridZ: 0, level: dl });
        // Apply super boss multipliers
        e.health    = Math.floor(e.health    * SUPER_BOSS_HP_MULT);
        e.maxHealth = e.health;
        e.stamina   = Math.floor(e.stamina   * SUPER_BOSS_HP_MULT);
        e.maxStamina = e.stamina;
        e.mana      = Math.floor(e.mana      * SUPER_BOSS_HP_MULT);
        e.maxMana   = e.mana;
        e.defense   = Math.floor(e.defense   + dl * SUPER_BOSS_DEFENSE_PER_DL);
        e.isSuperBoss = true;
        e.isMegaBoss  = true;
        e.isBoss      = true;
        e.bossDL      = dl;

        // Pick a name from SUPERBOSS_NAMES
        const nameList = SUPERBOSS_NAMES[type];
        const baseName = nameList
            ? nameList[Math.floor(Math.random() * nameList.length)]
            : `The ${type.charAt(0).toUpperCase() + type.slice(1)} Ascendant`;
        e.name = `\u{1F7E3} ${baseName}`;

        return e;
    }

    // ────────────────────────────────────────────
    // Helpers
    // ────────────────────────────────────────────

    _rollPlayerMeleeDamage(m) {
        let base = randomInt(MELEE_DAMAGE_MIN, MELEE_DAMAGE_MAX);
        base += m.getWeaponBonus('melee');
        base += m.getClassDamageBonus('melee');
        base += this._getPartyMemberDamageMod(m);
        // Barbarian rage grants +level to melee damage
        if (m.classId === 'barbarian' && m.isRaging) base += (m.level || 1);
        // Barbarian L20 Blood Rage: wound multiplier — only when no temp HP buffer
        if (m.classId === 'barbarian' && m.isRaging && m.level >= BARBARIAN_BLOOD_RAGE_UNLOCK_LEVEL
            && !(m.tempHp > 0)) {
            const hpRatio = m.health / Math.max(1, m.maxHealth);
            let woundMult = 1;
            if      (hpRatio <= BARBARIAN_WOUND_THRESH_3) woundMult = BARBARIAN_WOUND_MULT_3;
            else if (hpRatio <= BARBARIAN_WOUND_THRESH_2) woundMult = BARBARIAN_WOUND_MULT_2;
            else if (hpRatio <= BARBARIAN_WOUND_THRESH_1) woundMult = BARBARIAN_WOUND_MULT_1;
            if (woundMult > 1) base = Math.floor(base * woundMult);
        }
        return Math.max(1, base);
    }

    /**
     * Sum any active damageBonus effects on a party member (e.g. ice_chill debuff,
     * elixir_wrath). Returns the total modifier to add to the raw damage roll.
     */
    _getPartyMemberDamageMod(m) {
        if (!Array.isArray(m.activeEffects)) return 0;
        let mod = 0;
        for (const x of m.activeEffects) {
            if (typeof x.damageBonus === 'number') mod += x.damageBonus;
        }
        return mod;
    }

    /**
     * Returns true if any living non-summoned party member has an active
     * fountain_summon buff.  Used to gate summon stat bonuses.
     */
    _hasSummonBuff() {
        const now = Date.now();
        for (const m of this.party) {
            if (m.isSummoned || m.health <= 0) continue;
            if (!Array.isArray(m.activeEffects)) continue;
            if (m.activeEffects.some(e => e && e.type === 'fountain_summon'
                    && typeof e.expiresAt === 'number' && e.expiresAt > now)) {
                return true;
            }
        }
        return false;
    }

    /**
     * Like _damageEnemy but pre-multiplied by the active summon damage bonus.
     * Used by _takeSummonTurn so fountain_summon buffs apply to outgoing damage.
     * halfDefense = true: enemy.defense is halved for this hit only (divine soul).
     */
    _damageSummonEnemy(enemy, amount, ignoreDefense = false, halfDefense = false, options = {}) {
        const mult = this._hasSummonBuff() ? 1.2 : 1.0;
        const isMagic = options.isMagic === true;
        const isRanged = options.isRanged === true;
        if (options.psychic && this._enemyHasImmunity(enemy, 'psychic')) {
            this._addLog(`\u{1F49C} ${this._eName(enemy)} is immune to psychic effects!`);
            return 0;
        }
        if (halfDefense && !ignoreDefense) {
            const origDef = enemy.defense;
            enemy.defense = Math.floor((enemy.defense || 0) / 2);
            const result = this._damageEnemy(enemy, Math.round(amount * mult), false, isMagic, 0, isRanged, options);
            enemy.defense = origDef;
            return result;
        }
        return this._damageEnemy(enemy, Math.round(amount * mult), ignoreDefense, isMagic, 0, isRanged, options);
    }

    /**
     * Flat defense bonus to add to an active summon's innate defense when the
     * fountain_summon buff is active.  Returns 20% of summonStats.defense.
     */
    _getSummonDefenseBonus(target) {
        if (!target.isSummoned || !this._hasSummonBuff()) return 0;
        return Math.floor(((target.summonStats && target.summonStats.defense) || 0) * 0.2);
    }

    _skipDead() {
        while (
            this.currentMemberIndex < this.party.length &&
            this.party[this.currentMemberIndex].health <= 0
        ) {
            this.currentMemberIndex++;
        }
    }

    _pruneDeadSummons() {
        if (!Array.isArray(this.party)) return;
        for (let i = this.party.length - 1; i >= 0; i--) {
            const m = this.party[i];
            if (!m || !m.isSummoned || m.health > 0) continue;
            const isGaseousVampire = m.summonType === 'vampire'
                && m.summonStats
                && m.summonStats.gaseousForm;
            if (isGaseousVampire) continue;
            // Beast companions persist after death for gold revival
            if (m.isPersistent && m.summonStats && m.summonStats.isBeastCompanion) continue;
            // Slime split: generation-0 slimes spawn a mini at 50% HP on death
            if (SLIME_PRESETS[m.summonType]
                && m.summonStats
                && !m.summonStats.isMiniSlime) {
                const miniHP = Math.max(1, Math.floor(m.maxHealth * 0.5));
                const miniNum = this.party.filter(p => p.isSummoned && p.summonType === m.summonType && p.summonerId === m.summonerId).length;
                const mini = new PartyMember({
                    name: `${m.name.replace(/ #\d+$/, '')} #${miniNum + 1} (Mini)`,
                    classId: 'summoned', speciesId: 'human',
                    level: m.level,
                    maxHealth: miniHP, maxStamina: 0, maxMana: 0,
                    portraitSeed: Math.floor(Math.random() * 100000),
                    isSummoned: true, summonType: m.summonType, summonerId: m.summonerId,
                    canBeHealed: true, row: 'front',
                    summonStats: {
                        ...m.summonStats,
                        isMiniSlime: true,
                    },
                });
                mini.health = miniHP;
                this.party.push(mini);
                this._addLog(`\u{1FAA1} ${m.name} splits into ${mini.name}!`);
            }
            this.party.splice(i, 1);
        }
    }

    _eName(enemy) {
        // Boss enemies have a custom .name set on spawn (includes crown emoji).
        if (enemy.name) return enemy.name;
        const base = (ENEMY_TYPES[enemy.type] || { name: 'Enemy' }).name;
        return enemy.level && enemy.level > 1 ? `${base} L${enemy.level}` : base;
    }

    /**
     * Warrior L20 Stun Resistance.
     * Rolls resistance for the target; if resisted, logs a message and returns false.
     * If not resisted, sets target.stunned = true and returns true.
     * Pass `skipResist: true` to bypass resistance (e.g. raging barbarian's OWN stun immunity
     * is handled separately; this only applies stun resist for warriors).
     */
    /**
     * Attempt to stun an ENEMY. Checks mega-boss / boss resist before setting
     * `enemy.stunned`. Returns true if the stun landed, false if resisted.
     * All player-inflicted stuns must go through this gate.
     */
    _tryStunEnemy(enemy) {
        if (!enemy || enemy.health <= 0) return false;
        // Undead and incorporeal are immune to stun from ALL sources
        if (this._enemyHasImmunity(enemy, 'stun')) {
            this._addLog(`🛡️ ${this._eName(enemy)} is immune to stun!`);
            return false;
        }
        if (enemy.isSuperBoss) {
            this._addLog(`\u{1F7E3} ${this._eName(enemy)} cannot be stunned!`);
            return false;
        }
        if (enemy.isMegaBoss) {
            this._addLog(`\u{1F451} ${this._eName(enemy)} is immune to stun!`);
            return false;
        }
        if (enemy.isBoss) {
            this._addLog(`\u{1F451} ${this._eName(enemy)} is immune to stun!`);
            return false;
        }
        // Post-stun immunity: 2 rounds after a monster loses a turn to stun
        if ((enemy.stunImmuneRounds || 0) > 0) {
            this._addLog(`⚡ ${this._eName(enemy)} cannot be stunned again so soon!`);
            return false;
        }
        // Level-based stun resist (all sources): level% chance, capped at 90%
        const levelResist = Math.min(0.90, (enemy.level || 1) * 0.01);
        if (levelResist > 0 && Math.random() < levelResist) {
            this._addLog(`⚡ ${this._eName(enemy)} resists the stun!`);
            return false;
        }
        enemy.stunned = true;
        return true;
    }

    /**
     * Attempt to HOLD an enemy (treant roots, fae binding, physical restraint).
     * Only incorporeal enemies are immune — undead, constructs, and elementals
     * all have physical form and CAN be held. Bosses resist holds.
     */
    _tryHoldEnemy(enemy) {
        if (!enemy || enemy.health <= 0) return false;
        const def = ENEMY_TYPES[enemy.type] || {};
        const tags = Array.isArray(def.tags) ? def.tags : [];
        const immune = Array.isArray(def.immune) ? def.immune : [];
        if (tags.includes('incorporeal') || tags.includes('slime') || immune.includes('hold')) {
            this._addLog(`🌿 ${this._eName(enemy)} cannot be held!`);
            return false;
        }
        if (enemy.isSuperBoss) {
            this._addLog(`\u{1F7E3} ${this._eName(enemy)} cannot be held!`);
            return false;
        }
        if (enemy.isMegaBoss || enemy.isBoss) {
            this._addLog(`\u{1F451} ${this._eName(enemy)} is too powerful to be held!`);
            return false;
        }
        if ((enemy.stunImmuneRounds || 0) > 0) {
            this._addLog(`${this._eName(enemy)} cannot be held again so soon!`);
            return false;
        }
        const levelResist = Math.min(0.90, (enemy.level || 1) * 0.01);
        if (levelResist > 0 && Math.random() < levelResist) {
            this._addLog(`${this._eName(enemy)} breaks free — hold resisted!`);
            return false;
        }
        enemy.stunned = true;
        return true;
    }

    /**
     * Attempt to PARALYZE an enemy (ghoul touch, etc.).
     * Paralysis is a nerve/flesh attack — undead, constructs, elementals, and
     * incorporeal enemies are all immune (same set as stuns).
     */
    _tryParalyzeEnemy(enemy) {
        if (!enemy || enemy.health <= 0) return false;
        const def = ENEMY_TYPES[enemy.type] || {};
        const tags = Array.isArray(def.tags) ? def.tags : [];
        const immune = Array.isArray(def.immune) ? def.immune : [];
        if (tags.some(t => ['undead', 'construct', 'elemental', 'incorporeal', 'plant', 'slime'].includes(t)) || immune.includes('paralyze')) {
            this._addLog(`🛡️ ${this._eName(enemy)} is immune to paralysis!`);
            return false;
        }
        if (enemy.isSuperBoss) {
            this._addLog(`\u{1F7E3} ${this._eName(enemy)} cannot be paralyzed!`);
            return false;
        }
        if (enemy.isMegaBoss || enemy.isBoss) {
            this._addLog(`\u{1F451} ${this._eName(enemy)} cannot be paralyzed!`);
            return false;
        }
        if ((enemy.stunImmuneRounds || 0) > 0) {
            this._addLog(`${this._eName(enemy)} cannot be paralyzed again so soon!`);
            return false;
        }
        const levelResist = Math.min(0.90, (enemy.level || 1) * 0.01);
        if (levelResist > 0 && Math.random() < levelResist) {
            this._addLog(`${this._eName(enemy)} resists the paralysis!`);
            return false;
        }
        enemy.stunned = true;
        return true;
    }

    _tryApplyStun(target) {
        if (!target || target.health <= 0) return false;
        // Lich form is immune to stun
        if (target.isLichForm) {
            this._addLog(`💀 ${target.name}'s lich form shrugs off the stun!`);
            return false;
        }
        if (!target.isSummoned && target.classId === 'warlock' && target.abyssFormActive) {
            this._addLog(`\u{1F9FF} ${target.name}'s abyss form cannot be stunned!`);
            return false;
        }
        // Necromancer undead summons are immune to stun
        if (target.isSummoned && (UNDEAD_TIERS.some(ut => ut.id === target.summonType) || target.summonType === 'demi_lich' || target.summonType === 'corpse_horror')) {
            this._addLog(`💀 ${target.name} is undead — immune to stun!`);
            return false;
        }
        // Golems with 'stun' in their summonStats.immune array are immune
        if (target.isSummoned && Array.isArray(target.summonStats?.immune)
            && target.summonStats.immune.includes('stun')) {
            this._addLog(`${this._isSlimePartyMember(target) ? '🧪' : '⚙️'} ${target.name} is immune to stun!`);
            return false;
        }
        // Plant summons (treants, shambling mounds) are immune to stun
        if (target.isSummoned && ['treant', 'shambling_mound'].includes(target.summonStats?.beastKind)) {
            this._addLog(`\u{1F333} ${target.name} is rooted to the earth — immune to stun!`);
            return false;
        }
        // Bears have stun resistance equal to summoner level%
        if (target.isSummoned && target.summonStats?.beastKind === 'bear'
            && (target.summonStats?.stunResistChance ?? 0) > 0
            && Math.random() < target.summonStats.stunResistChance) {
            this._addLog(`\u{1F43B} ${target.name} shrugs off the stun! (${Math.round(target.summonStats.stunResistChance * 100)}% resist)`);
            return false;
        }
        const resistChance = (typeof target.getStunResistChance === 'function')
            ? target.getStunResistChance()
            : 0;
        if (resistChance > 0 && Math.random() < resistChance) {
            this._addLog(`⛏️ ${target.name} shrugs off the stun! (${Math.round(resistChance * 100)}% resist)`);
            return false;
        }
        target.stunned = true;
        return true;
    }

    // ════════════════════════════════════════════════════════════════════════════
    // Warlock abilities
    // ════════════════════════════════════════════════════════════════════════════

    warlockEvilEye(targetEnemy) {
        const m = this.currentMember;
        if (!m || m.health <= 0 || m.classId !== 'warlock') return;
        if (!targetEnemy || targetEnemy.health <= 0) return;
        if (m.warlockEvilEyeRound === this.turnNumber) {
            this._addLog(`\u{1F441} ${m.name} has already used Evil Eye this round.`);
            return;
        }
        const penalty = Math.max(1, Math.floor((m.level || 1) / WARLOCK_HEX_PENALTY_DIVISOR));
        const rounds = Math.max(1, Math.floor((m.level || 1) / WARLOCK_HEX_DURATION_DIVISOR));
        targetEnemy.activeEffects = (targetEnemy.activeEffects || []).filter(fx => !(fx && fx.type === 'warlock_hex' && fx.casterId === m.id));
        targetEnemy.activeEffects.push({
            type: 'warlock_hex',
            casterId: m.id,
            damageBonus: -penalty,
            rangedBonus: -penalty,
            magicBonus: -penalty,
            defenseBonus: -penalty,
            rounds,
        });
        m.warlockEvilEyeRound = this.turnNumber;
        this._addLog(`\u{1F9FF} ${m.name} fixes the Evil Eye on ${this._eName(targetEnemy)}! (-${penalty} attack/defense, ${rounds} rd${rounds === 1 ? '' : 's'})`);
        this._notify();
    }

    warlockBolt(targetEnemy) {
        const m = this.currentMember;
        if (!m || m.health <= 0 || m.classId !== 'warlock') return;
        if (!targetEnemy || targetEnemy.health <= 0) return;
        if (m.abyssFormActive) {
            this._addLog(`${m.name}'s abyss form cannot cast Eldritch Bolt.`);
            return;
        }
        const manaCost = this.getMagicManaCost(m);
        const exhausted = m.mana < manaCost;
        m.mana = Math.max(0, m.mana - manaCost);
        let raw = randomInt(MAGIC_DAMAGE_MIN, MAGIC_DAMAGE_MAX);
        raw += m.getWeaponBonus?.('magic') || 0;
        raw += m.getClassDamageBonus?.('magic') || 0;
        raw += this._getPartyMemberDamageMod(m);
        raw = Math.max(1, Math.round(raw * (1 + (m.level || 1) / 100)));
        raw = this._applyOutgoingDamageBonuses(m, raw, 'magic');
        if (exhausted) raw = Math.max(1, Math.floor(raw / 2));
        const dealt = this._damageEnemy(targetEnemy, raw, true, true);
        this._addLog(`\u{1F9FF} ${m.name} hurls an armor-bypassing eldritch bolt at ${this._eName(targetEnemy)} for ${dealt}!${exhausted ? ' (exhausted!)' : ''}`);
        if (targetEnemy.health <= 0 && !targetEnemy._deathHandled) {
            targetEnemy._deathHandled = true;
            this._onEnemyDeath(targetEnemy);
        }
        this._advancePlayerTurn();
    }

    warlockToggleCauldron(demonId = null) {
        const m = this.currentMember;
        if (!m || m.health <= 0 || m.classId !== 'warlock') return;
        if ((m.level || 1) < WARLOCK_CAULDRON_UNLOCK_LEVEL) {
            this._addLog(`${m.name} must be level ${WARLOCK_CAULDRON_UNLOCK_LEVEL} to tend a cauldron.`);
            return;
        }
        const unlocked = getWarlockUnlockedDemons(m.level || 1);
        if (demonId && unlocked.some(d => d.id === demonId)) m.warlockSelectedDemon = demonId;
        const selectedId = unlocked.some(d => d.id === m.warlockSelectedDemon)
            ? m.warlockSelectedDemon
            : (unlocked[0]?.id || 'imp');
        const selected = WARLOCK_DEMON_PRESETS[selectedId] || WARLOCK_DEMON_PRESETS.imp;
        m.warlockSelectedDemon = selected.id;
        if (m.warlockCauldronOpen) {
            m.warlockCauldronOpen = false;
            this._addLog(`\u{1F9EA} ${m.name} banks the cauldron fire. Demon summoning pauses.`);
            this._notify();
            return;
        }
        if (m.health <= WARLOCK_CAULDRON_HP_COST) {
            this._addLog(`${m.name} needs more than ${WARLOCK_CAULDRON_HP_COST} HP to open the cauldron.`);
            return;
        }
        m.health = Math.max(1, m.health - WARLOCK_CAULDRON_HP_COST);
        m.warlockCauldronOpen = true;
        this._addLog(`\u{1F9EA} ${m.name} tends the Cauldron of Summoning (-${WARLOCK_CAULDRON_HP_COST} HP). Bound demon: ${selected.name}.`);
        this._notify();
    }

    warlockToggleAwaken() {
        const m = this.currentMember;
        if (!m || m.health <= 0 || m.classId !== 'warlock') return;
        if ((m.level || 1) < WARLOCK_L35_UNLOCK_LEVEL) {
            this._addLog(`${m.name} must be level ${WARLOCK_L35_UNLOCK_LEVEL} to use Awaken.`);
            return;
        }
        m.warlockAwakenActive = !m.warlockAwakenActive;
        this._addLog(m.warlockAwakenActive
            ? `🕳️ ${m.name} opens the deeper gate. Awaken is active.`
            : `🕳️ ${m.name} seals the deeper gate. Awaken is inactive.`);
        this._notify();
    }

    _warlockSummonDemon(warlock, demonId = null) {
        if (!warlock || warlock.health <= 0 || warlock.classId !== 'warlock') return null;
        const unlocked = getWarlockUnlockedDemons(warlock.level || 1);
        const requestedId = unlocked.some(d => d.id === demonId)
            ? demonId
            : unlocked.some(d => d.id === warlock.warlockSelectedDemon)
                ? warlock.warlockSelectedDemon
                : (unlocked[0]?.id || 'imp');
        const preset = WARLOCK_DEMON_PRESETS[requestedId] || WARLOCK_DEMON_PRESETS.imp;
        const magicSkill = this._getWarlockMagicSkill(warlock);
        const stats = rollWarlockDemonStats(warlock.level || 1, warlock.maxHealth, magicSkill, preset.id);
        if (warlock.abyssFormActive && warlock.abyssFormHpBonus > 0) {
            const baseWarlockMax = Math.max(1, warlock.maxHealth - warlock.abyssFormHpBonus);
            const normalStats = rollWarlockDemonStats(warlock.level || 1, baseWarlockMax, magicSkill, preset.id);
            stats.abyssFormHpBonus = Math.max(0, stats.maxHealth - normalStats.maxHealth);
        }
        const num = this.party.filter(p => p.isSummoned && p.summonerId === warlock.id && p.summonType === preset.id).length + 1;
        const demon = new PartyMember({
            name: `${warlock.name}'s ${preset.name} #${num}`,
            classId: 'summoned',
            speciesId: 'human',
            level: warlock.level || 1,
            maxHealth: stats.maxHealth,
            maxStamina: 0,
            maxMana: 0,
            portraitSeed: Math.floor(Math.random() * 100000),
            isSummoned: true,
            summonType: preset.id,
            summonerId: warlock.id,
            canBeHealed: true,
            row: 'back',
            summonStats: stats,
        });
        this.party.push(demon);
        this._registerNewSummon(demon);
        this._addLog(`\u{1F608} ${preset.name} claws into reality for ${warlock.name}! (HP ${demon.maxHealth}, atk ${stats.meleeMin}-${stats.meleeMax}, def ${stats.defense})`);
        if (this._initiativeOrder.length > 0) {
            const baseInit = this._initiativeOrder[this._initTurnIdx]?.init ?? 0;
            if (!this._initiativeOrder.some(slot => slot.ref === demon))
                this._initiativeOrder.splice(this._initTurnIdx + 1, 0, { kind: 'party', ref: demon, init: baseInit, skipThisRound: false });
        }
        this._queueWarlockAwakenSummon(warlock, demon);
        return demon;
    }

    warlockWastingCurse(targetEnemy, opts = {}) {
        const m = opts.caster || this.currentMember;
        if (!m || m.health <= 0 || m.classId !== 'warlock') return false;
        if ((m.level || 1) < WARLOCK_CURSE_UNLOCK_LEVEL) {
            this._addLog(`${m.name} must be level ${WARLOCK_CURSE_UNLOCK_LEVEL} to cast Wasting Curse.`);
            return false;
        }
        if (!targetEnemy || targetEnemy.health <= 0) return false;
        if (!opts.free && m.mana < WARLOCK_CURSE_MANA_COST) {
            this._addLog(`${m.name} needs ${WARLOCK_CURSE_MANA_COST} MP for Wasting Curse.`);
            return false;
        }
        if (this._enemyHasImmunity(targetEnemy, 'magic') || (ENEMY_TYPES[targetEnemy.type] || {}).fullMagicImmune) {
            if (!opts.free) m.mana = Math.max(0, m.mana - WARLOCK_CURSE_MANA_COST);
            this._addLog(`\u{1F9FF} ${this._eName(targetEnemy)} is immune to the Wasting Curse!`);
            if (!opts.free) this._advancePlayerTurn();
            return false;
        }
        const existing = (targetEnemy.activeEffects || []).find(fx => fx && fx.type === 'wasting_curse');
        if (existing && (existing.rounds || 0) > 0) {
            this._addLog(`${this._eName(targetEnemy)} is already wasting away.`);
            this._notify();
            return false;
        }
        if (!opts.free) m.mana -= WARLOCK_CURSE_MANA_COST;
        const rounds = Math.min(WARLOCK_CURSE_MAX_ROUNDS,
            WARLOCK_CURSE_BASE_ROUNDS + Math.floor((m.level || 1) / WARLOCK_CURSE_LEVEL_DIVISOR));
        targetEnemy.activeEffects = targetEnemy.activeEffects || [];
        targetEnemy.activeEffects.push({
            type: 'wasting_curse',
            casterId: m.id,
            pct: WARLOCK_CURSE_BASE_PCT,
            rounds,
            maxRounds: rounds,
        });
        this._addLog(`\u{1F9FF} ${m.name} lays Wasting Curse on ${this._eName(targetEnemy)} (${rounds} rds).`);
        if (!opts.free) this._advancePlayerTurn();
        return true;
    }

    warlockCharmDemon(targetEnemy) {
        const m = this.currentMember;
        if (!m || m.health <= 0 || m.classId !== 'warlock') return;
        if ((m.level || 1) < WARLOCK_CHARM_UNLOCK_LEVEL) return;
        if (m.abyssFormActive) {
            this._addLog(`${m.name}'s abyss form is too mindless for demon charm.`);
            return;
        }
        if (!targetEnemy || targetEnemy.health <= 0) return;
        if (m.mana < WARLOCK_CHARM_MANA_COST) {
            this._addLog(`${m.name} needs ${WARLOCK_CHARM_MANA_COST} MP for Charm Demon.`);
            return;
        }
        const eName = this._eName(targetEnemy);
        if (!this._isDemonEnemy(targetEnemy)) {
            m.mana -= WARLOCK_CHARM_MANA_COST;
            this._addLog(`\u{1F9FF} ${m.name} tries to charm ${eName}, but it is not a demon.`);
            this._advancePlayerTurn();
            return;
        }
        if (targetEnemy.isBoss || targetEnemy.isMegaBoss || targetEnemy.isSuperBoss) {
            m.mana -= WARLOCK_CHARM_MANA_COST;
            this._addLog(`\u{1F9FF} ${eName} is too powerful to charm.`);
            this._advancePlayerTurn();
            return;
        }
        m.mana -= WARLOCK_CHARM_MANA_COST;
        const charmChance = Math.min(0.95, BARD_CHARM_BASE_CHANCE + BARD_CHARM_CHANCE_PER_2_LV * (m.level || 1));
        const duration = Math.max(1, Math.floor((m.level || 1) / BARD_CHARM_DURATION_DIVISOR));
        if (Math.random() < charmChance) {
            this._prepareCharmedAlly(targetEnemy);
            targetEnemy.charmedRounds = duration;
            targetEnemy.charmerId = m.id;
            this._addLog(`\u{1F9FF} ${m.name} binds ${eName}'s infernal will — charmed for ${duration} rounds!`);
        } else {
            this._addLog(`\u{1F9FF} ${eName} resists ${m.name}'s charm! (${Math.round(charmChance * 100)}% chance)`);
        }
        this._advancePlayerTurn();
    }

    warlockToggleAbyssForm() {
        const m = this.currentMember;
        if (!m || m.health <= 0 || m.classId !== 'warlock' || (m.level || 1) < WARLOCK_ABYSS_FORM_UNLOCK_LEVEL) return;
        if (m.abyssFormActive) {
            this._exitAbyssForm(m);
            this._addLog(`\u{1F9FF} ${m.name} releases the abyssal shape.`);
            this._notify();
            return;
        }
        if (m.abyssFormUsed) {
            this._addLog(`${m.name} has already taken abyss form this combat.`);
            return;
        }
        m.abyssFormUsed = true;
        m.abyssFormActive = true;
        m.abyssFormOrigRow = m.row;
        m.row = 'back';
        m.abyssFormHpBonus = m.maxHealth;
        m.maxHealth += m.abyssFormHpBonus;
        m.health += m.abyssFormHpBonus;
        m.abyssFormDefBonus = m.level || 1;
        m.eldritchSignReady = true;
        const empoweredDemons = this._applyAbyssFormToWarlockDemons(m);
        this._addLog(`\u{1F9FF} ${m.name} becomes a tentacled horror of the abyss! HP doubles, +${m.abyssFormDefBonus} defense.${empoweredDemons ? ` ${empoweredDemons} bound demon${empoweredDemons === 1 ? '' : 's'} also swell with abyssal vitality.` : ''}`);
        this._notify();
    }

    _exitAbyssForm(m) {
        if (!m || !m.abyssFormActive) return;
        this._removeAbyssFormFromWarlockDemons(m);
        if (m.abyssFormHpBonus > 0) {
            m.maxHealth = Math.max(1, m.maxHealth - m.abyssFormHpBonus);
            m.health = Math.min(m.health, m.maxHealth);
        }
        if (m.abyssFormOrigRow) m.row = m.abyssFormOrigRow;
        m.abyssFormActive = false;
        m.abyssFormHpBonus = 0;
        m.abyssFormDefBonus = 0;
        m.abyssFormOrigRow = null;
    }

    _applyAbyssFormToWarlockDemons(warlock) {
        if (!warlock || !warlock.abyssFormActive) return 0;
        let count = 0;
        for (const demon of this.party) {
            if (!demon || demon.health <= 0 || !demon.isSummoned || demon.summonerId !== warlock.id) continue;
            if (!this._isWarlockBoundSummon(demon)) continue;
            const stats = demon.summonStats = demon.summonStats || {};
            if (stats.abyssFormHpBonus > 0) continue;
            const bonus = Math.max(1, demon.maxHealth || 1);
            stats.abyssFormHpBonus = bonus;
            demon.maxHealth += bonus;
            demon.health += bonus;
            count++;
        }
        return count;
    }

    _removeAbyssFormFromWarlockDemons(warlock) {
        if (!warlock) return 0;
        let count = 0;
        for (const demon of this.party) {
            if (!demon || !demon.isSummoned || demon.summonerId !== warlock.id) continue;
            if (!this._isWarlockBoundSummon(demon)) continue;
            const stats = demon.summonStats || {};
            const bonus = Math.max(0, stats.abyssFormHpBonus || 0);
            if (!bonus) continue;
            demon.maxHealth = Math.max(1, demon.maxHealth - bonus);
            demon.health = Math.min(demon.health, demon.maxHealth);
            stats.abyssFormHpBonus = 0;
            count++;
        }
        return count;
    }

    warlockTentacleAttack() {
        const m = this.currentMember;
        if (!m || m.health <= 0 || m.classId !== 'warlock' || !m.abyssFormActive) return;
        const count = Math.max(1, Math.floor((m.level || 1) / 3));
        const dmgMult = 1 + ((m.level || 1) * 3) / 100;
        const level = Math.max(1, m.level || 1);
        const hookedActive = level >= WARLOCK_L35_UNLOCK_LEVEL;
        const critChance = Math.min(1, level * WARLOCK_HOOKED_TENTACLE_CRIT_PER_LEVEL);
        const critBonusMult = 1 + WARLOCK_HOOKED_TENTACLE_CRIT_BONUS_BASE + (level * WARLOCK_HOOKED_TENTACLE_CRIT_BONUS_PER_LEVEL);
        const bleedChance = Math.min(1, WARLOCK_HOOKED_TENTACLE_BLEED_BASE_CHANCE + (level * WARLOCK_HOOKED_TENTACLE_BLEED_CHANCE_PER_LEVEL));
        const bleedRounds = Math.max(1, Math.floor(level / WARLOCK_HOOKED_TENTACLE_BLEED_ROUNDS_DIVISOR));

        const applyTentacleHit = (target, label = 'Tentacle hits') => {
            let dmg = randomInt(MELEE_DAMAGE_MIN, MELEE_DAMAGE_MAX) + this._getWarlockMagicSkill(m);
            dmg = Math.max(1, Math.round(dmg * dmgMult));
            let crit = false;
            if (hookedActive && Math.random() < critChance) {
                dmg = Math.max(1, Math.round(dmg * critBonusMult));
                crit = true;
            }
            dmg = this._applyOutgoingDamageBonuses(m, dmg, 'melee');
            const dealt = this._damageEnemy(target, dmg, false, false, 0, false, { contactAttacker: m });
            this._addLog(`  \u{1F9D0} ${label} ${this._eName(target)} for ${dealt}${crit ? ' (CRIT)' : ''}.`);

            if (hookedActive && dealt > 0 && target.health > 0 && Math.random() < bleedChance) {
                if (!this._enemyHasImmunity(target, 'bleed')) {
                    const bleedDmg = Math.max(1, Math.floor(dealt / 2));
                    target.activeEffects = target.activeEffects || [];
                    target.activeEffects.push({ type: 'bleed', damage: bleedDmg, rounds: bleedRounds });
                    this._addLog(`    \u{1FA78} Hooked bleed tears ${this._eName(target)} (${bleedDmg}/rd, ${bleedRounds} rds).`);
                } else {
                    this._addLog(`    \u{1FA78} ${this._eName(target)} resists the hooked bleed.`);
                }
            }

            if (target.health > 0 && Math.random() < Math.min(1, level / 100)) {
                if (this._tryStunEnemy(target)) this._addLog(`  ⚡ ${this._eName(target)} is stunned by the abyssal grip!`);
            }
            if (target.health <= 0 && !target._deathHandled) {
                target._deathHandled = true;
                this._onEnemyDeath(target);
            }
        };

        this._addLog(`\u{1F9D0} ${m.name}'s abyssal tentacles lash out (${count} attacks)!`);
        for (let i = 0; i < count; i++) {
            const targets = this.aliveHostileEnemies;
            if (!targets.length) break;
            const t = targets[Math.floor(Math.random() * targets.length)];
            applyTentacleHit(t, 'Tentacle hits');
        }

        // Quickstep Song haste: one extra round of tentacle attacks
        if (m.quickstepHasteActive && this.aliveHostileEnemies.length > 0) {
            const _qstCount = Math.max(1, Math.floor((m.level || 1) / 3));
            this._addLog(`⚡ ${m.name}'s Quickstep haste — bonus tentacle strike!`);
            for (let _qi = 0; _qi < _qstCount && this.aliveHostileEnemies.length > 0; _qi++) {
                const _qstTgts = this.aliveHostileEnemies;
                const _qstT = _qstTgts[Math.floor(Math.random() * _qstTgts.length)];
                applyTentacleHit(_qstT, 'Haste tentacle hits');
            }
        }

        this._advancePlayerTurn();
    }

    warlockEldritchSign() {
        const m = this.currentMember;
        if (!m || m.health <= 0 || m.classId !== 'warlock' || !m.abyssFormActive) return;
        if (!m.eldritchSignReady) {
            this._addLog(`The Eldritch Sign has not reformed yet.`);
            return;
        }
        const count = Math.max(1, Math.floor((m.level || 1) / WARLOCK_ELDRITCH_SIGN_TARGET_DIVISOR));
        const targets = this.aliveHostileEnemies.slice().sort(() => Math.random() - 0.5).slice(0, count);
        this._addLog(`\u{1F9FF} ${m.name} burns the Eldritch Sign into the air!`);
        for (const t of targets) this.warlockWastingCurse(t, { caster: m, free: true });
        m.eldritchSignReady = false;
        this._advancePlayerTurn();
    }

    _removeWarlockSummons(warlock) {
        if (!warlock) return;
        for (const p of this.party) {
            if (p.isSummoned && p.summonerId === warlock.id && this._isWarlockBoundSummon(p) && p.health > 0) {
                p.health = 0;
                this._addLog(`\u{1F608} ${p.name} is pulled back into the abyss as ${warlock.name} falls!`);
            }
        }
    }

    // ════════════════════════════════════════════════════════════════════════════
    // Vermin Keeper abilities
    // ════════════════════════════════════════════════════════════════════════════

    /** L1: Poison attack — single-target magic, +15% dmg, poison DoT stacks in same turn */
    vkPoisonAttack(targetEnemy) {
        const m = this.currentMember;
        if (!m || m.health <= 0 || m.classId !== 'verminkeeper') return;
        if (!targetEnemy || targetEnemy.health <= 0) return;

        const attackCount = 1 + Math.floor((m.level || 1) / VK_ATTACK_EXTRA_PER_5LV);
        const totalManaCost = VK_ATTACK_MANA_COST_BASE * attackCount;
        if (m.mana < VK_ATTACK_MANA_COST_BASE) {
            this._addLog(`${m.name} has no mana for Poison Attack (needs ${VK_ATTACK_MANA_COST_BASE} MP).`);
            return;
        }
        const eName = this._eName(targetEnemy);
        let dotDamage = 0;
        const dotRounds = attackCount;
        for (let i = 0; i < attackCount; i++) {
            if (m.mana < VK_ATTACK_MANA_COST_BASE) break;
            if (targetEnemy.health <= 0) break;
            m.mana = Math.max(0, m.mana - VK_ATTACK_MANA_COST_BASE);
            let raw = randomInt(MAGIC_DAMAGE_MIN, MAGIC_DAMAGE_MAX);
            raw += m.getWeaponBonus?.('magic') || 0;
            raw += m.getClassDamageBonus?.('magic') || 0;
            raw += this._getPartyMemberDamageMod(m);
            raw = Math.max(1, Math.round(raw * (1 + VK_POISON_DAMAGE_BONUS)));
            raw = this._applyOutgoingDamageBonuses(m, raw, 'magic');
            const dealt = this._damageEnemy(targetEnemy, raw, false, true);
            dotDamage += Math.max(1, Math.floor(dealt * VK_DOT_DAMAGE_FRAC));
            this._addLog(`\u{1F7E2} ${m.name} venom bolt hits ${eName} for ${dealt}!`);
            if (targetEnemy.health <= 0) { this._addLog(`${eName} is slain!`); break; }
        }
        if (dotDamage > 0 && targetEnemy.health > 0 && !this._enemyHasImmunity(targetEnemy, 'poison')) {
            if (!Array.isArray(targetEnemy.activeEffects)) targetEnemy.activeEffects = [];
            targetEnemy.activeEffects.push({ type: 'vk_poison', damage: dotDamage, rounds: dotRounds });
            this._addLog(`\u{1F7E2} ${eName} is poisoned! (${dotDamage}/rd × ${dotRounds} rds)`);
        }
        this._advancePlayerTurn();
    }

    /** L1: Acid attack — single-target magic, acid DoT, -1 defense debuff once per turn */
    vkAcidAttack(targetEnemy) {
        const m = this.currentMember;
        if (!m || m.health <= 0 || m.classId !== 'verminkeeper') return;
        if (!targetEnemy || targetEnemy.health <= 0) return;

        const attackCount = 1 + Math.floor((m.level || 1) / VK_ATTACK_EXTRA_PER_5LV);
        if (m.mana < VK_ATTACK_MANA_COST_BASE) {
            this._addLog(`${m.name} has no mana for Acid Attack (needs ${VK_ATTACK_MANA_COST_BASE} MP).`);
            return;
        }
        const eName = this._eName(targetEnemy);
        let dotDamage = 0;
        const dotRounds = attackCount;
        for (let i = 0; i < attackCount; i++) {
            if (m.mana < VK_ATTACK_MANA_COST_BASE) break;
            if (targetEnemy.health <= 0) break;
            m.mana = Math.max(0, m.mana - VK_ATTACK_MANA_COST_BASE);
            let raw = randomInt(MAGIC_DAMAGE_MIN, MAGIC_DAMAGE_MAX);
            raw += m.getWeaponBonus?.('magic') || 0;
            raw += m.getClassDamageBonus?.('magic') || 0;
            raw += this._getPartyMemberDamageMod(m);
            raw = this._applyOutgoingDamageBonuses(m, raw, 'magic');
            const dealt = this._damageEnemy(targetEnemy, raw, false, true);
            dotDamage += Math.max(1, Math.floor(dealt * VK_DOT_DAMAGE_FRAC));
            this._addLog(`\u{1F7E2} ${m.name} acid bolt hits ${eName} for ${dealt}!`);
            if (targetEnemy.health <= 0) { this._addLog(`${eName} is dissolved!`); break; }
        }
        if (dotDamage > 0 && targetEnemy.health > 0) {
            if (!Array.isArray(targetEnemy.activeEffects)) targetEnemy.activeEffects = [];
            targetEnemy.activeEffects.push({ type: 'vk_acid_dot', damage: dotDamage, rounds: dotRounds });
            this._addLog(`\u{1F7E2} ${eName} corrodes from acid! (${dotDamage}/rd × ${dotRounds} rds)`);
        }
        // Apply one -1 defense debuff stack (entire combat) per turn of acid attacks
        if (targetEnemy.health > 0) {
            if (!Array.isArray(targetEnemy.activeEffects)) targetEnemy.activeEffects = [];
            targetEnemy.activeEffects.push({ type: 'vk_acid_debuff', defenseBonus: VK_ACID_DEF_DEBUFF, rounds: 9999 });
            this._addLog(`\u{1F7E2} ${eName}'s defenses corrode! (-1 defense, permanent)`);
        }
        this._advancePlayerTurn();
    }

    /** L3: Summon Vermin — random type, cascade like necromancer */
    vkSummonVermin() {
        const m = this.currentMember;
        if (!m || m.health <= 0 || m.classId !== 'verminkeeper') return;
        if ((m.level || 1) < VK_SUMMON_VERMIN_UNLOCK_LEVEL) {
            this._addLog(`${m.name} must be level ${VK_SUMMON_VERMIN_UNLOCK_LEVEL} to summon vermin.`);
            return;
        }
        if (m.mana < VK_SUMMON_VERMIN_MANA_COST) {
            this._addLog(`${m.name} needs ${VK_SUMMON_VERMIN_MANA_COST} MP to summon a vermin.`);
            return;
        }
        m.mana -= VK_SUMMON_VERMIN_MANA_COST;
        const firstTypeId = VK_VERMIN_TYPES[Math.floor(Math.random() * VK_VERMIN_TYPES.length)];
        const firstPreset = VERMIN_PRESETS[firstTypeId] || VERMIN_PRESETS.spider;
        const spawnedThisAction = [];
        const _spawnOne = (pset) => {
            const stats = rollVerminStats(m.level, m.maxHealth);
            const summonNum = this.party.filter(p => p.isSummoned && p.summonType === pset.id && p.summonerId === m.id).length + 1;
            const u = new PartyMember({
                name: `${m.name}'s ${pset.name} #${summonNum}`,
                classId: 'summoned', speciesId: 'human',
                level: m.level,
                maxHealth: stats.maxHealth, maxStamina: 0, maxMana: 0,
                portraitSeed: Math.floor(Math.random() * 100000),
                isSummoned: true, summonType: pset.id, summonerId: m.id,
                canBeHealed: true, row: 'front',
                summonStats: {
                    meleeMin: stats.meleeMin, meleeMax: stats.meleeMax,
                    defense: stats.defense, keeperLevel: m.level,
                    beastKind: 'vermin',
                    incorporeal: !!pset.incorporeal,
                    immune: pset.immune ? pset.immune.slice() : [],
                },
            });
            this.party.push(u);
            this._registerNewSummon(u);
            spawnedThisAction.push(u);
            return u;
        };
        _spawnOne(firstPreset);
        this._addLog(`\u{1F577}️ ${m.name} calls forth a ${firstPreset.name}!`);
        // Cascade
        let baseChance = VK_SUMMON_CASCADE_BASE;
        const lvBonus = (m.level || 1) * VK_SUMMON_CASCADE_LEVEL_BONUS;
        while (true) {
            const chance = Math.min(1, baseChance + lvBonus);
            if (chance <= 0) break;
            if (Math.random() >= chance) break;
            const cascadeTypeId = VK_VERMIN_TYPES[Math.floor(Math.random() * VK_VERMIN_TYPES.length)];
            _spawnOne(VERMIN_PRESETS[cascadeTypeId] || VERMIN_PRESETS.spider);
            baseChance -= VK_SUMMON_CASCADE_DROP;
        }
        if (spawnedThisAction.length > 1)
            this._addLog(`\u{1F577}️ A vermin swarm answers the call! ${spawnedThisAction.length} creatures summoned!`);
        if (this._initiativeOrder.length > 0) {
            const baseInit = this._initiativeOrder[this._initTurnIdx]?.init ?? 0;
            for (let si = spawnedThisAction.length - 1; si >= 0; si--) {
                const sp = spawnedThisAction[si];
                if (!this._initiativeOrder.some(slot => slot.ref === sp))
                    this._initiativeOrder.splice(this._initTurnIdx + 1, 0, { kind: 'party', ref: sp, init: baseInit, skipThisRound: false });
            }
        }
        this._advancePlayerTurn();
    }

    /** L6: Summon Slime — random type, cascade */
    vkSummonSlime() {
        const m = this.currentMember;
        if (!m || m.health <= 0 || m.classId !== 'verminkeeper') return;
        if ((m.level || 1) < VK_SUMMON_SLIME_UNLOCK_LEVEL) {
            this._addLog(`${m.name} must be level ${VK_SUMMON_SLIME_UNLOCK_LEVEL} to summon slimes.`);
            return;
        }
        if (m.mana < VK_SUMMON_SLIME_MANA_COST) {
            this._addLog(`${m.name} needs ${VK_SUMMON_SLIME_MANA_COST} MP to summon a slime.`);
            return;
        }
        m.mana -= VK_SUMMON_SLIME_MANA_COST;
        const firstSlimeTypeId = VK_SLIME_TYPES[Math.floor(Math.random() * VK_SLIME_TYPES.length)];
        const firstSlimePreset = SLIME_PRESETS[firstSlimeTypeId] || SLIME_PRESETS.slime;
        const spawnedThisAction = [];
        const _spawnOne = (pset) => {
            const stats = rollVerminStats(m.level, m.maxHealth);
            const summonNum = this.party.filter(p => p.isSummoned && p.summonType === pset.id && p.summonerId === m.id).length + 1;
            const u = new PartyMember({
                name: `${m.name}'s ${pset.name} #${summonNum}`,
                classId: 'summoned', speciesId: 'human',
                level: m.level,
                maxHealth: stats.maxHealth, maxStamina: 0, maxMana: 0,
                portraitSeed: Math.floor(Math.random() * 100000),
                isSummoned: true, summonType: pset.id, summonerId: m.id,
                canBeHealed: true, row: 'front',
                summonStats: {
                    meleeMin: stats.meleeMin, meleeMax: stats.meleeMax,
                    defense: stats.defense, keeperLevel: m.level,
                    beastKind: 'slime',
                    immune: pset.immune ? pset.immune.slice() : [],
                },
            });
            this.party.push(u);
            this._registerNewSummon(u);
            spawnedThisAction.push(u);
            return u;
        };
        _spawnOne(firstSlimePreset);
        this._addLog(`\u{1FAA1} ${m.name} conjures a ${firstSlimePreset.name}!`);
        let baseChance = VK_SUMMON_CASCADE_BASE;
        const lvBonus = (m.level || 1) * VK_SUMMON_CASCADE_LEVEL_BONUS;
        while (true) {
            const chance = Math.min(1, baseChance + lvBonus);
            if (chance <= 0) break;
            if (Math.random() >= chance) break;
            const cascadeSlimeTypeId = VK_SLIME_TYPES[Math.floor(Math.random() * VK_SLIME_TYPES.length)];
            _spawnOne(SLIME_PRESETS[cascadeSlimeTypeId] || SLIME_PRESETS.slime);
            baseChance -= VK_SUMMON_CASCADE_DROP;
        }
        if (spawnedThisAction.length > 1)
            this._addLog(`\u{1FAA1} More ooze rises! ${spawnedThisAction.length} slimes summoned!`);
        if (this._initiativeOrder.length > 0) {
            const baseInit = this._initiativeOrder[this._initTurnIdx]?.init ?? 0;
            for (let si = spawnedThisAction.length - 1; si >= 0; si--) {
                const sp = spawnedThisAction[si];
                if (!this._initiativeOrder.some(slot => slot.ref === sp))
                    this._initiativeOrder.splice(this._initTurnIdx + 1, 0, { kind: 'party', ref: sp, init: baseInit, skipThisRound: false });
            }
        }
        this._advancePlayerTurn();
    }

    /** L20: Charm Vermin — like bard charm but restricted to vermin/slime/insect tags */
    vkCharmVermin(targetEnemy) {
        const m = this.currentMember;
        if (!m || m.health <= 0 || m.classId !== 'verminkeeper') return;
        if ((m.level || 1) < VK_CHARM_VERMIN_UNLOCK_LEVEL) {
            this._addLog(`${m.name} must be level ${VK_CHARM_VERMIN_UNLOCK_LEVEL} to use Charm Vermin.`);
            return;
        }
        if (m.mana < VK_CHARM_VERMIN_MANA_COST) {
            this._addLog(`${m.name} needs ${VK_CHARM_VERMIN_MANA_COST} MP for Charm Vermin.`);
            return;
        }
        if (!targetEnemy || targetEnemy.health <= 0) return;
        const eName = this._eName(targetEnemy);
        const tDef  = ENEMY_TYPES[targetEnemy.type] || {};
        const tTags = tDef.tags || [];
        const hasVerminTag = VK_CHARM_VERMIN_TAGS.some(tag => tTags.includes(tag));
        if (!hasVerminTag) {
            m.mana -= VK_CHARM_VERMIN_MANA_COST;
            this._addLog(`\u{1F577}️ ${m.name} attempts to charm ${eName}… but it is not vermin, slime, or insect!`);
            this._advancePlayerTurn();
            return;
        }
        if (targetEnemy.isBoss || targetEnemy.isMegaBoss) {
            m.mana -= VK_CHARM_VERMIN_MANA_COST;
            this._addLog(`\u{1F577}️ ${m.name} attempts to charm ${eName}… but it is too powerful!`);
            this._advancePlayerTurn();
            return;
        }
        if (targetEnemy.charmedRounds > 0) {
            this._addLog(`${eName} is already charmed!`);
            return;
        }
        m.mana -= VK_CHARM_VERMIN_MANA_COST;
        const charmChance = Math.min(0.95, BARD_CHARM_BASE_CHANCE + BARD_CHARM_CHANCE_PER_2_LV * (m.level || 1));
        const duration    = Math.max(1, Math.floor((m.level || 1) / BARD_CHARM_DURATION_DIVISOR));
        if (Math.random() < charmChance) {
            this._prepareCharmedAlly(targetEnemy);
            targetEnemy.charmedRounds = duration;
            targetEnemy.charmerId     = m.id;
            this._addLog(`\u{1F577}️ ${m.name} bends the vermin to their will — ${eName} is charmed! (${duration} rounds)`);
        } else {
            this._addLog(`\u{1F577}️ ${m.name} tries to charm ${eName}… it shakes free! (${Math.round(charmChance * 100)}% chance)`);
        }
        this._advancePlayerTurn();
    }

    /** L25: Insect Plague — AoE magic, applies powerful poison DoT on all enemies */
    vkInsectPlague() {
        const m = this.currentMember;
        if (!m || m.health <= 0 || m.classId !== 'verminkeeper') return;
        if ((m.level || 1) < VK_INSECT_PLAGUE_UNLOCK_LEVEL) {
            this._addLog(`${m.name} must be level ${VK_INSECT_PLAGUE_UNLOCK_LEVEL} to use Insect Plague.`);
            return;
        }
        if (m.mana < VK_INSECT_PLAGUE_MANA_COST) {
            this._addLog(`${m.name} needs ${VK_INSECT_PLAGUE_MANA_COST} MP for Insect Plague.`);
            return;
        }
        m.mana -= VK_INSECT_PLAGUE_MANA_COST;
        const alive = this.aliveHostileEnemies.slice();
        if (alive.length === 0) {
            this._addLog('No enemies to plague!');
            this._advancePlayerTurn();
            return;
        }
        let raw = randomInt(MAGIC_DAMAGE_MIN, MAGIC_DAMAGE_MAX);
        raw += m.getWeaponBonus?.('magic') || 0;
        raw += m.getClassDamageBonus?.('magic') || 0;
        raw += this._getPartyMemberDamageMod(m);
        raw = Math.max(1, Math.round(raw * (1 + (m.level || 1) * VK_INSECT_PLAGUE_LEVEL_DMG_BONUS)));
        raw = this._applyOutgoingDamageBonuses(m, raw, 'magic');
        const dotRounds = Math.max(1, Math.floor((m.level || 1) / 4));
        this._addLog(`\u{1F41C} ${m.name} unleashes an Insect Plague on all enemies! (+${(m.level || 1) * 2}% dmg, DoT ${dotRounds} rds)`);
        for (const e of alive) {
            if (e.health <= 0) continue;
            const dealt = this._damageEnemy(e, raw, false, true);
            this._addLog(`  → ${this._eName(e)} takes ${dealt} plague damage!`);
            if (e.health > 0 && !this._enemyHasImmunity(e, 'poison')) {
                const dotDmg = Math.max(1, Math.floor(dealt * VK_INSECT_PLAGUE_DOT_FRAC));
                if (!Array.isArray(e.activeEffects)) e.activeEffects = [];
                e.activeEffects.push({ type: 'insect_plague_poison', damage: dotDmg, rounds: dotRounds });
                this._addLog(`  \u{1F41C} ${this._eName(e)} is swarmed by insects! (${dotDmg}/rd × ${dotRounds} rds)`);
            }
            if (e.health <= 0 && !e._deathHandled) { e._deathHandled = true; this._onEnemyDeath(e); }
        }
        this._advancePlayerTurn();
    }

    /** L30: Summon Vermin Swarm or Acid Swarm — creates one swarm; it grows after its own turns */
    vkSummonSwarm(swarmType) {
        const m = this.currentMember;
        if (!m || m.health <= 0 || m.classId !== 'verminkeeper') return;
        if ((m.level || 1) < VK_SWARM_UNLOCK_LEVEL) {
            this._addLog(`${m.name} must be level ${VK_SWARM_UNLOCK_LEVEL} to summon a swarm.`);
            return;
        }
        const swarmSummonType = swarmType === 'acid' ? 'acid_swarm' : 'vermin_swarm';
        const otherSwarmType  = swarmType === 'acid' ? 'vermin_swarm' : 'acid_swarm';
        // Check if the other swarm type is already active (locks out this one)
        const otherSwarmAlive = this.party.some(p => p.isSummoned && p.summonType === otherSwarmType && p.summonerId === m.id && p.health > 0);
        if (otherSwarmAlive) {
            const otherName = swarmType === 'acid' ? 'Vermin Swarm' : 'Acid Swarm';
            this._addLog(`\u{1F41C} ${m.name} already has a ${otherName} active — it must die before summoning a different swarm!`);
            return;
        }
        const existing = this.party.find(p => p.isSummoned && p.summonType === swarmSummonType && p.summonerId === m.id && p.health > 0);
        if (existing) {
            this._addLog(`\u{1F41C} ${m.name} already has a ${swarmType === 'acid' ? 'Acid Swarm' : 'Vermin Swarm'} active. It will grow automatically on its turn.`);
            return;
        }
        if (m.mana < VK_SWARM_SUMMON_MANA_COST) {
            this._addLog(`${m.name} needs ${VK_SWARM_SUMMON_MANA_COST} MP for this swarm.`);
            return;
        }
        m.mana -= VK_SWARM_SUMMON_MANA_COST;
        const preset = swarmType === 'acid' ? ACID_SWARM_PRESET : VERMIN_SWARM_PRESET;
        {
            // Summon new swarm
            const magicBonus = (m.getWeaponBonus?.('magic') || 0) + (m.getClassDamageBonus?.('magic') || 0);
            const stats = rollSwarmStats(m.level, m.maxHealth, magicBonus);
            const u = new PartyMember({
                name: `${m.name}'s ${preset.name}`,
                classId: 'summoned', speciesId: 'human',
                level: m.level,
                maxHealth: stats.maxHealth, maxStamina: 0, maxMana: 0,
                portraitSeed: Math.floor(Math.random() * 100000),
                isSummoned: true, summonType: swarmSummonType, summonerId: m.id,
                canBeHealed: false, row: 'front',
                summonStats: {
                    magicMin: stats.magicMin, magicMax: stats.magicMax,
                    defense: stats.defense, keeperLevel: m.level,
                    attackCount: 1,
                    growthUpgrades: 0,
                    maxGrowthUpgrades: Math.max(0, Math.floor((m.level || 1) / VK_SWARM_MAX_UPGRADE_DIVISOR)),
                    beastKind: swarmSummonType,
                    swarmType: swarmType,
                    incorporeal: swarmType === 'vermin',
                    immune: ['stun', 'hold', 'web', 'paralyze', 'psychic', 'all_dots'],
                },
            });
            this.party.push(u);
            this._registerNewSummon(u);
            this._addLog(`\u{1F41C} ${m.name} calls forth a ${preset.name}! It erupts from the shadows!`);
            if (this._initiativeOrder.length > 0) {
                const baseInit = this._initiativeOrder[this._initTurnIdx]?.init ?? 0;
                if (!this._initiativeOrder.some(slot => slot.ref === u))
                    this._initiativeOrder.splice(this._initTurnIdx + 1, 0, { kind: 'party', ref: u, init: baseInit, skipThisRound: false });
            }
        }
        this._advancePlayerTurn();
    }

    _autoGrowVKSwarm(swarm, keeper) {
        if (!swarm || swarm.health <= 0 || !keeper || keeper.health <= 0) return false;
        if (swarm.summonType !== 'vermin_swarm' && swarm.summonType !== 'acid_swarm') return false;
        const stats = swarm.summonStats = swarm.summonStats || {};
        const maxUpgrades = Math.max(0, Math.floor((keeper.level || 1) / VK_SWARM_MAX_UPGRADE_DIVISOR));
        const currentUpgrades = Math.max(0, stats.growthUpgrades ?? ((stats.attackCount || 1) - 1));
        stats.maxGrowthUpgrades = maxUpgrades;
        if (currentUpgrades >= maxUpgrades) return false;
        const hpGain = Math.max(1, keeper.maxHealth || swarm.maxHealth || 1);
        swarm.maxHealth += hpGain;
        swarm.health = Math.min(swarm.maxHealth, swarm.health + hpGain);
        const growthUpgrades = currentUpgrades + 1;
        stats.growthUpgrades = growthUpgrades;
        stats.attackCount = 1 + growthUpgrades;
        this._addLog(`\u{1F41C} ${swarm.name} grows after attacking! (+${hpGain} HP, ${growthUpgrades}/${maxUpgrades} upgrades, ${stats.attackCount} AoE attacks next turn)`);
        return true;
    }

    /** L30: Swarm Protect — toggle swarm to intercept attacks aimed at the keeper */
    vkSwarmProtect() {
        const m = this.currentMember;
        if (!m || m.health <= 0 || m.classId !== 'verminkeeper') return;
        if ((m.level || 1) < VK_SWARM_UNLOCK_LEVEL) {
            this._addLog(`${m.name} must be level ${VK_SWARM_UNLOCK_LEVEL} for Swarm Protect.`);
            return;
        }
        const swarm = this.party.find(p => p.isSummoned && p.summonerId === m.id && p.health > 0 && (p.summonType === 'vermin_swarm' || p.summonType === 'acid_swarm'));
        if (!swarm) {
            this._addLog(`${m.name} has no living swarm to activate Swarm Protect!`);
            return;
        }
        if (m.mana < VK_SWARM_PROTECT_MANA_COST) {
            this._addLog(`${m.name} needs ${VK_SWARM_PROTECT_MANA_COST} MP to activate Swarm Protect.`);
            return;
        }
        if (m.vkSwarmProtectActive) {
            m.vkSwarmProtectActive = false;
            this._addLog(`\u{1F41C} ${m.name}'s swarm stops protecting its master.`);
        } else {
            m.mana -= VK_SWARM_PROTECT_MANA_COST;
            m.vkSwarmProtectActive = true;
            this._addLog(`\u{1F41C} ${m.name}'s swarm coils around its master — ready to intercept attacks! (-${VK_SWARM_PROTECT_MANA_COST} MP)`);
        }
        this._notify();
    }

    /** L35: Hive Mind Control — free action mark that directs this VK's vermin/slime minions. */
    vkHiveMindControl(targetEnemy) {
        const m = this.currentMember;
        if (!m || m.health <= 0 || m.classId !== 'verminkeeper') return;
        if ((m.level || 1) < VK_L35_UNLOCK_LEVEL) {
            this._addLog(`${m.name} must be level ${VK_L35_UNLOCK_LEVEL} to use Hive Mind Control.`);
            return;
        }
        if (!targetEnemy || targetEnemy.health <= 0 || (targetEnemy.charmedRounds || 0) > 0) {
            this._addLog('No valid hostile target for Hive Mind Control.');
            return;
        }

        if (m.vkHiveMindEnemyId && m.vkHiveMindEnemyId === targetEnemy.id) {
            this._clearVKHiveMark(m, 'manual release');
            this._notify();
            return;
        }

        this._setVKHiveMark(m, targetEnemy);
        this._addLog(`🕸️ ${m.name} links minds with vermin and slimes — ${this._eName(targetEnemy)} is the Hive target! (-${VK_HIVE_MIND_UPKEEP_MANA} MP/round)`);
        this._notify();
    }

    /** Helper: get living swarms that protect a given Vermin Keeper */
    _getVKSwarmInterceptors(target) {
        if (!target || target.health <= 0 || target.isSummoned || target.classId !== 'verminkeeper') return [];
        if (!target.vkSwarmProtectActive) return [];
        return this.party.filter(p =>
            p && p.health > 0 && p.isSummoned && p.summonerId === target.id
            && (p.summonType === 'vermin_swarm' || p.summonType === 'acid_swarm')
        );
    }

    /** Called from _attackPartyMember to apply swarm attacks on their turn */
    _processVKSwarmAttack(swarm) {
        if (!swarm || swarm.health <= 0 || !swarm.isSummoned) return;
        const st = swarm.summonStats || {};
        const keeper = this.party.find(p => p.id === swarm.summonerId);
        const isVermin = swarm.summonType === 'vermin_swarm';
        const attackCount = st.attackCount || 1;
        const targets = this.aliveHostileEnemies.slice();
        if (targets.length === 0) {
            this._autoGrowVKSwarm(swarm, keeper);
            return;
        }
        const keeperLv = st.keeperLevel || 1;
        const debuffAmt = Math.floor(keeperLv / (isVermin ? VK_VSWARM_DEBUFF_DIV : VK_ASWARM_DEBUFF_DIV));
        this._addLog(`\u{1F41C} ${swarm.name} ${isVermin ? 'swarms' : 'dissolves'} all enemies with ${attackCount} AoE attack(s)!`);
        for (let atk = 0; atk < attackCount; atk++) {
            if (this.aliveHostileEnemies.length === 0) break;
            if (attackCount > 1) this._addLog(`  ⚔️ Strike ${atk + 1}:`);
            const rawBase = Math.max(1, Math.floor(randomInt(st.magicMin || 1, st.magicMax || 5) * 1.35));
            for (const e of this.aliveHostileEnemies.slice()) {
                if (e.health <= 0) continue;
                const dealt = this._damageSummonEnemy(e, rawBase);
                if (dealt > 0) this._addLog(`  → ${this._eName(e)} takes ${dealt} damage!`);
                if (isVermin) {
                    // Vermin swarm: poison DoT
                    if (dealt > 0 && !this._enemyHasImmunity(e, 'poison')) {
                        const dotDmg = Math.max(1, Math.floor(dealt * VK_VSWARM_POISON_DOT_FRAC));
                        if (!Array.isArray(e.activeEffects)) e.activeEffects = [];
                        e.activeEffects.push({ type: 'vk_swarm_poison', damage: dotDmg, rounds: VK_VSWARM_POISON_DOT_ROUNDS });
                        this._addLog(`    ☠️ Poisoned! (${dotDmg}/rd \xd7${VK_VSWARM_POISON_DOT_ROUNDS} rds)`);
                    }
                    // Unique debuff: refresh vermin swarm debuff
                    if (debuffAmt > 0) {
                        const existing = (e.activeEffects || []).find(fx => fx && fx.type === 'vk_vswarm_debuff');
                        if (existing) { existing.rounds = VK_VSWARM_DEBUFF_ROUNDS; }
                        else {
                            if (!Array.isArray(e.activeEffects)) e.activeEffects = [];
                            e.activeEffects.push({ type: 'vk_vswarm_debuff', damageBonus: -debuffAmt, rangedBonus: -debuffAmt, magicBonus: -debuffAmt, rounds: VK_VSWARM_DEBUFF_ROUNDS });
                        }
                    }
                } else {
                    // Acid swarm: acid DoT
                    if (dealt > 0) {
                        const dotDmg = Math.max(1, Math.floor(dealt * VK_ASWARM_ACID_DOT_FRAC));
                        if (!Array.isArray(e.activeEffects)) e.activeEffects = [];
                        e.activeEffects.push({ type: 'vk_swarm_acid', damage: dotDmg, rounds: VK_ASWARM_ACID_DOT_ROUNDS });
                        this._addLog(`    \u{1F7E2} Acid DoT! (${dotDmg}/rd \xd7${VK_ASWARM_ACID_DOT_ROUNDS} rds)`);
                    }
                    // Unique debuff: refresh acid swarm debuff
                    if (debuffAmt > 0) {
                        const existing = (e.activeEffects || []).find(fx => fx && fx.type === 'vk_aswarm_debuff');
                        if (existing) { existing.rounds = VK_ASWARM_DEBUFF_ROUNDS; }
                        else {
                            if (!Array.isArray(e.activeEffects)) e.activeEffects = [];
                            e.activeEffects.push({ type: 'vk_aswarm_debuff', defenseBonus: -debuffAmt, rangedBonus: -debuffAmt, magicBonus: -debuffAmt, rounds: VK_ASWARM_DEBUFF_ROUNDS });
                        }
                    }
                }
                if (e.health <= 0) this._addLog(`  ${this._eName(e)} is defeated!`);
                if (e.health <= 0 && !e._deathHandled) { e._deathHandled = true; this._onEnemyDeath(e); }
            }
        }
        this._autoGrowVKSwarm(swarm, keeper);
    }

    _processWarlockDemonAttack(demon) {
        if (!demon || demon.health <= 0 || !demon.isSummoned) return;
        const st = demon.summonStats || {};
        const type = demon.summonType;
        const targets = this.aliveHostileEnemies;
        if (!targets.length) return;
        const hit = (target, kind = 'melee', mult = 1, ignoreDefense = false) => {
            if (!target || target.health <= 0) return 0;
            const min = kind === 'magic' ? (st.magicMin || 1) : kind === 'ranged' ? (st.rangedMin || 1) : (st.meleeMin || 1);
            const max = kind === 'magic' ? (st.magicMax || min) : kind === 'ranged' ? (st.rangedMax || min) : (st.meleeMax || min);
            const raw = Math.max(1, Math.round(randomInt(min, max) * mult));
            const options = kind === 'melee' ? { contactAttacker: demon } : {};
            if (kind === 'magic') options.isMagic = true;
            return this._damageSummonEnemy(target, raw, ignoreDefense, false, options);
        };
        const randTarget = () => this.aliveHostileEnemies[Math.floor(Math.random() * this.aliveHostileEnemies.length)];
        const burn = (target, dealt) => {
            if (!target || target.health <= 0 || this._enemyHasImmunity(target, 'fire')) return;
            const dot = Math.max(1, Math.floor(dealt * DRAKE_FIRE_BURN_FRACTION));
            target.activeEffects = target.activeEffects || [];
            target.activeEffects.push({ type: 'burn', damage: dot, rounds: DRAKE_FIRE_BURN_ROUNDS });
            this._addLog(`    \u{1F525} ${this._eName(target)} burns (${dot}/rd, ${DRAKE_FIRE_BURN_ROUNDS} rds).`);
        };
        const poison = (target, dealt, mult = 1) => {
            if (!target || target.health <= 0 || this._enemyHasImmunity(target, 'poison')) return;
            const dot = Math.max(1, Math.floor(dealt * POISON_DAMAGE_FRACTION * mult));
            target.activeEffects = target.activeEffects || [];
            target.activeEffects.push({ type: 'vk_poison', damage: dot, rounds: POISON_DURATION_ROUNDS });
            this._addLog(`    \u{1F7E2} ${this._eName(target)} is poisoned (${dot}/rd).`);
        };
        const acid = (target, dealt) => {
            if (!target || target.health <= 0) return;
            const dot = Math.max(1, Math.floor(dealt * 0.25));
            target.activeEffects = target.activeEffects || [];
            target.activeEffects.push({ type: 'acid_dot', damage: dot, defenseBonus: -2, rounds: 3 });
            this._addLog(`    \u{1F7E2} ${this._eName(target)} corrodes (${dot}/rd, -2 def).`);
        };
        const kill = (target) => {
            if (target && target.health <= 0 && !target._deathHandled) {
                target._deathHandled = true;
                this._onEnemyDeath(target);
            }
        };
        const summonAcidSlime = () => {
            const preset = SLIME_PRESETS.acid_slime;
            if (!preset) return null;
            const summonNum = this.party.filter(p => p.isSummoned && p.summonType === 'acid_slime' && p.summonStats?.parentDemonId === demon.id).length + 1;
            const slimeHp = Math.max(1, Math.floor((demon.maxHealth || 1) / 2));
            const slime = new PartyMember({
                name: `${demon.name}'s Acid Slime #${summonNum}`,
                classId: 'summoned',
                speciesId: 'human',
                level: demon.level || st.warlockLevel || 1,
                maxHealth: slimeHp,
                maxStamina: 0,
                maxMana: 0,
                portraitSeed: Math.floor(Math.random() * 100000),
                isSummoned: true,
                summonType: 'acid_slime',
                summonerId: demon.summonerId,
                canBeHealed: true,
                row: 'front',
                summonStats: {
                    meleeMin: st.meleeMin || st.magicMin || 1,
                    meleeMax: st.meleeMax || st.magicMax || 3,
                    rangedMin: st.rangedMin || st.magicMin || 1,
                    rangedMax: st.rangedMax || st.magicMax || 3,
                    magicMin: st.magicMin || st.meleeMin || 1,
                    magicMax: st.magicMax || st.meleeMax || 3,
                    defense: st.defense || 1,
                    keeperLevel: st.warlockLevel || demon.level || 1,
                    beastKind: 'slime',
                    warlockDemonSlime: true,
                    parentDemonId: demon.id,
                    immune: preset.immune ? preset.immune.slice() : [],
                },
            });
            this.party.push(slime);
            this._registerNewSummon(slime);
            if (this._initiativeOrder.length > 0 && !this._initiativeOrder.some(slot => slot.ref === slime)) {
                const baseInit = this._initiativeOrder[this._initTurnIdx]?.init ?? 0;
                this._initiativeOrder.splice(this._initTurnIdx + 1, 0, { kind: 'party', ref: slime, init: baseInit, skipThisRound: true });
            }
            this._addLog(`\u{1F7E2} ${demon.name}'s acid spatter congeals into ${slime.name}!`);
            return slime;
        };
        const refreshEnemyEffect = (target, effect) => {
            if (!target || target.health <= 0 || !effect || !effect.type) return;
            target.activeEffects = target.activeEffects || [];
            const existing = target.activeEffects.find(fx => fx && fx.type === effect.type);
            if (existing) {
                for (const [k, v] of Object.entries(effect)) {
                    if (k === 'type') continue;
                    existing[k] = v;
                }
            } else {
                target.activeEffects.push({ ...effect });
            }
        };
        const applyAwakenedDot = (target, typeId, dealt, frac, rounds, immuneTag = null, label = 'afflicted') => {
            if (!target || target.health <= 0 || dealt <= 0) return;
            if (immuneTag && this._enemyHasImmunity(target, immuneTag)) return;
            const damage = Math.max(1, Math.floor(dealt * frac));
            target.activeEffects = target.activeEffects || [];
            target.activeEffects.push({ type: typeId, damage, rounds: Math.max(1, rounds | 0) });
            this._addLog(`    ${this._eName(target)} is ${label}! (${damage}/rd, ${Math.max(1, rounds | 0)} rds)`);
        };
        const applyAwakenedDebuff = (target, effect, logText) => {
            if (!target || target.health <= 0 || !effect) return;
            refreshEnemyEffect(target, effect);
            if (logText) this._addLog(`    ${logText}`);
        };
        const applyAwakenedProne = (target, rounds = 1) => {
            if (!target || target.health <= 0) return;
            if (this._tryHoldEnemy(target)) {
                refreshEnemyEffect(target, { type: 'awakened_prone', rounds: Math.max(1, rounds | 0) });
                this._addLog(`    ${this._eName(target)} is yanked prone by abyssal force!`);
            }
        };

        switch (type) {
            case 'imp': {
                const t = randTarget();
                const d = hit(t, 'ranged');
                this._addLog(`\u{1F47F} ${demon.name} hurls hellfire at ${this._eName(t)} for ${d}!`);
                burn(t, d);
                kill(t);
                break;
            }
            case 'flame_imp': {
                this._addLog(`\u{1F525} ${demon.name} erupts in flame over all enemies!`);
                for (const e of this.aliveHostileEnemies.slice()) {
                    if (this._enemyHasImmunity(e, 'fire')) continue;
                    const d = hit(e, 'magic', 0.8);
                    this._addLog(`  -> ${this._eName(e)} takes ${d} fire.`);
                    burn(e, d);
                    kill(e);
                }
                break;
            }
            case 'dust_devil': {
                this._addLog(`\u{1F32A} ${demon.name} becomes a choking cyclone!`);
                for (const e of this.aliveHostileEnemies.slice()) {
                    const d = hit(e, 'magic', 0.8);
                    this._addLog(`  -> ${this._eName(e)} takes ${d} cutting grit.`);
                    if (e.health > 0 && Math.random() < 0.10) {
                        if (this._tryStunEnemy(e)) this._addLog(`    ⚡ ${this._eName(e)} is stunned!`);
                    }
                    kill(e);
                }
                break;
            }
            case 'demon_knight': {
                for (let i = 0; i < 2; i++) {
                    const t = randTarget(); if (!t) break;
                    const d = hit(t, 'melee', 1.15);
                    this._addLog(`\u{2694} ${demon.name} hews ${this._eName(t)} for ${d}!`);
                    if (t.health > 0 && Math.random() < 0.40) {
                        if (this._tryStunEnemy(t)) this._addLog(`    ⚡ ${this._eName(t)} is stunned!`);
                    }
                    kill(t);
                }
                break;
            }
            case 'quasit': {
                this._addLog(`\u{1F47F} ${demon.name} darts through the enemy line with venomous stings!`);
                const poisonDuration = Math.max(1, Math.floor((st.warlockLevel || demon.level || 1) / 4));
                for (let i = 0; i < 5; i++) {
                    const t = randTarget(); if (!t) break;
                    const d = hit(t, 'ranged', 0.6);
                    this._addLog(`  -> sting hits ${this._eName(t)} for ${d}.`);
                    if (d > 0 && t.health > 0 && !this._enemyHasImmunity(t, 'poison')) {
                        t.activeEffects = t.activeEffects || [];
                        t.activeEffects.push({ type: 'quasit_poison', damage: d, rounds: poisonDuration });
                        this._addLog(`    \u{1F47F} ${this._eName(t)} is injected with quasit venom! (${d}/rd, ${poisonDuration} rds)`);
                    }
                    kill(t);
                }
                break;
            }
            case 'efreeti':
            case 'pit_fiend': {
                if (type === 'pit_fiend' && Math.random() >= 0.5) {
                    this._addLog(`\u{1F608} ${demon.name} batters foes with titanic blows!`);
                    for (let i = 0; i < 3; i++) {
                        const t = randTarget(); if (!t) break;
                        const d = hit(t, 'melee', 1.35);
                        this._addLog(`  -> ${this._eName(t)} takes ${d}.`);
                        kill(t);
                    }
                } else {
                    this._addLog(`\u{1F525} ${demon.name} calls down infernal fire!`);
                    for (const e of this.aliveHostileEnemies.slice()) {
                        if (this._enemyHasImmunity(e, 'fire')) continue;
                        const d = hit(e, 'magic', type === 'pit_fiend' ? 1.2 : 1);
                        this._addLog(`  -> ${this._eName(e)} takes ${d} fire.`);
                        burn(e, d);
                        kill(e);
                    }
                }
                break;
            }
            case 'ice_demon': {
                this._addLog(`❄️ ${demon.name} rakes with freezing claws!`);
                for (let i = 0; i < 4; i++) {
                    const t = randTarget(); if (!t) break;
                    const d = hit(t, 'melee', 1.2);
                    this._addLog(`  -> ${this._eName(t)} takes ${d}.`);
                    if (t.health > 0 && !this._enemyHasImmunity(t, 'cold')) {
                        t.activeEffects = t.activeEffects || [];
                        t.activeEffects.push({ type: 'frost_dot', damage: Math.max(1, Math.floor(d * 0.3)), rounds: 2 });
                    }
                    kill(t);
                }
                break;
            }
            case 'acid_demon': {
                this._addLog(`\u{1F7E2} ${demon.name} spews corrosive acid over the enemy party!`);
                for (const e of this.aliveHostileEnemies.slice()) {
                    const d = hit(e, 'magic');
                    this._addLog(`  -> ${this._eName(e)} takes ${d} acid.`);
                    acid(e, d);
                    kill(e);
                }
                if (demon.health > 0 && Math.random() < 0.50) summonAcidSlime();
                break;
            }
            case 'bloat_demon': {
                this._addLog(`\u{1F922} ${demon.name} launches toxic bile!`);
                const poisonRounds = Math.max(1, Math.floor((st.warlockLevel || demon.level || 1) / 7));
                for (let i = 0; i < 6; i++) {
                    const t = randTarget(); if (!t) break;
                    const d = hit(t, 'ranged');
                    this._addLog(`  -> bile hits ${this._eName(t)} for ${d}.`);
                    if (d > 0 && t.health > 0 && !this._enemyHasImmunity(t, 'poison')) {
                        const dot = Math.max(1, Math.floor(d * 0.33));
                        t.activeEffects = t.activeEffects || [];
                        t.activeEffects.push({ type: 'bloat_poison', damage: dot, rounds: poisonRounds });
                        this._addLog(`    \u{1F922} ${this._eName(t)} is poisoned by toxic bile! (${dot}/rd, ${poisonRounds} rds)`);
                    }
                    kill(t);
                }
                break;
            }
            case 'hell_hound': {
                if (Math.random() < 0.5) {
                    const t = randTarget();
                    const d = hit(t, 'melee', 1.1);
                    this._addLog(`\u{1F525} ${demon.name} bites ${this._eName(t)} for ${d}!`);
                    burn(t, d);
                    kill(t);
                } else {
                    this._addLog(`\u{1F525} ${demon.name} breathes hellfire!`);
                    for (const e of this.aliveHostileEnemies.slice()) {
                        if (this._enemyHasImmunity(e, 'fire')) continue;
                        const d = hit(e, 'magic', 0.8);
                        this._addLog(`  -> ${this._eName(e)} takes ${d} fire.`);
                        burn(e, d);
                        kill(e);
                    }
                }
                break;
            }
            case 'succubus': {
                if (demon.health <= demon.maxHealth * 0.50) {
                    this._addLog(`\u{1F49C} ${demon.name} unleashes a psychic shriek over the enemy party!`);
                    for (const e of this.aliveHostileEnemies.slice()) {
                        const d = this._damageSummonEnemy(e, randomInt(st.magicMin || 1, st.magicMax || st.magicMin || 1), false, false, { isMagic: true, psychic: true });
                        if (d > 0) this._addLog(`  -> ${this._eName(e)} reels for ${d} psychic damage.`);
                        kill(e);
                    }
                } else {
                    const t = randTarget();
                    const d = hit(t, 'magic');
                    this._addLog(`\u{1F48B} ${demon.name} drains ${this._eName(t)} for ${d}!`);
                    if (d > 0) demon.health = Math.min(demon.maxHealth, demon.health + Math.floor(d * 0.5));
                    if (d > 0 && t.health > 0) {
                        const tags = this._getEnemyTags(t);
                        const manaImmune = tags.some(tag => tag === 'construct' || tag === 'elemental' || tag === 'undead');
                        if (manaImmune) {
                            this._addLog(`    \u{1F49C} ${this._eName(t)} has no living mana for the succubus to drain.`);
                        } else if ((t.mana || 0) > 0) {
                            const drained = Math.min(t.mana, d);
                            t.mana = Math.max(0, t.mana - drained);
                            this._addLog(`    \u{1F49C} ${this._eName(t)} loses ${drained} mana!`);
                        }
                    }
                    if (t.health > 0 && Math.random() < 0.35 && !this._enemyHasImmunity(t, 'psychic')) {
                        if (this._tryParalyzeEnemy(t)) this._addLog(`    \u{1F49C} ${this._eName(t)} is dazed by charm!`);
                    }
                    kill(t);
                }
                break;
            }
            case 'chain_devil': {
                this._addLog(`\u{26D3} ${demon.name} lashes binding chains!`);
                for (let i = 0; i < 3; i++) {
                    const t = randTarget(); if (!t) break;
                    const d = hit(t, 'ranged');
                    this._addLog(`  -> chain hits ${this._eName(t)} for ${d}.`);
                    if (t.health > 0 && Math.random() < 0.50) {
                        if (this._tryHoldEnemy(t)) this._addLog(`    \u{26D3} ${this._eName(t)} is bound!`);
                    }
                    kill(t);
                }
                break;
            }
            case 'blood_demon': {
                const t = randTarget();
                const d = hit(t, 'melee', 1.2 + (st.bloodDemonKillBonus || 0) * 0.05);
                this._addLog(`\u{1F9B7} ${demon.name} tears into ${this._eName(t)} for ${d}!`);
                demon.health = Math.min(demon.maxHealth, demon.health + Math.floor(d * 0.4));
                if (t.health <= 0) {
                    demon.health = demon.maxHealth;
                    st.bloodDemonKillBonus = (st.bloodDemonKillBonus || 0) + 2;
                }
                kill(t);
                break;
            }
            case 'varkhul_the_chain_tyrant': {
                this._addLog(`⛓️ ${demon.name} executes the Chain Tyrant litany!`);
                for (let i = 0; i < 3; i++) {
                    const t = randTarget(); if (!t) break;
                    const d = hit(t, 'ranged', 0.95);
                    this._addLog(`  -> chain lash rends ${this._eName(t)} for ${d}.`);
                    if (t.health > 0 && Math.random() < 0.35) applyAwakenedProne(t, 1);
                    kill(t);
                }
                const t = randTarget();
                if (t) {
                    const d = hit(t, 'melee', 1.35);
                    this._addLog(`  -> tyrant crushes ${this._eName(t)} for ${d}.`);
                    applyAwakenedDebuff(t, { type: 'awakened_chain_shackle', damageBonus: -3, rangedBonus: -3, magicBonus: -3, rounds: 2 }, `${this._eName(t)} is soul-shackled (-3 atk/rng/magic).`);
                    kill(t);
                }
                break;
            }
            case 'azramor_the_ember_crown': {
                this._addLog(`👑🔥 ${demon.name} crowns the field in infernal embers!`);
                for (const e of this.aliveHostileEnemies.slice()) {
                    if (this._enemyHasImmunity(e, 'fire')) continue;
                    const d = hit(e, 'magic', 0.9);
                    this._addLog(`  -> crownfire scorches ${this._eName(e)} for ${d}.`);
                    applyAwakenedDot(e, 'awakened_ember_brand', d, 0.45, 3, 'fire', 'branded by ember-crown');
                    kill(e);
                }
                const t = randTarget();
                if (t) {
                    const d = hit(t, 'magic', 1.5);
                    this._addLog(`  -> ember lance impales ${this._eName(t)} for ${d}.`);
                    applyAwakenedDebuff(t, { type: 'awakened_ash_blind', rangedBonus: -3, magicBonus: -3, rounds: 2 }, `${this._eName(t)} is ash-blinded (-3 ranged/magic).`);
                    kill(t);
                }
                break;
            }
            case 'thyraxis_the_glass_queen': {
                this._addLog(`💠 ${demon.name} fractures reality with crystal harmonics!`);
                for (let i = 0; i < 3; i++) {
                    const t = randTarget(); if (!t) break;
                    const d = hit(t, 'ranged', 0.95);
                    this._addLog(`  -> mirror shard hits ${this._eName(t)} for ${d}.`);
                    applyAwakenedDebuff(t, { type: 'awakened_brittle_curse', defenseBonus: -4, rounds: 2 }, `${this._eName(t)} turns brittle (-4 defense).`);
                    kill(t);
                }
                const t = randTarget();
                if (t) {
                    const d = hit(t, 'magic', 1.4, true);
                    this._addLog(`  -> prism lance pierces ${this._eName(t)} for ${d} (ignores defense).`);
                    kill(t);
                }
                break;
            }
            case 'ghorvex_the_hungering_void': {
                this._addLog(`🕳️ ${demon.name} feeds the hungering void!`);
                const biteTarget = randTarget();
                if (biteTarget) {
                    const d = hit(biteTarget, 'melee', 1.4);
                    this._addLog(`  -> void bite devours ${this._eName(biteTarget)} for ${d}.`);
                    if (d > 0) demon.health = Math.min(demon.maxHealth, demon.health + Math.floor(d * 0.25));
                    applyAwakenedDot(biteTarget, 'awakened_void_rot', d, 0.35, 3, null, 'rotted by the void');
                    kill(biteTarget);
                }
                for (const e of this.aliveHostileEnemies.slice()) {
                    const d = hit(e, 'magic', 0.8);
                    this._addLog(`  -> hunger pulse crushes ${this._eName(e)} for ${d}.`);
                    applyAwakenedDebuff(e, { type: 'awakened_gravity_well', defenseBonus: -2, damageBonus: -2, rounds: 2 }, `${this._eName(e)} is trapped in a gravity well.`);
                    kill(e);
                }
                break;
            }
            case 'nyrgoth_the_grave_tide': {
                this._addLog(`☠️ ${demon.name} drowns foes in a grave tide!`);
                for (const e of this.aliveHostileEnemies.slice()) {
                    const d = hit(e, 'magic', 0.85);
                    this._addLog(`  -> grave wave hits ${this._eName(e)} for ${d}.`);
                    applyAwakenedDot(e, 'awakened_grave_rot', d, 0.4, 3, null, 'consumed by grave rot');
                    kill(e);
                }
                for (let i = 0; i < 2; i++) {
                    const t = randTarget(); if (!t) break;
                    const d = hit(t, 'ranged', 1.1);
                    this._addLog(`  -> bone spear impales ${this._eName(t)} for ${d}.`);
                    applyAwakenedDebuff(t, { type: 'awakened_marrow_chill', damageBonus: -3, rounds: 2 }, `${this._eName(t)} is marrow-chilled (-3 damage).`);
                    kill(t);
                }
                break;
            }
            case 'xelthara_the_storm_blade': {
                this._addLog(`🌩️ ${demon.name} dances in the storm and strikes all vectors!`);
                for (let i = 0; i < 2; i++) {
                    const t = randTarget(); if (!t) break;
                    const d = hit(t, 'melee', 1.15);
                    this._addLog(`  -> storm cleave tears ${this._eName(t)} for ${d}.`);
                    kill(t);
                }
                for (const e of this.aliveHostileEnemies.slice()) {
                    if (this._enemyHasImmunity(e, 'lightning')) continue;
                    const d = hit(e, 'magic', 0.75);
                    this._addLog(`  -> thunder arc shocks ${this._eName(e)} for ${d}.`);
                    applyAwakenedDebuff(e, { type: 'awakened_static_rupture', defenseBonus: -2, rounds: 2 }, `${this._eName(e)} is statically ruptured (-2 defense).`);
                    kill(e);
                }
                break;
            }
            case 'molkareth_the_pox_scribe': {
                this._addLog(`☣️ ${demon.name} writes plague scripture in living flesh!`);
                for (let i = 0; i < 4; i++) {
                    const t = randTarget(); if (!t) break;
                    const d = hit(t, 'ranged', 0.7);
                    this._addLog(`  -> pox quill hits ${this._eName(t)} for ${d}.`);
                    applyAwakenedDot(t, 'awakened_pox', d, 0.5, 3, 'poison', 'infected with eldritch pox');
                    kill(t);
                }
                for (const e of this.aliveHostileEnemies.slice()) {
                    const d = hit(e, 'magic', 0.8);
                    this._addLog(`  -> bile nova splashes ${this._eName(e)} for ${d}.`);
                    applyAwakenedDebuff(e, { type: 'awakened_plague_scripture', damageBonus: -2, defenseBonus: -2, rounds: 2 }, `${this._eName(e)} is hexed by plague scripture.`);
                    kill(e);
                }
                break;
            }
            case 'vaelkor_the_mind_flense': {
                this._addLog(`🧠 ${demon.name} flenses thought from flesh!`);
                for (let i = 0; i < 3; i++) {
                    const t = randTarget(); if (!t) break;
                    const d = hit(t, 'magic', 0.9);
                    this._addLog(`  -> mind lance strikes ${this._eName(t)} for ${d}.`);
                    applyAwakenedDebuff(t, { type: 'awakened_terror_fracture', damageBonus: -3, rounds: 2 }, `${this._eName(t)} is terror-fractured (-3 damage).`);
                    kill(t);
                }
                const t = randTarget();
                if (t) {
                    const d = hit(t, 'magic', 1.45);
                    this._addLog(`  -> sanity shear ravages ${this._eName(t)} for ${d}.`);
                    applyAwakenedDot(t, 'awakened_mind_burn', d, 0.4, 3, 'psychic', 'mind-burned');
                    kill(t);
                }
                break;
            }
            case 'drozhar_the_iron_maw': {
                this._addLog(`🦾 ${demon.name} grinds the battlefield to iron dust!`);
                const biteTarget = randTarget();
                if (biteTarget) {
                    const d = hit(biteTarget, 'melee', 1.6);
                    this._addLog(`  -> iron maw bite crushes ${this._eName(biteTarget)} for ${d}.`);
                    kill(biteTarget);
                }
                for (const e of this.aliveHostileEnemies.slice()) {
                    const d = hit(e, 'melee', 0.9);
                    this._addLog(`  -> crushing stomp hits ${this._eName(e)} for ${d}.`);
                    applyAwakenedDebuff(e, { type: 'awakened_rend_armor', defenseBonus: -4, rounds: 2 }, `${this._eName(e)} armor is torn apart (-4 defense).`);
                    kill(e);
                }
                break;
            }
            case 'orphiel_the_eclipsed_saint': {
                this._addLog(`🌘 ${demon.name} chants the eclipsed hymn and drowns the field in night.`);
                const rayTarget = randTarget();
                if (rayTarget) {
                    const d = hit(rayTarget, 'magic', 1.4);
                    this._addLog(`  -> eclipse ray sears ${this._eName(rayTarget)} for ${d}.`);
                    applyAwakenedDot(rayTarget, 'awakened_saint_scorch', d, 0.45, 3, null, 'seared by eclipse fire');
                    kill(rayTarget);
                }
                let totalDealt = 0;
                for (const e of this.aliveHostileEnemies.slice()) {
                    const d = hit(e, 'magic', 0.85);
                    totalDealt += d;
                    this._addLog(`  -> nightflood washes over ${this._eName(e)} for ${d}.`);
                    applyAwakenedDebuff(e, { type: 'awakened_eclipse_blind', rangedBonus: -3, magicBonus: -3, rounds: 2 }, `${this._eName(e)} is eclipse-blinded (-3 ranged/magic).`);
                    kill(e);
                }
                if (totalDealt > 0) {
                    const heal = Math.max(1, Math.floor(totalDealt * 0.15));
                    demon.health = Math.min(demon.maxHealth, demon.health + heal);
                    this._addLog(`  -> ${demon.name} drinks eclipse grace and heals ${heal} HP.`);
                }
                break;
            }
            default: {
                const t = randTarget();
                const d = hit(t, 'melee');
                this._addLog(`\u{1F608} ${demon.name} strikes ${this._eName(t)} for ${d}!`);
                kill(t);
            }
        }
    }

    _addLog(msg) {
        this.log.push(msg);
        if (this._logTarget === 'enemy') {
            this.enemyLog.push(msg);
            if (this.enemyLog.length > 600) this.enemyLog.shift();
        } else {
            this.playerLog.push(msg);
            if (this.playerLog.length > 600) this.playerLog.shift();
        }
    }
    _notify() {
        this._pruneDeadSummons();
        if (this.onUpdate) this.onUpdate();
    }
}

