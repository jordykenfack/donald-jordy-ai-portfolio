import {
  Airplane01Icon,
  BookOpen01Icon,
  Building03Icon,
  Hospital01Icon,
  Layout01Icon,
  Mic01Icon,
  MouseLeftClick01Icon,
  MusicNote01Icon,
  PresentationBarChart01Icon,
  Shirt01Icon,
  SparklesIcon,
  TruckDeliveryIcon,
  UserIcon,
  Video01Icon,
  WebDesign01Icon,
} from '@hugeicons/core-free-icons';
import type { IconSvgElement } from '@hugeicons/react';
import FadeIn from '@/components/FadeIn';
import { FeatureCarousel, type FeatureItem } from '@/components/ui/feature-carousel';
import { PROJECTS } from '@/data/projects';

// one icon per project, picked for what the site is about
const PROJECT_ICONS: Record<string, IconSvgElement> = {
  'farel-site': UserIcon,
  'rachid-amokrane': Mic01Icon,
  lacalixienne: Hospital01Icon,
  'kmer-street': Shirt01Icon,
  dymmdemaringuso: MouseLeftClick01Icon,
  'meei-conference': PresentationBarChart01Icon,
  'rockman-logistics': TruckDeliveryIcon,
  'africa-tourism': Airplane01Icon,
  meeihub: Building03Icon,
  'meei-hub-draft': Building03Icon,
  cozy: BookOpen01Icon,
  pulsar: MusicNote01Icon,
  'farel-masterclass': Video01Icon,
  'b2b-event': PresentationBarChart01Icon,
  'farel-vsl': Video01Icon,
  'trade-delegation': Airplane01Icon,
  'webinar-textile': Video01Icon,
  'importer-masterclass': Video01Icon,
  soscale: SparklesIcon,
  'cyber-hero': SparklesIcon,
  'vex-hero': SparklesIcon,
  'freight-hero': TruckDeliveryIcon,
  toonhub: SparklesIcon,
  'landing-samples': Layout01Icon,
};

const PROJECT_ITEMS: FeatureItem[] = PROJECTS.map((project) => ({
  id: project.id,
  label: project.title,
  icon: PROJECT_ICONS[project.id] ?? WebDesign01Icon,
  image: project.image,
  description: project.description,
  href: project.url,
  badge: project.url ? project.category : 'Coming soon',
}));

export default function ProjectsSection() {
  return (
    <section id="work" className="relative bg-[#0C0C0C] px-5 pb-24 pt-20 sm:px-8 sm:pt-24 md:px-10 md:pt-32">
      <div className="relative mb-12 sm:mb-14 md:mb-16">
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

      <FadeIn delay={0.1} y={30}>
        <FeatureCarousel
          items={PROJECT_ITEMS}
          cardAspect="4 / 3"
          cardMaxWidth={560}
          autoPlayInterval={3500}
          ctaLabel="View live site"
        />
      </FadeIn>

      <FadeIn delay={0} y={20} className="mt-8 sm:mt-10">
        <p className="mx-auto max-w-[36ch] text-center text-sm font-light leading-relaxed text-[#D7E2EA]/60 sm:text-base">
          You've seen the work. Now, let's talk about yours.
        </p>
      </FadeIn>
    </section>
  );
}
