import { useState, type FormEvent } from 'react';
import { CheckCircle2, Loader2 } from 'lucide-react';
import FadeIn from '../components/FadeIn';
import Button from '../components/Button';
import { SITE } from '../config/site';

const INTERESTS = ['Website', 'AI Automation', 'Website + Automation', 'Custom Digital System', 'Something Else'];
const BUDGETS = ['Under $1,000', '$1,000–$2,500', '$2,500–$5,000', '$5,000+', 'Not sure yet'];

interface FormState {
  name: string;
  email: string;
  interest: string;
  details: string;
  budget: string;
}

const EMPTY: FormState = { name: '', email: '', interest: '', details: '', budget: '' };

const inputClass =
  'w-full border-0 border-b border-white/20 bg-transparent py-3 text-base text-[#F1EFEA] placeholder:text-[#D7E2EA]/35 outline-none transition-colors duration-200 focus:border-[#D7E2EA]';

const labelClass = 'text-xs font-medium uppercase tracking-[0.14em] text-[#D7E2EA]/60';

const pillInputClass =
  'peer sr-only';
const pillLabelClass =
  'cursor-pointer rounded-full border border-white/15 px-4 py-2 text-xs font-medium uppercase tracking-wide text-[#D7E2EA]/70 transition-colors duration-150 hover:border-white/35 peer-checked:border-[#0AB65C] peer-checked:bg-[#0AB65C]/10 peer-checked:text-[#F1EFEA] peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-[#D7E2EA]';

function buildMailto(form: FormState) {
  const subject = `Project inquiry: ${form.interest || 'New project'}`;
  const body = [
    `Name: ${form.name}`,
    `Email: ${form.email}`,
    `Interested in: ${form.interest}`,
    form.budget ? `Budget: ${form.budget}` : null,
    '',
    'Project details:',
    form.details,
  ]
    .filter((line) => line !== null)
    .join('\n');
  return `mailto:${SITE.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export default function ContactSection() {
  const [form, setForm] = useState<FormState>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const set = (key: keyof FormState) => (value: string) => setForm((f) => ({ ...f, [key]: value }));

  const validate = (): boolean => {
    const next: Partial<Record<keyof FormState, string>> = {};
    if (!form.name.trim()) next.name = 'Please enter your name.';
    if (!form.email.trim()) next.email = 'Please enter your email.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = 'That email looks incomplete.';
    if (!form.interest) next.interest = 'Pick what you’re interested in.';
    if (!form.details.trim()) next.details = 'Tell me a bit about the project.';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus('submitting');
    // No backend is wired up yet. This opens the visitor's email client with
    // the form contents pre-filled — a functional, credential-free fallback.
    // To collect submissions directly, swap this for a POST to a form
    // service (Formspree, Resend, a custom API route) and keep the same
    // validation/state flow above.
    window.setTimeout(() => {
      window.location.href = buildMailto(form);
      setStatus('success');
    }, 500);
  };

  const bookingHref = SITE.bookingUrl || `mailto:${SITE.email}?subject=${encodeURIComponent('Let’s talk about a project')}`;

  if (status === 'success') {
    return (
      <section id="contact" className="bg-[#0C0C0C] px-5 py-24 sm:px-8 sm:py-28 md:px-10 md:py-36">
        <FadeIn delay={0} y={20}>
          <div className="mx-auto flex max-w-xl flex-col items-center gap-5 text-center">
            <CheckCircle2 size={40} className="text-[#0AB65C]" aria-hidden="true" />
            <h2 className="text-2xl font-semibold text-[#F1EFEA] sm:text-3xl">Your email client should be open.</h2>
            <p className="text-sm font-light leading-relaxed text-[#D7E2EA]/75 sm:text-base">
              If nothing opened, email me directly at{' '}
              <a href={`mailto:${SITE.email}`} className="text-[#D7E2EA] underline underline-offset-4">
                {SITE.email}
              </a>{' '}
              and I'll get back to you with the best next step.
            </p>
            <Button variant="secondary" className="mt-2 text-[#D7E2EA]" onClick={() => { setForm(EMPTY); setStatus('idle'); }}>
              Send another
            </Button>
          </div>
        </FadeIn>
      </section>
    );
  }

  return (
    <section id="contact" className="bg-[#0C0C0C] px-5 py-24 sm:px-8 sm:py-28 md:px-10 md:py-36">
      <div className="mx-auto max-w-2xl">
        <FadeIn delay={0} y={30}>
          <h2 className="text-center font-semibold leading-[1.05] tracking-tight text-[#F1EFEA]" style={{ fontSize: 'clamp(2.25rem, 6vw, 4rem)' }}>
            Have something in mind?
          </h2>
        </FadeIn>
        <FadeIn delay={0.1} y={20}>
          <p className="mx-auto mt-5 max-w-[46ch] text-center text-sm font-light leading-relaxed text-[#D7E2EA]/75 sm:text-base">
            Tell me a little about what you're trying to build. I'll take a look and get back to
            you with the best next step.
          </p>
        </FadeIn>

        <FadeIn delay={0.2} y={30} className="mt-14 sm:mt-16">
          <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-8">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className={labelClass}>
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? 'name-error' : undefined}
                  value={form.name}
                  onChange={(e) => set('name')(e.target.value)}
                  className={inputClass}
                  placeholder="Your name"
                />
                {errors.name && (
                  <p id="name-error" className="mt-2 text-xs text-[#F87171]">
                    {errors.name}
                  </p>
                )}
              </div>
              <div>
                <label htmlFor="email" className={labelClass}>
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? 'email-error' : undefined}
                  value={form.email}
                  onChange={(e) => set('email')(e.target.value)}
                  className={inputClass}
                  placeholder="you@email.com"
                />
                {errors.email && (
                  <p id="email-error" className="mt-2 text-xs text-[#F87171]">
                    {errors.email}
                  </p>
                )}
              </div>
            </div>

            <fieldset>
              <legend className={labelClass}>What are you interested in?</legend>
              <div className="mt-3 flex flex-wrap gap-2.5" role="radiogroup" aria-describedby={errors.interest ? 'interest-error' : undefined}>
                {INTERESTS.map((option) => (
                  <label key={option} className={pillLabelClass}>
                    <input
                      type="radio"
                      name="interest"
                      value={option}
                      checked={form.interest === option}
                      onChange={(e) => set('interest')(e.target.value)}
                      className={pillInputClass}
                    />
                    {option}
                  </label>
                ))}
              </div>
              {errors.interest && (
                <p id="interest-error" className="mt-2 text-xs text-[#F87171]">
                  {errors.interest}
                </p>
              )}
            </fieldset>

            <div>
              <label htmlFor="details" className={labelClass}>
                Project details
              </label>
              <textarea
                id="details"
                name="details"
                rows={4}
                required
                aria-invalid={!!errors.details}
                aria-describedby={errors.details ? 'details-error' : undefined}
                value={form.details}
                onChange={(e) => set('details')(e.target.value)}
                className={`${inputClass} resize-none`}
                placeholder="Tell me what you're building, what's not working, or what you'd like to improve."
              />
              {errors.details && (
                <p id="details-error" className="mt-2 text-xs text-[#F87171]">
                  {errors.details}
                </p>
              )}
            </div>

            <fieldset>
              <legend className={labelClass}>Budget range (optional)</legend>
              <div className="mt-3 flex flex-wrap gap-2.5" role="radiogroup">
                {BUDGETS.map((option) => (
                  <label key={option} className={pillLabelClass}>
                    <input
                      type="radio"
                      name="budget"
                      value={option}
                      checked={form.budget === option}
                      onChange={(e) => set('budget')(e.target.value)}
                      className={pillInputClass}
                    />
                    {option}
                  </label>
                ))}
              </div>
            </fieldset>

            <div className="mt-4 flex flex-col items-center gap-6 sm:flex-row sm:justify-between">
              <Button type="submit" disabled={status === 'submitting'} data-cta="contact-submit" className="w-full sm:w-auto">
                {status === 'submitting' ? (
                  <>
                    <Loader2 size={16} className="animate-spin" aria-hidden="true" />
                    Sending
                  </>
                ) : (
                  <>Send Project Details →</>
                )}
              </Button>
              <div className="flex flex-col items-center gap-2 text-center sm:items-end sm:text-right">
                <p className="text-xs text-[#D7E2EA]/50">Prefer to talk directly?</p>
                <Button href={bookingHref} variant="secondary" size="sm" data-cta="book-call" className="text-[#F1EFEA]" target={SITE.bookingUrl ? '_blank' : undefined} rel={SITE.bookingUrl ? 'noopener noreferrer' : undefined}>
                  Book a Call →
                </Button>
              </div>
            </div>
          </form>
        </FadeIn>
      </div>
    </section>
  );
}
