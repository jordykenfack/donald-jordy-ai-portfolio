// Cross-portfolio switcher — links this AI site to the gateway (Home) and to
// Donald Jordy's Data Science site. AI Studio is the current experience.
// Styled to sit inside the dark-on-cream hero nav.
//
// Destinations resolve from one place. In development they point at the local
// dev servers; in production they point at donaldjordy.com and its subdomains.
// Override in dev via a .env.local (see .env.example) if your ports differ.
const isProd = import.meta.env.PROD;
const HOME_URL = import.meta.env.VITE_GATEWAY_URL ?? (isProd ? 'https://donaldjordy.com' : 'http://localhost:5175');
const DATA_SCIENCE_URL = import.meta.env.VITE_DATA_PORTFOLIO_URL ?? (isProd ? 'https://data.donaldjordy.com' : 'http://localhost:3000');

const linkClass =
  'rounded-full px-2.5 py-1 text-[#111111]/60 transition-colors duration-200 hover:text-[#111111] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#111111]';

export default function PortfolioSwitcher() {
  return (
    <div
      role="group"
      aria-label="Switch portfolio"
      className="inline-flex items-center gap-0.5 rounded-full border border-[#111111]/20 p-0.5 text-[11px] font-medium uppercase tracking-[0.06em]"
    >
      <a href={HOME_URL} className={linkClass}>Home</a>
      <a href={DATA_SCIENCE_URL} className={linkClass}>Data Science</a>
      <span aria-current="true" className="rounded-full bg-[#111111] px-2.5 py-1 text-[#F1EFEA]">
        AI Studio
      </span>
    </div>
  );
}
