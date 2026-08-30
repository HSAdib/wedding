import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Send, CheckCircle2, XCircle, MessageSquareHeart } from 'lucide-react';
import confetti from 'canvas-confetti';
import FloralDivider from '../FloralDivider';

interface Wish {
  id: string;
  name: string;
  contact: string;
  attending: boolean;
  message: string;
  timestamp: string;
}

const INITIAL_WISHES: Wish[] = [
  {
    id: '1',
    name: 'Tanvir Ahmed & Family',
    contact: '',
    attending: true,
    message: 'Barakallahu lakuma wa baraka alaikuma wa jama\'a bainakuma fee khair! So excited to celebrate with both of you.',
    timestamp: 'Just now',
  },
  {
    id: '2',
    name: 'Nusrat & Farhan',
    contact: '',
    attending: true,
    message: 'Wishing Adib and Esha a lifetime of unconditional love, peace, and immense joy. See you in Sylhet!',
    timestamp: '2 hours ago',
  },
];

export default function RSVPSection() {
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [attending, setAttending] = useState<boolean | null>(null);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [wishes, setWishes] = useState<Wish[]>(INITIAL_WISHES);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Please enter your full name.');
      return;
    }
    if (attending === null) {
      setError('Please select whether you will be attending.');
      return;
    }
    setError('');

    const newWish: Wish = {
      id: Date.now().toString(),
      name: name.trim(),
      contact: contact.trim(),
      attending,
      message: message.trim(),
      timestamp: 'Just now',
    };

    setWishes(prev => [newWish, ...prev]);
    setSubmitted(true);

    // Celebratory confetti burst
    const colors = ['#C5A059', '#EAD79B', '#3F5844', '#6B8E70', '#FDFBF7'];
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors,
    });
    setTimeout(() => {
      confetti({
        particleCount: 50,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors,
      });
      confetti({
        particleCount: 50,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors,
      });
    }, 150);
  };

  const handleReset = () => {
    setName('');
    setContact('');
    setAttending(null);
    setMessage('');
    setSubmitted(false);
  };

  return (
    <section className="section-reveal relative py-20 px-4 bg-gradient-to-b from-cream-50 via-cream-100 to-cream-50 botanical-texture flex flex-col items-center gap-12">
      {/* ── Section Header ── */}
      <motion.div
        className="flex flex-col items-center gap-3 text-center"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.62 }}
      >
        <p className="font-cinzel text-xs tracking-[0.3em] text-gold uppercase text-center opacity-90">
          CELEBRATE WITH US
        </p>
        <h2 className="font-serif text-3xl md:text-4xl text-botanical-dark text-center mt-1 mb-2 italic">
          Send Your Blessings &amp; RSVP
        </h2>
        <FloralDivider color="gold" />
        <p className="font-sans text-charcoal-light text-sm opacity-60 max-w-sm text-center">
          Kindly confirm your presence by August 20, 2026 to help us prepare your welcome.
        </p>
      </motion.div>

      {/* ── RSVP Card Container ── */}
      <div className="w-full max-w-xl mx-auto">
        <AnimatePresence mode="wait">
          {!submitted ? (
            <motion.form
              key="form"
              onSubmit={handleSubmit}
              className="bg-white/90 backdrop-blur-md border border-gold/30 rounded-3xl p-6 md:p-8 shadow-luxury relative overflow-hidden flex flex-col gap-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5 }}
            >
              {/* Subtle top shimmer accent */}
              <div
                className="absolute top-0 inset-x-0 h-1 pointer-events-none"
                style={{ background: 'linear-gradient(90deg, transparent, rgba(197,160,89,0.5), transparent)' }}
              />

              {/* 1. Full Name */}
              <div className="flex flex-col gap-1.5">
                <label className="font-cinzel text-xs tracking-widest text-botanical-dark uppercase font-semibold">
                  Full Name <span className="text-gold">*</span>
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="e.g., Tanvir Ahmed"
                  className="w-full px-4 py-3 rounded-xl border border-gold/20 bg-cream-50/50 text-charcoal placeholder-charcoal-light/40 focus:ring-2 focus:ring-botanical focus:border-transparent outline-none transition-all text-sm font-sans"
                />
              </div>

              {/* 2. Phone Number / Email */}
              <div className="flex flex-col gap-1.5">
                <label className="font-cinzel text-xs tracking-widest text-botanical-dark uppercase font-semibold">
                  Phone Number or Email <span className="text-charcoal-light/40 text-[10px] lowercase">(for updates)</span>
                </label>
                <input
                  type="text"
                  value={contact}
                  onChange={e => setContact(e.target.value)}
                  placeholder="e.g., +880 1700-000000 or email@domain.com"
                  className="w-full px-4 py-3 rounded-xl border border-gold/20 bg-cream-50/50 text-charcoal placeholder-charcoal-light/40 focus:ring-2 focus:ring-botanical focus:border-transparent outline-none transition-all text-sm font-sans"
                />
              </div>

              {/* 3. Attendance Status Pills */}
              <div className="flex flex-col gap-2">
                <label className="font-cinzel text-xs tracking-widest text-botanical-dark uppercase font-semibold">
                  Will You Attend? <span className="text-gold">*</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* Joyfully Accepts */}
                  <button
                    type="button"
                    onClick={() => setAttending(true)}
                    className={`flex items-center justify-center gap-2.5 py-3.5 px-4 rounded-2xl border transition-all duration-300 font-cinzel text-xs tracking-widest uppercase ${
                      attending === true
                        ? 'bg-botanical text-cream-50 border-botanical shadow-md scale-[1.02]'
                        : 'bg-cream-50/70 border-gold/25 text-botanical-dark hover:border-gold/50 hover:bg-cream-100/60'
                    }`}
                  >
                    <CheckCircle2 className={`w-4 h-4 ${attending === true ? 'text-gold-light' : 'text-botanical'}`} />
                    <span>Joyfully Accepts</span>
                  </button>

                  {/* Regretfully Declines */}
                  <button
                    type="button"
                    onClick={() => setAttending(false)}
                    className={`flex items-center justify-center gap-2.5 py-3.5 px-4 rounded-2xl border transition-all duration-300 font-cinzel text-xs tracking-widest uppercase ${
                      attending === false
                        ? 'bg-charcoal text-cream-50 border-charcoal shadow-md scale-[1.02]'
                        : 'bg-cream-50/70 border-gold/25 text-charcoal-light hover:border-gold/50 hover:bg-cream-100/60'
                    }`}
                  >
                    <XCircle className={`w-4 h-4 ${attending === false ? 'text-cream-200' : 'text-charcoal-light/60'}`} />
                    <span>Regretfully Declines</span>
                  </button>
                </div>
              </div>



              {/* 5. Heartfelt Message / Duas */}
              <div className="flex flex-col gap-1.5">
                <label className="font-cinzel text-xs tracking-widest text-botanical-dark uppercase font-semibold">
                  Heartfelt Message or Duas{' '}
                  <span className="text-charcoal-light/40 text-[10px] lowercase">(optional)</span>
                </label>
                <textarea
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  placeholder="Share your prayers, memories, and warm wishes for Adib & Esha..."
                  rows={3}
                  className="w-full px-4 py-3 rounded-xl border border-gold/20 bg-cream-50/50 text-charcoal placeholder-charcoal-light/40 focus:ring-2 focus:ring-botanical focus:border-transparent outline-none transition-all text-sm font-sans resize-none"
                />
              </div>

              {/* Error Message */}
              {error && (
                <motion.p
                  className="font-sans text-xs text-red-600 bg-red-50 border border-red-200 rounded-lg p-2.5 text-center"
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  {error}
                </motion.p>
              )}

              {/* Submit Button */}
              <motion.button
                type="submit"
                className="relative overflow-hidden w-full flex items-center justify-center gap-2.5 bg-gradient-to-r from-botanical-dark via-botanical to-botanical-dark text-cream-50 font-cinzel text-xs tracking-[0.25em] uppercase py-4 rounded-2xl shadow-lg border border-gold/40 hover:shadow-xl transition-all duration-300 group"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
              >
                {/* Shimmer sweep effect */}
                <div className="absolute inset-0 w-1/2 bg-gradient-to-r from-transparent via-gold/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-[300%] transition-transform duration-1000 ease-in-out pointer-events-none" />
                <Send className="w-4 h-4 text-gold-light" />
                <span>Send RSVP &amp; Blessings</span>
              </motion.button>
            </motion.form>
          ) : (
            /* ── Submission Confirmation Card ── */
            <motion.div
              key="confirmation"
              className="bg-white/95 backdrop-blur-md border border-gold/30 rounded-3xl p-8 md:p-10 shadow-luxury text-center flex flex-col items-center gap-5 relative overflow-hidden"
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            >
              {/* Gold celebratory badge */}
              <div className="w-16 h-16 rounded-full bg-gold/15 border border-gold/40 flex items-center justify-center shadow-inner">
                <Heart className="w-8 h-8 text-gold" fill="#C5A059" />
              </div>

              <div className="flex flex-col items-center gap-2">
                <p className="font-cinzel text-gold text-xs tracking-[0.3em] uppercase">
                  RSVP Received
                </p>
                <h3 className="font-serif text-botanical-dark text-3xl md:text-4xl italic">
                  Thank You, {name}!
                </h3>
              </div>

              <div className="gold-line w-24 my-1" />

              <p className="font-serif text-botanical text-base md:text-lg italic leading-relaxed max-w-md">
                "Thank you for your warm prayers! We cannot wait to celebrate with you."
              </p>

              <p className="font-sans text-charcoal-light text-xs opacity-65 max-w-sm leading-relaxed">
                {attending
                  ? 'We have recorded your confirmation. We look forward to celebrating with you at Crystal Palace on September 04, 2026.'
                  : 'We will miss having you in person, but your love and prayers remain close in our hearts.'}
              </p>

              <button
                onClick={handleReset}
                className="mt-3 font-cinzel text-xs tracking-widest text-gold uppercase hover:text-botanical transition-colors underline underline-offset-4"
              >
                Submit another response
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── Guest Wishes / Blessings Wall ── */}
      {wishes.length > 0 && (
        <motion.div
          className="w-full max-w-xl flex flex-col gap-4 mt-2"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-center gap-2 mb-2">
            <MessageSquareHeart className="w-4 h-4 text-gold opacity-75" />
            <p className="font-cinzel text-xs tracking-[0.25em] text-botanical-dark uppercase font-semibold">
              ✦ Guest Blessings &amp; Wishes ✦
            </p>
          </div>

          <div className="flex flex-col gap-3">
            {wishes.map((w) => (
              <motion.div
                key={w.id}
                className="bg-white/80 backdrop-blur-sm border border-gold/20 rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="flex items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-botanical/10 border border-gold/20 flex items-center justify-center font-cinzel text-xs font-bold text-botanical">
                      {w.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="font-cinzel text-xs text-botanical-dark font-medium">
                        {w.name}
                      </p>
                      <p className="font-sans text-[10px] text-charcoal-light/50">
                        {w.timestamp}
                      </p>
                    </div>
                  </div>
                  <span
                    className={`font-cinzel text-[10px] tracking-wider uppercase px-2.5 py-1 rounded-full border ${
                      w.attending
                        ? 'bg-botanical/10 border-botanical/30 text-botanical'
                        : 'bg-charcoal/10 border-charcoal/20 text-charcoal-light'
                    }`}
                  >
                    {w.attending ? '✓ Attending' : 'Decline'}
                  </span>
                </div>
                {w.message && (
                  <p className="font-serif text-charcoal text-sm italic opacity-85 leading-relaxed pl-10">
                    "{w.message}"
                  </p>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </section>
  );
}
