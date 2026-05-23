const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, 'src', 'systems', 'CombatSystem.js');
let src = fs.readFileSync(filePath, 'utf8').replace(/\r\n/g, '\n');

let ok = 0;

// ── Beholder petrify ────────────────────────────────────────────────────────
// Find by unique safe anchor before and after the block
const bStart = "} else if (beam === 'petrify') {\n" +
    "                    // Stun 3 rounds + +200 defense";
const bEnd   = "                } else if (beam === 'slow_ray') {";

const bi1 = src.indexOf(bStart);
const bi2 = src.indexOf(bEnd, bi1);
if (bi1 < 0 || bi2 < 0) {
    console.log('MISS beholder (anchors not found)', bi1, bi2);
} else {
    const between = src.slice(bi1 + bStart.length, bi2);
    // Verify it's what we expect
    if (!between.includes("if (Math.random() < 0.5)") || between.includes('_isPetrifyImmune')) {
        console.log('MISS beholder (unexpected content or already patched)');
    } else {
        const bNewBlock =
            "} else if (beam === 'petrify') {\n" +
            "                    // Stun 3 rounds + +200 defense; incorporeal/construct/undead immune\n" +
            "                    target = frontRow.length > 0 ? frontRow[Math.floor(Math.random() * frontRow.length)] : anyAlive[Math.floor(Math.random() * anyAlive.length)];\n" +
            "                    if (this._isPetrifyImmunePartyMember(target)) {\n" +
            "                        this._addLog(`\\u{1FAA8} Beholder: Petrify Ray hits ${target.name} — immune to petrification!`);\n" +
            "                    } else if (Math.random() < 0.5) {\n" +
            "                        target.webbedRounds = Math.max(target.webbedRounds || 0, 3);\n" +
            "                        target.addEffect({ type: 'petrified', defenseBonus: 200, rounds: 3 });\n" +
            "                        this._addLog(`\\u{1FAA8} Beholder: Petrify Ray hits ${target.name}! (locked 3 rounds, +200 def — turned to stone!)`);\n" +
            "                    } else {\n" +
            "                        this._addLog(`\\u{1FAA8} Beholder: Petrify Ray misses ${target ? target.name : 'target'}!`);\n" +
            "                    }\n" +
            "                ";  // leading spaces for the next else-if
        src = src.slice(0, bi1) + bNewBlock + bEnd + src.slice(bi2 + bEnd.length);
        console.log('OK   beholder-petrify');
        ok++;
    }
}

// ── Medusa petrify ─────────────────────────────────────────────────────────
const mStart = "            // Petrify attempt\n            if (Math.random() < 0.50 && anyAlive.length > 0) {";
const mEnd   = "\n\n        // ── Hydra:";

const mi1 = src.indexOf(mStart);
const mi2 = src.indexOf(mEnd, mi1);
if (mi1 < 0 || mi2 < 0) {
    console.log('MISS medusa (anchors not found)', mi1, mi2);
} else {
    const between = src.slice(mi1 + mStart.length, mi2);
    if (!between.includes("const petrifyTarget") || between.includes('_isPetrifyImmune')) {
        console.log('MISS medusa (unexpected content or already patched)');
    } else {
        const mNewBlock =
            "            // Petrify attempt — incorporeal/construct/undead immune\n" +
            "            if (Math.random() < 0.50 && anyAlive.length > 0) {\n" +
            "                const frontRow = this.aliveFront;\n" +
            "                const petrifyTarget = frontRow.length > 0 ? frontRow[Math.floor(Math.random() * frontRow.length)] : anyAlive[Math.floor(Math.random() * anyAlive.length)];\n" +
            "                if (this._isPetrifyImmunePartyMember(petrifyTarget)) {\n" +
            "                    this._addLog(`\\u{1FAA8} ${eName} tries to meet ${petrifyTarget.name}'s gaze — immune to petrification!`);\n" +
            "                } else if (Math.random() < 0.50) {\n" +
            "                    this._tryApplyStun(petrifyTarget);\n" +
            "                    petrifyTarget.webbedRounds = Math.max(petrifyTarget.webbedRounds || 0, 3);\n" +
            "                    petrifyTarget.addEffect({ type: 'petrified', defenseBonus: 200, rounds: 3 });\n" +
            "                    this._addLog(`\\u{1FAA8} ${eName} meets ${petrifyTarget.name}'s gaze — PETRIFIED! (3 rounds, +200 def)`);\n" +
            "                } else {\n" +
            "                    this._addLog(`\\u{1FAA8} ${eName} attempts to petrify ${petrifyTarget.name}, but they avert their eyes!`);\n" +
            "                }\n" +
            "            }";
        src = src.slice(0, mi1) + mNewBlock + src.slice(mi2);
        console.log('OK   medusa-petrify');
        ok++;
    }
}

if (ok > 0) {
    fs.writeFileSync(filePath, src.replace(/\n/g, '\r\n'), 'utf8');
    console.log('Written (' + ok + '/2 patches).');
} else {
    console.log('Nothing written.');
}
