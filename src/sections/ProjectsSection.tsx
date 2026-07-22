import { useEffect, useRef, useState } from 'react';
import { flushSync } from 'react-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';
import FadeIn from '../components/FadeIn';
import { PROJECTS, type Project } from '../data/projects';

const arrowButtonClass =
  'flex h-12 w-12 items-center justify-center rounded-full border-2 border-[#D7E2EA]/60 text-[#D7E2EA] transition-all duration-200 hover:border-[#D7E2EA] hover:bg-[#D7E2EA]/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D7E2EA]';

// seamless loop: a few clones on each side give the scroll room to continue,
// then the settled position teleports back into the real list
const CLONES = 3;
const ITEMS = [...PROJECTS.slice(-CLONES), ...PROJECTS, ...PROJECTS.slice(0, CLONES)];

function ProjectCard({ project, active, index }: { project: Project; active: boolean; index: number }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  // preview videos play only on the active card (and never for reduced motion)
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (active && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  }, [active]);

  const mediaClass = 'absolute inset-0 h-full w-full select-none object-cover';
  const mediaPosition = { objectPosition: project.imagePosition ?? 'top center' };

  // the screenshot stays clean — title, description, and tags live in the
  // caption panel under the carousel instead of overlapping the site's text
  const content = (
    <>
      {project.video ? (
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
          loading={index <= CLONES + 1 ? 'eager' : 'lazy'}
          draggable={false}
          className={mediaClass}
          style={mediaPosition}
        />
      )}

      {!project.url && (
        <span className="absolute right-3 top-3 rounded-full bg-black/65 px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.12em] text-white/90">
          Coming soon
        </span>
      )}
    </>
  );

  // active card is never upscaled — upsampling was softening the screenshots
  const cardClass = `relative block h-full w-full overflow-hidden bg-[#161616] transition-[transform,opacity] duration-500 ${
    active ? 'scale-100 opacity-100' : 'scale-[0.96] opacity-70'
  }`;
  const radius = { borderRadius: 'clamp(24px, 3vw, 48px)' };

  return project.url ? (
    <a
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Open the ${project.title} website in a new tab`}
      className={`${cardClass} ring-white/0 hover:ring-2 hover:ring-white/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D7E2EA]`}
      style={radius}
    >
      {content}
    </a>
  ) : (
    <div className={cardClass} style={radius}>
      {content}
    </div>
  );
}

export default function ProjectsSection() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(CLONES);
  const activeProject =
    PROJECTS[(((active - CLONES) % PROJECTS.length) + PROJECTS.length) % PROJECTS.length];

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const nearestIndex = () => {
      const mid = track.scrollLeft + track.clientWidth / 2;
      let best = 0;
      let bestDist = Infinity;
      Array.from(track.children).forEach((child, i) => {
        const el = child as HTMLElement;
        const center = el.offsetLeft + el.offsetWidth / 2;
        const dist = Math.abs(center - mid);
        if (dist < bestDist) {
          bestDist = dist;
          best = i;
        }
      });
      return best;
    };

    // start centered on the first real card (after the leading clones)
    const first = track.children[CLONES] as HTMLElement;
    track.scrollLeft = first.offsetLeft + first.offsetWidth / 2 - track.clientWidth / 2;
    setActive(CLONES);

    let raf = 0;
    let settleTimer = 0;

    // jump by exactly one full list width, committing the active-card state in
    // the same task so the scroll jump and restyle paint together (content on
    // both sides of the jump is identical, so the swap is invisible)
    const shift = (dir: 1 | -1) => {
      const children = track.children;
      // cards have differing widths, so measure one full real-list width
      // directly: the distance between a card and its clone twin
      const listWidth =
        (children[CLONES + PROJECTS.length] as HTMLElement).offsetLeft -
        (children[CLONES] as HTMLElement).offsetLeft;
      // suppress card transitions for this frame — the target card must paint
      // already in its final state or the swap shows as a 500ms pulse
      track.classList.add('projects-teleporting');
      track.scrollLeft += dir * listWidth;
      flushSync(() => setActive(nearestIndex()));
      void track.offsetWidth;
      requestAnimationFrame(() => track.classList.remove('projects-teleporting'));
    };

    // once scrolling rests inside a clone zone, recentre into the real list
    const settle = () => {
      const g = nearestIndex();
      if (g < CLONES) shift(1);
      else if (g >= CLONES + PROJECTS.length) shift(-1);
    };

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const g = nearestIndex();
        // hard-edge guard: teleport immediately at the outermost clones so
        // momentum never rubber-bands against the physical end of the track
        if (g === 0 || g === ITEMS.length - 1) shift(g === 0 ? 1 : -1);
        else setActive(g);
      });
      window.clearTimeout(settleTimer);
      settleTimer = window.setTimeout(settle, 140);
    };

    track.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      track.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(raf);
      window.clearTimeout(settleTimer);
    };
  }, []);

  const goTo = (index: number) => {
    const track = trackRef.current;
    const card = track?.children[Math.max(0, index)] as HTMLElement | undefined;
    if (!track || !card) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    track.scrollTo({
      left: card.offsetLeft + card.offsetWidth / 2 - track.clientWidth / 2,
      behavior: reduced ? 'auto' : 'smooth',
    });
  };

  return (
    <section
      id="projects"
      className="relative z-10 -mt-10 overflow-hidden rounded-t-[40px] bg-[#0C0C0C] pb-24 pt-20 sm:-mt-12 sm:rounded-t-[50px] sm:pt-24 md:-mt-14 md:rounded-t-[60px] md:pt-32"
    >
      <div className="relative px-5 sm:px-8 md:px-10">
        <FadeIn delay={0} y={40}>
          <h2
            className="hero-heading text-center font-black uppercase leading-none tracking-tight"
            style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
          >
            Projects
          </h2>
        </FadeIn>
        <FadeIn delay={0.15} y={24}>
          <p className="mx-auto mt-6 max-w-[46ch] text-center text-sm font-light leading-relaxed text-[#D7E2EA]/80 sm:text-base">
            A selection of websites designed to turn ideas into clear, engaging digital
            experiences.
          </p>
        </FadeIn>

        {/* desktop arrows near the outer edges, reference-style; the carousel
            loops, so neither arrow ever disables */}
        <div className="mt-8 flex justify-center gap-4 md:absolute md:inset-x-10 md:top-1/2 md:mt-0 md:justify-between">
          <button
            type="button"
            aria-label="View previous project"
            onClick={() => goTo(active - 1)}
            className={arrowButtonClass}
          >
            <ArrowLeft size={22} aria-hidden="true" />
          </button>
          <button
            type="button"
            aria-label="View next project"
            onClick={() => goTo(active + 1)}
            className={arrowButtonClass}
          >
            <ArrowRight size={22} aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* one entrance animation for the whole row — per-card animations would
          re-trigger visibly when the loop teleports the scroll position */}
      <FadeIn delay={0.2} y={30} className="mt-10 sm:mt-14 md:mt-16">
        <div ref={trackRef} className="projects-track flex snap-x snap-mandatory overflow-x-auto">
          {ITEMS.map((project, i) => {
            const isClone = i < CLONES || i >= CLONES + PROJECTS.length;
            return (
              <article
                // duplicates only exist to make the loop seamless — hide from AT
                key={isClone ? `clone-${i}` : project.id}
                aria-hidden={isClone || undefined}
                className="projects-card shrink-0 snap-center"
                style={{ aspectRatio: String(project.aspect) }}
              >
                <ProjectCard project={project} active={i === active} index={i} />
              </article>
            );
          })}
        </div>
      </FadeIn>

      {/* caption for the active project — kept off the screenshots entirely */}
      <div className="mx-auto mt-8 flex min-h-[210px] w-full max-w-xl flex-col px-6 text-center sm:mt-10 sm:min-h-[190px]">
        <motion.div
          key={activeProject.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="flex flex-col items-center"
        >
          <h3 className="text-xl font-semibold text-[#D7E2EA] md:text-2xl">
            {activeProject.title}
          </h3>
          <p className="mt-2 text-sm font-light leading-relaxed text-[#D7E2EA]/70 md:text-base">
            {activeProject.description}
          </p>
          <div className="mt-4 flex flex-wrap justify-center gap-2">
            {activeProject.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-[#D7E2EA]/10 px-3 py-1.5 text-xs font-medium text-[#D7E2EA]/90"
              >
                {tag}
              </span>
            ))}
          </div>
          {activeProject.url ? (
            <a
              href={activeProject.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-1.5 rounded-full border-2 border-[#D7E2EA]/60 px-6 py-2.5 text-xs font-medium uppercase tracking-widest text-[#D7E2EA] transition-colors duration-200 hover:border-[#D7E2EA] hover:bg-[#D7E2EA]/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D7E2EA]"
            >
              Visit live site
              <ArrowUpRight size={16} aria-hidden="true" />
            </a>
          ) : (
            <span className="mt-5 inline-flex items-center rounded-full border-2 border-[#D7E2EA]/25 px-6 py-2.5 text-xs font-medium uppercase tracking-widest text-[#D7E2EA]/50">
              Coming soon
            </span>
          )}
        </motion.div>
      </div>
    </section>
  );
}
