# Aroma Fine Dine Restaurant and Banquet Hall

I built this platform as a complete, production-grade web application and management system for Aroma Fine Dine Restaurant and Banquet Hall, a premier dining establishment in Hanamkonda, Warangal.

---

## Background and Project Origin

I initially engineered and designed this entire website as a bespoke commercial software product intended for sale to the restaurant owner. I conducted field research, analyzed their physical menu cards, photographed their interior ambience, organized their culinary catalog, and developed a complete digital ordering and reservation platform with an administrative content management system.

When I presented the completed product, the restaurant owner refused to purchase it. 

Instead of discarding months of intensive design and engineering work, my co-developer Vyshnavi Nagavelli and I decided to retain the application, complete all advanced features, and deploy it as a live showcase of our full-stack engineering capabilities. This is why you see the showcase disclaimer banner across the top of the application stating: *"CURRENTLY AVAILABLE FOR SHOWCASE PURPOSES. A CUSTOM WEB EXPERIENCE BUILT BY KOUSHIK & VYSHNAVI."*

Today, this repository serves as a live demonstration of how modern web technologies, luxury visual aesthetics, and practical business workflows come together in a real-world restaurant application.

---

## Core System Capabilities

I engineered this project with a customer-facing storefront, a digital menu viewer, automated communication dispatchers, and an administrative dashboard.

### 1. Luxury Visual Experience and Motion Design
- Obsidian and Gold Aesthetic: The UI is themed with deep blacks (`#0B0B0C`), rich warm charcoals (`#161618`), and imperial gold accents (`#DFB15B`, `#C5A059`) reflecting royalty and fine dining.
- Custom Brand Splash Screen: Upon first visit, a custom loading screen renders an ambient radial glow and animated logo reveal before fading smoothly into the main application.
- Optimized Smooth Scrolling: Powered by Lenis, calibrated to a 0.8-second easing duration and 1.2x wheel multiplier with all conflicting native browser smooth-scroll directives removed for responsive navigation.
- Looping Ambient Video Backdrops: The top showcase banner and footer feature compressed, looping atmospheric particle animations layered beneath semi-transparent darkened overlays.

### 2. Live Interactive Menu and Dietary Filtering
- Dual-Tier Menu Architecture: The application loads fallbacks from a static dataset of over 200 items while asynchronously synchronizing in real time with Google Cloud Firestore.
- Dynamic Portion Pricing: Dishes support multi-tier portioning (such as Regular, Half, Full, and Family Pack), allowing customers to pick portion sizes with instant price updates.
- Real-Time Dietary Toggles: Customers can filter items instantaneously between All, Vegetarian Only, and Non-Vegetarian Only with zero page reload.
- Horizontal Category Carousel: Smooth horizontal navigation through all menu sections including Starters, Soups, Biryanis, Curries, Seafood, and Desserts.

### 3. Smart Ordering Cart and WhatsApp Checkout
- Frictionless Checkout: The ordering system avoids requiring customers to download third-party food delivery apps.
- Automated Bill Computation: Computes item subtotals, portion selections, item counts, and applies a 5% GST tax calculation in real time.
- Delivery vs. Pickup Modes: Captures customer name, phone number, delivery address (flat number, street, landmark, pincode), and special kitchen instructions.
- Automated WhatsApp Dispatch: Formats the entire order into a structured receipt and triggers WhatsApp directly to the restaurant dispatch desk with a single click.

### 4. Table and Banquet Hall Reservation Systems
- Table Reservation Engine: An interactive booking interface capturing full guest details, party size, date, time slot, and occasion (Birthdays, Anniversaries, Corporate Events, Date Nights).
- Banquet Hall Inquiries: Dedicated event showcase presenting hall amenities (centralized air conditioning, royal seating, sound systems, accessibility) along with a direct inquiry dispatcher for large gatherings.
- Birthday Promo Modal: A timed lead capture modal that triggers after five seconds of browsing, offering guests a 10% birthday discount code sent via WhatsApp.

### 5. High-Resolution Digital Menu Book
- Physical Menu Viewer: Located at `/physical-menu` and `/menu`, providing high-resolution scans of the physical printed menu cards.
- Interactive Lightbox: Includes keyboard navigation (Arrow Left, Arrow Right, Escape key), mouse controls, full-screen zoom, and thumbnail previews for patrons who prefer reading traditional laminated menu layouts.

### 6. Administrative Dashboard and CMS
- Protected Management Route: Accessible at `/admin`, protected via Clerk Authentication.
- Live Firestore CRUD: Allows staff to add new dishes, update names, rewrite descriptions, set portion prices, and delete discontinued items.
- Direct Cloudinary Uploads: Integrated with the Cloudinary Upload Widget, allowing staff to upload food photographs directly from their phone or desktop and save the optimized CDN URL to the database.
- Category Filter Management: Real-time filtering within the admin console to update specific categories without cluttering the screen.

---

## Architecture and Technical Stack

I selected this stack to balance high rendering performance, SEO optimization, and effortless content management:

### Frontend
- Framework: Next.js 16.2.9 (App Router with Turbopack and React 19)
- Language: TypeScript with strict typing
- Styling: Tailwind CSS (Custom theme extending obsidian, imperial gold, and amber palettes)
- Fonts: Google Fonts via `next/font/google` (`Cinzel` for headings and luxury titles, `Montserrat` for UI labels, `Playfair Display` for editorial quotes, and `Inter` for body text)
- Animation: Framer Motion (orchestrated layout transitions, spring physics on drawers, modals, and hover states)
- Smooth Scroll: `@studio-freight/react-lenis`
- State Management: Zustand and React State Hooks for cart persistence and reactive filtering

### Backend and Cloud Infrastructure
- Database: Google Cloud Firestore (Firebase Web SDK v12) for dynamic dish storage, banquet highlights, and menu syncing
- Media Storage: Cloudinary for fast dish image hosting and edge delivery
- Authentication: Clerk (`@clerk/nextjs`) securing the administrative interface
- Deployment: Vercel edge infrastructure

---

## Directory Structure

```
aroma-fine-dine-and-banquet-hall/
├── public/
│   ├── ambiance/           # Looping background videos (gold-particles.mp4, footer-particles.mp4)
│   ├── ambience/           # High-resolution restaurant interior and exterior photography
│   ├── brand/              # Logo files and brand assets
│   └── menu/               # Scanned physical menu pages (menu1.webp to menu6.webp)
├── src/
│   ├── app/
│   │   ├── admin/          # Clerk-authenticated Firestore menu management dashboard
│   │   ├── api/debug/      # Diagnostic endpoint for database and image checks
│   │   ├── menu/           # Physical menu interactive viewer route
│   │   ├── physical-menu/  # Alternate canonical route for physical menu scans
│   │   ├── globals.css     # Tailwind layers, font classes, and custom scrollbar styling
│   │   ├── layout.tsx      # Root layout with fonts, ClerkProvider, LoadingScreen, and Top Video Banner
│   │   └── page.tsx        # Server entry point injecting initial menu items to client
│   ├── components/
│   │   ├── HomePageClient.tsx       # Main page coordinator with menu, hero, and developer footer
│   │   ├── LoadingScreen.tsx        # Branded full-screen intro splash screen
│   │   ├── SmoothScrollProvider.tsx # Lenis smooth scroll provider
│   │   ├── layout/
│   │   │   ├── Navbar.tsx           # Sticky navigation bar with mobile drawer and cart badge
│   │   │   └── CartDrawer.tsx       # Slide-out checkout drawer with WhatsApp dispatch
│   │   ├── sections/
│   │   │   ├── AmbienceGallery.tsx          # Masonry image gallery of dining halls and private areas
│   │   │   ├── AromaHero.tsx                # Auto-cycling full-bleed hero carousel
│   │   │   ├── BanquetHallSection.tsx       # Banquet amenities, capacity specs, and featured dishes
│   │   │   ├── CompleteDiningExperience.tsx # Luxury lifestyle and culinary philosophy section
│   │   │   ├── FeaturesSection.tsx          # Key value propositions (hygiene, flavor, private dining)
│   │   │   ├── MenuGrid.tsx                 # Category tabs, dietary filters, and dish grid
│   │   │   ├── MenuHighlights.tsx           # Chef recommendations and signature picks
│   │   │   ├── TableReservation.tsx         # Reservation booking form
│   │   │   └── TestimonialsSection.tsx      # Customer dining reviews and ratings
│   │   └── ui/
│   │       ├── BirthdayPromoModal.tsx # Lead generation modal with WhatsApp claim
│   │       ├── MagneticButton.tsx     # Micro-interactive magnetic hover button
│   │       ├── MenuCard.tsx           # Dish card with portion selector and add-to-cart buttons
│   │       └── OptimizedImage.tsx     # Enhanced Next.js image wrapper with skeleton loaders
│   ├── data/
│   │   └── menu.ts         # Static baseline menu database containing over 200 categorized dishes
│   ├── lib/
│   │   └── firebase.ts     # Firebase app initialization and Firestore client export
│   ├── store/
│   │   └── useCartStore.ts # Zustand global cart store with quantity and portion modifiers
│   └── types/
│       └── index.ts        # TypeScript definitions for MenuItem, CartItem, and Portion models
├── upload_to_cloudinary.js # Automation script for bulk uploading local food photos to Cloudinary
├── upload_to_firebase.js   # Script to seed Firestore from local JSON and media records
├── uploadAndSeed.mjs       # End-to-end migration pipeline from raw assets to Firestore
└── tailwind.config.js      # Custom theme color mappings, fonts, and container rules
```

---

## Data Models

### MenuItem
```typescript
export interface MenuItem {
  id: string;
  name: string;
  category: string;
  prices: Record<string, number>; // e.g. { "Regular": 280, "Half": 180, "Full": 340 }
  image: string;
  isVeg: boolean;
  description?: string | null;
}
```

### CartItem
```typescript
export interface CartItem extends MenuItem {
  qty: number;
  selectedPortion: string;
}
```

---

## Local Development Setup

If you want to run this application on your local machine, follow these steps:

### 1. Clone the Repository
```bash
git clone https://github.com/KatkamKoushik/aroma-fine-dine-and-banquet-hall.git
cd aroma-fine-dine-and-banquet-hall
```

### 2. Install Dependencies
```bash
pnpm install
# or: npm install / yarn install
```

### 3. Set Up Environment Variables
Create a file named `.env.local` in the project root and add your configuration credentials:

```env
# Clerk Authentication (Required for /admin dashboard)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...

# Firebase Configuration (Required for Firestore real-time menu sync)
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSy...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-app.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-app.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=...
NEXT_PUBLIC_FIREBASE_APP_ID=...

# Cloudinary (Required for image upload widget in /admin)
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=your_upload_preset
```

### 4. Start the Development Server
```bash
pnpm run dev
```

Open `http://localhost:3000` in your web browser.

### 5. Build for Production
To verify type safety and produce an optimized production build:
```bash
pnpm run build
```

---

## Utility Scripts

I included several data engineering and migration scripts in the root directory:

- `uploadAndSeed.mjs`: Reads menu items, batches uploads of local images to Cloudinary, maps returned secure URLs to their respective items, and populates the `menuItems` collection in Google Cloud Firestore.
- `upload_to_cloudinary.js`: Handles standalone image batching to Cloudinary with automatic retry logic and rate-limit mitigation.
- `upload_to_firebase.js`: Direct seeding script using the Firebase Admin SDK to push items into Firestore.
- `check_images.mjs` and `checkMissing.ts`: Health-check utilities to verify that all dishes have valid image references and flagged missing photos.

---

## Creators and Credits

I designed and engineered this web experience together with my co-developer:

- Koushik Katkam
  - Email: koushikkatkam@gmail.com
  - GitHub: https://github.com/KatkamKoushik
  - LinkedIn: https://linkedin.com/in/koushik-katkam
  - Instagram: https://instagram.com/koushik_katkam

- Vyshnavi Nagavelli
  - Email: nagavellivyshnavi3@gmail.com
  - GitHub: https://github.com/nagavellivyshnavi
  - LinkedIn: https://linkedin.com/in/vyshnavi-nagavelli-135465355/

---

## License

This project is maintained for showcase and portfolio evaluation purposes. All restaurant branding, menu assets, and imagery are property of their respective owners. Code is available under the MIT License.
