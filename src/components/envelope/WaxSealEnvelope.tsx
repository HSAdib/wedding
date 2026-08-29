import { useCallback, useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { useAudio } from '../../context/AudioContext';
import WaxSeal, { type SealStage } from './WaxSeal';
import BotanicalFrame from '../BotanicalFrame';
import FloralDivider from '../FloralDivider';

// ── Animation stage machine ─────────────────────────────────────────────────
type Stage = SealStage; // 'sealed' | 'cracking' | 'opening' | 'lifting' | 'exiting'

interface Props {
  onComplete: () => void;
}

// ── Helpers ─────────────────────────────────────────────────────────────────
const wait = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));

function fireGoldConfetti() {
  const opts = {
    colors: ['#C5A059', '#EAD79B', '#9A7B38', '#3F5844', '#6B8E70', '#FDFBF7'],
    gravity: 1.15,
    scalar: 1.1,
  };
  // Central burst
  confetti({ particleCount: 90, angle: 90, spread: 85, origin: { x: 0.5, y: 0.58 }, ...opts });
  // Flanking bursts with short delay
  setTimeout(() => {
    confetti({ particleCount: 45, angle: 115, spread: 50, origin: { x: 0.3, y: 0.58 }, ...opts });
    confetti({ particleCount: 45, angle:  65, spread: 50, origin: { x: 0.7, y: 0.58 }, ...opts });
  }, 80);
}

// ── Component ────────────────────────────────────────────────────────────────
export default function WaxSealEnvelope({ onComplete }: Props) {
  const [stage, setStage] = useState<Stage>('sealed');
  const { startAudio } = useAudio();

  const handleSealTap = useCallback(async () => {
    if (stage !== 'sealed') return;

    // Step 1 — Crack seal, fire confetti, unlock audio
    setStage('cracking');
    fireGoldConfetti();
    startAudio();

    // Step 2 — Begin flap rotation
    await wait(460);
    setStage('opening');

    // Step 3 — Card rises once flap is open
    await wait(860);
    setStage('lifting');

    // Step 4 — Scene fades out
    await wait(920);
    setStage('exiting');

    // Step 5 — Hand off to main content
    await wait(750);
    onComplete();
  }, [stage, startAudio, onComplete]);

  const isFlapping = stage === 'opening' || stage === 'lifting' || stage === 'exiting';
  const isLifting  = stage === 'lifting'  || stage === 'exiting';
  const isExiting  = stage === 'exiting';

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden select-none"
      style={{ background: '#16211A' }}
      animate={isExiting ? { opacity: 0, scale: 1.04 } : { opacity: 1, scale: 1 }}
      transition={isExiting
        ? { duration: 0.75, ease: [0.4, 0, 0.2, 1] }
        : { duration: 0.6 }
      }
    >
      {/* ── Botanical corner overlays ─────────────────────────────────────── */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <BotanicalFrame opacity={1} />
      </div>

      {/* ── Ambient center glow ──────────────────────────────────────────── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 55% 45% at 50% 55%, rgba(197,160,89,0.08) 0%, transparent 70%)',
        }}
      />

      {/* ── Content column ───────────────────────────────────────────────── */}
      <div className="relative flex flex-col items-center gap-7 px-4 w-full max-w-sm">

        {/* Bismillah */}
        <motion.p
          style={{
            fontFamily: '"Amiri", serif',
            fontSize: 22,
            color: '#EAD79B',
            opacity: 0,
            direction: 'rtl',
            letterSpacing: '0.04em',
          }}
          animate={{ opacity: 0.6, y: 0 }}
          initial={{ opacity: 0, y: -10 }}
          transition={{ delay: 0.35, duration: 0.9 }}
        >
          بِسْمِ ٱللَّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
        </motion.p>

        {/* ── Envelope + Card scene ─────────────────────────────────────── */}
        {/*
          Layout (z-layers):
            z-10  inner card (hidden until flap opens)
            z-1   envelope layers (back, side flaps, bottom flap)
            z-8   inside envelope top area (revealed when flap opens)
            z-15  top flap (3-D animated, hides inner area when sealed)
            z-30  wax seal (always on top)
        */}
        <motion.div
          className="relative w-full"
          style={{ height: 260, perspective: '1200px' }}
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.9, ease: 'easeOut' }}
        >
          {/* ── Rising Inner Card ─────────────────────────────────────────
              Starts tucked inside (opacity 0). Rises as lifting stage begins.
          ─────────────────────────────────────────────────────────────── */}
          <motion.div
            className="absolute rounded-2xl overflow-hidden"
            style={{
              top: 30,
              left: 28,
              right: 28,
              height: 162,
              zIndex: 10,
              background: '#FDFBF7',
              boxShadow: '0 -10px 40px -8px rgba(0,0,0,0.35)',
            }}
            animate={
              isExiting
                ? { y: -170, opacity: 0, transition: { duration: 0.45, ease: 'easeIn' } }
                : isLifting
                ? { y: -138, opacity: 1, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } }
                : { y: 0, opacity: 0 }
            }
          >
            {/* Card content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-1.5 p-4">
              {/* Top botanical accent */}
              <svg viewBox="0 0 120 18" className="w-24 opacity-25 mb-0.5">
                <path d="M0,9 Q30,2 60,9 Q90,16 120,9" stroke="#3F5844" strokeWidth="0.8" fill="none" />
                <circle cx="60" cy="9" r="2" fill="#C5A059" opacity="0.8" />
                <circle cx="28" cy="6" r="1.2" fill="#3F5844" opacity="0.6" />
                <circle cx="92" cy="12" r="1.2" fill="#3F5844" opacity="0.6" />
              </svg>

              <p
                style={{
                  fontFamily: '"Amiri", serif',
                  fontSize: 11,
                  color: '#3F5844',
                  opacity: 0.65,
                  direction: 'rtl',
                }}
              >
                بِسْمِ ٱللَّٰهِ
              </p>

              <div style={{ height: 1, width: 56, background: 'linear-gradient(90deg,transparent,#C5A059,transparent)', margin: '2px 0' }} />

              <p style={{ fontFamily: '"Great Vibes", cursive', fontSize: 30, color: '#243327', lineHeight: 1 }}>
                Adib &amp; Esha
              </p>

              <div style={{ height: 1, width: 56, background: 'linear-gradient(90deg,transparent,#C5A059,transparent)', margin: '2px 0' }} />

              <p style={{ fontFamily: '"Cinzel", serif', fontSize: 8, letterSpacing: '0.28em', color: '#C5A059', textTransform: 'uppercase' }}>
                September 04, 2026
              </p>
              <p style={{ fontFamily: '"Plus Jakarta Sans", sans-serif', fontSize: 9, color: '#4A5568', opacity: 0.5 }}>
                Crystal Palace · Sylhet
              </p>

              {/* Bottom botanical accent */}
              <svg viewBox="0 0 120 18" className="w-24 opacity-25 mt-0.5" style={{ transform: 'scaleY(-1)' }}>
                <path d="M0,9 Q30,2 60,9 Q90,16 120,9" stroke="#3F5844" strokeWidth="0.8" fill="none" />
                <circle cx="60" cy="9" r="2" fill="#C5A059" opacity="0.8" />
              </svg>
            </div>

            {/* Corner botanical motifs on card */}
            {['0 0', '0 auto auto 0', 'auto 0 0 auto', 'auto auto 0 0'].map((inset, i) => (
              <div
                key={i}
                className="absolute w-8 h-8 opacity-15 pointer-events-none"
                style={{
                  inset: inset.replace(/\b0\b/g, '0').replace(/\bauto\b/g, 'auto'),
                  transform: `rotate(${i * 90}deg)`,
                }}
              >
                <svg viewBox="0 0 32 32" className="w-full h-full">
                  <path d="M0,0 Q16,24 8,32 Q-8,20 0,0Z" fill="#3F5844" opacity="0.5" />
                  <circle cx="10" cy="10" r="1.2" fill="#C5A059" opacity="0.7" />
                </svg>
              </div>
            ))}
          </motion.div>

          {/* ── Envelope Body ─────────────────────────────────────────────
              All envelope layers are positioned absolute inside this container.
              The container itself doesn't clip (overflow: visible) so the card
              can rise above it.
          ─────────────────────────────────────────────────────────────── */}
          <div className="absolute inset-x-0 bottom-0" style={{ height: 224 }}>

            {/* Layer 1 — Envelope back (cream paper base) */}
            <div
              className="absolute inset-0 rounded-2xl"
              style={{
                background: 'linear-gradient(155deg, #F3EED9 0%, #ECE7D2 100%)',
                boxShadow: [
                  '0 32px 64px -10px rgba(0,0,0,0.58)',
                  '0 8px 20px -6px rgba(0,0,0,0.32)',
                  'inset 0 1px 0 rgba(255,255,255,0.18)',
                ].join(', '),
                zIndex: 1,
              }}
            />

            {/* Layer 2a — Left side flap */}
            <div
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(to right, #D2CDB8 0%, #DDD9C6 55%, transparent 100%)',
                clipPath: 'polygon(0 0, 0 100%, 54% 50%)',
                zIndex: 2,
                borderRadius: '16px 0 0 16px',
              }}
            />

            {/* Layer 2b — Right side flap */}
            <div
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(to left, #D2CDB8 0%, #DDD9C6 55%, transparent 100%)',
                clipPath: 'polygon(100% 0, 46% 50%, 100% 100%)',
                zIndex: 2,
                borderRadius: '0 16px 16px 0',
              }}
            />

            {/* Layer 3 — Bottom flap */}
            <div
              className="absolute inset-0 rounded-b-2xl"
              style={{
                background: 'linear-gradient(to bottom, #D8D3BF 0%, #C8C4B0 100%)',
                clipPath: 'polygon(0 100%, 50% 35%, 100% 100%)',
                zIndex: 3,
              }}
            />

            {/* Layer 6 — Inside of envelope (visible through open flap) */}
            <div
              className="absolute top-0 inset-x-0 rounded-t-2xl overflow-hidden"
              style={{
                height: '56%',
                background: 'linear-gradient(180deg, #F8F4E6 0%, #EEE9D5 100%)',
                zIndex: 8,
              }}
            >
              {/* Inner lining subtle pattern */}
              <div className="absolute inset-0 opacity-30"
                style={{
                  backgroundImage: `repeating-linear-gradient(45deg, rgba(197,160,89,0.06) 0px, rgba(197,160,89,0.06) 1px, transparent 1px, transparent 8px)`,
                }}
              />
            </div>

            {/* Layer 4 — Gold border frame on envelope */}
            <div
              className="absolute inset-0 rounded-2xl pointer-events-none"
              style={{ border: '1px solid rgba(197,160,89,0.35)', zIndex: 9 }}
            />
            <div
              className="absolute rounded-xl pointer-events-none"
              style={{ inset: 6, border: '0.5px solid rgba(197,160,89,0.15)', zIndex: 9 }}
            />

            {/* ── Layer 5 — Top Flap (3-D animated) ─────────────────────
                Triangle flap covers the top 54% of the envelope when sealed.
                Rotates backward on X-axis when opened.
            ──────────────────────────────────────────────────────────── */}
            <motion.div
              className="absolute top-0 inset-x-0 rounded-t-2xl"
              style={{
                height: '54%',
                clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
                transformOrigin: 'top center',
                transformStyle: 'preserve-3d',
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden',
                zIndex: isFlapping ? 4 : 15,
                background: 'linear-gradient(175deg, #EAE5CF 0%, #DEDAD0 50%, #D4D0BE 100%)',
              }}
              animate={
                isFlapping
                  ? { rotateX: -180, transition: { duration: 0.82, ease: [0.4, 0, 0.2, 1] } }
                  : { rotateX: 0, transition: { duration: 0.4 } }
              }
            >
              {/* Fold shadow edge at flap tip */}
              <div
                className="absolute inset-x-0 bottom-0 pointer-events-none"
                style={{
                  height: 40,
                  background: 'linear-gradient(to bottom, transparent, rgba(0,0,0,0.07))',
                  clipPath: 'inherit',
                }}
              />
              {/* Subtle inner sheen */}
              <div
                className="absolute top-0 inset-x-0"
                style={{
                  height: 30,
                  background: 'linear-gradient(to bottom, rgba(255,255,255,0.18), transparent)',
                  clipPath: 'inherit',
                  pointerEvents: 'none',
                }}
              />
            </motion.div>

            {/* ── Layer 7 — Wax Seal ─────────────────────────────────────
                Positioned at the fold junction (~50% down from envelope top).
                z-30 keeps it always on top.
            ──────────────────────────────────────────────────────────── */}
            <div
              className="absolute left-1/2 -translate-x-1/2"
              style={{ top: '43%', zIndex: 30, transform: 'translateX(-50%)' }}
            >
              <WaxSeal onTap={handleSealTap} stage={stage} />
            </div>

          </div>{/* /envelope body */}
        </motion.div>{/* /scene container */}

        {/* ── "YOU ARE INVITED" label ───────────────────────────────────── */}
        <motion.div
          className="flex flex-col items-center gap-2.5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.95, duration: 0.8 }}
        >
          <FloralDivider color="gold" className="!max-w-[180px]" />
          <p
            style={{
              fontFamily: '"Cinzel", serif',
              fontSize: 11,
              letterSpacing: '0.32em',
              textTransform: 'uppercase',
              color: 'rgba(239,236,224,0.55)',
            }}
          >
            You Are Invited
          </p>
        </motion.div>

      </div>{/* /content column */}
    </motion.div>
  );
}
