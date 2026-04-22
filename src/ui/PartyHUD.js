import { generatePortrait } from '../utils/PortraitGenerator.js';
import { getItemDef } from '../items/ItemTypes.js';
import { getSummonPreset } from '../entities/Summons.js';

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
        this._lightEl = null;   // Phase 10 light status indicator
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

        // Show the Craft button only when a living artificer is in the party.
        if (this._craftBtn) {
            const hasArtificer = Array.isArray(party) && party.some(
                m => m && m.classId === 'artificer' && !m.isSummoned && m.health > 0,
            );
            this._craftBtn.style.display = hasArtificer ? '' : 'none';
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
                this.container.appendChild(card);
                this.cards.set(member.id, card);
            }
            this._updateBars(card, member);
        }
    }

    show() { this.container.style.display = 'flex'; }
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
    }

    // ──────────────────────────────────────────
    // Top bar (gold, food, action buttons)
    // ──────────────────────────────────────────

    _buildTopBar() {
        this._topBar = document.createElement('div');
        this._topBar.className = 'hud-top-bar';

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
        this._craftBtn.title = 'Open the Crafting menu: enchant gear, brew potions, forge / repair golems. Requires an Artificer in the party.';
        this._craftBtn.style.display = 'none';
        this._craftBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            if (this._callbacks.onOpenCrafting) this._callbacks.onOpenCrafting();
        });
        this._topBar.appendChild(this._craftBtn);

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

        // Insert top bar before any cards
        this.container.prepend(this._topBar);
    }

    // ──────────────────────────────────────────
    // Party cards
    // ──────────────────────────────────────────

    _createCard(member) {
        const card = document.createElement('div');
        card.className = 'party-card';

        const cls    = member.classDef;
        const sp     = member.speciesDef;
        const summon = getSummonPreset(member);

        // Card-wide tooltip — for summons this replaces the class/species
        // summary with the creature's type and its list of abilities.
        if (summon) {
            const abilityLines = (summon.abilities || []).map(a => `\u2022 ${a}`).join('\n');
            card.title =
                `${summon.icon} ${member.name}\n` +
                `${summon.speciesLabel || summon.name}\n` +
                (abilityLines ? `\nAbilities:\n${abilityLines}` : '');
        } else if (cls && sp) {
            card.title = `${member.name}\n${cls.icon} ${cls.name} — ${cls.description}\n${sp.icon} ${sp.name} — ${sp.description}`;
        }

        // Portrait (with class icon overlay)
        const portraitWrap = document.createElement('div');
        portraitWrap.className = 'party-portrait-wrap';

        const img = document.createElement('img');
        img.className = 'party-portrait';
        img.src = summon
            ? this._getSummonPortraitURL(summon)
            : this._getPortraitURL(member.portraitSeed, member.speciesId);
        portraitWrap.appendChild(img);

        // Badge: for summons we show the creature icon itself; for players
        // we show their class icon.
        const badgeIcon = summon ? summon.icon : (cls ? cls.icon : null);
        if (badgeIcon) {
            const badge = document.createElement('span');
            badge.className = 'party-class-badge';
            badge.textContent = badgeIcon;
            if (summon) {
                const abilityLines = (summon.abilities || []).map(a => `\u2022 ${a}`).join('\n');
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
        card.appendChild(name);

        // Class / species row — summons show their creature-type label
        // instead of the player's class+species icon pair.
        if (summon) {
            const csRow = document.createElement('div');
            csRow.className = 'party-cs-row';
            csRow.textContent = `${summon.icon} ${summon.speciesLabel || summon.name}`;
            const abilityLines = (summon.abilities || []).map(a => `\u2022 ${a}`).join('\n');
            csRow.title = abilityLines
                ? `${summon.speciesLabel || summon.name}\n\nAbilities:\n${abilityLines}`
                : (summon.speciesLabel || summon.name);
            card.appendChild(csRow);
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

    _updateBars(card, member) {
        const fills = card.querySelectorAll('.stat-bar-fill');
        fills[0].style.width = `${Math.max(0, (member.health / member.maxHealth) * 100)}%`;
        fills[1].style.width = `${Math.max(0, (member.stamina / Math.max(1, member.maxStamina)) * 100)}%`;
        fills[2].style.width = `${Math.max(0, (member.mana / Math.max(1, member.maxMana)) * 100)}%`;

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
            const isPoisoned = Array.isArray(member.activeEffects)
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
        }

        // Update equipment icons
        const eqRow = card.querySelector('.party-equip-row');
        if (eqRow) {
            eqRow.innerHTML = '';
            const slots = ['weapon', 'armor', 'shield'];
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
        const key = `summon:${summon.id}`;
        if (this.portraitCache.has(key)) return this.portraitCache.get(key);

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
