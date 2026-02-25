interface WaveDividerProps {
  variant?: "light-to-dark" | "dark-to-light";
  className?: string;
}

export function WaveDivider({
  variant = "light-to-dark",
  className = "",
}: WaveDividerProps) {
  const fills: Record<string, { bg: string; wave: string }> = {
    "light-to-dark": {
      bg: "bg-background",
      wave: "text-secondary",
    },
    "dark-to-light": {
      bg: "bg-secondary",
      wave: "text-background",
    },
  };

  const { bg, wave } = fills[variant];

  return (
    <div className={`relative w-full overflow-hidden leading-[0] ${bg} ${className}`} aria-hidden="true">
      <svg
        className={`relative block w-full h-[60px] sm:h-[80px] lg:h-[100px] ${wave}`}
        viewBox="0 0 1440 100"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0,40 C360,100 1080,0 1440,60 L1440,100 L0,100 Z"
          fill="currentColor"
        />
      </svg>
    </div>
  );
}
