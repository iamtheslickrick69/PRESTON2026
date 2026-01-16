"use client"

import type { LucideIcon } from "lucide-react"
import React from "react"
import { useAuth } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"
import {
  LogOut,
  Menu,
  HomeIcon,
  ChevronRight,
  Building2,
  Users,
  UserCog,
  Activity,
  DollarSign,
  TrendingUp,
  Settings,
  BarChart,
  Calendar,
  ShoppingCart,
  BookOpen,
  Calculator,
  FileText,
  Home,
  Package,
  Phone,
} from "lucide-react"
import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import Image from "next/image"

// Define navigation for each portal type
const clinicNavigation = [
  { name: "Dashboard", href: "/clinic/dashboard", icon: Building2 },
  { name: "Patients", href: "/clinic/patients", icon: Users },
  { name: "Providers", href: "/clinic/providers", icon: UserCog },
  { name: "Analytics", href: "/clinic/analytics", icon: Activity },
  { name: "Billing", href: "/clinic/billing", icon: DollarSign },
  { name: "Reports", href: "/clinic/reports", icon: TrendingUp },
  { name: "Settings", href: "/clinic/settings", icon: Settings },
]

const providerNavigation = [
  { name: "Dashboard", href: "/provider/dashboard", icon: Activity },
  { name: "My Patients", href: "/provider/patients", icon: Users },
  { name: "Schedule", href: "/provider/schedule", icon: Calendar },
  { name: "Peptide Library", href: "/provider/peptides", icon: ShoppingCart },
  { name: "Dosing Guide", href: "/provider/dosing-guide", icon: BookOpen },
  { name: "Calculator", href: "/provider/calculator", icon: Calculator },
  { name: "Resources", href: "/provider/resources", icon: FileText },
  { name: "Reports", href: "/provider/reports", icon: BarChart },
]

const patientNavigation = [
  { name: "Dashboard", href: "/patient/dashboard", icon: Home },
  { name: "My Peptides", href: "/patient/peptides", icon: Package },
  { name: "Shop", href: "/patient/shop", icon: ShoppingCart },
  { name: "Schedule", href: "/patient/schedule", icon: Calendar },
  { name: "Calculator", href: "/patient/calculator", icon: Calculator },
  { name: "Resources", href: "/patient/resources", icon: BookOpen },
  { name: "Emergency", href: "/patient/emergency", icon: Phone },
]

interface DashboardLayoutProps {
  children: React.ReactNode
  navigation?: Array<{
    name: string
    href: string
    icon: LucideIcon
  }>
}

export function DashboardLayout({ children, navigation: propNavigation }: DashboardLayoutProps) {
  const { user, logout } = useAuth()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const pathname = usePathname()

  // Determine navigation based on pathname if not provided
  const getNavigation = () => {
    if (propNavigation) return propNavigation
    if (pathname.startsWith("/clinic")) return clinicNavigation
    if (pathname.startsWith("/provider")) return providerNavigation
    if (pathname.startsWith("/patient")) return patientNavigation
    return patientNavigation // default
  }
  const navigation = getNavigation()

  const generateBreadcrumbs = () => {
    const segments = pathname.split("/").filter(Boolean)
    const breadcrumbs = [{ label: "Home", href: "/" }]

    const breadcrumbLabelMap: Record<string, string> = {
      "/patient/shop": "My Peptides",
      "/patient/peptides": "Shop",
    }

    let currentPath = ""
    segments.forEach((segment, index) => {
      currentPath += `/${segment}`

      // Check if we have a custom label for this path
      let label = breadcrumbLabelMap[currentPath]

      if (!label) {
        // Default label generation
        label = segment
          .split("-")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ")

        if (label === "Ehr") label = "EHR"
        if (label === "Id") label = "Details"
      }

      breadcrumbs.push({
        label,
        href: currentPath,
      })
    })

    return breadcrumbs
  }

  const breadcrumbs = generateBreadcrumbs()

  return (
    <div className="min-h-screen bg-background">
      {/* Header with horizontal navigation */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/bridgeicon.png"
              alt="Bridge MDX"
              width={198}
              height={40}
              className="h-[37px] w-auto cursor-pointer hover:opacity-80 transition-opacity"
              priority
            />
          </Link>

          {/* Horizontal Navigation - Desktop */}
          <nav className="hidden md:flex items-center gap-1">
            {navigation.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href
              return (
                <Link key={item.name} href={item.href}>
                  <Button
                    variant={isActive ? "secondary" : "ghost"}
                    className="gap-2"
                  >
                    <Icon className="h-4 w-4" />
                    {item.name}
                  </Button>
                </Link>
              )
            })}
          </nav>

          {/* User info and logout */}
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <Menu className="h-5 w-5" />
            </Button>
            <div className="hidden sm:block text-sm text-right">
              <p className="font-medium">{user?.name}</p>
              <p className="text-muted-foreground text-xs">{user?.email}</p>
            </div>
            <Button variant="ghost" size="icon" onClick={logout}>
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content - Full Width */}
      <main className="container p-6">
        <nav aria-label="breadcrumb" className="mb-6">
          <ol className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
            {breadcrumbs.map((crumb, index) => (
              <React.Fragment key={crumb.href}>
                <li className="inline-flex items-center gap-2">
                  {index === breadcrumbs.length - 1 ? (
                    <span className="font-medium text-foreground">{crumb.label}</span>
                  ) : (
                    <Link
                      href={crumb.href}
                      className="transition-colors hover:text-foreground flex items-center gap-1"
                    >
                      {index === 0 && <HomeIcon className="h-4 w-4" />}
                      {index === 0 ? "" : crumb.label}
                    </Link>
                  )}
                </li>
                {index < breadcrumbs.length - 1 && (
                  <li role="presentation" aria-hidden="true">
                    <ChevronRight className="h-4 w-4" />
                  </li>
                )}
              </React.Fragment>
            ))}
          </ol>
        </nav>
        {children}
      </main>

      {/* Mobile Navigation Dropdown */}
      {sidebarOpen && (
        <div className="md:hidden fixed inset-0 top-16 z-40 bg-background">
          <nav className="flex flex-col gap-2 p-4 border-b">
            {navigation.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href
              return (
                <Link key={item.name} href={item.href} onClick={() => setSidebarOpen(false)}>
                  <Button
                    variant={isActive ? "secondary" : "ghost"}
                    className="w-full justify-start gap-2"
                  >
                    <Icon className="h-4 w-4" />
                    {item.name}
                  </Button>
                </Link>
              )
            })}
          </nav>
          <div
            className="absolute inset-0 top-full bg-background/80 backdrop-blur-sm"
            onClick={() => setSidebarOpen(false)}
          />
        </div>
      )}
    </div>
  )
}
