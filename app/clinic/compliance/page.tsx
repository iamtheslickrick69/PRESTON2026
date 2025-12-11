"use client"

export const dynamic = 'force-dynamic'

import { ProtectedRoute } from "@/components/protected-route"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { LayoutDashboard, Users, UserCheck, Settings, CreditCard, Building2, ShieldCheck, AlertTriangle, CheckCircle, Clock, XCircle, FileText, Calendar, RefreshCw, Download, Eye, MoreVertical, TrendingUp, AlertCircle, FileCheck, Scale, User, Pill, ClipboardCheck, History, Search, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useState } from "react"
import { toast } from "sonner"

const complianceMetrics = {
  overallScore: 94,
  consentCompliance: 98,
  documentationCompliance: 92,
  prescriptionCompliance: 95,
  trainingCompliance: 88,
}

const expiringItems = [
  { id: "1", type: "License", name: "Dr. Sarah Williams - NP License", expiresIn: 15, status: "warning" },
  { id: "2", type: "Consent", name: "Michael Chen - Treatment Consent", expiresIn: 7, status: "urgent" },
  { id: "3", type: "Certification", name: "Dr. James Wilson - DEA License", expiresIn: 30, status: "warning" },
  { id: "4", type: "Training", name: "Emily Rodriguez - HIPAA Training", expiresIn: 5, status: "urgent" },
  { id: "5", type: "Insurance", name: "Clinic Malpractice Insurance", expiresIn: 45, status: "normal" },
]

const auditLog = [
  { id: "1", action: "Prescription Created", user: "Dr. Sarah Williams", patient: "John Doe", timestamp: "Today, 2:45 PM", details: "BPC-157 10mg prescribed" },
  { id: "2", action: "Patient Record Accessed", user: "Dr. James Wilson", patient: "Sarah Johnson", timestamp: "Today, 2:30 PM", details: "Viewed medical history" },
  { id: "3", action: "Lab Results Uploaded", user: "Admin Staff", patient: "Michael Chen", timestamp: "Today, 1:15 PM", details: "Blood work results" },
  { id: "4", action: "Consent Form Signed", user: "Emily Rodriguez", patient: "Emily Rodriguez", timestamp: "Today, 11:00 AM", details: "Treatment consent" },
  { id: "5", action: "Telehealth Session", user: "Dr. Sarah Williams", patient: "Lisa Thompson", timestamp: "Yesterday, 3:30 PM", details: "30 min consultation" },
  { id: "6", action: "Prescription Refill", user: "Dr. Sarah Williams", patient: "John Doe", timestamp: "Yesterday, 2:00 PM", details: "Semaglutide refill approved" },
  { id: "7", action: "Patient Record Created", user: "Admin Staff", patient: "New Patient", timestamp: "Yesterday, 10:00 AM", details: "Initial intake completed" },
  { id: "8", action: "Adverse Event Reported", user: "Dr. James Wilson", patient: "Robert Brown", timestamp: "2 days ago", details: "Mild nausea reported" },
]

const providerCompliance = [
  { id: "1", name: "Dr. Sarah Williams, NP", role: "Nurse Practitioner", licenseStatus: "active", licenseExpiry: "2025-06-15", hipaaTraining: "current", dea: "active", patients: 45, score: 98 },
  { id: "2", name: "Dr. James Wilson, MD", role: "Physician", licenseStatus: "active", licenseExpiry: "2024-12-01", hipaaTraining: "current", dea: "active", patients: 38, score: 95 },
  { id: "3", name: "Dr. Emily Chen, PA", role: "Physician Assistant", licenseStatus: "active", licenseExpiry: "2025-03-20", hipaaTraining: "expiring", dea: "active", patients: 32, score: 88 },
  { id: "4", name: "Dr. Michael Brown, NP", role: "Nurse Practitioner", licenseStatus: "active", licenseExpiry: "2024-08-30", hipaaTraining: "current", dea: "pending", patients: 28, score: 82 },
]

const patientConsentStatus = [
  { id: "1", name: "John Doe", treatmentConsent: "signed", hipaaConsent: "signed", telehealth: "signed", lastUpdated: "Jan 15, 2024" },
  { id: "2", name: "Sarah Johnson", treatmentConsent: "signed", hipaaConsent: "signed", telehealth: "expired", lastUpdated: "Dec 20, 2023" },
  { id: "3", name: "Michael Chen", treatmentConsent: "expiring", hipaaConsent: "signed", telehealth: "signed", lastUpdated: "Jan 10, 2024" },
  { id: "4", name: "Emily Rodriguez", treatmentConsent: "signed", hipaaConsent: "signed", telehealth: "signed", lastUpdated: "Jan 18, 2024" },
  { id: "5", name: "Lisa Thompson", treatmentConsent: "missing", hipaaConsent: "signed", telehealth: "missing", lastUpdated: "Jan 5, 2024" },
]

export default function ClinicCompliancePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [timeFilter, setTimeFilter] = useState("7days")

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
      case "current":
      case "signed":
        return <Badge className="bg-green-100 text-green-800">Active</Badge>
      case "expiring":
      case "warning":
        return <Badge className="bg-yellow-100 text-yellow-800">Expiring</Badge>
      case "expired":
      case "missing":
        return <Badge variant="destructive">Action Required</Badge>
      case "pending":
        return <Badge variant="secondary">Pending</Badge>
      case "urgent":
        return <Badge variant="destructive">Urgent</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 95) return "text-green-600"
    if (score >= 85) return "text-yellow-600"
    return "text-red-600"
  }

  return (
    <ProtectedRoute allowedRoles={["clinic_admin"]}>
      <DashboardLayout>
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">Compliance Dashboard</h2>
              <p className="text-muted-foreground">
                Monitor HIPAA compliance, licenses, and regulatory requirements
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Export Report
              </Button>
              <Button>
                <RefreshCw className="w-4 h-4 mr-2" />
                Run Audit
              </Button>
            </div>
          </div>

          {/* Compliance Score Overview */}
          <div className="grid gap-4 md:grid-cols-5">
            <Card className="col-span-2 md:col-span-1">
              <CardContent className="p-6">
                <div className="text-center">
                  <div className={`text-5xl font-bold ${getScoreColor(complianceMetrics.overallScore)}`}>
                    {complianceMetrics.overallScore}%
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">Overall Score</p>
                  <div className="flex items-center justify-center gap-1 mt-2">
                    <TrendingUp className="w-4 h-4 text-green-500" />
                    <span className="text-xs text-green-600">+2% from last month</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3 mb-2">
                  <FileCheck className="w-5 h-5 text-green-500" />
                  <span className="text-sm font-medium">Consents</span>
                </div>
                <div className="text-2xl font-bold">{complianceMetrics.consentCompliance}%</div>
                <Progress value={complianceMetrics.consentCompliance} className="h-1 mt-2" />
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3 mb-2">
                  <FileText className="w-5 h-5 text-blue-500" />
                  <span className="text-sm font-medium">Documentation</span>
                </div>
                <div className="text-2xl font-bold">{complianceMetrics.documentationCompliance}%</div>
                <Progress value={complianceMetrics.documentationCompliance} className="h-1 mt-2" />
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3 mb-2">
                  <Pill className="w-5 h-5 text-purple-500" />
                  <span className="text-sm font-medium">Prescriptions</span>
                </div>
                <div className="text-2xl font-bold">{complianceMetrics.prescriptionCompliance}%</div>
                <Progress value={complianceMetrics.prescriptionCompliance} className="h-1 mt-2" />
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3 mb-2">
                  <ClipboardCheck className="w-5 h-5 text-orange-500" />
                  <span className="text-sm font-medium">Training</span>
                </div>
                <div className="text-2xl font-bold">{complianceMetrics.trainingCompliance}%</div>
                <Progress value={complianceMetrics.trainingCompliance} className="h-1 mt-2" />
              </CardContent>
            </Card>
          </div>

          {/* Alerts Section */}
          <Card className="border-orange-200">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-orange-500" />
                Action Required ({expiringItems.filter(i => i.status === "urgent").length} Urgent)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {expiringItems.map((item) => (
                  <div
                    key={item.id}
                    className={`flex items-center justify-between p-3 rounded-lg border ${
                      item.status === "urgent" ? "border-red-200 bg-red-50" :
                      item.status === "warning" ? "border-yellow-200 bg-yellow-50" :
                      "border-gray-200"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      {item.status === "urgent" ? (
                        <AlertCircle className="w-5 h-5 text-red-500" />
                      ) : (
                        <Clock className="w-5 h-5 text-yellow-500" />
                      )}
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {item.type} expires in {item.expiresIn} days
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {getStatusBadge(item.status)}
                      <Button size="sm" variant="outline">Resolve</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Main Content Tabs */}
          <Tabs defaultValue="providers" className="w-full">
            <TabsList>
              <TabsTrigger value="providers">
                <UserCheck className="w-4 h-4 mr-2" />
                Providers
              </TabsTrigger>
              <TabsTrigger value="patients">
                <Users className="w-4 h-4 mr-2" />
                Patient Consents
              </TabsTrigger>
              <TabsTrigger value="audit">
                <History className="w-4 h-4 mr-2" />
                Audit Log
              </TabsTrigger>
            </TabsList>

            {/* Providers Tab */}
            <TabsContent value="providers" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Provider Compliance Status</CardTitle>
                  <CardDescription>License, certification, and training status for all providers</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Provider</TableHead>
                        <TableHead>License</TableHead>
                        <TableHead>DEA</TableHead>
                        <TableHead>HIPAA Training</TableHead>
                        <TableHead>Patients</TableHead>
                        <TableHead>Score</TableHead>
                        <TableHead></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {providerCompliance.map((provider) => (
                        <TableRow key={provider.id}>
                          <TableCell>
                            <div>
                              <p className="font-medium">{provider.name}</p>
                              <p className="text-sm text-muted-foreground">{provider.role}</p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div>
                              {getStatusBadge(provider.licenseStatus)}
                              <p className="text-xs text-muted-foreground mt-1">
                                Exp: {provider.licenseExpiry}
                              </p>
                            </div>
                          </TableCell>
                          <TableCell>
                            {getStatusBadge(provider.dea)}
                          </TableCell>
                          <TableCell>
                            {getStatusBadge(provider.hipaaTraining)}
                          </TableCell>
                          <TableCell>{provider.patients}</TableCell>
                          <TableCell>
                            <span className={`font-bold ${getScoreColor(provider.score)}`}>
                              {provider.score}%
                            </span>
                          </TableCell>
                          <TableCell>
                            <Button variant="ghost" size="icon">
                              <Eye className="w-4 h-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Patient Consents Tab */}
            <TabsContent value="patients" className="mt-4">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Patient Consent Status</CardTitle>
                      <CardDescription>Track consent forms and HIPAA acknowledgments</CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          placeholder="Search patients..."
                          className="pl-10 w-64"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                        />
                      </div>
                      <Select defaultValue="all">
                        <SelectTrigger className="w-[150px]">
                          <SelectValue placeholder="Filter" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Patients</SelectItem>
                          <SelectItem value="missing">Missing Consent</SelectItem>
                          <SelectItem value="expiring">Expiring Soon</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Patient</TableHead>
                        <TableHead>Treatment Consent</TableHead>
                        <TableHead>HIPAA Consent</TableHead>
                        <TableHead>Telehealth Consent</TableHead>
                        <TableHead>Last Updated</TableHead>
                        <TableHead></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {patientConsentStatus.map((patient) => (
                        <TableRow key={patient.id}>
                          <TableCell className="font-medium">{patient.name}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              {patient.treatmentConsent === "signed" ? (
                                <CheckCircle className="w-4 h-4 text-green-500" />
                              ) : patient.treatmentConsent === "expiring" ? (
                                <Clock className="w-4 h-4 text-yellow-500" />
                              ) : (
                                <XCircle className="w-4 h-4 text-red-500" />
                              )}
                              {getStatusBadge(patient.treatmentConsent)}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              {patient.hipaaConsent === "signed" ? (
                                <CheckCircle className="w-4 h-4 text-green-500" />
                              ) : (
                                <XCircle className="w-4 h-4 text-red-500" />
                              )}
                              {getStatusBadge(patient.hipaaConsent)}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              {patient.telehealth === "signed" ? (
                                <CheckCircle className="w-4 h-4 text-green-500" />
                              ) : patient.telehealth === "expired" ? (
                                <Clock className="w-4 h-4 text-yellow-500" />
                              ) : (
                                <XCircle className="w-4 h-4 text-red-500" />
                              )}
                              {getStatusBadge(patient.telehealth)}
                            </div>
                          </TableCell>
                          <TableCell className="text-muted-foreground text-sm">
                            {patient.lastUpdated}
                          </TableCell>
                          <TableCell>
                            <Button variant="outline" size="sm">
                              Request Consent
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Audit Log Tab */}
            <TabsContent value="audit" className="mt-4">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Audit Trail</CardTitle>
                      <CardDescription>HIPAA-compliant activity logging</CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <Select value={timeFilter} onValueChange={setTimeFilter}>
                        <SelectTrigger className="w-[150px]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="today">Today</SelectItem>
                          <SelectItem value="7days">Last 7 Days</SelectItem>
                          <SelectItem value="30days">Last 30 Days</SelectItem>
                          <SelectItem value="90days">Last 90 Days</SelectItem>
                        </SelectContent>
                      </Select>
                      <Button variant="outline">
                        <Download className="w-4 h-4 mr-2" />
                        Export
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {auditLog.map((log) => (
                      <div
                        key={log.id}
                        className="flex items-start justify-between p-4 rounded-lg border hover:bg-muted/50 transition-colors"
                      >
                        <div className="flex items-start gap-4">
                          <div className="p-2 bg-muted rounded-lg">
                            <History className="w-4 h-4 text-muted-foreground" />
                          </div>
                          <div>
                            <p className="font-medium">{log.action}</p>
                            <p className="text-sm text-muted-foreground">
                              <span className="font-medium">{log.user}</span>
                              {log.patient && <> • Patient: {log.patient}</>}
                            </p>
                            {log.details && (
                              <p className="text-sm text-muted-foreground mt-1">
                                {log.details}
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-muted-foreground">{log.timestamp}</p>
                          <Button variant="ghost" size="sm" className="mt-1">
                            <Eye className="w-3 h-3 mr-1" />
                            Details
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 text-center">
                    <Button variant="outline">Load More</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* HIPAA Checklist */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Scale className="w-5 h-5" />
                HIPAA Compliance Checklist
              </CardTitle>
              <CardDescription>Essential compliance requirements status</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {[
                  { name: "Business Associate Agreements", status: "complete", icon: FileCheck },
                  { name: "Risk Assessment (Annual)", status: "complete", icon: ShieldCheck },
                  { name: "Workforce Training", status: "partial", icon: Users },
                  { name: "Access Controls", status: "complete", icon: User },
                  { name: "Audit Controls", status: "complete", icon: History },
                  { name: "Data Encryption", status: "complete", icon: ShieldCheck },
                  { name: "Incident Response Plan", status: "complete", icon: AlertTriangle },
                  { name: "Backup & Recovery", status: "complete", icon: RefreshCw },
                  { name: "Physical Safeguards", status: "partial", icon: Building2 },
                ].map((item, index) => {
                  const Icon = item.icon
                  return (
                    <div
                      key={index}
                      className={`flex items-center gap-3 p-3 rounded-lg border ${
                        item.status === "complete" ? "border-green-200 bg-green-50" :
                        item.status === "partial" ? "border-yellow-200 bg-yellow-50" :
                        "border-red-200 bg-red-50"
                      }`}
                    >
                      {item.status === "complete" ? (
                        <CheckCircle className="w-5 h-5 text-green-600" />
                      ) : item.status === "partial" ? (
                        <Clock className="w-5 h-5 text-yellow-600" />
                      ) : (
                        <XCircle className="w-5 h-5 text-red-600" />
                      )}
                      <div className="flex-1">
                        <p className="text-sm font-medium">{item.name}</p>
                      </div>
                      <Icon className="w-4 h-4 text-muted-foreground" />
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  )
}
