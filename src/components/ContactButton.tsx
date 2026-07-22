export default function ContactButton() {
  return (
    <button
      type="button"
      className="rounded-full px-8 py-3 text-xs font-medium uppercase tracking-widest text-white sm:px-10 sm:py-3.5 sm:text-sm md:px-12 md:py-4 md:text-base"
      style={{
        background:
          'linear-gradient(123deg, #021F0F 7%, #0AB65C 37%, #1E9E63 72%, #7DBE00 100%)',
        boxShadow:
          '0px 4px 4px rgba(10, 182, 92, 0.25), 4px 4px 12px #1FA05F inset',
        outline: '2px solid #FFFFFF',
        outlineOffset: '-3px',
      }}
    >
      Contact Me
    </button>
  );
}
