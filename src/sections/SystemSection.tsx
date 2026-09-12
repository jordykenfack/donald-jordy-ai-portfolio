import { motion } from 'framer-motion';
import FadeIn from '../components/FadeIn';

const NODES = ['Traffic', 'Website', 'Lead', 'CRM', 'AI Qualification', 'Follow-Up', 'Booked Call'];

function Node({ label, index }: { label: string; index: number }) {
  return (
    <FadeIn delay={0.08 * index} y={0} x={0} duration={0.5} className="shrink-0">
      <span className="block whitespace-nowrap rounded-full border border-[#D7E2EA]/20 bg-white/[0.03] px-4 py-2.5 text-[11px] font-medium uppercase tracking-[0.1em] text-[#D7E2EA] sm:px-5 sm:py-3 sm:text-xs">
        {label}
      </span>
    </FadeIn>
  );
}

function Connector({ index, axis }: { index: number; axis: 'x' | 'y' }) {
  const isX = axis === 'x';
  return (
    <motion.div
      aria-hidden="true"
      initial={isX ? { scaleX: 0 } : { scaleY: 0 }}
      whileInView={isX ? { scaleX: 1 } : { scaleY: 1 }}
      viewport={{ once: true, margin: '0px', amount: 0.6 }}
      transition={{ delay: 0.08 * index + 0.15, duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
      className={isX ? 'h-px flex-1 bg-[#D7E2EA]/25 origin-left' : 'mx-auto h-8 w-px bg-[#D7E2EA]/25 origin-top'}
    />
  );
}

export default function SystemSection() {
  return (
    <section
      className="relative z-10 -mt-10 overflow-hidden rounded-t-[40px] bg-[#0C0C0C] px-5 py-20 sm:-mt-12 sm:rounded-t-[50px] sm:px-8 sm:py-24 md:-mt-14 md:rounded-t-[60px] md:px-10 md:py-32"
    >
      <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 text-center">
        <FadeIn delay={0} y={20}>
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-[#D7E2EA]/60">
            How It Connects
          </p>
        </FadeIn>
        <FadeIn delay={0.1} y={30}>
          <h2
            className="font-semibold leading-[1.05] tracking-tight text-[#F1EFEA]"
            style={{ fontSize: 'clamp(2rem, 5vw, 3.6rem)' }}
          >
            I don't just build
            <br />
            the website.
          </h2>
        </FadeIn>
        <FadeIn delay={0.2} y={20}>
          <p className="max-w-[50ch] text-base font-light leading-relaxed text-[#D7E2EA]/70 sm:text-lg">
            A strong website can become part of a larger system, capturing interest, moving
            information where it needs to go and automating what would otherwise happen
            manually.
          </p>
        </FadeIn>
      </div>

      {/* mobile: vertical flow */}
      <div className="mx-auto mt-16 flex max-w-xs flex-col items-center sm:hidden">
        {NODES.map((label, i) => (
          <div key={label} className="flex flex-col items-center">
            <Node label={label} index={i} />
            {i < NODES.length - 1 && <Connector index={i} axis="y" />}
          </div>
        ))}
      </div>

      {/* desktop/tablet: horizontal flow, wraps gracefully on tablet widths */}
      <div className="mx-auto mt-16 hidden max-w-5xl flex-wrap items-center justify-center gap-y-8 sm:flex md:mt-20">
        {NODES.map((label, i) => (
          <div key={label} className="flex items-center">
            <Node label={label} index={i} />
            {i < NODES.length - 1 && (
              <div className="mx-2 w-8 md:mx-3 md:w-12 lg:w-16">
                <Connector index={i} axis="x" />
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
