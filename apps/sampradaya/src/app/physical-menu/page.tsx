"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Footer } from "@/components/Footer";

export default function PhysicalMenuPage() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const menuPages = [
    "/menu/1.webp",
    "/menu/2.webp",
    "/menu/3.webp",
    "/menu/4.webp"
  ];

  return (
    <div className="min-h-screen bg-[#FDFBF7] pt-24 pb-20">
      <div className="container mx-auto px-4 md:px-8 max-w-4xl">
        
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-12">
          <Link href="/" className="self-start text-primary hover:text-primary/80 transition-colors flex items-center gap-2 mb-6 font-medium">
            <ArrowLeft size={20} /> Back to Home
          </Link>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">Dine-in Menu</h1>
          <p className="text-foreground/70 text-lg font-light max-w-xl">
            Browse through our physical menu cards. Tap any page to zoom in for better readability.
          </p>
        </div>

        {/* Vertical Gallery */}
        <div className="flex flex-col gap-12 items-center">
          {menuPages.map((src, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true, margin: "-100px" }}
              className="relative w-full aspect-[1/1.4] md:w-3/4 bg-white rounded-xl shadow-xl overflow-hidden cursor-pointer group"
              onClick={() => setSelectedImage(src)}
            >
              <Image
                src={src}
                alt={`Menu Page ${index + 1}`}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 bg-white/90 p-4 rounded-full text-foreground shadow-lg transform scale-90 group-hover:scale-100 transition-all duration-300">
                  <ZoomIn size={32} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox / Zoom Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-black/95 flex items-center justify-center p-4 backdrop-blur-md"
            onClick={() => setSelectedImage(null)}
          >
            <button 
              className="absolute top-6 right-6 p-3 bg-white/10 text-white rounded-full hover:bg-white/20 transition-colors z-10"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImage(null);
              }}
            >
              <X size={24} />
            </button>
            
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-3xl h-[85vh] rounded-xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()} // Prevent closing when clicking the image
            >
              <Image
                src={selectedImage}
                alt="Zoomed Menu Page"
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 80vw"
                priority
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="mt-20">
        <Footer />
      </div>
    </div>
  );
}
