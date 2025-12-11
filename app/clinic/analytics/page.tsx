"use client"

export const dynamic = 'force-dynamic'

import { ProtectedRoute } from "@/components/protected-route"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart3, TrendingUp, Star, AlertTriangle } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  Bar,
  BarChart,
  Line,
  LineChart,
  Pie,
  PieChart,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import { LayoutDashboardIcon, UsersIcon, SettingsIcon, BarChart3Icon } from "lucide-react"

const peptideOrderData = [
  { name: "Semaglutide", orders: 145, revenue: 21750 },
  { name: "BPC-157", orders: 132, revenue: 13200 },
  { name: "Tirzepatide", orders: 98, revenue: 19600 },
  { name: "TB-500", orders: 87, revenue: 10440 },
  { name: "CJC-1295", orders: 76, revenue: 9120 },
  { name: "Ipamorelin", orders: 65, revenue: 7800 },
  { name: "PT-141", orders: 54, revenue: 6480 },
  { name: "Melanotan II", orders: 43, revenue: 5160 },
]

const monthlyRevenueData = [
  { month: "Jan", revenue: 45000, orders: 180 },
  { month: "Feb", revenue: 52000, orders: 210 },
  { month: "Mar", revenue: 48000, orders: 195 },
  { month: "Apr", revenue: 61000, orders: 245 },
  { month: "May", revenue: 68000, orders: 275 },
  { month: "Jun", revenue: 73000, orders: 290 },
]

const providerRatings = [
  { name: "Dr. Sarah Johnson", rating: 4.9, patients: 87, reviews: 65 },
  { name: "Dr. Michael Chen", rating: 4.8, patients: 72, reviews: 58 },
  { name: "Dr. Emily Rodriguez", rating: 4.7, patients: 65, reviews: 52 },
  { name: "Dr. James Wilson", rating: 4.6, patients: 54, reviews: 43 },
]

const adverseEffects = [
  { peptide: "Semaglutide", effect: "Nausea", count: 12, severity: "Mild" },
  { peptide: "Tirzepatide", effect: "Nausea", count: 8, severity: "Mild" },
  { peptide: "BPC-157", effect: "Injection site reaction", count: 5, severity: "Mild" },
  { peptide: "PT-141", effect: "Flushing", count: 4, severity: "Mild" },
  { peptide: "Semaglutide", effect: "Headache", count: 3, severity: "Mild" },
]

const patientDistribution = [
  { range: "18-25", count: 15 },
  { range: "26-35", count: 45 },
  { range: "36-45", count: 78 },
  { range: "46-55", count: 92 },
  { range: "56-65", count: 65 },
  { range: "66+", count: 28 },
]

const COLORS = ["#3b82f6", "#8b5cf6", "#ec4899", "#f59e0b", "#10b981", "#06b6d4", "#6366f1", "#f97316"]

export default function AnalyticsPage() {
  return (
    <ProtectedRoute allowedRoles={["clinic_admin"]}>
      <DashboardLayout>
        <div className="space-y-6">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Analytics & Reporting</h2>
            <p className="text-muted-foreground">Comprehensive insights into your clinic's performance</p>
          </div>

          <div className="grid gap-4 md:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                <TrendingUp className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$73,000</div>
                <p className="text-xs text-muted-foreground">+12.5% from last month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
                <BarChart3 className="h-4 w-4 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">290</div>
                <p className="text-xs text-muted-foreground">+5.4% from last month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Avg Rating</CardTitle>
                <Star className="h-4 w-4 text-yellow-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">4.8</div>
                <p className="text-xs text-muted-foreground">Based on 218 reviews</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Adverse Events</CardTitle>
                <AlertTriangle className="h-4 w-4 text-orange-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">32</div>
                <p className="text-xs text-muted-foreground">All mild severity</p>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="peptides" className="space-y-4">
            <TabsList>
              <TabsTrigger value="peptides">Peptide Analytics</TabsTrigger>
              <TabsTrigger value="revenue">Revenue</TabsTrigger>
              <TabsTrigger value="providers">Provider Ratings</TabsTrigger>
              <TabsTrigger value="patients">Patient Demographics</TabsTrigger>
              <TabsTrigger value="adverse">Adverse Effects</TabsTrigger>
            </TabsList>

            <TabsContent value="peptides" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Most Ordered Peptides</CardTitle>
                    <CardDescription>Total orders by peptide type</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={peptideOrderData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="orders" fill="#3b82f6" />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Revenue by Peptide</CardTitle>
                    <CardDescription>Total revenue generated per peptide</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={peptideOrderData}
                          dataKey="revenue"
                          nameKey="name"
                          cx="50%"
                          cy="50%"
                          outerRadius={100}
                          label
                        >
                          {peptideOrderData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Peptide Performance Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {peptideOrderData.map((peptide, idx) => (
                      <div key={idx} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[idx] }} />
                          <div>
                            <p className="font-semibold">{peptide.name}</p>
                            <p className="text-sm text-muted-foreground">{peptide.orders} orders</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">${peptide.revenue.toLocaleString()}</p>
                          <p className="text-sm text-muted-foreground">revenue</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="revenue" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Monthly Revenue Trend</CardTitle>
                  <CardDescription>Revenue and order volume over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={400}>
                    <LineChart data={monthlyRevenueData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis yAxisId="left" />
                      <YAxis yAxisId="right" orientation="right" />
                      <Tooltip />
                      <Legend />
                      <Line yAxisId="left" type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={2} />
                      <Line yAxisId="right" type="monotone" dataKey="orders" stroke="#8b5cf6" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <div className="grid gap-4 md:grid-cols-3">
                <Card>
                  <CardHeader>
                    <CardTitle>Average Order Value</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">$252</div>
                    <p className="text-sm text-muted-foreground mt-2">
                      <TrendingUp className="inline w-4 h-4 text-green-600" /> +8.2% vs last month
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Profit Margin</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">32%</div>
                    <p className="text-sm text-muted-foreground mt-2">
                      <TrendingUp className="inline w-4 h-4 text-green-600" /> +2.1% vs last month
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Customer Retention</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">87%</div>
                    <p className="text-sm text-muted-foreground mt-2">
                      <TrendingUp className="inline w-4 h-4 text-green-600" /> +3.5% vs last month
                    </p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="providers" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Provider Performance</CardTitle>
                  <CardDescription>Ratings and patient volume by provider</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {providerRatings.map((provider, idx) => (
                      <div key={idx} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                            <span className="font-semibold text-primary">{provider.name.charAt(0)}</span>
                          </div>
                          <div>
                            <p className="font-semibold">{provider.name}</p>
                            <p className="text-sm text-muted-foreground">{provider.patients} active patients</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-6">
                          <div className="text-right">
                            <div className="flex items-center gap-1">
                              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                              <span className="font-semibold">{provider.rating}</span>
                            </div>
                            <p className="text-sm text-muted-foreground">{provider.reviews} reviews</p>
                          </div>
                          <Badge variant={provider.rating >= 4.8 ? "default" : "secondary"}>
                            {provider.rating >= 4.8 ? "Top Rated" : "Excellent"}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="patients" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Patient Age Distribution</CardTitle>
                  <CardDescription>Bell curve showing patient demographics</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={patientDistribution}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="range" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="count" fill="#3b82f6" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <div className="grid gap-4 md:grid-cols-3">
                <Card>
                  <CardHeader>
                    <CardTitle>Total Patients</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">323</div>
                    <p className="text-sm text-muted-foreground mt-2">Active patient accounts</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>New Patients (30d)</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">42</div>
                    <p className="text-sm text-muted-foreground mt-2">
                      <TrendingUp className="inline w-4 h-4 text-green-600" /> +15% vs last month
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Avg Age</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">47</div>
                    <p className="text-sm text-muted-foreground mt-2">Years old</p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="adverse" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Adverse Effects Report</CardTitle>
                  <CardDescription>All reported side effects and their severity</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {adverseEffects.map((effect, idx) => (
                      <div key={idx} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <AlertTriangle className="w-5 h-5 text-orange-500" />
                          <div>
                            <p className="font-semibold">{effect.peptide}</p>
                            <p className="text-sm text-muted-foreground">{effect.effect}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <p className="font-semibold">{effect.count} reports</p>
                          </div>
                          <Badge variant={effect.severity === "Mild" ? "secondary" : "destructive"}>
                            {effect.severity}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Safety Metrics</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Total Adverse Events</span>
                      <span className="font-semibold">32</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Mild Severity</span>
                      <span className="font-semibold text-green-600">32 (100%)</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Moderate Severity</span>
                      <span className="font-semibold">0 (0%)</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Severe Severity</span>
                      <span className="font-semibold">0 (0%)</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Key Insights</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <p className="text-sm text-muted-foreground">
                      All reported adverse effects are mild and expected side effects of peptide therapy.
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Nausea is the most common side effect, primarily with GLP-1 agonists (Semaglutide, Tirzepatide).
                    </p>
                    <p className="text-sm text-muted-foreground">
                      No serious adverse events have been reported, demonstrating the safety profile of your clinic's
                      peptide therapy program.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  )
}
