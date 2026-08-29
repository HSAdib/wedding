import { motion } from 'framer-motion';
import { type SealState } from './WaxSeal';
import WaxSeal from './WaxSeal';
import OpeningBloom from './OpeningBloom';
import { WEDDING } from '../../data/weddingData';

interface EnvelopeBodyProps {
  sealState: SealState;
  isFlapping: boolean;
  isLifting: boolean;
  isExiting: boolean;
  onSealTap: () => void;
}

export default function EnvelopeBody({
  sealState,
  isFlapping,
  isLifting,
  isExiting,
  onSealTap,
}: EnvelopeBodyProps) {
  return (
    <div className="relative w-full max-w-[390px] mx-auto flex flex-col items-center select-none" style={{ perspective: '1400px' }}>
      {/* ── Bloom Lens Flare ── */}
      <OpeningBloom active={sealState === 'burst'} />

      {/* ── Envelope Scene Stage ── */}
      <div className="relative w-full" style={{ height: 260 }}>

        {/* ── Layer 1: Envelope Interior Back Wall (Deep Botanical Green & Gold Foil) ──
            This is the interior cavity lining of the envelope.
        ───────────────────────────────────────────────────────────────────────── */}
        <div
          className="absolute inset-0 rounded-3xl overflow-hidden shadow-2xl"
          style={{
            background: 'radial-gradient(ellipse at 50% 30%, #2A3B2E 0%, #1E2C22 60%, #121A14 100%)',
            boxShadow: '0 25px 60px -10px rgba(10, 18, 12, 0.6), inset 0 2px 4px rgba(255, 255, 255, 0.1)',
            zIndex: 1,
          }}
        >
          {/* Gold Floral Damask Motif inside pocket */}
          <div
            className="absolute inset-0 opacity-30 pointer-events-none"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='32' height='32' viewBox='0 0 32 32' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23DFC07A' fill-opacity='0.7'%3E%3Ccircle cx='16' cy='16' r='2'/%3E%3Cpath d='M16 8 Q20 12 16 16 Q12 12 16 8Z'/%3E%3Cpath d='M16 24 Q20 20 16 16 Q12 20 16 24Z'/%3E%3Cpath d='M8 16 Q12 20 16 16 Q12 12 8 16Z'/%3E%3Cpath d='M24 16 Q20 20 16 16 Q20 12 24 16Z'/%3E%3C/g%3E%3C/svg%3E")`,
              backgroundSize: '26px 26px',
            }}
          />
        </div>

        {/* ── Layer 2: Rising Inner Wedding Invitation Card ──
            Positioned inside pocket (behind front flaps, in front of back wall).
        ───────────────────────────────────────────────────────────────────────── */}
        <motion.div
          className="absolute inset-x-5 top-4 h-56 rounded-2xl overflow-hidden shadow-2xl"
          style={{
            background: 'linear-gradient(175deg, #FFFDF9 0%, #FAF6ED 55%, #F4ECE0 100%)',
            border: '1px solid rgba(197, 160, 89, 0.4)',
            boxShadow: '0 -10px 35px -5px rgba(0, 0, 0, 0.35)',
            zIndex: 5,
          }}
          initial={{ y: 0, opacity: 0 }}
          animate={
            isExiting
              ? { y: -190, opacity: 0, scale: 1.04, transition: { duration: 0.5, ease: 'easeIn' } }
              : isLifting
              ? { y: -140, opacity: 1, transition: { duration: 0.95, ease: [0.16, 1, 0.3, 1] } }
              : { y: 0, opacity: 0 }
          }
        >
          {/* Double Gold Filigree Card Frame */}
          <div className="absolute inset-2.5 border border-gold/35 rounded-xl pointer-events-none" />
          <div className="absolute inset-3.5 border border-gold/15 rounded-lg pointer-events-none" />

          {/* Corner Filigree Fleurons on Card */}
          <div className="absolute top-3 left-3 w-3 h-3 border-t-2 border-l-2 border-gold/60" />
          <div className="absolute top-3 right-3 w-3 h-3 border-t-2 border-r-2 border-gold/60" />

          {/* Card Content Preview */}
          <div className="p-4 flex flex-col items-center justify-center text-center gap-1 mt-1">
            <p className="font-arabic text-botanical opacity-75 text-sm leading-loose">
              {WEDDING.bismillah}
            </p>
            <div className="gold-line w-16 my-0.5" />
            <p className="font-script text-botanical-dark text-3xl leading-tight">
              {WEDDING.coupleScript}
            </p>
            <div className="gold-line w-20 my-0.5" />
            <p className="font-cinzel text-gold text-[9px] tracking-[0.3em] uppercase font-semibold">
              {WEDDING.dateDisplay}
            </p>
            <p className="font-sans text-charcoal-light text-[9px] opacity-60">
              {WEDDING.venueName}
            </p>
          </div>
        </motion.div>

        {/* ── Layer 3: Left & Right Front Pocket Flaps (Ivory Paper) ──
            z-index: 10 (Covers left and right sides of the pocket)
        ───────────────────────────────────────────────────────────────────────── */}
        <div
          className="absolute inset-0 rounded-l-3xl pointer-events-none"
          style={{
            background: 'linear-gradient(to right, #F5EFE4 0%, #EFE8DA 65%, transparent 100%)',
            clipPath: 'polygon(0 0, 0 100%, 53% 50%)',
            zIndex: 10,
          }}
        />
        <div
          className="absolute inset-0 rounded-r-3xl pointer-events-none"
          style={{
            background: 'linear-gradient(to left, #F5EFE4 0%, #EFE8DA 65%, transparent 100%)',
            clipPath: 'polygon(100% 0, 47% 50%, 100% 100%)',
            zIndex: 10,
          }}
        />

        {/* ── Layer 4: Bottom Triangular Front Flap (Ivory Paper) ──
            z-index: 15 (Forms the front pocket bottom)
        ───────────────────────────────────────────────────────────────────────── */}
        <div
          className="absolute inset-0 rounded-b-3xl pointer-events-none"
          style={{
            background: 'linear-gradient(to bottom, #F7F1E6 0%, #ECE3D2 100%)',
            clipPath: 'polygon(0 100%, 50% 40%, 100% 100%)',
            filter: 'drop-shadow(0 -5px 10px rgba(0, 0, 0, 0.08))',
            zIndex: 15,
          }}
        >
          {/* Subtle Embossed Floral Damask on Bottom Pocket */}
          <div
            className="absolute inset-0 opacity-12 pointer-events-none"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='36' height='36' viewBox='0 0 36 36' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M18 0 L36 18 L18 36 L0 18 Z' fill='none' stroke='%233F5844' stroke-width='0.6'/%3E%3Ccircle cx='18' cy='18' r='3.5' fill='%23C5A059' fill-opacity='0.4'/%3E%3C/svg%3E")`,
              backgroundSize: '24px 24px',
            }}
          />

          {/* Bottom Flap Gold Filigree Trim */}
          <svg viewBox="0 0 390 260" className="w-full h-full" fill="none">
            <path
              d="M 0,260 L 195,104 L 390,260"
              stroke="url(#bottom-flap-gold)"
              strokeWidth="1.5"
              strokeDasharray="4 2"
              opacity="0.6"
            />
            <defs>
              <linearGradient id="bottom-flap-gold" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#DFC07A" />
                <stop offset="50%" stopColor="#FFF2B8" />
                <stop offset="100%" stopColor="#DFC07A" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* ── Layer 5: Top 3D Triangular Flap with Dual Gold-Foil Trim ──
            When closed: covers the top opening from (0,0) to center tip (50%, 56%).
            When open: flips -180deg on X-axis above the envelope.
        ───────────────────────────────────────────────────────────────────────── */}
        <motion.div
          className="absolute top-0 inset-x-0 h-[56%] rounded-t-3xl"
          style={{
            clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
            transformOrigin: 'top center',
            transformStyle: 'preserve-3d',
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            background: 'linear-gradient(175deg, #FBF9F4 0%, #F5EEE2 50%, #ECE3D2 100%)',
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12)',
            zIndex: isFlapping ? 6 : 25,
          }}
          animate={
            isFlapping
              ? { rotateX: -180, transition: { duration: 0.85, ease: [0.35, 0, 0.25, 1] } }
              : { rotateX: 0, transition: { duration: 0.4 } }
          }
        >
          {/* Embossed damask on top flap */}
          <div
            className="absolute inset-0 opacity-15 pointer-events-none"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='36' height='36' viewBox='0 0 36 36' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M18 0 L36 18 L18 36 L0 18 Z' fill='none' stroke='%233F5844' stroke-width='0.6'/%3E%3Ccircle cx='18' cy='18' r='3.5' fill='%23C5A059' fill-opacity='0.4'/%3E%3C/svg%3E")`,
              backgroundSize: '24px 24px',
            }}
          />

          {/* Dual Gold Foil Filigree V-Border Trim */}
          <svg viewBox="0 0 390 146" className="w-full h-full" fill="none">
            {/* Outer Gold V-Line */}
            <path
              d="M 0,0 L 195,142 L 390,0"
              stroke="url(#top-v-trim)"
              strokeWidth="2.2"
              opacity="0.85"
            />
            {/* Inner Delicate Dashed Gold V-Line */}
            <path
              d="M 12,0 L 195,130 L 378,0"
              stroke="url(#top-v-trim)"
              strokeWidth="1.2"
              strokeDasharray="4 2"
              opacity="0.65"
            />
            {/* Center Tip Fleuron Accent */}
            <circle cx="195" cy="120" r="2.5" fill="#DFC07A" />
            <circle cx="195" cy="120" r="1.2" fill="#FFF2B8" />

            <defs>
              <linearGradient id="top-v-trim" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#DFC07A" />
                <stop offset="30%" stopColor="#FFF2B8" />
                <stop offset="50%" stopColor="#C5A059" />
                <stop offset="70%" stopColor="#FFF2B8" />
                <stop offset="100%" stopColor="#DFC07A" />
              </linearGradient>
            </defs>
          </svg>
        </motion.div>

        {/* ── Layer 6: Molten Gold Wax Seal Stamped at Flap Junction ──
            Positioned at the tip of the flap (z-index 40 = always on top).
        ───────────────────────────────────────────────────────────────────────── */}
        <div
          className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 z-40"
          style={{ top: '53%' }}
        >
          <WaxSeal onTap={onSealTap} state={sealState} />
        </div>

      </div>{/* /Envelope Stage */}

      {/* ── Symmetrical Royal Flourish & "YOU ARE INVITED" ── */}
      <motion.div
        className="flex flex-col items-center gap-3 mt-7 text-center"
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.8 }}
      >
        {/* Symmetrical Metallic Gold Flourish Ornament */}
        <div className="w-48 h-6 opacity-85">
          <svg viewBox="0 0 200 24" className="w-full h-full" fill="none">
            {/* Center Diamond */}
            <path d="M 100,6 L 106,12 L 100,18 L 94,12 Z" fill="#C5A059" />
            <circle cx="100" cy="12" r="1.5" fill="#FFF2B8" />
            {/* Left Leaf Scrolls */}
            <path d="M 90,12 Q 60,3 30,12 Q 15,15 0,12" stroke="#C5A059" strokeWidth="1" />
            <path d="M 75,10 Q 65,4 55,10" stroke="#DFC07A" strokeWidth="0.8" />
            <circle cx="55" cy="10" r="1.2" fill="#C5A059" />
            <circle cx="20" cy="12" r="1.2" fill="#C5A059" />
            {/* Right Leaf Scrolls (Mirrored) */}
            <path d="M 110,12 Q 140,3 170,12 Q 185,15 200,12" stroke="#C5A059" strokeWidth="1" />
            <path d="M 125,10 Q 135,4 145,10" stroke="#DFC07A" strokeWidth="0.8" />
            <circle cx="145" cy="10" r="1.2" fill="#C5A059" />
            <circle cx="180" cy="12" r="1.2" fill="#C5A059" />
          </svg>
        </div>

        {/* Formal Invitation Text */}
        <p className="font-cinzel text-[11px] tracking-[0.35em] text-[#EAD79B] uppercase font-semibold opacity-85">
          YOU ARE INVITED
        </p>
      </motion.div>
    </div>
  );
}
