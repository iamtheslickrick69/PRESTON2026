"use client"

export const dynamic = 'force-dynamic'

import { ProtectedRoute } from "@/components/protected-route"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent } from "@/components/ui/card"
import { Users, Activity, UserCog, TrendingUp, DollarSign, Building2, Plus, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

const mockPatients = [
  {
    id: "1",
    name: "Sarah Johnson",
    age: 42,
    gender: "Female",
    provider: "Dr. Emily Martinez (NP)",
    lastVisit: "2024-01-15",
    activePeptides: ["BPC-157", "TB-500"],
    status: "active",
  },
  {
    id: "2",
    name: "Michael Chen",
    age: 35,
    gender: "Male",
    provider: "Dr. James Wilson (PA)",
    lastVisit: "2024-01-10",
    activePeptides: ["CJC-1295", "Ipamorelin"],
    status: "active",
  },
  {
    id: "3",
    name: "Emily Rodriguez",
    age: 38,
    gender: "Female",
    provider: "Dr. Emily Martinez (NP)",
    lastVisit: "2024-01-08",
    activePeptides: ["Semaglutide"],
    status: "active",
  },
  {
    id: "4",
    name: "James Wilson",
    age: 51,
    gender: "Male",
    provider: "Dr. Sarah Thompson (Chiropractor)",
    lastVisit: "2023-12-20",
    activePeptides: [],
    status: "inactive",
  },
  {
    id: "5",
    name: "Lisa Anderson",
    age: 29,
    gender: "Female",
    provider: "Dr. James Wilson (PA)",
    lastVisit: "2024-01-12",
    activePeptides: ["Tirzepatide"],
    status: "active",
  },
  {
    id: "6",
    name: "Robert Taylor",
    age: 45,
    gender: "Male",
    provider: "Dr. Emily Martinez (NP)",
    lastVisit: "2024-01-05",
    activePeptides: ["BPC-157", "CJC-1295"],
    status: "active",
  },
]

export default function ClinicPatientsPage() {
  return (
    <ProtectedRoute allowedRoles={["clinic_admin"]}>
      <DashboardLayout>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">All Patients</h2>
              <p className="text-muted-foreground">View and manage all patients across your clinic</p>
            </div>
            <Link href="/provider/patients/new">
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                New Patient
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid gap-4 md:grid-cols-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Total Patients</p>
                    <p className="text-2xl font-bold">248</p>
                  </div>
                  <Users className="w-8 h-8 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Active Patients</p>
                    <p className="text-2xl font-bold">215</p>
                  </div>
                  <Activity className="w-8 h-8 text-green-500" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">New This Month</p>
                    <p className="text-2xl font-bold">32</p>
                  </div>
                  <Plus className="w-8 h-8 text-blue-500" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Avg per Provider</p>
                    <p className="text-2xl font-bold">31</p>
                  </div>
                  <UserCog className="w-8 h-8 text-purple-500" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Search and Filters */}
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input placeholder="Search patients by name, ID, provider, or peptide..." className="pl-10" />
            </div>
            <Button variant="outline" className="bg-transparent">
              Filter
            </Button>
          </div>

          {/* Patients List */}
          <div className="grid gap-4">
            {mockPatients.map((patient) => (
              <Card key={patient.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 flex-1">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <Users className="w-6 h-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className="text-lg font-semibold">{patient.name}</h3>
                          <Badge variant={patient.status === "active" ? "default" : "secondary"}>
                            {patient.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {patient.age} years old • {patient.gender} • Last visit: {patient.lastVisit}
                        </p>
                        <p className="text-sm text-muted-foreground mt-1">
                          <span className="font-medium">Provider:</span> {patient.provider}
                        </p>
                        {patient.activePeptides.length > 0 && (
                          <div className="flex gap-2 mt-2">
                            {patient.activePeptides.map((peptide) => (
                              <Badge key={peptide} variant="outline">
                                {peptide}
                              </Badge>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                    <Link href={`/provider/patients/${patient.id}`}>
                      <Button variant="outline" className="bg-transparent">
                        View Record
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  )
}
