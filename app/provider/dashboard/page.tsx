"use client"

export const dynamic = 'force-dynamic'

import { ProtectedRoute } from "@/components/protected-route"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Users,
  Activity,
  Calendar,
  ShoppingCart,
  Plus,
  Clock,
  BookOpen,
  Calculator,
  FileText,
  BarChart,
  AlertTriangle,
  ClipboardList,
  MessageSquare,
  Beaker,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function ProviderDashboardPage() {
  return (
    <ProtectedRoute allowedRoles={["provider"]}>
      <DashboardLayout>
        <div className="space-y-6">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Provider Dashboard</h2>
            <p className="text-muted-foreground">Welcome back! Here's your patient overview.</p>
          </div>

          {/* Stats Grid */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">My Patients</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">45</div>
                <p className="text-xs text-muted-foreground">3 new this month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Treatments</CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">38</div>
                <p className="text-xs text-muted-foreground">Ongoing peptide therapies</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Today's Appointments</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">7</div>
                <p className="text-xs text-muted-foreground">Next at 2:00 PM</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pending Orders</CardTitle>
                <ShoppingCart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12</div>
                <p className="text-xs text-muted-foreground">Awaiting approval</p>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="grid gap-4 md:grid-cols-3">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle>Create Patient Portal</CardTitle>
                <CardDescription>Set up a new patient account</CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/provider/patients/new">
                  <Button className="w-full">
                    <Plus className="w-4 h-4 mr-2" />
                    New Patient
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle>Clinical Charting</CardTitle>
                <CardDescription>Document patient encounters</CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/provider/charting">
                  <Button className="w-full bg-transparent" variant="outline">
                    <ClipboardList className="w-4 h-4 mr-2" />
                    Start Charting
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle>View Schedule</CardTitle>
                <CardDescription>Check today's appointments</CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/provider/schedule">
                  <Button className="w-full bg-transparent" variant="outline">
                    <Calendar className="w-4 h-4 mr-2" />
                    View Schedule
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle>Peptide Library</CardTitle>
                <CardDescription>Browse available peptides</CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/provider/peptides">
                  <Button className="w-full bg-transparent" variant="outline">
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    View Library
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle>Dosing Guide</CardTitle>
                <CardDescription>Review dosing instructions</CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/provider/dosing-guide">
                  <Button className="w-full bg-transparent" variant="outline">
                    <BookOpen className="w-4 h-4 mr-2" />
                    View Guide
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle>Calculator</CardTitle>
                <CardDescription>Use the dosing calculator</CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/provider/calculator">
                  <Button className="w-full bg-transparent" variant="outline">
                    <Calculator className="w-4 h-4 mr-2" />
                    Use Calculator
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle>Resources</CardTitle>
                <CardDescription>Access helpful resources</CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/provider/resources">
                  <Button className="w-full bg-transparent" variant="outline">
                    <FileText className="w-4 h-4 mr-2" />
                    View Resources
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle>Reports</CardTitle>
                <CardDescription>Generate and view reports</CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/provider/reports">
                  <Button className="w-full bg-transparent" variant="outline">
                    <BarChart className="w-4 h-4 mr-2" />
                    View Reports
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow border-orange-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-orange-500" />
                  Report Adverse Event
                </CardTitle>
                <CardDescription>Document patient side effects</CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/provider/report-event">
                  <Button className="w-full" variant="outline">
                    <AlertTriangle className="w-4 h-4 mr-2" />
                    Report Event
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>

          {/* Recent Patients */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Patient Activity</CardTitle>
              <CardDescription>Latest updates from your patients</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-3 rounded-lg bg-muted/50">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Users className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Sarah Johnson - New Lab Results</p>
                    <p className="text-xs text-muted-foreground">BPC-157 treatment - 2 hours ago</p>
                  </div>
                  <Button size="sm" variant="outline" className="bg-transparent">
                    View
                  </Button>
                </div>

                <div className="flex items-center gap-4 p-3 rounded-lg bg-muted/50">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Clock className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Michael Chen - Appointment Reminder</p>
                    <p className="text-xs text-muted-foreground">Follow-up visit - Tomorrow at 10:00 AM</p>
                  </div>
                  <Button size="sm" variant="outline" className="bg-transparent">
                    View
                  </Button>
                </div>

                <div className="flex items-center gap-4 p-3 rounded-lg bg-muted/50">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <ShoppingCart className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Emily Rodriguez - Order Completed</p>
                    <p className="text-xs text-muted-foreground">TB-500 shipped - 5 hours ago</p>
                  </div>
                  <Button size="sm" variant="outline" className="bg-transparent">
                    View
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  )
}
