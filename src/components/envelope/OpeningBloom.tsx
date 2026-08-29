import { motion } from 'framer-motion';

interface OpeningBloomProps {
  active: boolean;
}

export default function OpeningBloom({ active }: OpeningBloomProps) {
  if (!active) return null;

  return (
    <motion.div
      className="absolute inset-0 pointer-events-none z-40 flex items-center justify-center overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: [0, 1, 0.8, 0] }}
      transition={{ duration: 1.1, ease: 'easeOut' }}
    >
      {/* ── Central Golden Lens Flare Glow ── */}
      <motion.div
        className="w-96 h-96 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(253, 246, 186, 0.95) 0%, rgba(212, 175, 55, 0.6) 30%, rgba(197, 160, 89, 0.25) 55%, transparent 75%)',
          filter: 'blur(8px)',
        }}
        initial={{ scale: 0.2 }}
        animate={{ scale: [0.2, 2.4, 3.2] }}
        transition={{ duration: 0.95, ease: [0.16, 1, 0.3, 1] }}
      />

      {/* ── Radiant Golden Sunbeam Rays ── */}
      <motion.div
        className="absolute w-[500px] h-[500px]"
        initial={{ rotate: 0, scale: 0.3 }}
        animate={{ rotate: 90, scale: [0.3, 2.2, 2.8], opacity: [0, 1, 0] }}
        transition={{ duration: 1.0, ease: 'easeOut' }}
      >
        <svg viewBox="0 0 200 200" className="w-full h-full" fill="none">
          {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
            <line
              key={deg}
              x1="100"
              y1="100"
              x2={100 + 95 * Math.cos((deg * Math.PI) / 180)}
              y2={100 + 95 * Math.sin((deg * Math.PI) / 180)}
              stroke="url(#ray-grad)"
              strokeWidth={deg % 60 === 0 ? '3' : '1.5'}
              strokeLinecap="round"
            />
          ))}
          <defs>
            <linearGradient id="ray-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFF7D6" stopOpacity="0.9" />
              <stop offset="60%" stopColor="#D4AF37" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#C5A059" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </motion.div>

      {/* ── Soft Golden Ring Shockwave ── */}
      <motion.div
        className="absolute w-44 h-44 rounded-full"
        style={{
          border: '2px solid rgba(255, 246, 186, 0.8)',
          boxShadow: '0 0 35px rgba(212, 175, 55, 0.8)',
        }}
        initial={{ scale: 0.5, opacity: 1 }}
        animate={{ scale: 3.5, opacity: 0 }}
        transition={{ duration: 0.85, ease: 'easeOut' }}
      />
    </motion.div>
  );
}
