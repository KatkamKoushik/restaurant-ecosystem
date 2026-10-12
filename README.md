# Restaurant Ecosystem Monorepo

A high-performance Turborepo and pnpm workspaces monorepo consolidating four distinct restaurant web applications while preserving their independent design systems, menus, branding, and deployment workflows.

---

## 🏛️ Monorepo Architecture

```
restaurant-ecosystem/
├── apps/
│   ├── sampradaya/      # Sampradaya Multicuisine Family Restaurant (Next.js 16 + Tailwind v4)
│   ├── mandiwala/       # Mandiwala Arabian Restaurant (Next.js 16 + Tailwind v4 + Cloudinary)
│   ├── aroma/           # Aroma Fine Dine Restaurant & Banquet Hall (Next.js 16 + Tailwind v3 + Three.js)
│   └── majesty/         # Majesty Mandi House (Next.js 16 + Tailwind v3 + Clerk Auth)
├── packages/
│   ├── config/          # Shared tsconfig, security headers, restaurant metadata registry
│   ├── ui/              # Shared UI primitives (MagneticButton framer-motion physics)
│   └── utils/           # Shared helpers (cn class merger, formatINR currency, WhatsApp URL builder)
├── package.json         # Workspace root configuration & unified scripts
├── pnpm-workspace.yaml  # pnpm workspace definition & allowed build scripts
├── turbo.json           # Turborepo task pipeline configuration
├── MIGRATION_MANIFEST.md # Provenance audit, commit hashes, and file mapping
└── MONOREPO_MIGRATION_REPORT.md # Full audit report, reuse evidence & test logs
```

---

## 🚀 Quick Start

### Prerequisites

- **Node.js**: `v20+` (verified on `v24.21.0`)
- **pnpm**: `v10+` (verified on `v12.4.2`)

### 1. Install Dependencies

```bash
pnpm install
```

If prompted for dependency lifecycle scripts:
```bash
pnpm approve-builds --all
```

### 2. Configure Environment Variables

Each application contains an `.env.example` template:

```bash
# Sampradaya
cp apps/sampradaya/.env.example apps/sampradaya/.env.local

# Mandiwala
cp apps/mandiwala/.env.example apps/mandiwala/.env.local

# Aroma
cp apps/aroma/.env.example apps/aroma/.env.local

# Majesty
cp apps/majesty/.env.example apps/majesty/.env.local
```

---

## 💻 Available Scripts

### Monorepo Workflows (All Apps)

| Command | Description |
| :--- | :--- |
| `pnpm run dev` | Launch all apps in parallel using Turborepo |
| `pnpm run build` | Build all packages and applications concurrently |
| `pnpm run lint` | Lint all applications and workspace packages |
| `pnpm run typecheck` | Run TypeScript validation (`tsc --noEmit`) across all projects |

### Per-App Independent Commands

#### Sampradaya (`@restaurant-ecosystem/sampradaya`)
```bash
pnpm run dev:sampradaya       # Start dev server on http://localhost:3000
pnpm run build:sampradaya     # Production build
pnpm --filter @restaurant-ecosystem/sampradaya lint
pnpm --filter @restaurant-ecosystem/sampradaya typecheck
```

#### Mandiwala (`@restaurant-ecosystem/mandiwala`)
```bash
pnpm run dev:mandiwala        # Start dev server
pnpm run build:mandiwala      # Production build
pnpm --filter @restaurant-ecosystem/mandiwala lint
pnpm --filter @restaurant-ecosystem/mandiwala typecheck
```

#### Aroma (`@restaurant-ecosystem/aroma`)
```bash
pnpm run dev:aroma            # Start dev server
pnpm run build:aroma          # Production build
pnpm --filter @restaurant-ecosystem/aroma lint
pnpm --filter @restaurant-ecosystem/aroma typecheck
```

#### Majesty (`@restaurant-ecosystem/majesty`)
```bash
pnpm run dev:majesty          # Start dev server
pnpm run build:majesty        # Production build
pnpm --filter @restaurant-ecosystem/majesty lint
pnpm --filter @restaurant-ecosystem/majesty typecheck
```

---

## 📦 Shared Workspace Packages

### 1. `@restaurant-ecosystem/ui`
- **`MagneticButton`**: Reusable interactive button featuring Framer Motion spring physics with cursor tracking. Extracted after verifying identical implementations in Aroma and Majesty.

### 2. `@restaurant-ecosystem/utils`
- **`cn(...inputs)`**: Class merging utility combining `clsx` and `tailwind-merge`.
- **`formatINR(amount, includeSymbol)`**: Indian Rupee currency formatter conforming to `en-IN` numbering conventions.
- **`generateWhatsAppOrderUrl(phone, items, total, customer, restaurantName)`**: WhatsApp direct order deep-link builder.
- **`generateWhatsAppReservationUrl(phone, details)`**: WhatsApp table reservation link builder.

### 3. `@restaurant-ecosystem/config`
- **`tsconfig.base.json`**: Base TypeScript compiler settings.
- **`productionSecurityHeaders`**: Shared HTTP security headers (`X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`).
- **`RESTAURANTS`**: Centralized metadata registry containing contact info, addresses, WhatsApp endpoints, and feature flags.

---

## 🚢 Vercel Deployment Guide

All four applications are configured for independent deployment to Vercel.

| Application | Vercel Root Directory | Build Command | Output Directory |
| :--- | :--- | :--- | :--- |
| **Sampradaya** | `apps/sampradaya` | `cd ../.. && pnpm --filter @restaurant-ecosystem/sampradaya build` | `.next` |
| **Mandiwala** | `apps/mandiwala` | `cd ../.. && pnpm --filter @restaurant-ecosystem/mandiwala build` | `.next` |
| **Aroma** | `apps/aroma` | `cd ../.. && pnpm --filter @restaurant-ecosystem/aroma build` | `.next` |
| **Majesty** | `apps/majesty` | `cd ../.. && pnpm --filter @restaurant-ecosystem/majesty build` | `.next` |

Each application directory contains a verified `vercel.json` file configuring the build pipeline and framework defaults.
