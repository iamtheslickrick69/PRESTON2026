"use client"

export const dynamic = 'force-dynamic'

import { ProtectedRoute } from "@/components/protected-route"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Activity,
  Calendar,
  ShoppingCart,
  FileText,
  TrendingUp,
  Clock,
  Package,
  AlertCircle,
  AlertTriangle,
  CheckCircle,
  Home,
  Calculator,
  BookOpen,
  Phone,
  MessageSquare,
  Beaker,
} from "lucide-react"
import Link from "next/link"

const upcomingAppointments = [
  {
    id: 1,
    date: "2024-02-05",
    time: "10:00 AM",
    provider: "Dr. Michael Chen",
    type: "Follow-up Consultation",
    location: "Telehealth",
  },
  {
    id: 2,
    date: "2024-02-15",
    time: "2:30 PM",
    provider: "Dr. Michael Chen",
    type: "Lab Review",
    location: "Telehealth",
  },
]

const activePrescriptions = [
  {
    id: 1,
    name: "BPC-157",
    dose: "250 mcg",
    frequency: "Twice daily",
    startDate: "2024-01-15",
    progress: 65,
    daysRemaining: 14,
  },
  {
    id: 2,
    name: "TB-500",
    dose: "2 mg",
    frequency: "Twice weekly",
    startDate: "2024-01-15",
    progress: 65,
    daysRemaining: 14,
  },
]

const recentLabs = [
  {
    id: 1,
    name: "Comprehensive Metabolic Panel",
    date: "2024-01-20",
    status: "normal",
  },
  {
    id: 2,
    name: "Lipid Panel",
    date: "2024-01-20",
    status: "normal",
  },
  {
    id: 3,
    name: "Thyroid Panel",
    date: "2024-01-20",
    status: "review",
  },
]

const healthMetrics = [
  { label: "Weight", value: "165 lbs", change: "-5 lbs", trend: "down" },
  { label: "Body Fat", value: "18%", change: "-2%", trend: "down" },
  { label: "Energy Level", value: "8/10", change: "+2", trend: "up" },
  { label: "Sleep Quality", value: "7.5/10", change: "+1.5", trend: "up" },
]

export default function PatientDashboardPage() {
  return (
    <ProtectedRoute allowedRoles={["patient"]}>
      <DashboardLayout>
        <div className="space-y-8">
          {/* Quick Stats */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Prescriptions</CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2</div>
                <p className="text-xs text-muted-foreground">Currently taking</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Next Appointment</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">Feb 5</div>
                <p className="text-xs text-muted-foreground">10:00 AM - Dr. Chen</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Treatment Progress</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">65%</div>
                <p className="text-xs text-muted-foreground">14 days remaining</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Recent Labs</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3</div>
                <p className="text-xs text-muted-foreground">1 needs review</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Active Prescriptions */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Active Prescriptions</CardTitle>
                      <CardDescription>Your current peptide therapy regimen</CardDescription>
                    </div>
                    <Link href="/patient/shop">
                      <Button variant="outline" size="sm" className="bg-transparent">
                        Refill
                      </Button>
                    </Link>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {activePrescriptions.map((rx) => (
                    <div key={rx.id} className="p-4 border rounded-lg space-y-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-semibold">{rx.name}</h4>
                          <p className="text-sm text-muted-foreground">
                            {rx.dose} - {rx.frequency}
                          </p>
                        </div>
                        <Badge variant="secondary">{rx.daysRemaining} days left</Badge>
                      </div>
                      <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Treatment Progress</span>
                          <span className="font-medium">{rx.progress}%</span>
                        </div>
                        <Progress value={rx.progress} />
                      </div>
                      <p className="text-xs text-muted-foreground">Started on {rx.startDate}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Health Metrics */}
              <Card>
                <CardHeader>
                  <CardTitle>Health Metrics</CardTitle>
                  <CardDescription>Track your progress over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    {healthMetrics.map((metric, idx) => (
                      <div key={idx} className="p-4 border rounded-lg">
                        <p className="text-sm text-muted-foreground mb-1">{metric.label}</p>
                        <div className="flex items-baseline gap-2">
                          <p className="text-2xl font-bold">{metric.value}</p>
                          <div
                            className={`flex items-center text-sm ${
                              metric.trend === "up" ? "text-green-500" : "text-blue-500"
                            }`}
                          >
                            <TrendingUp className={`w-3 h-3 mr-1 ${metric.trend === "down" ? "rotate-180" : ""}`} />
                            <span>{metric.change}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Recent Lab Results */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Recent Lab Results</CardTitle>
                      <CardDescription>Latest test results from your provider</CardDescription>
                    </div>
                    <Button variant="outline" size="sm" className="bg-transparent">
                      View All
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  {recentLabs.map((lab) => (
                    <div key={lab.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        {lab.status === "normal" ? (
                          <CheckCircle className="w-5 h-5 text-green-500" />
                        ) : (
                          <AlertCircle className="w-5 h-5 text-amber-500" />
                        )}
                        <div>
                          <p className="font-medium">{lab.name}</p>
                          <p className="text-xs text-muted-foreground">{lab.date}</p>
                        </div>
                      </div>
                      <Badge variant={lab.status === "normal" ? "secondary" : "default"}>
                        {lab.status === "normal" ? "Normal" : "Needs Review"}
                      </Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Upcoming Appointments */}
              <Card>
                <CardHeader>
                  <CardTitle>Upcoming Appointments</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {upcomingAppointments.map((apt) => (
                    <div key={apt.id} className="p-3 border rounded-lg space-y-2">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="font-semibold text-sm">{apt.type}</p>
                          <p className="text-xs text-muted-foreground">{apt.provider}</p>
                        </div>
                        <Badge variant="outline">{apt.location}</Badge>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="w-3 h-3 text-muted-foreground" />
                        <span>{apt.date}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="w-3 h-3 text-muted-foreground" />
                        <span>{apt.time}</span>
                      </div>
                      <Button size="sm" variant="outline" className="w-full mt-2 bg-transparent">
                        Join Video Call
                      </Button>
                    </div>
                  ))}
                  <Button variant="outline" className="w-full bg-transparent">
                    Schedule New Appointment
                  </Button>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Link href="/patient/peptides">
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      <Activity className="w-4 h-4 mr-2" />
                      Order Peptides
                    </Button>
                  </Link>
                  <Link href="/patient/orders">
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      <Package className="w-4 h-4 mr-2" />
                      Track Orders
                    </Button>
                  </Link>
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <FileText className="w-4 h-4 mr-2" />
                    View Medical Records
                  </Button>
                  <Link href="/patient/report-event">
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      <AlertTriangle className="w-4 h-4 mr-2" />
                      Report Side Effect
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              {/* Educational Resources */}
              <Card>
                <CardHeader>
                  <CardTitle>Learn More</CardTitle>
                  <CardDescription>Educational resources about your treatment</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Link href="/patient/resources/bpc-157" className="block">
                    <div className="p-3 border rounded-lg hover:bg-muted transition-colors">
                      <p className="font-medium text-sm">Understanding BPC-157</p>
                      <p className="text-xs text-muted-foreground">Benefits, dosing, and safety</p>
                    </div>
                  </Link>
                  <Link href="/patient/resources/injection-guide" className="block">
                    <div className="p-3 border rounded-lg hover:bg-muted transition-colors">
                      <p className="font-medium text-sm">Injection Guide</p>
                      <p className="text-xs text-muted-foreground">Step-by-step instructions</p>
                    </div>
                  </Link>
                  <Link href="/patient/resources/storage" className="block">
                    <div className="p-3 border rounded-lg hover:bg-muted transition-colors">
                      <p className="font-medium text-sm">Storage & Handling</p>
                      <p className="text-xs text-muted-foreground">Keep your peptides safe</p>
                    </div>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  )
}
