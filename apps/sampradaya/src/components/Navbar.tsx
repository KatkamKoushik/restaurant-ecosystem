"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { Menu, X } from "lucide-react";
import clsx from "clsx";
import { CartDrawer } from "./CartDrawer";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Menu", href: "/menu" },
  { name: "About", href: "/#about" },
  { name: "Contact", href: "/#contact" },
];

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 50) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  });

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.65, 0, 0.35, 1] }}
      className={clsx(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 will-change-transform",
        isScrolled
          ? "bg-background/80 backdrop-blur-md border-b border-gray-200/50 py-3"
          : "bg-transparent py-5"
      )}
    >
      <div className="container mx-auto px-4 md:px-8 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          {/* We can use logo image here as well, but using text for now to ensure rendering */}
          <span className="font-serif text-2xl font-bold text-primary tracking-wide">
            Sampradaya
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-foreground/90 hover:text-primary transition-colors text-sm font-medium tracking-wide uppercase"
            >
              {link.name}
            </Link>
          ))}
          <Link
            href="/#reservation"
            className="px-5 py-2 bg-primary text-ivory rounded-full text-sm font-medium hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20"
            style={{ color: "var(--color-ivory)" }}
          >
            Reserve a Table
          </Link>
          <CartDrawer />
        </div>

        {/* Mobile Actions */}
        <div className="flex md:hidden items-center gap-2">
          <CartDrawer />
          <button
            className="p-2 text-foreground"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="absolute top-full left-0 right-0 bg-background border-b border-gray-200 shadow-xl py-6 px-4 flex flex-col gap-4 md:hidden will-change-transform"
        >
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-lg font-medium text-foreground hover:text-primary transition-colors px-4 py-2"
            >
              {link.name}
            </Link>
          ))}
          <Link
            href="/#reservation"
            onClick={() => setIsMobileMenuOpen(false)}
            className="mx-4 mt-2 px-5 py-3 bg-primary text-center rounded-full text-sm font-medium hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20"
            style={{ color: "var(--color-ivory)" }}
          >
            Reserve a Table
          </Link>
        </motion.div>
      )}
    </motion.nav>
  );
};
