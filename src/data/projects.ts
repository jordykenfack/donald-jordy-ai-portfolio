export interface Project {
  id: string;
  title: string;
  description: string;
  /** live site URL — omit when the project has no public deployment */
  url?: string;
  image: string;
  /** media width/height ratio — the card adopts it so nothing gets cropped */
  aspect: number;
  /** optional looping preview video; plays only while the card is active */
  video?: string;
  tags: string[];
  /** CSS object-position override for the card crop (default "top center") */
  imagePosition?: string;
}

// hero screenshots live in /public/images/projects/<id>-hero.webp
// (1200x750 desktop captures of each site's hero section)
export const PROJECTS: Project[] = [
  {
    id: 'dymmdemaringuso',
    title: 'Do You Miss Me?',
    description:
      'A playful micro-site with a cheeky twist — the "No" button darts away whenever you reach for it, while "Yes" swaps the animation and opens a direct WhatsApp chat.',
    url: 'https://dymmdemaringuso.vercel.app',
    image: '/images/projects/dymmdemaringuso-hero.webp',
    aspect: 1200 / 750,
    tags: ['Playful', 'Micro-site', 'Interaction'],
  },
  {
    id: 'meei-conference',
    title: 'MEEI Investment Conference',
    description:
      'Conference website for a China–Africa business summit, presenting speakers, agenda, and tickets to drive attendee registrations.',
    url: 'https://summit.meeihub.com',
    image: '/images/projects/meei-conference-hero.webp',
    aspect: 1200 / 850,
    tags: ['Corporate', 'Web Design', 'Lead Generation'],
  },
  {
    id: 'rockman-logistics',
    title: 'Rockman Logistics',
    description:
      'Marketing site for a Turkey–Ghana freight company, pairing clear service pages with instant quote estimates and live lead capture.',
    url: 'https://www.rockmanlogistics.com',
    image: '/images/projects/rockman-logistics-hero.webp',
    aspect: 1280 / 904,
    video: '/images/projects/rockman-logistics-hero.mp4',
    tags: ['Logistics', 'Corporate', 'Lead Generation'],
  },
  {
    id: 'africa-tourism',
    title: 'Discover Benin',
    description:
      'Tourism website introducing Turkish travellers to Benin, with curated journeys, itineraries, and practical trip-planning guidance.',
    image: '/images/projects/africa-tourism-hero.webp',
    aspect: 1200 / 750,
    tags: ['Tourism', 'Web Design', 'Responsive Design'],
  },
  {
    id: 'meeihub',
    title: 'MEEI Hub',
    description:
      'B2B trade hub connecting Turkish manufacturers with African markets across product categories, from construction materials to consumer goods.',
    url: 'https://www.meeihub.com.tr',
    image: '/images/projects/meeihub-hero.webp',
    aspect: 1200 / 750,
    tags: ['B2B', 'Corporate', 'Web Design'],
  },
  {
    id: 'meei-hub-draft',
    title: 'MEEI Hub — New Concept',
    description:
      'Redesign concept for the MEEI Hub trade platform, matching verified Turkish exporters with serious African buyers.',
    url: 'https://jordykenfack-meei-hub.vercel.app',
    image: '/images/projects/meei-hub-draft-hero.webp',
    aspect: 1200 / 750,
    tags: ['B2B', 'Web Design', 'UI/UX'],
  },
  {
    id: 'cozy',
    title: 'Cozy Journaling',
    description:
      'A calm, animated landing page for a journaling habit, easing beginners into writing with gentle storytelling and guided prompts.',
    image: '/images/projects/cozy-hero.webp',
    aspect: 1200 / 750,
    tags: ['Landing Page', 'UI/UX', 'Web Development'],
  },
  {
    id: 'pulsar',
    title: 'Pulsar Records',
    description:
      'Concept site for an independent record label, translating an underground music identity into a bold digital presence.',
    image: '/images/projects/pulsar-hero.webp',
    aspect: 1200 / 750,
    tags: ['Landing Page', 'Web Design'],
  },
  {
    id: 'farel-masterclass',
    title: 'AI Masterclass',
    description:
      'French-language webinar funnel for an AI automation masterclass, structured to move visitors from curiosity to registration.',
    image: '/images/projects/farel-masterclass-hero.webp',
    aspect: 1200 / 750,
    tags: ['Coaching', 'Landing Page', 'Conversion Design'],
  },
  {
    id: 'b2b-event',
    title: 'Turkey–Africa Trade Event',
    description:
      'Event landing page presenting verified trade corridors between Turkey and Africa, built to convert visitors into qualified enquiries.',
    url: 'https://webinar-textile-suppliers.vercel.app',
    image: '/images/projects/b2b-event-hero.webp',
    aspect: 1200 / 852,
    tags: ['Landing Page', 'Lead Generation', 'Corporate'],
  },
  {
    id: 'farel-site',
    title: 'Farel Honvoh',
    description:
      'Personal brand site for an agentic AI engineer, positioning services and client results with automated lead capture.',
    url: 'https://farelhonvoh.com',
    image: '/images/projects/farel-site-hero.webp',
    aspect: 1280 / 720,
    video: '/images/projects/farel-site-hero.mp4',
    tags: ['Personal Brand', 'Portfolio', 'AI'],
  },
];
