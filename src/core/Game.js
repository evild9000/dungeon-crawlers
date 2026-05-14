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
    FOG_COLOR_DARK,
    FOG_NEAR_DARK,
    FOG_FAR_DARK,
    AMBIENT_DARK,
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
    ROGUE_TRAP_UNLOCK_LEVEL,
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
import { FamiliarUI } from '../ui/FamiliarUI.js';
import { soundManager } from '../utils/SoundManager.js';
import { CLASSES, CLASS_IDS } from '../entities/Classes.js';
import { SPECIES, SPECIES_IDS } from '../entities/Species.js';
import { PartyLightSystem } from '../systems/PartyLightSystem.js';
import { LightPickerUI } from '../ui/LightPickerUI.js';
import { CompassUI } from '../ui/CompassUI.js';
import { MinimapSystem } from '../systems/MinimapSystem.js';
import { MinimapUI } from '../ui/MinimapUI.js';
import { POISON_EXPLORATION_TICK_SEC, FOOD_CHECK_INTERVAL, REAGENT_TIER_UNCOMMON_MIN, REAGENT_TIER_RARE_MIN, BARD_SONG_MANA_PER_MIN, FOUNTAIN_PROXIMITY, FOUNTAIN_BUFF_DURATION_MS, CHEST_PROXIMITY } from '../utils/constants.js';
import { randomWeaponDrop, randomArmorDrop, randomShieldDrop, getItemDef, TRINKET_IDS } from '../items/ItemTypes.js';
import { PartySpellModal } from '../ui/PartySpellModal.js';
import { LoreBook } from '../ui/LoreBook.js';

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
        this.familiarUI = new FamiliarUI(
            () => this.gameState,
            () => {
                this._onInventoryChanged();
                this._saveNow();
            },
            { logger: (msg) => this._log(msg) },
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
        this._foodTickAccum   = {}; // per-member food timer accumulation (seconds)
        this._bardSongTimer   = 0;  // accumulates seconds for bard song mana drain
        this._fountainCooldown = 0; // prevents re-triggering fountain immediately after dismiss
        this._chestCooldown = 0;

        // --- Minimap / fog-of-war (Phase 11) ---
        this.minimapSystem = new MinimapSystem();
        this.minimapUI = new MinimapUI();

        // --- Party Spell Modal (V key) ---
        this.partySpellModal = new PartySpellModal((party) => {
            this._reapplySongEffects();
            this._updateSongTooltip();
            if (this.gameState) {
                // Persist bard music toggle state.
                this.gameState.bardMusicEnabled = this.partySpellModal._musicEnabled;
            }
            if (this.partyHUD && this.gameState) {
                this.partyHUD.update(this.gameState.party, this.gameState.inventory);
            }
            this._saveNow();
        });

        this.loreBook = new LoreBook();

        // --- Buff indicators panel (upper-right, below dungeon level) ---
        // Shared flex-column container so bard song + scroll buffs never overlap.
        this._buffPanel = document.createElement('div');
        Object.assign(this._buffPanel.style, {
            position: 'fixed',
            top: '130px',
            right: '20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '4px',
            zIndex: '500',
            pointerEvents: 'none',
        });
        document.body.appendChild(this._buffPanel);

        // Bard song row
        this._songTooltip = document.createElement('div');
        Object.assign(this._songTooltip.style, {
            background: 'rgba(10,10,30,0.82)',
            border: '1px solid #447',
            borderRadius: '6px',
            padding: '4px 10px',
            color: '#ccf',
            fontFamily: 'monospace',
            fontSize: '12px',
            lineHeight: '1.5',
            display: 'none',
        });
        this._buffPanel.appendChild(this._songTooltip);

        // Scroll buffs row
        this._scrollBuffEl = document.createElement('div');
        Object.assign(this._scrollBuffEl.style, {
            background: 'rgba(10,30,10,0.82)',
            border: '1px solid #474',
            borderRadius: '6px',
            padding: '4px 10px',
            color: '#cfc',
            fontFamily: 'monospace',
            fontSize: '12px',
            lineHeight: '1.5',
            display: 'none',
        });
        this._buffPanel.appendChild(this._scrollBuffEl);

        // --- UI refs ---
        this.gameUI       = document.getElementById('game-ui');
        this.pauseOverlay = document.getElementById('pause-overlay');
        this.crosshair    = document.getElementById('crosshair');
        this.pauseLoadPanel = document.getElementById('pause-load-panel');
        this.pauseSaveSlotsList = document.getElementById('pause-save-slots-list');

        // --- Pause overlay interactions ---
        this.pauseOverlay.addEventListener('click', (e) => {
            if (this.state !== STATE.PLAYING) return;
            if (e.target.closest('button') || e.target.closest('#pause-load-panel')) return;
            // Don't grab pointer lock if an overlay is visible
            if (this._anyOverlayOpen()) return;
            const lockPromise = this.renderer.domElement.requestPointerLock();
            if (lockPromise && typeof lockPromise.catch === 'function') {
                lockPromise.catch(() => {});
            }
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
        const loadPauseBtn = document.getElementById('btn-load-pause');
        if (loadPauseBtn) {
            loadPauseBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                if (this.state !== STATE.PLAYING) return;
                this._showPauseLoadPicker();
            });
        }
        const loadPauseCancelBtn = document.getElementById('btn-pause-load-cancel');
        if (loadPauseCancelBtn) {
            loadPauseCancelBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                this._hidePauseLoadPicker();
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

        // --- Fountain modal (built dynamically — no HTML element needed) ---
        this._fountainModal = null;   // created on first use
        this._pendingFountain = null; // the dungeonData.fountains[] entry being offered

        // --- Magical chest modal (built dynamically) ---
        this._chestModal = null;
        this._pendingChest = null;

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
            || (this.familiarUI && this.familiarUI.isOpen)
            || this.inventoryUI.isGroupOpen
            || this.inventoryUI.isPersonalOpen
            || (this._helpOverlay && this._helpOverlay.style.display === 'flex')
            || (this._recruitModal && this._recruitModal.style.display === 'flex')
            || (this._logOverlay && this._logOverlay.style.display === 'flex')
            || (this._portalModal && this._portalModal.style.display === 'flex')
            || (this._trapModal && this._trapModal.style.display === 'flex')
            || (this._fountainModal && this._fountainModal.style.display === 'flex')
            || (this._chestModal && this._chestModal.style.display === 'flex')
            || (this._bagpickModal && this._bagpickModal.style.display === 'flex')
            || (this.pauseLoadPanel && this.pauseLoadPanel.style.display === 'block')
            || (this.lightPickerUI && this.lightPickerUI.isOpen)
            || (this.partySpellModal && this.partySpellModal.isOpen)
            || (this.loreBook && this.loreBook.isOpen);
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
                else if (this.familiarUI && this.familiarUI.isOpen) this.familiarUI.hide();
                else if (this.inventoryUI.isPersonalOpen) this.inventoryUI.hidePersonal();
                else if (this.inventoryUI.isGroupOpen) this.inventoryUI.hideGroup();
                else if (this._recruitModal && this._recruitModal.style.display === 'flex') this._hideRecruitModal();
                else if (this._helpOverlay.style.display === 'flex') this._hideHelp();
                else if (this._logOverlay && this._logOverlay.style.display === 'flex') this._hideLog();
                else if (this._portalModal && this._portalModal.style.display === 'flex') this._hidePortalModal();
                else if (this._trapModal && this._trapModal.style.display === 'flex') this._skipTrap();
                else if (this._fountainModal && this._fountainModal.style.display === 'flex') this._hideFountainModal();
                else if (this._chestModal && this._chestModal.style.display === 'flex') this._hideChestModal();
                else if (this._bagpickModal && this._bagpickModal.style.display === 'flex') this._hideBagPicker();
                else if (this.lightPickerUI && this.lightPickerUI.isOpen) this.lightPickerUI.hide();
                else if (this.partySpellModal && this.partySpellModal.isOpen) this.partySpellModal.hide();
                else if (this.loreBook && this.loreBook.isOpen) this.loreBook.hide();
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
            case 'f': e.preventDefault(); this._onOpenFamiliar(); break;
            case 'v': e.preventDefault(); this._onOpenPartySpells(); break;
            case 'x': e.preventDefault(); this._onOpenLoreBook(); break;
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

    _onOpenFamiliar() {
        if (!this.familiarUI || !this.gameState) return;
        if (this.state !== STATE.PLAYING) return;
        this.pauseOverlay.style.display = 'none';
        this.familiarUI.show();
        if (document.pointerLockElement) document.exitPointerLock();
        this.pauseOverlay.style.display = 'none';
    }

    _onToggleMinimap() {
        if (!this.minimapUI || !this.dungeonData || !this.player) return;
        if (this.state === STATE.COMBAT) return;  // no minimap during combat
        if (this.minimapUI.isOpen) { this.minimapUI.hide(); return; }
        // Show without exiting pointer lock — the minimap is a non-blocking
        // corner widget that stays visible while the player moves.
        const CS = CELL_SIZE;
        this.minimapUI.show(
            this.dungeonData,
            this.minimapSystem,
            {
                gx: Math.floor(this.player.container.position.x / CS),
                gz: Math.floor(this.player.container.position.z / CS),
                yaw: this.player.yaw,
            },
            this._buildMinimapEntities(),
        );
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

    _onOpenLoreBook() {
        if (!this.loreBook || !this.gameState) return;
        if (document.pointerLockElement) document.exitPointerLock();
        this.loreBook.show(this.gameState.discoveredMonsters);
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
     * Update the fixed upper-right tooltip that shows currently active songs,
     * including actual bonus values read from live activeEffects.
     */
    _updateSongTooltip() {
        if (!this._songTooltip || !this.gameState) return;
        const party = this.gameState.party || [];
        const lines = [];
        for (const m of party) {
            if (m.classId !== 'bard' || !Array.isArray(m.activeSongs) || m.activeSongs.length === 0) continue;
            if (m.activeSongs.includes('combined')) {
                // Read actual bonus values from any living carrier (all members share the same values).
                const carrier = party.find(p => !p.isSummoned && p.health > 0
                    && (p.activeEffects || []).some(e => e && e.source === 'bard_song'));
                const fx = carrier ? (carrier.activeEffects || []) : [];
                const hasteEff  = fx.find(e => e && e.type === 'bard_song_haste');
                const battleEff = fx.find(e => e && e.type === 'bard_song_battle');
                const healEff   = fx.find(e => e && e.type === 'bard_song_healing');
                const parts = [];
                if (hasteEff  && hasteEff.initiativeBonus)  parts.push(`⚡+${hasteEff.initiativeBonus} init`);
                if (battleEff && battleEff.damageBonus)      parts.push(`⚔️+${battleEff.damageBonus} atk/def`);
                if (healEff   && healEff.hpPerMin)           parts.push(`💚+${healEff.hpPerMin} HP/min`);
                const bonusStr = parts.length > 0 ? ` — ${parts.join(' · ')}` : '';
                lines.push(`🎶 ${m.name}: Bard Song${bonusStr} (5 MP/min)`);
            } else {
                // Legacy save-data fallback
                const songLabels = { haste: '⚡ Haste', battle: '⚔️ Battle', healing: '💚 Healing' };
                const names = m.activeSongs.map(s => songLabels[s] || s).join(', ');
                lines.push(`🎶 ${m.name}: ${names}`);
            }
        }
        if (lines.length > 0) {
            this._songTooltip.innerHTML = lines.join('<br>');
            this._songTooltip.style.display = 'block';
        } else {
            this._songTooltip.style.display = 'none';
        }
    }

    /**
     * Update the scroll-buff indicator (Warding / Wrath) shown near the compass.
     * Reads the first matching expiresAt found on any living party member.
     */
    _updateScrollBuff() {
        if (!this._scrollBuffEl || !this.gameState) return;
        const party = this.gameState.party || [];
        const now = Date.now();
        const lines = [];

        // Helper: find the latest-expiring active effect of a given type among living members.
        // Returns { expiresAt, bonus } where bonus is defenseBonus or damageBonus (whichever exists).
        const latestEffect = (type) => {
            let best = 0, bonus = 0;
            for (const m of party) {
                if (m.isSummoned || m.health <= 0) continue;
                const eff = (m.activeEffects || []).find(
                    e => e && e.type === type && typeof e.expiresAt === 'number' && e.expiresAt > now,
                );
                if (eff && eff.expiresAt > best) {
                    best = eff.expiresAt;
                    bonus = eff.defenseBonus || eff.damageBonus || 0;
                }
            }
            return { expiresAt: best, bonus };
        };
        // Backward-compat alias used by fountain buffs below.
        const latestExpiry = (type) => latestEffect(type).expiresAt;
        const fmtTime = (expiresAt) => {
            const secsLeft = Math.ceil((expiresAt - now) / 1000);
            const mins = Math.floor(secsLeft / 60);
            const secs = secsLeft % 60;
            return mins > 0 ? `${mins}m ${secs}s` : `${secs}s`;
        };

        // Scroll buffs — show actual bonus stored in the effect
        for (const [type, icon, label] of [
            ['elixir_warding', '\u{1F6E1}️', 'Warding'],
            ['elixir_wrath',   '\u{1F525}',        'Wrath'],
        ]) {
            const { expiresAt: exp, bonus } = latestEffect(type);
            if (exp > now) lines.push(`${icon} Scroll of ${label} +${bonus} — ${fmtTime(exp)}`);
        }

        // Fountain buffs (b–i) — all timed
        for (const [type, icon, label] of [
            ['fountain_melee',   '⚔️',   'Melee +2'],
            ['fountain_ranged',  '\u{1F3F9}',       'Ranged +2'],
            ['fountain_magic',   '✨',           'Magic +2'],
            ['fountain_defense', '\u{1F6E1}️', 'Defense +3'],
            ['fountain_hp',      '❤️',     'Max HP +'],
            ['fountain_mp',      '\u{1F4A7}',        'Max Mana +'],
            ['fountain_st',      '\u{1F4AA}',        'Max Stamina +'],
            ['fountain_summon',  '\u{1F47E}',        'Summon Power +20%'],
        ]) {
            const exp = latestExpiry(type);
            if (exp > now) lines.push(`${icon} Fountain: ${label} — ${fmtTime(exp)}`);
        }

        if (lines.length > 0) {
            this._scrollBuffEl.innerHTML = lines.join('<br>');
            this._scrollBuffEl.style.display = 'block';
        } else {
            this._scrollBuffEl.style.display = 'none';
        }
    }

    /**
     * Dynamically adjust fog and ambient light based on whether the party
     * is carrying an active light source.
     *
     * No light  → pitch-black: fog starts at 0 and closes in at ~1 cell,
     *             ambient drops to near-zero (AMBIENT_DARK ≈ 0.015).
     * Has light → restore normal fog (FOG_NEAR/FAR) and ambient intensity.
     */
    _updateDarknessEffect() {
        if (!this.scene || !this.ambientLight) return;
        const hasLight = !!(this.partyLight && this.partyLight.active);
        const fog = this.scene.fog;
        if (hasLight) {
            if (fog) { fog.near = FOG_NEAR; fog.far = FOG_FAR; fog.color.setHex(FOG_COLOR); }
            this.scene.background && this.scene.background.setHex(FOG_COLOR);
            this.ambientLight.intensity = AMBIENT_INTENSITY;
        } else {
            if (fog) { fog.near = FOG_NEAR_DARK; fog.far = FOG_FAR_DARK; fog.color.setHex(FOG_COLOR_DARK); }
            this.scene.background && this.scene.background.setHex(FOG_COLOR_DARK);
            this.ambientLight.intensity = AMBIENT_DARK;
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
        this._hidePauseLoadPicker();
        this._enterGame(false);
    }

    async _showPauseLoadPicker() {
        if (!this.pauseLoadPanel || !this.pauseSaveSlotsList) return;
        this.pauseLoadPanel.style.display = 'block';
        this.pauseSaveSlotsList.innerHTML = '';

        const saves = await this.saveManager.listSaves();
        if (saves.length === 0) {
            const msg = document.createElement('p');
            msg.className = 'no-saves';
            msg.textContent = 'No saved games found.';
            this.pauseSaveSlotsList.appendChild(msg);
            return;
        }

        for (const save of saves) {
            const slot = document.createElement('div');
            slot.className = 'save-slot';

            const info = document.createElement('div');
            info.className = 'save-slot-info';

            const name = document.createElement('div');
            name.className = 'save-slot-name';
            name.textContent = save.name;

            const details = document.createElement('div');
            details.className = 'save-slot-details';
            const n = save.party ? save.party.length : 0;
            const date = new Date(save.updatedAt).toLocaleString();
            details.textContent = `${n} member${n !== 1 ? 's' : ''} · ${date}`;

            info.appendChild(name);
            info.appendChild(details);
            slot.appendChild(info);

            const loadBtn = document.createElement('button');
            loadBtn.className = 'save-slot-btn load-btn';
            loadBtn.textContent = 'Load';
            loadBtn.addEventListener('click', async (e) => {
                e.stopPropagation();
                await this._onLoadGame(save.id);
            });
            slot.appendChild(loadBtn);

            this.pauseSaveSlotsList.appendChild(slot);
        }
    }

    _hidePauseLoadPicker() {
        if (this.pauseLoadPanel) this.pauseLoadPanel.style.display = 'none';
        if (this.pauseSaveSlotsList) this.pauseSaveSlotsList.innerHTML = '';
    }

    _enterGame(isNew) {
        this.menuScreen.hide();
        this._buildScene(isNew);
        // Re-derive bard song effects from the persisted activeSongs lists
        // (needed on load; harmless on new game where no songs are active).
        this._reapplySongEffects();
        this._updateSongTooltip();
        this._updateScrollBuff();

        // Restore bard music toggle and start/stop the loop as needed.
        this.partySpellModal._musicEnabled = this.gameState.bardMusicEnabled !== false;
        const hasSongActive = (this.gameState.party || []).some(
            m => m.classId === 'bard' && Array.isArray(m.activeSongs)
              && m.activeSongs.includes('combined') && m.health > 0,
        );
        if (hasSongActive && this.partySpellModal._musicEnabled) {
            soundManager.playBardSongLoop('combined');
        } else {
            soundManager.stopBardSongLoop();
        }
        this.state = STATE.PLAYING;
        this.gameUI.style.display = 'block';
        this.pauseOverlay.style.display = 'flex';
        this.clock = new THREE.Clock();
        this.autoSaveTimer = 0;
        this._combatCooldown = 0;

        if (this._onPointerLockChange) {
            document.removeEventListener('pointerlockchange', this._onPointerLockChange);
        }
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
        this._hidePauseLoadPicker();
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

        this.ambientLight = new THREE.AmbientLight(0xffffff, AMBIENT_INTENSITY);
        this.scene.add(this.ambientLight);

        const dLvl = this.gameState.dungeonLevel || 1;
        // Always reroll traps, fountains, and chests on load to prevent save/load abuse
        this.dungeonData = getDungeonData(dLvl);

        // If the save contains any fountains or chests marked as used, preserve their used state in the rerolled set (optional: comment out to always reroll everything)
        if (this.gameState.dungeonFountains) {
            // Mark rerolled fountains as used if their position matches a used one in the save
            const usedFountains = new Set(
                this.gameState.dungeonFountains.filter(f => f.used).map(f => `${f.x},${f.z}`)
            );
            for (const f of this.dungeonData.fountains) {
                if (usedFountains.has(`${f.x},${f.z}`)) f.used = true;
            }
        }
        if (this.gameState.dungeonChests) {
            // Mark rerolled chests as used if their position matches a used one in the save
            const usedChests = new Set(
                this.gameState.dungeonChests.filter(c => c.used).map(c => `${c.x},${c.z}`)
            );
            for (const c of this.dungeonData.chests) {
                if (usedChests.has(`${c.x},${c.z}`)) c.used = true;
            }
        }

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
        // Apply correct fog/ambient immediately so it matches light state on load.
        this._updateDarknessEffect();

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
            onOpenFamiliar: () => this._onOpenFamiliar(),
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
            if (this._fountainCooldown > 0) this._fountainCooldown -= dt;
            if (this._chestCooldown > 0) this._chestCooldown -= dt;

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

            // Fountain proximity check
            if (this._fountainCooldown <= 0) this._checkFountains();

            // Magical chest proximity check
            if (this._chestCooldown <= 0) this._checkChests();

            const playerGX = Math.floor(this.player.container.position.x / CELL_SIZE);
            const playerGZ = Math.floor(this.player.container.position.z / CELL_SIZE);

            // Phase 11 — reveal minimap cells around the party every frame.
            // Cheap: 49 cells/update at radius 3. No raycast, walls still
            // render so the shape of the dungeon reads cleanly.
            this.minimapSystem.reveal(this.gameState.dungeonLevel || 1, playerGX, playerGZ);

            // Keep the corner minimap widget in sync with player movement.
            if (this.minimapUI && this.minimapUI.isOpen) {
                this.minimapUI.updatePlayer(
                    { gx: playerGX, gz: playerGZ, yaw: this.player.yaw },
                    this._buildMinimapEntities(),
                );
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

            // Bard song ongoing mana drain — 5 MP per minute while songs are active.
            this._bardSongTimer += dt;
            if (this._bardSongTimer >= 60) {
                this._bardSongTimer -= 60;
                this._drainBardSongMana();
            }

            // Food / hunger tick — per-member timers advance during exploration.
            this._tickFood(dt);

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
        this._updateScrollBuff();
        this._updateDarknessEffect();
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
        if (!triggerEnemy || triggerEnemy.health <= 0) return;
        const nearby = this._gatherCombatGroup(triggerEnemy);
        if (!nearby.length) return;

        // Track monster discovery for the Lore Book
        for (const e of nearby) {
            if (e.type && this.gameState) {
                this.gameState.discoveredMonsters?.add(e.type);
            }
        }

        document.exitPointerLock();
        this.state = STATE.COMBAT;
        this.pauseOverlay.style.display = 'none';
        this.crosshair.style.display = 'none';
        if (this.inventoryUI) this.inventoryUI._inCombat = true;
        // Hide the minimap for the duration of combat so it doesn't overlap the HUD.
        this._minimapWasOpen = !!(this.minimapUI && this.minimapUI.isOpen);
        if (this.minimapUI && this.minimapUI.isOpen) this.minimapUI.hide();

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
        if (!trigger || trigger.health <= 0) return [];
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
            // Remove ALL enemies that were part of this combat, alive or dead.
            // Leaving alive survivors on the map causes immediate re-encounters
            // on the next movement frame, sometimes leading to instant-victory
            // combats because the force-spawned extras are in a stale state.
            for (const e of this.combatSystem.enemies) {
                this.enemyManager.removeEnemy(e);
            }
            if (this.combatSystem.loot) {
                const loot = this.combatSystem.loot;
                if (loot.gold > 0) this.gameState.inventory.addGold(loot.gold);
                for (const item of loot.items) {
                    this.gameState.inventory.addItem(item.itemId, item.quantity);
                }
            }
        } else if (result === 'fled') {
            // Remove only the enemies that DIED during combat. Their sprites
            // would otherwise remain on the map as non-collidable ghost enemies
            // that wander around but can never be re-engaged. Living survivors
            // stay on the map and will re-engage normally once the cooldown ends.
            for (const e of this.combatSystem.enemies) {
                if (e.health <= 0) this.enemyManager.removeEnemy(e);
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

        // Restore minimap if it was open when combat started.
        if (this._minimapWasOpen && this.minimapUI && this.dungeonData && this.player) {
            const CS = CELL_SIZE;
            this.minimapUI.show(
                this.dungeonData,
                this.minimapSystem,
                {
                    gx: Math.floor(this.player.container.position.x / CS),
                    gz: Math.floor(this.player.container.position.z / CS),
                    yaw: this.player.yaw,
                },
                this._buildMinimapEntities(),
            );
        }
        this._minimapWasOpen = false;

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
            const trapItems = [];
            if (rogue.level >= ROGUE_TRAP_UNLOCK_LEVEL && typeof rogue.addItem === 'function') {
                rogue.addItem('captured_trap', 1);
                const trapItemDef = getItemDef('captured_trap');
                trapItems.push(trapItemDef ? trapItemDef.name : 'Captured Trap');
                this._log(`🪤 ${rogue.name} recovers the trap mechanism for later use.`);
                if (this.partyHUD) this.partyHUD.showToast('+Captured Trap');
            }
            if (Math.random() < TRAP_TREASURE_CHANCE) {
                const dlvl = this.gameState.dungeonLevel || 1;
                const low  = TRAP_TREASURE_MIN * dlvl * 2;
                const high = TRAP_TREASURE_MAX * dlvl * 2;
                gold = low + Math.floor(Math.random() * (high - low + 1));
                this.gameState.inventory.addGold(gold);
                this._log(`\u{1F48E} A hidden cache reveals ${gold} gold!`);
                if (this.partyHUD) this.partyHUD.showToast(`+${gold} gold`);

                // Bonus item rolls equal to dungeon level
                const numRolls = dlvl;
                const reagentId = dlvl < REAGENT_TIER_UNCOMMON_MIN ? 'reagent_common'
                                : dlvl < REAGENT_TIER_RARE_MIN      ? 'reagent_uncommon'
                                :                                      'reagent_rare';
                for (let r = 0; r < numRolls; r++) {
                    const roll = Math.random();
                    let itemId = null;
                    if (roll < 0.35)      itemId = 'food';
                    else if (roll < 0.55) itemId = reagentId;
                    else if (roll < 0.70) itemId = 'healing_potion';
                    else if (roll < 0.80) itemId = randomWeaponDrop();
                    else if (roll < 0.90) itemId = randomArmorDrop();
                    else                  itemId = randomShieldDrop();
                    if (itemId) {
                        this.gameState.inventory.addItem(itemId, 1);
                        const def2 = getItemDef(itemId);
                        const name = def2 ? def2.name : itemId;
                        this._log(`\u{1F4E6} Found ${name}!`);
                        trapItems.push(name);
                    }
                }
            }

            const title = `\u{1F6E0}\uFE0F ${def.name} Disarmed`;
            let bodyLines = `<b>${rogue.name}</b> carefully disarms the <b>${def.name}</b>.`;
            if (gold > 0 || trapItems.length > 0) {
                bodyLines += '<br><br>';
                if (gold > 0) bodyLines += `\u{1F48E} <b>${gold} gold</b> found!<br>`;
                if (trapItems.length > 0) bodyLines += `\u{1F4E6} Items: ${trapItems.join(', ')}`;
            } else {
                bodyLines += '<br><br><i>No treasure was hidden with this one.</i>';
            }
            this._showTrapDialog(title, bodyLines, [
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

    // ────────────────────────────────────────────
    // Magical Fountains
    // ────────────────────────────────────────────

    _checkFountains() {
        if (!this.dungeonData || !this.player || !this.dungeonData.fountains) return;
        if (this._fountainModal && this._fountainModal.style.display === 'flex') return;

        const pos = this.player.container.position;
        for (const f of this.dungeonData.fountains) {
            if (f.used) continue;
            const cx = (f.x + 0.5) * CELL_SIZE;
            const cz = (f.z + 0.5) * CELL_SIZE;
            const dx = pos.x - cx, dz = pos.z - cz;
            if (dx * dx + dz * dz <= FOUNTAIN_PROXIMITY * FOUNTAIN_PROXIMITY) {
                this._showFountainModal(f);
                return;
            }
        }
    }

    _showFountainModal(fountain) {
        this._pendingFountain = fountain;
        if (document.pointerLockElement) document.exitPointerLock();
        this.pauseOverlay.style.display = 'none';

        // Build the modal lazily on first use.
        if (!this._fountainModal) {
            const overlay = document.createElement('div');
            overlay.id = 'fountain-modal';
            Object.assign(overlay.style, {
                display: 'none',
                position: 'fixed',
                inset: '0',
                background: 'rgba(0,0,0,0.75)',
                zIndex: '1100',
                alignItems: 'center',
                justifyContent: 'center',
            });
            const box = document.createElement('div');
            Object.assign(box.style, {
                background: '#0a1a2e',
                border: '2px solid #22ddff',
                borderRadius: '10px',
                padding: '24px 32px',
                maxWidth: '420px',
                color: '#ddf',
                fontFamily: 'monospace',
                boxShadow: '0 0 30px rgba(34,221,255,0.35)',
                textAlign: 'center',
            });
            const title = document.createElement('div');
            title.textContent = '\u{1F6B0} Magical Fountain';
            Object.assign(title.style, { fontSize: '18px', fontWeight: 'bold', color: '#22ddff', marginBottom: '12px' });
            const body = document.createElement('p');
            body.textContent = 'A shimmering fountain of magical water stands before you. The water glows with an unknown enchantment. Do you drink?';
            Object.assign(body.style, { fontSize: '13px', marginBottom: '20px', lineHeight: '1.6' });
            const btnRow = document.createElement('div');
            Object.assign(btnRow.style, { display: 'flex', gap: '12px', justifyContent: 'center' });
            const drinkBtn = document.createElement('button');
            drinkBtn.textContent = '\u{1F6B0} Drink';
            drinkBtn.className = 'menu-btn';
            drinkBtn.addEventListener('click', () => this._confirmFountain());
            const leaveBtn = document.createElement('button');
            leaveBtn.textContent = 'Leave';
            leaveBtn.className = 'menu-btn back-btn';
            leaveBtn.addEventListener('click', () => this._hideFountainModal());
            btnRow.append(drinkBtn, leaveBtn);
            box.append(title, body, btnRow);
            overlay.appendChild(box);
            document.body.appendChild(overlay);
            this._fountainModal = overlay;
        }
        this._fountainModal.style.display = 'flex';
    }

    _hideFountainModal() {
        if (this._fountainModal) this._fountainModal.style.display = 'none';
        this._pendingFountain = null;
        this._fountainCooldown = 2.0; // prevent re-trigger for 2 seconds
    }

    _confirmFountain() {
        const f = this._pendingFountain;
        if (!f) { this._hideFountainModal(); return; }

        f.used = true;
        if (this._fountainModal) this._fountainModal.style.display = 'none';
        this._pendingFountain = null;
        this._fountainCooldown = 2.0;

        // Remove the 3-D object from the scene.
        if (this.dungeonRenderer) this.dungeonRenderer.removeFountain(f.x, f.z);

        const dLvl = this.gameState.dungeonLevel || 1;
        const party = this.gameState.party || [];
        const alive = party.filter(m => !m.isSummoned && m.health > 0);

        // Roll one of 11 effects (a – k), passing fountain position for effect k.
        const roll = Math.floor(Math.random() * 11); // 0–10
        this._applyFountainEffect(roll, dLvl, alive, party, f);

        if (this.partyHUD) this.partyHUD.update(party, this.gameState.inventory);
        this._saveNow();
    }

    _applyFountainEffect(roll, dLvl, alive, party, fountain) {
        const now = Date.now();
        const dur = FOUNTAIN_BUFF_DURATION_MS;

        switch (roll) {
            // ── a: Acid — party damage + poison DoT ──────────────────────────
            case 0: {
                let msgs = ['\u{1F9EA} The water burns with acid!'];
                for (const m of alive) {
                    // 1d6 × DL damage
                    let dmg = 0;
                    for (let i = 0; i < dLvl; i++) dmg += 1 + Math.floor(Math.random() * 6);
                    m.health = Math.max(0, m.health - dmg);
                    msgs.push(`${m.name} takes ${dmg} acid damage!`);
                    if (m.health > 0) {
                        // Poison DoT: uses existing poison system (~every 10s exploration, 1–2×DL per tick)
                        const perTick = Math.max(1, Math.floor(dLvl * (1 + Math.random())));
                        m.addEffect({ type: 'poison', rounds: POISON_DURATION_ROUNDS, damage: perTick });
                        msgs.push(`${m.name} is poisoned! (${perTick}/tick)`);
                    }
                }
                this._log('\u{1F9EA} ' + msgs.slice(1).join(' · '));
                this._showFountainResult('\u{1F9EA} Acid Fountain!', msgs.join('<br>'));
                break;
            }
            // ── b: +2 melee damage ───────────────────────────────────────────
            case 1: {
                const exAt = now + dur;
                for (const m of alive) {
                    m.addEffect({ type: 'fountain_melee', damageBonus: 2, expiresAt: exAt });
                }
                const msg = '⚔️ The water invigorates your arms! (+2 melee damage, 10 min)';
                this._log(msg);
                this._showFountainResult('⚔️ Fountain of Might', msg);
                break;
            }
            // ── c: +2 ranged damage ──────────────────────────────────────────
            case 2: {
                const exAt = now + dur;
                for (const m of alive) {
                    m.addEffect({ type: 'fountain_ranged', damageBonus: 2, expiresAt: exAt });
                }
                const msg = '\u{1F3F9} Your aim sharpens with supernatural focus! (+2 ranged damage, 10 min)';
                this._log(msg);
                this._showFountainResult('\u{1F3F9} Fountain of Precision', msg);
                break;
            }
            // ── d: +2 magic damage ───────────────────────────────────────────
            case 3: {
                const exAt = now + dur;
                for (const m of alive) {
                    m.addEffect({ type: 'fountain_magic', damageBonus: 2, expiresAt: exAt });
                }
                const msg = '✨ Arcane power surges through you! (+2 magic damage, 10 min)';
                this._log(msg);
                this._showFountainResult('✨ Fountain of Arcana', msg);
                break;
            }
            // ── e: +3 defense ────────────────────────────────────────────────
            case 4: {
                const exAt = now + dur;
                for (const m of alive) {
                    m.addEffect({ type: 'fountain_defense', defenseBonus: 3, expiresAt: exAt });
                }
                const msg = '\u{1F6E1}️ Your skin hardens like stone! (+3 defense, 10 min)';
                this._log(msg);
                this._showFountainResult('\u{1F6E1}️ Fountain of Stone', msg);
                break;
            }
            // ── f: +3 × DL max HP ────────────────────────────────────────────
            case 5: {
                const exAt = now + dur;
                const bonus = 3 * dLvl;
                let msgs = [`❤️ Vitality surges through the party! (+${bonus} max HP, 10 min)`];
                for (const m of alive) {
                    m.maxHealth += bonus;
                    m.health = Math.min(m.health + bonus, m.maxHealth);
                    m.addEffect({ type: 'fountain_hp', poolBonus: bonus, expiresAt: exAt });
                }
                this._log(msgs[0]);
                this._showFountainResult('❤️ Fountain of Life', msgs[0]);
                break;
            }
            // ── g: +3 × DL max mana ──────────────────────────────────────────
            case 6: {
                const exAt = now + dur;
                const bonus = 3 * dLvl;
                const msg = `\u{1F4A7} Mana wells up within you! (+${bonus} max mana, 10 min)`;
                for (const m of alive) {
                    m.maxMana += bonus;
                    m.mana = Math.min(m.mana + bonus, m.maxMana);
                    m.addEffect({ type: 'fountain_mp', poolBonus: bonus, expiresAt: exAt });
                }
                this._log(msg);
                this._showFountainResult('\u{1F4A7} Fountain of Mana', msg);
                break;
            }
            // ── h: +3 × DL max stamina ───────────────────────────────────────
            case 7: {
                const exAt = now + dur;
                const bonus = 3 * dLvl;
                const msg = `\u{1F4AA} Your endurance reaches new heights! (+${bonus} max stamina, 10 min)`;
                for (const m of alive) {
                    m.maxStamina += bonus;
                    m.stamina = Math.min(m.stamina + bonus, m.maxStamina);
                    m.addEffect({ type: 'fountain_st', poolBonus: bonus, expiresAt: exAt });
                }
                this._log(msg);
                this._showFountainResult('\u{1F4AA} Fountain of Endurance', msg);
                break;
            }
            // ── i: +20% damage, defense, and max HP for summoned minions ────
            case 8: {
                const exAt = now + dur;
                // Store effect on living non-summon party members so CombatSystem
                // can detect it at hit-time for the damage and defense bonuses.
                for (const m of alive) {
                    m.addEffect({ type: 'fountain_summon', summonBonus: 0.2, expiresAt: exAt });
                }
                // Also boost current summons' max HP and current HP by 20%.
                const summons = party.filter(m => m.isSummoned && m.health > 0);
                for (const s of summons) {
                    const hpBonus = Math.floor(s.maxHealth * 0.2);
                    if (hpBonus > 0) {
                        s.maxHealth += hpBonus;
                        s.health = Math.min(s.health + hpBonus, s.maxHealth);
                        // Track the bonus so it can be partially reverted if needed.
                        s.fountainHpBonus = (s.fountainHpBonus || 0) + hpBonus;
                    }
                }
                const summonCount = summons.length;
                const baseMsg = '\u{1F47E} Your summoned minions grow mighty! (+20% damage, defense & HP, 10 min)';
                const fullMsg = summonCount > 0
                    ? `${baseMsg}<br><i>${summonCount} active summon${summonCount > 1 ? 's' : ''} also gained max HP.</i>`
                    : baseMsg;
                this._log(baseMsg);
                this._showFountainResult('\u{1F47E} Fountain of Summoning', fullMsg);
                break;
            }
            // ── j: Gold + 33% trinket chance ─────────────────────────────────
            case 9: {
                const gold = 500 * dLvl;
                this.gameState.inventory.gold += gold;
                let msg = `\u{1F48E} The fountain overflows with treasure! +${gold} gold!`;
                if (Math.random() < 0.33 && TRINKET_IDS.length > 0) {
                    const tid = TRINKET_IDS[Math.floor(Math.random() * TRINKET_IDS.length)];
                    this.gameState.inventory.addItem(tid, 1);
                    const tDef = getItemDef(tid);
                    msg += `<br>\u{1F48D} A trinket appears: <b>${tDef ? tDef.name : tid}</b>!`;
                }
                this._log(msg.replace(/<[^>]+>/g, ''));
                this._showFountainResult('\u{1F48E} Fountain of Fortune', msg);
                break;
            }
            // ── k: Spawn a nearby monster and immediately fight it ───────────
            case 10: {
                // Spawn near the fountain (or player if position unavailable).
                const spawnX = fountain ? (fountain.x + 0.5) * CELL_SIZE
                             : (this.player ? this.player.container.position.x : 0);
                const spawnZ = fountain ? (fountain.z + 0.5) * CELL_SIZE
                             : (this.player ? this.player.container.position.z : 0);
                let spawned = [];
                if (this.enemyManager) {
                    spawned = this.enemyManager.forceSpawnNear(spawnX, spawnZ, 1);
                }
                const msg = '\u{1F47A} Something stirs in the water! A creature emerges!';
                this._log(msg);
                // Trigger combat when the player dismisses the result panel.
                const triggerEnemy = spawned[0] || null;
                this._showFountainResult('\u{1F47A} Cursed Fountain!', msg, () => {
                    if (triggerEnemy && triggerEnemy.health > 0) {
                        this._startCombat(triggerEnemy);
                    }
                });
                break;
            }
            default: break;
        }
    }

    /** Show a brief result overlay (reuses the trap dialog pattern).
     * @param {string} title
     * @param {string} bodyHtml
     * @param {(() => void) | null} [onContinue] Optional callback fired after the modal closes.
     */
    _showFountainResult(title, bodyHtml, onContinue = null) {
        // Build a simple one-button modal that closes on Continue.
        // Re-use fountain modal element rather than creating another.
        if (!this._fountainModal) return;
        const box = this._fountainModal.querySelector('div');
        if (!box) return;

        // Replace box content with result view.
        box.innerHTML = `
            <div style="font-size:18px;font-weight:bold;color:#22ddff;margin-bottom:12px;">${title}</div>
            <p style="font-size:13px;margin-bottom:20px;line-height:1.7;text-align:left;">${bodyHtml}</p>
            <div style="text-align:center;">
                <button id="fountain-continue-btn" class="menu-btn">Continue</button>
            </div>`;
        this._fountainModal.style.display = 'flex';
        const btn = document.getElementById('fountain-continue-btn');
        if (btn) btn.addEventListener('click', () => {
            this._fountainModal.style.display = 'none';
            this._restoreDefaultFountainUI();
            if (onContinue) onContinue();
        });
    }

    /** Restore the default "Drink / Leave" UI inside the fountain modal. */
    _restoreDefaultFountainUI() {
        if (!this._fountainModal) return;
        const box = this._fountainModal.querySelector('div');
        if (!box) return;
        box.innerHTML = `
            <div style="font-size:18px;font-weight:bold;color:#22ddff;margin-bottom:12px;">\u{1F6B0} Magical Fountain</div>
            <p style="font-size:13px;margin-bottom:20px;line-height:1.6;">A shimmering fountain of magical water stands before you. The water glows with an unknown enchantment. Do you drink?</p>
            <div style="display:flex;gap:12px;justify-content:center;">
                <button class="menu-btn" id="fountain-drink-btn">\u{1F6B0} Drink</button>
                <button class="menu-btn back-btn" id="fountain-leave-btn">Leave</button>
            </div>`;
        document.getElementById('fountain-drink-btn')?.addEventListener('click', () => this._confirmFountain());
        document.getElementById('fountain-leave-btn')?.addEventListener('click', () => this._hideFountainModal());
    }

    // ────────────────────────────────────────────
    // Magical Chests
    // ────────────────────────────────────────────

    _checkChests() {
        if (!this.dungeonData || !this.player || !this.dungeonData.chests) return;
        if (this._chestModal && this._chestModal.style.display === 'flex') return;

        const pos = this.player.container.position;
        for (const c of this.dungeonData.chests) {
            if (c.used) continue;
            const cx = (c.x + 0.5) * CELL_SIZE;
            const cz = (c.z + 0.5) * CELL_SIZE;
            const dx = pos.x - cx;
            const dz = pos.z - cz;
            if (dx * dx + dz * dz <= CHEST_PROXIMITY * CHEST_PROXIMITY) {
                this._showChestModal(c);
                return;
            }
        }
    }

    _ensureChestState(chest) {
        if (!chest.state) {
            const dLvl = this.gameState.dungeonLevel || 1;
            const maxTrapChecks = Math.max(0, Math.floor(dLvl / 8));
            const trapChance = Math.min(1, (dLvl * 2) / 100);
            const traps = [];
            for (let i = 0; i < maxTrapChecks; i++) {
                if (Math.random() < trapChance) {
                    const def = TRAP_TYPES[Math.floor(Math.random() * TRAP_TYPES.length)] || TRAP_TYPES[0];
                    traps.push({
                        id: `${Date.now()}_${i}_${Math.floor(Math.random() * 100000)}`,
                        type: def ? def.id : 'generic',
                        resolved: false,
                        disarmed: false,
                        suffered: false,
                    });
                }
            }
            const secret = Array.from({ length: 5 }, () => String(1 + Math.floor(Math.random() * 9))).join('');
            chest.state = {
                traps,
                lock: {
                    secret,
                    attemptsLeft: 12,
                    solved: false,
                    failed: false,
                    history: [],
                },
            };
        }
        return chest.state;
    }

    _showChestModal(chest) {
        this._pendingChest = chest;
        this._ensureChestState(chest);

        if (document.pointerLockElement) document.exitPointerLock();
        this.pauseOverlay.style.display = 'none';

        if (!this._chestModal) {
            const overlay = document.createElement('div');
            overlay.id = 'chest-modal';
            Object.assign(overlay.style, {
                display: 'none',
                position: 'fixed',
                inset: '0',
                background: 'rgba(0,0,0,0.8)',
                zIndex: '1110',
                alignItems: 'center',
                justifyContent: 'center',
            });
            const box = document.createElement('div');
            box.id = 'chest-modal-box';
            Object.assign(box.style, {
                background: '#1f1308',
                border: '2px solid #ffb347',
                borderRadius: '10px',
                padding: '20px 24px',
                width: 'min(620px, 92vw)',
                color: '#f9e7c4',
                fontFamily: 'monospace',
                boxShadow: '0 0 30px rgba(255,179,71,0.35)',
            });
            overlay.appendChild(box);
            document.body.appendChild(overlay);
            this._chestModal = overlay;
        }

        this._renderChestModal();
        this._chestModal.style.display = 'flex';
    }

    _hideChestModal() {
        if (this._chestModal) this._chestModal.style.display = 'none';
        this._pendingChest = null;
        this._chestCooldown = 2.0;
        this._saveNow();
    }

    _nextUnresolvedChestTrap(state) {
        return (state.traps || []).find(t => !t.resolved) || null;
    }

    _renderChestModal() {
        if (!this._chestModal || !this._pendingChest) return;
        const state = this._ensureChestState(this._pendingChest);
        const box = this._chestModal.querySelector('#chest-modal-box');
        if (!box) return;

        const pendingTrap = this._nextUnresolvedChestTrap(state);
        if (pendingTrap) {
            const def = this._trapDef(pendingTrap);
            const rogues = (this.gameState.party || []).filter(m => !m.isSummoned && m.classId === 'rogue' && m.health > 0);

            let body = `<div style="font-size:18px;font-weight:bold;color:#ffcf7d;margin-bottom:10px;">🪄 Sealed Arcane Chest</div>`;
            body += `<div style="margin-bottom:10px;"><b>${def.icon} ${def.name}</b> detected on the chest lockwork.</div>`;
            body += `<div style="margin-bottom:12px;color:#e6d6b2;">${def.hint || 'Runes hum with danger.'}</div>`;

            if (rogues.length > 0) {
                body += '<div style="margin-bottom:10px;">Choose a rogue to disarm this trap:</div>';
                body += '<div id="chest-btn-row" style="display:flex;flex-wrap:wrap;gap:8px;margin-bottom:10px;"></div>';
                body += '<div style="font-size:12px;color:#d8c9aa;">Failure hurts only the selected rogue, like normal trap disarm.</div>';
                body += '<div style="display:flex;gap:8px;justify-content:flex-end;margin-top:14px;">' +
                    '<button id="chest-leave-btn" class="menu-btn back-btn">Leave for now</button>' +
                    '</div>';
                box.innerHTML = body;

                const row = box.querySelector('#chest-btn-row');
                for (const r of rogues) {
                    const chance = TRAP_DISARM_BASE + TRAP_DISARM_PER_LEVEL * Math.max(0, r.level - 1);
                    const btn = document.createElement('button');
                    btn.className = 'menu-btn';
                    btn.textContent = `${r.name} disarms (${Math.round(chance * 100)}%)`;
                    btn.addEventListener('click', () => this._resolveChestTrapWithRogue(this._pendingChest, pendingTrap, r));
                    row.appendChild(btn);
                }
            } else {
                body += '<div style="margin-bottom:10px;color:#ffc9a0;">No living rogue is available to disarm this chest trap.</div>';
                body += '<div style="margin-bottom:10px;">You can force your way through the trap, or leave and return later.</div>';
                body += '<div style="display:flex;gap:8px;justify-content:flex-end;margin-top:14px;">' +
                    '<button id="chest-endure-btn" class="menu-btn">Trigger Trap</button>' +
                    '<button id="chest-leave-btn" class="menu-btn back-btn">Leave for now</button>' +
                    '</div>';
                box.innerHTML = body;
                box.querySelector('#chest-endure-btn')?.addEventListener('click', () => this._sufferChestTrap(this._pendingChest, pendingTrap));
            }
            box.querySelector('#chest-leave-btn')?.addEventListener('click', () => this._hideChestModal());
            return;
        }

        const lock = state.lock;
        if (lock.failed) {
            this._resolveChestFailure(this._pendingChest, true);
            return;
        }
        if (lock.solved) {
            this._resolveChestSuccess(this._pendingChest, true);
            return;
        }

        const historyHtml = (lock.history || []).map(h => {
            // Show summary feedback instead of per-digit X's
            return `<div style="padding:5px 0;border-top:1px solid rgba(255,179,71,0.2);">
                <b>${h.guess}</b> → 
                <span style="color:#51e06f;font-weight:bold;">${h.green} correct in place</span>, 
                <span style="color:#f0c94b;font-weight:bold;">${h.yellow} correct but wrong place</span>, 
                <span style="color:#ff6262;font-weight:bold;">${h.red} incorrect</span>
            </div>`;
        }).join('');

        box.innerHTML = `
            <div style="font-size:18px;font-weight:bold;color:#ffcf7d;margin-bottom:10px;">🔐 Arcane Lock Puzzle</div>
            <div style="font-size:13px;line-height:1.6;margin-bottom:10px;">
                Enter a 5-digit code (digits 1-9). You have <b>${lock.attemptsLeft}</b> guesses left.<br>
                Feedback: <span style="color:#51e06f;font-weight:bold;">N correct in place</span>, <span style="color:#f0c94b;font-weight:bold;">M correct but wrong place</span>, <span style="color:#ff6262;font-weight:bold;">K incorrect</span>.
            </div>
            <div style="display:flex;gap:8px;align-items:center;margin-bottom:12px;">
                <input id="chest-code-input" type="text" maxlength="5" placeholder="12345"
                    style="flex:1;background:#130c07;border:1px solid #8f6a3f;color:#f5e4c8;padding:8px;border-radius:6px;font-family:monospace;">
                <button id="chest-guess-btn" class="menu-btn">Submit Guess</button>
                <button id="chest-leave-btn" class="menu-btn back-btn">Leave</button>
            </div>
            <div style="max-height:420px;overflow:auto;background:rgba(0,0,0,0.22);padding:8px;border-radius:6px;">
                ${historyHtml || '<i>No guesses yet.</i>'}
            </div>`;

        const input = box.querySelector('#chest-code-input');
        const submit = () => {
            const val = (input && input.value ? input.value : '').trim();
            this._submitChestGuess(this._pendingChest, val);
        };
        box.querySelector('#chest-guess-btn')?.addEventListener('click', submit);
        box.querySelector('#chest-leave-btn')?.addEventListener('click', () => this._hideChestModal());
        input?.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') submit();
        });
        input?.focus();
    }

    _resolveChestTrapWithRogue(chest, trap, rogue) {
        if (!chest || !trap || !rogue) return;
        const def = this._trapDef(trap);
        const chance = TRAP_DISARM_BASE + TRAP_DISARM_PER_LEVEL * Math.max(0, rogue.level - 1);

        if (Math.random() < chance) {
            trap.resolved = true;
            trap.disarmed = true;
            this._log(`🧰 ${rogue.name} disarms a ${def.name} on the magical chest.`);
            if (rogue.level >= ROGUE_TRAP_UNLOCK_LEVEL && typeof rogue.addItem === 'function') {
                rogue.addItem('captured_trap', 1);
                const defItem = getItemDef('captured_trap');
                this._log(`🪤 ${rogue.name} recovers ${defItem ? defItem.name : 'Captured Trap'}.`);
                if (this.partyHUD) this.partyHUD.showToast('+Captured Trap');
            }
        } else {
            let dmg = 0;
            const dlvl = this.gameState.dungeonLevel || 1;
            for (let i = 0; i < TRAP_DICE_COUNT; i++) dmg += 1 + Math.floor(Math.random() * TRAP_DICE_SIDES);
            dmg *= dlvl;

            rogue.health = Math.max(0, rogue.health - dmg);
            trap.resolved = true;
            trap.suffered = true;
            this._log(`💥 ${rogue.name} fails to disarm the chest ${def.name} and takes ${dmg} damage.`);

            if (def.kind === 'poison' && rogue.health > 0) {
                const perTick = Math.max(1, Math.floor(dmg * POISON_DAMAGE_FRACTION));
                rogue.addEffect({ type: 'poison', rounds: POISON_DURATION_ROUNDS, damage: perTick });
                this._log(`🟢 ${rogue.name} is poisoned! (${perTick}/rd for ${POISON_DURATION_ROUNDS} rds)`);
            }
            if (rogue.health <= 0) this._log(`⚰️ ${rogue.name} has fallen while disarming a chest trap.`);
        }

        if (this.partyHUD) this.partyHUD.update(this.gameState.party, this.gameState.inventory);
        this._saveNow();

        if (this._isPartyWiped()) {
            this._showChestResult('💀 Party Wipe', 'The chest trap has slain your entire party.', () => this._onPartyWipe());
            return;
        }
        this._renderChestModal();
    }

    _sufferChestTrap(chest, trap) {
        if (!chest || !trap) return;
        const def = this._trapDef(trap);
        const dlvl = this.gameState.dungeonLevel || 1;
        let dmg = 0;
        for (let i = 0; i < TRAP_DICE_COUNT; i++) dmg += 1 + Math.floor(Math.random() * TRAP_DICE_SIDES);
        dmg *= dlvl;

        const fallen = [];
        for (const m of this.gameState.party) {
            if (m.isSummoned || m.health <= 0) continue;
            m.health = Math.max(0, m.health - dmg);
            if (def.kind === 'poison' && m.health > 0) {
                const perTick = Math.max(1, Math.floor(dmg * POISON_DAMAGE_FRACTION));
                m.addEffect({ type: 'poison', rounds: POISON_DURATION_ROUNDS, damage: perTick });
            }
            if (m.health <= 0) fallen.push(m.name);
        }

        trap.resolved = true;
        trap.suffered = true;
        this._log(`💥 The chest ${def.name} triggers! Each party member takes ${dmg} damage.`);
        if (fallen.length > 0) this._log(`⚰️ Fallen: ${fallen.join(', ')}`);

        if (this.partyHUD) this.partyHUD.update(this.gameState.party, this.gameState.inventory);
        this._saveNow();

        if (this._isPartyWiped()) {
            this._showChestResult('💀 Party Wipe', 'The chest trap has slain your entire party.', () => this._onPartyWipe());
            return;
        }
        this._renderChestModal();
    }

    _rateChestGuess(secret, guess) {
        let green = 0;
        const sRem = [];
        const gRem = [];
        for (let i = 0; i < 5; i++) {
            if (secret[i] === guess[i]) {
                green++;
            } else {
                sRem.push(secret[i]);
                gRem.push(guess[i]);
            }
        }

        const counts = {};
        for (const d of sRem) counts[d] = (counts[d] || 0) + 1;
        let yellow = 0;
        for (const d of gRem) {
            if ((counts[d] || 0) > 0) {
                yellow++;
                counts[d]--;
            }
        }
        const red = 5 - green - yellow;

        const marks = [];
        for (let i = 0; i < green; i++) marks.push('g');
        for (let i = 0; i < yellow; i++) marks.push('y');
        for (let i = 0; i < red; i++) marks.push('r');
        for (let i = marks.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            const tmp = marks[i];
            marks[i] = marks[j];
            marks[j] = tmp;
        }
        return { green, yellow, red, marks };
    }

    _submitChestGuess(chest, guess) {
        if (!chest || !chest.state || !chest.state.lock) return;
        const lock = chest.state.lock;

        if (!/^[1-9]{5}$/.test(guess)) {
            this._showChestResult('🔐 Invalid Guess', 'Enter exactly 5 digits, each from 1 to 9.', () => this._renderChestModal());
            return;
        }

        if (lock.attemptsLeft <= 0 || lock.solved || lock.failed) return;

        const result = this._rateChestGuess(lock.secret, guess);
        lock.attemptsLeft = Math.max(0, lock.attemptsLeft - 1);
        lock.history.push({ guess, ...result });

        if (result.green === 5) {
            lock.solved = true;
            this._saveNow();
            this._resolveChestSuccess(chest);
            return;
        }

        if (lock.attemptsLeft <= 0) {
            lock.failed = true;
            this._saveNow();
            this._resolveChestFailure(chest);
            return;
        }

        this._saveNow();
        this._renderChestModal();
    }

    _rollChestTreasure() {
        const dlvl = this.gameState.dungeonLevel || 1;
        const items = [];
        let gold = 0;

        if (Math.random() < TRAP_TREASURE_CHANCE) {
            const low = TRAP_TREASURE_MIN * dlvl * 2;
            const high = TRAP_TREASURE_MAX * dlvl * 2;
            const baseGold = low + Math.floor(Math.random() * (high - low + 1));
            gold = baseGold * 100;
            this.gameState.inventory.addGold(gold);

            const numRolls = dlvl;
            const reagentId = dlvl < REAGENT_TIER_UNCOMMON_MIN ? 'reagent_common'
                : dlvl < REAGENT_TIER_RARE_MIN ? 'reagent_uncommon'
                    : 'reagent_rare';

            for (let r = 0; r < numRolls; r++) {
                const roll = Math.random();
                let itemId = null;
                if (roll < 0.35) itemId = 'food';
                else if (roll < 0.55) itemId = reagentId;
                else if (roll < 0.70) itemId = 'healing_potion';
                else if (roll < 0.80) itemId = randomWeaponDrop();
                else if (roll < 0.90) itemId = randomArmorDrop();
                else itemId = randomShieldDrop();
                if (itemId) {
                    this.gameState.inventory.addItem(itemId, 1);
                    const d = getItemDef(itemId);
                    items.push(d ? d.name : itemId);
                }
            }

            const trinketChance = Math.min(1, 0.66);
            for (let pass = 0; pass < 3; pass++) {
                if (Math.random() < trinketChance && TRINKET_IDS.length > 0) {
                    const tid = TRINKET_IDS[Math.floor(Math.random() * TRINKET_IDS.length)];
                    this.gameState.inventory.addItem(tid, 1);
                    const tDef = getItemDef(tid);
                    items.push(tDef ? tDef.name : tid);
                }
            }
        }

        return { gold, items };
    }

    _resolveChestSuccess(chest, resumeOnly = false) {
        if (!chest) return;
        const lock = chest.state && chest.state.lock;
        if (!resumeOnly && lock) lock.solved = true;

        const loot = this._rollChestTreasure();
        chest.used = true;
        if (this.dungeonRenderer) this.dungeonRenderer.removeChest(chest.x, chest.z);

        if (this.partyHUD) {
            if (loot.gold > 0) this.partyHUD.showToast(`+${loot.gold} gold`);
            this.partyHUD.update(this.gameState.party, this.gameState.inventory);
        }
        this._saveNow();

        let body = 'The lock clicks open and the chest unfolds in a burst of arcane light.';
        if (loot.gold > 0 || loot.items.length > 0) {
            body += '<br><br>';
            if (loot.gold > 0) body += `💎 <b>${loot.gold} gold</b><br>`;
            if (loot.items.length > 0) body += `📦 ${loot.items.join(', ')}`;
        } else {
            body += '<br><br><i>The chest was real, but empty.</i>';
        }
        this._showChestResult('✨ Magical Chest Opened', body, () => this._hideChestModal());
    }

    _resolveChestFailure(chest, resumeOnly = false) {
        if (!chest) return;
        const lock = chest.state && chest.state.lock;
        if (!resumeOnly && lock) lock.failed = true;

        chest.used = true;
        if (this.dungeonRenderer) this.dungeonRenderer.removeChest(chest.x, chest.z);
        this._saveNow();

        this._showChestResult('💨 Lock Failed', 'The final rune sputters out. The magical chest vanishes into dust!', () => this._hideChestModal());
    }

    _showChestResult(title, bodyHtml, onContinue) {
        if (!this._chestModal) return;
        const box = this._chestModal.querySelector('#chest-modal-box');
        if (!box) return;
        box.innerHTML = `
            <div style="font-size:18px;font-weight:bold;color:#ffcf7d;margin-bottom:10px;">${title}</div>
            <div style="font-size:13px;line-height:1.7;margin-bottom:14px;">${bodyHtml}</div>
            <div style="text-align:right;"><button id="chest-result-continue" class="menu-btn">Continue</button></div>`;
        box.querySelector('#chest-result-continue')?.addEventListener('click', () => {
            if (onContinue) onContinue();
        });
        this._chestModal.style.display = 'flex';
    }

    /**
     * Bard song ongoing mana drain — called once per in-game minute.
     * Each bard with active songs loses BARD_SONG_MANA_PER_MIN mana.
     * If the bard runs out of mana all songs are automatically deactivated.
     */
    _drainBardSongMana() {
        if (!this.gameState || !this.gameState.party) return;
        let hudDirty = false;

        for (const m of this.gameState.party) {
            if (m.classId !== 'bard' || m.health <= 0) continue;
            if (!Array.isArray(m.activeSongs) || m.activeSongs.length === 0) continue;

            m.mana = Math.max(0, m.mana - BARD_SONG_MANA_PER_MIN);
            if (m.mana === 0) {
                // Deactivate all songs — bard is out of mana
                m.activeSongs = [];
                m.activeEffects = (m.activeEffects || []).filter(e => !(e && e.source === 'bard_song'));
                for (const other of this.gameState.party) {
                    if (other === m) continue;
                    other.activeEffects = (other.activeEffects || []).filter(e => !(e && e.source === 'bard_song'));
                }
                this._log(`\u{1F3B5} ${m.name}'s bard song fades — out of mana!`);
                if (this.partyHUD) this.partyHUD.showToast(`${m.name}'s song ends — no mana!`);
            } else {
                this._log(`\u{1F3B5} ${m.name}'s song costs ${BARD_SONG_MANA_PER_MIN} MP (${m.mana}/${m.maxMana} remaining).`);
            }
            hudDirty = true;
        }

        if (hudDirty && this.partyHUD) {
            this.partyHUD.update(this.gameState.party, this.gameState.inventory);
        }
    }

    /**
     * Food / hunger tick — called every exploration frame.
     * Each party member's foodTimer advances by dt seconds. When it reaches
     * FOOD_CHECK_INTERVAL the member needs to eat: personal inventory first,
     * group inventory second. Missing a check advances the hunger state.
     */
    _tickFood(dt) {
        if (!this.gameState || !this.gameState.party) return;
        let hudDirty = false;

        for (const m of this.gameState.party) {
            // Skip: creatures that don't need food, or already dead members.
            if (!m.requiresFood) continue;
            if (m.health <= 0) continue;

            m.foodTimer = (m.foodTimer || 0) + dt;
            if (m.foodTimer < FOOD_CHECK_INTERVAL) continue;

            // Time to eat — consume one food.
            m.foodTimer -= FOOD_CHECK_INTERVAL;

            let ate = false;
            // 1. Personal inventory (PartyMember.inventory is a plain array of {itemId,quantity}).
            const personalSlot = m.inventory.find(i => i.itemId === 'food' && i.quantity > 0);
            if (personalSlot) {
                personalSlot.quantity -= 1;
                if (personalSlot.quantity <= 0) {
                    m.inventory.splice(m.inventory.indexOf(personalSlot), 1);
                }
                ate = true;
            }
            // 2. Group inventory.
            if (!ate && this.gameState.inventory.getItemCount('food') > 0) {
                this.gameState.inventory.removeItem('food', 1);
                ate = true;
            }

            if (ate) {
                if (m.hungerState) {
                    const prev = m.hungerState;
                    m.hungerState = null;
                    m._dyingDrainAcc = 0;
                    this._log(`\u{1F35E} ${m.name} eats and recovers from ${prev}.`);
                    if (this.partyHUD) this.partyHUD.showToast(`${m.name} is no longer ${prev}.`);
                    hudDirty = true;
                } else {
                    // Normal eating — brief log + on-screen notice
                    this._log(`\u{1F35E} ${m.name} eats some food.`);
                    if (this.partyHUD) this.partyHUD.showToast(`${m.name} eats food.`);
                }
            } else {
                // No food available — advance hunger state.
                const prev = m.hungerState;
                if (!m.hungerState) {
                    m.hungerState = 'hungry';
                    this._log(`\u{1F37D}\uFE0F ${m.name} is hungry! \u22121 to damage and defense.`);
                    if (this.partyHUD) this.partyHUD.showToast(`${m.name} is hungry!`);
                } else if (m.hungerState === 'hungry') {
                    m.hungerState = 'starving';
                    this._log(`\u{1F630} ${m.name} is starving! \u22122 damage/defense, no regen.`);
                    if (this.partyHUD) this.partyHUD.showToast(`${m.name} is STARVING!`);
                } else if (m.hungerState === 'starving') {
                    m.hungerState = 'dying';
                    this._log(`\u{1F480} ${m.name} is dying of hunger! \u22123 penalty, losing HP.`);
                    if (this.partyHUD) this.partyHUD.showToast(`${m.name} is DYING of hunger!`);
                }
                // Already 'dying' — state stays, HP drain handled in tickRegen.
                if (m.hungerState !== prev) hudDirty = true;
            }
        }

        if (hudDirty && this.partyHUD) {
            this.partyHUD.update(this.gameState.party, this.gameState.inventory);
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
    // Minimap entity helper
    // ────────────────────────────────────────────

    /**
     * Build the entity overlay data for MinimapUI.
     * - Tinkerer: shown as purple dot once encountered, while it exists on the map.
     * - Tracked enemies: ranger Track ability reveals all enemies as blue dots on
     *   explored cells. Currently rangers at level 3+ automatically track.
     */
    _buildMinimapEntities() {
        const enemies = this.enemyManager ? this.enemyManager.getEnemies() : [];

        // Tinkerer position (only after first encounter)
        let tinkerer = null;
        if (this.gameState && this.gameState.tinkererEncountered) {
            const tinkererEnemy = enemies.find(e => e.type === 'tinkerer' && e.health > 0);
            if (tinkererEnemy) {
                tinkerer = { gx: tinkererEnemy.gridX, gz: tinkererEnemy.gridZ };
            }
        }

        // Tracked enemies — ranger at level 3+ reveals all live enemies
        const hasTracker = (this.gameState.party || []).some(
            m => m.classId === 'ranger' && m.health > 0 && m.level >= 3,
        );
        const trackedEnemies = hasTracker
            ? enemies
                .filter(e => !e.friendly && e.health > 0)
                .map(e => ({ gx: e.gridX, gz: e.gridZ }))
            : [];

        return { tinkerer, trackedEnemies };
    }

    // ────────────────────────────────────────────
    // Shop (Tinkerer)
    // ────────────────────────────────────────────

    _openShop() {
        document.exitPointerLock();
        soundManager.playMonsterSound('tinkerer');
        // Mark that the tinkerer has been encountered so the minimap tracks it.
        if (this.gameState) this.gameState.tinkererEncountered = true;
        this.shopUI.show();
    }

    // ────────────────────────────────────────────
    // Rest
    // ────────────────────────────────────────────

    _onRest() {
        if (this.state !== STATE.PLAYING) return;
        const inv = this.gameState.inventory;

        // 1 food per living non-golem party member (golems don't eat)
        const foodCost = Math.max(1, this.gameState.party.filter(m =>
            m.health > 0 && !(m.isSummoned && m.summonStats && m.summonStats.tierId)
        ).length);

        if (!inv.hasItem('food', foodCost)) {
            const have = (inv.items.find(i => i.itemId === 'food') || {}).quantity || 0;
            this.partyHUD.showToast(`Not enough food to rest! Need ${foodCost}, have ${have}.`);
            return;
        }

        inv.removeItem('food', foodCost);
        soundManager.playRest();

        const restMessages = [];
        for (const m of this.gameState.party) {
            if (m.health <= 0) continue;

            // Golems do not heal on rest — they are constructs, not living creatures.
            // Exception: flesh golems have built-in regeneration handled by their own regen.
            if (m.isSummoned && m.summonStats && m.summonStats.tierId) {
                if (m.summonStats.tierId === 'flesh' && m.summonStats.regenPercent > 0) {
                    // Flesh golem partial regen on rest
                    const regenAmt = Math.max(1, Math.floor(m.maxHealth * m.summonStats.regenPercent));
                    const before = m.health;
                    m.health = Math.min(m.maxHealth, m.health + regenAmt);
                    if (m.health > before) restMessages.push(`${m.name} knits flesh and recovers ${m.health - before} HP.`);
                }
                // All other golems: skip rest healing entirely
                continue;
            }

            m.health  = Math.min(m.maxHealth,  m.health  + Math.ceil(m.maxHealth  * REST_RECOVERY_PERCENT));
            m.stamina = Math.min(m.maxStamina, m.stamina + Math.ceil(m.maxStamina * REST_RECOVERY_PERCENT));
            m.mana    = Math.min(m.maxMana,    m.mana    + Math.ceil(m.maxMana    * REST_RECOVERY_PERCENT));
        }

        this.partyHUD.update(this.gameState.party, this.gameState.inventory);
        this.partyHUD.showToast(`The party rests and recovers. (${foodCost} food consumed)`);
        this._log(`\u{1F35E} The party eats and rests — ${foodCost} food consumed. Health, stamina, and mana restored.`);
        for (const msg of restMessages) this._log(msg);
        this._saveNow();
    }

    // ────────────────────────────────────────────
    // Recruit
    // ────────────────────────────────────────────

    _populateRecruitSelects() {
        if (!this._recruitClass || !this._recruitSpecies) return;
        this._recruitClass.innerHTML = '';
        for (const id of CLASS_IDS) {
            if (id === 'summoned') continue;
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
        const FRONT_ROW_CLASSES = new Set(['warrior', 'monk', 'paladin', 'barbarian']);
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
