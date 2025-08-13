'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface HeroBackgroundSliderProps {
  images: string[];
  intervalMs?: number;
  className?: string;
}

export default function HeroBackgroundSlider({
  images,
  intervalMs = 6000,
  className,
}: HeroBackgroundSliderProps) {
  const [activeIndex, setActiveIndex] = React.useState(0);

  React.useEffect(() => {
    if (images.length <= 1) return;
    const id = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % images.length);
    }, intervalMs);
    return () => clearInterval(id);
  }, [images.length, intervalMs]);

  return (
    <div
      aria-hidden
      className={cn(
        'absolute inset-0 overflow-hidden select-none pointer-events-none',
        className
      )}
    >
      <div
        className="h-full w-full"
        style={{
          transform: `translateX(-${activeIndex * 100}%)`,
          transition: 'transform 700ms ease-in-out',
          display: 'flex',
          width: `${images.length * 100}%`,
        }}
      >
        {images.map((src, i) => (
          <div
            key={i}
            className="h-full w-full shrink-0 grow-0"
            style={{
              backgroundImage: `url(${src})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
        ))}
      </div>

      {/* Soft overlay for readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/70 via-white/60 to-white/75" />
    </div>
  );
}


