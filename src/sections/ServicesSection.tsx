import FadeIn from '../components/FadeIn';

const SERVICES = [
  {
    number: '01',
    name: 'Websites',
    headline: 'Websites built around the action you want people to take.',
    description:
      'Landing pages, business websites, personal brands and custom digital experiences designed to communicate clearly, feel premium and guide visitors toward the right next step.',
  },
  {
    number: '02',
    name: 'AI Automation',
    headline: "Automate the work that shouldn't need you.",
    description:
      'Lead workflows, follow-ups, CRM processes, onboarding, internal operations and AI-powered systems designed around the way your business actually works.',
  },
  {
    number: '03',
    name: 'Custom Digital Systems',
    headline: 'When the solution needs more than a website.',
    description:
      'Custom tools, integrations and digital systems that connect your website, data, workflows and AI into one useful experience.',
  },
];

export default function ServicesSection() {
  return (
    <section
      id="services"
      className="rounded-t-[40px] bg-white px-5 py-20 sm:rounded-t-[50px] sm:px-8 sm:py-24 md:rounded-t-[60px] md:px-10 md:py-32"
    >
      <FadeIn delay={0} y={40}>
        <h2
          className="mb-16 text-center font-black uppercase leading-none tracking-tight text-[#0C0C0C] sm:mb-20 md:mb-28"
          style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
        >
          What I Build
        </h2>
      </FadeIn>

      <div className="mx-auto max-w-5xl">
        {SERVICES.map((service, i) => (
          <FadeIn key={service.number} delay={i * 0.1} y={30}>
            <div
              className="flex flex-col gap-6 py-10 sm:flex-row sm:items-start sm:gap-10 sm:py-12 md:gap-14 md:py-16"
              style={
                i > 0
                  ? { borderTop: '1px solid rgba(12, 12, 12, 0.15)' }
                  : undefined
              }
            >
              <span
                className="font-black leading-none text-[#0C0C0C]"
                style={{ fontSize: 'clamp(2.5rem, 8vw, 110px)' }}
              >
                {service.number}
              </span>
              <div className="flex flex-col gap-4 sm:pt-2">
                <p className="text-xs font-medium uppercase tracking-[0.14em] text-[#0C0C0C]/45">
                  {service.name}
                </p>
                <h3
                  className="max-w-[16ch] font-semibold leading-[1.15] text-[#0C0C0C]"
                  style={{ fontSize: 'clamp(1.35rem, 3vw, 2.3rem)' }}
                >
                  {service.headline}
                </h3>
                <p
                  className="max-w-2xl font-light leading-relaxed text-[#0C0C0C] opacity-60"
                  style={{ fontSize: 'clamp(0.9rem, 1.4vw, 1.15rem)' }}
                >
                  {service.description}
                </p>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
