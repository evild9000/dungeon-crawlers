import * as THREE from 'three';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { SMAAPass } from 'three/addons/postprocessing/SMAAPass.js';
import {
    CELL_SIZE,
    AMBIENT_INTENSITY,
    FOG_COLOR,
    FOG_NEAR,
    FOG_FAR,
    AUTO_SAVE_INTERVAL,
    ENEMY_INITIAL_COUNT,
    REST_RECOVERY_PERCENT,
    RECRUIT_BASE_COST,
    DUNGEON_PORTAL_RADIUS,
    TRAP_DICE_COUNT, TRAP_DICE_SIDES,
    TRAP_SPOT_BASE, TRAP_SPOT_PER_LEVEL,
    TRAP_DISARM_BASE, TRAP_DISARM_PER_LEVEL,
    TRAP_TREASURE_CHANCE, TRAP_TREASURE_MIN, TRAP_TREASURE_MAX,
    TRAP_TYPES,
    POISON_DURATION_ROUNDS, POISON_DAMAGE_FRACTION,
    BLOOM_STRENGTH, BLOOM_RADIUS, BLOOM_THRESHOLD,
    ENABLE_SHADOWS,
    XP_LEVEL_BASE,
} from '../utils/constants.js';
import { InputManager } from './InputManager.js';
import { SaveManager } from './SaveManager.js';
import { GameState } from './GameState.js';
import { Player } from '../entities/Player.js';
import { PartyMember } from '../entities/PartyMember.js';
import { DungeonRenderer } from '../dungeon/DungeonRenderer.js';
import { CollisionSystem } from '../systems/CollisionSystem.js';
import { EnemyManager } from '../systems/EnemyManager.js';
import { CombatSystem } from '../systems/CombatSystem.js';
import { getDungeonData, PLAYER_START } from '../dungeon/DungeonGenerator.js';
import { MenuScreen } from '../ui/MenuScreen.js';
import { PartyHUD } from '../ui/PartyHUD.js';
import { CombatUI } from '../ui/CombatUI.js';
import { InventoryUI } from '../ui/InventoryUI.js';
import { ShopUI } from '../ui/ShopUI.js';
import { CraftingUI } from '../ui/CraftingUI.js';
import { soundManager } from '../utils/SoundManager.js';
import { CLASSES, CLASS_IDS } from '../entities/Classes.js';
import { SPECIES, SPECIES_IDS } from '../entities/Species.js';
import { PartyLightSystem } from '../systems/PartyLightSystem.js';
import { LightPickerUI } from '../ui/LightPickerUI.js';
import { CompassUI } from '../ui/CompassUI.js';
import { MinimapSystem } from '../systems/MinimapSystem.js';
import { MinimapUI } from '../ui/MinimapUI.js';
import { POISON_EXPLORATION_TICK_SEC } from '../utils/constants.js';
import { PartySpellModal } from '../ui/PartySpellModal.js';

/**
 * Game — top-level orchestrator.
 *
 * State machine: MENU -> PLAYING -> COMBAT -> PLAYING (or MENU on defeat).
 */
const STATE = { MENU: 'menu', PLAYING: 'playing', COMBAT: 'combat' };

export class Game {
    constructor() {
        // --- Renderer ---
        this.renderer = new THREE.WebGLRenderer({ antialias: true, preserveDrawingBuffer: true });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this.renderer.shadowMap.enabled = ENABLE_SHADOWS;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        this.renderer.outputColorSpace = THREE.SRGBColorSpace;
        this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
        this.renderer.toneMappingExposure = 1.6;
        // Use the pre-r0.155 light-intensity units so PointLight `intensity`
        // values aren't silently divided by ~4π. Without this the dungeon
        // reads as near-black no matter how high we push torch intensity.
        if ('useLegacyLights' in this.renderer) this.renderer.useLegacyLights = true;
        document.body.appendChild(this.renderer.domElement);

        // --- Scene ---
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(FOG_COLOR);
        this.scene.fog = new THREE.Fog(FOG_COLOR, FOG_NEAR, FOG_FAR);

        // --- Clock ---
        this.clock = new THREE.Clock(false);

        // --- Input ---
        this.input = new InputManager(this.renderer.domElement);

        // --- Persistence ---
        this.saveManager = new SaveManager();

        // --- Combat engine ---
        this.combatSystem = new CombatSystem();
        this.combatUI = new CombatUI(this.combatSystem);

        // --- Inventory UI ---
        this.inventoryUI = new InventoryUI(
            () => this.gameState,
            () => this._onInventoryChanged(),
        );

        // --- Shop UI ---
        this.shopUI = new ShopUI(
            () => this.gameState,
            () => this._onInventoryChanged(),
        );

        // --- Crafting UI (Artificer workshop, K hotkey) ---
        this.craftingUI = new CraftingUI(
            () => this.gameState,
            () => this._onInventoryChanged(),
            { combatSystem: this.combatSystem, logger: (msg) => this._log(msg) },
        );

        // --- App state ---
        this.state = STATE.MENU;
        this.gameState = null;
        this.player = null;
        this.dungeonRenderer = null;
        this.dungeonData = null;
        this.collision = null;
        this.enemyManager = null;
        this.partyHUD = null;
        this.compassUI = null;
        this.autoSaveTimer = 0;
        this._combatCooldown = 0;

        // --- Party light (Phase 10) ---
        this.partyLight = new PartyLightSystem();
        this.lightPickerUI = new LightPickerUI({
            getState: () => this.gameState,
            getLightSystem: () => this.partyLight,
            onChanged: () => {
                if (this.partyHUD) this.partyHUD.update(this.gameState.party, this.gameState.inventory);
                this._saveNow();
            },
            log: (msg) => this._log(msg),
        });
        this._poisonTickTimer = 0;

        // --- Minimap / fog-of-war (Phase 11) ---
        this.minimapSystem = new MinimapSystem();
        this.minimapUI = new MinimapUI();

        // --- Party Spell Modal (V key) ---
        this.partySpellModal = new PartySpellModal((party) => {
            this._reapplySongEffects();
            this._updateSongTooltip();
            if (this.partyHUD && this.gameState) {
                this.partyHUD.update(this.gameState.party, this.gameState.inventory);
            }
            this._saveNow();
        });

        // --- Active song tooltip (upper-right, below compass) ---
        this._songTooltip = document.createElement('div');
        Object.assign(this._songTooltip.style, {
            position: 'fixed',
            top: '70px',
            right: '20px',
            background: 'rgba(10,10,30,0.82)',
            border: '1px solid #447',
            borderRadius: '6px',
            padding: '4px 10px',
            color: '#ccf',
            fontFamily: 'monospace',
            fontSize: '12px',
            pointerEvents: 'none',
            display: 'none',
            zIndex: '500',
            lineHeight: '1.5',
        });
        document.body.appendChild(this._songTooltip);

        // --- UI refs ---
        this.gameUI       = document.getElementById('game-ui');
        this.pauseOverlay = document.getElementById('pause-overlay');
        this.crosshair    = document.getElementById('crosshair');

        // --- Pause overlay interactions ---
        this.pauseOverlay.addEventListener('click', (e) => {
            if (this.state !== STATE.PLAYING) return;
            if (e.target.id === 'btn-save-exit' || e.target.id === 'btn-save-now') return;
            // Don't grab pointer lock if an overlay is visible
            if (this._anyOverlayOpen()) return;
            this.renderer.domElement.requestPointerLock();
        });
        document.getElementById('btn-save-exit').addEventListener('click', (e) => {
            e.stopPropagation();
            if (this.state !== STATE.PLAYING) return;
            this._quitToMenu();
        });
        const saveNowBtn = document.getElementById('btn-save-now');
        if (saveNowBtn) {
            saveNowBtn.addEventListener('click', async (e) => {
                e.stopPropagation();
                if (this.state !== STATE.PLAYING) return;
                await this._saveNow();
                if (this.partyHUD) this.partyHUD.showToast('Game saved.');
            });
        }

        // --- Help overlay ---
        this._helpOverlay = document.getElementById('help-overlay');
        document.getElementById('btn-close-help')
            .addEventListener('click', () => this._hideHelp());

        // --- Log history overlay ---
        this._logOverlay = document.getElementById('log-overlay');
        this._logContent = document.getElementById('log-content');
        const btnCloseLog = document.getElementById('btn-close-log');
        if (btnCloseLog) btnCloseLog.addEventListener('click', () => this._hideLog());

        // --- Portal confirmation modal ---
        this._portalModal = document.getElementById('portal-modal');
        this._portalTitle = document.getElementById('portal-title');
        this._portalBody  = document.getElementById('portal-body');
        this._portalConfirmBtn = document.getElementById('btn-portal-confirm');
        this._portalCancelBtn  = document.getElementById('btn-portal-cancel');
        if (this._portalCancelBtn) this._portalCancelBtn.addEventListener('click', () => this._hidePortalModal());
        this._portalCooldown = 0;
        this._pendingPortalKind = null;

        // --- Trap modal (Phase 8) ---
        this._trapModal = document.getElementById('trap-modal');
        this._trapTitle = document.getElementById('trap-title');
        this._trapBody  = document.getElementById('trap-body');
        this._trapDisarmBtn = document.getElementById('btn-trap-disarm');
        this._trapSkipBtn   = document.getElementById('btn-trap-skip');
        if (this._trapSkipBtn) this._trapSkipBtn.addEventListener('click', () => this._skipTrap());
        this._pendingTrap = null;

        // --- Bag picker modal (Phase 8 follow-up) ---
        this._bagpickModal  = document.getElementById('bagpick-modal');
        this._bagpickList   = document.getElementById('bagpick-list');
        this._bagpickCancel = document.getElementById('btn-bagpick-cancel');
        if (this._bagpickCancel) this._bagpickCancel.addEventListener('click', () => this._hideBagPicker());

        // --- Recruit modal ---
        this._recruitModal = document.getElementById('recruit-modal');
        this._recruitName = document.getElementById('recruit-name');
        this._recruitClass = document.getElementById('recruit-class');
        this._recruitSpecies = document.getElementById('recruit-species');
        this._recruitError = document.getElementById('recruit-error');
        this._recruitCostEl = document.getElementById('recruit-cost');
        this._recruitClassDesc = document.getElementById('recruit-class-desc');
        this._recruitSpeciesDesc = document.getElementById('recruit-species-desc');
        this._populateRecruitSelects();

        document.getElementById('btn-recruit-confirm').addEventListener('click', () => this._confirmRecruit());
        document.getElementById('btn-recruit-cancel').addEventListener('click', () => this._hideRecruitModal());
        this._recruitName.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') this._confirmRecruit();
        });
        this._recruitName.addEventListener('input', () => {
            this._recruitName.value = this._recruitName.value.replace(/[^a-zA-Z0-9 ]/g, '');
        });
        this._recruitClass.addEventListener('change', () => this._updateRecruitDesc());
        this._recruitSpecies.addEventListener('change', () => this._updateRecruitDesc());

        // --- Hotkey listener ---
        this._onKeyDown = this._onKeyDown.bind(this);
        window.addEventListener('keydown', this._onKeyDown);

        // --- Resize ---
        window.addEventListener('resize', () => this._onResize());

        // --- Render-loop binding ---
        this._loop = this._loop.bind(this);
    }

    async start() {
        await this.saveManager.init();

        this.menuScreen = new MenuScreen(this.saveManager, {
            onNewGame:  (name, classId, speciesId) => this._onNewGame(name, classId, speciesId),
            onLoadGame: (id) => this._onLoadGame(id),
        });
        this.menuScreen.show();

        requestAnimationFrame(this._loop);
    }

    // ────────────────────────────────────────────
    // Overlay helpers
    // ────────────────────────────────────────────

    _anyOverlayOpen() {
        return this.shopUI.isOpen
            || (this.craftingUI && this.craftingUI.isOpen)
            || this.inventoryUI.isGroupOpen
            || this.inventoryUI.isPersonalOpen
            || (this._helpOverlay && this._helpOverlay.style.display === 'flex')
            || (this._recruitModal && this._recruitModal.style.display === 'flex')
            || (this._logOverlay && this._logOverlay.style.display === 'flex')
            || (this._portalModal && this._portalModal.style.display === 'flex')
            || (this._trapModal && this._trapModal.style.display === 'flex')
            || (this._bagpickModal && this._bagpickModal.style.display === 'flex')
            || (this.lightPickerUI && this.lightPickerUI.isOpen)
            || (this.partySpellModal && this.partySpellModal.isOpen);
    }

    // ────────────────────────────────────────────
    // Hotkeys
    // ────────────────────────────────────────────

    _onKeyDown(e) {
        // If the player is typing in an editable field (e.g. the recruit
        // name box), every game hotkey must yield to normal text entry —
        // otherwise 'L' pops the Adventure Log, 'H' the help overlay, etc.
        // We still allow Escape so the modal can be cancelled from the input.
        const t = e.target;
        const isTyping = t && (
            t.tagName === 'INPUT' ||
            t.tagName === 'TEXTAREA' ||
            t.tagName === 'SELECT' ||
            t.isContentEditable
        );
        if (isTyping && e.key !== 'Escape') return;

        if (e.key === 'h' || e.key === 'H') {
            if (this._helpOverlay.style.display === 'flex') this._hideHelp();
            else this._showHelp();
            return;
        }

        // Log history key is always available during PLAYING (even over overlays)
        if ((e.key === 'l' || e.key === 'L') && this.state === STATE.PLAYING) {
            if (this._logOverlay.style.display === 'flex') this._hideLog();
            else this._showLog();
            return;
        }

        if (this.state !== STATE.PLAYING) return;

        // M toggles the minimap at any time (even with other overlays open).
        if ((e.key === 'm' || e.key === 'M') && !isTyping) {
            e.preventDefault();
            this._onToggleMinimap();
            return;
        }

        // Escape can close the minimap when no blocking overlay is open.
        if (e.key === 'Escape' && this.minimapUI && this.minimapUI.isOpen && !this._anyOverlayOpen()) {
            this.minimapUI.hide();
            return;
        }

        if (this._anyOverlayOpen()) {
            if (e.key === 'Escape') {
                if (this.shopUI.isOpen) this.shopUI.hide();
                else if (this.craftingUI && this.craftingUI.isOpen) this.craftingUI.hide();
                else if (this.inventoryUI.isPersonalOpen) this.inventoryUI.hidePersonal();
                else if (this.inventoryUI.isGroupOpen) this.inventoryUI.hideGroup();
                else if (this._recruitModal && this._recruitModal.style.display === 'flex') this._hideRecruitModal();
                else if (this._helpOverlay.style.display === 'flex') this._hideHelp();
                else if (this._logOverlay && this._logOverlay.style.display === 'flex') this._hideLog();
                else if (this._portalModal && this._portalModal.style.display === 'flex') this._hidePortalModal();
                else if (this._trapModal && this._trapModal.style.display === 'flex') this._skipTrap();
                else if (this._bagpickModal && this._bagpickModal.style.display === 'flex') this._hideBagPicker();
                else if (this.lightPickerUI && this.lightPickerUI.isOpen) this.lightPickerUI.hide();
                else if (this.partySpellModal && this.partySpellModal.isOpen) this.partySpellModal.hide();
            }
            return;
        }

        switch (e.key.toLowerCase()) {
            case 'r': e.preventDefault(); this._onRest(); break;
            case 'i': e.preventDefault(); this._onToggleInventory(); break;
            case 'c': e.preventDefault(); this._onRecruit(); break;
            case 'b': e.preventDefault(); this._onOpenBagPicker(); break;
            case 't': e.preventDefault(); this._onOpenLightPicker(); break;
            case 'k': e.preventDefault(); this._onOpenCrafting(); break;
            case 'v': e.preventDefault(); this._onOpenPartySpells(); break;
        }
    }

    _onOpenCrafting() {
        if (!this.craftingUI || !this.gameState) return;
        // Only usable out of combat.
        if (this.state !== STATE.PLAYING) return;
        if (document.pointerLockElement) document.exitPointerLock();
        this.pauseOverlay.style.display = 'none';
        this.craftingUI.show();
    }

    _onToggleMinimap() {
        if (!this.minimapUI || !this.dungeonData || !this.player) return;
        if (this.minimapUI.isOpen) { this.minimapUI.hide(); return; }
        // Show without exiting pointer lock — the minimap is a non-blocking
        // corner widget that stays visible while the player moves.
        const CS = CELL_SIZE;
        this.minimapUI.show(this.dungeonData, this.minimapSystem, {
            gx: Math.floor(this.player.container.position.x / CS),
            gz: Math.floor(this.player.container.position.z / CS),
            yaw: this.player.yaw,
        });
    }

    _onOpenLightPicker() {
        if (!this.lightPickerUI) return;
        if (document.pointerLockElement) document.exitPointerLock();
        this.pauseOverlay.style.display = 'none';
        this.lightPickerUI.show();
    }

    _onOpenPartySpells() {
        if (!this.partySpellModal || !this.gameState) return;
        if (this.state !== STATE.PLAYING) return;
        if (document.pointerLockElement) document.exitPointerLock();
        this.pauseOverlay.style.display = 'none';
        this.partySpellModal.show(this.gameState.party);
    }

    /**
     * Re-derive bard song activeEffects on every party member from each bard's
     * persisted activeSongs list.  Call this on load and after any song change.
     */
    _reapplySongEffects() {
        if (!this.gameState) return;
        PartySpellModal.reapplySongEffects(this.gameState.party);
    }

    /**
     * Update the fixed upper-right tooltip that shows currently active songs.
     */
    _updateSongTooltip() {
        if (!this._songTooltip || !this.gameState) return;
        const lines = [];
        for (const m of this.gameState.party) {
            if (m.classId !== 'bard' || !Array.isArray(m.activeSongs) || m.activeSongs.length === 0) continue;
            const songLabels = { haste: '⚡ Haste', battle: '⚔️ Battle', healing: '💚 Healing' };
            const names = m.activeSongs.map(s => songLabels[s] || s).join(', ');
            lines.push(`🎶 ${m.name}: ${names}`);
        }
        if (lines.length > 0) {
            this._songTooltip.innerHTML = lines.join('<br>');
            this._songTooltip.style.display = 'block';
        } else {
            this._songTooltip.style.display = 'none';
        }
    }

    _showLog() {
        if (!this._logOverlay || !this._logContent) return;
        if (document.pointerLockElement) document.exitPointerLock();
        this._logContent.innerHTML = '';
        const log = (this.gameState && this.gameState.gameLog) || [];
        if (log.length === 0) {
            const div = document.createElement('div');
            div.className = 'log-empty';
            div.textContent = '(No events logged yet.)';
            this._logContent.appendChild(div);
        } else {
            // Show newest at bottom (chronological order)
            for (const entry of log) {
                const div = document.createElement('div');
                div.className = 'log-entry';
                div.textContent = entry;
                this._logContent.appendChild(div);
            }
            this._logContent.scrollTop = this._logContent.scrollHeight;
        }
        this._logOverlay.style.display = 'flex';
    }
    _hideLog() { if (this._logOverlay) this._logOverlay.style.display = 'none'; }

    /** Append a message to the persistent game log. */
    _log(msg) {
        if (!msg) return;
        if (!this.gameState) return;
        if (!Array.isArray(this.gameState.gameLog)) this.gameState.gameLog = [];
        this.gameState.gameLog.push(msg);
        if (this.gameState.gameLog.length > 500) this.gameState.gameLog.shift();
    }

    _showHelp() {
        this._helpOverlay.style.display = 'flex';
        // Release pointer lock so the help can be scrolled/interacted with
        if (document.pointerLockElement) document.exitPointerLock();
    }
    _hideHelp() {
        this._helpOverlay.style.display = 'none';
    }

    /**
     * B hotkey: release pointer lock and open a character-picker overlay so
     * the player can click which party member's bag to open. The list shows
     * every living member (summons included are skipped — they can't carry
     * items). Cancel returns to play without choosing.
     */
    _onOpenBagPicker() {
        if (!this.gameState || !this.gameState.party || this.gameState.party.length === 0) return;
        if (!this._bagpickModal || !this._bagpickList) {
            // Fallback to legacy behaviour if the overlay is not present
            const first = this.gameState.party.find(m => m.health > 0) || this.gameState.party[0];
            if (first) this._onPersonalInventory(first.id);
            return;
        }
        if (document.pointerLockElement) document.exitPointerLock();
        this.pauseOverlay.style.display = 'none';

        // Build one row per party member
        this._bagpickList.innerHTML = '';
        for (const m of this.gameState.party) {
            if (m.isSummoned) continue; // summons don't carry gear
            const row = document.createElement('div');
            row.className = 'bagpick-row' + (m.health <= 0 ? ' dead' : '');

            const cls = CLASSES[m.classId];
            const clsName = cls ? `${cls.icon} ${cls.name}` : m.classId;

            const nameEl = document.createElement('div');
            nameEl.className = 'bagpick-name';
            nameEl.textContent = m.name;

            const clsEl = document.createElement('div');
            clsEl.className = 'bagpick-class';
            clsEl.textContent = `${clsName} L${m.level}`;

            const hpEl = document.createElement('div');
            hpEl.className = 'bagpick-hp';
            hpEl.textContent = m.health <= 0 ? 'Fallen' : `HP ${m.health}/${m.maxHealth}`;

            row.appendChild(nameEl);
            row.appendChild(clsEl);
            row.appendChild(hpEl);

            if (m.health > 0) {
                row.addEventListener('click', () => {
                    this._hideBagPicker();
                    this._onPersonalInventory(m.id);
                });
            }
            this._bagpickList.appendChild(row);
        }
        this._bagpickModal.style.display = 'flex';
    }

    _hideBagPicker() {
        if (this._bagpickModal) this._bagpickModal.style.display = 'none';
    }

    // ────────────────────────────────────────────
    // Menu -> Game transitions
    // ────────────────────────────────────────────

    async _onNewGame(playerName, classId = 'warrior', speciesId = 'human') {
        const saves = await this.saveManager.listSaves();
        const saveName = `Adventure #${saves.length + 1}`;
        this.gameState = GameState.createNew(saveName, playerName, classId, speciesId);

        const data = this.gameState.toSaveData();
        const id = await this.saveManager.save(data);
        this.gameState.saveId = id;

        this._enterGame(true);
    }

    async _onLoadGame(saveId) {
        const data = await this.saveManager.load(saveId);
        if (!data) return;
        this.gameState = GameState.fromSaveData(data);
        this._enterGame(false);
    }

    _enterGame(isNew) {
        this.menuScreen.hide();
        this._buildScene(isNew);
        // Re-derive bard song effects from the persisted activeSongs lists
        // (needed on load; harmless on new game where no songs are active).
        this._reapplySongEffects();
        this._updateSongTooltip();
        this.state = STATE.PLAYING;
        this.gameUI.style.display = 'block';
        this.pauseOverlay.style.display = 'flex';
        this.clock = new THREE.Clock();
        this.autoSaveTimer = 0;
        this._combatCooldown = 0;

        this._onPointerLockChange = () => {
            if (this.state !== STATE.PLAYING) return;
            const locked = document.pointerLockElement === this.renderer.domElement;
            // If an overlay is open we never want to show the pause overlay behind it
            if (this._anyOverlayOpen()) {
                this.pauseOverlay.style.display = 'none';
                this.crosshair.style.display = 'none';
                return;
            }
            this.pauseOverlay.style.display = locked ? 'none' : 'flex';
            this.crosshair.style.display = locked ? 'block' : 'none';
        };
        document.addEventListener('pointerlockchange', this._onPointerLockChange);
    }

    _quitToMenu() {
        this._saveNow();
        document.exitPointerLock();
        this._clearScene();
        this.state = STATE.MENU;
        this.gameUI.style.display = 'none';
        this.pauseOverlay.style.display = 'none';
        this.crosshair.style.display = 'none';
        this.inventoryUI.hideGroup();
        this.inventoryUI.hidePersonal();
        this.shopUI.hide();
        if (this.craftingUI) this.craftingUI.hide();
        this._hideHelp();
        this._hideRecruitModal();
        if (this._onPointerLockChange) {
            document.removeEventListener('pointerlockchange', this._onPointerLockChange);
        }
        this.menuScreen.show();
    }

    // ────────────────────────────────────────────
    // Scene lifecycle
    // ────────────────────────────────────────────

    _buildScene(isNew) {
        this._clearScene();

        this.scene.add(new THREE.AmbientLight(0xffffff, AMBIENT_INTENSITY));

        const dLvl = this.gameState.dungeonLevel || 1;
        this.dungeonData = getDungeonData(dLvl);
        this.dungeonRenderer = new DungeonRenderer();
        this.scene.add(this.dungeonRenderer.build(this.dungeonData));

        this.collision = new CollisionSystem(this.dungeonData.map);

        this.player = new Player(this.input, this.collision);
        let pos = this.gameState.playerPosition;
        // Safety net: if the saved (or default) position is inside a wall —
        // e.g. an old 20×20 save loaded into a 40×40 procedural dungeon —
        // snap to the level's procedural start cell so we never spawn stuck.
        const pgx = Math.floor(pos.x / CELL_SIZE);
        const pgz = Math.floor(pos.z / CELL_SIZE);
        const map = this.dungeonData.map;
        const inBounds = pgz >= 0 && pgz < map.length && pgx >= 0 && pgx < map[0].length;
        if (!inBounds || map[pgz][pgx] !== 0) {
            const s = this.dungeonData.playerStart;
            pos = {
                x: (s.x + 0.5) * CELL_SIZE,
                z: (s.z + 0.5) * CELL_SIZE,
                yaw: 0, pitch: 0,
            };
            this.gameState.playerPosition = pos;
        }
        this.player.setPosition(pos.x, pos.z, pos.yaw, pos.pitch);
        this.scene.add(this.player.container);

        // Phase 10 — attach the party's portable light to the player container.
        // Restore any active light that was burning when the game was saved.
        this.partyLight.extinguish();
        this.partyLight.attachTo(this.player.container);
        if (this.gameState.activeLight) {
            this.partyLight.restore(this.gameState.activeLight);
        }

        // Phase 11 — restore per-level fog-of-war from the save.
        if (this.gameState.explored) {
            this.minimapSystem.restore(this.gameState.explored);
        }

        // --- Post-processing composer (built lazily once the camera exists) ---
        this._initComposer(this.player.camera);

        this.enemyManager = new EnemyManager(this.scene, this.dungeonData.map, dLvl);
        if (this.gameState.enemies.length) {
            this.enemyManager.loadFromData(this.gameState.enemies);
        } else if (isNew) {
            const startGX = Math.floor(pos.x / CELL_SIZE);
            const startGZ = Math.floor(pos.z / CELL_SIZE);
            this.enemyManager.spawnInitialEnemies(ENEMY_INITIAL_COUNT, startGX, startGZ);
        }

        this.partyHUD = new PartyHUD({
            onRest: () => this._onRest(),
            onRecruit: () => this._onRecruit(),
            onInventory: () => this._onToggleInventory(),
            onPersonalInventory: (id) => this._onPersonalInventory(id),
            onOpenLightPicker: () => this._onOpenLightPicker(),
            onOpenCrafting: () => this._onOpenCrafting(),
        });
        this.partyHUD.update(this.gameState.party, this.gameState.inventory);
        this.partyHUD.show();

        this.compassUI = new CompassUI();
        this.compassUI.setYaw(this.player.yaw);
        this.compassUI.setDungeonLevel(this.gameState.dungeonLevel || 1);

        // Phase 11 — ensure the minimap has a grid for this level and reveal
        // the starting cell so the player opens the map to *something*.
        this.minimapSystem.ensureLevel(dLvl, this.dungeonData.rows, this.dungeonData.cols);
        const sgx = Math.floor(this.player.container.position.x / CELL_SIZE);
        const sgz = Math.floor(this.player.container.position.z / CELL_SIZE);
        this.minimapSystem.reveal(dLvl, sgx, sgz);
    }

    _clearScene() {
        while (this.scene.children.length) {
            this.scene.remove(this.scene.children[0]);
        }
        if (this.enemyManager) { this.enemyManager.removeAll(); this.enemyManager = null; }
        if (this.partyHUD)     { this.partyHUD.destroy(); this.partyHUD = null; }
        if (this.compassUI)    { this.compassUI.destroy(); this.compassUI = null; }
        if (this.minimapUI && this.minimapUI.isOpen) this.minimapUI.hide();
        this.player = null;
        this.dungeonRenderer = null;
        this.dungeonData = null;
        this.collision = null;
    }

    /**
     * Lazily set up the EffectComposer post-processing chain:
     *   RenderPass -> UnrealBloomPass -> SMAAPass
     * Builds once, and just swaps `renderPass.camera` on subsequent builds.
     */
    _initComposer(camera) {
        const w = window.innerWidth;
        const h = window.innerHeight;
        if (!this.composer) {
            this.composer = new EffectComposer(this.renderer);
            this.composer.setSize(w, h);

            this.renderPass = new RenderPass(this.scene, camera);
            this.composer.addPass(this.renderPass);

            this.bloomPass = new UnrealBloomPass(
                new THREE.Vector2(w, h),
                BLOOM_STRENGTH,
                BLOOM_RADIUS,
                BLOOM_THRESHOLD,
            );
            this.composer.addPass(this.bloomPass);

            // SMAA last → smooths edges after bloom.
            const pixelRatio = this.renderer.getPixelRatio();
            this.smaaPass = new SMAAPass(w * pixelRatio, h * pixelRatio);
            this.composer.addPass(this.smaaPass);
        } else {
            this.renderPass.camera = camera;
        }
    }

    // ────────────────────────────────────────────
    // Game loop
    // ────────────────────────────────────────────

    _loop() {
        requestAnimationFrame(this._loop);

        if (this.state === STATE.MENU || !this.player) return;

        const dt = Math.min(this.clock.getDelta(), 0.1);
        const elapsed = this.clock.elapsedTime;

        // --- Regen: tick on every frame during PLAYING (even if paused/in overlay) ---
        if (this.state === STATE.PLAYING && this.gameState && dt > 0) {
            let anyChange = false;
            for (const m of this.gameState.party) {
                const beforeH = m.health, beforeS = m.stamina, beforeM = m.mana;
                m.tickRegen(dt);
                if (m.health !== beforeH || m.stamina !== beforeS || m.mana !== beforeM) {
                    anyChange = true;
                }
            }
            // Throttle HUD updates to 10fps — DOM bar updates are expensive at 60fps.
            if (!this._hudRegenTimer) this._hudRegenTimer = 0;
            this._hudRegenTimer += dt;
            if (anyChange && this.partyHUD && this._hudRegenTimer >= 0.1) {
                this._hudRegenTimer = 0;
                this.partyHUD.update(this.gameState.party, this.gameState.inventory);
            }
        }

        // --- Exploration: only when pointer locked ---
        if (this.state === STATE.PLAYING && this.input.pointerLocked) {
            const enemies = this.enemyManager.getEnemies();
            this.player.update(dt, enemies);

            if (this._portalCooldown > 0) this._portalCooldown -= dt;

            if (this._combatCooldown > 0) {
                this._combatCooldown -= dt;
            } else if (this.player.encounteredEnemy) {
                const encountered = this.player.encounteredEnemy;
                if (encountered.friendly) this._openShop();
                else this._startCombat(encountered);
                return;
            }

            // Portal proximity check
            if (this._portalCooldown <= 0) this._checkPortals();

            // Trap proximity check (Phase 8)
            this._checkTraps();

            const playerGX = Math.floor(this.player.container.position.x / CELL_SIZE);
            const playerGZ = Math.floor(this.player.container.position.z / CELL_SIZE);

            // Phase 11 — reveal minimap cells around the party every frame.
            // Cheap: 49 cells/update at radius 3. No raycast, walls still
            // render so the shape of the dungeon reads cleanly.
            this.minimapSystem.reveal(this.gameState.dungeonLevel || 1, playerGX, playerGZ);

            // Keep the corner minimap widget in sync with player movement.
            if (this.minimapUI && this.minimapUI.isOpen) {
                this.minimapUI.updatePlayer({
                    gx: playerGX, gz: playerGZ, yaw: this.player.yaw,
                });
            }

            this.gameState.lastSpawnTime = this.enemyManager.update(
                dt,
                this.gameState.gameTime,
                this.gameState.lastSpawnTime,
                playerGX,
                playerGZ,
            );

            if (this._combatCooldown <= 0) {
                if (this.enemyManager.encounteringEnemies.length > 0) {
                    this._startCombat(this.enemyManager.encounteringEnemies[0]);
                    return;
                }
                if (this.enemyManager.encounteringFriendlies.length > 0) {
                    this._openShop();
                    return;
                }
            }

            this.gameState.gameTime += dt;

            // Party light burns only during exploration (combat pauses here).
            if (this.partyLight) {
                this.partyLight.update(dt, elapsed);
                const wasLit = !!this.gameState.activeLight;
                this.gameState.activeLight = this.partyLight.serialize();
                if (wasLit && !this.gameState.activeLight) {
                    this._log('\u{1F319} Your light source has burned out.');
                    if (this.partyHUD) this.partyHUD.showToast('Your light goes out!');
                }
                if (this.partyHUD) this.partyHUD.setLightStatus(
                    this.partyLight.currentLabel(),
                    this.partyLight.remaining(),
                );
            }

            // Out-of-combat poison tick — every POISON_EXPLORATION_TICK_SEC
            // of exploration time. Each living poisoned member takes one
            // stack of damage and the rounds counter decrements.
            this._poisonTickTimer += dt;
            if (this._poisonTickTimer >= POISON_EXPLORATION_TICK_SEC) {
                this._poisonTickTimer -= POISON_EXPLORATION_TICK_SEC;
                this._tickExplorationPoison();
            }

            this.autoSaveTimer += dt;
            if (this.autoSaveTimer >= AUTO_SAVE_INTERVAL) {
                this.autoSaveTimer = 0;
                this._saveNow();
            }
        }

        if (this.dungeonRenderer) {
            this.dungeonRenderer.updateTorches(elapsed, this.player.container.position);
        }
        if (this.compassUI) {
            this.compassUI.setYaw(this.player.yaw);
        }
        if (this.composer) {
            this.composer.render();
        } else {
            this.renderer.render(this.scene, this.player.camera);
        }
    }

    // ────────────────────────────────────────────
    // Combat
    // ────────────────────────────────────────────

    _startCombat(triggerEnemy) {
        const nearby = this._gatherCombatGroup(triggerEnemy);

        document.exitPointerLock();
        this.state = STATE.COMBAT;
        this.pauseOverlay.style.display = 'none';
        this.crosshair.style.display = 'none';
        if (this.inventoryUI) this.inventoryUI._inCombat = true;

        this._combatLogCursor = 0;
        this.combatSystem.onUpdate = () => {
            this.combatUI._refresh();
            this.partyHUD.update(this.gameState.party, this.gameState.inventory);
            // Mirror new combat log lines into the persistent game log
            const log = this.combatSystem.log;
            while (this._combatLogCursor < log.length) {
                this._log(log[this._combatLogCursor++]);
            }
        };

        this.combatSystem.startCombat(this.gameState.party, nearby, this.gameState.dungeonLevel || 1, this.gameState.inventory);
        this.combatUI.show((result) => this._onCombatEnd(result));
    }

    _gatherCombatGroup(trigger) {
        const gx = trigger.gridX;
        const gz = trigger.gridZ;
        // Phase 8 rule 5: always bring at least N=partySize enemies into the fight
        // (counting summons is weird — use only non-summoned characters for the size).
        const partySize = Math.max(1, this.gameState.party.filter(m => !m.isSummoned).length);
        const group = new Set([trigger]);

        // Step 1 — pull any hostile adjacent to the trigger.
        for (const e of this.enemyManager.getEnemies()) {
            if (e.health <= 0 || e.friendly) continue;
            if (Math.abs(e.gridX - gx) <= 1 && Math.abs(e.gridZ - gz) <= 1) {
                group.add(e);
            }
        }

        // Step 2 — if still short, recruit the nearest living hostiles.
        if (group.size < partySize) {
            const allAlive = this.enemyManager.getEnemies()
                .filter(e => e.health > 0 && !e.friendly && !group.has(e));
            allAlive.sort((a, b) => {
                const da = Math.abs(a.gridX - gx) + Math.abs(a.gridZ - gz);
                const db = Math.abs(b.gridX - gx) + Math.abs(b.gridZ - gz);
                return da - db;
            });
            for (const e of allAlive) {
                if (group.size >= partySize) break;
                group.add(e);
            }
        }

        // Step 3 — still short? Force-spawn fresh enemies near the trigger so
        // there's always at least one foe per party member (rule 5).
        if (group.size < partySize) {
            const need = partySize - group.size;
            const fresh = this.enemyManager.forceSpawnNear(gx, gz, need, trigger.type);
            for (const e of fresh) group.add(e);
        }

        return [...group];
    }

    _onCombatEnd(result) {
        if (result === 'victory') {
            for (const e of this.combatSystem.enemies) {
                if (e.health <= 0) this.enemyManager.removeEnemy(e);
            }
            if (this.combatSystem.loot) {
                const loot = this.combatSystem.loot;
                if (loot.gold > 0) this.gameState.inventory.addGold(loot.gold);
                for (const item of loot.items) {
                    this.gameState.inventory.addItem(item.itemId, item.quantity);
                }
            }
        }

        // Phase 8: summons only live for the duration of the fight. Strip them
        // from gameState.party (they were pushed in by CombatSystem) and clear
        // any lingering combat state on the real characters.
        // Phase 12: PERSISTENT summons (isPersistent=true — e.g. artificer golems)
        // survive combat. Dead persistent summons stay removed (permadeath).
        this.gameState.party = this.gameState.party.filter(m => {
            if (!m.isSummoned) return true;
            if (m.isPersistent && m.health > 0) return true;
            return false;
        });
        for (const m of this.gameState.party) {
            if (typeof m.clearCombatState === 'function') m.clearCombatState();
        }

        this.partyHUD.update(this.gameState.party, this.gameState.inventory);
        if (this.inventoryUI) this.inventoryUI._inCombat = false;

        if (result === 'defeat') {
            this._clearScene();
            this.state = STATE.MENU;
            this.gameUI.style.display = 'none';
            this.pauseOverlay.style.display = 'none';
            this.crosshair.style.display = 'none';
            if (this._onPointerLockChange) {
                document.removeEventListener('pointerlockchange', this._onPointerLockChange);
            }
            this.menuScreen.show();
            return;
        }

        this.state = STATE.PLAYING;
        this.pauseOverlay.style.display = 'flex';
        this._combatCooldown = 1.5;

        this._saveNow();
    }

    // ────────────────────────────────────────────
    // Portal proximity & transition
    // ────────────────────────────────────────────

    _checkPortals() {
        if (!this.dungeonData || !this.player) return;
        if (this._portalModal && this._portalModal.style.display === 'flex') return;
        const pos = this.player.container.position;

        const check = (portal, kind) => {
            if (!portal) return false;
            const cx = (portal.x + 0.5) * CELL_SIZE;
            const cz = (portal.z + 0.5) * CELL_SIZE;
            const dx = pos.x - cx, dz = pos.z - cz;
            if (dx * dx + dz * dz <= DUNGEON_PORTAL_RADIUS * DUNGEON_PORTAL_RADIUS) {
                this._showPortalModal(kind);
                return true;
            }
            return false;
        };

        if (check(this.dungeonData.portalDown, 'down')) return;
        if (check(this.dungeonData.portalUp,   'up')) return;
    }

    _showPortalModal(kind) {
        if (!this._portalModal) return;
        this._pendingPortalKind = kind;
        if (document.pointerLockElement) document.exitPointerLock();
        this.pauseOverlay.style.display = 'none';

        const curLvl = this.gameState.dungeonLevel || 1;
        const nextLvl = kind === 'down' ? curLvl + 1 : curLvl - 1;

        if (this._portalTitle) {
            this._portalTitle.textContent = kind === 'down'
                ? '\u{1F7E5} Descend Deeper'
                : '\u{1F7E9} Return to Shallower Floor';
        }
        if (this._portalBody) {
            this._portalBody.textContent = kind === 'down'
                ? `A red portal pulses before you. Descend to dungeon level ${nextLvl}? Monsters grow stronger the deeper you go — but loot and XP are richer too.`
                : `A green portal swirls before you. Return to dungeon level ${nextLvl}? The floor will be regenerated with fresh inhabitants.`;
        }
        // Re-bind confirm button (fresh closure)
        const btn = this._portalConfirmBtn;
        if (btn) {
            const clone = btn.cloneNode(true);
            btn.parentNode.replaceChild(clone, btn);
            this._portalConfirmBtn = clone;
            this._portalConfirmBtn.addEventListener('click', () => this._confirmPortal());
        }
        // Toggle colour variant on the modal-content box.
        const box = document.getElementById('portal-modal-content');
        if (box) box.classList.toggle('portal-up', kind === 'up');
        this._portalModal.style.display = 'flex';
    }

    _hidePortalModal() {
        if (this._portalModal) this._portalModal.style.display = 'none';
        this._pendingPortalKind = null;
        // Cooldown prevents re-triggering the modal while the player is still
        // standing on the portal cell.
        this._portalCooldown = 1.5;
    }

    _confirmPortal() {
        const kind = this._pendingPortalKind;
        if (!kind) return;
        const cur = this.gameState.dungeonLevel || 1;
        const nextLvl = kind === 'down' ? cur + 1 : cur - 1;
        if (nextLvl < 1) { this._hidePortalModal(); return; }

        this.gameState.dungeonLevel = nextLvl;
        // Reset enemies for new floor (only current floor is active)
        this.gameState.enemies = [];
        // Arrive at the connecting portal on the destination floor:
        // going down → land at the up-portal on the new floor (so you can return)
        // going up   → land at the down-portal on the new floor (so you can descend again)
        const nextData = getDungeonData(nextLvl);
        const arrivalCell = (kind === 'down' ? nextData.portalUp : nextData.portalDown)
                          || nextData.playerStart;
        this.gameState.playerPosition = {
            x: (arrivalCell.x + 0.5) * CELL_SIZE,
            z: (arrivalCell.z + 0.5) * CELL_SIZE,
            yaw: 0, pitch: 0,
        };
        this._log(`\u{1F300} You travel to dungeon level ${nextLvl}.`);
        this._hidePortalModal();

        // Rebuild scene for new floor
        this._buildScene(true);
        if (this.partyHUD) this.partyHUD.showToast(`Dungeon Level ${nextLvl}`);
        this._saveNow();
    }

    // ────────────────────────────────────────────
    // Traps (Phase 8)
    // ────────────────────────────────────────────

    _checkTraps() {
        if (!this.dungeonData || !this.player) return;
        if (!this.dungeonData.traps || this.dungeonData.traps.length === 0) return;
        if (this._trapModal && this._trapModal.style.display === 'flex') return;

        const gx = Math.floor(this.player.container.position.x / CELL_SIZE);
        const gz = Math.floor(this.player.container.position.z / CELL_SIZE);
        const trap = this.dungeonData.traps.find(t =>
            t.x === gx && t.z === gz && !t.triggered && !t.spotted);
        if (!trap) return;

        // Each alive rogue rolls independently to spot the trap.
        const rogues = (this.gameState.party || []).filter(
            m => !m.isSummoned && m.classId === 'rogue' && m.health > 0,
        );

        const spottingRogues = rogues.filter(r => {
            const spotChance = TRAP_SPOT_BASE + TRAP_SPOT_PER_LEVEL * Math.max(0, r.level - 1);
            return Math.random() < spotChance;
        });

        if (spottingRogues.length > 0) {
            trap.spotted = true;
            this._showTrapModal(trap, spottingRogues);
            return;
        }
        // Un-spotted trap — trigger on the party.
        this._triggerTrap(trap, null);
    }

    /** Look up the trap-type flavour record (falls back to a neutral record). */
    _trapDef(trap) {
        const id = trap && trap.type;
        return TRAP_TYPES.find(t => t.id === id) || {
            id: 'generic',
            name: 'Hidden Trap',
            icon: '\u26A0\uFE0F',
            verb: 'A hidden trap strikes',
            hint: 'Something is off about the floor here.',
            kind: 'physical',
        };
    }

    /**
     * Generic trap dialog. Rebuilds the button row so every caller can set
     * its own label/handler pairs. Used for all three trap states:
     *   - spot (Disarm / Step Carefully)
     *   - sprung (Continue)
     *   - disarm result (Continue)
     */
    _showTrapDialog(title, bodyHtml, buttons) {
        if (!this._trapModal) return;
        if (document.pointerLockElement) document.exitPointerLock();
        this.pauseOverlay.style.display = 'none';
        if (this._trapTitle) this._trapTitle.innerHTML = title;
        if (this._trapBody)  this._trapBody.innerHTML  = bodyHtml;

        const btnRow = document.getElementById('trap-modal-btns');
        if (btnRow) {
            btnRow.innerHTML = '';
            for (const b of buttons) {
                const el = document.createElement('button');
                el.className = 'menu-btn' + (b.secondary ? ' back-btn' : '');
                el.textContent = b.label;
                el.addEventListener('click', () => b.onClick());
                btnRow.appendChild(el);
            }
        }
        this._trapModal.style.display = 'flex';
    }

    _showTrapModal(trap, rogues) {
        // Support both old single-rogue callers and new array form.
        const rogueList = Array.isArray(rogues) ? rogues : [rogues];
        const rogue = rogueList[0]; // default disarmer
        if (!this._trapModal) {
            this._attemptDisarm(trap, rogue);
            return;
        }
        this._pendingTrap = { trap, rogue, rogueList };
        const def = this._trapDef(trap);
        const disarmChance = TRAP_DISARM_BASE + TRAP_DISARM_PER_LEVEL * Math.max(0, rogue.level - 1);

        const title = `${def.icon} ${def.name} Spotted!`;

        let body;
        if (rogueList.length > 1) {
            const names = rogueList.map(r => `<b>${r.name}</b> (L${r.level})`).join(' and ');
            body = `${names} all spot a <b>${def.name}</b> on the floor.<br>` +
                `<i>${def.hint}</i><br><br>` +
                `Choose who attempts to disarm it, or step carefully around it.<br>` +
                `Success may uncover a small treasure. Failure hurts only the chosen rogue.`;
        } else {
            body = `<b>${rogue.name}</b> (rogue L${rogue.level}) spots a <b>${def.name}</b> on the floor.<br>` +
                `<i>${def.hint}</i><br><br>` +
                `Attempt to disarm it (<b>${Math.round(disarmChance * 100)}%</b> chance)?<br>` +
                `Success may uncover a small treasure. Failure will hurt only <b>${rogue.name}</b>.<br>` +
                `Skipping lets the party walk carefully around it.`;
        }

        const buttons = [];
        if (rogueList.length > 1) {
            for (const r of rogueList) {
                const dc = TRAP_DISARM_BASE + TRAP_DISARM_PER_LEVEL * Math.max(0, r.level - 1);
                buttons.push({ label: `${r.name} disarms (${Math.round(dc * 100)}%)`, onClick: () => {
                    this._pendingTrap.rogue = r;
                    this._confirmDisarm();
                }});
            }
        } else {
            buttons.push({ label: 'Attempt Disarm', onClick: () => this._confirmDisarm() });
        }
        buttons.push({ label: 'Step Carefully', secondary: true, onClick: () => this._skipTrap() });

        this._showTrapDialog(title, body, buttons);
    }

    _hideTrapModal() {
        if (this._trapModal) this._trapModal.style.display = 'none';
        this._pendingTrap = null;
    }

    /** True iff every non-summoned party member has 0 HP. */
    _isPartyWiped() {
        if (!this.gameState || !this.gameState.party) return false;
        const real = this.gameState.party.filter(m => !m.isSummoned);
        if (real.length === 0) return false;
        return real.every(m => m.health <= 0);
    }

    /**
     * Handle a full party wipe caused outside of combat (traps).
     * Mirrors the defeat branch of _onCombatEnd: clear scene, drop back
     * to the main menu.
     */
    _onPartyWipe() {
        this._hideTrapModal();
        this._log('\u26B0\uFE0F Your entire party has fallen to the trap! --- GAME OVER ---');
        this._clearScene();
        this.state = STATE.MENU;
        this.gameUI.style.display = 'none';
        this.pauseOverlay.style.display = 'none';
        this.crosshair.style.display = 'none';
        if (this._onPointerLockChange) {
            document.removeEventListener('pointerlockchange', this._onPointerLockChange);
        }
        this._saveNow();
        this.menuScreen.show();
    }

    _skipTrap() {
        if (!this._pendingTrap) { this._hideTrapModal(); return; }
        const { rogueList, rogue } = this._pendingTrap;
        const spotter = (rogueList && rogueList[0]) || rogue;
        this._log(`\u{1F977} ${spotter.name} guides the party carefully around the trap.`);
        this._hideTrapModal();
    }

    _confirmDisarm() {
        if (!this._pendingTrap) { this._hideTrapModal(); return; }
        const { trap, rogue } = this._pendingTrap;
        this._hideTrapModal();
        this._attemptDisarm(trap, rogue);
    }

    _attemptDisarm(trap, rogue) {
        const def    = this._trapDef(trap);
        const chance = TRAP_DISARM_BASE + TRAP_DISARM_PER_LEVEL * Math.max(0, rogue.level - 1);
        if (Math.random() < chance) {
            trap.triggered = true;
            this._log(`\u{1F6E0}\uFE0F ${rogue.name} disarms the ${def.name}!`);

            let gold = 0;
            if (Math.random() < TRAP_TREASURE_CHANCE) {
                const dlvl = this.gameState.dungeonLevel || 1;
                const low  = TRAP_TREASURE_MIN * dlvl;
                const high = TRAP_TREASURE_MAX * dlvl;
                gold = low + Math.floor(Math.random() * (high - low + 1));
                this.gameState.inventory.addGold(gold);
                this._log(`\u{1F48E} A hidden cache reveals ${gold} gold!`);
                if (this.partyHUD) this.partyHUD.showToast(`+${gold} gold`);
            }

            const title = `\u{1F6E0}\uFE0F ${def.name} Disarmed`;
            const body = gold > 0
                ? `<b>${rogue.name}</b> carefully disarms the <b>${def.name}</b>.<br><br>` +
                  `\u{1F48E} A hidden cache contains <b>${gold} gold</b>!`
                : `<b>${rogue.name}</b> carefully disarms the <b>${def.name}</b>.<br><br>` +
                  `<i>No treasure was hidden with this one.</i>`;
            this._showTrapDialog(title, body, [
                { label: 'Continue', onClick: () => this._hideTrapModal() },
            ]);
        } else {
            // Failure — rogue alone takes the damage
            const dlvl = this.gameState.dungeonLevel || 1;
            let dmg = 0;
            for (let i = 0; i < TRAP_DICE_COUNT; i++) {
                dmg += 1 + Math.floor(Math.random() * TRAP_DICE_SIDES);
            }
            dmg *= dlvl;
            trap.triggered = true;
            rogue.health = Math.max(0, rogue.health - dmg);
            this._log(`\u{1F4A5} ${rogue.name} fails to disarm the ${def.name} — ${dmg} damage!`);

            const lines = [`<b>${rogue.name}</b> slips — the <b>${def.name}</b> springs!`];
            lines.push(`${def.icon} ${def.verb} <b>${rogue.name}</b> for <b>${dmg}</b> damage.`);

            // Poison-kind traps afflict the rogue too
            if (def.kind === 'poison' && rogue.health > 0) {
                const perTick = Math.max(1, Math.floor(dmg * POISON_DAMAGE_FRACTION));
                rogue.addEffect({
                    type: 'poison',
                    rounds: POISON_DURATION_ROUNDS,
                    damage: perTick,
                });
                lines.push(`\u{1F7E2} <b>${rogue.name}</b> is poisoned! (${perTick}/rd for ${POISON_DURATION_ROUNDS} rds)`);
                this._log(`\u{1F7E2} ${rogue.name} is poisoned! (${perTick}/rd for ${POISON_DURATION_ROUNDS} rds)`);
            }
            if (rogue.health <= 0) {
                lines.push(`\u26B0\uFE0F <b>${rogue.name}</b> has fallen to the trap!`);
                this._log(`\u26B0\uFE0F ${rogue.name} has fallen to the trap!`);
            }
            if (this.partyHUD) this.partyHUD.update(this.gameState.party, this.gameState.inventory);

            const wiped = this._isPartyWiped();
            if (wiped) {
                lines.push('');
                lines.push('<b style="color:#ff5555">\u26B0\uFE0F Your entire party has fallen! GAME OVER</b>');
            }
            this._showTrapDialog(
                `\u{1F4A5} ${def.name} Triggered!`,
                lines.join('<br>'),
                [{
                    label: wiped ? 'Game Over' : 'Continue',
                    onClick: () => wiped ? this._onPartyWipe() : this._hideTrapModal(),
                }],
            );
        }
        if (this.partyHUD) this.partyHUD.update(this.gameState.party, this.gameState.inventory);
        this._saveNow();
    }

    /**
     * Phase 10 — poison DoT ticks out of combat, once every
     * POISON_EXPLORATION_TICK_SEC of exploration time. Each tick deals
     * `effect.damage` to a living poisoned character (defense-ignoring)
     * and decrements their remaining rounds. Expired poison is removed.
     * If the party is wiped, treat it as a game-over.
     */
    _tickExplorationPoison() {
        if (!this.gameState || !this.gameState.party) return;
        let any = false;
        let diedThisTick = false;
        for (const m of this.gameState.party) {
            if (m.isSummoned) continue;
            if (!Array.isArray(m.activeEffects) || m.activeEffects.length === 0) continue;
            if (m.health <= 0) continue;
            const poison = m.activeEffects.find(e => e && e.type === 'poison');
            if (!poison) continue;
            const dmg = Math.max(1, poison.damage | 0);
            m.health = Math.max(0, m.health - dmg);
            poison.rounds = (poison.rounds | 0) - 1;
            this._log(`\u{1F7E2} ${m.name} suffers ${dmg} poison damage.`);
            any = true;
            if (m.health <= 0) {
                diedThisTick = true;
                this._log(`\u26B0\uFE0F ${m.name} has succumbed to poison!`);
            }
            if (poison.rounds <= 0) {
                m.activeEffects = m.activeEffects.filter(e => e !== poison);
                this._log(`\u{1F7E2} ${m.name}'s poison wears off.`);
            }
        }
        if (any && this.partyHUD) {
            this.partyHUD.update(this.gameState.party, this.gameState.inventory);
        }
        if (diedThisTick && this._isPartyWiped()) {
            this._onPartyWipe();
        }
    }

    _triggerTrap(trap, _rogue) {
        trap.triggered = true;
        const def  = this._trapDef(trap);
        const dlvl = this.gameState.dungeonLevel || 1;
        let dmg = 0;
        for (let i = 0; i < TRAP_DICE_COUNT; i++) {
            dmg += 1 + Math.floor(Math.random() * TRAP_DICE_SIDES);
        }
        dmg *= dlvl;
        this._log(`\u{1F4A5} A ${def.name} springs! Each party member takes ${dmg} damage!`);

        const lines = [`${def.icon} ${def.verb} the party for <b>${dmg}</b> damage each!`];
        const fallen  = [];
        const poisoned = [];
        for (const m of this.gameState.party) {
            if (m.isSummoned) continue;
            if (m.health <= 0) continue;
            m.health = Math.max(0, m.health - dmg);
            if (def.kind === 'poison' && m.health > 0) {
                const perTick = Math.max(1, Math.floor(dmg * POISON_DAMAGE_FRACTION));
                m.addEffect({
                    type: 'poison',
                    rounds: POISON_DURATION_ROUNDS,
                    damage: perTick,
                });
                poisoned.push(`${m.name} (${perTick}/rd)`);
                this._log(`\u{1F7E2} ${m.name} is poisoned! (${perTick}/rd for ${POISON_DURATION_ROUNDS} rds)`);
            }
            if (m.health <= 0) {
                fallen.push(m.name);
                this._log(`\u26B0\uFE0F ${m.name} has fallen to the trap!`);
            }
        }
        if (poisoned.length) {
            lines.push(`\u{1F7E2} Poisoned: <b>${poisoned.join(', ')}</b> (${POISON_DURATION_ROUNDS} rds)`);
        }
        if (fallen.length) {
            lines.push(`\u26B0\uFE0F Fallen: <b>${fallen.join(', ')}</b>`);
        }
        if (this.partyHUD) this.partyHUD.update(this.gameState.party, this.gameState.inventory);
        this._saveNow();

        const wiped = this._isPartyWiped();
        if (wiped) {
            lines.push('');
            lines.push('<b style="color:#ff5555">\u26B0\uFE0F Your entire party has fallen! GAME OVER</b>');
        }
        this._showTrapDialog(
            `\u{1F4A5} ${def.name} Triggered!`,
            lines.join('<br>'),
            [{
                label: wiped ? 'Game Over' : 'Continue',
                onClick: () => wiped ? this._onPartyWipe() : this._hideTrapModal(),
            }],
        );
    }

    // ────────────────────────────────────────────
    // Shop (Tinkerer)
    // ────────────────────────────────────────────

    _openShop() {
        document.exitPointerLock();
        soundManager.playMonsterSound('tinkerer');
        this.shopUI.show();
    }

    // ────────────────────────────────────────────
    // Rest
    // ────────────────────────────────────────────

    _onRest() {
        if (this.state !== STATE.PLAYING) return;
        const inv = this.gameState.inventory;

        if (!inv.hasItem('food')) {
            this.partyHUD.showToast('Not enough food to rest!');
            return;
        }

        inv.removeItem('food');
        soundManager.playRest();

        for (const m of this.gameState.party) {
            if (m.health <= 0) continue;
            m.health  = Math.min(m.maxHealth,  m.health  + Math.ceil(m.maxHealth  * REST_RECOVERY_PERCENT));
            m.stamina = Math.min(m.maxStamina, m.stamina + Math.ceil(m.maxStamina * REST_RECOVERY_PERCENT));
            m.mana    = Math.min(m.maxMana,    m.mana    + Math.ceil(m.maxMana    * REST_RECOVERY_PERCENT));
        }

        this.partyHUD.update(this.gameState.party, this.gameState.inventory);
        this.partyHUD.showToast('The party rests and recovers.');
        this._saveNow();
    }

    // ────────────────────────────────────────────
    // Recruit
    // ────────────────────────────────────────────

    _populateRecruitSelects() {
        if (!this._recruitClass || !this._recruitSpecies) return;
        this._recruitClass.innerHTML = '';
        for (const id of CLASS_IDS) {
            const c = CLASSES[id];
            const opt = document.createElement('option');
            opt.value = id;
            opt.textContent = `${c.icon}  ${c.name}`;
            this._recruitClass.appendChild(opt);
        }
        this._recruitSpecies.innerHTML = '';
        for (const id of SPECIES_IDS) {
            const s = SPECIES[id];
            const opt = document.createElement('option');
            opt.value = id;
            opt.textContent = `${s.icon}  ${s.name}`;
            this._recruitSpecies.appendChild(opt);
        }
    }

    _updateRecruitDesc() {
        if (this._recruitClassDesc) {
            const c = CLASSES[this._recruitClass.value];
            if (c) this._recruitClassDesc.textContent = c.description;
        }
        if (this._recruitSpeciesDesc) {
            const s = SPECIES[this._recruitSpecies.value];
            if (s) this._recruitSpeciesDesc.textContent = s.description;
        }
    }

    _onRecruit() {
        if (this.state !== STATE.PLAYING) return;
        const cost = (this.gameState.recruitsHired + 1) * RECRUIT_BASE_COST;
        const inv = this.gameState.inventory;

        if (inv.gold < cost) {
            this.partyHUD.showToast(`Not enough gold to recruit! Need ${cost}g.`);
            return;
        }

        this._showRecruitModal(cost);
    }

    _showRecruitModal(cost) {
        if (!this._recruitModal) return;
        // Free the mouse
        if (document.pointerLockElement) document.exitPointerLock();
        this.pauseOverlay.style.display = 'none';

        // Phase 8 rule 10: field starts EMPTY (no stray characters from the
        // opening hotkey, and no forced pre-fill).
        this._recruitName.value = '';
        this._recruitClass.value = 'warrior';
        this._recruitSpecies.value = 'human';
        this._recruitError.textContent = '';
        if (this._recruitCostEl) this._recruitCostEl.textContent = `${cost}`;
        this._updateRecruitDesc();

        this._recruitModal.style.display = 'flex';
        // Focus on the next frame so the 'c' keypress that opened the modal
        // has fully completed before the input starts listening for keys.
        requestAnimationFrame(() => {
            if (this._recruitModal.style.display === 'flex') {
                this._recruitName.focus();
            }
        });
    }

    _hideRecruitModal() {
        if (this._recruitModal) this._recruitModal.style.display = 'none';
    }

    _confirmRecruit() {
        const raw = (this._recruitName.value || '').trim();
        if (raw.length === 0) { this._recruitError.textContent = 'Please enter a name.'; return; }
        if (raw.length > 32)  { this._recruitError.textContent = 'Name must be 32 characters or fewer.'; return; }
        const clean = raw.replace(/[^a-zA-Z0-9 ]/g, '');
        if (clean.length === 0) { this._recruitError.textContent = 'Name must contain letters or numbers.'; return; }

        const cost = (this.gameState.recruitsHired + 1) * RECRUIT_BASE_COST;
        const inv = this.gameState.inventory;
        if (inv.gold < cost) {
            this._recruitError.textContent = `Not enough gold! Need ${cost}g.`;
            return;
        }

        inv.removeGold(cost);
        this.gameState.recruitsHired++;

        const newMember = new PartyMember({
            name: clean,
            classId: this._recruitClass.value,
            speciesId: this._recruitSpecies.value,
        });

        // Phase 10 — recruits start at max(1, mainLevel - 1), with max stats
        // brought up to match via the existing _levelUp path. The "main"
        // character is the first non-summoned party member.
        const main = (this.gameState.party || []).find(m => !m.isSummoned);
        if (main) {
            const targetLvl = Math.max(1, (main.level | 0) - 1);
            while (newMember.level < targetLvl && typeof newMember._levelUp === 'function') {
                newMember._levelUp();
            }
            // Set XP to the bottom of the starting level band so the XP bar shows progress.
            newMember.xp = XP_LEVEL_BASE * Math.pow(Math.max(0, newMember.level - 1), 2);
        }

        this.gameState.party.push(newMember);
        // New recruits default to the back row, except front-line classes.
        const FRONT_ROW_CLASSES = new Set(['warrior', 'monk', 'paladin']);
        if (!FRONT_ROW_CLASSES.has(newMember.classId)) newMember.row = 'back';
        soundManager.playRecruit();
        this.partyHUD.update(this.gameState.party, this.gameState.inventory);
        this.partyHUD.showToast(`${clean} (L${newMember.level}) has joined the party!`);
        this._hideRecruitModal();
        this._saveNow();
    }

    // ────────────────────────────────────────────
    // Inventory
    // ────────────────────────────────────────────

    _onToggleInventory() {
        if (this.inventoryUI.isGroupOpen) {
            this.inventoryUI.hideGroup();
        } else {
            // Free the mouse so the UI is clickable
            if (document.pointerLockElement) document.exitPointerLock();
            this.pauseOverlay.style.display = 'none';
            this.inventoryUI.showGroup();
        }
    }

    _onPersonalInventory(memberId) {
        if (document.pointerLockElement) document.exitPointerLock();
        this.pauseOverlay.style.display = 'none';
        this.inventoryUI.showPersonal(memberId);
    }

    _onInventoryChanged() {
        if (this.partyHUD && this.gameState) {
            this.partyHUD.update(this.gameState.party, this.gameState.inventory);
        }
    }

    // ────────────────────────────────────────────
    // Persistence
    // ────────────────────────────────────────────

    async _saveNow() {
        if (!this.gameState || this.gameState.saveId == null) return;
        if (!this.player || !this.enemyManager) return;
        try {
            this.gameState.playerPosition = this.player.getPosition();
            this.gameState.enemies = this.enemyManager.serializeAll();
            this.gameState.explored = this.minimapSystem.serialize();
            await this.saveManager.save(this.gameState.toSaveData());
        } catch (err) {
            console.warn('Auto-save failed:', err);
        }
    }

    // ────────────────────────────────────────────
    // Resize
    // ────────────────────────────────────────────

    _onResize() {
        const w = window.innerWidth;
        const h = window.innerHeight;
        this.renderer.setSize(w, h);
        if (this.player) this.player.onResize(w, h);
        if (this.composer) {
            this.composer.setSize(w, h);
            if (this.bloomPass && this.bloomPass.setSize) this.bloomPass.setSize(w, h);
            if (this.smaaPass && this.smaaPass.setSize) {
                const pr = this.renderer.getPixelRatio();
                this.smaaPass.setSize(w * pr, h * pr);
            }
        }
    }
}
