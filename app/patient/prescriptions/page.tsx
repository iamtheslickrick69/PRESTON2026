"use client"

export const dynamic = 'force-dynamic'

import { ProtectedRoute } from "@/components/protected-route"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Home, Calendar, Calculator, BookOpen, Phone, Activity, ShoppingCart, Package, Pill, RefreshCw, Clock, CheckCircle, AlertTriangle, FileText, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from "@/components/ui/dialog"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useState } from "react"
import { toast } from "sonner"
import Link from "next/link"

const myPrescriptions = [
  {
    id: "RX001",
    peptide: "BPC-157",
    strength: "10mg",
    dose: "500mcg",
    frequency: "Once daily",
    duration: "8 weeks",
    status: "active",
    createdAt: "2024-01-15",
    startDate: "2024-01-18",
    endDate: "2024-03-14",
    refillsRemaining: 2,
    refillsUsed: 1,
    currentVialNumber: 2,
    totalVials: 3,
    daysRemaining: 45,
    percentComplete: 35,
    instructions: "Inject subcutaneously in the morning before breakfast. Rotate injection sites.",
    provider: "Dr. Sarah Williams, NP",
    pharmacy: "Bridge Pharmacy",
    prescribedFor: "Gut healing & tissue repair",
    sideEffects: ["Mild injection site reaction", "Slight fatigue initially"],
    precautions: "Store refrigerated. Do not freeze. Use within 30 days of reconstitution.",
  },
  {
    id: "RX002",
    peptide: "TB-500",
    strength: "5mg",
    dose: "2.5mg",
    frequency: "Twice weekly",
    duration: "4 weeks",
    status: "active",
    createdAt: "2024-01-15",
    startDate: "2024-01-18",
    endDate: "2024-02-15",
    refillsRemaining: 1,
    refillsUsed: 0,
    currentVialNumber: 1,
    totalVials: 2,
    daysRemaining: 21,
    percentComplete: 50,
    instructions: "Inject subcutaneously. Space doses 3-4 days apart (e.g., Monday & Thursday).",
    provider: "Dr. Sarah Williams, NP",
    pharmacy: "Bridge Pharmacy",
    prescribedFor: "Joint recovery & flexibility",
    sideEffects: ["Temporary head rush"],
    precautions: "Avoid strenuous activity for 30 minutes after injection.",
  },
  {
    id: "RX003",
    peptide: "Semaglutide",
    strength: "5mg",
    dose: "0.5mg",
    frequency: "Once weekly",
    duration: "Ongoing",
    status: "refill_needed",
    createdAt: "2023-11-01",
    startDate: "2023-11-05",
    endDate: null,
    refillsRemaining: 0,
    refillsUsed: 3,
    currentVialNumber: 4,
    totalVials: 4,
    daysRemaining: 3,
    percentComplete: 95,
    instructions: "Inject subcutaneously on the same day each week (Sundays). Gradually titrate dose as directed.",
    provider: "Dr. Sarah Williams, NP",
    pharmacy: "Bridge Pharmacy",
    prescribedFor: "Weight management",
    sideEffects: ["Nausea (especially first few weeks)", "Reduced appetite"],
    precautions: "Start with low dose and titrate slowly. Report persistent nausea to provider.",
  },
  {
    id: "RX004",
    peptide: "CJC-1295 / Ipamorelin",
    strength: "5mg/5mg",
    dose: "300mcg/200mcg",
    frequency: "Once daily",
    duration: "12 weeks",
    status: "completed",
    createdAt: "2023-09-01",
    startDate: "2023-09-05",
    endDate: "2023-11-28",
    refillsRemaining: 0,
    refillsUsed: 3,
    currentVialNumber: 3,
    totalVials: 3,
    daysRemaining: 0,
    percentComplete: 100,
    instructions: "Inject subcutaneously before bed on an empty stomach (2+ hours after eating).",
    provider: "Dr. Sarah Williams, NP",
    pharmacy: "Bridge Pharmacy",
    prescribedFor: "Growth hormone optimization",
    sideEffects: ["Vivid dreams", "Increased hunger"],
    precautions: "Do not eat within 30 minutes of injection.",
  },
]

export default function PatientPrescriptionsPage() {
  const [selectedRx, setSelectedRx] = useState<typeof myPrescriptions[0] | null>(null)

  const activePrescriptions = myPrescriptions.filter(rx => rx.status === "active" || rx.status === "refill_needed")
  const completedPrescriptions = myPrescriptions.filter(rx => rx.status === "completed")
  const needsRefill = myPrescriptions.filter(rx => rx.status === "refill_needed" || rx.refillsRemaining === 0 && rx.status === "active")

  const handleRequestRefill = (rxId: string) => {
    toast.success("Refill request sent to your provider")
  }

  const getStatusBadge = (status: string, daysRemaining?: number) => {
    if (status === "refill_needed" || (daysRemaining && daysRemaining <= 7 && status === "active")) {
      return <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-100">Refill Needed</Badge>
    }
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Active</Badge>
      case "completed":
        return <Badge variant="secondary">Completed</Badge>
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Pending</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <ProtectedRoute allowedRoles={["patient"]}>
      <DashboardLayout>
        <div className="space-y-6">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">My Prescriptions</h2>
            <p className="text-muted-foreground">View and manage your active peptide prescriptions</p>
          </div>

          {/* Refill Alert */}
          {needsRefill.length > 0 && (
            <Alert className="border-orange-200 bg-orange-50">
              <AlertTriangle className="h-4 w-4 text-orange-600" />
              <AlertTitle className="text-orange-800">Refill Needed</AlertTitle>
              <AlertDescription className="text-orange-700">
                You have {needsRefill.length} prescription{needsRefill.length > 1 ? "s" : ""} that need{needsRefill.length === 1 ? "s" : ""} a refill. Request a refill to avoid interruption in your treatment.
              </AlertDescription>
            </Alert>
          )}

          {/* Quick Stats */}
          <div className="grid gap-4 md:grid-cols-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{activePrescriptions.length}</p>
                    <p className="text-sm text-muted-foreground">Active Prescriptions</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-orange-100 rounded-lg">
                    <RefreshCw className="w-5 h-5 text-orange-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{needsRefill.length}</p>
                    <p className="text-sm text-muted-foreground">Needs Refill</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Pill className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{myPrescriptions.length}</p>
                    <p className="text-sm text-muted-foreground">Total Prescriptions</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <Clock className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{completedPrescriptions.length}</p>
                    <p className="text-sm text-muted-foreground">Completed</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Prescriptions List */}
          <Tabs defaultValue="active" className="w-full">
            <TabsList>
              <TabsTrigger value="active">Active ({activePrescriptions.length})</TabsTrigger>
              <TabsTrigger value="completed">Completed ({completedPrescriptions.length})</TabsTrigger>
              <TabsTrigger value="all">All ({myPrescriptions.length})</TabsTrigger>
            </TabsList>

            <TabsContent value="active" className="mt-4">
              <div className="space-y-4">
                {activePrescriptions.map((rx) => (
                  <Card key={rx.id} className={`hover:shadow-md transition-shadow ${rx.status === "refill_needed" || rx.daysRemaining <= 7 ? "border-orange-200" : ""}`}>
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                        <div className="flex items-start gap-4">
                          <div className={`p-3 rounded-lg ${rx.status === "refill_needed" || rx.daysRemaining <= 7 ? "bg-orange-100" : "bg-primary/10"}`}>
                            <Pill className={`w-6 h-6 ${rx.status === "refill_needed" || rx.daysRemaining <= 7 ? "text-orange-600" : "text-primary"}`} />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1 flex-wrap">
                              <h3 className="text-lg font-semibold">{rx.peptide}</h3>
                              {getStatusBadge(rx.status, rx.daysRemaining)}
                            </div>
                            <p className="text-sm text-muted-foreground mb-3">
                              {rx.prescribedFor} | Prescribed by {rx.provider}
                            </p>

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-4">
                              <div>
                                <p className="text-muted-foreground">Dose</p>
                                <p className="font-medium">{rx.dose}</p>
                              </div>
                              <div>
                                <p className="text-muted-foreground">Frequency</p>
                                <p className="font-medium">{rx.frequency}</p>
                              </div>
                              <div>
                                <p className="text-muted-foreground">Vial</p>
                                <p className="font-medium">{rx.currentVialNumber} of {rx.totalVials}</p>
                              </div>
                              <div>
                                <p className="text-muted-foreground">Refills Left</p>
                                <p className={`font-medium ${rx.refillsRemaining === 0 ? "text-orange-600" : ""}`}>
                                  {rx.refillsRemaining}
                                </p>
                              </div>
                            </div>

                            {/* Progress Bar */}
                            <div className="space-y-1">
                              <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">Treatment Progress</span>
                                <span className="font-medium">{rx.percentComplete}% complete</span>
                              </div>
                              <Progress value={rx.percentComplete} className="h-2" />
                              <p className="text-xs text-muted-foreground">
                                {rx.daysRemaining > 0 ? `${rx.daysRemaining} days remaining` : "Treatment completed"}
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-col gap-2 md:items-end">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="outline" size="sm" onClick={() => setSelectedRx(rx)}>
                                <Info className="w-4 h-4 mr-2" />
                                View Details
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-2xl">
                              <DialogHeader>
                                <DialogTitle className="flex items-center gap-2">
                                  <Pill className="w-5 h-5" />
                                  {rx.peptide}
                                </DialogTitle>
                                <DialogDescription>
                                  Rx #{rx.id} | Prescribed {rx.createdAt}
                                </DialogDescription>
                              </DialogHeader>

                              <div className="space-y-6 py-4">
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <p className="text-sm text-muted-foreground">Prescribed By</p>
                                    <p className="font-medium">{rx.provider}</p>
                                  </div>
                                  <div>
                                    <p className="text-sm text-muted-foreground">Pharmacy</p>
                                    <p className="font-medium">{rx.pharmacy}</p>
                                  </div>
                                  <div>
                                    <p className="text-sm text-muted-foreground">Start Date</p>
                                    <p className="font-medium">{rx.startDate}</p>
                                  </div>
                                  <div>
                                    <p className="text-sm text-muted-foreground">End Date</p>
                                    <p className="font-medium">{rx.endDate || "Ongoing"}</p>
                                  </div>
                                </div>

                                <div className="border-t pt-4">
                                  <h4 className="font-semibold mb-2">Dosing Information</h4>
                                  <div className="grid grid-cols-3 gap-4 text-sm">
                                    <div>
                                      <p className="text-muted-foreground">Strength</p>
                                      <p className="font-medium">{rx.strength}</p>
                                    </div>
                                    <div>
                                      <p className="text-muted-foreground">Dose</p>
                                      <p className="font-medium">{rx.dose}</p>
                                    </div>
                                    <div>
                                      <p className="text-muted-foreground">Frequency</p>
                                      <p className="font-medium">{rx.frequency}</p>
                                    </div>
                                  </div>
                                </div>

                                <div className="border-t pt-4">
                                  <h4 className="font-semibold mb-2">Instructions</h4>
                                  <p className="text-sm bg-muted p-3 rounded-lg">{rx.instructions}</p>
                                </div>

                                <div className="border-t pt-4">
                                  <h4 className="font-semibold mb-2">Possible Side Effects</h4>
                                  <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                                    {rx.sideEffects.map((effect, i) => (
                                      <li key={i}>{effect}</li>
                                    ))}
                                  </ul>
                                </div>

                                <div className="border-t pt-4">
                                  <h4 className="font-semibold mb-2">Precautions</h4>
                                  <p className="text-sm text-muted-foreground">{rx.precautions}</p>
                                </div>

                                <div className="border-t pt-4">
                                  <h4 className="font-semibold mb-2">Refill History</h4>
                                  <div className="flex items-center gap-4 text-sm">
                                    <div>
                                      <p className="text-muted-foreground">Refills Used</p>
                                      <p className="font-medium">{rx.refillsUsed}</p>
                                    </div>
                                    <div>
                                      <p className="text-muted-foreground">Refills Remaining</p>
                                      <p className={`font-medium ${rx.refillsRemaining === 0 ? "text-orange-600" : ""}`}>
                                        {rx.refillsRemaining}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <DialogFooter>
                                <DialogClose asChild>
                                  <Button variant="outline">Close</Button>
                                </DialogClose>
                                {rx.refillsRemaining > 0 && (
                                  <Button onClick={() => handleRequestRefill(rx.id)}>
                                    <RefreshCw className="w-4 h-4 mr-2" />
                                    Request Refill
                                  </Button>
                                )}
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>

                          {(rx.status === "refill_needed" || rx.daysRemaining <= 7) && rx.refillsRemaining > 0 && (
                            <Button size="sm" onClick={() => handleRequestRefill(rx.id)}>
                              <RefreshCw className="w-4 h-4 mr-2" />
                              Request Refill
                            </Button>
                          )}

                          {rx.refillsRemaining === 0 && rx.status !== "completed" && (
                            <Link href="/patient/schedule">
                              <Button size="sm" variant="outline">
                                <Calendar className="w-4 h-4 mr-2" />
                                Schedule Follow-up
                              </Button>
                            </Link>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="completed" className="mt-4">
              <div className="space-y-4">
                {completedPrescriptions.map((rx) => (
                  <Card key={rx.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-4">
                          <div className="p-3 bg-gray-100 rounded-lg">
                            <Pill className="w-6 h-6 text-gray-400" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="text-lg font-semibold text-muted-foreground">{rx.peptide}</h3>
                              {getStatusBadge(rx.status)}
                            </div>
                            <p className="text-sm text-muted-foreground mb-2">
                              {rx.prescribedFor}
                            </p>
                            <div className="grid grid-cols-3 gap-4 text-sm">
                              <div>
                                <p className="text-muted-foreground">Duration</p>
                                <p className="font-medium">{rx.duration}</p>
                              </div>
                              <div>
                                <p className="text-muted-foreground">Started</p>
                                <p className="font-medium">{rx.startDate}</p>
                              </div>
                              <div>
                                <p className="text-muted-foreground">Completed</p>
                                <p className="font-medium">{rx.endDate}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          <FileText className="w-4 h-4 mr-2" />
                          View History
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                {completedPrescriptions.length === 0 && (
                  <Card>
                    <CardContent className="p-12 text-center">
                      <Pill className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-semibold mb-2">No Completed Prescriptions</h3>
                      <p className="text-muted-foreground">Your completed prescriptions will appear here.</p>
                    </CardContent>
                  </Card>
                )}
              </div>
            </TabsContent>

            <TabsContent value="all" className="mt-4">
              <div className="space-y-4">
                {myPrescriptions.map((rx) => (
                  <Card key={rx.id} className={`hover:shadow-md transition-shadow ${rx.status === "refill_needed" || (rx.daysRemaining <= 7 && rx.status === "active") ? "border-orange-200" : ""}`}>
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-4">
                          <div className={`p-3 rounded-lg ${rx.status === "completed" ? "bg-gray-100" : rx.status === "refill_needed" || rx.daysRemaining <= 7 ? "bg-orange-100" : "bg-primary/10"}`}>
                            <Pill className={`w-6 h-6 ${rx.status === "completed" ? "text-gray-400" : rx.status === "refill_needed" || rx.daysRemaining <= 7 ? "text-orange-600" : "text-primary"}`} />
                          </div>
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className={`text-lg font-semibold ${rx.status === "completed" ? "text-muted-foreground" : ""}`}>{rx.peptide}</h3>
                              {getStatusBadge(rx.status, rx.daysRemaining)}
                            </div>
                            <p className="text-sm text-muted-foreground mb-2">
                              {rx.prescribedFor} | Rx #{rx.id}
                            </p>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                              <div>
                                <p className="text-muted-foreground">Dose</p>
                                <p className="font-medium">{rx.dose}</p>
                              </div>
                              <div>
                                <p className="text-muted-foreground">Frequency</p>
                                <p className="font-medium">{rx.frequency}</p>
                              </div>
                              <div>
                                <p className="text-muted-foreground">Duration</p>
                                <p className="font-medium">{rx.duration}</p>
                              </div>
                              <div>
                                <p className="text-muted-foreground">Started</p>
                                <p className="font-medium">{rx.startDate}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col gap-2">
                          <Button variant="outline" size="sm">View Details</Button>
                          {rx.status === "active" && rx.refillsRemaining > 0 && (
                            <Button size="sm" variant="outline" onClick={() => handleRequestRefill(rx.id)}>
                              Request Refill
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>

          {/* Help Card */}
          <Card>
            <CardHeader>
              <CardTitle>Need Help with Your Prescriptions?</CardTitle>
              <CardDescription>We&apos;re here to support you throughout your treatment journey</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Calculator className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Dosing Calculator</h4>
                    <p className="text-sm text-muted-foreground">Calculate exact syringe measurements</p>
                    <Link href="/patient/calculator">
                      <Button variant="link" className="p-0 h-auto text-sm">Open Calculator</Button>
                    </Link>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <Calendar className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Schedule Appointment</h4>
                    <p className="text-sm text-muted-foreground">Book a follow-up with your provider</p>
                    <Link href="/patient/schedule">
                      <Button variant="link" className="p-0 h-auto text-sm">Schedule Now</Button>
                    </Link>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-red-100 rounded-lg">
                    <Phone className="w-5 h-5 text-red-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Emergency Contact</h4>
                    <p className="text-sm text-muted-foreground">Urgent questions or concerns</p>
                    <Link href="/patient/emergency">
                      <Button variant="link" className="p-0 h-auto text-sm">Contact Now</Button>
                    </Link>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  )
}
