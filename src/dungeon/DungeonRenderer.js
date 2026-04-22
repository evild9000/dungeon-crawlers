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

        return this.group;
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
        if (playerPos && this.torchLights.length > ACTIVE_TORCH_LIGHT_CAP) {
            const scored = this.torchLights.map(l => {
                const dx = l.position.x - playerPos.x;
                const dz = l.position.z - playerPos.z;
                return { l, d: dx * dx + dz * dz };
            });
            scored.sort((a, b) => a.d - b.d);
            for (let i = 0; i < scored.length; i++) {
                scored[i].l.visible = i < ACTIVE_TORCH_LIGHT_CAP;
            }
        } else if (playerPos) {
            // Few enough torches → keep all visible.
            for (const l of this.torchLights) l.visible = true;
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
    }
}
