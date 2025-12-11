"use client"

export const dynamic = 'force-dynamic'

import { ProtectedRoute } from "@/components/protected-route"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Building2, Users, UserCog, Activity, DollarSign, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useState } from "react"

export default function ClinicSettingsPage() {
  const [clinicName, setClinicName] = useState("Advanced Peptide Therapy Clinic")
  const [clinicEmail, setClinicEmail] = useState("info@clinic.com")
  const [clinicPhone, setClinicPhone] = useState("(555) 123-4567")
  const [profitMargin, setProfitMargin] = useState("15")
  const [softwareFee, setSoftwareFee] = useState("5")
  const [shippingFee, setShippingFee] = useState("10")

  const handleSave = () => {
    alert("Settings saved successfully!")
  }

  return (
    <ProtectedRoute allowedRoles={["clinic_admin"]}>
      <DashboardLayout>
        <div className="space-y-6">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Clinic Settings</h2>
            <p className="text-muted-foreground">Manage your clinic information and configuration</p>
          </div>

          <Tabs defaultValue="general" className="space-y-4">
            <TabsList>
              <TabsTrigger value="general">General</TabsTrigger>
              <TabsTrigger value="billing">Billing</TabsTrigger>
              <TabsTrigger value="pricing">Pricing & Margins</TabsTrigger>
            </TabsList>

            {/* General Settings */}
            <TabsContent value="general" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Clinic Information</CardTitle>
                  <CardDescription>Update your clinic's basic information</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="clinicName">Clinic Name</Label>
                    <Input id="clinicName" value={clinicName} onChange={(e) => setClinicName(e.target.value)} />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="clinicEmail">Email</Label>
                      <Input
                        id="clinicEmail"
                        type="email"
                        value={clinicEmail}
                        onChange={(e) => setClinicEmail(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="clinicPhone">Phone</Label>
                      <Input
                        id="clinicPhone"
                        type="tel"
                        value={clinicPhone}
                        onChange={(e) => setClinicPhone(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    <Input id="address" defaultValue="123 Medical Plaza, Los Angeles, CA 90210" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="taxId">Tax ID / EIN</Label>
                    <Input id="taxId" defaultValue="12-3456789" />
                  </div>

                  <Button onClick={handleSave}>Save Changes</Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Billing Settings */}
            <TabsContent value="billing" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Bank Account Information</CardTitle>
                  <CardDescription>Manage your payment receiving account</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="bankName">Bank Name</Label>
                    <Input id="bankName" defaultValue="First National Bank" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="accountNumber">Account Number</Label>
                    <Input id="accountNumber" type="password" defaultValue="1234567890" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="routingNumber">Routing Number</Label>
                    <Input id="routingNumber" defaultValue="123456789" />
                  </div>

                  <Button onClick={handleSave}>Update Billing Info</Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Pricing & Margins */}
            <TabsContent value="pricing" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Profit Margins & Fees</CardTitle>
                  <CardDescription>
                    Configure your clinic's profit margins and software fees for peptide sales
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-muted p-4 rounded-lg mb-4">
                    <p className="text-sm text-muted-foreground">
                      The integrated shopping portal charges patients:{" "}
                      <strong>Peptide Cost + Tax + Shipping + Software Fee</strong>. Your clinic receives the profit
                      margin automatically.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="profitMargin">Clinic Profit Margin (%)</Label>
                    <Input
                      id="profitMargin"
                      type="number"
                      value={profitMargin}
                      onChange={(e) => setProfitMargin(e.target.value)}
                      placeholder="15"
                    />
                    <p className="text-xs text-muted-foreground">
                      Percentage added to peptide cost that goes to your clinic
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="softwareFee">Software Fee (%)</Label>
                    <Input
                      id="softwareFee"
                      type="number"
                      value={softwareFee}
                      onChange={(e) => setSoftwareFee(e.target.value)}
                      placeholder="5"
                    />
                    <p className="text-xs text-muted-foreground">Platform fee for using the EHR system</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="shippingFee">Standard Shipping Fee ($)</Label>
                    <Input
                      id="shippingFee"
                      type="number"
                      value={shippingFee}
                      onChange={(e) => setShippingFee(e.target.value)}
                      placeholder="10"
                    />
                    <p className="text-xs text-muted-foreground">Flat rate shipping charge per order</p>
                  </div>

                  {/* Pricing Example */}
                  <div className="bg-primary/5 border border-primary/20 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">Pricing Example</h4>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span>Peptide Cost:</span>
                        <span>$100.00</span>
                      </div>
                      <div className="flex justify-between text-muted-foreground">
                        <span>Clinic Margin ({profitMargin}%):</span>
                        <span>+${(100 * (Number(profitMargin) / 100)).toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-muted-foreground">
                        <span>Software Fee ({softwareFee}%):</span>
                        <span>+${(100 * (Number(softwareFee) / 100)).toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-muted-foreground">
                        <span>Shipping:</span>
                        <span>+${shippingFee}</span>
                      </div>
                      <div className="flex justify-between text-muted-foreground">
                        <span>Tax (8%):</span>
                        <span>
                          +$
                          {(
                            (100 +
                              100 * (Number(profitMargin) / 100) +
                              100 * (Number(softwareFee) / 100) +
                              Number(shippingFee)) *
                            0.08
                          ).toFixed(2)}
                        </span>
                      </div>
                      <div className="flex justify-between font-bold pt-2 border-t">
                        <span>Patient Pays:</span>
                        <span>
                          $
                          {(
                            100 +
                            100 * (Number(profitMargin) / 100) +
                            100 * (Number(softwareFee) / 100) +
                            Number(shippingFee) +
                            (100 +
                              100 * (Number(profitMargin) / 100) +
                              100 * (Number(softwareFee) / 100) +
                              Number(shippingFee)) *
                              0.08
                          ).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>

                  <Button onClick={handleSave}>Save Pricing Settings</Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  )
}
