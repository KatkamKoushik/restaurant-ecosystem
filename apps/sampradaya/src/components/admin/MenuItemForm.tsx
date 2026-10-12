"use client";

import { useState } from "react";
import { uploadToCloudinary } from "@/lib/cloudinary";

export type MenuItemInput = {
  id?: string;
  name: string;
  price: number;
  category: string;
  type: string;
  image: string;
};

interface MenuItemFormProps {
  initialData?: MenuItemInput;
  onSubmit: (data: MenuItemInput) => Promise<void>;
  onCancel: () => void;
}

export function MenuItemForm({ initialData, onSubmit, onCancel }: MenuItemFormProps) {
  const [formData, setFormData] = useState<MenuItemInput>(
    initialData || {
      name: "",
      price: 0,
      category: "Starters",
      type: "veg",
      image: "",
    }
  );
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "price" ? parseFloat(value) || 0 : value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      let imageUrl = formData.image;
      if (file) {
        imageUrl = await uploadToCloudinary(file);
      }
      await onSubmit({ ...formData, image: imageUrl });
    } catch (error) {
      console.error("Failed to save menu item:", error);
      alert("Failed to save. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-xl shadow-sm border">
      <h3 className="text-xl font-bold font-serif mb-4">
        {initialData ? "Edit Menu Item" : "Add New Menu Item"}
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Dish Name</label>
          <input
            type="text"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary outline-none"
            placeholder="e.g. Chicken Dum Biryani"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Price (₹)</label>
          <input
            type="number"
            name="price"
            required
            min="0"
            step="1"
            value={formData.price}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary outline-none"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary outline-none"
          >
            <option value="Starters">Starters</option>
            <option value="Biryanis">Biryanis</option>
            <option value="Rice & Noodles">Rice & Noodles</option>
            <option value="Indian Breads">Indian Breads</option>
            <option value="Non-Veg Curries">Non-Veg Curries</option>
            <option value="Veg Curries">Veg Curries</option>
            <option value="Salads & Raithas">Salads & Raithas</option>
            <option value="Desserts, Ice Cream & Beverages">Desserts, Ice Cream & Beverages</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Type</label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary outline-none"
          >
            <option value="veg">Vegetarian</option>
            <option value="non-veg">Non-Vegetarian</option>
          </select>
        </div>

        <div className="space-y-2 md:col-span-2">
          <label className="block text-sm font-medium text-gray-700">Image</label>
          <div className="flex items-center gap-4">
            {formData.image && !file && (
              <img src={formData.image} alt="Preview" className="w-16 h-16 object-cover rounded-lg" />
            )}
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full px-4 py-2 border rounded-lg file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20"
            />
          </div>
        </div>
      </div>

      <div className="flex gap-4 pt-4 border-t">
        <button
          type="button"
          onClick={onCancel}
          disabled={isLoading}
          className="px-6 py-2 border rounded-full font-medium hover:bg-gray-50 transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isLoading}
          className="px-6 py-2 bg-primary text-white rounded-full font-medium hover:bg-primary/90 transition-colors disabled:opacity-50"
        >
          {isLoading ? "Saving..." : "Save Item"}
        </button>
      </div>
    </form>
  );
}
