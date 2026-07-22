import { useEffect, useRef, useState } from 'react';
import { animate, type AnimationPlaybackControls } from 'framer-motion';
import { ChevronsLeftRight } from 'lucide-react';

// divider boundaries and resting position (percent)
const MIN = 5;
const MAX = 95;
const REST = 50; // initial divider position

// introductory demonstration timings
const DEMO = {
  from: 38, // start position
  to: 68, // glide out to
  outDuration: 1.1, // seconds, glide 38 -> 68
  backDuration: 0.9, // seconds, settle 68 -> 50
  ease: [0.45, 0, 0.25, 1] as const,
};

interface BeforeAfterSliderProps {
  beforeSrc: string; // before image path (configured at the call site)
  afterSrc: string; // after image path (configured at the call site)
  beforeAlt: string;
  afterAlt: string;
}

export default function BeforeAfterSlider({
  beforeSrc,
  afterSrc,
  beforeAlt,
  afterAlt,
}: BeforeAfterSliderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const handleRef = useRef<HTMLDivElement>(null);
  const posRef = useRef(REST);
  const draggingRef = useRef(false);
  const demoRef = useRef<AnimationPlaybackControls | null>(null);
  const demoStartedRef = useRef(false);
  const interactedRef = useRef(false);
  const [hintVisible, setHintVisible] = useState(false);
  const [pulsing, setPulsing] = useState(false);

  // writes go straight to a CSS variable + ARIA; no React re-render per move
  const setPos = (pct: number) => {
    const clamped = Math.min(MAX, Math.max(MIN, pct));
    posRef.current = clamped;
    containerRef.current?.style.setProperty('--pos', `${clamped}%`);
    handleRef.current?.setAttribute('aria-valuenow', String(Math.round(clamped)));
  };

  const cancelDemo = () => {
    demoRef.current?.stop();
    demoRef.current = null;
  };

  const markInteracted = () => {
    if (!interactedRef.current) {
      interactedRef.current = true;
      cancelDemo();
      setHintVisible(false);
    }
  };

  // demonstration: runs once per page load when ~half the slider is visible
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || demoStartedRef.current) return;
        demoStartedRef.current = true;
        observer.disconnect();

        setHintVisible(true);
        window.setTimeout(() => setHintVisible(false), 2600);

        const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (reducedMotion || interactedRef.current) return;

        setPos(DEMO.from);
        demoRef.current = animate(DEMO.from, DEMO.to, {
          duration: DEMO.outDuration,
          ease: DEMO.ease,
          onUpdate: setPos,
          onComplete: () => {
            demoRef.current = animate(DEMO.to, REST, {
              duration: DEMO.backDuration,
              ease: DEMO.ease,
              onUpdate: setPos,
              onComplete: () => {
                demoRef.current = null;
                // one restrained pulse around the handle, then hands off
                setPulsing(true);
                window.setTimeout(() => setPulsing(false), 900);
              },
            });
          },
        });
      },
      { threshold: 0.5 },
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelDemo();
    };
  }, []);

  const posFromClientX = (clientX: number) => {
    const rect = containerRef.current!.getBoundingClientRect();
    return ((clientX - rect.left) / rect.width) * 100;
  };

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    markInteracted();
    draggingRef.current = true;
    e.currentTarget.setPointerCapture(e.pointerId);
    setPos(posFromClientX(e.clientX));
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (draggingRef.current) setPos(posFromClientX(e.clientX));
  };

  const stopDragging = () => {
    draggingRef.current = false;
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const step = e.shiftKey ? 10 : 2;
    let next: number | null = null;
    if (e.key === 'ArrowLeft') next = posRef.current - step;
    else if (e.key === 'ArrowRight') next = posRef.current + step;
    else if (e.key === 'Home') next = MIN;
    else if (e.key === 'End') next = MAX;
    if (next !== null) {
      e.preventDefault();
      markInteracted();
      setPos(next);
    }
  };

  const labelClass =
    'pointer-events-none absolute top-[4%] z-10 rounded-full bg-black/45 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.14em] text-white/90';

  return (
    <div
      ref={containerRef}
      className="group relative h-full w-full cursor-ew-resize select-none"
      style={{ '--pos': `${REST}%`, touchAction: 'pan-y' } as React.CSSProperties}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={stopDragging}
      onPointerCancel={stopDragging}
    >
      {/* after: full bottom layer */}
      <img
        src={afterSrc}
        alt={afterAlt}
        draggable={false}
        className="pointer-events-none absolute inset-0 h-full w-full select-none object-cover object-top"
      />
      {/* before: top layer clipped to the left of the divider */}
      <img
        src={beforeSrc}
        alt={beforeAlt}
        draggable={false}
        className="pointer-events-none absolute inset-0 h-full w-full select-none object-cover object-top"
        style={{ clipPath: 'inset(0 calc(100% - var(--pos)) 0 0)' }}
      />

      <span className={`${labelClass} left-[3%]`}>Before</span>
      <span className={`${labelClass} right-[3%]`}>After</span>

      {/* divider */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 z-10 w-[2px] -translate-x-1/2 bg-white/80 shadow-[0_0_6px_rgba(0,0,0,0.35)] transition-colors duration-200 group-hover:bg-white"
        style={{ left: 'var(--pos)' }}
      />

      {/* handle */}
      <div
        ref={handleRef}
        role="slider"
        tabIndex={0}
        aria-label="Drag to compare before and after"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={REST}
        onKeyDown={onKeyDown}
        className={`absolute top-1/2 z-20 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-[#111111] shadow-[0_2px_10px_rgba(0,0,0,0.3)] transition-transform duration-200 group-hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${
          pulsing ? 'handle-pulse' : ''
        }`}
        style={{ left: 'var(--pos)', cursor: 'ew-resize' }}
      >
        <ChevronsLeftRight size={20} strokeWidth={2} aria-hidden="true" />
      </div>

      {/* temporary drag hint */}
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute bottom-[7%] left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded-full bg-black/55 px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.16em] text-white transition-opacity duration-400 ${
          hintVisible ? 'opacity-100' : 'opacity-0'
        }`}
      >
        Drag to compare
      </div>
    </div>
  );
}
