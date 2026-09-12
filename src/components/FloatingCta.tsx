import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export default function FloatingCta() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const hero = document.querySelector('#hero');
    const contact = document.querySelector('#contact');
    if (!hero || !contact) return;

    let pastHero = false;
    let inContact = false;
    const update = () => setVisible(pastHero && !inContact);

    const heroObserver = new IntersectionObserver(
      ([entry]) => {
        pastHero = !entry.isIntersecting && entry.boundingClientRect.top < 0;
        update();
      },
      { threshold: 0 },
    );
    const contactObserver = new IntersectionObserver(
      ([entry]) => {
        inContact = entry.isIntersecting;
        update();
      },
      { threshold: 0.15 },
    );

    heroObserver.observe(hero);
    contactObserver.observe(contact);
    return () => {
      heroObserver.disconnect();
      contactObserver.disconnect();
    };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.a
          href="#contact"
          data-cta="floating-contact"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 12 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="fixed bottom-5 right-5 z-40 flex items-center gap-2 rounded-full bg-[#F1EFEA] px-5 py-3 text-xs font-medium uppercase tracking-widest text-[#111111] shadow-[0_8px_24px_rgba(0,0,0,0.35)] transition-transform duration-200 hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#F1EFEA] sm:bottom-8 sm:right-8"
        >
          Have a project?
          <ArrowRight size={14} aria-hidden="true" />
        </motion.a>
      )}
    </AnimatePresence>
  );
}
