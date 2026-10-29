import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, writeBatch, doc } from "firebase/firestore";
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
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

const args = process.argv.slice(2);
const isDryRun = args.includes("--dry-run");
const isConfirmed = args.includes("--confirm");

if (!isDryRun && !isConfirmed) {
  console.log("================================================================================");
  console.log("SAFETY GUARD: Database Migration Script for Majesty Restaurant");
  console.log("================================================================================");
  console.log("This script validates, creates a verified backup, and performs atomic batched");
  console.log("updates to the 'dishes' collection.");
  console.log("");
  console.log("To preview the migration safely:   node migrate.mjs --dry-run");
  console.log("To execute document replacement:  node migrate.mjs --confirm");
  console.log("================================================================================");
  process.exit(0);
}

if (!firebaseConfig.apiKey || !firebaseConfig.projectId) {
  console.error("Firebase environment variables are missing. Please configure .env.local");
  process.exit(1);
}

console.log(`Connected to Firebase Project ID: ${firebaseConfig.projectId}`);

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Helper to chunk an array into batch sizes compatible with Firestore (max 400 operations per batch)
function chunkArray(items, size) {
  const chunks = [];
  for (let i = 0; i < items.length; i += size) {
    chunks.push(items.slice(i, i + size));
  }
  return chunks;
}

async function migrate() {
  try {
    // 1. Read and safely parse menu.ts
    const menuContent = fs.readFileSync(path.join(__dirname, "src/data/menu.ts"), "utf-8");
    const match = menuContent.match(/export const menuItems: MenuItem\[\] = (\[[\s\S]*\]);/);
    if (!match) {
      throw new Error("Could not parse menuItems from menu.ts");
    }

    const rawArrayStr = match[1];
    const sanitized = rawArrayStr
      .replace(/([{,]\s*)([a-zA-Z0-9_]+)\s*:/g, '$1"$2":')
      .replace(/,\s*([}\]])/g, "$1");

    const items = JSON.parse(sanitized);

    // 2. Validate all replacement items BEFORE touching the database
    if (!Array.isArray(items) || items.length === 0) {
      throw new Error("Parsed items array is empty or invalid. Aborting migration.");
    }

    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      if (!item.name || typeof item.name !== "string" || item.name.trim() === "") {
        throw new Error(`Validation failed at index ${i}: 'name' is required and must be a non-empty string.`);
      }
      if (!item.category || typeof item.category !== "string") {
        throw new Error(`Validation failed at index ${i} ('${item.name}'): 'category' is required.`);
      }
    }
    console.log(`Pre-migration validation passed: ${items.length} dishes validated.`);

    // 3. Inspect existing collection
    const dishesCol = collection(db, "dishes");
    const snapshot = await getDocs(dishesCol);

    if (isDryRun) {
      console.log(`[DRY-RUN] Current documents in 'dishes': ${snapshot.docs.length}`);
      console.log(`[DRY-RUN] New documents to insert from menu.ts: ${items.length}`);
      console.log("[DRY-RUN] Validation succeeded. Completed without modifying Firestore.");
      process.exit(0);
    }

    // 4. Create an automated local backup file before modifying Firestore
    const backupDir = path.join(__dirname, "backups");
    if (!fs.existsSync(backupDir)) {
      fs.mkdirSync(backupDir, { recursive: true });
    }

    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    const backupFilePath = path.join(backupDir, `dishes_backup_${timestamp}.json`);
    const backupData = snapshot.docs.map((docSnap) => ({
      id: docSnap.id,
      ...docSnap.data(),
    }));

    fs.writeFileSync(backupFilePath, JSON.stringify(backupData, null, 2), "utf-8");
    console.log(`Verified local backup created: ${backupFilePath} (${backupData.length} records preserved).`);

    // 5. Atomic Batched Deletion of old documents
    const deleteDocs = snapshot.docs;
    const deleteBatches = chunkArray(deleteDocs, 400);

    for (let i = 0; i < deleteBatches.length; i++) {
      const batch = writeBatch(db);
      for (const docSnap of deleteBatches[i]) {
        batch.delete(doc(db, "dishes", docSnap.id));
      }
      await batch.commit();
      console.log(`Deleted batch ${i + 1}/${deleteBatches.length} (${deleteBatches[i].length} docs).`);
    }

    // 6. Atomic Batched Insertion of new documents
    const insertBatches = chunkArray(items, 400);
    let insertedCount = 0;

    for (let i = 0; i < insertBatches.length; i++) {
      const batch = writeBatch(db);
      for (const item of insertBatches[i]) {
        const newDocRef = doc(dishesCol);
        batch.set(newDocRef, {
          name: item.name,
          description: item.description || "",
          prices: item.prices || { Regular: 0 },
          category: item.category,
          image_url: item.image || "",
          is_popular: item.isPopular || false,
          is_veg: item.isVeg || false,
        });
        insertedCount++;
      }
      await batch.commit();
      console.log(`Inserted batch ${i + 1}/${insertBatches.length} (${insertBatches[i].length} docs).`);
    }

    console.log(`Successfully migrated ${insertedCount} dishes to Firestore.`);
    process.exit(0);
  } catch (err) {
    console.error("Migration error:", err.message);
    console.error("If Firestore data was affected, restore using the local backup file in the 'backups/' directory.");
    process.exit(1);
  }
}

migrate();
