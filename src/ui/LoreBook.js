import { ENEMY_TYPES } from '../utils/constants.js';
import { generateEnemySprite } from '../utils/SpriteGenerator.js';

// Tag display info: key -> { label, color }
const TAG_INFO = {
    undead:       { label: '🧟 Undead',       color: '#8a9a6a' },
    incorporeal:  { label: '👻 Incorporeal',  color: '#aabbcc' },
    demon:        { label: '😈 Demon',        color: '#c04040' },
    beast:        { label: '🐺 Beast',        color: '#a07040' },
    aberration:   { label: '🧠 Aberration',   color: '#8060c0' },
    venomous:     { label: '🐍 Venomous',     color: '#60a040' },
    construct:    { label: '🪆 Construct',    color: '#7090b0' },
    elemental:    { label: '🌀 Elemental',    color: '#60a0c0' },
    humanoid:     { label: '🧍 Humanoid',     color: '#709090' },
    monster:      { label: '👾 Monster',      color: '#907070' },
    vermin:       { label: '🐛 Vermin',       color: '#708050' },
    dragon:       { label: '🐉 Dragon',       color: '#c06020' },
};

function buildAbilityList(def) {
    const lines = [];
    const tags = def.tags || [];

    // Passive tag-based traits
    if (tags.includes('incorporeal')) {
        lines.push('Incorporeal: immune to Druid Entangle — physical vines pass harmlessly through this creature');
        lines.push('Incorporeal: cannot be paralyzed by Ghoul touch or held by Treant');
        lines.push('Incorporeal: immune to Rogue Backstab Bleed — has no blood to shed');
        lines.push('Incorporeal: immune to Rogue Captured Traps — mechanisms pass through the creature');
        lines.push('Incorporeal: immune to Web and constrict effects — ethereal form cannot be physically ensnared');
        lines.push('Incorporeal: immune to Artificer Drone Arcane Bindings — no physical form to ensnare');
        lines.push('Incorporeal: immune to stun from all sources — no solid form to disorient');
    }
    if (tags.includes('undead')) {
        lines.push('Undead: immune to stun from all sources — undead physiology resists physical disruption');
        lines.push('Undead: immune to bleed and poison effects — no living blood or metabolism');
        lines.push('Undead: immune to Ghoul paralysis');
        lines.push('Undead: immune to Bard Charm Monster — cannot be mind-controlled');
    }
    if (tags.includes('elemental')) {
        lines.push('Elemental: immune to Bard Charm Monster — pure elemental energy resists mind magic');
    }
    if (tags.includes('construct')) {
        lines.push('Construct: immune to Bard Charm Monster — no mind to enchant');
    }
    if (tags.includes('dragon')) {
        lines.push('Dragon: Dragonslayer lets level 25 paladins Smite and AoE Smite dragons');
        lines.push('Dragon: shielded level 25 paladins reduce this creature’s magic/AoE damage against the party by (paladin level + 10)%, capped at 90%, before defenses apply');
    }
    // Immunity from the immune[] array on the type definition.
    // Elemental types (fire, cold, lightning, acid, poison) get "damage and DoT" wording.
    // Non-elemental types (stun, poison-as-status) get plain wording.
    if (Array.isArray(def.immune) && def.immune.length > 0) {
        const immuneIcons  = { fire: '🔥', cold: '❄️', lightning: '⚡', acid: '🟢', poison: '☠️', stun: '💫' };
        const elementalSet = new Set(['fire', 'cold', 'lightning', 'acid', 'poison']);
        const elementals   = def.immune.filter(t => elementalSet.has(t));
        const statusTypes  = def.immune.filter(t => !elementalSet.has(t));
        if (elementals.length > 0) {
            const labels = elementals.map(t => `${immuneIcons[t] || '🛡️'} ${t}`).join(', ');
            lines.push(`Elemental Immunity: immune to ${labels} damage and DoT effects`);
        }
        if (statusTypes.length > 0) {
            const labels = statusTypes.map(t => `${immuneIcons[t] || '🛡️'} ${t}`).join(', ');
            lines.push(`Status Immunity: immune to ${labels} effects`);
        }
    }
    if (def.hpMult && def.hpMult > 1) {
        lines.push(`Reinforced: spawns with ${def.hpMult}× normal HP`);
    }
    if (def.defenseMult && def.defenseMult > 1) {
        lines.push(`Fortified: spawns with ${def.defenseMult}× normal defense`);
    }

    // Active combat abilities
    // If a ranged monster also poisons, label it "venom arrow" instead of "venom bite"
    if (def.poisonChance) {
        const label = def.rangedAny ? 'Venom arrow' : 'Venom bite';
        lines.push(`${label}: ${Math.round(def.poisonChance * 100)}% chance to poison on hit (damage over time)`);
    }
    if (def.webChance)        lines.push(`Web: ${Math.round(def.webChance * 100)}% chance to immobilize target for 1 round`);
    if (def.paralyzingBite)   lines.push(`Paralyzing touch: every melee hit paralyzes the target for ${def.paralyzingBite} rounds`);
    if (def.constrict)        lines.push(`Constrict: 35% chance to coil around the target, pinning it for ${def.constrict} rounds`);
    if (def.stunChance)       lines.push(`Stunning blow: ${Math.round(def.stunChance * 100)}% chance to stun on melee hit`);
    if (def.attackDebuff)     lines.push(`Icy chill: freezing melee strikes reduce the target\u2019s attack power by ${def.attackDebuff} for 2 rounds`);
    if (def.regenPercent)     lines.push(`Regeneration: heals ${Math.round(def.regenPercent * 100)}% max HP at the start of each round`);
    if (def.aoeMagic)         lines.push('AoE spell: magic attack hits ALL party members (including back row)');
    if (def.aoeFire)          lines.push('Inferno breath: fire AoE attack — hits all party members, may apply burn');
    if (def.aoePoisonChance)  lines.push(`AoE venom cloud: ${Math.round(def.aoePoisonChance * 100)}% chance per party member to poison`);
    if (def.aoeStunChance)    lines.push(`AoE concussion: ${Math.round(def.aoeStunChance * 100)}% chance per target to stun`);
    if (def.earthquakeChance) lines.push(`Earthquake: ${Math.round(def.earthquakeChance * 100)}% chance per melee turn to slam the ground — AoE melee hit to ALL party members${def.stunChance ? ` (${Math.round(def.stunChance * 100)}% stun on single-target hits)` : ''}`);
    if (def.aoeDrowning)      lines.push('Surging torrent: AoE magic attack hits ALL party members — survivors suffer drowning damage over 3 rounds and −2 defense for 3 rounds');
    if (def.lifeDrain)        lines.push(`Life drain: steals ${Math.round(def.lifeDrain * 100)}% of damage dealt as HP for itself`);
    if (def.phaseStrike)      lines.push('Phase strike: ignores all armor and defense bonuses on hit');
    if (def.rangedAny)        lines.push('Ranged attack: can strike back-row party members from a distance');

    // Phase 13 new monster abilities
    if (def.isBeholderAI)    lines.push('Eye Beams: fires 6 random eye beams per turn — magic blast AoE, death ray, stun ray, anti-magic debuff, petrify, or slow ray');
    if (def.isDragonAI)      lines.push('Dragon Combat: 50% chance — AoE breath weapon with elemental DoT; 50% — 2 claw attacks + 1 bite attack');
    if (def.halfMagicDamage) lines.push('Magic Resistance: takes only half damage from magical attacks');
    if (def.isEttinAI)       lines.push('Twin Heads: attacks twice per turn (one per head)');
    if (def.isFireGiantAI)   lines.push('Fire Giant: +10 melee bonus, attacks twice, fire DoT on hits (50% damage/round)');
    if (def.isIceGiantAI)    lines.push('Ice Giant: +10 melee bonus, attacks twice, ice DoT on hits (50% damage/round)');
    if (def.isStoneGiantAI)  lines.push('Stone Giant: +10 ranged bonus, throws boulders twice, stunning blows');
    if (def.isStormGiantAI)  lines.push('Storm Giant: +10 magic bonus, lightning bolt strikes 3 random back-row members with possible stun');
    if (def.isMedusaAI)      lines.push('Poison Arrows: looses 3 poison arrows per turn that can hit back row; 50% chance each round to petrify a target (stun 3 rounds + +200 defense)');
    if (def.isHydraAI)       lines.push('Multi-Head: attacks with each head every round (6 base + 1 per 5 dungeon levels); regenerates 15% HP per round');
    if (def.isManticoreAI)   lines.push('Spike Volley: 5 ranged attacks per turn (+3 bonus), can hit back row; poison tail DoT equal to damage dealt');
    if (def.isEvilPriestAI)  lines.push('Dark Ministry: 50% chance to mass-heal all non-undead enemies for 15% HP; 50% chance to unleash AoE magic blast');
    if (def.isWerewolfAI)    lines.push('Lycanthropy: regenerates 25% max HP per round; defense bonus (+50%)');
    if (def.isYetiAI)        lines.push('Feral Fury: attacks twice with fists each turn, can stun, applies ice DoT on hits');

    // Phase 14: Level-25+ Deep Dungeon monster abilities
    if (def.isIceDemonAI)           lines.push('Glacial Fury: 4 powerful melee strikes per turn with +5 bonus; each hit applies ice chill (30% bonus cold damage, -2 attack for 2 rounds)');
    if (def.isAcidDemonAI)          lines.push('Acid Assault: AoE acid wave hits all party members (magic damage) with acid DoT (25% per round, -2 def, 3 rounds); 50% chance per turn to summon an Acid Slime minion; falls back to melee if out of mana');
    if (def.isBloatDemonAI)         lines.push('Toxic Volley: 6 ranged bile blasts per turn — each hits any party member and immediately applies poison DoT (33% hit damage per round)');
    if (def.isDracolichAI)          lines.push('Undead Dragon: 50% — random elemental breath (fire/acid/lightning/cold/poison) AoE hits all party; 50% — 2 claw attacks + 1 bite to front row; all undead immunities apply');
    if (def.isEvilNecromancerAI)    lines.push('Dark Sorcery: 60% chance — raises 1-3 random undead minions (skeleton, zombie, ghoul, wight, shadow, wraith…); 40% — AoE necrotic magic blast with necrotic poison DoT on all party');
    if (def.isHellHoundAI)          lines.push('Infernal Predator: 50% — burning bite (melee, single front-row target) + fire DoT; 50% — hellfire breath (AoE magic, front row only) + fire DoT on all hit targets');
    if (def.isEvilBerserkerAI)      lines.push('Berserk Frenzy: attacks (dungeon level ÷ 5) times per turn against the front row (+3 melee bonus each); each primary strike independently rolls for level 25+ follow-up attacks — total blow count can be very high at deep dungeon levels; takes only half damage from all non-magic (physical) attacks');

    // Hag abilities
    if (def.hagCurseChance)         lines.push(`Hag's Curse: ${Math.round(def.hagCurseChance * 100)}% chance per turn to hex a random target — reduces all damage dealt (melee/ranged/magic) and defense by level÷8 for several rounds`);

    // Undead hostile enemy abilities
    if (def.isMummyAI)              lines.push('Mummy Rot: every melee strike inflicts Mummy Rot (3 rounds) — completely blocks all healing on the target');
    if (def.isRevenantAI)           lines.push('Death Denied: phase-strikes any party member (ignores armor); when first reduced to 0 HP, rises again at 50% HP in a permanent ENRAGED state (+damage for rest of combat)');
    if (def.isBoneArcherAI)         lines.push('Bone Arrow: ranged attack hits any row; at dungeon level 15+, fires a 3-arrow volley per turn; 25% chance per arrow to inflict Fracture (bleed DoT: 30% arrow damage per round)');
    if (def.isPoltergeistAI)        lines.push('Spectral Assault: 50% hurls invisible debris (ranged, 40% stun chance); 50% phase-strikes any party member through armor (ignores all defenses and armor)');
    if (def.isZombieGiantAI)        lines.push('Thunderous Stomp: AoE melee strike at 150% damage to all front-row members — 50% chance per target to knock them Prone (cannot act next round)');
    if (def.isDeathKnightAI)        lines.push('Dark Blade: attacks twice per turn with +2 bonus; 25% chance to block non-magic attacks with shield; 30% chance per turn to inflict Necrotic Curse (reduces all damage dealt for 2 rounds)');

    // Bestiary Expansion — Demons
    if (def.isSuccubusAI)           lines.push('Drain Kiss: ranged magic attack on any party member — drains mana equal to damage dealt; 35% chance to Charm the target (cannot act 1 round); below 50% HP switches to AoE Psychic Shriek hitting all party members');
    if (def.isChainDevilAI)         lines.push('Animated Chains: lashes 2 chain attacks per turn (3 at dungeon level 30+) at any party member; 50% chance per hit to Bind the target in chains (webbed, cannot act for ' + (typeof WEB_DURATION_ROUNDS !== 'undefined' ? WEB_DURATION_ROUNDS : 2) + ' rounds)');
    if (def.isBloodDemonAI)         lines.push('Blood Frenzy: powerful front-row melee +2 bonus; life-steals 40% of damage dealt as HP; on any kill — fully heals to max HP AND gains +2 permanent damage bonus for the rest of combat (stacks)');
    if (def.isPitFiendAI)           lines.push('Hellfire Pillar: 50% chance per turn — calls down an infernal pillar of fire on the ENTIRE party (AoE magic + burn DoT); otherwise delivers 3 crushing melee strikes (+5 bonus) to the front row');
    if (def.isQuasitAI)             lines.push('Venom Swarm: 5 rapid ranged attacks per turn at 60% damage each — ANY party member; every hit injects Quasit Venom (DoT = damage dealt per round, duration = dungeon level ÷ 4) which IGNORES armor on each subsequent tick');

    // Bestiary Expansion — Beasts
    if (def.isGiantCrocodileAI)     lines.push('Death Roll: powerful bite at front row (+2 bonus); if the bite connects — immediately follows with a Death Roll that Webs the target for 2 rounds AND applies a bleed DoT (30% bite damage per round)');
    if (def.isChimeraAI)            lines.push('Triple Assault: attacks with ALL THREE heads every round simultaneously — Lion Claws (2 melee hits on front row, each opens a bleed DoT equal to damage dealt); Goat Horns (single massive melee hit at 150% damage with stun attempt); Dragon Breath (fire AoE magic hitting the ENTIRE party with burn DoT)');
    if (def.isWyvernAI)             lines.push('Aerial Predator: each turn delivers all of — Claw (front-row melee); Poison Sting (ranged, any target, double-strength venom DoT); and 25% chance of a Dive-Bomb melee strike on a back-row target normally safe from melee');
    if (def.isDisplacerBeastAI)     lines.push('Displacement: illusory doubles grant a permanent 40% dodge chance against ALL melee and ranged physical attacks — this dodge never deactivates and cannot be disabled');
    if (def.isRemorhazAI)           lines.push('Searing Hide: 30% chance — any physical attack on this creature burns the attacker (fire DoT equal to a fraction of the attacker\'s damage); takes only half damage from magic; immune to fire and cold');
    if (def.isThunderbirdAI)        lines.push('Storm Strike: 2 ranged lightning attacks per turn; 35% chance each bolt chains to an adjacent party member for half damage; every 3rd round unleashes a Thunderclap AoE against the front row (25% stun chance per target)');
    if (def.isRustMonsterAI)        lines.push('Corrosive Touch: on any hit against a target wearing Chainmail or Plate Mail — permanently corrodes the armor (defense penalty = rust monster level − 5, lasts the entire combat); this debuff cannot be removed by Cleric or any cleansing ability');

    // Bestiary Expansion — Humanoids
    if (def.isWitchDoctorAI)        lines.push('Dark Rituals: each turn rolls one of four spells — Hex (reduces target defense for 2 rounds); Wither (reduces target\'s ALL damage output by level÷4 for level÷4 rounds); Plague (AoE poison DoT on whole party); Soul Siphon (tears 20% of target\'s MAX HP from current HP ignoring armor, adds that HP to witch doctor\'s current and maximum HP); spawns with only 50% normal HP');
    if (def.isGladiatorAI)          lines.push('Arena Master: 2 melee attacks per turn (+2 bonus); 30% chance to Taunt the entire party (reduces all damage dealt for 1 round); 40% chance — any target it strikes retaliates for 50% of the damage received back at the gladiator; high base defense');
    if (def.isAssassinLordAI)       lines.push('Shadow Strike: on its first turn, phase-strikes the lowest-HP party member for 3× damage (ignores all armor and defenses); thereafter attacks twice per turn (+3 bonus) with 30% bleed chance on hits; 25% dodge chance vs all physical attacks');
    if (def.isBattleMageAI)         lines.push('Arcane Warrior: alternates — odd turns deliver 2 melee strikes (+20% arcane bonus); even turns unleash an AoE magic blast on the whole party; below 50% HP enters Arcane Overload — performs BOTH attacks in one turn but takes 15% max HP backlash damage');

    // Bestiary Expansion — Constructs
    if (def.isIronGolemAI)          lines.push('Iron Juggernaut: single devastating melee strike (+5 bonus); once per combat releases a Poison Gas Breath cloud (guaranteed poison DoT on ALL party members); takes only half magic damage; triple HP, double defense');
    if (def.isClockworkHorrorAI)    lines.push('Mechanical Fury: 3 rapid melee strikes per turn (75% damage each) at any party member; FULLY IMMUNE to all magic, AoE, and DoT effects — spells, fire, poison, acid and all elemental damage deal zero; takes DOUBLE damage from acid');
    if (def.isGargoyleSentinelAI)   lines.push('Stone Shell — Phase 1: while above 50% HP takes only 50% damage from ALL sources; regenerates 10% HP per round; Phase 2 (≤50% HP): shell cracks — loses damage reduction, gains +5 melee bonus AND adds AoE Wing Buffet (front-row melee AoE with stun attempt each target)');
    if (def.fullMagicImmune && !def.isGargoyleSentinelAI) lines.push('Total Magic Immunity: completely unaffected by all magical attacks, AoE, and damage-over-time effects');

    // Bestiary Expansion — Aberrations
    if (def.isGibberingMoutherAI)   lines.push('Gibbering Madness: attacks ALL front-row members each turn (individual rolls per target at 75% damage); 30% chance per hit — target is driven to gibbering madness (cannot act 1 round); at 50% HP the original form splits into 2 smaller copies (each with 30% of original HP) — only the original can split');
    if (def.isAbolethAI)            lines.push('Psychic Domination: AoE psychic assault hits ALL party members; 40% chance per target to mentally enslave them (cannot act for dungeon level ÷ 10 rounds); takes only half damage from physical attacks; Water Elemental Synergy: if a water elemental is present in the same combat, both the aboleth AND the elemental deal +25% damage');
    if (def.isStarSpawnAI)          lines.push('Reality Distortion: each turn applies a random eldritch effect to EVERY party member independently — 35% magic damage, 20% mana drain (20% max mana), 20% Wither debuff (−damage 2 rds), 25% stun attempt; completely immune to all DoT effects (poison, burn, acid, bleed, etc.)');

    // Bestiary Expansion — Mixed
    if (def.isVoidWraithAI)         lines.push('Void Drain: phase-strikes any party member (ignores ALL armor and defense); drains 25% of damage dealt as both HP AND mana simultaneously from the target; takes only half damage from physical attacks; on each kill gains a permanent stacking +10% damage bonus');
    if (def.isVampireLordAI)        lines.push('Vampire Lord: 40% life drain on melee hits; summons Vampire Spawn (40% per turn); AoE Hypnotic Gaze charms 1-2 party members for 2 rounds (20% per turn); when HP drops below 15% dissolves into Gaseous Form (takes only 1 damage from all sources, regenerates 10% HP per round for 2 rounds, then re-solidifies); Paladin Smite deals triple bonus damage');
    if (def.isMyconidSovereignAI)   lines.push('Spore Sovereign: every turn blasts the ENTIRE party with toxic spore cloud (AoE magic + 40% poison DoT); 60% chance per turn to spawn 1-2 Myconid minions; higher HP, defense, and minimum dungeon level than standard Myconid');

    return lines;
}

export class LoreBook {
    constructor() {
        this.isOpen = false;
        this._pages = [];   // array of type keys in sorted order
        this._pageIdx = 0;
        this._discovered = new Set();
        this._el = null;
        this._build();
    }

    _build() {
        const overlay = document.createElement('div');
        overlay.id = 'lore-book-overlay';
        overlay.style.cssText = `
            display:none; position:fixed; inset:0; z-index:9000;
            background:rgba(0,0,0,0.75); align-items:center; justify-content:center;
        `;

        const book = document.createElement('div');
        book.style.cssText = `
            position:relative; background:#1a140e; border:2px solid #6b4a1e;
            border-radius:8px; width:min(520px,96vw); max-height:90vh;
            display:flex; flex-direction:column; box-shadow:0 0 40px #000a;
            font-family:'Segoe UI',sans-serif; color:#e0d5c0; overflow:hidden;
        `;

        // Header
        const header = document.createElement('div');
        header.style.cssText = `
            background:#2a1c0e; border-bottom:1px solid #6b4a1e; padding:12px 16px;
            display:flex; align-items:center; justify-content:space-between; flex-shrink:0;
        `;
        const title = document.createElement('div');
        title.textContent = '📖 Lore Book';
        title.style.cssText = 'font-size:18px; font-weight:bold; color:#f5d98a;';

        this._pageCounter = document.createElement('div');
        this._pageCounter.style.cssText = 'font-size:12px; color:#a09070;';

        const closeBtn = document.createElement('button');
        closeBtn.textContent = '✕';
        closeBtn.style.cssText = `
            background:none; border:1px solid #6b4a1e; color:#e0d5c0; cursor:pointer;
            padding:2px 8px; border-radius:4px; font-size:14px;
        `;
        closeBtn.addEventListener('click', () => this.hide());
        header.appendChild(title);
        header.appendChild(this._pageCounter);
        header.appendChild(closeBtn);

        // Body
        this._body = document.createElement('div');
        this._body.style.cssText = `
            flex:1; overflow-y:auto; padding:20px;
            scrollbar-color:#6b4a1e #1a140e;
        `;

        // Navigation footer
        const nav = document.createElement('div');
        nav.style.cssText = `
            background:#2a1c0e; border-top:1px solid #6b4a1e; padding:10px 16px;
            display:flex; align-items:center; justify-content:space-between; flex-shrink:0;
        `;

        this._prevBtn = document.createElement('button');
        this._prevBtn.textContent = '← Prev';
        this._prevBtn.style.cssText = `
            background:#3a2810; border:1px solid #6b4a1e; color:#e0d5c0; cursor:pointer;
            padding:6px 14px; border-radius:4px; font-size:13px;
        `;
        this._prevBtn.addEventListener('click', () => this._navigate(-1));

        this._nextBtn = document.createElement('button');
        this._nextBtn.textContent = 'Next →';
        this._nextBtn.style.cssText = `
            background:#3a2810; border:1px solid #6b4a1e; color:#e0d5c0; cursor:pointer;
            padding:6px 14px; border-radius:4px; font-size:13px;
        `;
        this._nextBtn.addEventListener('click', () => this._navigate(1));

        this._navLabel = document.createElement('div');
        this._navLabel.style.cssText = 'font-size:13px; color:#c0a86a; text-align:center; flex:1; padding:0 12px;';

        nav.appendChild(this._prevBtn);
        nav.appendChild(this._navLabel);
        nav.appendChild(this._nextBtn);

        book.appendChild(header);
        book.appendChild(this._body);
        book.appendChild(nav);
        overlay.appendChild(book);
        document.body.appendChild(overlay);

        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) this.hide();
        });

        // Arrow key navigation
        this._keyHandler = (e) => {
            if (!this.isOpen) return;
            if (e.key === 'ArrowLeft')  this._navigate(-1);
            if (e.key === 'ArrowRight') this._navigate(1);
            if (e.key === 'Escape')     this.hide();
        };
        window.addEventListener('keydown', this._keyHandler);

        this._el = overlay;
    }

    show(discoveredSet) {
        this._discovered = discoveredSet || new Set();

        // Build sorted page list from discovered monsters, preserving ENEMY_TYPES order
        this._pages = Object.keys(ENEMY_TYPES).filter(k => this._discovered.has(k));

        if (this._pages.length === 0) {
            this._pages = [];
            this._body.innerHTML = `
                <div style="text-align:center;padding:40px;color:#a09070;font-size:15px;">
                    No monsters encountered yet.<br>
                    <span style="font-size:12px;">Explore the dungeon to fill the Lore Book.</span>
                </div>`;
            this._pageCounter.textContent = '';
            this._prevBtn.disabled = true;
            this._nextBtn.disabled = true;
            this._navLabel.textContent = '';
            this._el.style.display = 'flex';
            this.isOpen = true;
            return;
        }

        this._pageIdx = 0;
        this._render();
        this._el.style.display = 'flex';
        this.isOpen = true;
    }

    hide() {
        this._el.style.display = 'none';
        this.isOpen = false;
    }

    _navigate(dir) {
        if (!this._pages.length) return;
        this._pageIdx = (this._pageIdx + dir + this._pages.length) % this._pages.length;
        this._render();
    }

    _render() {
        const key = this._pages[this._pageIdx];
        const def = ENEMY_TYPES[key];
        if (!def) return;

        const total = this._pages.length;
        const idx = this._pageIdx;
        this._pageCounter.textContent = `${idx + 1} / ${total}`;
        this._prevBtn.disabled = total <= 1;
        this._nextBtn.disabled = total <= 1;
        this._navLabel.textContent = total > 1 ? def.name : '';

        // Tags
        const tags = def.tags || [];
        const tagHtml = tags.map(t => {
            const info = TAG_INFO[t] || { label: t, color: '#808080' };
            return `<span style="background:${info.color}22;border:1px solid ${info.color}88;color:${info.color};
                padding:2px 8px;border-radius:3px;font-size:11px;margin-right:4px;">${info.label}</span>`;
        }).join('');

        // Special abilities
        const abilities = buildAbilityList(def);
        const abilityHtml = abilities.length
            ? abilities.map(a => `<li style="margin-bottom:4px;">${a}</li>`).join('')
            : '<li style="color:#806050;">No special abilities</li>';

        // All monsters spawn on all dungeon levels
        const maxLvl = 'Spawns on all dungeon levels';

        // Sprite
        const spriteCanvas = generateEnemySprite(key, 42);
        spriteCanvas.style.cssText = `
            width:96px; height:96px; image-rendering:pixelated;
            border:1px solid #6b4a1e; border-radius:4px; background:#0a0806;
        `;

        this._body.innerHTML = '';

        // Top row: sprite + name/tags
        const topRow = document.createElement('div');
        topRow.style.cssText = 'display:flex; gap:16px; align-items:flex-start; margin-bottom:16px;';

        const spriteWrap = document.createElement('div');
        spriteWrap.style.cssText = 'flex-shrink:0;';
        spriteWrap.appendChild(spriteCanvas);

        const infoBlock = document.createElement('div');
        infoBlock.style.cssText = 'flex:1;';
        infoBlock.innerHTML = `
            <div style="font-size:22px; font-weight:bold; color:#f5d98a; margin-bottom:6px;">${def.name}</div>
            <div style="margin-bottom:8px;">${tagHtml || '<span style="color:#806050;font-size:12px;">No tags</span>'}</div>
            <div style="font-size:12px; color:#a09070;">${maxLvl}</div>
        `;

        topRow.appendChild(spriteWrap);
        topRow.appendChild(infoBlock);
        this._body.appendChild(topRow);

        // Divider
        const divider = document.createElement('div');
        divider.style.cssText = 'height:1px; background:#3a2810; margin-bottom:14px;';
        this._body.appendChild(divider);

        // Abilities section
        const abSection = document.createElement('div');
        abSection.innerHTML = `
            <div style="font-size:13px; font-weight:bold; color:#c8a860; margin-bottom:8px; text-transform:uppercase; letter-spacing:1px;">Special Abilities</div>
            <ul style="margin:0; padding-left:20px; font-size:13px; color:#c0b090; line-height:1.7;">
                ${abilityHtml}
            </ul>
        `;
        this._body.appendChild(abSection);
    }
}
