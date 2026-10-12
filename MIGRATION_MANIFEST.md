# Migration Manifest: Restaurant Ecosystem Monorepo

This manifest records the provenance, audit findings, Git metadata, and file mappings for consolidating the four restaurant repositories into a verified monorepo.

---

## 1. Source Repositories & Git Provenance

| Restaurant | Source Repository Remote URL | Branch | Tags | HEAD Commit SHA | Commit Date & Message |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Sampradaya** | `https://github.com/KatkamKoushik/Sampradaya-Multicuisine-Family-Restaurant.git` | `main` | None | `515002182b1b9ec401ee77c283321dff05eb9509` | 2026-09-16: `feat: integrate top video banner, developer credits footer, and add project documentation` |
| **Mandiwala** | `https://github.com/KatkamKoushik/mandiwala-arabian-restaurant.git` | `main` | None | `28486943604b86dab38782fb86c83813c7e36379` | 2026-09-16: `docs: add comprehensive first-person README detailing project origin and architecture` |
| **Aroma** | `https://github.com/KatkamKoushik/aroma-fine-dine-restaurant-banquet-hall.git` | `main` | None | `358e80e33eab95424adc74b2a98627975ee3866e` | 2026-10-12: `feat: integrate showcase features and secure codebase` |
| **Majesty** | `https://github.com/KatkamKoushik/majesty-mandi-house.git` | `main` | None | `2337e28dc8fae15a80b58b63a9a58fa57e02300d` | 2026-09-16: `docs: rewrite README strictly in third-person perspective` |

---

## 2. Local Backup Locations & Git History Preservation

All four repositories were cloned with full history and working trees preserved in pristine condition. No source repositories have been altered or deleted:

- **Sampradaya Backup**: `d:\merge\backups\sampradaya` (7 commits, full `.git` intact)
- **Mandiwala Backup**: `d:\merge\backups\mandiwala` (16 commits, full `.git` intact)
- **Aroma Backup**: `d:\merge\backups\aroma` (8 commits, full `.git` intact)
- **Majesty Backup**: `d:\merge\backups\majesty` (46 commits, full `.git` intact)

---

## 3. Application Destination Mapping

| Application | Source Backup Path | Monorepo Destination | Tracked Source Files | Total Media Size | Package Identifier |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Sampradaya** | `d:\merge\backups\sampradaya` | `apps/sampradaya` | 173 files | 32.15 MB | `@restaurant-ecosystem/sampradaya` |
| **Mandiwala** | `d:\merge\backups\mandiwala` | `apps/mandiwala` | 53 files | 17.58 MB | `@restaurant-ecosystem/mandiwala` |
| **Aroma** | `d:\merge\backups\aroma` | `apps/aroma` | 80 files | 26.03 MB | `@restaurant-ecosystem/aroma` |
| **Majesty** | `d:\merge\backups\majesty` | `apps/majesty` | 378 files | 66.15 MB | `@restaurant-ecosystem/majesty` |

---

## 4. Security & Credential Audit

- **Tracked `.env` Files**: None found in any source repository (clean).
- **Hardcoded Secrets**: Verified clean. Placeholders used in code fall back to environment variables.
- **Environment Templates**: Created documented `.env.example` files in each application root:
  - `apps/sampradaya/.env.example`
  - `apps/mandiwala/.env.example`
  - `apps/aroma/.env.example`
  - `apps/majesty/.env.example`
- **Git Safety**: Source repositories untouched in `backups/`. Monorepo initialized independently in `restaurant-ecosystem/`.

---

## 5. Technology Stack Matrix

| Dimension | Sampradaya | Mandiwala | Aroma | Majesty |
| :--- | :--- | :--- | :--- | :--- |
| **Next.js Version** | 16.3.1 | 16.3.1 | 16.2.9 | 16.2.9 |
| **React Version** | 19.2.8 | 19.2.8 | 19.2.4 | 19.2.4 |
| **Styling** | Tailwind CSS v4 (`@theme`) | Tailwind CSS v4 (`@theme`) | Tailwind CSS v3 | Tailwind CSS v3 |
| **Auth Provider** | Clerk (Scoped to `/admin`) | Clerk (Root Provider) | Clerk (Root Provider) | Clerk (Root Provider) |
| **Database** | Firebase Firestore | Firebase Firestore | Firebase Firestore | Firebase Firestore |
| **Storage / Media** | Cloudinary | Cloudinary SDK + Sign Route | Cloudinary + Firebase Storage | Cloudinary |
| **Smooth Scroll** | `@studio-freight/react-lenis` | `lenis` | `@studio-freight/react-lenis` | Native / Standard |
| **3D / Particles** | HTML5 Video Canvas | HTML5 Video Canvas | Three.js (`three`) + Video | HTML5 Video Canvas |
| **Ordering Flow** | Local Storage Cart + WA | Multi-portion Cart + WA | Multi-item Cart + WA | Authentic Mandi Cart + WA |
| **WhatsApp Target** | `+91 63035 63242` | `+91 85003 71100` | `+91 73311 22436` | `+91 95023 16909` |
