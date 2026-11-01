import React from "react";

export function ShraddhaLogo({ className = "w-10 h-10" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Shraddha Rehabilitation Centre Logo"
    >
      {/* Soft background circle */}
      <circle cx="50" cy="50" r="46" fill="#F0FDFA" stroke="#0F766E" strokeWidth="2.5" />
      {/* Rising Sun (Hope & Renewal) */}
      <circle cx="50" cy="28" r="8" fill="#D97706" />
      {/* Central Lotus Petal */}
      <path
        d="M50 32C41 44 41 58 50 68C59 58 59 44 50 32Z"
        fill="#0F766E"
      />
      {/* Left Lotus Petal */}
      <path
        d="M47 67C33 61 26 48 31 37C39 43 44 54 47 67Z"
        fill="#0D9488"
        opacity="0.85"
      />
      {/* Right Lotus Petal */}
      <path
        d="M53 67C67 61 74 48 69 37C61 43 56 54 53 67Z"
        fill="#0D9488"
        opacity="0.85"
      />
      {/* Cupping Hands Base (Care & Faith) */}
      <path
        d="M22 58C26 74 38 82 50 82C62 82 74 74 78 58"
        stroke="#0F766E"
        strokeWidth="4.5"
        strokeLinecap="round"
      />
    </svg>
  );
}