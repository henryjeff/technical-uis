export function DashedCircle({
  size,
  strokeWidth = 2,
  dash,
  rotate,
  className,
  mask,
}: {
  size: number;
  strokeWidth?: number;
  rotate?: number;
  dash: {
    dash: number;
    gap: number;
  };
  className?: string;
  mask?: {};
}) {
  const center = size / 2;
  const r = size / 2 - strokeWidth / 2;

  return (
    <svg
      width={size}
      height={size}
      className={className}
      viewBox={`0 0 ${size} ${size}}`}
      fill="none"
      style={{ transform: `rotate(${rotate}deg)` }}
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx={center}
        cy={center}
        r={r}
        stroke="currentColor"
        stroke-width={strokeWidth}
        stroke-dasharray={`${dash.dash} ${dash.gap}`}
      />
    </svg>
  );
}
