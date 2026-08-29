import { motion, AnimatePresence } from 'framer-motion';
import { useAudio } from '../../context/AudioContext';

export default function FloatingAudioPlayer() {
  const { isPlaying, isMuted, togglePlay, toggleMute } = useAudio();
  const isActive = isPlaying && !isMuted;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed top-4 right-4 z-[200] flex items-center gap-2"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.2, duration: 0.6, ease: 'easeOut' }}
      >
        {/* ── Mute / Unmute button ──────────────────────────────── */}
        <motion.button
          onClick={toggleMute}
          className="rounded-full flex items-center justify-center focus:outline-none"
          style={{
            width: 36,
            height: 36,
            background: 'rgba(24, 36, 26, 0.72)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            border: '1px solid rgba(197,160,89,0.25)',
            color: 'rgba(234,215,155,0.75)',
            touchAction: 'manipulation',
            WebkitTapHighlightColor: 'transparent',
          }}
          whileHover={{ scale: 1.08, borderColor: 'rgba(197,160,89,0.55)' }}
          whileTap={{ scale: 0.92 }}
          title={isMuted ? 'Unmute' : 'Mute'}
        >
          {isMuted ? (
            /* Muted icon */
            <svg viewBox="0 0 20 20" fill="none" className="w-4 h-4" stroke="currentColor" strokeWidth="1.6">
              <path d="M11 5L6 9H2v2H6l5 4V5Z" />
              <line x1="15" y1="8" x2="18" y2="12" strokeLinecap="round" />
              <line x1="18" y1="8" x2="15" y2="12" strokeLinecap="round" />
            </svg>
          ) : (
            /* Volume icon */
            <svg viewBox="0 0 20 20" fill="none" className="w-4 h-4" stroke="currentColor" strokeWidth="1.6">
              <path d="M11 5L6 9H2v2H6l5 4V5Z" />
              <path d="M14.5 8a3.5 3.5 0 0 1 0 4" strokeLinecap="round" />
            </svg>
          )}
        </motion.button>

        {/* ── Play / Pause + animated bars ──────────────────────── */}
        <motion.button
          onClick={togglePlay}
          className="rounded-full flex items-center gap-2 px-3 focus:outline-none"
          style={{
            height: 36,
            background: 'rgba(24, 36, 26, 0.72)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            border: '1px solid rgba(197,160,89,0.25)',
            touchAction: 'manipulation',
            WebkitTapHighlightColor: 'transparent',
          }}
          whileHover={{ scale: 1.04, borderColor: 'rgba(197,160,89,0.5)' }}
          whileTap={{ scale: 0.94 }}
          title={isPlaying ? 'Pause music' : 'Play music'}
        >
          {/* Animated equaliser bars */}
          <div className="flex items-end gap-[3px]" style={{ height: 16, width: 18 }}>
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="flex-1 rounded-full"
                style={{ background: '#C5A059', minHeight: 3 }}
                animate={
                  isActive
                    ? {
                        height: ['30%', '100%', '55%', '80%', '35%'],
                        transition: {
                          repeat: Infinity,
                          duration: 1.1,
                          delay: i * 0.18,
                          ease: 'easeInOut',
                        },
                      }
                    : { height: '30%', transition: { duration: 0.3 } }
                }
              />
            ))}
          </div>

          {/* Play/Pause icon */}
          <span style={{ color: 'rgba(234,215,155,0.8)' }}>
            {isPlaying ? (
              /* Pause bars */
              <svg viewBox="0 0 14 14" fill="currentColor" className="w-3 h-3">
                <rect x="1" y="1" width="4" height="12" rx="1" />
                <rect x="9" y="1" width="4" height="12" rx="1" />
              </svg>
            ) : (
              /* Play triangle */
              <svg viewBox="0 0 14 14" fill="currentColor" className="w-3 h-3">
                <path d="M2 1l10 6-10 6V1Z" />
              </svg>
            )}
          </span>

          <span
            style={{
              fontFamily: '"Cinzel", serif',
              fontSize: 8,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: 'rgba(234,215,155,0.6)',
            }}
          >
            {isPlaying ? 'Music' : 'Play'}
          </span>
        </motion.button>
      </motion.div>
    </AnimatePresence>
  );
}
