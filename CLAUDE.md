# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Running the Game

```bash
npm start
# Opens at http://localhost:3000
```

No build step — raw ES6 modules served directly. Three.js is the only dependency.

## Architecture Overview

**Dungeon Crawlers** — a roguelike dungeon crawler with first-person 3D exploration (Three.js) and turn-based party combat. All code is vanilla JavaScript ES6 modules with no framework or transpilation.

### Entry Point Flow

`index.html` → `src/main.js` → `new Game()` → `game.start()` → `MenuScreen` → character creation → `GameState` created → dungeon generated → gameplay begins.

### State Machine

`Game.js` drives two primary modes:
- **PLAYING** — first-person dungeon exploration, enemy wandering, collision detection
- **COMBAT** — turn-based combat overlay (triggered on enemy collision), handled entirely by `CombatSystem.js`

### Key Files by Role

| File | Role |
|------|------|
| `src/core/Game.js` (~3200 lines) | Top-level orchestrator: state machine, init, update loop, save/load |
| `src/core/GameState.js` | Serializable snapshot of all game data (party, position, gold, time) |
| `src/systems/CombatSystem.js` (~17,900 lines) | Entire turn-based combat engine: initiative, damage, abilities, DoT, status effects, summons |
| `src/ui/CombatUI.js` (~4100 lines) | Combat overlay: enemy cards, action buttons, combat log, loot screen |
| `src/entities/Classes.js` (~1500 lines) | All 19 character classes with stat modifiers, abilities, and per-level scaling |
| `src/entities/PartyMember.js` (~1400 lines) | Recruited character state, combat actions, stat tracking |
| `src/entities/Summons.js` (~1257 lines) | Golems, undead, beasts, elementals, demi-lich, faerie queen logic |
| `src/items/ItemTypes.js` (~1476 lines) | Master item catalog: weapons, armor, trinkets, consumables, crafting recipes |
| `src/utils/constants.js` (~2123 lines) | All game balance tuning: damage formulas, spawn rates, level scaling, enemy stats |
| `src/utils/SpriteGenerator.js` (~5375 lines) | Procedural pixel-art sprite generation for all enemies (canvas-based) |
| `src/ui/PartyHUD.js` (~1470 lines) | Bottom HUD: character portraits, HP/ST/MP bars, equipment icons |
| `src/ui/InventoryUI.js` (~1483 lines) | Inventory and equipment management screen |
| `src/ui/CraftingUI.js` (~1264 lines) | Artificer workshop: potions, scrolls, golems, weapon riders |

### Data Flow Principles

- **GameState is pure data** — no Three.js objects stored in it; fully serializable to IndexedDB
- **CombatSystem operates on plain data** — receives party/enemy arrays, not scene objects
- **Procedural generation is deterministic** — same `dungeonLevel` always produces the same layout (seeded LCG)
- **No static assets** — all sprites, textures, and portraits generated at runtime via canvas

### Character Classes (19 total)

Warrior, Rogue, Ranger, Mage, Cleric, Bard, Druid, Paladin, Necromancer, Warlock, Photomancer, Artificer, Vermin Keeper, Shaman, Psion, Duelist, Swashbuckler, Monk, and more. Class logic lives in `src/entities/Classes.js`; ability resolution during combat lives in `src/systems/CombatSystem.js`.

### Summon/Minion Maintenance Costs

All summoned minions cost MP per round to maintain (2 MP/round per minion for most classes). If a character can't pay maintenance, minions are randomly removed until the cost is met. Class-specific costs are defined in `CombatSystem.js` in the per-round maintenance section.

### Where to Look When Making Changes

- **Combat ability logic / damage formulas** → `src/systems/CombatSystem.js`
- **Class stat scaling / new abilities per level** → `src/entities/Classes.js`
- **Game balance numbers** → `src/utils/constants.js`
- **Item stats / loot tables** → `src/items/ItemTypes.js`
- **Summon/golem/undead behavior** → `src/entities/Summons.js`
- **UI for a specific screen** → matching file in `src/ui/`
- **Enemy definitions and AI** → `src/entities/Enemy.js` and `src/systems/EnemyManager.js`
- **Dungeon generation parameters** → `src/dungeon/DungeonGenerator.js`

### patch_*.js Files

Root-level `patch_*.js` / `patch_*.cjs` files are runtime debugging patches and feature flags applied during development. They are not part of the module graph loaded by the browser automatically.
