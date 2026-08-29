import React, { createContext, useCallback, useContext, useRef, useState, useEffect } from 'react';

interface AudioContextValue {
  isPlaying: boolean;
  isMuted: boolean;
  startAudio: () => void;
  togglePlay: () => void;
  toggleMute: () => void;
}

const AudioCtx = createContext<AudioContextValue | null>(null);

/**
 * Audio sources priority:
 * 1. Local /public/music.mp3 (if provided by user)
 * 2. High-quality royalty-free acoustic background stream
 */
const PRIMARY_AUDIO_SRC = '/music.mp3';
const FALLBACK_CDN_AUDIO = 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3';

export function AudioProvider({ children }: { children: React.ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const synthIntervalRef = useRef<number | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  /**
   * Procedural Web Audio Ambient Synth Fallback:
   * Plays soft, warm pentatonic harp/acoustic chords if HTML5 audio fails.
   */
  const playProceduralAmbientChord = useCallback(() => {
    try {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioContextClass) return;
      if (!audioContextRef.current) {
        audioContextRef.current = new AudioContextClass();
      }
      const ctx = audioContextRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      // Warm acoustic pentatonic frequencies (D Major / B Minor Pentatonic)
      const chords = [
        [293.66, 369.99, 440.00, 587.33], // D - F# - A - D
        [246.94, 293.66, 369.99, 493.88], // B - D - F# - B
        [220.00, 277.18, 329.63, 440.00], // A - C# - E - A
        [196.00, 246.94, 293.66, 392.00], // G - B - D - G
      ];

      let chordIdx = 0;
      const playStep = () => {
        if (!isPlaying || isMuted) return;
        const now = ctx.currentTime;
        const chord = chords[chordIdx % chords.length];
        chordIdx++;

        chord.forEach((freq, i) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, now + i * 0.25);

          gain.gain.setValueAtTime(0.001, now + i * 0.25);
          gain.gain.exponentialRampToValueAtTime(0.04, now + i * 0.25 + 0.1);
          gain.gain.exponentialRampToValueAtTime(0.0001, now + i * 0.25 + 3.0);

          osc.connect(gain);
          gain.connect(ctx.destination);

          osc.start(now + i * 0.25);
          osc.stop(now + i * 0.25 + 3.2);
        });
      };

      playStep();
      synthIntervalRef.current = window.setInterval(playStep, 4500);
    } catch {
      // Ignore if Web Audio is unsupported
    }
  }, [isPlaying, isMuted]);

  const stopProceduralSynth = useCallback(() => {
    if (synthIntervalRef.current) {
      clearInterval(synthIntervalRef.current);
      synthIntervalRef.current = null;
    }
  }, []);

  const getAudio = useCallback((): HTMLAudioElement => {
    if (!audioRef.current) {
      const el = new Audio(PRIMARY_AUDIO_SRC);
      el.loop = true;
      el.volume = 0.35;

      // If local /music.mp3 is missing or fails, seamlessly switch to CDN
      el.addEventListener('error', () => {
        if (el.src.includes(PRIMARY_AUDIO_SRC)) {
          el.src = FALLBACK_CDN_AUDIO;
          el.load();
          el.play().then(() => setIsPlaying(true)).catch(() => {
            playProceduralAmbientChord();
          });
        }
      });

      audioRef.current = el;
    }
    return audioRef.current;
  }, [playProceduralAmbientChord]);

  /** Called on user interaction (wax seal tap) to unlock audio */
  const startAudio = useCallback(() => {
    const a = getAudio();
    if (a.paused) {
      a.play()
        .then(() => setIsPlaying(true))
        .catch(() => {
          // Attempt fallback or procedural ambient
          a.src = FALLBACK_CDN_AUDIO;
          a.load();
          a.play()
            .then(() => setIsPlaying(true))
            .catch(() => {
              setIsPlaying(true);
              playProceduralAmbientChord();
            });
        });
    }
  }, [getAudio, playProceduralAmbientChord]);

  const togglePlay = useCallback(() => {
    const a = getAudio();
    if (a.paused && !synthIntervalRef.current) {
      a.play()
        .then(() => setIsPlaying(true))
        .catch(() => {
          setIsPlaying(true);
          playProceduralAmbientChord();
        });
    } else {
      a.pause();
      stopProceduralSynth();
      setIsPlaying(false);
    }
  }, [getAudio, playProceduralAmbientChord, stopProceduralSynth]);

  const toggleMute = useCallback(() => {
    const a = getAudio();
    a.muted = !a.muted;
    setIsMuted(a.muted);
    if (a.muted) {
      stopProceduralSynth();
    } else if (isPlaying) {
      a.play().catch(() => playProceduralAmbientChord());
    }
  }, [getAudio, isPlaying, playProceduralAmbientChord, stopProceduralSynth]);

  useEffect(() => {
    return () => {
      stopProceduralSynth();
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, [stopProceduralSynth]);

  return (
    <AudioCtx.Provider value={{ isPlaying, isMuted, startAudio, togglePlay, toggleMute }}>
      {children}
    </AudioCtx.Provider>
  );
}

export function useAudio() {
  const ctx = useContext(AudioCtx);
  if (!ctx) throw new Error('useAudio must be used within AudioProvider');
  return ctx;
}
