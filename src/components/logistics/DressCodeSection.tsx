import { motion } from 'framer-motion';
import { Sparkles, UserCheck, Gift, Heart } from 'lucide-react';
import FloralDivider from '../FloralDivider';

// ── Dress code data ───────────────────────────────────────────────────────────
const DRESS_CODES = [
  {
    label: 'For Her',
    Icon:  Sparkles,
    dress: 'Pastel Tones',
    detail:
      'Traditional Sarees, Lehengas, or Elegant Formal Attire in soft, celebration-ready palettes.',
    palette: ['#E8D5C4', '#D4B8A8', '#C9AFA0', '#B5967A'],
    iconColor: '#C5A059',
    borderColor: 'rgba(197,160,89,0.28)',
    bg: 'rgba(253,251,247,0.85)',
  },
  {
    label: 'For Him',
    Icon:  UserCheck,
    dress: 'Smart Formal',
    detail:
      'Suits, Blazers, or Traditional Panjabi / Sherwani in classic and refined formal wear.',
    palette: ['#3F5844', '#4A6B50', '#6B8E70', '#9DB5A2'],
    iconColor: '#3F5844',
    borderColor: 'rgba(63,88,68,0.22)',
    bg: 'rgba(247,249,247,0.85)',
  },
] as const;

// ── Colour swatch strip ───────────────────────────────────────────────────────
function SwatchStrip({ colors }: { colors: readonly string[] }) {
  return (
    <div className="flex gap-1.5 justify-center mt-1">
      {colors.map((c) => (
        <div
          key={c}
          className="w-5 h-5 rounded-full"
          style={{
            background: c,
            boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.12)',
            border: '1.5px solid rgba(255,255,255,0.6)',
          }}
        />
      ))}
    </div>
  );
}

// ── Single dress-code card ────────────────────────────────────────────────────
function DressCard({
  item,
  index,
}: {
  item: (typeof DRESS_CODES)[number];
  index: number;
}) {
  const { label, Icon, dress, detail, palette, iconColor, borderColor, bg } = item;

  return (
    <motion.div
      className="flex flex-col items-center text-center rounded-2xl p-6 relative overflow-hidden"
      style={{
        background: bg,
        border: `1px solid ${borderColor}`,
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        boxShadow: '0 4px 20px -8px rgba(36,51,39,0.08)',
      }}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.62, delay: index * 0.14 }}
      whileHover={{ y: -3 }}
    >
      {/* Top shimmer */}
      <div
        className="absolute top-0 inset-x-0 h-px pointer-events-none"
        style={{ background: `linear-gradient(90deg, transparent, ${iconColor}55, transparent)` }}
      />

      {/* Icon circle */}
      <div
        className="w-14 h-14 rounded-full flex items-center justify-center mb-4"
        style={{
          background: `${iconColor}14`,
          border: `1.5px solid ${iconColor}35`,
        }}
      >
        <Icon
          className="w-6 h-6"
          style={{ color: iconColor, strokeWidth: 1.6 }}
        />
      </div>

      {/* Label */}
      <p className="font-cinzel text-[10px] tracking-[0.35em] uppercase mb-0.5" style={{ color: iconColor, opacity: 0.75 }}>
        {label}
      </p>

      {/* Dress title */}
      <h3 className="font-serif text-botanical-dark text-xl italic mb-2">
        {dress}
      </h3>

      {/* Colour swatches */}
      <SwatchStrip colors={palette} />

      {/* Divider */}
      <div
        className="my-3 w-16 h-px self-center"
        style={{ background: `linear-gradient(90deg, transparent, ${iconColor}45, transparent)` }}
      />

      {/* Detail text */}
      <p className="font-sans text-charcoal-light text-sm leading-relaxed opacity-62">
        {detail}
      </p>
    </motion.div>
  );
}

// ── Gift note card ────────────────────────────────────────────────────────────
function GiftNote() {
  return (
    <motion.div
      className="w-full max-w-lg rounded-2xl p-6 text-center relative overflow-hidden"
      style={{
        background: 'rgba(247,244,235,0.75)',
        border: '1px solid rgba(197,160,89,0.22)',
        backdropFilter: 'blur(8px)',
      }}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.3, duration: 0.65 }}
    >
      {/* Top shimmer */}
      <div
        className="absolute top-0 inset-x-0 h-px pointer-events-none"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(197,160,89,0.4), transparent)' }}
      />

      {/* Icon + heading */}
      <div className="flex items-center justify-center gap-2.5 mb-3">
        <Gift className="w-4.5 h-4.5 text-gold opacity-70" style={{ width: 18, height: 18 }} />
        <p className="font-cinzel text-gold text-xs tracking-[0.32em] uppercase opacity-80">
          A Note on Gifts
        </p>
        <Gift className="w-4.5 h-4.5 text-gold opacity-70" style={{ width: 18, height: 18 }} />
      </div>

      <div className="gold-line w-28 mx-auto mb-3" />

      <p className="font-serif text-botanical-dark italic text-base leading-relaxed opacity-72">
        "Your presence, love, and prayers on our special day are the greatest
        gifts we could ever ask for."
      </p>

      <div className="flex items-center justify-center gap-1.5 mt-3">
        <Heart className="w-3 h-3 text-gold" fill="#C5A059" />
        <p className="font-sans text-charcoal-light text-xs opacity-40">
          — Adib &amp; Esha
        </p>
        <Heart className="w-3 h-3 text-gold" fill="#C5A059" />
      </div>
    </motion.div>
  );
}

// ── Additional guidelines ─────────────────────────────────────────────────────
const GUIDELINES = [
  { icon: '🕌', text: 'Kindly maintain the sanctity and reverence of the Nikah ceremony.' },
  { icon: '📵', text: 'Silent your phones during the ceremony. Photography is welcome at reception.' },
  { icon: '⏰', text: 'Please arrive at 1:30 PM for smooth guest seating arrangements.' },
];

// ── Section ───────────────────────────────────────────────────────────────────
export default function DressCodeSection() {
  return (
    <section className="section-reveal relative py-20 px-4 bg-gradient-to-b from-cream-50 to-cream-100 botanical-texture flex flex-col items-center gap-12">

      {/* ── Heading ── */}
      <motion.div
        className="flex flex-col items-center gap-3 text-center"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.62 }}
      >
        <p className="font-cinzel text-gold text-xs tracking-[0.35em] uppercase opacity-85">
          Guest Information
        </p>
        <h2 className="font-serif text-botanical-dark text-3xl md:text-4xl italic mt-1">
          Dress Code &amp; Guidelines
        </h2>
        <FloralDivider color="gold" />
        <p className="font-sans text-charcoal-light text-sm opacity-48 max-w-xs text-center">
          Dress to celebrate — elegance and tradition are our theme
        </p>
      </motion.div>

      {/* ── Dress code cards ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 w-full max-w-lg">
        {DRESS_CODES.map((item, i) => (
          <DressCard key={item.label} item={item} index={i} />
        ))}
      </div>

      {/* ── Guest guidelines ── */}
      <motion.div
        className="w-full max-w-lg flex flex-col gap-3"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.25, duration: 0.65 }}
      >
        <p className="font-cinzel text-gold text-[10px] tracking-[0.35em] uppercase opacity-70 text-center mb-1">
          Kindly Note
        </p>
        {GUIDELINES.map(({ icon, text }, i) => (
          <motion.div
            key={i}
            className="flex items-start gap-3 rounded-xl px-4 py-3"
            style={{
              background: 'rgba(247,244,235,0.65)',
              border: '1px solid rgba(197,160,89,0.15)',
            }}
            initial={{ opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 * i + 0.3, duration: 0.5 }}
          >
            <span className="text-lg leading-none mt-0.5">{icon}</span>
            <p className="font-sans text-charcoal-light text-sm opacity-65 leading-relaxed">
              {text}
            </p>
          </motion.div>
        ))}
      </motion.div>

      {/* ── Gift note ── */}
      <GiftNote />
    </section>
  );
}
