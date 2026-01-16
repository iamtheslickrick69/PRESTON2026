"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { FeatureCard } from "@/components/ui/grid-feature-cards"
import DigitalSerenity from "@/components/ui/digital-serenity-animated-landing-page"
import BlogCardStack from "@/components/blog-card-stack"
import { AnimatedTabs } from "@/components/ui/animated-tabs"
import { PixelCanvas } from "@/components/ui/pixel-canvas"
import RotatingEarth from "@/components/ui/wireframe-dotted-globe"
import { TransitionPanel } from "@/components/ui/transition-panel"
import { GradientWave } from "@/components/ui/gradient-wave"
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
  Database,
  Brain,
  Share2,
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
      badgeColor: "gray",
    },
    {
      icon: FlaskConical,
      title: "Peptide Protocols",
      description: "70+ peptide catalog with dosing guides, reconstitution calculators, and tracking.",
      badge: "Provider",
      badgeColor: "gray",
    },
    {
      icon: Calculator,
      title: "Dosing Calculator",
      description: "Interactive reconstitution calculator with visual syringe guides and saved calculations.",
      badge: "Provider",
      badgeColor: "gray",
    },
    {
      icon: Shield,
      title: "Treatment Protocols",
      description: "Create, manage, and assign custom treatment protocols to patients.",
      badge: "Provider",
      badgeColor: "gray",
    },
    {
      icon: BarChart3,
      title: "Lab Integration",
      description: "Order labs, view results, and track patient biomarkers over time.",
      badge: "Provider",
      badgeColor: "gray",
    },
    {
      icon: Phone,
      title: "Emergency Telemedicine",
      description: "Instant patient access for safety concerns with complete audit logging.",
      badge: "Provider",
      badgeColor: "gray",
    },
  ],
  patient: [
    {
      icon: BarChart3,
      title: "Treatment Dashboard",
      description: "View your active protocols, dosing schedule, and treatment progress.",
      badge: "Patient",
      badgeColor: "gray",
    },
    {
      icon: FlaskConical,
      title: "Order Peptides",
      description: "Browse the catalog, place orders, and track shipments to your door.",
      badge: "Patient",
      badgeColor: "gray",
    },
    {
      icon: Calculator,
      title: "Personal Dosing Guide",
      description: "Your reconstitution instructions with step-by-step video tutorials.",
      badge: "Patient",
      badgeColor: "gray",
    },
    {
      icon: UserCog,
      title: "Appointment Scheduling",
      description: "Book visits with your provider, manage appointments, and set reminders.",
      badge: "Patient",
      badgeColor: "gray",
    },
    {
      icon: Phone,
      title: "Emergency Access",
      description: "24/7 emergency telemedicine connection for urgent safety concerns.",
      badge: "Patient",
      badgeColor: "gray",
    },
    {
      icon: CheckCircle2,
      title: "Progress Tracking",
      description: "Track your outcomes, log symptoms, and visualize your health journey.",
      badge: "Patient",
      badgeColor: "gray",
    },
  ],
}

const roleColors = {
  admin: { bg: "from-gray-600 to-gray-700", accent: "gray", badge: "bg-gray-500/20 text-gray-400 border-gray-500/30" },
  provider: { bg: "from-blue-500 to-blue-600", accent: "blue", badge: "bg-blue-500/20 text-blue-400 border-blue-500/30" },
  patient: { bg: "from-red-500 to-red-600", accent: "red", badge: "bg-red-500/20 text-red-400 border-red-500/30" },
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
  const [atlasActiveIndex, setAtlasActiveIndex] = useState(0)

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
            <span className="word-animate" data-delay="200">#1 AI Powered Solution</span>
            <br />
            <span className="word-animate text-neutral-300" data-delay="500">for Healthcare</span>
          </h1>

          {/* Subtitle */}
          <p className="word-animate text-base sm:text-lg md:text-xl text-neutral-400 max-w-2xl mx-auto leading-relaxed font-light" data-delay="800">
            Empowering clinics and patients to safely store their personal data and accurately understand it.
          </p>

          </div>

        {/* Two Cards: Member Login + Start Clinic */}
        <div
          className="w-full max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10"
          style={{ opacity: 0, animation: 'word-appear 0.8s ease-out forwards', animationDelay: '1.2s' }}
        >
          {/* Left Card: Member Login - Pure Liquid Glass */}
          <div className="relative p-6 bg-neutral-900/60 backdrop-blur-xl flex flex-col rounded-xl shadow-2xl shadow-black/50">
            {/* Inner glow effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent pointer-events-none rounded-xl"></div>

            {/* Horizontal Header Row */}
            <div className="flex items-center justify-between mb-3 relative z-10">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-neutral-800/80 backdrop-blur-sm flex items-center justify-center border border-white/5">
                  <User className="w-4 h-4 text-neutral-400" strokeWidth={1.5} />
                </div>
                <h3 className="text-sm font-semibold text-white">Member Login</h3>
              </div>
              <span className="text-[10px] px-2 py-1 rounded-full font-medium bg-neutral-800/80 backdrop-blur-sm text-neutral-400 border border-white/5">Secure</span>
            </div>
            <p className="text-neutral-500 text-xs mb-4 leading-relaxed relative z-10">
              Access your dashboard based on your role.
            </p>
            <div className="relative z-10 flex-1">
              <AnimatedTabs className="w-full" />
            </div>
          </div>

          {/* Right Card: Start Your Clinic - Liquid Glass */}
          <div className="relative p-6 bg-neutral-900/60 backdrop-blur-xl flex flex-col rounded-xl shadow-2xl shadow-black/50">
            {/* Inner glow effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] via-transparent to-transparent pointer-events-none rounded-xl"></div>

            {/* Horizontal Header Row */}
            <div className="flex items-center justify-between mb-3 relative z-10">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-neutral-800/70 backdrop-blur-sm flex items-center justify-center border border-neutral-700/50">
                  <Zap className="w-4 h-4 text-neutral-300" strokeWidth={1.5} />
                </div>
                <h3 className="text-sm font-semibold text-white">Start Your Clinic</h3>
              </div>
              <span className="text-[10px] px-2 py-1 rounded-full font-medium bg-neutral-800/70 backdrop-blur-sm text-neutral-300 border border-neutral-700/50">Free Trial</span>
            </div>
            <p className="text-neutral-400 text-xs mb-4 leading-relaxed relative z-10">
              The only peptide therapy EHR with built-in AI intelligence.
            </p>

            {/* Trust Badges - 2x2 Grid */}
            <div className="grid grid-cols-2 gap-x-4 gap-y-2 mb-4 relative z-10">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-neutral-400" strokeWidth={2} />
                <span className="text-xs text-neutral-300">HIPAA Compliant</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-neutral-400" strokeWidth={2} />
                <span className="text-xs text-neutral-300">70+ Protocols</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-neutral-400" strokeWidth={2} />
                <span className="text-xs text-neutral-300">AI-Powered</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-neutral-400" strokeWidth={2} />
                <span className="text-xs text-neutral-300">14-Day Free Trial</span>
              </div>
            </div>

            {/* What's Included */}
            <div className="border-t border-dashed border-neutral-700 pt-4 mb-4 relative z-10">
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
            <div className="flex gap-2 mt-auto relative z-10">
              <Link href="/auth/clinic-register" className="flex-1">
                <Button size="default" className="w-full bg-white hover:bg-neutral-100 text-black rounded-lg shadow-lg transition-all">
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
          onClick={() => scrollToSection("atlas-section")}
          className="text-neutral-500 hover:text-neutral-300 transition-colors animate-bounce"
        >
          <ChevronDown className="h-8 w-8" strokeWidth={1.5} />
        </button>
      </section>

      {/* Atlas AI Section - Hero Globe Background */}
      <section id="atlas-section" className="py-24 px-4 relative overflow-hidden min-h-[900px] flex items-center">
        {/* Gradient Wave Background - Behind everything */}
        <GradientWave
          colors={["#38bdf8", "#ffffff", "#38bdf8", "#ffffff", "#38bdf8", "#ffffff"]}
          className="opacity-50"
          noiseSpeed={0.00001}
          shadowPower={5}
          darkenTop={false}
        />

        {/* MASSIVE Globe Background */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
          <div className="opacity-15">
            <RotatingEarth width={700} height={700} className="w-[700px] h-[700px]" />
          </div>
        </div>

        {/* Subtle ambient glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.02)_0%,transparent_70%)] z-20 pointer-events-none"></div>

        <div className="container mx-auto max-w-4xl relative z-30">
          {/* Header - Centered */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-neutral-800/70 border border-neutral-700/50 mb-4 backdrop-blur-sm">
              <Sparkles className="h-4 w-4 text-neutral-300" strokeWidth={1.5} />
              <span className="text-sm font-medium text-neutral-300">Introducing Atlas AI</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-extralight text-white mb-2 tracking-tight drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)]">
              Intelligence That's Yours
            </h2>
            <p className="text-neutral-300 text-lg font-medium mb-3 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
              Map out your health
            </p>
            <p className="text-neutral-400 text-base max-w-xl mx-auto font-light drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
              Powered by your data. Protected by design. Perfected for you.
            </p>
          </div>

          {/* Icon Pills - Floating with Backdrop Blur */}
          <div className="flex items-center justify-center gap-3 mb-10">
            {[
              { icon: Database, title: 'Your Data Diamond', desc: 'Military-grade encryption. Zero sharing. Complete ownership.' },
              { icon: Brain, title: 'Personalized Predictions', desc: 'AI learns YOUR body—not population averages.' },
              { icon: BarChart3, title: 'Treatment Timeline', desc: 'Track peptide cycles and optimal dosing windows.' },
              { icon: Share2, title: 'Share on YOUR Terms', desc: 'Export, share, or delete anytime. You control it all.' },
              { icon: MessageSquare, title: 'Atlas AI', desc: 'Your personal AI assistant trained on peptide therapy protocols and research.' },
            ].map((feature, index) => {
              const Icon = feature.icon
              const isActive = atlasActiveIndex === index
              return (
                <button
                  key={index}
                  onClick={() => setAtlasActiveIndex(index)}
                  className={`group relative w-14 h-14 rounded-xl border transition-all duration-200 backdrop-blur-md ${
                    isActive
                      ? 'bg-white/20 border-white/60 scale-110 shadow-lg shadow-white/25'
                      : 'bg-neutral-900/60 border-neutral-700 hover:border-neutral-500 hover:scale-105'
                  }`}
                  title={feature.title}
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Icon className={`w-6 h-6 ${isActive ? 'text-white' : 'text-neutral-400'}`} strokeWidth={1.5} />
                  </div>
                  <span className={`absolute -top-1 -right-1 w-5 h-5 rounded-full text-xs font-bold flex items-center justify-center ${
                    isActive ? 'bg-white text-black shadow-md' : 'bg-neutral-800 text-neutral-500'
                  }`}>
                    {index + 1}
                  </span>
                </button>
              )
            })}
          </div>

          {/* Enhanced Feature Card with Glass Effect */}
          <TransitionPanel
            activeIndex={atlasActiveIndex}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            variants={{
              enter: { opacity: 0, y: 10 },
              center: { opacity: 1, y: 0 },
              exit: { opacity: 0, y: -10 },
            }}
            className="mb-12"
          >
            {[
              { icon: Database, title: 'Your Data Diamond', desc: 'Military-grade encryption. Zero sharing. Complete ownership.' },
              { icon: Brain, title: 'Personalized Predictions', desc: 'AI learns YOUR body—not population averages.' },
              { icon: BarChart3, title: 'Treatment Timeline', desc: 'Track peptide cycles and optimal dosing windows.' },
              { icon: Share2, title: 'Share on YOUR Terms', desc: 'Export, share, or delete anytime. You control it all.' },
              { icon: MessageSquare, title: 'Atlas AI', desc: 'Your personal AI assistant trained on peptide therapy protocols and research.' },
            ].map((feature, index) => {
              const Icon = feature.icon
              return (
                <div key={index} className="flex items-center gap-4 px-6 py-5 rounded-xl bg-neutral-900/70 backdrop-blur-md border border-dashed border-neutral-700 max-w-2xl mx-auto shadow-xl">
                  <div className="w-14 h-14 rounded-xl bg-neutral-800/70 flex items-center justify-center flex-shrink-0 border border-neutral-700/50">
                    <Icon className="w-7 h-7 text-neutral-300" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-1 text-lg">{feature.title}</h3>
                    <p className="text-neutral-400 text-sm leading-relaxed">{feature.desc}</p>
                  </div>
                </div>
              )
            })}
          </TransitionPanel>

          {/* Stats - Glass Morphism Badges */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-10">
            <div className="flex items-center gap-3 px-5 py-3 rounded-xl bg-neutral-900/70 backdrop-blur-md border border-neutral-800 shadow-lg">
              <Lock className="w-4 h-4 text-neutral-300" strokeWidth={1.5} />
              <div className="text-2xl font-bold text-white">100%</div>
              <div className="text-xs text-neutral-400">Data Ownership</div>
            </div>
            <div className="flex items-center gap-3 px-5 py-3 rounded-xl bg-neutral-900/70 backdrop-blur-md border border-neutral-800 shadow-lg">
              <Shield className="w-4 h-4 text-neutral-300" strokeWidth={1.5} />
              <div className="text-2xl font-bold text-white">0</div>
              <div className="text-xs text-neutral-400">Third-Party Sharing</div>
            </div>
            <div className="flex items-center gap-3 px-5 py-3 rounded-xl bg-neutral-900/70 backdrop-blur-md border border-neutral-800 shadow-lg">
              <Lock className="w-4 h-4 text-neutral-300" strokeWidth={1.5} />
              <div className="text-2xl font-bold text-white">256-bit</div>
              <div className="text-xs text-neutral-400">Encryption + HIPAA++</div>
            </div>
          </div>

          {/* CTA with Pulsing Glow */}
          <div className="text-center">
            <button
              onClick={() => window.dispatchEvent(new CustomEvent("open-chat-widget"))}
              className="group relative inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white hover:bg-neutral-100 text-black font-semibold transition-all hover:scale-105 shadow-xl"
            >
              <span className="relative">Experience Atlas AI</span>
              <ArrowRight className="relative w-4 h-4 group-hover:translate-x-1 transition-transform" strokeWidth={2} />
            </button>
          </div>
        </div>
      </section>

      {/* Features Section - Dark Theme with Liquid Glass */}
      <section id="features" className="py-24 px-4 bg-neutral-950 relative overflow-hidden">
        {/* Subtle ambient glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(100,100,100,0.03)_0%,transparent_60%)] pointer-events-none"></div>
        <div className="container mx-auto max-w-5xl relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
              Powerful tools for every role.
            </h2>
            <p className="text-neutral-400 max-w-2xl mx-auto font-light mb-8">
              One platform with tailored experiences for clinic admins, providers, and patients.
            </p>

            {/* Filter Buttons - Dark Glass */}
            <div className="flex items-center justify-center">
              <div className="inline-flex items-center bg-neutral-900/60 backdrop-blur-md rounded-2xl p-1.5 gap-1 border border-neutral-700/50">
                {(["all", "admin", "provider", "patient"] as RoleFilter[]).map((filter) => (
                  <button
                    key={filter}
                    onClick={() => handleFilterChange(filter)}
                    className={`px-5 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 ${
                      activeFilter === filter
                        ? "bg-neutral-800 text-white shadow-md"
                        : "text-neutral-400 hover:text-white hover:bg-neutral-800/50"
                    }`}
                  >
                    {filter === "all" ? "All Features" : roleLabels[filter]}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Animated Cards Grid - Liquid Glass */}
          <div
            className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 divide-x divide-y divide-dashed divide-neutral-700/50 border border-dashed border-neutral-700/50 rounded-xl overflow-hidden transition-all duration-200 ${
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
                    className="bg-neutral-900/40 backdrop-blur-sm hover:bg-neutral-900/60 transition-colors"
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
                  className="bg-neutral-900/40 backdrop-blur-sm hover:bg-neutral-900/60 transition-colors"
                />
              ))
            )}
          </div>

        </div>
      </section>

      {/* Why Bridge MDX Section - Dark Theme with Liquid Glass */}
      <section id="why-bridge" className="py-24 px-4 bg-neutral-950 relative overflow-hidden">
        {/* Subtle ambient glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(255,255,255,0.01)_0%,transparent_50%)] pointer-events-none"></div>
        <div className="container mx-auto max-w-5xl relative z-10">
          {/* Centered Headline */}
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
              Built for the future of
              <span className="text-neutral-300 font-medium"> functional medicine.</span>
            </h2>
            <p className="text-neutral-400 max-w-2xl mx-auto font-light">
              The only EHR platform designed specifically for peptide therapy clinics.
            </p>
          </div>

          {/* Feature Accordion */}
          <div className="max-w-2xl mx-auto space-y-3">
            {[
              {
                icon: Zap,
                title: "First-Mover in Peptide EHR",
                description: "No other platform offers dedicated peptide protocol management with RUO compliance built-in. We've built deep integrations for:\n• Reconstitution calculators with visual guides\n• 70+ peptide-specific dosing protocols\n• Real-time compliance alerts and audit trails\n• Research-grade outcome tracking\n\nUsed by 47+ clinics managing 12,000+ patients.",
                badge: "Category Leader",
                badgeColor: "gray",
                isPriority: true,
              },
              {
                icon: FlaskConical,
                title: "Integrated Product Store",
                description: "Like Fullscript, but native to your workflow. Set your margins (typically 12-15%), track inventory in real-time, and fulfill orders seamlessly.\n\nPatients order directly through their portal with automatic provider notifications. Average clinic adds $8,500/month in product revenue.",
                badge: "Profit Builder",
                badgeColor: "gray",
              },
              {
                icon: BarChart3,
                title: "Research Data Ready",
                description: "IRB-ready data export, adverse event tracking, and outcome analytics for research publications.\n\nGenerate reports that meet institutional review board standards. Used in 23+ peer-reviewed publications. Perfect for clinics pursuing research partnerships.",
                badge: "Publication Grade",
                badgeColor: "gray",
              },
              {
                icon: Shield,
                title: "Cash-Pay Optimized",
                description: "Built for the modern cash-pay practice model with transparent pricing and zero insurance complexity.\n\nNo claim submissions, no denials, no CPT codes. Clinics save an average of 15 hours/week on administrative work.",
                badge: "No Insurance Hassle",
                badgeColor: "gray",
              },
            ].map((feature, index) => {
              const isOpen = openAccordion === index
              const Icon = feature.icon
              const isPriority = feature.isPriority
              return (
                <div
                  key={index}
                  className={`relative border rounded-xl overflow-hidden transition-all duration-300 backdrop-blur-sm ${
                    isPriority && !isOpen ? "border-white/30 bg-white/10 shadow-lg shadow-white/10" :
                    isOpen ? "border-neutral-600 bg-neutral-900/60" : "border-neutral-700/50 bg-neutral-900/40 hover:border-neutral-600 hover:bg-neutral-900/60"
                  }`}
                >
                  {/* Inner glow for priority */}
                  {isPriority && !isOpen && (
                    <div className="absolute inset-0 bg-gradient-to-br from-white/[0.05] to-transparent pointer-events-none"></div>
                  )}
                  <button
                    onClick={() => setOpenAccordion(isOpen ? null : index)}
                    className="w-full px-6 py-4 flex items-center justify-between gap-4 text-left relative z-10"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`flex-shrink-0 rounded-xl flex items-center justify-center backdrop-blur-sm bg-gray-500/20 text-gray-300 ${
                        isPriority ? "w-14 h-14" : "w-12 h-12"
                      }`}>
                        <Icon className={isPriority ? "w-7 h-7" : "w-6 h-6"} strokeWidth={1.5} />
                      </div>
                      <span className="font-semibold text-white">{feature.title}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs px-3 py-1 rounded-full font-medium backdrop-blur-sm bg-gray-500/20 text-gray-300 border border-gray-500/30">
                        {feature.badge}
                      </span>
                      <ChevronDown className={`w-5 h-5 text-neutral-400 transition-transform duration-300 ${
                        isOpen ? "rotate-180" : ""
                      }`} />
                    </div>
                  </button>
                  <div className={`overflow-hidden transition-all duration-300 ${
                    isOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
                  }`}>
                    <div className="px-6 pb-5 text-neutral-400 leading-relaxed text-sm whitespace-pre-line relative z-10">
                      {feature.description}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Blog Section - Dark Theme with Liquid Glass Cards */}
      <section id="insights" className="py-24 px-4 bg-neutral-950">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-8">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
              Insights for peptide clinics.
            </h2>
            <p className="text-neutral-400 max-w-2xl mx-auto font-light">
              Stay ahead with the latest on compliance, patient care, and practice growth.
            </p>
          </div>
          <BlogCardStack />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 bg-neutral-950">
        <div className="container mx-auto max-w-4xl">
          <div className="bg-gradient-to-br from-neutral-900/60 to-neutral-900/40 backdrop-blur-xl rounded-3xl p-8 md:p-12 border border-neutral-700/50 text-center relative overflow-hidden shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent pointer-events-none"></div>
            <div className="relative z-10">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extralight text-white mb-4">
                Ready to transform your practice?
              </h2>
              <p className="text-neutral-400 mb-8 max-w-lg mx-auto font-light">
                Join the growing number of peptide therapy clinics using Bridge MDX to streamline operations, ensure compliance, and deliver better patient outcomes.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/auth/clinic-register">
                  <Button size="lg" className="bg-white hover:bg-neutral-100 text-black px-8">
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
