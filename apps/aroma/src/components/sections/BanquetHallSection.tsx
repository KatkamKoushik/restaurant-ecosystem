'use client';
import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { db } from '@/lib/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { Snowflake, Crown, Music, Accessibility, CheckCircle2 } from 'lucide-react';

// The 5 specific items to feature in the banquet section
const FEATURED_NAMES = [
  'Green Pistachio Milkshake On Table',
  'Dry Fruit Milkshake On Table',
  'Plain Kulcha On Wooden Plate',
  'Mojito Mint Drink In Glass',
  'Strawberry Mojito Mocktail In Glass',
];

interface FeaturedImage {
  name: string;
  imageUrl: string;
}

export function BanquetHallSection() {
  const [featuredImages, setFeaturedImages] = useState<FeaturedImage[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'menuItems'));
        const matched: FeaturedImage[] = [];

        querySnapshot.forEach((doc) => {
          const data = doc.data();
          const name: string = data.name || '';
          const imageUrl: string = data.image_url || '';
          const isMatch = FEATURED_NAMES.some(
            (n) => n.toLowerCase().trim() === name.toLowerCase().trim()
          );
          if (isMatch && imageUrl) {
            matched.push({ name, imageUrl });
          }
        });

        // Sort by the order in FEATURED_NAMES
        matched.sort(
          (a, b) =>
            FEATURED_NAMES.findIndex(
              (n) => n.toLowerCase().trim() === a.name.toLowerCase().trim()
            ) -
            FEATURED_NAMES.findIndex(
              (n) => n.toLowerCase().trim() === b.name.toLowerCase().trim()
            )
        );

        setFeaturedImages(matched);
      } catch (err) {
        console.error('Failed to fetch featured images:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchFeatured();
  }, []);

  const goNext = useCallback(() => {
    setActiveIndex((i) => (i + 1) % Math.max(featuredImages.length, 1));
  }, [featuredImages.length]);

  const goPrev = useCallback(() => {
    setActiveIndex((i) =>
      (i - 1 + Math.max(featuredImages.length, 1)) % Math.max(featuredImages.length, 1)
    );
  }, [featuredImages.length]);

  // Auto-advance carousel
  useEffect(() => {
    if (featuredImages.length < 2) return;
    const timer = setInterval(goNext, 3500);
    return () => clearInterval(timer);
  }, [featuredImages.length, goNext]);

  return (
    <section id="banquet-section" className="w-full py-20 md:py-32 px-4 sm:px-6 md:px-12 lg:px-24 bg-transparent">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-12 items-center">

          {/* ── Featured Food Images (Centered Carousel) ── */}
          <div className="w-full lg:w-1/2 flex flex-col items-center gap-6">

            {/* Main Carousel Image */}
            <div className="relative w-full max-w-md aspect-[4/3] rounded-2xl overflow-hidden border border-[#DFB15B]/40 shadow-[0_0_40px_rgba(223,177,91,0.15)] mx-auto">
              {loading ? (
                <div className="w-full h-full bg-[#111112] flex items-center justify-center">
                  <div className="w-8 h-8 border-2 border-[#DFB15B]/40 border-t-[#DFB15B] rounded-full animate-spin" />
                </div>
              ) : featuredImages.length > 0 ? (
                <>
                  {featuredImages.map((img, idx) => (
                    <div
                      key={img.name}
                      className={`absolute inset-0 transition-opacity duration-700 ${
                        idx === activeIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
                      }`}
                    >
                      <Image
                        src={img.imageUrl}
                        alt={img.name}
                        fill
                        sizes="(max-width: 768px) 100vw, 448px"
                        className="object-cover object-center"
                        priority={idx === 0}
                      />
                      {/* Caption */}
                      <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent px-4 py-3 z-20">
                        <p className="text-white text-xs sm:text-sm font-semibold text-center tracking-wide truncate">
                          {img.name}
                        </p>
                      </div>
                    </div>
                  ))}

                  {/* Prev / Next */}
                  {featuredImages.length > 1 && (
                    <>
                      <button
                        onClick={goPrev}
                        aria-label="Previous image"
                        className="absolute left-2 top-1/2 -translate-y-1/2 z-30 w-9 h-9 rounded-full bg-black/50 border border-[#DFB15B]/40 text-white hover:bg-[#DFB15B]/20 hover:border-[#DFB15B] transition-all flex items-center justify-center"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                      </button>
                      <button
                        onClick={goNext}
                        aria-label="Next image"
                        className="absolute right-2 top-1/2 -translate-y-1/2 z-30 w-9 h-9 rounded-full bg-black/50 border border-[#DFB15B]/40 text-white hover:bg-[#DFB15B]/20 hover:border-[#DFB15B] transition-all flex items-center justify-center"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    </>
                  )}
                </>
              ) : (
                /* Fallback: banquet hall image */
                <Image
                  src="/ambience/banquent hall (bh) view.jpg"
                  alt="Banquet Hall View"
                  fill
                  sizes="(max-width: 768px) 100vw, 448px"
                  className="object-cover object-center"
                />
              )}
            </div>

            {/* Dot indicators */}
            {featuredImages.length > 1 && (
              <div className="flex items-center justify-center gap-2">
                {featuredImages.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveIndex(idx)}
                    aria-label={`Go to image ${idx + 1}`}
                    className={`rounded-full transition-all duration-300 ${
                      idx === activeIndex
                        ? 'bg-[#DFB15B] w-5 h-2'
                        : 'bg-neutral-600 w-2 h-2 hover:bg-neutral-400'
                    }`}
                  />
                ))}
              </div>
            )}

            {/* Thumbnail strip */}
            {featuredImages.length > 1 && (
              <div className="flex gap-3 justify-center flex-wrap">
                {featuredImages.map((img, idx) => (
                  <button
                    key={img.name}
                    onClick={() => setActiveIndex(idx)}
                    aria-label={`View ${img.name}`}
                    className={`relative w-14 h-14 rounded-lg overflow-hidden border-2 transition-all duration-300 flex-shrink-0 ${
                      idx === activeIndex
                        ? 'border-[#DFB15B] scale-110 shadow-[0_0_12px_rgba(223,177,91,0.4)]'
                        : 'border-neutral-700 opacity-60 hover:opacity-100 hover:border-neutral-400'
                    }`}
                  >
                    <Image
                      src={img.imageUrl}
                      alt={img.name}
                      fill
                      sizes="56px"
                      className="object-cover object-center"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ── Text Content ── */}
          <div className="w-full lg:w-1/2 flex flex-col justify-center">
            <span className="text-[#DFB15B] font-bold tracking-[0.2em] uppercase text-xs sm:text-sm mb-4 block">
              Celebrations
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-cinzel text-white mb-6" style={{ textShadow: '0 0 20px rgba(223, 177, 91, 0.2)' }}>
              Banquet Hall
            </h2>
            <div className="w-16 h-[1px] bg-gradient-to-r from-[#DFB15B] to-transparent mb-8" />

            <p className="text-neutral-400 text-base md:text-lg leading-relaxed font-light mb-10">
              Host your memorable events with us. Our fully equipped banquet facility accommodates up to 200 guests,
              making it the perfect venue for weddings, birthday parties, and corporate events.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
              {/* Pricing Card */}
              <div className="group relative p-6 rounded-2xl bg-gradient-to-br from-[#1a1a1a]/80 to-[#0d0d0d]/90 border border-white/5 hover:border-[#DFB15B]/30 transition-all duration-500 overflow-hidden shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-b from-[#DFB15B]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10">
                  <h4 className="text-[#DFB15B] font-serif text-xl mb-4">Pricing Estimate</h4>
                  <ul className="text-neutral-300 space-y-3 text-sm md:text-base">
                    <li className="flex items-center gap-3">
                      <CheckCircle2 className="w-4 h-4 text-[#DFB15B]/70" />
                      <span><strong className="text-white font-medium">Vegetarian:</strong> ~₹550/person</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle2 className="w-4 h-4 text-[#DFB15B]/70" />
                      <span><strong className="text-white font-medium">Non-Veg:</strong> ~₹650/person</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Amenities Card */}
              <div className="group relative p-6 rounded-2xl bg-gradient-to-br from-[#1a1a1a]/80 to-[#0d0d0d]/90 border border-white/5 hover:border-[#DFB15B]/30 transition-all duration-500 overflow-hidden shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-b from-[#DFB15B]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10">
                  <h4 className="text-[#DFB15B] font-serif text-xl mb-4">Amenities</h4>
                  <ul className="text-neutral-300 space-y-3 text-sm">
                    <li className="flex items-center gap-3">
                      <Snowflake className="w-4 h-4 text-[#DFB15B]/70" />
                      <span>Fully Air-Conditioned</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <Crown className="w-4 h-4 text-[#DFB15B]/70" />
                      <span>Private Bridal Suite</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <Music className="w-4 h-4 text-[#DFB15B]/70" />
                      <span>Professional DJ Setup</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <Accessibility className="w-4 h-4 text-[#DFB15B]/70" />
                      <span>Wheelchair Accessible</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <button
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="relative self-start group overflow-hidden rounded-full px-8 py-3 bg-transparent border border-[#DFB15B] text-[#DFB15B] font-bold uppercase tracking-wider text-sm transition-all duration-300 hover:text-black"
            >
              <div className="absolute inset-0 w-0 bg-[#DFB15B] transition-all duration-[400ms] ease-out group-hover:w-full z-0" />
              <span className="relative z-10">Reserve Venue</span>
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}
