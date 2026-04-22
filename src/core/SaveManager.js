/**
 * SaveManager — thin wrapper around IndexedDB for persistent game saves.
 *
 * Each save is a plain-object snapshot of the full game state
 * (party, enemies, player position, timers). Multiple save slots
 * are supported with create / update / list / delete operations.
 */
export class SaveManager {
    constructor(dbName = 'DungeonCrawlers', storeName = 'saves') {
        this.dbName = dbName;
        this.storeName = storeName;
        this.db = null;
    }

    /** Must be called (and awaited) before any other method. */
    async init() {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open(this.dbName, 1);

            request.onupgradeneeded = (e) => {
                const db = e.target.result;
                if (!db.objectStoreNames.contains(this.storeName)) {
                    const store = db.createObjectStore(this.storeName, {
                        keyPath: 'id',
                        autoIncrement: true,
                    });
                    store.createIndex('updatedAt', 'updatedAt', { unique: false });
                }
            };

            request.onsuccess = (e) => {
                this.db = e.target.result;
                resolve();
            };

            request.onerror = (e) => reject(e.target.error);
        });
    }

    /**
     * Create or update a save.
     * If `data.id` exists, updates that record; otherwise creates a new one.
     * Returns the record id.
     */
    async save(data) {
        return new Promise((resolve, reject) => {
            const tx = this.db.transaction(this.storeName, 'readwrite');
            const store = tx.objectStore(this.storeName);

            data.updatedAt = Date.now();
            if (!data.createdAt) data.createdAt = data.updatedAt;

            const request = store.put(data);
            request.onsuccess = () => resolve(request.result);
            request.onerror = (e) => reject(e.target.error);
        });
    }

    /** Load a single save by id. */
    async load(id) {
        return new Promise((resolve, reject) => {
            const tx = this.db.transaction(this.storeName, 'readonly');
            const store = tx.objectStore(this.storeName);
            const request = store.get(id);
            request.onsuccess = () => resolve(request.result);
            request.onerror = (e) => reject(e.target.error);
        });
    }

    /** List all saves, newest first. */
    async listSaves() {
        return new Promise((resolve, reject) => {
            const tx = this.db.transaction(this.storeName, 'readonly');
            const store = tx.objectStore(this.storeName);
            const request = store.getAll();
            request.onsuccess = () => {
                const saves = request.result;
                saves.sort((a, b) => b.updatedAt - a.updatedAt);
                resolve(saves);
            };
            request.onerror = (e) => reject(e.target.error);
        });
    }

    /** Delete a save by id. */
    async deleteSave(id) {
        return new Promise((resolve, reject) => {
            const tx = this.db.transaction(this.storeName, 'readwrite');
            const store = tx.objectStore(this.storeName);
            const request = store.delete(id);
            request.onsuccess = () => resolve();
            request.onerror = (e) => reject(e.target.error);
        });
    }
}
