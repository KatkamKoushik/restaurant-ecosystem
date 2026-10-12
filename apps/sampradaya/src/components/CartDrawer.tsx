"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { ShoppingBag, X, Plus, Minus, Trash2, ArrowLeft } from "lucide-react";
import { useCartStore } from "@/store/cart";
import { generateWhatsAppLink, CustomerDetails } from "@/utils/whatsapp";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export const CartDrawer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [step, setStep] = useState<1 | 2>(1);
  const [customer, setCustomer] = useState<CustomerDetails>({
    fullName: "",
    mobile: "",
    flatNo: "",
    street: "",
    landmark: "",
    pincode: "",
    instructions: "",
    orderType: "delivery",
  });
  
  const { items, removeItem, updateQuantity, clearCart, cartTotal, cartCount } = useCartStore();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Reset step when closed
  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => setStep(1), 300);
    }
  }, [isOpen]);

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) return;
    const url = generateWhatsAppLink(items, cartTotal(), customer);
    window.open(url, "_blank");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCustomer(prev => ({ ...prev, [name]: value }));
  };

  if (!isMounted) return null;

  const count = cartCount();

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="relative p-2 text-foreground hover:text-primary transition-colors flex items-center justify-center"
        aria-label="Open Cart"
      >
        <ShoppingBag size={24} />
        {count > 0 && (
          <span className="absolute top-0 right-0 w-5 h-5 bg-secondary text-white text-xs font-bold rounded-full flex items-center justify-center">
            {count}
          </span>
        )}
      </button>

      {createPortal(
        <AnimatePresence>
          {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/50 z-[100] backdrop-blur-sm will-change-transform"
            />
            
            {/* Drawer */}
            <motion.div 
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-white z-[101] flex flex-col shadow-2xl will-change-transform"
              data-lenis-prevent="true"
            >
              {/* Header */}
              <div className="p-6 border-b border-gray-100 flex items-center justify-between shrink-0 bg-white">
                {step === 2 ? (
                  <button 
                    onClick={() => setStep(1)}
                    className="p-2 -ml-2 text-gray-400 hover:text-primary transition-colors flex items-center gap-2"
                  >
                    <ArrowLeft size={20} />
                    <span className="font-medium">Back</span>
                  </button>
                ) : (
                  <h2 className="text-2xl font-bold font-serif text-foreground">Your Order</h2>
                )}
                <button 
                  onClick={() => setIsOpen(false)}
                  className="p-2 text-gray-400 hover:text-primary transition-colors rounded-full hover:bg-gray-50"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Content and Footer merged to manage form scope properly */}
              {step === 1 ? (
                <>
                  <div className="flex-1 overflow-y-auto bg-gray-50/50">
                    {items.length === 0 ? (
                      <div className="flex flex-col items-center justify-center h-full text-gray-400 p-8 text-center">
                        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                          <ShoppingBag size={48} className="text-gray-300" />
                        </div>
                        <p className="text-xl font-medium text-gray-600 mb-2">Your cart is empty</p>
                        <p className="text-sm">Add some delicious dishes from our menu to get started!</p>
                        <button 
                          onClick={() => setIsOpen(false)}
                          className="mt-8 px-6 py-3 bg-primary/10 text-primary rounded-full font-bold hover:bg-primary hover:text-white transition-colors"
                        >
                          Browse Menu
                        </button>
                      </div>
                    ) : (
                      <div className="p-6 flex flex-col gap-4">
                        {items.map((item) => (
                          <div key={item.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex gap-4">
                            <div className="relative w-20 h-20 rounded-lg overflow-hidden shrink-0 bg-gray-50">
                              {item.image ? (
                                <Image src={item.image} alt={item.name} fill className="object-cover" sizes="80px" />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center">
                                  <ShoppingBag size={24} className="text-gray-300" />
                                </div>
                              )}
                            </div>
                            <div className="flex-1 min-w-0 flex flex-col justify-between">
                              <div>
                                <h4 className="font-bold text-foreground text-sm line-clamp-2 leading-snug">{item.name}</h4>
                                <p className="text-primary font-serif font-bold mt-1">₹{item.price}</p>
                              </div>
                              
                              <div className="flex items-center justify-between mt-2">
                                <div className="flex items-center gap-3 bg-gray-50 rounded-full px-2 py-1">
                                  <button 
                                    onClick={() => updateQuantity(item.id, Math.max(0, item.quantity - 1))}
                                    className="p-1 hover:text-primary transition-colors"
                                  >
                                    <Minus size={14} />
                                  </button>
                                  <span className="w-4 text-center text-sm font-bold">{item.quantity}</span>
                                  <button 
                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                    className="p-1 hover:text-primary transition-colors"
                                  >
                                    <Plus size={14} />
                                  </button>
                                </div>
                                
                                <button 
                                  onClick={() => removeItem(item.id)}
                                  className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                                >
                                  <Trash2 size={16} />
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  
                  {/* Step 1 Footer */}
                  {items.length > 0 && (
                    <div className="p-6 border-t border-gray-100 bg-white shrink-0">
                      <div className="flex justify-between items-center mb-6">
                        <span className="text-lg text-foreground/80 font-medium">Total</span>
                        <span className="text-2xl font-bold font-serif text-primary">₹{cartTotal()}</span>
                      </div>
                      <button 
                        onClick={() => setStep(2)}
                        className="w-full py-4 bg-primary text-white rounded-xl font-bold text-lg shadow-lg shadow-primary/20 hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 transform hover:-translate-y-1 will-change-transform"
                      >
                        Proceed to Details
                      </button>
                    </div>
                  )}
                </>
              ) : (
                /* Step 2: Customer Details */
                <form id="checkout-form" onSubmit={handleCheckout} className="flex flex-col flex-1 overflow-hidden">
                  <div className="flex-1 overflow-y-auto bg-gray-50/50 p-6 space-y-6">
                    <div className="flex bg-gray-200/50 p-1 rounded-xl mb-2">
                      <button 
                        type="button"
                        onClick={() => setCustomer({...customer, orderType: 'delivery'})}
                        className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${customer.orderType === 'delivery' ? 'bg-white shadow-sm text-primary' : 'text-gray-500 hover:text-gray-700'}`}
                      >
                        Home Delivery
                      </button>
                      <button 
                        type="button"
                        onClick={() => setCustomer({...customer, orderType: 'pickup'})}
                        className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${customer.orderType === 'pickup' ? 'bg-white shadow-sm text-primary' : 'text-gray-500 hover:text-gray-700'}`}
                      >
                        Self Pickup
                      </button>
                    </div>

                    <div className="space-y-4">
                      <h3 className="font-bold text-lg text-foreground border-b pb-2 border-gray-200">Customer Details</h3>
                      
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Full Name *</label>
                        <input 
                          type="text" 
                          name="fullName"
                          required
                          value={customer.fullName}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                          placeholder="Enter your name"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Mobile Number *</label>
                        <input 
                          type="tel" 
                          name="mobile"
                          required
                          value={customer.mobile}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                          placeholder="10-digit mobile number"
                        />
                      </div>
                    </div>

                    {customer.orderType === 'delivery' && (
                      <div className="space-y-4 pt-2">
                        <h3 className="font-bold text-lg text-foreground border-b pb-2 border-gray-200">Delivery Address</h3>
                      
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Flat / House No. *</label>
                        <input 
                          type="text" 
                          name="flatNo"
                          required
                          value={customer.flatNo}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                          placeholder="Flat, House no., Building, Company, Apartment"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Street / Area *</label>
                        <input 
                          type="text" 
                          name="street"
                          required
                          value={customer.street}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                          placeholder="Area, Street, Sector, Village"
                        />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-gray-700">Landmark</label>
                          <input 
                            type="text" 
                            name="landmark"
                            value={customer.landmark}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                            placeholder="E.g. near hospital"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-gray-700">Pincode</label>
                          <input 
                            type="text" 
                            name="pincode"
                            value={customer.pincode}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                            placeholder="6 digits"
                          />
                        </div>
                      </div>
                      </div>
                    )}

                    <div className="space-y-2 pt-2 pb-6">
                      <label className="text-sm font-medium text-gray-700">Special Instructions (Optional)</label>
                      <textarea 
                        name="instructions"
                        value={customer.instructions}
                        onChange={handleInputChange}
                        rows={3}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all resize-none"
                        placeholder="Any special requests for the kitchen or delivery partner?"
                      />
                    </div>
                  </div>
                  
                  {/* Step 2 Footer */}
                  <div className="p-6 border-t border-gray-100 bg-white shrink-0">
                    <div className="flex justify-between items-center mb-6">
                      <span className="text-lg text-foreground/80 font-medium">Total</span>
                      <span className="text-2xl font-bold font-serif text-primary">₹{cartTotal()}</span>
                    </div>
                    <button 
                      type="submit"
                      className="w-full py-4 bg-[#25D366] text-white rounded-xl font-bold text-lg shadow-lg shadow-[#25D366]/20 hover:bg-[#128C7E] transition-colors flex items-center justify-center gap-2 transform hover:-translate-y-1 will-change-transform"
                    >
                      Send Order via WhatsApp
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>,
      document.body
      )}
    </>
  );
};
