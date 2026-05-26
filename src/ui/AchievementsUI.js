const TIERS = [
    { key: 'bronze', label: 'Bronze', color: '#cd7f32' },
    { key: 'silver', label: 'Silver', color: '#c0c0c0' },
    { key: 'gold', label: 'Gold', color: '#d4af37' },
];

const PARTY_BADGES = [
    {
        id: 'gold_hoarder',
        name: 'Coin Choir',
        desc: 'Collect total gold.',
        reward: '',
        value: (s) => s.goldCollected,
        thresholds: { bronze: 10000, silver: 100000, gold: 1000000 },
    },
    {
        id: 'slayer',
        name: 'Dungeon Reaper',
        desc: 'Defeat monsters.',
        reward: 'Title unlock: Reaper',
        value: (s) => s.kills,
        thresholds: { bronze: 1000, silver: 5000, gold: 10000 },
    },
    {
        id: 'cartographer',
        name: 'Lockbreaker Canticle',
        desc: 'Solve magical chest locks.',
        reward: '+lore points and chest prestige',
        value: (s) => s.chestsSolved,
        thresholds: { bronze: 5, silver: 25, gold: 100 },
    },
    {
        id: 'fountain',
        name: 'Fountainbound',
        desc: 'Drink from magical fountains.',
        reward: 'Title unlock: The Tasted',
        value: (s) => s.fountainsDrunk,
        thresholds: { bronze: 5, silver: 20, gold: 75 },
    },
    {
        id: 'crafter',
        name: 'Workshop Oath',
        desc: 'Craft potions and scrolls.',
        reward: 'Artificer lore chapter',
        value: (s) => (s.potionsCrafted || 0) + (s.scrollsCrafted || 0),
        thresholds: { bronze: 10, silver: 50, gold: 250 },
    },
    {
        id: 'golem_smith',
        name: 'Golemwright Prime',
        desc: 'Forge golems.',
        reward: 'Title unlock: Forge Architect',
        value: (s) => s.golemsCrafted,
        thresholds: { bronze: 3, silver: 12, gold: 40 },
    },
    {
        id: 'survivor',
        name: 'Iron Pulse',
        desc: 'Absorb incoming damage.',
        reward: 'Title unlock: Unbroken',
        value: (s) => s.damageTaken,
        thresholds: { bronze: 500, silver: 5000, gold: 50000 },
    },
    {
        id: 'arsenal',
        name: 'Junk Collector',
        desc: 'Find items and supplies.',
        reward: 'Title unlock: Deep Scavenger',
        value: (s) => (s.itemsFound || 0),
        thresholds: { bronze: 100, silver: 1000, gold: 10000 },
    },
];

const MEMBER_BADGES = [
    {
        id: 'duelist',
        name: 'Edge of Fate',
        desc: 'Deal combat damage.',
        reward: 'Title unlock: Duelist',
        value: (m) => m.damageDealt || 0,
        thresholds: { bronze: 250, silver: 2500, gold: 25000 },
    },
    {
        id: 'executioner',
        name: 'Last Breath Ledger',
        desc: 'Land killing blows.',
        reward: 'Title unlock: Finisher',
        value: (m) => m.kills || 0,
        thresholds: { bronze: 10, silver: 75, gold: 350 },
    },
    {
        id: 'tactician',
        name: 'Turnline Conductor',
        desc: 'Use class abilities.',
        reward: 'Title unlock: Tactician',
        value: (m) => m.abilitiesUsed || 0,
        thresholds: { bronze: 20, silver: 100, gold: 400 },
    },
    {
        id: 'ironwall',
        name: 'Vanguard Wall',
        desc: 'Intercept attacks.',
        reward: 'Title unlock: Bulwark',
        value: (m) => m.intercepts || 0,
        thresholds: { bronze: 5, silver: 30, gold: 120 },
    },
    {
        id: 'countermaster',
        name: 'Echo Blade',
        desc: 'Trigger retaliations.',
        reward: 'Title unlock: Countermaster',
        value: (m) => m.retaliations || 0,
        thresholds: { bronze: 5, silver: 30, gold: 120 },
    },
    {
        id: 'stunmaster',
        name: 'Thunder Caller',
        desc: 'Inflict stuns.',
        reward: 'Title unlock: Crowdbreaker',
        value: (m) => m.stunsInflicted || 0,
        thresholds: { bronze: 10, silver: 60, gold: 250 },
    },
];

function determineTier(value, thresholds) {
    if (value >= thresholds.gold) return 'gold';
    if (value >= thresholds.silver) return 'silver';
    if (value >= thresholds.bronze) return 'bronze';
    return 'none';
}

function tierColor(tierKey) {
    const tier = TIERS.find((t) => t.key === tierKey);
    return tier ? tier.color : '#756a58';
}

function fmt(n) {
    return (Number(n) || 0).toLocaleString();
}

export class AchievementsUI {
    constructor(getState) {
        this._getState = getState;
        this.isOpen = false;
        this._selectedMemberId = null;
        this._overlay = null;
        this._body = null;
        this._memberSelect = null;
        this._buildDOM();
    }

    show() {
        this.refresh();
        this._overlay.style.display = 'flex';
        this.isOpen = true;
    }

    hide() {
        if (this._overlay) this._overlay.style.display = 'none';
        this.isOpen = false;
    }

    toggle() {
        if (this.isOpen) this.hide();
        else this.show();
    }

    refresh() {
        if (!this._body) return;
        const state = this._getState ? this._getState() : null;
        const totals = state && state.achievementStats && state.achievementStats.totals
            ? state.achievementStats.totals
            : null;
        this._body.innerHTML = '';

        if (!state || !totals) {
            const empty = document.createElement('div');
            empty.style.cssText = 'color:#9c8f7a;font-size:13px;';
            empty.textContent = 'No adventure telemetry yet. Enter the dungeon and make history.';
            this._body.appendChild(empty);
            return;
        }

        const byMember = (state.achievementStats && state.achievementStats.byMember) || {};
        const partyMembers = Array.isArray(state.party) ? state.party : [];
        const recruitedIds = new Set(
            partyMembers
                .filter((member) => member && !member.isSummoned)
                .map((member) => member.id)
        );
        const memberList = Object.values(byMember)
            .filter((member) => recruitedIds.has(member.id))
            .sort((a, b) => (b.kills || 0) - (a.kills || 0));

        this._renderSummary(state);
        this._renderBadgeSection('Party Achievements', PARTY_BADGES, totals);

        const memberPanel = document.createElement('div');
        memberPanel.style.cssText = 'margin-top:14px;padding-top:12px;border-top:1px solid #4a3a25;';

        const memberHeader = document.createElement('div');
        memberHeader.style.cssText = 'display:flex;justify-content:space-between;align-items:center;gap:8px;';
        const title = document.createElement('div');
        title.textContent = 'Individual Achievements';
        title.style.cssText = 'font-size:14px;color:#e1c88f;letter-spacing:0.8px;text-transform:uppercase;';

        this._memberSelect = document.createElement('select');
        this._memberSelect.style.cssText = 'background:#1b1410;border:1px solid #665033;color:#e6d7ba;padding:4px 8px;border-radius:4px;font-family:monospace;';
        if (!this._selectedMemberId && memberList.length > 0) this._selectedMemberId = memberList[0].id;

        for (const m of memberList) {
            const opt = document.createElement('option');
            opt.value = m.id;
            opt.textContent = `${m.name} (${m.classId || 'unknown'})`;
            if (m.id === this._selectedMemberId) opt.selected = true;
            this._memberSelect.appendChild(opt);
        }

        this._memberSelect.addEventListener('change', () => {
            this._selectedMemberId = this._memberSelect.value;
            this.refresh();
        });

        memberHeader.append(title, this._memberSelect);
        memberPanel.appendChild(memberHeader);

        const selected = memberList.find((m) => m.id === this._selectedMemberId) || null;
        if (!selected) {
            const noMember = document.createElement('div');
            noMember.style.cssText = 'margin-top:10px;color:#98886d;font-size:12px;';
            noMember.textContent = 'No recruited party member telemetry yet.';
            memberPanel.appendChild(noMember);
        } else {
            this._renderBadgeCards(memberPanel, MEMBER_BADGES, selected);
        }

        this._body.appendChild(memberPanel);
    }

    _buildDOM() {
        const overlay = document.createElement('div');
        Object.assign(overlay.style, {
            display: 'none',
            position: 'fixed',
            inset: '0',
            background: 'rgba(0,0,0,0.76)',
            zIndex: '1300',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '14px',
        });

        const panel = document.createElement('div');
        panel.style.cssText = [
            'width:min(960px,96vw)',
            'max-height:88vh',
            'overflow-y:auto',
            'background:linear-gradient(180deg,#20160f 0%, #15100b 100%)',
            'border:2px solid #6f5430',
            'border-radius:10px',
            'box-shadow:0 0 42px rgba(0,0,0,0.5)',
            'color:#e4d7bf',
            'font-family:monospace',
            'padding:16px 18px',
        ].join(';');

        const header = document.createElement('div');
        header.style.cssText = 'display:flex;justify-content:space-between;align-items:center;padding-bottom:10px;border-bottom:1px solid #594126;margin-bottom:10px;';

        const titleWrap = document.createElement('div');
        const title = document.createElement('div');
        title.textContent = 'Achievement Badges';
        title.style.cssText = 'font-size:20px;font-weight:bold;letter-spacing:1px;color:#f1d69a;';
        const subtitle = document.createElement('div');
        subtitle.textContent = 'Press G to open or close this ledger.';
        subtitle.style.cssText = 'font-size:12px;color:#9f8a66;';
        titleWrap.append(title, subtitle);

        const closeBtn = document.createElement('button');
        closeBtn.textContent = 'Close';
        closeBtn.className = 'menu-btn';
        closeBtn.addEventListener('click', () => this.hide());

        this._body = document.createElement('div');

        header.append(titleWrap, closeBtn);
        panel.append(header, this._body);
        overlay.appendChild(panel);
        document.body.appendChild(overlay);

        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) this.hide();
        });

        this._overlay = overlay;
    }

    _renderSummary(state) {
        const totals = state.achievementStats.totals;
        const row = document.createElement('div');
        row.style.cssText = 'display:grid;grid-template-columns:repeat(auto-fit,minmax(148px,1fr));gap:8px;margin-bottom:12px;';

        const summaryCards = [
            ['Damage Dealt', fmt(totals.damageDealt)],
            ['Damage Taken', fmt(totals.damageTaken)],
            ['Kills', fmt(totals.kills)],
            ['Gold Collected', fmt(totals.goldCollected)],
            ['Items Found', fmt(totals.itemsFound)],
            ['Abilities Used', fmt(totals.abilitiesUsed)],
        ];

        for (const [label, value] of summaryCards) {
            const card = document.createElement('div');
            card.style.cssText = 'background:#1a120d;border:1px solid #5d4528;border-radius:6px;padding:8px;';
            const l = document.createElement('div');
            l.textContent = label;
            l.style.cssText = 'font-size:11px;color:#a79372;text-transform:uppercase;letter-spacing:0.7px;';
            const v = document.createElement('div');
            v.textContent = value;
            v.style.cssText = 'font-size:16px;color:#f0ddb3;font-weight:bold;padding-top:4px;';
            card.append(l, v);
            row.appendChild(card);
        }

        this._body.appendChild(row);
    }

    _renderBadgeSection(titleText, defs, source) {
        const section = document.createElement('div');
        const title = document.createElement('div');
        title.textContent = titleText;
        title.style.cssText = 'font-size:14px;color:#e1c88f;letter-spacing:0.8px;text-transform:uppercase;margin:8px 0;';
        section.appendChild(title);
        this._renderBadgeCards(section, defs, source);
        this._body.appendChild(section);
    }

    _renderBadgeCards(section, defs, source) {
        const grid = document.createElement('div');
        grid.style.cssText = 'display:grid;grid-template-columns:repeat(auto-fit,minmax(230px,1fr));gap:8px;';

        for (const def of defs) {
            const value = Math.max(0, Number(def.value(source)) || 0);
            const tier = determineTier(value, def.thresholds);
            const color = tierColor(tier);

            const card = document.createElement('div');
            card.style.cssText = `background:#19130d;border:1px solid ${color};border-radius:8px;padding:9px;`;

            const top = document.createElement('div');
            top.style.cssText = 'display:flex;justify-content:space-between;align-items:center;gap:8px;';

            const name = document.createElement('div');
            name.textContent = def.name;
            name.style.cssText = `font-size:13px;color:${color};font-weight:bold;`;

            const badge = document.createElement('div');
            badge.textContent = tier === 'none' ? 'Unranked' : tier.toUpperCase();
            badge.style.cssText = `font-size:10px;color:${color};border:1px solid ${color};padding:2px 5px;border-radius:9px;`;
            top.append(name, badge);

            const desc = document.createElement('div');
            desc.textContent = def.desc;
            desc.style.cssText = 'font-size:12px;color:#b8aa8f;margin-top:6px;';

            const val = document.createElement('div');
            val.textContent = `Progress: ${fmt(value)}  (${fmt(def.thresholds.bronze)} / ${fmt(def.thresholds.silver)} / ${fmt(def.thresholds.gold)})`;
            val.style.cssText = 'font-size:11px;color:#e3d5b7;margin-top:7px;';

            const nodes = [top, desc, val];
            if (def.reward) {
                const reward = document.createElement('div');
                reward.textContent = `Reward: ${def.reward}`;
                reward.style.cssText = 'font-size:11px;color:#958261;margin-top:6px;';
                nodes.push(reward);
            }

            card.append(...nodes);
            grid.appendChild(card);
        }

        section.appendChild(grid);
    }
}
