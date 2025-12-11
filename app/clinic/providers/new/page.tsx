"use client"

export const dynamic = 'force-dynamic'

import type React from "react"

import { ProtectedRoute } from "@/components/protected-route"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Building2, Users, UserCog, Activity, DollarSign, TrendingUp, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function NewProviderPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [providerType, setProviderType] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    alert("Provider added successfully!")
    router.push("/clinic/providers")
  }

  return (
    <ProtectedRoute allowedRoles={["clinic_admin"]}>
      <DashboardLayout>
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <Link href="/clinic/providers">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="w-4 h-4" />
              </Button>
            </Link>
            <div>
              <h2 className="text-3xl font-bold tracking-tight">Add New Provider</h2>
              <p className="text-muted-foreground">Invite a new healthcare provider to your clinic</p>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="grid gap-6 lg:grid-cols-3">
              {/* Main Form */}
              <div className="lg:col-span-2 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Personal Information</CardTitle>
                    <CardDescription>Basic details about the provider</CardDescription>
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

                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <Input id="email" type="email" placeholder="provider@clinic.com" required />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone *</Label>
                      <Input id="phone" type="tel" placeholder="(555) 123-4567" required />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="providerType">Provider Type *</Label>
                      <Select value={providerType} onValueChange={setProviderType} required>
                        <SelectTrigger>
                          <SelectValue placeholder="Select provider type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="nurse_practitioner">Nurse Practitioner (NP)</SelectItem>
                          <SelectItem value="physician_assistant">Physician Assistant (PA)</SelectItem>
                          <SelectItem value="chiropractor">Chiropractor</SelectItem>
                          <SelectItem value="medical_assistant">Medical Assistant</SelectItem>
                          <SelectItem value="physician">Physician (MD/DO)</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Credentials & Licensing</CardTitle>
                    <CardDescription>Professional qualifications</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="licenseNumber">License Number</Label>
                      <Input id="licenseNumber" placeholder="e.g., NP123456" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="licenseState">License State</Label>
                      <Input id="licenseState" placeholder="e.g., CA" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="deaNumber">DEA Number (if applicable)</Label>
                      <Input id="deaNumber" placeholder="Optional" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="npiNumber">NPI Number</Label>
                      <Input id="npiNumber" placeholder="10-digit National Provider Identifier" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Permissions Sidebar */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Access Permissions</CardTitle>
                    <CardDescription>Define what this provider can access</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="viewPatients" defaultChecked />
                      <label
                        htmlFor="viewPatients"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        View Patients
                      </label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox id="createPatients" defaultChecked />
                      <label
                        htmlFor="createPatients"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Create Patient Portals
                      </label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox id="editRecords" defaultChecked />
                      <label
                        htmlFor="editRecords"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Edit Medical Records
                      </label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox id="prescribePeptides" defaultChecked />
                      <label
                        htmlFor="prescribePeptides"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Prescribe Peptides
                      </label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox id="viewAnalytics" />
                      <label
                        htmlFor="viewAnalytics"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        View Analytics
                      </label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox id="manageBilling" />
                      <label
                        htmlFor="manageBilling"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Manage Billing
                      </label>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Account Setup</CardTitle>
                    <CardDescription>Login credentials</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="bg-muted p-3 rounded-lg text-sm">
                      <p className="text-muted-foreground">
                        An invitation email will be sent to the provider with instructions to set up their password.
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <div className="flex gap-4">
                  <Link href="/clinic/providers" className="flex-1">
                    <Button type="button" variant="outline" className="w-full bg-transparent">
                      Cancel
                    </Button>
                  </Link>
                  <Button type="submit" className="flex-1" disabled={isLoading}>
                    {isLoading ? "Adding..." : "Add Provider"}
                  </Button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  )
}
