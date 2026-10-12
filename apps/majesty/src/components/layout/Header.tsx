'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

interface HeaderProps {
  cartCount: number;
  onOpenCart: () => void;
}

export function Header({ cartCount, onOpenCart }: HeaderProps) {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  const navLinks = [
    ['Home', '#home'],
    ['Our Menu', '#menu'],
    ['Royal Ambiance', '#ambiance'],
    ['Contact', '#contact']
  ];

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMobileNavOpen(false);
    
    if (href === '#home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const element = document.querySelector(href);
      if (element) {
        const headerOffset = 90; // Adjust for sticky header
        const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = elementPosition - headerOffset;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }
  };

  return (
    <>
      <AnimatePresence>
        {isMobileNavOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 bg-[#0B0B0C]/98 backdrop-blur-md z-[200] flex flex-col items-center justify-center gap-8 lg:hidden"
          >
            <button
              onClick={() => setIsMobileNavOpen(false)}
              className="absolute top-4 right-4 text-[#DFB15B] text-3xl font-bold p-4"
              aria-label="Close menu"
            >✕</button>
            {navLinks.map(([label, href]) => (
              <a
                key={label}
                href={href}
                onClick={(e) => handleScrollTo(e, href)}
                className="text-xl font-serif text-white hover:text-[#DFB15B] transition-all duration-300 tracking-[0.2em] uppercase px-8 py-4 border border-[#DFB15B]/10 hover:border-[#DFB15B] bg-neutral-900/40 min-w-[260px] text-center relative group"
              >
                {/* Dynamic Corner Lines on Mobile */}
                <span className="absolute top-0 left-0 w-3 h-[1px] bg-[#DFB15B]/40 group-hover:w-full transition-all duration-300" />
                <span className="absolute bottom-0 right-0 w-3 h-[1px] bg-[#DFB15B]/40 group-hover:w-full transition-all duration-300" />
                <span className="absolute top-0 left-0 w-[1px] h-3 bg-[#DFB15B]/40 group-hover:h-full transition-all duration-300" />
                <span className="absolute bottom-0 right-0 w-[1px] h-3 bg-[#DFB15B]/40 group-hover:h-full transition-all duration-300" />
                
                {label}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <header className="w-full px-3 sm:px-4 md:px-8 py-3 flex justify-between items-center gap-2 border-b border-neutral-800 bg-[#0B0B0C]/90 backdrop-blur-md sticky top-0 z-40">
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          <div className="relative h-9 w-9 sm:h-11 sm:w-11 rounded-full border-2 border-[#DFB15B] shrink-0 overflow-hidden">
            <Image src="/brand/logo.jpg" alt="Logo" fill className="object-contain" sizes="44px" />
          </div>
          <h1 className="text-base sm:text-lg md:text-2xl font-serif font-bold text-[#DFB15B] tracking-widest uppercase truncate">Majesty</h1>
        </div>

        <nav className="hidden lg:flex items-center gap-5 text-sm font-medium text-neutral-300">
          {navLinks.map(([label, href]) => (
            <a 
              key={label} 
              href={href} 
              onClick={(e) => handleScrollTo(e, href)}
              className="relative px-5 py-2.5 font-serif tracking-[0.2em] uppercase text-[10px] text-neutral-300 border border-[#DFB15B]/10 hover:border-[#DFB15B] transition-all duration-500 overflow-hidden group bg-transparent rounded-sm flex items-center justify-center min-w-[125px]"
            >
              {/* Dynamic corner borders on hover */}
              <span className="absolute top-0 left-0 w-2 h-[1px] bg-[#DFB15B]/30 group-hover:w-full transition-all duration-300" />
              <span className="absolute bottom-0 right-0 w-2 h-[1px] bg-[#DFB15B]/30 group-hover:w-full transition-all duration-300" />
              <span className="absolute top-0 left-0 w-[1px] h-2 bg-[#DFB15B]/30 group-hover:h-full transition-all duration-300" />
              <span className="absolute bottom-0 right-0 w-[1px] h-2 bg-[#DFB15B]/30 group-hover:h-full transition-all duration-300" />
              
              {/* Subtle background glow */}
              <span className="absolute inset-0 bg-gradient-to-tr from-[#DFB15B]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Text */}
              <span className="relative z-10 transition-colors duration-500 group-hover:text-[#DFB15B] flex items-center gap-1 font-bold">
                {label}
              </span>
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <button
            onClick={onOpenCart}
            className="bg-neutral-800 px-3 sm:px-5 py-2 rounded-lg text-[#DFB15B] font-bold text-sm border border-neutral-700 hover:border-[#DFB15B] transition-all flex items-center gap-1 sm:gap-2 shadow-[0_0_15px_rgba(223,177,91,0.1)]"
          >
            CART <span className="bg-[#DFB15B] text-black px-2 py-0.5 rounded-full text-xs">{cartCount}</span>
          </button>
          
          <button
            onClick={() => setIsMobileNavOpen(true)}
            className="lg:hidden flex flex-col gap-1.5 p-2 group"
            aria-label="Open menu"
          >
            <span className="block w-6 h-0.5 bg-[#DFB15B] rounded transition-all" />
            <span className="block w-4 h-0.5 bg-[#DFB15B] rounded transition-all group-hover:w-6" />
            <span className="block w-6 h-0.5 bg-[#DFB15B] rounded transition-all" />
          </button>
        </div>
      </header>
    </>
  );
}
