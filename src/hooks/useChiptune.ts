"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export interface Track {
  /** shown on the player */
  name: string;
  /**
   * Optional real song. Drop an mp3 into /public/music and set e.g. file: "/music/my-song.mp3".
   * Without a file the track plays the little generated chiptune below instead.
   */
  file?: string;
  /** chiptune only: ms per note, waveform and the note frequencies (0 = rest) */
  ms: number;
  wave: OscillatorType;
  notes: number[];
}

// ✏️ edit the song list here
export const TRACKS: Track[] = [
  { name: "[SONG 01]", ms: 190, wave: "triangle", notes: [523.25, 659.25, 783.99, 659.25, 587.33, 698.46, 880, 698.46, 493.88, 587.33, 783.99, 587.33, 523.25, 659.25, 1046.5, 783.99] },
  { name: "[SONG 02]", ms: 240, wave: "sine", notes: [440, 523.25, 659.25, 523.25, 392, 493.88, 587.33, 493.88, 349.23, 440, 523.25, 440, 329.63, 415.3, 493.88, 659.25] },
  { name: "[SONG 03]", ms: 150, wave: "square", notes: [659.25, 0, 659.25, 783.99, 0, 880, 783.99, 0, 659.25, 587.33, 523.25, 0, 587.33, 659.25, 0, 0] },
];

/** length of the generated chiptune tracks, in seconds */
const CHIPTUNE_SECONDS = 90;

type AudioCtor = typeof AudioContext;

/**
 * Music player: plays real audio files when a track has `file`,
 * otherwise a tiny web-audio chiptune. Also makes the camera shutter click.
 */
export function useChiptune() {
  const ac = useRef<AudioContext | null>(null);
  const el = useRef<HTMLAudioElement | null>(null);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);
  const step = useRef(0);
  const track = useRef(0);
  const elapsed = useRef(0);
  const playing = useRef(false);
  const [ui, setUi] = useState({ playing: false, track: 0, elapsed: 0, duration: TRACKS[0].file ? 0 : CHIPTUNE_SECONDS });

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

  const stopSound = () => {
    if (timer.current) clearInterval(timer.current);
    timer.current = null;
    el.current?.pause();
  };

  const goTrack = useCallback(
    (i: number, keepPlaying = false) => {
      const was = keepPlaying || playing.current;
      track.current = i;
      step.current = 0;
      elapsed.current = 0;
      playing.current = was;
      stopSound();
      if (el.current) el.current.currentTime = 0;
      setUi({ playing: was, track: i, elapsed: 0, duration: TRACKS[i].file ? 0 : CHIPTUNE_SECONDS });
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
      // real audio file
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

    // generated chiptune
    timer.current = setInterval(() => {
      blip(tr.notes[step.current % tr.notes.length]);
      step.current += 1;
      elapsed.current += tr.ms / 1000;
      if (elapsed.current >= CHIPTUNE_SECONDS) {
        goTrack((track.current + 1) % TRACKS.length, true);
      } else {
        setUi((u) => ({ ...u, elapsed: elapsed.current }));
      }
    }, tr.ms);
  }, [blip, goTrack]);

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
