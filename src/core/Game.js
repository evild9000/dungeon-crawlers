import * as THREE from 'three';
import {
    AMBIENT_INTENSITY,
    FOG_COLOR,
    FOG_NEAR,
    FOG_FAR,
} from '../utils/constants.js';
import { InputManager } from './InputManager.js';
import { Player } from '../entities/Player.js';
import { DungeonRenderer } from '../dungeon/DungeonRenderer.js';
import { CollisionSystem } from '../systems/CollisionSystem.js';
import { getDungeonData } from '../dungeon/DungeonGenerator.js';

/**
 * Game — top-level orchestrator.
 *
 * Owns the Three.js renderer, scene, clock, and coordinates
 * the update/render loop for all subsystems.
 */
export class Game {
    constructor() {
        // --- Renderer ---
        this.renderer = new THREE.WebGLRenderer({ antialias: true, preserveDrawingBuffer: true });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this.renderer.shadowMap.enabled = false;
        document.body.appendChild(this.renderer.domElement);

        // --- Scene ---
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(FOG_COLOR);
        this.scene.fog = new THREE.Fog(FOG_COLOR, FOG_NEAR, FOG_FAR);

        // --- Ambient light (very dim — the dungeon is dark) ---
        this.scene.add(new THREE.AmbientLight(0xffffff, AMBIENT_INTENSITY));

        // --- Clock ---
        this.clock = new THREE.Clock();

        // --- Dungeon ---
        const dungeonData = getDungeonData();
        this.dungeonRenderer = new DungeonRenderer();
        this.scene.add(this.dungeonRenderer.build(dungeonData));

        // --- Collision ---
        this.collision = new CollisionSystem(dungeonData.map);

        // --- Input ---
        this.input = new InputManager(this.renderer.domElement);

        // --- Player ---
        this.player = new Player(
            this.input,
            this.collision,
            dungeonData.playerStart.x,
            dungeonData.playerStart.z,
        );
        this.scene.add(this.player.container);

        // --- Overlay ---
        this.overlay = document.getElementById('overlay');
        document.addEventListener('pointerlockchange', () => {
            const locked = document.pointerLockElement === this.renderer.domElement;
            this.overlay.style.display = locked ? 'none' : 'flex';
        });

        // --- Resize ---
        window.addEventListener('resize', () => this._onResize());

        // --- Bind loop ---
        this._loop = this._loop.bind(this);
    }

    start() {
        this.clock.start();
        this._loop();
    }

    _loop() {
        requestAnimationFrame(this._loop);

        // Cap delta to avoid huge jumps after tab-away
        const dt = Math.min(this.clock.getDelta(), 0.1);
        const elapsed = this.clock.elapsedTime;

        // --- Update ---
        this.player.update(dt);
        this.dungeonRenderer.updateTorches(elapsed);

        // --- Render ---
        this.renderer.render(this.scene, this.player.camera);
    }

    _onResize() {
        const w = window.innerWidth;
        const h = window.innerHeight;
        this.renderer.setSize(w, h);
        this.player.onResize(w, h);
    }
}
