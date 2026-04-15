/**
 * InputManager — tracks keyboard state and mouse movement.
 * Uses Pointer Lock API for FPS-style mouse look.
 */
export class InputManager {
    constructor(canvas) {
        this.canvas = canvas;
        this.keys = {};
        this.mouseDX = 0;
        this.mouseDY = 0;
        this.pointerLocked = false;

        // --- Keyboard ---
        document.addEventListener('keydown', (e) => {
            this.keys[e.code] = true;
            // Prevent browser scroll on WASD / space / arrows
            if (['Space', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.code)) {
                e.preventDefault();
            }
        });
        document.addEventListener('keyup', (e) => {
            this.keys[e.code] = false;
        });

        // --- Mouse ---
        document.addEventListener('mousemove', (e) => {
            if (this.pointerLocked) {
                this.mouseDX += e.movementX;
                this.mouseDY += e.movementY;
            }
        });

        // --- Pointer lock ---
        canvas.addEventListener('click', () => {
            if (!this.pointerLocked) {
                canvas.requestPointerLock();
            }
        });

        document.addEventListener('pointerlockchange', () => {
            this.pointerLocked = document.pointerLockElement === canvas;
        });
    }

    isKeyDown(code) {
        return !!this.keys[code];
    }

    /** Read and reset accumulated mouse delta since last call. */
    consumeMouseDelta() {
        const dx = this.mouseDX;
        const dy = this.mouseDY;
        this.mouseDX = 0;
        this.mouseDY = 0;
        return { x: dx, y: dy };
    }
}
