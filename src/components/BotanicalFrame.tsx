import { motion } from 'framer-motion';

interface BotanicalFrameProps {
  className?: string;
  opacity?: number;
}

export default function BotanicalFrame({ className = '', opacity = 1 }: BotanicalFrameProps) {
  return (
    <motion.div
      className={`pointer-events-none absolute inset-0 ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity }}
      transition={{ duration: 1.2, ease: 'easeOut' }}
    >
      <svg
        viewBox="0 0 400 600"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute inset-0 w-full h-full"
        preserveAspectRatio="xMidYMid slice"
      >
        {/* Top-left corner botanical */}
        <g opacity="0.18" fill="none" stroke="#3F5844" strokeWidth="0.8">
          {/* Large leaf top-left */}
          <path d="M0,0 Q40,60 20,120 Q-20,80 0,0Z" fill="#3F5844" opacity="0.15" />
          <path d="M0,0 Q60,40 120,20 Q80,-20 0,0Z" fill="#3F5844" opacity="0.12" />
          {/* Stem */}
          <path d="M0,0 Q30,50 60,100" strokeWidth="1" opacity="0.4" />
          {/* Small leaves */}
          <path d="M20,30 Q35,20 45,35 Q30,45 20,30Z" fill="#6B8E70" opacity="0.5" />
          <path d="M35,55 Q50,40 65,55 Q50,65 35,55Z" fill="#6B8E70" opacity="0.5" />
          <path d="M10,70 Q20,50 40,62 Q28,78 10,70Z" fill="#6B8E70" opacity="0.4" />
          {/* Fern fronds */}
          <path d="M5,5 Q15,25 25,20" strokeWidth="0.6" />
          <path d="M8,8 Q20,18 18,30" strokeWidth="0.6" />
          <path d="M12,12 Q25,15 22,28" strokeWidth="0.6" />
          {/* Berry dots */}
          <circle cx="55" cy="40" r="2" fill="#C5A059" opacity="0.6" />
          <circle cx="42" cy="18" r="1.5" fill="#C5A059" opacity="0.5" />
          <circle cx="18" cy="42" r="1.5" fill="#C5A059" opacity="0.5" />
        </g>

        {/* Top-right corner botanical (mirrored) */}
        <g opacity="0.18" fill="none" stroke="#3F5844" strokeWidth="0.8" transform="translate(400,0) scale(-1,1)">
          <path d="M0,0 Q40,60 20,120 Q-20,80 0,0Z" fill="#3F5844" opacity="0.15" />
          <path d="M0,0 Q60,40 120,20 Q80,-20 0,0Z" fill="#3F5844" opacity="0.12" />
          <path d="M0,0 Q30,50 60,100" strokeWidth="1" opacity="0.4" />
          <path d="M20,30 Q35,20 45,35 Q30,45 20,30Z" fill="#6B8E70" opacity="0.5" />
          <path d="M35,55 Q50,40 65,55 Q50,65 35,55Z" fill="#6B8E70" opacity="0.5" />
          <path d="M10,70 Q20,50 40,62 Q28,78 10,70Z" fill="#6B8E70" opacity="0.4" />
          <circle cx="55" cy="40" r="2" fill="#C5A059" opacity="0.6" />
          <circle cx="42" cy="18" r="1.5" fill="#C5A059" opacity="0.5" />
        </g>

        {/* Bottom-left corner */}
        <g opacity="0.18" fill="none" stroke="#3F5844" strokeWidth="0.8" transform="translate(0,600) scale(1,-1)">
          <path d="M0,0 Q40,60 20,120 Q-20,80 0,0Z" fill="#3F5844" opacity="0.15" />
          <path d="M0,0 Q60,40 120,20 Q80,-20 0,0Z" fill="#3F5844" opacity="0.12" />
          <path d="M0,0 Q30,50 60,100" strokeWidth="1" opacity="0.4" />
          <path d="M20,30 Q35,20 45,35 Q30,45 20,30Z" fill="#6B8E70" opacity="0.5" />
          <path d="M35,55 Q50,40 65,55 Q50,65 35,55Z" fill="#6B8E70" opacity="0.5" />
          <circle cx="55" cy="40" r="2" fill="#C5A059" opacity="0.6" />
        </g>

        {/* Bottom-right corner */}
        <g opacity="0.18" fill="none" stroke="#3F5844" strokeWidth="0.8" transform="translate(400,600) scale(-1,-1)">
          <path d="M0,0 Q40,60 20,120 Q-20,80 0,0Z" fill="#3F5844" opacity="0.15" />
          <path d="M0,0 Q60,40 120,20 Q80,-20 0,0Z" fill="#3F5844" opacity="0.12" />
          <path d="M0,0 Q30,50 60,100" strokeWidth="1" opacity="0.4" />
          <path d="M20,30 Q35,20 45,35 Q30,45 20,30Z" fill="#6B8E70" opacity="0.5" />
          <path d="M35,55 Q50,40 65,55 Q50,65 35,55Z" fill="#6B8E70" opacity="0.5" />
          <circle cx="55" cy="40" r="2" fill="#C5A059" opacity="0.6" />
        </g>

        {/* Center-top decorative sprig */}
        <g opacity="0.12" transform="translate(200,0)" fill="none" stroke="#3F5844" strokeWidth="0.7">
          <path d="M0,0 Q-20,30 0,60" />
          <path d="M0,15 Q-15,12 -20,25" />
          <path d="M0,25 Q15,22 20,35" />
          <path d="M0,35 Q-12,32 -15,45" />
        </g>

        {/* Center-bottom decorative sprig */}
        <g opacity="0.12" transform="translate(200,600) scale(1,-1)" fill="none" stroke="#3F5844" strokeWidth="0.7">
          <path d="M0,0 Q-20,30 0,60" />
          <path d="M0,15 Q-15,12 -20,25" />
          <path d="M0,25 Q15,22 20,35" />
          <path d="M0,35 Q-12,32 -15,45" />
        </g>

        {/* Thin gold border frame */}
        <rect x="12" y="12" width="376" height="576" rx="2"
          stroke="#C5A059" strokeWidth="0.6" fill="none" opacity="0.35" strokeDasharray="4 3" />
        <rect x="18" y="18" width="364" height="564" rx="1"
          stroke="#C5A059" strokeWidth="0.3" fill="none" opacity="0.2" />
      </svg>
    </motion.div>
  );
}
