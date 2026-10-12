# Mandiwala Arabian Restaurant

I designed and engineered this platform as a complete, production-grade web application and restaurant management system for Mandiwala Arabian Restaurant, a premier dining establishment in Hanamkonda, Warangal.

---

## Project Origin and Background

I initially developed this application as a commercial client project intended for sale to the restaurant owner. I spent considerable time studying their menu offerings, analyzing their dining operations, structuring their culinary catalog, and building an end-to-end digital experience. This included dynamic online ordering, private Majlis cabin reservations, an interactive menu viewer, and an administrative dashboard for real-time order and reservation tracking.

When I presented the completed platform to the restaurant owner, they declined to purchase it.

Rather than letting this extensive engineering and design effort go unused, my co-developer Vyshnavi Nagavelli and I chose to retain the codebase, complete the architecture, and publish it as a live showcase of our full-stack capabilities. This context explains the disclaimer banner visible at the very top of the website:

"CURRENTLY AVAILABLE FOR SHOWCASE PURPOSES. A CUSTOM WEB EXPERIENCE BUILT BY KOUSHIK & VYSHNAVI."

Today, this repository serves as a live, open-source portfolio demonstration showing how modern web technologies, bespoke luxury aesthetics, and real-world restaurant workflows come together into a coherent digital product.

---

## Architectural Overview

The application is structured into four primary layers:
1. Customer Storefront: An Arabian-themed landing page with smooth animations, storytelling, ambience showcases, and customer reviews.
2. Digital Menu and Ordering Engine: An interactive catalog with search, dietary filtering, portion sizing, and WhatsApp order dispatch.
3. Dine-In Digital Menu Viewer: A high-fidelity physical menu viewer designed for in-restaurant QR code scanning.
4. Administrative Management System: A protected dashboard for managing reservations, table statuses, and live menu items.

---

## Key System Features

### 1. Luxury Visual Identity and Motion Design
- Obsidian and Royal Gold Theme: The palette utilizes deep obsidian blacks (#0B0C10), dark charcoals (#14161D), warm bronzes (#1A1714), and royal gold tones (#D4AF37, #F5E08B, #C5A059) to evoke traditional Arabian luxury.
- Animated Brand Preloader: Features an animated Arabic geometric pattern, pulsating brand emblem, and smooth cubic-bezier curtain reveal.
- Ambient Looping Video Banners: Embedded video backgrounds for both the top showcase banner and developer footer.
- Lenis Smooth Scrolling: Inertia-based scrolling integrated across all pages with automated scroll-locking during preloader sequences.
- Responsive Navigation: A sticky glassmorphism navigation bar with scroll detection, mobile navigation drawer, and live cart counter badge.

### 2. Multi-Portion Menu and Ordering System
- Real-Time Firestore Synchronization: Menu items are fetched directly from Firebase Firestore with instant state propagation.
- Portion-Based Pricing Engine: Supports Single, Half, Tri, Family, and Fixed portions tailored specifically to Arabian Mandi dining conventions.
- Modal Size Selector: Dynamic portion selector modal that computes item prices before adding them to the cart.
- Category Navigation and Search: Real-time search across dish titles and descriptions, category tabs (Chicken, Mutton, Egg, Paneer, Seafood, Add-on, Dessert), and vegetarian-only toggles.

### 3. Zustand Cart and WhatsApp Order Dispatch
- Persistent State: Managed using Zustand for lightweight and reliable state updates without page re-renders.
- Slide-Over Cart Drawer: Smooth Framer Motion drawer displaying selected portions, unit prices, subtotal, and tax calculations.
- Automatic Tax Computation: Computes a 5% GST on the subtotal.
- Delivery vs. Pickup Workflow: Customers choose between Home Delivery and Pickup. Delivery orders capture house number, street, landmark, and pincode.
- Automated WhatsApp Dispatch: Formats the entire order into an itemized receipt and dispatches it directly to Mandiwala's official WhatsApp number (+91 85003 71100).

### 4. Table and Majlis Reservation System
- Private Cabin Booking: Customers can reserve seating tailored for couples, small groups, or private Family Majlis cabins.
- Firestore Ingestion: Captures guest name, mobile number, date, time, party size, and special requests directly into the reservations collection.
- Status Workflow: Bookings enter as pending and are tracked through confirmation or decline in the admin dashboard.

### 5. Physical QR Menu Viewer
- Direct In-Store Access: Accessible at /physical-menu for customers scanning table QR codes.
- High-Resolution Scans: Displays the restaurant's complete printed menu card pages in clean, high-resolution format with optimized responsive image loading.

### 6. Administrative Dashboard and Content Management
- Clerk Authentication: Protected dashboard routes ensuring only authorized restaurant staff have access.
- Live Reservation Management: Real-time table tracking displaying Total Reservations, Today's Bookings, and Pending Actions.
- Table Actions: One-click acceptance or decline updating the Firestore database in real time.
- Menu CMS (/admin/menu): Interface to create, modify, and delete dishes, adjust multi-portion price tiers, and toggle best-seller badges.
- Cloudinary Asset Pipeline: Direct image uploads via Cloudinary with cryptographic signatures generated through a server-side Next.js route handler.

---

## Technical Stack

| Layer | Technology | Purpose |
|---|---|---|
| Frontend Framework | Next.js 16 (App Router, Turbopack) | Server components, client interactivity, static generation |
| Runtime / UI Library | React 19 | Component architecture and state lifecycle |
| Programming Language | TypeScript 5 | End-to-end type safety and schema validation |
| Styling | Tailwind CSS v4 | Utility-first styling with custom theme tokens |
| Motion and Animation | Framer Motion v13 | Layout transitions, modals, drawers, and fade effects |
| Smooth Scrolling | Lenis | Inertial scrolling engine with programmatic scroll locking |
| State Management | Zustand v5 | Client-side cart state and drawer visibility management |
| Authentication | Clerk (@clerk/nextjs v7) | Administrative authentication and session management |
| Database | Google Cloud Firebase Firestore v12 | Real-time document storage for menus and reservations |
| Media Storage | Cloudinary & Next-Cloudinary | Cloud asset storage, transformations, and signed uploads |
| Icons | Lucide React | Clean, scalable icon system |

---

## Project Structure

```
mandiwala/
├── public/
│   ├── ambiance/                  Looped background videos (gold particles, footer particles)
│   ├── brand/                     Restaurant logo and brand assets
│   ├── dish/                      Culinary photography and meal setup imagery
│   └── menu/                      High-resolution physical menu scans
├── src/
│   ├── app/
│   │   ├── admin/
│   │   │   ├── menu/page.tsx      Admin menu CMS with dish creator and Cloudinary uploads
│   │   │   └── page.tsx           Admin dashboard for table reservations
│   │   ├── api/
│   │   │   └── cloudinary-sign/   Server-side route handler for Cloudinary signature generation
│   │   ├── menu/page.tsx          Public digital ordering menu with category and dietary filters
│   │   ├── physical-menu/page.tsx QR code physical menu viewer
│   │   ├── globals.css            Tailwind CSS v4 setup with custom color and font tokens
│   │   ├── layout.tsx             Root layout with ClerkProvider, fonts, and showcase top banner
│   │   └── page.tsx               Homepage with hero, story, bestsellers, reviews, and booking
│   ├── components/
│   │   ├── BestSellers.tsx        Bestseller dishes grid with dynamic Firestore query
│   │   ├── CartSidebar.tsx        Zustand-powered slide-over cart with WhatsApp dispatch
│   │   ├── Footer.tsx             Restaurant contact, address, hours, and direction links
│   │   ├── Navbar.tsx             Fixed navigation bar with scroll detection and cart badge
│   │   ├── Preloader.tsx          Arabic geometric pattern preloader with Lenis scroll lock
│   │   ├── SizeSelectorModal.tsx  Portion selection modal for single, half, tri, and family sizes
│   │   └── SmoothScrollProvider.tsx Lenis smooth scroll provider wrapper
│   └── lib/
│       ├── data.ts                TypeScript types and interfaces for MenuItem
│       ├── firebase.ts            Firebase initialization and Firestore database instance
│       ├── hooks/useMenu.ts       Real-time hook for menu fetching and CRUD operations
│       └── store.ts               Zustand store for shopping cart and portion items
├── firestore.rules                Cloud Firestore security rules
├── next.config.ts                 Next.js configuration
├── package.json                   Project dependencies and build scripts
└── tsconfig.json                  TypeScript compiler configuration
```

---

## Data Models

### MenuItem Schema
```typescript
export interface MenuItem {
  id: string;
  name: string;
  category: "Signature" | "Chicken" | "Mutton" | "Egg" | "Paneer" | "Seafood" | "Add-on" | "Dessert";
  description: string;
  image: string;
  isBestSeller?: boolean;
  prices: {
    single?: number;
    half?: number;
    tri?: number;
    family?: number;
    fixed?: number;
  };
}
```

### Reservation Schema
```typescript
export interface Reservation {
  id: string;
  name: string;
  phone: string;
  date: string;
  time: string;
  size: "Single (1-2 pax)" | "Half (2-3 pax)" | "Family / Majlis Room (4-6 pax)" | "Large Group (6+ pax)";
  notes?: string;
  status: "pending" | "confirmed" | "declined";
  createdAt: Timestamp;
}
```

### CartItem Schema
```typescript
export interface CartItem {
  id: string;
  dishId: string;
  name: string;
  size: string;
  price: number;
  quantity: number;
}
```

---

## Getting Started

### Prerequisites
- Node.js 18.18 or higher
- pnpm (recommended), npm, or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/KatkamKoushik/mandiwala-arabian-restaurant.git
cd mandiwala-arabian-restaurant
```

2. Install dependencies:
```bash
pnpm install
```

3. Configure environment variables in `.env.local`:
```env
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key

# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_firebase_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_firebase_app_id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_firebase_measurement_id

# Cloudinary (for menu image uploads)
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
NEXT_PUBLIC_CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

4. Start the development server:
```bash
pnpm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Build and Production

To verify types and generate an optimized production build:

```bash
# Type check
pnpm exec tsc --noEmit

# Production build
pnpm run build

# Start production server
pnpm run start
```

---

## Creators and Credits

This custom web experience was designed and developed by:

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

This project is created and maintained for showcase and demonstration purposes. All rights reserved.
