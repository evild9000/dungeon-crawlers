/**
 * PortraitGenerator — creates deterministic 64×64 character portraits.
 *
 * Each portrait is driven by a numeric seed (so the same face is
 * regenerated on load) and a species id that influences:
 *   - skin tint (orcs are green-ish, etc.)
 *   - ear shape (pointed for elves / orcs / gnomes)
 *   - beards (dwarves, gnomes)
 *   - tusks (orcs)
 *   - head scale (gnomes/halflings small, orcs a touch bigger)
 */

import { getSpeciesDef } from '../entities/Species.js';

// ---- Seeded PRNG (LCG) ----
function createRNG(seed) {
    let s = seed | 0;
    const next = () => {
        s = (s * 1664525 + 1013904223) | 0;
        return (s >>> 0) / 4294967296;
    };
    return {
        next,
        int(min, max) { return min + Math.floor(next() * (max - min + 1)); },
        pick(arr) { return arr[Math.floor(next() * arr.length)]; },
    };
}

const SKIN   = ['#f5d0a9', '#e8b88a', '#d4956b', '#a0724a', '#6b4423'];
const HAIR_C = ['#1a0e05', '#3b2010', '#6b4420', '#8b6914', '#c4a35a', '#aaaaaa', '#882211', '#443355'];
const EYE_C  = ['#4488cc', '#44aa44', '#886633', '#333333', '#884488', '#44aaaa'];
const HAIR_S = ['short', 'long', 'mohawk', 'bald', 'ponytail', 'hood'];
const ACCESS = ['none', 'none', 'helmet', 'headband', 'scar', 'eyepatch'];
const CLOTH  = ['#333344', '#443322', '#553333', '#224433', '#442244', '#334444'];

/** Mix two hex colours. t=0 -> a, t=1 -> b. */
function mixColor(a, b, t) {
    const pa = [parseInt(a.slice(1,3),16), parseInt(a.slice(3,5),16), parseInt(a.slice(5,7),16)];
    const pb = [parseInt(b.slice(1,3),16), parseInt(b.slice(3,5),16), parseInt(b.slice(5,7),16)];
    const r = Math.round(pa[0] + (pb[0]-pa[0]) * t);
    const g = Math.round(pa[1] + (pb[1]-pa[1]) * t);
    const bb = Math.round(pa[2] + (pb[2]-pa[2]) * t);
    return `#${r.toString(16).padStart(2,'0')}${g.toString(16).padStart(2,'0')}${bb.toString(16).padStart(2,'0')}`;
}

/**
 * Generate a character portrait canvas (64×64).
 * @param {number} seed
 * @param {string} [speciesId]
 * @returns {HTMLCanvasElement}
 */
export function generatePortrait(seed, speciesId = 'human') {
    const S = 64;
    const canvas = document.createElement('canvas');
    canvas.width = S;
    canvas.height = S;
    const c = canvas.getContext('2d');
    const r = createRNG(seed);

    const speciesDef = getSpeciesDef(speciesId);
    const trait = speciesDef.portraitTrait || {};
    const scale = trait.heightScale || 1.0;

    let skin  = r.pick(SKIN);
    const hairC = r.pick(HAIR_C);
    const eyeC  = r.pick(EYE_C);
    let hairS = r.pick(HAIR_S);
    const acc   = r.pick(ACCESS);

    // Apply species tint (orcs green, etc.)
    if (trait.skinTint) {
        skin = mixColor(skin, trait.skinTint, 0.6);
    }

    // --- Background ---
    const bg = c.createLinearGradient(0, 0, 0, S);
    bg.addColorStop(0, '#1a1510');
    bg.addColorStop(1, '#0d0b08');
    c.fillStyle = bg;
    c.fillRect(0, 0, S, S);

    // Head centre & sizing
    const cx = 32;
    const cy = 26;
    const headRx = 13 * scale;
    const headRy = 16 * scale;
    const eyeY   = cy - 2;
    const eyeGap = 7;

    // Dwarves / gnomes get a forced beard (overrides bald choice below)
    const forcedBeard = !!trait.beard;

    // --- Shoulders ---
    c.fillStyle = r.pick(CLOTH);
    c.beginPath();
    c.moveTo(8, S);
    c.quadraticCurveTo(32, 44, 56, S);
    c.fill();

    // --- Neck ---
    c.fillStyle = skin;
    c.fillRect(27, 40, 10, 12);

    // --- Hair back (long / ponytail) ---
    if (hairS === 'long') {
        c.fillStyle = hairC;
        c.beginPath();
        c.ellipse(cx, 28, headRx + 3, headRy + 2, 0, 0, Math.PI * 2);
        c.fill();
        c.fillRect(18, 28, 28, 22);
    } else if (hairS === 'ponytail') {
        c.fillStyle = hairC;
        c.beginPath();
        c.ellipse(cx, 28, headRx + 3, headRy + 2, 0, 0, Math.PI * 2);
        c.fill();
        c.fillRect(44, 22, 8, 26);
    }

    // --- Head ---
    c.fillStyle = skin;
    c.beginPath();
    c.ellipse(cx, cy, headRx, headRy, 0, 0, Math.PI * 2);
    c.fill();

    // Subtle jaw shadow
    c.fillStyle = 'rgba(0,0,0,0.07)';
    c.beginPath();
    c.ellipse(cx, cy + 4, headRx - 2, headRy - 5, 0, 0, Math.PI);
    c.fill();

    // --- Pointed ears (elves / orcs / gnomes) ---
    if (trait.ears === 'pointed') {
        c.fillStyle = skin;
        // Left ear
        c.beginPath();
        c.moveTo(cx - headRx + 1, cy);
        c.lineTo(cx - headRx - 4, cy - 5);
        c.lineTo(cx - headRx + 2, cy + 3);
        c.closePath();
        c.fill();
        // Right ear
        c.beginPath();
        c.moveTo(cx + headRx - 1, cy);
        c.lineTo(cx + headRx + 4, cy - 5);
        c.lineTo(cx + headRx - 2, cy + 3);
        c.closePath();
        c.fill();
    }

    // --- Eyes ---
    for (const dx of [-eyeGap, eyeGap]) {
        const ex = cx + dx;
        c.fillStyle = '#fff';
        c.fillRect(ex - 3, eyeY - 2, 6, 4);
        c.fillStyle = eyeC;
        c.fillRect(ex - 1, eyeY - 1, 3, 3);
        c.fillStyle = '#000';
        c.fillRect(ex, eyeY, 1, 1);
    }

    // Eyebrows
    c.fillStyle = hairC;
    for (const dx of [-eyeGap, eyeGap]) {
        c.fillRect(cx + dx - 3, eyeY - 4, 6, 1.5);
    }

    // --- Nose (gnomes get a bigger one) ---
    c.fillStyle = 'rgba(0,0,0,0.18)';
    if (speciesId === 'gnome') {
        c.fillRect(30, 28, 4, 6);
    } else {
        c.fillRect(31, 28, 2, 4);
    }

    // --- Mouth ---
    c.fillStyle = '#994444';
    c.fillRect(28, 35, 8, 2);

    // --- Tusks (orcs) ---
    if (trait.tusks) {
        c.fillStyle = '#f8ecd0';
        // Two little tusks poking up from lower jaw
        c.fillRect(28, 36, 2, 3);
        c.fillRect(34, 36, 2, 3);
    }

    // --- Beard (dwarves / gnomes, or random for chosen hair) ---
    if (forcedBeard) {
        c.fillStyle = hairC;
        c.beginPath();
        c.ellipse(cx, 40, headRx - 2, 8, 0, 0, Math.PI);
        c.fill();
        // Extend down over shoulders
        c.fillRect(cx - 10, 40, 20, 10);
    }

    // --- Hair front ---
    c.fillStyle = hairC;
    if (hairS === 'short' || hairS === 'ponytail') {
        c.beginPath();
        c.ellipse(cx, 14, headRx + 1, 8, 0, Math.PI, 0);
        c.fill();
    } else if (hairS === 'long') {
        c.beginPath();
        c.ellipse(cx, 14, headRx + 2, 9, 0, Math.PI, 0);
        c.fill();
    } else if (hairS === 'mohawk') {
        c.fillRect(cx - 5, 4, 10, 14);
        c.beginPath();
        c.ellipse(cx, 14, 6, 3, 0, Math.PI, 0);
        c.fill();
    } else if (hairS === 'hood') {
        const hoodC = r.pick(['#3a2a18', '#2a2a2a', '#1a2a1a']);
        c.fillStyle = hoodC;
        c.beginPath();
        c.moveTo(10, 44);
        c.quadraticCurveTo(32, 2, 54, 44);
        c.fill();
        // Re-draw face opening
        c.fillStyle = skin;
        c.beginPath();
        c.ellipse(cx, cy + 2, headRx - 2, headRy - 3, 0, 0, Math.PI * 2);
        c.fill();
        // Re-draw eyes, nose, mouth over the face
        for (const dx of [-eyeGap, eyeGap]) {
            const ex = cx + dx;
            c.fillStyle = '#fff';
            c.fillRect(ex - 3, eyeY - 2, 6, 4);
            c.fillStyle = eyeC;
            c.fillRect(ex - 1, eyeY - 1, 3, 3);
            c.fillStyle = '#000';
            c.fillRect(ex, eyeY, 1, 1);
        }
        c.fillStyle = 'rgba(0,0,0,0.12)';
        c.fillRect(31, 28, 2, 4);
        c.fillStyle = '#994444';
        c.fillRect(28, 35, 8, 2);
        if (forcedBeard) {
            c.fillStyle = hairC;
            c.beginPath();
            c.ellipse(cx, 40, headRx - 3, 7, 0, 0, Math.PI);
            c.fill();
        }
        if (trait.tusks) {
            c.fillStyle = '#f8ecd0';
            c.fillRect(28, 36, 2, 3);
            c.fillRect(34, 36, 2, 3);
        }
    }
    // bald → no hair drawn (but still could have beard)

    // --- Accessories ---
    if (acc === 'helmet') {
        c.fillStyle = '#777788';
        c.beginPath();
        c.ellipse(cx, 15, headRx + 3, 11, 0, Math.PI, 0);
        c.fill();
        c.fillRect(16, 15, 32, 3);
        // Nose guard
        c.fillRect(30, 15, 4, 6);
    } else if (acc === 'headband') {
        c.fillStyle = r.pick(['#cc3333', '#3333cc', '#33aa33', '#cccc33']);
        c.fillRect(18, 17, 28, 3);
    } else if (acc === 'scar') {
        c.strokeStyle = 'rgba(160,80,80,0.7)';
        c.lineWidth = 1.5;
        c.beginPath();
        c.moveTo(24, 18);
        c.lineTo(30, 36);
        c.stroke();
    } else if (acc === 'eyepatch') {
        c.fillStyle = '#1a1a1a';
        c.fillRect(cx + eyeGap - 4, eyeY - 3, 8, 7);
        c.strokeStyle = '#1a1a1a';
        c.lineWidth = 1.5;
        c.beginPath();
        c.moveTo(cx + eyeGap + 4, eyeY);
        c.lineTo(52, 12);
        c.moveTo(cx + eyeGap - 4, eyeY);
        c.lineTo(12, 12);
        c.stroke();
    }

    // --- Border frame ---
    c.strokeStyle = '#554422';
    c.lineWidth = 2;
    c.strokeRect(1, 1, 62, 62);
    c.strokeStyle = '#aa8844';
    c.lineWidth = 1;
    c.strokeRect(3, 3, 58, 58);

    return canvas;
}
