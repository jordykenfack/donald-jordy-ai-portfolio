import { useEffect, useRef } from 'react';
import { motion, useInView, useScroll, useTransform, type MotionValue } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import FadeIn from '../components/FadeIn';
import { useIsDesktop, usePrefersReducedMotion } from '../hooks/useMediaQuery';
import { PROJECTS, type Project } from '../data/projects';

// each card sticks slightly lower than the one before it, so earlier cards
// peek out above the one currently covering them — a fanned stack rather
// than a flat swap (adapted from Skiper16's `calc(-5vh + i*20+250px)` cascade,
// top-anchored instead of center-anchored since our cards run taller than a
// simple image card)
const topOffsetFor = (index: number) => `calc(4vh + ${Math.min(index, 8) * 10}px)`;

// how far the oldest card is allowed to recede by the very end of the
// sequence — subtle depth, not the dramatic 1 → 0.5 shrink of the Skiper16 demo
const SCALE_FLOOR = 0.92;
const OPACITY_FLOOR = 0.78;

function ProjectMedia({ project, playWhenVisible }: { project: Project; playWhenVisible: boolean }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (playWhenVisible) video.play().catch(() => {});
    else video.pause();
  }, [playWhenVisible]);

  const mediaClass = 'absolute inset-0 h-full w-full select-none object-cover';
  const mediaPosition = { objectPosition: project.imagePosition ?? 'top center' };

  return project.video ? (
    <video
      ref={videoRef}
      src={project.video}
      poster={project.image}
      muted
      loop
      playsInline
      preload="metadata"
      aria-label={`Animated preview of the ${project.title} website`}
      className={mediaClass}
      style={mediaPosition}
    />
  ) : (
    <img
      src={project.image}
      alt={`Hero section of the ${project.title} website`}
      loading="lazy"
      draggable={false}
      className={mediaClass}
      style={mediaPosition}
    />
  );
}

function ProjectCard({
  project,
  index,
  total,
  stackProgress,
}: {
  project: Project;
  index: number;
  total: number;
  /** shared 0→1 scroll progress across the whole stack — every card reads
      from the same value, Skiper16-style, so depth accumulates across the
      sequence instead of resetting per card */
  stackProgress: MotionValue<number>;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isDesktop = useIsDesktop();
  const reducedMotion = usePrefersReducedMotion();
  const inView = useInView(cardRef, { amount: 0.5 });

  // this card starts (very gradually) receding the moment its own slot in
  // the sequence begins, and keeps receding through the rest of the scroll —
  // cards further back end up more scaled/dimmed than ones that arrived recently
  const rangeStart = index / total;
  const stepsFromEnd = total - index - 1;
  const targetScale = Math.max(SCALE_FLOOR, 1 - stepsFromEnd * 0.008);
  const targetOpacity = Math.max(OPACITY_FLOOR, 1 - stepsFromEnd * 0.022);

  const scaleMotion = useTransform(stackProgress, [rangeStart, 1], [1, targetScale]);
  const opacityMotion = useTransform(stackProgress, [rangeStart, 1], [1, targetOpacity]);
  // the sticky/overlap layout is itself a scroll-driven animation (cards
  // covering one another), so reduced-motion drops it entirely in favor of
  // a plain stacked list — same simplification mobile always uses
  const stackEnabled = isDesktop && !reducedMotion;

  return (
    <div
      ref={cardRef}
      style={stackEnabled ? { top: topOffsetFor(index), zIndex: index + 1 } : undefined}
      className={stackEnabled ? 'sticky flex justify-center pb-10' : 'pb-10'}
    >
      <motion.article
        style={stackEnabled ? { scale: scaleMotion, opacity: opacityMotion } : undefined}
        className="w-full origin-top overflow-hidden rounded-[28px] border border-white/5 bg-[#141414] shadow-2xl shadow-black/40 sm:rounded-[32px] md:rounded-[40px]"
      >
        {/* preview — the dominant element, full width, details live below it
            as one unit so they always travel and scale together */}
        <div className="relative aspect-[16/10] w-full sm:aspect-video">
          <ProjectMedia project={project} playWhenVisible={inView && !reducedMotion} />
          {project.url ? (
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Open the ${project.title} website in a new tab`}
              className="absolute inset-0 transition-colors duration-200 hover:bg-white/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-[#D7E2EA]"
            />
          ) : (
            <span className="absolute right-3 top-3 rounded-full bg-black/65 px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.12em] text-white/90">
              Coming soon
            </span>
          )}
        </div>

        <div className="flex flex-col gap-4 p-6 sm:gap-5 sm:p-8 md:p-10">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
            <h3 className="text-2xl font-semibold text-[#F1EFEA] md:text-3xl">{project.title}</h3>
            <p className="text-xs font-medium uppercase tracking-[0.14em] text-[#D7E2EA]/50">
              {project.category}
            </p>
          </div>
          <p className="max-w-[70ch] text-sm font-light leading-relaxed text-[#D7E2EA]/75 md:text-base">
            {project.description}
          </p>
          <div className="flex flex-wrap items-center justify-between gap-4 pt-1">
            <p className="text-xs font-medium uppercase tracking-[0.1em] text-[#D7E2EA]/40">
              Built: {project.tags.join(' · ')}
            </p>

            {project.url ? (
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                data-cta="project-view"
                aria-label={`Open the ${project.title} website in a new tab`}
                className="inline-flex w-fit items-center gap-1.5 rounded-full border-2 border-[#D7E2EA]/50 px-6 py-2.5 text-xs font-medium uppercase tracking-widest text-[#D7E2EA] transition-colors duration-200 hover:border-[#D7E2EA] hover:bg-[#D7E2EA]/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D7E2EA]"
              >
                View Project
                <ArrowUpRight size={16} aria-hidden="true" />
              </a>
            ) : (
              <span className="inline-flex w-fit items-center rounded-full border-2 border-[#D7E2EA]/20 px-6 py-2.5 text-xs font-medium uppercase tracking-widest text-[#D7E2EA]/45">
                Coming soon
              </span>
            )}
          </div>
        </div>
      </motion.article>
    </div>
  );
}

export default function ProjectsSection() {
  const stackRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: stackRef, offset: ['start start', 'end end'] });

  return (
    <section id="work" className="relative bg-[#0C0C0C] px-5 pb-24 pt-20 sm:px-8 sm:pt-24 md:px-10 md:pt-32">
      <div className="relative mb-16 sm:mb-20 md:mb-24">
        <FadeIn delay={0} y={20}>
          <p className="text-center text-xs font-medium uppercase tracking-[0.16em] text-[#D7E2EA]/60">
            Selected Work
          </p>
        </FadeIn>
        <FadeIn delay={0.08} y={40}>
          <h2
            className="hero-heading mt-4 text-center font-black uppercase leading-none tracking-tight"
            style={{ fontSize: 'clamp(2.75rem, 10vw, 130px)' }}
          >
            Built for real ideas.
          </h2>
        </FadeIn>
        <FadeIn delay={0.18} y={24}>
          <p className="mx-auto mt-6 max-w-[46ch] text-center text-sm font-light leading-relaxed text-[#D7E2EA]/80 sm:text-base">
            A selection of websites and digital experiences built for clients, brands and
            ambitious personal projects.
          </p>
        </FadeIn>
      </div>

      <div ref={stackRef} className="mx-auto max-w-4xl">
        {PROJECTS.map((project, i) => (
          <ProjectCard
            key={project.id}
            project={project}
            index={i}
            total={PROJECTS.length}
            stackProgress={scrollYProgress}
          />
        ))}
      </div>

      <FadeIn delay={0} y={20} className="mt-8 sm:mt-10">
        <p className="mx-auto max-w-[36ch] text-center text-sm font-light leading-relaxed text-[#D7E2EA]/60 sm:text-base">
          You've seen the work. Now, let's talk about yours.
        </p>
      </FadeIn>
    </section>
  );
}
