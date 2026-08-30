import { motion } from 'framer-motion';

interface FloralDividerProps {
  className?: string;
  color?: 'gold' | 'botanical';
}

export default function FloralDivider({ className = '', color = 'gold' }: FloralDividerProps) {
  const strokeColor = color === 'gold' ? '#C5A059' : '#3F5844';
  const fillColor = color === 'gold' ? '#C5A059' : '#6B8E70';

  return (
    <motion.div
      className={`flex items-center justify-center w-full my-4 ${className}`}
      initial={{ opacity: 0, scaleX: 0.4 }}
      whileInView={{ opacity: 1, scaleX: 1 }}
      viewport={{ once: true, margin: '-20px' }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      <svg viewBox="0 0 300 30" className="w-full max-w-xs h-8" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Left line */}
        <line x1="0" y1="15" x2="108" y2="15" stroke={strokeColor} strokeWidth="0.8" opacity="0.5" />
        {/* Left leaves */}
        <path d="M105,15 Q120,5 125,15 Q120,25 105,15Z" fill={fillColor} opacity="0.4" />
        <path d="M90,15 Q100,8 105,15 Q100,22 90,15Z" fill={fillColor} opacity="0.25" />
        {/* Center dots — equidistant from center (x=150) */}
        <circle cx="132" cy="15" r="1.5" fill={strokeColor} opacity="0.7" />
        <circle cx="168" cy="15" r="1.5" fill={strokeColor} opacity="0.7" />
        {/* Center diamond — symmetric around x=150 */}
        <path d="M140,15 L150,8 L160,15 L150,22 Z" fill={strokeColor} opacity="0.6" />
        <path d="M144,15 L150,11 L156,15 L150,19 Z" fill={strokeColor} opacity="0.85" />
        {/* Right leaves — mirror of left */}
        <path d="M195,15 Q180,5 175,15 Q180,25 195,15Z" fill={fillColor} opacity="0.4" />
        <path d="M210,15 Q200,8 195,15 Q200,22 210,15Z" fill={fillColor} opacity="0.25" />
        {/* Right line */}
        <line x1="192" y1="15" x2="300" y2="15" stroke={strokeColor} strokeWidth="0.8" opacity="0.5" />
      </svg>
    </motion.div>
  );
}
