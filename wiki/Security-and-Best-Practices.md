# Security & Best Practices

The Restaurant Ecosystem implements defense-in-depth security principles across authentication, API endpoint validation, static asset handling, and HTTP transport security.

---

## Authentication & Authorization

Authentication is managed via **Clerk**, providing session handling, multi-factor authentication, and role-based administrative access control.

### Next.js 16 Route Proxies (`src/proxy.ts`)
Next.js 16 deprecates the legacy root `middleware.ts` file in favor of specialized route proxies. Each application defines its route interception in `src/proxy.ts`:

```typescript
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isProtectedRoute = createRouteMatcher([
  "/admin(.*)",
]);

export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
```

### Server-Side Route Guarding
In administrative routes and layouts, authorization is explicitly enforced on the server before rendering:

```typescript
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const { userId } = await auth();
  if (!userId) {
    redirect("/admin/login");
  }
  return <section>{children}</section>;
}
```

---

## Secure Asset Uploads (Cloudinary API)

To prevent arbitrary file uploads and unauthorized quota consumption, menu image uploads rely on cryptographically signed parameters generated on the backend:

- **Endpoint**: [`/api/cloudinary-sign`](file:///d:/ecosystem/apps/mandiwala/src/app/api/cloudinary-sign/route.ts)
- **Session Verification**: The endpoint calls Clerk's `auth()` to verify that the request originates from an active authenticated administrator.
- **Payload Validation**: Timestamps are checked to prevent replay attacks, and the SHA-1 signature is generated server-side using `CLOUDINARY_API_SECRET`.
- **Secret Isolation**: Cloudinary API secrets are strictly bound to server environments and are never prefixed with `NEXT_PUBLIC_`.

---

## Production HTTP Security Headers

Standardized HTTP security headers are exported from `@restaurant-ecosystem/config` and injected into `next.config.ts` across every application:

| Header | Value | Purpose |
| :--- | :--- | :--- |
| `X-Frame-Options` | `DENY` | Prevents clickjacking attacks by blocking iframe embedding. |
| `X-Content-Type-Options` | `nosniff` | Disables MIME type sniffing. |
| `Referrer-Policy` | `strict-origin-when-cross-origin` | Protects privacy by omitting sensitive referrer paths on cross-origin requests. |
| `Strict-Transport-Security` | `max-age=63072000; includeSubDomains; preload` | Enforces HTTPS connections for two years. |
| `Permissions-Policy` | `camera=(), microphone=(), geolocation=()` | Disables browser hardware APIs not needed by the restaurant frontends. |
| `Content-Security-Policy` | Restrictive script/style/font/img directives | Restricts asset loading strictly to trusted origins (Firebase, Cloudinary, Unsplash). |

---

## Secret Management & Hygiene

1. **Version Control Guards**: Root and sub-project `.gitignore` files strictly ignore:
   - `.env`, `.env.local`, `.env.production`
   - Service account keys (`*.json`, `service-account*.json`)
   - Certificate files (`*.pem`, `*.key`)
2. **Template Synchronization**: Every new environment variable required in production must be reflected with placeholder values in [`.env.example`](file:///d:/ecosystem/.env.example).
3. **No Hardcoded Tokens**: Migration and seeding scripts ([`migrate.mjs`](file:///d:/ecosystem/apps/majesty/migrate.mjs), `uploadAndSeed.mjs`) read variables from `process.env` rather than embedding credentials.
