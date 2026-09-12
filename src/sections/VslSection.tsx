import BeforeAfterSlider from '../components/BeforeAfterSlider';
import FadeIn from '../components/FadeIn';
import AnimatedText from '../components/AnimatedText';
import MacbookShowcase from '../components/MacbookShowcase';

export default function VslSection() {
  return (
    <section className="bg-[#0C0C0C] px-5 py-24 sm:px-8 sm:py-28 md:px-10 md:py-36">
      <div className="mx-auto flex max-w-4xl flex-col items-center gap-6 text-center">
        <FadeIn delay={0} y={30} className="mb-4 w-[min(90%,380px)] sm:w-[min(74%,460px)] md:w-[clamp(340px,68svh,600px)]">
          <MacbookShowcase className="mx-auto">
            {/* a complete website (shell.png) fills the screen; the live
                before/after slider is overlaid exactly on the placeholder
                area designed into that shell, so it reads as one real
                feature inside a real site rather than a bare widget */}
            <div className="relative h-full w-full overflow-hidden">
              <img
                src="/images/website-shell.jpg"
                alt=""
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 h-full w-full object-cover"
              />
              <div
                className="absolute"
                style={{ left: '8.83%', top: '41.03%', width: '82.41%', height: '46.27%' }}
              >
                <BeforeAfterSlider
                  beforeSrc="/images/comparison/website-before.webp"
                  afterSrc="/images/comparison/website-after.webp"
                  beforeAlt="Project before the redesign"
                  afterAlt="Project after the redesign"
                />
              </div>
            </div>
          </MacbookShowcase>
        </FadeIn>

        <FadeIn delay={0.1} y={20}>
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-[#D7E2EA]/60">
            The Thinking Behind the Work
          </p>
        </FadeIn>

        <FadeIn delay={0.15} y={30}>
          <h2
            className="max-w-[18ch] font-semibold leading-[1.1] tracking-tight text-[#F1EFEA]"
            style={{ fontSize: 'clamp(1.9rem, 4.6vw, 3.4rem)' }}
          >
            A website should be the beginning of the system, not the end.
          </h2>
        </FadeIn>

        <AnimatedText
          text="In a couple of minutes, I'll show you how I think about websites, automation and AI, and why the best digital experiences do more than just look good."
          highlight="do more than just look good."
          className="mt-2 max-w-[52ch] text-base font-normal leading-relaxed text-[#D7E2EA]/80 sm:text-lg"
        />
      </div>
    </section>
  );
}
