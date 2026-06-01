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
function drawGreyOoze(c, r) {
    drawSlime(c, r);
    c.fillStyle = 'rgba(170,170,180,0.45)';
    c.beginPath();
    c.ellipse(32, 40, 22, 14, 0, 0, Math.PI * 2);
    c.fill();
    c.fillStyle = 'rgba(240,240,248,0.35)';
    c.beginPath();
    c.ellipse(24, 28, 7, 5, -0.35, 0, Math.PI * 2);
    c.fill();
}
function drawBlackPudding(c, r) {
    drawSlime(c, r);
    c.fillStyle = 'rgba(22,22,26,0.58)';
    c.beginPath();
    c.ellipse(32, 42, 24, 16, 0, 0, Math.PI * 2);
    c.fill();
    c.fillStyle = 'rgba(95,85,115,0.28)';
    c.beginPath();
    c.ellipse(26, 30, 8, 6, -0.2, 0, Math.PI * 2);
    c.fill();
}
function drawOchreJelly(c, r) {
    drawSlime(c, r);
    c.fillStyle = 'rgba(220,165,45,0.45)';
    c.beginPath();
    c.ellipse(32, 41, 23, 15, 0, 0, Math.PI * 2);
    c.fill();
    c.fillStyle = 'rgba(255,225,120,0.28)';
    c.beginPath();
    c.ellipse(25, 30, 8, 5, -0.3, 0, Math.PI * 2);
    c.fill();
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

// ────────────────────────────────────────────────
// New monsters added in the second roster batch
// ────────────────────────────────────────────────

function drawBanshee(c, r) {
    // Spectral wailing woman — translucent green-white, open mouth, streaming hair
    const a = 0.55 + r.next() * 0.2;
    const base = `rgba(${r.int(160,200)},${r.int(220,255)},${r.int(200,240)},${a})`;
    // Flowing robe body
    c.fillStyle = base;
    c.beginPath();
    c.moveTo(14, 62); c.quadraticCurveTo(12,34,20,18);
    c.quadraticCurveTo(32,6,44,18);
    c.quadraticCurveTo(52,34,50,62);
    c.lineTo(44,56); c.lineTo(40,64); c.lineTo(36,56);
    c.lineTo(32,64); c.lineTo(28,56); c.lineTo(24,64); c.lineTo(20,56);
    c.closePath(); c.fill();
    // Anguished face
    c.fillStyle = 'rgba(0,0,20,0.8)';
    c.beginPath(); c.ellipse(27,22,4,5,0,0,Math.PI*2); c.fill();
    c.beginPath(); c.ellipse(37,22,4,5,0,0,Math.PI*2); c.fill();
    // Wailing mouth
    c.fillStyle = '#000020';
    c.beginPath(); c.ellipse(32,32,5,7,0,0,Math.PI*2); c.fill();
    // Streaming hair
    c.strokeStyle = `rgba(${r.int(180,210)},${r.int(240,255)},${r.int(220,255)},0.65)`;
    c.lineWidth = 2;
    for (let i=0;i<5;i++) {
        c.beginPath(); c.moveTo(14+i*8,16);
        c.quadraticCurveTo(10+i*6,4,8+i*7,-2); c.stroke();
    }
    // Glowing eyes
    c.shadowColor = '#aaffcc'; c.shadowBlur = 10;
    c.fillStyle = '#ccffdd';
    c.beginPath(); c.arc(27,22,1.5,0,Math.PI*2); c.fill();
    c.beginPath(); c.arc(37,22,1.5,0,Math.PI*2); c.fill();
    c.shadowBlur = 0;
}

function drawLich(c, r) {
    // Undead sorcerer — ancient robed skeleton in dark purple robes, staff, crown
    const robe = `rgb(${r.int(30,50)},${r.int(15,30)},${r.int(50,80)})`;
    const bone = `rgb(${r.int(210,230)},${r.int(200,220)},${r.int(180,200)})`;
    // Robe
    c.fillStyle = robe;
    c.beginPath();
    c.moveTo(16,60); c.lineTo(20,24); c.lineTo(44,24); c.lineTo(48,60);
    c.closePath(); c.fill();
    // Skull
    c.fillStyle = bone;
    c.beginPath(); c.ellipse(32,14,9,10,0,0,Math.PI*2); c.fill();
    // Jaw
    c.beginPath(); c.moveTo(25,18); c.quadraticCurveTo(32,26,39,18); c.fill();
    // Eye sockets glowing purple
    c.fillStyle = '#000010';
    c.beginPath(); c.arc(28,12,3,0,Math.PI*2); c.fill();
    c.beginPath(); c.arc(36,12,3,0,Math.PI*2); c.fill();
    c.shadowColor = '#aa44ff'; c.shadowBlur = 10;
    c.fillStyle = '#cc88ff';
    c.beginPath(); c.arc(28,12,1.5,0,Math.PI*2); c.fill();
    c.beginPath(); c.arc(36,12,1.5,0,Math.PI*2); c.fill();
    c.shadowBlur = 0;
    // Crown
    c.fillStyle = '#ccaa22';
    for (let i=0;i<5;i++) {
        c.fillRect(23+i*3.5, 4, 2, i%2===0?5:3);
    }
    c.fillRect(23,8,18,3);
    // Staff
    c.strokeStyle = '#663300'; c.lineWidth = 2;
    c.beginPath(); c.moveTo(50,8); c.lineTo(48,60); c.stroke();
    c.shadowColor = '#ff44ff'; c.shadowBlur = 12;
    c.fillStyle = '#ff88ff';
    c.beginPath(); c.arc(50,8,4,0,Math.PI*2); c.fill();
    c.shadowBlur = 0;
    // Bone hands
    c.fillStyle = bone;
    c.fillRect(12,34,6,10); c.fillRect(46,34,6,10);
}

function drawMinotaur(c, r) {
    const fur  = `rgb(${r.int(70,110)},${r.int(45,75)},${r.int(25,50)})`;
    const skin = `rgb(${r.int(90,130)},${r.int(55,85)},${r.int(30,60)})`;
    // Massive body
    c.fillStyle = fur;
    c.beginPath(); c.ellipse(32,44,18,18,0,0,Math.PI*2); c.fill();
    // Bull head
    c.beginPath(); c.ellipse(32,18,12,11,0,0,Math.PI*2); c.fill();
    // Horns
    c.fillStyle = '#eecc88';
    c.beginPath(); c.moveTo(22,12); c.quadraticCurveTo(14,2,10,6); c.quadraticCurveTo(16,8,20,16); c.fill();
    c.beginPath(); c.moveTo(42,12); c.quadraticCurveTo(50,2,54,6); c.quadraticCurveTo(48,8,44,16); c.fill();
    // Snout
    c.fillStyle = skin;
    c.beginPath(); c.ellipse(32,22,6,4,0,0,Math.PI*2); c.fill();
    c.fillStyle = '#331111';
    c.beginPath(); c.arc(30,22,1.2,0,Math.PI*2); c.fill();
    c.beginPath(); c.arc(34,22,1.2,0,Math.PI*2); c.fill();
    // Red eyes
    c.fillStyle = '#dd2200';
    c.beginPath(); c.arc(27,15,2.2,0,Math.PI*2); c.fill();
    c.beginPath(); c.arc(37,15,2.2,0,Math.PI*2); c.fill();
    // Arms
    c.fillStyle = fur;
    c.fillRect(6,32,12,16); c.fillRect(46,32,12,16);
    // Axe
    c.strokeStyle = '#888'; c.lineWidth = 2;
    c.beginPath(); c.moveTo(6,38); c.lineTo(2,20); c.stroke();
    c.fillStyle = '#aaa';
    c.beginPath(); c.moveTo(2,20); c.lineTo(8,14); c.lineTo(4,22); c.closePath(); c.fill();
    // Legs
    c.fillStyle = fur;
    c.fillRect(22,58,8,6); c.fillRect(34,58,8,6);
}

function drawShadow(c, r) {
    // Living shadow — shifting dark mass, barely humanoid, icy eyes
    const dark = `rgba(${r.int(5,20)},${r.int(5,15)},${r.int(10,25)},0.9)`;
    c.fillStyle = dark;
    c.beginPath();
    c.moveTo(16,62); c.quadraticCurveTo(10,44,18,26);
    c.quadraticCurveTo(24,12,32,10);
    c.quadraticCurveTo(40,12,46,26);
    c.quadraticCurveTo(54,44,48,62);
    c.quadraticCurveTo(40,58,32,62);
    c.quadraticCurveTo(24,58,16,62);
    c.fill();
    // Tendrils
    c.fillStyle = `rgba(${r.int(5,20)},${r.int(5,15)},${r.int(20,40)},0.7)`;
    for (let i=0;i<5;i++) {
        c.beginPath();
        c.ellipse(14+i*10,58,2.5,8,0.2*(i-2),0,Math.PI*2);
        c.fill();
    }
    // Glowing ice-blue eyes
    c.shadowColor = '#55aaff'; c.shadowBlur = 12;
    c.fillStyle = '#88ccff';
    c.beginPath(); c.arc(27,26,2.5,0,Math.PI*2); c.fill();
    c.beginPath(); c.arc(37,26,2.5,0,Math.PI*2); c.fill();
    c.shadowBlur = 0;
}

function drawOgre(c, r) {
    const skin = `rgb(${r.int(150,200)},${r.int(100,140)},${r.int(60,90)})`;
    // Massive body
    c.fillStyle = skin;
    c.beginPath(); c.ellipse(32,44,22,20,0,0,Math.PI*2); c.fill();
    // Huge head
    c.beginPath(); c.ellipse(32,16,14,14,0,0,Math.PI*2); c.fill();
    // Brow ridge
    c.fillStyle = 'rgba(0,0,0,0.25)';
    c.fillRect(18,10,28,4);
    // Pig nose
    c.fillStyle = `rgb(${r.int(180,210)},${r.int(120,150)},${r.int(80,110)})`;
    c.beginPath(); c.ellipse(32,22,5,3.5,0,0,Math.PI*2); c.fill();
    c.fillStyle = '#442222';
    c.beginPath(); c.arc(30,22,1.5,0,Math.PI*2); c.fill();
    c.beginPath(); c.arc(34,22,1.5,0,Math.PI*2); c.fill();
    // Eyes
    c.fillStyle = '#cc4400';
    c.beginPath(); c.arc(26,13,3,0,Math.PI*2); c.fill();
    c.beginPath(); c.arc(38,13,3,0,Math.PI*2); c.fill();
    c.fillStyle = '#111'; c.beginPath(); c.arc(26,13,1.2,0,Math.PI*2); c.fill();
    c.beginPath(); c.arc(38,13,1.2,0,Math.PI*2); c.fill();
    // Club
    c.fillStyle = '#664422';
    c.fillRect(54,22,5,28);
    c.beginPath(); c.ellipse(56,20,5,7,0,0,Math.PI*2); c.fill();
    // Arms
    c.fillStyle = skin;
    c.fillRect(2,30,16,18); c.fillRect(46,30,16,18);
    // Legs
    c.fillRect(18,60,10,4); c.fillRect(34,60,10,4);
}

function drawDarkElf(c, r) {
    const skin  = `rgb(${r.int(50,80)},${r.int(40,65)},${r.int(60,90)})`;
    const armor = `rgb(${r.int(20,40)},${r.int(15,30)},${r.int(30,50)})`;
    // Lithe body
    c.fillStyle = armor;
    c.fillRect(22,26,20,24);
    // Head
    c.fillStyle = skin;
    c.beginPath(); c.ellipse(32,16,8,9,0,0,Math.PI*2); c.fill();
    // Long pointed ears
    c.beginPath(); c.moveTo(24,14); c.lineTo(16,8); c.lineTo(22,18); c.fill();
    c.beginPath(); c.moveTo(40,14); c.lineTo(48,8); c.lineTo(42,18); c.fill();
    // White hair
    c.fillStyle = '#eeeeff';
    c.fillRect(26,4,12,10);
    c.beginPath(); c.ellipse(32,4,7,3,0,0,Math.PI*2); c.fill();
    // Violet eyes
    c.fillStyle = '#8844cc';
    c.beginPath(); c.arc(29,14,1.8,0,Math.PI*2); c.fill();
    c.beginPath(); c.arc(35,14,1.8,0,Math.PI*2); c.fill();
    // Bow
    c.strokeStyle = '#553311'; c.lineWidth = 1.5;
    c.beginPath(); c.arc(10,32,14,Math.PI*0.2,Math.PI*1.8); c.stroke();
    c.strokeStyle = '#ccbbaa'; c.lineWidth = 0.8;
    c.beginPath(); c.moveTo(10,20); c.lineTo(10,46); c.stroke();
    // Arrow
    c.strokeStyle = '#998855'; c.lineWidth = 1;
    c.beginPath(); c.moveTo(10,32); c.lineTo(22,32); c.stroke();
    c.fillStyle = '#cccccc';
    c.beginPath(); c.moveTo(22,32); c.lineTo(26,30); c.lineTo(24,32); c.lineTo(26,34); c.closePath(); c.fill();
    // Legs
    c.fillStyle = armor; c.fillRect(23,50,8,12); c.fillRect(33,50,8,12);
}

function drawHarpy(c, r) {
    const feather = `rgb(${r.int(80,120)},${r.int(50,80)},${r.int(100,140)})`;
    const skin = `rgb(${r.int(190,220)},${r.int(160,190)},${r.int(130,160)})`;
    // Wings
    c.fillStyle = feather;
    c.beginPath();
    c.moveTo(24,30); c.quadraticCurveTo(4,18,2,36);
    c.lineTo(8,44); c.lineTo(14,38); c.lineTo(20,46); c.lineTo(24,38);
    c.closePath(); c.fill();
    c.beginPath();
    c.moveTo(40,30); c.quadraticCurveTo(60,18,62,36);
    c.lineTo(56,44); c.lineTo(50,38); c.lineTo(44,46); c.lineTo(40,38);
    c.closePath(); c.fill();
    // Body
    c.fillStyle = feather;
    c.beginPath(); c.ellipse(32,42,10,14,0,0,Math.PI*2); c.fill();
    // Head/face
    c.fillStyle = skin;
    c.beginPath(); c.ellipse(32,22,9,10,0,0,Math.PI*2); c.fill();
    // Wild hair
    c.fillStyle = feather;
    for (let i=0;i<5;i++) {
        c.beginPath(); c.moveTo(24+i*4,16);
        c.quadraticCurveTo(22+i*4,8,20+i*5,4); c.lineTo(24+i*4,12); c.fill();
    }
    // Eyes — cruel yellow
    c.fillStyle = '#ffcc00';
    c.beginPath(); c.arc(28,20,2.2,0,Math.PI*2); c.fill();
    c.beginPath(); c.arc(36,20,2.2,0,Math.PI*2); c.fill();
    c.fillStyle = '#111'; c.beginPath(); c.arc(28,20,1,0,Math.PI*2); c.fill();
    c.beginPath(); c.arc(36,20,1,0,Math.PI*2); c.fill();
    // Beak
    c.fillStyle = '#ddaa22';
    c.beginPath(); c.moveTo(30,25); c.lineTo(32,30); c.lineTo(34,25); c.fill();
    // Talons
    c.strokeStyle = '#443322'; c.lineWidth = 1.5;
    c.beginPath(); c.moveTo(28,56); c.lineTo(24,62); c.stroke();
    c.beginPath(); c.moveTo(28,56); c.lineTo(26,63); c.stroke();
    c.beginPath(); c.moveTo(36,56); c.lineTo(40,62); c.stroke();
    c.beginPath(); c.moveTo(36,56); c.lineTo(38,63); c.stroke();
}

function drawGiantScorpion(c, r) {
    const shell = `rgb(${r.int(100,140)},${r.int(70,100)},${r.int(20,40)})`;
    const dark  = `rgb(${r.int(50,70)},${r.int(35,55)},${r.int(10,25)})`;
    // Abdomen
    c.fillStyle = shell;
    c.beginPath(); c.ellipse(24,42,12,10,0,0,Math.PI*2); c.fill();
    // Cephalothorax
    c.beginPath(); c.ellipse(38,36,10,8,0,0,Math.PI*2); c.fill();
    // Tail segments arcing up and over
    c.strokeStyle = shell; c.lineWidth = 5;
    c.beginPath();
    c.moveTo(18,42); c.quadraticCurveTo(10,30,18,18); c.quadraticCurveTo(28,8,42,14);
    c.stroke();
    // Stinger
    c.fillStyle = dark;
    c.beginPath(); c.moveTo(42,14); c.lineTo(50,8); c.lineTo(46,16); c.closePath(); c.fill();
    // Claws
    c.strokeStyle = shell; c.lineWidth = 3;
    c.beginPath(); c.moveTo(46,38); c.lineTo(56,30); c.stroke();
    c.beginPath(); c.moveTo(46,38); c.lineTo(58,40); c.stroke();
    c.fillStyle = dark;
    c.beginPath(); c.moveTo(56,30); c.lineTo(60,26); c.lineTo(58,32); c.closePath(); c.fill();
    c.beginPath(); c.moveTo(58,40); c.lineTo(62,36); c.lineTo(62,44); c.closePath(); c.fill();
    // Legs
    c.strokeStyle = dark; c.lineWidth = 1.5;
    for (let i=0;i<4;i++) {
        const x=28+i*4, y=42;
        c.beginPath(); c.moveTo(x,y); c.lineTo(x-4-i*2,y+10); c.stroke();
        c.beginPath(); c.moveTo(46,32+i*3); c.lineTo(52+i,32+i*3+8); c.stroke();
    }
    // Eyes
    c.fillStyle = '#ffff00';
    c.beginPath(); c.arc(36,33,1.5,0,Math.PI*2); c.fill();
    c.beginPath(); c.arc(40,33,1.5,0,Math.PI*2); c.fill();
}

function drawWight(c, r) {
    const grey  = `rgb(${r.int(80,110)},${r.int(80,100)},${r.int(90,115)})`;
    const armor = `rgb(${r.int(50,70)},${r.int(50,65)},${r.int(60,80)})`;
    // Body in tattered armor
    c.fillStyle = armor;
    c.fillRect(20,26,24,28);
    // Head
    c.fillStyle = grey;
    c.beginPath(); c.ellipse(32,14,10,11,0,0,Math.PI*2); c.fill();
    // Sunken eyes — cold blue glow
    c.fillStyle = '#000818';
    c.beginPath(); c.arc(28,12,3,0,Math.PI*2); c.fill();
    c.beginPath(); c.arc(36,12,3,0,Math.PI*2); c.fill();
    c.shadowColor = '#4488ff'; c.shadowBlur = 8;
    c.fillStyle = '#88aaff';
    c.beginPath(); c.arc(28,12,1.3,0,Math.PI*2); c.fill();
    c.beginPath(); c.arc(36,12,1.3,0,Math.PI*2); c.fill();
    c.shadowBlur = 0;
    // Sword
    c.strokeStyle = '#aaaacc'; c.lineWidth = 2;
    c.beginPath(); c.moveTo(50,14); c.lineTo(46,54); c.stroke();
    c.fillStyle = '#998844'; c.fillRect(46,28,8,3);
    // Shield remnant
    c.fillStyle = armor;
    c.beginPath(); c.ellipse(18,38,6,9,0,0,Math.PI*2); c.fill();
    c.strokeStyle = '#cccccc'; c.lineWidth = 1;
    c.beginPath(); c.ellipse(18,38,5,8,0,0,Math.PI*2); c.stroke();
    // Hands
    c.fillStyle = grey;
    c.fillRect(10,34,8,10); c.fillRect(46,34,6,10);
    // Legs
    c.fillStyle = armor; c.fillRect(22,54,8,10); c.fillRect(34,54,8,10);
}

function drawGargoyle(c, r) {
    const stone = `rgb(${r.int(90,120)},${r.int(85,110)},${r.int(95,125)})`;
    const dark  = `rgb(${r.int(45,65)},${r.int(40,60)},${r.int(45,70)})`;
    // Crouching stony body
    c.fillStyle = stone;
    c.beginPath(); c.ellipse(32,40,16,18,0,0,Math.PI*2); c.fill();
    // Head
    c.beginPath(); c.ellipse(32,18,11,12,0,0,Math.PI*2); c.fill();
    // Bat wings folded
    c.fillStyle = dark;
    c.beginPath(); c.moveTo(16,36); c.lineTo(2,22); c.lineTo(8,34); c.lineTo(4,46); c.lineTo(16,44); c.closePath(); c.fill();
    c.beginPath(); c.moveTo(48,36); c.lineTo(62,22); c.lineTo(56,34); c.lineTo(60,46); c.lineTo(48,44); c.closePath(); c.fill();
    // Horns
    c.fillStyle = dark;
    c.beginPath(); c.moveTo(25,10); c.lineTo(20,2); c.lineTo(28,8); c.closePath(); c.fill();
    c.beginPath(); c.moveTo(39,10); c.lineTo(44,2); c.lineTo(36,8); c.closePath(); c.fill();
    // Glowing red eyes
    c.fillStyle = '#220000';
    c.beginPath(); c.arc(27,16,3,0,Math.PI*2); c.fill();
    c.beginPath(); c.arc(37,16,3,0,Math.PI*2); c.fill();
    c.shadowColor = '#ff2200'; c.shadowBlur = 8;
    c.fillStyle = '#ff6644';
    c.beginPath(); c.arc(27,16,1.4,0,Math.PI*2); c.fill();
    c.beginPath(); c.arc(37,16,1.4,0,Math.PI*2); c.fill();
    c.shadowBlur = 0;
    // Fangs
    c.fillStyle = stone;
    c.beginPath(); c.moveTo(29,24); c.lineTo(30,29); c.lineTo(31,24); c.fill();
    c.beginPath(); c.moveTo(33,24); c.lineTo(34,29); c.lineTo(35,24); c.fill();
    // Stone cracks
    c.strokeStyle = dark; c.lineWidth = 0.8;
    c.beginPath(); c.moveTo(20,38); c.lineTo(30,46); c.stroke();
    c.beginPath(); c.moveTo(42,34); c.lineTo(36,48); c.stroke();
}

function drawPhaseSpider(c, r) {
    const body = `rgba(${r.int(60,90)},${r.int(20,40)},${r.int(80,120)},0.85)`;
    const ghost = 'rgba(140,60,200,0.45)';
    // Ghostly duplicate body (phase effect)
    c.fillStyle = ghost;
    c.beginPath(); c.ellipse(36,44,14,16,0.2,0,Math.PI*2); c.fill();
    c.beginPath(); c.ellipse(36,24,9,9,0.2,0,Math.PI*2); c.fill();
    // Real body
    c.fillStyle = body;
    c.beginPath(); c.ellipse(30,42,14,16,0,0,Math.PI*2); c.fill();
    c.beginPath(); c.ellipse(30,22,10,10,0,0,Math.PI*2); c.fill();
    // Multiple red eyes
    c.fillStyle = '#ff0044';
    for (const [dx,dy] of [[-4,-2],[4,-2],[-6,1],[6,1],[-1,-5],[1,-5]]) {
        c.beginPath(); c.arc(30+dx,22+dy,1.5,0,Math.PI*2); c.fill();
    }
    // Legs (4 per side, translucent purple)
    c.strokeStyle = body; c.lineWidth = 2;
    for (const [sx,sy,ex,ey] of [[20,26,2,16],[20,30,0,24],[20,34,2,40],[20,38,6,52]]) {
        c.beginPath(); c.moveTo(sx,sy); c.quadraticCurveTo(sx-8,sy,ex,ey); c.stroke();
        c.beginPath(); c.moveTo(64-sx,sy); c.quadraticCurveTo(64-sx+8,sy,64-ex,ey); c.stroke();
    }
    // Shimmering outline (phase effect)
    c.strokeStyle = 'rgba(160,80,255,0.5)'; c.lineWidth = 1;
    c.beginPath(); c.ellipse(30,42,14,16,0,0,Math.PI*2); c.stroke();
}

function drawTentacleHorror(c, r) {
    const flesh = `rgb(${r.int(60,100)},${r.int(100,140)},${r.int(60,90)})`;
    const dark  = `rgb(${r.int(30,50)},${r.int(50,70)},${r.int(30,50)})`;
    // Central mass
    c.fillStyle = flesh;
    c.beginPath(); c.ellipse(32,38,18,20,0,0,Math.PI*2); c.fill();
    // Many eyes
    c.fillStyle = '#ffff00';
    for (const [x,y] of [[26,34],[38,34],[32,26],[24,40],[40,40],[32,48]]) {
        c.beginPath(); c.arc(x,y,2.5,0,Math.PI*2); c.fill();
        c.fillStyle = '#111'; c.beginPath(); c.arc(x,y,1,0,Math.PI*2); c.fill();
        c.fillStyle = '#ffff00';
    }
    // Tentacles snaking outward
    c.strokeStyle = dark; c.lineWidth = 3;
    const tPos = [[14,30,-10,-8],[50,30,10,-8],[8,44,-12,2],[56,44,12,2],[14,52,-8,10],[50,52,8,10],[22,58,0,14],[42,58,0,14]];
    for (const [x,y,dx,dy] of tPos) {
        c.beginPath(); c.moveTo(x,y);
        c.quadraticCurveTo(x+dx,y+dy,x+dx*1.8,y+dy*1.8); c.stroke();
    }
    // Dripping slime
    c.fillStyle = 'rgba(80,180,60,0.5)';
    for (let i=0;i<6;i++) {
        c.beginPath(); c.ellipse(18+i*6,60,1.5,4,0,0,Math.PI*2); c.fill();
    }
}

function drawIceTroll(c, r) {
    const ice  = `rgb(${r.int(140,180)},${r.int(180,220)},${r.int(200,240)})`;
    const dark = `rgb(${r.int(70,100)},${r.int(90,130)},${r.int(120,160)})`;
    // Bulky body covered in ice shards
    c.fillStyle = ice;
    c.beginPath(); c.ellipse(32,44,20,20,0,0,Math.PI*2); c.fill();
    // Ice shard protrusions
    c.fillStyle = 'rgba(200,240,255,0.8)';
    for (const [x,y,a] of [[16,34,-0.4],[48,34,0.4],[22,22,-0.2],[42,22,0.2],[32,18,0]]) {
        c.save(); c.translate(x,y); c.rotate(a);
        c.beginPath(); c.moveTo(0,-8); c.lineTo(4,0); c.lineTo(0,4); c.lineTo(-4,0); c.closePath(); c.fill();
        c.restore();
    }
    // Small head
    c.fillStyle = ice;
    c.beginPath(); c.ellipse(32,16,10,10,0,0,Math.PI*2); c.fill();
    // Icy eyes — pale blue glow
    c.shadowColor = '#aaddff'; c.shadowBlur = 8;
    c.fillStyle = '#ddeeff';
    c.beginPath(); c.arc(28,14,2.5,0,Math.PI*2); c.fill();
    c.beginPath(); c.arc(36,14,2.5,0,Math.PI*2); c.fill();
    c.shadowBlur = 0;
    // Tusks
    c.fillStyle = '#e0e8f0';
    c.beginPath(); c.moveTo(26,22); c.lineTo(24,12); c.lineTo(28,20); c.fill();
    c.beginPath(); c.moveTo(38,22); c.lineTo(40,12); c.lineTo(36,20); c.fill();
    // Huge arms
    c.fillStyle = ice; c.strokeStyle = ice; c.lineWidth = 8;
    c.beginPath(); c.moveTo(12,34); c.lineTo(4,52); c.stroke();
    c.beginPath(); c.moveTo(52,34); c.lineTo(60,52); c.stroke();
    // Icy mist at feet
    c.fillStyle = 'rgba(200,230,255,0.35)';
    c.beginPath(); c.ellipse(32,58,20,6,0,0,Math.PI*2); c.fill();
    // Legs
    c.fillStyle = ice; c.fillRect(22,60,8,4); c.fillRect(34,60,8,4);
}

function drawVampireSpawn(c, r) {
    const skin  = `rgb(${r.int(180,210)},${r.int(170,200)},${r.int(185,215)})`;
    const cape  = `rgb(${r.int(80,110)},${r.int(10,25)},${r.int(10,25)})`;
    const dark  = `rgb(${r.int(30,50)},${r.int(5,15)},${r.int(5,15)})`;
    // Cape spread dramatically
    c.fillStyle = cape;
    c.beginPath();
    c.moveTo(22,28); c.lineTo(4,50); c.lineTo(12,56); c.lineTo(22,44);
    c.lineTo(24,60); c.lineTo(32,50); c.lineTo(40,60); c.lineTo(42,44);
    c.lineTo(52,56); c.lineTo(60,50); c.lineTo(42,28);
    c.closePath(); c.fill();
    // Body
    c.fillStyle = dark;
    c.fillRect(24,28,16,20);
    // Head
    c.fillStyle = skin;
    c.beginPath(); c.ellipse(32,16,9,10,0,0,Math.PI*2); c.fill();
    // Slicked hair
    c.fillStyle = dark;
    c.beginPath(); c.moveTo(23,12); c.quadraticCurveTo(32,4,41,12); c.lineTo(38,16); c.lineTo(32,8); c.lineTo(26,16); c.fill();
    // Red eyes
    c.fillStyle = '#cc0000'; c.shadowColor='#ff0000'; c.shadowBlur=6;
    c.beginPath(); c.arc(28,14,2,0,Math.PI*2); c.fill();
    c.beginPath(); c.arc(36,14,2,0,Math.PI*2); c.fill();
    c.shadowBlur=0;
    // Fangs
    c.fillStyle = '#fff';
    c.beginPath(); c.moveTo(30,21); c.lineTo(31,26); c.lineTo(32,21); c.fill();
    c.beginPath(); c.moveTo(32,21); c.lineTo(33,26); c.lineTo(34,21); c.fill();
    // Blood drip on chin
    c.fillStyle = '#aa0000';
    c.beginPath(); c.ellipse(31,27,1.5,3,0,0,Math.PI*2); c.fill();
    // Hands
    c.fillStyle = skin;
    c.fillRect(14,36,8,10); c.fillRect(42,36,8,10);
}

function drawMindFlayer(c, r) {
    const robe  = `rgb(${r.int(30,50)},${r.int(20,35)},${r.int(50,75)})`;
    const flesh = `rgb(${r.int(100,130)},${r.int(60,80)},${r.int(100,130)})`;
    // Robe
    c.fillStyle = robe;
    c.beginPath();
    c.moveTo(16,60); c.lineTo(20,26); c.lineTo(44,26); c.lineTo(48,60);
    c.closePath(); c.fill();
    // Head — bulbous and purple
    c.fillStyle = flesh;
    c.beginPath(); c.ellipse(32,16,12,13,0,0,Math.PI*2); c.fill();
    // Four tentacles hanging from face
    c.strokeStyle = flesh; c.lineWidth = 2.5;
    for (let i=0;i<4;i++) {
        const x=26+i*4;
        c.beginPath(); c.moveTo(x,24);
        c.quadraticCurveTo(x+(i-1.5)*3,32,x+(i-1.5)*2,40); c.stroke();
    }
    // Large white eyes
    c.fillStyle = '#ffffff';
    c.beginPath(); c.arc(27,12,3.5,0,Math.PI*2); c.fill();
    c.beginPath(); c.arc(37,12,3.5,0,Math.PI*2); c.fill();
    c.fillStyle = '#000080';
    c.beginPath(); c.arc(28,12,1.8,0,Math.PI*2); c.fill();
    c.beginPath(); c.arc(38,12,1.8,0,Math.PI*2); c.fill();
    // Psionic glow
    c.shadowColor = '#8844ff'; c.shadowBlur = 14;
    c.fillStyle = 'rgba(136,68,255,0.3)';
    c.beginPath(); c.ellipse(32,16,14,15,0,0,Math.PI*2); c.fill();
    c.shadowBlur = 0;
    // Arms
    c.fillStyle = flesh;
    c.fillRect(12,30,8,14); c.fillRect(44,30,8,14);
}

function drawFireElemental(c, r) {
    // Towering pillar of fire — no hard edges, all flickering flame
    // Core
    c.shadowColor = '#ffaa00'; c.shadowBlur = 18;
    c.fillStyle = `rgb(${r.int(240,255)},${r.int(140,190)},${r.int(20,60)})`;
    c.beginPath();
    c.moveTo(32,6); c.lineTo(44,28); c.lineTo(40,50); c.lineTo(32,62); c.lineTo(24,50); c.lineTo(20,28);
    c.closePath(); c.fill();
    c.shadowBlur = 0;
    // Outer flames
    const fireColors = ['rgba(255,80,0,0.8)','rgba(255,160,0,0.7)','rgba(255,220,60,0.6)'];
    for (let layer=0;layer<3;layer++) {
        c.fillStyle = fireColors[layer];
        for (let i=0;i<7;i++) {
            const ang = i*(Math.PI*2/7) + layer*0.4;
            const rd  = 16+layer*4;
            const px  = 32+Math.cos(ang)*rd;
            const py  = 34+Math.sin(ang)*rd;
            c.beginPath();
            c.moveTo(px,py-6); c.lineTo(px+4,py+2); c.lineTo(px,py+6); c.lineTo(px-4,py+2);
            c.closePath(); c.fill();
        }
    }
    // Eyes — white-hot
    c.shadowColor = '#ffffff'; c.shadowBlur = 8;
    c.fillStyle = '#ffffff';
    c.beginPath(); c.arc(27,26,3,0,Math.PI*2); c.fill();
    c.beginPath(); c.arc(37,26,3,0,Math.PI*2); c.fill();
    c.shadowBlur = 0;
    c.fillStyle = '#ff8800';
    c.beginPath(); c.arc(27,26,1.2,0,Math.PI*2); c.fill();
    c.beginPath(); c.arc(37,26,1.2,0,Math.PI*2); c.fill();
}

function drawEarthElemental(c, r) {
    // Massive hulk of animated stone — wide, squat, craggy
    const stone = `rgb(${r.int(90,130)},${r.int(80,110)},${r.int(60,90)})`;
    const dark  = `rgb(${r.int(50,75)},${r.int(45,65)},${r.int(35,50)})`;
    const lite  = `rgb(${r.int(160,200)},${r.int(140,175)},${r.int(100,130)})`;
    // Body — wide hexagonal boulder shape
    c.shadowColor = '#604030'; c.shadowBlur = 10;
    c.fillStyle = stone;
    c.beginPath();
    c.moveTo(18,8); c.lineTo(46,8); c.lineTo(54,28);
    c.lineTo(50,58); c.lineTo(14,58); c.lineTo(10,28);
    c.closePath(); c.fill();
    c.shadowBlur = 0;
    // Dark rock facets
    c.fillStyle = dark;
    c.beginPath(); c.moveTo(18,8); c.lineTo(30,20); c.lineTo(18,35); c.lineTo(10,28); c.closePath(); c.fill();
    c.beginPath(); c.moveTo(46,8); c.lineTo(34,20); c.lineTo(46,35); c.lineTo(54,28); c.closePath(); c.fill();
    c.beginPath(); c.moveTo(14,58); c.lineTo(28,44); c.lineTo(36,44); c.lineTo(50,58); c.closePath(); c.fill();
    // Light highlight chips
    c.fillStyle = lite;
    c.beginPath(); c.moveTo(28,10); c.lineTo(36,10); c.lineTo(34,20); c.lineTo(30,20); c.closePath(); c.fill();
    c.beginPath(); c.moveTo(22,22); c.lineTo(28,26); c.lineTo(24,34); c.lineTo(20,30); c.closePath(); c.fill();
    // Shoulder jags
    c.fillStyle = stone;
    c.beginPath(); c.moveTo(10,22); c.lineTo(3,16); c.lineTo(8,30); c.closePath(); c.fill();
    c.beginPath(); c.moveTo(54,22); c.lineTo(61,16); c.lineTo(56,30); c.closePath(); c.fill();
    // Glowing amber eyes
    c.shadowColor = '#ffaa00'; c.shadowBlur = 10;
    c.fillStyle = '#ffcc44';
    c.beginPath(); c.arc(25,28,4,0,Math.PI*2); c.fill();
    c.beginPath(); c.arc(39,28,4,0,Math.PI*2); c.fill();
    c.shadowBlur = 0;
    c.fillStyle = '#994400';
    c.beginPath(); c.arc(25,28,2,0,Math.PI*2); c.fill();
    c.beginPath(); c.arc(39,28,2,0,Math.PI*2); c.fill();
}

function drawAirElemental(c, r) {
    // Swirling vortex — barely-there wisps of lightning-charged wind
    const pale  = `rgba(${r.int(180,215)},${r.int(215,245)},255,0.65)`;
    const wisp  = `rgba(${r.int(150,190)},${r.int(200,240)},255,0.35)`;
    c.shadowColor = '#88ccff'; c.shadowBlur = 20;
    // Wide top disc
    c.fillStyle = pale;
    c.beginPath(); c.ellipse(32,16,22,9,0,0,Math.PI*2); c.fill();
    // Tapered tornado body
    c.beginPath();
    c.moveTo(10,16); c.quadraticCurveTo(20,38,24,60);
    c.lineTo(40,60); c.quadraticCurveTo(44,38,54,16);
    c.closePath(); c.fill();
    c.shadowBlur = 0;
    // Swirl rings
    c.strokeStyle = 'rgba(255,255,255,0.55)';
    c.lineWidth = 1.4;
    const rings = [{y:20,w:17},{y:30,w:13},{y:40,w:9},{y:50,w:5}];
    for (const s of rings) {
        c.beginPath(); c.ellipse(32,s.y,s.w,3.5,0,0,Math.PI*2); c.stroke();
    }
    // Outer wisps
    c.fillStyle = wisp;
    for (let i=0;i<5;i++) {
        const ang = i*(Math.PI/2.5)+0.4;
        const rx = 32+Math.cos(ang)*(13+r.int(0,4));
        const ry = 18+i*6;
        c.beginPath(); c.ellipse(rx,ry,r.int(3,6),r.int(2,4),ang,0,Math.PI*2); c.fill();
    }
    // Electric-blue eyes
    c.shadowColor = '#00ccff'; c.shadowBlur = 14;
    c.fillStyle = '#aaeeff';
    c.beginPath(); c.ellipse(26,22,3,2,0,0,Math.PI*2); c.fill();
    c.beginPath(); c.ellipse(38,22,3,2,0,0,Math.PI*2); c.fill();
    c.shadowBlur = 0;
    c.fillStyle = '#005588';
    c.beginPath(); c.arc(26,22,1.2,0,Math.PI*2); c.fill();
    c.beginPath(); c.arc(38,22,1.2,0,Math.PI*2); c.fill();
}

function drawWaterElemental(c, r) {
    // Fluid teardrop wave-form, deep ocean blue with foam crests
    const deep = `rgba(${r.int(15,45)},${r.int(80,130)},${r.int(180,220)},0.88)`;
    const mid  = `rgba(${r.int(10,30)},${r.int(55,90)},${r.int(150,190)},0.72)`;
    const foam = 'rgba(200,238,255,0.60)';
    c.shadowColor = '#0077ff'; c.shadowBlur = 18;
    // Main body — fluid teardrop
    c.fillStyle = deep;
    c.beginPath();
    c.moveTo(32,4);
    c.bezierCurveTo(50,4,58,24,56,42);
    c.bezierCurveTo(54,58,44,62,32,62);
    c.bezierCurveTo(20,62,10,58,8,42);
    c.bezierCurveTo(6,24,14,4,32,4);
    c.closePath(); c.fill();
    c.shadowBlur = 0;
    // Wave layer — lower third
    c.fillStyle = mid;
    c.beginPath();
    c.moveTo(14,38);
    c.quadraticCurveTo(20,32,26,38);
    c.quadraticCurveTo(32,44,38,38);
    c.quadraticCurveTo(44,32,50,38);
    c.lineTo(50,56); c.lineTo(14,56);
    c.closePath(); c.fill();
    // Foam bubbles
    c.fillStyle = foam;
    for (let i=0;i<3;i++) {
        c.beginPath(); c.ellipse(17+i*11,42,r.int(3,5),r.int(2,3),0,0,Math.PI*2); c.fill();
    }
    // Inner highlight streak
    c.strokeStyle = 'rgba(190,235,255,0.50)';
    c.lineWidth = 2;
    c.beginPath(); c.moveTo(22,12); c.quadraticCurveTo(26,22,22,32); c.stroke();
    // Glowing aqua eyes
    c.shadowColor = '#00ddff'; c.shadowBlur = 12;
    c.fillStyle = '#ccf0ff';
    c.beginPath(); c.arc(26,26,3.5,0,Math.PI*2); c.fill();
    c.beginPath(); c.arc(38,26,3.5,0,Math.PI*2); c.fill();
    c.shadowBlur = 0;
    c.fillStyle = '#004488';
    c.beginPath(); c.arc(26,26,1.5,0,Math.PI*2); c.fill();
    c.beginPath(); c.arc(38,26,1.5,0,Math.PI*2); c.fill();
}

function drawGnoll(c, r) {
    const fur  = `rgb(${r.int(150,190)},${r.int(120,155)},${r.int(70,100)})`;
    const mane = `rgb(${r.int(80,110)},${r.int(60,85)},${r.int(30,50)})`;
    // Body
    c.fillStyle = fur;
    c.fillRect(22,30,20,24);
    // Hyena head (muzzle forward)
    c.fillStyle = fur;
    c.beginPath(); c.ellipse(32,18,10,11,0,0,Math.PI*2); c.fill();
    // Elongated muzzle
    c.beginPath(); c.ellipse(40,20,7,4,0.2,0,Math.PI*2); c.fill();
    // Mane
    c.fillStyle = mane;
    c.beginPath(); c.moveTo(23,14); c.quadraticCurveTo(32,4,41,14); c.lineTo(38,20); c.lineTo(32,10); c.lineTo(26,20); c.fill();
    // Ears
    c.fillStyle = fur;
    c.beginPath(); c.moveTo(24,12); c.lineTo(18,4); c.lineTo(26,10); c.fill();
    c.beginPath(); c.moveTo(40,12); c.lineTo(46,4); c.lineTo(38,10); c.fill();
    // Eyes
    c.fillStyle = '#cc6600';
    c.beginPath(); c.arc(29,16,1.8,0,Math.PI*2); c.fill();
    c.beginPath(); c.arc(37,16,1.8,0,Math.PI*2); c.fill();
    // Bow
    c.strokeStyle = '#664422'; c.lineWidth = 1.5;
    c.beginPath(); c.arc(52,36,12,Math.PI*0.25,Math.PI*1.75); c.stroke();
    c.strokeStyle = '#ccbbaa'; c.lineWidth = 0.8;
    c.beginPath(); c.moveTo(52,25); c.lineTo(52,48); c.stroke();
    // Arrow nocked
    c.strokeStyle = '#998855'; c.lineWidth = 1;
    c.beginPath(); c.moveTo(52,36); c.lineTo(40,36); c.stroke();
    c.fillStyle = '#aaa';
    c.beginPath(); c.moveTo(40,36); c.lineTo(36,34); c.lineTo(38,36); c.lineTo(36,38); c.closePath(); c.fill();
    // Legs
    c.fillStyle = fur; c.fillRect(23,54,8,10); c.fillRect(33,54,8,10);
}

function drawDemonKnight(c, r) {
    const armor = `rgb(${r.int(25,45)},${r.int(10,20)},${r.int(10,20)})`;
    const glow  = '#ff3300';
    const skin  = `rgb(${r.int(150,180)},${r.int(40,70)},${r.int(30,50)})`;
    // Plate armor body
    c.fillStyle = armor;
    c.fillRect(18,26,28,28);
    // Pauldrons
    c.beginPath(); c.ellipse(16,30,7,6,0,0,Math.PI*2); c.fill();
    c.beginPath(); c.ellipse(48,30,7,6,0,0,Math.PI*2); c.fill();
    // Demonic head
    c.fillStyle = skin;
    c.beginPath(); c.ellipse(32,14,10,11,0,0,Math.PI*2); c.fill();
    // Curved horns
    c.fillStyle = '#220000';
    c.beginPath(); c.moveTo(25,8); c.quadraticCurveTo(16,0,20,8); c.quadraticCurveTo(22,12,26,10); c.fill();
    c.beginPath(); c.moveTo(39,8); c.quadraticCurveTo(48,0,44,8); c.quadraticCurveTo(42,12,38,10); c.fill();
    // Glowing eyes
    c.shadowColor = glow; c.shadowBlur = 10;
    c.fillStyle = '#ff8844';
    c.beginPath(); c.arc(28,12,2.5,0,Math.PI*2); c.fill();
    c.beginPath(); c.arc(36,12,2.5,0,Math.PI*2); c.fill();
    c.shadowBlur = 0;
    // Hellsword
    c.fillStyle = armor;
    c.fillRect(50,14,4,38);
    c.shadowColor = glow; c.shadowBlur = 8;
    c.fillStyle = '#cc2200';
    c.fillRect(50,14,4,38);
    c.shadowBlur = 0;
    c.fillStyle = '#888'; c.fillRect(46,28,12,3);
    // Arms
    c.fillStyle = armor;
    c.fillRect(8,28,10,18); c.fillRect(46,28,10,18);
    // Legs
    c.fillRect(20,54,10,10); c.fillRect(34,54,10,10);
    // Runes on armor
    c.strokeStyle = '#660000'; c.lineWidth = 0.8;
    c.beginPath(); c.moveTo(26,30); c.lineTo(38,30); c.stroke();
    c.beginPath(); c.moveTo(26,38); c.lineTo(38,38); c.stroke();
}

function drawNaga(c, r) {
    const scaleR = r.int(60,100);
    const scales = `rgb(${scaleR},${r.int(120,160)},${r.int(80,120)})`;
    const belly  = `rgb(${r.int(200,230)},${r.int(200,230)},${r.int(160,190)})`;
    const skin   = `rgb(${r.int(180,220)},${r.int(140,180)},${r.int(110,150)})`;
    // Coiled serpent tail (bottom half)
    c.fillStyle = scales;
    c.beginPath(); c.ellipse(30,54,20,8,0,0,Math.PI*2); c.fill();
    c.beginPath(); c.ellipse(20,46,14,6,-0.3,0,Math.PI*2); c.fill();
    c.beginPath(); c.ellipse(44,48,12,5,0.3,0,Math.PI*2); c.fill();
    // Belly stripe on coil
    c.fillStyle = belly;
    c.beginPath(); c.ellipse(30,56,15,5,0,0,Math.PI); c.fill();
    // Humanoid upper body
    c.fillStyle = skin;
    c.fillRect(24,22,16,22);
    // Scale overlay on torso
    c.strokeStyle = scales; c.lineWidth = 1;
    for (let i=0;i<3;i++) {
        c.beginPath(); c.ellipse(32,24+i*6,8,3,0,0,Math.PI*2); c.stroke();
    }
    // Head
    c.fillStyle = skin;
    c.beginPath(); c.ellipse(32,12,9,10,0,0,Math.PI*2); c.fill();
    // Hood of scales fanning out
    c.fillStyle = scales;
    for (let i=-2;i<=2;i++) {
        c.beginPath(); c.moveTo(32,8); c.lineTo(32+i*10,0); c.lineTo(32+i*8,10); c.fill();
    }
    // Slit eyes
    c.fillStyle = '#ffcc00';
    c.beginPath(); c.arc(28,10,2,0,Math.PI*2); c.fill();
    c.beginPath(); c.arc(36,10,2,0,Math.PI*2); c.fill();
    c.fillStyle = '#111'; c.fillRect(28,9,1,2); c.fillRect(36,9,1,2);
    // Tongue
    c.strokeStyle = '#cc3355'; c.lineWidth = 1;
    c.beginPath(); c.moveTo(32,18); c.lineTo(32,24); c.lineTo(30,26); c.stroke();
    c.beginPath(); c.moveTo(32,24); c.lineTo(34,26); c.stroke();
    // Arms holding short blades
    c.fillStyle = skin;
    c.fillRect(10,26,10,12); c.fillRect(44,26,10,12);
    c.fillStyle = '#aaa'; c.fillRect(8,20,3,12); c.fillRect(53,20,3,12);
}

function drawGelatinousCube(c, r) {
    // Translucent cube — semi-transparent acid-green/clear glass
    const alpha = 0.55 + r.next()*0.15;
    const gel   = `rgba(${r.int(160,220)},${r.int(240,255)},${r.int(160,220)},${alpha})`;
    const shine = 'rgba(255,255,255,0.5)';
    // Main body (square-ish)
    c.fillStyle = gel;
    c.fillRect(8,8,48,52);
    // Top face highlight
    c.fillStyle = shine;
    c.fillRect(8,8,48,6);
    c.fillRect(8,8,6,52);
    // Refraction lines inside
    c.strokeStyle = 'rgba(100,220,100,0.3)'; c.lineWidth = 1;
    for (let i=1;i<4;i++) {
        c.beginPath(); c.moveTo(8+i*12,8); c.lineTo(8+i*12,60); c.stroke();
        c.beginPath(); c.moveTo(8,8+i*13); c.lineTo(56,8+i*13); c.stroke();
    }
    // Trapped bones inside
    c.strokeStyle = 'rgba(200,180,150,0.7)'; c.lineWidth = 1.5;
    c.beginPath(); c.moveTo(22,20); c.lineTo(36,30); c.stroke();
    c.beginPath(); c.moveTo(36,38); c.lineTo(28,50); c.stroke();
    c.fillStyle = 'rgba(220,200,170,0.7)';
    c.beginPath(); c.arc(22,20,2.5,0,Math.PI*2); c.fill();
    c.beginPath(); c.arc(36,38,2,0,Math.PI*2); c.fill();
    // Faint eyes — barely visible within the gel
    c.fillStyle = 'rgba(0,80,0,0.6)';
    c.beginPath(); c.arc(28,30,3.5,0,Math.PI*2); c.fill();
    c.beginPath(); c.arc(40,30,3.5,0,Math.PI*2); c.fill();
    c.fillStyle = 'rgba(0,200,0,0.4)';
    c.beginPath(); c.arc(28,30,1.5,0,Math.PI*2); c.fill();
    c.beginPath(); c.arc(40,30,1.5,0,Math.PI*2); c.fill();
    // Acid drip at bottom
    c.fillStyle = `rgba(${r.int(100,150)},${r.int(220,255)},${r.int(80,130)},0.7)`;
    for (let i=0;i<5;i++) {
        c.beginPath(); c.ellipse(14+i*10,64,2.5,5,0,0,Math.PI*2); c.fill();
    }
}

// ── Phase 13: New monster sprites ───────────────────────────────────────────

function drawDungeonApe(c, r) {
    const fur = `rgb(${r.int(60,90)},${r.int(45,70)},${r.int(30,50)})`;
    const face = `rgb(${r.int(80,110)},${r.int(60,85)},${r.int(50,70)})`;
    // Massive body
    c.fillStyle = fur;
    c.beginPath(); c.ellipse(32,42,20,18,0,0,Math.PI*2); c.fill();
    // Head
    c.beginPath(); c.ellipse(32,18,14,13,0,0,Math.PI*2); c.fill();
    // Brow ridge
    c.fillStyle = `rgb(${r.int(40,65)},${r.int(30,50)},${r.int(20,38)})`;
    c.fillRect(18,12,28,5);
    // Face
    c.fillStyle = face;
    c.beginPath(); c.ellipse(32,22,9,8,0,0,Math.PI*2); c.fill();
    // Eyes
    c.fillStyle = '#cc5500';
    c.beginPath(); c.arc(27,16,3,0,Math.PI*2); c.fill();
    c.beginPath(); c.arc(37,16,3,0,Math.PI*2); c.fill();
    c.fillStyle = '#111';
    c.beginPath(); c.arc(27,16,1.5,0,Math.PI*2); c.fill();
    c.beginPath(); c.arc(37,16,1.5,0,Math.PI*2); c.fill();
    // Nostrils
    c.fillStyle = '#330000';
    c.beginPath(); c.arc(30,23,1.5,0,Math.PI*2); c.fill();
    c.beginPath(); c.arc(34,23,1.5,0,Math.PI*2); c.fill();
    // Long arms
    c.fillStyle = fur;
    c.fillRect(4,28,10,24); c.fillRect(50,28,10,24);
    // Knuckles
    c.fillStyle = face;
    c.beginPath(); c.ellipse(9,52,5,4,0,0,Math.PI*2); c.fill();
    c.beginPath(); c.ellipse(55,52,5,4,0,0,Math.PI*2); c.fill();
    // Legs
    c.fillStyle = fur;
    c.fillRect(20,56,10,8); c.fillRect(34,56,10,8);
}

function drawHag(c, r) {
    const skin = `rgb(${r.int(90,130)},${r.int(100,140)},${r.int(60,90)})`;
    const robe = `rgb(${r.int(30,55)},${r.int(20,40)},${r.int(30,55)})`;
    // Tattered robe
    c.fillStyle = robe;
    c.beginPath();
    c.moveTo(16,32);
    c.quadraticCurveTo(10,50,8,64);
    c.lineTo(20,60); c.lineTo(24,64); c.lineTo(30,58); c.lineTo(34,64); c.lineTo(40,58); c.lineTo(44,64); c.lineTo(56,60);
    c.quadraticCurveTo(54,50,48,32);
    c.closePath(); c.fill();
    // Head
    c.fillStyle = skin;
    c.beginPath(); c.ellipse(32,18,11,12,0,0,Math.PI*2); c.fill();
    // Witch hat
    c.fillStyle = '#1a0a28';
    c.beginPath(); c.moveTo(16,20); c.lineTo(32,2); c.lineTo(48,20); c.closePath(); c.fill();
    c.beginPath(); c.ellipse(32,20,18,4,0,0,Math.PI*2); c.fill();
    // Large hooked nose
    c.fillStyle = skin;
    c.beginPath(); c.moveTo(32,18); c.quadraticCurveTo(36,24,32,28); c.quadraticCurveTo(28,28,30,22); c.fill();
    // Eyes — glowing green
    c.shadowColor = '#44ff44'; c.shadowBlur = 8;
    c.fillStyle = '#66ff44';
    c.beginPath(); c.arc(27,16,2.5,0,Math.PI*2); c.fill();
    c.beginPath(); c.arc(37,16,2.5,0,Math.PI*2); c.fill();
    c.shadowBlur = 0;
    // Gnarled hands with staff
    c.fillStyle = skin;
    c.fillRect(8,36,7,14); c.fillRect(49,36,7,14);
    c.strokeStyle = '#554422'; c.lineWidth = 3;
    c.beginPath(); c.moveTo(10,26); c.lineTo(10,64); c.stroke();
    // Magic orb atop staff
    c.shadowColor = '#8800ff'; c.shadowBlur = 10;
    c.fillStyle = '#aa44ff';
    c.beginPath(); c.arc(10,22,6,0,Math.PI*2); c.fill();
    c.shadowBlur = 0;
}

function drawBandit(c, r) {
    const leather = r.int(0,1) ? '#5a3a1a' : '#3a3a2a';
    const skin = `rgb(${r.int(180,220)},${r.int(150,190)},${r.int(120,160)})`;
    // Leather armor body
    c.fillStyle = leather;
    c.fillRect(20,28,24,26);
    // Hood/masked head
    c.fillStyle = '#222';
    c.beginPath(); c.ellipse(32,16,11,12,0,0,Math.PI*2); c.fill();
    // Bandana/mask covering lower face
    c.fillStyle = '#882222';
    c.fillRect(21,18,22,8);
    // Eyes
    c.fillStyle = skin;
    c.fillRect(22,12,8,5); c.fillRect(34,12,8,5);
    c.fillStyle = '#111';
    c.beginPath(); c.arc(26,14,2,0,Math.PI*2); c.fill();
    c.beginPath(); c.arc(38,14,2,0,Math.PI*2); c.fill();
    // Dagger in right hand
    c.fillStyle = skin; c.fillRect(46,30,8,14);
    c.fillStyle = '#aaa'; c.fillRect(50,16,3,22);
    c.fillStyle = '#664'; c.fillRect(47,32,9,3);
    // Crossbow in left hand
    c.fillStyle = '#554433'; c.fillRect(8,32,12,8);
    c.strokeStyle = '#888'; c.lineWidth = 1.5;
    c.beginPath(); c.moveTo(8,36); c.lineTo(20,36); c.stroke();
    // Legs
    c.fillStyle = leather; c.fillRect(22,54,8,10); c.fillRect(34,54,8,10);
}

function drawBeholder(c, r) {
    const body = `rgb(${r.int(80,120)},${r.int(60,90)},${r.int(30,60)})`;
    const pupil = '#111';
    // Body — large spheroid
    c.fillStyle = body;
    c.beginPath(); c.ellipse(32,36,24,20,0,0,Math.PI*2); c.fill();
    // Central giant eye
    c.fillStyle = '#ffffcc';
    c.beginPath(); c.ellipse(32,36,14,12,0,0,Math.PI*2); c.fill();
    c.fillStyle = '#4400aa';
    c.beginPath(); c.ellipse(32,36,9,9,0,0,Math.PI*2); c.fill();
    c.fillStyle = pupil;
    c.beginPath(); c.arc(32,36,5,0,Math.PI*2); c.fill();
    c.shadowColor = '#aa44ff'; c.shadowBlur = 8;
    c.fillStyle = '#8800ff';
    c.beginPath(); c.arc(32,36,2.5,0,Math.PI*2); c.fill();
    c.shadowBlur = 0;
    // Eyelid
    c.strokeStyle = body; c.lineWidth = 2;
    c.beginPath(); c.ellipse(32,36,14,4,0,Math.PI,Math.PI*2); c.stroke();
    // 6 eye stalks radiating outward
    const stalkAngles = [0, Math.PI*0.33, Math.PI*0.66, Math.PI, Math.PI*1.33, Math.PI*1.66];
    const eyeColors = ['#ff4444','#44ff44','#4444ff','#ffff44','#ff44ff','#44ffff'];
    c.strokeStyle = body; c.lineWidth = 2.5;
    for (let i=0;i<6;i++) {
        const a = stalkAngles[i];
        const sx = 32+Math.cos(a)*20, sy = 36+Math.sin(a)*16;
        c.beginPath(); c.moveTo(32+Math.cos(a)*18,36+Math.sin(a)*14); c.lineTo(sx,sy); c.stroke();
        c.fillStyle = '#fff';
        c.beginPath(); c.arc(sx,sy,3.5,0,Math.PI*2); c.fill();
        c.fillStyle = eyeColors[i];
        c.beginPath(); c.arc(sx,sy,2,0,Math.PI*2); c.fill();
        c.fillStyle = pupil;
        c.beginPath(); c.arc(sx,sy,1,0,Math.PI*2); c.fill();
    }
    // Maw of teeth at bottom
    c.fillStyle = '#220000';
    c.beginPath(); c.ellipse(32,52,10,5,0,0,Math.PI); c.fill();
    c.fillStyle = '#ddd';
    for (let i=0;i<5;i++) c.fillRect(24+i*4,50,2,5);
}

function drawDragonBase(c, r, bodyRGB, bellyRGB, eyeCol) {
    const [bR,bG,bB] = bodyRGB;
    const body = `rgb(${r.int(bR-15,bR+15)},${r.int(bG-15,bG+15)},${r.int(bB-15,bB+15)})`;
    const [eR,eG,eB] = bellyRGB;
    const belly = `rgb(${r.int(eR-10,eR+10)},${r.int(eG-10,eG+10)},${r.int(eB-10,eB+10)})`;
    // Body
    c.fillStyle = body;
    c.beginPath();
    c.moveTo(10,56); c.quadraticCurveTo(10,30,26,24);
    c.quadraticCurveTo(38,18,50,26); c.quadraticCurveTo(58,34,54,56);
    c.closePath(); c.fill();
    // Belly plates
    c.fillStyle = belly;
    c.beginPath(); c.ellipse(32,46,12,10,0,0,Math.PI*2); c.fill();
    c.beginPath(); c.ellipse(32,36,8,6,0,0,Math.PI*2); c.fill();
    // Head
    c.fillStyle = body;
    c.beginPath(); c.ellipse(32,16,14,11,0,0,Math.PI*2); c.fill();
    c.beginPath(); c.ellipse(44,18,8,5,0.3,0,Math.PI*2); c.fill();
    // Horns
    c.fillStyle = '#221100';
    c.beginPath(); c.moveTo(26,10); c.lineTo(20,2); c.lineTo(28,8); c.fill();
    c.beginPath(); c.moveTo(36,8); c.lineTo(38,0); c.lineTo(40,8); c.fill();
    // Eyes
    c.shadowColor = eyeCol; c.shadowBlur = 8;
    c.fillStyle = eyeCol;
    c.beginPath(); c.arc(30,13,3,0,Math.PI*2); c.fill();
    c.shadowBlur = 0;
    c.fillStyle = '#111'; c.fillRect(30,12,1,2);
    // Wings
    c.fillStyle = `rgba(${bR},${Math.max(0,bG-20)},${Math.max(0,bB-20)},0.7)`;
    c.beginPath(); c.moveTo(18,30); c.lineTo(2,14); c.lineTo(8,28); c.lineTo(2,36); c.lineTo(16,36); c.fill();
    c.beginPath(); c.moveTo(46,30); c.lineTo(62,14); c.lineTo(56,28); c.lineTo(62,36); c.lineTo(48,36); c.fill();
    // Claws
    c.fillStyle = '#222';
    c.fillRect(12,54,4,8); c.fillRect(18,54,4,8); c.fillRect(42,54,4,8); c.fillRect(48,54,4,8);
    // Tail
    c.strokeStyle = body; c.lineWidth = 5;
    c.beginPath(); c.moveTo(12,56); c.quadraticCurveTo(4,62,2,56); c.stroke();
}
function drawRedDragon(c, r)   { drawDragonBase(c, r, [160,30,20], [200,100,60], '#ff6600'); }
function drawBlackDragon(c, r) {
    drawDragonBase(c, r, [30,30,30], [60,60,40], '#44ff44');
    c.shadowColor = '#44ff44'; c.shadowBlur = 6;
    c.fillStyle = 'rgba(50,200,50,0.7)';
    c.beginPath(); c.ellipse(44,26,3,5,0.2,0,Math.PI*2); c.fill();
    c.shadowBlur = 0;
}
function drawBlueDragon(c, r) {
    drawDragonBase(c, r, [30,60,180], [80,120,220], '#00ccff');
    c.strokeStyle = '#aaeeff'; c.lineWidth = 1.5;
    c.beginPath(); c.moveTo(30,6); c.lineTo(28,12); c.lineTo(32,10); c.lineTo(30,16); c.stroke();
}
function drawGreenDragon(c, r) {
    drawDragonBase(c, r, [30,100,40], [80,160,80], '#88ff44');
    c.fillStyle = 'rgba(80,200,60,0.3)';
    c.beginPath(); c.ellipse(44,22,8,6,0,0,Math.PI*2); c.fill();
}
function drawWhiteDragon(c, r) {
    drawDragonBase(c, r, [200,215,230], [230,240,255], '#aaddff');
    c.strokeStyle = '#cceeff'; c.lineWidth = 1;
    for (let i=0;i<4;i++) {
        c.beginPath(); c.moveTo(44+i*4,20); c.lineTo(44+i*4,14); c.stroke();
    }
}

function drawEfreeti(c, r) {
    const fire = `rgb(${r.int(200,240)},${r.int(80,130)},${r.int(10,40)})`;
    const skin = `rgb(${r.int(30,55)},${r.int(80,120)},${r.int(140,180)})`;
    // Smoke/fire lower body
    c.fillStyle = `rgba(200,100,20,0.5)`;
    c.beginPath(); c.moveTo(14,64); c.quadraticCurveTo(20,48,32,50); c.quadraticCurveTo(44,48,50,64); c.closePath(); c.fill();
    c.fillStyle = fire;
    for (let i=0;i<5;i++) {
        c.beginPath(); c.ellipse(18+i*7,58,3,6,r.next()-0.5,0,Math.PI*2); c.fill();
    }
    // Upper body
    c.fillStyle = skin;
    c.fillRect(18,26,28,24);
    c.beginPath(); c.ellipse(32,14,12,13,0,0,Math.PI*2); c.fill();
    // Turban
    c.fillStyle = '#880022';
    c.beginPath(); c.ellipse(32,8,13,7,0,0,Math.PI*2); c.fill();
    c.fillStyle = '#ff8800'; c.beginPath(); c.arc(32,6,2.5,0,Math.PI*2); c.fill();
    // Glowing eyes
    c.shadowColor = '#ff6600'; c.shadowBlur = 10;
    c.fillStyle = '#ffaa22';
    c.beginPath(); c.arc(27,13,3,0,Math.PI*2); c.fill();
    c.beginPath(); c.arc(37,13,3,0,Math.PI*2); c.fill();
    c.shadowBlur = 0;
    // Arms with bracers
    c.fillStyle = skin; c.fillRect(6,28,12,16); c.fillRect(46,28,12,16);
    c.fillStyle = '#888'; c.fillRect(6,34,12,4); c.fillRect(46,34,12,4);
    // Scimitar
    c.fillStyle = '#ddd';
    c.beginPath(); c.moveTo(4,30); c.quadraticCurveTo(2,44,10,44); c.lineTo(10,30); c.fill();
}

function drawEttin(c, r) {
    const skin = `rgb(${r.int(140,180)},${r.int(100,140)},${r.int(70,100)})`;
    const clothes = '#4a3a2a';
    c.fillStyle = clothes;
    c.fillRect(12,30,40,28);
    // Two heads
    c.fillStyle = skin;
    c.beginPath(); c.ellipse(22,14,10,11,0,0,Math.PI*2); c.fill();
    c.fillStyle = '#cc3300';
    c.beginPath(); c.arc(18,12,2.5,0,Math.PI*2); c.fill();
    c.beginPath(); c.arc(26,12,2.5,0,Math.PI*2); c.fill();
    c.fillStyle = '#111'; c.beginPath(); c.arc(18,12,1.2,0,Math.PI*2); c.fill();
    c.beginPath(); c.arc(26,12,1.2,0,Math.PI*2); c.fill();
    c.fillStyle = skin;
    c.beginPath(); c.ellipse(42,14,10,11,-0.15,0,Math.PI*2); c.fill();
    c.fillStyle = '#cc3300';
    c.beginPath(); c.arc(38,12,2.5,0,Math.PI*2); c.fill();
    c.beginPath(); c.arc(46,12,2.5,0,Math.PI*2); c.fill();
    c.fillStyle = '#111'; c.beginPath(); c.arc(38,12,1.2,0,Math.PI*2); c.fill();
    c.beginPath(); c.arc(46,12,1.2,0,Math.PI*2); c.fill();
    // Arms
    c.fillStyle = skin; c.fillRect(0,30,12,22); c.fillRect(52,30,12,22);
    c.fillStyle = '#664422';
    c.fillRect(0,26,5,10); c.fillRect(59,26,5,10);
    c.beginPath(); c.ellipse(2,22,4,5,0,0,Math.PI*2); c.fill();
    c.beginPath(); c.ellipse(61,22,4,5,0,0,Math.PI*2); c.fill();
    c.fillStyle = clothes; c.fillRect(14,58,12,6); c.fillRect(38,58,12,6);
}

function drawGiantBase(c, r, armorHex, glowHex, accentHex) {
    const skin = `rgb(${r.int(160,200)},${r.int(120,155)},${r.int(90,120)})`;
    c.fillStyle = armorHex;
    c.fillRect(14,28,36,30);
    c.beginPath(); c.ellipse(12,32,8,7,0,0,Math.PI*2); c.fill();
    c.beginPath(); c.ellipse(52,32,8,7,0,0,Math.PI*2); c.fill();
    c.fillStyle = skin;
    c.beginPath(); c.ellipse(32,14,13,13,0,0,Math.PI*2); c.fill();
    c.fillStyle = armorHex;
    c.fillRect(19,8,26,8);
    c.shadowColor = glowHex; c.shadowBlur = 10;
    c.fillStyle = glowHex;
    c.beginPath(); c.arc(27,14,3,0,Math.PI*2); c.fill();
    c.beginPath(); c.arc(37,14,3,0,Math.PI*2); c.fill();
    c.shadowBlur = 0;
    c.fillStyle = '#111'; c.beginPath(); c.arc(27,14,1.5,0,Math.PI*2); c.fill();
    c.beginPath(); c.arc(37,14,1.5,0,Math.PI*2); c.fill();
    c.fillStyle = armorHex; c.fillRect(2,30,12,22); c.fillRect(50,30,12,22);
    c.fillStyle = accentHex;
    c.fillRect(54,6,6,46);
    c.beginPath(); c.ellipse(57,6,6,4,0,0,Math.PI*2); c.fill();
    c.fillStyle = armorHex; c.fillRect(16,58,12,6); c.fillRect(36,58,12,6);
}
function drawFireGiant(c, r)  { drawGiantBase(c, r, '#661100', '#ff6600', '#cc3300'); }
function drawIceGiant(c, r)   { drawGiantBase(c, r, '#224466', '#aaddff', '#88ccff'); }
function drawStoneGiant(c, r) { drawGiantBase(c, r, '#555555', '#aaaaaa', '#888888'); }
function drawStormGiant(c, r) {
    drawGiantBase(c, r, '#224466', '#ffff44', '#4488ff');
    c.strokeStyle = '#ffff88'; c.lineWidth = 1.5;
    c.beginPath(); c.moveTo(54,10); c.lineTo(50,20); c.lineTo(56,22); c.lineTo(50,32); c.stroke();
}

function drawGiantFrog(c, r) {
    const green = `rgb(${r.int(40,80)},${r.int(130,180)},${r.int(40,80)})`;
    const belly = `rgb(${r.int(150,200)},${r.int(200,230)},${r.int(140,180)})`;
    c.fillStyle = green;
    c.beginPath(); c.ellipse(32,44,22,16,0,0,Math.PI*2); c.fill();
    c.fillStyle = belly;
    c.beginPath(); c.ellipse(32,48,14,10,0,0,Math.PI*2); c.fill();
    c.fillStyle = green;
    c.beginPath(); c.ellipse(32,24,20,14,0,0,Math.PI*2); c.fill();
    c.fillStyle = '#cc0000';
    c.beginPath(); c.moveTo(16,26); c.quadraticCurveTo(32,36,48,26); c.lineTo(44,26); c.quadraticCurveTo(32,30,20,26); c.fill();
    // Bulging eyes
    c.fillStyle = '#ffffaa';
    c.beginPath(); c.arc(22,16,7,0,Math.PI*2); c.fill();
    c.beginPath(); c.arc(42,16,7,0,Math.PI*2); c.fill();
    c.fillStyle = '#553300';
    c.beginPath(); c.arc(22,16,4,0,Math.PI*2); c.fill();
    c.beginPath(); c.arc(42,16,4,0,Math.PI*2); c.fill();
    c.fillStyle = '#111';
    c.beginPath(); c.arc(22,16,2,0,Math.PI*2); c.fill();
    c.beginPath(); c.arc(42,16,2,0,Math.PI*2); c.fill();
    c.fillStyle = green;
    c.beginPath(); c.ellipse(14,50,8,5,0.3,0,Math.PI*2); c.fill();
    c.beginPath(); c.ellipse(50,50,8,5,-0.3,0,Math.PI*2); c.fill();
    c.fillStyle = '#88ff44';
    c.beginPath(); c.arc(32,30,3,0,Math.PI*2); c.fill();
}

function drawMedusa(c, r) {
    const skin = `rgb(${r.int(160,200)},${r.int(140,180)},${r.int(100,140)})`;
    const snake = `rgb(${r.int(40,80)},${r.int(130,170)},${r.int(40,80)})`;
    c.fillStyle = snake;
    c.beginPath(); c.ellipse(32,54,18,8,0,0,Math.PI*2); c.fill();
    c.beginPath(); c.ellipse(20,48,12,5,-0.3,0,Math.PI*2); c.fill();
    c.fillStyle = '#446644';
    c.fillRect(20,26,24,22);
    c.fillStyle = skin;
    c.beginPath(); c.ellipse(32,16,11,12,0,0,Math.PI*2); c.fill();
    // Snake hair
    c.strokeStyle = snake; c.lineWidth = 2.5;
    for (let i=0;i<6;i++) {
        const ang = (i/6)*Math.PI - Math.PI*0.5;
        const sx = 32+Math.cos(ang)*10, sy = 14+Math.sin(ang)*10;
        c.beginPath(); c.moveTo(32,10);
        c.quadraticCurveTo(sx+r.int(-4,4),sy-4,sx,sy);
        c.stroke();
        c.fillStyle = snake;
        c.beginPath(); c.arc(sx,sy,2,0,Math.PI*2); c.fill();
    }
    // Petrifying eyes
    c.shadowColor = '#ffdd00'; c.shadowBlur = 12;
    c.fillStyle = '#ffee44';
    c.beginPath(); c.arc(28,14,3,0,Math.PI*2); c.fill();
    c.beginPath(); c.arc(36,14,3,0,Math.PI*2); c.fill();
    c.shadowBlur = 0;
    c.fillStyle = '#111'; c.beginPath(); c.arc(28,14,1.5,0,Math.PI*2); c.fill();
    c.beginPath(); c.arc(36,14,1.5,0,Math.PI*2); c.fill();
    // Bow
    c.strokeStyle = '#664422'; c.lineWidth = 2;
    c.beginPath(); c.arc(52,38,12,Math.PI*0.2,Math.PI*1.8); c.stroke();
    c.strokeStyle = '#ccbbaa'; c.lineWidth = 0.8;
    c.beginPath(); c.moveTo(52,27); c.lineTo(52,50); c.stroke();
}

function drawHydra(c, r) {
    const scale = `rgb(${r.int(30,60)},${r.int(100,140)},${r.int(40,80)})`;
    const belly = `rgb(${r.int(150,190)},${r.int(180,220)},${r.int(100,140)})`;
    c.fillStyle = scale;
    c.beginPath(); c.ellipse(32,50,26,14,0,0,Math.PI*2); c.fill();
    c.fillStyle = belly;
    c.beginPath(); c.ellipse(32,52,18,10,0,0,Math.PI*2); c.fill();
    // 6 heads
    const headPos = [
        [14,24,12,14], [20,16,20,12], [28,10,28,8],
        [36,10,36,8],  [44,16,44,12], [50,24,52,16],
    ];
    for (const [nx,ny,hx,hy] of headPos) {
        c.strokeStyle = scale; c.lineWidth = 6;
        c.beginPath(); c.moveTo(32,40); c.quadraticCurveTo(nx-4,ny+8,nx,ny); c.stroke();
        c.fillStyle = scale;
        c.beginPath(); c.ellipse(hx,hy,7,6,0,0,Math.PI*2); c.fill();
        c.beginPath(); c.ellipse(hx+4,hy+1,4,3,0.2,0,Math.PI*2); c.fill();
        c.fillStyle = '#ff4400';
        c.beginPath(); c.arc(hx-1,hy-2,2,0,Math.PI*2); c.fill();
    }
    c.strokeStyle = scale; c.lineWidth = 7;
    c.beginPath(); c.moveTo(56,50); c.quadraticCurveTo(60,58,56,62); c.stroke();
}

function drawManticore(c, r) {
    const lion = `rgb(${r.int(180,220)},${r.int(140,175)},${r.int(70,110)})`;
    const wing = `rgb(${r.int(80,110)},${r.int(40,70)},${r.int(60,90)})`;
    const spike = '#884422';
    c.fillStyle = lion;
    c.beginPath(); c.ellipse(28,42,20,14,0,0,Math.PI*2); c.fill();
    c.beginPath(); c.ellipse(18,22,13,12,0,0,Math.PI*2); c.fill();
    // Mane
    c.fillStyle = `rgb(${r.int(120,160)},${r.int(80,110)},${r.int(30,60)})`;
    c.beginPath(); c.ellipse(18,22,16,15,0,0,Math.PI*2); c.fill();
    c.fillStyle = lion;
    c.beginPath(); c.ellipse(18,22,10,10,0,0,Math.PI*2); c.fill();
    // Eyes
    c.fillStyle = '#ff8800';
    c.beginPath(); c.arc(14,19,2.5,0,Math.PI*2); c.fill();
    c.beginPath(); c.arc(22,19,2.5,0,Math.PI*2); c.fill();
    c.fillStyle = '#111';
    c.beginPath(); c.arc(14,19,1.2,0,Math.PI*2); c.fill();
    c.beginPath(); c.arc(22,19,1.2,0,Math.PI*2); c.fill();
    c.fillStyle = '#ddd'; c.fillRect(14,26,8,3);
    // Wings
    c.fillStyle = wing;
    c.beginPath(); c.moveTo(34,34); c.lineTo(56,16); c.lineTo(54,28); c.lineTo(62,22); c.lineTo(56,36); c.lineTo(44,36); c.fill();
    // Scorpion tail
    c.strokeStyle = lion; c.lineWidth = 5;
    c.beginPath(); c.moveTo(46,42); c.quadraticCurveTo(60,42,62,34); c.stroke();
    c.fillStyle = spike;
    for (let i=0;i<4;i++) {
        c.beginPath(); c.moveTo(62,34); c.lineTo(60+i*2,28-i*2); c.lineTo(58+i*2,32-i*2); c.fill();
    }
    c.fillStyle = lion; c.fillRect(14,52,8,10); c.fillRect(34,52,8,10);
}

function drawEvilPriest(c, r) {
    const robe = `rgb(${r.int(20,40)},${r.int(10,25)},${r.int(20,40)})`;
    const skin = `rgb(${r.int(180,220)},${r.int(160,200)},${r.int(140,180)})`;
    const symbol = '#cc0000';
    c.fillStyle = robe;
    c.beginPath();
    c.moveTo(14,32); c.lineTo(10,64); c.lineTo(54,64); c.lineTo(50,32); c.closePath(); c.fill();
    c.fillStyle = skin;
    c.beginPath(); c.ellipse(32,18,11,12,0,0,Math.PI*2); c.fill();
    c.fillStyle = robe;
    c.beginPath(); c.moveTo(20,18); c.quadraticCurveTo(32,4,44,18); c.quadraticCurveTo(38,14,32,12); c.quadraticCurveTo(26,14,20,18); c.fill();
    c.shadowColor = '#ff0000'; c.shadowBlur = 8;
    c.fillStyle = '#ff3333';
    c.beginPath(); c.arc(27,17,2.5,0,Math.PI*2); c.fill();
    c.beginPath(); c.arc(37,17,2.5,0,Math.PI*2); c.fill();
    c.shadowBlur = 0;
    // Unholy symbol
    c.strokeStyle = symbol; c.lineWidth = 2;
    c.beginPath(); c.moveTo(32,36); c.lineTo(32,50); c.stroke();
    c.beginPath(); c.moveTo(26,40); c.lineTo(38,40); c.stroke();
    c.beginPath(); c.arc(32,38,6,0,Math.PI*2); c.stroke();
    c.strokeStyle = '#664422'; c.lineWidth = 3;
    c.beginPath(); c.moveTo(52,20); c.lineTo(52,64); c.stroke();
    c.shadowColor = symbol; c.shadowBlur = 8;
    c.fillStyle = symbol;
    c.beginPath(); c.arc(52,18,5,0,Math.PI*2); c.fill();
    c.shadowBlur = 0;
    c.fillStyle = robe; c.fillRect(8,34,8,16); c.fillRect(48,34,8,16);
}

function drawWerewolf(c, r) {
    const fur = `rgb(${r.int(60,100)},${r.int(50,80)},${r.int(40,65)})`;
    const darkFur = `rgb(${r.int(30,55)},${r.int(25,45)},${r.int(20,38)})`;
    c.fillStyle = fur;
    c.beginPath(); c.ellipse(32,42,18,16,0,0,Math.PI*2); c.fill();
    c.beginPath(); c.ellipse(32,18,12,12,0,0,Math.PI*2); c.fill();
    c.beginPath(); c.ellipse(40,22,8,5,0.3,0,Math.PI*2); c.fill();
    // Pointed ears
    c.beginPath(); c.moveTo(24,12); c.lineTo(18,2); c.lineTo(26,10); c.fill();
    c.beginPath(); c.moveTo(40,12); c.lineTo(44,2); c.lineTo(38,10); c.fill();
    // Glowing eyes
    c.shadowColor = '#ffdd00'; c.shadowBlur = 10;
    c.fillStyle = '#ffdd00';
    c.beginPath(); c.arc(28,16,3,0,Math.PI*2); c.fill();
    c.beginPath(); c.arc(38,16,3,0,Math.PI*2); c.fill();
    c.shadowBlur = 0;
    c.fillStyle = '#111'; c.beginPath(); c.arc(28,16,1.5,0,Math.PI*2); c.fill();
    c.beginPath(); c.arc(38,16,1.5,0,Math.PI*2); c.fill();
    c.fillStyle = '#fff'; c.fillRect(34,24,3,5); c.fillRect(38,24,3,5);
    c.fillStyle = fur; c.fillRect(6,32,10,18); c.fillRect(48,32,10,18);
    c.fillStyle = darkFur; c.fillRect(6,48,10,4); c.fillRect(48,48,10,4);
    c.strokeStyle = '#ccc'; c.lineWidth = 1.2;
    for (let i=0;i<3;i++) { c.beginPath(); c.moveTo(7+i*3,52); c.lineTo(6+i*3,58); c.stroke(); }
    for (let i=0;i<3;i++) { c.beginPath(); c.moveTo(49+i*3,52); c.lineTo(48+i*3,58); c.stroke(); }
    c.fillStyle = fur; c.fillRect(20,56,10,8); c.fillRect(34,56,10,8);
}

function drawYeti(c, r) {
    const white = `rgb(${r.int(220,240)},${r.int(225,245)},${r.int(230,250)})`;
    const ice = '#aaddff';
    c.fillStyle = white;
    c.beginPath(); c.ellipse(32,44,22,18,0,0,Math.PI*2); c.fill();
    c.strokeStyle = 'rgba(180,200,220,0.4)'; c.lineWidth = 1;
    for (let i=0;i<8;i++) {
        const ang = (i/8)*Math.PI*2;
        c.beginPath(); c.moveTo(32+Math.cos(ang)*14,44+Math.sin(ang)*12);
        c.lineTo(32+Math.cos(ang)*20,44+Math.sin(ang)*17); c.stroke();
    }
    c.fillStyle = white;
    c.beginPath(); c.ellipse(32,18,14,14,0,0,Math.PI*2); c.fill();
    c.fillStyle = `rgb(${r.int(180,200)},${r.int(185,205)},${r.int(190,210)})`;
    c.fillRect(20,10,24,5);
    // Ice-blue eyes
    c.shadowColor = ice; c.shadowBlur = 8;
    c.fillStyle = ice;
    c.beginPath(); c.arc(26,14,3.5,0,Math.PI*2); c.fill();
    c.beginPath(); c.arc(38,14,3.5,0,Math.PI*2); c.fill();
    c.shadowBlur = 0;
    c.fillStyle = '#001122';
    c.beginPath(); c.arc(26,14,1.8,0,Math.PI*2); c.fill();
    c.beginPath(); c.arc(38,14,1.8,0,Math.PI*2); c.fill();
    c.fillStyle = '#fff'; c.fillRect(28,22,4,5); c.fillRect(33,22,4,5);
    c.fillStyle = white; c.fillRect(2,30,12,24); c.fillRect(50,30,12,24);
    c.beginPath(); c.ellipse(8,54,7,6,0,0,Math.PI*2); c.fill();
    c.beginPath(); c.ellipse(56,54,7,6,0,0,Math.PI*2); c.fill();
    c.fillRect(20,58,10,6); c.fillRect(34,58,10,6);
    c.shadowColor = ice; c.shadowBlur = 6;
    c.fillStyle = 'rgba(170,220,255,0.5)';
    c.beginPath(); c.arc(8,54,6,0,Math.PI*2); c.fill();
    c.beginPath(); c.arc(56,54,6,0,Math.PI*2); c.fill();
    c.shadowBlur = 0;
}

// ── Phase 14: Level 25+ Deep Dungeon Monsters ────────────────────────────

function drawIceDemon(c, r) {
    const body  = `rgb(${r.int(60,100)},${r.int(120,170)},${r.int(190,240)})`;
    const ice   = `rgb(${r.int(180,220)},${r.int(220,250)},255)`;
    const dark  = `rgb(${r.int(20,40)},${r.int(50,80)},${r.int(100,140)})`;
    // Hulking torso
    c.fillStyle = body;
    c.fillRect(16,28,32,28);
    // Pauldrons with ice spikes
    c.beginPath(); c.ellipse(14,32,8,7,0,0,Math.PI*2); c.fill();
    c.beginPath(); c.ellipse(50,32,8,7,0,0,Math.PI*2); c.fill();
    c.fillStyle = ice;
    c.beginPath(); c.moveTo(10,26); c.lineTo(6,14); c.lineTo(14,24); c.fill();
    c.beginPath(); c.moveTo(54,26); c.lineTo(58,14); c.lineTo(50,24); c.fill();
    // Head
    c.fillStyle = body;
    c.beginPath(); c.ellipse(32,14,11,12,0,0,Math.PI*2); c.fill();
    // Ice horns
    c.fillStyle = ice;
    c.beginPath(); c.moveTo(24,8); c.lineTo(18,-2); c.lineTo(26,6); c.fill();
    c.beginPath(); c.moveTo(40,8); c.lineTo(46,-2); c.lineTo(38,6); c.fill();
    // Glowing blue eyes
    c.shadowColor = '#88ddff'; c.shadowBlur = 12;
    c.fillStyle = '#ccf0ff';
    c.beginPath(); c.arc(28,12,3,0,Math.PI*2); c.fill();
    c.beginPath(); c.arc(36,12,3,0,Math.PI*2); c.fill();
    c.shadowBlur = 0;
    c.fillStyle = dark; c.beginPath(); c.arc(28,12,1.5,0,Math.PI*2); c.fill();
    c.beginPath(); c.arc(36,12,1.5,0,Math.PI*2); c.fill();
    // Arms
    c.fillStyle = body; c.fillRect(4,30,12,22); c.fillRect(48,30,12,22);
    // Ice-shard claws
    c.fillStyle = ice;
    for (const [x,a] of [[4,-0.3],[48,0.3]]) {
        c.save(); c.translate(x+6,52); c.rotate(a);
        c.beginPath(); c.moveTo(-3,0); c.lineTo(0,-10); c.lineTo(3,0); c.closePath(); c.fill();
        c.restore();
    }
    // Legs
    c.fillStyle = dark; c.fillRect(18,56,10,8); c.fillRect(36,56,10,8);
    // Frost mist at feet
    c.fillStyle = 'rgba(180,230,255,0.3)';
    c.beginPath(); c.ellipse(32,62,22,5,0,0,Math.PI*2); c.fill();
}

function drawAcidDemon(c, r) {
    const body  = `rgb(${r.int(40,80)},${r.int(140,190)},${r.int(30,70)})`;
    const acid  = `rgb(${r.int(160,220)},${r.int(220,255)},${r.int(20,60)})`;
    const dark  = `rgb(${r.int(20,40)},${r.int(60,90)},${r.int(10,30)})`;
    // Slimy body
    c.fillStyle = body;
    c.beginPath(); c.ellipse(32,40,18,22,0,0,Math.PI*2); c.fill();
    // Dripping acid blobs
    c.fillStyle = 'rgba(150,255,50,0.55)';
    for (const [x,y,rx,ry] of [[20,58,4,6],[32,60,3,5],[44,58,4,6],[14,46,3,4],[50,46,3,4]]) {
        c.beginPath(); c.ellipse(x,y,rx,ry,0,0,Math.PI*2); c.fill();
    }
    // Head with warty texture
    c.fillStyle = body;
    c.beginPath(); c.ellipse(32,14,11,12,0,0,Math.PI*2); c.fill();
    // Warts
    c.fillStyle = dark;
    for (const [x,y] of [[27,10],[37,10],[32,18],[25,16],[39,16]]) {
        c.beginPath(); c.arc(x,y,1.5,0,Math.PI*2); c.fill();
    }
    // Glowing acid eyes
    c.shadowColor = '#aaff00'; c.shadowBlur = 10;
    c.fillStyle = acid;
    c.beginPath(); c.arc(27,12,3,0,Math.PI*2); c.fill();
    c.beginPath(); c.arc(37,12,3,0,Math.PI*2); c.fill();
    c.shadowBlur = 0;
    c.fillStyle = '#111'; c.beginPath(); c.arc(27,12,1.5,0,Math.PI*2); c.fill();
    c.beginPath(); c.arc(37,12,1.5,0,Math.PI*2); c.fill();
    // Curved horns
    c.fillStyle = dark;
    c.beginPath(); c.moveTo(24,6); c.quadraticCurveTo(14,0,18,8); c.quadraticCurveTo(20,12,24,10); c.fill();
    c.beginPath(); c.moveTo(40,6); c.quadraticCurveTo(50,0,46,8); c.quadraticCurveTo(44,12,40,10); c.fill();
    // Arms dripping acid
    c.fillStyle = body; c.fillRect(6,32,10,20); c.fillRect(48,32,10,20);
    c.fillStyle = 'rgba(150,255,50,0.6)';
    c.beginPath(); c.ellipse(11,52,4,3,0,0,Math.PI*2); c.fill();
    c.beginPath(); c.ellipse(53,52,4,3,0,0,Math.PI*2); c.fill();
}

function drawBloatDemon(c, r) {
    const body  = `rgb(${r.int(100,140)},${r.int(50,80)},${r.int(120,160)})`;
    const pus   = `rgb(${r.int(180,220)},${r.int(200,240)},${r.int(50,90)})`;
    const dark  = `rgb(${r.int(50,70)},${r.int(20,35)},${r.int(60,80)})`;
    // Enormous bloated belly
    c.fillStyle = body;
    c.beginPath(); c.ellipse(32,44,26,22,0,0,Math.PI*2); c.fill();
    // Pustules / boils
    c.fillStyle = pus;
    for (const [x,y,rad] of [[22,40,5],[42,40,6],[32,32,4],[18,52,4],[46,52,4],[32,54,5]]) {
        c.beginPath(); c.arc(x,y,rad,0,Math.PI*2); c.fill();
        c.fillStyle = 'rgba(220,255,80,0.7)';
        c.beginPath(); c.arc(x-1,y-1,rad*0.4,0,Math.PI*2); c.fill();
        c.fillStyle = pus;
    }
    // Small head perched atop
    c.fillStyle = body;
    c.beginPath(); c.ellipse(32,16,9,10,0,0,Math.PI*2); c.fill();
    // Tiny piggy eyes
    c.shadowColor = '#cc00cc'; c.shadowBlur = 8;
    c.fillStyle = '#ff44ff';
    c.beginPath(); c.arc(28,14,2.5,0,Math.PI*2); c.fill();
    c.beginPath(); c.arc(36,14,2.5,0,Math.PI*2); c.fill();
    c.shadowBlur = 0;
    c.fillStyle = '#111'; c.beginPath(); c.arc(28,14,1,0,Math.PI*2); c.fill();
    c.beginPath(); c.arc(36,14,1,0,Math.PI*2); c.fill();
    // Wide mouth dripping toxin
    c.strokeStyle = dark; c.lineWidth = 2;
    c.beginPath(); c.arc(32,20,6,0.1,Math.PI-0.1); c.stroke();
    c.fillStyle = 'rgba(180,255,50,0.6)';
    c.beginPath(); c.ellipse(32,22,3,2,0,0,Math.PI*2); c.fill();
    // Stubby arms
    c.fillStyle = body;
    c.beginPath(); c.ellipse(10,40,7,5,-0.4,0,Math.PI*2); c.fill();
    c.beginPath(); c.ellipse(54,40,7,5,0.4,0,Math.PI*2); c.fill();
    // Toxic mist at feet
    c.fillStyle = 'rgba(140,255,60,0.25)';
    c.beginPath(); c.ellipse(32,64,28,6,0,0,Math.PI*2); c.fill();
}

function drawDracolich(c, r) {
    const bone  = `rgb(${r.int(200,230)},${r.int(195,225)},${r.int(170,200)})`;
    const dark  = `rgb(${r.int(20,40)},${r.int(20,40)},${r.int(25,45)})`;
    const glow  = '#8844ff';
    // Skeletal dragon body
    c.fillStyle = dark;
    c.beginPath(); c.ellipse(32,42,22,18,0,0,Math.PI*2); c.fill();
    // Ribcage lines
    c.strokeStyle = bone; c.lineWidth = 1.5;
    for (let i=0; i<5; i++) {
        const y = 30 + i * 6;
        c.beginPath(); c.moveTo(16,y); c.quadraticCurveTo(32,y-4,48,y); c.stroke();
    }
    // Undead skull head
    c.fillStyle = bone;
    c.beginPath(); c.ellipse(32,14,13,13,0,0,Math.PI*2); c.fill();
    c.fillStyle = dark;
    c.beginPath(); c.ellipse(32,20,7,5,0,0,Math.PI*2); c.fill();
    // Glowing purple eye sockets
    c.shadowColor = glow; c.shadowBlur = 14;
    c.fillStyle = '#aa66ff';
    c.beginPath(); c.arc(26,12,3.5,0,Math.PI*2); c.fill();
    c.beginPath(); c.arc(38,12,3.5,0,Math.PI*2); c.fill();
    c.shadowBlur = 0;
    // Bone horns
    c.fillStyle = bone;
    c.beginPath(); c.moveTo(24,6); c.lineTo(16,-4); c.lineTo(22,4); c.fill();
    c.beginPath(); c.moveTo(40,6); c.lineTo(48,-4); c.lineTo(42,4); c.fill();
    // Tattered wings
    c.fillStyle = 'rgba(30,10,50,0.7)';
    c.beginPath(); c.moveTo(16,30); c.lineTo(0,14); c.lineTo(6,34); c.lineTo(14,36); c.closePath(); c.fill();
    c.beginPath(); c.moveTo(48,30); c.lineTo(64,14); c.lineTo(58,34); c.lineTo(50,36); c.closePath(); c.fill();
    // Wing bone struts
    c.strokeStyle = bone; c.lineWidth = 1;
    c.beginPath(); c.moveTo(16,30); c.lineTo(4,18); c.stroke();
    c.beginPath(); c.moveTo(48,30); c.lineTo(60,18); c.stroke();
    // Arms / claws
    c.fillStyle = bone;
    c.fillRect(6,36,10,18);
    c.fillRect(48,36,10,18);
    // Claw tips
    c.beginPath(); c.moveTo(6,54); c.lineTo(2,62); c.lineTo(10,56); c.fill();
    c.beginPath(); c.moveTo(58,54); c.lineTo(62,62); c.lineTo(54,56); c.fill();
    // Necrotic glow aura
    c.shadowColor = glow; c.shadowBlur = 20;
    c.strokeStyle = 'rgba(140,60,255,0.3)'; c.lineWidth = 2;
    c.beginPath(); c.ellipse(32,40,26,22,0,0,Math.PI*2); c.stroke();
    c.shadowBlur = 0;
}

function drawEvilNecromancer(c, r) {
    const robe  = `rgb(${r.int(20,40)},${r.int(10,25)},${r.int(30,50)})`;
    const accent= `rgb(${r.int(120,160)},${r.int(20,50)},${r.int(120,160)})`;
    const skin  = `rgb(${r.int(170,200)},${r.int(165,195)},${r.int(150,180)})`;
    // Long dark robes
    c.fillStyle = robe;
    c.beginPath(); c.moveTo(14,28); c.lineTo(10,64); c.lineTo(54,64); c.lineTo(50,28); c.closePath(); c.fill();
    // Robe trim / sigils
    c.strokeStyle = accent; c.lineWidth = 1;
    c.beginPath(); c.moveTo(14,28); c.lineTo(10,64); c.stroke();
    c.beginPath(); c.moveTo(50,28); c.lineTo(54,64); c.stroke();
    c.beginPath(); c.moveTo(12,48); c.lineTo(52,48); c.stroke();
    // Skull clasp
    c.fillStyle = skin;
    c.beginPath(); c.arc(32,30,4,0,Math.PI*2); c.fill();
    c.fillStyle = robe;
    c.beginPath(); c.arc(30,29,1,0,Math.PI*2); c.fill();
    c.beginPath(); c.arc(34,29,1,0,Math.PI*2); c.fill();
    c.beginPath(); c.arc(32,32,1.5,0,Math.PI); c.fill();
    // Gaunt head
    c.fillStyle = skin;
    c.beginPath(); c.ellipse(32,14,9,11,0,0,Math.PI*2); c.fill();
    // Sunken glowing eyes
    c.shadowColor = '#cc00cc'; c.shadowBlur = 10;
    c.fillStyle = '#ff44ff';
    c.beginPath(); c.arc(28,12,2.5,0,Math.PI*2); c.fill();
    c.beginPath(); c.arc(36,12,2.5,0,Math.PI*2); c.fill();
    c.shadowBlur = 0;
    // Pointed hat
    c.fillStyle = robe;
    c.beginPath(); c.moveTo(32,-2); c.lineTo(20,14); c.lineTo(44,14); c.closePath(); c.fill();
    c.strokeStyle = accent; c.lineWidth = 1;
    c.beginPath(); c.moveTo(18,14); c.lineTo(46,14); c.stroke();
    // Staff with skull
    c.fillStyle = '#553300'; c.fillRect(50,10,3,54);
    c.fillStyle = skin;
    c.beginPath(); c.ellipse(51,8,5,5,0,0,Math.PI*2); c.fill();
    c.fillStyle = robe;
    c.beginPath(); c.arc(49,7,1,0,Math.PI*2); c.fill();
    c.beginPath(); c.arc(53,7,1,0,Math.PI*2); c.fill();
    c.beginPath(); c.arc(51,10,1.5,0,Math.PI); c.fill();
    c.shadowColor = '#cc00cc'; c.shadowBlur = 8;
    c.fillStyle = accent;
    c.beginPath(); c.arc(51,8,2,0,Math.PI*2); c.fill();
    c.shadowBlur = 0;
    // Arms in sleeves
    c.fillStyle = robe; c.fillRect(4,28,12,20); c.fillRect(48,28,12,20);
}

function drawHellHound(c, r) {
    const fur   = `rgb(${r.int(30,55)},${r.int(10,25)},${r.int(10,20)})`;
    const ember = `rgb(${r.int(220,255)},${r.int(80,120)},${r.int(10,30)})`;
    const glow  = '#ff4400';
    // Low, muscular body
    c.fillStyle = fur;
    c.beginPath(); c.ellipse(32,44,24,16,0,0,Math.PI*2); c.fill();
    // Fiery markings on body
    c.fillStyle = 'rgba(255,100,0,0.5)';
    for (const [x,y] of [[22,42],[32,38],[42,42],[28,50],[36,50]]) {
        c.beginPath(); c.arc(x,y,3,0,Math.PI*2); c.fill();
    }
    // Head
    c.fillStyle = fur;
    c.beginPath(); c.ellipse(48,26,13,11,0.3,0,Math.PI*2); c.fill();
    // Snout/muzzle
    c.beginPath(); c.ellipse(58,30,7,5,0.2,0,Math.PI*2); c.fill();
    // Glowing fire eyes
    c.shadowColor = glow; c.shadowBlur = 12;
    c.fillStyle = ember;
    c.beginPath(); c.arc(46,22,3,0,Math.PI*2); c.fill();
    c.beginPath(); c.arc(52,22,3,0,Math.PI*2); c.fill();
    c.shadowBlur = 0;
    c.fillStyle = '#111'; c.beginPath(); c.arc(46,22,1.5,0,Math.PI*2); c.fill();
    c.beginPath(); c.arc(52,22,1.5,0,Math.PI*2); c.fill();
    // Sharp teeth
    c.fillStyle = '#e8e0d0';
    for (const [x,y] of [[56,32],[58,34],[60,32],[62,30]]) {
        c.beginPath(); c.moveTo(x,y); c.lineTo(x+1,y+5); c.lineTo(x+2,y); c.fill();
    }
    // Ear / horn nubs
    c.fillStyle = fur;
    c.beginPath(); c.moveTo(44,16); c.lineTo(40,8); c.lineTo(48,14); c.fill();
    // Tail with fire tip
    c.strokeStyle = fur; c.lineWidth = 5;
    c.beginPath(); c.moveTo(8,40); c.quadraticCurveTo(4,28,10,22); c.stroke();
    c.shadowColor = glow; c.shadowBlur = 8;
    c.fillStyle = ember;
    c.beginPath(); c.arc(10,20,4,0,Math.PI*2); c.fill();
    c.shadowBlur = 0;
    // Four legs
    c.fillStyle = fur;
    c.fillRect(16,56,8,8); c.fillRect(26,58,8,6);
    c.fillRect(38,58,8,6); c.fillRect(48,56,8,8);
    // Ground fire glow
    c.fillStyle = 'rgba(255,80,0,0.2)';
    c.beginPath(); c.ellipse(32,64,24,5,0,0,Math.PI*2); c.fill();
}

function drawEvilBerserker(c, r) {
    const skin  = `rgb(${r.int(160,200)},${r.int(100,140)},${r.int(70,100)})`;
    const scar  = `rgb(${r.int(180,210)},${r.int(80,110)},${r.int(60,80)})`;
    const gear  = `rgb(${r.int(40,70)},${r.int(30,50)},${r.int(20,35)})`;
    const blood = '#8b0000';
    // Massive torso (bare chested)
    c.fillStyle = skin;
    c.fillRect(14,28,36,28);
    // Scar marks on chest
    c.strokeStyle = scar; c.lineWidth = 1.5;
    c.beginPath(); c.moveTo(24,32); c.lineTo(32,44); c.stroke();
    c.beginPath(); c.moveTo(40,30); c.lineTo(34,42); c.stroke();
    // Tattered shoulder pads
    c.fillStyle = gear;
    c.beginPath(); c.ellipse(14,32,9,7,0,0,Math.PI*2); c.fill();
    c.beginPath(); c.ellipse(50,32,9,7,0,0,Math.PI*2); c.fill();
    // Wild head
    c.fillStyle = skin;
    c.beginPath(); c.ellipse(32,14,11,12,0,0,Math.PI*2); c.fill();
    // Wild hair
    c.fillStyle = `rgb(${r.int(30,70)},${r.int(20,40)},${r.int(10,20)})`;
    c.beginPath(); c.moveTo(22,10); c.quadraticCurveTo(20,2,26,6); c.quadraticCurveTo(30,0,32,4); c.quadraticCurveTo(34,0,38,6); c.quadraticCurveTo(42,2,42,10); c.lineTo(40,14); c.lineTo(24,14); c.closePath(); c.fill();
    // War-paint slash marks
    c.fillStyle = blood;
    c.beginPath(); c.moveTo(24,10); c.lineTo(28,16); c.lineTo(26,16); c.lineTo(22,10); c.closePath(); c.fill();
    c.beginPath(); c.moveTo(36,10); c.lineTo(40,16); c.lineTo(38,16); c.lineTo(34,10); c.closePath(); c.fill();
    // Frenzied eyes
    c.fillStyle = '#ffcc00';
    c.beginPath(); c.arc(28,14,3,0,Math.PI*2); c.fill();
    c.beginPath(); c.arc(36,14,3,0,Math.PI*2); c.fill();
    c.fillStyle = '#111'; c.beginPath(); c.arc(28,14,1.5,0,Math.PI*2); c.fill();
    c.beginPath(); c.arc(36,14,1.5,0,Math.PI*2); c.fill();
    // Huge arms
    c.fillStyle = skin; c.fillRect(2,28,12,24); c.fillRect(50,28,12,24);
    // Blood-soaked axes
    c.fillStyle = gear;
    c.fillRect(0,20,5,30);
    c.fillStyle = '#888';
    c.beginPath(); c.moveTo(0,20); c.lineTo(-8,12); c.lineTo(-8,28); c.closePath(); c.fill();
    c.fillStyle = blood;
    c.beginPath(); c.ellipse(-4,20,3,6,0,0,Math.PI*2); c.fill();
    c.fillStyle = gear;
    c.fillRect(59,20,5,30);
    c.fillStyle = '#888';
    c.beginPath(); c.moveTo(64,20); c.lineTo(72,12); c.lineTo(72,28); c.closePath(); c.fill();
    c.fillStyle = blood;
    c.beginPath(); c.ellipse(68,20,3,6,0,0,Math.PI*2); c.fill();
    // Legs in tattered wrappings
    c.fillStyle = gear; c.fillRect(16,56,12,8); c.fillRect(36,56,12,8);
    c.fillStyle = skin; c.fillRect(18,54,8,4); c.fillRect(38,54,8,4);
}

// ── New Undead Monsters ─────────────────────────────────────────────────────

function drawMummy(c, r) {
    const wrap  = `rgb(${r.int(190,220)},${r.int(175,205)},${r.int(140,170)})`;
    const dark  = `rgb(${r.int(110,140)},${r.int(95,125)},${r.int(70,100)})`;
    const glow  = `rgb(${r.int(200,240)},${r.int(150,190)},${r.int(0,40)})`;
    // Body — wrapped torso
    c.fillStyle = wrap;
    c.fillRect(18,28,28,28);
    // Bandage stripes
    c.fillStyle = dark;
    for (let i=0;i<4;i++) { c.fillRect(18,30+i*7,28,3); }
    // Head
    c.fillStyle = wrap;
    c.beginPath(); c.ellipse(32,16,13,13,0,0,Math.PI*2); c.fill();
    // Head bandage wrap lines
    c.fillStyle = dark;
    c.fillRect(20,10,24,3); c.fillRect(20,16,24,3); c.fillRect(20,22,24,3);
    // Glowing eyes
    c.shadowColor = glow; c.shadowBlur = 10;
    c.fillStyle = glow;
    c.beginPath(); c.arc(26,14,3,0,Math.PI*2); c.fill();
    c.beginPath(); c.arc(38,14,3,0,Math.PI*2); c.fill();
    c.shadowBlur = 0;
    // Arms — outstretched
    c.fillStyle = wrap;
    c.fillRect(2,30,16,8); c.fillRect(46,30,16,8);
    c.fillStyle = dark;
    c.fillRect(2,32,16,3); c.fillRect(46,32,16,3);
    // Legs — wrapped
    c.fillStyle = wrap;
    c.fillRect(18,56,12,8); c.fillRect(34,56,12,8);
    c.fillStyle = dark;
    c.fillRect(18,58,12,3); c.fillRect(34,58,12,3);
}

function drawRevenant(c, r) {
    const body  = `rgba(${r.int(60,100)},${r.int(0,30)},${r.int(80,120)},0.85)`;
    const glow  = `rgb(${r.int(80,140)},${r.int(0,40)},${r.int(200,255)})`;
    const white = '#ddeeff';
    // Spectral body — fading at edges
    c.shadowColor = glow; c.shadowBlur = 18;
    c.fillStyle = body;
    c.beginPath(); c.ellipse(32,44,18,22,0,0,Math.PI*2); c.fill();
    // Head
    c.fillStyle = body;
    c.beginPath(); c.ellipse(32,16,13,13,0,0,Math.PI*2); c.fill();
    c.shadowBlur = 0;
    // Skull face
    c.fillStyle = white;
    c.beginPath(); c.ellipse(32,16,10,11,0,0,Math.PI*2); c.fill();
    // Eye sockets
    c.fillStyle = glow;
    c.shadowColor = glow; c.shadowBlur = 12;
    c.beginPath(); c.arc(27,14,3.5,0,Math.PI*2); c.fill();
    c.beginPath(); c.arc(37,14,3.5,0,Math.PI*2); c.fill();
    c.shadowBlur = 0;
    // Jaw / teeth
    c.fillStyle = '#334'; c.fillRect(26,21,12,3);
    c.fillStyle = white;
    for (let i=0;i<5;i++) { c.fillRect(27+i*2,21,1,3); }
    // Spectral arms — wispy
    c.strokeStyle = glow; c.lineWidth = 3;
    c.shadowColor = glow; c.shadowBlur = 8;
    c.beginPath(); c.moveTo(18,30); c.quadraticCurveTo(4,36,2,44); c.stroke();
    c.beginPath(); c.moveTo(46,30); c.quadraticCurveTo(60,36,62,44); c.stroke();
    c.shadowBlur = 0;
    // Trailing spectral wisps at base
    c.fillStyle = 'rgba(80,0,200,0.3)';
    c.beginPath(); c.ellipse(32,60,14,8,0,0,Math.PI*2); c.fill();
}

function drawBoneArcher(c, r) {
    const bone   = `rgb(${r.int(210,235)},${r.int(200,225)},${r.int(175,200)})`;
    const shadow = `rgb(${r.int(130,160)},${r.int(120,150)},${r.int(100,130)})`;
    const eye    = `rgb(${r.int(180,220)},${r.int(50,100)},${r.int(0,30)})`;
    // Skeleton torso
    c.fillStyle = bone;
    c.fillRect(22,26,20,24);
    // Rib cage lines
    c.strokeStyle = shadow; c.lineWidth = 1.5;
    for (let i=0;i<4;i++) {
        c.beginPath(); c.moveTo(22,29+i*5); c.lineTo(42,29+i*5); c.stroke();
    }
    // Skull
    c.fillStyle = bone;
    c.beginPath(); c.ellipse(32,14,11,12,0,0,Math.PI*2); c.fill();
    c.fillStyle = shadow; c.fillRect(23,20,18,4);
    // Glowing eyes
    c.shadowColor = eye; c.shadowBlur = 8;
    c.fillStyle = eye;
    c.beginPath(); c.arc(27,12,3,0,Math.PI*2); c.fill();
    c.beginPath(); c.arc(37,12,3,0,Math.PI*2); c.fill();
    c.shadowBlur = 0;
    // Bone arms
    c.fillStyle = bone;
    c.fillRect(10,26,12,5); c.fillRect(42,26,12,5);
    // Bow (right arm)
    c.strokeStyle = shadow; c.lineWidth = 2.5;
    c.beginPath(); c.arc(56,32,14,Math.PI*1.3,Math.PI*0.7,true); c.stroke();
    c.strokeStyle = bone; c.lineWidth = 1;
    c.beginPath(); c.moveTo(56,18); c.lineTo(56,46); c.stroke();
    // Arrow nocked
    c.strokeStyle = '#cc8800'; c.lineWidth = 1.5;
    c.beginPath(); c.moveTo(12,32); c.lineTo(56,32); c.stroke();
    c.fillStyle = '#445544';
    c.beginPath(); c.moveTo(56,30); c.lineTo(60,32); c.lineTo(56,34); c.closePath(); c.fill();
    // Legs
    c.fillStyle = bone;
    c.fillRect(22,50,8,14); c.fillRect(34,50,8,14);
    c.fillStyle = shadow; c.fillRect(22,55,8,3); c.fillRect(34,55,8,3);
}

function drawPoltergeist(c, r) {
    const mist  = `rgba(${r.int(170,210)},${r.int(170,210)},${r.int(210,255)},0.65)`;
    const glow  = `rgb(${r.int(100,160)},${r.int(100,160)},${r.int(230,255)})`;
    const debri = `rgb(${r.int(90,130)},${r.int(80,120)},${r.int(70,110)})`;
    // Wispy translucent form
    c.shadowColor = glow; c.shadowBlur = 20;
    c.fillStyle = mist;
    c.beginPath(); c.ellipse(32,32,16,22,0,0,Math.PI*2); c.fill();
    // Ghost head
    c.beginPath(); c.ellipse(32,14,12,12,0,0,Math.PI*2); c.fill();
    c.shadowBlur = 0;
    // Eyes — glowing blue
    c.shadowColor = glow; c.shadowBlur = 10;
    c.fillStyle = glow;
    c.beginPath(); c.arc(27,12,3.5,0,Math.PI*2); c.fill();
    c.beginPath(); c.arc(37,12,3.5,0,Math.PI*2); c.fill();
    c.shadowBlur = 0;
    // Screaming mouth
    c.fillStyle = 'rgba(30,30,60,0.7)';
    c.beginPath(); c.ellipse(32,19,5,3,0,0,Math.PI*2); c.fill();
    // Floating debris pieces
    c.fillStyle = debri;
    c.fillRect(4,20,8,5); c.fillRect(54,28,7,6); c.fillRect(8,46,6,7); c.fillRect(50,14,9,4);
    // Wispy tail
    c.fillStyle = 'rgba(180,180,255,0.35)';
    c.beginPath(); c.ellipse(32,56,10,8,0,0,Math.PI*2); c.fill();
}

function drawZombieGiant(c, r) {
    const flesh  = `rgb(${r.int(80,120)},${r.int(100,130)},${r.int(60,90)})`;
    const rot    = `rgb(${r.int(50,80)},${r.int(70,100)},${r.int(30,60)})`;
    const bone   = `rgb(${r.int(200,225)},${r.int(190,215)},${r.int(160,190)})`;
    // Massive body
    c.fillStyle = flesh;
    c.beginPath(); c.ellipse(32,44,26,20,0,0,Math.PI*2); c.fill();
    // Chest wounds/rot patches
    c.fillStyle = rot;
    c.beginPath(); c.ellipse(24,40,6,8,0,0,Math.PI*2); c.fill();
    c.beginPath(); c.ellipse(40,36,5,7,0,0,Math.PI*2); c.fill();
    // Exposed ribs
    c.strokeStyle = bone; c.lineWidth = 2;
    for (let i=0;i<3;i++) {
        c.beginPath(); c.arc(30,38+i*4,7,Math.PI*0.2,Math.PI*0.8); c.stroke();
    }
    // Giant head
    c.fillStyle = flesh;
    c.beginPath(); c.ellipse(32,14,16,14,0,0,Math.PI*2); c.fill();
    c.fillStyle = rot;
    c.beginPath(); c.ellipse(28,10,5,5,0,0,Math.PI*2); c.fill();
    // Sunken eyes — red
    c.fillStyle = '#aa1100';
    c.beginPath(); c.arc(26,12,4,0,Math.PI*2); c.fill();
    c.beginPath(); c.arc(38,12,4,0,Math.PI*2); c.fill();
    // Hanging jaw
    c.fillStyle = flesh; c.fillRect(22,22,20,4);
    c.fillStyle = bone;
    for (let i=0;i<5;i++) { c.fillRect(23+i*3,22,2,5); }
    // Massive arms
    c.fillStyle = flesh;
    c.fillRect(0,28,18,12); c.fillRect(46,28,18,12);
    c.fillStyle = rot;
    c.fillRect(0,31,18,5); c.fillRect(46,31,18,5);
    // Thick legs
    c.fillStyle = flesh;
    c.fillRect(14,58,14,6); c.fillRect(36,58,14,6);
}

function drawDeathKnight(c, r) {
    const armor  = `rgb(${r.int(20,50)},${r.int(20,50)},${r.int(30,60)})`;
    const trim   = `rgb(${r.int(60,100)},${r.int(0,30)},${r.int(0,30)})`;
    const glow   = `rgb(${r.int(180,230)},${r.int(0,40)},${r.int(0,40)})`;
    const bone   = `rgb(${r.int(200,230)},${r.int(190,220)},${r.int(160,190)})`;
    // Armored body
    c.fillStyle = armor;
    c.fillRect(16,26,32,28);
    // Pauldrons
    c.fillStyle = trim;
    c.beginPath(); c.ellipse(10,30,10,7,0,0,Math.PI*2); c.fill();
    c.beginPath(); c.ellipse(54,30,10,7,0,0,Math.PI*2); c.fill();
    // Armor trim / runes
    c.strokeStyle = glow; c.lineWidth = 1.5;
    c.shadowColor = glow; c.shadowBlur = 6;
    c.strokeRect(18,28,28,24);
    c.beginPath(); c.moveTo(32,28); c.lineTo(32,52); c.stroke();
    c.shadowBlur = 0;
    // Skull helm
    c.fillStyle = armor;
    c.beginPath(); c.ellipse(32,13,14,13,0,0,Math.PI*2); c.fill();
    c.fillStyle = bone;
    c.beginPath(); c.ellipse(32,13,10,10,0,0,Math.PI*2); c.fill();
    // Visor slit — glowing red eyes
    c.fillStyle = '#111'; c.fillRect(22,16,20,4);
    c.shadowColor = glow; c.shadowBlur = 12;
    c.fillStyle = glow;
    c.fillRect(24,17,6,2); c.fillRect(34,17,6,2);
    c.shadowBlur = 0;
    // Sword arm
    c.fillStyle = armor;
    c.fillRect(46,26,8,28);
    c.fillStyle = '#aabbcc';
    c.fillRect(50,10,4,20);
    c.fillRect(44,12,16,4);
    // Shield arm
    c.fillStyle = trim;
    c.fillRect(4,26,12,20);
    c.fillStyle = armor;
    c.beginPath(); c.ellipse(10,36,5,9,0,0,Math.PI*2); c.fill();
    c.shadowColor = glow; c.shadowBlur = 4;
    c.fillStyle = glow;
    c.beginPath(); c.arc(10,36,2,0,Math.PI*2); c.fill();
    c.shadowBlur = 0;
    // Legs — armored greaves
    c.fillStyle = armor;
    c.fillRect(16,54,12,10); c.fillRect(36,54,12,10);
    c.fillStyle = trim;
    c.fillRect(16,56,12,4); c.fillRect(36,56,12,4);
}

// ── Bestiary Expansion ────────────────────────────────────────────────────────

function drawSuccubus(c, r) {
    const skin  = `rgb(${r.int(160,200)},${r.int(60,100)},${r.int(160,210)})`;
    const dark  = `rgb(${r.int(40,70)},${r.int(0,20)},${r.int(40,70)})`;
    const wing  = `rgba(${r.int(30,60)},${r.int(0,15)},${r.int(50,80)},0.85)`;
    const glow  = `rgb(${r.int(200,255)},${r.int(20,60)},${r.int(20,60)})`;
    // Wings
    c.fillStyle = wing;
    c.beginPath(); c.moveTo(32,28); c.quadraticCurveTo(6,10,2,40);
    c.lineTo(18,34); c.closePath(); c.fill();
    c.beginPath(); c.moveTo(32,28); c.quadraticCurveTo(58,10,62,40);
    c.lineTo(46,34); c.closePath(); c.fill();
    // Body — elegant dress/form
    c.fillStyle = dark;
    c.beginPath(); c.ellipse(32,42,12,16,0,0,Math.PI*2); c.fill();
    // Torso skin
    c.fillStyle = skin;
    c.fillRect(23,26,18,20);
    // Arms
    c.fillRect(14,26,10,14); c.fillRect(40,26,10,14);
    // Head
    c.beginPath(); c.ellipse(32,16,11,13,0,0,Math.PI*2); c.fill();
    // Hair
    c.fillStyle = dark;
    c.beginPath(); c.ellipse(32,10,11,7,0,0,Math.PI); c.fill();
    c.fillRect(20,10,5,14); c.fillRect(39,10,5,14);
    // Horns
    c.fillStyle = '#1a0020';
    c.beginPath(); c.moveTo(24,8); c.lineTo(20,0); c.lineTo(27,8); c.fill();
    c.beginPath(); c.moveTo(40,8); c.lineTo(44,0); c.lineTo(37,8); c.fill();
    // Glowing eyes
    c.shadowColor = glow; c.shadowBlur = 8;
    c.fillStyle = glow;
    c.beginPath(); c.ellipse(28,16,3,2,0,0,Math.PI*2); c.fill();
    c.beginPath(); c.ellipse(36,16,3,2,0,0,Math.PI*2); c.fill();
    c.shadowBlur = 0;
    // Tail hint
    c.strokeStyle = dark; c.lineWidth = 3;
    c.beginPath(); c.moveTo(32,56); c.quadraticCurveTo(44,60,48,56); c.stroke();
}

function drawChainDevil(c, r) {
    const iron  = `rgb(${r.int(50,80)},${r.int(50,80)},${r.int(60,90)})`;
    const dark  = `rgb(${r.int(20,40)},${r.int(20,40)},${r.int(25,50)})`;
    const rust  = `rgb(${r.int(90,130)},${r.int(60,90)},${r.int(30,60)})`;
    // Body
    c.fillStyle = dark;
    c.fillRect(18,24,28,32);
    // Chains coiled around body
    c.strokeStyle = iron; c.lineWidth = 3;
    for (let i=0; i<5; i++) {
        c.beginPath();
        c.ellipse(32, 28+i*6, 12+i%2*3, 4, 0, 0, Math.PI*2);
        c.stroke();
    }
    // Chain links detail
    c.strokeStyle = rust; c.lineWidth = 1.5;
    for (let i=0; i<4; i++) {
        c.beginPath();
        c.ellipse(32, 30+i*6, 10, 3, 0, 0, Math.PI*2);
        c.stroke();
    }
    // Head
    c.fillStyle = iron;
    c.beginPath(); c.ellipse(32,14,11,12,0,0,Math.PI*2); c.fill();
    c.fillStyle = dark;
    c.fillRect(22,16,20,6);
    // Eye slits
    c.fillStyle = rust;
    c.fillRect(24,17,6,3); c.fillRect(34,17,6,3);
    // Arms with chains
    c.fillStyle = dark;
    c.fillRect(6,24,14,10); c.fillRect(44,24,14,10);
    c.strokeStyle = iron; c.lineWidth = 3;
    c.beginPath(); c.moveTo(6,30); c.lineTo(0,44); c.stroke();
    c.beginPath(); c.moveTo(58,30); c.lineTo(64,44); c.stroke();
    // Legs
    c.fillStyle = dark;
    c.fillRect(18,56,10,8); c.fillRect(36,56,10,8);
}

function drawBloodDemon(c, r) {
    const skin  = `rgb(${r.int(140,180)},${r.int(0,30)},${r.int(0,30)})`;
    const dark  = `rgb(${r.int(60,90)},${r.int(0,15)},${r.int(0,15)})`;
    const blood = `rgb(${r.int(180,220)},${r.int(0,20)},${r.int(0,20)})`;
    const glow  = `rgb(${r.int(220,255)},${r.int(50,100)},${r.int(0,30)})`;
    // Muscular body
    c.fillStyle = skin;
    c.fillRect(16,24,32,32);
    // Muscle definition
    c.fillStyle = dark;
    c.fillRect(28,26,8,28); // center line
    c.beginPath(); c.arc(24,34,6,0,Math.PI*2); c.fill();
    c.beginPath(); c.arc(40,34,6,0,Math.PI*2); c.fill();
    // Arms — massive
    c.fillStyle = skin;
    c.fillRect(4,24,14,20); c.fillRect(46,24,14,20);
    // Claws
    c.fillStyle = dark;
    for (let i=0;i<4;i++) {
        c.beginPath(); c.moveTo(4+i*3,44); c.lineTo(2+i*3,54); c.lineTo(5+i*3,44); c.fill();
        c.beginPath(); c.moveTo(48+i*3,44); c.lineTo(46+i*3,54); c.lineTo(49+i*3,44); c.fill();
    }
    // Blood drips
    c.fillStyle = blood;
    for (let i=0;i<3;i++) {
        c.beginPath(); c.ellipse(6+i*4,50,2,5,0,0,Math.PI*2); c.fill();
        c.beginPath(); c.ellipse(50+i*4,50,2,5,0,0,Math.PI*2); c.fill();
    }
    // Head with horns
    c.fillStyle = skin;
    c.beginPath(); c.ellipse(32,14,13,12,0,0,Math.PI*2); c.fill();
    c.fillStyle = dark;
    c.beginPath(); c.moveTo(22,8); c.lineTo(16,0); c.lineTo(26,8); c.fill();
    c.beginPath(); c.moveTo(42,8); c.lineTo(48,0); c.lineTo(38,8); c.fill();
    // Glowing eyes
    c.shadowColor = glow; c.shadowBlur = 10;
    c.fillStyle = glow;
    c.beginPath(); c.arc(27,14,3,0,Math.PI*2); c.fill();
    c.beginPath(); c.arc(37,14,3,0,Math.PI*2); c.fill();
    c.shadowBlur = 0;
    // Legs
    c.fillStyle = skin;
    c.fillRect(18,56,10,8); c.fillRect(36,56,10,8);
}

function drawVarkhulChainTyrant(c, r) {
    const dark = `rgb(${r.int(30,55)},${r.int(30,55)},${r.int(45,70)})`;
    const iron = `rgb(${r.int(90,130)},${r.int(90,130)},${r.int(110,150)})`;
    c.fillStyle = dark; c.fillRect(16,20,32,40);
    c.fillStyle = iron; c.beginPath(); c.ellipse(32,14,12,10,0,0,Math.PI*2); c.fill();
    c.strokeStyle = iron; c.lineWidth = 3;
    for (let i=0;i<4;i++) { c.beginPath(); c.moveTo(4+i*18,30); c.lineTo(12+i*12,58); c.stroke(); }
    c.fillStyle = '#5a2100'; c.fillRect(24,14,16,3);
}

function drawAzramorEmberCrown(c, r) {
    const body = `rgb(${r.int(130,170)},${r.int(20,45)},${r.int(20,40)})`;
    const fire = `rgb(${r.int(220,255)},${r.int(80,150)},${r.int(10,40)})`;
    c.fillStyle = body; c.beginPath(); c.ellipse(32,38,16,22,0,0,Math.PI*2); c.fill();
    c.fillStyle = fire;
    c.beginPath(); c.moveTo(20,10); c.lineTo(24,0); c.lineTo(28,10); c.fill();
    c.beginPath(); c.moveTo(32,8); c.lineTo(36,0); c.lineTo(40,8); c.fill();
    c.beginPath(); c.moveTo(42,10); c.lineTo(46,0); c.lineTo(50,10); c.fill();
    c.fillRect(18,24,28,6);
}

function drawThyraxisGlassQueen(c, r) {
    const glass = `rgb(${r.int(110,160)},${r.int(180,230)},${r.int(220,255)})`;
    const trim = `rgb(${r.int(30,60)},${r.int(90,130)},${r.int(150,200)})`;
    c.fillStyle = glass;
    c.beginPath(); c.moveTo(32,8); c.lineTo(16,56); c.lineTo(48,56); c.closePath(); c.fill();
    c.fillStyle = trim; c.fillRect(24,18,16,6); c.fillRect(22,34,20,5);
    c.strokeStyle = '#d9f7ff'; c.lineWidth = 2; c.beginPath(); c.moveTo(32,8); c.lineTo(32,56); c.stroke();
}

function drawGhorvexHungeringVoid(c, r) {
    const voidCol = `rgb(${r.int(15,35)},${r.int(5,20)},${r.int(35,65)})`;
    const maw = `rgb(${r.int(90,130)},${r.int(30,60)},${r.int(140,190)})`;
    c.fillStyle = voidCol; c.beginPath(); c.ellipse(32,36,20,24,0,0,Math.PI*2); c.fill();
    c.fillStyle = maw; c.beginPath(); c.ellipse(32,36,10,14,0,0,Math.PI*2); c.fill();
    c.fillStyle = '#f6d7ff';
    for (let i=0;i<6;i++) c.fillRect(27+i*2,28 + (i%2?8:0), 1, 5);
}

function drawNyrgothGraveTide(c, r) {
    const robe = `rgb(${r.int(60,90)},${r.int(70,100)},${r.int(50,80)})`;
    const bone = `rgb(${r.int(190,230)},${r.int(190,230)},${r.int(170,210)})`;
    c.fillStyle = robe; c.fillRect(16,22,32,38);
    c.fillStyle = bone; c.beginPath(); c.ellipse(32,14,11,10,0,0,Math.PI*2); c.fill();
    c.fillRect(22,30,4,24); c.fillRect(38,30,4,24);
    c.strokeStyle = '#9bbf93'; c.lineWidth = 2; c.beginPath(); c.arc(32,44,18,0,Math.PI); c.stroke();
}

function drawXeltharaStormBlade(c, r) {
    const armor = `rgb(${r.int(70,110)},${r.int(90,130)},${r.int(130,190)})`;
    const bolt = `rgb(${r.int(170,230)},${r.int(210,255)},${r.int(230,255)})`;
    c.fillStyle = armor; c.fillRect(20,18,24,40);
    c.fillStyle = bolt;
    c.beginPath(); c.moveTo(32,0); c.lineTo(26,18); c.lineTo(34,18); c.lineTo(28,34); c.lineTo(40,14); c.lineTo(32,14); c.closePath(); c.fill();
    c.fillRect(10,26,8,4); c.fillRect(46,26,8,4);
}

function drawMolkarethPoxScribe(c, r) {
    const cloak = `rgb(${r.int(50,80)},${r.int(80,120)},${r.int(20,50)})`;
    const bile = `rgb(${r.int(120,170)},${r.int(180,230)},${r.int(40,90)})`;
    c.fillStyle = cloak; c.fillRect(16,18,32,42);
    c.fillStyle = bile; c.beginPath(); c.ellipse(32,14,10,8,0,0,Math.PI*2); c.fill();
    c.fillRect(10,38,44,5);
    for (let i=0;i<4;i++) { c.beginPath(); c.ellipse(14+i*12,52,3,5,0,0,Math.PI*2); c.fill(); }
}

function drawVaelkorMindFlense(c, r) {
    const flesh = `rgb(${r.int(130,170)},${r.int(80,120)},${r.int(140,190)})`;
    const psi = `rgb(${r.int(170,220)},${r.int(90,150)},${r.int(210,255)})`;
    c.fillStyle = flesh; c.fillRect(18,22,28,36);
    c.fillStyle = psi; c.beginPath(); c.ellipse(32,14,13,10,0,0,Math.PI*2); c.fill();
    c.fillStyle = '#2b1138'; c.fillRect(24,12,16,4);
    c.strokeStyle = psi; c.lineWidth = 2;
    c.beginPath(); c.arc(32,14,18,0,Math.PI*2); c.stroke();
}

function drawDrozharIronMaw(c, r) {
    const iron = `rgb(${r.int(80,120)},${r.int(80,120)},${r.int(90,130)})`;
    const rust = `rgb(${r.int(120,170)},${r.int(70,100)},${r.int(40,70)})`;
    c.fillStyle = iron; c.fillRect(14,20,36,38);
    c.fillStyle = rust; c.beginPath(); c.ellipse(32,18,14,12,0,0,Math.PI*2); c.fill();
    c.fillStyle = '#f2e7cf';
    for (let i=0;i<7;i++) c.fillRect(20+i*3,18 + (i%2?4:0),2,5);
    c.fillStyle = iron; c.fillRect(8,28,8,18); c.fillRect(48,28,8,18);
}

function drawOrphielEclipsedSaint(c, r) {
    const robe = `rgb(${r.int(70,100)},${r.int(40,70)},${r.int(90,130)})`;
    const halo = `rgb(${r.int(220,245)},${r.int(160,210)},${r.int(90,140)})`;
    c.fillStyle = robe; c.fillRect(18,22,28,38);
    c.strokeStyle = halo; c.lineWidth = 3; c.beginPath(); c.arc(32,10,10,0,Math.PI*2); c.stroke();
    c.fillStyle = '#111018'; c.beginPath(); c.arc(32,10,7,0,Math.PI*2); c.fill();
    c.fillStyle = halo; c.beginPath(); c.ellipse(32,18,9,8,0,0,Math.PI*2); c.fill();
    c.fillRect(28,30,8,20);
}

function drawPitFiend(c, r) {
    const skin  = `rgb(${r.int(120,160)},${r.int(0,25)},${r.int(0,25)})`;
    const dark  = `rgb(${r.int(40,70)},${r.int(0,10)},${r.int(0,10)})`;
    const wing  = `rgba(${r.int(60,90)},${r.int(0,10)},${r.int(0,10)},0.9)`;
    const eye   = `rgb(${r.int(220,255)},${r.int(150,200)},${r.int(0,30)})`;
    // Massive wings
    c.fillStyle = wing;
    c.beginPath(); c.moveTo(32,22); c.quadraticCurveTo(4,4,0,36);
    c.lineTo(18,28); c.closePath(); c.fill();
    c.beginPath(); c.moveTo(32,22); c.quadraticCurveTo(60,4,64,36);
    c.lineTo(46,28); c.closePath(); c.fill();
    // Massive body
    c.fillStyle = skin;
    c.beginPath(); c.ellipse(32,40,20,22,0,0,Math.PI*2); c.fill();
    // Belly scales
    c.fillStyle = dark;
    for (let i=0; i<4; i++)
        for (let j=0; j<3; j++)
            c.fillRect(22+j*7, 28+i*7, 6, 5);
    // Huge arms
    c.fillStyle = skin;
    c.fillRect(2,22,16,22); c.fillRect(46,22,16,22);
    // Claws
    c.fillStyle = dark;
    for (let i=0;i<3;i++) {
        c.beginPath(); c.moveTo(2+i*4,44); c.lineTo(0+i*4,56); c.lineTo(4+i*4,44); c.fill();
        c.beginPath(); c.moveTo(48+i*4,44); c.lineTo(46+i*4,56); c.lineTo(50+i*4,44); c.fill();
    }
    // Large head with multiple eyes
    c.fillStyle = skin;
    c.beginPath(); c.ellipse(32,12,18,14,0,0,Math.PI*2); c.fill();
    // Horns
    c.fillStyle = dark;
    c.beginPath(); c.moveTo(16,6); c.lineTo(8,0); c.lineTo(20,8); c.fill();
    c.beginPath(); c.moveTo(48,6); c.lineTo(56,0); c.lineTo(44,8); c.fill();
    // Multiple eyes — row of three
    c.shadowColor = eye; c.shadowBlur = 8;
    c.fillStyle = eye;
    c.beginPath(); c.arc(24,12,3,0,Math.PI*2); c.fill();
    c.beginPath(); c.arc(32,10,3,0,Math.PI*2); c.fill();
    c.beginPath(); c.arc(40,12,3,0,Math.PI*2); c.fill();
    c.shadowBlur = 0;
    // Fanged mouth
    c.fillStyle = dark;
    c.fillRect(22,18,20,5);
    c.fillStyle = '#eeddcc';
    for (let i=0;i<5;i++) c.fillRect(23+i*3,18,2,4);
    // Legs
    c.fillStyle = skin;
    c.fillRect(14,58,14,6); c.fillRect(36,58,14,6);
}

function drawQuasit(c, r) {
    const skin  = `rgb(${r.int(60,110)},${r.int(90,130)},${r.int(50,90)})`;
    const dark  = `rgb(${r.int(20,50)},${r.int(40,70)},${r.int(20,50)})`;
    const wing  = `rgba(${r.int(30,70)},${r.int(40,80)},${r.int(30,60)},0.8)`;
    const eye   = `rgb(${r.int(180,230)},${r.int(0,30)},${r.int(0,30)})`;
    // Tiny body — centered lower
    c.fillStyle = skin;
    c.beginPath(); c.ellipse(32,46,12,14,0,0,Math.PI*2); c.fill();
    // Small bat wings
    c.fillStyle = wing;
    c.beginPath(); c.moveTo(32,38); c.quadraticCurveTo(16,26,10,38);
    c.lineTo(22,40); c.closePath(); c.fill();
    c.beginPath(); c.moveTo(32,38); c.quadraticCurveTo(48,26,54,38);
    c.lineTo(42,40); c.closePath(); c.fill();
    // Arms — stubby
    c.fillStyle = skin;
    c.fillRect(14,42,10,8); c.fillRect(40,42,10,8);
    // Claws
    c.fillStyle = dark;
    for (let i=0;i<3;i++) {
        c.beginPath(); c.moveTo(14+i*3,50); c.lineTo(13+i*3,56); c.lineTo(16+i*3,50); c.fill();
        c.beginPath(); c.moveTo(40+i*3,50); c.lineTo(39+i*3,56); c.lineTo(42+i*3,50); c.fill();
    }
    // Small head
    c.fillStyle = skin;
    c.beginPath(); c.ellipse(32,32,10,10,0,0,Math.PI*2); c.fill();
    // Tiny horns
    c.fillStyle = dark;
    c.beginPath(); c.moveTo(26,26); c.lineTo(23,20); c.lineTo(28,26); c.fill();
    c.beginPath(); c.moveTo(38,26); c.lineTo(41,20); c.lineTo(36,26); c.fill();
    // Beady red eyes
    c.shadowColor = eye; c.shadowBlur = 6;
    c.fillStyle = eye;
    c.beginPath(); c.arc(28,32,2,0,Math.PI*2); c.fill();
    c.beginPath(); c.arc(36,32,2,0,Math.PI*2); c.fill();
    c.shadowBlur = 0;
    // Tiny legs
    c.fillStyle = dark;
    c.fillRect(26,58,7,6); c.fillRect(31,58,7,6);
}

function drawGiantCrocodile(c, r) {
    const green = `rgb(${r.int(30,70)},${r.int(90,130)},${r.int(20,60)})`;
    const dark  = `rgb(${r.int(10,40)},${r.int(40,70)},${r.int(10,40)})`;
    const belly = `rgb(${r.int(140,180)},${r.int(160,190)},${r.int(100,130)})`;
    // Long body — low to ground
    c.fillStyle = green;
    c.beginPath(); c.ellipse(32,42,30,16,0,0,Math.PI*2); c.fill();
    // Belly
    c.fillStyle = belly;
    c.beginPath(); c.ellipse(32,48,24,10,0,0,Math.PI*2); c.fill();
    // Scales on back
    c.fillStyle = dark;
    for (let i=0;i<6;i++) {
        c.beginPath(); c.ellipse(8+i*10,36,5,3,0,0,Math.PI*2); c.fill();
    }
    // Tail
    c.fillStyle = green;
    c.beginPath(); c.moveTo(62,42); c.quadraticCurveTo(68,36,64,30); c.lineTo(60,38); c.closePath(); c.fill();
    // Head — wide jaws
    c.beginPath(); c.ellipse(14,38,18,12,0,0,Math.PI*2); c.fill();
    // Upper jaw
    c.beginPath(); c.ellipse(14,32,18,8,0,0,Math.PI*2); c.fill();
    // Open mouth
    c.fillStyle = '#cc4422';
    c.fillRect(2,34,26,8);
    // Teeth
    c.fillStyle = '#eeeecc';
    for (let i=0;i<7;i++) {
        c.fillRect(3+i*4,34,3,5);
        c.fillRect(3+i*4,39,3,4);
    }
    // Eye
    c.fillStyle = dark;
    c.beginPath(); c.ellipse(18,28,4,3,0,0,Math.PI*2); c.fill();
    c.fillStyle = '#ffdd00';
    c.beginPath(); c.ellipse(18,28,2,2,0,0,Math.PI*2); c.fill();
    // Legs — stubby
    c.fillStyle = green;
    c.fillRect(14,54,10,10); c.fillRect(38,54,10,10);
    c.fillRect(6,48,8,8); c.fillRect(50,48,8,8);
}

function drawChimera(c, r) {
    const lion  = `rgb(${r.int(180,220)},${r.int(140,180)},${r.int(60,100)})`;
    const goat  = `rgb(${r.int(160,200)},${r.int(160,200)},${r.int(140,170)})`;
    const drag  = `rgb(${r.int(30,80)},${r.int(100,150)},${r.int(30,80)})`;
    const dark  = `rgb(${r.int(40,70)},${r.int(30,60)},${r.int(20,50)})`;
    // Main body
    c.fillStyle = lion;
    c.beginPath(); c.ellipse(32,42,22,16,0,0,Math.PI*2); c.fill();
    // Legs
    c.fillStyle = lion;
    c.fillRect(14,54,8,10); c.fillRect(40,54,8,10);
    c.fillStyle = drag;
    c.fillRect(22,54,8,10); c.fillRect(34,54,8,10);
    // Lion head — left
    c.fillStyle = lion;
    c.beginPath(); c.ellipse(14,22,14,12,0,0,Math.PI*2); c.fill();
    c.fillStyle = `rgb(${r.int(150,180)},${r.int(100,140)},${r.int(20,60)})`;
    c.beginPath(); c.ellipse(14,22,10,9,-0.2,0,Math.PI*2); c.fill();
    c.fillStyle = '#111'; // lion eyes
    c.beginPath(); c.arc(10,20,2,0,Math.PI*2); c.fill();
    c.beginPath(); c.arc(18,20,2,0,Math.PI*2); c.fill();
    // Goat head — center
    c.fillStyle = goat;
    c.beginPath(); c.ellipse(32,14,10,12,0,0,Math.PI*2); c.fill();
    c.fillStyle = dark;
    c.beginPath(); c.moveTo(28,8); c.lineTo(24,0); c.lineTo(30,8); c.fill();
    c.beginPath(); c.moveTo(36,8); c.lineTo(40,0); c.lineTo(34,8); c.fill();
    c.fillStyle = '#664400';
    c.beginPath(); c.arc(29,14,2,0,Math.PI*2); c.fill();
    c.beginPath(); c.arc(35,14,2,0,Math.PI*2); c.fill();
    // Dragon head — right
    c.fillStyle = drag;
    c.beginPath(); c.ellipse(50,22,14,10,0,0,Math.PI*2); c.fill();
    c.fillStyle = `rgb(${r.int(180,220)},${r.int(60,100)},${r.int(0,30)})`;
    c.beginPath(); c.arc(46,20,2,0,Math.PI*2); c.fill();
    c.beginPath(); c.arc(54,20,2,0,Math.PI*2); c.fill();
    // Dragon mouth fire hint
    c.shadowColor = '#ff6600'; c.shadowBlur = 6;
    c.fillStyle = '#ff8800';
    c.fillRect(58,24,6,4);
    c.shadowBlur = 0;
}

function drawWyvern(c, r) {
    const scale = `rgb(${r.int(40,80)},${r.int(70,110)},${r.int(40,80)})`;
    const dark  = `rgb(${r.int(20,50)},${r.int(30,60)},${r.int(20,50)})`;
    const wing  = `rgba(${r.int(30,60)},${r.int(60,90)},${r.int(30,60)},0.85)`;
    const eye   = `rgb(${r.int(200,240)},${r.int(150,200)},${r.int(0,40)})`;
    // Large wings
    c.fillStyle = wing;
    c.beginPath(); c.moveTo(28,28); c.quadraticCurveTo(6,10,2,42);
    c.lineTo(22,34); c.closePath(); c.fill();
    c.beginPath(); c.moveTo(36,28); c.quadraticCurveTo(58,10,62,42);
    c.lineTo(42,34); c.closePath(); c.fill();
    // Wing membrane detail
    c.strokeStyle = dark; c.lineWidth = 1;
    for (let i=1;i<4;i++) {
        c.beginPath(); c.moveTo(28,28); c.lineTo(4+i*4,42); c.stroke();
        c.beginPath(); c.moveTo(36,28); c.lineTo(60-i*4,42); c.stroke();
    }
    // Body
    c.fillStyle = scale;
    c.beginPath(); c.ellipse(32,40,14,18,0,0,Math.PI*2); c.fill();
    // Scale pattern
    c.fillStyle = dark;
    for (let i=0;i<4;i++) c.fillRect(26,30+i*6,12,4);
    // Only two legs
    c.fillStyle = scale;
    c.fillRect(22,54,10,10); c.fillRect(32,54,10,10);
    // Barbed tail
    c.strokeStyle = scale; c.lineWidth = 4;
    c.beginPath(); c.moveTo(32,56); c.quadraticCurveTo(50,60,56,52); c.stroke();
    c.fillStyle = dark;
    c.beginPath(); c.moveTo(56,48); c.lineTo(62,50); c.lineTo(56,56); c.fill();
    // Head — dragon-like
    c.fillStyle = scale;
    c.beginPath(); c.ellipse(32,14,12,12,0,0,Math.PI*2); c.fill();
    c.beginPath(); c.ellipse(32,20,12,6,0,0,Math.PI*2); c.fill();
    // Snout
    c.fillStyle = dark;
    c.fillRect(22,20,20,6);
    c.fillStyle = '#eeddcc';
    for (let i=0;i<4;i++) c.fillRect(23+i*4,22,3,4);
    // Eye
    c.shadowColor = eye; c.shadowBlur = 6;
    c.fillStyle = eye;
    c.beginPath(); c.arc(27,12,3,0,Math.PI*2); c.fill();
    c.beginPath(); c.arc(37,12,3,0,Math.PI*2); c.fill();
    c.shadowBlur = 0;
}

function drawDisplacerBeast(c, r) {
    const fur   = `rgb(${r.int(30,70)},${r.int(10,40)},${r.int(60,100)})`;
    const dark  = `rgb(${r.int(10,30)},${r.int(0,20)},${r.int(30,60)})`;
    const eye   = `rgb(${r.int(50,120)},${r.int(180,230)},${r.int(50,120)})`;
    // Panther body
    c.fillStyle = fur;
    c.beginPath(); c.ellipse(32,40,22,14,0,0,Math.PI*2); c.fill();
    // Legs — four
    c.fillRect(14,50,8,14); c.fillRect(24,50,8,14);
    c.fillRect(34,50,8,14); c.fillRect(44,50,8,14);
    // Tentacle appendages
    c.strokeStyle = dark; c.lineWidth = 5;
    c.beginPath(); c.moveTo(22,38); c.quadraticCurveTo(6,28,4,14); c.stroke();
    c.beginPath(); c.moveTo(42,38); c.quadraticCurveTo(58,28,60,14); c.stroke();
    // Tentacle tips — barbed
    c.fillStyle = dark;
    c.beginPath(); c.moveTo(4,14); c.lineTo(0,8); c.lineTo(8,10); c.fill();
    c.beginPath(); c.moveTo(60,14); c.lineTo(64,8); c.lineTo(56,10); c.fill();
    // Neck and head
    c.fillStyle = fur;
    c.fillRect(26,26,12,16);
    c.beginPath(); c.ellipse(32,20,12,12,0,0,Math.PI*2); c.fill();
    // Ears
    c.fillStyle = dark;
    c.beginPath(); c.moveTo(22,14); c.lineTo(18,6); c.lineTo(27,14); c.fill();
    c.beginPath(); c.moveTo(42,14); c.lineTo(46,6); c.lineTo(37,14); c.fill();
    // Glowing green eyes
    c.shadowColor = eye; c.shadowBlur = 8;
    c.fillStyle = eye;
    c.beginPath(); c.ellipse(27,20,3,2,0,0,Math.PI*2); c.fill();
    c.beginPath(); c.ellipse(37,20,3,2,0,0,Math.PI*2); c.fill();
    c.shadowBlur = 0;
    // Tail
    c.strokeStyle = fur; c.lineWidth = 4;
    c.beginPath(); c.moveTo(54,40); c.quadraticCurveTo(62,34,60,26); c.stroke();
}

function drawRemorhaz(c, r) {
    const orange = `rgb(${r.int(200,240)},${r.int(100,150)},${r.int(0,40)})`;
    const dark   = `rgb(${r.int(30,60)},${r.int(15,40)},${r.int(0,20)})`;
    const glow   = `rgb(${r.int(220,255)},${r.int(140,180)},${r.int(0,30)})`;
    // Segmented worm body — S-curve
    c.fillStyle = dark;
    for (let i=0;i<8;i++) {
        const x = 8+i*8, y = 32+(i%2===0?-8:8);
        c.beginPath(); c.ellipse(x,y,9,7,0,0,Math.PI*2); c.fill();
    }
    // Glowing underbelly segments
    c.fillStyle = glow;
    c.shadowColor = glow; c.shadowBlur = 6;
    for (let i=0;i<8;i++) {
        const x = 8+i*8, y = 32+(i%2===0?-8:8);
        c.beginPath(); c.ellipse(x,y+2,6,4,0,0,Math.PI*2); c.fill();
    }
    c.shadowBlur = 0;
    // Many legs
    c.strokeStyle = dark; c.lineWidth = 2;
    for (let i=0;i<7;i++) {
        const x = 12+i*8;
        c.beginPath(); c.moveTo(x,38); c.lineTo(x-4,48); c.stroke();
        c.beginPath(); c.moveTo(x,26); c.lineTo(x+4,16); c.stroke();
    }
    // Massive mandibles / head
    c.fillStyle = dark;
    c.beginPath(); c.ellipse(54,32,12,10,0,0,Math.PI*2); c.fill();
    c.fillStyle = orange;
    c.beginPath(); c.moveTo(62,26); c.lineTo(64,18); c.lineTo(60,28); c.fill();
    c.beginPath(); c.moveTo(62,38); c.lineTo(64,46); c.lineTo(60,36); c.fill();
    // Eyes
    c.shadowColor = glow; c.shadowBlur = 6;
    c.fillStyle = glow;
    c.beginPath(); c.arc(52,28,2,0,Math.PI*2); c.fill();
    c.beginPath(); c.arc(52,36,2,0,Math.PI*2); c.fill();
    c.shadowBlur = 0;
}

function drawThunderbird(c, r) {
    const blue  = `rgb(${r.int(30,80)},${r.int(100,160)},${r.int(200,240)})`;
    const white = `rgb(${r.int(200,240)},${r.int(210,245)},${r.int(230,255)})`;
    const light = `rgb(${r.int(180,220)},${r.int(220,255)},${r.int(100,180)})`;
    // Huge wings
    c.fillStyle = blue;
    c.beginPath(); c.moveTo(32,28); c.quadraticCurveTo(4,6,0,40);
    c.lineTo(24,34); c.lineTo(20,50); c.lineTo(30,38); c.closePath(); c.fill();
    c.beginPath(); c.moveTo(32,28); c.quadraticCurveTo(60,6,64,40);
    c.lineTo(40,34); c.lineTo(44,50); c.lineTo(34,38); c.closePath(); c.fill();
    // Lightning along wings
    c.strokeStyle = light; c.lineWidth = 2;
    c.shadowColor = light; c.shadowBlur = 8;
    for (let i=0;i<3;i++) {
        c.beginPath();
        c.moveTo(28-i*6,30+i*4);
        c.lineTo(22-i*6,22+i*4);
        c.lineTo(18-i*6,28+i*4);
        c.stroke();
        c.beginPath();
        c.moveTo(36+i*6,30+i*4);
        c.lineTo(42+i*6,22+i*4);
        c.lineTo(46+i*6,28+i*4);
        c.stroke();
    }
    c.shadowBlur = 0;
    // Body
    c.fillStyle = white;
    c.beginPath(); c.ellipse(32,38,10,14,0,0,Math.PI*2); c.fill();
    // Head
    c.fillStyle = white;
    c.beginPath(); c.ellipse(32,20,10,10,0,0,Math.PI*2); c.fill();
    // Beak
    c.fillStyle = `rgb(${r.int(180,220)},${r.int(150,180)},${r.int(20,60)})`;
    c.beginPath(); c.moveTo(32,22); c.lineTo(26,26); c.lineTo(32,28); c.closePath(); c.fill();
    // Fierce eyes
    c.shadowColor = light; c.shadowBlur = 6;
    c.fillStyle = light;
    c.beginPath(); c.arc(28,18,3,0,Math.PI*2); c.fill();
    c.beginPath(); c.arc(36,18,3,0,Math.PI*2); c.fill();
    c.shadowBlur = 0;
    // Talons
    c.fillStyle = blue;
    c.fillRect(24,50,8,12); c.fillRect(32,50,8,12);
}

function drawRustMonster(c, r) {
    const rust  = `rgb(${r.int(150,190)},${r.int(70,110)},${r.int(20,60)})`;
    const brown = `rgb(${r.int(100,140)},${r.int(60,90)},${r.int(20,50)})`;
    const dark  = `rgb(${r.int(40,70)},${r.int(20,50)},${r.int(0,20)})`;
    // Insect-like body
    c.fillStyle = rust;
    c.beginPath(); c.ellipse(32,40,20,16,0,0,Math.PI*2); c.fill();
    // Shell segments
    c.fillStyle = brown;
    c.beginPath(); c.ellipse(32,36,18,10,0,0,Math.PI*2); c.fill();
    c.fillStyle = dark;
    c.fillRect(14,32,36,4);
    // Four legs
    c.strokeStyle = rust; c.lineWidth = 3;
    c.beginPath(); c.moveTo(16,42); c.lineTo(8,54); c.stroke();
    c.beginPath(); c.moveTo(24,46); c.lineTo(16,58); c.stroke();
    c.beginPath(); c.moveTo(40,46); c.lineTo(48,58); c.stroke();
    c.beginPath(); c.moveTo(48,42); c.lineTo(56,54); c.stroke();
    // Feathery antennae
    c.strokeStyle = brown; c.lineWidth = 2;
    c.beginPath(); c.moveTo(26,28); c.quadraticCurveTo(16,18,10,10); c.stroke();
    c.beginPath(); c.moveTo(38,28); c.quadraticCurveTo(48,18,54,10); c.stroke();
    // Antenna feathers
    c.lineWidth = 1;
    for (let i=0;i<4;i++) {
        c.beginPath(); c.moveTo(20-i*2,22-i*3); c.lineTo(16-i*2,18-i*3); c.stroke();
        c.beginPath(); c.moveTo(44+i*2,22-i*3); c.lineTo(48+i*2,18-i*3); c.stroke();
    }
    // Head
    c.fillStyle = rust;
    c.beginPath(); c.ellipse(32,28,10,8,0,0,Math.PI*2); c.fill();
    // Beady eyes
    c.fillStyle = dark;
    c.beginPath(); c.arc(27,26,2,0,Math.PI*2); c.fill();
    c.beginPath(); c.arc(37,26,2,0,Math.PI*2); c.fill();
    c.fillStyle = '#ffcc00';
    c.beginPath(); c.arc(27,26,1,0,Math.PI*2); c.fill();
    c.beginPath(); c.arc(37,26,1,0,Math.PI*2); c.fill();
}

function drawWitchDoctor(c, r) {
    const skin  = `rgb(${r.int(50,90)},${r.int(30,60)},${r.int(20,50)})`;
    const robe  = `rgb(${r.int(30,60)},${r.int(20,50)},${r.int(10,30)})`;
    const bone  = `rgb(${r.int(200,230)},${r.int(190,215)},${r.int(160,185)})`;
    const accent= `rgb(${r.int(160,210)},${r.int(80,130)},${r.int(0,40)})`;
    // Robe body
    c.fillStyle = robe;
    c.beginPath(); c.moveTo(18,26); c.lineTo(12,64); c.lineTo(52,64); c.lineTo(46,26); c.closePath(); c.fill();
    // Bone jewelry
    c.strokeStyle = bone; c.lineWidth = 2;
    c.beginPath(); c.moveTo(20,30); c.lineTo(44,30); c.stroke();
    c.fillStyle = bone;
    for (let i=0;i<3;i++) c.fillRect(22+i*8,28,4,8);
    // Arms
    c.fillStyle = skin;
    c.fillRect(8,26,12,16); c.fillRect(44,26,12,16);
    // Staff in right hand
    c.strokeStyle = robe; c.lineWidth = 3;
    c.beginPath(); c.moveTo(56,12); c.lineTo(56,60); c.stroke();
    c.fillStyle = bone;
    c.beginPath(); c.ellipse(56,12,5,5,0,0,Math.PI*2); c.fill();
    // Skull on staff
    c.fillStyle = '#111'; c.fillRect(53,8,6,4);
    c.fillStyle = bone; c.fillRect(54,9,2,2); c.fillRect(57,9,2,2);
    // Skull mask / head
    c.fillStyle = skin;
    c.beginPath(); c.ellipse(32,14,12,13,0,0,Math.PI*2); c.fill();
    c.fillStyle = bone;
    c.beginPath(); c.ellipse(32,14,10,11,0,0,Math.PI*2); c.fill();
    // Mask eye holes
    c.fillStyle = '#111';
    c.beginPath(); c.ellipse(27,12,4,4,0,0,Math.PI*2); c.fill();
    c.beginPath(); c.ellipse(37,12,4,4,0,0,Math.PI*2); c.fill();
    c.fillStyle = accent;
    c.beginPath(); c.arc(27,12,2,0,Math.PI*2); c.fill();
    c.beginPath(); c.arc(37,12,2,0,Math.PI*2); c.fill();
    // Headdress feathers
    c.strokeStyle = accent; c.lineWidth = 2;
    c.beginPath(); c.moveTo(32,4); c.lineTo(32,0); c.stroke();
    c.beginPath(); c.moveTo(26,5); c.lineTo(22,0); c.stroke();
    c.beginPath(); c.moveTo(38,5); c.lineTo(42,0); c.stroke();
}

function drawGladiator(c, r) {
    const armor = `rgb(${r.int(180,220)},${r.int(140,180)},${r.int(30,70)})`;
    const red   = `rgb(${r.int(160,210)},${r.int(20,60)},${r.int(20,60)})`;
    const skin  = `rgb(${r.int(190,225)},${r.int(150,185)},${r.int(120,155)})`;
    const dark  = `rgb(${r.int(30,60)},${r.int(20,50)},${r.int(10,30)})`;
    // Body armor
    c.fillStyle = armor;
    c.fillRect(18,26,28,28);
    // Red sash/trim
    c.fillStyle = red;
    c.fillRect(18,38,28,6);
    // Pauldrons
    c.fillStyle = armor;
    c.beginPath(); c.ellipse(12,28,10,7,0,0,Math.PI*2); c.fill();
    c.beginPath(); c.ellipse(52,28,10,7,0,0,Math.PI*2); c.fill();
    // Shield — left
    c.fillStyle = armor;
    c.fillRect(2,26,14,22);
    c.strokeStyle = red; c.lineWidth = 2;
    c.strokeRect(3,27,12,20);
    c.beginPath(); c.moveTo(9,28); c.lineTo(9,46); c.stroke();
    // Sword — right
    c.fillStyle = '#ccddee';
    c.fillRect(52,12,4,22);
    c.fillRect(46,20,16,4);
    c.fillStyle = dark;
    c.fillRect(53,34,2,12);
    // Arms
    c.fillStyle = skin;
    c.fillRect(6,28,12,18); c.fillRect(46,28,12,18);
    // Crested helm
    c.fillStyle = armor;
    c.beginPath(); c.ellipse(32,13,14,13,0,0,Math.PI*2); c.fill();
    // Crest plume
    c.fillStyle = red;
    c.beginPath(); c.moveTo(28,4); c.quadraticCurveTo(32,0,36,4); c.lineTo(36,8); c.lineTo(28,8); c.closePath(); c.fill();
    // Visor
    c.fillStyle = dark; c.fillRect(22,16,20,6);
    c.fillStyle = skin; c.fillRect(23,17,8,3); c.fillRect(33,17,8,3);
    // Legs — greaves
    c.fillStyle = armor;
    c.fillRect(18,54,12,10); c.fillRect(34,54,12,10);
    c.fillStyle = red;
    c.fillRect(18,60,12,4); c.fillRect(34,60,12,4);
}

function drawAssassinLord(c, r) {
    const cloak = `rgb(${r.int(10,35)},${r.int(10,35)},${r.int(15,40)})`;
    const dark  = `rgb(${r.int(5,20)},${r.int(5,20)},${r.int(8,25)})`;
    const mask  = `rgb(${r.int(30,60)},${r.int(30,60)},${r.int(35,65)})`;
    const blade = `rgb(${r.int(180,220)},${r.int(180,220)},${r.int(200,230)})`;
    const glow  = `rgba(${r.int(100,160)},${r.int(0,40)},${r.int(180,230)},0.7)`;
    // Shadow wreath
    c.fillStyle = glow;
    c.shadowColor = glow; c.shadowBlur = 14;
    c.beginPath(); c.ellipse(32,40,24,22,0,0,Math.PI*2); c.fill();
    c.shadowBlur = 0;
    // Cloak body
    c.fillStyle = cloak;
    c.beginPath(); c.moveTo(16,24); c.lineTo(8,64); c.lineTo(56,64); c.lineTo(48,24); c.closePath(); c.fill();
    // Tattered cloak edges
    c.fillStyle = dark;
    c.beginPath(); c.moveTo(8,52); c.lineTo(4,64); c.lineTo(12,58); c.fill();
    c.beginPath(); c.moveTo(56,52); c.lineTo(60,64); c.lineTo(52,58); c.fill();
    // Dual daggers
    c.fillStyle = blade;
    c.fillRect(6,30,3,20); c.fillRect(55,30,3,20);
    c.fillStyle = dark;
    c.fillRect(5,46,5,4); c.fillRect(54,46,5,4);
    // Arms
    c.fillStyle = cloak;
    c.fillRect(6,26,12,12); c.fillRect(46,26,12,12);
    // Hood
    c.fillStyle = dark;
    c.beginPath(); c.moveTo(14,26); c.quadraticCurveTo(32,4,50,26); c.quadraticCurveTo(42,20,32,18); c.quadraticCurveTo(22,20,14,26); c.fill();
    // Mask — cold expression
    c.fillStyle = mask;
    c.beginPath(); c.ellipse(32,22,10,11,0,0,Math.PI*2); c.fill();
    // Eye slits — glowing
    c.shadowColor = glow; c.shadowBlur = 6;
    c.fillStyle = glow;
    c.fillRect(25,20,5,2); c.fillRect(34,20,5,2);
    c.shadowBlur = 0;
}

function drawBattleMage(c, r) {
    const robe  = `rgb(${r.int(50,90)},${r.int(20,60)},${r.int(100,150)})`;
    const silver= `rgb(${r.int(160,200)},${r.int(160,200)},${r.int(180,220)})`;
    const glow  = `rgb(${r.int(140,200)},${r.int(50,120)},${r.int(220,255)})`;
    const skin  = `rgb(${r.int(200,230)},${r.int(175,205)},${r.int(150,180)})`;
    // Robe body
    c.fillStyle = robe;
    c.beginPath(); c.moveTo(18,26); c.lineTo(14,64); c.lineTo(50,64); c.lineTo(46,26); c.closePath(); c.fill();
    // Heavy pauldrons
    c.fillStyle = silver;
    c.beginPath(); c.ellipse(10,28,12,8,0,0,Math.PI*2); c.fill();
    c.beginPath(); c.ellipse(54,28,12,8,0,0,Math.PI*2); c.fill();
    // Runic tattoos glowing on chest
    c.shadowColor = glow; c.shadowBlur = 8;
    c.strokeStyle = glow; c.lineWidth = 2;
    c.beginPath(); c.moveTo(26,32); c.lineTo(32,28); c.lineTo(38,32); c.lineTo(32,38); c.closePath(); c.stroke();
    c.beginPath(); c.arc(32,33,4,0,Math.PI*2); c.stroke();
    c.shadowBlur = 0;
    // Arcane staff
    c.strokeStyle = silver; c.lineWidth = 3;
    c.beginPath(); c.moveTo(56,64); c.lineTo(52,10); c.stroke();
    c.shadowColor = glow; c.shadowBlur = 12;
    c.fillStyle = glow;
    c.beginPath(); c.arc(52,10,6,0,Math.PI*2); c.fill();
    c.shadowBlur = 0;
    // Arms
    c.fillStyle = skin;
    c.fillRect(6,28,12,18); c.fillRect(46,28,12,18);
    // Head
    c.fillStyle = skin;
    c.beginPath(); c.ellipse(32,14,12,13,0,0,Math.PI*2); c.fill();
    // Hair
    c.fillStyle = robe;
    c.beginPath(); c.ellipse(32,9,12,7,0,0,Math.PI); c.fill();
    // Eyes with runic glow
    c.shadowColor = glow; c.shadowBlur = 6;
    c.fillStyle = glow;
    c.beginPath(); c.arc(27,14,2,0,Math.PI*2); c.fill();
    c.beginPath(); c.arc(37,14,2,0,Math.PI*2); c.fill();
    c.shadowBlur = 0;
}

function drawIronGolem(c, r) {
    const iron  = `rgb(${r.int(90,130)},${r.int(90,130)},${r.int(100,140)})`;
    const dark  = `rgb(${r.int(40,70)},${r.int(40,70)},${r.int(50,80)})`;
    const rivet = `rgb(${r.int(60,90)},${r.int(60,90)},${r.int(70,100)})`;
    const eye   = `rgb(${r.int(150,210)},${r.int(150,210)},${r.int(220,255)})`;
    // Massive boxy body
    c.fillStyle = iron;
    c.fillRect(14,24,36,36);
    // Plate seams
    c.strokeStyle = dark; c.lineWidth = 2;
    c.strokeRect(14,24,36,36);
    c.beginPath(); c.moveTo(32,24); c.lineTo(32,60); c.stroke();
    c.beginPath(); c.moveTo(14,42); c.lineTo(50,42); c.stroke();
    // Rivets
    c.fillStyle = rivet;
    for (let x=0;x<3;x++) for (let y=0;y<3;y++)
        c.beginPath(), c.arc(18+x*14,28+y*14,2,0,Math.PI*2), c.fill();
    // Arms — boxy
    c.fillStyle = iron;
    c.fillRect(2,24,14,28); c.fillRect(48,24,14,28);
    c.strokeStyle = dark; c.lineWidth = 2;
    c.strokeRect(2,24,14,28); c.strokeRect(48,24,14,28);
    // Fists
    c.fillStyle = dark;
    c.fillRect(2,50,14,10); c.fillRect(48,50,14,10);
    // Head — boxy, no face
    c.fillStyle = iron;
    c.fillRect(20,8,24,18);
    c.strokeStyle = dark; c.lineWidth = 2;
    c.strokeRect(20,8,24,18);
    // Glowing eye slots only
    c.fillStyle = dark; c.fillRect(22,14,20,6);
    c.shadowColor = eye; c.shadowBlur = 10;
    c.fillStyle = eye;
    c.fillRect(24,15,6,4); c.fillRect(34,15,6,4);
    c.shadowBlur = 0;
    // Legs — boxy
    c.fillStyle = iron;
    c.fillRect(16,58,14,6); c.fillRect(34,58,14,6);
}

function drawClockworkHorror(c, r) {
    const brass = `rgb(${r.int(170,210)},${r.int(130,170)},${r.int(40,80)})`;
    const copper= `rgb(${r.int(180,220)},${r.int(100,140)},${r.int(30,70)})`;
    const dark  = `rgb(${r.int(30,60)},${r.int(20,50)},${r.int(0,30)})`;
    const glow  = `rgb(${r.int(200,240)},${r.int(160,210)},${r.int(0,50)})`;
    // Central body
    c.fillStyle = brass;
    c.beginPath(); c.ellipse(32,38,16,18,0,0,Math.PI*2); c.fill();
    c.strokeStyle = dark; c.lineWidth = 1.5;
    c.beginPath(); c.ellipse(32,38,16,18,0,0,Math.PI*2); c.stroke();
    // Gears visible on body
    const drawGear = (x,y,r2) => {
        c.beginPath(); c.arc(x,y,r2,0,Math.PI*2); c.fill();
        c.strokeStyle = dark; c.lineWidth = 1;
        for (let t=0;t<8;t++) {
            const a=t*Math.PI/4;
            c.beginPath();
            c.moveTo(x+Math.cos(a)*r2,y+Math.sin(a)*r2);
            c.lineTo(x+Math.cos(a)*(r2+3),y+Math.sin(a)*(r2+3));
            c.stroke();
        }
    };
    c.fillStyle = copper;
    drawGear(26,36,6); drawGear(38,40,5); drawGear(32,50,4);
    // Multiple limbs
    c.strokeStyle = brass; c.lineWidth = 4;
    const limbs = [[14,30,2,14],[20,24,6,12],[44,30,62,14],[48,24,58,12],[10,44,0,56],[54,44,64,56]];
    for (const [x1,y1,x2,y2] of limbs) {
        c.beginPath(); c.moveTo(x1,y1); c.lineTo(x2,y2); c.stroke();
    }
    // Head — mechanical, no face
    c.fillStyle = brass;
    c.fillRect(22,10,20,20);
    c.strokeStyle = dark; c.lineWidth = 1.5; c.strokeRect(22,10,20,20);
    // Spinning gear head detail
    c.fillStyle = copper;
    drawGear(32,20,7);
    // Glowing core / eyes
    c.shadowColor = glow; c.shadowBlur = 8;
    c.fillStyle = glow;
    c.beginPath(); c.arc(32,20,3,0,Math.PI*2); c.fill();
    c.shadowBlur = 0;
}

function drawGargoyleSentinel(c, r) {
    const stone = `rgb(${r.int(100,140)},${r.int(100,140)},${r.int(110,150)})`;
    const dark  = `rgb(${r.int(50,80)},${r.int(50,80)},${r.int(60,90)})`;
    const wing  = `rgba(${r.int(80,120)},${r.int(80,120)},${r.int(90,130)},0.9)`;
    const eye   = `rgb(${r.int(180,230)},${r.int(0,30)},${r.int(0,30)})`;
    // Stone bat wings
    c.fillStyle = wing;
    c.beginPath(); c.moveTo(32,30); c.quadraticCurveTo(8,12,2,44);
    c.lineTo(20,36); c.closePath(); c.fill();
    c.beginPath(); c.moveTo(32,30); c.quadraticCurveTo(56,12,62,44);
    c.lineTo(44,36); c.closePath(); c.fill();
    // Hunched body
    c.fillStyle = stone;
    c.beginPath(); c.ellipse(32,44,16,18,0,0,Math.PI*2); c.fill();
    // Stone texture cracks
    c.strokeStyle = dark; c.lineWidth = 1;
    c.beginPath(); c.moveTo(26,36); c.lineTo(30,48); c.lineTo(28,56); c.stroke();
    c.beginPath(); c.moveTo(38,38); c.lineTo(35,50); c.stroke();
    // Arms — clawed
    c.fillStyle = stone;
    c.fillRect(10,36,14,16); c.fillRect(40,36,14,16);
    // Claws
    c.fillStyle = dark;
    for (let i=0;i<3;i++) {
        c.beginPath(); c.moveTo(10+i*4,52); c.lineTo(9+i*4,60); c.lineTo(13+i*4,52); c.fill();
        c.beginPath(); c.moveTo(40+i*4,52); c.lineTo(39+i*4,60); c.lineTo(43+i*4,52); c.fill();
    }
    // Head — hunched forward, fanged
    c.fillStyle = stone;
    c.beginPath(); c.ellipse(32,24,13,12,0,0,Math.PI*2); c.fill();
    // Fanged mouth
    c.fillStyle = dark; c.fillRect(22,28,20,6);
    c.fillStyle = '#ddd';
    for (let i=0;i<5;i++) c.fillRect(23+i*3,28,2,5);
    // Glowing red eyes
    c.shadowColor = eye; c.shadowBlur = 10;
    c.fillStyle = eye;
    c.beginPath(); c.arc(27,22,3,0,Math.PI*2); c.fill();
    c.beginPath(); c.arc(37,22,3,0,Math.PI*2); c.fill();
    c.shadowBlur = 0;
    // Legs
    c.fillStyle = stone;
    c.fillRect(22,58,10,6); c.fillRect(32,58,10,6);
}

function drawGibberingMouther(c, r) {
    const flesh = `rgb(${r.int(210,245)},${r.int(160,200)},${r.int(160,200)})`;
    const pink  = `rgb(${r.int(220,255)},${r.int(100,150)},${r.int(120,170)})`;
    const dark  = `rgb(${r.int(80,120)},${r.int(20,60)},${r.int(30,70)})`;
    const white = `rgb(${r.int(230,255)},${r.int(230,255)},${r.int(230,255)})`;
    // Blobby body
    c.fillStyle = flesh;
    c.beginPath(); c.ellipse(32,38,26,22,0,0,Math.PI*2); c.fill();
    // Extra flesh bulges
    c.beginPath(); c.ellipse(14,36,10,12,0,0,Math.PI*2); c.fill();
    c.beginPath(); c.ellipse(50,34,10,12,0,0,Math.PI*2); c.fill();
    c.beginPath(); c.ellipse(32,54,18,12,0,0,Math.PI*2); c.fill();
    // Multiple mouths agape
    const drawMouth = (x,y,w,h) => {
        c.fillStyle = dark;
        c.beginPath(); c.ellipse(x,y,w,h,0,0,Math.PI*2); c.fill();
        c.fillStyle = pink;
        c.beginPath(); c.ellipse(x,y+2,w-2,h-2,0,0,Math.PI); c.fill();
        c.fillStyle = white;
        for (let i=0;i<3;i++) {
            c.fillRect(x-w+2+i*(w*2/3|0),y-h+2,3,h);
            c.fillRect(x-w+2+i*(w*2/3|0),y+1,3,h-2);
        }
    };
    drawMouth(22,32,7,5); drawMouth(40,30,6,5); drawMouth(32,44,8,6);
    drawMouth(16,46,5,4); drawMouth(48,46,5,4);
    // Scattered eyeballs
    const drawEye = (x,y) => {
        c.fillStyle = white;
        c.beginPath(); c.arc(x,y,4,0,Math.PI*2); c.fill();
        c.fillStyle = dark;
        c.beginPath(); c.arc(x,y,2,0,Math.PI*2); c.fill();
        c.fillStyle = white;
        c.beginPath(); c.arc(x+1,y-1,1,0,Math.PI*2); c.fill();
    };
    drawEye(26,24); drawEye(38,26); drawEye(14,32); drawEye(50,28); drawEye(32,52);
}

function drawAboleth(c, r) {
    const blue  = `rgb(${r.int(20,60)},${r.int(100,150)},${r.int(130,180)})`;
    const green = `rgb(${r.int(20,60)},${r.int(130,170)},${r.int(80,130)})`;
    const dark  = `rgb(${r.int(10,40)},${r.int(40,80)},${r.int(50,90)})`;
    const eye   = `rgb(${r.int(180,230)},${r.int(0,40)},${r.int(0,40)})`;
    // Large fish-like body
    c.fillStyle = blue;
    c.beginPath(); c.ellipse(32,36,28,20,0,0,Math.PI*2); c.fill();
    // Slimy iridescent sheen
    c.fillStyle = green;
    c.beginPath(); c.ellipse(32,36,22,14,0,0,Math.PI*2); c.fill();
    // Belly
    c.fillStyle = `rgb(${r.int(150,190)},${r.int(200,230)},${r.int(180,220)})`;
    c.beginPath(); c.ellipse(32,42,18,10,0,0,Math.PI*2); c.fill();
    // Tail fin
    c.fillStyle = blue;
    c.beginPath(); c.moveTo(58,36); c.lineTo(64,28); c.lineTo(64,44); c.closePath(); c.fill();
    // Three red eyes in a row
    c.shadowColor = eye; c.shadowBlur = 8;
    c.fillStyle = eye;
    c.beginPath(); c.ellipse(22,28,4,3,0,0,Math.PI*2); c.fill();
    c.beginPath(); c.ellipse(32,26,4,3,0,0,Math.PI*2); c.fill();
    c.beginPath(); c.ellipse(42,28,4,3,0,0,Math.PI*2); c.fill();
    c.shadowBlur = 0;
    // Tentacles — four
    c.strokeStyle = dark; c.lineWidth = 4;
    c.beginPath(); c.moveTo(18,40); c.quadraticCurveTo(8,50,4,60); c.stroke();
    c.beginPath(); c.moveTo(24,44); c.quadraticCurveTo(16,56,12,64); c.stroke();
    c.beginPath(); c.moveTo(40,44); c.quadraticCurveTo(48,56,52,64); c.stroke();
    c.beginPath(); c.moveTo(46,40); c.quadraticCurveTo(56,50,60,60); c.stroke();
    // Mouth — large, below eyes
    c.fillStyle = dark; c.fillRect(20,30,24,8);
    c.fillStyle = `rgb(${r.int(150,180)},${r.int(20,60)},${r.int(20,60)})`;
    c.beginPath(); c.ellipse(32,34,10,4,0,0,Math.PI); c.fill();
}

function drawStarSpawn(c, r) {
    const purple= `rgb(${r.int(30,70)},${r.int(0,30)},${r.int(60,100)})`;
    const dark  = `rgb(${r.int(5,25)},${r.int(0,15)},${r.int(20,50)})`;
    const star  = `rgb(${r.int(150,210)},${r.int(150,210)},${r.int(220,255)})`;
    const eye   = `rgb(${r.int(200,255)},${r.int(150,220)},${r.int(0,60)})`;
    // Dark alien body
    c.fillStyle = purple;
    c.beginPath(); c.ellipse(32,38,20,24,0,0,Math.PI*2); c.fill();
    // Starfield pattern on body
    c.fillStyle = star;
    for (let i=0;i<12;i++) {
        const x = 16 + (i*7)%32, y = 26 + (i*5)%28;
        const s = r.int(1,3);
        c.beginPath(); c.arc(x,y,s,0,Math.PI*2); c.fill();
    }
    // Multiple mismatched eyes
    const eyeSizes = [4,3,5,2,3];
    const eyePos = [[22,28],[38,24],[30,32],[18,36],[44,34]];
    c.shadowColor = eye; c.shadowBlur = 6;
    c.fillStyle = eye;
    for (let i=0;i<5;i++) {
        c.beginPath(); c.ellipse(eyePos[i][0],eyePos[i][1],eyeSizes[i],eyeSizes[i]-1,0,0,Math.PI*2); c.fill();
    }
    c.shadowBlur = 0;
    // Writhing appendages
    c.strokeStyle = dark; c.lineWidth = 3;
    for (let i=0;i<5;i++) {
        const ax = 14+i*10, dir = i%2===0?-1:1;
        c.beginPath();
        c.moveTo(ax,52);
        c.quadraticCurveTo(ax+dir*10,58,ax+dir*6,64);
        c.stroke();
    }
    // Head blob
    c.fillStyle = dark;
    c.beginPath(); c.ellipse(32,18,14,12,0,0,Math.PI*2); c.fill();
    c.fillStyle = star;
    for (let i=0;i<4;i++) {
        const x = 22+i*6, y = 14+r.int(-3,3);
        c.beginPath(); c.arc(x,y,r.int(1,2),0,Math.PI*2); c.fill();
    }
}

function drawVoidWraith(c, r) {
    const purple= `rgba(${r.int(80,130)},${r.int(0,40)},${r.int(140,200)},0.9)`;
    const void_ = `rgb(${r.int(0,15)},${r.int(0,10)},${r.int(0,20)})`;
    const wisp  = `rgba(${r.int(100,160)},${r.int(0,50)},${r.int(180,240)},0.6)`;
    const glow  = `rgb(${r.int(160,220)},${r.int(50,120)},${r.int(220,255)})`;
    // Void energy wisps — outer glow
    c.shadowColor = glow; c.shadowBlur = 18;
    c.fillStyle = wisp;
    c.beginPath(); c.ellipse(32,38,22,26,0,0,Math.PI*2); c.fill();
    c.shadowBlur = 0;
    // Dark robe / void form
    c.fillStyle = purple;
    c.beginPath();
    c.moveTo(14,26); c.quadraticCurveTo(8,52,6,64);
    c.lineTo(16,58); c.lineTo(20,64); c.lineTo(26,54);
    c.lineTo(32,64); c.lineTo(38,54); c.lineTo(44,64);
    c.lineTo(48,58); c.lineTo(58,64);
    c.quadraticCurveTo(56,52,50,26);
    c.closePath(); c.fill();
    // Void black center
    c.fillStyle = void_;
    c.beginPath(); c.ellipse(32,42,14,18,0,0,Math.PI*2); c.fill();
    // Dark purple energy tendrils
    c.strokeStyle = wisp; c.lineWidth = 2;
    for (let i=0;i<4;i++) {
        c.beginPath(); c.moveTo(32,44); c.quadraticCurveTo(20+i*6,54,14+i*8,62); c.stroke();
    }
    // Hood
    c.fillStyle = void_;
    c.beginPath(); c.moveTo(14,26); c.quadraticCurveTo(32,4,50,26);
    c.quadraticCurveTo(44,18,32,16); c.quadraticCurveTo(20,18,14,26); c.fill();
    // Face — void with glowing eyes
    c.fillStyle = void_; c.beginPath(); c.ellipse(32,22,8,8,0,0,Math.PI*2); c.fill();
    c.shadowColor = glow; c.shadowBlur = 10;
    c.fillStyle = glow;
    c.beginPath(); c.arc(28,22,2,0,Math.PI*2); c.fill();
    c.beginPath(); c.arc(36,22,2,0,Math.PI*2); c.fill();
    c.shadowBlur = 0;
}

function drawVampireLord(c, r) {
    const skin  = `rgb(${r.int(200,230)},${r.int(200,230)},${r.int(210,240)})`;
    const suit  = `rgb(${r.int(10,35)},${r.int(5,25)},${r.int(15,40)})`;
    const cape  = `rgb(${r.int(100,150)},${r.int(0,30)},${r.int(0,30)})`;
    const glow  = `rgb(${r.int(200,255)},${r.int(0,40)},${r.int(0,40)})`;
    // Cape / wings spread
    c.fillStyle = cape;
    c.beginPath(); c.moveTo(32,28); c.quadraticCurveTo(4,18,0,50);
    c.lineTo(18,40); c.closePath(); c.fill();
    c.beginPath(); c.moveTo(32,28); c.quadraticCurveTo(60,18,64,50);
    c.lineTo(46,40); c.closePath(); c.fill();
    // Elegant noble body
    c.fillStyle = suit;
    c.fillRect(18,26,28,32);
    // White shirt front
    c.fillStyle = '#f0f0f0';
    c.fillRect(26,28,12,22);
    // Red vest/cravat
    c.fillStyle = cape;
    c.fillRect(28,30,8,16);
    // Arms
    c.fillStyle = suit;
    c.fillRect(8,26,12,22); c.fillRect(44,26,12,22);
    // Pale hands
    c.fillStyle = skin;
    c.fillRect(8,46,12,8); c.fillRect(44,46,12,8);
    // Pale head — noble features
    c.fillStyle = skin;
    c.beginPath(); c.ellipse(32,14,12,14,0,0,Math.PI*2); c.fill();
    // Widow's peak hair
    c.fillStyle = suit;
    c.beginPath(); c.ellipse(32,7,12,7,0,0,Math.PI); c.fill();
    c.beginPath(); c.moveTo(29,10); c.lineTo(32,6); c.lineTo(35,10); c.fill();
    // Glowing red eyes
    c.shadowColor = glow; c.shadowBlur = 10;
    c.fillStyle = glow;
    c.beginPath(); c.arc(27,14,3,0,Math.PI*2); c.fill();
    c.beginPath(); c.arc(37,14,3,0,Math.PI*2); c.fill();
    c.shadowBlur = 0;
    // Fanged grin
    c.fillStyle = suit; c.fillRect(24,20,16,5);
    c.fillStyle = '#fff';
    c.fillRect(28,20,3,4); c.fillRect(33,20,3,4);
    // Legs
    c.fillStyle = suit;
    c.fillRect(18,58,12,6); c.fillRect(34,58,12,6);
}

function drawMyconidSovereign(c, r) {
    const cap   = `rgb(${r.int(140,180)},${r.int(50,90)},${r.int(30,70)})`;
    const stem  = `rgb(${r.int(160,200)},${r.int(140,180)},${r.int(100,140)})`;
    const spot  = `rgb(${r.int(200,240)},${r.int(190,225)},${r.int(160,200)})`;
    const eye   = `rgb(${r.int(150,210)},${r.int(200,240)},${r.int(80,140)})`;
    const spore = `rgba(${r.int(180,230)},${r.int(120,180)},${r.int(0,60)},0.7)`;
    // Wide mushroom cap — large sovereign
    c.fillStyle = cap;
    c.beginPath(); c.ellipse(32,18,28,16,0,0,Math.PI); c.fill();
    c.beginPath(); c.ellipse(32,18,28,6,0,0,Math.PI*2); c.fill();
    // Cap spots
    c.fillStyle = spot;
    c.beginPath(); c.ellipse(20,14,5,4,0,0,Math.PI*2); c.fill();
    c.beginPath(); c.ellipse(32,12,4,3,0,0,Math.PI*2); c.fill();
    c.beginPath(); c.ellipse(44,14,5,4,0,0,Math.PI*2); c.fill();
    c.beginPath(); c.ellipse(26,20,3,2,0,0,Math.PI*2); c.fill();
    c.beginPath(); c.ellipse(38,20,3,2,0,0,Math.PI*2); c.fill();
    // Stem / body
    c.fillStyle = stem;
    c.fillRect(20,22,24,36);
    // Gills under cap
    c.strokeStyle = `rgba(100,50,30,0.4)`; c.lineWidth = 1;
    for (let i=0;i<7;i++) c.beginPath(), c.moveTo(8+i*8,22), c.lineTo(8+i*8,18), c.stroke();
    // Multiple eyes on body
    c.shadowColor = eye; c.shadowBlur = 6;
    c.fillStyle = eye;
    for (const [x,y] of [[26,30],[38,30],[32,40],[26,48],[38,48]]) {
        c.beginPath(); c.ellipse(x,y,3,3,0,0,Math.PI*2); c.fill();
    }
    c.shadowBlur = 0;
    // Spore vents
    c.fillStyle = '#333';
    c.beginPath(); c.ellipse(24,36,3,4,0,0,Math.PI*2); c.fill();
    c.beginPath(); c.ellipse(40,36,3,4,0,0,Math.PI*2); c.fill();
    c.shadowColor = spore; c.shadowBlur = 8;
    c.fillStyle = spore;
    c.beginPath(); c.ellipse(24,32,3,4,0,0,Math.PI*2); c.fill();
    c.beginPath(); c.ellipse(40,32,3,4,0,0,Math.PI*2); c.fill();
    c.shadowBlur = 0;
    // Arms
    c.fillStyle = stem;
    c.fillRect(6,28,16,12); c.fillRect(42,28,16,12);
    // Legs
    c.fillRect(22,56,10,8); c.fillRect(32,56,10,8);
}

// ── New Monsters ──────────────────────────────────────────────────────────

function drawEvilWizard(c, r) {
    const robe = `rgb(${r.int(55,85)},${r.int(8,22)},${r.int(90,130)})`;
    const dark = `rgb(${r.int(25,42)},${r.int(4,12)},${r.int(45,70)})`;
    const trim = `rgb(${r.int(160,210)},${r.int(90,140)},${r.int(210,250)})`;
    const skin = `rgb(${r.int(170,200)},${r.int(150,180)},${r.int(135,165)})`;
    // Robe body
    c.fillStyle = dark;
    c.beginPath();
    c.moveTo(16,24); c.quadraticCurveTo(8,52,4,64);
    c.lineTo(60,64); c.quadraticCurveTo(56,52,48,24);
    c.closePath(); c.fill();
    c.fillStyle = robe;
    c.beginPath();
    c.moveTo(18,26); c.lineTo(10,62); c.lineTo(54,62); c.lineTo(46,26);
    c.closePath(); c.fill();
    // Arcane sigil on robe
    c.shadowColor = trim; c.shadowBlur = 6;
    c.fillStyle = `rgba(${r.int(160,210)},${r.int(90,140)},${r.int(210,250)},0.55)`;
    c.beginPath(); c.arc(32,44,7,0,Math.PI*2); c.fill();
    c.shadowBlur = 0;
    // Staff
    c.strokeStyle = `rgb(${r.int(90,120)},${r.int(65,85)},${r.int(35,55)})`; c.lineWidth = 3;
    c.beginPath(); c.moveTo(58,60); c.lineTo(52,10); c.stroke();
    c.shadowColor = trim; c.shadowBlur = 12;
    c.fillStyle = trim;
    c.beginPath(); c.arc(52,8,5,0,Math.PI*2); c.fill();
    c.shadowBlur = 0;
    // Pointed hat
    c.fillStyle = dark;
    c.beginPath(); c.moveTo(32,0); c.lineTo(12,24); c.lineTo(52,24); c.closePath(); c.fill();
    c.fillRect(10,21,44,5);
    // Face
    c.fillStyle = skin;
    c.beginPath(); c.ellipse(30,28,10,9,0,0,Math.PI*2); c.fill();
    // Glowing purple eyes
    c.shadowColor = trim; c.shadowBlur = 8;
    c.fillStyle = trim;
    c.beginPath(); c.arc(25,26,2.5,0,Math.PI*2); c.fill();
    c.beginPath(); c.arc(34,26,2.5,0,Math.PI*2); c.fill();
    c.shadowBlur = 0;
    // Beard wisps
    c.strokeStyle = `rgb(${r.int(180,210)},${r.int(170,200)},${r.int(160,190)})`; c.lineWidth = 1.5;
    c.beginPath(); c.moveTo(28,33); c.lineTo(26,38); c.stroke();
    c.beginPath(); c.moveTo(32,34); c.lineTo(32,40); c.stroke();
    c.beginPath(); c.moveTo(35,33); c.lineTo(37,38); c.stroke();
    // Arms
    c.fillStyle = robe;
    c.fillRect(4,30,14,18); c.fillRect(46,30,14,18);
    c.fillStyle = skin;
    c.beginPath(); c.ellipse(8,50,5,4,0,0,Math.PI*2); c.fill();
    c.beginPath(); c.ellipse(56,50,5,4,0,0,Math.PI*2); c.fill();
}

function drawDarkTreant(c, r) {
    const bark = `rgb(${r.int(22,42)},${r.int(14,28)},${r.int(8,18)})`;
    const mid  = `rgb(${r.int(38,58)},${r.int(24,40)},${r.int(14,26)})`;
    const eye  = `rgb(${r.int(190,235)},${r.int(70,110)},${r.int(10,30)})`;
    const lich = `rgb(${r.int(38,65)},${r.int(60,90)},${r.int(18,40)})`;
    // Trunk body
    c.fillStyle = bark;
    c.beginPath(); c.moveTo(18,14); c.lineTo(12,64); c.lineTo(52,64); c.lineTo(46,14); c.closePath(); c.fill();
    c.fillStyle = mid;
    c.beginPath(); c.moveTo(22,18); c.lineTo(18,60); c.lineTo(46,60); c.lineTo(42,18); c.closePath(); c.fill();
    // Bark cracks
    c.strokeStyle = bark; c.lineWidth = 2;
    c.beginPath(); c.moveTo(26,22); c.lineTo(24,56); c.stroke();
    c.beginPath(); c.moveTo(38,20); c.lineTo(40,56); c.stroke();
    // Left branch arm
    c.fillStyle = bark;
    c.beginPath(); c.moveTo(16,22); c.lineTo(0,12); c.lineTo(2,18); c.lineTo(0,26); c.lineTo(6,24); c.lineTo(16,34); c.closePath(); c.fill();
    // Right branch arm
    c.beginPath(); c.moveTo(48,22); c.lineTo(64,12); c.lineTo(62,18); c.lineTo(64,26); c.lineTo(58,24); c.lineTo(48,34); c.closePath(); c.fill();
    // Evil glowing eyes
    c.shadowColor = eye; c.shadowBlur = 14;
    c.fillStyle = eye;
    c.beginPath(); c.ellipse(26,28,5,4,0,0,Math.PI*2); c.fill();
    c.beginPath(); c.ellipse(38,28,5,4,0,0,Math.PI*2); c.fill();
    c.shadowBlur = 0;
    c.fillStyle = '#150000';
    c.beginPath(); c.arc(26,28,2,0,Math.PI*2); c.fill();
    c.beginPath(); c.arc(38,28,2,0,Math.PI*2); c.fill();
    // Snarling mouth with bark teeth
    c.strokeStyle = bark; c.lineWidth = 2;
    c.beginPath(); c.moveTo(22,38); c.lineTo(26,40); c.lineTo(32,38); c.lineTo(36,40); c.lineTo(42,38); c.stroke();
    c.fillStyle = `rgb(${r.int(160,195)},${r.int(140,170)},${r.int(90,120)})`;
    for (const [x] of [[24],[28],[32],[36],[40]]) {
        c.fillRect(x,37,3,4);
    }
    // Lichen patches
    c.fillStyle = lich;
    c.beginPath(); c.ellipse(16,48,5,3,0.5,0,Math.PI*2); c.fill();
    c.beginPath(); c.ellipse(46,44,4,5,-0.4,0,Math.PI*2); c.fill();
    // Root feet
    c.fillStyle = bark;
    for (const [x,y] of [[14,62],[20,64],[32,64],[44,62],[48,64]]) {
        c.fillRect(x,y,6,4);
    }
}

function drawMandrakeRoot(c, r) {
    const root  = `rgb(${r.int(155,195)},${r.int(125,160)},${r.int(65,100)})`;
    const dark  = `rgb(${r.int(85,115)},${r.int(65,90)},${r.int(36,60)})`;
    const glow  = `rgb(${r.int(220,255)},${r.int(210,240)},${r.int(50,90)})`;
    const mouth = `rgb(${r.int(170,200)},${r.int(45,70)},${r.int(45,70)})`;
    // Root mass body
    c.fillStyle = root;
    c.beginPath(); c.ellipse(32,40,15,21,0,0,Math.PI*2); c.fill();
    // Head
    c.beginPath(); c.ellipse(32,18,13,12,0,0,Math.PI*2); c.fill();
    // Leaf crown
    c.fillStyle = `rgb(${r.int(38,68)},${r.int(95,135)},${r.int(28,58)})`;
    for (const [x,y,rx,ry,rot] of [[32,6,7,4,0],[24,9,6,3,-0.5],[40,9,6,3,0.5],[28,4,5,3,-0.3],[36,4,5,3,0.3]]) {
        c.save(); c.translate(x,y); c.rotate(rot);
        c.beginPath(); c.ellipse(0,0,rx,ry,0,0,Math.PI*2); c.fill();
        c.restore();
    }
    // Glowing eyes
    c.shadowColor = glow; c.shadowBlur = 8;
    c.fillStyle = glow;
    c.beginPath(); c.arc(27,16,3,0,Math.PI*2); c.fill();
    c.beginPath(); c.arc(37,16,3,0,Math.PI*2); c.fill();
    c.shadowBlur = 0;
    c.fillStyle = '#221100';
    c.beginPath(); c.arc(27,16,1.5,0,Math.PI*2); c.fill();
    c.beginPath(); c.arc(37,16,1.5,0,Math.PI*2); c.fill();
    // Screaming mouth (wide open)
    c.fillStyle = mouth;
    c.beginPath(); c.ellipse(32,24,9,6,0,0,Math.PI*2); c.fill();
    c.fillStyle = '#330000';
    c.beginPath(); c.ellipse(32,25,6,4,0,0,Math.PI*2); c.fill();
    // Root tendrils as arms
    c.strokeStyle = dark; c.lineWidth = 5;
    c.beginPath(); c.moveTo(17,32); c.quadraticCurveTo(4,28,2,20); c.stroke();
    c.beginPath(); c.moveTo(47,32); c.quadraticCurveTo(60,28,62,20); c.stroke();
    c.lineWidth = 3;
    c.beginPath(); c.moveTo(2,20); c.lineTo(0,14); c.stroke();
    c.beginPath(); c.moveTo(2,20); c.lineTo(6,13); c.stroke();
    c.beginPath(); c.moveTo(62,20); c.lineTo(64,14); c.stroke();
    c.beginPath(); c.moveTo(62,20); c.lineTo(58,13); c.stroke();
    // Root legs
    c.lineWidth = 6;
    c.beginPath(); c.moveTo(24,59); c.lineTo(20,64); c.stroke();
    c.beginPath(); c.moveTo(32,61); c.lineTo(32,64); c.stroke();
    c.beginPath(); c.moveTo(40,59); c.lineTo(44,64); c.stroke();
}

function drawKillerVine(c, r) {
    const vine   = `rgb(${r.int(18,48)},${r.int(85,125)},${r.int(18,48)})`;
    const dark   = `rgb(${r.int(8,26)},${r.int(42,62)},${r.int(8,24)})`;
    const thorn  = `rgb(${r.int(115,155)},${r.int(95,125)},${r.int(55,80)})`;
    // Central mass
    c.fillStyle = `rgb(${r.int(25,50)},${r.int(95,135)},${r.int(25,50)})`;
    c.beginPath(); c.ellipse(32,40,13,15,0,0,Math.PI*2); c.fill();
    // Spreading vines — thick stems
    c.strokeStyle = vine; c.lineWidth = 6;
    c.beginPath(); c.moveTo(22,30); c.bezierCurveTo(6,24,2,12,8,4); c.stroke();
    c.beginPath(); c.moveTo(42,30); c.bezierCurveTo(58,24,62,12,56,4); c.stroke();
    c.beginPath(); c.moveTo(22,50); c.bezierCurveTo(6,48,2,56,0,64); c.stroke();
    c.beginPath(); c.moveTo(42,50); c.bezierCurveTo(58,48,62,56,64,64); c.stroke();
    c.lineWidth = 4;
    c.beginPath(); c.moveTo(30,26); c.bezierCurveTo(28,10,20,6,16,0); c.stroke();
    c.beginPath(); c.moveTo(34,26); c.bezierCurveTo(36,10,44,6,48,0); c.stroke();
    // Thorns
    c.fillStyle = thorn;
    for (const [x,y,a] of [[10,8,-0.6],[14,18,0.4],[52,8,0.7],[50,18,-0.4],[4,56,0.9],[60,56,-0.8],[22,6,-0.2],[42,6,0.3]]) {
        c.save(); c.translate(x,y); c.rotate(a);
        c.beginPath(); c.moveTo(0,0); c.lineTo(-2,6); c.lineTo(2,6); c.closePath(); c.fill();
        c.restore();
    }
    // Maw / mouth at center
    c.fillStyle = dark;
    c.beginPath(); c.ellipse(32,42,9,6,0,0,Math.PI*2); c.fill();
    c.fillStyle = thorn;
    for (const x of [25,28,31,34,37]) {
        c.beginPath(); c.moveTo(x,44); c.lineTo(x+1,39); c.lineTo(x+2,44); c.fill();
    }
    // Glowing eyes
    c.shadowColor = '#88ff44'; c.shadowBlur = 8;
    c.fillStyle = '#88ff44';
    c.beginPath(); c.arc(27,33,3,0,Math.PI*2); c.fill();
    c.beginPath(); c.arc(37,33,3,0,Math.PI*2); c.fill();
    c.shadowBlur = 0;
    c.fillStyle = '#112200';
    c.beginPath(); c.arc(27,33,1.5,0,Math.PI*2); c.fill();
    c.beginPath(); c.arc(37,33,1.5,0,Math.PI*2); c.fill();
}

function drawCaveBear(c, r) {
    const fur    = `rgb(${r.int(50,85)},${r.int(38,62)},${r.int(22,42)})`;
    const dark   = `rgb(${r.int(22,40)},${r.int(16,28)},${r.int(8,18)})`;
    const muzzle = `rgb(${r.int(95,125)},${r.int(75,100)},${r.int(55,76)})`;
    const claw   = `rgb(${r.int(185,215)},${r.int(165,190)},${r.int(130,158)})`;
    // Massive body
    c.fillStyle = fur;
    c.beginPath(); c.ellipse(32,46,25,17,0,0,Math.PI*2); c.fill();
    // Shoulder hump
    c.beginPath(); c.ellipse(24,33,18,15,-0.25,0,Math.PI*2); c.fill();
    // Head
    c.beginPath(); c.ellipse(36,20,17,14,0.15,0,Math.PI*2); c.fill();
    // Muzzle
    c.fillStyle = muzzle;
    c.beginPath(); c.ellipse(46,27,10,8,0.25,0,Math.PI*2); c.fill();
    // Nose
    c.fillStyle = dark;
    c.beginPath(); c.ellipse(52,25,4,3,0,0,Math.PI*2); c.fill();
    // Eyes
    c.fillStyle = '#cc4400';
    c.beginPath(); c.arc(32,16,3,0,Math.PI*2); c.fill();
    c.beginPath(); c.arc(42,15,3,0,Math.PI*2); c.fill();
    c.fillStyle = '#111';
    c.beginPath(); c.arc(32,16,1.5,0,Math.PI*2); c.fill();
    c.beginPath(); c.arc(42,15,1.5,0,Math.PI*2); c.fill();
    // Ears
    c.fillStyle = fur;
    c.beginPath(); c.arc(24,8,5,0,Math.PI*2); c.fill();
    c.beginPath(); c.arc(36,8,5,0,Math.PI*2); c.fill();
    // Front legs and paws
    c.fillRect(4,44,14,16); c.fillRect(46,44,14,16);
    c.fillRect(16,56,10,8); c.fillRect(38,56,10,8);
    // Claws
    c.fillStyle = claw;
    for (const x of [4,8,12,48,52,56]) { c.fillRect(x,62,4,4); }
    for (const x of [16,20,40,44]) { c.fillRect(x,62,4,3); }
}

function drawCaveLion(c, r) {
    const fur    = `rgb(${r.int(125,168)},${r.int(96,130)},${r.int(56,88)})`;
    const dark   = `rgb(${r.int(64,96)},${r.int(48,72)},${r.int(26,50)})`;
    const mane   = `rgb(${r.int(52,82)},${r.int(35,56)},${r.int(16,34)})`;
    const claw   = `rgb(${r.int(200,230)},${r.int(185,210)},${r.int(160,186)})`;
    // Body
    c.fillStyle = fur;
    c.beginPath(); c.ellipse(30,46,26,15,0,0,Math.PI*2); c.fill();
    // Mane
    c.fillStyle = mane;
    c.beginPath(); c.ellipse(44,22,21,19,0,0,Math.PI*2); c.fill();
    // Head
    c.fillStyle = fur;
    c.beginPath(); c.ellipse(44,22,15,13,0,0,Math.PI*2); c.fill();
    // Muzzle
    c.fillStyle = `rgb(${r.int(175,208)},${r.int(150,180)},${r.int(105,138)})`;
    c.beginPath(); c.ellipse(52,27,9,7,0.2,0,Math.PI*2); c.fill();
    c.fillStyle = '#3a1608';
    c.beginPath(); c.ellipse(56,24,3,2.5,0,0,Math.PI*2); c.fill();
    // Eyes
    c.fillStyle = '#ffcc00';
    c.beginPath(); c.arc(40,17,3,0,Math.PI*2); c.fill();
    c.beginPath(); c.arc(50,17,3,0,Math.PI*2); c.fill();
    c.fillStyle = '#111';
    c.beginPath(); c.arc(40,17,1.5,0,Math.PI*2); c.fill();
    c.beginPath(); c.arc(50,17,1.5,0,Math.PI*2); c.fill();
    // Ears
    c.fillStyle = fur;
    c.beginPath(); c.moveTo(34,11); c.lineTo(30,4); c.lineTo(38,9); c.fill();
    c.beginPath(); c.moveTo(54,11); c.lineTo(58,4); c.lineTo(60,11); c.fill();
    // Tail with tuft
    c.strokeStyle = fur; c.lineWidth = 5;
    c.beginPath(); c.moveTo(4,42); c.quadraticCurveTo(2,34,6,26); c.stroke();
    c.fillStyle = dark;
    c.beginPath(); c.arc(6,24,6,0,Math.PI*2); c.fill();
    // Legs
    c.fillStyle = fur;
    c.fillRect(12,56,10,8); c.fillRect(26,58,10,6);
    c.fillRect(38,58,10,6); c.fillRect(50,56,10,8);
    // Claws
    c.fillStyle = claw;
    c.fillRect(10,63,4,3); c.fillRect(14,63,4,3);
    c.fillRect(48,63,4,3); c.fillRect(52,63,4,3);
}

function drawWinterWolf(c, r) {
    const fur  = `rgb(${r.int(200,238)},${r.int(218,245)},${r.int(230,255)})`;
    const grey = `rgb(${r.int(140,175)},${r.int(155,190)},${r.int(175,215)})`;
    const ice  = `rgb(${r.int(95,145)},${r.int(175,218)},${r.int(220,255)})`;
    // Body
    c.fillStyle = fur;
    c.beginPath(); c.ellipse(32,44,26,16,0,0,Math.PI*2); c.fill();
    // Neck/shoulder ridge of grey
    c.fillStyle = grey;
    c.beginPath(); c.ellipse(42,32,12,10,0.2,0,Math.PI*2); c.fill();
    // Head
    c.fillStyle = fur;
    c.beginPath(); c.ellipse(50,22,14,12,0.3,0,Math.PI*2); c.fill();
    // Snout
    c.beginPath(); c.ellipse(60,28,9,7,0.4,0,Math.PI*2); c.fill();
    // Nose
    c.fillStyle = '#2a3650';
    c.beginPath(); c.ellipse(65,26,4,3,0,0,Math.PI*2); c.fill();
    // Icy blue eyes
    c.shadowColor = ice; c.shadowBlur = 10;
    c.fillStyle = ice;
    c.beginPath(); c.arc(46,17,3,0,Math.PI*2); c.fill();
    c.beginPath(); c.arc(54,17,3,0,Math.PI*2); c.fill();
    c.shadowBlur = 0;
    c.fillStyle = '#1a3055';
    c.beginPath(); c.arc(46,17,1.5,0,Math.PI*2); c.fill();
    c.beginPath(); c.arc(54,17,1.5,0,Math.PI*2); c.fill();
    // Teeth
    c.fillStyle = '#eef4ff';
    for (const [x,y] of [[58,30],[60,32],[62,30],[64,28]]) {
        c.beginPath(); c.moveTo(x,y); c.lineTo(x+1,y+5); c.lineTo(x+2,y); c.fill();
    }
    // Ears
    c.fillStyle = fur;
    c.beginPath(); c.moveTo(44,11); c.lineTo(40,3); c.lineTo(50,9); c.fill();
    // Tail with ice crystal tip
    c.strokeStyle = fur; c.lineWidth = 6;
    c.beginPath(); c.moveTo(6,40); c.quadraticCurveTo(2,30,8,22); c.stroke();
    c.shadowColor = ice; c.shadowBlur = 10;
    c.fillStyle = ice;
    c.beginPath(); c.arc(8,20,5,0,Math.PI*2); c.fill();
    c.shadowBlur = 0;
    // Legs
    c.fillStyle = fur;
    c.fillRect(14,56,8,8); c.fillRect(24,58,8,6);
    c.fillRect(38,58,8,6); c.fillRect(48,56,8,8);
    // Frost breath haze
    c.fillStyle = 'rgba(150,210,255,0.22)';
    c.beginPath(); c.ellipse(58,33,11,6,0.2,0,Math.PI*2); c.fill();
}

function drawLizardFolk(c, r) {
    const scales = `rgb(${r.int(46,88)},${r.int(108,150)},${r.int(55,90)})`;
    const belly  = `rgb(${r.int(155,198)},${r.int(178,210)},${r.int(135,170)})`;
    const metal  = `rgb(${r.int(75,108)},${r.int(75,108)},${r.int(75,108)})`;
    const trim   = `rgb(${r.int(140,178)},${r.int(118,152)},${r.int(55,88)})`;
    // Bipedal torso
    c.fillStyle = scales;
    c.beginPath(); c.ellipse(32,40,14,20,0,0,Math.PI*2); c.fill();
    c.fillStyle = belly;
    c.beginPath(); c.ellipse(32,42,8,15,0,0,Math.PI*2); c.fill();
    // Head
    c.fillStyle = scales;
    c.beginPath(); c.ellipse(32,18,12,11,0,0,Math.PI*2); c.fill();
    // Snout
    c.beginPath(); c.ellipse(38,24,9,6,0.3,0,Math.PI*2); c.fill();
    // Slit eyes
    c.fillStyle = '#ffcc00';
    c.beginPath(); c.arc(27,14,3,0,Math.PI*2); c.fill();
    c.beginPath(); c.arc(36,14,3,0,Math.PI*2); c.fill();
    c.fillStyle = '#1a0000';
    c.fillRect(26,12,2,4); c.fillRect(35,12,2,4);
    // Crest
    c.fillStyle = `rgb(${r.int(22,50)},${r.int(80,120)},${r.int(22,50)})`;
    for (const [x,y,h] of [[26,8,5],[30,5,7],[34,5,7],[38,8,5]]) {
        c.fillRect(x,y,4,h);
    }
    // Tail
    c.strokeStyle = scales; c.lineWidth = 7;
    c.beginPath(); c.moveTo(18,52); c.quadraticCurveTo(8,56,4,64); c.stroke();
    c.lineWidth = 3;
    c.beginPath(); c.moveTo(4,64); c.lineTo(2,64); c.stroke();
    // Shield arm (left)
    c.fillStyle = scales;
    c.fillRect(10,30,9,20);
    c.fillStyle = metal;
    c.beginPath(); c.ellipse(5,40,8,13,0,0,Math.PI*2); c.fill();
    c.fillStyle = trim;
    c.beginPath(); c.ellipse(5,40,6,11,0,0,Math.PI*2); c.fill();
    c.fillStyle = `rgb(${r.int(165,200)},${r.int(150,180)},${r.int(75,110)})`;
    c.beginPath(); c.arc(5,40,3,0,Math.PI*2); c.fill();
    // Spear arm (right)
    c.fillStyle = scales;
    c.fillRect(45,30,9,20);
    c.strokeStyle = `rgb(${r.int(75,105)},${r.int(58,82)},${r.int(28,52)})`; c.lineWidth = 3;
    c.beginPath(); c.moveTo(58,62); c.lineTo(54,6); c.stroke();
    c.fillStyle = `rgb(${r.int(148,178)},${r.int(138,165)},${r.int(108,135)})`;
    c.beginPath(); c.moveTo(54,6); c.lineTo(50,13); c.lineTo(58,13); c.closePath(); c.fill();
    // Legs
    c.fillStyle = scales;
    c.fillRect(22,58,9,6); c.fillRect(33,58,9,6);
}

function drawDreadCultist(c, r) {
    const robe  = `rgb(${r.int(8,22)},${r.int(6,16)},${r.int(22,42)})`;
    const blood = `rgb(${r.int(125,158)},${r.int(8,22)},${r.int(8,22)})`;
    const sigil = `rgb(${r.int(180,224)},${r.int(40,82)},${r.int(165,205)})`;
    const void_ = '#050008';
    // Dark ragged robe
    c.fillStyle = robe;
    c.beginPath();
    c.moveTo(16,24); c.quadraticCurveTo(6,50,2,64); c.lineTo(12,60);
    c.lineTo(16,64); c.lineTo(20,58); c.lineTo(24,64); c.lineTo(28,60);
    c.lineTo(32,64); c.lineTo(36,60); c.lineTo(40,64); c.lineTo(44,58);
    c.lineTo(48,64); c.lineTo(52,60); c.lineTo(62,64);
    c.quadraticCurveTo(58,50,48,24); c.closePath(); c.fill();
    // Abyssal sigil on chest
    c.fillStyle = blood;
    c.beginPath(); c.arc(32,42,9,0,Math.PI*2); c.fill();
    c.shadowColor = sigil; c.shadowBlur = 10;
    c.fillStyle = sigil;
    c.beginPath(); c.arc(32,42,5,0,Math.PI*2); c.fill();
    // Demonic rune lines
    c.strokeStyle = sigil; c.lineWidth = 1.2;
    c.beginPath(); c.moveTo(24,36); c.lineTo(40,36); c.stroke();
    c.beginPath(); c.moveTo(32,30); c.lineTo(32,42); c.stroke();
    c.beginPath(); c.moveTo(26,48); c.lineTo(38,48); c.stroke();
    c.beginPath(); c.moveTo(24,36); c.lineTo(26,48); c.stroke();
    c.beginPath(); c.moveTo(40,36); c.lineTo(38,48); c.stroke();
    c.shadowBlur = 0;
    // Hood
    c.fillStyle = robe;
    c.beginPath();
    c.moveTo(13,28); c.quadraticCurveTo(32,-3,51,28);
    c.quadraticCurveTo(42,17,32,16); c.quadraticCurveTo(22,17,13,28);
    c.fill();
    // Face void
    c.fillStyle = void_;
    c.beginPath(); c.ellipse(32,22,10,9,0,0.3,Math.PI-0.3); c.fill();
    // Malevolent purple eyes
    c.shadowColor = sigil; c.shadowBlur = 16;
    c.fillStyle = sigil;
    c.beginPath(); c.arc(26,21,2.5,0,Math.PI*2); c.fill();
    c.beginPath(); c.arc(38,21,2.5,0,Math.PI*2); c.fill();
    c.shadowBlur = 0;
    // Dark clawed hands
    c.fillStyle = `rgb(${r.int(8,24)},${r.int(4,14)},${r.int(18,32)})`;
    c.beginPath(); c.ellipse(6,44,7,5,-0.3,0,Math.PI*2); c.fill();
    c.beginPath(); c.ellipse(58,44,7,5,0.3,0,Math.PI*2); c.fill();
    c.fillStyle = `rgb(${r.int(38,65)},${r.int(4,14)},${r.int(38,65)})`;
    for (const [x,y,dx] of [[4,40,-2],[6,37,-1],[8,40,0],[56,40,2],[58,37,1],[60,40,0]]) {
        c.beginPath(); c.moveTo(x,y); c.lineTo(x+dx,y-5); c.lineTo(x+3,y); c.fill();
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
    // New roster batch
    banshee: drawBanshee, lich: drawLich, minotaur: drawMinotaur,
    shadow: drawShadow, ogre: drawOgre, dark_elf: drawDarkElf,
    harpy: drawHarpy, giant_scorpion: drawGiantScorpion,
    wight: drawWight, gargoyle: drawGargoyle,
    phase_spider: drawPhaseSpider, tentacle_horror: drawTentacleHorror,
    ice_troll: drawIceTroll, vampire_spawn: drawVampireSpawn,
    mind_flayer: drawMindFlayer, fire_elemental: drawFireElemental,
    gnoll: drawGnoll, demon_knight: drawDemonKnight,
    naga: drawNaga, gelatinous_cube: drawGelatinousCube,
    grey_ooze:       drawGreyOoze,
    black_pudding:   drawBlackPudding,
    ochre_jelly:     drawOchreJelly,
    // Elementals
    earth_elemental: drawEarthElemental,
    air_elemental:   drawAirElemental,
    water_elemental: drawWaterElemental,
    // Phase 13 new monsters
    dungeon_ape:  drawDungeonApe,
    hag:          drawHag,
    bandit:       drawBandit,
    beholder:     drawBeholder,
    red_dragon:   drawRedDragon,
    black_dragon: drawBlackDragon,
    blue_dragon:  drawBlueDragon,
    green_dragon: drawGreenDragon,
    white_dragon: drawWhiteDragon,
    efreeti:      drawEfreeti,
    ettin:        drawEttin,
    fire_giant:   drawFireGiant,
    ice_giant:    drawIceGiant,
    stone_giant:  drawStoneGiant,
    storm_giant:  drawStormGiant,
    giant_frog:   drawGiantFrog,
    medusa:       drawMedusa,
    hydra:        drawHydra,
    manticore:    drawManticore,
    evil_priest:  drawEvilPriest,
    werewolf:     drawWerewolf,
    yeti:         drawYeti,
    // Phase 14: Level 25+ Deep Dungeon
    ice_demon:        drawIceDemon,
    acid_demon:       drawAcidDemon,
    bloat_demon:      drawBloatDemon,
    dracolich:        drawDracolich,
    evil_necromancer: drawEvilNecromancer,
    hell_hound:       drawHellHound,
    evil_berserker:   drawEvilBerserker,
    // New Undead Roster
    mummy:       drawMummy,
    revenant:    drawRevenant,
    bone_archer: drawBoneArcher,
    poltergeist: drawPoltergeist,
    zombie_giant: drawZombieGiant,
    death_knight: drawDeathKnight,
    // Bestiary Expansion
    succubus:          drawSuccubus,
    chain_devil:       drawChainDevil,
    blood_demon:       drawBloodDemon,
    varkhul_the_chain_tyrant: drawVarkhulChainTyrant,
    azramor_the_ember_crown: drawAzramorEmberCrown,
    thyraxis_the_glass_queen: drawThyraxisGlassQueen,
    ghorvex_the_hungering_void: drawGhorvexHungeringVoid,
    nyrgoth_the_grave_tide: drawNyrgothGraveTide,
    xelthara_the_storm_blade: drawXeltharaStormBlade,
    molkareth_the_pox_scribe: drawMolkarethPoxScribe,
    vaelkor_the_mind_flense: drawVaelkorMindFlense,
    drozhar_the_iron_maw: drawDrozharIronMaw,
    orphiel_the_eclipsed_saint: drawOrphielEclipsedSaint,
    pit_fiend:         drawPitFiend,
    quasit:            drawQuasit,
    giant_crocodile:   drawGiantCrocodile,
    chimera:           drawChimera,
    wyvern:            drawWyvern,
    displacer_beast:   drawDisplacerBeast,
    remorhaz:          drawRemorhaz,
    thunderbird:       drawThunderbird,
    rust_monster:      drawRustMonster,
    witch_doctor:      drawWitchDoctor,
    gladiator:         drawGladiator,
    assassin_lord:     drawAssassinLord,
    battle_mage:       drawBattleMage,
    iron_golem:        drawIronGolem,
    clockwork_horror:  drawClockworkHorror,
    gargoyle_sentinel: drawGargoyleSentinel,
    gibbering_mouther: drawGibberingMouther,
    aboleth:           drawAboleth,
    star_spawn:        drawStarSpawn,
    void_wraith:       drawVoidWraith,
    vampire_lord:      drawVampireLord,
    myconid_sovereign: drawMyconidSovereign,
    // New Monsters
    evil_wizard:   drawEvilWizard,
    dark_treant:   drawDarkTreant,
    mandrake_root: drawMandrakeRoot,
    killer_vine:   drawKillerVine,
    cave_bear:     drawCaveBear,
    cave_lion:     drawCaveLion,
    winter_wolf:   drawWinterWolf,
    lizard_folk:   drawLizardFolk,
    dread_cultist: drawDreadCultist,
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
