"use client"

export const dynamic = 'force-dynamic'

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  User,
  Heart,
  FileText,
  CreditCard,
  CheckCircle,
  ChevronRight,
  ChevronLeft,
  Plus,
  X,
  AlertCircle,
} from "lucide-react"
import { SignaturePad } from "@/components/signature-pad"
import { toast } from "sonner"

const steps = [
  { id: 1, name: "Personal Info", icon: User },
  { id: 2, name: "Medical History", icon: Heart },
  { id: 3, name: "Consent Forms", icon: FileText },
  { id: 4, name: "Payment Setup", icon: CreditCard },
  { id: 5, name: "Complete", icon: CheckCircle },
]

const commonConditions = [
  "Diabetes",
  "Hypertension",
  "Heart Disease",
  "Thyroid Disorder",
  "Autoimmune Disease",
  "Cancer (Current/History)",
  "Liver Disease",
  "Kidney Disease",
  "Respiratory Conditions",
  "Mental Health Conditions",
]

const commonAllergies = [
  "Penicillin",
  "Sulfa Drugs",
  "NSAIDs",
  "Latex",
  "Shellfish",
  "Eggs",
  "Soy",
  "None",
]

export default function PatientOnboardingPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)

  // Step 1: Personal Info
  const [personalInfo, setPersonalInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dob: "",
    gender: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    emergencyName: "",
    emergencyPhone: "",
    emergencyRelation: "",
  })

  // Step 2: Medical History
  const [medicalHistory, setMedicalHistory] = useState({
    conditions: [] as string[],
    otherConditions: "",
    currentMedications: [] as { name: string; dose: string; frequency: string }[],
    allergies: [] as string[],
    otherAllergies: "",
    previousPeptides: "",
    primaryGoals: "",
    currentSymptoms: "",
  })

  const [newMedication, setNewMedication] = useState({ name: "", dose: "", frequency: "" })

  // Step 3: Consent
  const [consent, setConsent] = useState({
    informedConsent: false,
    ruoAcknowledgment: false,
    hipaaConsent: false,
    telehealthConsent: false,
    signature: null as string | null,
    printedName: "",
    consentDate: new Date().toLocaleDateString(),
  })

  // Step 4: Payment
  const [payment, setPayment] = useState({
    cardNumber: "",
    expiry: "",
    cvv: "",
    cardName: "",
    billingAddress: "same",
    billingStreet: "",
    billingCity: "",
    billingState: "",
    billingZip: "",
  })

  const progress = (currentStep / steps.length) * 100

  const handleAddMedication = () => {
    if (newMedication.name) {
      setMedicalHistory({
        ...medicalHistory,
        currentMedications: [...medicalHistory.currentMedications, newMedication],
      })
      setNewMedication({ name: "", dose: "", frequency: "" })
    }
  }

  const handleRemoveMedication = (index: number) => {
    setMedicalHistory({
      ...medicalHistory,
      currentMedications: medicalHistory.currentMedications.filter((_, i) => i !== index),
    })
  }

  const toggleCondition = (condition: string) => {
    setMedicalHistory({
      ...medicalHistory,
      conditions: medicalHistory.conditions.includes(condition)
        ? medicalHistory.conditions.filter((c) => c !== condition)
        : [...medicalHistory.conditions, condition],
    })
  }

  const toggleAllergy = (allergy: string) => {
    setMedicalHistory({
      ...medicalHistory,
      allergies: medicalHistory.allergies.includes(allergy)
        ? medicalHistory.allergies.filter((a) => a !== allergy)
        : [...medicalHistory.allergies, allergy],
    })
  }

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return (
          personalInfo.firstName &&
          personalInfo.lastName &&
          personalInfo.email &&
          personalInfo.phone &&
          personalInfo.dob
        )
      case 2:
        return medicalHistory.primaryGoals
      case 3:
        return (
          consent.informedConsent &&
          consent.ruoAcknowledgment &&
          consent.hipaaConsent &&
          consent.signature &&
          consent.printedName
        )
      case 4:
        return payment.cardNumber && payment.expiry && payment.cvv && payment.cardName
      default:
        return true
    }
  }

  const handleNext = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleComplete = () => {
    toast.success("Welcome to Bridge MDX!", {
      description: "Your account has been set up successfully.",
    })
    router.push("/patient/dashboard")
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
      <div className="container max-w-4xl mx-auto py-8 px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Welcome to Bridge MDX</h1>
          <p className="text-muted-foreground">
            Let&apos;s get you set up. This should only take a few minutes.
          </p>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <Progress value={progress} className="h-2 mb-4" />
          <div className="flex justify-between">
            {steps.map((step) => (
              <div
                key={step.id}
                className={`flex flex-col items-center ${
                  step.id <= currentStep ? "text-primary" : "text-muted-foreground"
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                    step.id < currentStep
                      ? "bg-primary text-primary-foreground"
                      : step.id === currentStep
                      ? "bg-primary/20 text-primary border-2 border-primary"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {step.id < currentStep ? (
                    <CheckCircle className="w-5 h-5" />
                  ) : (
                    <step.icon className="w-5 h-5" />
                  )}
                </div>
                <span className="text-xs hidden sm:block">{step.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <Card>
          <CardHeader>
            <CardTitle>
              {currentStep === 1 && "Personal Information"}
              {currentStep === 2 && "Medical History"}
              {currentStep === 3 && "Consent Forms"}
              {currentStep === 4 && "Payment Setup"}
              {currentStep === 5 && "You're All Set!"}
            </CardTitle>
            <CardDescription>
              {currentStep === 1 && "Tell us about yourself"}
              {currentStep === 2 && "Help us understand your health background"}
              {currentStep === 3 && "Review and sign required consent documents"}
              {currentStep === 4 && "Add a payment method for your orders"}
              {currentStep === 5 && "Your account is ready to use"}
            </CardDescription>
          </CardHeader>

          <CardContent>
            {/* Step 1: Personal Info */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>First Name *</Label>
                    <Input
                      value={personalInfo.firstName}
                      onChange={(e) =>
                        setPersonalInfo({ ...personalInfo, firstName: e.target.value })
                      }
                      placeholder="John"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Last Name *</Label>
                    <Input
                      value={personalInfo.lastName}
                      onChange={(e) =>
                        setPersonalInfo({ ...personalInfo, lastName: e.target.value })
                      }
                      placeholder="Doe"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Email *</Label>
                    <Input
                      type="email"
                      value={personalInfo.email}
                      onChange={(e) =>
                        setPersonalInfo({ ...personalInfo, email: e.target.value })
                      }
                      placeholder="john@example.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Phone *</Label>
                    <Input
                      type="tel"
                      value={personalInfo.phone}
                      onChange={(e) =>
                        setPersonalInfo({ ...personalInfo, phone: e.target.value })
                      }
                      placeholder="(555) 123-4567"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Date of Birth *</Label>
                    <Input
                      type="date"
                      value={personalInfo.dob}
                      onChange={(e) =>
                        setPersonalInfo({ ...personalInfo, dob: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Gender</Label>
                    <Select
                      value={personalInfo.gender}
                      onValueChange={(v) => setPersonalInfo({ ...personalInfo, gender: v })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                        <SelectItem value="prefer-not">Prefer not to say</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <Label>Address</Label>
                  <Input
                    value={personalInfo.address}
                    onChange={(e) =>
                      setPersonalInfo({ ...personalInfo, address: e.target.value })
                    }
                    placeholder="123 Main St"
                  />
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label>City</Label>
                    <Input
                      value={personalInfo.city}
                      onChange={(e) =>
                        setPersonalInfo({ ...personalInfo, city: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>State</Label>
                    <Input
                      value={personalInfo.state}
                      onChange={(e) =>
                        setPersonalInfo({ ...personalInfo, state: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>ZIP Code</Label>
                    <Input
                      value={personalInfo.zip}
                      onChange={(e) =>
                        setPersonalInfo({ ...personalInfo, zip: e.target.value })
                      }
                    />
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="font-medium mb-3">Emergency Contact</h3>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label>Name</Label>
                      <Input
                        value={personalInfo.emergencyName}
                        onChange={(e) =>
                          setPersonalInfo({ ...personalInfo, emergencyName: e.target.value })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Phone</Label>
                      <Input
                        value={personalInfo.emergencyPhone}
                        onChange={(e) =>
                          setPersonalInfo({ ...personalInfo, emergencyPhone: e.target.value })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Relationship</Label>
                      <Input
                        value={personalInfo.emergencyRelation}
                        onChange={(e) =>
                          setPersonalInfo({ ...personalInfo, emergencyRelation: e.target.value })
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Medical History */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium mb-3">Do you have any of these conditions?</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {commonConditions.map((condition) => (
                      <div key={condition} className="flex items-center space-x-2">
                        <Checkbox
                          id={condition}
                          checked={medicalHistory.conditions.includes(condition)}
                          onCheckedChange={() => toggleCondition(condition)}
                        />
                        <Label htmlFor={condition} className="text-sm">
                          {condition}
                        </Label>
                      </div>
                    ))}
                  </div>
                  <div className="mt-3">
                    <Label>Other conditions</Label>
                    <Input
                      value={medicalHistory.otherConditions}
                      onChange={(e) =>
                        setMedicalHistory({ ...medicalHistory, otherConditions: e.target.value })
                      }
                      placeholder="List any other conditions..."
                    />
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="font-medium mb-3">Current Medications</h3>
                  {medicalHistory.currentMedications.length > 0 && (
                    <div className="space-y-2 mb-4">
                      {medicalHistory.currentMedications.map((med, idx) => (
                        <div
                          key={idx}
                          className="flex items-center justify-between p-2 bg-muted rounded-lg"
                        >
                          <span className="text-sm">
                            {med.name} - {med.dose} - {med.frequency}
                          </span>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6"
                            onClick={() => handleRemoveMedication(idx)}
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                  <div className="grid grid-cols-4 gap-2">
                    <Input
                      placeholder="Medication name"
                      value={newMedication.name}
                      onChange={(e) =>
                        setNewMedication({ ...newMedication, name: e.target.value })
                      }
                    />
                    <Input
                      placeholder="Dose"
                      value={newMedication.dose}
                      onChange={(e) =>
                        setNewMedication({ ...newMedication, dose: e.target.value })
                      }
                    />
                    <Input
                      placeholder="Frequency"
                      value={newMedication.frequency}
                      onChange={(e) =>
                        setNewMedication({ ...newMedication, frequency: e.target.value })
                      }
                    />
                    <Button variant="outline" onClick={handleAddMedication}>
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="font-medium mb-3">Allergies</h3>
                  <div className="grid grid-cols-4 gap-2">
                    {commonAllergies.map((allergy) => (
                      <div key={allergy} className="flex items-center space-x-2">
                        <Checkbox
                          id={allergy}
                          checked={medicalHistory.allergies.includes(allergy)}
                          onCheckedChange={() => toggleAllergy(allergy)}
                        />
                        <Label htmlFor={allergy} className="text-sm">
                          {allergy}
                        </Label>
                      </div>
                    ))}
                  </div>
                  <div className="mt-3">
                    <Input
                      value={medicalHistory.otherAllergies}
                      onChange={(e) =>
                        setMedicalHistory({ ...medicalHistory, otherAllergies: e.target.value })
                      }
                      placeholder="Other allergies..."
                    />
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Have you used peptide therapy before?</Label>
                    <Textarea
                      value={medicalHistory.previousPeptides}
                      onChange={(e) =>
                        setMedicalHistory({ ...medicalHistory, previousPeptides: e.target.value })
                      }
                      placeholder="If yes, please describe which peptides and your experience..."
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>What are your primary health goals? *</Label>
                    <Textarea
                      value={medicalHistory.primaryGoals}
                      onChange={(e) =>
                        setMedicalHistory({ ...medicalHistory, primaryGoals: e.target.value })
                      }
                      placeholder="Describe what you hope to achieve with peptide therapy..."
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Current symptoms or concerns</Label>
                    <Textarea
                      value={medicalHistory.currentSymptoms}
                      onChange={(e) =>
                        setMedicalHistory({ ...medicalHistory, currentSymptoms: e.target.value })
                      }
                      placeholder="Describe any symptoms you're currently experiencing..."
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Consent Forms */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
                  <div className="flex gap-2">
                    <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0" />
                    <p className="text-sm text-amber-800">
                      Please read each consent document carefully. Your electronic signature is
                      legally binding under the ESIGN Act.
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="border rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <Checkbox
                        id="informed-consent"
                        checked={consent.informedConsent}
                        onCheckedChange={(checked) =>
                          setConsent({ ...consent, informedConsent: checked as boolean })
                        }
                      />
                      <div>
                        <Label htmlFor="informed-consent" className="font-medium">
                          Informed Consent for Peptide Therapy *
                        </Label>
                        <p className="text-sm text-muted-foreground mt-1">
                          I understand that peptide therapy involves the use of compounds that may
                          have varying levels of clinical evidence. I have been informed of the
                          potential benefits, risks, and alternatives to this treatment.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="border rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <Checkbox
                        id="ruo-consent"
                        checked={consent.ruoAcknowledgment}
                        onCheckedChange={(checked) =>
                          setConsent({ ...consent, ruoAcknowledgment: checked as boolean })
                        }
                      />
                      <div>
                        <Label htmlFor="ruo-consent" className="font-medium">
                          Research Use Only (RUO) Acknowledgment *
                        </Label>
                        <p className="text-sm text-muted-foreground mt-1">
                          I understand that some products are designated as Research Use Only and
                          have not been approved by the FDA for diagnostic or therapeutic use. My
                          provider has determined these may be appropriate based on clinical
                          judgment.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="border rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <Checkbox
                        id="hipaa-consent"
                        checked={consent.hipaaConsent}
                        onCheckedChange={(checked) =>
                          setConsent({ ...consent, hipaaConsent: checked as boolean })
                        }
                      />
                      <div>
                        <Label htmlFor="hipaa-consent" className="font-medium">
                          HIPAA Authorization *
                        </Label>
                        <p className="text-sm text-muted-foreground mt-1">
                          I authorize Bridge MDX and my healthcare providers to use and disclose
                          my protected health information for treatment, payment, and healthcare
                          operations as described in the Notice of Privacy Practices.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="border rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <Checkbox
                        id="telehealth-consent"
                        checked={consent.telehealthConsent}
                        onCheckedChange={(checked) =>
                          setConsent({ ...consent, telehealthConsent: checked as boolean })
                        }
                      />
                      <div>
                        <Label htmlFor="telehealth-consent" className="font-medium">
                          Telehealth Consent (Optional)
                        </Label>
                        <p className="text-sm text-muted-foreground mt-1">
                          I consent to receive healthcare services via telehealth technology and
                          understand the benefits, risks, and limitations of virtual care.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Printed Name *</Label>
                      <Input
                        value={consent.printedName}
                        onChange={(e) =>
                          setConsent({ ...consent, printedName: e.target.value })
                        }
                        placeholder="Your full legal name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Date</Label>
                      <Input value={consent.consentDate} disabled />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Signature *</Label>
                    <SignaturePad
                      onSignatureChange={(sig) => setConsent({ ...consent, signature: sig })}
                      width={600}
                      height={150}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Payment Setup */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-sm text-blue-800">
                    Your payment information is encrypted and stored securely. You will only be
                    charged when you place an order.
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Card Number *</Label>
                    <Input
                      value={payment.cardNumber}
                      onChange={(e) =>
                        setPayment({ ...payment, cardNumber: e.target.value })
                      }
                      placeholder="1234 5678 9012 3456"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Expiry Date *</Label>
                      <Input
                        value={payment.expiry}
                        onChange={(e) => setPayment({ ...payment, expiry: e.target.value })}
                        placeholder="MM/YY"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>CVV *</Label>
                      <Input
                        value={payment.cvv}
                        onChange={(e) => setPayment({ ...payment, cvv: e.target.value })}
                        placeholder="123"
                        type="password"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Name on Card *</Label>
                    <Input
                      value={payment.cardName}
                      onChange={(e) => setPayment({ ...payment, cardName: e.target.value })}
                      placeholder="John Doe"
                    />
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <Label>Billing Address</Label>
                  <RadioGroup
                    value={payment.billingAddress}
                    onValueChange={(v) => setPayment({ ...payment, billingAddress: v })}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="same" id="same" />
                      <Label htmlFor="same">Same as home address</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="different" id="different" />
                      <Label htmlFor="different">Use a different address</Label>
                    </div>
                  </RadioGroup>

                  {payment.billingAddress === "different" && (
                    <div className="space-y-4 pl-6">
                      <Input
                        value={payment.billingStreet}
                        onChange={(e) =>
                          setPayment({ ...payment, billingStreet: e.target.value })
                        }
                        placeholder="Street address"
                      />
                      <div className="grid grid-cols-3 gap-4">
                        <Input
                          value={payment.billingCity}
                          onChange={(e) =>
                            setPayment({ ...payment, billingCity: e.target.value })
                          }
                          placeholder="City"
                        />
                        <Input
                          value={payment.billingState}
                          onChange={(e) =>
                            setPayment({ ...payment, billingState: e.target.value })
                          }
                          placeholder="State"
                        />
                        <Input
                          value={payment.billingZip}
                          onChange={(e) =>
                            setPayment({ ...payment, billingZip: e.target.value })
                          }
                          placeholder="ZIP"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Step 5: Complete */}
            {currentStep === 5 && (
              <div className="text-center py-8">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-10 h-10 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold mb-2">Welcome, {personalInfo.firstName}!</h3>
                <p className="text-muted-foreground mb-6">
                  Your account has been created successfully. You&apos;re now ready to start your
                  peptide therapy journey.
                </p>

                <div className="grid grid-cols-2 gap-4 max-w-md mx-auto text-left mb-8">
                  <div className="p-4 bg-muted rounded-lg">
                    <p className="font-medium">Next Steps</p>
                    <ul className="text-sm text-muted-foreground mt-2 space-y-1">
                      <li>" Schedule your initial consultation</li>
                      <li>" Upload recent lab results</li>
                      <li>" Browse the peptide catalog</li>
                    </ul>
                  </div>
                  <div className="p-4 bg-muted rounded-lg">
                    <p className="font-medium">Your Provider</p>
                    <p className="text-sm text-muted-foreground mt-2">
                      A provider will be assigned to you shortly. You&apos;ll receive a message when
                      they&apos;re ready to connect.
                    </p>
                  </div>
                </div>

                <Button size="lg" onClick={handleComplete}>
                  Go to Dashboard
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            )}
          </CardContent>

          {/* Navigation */}
          {currentStep < 5 && (
            <div className="flex items-center justify-between p-6 border-t">
              <Button
                variant="outline"
                onClick={handleBack}
                disabled={currentStep === 1}
                className="bg-transparent"
              >
                <ChevronLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <Button onClick={handleNext} disabled={!canProceed()}>
                {currentStep === 4 ? "Complete Setup" : "Continue"}
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          )}
        </Card>
      </div>
    </div>
  )
}
