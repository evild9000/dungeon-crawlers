/**
 * CompassUI — small rotating compass in the upper-right corner.
 *
 * Convention:
 *   yaw =  0           → facing North   (camera looks down -Z, canvas-up)
 *   yaw = -π/2         → facing East    (world +X, canvas-right)
 *   yaw = +π/2         → facing West    (world -X, canvas-left)
 *   yaw =  π           → facing South   (world +Z, canvas-down)
 *
 * In Three.js with container.rotation.y = yaw, a positive yaw rotates the
 * forward vector counterclockwise when viewed from above. The mouse binding
 * in Player.js decreases yaw on rightward motion, so "turn right" = yaw
 * decreases = heading goes N → E → S → W in world cardinals (matching the
 * minimap, where canvas-right is world +X = east).
 *
 * The compass rose rotates WITH the player's yaw (same sign) so that when
 * yaw decreases (turn right) the rose spins counterclockwise, bringing E
 * under the fixed top indicator. CSS rotate() is positive-clockwise, so we
 * apply `+yaw` in degrees.
 */
export class CompassUI {
    constructor() {
        this.root = document.createElement('div');
        Object.assign(this.root.style, {
            position: 'fixed',
            top: '16px',
            right: '16px',
            width: '84px',
            height: '84px',
            zIndex: '40',
            pointerEvents: 'none',
            userSelect: 'none',
            fontFamily: '"Cinzel", serif',
        });

        // --- Bezel (fixed) ---
        const bezel = document.createElement('div');
        Object.assign(bezel.style, {
            position: 'absolute',
            inset: '0',
            borderRadius: '50%',
            background: 'radial-gradient(circle at 35% 30%, rgba(90,70,45,0.85), rgba(20,15,10,0.95) 70%)',
            boxShadow: '0 0 10px rgba(0,0,0,0.8), inset 0 0 6px rgba(255,200,120,0.25)',
            border: '2px solid rgba(200,160,90,0.85)',
        });
        this.root.appendChild(bezel);

        // --- Heading indicator (fixed triangle at top) ---
        const indicator = document.createElement('div');
        Object.assign(indicator.style, {
            position: 'absolute',
            top: '-6px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '0',
            height: '0',
            borderLeft: '7px solid transparent',
            borderRight: '7px solid transparent',
            borderTop: '10px solid rgba(255,210,130,0.95)',
            filter: 'drop-shadow(0 0 3px rgba(255,180,80,0.8))',
        });
        this.root.appendChild(indicator);

        // --- Rotating rose ---
        this.rose = document.createElement('div');
        Object.assign(this.rose.style, {
            position: 'absolute',
            inset: '6px',
            borderRadius: '50%',
            transition: 'transform 80ms linear',
        });
        bezel.appendChild(this.rose);

        // Letters: N, E, S, W positioned around the rose
        const letters = [
            { ch: 'N', deg: 0,   color: '#ff6b55' },  // red for North
            { ch: 'E', deg: 90,  color: '#f0dba0' },
            { ch: 'S', deg: 180, color: '#f0dba0' },
            { ch: 'W', deg: 270, color: '#f0dba0' },
        ];
        for (const { ch, deg, color } of letters) {
            const el = document.createElement('div');
            Object.assign(el.style, {
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: `translate(-50%, -50%) rotate(${deg}deg) translateY(-28px) rotate(${-deg}deg)`,
                color,
                fontSize: ch === 'N' ? '18px' : '14px',
                fontWeight: ch === 'N' ? '700' : '600',
                textShadow: '0 0 3px #000, 0 0 6px rgba(0,0,0,0.8)',
            });
            el.textContent = ch;
            this.rose.appendChild(el);
        }

        // Tick marks every 45°
        for (let d = 45; d < 360; d += 90) {
            const tick = document.createElement('div');
            Object.assign(tick.style, {
                position: 'absolute',
                top: '50%',
                left: '50%',
                width: '2px',
                height: '6px',
                background: 'rgba(200,170,110,0.7)',
                transform: `translate(-50%, -50%) rotate(${d}deg) translateY(-30px)`,
                borderRadius: '1px',
            });
            this.rose.appendChild(tick);
        }

        // --- Dungeon-level label (sits just below the compass) ---
        this.levelLabel = document.createElement('div');
        Object.assign(this.levelLabel.style, {
            position: 'absolute',
            top: '88px',
            left: '50%',
            transform: 'translateX(-50%)',
            whiteSpace: 'nowrap',
            fontFamily: '"Cinzel", serif',
            fontSize: '13px',
            fontWeight: '700',
            color: 'rgba(240,220,170,0.95)',
            textShadow: '0 0 3px #000, 0 0 6px rgba(0,0,0,0.9)',
            letterSpacing: '1px',
        });
        this.levelLabel.textContent = 'Level 1';
        this.root.appendChild(this.levelLabel);

        document.body.appendChild(this.root);
    }

    /** Update the dungeon-level readout under the compass. */
    setDungeonLevel(n) {
        this.levelLabel.textContent = `Level ${n | 0}`;
    }

    /**
     * Set the player's yaw in radians. The rose rotates by +yaw so that
     * cardinal letters remain aligned with world directions while the
     * fixed top indicator shows which way the party is looking.
     * (See file header for the sign-convention derivation.)
     * @param {number} yaw radians
     */
    setYaw(yaw) {
        const deg = yaw * 180 / Math.PI;
        this.rose.style.transform = `rotate(${deg}deg)`;
    }

    show() { this.root.style.display = ''; }
    hide() { this.root.style.display = 'none'; }

    destroy() {
        this.root.remove();
    }
}
