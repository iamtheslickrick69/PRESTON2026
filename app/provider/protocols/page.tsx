"use client"

export const dynamic = 'force-dynamic'

import { ProtectedRoute } from "@/components/protected-route"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Activity, Calendar, ShoppingCart, BookOpen, Calculator, FileText, BarChart, Plus, Search, Copy, Edit, Trash2, Eye, Star, Clock, Pill, Target, AlertCircle, CheckCircle, ChevronDown, ChevronRight, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Switch } from "@/components/ui/switch"
import { useState } from "react"
import { toast } from "sonner"

const protocolCategories = [
  "Weight Management",
  "Healing & Recovery",
  "Anti-Aging",
  "Growth Hormone",
  "Cognitive Enhancement",
  "Sexual Health",
  "Custom",
]

interface ProtocolPhase {
  id: string
  name: string
  duration: string
  peptides: {
    name: string
    dose: string
    frequency: string
    instructions: string
  }[]
  notes?: string
}

interface Protocol {
  id: string
  name: string
  category: string
  description: string
  indication: string
  duration: string
  phases: ProtocolPhase[]
  contraindications: string[]
  monitoringRequirements: string[]
  expectedOutcomes: string[]
  isStarred: boolean
  usageCount: number
  createdAt: string
  updatedAt: string
  isCustom: boolean
}

const sampleProtocols: Protocol[] = [
  {
    id: "1",
    name: "Weight Loss - Semaglutide Titration",
    category: "Weight Management",
    description: "Gradual Semaglutide titration protocol for safe and effective weight management",
    indication: "Obesity, overweight with metabolic syndrome",
    duration: "16+ weeks",
    phases: [
      {
        id: "1-1",
        name: "Initiation Phase",
        duration: "4 weeks",
        peptides: [
          { name: "Semaglutide", dose: "0.25mg", frequency: "Once weekly", instructions: "Inject subcutaneously, same day each week" },
        ],
        notes: "Monitor for GI side effects. Ensure adequate hydration.",
      },
      {
        id: "1-2",
        name: "Escalation Phase 1",
        duration: "4 weeks",
        peptides: [
          { name: "Semaglutide", dose: "0.5mg", frequency: "Once weekly", instructions: "Continue same injection site rotation" },
        ],
        notes: "Increase dose if tolerating well. May add anti-nausea support if needed.",
      },
      {
        id: "1-3",
        name: "Escalation Phase 2",
        duration: "4 weeks",
        peptides: [
          { name: "Semaglutide", dose: "1.0mg", frequency: "Once weekly", instructions: "Monitor appetite suppression and satiety" },
        ],
      },
      {
        id: "1-4",
        name: "Maintenance Phase",
        duration: "Ongoing",
        peptides: [
          { name: "Semaglutide", dose: "1.7-2.4mg", frequency: "Once weekly", instructions: "Titrate to maximum tolerated dose" },
        ],
        notes: "Continue for as long as clinically indicated. Regular follow-ups every 4-8 weeks.",
      },
    ],
    contraindications: ["Personal/family history of MTC", "MEN 2 syndrome", "Pregnancy/breastfeeding", "Severe GI disease"],
    monitoringRequirements: ["Weekly weight tracking", "Monthly labs (A1C, lipid panel)", "Blood pressure monitoring", "Side effect assessment"],
    expectedOutcomes: ["10-15% body weight reduction", "Improved glycemic control", "Reduced appetite", "Better metabolic markers"],
    isStarred: true,
    usageCount: 45,
    createdAt: "2023-10-15",
    updatedAt: "2024-01-10",
    isCustom: false,
  },
  {
    id: "2",
    name: "Tissue Healing - BPC-157 + TB-500 Stack",
    category: "Healing & Recovery",
    description: "Comprehensive tissue healing protocol combining BPC-157 and TB-500 for accelerated recovery",
    indication: "Soft tissue injuries, joint pain, post-surgical recovery",
    duration: "8-12 weeks",
    phases: [
      {
        id: "2-1",
        name: "Loading Phase",
        duration: "2 weeks",
        peptides: [
          { name: "BPC-157", dose: "500mcg", frequency: "Twice daily", instructions: "Inject near injury site or subcutaneously" },
          { name: "TB-500", dose: "2.5mg", frequency: "Twice weekly", instructions: "Subcutaneous injection" },
        ],
        notes: "Higher loading doses to initiate healing cascade.",
      },
      {
        id: "2-2",
        name: "Active Healing Phase",
        duration: "4-6 weeks",
        peptides: [
          { name: "BPC-157", dose: "250-500mcg", frequency: "Once daily", instructions: "Rotate injection sites" },
          { name: "TB-500", dose: "2.5mg", frequency: "Once weekly", instructions: "Maintain consistent dosing" },
        ],
      },
      {
        id: "2-3",
        name: "Maintenance Phase",
        duration: "2-4 weeks",
        peptides: [
          { name: "BPC-157", dose: "250mcg", frequency: "Once daily or as needed", instructions: "Taper based on recovery progress" },
        ],
        notes: "May discontinue TB-500. Continue BPC-157 until fully healed.",
      },
    ],
    contraindications: ["Active cancer", "Pregnancy", "Active systemic infection"],
    monitoringRequirements: ["Pain level tracking (1-10 scale)", "Range of motion assessment", "Progress photos", "Functional improvement metrics"],
    expectedOutcomes: ["Accelerated tissue repair", "Reduced inflammation", "Improved mobility", "Faster return to activity"],
    isStarred: true,
    usageCount: 38,
    createdAt: "2023-09-20",
    updatedAt: "2024-01-05",
    isCustom: false,
  },
  {
    id: "3",
    name: "Growth Hormone Optimization",
    category: "Growth Hormone",
    description: "CJC-1295/Ipamorelin combination for natural GH optimization and anti-aging benefits",
    indication: "GH deficiency symptoms, anti-aging, body composition improvement",
    duration: "12 weeks minimum",
    phases: [
      {
        id: "3-1",
        name: "Initiation",
        duration: "4 weeks",
        peptides: [
          { name: "CJC-1295", dose: "100mcg", frequency: "Once daily at bedtime", instructions: "Inject on empty stomach, 2+ hours after eating" },
          { name: "Ipamorelin", dose: "100mcg", frequency: "Once daily at bedtime", instructions: "Can be combined in same injection" },
        ],
        notes: "Start low to assess tolerance. Take on completely empty stomach.",
      },
      {
        id: "3-2",
        name: "Optimization",
        duration: "8+ weeks",
        peptides: [
          { name: "CJC-1295", dose: "200-300mcg", frequency: "Once daily at bedtime", instructions: "May split into morning + bedtime doses" },
          { name: "Ipamorelin", dose: "200-300mcg", frequency: "Once daily at bedtime", instructions: "Consistent timing important" },
        ],
        notes: "Increase based on response and tolerance. Monitor for water retention.",
      },
    ],
    contraindications: ["Active malignancy", "Uncontrolled diabetes", "Carpal tunnel syndrome"],
    monitoringRequirements: ["IGF-1 levels (baseline and 8 weeks)", "Body composition analysis", "Sleep quality tracking", "Fasting glucose monitoring"],
    expectedOutcomes: ["Improved body composition", "Better sleep quality", "Enhanced recovery", "Increased energy"],
    isStarred: false,
    usageCount: 28,
    createdAt: "2023-11-01",
    updatedAt: "2024-01-08",
    isCustom: false,
  },
  {
    id: "4",
    name: "Cognitive Enhancement Protocol",
    category: "Cognitive Enhancement",
    description: "Semax and Selank combination for cognitive enhancement and mood support",
    indication: "Cognitive decline, focus issues, anxiety, stress management",
    duration: "8-12 weeks",
    phases: [
      {
        id: "4-1",
        name: "Assessment Phase",
        duration: "2 weeks",
        peptides: [
          { name: "Semax", dose: "200mcg", frequency: "Once daily (morning)", instructions: "Intranasal administration" },
        ],
        notes: "Start with Semax alone to assess tolerance before adding Selank.",
      },
      {
        id: "4-2",
        name: "Full Protocol",
        duration: "6-10 weeks",
        peptides: [
          { name: "Semax", dose: "400-600mcg", frequency: "Morning + early afternoon", instructions: "Split doses, avoid late day use" },
          { name: "Selank", dose: "250-500mcg", frequency: "As needed for anxiety", instructions: "Intranasal, can use 2-3x daily" },
        ],
        notes: "Selank can be used situationally for anxiety or stress.",
      },
    ],
    contraindications: ["Severe hypertension", "History of stroke", "Bipolar disorder (use caution)"],
    monitoringRequirements: ["Cognitive testing (baseline and periodic)", "Mood tracking", "Blood pressure monitoring", "Sleep quality assessment"],
    expectedOutcomes: ["Improved focus and concentration", "Reduced anxiety", "Enhanced memory", "Better stress resilience"],
    isStarred: false,
    usageCount: 15,
    createdAt: "2023-12-01",
    updatedAt: "2024-01-12",
    isCustom: false,
  },
]

export default function ProviderProtocolsPage() {
  const [protocols, setProtocols] = useState(sampleProtocols)
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [selectedProtocol, setSelectedProtocol] = useState<Protocol | null>(null)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)

  const filteredProtocols = protocols.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = categoryFilter === "all" || p.category === categoryFilter
    return matchesSearch && matchesCategory
  })

  const starredProtocols = protocols.filter(p => p.isStarred)

  const handleToggleStar = (id: string) => {
    setProtocols(prev => prev.map(p =>
      p.id === id ? { ...p, isStarred: !p.isStarred } : p
    ))
    toast.success("Protocol updated")
  }

  const handleDuplicateProtocol = (protocol: Protocol) => {
    const newProtocol: Protocol = {
      ...protocol,
      id: Date.now().toString(),
      name: `${protocol.name} (Copy)`,
      isCustom: true,
      usageCount: 0,
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0],
    }
    setProtocols(prev => [...prev, newProtocol])
    toast.success("Protocol duplicated")
  }

  const handleApplyToPatient = (protocol: Protocol) => {
    toast.success(`Ready to apply "${protocol.name}" to a patient`)
  }

  return (
    <ProtectedRoute allowedRoles={["provider"]}>
      <DashboardLayout>
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">Treatment Protocols</h2>
              <p className="text-muted-foreground">
                Standardized treatment templates for common indications
              </p>
            </div>
            <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Create Protocol
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Create New Protocol</DialogTitle>
                  <DialogDescription>
                    Build a custom treatment protocol template
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Protocol Name</Label>
                      <Input placeholder="e.g., Custom Healing Protocol" />
                    </div>
                    <div className="space-y-2">
                      <Label>Category</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          {protocolCategories.map(cat => (
                            <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Description</Label>
                    <Textarea placeholder="Brief description of the protocol..." rows={2} />
                  </div>
                  <div className="space-y-2">
                    <Label>Indication</Label>
                    <Input placeholder="Primary indication for this protocol" />
                  </div>
                  <div className="space-y-2">
                    <Label>Duration</Label>
                    <Input placeholder="e.g., 8-12 weeks" />
                  </div>
                  <div className="p-4 bg-muted rounded-lg">
                    <p className="text-sm text-muted-foreground">
                      After creating the protocol, you&apos;ll be able to add phases, peptides, contraindications, and monitoring requirements.
                    </p>
                  </div>
                </div>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="outline">Cancel</Button>
                  </DialogClose>
                  <Button onClick={() => { toast.success("Protocol created"); setIsCreateDialogOpen(false) }}>
                    Create Protocol
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          {/* Quick Stats */}
          <div className="grid gap-4 md:grid-cols-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <FileText className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{protocols.length}</p>
                    <p className="text-sm text-muted-foreground">Total Protocols</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-yellow-100 rounded-lg">
                    <Star className="w-5 h-5 text-yellow-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{starredProtocols.length}</p>
                    <p className="text-sm text-muted-foreground">Starred</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <Target className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{protocols.reduce((acc, p) => acc + p.usageCount, 0)}</p>
                    <p className="text-sm text-muted-foreground">Times Used</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <Edit className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{protocols.filter(p => p.isCustom).length}</p>
                    <p className="text-sm text-muted-foreground">Custom</p>
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
                placeholder="Search protocols..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {protocolCategories.map(cat => (
                  <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Protocols List */}
          <Tabs defaultValue="all" className="w-full">
            <TabsList>
              <TabsTrigger value="all">All Protocols</TabsTrigger>
              <TabsTrigger value="starred">
                <Star className="w-4 h-4 mr-1" />
                Starred ({starredProtocols.length})
              </TabsTrigger>
              <TabsTrigger value="custom">Custom</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="mt-4">
              <div className="space-y-4">
                {filteredProtocols.map((protocol) => (
                  <Card key={protocol.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="text-lg font-semibold">{protocol.name}</h3>
                            <Badge variant="outline">{protocol.category}</Badge>
                            {protocol.isCustom && <Badge variant="secondary">Custom</Badge>}
                          </div>
                          <p className="text-sm text-muted-foreground mb-3">{protocol.description}</p>
                          <div className="flex flex-wrap gap-4 text-sm">
                            <div className="flex items-center gap-1">
                              <Target className="w-4 h-4 text-muted-foreground" />
                              <span>{protocol.indication}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="w-4 h-4 text-muted-foreground" />
                              <span>{protocol.duration}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Pill className="w-4 h-4 text-muted-foreground" />
                              <span>{protocol.phases.reduce((acc, p) => acc + p.peptides.length, 0)} peptides</span>
                            </div>
                            <div className="flex items-center gap-1 text-muted-foreground">
                              Used {protocol.usageCount} times
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleToggleStar(protocol.id)}
                          >
                            <Star className={`w-4 h-4 ${protocol.isStarred ? "fill-yellow-400 text-yellow-400" : ""}`} />
                          </Button>
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="outline" size="sm" onClick={() => setSelectedProtocol(protocol)}>
                                <Eye className="w-4 h-4 mr-2" />
                                View
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                              <DialogHeader>
                                <div className="flex items-center justify-between">
                                  <div>
                                    <DialogTitle>{protocol.name}</DialogTitle>
                                    <DialogDescription>{protocol.description}</DialogDescription>
                                  </div>
                                  <Badge variant="outline">{protocol.category}</Badge>
                                </div>
                              </DialogHeader>

                              <div className="space-y-6 py-4">
                                {/* Overview */}
                                <div className="grid grid-cols-2 gap-4 p-4 bg-muted rounded-lg">
                                  <div>
                                    <p className="text-sm text-muted-foreground">Indication</p>
                                    <p className="font-medium">{protocol.indication}</p>
                                  </div>
                                  <div>
                                    <p className="text-sm text-muted-foreground">Duration</p>
                                    <p className="font-medium">{protocol.duration}</p>
                                  </div>
                                </div>

                                {/* Phases */}
                                <div>
                                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                                    <ChevronRight className="w-4 h-4" />
                                    Treatment Phases
                                  </h4>
                                  <Accordion type="single" collapsible className="w-full">
                                    {protocol.phases.map((phase, index) => (
                                      <AccordionItem key={phase.id} value={phase.id}>
                                        <AccordionTrigger>
                                          <div className="flex items-center gap-3">
                                            <Badge variant="outline">{index + 1}</Badge>
                                            <span>{phase.name}</span>
                                            <span className="text-sm text-muted-foreground">({phase.duration})</span>
                                          </div>
                                        </AccordionTrigger>
                                        <AccordionContent>
                                          <div className="space-y-3 pt-2">
                                            {phase.peptides.map((peptide, i) => (
                                              <div key={i} className="p-3 bg-muted rounded-lg">
                                                <div className="flex items-center gap-2 mb-1">
                                                  <Pill className="w-4 h-4 text-primary" />
                                                  <span className="font-medium">{peptide.name}</span>
                                                </div>
                                                <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground ml-6">
                                                  <div>Dose: {peptide.dose}</div>
                                                  <div>Frequency: {peptide.frequency}</div>
                                                </div>
                                                <p className="text-sm text-muted-foreground ml-6 mt-1">
                                                  {peptide.instructions}
                                                </p>
                                              </div>
                                            ))}
                                            {phase.notes && (
                                              <p className="text-sm text-muted-foreground italic">
                                                Note: {phase.notes}
                                              </p>
                                            )}
                                          </div>
                                        </AccordionContent>
                                      </AccordionItem>
                                    ))}
                                  </Accordion>
                                </div>

                                {/* Contraindications */}
                                <div>
                                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                                    <AlertCircle className="w-4 h-4 text-red-500" />
                                    Contraindications
                                  </h4>
                                  <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                                    {protocol.contraindications.map((c, i) => (
                                      <li key={i}>{c}</li>
                                    ))}
                                  </ul>
                                </div>

                                {/* Monitoring */}
                                <div>
                                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                                    <Activity className="w-4 h-4 text-blue-500" />
                                    Monitoring Requirements
                                  </h4>
                                  <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                                    {protocol.monitoringRequirements.map((m, i) => (
                                      <li key={i}>{m}</li>
                                    ))}
                                  </ul>
                                </div>

                                {/* Expected Outcomes */}
                                <div>
                                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                                    <CheckCircle className="w-4 h-4 text-green-500" />
                                    Expected Outcomes
                                  </h4>
                                  <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                                    {protocol.expectedOutcomes.map((o, i) => (
                                      <li key={i}>{o}</li>
                                    ))}
                                  </ul>
                                </div>
                              </div>

                              <DialogFooter>
                                <Button variant="outline" onClick={() => handleDuplicateProtocol(protocol)}>
                                  <Copy className="w-4 h-4 mr-2" />
                                  Duplicate
                                </Button>
                                <Button onClick={() => handleApplyToPatient(protocol)}>
                                  <ArrowRight className="w-4 h-4 mr-2" />
                                  Apply to Patient
                                </Button>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>
                          <Button variant="ghost" size="icon" onClick={() => handleDuplicateProtocol(protocol)}>
                            <Copy className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="starred" className="mt-4">
              <div className="space-y-4">
                {starredProtocols.length === 0 ? (
                  <Card>
                    <CardContent className="p-12 text-center">
                      <Star className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-semibold mb-2">No Starred Protocols</h3>
                      <p className="text-muted-foreground">Star your frequently used protocols for quick access</p>
                    </CardContent>
                  </Card>
                ) : (
                  starredProtocols.map((protocol) => (
                    <Card key={protocol.id} className="hover:shadow-md transition-shadow border-yellow-200">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between">
                          <div>
                            <div className="flex items-center gap-2 mb-2">
                              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                              <h3 className="text-lg font-semibold">{protocol.name}</h3>
                              <Badge variant="outline">{protocol.category}</Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mb-2">{protocol.description}</p>
                            <div className="flex gap-4 text-sm text-muted-foreground">
                              <span>{protocol.duration}</span>
                              <span>{protocol.phases.length} phases</span>
                              <span>Used {protocol.usageCount} times</span>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">View</Button>
                            <Button size="sm">Apply</Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </TabsContent>

            <TabsContent value="custom" className="mt-4">
              <div className="space-y-4">
                {protocols.filter(p => p.isCustom).length === 0 ? (
                  <Card>
                    <CardContent className="p-12 text-center">
                      <Edit className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-semibold mb-2">No Custom Protocols</h3>
                      <p className="text-muted-foreground mb-4">Create your own protocols or duplicate existing ones</p>
                      <Button onClick={() => setIsCreateDialogOpen(true)}>
                        <Plus className="w-4 h-4 mr-2" />
                        Create Protocol
                      </Button>
                    </CardContent>
                  </Card>
                ) : (
                  protocols.filter(p => p.isCustom).map((protocol) => (
                    <Card key={protocol.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between">
                          <div>
                            <div className="flex items-center gap-2 mb-2">
                              <h3 className="text-lg font-semibold">{protocol.name}</h3>
                              <Badge variant="secondary">Custom</Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">{protocol.description}</p>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline" size="icon">
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button variant="outline" size="icon">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  )
}
