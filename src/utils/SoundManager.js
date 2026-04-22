/**
 * SoundManager - Procedural audio synthesizer for dungeon crawler game.
 * All sounds generated via Web Audio API, no audio files needed.
 */
class SoundManager {
    constructor() {
        this.ctx = null;
        this.masterGain = null;
        this.muted = false;
    }

    /**
     * Lazy-init AudioContext on first use (browsers require user gesture).
     */
    ensureContext() {
        if (this.ctx) return;
        this.ctx = new (window.AudioContext || window.webkitAudioContext)();
        this.masterGain = this.ctx.createGain();
        // Master volume bumped +30% (0.3 -> 0.39) per design tuning.
        this.masterGain.gain.value = 0.39;
        this.masterGain.connect(this.ctx.destination);
    }

    // -------------------------------------------------------
    //  Helpers
    // -------------------------------------------------------

    /**
     * Create a short noise buffer of the given duration (seconds).
     */
    createNoiseBuffer(duration) {
        const sampleRate = this.ctx.sampleRate;
        const length = sampleRate * duration;
        const buffer = this.ctx.createBuffer(1, length, sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < length; i++) {
            data[i] = Math.random() * 2 - 1;
        }
        return buffer;
    }

    /**
     * Play a noise burst with optional filter, connected to the given output node.
     * Returns the source node.
     */
    playNoise(duration, volume, filterType, filterFreq, output, startTime) {
        const t = startTime || this.ctx.currentTime;
        const source = this.ctx.createBufferSource();
        source.buffer = this.createNoiseBuffer(duration + 0.1);

        const gain = this.ctx.createGain();
        gain.gain.setValueAtTime(volume, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + duration);

        if (filterType && filterFreq) {
            const filter = this.ctx.createBiquadFilter();
            filter.type = filterType;
            filter.frequency.value = filterFreq;
            source.connect(filter);
            filter.connect(gain);
        } else {
            source.connect(gain);
        }

        gain.connect(output);
        source.start(t);
        source.stop(t + duration + 0.05);
        return source;
    }

    /**
     * Play an oscillator tone with envelope decay.
     * Returns the oscillator node.
     */
    playTone(freq, type, duration, volume, output, startTime) {
        const t = startTime || this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        osc.type = type;
        osc.frequency.setValueAtTime(freq, t);

        const gain = this.ctx.createGain();
        gain.gain.setValueAtTime(volume, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + duration);

        osc.connect(gain);
        gain.connect(output);
        osc.start(t);
        osc.stop(t + duration + 0.05);
        return { osc, gain };
    }

    // -------------------------------------------------------
    //  Combat sounds
    // -------------------------------------------------------

    /**
     * Metallic clang: multiple detuned square-wave oscillators with fast decay,
     * plus a short noise burst for impact.
     */
    playMelee() {
        if (this.muted) return;
        this.ensureContext();
        const t = this.ctx.currentTime;
        const freqs = [800, 1200, 1900, 2500, 3200];

        for (const freq of freqs) {
            this.playTone(freq, 'square', 0.12, 0.08, this.masterGain, t);
        }

        // Impact noise burst
        this.playNoise(0.06, 0.15, 'highpass', 1500, this.masterGain, t);
    }

    /**
     * Swish + thunk: high-pass filtered noise sweep, then delayed low sine + noise.
     */
    playRanged() {
        if (this.muted) return;
        this.ensureContext();
        const t = this.ctx.currentTime;

        // Swish: noise with sweeping high-pass filter
        const swishSource = this.ctx.createBufferSource();
        swishSource.buffer = this.createNoiseBuffer(0.2);
        const swishFilter = this.ctx.createBiquadFilter();
        swishFilter.type = 'highpass';
        swishFilter.frequency.setValueAtTime(4000, t);
        swishFilter.frequency.exponentialRampToValueAtTime(800, t + 0.15);
        const swishGain = this.ctx.createGain();
        swishGain.gain.setValueAtTime(0.15, t);
        swishGain.gain.exponentialRampToValueAtTime(0.001, t + 0.15);
        swishSource.connect(swishFilter);
        swishFilter.connect(swishGain);
        swishGain.connect(this.masterGain);
        swishSource.start(t);
        swishSource.stop(t + 0.2);

        // Thunk after 150ms delay
        setTimeout(() => {
            const now = this.ctx.currentTime;
            this.playTone(120, 'sine', 0.15, 0.2, this.masterGain, now);
            this.playNoise(0.1, 0.12, 'lowpass', 400, this.masterGain, now);
        }, 150);
    }

    /**
     * Fiery woosh + explosion: bandpass-filtered noise sweep with volume ramp,
     * then noise burst + bass hit.
     */
    playMagic() {
        if (this.muted) return;
        this.ensureContext();
        const t = this.ctx.currentTime;

        // Woosh: bandpass-filtered noise sweeping 200 -> 3000 -> 500 Hz
        const wooshSource = this.ctx.createBufferSource();
        wooshSource.buffer = this.createNoiseBuffer(0.6);
        const wooshFilter = this.ctx.createBiquadFilter();
        wooshFilter.type = 'bandpass';
        wooshFilter.Q.value = 2;
        wooshFilter.frequency.setValueAtTime(200, t);
        wooshFilter.frequency.exponentialRampToValueAtTime(3000, t + 0.25);
        wooshFilter.frequency.exponentialRampToValueAtTime(500, t + 0.5);
        const wooshGain = this.ctx.createGain();
        wooshGain.gain.setValueAtTime(0.01, t);
        wooshGain.gain.linearRampToValueAtTime(0.2, t + 0.2);
        wooshGain.gain.linearRampToValueAtTime(0.001, t + 0.5);
        wooshSource.connect(wooshFilter);
        wooshFilter.connect(wooshGain);
        wooshGain.connect(this.masterGain);
        wooshSource.start(t);
        wooshSource.stop(t + 0.55);

        // Explosion after 200ms
        setTimeout(() => {
            const now = this.ctx.currentTime;
            this.playNoise(0.2, 0.25, 'lowpass', 800, this.masterGain, now);
            this.playTone(80, 'sine', 0.2, 0.3, this.masterGain, now);
        }, 200);
    }

    /**
     * Critical hit: same as ranged but louder with an additional high-pitched ping.
     */
    playCritical() {
        if (this.muted) return;
        this.ensureContext();
        const t = this.ctx.currentTime;

        // Swish (louder)
        const swishSource = this.ctx.createBufferSource();
        swishSource.buffer = this.createNoiseBuffer(0.2);
        const swishFilter = this.ctx.createBiquadFilter();
        swishFilter.type = 'highpass';
        swishFilter.frequency.setValueAtTime(4000, t);
        swishFilter.frequency.exponentialRampToValueAtTime(800, t + 0.15);
        const swishGain = this.ctx.createGain();
        swishGain.gain.setValueAtTime(0.25, t);
        swishGain.gain.exponentialRampToValueAtTime(0.001, t + 0.15);
        swishSource.connect(swishFilter);
        swishFilter.connect(swishGain);
        swishGain.connect(this.masterGain);
        swishSource.start(t);
        swishSource.stop(t + 0.2);

        // Thunk after 150ms (louder: 0.4 volume)
        setTimeout(() => {
            const now = this.ctx.currentTime;
            this.playTone(120, 'sine', 0.15, 0.4, this.masterGain, now);
            this.playNoise(0.1, 0.2, 'lowpass', 400, this.masterGain, now);
            // High-pitched ping
            this.playTone(1200, 'sine', 0.3, 0.15, this.masterGain, now);
        }, 150);
    }

    /**
     * Deep dull thud: 60Hz sine + low-freq noise, then a 300Hz ring.
     */
    playStun() {
        if (this.muted) return;
        this.ensureContext();
        const t = this.ctx.currentTime;

        // Deep thud
        this.playTone(60, 'sine', 0.15, 0.3, this.masterGain, t);
        this.playNoise(0.1, 0.15, 'lowpass', 200, this.masterGain, t);

        // Ringing tone
        this.playTone(300, 'sine', 0.3, 0.12, this.masterGain, t + 0.08);
    }

    /**
     * Sharp metallic thud: 400Hz square burst + high noise.
     */
    playShieldBlock() {
        if (this.muted) return;
        this.ensureContext();
        const t = this.ctx.currentTime;

        this.playTone(400, 'square', 0.08, 0.2, this.masterGain, t);
        this.playNoise(0.05, 0.18, 'highpass', 2000, this.masterGain, t);
    }

    // -------------------------------------------------------
    //  Monster sounds
    // -------------------------------------------------------

    /**
     * Dispatch monster sound by type name.
     */
    playMonsterSound(type) {
        if (this.muted) return;
        this.ensureContext();

        const handler = this._monsterSounds[type];
        if (handler) {
            handler.call(this);
        }
    }

    get _monsterSounds() {
        return {
            skeleton: this._playSkeleton,
            slime: this._playSlime,
            goblin: this._playGoblin,
            spider: this._playSpider,
            wraith: this._playWraith,
            bat: this._playBat,
            rat: this._playRat,
            zombie: this._playZombie,
            troll: this._playTroll,
            ghost: this._playGhost,
            drake: this._playDrake,
            mimic: this._playMimic,
            orc: this._playOrc,
            imp: this._playImp,
            basilisk: this._playBasilisk,
            cultist: this._playCultist,
            tinkerer: this._playTinkerer
        };
    }

    /** Ominous low chant with slow vibrato — signals arriving caster danger. */
    _playCultist() {
        const t = this.ctx.currentTime;
        // Three stacked low tones that swell in and decay — evokes a chant
        const freqs = [110, 138, 165];
        for (let i = 0; i < freqs.length; i++) {
            const osc = this.ctx.createOscillator();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(freqs[i], t);
            const gain = this.ctx.createGain();
            gain.gain.setValueAtTime(0.0001, t);
            gain.gain.exponentialRampToValueAtTime(0.10, t + 0.25);
            gain.gain.exponentialRampToValueAtTime(0.0001, t + 1.1);
            osc.connect(gain);
            gain.connect(this.masterGain);
            osc.start(t);
            osc.stop(t + 1.2);
        }
        // Dry-mouth rasp on top
        this.playNoise(0.03, 0.8, 'lowpass', 300, this.masterGain, t);
    }

    /** Rattling bones: rapid series of short noise clicks. */
    _playSkeleton() {
        const t = this.ctx.currentTime;
        for (let i = 0; i < 6; i++) {
            this.playNoise(0.02, 0.15, 'highpass', 3000, this.masterGain, t + i * 0.05);
        }
    }

    /** Squelch: low sine with frequency wobble + filtered noise. */
    _playSlime() {
        const t = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(80, t);
        // Wobble the frequency
        for (let i = 0; i < 6; i++) {
            osc.frequency.setValueAtTime(80 + (i % 2 === 0 ? 30 : -20), t + i * 0.06);
        }
        const gain = this.ctx.createGain();
        gain.gain.setValueAtTime(0.2, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.4);
        osc.connect(gain);
        gain.connect(this.masterGain);
        osc.start(t);
        osc.stop(t + 0.45);

        this.playNoise(0.3, 0.08, 'lowpass', 500, this.masterGain, t);
    }

    /** Cackle: fast oscillating tone 300-600Hz with sawtooth. */
    _playGoblin() {
        const t = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(300, t);
        // Rapid oscillation between 300 and 600
        for (let i = 0; i < 8; i++) {
            osc.frequency.setValueAtTime(i % 2 === 0 ? 600 : 300, t + i * 0.04);
        }
        const gain = this.ctx.createGain();
        gain.gain.setValueAtTime(0.1, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.35);
        osc.connect(gain);
        gain.connect(this.masterGain);
        osc.start(t);
        osc.stop(t + 0.4);
    }

    /** Chittering: very rapid high-freq clicks. */
    _playSpider() {
        const t = this.ctx.currentTime;
        for (let i = 0; i < 10; i++) {
            const freq = 800 + Math.random() * 400;
            this.playTone(freq, 'square', 0.015, 0.08, this.masterGain, t + i * 0.03);
        }
    }

    /** Ghostly wail: sine sweep with vibrato, long decay. */
    _playWraith() {
        const t = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(400, t);
        osc.frequency.exponentialRampToValueAtTime(200, t + 0.8);

        // Vibrato via LFO
        const lfo = this.ctx.createOscillator();
        lfo.type = 'sine';
        lfo.frequency.value = 6;
        const lfoGain = this.ctx.createGain();
        lfoGain.gain.value = 15;
        lfo.connect(lfoGain);
        lfoGain.connect(osc.frequency);
        lfo.start(t);
        lfo.stop(t + 0.85);

        const gain = this.ctx.createGain();
        gain.gain.setValueAtTime(0.15, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.8);
        osc.connect(gain);
        gain.connect(this.masterGain);
        osc.start(t);
        osc.stop(t + 0.85);
    }

    /** Screech: high sine sweep 2000->800Hz, short. */
    _playBat() {
        const t = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(2000, t);
        osc.frequency.exponentialRampToValueAtTime(800, t + 0.2);
        const gain = this.ctx.createGain();
        gain.gain.setValueAtTime(0.12, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.2);
        osc.connect(gain);
        gain.connect(this.masterGain);
        osc.start(t);
        osc.stop(t + 0.25);
    }

    /** Squeak: high sine with quick up-down pitch bend. */
    _playRat() {
        const t = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(1500, t);
        osc.frequency.linearRampToValueAtTime(2200, t + 0.05);
        osc.frequency.linearRampToValueAtTime(1400, t + 0.12);
        const gain = this.ctx.createGain();
        gain.gain.setValueAtTime(0.1, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.15);
        osc.connect(gain);
        gain.connect(this.masterGain);
        osc.start(t);
        osc.stop(t + 0.2);
    }

    /** Groan: low sawtooth with slow pitch descent. */
    _playZombie() {
        const t = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(100, t);
        osc.frequency.exponentialRampToValueAtTime(60, t + 0.5);
        const gain = this.ctx.createGain();
        gain.gain.setValueAtTime(0.12, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.5);
        osc.connect(gain);
        gain.connect(this.masterGain);
        osc.start(t);
        osc.stop(t + 0.55);
    }

    /** Roar: low sawtooth + noise, loud. */
    _playTroll() {
        const t = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(80, t);
        osc.frequency.exponentialRampToValueAtTime(60, t + 0.4);
        const gain = this.ctx.createGain();
        gain.gain.setValueAtTime(0.25, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.4);
        osc.connect(gain);
        gain.connect(this.masterGain);
        osc.start(t);
        osc.stop(t + 0.45);

        this.playNoise(0.35, 0.2, 'lowpass', 600, this.masterGain, t);
    }

    /** Whisper: filtered noise at very low volume, breathy. */
    _playGhost() {
        const t = this.ctx.currentTime;
        const source = this.ctx.createBufferSource();
        source.buffer = this.createNoiseBuffer(0.5);
        const filter = this.ctx.createBiquadFilter();
        filter.type = 'bandpass';
        filter.frequency.value = 1200;
        filter.Q.value = 3;
        const gain = this.ctx.createGain();
        gain.gain.setValueAtTime(0.04, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.4);
        source.connect(filter);
        filter.connect(gain);
        gain.connect(this.masterGain);
        source.start(t);
        source.stop(t + 0.45);
    }

    /** Growl: saw 120Hz + noise burst, rumbling. */
    _playDrake() {
        const t = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(120, t);
        osc.frequency.exponentialRampToValueAtTime(80, t + 0.4);
        const gain = this.ctx.createGain();
        gain.gain.setValueAtTime(0.18, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.4);
        osc.connect(gain);
        gain.connect(this.masterGain);
        osc.start(t);
        osc.stop(t + 0.45);

        this.playNoise(0.3, 0.15, 'lowpass', 500, this.masterGain, t);
    }

    /** Snap + creak: sharp noise click then descending tone. */
    _playMimic() {
        const t = this.ctx.currentTime;
        // Sharp snap
        this.playNoise(0.03, 0.25, 'highpass', 2000, this.masterGain, t);

        // Creak: descending tone
        const osc = this.ctx.createOscillator();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(400, t + 0.05);
        osc.frequency.exponentialRampToValueAtTime(200, t + 0.35);
        const gain = this.ctx.createGain();
        gain.gain.setValueAtTime(0.12, t + 0.05);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.35);
        osc.connect(gain);
        gain.connect(this.masterGain);
        osc.start(t + 0.05);
        osc.stop(t + 0.4);
    }

    /** Grunt: low square wave, short burst. */
    _playOrc() {
        const t = this.ctx.currentTime;
        this.playTone(90, 'square', 0.15, 0.18, this.masterGain, t);
    }

    /** Shriek: high triangle sweeping up. */
    _playImp() {
        const t = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(1800, t);
        osc.frequency.exponentialRampToValueAtTime(2400, t + 0.2);
        const gain = this.ctx.createGain();
        gain.gain.setValueAtTime(0.12, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.2);
        osc.connect(gain);
        gain.connect(this.masterGain);
        osc.start(t);
        osc.stop(t + 0.25);
    }

    /** Hiss: long high-freq bandpass noise with slow decay. */
    _playBasilisk() {
        const t = this.ctx.currentTime;
        const source = this.ctx.createBufferSource();
        source.buffer = this.createNoiseBuffer(0.6);
        const filter = this.ctx.createBiquadFilter();
        filter.type = 'bandpass';
        filter.frequency.value = 3000;
        filter.Q.value = 1;
        const gain = this.ctx.createGain();
        gain.gain.setValueAtTime(0.12, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.5);
        source.connect(filter);
        filter.connect(gain);
        gain.connect(this.masterGain);
        source.start(t);
        source.stop(t + 0.55);
    }

    /** Tinkerer: cheerful short jingle. */
    _playTinkerer() {
        const t = this.ctx.currentTime;
        const notes = [523, 659, 784, 1047]; // C5, E5, G5, C6
        for (let i = 0; i < notes.length; i++) {
            this.playTone(notes[i], 'triangle', 0.1, 0.08, this.masterGain, t + i * 0.08);
        }
    }

    // -------------------------------------------------------
    //  UI sounds
    // -------------------------------------------------------

    /**
     * Drinking/swallowing: 3 short low-freq tone bursts.
     */
    playPotion() {
        if (this.muted) return;
        this.ensureContext();
        const t = this.ctx.currentTime;
        const freqs = [200, 250, 300];
        for (let i = 0; i < 3; i++) {
            this.playTone(freqs[i], 'sine', 0.08, 0.15, this.masterGain, t + i * 0.1);
        }
    }

    /**
     * Snoring: two slow sine oscillations with amplitude modulation.
     */
    playRest() {
        if (this.muted) return;
        this.ensureContext();
        const t = this.ctx.currentTime;

        const osc = this.ctx.createOscillator();
        osc.type = 'sine';
        osc.frequency.value = 120;

        // Amplitude modulation at 0.5Hz for snoring rhythm
        const lfo = this.ctx.createOscillator();
        lfo.type = 'sine';
        lfo.frequency.value = 0.5;
        const lfoGain = this.ctx.createGain();
        lfoGain.gain.value = 0.08;
        lfo.connect(lfoGain);

        const gain = this.ctx.createGain();
        gain.gain.setValueAtTime(0.1, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 1.0);
        lfoGain.connect(gain.gain);

        osc.connect(gain);
        gain.connect(this.masterGain);
        osc.start(t);
        lfo.start(t);
        osc.stop(t + 1.05);
        lfo.stop(t + 1.05);
    }

    /**
     * Cloth rustling: short burst of bandpass-filtered noise.
     */
    playInventory() {
        if (this.muted) return;
        this.ensureContext();
        const t = this.ctx.currentTime;

        const source = this.ctx.createBufferSource();
        source.buffer = this.createNoiseBuffer(0.25);
        const filter = this.ctx.createBiquadFilter();
        filter.type = 'bandpass';
        filter.frequency.value = 2000;
        filter.Q.value = 0.5;
        const gain = this.ctx.createGain();
        gain.gain.setValueAtTime(0.1, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.2);
        source.connect(filter);
        filter.connect(gain);
        gain.connect(this.masterGain);
        source.start(t);
        source.stop(t + 0.25);
    }

    /**
     * Coin jingle: 3 rapid high sine tones with slight overlap.
     */
    playGold() {
        if (this.muted) return;
        this.ensureContext();
        const t = this.ctx.currentTime;
        const freqs = [2000, 2400, 2800];
        for (let i = 0; i < 3; i++) {
            this.playTone(freqs[i], 'sine', 0.1, 0.1, this.masterGain, t + i * 0.04);
        }
    }

    /**
     * Short fanfare: ascending triangle tones.
     */
    playRecruit() {
        if (this.muted) return;
        this.ensureContext();
        const t = this.ctx.currentTime;
        const freqs = [400, 500, 600, 800];
        for (let i = 0; i < freqs.length; i++) {
            this.playTone(freqs[i], 'triangle', 0.1, 0.12, this.masterGain, t + i * 0.1);
        }
    }

    /**
     * Shop bell: single high sine tone with long ring decay.
     */
    playShop() {
        if (this.muted) return;
        this.ensureContext();
        const t = this.ctx.currentTime;
        this.playTone(1500, 'sine', 0.6, 0.12, this.masterGain, t);
    }

    // -------------------------------------------------------
    //  Bard song loop sounds
    // -------------------------------------------------------

    /**
     * Start a looping ambient sound for the given out-of-combat bard song.
     * Only one loop plays at a time — calling this while another is active
     * will stop the previous one first.
     *   songId: 'haste' | 'battle' | 'healing'
     */
    playBardSongLoop(songId) {
        this.stopBardSongLoop();
        if (this.muted) return;
        this.ensureContext();

        const ctx = this.ctx;
        const master = this.masterGain;

        // Gain node so we can fade in and also stop cleanly.
        const loopGain = ctx.createGain();
        loopGain.gain.setValueAtTime(0.0, ctx.currentTime);
        loopGain.gain.linearRampToValueAtTime(0.06, ctx.currentTime + 0.4);
        loopGain.connect(master);

        const oscs = [];

        if (songId === 'haste') {
            // Fast upbeat arpeggio: triangle wave, cycling through 5 notes.
            const notes = [523, 659, 784, 988, 784, 659]; // C5 E5 G5 B5 G5 E5
            let step = 0;
            const bpm = 360; // fast
            const stepSec = 60 / bpm;
            const schedule = () => {
                if (!this._songLoopActive) return;
                const osc = ctx.createOscillator();
                osc.type = 'triangle';
                osc.frequency.value = notes[step % notes.length];
                step++;
                const g = ctx.createGain();
                g.gain.setValueAtTime(1, ctx.currentTime);
                g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + stepSec * 0.9);
                osc.connect(g);
                g.connect(loopGain);
                osc.start(ctx.currentTime);
                osc.stop(ctx.currentTime + stepSec);
                this._songOscs.push(osc);
                this._songTimer = setTimeout(schedule, stepSec * 1000 - 10);
            };
            this._songLoopActive = true;
            this._songOscs = oscs;
            this._songTimer = setTimeout(schedule, 0);

        } else if (songId === 'battle') {
            // Heroic power fifths: two triangle oscillators a fifth apart, slow pulse.
            const pairs = [[196, 294], [220, 330], [247, 370], [220, 330]]; // G3/D4 pattern
            let step = 0;
            const stepSec = 0.6;
            const schedule = () => {
                if (!this._songLoopActive) return;
                const [f1, f2] = pairs[step % pairs.length];
                step++;
                [f1, f2].forEach(freq => {
                    const osc = ctx.createOscillator();
                    osc.type = 'triangle';
                    osc.frequency.value = freq;
                    const g = ctx.createGain();
                    g.gain.setValueAtTime(1, ctx.currentTime);
                    g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + stepSec * 0.85);
                    osc.connect(g);
                    g.connect(loopGain);
                    osc.start(ctx.currentTime);
                    osc.stop(ctx.currentTime + stepSec);
                    this._songOscs.push(osc);
                });
                this._songTimer = setTimeout(schedule, stepSec * 1000 - 10);
            };
            this._songLoopActive = true;
            this._songOscs = oscs;
            this._songTimer = setTimeout(schedule, 0);

        } else if (songId === 'healing') {
            // Gentle sine lullaby: slow descending phrase.
            const notes = [523, 494, 440, 392, 440, 494]; // C5 B4 A4 G4 A4 B4
            let step = 0;
            const stepSec = 0.9;
            const schedule = () => {
                if (!this._songLoopActive) return;
                const osc = ctx.createOscillator();
                osc.type = 'sine';
                osc.frequency.value = notes[step % notes.length];
                step++;
                const g = ctx.createGain();
                g.gain.setValueAtTime(1, ctx.currentTime);
                g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + stepSec * 0.95);
                osc.connect(g);
                g.connect(loopGain);
                osc.start(ctx.currentTime);
                osc.stop(ctx.currentTime + stepSec);
                this._songOscs.push(osc);
                this._songTimer = setTimeout(schedule, stepSec * 1000 - 10);
            };
            this._songLoopActive = true;
            this._songOscs = oscs;
            this._songTimer = setTimeout(schedule, 0);
        }

        this._songLoopGain = loopGain;
    }

    /** Stop the currently-playing bard song loop (if any). */
    stopBardSongLoop() {
        this._songLoopActive = false;
        if (this._songTimer) { clearTimeout(this._songTimer); this._songTimer = null; }
        if (this._songLoopGain) {
            try {
                const g = this._songLoopGain;
                g.gain.setValueAtTime(g.gain.value, this.ctx.currentTime);
                g.gain.linearRampToValueAtTime(0.0, this.ctx.currentTime + 0.3);
            } catch (_) { /* context may be closed */ }
            this._songLoopGain = null;
        }
        if (this._songOscs) {
            for (const o of this._songOscs) {
                try { o.stop(); } catch (_) {}
            }
            this._songOscs = [];
        }
    }

    /**
     * Short dramatic AoE disruption sound for the bard's in-combat disrupt ability:
     * a descending sweep of three quick notes followed by a noise burst.
     */
    playBardDisrupt() {
        if (this.muted) return;
        this.ensureContext();
        const t = this.ctx.currentTime;
        // Descending tritone sweep
        const notes = [880, 622, 440, 311];
        for (let i = 0; i < notes.length; i++) {
            this.playTone(notes[i], 'sawtooth', 0.12, 0.1, this.masterGain, t + i * 0.08);
        }
        // Quick noise burst at the end
        const src = this.ctx.createBufferSource();
        src.buffer = this.createNoiseBuffer(0.15);
        const flt = this.ctx.createBiquadFilter();
        flt.type = 'bandpass';
        flt.frequency.value = 1200;
        const g = this.ctx.createGain();
        g.gain.setValueAtTime(0.12, t + 0.32);
        g.gain.exponentialRampToValueAtTime(0.001, t + 0.48);
        src.connect(flt);
        flt.connect(g);
        g.connect(this.masterGain);
        src.start(t + 0.32);
        src.stop(t + 0.5);
    }
}

export const soundManager = new SoundManager();
