"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { FeatureCard } from "@/components/ui/grid-feature-cards"
import DigitalSerenity from "@/components/ui/digital-serenity-animated-landing-page"
import BlogCardStack from "@/components/blog-card-stack"
import { AnimatedTabs } from "@/components/ui/animated-tabs"
import { PixelCanvas } from "@/components/ui/pixel-canvas"
import {
  Building2,
  UserCog,
  User,
  Shield,
  FlaskConical,
  Calculator,
  Phone,
  BarChart3,
  FileText,
  Zap,
  CheckCircle2,
  ArrowRight,
  ChevronDown,
  Sparkles,
  Lock,
  Clock,
  CreditCard,
  MessageSquare,
} from "lucide-react"
import { useState, useEffect } from "react"

type RoleFilter = "all" | "admin" | "provider" | "patient"

const roleFeatures = {
  admin: [
    {
      icon: Building2,
      title: "Provider Management",
      description: "Manage your team of providers, credentials, scheduling, and access permissions.",
      badge: "Clinic",
      badgeColor: "gray",
    },
    {
      icon: BarChart3,
      title: "Revenue Analytics",
      description: "Track revenue streams, set margins, manage transactions, and monitor payouts.",
      badge: "Clinic",
      badgeColor: "gray",
    },
    {
      icon: BarChart3,
      title: "Performance Dashboard",
      description: "Real-time insights into clinic performance, growth metrics, and KPIs.",
      badge: "Clinic",
      badgeColor: "gray",
    },
    {
      icon: Shield,
      title: "Compliance Settings",
      description: "Configure RUO workflows, consent forms, video documentation, and audit trails.",
      badge: "Clinic",
      badgeColor: "gray",
    },
    {
      icon: User,
      title: "Patient Overview",
      description: "Bird's-eye view of all patients across your practice with filtering and search.",
      badge: "Clinic",
      badgeColor: "gray",
    },
    {
      icon: FlaskConical,
      title: "Inventory Control",
      description: "Track peptide stock levels, reorder alerts, and supplier management.",
      badge: "Clinic",
      badgeColor: "gray",
    },
  ],
  provider: [
    {
      icon: FileText,
      title: "Auto-Charting",
      description: "Reduce documentation time by 50% with intelligent charting that captures every action.",
      badge: "Provider",
      badgeColor: "cyan",
    },
    {
      icon: FlaskConical,
      title: "Peptide Protocols",
      description: "70+ peptide catalog with dosing guides, reconstitution calculators, and tracking.",
      badge: "Provider",
      badgeColor: "cyan",
    },
    {
      icon: Calculator,
      title: "Dosing Calculator",
      description: "Interactive reconstitution calculator with visual syringe guides and saved calculations.",
      badge: "Provider",
      badgeColor: "cyan",
    },
    {
      icon: Shield,
      title: "Treatment Protocols",
      description: "Create, manage, and assign custom treatment protocols to patients.",
      badge: "Provider",
      badgeColor: "cyan",
    },
    {
      icon: BarChart3,
      title: "Lab Integration",
      description: "Order labs, view results, and track patient biomarkers over time.",
      badge: "Provider",
      badgeColor: "cyan",
    },
    {
      icon: Phone,
      title: "Emergency Telemedicine",
      description: "Instant patient access for safety concerns with complete audit logging.",
      badge: "Provider",
      badgeColor: "cyan",
    },
  ],
  patient: [
    {
      icon: BarChart3,
      title: "Treatment Dashboard",
      description: "View your active protocols, dosing schedule, and treatment progress.",
      badge: "Patient",
      badgeColor: "rose",
    },
    {
      icon: FlaskConical,
      title: "Order Peptides",
      description: "Browse the catalog, place orders, and track shipments to your door.",
      badge: "Patient",
      badgeColor: "rose",
    },
    {
      icon: Calculator,
      title: "Personal Dosing Guide",
      description: "Your reconstitution instructions with step-by-step video tutorials.",
      badge: "Patient",
      badgeColor: "rose",
    },
    {
      icon: UserCog,
      title: "Appointment Scheduling",
      description: "Book visits with your provider, manage appointments, and set reminders.",
      badge: "Patient",
      badgeColor: "rose",
    },
    {
      icon: Phone,
      title: "Emergency Access",
      description: "24/7 emergency telemedicine connection for urgent safety concerns.",
      badge: "Patient",
      badgeColor: "rose",
    },
    {
      icon: CheckCircle2,
      title: "Progress Tracking",
      description: "Track your outcomes, log symptoms, and visualize your health journey.",
      badge: "Patient",
      badgeColor: "rose",
    },
  ],
}

const roleColors = {
  admin: { bg: "from-gray-600 to-gray-700", accent: "gray", badge: "bg-gray-500/20 text-gray-400 border-gray-500/30" },
  provider: { bg: "from-cyan-500 to-cyan-600", accent: "cyan", badge: "bg-cyan-500/20 text-cyan-400 border-cyan-500/30" },
  patient: { bg: "from-rose-500 to-rose-600", accent: "rose", badge: "bg-rose-500/20 text-rose-400 border-rose-500/30" },
}

const roleLabels = {
  admin: "Clinic",
  provider: "Provider",
  patient: "Patient",
}

export default function HomePage() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeFilter, setActiveFilter] = useState<RoleFilter>("all")
  const [isAnimating, setIsAnimating] = useState(false)
  const [openAccordion, setOpenAccordion] = useState<number | null>(0)

  const handleFilterChange = (filter: RoleFilter) => {
    if (filter === activeFilter) return
    setIsAnimating(true)
    setTimeout(() => {
      setActiveFilter(filter)
      setTimeout(() => setIsAnimating(false), 50)
    }, 200)
  }

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <DigitalSerenity>
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 py-4 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center justify-between bg-neutral-900/95 backdrop-blur-md rounded-2xl px-4 py-3 border border-neutral-700/50">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <Image
                src="/bridgeicon.png"
                alt="Bridge MDX"
                width={240}
                height={48}
                className="h-9 md:h-10 w-auto"
                priority
              />
            </Link>

            {/* Navigation */}
            <nav className="hidden md:flex items-center gap-1">
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="px-5 py-2 rounded-xl bg-white text-slate-900 font-medium text-sm transition-all"
              >
                Home
              </button>
              <button
                onClick={() => scrollToSection("features")}
                className="px-5 py-2 rounded-xl text-neutral-300 hover:text-white font-medium text-sm transition-all hover:bg-neutral-700/50"
              >
                Features
              </button>
              <button
                onClick={() => scrollToSection("why-bridge")}
                className="px-5 py-2 rounded-xl text-neutral-300 hover:text-white font-medium text-sm transition-all hover:bg-neutral-700/50"
              >
                About
              </button>
            </nav>

            {/* CTA Buttons */}
            <div className="flex items-center gap-3">
              <Link href="/auth/clinic-login">
                <Button variant="ghost" className="text-neutral-300 hover:text-white hover:bg-neutral-700/50 px-4 font-medium text-sm">
                  Sign In
                </Button>
              </Link>
              <Link href="/auth/clinic-register">
                <Button className="bg-white hover:bg-slate-100 text-slate-900 rounded-xl px-5 font-medium text-sm">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="min-h-screen flex flex-col justify-center items-center px-4 pt-24 pb-8">
        <div className="text-center max-w-5xl mx-auto mb-8">
          {/* Main headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extralight text-white mb-5 leading-[1.1] tracking-tight">
            <span className="word-animate" data-delay="200">Intelligence-first</span>
            <br />
            <span className="word-animate text-neutral-300" data-delay="500">peptide care.</span>
          </h1>

          {/* Subtitle */}
          <p className="word-animate text-base sm:text-lg md:text-xl text-neutral-400 max-w-2xl mx-auto leading-relaxed font-light" data-delay="800">
            Where AI meets clinical expertise. Providers get data-driven protocols. Patients get answers they understand.
          </p>

          </div>

        {/* Two Cards: Member Login + Start Clinic */}
        <div
          className="w-full max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 border border-dashed border-neutral-700 rounded-xl overflow-hidden mb-10"
          style={{ opacity: 0, animation: 'word-appear 0.8s ease-out forwards', animationDelay: '1.2s' }}
        >
          {/* Left Card: Member Login */}
          <div className="relative p-6 bg-neutral-900/40 flex flex-col border-r border-dashed border-neutral-700 lg:border-r">
            {/* Horizontal Header Row */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-neutral-800 flex items-center justify-center">
                  <User className="w-4 h-4 text-neutral-400" strokeWidth={1.5} />
                </div>
                <h3 className="text-sm font-semibold text-white">Member Login</h3>
              </div>
              <span className="text-[10px] px-2 py-1 rounded-full font-medium bg-neutral-800 text-neutral-400">Secure</span>
            </div>
            <p className="text-neutral-500 text-xs mb-4 leading-relaxed">
              Access your dashboard based on your role.
            </p>
            <AnimatedTabs className="w-full flex-1" />
          </div>

          {/* Right Card: Start Your Clinic (Primary CTA) */}
          <div className="relative p-6 bg-gradient-to-br from-neutral-900/60 to-cyan-950/30 flex flex-col">
            {/* Horizontal Header Row */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-cyan-900/60 flex items-center justify-center">
                  <Zap className="w-4 h-4 text-cyan-400" strokeWidth={1.5} />
                </div>
                <h3 className="text-sm font-semibold text-white">Start Your Clinic</h3>
              </div>
              <span className="text-[10px] px-2 py-1 rounded-full font-medium bg-cyan-900/60 text-cyan-300">Free Trial</span>
            </div>
            <p className="text-neutral-400 text-xs mb-4 leading-relaxed">
              The only peptide therapy EHR with built-in AI intelligence.
            </p>

            {/* Trust Badges - 2x2 Grid */}
            <div className="grid grid-cols-2 gap-x-4 gap-y-2 mb-4">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" strokeWidth={2} />
                <span className="text-xs text-neutral-300">HIPAA Compliant</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" strokeWidth={2} />
                <span className="text-xs text-neutral-300">70+ Protocols</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" strokeWidth={2} />
                <span className="text-xs text-neutral-300">AI-Powered</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" strokeWidth={2} />
                <span className="text-xs text-neutral-300">14-Day Free Trial</span>
              </div>
            </div>

            {/* What's Included */}
            <div className="border-t border-dashed border-neutral-700 pt-4 mb-4">
              <p className="text-[10px] uppercase tracking-wider text-neutral-500 mb-2">Includes</p>
              <div className="flex flex-wrap gap-1.5">
                <span className="text-[10px] px-2 py-1 rounded bg-neutral-800/80 text-neutral-400">Provider Portal</span>
                <span className="text-[10px] px-2 py-1 rounded bg-neutral-800/80 text-neutral-400">Patient App</span>
                <span className="text-[10px] px-2 py-1 rounded bg-neutral-800/80 text-neutral-400">Analytics</span>
                <span className="text-[10px] px-2 py-1 rounded bg-neutral-800/80 text-neutral-400">Dosing Calculator</span>
                <span className="text-[10px] px-2 py-1 rounded bg-neutral-800/80 text-neutral-400">Product Store</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex gap-2 mt-auto">
              <Link href="/auth/clinic-register" className="flex-1">
                <Button size="default" className="w-full bg-cyan-500 hover:bg-cyan-400 text-white rounded-lg shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all">
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" strokeWidth={2} />
                </Button>
              </Link>
              <button
                onClick={() => scrollToSection("features")}
                className="px-3 text-neutral-500 text-xs font-medium hover:text-white transition-colors"
              >
                Learn More
              </button>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <button
          onClick={() => scrollToSection("ai-section")}
          className="text-neutral-500 hover:text-neutral-300 transition-colors animate-bounce"
        >
          <ChevronDown className="h-8 w-8" strokeWidth={1.5} />
        </button>
      </section>

      {/* AI Assistant Section - Compact Feature Grid */}
      <section id="ai-section" className="py-16 px-4 relative overflow-hidden">
        <div className="container mx-auto max-w-5xl">
          {/* Section Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-4">
              <Zap className="h-4 w-4 text-cyan-400" strokeWidth={1.5} />
              <span className="text-sm font-medium text-cyan-400">Bridge AI</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-light text-white mb-2">
              AI-powered assistance for every role
            </h2>
            <p className="text-neutral-500 text-sm max-w-xl mx-auto">
              Instant answers, smart protocols, and personalized guidance - all trained on peptide therapy best practices.
            </p>
          </div>

          {/* 3-Column Role Cards - Dashed Grid Style */}
          <div className="grid grid-cols-1 md:grid-cols-3 divide-x divide-y divide-dashed divide-neutral-700 border border-dashed border-neutral-700 rounded-xl overflow-hidden mb-8">
            {/* Clinic Card */}
            <div className="relative p-6 bg-neutral-900/40 hover:bg-neutral-800/50 transition-colors overflow-hidden">
              <PixelCanvas
                gap={10}
                speed={20}
                colors={["#374151", "#4b5563", "#6b7280"]}
                variant="default"
                noFocus
              />
              <div className="relative z-10">
                {/* Horizontal Header Row */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gray-700/50 flex items-center justify-center">
                      <Building2 className="w-5 h-5 text-gray-400" strokeWidth={1.5} />
                    </div>
                    <h3 className="text-base font-semibold text-white">Operations & Analytics</h3>
                  </div>
                  <span className="text-xs px-3 py-1 rounded-full font-medium bg-gray-700/50 text-gray-300">
                    Clinic
                  </span>
                </div>
                <p className="text-white font-medium text-sm leading-relaxed">
                  Revenue forecasting, provider scheduling, and compliance monitoring powered by AI.
                </p>
              </div>
            </div>

            {/* Provider Card */}
            <div className="relative p-6 bg-neutral-900/40 hover:bg-neutral-800/50 transition-colors overflow-hidden">
              <PixelCanvas
                gap={10}
                speed={20}
                colors={["#164e63", "#0891b2", "#22d3ee"]}
                variant="default"
                noFocus
              />
              <div className="relative z-10">
                {/* Horizontal Header Row */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-cyan-900/50 flex items-center justify-center">
                      <UserCog className="w-5 h-5 text-cyan-400" strokeWidth={1.5} />
                    </div>
                    <h3 className="text-base font-semibold text-white">Protocols & Dosing</h3>
                  </div>
                  <span className="text-xs px-3 py-1 rounded-full font-medium bg-cyan-900/50 text-cyan-300">
                    Provider
                  </span>
                </div>
                <p className="text-white font-medium text-sm leading-relaxed">
                  Smart calculators, drug interactions, and evidence-based treatment recommendations.
                </p>
              </div>
            </div>

            {/* Patient Card */}
            <div className="relative p-6 bg-neutral-900/40 hover:bg-neutral-800/50 transition-colors overflow-hidden">
              <PixelCanvas
                gap={10}
                speed={20}
                colors={["#881337", "#e11d48", "#fb7185"]}
                variant="default"
                noFocus
              />
              <div className="relative z-10">
                {/* Horizontal Header Row */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-rose-900/50 flex items-center justify-center">
                      <User className="w-5 h-5 text-rose-400" strokeWidth={1.5} />
                    </div>
                    <h3 className="text-base font-semibold text-white">Guidance & Support</h3>
                  </div>
                  <span className="text-xs px-3 py-1 rounded-full font-medium bg-rose-900/50 text-rose-300">
                    Patient
                  </span>
                </div>
                <p className="text-white font-medium text-sm leading-relaxed">
                  Treatment explanations, side effect guidance, and step-by-step injection instructions.
                </p>
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <div className="text-center">
            <button
              onClick={() => window.dispatchEvent(new CustomEvent("open-chat-widget"))}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-600 text-white font-medium transition-colors"
            >
              <MessageSquare className="w-4 h-4" strokeWidth={1.5} />
              Try Bridge AI
            </button>
            <p className="text-neutral-600 text-xs mt-3">
              Or click the chat icon in the bottom right corner
            </p>
          </div>

          {/* Subtle glow effect */}
          <div className="absolute inset-0 -z-10 bg-gradient-to-t from-cyan-500/5 via-transparent to-transparent"></div>
        </div>
      </section>

      {/* Features Section with Role Filter - Light Theme */}
      <section id="features" className="py-24 px-4 bg-white">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 mb-4 tracking-tight">
              Powerful tools for every role.
            </h2>
            <p className="text-neutral-500 max-w-2xl mx-auto font-light mb-8">
              One platform with tailored experiences for clinic admins, providers, and patients.
            </p>

            {/* Filter Buttons */}
            <div className="flex items-center justify-center">
              <div className="inline-flex items-center bg-slate-100 rounded-2xl p-1.5 gap-1">
                {(["all", "admin", "provider", "patient"] as RoleFilter[]).map((filter) => (
                  <button
                    key={filter}
                    onClick={() => handleFilterChange(filter)}
                    className={`px-5 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 ${
                      activeFilter === filter
                        ? "bg-white text-slate-900 shadow-md"
                        : "text-neutral-500 hover:text-slate-900 hover:bg-white/50"
                    }`}
                  >
                    {filter === "all" ? "All Features" : roleLabels[filter]}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Animated Cards Grid with Dashed Borders */}
          <div
            className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 divide-x divide-y divide-dashed divide-slate-200 border border-dashed border-slate-200 rounded-xl overflow-hidden transition-all duration-200 ${
              isAnimating ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"
            }`}
          >
            {activeFilter === "all" ? (
              // Show all features with role badges (2 from each role)
              (["admin", "provider", "patient"] as const).flatMap((role, roleIndex) =>
                roleFeatures[role].slice(0, 2).map((feature, index) => (
                  <FeatureCard
                    key={`${role}-${index}`}
                    feature={feature}
                    patternSeed={roleIndex * 10 + index}
                    className="bg-white hover:bg-slate-50/50 transition-colors"
                  />
                ))
              )
            ) : (
              // Show role-specific features
              roleFeatures[activeFilter].map((feature, index) => (
                <FeatureCard
                  key={index}
                  feature={feature}
                  patternSeed={index}
                  className="bg-white hover:bg-slate-50/50 transition-colors"
                />
              ))
            )}
          </div>

        </div>
      </section>

      {/* Why Bridge MDX Section - Light Theme */}
      <section id="why-bridge" className="py-24 px-4 bg-white">
        <div className="container mx-auto max-w-5xl">
          {/* Centered Headline */}
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 mb-4 tracking-tight">
              Built for the future of
              <span className="text-slate-900 font-medium"> functional medicine.</span>
            </h2>
            <p className="text-neutral-500 max-w-2xl mx-auto font-light">
              The only EHR platform designed specifically for peptide therapy clinics.
            </p>
          </div>

          {/* Feature Accordion */}
          <div className="max-w-2xl mx-auto space-y-3">
            {[
              {
                icon: Zap,
                title: "First-Mover in Peptide EHR",
                description: "No other platform offers dedicated peptide protocol management with RUO compliance built-in. We've built deep integrations for reconstitution calculations, dosing protocols, and research-use-only compliance frameworks.",
                badge: "Exclusive",
                badgeColor: "gray",
              },
              {
                icon: FlaskConical,
                title: "Integrated Product Store",
                description: "Like Fullscript, but native. Set your margins, track inventory, and fulfill orders seamlessly. Patients can order directly through their portal with automatic provider notifications.",
                badge: "Revenue",
                badgeColor: "cyan",
              },
              {
                icon: BarChart3,
                title: "Research Data Ready",
                description: "IRB-ready data export, adverse event tracking, and outcome analytics for research publications. Generate reports that meet institutional review board standards.",
                badge: "Analytics",
                badgeColor: "rose",
              },
              {
                icon: Shield,
                title: "Cash-Pay Optimized",
                description: "Built for the modern cash-pay practice model with transparent pricing and no insurance complexity. No claim submissions, no denials, no hassle.",
                badge: "Simple",
                badgeColor: "gray",
              },
            ].map((feature, index) => {
              const isOpen = openAccordion === index
              const Icon = feature.icon
              return (
                <div
                  key={index}
                  className={`border rounded-xl overflow-hidden transition-all duration-300 ${
                    isOpen ? "border-slate-300 bg-slate-50" : "border-slate-200 bg-white hover:border-slate-300"
                  }`}
                >
                  <button
                    onClick={() => setOpenAccordion(isOpen ? null : index)}
                    className="w-full px-6 py-4 flex items-center justify-between gap-4 text-left"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center ${
                        feature.badgeColor === "gray" ? "bg-gray-200 text-gray-700" :
                        feature.badgeColor === "cyan" ? "bg-cyan-100 text-cyan-600" :
                        "bg-rose-100 text-rose-600"
                      }`}>
                        <Icon className="w-6 h-6" strokeWidth={1.5} />
                      </div>
                      <span className="font-semibold text-slate-900">{feature.title}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`text-xs px-3 py-1 rounded-full font-medium ${
                        feature.badgeColor === "gray" ? "bg-gray-200 text-gray-700" :
                        feature.badgeColor === "cyan" ? "bg-cyan-100 text-cyan-700" :
                        "bg-rose-100 text-rose-700"
                      }`}>
                        {feature.badge}
                      </span>
                      <ChevronDown className={`w-5 h-5 text-neutral-400 transition-transform duration-300 ${
                        isOpen ? "rotate-180" : ""
                      }`} />
                    </div>
                  </button>
                  <div className={`overflow-hidden transition-all duration-300 ${
                    isOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
                  }`}>
                    <p className="px-6 pb-5 text-neutral-500 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section id="insights" className="py-24 px-4 bg-white">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-8">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 mb-4 tracking-tight">
              Insights for peptide clinics.
            </h2>
            <p className="text-neutral-500 max-w-2xl mx-auto font-light">
              Stay ahead with the latest on compliance, patient care, and practice growth.
            </p>
          </div>
          <BlogCardStack />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="bg-gradient-to-br from-neutral-800/30 to-neutral-900/30 rounded-3xl p-8 md:p-12 border border-neutral-700 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-neutral-500/5 to-transparent"></div>
            <div className="relative z-10">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extralight text-white mb-4">
                Ready to transform your practice?
              </h2>
              <p className="text-neutral-400 mb-8 max-w-lg mx-auto font-light">
                Join the growing number of peptide therapy clinics using Bridge MDX to streamline operations, ensure compliance, and deliver better patient outcomes.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/auth/clinic-register">
                  <Button size="lg" className="bg-neutral-900 hover:bg-neutral-800 text-white px-8">
                    Register Your Clinic
                    <ArrowRight className="ml-2 h-5 w-5" strokeWidth={1.5} />
                  </Button>
                </Link>
                <a href="mailto:Preston@bridgemedix.com?subject=Schedule%20a%20Demo%20-%20Bridge%20MDX&body=Hi%20Preston%2C%0A%0AI%27d%20like%20to%20schedule%20a%20demo%20of%20Bridge%20MDX%20for%20my%20clinic.%0A%0AName%3A%0AClinic%20Name%3A%0APhone%3A%0A%0AThank%20you!">
                  <Button size="lg" variant="outline" className="bg-transparent border-white/30 text-white hover:bg-white/10 hover:border-white/50 px-8">
                    Schedule Demo
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-neutral-800">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <Image
                src="/bridgeicon.png"
                alt="Bridge MDX"
                width={140}
                height={28}
                className="h-7 w-auto opacity-70"
              />
            </div>
            <div className="flex items-center gap-6 text-sm text-neutral-500">
              <span>Molecular Intelligence for Modern Clinics</span>
            </div>
            <div className="flex items-center gap-6 text-sm text-neutral-500">
              <Link href="#" className="hover:text-neutral-300 transition-colors">Privacy</Link>
              <Link href="#" className="hover:text-neutral-300 transition-colors">Terms</Link>
              <Link href="#" className="hover:text-neutral-300 transition-colors">Contact</Link>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-neutral-800 text-center text-sm text-neutral-600">
            &copy; {new Date().getFullYear()} Bridge MDX. All rights reserved.
          </div>
        </div>
      </footer>
    </DigitalSerenity>
  )
}
