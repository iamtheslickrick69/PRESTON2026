"use client"

export const dynamic = 'force-dynamic'

import { ProtectedRoute } from "@/components/protected-route"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Building2, Users, UserCog, Activity, DollarSign, BarChart, TrendingUp } from "lucide-react"
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
const patientDemographicsData = [
  { ageGroup: "18-25", count: 45 },
  { ageGroup: "26-35", count: 78 },
  { ageGroup: "36-45", count: 92 },
  { ageGroup: "46-55", count: 65 },
  { ageGroup: "56-65", count: 48 },
  { ageGroup: "65+", count: 32 },
]

const peptidePrescriptionsData = [
  { name: "BPC-157", prescriptions: 145 },
  { name: "TB-500", prescriptions: 98 },
  { name: "Semaglutide", prescriptions: 87 },
  { name: "Tirzepatide", prescriptions: 76 },
  { name: "CJC-1295", prescriptions: 65 },
  { name: "Ipamorelin", prescriptions: 54 },
]

const revenueData = [
  { month: "Jan", revenue: 32400 },
  { month: "Feb", revenue: 35800 },
  { month: "Mar", revenue: 38200 },
  { month: "Apr", revenue: 41500 },
  { month: "May", revenue: 39800 },
  { month: "Jun", revenue: 45200 },
]

const providerActivityData = [
  { provider: "Dr. Smith", patients: 45 },
  { provider: "Dr. Johnson", patients: 38 },
  { provider: "Dr. Williams", patients: 42 },
  { provider: "Dr. Brown", patients: 35 },
  { provider: "Dr. Davis", patients: 40 },
]

const patientVisitsData = [
  { week: "Week 1", visits: 45 },
  { week: "Week 2", visits: 52 },
  { week: "Week 3", visits: 48 },
  { week: "Week 4", visits: 61 },
]

const COLORS = ["#33669A", "#4A7FB8", "#6198D6", "#78B1F4", "#8FC9FF"]

export default function ClinicReportsPage() {
  const [dataSet, setDataSet] = useState("patient-demographics")
  const [reportType, setReportType] = useState("bar")
  const [dateRange, setDateRange] = useState("last-30-days")
  const [showReport, setShowReport] = useState(false)

  const getChartData = () => {
    switch (dataSet) {
      case "patient-demographics":
        return patientDemographicsData
      case "peptide-prescriptions":
        return peptidePrescriptionsData
      case "revenue":
        return revenueData
      case "provider-activity":
        return providerActivityData
      case "patient-visits":
        return patientVisitsData
      default:
        return patientDemographicsData
    }
  }

  const getDataKeys = () => {
    switch (dataSet) {
      case "patient-demographics":
        return { x: "ageGroup", y: "count" }
      case "peptide-prescriptions":
        return { x: "name", y: "prescriptions" }
      case "revenue":
        return { x: "month", y: "revenue" }
      case "provider-activity":
        return { x: "provider", y: "patients" }
      case "patient-visits":
        return { x: "week", y: "visits" }
      default:
        return { x: "ageGroup", y: "count" }
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
    <ProtectedRoute allowedRoles={["clinic_admin"]}>
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
                      <SelectItem value="patient-demographics">Patient Demographics</SelectItem>
                      <SelectItem value="peptide-prescriptions">Peptide Prescriptions</SelectItem>
                      <SelectItem value="revenue">Revenue Analysis</SelectItem>
                      <SelectItem value="provider-activity">Provider Activity</SelectItem>
                      <SelectItem value="patient-visits">Patient Visits</SelectItem>
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
                <div className="text-2xl font-bold">127</div>
                <p className="text-xs text-muted-foreground">This month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Most Viewed Report</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">Revenue</div>
                <p className="text-xs text-muted-foreground">45 views</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Data Points</CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2,847</div>
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
                <p className="text-xs text-muted-foreground">2 hours ago</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  )
}
