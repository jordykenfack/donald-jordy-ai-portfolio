export interface Project {
  id: string;
  title: string;
  /** short category label shown above the title in the case-study card */
  category: string;
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
    id: 'farel-site',
    title: 'Farel Honvoh',
    category: 'Personal Brand · AI',
    description:
      'Personal brand site for an agentic AI engineer, positioning services and client results with automated lead capture.',
    url: 'https://farelhonvoh.com',
    image: '/images/projects/farel-site-hero.webp',
    aspect: 1280 / 720,
    video: '/images/projects/farel-site-hero.mp4',
    tags: ['Personal Brand', 'Portfolio', 'AI'],
  },
  {
    id: 'rachid-amokrane',
    title: 'Rachid Amokrane',
    category: 'Personal Brand · Coaching',
    description:
      'Trilingual (French, English, Arabic) website for a leadership and personal-development coach, keynote speaker, and author, built around his programmes, books, and conferences.',
    url: 'https://rachid-amokrane.vercel.app',
    image: '/images/projects/rachid-amokrane-hero.webp',
    aspect: 1200 / 750,
    tags: ['Personal Brand', 'Coaching', 'Multilingual'],
  },
  {
    id: 'lacalixienne',
    title: 'Lacalixienne Inc.',
    category: 'Healthcare · Corporate',
    description:
      'French-language site for a healthcare staffing agency, with separate paths for facilities requesting staff and professionals joining the team.',
    url: 'https://lacalixienne-inc.vercel.app',
    image: '/images/projects/lacalixienne-hero.webp',
    aspect: 1200 / 750,
    tags: ['Corporate', 'Healthcare', 'Web Development'],
  },
  {
    id: 'kmer-street',
    title: 'Kmer Street',
    category: 'E-commerce · Fashion',
    description:
      'Storefront for a Cameroonian streetwear brand, with a product catalogue in FCFA and a cart that hands checkout off to a pre-filled WhatsApp order.',
    url: 'https://preview-one-gold.vercel.app',
    image: '/images/projects/kmer-street-hero.webp',
    aspect: 1200 / 750,
    tags: ['E-commerce', 'Fashion', 'Shopify'],
  },
  {
    id: 'dymmdemaringuso',
    title: 'Do You Miss Me?',
    category: 'Micro-site · Interaction',
    description:
      'A playful micro-site with a cheeky twist: the "No" button darts away whenever you reach for it, while "Yes" swaps the animation and opens a direct WhatsApp chat.',
    url: 'https://dymmdemaringuso.vercel.app',
    image: '/images/projects/dymmdemaringuso-hero.webp',
    aspect: 1200 / 750,
    tags: ['Playful', 'Micro-site', 'Interaction'],
  },
  {
    id: 'meei-conference',
    title: 'MEEI Investment Conference',
    category: 'Corporate · Lead Generation',
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
    category: 'Logistics · Corporate',
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
    category: 'Tourism · Web Design',
    description:
      'Tourism website introducing Turkish travellers to Benin, with curated journeys, itineraries, and practical trip-planning guidance.',
    image: '/images/projects/africa-tourism-hero.webp',
    aspect: 1200 / 750,
    tags: ['Tourism', 'Web Design', 'Responsive Design'],
  },
  {
    id: 'meeihub',
    title: 'MEEI Hub',
    category: 'B2B · Corporate',
    description:
      'B2B trade hub connecting Turkish manufacturers with African markets across product categories, from construction materials to consumer goods.',
    url: 'https://www.meeihub.com.tr',
    image: '/images/projects/meeihub-hero.webp',
    aspect: 1200 / 750,
    tags: ['B2B', 'Corporate', 'Web Design'],
  },
  {
    id: 'meei-hub-draft',
    title: 'MEEI Hub: New Concept',
    category: 'B2B · UI/UX',
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
    category: 'Landing Page · UI/UX',
    description:
      'A calm, animated landing page for a journaling habit, easing beginners into writing with gentle storytelling and guided prompts.',
    url: 'https://cozy-website-two.vercel.app',
    image: '/images/projects/cozy-hero.webp',
    aspect: 1200 / 750,
    tags: ['Landing Page', 'UI/UX', 'Web Development'],
  },
  {
    id: 'pulsar',
    title: 'Pulsar Records',
    category: 'Landing Page · Web Design',
    description:
      'Concept site for an independent record label, translating an underground music identity into a bold digital presence.',
    url: 'https://pulsar-records.vercel.app',
    image: '/images/projects/pulsar-hero.webp',
    aspect: 1200 / 750,
    tags: ['Landing Page', 'Web Design'],
  },
  {
    id: 'farel-masterclass',
    title: 'AI Masterclass',
    category: 'Coaching · Conversion Design',
    description:
      'French-language webinar funnel for an AI automation masterclass, structured to move visitors from curiosity to registration.',
    url: 'https://farel-masterclass.vercel.app',
    image: '/images/projects/farel-masterclass-hero.webp',
    aspect: 1200 / 750,
    tags: ['Coaching', 'Landing Page', 'Conversion Design'],
  },
  {
    id: 'b2b-event',
    title: 'Turkey–Africa Trade Event',
    category: 'Landing Page · Lead Generation',
    description:
      'Event landing page presenting verified trade corridors between Turkey and Africa, built to convert visitors into qualified enquiries.',
    url: 'https://b2b-event.vercel.app',
    image: '/images/projects/b2b-event-hero.webp',
    aspect: 1200 / 852,
    tags: ['Landing Page', 'Lead Generation', 'Corporate'],
  },
  {
    id: 'farel-vsl',
    title: 'AI Coaching Sales Page',
    category: 'Coaching · Conversion Design',
    description:
      'French video sales page for 1-on-1 AI agent coaching, with tiered hour packs, video testimonials, and a single purchase-focused call to action.',
    url: 'https://farel-vsl.vercel.app',
    image: '/images/projects/farel-vsl-hero.webp',
    aspect: 1200 / 750,
    tags: ['Sales Page', 'Coaching', 'Conversion Design'],
  },
  {
    id: 'trade-delegation',
    title: 'Istanbul Trade Delegation',
    category: 'B2B · Lead Generation',
    description:
      'Application page for an invite-only, five-day buyer mission that connects African importers with verified Turkish manufacturers.',
    url: 'https://trade-delegation.vercel.app',
    image: '/images/projects/trade-delegation-hero.webp',
    aspect: 1200 / 750,
    tags: ['B2B', 'Landing Page', 'Lead Generation'],
  },
  {
    id: 'webinar-textile',
    title: 'Textile Suppliers Webinar',
    category: 'Webinar · Lead Generation',
    description:
      'Free-webinar funnel teaching textile businesses how to find, pay, and ship from verified suppliers in Türkiye and China, with a multi-step registration form.',
    url: 'https://webinar-textile-suppliers.vercel.app',
    image: '/images/projects/webinar-textile-hero.webp',
    aspect: 1200 / 750,
    tags: ['Webinar', 'Lead Generation', 'Landing Page'],
  },
  {
    id: 'importer-masterclass',
    title: 'Importer Masterclass',
    category: 'Webinar · Landing Page',
    description:
      'Bilingual masterclass page guiding first-time African importers through sourcing from Turkey and China, from first supplier to first order.',
    url: 'https://masterclass-beginners.vercel.app',
    image: '/images/projects/importer-masterclass-hero.webp',
    aspect: 1200 / 750,
    tags: ['Webinar', 'Landing Page', 'B2B'],
  },
  {
    id: 'soscale',
    title: 'SOSCALE',
    category: 'Hero Section · Motion',
    description:
      'Agency hero where a looping editorial video shows through a knocked-out wordmark, with letter-by-letter reveal motion and a fully responsive layout.',
    url: 'https://soscale-hero.vercel.app',
    image: '/images/projects/soscale-hero.webp',
    aspect: 1200 / 750,
    tags: ['Hero Section', 'Motion', 'Video'],
  },
  {
    id: 'cyber-hero',
    title: 'Augmented Self',
    category: 'Hero Section · Interaction',
    description:
      'Cyberpunk hero with a cursor-following spotlight that reveals a second image, grid parallax, and animated stats along concentric arcs.',
    url: 'https://cyber-hero-eight.vercel.app',
    image: '/images/projects/cyber-hero-hero.webp',
    aspect: 1200 / 750,
    tags: ['Hero Section', 'Interaction', 'React'],
  },
  {
    id: 'vex-hero',
    title: 'VEX',
    category: 'Hero Section · Web Design',
    description:
      'Venture-studio hero over full-screen video, with frosted liquid-glass navigation and a character-by-character headline entrance.',
    url: 'https://vex-hero-tawny.vercel.app',
    image: '/images/projects/vex-hero-hero.webp',
    aspect: 1200 / 750,
    tags: ['Hero Section', 'React', 'Motion'],
  },
  {
    id: 'freight-hero',
    title: 'Freight Logistics Hero',
    category: 'Hero Section · Logistics',
    description:
      'Logistics hero composed on the centre line of an aerial freight-train video, with mirrored feature blocks and a single choreographed entrance.',
    url: 'https://freight-hero.vercel.app',
    image: '/images/projects/freight-hero-hero.webp',
    aspect: 1200 / 750,
    tags: ['Hero Section', 'Logistics', 'Video'],
  },
  {
    id: 'toonhub',
    title: 'TOONHUB',
    category: 'Hero Section · E-commerce',
    description:
      'Bold product hero for a 3D collectible-figurine brand, with oversized display type and a carousel of characters.',
    url: 'https://toonhub-hero-theta.vercel.app',
    image: '/images/projects/toonhub-hero.webp',
    aspect: 1200 / 750,
    tags: ['Hero Section', 'E-commerce', 'Web Design'],
  },
  {
    id: 'landing-samples',
    title: 'Landing Page Samples',
    category: 'Landing Pages · Conversion Design',
    description:
      'Five conversion-focused landing pages, from a SaaS free-trial page to a testimonial wall, each built around a single measurable goal.',
    url: 'https://landing-page-samples-sigma.vercel.app',
    image: '/images/projects/landing-samples-hero.webp',
    aspect: 1200 / 750,
    tags: ['Landing Page', 'Conversion Design', 'Copywriting'],
  },
];
