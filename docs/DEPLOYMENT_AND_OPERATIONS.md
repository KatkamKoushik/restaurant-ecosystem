# Deployment & Operations Guide

## Overview
The **Restaurant Ecosystem** is a multi-brand commercial dining platform engineered as a pnpm monorepo with Next.js 16 (App Router) and Turborepo. It powers four distinct brand storefronts with independent routing, design systems, and administrative interfaces:

1. **Sampradaya Traditional Eatery**: Root domain `/`
2. **Mandiwala Arabian Restaurant**: Path prefix `/mandiwala`
3. **Aroma Fine Dining**: Path prefix `/aroma`
4. **Majesty Luxury Cuisine**: Path prefix `/majesty`

---

## Architecture & Hosting

### 1. Vercel Services Topology
The monorepo uses Vercel Services to deploy all four Next.js applications as unified services behind a single root domain, configured in root [`vercel.json`](file:///d:/ecosystem/vercel.json):

```json
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "services": {
    "aroma": { "root": "apps/aroma" },
    "majesty": { "root": "apps/majesty" },
    "mandiwala": { "root": "apps/mandiwala" },
    "sampradaya": { "root": "apps/sampradaya" }
  },
  "rewrites": [
    { "source": "/aroma/(.*)", "destination": { "service": "aroma" } },
    { "source": "/majesty/(.*)", "destination": { "service": "majesty" } },
    { "source": "/mandiwala/(.*)", "destination": { "service": "mandiwala" } },
    { "source": "/(.*)", "destination": { "service": "sampradaya" } }
  ]
}
```

### 2. BasePath Scoping & Asset Routing
Each service (except the root `sampradaya`) defines its `basePath` in `next.config.ts`:
- Aroma: `basePath: "/aroma"`
- Majesty: `basePath: "/majesty"`
- Mandiwala: `basePath: "/mandiwala"`

This ensures all static assets (`/_next/static/...`), API routes (`/api/...`), and internal links maintain strict path isolation without colliding.

---

## Environment Variables Matrix

Configure each service in the Vercel Project Settings with the appropriate environment variables:

| Variable | Scope | Purpose |
| :--- | :--- | :--- |
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | Public | Clerk client-side authentication token |
| `CLERK_SECRET_KEY` | Server | Clerk server-side session verification |
| `ADMIN_EMAILS` | Server | Comma-separated allowlist of administrator emails (Fail-Closed) |
| `NEXT_PUBLIC_FIREBASE_API_KEY` | Public | Firebase Web API key for client Firestore reads |
| `NEXT_PUBLIC_FIREBASE_PROJECT_ID` | Public | Target Firebase project ID |
| `FIREBASE_CLIENT_EMAIL` | Server | Service account client email for Firebase Admin SDK |
| `FIREBASE_PRIVATE_KEY` | Server | Service account private key for Firebase Admin SDK |
| `CLOUDINARY_API_SECRET` | Server | Cloudinary signing secret for authenticated uploads |
| `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` | Public | Cloudinary cloud identifier |
| `NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET`| Public | Configured unsigned/signed upload preset |

---

## Pre-Release Verification & CI Pipeline

Every pull request and push to `main`, `feat/**`, and `fix/**` runs the automated GitHub Actions quality gate ([`.github/workflows/ci.yml`](file:///d:/ecosystem/.github/workflows/ci.yml)):

1. **Reproducible Frozen Lockfile:** `pnpm install --frozen-lockfile` using pinned `pnpm@12.4.2`.
2. **Linting & Code Quality:** `pnpm turbo run lint` across all packages.
3. **Strict TypeScript Compilation:** `pnpm turbo run typecheck` (`tsc --noEmit`) with zero implicit-any tolerance.
4. **Automated Unit & Security Tests:** `pnpm turbo run test` executing Vitest suites covering fail-closed authorization, Cloudinary replay protection, schema injection prevention, and order calculations.
5. **Next.js 16 Production Bundling:** `pnpm turbo run build` using Turbopack across all four applications.

---

## Preview Deployment Testing Procedure

Before merging any change to `main`:

1. **Deploy to Preview:** Trigger a Vercel preview deployment on the branch (`feat/vercel-services-preview`).
2. **Smoke Test Routing Matrix:**
   - [ ] Visit `https://<preview-domain>/` $\rightarrow$ Sampradaya landing page renders with traditional gold theme.
   - [ ] Visit `https://<preview-domain>/mandiwala` $\rightarrow$ Mandiwala Arabian luxury theme and video banners render cleanly.
   - [ ] Visit `https://<preview-domain>/aroma` $\rightarrow$ Aroma storefront and menu load.
   - [ ] Visit `https://<preview-domain>/majesty` $\rightarrow$ Majesty storefront renders.
3. **Smoke Test Interactive Workflows:**
   - [ ] **Reservation Submission:** Book a table on `/mandiwala#reservations` with valid date, time, and phone. Assert initial status enters as `pending`.
   - [ ] **WhatsApp Cart Dispatch:** Add an item to the cart, select Delivery/Pickup, and click "Send Order to WhatsApp". Confirm formatted receipt and URL.
   - [ ] **Admin Authentication:** Navigate to `/mandiwala/admin`. Confirm non-admin accounts receive `403 Forbidden` and authenticated admins can view and manage bookings.
   - [ ] **Media Uploads:** In `/mandiwala/admin/menu`, test Cloudinary signed image upload.

---

## Incident Response & Rollback Procedures

### 1. Instant Vercel Rollback
If a regression or failure occurs post-deployment:
1. Open the [Vercel Dashboard](https://vercel.com).
2. Select the **Deployments** tab.
3. Locate the previous known-good deployment.
4. Click **Instant Rollback**. Traffic is redirected instantly via Vercel's edge network without rebuilding.

### 2. Database Recovery (Firestore)
All database migration scripts ([`apps/aroma/migrate.mjs`](file:///d:/ecosystem/apps/aroma/migrate.mjs), [`apps/majesty/migrate.mjs`](file:///d:/ecosystem/apps/majesty/migrate.mjs)) automatically create local timestamped JSON snapshots in the `backups/` directory prior to any modification:
- If a migration is interrupted or data is corrupted, use the generated `backups/dishes_backup_<timestamp>.json` to restore the collection using atomic batch writes.
