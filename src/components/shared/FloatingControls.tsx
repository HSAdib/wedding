import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Share2, ArrowUp, Volume2, VolumeX, Check } from 'lucide-react';
import { useAudio } from '../../context/AudioContext';

export default function FloatingControls() {
  const { isPlaying, isMuted, togglePlay, toggleMute } = useAudio();
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [shared, setShared] = useState(false);

  const isActive = isPlaying && !isMuted;

  // Track scroll position for Scroll-to-Top visibility
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleShare = useCallback(async () => {
    const url = window.location.href;
    const shareData = {
      title: 'Adib & Esha — Wedding Invitation',
      text: 'You are cordially invited to the wedding celebration of Adib & Esha on September 04, 2026.',
      url,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
        setShared(true);
        setTimeout(() => setShared(false), 2500);
        return;
      } catch {
        // User cancelled or fallback to copy
      }
    }

    try {
      await navigator.clipboard.writeText(url);
      setShared(true);
      setTimeout(() => setShared(false), 2500);
    } catch {
      const el = document.createElement('textarea');
      el.value = url;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
      setShared(true);
      setTimeout(() => setShared(false), 2500);
    }
  }, []);

  return (
    <>
      {/* ── Top-Right: Music Controller & Share Button ── */}
      <motion.div
        className="fixed top-4 right-4 z-50 flex items-center gap-2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.5 }}
      >
        {/* Share / Copy Link Pill */}
        <motion.button
          onClick={handleShare}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-full backdrop-blur-md bg-white/85 border border-gold/40 shadow-lg text-botanical-dark font-cinzel text-[10px] tracking-widest uppercase hover:bg-white hover:border-gold transition-all select-none"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          title="Share Invitation"
        >
          {shared ? (
            <>
              <Check className="w-3.5 h-3.5 text-botanical font-bold" />
              <span className="text-botanical font-bold">Copied!</span>
            </>
          ) : (
            <>
              <Share2 className="w-3.5 h-3.5 text-gold-dark" />
              <span className="hidden sm:inline">Share</span>
            </>
          )}
        </motion.button>

        {/* Music Player Glass Container */}
        <div className="relative">
          <motion.button
            onClick={togglePlay}
            className="flex items-center gap-2 px-3 py-2 rounded-full backdrop-blur-md bg-white/85 border border-gold/40 shadow-lg text-botanical-dark hover:bg-white hover:border-gold transition-all select-none"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            title={isPlaying ? 'Pause Music' : 'Play Music'}
          >
            {/* Animated Equalizer Bars (4 vertical lines) */}
            <div className="flex items-end gap-[2.5px] h-3.5 w-3.5">
              {[0, 1, 2, 3].map((i) => (
                <motion.div
                  key={i}
                  className="flex-1 rounded-full bg-gold"
                  style={{ minHeight: 3 }}
                  animate={
                    isActive
                      ? {
                          height: ['20%', '100%', '40%', '85%', '30%'],
                          transition: {
                            repeat: Infinity,
                            duration: 0.9 + i * 0.15,
                            delay: i * 0.1,
                            ease: 'easeInOut',
                          },
                        }
                      : { height: '30%', transition: { duration: 0.25 } }
                  }
                />
              ))}
            </div>

            <span className="font-cinzel text-[10px] tracking-widest uppercase text-botanical-dark font-medium hidden sm:inline">
              {isPlaying ? 'Music On' : 'Music Off'}
            </span>
          </motion.button>

          {/* Mute Toggle Small Secondary Button */}
          {isPlaying && (
            <motion.button
              onClick={(e) => {
                e.stopPropagation();
                toggleMute();
              }}
              className="absolute -bottom-7 right-0 p-1.5 rounded-full backdrop-blur-md bg-white/80 border border-gold/30 shadow text-charcoal-light hover:text-botanical transition-colors"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
            >
              {isMuted ? (
                <VolumeX className="w-3 h-3 text-red-500" />
              ) : (
                <Volume2 className="w-3 h-3 text-gold" />
              )}
            </motion.button>
          )}
        </div>
      </motion.div>

      {/* ── Toast Notification for Share / Copy ── */}
      <AnimatePresence>
        {shared && (
          <motion.div
            className="fixed top-16 right-4 z-50 bg-botanical-dark text-cream-50 text-xs font-sans px-4 py-2 rounded-full shadow-2xl border border-gold/40 flex items-center gap-2 pointer-events-none"
            initial={{ opacity: 0, y: -10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.9 }}
            transition={{ duration: 0.2 }}
          >
            <Check className="w-3.5 h-3.5 text-gold-light" />
            <span>Invitation link copied to clipboard!</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Bottom-Right: Scroll to Top Button ── */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 z-50 p-3 rounded-full backdrop-blur-md bg-white/85 border border-gold/40 shadow-xl text-botanical-dark hover:bg-white hover:border-gold hover:text-gold transition-all group"
            initial={{ opacity: 0, scale: 0.7, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.7, y: 20 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            title="Scroll to Top"
          >
            <ArrowUp className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}
