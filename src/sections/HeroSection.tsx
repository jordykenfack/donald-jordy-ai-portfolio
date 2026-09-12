import { MotionConfig, motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import FadeIn from '../components/FadeIn';
import PortfolioSwitcher from '../components/PortfolioSwitcher';
import VideoPlayer from '../components/VideoPlayer';
import { CTA } from '../config/site';

const NAV_LINKS = [
  { label: 'Work', href: '#work' },
  { label: 'Services', href: '#services' },
  { label: 'Contact', href: '#contact' },
];

// editorial mono headline: each line carries its own weight
const HEADLINE_LINES = [
  { text: 'Websites that bring in leads.', weight: 500 },
  { text: 'AI systems that handle the rest.', weight: 600 },
];

const navLinkClass =
  'text-[clamp(0.72rem,0.8vw,0.9rem)] font-medium uppercase tracking-[0.08em] text-[#111111] transition-opacity duration-200 hover:opacity-60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#111111]';

export default function HeroSection() {
  return (
    <MotionConfig reducedMotion="user">
      <section
        id="hero"
        className="relative flex min-h-[100svh] flex-col bg-[#F1EFEA] pb-10 font-helvetica text-[#111111] md:pb-14"
        style={{ overflowX: 'clip' }}
      >
        <FadeIn delay={0} y={-16} as="header">
          <nav
            aria-label="Primary"
            className="flex flex-wrap items-center justify-between gap-y-3 px-6 pt-5 md:grid md:grid-cols-[1fr_auto_1fr] md:px-10 md:pt-6"
          >
            <div className="flex items-center gap-4">
              <a
                href="#"
                aria-label="Donald Jordy, home"
                className="rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#111111]"
              >
                <img
                  src="/donald.jpg"
                  alt="Donald Jordy"
                  className="h-9 w-9 rounded-full object-cover"
                />
              </a>
              <PortfolioSwitcher />
            </div>
            <div className="order-3 flex w-full justify-center gap-7 md:order-none md:w-auto md:gap-12">
              {NAV_LINKS.map(({ label, href }) => (
                <a key={label} href={href} className={navLinkClass}>
                  {label}
                </a>
              ))}
            </div>
            <a href="#contact" data-cta="nav-start-project" className={`${navLinkClass} md:justify-self-end`}>
              {CTA.primary}
            </a>
          </nav>
        </FadeIn>

        {/* poster group sits high under the nav, with the video filling the
            remaining space below rather than the whole group centering */}
        <div className="flex flex-1 flex-col gap-3.5 pt-6 md:gap-4 md:pt-8">
          <h1
            className="text-center font-plexmono uppercase"
            style={{
              fontSize: 'clamp(1.65rem, 3.6vw, 3.4rem)',
              lineHeight: 1.1,
              letterSpacing: '-0.03em',
            }}
          >
            {HEADLINE_LINES.map(({ text, weight }, i) => (
              <span key={text} className="block overflow-hidden">
                {/* mount animation, not whileInView: a fully clipped line never
                    intersects the viewport, so the observer would never fire */}
                <motion.span
                  className="block"
                  style={{ fontWeight: weight }}
                  initial={{ y: '100%' }}
                  animate={{ y: 0 }}
                  transition={{ delay: 0.1 + i * 0.12, duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
                >
                  {text}
                </motion.span>
              </span>
            ))}
          </h1>

          <FadeIn delay={0.4} y={20}>
            <p className="mx-auto max-w-[680px] px-6 text-center text-[13px] font-normal leading-[1.5] text-[#2E2E2E] sm:whitespace-nowrap sm:text-sm">
              I build websites and automations that capture leads, automate follow-ups, and reduce
              repetitive work.
            </p>
          </FadeIn>

          <FadeIn delay={0.5} y={16}>
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
              <a
                href="#contact"
                data-cta="hero-start-project"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#111111] px-8 py-3 text-xs font-medium uppercase tracking-widest text-[#F1EFEA] transition-transform duration-200 hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#111111] sm:px-9 sm:py-3.5 sm:text-sm"
              >
                {CTA.primary} →
              </a>
              <a
                href="#work"
                data-cta="hero-see-work"
                className="inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-widest text-[#111111]/70 transition-colors duration-200 hover:text-[#111111] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#111111] sm:text-sm"
              >
                {CTA.secondary}
                <ChevronDown size={15} aria-hidden="true" />
              </a>
            </div>
          </FadeIn>

          <FadeIn delay={0.6} y={30} className="mt-2 flex flex-1 flex-col justify-center">
            <div className="mx-auto w-full max-w-[1200px] px-4 sm:px-6 md:px-10">
              <VideoPlayer
                title="How Donald approaches websites, automation and AI"
                videoSrc="/videos/vsl.mp4"
                posterSrc="/videos/vsl-poster.jpg"
                duration="1:05"
              />
            </div>
          </FadeIn>
        </div>
      </section>
    </MotionConfig>
  );
}
