export function PentagonArrow({
  strokeWidth = 2,
  flipX,
}: {
  strokeWidth?: number;
  flipX?: boolean;
}) {
  return (
    <svg
      height={37}
      width={57}
      viewBox="0 0 57 37"
      fill="none"
      style={{ transform: flipX ? "scaleX(-1)" : "" }}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M56 36L19.4194 36L2 18.5L19.4194 0.999998L56 1L56 36Z"
        stroke="currentColor"
        stroke-width={strokeWidth}
      />
    </svg>
  );
}
