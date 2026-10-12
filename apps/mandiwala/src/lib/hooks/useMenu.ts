import { useState, useEffect } from "react";
import { collection, onSnapshot, query, orderBy, doc, setDoc, deleteDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { MenuItem } from "@/lib/data"; // We'll keep the types here for now

export function useMenu() {
  const [menu, setMenu] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, "menu"), orderBy("name"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as MenuItem));
      setMenu(data);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const addOrUpdateMenuItem = async (item: MenuItem) => {
    const itemRef = doc(db, "menu", item.id);
    await setDoc(itemRef, item);
  };

  const deleteMenuItem = async (id: string) => {
    await deleteDoc(doc(db, "menu", id));
  };

  return { menu, loading, addOrUpdateMenuItem, deleteMenuItem };
}
