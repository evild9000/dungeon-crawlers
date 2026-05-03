/**
 * patch_features13.cjs — Apply remaining 13-feature changes to CombatSystem.js and CraftingUI.js
 * Run: node patch_features13.cjs
 */
'use strict';

const fs = require('fs');
const path = require('path');

const COMBAT_PATH   = path.join(__dirname, 'src/systems/CombatSystem.js');
const CRAFTING_PATH = path.join(__dirname, 'src/ui/CraftingUI.js');

// Read files — normalise to LF so our string literals match regardless of CRLF
let src      = fs.readFileSync(COMBAT_PATH,   'utf8').replace(/\r\n/g, '\n');
let craftSrc = fs.readFileSync(CRAFTING_PATH, 'utf8').replace(/\r\n/g, '\n');

// ─────────────────────────────────────────────────────────────────────────────
// Helper
// ─────────────────────────────────────────────────────────────────────────────
function patch(label, oldStr, newStr) {
    if (!src.includes(oldStr)) {
        console.error(`FAIL [${label}]: anchor not found`);
        process.exit(1);
    }
    src = src.replace(oldStr, newStr);
    console.log(`OK   [${label}]`);
}

function patchCraft(label, oldStr, newStr) {
    if (!craftSrc.includes(oldStr)) {
        console.error(`FAIL [${label}]: anchor not found`);
        process.exit(1);
    }
    craftSrc = craftSrc.replace(oldStr, newStr);
    console.log(`OK   [${label}]`);
}

// ─────────────────────────────────────────────────────────────────────────────
// 1. Ranger main instakill — boss immunity + x4 damage
// ─────────────────────────────────────────────────────────────────────────────
patch('ranger-main-instakill',
`        if (isFavored) {
            const instakillChance = m.getFavoredEnemyInstakillChance();
            if (instakillChance > 0 && Math.random() < instakillChance) {
                targetEnemy.health = 0;
                this._addLog(\`\u{1F3AF} \${m.name} lands a LETHAL SHOT on the \${this._eName(targetEnemy)}! (Favored enemy instakill!)\`);
                this._advancePlayerTurn();
                return;
            }
        }`,
`        if (isFavored) {
            const instakillChance = m.getFavoredEnemyInstakillChance();
            if (instakillChance > 0 && Math.random() < instakillChance) {
                if (targetEnemy.isBoss || targetEnemy.isMegaBoss) {
                    // Boss/mega-boss immune to instakill — deal x4 pre-defense damage instead
                    let bRangeDmg = randomInt(RANGED_DAMAGE_MIN, RANGED_DAMAGE_MAX);
                    bRangeDmg += m.getWeaponBonus('ranged');
                    bRangeDmg += m.getClassDamageBonus('ranged');
                    if (exhausted) bRangeDmg = Math.max(1, Math.floor(bRangeDmg / 2));
                    bRangeDmg = Math.max(1, Math.round(bRangeDmg * 4));
                    const bRangeDealt = this._damageEnemy(targetEnemy, bRangeDmg, true);
                    this._addLog(\`\u{1F3AF} \${m.name} scores a lethal shot on \${this._eName(targetEnemy)} — Boss resists instant death! (x4 ranged: \${bRangeDealt} damage)\`);
                    this._advancePlayerTurn();
                    return;
                }
                targetEnemy.health = 0;
                this._addLog(\`\u{1F3AF} \${m.name} lands a LETHAL SHOT on the \${this._eName(targetEnemy)}! (Favored enemy instakill!)\`);
                this._advancePlayerTurn();
                return;
            }
        }`);

// ─────────────────────────────────────────────────────────────────────────────
// 2. Ranger extra-shot instakill — boss immunity + x4 damage
// ─────────────────────────────────────────────────────────────────────────────
patch('ranger-extra-instakill',
`            if (xtFavored) {
                const xtInstakill = m.getFavoredEnemyInstakillChance();
                if (xtInstakill > 0 && Math.random() < xtInstakill) {
                    curT.health = 0;
                    this._addLog(\`\u{1F3AF} \${m.name} lands a LETHAL SHOT on the \${this._eName(curT)}! (Favored enemy instakill!)\`);
                    continue;
                }
            }`,
`            if (xtFavored) {
                const xtInstakill = m.getFavoredEnemyInstakillChance();
                if (xtInstakill > 0 && Math.random() < xtInstakill) {
                    if (curT.isBoss || curT.isMegaBoss) {
                        // Boss/mega-boss immune to instakill — x4 pre-defense damage
                        let bXtDmg = randomInt(RANGED_DAMAGE_MIN, RANGED_DAMAGE_MAX);
                        bXtDmg += m.getWeaponBonus('ranged');
                        bXtDmg += m.getClassDamageBonus('ranged');
                        if (shotExhausted) bXtDmg = Math.max(1, Math.floor(bXtDmg / 2));
                        bXtDmg = Math.max(1, Math.round(bXtDmg * 4));
                        const bXtDealt = this._damageEnemy(curT, bXtDmg, true);
                        this._addLog(\`\u{1F3AF} \${m.name} scores a lethal shot on \${this._eName(curT)} — Boss resists instant death! (x4 ranged: \${bXtDealt} damage)\`);
                        if (curT.health <= 0) this._addLog(\`\${this._eName(curT)} is defeated!\`);
                        continue;
                    }
                    curT.health = 0;
                    this._addLog(\`\u{1F3AF} \${m.name} lands a LETHAL SHOT on the \${this._eName(curT)}! (Favored enemy instakill!)\`);
                    continue;
                }
            }`);

// ─────────────────────────────────────────────────────────────────────────────
// 3. Death Knight instakill — add mega-boss immunity + x4 damage path
// ─────────────────────────────────────────────────────────────────────────────
patch('death-knight-instakill',
`            if (!t.isBoss && Math.random() < (0.02 + nl * 0.01)) {
                t.health = 0;
                this._addLog(\`\\u{1F480} \${m.name} performs a death strike — \${this._eName(t)} is SLAIN INSTANTLY!\`);
            }`,
`            const dkInstakillRoll = Math.random() < (0.02 + nl * 0.01);
            if (dkInstakillRoll) {
                if (t.isBoss || t.isMegaBoss) {
                    // Boss/mega-boss immune to instant death — x4 pre-defense damage instead
                    const dkBossDmg = Math.max(1, Math.round(dmg * 4));
                    const dkBossDealt = this._damageSummonEnemy(t, dkBossDmg);
                    this._addLog(\`\\u{1F480} \${m.name} attempts a death strike on \${this._eName(t)} — Boss resists! (x4: \${dkBossDealt} damage)\`);
                    if (t.health <= 0) this._addLog(\`\${this._eName(t)} is defeated!\`);
                } else {
                    t.health = 0;
                    this._addLog(\`\\u{1F480} \${m.name} performs a death strike — \${this._eName(t)} is SLAIN INSTANTLY!\`);
                }
            }`);

// ─────────────────────────────────────────────────────────────────────────────
// 4. Mega-boss 33% chance to summon a normal minion — hook at end of enemy turn
// ─────────────────────────────────────────────────────────────────────────────
patch('megaboss-summon-hook',
`        // Post-attack checks.
        if (this.aliveParty.length === 0) {`,
`        // Mega-boss: 33% chance per turn to summon a normal copy of itself
        if (e.isMegaBoss && this.aliveParty.length > 0 && Math.random() < 0.33) {
            this._megaBossSummonMinion(e);
        }

        // Post-attack checks.
        if (this.aliveParty.length === 0) {`);

// ─────────────────────────────────────────────────────────────────────────────
// 5. Add _megaBossSummonMinion method — insert before _charmedMonsterAttack
// ─────────────────────────────────────────────────────────────────────────────
patch('megaboss-summon-method',
`    /**
     * Execute a charmed monster's turn: it attacks a random hostile enemy.`,
`    /**
     * Mega-boss summon: 33%/turn chance to spawn a normal (non-boss) version of itself.
     * The minion enters the initiative order and acts from next round onward.
     */
    _megaBossSummonMinion(megaBoss) {
        const typeDef = ENEMY_TYPES[megaBoss.type];
        if (!typeDef) return;
        const lvl    = Math.max(1, megaBoss.level || this.dungeonLevel || 1);
        const baseHp = Math.max(5, Math.round((10 + lvl * 14) * (0.75 + Math.random() * 0.5)));
        const baseSt = Math.max(5, Math.round(10 + lvl * 4));
        const baseMp = Math.max(5, Math.round(10 + lvl * 4));
        const def    = Math.floor(lvl / 2);
        const minion = {
            id:            'mb_minion_' + Date.now().toString(36) + '_' + Math.random().toString(36).slice(2, 6),
            type:          megaBoss.type,
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
            name:          null,
            sprite:        null,
            createSprite:  () => {},
            addEffect:     function(fx) { this.activeEffects.push(fx); },
        };
        this.enemies.push(minion);
        // Insert at end of initiative order; acts next round
        const init = 1 + Math.floor(Math.random() * 6);
        this._initiativeOrder.push({ kind: 'enemy', ref: minion, init, skipThisRound: true });
        this._addLog(\`\u{1F480} \${this._eName(megaBoss)} tears a rift — a \${this._eName(minion)} materializes from the void!\`);
    }

    /**
     * Execute a charmed monster's turn: it attacks a random hostile enemy.`);

// ─────────────────────────────────────────────────────────────────────────────
// Write CombatSystem.js (restore CRLF)
// ─────────────────────────────────────────────────────────────────────────────
fs.writeFileSync(COMBAT_PATH, src.replace(/\n/g, '\r\n'), 'utf8');
console.log('\nCombatSystem.js saved.');

// ─────────────────────────────────────────────────────────────────────────────
// 6. Trinket upgrade cost bug — CraftingUI.js
// ─────────────────────────────────────────────────────────────────────────────
patchCraft('trinket-upgrade-cost',
`            if (enchLvl < 7) {
                const next = enchLvl + 1;
                const base = ENCHANT_WEAPON_COSTS[next];`,
`            if (enchLvl < 7) {
                const next = enchLvl + 1;
                // Cost tier is based on TOTAL bonus (base bonusValue + enchant level + 1).
                // A +4 trinket going to +5 costs the same as any other +4 -> +5 upgrade.
                const costTier = Math.min(7, (def.bonusValue || 0) + enchLvl + 1);
                const base = ENCHANT_WEAPON_COSTS[costTier];`);

fs.writeFileSync(CRAFTING_PATH, craftSrc.replace(/\n/g, '\r\n'), 'utf8');
console.log('CraftingUI.js saved.');
console.log('\nAll patches applied successfully!');
