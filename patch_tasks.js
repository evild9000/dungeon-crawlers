const fs = require('fs');
const path = require('path');

function patch(filePath, patches) {
    let src = fs.readFileSync(filePath, 'utf8').replace(/\r\n/g, '\n');
    let ok = 0;
    for (const [label, oldStr, newStr] of patches) {
        if (src.includes(oldStr)) {
            src = src.replace(oldStr, newStr);
            console.log('OK   ' + label);
            ok++;
        } else {
            console.log('MISS ' + label);
        }
    }
    if (ok === patches.length) {
        fs.writeFileSync(filePath, src.replace(/\n/g, '\r\n'), 'utf8');
        console.log('Written: ' + path.basename(filePath) + '\n');
    } else {
        console.log('NOT written (' + (patches.length - ok) + ' miss): ' + path.basename(filePath) + '\n');
    }
    return ok === patches.length;
}

// ════════════════════════════════════════════════════════════════
// CombatSystem.js — petrify immunity + drone binding boss immunity
// ════════════════════════════════════════════════════════════════
patch(path.join(__dirname, 'src', 'systems', 'CombatSystem.js'), [

    // 1. Add _isPetrifyImmunePartyMember helper after _isFractureImmunePartyMember
    [
        'add-petrify-immune-helper',
        `    _isFractureImmunePartyMember(target) {
        if (!target || !target.isSummoned) return false;
        if (UNDEAD_TIERS.some(ut => ut.id === target.summonType) || target.summonType === 'demi_lich') return true;
        if (GOLEM_PRESETS[target.summonType]) return true;
        if (target.summonStats?.incorporeal === true) return true;
        return false;
    }`,
        `    _isFractureImmunePartyMember(target) {
        if (!target || !target.isSummoned) return false;
        if (UNDEAD_TIERS.some(ut => ut.id === target.summonType) || target.summonType === 'demi_lich') return true;
        if (GOLEM_PRESETS[target.summonType]) return true;
        if (target.summonStats?.incorporeal === true) return true;
        return false;
    }

    _isPetrifyImmunePartyMember(target) {
        if (!target) return false;
        if (target.isLichForm) return true;
        if (!target.isSummoned) return false;
        if (UNDEAD_TIERS.some(ut => ut.id === target.summonType) || target.summonType === 'demi_lich') return true;
        if (GOLEM_PRESETS[target.summonType]) return true;
        if (target.summonStats?.incorporeal === true) return true;
        return false;
    }`,
    ],

    // 2. Beholder petrify — add immunity check
    [
        'beholder-petrify-immunity',
        `                } else if (beam === 'petrify') {
                    // Stun 3 rounds + +200 defense
                    target = frontRow.length > 0 ? frontRow[Math.floor(Math.random() * frontRow.length)] : anyAlive[Math.floor(Math.random() * anyAlive.length)];
                    if (Math.random() < 0.5) {
                        target.webbedRounds = Math.max(target.webbedRounds || 0, 3);
                        target.addEffect({ type: 'petrified', defenseBonus: 200, rounds: 3 });
                        this._addLog(\`\u{1FAA8} Beholder: Petrify Ray hits \${target.name}! (locked 3 rounds, +200 def — turned to stone!)\`);
                    } else {
                        this._addLog(\`\u{1FAA8} Beholder: Petrify Ray misses \${target ? target.name : 'target'}!\`);
                    }`,
        `                } else if (beam === 'petrify') {
                    // Stun 3 rounds + +200 defense; incorporeal/construct/elemental/undead immune
                    target = frontRow.length > 0 ? frontRow[Math.floor(Math.random() * frontRow.length)] : anyAlive[Math.floor(Math.random() * anyAlive.length)];
                    if (this._isPetrifyImmunePartyMember(target)) {
                        this._addLog(\`\u{1FAA8} Beholder: Petrify Ray hits \${target.name} — immune to petrification!\`);
                    } else if (Math.random() < 0.5) {
                        target.webbedRounds = Math.max(target.webbedRounds || 0, 3);
                        target.addEffect({ type: 'petrified', defenseBonus: 200, rounds: 3 });
                        this._addLog(\`\u{1FAA8} Beholder: Petrify Ray hits \${target.name}! (locked 3 rounds, +200 def — turned to stone!)\`);
                    } else {
                        this._addLog(\`\u{1FAA8} Beholder: Petrify Ray misses \${target ? target.name : 'target'}!\`);
                    }`,
    ],

    // 3. Medusa petrify — add immunity check for consistency
    [
        'medusa-petrify-immunity',
        `            // Petrify attempt
            if (Math.random() < 0.50 && anyAlive.length > 0) {
                const frontRow = this.aliveFront;
                const petrifyTarget = frontRow.length > 0 ? frontRow[Math.floor(Math.random() * frontRow.length)] : anyAlive[Math.floor(Math.random() * anyAlive.length)];
                if (Math.random() < 0.50) {
                    this._tryApplyStun(petrifyTarget); // stun resist may block the stunned flag only
                    petrifyTarget.webbedRounds = Math.max(petrifyTarget.webbedRounds || 0, 3);
                    petrifyTarget.addEffect({ type: 'petrified', defenseBonus: 200, rounds: 3 });
                    this._addLog(\`\u{1FAA8} \${eName} meets \${petrifyTarget.name}'s gaze — PETRIFIED! (3 rounds, +200 def)\`);
                } else {
                    this._addLog(\`\u{1FAA8} \${eName} attempts to petrify \${petrifyTarget.name}, but they avert their eyes!\`);
                }
            }`,
        `            // Petrify attempt — incorporeal/construct/elemental/undead immune
            if (Math.random() < 0.50 && anyAlive.length > 0) {
                const frontRow = this.aliveFront;
                const petrifyTarget = frontRow.length > 0 ? frontRow[Math.floor(Math.random() * frontRow.length)] : anyAlive[Math.floor(Math.random() * anyAlive.length)];
                if (this._isPetrifyImmunePartyMember(petrifyTarget)) {
                    this._addLog(\`\u{1FAA8} \${eName} tries to meet \${petrifyTarget.name}'s gaze — immune to petrification!\`);
                } else if (Math.random() < 0.50) {
                    this._tryApplyStun(petrifyTarget);
                    petrifyTarget.webbedRounds = Math.max(petrifyTarget.webbedRounds || 0, 3);
                    petrifyTarget.addEffect({ type: 'petrified', defenseBonus: 200, rounds: 3 });
                    this._addLog(\`\u{1FAA8} \${eName} meets \${petrifyTarget.name}'s gaze — PETRIFIED! (3 rounds, +200 def)\`);
                } else {
                    this._addLog(\`\u{1FAA8} \${eName} attempts to petrify \${petrifyTarget.name}, but they avert their eyes!\`);
                }
            }`,
    ],

    // 4. Drone binding — add boss/mega-boss immunity
    [
        'drone-binding-boss-immunity',
        `            case 6: { // Arcane bindings — reduce target atk & def, incorporeal immune
                const targets = this.aliveHostileEnemies.filter(e =>
                    !this._getEnemyTags(e).includes('incorporeal'));
                if (targets.length === 0) {
                    this._addLog(\`\${ico} Enchanted Drone fires bindings — all targets are incorporeal!\`);
                    break;
                }`,
        `            case 6: { // Arcane bindings — reduce target atk & def, incorporeal+boss immune
                const targets = this.aliveHostileEnemies.filter(e =>
                    !this._getEnemyTags(e).includes('incorporeal') && !e.isBoss && !e.isMegaBoss);
                if (targets.length === 0) {
                    this._addLog(\`\${ico} Enchanted Drone fires bindings — no valid targets!\`);
                    break;
                }`,
    ],
]);

// ════════════════════════════════════════════════════════════════
// index.html — help text updates
// ════════════════════════════════════════════════════════════════
patch(path.join(__dirname, 'index.html'), [

    // 1. Petrified status entry — add immunity note and mention Medusa
    [
        'petrified-immunity',
        '<div class="help-row"><b>&#x1FAA8; Petrified</b> (Beholder) — the Beholder\'s Petrify Ray turns the target to stone: immobilized for 3 rounds (turn skipped) <em>and</em> grants +200 defense while petrified, making the target nearly impervious to damage during that time.</div>',
        '<div class="help-row"><b>&#x1FAA8; Petrified</b> (Beholder / Medusa) — the target is turned to stone: immobilized for 3 rounds (turn skipped) <em>and</em> gains +200 defense while petrified, making them nearly impervious to damage during that time. <b>Immune: incorporeal, construct, and elemental party members</b> (golems, spectres, ghosts, and undead summons cannot be petrified).</div>',
    ],

    // 2. Drone binding — add incorporeal and boss immunity
    [
        'drone-binding-help',
        '<div class="help-row"><b>&#x2699;&#xFE0F; Drone Binding</b> (Artificer combat drone) — the drone fires a binding shot that reduces the target\'s attack and defense for several rounds.</div>',
        '<div class="help-row"><b>&#x2699;&#xFE0F; Drone Binding</b> (Artificer combat drone) — the drone fires a binding shot that reduces the target\'s attack and defense for several rounds. <b>Immune: incorporeal enemies</b> (bindings pass through spectral forms) <b>and bosses/mega-bosses</b> (too powerful to be ensnared).</div>',
    ],

    // 3. Pixie totem poison — explain poison immunity
    [
        'pixie-totem-poison-help',
        '<div class="help-row"><b>&#x1F9DA; Pixie Totem Poison</b> (Ranger pixie totem) — applied on ranged and explosive hits while the pixie totem is active. A standard poison DoT per round.</div>',
        '<div class="help-row"><b>&#x1F9DA; Pixie Totem Poison</b> (Ranger pixie totem) — applied on ranged and explosive hits while the pixie totem is active. A standard poison DoT per round. <b>Immune: undead</b> (no living biology), <b>and any enemy with explicit poison immunity</b> (fire elementals, certain demons — check their lore entry).</div>',
    ],

    // 4. Monster tags section — replace with full tag list
    [
        'monster-tags-section',
        `            <div class="help-section">
                <div class="help-section-title">Monster Tags &amp; Special Powers</div>
                <div class="help-row">Some monsters carry tags that unlock class interactions. Mouse over an enemy card in combat to see its tag line.</div>
                <div class="help-row"><b>&#x1F9DF; Undead</b> — vulnerable to paladin <b>Smite</b> (bonus damage &amp; instakill), <b>AoE Smite</b>, and <b>Divine Judgment</b> (L30, % current HP). Also targeted by cleric <b>Turn Undead</b> (L6, 2× magic damage &times;(1 + 5%/level) + debuff to all undead). Necromancer life-drain rules also apply.</div>
                <div class="help-row"><b>&#x1F608; Demon</b> — vulnerable to paladin <b>Smite</b> bonus damage, instakill chance, <b>AoE Smite</b>, and <b>Divine Judgment</b> (L30, % current HP).</div>
                <div class="help-row"><b>&#x1F43A; Beast</b> — wild creatures; ranger and druid summons count as beasts.</div>
                <div class="help-row"><b>&#x1F47B; Incorporeal</b> — spectral creatures (fire, air, and water elementals; spectres; ghosts) pass through physical bindings. <b>Cannot be Entangled</b> (druid vines pass through them), <b>immune to stun, hold, and paralysis</b> from all sources, and <b>immune to web and mummy rot</b>. They can still be damaged normally. Undead with incorporeal status (spectre, ghost) are also immune to poison. Wolf summon <b>Bleed</b> does not apply to undead enemies.</div>
            </div>`,
        `            <div class="help-section">
                <div class="help-section-title">Monster Tags &amp; Special Powers</div>
                <div class="help-row">Some monsters carry tags that unlock class interactions. Mouse over an enemy card in combat to see its tag line.</div>
                <div class="help-row"><b>&#x1F9DF; Undead</b> — vulnerable to paladin <b>Smite</b> (bonus damage &amp; instakill chance), <b>AoE Smite</b>, and <b>Divine Judgment</b> (L30, % current HP). Targeted by cleric <b>Turn Undead</b> (2× magic damage + debuff). Necromancer life-drain rules also apply. Immune to poison, stun, paralysis, bleed, and mummy rot. Can be held by treant/faerie queen.</div>
                <div class="help-row"><b>&#x1F608; Demon</b> — vulnerable to paladin <b>Smite</b>, <b>AoE Smite</b>, and <b>Divine Judgment</b> (bonus damage &amp; instakill chance). Also targeted by cleric <b>Banishment</b> (L30): cleric-level% instant destruction, or &times;20 holy force damage on survival. No inherent status immunities by tag.</div>
                <div class="help-row"><b>&#x1F409; Dragon</b> — targeted by paladin <b>Dragonslayer</b> (L25): Smite and AoE Smite also hit dragons; active Dragonslayer with shield reduces dragon magic/AoE damage to the whole party by (paladin level + 10)%, capped at 90%. Also targeted by <b>Divine Judgment</b> when Dragonslayer is active. No inherent status immunities by tag alone (individual dragons carry specific elemental immunities).</div>
                <div class="help-row"><b>&#x1F43A; Beast</b> — wild creatures. Ranger and druid summons count as beasts. No inherent status immunities by tag.</div>
                <div class="help-row"><b>&#x1F9D1; Humanoid</b> — intelligent mortal creatures (orcs, goblins, cultists, giants, dark elves, etc.). Can be <b>Charmed</b> by bard Charm Monster (L20). No inherent status immunities by tag.</div>
                <div class="help-row"><b>&#x1F9F1; Construct</b> — artificial beings (gargoyles, golems, fire elementals). Immune to <b>Bard Charm Monster</b> (no mind to enchant). Immune to stun, paralysis, bleed, and mummy rot. Can be held by treant/faerie queen. If also incorporeal, additionally immune to web, hold, entangle, and petrification.</div>
                <div class="help-row"><b>&#x1F525; Elemental</b> — beings of pure elemental energy (fire, air, water, earth elementals). Immune to <b>Bard Charm Monster</b>. Vulnerable to cleric <b>Banishment</b> (L30). Immune to stun, paralysis, bleed, and mummy rot. Individual elementals carry specific elemental immunities (e.g. fire elementals immune to fire). If also incorporeal, immune to web, hold, entangle, and petrification.</div>
                <div class="help-row"><b>&#x1F47B; Incorporeal</b> — spectral creatures (spectres, ghosts, certain elementals) that pass through physical bindings. <b>Cannot be Entangled</b>, <b>immune to web, hold, paralysis, stun, petrification, and drone bindings</b>. Also immune to bleed and mummy rot. Undead incorporeal creatures (spectre, ghost) are additionally immune to poison. Can still be damaged normally.</div>
                <div class="help-row"><b>&#x1F577;&#xFE0F; Vermin</b> — small scurrying creatures (spiders, rats, bats, centipedes, cave fishers, wasps). No special class interactions or tag-based immunities. Often carry poison or web abilities as individual traits.</div>
                <div class="help-row"><b>&#x1F47E; Monster</b> — catch-all for unclassified creatures (mimics, spore fungi, shriekers, harpies, nagas, gelatinous cubes, etc.). No special class interactions or tag-based immunities.</div>
                <div class="help-row"><b>&#x1F9E0; Aberration</b> — alien or eldritch entities that defy natural classification (mind flayers, tentacle horrors, beholders, star spawn). No special class interactions or tag-based immunities by tag alone, but individual aberrations often carry powerful unique abilities.</div>
            </div>`,
    ],
]);

// ════════════════════════════════════════════════════════════════
// LoreBook.js — add petrify immunity to incorporeal line
// ════════════════════════════════════════════════════════════════
patch(path.join(__dirname, 'src', 'ui', 'LoreBook.js'), [
    [
        'lorebook-incorporeal-petrify',
        "lines.push('Incorporeal: immune to stun, hold, and paralysis — all CC effects pass through the ethereal form');",
        "lines.push('Incorporeal: immune to stun, hold, paralysis, and petrification — all CC effects pass through the ethereal form');\n        lines.push('Incorporeal: immune to Artificer Drone Arcane Bindings (already noted above) and Beholder/Medusa Petrify Ray');",
    ],
]);
