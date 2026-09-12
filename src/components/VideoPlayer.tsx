import { useState } from 'react';
import { Play } from 'lucide-react';

interface VideoPlayerProps {
  title: string;
  /** YouTube/Vimeo embed URL or a direct video src. Leave unset to show the placeholder state. */
  videoSrc?: string;
  /** First-frame image shown before playback, for direct video sources. */
  posterSrc?: string;
  duration?: string;
  className?: string;
}

/**
 * Large 16:9 video moment. Works as a designed placeholder today — pass
 * `videoSrc` (a YouTube/Vimeo embed URL, or an .mp4) once the real video
 * exists and playback wires up automatically, no redesign needed.
 * A direct (.mp4/.webm) src renders inline immediately, no click-through
 * thumbnail; embed URLs still use the click-to-load poster.
 */
export default function VideoPlayer({ title, videoSrc, posterSrc, duration, className = '' }: VideoPlayerProps) {
  const [playing, setPlaying] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [notice, setNotice] = useState(false);

  const handleActivate = () => {
    if (!videoSrc) {
      setNotice(true);
      window.setTimeout(() => setNotice(false), 2400);
      return;
    }
    setPlaying(true);
  };

  const isDirectVideo = videoSrc?.match(/\.(mp4|webm)$/i);

  if (videoSrc && isDirectVideo) {
    return (
      <div
        className={`relative aspect-video w-full overflow-hidden rounded-[24px] bg-[#141414] sm:rounded-[32px] md:rounded-[40px] ${className}`}
      >
        <video
          src={videoSrc}
          poster={posterSrc}
          controls
          playsInline
          preload="none"
          className="absolute inset-0 h-full w-full object-cover"
        />

        {duration && (
          <span className="pointer-events-none absolute bottom-4 right-4 rounded-full bg-black/50 px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.12em] text-white/90 sm:bottom-6 sm:right-6">
            {duration}
          </span>
        )}
      </div>
    );
  }

  return (
    <div
      className={`group relative aspect-video w-full overflow-hidden rounded-[24px] bg-[#141414] sm:rounded-[32px] md:rounded-[40px] ${className}`}
    >
      {playing && videoSrc ? (
        <iframe
          src={videoSrc}
          title={title}
          allow="accelerate-transform-encoded-media; autoplay; encrypted-media; picture-in-picture"
          allowFullScreen
          onLoad={() => setLoaded(true)}
          className="absolute inset-0 h-full w-full border-0"
        />
      ) : (
        <button
          type="button"
          onClick={handleActivate}
          aria-label={videoSrc ? `Play video: ${title}` : `${title}, video coming soon`}
          data-cta="vsl-play"
          className="absolute inset-0 flex h-full w-full flex-col items-center justify-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-[#D7E2EA]"
        >
          {/* editorial placeholder poster — a duotone gradient rather than a stretched avatar */}
          <div
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(120% 140% at 50% 15%, #1b241d 0%, #0C0C0C 60%, #0C0C0C 100%)',
            }}
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage:
                'repeating-linear-gradient(115deg, transparent 0 2px, rgba(215,226,234,0.5) 2px 3px, transparent 3px 40px)',
            }}
          />

          <div className="relative flex flex-col items-center gap-6">
            <img
              src="/donald.jpg"
              alt=""
              aria-hidden="true"
              className="h-20 w-20 rounded-full object-cover ring-1 ring-white/15 sm:h-24 sm:w-24"
            />
            <span
              className="flex h-16 w-16 items-center justify-center rounded-full text-white transition-transform duration-300 ease-out group-hover:scale-110 sm:h-20 sm:w-20"
              style={{
                background: 'linear-gradient(123deg, #021F0F 7%, #0AB65C 37%, #1E9E63 72%, #7DBE00 100%)',
                boxShadow: '0px 4px 4px rgba(10, 182, 92, 0.25), 4px 4px 12px #1FA05F inset',
              }}
            >
              <Play size={26} fill="currentColor" className="ml-1" aria-hidden="true" />
            </span>
            <span className="text-xs font-medium uppercase tracking-[0.16em] text-[#D7E2EA]/70">
              {videoSrc ? 'Watch the video' : 'Video coming soon'}
            </span>
          </div>

          {duration && (
            <span className="absolute bottom-4 right-4 rounded-full bg-black/50 px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.12em] text-white/90 sm:bottom-6 sm:right-6">
              {duration}
            </span>
          )}
        </button>
      )}

      {playing && videoSrc && !loaded && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 flex items-center justify-center bg-[#0C0C0C]"
        >
          <span className="h-10 w-10 animate-spin rounded-full border-2 border-white/20 border-t-white/80" />
        </div>
      )}

      <div
        role="status"
        aria-live="polite"
        className={`pointer-events-none absolute bottom-5 left-1/2 -translate-x-1/2 rounded-full bg-white px-4 py-2 text-xs font-medium text-[#0C0C0C] transition-opacity duration-300 ${
          notice ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {notice ? "The video isn't up yet, check back soon." : ''}
      </div>
    </div>
  );
}
