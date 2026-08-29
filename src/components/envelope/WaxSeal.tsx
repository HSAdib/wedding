import { motion } from 'framer-motion';
import AEMonogram from '../AEMonogram';

export type SealState = 'sealed' | 'burst' | 'dissolved';

interface WaxSealProps {
  onTap: () => void;
  state: SealState;
}

export default function WaxSeal({ onTap, state }: WaxSealProps) {
  const isSealed    = state === 'sealed';
  const isBurst     = state === 'burst';
  const isDissolved = state === 'dissolved';

  return (
    <div className="relative flex items-center justify-center select-none" style={{ width: 100, height: 100 }}>
      {/* ── Interactive Idle Golden Halo Pulse (When Sealed) ── */}
      {isSealed && (
        <motion.div
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(212, 175, 55, 0.4) 0%, rgba(197, 160, 89, 0.15) 50%, transparent 75%)',
          }}
          animate={{ scale: [1, 1.35, 1], opacity: [0.65, 0.95, 0.65] }}
          transition={{ repeat: Infinity, duration: 2.4, ease: 'easeInOut' }}
        />
      )}

      {/* ── Golden Orbit Sparkle Ring ── */}
      {isSealed && (
        <motion.div
          className="absolute inset-1.5 rounded-full pointer-events-none"
          style={{ border: '1px dashed rgba(234, 215, 155, 0.45)' }}
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 16, ease: 'linear' }}
        />
      )}

      {/* ── 3D Molten Wax Seal Button ── */}
      <motion.button
        id="wax-seal-btn"
        type="button"
        aria-label="Open Wedding Invitation"
        onClick={isSealed ? onTap : undefined}
        onKeyDown={(e) => {
          if (isSealed && (e.key === 'Enter' || e.key === ' ')) {
            e.preventDefault();
            onTap();
          }
        }}
        className="relative z-10 w-20 h-20 rounded-full focus:outline-none flex items-center justify-center cursor-pointer select-none"
        style={{
          touchAction: 'manipulation',
          WebkitTapHighlightColor: 'transparent',
          filter: 'drop-shadow(0 10px 20px rgba(100, 75, 20, 0.45)) drop-shadow(0 4px 6px rgba(0, 0, 0, 0.25))',
        }}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={
          isDissolved
            ? { scale: 1.3, opacity: 0, transition: { duration: 0.4, ease: 'easeIn' } }
            : isBurst
            ? { scale: [1, 1.15, 1.25], opacity: [1, 1, 0.6], transition: { duration: 0.5 } }
            : { scale: 1, opacity: 1, transition: { duration: 0.7, delay: 0.2 } }
        }
        whileHover={isSealed ? { scale: 1.07 } : undefined}
        whileTap={isSealed ? { scale: 0.94 } : undefined}
        title="Tap to open wedding invitation"
      >
        {/* ── Organic Molten Wax SVG with Realistic Edge Ripples & Highlights ── */}
        <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
          <defs>
            {/* Outer Molten Metallic Gold Gradient */}
            <radialGradient id="wax-molten-grad" cx="38%" cy="32%" r="68%">
              <stop offset="0%" stopColor="#FFF2B8" />
              <stop offset="25%" stopColor="#E5C158" />
              <stop offset="55%" stopColor="#C59B27" />
              <stop offset="80%" stopColor="#8C6615" />
              <stop offset="100%" stopColor="#5C4008" />
            </radialGradient>

            {/* Inner Stamped Center Medallion Gradient */}
            <radialGradient id="wax-center-grad" cx="42%" cy="38%" r="60%">
              <stop offset="0%" stopColor="#DFC07A" />
              <stop offset="50%" stopColor="#B38622" />
              <stop offset="100%" stopColor="#6E4D0C" />
            </radialGradient>

            {/* Brass Bevel Filter */}
            <filter id="emboss-shadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0.8" dy="1.2" stdDeviation="0.6" floodColor="#FFEAA7" floodOpacity="0.75" />
              <feDropShadow dx="-0.8" dy="-1.2" stdDeviation="0.8" floodColor="#3A2805" floodOpacity="0.85" />
            </filter>
          </defs>

          {/* Organic Wax Outer Perimeter with Molten Drips */}
          <path
            d="M 50,4
               C 62,3 74,8 83,16
               C 92,25 97,37 96,49
               C 95,62 89,75 80,83
               C 71,91 58,96 46,95
               C 33,94 22,88 14,79
               C 6,70 3,57 5,45
               C 7,32 15,20 26,12
               C 34,7 42,4 50,4 Z"
            fill="url(#wax-molten-grad)"
          />

          {/* Outer Molten Rim Highlight */}
          <path
            d="M 28,15 C 40,8 60,8 74,17 C 86,26 91,40 89,55 C 87,70 77,84 62,89 C 47,94 30,89 20,77 C 10,65 8,48 13,34 C 16,25 21,19 28,15 Z"
            fill="none"
            stroke="rgba(255, 245, 185, 0.45)"
            strokeWidth="2"
          />

          {/* Pressed Center Medallion Base */}
          <circle cx="50" cy="50" r="32" fill="url(#wax-center-grad)" />
          <circle cx="50" cy="50" r="32" fill="none" stroke="rgba(60, 40, 5, 0.55)" strokeWidth="1.5" />
          <circle cx="50" cy="50" r="30" fill="none" stroke="rgba(255, 235, 160, 0.5)" strokeWidth="1" strokeDasharray="2 1.5" />

          {/* Fine Cardinal Accents */}
          <circle cx="50" cy="22" r="1.5" fill="#FFEAA7" />
          <circle cx="50" cy="78" r="1.5" fill="#FFEAA7" />
          <circle cx="22" cy="50" r="1.5" fill="#FFEAA7" />
          <circle cx="78" cy="50" r="1.5" fill="#FFEAA7" />

          {/* Curved Text Path: TAP TO OPEN */}
          <path id="text-path-bottom" d="M 27,65 Q 50,84 73,65" fill="none" />
          <text fontSize="5.5" fontFamily="'Cinzel', serif" letterSpacing="0.28em" fill="#FFEAA7" opacity="0.85">
            <textPath href="#text-path-bottom" startOffset="50%" textAnchor="middle">
              TAP TO OPEN
            </textPath>
          </text>
        </svg>

        {/* Stamped Brass Relief Monogram "A & E" (Bespoke Ligature) */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none pb-4"
          style={{ filter: 'url(#emboss-shadow)' }}
        >
          <AEMonogram size={40} variant="gold" embossed={false} />
        </div>
      </motion.button>
    </div>
  );
}
