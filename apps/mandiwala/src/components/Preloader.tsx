"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { useLenis } from "lenis/react";
import Image from "next/image";

export default function Preloader() {
  const [isLoading, setIsLoading] = useState(true);
  const lenis = useLenis();

  useEffect(() => {
    // Lock scroll
    if (lenis) {
      lenis.stop();
    }

    const timer = setTimeout(() => {
      setIsLoading(false);
      if (lenis) lenis.start();
    }, 2500);

    return () => {
      clearTimeout(timer);
      if (lenis) lenis.start();
    };
  }, [lenis]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-obsidian text-gold-royal will-change-transform"
        >
          {/* Arabic Geometric Pattern Background (Subtle) */}
          <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at center, var(--color-charcoal) 0%, transparent 70%)' }}>
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="arabic" width="60" height="60" patternUnits="userSpaceOnUse">
                  <path d="M30 0 L60 30 L30 60 L0 30 Z" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.3" />
                  <circle cx="30" cy="30" r="15" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.2" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#arabic)" />
            </svg>
          </div>

          <div className="relative flex flex-col items-center justify-center z-10">
            {/* Logo Drawing / Image Reveal */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="relative w-48 h-48 mb-6 animate-pulse-slow"
            >
              <Image 
                src="/brand/logo.jpeg" 
                alt="Mandiwala Logo" 
                fill 
                className="object-contain rounded-full shadow-[0_0_40px_rgba(212,175,55,0.4)]"
                priority
              />
            </motion.div>
            
            {/* Loading Text */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="flex items-center space-x-2"
            >
              <div className="w-16 h-[1px] bg-gold-royal opacity-50" />
              <h2 className="font-cinzel text-xl tracking-[0.3em] uppercase text-gold-royal">
                Mandiwala
              </h2>
              <div className="w-16 h-[1px] bg-gold-royal opacity-50" />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
