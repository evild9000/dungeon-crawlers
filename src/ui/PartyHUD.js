import { generatePortrait } from '../utils/PortraitGenerator.js';
import { generateEnemySprite } from '../utils/SpriteGenerator.js';
import { getItemDef } from '../items/ItemTypes.js';
import { GOLEM_PRESETS, getSummonPreset, UNDEAD_TIERS } from '../entities/Summons.js';
import {
    BARBARIAN_ENCOURAGE_DAMAGE_PER_ROUND,
    BARBARIAN_ENCOURAGE_MAX_DAMAGE_MULT,
    BARBARIAN_ENCOURAGE_MAX_ROUNDS,
    BARBARIAN_ENCOURAGE_UNLOCK_LEVEL,
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
        if (this._familiarBtn) {
            const hasMage = Array.isArray(party) && party.some(
                m => m && m.classId === 'mage' && !m.isSummoned && (m.level || 0) >= 25,
            );
            this._familiarBtn.style.display = hasMage ? '' : 'none';
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
        this._craftBtn.title = 'Open the Crafting menu: enchant gear, augment trinkets, brew potions, forge / repair golems. Requires an Artificer in the party.';
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
                    lichBadge.title = 'Lich Form active: poison & stun immune, partial magic resist, Phylactery on death.';
                }
            } else if (lichBadge) {
                lichBadge.remove();
            }
        }

        // Fae Token badge — shown for druids who have accumulated fae tokens.
        if (portraitWrap) {
            let faeBadge = portraitWrap.querySelector('.party-fae-badge');
            const faeTokens = member.faeTokens || 0;
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
                faeBadge.title = `Fae Tokens: ${faeTokens}/3 — Commune again to summon the Faerie Queen!`;
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
            // Show regen rate if applicable (flesh golem, stirge-type beasts)
            const regen = ss.regenPercent;
            if (regen) parts.push(`\u{1F504} ${Math.round(regen * 100)}%/rd`);
            statsRow.textContent = parts.join('  ');
            statsRow.title = `${dmgTitle}\nDefense: ${def}` +
                (ss.beastKind === 'shambling_mound' && (ss.shamblingGrowthStage ?? 3) < 3
                    ? `\nMini Shambler growth: ${ss.shamblingGrowthStage || 0}/3 turns. Grows to 67%, 84%, then 100% of full mound HP/defense.`
                    : '') +
                (ss.tierId && ss.attachments
                    ? `\nGolem attachments: ${ss.attachments.limbs || 0} limb(s), ${ss.attachments.shield ? 'shield' : 'no shield'}, ${ss.attachments.trinkets || 0} trinket(s).`
                    : '') +
                (regen ? `\nRegen: ${Math.round(regen * 100)}% HP/round` : '');
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
            // Stunned
            if (member.stunned)
                mkPB('⚡', 'Stunned', 'rgba(220,200,0,0.9)', 'Stunned: cannot act this turn');
            const encourage = this._getBarbarianEncourageState(member, party);
            if (encourage) {
                mkPB('📣', `+${encourage.bonusPct}% DMG`, 'rgba(165,60,20,0.95)',
                    `Barbarian Encouragement: +${encourage.bonusPct}% damage this round.\nSource: ${encourage.sourceName}\nRamp: ${encourage.rounds}/${BARBARIAN_ENCOURAGE_MAX_ROUNDS} rage rounds.`);
            }
            // Webbed / paralyzed / constricted
            if (member.webbedRounds > 0)
                mkPB('🕸️', 'Webbed', 'rgba(120,80,0,0.9)', 'Webbed/Paralyzed/Constricted: ' + member.webbedRounds + ' rds left');
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
            // Prone (Zombie Giant stomp)
            if (member.proneRounds > 0) mkPB('⏬', 'Prone', 'rgba(100,70,20,0.9)',
                'Prone: cannot act — ' + member.proneRounds + ' rd left');
            const pms = pefx.find(x => x && x.type === 'mage_shield' && x.rounds > 0);
            if (pms) mkPB('🛡️', 'Shielded', 'rgba(0,80,180,0.85)',
                'Arcane Shield: +' + (pms.defenseBonus||0) + ' defense — ' + pms.rounds + ' rds left');
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
        const key = `summon:${summon.id}`;
        if (this.portraitCache.has(key)) return this.portraitCache.get(key);

        if (summon.enemySprite) {
            const spriteCanvas = generateEnemySprite(summon.enemySprite, 42);
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
