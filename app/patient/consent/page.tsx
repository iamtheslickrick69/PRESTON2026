"use client"

export const dynamic = 'force-dynamic'

import { useState } from "react"
import { ProtectedRoute } from "@/components/protected-route"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
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
  CheckCircle,
  Clock,
  AlertTriangle,
  Download,
  Eye,
  PenLine,
} from "lucide-react"
import { SignaturePad } from "@/components/signature-pad"
import { toast } from "sonner"

const consentForms = [
  {
    id: "informed-consent",
    name: "Informed Consent for Peptide Therapy",
    description: "General consent for peptide therapy treatment",
    status: "signed",
    signedDate: "2024-01-15",
    expiresDate: "2025-01-15",
    required: true,
  },
  {
    id: "ruo-consent",
    name: "Research Use Only (RUO) Acknowledgment",
    description: "Acknowledgment of RUO product status and limitations",
    status: "signed",
    signedDate: "2024-01-15",
    expiresDate: "2025-01-15",
    required: true,
  },
  {
    id: "telehealth-consent",
    name: "Telehealth Consent",
    description: "Consent for telehealth/telemedicine services",
    status: "pending",
    signedDate: null,
    expiresDate: null,
    required: true,
  },
  {
    id: "hipaa-consent",
    name: "HIPAA Authorization",
    description: "Authorization for use and disclosure of health information",
    status: "signed",
    signedDate: "2024-01-15",
    expiresDate: null,
    required: true,
  },
  {
    id: "financial-consent",
    name: "Financial Agreement",
    description: "Agreement for payment terms and pricing",
    status: "pending",
    signedDate: null,
    expiresDate: null,
    required: false,
  },
]

const telehealthConsentContent = `TELEHEALTH INFORMED CONSENT

I understand and agree to the following regarding telehealth services:

1. NATURE OF TELEHEALTH
Telehealth involves the use of electronic communications to enable healthcare providers to deliver services remotely. This may include consultation, diagnosis, treatment planning, and health education.

2. BENEFITS AND RISKS
Benefits include improved access to care, convenience, and reduced travel time. Risks include potential technology failures, privacy concerns, and limitations in physical examination.

3. CONFIDENTIALITY
All communications will be encrypted and stored securely in compliance with HIPAA regulations. However, no electronic transmission is entirely secure.

4. RIGHTS
I have the right to:
- Withdraw consent at any time
- Request an in-person visit
- Access my telehealth records
- Report any concerns about privacy or quality of care

5. TECHNICAL REQUIREMENTS
I am responsible for having appropriate technology and internet connection. I agree to be in a private location during telehealth visits.

6. EMERGENCY PROTOCOLS
In case of emergency, I will contact 911 or go to the nearest emergency room. Telehealth is not intended for emergency situations.

7. FOLLOW-UP CARE
I understand that some conditions may require in-person follow-up care, and I agree to comply with such recommendations.

By signing below, I acknowledge that I have read and understand this consent form, and I voluntarily agree to receive telehealth services.`

const ruoConsentContent = `RESEARCH USE ONLY (RUO) PRODUCT ACKNOWLEDGMENT

I acknowledge and understand the following regarding Research Use Only (RUO) products:

1. REGULATORY STATUS
The peptides I am receiving are designated as Research Use Only (RUO) products. They have not been approved by the FDA for diagnostic or therapeutic use in humans.

2. OFF-LABEL USE
My healthcare provider has determined, based on clinical judgment and available research, that these products may be appropriate for my specific condition.

3. RISKS AND BENEFITS
I understand that:
- These products are being used outside their intended research purpose
- The safety and efficacy data may be limited
- There may be unknown risks associated with their use
- Potential benefits have been explained to me by my provider

4. INFORMED DECISION
I have been given the opportunity to:
- Ask questions about the products
- Review available research and information
- Discuss alternative treatments
- Take time to consider my decision

5. VOLUNTARY PARTICIPATION
My decision to use RUO products is voluntary. I may discontinue use at any time without affecting my ongoing care.

6. REPORTING REQUIREMENTS
I agree to:
- Report any adverse effects immediately
- Attend scheduled follow-up appointments
- Complete any requested monitoring tests
- Inform my provider of any changes in my condition

7. FINANCIAL RESPONSIBILITY
I understand that RUO products may not be covered by insurance and I accept financial responsibility for their cost.

By signing below, I acknowledge that I have read, understood, and voluntarily agree to the terms outlined above.`

export default function PatientConsentPage() {
  const [activeTab, setActiveTab] = useState("pending")
  const [showSignDialog, setShowSignDialog] = useState(false)
  const [selectedForm, setSelectedForm] = useState<typeof consentForms[0] | null>(null)
  const [signature, setSignature] = useState<string | null>(null)
  const [printedName, setPrintedName] = useState("")
  const [agreedToTerms, setAgreedToTerms] = useState(false)
  const [consentDate] = useState(new Date().toLocaleDateString())

  const pendingForms = consentForms.filter(f => f.status === "pending")
  const signedForms = consentForms.filter(f => f.status === "signed")

  const handleOpenSignDialog = (form: typeof consentForms[0]) => {
    setSelectedForm(form)
    setShowSignDialog(true)
    setSignature(null)
    setPrintedName("")
    setAgreedToTerms(false)
  }

  const handleSign = () => {
    if (!signature || !printedName || !agreedToTerms) {
      toast.error("Please complete all required fields")
      return
    }

    toast.success("Consent form signed successfully!", {
      description: `${selectedForm?.name} has been signed and recorded.`,
    })
    setShowSignDialog(false)
    setSelectedForm(null)
    setSignature(null)
    setPrintedName("")
    setAgreedToTerms(false)
  }

  const getConsentContent = (formId: string) => {
    switch (formId) {
      case "telehealth-consent":
        return telehealthConsentContent
      case "ruo-consent":
        return ruoConsentContent
      default:
        return "Consent form content will be displayed here."
    }
  }

  return (
    <ProtectedRoute allowedRoles={["patient"]}>
      <DashboardLayout>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">Consent Forms</h2>
              <p className="text-muted-foreground">Review and sign required consent documents</p>
            </div>
            {pendingForms.length > 0 && (
              <Badge variant="destructive" className="text-sm">
                {pendingForms.length} form{pendingForms.length > 1 ? "s" : ""} require signature
              </Badge>
            )}
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="pending" className="relative">
                Pending
                {pendingForms.length > 0 && (
                  <span className="ml-2 rounded-full bg-destructive px-2 py-0.5 text-xs text-destructive-foreground">
                    {pendingForms.length}
                  </span>
                )}
              </TabsTrigger>
              <TabsTrigger value="signed">Signed</TabsTrigger>
            </TabsList>

            <TabsContent value="pending" className="space-y-4">
              {pendingForms.length === 0 ? (
                <Card>
                  <CardContent className="flex flex-col items-center justify-center py-12">
                    <CheckCircle className="w-12 h-12 text-green-500 mb-4" />
                    <h3 className="text-lg font-semibold mb-2">All Forms Signed</h3>
                    <p className="text-muted-foreground text-center">
                      You have no pending consent forms at this time.
                    </p>
                  </CardContent>
                </Card>
              ) : (
                pendingForms.map((form) => (
                  <Card key={form.id} className="border-amber-200">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center">
                            <AlertTriangle className="w-6 h-6 text-amber-600" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="font-semibold text-lg">{form.name}</h3>
                              {form.required && (
                                <Badge variant="destructive">Required</Badge>
                              )}
                            </div>
                            <p className="text-muted-foreground">{form.description}</p>
                            <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
                              <Clock className="w-4 h-4" />
                              <span>Awaiting your signature</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            className="bg-transparent"
                            onClick={() => handleOpenSignDialog(form)}
                          >
                            <Eye className="w-4 h-4 mr-2" />
                            Review
                          </Button>
                          <Button onClick={() => handleOpenSignDialog(form)}>
                            <PenLine className="w-4 h-4 mr-2" />
                            Sign Now
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </TabsContent>

            <TabsContent value="signed" className="space-y-4">
              {signedForms.map((form) => (
                <Card key={form.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                          <CheckCircle className="w-6 h-6 text-green-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg">{form.name}</h3>
                          <p className="text-muted-foreground">{form.description}</p>
                          <div className="flex items-center gap-4 mt-2 text-sm">
                            <span className="text-muted-foreground">
                              Signed: {form.signedDate}
                            </span>
                            {form.expiresDate && (
                              <span className="text-muted-foreground">
                                Expires: {form.expiresDate}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" className="bg-transparent">
                          <Eye className="w-4 h-4 mr-2" />
                          View
                        </Button>
                        <Button variant="outline" className="bg-transparent">
                          <Download className="w-4 h-4 mr-2" />
                          Download
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
          </Tabs>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium">About Consent Forms</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-muted-foreground">
                <p>
                  Consent forms are legal documents that protect both you and your healthcare providers.
                  Please read each form carefully before signing.
                </p>
                <p>
                  Your electronic signature has the same legal validity as a handwritten signature
                  under the ESIGN Act and UETA.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium">Need Help?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-muted-foreground">
                <p>
                  If you have questions about any consent form, please contact your care team
                  before signing.
                </p>
                <Button variant="outline" className="w-full bg-transparent mt-2">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Contact Support
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        <Dialog open={showSignDialog} onOpenChange={setShowSignDialog}>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-hidden flex flex-col">
            <DialogHeader>
              <DialogTitle>{selectedForm?.name}</DialogTitle>
              <DialogDescription>
                Please read the document carefully and sign below
              </DialogDescription>
            </DialogHeader>

            <div className="flex-1 overflow-hidden">
              <ScrollArea className="h-64 border rounded-lg p-4 bg-muted/30">
                <pre className="whitespace-pre-wrap text-sm font-sans">
                  {selectedForm && getConsentContent(selectedForm.id)}
                </pre>
              </ScrollArea>
            </div>

            <Separator className="my-4" />

            <div className="space-y-4">
              <div className="flex items-start gap-2">
                <Checkbox
                  id="agree-terms"
                  checked={agreedToTerms}
                  onCheckedChange={(checked) => setAgreedToTerms(checked as boolean)}
                />
                <Label htmlFor="agree-terms" className="text-sm leading-relaxed">
                  I have read and understand the above document. I voluntarily consent to the
                  terms described above and acknowledge that my electronic signature is legally
                  binding.
                </Label>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Printed Name</Label>
                  <Input
                    placeholder="Enter your full legal name"
                    value={printedName}
                    onChange={(e) => setPrintedName(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Date</Label>
                  <Input value={consentDate} disabled />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Signature</Label>
                <SignaturePad
                  onSignatureChange={setSignature}
                  width={600}
                  height={150}
                />
              </div>
            </div>

            <DialogFooter className="mt-4">
              <Button
                variant="outline"
                className="bg-transparent"
                onClick={() => setShowSignDialog(false)}
              >
                Cancel
              </Button>
              <Button
                onClick={handleSign}
                disabled={!signature || !printedName || !agreedToTerms}
              >
                <PenLine className="w-4 h-4 mr-2" />
                Sign Document
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </DashboardLayout>
    </ProtectedRoute>
  )
}
