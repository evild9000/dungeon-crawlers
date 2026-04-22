import { Game } from './core/Game.js';

const game = new Game();
game.start().catch(err => console.error('Failed to start game:', err));
