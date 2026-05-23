const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, 'src', 'systems', 'CombatSystem.js');
let src = fs.readFileSync(filePath, 'utf8').replace(/\r\n/g, '\n');

// ── Beholder petrify ──────────────────────────────────────────
// Anchor on lines that don't contain template literals
const bOld = "} else if (beam === 'petrify') {\n" +
"                    // Stun 3 rounds + +200 defense\n" +
"                    target = frontRow.length > 0 ? frontRow[Math.floor(Math.random() * frontRow.length)] : anyAlive[Math.floor(Math.random() * anyAlive.length)];\n" +
"                    if (Math.random() < 0.5) {\n" +
"                        target.webbedRounds = Math.max(target.webbedRounds || 0, 3);\n" +
"                        target.addEffect({ type: 'petrified', defenseBonus: 200, rounds: 3 });\n";

// Build the replacement using string concat to avoid template literal evaluation
const bHit  = "                        this._addLog(`\\u{1FAA8} Beholder: Petrify Ray hits ${target.name}! (locked 3 rounds, +200 def — turned to stone!)`);";
const bMiss = "                        this._addLog(`\\u{1FAA8} Beholder: Petrify Ray misses ${target ? target.name : 'target'}!`);";
const bImmune = "                        this._addLog(`\\u{1FAA8} Beholder: Petrify Ray hits ${target.name} — immune to petrification!`);";

const bOldFull = bOld + bHit + "\n" +
"                    } else {\n" +
"                        " + bMiss + "\n" +
"                    }";

const bNewFull = "} else if (beam === 'petrify') {\n" +
"                    // Stun 3 rounds + +200 defense; incorporeal/construct/undead immune\n" +
"                    target = frontRow.length > 0 ? frontRow[Math.floor(Math.random() * frontRow.length)] : anyAlive[Math.floor(Math.random() * anyAlive.length)];\n" +
"                    if (this._isPetrifyImmunePartyMember(target)) {\n" +
"                        " + bImmune + "\n" +
"                    } else if (Math.random() < 0.5) {\n" +
"                        target.webbedRounds = Math.max(target.webbedRounds || 0, 3);\n" +
"                        target.addEffect({ type: 'petrified', defenseBonus: 200, rounds: 3 });\n" +
"                        " + bHit + "\n" +
"                    } else {\n" +
"                        " + bMiss + "\n" +
"                    }";

if (src.includes(bOldFull)) {
    src = src.replace(bOldFull, bNewFull);
    console.log('OK   beholder-petrify');
} else {
    console.log('MISS beholder-petrify');
    // debug: show context
    const idx = src.indexOf("} else if (beam === 'petrify')");
    if (idx >= 0) {
        const chunk = src.slice(idx, idx + 700);
        console.log('File text:', JSON.stringify(chunk));
    }
}

// ── Medusa petrify ────────────────────────────────────────────
const mHit  = "                    this._addLog(`\\u{1FAA8} ${eName} meets ${petrifyTarget.name}'s gaze — PETRIFIED! (3 rounds, +200 def)`);";
const mMiss = "                    this._addLog(`\\u{1FAA8} ${eName} attempts to petrify ${petrifyTarget.name}, but they avert their eyes!`);";
const mImmune = "                    this._addLog(`\\u{1FAA8} ${eName} tries to meet ${petrifyTarget.name}'s gaze — immune to petrification!`);";

const mOldFull =
"            // Petrify attempt\n" +
"            if (Math.random() < 0.50 && anyAlive.length > 0) {\n" +
"                const frontRow = this.aliveFront;\n" +
"                const petrifyTarget = frontRow.length > 0 ? frontRow[Math.floor(Math.random() * frontRow.length)] : anyAlive[Math.floor(Math.random() * anyAlive.length)];\n" +
"                if (Math.random() < 0.50) {\n" +
"                    this._tryApplyStun(petrifyTarget); // stun resist may block the stunned flag only\n" +
"                    petrifyTarget.webbedRounds = Math.max(petrifyTarget.webbedRounds || 0, 3);\n" +
"                    petrifyTarget.addEffect({ type: 'petrified', defenseBonus: 200, rounds: 3 });\n" +
"                    " + mHit + "\n" +
"                } else {\n" +
"                    " + mMiss + "\n" +
"                }\n" +
"            }";

const mNewFull =
"            // Petrify attempt — incorporeal/construct/undead immune\n" +
"            if (Math.random() < 0.50 && anyAlive.length > 0) {\n" +
"                const frontRow = this.aliveFront;\n" +
"                const petrifyTarget = frontRow.length > 0 ? frontRow[Math.floor(Math.random() * frontRow.length)] : anyAlive[Math.floor(Math.random() * anyAlive.length)];\n" +
"                if (this._isPetrifyImmunePartyMember(petrifyTarget)) {\n" +
"                    " + mImmune + "\n" +
"                } else if (Math.random() < 0.50) {\n" +
"                    this._tryApplyStun(petrifyTarget);\n" +
"                    petrifyTarget.webbedRounds = Math.max(petrifyTarget.webbedRounds || 0, 3);\n" +
"                    petrifyTarget.addEffect({ type: 'petrified', defenseBonus: 200, rounds: 3 });\n" +
"                    " + mHit + "\n" +
"                } else {\n" +
"                    " + mMiss + "\n" +
"                }\n" +
"            }";

if (src.includes(mOldFull)) {
    src = src.replace(mOldFull, mNewFull);
    console.log('OK   medusa-petrify');
} else {
    console.log('MISS medusa-petrify');
    const idx2 = src.indexOf('// Petrify attempt');
    if (idx2 >= 0) console.log('File text:', JSON.stringify(src.slice(idx2, idx2 + 700)));
}

fs.writeFileSync(filePath, src.replace(/\n/g, '\r\n'), 'utf8');
console.log('Written.');
