"use client"

export const dynamic = 'force-dynamic'

import { ProtectedRoute } from "@/components/protected-route"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent } from "@/components/ui/card"
import { Users, Activity, Calendar, ShoppingCart, Plus, Search, BookOpen } from "lucide-react"
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
    lastVisit: "2024-01-15",
    activePeptides: ["BPC-157", "TB-500"],
    status: "active",
  },
  {
    id: "2",
    name: "Michael Chen",
    age: 35,
    gender: "Male",
    lastVisit: "2024-01-10",
    activePeptides: ["CJC-1295", "Ipamorelin"],
    status: "active",
  },
  {
    id: "3",
    name: "Emily Rodriguez",
    age: 38,
    gender: "Female",
    lastVisit: "2024-01-08",
    activePeptides: ["Semaglutide"],
    status: "active",
  },
  {
    id: "4",
    name: "James Wilson",
    age: 51,
    gender: "Male",
    lastVisit: "2023-12-20",
    activePeptides: [],
    status: "inactive",
  },
]

export default function ProviderPatientsPage() {
  return (
    <ProtectedRoute allowedRoles={["provider"]}>
      <DashboardLayout>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">My Patients</h2>
              <p className="text-muted-foreground">Manage your patient records and treatments</p>
            </div>
            <Link href="/provider/patients/new">
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                New Patient
              </Button>
            </Link>
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Search patients by name, ID, or peptide..." className="pl-10" />
          </div>

          {/* Patients List */}
          <div className="grid gap-4">
            {mockPatients.map((patient) => (
              <Card key={patient.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <Users className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-lg font-semibold">{patient.name}</h3>
                          <Badge variant={patient.status === "active" ? "default" : "secondary"}>
                            {patient.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {patient.age} years old • {patient.gender} • Last visit: {patient.lastVisit}
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
