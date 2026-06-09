import { generatePortrait } from '../utils/PortraitGenerator.js';
import { generateEnemySprite } from '../utils/SpriteGenerator.js';
import { getItemDef } from '../items/ItemTypes.js';
import { GOLEM_PRESETS, getSummonPreset, UNDEAD_TIERS } from '../entities/Summons.js';
import {
    BARBARIAN_ENCOURAGE_DAMAGE_PER_ROUND,
    BARBARIAN_ENCOURAGE_MAX_DAMAGE_MULT,
    BARBARIAN_ENCOURAGE_MAX_ROUNDS,
    BARBARIAN_ENCOURAGE_UNLOCK_LEVEL,
    MONK_KI_UNLOCK_LEVEL,
    CLERIC_SPIRITUAL_WEAPON_UNLOCK_LEVEL,
    CLERIC_SPIRITUAL_WEAPON_UPKEEP,
    CLERIC_SPIRITUAL_WEAPON_ATK_DIVISOR,
    ROGUE_SHADOW_STEP_UNLOCK_LEVEL,
    ROGUE_SHADOW_STEP_BACKSTAB_MULT,
    RANGER_HUNTERS_MARK_UNLOCK_LEVEL,
    RANGER_HUNTERS_MARK_DAMAGE_BONUS,
    RANGER_HUNTERS_MARK_UPKEEP_MANA,
    RANGER_HUNTERS_MARK_UPKEEP_STAMINA,
    RANGER_BEASTLORD_UNLOCK_LEVEL,
    RANGER_BEASTLORD_MANA_PER_ROUND,
    RANGER_BEASTLORD_SUMMON_BASE,
    MAGE_ELEMENTAL_RIFT_UNLOCK_LEVEL,
    MAGE_ELEMENTAL_RIFT_MANA_PER_ROUND,
    MAGE_ELEMENTAL_RIFT_SUMMON_BASE,
    WARRIOR_FORMATION_MIN_MEMBERS,
    WARRIOR_SHIELD_WALL_UNLOCK_LEVEL,
    WARRIOR_SHIELD_WALL_LEVEL_DIVISOR,
    PHOTOMANCER_BLUR_MISS_CHANCE,
    PALADIN_STEED_MANA_PER_ROUND,
    PALADIN_COVENANT_MANA_PER_ROUND,
} from '../utils/constants.js';

/**
 * PartyHUD — renders the bottom-screen party bar with:
 *  - Gold display
 *  - Rest button (costs 1 food, heals 33% HP/ST/MP)
 *  - Recruit button
 *  - Inventory button
 *  - Party member cards with portraits, stat bars, and personal-inventory buttons
 */
export class PartyHUD {
    /**
     * @param {object} callbacks
     * @param {() => void}  callbacks.onRest
     * @param {() => void}  callbacks.onRecruit
     * @param {() => void}  callbacks.onInventory
     * @param {(id: string) => void} callbacks.onPersonalInventory
     */
    constructor(callbacks = {}) {
        this.container = document.getElementById('party-hud');
        this.cards = new Map();          // memberId -> DOM element
        this.portraitCache = new Map();   // seed -> dataURL

        this._callbacks = callbacks;
        this._topBar = null;
        this._goldEl = null;
        this._foodEl = null;
        this._partyCountEl = null;
        this._lightEl = null;   // Phase 10 light status indicator
        this._layoutBtn = null;
        this._layoutMode = this._readLayoutMode();
        this._applyLayoutMode(this._layoutMode, false);
    }

    /**
     * Phase 10: called each frame from the Game loop so the HUD can show
     * the currently-burning light source and remaining time. Pass label=''
     * to mean "no light".
     */
    setLightStatus(label, remainingSec) {
        if (!this._lightEl) return;
        if (!label) {
            this._lightEl.style.opacity = '0.6';
            this._lightEl.innerHTML = '<span style="color:#555">&#x1F319; Dark</span>';
            this._lightEl.title = 'You carry no light. Press T to kindle a torch, burn lantern oil, or cast Light.';
            return;
        }
        const sec = Math.ceil(remainingSec);
        const mins = Math.floor(sec / 60);
        const rem = sec % 60;
        const timeStr = `${mins}:${rem.toString().padStart(2, '0')}`;
        // Warn when light is about to expire
        const warn = sec < 30 ? ' style="color:#ff7744"' : '';
        this._lightEl.style.opacity = '1';
        this._lightEl.innerHTML = `<span${warn}>&#x1F525; ${label} — ${timeStr}</span>`;
        this._lightEl.title = `Active light: ${label}. Press T to change light source.`;
    }

    /**
     * Refresh the HUD to reflect the current party state.
     * @param {import('../entities/PartyMember.js').PartyMember[]} party
     * @param {import('../systems/Inventory.js').Inventory} [inventory]
     */
    update(party, inventory) {
        // Build top bar once
        if (!this._topBar) {
            this._buildTopBar();
        }

        // Update gold/food display
        if (inventory) {
            this._goldEl.textContent = `${inventory.gold}`;
            this._foodEl.textContent = `${inventory.getItemCount('food')}`;
        }

        // Update party member count (recruitable members only, not golems/summons)
        if (this._partyCountEl && Array.isArray(party)) {
            const count = party.filter(m => m && !m.isSummoned).length;
            this._partyCountEl.textContent = `${count}`;
        }

        // Show the Craft button only when a living artificer is in the party.
        if (this._craftBtn) {
            const hasArtificer = Array.isArray(party) && party.some(
                m => m && m.classId === 'artificer' && !m.isSummoned && m.health > 0,
            );
            this._craftBtn.style.display = hasArtificer ? '' : 'none';
        }
        if (this._familiarBtn) {
            const hasMage = Array.isArray(party) && party.some(
                m => m && m.classId === 'mage' && !m.isSummoned && (m.level || 0) >= 25,
            );
            this._familiarBtn.style.display = hasMage ? '' : 'none';
        }
        if (this._shadowSimBtn) {
            const hasPhotomancer = Array.isArray(party) && party.some(
                m => m && m.classId === 'photomancer' && !m.isSummoned && m.health > 0 && (m.level || 0) >= 30,
            );
            this._shadowSimBtn.style.display = hasPhotomancer ? '' : 'none';
        }

        // Remove cards for members no longer in the party
        for (const [id, card] of this.cards) {
            if (!party.find(m => m.id === id)) {
                card.remove();
                this.cards.delete(id);
            }
        }

        // Add / update cards
        for (const member of party) {
            let card = this.cards.get(member.id);
            if (!card) {
                card = this._createCard(member);
                this.cards.set(member.id, card);
            }
            this._updateBars(card, member, party);
        }

        // Re-append every card in current party order so the DOM reflects any
        // position swaps. appendChild moves an already-attached node cheaply.
        for (const member of party) {
            const card = this.cards.get(member.id);
            if (card) this.container.appendChild(card);
        }
    }

    show() { this.container.style.display = this._layoutMode === 'layout2' ? 'grid' : 'flex'; }
    hide() { this.container.style.display = 'none'; }

    /** Show a brief toast message above the HUD. */
    showToast(message) {
        let toast = document.getElementById('hud-toast');
        if (!toast) {
            toast = document.createElement('div');
            toast.id = 'hud-toast';
            document.body.appendChild(toast);
        }
        toast.textContent = message;
        toast.classList.remove('hud-toast-fade');
        // Force reflow
        void toast.offsetWidth;
        toast.classList.add('hud-toast-fade');
    }

    destroy() {
        this.container.innerHTML = '';
        this.cards.clear();
        this._topBar = null;
        this._goldEl = null;
        this._foodEl = null;
        this._partyCountEl = null;
        this._layoutBtn = null;
    }

    // ──────────────────────────────────────────
    // Top bar (gold, food, action buttons)
    // ──────────────────────────────────────────

    _buildTopBar() {
        this._topBar = document.createElement('div');
        this._topBar.className = 'hud-top-bar';

        // Party count
        const partyCountWrap = document.createElement('span');
        partyCountWrap.className = 'hud-resource';
        partyCountWrap.title = 'Party size (recruitable members; excludes golems and summoned creatures)';
        partyCountWrap.innerHTML = '<span class="hud-resource-icon">&#x1F465;</span> ';
        this._partyCountEl = document.createElement('span');
        this._partyCountEl.className = 'hud-resource-val';
        this._partyCountEl.textContent = '0';
        partyCountWrap.appendChild(this._partyCountEl);
        this._topBar.appendChild(partyCountWrap);

        // Gold
        const goldWrap = document.createElement('span');
        goldWrap.className = 'hud-resource';
        goldWrap.innerHTML = '<span class="hud-resource-icon">&#x1F4B0;</span> ';
        this._goldEl = document.createElement('span');
        this._goldEl.className = 'hud-resource-val';
        this._goldEl.textContent = '0';
        goldWrap.appendChild(this._goldEl);
        this._topBar.appendChild(goldWrap);

        // Food
        const foodWrap = document.createElement('span');
        foodWrap.className = 'hud-resource';
        foodWrap.innerHTML = '<span class="hud-resource-icon">&#x1F35E;</span> ';
        this._foodEl = document.createElement('span');
        this._foodEl.className = 'hud-resource-val';
        this._foodEl.textContent = '0';
        foodWrap.appendChild(this._foodEl);
        this._topBar.appendChild(foodWrap);

        // Rest button
        const restBtn = document.createElement('button');
        restBtn.className = 'hud-btn';
        restBtn.textContent = 'Rest (R)';
        restBtn.title = 'Rest the party (costs 1 food, restores 33% HP/ST/MP)';
        restBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            if (this._callbacks.onRest) this._callbacks.onRest();
        });
        this._topBar.appendChild(restBtn);

        // Inventory button
        const invBtn = document.createElement('button');
        invBtn.className = 'hud-btn';
        invBtn.textContent = 'Inventory (I)';
        invBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            if (this._callbacks.onInventory) this._callbacks.onInventory();
        });
        this._topBar.appendChild(invBtn);

        // Recruit button
        const recruitBtn = document.createElement('button');
        recruitBtn.className = 'hud-btn';
        recruitBtn.textContent = 'Recruit (C)';
        recruitBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            if (this._callbacks.onRecruit) this._callbacks.onRecruit();
        });
        this._topBar.appendChild(recruitBtn);

        // Craft button (only visible when an artificer is in the party)
        this._craftBtn = document.createElement('button');
        this._craftBtn.className = 'hud-btn';
        this._craftBtn.textContent = 'Craft (K)';
        this._craftBtn.title = 'Open the Crafting menu: enchant gear, augment trinkets, brew potions, scribe scrolls, forge / repair golems. Requires an Artificer in the party.';
        this._craftBtn.style.display = 'none';
        this._craftBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            if (this._callbacks.onOpenCrafting) this._callbacks.onOpenCrafting();
        });
        this._topBar.appendChild(this._craftBtn);

        this._familiarBtn = document.createElement('button');
        this._familiarBtn.className = 'hud-btn';
        this._familiarBtn.textContent = 'Familiar (F)';
        this._familiarBtn.title = 'Open the mage familiar menu: summon or upgrade level-25 mage familiars.';
        this._familiarBtn.style.display = 'none';
        this._familiarBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            if (this._callbacks.onOpenFamiliar) this._callbacks.onOpenFamiliar();
        });
        this._topBar.appendChild(this._familiarBtn);

        this._shadowSimBtn = document.createElement('button');
        this._shadowSimBtn.className = 'hud-btn';
        this._shadowSimBtn.textContent = 'Shadow (N)';
        this._shadowSimBtn.title = 'Open the Shadow Simulacra menu: form or template level-30 photomancer shadow allies.';
        this._shadowSimBtn.style.display = 'none';
        this._shadowSimBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            if (this._callbacks.onOpenShadowSimulacra) this._callbacks.onOpenShadowSimulacra();
        });
        this._topBar.appendChild(this._shadowSimBtn);

        // Light button + status (Phase 10)
        const lightBtn = document.createElement('button');
        lightBtn.className = 'hud-btn';
        lightBtn.textContent = 'Light (T)';
        lightBtn.title = 'Kindle a torch, burn lantern oil, or cast the mage Light spell';
        lightBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            if (this._callbacks.onOpenLightPicker) this._callbacks.onOpenLightPicker();
        });
        this._topBar.appendChild(lightBtn);

        this._lightEl = document.createElement('span');
        this._lightEl.className = 'hud-resource';
        this._lightEl.style.minWidth = '130px';
        this._lightEl.innerHTML = '<span style="color:#555">&#x1F319; Dark</span>';
        this._topBar.appendChild(this._lightEl);

        this._layoutBtn = document.createElement('button');
        this._layoutBtn.className = 'hud-btn hud-layout-btn';
        this._layoutBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            this._toggleLayoutMode();
        });
        this._topBar.appendChild(this._layoutBtn);
        this._refreshLayoutButton();

        // Insert top bar before any cards
        this.container.prepend(this._topBar);
    }

    _readLayoutMode() {
        try {
            return localStorage.getItem('dungeonLayoutMode') === 'layout2' ? 'layout2' : 'layout1';
        } catch (_) {
            return 'layout1';
        }
    }

    _toggleLayoutMode() {
        const next = this._layoutMode === 'layout2' ? 'layout1' : 'layout2';
        this._applyLayoutMode(next, true);
        this.showToast(`Screen layout: ${next.toUpperCase()}`);
    }

    _applyLayoutMode(mode, persist = true) {
        this._layoutMode = mode === 'layout2' ? 'layout2' : 'layout1';
        document.body.classList.toggle('layout2', this._layoutMode === 'layout2');
        document.body.classList.toggle('layout1', this._layoutMode !== 'layout2');
        if (this.container && this.container.style.display !== 'none') {
            this.container.style.display = this._layoutMode === 'layout2' ? 'grid' : 'flex';
        }
        if (persist) {
            try { localStorage.setItem('dungeonLayoutMode', this._layoutMode); } catch (_) {}
        }
        this._refreshLayoutButton();
        window.dispatchEvent(new CustomEvent('game-layout-change', { detail: { layout: this._layoutMode } }));
    }

    _refreshLayoutButton() {
        if (!this._layoutBtn) return;
        const next = this._layoutMode === 'layout2' ? 'Layout 1' : 'Layout 2';
        this._layoutBtn.textContent = this._layoutMode === 'layout2' ? 'Layout 2' : 'Layout 1';
        this._layoutBtn.title = [
            `Current screen layout: ${this._layoutMode.toUpperCase()}.`,
            this._layoutMode === 'layout1'
                ? 'Layout 1 keeps the original bottom party HUD, top monster HUD in combat, middle combat logs, and buttons below.'
                : 'Layout 2 places party cards on the left, combat monsters on the right, logs in the center, and actions below the logs.',
            `Click to switch to ${next}.`,
        ].join('\n');
    }

    // ──────────────────────────────────────────
    // Party cards
    // ──────────────────────────────────────────

    _createCard(member) {
        const card = document.createElement('div');
        card.className = 'party-card';
        card.dataset.memberId = member.id;

        const cls       = member.classDef;
        const sp        = member.speciesDef;
        const summon    = getSummonPreset(member);
        const isMithril = member.summonType === 'mithril';

        // ── Mithril Golem — distinctive metallic card styling ──────────────
        if (isMithril) {
            card.style.cssText += [
                'background:linear-gradient(160deg,#111820 0%,#1a2535 50%,#0f1820 100%)',
                'border:2px solid #7ab0d8',
                'box-shadow:0 0 14px rgba(100,180,255,0.30),inset 0 0 10px rgba(100,180,255,0.07)',
                'position:relative',
                'overflow:hidden',
                'animation:mithril-pulse 3s ease-in-out infinite',
            ].join(';');

            // Sweeping shine stripe
            const shine = document.createElement('div');
            shine.style.cssText = [
                'position:absolute', 'top:0', 'left:-60%', 'width:40%', 'height:100%',
                'background:linear-gradient(90deg,transparent,rgba(180,220,255,0.07),transparent)',
                'pointer-events:none', 'animation:mithril-shine 4s ease-in-out infinite',
            ].join(';');
            card.appendChild(shine);

            // Inject keyframes once into the document head
            if (!document.getElementById('mithril-card-styles')) {
                const style = document.createElement('style');
                style.id = 'mithril-card-styles';
                style.textContent = `
                    @keyframes mithril-shine {
                        0%   { left: -60%; }
                        40%  { left: 120%; }
                        100% { left: 120%; }
                    }
                    @keyframes mithril-pulse {
                        0%,100% { box-shadow:0 0 14px rgba(100,180,255,0.30),inset 0 0 10px rgba(100,180,255,0.07); }
                        50%     { box-shadow:0 0 24px rgba(100,180,255,0.55),inset 0 0 14px rgba(100,180,255,0.13); }
                    }`;
                document.head.appendChild(style);
            }
        }

        // Card-wide tooltip
        if (summon) {
            const abilityLines = (summon.abilities || []).map(a => `• ${a}`).join('\n');
            card.title =
                `${summon.icon} ${member.name}\n` +
                `${summon.speciesLabel || summon.name}\n` +
                (abilityLines ? `\nAbilities:\n${abilityLines}` : '');
        } else if (cls && sp) {
            card.title = `${member.name}\n${cls.icon} ${cls.name} — ${cls.description}\n${sp.icon} ${sp.name} — ${sp.description}`;
        }
        card.dataset.baseTitle = card.title || '';

        // Portrait
        const portraitWrap = document.createElement('div');
        portraitWrap.className = 'party-portrait-wrap';
        if (isMithril) portraitWrap.style.cssText = 'border-radius:4px;box-shadow:0 0 8px rgba(100,180,255,0.4);';

        const img = document.createElement('img');
        img.className = 'party-portrait';
        img.src = summon
            ? this._getSummonPortraitURL(summon)
            : this._getPortraitURL(member.portraitSeed, member.speciesId);
        if (isMithril) img.style.filter = 'hue-rotate(195deg) saturate(0.55) brightness(1.25)';
        portraitWrap.appendChild(img);

        // Badge
        const badgeIcon = summon ? summon.icon : (cls ? cls.icon : null);
        if (badgeIcon) {
            const badge = document.createElement('span');
            badge.className = 'party-class-badge';
            badge.textContent = badgeIcon;
            if (isMithril) {
                badge.style.cssText = 'background:linear-gradient(135deg,#2a5c88,#0f2a44);border:1px solid #7ab0d8;color:#c8e8ff;text-shadow:0 0 6px rgba(100,180,255,0.8);';
            }
            if (summon) {
                const abilityLines = (summon.abilities || []).map(a => `• ${a}`).join('\n');
                badge.title =
                    `${summon.speciesLabel || summon.name}` +
                    (abilityLines ? `\n\nAbilities:\n${abilityLines}` : '');
            } else if (cls) {
                badge.title = `${cls.name}\n${cls.description}`;
            }
            portraitWrap.appendChild(badge);
        }

        card.appendChild(portraitWrap);

        // Name
        const name = document.createElement('div');
        name.className = 'party-name';
        name.textContent = member.name;
        if (isMithril) {
            name.style.cssText = 'color:#c8e8ff;font-weight:bold;text-shadow:0 0 8px rgba(100,180,255,0.6);letter-spacing:1px;';
        }
        card.appendChild(name);

        // Mithril tier label (removed — icon change is sufficient)

        // Class / species row — summons show their creature-type label
        if (summon) {
            const csRow = document.createElement('div');
            csRow.className = 'party-cs-row';
            csRow.textContent = `${summon.icon} ${summon.speciesLabel || summon.name}`;
            if (isMithril) csRow.style.color = '#8bbdd8';
            const abilityLines = (summon.abilities || []).map(a => `• ${a}`).join('\n');
            csRow.title = abilityLines
                ? `${summon.speciesLabel || summon.name}\n\nAbilities:\n${abilityLines}`
                : (summon.speciesLabel || summon.name);
            card.appendChild(csRow);

            // Numeric combat stats row for summons (melee range + defense)
            const statsRow = document.createElement('div');
            statsRow.className = 'party-cs-row';
            statsRow.style.fontSize = '10px';
            statsRow.style.color = isMithril ? 'rgba(150,210,255,0.90)' : 'rgba(200,200,180,0.85)';
            statsRow.style.letterSpacing = '0px';
            // These will be filled in by _updateBars (which has access to member)
            statsRow.dataset.summonStats = 'yes';
            card.appendChild(statsRow);
        } else if (cls && sp) {
            const csRow = document.createElement('div');
            csRow.className = 'party-cs-row';
            csRow.textContent = `${cls.icon}${sp.icon}`;
            csRow.title = `${cls.name} · ${sp.name}`;
            card.appendChild(csRow);
        }

        // Stat bars. Summons don't show an XP bar (they don't level).
        const bars = [
            { cls: 'bar-health',  stat: 'health' },
            { cls: 'bar-stamina', stat: 'stamina' },
            { cls: 'bar-mana',    stat: 'mana' },
        ];
        if (!summon) bars.push({ cls: 'bar-xp', stat: 'xp' });
        for (const { cls, stat } of bars) {
            const bar = document.createElement('div');
            bar.className = `stat-bar ${cls}`;
            const fill = document.createElement('div');
            fill.className = 'stat-bar-fill';
            fill.dataset.stat = stat;
            bar.appendChild(fill);
            card.appendChild(bar);
        }

        // Equipment icons row
        const eqRow = document.createElement('div');
        eqRow.className = 'party-equip-row';
        card.appendChild(eqRow);

        // Personal inventory button
        // Status effects row (filled each update by _updateBars)
        const partyStatusRow = document.createElement('div');
        partyStatusRow.className = 'party-status-row';
        partyStatusRow.style.cssText = 'display:flex;flex-wrap:wrap;gap:2px;justify-content:center;padding:1px 0;min-height:0;';
        card.appendChild(partyStatusRow);

        const bagBtn = document.createElement('button');
        bagBtn.className = 'party-bag-btn';
        bagBtn.textContent = '\u{1F392}';
        bagBtn.title = `${member.name}'s inventory (B)`;
        bagBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            if (this._callbacks.onPersonalInventory) this._callbacks.onPersonalInventory(member.id);
        });
        card.appendChild(bagBtn);

        return card;
    }

    _isUndeadOrGolemMember(member) {
        if (!member || !member.isSummoned) return false;
        if (member.summonStats?.nonLiving) return true;
        if (member.summonStats && member.summonStats.tierId && GOLEM_PRESETS[member.summonType]) return true;
        return UNDEAD_TIERS.some(ut => ut.id === member.summonType) || member.summonType === 'demi_lich';
    }

    _getBarbarianEncourageState(member, party) {
        if (!member || member.health <= 0) return null;
        if (this._isUndeadOrGolemMember(member)) return null;

        let best = null;
        for (const barb of party || []) {
            if (!barb || barb === member || barb.health <= 0) continue;
            if (barb.classId !== 'barbarian' || (barb.level || 1) < BARBARIAN_ENCOURAGE_UNLOCK_LEVEL || !barb.isRaging) continue;

            const rounds = Math.min(BARBARIAN_ENCOURAGE_MAX_ROUNDS, barb.rageEncourageRounds || 0);
            const bonusMult = Math.min(BARBARIAN_ENCOURAGE_MAX_DAMAGE_MULT, rounds * BARBARIAN_ENCOURAGE_DAMAGE_PER_ROUND);
            if (!best || bonusMult > best.bonusMult) {
                best = { sourceName: barb.name, rounds, bonusMult };
            }
        }

        if (!best || best.bonusMult <= 0) return null;
        return {
            sourceName: best.sourceName,
            rounds: best.rounds,
            bonusMult: best.bonusMult,
            bonusPct: Math.round(best.bonusMult * 100),
        };
    }

    _getFormationShieldWallState(member, party) {
        if (!member || !member.isInFormation || member.health <= 0 || member.classId !== 'warrior') return null;
        const formation = (party || []).filter(m =>
            m && m.health > 0 && m.isInFormation && m.row === 'front' && m.classId === 'warrior',
        );
        if (formation.length < WARRIOR_FORMATION_MIN_MEMBERS || !formation.includes(member)) return null;
        const eligibleWarriorIds = new Set(formation
            .filter(m => !m.isSummoned && (m.level || 1) >= WARRIOR_SHIELD_WALL_UNLOCK_LEVEL)
            .map(m => m.id));
        const contributors = formation.filter(m => {
            if (!m.isSummoned) return eligibleWarriorIds.has(m.id);
            return m.summonType === 'squire' && eligibleWarriorIds.has(m.summonerId);
        });
        if (contributors.length === 0) return null;
        const avg = contributors.reduce((sum, m) => sum + (m.level || 1), 0) / contributors.length;
        const step = Math.max(0, Math.floor(avg / WARRIOR_SHIELD_WALL_LEVEL_DIVISOR));
        const total = step * contributors.length;
        if (total <= 0) return null;
        return { total, step, count: contributors.length, avg: Math.round(avg) };
    }

    _updateBars(card, member, party) {
        const fills = card.querySelectorAll('.stat-bar-fill');
        fills[0].style.width = `${Math.max(0, (member.health / member.maxHealth) * 100)}%`;
        fills[1].style.width = `${Math.max(0, (member.stamina / Math.max(1, member.maxStamina)) * 100)}%`;
        fills[2].style.width = `${Math.max(0, (member.mana / Math.max(1, member.maxMana)) * 100)}%`;

        // Mithril Golem — chrome HP bar instead of default red
        if (member.summonType === 'mithril' && fills[0]) {
            fills[0].style.background = 'linear-gradient(90deg,#2a5c88,#5aacdc,#9dd4f4)';
        }

        // Phase 12 — XP bar (purple) for non-summon party members. Summons
        // don't have an XP bar so fills[3] may be undefined.
        if (fills[3] && typeof member.xpProgressThisLevel === 'function') {
            const progress = member.xpProgressThisLevel();
            const span = Math.max(1, member.xpSpanThisLevel());
            fills[3].style.width = `${Math.max(0, Math.min(100, (progress / span) * 100))}%`;
            const bar = fills[3].parentElement;
            if (bar) bar.title = `XP: ${progress} / ${span} (Lv ${member.level})`;
        }

        // Phase 10 — poisoned-face indicator on the portrait.
        const portraitWrap = card.querySelector('.party-portrait-wrap');
        if (portraitWrap) {
            let poisonBadge = portraitWrap.querySelector('.party-poison-badge');
            // Golems (and other summons immune to poison) never show the poison badge.
            const isPoisoned = !member.isSummoned
                && Array.isArray(member.activeEffects)
                && member.activeEffects.some(e => e && e.type === 'poison');
            if (isPoisoned) {
                if (!poisonBadge) {
                    poisonBadge = document.createElement('span');
                    poisonBadge.className = 'party-poison-badge';
                    // Inline-styled so no CSS file edit is required.
                    poisonBadge.style.position = 'absolute';
                    poisonBadge.style.top = '-4px';
                    poisonBadge.style.left = '-4px';
                    poisonBadge.style.width = '22px';
                    poisonBadge.style.height = '22px';
                    poisonBadge.style.display = 'flex';
                    poisonBadge.style.alignItems = 'center';
                    poisonBadge.style.justifyContent = 'center';
                    poisonBadge.style.fontSize = '16px';
                    poisonBadge.style.background = 'radial-gradient(circle,#6cff6c 20%,#1f6b1f 100%)';
                    poisonBadge.style.border = '2px solid #0a3d0a';
                    poisonBadge.style.borderRadius = '50%';
                    poisonBadge.style.boxShadow = '0 0 6px rgba(60,200,60,0.8)';
                    poisonBadge.style.pointerEvents = 'auto';
                    portraitWrap.style.position = portraitWrap.style.position || 'relative';
                    portraitWrap.appendChild(poisonBadge);
                }
                poisonBadge.textContent = '\u{1F922}'; // 🤢 nauseated face
                const p = member.activeEffects.find(e => e.type === 'poison');
                poisonBadge.title = p
                    ? `Poisoned: ${p.damage || 1} dmg/round, ${p.rounds || 0} rounds left`
                    : 'Poisoned';
            } else if (poisonBadge) {
                poisonBadge.remove();
            }

            let acidBadge = portraitWrap.querySelector('.party-acid-dot-badge');
            const acidEffect = Array.isArray(member.activeEffects)
                ? member.activeEffects.find(e => e && e.type === 'acid_dot' && (e.rounds || 0) > 0)
                : null;
            if (acidEffect) {
                if (!acidBadge) {
                    acidBadge = document.createElement('span');
                    acidBadge.className = 'party-acid-dot-badge';
                    acidBadge.style.position = 'absolute';
                    acidBadge.style.top = '-4px';
                    acidBadge.style.left = '20px';
                    acidBadge.style.width = '22px';
                    acidBadge.style.height = '22px';
                    acidBadge.style.display = 'flex';
                    acidBadge.style.alignItems = 'center';
                    acidBadge.style.justifyContent = 'center';
                    acidBadge.style.fontSize = '15px';
                    acidBadge.style.background = 'radial-gradient(circle,#a6ff45 20%,#317500 100%)';
                    acidBadge.style.border = '2px solid #123d00';
                    acidBadge.style.borderRadius = '50%';
                    acidBadge.style.boxShadow = '0 0 6px rgba(150,255,60,0.8)';
                    acidBadge.style.pointerEvents = 'auto';
                    portraitWrap.style.position = portraitWrap.style.position || 'relative';
                    portraitWrap.appendChild(acidBadge);
                }
                acidBadge.textContent = '\u{1F9EA}';
                const defText = typeof acidEffect.defenseBonus === 'number'
                    ? `, ${acidEffect.defenseBonus} defense`
                    : '';
                acidBadge.title = `Acid DoT: ${acidEffect.damage || 1} dmg/round${defText}, ${acidEffect.rounds || 0} rounds left`;
            } else if (acidBadge) {
                acidBadge.remove();
            }
        }

        // Hunger badge — shown when hungerState is 'hungry', 'starving', or 'dying'.
        if (portraitWrap) {
            let hungerBadge = portraitWrap.querySelector('.party-hunger-badge');
            const hs = member.hungerState;
            if (hs === 'hungry' || hs === 'starving' || hs === 'dying') {
                if (!hungerBadge) {
                    hungerBadge = document.createElement('span');
                    hungerBadge.className = 'party-hunger-badge';
                    hungerBadge.style.position = 'absolute';
                    hungerBadge.style.bottom = '-4px';
                    hungerBadge.style.right = '-4px';
                    hungerBadge.style.width = '22px';
                    hungerBadge.style.height = '22px';
                    hungerBadge.style.display = 'flex';
                    hungerBadge.style.alignItems = 'center';
                    hungerBadge.style.justifyContent = 'center';
                    hungerBadge.style.fontSize = '14px';
                    hungerBadge.style.borderRadius = '50%';
                    hungerBadge.style.border = '2px solid #000';
                    hungerBadge.style.pointerEvents = 'auto';
                    portraitWrap.style.position = portraitWrap.style.position || 'relative';
                    portraitWrap.appendChild(hungerBadge);
                }
                if (hs === 'hungry') {
                    hungerBadge.textContent = '\u{1F37D}\uFE0F'; // 🍽️
                    hungerBadge.style.background = 'radial-gradient(circle,#ffe066 20%,#b07000 100%)';
                    hungerBadge.style.boxShadow = '0 0 5px rgba(255,200,0,0.8)';
                    hungerBadge.title = 'Hungry: \u22121 to all damage and defense';
                } else if (hs === 'starving') {
                    hungerBadge.textContent = '\u{1F630}'; // 😰
                    hungerBadge.style.background = 'radial-gradient(circle,#ff9900 20%,#7a3b00 100%)';
                    hungerBadge.style.boxShadow = '0 0 5px rgba(255,130,0,0.8)';
                    hungerBadge.title = 'Starving: \u22122 to all damage/defense, no regeneration';
                } else {
                    hungerBadge.textContent = '\u{1F480}'; // 💀
                    hungerBadge.style.background = 'radial-gradient(circle,#ff4444 20%,#660000 100%)';
                    hungerBadge.style.boxShadow = '0 0 6px rgba(255,0,0,0.9)';
                    hungerBadge.title = 'Dying of hunger: \u22123 penalty, losing 2 HP/min';
                }
            } else if (hungerBadge) {
                hungerBadge.remove();
            }
        }

        // Mass Regen badge — shown when the member has an active combat_regen effect.
        if (portraitWrap) {
            let regenBadge = portraitWrap.querySelector('.party-regen-badge');
            const regenFx = Array.isArray(member.activeEffects)
                && member.activeEffects.find(e => e && e.type === 'combat_regen' && e.rounds > 0);
            if (regenFx) {
                if (!regenBadge) {
                    regenBadge = document.createElement('span');
                    regenBadge.className = 'party-regen-badge';
                    regenBadge.style.position = 'absolute';
                    regenBadge.style.top = '-4px';
                    regenBadge.style.right = '-4px';
                    regenBadge.style.width = '22px';
                    regenBadge.style.height = '22px';
                    regenBadge.style.display = 'flex';
                    regenBadge.style.alignItems = 'center';
                    regenBadge.style.justifyContent = 'center';
                    regenBadge.style.fontSize = '14px';
                    regenBadge.style.background = 'radial-gradient(circle,#66ffaa 20%,#007040 100%)';
                    regenBadge.style.border = '2px solid #004020';
                    regenBadge.style.borderRadius = '50%';
                    regenBadge.style.boxShadow = '0 0 6px rgba(60,255,140,0.8)';
                    regenBadge.style.pointerEvents = 'auto';
                    portraitWrap.style.position = portraitWrap.style.position || 'relative';
                    portraitWrap.appendChild(regenBadge);
                }
                regenBadge.textContent = '♥'; // ♥
                regenBadge.title = `Mass Regen: +${Math.round((regenFx.healPct||0)*100)}% max HP/round — ${regenFx.rounds} rds left`;
            } else if (regenBadge) {
                regenBadge.remove();
            }
        }

        // Mirror Image badge — shown when the mage has active mirror images.
        if (portraitWrap) {
            let miBadge = portraitWrap.querySelector('.party-mirror-badge');
            const miCount = member.mirrorImages || 0;
            if (miCount > 0) {
                if (!miBadge) {
                    miBadge = document.createElement('span');
                    miBadge.className = 'party-mirror-badge';
                    miBadge.style.position = 'absolute';
                    miBadge.style.top = '10px';
                    miBadge.style.right = '-4px';
                    miBadge.style.background = 'rgba(60,80,200,0.92)';
                    miBadge.style.border = '1px solid #88aaff';
                    miBadge.style.borderRadius = '6px';
                    miBadge.style.color = '#cce';
                    miBadge.style.fontSize = '10px';
                    miBadge.style.padding = '1px 3px';
                    miBadge.style.pointerEvents = 'none';
                    portraitWrap.appendChild(miBadge);
                }
                miBadge.textContent = '\u{1FA9E}' + miCount;
                miBadge.title = `Mirror Image: ${miCount} image(s) active — each absorbs one hit.`;
            } else if (miBadge) {
                miBadge.remove();
            }
        }

        // Lich Form / Phial badge — shown when the necromancer has Lich Form active or is in phial.
        if (portraitWrap) {
            let lichBadge = portraitWrap.querySelector('.party-lich-badge');
            const isLich  = !!member.isLichForm;
            const isPhial = !!member.lichPhial;
            if (isLich || isPhial) {
                if (!lichBadge) {
                    lichBadge = document.createElement('span');
                    lichBadge.className = 'party-lich-badge';
                    lichBadge.style.position = 'absolute';
                    lichBadge.style.top = '10px';
                    lichBadge.style.left = '-4px';
                    lichBadge.style.borderRadius = '6px';
                    lichBadge.style.fontSize = '10px';
                    lichBadge.style.padding = '1px 3px';
                    lichBadge.style.pointerEvents = 'none';
                    portraitWrap.appendChild(lichBadge);
                }
                if (isPhial) {
                    lichBadge.style.background = 'rgba(0,160,100,0.92)';
                    lichBadge.style.border = '1px solid #44ffaa';
                    lichBadge.style.color = '#afffdd';
                    lichBadge.textContent = '\u{1F9F4}' + (member.lichReviveRoundsLeft || 3);
                    lichBadge.title = `Phylactery: soul contained — reviving in ${member.lichReviveRoundsLeft || 3} round(s).`;
                } else {
                    lichBadge.style.background = 'rgba(100,20,160,0.92)';
                    lichBadge.style.border = '1px solid #aa44ff';
                    lichBadge.style.color = '#ddaaff';
                    lichBadge.textContent = '\u{1F9B4}LICH';
                    lichBadge.title = 'Lich Form active: poison, stun, paralysis & mummy rot immune; partial magic resist; Phylactery on death.';
                }
            } else if (lichBadge) {
                lichBadge.remove();
            }
        }

        // Fae Token badge — shown for druids who have accumulated fae tokens.
        if (portraitWrap) {
            let faeBadge = portraitWrap.querySelector('.party-fae-badge');
            const faeTokens = member.faeTokens || 0;
            const faeTokensNeeded = member.level >= 40 ? 1 : (member.level >= 30 ? 2 : 3);
            if (faeTokens > 0) {
                if (!faeBadge) {
                    faeBadge = document.createElement('span');
                    faeBadge.className = 'party-fae-badge';
                    faeBadge.style.position = 'absolute';
                    faeBadge.style.bottom = '10px';
                    faeBadge.style.right = '-4px';
                    faeBadge.style.background = 'rgba(160,110,0,0.92)';
                    faeBadge.style.border = '1px solid #ffdd44';
                    faeBadge.style.borderRadius = '6px';
                    faeBadge.style.color = '#ffe88a';
                    faeBadge.style.fontSize = '10px';
                    faeBadge.style.padding = '1px 3px';
                    faeBadge.style.pointerEvents = 'none';
                    portraitWrap.appendChild(faeBadge);
                }
                faeBadge.textContent = '✨' + faeTokens;
                faeBadge.title = `Fae Tokens: ${faeTokens}/${faeTokensNeeded} — Commune again to summon the Faerie Queen!`;
            } else if (faeBadge) {
                faeBadge.remove();
            }
        }

        // Temp HP badge — shown for barbarians with active Blood Rage temp HP.
        if (portraitWrap) {
            let tmpBadge = portraitWrap.querySelector('.party-temphp-badge');
            const tempHp = member.tempHp || 0;
            if (tempHp > 0) {
                if (!tmpBadge) {
                    tmpBadge = document.createElement('span');
                    tmpBadge.className = 'party-temphp-badge';
                    tmpBadge.style.position = 'absolute';
                    tmpBadge.style.bottom = '10px';
                    tmpBadge.style.left = '-4px';
                    tmpBadge.style.background = 'rgba(160,30,30,0.92)';
                    tmpBadge.style.border = '1px solid #ff6644';
                    tmpBadge.style.borderRadius = '6px';
                    tmpBadge.style.color = '#ffbbaa';
                    tmpBadge.style.fontSize = '10px';
                    tmpBadge.style.padding = '1px 3px';
                    tmpBadge.style.pointerEvents = 'none';
                    portraitWrap.appendChild(tmpBadge);
                }
                tmpBadge.textContent = '\u{1F4AA}' + tempHp;
                tmpBadge.title = `Blood Rage: ${tempHp} temp HP — absorbs damage before health. Cleared when stamina exhausted.`;
            } else if (tmpBadge) {
                tmpBadge.remove();
            }
        }

        // Ki Charges badge — shown for L30+ monks with active ki charges.
        if (portraitWrap && member.classId === 'monk' && (member.level || 0) >= MONK_KI_UNLOCK_LEVEL) {
            let kiBadge = portraitWrap.querySelector('.party-ki-badge');
            const kiCount = member.kiCharges || 0;
            if (kiCount > 0) {
                if (!kiBadge) {
                    kiBadge = document.createElement('span');
                    kiBadge.className = 'party-ki-badge';
                    kiBadge.style.position = 'absolute';
                    kiBadge.style.bottom = '24px';
                    kiBadge.style.left = '-4px';
                    kiBadge.style.background = 'rgba(20,100,180,0.92)';
                    kiBadge.style.border = '1px solid #44aaff';
                    kiBadge.style.borderRadius = '6px';
                    kiBadge.style.color = '#aaddff';
                    kiBadge.style.fontSize = '10px';
                    kiBadge.style.padding = '1px 3px';
                    kiBadge.style.pointerEvents = 'none';
                    portraitWrap.style.position = portraitWrap.style.position || 'relative';
                    portraitWrap.appendChild(kiBadge);
                }
                kiBadge.textContent = '\u{1F9D8}' + kiCount;
                kiBadge.title = `Ki Charges: ${kiCount} — use Ki Surge in combat to expend all charges and strike every enemy.`;
            } else if (kiBadge) {
                kiBadge.remove();
            }
        }

        // Spiritual Weapon badge — shown for L30+ clerics with active weapons.
        if (portraitWrap && member.classId === 'cleric' && (member.level || 0) >= CLERIC_SPIRITUAL_WEAPON_UNLOCK_LEVEL) {
            let swBadge = portraitWrap.querySelector('.party-sw-badge');
            const swCount = (member.spiritualWeapons || []).length;
            if (swCount > 0) {
                if (!swBadge) {
                    swBadge = document.createElement('span');
                    swBadge.className = 'party-sw-badge';
                    swBadge.style.position = 'absolute';
                    swBadge.style.bottom = '24px';
                    swBadge.style.right = '-4px';
                    swBadge.style.background = 'rgba(180,140,20,0.92)';
                    swBadge.style.border = '1px solid #ffe066';
                    swBadge.style.borderRadius = '6px';
                    swBadge.style.color = '#fff8cc';
                    swBadge.style.fontSize = '10px';
                    swBadge.style.padding = '1px 3px';
                    swBadge.style.pointerEvents = 'none';
                    portraitWrap.style.position = portraitWrap.style.position || 'relative';
                    portraitWrap.appendChild(swBadge);
                }
                const swAtks = Math.max(1, Math.floor((member.level || 1) / CLERIC_SPIRITUAL_WEAPON_ATK_DIVISOR));
                const upkeep = swCount * CLERIC_SPIRITUAL_WEAPON_UPKEEP;
                swBadge.textContent = '⚔️' + swCount;
                swBadge.title = `Spiritual Weapons: ${swCount} active (${swAtks} atk${swAtks !== 1 ? 's' : ''}/round each, ${upkeep} MP/round upkeep total). Force attacks hit random enemies each round.`;
            } else if (swBadge) {
                swBadge.remove();
            }
        }

        // Shadow Step badge — shown for L30+ rogues while the effect is active.
        if (portraitWrap && member.classId === 'rogue' && (member.level || 0) >= ROGUE_SHADOW_STEP_UNLOCK_LEVEL) {
            let ssBadge = portraitWrap.querySelector('.party-shadow-step-badge');
            const ssFx = Array.isArray(member.activeEffects)
                ? member.activeEffects.find(fx => fx.type === 'shadow_step' && (fx.rounds || 0) > 0)
                : null;
            if (ssFx) {
                if (!ssBadge) {
                    ssBadge = document.createElement('span');
                    ssBadge.className = 'party-shadow-step-badge';
                    ssBadge.style.position = 'absolute';
                    ssBadge.style.bottom = '24px';
                    ssBadge.style.right = '-4px';
                    ssBadge.style.background = 'rgba(20,10,40,0.95)';
                    ssBadge.style.border = '1px solid #8855cc';
                    ssBadge.style.borderRadius = '6px';
                    ssBadge.style.color = '#cc99ff';
                    ssBadge.style.fontSize = '10px';
                    ssBadge.style.padding = '1px 3px';
                    ssBadge.style.pointerEvents = 'none';
                    portraitWrap.style.position = portraitWrap.style.position || 'relative';
                    portraitWrap.appendChild(ssBadge);
                }
                ssBadge.textContent = '\u{1F311}' + ssFx.rounds;
                ssBadge.title = `Shadow Step: ${ssFx.rounds} round(s) remaining — untargetable, ×${ROGUE_SHADOW_STEP_BACKSTAB_MULT} backstab damage.`;
            } else if (ssBadge) {
                ssBadge.remove();
            }
        }

        // Hunter's Mark badge — shown for L30+ rangers with an active mark.
        if (portraitWrap && member.classId === 'ranger' && (member.level || 0) >= RANGER_HUNTERS_MARK_UNLOCK_LEVEL) {
            let hmBadge = portraitWrap.querySelector('.party-hunters-mark-badge');
            const hmActive = !!(member.hunterMarkEnemyId);
            if (hmActive) {
                if (!hmBadge) {
                    hmBadge = document.createElement('span');
                    hmBadge.className = 'party-hunters-mark-badge';
                    hmBadge.style.position = 'absolute';
                    hmBadge.style.bottom = '24px';
                    hmBadge.style.left = '-4px';
                    hmBadge.style.background = 'rgba(60,30,10,0.95)';
                    hmBadge.style.border = '1px solid #cc6600';
                    hmBadge.style.borderRadius = '6px';
                    hmBadge.style.color = '#ffaa44';
                    hmBadge.style.fontSize = '10px';
                    hmBadge.style.padding = '1px 3px';
                    hmBadge.style.pointerEvents = 'none';
                    portraitWrap.style.position = portraitWrap.style.position || 'relative';
                    portraitWrap.appendChild(hmBadge);
                }
                hmBadge.textContent = '🎯';
                hmBadge.title = `Hunter's Mark active (+${Math.round(RANGER_HUNTERS_MARK_DAMAGE_BONUS * 100)}% dmg to target | upkeep ${RANGER_HUNTERS_MARK_UPKEEP_MANA} MP + ${RANGER_HUNTERS_MARK_UPKEEP_STAMINA} ST/rd).`;
            } else if (hmBadge) {
                hmBadge.remove();
            }
        }

        // Beastlord badge — shown for L30+ rangers with Beastlord active.
        if (portraitWrap && member.classId === 'ranger' && (member.level || 0) >= RANGER_BEASTLORD_UNLOCK_LEVEL) {
            let blBadge = portraitWrap.querySelector('.party-beastlord-badge');
            if (member.beastlordActive) {
                if (!blBadge) {
                    blBadge = document.createElement('span');
                    blBadge.className = 'party-beastlord-badge';
                    blBadge.style.position = 'absolute';
                    blBadge.style.bottom = '8px';
                    blBadge.style.left = '-4px';
                    blBadge.style.background = 'rgba(10,40,10,0.95)';
                    blBadge.style.border = '1px solid #44aa44';
                    blBadge.style.borderRadius = '6px';
                    blBadge.style.color = '#88ff88';
                    blBadge.style.fontSize = '10px';
                    blBadge.style.padding = '1px 3px';
                    blBadge.style.pointerEvents = 'none';
                    portraitWrap.style.position = portraitWrap.style.position || 'relative';
                    portraitWrap.appendChild(blBadge);
                }
                const blPct = Math.floor((member.level || 1) / 2) + RANGER_BEASTLORD_SUMMON_BASE;
                blBadge.textContent = '🦎';
                blBadge.title = `Beastlord active (${blPct}% auto-summon/rd | ${RANGER_BEASTLORD_MANA_PER_ROUND} MP/rd base).`;
            } else if (blBadge) {
                blBadge.remove();
            }
        }

        // Elemental Rift badge — shown for L30+ mages while rift is open
        if (portraitWrap && member.classId === 'mage' && (member.level || 0) >= MAGE_ELEMENTAL_RIFT_UNLOCK_LEVEL) {
            let riftBadge = portraitWrap.querySelector('.party-rift-badge');
            if (member.elementalRiftOpen) {
                if (!riftBadge) {
                    riftBadge = document.createElement('span');
                    riftBadge.className = 'party-rift-badge';
                    riftBadge.style.position = 'absolute';
                    riftBadge.style.bottom = '8px';
                    riftBadge.style.left = '-4px';
                    riftBadge.style.background = 'rgba(10,20,50,0.95)';
                    riftBadge.style.border = '1px solid #44aaff';
                    riftBadge.style.borderRadius = '6px';
                    riftBadge.style.color = '#88ccff';
                    riftBadge.style.fontSize = '10px';
                    riftBadge.style.padding = '1px 3px';
                    riftBadge.style.pointerEvents = 'none';
                    portraitWrap.style.position = portraitWrap.style.position || 'relative';
                    portraitWrap.appendChild(riftBadge);
                }
                const riftPct = Math.min(100, (member.level || 1) + MAGE_ELEMENTAL_RIFT_SUMMON_BASE);
                riftBadge.textContent = '\u{1F300}';
                riftBadge.title = `Elemental Rift open (${riftPct}% summon/rd | ${MAGE_ELEMENTAL_RIFT_MANA_PER_ROUND} MP/rd).`;
            } else if (riftBadge) {
                riftBadge.remove();
            }
        }

        // Corpse Horror badge — shown when this summon is a Corpse Horror (Dark Apotheosis)
        if (portraitWrap && member.isSummoned && member.summonType === 'corpse_horror') {
            let horrorBadge = portraitWrap.querySelector('.party-corpse-horror-badge');
            if (!horrorBadge) {
                horrorBadge = document.createElement('span');
                horrorBadge.className = 'party-corpse-horror-badge';
                horrorBadge.style.position = 'absolute';
                horrorBadge.style.bottom = '8px';
                horrorBadge.style.right = '-4px';
                horrorBadge.style.background = 'rgba(60,0,80,0.92)';
                horrorBadge.style.border = '1px solid #aa44cc';
                horrorBadge.style.borderRadius = '6px';
                horrorBadge.style.color = '#ddaaff';
                horrorBadge.style.fontSize = '10px';
                horrorBadge.style.padding = '1px 3px';
                horrorBadge.style.pointerEvents = 'none';
                portraitWrap.style.position = portraitWrap.style.position || 'relative';
                portraitWrap.appendChild(horrorBadge);
            }
            const atkCount = (member.summonStats && member.summonStats.attackCount) || 2;
            horrorBadge.textContent = '🧟' + atkCount;
            const attackCap = member.summonStats && member.summonStats.attackCap;
            horrorBadge.title = `Corpse Horror: stitched from fallen foes. ${atkCount}${attackCap ? `/${attackCap}` : ''} melee attacks/round. HP, defense, and melee skill keep growing with each new kill.`;
        } else if (portraitWrap) {
            const existing = portraitWrap.querySelector('.party-corpse-horror-badge');
            if (existing) existing.remove();
        }

        // Golem Berserk badge — shown when this golem has Berserk Mode active
        if (portraitWrap && member.isSummoned && GOLEM_PRESETS[member.summonType] && member.golemBerserkActive) {
            let berserkBadge = portraitWrap.querySelector('.party-golem-berserk-badge');
            if (!berserkBadge) {
                berserkBadge = document.createElement('span');
                berserkBadge.className = 'party-golem-berserk-badge';
                berserkBadge.style.position = 'absolute';
                berserkBadge.style.bottom = '24px';
                berserkBadge.style.right = '-4px';
                berserkBadge.style.background = 'rgba(180,80,0,0.95)';
                berserkBadge.style.border = '1px solid #ff8800';
                berserkBadge.style.borderRadius = '6px';
                berserkBadge.style.color = '#ffddaa';
                berserkBadge.style.fontSize = '10px';
                berserkBadge.style.padding = '1px 3px';
                berserkBadge.style.pointerEvents = 'none';
                portraitWrap.style.position = portraitWrap.style.position || 'relative';
                portraitWrap.appendChild(berserkBadge);
            }
            berserkBadge.textContent = '⚡BERSERK';
            berserkBadge.title = 'Berserk Mode ACTIVE: boosted damage, taking HP overload each round. Auto-exits at critical HP.';
        } else if (portraitWrap) {
            const existing = portraitWrap.querySelector('.party-golem-berserk-badge');
            if (existing) existing.remove();
        }

        // Lens of Photomancy badge — shown on simulacra empowered by the Lens at combat start
        if (portraitWrap && member.isSummoned && member.summonStats?.lensPhotomancyBuff) {
            let lensBadge = portraitWrap.querySelector('.party-lens-photomancy-badge');
            if (!lensBadge) {
                lensBadge = document.createElement('span');
                lensBadge.className = 'party-lens-photomancy-badge';
                lensBadge.style.position = 'absolute';
                lensBadge.style.bottom = '40px';
                lensBadge.style.right = '-4px';
                lensBadge.style.background = 'rgba(30,80,120,0.95)';
                lensBadge.style.border = '1px solid #66ccff';
                lensBadge.style.borderRadius = '6px';
                lensBadge.style.color = '#ccf2ff';
                lensBadge.style.fontSize = '10px';
                lensBadge.style.padding = '1px 3px';
                lensBadge.style.pointerEvents = 'none';
                portraitWrap.style.position = portraitWrap.style.position || 'relative';
                portraitWrap.appendChild(lensBadge);
            }
            lensBadge.textContent = '🔎+20%';
            lensBadge.title = 'Lens of Photomancy: this simulacrum deals +20% damage.';
        } else if (portraitWrap) {
            const existing = portraitWrap.querySelector('.party-lens-photomancy-badge');
            if (existing) existing.remove();
        }

        // Thunderous Drums badge — shown on the bard's card when drums are active
        if (portraitWrap && !member.isSummoned && member.classId === 'bard' && member.thunderousDrumsActive) {
            let drumsBadge = portraitWrap.querySelector('.party-drums-badge');
            if (!drumsBadge) {
                drumsBadge = document.createElement('span');
                drumsBadge.className = 'party-drums-badge';
                drumsBadge.style.position = 'absolute';
                drumsBadge.style.bottom = '8px';
                drumsBadge.style.left = '-4px';
                drumsBadge.style.background = 'rgba(80,50,0,0.95)';
                drumsBadge.style.border = '1px solid #cc8800';
                drumsBadge.style.borderRadius = '6px';
                drumsBadge.style.color = '#ffd080';
                drumsBadge.style.fontSize = '10px';
                drumsBadge.style.padding = '1px 3px';
                drumsBadge.style.pointerEvents = 'none';
                portraitWrap.style.position = portraitWrap.style.position || 'relative';
                portraitWrap.appendChild(drumsBadge);
            }
            drumsBadge.textContent = '🥁';
            drumsBadge.title = 'Thunderous Drums ACTIVE: sonic/psychic attacks weakened.';
        } else if (portraitWrap) {
            const existing = portraitWrap.querySelector('.party-drums-badge');
            if (existing) existing.remove();
        }

        // Summon combat-stats row (damage range + defense, adapts to attack type)
        const statsRow = card.querySelector('[data-summon-stats]');
        if (statsRow && member.isSummoned) {
            const ss = member.summonStats || {};
            const def = ss.defense ?? 0;
            let dmgLabel, dmgIcon, dmgTitle;
            if (ss.meleeMin != null || ss.meleeMax != null) {
                dmgIcon  = '⚔️';
                dmgLabel = `${ss.meleeMin ?? '?'}–${ss.meleeMax ?? '?'}`;
                dmgTitle = `Melee damage: ${ss.meleeMin ?? '?'}–${ss.meleeMax ?? '?'}`;
            } else if (ss.rangedMin != null || ss.rangedMax != null) {
                dmgIcon  = '\u{1F3F9}';
                dmgLabel = `${ss.rangedMin ?? '?'}–${ss.rangedMax ?? '?'}`;
                dmgTitle = `Ranged damage: ${ss.rangedMin ?? '?'}–${ss.rangedMax ?? '?'}`;
            } else if (ss.magicMin != null || ss.magicMax != null) {
                dmgIcon  = '✨';
                dmgLabel = `${ss.magicMin ?? '?'}–${ss.magicMax ?? '?'}`;
                dmgTitle = `Magic damage: ${ss.magicMin ?? '?'}–${ss.magicMax ?? '?'}`;
            } else {
                dmgIcon  = '⚔️';
                dmgLabel = '?–?';
                dmgTitle = 'Damage: unknown';
            }
            const parts = [`${dmgIcon} ${dmgLabel}`, `\u{1F6E1}️ ${def}`];
            if (ss.beastKind === 'shambling_mound' && (ss.shamblingGrowthStage ?? 3) < 3) {
                parts.push(`🌱 ${ss.shamblingGrowthStage || 0}/3`);
            }
            if (ss.tierId && ss.attachments) {
                const a = ss.attachments;
                if (a.limbs) parts.push(`🦾 ${a.limbs}`);
                if (a.shield) parts.push('🛡');
                if (a.trinkets) parts.push(`💎 ${a.trinkets}`);
            }
            if (member.summonType === 'corpse_horror') {
                const corpses = ss.corpseCount || 1;
                const atkCount = ss.attackCount || 1;
                const skill = ss.meleeSkill || 0;
                parts.push(`🧵 ${corpses}`);
                parts.push(`🗡️x${atkCount}${ss.attackCap ? `/${ss.attackCap}` : ''}`);
                parts.push(`🎯 ${skill}`);
            }
            const isVKSwarm = member.summonType === 'vermin_swarm' || member.summonType === 'acid_swarm';
            if (isVKSwarm) {
                const atkCount = Math.max(1, ss.attackCount || 1);
                const maxUpgrades = Math.max(0, ss.maxGrowthUpgrades || 0);
                const currentUpgrades = Math.max(0, ss.growthUpgrades ?? (atkCount - 1));
                parts.push(`🗡️x${atkCount}/${maxUpgrades + 1}`);
                parts.push(`🐜 ${currentUpgrades}/${maxUpgrades}`);
            }
            // Show regen rate if applicable (flesh golem, stirge-type beasts)
            const regen = ss.regenPercent;
            if (regen) parts.push(`\u{1F504} ${Math.round(regen * 100)}%/rd`);
            statsRow.textContent = parts.join('  ');
            const swarmTitle = isVKSwarm
                ? `\nSwarm attacks: ${Math.max(1, ss.attackCount || 1)}/${Math.max(0, ss.maxGrowthUpgrades || 0) + 1} AoE attack(s) per turn.` +
                  `\nGrowth: ${Math.max(0, ss.growthUpgrades ?? ((ss.attackCount || 1) - 1))}/${Math.max(0, ss.maxGrowthUpgrades || 0)} upgrades. It grows after completing its own attack turn, adding +1 future AoE attack and keeper max HP until capped.`
                : '';
            statsRow.title = `${dmgTitle}\nDefense: ${def}` +
                (ss.beastKind === 'shambling_mound' && (ss.shamblingGrowthStage ?? 3) < 3
                    ? `\nMini Shambler growth: ${ss.shamblingGrowthStage || 0}/3 turns. Grows to 67%, 84%, then 100% of full mound HP/defense.`
                    : '') +
                (ss.tierId && ss.attachments
                    ? `\nGolem attachments: ${ss.attachments.limbs || 0} limb(s), ${ss.attachments.shield ? 'shield' : 'no shield'}, ${ss.attachments.trinkets || 0} trinket(s).`
                    : '') +
                (member.summonType === 'corpse_horror'
                    ? `\nCorpse Horror growth: ${ss.corpseCount || 1} corpses, ${ss.attackCount || 1}${ss.attackCap ? `/${ss.attackCap}` : ''} attacks/round, melee skill ${ss.meleeSkill || 0}. HP, defense, and skill continue growing after attacks cap.`
                    : '') +
                swarmTitle +
                (regen ? `\nRegen: ${Math.round(regen * 100)}% HP/round` : '');
            if (isVKSwarm) {
                card.title = `${card.dataset.baseTitle || card.title || ''}${swarmTitle}`;
            }
        }
        if (!member.isSummoned) {
            const baseTitle = card.dataset.baseTitle || card.title || '';
            if (member.classId === 'warlock' && member.abyssFormActive) {
                const defBonus = member.abyssFormDefBonus || member.level || 0;
                card.title = `${baseTitle}\n\nTentacled Horror Form: +${defBonus} defense, doubled HP, demon HP doubled.`;
            } else {
                card.title = baseTitle;
            }
        }

        // Row indicator — green outline for front row, orange for back row.
        card.style.outline = member.row === 'front'
            ? '2px solid rgba(80,220,80,0.75)'
            : '2px solid rgba(255,165,0,0.75)';
        card.title = card.title.replace(/ \[(Front|Back) Row\]/g, '');
        // We don't override card.title here; the outline color is self-explanatory.

        // Update equipment icons
        const eqRow = card.querySelector('.party-equip-row');
        if (eqRow) {
            eqRow.innerHTML = '';
            const slots = ['weapon', 'offhand', 'armor', 'shield'];
            for (const slot of slots) {
                if (member.equipment[slot]) {
                    const def = getItemDef(member.equipment[slot]);
                    if (def) {
                        const span = document.createElement('span');
                        span.className = 'party-equip-icon';
                        span.title = def.name + '\n' + def.description;
                        span.textContent = def.icon || slot.charAt(0).toUpperCase();
                        eqRow.appendChild(span);
                    }
                }
            }
        }

        // ── Status effects row ──────────────────────────────────────────────
        const partyStatusRow = card.querySelector('.party-status-row');
        if (partyStatusRow) {
            partyStatusRow.innerHTML = '';
            const pefx = member.activeEffects || [];
            const mkPB = (icon, label, bg, tip) => {
                const b = document.createElement('span');
                b.style.cssText = 'background:' + bg + ';color:#fff;font-size:9px;padding:1px 3px;border-radius:3px;cursor:default;white-space:nowrap;display:inline-block;';
                b.textContent = icon + ' ' + label;
                b.title = tip;
                partyStatusRow.appendChild(b);
            };
            if (member.isSummoned && member.summonStats?.eldritchAmuletBuff) {
                mkPB('📿', '+15% DMG', 'rgba(95,35,135,0.95)',
                    'Eldritch Amulet: this warlock demon or Awakened Lord deals +15% damage.');
            }
            if (member.isSummoned && member.summonStats?.hagEyeRodBuff) {
                mkPB('👁️', 'Rod', 'rgba(35,95,145,0.95)',
                    'Hag Eye Rod: this elemental gained +15% health, +15% damage, and +5 defense when summoned.');
            }
            // Stunned
            if (member.stunned)
                mkPB('⚡', 'Stunned', 'rgba(220,200,0,0.9)', 'Stunned: cannot act this turn');
            const encourage = this._getBarbarianEncourageState(member, party);
            if (encourage) {
                mkPB('📣', `+${encourage.bonusPct}% DMG`, 'rgba(165,60,20,0.95)',
                    `Barbarian Encouragement: +${encourage.bonusPct}% damage this round.\nSource: ${encourage.sourceName}\nRamp: ${encourage.rounds}/${BARBARIAN_ENCOURAGE_MAX_ROUNDS} rage rounds.`);
            }
            if (!member.isSummoned && member.classId === 'barbarian' && member.werebearActive) {
                mkPB('🐻', 'Werebear', 'rgba(120,70,20,0.95)',
                    `Werebear active: +50% max/current HP, bonus defense, 10% HP regen/round, and weapon riders suppressed.`);
            }
            const shieldWall = this._getFormationShieldWallState(member, party);
            if (shieldWall) {
                mkPB('🛡️', `Wall +${shieldWall.total}`, 'rgba(40,80,150,0.95)',
                    `Formation Shield Wall: +${shieldWall.total} defense and +${shieldWall.total}% to shield block, intercept, retaliatory strike, squire opportunity strike, and formation crit.\n${shieldWall.count} contributor(s), +${shieldWall.step} each, average contributor level ${shieldWall.avg}.`);
            }
            if (member.warriorTauntActive) {
                mkPB('🛡️', 'Taunt', 'rgba(30,110,150,0.95)',
                    `Taunt active: costs 1 ST/round. Monsters check this warrior before single-target melee, ranged, and magic attacks.`);
            }
            if (!member.isSummoned && member.classId === 'paladin' && member.paladinSteedActive) {
                const meleeBonus = 100 + (member.level || 1);
                mkPB('🐎', 'Steed', 'rgba(135,95,25,0.95)',
                    `Summoned Steed: +50% max HP, +${meleeBonus}% regular melee damage, half melee damage taken, and Smite/AoE Smite can crit. Costs ${PALADIN_STEED_MANA_PER_ROUND} MP/round.`);
            }
            if (!member.isSummoned && member.classId === 'paladin' && member.martyrsCovenantActive) {
                mkPB('✝️', 'Covenant', 'rgba(135,115,25,0.95)',
                    `Martyr's Covenant: heavy single hits on recruited living allies transfer to this paladin. Costs ${PALADIN_COVENANT_MANA_PER_ROUND} MP/round; cannot kill the paladin.`);
            }
            if (!member.isSummoned && member.classId === 'cleric' && member.divineShroudActive) {
                const reduction = Math.round(Math.min(0.95, (member.level || 1) * 0.005) * 100);
                mkPB('✨', 'Shroud', 'rgba(150,135,35,0.95)',
                    `Divine Shroud: ${reduction}% all-source damage reduction before armor/defense, including DoTs. Costs 15 MP/round; level% chance to auto-revive at 50% HP if slain.`);
            }
            const roundRegenPct = typeof member.getRoundHealthRegenPct === 'function' ? member.getRoundHealthRegenPct() : 0;
            if (roundRegenPct > 0) {
                mkPB('💍', 'Regen', 'rgba(45,145,95,0.95)',
                    `Ring of Regeneration: restores ${Math.round(roundRegenPct * 100)}% max HP each combat round. Two rings stack additively.`);
            }
            const pblur = pefx.find(x => x && x.type === 'blur' && x.rounds > 0);
            if (pblur) {
                const missPct = Math.round(((pblur.missChance ?? PHOTOMANCER_BLUR_MISS_CHANCE) || 0) * 100);
                mkPB('🌀', 'Blur', 'rgba(45,110,190,0.9)',
                    `Photomancer Blur: ${missPct}% miss chance against melee and ranged attacks — ${pblur.rounds} rds left.`);
            }
            const soulful = pefx.find(x => x && x.type === 'soulful_melody_anthem' && x.rounds > 0);
            if (soulful) {
                const atk = soulful.damageBonus || 0;
                const def = soulful.defenseBonus || 0;
                mkPB('🎼', `Dirge +${atk}/+${def}`, 'rgba(90,55,135,0.95)',
                    `Soulful Melody: +${atk} attack and +${def} defense — ${soulful.rounds} rds left${soulful.sourceName ? `.\nPlayed by ${soulful.sourceName}.` : '.'}`);
            }
            const rbRed = pefx.find(x => x && x.type === 'rainbow_red' && x.rounds > 0);
            if (rbRed) mkPB('🔴', 'Red', 'rgba(170,40,35,0.95)',
                `Eternal Rainbow Red: ${Math.round((rbRed.healPct || 0.10) * 100)}% max HP regen each round — refreshed by active rainbow.`);
            const rbOrange = pefx.find(x => x && x.type === 'rainbow_orange' && x.rounds > 0);
            if (rbOrange) mkPB('🟠', 'Orange', 'rgba(190,100,25,0.95)',
                `Eternal Rainbow Orange: ${Math.round((rbOrange.resourcePct || 0.05) * 100)}% max MP and ST regen each round — refreshed by active rainbow.`);
            const rbYellow = pefx.find(x => x && x.type === 'rainbow_yellow' && x.rounds > 0);
            if (rbYellow) mkPB('🟡', 'Yellow', 'rgba(185,155,25,0.95)',
                `Eternal Rainbow Yellow: +${rbYellow.damageBonus || 0} melee, ranged, and magic offense — refreshed by active rainbow.`);
            const rbGreen = pefx.find(x => x && x.type === 'rainbow_green' && x.rounds > 0);
            if (rbGreen) mkPB('🟢', 'Green', 'rgba(45,150,65,0.95)',
                `Eternal Rainbow Green: +${rbGreen.defenseBonus || 0} defense — refreshed by active rainbow.`);
            const rbIndigo = pefx.find(x => x && x.type === 'rainbow_indigo' && x.rounds > 0);
            if (rbIndigo) mkPB('🟣', 'Indigo', 'rgba(80,55,150,0.95)',
                `Eternal Rainbow Indigo: ${Math.round((rbIndigo.cleanseChance || 0) * 100)}% chance to immediately purge new harmful monster effects.`);
            if (member.isSummoned && member.summonType === 'leprechaun') {
                const attempts = member.leprechaunGlamourChecks || 0;
                const next = attempts >= 19 ? 0 : Math.max(0, 1 - attempts * 0.05);
                mkPB('🍀', 'Glamour', 'rgba(35,125,70,0.95)',
                    `Leprechaun Glamour: next incoming single-target attack has ${Math.round(next * 100)}% miss chance; resets at the start of the Leprechaun's turn.`);
            }
            const pinvis = pefx.find(x => x && x.type === 'improved_invisibility' && x.rounds > 0)
                || pefx.find(x => x && x.type === 'invisibility' && x.rounds > 0);
            if (pinvis) {
                const improved = pinvis.type === 'improved_invisibility';
                mkPB('👁️', improved ? 'Imp Invis' : 'Invisible', improved ? 'rgba(70,35,150,0.92)' : 'rgba(35,75,125,0.92)',
                    `${improved ? 'Improved Invisibility' : 'Invisibility'}: cannot be targeted by melee, ranged, or single-target magic attacks; AoE still hits.${improved ? ' Does not break on attack.' : ' Breaks when this character damages an enemy.'} ${pinvis.rounds} rds left.`);
            }
            // Webbed / paralyzed / constricted / mentally enslaved
            if (member.webbedRounds > 0) {
                if ((member.abolethEnslavedRounds || 0) > 0) {
                    mkPB('🧠', 'Enslaved', 'rgba(80,30,140,0.92)', 'Aboleth mental enslavement: cannot act — ' + member.abolethEnslavedRounds + ' rds left');
                } else {
                    mkPB('🕸️', 'Webbed', 'rgba(120,80,0,0.9)', 'Webbed/Paralyzed/Constricted: ' + member.webbedRounds + ' rds left');
                }
            }
            // DoTs and debuffs from activeEffects
            const ppo = pefx.find(x => x && x.type === 'poison');
            if (ppo) mkPB('☠️', 'Poisoned', 'rgba(80,0,140,0.9)',
                'Poisoned: ' + (ppo.damage||1) + ' dmg/round — ' + (ppo.rounds||0) + ' rds left');
            const pbu = pefx.find(x => x && x.type === 'burn' && x.rounds > 0);
            if (pbu) mkPB('🔥', 'Burning', 'rgba(200,70,0,0.9)',
                'Burning: ' + (pbu.damage||0) + ' dmg/round — ' + pbu.rounds + ' rds left');
            const pdr = pefx.find(x => x && x.type === 'drowning' && x.rounds > 0);
            if (pdr) mkPB('🌊', 'Drowning', 'rgba(0,80,180,0.9)',
                'Drowning: ' + (pdr.damage||0) + ' dmg/round, -2 def — ' + pdr.rounds + ' rds left');
            const pic = pefx.find(x => x && x.type === 'ice_chill' && x.rounds > 0);
            if (pic) mkPB('❄️', 'Ice Chill', 'rgba(100,180,230,0.9)',
                'Ice Chill: -' + Math.abs(pic.damageBonus||0) + ' dmg dealt — ' + pic.rounds + ' rds left');
            const pmr = pefx.find(x => x && x.type === 'mummy_rot');
            if (pmr) {
                const rotTip = pmr.permanent
                    ? 'Mummy Rot: ' + (pmr.damage||0) + ' dmg/round (permanent) — no healing'
                    : 'Mummy Rot: no healing — ' + (pmr.rounds||0) + ' rds left';
                mkPB('🟤', 'Rotting', 'rgba(110,55,0,0.9)', rotTip);
            }
            // Fracture (Bone Archer bleed DoT)
            const pfrac = pefx.find(x => x && x.type === 'fracture' && x.rounds > 0);
            if (pfrac) mkPB('🦴', 'Fracture', 'rgba(140,80,30,0.9)',
                'Fracture: ' + (pfrac.damage||0) + ' bleed/round — ' + pfrac.rounds + ' rds left');
            // Necrotic Curse (Death Knight — reduces all damage dealt)
            const pnc = pefx.find(x => x && x.type === 'necrotic_curse' && x.rounds > 0);
            if (pnc) mkPB('💀', 'Cursed', 'rgba(60,0,80,0.9)',
                'Necrotic Curse: ' + (pnc.damageBonus||0) + ' all damage — ' + pnc.rounds + ' rds left');
            // Hag's Curse (hag/stone hag — reduces all combat stats)
            const phc = pefx.find(x => x && x.type === 'hag_curse' && x.rounds > 0);
            if (phc) mkPB('🧙', 'Hexed', 'rgba(80,0,80,0.9)',
                'Hag\'s Curse: ' + (phc.damageBonus||0) + ' all stats, ' + (phc.defenseBonus||0) + ' def — ' + phc.rounds + ' rds left');
            // Roper Weakness (roper tentacle — melee debuff)
            const prw = pefx.find(x => x && x.type === 'roper_weakness' && x.rounds > 0);
            if (prw) mkPB('🦑', 'Weakened', 'rgba(80,50,10,0.9)',
                'Roper Grip: ' + (prw.meleeDamageBonus||0) + ' melee damage — ' + prw.rounds + ' rds left');
            // Quasit Venom (armor-ignoring poison DoT)
            const pqv = pefx.find(x => x && x.type === 'quasit_poison' && x.rounds > 0);
            if (pqv) mkPB('\u{1F47F}', 'Venom', 'rgba(60,0,120,0.9)',
                'Quasit Venom: ' + (pqv.damage||0) + ' dmg/round (ignores armor) — ' + pqv.rounds + ' rds left');
            // Wither (Witch Doctor — all damage reduced)
            const pwt = pefx.find(x => x && x.type === 'wither' && x.rounds > 0);
            if (pwt) mkPB('\u{1F9B4}', 'Withered', 'rgba(80,40,0,0.9)',
                'Wither: ' + (pwt.damageBonus||0) + ' all damage dealt — ' + pwt.rounds + ' rds left');
            // Hex (Witch Doctor — defense reduced)
            const phex = pefx.find(x => x && x.type === 'hex' && x.rounds > 0);
            if (phex) mkPB('\u{1F480}', 'Hexed', 'rgba(100,0,0,0.9)',
                'Hex: ' + (phex.defenseBonus||0) + ' defense — ' + phex.rounds + ' rds left');
            // Taunted (Gladiator — all damage reduced)
            const ptnt = pefx.find(x => x && x.type === 'taunted' && x.rounds > 0);
            if (ptnt) mkPB('⚔️', 'Taunted', 'rgba(140,60,0,0.9)',
                'Taunted: ' + (ptnt.damageBonus||0) + ' all damage — ' + ptnt.rounds + ' rd left');
            // Rust Corrosion (Rust Monster — permanent defense debuff)
            const prc = pefx.find(x => x && x.type === 'rust_corrosion');
            if (prc) mkPB('\u{1F99F}', 'Corroded', 'rgba(100,50,10,0.9)',
                'Rust Corrosion: ' + (prc.defenseBonus||0) + ' defense (permanent this combat)');
            // Prone (Zombie Giant stomp)
            if (member.proneRounds > 0) mkPB('⏬', 'Prone', 'rgba(100,70,20,0.9)',
                'Prone: cannot act — ' + member.proneRounds + ' rd left');
            const pms = pefx.find(x => x && x.type === 'mage_shield' && x.rounds > 0);
            if (pms) mkPB('🛡️', 'Shielded', 'rgba(0,80,180,0.85)',
                'Arcane Shield: +' + (pms.defenseBonus||0) + ' defense — ' + pms.rounds + ' rds left');
            if (member.quickstepHasteActive) {
                mkPB('⚡', 'Quickstep', 'rgba(45,120,180,0.92)',
                    'Quickstep Song: gains one extra qualifying attack each round this combat.');
            }
            const ph = pefx.find(x => x && x.source === 'bard_song' && x.type === 'bard_song_haste');
            const pb = pefx.find(x => x && x.source === 'bard_song' && x.type === 'bard_song_battle');
            const phl = pefx.find(x => x && x.source === 'bard_song' && x.type === 'bard_song_healing');
            if (ph || pb || phl) {
                const parts = [];
                if (ph) parts.push('+' + (ph.initiativeBonus||0) + ' init');
                if (pb) parts.push('+' + (pb.damageBonus||0) + ' dmg/def');
                if (phl) parts.push('+' + (phl.hpPerMin||0) + ' HP/min');
                mkPB('🎵', 'Song', 'rgba(0,140,100,0.9)', 'Bard Song: ' + parts.join(', '));
            }
        }
    }

    _getPortraitURL(seed, speciesId) {
        const key = `${seed}:${speciesId || 'human'}`;
        if (!this.portraitCache.has(key)) {
            const canvas = generatePortrait(seed, speciesId);
            this.portraitCache.set(key, canvas.toDataURL());
        }
        return this.portraitCache.get(key);
    }

    /**
     * Render a stylised portrait for a summoned creature — a radial-gradient
     * background tinted for its kind (undead = cold purple, beast = forest
     * green) with the creature's emoji centred on top. The result is cached
     * per summon id since it is purely deterministic.
     */
    _getSummonPortraitURL(summon) {
        const key = `summon:${summon.id}:${summon.spriteTint || ''}`;
        if (this.portraitCache.has(key)) return this.portraitCache.get(key);

        if (summon.enemySprite) {
            const spriteCanvas = generateEnemySprite(summon.enemySprite, 42);
            if (summon.spriteTint) {
                const tinted = document.createElement('canvas');
                tinted.width = spriteCanvas.width;
                tinted.height = spriteCanvas.height;
                const tctx = tinted.getContext('2d');
                tctx.drawImage(spriteCanvas, 0, 0);
                tctx.globalCompositeOperation = 'source-atop';
                tctx.globalAlpha = 0.85;
                tctx.fillStyle = summon.spriteTint;
                tctx.fillRect(0, 0, tinted.width, tinted.height);
                tctx.globalCompositeOperation = 'source-over';
                tctx.globalAlpha = 0.35;
                tctx.drawImage(spriteCanvas, 0, 0);
                const url = tinted.toDataURL();
                this.portraitCache.set(key, url);
                return url;
            }
            const url = spriteCanvas.toDataURL();
            this.portraitCache.set(key, url);
            return url;
        }

        const size = 96;
        const canvas = document.createElement('canvas');
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext('2d');

        const isUndead = summon.kind === 'undead';
        // Background
        const grad = ctx.createRadialGradient(size / 2, size / 2, 6, size / 2, size / 2, size / 2);
        if (isUndead) {
            grad.addColorStop(0, '#3b2a55');
            grad.addColorStop(1, '#0e0a1b');
        } else {
            grad.addColorStop(0, '#2f5c2a');
            grad.addColorStop(1, '#0c1a0a');
        }
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, size, size);

        // Subtle border
        ctx.strokeStyle = isUndead ? '#8a7ab8' : '#8ac27a';
        ctx.lineWidth = 2;
        ctx.strokeRect(1, 1, size - 2, size - 2);

        // Centered emoji
        ctx.font = '64px serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = '#ffffff';
        ctx.shadowColor = isUndead ? 'rgba(160, 120, 220, 0.8)' : 'rgba(150, 220, 120, 0.8)';
        ctx.shadowBlur = 8;
        ctx.fillText(summon.icon, size / 2, size / 2 + 4);
        ctx.shadowBlur = 0;

        const url = canvas.toDataURL();
        this.portraitCache.set(key, url);
        return url;
    }
}
