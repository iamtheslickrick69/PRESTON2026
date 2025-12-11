"use client"

export const dynamic = 'force-dynamic'

import { useState } from "react"
import { ProtectedRoute } from "@/components/protected-route"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Users,
  Activity,
  Calendar,
  ShoppingCart,
  BookOpen,
  Calculator,
  FileText,
  BarChart,
  Search,
  Clock,
  ClipboardList,
  Stethoscope,
  Brain,
  Target,
  Save,
  Copy,
  History,
  Sparkles,
  ChevronRight,
  AlertCircle,
  CheckCircle,
  Pill,
  Syringe,
} from "lucide-react"
import { toast } from "sonner"

const patients = [
  { id: "1", name: "Sarah Johnson", dob: "1982-03-15", mrn: "MRN-001234", activePeptides: ["BPC-157", "TB-500"] },
  { id: "2", name: "Michael Chen", dob: "1989-07-22", mrn: "MRN-001235", activePeptides: ["CJC-1295", "Ipamorelin"] },
  { id: "3", name: "Emily Rodriguez", dob: "1986-11-08", mrn: "MRN-001236", activePeptides: ["Semaglutide"] },
  { id: "4", name: "James Wilson", dob: "1973-05-30", mrn: "MRN-001237", activePeptides: [] },
]

const visitTypes = [
  { id: "initial", name: "Initial Consultation", duration: 45 },
  { id: "followup", name: "Follow-up Visit", duration: 20 },
  { id: "lab-review", name: "Lab Review", duration: 15 },
  { id: "protocol-adjustment", name: "Protocol Adjustment", duration: 30 },
  { id: "adverse-event", name: "Adverse Event Assessment", duration: 30 },
]

const soapTemplates = [
  {
    id: "peptide-initiation",
    name: "Peptide Therapy Initiation",
    subjective: "Patient presents for initiation of peptide therapy. Chief complaint: [COMPLAINT]. Duration: [DURATION]. Previous treatments tried: [TREATMENTS]. Goals for therapy: [GOALS].",
    objective: "Vitals: BP [BP], HR [HR], Temp [TEMP], Weight [WEIGHT] lbs\nGeneral: Alert and oriented, no acute distress\nRelevant exam findings: [FINDINGS]\nLab review: [LABS]",
    assessment: "1. [PRIMARY DIAGNOSIS]\n2. Candidate for peptide therapy\n3. No contraindications identified",
    plan: "1. Initiate [PEPTIDE] at [DOSE] [ROUTE] [FREQUENCY]\n2. Reviewed proper injection technique and storage\n3. Discussed expected timeline and side effects\n4. Follow-up in [TIMEFRAME]\n5. Labs ordered: [LABS]",
  },
  {
    id: "followup-routine",
    name: "Routine Follow-up",
    subjective: "Patient returns for routine follow-up on [PEPTIDE] therapy initiated [DATE]. Reports [IMPROVEMENT/NO CHANGE/WORSENING] in symptoms. Current compliance: [COMPLIANCE]. Side effects: [SIDE EFFECTS].",
    objective: "Vitals: BP [BP], HR [HR], Weight [WEIGHT] lbs\nComparison to baseline: [COMPARISON]\nInjection sites: [SITE ASSESSMENT]\nRelevant findings: [FINDINGS]",
    assessment: "1. [PRIMARY DIAGNOSIS] - [STATUS]\n2. Peptide therapy response: [RESPONSE]\n3. Tolerating treatment well / Side effects noted",
    plan: "1. Continue [PEPTIDE] at current dose / Adjust to [NEW DOSE]\n2. [ADDITIONAL INTERVENTIONS]\n3. Follow-up in [TIMEFRAME]\n4. Patient education reinforced",
  },
  {
    id: "lab-review",
    name: "Lab Results Review",
    subjective: "Patient presents for review of recent laboratory results obtained [DATE]. Current treatment: [TREATMENT]. Patient reports [SYMPTOMS/NO CONCERNS].",
    objective: "Lab Results:\n- CBC: [RESULTS]\n- CMP: [RESULTS]\n- Lipid Panel: [RESULTS]\n- Thyroid: [RESULTS]\n- Hormones: [RESULTS]\n\nComparison to previous: [COMPARISON]",
    assessment: "1. Lab results [WITHIN NORMAL LIMITS/ABNORMAL]\n2. [SPECIFIC FINDINGS]\n3. Current therapy [APPROPRIATE/NEEDS ADJUSTMENT]",
    plan: "1. [LAB-BASED RECOMMENDATIONS]\n2. [TREATMENT ADJUSTMENTS]\n3. Repeat labs in [TIMEFRAME]\n4. Follow-up appointment scheduled",
  },
  {
    id: "adverse-event",
    name: "Adverse Event Assessment",
    subjective: "Patient reports adverse event related to [PEPTIDE] therapy. Onset: [DATE/TIME]. Description: [SYMPTOMS]. Severity: [MILD/MODERATE/SEVERE]. Actions taken: [ACTIONS].",
    objective: "Vitals: BP [BP], HR [HR], Temp [TEMP]\nGeneral appearance: [APPEARANCE]\nFocused exam: [FINDINGS]\nInjection site assessment: [SITE]",
    assessment: "1. Adverse event: [EVENT TYPE]\n2. Severity: [SEVERITY GRADE]\n3. Relatedness to therapy: [DEFINITE/PROBABLE/POSSIBLE/UNLIKELY]\n4. [ADDITIONAL DIAGNOSES]",
    plan: "1. [HOLD/DISCONTINUE/CONTINUE] [PEPTIDE]\n2. [TREATMENT FOR EVENT]\n3. [MONITORING PLAN]\n4. Adverse event reported to [REPORTING]\n5. Follow-up in [TIMEFRAME]",
  },
]

const quickPhrases = {
  subjective: [
    "Patient reports overall improvement in symptoms",
    "No adverse effects reported",
    "Tolerating medication well",
    "Compliance has been excellent",
    "Patient notes increased energy levels",
    "Sleep quality has improved",
    "Pain levels decreased since last visit",
    "Weight management goals being met",
  ],
  objective: [
    "Vitals within normal limits",
    "No injection site reactions noted",
    "Weight stable from last visit",
    "Injection technique reviewed and adequate",
    "No lymphadenopathy",
    "Skin turgor normal",
    "No peripheral edema",
  ],
  assessment: [
    "Responding well to current protocol",
    "Continue current treatment plan",
    "Consider dose adjustment",
    "Candidate for protocol modification",
    "Treatment goals being met",
    "Stable on current regimen",
  ],
  plan: [
    "Continue current peptide protocol",
    "Increase dose per protocol guidelines",
    "Order follow-up labs in 4 weeks",
    "Schedule follow-up in 2 weeks",
    "Patient education provided",
    "Refill prescription as requested",
    "Add adjunct therapy",
  ],
}

const recentNotes = [
  {
    id: "note-1",
    patient: "Sarah Johnson",
    date: "2024-01-28",
    visitType: "Follow-up Visit",
    status: "signed",
  },
  {
    id: "note-2",
    patient: "Michael Chen",
    date: "2024-01-27",
    visitType: "Lab Review",
    status: "signed",
  },
  {
    id: "note-3",
    patient: "Emily Rodriguez",
    date: "2024-01-26",
    visitType: "Initial Consultation",
    status: "draft",
  },
]

export default function ProviderChartingPage() {
  const [selectedPatient, setSelectedPatient] = useState<string | null>(null)
  const [visitType, setVisitType] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [showTemplateDialog, setShowTemplateDialog] = useState(false)
  const [activeSection, setActiveSection] = useState<"subjective" | "objective" | "assessment" | "plan">("subjective")

  const [soapNote, setSoapNote] = useState({
    subjective: "",
    objective: "",
    assessment: "",
    plan: "",
  })

  const selectedPatientData = patients.find(p => p.id === selectedPatient)
  const filteredPatients = patients.filter(p =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.mrn.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleApplyTemplate = (template: typeof soapTemplates[0]) => {
    setSoapNote({
      subjective: template.subjective,
      objective: template.objective,
      assessment: template.assessment,
      plan: template.plan,
    })
    setShowTemplateDialog(false)
    toast.success("Template applied", {
      description: `${template.name} template loaded`,
    })
  }

  const handleInsertPhrase = (phrase: string) => {
    setSoapNote(prev => ({
      ...prev,
      [activeSection]: prev[activeSection] + (prev[activeSection] ? "\n" : "") + phrase,
    }))
  }

  const handleSaveDraft = () => {
    toast.success("Draft saved", {
      description: "Your note has been saved as a draft",
    })
  }

  const handleSignNote = () => {
    if (!selectedPatient || !visitType) {
      toast.error("Missing information", {
        description: "Please select a patient and visit type",
      })
      return
    }
    toast.success("Note signed and locked", {
      description: "Clinical note has been finalized",
    })
  }

  const handleAutoGenerate = () => {
    if (!selectedPatient) {
      toast.error("Select a patient first")
      return
    }
    toast.success("Auto-generating note...", {
      description: "AI is preparing suggestions based on patient history",
    })
    // Simulate AI generation
    setTimeout(() => {
      if (selectedPatientData) {
        setSoapNote({
          subjective: `Patient ${selectedPatientData.name} presents for follow-up visit. Currently on ${selectedPatientData.activePeptides.join(", ") || "no active peptides"}. Reports overall improvement in symptoms since last visit. No adverse effects reported. Compliance has been excellent.`,
          objective: "Vitals within normal limits\nWeight stable from last visit\nNo injection site reactions noted\nInjection technique reviewed and adequate",
          assessment: `1. ${selectedPatientData.activePeptides.length > 0 ? "Peptide therapy" : "Wellness evaluation"} - stable\n2. Responding well to current protocol\n3. No adverse events`,
          plan: `1. Continue current peptide protocol\n2. Patient education reinforced\n3. Schedule follow-up in 4 weeks\n4. Order follow-up labs as indicated`,
        })
        toast.success("Note generated", {
          description: "Review and modify as needed before signing",
        })
      }
    }, 1500)
  }

  return (
    <ProtectedRoute allowedRoles={["provider"]}>
      <DashboardLayout>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">Clinical Charting</h2>
              <p className="text-muted-foreground">Document patient encounters with SOAP notes</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="bg-transparent" onClick={handleSaveDraft}>
                <Save className="w-4 h-4 mr-2" />
                Save Draft
              </Button>
              <Button onClick={handleSignNote}>
                <CheckCircle className="w-4 h-4 mr-2" />
                Sign Note
              </Button>
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-4">
            {/* Left Sidebar - Patient Selection */}
            <div className="lg:col-span-1 space-y-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Select Patient</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search patients..."
                      className="pl-10"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <ScrollArea className="h-48">
                    <div className="space-y-2">
                      {filteredPatients.map((patient) => (
                        <div
                          key={patient.id}
                          className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                            selectedPatient === patient.id
                              ? "border-primary bg-primary/5"
                              : "hover:bg-muted"
                          }`}
                          onClick={() => setSelectedPatient(patient.id)}
                        >
                          <p className="font-medium text-sm">{patient.name}</p>
                          <p className="text-xs text-muted-foreground">{patient.mrn}</p>
                          {patient.activePeptides.length > 0 && (
                            <div className="flex gap-1 mt-1 flex-wrap">
                              {patient.activePeptides.map((peptide) => (
                                <Badge key={peptide} variant="secondary" className="text-xs">
                                  {peptide}
                                </Badge>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Visit Type</CardTitle>
                </CardHeader>
                <CardContent>
                  <Select value={visitType || ""} onValueChange={setVisitType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select visit type" />
                    </SelectTrigger>
                    <SelectContent>
                      {visitTypes.map((type) => (
                        <SelectItem key={type.id} value={type.id}>
                          {type.name} ({type.duration} min)
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Recent Notes</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {recentNotes.map((note) => (
                      <div
                        key={note.id}
                        className="p-2 border rounded-lg hover:bg-muted cursor-pointer"
                      >
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium">{note.patient}</p>
                          <Badge variant={note.status === "signed" ? "secondary" : "outline"}>
                            {note.status}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {note.visitType} - {note.date}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Main Content - SOAP Note */}
            <div className="lg:col-span-2 space-y-4">
              {selectedPatientData && (
                <Card className="bg-muted/50">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <Users className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-semibold">{selectedPatientData.name}</p>
                          <p className="text-sm text-muted-foreground">
                            DOB: {selectedPatientData.dob} | {selectedPatientData.mrn}
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="bg-transparent"
                          onClick={() => setShowTemplateDialog(true)}
                        >
                          <Copy className="w-4 h-4 mr-1" />
                          Templates
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="bg-transparent"
                          onClick={handleAutoGenerate}
                        >
                          <Sparkles className="w-4 h-4 mr-1" />
                          Auto-Generate
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ClipboardList className="w-5 h-5" />
                    SOAP Note
                  </CardTitle>
                  <CardDescription>
                    Document the patient encounter using the SOAP format
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Subjective */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                        <Stethoscope className="w-4 h-4 text-blue-600" />
                      </div>
                      <Label className="text-base font-semibold">Subjective</Label>
                    </div>
                    <Textarea
                      placeholder="Chief complaint, history of present illness, review of systems, patient-reported symptoms..."
                      className="min-h-[120px]"
                      value={soapNote.subjective}
                      onChange={(e) => setSoapNote({ ...soapNote, subjective: e.target.value })}
                      onFocus={() => setActiveSection("subjective")}
                    />
                  </div>

                  <Separator />

                  {/* Objective */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                        <Activity className="w-4 h-4 text-green-600" />
                      </div>
                      <Label className="text-base font-semibold">Objective</Label>
                    </div>
                    <Textarea
                      placeholder="Vital signs, physical examination findings, lab results, imaging..."
                      className="min-h-[120px]"
                      value={soapNote.objective}
                      onChange={(e) => setSoapNote({ ...soapNote, objective: e.target.value })}
                      onFocus={() => setActiveSection("objective")}
                    />
                  </div>

                  <Separator />

                  {/* Assessment */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center">
                        <Brain className="w-4 h-4 text-amber-600" />
                      </div>
                      <Label className="text-base font-semibold">Assessment</Label>
                    </div>
                    <Textarea
                      placeholder="Diagnoses, clinical impressions, problem list..."
                      className="min-h-[100px]"
                      value={soapNote.assessment}
                      onChange={(e) => setSoapNote({ ...soapNote, assessment: e.target.value })}
                      onFocus={() => setActiveSection("assessment")}
                    />
                  </div>

                  <Separator />

                  {/* Plan */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
                        <Target className="w-4 h-4 text-purple-600" />
                      </div>
                      <Label className="text-base font-semibold">Plan</Label>
                    </div>
                    <Textarea
                      placeholder="Treatment plan, medications, follow-up instructions, referrals..."
                      className="min-h-[120px]"
                      value={soapNote.plan}
                      onChange={(e) => setSoapNote({ ...soapNote, plan: e.target.value })}
                      onFocus={() => setActiveSection("plan")}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Sidebar - Quick Phrases */}
            <div className="lg:col-span-1">
              <Card className="sticky top-4">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Quick Phrases</CardTitle>
                  <CardDescription className="text-xs">
                    Click to insert into {activeSection}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs value={activeSection} onValueChange={(v) => setActiveSection(v as typeof activeSection)}>
                    <TabsList className="grid grid-cols-4 w-full">
                      <TabsTrigger value="subjective" className="text-xs px-1">S</TabsTrigger>
                      <TabsTrigger value="objective" className="text-xs px-1">O</TabsTrigger>
                      <TabsTrigger value="assessment" className="text-xs px-1">A</TabsTrigger>
                      <TabsTrigger value="plan" className="text-xs px-1">P</TabsTrigger>
                    </TabsList>
                    {(["subjective", "objective", "assessment", "plan"] as const).map((section) => (
                      <TabsContent key={section} value={section} className="mt-3">
                        <ScrollArea className="h-80">
                          <div className="space-y-2">
                            {quickPhrases[section].map((phrase, idx) => (
                              <Button
                                key={idx}
                                variant="ghost"
                                size="sm"
                                className="w-full justify-start text-left text-xs h-auto py-2 px-2"
                                onClick={() => handleInsertPhrase(phrase)}
                              >
                                <ChevronRight className="w-3 h-3 mr-1 flex-shrink-0" />
                                <span className="line-clamp-2">{phrase}</span>
                              </Button>
                            ))}
                          </div>
                        </ScrollArea>
                      </TabsContent>
                    ))}
                  </Tabs>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Template Dialog */}
        <Dialog open={showTemplateDialog} onOpenChange={setShowTemplateDialog}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Note Templates</DialogTitle>
              <DialogDescription>
                Select a template to pre-fill your SOAP note
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-3 py-4">
              {soapTemplates.map((template) => (
                <div
                  key={template.id}
                  className="p-4 border rounded-lg hover:bg-muted cursor-pointer transition-colors"
                  onClick={() => handleApplyTemplate(template)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <FileText className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">{template.name}</p>
                        <p className="text-sm text-muted-foreground">
                          SOAP template with placeholder fields
                        </p>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-muted-foreground" />
                  </div>
                </div>
              ))}
            </div>
          </DialogContent>
        </Dialog>
      </DashboardLayout>
    </ProtectedRoute>
  )
}
