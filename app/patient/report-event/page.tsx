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
  ShoppingCart,
  Package,
  Activity,
  Calculator,
  Calendar,
  BookOpen,
  Phone,
  ArrowLeft,
  Upload,
  CheckCircle,
} from "lucide-react"
import Link from "next/link"
import { toast } from "sonner"

const activePeptides = [
  { id: "bpc-157", name: "BPC-157", dose: "250 mcg", frequency: "Twice daily" },
  { id: "tb-500", name: "TB-500", dose: "2 mg", frequency: "Twice weekly" },
]

const commonSymptoms = [
  { id: "nausea", label: "Nausea" },
  { id: "headache", label: "Headache" },
  { id: "fatigue", label: "Fatigue" },
  { id: "injection-site", label: "Injection Site Reaction" },
  { id: "dizziness", label: "Dizziness" },
  { id: "flushing", label: "Flushing" },
  { id: "appetite-change", label: "Appetite Change" },
  { id: "sleep-issues", label: "Sleep Issues" },
  { id: "mood-changes", label: "Mood Changes" },
  { id: "muscle-pain", label: "Muscle Pain" },
  { id: "joint-pain", label: "Joint Pain" },
  { id: "swelling", label: "Swelling" },
]

export default function PatientReportEventPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [selectedPeptide, setSelectedPeptide] = useState("")
  const [severity, setSeverity] = useState("")
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([])
  const [onsetDate, setOnsetDate] = useState("")
  const [onsetTime, setOnsetTime] = useState("")
  const [description, setDescription] = useState("")
  const [actionsTaken, setActionsTaken] = useState("")
  const [contactProvider, setContactProvider] = useState(false)

  const handleSymptomToggle = (symptomId: string) => {
    setSelectedSymptoms(prev =>
      prev.includes(symptomId)
        ? prev.filter(id => id !== symptomId)
        : [...prev, symptomId]
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!selectedPeptide || !severity || selectedSymptoms.length === 0) {
      toast.error("Please fill in all required fields")
      return
    }

    setIsSubmitting(true)

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))

    setIsSubmitting(false)
    setIsSubmitted(true)
    toast.success("Adverse event report submitted successfully")

    // If patient wants provider contact, show additional message
    if (contactProvider) {
      toast.info("Your provider will contact you within 24 hours")
    }
  }

  if (isSubmitted) {
    return (
      <ProtectedRoute allowedRoles={["patient"]}>
        <DashboardLayout>
          <div className="max-w-2xl mx-auto">
            <Card>
              <CardContent className="pt-6">
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  </div>
                  <h2 className="text-2xl font-bold">Report Submitted</h2>
                  <p className="text-muted-foreground">
                    Thank you for reporting this adverse event. Your safety is our priority.
                  </p>
                  {contactProvider && (
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <p className="text-sm text-blue-800">
                        Your provider has been notified and will contact you within 24 hours.
                      </p>
                    </div>
                  )}
                  <div className="pt-4 space-y-2">
                    <p className="text-sm font-medium">Report Reference: #AE-2024-0001</p>
                    <p className="text-xs text-muted-foreground">
                      Submitted on {new Date().toLocaleDateString()} at {new Date().toLocaleTimeString()}
                    </p>
                  </div>
                  <div className="pt-4 flex gap-3 justify-center">
                    <Button variant="outline" onClick={() => router.push("/patient/dashboard")}>
                      Return to Dashboard
                    </Button>
                    <Button onClick={() => {
                      setIsSubmitted(false)
                      setSelectedPeptide("")
                      setSeverity("")
                      setSelectedSymptoms([])
                      setOnsetDate("")
                      setOnsetTime("")
                      setDescription("")
                      setActionsTaken("")
                      setContactProvider(false)
                    }}>
                      Report Another Event
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
    <ProtectedRoute allowedRoles={["patient"]}>
      <DashboardLayout>
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <Link href="/patient/dashboard">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <div>
              <h2 className="text-3xl font-bold tracking-tight">Report Adverse Event</h2>
              <p className="text-muted-foreground">
                Report any side effects or adverse reactions you've experienced
              </p>
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit}>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <AlertTriangle className="h-5 w-5 text-orange-500" />
                      Event Details
                    </CardTitle>
                    <CardDescription>
                      Please provide as much detail as possible about the adverse event
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Peptide Selection */}
                    <div className="space-y-2">
                      <Label htmlFor="peptide">Which peptide is this related to? *</Label>
                      <Select value={selectedPeptide} onValueChange={setSelectedPeptide}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a peptide" />
                        </SelectTrigger>
                        <SelectContent>
                          {activePeptides.map(peptide => (
                            <SelectItem key={peptide.id} value={peptide.id}>
                              {peptide.name} ({peptide.dose} - {peptide.frequency})
                            </SelectItem>
                          ))}
                          <SelectItem value="other">Other / Unknown</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Severity */}
                    <div className="space-y-3">
                      <Label>Severity Level *</Label>
                      <RadioGroup value={severity} onValueChange={setSeverity} className="grid grid-cols-3 gap-4">
                        <div>
                          <RadioGroupItem value="mild" id="mild" className="peer sr-only" />
                          <Label
                            htmlFor="mild"
                            className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-green-500 [&:has([data-state=checked])]:border-green-500 cursor-pointer"
                          >
                            <span className="text-sm font-medium">Mild</span>
                            <span className="text-xs text-muted-foreground text-center mt-1">
                              Minor discomfort, no disruption to daily activities
                            </span>
                          </Label>
                        </div>
                        <div>
                          <RadioGroupItem value="moderate" id="moderate" className="peer sr-only" />
                          <Label
                            htmlFor="moderate"
                            className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-yellow-500 [&:has([data-state=checked])]:border-yellow-500 cursor-pointer"
                          >
                            <span className="text-sm font-medium">Moderate</span>
                            <span className="text-xs text-muted-foreground text-center mt-1">
                              Noticeable symptoms, some impact on daily activities
                            </span>
                          </Label>
                        </div>
                        <div>
                          <RadioGroupItem value="severe" id="severe" className="peer sr-only" />
                          <Label
                            htmlFor="severe"
                            className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-red-500 [&:has([data-state=checked])]:border-red-500 cursor-pointer"
                          >
                            <span className="text-sm font-medium">Severe</span>
                            <span className="text-xs text-muted-foreground text-center mt-1">
                              Significant symptoms, unable to perform daily activities
                            </span>
                          </Label>
                        </div>
                      </RadioGroup>
                    </div>

                    {/* Symptoms */}
                    <div className="space-y-3">
                      <Label>Symptoms Experienced * (select all that apply)</Label>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
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

                    {/* Date/Time of Onset */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="onset-date">Date of Onset</Label>
                        <Input
                          id="onset-date"
                          type="date"
                          value={onsetDate}
                          onChange={(e) => setOnsetDate(e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="onset-time">Time of Onset (approx)</Label>
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
                      <Label htmlFor="description">Describe what happened</Label>
                      <Textarea
                        id="description"
                        placeholder="Please describe the symptoms in detail, including how they started, how long they lasted, and any other relevant information..."
                        rows={4}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                      />
                    </div>

                    {/* Actions Taken */}
                    <div className="space-y-2">
                      <Label htmlFor="actions">Actions taken (if any)</Label>
                      <Textarea
                        id="actions"
                        placeholder="Did you stop the peptide? Take any medications? Rest? Please describe any actions you took..."
                        rows={3}
                        value={actionsTaken}
                        onChange={(e) => setActionsTaken(e.target.value)}
                      />
                    </div>

                    {/* Photo Upload */}
                    <div className="space-y-2">
                      <Label>Attach Photos (optional)</Label>
                      <div className="border-2 border-dashed rounded-lg p-6 text-center hover:bg-muted/50 cursor-pointer transition-colors">
                        <Upload className="w-8 h-8 mx-auto text-muted-foreground mb-2" />
                        <p className="text-sm text-muted-foreground">
                          Click to upload or drag and drop
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          PNG, JPG up to 10MB (useful for injection site reactions)
                        </p>
                      </div>
                    </div>

                    {/* Contact Provider */}
                    <div className="flex items-start space-x-3 p-4 bg-muted rounded-lg">
                      <Checkbox
                        id="contact-provider"
                        checked={contactProvider}
                        onCheckedChange={(checked) => setContactProvider(checked as boolean)}
                      />
                      <div className="space-y-1">
                        <Label htmlFor="contact-provider" className="cursor-pointer">
                          I would like my provider to contact me about this event
                        </Label>
                        <p className="text-xs text-muted-foreground">
                          Your provider will reach out within 24 hours to discuss your symptoms
                        </p>
                      </div>
                    </div>

                    {/* Submit */}
                    <div className="flex justify-end gap-3 pt-4">
                      <Button type="button" variant="outline" onClick={() => router.back()}>
                        Cancel
                      </Button>
                      <Button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? "Submitting..." : "Submit Report"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </form>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Important Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-sm">
                  <div className="p-3 bg-red-50 rounded-lg border border-red-200">
                    <p className="font-medium text-red-800">Emergency?</p>
                    <p className="text-red-700 mt-1">
                      If you're experiencing a medical emergency, call 911 or go to your nearest emergency room immediately.
                    </p>
                  </div>
                  <div>
                    <p className="font-medium">Why report adverse events?</p>
                    <ul className="mt-2 space-y-1 text-muted-foreground list-disc list-inside">
                      <li>Helps ensure your safety</li>
                      <li>Allows your provider to adjust treatment</li>
                      <li>Contributes to research data</li>
                      <li>Helps other patients</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-medium">What happens next?</p>
                    <p className="text-muted-foreground mt-1">
                      Your report will be reviewed by your care team. If you requested contact, expect a call within 24 hours.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Your Active Treatments</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {activePeptides.map(peptide => (
                    <div key={peptide.id} className="p-3 border rounded-lg">
                      <p className="font-medium">{peptide.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {peptide.dose} - {peptide.frequency}
                      </p>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Need Immediate Help?</CardTitle>
                </CardHeader>
                <CardContent>
                  <Link href="/patient/emergency">
                    <Button variant="outline" className="w-full">
                      <Phone className="w-4 h-4 mr-2" />
                      Contact Provider Now
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  )
}
