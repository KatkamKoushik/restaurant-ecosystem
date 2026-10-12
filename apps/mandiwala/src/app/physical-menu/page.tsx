"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

const MENU_PAGES = [
  "Screenshot 2026-08-10 173652.png",
  "Screenshot 2026-08-10 173725.png",
  "Screenshot 2026-08-10 173735.png",
  "Screenshot 2026-08-10 173745.png",
  "Screenshot 2026-08-10 173754.png",
  "Screenshot 2026-08-10 173803.png",
  "Screenshot 2026-08-10 173814.png",
  "Screenshot 2026-08-10 173823.png",
  "menu.webp"
];

export default function PhysicalMenuPage() {
  return (
    <div className="min-h-screen bg-obsidian text-charcoal-light font-plus-jakarta pb-24">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-obsidian/90 backdrop-blur-md border-b border-bronze shadow-lg">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="inline-flex items-center space-x-2 text-gold-royal hover:text-gold-light transition-colors font-cinzel tracking-wider uppercase text-sm">
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>
          <h1 className="font-cinzel text-xl text-gold-royal tracking-widest uppercase">Physical Menu</h1>
          <div className="w-24"></div> {/* Spacer for centering */}
        </div>
      </div>

      {/* Menu Images */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 space-y-8">
        {MENU_PAGES.map((filename, index) => (
          <div key={index} className="relative w-full shadow-[0_10px_30px_rgba(0,0,0,0.5)] rounded-xl overflow-hidden border border-bronze">
            <Image 
              src={`/menu/${filename}`}
              alt={`Menu Page ${index + 1}`}
              width={1200}
              height={1600}
              className="w-full h-auto object-contain"
              priority={index < 2}
            />
          </div>
        ))}
        
        <div className="text-center pt-12">
          <Link href="/menu" className="inline-block px-8 py-4 bg-gold-royal text-obsidian font-cinzel font-bold tracking-widest uppercase rounded hover:bg-gold-light transition-colors shadow-[0_0_20px_rgba(212,175,55,0.2)]">
            Order Online
          </Link>
        </div>
      </div>
    </div>
  );
}
