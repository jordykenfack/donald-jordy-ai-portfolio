import FadeIn from '../components/FadeIn';

const SERVICES = [
  {
    number: '01',
    name: 'Website Design',
    description:
      'Modern, conversion-focused websites designed end to end — structure, layout, typography, and copy that guide every visitor toward one clear action.',
  },
  {
    number: '02',
    name: 'AI-Powered Development',
    description:
      'Sites built with AI-assisted workflows, so what normally takes an agency months goes live in weeks — without cutting corners on quality.',
  },
  {
    number: '03',
    name: 'Business Automations',
    description:
      'Connected workflows that handle the busywork for you — lead capture, follow-up emails, bookings, and CRM updates that run on their own.',
  },
  {
    number: '04',
    name: 'Landing Pages',
    description:
      'Focused pages for launches, campaigns, and offers, built to turn clicks from ads and social into enquiries and sales.',
  },
  {
    number: '05',
    name: 'Ongoing Support',
    description:
      'Updates, fixes, and improvements after launch, so your site keeps pace with your business without you ever touching code.',
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
          Services
        </h2>
      </FadeIn>

      <div className="mx-auto max-w-5xl">
        {SERVICES.map((service, i) => (
          <FadeIn key={service.number} delay={i * 0.1} y={30}>
            <div
              className="flex items-start gap-6 py-8 sm:gap-10 sm:py-10 md:gap-14 md:py-12"
              style={
                i > 0
                  ? { borderTop: '1px solid rgba(12, 12, 12, 0.15)' }
                  : undefined
              }
            >
              <span
                className="font-black leading-none text-[#0C0C0C]"
                style={{ fontSize: 'clamp(3rem, 10vw, 140px)' }}
              >
                {service.number}
              </span>
              <div className="flex flex-col gap-3 pt-2 sm:gap-4">
                <h3
                  className="font-medium uppercase text-[#0C0C0C]"
                  style={{ fontSize: 'clamp(1rem, 2.2vw, 2.1rem)' }}
                >
                  {service.name}
                </h3>
                <p
                  className="max-w-2xl font-light leading-relaxed text-[#0C0C0C] opacity-60"
                  style={{ fontSize: 'clamp(0.85rem, 1.6vw, 1.25rem)' }}
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
