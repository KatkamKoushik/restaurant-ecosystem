'use client';
import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

/* ─────────────────────────────────────────────
   COMPLETE DINING EXPERIENCE
   ───────────────────────────────────────────── */
export function CompleteDiningExperience() {
  return (
    <section
      id="complete-dining"
      className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-10 sm:py-14"
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="relative rounded-2xl border border-[#C5A059]/40 bg-[#111113] overflow-hidden px-8 py-14 text-center"
      >
        {/* Corner accents */}
        <span className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#C5A059]/60 rounded-tl-2xl" />
        <span className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-[#C5A059]/60 rounded-tr-2xl" />
        <span className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-[#C5A059]/60 rounded-bl-2xl" />
        <span className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#C5A059]/60 rounded-br-2xl" />

        {/* Subtle glow */}
        <div className="absolute inset-0 bg-gradient-radial from-[#C5A059]/5 via-transparent to-transparent pointer-events-none" />

        <p className="text-[#C5A059] text-xs font-bold tracking-[0.25em] uppercase mb-5">
          Complete Dining Experience
        </p>

        <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl text-white mb-5 leading-tight">
          Looking for our full menu?
        </h2>

        <p className="text-neutral-400 text-base sm:text-lg max-w-xl mx-auto mb-10 leading-relaxed">
          Our physical menu features the complete selection of our Royal Mandi
          specialties, authentic Arabian drinks, and exclusive seasonal offerings.
        </p>

        <Link href="/menu">
          <motion.span
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="
              inline-flex items-center gap-3 px-8 py-4 rounded-full
              border border-[#C5A059]/60 text-[#C5A059] font-semibold
              text-sm tracking-wide
              hover:bg-[#C5A059]/10 transition-all duration-300
              group cursor-pointer
            "
          >
            View Physical Menu
            <svg
              className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M7 7h10v10" />
            </svg>
          </motion.span>
        </Link>
      </motion.div>
    </section>
  );
}
