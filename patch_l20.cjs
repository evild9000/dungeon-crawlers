/**
 * patch_l20.cjs — Implements four L20 class perks in CombatSystem.js:
 *   Druid L20   — Commune / Faerie Queen
 *   Mage L20    — Mirror Image + AoE Crit
 *   Necromancer L20 — Lich Form
 *   Barbarian L20   — Blood Rage (temp HP + wound multiplier)
 */
const fs = require('fs');
let src = fs.readFileSync('src/systems/CombatSystem.js', 'utf8');
const hasCRLF = src.includes('\r\n');
src = src.replace(/\r\n/g, '\n');

let patches = 0;
function patch(label, old, neu) {
    if (!src.includes(old)) {
        console.error(`ERROR — "${label}" anchor not found`);
        process.exit(1);
    }
    src = src.replace(old, neu);
    console.log(`OK: ${label}`);
    patches++;
}

// ═══════════════════════════════════════════════════════════════
// 1. IMPORTS — add all new constants
// ═══════════════════════════════════════════════════════════════
patch(
    'imports — new L20 constants',
    `    GHOUL_PARALYZE_CHANCE, TREANT_HOLD_CHANCE,\n    STUN_BOSS_RESIST_CHANCE, STUN_MEGABOSS_RESIST_CHANCE,`,
    `    GHOUL_PARALYZE_CHANCE, TREANT_HOLD_CHANCE,\n    STUN_BOSS_RESIST_CHANCE, STUN_MEGABOSS_RESIST_CHANCE,\n    DRUID_COMMUNE_UNLOCK_LEVEL, DRUID_COMMUNE_FAE_TOKENS_NEEDED,\n    FAERIE_QUEEN_DEFENSE_BASE, FAERIE_QUEEN_HOLD_BASE, FAERIE_QUEEN_HOLD_PER_3LV,\n    FAERIE_QUEEN_POISON_FRAC_BASE, FAERIE_QUEEN_POISON_FRAC_PER_LV,\n    FAERIE_QUEEN_MAGIC_DMG_RESIST, FAERIE_QUEEN_HP_MULT,\n    MAGE_MIRROR_IMAGE_UNLOCK_LEVEL, MAGE_MIRROR_IMAGE_MANA_COST, MAGE_MIRROR_IMAGE_COUNT_DIVISOR,\n    MAGE_AOE_CRIT_CHANCE_PER_2LV, MAGE_AOE_CRIT_DAMAGE_BASE, MAGE_AOE_CRIT_DAMAGE_PER_LV,\n    NECRO_LICH_FORM_UNLOCK_LEVEL, NECRO_LICH_FORM_MANA_PER_ROUND,\n    NECRO_LICH_REVIVE_HP_BASE, NECRO_LICH_REVIVE_HP_PER_2LV, NECRO_LICH_REVIVE_ROUNDS,\n    NECRO_LICH_MAGIC_RESIST_BASE, NECRO_LICH_MAGIC_RESIST_PER_4LV,\n    BARBARIAN_BLOOD_RAGE_UNLOCK_LEVEL, BARBARIAN_TEMP_HP_PER_HIT_FRAC,\n    BARBARIAN_WOUND_THRESH_1, BARBARIAN_WOUND_THRESH_2, BARBARIAN_WOUND_THRESH_3,\n    BARBARIAN_WOUND_MULT_1, BARBARIAN_WOUND_MULT_2, BARBARIAN_WOUND_MULT_3,`
);

// ═══════════════════════════════════════════════════════════════
// 2. Druid Commune + Faerie Queen methods (before bardCharm)
// ═══════════════════════════════════════════════════════════════
patch(
    'druidCommune + _summonFaerieQueen + _checkFaerieQueenRevive methods',
    `    /**\n     * Bard L20 Charm Monster. Costs BARD_CHARM_MANA_COST mana.`,
    `    // ── Druid L20: Commune / Faerie Queen ────────────────────────────────────

    /**
     * Druid L20: Commune with nature. Grants 1 Fae token.
     * At 3 tokens, auto-summons the Faerie Queen (only one active at a time).
     * Tokens cap at 3 so they're ready to immediately resummon when the FQ dies.
     */
    druidCommune() {
        const m = this.currentMember;
        if (!m || m.classId !== 'druid' || m.level < DRUID_COMMUNE_UNLOCK_LEVEL || m.health <= 0) return;

        // Cap tokens at 3 (they're saved for when the active FQ dies)
        const currentTokens = m.faeTokens || 0;
        if (currentTokens < DRUID_COMMUNE_FAE_TOKENS_NEEDED) {
            m.faeTokens = currentTokens + 1;
        }
        const t = m.faeTokens;
        this._addLog(\`\u{1F33F} \${m.name} communes with nature! Fae tokens: \${t}/\${DRUID_COMMUNE_FAE_TOKENS_NEEDED}\`);

        // Attempt summon if tokens are full and no FQ is alive
        if (t >= DRUID_COMMUNE_FAE_TOKENS_NEEDED) {
            const activeFQ = this.party.find(p =>
                p.isSummoned && p.summonType === 'faerie_queen' && p.summonerId === m.id && p.health > 0);
            if (!activeFQ) {
                m.faeTokens = 0;
                this._summonFaerieQueen(m);
            } else {
                this._addLog(\`\u{1F33F} A Faerie Queen already serves — tokens held until she falls.\`);
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

        const fq = new PartyMember({
            name:         \`\${druid.name}'s Faerie Queen\`,
            classId:      'druid',
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
            row:          'front',
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
        this._addLog(\`\u{1F31F} The Faerie Queen answers the call! (HP:\${maxHp} Def:\${defense} Atk:\${MAGIC_DAMAGE_MIN+magicBonus}–\${MAGIC_DAMAGE_MAX+magicBonus})\`);
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
            if ((druid.faeTokens || 0) >= DRUID_COMMUNE_FAE_TOKENS_NEEDED) {
                // Remove the dead FQ from party
                const idx = this.party.indexOf(fq);
                if (idx !== -1) this.party.splice(idx, 1);
                druid.faeTokens = 0;
                this._summonFaerieQueen(druid);
            }
        }
    }

    /**
     * Bard L20 Charm Monster. Costs BARD_CHARM_MANA_COST mana.`
);

// ═══════════════════════════════════════════════════════════════
// 3. Faerie Queen AI in _takeSummonTurn (before beastKind check)
// ═══════════════════════════════════════════════════════════════
patch(
    'Faerie Queen AI in _takeSummonTurn',
    `        const beastKind = stats.beastKind;\n\n        if (beastKind === 'pixie') {`,
    `        // ── Faerie Queen: Wrath of Nature ────────────────────────────────────
        if (m.summonType === 'faerie_queen') {
            const t = targets[Math.floor(Math.random() * targets.length)];
            const dmg = randomInt(stats.magicMin ?? 5, stats.magicMax ?? 15);
            const dealt = this._damageSummonEnemy(t, dmg);
            const fqEName = this._eName(t);
            this._addLog(\`\u{1F31F} \${m.name} unleashes Wrath of Nature on \${fqEName} for \${dealt} magic damage!\`);

            if (t.health > 0) {
                // Hold: 33% + 1% per 3 FQ levels; incorporeal immune; boss/megaboss resist applies
                const fqLvl     = stats.druidLevel || m.level || 1;
                const holdChance = FAERIE_QUEEN_HOLD_BASE + Math.floor(fqLvl / 3) * FAERIE_QUEEN_HOLD_PER_3LV;
                const fqTDef    = ENEMY_TYPES[t.type] || {};
                const fqTTags   = Array.isArray(fqTDef.tags) ? fqTDef.tags : [];
                const holdImmune = fqTTags.includes('incorporeal');
                if (!holdImmune && Math.random() < holdChance) {
                    // 2-round hold: stun this turn + fae_hold effect for next turn
                    if (this._tryStunEnemy(t)) {
                        t.activeEffects = t.activeEffects || [];
                        t.activeEffects = t.activeEffects.filter(x => x.type !== 'fae_hold');
                        t.activeEffects.push({ type: 'fae_hold', rounds: 1 });
                        this._addLog(\`\u{1F33F} \${fqEName} is held fast by fae magic! (2 rounds)\`);
                    }
                }

                // Poison DoT: 50% + 1%/level of dealt damage; applies/refreshes
                const poisonFrac = Math.min(2.0, FAERIE_QUEEN_POISON_FRAC_BASE + fqLvl * FAERIE_QUEEN_POISON_FRAC_PER_LV);
                const poisonDmg  = Math.max(1, Math.floor(dealt * poisonFrac));
                t.activeEffects = t.activeEffects || [];
                t.activeEffects = t.activeEffects.filter(x => x.type !== 'fae_poison');
                t.activeEffects.push({ type: 'fae_poison', damage: poisonDmg, rounds: POISON_DURATION_ROUNDS });
                this._addLog(\`\u{1F33F} \${fqEName} is poisoned by fae venom! (\${poisonDmg} dmg/rd)\`);
            }
            if (t.health <= 0) this._addLog(\`\${fqEName} is defeated!\`);
            return;
        }

        const beastKind = stats.beastKind;

        if (beastKind === 'pixie') {`
);

// ═══════════════════════════════════════════════════════════════
// 4. Fae hold tick + fae poison in _tickEnemyEffects
// ═══════════════════════════════════════════════════════════════
patch(
    'fae_poison in DOT_TYPES + fae_hold tick',
    `            const DOT_TYPES = { burn: '\\u{1F525} burn', acid_dot: '\\u{1F7E2} acid', poison_weapon: '\\u{1F40D} venom', bleed: '\\u{1F7E5} bleed', mummy_rot: '\\u{1F7E4} Mummy Rot' };`,
    `            const DOT_TYPES = { burn: '\\u{1F525} burn', acid_dot: '\\u{1F7E2} acid', poison_weapon: '\\u{1F40D} venom', bleed: '\\u{1F7E5} bleed', mummy_rot: '\\u{1F7E4} Mummy Rot', fae_poison: '\\u{1F33F} fae venom' };`
);

patch(
    'fae_hold re-apply stun in _tickEnemyEffects',
    `            // Quivering Palm — internal damage that doubles each round (bypasses all defense)`,
    `            // Fae hold — re-apply stun for remaining hold rounds then expire
            const faeHold = effects.find(fx => fx && fx.type === 'fae_hold' && fx.rounds > 0);
            if (faeHold && e.health > 0) {
                e.stunned = true;   // cleared at turn start after skipping
                faeHold.rounds--;
            }

            // Quivering Palm — internal damage that doubles each round (bypasses all defense)`
);

// ═══════════════════════════════════════════════════════════════
// 5. _checkFaerieQueenRevive call + defeat check with lich phial
//    in _beginInitiativeRound
// ═══════════════════════════════════════════════════════════════
patch(
    '_checkFaerieQueenRevive + lich phial defeat check in _beginInitiativeRound',
    `        this._tickPartyEffects();\n        if (this.aliveParty.length === 0) {\n            this.phase = 'DEFEAT';\n            this._addLog('--- Your party has been defeated! ---');\n            this._notify();\n            return;\n        }`,
    `        this._tickPartyEffects();
        this._checkFaerieQueenRevive();
        if (this.aliveParty.length === 0 && !this.party.some(p => !p.isSummoned && p.lichPhial)) {
            this.phase = 'DEFEAT';
            this._addLog('--- Your party has been defeated! ---');
            this._notify();
            return;
        }`
);

// ═══════════════════════════════════════════════════════════════
// 6. Mage Mirror Image method (insert before bardCharm)
// ═══════════════════════════════════════════════════════════════
patch(
    'mageCreateMirrorImages method',
    `    // ── Druid L20: Commune / Faerie Queen ────────────────────────────────────`,
    `    // ── Mage L20: Mirror Image ────────────────────────────────────────────────

    /**
     * Mage L20: Create Mirror Images.
     * Costs MAGE_MIRROR_IMAGE_MANA_COST mana; creates floor(level/7) images.
     * Each image absorbs one attack (any type) directed at the mage.
     */
    mageCreateMirrorImages() {
        const m = this.currentMember;
        if (!m || m.classId !== 'mage' || m.level < MAGE_MIRROR_IMAGE_UNLOCK_LEVEL || m.health <= 0) return;
        if (m.mana < MAGE_MIRROR_IMAGE_MANA_COST) {
            this._addLog(\`\u{1FA9E} \${m.name} needs \${MAGE_MIRROR_IMAGE_MANA_COST} MP for Mirror Image (has \${m.mana}).\`);
            return;
        }
        m.mana -= MAGE_MIRROR_IMAGE_MANA_COST;
        const count = Math.max(1, Math.floor(m.level / MAGE_MIRROR_IMAGE_COUNT_DIVISOR));
        m.mirrorImages = (m.mirrorImages || 0) + count;
        this._addLog(\`\u{1FA9E} \${m.name} conjures \${count} Mirror Image\${count > 1 ? 's' : ''}! (\${m.mirrorImages} total)\`);
        this._advancePlayerTurn();
    }

    // ── Druid L20: Commune / Faerie Queen ────────────────────────────────────`
);

// ═══════════════════════════════════════════════════════════════
// 7. Mirror image absorption in _applyEnemyHit (after warrior intercept)
// ═══════════════════════════════════════════════════════════════
patch(
    'mirror image absorption in _applyEnemyHit',
    `        // Monk dodge (melee only — matches prior behaviour). Capped at MONK_DODGE_MAX.`,
    `        // ── Mage L20: Mirror Image absorbs any hit ───────────────────────────────
        if (!target.isSummoned && target.mirrorImages && target.mirrorImages > 0 && target.health > 0) {
            target.mirrorImages--;
            this._addLog(\`\u{1FA9E} A Mirror Image of \${target.name} absorbs the blow and shatters! (\${target.mirrorImages} remaining)\`);
            return;
        }

        // Monk dodge (melee only — matches prior behaviour). Capped at MONK_DODGE_MAX.`
);

// ═══════════════════════════════════════════════════════════════
// 8. Faerie Queen magic/AoE resistance in _applyEnemyHit
//    (after adamantine golem half-damage block)
// ═══════════════════════════════════════════════════════════════
patch(
    'Faerie Queen magic/AoE resistance in _applyEnemyHit',
    `        if (attackKind === 'melee') {\n            const details = [];`,
    `        // ── Faerie Queen: 50% less from magic and AoE ───────────────────────────
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

        if (attackKind === 'melee') {\n            const details = []`
);

// ═══════════════════════════════════════════════════════════════
// 9. Barbarian temp HP absorption in _applyEnemyHit (before health deduction)
// ═══════════════════════════════════════════════════════════════
patch(
    'barbarian temp HP absorption before health deduction',
    `        target.health = Math.max(0, target.health - dmg);\n\n        // ── Vampire gaseous form`,
    `        // ── Barbarian L20: temp HP absorbs incoming damage (after defenses) ──────
        if (target.classId === 'barbarian' && (target.tempHp || 0) > 0) {
            if (target.tempHp >= dmg) {
                target.tempHp -= dmg;
                this._addLog(\`\u{1F534} \${target.name}'s Battle Fury absorbs \${dmg} damage! (\${target.tempHp} temp HP left)\`);
                return; // fully absorbed — no HP loss
            } else {
                dmg -= target.tempHp;
                this._addLog(\`\u{1F534} \${target.name}'s Battle Fury buffer depleted! (\${dmg} bleeds through)\`);
                target.tempHp = 0;
            }
        }

        target.health = Math.max(0, target.health - dmg);

        // ── Lich Phial: necromancer in lich form caught at 0 HP ─────────────────
        if (target.health <= 0 && !target.isSummoned && target.isLichForm && !target.lichPhial) {
            target.lichPhial = true;
            target.lichReviveRoundsLeft = NECRO_LICH_REVIVE_ROUNDS;
            target.health = 0;
            this._addLog(\`\u{1F480} \${target.name}'s soul retreats to their Lich Phial! (returns in \${NECRO_LICH_REVIVE_ROUNDS} rounds)\`);
            return; // don't process further damage effects
        }

        // ── Vampire gaseous form`
);

// ═══════════════════════════════════════════════════════════════
// 10. Necromancer Lich Form toggle method (before druidCommune)
// ═══════════════════════════════════════════════════════════════
patch(
    'necromancerToggleLichForm method',
    `    // ── Mage L20: Mirror Image ────────────────────────────────────────────────`,
    `    // ── Necromancer L20: Lich Form ────────────────────────────────────────────

    /**
     * Necromancer L20: Toggle Lich Form on/off.
     * While active costs NECRO_LICH_FORM_MANA_PER_ROUND mana/round.
     * Grants magic/AoE resist, stun/poison immunity.
     * On death: soul retreats to phial, revives in NECRO_LICH_REVIVE_ROUNDS rounds.
     */
    necromancerToggleLichForm() {
        const m = this.currentMember;
        if (!m || m.classId !== 'necromancer' || m.level < NECRO_LICH_FORM_UNLOCK_LEVEL || m.health <= 0) return;
        m.isLichForm = !m.isLichForm;
        if (m.isLichForm) {
            this._addLog(\`\u{1F480} \${m.name} undergoes the Lich transformation! (magic/AoE resist, stun/poison immune, phial death)\`);
        } else {
            this._addLog(\`\u{1F480} \${m.name} reverts to mortal form.\`);
        }
        this._advancePlayerTurn();
    }

    // ── Mage L20: Mirror Image ────────────────────────────────────────────────`
);

// ═══════════════════════════════════════════════════════════════
// 11. Lich upkeep + phial countdown in _tickPartyEffects
//     (after Fire Aura block, before Necro undead upkeep)
// ═══════════════════════════════════════════════════════════════
patch(
    'lich upkeep in _tickPartyEffects',
    `            // Necromancer undead upkeep: 1 MP per living undead per round`,
    `            // Lich Form: 15 MP/round upkeep; stamina→mana conversion on mana exhaustion
            if (m.classId === 'necromancer' && m.isLichForm && !m.lichPhial) {
                if (m.mana >= NECRO_LICH_FORM_MANA_PER_ROUND) {
                    m.mana -= NECRO_LICH_FORM_MANA_PER_ROUND;
                    this._addLog(\`\u{1F480} \${m.name}'s Lich Form drains \${NECRO_LICH_FORM_MANA_PER_ROUND} MP.\`);
                } else if (m.stamina > 0) {
                    const stamConv = m.stamina;
                    m.mana    = stamConv;
                    m.stamina = 0;
                    this._addLog(\`\u{1F480} \${m.name}'s mana exhausted — converting \${stamConv} stamina to mana to sustain Lich Form!\`);
                } else {
                    m.isLichForm = false;
                    this._addLog(\`\u{1F480} \${m.name}'s mana and stamina exhausted — Lich Form collapses!\`);
                }
            }

            // Necromancer undead upkeep: 1 MP per living undead per round`
);

// 11b. Lich phial countdown — after the main loop (outside the health > 0 guard)
patch(
    'lich phial countdown after main _tickPartyEffects loop',
    `        // Remove mage shield if the caster has been defeated.`,
    `        // Lich phial countdown (runs even when health === 0)
        for (const pm of this.party) {
            if (!pm.lichPhial || pm.isSummoned) continue;
            pm.lichReviveRoundsLeft = (pm.lichReviveRoundsLeft || 0) - 1;
            if (pm.lichReviveRoundsLeft > 0) {
                this._addLog(\`\u{1F480} \${pm.name}'s soul stirs in the phial... (\${pm.lichReviveRoundsLeft} rds)\`);
            } else {
                const overLv   = Math.max(0, Math.floor(((pm.level || 0) - NECRO_LICH_FORM_UNLOCK_LEVEL) / 2));
                const reviveFrac = Math.min(1, NECRO_LICH_REVIVE_HP_BASE + overLv * NECRO_LICH_REVIVE_HP_PER_2LV);
                const reviveHp = Math.max(1, Math.floor(pm.maxHealth * reviveFrac));
                pm.health   = reviveHp;
                pm.lichPhial = false;
                this._addLog(\`\u{1F480} \${pm.name} is reborn from the phial at \${reviveHp} HP!\`);
            }
        }

        // Remove mage shield if the caster has been defeated.`
);

// 11c. Lich poison immunity in the DoT tick loop
patch(
    'lich poison immunity in _tickPartyEffects DoT loop',
    `                if (e.type === 'poison' && e.rounds > 0) {\n                    if (!isNecroUndead) totalPoison += (e.damage || 0);\n                    e.rounds--;\n                }`,
    `                if (e.type === 'poison' && e.rounds > 0) {\n                    if (!isNecroUndead && !m.isLichForm) totalPoison += (e.damage || 0);\n                    e.rounds--;\n                }`
);

// ═══════════════════════════════════════════════════════════════
// 12. Lich stun immunity in _tryApplyStun
// ═══════════════════════════════════════════════════════════════
patch(
    'lich stun immunity in _tryApplyStun',
    `    _tryApplyStun(target) {\n        if (!target || target.health <= 0) return false;\n        const resistChance`,
    `    _tryApplyStun(target) {\n        if (!target || target.health <= 0) return false;\n        // Lich form is immune to stun\n        if (target.isLichForm) {\n            this._addLog(\`\u{1F480} \${target.name}'s lich form shrugs off the stun!\`);\n            return false;\n        }\n        const resistChance`
);

// ═══════════════════════════════════════════════════════════════
// 13. Mage AoE crit in magicAttack loop
// ═══════════════════════════════════════════════════════════════
patch(
    'mage AoE crit in magicAttack',
    `        for (const [e] of hitCounts) {\n            if (e.health <= 0) continue;\n            const dealt = this._damageEnemy(e, dmg, false, true);\n            this._addLog(\`  → \${this._eName(e)} takes \${dealt} magic damage.\`);`,
    `        for (const [e] of hitCounts) {\n            if (e.health <= 0) continue;\n            // Mage L20: AoE crit chance = floor(level/2) × 1% per 2 levels\n            let finalDmg = dmg;\n            let critNote = '';\n            if (m.classId === 'mage' && m.level >= MAGE_MIRROR_IMAGE_UNLOCK_LEVEL) {\n                const critChance = Math.floor(m.level / 2) * MAGE_AOE_CRIT_CHANCE_PER_2LV;\n                if (critChance > 0 && Math.random() < critChance) {\n                    const critMult = MAGE_AOE_CRIT_DAMAGE_BASE + m.level * MAGE_AOE_CRIT_DAMAGE_PER_LV;\n                    finalDmg = Math.floor(finalDmg * critMult);\n                    critNote = ' (ARCANE CRIT!)';\n                }\n            }\n            const dealt = this._damageEnemy(e, finalDmg, false, true);\n            this._addLog(\`  → \${this._eName(e)} takes \${dealt} magic damage.\${critNote}\`);`
);

// ═══════════════════════════════════════════════════════════════
// 14. Barbarian temp HP gain after main hit in meleeAttack
// ═══════════════════════════════════════════════════════════════
patch(
    'barbarian temp HP gain after main hit',
    `        // Weapon rider proc (fire/acid/poison/lightning/ice) — main-hand then off-hand\n        this._applyWeaponRider(m, targetEnemy, dealt);\n        this._applyWeaponRider(m, targetEnemy, dealt, 'offhand');\n\n        if (targetEnemy.health <= 0) this._addLog(\`\${eName} is defeated!\`);`,
    `        // Barbarian L20 Blood Rage: gain temp HP on hit while raging
        if (m.classId === 'barbarian' && m.isRaging && m.level >= BARBARIAN_BLOOD_RAGE_UNLOCK_LEVEL) {
            const gain = Math.max(1, Math.floor(m.maxHealth * BARBARIAN_TEMP_HP_PER_HIT_FRAC));
            m.tempHp = (m.tempHp || 0) + gain;
        }

        // Weapon rider proc (fire/acid/poison/lightning/ice) — main-hand then off-hand
        this._applyWeaponRider(m, targetEnemy, dealt);
        this._applyWeaponRider(m, targetEnemy, dealt, 'offhand');

        if (targetEnemy.health <= 0) this._addLog(\`\${eName} is defeated!\`);`
);


// ═══════════════════════════════════════════════════════════════
// 15. Barbarian wound multiplier in _rollPlayerMeleeDamage
// ═══════════════════════════════════════════════════════════════
patch(
    'barbarian wound multiplier in _rollPlayerMeleeDamage',
    `        // Barbarian rage grants +level to melee damage\n        if (m.classId === 'barbarian' && m.isRaging) base += (m.level || 1);\n        return Math.max(1, base);`,
    `        // Barbarian rage grants +level to melee damage
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
        return Math.max(1, base);`
);

// ═══════════════════════════════════════════════════════════════
// 16. Clear barbarian temp HP on victory
// ═══════════════════════════════════════════════════════════════
patch(
    'clear barbarian temp HP in _applyVictoryRecovery',
    `        for (const m of this.party) {\n            if (m.isSummoned) continue;\n            if (m.health <= 0) continue;          // do NOT revive`,
    `        for (const m of this.party) {\n            if (m.isSummoned) continue;\n            m.tempHp    = 0; // Blood Rage temp HP resets after combat\n            m.mirrorImages = 0; // mirror images reset\n            m.lichPhial = false; // lich phial cleared after combat\n            m.isLichForm = false; // lich form reset\n            m.faeTokens = 0; // fae tokens reset\n            if (m.health <= 0) continue;          // do NOT revive`
);

console.log(`\nAll ${patches} CombatSystem patches applied.`);
if (hasCRLF) src = src.replace(/\n/g, '\r\n');
fs.writeFileSync('src/systems/CombatSystem.js', src);
