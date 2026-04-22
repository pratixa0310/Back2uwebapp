export function WaveSeparator({ flip = false }: { flip?: boolean }) {
  return (
    <div className={`relative w-full ${flip ? 'rotate-180' : ''}`}>
      <svg
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
        className="w-full h-12 md:h-20"
        fill="currentColor"
      >
        <path
          d="M0,0 C300,100 900,100 1200,0 L1200,120 L0,120 Z"
          className="text-muted/30"
        />
      </svg>
    </div>
  );
}
