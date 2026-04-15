import * as THREE from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import {
    CELL_SIZE,
    WALL_HEIGHT,
    WALL_TORCH_INTENSITY,
    WALL_TORCH_DISTANCE,
    TORCH_COLOR,
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
            this.group.add(new THREE.Mesh(merged, wallMat));
        }
        if (floorGeos.length) {
            const merged = mergeGeometries(floorGeos, false);
            this.group.add(new THREE.Mesh(merged, floorMat));
        }
        if (ceilGeos.length) {
            const merged = mergeGeometries(ceilGeos, false);
            this.group.add(new THREE.Mesh(merged, ceilMat));
        }

        // --- Torch lights ---
        for (const t of torchPositions) {
            this._addTorchLight(t.x, t.z);
        }

        return this.group;
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
                CS, WH, 0, Math.PI / 2, 0,
            ));
        }
        // East face (border at x = (gx+1)*CS, facing +X)
        if (isFloor(gx + 1, gz)) {
            geos.push(this._makeWallPlane(
                (gx + 1) * CS, WH / 2, (gz + 0.5) * CS,
                CS, WH, 0, -Math.PI / 2, 0,
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
        const light = new THREE.PointLight(
            TORCH_COLOR,
            WALL_TORCH_INTENSITY,
            WALL_TORCH_DISTANCE,
            2, // quadratic decay
        );
        light.position.set(
            (gx + 0.5) * CS,
            WALL_HEIGHT * 0.7,       // mount height
            (gz + 0.5) * CS,
        );
        // Random phase for flicker animation
        light.userData.phase = Math.random() * Math.PI * 2;
        light.userData.baseIntensity = WALL_TORCH_INTENSITY;

        this.group.add(light);
        this.torchLights.push(light);
    }

    /** Call each frame for a gentle flicker effect. */
    updateTorches(elapsedTime) {
        for (const light of this.torchLights) {
            const phase = light.userData.phase;
            const base = light.userData.baseIntensity;
            // Combine two sine waves for organic flicker
            light.intensity =
                base +
                Math.sin(elapsedTime * 4.5 + phase) * 0.15 +
                Math.sin(elapsedTime * 7.3 + phase * 1.7) * 0.08;
        }
    }
}
