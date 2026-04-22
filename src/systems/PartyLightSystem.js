import * as THREE from 'three';
import {
    CELL_SIZE,
    PLAYER_HEIGHT,
    ENABLE_SHADOWS,
    LIGHT_TORCH_RADIUS_CELLS,
    LIGHT_TORCH_DURATION_SEC,
    LIGHT_TORCH_COLOR,
    LIGHT_TORCH_INTENSITY,
    LIGHT_LANTERN_RADIUS_CELLS,
    LIGHT_LANTERN_DURATION_SEC,
    LIGHT_LANTERN_COLOR,
    LIGHT_LANTERN_INTENSITY,
    LIGHT_SPELL_RADIUS_CELLS,
    LIGHT_SPELL_DURATION_SEC,
    LIGHT_SPELL_COLOR,
    LIGHT_SPELL_INTENSITY,
} from '../utils/constants.js';

/**
 * PartyLightSystem — the one portable light the party carries.
 *
 * Phase 10 replaces static dungeon torches with a single party-centric
 * light source. The player must light a torch, burn lantern oil, or have
 * a mage cast the Light spell; otherwise the dungeon is genuinely dark.
 *
 * Types:
 *   torch   — 5-cell radius, 10 min, warm orange, noticeable flicker
 *   lantern — 8-cell radius, 15 min per oil, steady warm gold, tiny flicker
 *   light   — 6-cell radius, 5 min, cool white-blue, steady bright
 *
 * Timers are driven by exploration seconds only (combat pauses the game
 * loop that calls update()).
 */

const TYPE_CFG = {
    torch: {
        radiusCells: LIGHT_TORCH_RADIUS_CELLS,
        duration:    LIGHT_TORCH_DURATION_SEC,
        color:       LIGHT_TORCH_COLOR,
        intensity:   LIGHT_TORCH_INTENSITY,
        label:       'Torch',
        // Deep amber flicker
        flicker: (t, phase) =>
            Math.sin(t * 8.3 + phase) * 0.22 +
            Math.sin(t * 13.1 + phase * 1.7) * 0.12 +
            Math.sin(t * 3.5 + phase * 0.5) * 0.08,
    },
    lantern: {
        radiusCells: LIGHT_LANTERN_RADIUS_CELLS,
        duration:    LIGHT_LANTERN_DURATION_SEC,
        color:       LIGHT_LANTERN_COLOR,
        intensity:   LIGHT_LANTERN_INTENSITY,
        label:       'Lantern',
        // Almost steady — faint oil wobble
        flicker: (t, phase) =>
            Math.sin(t * 2.1 + phase) * 0.05,
    },
    light: {
        radiusCells: LIGHT_SPELL_RADIUS_CELLS,
        duration:    LIGHT_SPELL_DURATION_SEC,
        color:       LIGHT_SPELL_COLOR,
        intensity:   LIGHT_SPELL_INTENSITY,
        label:       'Light Spell',
        // Rock-steady bright
        flicker: () => 0,
    },
};

export class PartyLightSystem {
    constructor() {
        // Active source state (null = dark)
        this.active = null; // { type, remaining, phase }

        // Actual Three.js light. We own it; attach it to the player's
        // container so it follows the camera automatically.
        // decay=1 (linear) gives a dungeon-crawler falloff curve. The physical
        // decay=2 falls off so fast that even arm's-length walls look dim.
        this.light = new THREE.PointLight(0xffffff, 0, 1, 1); // intensity 0 until lit
        this.light.position.set(0, 0, 0);
        if (ENABLE_SHADOWS) {
            this.light.castShadow = true;
            this.light.shadow.mapSize.width = 512;
            this.light.shadow.mapSize.height = 512;
            this.light.shadow.bias = -0.002;
            this.light.shadow.radius = 2;
        }
        this.light.visible = false;
    }

    /** Attach the point light to a parent Object3D (the player container). */
    attachTo(parent) {
        parent.add(this.light);
    }

    /** Returns true if a light source is currently burning. */
    isLit() {
        return this.active !== null;
    }

    /** Label for HUD. Returns '' when unlit. */
    currentLabel() {
        return this.active ? TYPE_CFG[this.active.type].label : '';
    }

    /**
     * Seconds left on the current source, or 0 if unlit.
     */
    remaining() {
        return this.active ? Math.max(0, this.active.remaining) : 0;
    }

    /**
     * Begin a new light source of the given type. Any existing source is
     * replaced (we don't stack lights — one at a time keeps the UX clean
     * and avoids double shadows).
     * @param {'torch'|'lantern'|'light'} type
     */
    start(type) {
        const cfg = TYPE_CFG[type];
        if (!cfg) return;
        this.active = {
            type,
            remaining: cfg.duration,
            phase: Math.random() * Math.PI * 2,
        };
        this.light.color.setHex(cfg.color);
        this.light.distance = cfg.radiusCells * CELL_SIZE;
        this.light.intensity = cfg.intensity;
        this.light.visible = true;
    }

    /** Douse the current source immediately (e.g. on save/load reset). */
    extinguish() {
        this.active = null;
        this.light.intensity = 0;
        this.light.visible = false;
    }

    /**
     * Per-frame update. `elapsed` is wall-clock for flicker phase.
     * `dt` is the frame delta in exploration seconds.
     */
    update(dt, elapsed) {
        if (!this.active) return;

        // Burn timer
        this.active.remaining -= dt;
        if (this.active.remaining <= 0) {
            this.extinguish();
            return;
        }

        const cfg = TYPE_CFG[this.active.type];
        const f = cfg.flicker(elapsed, this.active.phase);
        this.light.intensity = Math.max(0.15, cfg.intensity + f);

        // Soft fade-out in the last 5 seconds so expiry isn't a hard cut.
        if (this.active.remaining < 5) {
            const k = this.active.remaining / 5;
            this.light.intensity *= k;
        }
    }

    // ── Serialization (save/load) ─────────────────────────────────
    serialize() {
        if (!this.active) return null;
        return {
            type: this.active.type,
            remaining: this.active.remaining,
        };
    }

    restore(data) {
        if (!data || !TYPE_CFG[data.type]) return;
        this.start(data.type);
        if (typeof data.remaining === 'number') {
            this.active.remaining = Math.min(
                Math.max(0, data.remaining),
                TYPE_CFG[data.type].duration,
            );
        }
    }
}
