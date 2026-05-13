import * as THREE from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import {
    CELL_SIZE,
    WALL_HEIGHT,
    WALL_TORCH_INTENSITY,
    WALL_TORCH_DISTANCE,
    TORCH_COLOR,
    ACTIVE_TORCH_LIGHT_CAP,
    ENABLE_SHADOWS,
} from '../utils/constants.js';
import {
    createWallTexture,
    createFloorTexture,
    createCeilingTexture,
} from '../utils/TextureGenerator.js';

/**
 * DungeonRenderer — converts a 2D grid into merged Three.js geometry.
 *
 * Produces exactly 3 meshes (walls, floor, ceiling) for the entire dungeon,
 * plus PointLights for wall-mounted torches.
 */
export class DungeonRenderer {
    constructor() {
        this.group = new THREE.Group();
        this.torchLights = [];   // references kept for flicker animation
        this.portals = [];       // { kind:'down'|'up', grid:{x,z}, mesh, light }
        this.fountains = [];     // { grid:{x,z}, basin, water, orb, light, basePhase }
        this.chests = [];        // { grid:{x,z}, base,lid,lock,rune,light,basePhase }
    }

    /**
     * Build the 3D dungeon from map data.
     * @param {{ map: number[][], torchPositions: {x:number,z:number}[] }} data
     * @returns {THREE.Group}
     */
    build(data) {
        const { map, torchPositions } = data;
        const rows = map.length;
        const cols = map[0].length;

        // --- Collect geometry for each surface type ---
        const wallGeos = [];
        const floorGeos = [];
        const ceilGeos = [];

        for (let gz = 0; gz < rows; gz++) {
            for (let gx = 0; gx < cols; gx++) {
                if (map[gz][gx] === 1) {
                    // Wall cell — add visible faces
                    this._addWallFaces(wallGeos, map, gx, gz, rows, cols);
                } else {
                    // Floor cell — add floor + ceiling planes
                    floorGeos.push(this._makeFloor(gx, gz));
                    ceilGeos.push(this._makeCeiling(gx, gz));
                }
            }
        }

        // --- Materials ---
        const wallMat = new THREE.MeshStandardMaterial({
            map: createWallTexture(),
            roughness: 0.9,
            metalness: 0.05,
        });
        const floorMat = new THREE.MeshStandardMaterial({
            map: createFloorTexture(),
            roughness: 0.95,
            metalness: 0.02,
        });
        const ceilMat = new THREE.MeshStandardMaterial({
            map: createCeilingTexture(),
            roughness: 1.0,
            metalness: 0.0,
        });

        // --- Merge & create meshes ---
        if (wallGeos.length) {
            const merged = mergeGeometries(wallGeos, false);
            const mesh = new THREE.Mesh(merged, wallMat);
            if (ENABLE_SHADOWS) { mesh.castShadow = true; mesh.receiveShadow = true; }
            this.group.add(mesh);
        }
        if (floorGeos.length) {
            const merged = mergeGeometries(floorGeos, false);
            const mesh = new THREE.Mesh(merged, floorMat);
            if (ENABLE_SHADOWS) mesh.receiveShadow = true;
            this.group.add(mesh);
        }
        if (ceilGeos.length) {
            const merged = mergeGeometries(ceilGeos, false);
            const mesh = new THREE.Mesh(merged, ceilMat);
            if (ENABLE_SHADOWS) mesh.receiveShadow = true;
            this.group.add(mesh);
        }

        // --- Torch lights ---
        // Phase 10: static dungeon torches are gone. The party now carries
        // its own light (PartyLightSystem). We intentionally skip the old
        // _addTorchLight loop here. torchPositions is retained in the data
        // shape for backwards compatibility only.
        void torchPositions;

        // --- Portals ---
        if (data.portalDown) this._addPortal(data.portalDown.x, data.portalDown.z, 'down');
        if (data.portalUp)   this._addPortal(data.portalUp.x,   data.portalUp.z,   'up');

        // --- Fountains ---
        if (data.fountains) {
            for (const f of data.fountains) {
                if (!f.used) this._addFountain(f.x, f.z);
            }
        }

        // --- Magical chests ---
        if (data.chests) {
            for (const c of data.chests) {
                if (!c.used) this._addChest(c.x, c.z);
            }
        }

        return this.group;
    }

    /**
     * Add a glowing magical fountain: stone basin + water column + floating orb.
     * Teal/blue colour with gentle pulse animation. Proximity-triggered in Game.js.
     */
    _addFountain(gx, gz) {
        const CS = CELL_SIZE;
        const cx = (gx + 0.5) * CS;
        const cz = (gz + 0.5) * CS;
        const color = 0x22ddff; // teal-blue

        // Stone basin (flat wide cylinder)
        const basinGeo = new THREE.CylinderGeometry(0.65, 0.55, 0.35, 14);
        const basinMat = new THREE.MeshStandardMaterial({
            color: 0x889aaa,
            roughness: 0.75,
            metalness: 0.2,
        });
        const basin = new THREE.Mesh(basinGeo, basinMat);
        basin.position.set(cx, 0.175, cz);
        this.group.add(basin);

        // Glowing water column rising from the basin
        const waterGeo = new THREE.CylinderGeometry(0.22, 0.32, 0.75, 12, 1, true);
        const waterMat = new THREE.MeshStandardMaterial({
            color: 0x000000,
            emissive: color,
            emissiveIntensity: 1.5,
            transparent: true,
            opacity: 0.65,
            side: THREE.DoubleSide,
            depthWrite: false,
            roughness: 0.3,
            metalness: 0.0,
        });
        const water = new THREE.Mesh(waterGeo, waterMat);
        water.position.set(cx, 0.72, cz);
        this.group.add(water);

        // Floating orb at the top of the column
        const orbGeo = new THREE.SphereGeometry(0.19, 12, 8);
        const orbMat = new THREE.MeshStandardMaterial({
            color: 0x000000,
            emissive: color,
            emissiveIntensity: 2.8,
            transparent: true,
            opacity: 0.9,
            depthWrite: false,
            roughness: 0.2,
            metalness: 0.0,
        });
        const orb = new THREE.Mesh(orbGeo, orbMat);
        orb.position.set(cx, 1.2, cz);
        this.group.add(orb);

        // Shimmering pool disc at basin level
        const poolGeo = new THREE.CircleGeometry(0.5, 16);
        const poolMat = new THREE.MeshStandardMaterial({
            color: 0x000000,
            emissive: color,
            emissiveIntensity: 1.0,
            transparent: true,
            opacity: 0.55,
            side: THREE.DoubleSide,
            depthWrite: false,
        });
        const pool = new THREE.Mesh(poolGeo, poolMat);
        pool.rotation.x = -Math.PI / 2;
        pool.position.set(cx, 0.36, cz);
        this.group.add(pool);

        // Point light
        const light = new THREE.PointLight(color, 1.3, 7, 2);
        light.position.set(cx, 1.0, cz);
        this.group.add(light);

        this.fountains.push({
            grid: { x: gx, z: gz },
            basin, water, orb, pool, light,
            basePhase: Math.random() * Math.PI * 2,
        });
    }

    /**
     * Remove a fountain mesh from the scene (called after the player uses it).
     */
    removeFountain(gx, gz) {
        const idx = this.fountains.findIndex(f => f.grid.x === gx && f.grid.z === gz);
        if (idx === -1) return;
        const f = this.fountains[idx];
        [f.basin, f.water, f.orb, f.pool, f.light].forEach(obj => {
            this.group.remove(obj);
            if (obj.geometry) obj.geometry.dispose();
            if (obj.material) obj.material.dispose();
        });
        this.fountains.splice(idx, 1);
    }

    /**
     * Add a magical chest prop with a subtle arcane glow.
     */
    _addChest(gx, gz) {
        const CS = CELL_SIZE;
        const cx = (gx + 0.5) * CS;
        const cz = (gz + 0.5) * CS;
        const glow = 0xffb347;

        const baseGeo = new THREE.BoxGeometry(0.95, 0.5, 0.7);
        const baseMat = new THREE.MeshStandardMaterial({
            color: 0x5b3218,
            roughness: 0.75,
            metalness: 0.08,
        });
        const base = new THREE.Mesh(baseGeo, baseMat);
        base.position.set(cx, 0.25, cz);
        this.group.add(base);

        const lidGeo = new THREE.BoxGeometry(0.98, 0.22, 0.74);
        const lidMat = new THREE.MeshStandardMaterial({
            color: 0x734325,
            roughness: 0.7,
            metalness: 0.12,
        });
        const lid = new THREE.Mesh(lidGeo, lidMat);
        lid.position.set(cx, 0.62, cz);
        this.group.add(lid);

        const lockGeo = new THREE.BoxGeometry(0.14, 0.16, 0.05);
        const lockMat = new THREE.MeshStandardMaterial({
            color: 0xcda349,
            roughness: 0.3,
            metalness: 0.8,
            emissive: 0x332200,
            emissiveIntensity: 0.5,
        });
        const lock = new THREE.Mesh(lockGeo, lockMat);
        lock.position.set(cx, 0.52, cz + 0.375);
        this.group.add(lock);

        const runeGeo = new THREE.TorusGeometry(0.22, 0.03, 8, 18);
        const runeMat = new THREE.MeshStandardMaterial({
            color: 0x000000,
            emissive: glow,
            emissiveIntensity: 1.5,
            transparent: true,
            opacity: 0.75,
            depthWrite: false,
        });
        const rune = new THREE.Mesh(runeGeo, runeMat);
        rune.rotation.x = -Math.PI / 2;
        rune.position.set(cx, 0.03, cz);
        this.group.add(rune);

        const light = new THREE.PointLight(glow, 0.7, 5.5, 2);
        light.position.set(cx, 0.9, cz);
        this.group.add(light);

        this.chests.push({
            grid: { x: gx, z: gz },
            base,
            lid,
            lock,
            rune,
            light,
            basePhase: Math.random() * Math.PI * 2,
        });
    }

    removeChest(gx, gz) {
        const idx = this.chests.findIndex(c => c.grid.x === gx && c.grid.z === gz);
        if (idx === -1) return;
        const c = this.chests[idx];
        [c.base, c.lid, c.lock, c.rune, c.light].forEach(obj => {
            this.group.remove(obj);
            if (obj.geometry) obj.geometry.dispose();
            if (obj.material) obj.material.dispose();
        });
        this.chests.splice(idx, 1);
    }

    /**
     * Add a glowing vertical portal cylinder with a colored point light.
     * @param {number} gx
     * @param {number} gz
     * @param {'down'|'up'} kind 'down' = red, 'up' = green
     */
    _addPortal(gx, gz, kind) {
        const CS = CELL_SIZE;
        const color = kind === 'down' ? 0xff3322 : 0x33ff66;

        const geo = new THREE.CylinderGeometry(0.9, 0.9, WALL_HEIGHT * 0.85, 16, 1, true);
        const mat = new THREE.MeshStandardMaterial({
            color: 0x000000,
            emissive: color,
            emissiveIntensity: 1.6,
            transparent: true,
            opacity: 0.55,
            side: THREE.DoubleSide,
            depthWrite: false,
            roughness: 0.9,
            metalness: 0.0,
        });
        const mesh = new THREE.Mesh(geo, mat);
        mesh.position.set((gx + 0.5) * CS, WALL_HEIGHT * 0.45, (gz + 0.5) * CS);
        this.group.add(mesh);

        // Inner ring
        const ringGeo = new THREE.RingGeometry(0.35, 0.9, 24);
        const ringMat = new THREE.MeshStandardMaterial({
            color: 0x000000,
            emissive: color,
            emissiveIntensity: 2.0,
            transparent: true,
            opacity: 0.85,
            side: THREE.DoubleSide,
            depthWrite: false,
            roughness: 1.0,
            metalness: 0.0,
        });
        const ring = new THREE.Mesh(ringGeo, ringMat);
        ring.rotation.x = -Math.PI / 2;
        ring.position.set((gx + 0.5) * CS, 0.02, (gz + 0.5) * CS);
        this.group.add(ring);

        // Glow light
        const light = new THREE.PointLight(color, 1.5, 8, 2);
        light.position.set((gx + 0.5) * CS, WALL_HEIGHT * 0.6, (gz + 0.5) * CS);
        this.group.add(light);

        this.portals.push({ kind, grid: { x: gx, z: gz }, mesh, ring, light, basePhase: Math.random() * Math.PI * 2 });
    }

    // ------------------------------------------------------------------
    //  Geometry helpers
    // ------------------------------------------------------------------

    /** For a wall cell, add a plane for every face that borders a floor cell. */
    _addWallFaces(geos, map, gx, gz, rows, cols) {
        const CS = CELL_SIZE;
        const WH = WALL_HEIGHT;

        const isFloor = (x, z) => {
            if (z < 0 || z >= rows || x < 0 || x >= cols) return false;
            return map[z][x] === 0;
        };

        // North face (border at z = gz*CS, facing -Z)
        if (isFloor(gx, gz - 1)) {
            geos.push(this._makeWallPlane(
                (gx + 0.5) * CS, WH / 2, gz * CS,
                CS, WH, 0, Math.PI, 0,
            ));
        }
        // South face (border at z = (gz+1)*CS, facing +Z)
        if (isFloor(gx, gz + 1)) {
            geos.push(this._makeWallPlane(
                (gx + 0.5) * CS, WH / 2, (gz + 1) * CS,
                CS, WH, 0, 0, 0,
            ));
        }
        // West face (border at x = gx*CS, facing -X)
        if (isFloor(gx - 1, gz)) {
            geos.push(this._makeWallPlane(
                gx * CS, WH / 2, (gz + 0.5) * CS,
                CS, WH, 0, -Math.PI / 2, 0,
            ));
        }
        // East face (border at x = (gx+1)*CS, facing +X)
        if (isFloor(gx + 1, gz)) {
            geos.push(this._makeWallPlane(
                (gx + 1) * CS, WH / 2, (gz + 0.5) * CS,
                CS, WH, 0, Math.PI / 2, 0,
            ));
        }
    }

    /** Create a wall plane geometry, positioned and rotated in-place. */
    _makeWallPlane(x, y, z, width, height, rx, ry, rz) {
        const geo = new THREE.PlaneGeometry(width, height);
        const mat = new THREE.Matrix4().compose(
            new THREE.Vector3(x, y, z),
            new THREE.Quaternion().setFromEuler(new THREE.Euler(rx, ry, rz, 'YXZ')),
            new THREE.Vector3(1, 1, 1),
        );
        geo.applyMatrix4(mat);
        return geo;
    }

    /** Floor plane at the bottom of a cell. */
    _makeFloor(gx, gz) {
        const CS = CELL_SIZE;
        const geo = new THREE.PlaneGeometry(CS, CS);
        const mat = new THREE.Matrix4().compose(
            new THREE.Vector3((gx + 0.5) * CS, 0, (gz + 0.5) * CS),
            new THREE.Quaternion().setFromEuler(new THREE.Euler(-Math.PI / 2, 0, 0)),
            new THREE.Vector3(1, 1, 1),
        );
        geo.applyMatrix4(mat);
        return geo;
    }

    /** Ceiling plane at the top of a cell. */
    _makeCeiling(gx, gz) {
        const CS = CELL_SIZE;
        const geo = new THREE.PlaneGeometry(CS, CS);
        const mat = new THREE.Matrix4().compose(
            new THREE.Vector3((gx + 0.5) * CS, WALL_HEIGHT, (gz + 0.5) * CS),
            new THREE.Quaternion().setFromEuler(new THREE.Euler(Math.PI / 2, 0, 0)),
            new THREE.Vector3(1, 1, 1),
        );
        geo.applyMatrix4(mat);
        return geo;
    }

    // ------------------------------------------------------------------
    //  Lighting
    // ------------------------------------------------------------------

    _addTorchLight(gx, gz) {
        const CS = CELL_SIZE;
        const px = (gx + 0.5) * CS;
        const py = WALL_HEIGHT * 0.7;
        const pz = (gz + 0.5) * CS;

        const light = new THREE.PointLight(
            TORCH_COLOR,
            WALL_TORCH_INTENSITY,
            WALL_TORCH_DISTANCE,
            2, // quadratic decay
        );
        light.position.set(px, py, pz);
        light.userData.phase = Math.random() * Math.PI * 2;
        light.userData.baseIntensity = WALL_TORCH_INTENSITY;
        light.userData.gridX = gx;
        light.userData.gridZ = gz;
        light.visible = false; // culling logic decides per frame
        this.group.add(light);
        this.torchLights.push(light);

        // Emissive flame mesh (stays lit even when the PointLight is culled so
        // the torch keeps its bloom silhouette at a distance).
        const flameGeo = new THREE.SphereGeometry(0.18, 8, 6);
        const flameMat = new THREE.MeshStandardMaterial({
            color: 0x000000,
            emissive: TORCH_COLOR,
            emissiveIntensity: 2.2,
            roughness: 1.0,
            metalness: 0.0,
            transparent: true,
            opacity: 0.95,
            depthWrite: false,
        });
        const flame = new THREE.Mesh(flameGeo, flameMat);
        flame.position.set(px, py, pz);
        flame.userData.phase = light.userData.phase;
        this.group.add(flame);
        light.userData.flame = flame;
    }

    /**
     * Flicker torch lights + portal pulse, and cull all but the N nearest
     * PointLights per frame so WebGL stays under its uniform limit on big levels.
     *
     * @param {number} elapsedTime
     * @param {THREE.Vector3} [playerPos] world-space player position
     */
    updateTorches(elapsedTime, playerPos) {
        // --- Dynamic culling: keep the N nearest torches as real lights ---
        // Culling sort is expensive; throttle it to run at most 4× per second.
        const now = elapsedTime;
        if (!this._lastCullTime) this._lastCullTime = 0;
        if (playerPos && (now - this._lastCullTime) > 0.25) {
            this._lastCullTime = now;
            if (this.torchLights.length > ACTIVE_TORCH_LIGHT_CAP) {
                const scored = this.torchLights.map(l => {
                    const dx = l.position.x - playerPos.x;
                    const dz = l.position.z - playerPos.z;
                    return { l, d: dx * dx + dz * dz };
                });
                scored.sort((a, b) => a.d - b.d);
                for (let i = 0; i < scored.length; i++) {
                    scored[i].l.visible = i < ACTIVE_TORCH_LIGHT_CAP;
                }
            } else {
                // Few enough torches → keep all visible.
                for (const l of this.torchLights) l.visible = true;
            }
        }

        // --- Flicker only visible lights (flame meshes always animate) ---
        for (const light of this.torchLights) {
            const phase = light.userData.phase;
            const base = light.userData.baseIntensity;
            const flicker =
                Math.sin(elapsedTime * 4.5 + phase) * 0.15 +
                Math.sin(elapsedTime * 7.3 + phase * 1.7) * 0.08;
            if (light.visible) light.intensity = base + flicker;
            if (light.userData.flame) {
                light.userData.flame.material.emissiveIntensity = 2.0 + flicker * 1.2;
            }
        }
        // Portal pulse + slow rotation
        for (const p of this.portals) {
            const pulse = 0.6 + 0.4 * Math.sin(elapsedTime * 2 + p.basePhase);
            p.mesh.material.opacity = 0.35 + 0.25 * pulse;
            p.mesh.material.emissiveIntensity = 1.2 + 1.2 * pulse;
            if (p.ring) {
                p.ring.rotation.z = elapsedTime * 0.6 + p.basePhase;
                p.ring.material.emissiveIntensity = 1.6 + 1.4 * pulse;
            }
            p.light.intensity = 1.0 + 1.0 * pulse;
        }

        // Fountain pulse — gentle bob + shimmer
        for (const f of this.fountains) {
            const t = elapsedTime * 2.8 + f.basePhase;
            const pulse = 0.5 + 0.5 * Math.sin(t);
            // Orb bobs up and down
            f.orb.position.y = 1.1 + 0.12 * Math.sin(elapsedTime * 1.8 + f.basePhase);
            f.orb.material.emissiveIntensity = 2.2 + 1.2 * pulse;
            // Water column breathes
            f.water.material.opacity = 0.45 + 0.3 * pulse;
            f.water.material.emissiveIntensity = 1.2 + 0.9 * pulse;
            // Pool shimmer
            f.pool.material.opacity = 0.35 + 0.25 * pulse;
            f.pool.rotation.z = elapsedTime * 0.4 + f.basePhase;
            // Light pulses softly
            f.light.intensity = 0.9 + 0.7 * pulse;
        }

        // Magical chest pulse — lock glint + rune spin
        for (const c of this.chests) {
            const t = elapsedTime * 2.1 + c.basePhase;
            const pulse = 0.5 + 0.5 * Math.sin(t);
            c.rune.rotation.z = elapsedTime * 0.5 + c.basePhase;
            c.rune.material.opacity = 0.45 + 0.35 * pulse;
            c.rune.material.emissiveIntensity = 1.1 + 0.9 * pulse;
            c.lock.material.emissiveIntensity = 0.35 + 0.5 * pulse;
            c.light.intensity = 0.45 + 0.55 * pulse;
        }
    }
}
