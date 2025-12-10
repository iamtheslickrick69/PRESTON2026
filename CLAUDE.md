# CLAUDE.md - Bridge MDX Development Guide

## Project Overview

**Bridge MDX** is a specialized Electronic Health Records (EHR) SaaS platform for peptide therapy clinics. It's a three-sided marketplace connecting:

1. **Clinic Admins** - Manage providers, patients, billing, analytics
2. **Providers** - Nurse Practitioners, PAs, Chiropractors managing patient treatments
3. **Patients** - Order peptides, track treatments, schedule appointments

---

## Quick Start

```bash
git clone https://github.com/iamtheslickrick69/bridge-mdx.git
cd bridge-mdx
npm install --legacy-peer-deps
npm run dev
# Open http://localhost:3000
```

---

## Current State

The application is a **frontend-only prototype** built with:

| Technology | Version | Purpose |
|------------|---------|---------|
| Next.js | 15.5.7 | App Router framework |
| React | 19.1.0 | UI library |
| TypeScript | 5.x | Type safety (strict mode) |
| Tailwind CSS | 4.1.9 | Styling |
| Radix UI + shadcn/ui | Latest | 60+ UI components |
| React Hook Form + Zod | Latest | Form validation |
| Recharts | Latest | Data visualization |

### Critical Limitations

| Warning | Details |
|---------|---------|
| NO BACKEND | Zero API endpoints exist |
| NO DATABASE | All data resets on refresh |
| FAKE AUTH | Uses localStorage (demo only) |
| NOT HIPAA COMPLIANT | Cannot handle real patient data |
| BUILD ERRORS IGNORED | `next.config.mjs` ignores TypeScript errors |

---

## Directory Structure

```
bridge-mdx/
├── app/                          # Next.js App Router pages
│   ├── auth/                     # Login/register pages
│   │   ├── clinic-login/
│   │   ├── clinic-register/
│   │   ├── patient-login/
│   │   └── provider-login/
│   ├── clinic/                   # Clinic admin portal
│   │   ├── analytics/
│   │   ├── billing/
│   │   ├── dashboard/
│   │   ├── patients/
│   │   ├── providers/
│   │   ├── reports/
│   │   └── settings/
│   ├── provider/                 # Provider portal
│   │   ├── calculator/
│   │   ├── dashboard/
│   │   ├── dosing-guide/
│   │   ├── patients/
│   │   ├── peptides/
│   │   ├── reports/
│   │   └── resources/
│   ├── patient/                  # Patient portal
│   │   ├── calculator/
│   │   ├── dashboard/
│   │   ├── emergency/
│   │   ├── orders/
│   │   ├── peptides/
│   │   ├── resources/
│   │   ├── schedule/
│   │   └── shop/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx                  # Landing page
├── components/
│   ├── ui/                       # shadcn/ui primitives (60+ components)
│   ├── dashboard-layout.tsx      # Main layout wrapper with sidebar
│   ├── protected-route.tsx       # Role-based route protection
│   └── theme-provider.tsx
├── lib/
│   ├── auth-context.tsx          # Mock authentication context
│   └── utils.ts                  # Helper functions (cn for classnames)
├── hooks/
│   ├── use-mobile.ts
│   └── use-toast.ts
├── public/                       # Static assets (logos, peptide images)
└── styles/
    └── globals.css
```

---

## Key Files to Understand

| File | Purpose |
|------|---------|
| `lib/auth-context.tsx` | Mock auth with roles: `clinic_admin`, `provider`, `patient` |
| `components/protected-route.tsx` | Route protection by role |
| `components/dashboard-layout.tsx` | Sidebar navigation per role |
| `app/patient/peptides/page.tsx` | Full peptide catalog (70+ items) |
| `app/clinic/analytics/page.tsx` | Analytics dashboard with charts |
| `app/clinic/billing/page.tsx` | Revenue and transaction tracking |

---

## User Roles & Permissions

| Role | Can Access | Cannot Access |
|------|------------|---------------|
| `clinic_admin` | `/clinic/*` | `/provider/*`, `/patient/*` |
| `provider` | `/provider/*` | `/clinic/*`, `/patient/*` |
| `patient` | `/patient/*` | `/clinic/*`, `/provider/*` |

---

## Coding Conventions

### TypeScript
- Strict mode enabled
- Use proper types (no `any`)
- Define interfaces for all data structures

### Components
- Functional components with hooks
- Use shadcn/ui primitives from `/components/ui/`
- Check if component exists before creating new ones

### Naming Conventions

| Type | Convention | Example |
|------|------------|---------|
| Files | kebab-case | `dashboard-layout.tsx` |
| Components | PascalCase | `DashboardLayout` |
| Hooks | use-kebab-case | `use-mobile.ts` |
| Types/Interfaces | PascalCase | `PatientRecord` |
| Variables | camelCase | `patientData` |
| Constants | SCREAMING_SNAKE | `MAX_RETRY_COUNT` |

### Import Order

```tsx
// 1. React/Next.js
import { useState } from "react"
import { useRouter } from "next/navigation"

// 2. External packages
import { zodResolver } from "@hookform/resolvers/zod"

// 3. Internal components
import { Button } from "@/components/ui/button"
import { DashboardLayout } from "@/components/dashboard-layout"

// 4. Lib/utils
import { cn } from "@/lib/utils"
import { useAuth } from "@/lib/auth-context"

// 5. Types
import type { Patient } from "@/types"
```

### Styling
- Tailwind CSS only
- Use `cn()` utility for conditional classes
- Follow existing color/spacing patterns

### Forms
- React Hook Form for form state
- Zod schemas for validation
- Keep schemas co-located with forms

### State Management
- `AuthContext` for authentication state
- `useState`/`useReducer` for local component state
- Create new contexts in `/lib/` when global state needed

### Error Handling
- Use `sonner` for toast notifications
- Display errors via toast for user actions
- Console errors for debugging only

---

## Mock Data Locations

All data is hardcoded inline. Key locations:

| Data Type | Location |
|-----------|----------|
| Peptide catalog (~70 items) | `/app/patient/peptides/page.tsx` |
| Provider list | `/app/clinic/providers/page.tsx` |
| Patient list | `/app/provider/patients/page.tsx` |
| Transactions | `/app/clinic/billing/page.tsx` |
| Analytics data | `/app/clinic/analytics/page.tsx` |

---

## Common Commands

```bash
npm install --legacy-peer-deps  # Install dependencies (peer dep conflicts with React 19)
npm run dev                      # Start dev server (localhost:3000)
npm run build                    # Production build
npm run lint                     # Run ESLint
```

---

## Environment Variables

Currently none required. When backend is added:

```bash
# .env.local
DATABASE_URL=postgresql://...
NEXTAUTH_SECRET=your-secret-key
NEXTAUTH_URL=http://localhost:3000

# Stripe (for payments)
STRIPE_SECRET_KEY=sk_...
STRIPE_PUBLISHABLE_KEY=pk_...
STRIPE_WEBHOOK_SECRET=whsec_...

# External APIs
LABCORP_API_KEY=
QUEST_API_KEY=
```

---

## What Needs to Be Built

### Phase 1: Backend Foundation (Critical)
1. Database schema (PostgreSQL) - Users, Clinics, Providers, Patients, Peptides, Orders
2. API routes in `/app/api/` - RESTful endpoints for all CRUD operations
3. Real authentication - Replace localStorage mock with NextAuth/Clerk
4. Data fetching - Replace hardcoded data with API calls

### Phase 2: Core Features
5. Payment integration (Stripe Connect for marketplace)
6. Order management system
7. Appointment scheduling with calendar integration
8. File upload for patient documents

### Phase 3: Compliance (Healthcare)
9. HIPAA audit logging
10. Data encryption at rest
11. Role-based API authorization
12. Session management with timeout

---

## Business Model Context

- **SaaS fees** from clinics (subscription)
- **Transaction fees** on peptide orders (12% take rate)
- **70+ peptides** across 11 categories ($45-$525 price range)
- Categories: Healing & Recovery, Growth Hormone, Weight Management, Cognitive Enhancement, Anti-Aging, Sexual Health, Sleep & Recovery, Peptide Blends

---

## When Making Changes

1. **Check `/components/ui/`** before creating new components
2. **Follow existing patterns** in similar pages
3. **Use Zod schemas** for any form validation
4. **Add TypeScript types** for all new data structures
5. **Test all three user roles** when changing shared components
6. **Keep peptide data centralized** when refactoring
7. **Don't commit `.env` files** - add to `.gitignore`

---

## Git Workflow

```bash
# Branch naming
feature/add-patient-search
fix/auth-redirect-loop
chore/update-dependencies

# Commit messages
feat: add patient search functionality
fix: resolve auth redirect loop
docs: update README with setup instructions
```

---

## Related Documentation

- `PRD.md` - Full product requirements and vision (see separate file)
- [shadcn/ui docs](https://ui.shadcn.com/) - Component library reference
- [Next.js App Router](https://nextjs.org/docs/app) - Routing documentation

---

*Last updated: December 2024*
