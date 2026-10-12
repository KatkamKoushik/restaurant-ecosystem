"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { MenuItem } from "@/lib/data";
import { useCartStore } from "@/lib/store";

interface SizeSelectorModalProps {
  item: MenuItem | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function SizeSelectorModal({ item, isOpen, onClose }: SizeSelectorModalProps) {
  const addItem = useCartStore((state) => state.addItem);
  const setIsOpenCart = useCartStore((state) => state.setIsOpen);

  if (!item) return null;

  const handleAdd = (size: string, price: number) => {
    addItem({
      id: `${item.id}-${size}`,
      dishId: item.id,
      name: item.name,
      size,
      price,
      quantity: 1,
    });
    onClose();
    setIsOpenCart(true); // Open sidebar to confirm addition
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            onClick={onClose}
            className="fixed inset-0 bg-black/60 z-[110] backdrop-blur-sm"
          />
          <div className="fixed inset-0 flex items-center justify-center z-[111] px-4 pointer-events-none">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }} 
              animate={{ scale: 1, opacity: 1, y: 0 }} 
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-charcoal border border-bronze/50 rounded-2xl w-full max-w-md overflow-hidden pointer-events-auto"
            >
              <div className="flex justify-between items-center p-6 border-b border-bronze/30">
                <h3 className="font-cinzel text-xl text-gold-royal">Select Portion</h3>
                <button onClick={onClose} className="text-charcoal-light hover:text-white transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6">
                <div className="mb-6">
                  <h4 className="text-white font-bold text-lg">{item.name}</h4>
                  <p className="text-sm text-charcoal-light/80 mt-1">{item.description}</p>
                </div>

                <div className="space-y-3">
                  {item.prices.single && (
                    <button onClick={() => handleAdd("Single", item.prices.single!)} className="w-full flex items-center justify-between p-4 rounded-xl border border-bronze/30 hover:border-gold-royal bg-obsidian transition-colors group">
                      <span className="text-charcoal-light group-hover:text-gold-light uppercase tracking-widest text-sm">Single</span>
                      <span className="text-white font-cinzel font-bold text-lg">₹{item.prices.single}</span>
                    </button>
                  )}
                  {item.prices.half && (
                    <button onClick={() => handleAdd("Half", item.prices.half!)} className="w-full flex items-center justify-between p-4 rounded-xl border border-bronze/30 hover:border-gold-royal bg-obsidian transition-colors group">
                      <span className="text-charcoal-light group-hover:text-gold-light uppercase tracking-widest text-sm">Half</span>
                      <span className="text-white font-cinzel font-bold text-lg">₹{item.prices.half}</span>
                    </button>
                  )}
                  {item.prices.tri && (
                    <button onClick={() => handleAdd("Tri", item.prices.tri!)} className="w-full flex items-center justify-between p-4 rounded-xl border border-bronze/30 hover:border-gold-royal bg-obsidian transition-colors group">
                      <span className="text-charcoal-light group-hover:text-gold-light uppercase tracking-widest text-sm">Tri</span>
                      <span className="text-white font-cinzel font-bold text-lg">₹{item.prices.tri}</span>
                    </button>
                  )}
                  {item.prices.family && (
                    <button onClick={() => handleAdd("Family", item.prices.family!)} className="w-full flex items-center justify-between p-4 rounded-xl border border-bronze/30 hover:border-gold-royal bg-obsidian transition-colors group">
                      <span className="text-charcoal-light group-hover:text-gold-light uppercase tracking-widest text-sm">Family</span>
                      <span className="text-white font-cinzel font-bold text-lg">₹{item.prices.family}</span>
                    </button>
                  )}
                  
                  {/* Fallback for fixed items if they somehow open this modal */}
                  {item.prices.fixed && (
                    <button onClick={() => handleAdd("Fixed", item.prices.fixed!)} className="w-full flex items-center justify-between p-4 rounded-xl border border-bronze/30 hover:border-gold-royal bg-obsidian transition-colors group">
                      <span className="text-charcoal-light group-hover:text-gold-light uppercase tracking-widest text-sm">Regular</span>
                      <span className="text-white font-cinzel font-bold text-lg">₹{item.prices.fixed}</span>
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
