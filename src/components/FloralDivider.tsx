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
        <line x1="0" y1="15" x2="100" y2="15" stroke={strokeColor} strokeWidth="0.8" opacity="0.5" />
        {/* Left leaf */}
        <path d="M95,15 Q110,5 115,15 Q110,25 95,15Z" fill={fillColor} opacity="0.4" />
        <path d="M80,15 Q90,8 95,15 Q90,22 80,15Z" fill={fillColor} opacity="0.25" />
        {/* Center diamond ornament */}
        <path d="M140,8 L150,15 L140,22 L130,15 Z" fill={strokeColor} opacity="0.6" />
        <path d="M143,11 L150,15 L143,19 L136,15 Z" fill={strokeColor} opacity="0.8" />
        {/* Center dots */}
        <circle cx="122" cy="15" r="1.5" fill={strokeColor} opacity="0.7" />
        <circle cx="178" cy="15" r="1.5" fill={strokeColor} opacity="0.7" />
        {/* Right leaf */}
        <path d="M205,15 Q190,5 185,15 Q190,25 205,15Z" fill={fillColor} opacity="0.4" />
        <path d="M220,15 Q210,8 205,15 Q210,22 220,15Z" fill={fillColor} opacity="0.25" />
        {/* Right line */}
        <line x1="200" y1="15" x2="300" y2="15" stroke={strokeColor} strokeWidth="0.8" opacity="0.5" />
      </svg>
    </motion.div>
  );
}
