import * as THREE from 'three';

function addNoise(ctx, x, y, w, h, amount) {
    for (let i = 0; i < amount; i++) {
        const px = x + Math.random() * w;
        const py = y + Math.random() * h;
        const v = Math.random() * 40 - 20;
        ctx.fillStyle = `rgba(${128 + v}, ${128 + v}, ${128 + v}, 0.06)`;
        ctx.fillRect(px, py, 2, 2);
    }
}

export function createWallTexture() {
    const size = 128;
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');

    // Dark mortar base
    ctx.fillStyle = '#1a1716';
    ctx.fillRect(0, 0, size, size);

    // Stone block layout: 4 rows, alternating offset
    const blockW = 64;
    const blockH = 32;
    const gap = 2;

    for (let row = 0; row < 4; row++) {
        const offset = (row % 2) * (blockW / 2);
        for (let col = -1; col < 3; col++) {
            const x = col * blockW + offset + gap;
            const y = row * blockH + gap;
            const w = blockW - gap * 2;
            const h = blockH - gap * 2;

            const base = 45 + Math.random() * 25;
            ctx.fillStyle = `rgb(${base}, ${base - 4}, ${base - 8})`;
            ctx.fillRect(x, y, w, h);

            // Subtle cracks / variation
            addNoise(ctx, x, y, w, h, 60);

            // Occasional darker streak
            if (Math.random() > 0.5) {
                const sx = x + Math.random() * w * 0.6;
                const sy = y + h * 0.3 + Math.random() * h * 0.4;
                ctx.fillStyle = `rgba(0, 0, 0, 0.12)`;
                ctx.fillRect(sx, sy, Math.random() * 20 + 5, 1);
            }
        }
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.magFilter = THREE.LinearFilter;
    texture.minFilter = THREE.LinearMipmapLinearFilter;
    return texture;
}

export function createFloorTexture() {
    const size = 128;
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');

    // Dark grout
    ctx.fillStyle = '#0f0d0b';
    ctx.fillRect(0, 0, size, size);

    // 2x2 stone tiles
    const tileSize = 64;
    const gap = 2;

    for (let row = 0; row < 2; row++) {
        for (let col = 0; col < 2; col++) {
            const x = col * tileSize + gap;
            const y = row * tileSize + gap;
            const w = tileSize - gap * 2;
            const h = tileSize - gap * 2;

            const base = 32 + Math.random() * 18;
            ctx.fillStyle = `rgb(${base}, ${base - 2}, ${base - 5})`;
            ctx.fillRect(x, y, w, h);

            addNoise(ctx, x, y, w, h, 80);
        }
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    return texture;
}

export function createCeilingTexture() {
    const size = 64;
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');

    // Very dark rough stone
    const base = 22;
    ctx.fillStyle = `rgb(${base}, ${base - 2}, ${base - 3})`;
    ctx.fillRect(0, 0, size, size);

    addNoise(ctx, 0, 0, size, size, 120);

    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    return texture;
}
