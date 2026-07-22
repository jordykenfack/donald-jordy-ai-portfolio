import { useRef, type CSSProperties } from 'react';
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion';

interface AnimatedTextProps {
  text: string;
  /** substring of `text` that reveals in green instead of the base color */
  highlight?: string;
  className?: string;
  style?: CSSProperties;
}

const BASE_COLOR = '#D7E2EA';
const HIGHLIGHT_COLOR = '#22C55E';

function Char({
  char,
  progress,
  range,
  highlight,
}: {
  char: string;
  progress: MotionValue<number>;
  range: [number, number];
  highlight: boolean;
}) {
  const opacity = useTransform(progress, range, [0.2, 1]);
  const color = useTransform(progress, range, [BASE_COLOR, HIGHLIGHT_COLOR]);
  return (
    <span className="relative">
      <span className="invisible">{char}</span>
      <motion.span
        style={highlight ? { opacity, color } : { opacity }}
        className="absolute left-0"
      >
        {char}
      </motion.span>
    </span>
  );
}

export default function AnimatedText({ text, highlight, className, style }: AnimatedTextProps) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.8', 'end 0.2'],
  });

  const chars = text.split('');
  const highlightStart = highlight ? text.indexOf(highlight) : -1;
  const highlightEnd = highlightStart === -1 ? -1 : highlightStart + (highlight?.length ?? 0);

  return (
    <p ref={ref} className={className} style={style}>
      {chars.map((char, i) => (
        <Char
          key={i}
          char={char}
          progress={scrollYProgress}
          range={[i / chars.length, (i + 1) / chars.length]}
          highlight={i >= highlightStart && i < highlightEnd}
        />
      ))}
    </p>
  );
}
