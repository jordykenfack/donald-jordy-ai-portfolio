import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';

type CommonProps = {
  children: ReactNode;
  variant?: 'primary' | 'secondary';
  size?: 'md' | 'sm';
  className?: string;
};

type AsButton = CommonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

type AsLink = CommonProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

type ButtonProps = AsButton | AsLink;

const sizeClass = {
  md: 'px-8 py-3 text-xs sm:px-10 sm:py-3.5 sm:text-sm md:px-11 md:py-4 md:text-sm',
  sm: 'px-6 py-2.5 text-xs',
};

const primaryStyle = {
  background: 'linear-gradient(123deg, #021F0F 7%, #0AB65C 37%, #1E9E63 72%, #7DBE00 100%)',
  boxShadow: '0px 4px 4px rgba(10, 182, 92, 0.25), 4px 4px 12px #1FA05F inset',
  outline: '2px solid #FFFFFF',
  outlineOffset: '-3px',
};

const base =
  'inline-flex items-center justify-center gap-2 rounded-full font-medium uppercase tracking-widest transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 disabled:cursor-not-allowed disabled:opacity-60';

// no `text-current` here on purpose — every caller supplies its own text
// color via `className`, and border/bg/outline still pick it up through
// currentColor. Setting color here too would tie with the caller's override
// in the cascade (same specificity), which is what silently broke it before.
const secondaryClass =
  'border-2 border-current/25 hover:border-current/60 hover:bg-current/5 focus-visible:outline-current';

/** Shared CTA — the site's one visual "brand" button, used for every primary/secondary action. */
export default function Button({ children, variant = 'primary', size = 'md', className = '', ...rest }: ButtonProps) {
  const classes = `${base} ${sizeClass[size]} ${variant === 'secondary' ? secondaryClass : 'text-white focus-visible:outline-white'} ${className}`;
  const style = variant === 'primary' ? primaryStyle : undefined;

  if ('href' in rest && rest.href !== undefined) {
    const { href, ...anchorRest } = rest as AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };
    return (
      <a href={href} className={classes} style={style} {...anchorRest}>
        {children}
      </a>
    );
  }

  const buttonRest = rest as ButtonHTMLAttributes<HTMLButtonElement>;
  return (
    <button type="button" className={classes} style={style} {...buttonRest}>
      {children}
    </button>
  );
}
