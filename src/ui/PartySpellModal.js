/**
 * PartySpellModal — the "V" key party spell / out-of-combat action screen.
 *
 * Shows two sections if the relevant characters are present and eligible:
 *
 *   🎶 Bard Songs
 *     Haste Song    — party-wide initiative bonus (+1 per 5 bard levels)
 *     Battle Song   — party-wide attack/defense bonus
 *     Healing Song  — party-wide HP regen bonus
 *     Songs persist until manually deactivated or the bard falls.
 *     Max active songs = Math.max(1, Math.floor(bardLevel / 5)).
 *
 *   ✨ Cleric
 *     Revive — raise a fallen non-summoned party member to 25% HP.
 *     Requires cleric level ≥ CLERIC_REVIVE_MIN_LEVEL, costs CLERIC_REVIVE_MANA_COST.
 *
 * `onChanged(party)` is called whenever the party state is mutated so
 * Game.js can refresh the HUD and song tooltip.
 */

import {
    BARD_HASTE_MANA_COST, BARD_BATTLE_MANA_COST, BARD_HEALING_MANA_COST,
    BARD_HASTE_MAX, BARD_BATTLE_MAX,
    CLERIC_REVIVE_MANA_COST, CLERIC_REVIVE_MIN_LEVEL, CLERIC_REVIVE_HEAL_FRAC,
} from '../utils/constants.js';
import { soundManager } from '../utils/SoundManager.js';

// ── Song definitions ──────────────────────────────────────────────────────────

const SONGS = [
    {
        id: 'haste',
        icon: '⚡',
        name: 'Haste Song',
        manaCost: BARD_HASTE_MANA_COST,
        description: (bonus) => `Party +${bonus} initiative (max ${BARD_HASTE_MAX})`,
        /** Build the effect object pushed onto each party member. */
        makeEffect: (bonus) => ({
            type: 'bard_song_haste',
            source: 'bard_song',
            initiativeBonus: Math.min(BARD_HASTE_MAX, bonus),
        }),
    },
    {
        id: 'battle',
        icon: '⚔️',
        name: 'Battle Song',
        manaCost: BARD_BATTLE_MANA_COST,
        description: (bonus) => `Party +${bonus} attack & +${bonus} defense (max ${BARD_BATTLE_MAX})`,
        makeEffect: (bonus) => ({
            type: 'bard_song_battle',
            source: 'bard_song',
            damageBonus:  Math.min(BARD_BATTLE_MAX, bonus),
            defenseBonus: Math.min(BARD_BATTLE_MAX, bonus),
        }),
    },
    {
        id: 'healing',
        icon: '💚',
        name: 'Healing Song',
        manaCost: BARD_HEALING_MANA_COST,
        description: (bonus) => `Party +${bonus} HP regen/min`,
        makeEffect: (bonus) => ({
            type: 'bard_song_healing',
            source: 'bard_song',
            hpPerMin: bonus,
        }),
    },
];

// ── Helpers ───────────────────────────────────────────────────────────────────

/** Scaling value for a bard: Math.max(1, Math.floor(level / 5)) */
function bardScale(level) {
    return Math.max(1, Math.floor(level / 5));
}

/** Remove all bard song effects of a specific song type from a party member. */
function stripSongEffect(member, songId) {
    const effectType = `bard_song_${songId}`;
    member.activeEffects = (member.activeEffects || []).filter(
        e => !(e && e.source === 'bard_song' && e.type === effectType),
    );
}

/** Remove ALL bard song effects from every party member. */
function stripAllSongEffects(party) {
    for (const m of party) {
        m.activeEffects = (m.activeEffects || []).filter(
            e => !(e && e.source === 'bard_song'),
        );
    }
}

// ── PartySpellModal ───────────────────────────────────────────────────────────

export class PartySpellModal {
    /**
     * @param {(party: object[]) => void} onChanged  Called after any state mutation.
     */
    constructor(onChanged) {
        this._onChanged = onChanged || (() => {});
        this._party = null;
        this._overlay = null;
        this._musicEnabled = true; // whether the loop sound plays

        this._buildDOM();
    }

    // ── Public API ─────────────────────────────────────────────────────────────

    get isOpen() {
        return this._overlay !== null && this._overlay.style.display === 'flex';
    }

    show(party) {
        this._party = party;
        this._render();
        this._overlay.style.display = 'flex';
    }

    hide() {
        if (this._overlay) this._overlay.style.display = 'none';
    }

    /**
     * Re-apply song effects for all active songs on every bard in the party.
     * Called by Game.js on load and after modal changes so the effect objects
     * match the persisted activeSongs list.
     */
    static reapplySongEffects(party) {
        // Strip all existing song effects first.
        stripAllSongEffects(party);

        // Find bards with active songs.
        for (const m of party) {
            if (m.classId !== 'bard' || !Array.isArray(m.activeSongs) || m.health <= 0) continue;
            const scale = bardScale(m.level);
            for (const songId of m.activeSongs) {
                const def = SONGS.find(s => s.id === songId);
                if (!def) continue;
                const effect = def.makeEffect(scale);
                for (const member of party) {
                    if (member.health <= 0) continue;
                    // Remove stale copy of this song first, then add fresh one.
                    stripSongEffect(member, songId);
                    member.activeEffects.push({ ...effect });
                }
            }
        }
    }

    // ── DOM building ──────────────────────────────────────────────────────────

    _buildDOM() {
        const overlay = document.createElement('div');
        overlay.id = 'party-spell-overlay';
        Object.assign(overlay.style, {
            display: 'none',
            position: 'fixed',
            inset: '0',
            background: 'rgba(0,0,0,0.75)',
            zIndex: '1200',
            alignItems: 'center',
            justifyContent: 'center',
        });

        const panel = document.createElement('div');
        Object.assign(panel.style, {
            background: '#1a1a2e',
            border: '2px solid #4a4a8a',
            borderRadius: '10px',
            padding: '20px 28px',
            minWidth: '340px',
            maxWidth: '480px',
            maxHeight: '80vh',
            overflowY: 'auto',
            color: '#ddd',
            fontFamily: 'monospace',
            boxShadow: '0 0 24px rgba(100,100,255,0.3)',
        });

        // Header row
        const header = document.createElement('div');
        Object.assign(header.style, {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '14px',
            borderBottom: '1px solid #4a4a8a',
            paddingBottom: '8px',
        });
        const title = document.createElement('span');
        title.textContent = '✨ Party Spells  [V]';
        Object.assign(title.style, { fontSize: '16px', fontWeight: 'bold', color: '#aaf' });
        const closeBtn = document.createElement('button');
        closeBtn.textContent = '✕';
        Object.assign(closeBtn.style, {
            background: 'none', border: 'none', color: '#aaa',
            cursor: 'pointer', fontSize: '18px', lineHeight: '1',
        });
        closeBtn.addEventListener('click', () => this.hide());
        header.append(title, closeBtn);

        // Body — populated in _render()
        this._body = document.createElement('div');

        panel.append(header, this._body);
        overlay.append(panel);

        // Close on backdrop click
        overlay.addEventListener('click', (e) => { if (e.target === overlay) this.hide(); });

        // Close on Escape
        overlay.addEventListener('keydown', (e) => { if (e.key === 'Escape') this.hide(); });

        document.body.appendChild(overlay);
        this._overlay = overlay;
    }

    // ── Rendering ─────────────────────────────────────────────────────────────

    _render() {
        this._body.innerHTML = '';

        const party = this._party;
        if (!party || party.length === 0) {
            const empty = document.createElement('p');
            empty.textContent = 'No party members.';
            empty.style.color = '#888';
            this._body.appendChild(empty);
            return;
        }

        let hasContent = false;

        // ── Bard Section ──────────────────────────────────────────────────────
        const bards = party.filter(m => m.classId === 'bard' && m.health > 0);
        if (bards.length > 0) {
            hasContent = true;
            for (const bard of bards) {
                this._body.appendChild(this._buildBardSection(bard));
            }
        }

        // ── Cleric Section ────────────────────────────────────────────────────
        const clerics = party.filter(
            m => m.classId === 'cleric' && m.health > 0
              && m.level >= CLERIC_REVIVE_MIN_LEVEL,
        );
        const deadNonSummons = party.filter(m => m.health <= 0 && !m.isSummoned);
        if (clerics.length > 0 && deadNonSummons.length > 0) {
            hasContent = true;
            for (const cleric of clerics) {
                this._body.appendChild(this._buildClericSection(cleric, deadNonSummons));
            }
        }

        if (!hasContent) {
            const empty = document.createElement('p');
            empty.style.color = '#888';
            empty.style.fontStyle = 'italic';
            empty.textContent = 'No party spells available. (Need a bard or a cleric with fallen allies.)';
            this._body.appendChild(empty);
        }
    }

    // ── Bard section ──────────────────────────────────────────────────────────

    _buildBardSection(bard) {
        const section = document.createElement('div');
        section.style.marginBottom = '18px';

        // Section header
        const secTitle = document.createElement('div');
        Object.assign(secTitle.style, {
            fontSize: '14px', fontWeight: 'bold', color: '#ccf',
            marginBottom: '10px',
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        });
        const scale      = bardScale(bard.level);
        const maxSongs   = Math.max(1, Math.floor(bard.level / 5));
        const activeCnt  = (bard.activeSongs || []).length;

        secTitle.textContent = `🎶 Bard Songs — ${bard.name}`;

        // Slot indicator
        const slots = document.createElement('span');
        slots.style.color = activeCnt >= maxSongs ? '#f88' : '#8f8';
        slots.style.fontSize = '12px';
        slots.textContent = `Songs: ${activeCnt}/${maxSongs}`;
        secTitle.appendChild(slots);
        section.appendChild(secTitle);

        // Music toggle button
        const toggleRow = document.createElement('div');
        toggleRow.style.marginBottom = '8px';
        const toggleBtn = document.createElement('button');
        toggleBtn.textContent = this._musicEnabled ? '🔊 Music: ON' : '🔇 Music: OFF';
        Object.assign(toggleBtn.style, {
            background: '#2a2a4a', border: '1px solid #555', color: '#ccc',
            padding: '3px 10px', borderRadius: '4px', cursor: 'pointer', fontSize: '11px',
        });
        toggleBtn.addEventListener('click', () => {
            this._musicEnabled = !this._musicEnabled;
            if (this._musicEnabled) {
                // Re-play whichever song is (last) active
                const lastSong = (bard.activeSongs || []).at(-1);
                if (lastSong) soundManager.playBardSongLoop(lastSong);
            } else {
                soundManager.stopBardSongLoop();
            }
            toggleBtn.textContent = this._musicEnabled ? '🔊 Music: ON' : '🔇 Music: OFF';
        });
        toggleRow.appendChild(toggleBtn);
        section.appendChild(toggleRow);

        // Song buttons
        for (const songDef of SONGS) {
            section.appendChild(this._buildSongButton(bard, songDef, scale, maxSongs));
        }

        return section;
    }

    _buildSongButton(bard, songDef, scale, maxSongs) {
        const isActive   = (bard.activeSongs || []).includes(songDef.id);
        const activeCnt  = (bard.activeSongs || []).length;
        const canActivate = !isActive && activeCnt < maxSongs && bard.mana >= songDef.manaCost;

        const row = document.createElement('div');
        Object.assign(row.style, {
            display: 'flex', alignItems: 'center',
            gap: '8px', marginBottom: '6px',
        });

        const btn = document.createElement('button');
        const effectDesc = songDef.description(scale);
        btn.textContent = `${songDef.icon} ${songDef.name}`;
        Object.assign(btn.style, {
            flex: '1',
            padding: '6px 10px',
            borderRadius: '5px',
            cursor: isActive || canActivate ? 'pointer' : 'not-allowed',
            border: isActive ? '2px solid #7f7' : '1px solid #555',
            background: isActive ? '#1a3a1a' : '#2a2a4a',
            color: isActive ? '#9f9' : '#ccc',
            fontFamily: 'monospace',
            fontSize: '13px',
            textAlign: 'left',
        });

        const info = document.createElement('span');
        info.style.cssText = 'font-size:11px;color:#999;flex-shrink:0;';
        if (isActive) {
            info.textContent = `Active · ${effectDesc}`;
            info.style.color = '#9f9';
        } else {
            info.textContent = `${songDef.manaCost} MP · ${effectDesc}`;
        }

        btn.disabled = !isActive && !canActivate;

        btn.addEventListener('click', () => {
            if (isActive) {
                this._deactivateSong(bard, songDef.id);
            } else if (canActivate) {
                this._activateSong(bard, songDef, scale);
            }
        });

        row.append(btn, info);
        return row;
    }

    _activateSong(bard, songDef, scale) {
        if (!Array.isArray(bard.activeSongs)) bard.activeSongs = [];
        bard.activeSongs.push(songDef.id);
        bard.mana -= songDef.manaCost;

        // Apply the effect to all alive party members.
        const effect = songDef.makeEffect(scale);
        for (const m of this._party) {
            if (m.health <= 0) continue;
            stripSongEffect(m, songDef.id); // remove stale copy first
            m.activeEffects.push({ ...effect });
        }

        // Play loop sound for this song (overrides previous).
        if (this._musicEnabled) soundManager.playBardSongLoop(songDef.id);

        this._onChanged(this._party);
        this._render();
    }

    _deactivateSong(bard, songId) {
        bard.activeSongs = (bard.activeSongs || []).filter(s => s !== songId);

        // Remove this song's effect from all party members.
        for (const m of this._party) {
            stripSongEffect(m, songId);
        }

        // If any other songs are still active, play the last one; otherwise stop.
        const remaining = (bard.activeSongs || []);
        if (this._musicEnabled && remaining.length > 0) {
            soundManager.playBardSongLoop(remaining.at(-1));
        } else {
            soundManager.stopBardSongLoop();
        }

        this._onChanged(this._party);
        this._render();
    }

    // ── Cleric section ────────────────────────────────────────────────────────

    _buildClericSection(cleric, deadMembers) {
        const section = document.createElement('div');
        section.style.marginBottom = '18px';

        const secTitle = document.createElement('div');
        Object.assign(secTitle.style, {
            fontSize: '14px', fontWeight: 'bold',
            color: '#fcf', marginBottom: '10px',
        });
        secTitle.textContent = `✨ Cleric — ${cleric.name}`;
        section.appendChild(secTitle);

        const costLabel = document.createElement('div');
        costLabel.style.cssText = 'font-size:11px;color:#999;margin-bottom:8px;';
        costLabel.textContent = `Revive: costs ${CLERIC_REVIVE_MANA_COST} MP · restores ${Math.round(CLERIC_REVIVE_HEAL_FRAC * 100)}% HP`;
        section.appendChild(costLabel);

        const canRevive = cleric.mana >= CLERIC_REVIVE_MANA_COST;

        for (const target of deadMembers) {
            const reviveHP = Math.max(1, Math.ceil(target.maxHealth * CLERIC_REVIVE_HEAL_FRAC));
            const row = document.createElement('div');
            Object.assign(row.style, { display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' });

            const btn = document.createElement('button');
            btn.textContent = `⚕ Revive ${target.name}`;
            btn.disabled = !canRevive;
            Object.assign(btn.style, {
                flex: '1', padding: '6px 10px', borderRadius: '5px',
                cursor: canRevive ? 'pointer' : 'not-allowed',
                border: '1px solid #555', background: canRevive ? '#2a1a3a' : '#1a1a1a',
                color: canRevive ? '#f9f' : '#666',
                fontFamily: 'monospace', fontSize: '13px', textAlign: 'left',
            });

            const info = document.createElement('span');
            info.style.cssText = 'font-size:11px;color:#999;flex-shrink:0;';
            info.textContent = `→ ${reviveHP} HP`;

            btn.addEventListener('click', () => {
                if (!canRevive) return;
                this._doRevive(cleric, target);
            });

            row.append(btn, info);
            section.appendChild(row);
        }

        if (!canRevive) {
            const warn = document.createElement('div');
            warn.style.cssText = 'font-size:11px;color:#f88;margin-top:4px;';
            warn.textContent = `Not enough mana (needs ${CLERIC_REVIVE_MANA_COST}, has ${cleric.mana}).`;
            section.appendChild(warn);
        }

        return section;
    }

    _doRevive(cleric, target) {
        cleric.mana -= CLERIC_REVIVE_MANA_COST;
        const amt = Math.max(1, Math.ceil(target.maxHealth * CLERIC_REVIVE_HEAL_FRAC));
        target.health = amt;
        target.stunned = false;
        // Remove poison so the newly-revived ally doesn't immediately die.
        if (Array.isArray(target.activeEffects)) {
            target.activeEffects = target.activeEffects.filter(e => e && e.type !== 'poison');
        }

        soundManager.playRecruit(); // celebratory fanfare

        this._onChanged(this._party);
        this._render();
    }
}
