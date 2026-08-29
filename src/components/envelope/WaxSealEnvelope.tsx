import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { useAudio } from '../../context/AudioContext';
import { type SealState } from './WaxSeal';
import EnvelopeBody from './EnvelopeBody';
import BotanicalFrame from '../BotanicalFrame';

interface WaxSealEnvelopeProps {
  onComplete: () => void;
}

const wait = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

export default function WaxSealEnvelope({ onComplete }: WaxSealEnvelopeProps) {
  const [sealState, setSealState] = useState<SealState>('sealed');
  const [isFlapping, setIsFlapping] = useState(false);
  const [isLifting, setIsLifting] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const { startAudio } = useAudio();

  // ── Tap-to-Open Choreography ──────────────────────────────────────────────
  const handleSealTap = useCallback(async () => {
    if (sealState !== 'sealed') return;

    // Step 1: Start background audio immediately on user gesture
    startAudio();

    // Step 2: Seal bursts with golden light flare & micro-confetti sparkles
    setSealState('burst');

    const confettiOpts = {
      colors: ['#C5A059', '#DFC07A', '#FFF2B8', '#3F5844', '#6B8E70', '#FFFFFF'],
      scalar: 1.15,
      ticks: 180,
    };
    confetti({ particleCount: 80, spread: 80, origin: { y: 0.52 }, ...confettiOpts });
    setTimeout(() => {
      confetti({ particleCount: 45, angle: 60, spread: 55, origin: { x: 0.25, y: 0.52 }, ...confettiOpts });
      confetti({ particleCount: 45, angle: 120, spread: 55, origin: { x: 0.75, y: 0.52 }, ...confettiOpts });
    }, 100);

    // Step 3: Seal dissolves and 3D top flap unfolds
    await wait(420);
    setSealState('dissolved');
    setIsFlapping(true);

    // Step 4: Inner card glides upward out of the forest green pocket (takes ~950ms)
    await wait(720);
    setIsLifting(true);

    // Step 5: Hold card on screen for 0.7 seconds after slide-up finishes
    await wait(950 + 700);
    setIsExiting(true);

    await wait(650);
    onComplete();
  }, [sealState, startAudio, onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center min-h-[100dvh] px-4 py-8 overflow-hidden select-none"
      style={{
        background: 'radial-gradient(ellipse at 50% 45%, #243327 0%, #18241A 65%, #0F1711 100%)',
        touchAction: 'manipulation',
      }}
      initial={{ opacity: 1 }}
      animate={isExiting ? { opacity: 0, scale: 1.05 } : { opacity: 1, scale: 1 }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* ── Soft Ambient Vignette & Botanical Framing ── */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <BotanicalFrame opacity={1} />
      </div>

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(197, 160, 89, 0.08) 0%, transparent 65%)',
        }}
      />

      {/* ── Centered Royal Stage (Mobile-First max-w-[420px]) ── */}
      <div className="relative w-full max-w-[420px] flex flex-col items-center gap-5">
        {/* Arabic Calligraphy Bismillah */}
        <motion.p
          className="font-arabic text-xl md:text-2xl text-gold-light opacity-80 text-center leading-loose"
          initial={{ opacity: 0, y: -14 }}
          animate={{ opacity: 0.85, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          بِسْمِ ٱللَّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
        </motion.p>

        {/* Photorealistic 3D Envelope Body with Seal */}
        <EnvelopeBody
          sealState={sealState}
          isFlapping={isFlapping}
          isLifting={isLifting}
          isExiting={isExiting}
          onSealTap={handleSealTap}
        />
      </div>
    </motion.div>
  );
}
