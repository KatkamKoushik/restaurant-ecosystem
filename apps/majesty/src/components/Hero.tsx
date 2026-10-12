"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section 
      ref={ref} 
      id="home"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#0B0B0C] pt-32 pb-20"
    >
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] bg-imperial/10 blur-[120px] rounded-full pointer-events-none" />

      <motion.div 
        style={{ y, opacity }}
        className="relative z-10 w-full max-w-7xl mx-auto px-6 flex flex-col items-center justify-center text-center"
      >
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="font-serif text-5xl md:text-7xl lg:text-8xl text-white mb-6 drop-shadow-2xl"
        >
          Taste the <span className="text-transparent bg-clip-text bg-gradient-to-r from-imperial to-amber">Royalty</span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-white/60 text-lg md:text-xl max-w-2xl mb-12 font-light tracking-wide"
        >
          The most authentic Arabian Mandi experience awaits you in Hanamkonda.
        </motion.p>

        {/* Anti-gravity image with Parallax tilt on hover */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="relative w-full max-w-3xl aspect-[16/9] perspective-[1000px] mt-8"
        >
          <motion.div
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="w-full h-full relative"
          >
            <motion.div
              whileHover={{ 
                rotateX: 10, 
                rotateY: -10,
                scale: 1.05
              }}
              transition={{ type: "spring", stiffness: 100, damping: 10 }}
              className="w-full h-full relative rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(223,177,91,0.15)] border border-white/5 cursor-pointer"
            >
              <Image 
                src="/dishes/chicken juicy mandi.png" 
                alt="Chicken Juicy Mandi" 
                fill 
                className="object-contain"
                priority
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
