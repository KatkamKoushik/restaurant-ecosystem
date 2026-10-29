# Aroma Fine Dine Restaurant and Banquet Hall

[![Next.js](https://img.shields.io/badge/Next.js-16.2.9-black?style=flat&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2.4-blue?style=flat&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.19-38B2AC?style=flat&logo=tailwind-css)](https://tailwindcss.com/)
[![Clerk](https://img.shields.io/badge/Auth-Clerk-6C47FF?style=flat&logo=clerk)](https://clerk.com/)
[![Firebase](https://img.shields.io/badge/Database-Firestore-FFCA28?style=flat&logo=firebase)](https://firebase.google.com/)
[![Vercel](https://img.shields.io/badge/Deploy-Vercel-black?style=flat&logo=vercel)](https://aroma-fine-dine-restaurant-banquet.vercel.app/)

A complete, production-grade web application and dining management platform engineered for Aroma Fine Dine Restaurant and Banquet Hall, a premier dining establishment located in Hanamkonda, Warangal.

This workspace is part of the [restaurant-ecosystem](https://github.com/KatkamKoushik/restaurant-ecosystem) monorepo under the package name `@restaurant-ecosystem/aroma`.

---

## Live Demonstration

The production deployment is hosted on Vercel:
[https://aroma-fine-dine-restaurant-banquet.vercel.app/](https://aroma-fine-dine-restaurant-banquet.vercel.app/)

---

## Background and Project Origin

I initially engineered and designed this entire website as a bespoke commercial software product intended for acquisition by the restaurant management. I conducted field research, analyzed their physical menu cards, photographed their interior ambience, organized their culinary catalog, and developed a complete digital ordering and reservation platform with an administrative content management system.

When I presented the completed product, the restaurant owner refused to purchase it.

Instead of discarding months of intensive design and engineering work, my co-developer Vyshnavi Nagavelli and I decided to retain the application, complete all advanced features, and deploy it as a live showcase of our full-stack engineering capabilities. This is why you see the showcase disclaimer banner across the top of the application stating:
*"CURRENTLY AVAILABLE FOR SHOWCASE PURPOSES. A CUSTOM WEB EXPERIENCE BUILT BY KOUSHIK & VYSHNAVI."*

Today, this application serves as an active demonstration of how modern web technologies, luxury visual aesthetics, and practical business workflows come together in a real-world restaurant application.

---

## Core System Capabilities

I engineered this project with a customer-facing storefront, a digital menu viewer, automated communication dispatchers, and an administrative dashboard.

### 1. Luxury Visual Experience and Motion Design
- Obsidian and Gold Aesthetic: The UI is themed with deep blacks (`#0B0B0C`), rich warm charcoals (`#161618`), and imperial gold accents (`#DFB15B`, `#C5A059`) reflecting luxury and fine dining.
- Custom Brand Splash Screen: Upon first visit, a custom loading screen renders an ambient radial glow and animated logo reveal before fading smoothly into the main application.
- Optimized Smooth Scrolling: Powered by Lenis, calibrated to a 0.8-second easing duration and 1.2x wheel multiplier for fluid navigation.
- Looping Ambient Video Backdrops: The top showcase banner and footer feature compressed, looping atmospheric particle animations layered beneath semi-transparent darkened overlays.
- Sister Restaurant Switcher: Seamless cross-navigation across the entire culinary group via the `@restaurant-ecosystem/ui` ecosystem switcher.

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
- Authentication: Clerk (`@clerk/nextjs`) securing the administrative interface via route proxies (`src/proxy.ts`)
- Deployment: Vercel edge infrastructure

---

## Directory Structure

```text
apps/aroma/
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
├── next.config.ts          # Next.js compiler settings and production security headers
├── package.json            # Workspace package configuration (@restaurant-ecosystem/aroma)
├── tailwind.config.js      # Custom theme color mappings, fonts, and container rules
└── vercel.json             # Standalone Vercel deployment configuration
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

This application is part of the `restaurant-ecosystem` monorepo.

### 1. Monorepo Installation
```bash
git clone https://github.com/KatkamKoushik/restaurant-ecosystem.git
cd restaurant-ecosystem
pnpm install
```

### 2. Configure Environment Variables
Copy `.env.example` in this directory to `.env.local`:
```bash
cp apps/aroma/.env.example apps/aroma/.env.local
```

Populate the required credentials:
```env
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...

# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSy...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-app.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-app.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=...
NEXT_PUBLIC_FIREBASE_APP_ID=...

# Cloudinary Media
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=your_upload_preset
```

### 3. Run Development Server
From the monorepo root:
```bash
pnpm --filter @restaurant-ecosystem/aroma dev
```

Alternatively, from within this directory:
```bash
cd apps/aroma
pnpm dev
```

Open `http://localhost:3000` in your web browser.

### 4. Build and Validate
```bash
# Typecheck
pnpm --filter @restaurant-ecosystem/aroma typecheck

# Lint
pnpm --filter @restaurant-ecosystem/aroma lint

# Build
pnpm --filter @restaurant-ecosystem/aroma build
```

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

This project is maintained for showcase and portfolio evaluation purposes. Code is licensed under the [MIT License](https://github.com/KatkamKoushik/restaurant-ecosystem/blob/main/LICENSE).
