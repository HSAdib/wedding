import React, { createContext, useContext, useState, useRef, useCallback } from 'react';

interface InvitationContextType {
  isOpen: boolean;
  openInvitation: () => void;
  isMuted: boolean;
  toggleMute: () => void;
  isPlaying: boolean;
  playAudio: () => void;
}

const InvitationContext = createContext<InvitationContextType | null>(null);

export function InvitationProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const openInvitation = useCallback(() => {
    setIsOpen(true);
  }, []);

  const toggleMute = useCallback(() => {
    setIsMuted(prev => {
      if (audioRef.current) {
        audioRef.current.muted = !prev;
      }
      return !prev;
    });
  }, []);

  const playAudio = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  }, []);

  return (
    <InvitationContext.Provider value={{ isOpen, openInvitation, isMuted, toggleMute, isPlaying, playAudio }}>
      {children}
    </InvitationContext.Provider>
  );
}

export function useInvitation() {
  const ctx = useContext(InvitationContext);
  if (!ctx) throw new Error('useInvitation must be used within InvitationProvider');
  return ctx;
}
