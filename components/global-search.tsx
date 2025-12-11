"use client"

import { useState, useEffect, useCallback } from "react"
import { useRouter } from "next/navigation"
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from "@/components/ui/command"
import { Badge } from "@/components/ui/badge"
import { Search, Users, Calendar, Pill, FileText, Calculator, Settings, Home, Activity, ShoppingCart, Phone, BookOpen, Package, BarChart, UserCheck, CreditCard, Video, Bell, BookMarked, Shield, Building2, ArrowRight, Clock } from "lucide-react"
import { useAuth } from "@/lib/auth-context"

interface SearchResult {
  id: string
  title: string
  description?: string
  type: "page" | "patient" | "peptide" | "order" | "appointment" | "prescription"
  url: string
  icon?: React.ComponentType<{ className?: string }>
  badge?: string
}

// Mock search results based on user role
const getSearchResults = (query: string, role: string): SearchResult[] => {
  const lowerQuery = query.toLowerCase()
  const results: SearchResult[] = []

  // Patients (for provider and clinic_admin)
  if (role === "provider" || role === "clinic_admin") {
    const patients = [
      { id: "p1", name: "Sarah Johnson", status: "Active", peptides: "BPC-157, TB-500" },
      { id: "p2", name: "Michael Chen", status: "Active", peptides: "CJC-1295, Ipamorelin" },
      { id: "p3", name: "Emily Rodriguez", status: "Active", peptides: "Semaglutide" },
      { id: "p4", name: "James Wilson", status: "Inactive", peptides: "None" },
      { id: "p5", name: "Lisa Thompson", status: "Active", peptides: "Tirzepatide" },
    ]
    patients
      .filter(p => p.name.toLowerCase().includes(lowerQuery) || p.peptides.toLowerCase().includes(lowerQuery))
      .forEach(p => {
        results.push({
          id: `patient-${p.id}`,
          title: p.name,
          description: `${p.status} • ${p.peptides}`,
          type: "patient",
          url: role === "provider" ? `/provider/patients/${p.id}` : `/clinic/patients/${p.id}`,
          icon: Users,
          badge: p.status,
        })
      })
  }

  // Peptides
  const peptides = [
    { id: "bpc157", name: "BPC-157", category: "Healing & Recovery" },
    { id: "tb500", name: "TB-500", category: "Healing & Recovery" },
    { id: "semaglutide", name: "Semaglutide", category: "Weight Management" },
    { id: "tirzepatide", name: "Tirzepatide", category: "Weight Management" },
    { id: "cjc1295", name: "CJC-1295", category: "Growth Hormone" },
    { id: "ipamorelin", name: "Ipamorelin", category: "Growth Hormone" },
    { id: "pt141", name: "PT-141", category: "Sexual Health" },
    { id: "ghkcu", name: "GHK-Cu", category: "Anti-Aging" },
  ]
  peptides
    .filter(p => p.name.toLowerCase().includes(lowerQuery) || p.category.toLowerCase().includes(lowerQuery))
    .forEach(p => {
      const url = role === "patient" ? "/patient/peptides" : role === "provider" ? "/provider/peptides" : "/clinic/peptides"
      results.push({
        id: `peptide-${p.id}`,
        title: p.name,
        description: p.category,
        type: "peptide",
        url,
        icon: Pill,
      })
    })

  // Orders (for patient)
  if (role === "patient") {
    const orders = [
      { id: "ord1", number: "ORD-2024-001", status: "Shipped", date: "Jan 18" },
      { id: "ord2", number: "ORD-2024-002", status: "Processing", date: "Jan 19" },
    ]
    orders
      .filter(o => o.number.toLowerCase().includes(lowerQuery))
      .forEach(o => {
        results.push({
          id: `order-${o.id}`,
          title: o.number,
          description: `${o.status} • ${o.date}`,
          type: "order",
          url: "/patient/orders",
          icon: Package,
          badge: o.status,
        })
      })
  }

  return results.slice(0, 5) // Limit results
}

// Navigation pages by role
const getNavigationPages = (role: string) => {
  const basePages = {
    patient: [
      { name: "Dashboard", href: "/patient/dashboard", icon: Home },
      { name: "My Peptides", href: "/patient/peptides", icon: Activity },
      { name: "Prescriptions", href: "/patient/prescriptions", icon: Pill },
      { name: "Orders", href: "/patient/orders", icon: Package },
      { name: "Shop", href: "/patient/shop", icon: ShoppingCart },
      { name: "Calculator", href: "/patient/calculator", icon: Calculator },
      { name: "Schedule", href: "/patient/schedule", icon: Calendar },
      { name: "Health Journal", href: "/patient/journal", icon: BookMarked },
      { name: "Telehealth", href: "/patient/telehealth", icon: Video },
      { name: "Notifications", href: "/patient/notifications", icon: Bell },
      { name: "Resources", href: "/patient/resources", icon: BookOpen },
      { name: "Emergency", href: "/patient/emergency", icon: Phone },
    ],
    provider: [
      { name: "Dashboard", href: "/provider/dashboard", icon: Activity },
      { name: "My Patients", href: "/provider/patients", icon: Users },
      { name: "Prescriptions", href: "/provider/prescriptions", icon: Pill },
      { name: "Telehealth", href: "/provider/telehealth", icon: Video },
      { name: "Protocols", href: "/provider/protocols", icon: FileText },
      { name: "Schedule", href: "/provider/schedule", icon: Calendar },
      { name: "Peptide Library", href: "/provider/peptides", icon: ShoppingCart },
      { name: "Calculator", href: "/provider/calculator", icon: Calculator },
      { name: "Dosing Guide", href: "/provider/dosing-guide", icon: BookOpen },
      { name: "Resources", href: "/provider/resources", icon: FileText },
      { name: "Reports", href: "/provider/reports", icon: BarChart },
    ],
    clinic_admin: [
      { name: "Dashboard", href: "/clinic/dashboard", icon: Home },
      { name: "Providers", href: "/clinic/providers", icon: UserCheck },
      { name: "Patients", href: "/clinic/patients", icon: Users },
      { name: "Compliance", href: "/clinic/compliance", icon: Shield },
      { name: "Billing", href: "/clinic/billing", icon: CreditCard },
      { name: "Analytics", href: "/clinic/analytics", icon: BarChart },
      { name: "Settings", href: "/clinic/settings", icon: Settings },
    ],
  }

  return basePages[role as keyof typeof basePages] || []
}

// Quick actions by role
const getQuickActions = (role: string) => {
  const actions = {
    patient: [
      { name: "Schedule Appointment", href: "/patient/schedule", icon: Calendar },
      { name: "Request Refill", href: "/patient/prescriptions", icon: Pill },
      { name: "Start Telehealth", href: "/patient/telehealth", icon: Video },
      { name: "Log Symptoms", href: "/patient/journal", icon: BookMarked },
    ],
    provider: [
      { name: "New Prescription", href: "/provider/prescriptions", icon: Pill },
      { name: "Start Telehealth", href: "/provider/telehealth", icon: Video },
      { name: "View Schedule", href: "/provider/schedule", icon: Calendar },
      { name: "Search Protocols", href: "/provider/protocols", icon: FileText },
    ],
    clinic_admin: [
      { name: "Run Compliance Audit", href: "/clinic/compliance", icon: Shield },
      { name: "View Reports", href: "/clinic/analytics", icon: BarChart },
      { name: "Manage Providers", href: "/clinic/providers", icon: UserCheck },
      { name: "Billing Overview", href: "/clinic/billing", icon: CreditCard },
    ],
  }

  return actions[role as keyof typeof actions] || []
}

interface GlobalSearchProps {
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

export function GlobalSearch({ open: controlledOpen, onOpenChange }: GlobalSearchProps) {
  const [internalOpen, setInternalOpen] = useState(false)
  const [query, setQuery] = useState("")
  const [recentSearches, setRecentSearches] = useState<string[]>([])
  const router = useRouter()
  const { user } = useAuth()

  const open = controlledOpen !== undefined ? controlledOpen : internalOpen
  const setOpen = onOpenChange || setInternalOpen

  const role = user?.role || "patient"
  const searchResults = query.length > 1 ? getSearchResults(query, role) : []
  const navigationPages = getNavigationPages(role)
  const quickActions = getQuickActions(role)

  // Filter navigation pages based on query
  const filteredPages = query.length > 0
    ? navigationPages.filter(p => p.name.toLowerCase().includes(query.toLowerCase()))
    : navigationPages.slice(0, 6)

  // Keyboard shortcut to open search
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen(!open)
      }
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [open, setOpen])

  const handleSelect = useCallback((url: string, searchTerm?: string) => {
    setOpen(false)
    setQuery("")
    if (searchTerm && !recentSearches.includes(searchTerm)) {
      setRecentSearches(prev => [searchTerm, ...prev.slice(0, 4)])
    }
    router.push(url)
  }, [router, setOpen, recentSearches])

  return (
    <>
      {/* Search Trigger Button */}
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 px-3 py-2 text-sm text-muted-foreground hover:bg-muted rounded-lg border border-input w-full md:w-64 justify-between"
      >
        <div className="flex items-center gap-2">
          <Search className="w-4 h-4" />
          <span>Search...</span>
        </div>
        <kbd className="hidden md:inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
          <span className="text-xs">⌘</span>K
        </kbd>
      </button>

      {/* Search Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="overflow-hidden p-0 shadow-lg max-w-2xl">
          <DialogTitle className="sr-only">Global Search</DialogTitle>
          <DialogDescription className="sr-only">Search for patients, peptides, pages, and more</DialogDescription>
          <Command className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-group]]:px-2 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:h-5 [&_[cmdk-item]_svg]:w-5">
            <CommandInput
              placeholder="Search patients, peptides, pages..."
              value={query}
              onValueChange={setQuery}
            />
            <CommandList className="max-h-[400px]">
              <CommandEmpty>No results found.</CommandEmpty>

              {/* Search Results */}
              {searchResults.length > 0 && (
                <CommandGroup heading="Search Results">
                  {searchResults.map((result) => {
                    const Icon = result.icon || FileText
                    return (
                      <CommandItem
                        key={result.id}
                        value={result.title}
                        onSelect={() => handleSelect(result.url, query)}
                        className="cursor-pointer"
                      >
                        <Icon className="mr-2 h-4 w-4 text-muted-foreground" />
                        <div className="flex-1">
                          <span>{result.title}</span>
                          {result.description && (
                            <span className="text-muted-foreground text-sm ml-2">
                              {result.description}
                            </span>
                          )}
                        </div>
                        {result.badge && (
                          <Badge variant="secondary" className="ml-2 text-xs">
                            {result.badge}
                          </Badge>
                        )}
                        <ArrowRight className="ml-2 h-4 w-4 text-muted-foreground" />
                      </CommandItem>
                    )
                  })}
                </CommandGroup>
              )}

              {/* Quick Actions */}
              {query.length === 0 && (
                <CommandGroup heading="Quick Actions">
                  {quickActions.map((action) => {
                    const Icon = action.icon
                    return (
                      <CommandItem
                        key={action.name}
                        value={action.name}
                        onSelect={() => handleSelect(action.href)}
                        className="cursor-pointer"
                      >
                        <Icon className="mr-2 h-4 w-4 text-muted-foreground" />
                        <span>{action.name}</span>
                        <ArrowRight className="ml-auto h-4 w-4 text-muted-foreground" />
                      </CommandItem>
                    )
                  })}
                </CommandGroup>
              )}

              <CommandSeparator />

              {/* Navigation Pages */}
              <CommandGroup heading="Pages">
                {filteredPages.map((page) => {
                  const Icon = page.icon
                  return (
                    <CommandItem
                      key={page.href}
                      value={page.name}
                      onSelect={() => handleSelect(page.href)}
                      className="cursor-pointer"
                    >
                      <Icon className="mr-2 h-4 w-4 text-muted-foreground" />
                      <span>{page.name}</span>
                    </CommandItem>
                  )
                })}
              </CommandGroup>

              {/* Recent Searches */}
              {recentSearches.length > 0 && query.length === 0 && (
                <>
                  <CommandSeparator />
                  <CommandGroup heading="Recent Searches">
                    {recentSearches.map((search, index) => (
                      <CommandItem
                        key={`recent-${index}`}
                        value={`recent-${search}`}
                        onSelect={() => setQuery(search)}
                        className="cursor-pointer"
                      >
                        <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                        <span>{search}</span>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </>
              )}
            </CommandList>
          </Command>
        </DialogContent>
      </Dialog>
    </>
  )
}

// Export for use in layouts
export default GlobalSearch
