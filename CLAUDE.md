# CLAUDE.md - PRESTON2026 Development Guide

## Project Overview

**PRESTON2026** (Bridge MDX) is a specialized Electronic Health Records (EHR) SaaS platform for peptide therapy clinics. It's a three-sided marketplace connecting:

1. **Clinic** - Manage providers, patients, billing, analytics
2. **Providers** - Nurse Practitioners, PAs, Chiropractors managing patient treatments
3. **Patients** - Order peptides, track treatments, schedule appointments

**Tagline:** "Intelligence-first peptide care."

---

## Quick Start

```bash
cd PRESTON2026
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
| Framer Motion | Latest | Animations |
| Radix UI + shadcn/ui | Latest | 60+ UI components |
| React Hook Form + Zod | Latest | Form validation |
| Recharts | Latest | Data visualization |
| Lucide React | Latest | Icons |

### Critical Limitations

| Warning | Details |
|---------|---------|
| NO BACKEND | Zero API endpoints exist |
| NO DATABASE | All data resets on refresh |
| FAKE AUTH | Uses localStorage (demo only) |
| NOT HIPAA COMPLIANT | Cannot handle real patient data |
| BUILD ERRORS IGNORED | `next.config.mjs` ignores TypeScript errors |

---

## Design System

### Brand Colors (Role-Based)

| Role | Primary | Background | Badge |
|------|---------|------------|-------|
| Clinic | Gray-400 | Gray-700/50 | Gray-700/50 |
| Provider | Cyan-400 | Cyan-900/50 | Cyan-900/50 |
| Patient | Rose-400 | Rose-900/50 | Rose-900/50 |

### Visual Language

- **Dashed borders** for card containers and grids
- **Dark theme** (neutral-900 base) for main site
- **Light theme** (white) for Features section
- **Subtle gradients** for emphasis (cyan-950/30 for CTAs)
- **PixelCanvas animations** on hover for feature cards

### Typography

- Headlines: `font-extralight` for premium feel
- Body: `font-light` to `font-medium`
- Badges: `text-xs` or `text-[10px]`

---

## Homepage Structure

The landing page (`app/page.tsx`) has these sections:

1. **Header** - Fixed nav with logo, navigation, Sign In/Get Started
2. **Hero Section**
   - Headline: "Intelligence-first peptide care."
   - Subtitle explaining value prop
   - Two-card layout:
     - **Member Login** (left) - Role-based tabs for Clinic/Provider/Patient
     - **Start Your Clinic** (right) - Primary CTA with trust badges
3. **AI Section** - Three role cards showcasing Bridge AI capabilities
4. **Features Section** - Role-filtered feature grid (light theme)
5. **Why Bridge MDX** - Accordion with differentiators
6. **Blog Section** - Card stack with articles
7. **CTA Section** - Final conversion block
8. **Footer**

---

## Key Components

### Custom Components Created

| Component | Path | Purpose |
|-----------|------|---------|
| `PixelCanvas` | `/components/ui/pixel-canvas.tsx` | Hover animation with colored pixels |
| `FloatingChatWidget` | `/components/ui/floating-chat-widget.tsx` | Bottom-right AI chat popup |
| `AnimatedAIInput` | `/components/ui/animated-ai-input.tsx` | AI chatbot interface with custom icon |
| `AnimatedTabs` | `/components/ui/animated-tabs.tsx` | Role-based login tabs |
| `FeatureCard` | `/components/ui/grid-feature-cards.tsx` | Feature cards with PixelCanvas |
| `BlogCardStack` | `/components/blog-card-stack.tsx` | Stacked blog cards with modal |
| `BlogModal` | `/components/blog-modal.tsx` | Full article reader modal |
| `DigitalSerenity` | `/components/ui/digital-serenity-animated-landing-page.tsx` | Animated background |

### Assets

| Asset | Path | Purpose |
|-------|------|---------|
| Logo | `/public/bridgeicon.png` | Main logo |
| AI Icon | `/public/bridge-ai-icon.png` | Custom medical cross + EKG icon for AI |
| Favicon | `/public/bridge-ai-icon.png` | Browser tab icon |

---

## Directory Structure

```
PRESTON2026/
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
│   ├── layout.tsx                # Root layout with favicon
│   └── page.tsx                  # Landing page (main focus)
├── components/
│   ├── ui/                       # UI components
│   │   ├── pixel-canvas.tsx      # Hover animation component
│   │   ├── floating-chat-widget.tsx
│   │   ├── animated-ai-input.tsx
│   │   ├── animated-tabs.tsx
│   │   ├── grid-feature-cards.tsx
│   │   └── ... (60+ shadcn components)
│   ├── blog-card-stack.tsx
│   ├── blog-modal.tsx
│   ├── dashboard-layout.tsx
│   ├── protected-route.tsx
│   └── theme-provider.tsx
├── lib/
│   ├── auth-context.tsx          # Mock authentication
│   └── utils.ts                  # cn() helper
├── hooks/
│   ├── use-mobile.ts
│   └── use-toast.ts
├── public/
│   ├── bridgeicon.png            # Logo
│   ├── bridge-ai-icon.png        # AI icon (favicon + chat)
│   └── ... (images)
└── styles/
    └── globals.css
```

---

## User Roles & Permissions

| Role | Label | Can Access | Color |
|------|-------|------------|-------|
| `clinic_admin` | Clinic | `/clinic/*` | Gray |
| `provider` | Provider | `/provider/*` | Cyan |
| `patient` | Patient | `/patient/*` | Rose |

---

## Bridge AI

The AI assistant is available via:

1. **Floating Widget** - Bottom-right chat bubble (always visible)
2. **Homepage Section** - Role cards showcasing capabilities

### AI Features by Role

| Role | Capabilities |
|------|-------------|
| Clinic | Revenue forecasting, provider scheduling, compliance monitoring |
| Provider | Smart calculators, drug interactions, treatment recommendations |
| Patient | Treatment explanations, side effect guidance, injection instructions |

### Triggering the Chat Widget

```tsx
// Open the chat widget from anywhere
window.dispatchEvent(new CustomEvent("open-chat-widget"))
```

---

## Coding Conventions

### Component Pattern

```tsx
"use client"

import { cn } from "@/lib/utils"

interface MyComponentProps {
  className?: string
  // ... props
}

export function MyComponent({ className, ...props }: MyComponentProps) {
  return (
    <div className={cn("base-classes", className)} {...props}>
      {/* content */}
    </div>
  )
}
```

### PixelCanvas Usage

```tsx
import { PixelCanvas } from "@/components/ui/pixel-canvas"

// Inside a card with overflow-hidden
<div className="relative overflow-hidden">
  <PixelCanvas
    gap={10}           // Space between pixels
    speed={20}         // Animation speed
    colors={["#color1", "#color2", "#color3"]}
    variant="default"  // or "icon"
    noFocus           // Disable focus events
  />
  <div className="relative z-10">
    {/* Card content */}
  </div>
</div>
```

### Styling Patterns

```tsx
// Dashed border container
<div className="border border-dashed border-neutral-700 rounded-xl">

// Trust badge with checkmark
<div className="flex items-center gap-1.5">
  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" strokeWidth={2} />
  <span className="text-xs text-neutral-300">HIPAA Compliant</span>
</div>

// CTA button with glow
<Button className="bg-cyan-500 hover:bg-cyan-400 shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40">
  Get Started
</Button>
```

---

## Mock Data Locations

| Data Type | Location |
|-----------|----------|
| Peptide catalog (~70 items) | `/app/patient/peptides/page.tsx` |
| Blog posts | `/components/blog-card-stack.tsx` |
| Role features | `/app/page.tsx` (roleFeatures object) |
| Provider list | `/app/clinic/providers/page.tsx` |
| Patient list | `/app/provider/patients/page.tsx` |

---

## Common Commands

```bash
npm install --legacy-peer-deps  # Install (React 19 peer deps)
npm run dev                      # Dev server (localhost:3000)
npm run build                    # Production build
npm run lint                     # ESLint
```

---

## What Needs to Be Built

### Phase 1: Backend Foundation
1. Database schema (PostgreSQL)
2. API routes in `/app/api/`
3. Real authentication (NextAuth/Clerk)
4. Data fetching layer

### Phase 2: Core Features
5. Payment integration (Stripe Connect)
6. Order management
7. Appointment scheduling
8. File uploads

### Phase 3: Compliance
9. HIPAA audit logging
10. Data encryption
11. Role-based API auth
12. Session management

---

## Business Model

- **SaaS fees** from clinics (subscription)
- **Transaction fees** on peptide orders (12% take rate)
- **70+ peptides** across 11 categories ($45-$525)

---

## Recent Changes (January 2026)

- Rebranded from "PRESTON" to "Bridge MDX"
- Added custom AI icon (medical cross + EKG)
- Created floating chat widget for AI assistant
- Redesigned homepage with two-card hero layout
- Implemented PixelCanvas hover animations
- Added trust badges to Start Your Clinic card
- Unified design system with dashed borders
- Changed "Clinic Admin" to "Clinic" throughout

---

*Last updated: January 2026*
