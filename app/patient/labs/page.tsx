"use client"

export const dynamic = 'force-dynamic'

import { useState, useRef } from "react"
import { ProtectedRoute } from "@/components/protected-route"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
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
  Activity,
  ShoppingCart,
  Package,
  Home,
  Calculator,
  Calendar,
  BookOpen,
  Phone,
  MessageSquare,
  FileText,
  Upload,
  Download,
  Eye,
  CheckCircle,
  Clock,
  AlertCircle,
  TrendingUp,
  TrendingDown,
  Minus,
  File,
  Image,
  X,
  Beaker,
} from "lucide-react"
import { toast } from "sonner"

const labResults = [
  {
    id: "lab-1",
    name: "Comprehensive Metabolic Panel",
    date: "2024-01-20",
    provider: "LabCorp",
    status: "reviewed",
    reviewedBy: "Dr. Sarah Johnson",
    reviewedDate: "2024-01-22",
    results: [
      { name: "Glucose", value: 95, unit: "mg/dL", range: "70-100", status: "normal" },
      { name: "BUN", value: 18, unit: "mg/dL", range: "7-20", status: "normal" },
      { name: "Creatinine", value: 1.1, unit: "mg/dL", range: "0.7-1.3", status: "normal" },
      { name: "Sodium", value: 140, unit: "mEq/L", range: "136-145", status: "normal" },
      { name: "Potassium", value: 4.2, unit: "mEq/L", range: "3.5-5.0", status: "normal" },
      { name: "Chloride", value: 102, unit: "mEq/L", range: "98-106", status: "normal" },
      { name: "CO2", value: 24, unit: "mEq/L", range: "23-29", status: "normal" },
      { name: "Calcium", value: 9.5, unit: "mg/dL", range: "8.5-10.5", status: "normal" },
    ],
  },
  {
    id: "lab-2",
    name: "Lipid Panel",
    date: "2024-01-20",
    provider: "LabCorp",
    status: "reviewed",
    reviewedBy: "Dr. Sarah Johnson",
    reviewedDate: "2024-01-22",
    results: [
      { name: "Total Cholesterol", value: 195, unit: "mg/dL", range: "<200", status: "normal" },
      { name: "HDL", value: 55, unit: "mg/dL", range: ">40", status: "normal" },
      { name: "LDL", value: 120, unit: "mg/dL", range: "<100", status: "high" },
      { name: "Triglycerides", value: 100, unit: "mg/dL", range: "<150", status: "normal" },
    ],
  },
  {
    id: "lab-3",
    name: "Thyroid Panel",
    date: "2024-01-20",
    provider: "Quest Diagnostics",
    status: "pending_review",
    reviewedBy: null,
    reviewedDate: null,
    results: [
      { name: "TSH", value: 2.5, unit: "mIU/L", range: "0.4-4.0", status: "normal" },
      { name: "Free T4", value: 1.2, unit: "ng/dL", range: "0.8-1.8", status: "normal" },
      { name: "Free T3", value: 3.0, unit: "pg/mL", range: "2.3-4.2", status: "normal" },
    ],
  },
  {
    id: "lab-4",
    name: "Hormone Panel",
    date: "2024-01-05",
    provider: "LabCorp",
    status: "reviewed",
    reviewedBy: "Dr. Michael Chen",
    reviewedDate: "2024-01-08",
    results: [
      { name: "Testosterone", value: 650, unit: "ng/dL", range: "300-1000", status: "normal" },
      { name: "Estradiol", value: 25, unit: "pg/mL", range: "10-40", status: "normal" },
      { name: "IGF-1", value: 180, unit: "ng/mL", range: "100-300", status: "normal" },
      { name: "DHEA-S", value: 350, unit: "mcg/dL", range: "100-600", status: "normal" },
    ],
  },
]

const labCategories = [
  "Comprehensive Metabolic Panel",
  "Lipid Panel",
  "Thyroid Panel",
  "Hormone Panel",
  "Complete Blood Count",
  "Vitamin Panel",
  "Inflammatory Markers",
  "Other",
]

export default function PatientLabsPage() {
  const [activeTab, setActiveTab] = useState("results")
  const [showUploadDialog, setShowUploadDialog] = useState(false)
  const [showResultDialog, setShowResultDialog] = useState(false)
  const [selectedLab, setSelectedLab] = useState<typeof labResults[0] | null>(null)
  const [uploadFiles, setUploadFiles] = useState<File[]>([])
  const [labCategory, setLabCategory] = useState("")
  const [labDate, setLabDate] = useState("")
  const [labProvider, setLabProvider] = useState("")
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setUploadFiles(Array.from(e.target.files))
    }
  }

  const handleRemoveFile = (index: number) => {
    setUploadFiles(files => files.filter((_, i) => i !== index))
  }

  const handleUpload = () => {
    if (uploadFiles.length === 0) {
      toast.error("Please select files to upload")
      return
    }
    if (!labCategory || !labDate) {
      toast.error("Please fill in all required fields")
      return
    }

    toast.success("Lab results uploaded successfully!", {
      description: "Your provider will review the results shortly.",
    })
    setShowUploadDialog(false)
    setUploadFiles([])
    setLabCategory("")
    setLabDate("")
    setLabProvider("")
  }

  const handleViewResult = (lab: typeof labResults[0]) => {
    setSelectedLab(lab)
    setShowResultDialog(true)
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

  const pendingReview = labResults.filter(l => l.status === "pending_review")
  const reviewed = labResults.filter(l => l.status === "reviewed")

  return (
    <ProtectedRoute allowedRoles={["patient"]}>
      <DashboardLayout>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">Lab Results</h2>
              <p className="text-muted-foreground">View and upload your laboratory results</p>
            </div>
            <Button onClick={() => setShowUploadDialog(true)}>
              <Upload className="w-4 h-4 mr-2" />
              Upload Labs
            </Button>
          </div>

          {pendingReview.length > 0 && (
            <Card className="border-amber-200 bg-amber-50/50">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-amber-600" />
                  <div>
                    <p className="font-medium text-amber-900">
                      {pendingReview.length} lab result{pendingReview.length > 1 ? "s" : ""} pending review
                    </p>
                    <p className="text-sm text-amber-700">
                      Your provider will review these results soon
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="results">All Results</TabsTrigger>
              <TabsTrigger value="pending">
                Pending Review
                {pendingReview.length > 0 && (
                  <Badge variant="secondary" className="ml-2">
                    {pendingReview.length}
                  </Badge>
                )}
              </TabsTrigger>
              <TabsTrigger value="history">History</TabsTrigger>
            </TabsList>

            <TabsContent value="results" className="space-y-4">
              {labResults.map((lab) => (
                <Card key={lab.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                          lab.status === "reviewed" ? "bg-green-100" : "bg-amber-100"
                        }`}>
                          {lab.status === "reviewed" ? (
                            <CheckCircle className="w-6 h-6 text-green-600" />
                          ) : (
                            <Clock className="w-6 h-6 text-amber-600" />
                          )}
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg">{lab.name}</h3>
                          <p className="text-muted-foreground">{lab.provider}</p>
                          <div className="flex items-center gap-4 mt-2 text-sm">
                            <span className="text-muted-foreground">
                              Collected: {lab.date}
                            </span>
                            {lab.status === "reviewed" && (
                              <span className="text-green-600">
                                Reviewed by {lab.reviewedBy} on {lab.reviewedDate}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={lab.status === "reviewed" ? "secondary" : "default"}>
                          {lab.status === "reviewed" ? "Reviewed" : "Pending Review"}
                        </Badge>
                        <Button
                          variant="outline"
                          className="bg-transparent"
                          onClick={() => handleViewResult(lab)}
                        >
                          <Eye className="w-4 h-4 mr-2" />
                          View Details
                        </Button>
                      </div>
                    </div>

                    <Separator className="my-4" />

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {lab.results.slice(0, 4).map((result, idx) => (
                        <div key={idx} className="p-3 bg-muted/50 rounded-lg">
                          <p className="text-xs text-muted-foreground">{result.name}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="font-semibold">{result.value}</span>
                            <span className="text-xs text-muted-foreground">{result.unit}</span>
                            <Badge
                              variant="secondary"
                              className={`text-xs ${getStatusColor(result.status)}`}
                            >
                              {getStatusIcon(result.status)}
                              <span className="ml-1 capitalize">{result.status}</span>
                            </Badge>
                          </div>
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
              ))}
            </TabsContent>

            <TabsContent value="pending" className="space-y-4">
              {pendingReview.length === 0 ? (
                <Card>
                  <CardContent className="flex flex-col items-center justify-center py-12">
                    <CheckCircle className="w-12 h-12 text-green-500 mb-4" />
                    <h3 className="text-lg font-semibold mb-2">All Caught Up!</h3>
                    <p className="text-muted-foreground text-center">
                      All your lab results have been reviewed by your provider.
                    </p>
                  </CardContent>
                </Card>
              ) : (
                pendingReview.map((lab) => (
                  <Card key={lab.id} className="border-amber-200">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center">
                            <Clock className="w-6 h-6 text-amber-600" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-lg">{lab.name}</h3>
                            <p className="text-muted-foreground">{lab.provider}</p>
                            <p className="text-sm text-muted-foreground mt-1">
                              Collected: {lab.date}
                            </p>
                          </div>
                        </div>
                        <Button
                          variant="outline"
                          className="bg-transparent"
                          onClick={() => handleViewResult(lab)}
                        >
                          <Eye className="w-4 h-4 mr-2" />
                          View Results
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </TabsContent>

            <TabsContent value="history">
              <Card>
                <CardHeader>
                  <CardTitle>Lab History Timeline</CardTitle>
                  <CardDescription>
                    Track your lab results over time
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {labResults.map((lab, idx) => (
                      <div key={lab.id} className="flex gap-4">
                        <div className="flex flex-col items-center">
                          <div className={`w-3 h-3 rounded-full ${
                            lab.status === "reviewed" ? "bg-green-500" : "bg-amber-500"
                          }`} />
                          {idx < labResults.length - 1 && (
                            <div className="w-0.5 h-full bg-muted" />
                          )}
                        </div>
                        <div className="pb-4">
                          <p className="font-medium">{lab.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {lab.date} - {lab.provider}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Upload Dialog */}
        <Dialog open={showUploadDialog} onOpenChange={setShowUploadDialog}>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Upload Lab Results</DialogTitle>
              <DialogDescription>
                Upload your lab results for your provider to review
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
              <div
                className="border-2 border-dashed rounded-lg p-8 text-center cursor-pointer hover:border-primary transition-colors"
                onClick={() => fileInputRef.current?.click()}
              >
                <Upload className="w-8 h-8 mx-auto text-muted-foreground mb-2" />
                <p className="text-sm font-medium">Click to upload or drag and drop</p>
                <p className="text-xs text-muted-foreground">PDF, PNG, JPG up to 10MB</p>
                <input
                  ref={fileInputRef}
                  type="file"
                  className="hidden"
                  multiple
                  accept=".pdf,.png,.jpg,.jpeg"
                  onChange={handleFileSelect}
                />
              </div>

              {uploadFiles.length > 0 && (
                <div className="space-y-2">
                  {uploadFiles.map((file, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-2 bg-muted rounded-lg"
                    >
                      <div className="flex items-center gap-2">
                        {file.type.includes("pdf") ? (
                          <File className="w-4 h-4 text-red-500" />
                        ) : (
                          <Image className="w-4 h-4 text-blue-500" />
                        )}
                        <span className="text-sm truncate max-w-[200px]">{file.name}</span>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6"
                        onClick={() => handleRemoveFile(idx)}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}

              <div className="space-y-2">
                <Label>Lab Category *</Label>
                <Select value={labCategory} onValueChange={setLabCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {labCategories.map((cat) => (
                      <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Collection Date *</Label>
                  <Input
                    type="date"
                    value={labDate}
                    onChange={(e) => setLabDate(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Lab Provider</Label>
                  <Input
                    placeholder="e.g., LabCorp, Quest"
                    value={labProvider}
                    onChange={(e) => setLabProvider(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <DialogFooter>
              <Button
                variant="outline"
                className="bg-transparent"
                onClick={() => setShowUploadDialog(false)}
              >
                Cancel
              </Button>
              <Button onClick={handleUpload}>
                <Upload className="w-4 h-4 mr-2" />
                Upload Results
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Result Detail Dialog */}
        <Dialog open={showResultDialog} onOpenChange={setShowResultDialog}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{selectedLab?.name}</DialogTitle>
              <DialogDescription>
                {selectedLab?.provider} - {selectedLab?.date}
              </DialogDescription>
            </DialogHeader>

            {selectedLab && (
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    selectedLab.status === "reviewed" ? "bg-green-100" : "bg-amber-100"
                  }`}>
                    {selectedLab.status === "reviewed" ? (
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    ) : (
                      <Clock className="w-5 h-5 text-amber-600" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium">
                      {selectedLab.status === "reviewed" ? "Reviewed" : "Pending Review"}
                    </p>
                    {selectedLab.status === "reviewed" && (
                      <p className="text-sm text-muted-foreground">
                        By {selectedLab.reviewedBy} on {selectedLab.reviewedDate}
                      </p>
                    )}
                  </div>
                </div>

                <div className="border rounded-lg divide-y">
                  {selectedLab.results.map((result, idx) => (
                    <div key={idx} className="p-4 flex items-center justify-between">
                      <div>
                        <p className="font-medium">{result.name}</p>
                        <p className="text-sm text-muted-foreground">
                          Reference: {result.range} {result.unit}
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-lg font-semibold">
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
              </div>
            )}

            <DialogFooter>
              <Button variant="outline" className="bg-transparent">
                <Download className="w-4 h-4 mr-2" />
                Download PDF
              </Button>
              <Button onClick={() => setShowResultDialog(false)}>Close</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </DashboardLayout>
    </ProtectedRoute>
  )
}
