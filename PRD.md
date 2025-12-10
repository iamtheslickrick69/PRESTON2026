# Bridge MDX - Product Requirements Document (PRD)

**Version:** 1.0.0
**Last Updated:** December 2024
**Status:** Vision Specification

> **Note:** This document describes the full product vision and requirements. For current implementation state and how to work with the existing codebase, see `CLAUDE.md`.

---

## Table of Contents

1. [Executive Summary](#executive-summary)
2. [Project Identity](#project-identity)
3. [Target Market](#target-market)
4. [Competitive Analysis](#competitive-analysis)
5. [System Architecture](#system-architecture)
6. [User Portals & Access Control](#user-portals--access-control)
7. [Database Schema](#database-schema)
8. [Clinical Documentation & EHR](#clinical-documentation--ehr)
9. [Product Libraries](#product-libraries)
10. [RUO Compliance Framework](#ruo-compliance-framework)
11. [Pricing & Financial Model](#pricing--financial-model)
12. [Analytics & Reporting](#analytics--reporting)
13. [Emergency Telemedicine](#emergency-telemedicine)
14. [Partner Ecosystem](#partner-ecosystem)
15. [UI/UX Specifications](#uiux-specifications)
16. [Dosing Tools](#dosing-tools)
17. [Mobile App Requirements](#mobile-app-requirements)
18. [API Integrations](#api-integrations)
19. [Security & Compliance](#security--compliance)
20. [Technical Stack](#technical-stack)
21. [Development Phases](#development-phases)
22. [Success Metrics](#success-metrics)
23. [Appendices](#appendix-a-glossary)

---

## Executive Summary

Bridge MDX is a comprehensive, HIPAA-compliant, cash-pay Electronic Health Record (EHR) and practice management platform specifically designed for functional medicine clinics, wellness centers, aesthetic clinics, med spas, IV therapy clinics, and similar cash-pay healthcare providers.

### Core Differentiator

Innovative Research Use Only (RUO) peptide therapy management system with integrated product dispensary and unique financial model that protects providers while ensuring regulatory compliance.

### Value Propositions

- **All-in-one platform** combining EHR, practice management, patient engagement, and e-commerce
- **Specialized RUO peptide therapy** compliance framework with legal documentation workflows
- **Integrated product store** (like Fullscript) with clinic-controlled profit margins
- **Auto-charting functionality** that documents provider actions in real-time
- **Comprehensive analytics** and research reporting capabilities
- **Emergency telemedicine feature** providing instant provider access for patient safety
- **Unique financial model** protecting providers from RUO resale liability

### Business Model

```
Revenue Streams:
├── SaaS Fee: ~$500/month per clinic
├── Transaction Fee: 3-5% of GMV
├── Average clinic GMV: $73,000/month
└── Blended revenue per clinic: ~$2,690/month

At Scale:
├── 100 clinics = $269K MRR ($3.2M ARR)
├── 300 clinics = $807K MRR ($9.7M ARR)
└── Exit potential: $50-100M (Fullscript, Practice Better, pharma distributor)
```

---

## Project Identity

**Project Name:** Bridge MDX
**Tagline:** "Functional Medicine Optimized — Charts-on-the-go!"

**Description:** Comprehensive software solution designed for molecular intelligence & data to power functional health decisions.

### Vision Statement

Create the most robust and comprehensive functional medicine clinic EHR software that empowers providers to deliver molecular intelligence and data-driven functional health decisions while operating within a risk-mitigated, compliant framework for research peptide therapies.

### Mission

Replace fragmented clinic workflows with an all-in-one platform combining EHR, practice management, patient engagement, e-commerce, and research compliance—eliminating the need for Fullscript, separate EHRs, and manual peptide tracking.

---

## Target Market

### Primary Markets

| Segment | Description | Est. Count (US) |
|---------|-------------|-----------------|
| Functional Medicine Clinics | Core target, peptide-forward practices | ~500 |
| Men's Health/TRT Clinics | Testosterone + peptide therapy | ~2,000 |
| Med Spas with Medical Programs | Aesthetic + wellness services | ~5,000 |
| IV Therapy Clinics | Hydration, vitamins, NAD+ | ~3,000 |
| Weight Loss Clinics | GLP-1, Semaglutide, Tirzepatide | ~4,000 |
| Longevity/Anti-Aging Clinics | Fastest growing segment | ~1,500 |
| Direct Primary Care (DPC) | Membership-based practices | ~2,000 |
| Concierge Medicine | High-touch, cash-pay | ~1,000 |

**Serviceable TAM:** ~3,000 clinics actively doing peptide therapy at scale
**Realistic Year 1-2 Penetration:** 10% = 300 clinics

---

## Competitive Analysis

### Feature Matrix

| Feature | Cerbo | OptiMantra | Practice Better | CharmHealth | PatientNow | **Bridge MDX** |
|---------|-------|------------|-----------------|-------------|------------|----------------|
| Cash-Pay Focus | ✓ | ✓ | ✓ | Partial | ✓ | ✓ |
| Functional Med Charting | ✓ | ✓ | ✓ | Partial | Limited | ✓ |
| Peptide Protocol Mgmt | Limited | Limited | ✗ | ✗ | ✗ | **✓** |
| RUO Compliance System | ✗ | ✗ | ✗ | ✗ | ✗ | **✓** |
| Integrated Store | Fullscript | ✗ | Fullscript | Partial | ✗ | **Native** |
| IV/Injection Protocols | ✓ | ✓ | Limited | ✗ | ✓ | ✓ |
| Auto-Charting | Partial | Partial | ✗ | AI Scribe | ✗ | **✓** |
| Emergency Telemedicine | ✗ | ✗ | ✗ | ✗ | ✗ | **✓** |
| Dosing Calculator | ✗ | ✗ | ✗ | ✗ | ✗ | **✓** |

### Competitive Insights

**Cerbo** - Best current functional medicine EHR. Strong charting with "Chart Parts" templating, Fullscript integration, 50+ lab integrations. *Gap: No dedicated peptide management or RUO compliance.*

**Practice Better** - Strong patient engagement, programs/courses, mobile app. *Gap: Less clinical depth, no peptide support.*

**CharmHealth** - AI-powered ambient scribe, comprehensive free tier. *Gap: Not optimized for cash-pay, no functional medicine focus.*

**Our Advantage:** First-mover in peptide clinic vertical with deep clinical workflows, RUO compliance framework, and transaction layer on every order.

---

## System Architecture

### Platform Overview

Cloud-based, HIPAA-compliant SaaS platform with:
- Multi-tenant architecture (clinic data isolation)
- Role-based access control (RBAC)
- Real-time data synchronization
- Audit logging for all actions
- Encrypted data at rest and in transit

### Four User Portals

```
Bridge MDX Platform
├── Clinic Admin Portal (Practice owners, office managers)
├── Provider Portal (MDs, NPs, PAs, DCs, RNs, MAs)
├── Patient Portal (Patients/clients)
└── Partner Portal (Suppliers, labs, pharmacies)
```

---

## User Portals & Access Control

### 1. Clinic Admin Portal

**Primary Users:** Practice owners, office managers

**Capabilities:**
- Full system configuration and clinic settings
- Provider management (add, edit, permissions, active/inactive toggle)
- Patient roster management (view all patients across clinic)
- Billing setup and payment processing configuration
- Pricing and margin controls (per-product and blanket margins)
- Comprehensive analytics and reporting dashboards
- HR functions (payroll, employee documents, W-9s)
- Template creation (HIPAA forms, BAAs, RUO disclosures, intake forms)
- API connections (QuickBooks, labs, merchant processing)
- AI settings configuration

**Dashboard KPIs:**
- Total Patients (count + % change)
- Active Providers (count + breakdown by type)
- Monthly Revenue ($ + % change)
- Peptide Orders (count this month)
- Supplement Orders
- HRT Orders
- Injectable Orders
- IV Bag Orders
- Partner Product Orders

**Navigation:**
- Dashboard
- Providers
- Patients
- Analytics
- Billing
- Reports
- Settings

### 2. Provider Portal

**Primary Users:** MDs, DOs, NPs, PAs, DCs, RNs, MAs, PTs, Medical Students

**Capabilities:**
- Patient records and clinical charting with auto-charting
- Treatment plan creation and protocol management
- Prescribing from integrated product libraries
- Lab orders and results review (LabCorp, Quest integration)
- Scheduling and appointment management
- Dosing calculator and reconstitution tools
- Peptide cheat sheets and dosing guides
- Reports generation
- Access to patient order history

**Dashboard KPIs:**
- My Patients (count + new this month)
- Active Treatments (ongoing peptide therapies)
- Today's Appointments (count + next time)
- Pending Orders (awaiting approval)

**Quick Actions:**
- Create Patient Portal (New Patient)
- View Schedule
- Peptide Library
- Dosing Guide
- Calculator
- Resources
- View Reports

### 3. Patient Portal

**Primary Users:** Patients/clients

**Capabilities:**
- View personal health records and active treatments
- Treatment progress tracking with visual indicators
- Upcoming appointments with telehealth join buttons
- Health metrics dashboard (weight, body fat, energy, sleep quality)
- Order peptides/supplements from personalized store
- Track orders (processing, shipped, delivered)
- Complete consent forms and video questionnaires
- Message provider
- Refill requests
- View lab results
- Educational resources

**Dashboard KPIs:**
- Active Prescriptions (count)
- Next Appointment (date + time + provider)
- Treatment Progress (%)
- Recent Labs (count needing review)

**Displayed Information:**
- Active prescriptions with progress bars
- Days remaining on current treatment
- Health metrics with trend indicators
- Upcoming appointments with join buttons
- Quick actions (Order Peptides, Track Orders, View Medical Records)

### 4. Partner Portal

**Primary Users:** Suppliers, labs, compounding pharmacies

**Capabilities:**
- Product catalog management (add, update, pricing)
- Inventory and stock updates
- Order processing and fulfillment
- API configuration
- COA (Certificate of Analysis) uploads
- Batch/lot tracking
- Performance analytics

### Access Permissions Matrix

| Permission | Admin | MD/DO | NP/PA | DC | RN | MA |
|------------|-------|-------|-------|----|----|-----|
| View Patients | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| Create Patient Portals | ✓ | ✓ | ✓ | ✓ | ✗ | ✗ |
| Edit Medical Records | ✓ | ✓ | ✓ | ✓ | ✓ | ✗ |
| Prescribe Products | ✓ | ✓ | ✓ | ✓ | ✗ | ✗ |
| View Analytics | ✓ | ✓ | ✓ | ✓ | ✗ | ✗ |
| Manage Billing | ✓ | ✗ | ✗ | ✗ | ✗ | ✗ |
| Delete Patients | ✓ | ✗ | ✗ | ✗ | ✗ | ✗ |
| Delete Notes/Charts | ✓ | ✗ | ✗ | ✗ | ✗ | ✗ |

---

## Database Schema

### Core Entities

#### Clinic
```
Clinic
├── clinic_id (auto-generated)
├── name
├── specialty
├── logo_url
├── license_npi
├── tax_id_ein
├── addresses[] (billing, shipping, multiple locations)
├── phone, email, website
├── operating_hours
├── owner_info (name, cell, email)
├── bank_info (encrypted: bank_name, account_number, routing_number)
├── pricing_config
│   ├── clinic_margin_percent (0-20%+)
│   ├── software_fee_percent
│   └── standard_shipping_fee
├── created_at
└── settings (permissions, API keys, AI config)
```

#### Provider
```
Provider
├── provider_id
├── clinic_id (FK)
├── first_name, last_name
├── email, phone
├── provider_type (MD, DO, NP, PA, DC, RN, MA, PT, Other)
├── license_number, license_state
├── npi_number, dea_number
├── permissions[]
├── patient_count
├── join_date
├── is_active
└── emergency_telemedicine_enabled (boolean)
```

#### Patient
```
Patient
├── patient_id (auto-generated, format: P-XXXXXX)
├── clinic_id (FK)
├── provider_id (FK, primary provider)
├── start_date
├── demographics
│   ├── name (first, last)
│   ├── dob
│   ├── gender
│   ├── ethnicity
│   ├── address
│   ├── phone, email
│   └── emergency_contact
├── physical
│   ├── height
│   ├── weight
│   └── blood_type
├── medical_history
│   ├── allergies[]
│   ├── current_medications[]
│   └── conditions[]
├── research_project_enrolled (boolean)
├── consent_forms[]
├── is_active
├── last_visit
└── created_at
```

#### Treatment
```
Treatment
├── treatment_id
├── patient_id (FK)
├── provider_id (FK)
├── type (peptide, supplement, hormone, injectable, iv_therapy, prescription, protocol)
├── product_id (FK)
├── dosing_schedule
│   ├── dose_amount
│   ├── dose_unit
│   ├── frequency
│   └── route
├── start_date, end_date
├── status (active, completed, paused, discontinued)
├── progress_percentage
├── notes
└── adverse_events[]
```

#### Product
```
Product
├── product_id
├── supplier_id (FK)
├── name
├── category (peptide, supplement, hormone, injectable, iv, device, lab)
├── subcategory (growth_hormone, healing_recovery, weight_management, etc.)
├── description
├── common_dose
├── frequency
├── route (subcutaneous, intramuscular, oral, sublingual, topical, IV)
├── base_price
├── image_url
├── requires_research_consent (boolean)
├── is_active
└── metadata
    ├── vial_size
    ├── mg_per_vial
    └── reconstitution_info
```

#### Order
```
Order
├── order_id (format: ORD-XXXXXX)
├── patient_id (FK)
├── clinic_id (FK)
├── provider_id (FK)
├── items[]
│   ├── product_id
│   ├── quantity
│   └── unit_price
├── subtotal
├── clinic_margin_amount
├── software_fee_amount
├── shipping_amount
├── tax_amount
├── total
├── status (processing, shipped, delivered, cancelled)
├── tracking_number
├── ship_to (clinic | patient_home)
├── placed_at
├── shipped_at
├── delivered_at
└── ruo_consent_signed (boolean)
```

#### Supplier
```
Supplier
├── supplier_id
├── name (Alpha BioMed, Strive Pharmacy, BioLongevity, etc.)
├── type (peptide, pharmacy, supplements, medical_supplies)
├── contact_info
├── api_config
├── products[]
└── is_active
```

#### Visit
```
Visit
├── visit_id
├── patient_id (FK)
├── provider_id (FK)
├── visit_date
├── type (initial_consultation, follow_up, telehealth)
├── chief_complaint
├── notes (structured JSON - see Charting section)
├── vitals
├── assessment
├── plan
└── follow_up_instructions
```

#### LabResult
```
LabResult
├── lab_id
├── patient_id (FK)
├── provider_id (FK)
├── lab_source (labcorp, quest, manual)
├── test_type
├── results_data (JSON)
├── ordered_at
├── received_at
├── reviewed (boolean)
├── provider_notes
└── is_abnormal (boolean)
```

#### AdverseEvent
```
AdverseEvent
├── event_id
├── patient_id (FK)
├── product_id (FK)
├── reported_at
├── symptoms[]
├── severity (mild, moderate, severe)
├── outcome
├── reported_by (patient | provider)
└── notes
```

#### ConsentForm
```
ConsentForm
├── consent_id
├── patient_id (FK)
├── type (hipaa, ruo_disclosure, research_consent, hold_harmless, video_consent)
├── signed_at
├── signature_data
├── video_url (for video consents)
├── ip_address
└── is_valid
```

---

## Clinical Documentation & EHR

### Auto-Charting Feature

All provider clicks and actions during a patient visit automatically populate the corresponding note fields. This dramatically reduces documentation time while ensuring comprehensive records.

**How it works:**
1. Provider clicks through exam findings, symptoms, treatments
2. System auto-generates clinical note text
3. Provider reviews and signs off
4. Target: 50% reduction in charting time

### Functional Medicine Charting Sections

```
Clinical Note Structure
├── Chief Complaint
│   └── Primary reason for visit, symptom description
├── HPI (History of Present Illness)
│   └── Timeline and progression
├── Review of Systems
│   └── Multi-system symptom checklist
├── Physical Exam
│   └── Examination findings, vitals, measurements
├── Nutrition
│   └── Dietary assessment, food sensitivities, meal planning
├── Sleep
│   └── Quality, duration, hygiene, HRV tracking
├── Stress/Mindset
│   └── Cortisol support, breathwork, meditation plans
├── Exercise
│   └── Activity level, resistance training, cardio, rehab
├── Environmental Factors
│   └── Toxin exposure, living/work environment assessment
├── Gut/Digestion
│   └── GI symptoms, microbiome status, digestive function
├── Hormone Overview
│   └── Levels, symptoms, treatment response
├── Metabolic Overview
│   └── Markers, blood sugar, lipids, inflammation
├── Peptide Notes
│   └── Active peptides, dosing, reconstitution, response
├── Supplement Notes
│   └── Current supplements, compliance, interactions
├── Hormone Therapy Notes
│   └── HRT protocols, levels, symptom tracking
├── Injection/IV Notes
│   └── Formulas, protocols, administration logs
├── Lab Interpretation
│   └── Results analysis, trending, optimal ranges
├── Progress Tracking
│   └── Pain scores, weight, energy, symptom questionnaires
├── Clinical Risk/Consent
│   └── Risk documentation, consent records
├── Assessment
│   └── Clinical conclusions
├── Plan
│   └── Treatment plan, next steps
└── Follow-Up Instructions
    └── Timing, monitoring, alerts
```

### Patient Record Horizontal Menu

- Overview (demographics, medical info, current conditions)
- Active Treatment Plan
- Library (all product libraries)
- Lab Results
- Visit History
- Notes

---

## Product Libraries

### Peptide Library

**Categories:**
- Growth Hormone Secretagogues
- Healing & Recovery
- Weight Management
- Sleep & Recovery
- Cognitive Enhancement
- Anti-Aging
- Immune Support

**Sample Products:**

| Product | Category | Common Dose | Frequency | Route | Price |
|---------|----------|-------------|-----------|-------|-------|
| BPC-157 (5mg) | Healing & Recovery | 250-500 mcg | 1-2x daily | Subcutaneous/Oral | $45 |
| BPC-157 (10mg) | Healing & Recovery | 250-500 mcg | 1-2x daily | Subcutaneous/Oral | $75 |
| TB-500 (5mg) | Healing & Recovery | 2-2.5 mg | 2x weekly | Subcutaneous | $65 |
| CJC-1295 No DAC (5mg) | Growth Hormone | varies | varies | Subcutaneous | varies |
| CJC-1295 with DAC (10mg) | Growth Hormone | varies | varies | Subcutaneous | varies |
| Ipamorelin (5mg) | Growth Hormone | varies | varies | Subcutaneous | varies |
| Semaglutide | Weight Management | varies | weekly | Subcutaneous | varies |
| Tirzepatide | Weight Management | varies | weekly | Subcutaneous | varies |
| PT-141 | Sexual Health | varies | as needed | Subcutaneous | varies |
| Melanotan II | Tanning/Libido | varies | varies | Subcutaneous | varies |

**Product Card Display:**
```
┌─────────────────────────────────────────────────────────────┐
│ BPC-157 (5mg)                          [Healing & Recovery] │
│ Body Protection Compound-157                                │
│                                                             │
│ [Product Image]                                             │
│                                                             │
│ Promotes healing of muscles, tendons, and ligaments.        │
│ Supports gut health and tissue repair.                      │
│                                                             │
│ Common Dose:        250-500 mcg                             │
│ Frequency:          1-2x daily                              │
│ Route:              Subcutaneous or Oral                    │
│ Price:              $45                                     │
│                                                             │
│ [View Details]                                              │
└─────────────────────────────────────────────────────────────┘
```

### Supplement Library

- Magnesium (various forms)
- Probiotics
- Digestive Enzymes
- Multi-vitamins
- Vitamin B12
- Vitamin D3 + K2
- Fish Oil / Omega-3
- NAC
- Glutathione
- CoQ10
- Electrolytes
- Adaptogens

### Hormone Library

- Testosterone (creams, pellets, injections)
- Progesterone
- Estrogen / Estradiol
- Thyroid (T3/T4)
- DHEA
- Pregnenolone

### Injectable Library

- Vitamin B12 injections
- Lipotropic injections (MIC, Lipo-C)
- NAD+ injections
- Ozone therapy
- Glutathione injections

### IV Therapy Library

- Myers' Cocktail
- Hydration drips
- Immunity formulas
- Athletic Performance
- Anti-Aging / Longevity
- Hangover Recovery
- NAD+ drips
- High-dose Vitamin C

### Device Library

- Continuous Glucose Monitor (CGM)
- Pulse Oximeter
- Blood Pressure Monitor
- Wearables (Oura, Whoop, etc.)

### Lab Library

- Hormone panels
- Thyroid panels (TSH, T3, T4, antibodies)
- Comprehensive Metabolic Panel (CMP)
- Complete Blood Count (CBC)
- Peptide response panels
- Metabolic markers
- GI-Map (stool testing)
- Organic Acids Test (OAT)
- DNA/Genetic tests
- Food sensitivity panels

---

## RUO Compliance Framework

### The Legal Innovation

Bridge MDX eliminates provider liability through a unique transaction structure where:
- Patient purchases **directly from the lab/manufacturer**
- Software fee model **replaces traditional product markup**
- **Eliminates perception** of reselling RUO products for profit
- Complete **documentation trail** for regulatory compliance

### Research Project Enrollment

Patients seeking peptide therapy must opt-in to the Research Project:

1. **Research-Use Consent**
   - Comprehensive acknowledgment of RUO product status
   - Understanding that products are not FDA-approved for human use

2. **IRB-Style Documentation**
   - Institutional review board format compliance documentation
   - Research protocol documentation

3. **Patient Agreements & Disclaimers**
   - Hold harmless agreements
   - Risk acknowledgment
   - Indemnification

4. **Video Consent Record**
   - Recorded Q&A confirming patient understanding
   - Stored securely with audit trail
   - Timestamp and IP logging

5. **Research Mouse Identification**
   - Patient designated as research participant in system
   - Enables research data collection and reporting

### Prescribing Workflow

```
1. Provider → Patient Record
2. Select peptide from library → "+ Prescribe to Patient"
3. System → Store portal (under patient record)
4. Select shipping → Clinic OR Patient Home
5. RUO Disclosure Popup → Patient signature required
6. Order placed → Directly with partner lab
7. Patient charged → Cost + Tax + Shipping + Software Fee
8. Clinic receives → Margin automatically
```

### Batch/Lot Tracking

For each peptide order:
- Source manufacturer
- Batch/Lot number
- COA (Certificate of Analysis) upload
- Expiration date
- Storage requirements
- Temperature logs (if applicable)

### Adverse Event Reporting

- Patient self-reporting capability
- Provider documentation
- Severity classification (Mild, Moderate, Severe)
- Product attribution
- FDA MedWatch integration (future)
- Trend analysis and alerts

---

## Pricing & Financial Model

### Software Pricing

| Component | Price |
|-----------|-------|
| Base subscription | $100-150/month |
| Additional users | $10/user/month |
| Usage fee | Based on transaction volume |

### Transaction Structure

```
Patient Pays = Product Cost + Clinic Margin + Software Fee + Shipping + Tax

┌─────────────────────────────────────────┐
│ Pricing Example                         │
├─────────────────────────────────────────┤
│ Peptide Cost:           $100.00         │
│ Clinic Margin (15%):    + $15.00        │
│ Software Fee (5%):      + $5.00         │
│ Shipping:               + $10.00        │
│ Tax (8%):               + $10.40        │
├─────────────────────────────────────────┤
│ Patient Pays:           $140.40         │
└─────────────────────────────────────────┘
```

### Clinic Settings

Clinics can configure:
- **Clinic Profit Margin (%)** - 0% to 20%+ added to product cost
- **Software Fee (%)** - Platform fee (must equal or exceed margin for legal protection)
- **Standard Shipping Fee ($)** - Flat rate per order
- **Per-product margins** - Override blanket margin for specific products

### Revenue Distribution Example

```
Average Clinic Monthly Performance:
├── Total Revenue: $73,000
├── Total Orders: 290
├── Average Order Value: $252
├── Profit Margin: 32%
└── Patient Retention: 87%

Revenue Split:
├── Peptide Sales: 79% ($57,670)
├── Clinic Profit Margin: 12% ($8,760)
├── Software Fees: 4% ($2,920)
└── Shipping Fees: 5% ($3,650)
```

### Bridge MDX Revenue Model

```
Per Clinic Monthly Revenue:
├── SaaS Fee: ~$500
├── Transaction Fee (3% of $73K): ~$2,190
└── Total: ~$2,690/clinic/month

At Scale:
├── 100 clinics: $269K MRR ($3.2M ARR)
├── 300 clinics: $807K MRR ($9.7M ARR)
└── 500 clinics: $1.35M MRR ($16.1M ARR)
```

---

## Analytics & Reporting

### Dashboard Metrics

| Metric | Display |
|--------|---------|
| Total Revenue | Dollar amount + % change vs last month |
| Total Orders | Count + % change |
| Total Patients | Count + % change |
| Avg Rating | Star rating (e.g., 4.8 based on 218 reviews) |
| Adverse Events | Count + severity breakdown |

### Analytics Categories

#### Revenue Analytics
- Revenue trend charts
- Average order dollar amount (+ % change)
- Profit margin percentage (+ % change)
- Customer retention percentage (+ % change)

#### Peptide Analytics
- Most Ordered Peptides (bar chart)
- Revenue by Peptide (pie chart)
- Peptide Performance Summary (table)
  - Peptide name
  - Number of orders
  - Total revenue

#### Provider Analytics
- Revenue per provider
- Patients seen
- Average visit value
- Conversion rates
- No-show rates

#### Patient Demographics
- Age distribution
- Gender breakdown
- Geographic distribution
- New patients (last 30 days)

#### Adverse Effects Dashboard
- All reported side effects with severity
- Product attribution
- Total events per product
- Trend analysis
- Key insights

### Reports Categories

#### Peptide Reports

**Operational:**
- Active peptide cycles
- Reconstitution logs
- Lot numbers & expiration
- Prescriptions by peptide
- Provider peptide usage
- Temperature logs
- Inventory depletion & projections
- RUO tracking
- Multi-peptide stacks used

**Outcome:**
- Symptom improvements per peptide
- Weight/fat loss correlations
- Pain reduction
- Recovery time
- Before/after metrics
- Side effects by peptide
- Protocol success rates (BPC alone vs BPC+TB500)

**Financial:**
- Revenue by peptide
- Margins by peptide
- Top sellers
- Cost vs revenue
- Refill revenue
- Forecasting

#### Additional Report Categories
- Supplements (same structure)
- Hormone Therapy (same structure)
- Injections (same structure)
- IV Therapy (same structure)
- Diet Plans
- Exercise Plans
- Lab Orders
- Protocols
- Monitoring
- Provider Performance
- Clinic Financial
- Inventory
- Patient Engagement
- Scheduling & Operations
- Compliance & Legal
- Research (cohort tracking, IRB-ready export)
- Commerce (abandoned carts, AOV, LTV, funnels)

---

## Emergency Telemedicine

### Purpose

This feature serves dual purposes:
1. **Patient Safety** - Immediate access to provider for concerns
2. **Regulatory Protection** - Demonstrates robust safety protocols for RUO therapy

### How It Works

```
1. Patient presses "Immediate Telemedicine Visit" in app
2. System texts provider directly on cell phone
3. Message includes:
   ├── Emergency subject line
   ├── Patient demographics
   └── Current treatment plan "at-a-glance"
4. Provider can immediately:
   ├── Call patient
   ├── Text patient
   └── Pass to next available provider
```

### Strategic Value

- **Rarely used** but demonstrates proactive safety
- Creates **shield from FDA scrutiny**
- Data proves **peptides rarely require ER/ED attention**
- No other EHR offers this (competitive advantage)
- Can be toggled on/off by provider (encouraged to keep on)
- All utilization is logged for compliance reporting

### Data Collection

Track and report:
- Utilization frequency
- Reason for contact
- Resolution type
- Time to response
- Escalation to ER (rare)
- Outcomes

---

## Partner Ecosystem

### Current/Target Partners

#### Peptide Suppliers
| Partner | Type | Status |
|---------|------|--------|
| Alpha BioMed (Paramount) | Primary peptide supplier | Active |
| BioLongevity | Research products | Target |
| OptiYouRx | Pharmaceutical | Target |

#### Compounding Pharmacies
| Partner | Type | Status |
|---------|------|--------|
| Strive Pharmacy | Compounding | Active |
| Tailor Compounding | Backup | Target |
| Empower Pharmacy | Backup | Target |
| Olympia Pharmacy | Backup | Target |
| Hallandale Pharmacy | Backup | Target |

#### Medical Supplies
- BellMed Supplies

#### Supplements (Potential)
- Ortho Molecular Products
- Simply Nutrition
- Fullscript

#### Regenerative Medicine
- Stem cell suppliers
- PRP suppliers

#### Strategic Partners
- Aviva Aesthetics Private Equity (Audrey Neff)
- Florida Healthcare Law Firm (Attorney Jeff Cohen)

### Multi-Supplier Architecture

The system must support multiple suppliers:

```
Supplier Abstraction Layer
├── Supplier entity with API configuration
├── Per-supplier product catalogs
├── Per-supplier pricing
├── Automatic failover if primary unavailable
├── Supplier performance tracking
└── Easy addition of new suppliers
```

**Priority:** De-risk Alpha BioMed dependency by adding 2-3 backup suppliers in first 90 days.

---

## UI/UX Specifications

### Design Principles

- Clean, minimal, professional aesthetic
- White/light gray backgrounds with subtle shadows
- Black primary buttons, white/outline secondary buttons
- Card-based layouts for data display
- Clear visual hierarchy
- Responsive design (desktop, tablet, mobile)
- Consistent 8px spacing grid

### Navigation Pattern

```
┌─────────────────────────────────────────────────────────────┐
│ [Logo]                                    Demo User    [→]  │
│                                           user@email.com    │
├──────────────┬──────────────────────────────────────────────┤
│              │  🏠 > Clinic > Dashboard                     │
│  Dashboard   │                                              │
│  Providers   │  Page Title                                  │
│  Patients    │  Page description                            │
│  Analytics   │                                              │
│  Billing     │  ┌─────────┐ ┌─────────┐ ┌─────────┐        │
│  Reports     │  │ KPI Card│ │ KPI Card│ │ KPI Card│        │
│  Settings    │  └─────────┘ └─────────┘ └─────────┘        │
│              │                                              │
│              │  ┌─────────────────────────────────┐        │
│              │  │                                 │        │
│              │  │       Main Content Area         │        │
│              │  │                                 │        │
│              │  └─────────────────────────────────┘        │
└──────────────┴──────────────────────────────────────────────┘
```

### Component Patterns

#### Stat Cards
```
┌─────────────────────────────┐
│ Total Patients         👥   │
│ 248                         │
│ +12% from last month        │
└─────────────────────────────┘
```

#### Action Cards
```
┌─────────────────────────────┐
│ Add New Provider            │
│ Invite a new provider to    │
│ join your clinic            │
│ ┌─────────────────────────┐ │
│ │     Add Provider        │ │
│ └─────────────────────────┘ │
└─────────────────────────────┘
```

#### Patient Cards
```
┌───────────────────────────────────────────────────────────┐
│ 👤 Sarah Johnson  [active]                                │
│    42 years old • Female • Last visit: 2024-01-15         │
│    Provider: Dr. Emily Martinez (NP)                      │
│    [BPC-157] [TB-500]                      [View Record]  │
└───────────────────────────────────────────────────────────┘
```

#### Provider Cards
```
┌───────────────────────────────────────────────────────────┐
│ Dr. Sarah Johnson                              [active] ⟳ │
│ Nurse Practitioner                                        │
│                                                           │
│ ✉ sarah.johnson@clinic.com                                │
│ ☎ (555) 123-4567                                          │
│                                                           │
│ 45 patients                           Joined Jan 2024     │
│                        [View Details]                     │
└───────────────────────────────────────────────────────────┘
```

#### Order Cards
```
┌───────────────────────────────────────────────────────────┐
│ Order ORD-001234                            ✓ Delivered   │
│ Placed on 2024-01-20                                      │
│                                                           │
│ BPC-157 (5mg) x2                               $179.98    │
│ Bacteriostatic Water x1                         $19.99    │
│                                                           │
│ Total                                          $199.97    │
│ ┌───────────────────────────────────────────────────────┐ │
│ │ Delivered on 2024-01-23                               │ │
│ └───────────────────────────────────────────────────────┘ │
└───────────────────────────────────────────────────────────┘
```

### Status Indicators

| Status | Style |
|--------|-------|
| Active | Black filled pill badge |
| Inactive | Gray outline pill badge |
| Delivered | Green text/light green background |
| Shipped | Orange/yellow indicator |
| Processing | Blue indicator with clock icon |

### Form Patterns

- Gray placeholder text with examples
- Required fields marked with asterisk (*)
- Auto-populated fields where applicable
- Multi-step forms with progress bar
- Address auto-complete
- Real-time validation

---

## Dosing Tools

### Reconstitution Calculator

Interactive calculator for peptide reconstitution:

**Inputs:**
```
Dose of Peptide (mg):
[0.1] [0.25] [0.5] [1] [2] [2.5] [5] [7.5] [10] [12.5] [15] [20]
[Enter custom dosage (mg)]

Strength of Peptide (mg):
[1] [2] [5] [6] [10] [12] [15] [20] [24] [30] [50] [60]
[Enter custom strength (mg)]

Bacteriostatic Water (mL):
[0.5] [1] [1.5] [2] [2.5] [3]
[Enter custom water (mL)]
```

**Output:**
```
┌─────────────────────────────────────────┐
│              Results                    │
├─────────────────────────────────────────┤
│ PEPTIDE DOSE                            │
│ [Calculated value]                      │
│                                         │
│ DRAW SYRINGE TO                         │
│ [Calculated units]                      │
│                                         │
│ [Visual syringe diagram showing fill]   │
│ ═══════════════════════════╪════════    │
│ 0   10   20   30   40   50   60   100   │
└─────────────────────────────────────────┘
```

**Features:**
- Save prior calculations
- Patient-specific saved calculations
- Visual syringe representation
- Unit conversion (mcg ↔ mg ↔ mL)

### Peptide Cheat Sheet

Quick reference guide:
- Peptide name and aliases
- Common indications
- Standard dosing ranges
- Reconstitution ratios
- Administration instructions
- Cycling protocols (on/off periods)
- Common stacking combinations
- Contraindications
- Expected timeline for results

---

## Mobile App Requirements

### Patient Mobile App (iOS + Android)

**Core Features:**
- View current peptide name and dosage
- Reconstitution instructions
- Dosing calculator
- Schedule/frequency tracker
- Push notification reminders
- Treatment history
- Active treatment plan view
- Patient education resources
- **Emergency Telemedicine button**
- Order refills
- Track shipments
- View upcoming appointments
- Secure messaging with provider

**Key Screens:**
1. Dashboard (active treatments, next dose, appointments)
2. My Treatments (list of all active/past)
3. Treatment Detail (dosing, schedule, instructions)
4. Orders (history, tracking, reorder)
5. Messages (provider communication)
6. Profile (demographics, preferences)
7. Emergency Contact (one-tap telemedicine)

### Provider Mobile App (Future Phase)

- Patient quick lookup
- View daily schedule
- Emergency telemedicine responses
- Quick charting
- Order approvals
- Push notifications for urgent items

---

## API Integrations

### Lab Integrations

| Lab | Integration Type | Features |
|-----|------------------|----------|
| LabCorp | API | Auto-load results, order placement |
| Quest Diagnostics | API | Auto-load results, order placement |
| Manual Entry | Form | Upload PDFs, manual data entry |

### Financial Integrations

| Service | Purpose |
|---------|---------|
| Stripe | Payment processing |
| QuickBooks | Accounting sync |
| Square | Alternative payments |
| ACH | Bank transfers |
| Venmo/PayPal/Zelle | Alternative methods |

### Partner APIs

| Partner | Integration |
|---------|-------------|
| Alpha BioMed | Product catalog, pricing, ordering |
| Strive Pharmacy | Compounding orders |
| Future suppliers | Abstracted supplier interface |

### Future Integrations

- Wearables (CGM data, Oura, Whoop)
- Telehealth platforms (Zoom, Doxy.me)
- Scheduling systems (Calendly, Acuity)
- Marketing (Mailchimp, SMS providers)

---

## Security & Compliance

### HIPAA Requirements

| Requirement | Implementation |
|-------------|----------------|
| Encryption at rest | AES-256 for all PHI |
| Encryption in transit | TLS 1.3 for all connections |
| Access control | RBAC with granular permissions |
| Audit logging | All access and changes logged |
| BAA tracking | Business Associate Agreements stored |
| Data isolation | Multi-tenant with clinic separation |
| Minimum necessary | Role-based data access |
| Patient rights | Export, delete capabilities |

### Additional Security

- IP address tracking (prevent credential sharing)
- Session management (timeout, single session)
- Two-factor authentication (Phase 2)
- Penetration testing before launch
- SOC 2 Type II compliance (target)
- Regular security audits

### Research Data Integrity

- Blockchain backup for research data (optional)
- Immutable audit trails
- Timestamped consent records
- Video consent storage with verification
- IRB-ready data export

### Compliance Documentation

Templates and tracking for:
- HIPAA authorization forms
- Business Associate Agreements (BAAs)
- RUO disclosures
- Research consent forms
- Patient intake forms
- Medical release forms
- Video consent records
- Adverse event reports

---

## Technical Stack

### Recommended Stack

#### Frontend
- **Framework:** Next.js 15+ (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Components:** shadcn/ui
- **State:** Zustand or Redux Toolkit
- **Data Fetching:** TanStack Query (React Query)
- **Forms:** React Hook Form + Zod

#### Backend
- **Runtime:** Node.js
- **Framework:** Express.js or Fastify
- **Language:** TypeScript
- **ORM:** Prisma
- **Validation:** Zod

#### Database
- **Primary:** PostgreSQL
- **Cache:** Redis
- **Search:** PostgreSQL full-text (or Elasticsearch later)

#### Infrastructure
- **Cloud:** AWS (HIPAA-eligible services)
- **Containers:** Docker
- **Orchestration:** ECS or Kubernetes (scale phase)
- **CDN:** CloudFront
- **Storage:** S3 (encrypted)

#### Third-Party Services
- **Payments:** Stripe
- **SMS:** Twilio
- **Email:** SendGrid
- **Video Storage:** Mux or AWS MediaConvert
- **Monitoring:** Datadog or New Relic
- **Error Tracking:** Sentry

### Alternative Stack (Faster MVP)

- **Full-stack:** Supabase (PostgreSQL + Auth + Storage + Realtime)
- **Frontend:** Next.js + Tailwind + shadcn/ui
- **Deployment:** Vercel
- **Payments:** Stripe

---

## Development Phases

### Phase 1: Foundation (Months 1-3)
- [ ] Multi-tenant architecture
- [ ] Authentication system (real, not localStorage)
- [ ] Clinic registration (3-step onboarding)
- [ ] Clinic Admin dashboard with KPIs
- [ ] Provider management (CRUD, permissions)
- [ ] Patient roster (list, search, basic profiles)
- [ ] Settings page (clinic info, pricing config)
- [ ] HIPAA-compliant infrastructure

### Phase 2: Clinical Core (Months 4-6)
- [ ] Patient record with full demographics
- [ ] Functional medicine charting system
- [ ] Auto-charting functionality
- [ ] Product libraries (peptides, supplements)
- [ ] Treatment tracking
- [ ] Visit documentation
- [ ] Basic scheduling

### Phase 3: Commerce & Compliance (Months 7-9)
- [ ] RUO consent workflow
- [ ] Video consent recording
- [ ] Integrated store and shopping cart
- [ ] Order management and tracking
- [ ] Payment processing (Stripe)
- [ ] Multi-supplier architecture
- [ ] Batch/lot tracking

### Phase 4: Labs & Integrations (Months 10-12)
- [ ] LabCorp API integration
- [ ] Quest Diagnostics API integration
- [ ] Lab result display and trending
- [ ] QuickBooks integration
- [ ] Dosing calculator
- [ ] Reconstitution tools

### Phase 5: Patient Engagement (Months 13-15)
- [ ] Patient portal (web)
- [ ] Mobile app (iOS)
- [ ] Mobile app (Android)
- [ ] Emergency telemedicine feature
- [ ] Secure messaging
- [ ] Push notifications

### Phase 6: Analytics & Scale (Months 16-18)
- [ ] Comprehensive analytics dashboards
- [ ] Reporting engine
- [ ] Adverse event tracking & reporting
- [ ] Research data export
- [ ] White-label capabilities
- [ ] Performance optimization
- [ ] Security audit

---

## Success Metrics

### Platform Adoption

| Metric | Year 1 Target | Year 2 Target |
|--------|---------------|---------------|
| Active clinics | 100 | 500 |
| Active providers | 400 | 2,000 |
| Patients in system | 25,000 | 125,000 |
| Monthly active users | 10,000 | 50,000 |

### Clinical Engagement

| Metric | Target |
|--------|--------|
| Charting time reduction | 50% |
| Protocol completion rate | 80%+ |
| Patient portal adoption | 70% |
| Mobile app DAU | 30% of patients |

### Financial Performance

| Metric | Target |
|--------|--------|
| MRR Year 1 | $269K |
| ARR Year 1 | $3.2M |
| Avg revenue per clinic | $2,690/month |
| Clinic retention rate | 90%+ |
| Transaction GMV | $7.3M/month (100 clinics) |

### Compliance & Safety

| Metric | Target |
|--------|--------|
| Research consent completion | 100% |
| Adverse event reporting rate | 100% of events |
| Emergency telemedicine response | <15 min avg |
| Regulatory violations | Zero |
| HIPAA incidents | Zero |

---

## Appendix A: Glossary

| Term | Definition |
|------|------------|
| RUO | Research Use Only - products not FDA-approved for human use |
| IRB | Institutional Review Board - ethics committee for research |
| COA | Certificate of Analysis - document verifying product purity |
| HRT | Hormone Replacement Therapy |
| DPC | Direct Primary Care - membership-based model |
| GLP-1 | Glucagon-like peptide-1 - hormone for blood sugar/weight |
| PRO | Patient Reported Outcome |
| BAA | Business Associate Agreement (HIPAA requirement) |
| PHI | Protected Health Information |
| GMV | Gross Merchandise Value |
| MRR | Monthly Recurring Revenue |
| ARR | Annual Recurring Revenue |
| AOV | Average Order Value |
| LTV | Lifetime Value |
| CAC | Customer Acquisition Cost |

---

## Appendix B: Competitor References

- Cerbo: https://www.cer.bo/
- OptiMantra: https://www.optimantra.com/
- Practice Better: https://practicebetter.io/
- CharmHealth: https://www.charmhealth.com/
- PatientNow: https://www.patientnow.com/
- AestheticsPro: https://www.aestheticspro.com/
- Portrait Care: https://www.portraitcare.com/

---

## Appendix C: Partner Contacts

| Partner | Type | Notes |
|---------|------|-------|
| Alpha BioMed (Paramount) | Peptide supplier | Primary |
| Strive Pharmacy | Compounding pharmacy | Active |
| BioLongevity | Research products | Target |
| OptiYouRx | Pharmaceutical | Target |
| BellMed Supplies | Medical supplies | Target |
| Aviva Aesthetics PE | Strategic (Audrey Neff) | Investor |
| FL Healthcare Law | Legal (Jeff Cohen) | Counsel |

---

## Appendix D: Change Log

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | Dec 2024 | Initial PRD release |

---

*Document Version: 1.0.0*
*Last Updated: December 2024*
*Status: Vision Specification*

**Next Steps:**
1. Review CLAUDE.md for current codebase state
2. Validate pricing model with clinic interviews
3. De-risk supplier dependency (add 2-3 backups)
4. Begin Phase 1 development with real backend
