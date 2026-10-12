"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Minus, Plus, ShoppingBag } from "lucide-react";
import { usePathname } from "next/navigation";
import { useCartStore } from "@/lib/store";

export default function CartSidebar() {
  const { items, isOpen, setIsOpen, updateQuantity, removeItem, clearCart } = useCartStore();
  const pathname = usePathname();
  const [deliveryType, setDeliveryType] = useState<"Home Delivery" | "Pickup">("Home Delivery");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [houseNo, setHouseNo] = useState("");
  const [street, setStreet] = useState("");
  const [landmark, setLandmark] = useState("");
  const [pincode, setPincode] = useState("");
  const [instructions, setInstructions] = useState("");

  if (pathname?.startsWith("/admin")) return null;

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const gst = Math.round(subtotal * 0.05);
  const grandTotal = subtotal + gst;

  const handleCheckout = () => {
    if (!name || !phone) {
      alert("Please enter your Name and Mobile Number.");
      return;
    }
    if (deliveryType === "Home Delivery") {
      if (!houseNo || !street) {
        alert("Please enter your Flat / House No. and Street / Area.");
        return;
      }
    }

    let text = `*New Order - Mandiwala*\n`;
    text += `---------------------------\n`;
    items.forEach((item) => {
      const sizeText = item.size !== "Fixed" ? ` (${item.size})` : "";
      text += `${item.name}${sizeText} x ${item.quantity} - ₹${item.price * item.quantity}\n`;
    });
    text += `---------------------------\n`;
    text += `Subtotal: ₹${subtotal}\n`;
    text += `GST (5%): ₹${gst}\n`;
    text += `*Grand Total: ₹${grandTotal}*\n`;
    text += `---------------------------\n`;
    text += `Delivery Type: ${deliveryType}\n`;
    text += `Name: ${name}\n`;
    text += `Phone: ${phone}\n`;
    if (deliveryType === "Home Delivery") {
      text += `Address:\n`;
      text += `${houseNo}, ${street}\n`;
      if (landmark) text += `Landmark: ${landmark}\n`;
      if (pincode) text += `Pincode: ${pincode}\n`;
    }
    if (instructions) {
      text += `Special Instructions: ${instructions}\n`;
    }

    const whatsappNumber = "+918500371100";
    const encodedText = encodeURIComponent(text);
    window.open(`https://wa.me/${whatsappNumber}?text=${encodedText}`, "_blank");
    
    // Optional: clearCart() after checkout
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/60 z-[100] backdrop-blur-sm"
          />
          
          {/* Sidebar */}
          <motion.div 
            initial={{ x: "100%" }} 
            animate={{ x: 0 }} 
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-obsidian border-l border-bronze shadow-2xl z-[101] flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-bronze/50">
              <h2 className="font-cinzel text-2xl text-gold-royal flex items-center gap-2">
                <ShoppingBag className="w-6 h-6" /> Your Order
              </h2>
              <button onClick={() => setIsOpen(false)} className="text-charcoal-light hover:text-white transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Content */}
            <div data-lenis-prevent="true" className="flex-1 overflow-y-auto p-6 space-y-8 hide-scrollbar">
              
              {/* Delivery Toggle */}
              <div className="flex rounded-lg overflow-hidden border border-bronze/50 p-1 bg-charcoal">
                <button 
                  onClick={() => setDeliveryType("Home Delivery")}
                  className={`flex-1 py-2 text-sm font-bold uppercase tracking-wider rounded-md transition-colors ${deliveryType === "Home Delivery" ? 'bg-gold-royal text-obsidian' : 'text-charcoal-light hover:text-white'}`}
                >
                  🚚 Home Delivery
                </button>
                <button 
                  onClick={() => setDeliveryType("Pickup")}
                  className={`flex-1 py-2 text-sm font-bold uppercase tracking-wider rounded-md transition-colors ${deliveryType === "Pickup" ? 'bg-gold-royal text-obsidian' : 'text-charcoal-light hover:text-white'}`}
                >
                  🏪 Pickup
                </button>
              </div>

              {/* Cart Items */}
              {items.length === 0 ? (
                <div className="text-center py-12 text-charcoal-light/60">
                  <ShoppingBag className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Your cart is empty.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map((item) => (
                    <div key={item.id} className="bg-charcoal p-4 rounded-xl border border-bronze/30 flex items-center justify-between">
                      <div className="flex-1 pr-4">
                        <div className="text-sm font-bold text-white mb-1">
                          {item.name} {item.size !== "Fixed" && <span className="text-charcoal-light/70 font-normal">({item.size})</span>}
                        </div>
                        <div className="text-gold-light font-cinzel text-sm">₹{item.price}</div>
                      </div>
                      <div className="flex items-center space-x-3 bg-obsidian rounded-full px-2 py-1 border border-bronze/50">
                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="p-1 text-charcoal-light hover:text-white disabled:opacity-50" disabled={item.quantity <= 1}>
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="text-sm font-bold w-4 text-center text-white">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-1 text-charcoal-light hover:text-white">
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                      <button onClick={() => removeItem(item.id)} className="ml-4 p-2 text-red-500/70 hover:text-red-500 transition-colors">
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* Customer Details */}
              <div className="space-y-4">
                <h3 className="text-xs uppercase tracking-widest text-charcoal-light/70 font-bold mb-4">Customer Details</h3>
                <input 
                  type="text" 
                  placeholder="Full Name *" 
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="w-full bg-charcoal border border-bronze/50 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gold-royal"
                />
                <input 
                  type="tel" 
                  placeholder="Mobile Number *" 
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  className="w-full bg-charcoal border border-bronze/50 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gold-royal"
                />
                
                {deliveryType === "Home Delivery" && (
                  <div className="pt-2 space-y-4 border-t border-bronze/30 mt-4">
                    <h3 className="text-xs uppercase tracking-widest text-charcoal-light/70 font-bold">Delivery Address</h3>
                    <input 
                      type="text" 
                      placeholder="Flat / House No. *" 
                      value={houseNo}
                      onChange={e => setHouseNo(e.target.value)}
                      className="w-full bg-charcoal border border-bronze/50 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gold-royal"
                    />
                    <input 
                      type="text" 
                      placeholder="Street / Area *" 
                      value={street}
                      onChange={e => setStreet(e.target.value)}
                      className="w-full bg-charcoal border border-bronze/50 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gold-royal"
                    />
                    <div className="flex gap-4">
                      <input 
                        type="text" 
                        placeholder="Landmark (Optional)" 
                        value={landmark}
                        onChange={e => setLandmark(e.target.value)}
                        className="w-full bg-charcoal border border-bronze/50 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gold-royal"
                      />
                      <input 
                        type="text" 
                        placeholder="Pincode (Optional)" 
                        value={pincode}
                        onChange={e => setPincode(e.target.value)}
                        className="w-full bg-charcoal border border-bronze/50 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gold-royal"
                      />
                    </div>
                  </div>
                )}
                
                <div className="pt-2 border-t border-bronze/30 mt-4">
                    <textarea 
                      placeholder="Any special instructions (optional)" 
                      rows={2}
                      value={instructions}
                      onChange={e => setInstructions(e.target.value)}
                      className="w-full bg-charcoal border border-bronze/50 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gold-royal resize-none"
                    />
                </div>
              </div>

            </div>

            {/* Footer / Total */}
            <div className="p-6 border-t border-bronze/50 bg-charcoal">
              <div className="space-y-2 mb-6">
                <div className="flex justify-between text-sm text-charcoal-light">
                  <span>Subtotal</span>
                  <span>₹{subtotal}</span>
                </div>
                <div className="flex justify-between text-sm text-charcoal-light">
                  <span>GST (5%)</span>
                  <span>₹{gst}</span>
                </div>
                <div className="flex justify-between text-lg font-bold text-gold-royal pt-2 border-t border-bronze/30">
                  <span>Grand Total</span>
                  <span>₹{grandTotal}</span>
                </div>
              </div>

              <button 
                onClick={handleCheckout}
                disabled={items.length === 0}
                className="w-full bg-gold-royal text-obsidian font-bold py-4 rounded-lg uppercase tracking-widest hover:bg-gold-light transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                <span>🛒 Send Order to WhatsApp</span>
              </button>
            </div>

          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
