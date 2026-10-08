"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence, MotionConfig, useInView } from "motion/react";
import {
  Pizza04Icon,
  CommandFreeIcons,
  GlobalSearchIcon,
  AiCloudIcon,
  SmartPhone01Icon,
  CheckmarkCircle01Icon,
  DashboardSquare01Icon,
  MagicWandIcon,
  ArrowUpRight01Icon,
} from "@hugeicons/core-free-icons";
import { cn } from "@/lib/utils";
import { HugeiconsIcon, type IconSvgElement } from "@hugeicons/react";

export interface FeatureItem {
  id: string;
  label: string;
  icon: IconSvgElement;
  image: string;
  description: string;
  /** optional link for the active card's call to action */
  href?: string;
  /** short tag shown in the active card's top-left corner */
  badge?: string;
}

// default demo content — pass `items` to replace it
const FEATURES: FeatureItem[] = [
  {
    id: "sustainable",
    label: "Sustainable Sourcing",
    icon: Pizza04Icon,
    image:
      "https://cdn.21st.dev/assets/mirror/c4/c48702475dc62d18bff61e34fb6b240e41d0e33808066607c819abc51c708de5.jpg",
    description: "Ethically sourced ingredients from local farmers.",
  },
  {
    id: "community",
    label: "Community Focused",
    icon: CommandFreeIcons,
    image:
      "https://cdn.21st.dev/assets/mirror/c7/c7f3916c2cdc545b8254cc8ce6ae0e4de3f44ad0428502f9be8e0fe1134ecb81.jpg",
    description: "Building stronger bonds through shared experiences.",
  },
  {
    id: "global",
    label: "Global Reach",
    icon: GlobalSearchIcon,
    image:
      "https://cdn.21st.dev/assets/mirror/e0/e02da34643b79ef162a713de4eb8dd88f8249f5bcffe0409a6d447c9918d50aa.jpg",
    description: "Connecting visionaries across all continents.",
  },
  {
    id: "award",
    label: "Award Winning",
    icon: CheckmarkCircle01Icon,
    image:
      "https://cdn.21st.dev/assets/mirror/ce/ce089361785f3d1b45326b5a5e6478fba2c133d475401377354ef55f2e153289.jpg",
    description: "Recognized excellence in design and innovation.",
  },
  {
    id: "cloud",
    label: "Cloud Ready",
    icon: AiCloudIcon,
    image:
      "https://cdn.21st.dev/assets/mirror/fa/fa833daf43d62353c6d39bbc0ca40a9396e461c81c61b8195df01eb983f0bc95.jpg",
    description: "Scale your infrastructure with seamless ease.",
  },
  {
    id: "mobile",
    label: "Mobile First",
    icon: SmartPhone01Icon,
    image:
      "https://cdn.21st.dev/assets/mirror/24/2490eb35d201db5bb6758f8e5508f2301462c803f72cc38e34097d74f6d30578.jpg",
    description: "A world-class experience on every single device.",
  },
  {
    id: "analytics",
    label: "Real-time Analytics",
    icon: DashboardSquare01Icon,
    image:
      "https://images.unsplash.com/photo-1551288049-bbda38a10ad5?q=80&w=1200",
    description: "Insights at your fingertips, updated in real-time.",
  },
  {
    id: "security",
    label: "Enterprise Security",
    icon: CheckmarkCircle01Icon,
    image:
      "https://cdn.21st.dev/assets/mirror/8a/8acb03b53b306de4389cc3fd7b4317a9941714060e94a8a19f19853faefc033e.jpg",
    description: "Bank-grade security protocols for your data.",
  },
  {
    id: "magic",
    label: "Magic Automations",
    icon: MagicWandIcon,
    image:
      "https://cdn.21st.dev/assets/mirror/f7/f7b431dacfc2e3322286eac990b187bd031079e0cd3330d88c6293027a71ed04.jpg",
    description: "Let AI handle the repetitive tasks for you.",
  },
  {
    id: "local",
    label: "Locally Owned",
    icon: CheckmarkCircle01Icon,
    image:
      "https://cdn.21st.dev/assets/mirror/a7/a7c0cea7f9109a4f193768199927768e14de429f3b41a69ffb9b55bbda4a9abc.jpg",
    description: "Supporting local businesses and creators.",
  },
];

const AUTO_PLAY_INTERVAL = 3000;
const ITEM_HEIGHT = 65;

const wrap = (min: number, max: number, v: number) => {
  const rangeSize = max - min;
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
};

interface FeatureCarouselProps {
  items?: FeatureItem[];
  /** colour of the chip panel (and the active chip's text) */
  accent?: string;
  autoPlayInterval?: number;
  /** CSS aspect-ratio of the image cards, e.g. "4 / 5" or "4 / 3" */
  cardAspect?: string;
  /** max width of the image cards in px */
  cardMaxWidth?: number;
  /** default corner tag when an item has no `badge` */
  badge?: string;
  /** label for the active card's link button */
  ctaLabel?: string;
  className?: string;
}

export function FeatureCarousel({
  items = FEATURES,
  accent = "#62B2FE",
  autoPlayInterval = AUTO_PLAY_INTERVAL,
  cardAspect = "4 / 5",
  cardMaxWidth = 420,
  badge = "Live Session",
  ctaLabel = "View live site",
  className,
}: FeatureCarouselProps) {
  const [step, setStep] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  // only cycle while the carousel is actually on screen
  const inView = useInView(rootRef, { amount: 0.35 });

  const len = items.length;
  const currentIndex = ((step % len) + len) % len;

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const nextStep = useCallback(() => {
    setStep((prev) => prev + 1);
  }, []);

  const handleChipClick = (index: number) => {
    const diff = (index - currentIndex + len) % len;
    if (diff > 0) setStep((s) => s + diff);
  };

  useEffect(() => {
    if (isPaused || !inView || reducedMotion) return;
    const interval = setInterval(nextStep, autoPlayInterval);
    return () => clearInterval(interval);
  }, [nextStep, isPaused, inView, reducedMotion, autoPlayInterval]);

  const getCardStatus = (index: number) => {
    const diff = index - currentIndex;

    let normalizedDiff = diff;
    if (diff > len / 2) normalizedDiff -= len;
    if (diff < -len / 2) normalizedDiff += len;

    if (normalizedDiff === 0) return "active";
    if (normalizedDiff === -1) return "prev";
    if (normalizedDiff === 1) return "next";
    return "hidden";
  };

  return (
    <MotionConfig reducedMotion="user">
      <div
        ref={rootRef}
        className={cn("w-full max-w-7xl mx-auto md:p-8", className)}
        style={{ "--fc-accent": accent } as React.CSSProperties}
      >
        <div className="relative overflow-hidden rounded-[2.5rem] lg:rounded-[4rem] flex flex-col lg:flex-row min-h-[600px] lg:aspect-video border border-border/40">
          <div className="w-full lg:w-[40%] min-h-[350px] md:min-h-[450px] lg:h-full relative z-30 flex flex-col items-start justify-center overflow-hidden px-8 md:px-16 lg:pl-16 bg-[var(--fc-accent)]">
            <div className="absolute inset-x-0 top-0 h-12 md:h-20 lg:h-16 bg-gradient-to-b from-[var(--fc-accent)] via-[var(--fc-accent)] to-transparent z-40" />
            <div className="absolute inset-x-0 bottom-0 h-12 md:h-20 lg:h-16 bg-gradient-to-t from-[var(--fc-accent)] via-[var(--fc-accent)] to-transparent z-40" />
            <div className="relative w-full h-full flex items-center justify-center lg:justify-start z-20">
              {items.map((feature, index) => {
                const isActive = index === currentIndex;
                const distance = index - currentIndex;
                const wrappedDistance = wrap(-(len / 2), len / 2, distance);

                return (
                  <motion.div
                    key={feature.id}
                    style={{
                      height: ITEM_HEIGHT,
                      width: "fit-content",
                    }}
                    animate={{
                      y: wrappedDistance * ITEM_HEIGHT,
                      opacity: 1 - Math.abs(wrappedDistance) * 0.25,
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 90,
                      damping: 22,
                      mass: 1,
                    }}
                    className="absolute flex items-center justify-start"
                  >
                    <button
                      type="button"
                      onClick={() => handleChipClick(index)}
                      onMouseEnter={() => setIsPaused(true)}
                      onMouseLeave={() => setIsPaused(false)}
                      onFocus={() => setIsPaused(true)}
                      onBlur={() => setIsPaused(false)}
                      aria-pressed={isActive}
                      tabIndex={Math.abs(wrappedDistance) <= 3 ? 0 : -1}
                      className={cn(
                        "relative flex items-center gap-4 px-6 md:px-10 lg:px-8 py-3.5 md:py-5 lg:py-4 rounded-full transition-all duration-700 text-left group border focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white",
                        isActive
                          ? "bg-white text-[var(--fc-accent)] border-white z-10"
                          : "bg-transparent text-white/80 border-white/30 hover:border-white/60 hover:text-white"
                      )}
                    >
                      <div
                        className={cn(
                          "flex items-center justify-center transition-colors duration-500",
                          isActive ? "text-[var(--fc-accent)]" : "text-white/60"
                        )}
                      >
                        <HugeiconsIcon icon={feature.icon} size={18} strokeWidth={2} />
                      </div>

                      <span className="font-normal text-sm md:text-[15px] tracking-tight whitespace-nowrap uppercase">
                        {feature.label}
                      </span>
                    </button>
                  </motion.div>
                );
              })}
            </div>
          </div>

          <div className="flex-1 min-h-[320px] md:min-h-[600px] lg:h-full relative bg-secondary/30 flex items-center justify-center py-12 md:py-24 lg:py-16 px-6 md:px-12 lg:px-10 overflow-hidden border-t lg:border-t-0 lg:border-l border-border/20">
            <div
              className="relative w-full flex items-center justify-center"
              style={{ aspectRatio: cardAspect, maxWidth: cardMaxWidth }}
            >
              {items.map((feature, index) => {
                const status = getCardStatus(index);
                const isActive = status === "active";
                const isPrev = status === "prev";
                const isNext = status === "next";

                return (
                  <motion.div
                    key={feature.id}
                    initial={false}
                    aria-hidden={!isActive}
                    animate={{
                      x: isActive ? 0 : isPrev ? -100 : isNext ? 100 : 0,
                      scale: isActive ? 1 : isPrev || isNext ? 0.85 : 0.7,
                      opacity: isActive ? 1 : isPrev || isNext ? 0.4 : 0,
                      rotate: isPrev ? -3 : isNext ? 3 : 0,
                      zIndex: isActive ? 20 : isPrev || isNext ? 10 : 0,
                      pointerEvents: isActive ? "auto" : "none",
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 260,
                      damping: 25,
                      mass: 0.8,
                    }}
                    className="absolute inset-0 rounded-[2rem] md:rounded-[2.8rem] overflow-hidden border-4 md:border-8 border-background bg-background origin-center"
                  >
                    <img
                      src={feature.image}
                      alt={isActive ? `${feature.label} preview` : ""}
                      loading={isActive || isPrev || isNext ? "eager" : "lazy"}
                      draggable={false}
                      className={cn(
                        "w-full h-full object-cover object-top transition-all duration-700",
                        isActive ? "grayscale-0 blur-0" : "grayscale blur-[2px] brightness-75"
                      )}
                    />

                    <AnimatePresence>
                      {isActive && (
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          className="absolute inset-x-0 bottom-0 p-5 md:p-8 pt-20 md:pt-28 bg-gradient-to-t from-black via-black/85 to-transparent flex flex-col justify-end"
                        >
                          <div className="bg-background text-foreground px-4 py-1.5 rounded-full text-[11px] font-normal uppercase tracking-[0.2em] w-fit shadow-lg mb-3 border border-border/50">
                            {index + 1} • {feature.label}
                          </div>
                          <p className="hidden sm:block text-white font-normal text-base md:text-lg leading-snug drop-shadow-md tracking-tight max-w-[52ch]">
                            {feature.description}
                          </p>
                          {feature.href && (
                            <a
                              href={feature.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              data-cta="project-view"
                              aria-label={`Open the ${feature.label} website in a new tab`}
                              className="mt-4 inline-flex w-fit items-center gap-1.5 rounded-full bg-white px-5 py-2 text-xs font-medium uppercase tracking-widest text-black transition-colors duration-200 hover:bg-white/85 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                            >
                              {ctaLabel}
                              <HugeiconsIcon icon={ArrowUpRight01Icon} size={16} strokeWidth={2} />
                            </a>
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <div
                      className={cn(
                        "absolute top-6 left-6 md:top-8 md:left-8 flex items-center gap-3 rounded-full bg-black/45 px-3 py-1.5 backdrop-blur-sm transition-opacity duration-300",
                        isActive ? "opacity-100" : "opacity-0"
                      )}
                    >
                      <div className="w-2 h-2 rounded-full bg-white shadow-[0_0_10px_white]" />
                      <span className="text-white/85 text-[10px] font-normal uppercase tracking-[0.3em] font-mono">
                        {feature.badge ?? badge}
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </MotionConfig>
  );
}

export default FeatureCarousel;
