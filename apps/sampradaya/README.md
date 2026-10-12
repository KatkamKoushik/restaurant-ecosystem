# Sampradaya Multicuisine Family Restaurant

A high-performance, full-stack digital web experience engineered with Next.js, React, Tailwind CSS, TypeScript, Zustand, Firebase, and Clerk.

---

## Project Background

My co-developer Vyshnavi Nagavelli and I originally built this complete web platform specifically for Sampradaya Multicuisine Family Restaurant, a premier dining establishment located on the 4th floor at Kaloji Marg, Balasamudram, Hanamkonda. 

Our goal was to solve real operational bottlenecks for the restaurant: eliminating third-party aggregator commissions, providing a friction-free WhatsApp ordering and table reservation pipeline, offering digital access to both their physical menu cards and an interactive itemized menu, and giving management a complete administrative portal for real-time menu management.

We presented the finished, production-ready product to the restaurant owner. However, the owner ultimately refused to purchase and deploy the platform.

Rather than shelving weeks of meticulous engineering, design craft, and domain-specific optimizations, we decided to preserve and maintain the entire project as a live portfolio showcase. It stands as a comprehensive proof-of-concept demonstrating our ability to deliver production-grade, commercial web software for the hospitality industry. This is why the showcase notice is displayed prominently at the top of the website.

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
- Curated Typography: Built with Google Fonts loaded through next/font/google, pairing Playfair Display and Cinzel for heritage serif headlines with Inter and Montserrat for clean, modern legibility.
- Custom Palette: Designed around an Indian fine-dining aesthetic using deep ivory (#FAFAF9), rich crimson (#7F1D1D), warm gold (#D97706), and charcoal accents (#1C1917).
- Ambient Video Loops: High-definition particle video backdrops seamlessly looped on the showcase header and developer contact footer with subtle dark gradient overlays.
- Inertial Scrolling: Powered by Lenis for smooth, physics-based scrolling throughout the user journey.
- Framer Motion Micro-Interactions: Scroll-triggered entrance animations, staggered grid revelations, and an infinite horizontal marquee displaying the restaurant interior.

### 2. Digital Menu and Instant Search
- Categorized Catalog: Covers more than 100 authentic dishes across Biryanis, Tandoori Starters, Seafood, Non-Veg Curries, Indian Breads, Rice and Noodles, Salads, and Desserts.
- Dietary Indicators: Distinct visual identifiers for Vegetarian and Non-Vegetarian items conforming to Indian culinary standards.
- Real-Time Search: Instant client-side text filtering allowing customers to find specific preparations in milliseconds.
- Responsive Card Grids: Optimized layouts with lazy-loaded dish imagery and quick-add actions.

### 3. Frictionless WhatsApp Ordering Engine
- Zustand Store: Persistent client-side cart management stored in localStorage under the sampradaya-cart namespace.
- Live Cart Drawer: Slide-over drawer with item increment, decrement, removal, itemized subtotal calculations, and order preview.
- Direct WhatsApp Checkout: Formats the entire cart contents into a clean, itemized invoice with totals and opens WhatsApp directly addressed to the restaurant's operational number (+91 63035 63242). This bypasses third-party delivery commissions completely.

### 4. Table Reservation Flow
- Interactive Booking: Allows guests to select their dining date, preferred time window, and party size.
- Automated Messaging: Encodes the reservation parameters into a structured confirmation inquiry and opens direct chat with the reception desk.

### 5. High-Resolution Physical Menu Viewer
- Authentic Scanned Menu: A dedicated route (/physical-menu) displaying high-resolution digital scans of the printed dining cards.
- Interactive Lightbox: Click-to-zoom modal with spring animations and backdrop blur, allowing guests to inspect fine print with ease on mobile or desktop.

### 6. Administrative Dashboard and Cloud Infrastructure
- Route Protection: Built with Clerk authentication covering private /admin routes, accompanied by an automatic development fallback mode for local evaluation.
- Real-Time Menu CRUD: Integrated with Firebase Cloud Firestore for managing dishes, categories, pricing, and availability dynamically.
- Media Pipeline: Cloudinary signed image upload integration with automatic fallback simulation when local credentials are absent.

---

## Technology Stack

| Layer | Technologies |
|---|---|
| Framework | Next.js 16 (App Router, Turbopack) |
| Runtime & Language | React 19, TypeScript |
| Styling | Tailwind CSS v4, Custom CSS Variables |
| Animation & Motion | Framer Motion, Lenis Smooth Scroll |
| State Management | Zustand with LocalStorage Persistence |
| Icons | Lucide React |
| Authentication | Clerk (@clerk/nextjs) |
| Cloud Database | Google Firebase / Cloud Firestore |
| Media Storage | Cloudinary API |
| Package Manager | pnpm |

---

## Directory Structure

```
Sampradaya/
|-- public/
|   |-- ambiance/              # Showcase and footer background video files
|   |-- ambience/              # Interior photography and ambient imagery
|   |-- brand/                 # Brand patterns and logos
|   |-- dishes/                # Categorized dish photography
|   `-- menu/                  # High-resolution physical menu scans
|-- src/
|   |-- app/
|   |   |-- admin/             # Management portal with Clerk auth and Firestore CRUD
|   |   |-- menu/              # Interactive digital ordering catalog
|   |   |-- physical-menu/     # Scanned menu card lightbox viewer
|   |   |-- globals.css        # Tailwind v4 theme configuration and font tokens
|   |   |-- layout.tsx         # Root layout with top banner, fonts, and hydration suppression
|   |   `-- page.tsx           # Primary landing page with all sections and developer footer
|   |-- components/
|   |   |-- admin/             # Menu item creation and editing forms
|   |   |-- CartDrawer.tsx     # Slide-over cart interface
|   |   |-- CustomLoadingScreen.tsx # Animated entrance loader
|   |   |-- Footer.tsx         # Restaurant information and hours footer
|   |   |-- LenisProvider.tsx  # Smooth scrolling wrapper
|   |   `-- Navbar.tsx         # Responsive glassmorphism navigation
|   |-- lib/
|   |   |-- cloudinary.ts      # Cloudinary upload handler with mock fallback
|   |   `-- firebase.ts        # Firebase Firestore client initialization
|   |-- store/
|   |   `-- cart.ts            # Zustand persistent cart store
|   `-- utils/                 # General helper utilities
|-- package.json
|-- tsconfig.json
`-- README.md
```

---

## Local Development Setup

### Prerequisites
- Node.js 20 or later
- pnpm (recommended) or npm

### Installation Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/KatkamKoushik/Sampradaya-Multicuisine-Family-Restaurant.git
   cd Sampradaya-Multicuisine-Family-Restaurant
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Configure Environment Variables (Optional for full cloud features):
   Create a `.env.local` file in the project root:
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
   Note: The project includes built-in mock and fallback modes. You can run and inspect the entire application without configuring real API keys.

4. Start the development server:
   ```bash
   pnpm dev
   ```

5. Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

---

## Production Build Verification

To verify that the production bundle compiles with zero errors or warnings:

```bash
pnpm build
```

This compiles all static routes, validates TypeScript types, and produces optimized production output for deployment.
