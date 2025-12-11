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
  BookOpen,
  Calculator,
  FileText,
  BarChart,
  TrendingUp,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from "react"
import {
  BarChart as RechartsBarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts"

// Sample data for different report types
const myPatientsData = [
  { status: "Active", count: 38 },
  { status: "Inactive", count: 7 },
  { status: "New", count: 5 },
]

const treatmentOutcomesData = [
  { peptide: "BPC-157", success: 92 },
  { peptide: "TB-500", success: 88 },
  { peptide: "Semaglutide", success: 85 },
  { peptide: "CJC-1295", success: 90 },
]

const appointmentsData = [
  { month: "Jan", appointments: 45 },
  { month: "Feb", appointments: 52 },
  { month: "Mar", appointments: 48 },
  { month: "Apr", appointments: 61 },
  { month: "May", appointments: 58 },
  { month: "Jun", appointments: 67 },
]

const prescriptionsData = [
  { week: "Week 1", prescriptions: 12 },
  { week: "Week 2", prescriptions: 15 },
  { week: "Week 3", prescriptions: 18 },
  { week: "Week 4", prescriptions: 14 },
]

const patientSatisfactionData = [
  { rating: "5 Stars", count: 32 },
  { rating: "4 Stars", count: 8 },
  { rating: "3 Stars", count: 3 },
  { rating: "2 Stars", count: 1 },
  { rating: "1 Star", count: 1 },
]

const COLORS = ["#33669A", "#4A7FB8", "#6198D6", "#78B1F4", "#8FC9FF"]

export default function ProviderReportsPage() {
  const [dataSet, setDataSet] = useState("my-patients")
  const [reportType, setReportType] = useState("bar")
  const [dateRange, setDateRange] = useState("last-30-days")
  const [showReport, setShowReport] = useState(false)

  const getChartData = () => {
    switch (dataSet) {
      case "my-patients":
        return myPatientsData
      case "treatment-outcomes":
        return treatmentOutcomesData
      case "appointments":
        return appointmentsData
      case "prescriptions":
        return prescriptionsData
      case "patient-satisfaction":
        return patientSatisfactionData
      default:
        return myPatientsData
    }
  }

  const getDataKeys = () => {
    switch (dataSet) {
      case "my-patients":
        return { x: "status", y: "count" }
      case "treatment-outcomes":
        return { x: "peptide", y: "success" }
      case "appointments":
        return { x: "month", y: "appointments" }
      case "prescriptions":
        return { x: "week", y: "prescriptions" }
      case "patient-satisfaction":
        return { x: "rating", y: "count" }
      default:
        return { x: "status", y: "count" }
    }
  }

  const renderChart = () => {
    const data = getChartData()
    const keys = getDataKeys()

    switch (reportType) {
      case "bar":
        return (
          <ResponsiveContainer width="100%" height={400}>
            <RechartsBarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey={keys.x} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey={keys.y} fill="#33669A" />
            </RechartsBarChart>
          </ResponsiveContainer>
        )
      case "line":
        return (
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey={keys.x} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey={keys.y} stroke="#33669A" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        )
      case "area":
        return (
          <ResponsiveContainer width="100%" height={400}>
            <AreaChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey={keys.x} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Area type="monotone" dataKey={keys.y} stroke="#33669A" fill="#33669A" fillOpacity={0.6} />
            </AreaChart>
          </ResponsiveContainer>
        )
      case "pie":
        return (
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={(entry) => `${entry[keys.x]}: ${entry[keys.y]}`}
                outerRadius={120}
                fill="#8884d8"
                dataKey={keys.y}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        )
      default:
        return null
    }
  }

  return (
    <ProtectedRoute allowedRoles={["provider"]}>
      <DashboardLayout>
        <div className="space-y-6">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Reports</h2>
            <p className="text-muted-foreground">Generate and view comprehensive data reports</p>
          </div>

          {/* Report Configuration */}
          <Card>
            <CardHeader>
              <CardTitle>Report Configuration</CardTitle>
              <CardDescription>Select the data and visualization type for your report</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-6 md:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor="data-set">Data Set</Label>
                  <Select value={dataSet} onValueChange={setDataSet}>
                    <SelectTrigger id="data-set">
                      <SelectValue placeholder="Select data set" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="my-patients">My Patients</SelectItem>
                      <SelectItem value="treatment-outcomes">Treatment Outcomes</SelectItem>
                      <SelectItem value="appointments">Appointments</SelectItem>
                      <SelectItem value="prescriptions">Prescriptions</SelectItem>
                      <SelectItem value="patient-satisfaction">Patient Satisfaction</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="report-type">Report Type</Label>
                  <Select value={reportType} onValueChange={setReportType}>
                    <SelectTrigger id="report-type">
                      <SelectValue placeholder="Select report type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="bar">Bar Chart</SelectItem>
                      <SelectItem value="line">Line Chart</SelectItem>
                      <SelectItem value="area">Area Chart</SelectItem>
                      <SelectItem value="pie">Pie Chart</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="date-range">Date Range</Label>
                  <Select value={dateRange} onValueChange={setDateRange}>
                    <SelectTrigger id="date-range">
                      <SelectValue placeholder="Select date range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="last-7-days">Last 7 Days</SelectItem>
                      <SelectItem value="last-30-days">Last 30 Days</SelectItem>
                      <SelectItem value="last-90-days">Last 90 Days</SelectItem>
                      <SelectItem value="last-6-months">Last 6 Months</SelectItem>
                      <SelectItem value="last-year">Last Year</SelectItem>
                      <SelectItem value="all-time">All Time</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button
                onClick={() => setShowReport(true)}
                className="w-full md:w-auto"
                style={{ backgroundColor: "#33669A" }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#2a5580")}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#33669A")}
              >
                <BarChart className="w-4 h-4 mr-2" />
                Run Report
              </Button>
            </CardContent>
          </Card>

          {/* Report Display */}
          {showReport && (
            <Card>
              <CardHeader>
                <CardTitle>Report Results</CardTitle>
                <CardDescription>
                  {dataSet
                    .split("-")
                    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(" ")}{" "}
                  -{" "}
                  {dateRange
                    .split("-")
                    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(" ")}
                </CardDescription>
              </CardHeader>
              <CardContent>{renderChart()}</CardContent>
            </Card>
          )}

          {/* Quick Stats */}
          <div className="grid gap-4 md:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Reports Generated</CardTitle>
                <BarChart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">89</div>
                <p className="text-xs text-muted-foreground">This month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Most Viewed Report</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">Patients</div>
                <p className="text-xs text-muted-foreground">32 views</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Data Points</CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1,247</div>
                <p className="text-xs text-muted-foreground">Across all reports</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Last Updated</CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">Today</div>
                <p className="text-xs text-muted-foreground">1 hour ago</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  )
}
