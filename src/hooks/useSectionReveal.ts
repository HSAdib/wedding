import { useEffect } from 'react';

/**
 * Attaches an IntersectionObserver to all .section-reveal elements
 * and toggles the .visible class to trigger CSS fade-in transitions.
 */
export default function useSectionReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.section-reveal');
    const obs = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            e.target.classList.add('visible');
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    );
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}
