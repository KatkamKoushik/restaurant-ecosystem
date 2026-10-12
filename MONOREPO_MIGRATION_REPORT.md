# Monorepo Migration Report: Restaurant Ecosystem

**Consolidation of Four Restaurant Websites into a Production-Verified Monorepo**  
*Date: October 12, 2026*  
*Author: Antigravity Engineering*

---

## 1. Executive Summary

Four distinct restaurant web applications belonging to the KatkamKoushik restaurant portfolio have been successfully migrated and consolidated into a unified Turborepo + pnpm workspaces monorepo:
1. **Sampradaya Multicuisine Family Restaurant**
2. **Mandiwala Arabian Restaurant**
3. **Aroma Fine Dine Restaurant & Banquet Hall**
4. **Majesty Mandi House**

All four applications build cleanly in parallel and independently, pass type checks (`tsc --noEmit`), and adhere to linting standards with zero compiler errors. All unique branding, custom styling tokens, menu data, audio/video media, authentication flows, and backend configurations have been 100% preserved.

---

## 2. Audit & Backup Verification

### 2.1 Git Provenance
Prior to modifying any files, all four source repositories were cloned into dedicated local backup folders (`d:\merge\backups/`) with their full Git commit histories preserved:

- **Sampradaya**: `d:\merge\backups\sampradaya`  
  - Remote: `https://github.com/KatkamKoushik/Sampradaya-Multicuisine-Family-Restaurant.git`  
  - Branch: `main` | Head SHA: `515002182b1b9ec401ee77c283321dff05eb9509`
- **Mandiwala**: `d:\merge\backups\mandiwala`  
  - Remote: `https://github.com/KatkamKoushik/mandiwala-arabian-restaurant.git`  
  - Branch: `main` | Head SHA: `28486943604b86dab38782fb86c83813c7e36379`
- **Aroma**: `d:\merge\backups\aroma`  
  - Remote: `https://github.com/KatkamKoushik/aroma-fine-dine-restaurant-banquet-hall.git`  
  - Branch: `main` | Head SHA: `358e80e33eab95424adc74b2a98627975ee3866e`
- **Majesty**: `d:\merge\backups\majesty`  
  - Remote: `https://github.com/KatkamKoushik/majesty-mandi-house.git`  
  - Branch: `main` | Head SHA: `2337e28dc8fae15a80b58b63a9a58fa57e02300d`

### 2.2 Security & Credential Hygiene
- No active `.env` files with secret keys were tracked in Git.
- Code inspection confirmed all Firebase, Clerk, and Cloudinary integrations use environment variables with placeholder fallbacks for local preview.
- Fresh, documented `.env.example` templates were authored for each of the four applications.

---

## 3. Code Comparison & Architecture Analysis

### 3.1 Why Premature Abstraction Was Avoided (Non-Interchangeable Components)

1. **`MenuCard`**:
   - **Aroma**: Features dietary requirement badges (`isVeg ? 'Veg' : 'Non-Veg'`) and a 4:3 landscape card layout suited for multicuisine dining.
   - **Majesty**: Features a circular (`rounded-full`) parallax platter image without dietary badges, optimized specifically for authentic Mandi presentation.
   - **Sampradaya**: Uses a custom handi/platter list card presentation with inline category tabs.
   - **Mandiwala**: Displays tiered portion pricing (`Single`, `Half`, `Tri`, `Family`) with dynamic size selection triggers.
   - *Verdict*: Kept within individual applications to preserve brand aesthetics and data models.

2. **`CartStore` & Ordering Mechanics**:
   - **Mandiwala**: Stores portion sizes (`size: 'Single' | 'Half' | 'Tri' | 'Family' | 'Fixed'`) and opens a size-selection modal.
   - **Sampradaya**: Uses Zustand `persist` middleware with localStorage and captures detailed delivery/pickup addresses.
   - **Aroma & Majesty**: Use `Omit<CartItem, 'quantity'>` interfaces with dedicated open/close modal drawer toggles.
   - *Verdict*: Kept isolated to ensure cart schemas do not corrupt distinct ordering pipelines.

3. **Preloaders & Visual Ambiance**:
   - Each restaurant features unique branding, distinct quotes, and tailored particle animations (e.g., Aroma's Three.js canvas vs Majesty's Arabic majlis imagery).
   - *Verdict*: Visual components retained in each application.

### 3.2 Extracted & Shared Packages (Evidence-Based Reuse)

1. **`@restaurant-ecosystem/ui`**:
   - **`MagneticButton`**: Exact code inspection proved `MagneticButton.tsx` in Aroma and Majesty were 100% byte-for-byte identical. Extracted into a shared package with spring physics powered by Framer Motion.
2. **`@restaurant-ecosystem/utils`**:
   - **`cn`**: Class merge utility combining `clsx` and `tailwind-merge`.
   - **`formatINR` / `formatPrice`**: Standardized currency formatting according to Indian Rupee formatting standards.
   - **`generateWhatsAppOrderUrl`**: Standardized WhatsApp message formatting and URL encoding while accepting per-restaurant phone numbers and custom customer metadata.
   - **`generateWhatsAppReservationUrl`**: Shared reservation link builder.
3. **`@restaurant-ecosystem/config`**:
   - **`tsconfig.base.json`**: Central TypeScript configuration extended by all packages and apps.
   - **`productionSecurityHeaders`**: Shared HTTP security headers (`X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`).
   - **`RESTAURANTS`**: Centralized metadata registry containing contact info, phone numbers, WhatsApp numbers, addresses, and feature toggles.

---

## 4. Preservation of Unique Features

### Sampradaya Multicuisine Family Restaurant
- **Palette**: Ivory (`#FAFAF9`), Crimson (`#7F1D1D`), Gold (`#D97706`), Charcoal (`#1C1917`).
- **Menu**: 100+ multi-cuisine items categorized into Biryanis, Non-Veg Curries, Indian Breads, Rice & Noodles, Starters, Salads & Raithas, Desserts.
- **Cart**: Local persistence via Zustand with customer delivery address capture (flat, street, landmark, pincode).
- **WhatsApp Channel**: `+91 63035 63242`.

### Mandiwala Arabian Restaurant
- **Palette**: Obsidian (`#0B0C10`), Charcoal (`#14161D`), Royal Gold (`#D4AF37`), Light Gold (`#F5E08B`), Saffron (`#E65100`).
- **Features**: Tiered mandi portion pricing (`Single`, `Half`, `Tri`, `Family`), real-time Firestore menu syncing via `useMenu()`, Cloudinary signature endpoint (`/api/cloudinary-sign`), SizeSelector modal.
- **WhatsApp Channel**: `+91 85003 71100`.

### Aroma Fine Dine Restaurant & Banquet Hall
- **Palette**: Obsidian (`#0B0B0C`), Imperial Gold (`#DFB15B`), Amber (`#F3A833`).
- **Features**: Three.js 3D animations (`three`), banquet hall reservation inquiries, AC/Non-AC dining reservations, birthday promotion modal, Clerk middleware protection for `/admin` and `/api/debug`.
- **WhatsApp Channel**: `+91 73311 22436`.

### Majesty Mandi House
- **Palette**: Obsidian (`#0B0B0C`), Imperial Gold (`#DFB15B`), Amber (`#F3A833`).
- **Features**: Authentic Arabian mandi showcase, Canvas hero animation with frame-by-frame webp sequence, Arabic majlis ambiance gallery, Clerk login integration (`/admin/login`).
- **WhatsApp Channel**: `+91 95023 16909`.

---

## 5. Verification & Validation Results

### 5.1 Installation & Package Graph
```bash
pnpm install
pnpm approve-builds --all
```
- **Result**: `✓ Lockfile verified. Scope: all 8 workspace projects. Done in 18ms.`

### 5.2 TypeScript Typecheck
```bash
pnpm run typecheck
```
- **Packages Checked**:
  - `@restaurant-ecosystem/config`: Passed
  - `@restaurant-ecosystem/utils`: Passed
  - `@restaurant-ecosystem/ui`: Passed
  - `@restaurant-ecosystem/sampradaya`: Passed
  - `@restaurant-ecosystem/mandiwala`: Passed
  - `@restaurant-ecosystem/aroma`: Passed
  - `@restaurant-ecosystem/majesty`: Passed
- **Result**: `7/7 packages passed with 0 type errors.`

### 5.3 ESLint Validation
```bash
pnpm run lint
```
- **Result**: `4/4 apps passed with 0 errors.`
  - Migration fixes applied: Standardized React Hook ordering in `CartSidebar.tsx` and `Navbar.tsx` (Mandiwala) to comply with React 19 rules of hooks. Tuned flat config ignore patterns for migration scripts.

### 5.4 Production Build Validation (Turborepo)
```bash
pnpm run build
```
```
   • turbo 2.11.7
   • Running build in 7 packages
   • @restaurant-ecosystem/sampradaya: Next.js 16.3.1 - 7/7 static pages generated ✓
   • @restaurant-ecosystem/mandiwala: Next.js 16.3.1 - 9/9 pages generated (including dynamic /api/cloudinary-sign) ✓
   • @restaurant-ecosystem/aroma: Next.js 16.2.9 - 8/8 pages generated (including dynamic /api/debug) ✓
   • @restaurant-ecosystem/majesty: Next.js 16.2.9 - 6/6 pages generated (including dynamic /admin/login) ✓
   • Tasks: 4 successful, 4 total (0 errors)
   • Time: 18.112s
```

---

## 6. Vercel Deployment Settings

Each application is configured with its own `vercel.json` and independent root directory:

| App | Root Directory | Build Command | Output | Framework |
| :--- | :--- | :--- | :--- | :--- |
| **Sampradaya** | `apps/sampradaya` | `cd ../.. && pnpm --filter @restaurant-ecosystem/sampradaya build` | `.next` | Next.js |
| **Mandiwala** | `apps/mandiwala` | `cd ../.. && pnpm --filter @restaurant-ecosystem/mandiwala build` | `.next` | Next.js |
| **Aroma** | `apps/aroma` | `cd ../.. && pnpm --filter @restaurant-ecosystem/aroma build` | `.next` | Next.js |
| **Majesty** | `apps/majesty` | `cd ../.. && pnpm --filter @restaurant-ecosystem/majesty build` | `.next` | Next.js |

---

## 7. Migration Checklist & Safety

- [x] Cloned all four repositories into separate local backup directories (`d:\merge\backups/`).
- [x] Recorded HEAD SHA, remote URL, branches, tags, and working-tree status in `MIGRATION_MANIFEST.md`.
- [x] Preserved full Git history in local backups without deleting or overwriting any source repo.
- [x] Extracted shared code only where justified by actual code inspection (`MagneticButton`, `cn`, `formatINR`, `whatsapp`, `config`).
- [x] Preserved application-specific Next.js configs, Tailwind themes, routes, assets, and dependencies.
- [x] Provided separate `.env.example` templates for all four applications.
- [x] Validated each app independently and collectively via Turborepo (`typecheck`, `lint`, `build`).
- [x] Generated `vercel.json` files and documented deployment procedures.
