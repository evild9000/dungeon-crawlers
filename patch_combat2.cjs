/**
 * patch_combat2.cjs — applies 10-item feature list to CombatSystem.js
 *
 *  1. Split log: add playerLog / enemyLog arrays + _logTarget routing in _addLog
 *  2. Set _logTarget = 'enemy' around enemy turns, 'player' otherwise
 *  3. _tryStunEnemy: make boss/megaboss FULLY IMMUNE (no random — just block)
 *  4. Quivering Palm: add doublings counter, cap at 10
 *  5. Defend Mode: add guards in meleeAttack / rangedAttack
 *  6. AoE attacks: use aliveHostileEnemies for magic, scatter splash, AoE smite, turn undead, FQ
 */
const fs = require('fs');
let src = fs.readFileSync('src/systems/CombatSystem.js', 'utf8');
const hasCRLF = src.includes('\r\n');
src = src.replace(/\r\n/g, '\n');

let patches = 0;
function patch(label, old, neu) {
    if (!src.includes(old)) {
        console.error(`ERROR — "${label}" anchor not found`);
        const line0 = old.split('\n')[0].slice(0, 60);
        console.error(`  First line "${line0}" at: ${src.indexOf(line0)}`);
        process.exit(1);
    }
    src = src.replace(old, neu);
    console.log(`OK: ${label}`);
    patches++;
}

// ──────────────────────────────────────────────────────────────────────────────
// 1. Add playerLog / enemyLog / _logTarget to the constructor
// ──────────────────────────────────────────────────────────────────────────────
patch(
    'constructor: add split-log arrays',
    `        this.log = [];`,
    `        this.log = [];
        this.playerLog  = [];   // messages from player-turn actions
        this.enemyLog   = [];   // messages from enemy-turn actions
        this._logTarget = 'player'; // 'player' | 'enemy'`
);

// ──────────────────────────────────────────────────────────────────────────────
// 2. Route _addLog to split logs
// ──────────────────────────────────────────────────────────────────────────────
patch(
    '_addLog: route to playerLog / enemyLog',
    `    _addLog(msg) { this.log.push(msg); }`,
    `    _addLog(msg) {
        this.log.push(msg);
        if (this._logTarget === 'enemy') {
            this.enemyLog.push(msg);
            if (this.enemyLog.length > 200) this.enemyLog.shift();
        } else {
            this.playerLog.push(msg);
            if (this.playerLog.length > 200) this.playerLog.shift();
        }
    }`
);

// ──────────────────────────────────────────────────────────────────────────────
// 3. Set _logTarget = 'enemy' when executing enemy turn
//    Find the _executeOneEnemyTurn entry point
// ──────────────────────────────────────────────────────────────────────────────
patch(
    '_executeOneEnemyTurn: set logTarget enemy',
    `    _executeOneEnemyTurn(e) {`,
    `    _executeOneEnemyTurn(e) {
        this._logTarget = 'enemy';`
);

// After _advanceEnemyTurn() or equivalent at the end of enemy turn handler
// We need to reset _logTarget after each enemy turn is done.
// Find where _advanceEnemyTurn is called and reset there.
// But _advanceEnemyTurn can be called mid-method. Better to reset at _beginInitiativeRound / player turn start.
// Patch _advancePlayerTurn to reset logTarget to 'player'
patch(
    '_advancePlayerTurn: reset logTarget to player',
    `    _advancePlayerTurn() {`,
    `    _advancePlayerTurn() {
        this._logTarget = 'player';`
);

// Also reset at _beginInitiativeRound (round start is player-side context)
patch(
    '_beginInitiativeRound: reset logTarget to player',
    `    _beginInitiativeRound() {`,
    `    _beginInitiativeRound() {
        this._logTarget = 'player';`
);

// ──────────────────────────────────────────────────────────────────────────────
// 4. _tryStunEnemy: full immunity for boss / mega-boss (no random)
// ──────────────────────────────────────────────────────────────────────────────
// Use a different approach: replace just the isMegaBoss and isBoss checks
patch(
    '_tryStunEnemy megaBoss check: remove random, make immune',
    `        if (enemy.isMegaBoss && Math.random() < STUN_MEGABOSS_RESIST_CHANCE) {`,
    `        if (enemy.isMegaBoss) {`
);
patch(
    '_tryStunEnemy megaBoss log: say immune',
    'resists the stun! (mega-boss ${Math.round(STUN_MEGABOSS_RESIST_CHANCE * 100)}% resist)',
    'is immune to stun!'
);
patch(
    '_tryStunEnemy boss check: remove random, make immune',
    `        if (enemy.isBoss && Math.random() < STUN_BOSS_RESIST_CHANCE) {`,
    `        if (enemy.isBoss) {`
);
patch(
    '_tryStunEnemy boss log: say immune',
    'resists the stun! (boss ${Math.round(STUN_BOSS_RESIST_CHANCE * 100)}% resist)',
    'is immune to stun!'
);

// ──────────────────────────────────────────────────────────────────────────────
// 5. Quivering Palm: add doublings counter, cap at 10
// ──────────────────────────────────────────────────────────────────────────────
patch(
    'Quivering Palm: add doublings field on fresh application',
    `                targetEnemy.activeEffects.push({
                    type:   'quivering_palm',
                    rounds: newDur,
                    damage: base,   // starts at base roll; doubles after each tick
                });`,
    `                targetEnemy.activeEffects.push({
                    type:      'quivering_palm',
                    rounds:    newDur,
                    damage:    base,   // starts at base roll; doubles after each tick
                    doublings: 0,      // tracks how many times damage has doubled (cap 10)
                });`
);

patch(
    'Quivering Palm: cap doubling at 10 in tick',
    `                    fx.damage *= 2;  // doubles for next round`,
    `                    // Doubles each round, but caps at 10 total doublings
                    if ((fx.doublings || 0) < 10) {
                        fx.damage *= 2;
                        fx.doublings = (fx.doublings || 0) + 1;
                    }`
);

// ──────────────────────────────────────────────────────────────────────────────
// 6. Defend Mode: guard in meleeAttack and rangedAttack
// ──────────────────────────────────────────────────────────────────────────────
patch(
    'meleeAttack: defend mode guard',
    `    meleeAttack(targetEnemy) {
        const m = this.currentMember;
        if (!m || m.health <= 0) return;`,
    `    meleeAttack(targetEnemy) {
        const m = this.currentMember;
        if (!m || m.health <= 0) return;
        if (m.isDefendMode) {
            this._addLog(\`\${m.name} is in Defend Mode — attacks are disabled.\`);
            return;
        }`
);

patch(
    'rangedAttack: defend mode guard',
    `    rangedAttack(targetEnemy) {
        const m = this.currentMember;
        if (!m || m.health <= 0) return;`,
    `    rangedAttack(targetEnemy) {
        const m = this.currentMember;
        if (!m || m.health <= 0) return;
        if (m.isDefendMode) {
            this._addLog(\`\${m.name} is in Defend Mode — attacks are disabled.\`);
            return;
        }`
);

// ──────────────────────────────────────────────────────────────────────────────
// 7. AoE attacks: use aliveHostileEnemies so charmed monsters are excluded
// ──────────────────────────────────────────────────────────────────────────────

// Magic attack: the main magic hit pool
patch(
    'magicAttack: use aliveHostileEnemies for target pool',
    `        const alive = this.aliveEnemies;\n\n        // Each enemy may only be hit once`,
    `        const alive = this.aliveHostileEnemies;\n\n        // Each enemy may only be hit once`
);

// Turn undead: target all undead enemies (should be hostile only)
patch(
    'clericTurnUndead: use aliveHostileEnemies',
    `        const undead = this.aliveEnemies.filter(e => {`,
    `        const undead = this.aliveHostileEnemies.filter(e => {`
);

// AoE Smite target pool
patch(
    'paladinAoeSmite: use aliveHostileEnemies',
    `        const smitableEnemies = this.aliveEnemies.filter(e => {`,
    `        const smitableEnemies = this.aliveHostileEnemies.filter(e => {`
);

// Summon turns use aliveEnemies — change to aliveHostileEnemies so charmed are excluded
patch(
    '_takeSummonTurn: use aliveHostileEnemies',
    `    _takeSummonTurn(m) {\n        const stats = m.summonStats || {};\n        const targets = this.aliveEnemies;\n        if (targets.length === 0) return;`,
    `    _takeSummonTurn(m) {\n        const stats = m.summonStats || {};\n        const targets = this.aliveHostileEnemies;\n        if (targets.length === 0) return;`
);

// Scatter shot splash: others should exclude charmed
patch(
    'scatterShot splash: use aliveHostileEnemies',
    `            const others = this.aliveEnemies.filter(e => e !== targetEnemy);`,
    `            const others = this.aliveHostileEnemies.filter(e => e !== targetEnemy);`
);

// ──────────────────────────────────────────────────────────────────────────────
// Done
// ──────────────────────────────────────────────────────────────────────────────
console.log(`\nAll ${patches} patches applied.`);
if (hasCRLF) src = src.replace(/\n/g, '\r\n');
fs.writeFileSync('src/systems/CombatSystem.js', src);
