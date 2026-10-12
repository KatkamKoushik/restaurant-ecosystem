'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';

/**
 * Premium full-screen loading splash with the Aroma logo.
 * Shows on initial page load, then gracefully fades out.
 */
export function LoadingScreen({ children }: { children: React.ReactNode }) {
  const [phase, setPhase] = useState<'loading' | 'fadeOut' | 'done'>('loading');

  useEffect(() => {
    // Show the splash for a minimum duration, then fade out
    const timer = setTimeout(() => setPhase('fadeOut'), 2200);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (phase === 'fadeOut') {
      const timer = setTimeout(() => setPhase('done'), 800);
      return () => clearTimeout(timer);
    }
  }, [phase]);

  // Once done, render children only — no overlay at all
  if (phase === 'done') {
    return <>{children}</>;
  }

  return (
    <>
      {/* Page content underneath (invisible while loading) */}
      <div
        className="contents"
        style={{ visibility: phase === 'loading' ? 'hidden' : 'visible' }}
      >
        {children}
      </div>

      {/* ═══════ LOADING OVERLAY ═══════ */}
      <div
        className={`
          fixed inset-0 z-[9999] flex flex-col items-center justify-center
          bg-[#0B0B0C] transition-opacity duration-700 ease-out
          ${phase === 'fadeOut' ? 'opacity-0 pointer-events-none' : 'opacity-100'}
        `}
      >
        {/* Radial ambient glow behind logo */}
        <div
          className="absolute w-[400px] h-[400px] rounded-full opacity-20 blur-[50px] md:blur-[100px] pointer-events-none"
          style={{
            background: 'radial-gradient(circle, #C5A059 0%, transparent 70%)',
          }}
        />

        {/* Logo container */}
        <div className="relative flex flex-col items-center gap-6">
          {/* Logo image with scale + fade animation */}
          <div
            className="relative w-36 h-36 sm:w-44 sm:h-44"
            style={{
              animation: 'logoReveal 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards',
            }}
          >
            <Image
              src="/brand/logo.png"
              alt="Aroma Fine Dine"
              fill
              className="object-contain drop-shadow-[0_0_30px_rgba(197,160,89,0.3)]"
              priority
            />
          </div>

          {/* Animated gold line */}
          <div className="relative w-48 h-[2px] overflow-hidden">
            <div
              className="absolute inset-y-0 left-0 w-full"
              style={{
                background:
                  'linear-gradient(90deg, transparent, #C5A059, transparent)',
                animation: 'lineGlow 1.8s ease-in-out infinite',
              }}
            />
          </div>

          {/* Tagline */}
          <p
            className="text-[#C5A059]/70 text-xs tracking-[0.35em] uppercase font-medium"
            style={{
              animation: 'taglineReveal 1s ease-out 0.6s both',
            }}
          >
            Fine Dining &bull; Banquets
          </p>

          {/* Subtle dot loader */}
          <div className="flex items-center gap-2 mt-2">
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="w-1.5 h-1.5 rounded-full bg-[#C5A059]/50"
                style={{
                  animation: `dotPulse 1.2s ease-in-out ${i * 0.2}s infinite`,
                }}
              />
            ))}
          </div>
        </div>

        {/* CSS Keyframes */}
        <style jsx>{`
          @keyframes logoReveal {
            0% {
              opacity: 0;
              transform: scale(0.7) translateY(10px);
              filter: blur(8px);
            }
            100% {
              opacity: 1;
              transform: scale(1) translateY(0);
              filter: blur(0px);
            }
          }

          @keyframes lineGlow {
            0% {
              transform: translateX(-100%);
            }
            50% {
              transform: translateX(0%);
            }
            100% {
              transform: translateX(100%);
            }
          }

          @keyframes taglineReveal {
            0% {
              opacity: 0;
              transform: translateY(8px);
              letter-spacing: 0.5em;
            }
            100% {
              opacity: 1;
              transform: translateY(0);
              letter-spacing: 0.35em;
            }
          }

          @keyframes dotPulse {
            0%, 100% {
              opacity: 0.3;
              transform: scale(0.8);
            }
            50% {
              opacity: 1;
              transform: scale(1.3);
            }
          }
        `}</style>
      </div>
    </>
  );
}
