'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

const MENU_PAGES = [
  '/menu/menu1.webp',
  '/menu/menu2.webp',
  '/menu/menu3.webp',
  '/menu/menu4.webp',
  '/menu/menu5.webp',
  '/menu/menu6.webp',
];

export function PhysicalMenuClient() {
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

  const openLightbox = (idx: number) => setLightboxIdx(idx);
  const closeLightbox = () => setLightboxIdx(null);
  const goPrev = () =>
    setLightboxIdx((prev) =>
      prev !== null ? (prev - 1 + MENU_PAGES.length) % MENU_PAGES.length : null
    );
  const goNext = () =>
    setLightboxIdx((prev) =>
      prev !== null ? (prev + 1) % MENU_PAGES.length : null
    );

  // Keyboard navigation
  React.useEffect(() => {
    if (lightboxIdx === null) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') goPrev();
      if (e.key === 'ArrowRight') goNext();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lightboxIdx]);

  return (
    <main className="min-h-screen bg-[#0A0A0B] text-white selection:bg-[#DFB15B] selection:text-[#0A0A0B]">
      {/* ═══════ TOP BAR ═══════ */}
      <div className="sticky top-0 z-50 bg-[#0A0A0B]/90 backdrop-blur-xl border-b border-neutral-800/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-3 text-neutral-400 hover:text-white transition-colors group"
          >
            <svg
              className="w-5 h-5 group-hover:-translate-x-1 transition-transform"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19l-7-7 7-7"
              />
            </svg>
            <span className="text-sm font-medium tracking-wide">
              Back to Home
            </span>
          </Link>

          <h1 className="font-cinzel text-[#DFB15B] text-lg tracking-[0.15em]">
            AROMA
          </h1>
        </div>
      </div>

      {/* ═══════ HEADER ═══════ */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 pt-12 pb-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-[#C5A059] text-xs font-bold tracking-[0.25em] uppercase mb-4">
            Our Complete Offerings
          </p>
          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl text-white mb-4">
            Physical Menu
          </h2>
          <p className="text-neutral-400 text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
            Browse through our complete menu featuring Royal Mandi specialties,
            authentic Arabian drinks, and exclusive seasonal offerings.
          </p>
          <div className="w-16 h-[2px] bg-gradient-to-r from-transparent via-[#C5A059] to-transparent mx-auto mt-6" />

          <p className="text-neutral-500 text-xs mt-6">
            Tap any page to view full size &bull; {MENU_PAGES.length} pages
          </p>
        </motion.div>
      </section>

      {/* ═══════ MENU PAGES GRID ═══════ */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {MENU_PAGES.map((src, idx) => (
            <motion.div
              key={src}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              onClick={() => openLightbox(idx)}
              className="
                relative group cursor-pointer
                rounded-xl overflow-hidden
                border border-neutral-800/60 hover:border-[#C5A059]/40
                bg-[#111113]
                shadow-lg hover:shadow-[0_0_40px_rgba(197,160,89,0.1)]
                transition-all duration-400
              "
            >
              {/* Page image */}
              <div className="relative aspect-[3/4] w-full">
                <Image
                  src={src}
                  alt={`Aroma Fine Dine Menu - Page ${idx + 1}`}
                  fill
                  className="object-cover object-top group-hover:scale-[1.03] transition-transform duration-500"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[#C5A059]/90 rounded-full p-3">
                    <svg
                      className="w-6 h-6 text-black"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Page label */}
              <div className="px-4 py-3 flex items-center justify-between">
                <span className="text-xs text-neutral-500 font-medium tracking-wider uppercase">
                  Page {idx + 1}
                </span>
                <span className="text-xs text-[#C5A059]/60">
                  Tap to enlarge
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ═══════ LIGHTBOX ═══════ */}
      <AnimatePresence>
        {lightboxIdx !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[999] bg-black/95 backdrop-blur-sm flex items-center justify-center"
            onClick={closeLightbox}
          >
            {/* Close button */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 z-10 text-white/60 hover:text-white bg-neutral-800/60 hover:bg-neutral-700 rounded-full p-2.5 transition-colors"
              aria-label="Close lightbox"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Page indicator */}
            <div className="absolute top-5 left-1/2 -translate-x-1/2 text-neutral-400 text-sm font-medium tracking-wider">
              {lightboxIdx + 1} / {MENU_PAGES.length}
            </div>

            {/* Prev button */}
            <button
              onClick={(e) => { e.stopPropagation(); goPrev(); }}
              className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-10 text-white/50 hover:text-white bg-neutral-800/50 hover:bg-neutral-700/80 rounded-full p-3 transition-colors"
              aria-label="Previous page"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Next button */}
            <button
              onClick={(e) => { e.stopPropagation(); goNext(); }}
              className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-10 text-white/50 hover:text-white bg-neutral-800/50 hover:bg-neutral-700/80 rounded-full p-3 transition-colors"
              aria-label="Next page"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Image */}
            <motion.div
              key={lightboxIdx}
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ duration: 0.25 }}
              className="relative max-w-[90vw] max-h-[85vh] w-auto h-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={MENU_PAGES[lightboxIdx]}
                alt={`Aroma Menu Page ${lightboxIdx + 1}`}
                width={900}
                height={1200}
                className="rounded-lg object-contain max-h-[85vh] w-auto"
                priority
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
