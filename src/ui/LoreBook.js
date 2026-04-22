import { ENEMY_TYPES } from '../utils/constants.js';
import { generateEnemySprite } from '../utils/SpriteGenerator.js';

// Tag display info: key -> { label, color }
const TAG_INFO = {
    undead:    { label: '🧟 Undead',     color: '#8a9a6a' },
    demon:     { label: '😈 Demon',      color: '#c04040' },
    beast:     { label: '🐺 Beast',      color: '#a07040' },
    aberration:{ label: '🧠 Aberration', color: '#8060c0' },
    venomous:  { label: '🐍 Venomous',   color: '#60a040' },
    fireborn:  { label: '🔥 Fireborn',   color: '#d06020' },
    construct: { label: '🪆 Construct',  color: '#7090b0' },
    humanoid:  { label: '🧍 Humanoid',   color: '#709090' },
    monster:   { label: '👾 Monster',    color: '#907070' },
    vermin:    { label: '🐛 Vermin',     color: '#708050' },
    cultist:   { label: '🕯️ Cultist',    color: '#804080' },
};

function buildAbilityList(def) {
    const lines = [];
    if (def.poisonChance)     lines.push(`Venom bite: ${Math.round(def.poisonChance * 100)}% chance to poison on hit`);
    if (def.webChance)        lines.push(`Web: ${Math.round(def.webChance * 100)}% chance to immobilize`);
    if (def.stunChance)       lines.push(`Stunning blow: ${Math.round(def.stunChance * 100)}% chance to stun`);
    if (def.regenPercent)     lines.push(`Regeneration: heals ${Math.round(def.regenPercent * 100)}% max HP each round`);
    if (def.aoeMagic)         lines.push('AoE spell: can hit the entire party (including back row)');
    if (def.aoePoisonChance)  lines.push(`AoE poison: ${Math.round(def.aoePoisonChance * 100)}% per target`);
    if (def.aoeStunChance)    lines.push(`AoE stun: ${Math.round(def.aoeStunChance * 100)}% per target`);
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

        // Level range
        const maxLvl = def.maxLevel ? `Levels 1–${def.maxLevel}` : 'All dungeon levels';

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
