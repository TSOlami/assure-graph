# AGENTS.md

## Cursor Cloud specific instructions

### Project Overview

This is a monorepo with two Next.js GRC (Governance, Risk, and Compliance) platform variants:

| Directory | Framework | Purpose |
|---|---|---|
| `assure-graph-copy/` | Next.js 16, React 19, Tailwind v4 | **Primary/active** app — actively developed |
| `assuregraph-source/` | Next.js 14, React 18, Tailwind v3 | **Reference/source** — visual design reference (has pre-existing build errors) |

### Running the Application

- **Primary app** (`assure-graph-copy`): `cd assure-graph-copy && npm run dev` (runs on port 3000)
- The source project (`assuregraph-source`) has a pre-existing TypeScript error (`FileText` not imported in `app/dashboard/page.tsx`) that prevents `npm run build`. Its `next.config.js` uses `output: 'export'` with `distDir: 'dist'`, which can conflict with the dev server if the `dist` directory exists. Remove `dist` before running dev.

### Key Commands (assure-graph-copy)

| Command | Description |
|---|---|
| `npm run dev` | Start dev server (Turbopack, port 3000) |
| `npm run build` | Production build |
| `npm run lint` | ESLint (uses flat config via `eslint-config-next`) |

### Caveats

- **No backend/database**: All data is hardcoded mock data. No `.env` files, no API calls, no authentication. Login/onboarding pages are UI mockups that navigate via client-side routing.
- **Tailwind v4 (CSS-based config)**: The copy uses Tailwind CSS v4 configured via `@import "tailwindcss"` and `@theme inline` in `src/app/globals.css` — there is no `tailwind.config.ts`.
- **Brand color**: `#E85A2B` is the primary brand color, used directly in Tailwind classes (e.g., `bg-[#E85A2B]`).
- **Icons**: The copy uses Lucide React icons (`lucide-react`). Do NOT use LineIcons.
- **Fonts**: Inter (mapped to `--font-geist-sans`) and Irish Grover (`--font-logo`) loaded via `next/font/google`.
- **Pre-existing lint errors**: There are ~7 pre-existing ESLint errors in files like `UploadEvidenceContent.tsx`, `AIVisualizations.tsx`, `GetStarted.tsx`, `PolicyTable.tsx`. These are not blockers.
- **Page routing**: Dashboard pages use flat routes (e.g., `/controls`, `/task`, `/vendors`) rather than nested `/dashboard/*` routes like the source.
