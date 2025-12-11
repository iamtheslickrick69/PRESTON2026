"use client"

export const dynamic = 'force-dynamic'

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ProtectedRoute } from "@/components/protected-route"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  AlertTriangle,
  Home,
  Users,
  Calculator,
  FileText,
  BookOpen,
  Pill,
  ArrowLeft,
  Upload,
  CheckCircle,
  Search,
} from "lucide-react"
import Link from "next/link"
import { toast } from "sonner"

const mockPatients = [
  { id: "P-001234", name: "Sarah Johnson", activePeptides: ["BPC-157", "TB-500"] },
  { id: "P-001235", name: "Michael Chen", activePeptides: ["Semaglutide"] },
  { id: "P-001236", name: "Emily Rodriguez", activePeptides: ["CJC-1295", "Ipamorelin"] },
  { id: "P-001237", name: "James Wilson", activePeptides: ["BPC-157", "PT-141"] },
  { id: "P-001238", name: "Amanda Foster", activePeptides: ["Tirzepatide"] },
]

const allPeptides = [
  "BPC-157",
  "TB-500",
  "CJC-1295",
  "Ipamorelin",
  "Semaglutide",
  "Tirzepatide",
  "PT-141",
  "Melanotan II",
  "Thymosin Alpha-1",
  "GHK-Cu",
]

const commonSymptoms = [
  { id: "nausea", label: "Nausea" },
  { id: "vomiting", label: "Vomiting" },
  { id: "headache", label: "Headache" },
  { id: "fatigue", label: "Fatigue" },
  { id: "injection-site", label: "Injection Site Reaction" },
  { id: "injection-pain", label: "Injection Site Pain" },
  { id: "injection-swelling", label: "Injection Site Swelling" },
  { id: "dizziness", label: "Dizziness" },
  { id: "flushing", label: "Flushing" },
  { id: "appetite-decrease", label: "Decreased Appetite" },
  { id: "appetite-increase", label: "Increased Appetite" },
  { id: "sleep-insomnia", label: "Insomnia" },
  { id: "sleep-drowsiness", label: "Drowsiness" },
  { id: "mood-anxiety", label: "Anxiety" },
  { id: "mood-depression", label: "Depression" },
  { id: "muscle-pain", label: "Muscle Pain" },
  { id: "joint-pain", label: "Joint Pain" },
  { id: "swelling", label: "Edema/Swelling" },
  { id: "rash", label: "Rash" },
  { id: "itching", label: "Itching/Pruritus" },
  { id: "palpitations", label: "Palpitations" },
  { id: "hypoglycemia", label: "Hypoglycemia" },
]

const outcomeOptions = [
  { value: "resolved", label: "Resolved" },
  { value: "resolving", label: "Resolving" },
  { value: "ongoing", label: "Ongoing" },
  { value: "resolved-sequelae", label: "Resolved with Sequelae" },
  { value: "fatal", label: "Fatal" },
  { value: "unknown", label: "Unknown" },
]

const actionOptions = [
  { id: "none", label: "No action taken" },
  { id: "dose-reduced", label: "Dose reduced" },
  { id: "dose-interrupted", label: "Dose interrupted temporarily" },
  { id: "discontinued", label: "Product discontinued" },
  { id: "medication-given", label: "Concomitant medication given" },
  { id: "hospitalized", label: "Patient hospitalized" },
  { id: "er-visit", label: "ER/Urgent care visit" },
]

export default function ProviderReportEventPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [patientSearch, setPatientSearch] = useState("")
  const [selectedPatient, setSelectedPatient] = useState("")
  const [selectedPeptide, setSelectedPeptide] = useState("")
  const [severity, setSeverity] = useState("")
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([])
  const [onsetDate, setOnsetDate] = useState("")
  const [onsetTime, setOnsetTime] = useState("")
  const [description, setDescription] = useState("")
  const [outcome, setOutcome] = useState("")
  const [selectedActions, setSelectedActions] = useState<string[]>([])
  const [clinicalNotes, setClinicalNotes] = useState("")
  const [reportToFda, setReportToFda] = useState(false)
  const [batchNumber, setBatchNumber] = useState("")
  const [relatedness, setRelatedness] = useState("")

  const filteredPatients = mockPatients.filter(p =>
    p.name.toLowerCase().includes(patientSearch.toLowerCase()) ||
    p.id.toLowerCase().includes(patientSearch.toLowerCase())
  )

  const selectedPatientData = mockPatients.find(p => p.id === selectedPatient)

  const handleSymptomToggle = (symptomId: string) => {
    setSelectedSymptoms(prev =>
      prev.includes(symptomId)
        ? prev.filter(id => id !== symptomId)
        : [...prev, symptomId]
    )
  }

  const handleActionToggle = (actionId: string) => {
    setSelectedActions(prev =>
      prev.includes(actionId)
        ? prev.filter(id => id !== actionId)
        : [...prev, actionId]
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!selectedPatient || !selectedPeptide || !severity || selectedSymptoms.length === 0) {
      toast.error("Please fill in all required fields")
      return
    }

    setIsSubmitting(true)

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))

    setIsSubmitting(false)
    setIsSubmitted(true)
    toast.success("Adverse event documented successfully")

    if (reportToFda) {
      toast.info("FDA MedWatch report has been queued for submission")
    }
  }

  if (isSubmitted) {
    return (
      <ProtectedRoute allowedRoles={["provider"]}>
        <DashboardLayout>
          <div className="max-w-2xl mx-auto">
            <Card>
              <CardContent className="pt-6">
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  </div>
                  <h2 className="text-2xl font-bold">Event Documented</h2>
                  <p className="text-muted-foreground">
                    The adverse event has been recorded in the patient's chart.
                  </p>
                  {reportToFda && (
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <p className="text-sm text-blue-800">
                        FDA MedWatch report has been queued. You will receive a confirmation email.
                      </p>
                    </div>
                  )}
                  <div className="pt-4 space-y-2">
                    <p className="text-sm font-medium">Event Reference: #AE-PRV-2024-0042</p>
                    <p className="text-xs text-muted-foreground">
                      Documented on {new Date().toLocaleDateString()} at {new Date().toLocaleTimeString()}
                    </p>
                  </div>
                  <div className="pt-4 flex gap-3 justify-center flex-wrap">
                    <Button variant="outline" onClick={() => router.push("/provider/patients")}>
                      Return to Patients
                    </Button>
                    <Link href={`/provider/patients/${selectedPatient}`}>
                      <Button variant="outline">
                        View Patient Chart
                      </Button>
                    </Link>
                    <Button onClick={() => {
                      setIsSubmitted(false)
                      setSelectedPatient("")
                      setSelectedPeptide("")
                      setSeverity("")
                      setSelectedSymptoms([])
                      setOnsetDate("")
                      setOnsetTime("")
                      setDescription("")
                      setOutcome("")
                      setSelectedActions([])
                      setClinicalNotes("")
                      setReportToFda(false)
                      setBatchNumber("")
                      setRelatedness("")
                    }}>
                      Document Another Event
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

  return (
    <ProtectedRoute allowedRoles={["provider"]}>
      <DashboardLayout>
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <Link href="/provider/patients">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <div>
              <h2 className="text-3xl font-bold tracking-tight">Document Adverse Event</h2>
              <p className="text-muted-foreground">
                Record adverse reactions for clinical documentation and research tracking
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="grid gap-6 lg:grid-cols-3">
              <div className="lg:col-span-2 space-y-6">
                {/* Patient Selection */}
                <Card>
                  <CardHeader>
                    <CardTitle>Patient Information</CardTitle>
                    <CardDescription>Select the patient reporting the adverse event</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label>Search Patient *</Label>
                      <div className="relative">
                        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          placeholder="Search by name or patient ID..."
                          className="pl-10"
                          value={patientSearch}
                          onChange={(e) => setPatientSearch(e.target.value)}
                        />
                      </div>
                    </div>

                    {patientSearch && (
                      <div className="border rounded-lg divide-y max-h-48 overflow-y-auto">
                        {filteredPatients.map(patient => (
                          <div
                            key={patient.id}
                            className={`p-3 cursor-pointer hover:bg-muted transition-colors ${
                              selectedPatient === patient.id ? "bg-muted" : ""
                            }`}
                            onClick={() => {
                              setSelectedPatient(patient.id)
                              setPatientSearch("")
                            }}
                          >
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="font-medium">{patient.name}</p>
                                <p className="text-sm text-muted-foreground">{patient.id}</p>
                              </div>
                              <div className="flex gap-1">
                                {patient.activePeptides.map(p => (
                                  <Badge key={p} variant="secondary" className="text-xs">
                                    {p}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          </div>
                        ))}
                        {filteredPatients.length === 0 && (
                          <p className="p-3 text-sm text-muted-foreground">No patients found</p>
                        )}
                      </div>
                    )}

                    {selectedPatientData && (
                      <div className="p-4 bg-muted rounded-lg">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-semibold">{selectedPatientData.name}</p>
                            <p className="text-sm text-muted-foreground">{selectedPatientData.id}</p>
                          </div>
                          <div className="flex gap-1">
                            {selectedPatientData.activePeptides.map(p => (
                              <Badge key={p} variant="secondary">
                                {p}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Event Details */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <AlertTriangle className="h-5 w-5 text-orange-500" />
                      Event Details
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Peptide & Batch */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Suspected Product *</Label>
                        <Select value={selectedPeptide} onValueChange={setSelectedPeptide}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select peptide" />
                          </SelectTrigger>
                          <SelectContent>
                            {selectedPatientData?.activePeptides.map(peptide => (
                              <SelectItem key={peptide} value={peptide}>
                                {peptide} (Active)
                              </SelectItem>
                            ))}
                            <SelectItem value="divider" disabled>
                              ─────────────
                            </SelectItem>
                            {allPeptides.filter(p => !selectedPatientData?.activePeptides.includes(p)).map(peptide => (
                              <SelectItem key={peptide} value={peptide}>
                                {peptide}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="batch">Batch/Lot Number</Label>
                        <Input
                          id="batch"
                          placeholder="e.g., LOT-2024-0142"
                          value={batchNumber}
                          onChange={(e) => setBatchNumber(e.target.value)}
                        />
                      </div>
                    </div>

                    {/* Severity */}
                    <div className="space-y-3">
                      <Label>Severity Level *</Label>
                      <RadioGroup value={severity} onValueChange={setSeverity} className="grid grid-cols-4 gap-3">
                        {[
                          { value: "mild", label: "Mild", color: "green" },
                          { value: "moderate", label: "Moderate", color: "yellow" },
                          { value: "severe", label: "Severe", color: "orange" },
                          { value: "life-threatening", label: "Life-Threatening", color: "red" },
                        ].map(option => (
                          <div key={option.value}>
                            <RadioGroupItem value={option.value} id={option.value} className="peer sr-only" />
                            <Label
                              htmlFor={option.value}
                              className={`flex flex-col items-center justify-center rounded-md border-2 border-muted bg-popover p-3 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-${option.color}-500 [&:has([data-state=checked])]:border-${option.color}-500 cursor-pointer`}
                            >
                              <span className="text-sm font-medium">{option.label}</span>
                            </Label>
                          </div>
                        ))}
                      </RadioGroup>
                    </div>

                    {/* Relatedness */}
                    <div className="space-y-3">
                      <Label>Relatedness to Product</Label>
                      <RadioGroup value={relatedness} onValueChange={setRelatedness} className="grid grid-cols-5 gap-2">
                        {[
                          { value: "definite", label: "Definite" },
                          { value: "probable", label: "Probable" },
                          { value: "possible", label: "Possible" },
                          { value: "unlikely", label: "Unlikely" },
                          { value: "unrelated", label: "Unrelated" },
                        ].map(option => (
                          <div key={option.value}>
                            <RadioGroupItem value={option.value} id={`rel-${option.value}`} className="peer sr-only" />
                            <Label
                              htmlFor={`rel-${option.value}`}
                              className="flex items-center justify-center rounded-md border-2 border-muted bg-popover p-2 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer text-xs"
                            >
                              {option.label}
                            </Label>
                          </div>
                        ))}
                      </RadioGroup>
                    </div>

                    {/* Symptoms */}
                    <div className="space-y-3">
                      <Label>Symptoms/Signs * (select all that apply)</Label>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                        {commonSymptoms.map(symptom => (
                          <div key={symptom.id} className="flex items-center space-x-2">
                            <Checkbox
                              id={symptom.id}
                              checked={selectedSymptoms.includes(symptom.id)}
                              onCheckedChange={() => handleSymptomToggle(symptom.id)}
                            />
                            <Label htmlFor={symptom.id} className="text-sm font-normal cursor-pointer">
                              {symptom.label}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Date/Time */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="onset-date">Date of Onset *</Label>
                        <Input
                          id="onset-date"
                          type="date"
                          value={onsetDate}
                          onChange={(e) => setOnsetDate(e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="onset-time">Time of Onset</Label>
                        <Input
                          id="onset-time"
                          type="time"
                          value={onsetTime}
                          onChange={(e) => setOnsetTime(e.target.value)}
                        />
                      </div>
                    </div>

                    {/* Description */}
                    <div className="space-y-2">
                      <Label htmlFor="description">Event Description *</Label>
                      <Textarea
                        id="description"
                        placeholder="Describe the adverse event in clinical detail..."
                        rows={4}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                      />
                    </div>

                    {/* Outcome */}
                    <div className="space-y-2">
                      <Label>Outcome</Label>
                      <Select value={outcome} onValueChange={setOutcome}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select outcome" />
                        </SelectTrigger>
                        <SelectContent>
                          {outcomeOptions.map(option => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Actions Taken */}
                    <div className="space-y-3">
                      <Label>Actions Taken</Label>
                      <div className="grid grid-cols-2 gap-2">
                        {actionOptions.map(action => (
                          <div key={action.id} className="flex items-center space-x-2">
                            <Checkbox
                              id={action.id}
                              checked={selectedActions.includes(action.id)}
                              onCheckedChange={() => handleActionToggle(action.id)}
                            />
                            <Label htmlFor={action.id} className="text-sm font-normal cursor-pointer">
                              {action.label}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Clinical Notes & Attachments */}
                <Card>
                  <CardHeader>
                    <CardTitle>Clinical Documentation</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="clinical-notes">Clinical Notes</Label>
                      <Textarea
                        id="clinical-notes"
                        placeholder="Additional clinical observations, differential diagnoses, or treatment recommendations..."
                        rows={4}
                        value={clinicalNotes}
                        onChange={(e) => setClinicalNotes(e.target.value)}
                      />
                    </div>

                    {/* File Upload */}
                    <div className="space-y-2">
                      <Label>Attachments</Label>
                      <div className="border-2 border-dashed rounded-lg p-6 text-center hover:bg-muted/50 cursor-pointer transition-colors">
                        <Upload className="w-8 h-8 mx-auto text-muted-foreground mb-2" />
                        <p className="text-sm text-muted-foreground">
                          Upload photos, lab results, or other documentation
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          PNG, JPG, PDF up to 25MB
                        </p>
                      </div>
                    </div>

                    {/* FDA Reporting */}
                    <div className="flex items-start space-x-3 p-4 bg-amber-50 rounded-lg border border-amber-200">
                      <Checkbox
                        id="fda-report"
                        checked={reportToFda}
                        onCheckedChange={(checked) => setReportToFda(checked as boolean)}
                      />
                      <div className="space-y-1">
                        <Label htmlFor="fda-report" className="cursor-pointer font-medium">
                          Submit to FDA MedWatch (Voluntary)
                        </Label>
                        <p className="text-xs text-muted-foreground">
                          Serious adverse events may be reported to the FDA. This helps improve safety information for all patients.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Submit */}
                <div className="flex justify-end gap-3">
                  <Button type="button" variant="outline" onClick={() => router.back()}>
                    Cancel
                  </Button>
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Documenting..." : "Document Event"}
                  </Button>
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Reporting Guidelines</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4 text-sm">
                    <div>
                      <p className="font-medium">When to Report</p>
                      <ul className="mt-2 space-y-1 text-muted-foreground list-disc list-inside text-xs">
                        <li>Any unexpected adverse reaction</li>
                        <li>Reactions more severe than expected</li>
                        <li>Reactions requiring medical intervention</li>
                        <li>Patient-reported symptoms</li>
                      </ul>
                    </div>
                    <div>
                      <p className="font-medium">Severity Definitions</p>
                      <div className="mt-2 space-y-2 text-xs">
                        <div className="flex gap-2">
                          <Badge variant="secondary" className="bg-green-100 text-green-800">Mild</Badge>
                          <span className="text-muted-foreground">No intervention needed</span>
                        </div>
                        <div className="flex gap-2">
                          <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">Moderate</Badge>
                          <span className="text-muted-foreground">Medical attention needed</span>
                        </div>
                        <div className="flex gap-2">
                          <Badge variant="secondary" className="bg-orange-100 text-orange-800">Severe</Badge>
                          <span className="text-muted-foreground">Significant impairment</span>
                        </div>
                        <div className="flex gap-2">
                          <Badge variant="secondary" className="bg-red-100 text-red-800">Life-Threatening</Badge>
                          <span className="text-muted-foreground">Immediate risk to life</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Recent Events (Your Patients)</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="p-3 border rounded-lg">
                      <div className="flex items-center justify-between mb-1">
                        <p className="font-medium text-sm">Nausea</p>
                        <Badge variant="secondary" className="text-xs">Mild</Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">Semaglutide - J. Wilson</p>
                      <p className="text-xs text-muted-foreground">2 days ago</p>
                    </div>
                    <div className="p-3 border rounded-lg">
                      <div className="flex items-center justify-between mb-1">
                        <p className="font-medium text-sm">Injection Site Reaction</p>
                        <Badge variant="secondary" className="text-xs">Mild</Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">BPC-157 - S. Johnson</p>
                      <p className="text-xs text-muted-foreground">5 days ago</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-amber-200 bg-amber-50">
                  <CardHeader>
                    <CardTitle className="text-base flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4 text-amber-600" />
                      RUO Documentation
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-xs text-amber-800">
                    <p>
                      All adverse events for Research Use Only products must be documented per your clinic's compliance protocol.
                      This data contributes to the research database and may be used in aggregate safety reporting.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </form>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  )
}
