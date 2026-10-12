"use client";

import { useState } from "react";
import { useMenu } from "@/lib/hooks/useMenu";
import { MenuItem } from "@/lib/data";
import { CldUploadWidget } from "next-cloudinary";
import { Edit2, Plus, Trash2, Image as ImageIcon, Save, X, ArrowLeft } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const CATEGORIES = ["Chicken", "Mutton", "Egg", "Paneer", "Seafood", "Add-on", "Dessert"] as const;

export default function AdminMenuPage() {
  const { menu, loading, addOrUpdateMenuItem, deleteMenuItem } = useMenu();
  const [editingItem, setEditingItem] = useState<Partial<MenuItem> | null>(null);
  const handleSave = async () => {
    if (!editingItem?.name || !editingItem?.category) {
      alert("Name and Category are required.");
      return;
    }

    const itemToSave: MenuItem = {
      id: editingItem.id || `item-${Date.now()}`,
      name: editingItem.name,
      category: editingItem.category as any,
      description: editingItem.description || "",
      image: editingItem.image || "/brand/logo.jpeg",
      isBestSeller: editingItem.isBestSeller || false,
      prices: editingItem.prices || {},
    };

    await addOrUpdateMenuItem(itemToSave);
    setEditingItem(null);
  };

  return (
    <div className="min-h-screen bg-charcoal text-charcoal-light font-plus-jakarta px-8 pb-8 pt-32">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:justify-between items-start md:items-center space-y-4 md:space-y-0 mb-8 border-b border-bronze pb-6">
          <div>
            <Link href="/admin" className="text-gold-royal hover:text-gold-light inline-flex items-center space-x-2 mb-4">
              <ArrowLeft className="w-4 h-4" /> <span>Back to Dashboard</span>
            </Link>
            <h1 className="font-cinzel text-3xl text-gold-royal uppercase tracking-widest">Menu Management</h1>
            <p className="text-sm opacity-60 mt-1">Add, edit, or remove dishes from your menu in real-time.</p>
          </div>
          <div className="flex space-x-4">
            <button 
              onClick={() => setEditingItem({})}
              className="flex items-center space-x-2 px-6 py-2 bg-gold-royal text-obsidian font-bold rounded hover:bg-gold-light transition-colors"
            >
              <Plus className="w-5 h-5" /> <span>Add New Dish</span>
            </button>
          </div>
        </div>

        {/* Editor Modal */}
        {editingItem && (
          <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
            <div className="bg-obsidian border border-bronze rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6" data-lenis-prevent="true">
              <div className="flex justify-between items-center mb-6">
                <h2 className="font-cinzel text-2xl text-gold-royal">
                  {editingItem.id ? "Edit Dish" : "Add New Dish"}
                </h2>
                <button onClick={() => setEditingItem(null)} className="text-charcoal-light hover:text-white">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-6">
                {/* Image Upload */}
                <div>
                  <label className="block text-sm font-bold text-charcoal-light/70 uppercase tracking-widest mb-2">Dish Image</label>
                  <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-6">
                    {editingItem.image ? (
                      <div className="relative w-32 h-32 rounded-lg overflow-hidden border border-bronze">
                        <Image src={editingItem.image} alt="Dish preview" fill className="object-cover" sizes="128px" />
                      </div>
                    ) : (
                      <div className="w-32 h-32 rounded-lg border border-dashed border-bronze flex items-center justify-center bg-charcoal">
                        <ImageIcon className="w-8 h-8 text-charcoal-light/30" />
                      </div>
                    )}
                    
                    <CldUploadWidget 
                      signatureEndpoint="/api/cloudinary-sign"
                      options={{
                        multiple: false,
                        maxFiles: 1,
                      }}
                      onSuccess={(result: any) => {
                        setEditingItem({ ...editingItem, image: result.info.secure_url });
                      }}
                    >
                      {({ open }) => (
                        <button onClick={() => open()} className="px-4 py-2 bg-charcoal border border-bronze rounded hover:text-white transition-colors">
                          Upload New Photo
                        </button>
                      )}
                    </CldUploadWidget>
                  </div>
                </div>

                {/* Basic Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-charcoal-light/70 uppercase tracking-widest mb-2">Dish Name *</label>
                    <input 
                      type="text" 
                      value={editingItem.name || ""}
                      onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })}
                      className="w-full bg-charcoal border border-bronze/50 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-gold-royal"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-charcoal-light/70 uppercase tracking-widest mb-2">Category *</label>
                    <select 
                      value={editingItem.category || ""}
                      onChange={(e) => setEditingItem({ ...editingItem, category: e.target.value as any })}
                      className="w-full bg-charcoal border border-bronze/50 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-gold-royal"
                    >
                      <option value="" disabled>Select a category</option>
                      {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-charcoal-light/70 uppercase tracking-widest mb-2">Description</label>
                  <textarea 
                    value={editingItem.description || ""}
                    onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })}
                    rows={2}
                    className="w-full bg-charcoal border border-bronze/50 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-gold-royal"
                  />
                </div>

                <div>
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={editingItem.isBestSeller || false}
                      onChange={(e) => setEditingItem({ ...editingItem, isBestSeller: e.target.checked })}
                      className="w-5 h-5 accent-gold-royal"
                    />
                    <span className="font-bold text-gold-light uppercase tracking-widest text-sm">Mark as Best Seller (Shows on Homepage)</span>
                  </label>
                </div>

                {/* Pricing */}
                <div className="border-t border-bronze/30 pt-6">
                  <h3 className="font-cinzel text-xl text-gold-royal mb-4">Pricing Setup</h3>
                  <p className="text-xs text-charcoal-light/60 mb-4 uppercase tracking-widest">
                    Enter prices for specific portions. If a dish doesn't have portions (like Desserts), just use the "Fixed Price" box. Leave others blank.
                  </p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs uppercase text-charcoal-light/70 mb-1">Single Price</label>
                      <input 
                        type="number" 
                        value={editingItem.prices?.single || ""}
                        onChange={(e) => setEditingItem({ ...editingItem, prices: { ...editingItem.prices, single: Number(e.target.value) || undefined } })}
                        className="w-full bg-charcoal border border-bronze/50 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-gold-royal"
                      />
                    </div>
                    <div>
                      <label className="block text-xs uppercase text-charcoal-light/70 mb-1">Half Price</label>
                      <input 
                        type="number" 
                        value={editingItem.prices?.half || ""}
                        onChange={(e) => setEditingItem({ ...editingItem, prices: { ...editingItem.prices, half: Number(e.target.value) || undefined } })}
                        className="w-full bg-charcoal border border-bronze/50 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-gold-royal"
                      />
                    </div>
                    <div>
                      <label className="block text-xs uppercase text-charcoal-light/70 mb-1">Tri Price</label>
                      <input 
                        type="number" 
                        value={editingItem.prices?.tri || ""}
                        onChange={(e) => setEditingItem({ ...editingItem, prices: { ...editingItem.prices, tri: Number(e.target.value) || undefined } })}
                        className="w-full bg-charcoal border border-bronze/50 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-gold-royal"
                      />
                    </div>
                    <div>
                      <label className="block text-xs uppercase text-charcoal-light/70 mb-1">Family Price</label>
                      <input 
                        type="number" 
                        value={editingItem.prices?.family || ""}
                        onChange={(e) => setEditingItem({ ...editingItem, prices: { ...editingItem.prices, family: Number(e.target.value) || undefined } })}
                        className="w-full bg-charcoal border border-bronze/50 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-gold-royal"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-xs uppercase text-gold-light mb-1">Fixed Price (No Portions)</label>
                      <input 
                        type="number" 
                        value={editingItem.prices?.fixed || ""}
                        onChange={(e) => setEditingItem({ ...editingItem, prices: { ...editingItem.prices, fixed: Number(e.target.value) || undefined } })}
                        className="w-full bg-charcoal border border-gold-royal/50 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-gold-royal"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end pt-6 border-t border-bronze/30 space-x-4">
                  <button onClick={() => setEditingItem(null)} className="px-6 py-2 text-charcoal-light hover:text-white transition-colors">
                    Cancel
                  </button>
                  <button onClick={handleSave} className="flex items-center space-x-2 px-8 py-2 bg-gold-royal text-obsidian font-bold rounded hover:bg-gold-light transition-colors">
                    <Save className="w-5 h-5" /> <span>Save Dish</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Menu Grid */}
        {loading ? (
          <div className="text-center py-24 text-gold-royal animate-pulse font-cinzel text-xl">Loading Menu...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {menu.map((item) => (
              <div key={item.id} className="bg-obsidian border border-bronze rounded-xl overflow-hidden flex flex-col">
                <div className="relative h-48 w-full border-b border-bronze/30">
                  <Image src={item.image} alt={item.name} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover" />
                  {item.isBestSeller && (
                    <div className="absolute top-2 left-2 bg-gold-royal text-obsidian text-[10px] font-bold px-2 py-0.5 uppercase tracking-wider rounded-sm">
                      Best Seller
                    </div>
                  )}
                  <div className="absolute top-2 right-2 bg-black/60 text-white text-[10px] font-bold px-2 py-0.5 uppercase tracking-wider rounded backdrop-blur-sm border border-white/20">
                    {item.category}
                  </div>
                </div>
                <div className="p-4 flex flex-col flex-grow">
                  <h3 className="font-cinzel text-lg text-gold-light mb-1">{item.name}</h3>
                  
                  <div className="mt-auto pt-4 flex items-center justify-between">
                    <div className="text-sm font-bold opacity-80">
                      {item.prices.fixed ? `₹${item.prices.fixed}` : `From ₹${item.prices.single || item.prices.half}`}
                    </div>
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => setEditingItem(item)}
                        className="p-2 bg-charcoal border border-bronze rounded hover:text-gold-light transition-colors"
                        title="Edit"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => {
                          if (confirm(`Are you sure you want to delete ${item.name}?`)) {
                            deleteMenuItem(item.id);
                          }
                        }}
                        className="p-2 bg-charcoal border border-red-900/50 rounded hover:text-red-400 transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        
        {!loading && menu.length === 0 && (
          <div className="text-center py-24 border border-dashed border-bronze rounded-xl bg-obsidian">
            <p className="text-charcoal-light/60 mb-4">Your menu is currently empty.</p>
            <button 
              onClick={() => setEditingItem({})}
              className="inline-flex items-center space-x-2 px-6 py-2 bg-gold-royal text-obsidian font-bold rounded hover:bg-gold-light transition-colors"
            >
              <Plus className="w-5 h-5" /> <span>Add First Dish</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
