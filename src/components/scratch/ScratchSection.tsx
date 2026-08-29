import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Heart } from 'lucide-react';
import { WEDDING } from '../../data/weddingData';
import FloralDivider from '../FloralDivider';

const REVEAL_THRESHOLD = 0.45; // 45% scratched

// ── Component ────────────────────────────────────────────────────────────────
export default function ScratchSection() {
  const canvasRef  = useRef<HTMLCanvasElement>(null);
  const cardRef    = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed]   = useState(false);
  const [progress, setProgress]   = useState(0);
  const [hint, setHint]           = useState(false); // show progress text once scratching starts

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // ── Mutable closure state ────────────────────────────────────────────
    let isDrawing      = false;
    let prevX          = 0;
    let prevY          = 0;
    let isRevealed     = false;
    let sampleTick     = 0;
    const cleanupFns: (() => void)[] = [];

    // ── Canvas initialisation ────────────────────────────────────────────
    const rafId = requestAnimationFrame(() => {
      const W = canvas.offsetWidth;
      const H = canvas.offsetHeight;
      if (!W || !H) return;

      const dpr = window.devicePixelRatio || 1;
      canvas.width  = W * dpr;
      canvas.height = H * dpr;

      const ctx = canvas.getContext('2d')!;
      ctx.scale(dpr, dpr);

      // Metallic gold → rose-gold → gold gradient
      const grad = ctx.createLinearGradient(0, 0, W, H);
      grad.addColorStop(0,    '#8B6B2E');
      grad.addColorStop(0.18, '#B8906A');
      grad.addColorStop(0.38, '#C5A059');
      grad.addColorStop(0.52, '#EAD79B');
      grad.addColorStop(0.68, '#C5A059');
      grad.addColorStop(0.82, '#B07845');
      grad.addColorStop(1,    '#8B6B2E');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, W, H);

      // Stipple shimmer overlay
      ctx.globalCompositeOperation = 'source-over';
      for (let i = 0; i < 420; i++) {
        const sx = Math.random() * W;
        const sy = Math.random() * H;
        const sr = Math.random() * 1.4 + 0.2;
        ctx.beginPath();
        ctx.arc(sx, sy, sr, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${0.06 + Math.random() * 0.18})`;
        ctx.fill();
      }

      // Cross-hatch shimmer lines
      ctx.strokeStyle = 'rgba(255,255,255,0.06)';
      ctx.lineWidth = 0.5;
      for (let i = -H; i < W + H; i += 12) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i + H, H);
        ctx.stroke();
      }

      // Main instruction text
      ctx.globalCompositeOperation = 'source-over';
      ctx.textAlign    = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillStyle    = 'rgba(24,36,26,0.60)';
      ctx.font         = `bold 14px "Plus Jakarta Sans", sans-serif`;
      ctx.fillText('✨  Scratch to Reveal Date  ✨', W / 2, H / 2 - 12);

      ctx.fillStyle = 'rgba(24,36,26,0.38)';
      ctx.font      = `11px "Cinzel", serif`;
      ctx.fillText('Use your finger or mouse', W / 2, H / 2 + 12);
    });

    // ── Scratch helpers ──────────────────────────────────────────────────
    const getPos = (clientX: number, clientY: number) => {
      const rect = canvas.getBoundingClientRect();
      return { x: clientX - rect.left, y: clientY - rect.top };
    };

    const checkRevealPercentage = () => {
      const ctx  = canvas.getContext('2d')!;
      const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
      let transparent = 0;
      let total       = 0;
      // Sample every 32nd pixel for performance
      for (let i = 3; i < data.length; i += 4 * 32) {
        if (data[i] < 80) transparent++;
        total++;
      }
      return total > 0 ? transparent / total : 0;
    };

    const triggerReveal = () => {
      if (isRevealed) return;
      isRevealed = true;
      setRevealed(true);

      // Gold + botanical confetti burst
      const opts = {
        colors: ['#C5A059', '#EAD79B', '#9A7B38', '#3F5844', '#6B8E70', '#FDFBF7'],
        scalar: 1.15,
      };
      confetti({ particleCount: 120, spread: 80, origin: { y: 0.5 }, ...opts });
      setTimeout(() => {
        confetti({ particleCount: 55, angle:  60, spread: 60, origin: { x: 0.0, y: 0.5 }, ...opts });
        confetti({ particleCount: 55, angle: 120, spread: 60, origin: { x: 1.0, y: 0.5 }, ...opts });
      }, 100);

      // Fade canvas out via direct DOM manipulation (no React re-render needed)
      let opacity = 1;
      const fade = setInterval(() => {
        opacity -= 0.07;
        if (canvas) canvas.style.opacity = String(Math.max(0, opacity));
        if (opacity <= 0) {
          clearInterval(fade);
          if (canvas) canvas.style.pointerEvents = 'none';
        }
      }, 25);
    };

    const scratch = (x: number, y: number) => {
      if (isRevealed) return;
      const ctx = canvas.getContext('2d')!;

      ctx.globalCompositeOperation = 'destination-out';
      ctx.lineWidth  = 40;
      ctx.lineCap    = 'round';
      ctx.lineJoin   = 'round';

      // Stroke from previous point for smooth continuous line
      ctx.beginPath();
      ctx.moveTo(prevX || x, prevY || y);
      ctx.lineTo(x, y);
      ctx.stroke();

      // Also fill a circle at current point for solid dot coverage
      ctx.beginPath();
      ctx.arc(x, y, 20, 0, Math.PI * 2);
      ctx.fill();

      prevX = x;
      prevY = y;

      // Sample percentage every 6 strokes (performance optimisation)
      sampleTick++;
      if (sampleTick % 6 === 0) {
        const ratio = checkRevealPercentage();
        setProgress(ratio);
        setHint(true);
        if (ratio >= REVEAL_THRESHOLD) triggerReveal();
      }
    };

    // ── Event handlers ────────────────────────────────────────────────────
    const onMouseDown = (e: MouseEvent) => {
      isDrawing = true;
      const { x, y } = getPos(e.clientX, e.clientY);
      prevX = x; prevY = y;
      scratch(x, y);
    };
    const onMouseMove = (e: MouseEvent) => {
      if (!isDrawing) return;
      const { x, y } = getPos(e.clientX, e.clientY);
      scratch(x, y);
    };
    const onMouseUp = () => { isDrawing = false; prevX = 0; prevY = 0; };

    const onTouchStart = (e: TouchEvent) => {
      e.preventDefault(); // ← stops page scroll while scratching
      isDrawing = true;
      const t = e.touches[0];
      const { x, y } = getPos(t.clientX, t.clientY);
      prevX = x; prevY = y;
      scratch(x, y);
    };
    const onTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      if (!isDrawing) return;
      const t = e.touches[0];
      const { x, y } = getPos(t.clientX, t.clientY);
      scratch(x, y);
    };
    const onTouchEnd = () => { isDrawing = false; prevX = 0; prevY = 0; };

    // Bind — note passive: false for touch events
    canvas.addEventListener('mousedown',  onMouseDown);
    canvas.addEventListener('mousemove',  onMouseMove);
    canvas.addEventListener('mouseup',    onMouseUp);
    canvas.addEventListener('mouseleave', onMouseUp);
    canvas.addEventListener('touchstart', onTouchStart, { passive: false });
    canvas.addEventListener('touchmove',  onTouchMove,  { passive: false });
    canvas.addEventListener('touchend',   onTouchEnd);

    cleanupFns.push(
      () => canvas.removeEventListener('mousedown',  onMouseDown),
      () => canvas.removeEventListener('mousemove',  onMouseMove),
      () => canvas.removeEventListener('mouseup',    onMouseUp),
      () => canvas.removeEventListener('mouseleave', onMouseUp),
      () => canvas.removeEventListener('touchstart', onTouchStart),
      () => canvas.removeEventListener('touchmove',  onTouchMove),
      () => canvas.removeEventListener('touchend',   onTouchEnd),
    );

    return () => {
      cancelAnimationFrame(rafId);
      cleanupFns.forEach(fn => fn());
    };
  }, []); // ← run once on mount

  return (
    <section className="section-reveal relative py-20 px-4 bg-gradient-to-b from-cream-100 to-cream-50 botanical-texture flex flex-col items-center gap-10">

      {/* ── Section heading ───────────────────────────────────────────── */}
      <div className="flex flex-col items-center gap-3 text-center">
        <p className="font-cinzel text-gold text-xs tracking-[0.4em] uppercase opacity-80">
          A Little Surprise
        </p>
        <h2 className="font-serif text-botanical-dark text-3xl md:text-4xl italic">
          Reveal the Date
        </h2>
        <FloralDivider color="gold" />
        <p className="font-sans text-charcoal-light text-sm opacity-50 max-w-xs text-center">
          Scratch away the foil to unveil your special invitation date
        </p>
      </div>

      {/* ── Scratch card ──────────────────────────────────────────────── */}
      <motion.div
        ref={cardRef}
        className="relative max-w-sm w-full rounded-2xl overflow-hidden"
        style={{
          border: '1px solid rgba(197,160,89,0.30)',
          boxShadow: '0 20px 40px -15px rgba(36,51,39,0.08), 0 4px 12px -4px rgba(197,160,89,0.08)',
          background: 'rgba(255,255,255,0.72)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
        }}
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
      >
        {/* ── Revealed date content (beneath the canvas) ───────────────── */}
        <div className="p-6 md:p-8 flex flex-col items-center gap-3 text-center select-none">
          {/* Bismillah */}
          <p className="font-arabic text-botanical opacity-60 text-lg leading-loose">
            {WEDDING.bismillah}
          </p>

          <div className="gold-line w-28 my-0.5" />

          {/* Month */}
          <p className="font-cinzel text-botanical-light text-xs tracking-[0.45em] uppercase">
            September
          </p>

          {/* ── Central date trio: FRIDAY | 04 | AT 2:00 PM ── */}
          <div className="flex items-center justify-center gap-5 my-2">
            {/* Left label */}
            <div className="flex flex-col items-end gap-1">
              <p className="font-sans text-[9px] tracking-[0.22em] uppercase text-charcoal-light opacity-50">
                Friday
              </p>
              <div style={{ width: 1, height: 36, background: 'linear-gradient(to bottom, transparent, rgba(197,160,89,0.5), transparent)' }} />
            </div>

            {/* Big day number */}
            <div className="flex flex-col items-center gap-1">
              <p
                className="font-serif font-bold text-botanical-dark leading-none"
                style={{ fontSize: 'clamp(4rem, 18vw, 5.5rem)', lineHeight: 1 }}
              >
                04
              </p>
              <div className="gold-line w-16" />
            </div>

            {/* Right label */}
            <div className="flex flex-col items-start gap-1">
              <p className="font-sans text-[9px] tracking-[0.22em] uppercase text-charcoal-light opacity-50">
                At 2:00 PM
              </p>
              <div style={{ width: 1, height: 36, background: 'linear-gradient(to bottom, transparent, rgba(197,160,89,0.5), transparent)' }} />
            </div>
          </div>

          {/* Year */}
          <p className="font-cinzel text-gold text-3xl tracking-[0.22em]">
            2026
          </p>

          <div className="gold-line w-36 my-1" />

          {/* Badge */}
          <div className="flex items-center gap-2.5 mt-0.5">
            <Heart className="w-3.5 h-3.5 text-gold" fill="#C5A059" />
            <p className="font-serif text-botanical italic text-sm opacity-72">
              Our Forever Begins
            </p>
            <Heart className="w-3.5 h-3.5 text-gold" fill="#C5A059" />
          </div>

          {/* Venue line */}
          <p className="font-sans text-charcoal-light text-[10px] opacity-38 mt-0.5 tracking-wide">
            {WEDDING.venueName}
          </p>
        </div>

        {/* ── Canvas scratch overlay ────────────────────────────────────
            Canvas is always rendered when not yet revealed.
            Its opacity is faded out by the triggerReveal closure.
        ──────────────────────────────────────────────────────────────── */}
        {!revealed && (
          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full"
            style={{ cursor: 'crosshair', zIndex: 10, touchAction: 'none' }}
          />
        )}

        {/* Gold border overlay */}
        <div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{ border: '1px solid rgba(197,160,89,0.28)', zIndex: 20 }}
        />
      </motion.div>

      {/* ── Scratch progress hint ─────────────────────────────────────── */}
      {!revealed && hint && progress > 0.04 && progress < REVEAL_THRESHOLD && (
        <motion.p
          className="font-sans text-xs text-charcoal-light tracking-widest"
          style={{ opacity: 0.38 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.38 }}
        >
          {Math.round(progress * 100)}% revealed — keep going…
        </motion.p>
      )}

      {/* ── Celebration message ───────────────────────────────────────── */}
      {revealed && (
        <motion.div
          className="flex flex-col items-center gap-2 text-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.55 }}
        >
          <p className="font-cinzel text-gold text-sm tracking-[0.3em] uppercase">
            🎉 The Date is Revealed!
          </p>
          <p className="font-sans text-charcoal-light text-xs opacity-48">
            We can't wait to celebrate with you on September 4th
          </p>
        </motion.div>
      )}
    </section>
  );
}
