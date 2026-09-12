import { Linkedin, Instagram, Mail, ArrowUp } from 'lucide-react';
import { useLenis } from 'lenis/react';
import { SITE } from '../config/site';

const linkClass =
  'inline-flex items-center gap-1.5 text-[#D7E2EA]/60 transition-colors duration-200 hover:text-[#D7E2EA] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D7E2EA]';

export default function Footer() {
  const lenis = useLenis();

  const scrollToTop = () => {
    // route through Lenis when it's mounted (skipped under reduced motion),
    // otherwise a plain instant jump — never fight Lenis's own RAF loop with
    // a native window.scrollTo
    if (lenis) lenis.scrollTo(0);
    else window.scrollTo(0, 0);
  };

  return (
    <footer className="border-t border-white/10 bg-[#0C0C0C] px-5 py-10 sm:px-8 md:px-10">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-6 text-xs uppercase tracking-[0.1em] sm:flex-row sm:justify-between">
        <p className="text-[#D7E2EA]/60">
          Donald Jordy <span className="text-[#D7E2EA]/30">·</span> © {new Date().getFullYear()}
        </p>

        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
          {SITE.linkedinUrl && (
            <a href={SITE.linkedinUrl} target="_blank" rel="noopener noreferrer" className={linkClass}>
              <Linkedin size={14} aria-hidden="true" />
              LinkedIn
            </a>
          )}
          {SITE.instagramUrl && (
            <a href={SITE.instagramUrl} target="_blank" rel="noopener noreferrer" className={linkClass}>
              <Instagram size={14} aria-hidden="true" />
              Instagram
            </a>
          )}
          <a href={`mailto:${SITE.email}`} className={linkClass}>
            <Mail size={14} aria-hidden="true" />
            Email
          </a>
          <button type="button" onClick={scrollToTop} className={linkClass}>
            Back to Top
            <ArrowUp size={14} aria-hidden="true" />
          </button>
        </div>
      </div>
    </footer>
  );
}
