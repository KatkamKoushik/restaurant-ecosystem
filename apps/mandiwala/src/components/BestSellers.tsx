"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ShoppingBag } from "lucide-react";
import { useMenu } from "@/lib/hooks/useMenu";
import { useCartStore } from "@/lib/store";
import { useState } from "react";
import { MenuItem } from "@/lib/data";
import SizeSelectorModal from "./SizeSelectorModal";

export default function BestSellers() {
  const { menu, loading } = useMenu();
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  
  const addItem = useCartStore((state) => state.addItem);
  const setIsOpenCart = useCartStore((state) => state.setIsOpen);

  const bestSellers = menu.filter((item) => item.isBestSeller);

  const handleAddToCartClick = (item: MenuItem) => {
    if (item.prices.fixed) {
      addItem({
        id: `${item.id}-Fixed`,
        dishId: item.id,
        name: item.name,
        size: "Fixed",
        price: item.prices.fixed,
        quantity: 1
      });
      setIsOpenCart(true);
    } else {
      setSelectedItem(item);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-24">
        <p className="text-xl text-gold-royal animate-pulse font-cinzel tracking-widest">Loading Best Sellers...</p>
      </div>
    );
  }

  if (bestSellers.length === 0) {
    return null;
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <AnimatePresence>
          {bestSellers.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group bg-obsidian border border-bronze rounded-xl overflow-hidden hover:border-gold-royal/50 transition-colors will-change-transform flex flex-col"
            >
              <div className="relative h-64 overflow-hidden">
                <Image src={item.image || "/brand/logo.jpeg"} alt={item.name} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw" className="object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian to-transparent opacity-80" />
                <h3 className="absolute bottom-4 left-4 right-4 font-cinzel text-2xl text-gold-light z-10">{item.name}</h3>
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <p className="text-sm text-charcoal-light/70 mb-6 flex-grow">{item.description}</p>
                <div className="flex items-center justify-between mt-auto">
                  <span className="font-bold text-gold-royal tracking-widest">
                    {item.prices.fixed ? `₹${item.prices.fixed}` : `FROM ₹${item.prices.single || item.prices.half}`}
                  </span>
                  <button 
                    onClick={() => handleAddToCartClick(item)}
                    className="flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-gold-light hover:text-white transition-colors"
                  >
                    <span>Order</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      <SizeSelectorModal 
        item={selectedItem} 
        isOpen={selectedItem !== null} 
        onClose={() => setSelectedItem(null)} 
      />
    </>
  );
}
