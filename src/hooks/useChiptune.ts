"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export interface Track {
  name: string;
  ms: number;
  wave: OscillatorType;
  notes: number[];
}

export const TRACKS: Track[] = [
  { name: "[SONG 01]", ms: 190, wave: "triangle", notes: [523.25, 659.25, 783.99, 659.25, 587.33, 698.46, 880, 698.46, 493.88, 587.33, 783.99, 587.33, 523.25, 659.25, 1046.5, 783.99] },
  { name: "[SONG 02]", ms: 240, wave: "sine", notes: [440, 523.25, 659.25, 523.25, 392, 493.88, 587.33, 493.88, 349.23, 440, 523.25, 440, 329.63, 415.3, 493.88, 659.25] },
  { name: "[SONG 03]", ms: 150, wave: "square", notes: [659.25, 0, 659.25, 783.99, 0, 880, 783.99, 0, 659.25, 587.33, 523.25, 0, 587.33, 659.25, 0, 0] },
];

export const TRACK_SECONDS = 90;

type AudioCtor = typeof AudioContext;

/** tiny web-audio chiptune player (3 generated tracks) plus the camera shutter click */
export function useChiptune() {
  const ac = useRef<AudioContext | null>(null);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);
  const step = useRef(0);
  const track = useRef(0);
  const elapsed = useRef(0);
  const playing = useRef(false);
  const [ui, setUi] = useState({ playing: false, track: 0, elapsed: 0 });

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

  const blip = useCallback((freq: number) => {
    const ctx = ac.current;
    if (!freq || !ctx) return;
    try {
      const t = ctx.currentTime;
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.type = TRACKS[track.current].wave;
      o.frequency.value = freq;
      g.gain.setValueAtTime(0.0001, t);
      g.gain.exponentialRampToValueAtTime(0.12, t + 0.015);
      g.gain.exponentialRampToValueAtTime(0.0001, t + 0.4);
      o.connect(g);
      g.connect(ctx.destination);
      o.start(t);
      o.stop(t + 0.45);
    } catch {
      /* ignore */
    }
  }, []);

  const stopTimer = () => {
    if (timer.current) clearInterval(timer.current);
    timer.current = null;
  };

  const goTrack = useCallback(
    (i: number, keepPlaying = false) => {
      const was = keepPlaying || playing.current;
      track.current = i;
      step.current = 0;
      elapsed.current = 0;
      playing.current = was;
      stopTimer();
      setUi({ playing: was, track: i, elapsed: 0 });
      if (was) {
        ensureAudio();
        begin();
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [ensureAudio]
  );

  const begin = useCallback(() => {
    stopTimer();
    const tr = TRACKS[track.current];
    timer.current = setInterval(() => {
      blip(tr.notes[step.current % tr.notes.length]);
      step.current += 1;
      elapsed.current += tr.ms / 1000;
      if (elapsed.current >= TRACK_SECONDS) {
        goTrack((track.current + 1) % TRACKS.length, true);
      } else {
        setUi((u) => ({ ...u, elapsed: elapsed.current }));
      }
    }, tr.ms);
  }, [blip, goTrack]);

  const toggle = useCallback(() => {
    if (playing.current) {
      playing.current = false;
      stopTimer();
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
      for (const [f, d] of [[1800, 0], [700, 0.05]] as const) {
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
      stopTimer();
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
