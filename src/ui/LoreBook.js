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
        lines.push('Incorporeal: immune to Druid Entangle \u2014 physical vines pass harmlessly through this creature');
        lines.push('Incorporeal: cannot be paralyzed by Ghoul touch or held by Treant');
        lines.push('Incorporeal: immune to Rogue Backstab Bleed \u2014 has no blood to shed');
        lines.push('Incorporeal: immune to Rogue Captured Traps \u2014 mechanisms pass through the creature');
    }
    if (tags.includes('undead')) {
        lines.push('Undead: immune to Ghoul paralysis and poison effects');
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
