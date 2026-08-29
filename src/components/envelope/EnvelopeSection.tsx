import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { useInvitation } from '../../context/InvitationContext';
import BotanicalFrame from '../BotanicalFrame';

export default function EnvelopeSection() {
  const { isOpen, openInvitation } = useInvitation();
  const [hovered, setHovered] = useState(false);

  return (
    <AnimatePresence>
      {!isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-botanical-deep"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
        >
          {/* Background botanical pattern */}
          <div className="absolute inset-0 opacity-20">
            <BotanicalFrame opacity={0.6} />
          </div>

          {/* Ambient glow */}
          <div className="absolute inset-0 bg-radial-[ellipse_at_center] from-botanical/20 via-transparent to-transparent" />

          <div className="relative flex flex-col items-center gap-10 px-6">
            {/* Bismillah */}
            <motion.p
              className="font-arabic text-gold-light text-2xl tracking-widest opacity-70"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 0.7, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              بِسْمِ ٱللَّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
            </motion.p>

            {/* Envelope illustration */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.9, ease: 'easeOut' }}
            >
              {/* Envelope body */}
              <motion.div
                className="relative w-72 h-48 md:w-96 md:h-60 cursor-pointer select-none"
                animate={{ y: hovered ? -6 : 0 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                onHoverStart={() => setHovered(true)}
                onHoverEnd={() => setHovered(false)}
                onClick={openInvitation}
              >
                {/* Envelope back */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-cream-100 to-cream-200 shadow-[0_30px_60px_-12px_rgba(0,0,0,0.5)]" />

                {/* Envelope flap (top triangle) */}
                <motion.div
                  className="absolute top-0 left-0 right-0 h-28 md:h-36 overflow-hidden"
                  style={{ borderRadius: '16px 16px 0 0' }}
                >
                  <motion.div
                    className="absolute inset-0"
                    animate={{ rotateX: hovered ? -160 : 0, transformOrigin: 'top' }}
                    transition={{ duration: 0.5, ease: 'easeInOut' }}
                    style={{ transformStyle: 'preserve-3d' }}
                  >
                    <svg viewBox="0 0 384 140" className="w-full h-full" preserveAspectRatio="none">
                      <polygon points="0,0 384,0 192,140" fill="#EFECE0" />
                      <line x1="0" y1="0" x2="192" y2="140" stroke="#C5A059" strokeWidth="0.5" opacity="0.4" />
                      <line x1="384" y1="0" x2="192" y2="140" stroke="#C5A059" strokeWidth="0.5" opacity="0.4" />
                    </svg>
                  </motion.div>
                </motion.div>

                {/* Bottom chevrons */}
                <div className="absolute bottom-0 left-0 right-0 overflow-hidden" style={{ height: '50%', borderRadius: '0 0 16px 16px' }}>
                  <svg viewBox="0 0 384 120" className="w-full h-full" preserveAspectRatio="none">
                    <polygon points="0,0 192,120 384,0 384,120 0,120" fill="#F7F4EB" />
                    <line x1="0" y1="0" x2="192" y2="120" stroke="#C5A059" strokeWidth="0.5" opacity="0.4" />
                    <line x1="384" y1="0" x2="192" y2="120" stroke="#C5A059" strokeWidth="0.5" opacity="0.4" />
                  </svg>
                </div>

                {/* Gold border on envelope */}
                <div className="absolute inset-0 rounded-2xl border border-gold/30 pointer-events-none" />
                <div className="absolute inset-1 rounded-xl border border-gold/15 pointer-events-none" />

                {/* Wax seal */}
                <motion.div
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
                  animate={{ scale: hovered ? 1.08 : 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="wax-seal-glow w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-gold via-gold-dark to-[#7A5C28] flex items-center justify-center shadow-wax">
                    <svg viewBox="0 0 40 40" className="w-10 h-10 md:w-12 md:h-12">
                      {/* Decorative seal with initials A & E */}
                      <circle cx="20" cy="20" r="18" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="0.8" />
                      <circle cx="20" cy="20" r="15" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="0.5" strokeDasharray="2 2" />
                      {/* A */}
                      <text x="12" y="24" fontFamily="Cinzel, serif" fontSize="10" fill="rgba(255,255,255,0.9)" textAnchor="middle">A</text>
                      {/* & */}
                      <text x="20" y="24" fontFamily="Great Vibes, cursive" fontSize="10" fill="rgba(255,255,255,0.7)" textAnchor="middle">&</text>
                      {/* E */}
                      <text x="28" y="24" fontFamily="Cinzel, serif" fontSize="10" fill="rgba(255,255,255,0.9)" textAnchor="middle">E</text>
                    </svg>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>

            {/* CTA */}
            <motion.div
              className="flex flex-col items-center gap-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
            >
              <motion.button
                className="cinzel-heading text-gold-light text-sm tracking-[0.25em] uppercase border border-gold/40 px-8 py-3 rounded-full hover:border-gold hover:bg-gold/10 transition-all duration-300"
                onClick={openInvitation}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                Open Invitation
              </motion.button>
              <p className="text-cream-200/40 text-xs tracking-widest font-sans">
                Tap the seal to reveal
              </p>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
