import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Heart, Sparkles, Wand2 } from 'lucide-react';
import { WEDDING } from '../../data/weddingData';
import FloralDivider from '../FloralDivider';

// ── Scratch settings ─────────────────────────────────────────────────────────
// Triggers automatic full reveal upon reaching 50% completion
const REVEAL_THRESHOLD = 0.50;
const BRUSH_RADIUS     = 36;
const BRUSH_LINE_WIDTH = 72;

export default function ScratchSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cardRef   = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);
  const [progress, setProgress] = useState(0); // 0.0 to 1.0 (actual area cleared)
  const [isScratching, setIsScratching] = useState(false);
  const revealedRef = useRef(false);

  // ── Confetti celebration trigger ──────────────────────────────────────────
  const fireCelebration = useCallback(() => {
    const opts = {
      colors: ['#C5A059', '#EAD79B', '#D4AF37', '#3F5844', '#6B8E70', '#FFFFFF'],
      scalar: 1.25,
      ticks: 240,
    };
    // Center burst
    confetti({ particleCount: 110, spread: 90, origin: { y: 0.55 }, ...opts });
    // Left & Right cannon bursts
    setTimeout(() => {
      confetti({ particleCount: 65, angle: 60, spread: 70, origin: { x: 0.08, y: 0.6 }, ...opts });
      confetti({ particleCount: 65, angle: 120, spread: 70, origin: { x: 0.92, y: 0.6 }, ...opts });
    }, 120);
  }, []);

  // ── Trigger Instant / Final Reveal ────────────────────────────────────────
  const triggerReveal = useCallback(() => {
    if (revealedRef.current) return;
    revealedRef.current = true;
    setRevealed(true);
    setProgress(1.0);
    fireCelebration();
  }, [fireCelebration]);

  // ── Canvas Setup & Scratch Physics ────────────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let isDrawing = false;
    let prevX = 0;
    let prevY = 0;
    let tick = 0;
    const cleanups: (() => void)[] = [];

    // Render luxury metallic foil
    const drawFoil = () => {
      const W = canvas.offsetWidth;
      const H = canvas.offsetHeight;
      if (!W || !H) return;

      const dpr = window.devicePixelRatio || 1;
      canvas.width = W * dpr;
      canvas.height = H * dpr;

      const ctx = canvas.getContext('2d')!;
      ctx.scale(dpr, dpr);

      // Multi-stop liquid gold foil gradient
      const grad = ctx.createLinearGradient(0, 0, W, H);
      grad.addColorStop(0.00, '#9A7B38');
      grad.addColorStop(0.15, '#BF953F');
      grad.addColorStop(0.32, '#FCF6BA');
      grad.addColorStop(0.50, '#B38728');
      grad.addColorStop(0.68, '#FBF5B7');
      grad.addColorStop(0.85, '#AA771C');
      grad.addColorStop(1.00, '#855E18');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, W, H);

      // Delicate damask / cross-hatch stipple pattern
      ctx.fillStyle = 'rgba(255, 255, 255, 0.12)';
      for (let i = 0; i < 500; i++) {
        const x = Math.random() * W;
        const y = Math.random() * H;
        const r = Math.random() * 1.5 + 0.3;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fill();
      }

      // Fine golden grid lines
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
      ctx.lineWidth = 0.6;
      for (let x = 0; x < W; x += 18) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, H);
        ctx.stroke();
      }
      for (let y = 0; y < H; y += 18) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(W, y);
        ctx.stroke();
      }

      // Embossed outer frame on foil
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
      ctx.lineWidth = 1.2;
      ctx.strokeRect(12, 12, W - 24, H - 24);

      ctx.strokeStyle = 'rgba(0, 0, 0, 0.15)';
      ctx.lineWidth = 1.2;
      ctx.strokeRect(15, 15, W - 30, H - 30);

      // Central Embossed Emblem Badge
      const cx = W / 2;
      const cy = H / 2;

      // Glow behind emblem
      const glow = ctx.createRadialGradient(cx, cy, 10, cx, cy, 80);
      glow.addColorStop(0, 'rgba(255, 255, 255, 0.35)');
      glow.addColorStop(1, 'rgba(255, 255, 255, 0)');
      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(cx, cy, 80, 0, Math.PI * 2);
      ctx.fill();

      // Seal Medallion
      ctx.fillStyle = 'rgba(24, 36, 26, 0.75)';
      ctx.beginPath();
      ctx.arc(cx, cy - 14, 32, 0, Math.PI * 2);
      ctx.fill();

      ctx.strokeStyle = '#FBF5B7';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Monogram text in seal
      ctx.fillStyle = '#FCF6BA';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.font = '22px "Great Vibes", cursive';
      ctx.fillText('A & E', cx, cy - 12);

      // Foil Banner Typography
      ctx.fillStyle = '#18241A';
      ctx.font = 'bold 13px "Cinzel", serif';
      ctx.fillText('✦ SCRATCH TO REVEAL ✦', cx, cy + 36);

      ctx.fillStyle = 'rgba(24, 36, 26, 0.65)';
      ctx.font = '500 11px "Plus Jakarta Sans", sans-serif';
      ctx.fillText('Scratch 50% or tap to reveal date', cx, cy + 54);
    };

    const rafId = requestAnimationFrame(drawFoil);

    const getPos = (clientX: number, clientY: number) => {
      const rect = canvas.getBoundingClientRect();
      return { x: clientX - rect.left, y: clientY - rect.top };
    };

    const checkAndTrigger = () => {
      if (revealedRef.current) return;
      const ctx = canvas.getContext('2d')!;
      const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
      let cleared = 0;
      let total = 0;
      // Fast sampling (every 16th pixel)
      for (let i = 3; i < data.length; i += 4 * 16) {
        if (data[i] < 60) cleared++;
        total++;
      }
      const ratio = total > 0 ? cleared / total : 0;
      setProgress(ratio);
      setIsScratching(true);

      if (ratio >= REVEAL_THRESHOLD) {
        triggerReveal();
      }
    };

    const scratch = (x: number, y: number) => {
      if (revealedRef.current) return;
      const ctx = canvas.getContext('2d')!;
      ctx.globalCompositeOperation = 'destination-out';
      ctx.lineWidth = BRUSH_LINE_WIDTH;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      // Connect stroke for smooth line
      ctx.beginPath();
      ctx.moveTo(prevX || x, prevY || y);
      ctx.lineTo(x, y);
      ctx.stroke();

      // Circle stamp at current point
      ctx.beginPath();
      ctx.arc(x, y, BRUSH_RADIUS, 0, Math.PI * 2);
      ctx.fill();

      prevX = x;
      prevY = y;

      tick++;
      if (tick % 2 === 0) {
        checkAndTrigger();
      }
    };

    // Mouse handlers
    const onMouseDown = (e: MouseEvent) => {
      if (revealedRef.current) return;
      isDrawing = true;
      const { x, y } = getPos(e.clientX, e.clientY);
      prevX = x;
      prevY = y;
      scratch(x, y);
    };
    const onMouseMove = (e: MouseEvent) => {
      if (!isDrawing || revealedRef.current) return;
      const { x, y } = getPos(e.clientX, e.clientY);
      scratch(x, y);
    };
    const onMouseUp = () => {
      isDrawing = false;
      prevX = 0;
      prevY = 0;
      checkAndTrigger();
    };

    // Touch handlers with passive: false for smooth mobile scratching
    const onTouchStart = (e: TouchEvent) => {
      if (revealedRef.current) return;
      if (e.cancelable) e.preventDefault();
      isDrawing = true;
      const t = e.touches[0];
      const { x, y } = getPos(t.clientX, t.clientY);
      prevX = x;
      prevY = y;
      scratch(x, y);
    };
    const onTouchMove = (e: TouchEvent) => {
      if (revealedRef.current) return;
      if (e.cancelable) e.preventDefault();
      if (!isDrawing) return;
      const t = e.touches[0];
      const { x, y } = getPos(t.clientX, t.clientY);
      scratch(x, y);
    };
    const onTouchEnd = () => {
      isDrawing = false;
      prevX = 0;
      prevY = 0;
      checkAndTrigger();
    };

    canvas.addEventListener('mousedown', onMouseDown);
    canvas.addEventListener('mousemove', onMouseMove);
    canvas.addEventListener('mouseup', onMouseUp);
    canvas.addEventListener('mouseleave', onMouseUp);
    canvas.addEventListener('touchstart', onTouchStart, { passive: false });
    canvas.addEventListener('touchmove', onTouchMove, { passive: false });
    canvas.addEventListener('touchend', onTouchEnd);

    cleanups.push(
      () => canvas.removeEventListener('mousedown', onMouseDown),
      () => canvas.removeEventListener('mousemove', onMouseMove),
      () => canvas.removeEventListener('mouseup', onMouseUp),
      () => canvas.removeEventListener('mouseleave', onMouseUp),
      () => canvas.removeEventListener('touchstart', onTouchStart),
      () => canvas.removeEventListener('touchmove', onTouchMove),
      () => canvas.removeEventListener('touchend', onTouchEnd),
    );

    return () => {
      cancelAnimationFrame(rafId);
      cleanups.forEach((fn) => fn());
    };
  }, [triggerReveal]);

  return (
    <section className="section-reveal relative py-20 px-4 bg-gradient-to-b from-cream-100 to-cream-50 botanical-texture flex flex-col items-center gap-8">
      {/* ── Section Heading ── */}
      <motion.div
        className="flex flex-col items-center gap-3 text-center"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-gold" />
          <p className="font-cinzel text-gold text-xs tracking-[0.35em] uppercase font-semibold">
            Interactive Surprise
          </p>
          <Sparkles className="w-4 h-4 text-gold" />
        </div>

        <h2 className="font-serif text-botanical-dark text-3xl md:text-4xl italic">
          Reveal the Date
        </h2>
        <FloralDivider color="gold" />
        <p className="font-sans text-charcoal-light text-xs md:text-sm opacity-60 max-w-xs text-center">
          Scratch 50% of the foil or tap below to unveil our sacred wedding date
        </p>
      </motion.div>

      {/* ── Main Scratch Card Container ── */}
      <motion.div
        ref={cardRef}
        className="relative max-w-md w-full rounded-3xl overflow-hidden shadow-luxury"
        style={{
          border: '1.5px solid rgba(197, 160, 89, 0.4)',
          background: '#FDFBF7',
          boxShadow: '0 24px 60px -15px rgba(36, 51, 39, 0.12), 0 8px 24px -6px rgba(197, 160, 89, 0.18)',
        }}
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.65 }}
      >
        {/* ── Revealed Content (Under Foil) ── */}
        <div className="p-8 md:p-10 flex flex-col items-center gap-3 text-center select-none relative overflow-hidden bg-gradient-to-b from-[#FFFDF9] via-[#FAF6ED] to-[#F5EFE1]">
          {/* Double inner gold filigree border */}
          <div className="absolute inset-3 border border-gold/30 rounded-2xl pointer-events-none" />
          <div className="absolute inset-4 border border-gold/15 rounded-xl pointer-events-none" />

          {/* Corner gold accents */}
          <div className="absolute top-4 left-4 w-3 h-3 border-t-2 border-l-2 border-gold/60" />
          <div className="absolute top-4 right-4 w-3 h-3 border-t-2 border-r-2 border-gold/60" />
          <div className="absolute bottom-4 left-4 w-3 h-3 border-b-2 border-l-2 border-gold/60" />
          <div className="absolute bottom-4 right-4 w-3 h-3 border-b-2 border-r-2 border-gold/60" />

          {/* Bismillah Calligraphy */}
          <p className="font-arabic text-botanical opacity-75 text-xl leading-loose mt-1">
            {WEDDING.bismillah}
          </p>

          <div className="gold-line w-28 my-1 opacity-70" />

          {/* Month & Day */}
          <p className="font-cinzel text-gold-dark text-xs tracking-[0.4em] uppercase font-semibold">
            September 2026
          </p>

          {/* Majestic Center Date Layout */}
          <div className="flex items-center justify-center gap-6 my-2">
            {/* Left Tag */}
            <div className="flex flex-col items-end gap-1">
              <span className="font-cinzel text-[10px] tracking-[0.25em] uppercase text-botanical font-bold">
                Friday
              </span>
              <div className="w-8 h-px bg-gradient-to-l from-gold to-transparent" />
            </div>

            {/* Giant Gold Day Number */}
            <div className="flex flex-col items-center">
              <span
                className="font-serif font-extrabold leading-none text-gold-shimmer"
                style={{
                  fontSize: 'clamp(4.5rem, 16vw, 6rem)',
                  textShadow: '0 4px 18px rgba(197, 160, 89, 0.25)',
                }}
              >
                04
              </span>
            </div>

            {/* Right Tag */}
            <div className="flex flex-col items-start gap-1">
              <span className="font-cinzel text-[10px] tracking-[0.25em] uppercase text-botanical font-bold">
                2:00 PM
              </span>
              <div className="w-8 h-px bg-gradient-to-r from-gold to-transparent" />
            </div>
          </div>

          {/* Ribbon Pill: Our Forever Begins */}
          <div className="flex items-center gap-2 px-5 py-1.5 rounded-full bg-gold/15 border border-gold/35 mt-1 shadow-sm">
            <Heart className="w-3.5 h-3.5 text-gold" fill="#C5A059" />
            <span className="font-serif text-botanical-dark italic text-sm font-medium">
              Our Forever Begins
            </span>
            <Heart className="w-3.5 h-3.5 text-gold" fill="#C5A059" />
          </div>

          {/* Venue & Location */}
          <p className="font-sans text-charcoal-light text-xs opacity-60 mt-1">
            {WEDDING.venueName} • {WEDDING.venueAddress}
          </p>
        </div>

        {/* ── Metallic Foil Canvas Overlay with Framer Motion Dissolve ── */}
        <motion.canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full"
          style={{
            cursor: revealed ? 'default' : 'crosshair',
            zIndex: 20,
            touchAction: 'none',
          }}
          initial={{ opacity: 1 }}
          animate={{
            opacity: revealed ? 0 : 1,
            pointerEvents: revealed ? 'none' : 'auto',
          }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
        />
      </motion.div>

      {/* ── Quick Action / Status Feedback ── */}
      <div className="flex flex-col items-center gap-3">
        <AnimatePresence mode="wait">
          {!revealed ? (
            <motion.div
              key="scratching-controls"
              className="flex flex-col items-center gap-2.5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {/* Progress Indicator when scratching: shows actual card % towards 50% */}
              {isScratching && progress > 0.02 && (
                <div className="flex flex-col items-center gap-1">
                  <div className="flex items-center gap-2">
                    <div className="w-36 h-2 rounded-full bg-cream-200 overflow-hidden border border-gold/20">
                      <motion.div
                        className="h-full bg-gradient-to-r from-gold to-gold-dark rounded-full"
                        style={{ width: `${Math.min(100, Math.round((progress / REVEAL_THRESHOLD) * 100))}%` }}
                        transition={{ duration: 0.1 }}
                      />
                    </div>
                    <span className="font-cinzel text-xs text-gold font-bold">
                      {Math.round(progress * 100)}% / 50%
                    </span>
                  </div>
                  <span className="font-sans text-[10px] text-charcoal-light/50">
                    {Math.round(progress * 100) >= 50
                      ? 'Revealing…'
                      : `${50 - Math.round(progress * 100)}% more to auto-reveal`}
                  </span>
                </div>
              )}

              {/* Instant One-Tap Reveal Button */}
              <motion.button
                onClick={triggerReveal}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-gold/40 shadow text-botanical font-cinzel text-xs tracking-widest uppercase hover:bg-gold hover:text-white hover:border-gold transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Wand2 className="w-3.5 h-3.5 text-gold-dark" />
                <span>Tap to Reveal Instantly</span>
              </motion.button>
            </motion.div>
          ) : (
            <motion.div
              key="revealed-badge"
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-botanical/10 border border-botanical/30 text-botanical font-cinzel text-xs tracking-widest uppercase shadow-sm"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
            >
              <Sparkles className="w-4 h-4 text-gold" />
              <span>✦ September 04, 2026 Revealed ✦</span>
              <Sparkles className="w-4 h-4 text-gold" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
