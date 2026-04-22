import * as THREE from 'three';
import {
    PLAYER_HEIGHT,
    MOVE_SPEED,
    MOUSE_SENSITIVITY,
} from '../utils/constants.js';

/**
 * Player — first-person camera controller.
 *
 * After each update(), check `encounteredEnemy` — if non-null the
 * player's desired movement was blocked by that enemy and the game
 * should trigger combat.
 */
export class Player {
    constructor(inputManager, collisionSystem) {
        this.input = inputManager;
        this.collision = collisionSystem;

        this.yaw = 0;
        this.pitch = 0;

        /** Set per-frame; the enemy that blocked the player (or null). */
        this.encounteredEnemy = null;

        // --- Scene graph: container (yaw) -> camera (pitch) ---
        this.container = new THREE.Object3D();

        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
        this.container.add(this.camera);

        // Phase 10: player no longer has an always-on built-in torch. The
        // PartyLightSystem owns the real point light and attaches itself to
        // `this.container` via attachTo(). The party must kindle a torch,
        // lantern, or Light spell (press T) to illuminate the dungeon.

        // --- Reusable vectors ---
        this._forward = new THREE.Vector3();
        this._right = new THREE.Vector3();
        this._moveDir = new THREE.Vector3();
    }

    // ---- Position save / load ----

    setPosition(worldX, worldZ, yaw = 0, pitch = 0) {
        this.container.position.set(worldX, PLAYER_HEIGHT, worldZ);
        this.yaw = yaw;
        this.pitch = pitch;
        this.container.rotation.y = yaw;
        this.camera.rotation.x = pitch;
    }

    getPosition() {
        return {
            x: this.container.position.x,
            z: this.container.position.z,
            yaw: this.yaw,
            pitch: this.pitch,
        };
    }

    // ---- Per-frame update ----

    update(dt, enemies = []) {
        this.encounteredEnemy = null;
        this._handleMouseLook();
        this._handleMovement(dt, enemies);
    }

    _handleMouseLook() {
        const delta = this.input.consumeMouseDelta();
        this.yaw -= delta.x * MOUSE_SENSITIVITY;
        this.pitch -= delta.y * MOUSE_SENSITIVITY;
        this.pitch = Math.max(-Math.PI * 0.45, Math.min(Math.PI * 0.45, this.pitch));

        this.container.rotation.y = this.yaw;
        this.camera.rotation.x = this.pitch;
    }

    _handleMovement(dt, enemies) {
        this._forward.set(0, 0, -1).applyQuaternion(this.container.quaternion);
        this._forward.y = 0;
        this._forward.normalize();

        this._right.set(1, 0, 0).applyQuaternion(this.container.quaternion);
        this._right.y = 0;
        this._right.normalize();

        this._moveDir.set(0, 0, 0);
        if (this.input.isKeyDown('KeyW') || this.input.isKeyDown('ArrowUp'))    this._moveDir.add(this._forward);
        if (this.input.isKeyDown('KeyS') || this.input.isKeyDown('ArrowDown'))  this._moveDir.sub(this._forward);
        if (this.input.isKeyDown('KeyA') || this.input.isKeyDown('ArrowLeft'))  this._moveDir.sub(this._right);
        if (this.input.isKeyDown('KeyD') || this.input.isKeyDown('ArrowRight')) this._moveDir.add(this._right);

        if (this._moveDir.lengthSq() === 0) return;

        this._moveDir.normalize().multiplyScalar(MOVE_SPEED * dt);

        const pos = this.container.position;
        const resolved = this.collision.resolveMovement(
            pos.x, pos.z,
            pos.x + this._moveDir.x,
            pos.z + this._moveDir.z,
            enemies,
        );
        pos.x = resolved.x;
        pos.z = resolved.z;

        // Propagate encounter info for Game to check
        this.encounteredEnemy = resolved.encounteredEnemy;
    }

    onResize(width, height) {
        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();
    }
}
