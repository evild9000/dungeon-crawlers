/**
 * MinimapUI — full-screen modal minimap of the current dungeon level.
 *
 * Toggled with M. Renders walls/floors/portals/player to a canvas and
 * blanks out cells that haven't been explored yet (fog of war). Closes
 * on M, Escape, or click outside the panel.
 *
 * Rendering is do-on-demand (refresh() called by caller on show and
 * whenever something changes). Nothing ticks inside the UI — it's a
 * static snapshot each time it's opened.
 */

const CELL_PX    = 12;   // pixels per dungeon cell
const MARGIN_PX  = 16;
const MAP_BG     = '#0a0805';
const FOG_FILL   = '#040302';
const WALL_FILL  = '#3a2e22';
const FLOOR_FILL = '#6b5a3d';
const EDGE_STROKE= '#2a2218';
const PORTAL_DN  = '#ff3322';
const PORTAL_UP  = '#33ff66';
const PLAYER_FL  = '#ffff00';
const PLAYER_STK = '#000';

export class MinimapUI {
    constructor() {
        this.isOpen = false;
        this._dungeonData = null;
        this._mmSystem = null;
        this._playerInfo = null; // { gx, gz, yaw }

        // --- Root panel — fixed to bottom-right, never blocks movement ---
        this.root = document.createElement('div');
        Object.assign(this.root.style, {
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            display: 'none',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '6px',
            zIndex: '50',
            fontFamily: '"Cinzel", serif',
            background: 'linear-gradient(180deg, rgba(45,30,18,0.97), rgba(20,12,6,0.97))',
            border: '2px solid rgba(200,160,90,0.85)',
            borderRadius: '8px',
            boxShadow: '0 0 20px rgba(0,0,0,0.8), inset 0 0 10px rgba(255,200,120,0.1)',
            padding: '8px 10px 6px',
            maxWidth: '260px',
        });

        // --- Title row (label + close button) ---
        const titleRow = document.createElement('div');
        Object.assign(titleRow.style, {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
            gap: '8px',
        });

        this.titleEl = document.createElement('div');
        Object.assign(this.titleEl.style, {
            color: 'rgba(255,220,160,1)',
            fontSize: '13px',
            fontWeight: '700',
            letterSpacing: '1px',
            textShadow: '0 0 6px rgba(255,150,50,0.4)',
            flex: '1',
        });
        this.titleEl.textContent = 'Dungeon Level 1';
        titleRow.appendChild(this.titleEl);

        const closeBtn = document.createElement('button');
        Object.assign(closeBtn.style, {
            background: 'none',
            border: '1px solid rgba(200,160,90,0.45)',
            borderRadius: '4px',
            color: 'rgba(220,180,100,0.9)',
            cursor: 'pointer',
            fontSize: '10px',
            padding: '1px 5px',
            fontFamily: 'inherit',
        });
        closeBtn.textContent = '[M]';
        closeBtn.title = 'Close minimap (M)';
        closeBtn.addEventListener('click', () => this.hide());
        titleRow.appendChild(closeBtn);

        this.root.appendChild(titleRow);

        // --- Canvas (sized on first refresh) ---
        this.canvas = document.createElement('canvas');
        Object.assign(this.canvas.style, {
            display: 'block',
            background: MAP_BG,
            border: '1px solid rgba(160,120,60,0.6)',
            imageRendering: 'pixelated',
        });
        this.root.appendChild(this.canvas);

        // --- Compact legend ---
        const legend = document.createElement('div');
        Object.assign(legend.style, {
            display: 'flex',
            flexWrap: 'wrap',
            gap: '6px 10px',
            fontSize: '10px',
            color: 'rgba(220,200,160,0.85)',
        });
        legend.innerHTML = `
            <span><span style="display:inline-block;width:8px;height:8px;background:${PLAYER_FL};border:1px solid ${PLAYER_STK};vertical-align:middle;"></span> You</span>
            <span><span style="display:inline-block;width:8px;height:8px;background:${PORTAL_DN};vertical-align:middle;"></span> Down</span>
            <span><span style="display:inline-block;width:8px;height:8px;background:${PORTAL_UP};vertical-align:middle;"></span> Up</span>
            <span><span style="display:inline-block;width:8px;height:8px;background:${FLOOR_FILL};vertical-align:middle;"></span> Floor</span>
            <span><span style="display:inline-block;width:8px;height:8px;background:${WALL_FILL};vertical-align:middle;"></span> Wall</span>
        `;
        this.root.appendChild(legend);

        document.body.appendChild(this.root);
    }

    /**
     * Show and render with the given dungeon data & exploration grid.
     * @param {object} dungeonData - { map, rows, cols, portalDown, portalUp, dungeonLevel }
     * @param {import('../systems/MinimapSystem.js').MinimapSystem} mmSystem
     * @param {{gx:number, gz:number, yaw:number}} playerInfo
     */
    show(dungeonData, mmSystem, playerInfo) {
        this._dungeonData = dungeonData;
        this._mmSystem = mmSystem;
        this._playerInfo = playerInfo;
        this.isOpen = true;
        this.root.style.display = 'flex';
        this.refresh();
    }

    hide() {
        this.isOpen = false;
        this.root.style.display = 'none';
    }

    /**
     * Update the player position and redraw. Called every frame while open.
     * @param {{gx:number, gz:number, yaw:number}} playerInfo
     */
    updatePlayer(playerInfo) {
        this._playerInfo = playerInfo;
        if (this.isOpen) this.refresh();
    }

    /** Re-draw the current state. Call after show() or if player moved. */
    refresh() {
        if (!this._dungeonData) return;
        const dd = this._dungeonData;
        const mm = this._mmSystem;
        const p  = this._playerInfo || { gx: 0, gz: 0, yaw: 0 };
        const lvl = dd.dungeonLevel | 0;

        this.titleEl.textContent = `Dungeon Level ${lvl}`;

        // Resize canvas to match grid
        const cw = dd.cols * CELL_PX;
        const ch = dd.rows * CELL_PX;
        this.canvas.width  = cw;
        this.canvas.height = ch;
        const ctx = this.canvas.getContext('2d');

        // Background (fog)
        ctx.fillStyle = FOG_FILL;
        ctx.fillRect(0, 0, cw, ch);

        // Walls & floors — only render cells that are explored.
        for (let z = 0; z < dd.rows; z++) {
            for (let x = 0; x < dd.cols; x++) {
                const isExplored = mm && mm.isExplored(lvl, x, z);
                if (!isExplored) continue;
                const px = x * CELL_PX;
                const pz = z * CELL_PX;
                const cell = dd.map[z][x];
                ctx.fillStyle = (cell === 1) ? WALL_FILL : FLOOR_FILL;
                ctx.fillRect(px, pz, CELL_PX, CELL_PX);
            }
        }

        // Subtle grid lines over explored cells (skip for speed on big maps)
        ctx.strokeStyle = EDGE_STROKE;
        ctx.lineWidth = 0.5;
        for (let z = 0; z < dd.rows; z++) {
            for (let x = 0; x < dd.cols; x++) {
                if (!mm || !mm.isExplored(lvl, x, z)) continue;
                ctx.strokeRect(x * CELL_PX + 0.5, z * CELL_PX + 0.5, CELL_PX - 1, CELL_PX - 1);
            }
        }

        // Portals — only show if their cell is explored
        const drawPortal = (px, pz, color) => {
            if (px == null || pz == null) return;
            if (!mm || !mm.isExplored(lvl, px, pz)) return;
            ctx.fillStyle = color;
            ctx.beginPath();
            ctx.arc(px * CELL_PX + CELL_PX / 2, pz * CELL_PX + CELL_PX / 2, CELL_PX * 0.38, 0, Math.PI * 2);
            ctx.fill();
            ctx.strokeStyle = '#000';
            ctx.lineWidth = 1.2;
            ctx.stroke();
        };
        if (dd.portalDown) drawPortal(dd.portalDown.x, dd.portalDown.z, PORTAL_DN);
        if (dd.portalUp)   drawPortal(dd.portalUp.x,   dd.portalUp.z,   PORTAL_UP);

        // Player: triangle pointing in facing direction (always drawn —
        // the player's cell is by definition just-explored).
        const pcx = p.gx * CELL_PX + CELL_PX / 2;
        const pcy = p.gz * CELL_PX + CELL_PX / 2;
        const yawForDraw = p.yaw; // Three.js +yaw rotates +X→-Z
        const size = CELL_PX * 0.55;
        ctx.save();
        ctx.translate(pcx, pcy);
        // Canvas +Y is screen-down; our grid z+ is world-south. yaw=0 faces -Z
        // (world north / screen up). Rotate so the triangle points that way.
        ctx.rotate(-yawForDraw);
        ctx.beginPath();
        ctx.moveTo(0, -size);
        ctx.lineTo(size * 0.7, size * 0.7);
        ctx.lineTo(-size * 0.7, size * 0.7);
        ctx.closePath();
        ctx.fillStyle = PLAYER_FL;
        ctx.fill();
        ctx.lineWidth = 1.5;
        ctx.strokeStyle = PLAYER_STK;
        ctx.stroke();
        ctx.restore();

        // Clamp the canvas so the panel stays compact in the corner
        const maxW = 240;
        const maxH = 240;
        const scale = Math.min(1, maxW / cw, maxH / ch);
        this.canvas.style.width  = `${cw * scale}px`;
        this.canvas.style.height = `${ch * scale}px`;

        void MARGIN_PX; // reserved
    }

    destroy() {
        this.root.remove();
    }
}
