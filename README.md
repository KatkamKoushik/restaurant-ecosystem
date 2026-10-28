# Restaurant Ecosystem Monorepo

[![Next.js 16](https://img.shields.io/badge/Next.js-16-black?logo=next.js&logoColor=white)](https://nextjs.org/)
[![TypeScript 5](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Turborepo](https://img.shields.io/badge/Turborepo-2-EF4444?logo=turborepo&logoColor=white)](https://turbo.build/repo)
[![pnpm Workspaces](https://img.shields.io/badge/pnpm-12-F69220?logo=pnpm&logoColor=white)](https://pnpm.io/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v3%20%2F%20v4-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Clerk Authentication](https://img.shields.io/badge/Clerk-Authentication-6C47FF?logo=clerk&logoColor=white)](https://clerk.com/)
[![Firebase Firestore](https://img.shields.io/badge/Firebase-Firestore-FFCA28?logo=firebase&logoColor=black)](https://firebase.google.com/)
[![Cloudinary Media](https://img.shields.io/badge/Cloudinary-Media-3448C5?logo=cloudinary&logoColor=white)](https://cloudinary.com/)
[![Vercel Deployed](https://img.shields.io/badge/Vercel-Deployed-black?logo=vercel&logoColor=white)](https://vercel.com/)
[![License MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

A high-performance Turborepo and pnpm workspaces monorepo consolidating four distinct restaurant web applications while preserving their independent design systems, menus, brand identities, and deployment workflows.

---

## Live Deployments

All four applications are deployed and actively running on Vercel:

| Application | Cuisine / Concept | Location | Deployment URL |
| :--- | :--- | :--- | :--- |
| **Sampradaya** | Multicuisine Family Dining | Hanamkonda, Warangal | [sampradaya-multicuisine-family-rest.vercel.app](https://sampradaya-multicuisine-family-rest.vercel.app/) |
| **Majesty** | Authentic Arabian Mandi | Hanamkonda, Warangal | [majesty-mandi-house-eight.vercel.app](https://majesty-mandi-house-eight.vercel.app/) |
| **Mandiwala** | Arabian Mandi & Majlis Cabins | Hanamkonda, Warangal | [mandiwala-arabian-restaurant.vercel.app](https://mandiwala-arabian-restaurant.vercel.app/) |
| **Aroma** | Fine Dine & Banquet Hall | Hanamkonda, Warangal | [aroma-fine-dine-restaurant-banquet.vercel.app](https://aroma-fine-dine-restaurant-banquet.vercel.app/) |

---

## Project Background and Origin

This entire digital ecosystem was conceived, architected, and engineered by Koushik Katkam and Vyshnavi Nagavelli as a suite of bespoke, commercial software solutions for prominent dining establishments in Hanamkonda, Warangal, Telangana.

The developers conducted extensive on-site research, digitized physical printed menus, photographed restaurant interiors, structured comprehensive culinary catalogs, and engineered end-to-end digital ordering, table reservation, and administrative content management workflows. The platform was designed to solve key operational bottlenecks:
- Eliminating steep 20% to 35% commission fees charged by third-party food delivery aggregators through direct, structured WhatsApp order dispatch.
- Providing digital access to both authentic scanned physical menus and real-time interactive menus.
- Equipping management with authenticated dashboards for live menu CRUD operations and reservation management.

When the restaurant proprietors declined the acquisition proposals, the engineering team chose to retain the codebase and publish the complete ecosystem as an active portfolio showcase and engineering demonstration. Every application is fully functional, exhibiting production-grade full-stack engineering, custom UI motion systems, and cloud infrastructure integration.

---

## The Restaurant Applications

### 1. Sampradaya Multicuisine Family Restaurant
- **Live Showcase**: [https://sampradaya-multicuisine-family-rest.vercel.app/](https://sampradaya-multicuisine-family-rest.vercel.app/)
- **Location**: 4th Floor, Kaloji Marg, Balasamudram, Hanamkonda
- **Framework & Styling**: Next.js 16 (App Router), React 19, Tailwind CSS v4, Framer Motion, Lenis Smooth Scroll
- **Key Capabilities**:
  - **Heritage Visual Design**: Curated pairing of serif display fonts (`Playfair Display`, `Cinzel`) with modern body typefaces (`Inter`, `Montserrat`) across an Indian fine-dining palette of ivory (`#FAFAF9`), deep crimson (`#7F1D1D`), and warm gold (`#D97706`).
  - **Extensive Catalog**: 100+ authentic dishes across Biryanis, Tandoori Starters, Seafood, Non-Veg Curries, Indian Breads, Rice and Noodles, and Desserts with dietary indicators conforming to Indian culinary standards.
  - **Frictionless WhatsApp Ordering**: Client-side Zustand cart persisted to `localStorage` with real-time tax calculation (5% GST) and one-click itemized WhatsApp dispatch directly to `+91 63035 63242`.
  - **Physical Menu Lightbox**: Dedicated route at `/physical-menu` rendering full-resolution digitized scans of the printed dining cards with interactive click-to-zoom modals.
  - **Admin Content Management**: Clerk authentication route proxy guarding `/admin`, synchronizing dynamic dishes and category availability in Google Cloud Firestore.

### 2. Majesty Mandi House
- **Live Showcase**: [https://majesty-mandi-house-eight.vercel.app/](https://majesty-mandi-house-eight.vercel.app/)
- **Location**: Hanamkonda, Warangal
- **Framework & Styling**: Next.js 16 (App Router), React 19, Tailwind CSS v3, Framer Motion, HTML5 Canvas
- **Key Capabilities**:
  - **Scroll-Driven 241-Frame Canvas Hero**: Interactive 241-frame sequence (`frame_0000.webp` to `frame_0240.webp`) tied directly to scroll progression, rendered via HTML5 canvas and `requestAnimationFrame` at 60 FPS without React re-render penalties.
  - **Tiered Portion Pricing**: Multi-portion pricing engine supporting Single, Half, Full, Jumbo, 1-Piece, 2-Piece, and 4-Piece configurations with instant price recalculation.
  - **Dual-Source Menu Engine**: Google Cloud Firestore data store paired with structured local fallback records in `src/data/menu.ts` for zero-downtime resilience.
  - **Order and Reservation Dispatch**: Formats subtotal, itemized portions, and statutory 5% GST into an encoded WhatsApp message sent directly to `+91 95023 16909`.
  - **Birthday Promotion Modal**: Timed promotional modal capturing guest birth dates for an automated 10% celebration discount voucher via WhatsApp.
  - **Administration Portal**: Clerk-authenticated dashboard at `/admin` and branded login at `/admin/login` supporting Firestore CRUD and Cloudinary uploads.

### 3. Mandiwala Arabian Restaurant
- **Live Showcase**: [https://mandiwala-arabian-restaurant.vercel.app/](https://mandiwala-arabian-restaurant.vercel.app/)
- **Location**: Hanamkonda, Warangal
- **Framework & Styling**: Next.js 16 (App Router), React 19, Tailwind CSS v4, Framer Motion, Lenis Smooth Scroll
- **Key Capabilities**:
  - **Obsidian and Royal Gold Visuals**: Arabian luxury styling utilizing obsidian black (`#0B0C10`), dark charcoal (`#14161D`), warm bronze (`#1A1714`), and royal gold (`#D4AF37`) with an animated geometric preloader curtain reveal.
  - **Private Majlis Cabin Reservations**: Dedicated booking system for couples, family tables, and private Arabian Majlis cabins, persisting bookings directly into Firestore.
  - **Portion-Based Menu Selector**: Modal size selector supporting Single, Half, Tri, Family, and Fixed portions tailored to authentic Mandi dining.
  - **Slide-Over Cart Drawer**: Framer Motion cart drawer managing live portion pricing, address capture (flat, street, landmark, pincode), and dispatch to `+91 85003 71100`.
  - **Secured Media Pipeline**: Authenticated Cloudinary signature endpoint (`/api/cloudinary-sign`) verifying Clerk user identity before signing upload payloads.
  - **Real-Time Admin Console**: Live reservation management dashboard at `/admin` allowing staff to accept or decline pending reservations in real time, plus a dedicated menu CMS at `/admin/menu`.

### 4. Aroma Fine Dine Restaurant & Banquet Hall
- **Live Showcase**: [https://aroma-fine-dine-restaurant-banquet.vercel.app/](https://aroma-fine-dine-restaurant-banquet.vercel.app/)
- **Location**: Hanamkonda, Warangal
- **Framework & Styling**: Next.js 16 (App Router), React 19, Tailwind CSS v3, Framer Motion, Lenis Smooth Scroll
- **Key Capabilities**:
  - **Imperial Atmosphere**: Deep obsidian (`#0B0B0C`) and gold accents (`#DFB15B`, `#C5A059`) with custom branded splash screen and looping background atmospheric video banners.
  - **Dual-Tier Menu Architecture**: Static dataset of over 200 dishes with real-time bidirectional synchronization through Google Cloud Firestore.
  - **Banquet Hall Showcase**: Dedicated event module highlighting hall amenities (centralized air conditioning, stage lighting, acoustic setup) with direct inquiry dispatch.
  - **Physical Menu Scans**: High-resolution digital menu cards at `/physical-menu` and `/menu` with full keyboard and mouse lightbox navigation.
  - **Administrative Management**: Secure `/admin` dashboard protected by Clerk authentication, featuring live Firestore dish editing and direct Cloudinary image uploads.

---

## Monorepo Architecture

```
restaurant-ecosystem/
├── apps/
│   ├── sampradaya/          # Sampradaya Multicuisine (Next.js 16 + Tailwind v4 + Clerk)
│   ├── mandiwala/           # Mandiwala Arabian (Next.js 16 + Tailwind v4 + Clerk)
│   ├── aroma/               # Aroma Fine Dine (Next.js 16 + Tailwind v3 + Clerk)
│   └── majesty/             # Majesty Mandi House (Next.js 16 + Tailwind v3 + Clerk)
├── packages/
│   ├── config/              # Shared compiler config, security headers, metadata registry
│   ├── ui/                  # Shared UI components (MagneticButton spring physics)
│   └── utils/               # Shared helpers (cn merger, formatINR currency, WhatsApp builders)
├── package.json             # Root configuration & unified Turborepo scripts
├── pnpm-workspace.yaml      # pnpm workspace definition & lifecycle script policies
├── turbo.json               # Turborepo task pipeline configuration
├── MIGRATION_MANIFEST.md     # Provenance audit and module mapping
└── MONOREPO_MIGRATION_REPORT.md # Migration verification report and build evidence
```

---

## Shared Workspace Packages

### 1. `@restaurant-ecosystem/config`
- `tsconfig.base.json`: Unified base TypeScript compiler configuration ensuring strict type enforcement.
- `productionSecurityHeaders`: Reusable HTTP security headers (`X-Frame-Options: SAMEORIGIN`, `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy`).
- `RESTAURANTS`: Centralized metadata registry containing official names, coordinates, contact phone numbers, WhatsApp endpoints, operational hours, and feature flags.

### 2. `@restaurant-ecosystem/ui`
- `MagneticButton`: Shared interactive button component featuring cursor-tracking spring physics via Framer Motion, shared between applications for consistent luxury button interactions.

### 3. `@restaurant-ecosystem/utils`
- `cn(...inputs)`: Tailwind CSS class merger utility combining `clsx` and `tailwind-merge`.
- `formatINR(amount, includeSymbol)`: Currency formatter adhering to the Indian Numbering System (`en-IN`, e.g., `₹1,24,500`).
- `generateWhatsAppOrderUrl(phone, items, total, customer, restaurantName)`: Encodes structured order summaries, portion sizes, taxes, customer delivery addresses, and grand totals into one-click WhatsApp deep links.
- `generateWhatsAppReservationUrl(phone, details)`: Formats guest party sizes, dates, time windows, and occasion types into confirmation chats.

---

## Security and System Hardening

The monorepo incorporates layered security controls across routing, authentication, API handling, and environment isolation:

1. **Next.js 16 Route Protection Proxies (`src/proxy.ts`)**:
   - Modern Next.js 16 proxy implementation (`proxy.ts`) replaces deprecated `middleware.ts` across all four applications.
   - Restricts `/admin(.*)` routes on the server side using Clerk's `clerkMiddleware`.
   - Exempts static assets, background streaming media, and the public login route (`/admin/login`).

2. **Authenticated Signature Endpoints**:
   - The Cloudinary signing route handler at `apps/mandiwala/src/app/api/cloudinary-sign/route.ts` is protected with server-side Clerk session validation (`auth()`).
   - Unauthenticated callers receive an immediate `401 Unauthorized` response, preventing unauthorized media manipulation or quota exhaustion.

3. **Frontend Access Controls and Production Guardrails**:
   - Admin page components verify `!isLoaded` and `!isSignedIn` states, rendering secure fallback screens and redirection triggers.
   - Development-mode bypasses in `apps/sampradaya` are explicitly restricted to non-production environments (`process.env.NODE_ENV !== "production"`).

4. **HTTP Security Headers**:
   - All four applications attach `productionSecurityHeaders` via their respective `next.config.ts`, mitigating clickjacking (`X-Frame-Options`), MIME-type sniffing (`X-Content-Type-Options`), and unauthorized browser feature access (`Permissions-Policy`).

5. **Credential Isolation and Repository Sanitization**:
   - Gitignore rules block all `.env`, `.env.*`, `*.pem`, `*.key`, `*service-account*.json`, `firebase-adminsdk*.json`, and `.clerk/` files while explicitly permitting `.env.example` templates.
   - Hardcoded project IDs, sender IDs, and test keys have been completely removed in favor of validated environment variables.

---

## Quick Start

### Prerequisites

- **Node.js**: `v20+` (verified on `v24.21.0`)
- **pnpm**: `v10+` (verified on `v12.4.2`)

### 1. Installation

```bash
# Clone the repository
git clone https://github.com/KatkamKoushik/restaurant-ecosystem.git
cd restaurant-ecosystem

# Install all workspace dependencies
pnpm install
```

If prompted for dependency lifecycle approvals:
```bash
pnpm approve-builds --all
```

### 2. Environment Configuration

Each application directory includes a documented `.env.example` template:

```bash
# Copy templates to local environment files
cp apps/sampradaya/.env.example apps/sampradaya/.env.local
cp apps/mandiwala/.env.example apps/mandiwala/.env.local
cp apps/aroma/.env.example apps/aroma/.env.local
cp apps/majesty/.env.example apps/majesty/.env.local
```

Fill in the appropriate credentials:
- **Clerk**: `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` and `CLERK_SECRET_KEY`
- **Firebase**: `NEXT_PUBLIC_FIREBASE_API_KEY`, `NEXT_PUBLIC_FIREBASE_PROJECT_ID`, `NEXT_PUBLIC_FIREBASE_APP_ID`, etc.
- **Cloudinary**: `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`, `NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET`, and `CLOUDINARY_API_SECRET`

---

## Available Scripts

### Workspace Commands (All Applications)

| Command | Action |
| :--- | :--- |
| `pnpm run dev` | Launch all four applications in parallel via Turborepo |
| `pnpm run build` | Compile all shared packages and applications concurrently |
| `pnpm run lint` | Execute ESLint across all applications and shared packages |
| `pnpm run typecheck` | Run TypeScript typechecking (`tsc --noEmit`) across the entire workspace |

### Individual Application Commands

#### Sampradaya
```bash
pnpm run dev:sampradaya       # Start development server
pnpm run build:sampradaya     # Production build
pnpm --filter @restaurant-ecosystem/sampradaya lint
pnpm --filter @restaurant-ecosystem/sampradaya typecheck
```

#### Mandiwala
```bash
pnpm run dev:mandiwala        # Start development server
pnpm run build:mandiwala      # Production build
pnpm --filter @restaurant-ecosystem/mandiwala lint
pnpm --filter @restaurant-ecosystem/mandiwala typecheck
```

#### Aroma
```bash
pnpm run dev:aroma            # Start development server
pnpm run build:aroma          # Production build
pnpm --filter @restaurant-ecosystem/aroma lint
pnpm --filter @restaurant-ecosystem/aroma typecheck
```

#### Majesty
```bash
pnpm run dev:majesty          # Start development server
pnpm run build:majesty        # Production build
pnpm --filter @restaurant-ecosystem/majesty lint
pnpm --filter @restaurant-ecosystem/majesty typecheck
```

---

## Vercel Deployment Configuration

All four applications are configured for independent continuous deployment on Vercel:

| Application | Root Directory | Build Command | Output Directory | Framework Preset |
| :--- | :--- | :--- | :--- | :--- |
| **Sampradaya** | `apps/sampradaya` | `cd ../.. && pnpm --filter @restaurant-ecosystem/sampradaya build` | `.next` | Next.js |
| **Mandiwala** | `apps/mandiwala` | `cd ../.. && pnpm --filter @restaurant-ecosystem/mandiwala build` | `.next` | Next.js |
| **Aroma** | `apps/aroma` | `cd ../.. && pnpm --filter @restaurant-ecosystem/aroma build` | `.next` | Next.js |
| **Majesty** | `apps/majesty` | `cd ../.. && pnpm --filter @restaurant-ecosystem/majesty build` | `.next` | Next.js |

Each application contains an individual `vercel.json` file configuring framework settings and root directory overrides.

---

## Authors and Engineering Credits

- **Koushik Katkam**
  - Email: [koushikkatkam@gmail.com](mailto:koushikkatkam@gmail.com)
  - GitHub: [KatkamKoushik](https://github.com/KatkamKoushik)
  - LinkedIn: [koushik-katkam](https://linkedin.com/in/koushik-katkam)
  - Instagram: [koushik_katkam](https://instagram.com/koushik_katkam)

- **Vyshnavi Nagavelli**
  - Email: [nagavellivyshnavi3@gmail.com](mailto:nagavellivyshnavi3@gmail.com)
  - GitHub: [nagavellivyshnavi](https://github.com/nagavellivyshnavi)
  - LinkedIn: [vyshnavi-nagavelli-135465355](https://linkedin.com/in/vyshnavi-nagavelli-135465355/)

---

## License and Disclaimer

This project is licensed under the [MIT License](LICENSE).

All restaurant brand names, trademarks, menu designs, and dining concepts belong to their respective establishments. These applications are maintained strictly for educational, technical demonstration, and portfolio showcase purposes.
