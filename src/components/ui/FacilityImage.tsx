"use client";

import React, { useState, useEffect } from "react";

interface FacilityImageProps {
  src: string;
  altCandidates?: string[];
  fallbackSrc: string;
  alt: string;
  privacyBlur?: boolean;
  blurZone?: string;
  className?: string;
}

export function FacilityImage({
  src,
  altCandidates = [],
  fallbackSrc,
  alt,
  className = "w-full h-full object-cover",
}: FacilityImageProps) {
  const candidates = [
    src,
    src.replace(".jpg", ".jpeg"),
    src.replace(".jpg", ".png"),
    ...altCandidates,
    fallbackSrc,
  ];

  const [attemptIndex, setAttemptIndex] = useState(0);

  useEffect(() => {
    setAttemptIndex(0);
  }, [src]);

  const currentSrc = candidates[Math.min(attemptIndex, candidates.length - 1)];

  const handleImageError = () => {
    if (attemptIndex < candidates.length - 1) {
      setAttemptIndex((prev) => prev + 1);
    }
  };

  return (
    <div className="relative w-full h-full overflow-hidden bg-[#F3EFEA]">
      <img
        src={currentSrc}
        onError={handleImageError}
        alt={alt}
        loading="lazy"
        className={`${className} transition-transform duration-700 hover:scale-[1.03]`}
      />
    </div>
  );
}