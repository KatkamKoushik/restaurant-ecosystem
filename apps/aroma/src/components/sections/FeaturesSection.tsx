'use client';
import React from 'react';
import { Utensils, Bike, CreditCard } from 'lucide-react';
import { motion } from 'framer-motion';

const features = [
  {
    title: "Dining Modes",
    description: "Dine-in, Takeaway, and Doorstep Delivery.",
    icon: Utensils
  },
  {
    title: "Delivery Partners",
    description: "Listed on Swiggy, Zomato, and Fuddo for your convenience.",
    icon: Bike
  },
  {
    title: "Payment Methods",
    description: "We accept Credit Cards, Debit Cards, and NFC Mobile Payments.",
    icon: CreditCard
  }
];

export function FeaturesSection() {
  return (
    <section className="relative w-full py-24 px-4 sm:px-6 md:px-12 lg:px-24 bg-[#0a0a0a] overflow-hidden">
      {/* Subtle background glow to remove the flat-black feel */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-[#DFB15B]/5 blur-[60px] md:blur-[120px] rounded-[100%] pointer-events-none" />
      
      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-[#DFB15B] font-bold tracking-[0.2em] uppercase text-xs sm:text-sm mb-4 block">
            Convenience & Class
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-cinzel text-white tracking-wide">
            Our Services
          </h2>
          <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-[#DFB15B] to-transparent mx-auto mt-6" />
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-10">
          {features.map((feature, idx) => (
            <motion.div 
              key={idx} 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              className="group relative p-8 md:p-10 rounded-2xl bg-gradient-to-b from-[#1a1a1a]/80 to-[#0d0d0d]/90 border border-white/5 hover:border-[#DFB15B]/30 transition-all duration-500 overflow-hidden shadow-2xl"
            >
              {/* Hover glow effect inside card */}
              <div className="absolute inset-0 bg-gradient-to-b from-[#DFB15B]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative z-10 flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-[#DFB15B]/10 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-[#DFB15B]/20 transition-all duration-500 ring-1 ring-white/5 group-hover:ring-[#DFB15B]/30">
                  <feature.icon className="w-7 h-7 text-[#DFB15B]" strokeWidth={1.5} />
                </div>
                <h3 className="text-xl md:text-2xl font-serif text-white mb-4 group-hover:text-[#DFB15B] transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-neutral-400 font-light leading-relaxed text-sm md:text-base">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
