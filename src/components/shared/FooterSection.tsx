import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { WEDDING } from '../../data/weddingData';
import FloralDivider from '../FloralDivider';

import AEMonogram from '../AEMonogram';

export default function FooterSection() {
  return (
    <footer className="relative py-20 px-6 bg-gradient-to-b from-botanical-dark via-botanical-deep to-[#0f1712] text-cream-50 flex flex-col items-center gap-8 text-center overflow-hidden">
      {/* Top Gold Shimmer Border */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent pointer-events-none" />

      {/* ── Monogram Encircles in Fine Gold Ring ── */}
      <motion.div
        className="relative flex items-center justify-center mt-4"
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        {/* Outer Fine Gold Rings */}
        <div
          className="w-24 h-24 rounded-full border border-gold/40 flex items-center justify-center relative"
          style={{
            boxShadow: '0 0 25px rgba(197, 160, 89, 0.15)',
          }}
        >
          <div className="w-20 h-20 rounded-full border border-gold/20 flex items-center justify-center">
            {/* Bespoke A&E Monogram */}
            <AEMonogram size={56} variant="gold" embossed={false} />
          </div>

          {/* 4 Cardinal Gold Accents */}
          <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-gold" />
          <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-gold" />
          <div className="absolute -left-1 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-gold" />
          <div className="absolute -right-1 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-gold" />
        </div>
      </motion.div>

      {/* ── Main Message ── */}
      <motion.div
        className="flex flex-col items-center gap-3 max-w-md"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.15, duration: 0.65 }}
      >
        <p className="font-arabic text-gold-light text-xl md:text-2xl opacity-85 leading-loose">
          {WEDDING.bismillah}
        </p>

        <h3 className="font-script text-cream-50 text-5xl md:text-6xl my-1">
          {WEDDING.coupleScript}
        </h3>

        <FloralDivider color="gold" className="my-2" />

        <p className="font-serif text-cream-200 text-base md:text-lg italic leading-relaxed opacity-90">
          "With love, blessings, and excitement — Adib &amp; Esha"
        </p>

        <div className="flex items-center gap-2 mt-2">
          <Heart className="w-3.5 h-3.5 text-gold" fill="#C5A059" />
          <p className="font-cinzel text-xs tracking-[0.3em] uppercase text-gold">
            September 04, 2026 • Sylhet, Bangladesh
          </p>
          <Heart className="w-3.5 h-3.5 text-gold" fill="#C5A059" />
        </div>

        <p className="font-sans text-cream-200/50 text-xs mt-0.5">
          {WEDDING.venueName}
        </p>
      </motion.div>

      {/* ── Quranic Verse Tribute ── */}
      <motion.div
        className="max-w-md w-full pt-4 border-t border-gold/15 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3, duration: 0.65 }}
      >
        <p className="font-serif text-cream-200/60 text-xs md:text-sm italic leading-relaxed">
          "And of His signs is that He created for you from yourselves mates that you may find tranquility in them; and He placed between you affection and mercy."
        </p>
        <span className="font-cinzel text-[10px] tracking-[0.25em] uppercase text-gold/70">
          Surah Ar-Rum • 30:21
        </span>
      </motion.div>

      {/* ── Subtle Botanical Branch Illustration at Bottom Edge ── */}
      <div className="w-full max-w-xs opacity-25 mt-4">
        <svg viewBox="0 0 240 30" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path d="M10 15 Q60 5 120 15 Q180 25 230 15" stroke="#C5A059" strokeWidth="1" />
          {/* Leaves */}
          <path d="M40 13 Q48 5 60 13 Q48 18 40 13Z" fill="#C5A059" />
          <path d="M80 14 Q90 6 100 14 Q90 20 80 14Z" fill="#C5A059" />
          <path d="M140 16 Q150 24 160 16 Q150 10 140 16Z" fill="#C5A059" />
          <path d="M180 16 Q190 24 200 16 Q190 10 180 16Z" fill="#C5A059" />
          {/* Central Flower */}
          <circle cx="120" cy="15" r="3" fill="#EAD79B" />
          <circle cx="120" cy="15" r="1.5" fill="#C5A059" />
        </svg>
      </div>

      <p className="font-sans text-cream-200/30 text-[9px] tracking-[0.25em] uppercase mt-2">
        Adib &amp; Esha • Celebration of Love
      </p>
    </footer>
  );
}
