import { motion } from 'framer-motion';

export type SealStage = 'sealed' | 'cracking' | 'opening' | 'lifting' | 'exiting';

interface WaxSealProps {
  onTap: () => void;
  stage: SealStage;
}

export default function WaxSeal({ onTap, stage }: WaxSealProps) {
  const isSealed   = stage === 'sealed';
  const isCracking = stage === 'cracking';
  const isGone     = stage === 'opening' || stage === 'lifting' || stage === 'exiting';

  return (
    <div className="relative flex items-center justify-center" style={{ width: 88, height: 88 }}>

      {/* ── Outer ambient pulse ring (only while sealed) ── */}
      {isSealed && (
        <motion.div
          className="absolute rounded-full"
          style={{
            width: 88, height: 88,
            background: 'radial-gradient(circle, rgba(197,160,89,0.35) 0%, transparent 70%)',
          }}
          animate={{ scale: [1, 1.55, 1], opacity: [0.7, 0, 0.7] }}
          transition={{ repeat: Infinity, duration: 2.6, ease: 'easeInOut' }}
        />
      )}

      {/* ── Decorative outer ring ── */}
      <motion.div
        className="absolute rounded-full"
        style={{ width: 80, height: 80, border: '1px solid rgba(197,160,89,0.5)' }}
        animate={
          isCracking ? { scale: [1, 2.2, 0], opacity: [1, 0.4, 0], transition: { duration: 0.55 } }
          : isGone   ? { scale: 0, opacity: 0, transition: { duration: 0.15 } }
          : { scale: 1, opacity: 1 }
        }
      />

      {/* ── Second decorative ring ── */}
      <motion.div
        className="absolute rounded-full"
        style={{ width: 70, height: 70, border: '0.5px solid rgba(197,160,89,0.3)' }}
        animate={
          isCracking ? { scale: [1, 1.8, 0], opacity: [0.8, 0.3, 0], transition: { duration: 0.5, delay: 0.05 } }
          : isGone   ? { scale: 0, opacity: 0, transition: { duration: 0.15 } }
          : { scale: 1, opacity: 0.8 }
        }
      />

      {/* ── Main Wax Seal disc ── */}
      <motion.button
        onClick={isSealed ? onTap : undefined}
        className="relative rounded-full focus:outline-none select-none"
        style={{
          width: 64,
          height: 64,
          background: [
            'radial-gradient(circle at 38% 32%,',
            '  #F0E0A8 0%,',
            '  #C5A059 38%,',
            '  #9A7B38 68%,',
            '  #6B4F20 100%)',
          ].join(''),
          boxShadow: [
            '0 5px 28px rgba(197,160,89,0.6)',
            'inset 0 -3px 10px rgba(0,0,0,0.28)',
            'inset 0 2px 6px rgba(255,255,255,0.22)',
          ].join(', '),
          cursor: isSealed ? 'pointer' : 'default',
          touchAction: 'manipulation',
          WebkitTapHighlightColor: 'transparent',
        }}
        animate={
          isCracking
            ? {
                scale:   [1, 1.28, 0.85, 1.45, 0],
                rotate:  [0, -10,   8,  -5,   0],
                opacity: [1,  1,    1,  0.7,   0],
                transition: { duration: 0.58 },
              }
            : isGone
            ? { scale: 0, opacity: 0, transition: { duration: 0.15 } }
            : { scale: 1, opacity: 1 }
        }
        whileHover={isSealed ? { scale: 1.07, transition: { type: 'spring', stiffness: 380 } } : undefined}
        whileTap={isSealed ? { scale: 0.92 } : undefined}
      >
        {/* Embossed inner rings */}
        <div
          className="absolute rounded-full pointer-events-none"
          style={{ inset: 5, border: '1px solid rgba(255,255,255,0.28)' }}
        />
        <div
          className="absolute rounded-full pointer-events-none"
          style={{ inset: 10, border: '0.5px solid rgba(255,255,255,0.15)', borderStyle: 'dashed' }}
        />

        {/* ── Monogram "A & E" ── */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none select-none">
          <span
            style={{
              fontFamily: '"Great Vibes", cursive',
              fontSize: 16,
              lineHeight: 1,
              color: 'rgba(255,255,255,0.93)',
              textShadow: '0 1px 3px rgba(0,0,0,0.4)',
              letterSpacing: '0.01em',
            }}
          >
            A&E
          </span>
          <span
            style={{
              fontFamily: '"Cinzel", serif',
              fontSize: 5,
              letterSpacing: '0.22em',
              color: 'rgba(255,255,255,0.62)',
              textTransform: 'uppercase',
              marginTop: 4,
            }}
          >
            TAP TO OPEN
          </span>
        </div>
      </motion.button>
    </div>
  );
}
