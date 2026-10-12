'use client';
import React, { useEffect, useState } from 'react';

export function GoldenAura() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[60] mix-blend-screen" aria-hidden="true">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="w-full h-full object-cover"
      >
        <source src="/Falling Star Gold Glitter Background.mp4" type="video/mp4" />
      </video>
    </div>
  );
}
