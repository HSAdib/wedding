import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { WEDDING } from '../../data/weddingData';
import FloralDivider from '../FloralDivider';
import { Heart } from 'lucide-react';

// ── Real-time countdown hook ─────────────────────────────────────────────────
interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isPast: boolean;
}

function useCountdown(targetISO: string): TimeLeft {
  const calc = (): TimeLeft => {
    const diff = new Date(targetISO).getTime() - Date.now();
    if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true };
    return {
      days:    Math.floor(diff / 86_400_000),
      hours:   Math.floor((diff % 86_400_000) / 3_600_000),
      minutes: Math.floor((diff % 3_600_000) / 60_000),
      seconds: Math.floor((diff % 60_000) / 1_000),
      isPast:  false,
    };
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calc);

  useEffect(() => {
    const id = setInterval(() => setTimeLeft(calc()), 1000);
    return () => clearInterval(id);
  }, [targetISO]); // eslint-disable-line react-hooks/exhaustive-deps

  return timeLeft;
}

// ── Digit card with flip animation ──────────────────────────────────────────
interface DigitCardProps {
  value: number;
  label: string;
}

function DigitCard({ value, label }: DigitCardProps) {
  const display = String(value).padStart(2, '0');

  return (
    <div className="flex flex-col items-center gap-2">
      {/* Outer card */}
      <div
        className="relative flex flex-col items-center justify-center overflow-hidden rounded-xl"
        style={{
          width: 'clamp(64px, 18vw, 88px)',
          height: 'clamp(72px, 20vw, 96px)',
          background: 'rgba(247,244,235,0.85)',
          border: '1px solid rgba(197,160,89,0.28)',
          boxShadow: '0 2px 8px -2px rgba(36,51,39,0.06), 0 1px 2px rgba(0,0,0,0.04)',
        }}
      >
        {/* Top shimmer accent */}
        <div
          className="absolute top-0 inset-x-0 h-px"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(197,160,89,0.5), transparent)' }}
        />
        {/* Bottom shadow line */}
        <div
          className="absolute bottom-0 inset-x-0 h-px"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(36,51,39,0.08), transparent)' }}
        />
        {/* Subtle fold crease (split card effect) */}
        <div
          className="absolute inset-x-0"
          style={{ top: '50%', height: '1px', background: 'rgba(36,51,39,0.05)' }}
        />

        {/* Digit — keyed by value for AnimatePresence flip */}
        <div className="relative h-10 flex items-center justify-center" style={{ overflow: 'hidden' }}>
          <AnimatePresence mode="popLayout">
            <motion.span
              key={value}
              className="font-serif font-bold text-botanical-dark block"
              style={{ fontSize: 'clamp(1.6rem, 6vw, 2.2rem)', lineHeight: 1 }}
              initial={{ y: -18, opacity: 0 }}
              animate={{ y: 0,   opacity: 1 }}
              exit={{   y:  18, opacity: 0 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            >
              {display}
            </motion.span>
          </AnimatePresence>
        </div>
      </div>

      {/* Label */}
      <p
        className="font-sans uppercase text-botanical-light text-center"
        style={{ fontSize: 'clamp(8px, 2vw, 11px)', letterSpacing: '0.24em' }}
      >
        {label}
      </p>
    </div>
  );
}

// ── Separator dot ────────────────────────────────────────────────────────────
function Colon() {
  return (
    <div className="flex flex-col items-center gap-1.5 pb-7">
      <motion.div
        className="w-1 h-1 rounded-full"
        style={{ background: 'rgba(197,160,89,0.6)' }}
        animate={{ opacity: [1, 0.3, 1] }}
        transition={{ repeat: Infinity, duration: 1.0, ease: 'easeInOut' }}
      />
      <motion.div
        className="w-1 h-1 rounded-full"
        style={{ background: 'rgba(197,160,89,0.6)' }}
        animate={{ opacity: [1, 0.3, 1] }}
        transition={{ repeat: Infinity, duration: 1.0, ease: 'easeInOut', delay: 0.5 }}
      />
    </div>
  );
}

// ── Main section ─────────────────────────────────────────────────────────────
export default function CountdownSection() {
  const { days, hours, minutes, seconds, isPast } = useCountdown(WEDDING.targetISO);

  return (
    <section className="section-reveal relative py-20 px-4 bg-gradient-to-b from-cream-50 to-cream-100 botanical-texture flex flex-col items-center gap-10">

      {/* ── Heading ─────────────────────────────────────────────────────── */}
      <motion.div
        className="flex flex-col items-center gap-3 text-center"
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.65 }}
      >
        <p className="font-cinzel text-gold text-xs tracking-[0.3em] uppercase opacity-80">
          Counting Down to Forever
        </p>
        <h2 className="font-serif text-botanical-dark text-3xl md:text-4xl italic">
          The Big Day Approaches
        </h2>
        <FloralDivider color="gold" />
        <p className="font-cinzel text-charcoal-light text-xs md:text-sm tracking-widest opacity-55">
          {WEDDING.dateDisplay} · {WEDDING.timeDisplay}
        </p>
      </motion.div>

      {/* ── Timer or celebration ─────────────────────────────────────────── */}
      <AnimatePresence mode="wait">
        {isPast ? (
          /* ── Celebration state (shown on/after the wedding day) ── */
          <motion.div
            key="celebration"
            className="flex flex-col items-center gap-4 text-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <div className="flex items-center gap-3">
              <Heart className="w-6 h-6 text-gold" fill="#C5A059" />
              <p className="font-script text-botanical-dark text-5xl">Today is the Day!</p>
              <Heart className="w-6 h-6 text-gold" fill="#C5A059" />
            </div>
            <p className="font-cinzel text-gold text-xs tracking-[0.3em] uppercase">
              Congratulations, Adib &amp; Esha 🎉
            </p>
            <p className="font-sans text-charcoal-light text-sm opacity-60 max-w-xs">
              May Allah bless your union with love, joy, and endless happiness.
            </p>
          </motion.div>
        ) : (
          /* ── Live countdown grid ── */
          <motion.div
            key="countdown"
            className="flex items-end justify-center"
            style={{ gap: 'clamp(6px, 2.5vw, 16px)' }}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <DigitCard value={days}    label="Days"    />
            <Colon />
            <DigitCard value={hours}   label="Hours"   />
            <Colon />
            <DigitCard value={minutes} label="Minutes" />
            <Colon />
            <DigitCard value={seconds} label="Seconds" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Motivational phrase ──────────────────────────────────────────── */}
      {!isPast && (
        <motion.div
          className="flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <div className="gold-line w-40" />
          <p className="font-serif text-botanical italic text-sm opacity-60">
            Every second brings us closer to forever
          </p>
          <div className="gold-line w-40" />
        </motion.div>
      )}
    </section>
  );
}
