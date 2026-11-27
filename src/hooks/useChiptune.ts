"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export interface NoteEvent {
  /** start time in seconds from beginning of track */
  at: number;
  /** duration in seconds */
  dur: number;
  /** frequencies in Hz (first is melody, optional extras are bass/harmony) */
  freqs: number[];
  /** optional per-voice gain multiplier */
  gain?: number;
}

export interface Track {
  /** shown on the player */
  name: string;
  /** composer / subtitle */
  artist?: string;
  /**
   * Optional real song. Drop an mp3 into /public/music and set e.g. file: "/music/my-song.mp3".
   * Without a file the track plays the synthesized arrangement below.
   */
  file?: string;
  wave: OscillatorType;
  events: NoteEvent[];
  duration: number;
}

const NOTE_SEMITONES: Record<string, number> = {
  C: 0,
  D: 2,
  E: 4,
  F: 5,
  G: 7,
  A: 9,
  B: 11,
};

function hz(note: string): number {
  const m = /^([A-G])([#b]?)(-?\d)$/.exec(note);
  if (!m) return 0;
  let semi = NOTE_SEMITONES[m[1]];
  if (m[2] === "#") semi += 1;
  else if (m[2] === "b") semi -= 1;
  const octave = Number(m[3]);
  const midi = (octave + 1) * 12 + semi;
  return 440 * Math.pow(2, (midi - 69) / 12);
}

/** Step tuple: [melodyNote | null, beats, ...optionalHarmonyNotes] */
type Step = [string | null, number, ...string[]];

function compileSteps(bpm: number, steps: Step[]): { events: NoteEvent[]; duration: number } {
  const secPerBeat = 60 / bpm;
  const events: NoteEvent[] = [];
  let t = 0;

  for (const [melody, beats, ...harmony] of steps) {
    const dur = beats * secPerBeat;
    const freqs: number[] = [];
    if (melody) {
      const f = hz(melody);
      if (f > 0) freqs.push(f);
    }
    for (const h of harmony) {
      const f = hz(h);
      if (f > 0) freqs.push(f);
    }
    if (freqs.length > 0) {
      events.push({ at: t, dur: Math.max(0.12, dur * 1.15), freqs });
    }
    t += dur;
  }

  return { events, duration: Math.ceil(t) };
}

// 1. Yiruma - River Flows in You (A major, 4/4)
const riverFlows = compileSteps(76, [
  // Intro phrase 1 (F#m -> D -> A -> E)
  ["A5", 0.5, "F#3"],
  ["G#5", 0.5, "C#4"],
  ["A5", 0.5, "F#4"],
  ["G#5", 0.5],
  ["A5", 0.5, "D3"],
  ["E5", 0.5, "A3"],
  ["A5", 0.5, "D4"],
  ["D5", 1.0, "F#4"],
  ["A4", 0.5, "A2", "E3"],
  ["C#5", 0.5, "A3"],
  ["D5", 0.5, "C#4"],
  ["E5", 0.5, "E2"],
  ["C#5", 0.5, "B2"],
  ["B4", 1.5, "E3", "G#3"],

  // Intro phrase 2
  ["A5", 0.5, "F#3"],
  ["G#5", 0.5, "C#4"],
  ["A5", 0.5, "F#4"],
  ["G#5", 0.5],
  ["A5", 0.5, "D3"],
  ["E5", 0.5, "A3"],
  ["A5", 0.5, "D4"],
  ["D5", 1.0, "F#4"],
  ["A4", 0.5, "A2", "E3"],
  ["C#5", 0.5, "A3"],
  ["D5", 0.5, "C#4"],
  ["E5", 0.5, "E2"],
  ["C#5", 0.5, "B2"],
  ["B4", 1.0, "E3", "G#3"],
  ["A4", 0.25],
  ["B4", 0.25],

  // Main flowing theme
  ["C#5", 0.5, "F#3", "C#4"],
  ["A4", 0.25],
  ["B4", 0.25],
  ["C#5", 0.5, "F#4"],
  ["D5", 0.25],
  ["E5", 0.25],
  ["D5", 0.5, "D3", "A3"],
  ["C#5", 0.5, "F#4"],
  ["B4", 0.5, "D4"],
  ["A4", 0.25],
  ["B4", 0.25],
  ["C#5", 0.5, "A2", "E3"],
  ["A4", 0.25],
  ["B4", 0.25],
  ["C#5", 0.5, "A3"],
  ["D5", 0.25],
  ["E5", 0.25],
  ["D5", 0.5, "E2", "B2"],
  ["C#5", 0.5, "G#3"],
  ["B4", 1.0, "E3"],

  // Iconic 16th-note cascade
  ["A5", 0.25, "F#3"],
  ["G#5", 0.25, "C#4"],
  ["A5", 0.25, "F#4"],
  ["A4", 0.25],
  ["G#5", 0.25],
  ["A5", 0.25],
  ["A4", 0.25],
  ["G#5", 0.25],
  ["A5", 0.25, "D3"],
  ["A4", 0.25, "A3"],
  ["E5", 0.25, "D4"],
  ["D5", 0.25, "F#4"],
  ["C#5", 0.25],
  ["D5", 0.25],
  ["E5", 0.25],
  ["C#5", 0.25],
  ["B4", 0.5, "A2", "E3"],
  ["A4", 0.25],
  ["C#5", 0.25],
  ["D5", 0.5, "A3"],
  ["E5", 0.5, "C#4"],
  ["C#5", 0.5, "E2", "B2"],
  ["B4", 0.5, "E3", "G#3"],
  ["A4", 1.5, "A2", "E3", "A3"],
]);

// 2. Beethoven - Für Elise (A minor, 3/8)
const furElise = compileSteps(108, [
  // A section (1st time)
  ["E5", 0.5],
  ["D#5", 0.5],
  ["E5", 0.5],
  ["D#5", 0.5],
  ["E5", 0.5],
  ["B4", 0.5],
  ["D5", 0.5],
  ["C5", 0.5],
  ["A4", 1.0, "A2", "E3"],
  ["C4", 0.5, "A3"],
  ["E4", 0.5],
  ["A4", 0.5],
  ["B4", 1.0, "E2", "E3"],
  ["E4", 0.5, "G#3"],
  ["G#4", 0.5],
  ["B4", 0.5],
  ["C5", 1.0, "A2", "E3"],
  ["E4", 0.5, "A3"],
  ["E5", 0.5],
  ["D#5", 0.5],
  ["E5", 0.5],
  ["D#5", 0.5],
  ["E5", 0.5],
  ["B4", 0.5],
  ["D5", 0.5],
  ["C5", 0.5],
  ["A4", 1.0, "A2", "E3"],
  ["C4", 0.5, "A3"],
  ["E4", 0.5],
  ["A4", 0.5],
  ["B4", 1.0, "E2", "E3"],
  ["E4", 0.5, "G#3"],
  ["C5", 0.5],
  ["B4", 0.5],
  ["A4", 1.0, "A2", "E3", "A3"],

  // B section
  ["B4", 0.5],
  ["C5", 0.5],
  ["D5", 0.5],
  ["E5", 1.5, "C3", "G3", "C4"],
  ["G4", 0.5],
  ["F5", 0.5],
  ["E5", 0.5],
  ["D5", 1.5, "G2", "G3", "B3"],
  ["F4", 0.5],
  ["E5", 0.5],
  ["D5", 0.5],
  ["C5", 1.5, "A2", "E3", "A3"],
  ["E4", 0.5],
  ["D5", 0.5],
  ["C5", 0.5],
  ["B4", 1.0, "E2", "E3", "G#3"],
  ["E4", 0.5],

  // A section (reprise)
  ["E5", 0.5],
  ["D#5", 0.5],
  ["E5", 0.5],
  ["D#5", 0.5],
  ["E5", 0.5],
  ["B4", 0.5],
  ["D5", 0.5],
  ["C5", 0.5],
  ["A4", 1.0, "A2", "E3"],
  ["C4", 0.5, "A3"],
  ["E4", 0.5],
  ["A4", 0.5],
  ["B4", 1.0, "E2", "E3"],
  ["E4", 0.5, "G#3"],
  ["C5", 0.5],
  ["B4", 0.5],
  ["A4", 2.0, "A2", "E3", "A3"],
]);

// 3. Pachelbel - Canon in D (D major, 4/4)
const canonInD = compileSteps(72, [
  // Ground bass + descending theme
  ["F#5", 2.0, "D3", "A3"],
  ["E5", 2.0, "A2", "E3"],
  ["D5", 2.0, "B2", "F#3"],
  ["C#5", 2.0, "F#2", "C#3"],
  ["B4", 2.0, "G2", "D3"],
  ["A4", 2.0, "D2", "A2"],
  ["B4", 2.0, "G2", "D3"],
  ["C#5", 2.0, "A2", "E3"],

  // Variation 1 (quarter notes)
  ["D5", 1.0, "D3", "A3"],
  ["F#5", 1.0],
  ["E5", 1.0, "A2", "E3"],
  ["C#5", 1.0],
  ["D5", 1.0, "B2", "F#3"],
  ["B4", 1.0],
  ["A4", 1.0, "F#2", "C#3"],
  ["F#4", 1.0],
  ["G4", 1.0, "G2", "D3"],
  ["B4", 1.0],
  ["A4", 1.0, "D2", "A2"],
  ["F#4", 1.0],
  ["G4", 1.0, "G2", "D3"],
  ["B4", 1.0],
  ["A4", 1.0, "A2", "E3"],
  ["C#5", 1.0],

  // Variation 2 (8th notes)
  ["D5", 0.5, "D3", "A3"],
  ["F#5", 0.5],
  ["A5", 0.5],
  ["F#5", 0.5],
  ["E5", 0.5, "A2", "E3"],
  ["C#5", 0.5],
  ["A4", 0.5],
  ["C#5", 0.5],
  ["D5", 0.5, "B2", "F#3"],
  ["B4", 0.5],
  ["F#4", 0.5],
  ["B4", 0.5],
  ["A4", 0.5, "F#2", "C#3"],
  ["F#4", 0.5],
  ["C#4", 0.5],
  ["F#4", 0.5],
  ["G4", 0.5, "G2", "D3"],
  ["B4", 0.5],
  ["D5", 0.5],
  ["B4", 0.5],
  ["A4", 0.5, "D2", "A2"],
  ["F#4", 0.5],
  ["D4", 0.5],
  ["F#4", 0.5],
  ["G4", 0.5, "G2", "D3"],
  ["B4", 0.5],
  ["D5", 0.5],
  ["G5", 0.5],
  ["E5", 0.5, "A2", "E3"],
  ["C#5", 0.5],
  ["A4", 0.5],
  ["C#5", 0.5],
  ["D5", 2.0, "D3", "A3", "F#4"],
]);

// ✏️ edit the song list here
export const TRACKS: Track[] = [
  { name: "river flows in you", artist: "yiruma", wave: "triangle", ...riverFlows },
  { name: "für elise", artist: "beethoven", wave: "triangle", ...furElise },
  { name: "canon in d", artist: "pachelbel", wave: "sine", ...canonInD },
];

type AudioCtor = typeof AudioContext;

/**
 * Music player: plays real audio files when a track has `file`,
 * otherwise a polyphonic web-audio synth arrangement. Also makes the camera shutter click.
 */
export function useChiptune() {
  const ac = useRef<AudioContext | null>(null);
  const el = useRef<HTMLAudioElement | null>(null);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);
  const nextIdx = useRef(0);
  const track = useRef(0);
  const elapsed = useRef(0);
  const lastTick = useRef(0);
  const playing = useRef(false);
  const [ui, setUi] = useState({
    playing: false,
    track: 0,
    elapsed: 0,
    duration: TRACKS[0].file ? 0 : TRACKS[0].duration,
  });

  const ensureAudio = useCallback(() => {
    try {
      if (!ac.current) {
        const w = window as unknown as { AudioContext?: AudioCtor; webkitAudioContext?: AudioCtor };
        const Ctor = w.AudioContext ?? w.webkitAudioContext;
        if (Ctor) ac.current = new Ctor();
      }
      if (ac.current && ac.current.state === "suspended") void ac.current.resume();
    } catch {
      /* audio is optional */
    }
  }, []);

  const playEvent = useCallback((ev: NoteEvent, wave: OscillatorType) => {
    const ctx = ac.current;
    if (!ctx || ev.freqs.length === 0) return;
    try {
      const t = ctx.currentTime;
      ev.freqs.forEach((freq, idx) => {
        if (!freq) return;
        const o = ctx.createOscillator();
        const g = ctx.createGain();
        o.type = idx === 0 ? wave : "sine";
        o.frequency.value = freq;
        const peak = idx === 0 ? 0.11 : 0.055;
        const end = t + Math.min(1.6, Math.max(0.18, ev.dur));
        g.gain.setValueAtTime(0.0001, t);
        g.gain.exponentialRampToValueAtTime(peak, t + 0.015);
        g.gain.exponentialRampToValueAtTime(0.0001, end);
        o.connect(g);
        g.connect(ctx.destination);
        o.start(t);
        o.stop(end + 0.03);
      });
    } catch {
      /* ignore */
    }
  }, []);

  const stopSound = () => {
    if (timer.current) clearInterval(timer.current);
    timer.current = null;
    el.current?.pause();
  };

  const goTrack = useCallback(
    (i: number, keepPlaying = false) => {
      const was = keepPlaying || playing.current;
      track.current = i;
      nextIdx.current = 0;
      elapsed.current = 0;
      playing.current = was;
      stopSound();
      if (el.current) el.current.currentTime = 0;
      setUi({ playing: was, track: i, elapsed: 0, duration: TRACKS[i].file ? 0 : TRACKS[i].duration });
      if (was) {
        ensureAudio();
        begin();
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [ensureAudio]
  );

  const begin = useCallback(() => {
    stopSound();
    const tr = TRACKS[track.current];

    if (tr.file) {
      const audio = el.current ?? (el.current = new Audio());
      if (audio.getAttribute("src") !== tr.file) audio.src = tr.file;
      audio.onloadedmetadata = () => setUi((u) => ({ ...u, duration: audio.duration || 0 }));
      audio.ontimeupdate = () => {
        elapsed.current = audio.currentTime;
        setUi((u) => ({ ...u, elapsed: audio.currentTime }));
      };
      audio.onended = () => goTrack((track.current + 1) % TRACKS.length, true);
      audio.play().catch(() => {
        playing.current = false;
        setUi((u) => ({ ...u, playing: false }));
      });
      return;
    }

    lastTick.current = performance.now();
    timer.current = setInterval(() => {
      const now = performance.now();
      const dt = Math.min(0.1, (now - lastTick.current) / 1000);
      lastTick.current = now;
      elapsed.current += dt;

      while (nextIdx.current < tr.events.length && tr.events[nextIdx.current].at <= elapsed.current) {
        playEvent(tr.events[nextIdx.current], tr.wave);
        nextIdx.current += 1;
      }

      if (elapsed.current >= tr.duration) {
        goTrack((track.current + 1) % TRACKS.length, true);
      } else {
        setUi((u) => ({ ...u, elapsed: elapsed.current }));
      }
    }, 25);
  }, [goTrack, playEvent]);

  const toggle = useCallback(() => {
    if (playing.current) {
      playing.current = false;
      stopSound();
      setUi((u) => ({ ...u, playing: false }));
    } else {
      ensureAudio();
      playing.current = true;
      setUi((u) => ({ ...u, playing: true }));
      begin();
    }
  }, [begin, ensureAudio]);

  const shutter = useCallback(() => {
    ensureAudio();
    const ctx = ac.current;
    if (!ctx) return;
    try {
      const t = ctx.currentTime;
      for (const [f, d] of [
        [1800, 0],
        [700, 0.05],
      ] as const) {
        const o = ctx.createOscillator();
        const g = ctx.createGain();
        o.type = "square";
        o.frequency.value = f;
        g.gain.setValueAtTime(0.1, t + d);
        g.gain.exponentialRampToValueAtTime(0.0001, t + d + 0.03);
        o.connect(g);
        g.connect(ctx.destination);
        o.start(t + d);
        o.stop(t + d + 0.04);
      }
    } catch {
      /* ignore */
    }
  }, [ensureAudio]);

  useEffect(
    () => () => {
      stopSound();
      void ac.current?.close();
    },
    []
  );

  return {
    ...ui,
    toggle,
    shutter,
    pick: (i: number) => goTrack(i, false),
    prev: () => goTrack((track.current + TRACKS.length - 1) % TRACKS.length, false),
    next: () => goTrack((track.current + 1) % TRACKS.length, false),
  };
}

export type Chiptune = ReturnType<typeof useChiptune>;
