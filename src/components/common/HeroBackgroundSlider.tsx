'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface HeroBackgroundSliderProps {
  images: string[];
  intervalMs?: number;
  className?: string;
  mode?: 'step' | 'marquee';
  speed?: number; // seconds per full loop (marquee)
}

export default function HeroBackgroundSlider({
  images,
  intervalMs = 6000,
  className,
  mode = 'step',
  speed = 40,
}: HeroBackgroundSliderProps) {
  const [activeIndex, setActiveIndex] = React.useState(0);

  React.useEffect(() => {
    if (mode !== 'step' || images.length <= 1) return;
    const id = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % images.length);
    }, intervalMs);
    return () => clearInterval(id);
  }, [images.length, intervalMs, mode]);

  if (mode === 'marquee') {
    const sequence = [...images, ...images];
    return (
      <div
        aria-hidden
        className={cn(
          'absolute inset-0 overflow-hidden select-none pointer-events-none',
          className
        )}
      >
        <div
          className="flex h-full w-[200%]"
          style={{
            animationDuration: `${speed}s`,
          }}
        >
          <div className="flex h-full w-1/2 animate-scroll-x">
            {images.map((src, i) => (
              <div
                key={`a-${i}`}
                className="h-full w-screen shrink-0 grow-0"
                style={{
                  backgroundImage: `url(${src})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              />
            ))}
          </div>
          <div className="flex h-full w-1/2 animate-scroll-x" style={{ animationDelay: '0s' }}>
            {images.map((src, i) => (
              <div
                key={`b-${i}`}
                className="h-full w-screen shrink-0 grow-0"
                style={{
                  backgroundImage: `url(${src})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              />
            ))}
          </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-white/70 via-white/60 to-white/75" />
      </div>
    );
  }

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
      <div className="absolute inset-0 bg-gradient-to-b from-white/70 via-white/60 to-white/75" />
    </div>
  );
}


