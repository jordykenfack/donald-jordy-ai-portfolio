import type { ReactNode } from 'react';

interface MacbookShowcaseProps {
  className?: string;
  children?: ReactNode;
}

export default function MacbookShowcase({ className = '', children }: MacbookShowcaseProps) {
  return (
    <div className={`macbook-showcase ${className}`.trim()}>
      <div className="macbook-screen">
        {/* FUTURE SCREEN CONTENT: place the website animation here (as children
            of this container). It is clipped to the MacBook screen opening. */}
        {children}
      </div>
      <img
        src="/assets/macbook-frame-transparent.png"
        alt=""
        aria-hidden="true"
        className="macbook-frame"
      />
    </div>
  );
}
