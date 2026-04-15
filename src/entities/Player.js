import * as THREE from 'three';
import {
    CELL_SIZE,
    PLAYER_HEIGHT,
    MOVE_SPEED,
    MOUSE_SENSITIVITY,
    PLAYER_TORCH_INTENSITY,
    PLAYER_TORCH_DISTANCE,
    TORCH_COLOR,
} from '../utils/constants.js';

/**
 * Player — first-person camera controller.
 *
 * Uses a container Object3D for yaw (Y-axis rotation) and nests the
 * camera inside for pitch (X-axis rotation). Movement is always
 * relative to the container's facing direction.
 *
 * This entity pattern (position, health, update) will be shared by
 * enemies and bosses in future phases.
 */
export class Player {
    constructor(inputManager, collisionSystem, startGridX, startGridZ) {
        this.input = inputManager;
        this.collision = collisionSystem;

        // Yaw / pitch state
        this.yaw = 0;
        this.pitch = 0;

        // --- Scene graph: container (yaw) → camera (pitch) ---
        this.container = new THREE.Object3D();
        this.container.position.set(
            (startGridX + 0.5) * CELL_SIZE,
            PLAYER_HEIGHT,
            (startGridZ + 0.5) * CELL_SIZE,
        );

        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
        this.container.add(this.camera);

        // --- Player torch (carried light) ---
        this.torch = new THREE.PointLight(
            TORCH_COLOR,
            PLAYER_TORCH_INTENSITY,
            PLAYER_TORCH_DISTANCE,
            2,
        );
        // Offset slightly right and forward for realism
        this.torch.position.set(0.3, -0.2, -0.5);
        this.container.add(this.torch);

        // --- Reusable vectors (avoid per-frame allocation) ---
        this._forward = new THREE.Vector3();
        this._right = new THREE.Vector3();
        this._moveDir = new THREE.Vector3();

        // --- Future: health, mana, inventory ---
        this.health = 100;
        this.maxHealth = 100;
    }

    /** Call once per frame. */
    update(dt) {
        this._handleMouseLook();
        this._handleMovement(dt);
    }

    _handleMouseLook() {
        const delta = this.input.consumeMouseDelta();
        this.yaw -= delta.x * MOUSE_SENSITIVITY;
        this.pitch -= delta.y * MOUSE_SENSITIVITY;
        // Clamp pitch so the player can't flip upside-down
        this.pitch = Math.max(-Math.PI * 0.45, Math.min(Math.PI * 0.45, this.pitch));

        this.container.rotation.y = this.yaw;
        this.camera.rotation.x = this.pitch;
    }

    _handleMovement(dt) {
        // Build facing vectors on the XZ plane
        this._forward.set(0, 0, -1).applyQuaternion(this.container.quaternion);
        this._forward.y = 0;
        this._forward.normalize();

        this._right.set(1, 0, 0).applyQuaternion(this.container.quaternion);
        this._right.y = 0;
        this._right.normalize();

        // Accumulate desired direction
        this._moveDir.set(0, 0, 0);
        if (this.input.isKeyDown('KeyW') || this.input.isKeyDown('ArrowUp'))    this._moveDir.add(this._forward);
        if (this.input.isKeyDown('KeyS') || this.input.isKeyDown('ArrowDown'))  this._moveDir.sub(this._forward);
        if (this.input.isKeyDown('KeyA') || this.input.isKeyDown('ArrowLeft'))  this._moveDir.sub(this._right);
        if (this.input.isKeyDown('KeyD') || this.input.isKeyDown('ArrowRight')) this._moveDir.add(this._right);

        if (this._moveDir.lengthSq() === 0) return;

        this._moveDir.normalize().multiplyScalar(MOVE_SPEED * dt);

        // Resolve with axis-independent collision for wall sliding
        const pos = this.container.position;
        const resolved = this.collision.resolveMovement(
            pos.x, pos.z,
            pos.x + this._moveDir.x,
            pos.z + this._moveDir.z,
        );
        pos.x = resolved.x;
        pos.z = resolved.z;
    }

    /** Handle browser resize. */
    onResize(width, height) {
        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();
    }
}
