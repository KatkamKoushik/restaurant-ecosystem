# Architecture & Monorepo Design

The Restaurant Ecosystem repository is engineered as an enterprise-grade monorepo containing four independent Next.js applications and shared internal libraries. It utilizes **pnpm workspaces** for strict dependency isolation and **Turborepo** for optimized caching, dependency graph resolution, and high-performance pipeline orchestration.

---

## Workspace Structure

The project root divides code into applications (`apps/`) and shared workspace libraries (`packages/`):

```text
restaurant-ecosystem/
├── apps/
│   ├── aroma/             # Next.js 16 - Fine dine and luxury banquet showcase
│   ├── majesty/           # Next.js 16 - Royal Mandi dining experience
│   ├── mandiwala/         # Next.js 16 - Traditional Arabian restaurant & takeaways
│   └── sampradaya/        # Next.js 16 - Flagship multicuisine family restaurant
├── packages/
│   ├── config/            # Centralized restaurant metadata, theme tokens & security headers
│   ├── tsconfig/          # Shared TypeScript configurations (base, nextjs, react-library)
│   ├── ui/                # Shared React 19 UI components (RestaurantSwitcher, widgets)
│   └── utils/             # Cross-application utility functions and helpers
├── wiki/                  # Official documentation and knowledge base
├── .gitignore             # Root security and environment isolation definitions
├── LICENSE                # Official MIT License terms
├── package.json           # Monorepo root manifest (scripts, packageManager, pnpm overrides)
├── pnpm-workspace.yaml    # Workspace definition mapping apps/* and packages/*
├── README.md              # Public repository overview and badge showcase
├── turbo.json             # Turborepo task pipeline definitions and cache rules
└── vercel.json            # Vercel multi-service configuration and rewrite rules
```

---

## Workspace Packages

### 1. `@restaurant-ecosystem/config`
Provides central single-source-of-truth metadata, restaurant brand definitions, cuisine tags, contact details, operating hours, and standard production security headers.
- **Exported Models**: `RestaurantMetadata`, `RestaurantConfig`, `RESTAURANTS`, `productionSecurityHeaders`
- **Location**: [`packages/config`](file:///d:/ecosystem/packages/config)

### 2. `@restaurant-ecosystem/ui`
A shared component library built with Tailwind CSS, React 19, and Framer Motion.
- **Key Components**:
  - `RestaurantSwitcher`: An interactive, glassmorphic dropdown enabling seamless navigation across all ecosystem restaurants with real-time status indicators.
- **Location**: [`packages/ui`](file:///d:/ecosystem/packages/ui)

### 3. `@restaurant-ecosystem/utils`
Shared helper functions including formatting utilities, string sanitation, and date helpers utilized across frontend and administrative pages.
- **Location**: [`packages/utils`](file:///d:/ecosystem/packages/utils)

### 4. `@restaurant-ecosystem/tsconfig`
Shared TypeScript compiler presets ensuring strict, consistent type checking across every service:
- `base.json`: Base configuration with strict mode and ES2022 target.
- `nextjs.json`: Next.js specific compiler configuration with JSX preservation.
- `react-library.json`: Configuration for reusable React components.
- **Location**: [`packages/tsconfig`](file:///d:/ecosystem/packages/tsconfig)

---

## Build Pipeline & Task Orchestration

Turborepo coordinates build, lint, and typecheck tasks across all workspace packages through [`turbo.json`](file:///d:/ecosystem/turbo.json):

```json
{
  "$schema": "https://turbo.build/schema.json",
  "tasks": {
    "build": {
      "dependsOn": ["^build"],
      "inputs": ["$TURBO_DEFAULT$", ".env*"],
      "outputs": [".next/**", "!.next/cache/**", "dist/**"]
    },
    "lint": {
      "dependsOn": ["^lint"]
    },
    "typecheck": {
      "dependsOn": ["^build"]
    },
    "dev": {
      "cache": false,
      "persistent": true
    }
  }
}
```

### Dependency Inversion & Topological Ordering
When `pnpm turbo run build` executes:
1. Turborepo constructs a Directed Acyclic Graph (DAG) of all dependencies.
2. Independent packages (`@restaurant-ecosystem/config`, `@restaurant-ecosystem/utils`, `@restaurant-ecosystem/ui`) are processed first.
3. The four Next.js applications build in parallel once shared library dependencies finish compiling.
4. Subsequent builds leverage local filesystem caching to skip unchanged packages.
