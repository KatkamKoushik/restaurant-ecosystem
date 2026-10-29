import { useState, useEffect } from "react";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { MenuItem } from "@/lib/data";

export function useMenu() {
  const [menu, setMenu] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, "menu"), orderBy("name"));
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as MenuItem));
        setMenu(data);
        setLoading(false);
      },
      (error) => {
        console.error("Error reading public menu catalog:", error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const addOrUpdateMenuItem = async (item: MenuItem) => {
    const res = await fetch("/api/admin/menu", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ item }),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || "Failed to save menu item");
    }
  };

  const deleteMenuItem = async (id: string) => {
    const res = await fetch(`/api/admin/menu?id=${encodeURIComponent(id)}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || "Failed to delete menu item");
    }
  };

  return { menu, loading, addOrUpdateMenuItem, deleteMenuItem };
}
