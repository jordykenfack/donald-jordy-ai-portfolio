import { MotionConfig, motion } from 'framer-motion';
import BeforeAfterSlider from '../components/BeforeAfterSlider';
import FadeIn from '../components/FadeIn';
import MacbookShowcase from '../components/MacbookShowcase';
import PortfolioSwitcher from '../components/PortfolioSwitcher';

const NAV_LINKS = [
  { label: 'Work', href: '#projects' },
  { label: 'Services', href: '#services' },
  { label: 'About', href: '#about' },
];

// editorial mono headline: each line carries its own weight
const HEADLINE_LINES = [
  { text: 'AI-Powered', weight: 500 },
  { text: 'Website', weight: 600 },
  { text: 'Designer.', weight: 400 },
];

const navLinkClass =
  'text-[clamp(0.72rem,0.8vw,0.9rem)] font-medium uppercase tracking-[0.08em] text-[#111111] transition-opacity duration-200 hover:opacity-60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#111111]';

const splitNameClass =
  'font-light uppercase leading-none tracking-[-0.045em] text-[#111111]';

export default function HeroSection() {
  return (
    <MotionConfig reducedMotion="user">
      <section
        className="relative flex min-h-screen flex-col bg-[#F1EFEA] font-helvetica text-[#111111]"
        style={{ overflowX: 'clip' }}
      >
        <FadeIn delay={0} y={-16} as="header">
          <nav
            aria-label="Primary"
            className="flex flex-wrap items-center justify-between gap-y-3 px-6 pt-6 md:grid md:grid-cols-[1fr_auto_1fr] md:px-10 md:pt-7"
          >
            <div className="flex items-center gap-4">
              <a
                href="#"
                aria-label="Donald Jordy — home"
                className="text-lg font-medium tracking-tight text-[#111111] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#111111]"
              >
                d.J
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
            <a href="#contact" className={`${navLinkClass} md:justify-self-end`}>
              Contact Me
            </a>
          </nav>
        </FadeIn>

        {/* one centered poster group: headline + metadata + laptop stay connected,
            and leftover space distributes evenly on tall viewports */}
        <div className="flex flex-1 flex-col justify-center pb-6 md:pb-7">
          <h1
            className="mt-8 text-center font-plexmono uppercase md:mt-4"
            style={{
              fontSize: 'clamp(2.75rem, 6.4vw, 7rem)',
              lineHeight: 0.92,
              letterSpacing: '-0.055em',
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

          <FadeIn delay={0.5} y={24}>
            <div className="mx-auto mt-6 grid w-[min(100%,720px)] grid-cols-1 gap-2 px-6 sm:grid-cols-[1fr_auto] md:mt-7">
              <p className="text-[13px] font-normal leading-[1.35] text-[#2E2E2E]">
                Building modern websites
                <br />
                and automations for brands
              </p>
              <p className="text-[13px] font-normal leading-[1.35] text-[#2E2E2E]">
                (2022 — Present)
              </p>
            </div>
          </FadeIn>

          <div className="w-full pt-9 md:pt-8">
            {/* Mobile / small tablet: combined name in a simple stacked composition */}
            <FadeIn delay={0.7} y={20} className="md:hidden">
              <p
                className={`${splitNameClass} mb-6 text-center`}
                style={{ fontSize: 'clamp(1.9rem, 7.5vw, 2.6rem)' }}
              >
                Donald Jordy
              </p>
            </FadeIn>

            <div className="relative">
              <div className="mx-auto w-[min(100%-40px,560px)] md:w-[min(56vw,600px)]">
                <FadeIn delay={0.55} y={36}>
                  <MacbookShowcase className="mx-auto">
                    <BeforeAfterSlider
                      beforeSrc="/images/comparison/website-before.webp"
                      afterSrc="/images/comparison/website-after.webp"
                      beforeAlt="Project before the redesign"
                      afterAlt="Project after the redesign"
                    />
                  </MacbookShowcase>
                </FadeIn>
              </div>

              {/* Desktop: split name framing the laptop around its lower-middle */}
              <div className="pointer-events-none absolute inset-x-0 top-[58%] hidden -translate-y-1/2 items-center justify-between px-[2.5vw] md:flex">
                <FadeIn as="span" delay={0.75} x={-40} y={0}>
                  <span className={splitNameClass} style={{ fontSize: 'clamp(2rem, 4.6vw, 5rem)' }}>
                    Donald
                  </span>
                </FadeIn>
                <FadeIn as="span" delay={0.75} x={40} y={0}>
                  <span className={splitNameClass} style={{ fontSize: 'clamp(2rem, 4.6vw, 5rem)' }}>
                    Jordy
                  </span>
                </FadeIn>
              </div>
            </div>
          </div>
        </div>
      </section>
    </MotionConfig>
  );
}
