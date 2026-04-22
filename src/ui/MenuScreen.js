import { CLASSES, CLASS_IDS } from '../entities/Classes.js';
import { SPECIES, SPECIES_IDS } from '../entities/Species.js';

/**
 * MenuScreen — main-menu, character-creation (name/class/species), and load screens.
 */
export class MenuScreen {
    /**
     * @param {import('../core/SaveManager.js').SaveManager} saveManager
     * @param {{ onNewGame: Function, onLoadGame: Function }} callbacks
     */
    constructor(saveManager, callbacks) {
        this.saveManager = saveManager;
        this.onNewGame  = callbacks.onNewGame;   // (name, classId, speciesId) => void
        this.onLoadGame = callbacks.onLoadGame;

        this.mainMenu    = document.getElementById('main-menu');
        this.nameModal   = document.getElementById('name-input-modal');
        this.nameInput   = document.getElementById('player-name');
        this.classSelect = document.getElementById('player-class');
        this.speciesSelect = document.getElementById('player-species');
        this.classDescEl = document.getElementById('class-desc');
        this.speciesDescEl = document.getElementById('species-desc');
        this.nameError   = document.getElementById('name-error');
        this.loadScreen  = document.getElementById('load-screen');
        this.slotsList   = document.getElementById('save-slots-list');

        this._populateSelects();

        document.getElementById('btn-new-game')
            .addEventListener('click', () => this._showNameInput());
        document.getElementById('btn-load-game')
            .addEventListener('click', () => this._showLoadScreen());
        document.getElementById('btn-back-menu')
            .addEventListener('click', () => this._showMainMenu());

        document.getElementById('btn-start-adventure')
            .addEventListener('click', () => this._confirmName());
        document.getElementById('btn-cancel-name')
            .addEventListener('click', () => this._showMainMenu());

        this.nameInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') this._confirmName();
        });
        this.nameInput.addEventListener('input', () => {
            this.nameInput.value = this.nameInput.value.replace(/[^a-zA-Z0-9 ]/g, '');
        });

        this.classSelect.addEventListener('change', () => this._updateDescriptions());
        this.speciesSelect.addEventListener('change', () => this._updateDescriptions());
    }

    _populateSelects() {
        this.classSelect.innerHTML = '';
        for (const id of CLASS_IDS) {
            const c = CLASSES[id];
            const opt = document.createElement('option');
            opt.value = id;
            opt.textContent = `${c.icon}  ${c.name}`;
            this.classSelect.appendChild(opt);
        }
        this.speciesSelect.innerHTML = '';
        for (const id of SPECIES_IDS) {
            const s = SPECIES[id];
            const opt = document.createElement('option');
            opt.value = id;
            opt.textContent = `${s.icon}  ${s.name}`;
            this.speciesSelect.appendChild(opt);
        }
        this._updateDescriptions();
    }

    _updateDescriptions() {
        if (this.classDescEl) {
            const c = CLASSES[this.classSelect.value];
            if (c) this.classDescEl.textContent = c.description;
        }
        if (this.speciesDescEl) {
            const s = SPECIES[this.speciesSelect.value];
            if (s) this.speciesDescEl.textContent = s.description;
        }
    }

    show() { this._showMainMenu(); }
    hide() {
        this.mainMenu.style.display   = 'none';
        this.nameModal.style.display  = 'none';
        this.loadScreen.style.display = 'none';
    }

    _showMainMenu() {
        this.mainMenu.style.display    = 'flex';
        this.nameModal.style.display   = 'none';
        this.loadScreen.style.display  = 'none';
    }

    _showNameInput() {
        this.mainMenu.style.display   = 'none';
        this.nameModal.style.display  = 'flex';
        this.nameInput.value = '';
        this.nameError.textContent = '';
        // Default to warrior / human
        this.classSelect.value = 'warrior';
        this.speciesSelect.value = 'human';
        this._updateDescriptions();
        this.nameInput.focus();
    }

    _confirmName() {
        const raw = this.nameInput.value.trim();
        if (raw.length === 0) { this.nameError.textContent = 'Please enter a name.'; return; }
        if (raw.length > 32)  { this.nameError.textContent = 'Name must be 32 characters or fewer.'; return; }
        const clean = raw.replace(/[^a-zA-Z0-9 ]/g, '');
        if (clean.length === 0) { this.nameError.textContent = 'Name must contain letters or numbers.'; return; }
        this.nameError.textContent = '';

        const classId = this.classSelect.value;
        const speciesId = this.speciesSelect.value;
        this.onNewGame(clean, classId, speciesId);
    }

    async _showLoadScreen() {
        this.mainMenu.style.display   = 'none';
        this.nameModal.style.display  = 'none';
        this.loadScreen.style.display = 'flex';

        const saves = await this.saveManager.listSaves();
        this.slotsList.innerHTML = '';

        if (saves.length === 0) {
            const msg = document.createElement('p');
            msg.className = 'no-saves';
            msg.textContent = 'No saved games found.';
            this.slotsList.appendChild(msg);
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
            loadBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.onLoadGame(save.id);
            });
            slot.appendChild(loadBtn);

            const delBtn = document.createElement('button');
            delBtn.className = 'save-slot-btn delete-btn';
            delBtn.textContent = 'Delete';
            delBtn.addEventListener('click', async (e) => {
                e.stopPropagation();
                await this.saveManager.deleteSave(save.id);
                this._showLoadScreen();
            });
            slot.appendChild(delBtn);

            this.slotsList.appendChild(slot);
        }
    }
}
