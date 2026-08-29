import { motion } from 'framer-motion';
import { WEDDING } from '../../data/weddingData';
import FloralDivider from '../FloralDivider';

// ── Detailed watercolor-style botanical corner illustration ──────────────────
function BotanicalCorner() {
  return (
    <svg viewBox="0 0 190 240" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Watercolor wash — large background leaf shapes at very low opacity */}
      <path d="M3,0 Q60,85 28,185 Q-28,120 3,0Z" fill="#3F5844" fillOpacity="0.07" />
      <path d="M0,3 Q82,58 185,28 Q120,-28 0,3Z" fill="#3F5844" fillOpacity="0.06" />
      <path d="M10,0 Q65,78 32,168 Q-14,112 10,0Z" fill="#6B8E70" fillOpacity="0.055" />
      <path d="M0,10 Q78,65 168,32 Q112,-14 0,10Z" fill="#6B8E70" fillOpacity="0.05" />

      {/* Primary diagonal stems */}
      <path d="M0,0 Q60,90 92,186" stroke="#3F5844" strokeWidth="1.25" strokeOpacity="0.28" />
      <path d="M0,0 Q88,60 186,88" stroke="#3F5844" strokeWidth="1.0" strokeOpacity="0.22" />
      <path d="M4,4 Q44,48 66,98" stroke="#3F5844" strokeWidth="0.75" strokeOpacity="0.2" />

      {/* ── Leaf cluster 1 — upper left diagonal ── */}
      {/* Large leaf A */}
      <path d="M22,30 Q54,12 68,38 Q48,58 22,30Z" fill="#6B8E70" fillOpacity="0.54" />
      <path d="M24,28 Q56,10 70,36 Q50,60 24,28Z" fill="#243327" fillOpacity="0.09" />
      <path d="M24,28 Q52,14 66,36" stroke="#3F5844" strokeWidth="0.7" strokeOpacity="0.38" />
      {/* Large leaf B */}
      <path d="M46,62 Q80,40 95,68 Q74,88 46,62Z" fill="#6B8E70" fillOpacity="0.50" />
      <path d="M48,60 Q82,38 97,66" stroke="#3F5844" strokeWidth="0.68" strokeOpacity="0.34" />
      {/* Overlapping leaf C */}
      <path d="M16,82 Q48,58 66,82 Q44,102 16,82Z" fill="#3F5844" fillOpacity="0.38" />
      {/* Leaf D */}
      <path d="M38,110 Q62,88 78,114 Q56,132 38,110Z" fill="#6B8E70" fillOpacity="0.42" />
      <path d="M40,108 Q64,86 80,112" stroke="#3F5844" strokeWidth="0.6" strokeOpacity="0.3" />
      {/* Leaf E — small detail */}
      <path d="M62,135 Q80,120 90,138 Q74,150 62,135Z" fill="#3F5844" fillOpacity="0.32" />

      {/* ── Leaf cluster 2 — upper right diagonal ── */}
      {/* Leaf F */}
      <path d="M60,20 Q95,8 103,30 Q82,45 60,20Z" fill="#6B8E70" fillOpacity="0.52" />
      <path d="M62,18 Q97,6 105,28" stroke="#3F5844" strokeWidth="0.68" strokeOpacity="0.36" />
      {/* Leaf G */}
      <path d="M98,10 Q130,2 134,22 Q112,36 98,10Z" fill="#6B8E70" fillOpacity="0.44" />
      {/* Leaf H */}
      <path d="M132,18 Q156,14 158,34 Q136,42 132,18Z" fill="#6B8E70" fillOpacity="0.36" />
      {/* Leaf I — lower horizontal */}
      <path d="M72,40 Q100,26 108,48 Q86,62 72,40Z" fill="#3F5844" fillOpacity="0.36" />
      {/* Leaf J */}
      <path d="M104,34 Q128,22 135,44 Q114,56 104,34Z" fill="#6B8E70" fillOpacity="0.38" />

      {/* ── Secondary small leaves (detail) ── */}
      <path d="M34,46 Q48,36 56,48 Q42,58 34,46Z" fill="#6B8E70" fillOpacity="0.44" />
      <path d="M58,86 Q72,74 80,88 Q66,98 58,86Z" fill="#6B8E70" fillOpacity="0.38" />
      <path d="M18,104 Q32,92 42,106 Q28,118 18,104Z" fill="#3F5844" fillOpacity="0.30" />
      <path d="M55,124 Q68,112 76,126 Q62,136 55,124Z" fill="#6B8E70" fillOpacity="0.33" />
      <path d="M24,56 Q36,46 44,58 Q32,68 24,56Z" fill="#3F5844" fillOpacity="0.28" />

      {/* ── Fine fern fronds / vein stems ── */}
      <path d="M8,10 Q28,36 44,32" stroke="#3F5844" strokeWidth="0.65" strokeOpacity="0.38" />
      <path d="M14,18 Q36,34 36,54" stroke="#3F5844" strokeWidth="0.6" strokeOpacity="0.32" />
      <path d="M22,12 Q42,26 40,44" stroke="#3F5844" strokeWidth="0.55" strokeOpacity="0.28" />
      <path d="M68,46 Q82,30 95,46" stroke="#3F5844" strokeWidth="0.58" strokeOpacity="0.26" />
      <path d="M74,72 Q88,54 102,72" stroke="#3F5844" strokeWidth="0.55" strokeOpacity="0.24" />
      <path d="M40,70 Q54,54 68,70" stroke="#3F5844" strokeWidth="0.52" strokeOpacity="0.24" />
      <path d="M46,94 Q60,78 74,94" stroke="#3F5844" strokeWidth="0.5" strokeOpacity="0.20" />
      <path d="M18,132 Q30,118 42,134" stroke="#3F5844" strokeWidth="0.48" strokeOpacity="0.18" />

      {/* ── Gold berry accents ── */}
      <circle cx="70" cy="48" r="2.8" fill="#C5A059" fillOpacity="0.70" />
      <circle cx="48" cy="24" r="2.3" fill="#C5A059" fillOpacity="0.62" />
      <circle cx="96" cy="20" r="2.0" fill="#C5A059" fillOpacity="0.58" />
      <circle cx="28" cy="100" r="2.2" fill="#C5A059" fillOpacity="0.54" />
      <circle cx="62" cy="100" r="1.8" fill="#C5A059" fillOpacity="0.52" />
      <circle cx="104" cy="34" r="1.7" fill="#C5A059" fillOpacity="0.48" />
      <circle cx="80" cy="32" r="1.5" fill="#C5A059" fillOpacity="0.46" />
      <circle cx="22" cy="64" r="1.5" fill="#C5A059" fillOpacity="0.44" />
      <circle cx="55" cy="140" r="1.4" fill="#C5A059" fillOpacity="0.40" />
      <circle cx="138" cy="26" r="1.3" fill="#C5A059" fillOpacity="0.40" />

      {/* Berry cluster detail */}
      <circle cx="84" cy="44" r="1.4" fill="#9A7B38" fillOpacity="0.55" />
      <circle cx="88" cy="40" r="1.1" fill="#9A7B38" fillOpacity="0.46" />
      <circle cx="80" cy="40" r="1.0" fill="#9A7B38" fillOpacity="0.42" />
      <circle cx="116" cy="46" r="1.3" fill="#9A7B38" fillOpacity="0.46" />
      <circle cx="120" cy="42" r="1.0" fill="#9A7B38" fillOpacity="0.38" />

      {/* ── Decorative flower ── */}
      {/* Outer petals */}
      <path d="M88,104 Q94,115 88,126 Q82,115 88,104Z" fill="#EAD79B" fillOpacity="0.42" />
      <path d="M77,115 Q88,109 99,115 Q88,121 77,115Z" fill="#EAD79B" fillOpacity="0.42" />
      <path d="M80,107 Q88,110 96,104 Q93,112 80,107Z" fill="#EAD79B" fillOpacity="0.30" />
      <path d="M80,123 Q88,120 96,126 Q93,118 80,123Z" fill="#EAD79B" fillOpacity="0.30" />
      {/* Flower center */}
      <circle cx="88" cy="115" r="7" fill="#EAD79B" fillOpacity="0.52" />
      <circle cx="88" cy="115" r="4" fill="#C5A059" fillOpacity="0.72" />
      <circle cx="88" cy="115" r="2" fill="#9A7B38" fillOpacity="0.6" />

      {/* ── Second smaller flower ── */}
      <circle cx="128" cy="58" r="5" fill="#EAD79B" fillOpacity="0.44" />
      <circle cx="128" cy="58" r="2.5" fill="#C5A059" fillOpacity="0.60" />
      <path d="M128,51 Q131,58 128,65 Q125,58 128,51Z" fill="#EAD79B" fillOpacity="0.32" />
      <path d="M121,58 Q128,55 135,58 Q128,61 121,58Z" fill="#EAD79B" fillOpacity="0.32" />
    </svg>
  );
}

// ── Animation variants ───────────────────────────────────────────────────────
const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.14, delayChildren: 0.05 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.72, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

// ── Component ────────────────────────────────────────────────────────────────
export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden botanical-texture bg-cream-50 px-6 py-16">

      {/* ── Watercolor botanical corners ──────────────────────────────── */}
      {/* Top-left */}
      <div className="absolute top-0 left-0 w-44 h-56 pointer-events-none opacity-90" style={{ zIndex: 1 }}>
        <BotanicalCorner />
      </div>
      {/* Top-right (mirror X) */}
      <div className="absolute top-0 right-0 w-44 h-56 pointer-events-none opacity-90" style={{ zIndex: 1, transform: 'scaleX(-1)' }}>
        <BotanicalCorner />
      </div>
      {/* Bottom-left (mirror Y) */}
      <div className="absolute bottom-0 left-0 w-44 h-56 pointer-events-none opacity-90" style={{ zIndex: 1, transform: 'scaleY(-1)' }}>
        <BotanicalCorner />
      </div>
      {/* Bottom-right (mirror both) */}
      <div className="absolute bottom-0 right-0 w-44 h-56 pointer-events-none opacity-90" style={{ zIndex: 1, transform: 'scale(-1)' }}>
        <BotanicalCorner />
      </div>

      {/* ── Double gold border lines (matches physical card) ──────────── */}
      <div
        className="absolute pointer-events-none"
        style={{ inset: 20, border: '0.75px solid rgba(197,160,89,0.3)', borderRadius: 2 }}
      />
      <div
        className="absolute pointer-events-none"
        style={{ inset: 28, border: '0.4px solid rgba(197,160,89,0.16)', borderRadius: 1 }}
      />

      {/* ── Subtle center glow ────────────────────────────────────────── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 70% 55% at 50% 50%, rgba(197,160,89,0.04) 0%, transparent 70%)' }}
      />

      {/* ── Card content (stagger animation on scroll) ────────────────── */}
      <motion.div
        className="relative flex flex-col items-center text-center max-w-md w-full gap-5"
        style={{ zIndex: 2 }}
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
      >
        {/* Bismillah Arabic header */}
        <motion.div variants={fadeUp} className="flex flex-col items-center gap-2">
          <p
            className="font-arabic text-botanical-dark text-2xl md:text-3xl tracking-wide leading-loose"
            style={{ opacity: 0.82 }}
          >
            {WEDDING.bismillah}
          </p>
          <div className="gold-line w-36 mt-1" />
        </motion.div>

        {/* Formal sub-headers */}
        <motion.div variants={fadeUp} className="flex flex-col items-center gap-0.5">
          <p className="font-cinzel text-botanical-light text-xs md:text-sm tracking-[0.25em] uppercase">
            You Are Invited To
          </p>
          <p className="font-cinzel text-botanical-light text-xs md:text-sm tracking-[0.25em] uppercase">
            The Wedding Of
          </p>
        </motion.div>

        <motion.div variants={fadeUp}>
          <FloralDivider color="gold" />
        </motion.div>

        {/* ── Couple names ─────────────────────────────────────────────── */}
        <motion.div variants={fadeUp} className="flex flex-col items-center" style={{ gap: 4 }}>
          <h1
            className="font-script text-botanical-dark font-normal leading-tight"
            style={{ fontSize: 'clamp(3.5rem, 14vw, 5.5rem)', lineHeight: 1.05 }}
          >
            {WEDDING.groom}
          </h1>

          {/* Ornamental & divider */}
          <div className="flex items-center gap-3 my-1.5">
            <div className="gold-line w-12" />
            <p className="font-cinzel text-gold text-xl tracking-widest">&amp;</p>
            <div className="gold-line w-12" />
          </div>

          <h1
            className="font-script text-botanical-dark font-normal leading-tight"
            style={{ fontSize: 'clamp(3.5rem, 14vw, 5.5rem)', lineHeight: 1.05 }}
          >
            {WEDDING.bride}
          </h1>
        </motion.div>

        <motion.div variants={fadeUp}>
          <FloralDivider color="botanical" />
        </motion.div>

        {/* Formal invitation wording */}
        <motion.div variants={fadeUp} className="flex flex-col items-center gap-1">
          <p className="font-cinzel text-charcoal-light text-xs md:text-sm tracking-[0.28em] uppercase opacity-55">
            Together with their families
          </p>
          <p className="font-cinzel text-charcoal-light text-xs md:text-sm tracking-[0.28em] uppercase opacity-55">
            request the honour of your presence
          </p>
        </motion.div>

        {/* ── Date & venue glass card ───────────────────────────────────── */}
        <motion.div
          variants={fadeUp}
          className="glass-card rounded-2xl px-7 py-4 mt-1 flex flex-col items-center gap-1.5"
        >
          <p className="font-cinzel text-gold text-xs tracking-[0.3em] uppercase">
            {WEDDING.dateDisplay}
          </p>
          <div className="gold-line w-20" />
          <p className="font-sans text-charcoal-light text-xs opacity-55">
            {WEDDING.timeDisplay} · {WEDDING.venueName}
          </p>
          <p className="font-sans text-charcoal-light text-[10px] opacity-38">
            {WEDDING.venueAddress}
          </p>
        </motion.div>

        {/* ── Scroll cue ───────────────────────────────────────────────── */}
        <motion.div variants={fadeUp} className="flex flex-col items-center gap-1.5 mt-3 opacity-35">
          <p className="font-sans text-[9px] tracking-[0.38em] uppercase text-charcoal-light">
            Scroll to explore
          </p>
          <motion.div
            className="w-px h-8"
            style={{ background: '#C5A059' }}
            animate={{ scaleY: [0.3, 1, 0.3], opacity: [0.35, 1, 0.35] }}
            transition={{ repeat: Infinity, duration: 2.0, ease: 'easeInOut' }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
