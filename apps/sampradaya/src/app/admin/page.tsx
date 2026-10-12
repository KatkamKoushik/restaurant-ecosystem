"use client";

import { useState, useEffect } from "react";
import { Plus, Edit2, Trash2, AlertCircle } from "lucide-react";
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { MenuItemForm, MenuItemInput } from "@/components/admin/MenuItemForm";
import Image from "next/image";

export default function AdminDashboard() {
  const [items, setItems] = useState<MenuItemInput[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<MenuItemInput | null>(null);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    setIsLoading(true);
    try {
      if (process.env.NEXT_PUBLIC_FIREBASE_API_KEY === "your_api_key" || !process.env.NEXT_PUBLIC_FIREBASE_API_KEY) {
        throw new Error("Placeholder API keys in use");
      }
      const querySnapshot = await getDocs(collection(db, "menu_items"));
      const fetchedItems: MenuItemInput[] = [];
      querySnapshot.forEach((doc) => {
        fetchedItems.push({ id: doc.id, ...doc.data() } as MenuItemInput);
      });
      setItems(fetchedItems);
      setError(null);
    } catch (err: any) {
      console.warn("Failed to fetch from Firebase. Using placeholder data.", err);
      // If Firebase fails (e.g. placeholder keys), we show an empty list or mock data
      setItems([]);
      setError("Firebase is running in placeholder mode. Real data cannot be fetched until API keys are updated in .env.local.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddNew = () => {
    setEditingItem(null);
    setIsFormOpen(true);
  };

  const handleEdit = (item: MenuItemInput) => {
    setEditingItem(item);
    setIsFormOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this item?")) return;
    
    try {
      if (process.env.NEXT_PUBLIC_FIREBASE_API_KEY === "your_api_key" || !process.env.NEXT_PUBLIC_FIREBASE_API_KEY) {
        throw new Error("Placeholder mode");
      }
      await deleteDoc(doc(db, "menu_items", id));
      setItems(items.filter((item) => item.id !== id));
    } catch (err) {
      console.error(err);
      alert("Failed to delete. Ensure Firebase keys are configured.");
      // Optimistically update for placeholder mode demo
      setItems(items.filter((item) => item.id !== id));
    }
  };

  const handleFormSubmit = async (data: MenuItemInput) => {
    try {
      if (process.env.NEXT_PUBLIC_FIREBASE_API_KEY === "your_api_key" || !process.env.NEXT_PUBLIC_FIREBASE_API_KEY) {
        throw new Error("Placeholder mode");
      }
      if (data.id) {
        // Update
        const itemRef = doc(db, "menu_items", data.id);
        const { id, ...updateData } = data;
        await updateDoc(itemRef, updateData);
        setItems(items.map((i) => (i.id === data.id ? data : i)));
      } else {
        // Add new
        const docRef = await addDoc(collection(db, "menu_items"), data);
        setItems([...items, { ...data, id: docRef.id }]);
      }
      setIsFormOpen(false);
    } catch (err) {
      console.error(err);
      alert("Failed to save to Firebase. Changes will only be reflected locally for this session.");
      // Optimistically update for placeholder mode demo
      if (data.id) {
        setItems(items.map((i) => (i.id === data.id ? data : i)));
      } else {
        setItems([...items, { ...data, id: "temp-" + Date.now() }]);
      }
      setIsFormOpen(false);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold font-serif text-gray-900">Menu Management</h1>
          <p className="text-gray-500 mt-2">Add, edit, or remove dishes from the digital menu.</p>
        </div>
        <button
          onClick={handleAddNew}
          className="flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-full font-medium hover:bg-primary/90 transition-colors shadow-md"
        >
          <Plus size={20} />
          Add New Dish
        </button>
      </div>

      {error && (
        <div className="mb-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg flex items-start gap-3 text-yellow-800">
          <AlertCircle className="mt-0.5 shrink-0" size={20} />
          <div>
            <h4 className="font-semibold">Placeholder Mode Active</h4>
            <p className="text-sm mt-1">{error}</p>
          </div>
        </div>
      )}

      {isFormOpen ? (
        <div className="mb-8 animate-in fade-in slide-in-from-top-4">
          <MenuItemForm
            initialData={editingItem || undefined}
            onSubmit={handleFormSubmit}
            onCancel={() => setIsFormOpen(false)}
          />
        </div>
      ) : null}

      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b">
                <th className="p-4 font-medium text-gray-600">Image</th>
                <th className="p-4 font-medium text-gray-600">Name</th>
                <th className="p-4 font-medium text-gray-600">Category</th>
                <th className="p-4 font-medium text-gray-600">Type</th>
                <th className="p-4 font-medium text-gray-600">Price</th>
                <th className="p-4 font-medium text-gray-600 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-gray-500">
                    Loading menu items...
                  </td>
                </tr>
              ) : items.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-gray-500">
                    No menu items found. Click "Add New Dish" to create one.
                  </td>
                </tr>
              ) : (
                items.map((item) => (
                  <tr key={item.id} className="border-b last:border-0 hover:bg-gray-50 transition-colors">
                    <td className="p-4">
                      {item.image ? (
                        <div className="relative w-12 h-12 rounded overflow-hidden">
                          <Image src={item.image} alt={item.name} fill className="object-cover" />
                        </div>
                      ) : (
                        <div className="w-12 h-12 rounded bg-gray-100 flex items-center justify-center text-gray-400 text-xs">
                          No Img
                        </div>
                      )}
                    </td>
                    <td className="p-4 font-medium">{item.name}</td>
                    <td className="p-4 text-gray-600">{item.category}</td>
                    <td className="p-4">
                      <span
                        className={`px-2 py-1 text-xs rounded-full font-medium ${
                          item.type === "veg" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                        }`}
                      >
                        {item.type === "veg" ? "Veg" : "Non-Veg"}
                      </span>
                    </td>
                    <td className="p-4 font-medium">₹{item.price}</td>
                    <td className="p-4">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => handleEdit(item)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          aria-label="Edit"
                        >
                          <Edit2 size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(item.id!)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          aria-label="Delete"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
