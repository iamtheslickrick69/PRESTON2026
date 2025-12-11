"use client"

export const dynamic = 'force-dynamic'

import { useState } from "react"
import { ProtectedRoute } from "@/components/protected-route"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
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
  CheckCircle,
  Clock,
  AlertCircle,
  TrendingUp,
  TrendingDown,
  Minus,
  Eye,
  MessageSquare,
  ClipboardList,
  Beaker,
  CheckCircle2,
  Filter,
} from "lucide-react"
import { toast } from "sonner"

const pendingLabs = [
  {
    id: "lab-1",
    patientName: "Sarah Johnson",
    patientInitials: "SJ",
    patientId: "MRN-001234",
    labName: "Thyroid Panel",
    labProvider: "Quest Diagnostics",
    uploadDate: "2024-01-20",
    priority: "normal",
    results: [
      { name: "TSH", value: 2.5, unit: "mIU/L", range: "0.4-4.0", status: "normal" },
      { name: "Free T4", value: 1.2, unit: "ng/dL", range: "0.8-1.8", status: "normal" },
      { name: "Free T3", value: 3.0, unit: "pg/mL", range: "2.3-4.2", status: "normal" },
    ],
  },
  {
    id: "lab-2",
    patientName: "Michael Chen",
    patientInitials: "MC",
    patientId: "MRN-001235",
    labName: "Comprehensive Metabolic Panel",
    labProvider: "LabCorp",
    uploadDate: "2024-01-21",
    priority: "high",
    results: [
      { name: "Glucose", value: 125, unit: "mg/dL", range: "70-100", status: "high" },
      { name: "BUN", value: 28, unit: "mg/dL", range: "7-20", status: "high" },
      { name: "Creatinine", value: 1.0, unit: "mg/dL", range: "0.7-1.3", status: "normal" },
      { name: "Sodium", value: 140, unit: "mEq/L", range: "136-145", status: "normal" },
      { name: "Potassium", value: 4.8, unit: "mEq/L", range: "3.5-5.0", status: "normal" },
    ],
  },
  {
    id: "lab-3",
    patientName: "Emily Rodriguez",
    patientInitials: "ER",
    patientId: "MRN-001236",
    labName: "Hormone Panel",
    labProvider: "LabCorp",
    uploadDate: "2024-01-22",
    priority: "normal",
    results: [
      { name: "Testosterone", value: 45, unit: "ng/dL", range: "15-70", status: "normal" },
      { name: "Estradiol", value: 180, unit: "pg/mL", range: "30-400", status: "normal" },
      { name: "Progesterone", value: 12, unit: "ng/mL", range: "1.8-24", status: "normal" },
    ],
  },
]

const recentlyReviewed = [
  {
    id: "lab-4",
    patientName: "James Wilson",
    patientInitials: "JW",
    patientId: "MRN-001237",
    labName: "Lipid Panel",
    labProvider: "LabCorp",
    reviewedDate: "2024-01-20",
    notes: "LDL elevated. Recommend dietary modifications and follow-up in 3 months.",
  },
  {
    id: "lab-5",
    patientName: "Sarah Johnson",
    patientInitials: "SJ",
    patientId: "MRN-001234",
    labName: "Comprehensive Metabolic Panel",
    labProvider: "LabCorp",
    reviewedDate: "2024-01-19",
    notes: "All values within normal limits. Continue current protocol.",
  },
]

export default function ProviderLabsPage() {
  const [activeTab, setActiveTab] = useState("pending")
  const [searchQuery, setSearchQuery] = useState("")
  const [showReviewDialog, setShowReviewDialog] = useState(false)
  const [selectedLab, setSelectedLab] = useState<typeof pendingLabs[0] | null>(null)
  const [reviewNotes, setReviewNotes] = useState("")
  const [reviewAction, setReviewAction] = useState("")

  const filteredPending = pendingLabs.filter(lab =>
    lab.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    lab.labName.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleOpenReview = (lab: typeof pendingLabs[0]) => {
    setSelectedLab(lab)
    setReviewNotes("")
    setReviewAction("")
    setShowReviewDialog(true)
  }

  const handleSubmitReview = () => {
    if (!reviewNotes) {
      toast.error("Please add review notes")
      return
    }

    toast.success("Lab review submitted", {
      description: `Results for ${selectedLab?.patientName} have been reviewed.`,
    })
    setShowReviewDialog(false)
    setSelectedLab(null)
    setReviewNotes("")
    setReviewAction("")
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "normal":
        return "text-green-600 bg-green-100"
      case "high":
        return "text-red-600 bg-red-100"
      case "low":
        return "text-amber-600 bg-amber-100"
      default:
        return "text-gray-600 bg-gray-100"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "normal":
        return <Minus className="w-3 h-3" />
      case "high":
        return <TrendingUp className="w-3 h-3" />
      case "low":
        return <TrendingDown className="w-3 h-3" />
      default:
        return null
    }
  }

  const hasAbnormalResults = (lab: typeof pendingLabs[0]) => {
    return lab.results.some(r => r.status !== "normal")
  }

  return (
    <ProtectedRoute allowedRoles={["provider"]}>
      <DashboardLayout>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">Lab Review</h2>
              <p className="text-muted-foreground">Review patient laboratory results</p>
            </div>
            <Badge variant="destructive" className="text-sm">
              {pendingLabs.length} pending review
            </Badge>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by patient or lab type..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button variant="outline" className="bg-transparent">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="pending" className="relative">
                Pending Review
                <Badge variant="destructive" className="ml-2">
                  {pendingLabs.length}
                </Badge>
              </TabsTrigger>
              <TabsTrigger value="reviewed">Recently Reviewed</TabsTrigger>
            </TabsList>

            <TabsContent value="pending" className="space-y-4">
              {filteredPending.length === 0 ? (
                <Card>
                  <CardContent className="flex flex-col items-center justify-center py-12">
                    <CheckCircle className="w-12 h-12 text-green-500 mb-4" />
                    <h3 className="text-lg font-semibold mb-2">All Caught Up!</h3>
                    <p className="text-muted-foreground text-center">
                      No labs pending review at this time.
                    </p>
                  </CardContent>
                </Card>
              ) : (
                filteredPending.map((lab) => (
                  <Card
                    key={lab.id}
                    className={lab.priority === "high" || hasAbnormalResults(lab) ? "border-red-200" : ""}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-4">
                          <Avatar className="h-12 w-12">
                            <AvatarFallback>{lab.patientInitials}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="font-semibold text-lg">{lab.patientName}</h3>
                              <span className="text-sm text-muted-foreground">
                                {lab.patientId}
                              </span>
                            </div>
                            <p className="text-muted-foreground">{lab.labName}</p>
                            <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                              <span>{lab.labProvider}</span>
                              <span>Uploaded: {lab.uploadDate}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {(lab.priority === "high" || hasAbnormalResults(lab)) && (
                            <Badge variant="destructive">
                              <AlertCircle className="w-3 h-3 mr-1" />
                              {lab.priority === "high" ? "High Priority" : "Abnormal Values"}
                            </Badge>
                          )}
                          <Button onClick={() => handleOpenReview(lab)}>
                            <Eye className="w-4 h-4 mr-2" />
                            Review
                          </Button>
                        </div>
                      </div>

                      <Separator className="my-4" />

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {lab.results.slice(0, 4).map((result, idx) => (
                          <div
                            key={idx}
                            className={`p-3 rounded-lg ${
                              result.status !== "normal" ? "bg-red-50 border border-red-200" : "bg-muted/50"
                            }`}
                          >
                            <p className="text-xs text-muted-foreground">{result.name}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="font-semibold">{result.value}</span>
                              <span className="text-xs text-muted-foreground">{result.unit}</span>
                            </div>
                            <Badge
                              variant="secondary"
                              className={`text-xs mt-1 ${getStatusColor(result.status)}`}
                            >
                              {getStatusIcon(result.status)}
                              <span className="ml-1 capitalize">{result.status}</span>
                            </Badge>
                          </div>
                        ))}
                      </div>
                      {lab.results.length > 4 && (
                        <p className="text-sm text-muted-foreground mt-3">
                          +{lab.results.length - 4} more results
                        </p>
                      )}
                    </CardContent>
                  </Card>
                ))
              )}
            </TabsContent>

            <TabsContent value="reviewed" className="space-y-4">
              {recentlyReviewed.map((lab) => (
                <Card key={lab.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4">
                        <Avatar className="h-12 w-12">
                          <AvatarFallback>{lab.patientInitials}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold">{lab.patientName}</h3>
                            <span className="text-sm text-muted-foreground">
                              {lab.patientId}
                            </span>
                          </div>
                          <p className="text-muted-foreground">{lab.labName}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="secondary" className="bg-green-100 text-green-700">
                              <CheckCircle2 className="w-3 h-3 mr-1" />
                              Reviewed
                            </Badge>
                            <span className="text-sm text-muted-foreground">
                              {lab.reviewedDate}
                            </span>
                          </div>
                        </div>
                      </div>
                      <Button variant="outline" className="bg-transparent">
                        View Details
                      </Button>
                    </div>
                    {lab.notes && (
                      <>
                        <Separator className="my-4" />
                        <div className="p-3 bg-muted/50 rounded-lg">
                          <p className="text-sm font-medium mb-1">Review Notes:</p>
                          <p className="text-sm text-muted-foreground">{lab.notes}</p>
                        </div>
                      </>
                    )}
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
          </Tabs>
        </div>

        {/* Review Dialog */}
        <Dialog open={showReviewDialog} onOpenChange={setShowReviewDialog}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Review Lab Results</DialogTitle>
              <DialogDescription>
                {selectedLab?.patientName} - {selectedLab?.labName}
              </DialogDescription>
            </DialogHeader>

            {selectedLab && (
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg">
                  <Avatar>
                    <AvatarFallback>{selectedLab.patientInitials}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{selectedLab.patientName}</p>
                    <p className="text-sm text-muted-foreground">
                      {selectedLab.patientId} | {selectedLab.labProvider}
                    </p>
                  </div>
                </div>

                <div className="border rounded-lg divide-y">
                  {selectedLab.results.map((result, idx) => (
                    <div
                      key={idx}
                      className={`p-4 flex items-center justify-between ${
                        result.status !== "normal" ? "bg-red-50" : ""
                      }`}
                    >
                      <div>
                        <p className="font-medium">{result.name}</p>
                        <p className="text-sm text-muted-foreground">
                          Reference: {result.range} {result.unit}
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className={`text-lg font-semibold ${
                          result.status !== "normal" ? "text-red-600" : ""
                        }`}>
                          {result.value} {result.unit}
                        </span>
                        <Badge
                          variant="secondary"
                          className={getStatusColor(result.status)}
                        >
                          {getStatusIcon(result.status)}
                          <span className="ml-1 capitalize">{result.status}</span>
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>

                <Separator />

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Clinical Interpretation / Action</Label>
                    <Select value={reviewAction} onValueChange={setReviewAction}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select action" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="normal">Results Normal - Continue Current Protocol</SelectItem>
                        <SelectItem value="monitor">Results Need Monitoring - Recheck in 4 weeks</SelectItem>
                        <SelectItem value="adjust">Adjust Treatment Protocol</SelectItem>
                        <SelectItem value="urgent">Urgent - Contact Patient Immediately</SelectItem>
                        <SelectItem value="refer">Refer to Specialist</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Review Notes *</Label>
                    <Textarea
                      placeholder="Enter your clinical notes and recommendations..."
                      className="min-h-[100px]"
                      value={reviewNotes}
                      onChange={(e) => setReviewNotes(e.target.value)}
                    />
                  </div>

                  <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg text-sm">
                    <MessageSquare className="w-4 h-4 text-blue-600" />
                    <span className="text-blue-700">
                      Patient will be notified when you complete this review
                    </span>
                  </div>
                </div>
              </div>
            )}

            <DialogFooter>
              <Button
                variant="outline"
                className="bg-transparent"
                onClick={() => setShowReviewDialog(false)}
              >
                Cancel
              </Button>
              <Button onClick={handleSubmitReview}>
                <CheckCircle2 className="w-4 h-4 mr-2" />
                Complete Review
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </DashboardLayout>
    </ProtectedRoute>
  )
}
