import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Navigation, Copy, CheckCheck, ExternalLink } from 'lucide-react';
import { WEDDING } from '../../data/weddingData';
import FloralDivider from '../FloralDivider';

const VENUE_NAME    = 'Crystal Palace';
const VENUE_BUILDING= 'Sadik Tower (Level-6)';
const VENUE_AREA    = 'Noyashorok, Sylhet';
const FULL_ADDRESS  = `${VENUE_NAME}, ${VENUE_BUILDING}, ${VENUE_AREA}`;
const MAPS_URL      = WEDDING.mapsUrl;

// ── Stylised map placeholder (for browsers where iFrame may not load) ─────────
function MapPreview() {
  return (
    <div className="relative h-56 overflow-hidden" style={{ background: '#1e2d22' }}>
      {/* Embedded Google Map with botanical tint */}
      <iframe
        title="Crystal Palace Venue Map"
        src={`https://maps.google.com/maps?q=${WEDDING.mapsQuery}&output=embed&z=16&hl=en`}
        width="100%"
        height="100%"
        style={{ border: 0, filter: 'sepia(0.25) saturate(0.85) hue-rotate(55deg)', display: 'block' }}
        loading="lazy"
        allowFullScreen
        referrerPolicy="no-referrer-when-downgrade"
      />

      {/* Gradient fade at bottom for seamless blending */}
      <div
        className="absolute inset-x-0 bottom-0 h-16 pointer-events-none"
        style={{ background: 'linear-gradient(to top, #FDFBF7 0%, transparent 100%)' }}
      />

      {/* Top gold border accent */}
      <div
        className="absolute inset-x-0 top-0 h-px pointer-events-none"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(197,160,89,0.5), transparent)' }}
      />

      {/* Map pin overlay */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <motion.div
          animate={{ y: [0, -5, 0] }}
          transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
          className="flex flex-col items-center"
        >
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center"
            style={{
              background: 'rgba(197,160,89,0.92)',
              boxShadow: '0 4px 20px rgba(197,160,89,0.6)',
            }}
          >
            <MapPin className="w-4 h-4" style={{ color: '#FDFBF7' }} />
          </div>
          <div
            className="w-2 h-2 mt-0 rounded-full"
            style={{ background: 'rgba(197,160,89,0.6)', transform: 'scaleY(0.4) translateY(-4px)' }}
          />
        </motion.div>
      </div>
    </div>
  );
}

// ── Copy button with toast ────────────────────────────────────────────────────
function CopyAddressButton() {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(FULL_ADDRESS);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      // Fallback for older browsers
      const el = document.createElement('textarea');
      el.value = FULL_ADDRESS;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    }
  }, []);

  return (
    <div className="relative flex-1">
      <button
        onClick={handleCopy}
        className="w-full flex items-center justify-center gap-2 font-cinzel text-xs tracking-widest uppercase py-3.5 px-4 rounded-full transition-all duration-300"
        style={{
          border: '1px solid rgba(197,160,89,0.35)',
          color: '#C5A059',
          background: 'transparent',
        }}
        onMouseEnter={e => {
          (e.currentTarget as HTMLElement).style.background = 'rgba(197,160,89,0.08)';
          (e.currentTarget as HTMLElement).style.borderColor = 'rgba(197,160,89,0.65)';
        }}
        onMouseLeave={e => {
          (e.currentTarget as HTMLElement).style.background = 'transparent';
          (e.currentTarget as HTMLElement).style.borderColor = 'rgba(197,160,89,0.35)';
        }}
      >
        <AnimatePresence mode="wait">
          {copied ? (
            <motion.span
              key="done"
              className="flex items-center gap-1.5"
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <CheckCheck className="w-3.5 h-3.5 text-botanical" />
              <span style={{ color: '#3F5844' }}>Copied!</span>
            </motion.span>
          ) : (
            <motion.span
              key="copy"
              className="flex items-center gap-1.5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Copy className="w-3.5 h-3.5" />
              Copy Address
            </motion.span>
          )}
        </AnimatePresence>
      </button>

      {/* Toast popup */}
      <AnimatePresence>
        {copied && (
          <motion.div
            className="absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-sans"
            style={{
              background: 'rgba(36,51,39,0.88)',
              color: '#EAD79B',
              backdropFilter: 'blur(8px)',
              pointerEvents: 'none',
            }}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.22 }}
          >
            📋 Address Copied!
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── Detail row ─────────────────────────────────────────────────────────────────
function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center gap-2">
      <span
        className="font-cinzel text-[9px] tracking-widest uppercase"
        style={{ color: 'rgba(197,160,89,0.7)', minWidth: 60 }}
      >
        {label}
      </span>
      <div className="flex-1 h-px" style={{ background: 'rgba(197,160,89,0.2)' }} />
      <span className="font-sans text-charcoal-light text-xs opacity-65">{value}</span>
    </div>
  );
}

// ── Section ────────────────────────────────────────────────────────────────────
export default function VenueSection() {
  return (
    <section className="section-reveal relative py-20 px-4 bg-gradient-to-b from-cream-100 to-cream-50 botanical-texture flex flex-col items-center gap-12">

      {/* ── Heading ── */}
      <motion.div
        className="flex flex-col items-center gap-3 text-center"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.62 }}
      >
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-gold opacity-75" />
          <p className="font-cinzel text-gold text-xs tracking-[0.35em] uppercase opacity-85">
            Venue &amp; Location
          </p>
        </div>
        <h2 className="font-serif text-botanical-dark text-3xl md:text-4xl italic mt-1">
          Where We Celebrate
        </h2>
        <FloralDivider color="gold" />
      </motion.div>

      {/* ── Venue card ── */}
      <motion.div
        className="w-full max-w-md rounded-3xl overflow-hidden"
        style={{
          background: '#FDFBF7',
          border: '1px solid rgba(197,160,89,0.28)',
          boxShadow: '0 24px 56px -16px rgba(36,51,39,0.14), 0 6px 16px -6px rgba(0,0,0,0.06)',
        }}
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
      >
        {/* Map */}
        <MapPreview />

        {/* Venue info */}
        <div className="px-6 pt-5 pb-6 flex flex-col gap-4">

          {/* Name + address block */}
          <div className="flex items-start gap-3">
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
              style={{
                background: 'rgba(63,88,68,0.1)',
                border: '1px solid rgba(197,160,89,0.25)',
              }}
            >
              <MapPin className="w-4 h-4" style={{ color: '#3F5844' }} />
            </div>
            <div>
              <h3 className="font-cinzel text-botanical-dark text-base font-medium tracking-wide">
                {VENUE_NAME}
              </h3>
              <p className="font-sans text-charcoal-light text-sm opacity-55 mt-0.5">
                {VENUE_BUILDING}
              </p>
            </div>
          </div>

          {/* Detail rows */}
          <div className="flex flex-col gap-2 py-1">
            <DetailRow label="Building" value={VENUE_BUILDING} />
            <DetailRow label="Area"     value={VENUE_AREA} />
            <DetailRow label="Date"     value="Friday, September 04, 2026" />
            <DetailRow label="Time"     value="2:00 PM (BST +6)" />
          </div>

          {/* Gold divider */}
          <div
            className="h-px"
            style={{ background: 'linear-gradient(90deg, transparent, rgba(197,160,89,0.35), transparent)' }}
          />

          {/* Action buttons */}
          <div className="flex gap-3">
            {/* Primary — View on Google Maps */}
            <a
              href={MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 font-cinzel text-xs tracking-widest uppercase py-3.5 px-4 rounded-full transition-all duration-300"
              style={{
                background: '#3F5844',
                color: '#F7F4EB',
                boxShadow: '0 4px 16px -4px rgba(36,51,39,0.4)',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.background = '#243327';
                (e.currentTarget as HTMLElement).style.transform  = 'scale(1.03)';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.background = '#3F5844';
                (e.currentTarget as HTMLElement).style.transform  = 'scale(1)';
              }}
            >
              <Navigation className="w-3.5 h-3.5" />
              Get Directions
            </a>

            {/* Secondary — Copy Address */}
            <CopyAddressButton />
          </div>

          {/* Open in new tab link */}
          <a
            href={MAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-1.5 font-sans text-[10px] opacity-40 hover:opacity-65 transition-opacity duration-200"
            style={{ color: '#4A5568' }}
          >
            <ExternalLink className="w-3 h-3" />
            View on Google Maps
          </a>
        </div>
      </motion.div>

      {/* ── Venue quote ── */}
      <motion.div
        className="text-center max-w-sm"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3, duration: 0.7 }}
      >
        <p className="font-serif text-botanical italic text-base opacity-65 leading-relaxed">
          "An evening of elegance awaits at the{' '}
          <span className="text-gold not-italic font-semibold">Crystal Palace</span>
          {' '}— where joy, love, and memories fill every corner."
        </p>
      </motion.div>
    </section>
  );
}
