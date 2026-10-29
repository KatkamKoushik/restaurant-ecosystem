# Deployment & Vercel Services

The Restaurant Ecosystem can be deployed using two distinct architectural models on the **Vercel** cloud platform:

1. **Multi-Service Architecture (Unified Deployment)**: A single Vercel project orchestrating all four services under unified routing, shared environment bindings, and consolidated monitoring.
2. **Multi-Project Architecture (Standalone Deployments)**: Four distinct Vercel projects linked to the same Git monorepo, each scoping builds to its respective subfolder.

---

## Multi-Service Architecture (`vercel.json`)

Vercel's **Services** model enables monorepo projects to build and deploy multiple frontends and backends together within a single deployment.

The configuration resides at the repository root in [`vercel.json`](file:///d:/ecosystem/vercel.json):

```json
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "services": {
    "aroma": {
      "root": "apps/aroma",
      "framework": "nextjs"
    },
    "majesty": {
      "root": "apps/majesty",
      "framework": "nextjs"
    },
    "mandiwala": {
      "root": "apps/mandiwala",
      "framework": "nextjs"
    },
    "sampradaya": {
      "root": "apps/sampradaya",
      "framework": "nextjs"
    }
  },
  "rewrites": [
    { "source": "/aroma", "destination": { "service": "aroma" } },
    { "source": "/aroma/(.*)", "destination": { "service": "aroma" } },
    { "source": "/majesty", "destination": { "service": "majesty" } },
    { "source": "/majesty/(.*)", "destination": { "service": "majesty" } },
    { "source": "/mandiwala", "destination": { "service": "mandiwala" } },
    { "source": "/mandiwala/(.*)", "destination": { "service": "mandiwala" } },
    { "source": "/sampradaya", "destination": { "service": "sampradaya" } },
    { "source": "/sampradaya/(.*)", "destination": { "service": "sampradaya" } },
    { "source": "/(.*)", "destination": { "service": "sampradaya" } }
  ]
}
```

### Routing Rules & Path Precedence
- **Internal by Default**: Services in Vercel receive zero public traffic unless targeted by a top-level rewrite.
- **Evaluation Order**: Top-level rewrites are evaluated in strict order from top to bottom. Specific sub-path rewrites (`/aroma`, `/majesty`, `/mandiwala`) must precede the fallback catch-all `/(.*)`.
- **Catch-All Target**: The catch-all rule directs root domain visitors to `sampradaya`, the ecosystem's flagship culinary concept.

---

## Service Bindings for Internal Communication

When one service needs to call another internally without exposing the target to the public web, declare a **binding** on the calling service:

```json
{
  "services": {
    "aroma": {
      "root": "apps/aroma",
      "framework": "nextjs",
      "bindings": [
        {
          "type": "service",
          "service": "mandiwala",
          "format": "url",
          "env": "MANDIWALA_INTERNAL_URL"
        }
      ]
    }
  }
}
```

- **Runtime Resolution**: Vercel injects the private internal endpoint of the target service into the environment variable (`MANDIWALA_INTERNAL_URL`).
- **Function Scope**: Bindings resolve at runtime inside Serverless and Edge Functions (not in build phases or middleware).

---

## Next.js Sub-Path Configuration (`basePath`)

When routing multiple Next.js applications under sub-paths on a single domain (e.g. `domain.com/aroma`), each sub-path application must declare its `basePath` in `next.config.ts`:

```typescript
// apps/aroma/next.config.ts
const nextConfig: NextConfig = {
  basePath: "/aroma",
  // ... other configurations
};
```

This ensures Next.js bundles static assets, chunks, and client-side links (`<Link href="/menu">`) with the appropriate `/aroma/menu` prefix.

---

## Standalone Deployment Configuration (Alternative)

For deployments where each restaurant operates on its own dedicated domain or subdomain:

1. Create four separate projects in the Vercel Dashboard.
2. In each project's settings:
   - **Root Directory**: `apps/<app-name>`
   - **Build Command**: `cd ../.. && pnpm --filter @restaurant-ecosystem/<app-name> build`
   - **Install Command**: `pnpm install`
3. Each service builds independently, using Turborepo's local or remote caching to minimize deployment times.
