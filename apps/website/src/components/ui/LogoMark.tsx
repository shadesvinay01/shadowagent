"use client";

interface LogoMarkProps {
  size?: number;
  className?: string;
}

export default function LogoMark({ size = 36, className = "" }: LogoMarkProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Outer hexagon */}
      <path
        d="M18 2L32 10V26L18 34L4 26V10L18 2Z"
        fill="#0A0A14"
        stroke="rgba(255,255,255,0.15)"
        strokeWidth="1"
      />

      {/* Inner geometric shadow mark — two stacked parallelograms offset */}
      {/* Top blade — bright */}
      <path
        d="M11 13L19 9L25 13L17 17L11 13Z"
        fill="white"
        fillOpacity="0.95"
      />
      {/* Bottom blade — dimmed (the "shadow") */}
      <path
        d="M11 14.5L17 18.5V25L11 21V14.5Z"
        fill="white"
        fillOpacity="0.35"
      />
      {/* Right blade — mid tone */}
      <path
        d="M17 18.5L25 14.5V21L17 25V18.5Z"
        fill="white"
        fillOpacity="0.6"
      />
    </svg>
  );
}
