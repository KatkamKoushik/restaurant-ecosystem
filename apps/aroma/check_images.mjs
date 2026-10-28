import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, limit, query } from 'firebase/firestore';
import * as fs from 'fs/promises';
import { existsSync } from 'fs';

async function run() {
  let envMap = {};
  if (existsSync('.env.local')) {
    const env = await fs.readFile('.env.local', 'utf8');
    envMap = Object.fromEntries(env.split('\n').filter(Boolean).map(l => l.split('=').map(s=>s.trim())));
  }
  
  const apiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY || envMap.NEXT_PUBLIC_FIREBASE_API_KEY;
  const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || envMap.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
  const appId = process.env.NEXT_PUBLIC_FIREBASE_APP_ID || envMap.NEXT_PUBLIC_FIREBASE_APP_ID;

  if (!apiKey || !projectId) {
    console.error("Firebase environment variables are missing. Please configure .env.local");
    return;
  }

  const app = initializeApp({
    apiKey,
    projectId,
    appId
  });
  
  const db = getFirestore(app);
  const q = query(collection(db, 'menuItems'), limit(5));
  const docs = await getDocs(q);
  docs.forEach(d => console.log(d.id, d.data().image_url || d.data().image));
}

run().catch(console.error);
