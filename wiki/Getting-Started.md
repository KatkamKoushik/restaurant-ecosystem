# Getting Started & Local Setup

This guide provides instructions for setting up, developing, and building the Restaurant Ecosystem platform locally.

---

## Prerequisites

Ensure your development environment meets the following software requirements:

- **Node.js**: `v20.x` or `v22.x` (LTS recommended)
- **pnpm**: `v10.5.x` or higher (`corepack enable` or `npm install -g pnpm`)
- **Git**: `v2.40.x` or higher
- **Turborepo**: Installed automatically via root devDependencies

Verify installations:
```bash
node -v
pnpm -v
git --version
```

---

## Installation & Workspace Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/KatkamKoushik/restaurant-ecosystem.git
   cd restaurant-ecosystem
   ```

2. **Install all workspace dependencies**:
   ```bash
   pnpm install
   ```
   *pnpm links shared internal packages (`workspace:*`) directly into application node_modules.*

---

## Environment Variable Configuration

A template file is provided at the repository root ([`.env.example`](file:///d:/ecosystem/.env.example)) as well as within individual applications.

Copy the template to initialize local environment files for each application:

```bash
# Aroma Fine Dine
cp apps/aroma/.env.example apps/aroma/.env.local

# Majesty Mandi House
cp apps/majesty/.env.example apps/majesty/.env.local

# Mandiwala Arabian
cp apps/mandiwala/.env.example apps/mandiwala/.env.local

# Sampradaya Multicuisine
cp apps/sampradaya/.env.example apps/sampradaya/.env.local
```

### Required Configuration Keys

| Variable | Description | Scope |
| :--- | :--- | :--- |
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | Public key for Clerk authentication | Client & Server |
| `CLERK_SECRET_KEY` | Private secret key for backend auth verification | Server only |
| `NEXT_PUBLIC_FIREBASE_API_KEY` | Firebase Web API key for Firestore access | Client & Server |
| `NEXT_PUBLIC_FIREBASE_PROJECT_ID` | Google Cloud / Firebase project identifier | Client & Server |
| `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` | Cloudinary tenant account name | Client & Server |
| `NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET` | Unsigned upload preset for menu assets | Client & Server |
| `CLOUDINARY_API_KEY` | Cloudinary REST API key | Server only |
| `CLOUDINARY_API_SECRET` | Cloudinary signing secret | Server only |

> [!WARNING]
> Never commit `.env` or `.env.local` files to version control. All secret patterns are blocked by the root `.gitignore`.

---

## Development Workflow

### Run All Applications Concurrently
```bash
pnpm turbo run dev
```
By default, Next.js assigns local development ports sequentially (`3000`, `3001`, `3002`, `3003`).

### Run an Individual Application
```bash
# Run Sampradaya
pnpm --filter @restaurant-ecosystem/sampradaya dev

# Run Majesty
pnpm --filter @restaurant-ecosystem/majesty dev

# Run Mandiwala
pnpm --filter @restaurant-ecosystem/mandiwala dev

# Run Aroma
pnpm --filter @restaurant-ecosystem/aroma dev
```

---

## Build & Quality Verification

Run full workspace checks to ensure code quality before submitting pull requests:

```bash
# Execute TypeScript validation across all 7 workspace packages
pnpm turbo run typecheck

# Execute ESLint validation across all applications
pnpm turbo run lint

# Compile optimized production builds for all four applications
pnpm turbo run build
```
