"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export default function Preloader() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div 
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-[#0B0B0C] pointer-events-none transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
    >
      <div className="relative w-32 h-32 rounded-full overflow-hidden shadow-[0_0_80px_20px_rgba(223,177,91,0.5)] border-2 border-[#DFB15B]">
        <Image 
          src="/brand/logo.jpg" 
          alt="Majesty Mandi House Logo" 
          fill 
          className="object-cover"
          priority
        />
      </div>
    </div>
  );
}
