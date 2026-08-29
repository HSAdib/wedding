import { motion } from 'framer-motion';
import { Clock, Heart, Utensils, Camera } from 'lucide-react';
import FloralDivider from '../FloralDivider';

// ── Timeline data ─────────────────────────────────────────────────────────────
const EVENTS = [
  {
    time:        '01:30 PM',
    title:       'Guest Arrival & Welcome Refreshments',
    description: 'We warmly welcome you to join us as our guests assemble and begin the celebrations.',
    Icon:        Clock,
    iconBg:      '#3F5844',
  },
  {
    time:        '02:00 PM',
    title:       'Nikah & Wedding Ceremony',
    description: 'The sacred union of Adib & Esha — a moment blessed by faith, family, and love.',
    Icon:        Heart,
    iconBg:      '#9A7B38',
  },
  {
    time:        '02:45 PM',
    title:       'Royal Feast & Lunch',
    description: 'A curated traditional feast presented in joyful celebration of the newlyweds.',
    Icon:        Utensils,
    iconBg:      '#3F5844',
  },
  {
    time:        '04:00 PM',
    title:       'Photo Session & Reception',
    description: 'Precious memories, heartfelt congratulations, and farewell blessings for all.',
    Icon:        Camera,
    iconBg:      '#9A7B38',
  },
] as const;

// ── Pulse ring animation ─────────────────────────────────────────────────────
function PulseRing({ color }: { color: string }) {
  return (
    <motion.div
      className="absolute inset-0 rounded-full"
      style={{ border: `1.5px solid ${color}` }}
      animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
      transition={{ repeat: Infinity, duration: 2.4, ease: 'easeInOut' }}
    />
  );
}

// ── Single timeline card ──────────────────────────────────────────────────────
function TimelineItem({
  event,
  index,
  isLast,
}: {
  event: (typeof EVENTS)[number];
  index: number;
  isLast: boolean;
}) {
  const { time, title, description, Icon, iconBg } = event;
  const isEven = index % 2 === 0;

  return (
    <motion.div
      className="relative flex items-start gap-0"
      initial={{ opacity: 0, x: isEven ? -28 : 28 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.62, delay: index * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {/* ── Left: time label (desktop: alternating sides; mobile: always left) */}
      <div className="w-[88px] flex-shrink-0 pt-3 text-right pr-4 hidden sm:block">
        <p className="font-cinzel text-gold text-[10px] tracking-[0.22em] uppercase leading-tight">
          {time}
        </p>
      </div>

      {/* ── Spine column ── */}
      <div className="flex flex-col items-center flex-shrink-0" style={{ width: 44 }}>
        {/* Node */}
        <div className="relative flex items-center justify-center" style={{ width: 44, height: 44 }}>
          {/* Outer pulse ring */}
          <PulseRing color="rgba(197,160,89,0.5)" />
          {/* Second ring */}
          <motion.div
            className="absolute inset-2 rounded-full"
            style={{ border: '1px solid rgba(197,160,89,0.25)' }}
          />
          {/* Icon disc */}
          <div
            className="relative z-10 w-9 h-9 rounded-full flex items-center justify-center"
            style={{
              background: iconBg,
              boxShadow: '0 4px 16px -4px rgba(0,0,0,0.28), 0 0 0 2px rgba(197,160,89,0.3)',
            }}
          >
            <Icon className="w-4 h-4" style={{ color: '#EAD79B', strokeWidth: 1.8 }} />
          </div>
        </div>

        {/* Spine line to next item */}
        {!isLast && (
          <div
            className="flex-1 w-px mt-0.5"
            style={{
              minHeight: 48,
              background: 'linear-gradient(to bottom, rgba(197,160,89,0.55), rgba(197,160,89,0.18))',
            }}
          />
        )}
      </div>

      {/* ── Card ── */}
      <div className="flex-1 pb-10 pl-4 pt-1.5">
        {/* Mobile time */}
        <p className="font-cinzel text-gold text-[10px] tracking-[0.22em] uppercase mb-1.5 sm:hidden">
          {time}
        </p>

        <motion.div
          className="group rounded-2xl p-5 transition-all duration-300"
          style={{
            background: 'rgba(255,255,255,0.80)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            border: '1px solid rgba(197,160,89,0.20)',
            boxShadow: '0 4px 24px -8px rgba(36,51,39,0.07), 0 1px 4px -1px rgba(0,0,0,0.04)',
          }}
          whileHover={{ y: -2, boxShadow: '0 8px 32px -8px rgba(36,51,39,0.12), 0 1px 4px rgba(0,0,0,0.04)' }}
          transition={{ duration: 0.25 }}
        >
          {/* Top accent line */}
          <div
            className="absolute top-0 left-6 right-6 h-px rounded-full pointer-events-none"
            style={{ background: 'linear-gradient(90deg, transparent, rgba(197,160,89,0.4), transparent)' }}
          />

          <h3 className="font-serif text-botanical-dark text-lg italic leading-snug mb-1.5 group-hover:text-botanical transition-colors duration-200">
            {title}
          </h3>
          <p className="font-sans text-charcoal-light text-sm leading-relaxed opacity-65">
            {description}
          </p>

          {/* Corner gold dot accent */}
          <div
            className="absolute top-4 right-4 w-1.5 h-1.5 rounded-full"
            style={{ background: 'rgba(197,160,89,0.45)' }}
          />
        </motion.div>
      </div>
    </motion.div>
  );
}

// ── Section ───────────────────────────────────────────────────────────────────
export default function TimelineSection() {
  return (
    <section className="section-reveal relative py-20 px-4 bg-cream-50 botanical-texture flex flex-col items-center gap-12">

      {/* ── Heading ── */}
      <motion.div
        className="flex flex-col items-center gap-3 text-center"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.62 }}
      >
        <p className="font-cinzel text-gold text-xs tracking-[0.3em] uppercase opacity-85">
          Program Timeline
        </p>
        <h2 className="font-serif text-botanical-dark text-3xl md:text-4xl italic mt-1">
          Order of Events
        </h2>
        <FloralDivider color="botanical" />
        <p className="font-sans text-charcoal-light text-sm opacity-48 max-w-xs text-center">
          Friday, September 4 · Crystal Palace, Sylhet
        </p>
      </motion.div>

      {/* ── Timeline ── */}
      <div className="relative w-full max-w-xl">
        {/* Full-height spine gradient (decorative, behind items) */}
        <div
          className="absolute pointer-events-none"
          style={{
            left: 'calc(88px + 22px)', // left col width + half node width
            top: 22,
            bottom: 40,
            width: 1,
            background: 'linear-gradient(to bottom, rgba(197,160,89,0.15) 0%, rgba(197,160,89,0.45) 40%, rgba(197,160,89,0.45) 60%, rgba(197,160,89,0.15) 100%)',
          }}
        />
        {/* Mobile spine */}
        <div
          className="absolute pointer-events-none sm:hidden"
          style={{
            left: 22,
            top: 22,
            bottom: 40,
            width: 1,
            background: 'linear-gradient(to bottom, rgba(197,160,89,0.15) 0%, rgba(197,160,89,0.45) 50%, rgba(197,160,89,0.15) 100%)',
          }}
        />

        <div className="flex flex-col gap-0">
          {EVENTS.map((event, i) => (
            <TimelineItem
              key={event.title}
              event={event}
              index={i}
              isLast={i === EVENTS.length - 1}
            />
          ))}
        </div>
      </div>

      {/* ── Footer note ── */}
      <motion.div
        className="flex flex-col items-center gap-2 text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5, duration: 0.6 }}
      >
        <div className="gold-line w-40" />
        <p className="font-serif text-botanical italic text-sm opacity-55">
          Schedule subject to slight variations
        </p>
      </motion.div>
    </section>
  );
}
