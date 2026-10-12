'use client';
import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export function PhysicalMenuCTA() {
  return (
    <section className="w-full py-16 md:py-24 px-4 sm:px-6 md:px-12 bg-[#0A0A0B]">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="max-w-4xl mx-auto relative rounded-3xl overflow-hidden border border-[#DFB15B]/20 bg-[#161618] p-8 sm:p-16 text-center shadow-[0_0_80px_rgba(223,177,91,0.05)]"
      >
        {/* decorative corner accents */}
        <span className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-[#DFB15B]/30 rounded-tl-3xl" />
        <span className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-[#DFB15B]/30 rounded-tr-3xl" />
        <span className="absolute bottom-0 left-0 w-16 h-16 border-b-2 border-l-2 border-[#DFB15B]/30 rounded-bl-3xl" />
        <span className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-[#DFB15B]/30 rounded-br-3xl" />

        <p className="text-[#DFB15B] text-xs sm:text-sm tracking-[0.4em] uppercase font-bold mb-6">Complete Dining Experience</p>
        <h3 className="text-3xl sm:text-4xl md:text-5xl font-serif text-white mb-6 leading-snug">
          Looking for our full menu?
        </h3>
        <p className="text-neutral-400 text-sm sm:text-base md:text-lg mb-10 max-w-xl mx-auto leading-relaxed">
          Our physical menu features the complete selection of our Royal Mandi specialties, authentic Arabian drinks, and exclusive seasonal offerings.
        </p>
        <Link
          href="/physical-menu"
          className="inline-flex items-center gap-3 px-10 py-4 rounded-full border border-[#DFB15B]/50 bg-[#DFB15B]/5 text-[#DFB15B] font-bold text-sm sm:text-base hover:bg-[#DFB15B] hover:text-black transition-all duration-500 shadow-[0_0_20px_rgba(223,177,91,0.1)] hover:shadow-[0_0_40px_rgba(223,177,91,0.3)]"
        >
          <span>View Physical Menu</span>
          <span className="text-xl font-light">↗</span>
        </Link>
      </motion.div>
    </section>
  );
}
