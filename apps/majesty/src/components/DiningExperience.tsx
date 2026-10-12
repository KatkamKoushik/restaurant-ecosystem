"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

export default function DiningExperience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);
  
  return (
    <section ref={containerRef} className="relative min-h-[600px] py-32 w-full overflow-hidden flex items-center justify-center">
      <motion.div 
        style={{ y: y1 }}
        className="absolute inset-0 w-full h-[140%] -top-[20%]"
      >
        <div className="relative w-full h-full">
          <Image 
            src="/ambiance/dinning place 1.jpg" 
            alt="Dining Experience" 
            fill 
            className="object-cover"
          />
        </div>
      </motion.div>
      
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-obsidian/70 backdrop-blur-[2px]" />

      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="font-serif text-5xl md:text-7xl text-white mb-6 leading-tight"
        >
          A Feast for the <br /> <span className="text-imperial italic">Senses</span>
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-white/80 text-xl font-light"
        >
          Immerse yourself in a dining environment crafted for royalty. Every corner tells a story of tradition, luxury, and culinary excellence.
        </motion.p>
      </div>
    </section>
  );
}
