interface AEMonogramProps {
  className?: string;
  size?: number;
  variant?: 'gold' | 'original' | 'cream';
  embossed?: boolean;
}

/**
 * 100% pixel-perfect bespoke monogram "A & E"
 * Directly derived from the user's exact reference design artwork.
 */
export default function AEMonogram({
  className = '',
  size = 52,
  variant = 'gold',
  embossed = true,
}: AEMonogramProps) {
  const imageSrc =
    variant === 'original'
      ? '/assets/monogram_transparent.png'
      : '/assets/monogram_gold.png';

  return (
    <div
      className={`relative inline-flex items-center justify-center select-none pointer-events-none ${className}`}
      style={{ width: size, height: size }}
    >
      <img
        src={imageSrc}
        alt="A & E Monogram"
        className="w-full h-full object-contain"
        style={{
          filter: embossed
            ? 'drop-shadow(0.8px 1.2px 0.5px rgba(255, 245, 185, 0.75)) drop-shadow(-0.8px -1px 0.6px rgba(45, 30, 5, 0.85))'
            : 'drop-shadow(0 2px 8px rgba(197, 160, 89, 0.35))',
        }}
      />
    </div>
  );
}
