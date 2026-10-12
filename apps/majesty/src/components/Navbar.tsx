"use client";

import { useCartStore } from "@/store/useCartStore";
import { ShoppingBag } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";

export default function Navbar() {
  const { items, openCart } = useCartStore();
  const itemCount = items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 px-6 py-4 transition-all duration-300 bg-obsidian/60 backdrop-blur-md border-b border-white/5"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="relative w-12 h-12 rounded-full overflow-hidden border border-imperial/30 shadow-[0_0_15px_rgba(223,177,91,0.2)]">
            <Image src="/brand/logo.jpg" alt="Majesty Mandi House Logo" fill className="object-cover" />
          </div>
          <span className="font-serif text-xl font-bold tracking-wider text-imperial hidden sm:block">
            MAJESTY
          </span>
        </div>

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium tracking-widest text-white/70">
          <a href="#home" className="hover:text-imperial transition-colors">HOME</a>
          <a href="#ambience" className="hover:text-imperial transition-colors">AMBIENCE</a>
          <a href="#menu" className="hover:text-imperial transition-colors">MENU</a>
        </nav>

        <button 
          onClick={openCart}
          className="relative flex items-center justify-center w-12 h-12 rounded-full bg-white/5 hover:bg-imperial/20 border border-white/10 hover:border-imperial/50 transition-all group"
        >
          <ShoppingBag className="w-5 h-5 text-white group-hover:text-imperial transition-colors" />
          {itemCount > 0 && (
            <span className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center bg-amber text-obsidian text-xs font-bold rounded-full">
              {itemCount}
            </span>
          )}
        </button>
      </div>
    </motion.header>
  );
}
