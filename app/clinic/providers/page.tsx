"use client"

export const dynamic = 'force-dynamic'

import { ProtectedRoute } from "@/components/protected-route"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Building2, Users, UserCog, Activity, DollarSign, TrendingUp, Plus, Mail, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

const mockProviders = [
  {
    id: "1",
    name: "Dr. Sarah Johnson",
    type: "Nurse Practitioner",
    email: "sarah.johnson@clinic.com",
    phone: "(555) 123-4567",
    status: "active",
    patients: 45,
    joinDate: "Jan 2024",
  },
  {
    id: "2",
    name: "Michael Chen",
    type: "Physician Assistant",
    email: "michael.chen@clinic.com",
    phone: "(555) 234-5678",
    status: "active",
    patients: 38,
    joinDate: "Feb 2024",
  },
  {
    id: "3",
    name: "Dr. Emily Rodriguez",
    type: "Chiropractor",
    email: "emily.rodriguez@clinic.com",
    phone: "(555) 345-6789",
    status: "active",
    patients: 52,
    joinDate: "Dec 2023",
  },
  {
    id: "4",
    name: "James Wilson",
    type: "Medical Assistant",
    email: "james.wilson@clinic.com",
    phone: "(555) 456-7890",
    status: "inactive",
    patients: 0,
    joinDate: "Mar 2024",
  },
]

export default function ProvidersPage() {
  return (
    <ProtectedRoute allowedRoles={["clinic_admin"]}>
      <DashboardLayout>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">Providers</h2>
              <p className="text-muted-foreground">Manage your clinic's healthcare providers</p>
            </div>
            <Link href="/clinic/providers/new">
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Add Provider
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid gap-4 md:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Providers</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">8</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Nurse Practitioners</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Physician Assistants</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Other Providers</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3</div>
              </CardContent>
            </Card>
          </div>

          {/* Providers List */}
          <div className="grid gap-4 md:grid-cols-2">
            {mockProviders.map((provider) => (
              <Card key={provider.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{provider.name}</CardTitle>
                      <CardDescription>{provider.type}</CardDescription>
                    </div>
                    <Badge variant={provider.status === "active" ? "default" : "secondary"}>{provider.status}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Mail className="w-4 h-4" />
                    {provider.email}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Phone className="w-4 h-4" />
                    {provider.phone}
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t">
                    <div className="text-sm">
                      <span className="font-medium">{provider.patients}</span> patients
                    </div>
                    <div className="text-sm text-muted-foreground">Joined {provider.joinDate}</div>
                  </div>
                  <Link href={`/clinic/providers/${provider.id}`}>
                    <Button variant="outline" className="w-full bg-transparent">
                      View Details
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  )
}
