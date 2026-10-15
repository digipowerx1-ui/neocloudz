import React from "react";
import Image from "next/image";

interface IconProps {
  className?: string;
  size?: number;
}

/**
 * NVIDIA Logo using user-provided /nvidia.png
 */
export function NvidiaLogo({ className = "", size = 38 }: IconProps) {
  return (
    <Image
      src="/nvidia.png"
      alt="NVIDIA"
      width={size}
      height={size}
      className={`object-contain max-w-full max-h-full ${className}`}
      priority
    />
  );
}

/**
 * Alibaba Qwen Logo using user-provided /quen.png
 */
export function QwenLogo({ className = "", size = 38 }: IconProps) {
  return (
    <Image
      src="/quen.png"
      alt="Qwen"
      width={size}
      height={size}
      className={`object-contain max-w-full max-h-full ${className}`}
      priority
    />
  );
}

/**
 * zai-org / Zhipu GLM Geometric 'Z' Logo
 */
export function ZaiOrgLogo({ className = "w-9 h-9", size }: IconProps) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      className={className}
      style={size ? { width: size, height: size } : undefined}
      aria-hidden="true"
    >
      <rect width="48" height="48" rx="10" fill="#18181b" />
      <path
        d="M12 14.5h24l-11 11.5h11V33.5H12l11-11.5H12V14.5z"
        fill="#ffffff"
      />
    </svg>
  );
}

/**
 * Google Multi-color 'G' Logo
 */
export function GoogleLogo({ className = "w-8 h-8", size }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      style={size ? { width: size, height: size } : undefined}
      aria-hidden="true"
    >
      <path
        fill="#4285F4"
        d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
      />
      <path
        fill="#FBBC05"
        d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.14-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.97 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
      />
      <path
        fill="#EA4335"
        d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
      />
    </svg>
  );
}

/**
 * Moonshot AI / Kimi Wave Disc Logo
 */
export function MoonshotLogo({ className = "w-9 h-9", size }: IconProps) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      className={className}
      style={size ? { width: size, height: size } : undefined}
      aria-hidden="true"
    >
      <circle cx="24" cy="24" r="22" fill="#09090b" />
      <g stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round">
        <line x1="12" y1="16" x2="36" y2="16" strokeDasharray="3 4 10 3" />
        <line x1="10" y1="21.5" x2="38" y2="21.5" strokeDasharray="6 3 12 4" />
        <line x1="11" y1="27" x2="37" y2="27" strokeDasharray="4 4 8 5" />
        <line x1="14" y1="32.5" x2="34" y2="32.5" strokeDasharray="2 3 6 4" />
      </g>
    </svg>
  );
}
