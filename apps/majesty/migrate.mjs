import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc } from "firebase/firestore";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
};

if (!firebaseConfig.apiKey || !firebaseConfig.projectId) {
  console.error("Firebase environment variables are missing. Please configure .env.local");
  process.exit(1);
}

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function migrate() {
  try {
    const menuContent = fs.readFileSync(path.join(__dirname, "src/data/menu.ts"), "utf-8");
    const match = menuContent.match(/export const menuItems: MenuItem\[\] = (\[[\s\S]*\]);/);
    if (!match) {
      throw new Error("Could not parse menuItems from menu.ts");
    }

    let items;
    try {
      const sanitized = match[1]
        .replace(/([{,]\s*)([a-zA-Z0-9_]+)\s*:/g, '$1"$2":')
        .replace(/,(?=\s*[}\]])/g, '');
      items = JSON.parse(sanitized);
    } catch {
      items = new Function(`return ${match[1]}`)();
    }

    const dishesCol = collection(db, "dishes");
    
    // First delete all existing docs to avoid duplicates
    const snapshot = await getDocs(dishesCol);
    let deletedCount = 0;
    for (const document of snapshot.docs) {
      await deleteDoc(doc(db, "dishes", document.id));
      deletedCount++;
    }
    console.log(`Deleted ${deletedCount} old documents.`);

    let count = 0;
    for (const item of items) {
      await addDoc(dishesCol, {
        name: item.name,
        description: item.description || "",
        prices: item.prices || { Regular: 0 },
        category: item.category,
        image_url: item.image || "",
        is_popular: item.isPopular || false,
        is_veg: item.isVeg || false,
      });
      count++;
    }
    console.log(`Successfully migrated ${count} dishes to Firestore with correct prices object.`);
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

migrate();
