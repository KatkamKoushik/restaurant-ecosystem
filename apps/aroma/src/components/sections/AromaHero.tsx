'use client';
import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';

/* ─────────────────────────────────────────────
   HERO CAROUSEL SLIDES
   ───────────────────────────────────────────── */
const HERO_SLIDES = [
  { src: '/ambience/dinning.jpg', alt: 'Elegant Dining Area' },
  { src: '/ambience/lighting.jpg', alt: 'Ambient Lighting' },
  { src: '/ambience/outerview.jpg', alt: 'Restaurant Exterior' },
  { src: '/ambience/bh view 1 with lighting.jpg', alt: 'Banquet Hall View' },
  { src: '/ambience/view1.webp', alt: 'Interior View' },
  { src: '/ambience/aroma 2.png', alt: 'Aroma Restaurant' },
];

export function AromaHero() {
  const [current, setCurrent] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const goTo = useCallback(
    (idx: number) => {
      if (isTransitioning || idx === current) return;
      setIsTransitioning(true);
      setCurrent(idx);
      setTimeout(() => setIsTransitioning(false), 1000);
    },
    [current, isTransitioning]
  );

  const goNext = useCallback(() => {
    goTo((current + 1) % HERO_SLIDES.length);
  }, [current, goTo]);

  // Auto-rotate every 5s
  useEffect(() => {
    const timer = setInterval(goNext, 5000);
    return () => clearInterval(timer);
  }, [goNext]);

  return (
    <section className="relative w-full h-screen overflow-hidden flex items-center justify-center pt-20">
      {/* ── Background Carousel ── */}
      {HERO_SLIDES.map((slide, idx) => (
        <div
          key={slide.src}
          className="absolute inset-0 z-0 transition-opacity duration-[1200ms] ease-in-out"
          style={{ opacity: idx === current ? 1 : 0 }}
        >
          <Image
            src={slide.src}
            alt={slide.alt}
            fill
            className={`object-cover transition-transform duration-[6000ms] ease-out ${
              idx === current ? 'scale-110' : 'scale-100'
            }`}
            priority={idx === 0}
            sizes="100vw"
          />
        </div>
      ))}

      {/* Dark Gradient Overlay */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-black/80 via-black/50 to-[#0A0A0B]" />

      {/* ── Hero Content ── */}
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto flex flex-col items-center">
        <div
          className="mb-6 opacity-0 animate-fade-in-up"
          style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}
        >
          <p className="text-[#DFB15B] font-serif text-sm md:text-base tracking-[0.4em] uppercase mb-4 font-bold">
            Welcome to
          </p>

          {/* ── Backlit Hero Title ── */}
          <h1 className="hero-backlit-title font-cinzel leading-tight mb-6">
            <span className="hero-main-text block text-5xl sm:text-6xl md:text-8xl font-bold tracking-[0.04em]">
              Aroma Fine Dine
            </span>
            <span className="hero-sub-text block text-xl sm:text-2xl md:text-3xl mt-2 tracking-[0.12em] font-light">
              Restaurant &amp; Banquet Hall
            </span>
          </h1>
        </div>

        {/* Backlit text styles */}
        <style jsx>{`
          .hero-backlit-title {
            position: relative;
          }

          .hero-main-text {
            color: #FFFFFF;
            text-shadow:
              0 0 15px rgba(223, 177, 91, 0.4),
              0 0 30px rgba(223, 177, 91, 0.3),
              0 0 45px rgba(223, 177, 91, 0.2),
              0 0 60px rgba(223, 177, 91, 0.1);
          }

          .hero-sub-text {
            color: #E8DCC8;
            text-shadow:
              0 0 10px rgba(223, 177, 91, 0.3),
              0 0 20px rgba(223, 177, 91, 0.2),
              0 0 30px rgba(223, 177, 91, 0.1);
          }

          @media (min-width: 768px) {
            .hero-main-text {
              animation: mainGlowPulse 4s ease-in-out infinite alternate;
            }
            .hero-sub-text {
              animation: subGlowPulse 4s ease-in-out 1s infinite alternate;
            }
          }

          @keyframes mainGlowPulse {
            0% {
              text-shadow:
                0 0 15px rgba(223, 177, 91, 0.4),
                0 0 30px rgba(223, 177, 91, 0.3),
                0 0 45px rgba(223, 177, 91, 0.2),
                0 0 60px rgba(223, 177, 91, 0.1);
            }
            100% {
              text-shadow:
                0 0 20px rgba(223, 177, 91, 0.5),
                0 0 40px rgba(223, 177, 91, 0.4),
                0 0 60px rgba(223, 177, 91, 0.3),
                0 0 80px rgba(223, 177, 91, 0.2);
            }
          }

          @keyframes subGlowPulse {
            0% {
              text-shadow:
                0 0 10px rgba(223, 177, 91, 0.3),
                0 0 20px rgba(223, 177, 91, 0.2),
                0 0 30px rgba(223, 177, 91, 0.1);
            }
            100% {
              text-shadow:
                0 0 15px rgba(223, 177, 91, 0.4),
                0 0 30px rgba(223, 177, 91, 0.3),
                0 0 45px rgba(223, 177, 91, 0.2);
            }
          }

          @keyframes fade-in-up {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          .animate-fade-in-up {
            animation: fade-in-up 0.8s ease-out;
          }
        `}</style>

        <div
          className="w-16 h-[2px] bg-[#DFB15B] mb-8 opacity-0 animate-fade-in-up"
          style={{ animationDelay: '0.4s', animationFillMode: 'forwards' }}
        />

        <p
          className="text-xl sm:text-2xl font-serif text-white/90 italic mb-10 opacity-0 animate-fade-in-up"
          style={{ animationDelay: '0.6s', animationFillMode: 'forwards' }}
        >
          &quot;Where Sophistication Meets Flavor in Hanamkonda.&quot;
        </p>

        <p
          className="text-sm sm:text-base md:text-lg text-neutral-300 font-light max-w-3xl leading-relaxed opacity-0 animate-fade-in-up"
          style={{ animationDelay: '0.8s', animationFillMode: 'forwards' }}
        >
          One of the largest hangout spots in Hanamkonda featuring a unique
          street-view dining experience, beautiful candlelight dinners, and a
          fully equipped banquet facility.
        </p>

        <div
          className="mt-12 flex flex-col sm:flex-row gap-6 opacity-0 animate-fade-in-up"
          style={{ animationDelay: '1s', animationFillMode: 'forwards' }}
        >
          <button
            onClick={() =>
              document
                .getElementById('menu-section')
                ?.scrollIntoView({ behavior: 'smooth' })
            }
            className="px-8 py-3 bg-[#DFB15B] text-black font-bold uppercase tracking-wider text-sm hover:bg-white transition-colors duration-300"
          >
            Explore Menu
          </button>
          <button
            onClick={() =>
              document
                .getElementById('banquet-section')
                ?.scrollIntoView({ behavior: 'smooth' })
            }
            className="px-8 py-3 border border-[#DFB15B] text-[#DFB15B] font-bold uppercase tracking-wider text-sm hover:bg-[#DFB15B] hover:text-black transition-colors duration-300"
          >
            Discover Banquet
          </button>
        </div>
      </div>

      {/* ── Slide Indicators ── */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2.5">
        {HERO_SLIDES.map((_, idx) => (
          <button
            key={idx}
            onClick={() => goTo(idx)}
            aria-label={`Go to slide ${idx + 1}`}
            className="relative group p-1"
          >
            <span
              className={`block rounded-full transition-all duration-500 ${
                idx === current
                  ? 'w-8 h-2 bg-[#DFB15B]'
                  : 'w-2 h-2 bg-white/30 group-hover:bg-white/60'
              }`}
            />
            {/* Progress fill for active slide */}
            {idx === current && (
              <span
                className="absolute inset-0 rounded-full"
                style={{
                  background:
                    'linear-gradient(90deg, #DFB15B 0%, rgba(223,177,91,0.3) 100%)',
                }}
              />
            )}
          </button>
        ))}
      </div>

    </section>
  );
}
