# Restaurant Ecosystem Wiki

Welcome to the **Restaurant Ecosystem** engineering and operations knowledge base. This monorepo powers a multi-brand culinary hospitality platform comprising four production web applications, shared UI design systems, unified configuration schemas, and enterprise cloud integrations.

---

## Ecosystem Overview

The Restaurant Ecosystem consolidates four distinct restaurant concepts into a modern, type-safe monorepo managed by **Turborepo** and **pnpm**:

| Restaurant | Concept | Key Highlights | Production Deployment |
| :--- | :--- | :--- | :--- |
| **Sampradaya** | Multicuisine Family Dining | Traditional recipes, live kitchen, digital ordering, family tables | [sampradaya-multicuisine-family-rest.vercel.app](https://sampradaya-multicuisine-family-rest.vercel.app/) |
| **Majesty** | Authentic Mandi House | Royal feast dining, private majlis seating, authentic spices | [majesty-mandi-house-eight.vercel.app](https://majesty-mandi-house-eight.vercel.app/) |
| **Mandiwala** | Traditional Arabian Restaurant | Signature Arabian platters, express takeaway counters, catering | [mandiwala-arabian-restaurant.vercel.app](https://mandiwala-arabian-restaurant.vercel.app/) |
| **Aroma** | Fine Dine & Banquet Hall | Upscale celebratory cuisine, luxury banquet hall, curated beverages | [aroma-fine-dine-restaurant-banquet.vercel.app](https://aroma-fine-dine-restaurant-banquet.vercel.app/) |

---

## Wiki Navigation

Explore detailed technical and operational documentation through the following topics:

- [Architecture & Monorepo Design](Architecture)
  Comprehensive breakdown of Turborepo pipelines, pnpm workspace topology, package boundaries, and tech stack choices.
- [Getting Started & Local Setup](Getting-Started)
  Step-by-step developer onboarding instructions, prerequisites, environment variable configuration, and build commands.
- [Restaurant Showcase & Branding](Restaurant-Showcase)
  Brand identities, theme tokens, location details, culinary highlights, and UI design considerations for all four restaurants.
- [Deployment & Vercel Services](Deployment-and-Services)
  Multi-service deployment architecture, `vercel.json` routing rules, standalone vs. unified deployments, and CI/CD operations.
- [Security & Best Practices](Security-and-Best-Practices)
  Clerk authentication guards, Next.js 16 proxy routing, Cloudinary signed payload validation, and HTTP security headers.
- [Contributing & Commit Standards](Contributing-and-Development)
  Branch naming rules, conventional commit formatting, co-authorship guidelines, and code review standards.

---

## Tech Stack at a Glance

- **Framework**: Next.js 16 (App Router, React 19, Turbopack)
- **Styling**: Tailwind CSS, Framer Motion, GSAP, Lucide React
- **Monorepo Engine**: Turborepo 2.x, pnpm 10.x Workspaces
- **Authentication**: Clerk User Management (Route Proxies & Server-side Session Guards)
- **Database & Realtime**: Google Cloud Firestore & Firebase Client SDK
- **Asset Storage & Transformation**: Cloudinary Media API
- **Deployment Platform**: Vercel Multi-Service & Edge Infrastructure
