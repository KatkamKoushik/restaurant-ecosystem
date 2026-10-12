"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MenuItem } from "@/lib/data";
import { useMenu } from "@/lib/hooks/useMenu";
import Footer from "@/components/Footer";
import Image from "next/image";
import { Search, ShoppingBag } from "lucide-react";
import SizeSelectorModal from "@/components/SizeSelectorModal";
import { useCartStore } from "@/lib/store";

const CATEGORIES = ["All", "Chicken", "Mutton", "Egg", "Paneer", "Add-on", "Dessert"];

export default function MenuPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [vegOnly, setVegOnly] = useState(false);
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);

  const { menu, loading } = useMenu();
  const addItem = useCartStore((state) => state.addItem);
  const setIsOpenCart = useCartStore((state) => state.setIsOpen);

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

  const filteredMenu = menu.filter((item) => {
    const matchesCategory = activeCategory === "All" || item.category === activeCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          (item.description && item.description.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesVeg = vegOnly ? (item.category === "Paneer" || item.category === "Dessert") : true;
    
    return matchesCategory && matchesSearch && matchesVeg;
  });

  return (
    <>
      <main className="min-h-screen bg-obsidian pt-24">
        {/* Header & Filters */}
        <div className="bg-obsidian border-b border-bronze pb-4 pt-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
            
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <h1 className="font-cinzel text-3xl md:text-4xl text-gold-royal tracking-widest uppercase">
                Our Menu
              </h1>
              
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-charcoal-light/50" />
                  <input 
                    type="text" 
                    placeholder="Search dishes..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 pr-4 py-2 bg-charcoal border border-bronze rounded-full text-sm text-charcoal-light focus:outline-none focus:border-gold-royal transition-colors"
                  />
                </div>
                <label className="flex items-center space-x-2 cursor-pointer">
                  <div className="relative">
                    <input 
                      type="checkbox" 
                      className="sr-only" 
                      checked={vegOnly} 
                      onChange={(e) => setVegOnly(e.target.checked)} 
                    />
                    <div className={`block w-10 h-6 rounded-full transition-colors ${vegOnly ? 'bg-green-600' : 'bg-charcoal border border-bronze'}`}></div>
                    <div className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${vegOnly ? 'transform translate-x-4' : ''}`}></div>
                  </div>
                  <span className="text-sm font-cinzel text-gold-light uppercase">Veg Only</span>
                </label>
              </div>
            </div>

            {/* Categories Scrollable Bar */}
            <div className="flex overflow-x-auto hide-scrollbar space-x-2 md:space-x-4 pb-2">
              {CATEGORIES.map(category => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`whitespace-nowrap px-6 py-2 rounded-full font-cinzel text-sm tracking-wider uppercase transition-colors border ${
                    activeCategory === category 
                      ? "bg-gold-royal text-obsidian border-gold-royal" 
                      : "bg-transparent text-charcoal-light border-bronze hover:border-gold-royal/50"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

          </div>
        </div>

        {/* Menu Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {loading ? (
            <div className="text-center py-24">
              <p className="text-xl text-gold-royal animate-pulse font-cinzel tracking-widest">Loading Menu...</p>
            </div>
          ) : (
            <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <AnimatePresence>
                {filteredMenu.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                    className="bg-charcoal border border-bronze rounded-xl overflow-hidden hover:border-gold-royal/50 transition-colors flex flex-col"
                  >
                    <div className="relative h-56 w-full">
                      <Image src={item.image || "/brand/logo.jpeg"} alt={item.name} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className="object-cover" />
                      {item.isBestSeller && (
                        <div className="absolute top-4 right-4 bg-gold-royal text-obsidian text-xs font-bold px-3 py-1 uppercase tracking-wider rounded-sm">
                          Best Seller
                        </div>
                      )}
                    </div>
                    <div className="p-6 flex flex-col flex-grow">
                      <h3 className="font-cinzel text-xl text-gold-light mb-2">{item.name}</h3>
                      <p className="text-sm text-charcoal-light/70 mb-6 flex-grow">{item.description}</p>
                      
                      {/* Pricing Tiers */}
                      {item.prices?.fixed ? (
                        <div className="flex justify-between items-center border-t border-bronze/50 pt-4">
                          <span className="text-xs uppercase tracking-widest text-charcoal-light/50">Price</span>
                          <span className="text-lg font-cinzel text-gold-royal">₹{item.prices.fixed}</span>
                        </div>
                      ) : (
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-y-4 sm:gap-y-0 gap-x-2 border-t border-bronze/50 pt-4">
                          {item.prices?.single && (
                            <div className="text-center">
                              <div className="text-[10px] uppercase tracking-wider text-charcoal-light/50">Single</div>
                              <div className="text-sm font-cinzel text-gold-light mt-1">₹{item.prices.single}</div>
                            </div>
                          )}
                          {item.prices?.half && (
                            <div className="text-center border-l border-bronze/50">
                              <div className="text-[10px] uppercase tracking-wider text-charcoal-light/50">Half</div>
                              <div className="text-sm font-cinzel text-gold-light mt-1">₹{item.prices.half}</div>
                            </div>
                          )}
                          {item.prices?.tri && (
                            <div className="text-center sm:border-l border-bronze/50">
                              <div className="text-[10px] uppercase tracking-wider text-charcoal-light/50">Tri</div>
                              <div className="text-sm font-cinzel text-gold-light mt-1">₹{item.prices.tri}</div>
                            </div>
                          )}
                          {item.prices?.family && (
                            <div className="text-center border-l border-bronze/50">
                              <div className="text-[10px] uppercase tracking-wider text-charcoal-light/50">Family</div>
                              <div className="text-sm font-cinzel text-gold-royal mt-1">₹{item.prices.family}</div>
                            </div>
                          )}
                        </div>
                      )}
                      
                      {/* Add to Cart Button */}
                      <div className="mt-6 pt-4 border-t border-bronze/50 flex justify-center">
                        <button 
                          onClick={() => handleAddToCartClick(item)}
                          className="flex items-center space-x-2 w-full justify-center px-4 py-2 bg-gold-royal/10 hover:bg-gold-royal/20 border border-gold-royal/50 rounded-full text-gold-light transition-colors"
                        >
                          <ShoppingBag className="w-4 h-4" />
                          <span className="font-bold text-sm tracking-wider uppercase">Add to Order</span>
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}

          {!loading && filteredMenu.length === 0 && (
            <div className="text-center py-24">
              <p className="text-xl text-charcoal-light/50 font-cinzel">No dishes found matching your criteria.</p>
            </div>
          )}
        </div>
      </main>
      <Footer />
      <SizeSelectorModal 
        item={selectedItem} 
        isOpen={selectedItem !== null} 
        onClose={() => setSelectedItem(null)} 
      />
    </>
  );
}
