# Sampradaya Multicuisine Family Restaurant

[![Next.js](https://img.shields.io/badge/Next.js-16.3.1-black?style=flat&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2.8-blue?style=flat&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.x-38B2AC?style=flat&logo=tailwind-css)](https://tailwindcss.com/)
[![Clerk](https://img.shields.io/badge/Auth-Clerk-6C47FF?style=flat&logo=clerk)](https://clerk.com/)
[![Firebase](https://img.shields.io/badge/Database-Firestore-FFCA28?style=flat&logo=firebase)](https://firebase.google.com/)
[![Vercel](https://img.shields.io/badge/Deploy-Vercel-black?style=flat&logo=vercel)](https://sampradaya-multicuisine-family-rest.vercel.app/)

A high-performance, full-stack digital web experience engineered with Next.js, React, Tailwind CSS, TypeScript, Zustand, Firebase, and Clerk for Sampradaya Multicuisine Family Restaurant.

This workspace is part of the [restaurant-ecosystem](https://github.com/KatkamKoushik/restaurant-ecosystem) monorepo under the package name `@restaurant-ecosystem/sampradaya`.

---

## Live Demonstration

The production deployment is hosted on Vercel:
[https://sampradaya-multicuisine-family-rest.vercel.app/](https://sampradaya-multicuisine-family-rest.vercel.app/)

---

## Project Background

My co-developer Vyshnavi Nagavelli and I originally built this complete web platform specifically for Sampradaya Multicuisine Family Restaurant, a premier dining establishment located on the 4th floor at Kaloji Marg, Balasamudram, Hanamkonda. 

Our goal was to solve real operational bottlenecks for the restaurant: eliminating third-party aggregator commissions, providing a friction-free WhatsApp ordering and table reservation pipeline, offering digital access to both their physical menu cards and an interactive itemized menu, and giving management a complete administrative portal for real-time menu management.

We presented the finished, production-ready product to the restaurant owner. However, the owner ultimately refused to purchase and deploy the platform.

Rather than shelving weeks of meticulous engineering, design craft, and domain-specific optimizations, we decided to preserve and maintain the entire project as a live portfolio showcase. It stands as a comprehensive proof-of-concept demonstrating our ability to deliver production-grade, commercial web software for the hospitality industry. This is why the showcase notice is displayed prominently at the top of the website:
*"CURRENTLY AVAILABLE FOR SHOWCASE PURPOSES. A CUSTOM WEB EXPERIENCE BUILT BY KOUSHIK & VYSHNAVI."*

---

## Authors and Engineering Credits

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

## Core Architecture and Features

### 1. Luxury Visual Identity and Immersive Media
- Curated Typography: Built with Google Fonts loaded through `next/font/google`, pairing Playfair Display and Cinzel for heritage serif headlines with Inter and Montserrat for clean, modern legibility.
- Custom Palette: Designed around an Indian fine-dining aesthetic using deep ivory (`#FAFAF9`), rich crimson (`#7F1D1D`), warm gold (`#D97706`), and charcoal accents (`#1C1917`).
- Ambient Video Loops: High-definition particle video backdrops seamlessly looped on the showcase header and developer contact footer with subtle dark gradient overlays.
- Inertial Scrolling: Powered by Lenis for smooth, physics-based scrolling throughout the user journey.
- Framer Motion Micro-Interactions: Scroll-triggered entrance animations, staggered grid revelations, and an infinite horizontal marquee displaying the restaurant interior.
- Cross-Restaurant Switcher: Quick navigation to all sister restaurants in the ecosystem via the `@restaurant-ecosystem/ui` module.

### 2. Digital Menu and Instant Search
- Categorized Catalog: Covers more than 100 authentic dishes across Biryanis, Tandoori Starters, Seafood, Non-Veg Curries, Indian Breads, Rice and Noodles, Salads, and Desserts.
- Dietary Indicators: Distinct visual identifiers for Vegetarian and Non-Vegetarian items conforming to Indian culinary standards.
- Real-Time Search: Instant client-side text filtering allowing customers to find specific preparations in milliseconds.
- Responsive Card Grids: Optimized layouts with lazy-loaded dish imagery and quick-add actions.

### 3. Frictionless WhatsApp Ordering Engine
- Zustand Store: Persistent client-side cart management stored in localStorage under the `sampradaya-cart` namespace.
- Live Cart Drawer: Slide-over drawer with item increment, decrement, removal, itemized subtotal calculations, and order preview.
- Direct WhatsApp Checkout: Formats the entire cart contents into a clean, itemized invoice with totals and opens WhatsApp directly addressed to the restaurant's operational number (`+91 63035 63242`). This bypasses third-party delivery commissions completely.

### 4. Table Reservation Flow
- Interactive Booking: Allows guests to select their dining date, preferred time window, and party size.
- Automated Messaging: Encodes the reservation parameters into a structured confirmation inquiry and opens direct chat with the reception desk.

### 5. High-Resolution Physical Menu Viewer
- Authentic Scanned Menu: A dedicated route (`/physical-menu`) displaying high-resolution digital scans of the printed dining cards.
- Interactive Lightbox: Click-to-zoom modal with spring animations and backdrop blur, allowing guests to inspect fine print with ease on mobile or desktop.

### 6. Administrative Dashboard and Cloud Infrastructure
- Route Protection: Built with Clerk authentication covering private `/admin` routes via Next.js route proxies (`src/proxy.ts`), accompanied by an automatic development fallback mode for local evaluation.
- Real-Time Menu CRUD: Integrated with Firebase Cloud Firestore for managing dishes, categories, pricing, and availability dynamically.
- Media Pipeline: Cloudinary signed image upload integration with automatic fallback simulation when local credentials are absent.

---

## Technology Stack

| Layer | Technologies |
| :--- | :--- |
| Framework | Next.js 16.3.1 (App Router, Turbopack) |
| Runtime & Language | React 19.2.8, TypeScript 5.x |
| Styling | Tailwind CSS v4, Custom CSS Variables |
| Animation & Motion | Framer Motion, Lenis Smooth Scroll |
| State Management | Zustand with LocalStorage Persistence |
| Icons | Lucide React |
| Authentication | Clerk (`@clerk/nextjs`) via route proxies (`src/proxy.ts`) |
| Cloud Database | Google Cloud Firestore (Firebase SDK) |
| Media Storage | Cloudinary API |
| Package Manager | pnpm 10.x |

---

## Directory Structure

```text
apps/sampradaya/
├── public/
│   ├── ambiance/              # Showcase and footer background video files
│   ├── ambience/              # Interior photography and ambient imagery
│   ├── brand/                 # Brand patterns and logos
│   ├── dishes/                # Categorized dish photography
│   └── menu/                  # High-resolution physical menu scans
├── src/
│   ├── app/
│   │   ├── admin/             # Management portal with Clerk auth and Firestore CRUD
│   │   ├── menu/              # Interactive digital ordering catalog
│   │   ├── physical-menu/     # Scanned menu card lightbox viewer
│   │   ├── globals.css        # Tailwind v4 theme configuration and font tokens
│   │   ├── layout.tsx         # Root layout with top banner, fonts, and hydration suppression
│   │   └── page.tsx           # Primary landing page with all sections and developer footer
│   ├── components/
│   │   ├── admin/             # Menu item creation and editing forms
│   │   ├── CartDrawer.tsx     # Slide-over cart interface
│   │   ├── CustomLoadingScreen.tsx # Animated entrance loader
│   │   ├── Footer.tsx         # Restaurant information and hours footer
│   │   ├── LenisProvider.tsx  # Smooth scrolling wrapper
│   │   └── Navbar.tsx         # Responsive glassmorphism navigation
│   ├── lib/
│   │   ├── cloudinary.ts      # Cloudinary upload handler with mock fallback
│   │   └── firebase.ts        # Firebase Firestore client initialization
│   ├── store/
│   │   └── cart.ts            # Zustand persistent cart store
│   ├── proxy.ts               # Next.js route protection and static media matcher
│   └── utils/                 # General helper utilities
├── next.config.ts             # Next.js configuration and production security headers
├── package.json               # Workspace package configuration (@restaurant-ecosystem/sampradaya)
└── vercel.json                # Standalone Vercel deployment configuration
```

---

## Local Development Setup

This workspace is part of the `restaurant-ecosystem` monorepo.

### 1. Monorepo Installation
```bash
git clone https://github.com/KatkamKoushik/restaurant-ecosystem.git
cd restaurant-ecosystem
pnpm install
```

### 2. Configure Environment Variables
Copy `.env.example` in this directory to `.env.local`:
```bash
cp apps/sampradaya/.env.example apps/sampradaya/.env.local
```

Populate the required credentials:
```env
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key

# Firebase Firestore
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# Cloudinary
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=your_preset
```
*Note: The project includes built-in mock and fallback modes. You can run and inspect the entire application without configuring real API keys.*

### 3. Run Development Server
From the monorepo root:
```bash
pnpm --filter @restaurant-ecosystem/sampradaya dev
```

Alternatively, from within this directory:
```bash
cd apps/sampradaya
pnpm dev
```

Open `http://localhost:3000` in your web browser.

### 4. Build and Validate
```bash
# Typecheck
pnpm --filter @restaurant-ecosystem/sampradaya typecheck

# Lint
pnpm --filter @restaurant-ecosystem/sampradaya lint

# Build
pnpm --filter @restaurant-ecosystem/sampradaya build
```

---

## License

This project is maintained for demonstration and showcase purposes. Code is licensed under the [MIT License](https://github.com/KatkamKoushik/restaurant-ecosystem/blob/main/LICENSE).
