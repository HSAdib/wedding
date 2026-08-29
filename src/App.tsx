import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AudioProvider } from './context/AudioContext';
import WaxSealEnvelope from './components/envelope/WaxSealEnvelope';
import FloatingControls from './components/shared/FloatingControls';
import HeroSection from './components/hero/HeroSection';
import ScratchSection from './components/scratch/ScratchSection';
import CountdownSection from './components/countdown/CountdownSection';
import TimelineSection from './components/timeline/TimelineSection';
import VenueSection from './components/venue/VenueSection';
import RSVPSection from './components/rsvp/RSVPSection';
import FooterSection from './components/shared/FooterSection';
import FloralDivider from './components/FloralDivider';
import useSectionReveal from './hooks/useSectionReveal';

/** Aesthetic ornamental section break */
function SectionDivider({ color = 'gold' as 'gold' | 'botanical' }) {
  return (
    <div className="flex flex-col items-center gap-2 py-2 bg-cream-50">
      <FloralDivider color={color} />
    </div>
  );
}

/** Main invitation content — only mounted after envelope opens */
function InvitationContent() {
  useSectionReveal();

  return (
    <motion.main
      className="relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.9, ease: 'easeOut' }}
    >
      {/* 1. Hero Announcement */}
      <HeroSection />
      <SectionDivider color="gold" />

      {/* 2. Interactive Scratch-to-Reveal Date Card */}
      <ScratchSection />
      <SectionDivider color="botanical" />

      {/* 3. Live Countdown Timer */}
      <CountdownSection />
      <SectionDivider color="gold" />

      {/* 4. Program Timeline */}
      <TimelineSection />
      <SectionDivider color="botanical" />

      {/* 5. Venue & Navigation */}
      <VenueSection />
      <SectionDivider color="gold" />

      {/* 6. Interactive RSVP & Wishes */}
      <RSVPSection />

      {/* 7. Footer */}
      <FooterSection />
    </motion.main>
  );
}

function AppShell() {
  const [isOpen, setIsOpen] = useState(false);

  // Prevent background bounce scroll while the envelope is sealed
  useEffect(() => {
    if (!isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <>
      {/* Global persistent audio, share, and scroll-to-top controls */}
      {isOpen && <FloatingControls />}

      <AnimatePresence mode="wait">
        {!isOpen ? (
          /* Initial 3D Wax Seal Envelope Gate */
          <WaxSealEnvelope
            key="envelope"
            onComplete={() => setIsOpen(true)}
          />
        ) : (
          /* Main Invitation Experience */
          <InvitationContent key="invitation" />
        )}
      </AnimatePresence>
    </>
  );
}

export default function App() {
  return (
    <AudioProvider>
      <AppShell />
    </AudioProvider>
  );
}
