"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Menu, X, ShoppingBag } from "lucide-react";
import { useCartStore } from "@/lib/store";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { items, setIsOpen } = useCartStore();
  const pathname = usePathname();
  
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (pathname?.startsWith("/admin")) return null;

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Menu", href: "/menu" },
    { name: "Digital Menu", href: "/physical-menu" },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 2.5 }}
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 will-change-transform ${
          isScrolled ? "bg-obsidian/90 backdrop-blur-md shadow-lg shadow-black/50 py-2" : "bg-transparent py-4"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3">
              <div className="relative w-12 h-12">
                <Image src="/brand/logo.jpeg" alt="Mandiwala" fill className="object-cover rounded-full" />
              </div>
              <span className="font-cinzel font-bold text-xl text-gold-royal uppercase tracking-widest hidden sm:block">
                Mandiwala
              </span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-sm uppercase tracking-wider text-charcoal-light hover:text-gold-light transition-colors"
                >
                  {link.name}
                </Link>
              ))}
              <a
                href="#reservations"
                className="px-6 py-2 border border-gold-royal text-gold-royal hover:bg-gold-royal hover:text-obsidian transition-colors font-cinzel tracking-wider uppercase text-sm"
              >
                Book Majlis
              </a>
              <button 
                onClick={() => setIsOpen(true)}
                className="relative text-gold-royal hover:text-gold-light transition-colors"
              >
                <ShoppingBag className="w-6 h-6" />
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-600 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full">
                    {totalItems}
                  </span>
                )}
              </button>
            </div>

            {/* Mobile Nav Toggle */}
            <div className="md:hidden">
              <button 
                onClick={() => setIsOpen(true)}
                className="relative text-gold-royal p-2 focus:outline-none"
              >
                <ShoppingBag className="w-6 h-6" />
                {totalItems > 0 && (
                  <span className="absolute top-0 right-0 bg-red-600 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full">
                    {totalItems}
                  </span>
                )}
              </button>
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-gold-royal p-2 focus:outline-none"
              >
                {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <motion.div
        initial={false}
        animate={{
          opacity: isMobileMenuOpen ? 1 : 0,
          pointerEvents: isMobileMenuOpen ? "auto" : "none",
        }}
        className="fixed inset-0 z-30 bg-obsidian/95 backdrop-blur-lg flex flex-col items-center justify-center space-y-8 will-change-transform"
      >
        {navLinks.map((link) => (
          <Link
            key={link.name}
            href={link.href}
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-2xl font-cinzel uppercase tracking-widest text-gold-royal hover:text-gold-light transition-colors"
          >
            {link.name}
          </Link>
        ))}
        <a
          href="#reservations"
          onClick={() => setIsMobileMenuOpen(false)}
          className="mt-4 px-8 py-3 border border-gold-royal text-gold-royal hover:bg-gold-royal hover:text-obsidian transition-colors font-cinzel tracking-wider uppercase text-xl"
        >
          Book Majlis
        </a>
      </motion.div>
    </>
  );
}
