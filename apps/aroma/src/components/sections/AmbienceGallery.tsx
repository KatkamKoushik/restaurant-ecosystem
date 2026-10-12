'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { OptimizedImage } from '../ui/OptimizedImage';

/* ─────────────────────────────────────────────
   ALL AMBIENCE IMAGES – organized by visual weight
   ───────────────────────────────────────────── */
const images = [
  // Row 1 — hero-width + two squares
  { src: '/ambience/dinning.jpg', alt: 'Dining Area', span: 'md:col-span-2 md:row-span-2' },
  { src: '/ambience/outerview.jpg', alt: 'Outer View', span: 'md:col-span-1 md:row-span-1' },
  { src: '/ambience/aroma.jpg', alt: 'Restaurant Ambience', span: 'md:col-span-1 md:row-span-1' },
  // Row 2
  { src: '/ambience/maybe entrance.jpg', alt: 'Entrance', span: 'md:col-span-2 md:row-span-1' },
  { src: '/ambience/lighting.jpg', alt: 'Ambient Lighting', span: 'md:col-span-1 md:row-span-1' },
  { src: '/ambience/green rooms.jpg', alt: 'Green Rooms', span: 'md:col-span-1 md:row-span-1' },
  // Row 3 — banquet views
  { src: '/ambience/banquent hall (bh) view.jpg', alt: 'Banquet Hall', span: 'md:col-span-1 md:row-span-1' },
  { src: '/ambience/bh view 1 with lighting.jpg', alt: 'Banquet Hall Lighting', span: 'md:col-span-1 md:row-span-1' },
  { src: '/ambience/bh view 2.jpg', alt: 'Banquet Hall View 2', span: 'md:col-span-2 md:row-span-1' },
  // Row 4
  { src: '/ambience/bh view 3.jpg', alt: 'Banquet Hall View 3', span: 'md:col-span-1 md:row-span-1' },
  { src: '/ambience/bh view 4.jpg', alt: 'Banquet Hall View 4', span: 'md:col-span-1 md:row-span-1' },
  { src: '/ambience/view1.webp', alt: 'Restaurant Interior 1', span: 'md:col-span-1 md:row-span-1' },
  { src: '/ambience/view2.webp', alt: 'Restaurant Interior 2', span: 'md:col-span-1 md:row-span-1' },
  // Row 5
  { src: '/ambience/view3.webp', alt: 'Restaurant Interior 3', span: 'md:col-span-2 md:row-span-1' },
  { src: '/ambience/aroma 2.png', alt: 'Aroma Restaurant', span: 'md:col-span-1 md:row-span-1' },
  { src: '/ambience/view 4.png', alt: 'Restaurant View', span: 'md:col-span-1 md:row-span-1' },
];

export function AmbienceGallery() {
  return (
    <section id="ambience" className="relative w-full py-24 px-4 sm:px-6 md:px-12 bg-transparent overflow-hidden">
      
      {/* ── Golden Particles Background (Fills any gaps with an attractive theme) ── */}
      <div className="absolute inset-0 z-0 opacity-40 pointer-events-none animate-particle-drift">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="golden-particles" x="0" y="0" width="120" height="120" patternUnits="userSpaceOnUse">
              <circle cx="15" cy="25" r="1.5" fill="#DFB15B" opacity="0.9" />
              <circle cx="85" cy="45" r="1" fill="#C5A059" opacity="0.5" />
              <circle cx="45" cy="95" r="2.5" fill="#DFB15B" opacity="0.3" />
              <circle cx="105" cy="15" r="1.5" fill="#E8DCC8" opacity="0.8" />
              <circle cx="25" cy="75" r="1" fill="#DFB15B" opacity="0.6" />
              <circle cx="95" cy="105" r="2" fill="#C5A059" opacity="0.7" />
              <circle cx="65" cy="55" r="1.5" fill="#DFB15B" opacity="0.4" />
            </pattern>
          </defs>
          <rect x="0" y="0" width="100%" height="100%" fill="url(#golden-particles)" />
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-[#DFB15B] font-bold tracking-[0.2em] uppercase text-xs sm:text-sm mb-3 block">
            The Atmosphere
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-white">
            Breathtaking Ambience
          </h2>
          <p className="mt-4 text-neutral-400 max-w-2xl mx-auto font-sans">
            Immerse yourself in our beautifully crafted dining space, featuring
            elegant lighting, comfortable seating, and a warm, inviting
            atmosphere perfect for any occasion.
          </p>
        </motion.div>

        {/* ── Masonry Layout (No forced shapes, retains natural aspect ratio) ── */}
        <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 sm:gap-6 space-y-4 sm:space-y-6">
          {images.map((img, idx) => (
            <motion.div
              key={img.src}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.05 }}
              transition={{ duration: 0.6, delay: Math.min((idx % 4) * 0.1, 0.4) }}
              className="relative overflow-hidden rounded-xl group break-inside-avoid bg-black/20"
            >
              {/* Using standard img tag behavior via OptimizedImage for natural heights */}
              <OptimizedImage
                src={img.src}
                alt={img.alt}
                className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              />
              {/* Hover overlay with label */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                <span className="text-[#DFB15B] text-sm font-medium px-5 pb-5 tracking-wide">
                  {img.alt}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes particleDrift {
          0% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-15px) scale(1.05); }
          100% { transform: translateY(0) scale(1); }
        }
        .animate-particle-drift {
          animation: particleDrift 15s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}
