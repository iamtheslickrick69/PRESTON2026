"use client"

export const dynamic = 'force-dynamic'

import { ProtectedRoute } from "@/components/protected-route"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Activity, Calendar, ShoppingCart, BookOpen, Calculator, FileText, BarChart, Plus, Search, Pill, Clock, CheckCircle, AlertCircle, XCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useState } from "react"
import { toast } from "sonner"

const mockPatients = [
  { id: "1", name: "Sarah Johnson" },
  { id: "2", name: "Michael Chen" },
  { id: "3", name: "Emily Rodriguez" },
  { id: "4", name: "James Wilson" },
  { id: "5", name: "Lisa Thompson" },
]

const peptideOptions = [
  { id: "bpc157", name: "BPC-157", strengths: ["5mg", "10mg", "15mg"] },
  { id: "tb500", name: "TB-500", strengths: ["5mg", "10mg"] },
  { id: "cjc1295", name: "CJC-1295", strengths: ["2mg", "5mg"] },
  { id: "ipamorelin", name: "Ipamorelin", strengths: ["5mg", "10mg", "15mg"] },
  { id: "semaglutide", name: "Semaglutide", strengths: ["2.5mg", "5mg", "10mg"] },
  { id: "tirzepatide", name: "Tirzepatide", strengths: ["2.5mg", "5mg", "7.5mg", "10mg", "12.5mg", "15mg"] },
  { id: "pt141", name: "PT-141", strengths: ["10mg"] },
  { id: "aod9604", name: "AOD-9604", strengths: ["3mg", "5mg"] },
  { id: "mots-c", name: "MOTS-c", strengths: ["5mg", "10mg"] },
  { id: "ghk-cu", name: "GHK-Cu", strengths: ["50mg", "100mg", "200mg"] },
]

const frequencyOptions = [
  "Once daily",
  "Twice daily",
  "Three times daily",
  "Once weekly",
  "Twice weekly",
  "Three times weekly",
  "Every other day",
  "As needed",
]

const durationOptions = [
  "1 week",
  "2 weeks",
  "4 weeks",
  "6 weeks",
  "8 weeks",
  "12 weeks",
  "3 months",
  "6 months",
  "Ongoing",
]

const mockPrescriptions = [
  {
    id: "RX001",
    patientName: "Sarah Johnson",
    patientId: "1",
    peptide: "BPC-157",
    strength: "10mg",
    dose: "500mcg",
    frequency: "Once daily",
    duration: "8 weeks",
    status: "active",
    createdAt: "2024-01-15",
    refillsRemaining: 2,
    instructions: "Inject subcutaneously in the morning before breakfast.",
  },
  {
    id: "RX002",
    patientName: "Sarah Johnson",
    patientId: "1",
    peptide: "TB-500",
    strength: "5mg",
    dose: "2.5mg",
    frequency: "Twice weekly",
    duration: "4 weeks",
    status: "active",
    createdAt: "2024-01-15",
    refillsRemaining: 1,
    instructions: "Inject subcutaneously. Space doses 3-4 days apart.",
  },
  {
    id: "RX003",
    patientName: "Michael Chen",
    patientId: "2",
    peptide: "CJC-1295",
    strength: "2mg",
    dose: "300mcg",
    frequency: "Once daily",
    duration: "12 weeks",
    status: "active",
    createdAt: "2024-01-10",
    refillsRemaining: 3,
    instructions: "Inject subcutaneously before bed on an empty stomach.",
  },
  {
    id: "RX004",
    patientName: "Michael Chen",
    patientId: "2",
    peptide: "Ipamorelin",
    strength: "10mg",
    dose: "200mcg",
    frequency: "Three times daily",
    duration: "12 weeks",
    status: "active",
    createdAt: "2024-01-10",
    refillsRemaining: 3,
    instructions: "Inject 20 minutes before meals.",
  },
  {
    id: "RX005",
    patientName: "Emily Rodriguez",
    patientId: "3",
    peptide: "Semaglutide",
    strength: "5mg",
    dose: "0.25mg",
    frequency: "Once weekly",
    duration: "Ongoing",
    status: "active",
    createdAt: "2024-01-08",
    refillsRemaining: 4,
    instructions: "Inject subcutaneously on the same day each week. Titrate dose as directed.",
  },
  {
    id: "RX006",
    patientName: "James Wilson",
    patientId: "4",
    peptide: "BPC-157",
    strength: "5mg",
    dose: "250mcg",
    frequency: "Once daily",
    duration: "4 weeks",
    status: "completed",
    createdAt: "2023-12-01",
    refillsRemaining: 0,
    instructions: "Inject subcutaneously near injury site.",
  },
  {
    id: "RX007",
    patientName: "Lisa Thompson",
    patientId: "5",
    peptide: "Tirzepatide",
    strength: "2.5mg",
    dose: "2.5mg",
    frequency: "Once weekly",
    duration: "4 weeks",
    status: "pending",
    createdAt: "2024-01-18",
    refillsRemaining: 0,
    instructions: "Start with 2.5mg weekly for first 4 weeks before titration.",
  },
]

export default function ProviderPrescriptionsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)

  // New prescription form state
  const [newRx, setNewRx] = useState({
    patientId: "",
    peptide: "",
    strength: "",
    dose: "",
    frequency: "",
    duration: "",
    refills: "0",
    instructions: "",
  })

  const filteredPrescriptions = mockPrescriptions.filter((rx) => {
    const matchesSearch =
      rx.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rx.peptide.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rx.id.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = statusFilter === "all" || rx.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const selectedPeptide = peptideOptions.find(p => p.id === newRx.peptide)

  const handleCreatePrescription = () => {
    if (!newRx.patientId || !newRx.peptide || !newRx.dose || !newRx.frequency || !newRx.duration) {
      toast.error("Please fill in all required fields")
      return
    }

    toast.success("Prescription created successfully")
    setIsCreateDialogOpen(false)
    setNewRx({
      patientId: "",
      peptide: "",
      strength: "",
      dose: "",
      frequency: "",
      duration: "",
      refills: "0",
      instructions: "",
    })
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <CheckCircle className="w-4 h-4 text-green-500" />
      case "pending":
        return <Clock className="w-4 h-4 text-yellow-500" />
      case "completed":
        return <XCircle className="w-4 h-4 text-gray-400" />
      case "cancelled":
        return <AlertCircle className="w-4 h-4 text-red-500" />
      default:
        return null
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Active</Badge>
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Pending</Badge>
      case "completed":
        return <Badge variant="secondary">Completed</Badge>
      case "cancelled":
        return <Badge variant="destructive">Cancelled</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const activePrescriptions = mockPrescriptions.filter(rx => rx.status === "active")
  const pendingPrescriptions = mockPrescriptions.filter(rx => rx.status === "pending")

  return (
    <ProtectedRoute allowedRoles={["provider"]}>
      <DashboardLayout>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">Prescriptions</h2>
              <p className="text-muted-foreground">Manage patient prescriptions and refills</p>
            </div>
            <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  New Prescription
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Create New Prescription</DialogTitle>
                  <DialogDescription>
                    Fill in the prescription details below. All fields marked with * are required.
                  </DialogDescription>
                </DialogHeader>

                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="patient">Patient *</Label>
                      <Select value={newRx.patientId} onValueChange={(v) => setNewRx({...newRx, patientId: v})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select patient" />
                        </SelectTrigger>
                        <SelectContent>
                          {mockPatients.map((patient) => (
                            <SelectItem key={patient.id} value={patient.id}>
                              {patient.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="peptide">Peptide *</Label>
                      <Select value={newRx.peptide} onValueChange={(v) => setNewRx({...newRx, peptide: v, strength: ""})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select peptide" />
                        </SelectTrigger>
                        <SelectContent>
                          {peptideOptions.map((peptide) => (
                            <SelectItem key={peptide.id} value={peptide.id}>
                              {peptide.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="strength">Vial Strength *</Label>
                      <Select
                        value={newRx.strength}
                        onValueChange={(v) => setNewRx({...newRx, strength: v})}
                        disabled={!selectedPeptide}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select strength" />
                        </SelectTrigger>
                        <SelectContent>
                          {selectedPeptide?.strengths.map((strength) => (
                            <SelectItem key={strength} value={strength}>
                              {strength}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="dose">Dose per Administration *</Label>
                      <Input
                        placeholder="e.g., 500mcg, 2.5mg"
                        value={newRx.dose}
                        onChange={(e) => setNewRx({...newRx, dose: e.target.value})}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="frequency">Frequency *</Label>
                      <Select value={newRx.frequency} onValueChange={(v) => setNewRx({...newRx, frequency: v})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select frequency" />
                        </SelectTrigger>
                        <SelectContent>
                          {frequencyOptions.map((freq) => (
                            <SelectItem key={freq} value={freq}>
                              {freq}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="duration">Duration *</Label>
                      <Select value={newRx.duration} onValueChange={(v) => setNewRx({...newRx, duration: v})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select duration" />
                        </SelectTrigger>
                        <SelectContent>
                          {durationOptions.map((dur) => (
                            <SelectItem key={dur} value={dur}>
                              {dur}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="refills">Number of Refills</Label>
                    <Select value={newRx.refills} onValueChange={(v) => setNewRx({...newRx, refills: v})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {[0, 1, 2, 3, 4, 5, 6].map((num) => (
                          <SelectItem key={num} value={num.toString()}>
                            {num} {num === 1 ? "refill" : "refills"}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="instructions">Patient Instructions</Label>
                    <Textarea
                      placeholder="Enter injection instructions, timing, storage requirements, etc."
                      rows={3}
                      value={newRx.instructions}
                      onChange={(e) => setNewRx({...newRx, instructions: e.target.value})}
                    />
                  </div>
                </div>

                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="outline">Cancel</Button>
                  </DialogClose>
                  <Button onClick={handleCreatePrescription}>Create Prescription</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          {/* Stats Cards */}
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
                  <div className="p-2 bg-yellow-100 rounded-lg">
                    <Clock className="w-5 h-5 text-yellow-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{pendingPrescriptions.length}</p>
                    <p className="text-sm text-muted-foreground">Pending Approval</p>
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
                    <p className="text-2xl font-bold">{mockPrescriptions.length}</p>
                    <p className="text-sm text-muted-foreground">Total Prescriptions</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <Users className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{new Set(mockPrescriptions.map(rx => rx.patientId)).size}</p>
                    <p className="text-sm text-muted-foreground">Patients with Rx</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Search and Filter */}
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search by patient, peptide, or Rx ID..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Prescriptions List */}
          <Tabs defaultValue="all" className="w-full">
            <TabsList>
              <TabsTrigger value="all">All ({mockPrescriptions.length})</TabsTrigger>
              <TabsTrigger value="active">Active ({activePrescriptions.length})</TabsTrigger>
              <TabsTrigger value="pending">Pending ({pendingPrescriptions.length})</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="mt-4">
              <div className="space-y-4">
                {filteredPrescriptions.map((rx) => (
                  <Card key={rx.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-4">
                          <div className="p-3 bg-primary/10 rounded-lg">
                            <Pill className="w-6 h-6 text-primary" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="text-lg font-semibold">{rx.peptide}</h3>
                              {getStatusBadge(rx.status)}
                            </div>
                            <p className="text-sm text-muted-foreground mb-2">
                              {rx.patientName} | Rx #{rx.id}
                            </p>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
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
                              <div>
                                <p className="text-muted-foreground">Duration</p>
                                <p className="font-medium">{rx.duration}</p>
                              </div>
                            </div>
                            {rx.instructions && (
                              <p className="text-sm text-muted-foreground mt-3 italic">
                                &quot;{rx.instructions}&quot;
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-muted-foreground">Created {rx.createdAt}</p>
                          {rx.status === "active" && (
                            <p className="text-sm font-medium mt-1">
                              {rx.refillsRemaining} refills remaining
                            </p>
                          )}
                          <div className="flex gap-2 mt-3 justify-end">
                            <Button variant="outline" size="sm">View Details</Button>
                            {rx.status === "active" && (
                              <Button variant="outline" size="sm">Refill</Button>
                            )}
                            {rx.status === "pending" && (
                              <Button size="sm">Approve</Button>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="active" className="mt-4">
              <div className="space-y-4">
                {filteredPrescriptions.filter(rx => rx.status === "active").map((rx) => (
                  <Card key={rx.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-4">
                          <div className="p-3 bg-green-100 rounded-lg">
                            <Pill className="w-6 h-6 text-green-600" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="text-lg font-semibold">{rx.peptide}</h3>
                              {getStatusBadge(rx.status)}
                            </div>
                            <p className="text-sm text-muted-foreground mb-2">
                              {rx.patientName} | Rx #{rx.id}
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
                                <p className="text-muted-foreground">Refills</p>
                                <p className="font-medium">{rx.refillsRemaining} remaining</p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">Edit</Button>
                          <Button variant="outline" size="sm">Refill</Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="pending" className="mt-4">
              <div className="space-y-4">
                {filteredPrescriptions.filter(rx => rx.status === "pending").map((rx) => (
                  <Card key={rx.id} className="hover:shadow-md transition-shadow border-yellow-200">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-4">
                          <div className="p-3 bg-yellow-100 rounded-lg">
                            <Clock className="w-6 h-6 text-yellow-600" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="text-lg font-semibold">{rx.peptide}</h3>
                              {getStatusBadge(rx.status)}
                            </div>
                            <p className="text-sm text-muted-foreground mb-2">
                              {rx.patientName} | Rx #{rx.id}
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
                                <p className="text-muted-foreground">Requested</p>
                                <p className="font-medium">{rx.createdAt}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">Deny</Button>
                          <Button size="sm">Approve</Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                {filteredPrescriptions.filter(rx => rx.status === "pending").length === 0 && (
                  <Card>
                    <CardContent className="p-12 text-center">
                      <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold mb-2">All Caught Up!</h3>
                      <p className="text-muted-foreground">No prescriptions pending approval.</p>
                    </CardContent>
                  </Card>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  )
}
