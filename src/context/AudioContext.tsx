import React, { createContext, useCallback, useContext, useRef, useState } from 'react';

interface AudioContextValue {
  isPlaying: boolean;
  isMuted: boolean;
  startAudio: () => void;
  togglePlay: () => void;
  toggleMute: () => void;
}

const AudioCtx = createContext<AudioContextValue | null>(null);

/**
 * 🎵 Place your ambient music file at /public/music.mp3
 * Recommended: a soft oud/oriental instrumental track.
 * Free royalty-free options: freemusicarchive.org, pixabay.com/music
 */
const MUSIC_SRC = '/music.mp3';

export function AudioProvider({ children }: { children: React.ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const getAudio = useCallback((): HTMLAudioElement => {
    if (!audioRef.current) {
      const el = new Audio(MUSIC_SRC);
      el.loop = true;
      el.volume = 0.35;
      audioRef.current = el;
    }
    return audioRef.current;
  }, []);

  /** Called on first user gesture to safely bypass mobile autoplay policy */
  const startAudio = useCallback(() => {
    const a = getAudio();
    if (a.paused) {
      a.play()
        .then(() => setIsPlaying(true))
        .catch(() => {
          // Silently fail — user can tap the floating player to retry
        });
    }
  }, [getAudio]);

  const togglePlay = useCallback(() => {
    const a = getAudio();
    if (a.paused) {
      a.play().then(() => setIsPlaying(true)).catch(() => {});
    } else {
      a.pause();
      setIsPlaying(false);
    }
  }, [getAudio]);

  const toggleMute = useCallback(() => {
    const a = getAudio();
    a.muted = !a.muted;
    setIsMuted(a.muted);
  }, [getAudio]);

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
