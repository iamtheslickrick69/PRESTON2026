"use client"

export const dynamic = 'force-dynamic'

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ProtectedRoute } from "@/components/protected-route"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Activity, Calendar, ShoppingCart, ArrowLeft, BookOpen } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function NewPatientPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))
    alert("Patient portal created successfully!")
    router.push("/provider/patients")
  }

  return (
    <ProtectedRoute allowedRoles={["provider", "clinic_admin"]}>
      <DashboardLayout>
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <Link href="/provider/patients">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="w-4 h-4" />
              </Button>
            </Link>
            <div>
              <h2 className="text-3xl font-bold tracking-tight">Create Patient Portal</h2>
              <p className="text-muted-foreground">Set up a new patient account and medical record</p>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <Tabs defaultValue="demographics" className="space-y-4">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="demographics">Demographics</TabsTrigger>
                <TabsTrigger value="medical">Medical History</TabsTrigger>
                <TabsTrigger value="medications">Medications</TabsTrigger>
                <TabsTrigger value="emergency">Emergency</TabsTrigger>
                <TabsTrigger value="consent">Consent</TabsTrigger>
              </TabsList>

              <TabsContent value="demographics" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Personal Information</CardTitle>
                    <CardDescription>Basic patient demographics</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name *</Label>
                        <Input id="firstName" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name *</Label>
                        <Input id="lastName" required />
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="dob">Date of Birth *</Label>
                        <Input id="dob" type="date" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="gender">Gender *</Label>
                        <Select required>
                          <SelectTrigger>
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="male">Male</SelectItem>
                            <SelectItem value="female">Female</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="ssn">SSN (Last 4)</Label>
                        <Input id="ssn" placeholder="1234" maxLength={4} />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="address">Street Address *</Label>
                      <Input id="address" required />
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="city">City *</Label>
                        <Input id="city" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="state">State *</Label>
                        <Input id="state" placeholder="CA" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="zip">ZIP Code *</Label>
                        <Input id="zip" required />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone *</Label>
                        <Input id="phone" type="tel" placeholder="(555) 123-4567" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email *</Label>
                        <Input id="email" type="email" required />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="medical" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Medical History</CardTitle>
                    <CardDescription>Patient&apos;s medical background and conditions</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="conditions">Current Medical Conditions</Label>
                      <Textarea
                        id="conditions"
                        placeholder="List any chronic conditions, diagnoses, or ongoing health issues..."
                        rows={4}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="surgeries">Past Surgeries</Label>
                      <Textarea id="surgeries" placeholder="List any previous surgeries and dates..." rows={3} />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="familyHistory">Family Medical History</Label>
                      <Textarea
                        id="familyHistory"
                        placeholder="Notable family medical history (heart disease, diabetes, cancer, etc.)..."
                        rows={3}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="height">Height</Label>
                        <Input id="height" placeholder="5'10&quot;" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="weight">Weight (lbs)</Label>
                        <Input id="weight" type="number" placeholder="180" />
                      </div>
                    </div>

                    <div className="space-y-3">
                      <Label>Lifestyle Factors</Label>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="smoker" />
                        <label htmlFor="smoker" className="text-sm font-medium">
                          Smoker
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="alcohol" />
                        <label htmlFor="alcohol" className="text-sm font-medium">
                          Regular Alcohol Use
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="exercise" />
                        <label htmlFor="exercise" className="text-sm font-medium">
                          Regular Exercise
                        </label>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="medications" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Current Medications</CardTitle>
                    <CardDescription>All medications the patient is currently taking</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="medications">Current Medications</Label>
                      <Textarea
                        id="medications"
                        placeholder="List all current medications, dosages, and frequency..."
                        rows={4}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="supplements">Supplements & Vitamins</Label>
                      <Textarea
                        id="supplements"
                        placeholder="List any supplements, vitamins, or OTC medications..."
                        rows={3}
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Allergies</CardTitle>
                    <CardDescription>Drug allergies and reactions</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="drugAllergies">Drug Allergies</Label>
                      <Textarea
                        id="drugAllergies"
                        placeholder="List any known drug allergies and reactions..."
                        rows={3}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="otherAllergies">Other Allergies</Label>
                      <Textarea
                        id="otherAllergies"
                        placeholder="Food allergies, environmental allergies, etc..."
                        rows={3}
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="emergency" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Emergency Contact</CardTitle>
                    <CardDescription>Primary emergency contact information</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="emergencyName">Contact Name *</Label>
                      <Input id="emergencyName" required />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="emergencyRelationship">Relationship *</Label>
                      <Input id="emergencyRelationship" placeholder="Spouse, Parent, Sibling, etc." required />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="emergencyPhone">Phone *</Label>
                        <Input id="emergencyPhone" type="tel" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="emergencyEmail">Email</Label>
                        <Input id="emergencyEmail" type="email" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Insurance Information</CardTitle>
                    <CardDescription>Health insurance details (optional)</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="insuranceProvider">Insurance Provider</Label>
                      <Input id="insuranceProvider" placeholder="e.g., Blue Cross Blue Shield" />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="policyNumber">Policy Number</Label>
                        <Input id="policyNumber" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="groupNumber">Group Number</Label>
                        <Input id="groupNumber" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="consent" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Consent & Agreements</CardTitle>
                    <CardDescription>Required consent forms and disclosures</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="p-4 border rounded-lg space-y-3">
                        <h4 className="font-semibold">HIPAA Privacy Notice</h4>
                        <p className="text-sm text-muted-foreground">
                          I acknowledge that I have received and reviewed the clinic&apos;s HIPAA Privacy Notice
                          explaining how my health information may be used and disclosed.
                        </p>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="hipaa" required />
                          <label htmlFor="hipaa" className="text-sm font-medium">
                            I agree to the HIPAA Privacy Notice *
                          </label>
                        </div>
                      </div>

                      <div className="p-4 border rounded-lg space-y-3">
                        <h4 className="font-semibold">Research Use Only (RUO) Disclosure</h4>
                        <p className="text-sm text-muted-foreground">
                          I understand that peptides prescribed through this clinic are for Research Use Only (RUO) and
                          are not FDA-approved for human consumption. I acknowledge the risks and agree to use these
                          products under medical supervision.
                        </p>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="ruo" required />
                          <label htmlFor="ruo" className="text-sm font-medium">
                            I acknowledge the RUO disclosure *
                          </label>
                        </div>
                      </div>

                      <div className="p-4 border rounded-lg space-y-3">
                        <h4 className="font-semibold">Treatment Consent</h4>
                        <p className="text-sm text-muted-foreground">
                          I consent to receive peptide therapy treatment and understand the potential risks, benefits,
                          and alternatives. I agree to follow the prescribed treatment plan and report any adverse
                          effects.
                        </p>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="treatment" required />
                          <label htmlFor="treatment" className="text-sm font-medium">
                            I consent to treatment *
                          </label>
                        </div>
                      </div>

                      <div className="p-4 border rounded-lg space-y-3">
                        <h4 className="font-semibold">Financial Responsibility</h4>
                        <p className="text-sm text-muted-foreground">
                          I understand that I am financially responsible for all charges related to my care, including
                          peptide purchases through the integrated shopping portal.
                        </p>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="financial" required />
                          <label htmlFor="financial" className="text-sm font-medium">
                            I accept financial responsibility *
                          </label>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="signature">Patient Signature (Type Full Name) *</Label>
                      <Input id="signature" placeholder="Type your full legal name" required />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="signatureDate">Date *</Label>
                      <Input id="signatureDate" type="date" required />
                    </div>
                  </CardContent>
                </Card>

                <div className="flex gap-4">
                  <Link href="/provider/patients" className="flex-1">
                    <Button type="button" variant="outline" className="w-full bg-transparent">
                      Cancel
                    </Button>
                  </Link>
                  <Button type="submit" className="flex-1" disabled={isLoading}>
                    {isLoading ? "Creating Portal..." : "Create Patient Portal"}
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </form>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  )
}
