/**
 * SpriteGenerator — creates 64×64 monster sprite canvases.
 *
 * Each sprite is driven by (type, seed) for deterministic rendering.
 * Sprites use transparency so they billboard nicely in the 3D world.
 */

function createRNG(seed) {
    let s = seed | 0;
    const next = () => {
        s = (s * 1664525 + 1013904223) | 0;
        return (s >>> 0) / 4294967296;
    };
    return {
        next,
        int(min, max) { return min + Math.floor(next() * (max - min + 1)); },
        vary(base, range) { return base + (next() - 0.5) * range * 2; },
    };
}

// ────────────────────────────────────────────────
// Drawing helpers
// ────────────────────────────────────────────────

function drawSkeleton(c, r) {
    const tint = `rgb(${r.int(220,240)},${r.int(210,230)},${r.int(195,215)})`;
    const bone = tint;

    // Skull
    c.fillStyle = bone;
    c.beginPath();
    c.arc(32, 14, 10, 0, Math.PI * 2);
    c.fill();
    // Jaw
    c.beginPath();
    c.moveTo(24, 18);
    c.quadraticCurveTo(32, 28, 40, 18);
    c.fill();

    // Eye sockets
    c.fillStyle = '#1a0000';
    c.beginPath(); c.arc(28, 13, 3, 0, Math.PI * 2); c.fill();
    c.beginPath(); c.arc(36, 13, 3, 0, Math.PI * 2); c.fill();
    // Glow
    c.fillStyle = '#ff3300';
    c.beginPath(); c.arc(28, 13, 1.5, 0, Math.PI * 2); c.fill();
    c.beginPath(); c.arc(36, 13, 1.5, 0, Math.PI * 2); c.fill();

    // Teeth
    c.fillStyle = bone;
    for (let i = 0; i < 5; i++) c.fillRect(26 + i * 2.4, 21, 1.5, 3);

    // Spine
    c.fillStyle = bone;
    c.fillRect(30, 26, 4, 18);

    // Ribs
    for (let i = 0; i < 4; i++) {
        const y = 28 + i * 4;
        c.fillRect(22, y, 20, 1.5);
    }

    // Arms
    c.strokeStyle = bone;
    c.lineWidth = 2.5;
    c.beginPath(); c.moveTo(22, 29); c.lineTo(12, 44); c.lineTo(10, 52); c.stroke();
    c.beginPath(); c.moveTo(42, 29); c.lineTo(52, 44); c.lineTo(54, 52); c.stroke();

    // Pelvis
    c.fillStyle = bone;
    c.beginPath();
    c.moveTo(24, 44);
    c.lineTo(40, 44);
    c.lineTo(38, 48);
    c.lineTo(26, 48);
    c.fill();

    // Legs
    c.strokeStyle = bone;
    c.beginPath(); c.moveTo(28, 48); c.lineTo(24, 62); c.stroke();
    c.beginPath(); c.moveTo(36, 48); c.lineTo(40, 62); c.stroke();
}

function drawSlime(c, r) {
    const g = r.int(140, 200);
    const base = `rgb(${r.int(20,60)},${g},${r.int(20,60)})`;
    const light = `rgba(${r.int(100,160)},${g + 40},${r.int(100,160)},0.6)`;

    // Body blob
    c.fillStyle = base;
    c.beginPath();
    c.moveTo(10, 56);
    c.quadraticCurveTo(8, 30, 20, 24);
    c.quadraticCurveTo(32, 16, 44, 24);
    c.quadraticCurveTo(56, 30, 54, 56);
    c.closePath();
    c.fill();

    // Highlight
    c.fillStyle = light;
    c.beginPath();
    c.ellipse(28, 30, 8, 10, -0.3, 0, Math.PI * 2);
    c.fill();

    // Eyes
    c.fillStyle = '#fff';
    c.beginPath(); c.arc(26, 36, 5, 0, Math.PI * 2); c.fill();
    c.beginPath(); c.arc(38, 36, 5, 0, Math.PI * 2); c.fill();
    c.fillStyle = '#111';
    c.beginPath(); c.arc(27, 37, 2.5, 0, Math.PI * 2); c.fill();
    c.beginPath(); c.arc(39, 37, 2.5, 0, Math.PI * 2); c.fill();

    // Mouth
    c.strokeStyle = 'rgba(0,0,0,0.4)';
    c.lineWidth = 1.5;
    c.beginPath();
    c.arc(32, 44, 6, 0.2, Math.PI - 0.2);
    c.stroke();
}

function drawGoblin(c, r) {
    const skinG = r.int(130, 180);
    const skin = `rgb(${r.int(60,100)},${skinG},${r.int(40,70)})`;

    // Ears
    c.fillStyle = skin;
    c.beginPath(); c.moveTo(12, 18); c.lineTo(2, 10); c.lineTo(18, 14); c.fill();
    c.beginPath(); c.moveTo(52, 18); c.lineTo(62, 10); c.lineTo(46, 14); c.fill();

    // Head
    c.fillStyle = skin;
    c.beginPath();
    c.ellipse(32, 18, 14, 14, 0, 0, Math.PI * 2);
    c.fill();

    // Eyes — big and yellow/red
    const eyeC = r.int(0, 1) ? '#ccaa00' : '#cc3300';
    c.fillStyle = '#111';
    c.beginPath(); c.ellipse(25, 16, 5, 4, 0, 0, Math.PI * 2); c.fill();
    c.beginPath(); c.ellipse(39, 16, 5, 4, 0, 0, Math.PI * 2); c.fill();
    c.fillStyle = eyeC;
    c.beginPath(); c.arc(26, 16, 2.5, 0, Math.PI * 2); c.fill();
    c.beginPath(); c.arc(40, 16, 2.5, 0, Math.PI * 2); c.fill();

    // Nose
    c.fillStyle = 'rgba(0,0,0,0.2)';
    c.beginPath(); c.arc(32, 22, 2, 0, Math.PI * 2); c.fill();

    // Mouth with teeth
    c.fillStyle = '#220000';
    c.fillRect(26, 26, 12, 4);
    c.fillStyle = '#ddd';
    c.fillRect(28, 26, 2, 3);
    c.fillRect(34, 26, 2, 3);

    // Body
    c.fillStyle = r.int(0, 1) ? '#5a4a2a' : '#4a3a3a';
    c.fillRect(20, 32, 24, 20);

    // Arms
    c.fillStyle = skin;
    c.fillRect(12, 34, 8, 14);
    c.fillRect(44, 34, 8, 14);

    // Legs
    c.fillRect(22, 52, 8, 12);
    c.fillRect(34, 52, 8, 12);
}

function drawSpider(c, r) {
    const dark = `rgb(${r.int(30,60)},${r.int(20,40)},${r.int(15,30)})`;

    // Abdomen
    c.fillStyle = dark;
    c.beginPath();
    c.ellipse(32, 42, 14, 16, 0, 0, Math.PI * 2);
    c.fill();

    // Cephalothorax
    c.beginPath();
    c.ellipse(32, 24, 10, 10, 0, 0, Math.PI * 2);
    c.fill();

    // Eyes (cluster)
    c.fillStyle = '#cc0000';
    const eyePositions = [[-4,-2],[4,-2],[-6,1],[6,1],[-2,-4],[2,-4]];
    for (const [dx, dy] of eyePositions) {
        c.beginPath();
        c.arc(32 + dx, 22 + dy, 1.5, 0, Math.PI * 2);
        c.fill();
    }

    // Mandibles
    c.strokeStyle = '#553322';
    c.lineWidth = 2;
    c.beginPath(); c.moveTo(28, 30); c.lineTo(26, 36); c.stroke();
    c.beginPath(); c.moveTo(36, 30); c.lineTo(38, 36); c.stroke();

    // Legs — 4 per side
    c.strokeStyle = dark;
    c.lineWidth = 2;
    const legData = [
        [22, 26, 4, 16],
        [22, 30, 2, 22],
        [22, 34, 4, 38],
        [22, 38, 8, 52],
    ];
    for (const [sx, sy, ex, ey] of legData) {
        // Left leg
        c.beginPath(); c.moveTo(sx, sy); c.quadraticCurveTo(sx - 10, sy - 6, ex, ey); c.stroke();
        // Right leg (mirror)
        c.beginPath(); c.moveTo(64 - sx, sy); c.quadraticCurveTo(64 - sx + 10, sy - 6, 64 - ex, ey); c.stroke();
    }

    // Abdomen markings
    c.fillStyle = 'rgba(180,60,60,0.3)';
    c.beginPath();
    c.ellipse(32, 44, 4, 6, 0, 0, Math.PI * 2);
    c.fill();
}

function drawWraith(c, r) {
    const purple = `rgba(${r.int(60,100)},${r.int(30,60)},${r.int(100,160)},0.85)`;
    const darkP  = `rgba(${r.int(30,50)},${r.int(15,30)},${r.int(50,80)},0.9)`;

    // Tattered robe body
    c.fillStyle = darkP;
    c.beginPath();
    c.moveTo(16, 22);
    c.quadraticCurveTo(12, 50, 8, 62);
    c.lineTo(18, 58);
    c.lineTo(22, 64);
    c.lineTo(28, 56);
    c.lineTo(32, 64);
    c.lineTo(36, 56);
    c.lineTo(42, 64);
    c.lineTo(46, 58);
    c.lineTo(56, 62);
    c.quadraticCurveTo(52, 50, 48, 22);
    c.closePath();
    c.fill();

    // Hood
    c.fillStyle = purple;
    c.beginPath();
    c.moveTo(14, 28);
    c.quadraticCurveTo(32, 2, 50, 28);
    c.quadraticCurveTo(42, 22, 32, 20);
    c.quadraticCurveTo(22, 22, 14, 28);
    c.fill();

    // Face void
    c.fillStyle = '#0a0008';
    c.beginPath();
    c.ellipse(32, 22, 9, 8, 0, 0.3, Math.PI - 0.3);
    c.fill();

    // Glowing eyes
    c.shadowColor = '#aa66ff';
    c.shadowBlur = 8;
    c.fillStyle = '#cc88ff';
    c.beginPath(); c.arc(27, 20, 2.5, 0, Math.PI * 2); c.fill();
    c.beginPath(); c.arc(37, 20, 2.5, 0, Math.PI * 2); c.fill();
    c.shadowBlur = 0;

    // Wispy tendrils
    c.strokeStyle = `rgba(100,50,140,0.4)`;
    c.lineWidth = 1;
    for (let i = 0; i < 4; i++) {
        const x = 20 + i * 8;
        c.beginPath();
        c.moveTo(x, 60);
        c.quadraticCurveTo(x + r.int(-6, 6), 66, x + r.int(-4, 4), 64);
        c.stroke();
    }
}

// ────────────────────────────────────────────────
// NEW MONSTER TYPES
// ────────────────────────────────────────────────

function drawBat(c, r) {
    const body = `rgb(${r.int(30,50)},${r.int(20,35)},${r.int(20,30)})`;
    const wing = `rgb(${r.int(40,60)},${r.int(30,45)},${r.int(25,40)})`;

    // Body
    c.fillStyle = body;
    c.beginPath();
    c.ellipse(32, 34, 6, 8, 0, 0, Math.PI * 2);
    c.fill();

    // Head
    c.beginPath();
    c.arc(32, 24, 6, 0, Math.PI * 2);
    c.fill();

    // Ears
    c.beginPath(); c.moveTo(26, 22); c.lineTo(22, 12); c.lineTo(28, 20); c.fill();
    c.beginPath(); c.moveTo(38, 22); c.lineTo(42, 12); c.lineTo(36, 20); c.fill();

    // Eyes — red
    c.fillStyle = '#ff2200';
    c.beginPath(); c.arc(29, 23, 2, 0, Math.PI * 2); c.fill();
    c.beginPath(); c.arc(35, 23, 2, 0, Math.PI * 2); c.fill();

    // Wings — left
    c.fillStyle = wing;
    c.beginPath();
    c.moveTo(26, 30);
    c.quadraticCurveTo(10, 20, 2, 32);
    c.lineTo(8, 40);
    c.lineTo(14, 36);
    c.lineTo(18, 42);
    c.lineTo(22, 36);
    c.lineTo(26, 38);
    c.closePath();
    c.fill();

    // Wings — right
    c.beginPath();
    c.moveTo(38, 30);
    c.quadraticCurveTo(54, 20, 62, 32);
    c.lineTo(56, 40);
    c.lineTo(50, 36);
    c.lineTo(46, 42);
    c.lineTo(42, 36);
    c.lineTo(38, 38);
    c.closePath();
    c.fill();

    // Fangs
    c.fillStyle = '#ddd';
    c.fillRect(30, 28, 1.5, 3);
    c.fillRect(33, 28, 1.5, 3);
}

function drawRat(c, r) {
    const fur = `rgb(${r.int(80,120)},${r.int(60,90)},${r.int(40,60)})`;
    const belly = `rgb(${r.int(140,170)},${r.int(120,150)},${r.int(100,130)})`;

    // Tail
    c.strokeStyle = `rgb(${r.int(160,190)},${r.int(130,160)},${r.int(120,140)})`;
    c.lineWidth = 2;
    c.beginPath();
    c.moveTo(10, 40);
    c.quadraticCurveTo(4, 50, 6, 56);
    c.stroke();

    // Body
    c.fillStyle = fur;
    c.beginPath();
    c.ellipse(32, 42, 18, 12, 0, 0, Math.PI * 2);
    c.fill();

    // Belly
    c.fillStyle = belly;
    c.beginPath();
    c.ellipse(34, 46, 12, 7, 0, 0, Math.PI);
    c.fill();

    // Head
    c.fillStyle = fur;
    c.beginPath();
    c.ellipse(50, 36, 10, 9, 0.3, 0, Math.PI * 2);
    c.fill();

    // Ears
    c.fillStyle = `rgb(${r.int(160,190)},${r.int(130,160)},${r.int(120,140)})`;
    c.beginPath(); c.arc(46, 28, 4, 0, Math.PI * 2); c.fill();
    c.beginPath(); c.arc(54, 28, 4, 0, Math.PI * 2); c.fill();

    // Eyes — beady red
    c.fillStyle = '#cc2200';
    c.beginPath(); c.arc(52, 34, 2, 0, Math.PI * 2); c.fill();

    // Nose
    c.fillStyle = '#ff6688';
    c.beginPath(); c.arc(59, 37, 2, 0, Math.PI * 2); c.fill();

    // Whiskers
    c.strokeStyle = '#888';
    c.lineWidth = 0.8;
    c.beginPath(); c.moveTo(58, 36); c.lineTo(64, 33); c.stroke();
    c.beginPath(); c.moveTo(58, 38); c.lineTo(64, 39); c.stroke();

    // Legs
    c.fillStyle = fur;
    c.fillRect(22, 50, 5, 8);
    c.fillRect(38, 50, 5, 8);
    // Front legs
    c.fillRect(44, 46, 4, 8);
}

function drawZombie(c, r) {
    const skinG = r.int(80, 120);
    const skin = `rgb(${r.int(60,90)},${skinG},${r.int(50,70)})`;
    const cloth = `rgb(${r.int(60,80)},${r.int(50,65)},${r.int(40,55)})`;

    // Head
    c.fillStyle = skin;
    c.beginPath();
    c.arc(32, 14, 10, 0, Math.PI * 2);
    c.fill();

    // Sunken eyes
    c.fillStyle = '#1a1a00';
    c.beginPath(); c.ellipse(28, 13, 3, 2.5, 0, 0, Math.PI * 2); c.fill();
    c.beginPath(); c.ellipse(36, 14, 3, 2.5, 0, 0, Math.PI * 2); c.fill();
    c.fillStyle = '#aacc00';
    c.beginPath(); c.arc(28, 13, 1.2, 0, Math.PI * 2); c.fill();
    c.beginPath(); c.arc(37, 14, 1.2, 0, Math.PI * 2); c.fill();

    // Open mouth
    c.fillStyle = '#220000';
    c.fillRect(27, 19, 10, 4);
    c.fillStyle = '#ccc';
    c.fillRect(29, 19, 2, 2);
    c.fillRect(33, 19, 2, 2);

    // Body — tattered clothes
    c.fillStyle = cloth;
    c.fillRect(20, 24, 24, 24);

    // Tears in clothes
    c.fillStyle = skin;
    c.fillRect(22, 30, 6, 3);
    c.fillRect(36, 34, 5, 4);

    // Left arm (hanging limp)
    c.fillStyle = skin;
    c.strokeStyle = skin;
    c.lineWidth = 4;
    c.beginPath(); c.moveTo(20, 26); c.lineTo(10, 42); c.lineTo(8, 54); c.stroke();

    // Right arm (reaching forward)
    c.beginPath(); c.moveTo(44, 26); c.lineTo(54, 38); c.lineTo(56, 42); c.stroke();

    // Exposed bone on right arm
    c.strokeStyle = '#ddd';
    c.lineWidth = 1.5;
    c.beginPath(); c.moveTo(52, 36); c.lineTo(56, 42); c.stroke();

    // Legs
    c.fillStyle = cloth;
    c.fillRect(22, 48, 8, 14);
    c.fillRect(34, 48, 8, 14);
}

function drawTroll(c, r) {
    const skin = `rgb(${r.int(70,100)},${r.int(90,130)},${r.int(60,80)})`;

    // Large body
    c.fillStyle = skin;
    c.beginPath();
    c.ellipse(32, 40, 18, 20, 0, 0, Math.PI * 2);
    c.fill();

    // Small head
    c.beginPath();
    c.arc(32, 14, 8, 0, Math.PI * 2);
    c.fill();

    // Brow ridge
    c.fillStyle = `rgba(0,0,0,0.2)`;
    c.fillRect(24, 12, 16, 3);

    // Eyes — small, angry
    c.fillStyle = '#ff6600';
    c.beginPath(); c.arc(28, 14, 2, 0, Math.PI * 2); c.fill();
    c.beginPath(); c.arc(36, 14, 2, 0, Math.PI * 2); c.fill();
    c.fillStyle = '#111';
    c.beginPath(); c.arc(28, 14, 1, 0, Math.PI * 2); c.fill();
    c.beginPath(); c.arc(36, 14, 1, 0, Math.PI * 2); c.fill();

    // Tusks
    c.fillStyle = '#ddc';
    c.beginPath();
    c.moveTo(26, 20); c.lineTo(24, 10); c.lineTo(28, 18);
    c.fill();
    c.beginPath();
    c.moveTo(38, 20); c.lineTo(40, 10); c.lineTo(36, 18);
    c.fill();

    // Huge arms
    c.fillStyle = skin;
    c.strokeStyle = skin;
    c.lineWidth = 7;
    c.beginPath(); c.moveTo(14, 30); c.lineTo(4, 50); c.stroke();
    c.beginPath(); c.moveTo(50, 30); c.lineTo(60, 50); c.stroke();

    // Fists
    c.beginPath(); c.arc(4, 52, 4, 0, Math.PI * 2); c.fill();
    c.beginPath(); c.arc(60, 52, 4, 0, Math.PI * 2); c.fill();

    // Legs
    c.lineWidth = 6;
    c.beginPath(); c.moveTo(24, 56); c.lineTo(22, 64); c.stroke();
    c.beginPath(); c.moveTo(40, 56); c.lineTo(42, 64); c.stroke();
}

function drawGhost(c, r) {
    // Translucent body
    const alpha = 0.5 + r.next() * 0.2;
    const base = `rgba(${r.int(180,220)},${r.int(190,230)},${r.int(220,255)},${alpha})`;

    c.fillStyle = base;
    c.beginPath();
    c.moveTo(16, 60);
    c.quadraticCurveTo(14, 30, 20, 16);
    c.quadraticCurveTo(32, 4, 44, 16);
    c.quadraticCurveTo(50, 30, 48, 60);
    // Wavy bottom
    c.lineTo(44, 54);
    c.lineTo(40, 62);
    c.lineTo(36, 54);
    c.lineTo(32, 62);
    c.lineTo(28, 54);
    c.lineTo(24, 62);
    c.lineTo(20, 54);
    c.lineTo(16, 60);
    c.closePath();
    c.fill();

    // Sad eyes — dark hollow
    c.fillStyle = '#112';
    c.beginPath(); c.ellipse(27, 28, 4, 5, 0, 0, Math.PI * 2); c.fill();
    c.beginPath(); c.ellipse(37, 28, 4, 5, 0, 0, Math.PI * 2); c.fill();
    // Pupils — pale glow
    c.fillStyle = `rgba(200,220,255,0.8)`;
    c.beginPath(); c.arc(27, 29, 1.5, 0, Math.PI * 2); c.fill();
    c.beginPath(); c.arc(37, 29, 1.5, 0, Math.PI * 2); c.fill();

    // Sad mouth
    c.strokeStyle = '#223';
    c.lineWidth = 1.5;
    c.beginPath();
    c.arc(32, 40, 5, Math.PI + 0.3, -0.3);
    c.stroke();

    // Wisps trailing
    c.strokeStyle = `rgba(${r.int(180,220)},${r.int(190,230)},${r.int(220,255)},0.3)`;
    c.lineWidth = 1;
    for (let i = 0; i < 3; i++) {
        const x = 24 + i * 8;
        c.beginPath();
        c.moveTo(x, 58);
        c.quadraticCurveTo(x + r.int(-4,4), 66, x + r.int(-3,3), 64);
        c.stroke();
    }
}

function drawDrake(c, r) {
    const scaleR = r.int(180, 220);
    const scaleG = r.int(60, 100);
    const scales = `rgb(${scaleR},${scaleG},${r.int(20,50)})`;
    const belly = `rgb(${r.int(200,240)},${r.int(160,200)},${r.int(80,120)})`;

    // Body
    c.fillStyle = scales;
    c.beginPath();
    c.ellipse(32, 40, 14, 12, 0, 0, Math.PI * 2);
    c.fill();

    // Belly
    c.fillStyle = belly;
    c.beginPath();
    c.ellipse(32, 44, 9, 7, 0, 0, Math.PI);
    c.fill();

    // Head
    c.fillStyle = scales;
    c.beginPath();
    c.ellipse(32, 22, 9, 8, 0, 0, Math.PI * 2);
    c.fill();

    // Horns
    c.fillStyle = '#554';
    c.beginPath(); c.moveTo(24, 18); c.lineTo(20, 8); c.lineTo(27, 16); c.fill();
    c.beginPath(); c.moveTo(40, 18); c.lineTo(44, 8); c.lineTo(37, 16); c.fill();

    // Eyes — fiery
    c.fillStyle = '#ffaa00';
    c.beginPath(); c.arc(28, 21, 2.5, 0, Math.PI * 2); c.fill();
    c.beginPath(); c.arc(36, 21, 2.5, 0, Math.PI * 2); c.fill();
    c.fillStyle = '#111';
    c.beginPath(); c.arc(28, 21, 1, 0, Math.PI * 2); c.fill();
    c.beginPath(); c.arc(36, 21, 1, 0, Math.PI * 2); c.fill();

    // Nostrils — smoke
    c.fillStyle = '#220';
    c.beginPath(); c.arc(30, 26, 1, 0, Math.PI * 2); c.fill();
    c.beginPath(); c.arc(34, 26, 1, 0, Math.PI * 2); c.fill();

    // Small wings
    c.fillStyle = `rgba(${scaleR},${scaleG},40,0.7)`;
    c.beginPath();
    c.moveTo(18, 34);
    c.quadraticCurveTo(6, 24, 4, 34);
    c.lineTo(8, 40);
    c.lineTo(14, 38);
    c.closePath();
    c.fill();
    c.beginPath();
    c.moveTo(46, 34);
    c.quadraticCurveTo(58, 24, 60, 34);
    c.lineTo(56, 40);
    c.lineTo(50, 38);
    c.closePath();
    c.fill();

    // Legs
    c.fillStyle = scales;
    c.fillRect(24, 50, 5, 8);
    c.fillRect(36, 50, 5, 8);

    // Tail
    c.strokeStyle = scales;
    c.lineWidth = 3;
    c.beginPath();
    c.moveTo(32, 52);
    c.quadraticCurveTo(18, 58, 12, 54);
    c.stroke();
}

function drawMimic(c, r) {
    const wood = `rgb(${r.int(100,140)},${r.int(60,80)},${r.int(20,40)})`;
    const darkWood = `rgb(${r.int(60,80)},${r.int(35,50)},${r.int(15,25)})`;

    // Chest bottom
    c.fillStyle = wood;
    c.fillRect(10, 36, 44, 24);

    // Metal bands
    c.fillStyle = '#887744';
    c.fillRect(10, 36, 44, 2);
    c.fillRect(10, 48, 44, 2);
    c.fillRect(10, 58, 44, 2);

    // Chest lid (open, tilted back)
    c.fillStyle = darkWood;
    c.beginPath();
    c.moveTo(10, 36);
    c.lineTo(12, 18);
    c.lineTo(52, 18);
    c.lineTo(54, 36);
    c.closePath();
    c.fill();

    // Lid metal band
    c.fillStyle = '#887744';
    c.fillRect(12, 20, 40, 2);

    // Lock/clasp
    c.fillStyle = '#ccaa44';
    c.beginPath(); c.arc(32, 37, 3, 0, Math.PI * 2); c.fill();

    // Teeth (in the opening gap)
    c.fillStyle = '#eee';
    for (let i = 0; i < 7; i++) {
        // Top teeth
        c.beginPath();
        c.moveTo(14 + i * 5.5, 36);
        c.lineTo(16.5 + i * 5.5, 42);
        c.lineTo(19 + i * 5.5, 36);
        c.fill();
    }
    // Bottom teeth
    for (let i = 0; i < 6; i++) {
        c.beginPath();
        c.moveTo(17 + i * 5.5, 36);
        c.lineTo(19.5 + i * 5.5, 30);
        c.lineTo(22 + i * 5.5, 36);
        c.fill();
    }

    // Tongue
    c.fillStyle = '#cc3355';
    c.beginPath();
    c.moveTo(28, 38);
    c.quadraticCurveTo(32, 46, 38, 44);
    c.quadraticCurveTo(34, 40, 28, 38);
    c.fill();

    // Eyes on inside of lid
    c.fillStyle = '#ffcc00';
    c.beginPath(); c.arc(26, 28, 3, 0, Math.PI * 2); c.fill();
    c.beginPath(); c.arc(38, 28, 3, 0, Math.PI * 2); c.fill();
    c.fillStyle = '#111';
    c.beginPath(); c.arc(26, 28, 1.5, 0, Math.PI * 2); c.fill();
    c.beginPath(); c.arc(38, 28, 1.5, 0, Math.PI * 2); c.fill();
}

function drawOrc(c, r) {
    const skin = `rgb(${r.int(50,80)},${r.int(100,140)},${r.int(40,60)})`;

    // Head
    c.fillStyle = skin;
    c.beginPath();
    c.ellipse(32, 16, 11, 12, 0, 0, Math.PI * 2);
    c.fill();

    // Brow
    c.fillStyle = 'rgba(0,0,0,0.2)';
    c.fillRect(22, 10, 20, 3);

    // Eyes
    c.fillStyle = '#cc2200';
    c.beginPath(); c.arc(27, 14, 2.5, 0, Math.PI * 2); c.fill();
    c.beginPath(); c.arc(37, 14, 2.5, 0, Math.PI * 2); c.fill();
    c.fillStyle = '#111';
    c.beginPath(); c.arc(27, 14, 1, 0, Math.PI * 2); c.fill();
    c.beginPath(); c.arc(37, 14, 1, 0, Math.PI * 2); c.fill();

    // Jaw with tusks
    c.fillStyle = skin;
    c.fillRect(24, 22, 16, 6);
    c.fillStyle = '#ddc';
    c.beginPath();
    c.moveTo(25, 22); c.lineTo(23, 14); c.lineTo(27, 22); c.fill();
    c.beginPath();
    c.moveTo(39, 22); c.lineTo(41, 14); c.lineTo(37, 22); c.fill();

    // Body — leather armor
    c.fillStyle = '#5a4430';
    c.fillRect(18, 28, 28, 22);

    // Leather strips
    c.fillStyle = '#443320';
    c.fillRect(18, 32, 28, 2);
    c.fillRect(18, 40, 28, 2);

    // Arms — muscular
    c.fillStyle = skin;
    c.fillRect(8, 30, 10, 16);
    c.fillRect(46, 30, 10, 16);

    // Club in right hand
    c.fillStyle = '#664422';
    c.fillRect(54, 26, 4, 26);
    c.fillStyle = '#553311';
    c.beginPath();
    c.arc(56, 24, 5, 0, Math.PI * 2);
    c.fill();

    // Legs
    c.fillStyle = '#443322';
    c.fillRect(22, 50, 8, 12);
    c.fillRect(34, 50, 8, 12);
}

function drawImp(c, r) {
    const skin = `rgb(${r.int(160,200)},${r.int(30,60)},${r.int(20,40)})`;

    // Tail
    c.strokeStyle = skin;
    c.lineWidth = 2;
    c.beginPath();
    c.moveTo(32, 52);
    c.quadraticCurveTo(50, 56, 52, 48);
    c.stroke();
    // Tail tip
    c.fillStyle = skin;
    c.beginPath();
    c.moveTo(52, 48); c.lineTo(56, 44); c.lineTo(54, 50);
    c.fill();

    // Body
    c.fillStyle = skin;
    c.beginPath();
    c.ellipse(32, 42, 10, 12, 0, 0, Math.PI * 2);
    c.fill();

    // Head
    c.beginPath();
    c.arc(32, 24, 9, 0, Math.PI * 2);
    c.fill();

    // Horns
    c.fillStyle = '#332';
    c.beginPath(); c.moveTo(24, 20); c.lineTo(20, 10); c.lineTo(27, 18); c.fill();
    c.beginPath(); c.moveTo(40, 20); c.lineTo(44, 10); c.lineTo(37, 18); c.fill();

    // Eyes — yellow, mischievous
    c.fillStyle = '#ffdd00';
    c.beginPath(); c.arc(28, 23, 3, 0, Math.PI * 2); c.fill();
    c.beginPath(); c.arc(36, 23, 3, 0, Math.PI * 2); c.fill();
    c.fillStyle = '#111';
    c.beginPath(); c.arc(29, 23, 1.2, 0, Math.PI * 2); c.fill();
    c.beginPath(); c.arc(37, 23, 1.2, 0, Math.PI * 2); c.fill();

    // Grin
    c.strokeStyle = '#220000';
    c.lineWidth = 1.5;
    c.beginPath();
    c.arc(32, 28, 5, 0.2, Math.PI - 0.2);
    c.stroke();

    // Wings (small, bat-like)
    c.fillStyle = `rgba(${r.int(100,140)},${r.int(20,40)},${r.int(15,30)},0.7)`;
    c.beginPath();
    c.moveTo(22, 36);
    c.quadraticCurveTo(8, 28, 6, 38);
    c.lineTo(10, 42);
    c.lineTo(16, 40);
    c.closePath();
    c.fill();
    c.beginPath();
    c.moveTo(42, 36);
    c.quadraticCurveTo(56, 28, 58, 38);
    c.lineTo(54, 42);
    c.lineTo(48, 40);
    c.closePath();
    c.fill();

    // Legs
    c.fillStyle = skin;
    c.fillRect(26, 52, 4, 8);
    c.fillRect(34, 52, 4, 8);
}

function drawBasilisk(c, r) {
    const scaleG = r.int(100, 160);
    const scales = `rgb(${r.int(40,80)},${scaleG},${r.int(30,60)})`;
    const belly = `rgb(${r.int(160,200)},${r.int(180,220)},${r.int(100,140)})`;

    // Coiled body
    c.fillStyle = scales;
    c.beginPath();
    c.ellipse(32, 48, 18, 10, 0, 0, Math.PI * 2);
    c.fill();
    c.beginPath();
    c.ellipse(28, 42, 14, 8, -0.2, 0, Math.PI * 2);
    c.fill();

    // Belly stripe
    c.fillStyle = belly;
    c.beginPath();
    c.ellipse(32, 52, 14, 5, 0, 0, Math.PI);
    c.fill();

    // Neck rising
    c.fillStyle = scales;
    c.beginPath();
    c.moveTo(34, 38);
    c.quadraticCurveTo(38, 26, 36, 18);
    c.lineTo(28, 18);
    c.quadraticCurveTo(26, 26, 30, 38);
    c.closePath();
    c.fill();

    // Head
    c.beginPath();
    c.ellipse(32, 14, 8, 7, 0, 0, Math.PI * 2);
    c.fill();

    // Crown/crest
    c.fillStyle = `rgb(${r.int(180,220)},${r.int(150,190)},${r.int(30,60)})`;
    c.beginPath();
    c.moveTo(26, 12);
    c.lineTo(24, 4);
    c.lineTo(28, 8);
    c.lineTo(32, 2);
    c.lineTo(36, 8);
    c.lineTo(40, 4);
    c.lineTo(38, 12);
    c.closePath();
    c.fill();

    // Eyes — glowing yellow/green
    c.fillStyle = '#aaff00';
    c.beginPath(); c.arc(28, 13, 2.5, 0, Math.PI * 2); c.fill();
    c.beginPath(); c.arc(36, 13, 2.5, 0, Math.PI * 2); c.fill();
    c.fillStyle = '#111';
    c.beginPath(); c.arc(28, 13, 1, 0, Math.PI * 2); c.fill();
    c.beginPath(); c.arc(36, 13, 1, 0, Math.PI * 2); c.fill();

    // Tongue
    c.strokeStyle = '#cc3355';
    c.lineWidth = 1;
    c.beginPath();
    c.moveTo(32, 20);
    c.lineTo(32, 26);
    c.lineTo(30, 28);
    c.stroke();
    c.beginPath();
    c.moveTo(32, 26);
    c.lineTo(34, 28);
    c.stroke();

    // Tail
    c.strokeStyle = scales;
    c.lineWidth = 4;
    c.beginPath();
    c.moveTo(14, 48);
    c.quadraticCurveTo(4, 52, 6, 58);
    c.stroke();
}

// ────────────────────────────────────────────────
// TINKERER NPC
// ────────────────────────────────────────────────

function drawTinkerer(c, r) {
    const skinTone = `rgb(${r.int(180,210)},${r.int(140,170)},${r.int(110,140)})`;
    const hatColor = `rgb(${r.int(80,120)},${r.int(50,70)},${r.int(20,40)})`;
    const apronColor = `rgb(${r.int(100,140)},${r.int(70,90)},${r.int(40,55)})`;

    // Backpack
    c.fillStyle = '#665533';
    c.fillRect(22, 22, 20, 24);
    // Tools sticking out
    c.strokeStyle = '#999';
    c.lineWidth = 2;
    c.beginPath(); c.moveTo(24, 22); c.lineTo(20, 10); c.stroke(); // hammer handle
    c.fillStyle = '#888';
    c.fillRect(17, 8, 6, 4); // hammer head
    c.strokeStyle = '#aa8833';
    c.lineWidth = 1.5;
    c.beginPath(); c.moveTo(38, 22); c.lineTo(42, 12); c.stroke(); // wrench

    // Body / apron
    c.fillStyle = apronColor;
    c.fillRect(20, 28, 24, 22);

    // Belt
    c.fillStyle = '#443322';
    c.fillRect(20, 42, 24, 3);
    c.fillStyle = '#ccaa44';
    c.fillRect(30, 42, 4, 3); // buckle

    // Head
    c.fillStyle = skinTone;
    c.beginPath();
    c.arc(32, 16, 9, 0, Math.PI * 2);
    c.fill();

    // Big hat
    c.fillStyle = hatColor;
    c.beginPath();
    c.ellipse(32, 10, 14, 4, 0, 0, Math.PI * 2);
    c.fill();
    c.fillRect(24, 4, 16, 8);
    c.beginPath();
    c.arc(32, 4, 8, Math.PI, 0);
    c.fill();

    // Goggles on forehead
    c.fillStyle = '#886633';
    c.strokeStyle = '#665522';
    c.lineWidth = 1;
    c.beginPath(); c.arc(28, 10, 3, 0, Math.PI * 2); c.fill(); c.stroke();
    c.beginPath(); c.arc(36, 10, 3, 0, Math.PI * 2); c.fill(); c.stroke();
    c.fillStyle = '#aaddff';
    c.beginPath(); c.arc(28, 10, 2, 0, Math.PI * 2); c.fill();
    c.beginPath(); c.arc(36, 10, 2, 0, Math.PI * 2); c.fill();

    // Eyes — friendly
    c.fillStyle = '#332211';
    c.beginPath(); c.arc(29, 16, 1.5, 0, Math.PI * 2); c.fill();
    c.beginPath(); c.arc(35, 16, 1.5, 0, Math.PI * 2); c.fill();

    // Smile
    c.strokeStyle = '#553322';
    c.lineWidth = 1.5;
    c.beginPath();
    c.arc(32, 19, 4, 0.2, Math.PI - 0.2);
    c.stroke();

    // Arms
    c.fillStyle = skinTone;
    c.fillRect(12, 30, 8, 12);
    c.fillRect(44, 30, 8, 12);

    // Legs
    c.fillStyle = '#554433';
    c.fillRect(22, 50, 8, 12);
    c.fillRect(34, 50, 8, 12);

    // Boots
    c.fillStyle = '#443322';
    c.fillRect(20, 58, 10, 4);
    c.fillRect(34, 58, 10, 4);
}

/**
 * Cultist — robed chanter in dark-red hooded robes with a glowing sigil.
 * Phase 8 introduces this as the first AoE-magic monster; the palette and
 * outline follow the wraith template so the shape reads as "caster" at a
 * glance, but red/black instead of purple signals danger.
 */
function drawCultist(c, r) {
    const robe     = `rgb(${r.int(90,120)},${r.int(20,35)},${r.int(20,35)})`;
    const darkRobe = `rgb(${r.int(40,55)},${r.int(8,18)},${r.int(8,18)})`;
    const trim     = `rgb(${r.int(160,200)},${r.int(140,170)},${r.int(40,60)})`;

    // Robe body — wide at the base with ragged hem.
    c.fillStyle = darkRobe;
    c.beginPath();
    c.moveTo(16, 24);
    c.quadraticCurveTo(10, 50, 6, 62);
    c.lineTo(16, 58);
    c.lineTo(22, 64);
    c.lineTo(28, 56);
    c.lineTo(32, 62);
    c.lineTo(36, 56);
    c.lineTo(42, 64);
    c.lineTo(48, 58);
    c.lineTo(58, 62);
    c.quadraticCurveTo(54, 50, 48, 24);
    c.closePath();
    c.fill();

    // Outer robe folds
    c.fillStyle = robe;
    c.beginPath();
    c.moveTo(18, 26);
    c.lineTo(32, 40);
    c.lineTo(46, 26);
    c.lineTo(44, 50);
    c.lineTo(32, 44);
    c.lineTo(20, 50);
    c.closePath();
    c.fill();

    // Gold trim at hem
    c.fillStyle = trim;
    c.fillRect(14, 56, 4, 2);
    c.fillRect(24, 58, 4, 2);
    c.fillRect(34, 58, 4, 2);
    c.fillRect(46, 56, 4, 2);

    // Hood
    c.fillStyle = darkRobe;
    c.beginPath();
    c.moveTo(14, 28);
    c.quadraticCurveTo(32, 0, 50, 28);
    c.quadraticCurveTo(42, 20, 32, 18);
    c.quadraticCurveTo(22, 20, 14, 28);
    c.fill();

    // Face void (hood shadow)
    c.fillStyle = '#100404';
    c.beginPath();
    c.ellipse(32, 22, 9, 8, 0, 0.3, Math.PI - 0.3);
    c.fill();

    // Glowing red eyes
    c.shadowColor = '#ff2222';
    c.shadowBlur = 10;
    c.fillStyle = '#ffcccc';
    c.beginPath(); c.arc(27, 20, 2.2, 0, Math.PI * 2); c.fill();
    c.beginPath(); c.arc(37, 20, 2.2, 0, Math.PI * 2); c.fill();

    // Chest sigil (glowing dark-red rune)
    c.shadowColor = '#ff3300';
    c.shadowBlur = 14;
    c.strokeStyle = '#ffaa33';
    c.lineWidth = 1.5;
    c.beginPath();
    c.arc(32, 42, 5, 0, Math.PI * 2);
    c.moveTo(27, 42); c.lineTo(37, 42);
    c.moveTo(32, 37); c.lineTo(32, 47);
    c.stroke();
    c.shadowBlur = 0;
}

// ────────────────────────────────────────────────
// Phase 11 — early-dungeon roster (levels 1-3)
// ────────────────────────────────────────────────

function drawCentipede(c, r) {
    const seg = `rgb(${r.int(80,120)},${r.int(40,70)},${r.int(20,40)})`;
    const dark = `rgb(${r.int(30,50)},${r.int(15,25)},${r.int(10,20)})`;
    // Long segmented body arcing across the canvas
    for (let i = 0; i < 10; i++) {
        const x = 8 + i * 5;
        const y = 32 + Math.sin(i * 0.9) * 8;
        c.fillStyle = i === 0 ? dark : seg;
        c.beginPath();
        c.ellipse(x, y, 4, 4.5, 0, 0, Math.PI * 2);
        c.fill();
        // legs
        c.strokeStyle = dark;
        c.lineWidth = 1.2;
        c.beginPath(); c.moveTo(x, y - 3); c.lineTo(x - 1, y - 8); c.stroke();
        c.beginPath(); c.moveTo(x, y + 3); c.lineTo(x - 1, y + 8); c.stroke();
    }
    // Head antennae + pincers
    c.strokeStyle = '#ffaa22';
    c.lineWidth = 1.5;
    c.beginPath(); c.moveTo(8, 28); c.lineTo(2, 22); c.stroke();
    c.beginPath(); c.moveTo(8, 36); c.lineTo(2, 42); c.stroke();
    c.fillStyle = '#ff2222';
    c.beginPath(); c.arc(6, 30, 1.5, 0, Math.PI * 2); c.fill();
    c.beginPath(); c.arc(6, 34, 1.5, 0, Math.PI * 2); c.fill();
}

function drawCaveCrawler(c, r) {
    const body = `rgb(${r.int(50,80)},${r.int(50,80)},${r.int(70,100)})`;
    const shell = `rgb(${r.int(30,50)},${r.int(30,50)},${r.int(50,70)})`;
    // Low, flat body
    c.fillStyle = body;
    c.beginPath(); c.ellipse(32, 40, 20, 10, 0, 0, Math.PI * 2); c.fill();
    // Carapace plates
    c.fillStyle = shell;
    for (let i = 0; i < 4; i++) {
        c.beginPath(); c.ellipse(18 + i * 9, 36, 5, 6, 0, 0, Math.PI * 2); c.fill();
    }
    // Claws up front
    c.strokeStyle = shell;
    c.lineWidth = 2;
    c.beginPath(); c.moveTo(14, 40); c.quadraticCurveTo(6, 38, 4, 28); c.stroke();
    c.beginPath(); c.moveTo(14, 44); c.quadraticCurveTo(6, 46, 4, 54); c.stroke();
    // Eyes on stalks
    c.strokeStyle = body; c.lineWidth = 1.2;
    c.beginPath(); c.moveTo(22, 32); c.lineTo(20, 24); c.stroke();
    c.beginPath(); c.moveTo(26, 32); c.lineTo(28, 22); c.stroke();
    c.fillStyle = '#ffee66';
    c.beginPath(); c.arc(20, 24, 2, 0, Math.PI * 2); c.fill();
    c.beginPath(); c.arc(28, 22, 2, 0, Math.PI * 2); c.fill();
    // Legs
    c.strokeStyle = shell; c.lineWidth = 1.5;
    for (let i = 0; i < 4; i++) {
        const x = 18 + i * 7;
        c.beginPath(); c.moveTo(x, 46); c.lineTo(x - 3, 54); c.stroke();
    }
}

function drawWidow(c, r) {
    const dark = `rgb(${r.int(10,25)},${r.int(5,15)},${r.int(5,15)})`;
    // Abdomen (bulbous)
    c.fillStyle = dark;
    c.beginPath(); c.ellipse(32, 42, 15, 17, 0, 0, Math.PI * 2); c.fill();
    // Red hourglass
    c.fillStyle = '#cc0000';
    c.beginPath();
    c.moveTo(28, 38); c.lineTo(36, 38);
    c.lineTo(34, 44); c.lineTo(38, 50);
    c.lineTo(26, 50); c.lineTo(30, 44);
    c.closePath(); c.fill();
    // Cephalothorax
    c.fillStyle = dark;
    c.beginPath(); c.ellipse(32, 22, 9, 9, 0, 0, Math.PI * 2); c.fill();
    // Glowing red eyes in a cluster
    c.fillStyle = '#ff2222';
    for (const [dx, dy] of [[-3,-2],[3,-2],[-5,0],[5,0],[-1,-4],[1,-4]]) {
        c.beginPath(); c.arc(32 + dx, 22 + dy, 1.4, 0, Math.PI * 2); c.fill();
    }
    // Fangs
    c.fillStyle = '#eeeecc';
    c.beginPath(); c.moveTo(29, 28); c.lineTo(27, 33); c.lineTo(30, 32); c.closePath(); c.fill();
    c.beginPath(); c.moveTo(35, 28); c.lineTo(37, 33); c.lineTo(34, 32); c.closePath(); c.fill();
    // 8 legs
    c.strokeStyle = dark; c.lineWidth = 2;
    for (const [sx, sy, ex, ey] of [[23,20,6,12],[23,24,2,22],[23,28,4,38],[24,32,10,54]]) {
        c.beginPath(); c.moveTo(sx, sy); c.quadraticCurveTo(sx - 8, sy + 2, ex, ey); c.stroke();
        c.beginPath(); c.moveTo(64 - sx, sy); c.quadraticCurveTo(64 - sx + 8, sy + 2, 64 - ex, ey); c.stroke();
    }
}

function drawSporeFungus(c, r) {
    const cap = `rgb(${r.int(120,160)},${r.int(60,90)},${r.int(120,160)})`;
    const stem = `rgb(${r.int(220,240)},${r.int(210,230)},${r.int(180,210)})`;
    // Stem
    c.fillStyle = stem;
    c.beginPath();
    c.moveTo(26, 60); c.lineTo(28, 30); c.lineTo(36, 30); c.lineTo(38, 60);
    c.closePath(); c.fill();
    // Cap (dome)
    c.fillStyle = cap;
    c.beginPath();
    c.ellipse(32, 26, 20, 14, 0, Math.PI, 0, true);
    c.lineTo(52, 30); c.lineTo(12, 30); c.closePath();
    c.fill();
    // Cap spots
    c.fillStyle = '#ffe699';
    for (let i = 0; i < 7; i++) {
        const sx = 16 + i * 5;
        const sy = 20 + Math.sin(i) * 4;
        c.beginPath(); c.arc(sx, sy, 1.8, 0, Math.PI * 2); c.fill();
    }
    // Puffed spore cloud around cap
    c.fillStyle = 'rgba(180,255,120,0.35)';
    for (let i = 0; i < 10; i++) {
        const ang = i * 0.6;
        c.beginPath();
        c.arc(32 + Math.cos(ang) * 24, 22 + Math.sin(ang) * 10, 3, 0, Math.PI * 2);
        c.fill();
    }
    // Gills under cap
    c.strokeStyle = 'rgba(60,20,40,0.6)'; c.lineWidth = 1;
    for (let i = 0; i < 6; i++) {
        c.beginPath(); c.moveTo(18 + i * 5, 30); c.lineTo(18 + i * 5, 34); c.stroke();
    }
}

function drawShrieker(c, r) {
    const body = `rgb(${r.int(100,140)},${r.int(40,70)},${r.int(80,120)})`;
    const dark = `rgb(${r.int(40,60)},${r.int(20,30)},${r.int(40,60)})`;
    // Bulbous body like a screaming mushroom
    c.fillStyle = body;
    c.beginPath(); c.ellipse(32, 40, 14, 20, 0, 0, Math.PI * 2); c.fill();
    // Stem base
    c.fillStyle = dark;
    c.fillRect(28, 54, 8, 8);
    // Mouth agape
    c.fillStyle = '#110000';
    c.beginPath(); c.ellipse(32, 36, 7, 10, 0, 0, Math.PI * 2); c.fill();
    // Teeth rim
    c.fillStyle = '#ffeecc';
    for (let i = 0; i < 6; i++) {
        c.fillRect(26 + i * 2.2, 28, 1.5, 3);
        c.fillRect(26 + i * 2.2, 42, 1.5, 3);
    }
    // Radiating sound waves
    c.strokeStyle = 'rgba(255,220,120,0.7)';
    c.lineWidth = 1.5;
    for (let rd = 18; rd <= 28; rd += 4) {
        c.beginPath(); c.arc(32, 36, rd, -Math.PI * 0.35, Math.PI * 0.35); c.stroke();
        c.beginPath(); c.arc(32, 36, rd, Math.PI - 0.35, Math.PI + 0.35); c.stroke();
    }
}

function drawKobold(c, r) {
    const scale = `rgb(${r.int(140,180)},${r.int(80,110)},${r.int(40,70)})`;
    const dark = `rgb(${r.int(60,90)},${r.int(30,50)},${r.int(15,30)})`;
    // Body
    c.fillStyle = scale;
    c.fillRect(26, 28, 12, 20);
    // Head (snouted)
    c.beginPath(); c.arc(32, 20, 8, 0, Math.PI * 2); c.fill();
    c.fillStyle = dark;
    c.beginPath(); c.moveTo(32, 20); c.lineTo(42, 22); c.lineTo(32, 26); c.closePath(); c.fill();
    // Horns
    c.fillStyle = '#222';
    c.beginPath(); c.moveTo(27, 14); c.lineTo(25, 8); c.lineTo(29, 12); c.closePath(); c.fill();
    c.beginPath(); c.moveTo(37, 14); c.lineTo(39, 8); c.lineTo(35, 12); c.closePath(); c.fill();
    // Eyes
    c.fillStyle = '#ffeb3b';
    c.beginPath(); c.arc(29, 19, 1.3, 0, Math.PI * 2); c.fill();
    c.beginPath(); c.arc(35, 19, 1.3, 0, Math.PI * 2); c.fill();
    // Legs & tail
    c.fillStyle = scale;
    c.fillRect(27, 48, 4, 10);
    c.fillRect(33, 48, 4, 10);
    c.strokeStyle = scale; c.lineWidth = 3;
    c.beginPath(); c.moveTo(38, 40); c.quadraticCurveTo(50, 44, 54, 56); c.stroke();
    // Spear
    c.strokeStyle = '#884422'; c.lineWidth = 2;
    c.beginPath(); c.moveTo(22, 14); c.lineTo(18, 58); c.stroke();
    c.fillStyle = '#bbbbbb';
    c.beginPath(); c.moveTo(22, 14); c.lineTo(24, 8); c.lineTo(18, 14); c.closePath(); c.fill();
}

function drawKoboldShaman(c, r) {
    const scale = `rgb(${r.int(70,110)},${r.int(40,60)},${r.int(120,160)})`;
    const robe  = `rgb(${r.int(60,90)},${r.int(20,40)},${r.int(100,140)})`;
    // Robed body
    c.fillStyle = robe;
    c.beginPath();
    c.moveTo(18, 58); c.lineTo(22, 28); c.lineTo(42, 28); c.lineTo(46, 58);
    c.closePath(); c.fill();
    // Head
    c.fillStyle = scale;
    c.beginPath(); c.arc(32, 20, 8, 0, Math.PI * 2); c.fill();
    // Hood
    c.fillStyle = '#220033';
    c.beginPath();
    c.moveTo(22, 22); c.quadraticCurveTo(32, 4, 42, 22);
    c.closePath(); c.fill();
    // Eyes glowing purple
    c.shadowColor = '#cc66ff'; c.shadowBlur = 6;
    c.fillStyle = '#ff88ff';
    c.beginPath(); c.arc(29, 21, 1.4, 0, Math.PI * 2); c.fill();
    c.beginPath(); c.arc(35, 21, 1.4, 0, Math.PI * 2); c.fill();
    c.shadowBlur = 0;
    // Staff with glowing orb
    c.strokeStyle = '#663300'; c.lineWidth = 2;
    c.beginPath(); c.moveTo(50, 10); c.lineTo(46, 60); c.stroke();
    c.shadowColor = '#ff66ff'; c.shadowBlur = 10;
    c.fillStyle = '#ffaaff';
    c.beginPath(); c.arc(50, 10, 4, 0, Math.PI * 2); c.fill();
    c.shadowBlur = 0;
}

function drawCaveFisher(c, r) {
    const body = `rgb(${r.int(110,150)},${r.int(90,130)},${r.int(70,110)})`;
    const dark = `rgb(${r.int(50,70)},${r.int(40,60)},${r.int(30,50)})`;
    // Crab-like body
    c.fillStyle = body;
    c.beginPath(); c.ellipse(32, 42, 16, 11, 0, 0, Math.PI * 2); c.fill();
    // Carapace ridges
    c.strokeStyle = dark; c.lineWidth = 1.5;
    c.beginPath(); c.ellipse(32, 42, 12, 7, 0, 0, Math.PI * 2); c.stroke();
    c.beginPath(); c.ellipse(32, 42, 6, 4, 0, 0, Math.PI * 2); c.stroke();
    // Two massive front claws
    c.fillStyle = body;
    c.beginPath();
    c.moveTo(18, 38); c.lineTo(6, 28); c.lineTo(12, 34); c.lineTo(4, 40);
    c.lineTo(14, 44); c.closePath(); c.fill();
    c.beginPath();
    c.moveTo(46, 38); c.lineTo(58, 28); c.lineTo(52, 34); c.lineTo(60, 40);
    c.lineTo(50, 44); c.closePath(); c.fill();
    // Eyes (long stalks + shining tip)
    c.strokeStyle = dark; c.lineWidth = 1.5;
    c.beginPath(); c.moveTo(28, 34); c.lineTo(26, 20); c.stroke();
    c.beginPath(); c.moveTo(36, 34); c.lineTo(38, 20); c.stroke();
    c.fillStyle = '#ffcc00';
    c.beginPath(); c.arc(26, 20, 2, 0, Math.PI * 2); c.fill();
    c.beginPath(); c.arc(38, 20, 2, 0, Math.PI * 2); c.fill();
    // Sticky silk dangling from ceiling
    c.strokeStyle = 'rgba(240,240,240,0.65)'; c.lineWidth = 1;
    for (let i = 0; i < 4; i++) {
        c.beginPath(); c.moveTo(20 + i * 7, 0); c.lineTo(22 + i * 7, 30); c.stroke();
    }
}

function drawStirge(c, r) {
    const body = `rgb(${r.int(120,160)},${r.int(30,50)},${r.int(40,60)})`;
    const dark = `rgb(${r.int(60,80)},${r.int(15,25)},${r.int(15,25)})`;
    // Bulbous blood-sack body
    c.fillStyle = body;
    c.beginPath(); c.ellipse(32, 36, 10, 14, 0, 0, Math.PI * 2); c.fill();
    // Head with long proboscis
    c.fillStyle = dark;
    c.beginPath(); c.arc(32, 20, 6, 0, Math.PI * 2); c.fill();
    c.strokeStyle = dark; c.lineWidth = 2;
    c.beginPath(); c.moveTo(32, 24); c.lineTo(32, 62); c.stroke();
    c.fillStyle = '#ffcc00';
    c.beginPath(); c.arc(30, 19, 1.4, 0, Math.PI * 2); c.fill();
    c.beginPath(); c.arc(34, 19, 1.4, 0, Math.PI * 2); c.fill();
    // Wings (translucent membranes)
    c.fillStyle = 'rgba(180,100,100,0.55)';
    c.beginPath();
    c.moveTo(22, 26); c.quadraticCurveTo(2, 18, 6, 40); c.quadraticCurveTo(18, 38, 22, 36);
    c.closePath(); c.fill();
    c.beginPath();
    c.moveTo(42, 26); c.quadraticCurveTo(62, 18, 58, 40); c.quadraticCurveTo(46, 38, 42, 36);
    c.closePath(); c.fill();
    // Wing ribs
    c.strokeStyle = dark; c.lineWidth = 1;
    c.beginPath(); c.moveTo(22, 26); c.lineTo(6, 40); c.stroke();
    c.beginPath(); c.moveTo(42, 26); c.lineTo(58, 40); c.stroke();
    // Spindly legs
    c.strokeStyle = dark; c.lineWidth = 1;
    for (let i = 0; i < 3; i++) {
        c.beginPath(); c.moveTo(30, 46 + i * 2); c.lineTo(24, 58 + i * 2); c.stroke();
        c.beginPath(); c.moveTo(34, 46 + i * 2); c.lineTo(40, 58 + i * 2); c.stroke();
    }
}

function drawAcidSlime(c, r) {
    const g = `rgb(${r.int(140,200)},${r.int(240,255)},${r.int(80,140)})`;
    const d = `rgb(${r.int(60,100)},${r.int(140,180)},${r.int(30,60)})`;
    // Glowing puddle body
    c.shadowColor = '#ccff66'; c.shadowBlur = 12;
    c.fillStyle = g;
    c.beginPath();
    c.moveTo(8, 52); c.quadraticCurveTo(12, 20, 32, 18); c.quadraticCurveTo(52, 20, 56, 52);
    c.quadraticCurveTo(32, 60, 8, 52);
    c.closePath(); c.fill();
    c.shadowBlur = 0;
    // Drip highlights
    c.fillStyle = 'rgba(255,255,180,0.8)';
    c.beginPath(); c.ellipse(24, 28, 3, 4, 0, 0, Math.PI * 2); c.fill();
    c.beginPath(); c.ellipse(40, 30, 2, 3, 0, 0, Math.PI * 2); c.fill();
    // Eyes
    c.fillStyle = d;
    c.beginPath(); c.arc(26, 38, 3, 0, Math.PI * 2); c.fill();
    c.beginPath(); c.arc(38, 38, 3, 0, Math.PI * 2); c.fill();
    c.fillStyle = '#000';
    c.beginPath(); c.arc(26, 38, 1.3, 0, Math.PI * 2); c.fill();
    c.beginPath(); c.arc(38, 38, 1.3, 0, Math.PI * 2); c.fill();
    // Dripping acid
    c.fillStyle = g;
    c.beginPath(); c.ellipse(16, 58, 2, 4, 0, 0, Math.PI * 2); c.fill();
    c.beginPath(); c.ellipse(48, 60, 2, 3, 0, 0, Math.PI * 2); c.fill();
    // Bubbles
    c.fillStyle = 'rgba(255,255,200,0.7)';
    c.beginPath(); c.arc(20, 44, 1.5, 0, Math.PI * 2); c.fill();
    c.beginPath(); c.arc(44, 42, 1.2, 0, Math.PI * 2); c.fill();
}

function drawFlameImp(c, r) {
    const body = `rgb(${r.int(200,240)},${r.int(80,120)},${r.int(20,50)})`;
    // Glowing fiery body
    c.shadowColor = '#ff4400'; c.shadowBlur = 12;
    c.fillStyle = body;
    c.beginPath(); c.arc(32, 26, 10, 0, Math.PI * 2); c.fill();
    c.fillRect(26, 30, 12, 18);
    c.shadowBlur = 0;
    // Horns
    c.fillStyle = '#440000';
    c.beginPath(); c.moveTo(26, 18); c.lineTo(22, 8); c.lineTo(30, 14); c.closePath(); c.fill();
    c.beginPath(); c.moveTo(38, 18); c.lineTo(42, 8); c.lineTo(34, 14); c.closePath(); c.fill();
    // Eyes
    c.fillStyle = '#ffff00';
    c.beginPath(); c.arc(29, 25, 1.8, 0, Math.PI * 2); c.fill();
    c.beginPath(); c.arc(35, 25, 1.8, 0, Math.PI * 2); c.fill();
    // Fangs
    c.fillStyle = '#fff';
    c.beginPath(); c.moveTo(29, 30); c.lineTo(30, 34); c.lineTo(31, 30); c.closePath(); c.fill();
    c.beginPath(); c.moveTo(33, 30); c.lineTo(34, 34); c.lineTo(35, 30); c.closePath(); c.fill();
    // Flames around body
    c.fillStyle = 'rgba(255,180,0,0.6)';
    for (let i = 0; i < 9; i++) {
        const ang = i * (Math.PI * 2 / 9);
        const rd = 14 + r.int(0, 4);
        c.beginPath();
        c.arc(32 + Math.cos(ang) * rd, 32 + Math.sin(ang) * rd, 3, 0, Math.PI * 2);
        c.fill();
    }
    // Wings
    c.fillStyle = 'rgba(255,80,0,0.7)';
    c.beginPath(); c.moveTo(22, 30); c.lineTo(10, 24); c.lineTo(14, 36); c.closePath(); c.fill();
    c.beginPath(); c.moveTo(42, 30); c.lineTo(54, 24); c.lineTo(50, 36); c.closePath(); c.fill();
    // Tail flame
    c.fillStyle = '#ffaa00';
    c.beginPath(); c.moveTo(32, 46); c.lineTo(36, 60); c.lineTo(32, 56); c.lineTo(28, 60); c.closePath(); c.fill();
}

function drawBoneGnasher(c, r) {
    const bone = `rgb(${r.int(220,240)},${r.int(210,225)},${r.int(180,200)})`;
    // Skull-shaped predator — just a head with massive jaws
    c.fillStyle = bone;
    c.beginPath(); c.ellipse(32, 30, 18, 14, 0, 0, Math.PI * 2); c.fill();
    // Upper/lower jaw split
    c.fillStyle = '#1a0000';
    c.fillRect(14, 34, 36, 2);
    // Teeth rows (big)
    c.fillStyle = bone;
    for (let i = 0; i < 8; i++) {
        c.beginPath();
        c.moveTo(16 + i * 4, 34); c.lineTo(18 + i * 4, 42); c.lineTo(20 + i * 4, 34);
        c.closePath(); c.fill();
        c.beginPath();
        c.moveTo(16 + i * 4, 36); c.lineTo(18 + i * 4, 28); c.lineTo(20 + i * 4, 36);
        c.closePath(); c.fill();
    }
    // Empty eye sockets with glow
    c.fillStyle = '#000';
    c.beginPath(); c.arc(24, 22, 4, 0, Math.PI * 2); c.fill();
    c.beginPath(); c.arc(40, 22, 4, 0, Math.PI * 2); c.fill();
    c.shadowColor = '#33ff66'; c.shadowBlur = 8;
    c.fillStyle = '#66ff88';
    c.beginPath(); c.arc(24, 22, 1.6, 0, Math.PI * 2); c.fill();
    c.beginPath(); c.arc(40, 22, 1.6, 0, Math.PI * 2); c.fill();
    c.shadowBlur = 0;
    // Cracks
    c.strokeStyle = '#666'; c.lineWidth = 0.8;
    c.beginPath(); c.moveTo(16, 18); c.lineTo(22, 24); c.stroke();
    c.beginPath(); c.moveTo(46, 20); c.lineTo(40, 28); c.stroke();
    // Tendons trailing behind
    c.strokeStyle = '#aa2222'; c.lineWidth = 1;
    for (let i = 0; i < 5; i++) {
        c.beginPath();
        c.moveTo(32 + (i - 2) * 3, 44);
        c.quadraticCurveTo(32 + (i - 2) * 4, 52, 32 + (i - 2) * 2, 60);
        c.stroke();
    }
}

function drawBloodWasp(c, r) {
    const body = `rgb(${r.int(140,180)},${r.int(20,40)},${r.int(30,50)})`;
    const stripe = `rgb(${r.int(40,70)},${r.int(20,30)},${r.int(10,20)})`;
    // Head
    c.fillStyle = stripe;
    c.beginPath(); c.arc(16, 32, 6, 0, Math.PI * 2); c.fill();
    // Thorax
    c.fillStyle = body;
    c.beginPath(); c.ellipse(28, 32, 8, 6, 0, 0, Math.PI * 2); c.fill();
    // Abdomen (striped)
    c.fillStyle = body;
    c.beginPath(); c.ellipse(46, 32, 12, 8, 0, 0, Math.PI * 2); c.fill();
    c.fillStyle = stripe;
    for (let i = 0; i < 3; i++) {
        c.fillRect(40 + i * 5, 26, 2, 12);
    }
    // Stinger
    c.fillStyle = '#222';
    c.beginPath(); c.moveTo(58, 32); c.lineTo(62, 30); c.lineTo(62, 34); c.closePath(); c.fill();
    // Eyes
    c.fillStyle = '#ffff33';
    c.beginPath(); c.arc(13, 30, 1.5, 0, Math.PI * 2); c.fill();
    c.beginPath(); c.arc(13, 34, 1.5, 0, Math.PI * 2); c.fill();
    // Wings (translucent)
    c.fillStyle = 'rgba(200,220,255,0.5)';
    c.beginPath(); c.ellipse(30, 20, 12, 6, -0.3, 0, Math.PI * 2); c.fill();
    c.beginPath(); c.ellipse(30, 44, 12, 6, 0.3, 0, Math.PI * 2); c.fill();
    c.strokeStyle = '#332233'; c.lineWidth = 0.7;
    c.beginPath(); c.ellipse(30, 20, 12, 6, -0.3, 0, Math.PI * 2); c.stroke();
    c.beginPath(); c.ellipse(30, 44, 12, 6, 0.3, 0, Math.PI * 2); c.stroke();
    // Legs
    c.strokeStyle = stripe; c.lineWidth = 1;
    for (let i = 0; i < 3; i++) {
        c.beginPath(); c.moveTo(24 + i * 4, 36); c.lineTo(22 + i * 4, 50); c.stroke();
    }
}

function drawIceSprite(c, r) {
    const ice = `rgb(${r.int(200,230)},${r.int(230,250)},${r.int(240,255)})`;
    const blue = `rgb(${r.int(80,120)},${r.int(160,200)},${r.int(220,250)})`;
    // Body (crystalline)
    c.shadowColor = '#aaddff'; c.shadowBlur = 10;
    c.fillStyle = ice;
    c.beginPath();
    c.moveTo(32, 12); c.lineTo(42, 26); c.lineTo(38, 46); c.lineTo(26, 46); c.lineTo(22, 26);
    c.closePath(); c.fill();
    c.shadowBlur = 0;
    // Facial features
    c.fillStyle = blue;
    c.beginPath(); c.arc(28, 22, 1.6, 0, Math.PI * 2); c.fill();
    c.beginPath(); c.arc(36, 22, 1.6, 0, Math.PI * 2); c.fill();
    c.strokeStyle = blue; c.lineWidth = 1;
    c.beginPath(); c.moveTo(28, 28); c.lineTo(36, 28); c.stroke();
    // Frozen wings
    c.fillStyle = 'rgba(200,230,255,0.55)';
    c.beginPath();
    c.moveTo(22, 28); c.lineTo(4, 20); c.lineTo(10, 36); c.lineTo(22, 32);
    c.closePath(); c.fill();
    c.beginPath();
    c.moveTo(42, 28); c.lineTo(60, 20); c.lineTo(54, 36); c.lineTo(42, 32);
    c.closePath(); c.fill();
    // Ice shards floating
    c.fillStyle = ice;
    for (let i = 0; i < 6; i++) {
        const ang = i * (Math.PI / 3);
        const px = 32 + Math.cos(ang) * 22;
        const py = 32 + Math.sin(ang) * 22;
        c.beginPath();
        c.moveTo(px, py - 3); c.lineTo(px + 2, py); c.lineTo(px, py + 3); c.lineTo(px - 2, py);
        c.closePath(); c.fill();
    }
    // Lower trailing mist
    c.fillStyle = 'rgba(200,230,255,0.4)';
    c.beginPath(); c.ellipse(32, 54, 14, 6, 0, 0, Math.PI * 2); c.fill();
}

function drawStoneHag(c, r) {
    const rock = `rgb(${r.int(90,120)},${r.int(85,110)},${r.int(80,100)})`;
    const dark = `rgb(${r.int(40,60)},${r.int(40,55)},${r.int(35,50)})`;
    // Hunched body (boulder-like)
    c.fillStyle = rock;
    c.beginPath(); c.ellipse(32, 42, 18, 16, 0, 0, Math.PI * 2); c.fill();
    // Head (craggy)
    c.beginPath(); c.ellipse(32, 20, 10, 11, 0, 0, Math.PI * 2); c.fill();
    // Jagged shoulder spikes
    c.fillStyle = dark;
    for (const [x, y, w, h] of [[16,30,4,8],[44,30,4,8],[12,44,5,7],[47,44,5,7]]) {
        c.beginPath(); c.moveTo(x, y); c.lineTo(x + w, y - 2); c.lineTo(x + w / 2, y + h);
        c.closePath(); c.fill();
    }
    // Deep eye sockets
    c.fillStyle = '#000';
    c.beginPath(); c.arc(28, 19, 2.5, 0, Math.PI * 2); c.fill();
    c.beginPath(); c.arc(36, 19, 2.5, 0, Math.PI * 2); c.fill();
    c.fillStyle = '#ff8833';
    c.beginPath(); c.arc(28, 19, 1, 0, Math.PI * 2); c.fill();
    c.beginPath(); c.arc(36, 19, 1, 0, Math.PI * 2); c.fill();
    // Crooked mouth
    c.strokeStyle = dark; c.lineWidth = 1.5;
    c.beginPath(); c.moveTo(26, 26); c.lineTo(30, 25); c.lineTo(34, 27); c.lineTo(38, 25); c.stroke();
    // Cracks
    c.strokeStyle = dark; c.lineWidth = 0.7;
    c.beginPath(); c.moveTo(20, 40); c.lineTo(28, 46); c.stroke();
    c.beginPath(); c.moveTo(44, 36); c.lineTo(36, 50); c.stroke();
    c.beginPath(); c.moveTo(26, 14); c.lineTo(22, 20); c.stroke();
}

function drawGhoulPup(c, r) {
    const grey = `rgb(${r.int(150,180)},${r.int(140,170)},${r.int(120,150)})`;
    const dark = `rgb(${r.int(60,80)},${r.int(40,55)},${r.int(45,60)})`;
    // Hunched small body
    c.fillStyle = grey;
    c.beginPath(); c.ellipse(32, 40, 13, 14, 0, 0, Math.PI * 2); c.fill();
    // Head (too big)
    c.beginPath(); c.arc(32, 22, 10, 0, Math.PI * 2); c.fill();
    // Sunken eyes
    c.fillStyle = '#000';
    c.beginPath(); c.arc(28, 21, 2.5, 0, Math.PI * 2); c.fill();
    c.beginPath(); c.arc(36, 21, 2.5, 0, Math.PI * 2); c.fill();
    c.fillStyle = '#ffff66';
    c.beginPath(); c.arc(28, 21, 1, 0, Math.PI * 2); c.fill();
    c.beginPath(); c.arc(36, 21, 1, 0, Math.PI * 2); c.fill();
    // Gaping fanged mouth
    c.fillStyle = '#110000';
    c.beginPath(); c.ellipse(32, 28, 5, 3, 0, 0, Math.PI * 2); c.fill();
    c.fillStyle = '#ffffcc';
    for (let i = 0; i < 4; i++) {
        c.beginPath(); c.moveTo(28 + i * 3, 26); c.lineTo(29 + i * 3, 31); c.lineTo(30 + i * 3, 26); c.closePath(); c.fill();
    }
    // Long claws
    c.strokeStyle = dark; c.lineWidth = 2;
    c.beginPath(); c.moveTo(19, 38); c.lineTo(10, 48); c.stroke();
    c.beginPath(); c.moveTo(45, 38); c.lineTo(54, 48); c.stroke();
    c.fillStyle = '#220022';
    c.beginPath(); c.moveTo(8, 48); c.lineTo(12, 50); c.lineTo(10, 52); c.closePath(); c.fill();
    c.beginPath(); c.moveTo(56, 48); c.lineTo(52, 50); c.lineTo(54, 52); c.closePath(); c.fill();
    // Stitching (patchwork corpse look)
    c.strokeStyle = '#331111'; c.lineWidth = 0.8;
    c.beginPath(); c.moveTo(24, 34); c.lineTo(40, 36); c.stroke();
    for (let i = 0; i < 6; i++) {
        c.beginPath(); c.moveTo(25 + i * 2.5, 32); c.lineTo(25 + i * 2.5, 38); c.stroke();
    }
}

function drawMyconid(c, r) {
    const cap = `rgb(${r.int(70,110)},${r.int(130,170)},${r.int(90,120)})`;
    const stem = `rgb(${r.int(200,230)},${r.int(200,220)},${r.int(160,190)})`;
    // Cap (mushroom-humanoid)
    c.fillStyle = cap;
    c.beginPath();
    c.ellipse(32, 18, 16, 10, 0, Math.PI, 0, true);
    c.lineTo(48, 22); c.lineTo(16, 22); c.closePath();
    c.fill();
    // Cap spots
    c.fillStyle = '#f4e5bb';
    for (const [x, y, rd] of [[24,14,2.5],[36,12,2],[30,18,1.5],[40,16,1.5]]) {
        c.beginPath(); c.arc(x, y, rd, 0, Math.PI * 2); c.fill();
    }
    // Stem / body
    c.fillStyle = stem;
    c.beginPath();
    c.moveTo(26, 22); c.lineTo(22, 58); c.lineTo(42, 58); c.lineTo(38, 22);
    c.closePath(); c.fill();
    // Gill lines under cap
    c.strokeStyle = '#4a5a3a'; c.lineWidth = 1;
    for (let i = 0; i < 8; i++) c.fillRect(18 + i * 4, 22, 1, 2);
    // Small face
    c.fillStyle = '#1a2010';
    c.beginPath(); c.arc(28, 32, 1.5, 0, Math.PI * 2); c.fill();
    c.beginPath(); c.arc(36, 32, 1.5, 0, Math.PI * 2); c.fill();
    c.strokeStyle = '#1a2010'; c.lineWidth = 1;
    c.beginPath(); c.moveTo(28, 38); c.lineTo(36, 38); c.stroke();
    // Spore cloud rising
    c.fillStyle = 'rgba(150,220,140,0.35)';
    for (let i = 0; i < 8; i++) {
        const sx = 14 + Math.random() * 36;
        const sy = 2 + Math.random() * 12;
        c.beginPath(); c.arc(sx, sy, 2.5, 0, Math.PI * 2); c.fill();
    }
    // Arm stubs
    c.fillStyle = stem;
    c.beginPath(); c.ellipse(20, 36, 3, 6, 0.2, 0, Math.PI * 2); c.fill();
    c.beginPath(); c.ellipse(44, 36, 3, 6, -0.2, 0, Math.PI * 2); c.fill();
}

function drawDustDevil(c, r) {
    const sand = `rgb(${r.int(200,230)},${r.int(180,210)},${r.int(130,160)})`;
    const dark = `rgb(${r.int(140,170)},${r.int(110,140)},${r.int(70,100)})`;
    // Swirling cone (whirlwind)
    c.fillStyle = sand;
    c.beginPath();
    c.moveTo(32, 6); c.lineTo(48, 58); c.lineTo(16, 58); c.closePath();
    c.fill();
    // Swirl lines
    c.strokeStyle = dark; c.lineWidth = 1.5;
    for (let i = 0; i < 5; i++) {
        const y = 12 + i * 10;
        const w = 4 + i * 4;
        c.beginPath();
        c.ellipse(32, y, w, 2, 0, 0, Math.PI * 2);
        c.stroke();
    }
    // Dust particles
    c.fillStyle = 'rgba(255,240,200,0.8)';
    for (let i = 0; i < 14; i++) {
        const ang = i * 0.5;
        const rd = 10 + (i % 3) * 8;
        c.beginPath();
        c.arc(32 + Math.cos(ang) * rd, 30 + Math.sin(ang) * rd, 1.5, 0, Math.PI * 2);
        c.fill();
    }
    // Menacing face in the middle
    c.fillStyle = '#330000';
    c.beginPath(); c.arc(28, 26, 2, 0, Math.PI * 2); c.fill();
    c.beginPath(); c.arc(36, 26, 2, 0, Math.PI * 2); c.fill();
    c.strokeStyle = '#330000'; c.lineWidth = 1.5;
    c.beginPath(); c.moveTo(26, 34); c.quadraticCurveTo(32, 30, 38, 34); c.stroke();
}

function drawVampireBat(c, r) {
    const fur = `rgb(${r.int(30,50)},${r.int(20,35)},${r.int(40,60)})`;
    const wing = `rgb(${r.int(80,110)},${r.int(30,50)},${r.int(40,60)})`;
    // Body
    c.fillStyle = fur;
    c.beginPath(); c.ellipse(32, 34, 8, 11, 0, 0, Math.PI * 2); c.fill();
    // Head
    c.beginPath(); c.arc(32, 22, 8, 0, Math.PI * 2); c.fill();
    // Big pointed ears
    c.beginPath(); c.moveTo(25, 18); c.lineTo(22, 6); c.lineTo(29, 14); c.closePath(); c.fill();
    c.beginPath(); c.moveTo(39, 18); c.lineTo(42, 6); c.lineTo(35, 14); c.closePath(); c.fill();
    // Wings (large, spread)
    c.fillStyle = wing;
    c.beginPath();
    c.moveTo(24, 28); c.quadraticCurveTo(0, 18, 2, 38);
    c.quadraticCurveTo(8, 40, 12, 36); c.quadraticCurveTo(16, 42, 20, 38);
    c.quadraticCurveTo(22, 42, 24, 40); c.closePath();
    c.fill();
    c.beginPath();
    c.moveTo(40, 28); c.quadraticCurveTo(64, 18, 62, 38);
    c.quadraticCurveTo(56, 40, 52, 36); c.quadraticCurveTo(48, 42, 44, 38);
    c.quadraticCurveTo(42, 42, 40, 40); c.closePath();
    c.fill();
    // Wing bones
    c.strokeStyle = fur; c.lineWidth = 1;
    c.beginPath(); c.moveTo(24, 28); c.lineTo(4, 22); c.stroke();
    c.beginPath(); c.moveTo(40, 28); c.lineTo(60, 22); c.stroke();
    // Glowing red eyes
    c.fillStyle = '#ff0000';
    c.shadowColor = '#ff0000'; c.shadowBlur = 6;
    c.beginPath(); c.arc(28, 22, 1.6, 0, Math.PI * 2); c.fill();
    c.beginPath(); c.arc(36, 22, 1.6, 0, Math.PI * 2); c.fill();
    c.shadowBlur = 0;
    // Fangs
    c.fillStyle = '#fff';
    c.beginPath(); c.moveTo(30, 26); c.lineTo(31, 31); c.lineTo(32, 26); c.closePath(); c.fill();
    c.beginPath(); c.moveTo(32, 26); c.lineTo(33, 31); c.lineTo(34, 26); c.closePath(); c.fill();
    // Blood drip
    c.fillStyle = '#aa0000';
    c.beginPath(); c.ellipse(31, 32, 1, 1.8, 0, 0, Math.PI * 2); c.fill();
}

function drawTunnelWorm(c, r) {
    const flesh = `rgb(${r.int(200,230)},${r.int(150,180)},${r.int(140,170)})`;
    const seg = `rgb(${r.int(150,180)},${r.int(100,130)},${r.int(100,130)})`;
    // Segmented body arcing
    for (let i = 0; i < 8; i++) {
        const t = i / 7;
        const x = 8 + i * 7;
        const y = 36 + Math.sin(i * 0.7) * 4;
        c.fillStyle = i < 2 ? flesh : seg;
        c.beginPath();
        c.ellipse(x, y, 5 + (1 - t) * 2, 6 + (1 - t) * 2, 0, 0, Math.PI * 2);
        c.fill();
        // Segment rings
        c.strokeStyle = 'rgba(80,30,30,0.6)'; c.lineWidth = 1;
        c.beginPath(); c.ellipse(x, y, 4 + (1 - t) * 2, 5 + (1 - t) * 2, 0, 0, Math.PI * 2); c.stroke();
    }
    // Head (big and round)
    c.fillStyle = flesh;
    c.beginPath(); c.arc(10, 36, 10, 0, Math.PI * 2); c.fill();
    // Gaping circular maw with teeth
    c.fillStyle = '#220000';
    c.beginPath(); c.arc(6, 36, 6, 0, Math.PI * 2); c.fill();
    c.fillStyle = '#ffffcc';
    for (let i = 0; i < 8; i++) {
        const ang = i * (Math.PI * 2 / 8);
        const tx = 6 + Math.cos(ang) * 6;
        const ty = 36 + Math.sin(ang) * 6;
        c.beginPath();
        c.moveTo(tx, ty);
        c.lineTo(6 + Math.cos(ang) * 3, 36 + Math.sin(ang) * 3);
        c.lineTo(6 + Math.cos(ang + 0.3) * 5, 36 + Math.sin(ang + 0.3) * 5);
        c.closePath(); c.fill();
    }
    // Slime drip
    c.fillStyle = 'rgba(200,240,180,0.6)';
    for (let i = 0; i < 5; i++) {
        c.beginPath(); c.ellipse(8 + i * 10, 50, 2, 4, 0, 0, Math.PI * 2); c.fill();
    }
}

const DRAWERS = {
    skeleton: drawSkeleton, slime: drawSlime, goblin: drawGoblin,
    spider: drawSpider, wraith: drawWraith,
    bat: drawBat, rat: drawRat, zombie: drawZombie, troll: drawTroll,
    ghost: drawGhost, drake: drawDrake, mimic: drawMimic, orc: drawOrc,
    imp: drawImp, basilisk: drawBasilisk, cultist: drawCultist,
    tinkerer: drawTinkerer,
    // Phase 11 early-dungeon roster
    centipede: drawCentipede, cave_crawler: drawCaveCrawler,
    widow: drawWidow, spore_fungus: drawSporeFungus, shrieker: drawShrieker,
    kobold: drawKobold, kobold_shaman: drawKoboldShaman,
    cave_fisher: drawCaveFisher, stirge: drawStirge,
    acid_slime: drawAcidSlime, flame_imp: drawFlameImp,
    bone_gnasher: drawBoneGnasher, blood_wasp: drawBloodWasp,
    ice_sprite: drawIceSprite, stone_hag: drawStoneHag,
    ghoul_pup: drawGhoulPup, myconid: drawMyconid,
    dust_devil: drawDustDevil, vampire_bat: drawVampireBat,
    tunnel_worm: drawTunnelWorm,
};

/**
 * Generate a monster sprite canvas (64×64 with transparency).
 * @param {string} type - one of ENEMY_TYPE_KEYS or 'tinkerer'
 * @param {number} seed
 * @returns {HTMLCanvasElement}
 */
export function generateEnemySprite(type, seed) {
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext('2d');
    const rng = createRNG(seed);

    const drawer = DRAWERS[type];
    if (drawer) drawer(ctx, rng);

    return canvas;
}
