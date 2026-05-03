/**
 * patch_l20b.cjs — runs AFTER patch_l20.cjs wrote the file.
 * Handles the barbarian rage extra-strike temp-HP injection + wound-mult/cleanup patches
 * that had emoji-escape issues in the first script.
 */
const fs = require('fs');
let src = fs.readFileSync('src/systems/CombatSystem.js', 'utf8');
const hasCRLF = src.includes('\r\n');
src = src.replace(/\r\n/g, '\n');

let patches = 0;
function patch(label, old, neu) {
    if (!src.includes(old)) {
        // Try diagnostic
        console.error(`ERROR — "${label}" anchor not found`);
        const words = old.split('\n')[0].slice(0, 60);
        const idx = src.indexOf(words);
        console.error(`  First line search "${words}" found at: ${idx}`);
        process.exit(1);
    }
    src = src.replace(old, neu);
    console.log(`OK: ${label}`);
    patches++;
}

// ── Barbarian rage extra strike: insert Blood Rage temp HP gain
// Use a unique anchor that avoids the emoji escape issue
patch(
    'barbarian Blood Rage temp HP on rage extra strikes',
    `        const hasStamina = m.stamina >= BARBARIAN_RAGE_STAMINA_COST;\n                m.stamina = Math.max(0, m.stamina - BARBARIAN_RAGE_STAMINA_COST);\n                let rageDmg = this._rollPlayerMeleeDamage(m);\n                if (!hasStamina) rageDmg = Math.max(1, Math.floor(rageDmg / 2));`,
    `        const hasStamina = m.stamina >= BARBARIAN_RAGE_STAMINA_COST;\n                m.stamina = Math.max(0, m.stamina - BARBARIAN_RAGE_STAMINA_COST);\n                let rageDmg = this._rollPlayerMeleeDamage(m);\n                if (!hasStamina) {\n                    rageDmg = Math.max(1, Math.floor(rageDmg / 2));\n                    // Blood Rage: temp HP lost when doing half damage\n                    if (m.level >= BARBARIAN_BLOOD_RAGE_UNLOCK_LEVEL && m.tempHp) {\n                        m.tempHp = 0;\n                        this._addLog(m.name + \"'s Battle Fury fades — stamina exhausted!\");\n                    }\n                }`
);

// ── Find where _applyWeaponRider is called after rageDealt and insert temp HP gain
// The anchor after the _addLog for rage-strike
const rageRiderAnchor = `this._applyWeaponRider(m, targetEnemy, rageDealt);\n                if (targetEnemy.health <= 0) {\n                    this._addLog(\`\${this._eName(targetEnemy)} is defeated!\`);\n                    break;\n                }\n            }\n        }\n        this._advancePlayerTurn();`;

if (!src.includes(rageRiderAnchor)) {
    // Try to find it
    const idx = src.indexOf('this._applyWeaponRider(m, targetEnemy, rageDealt)');
    console.error('ERROR: rage rider anchor not found; "rageDealt rider" at', idx);
    if (idx >= 0) console.error(JSON.stringify(src.substring(idx, idx + 300)));
    process.exit(1);
}
src = src.replace(
    rageRiderAnchor,
    `this._applyWeaponRider(m, targetEnemy, rageDealt);\n                // Blood Rage: gain temp HP per rage hit (if stamina OK)\n                if (m.level >= BARBARIAN_BLOOD_RAGE_UNLOCK_LEVEL && hasStamina) {\n                    const rGain = Math.max(1, Math.floor(m.maxHealth * BARBARIAN_TEMP_HP_PER_HIT_FRAC));\n                    m.tempHp = (m.tempHp || 0) + rGain;\n                }\n                if (targetEnemy.health <= 0) {\n                    this._addLog(\`\${this._eName(targetEnemy)} is defeated!\`);\n                    break;\n                }\n            }\n        }\n        this._advancePlayerTurn();`
);
console.log('OK: barbarian Blood Rage temp HP on rage extra strikes (rider section)');
patches++;

console.log(`\nAll ${patches} fix patches applied.`);
if (hasCRLF) src = src.replace(/\n/g, '\r\n');
fs.writeFileSync('src/systems/CombatSystem.js', src);
