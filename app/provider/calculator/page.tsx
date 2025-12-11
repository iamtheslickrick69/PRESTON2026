"use client"

export const dynamic = 'force-dynamic'

import { ProtectedRoute } from "@/components/protected-route"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Activity, Calendar, ShoppingCart, BookOpen, Calculator, FileText, BarChart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { cn } from "@/lib/utils"

const doseOptions = [0.1, 0.25, 0.5, 1, 2, 2.5, 5, 7.5, 10, 12.5, 15, 20]
const strengthOptions = [1, 2, 5, 6, 10, 12, 15, 20, 24, 30, 50, 60]
const waterOptions = [0.5, 1.0, 1.5, 2.0, 2.5, 3.0]

export default function ProviderCalculatorPage() {
  const [selectedDose, setSelectedDose] = useState<number | null>(null)
  const [selectedStrength, setSelectedStrength] = useState<number | null>(null)
  const [selectedWater, setSelectedWater] = useState<number | null>(null)

  const [customDose, setCustomDose] = useState<string>("")
  const [customStrength, setCustomStrength] = useState<string>("")
  const [customWater, setCustomWater] = useState<string>("")

  const activeDose = customDose ? Number.parseFloat(customDose) : selectedDose
  const activeStrength = customStrength ? Number.parseFloat(customStrength) : selectedStrength
  const activeWater = customWater ? Number.parseFloat(customWater) : selectedWater

  const concentration = activeStrength && activeWater ? activeStrength / activeWater : null

  const syringeAmount =
    activeDose && concentration
      ? (activeDose / concentration) * 100 // Convert to units (0.01mL = 1 unit on insulin syringe)
      : null

  const syringeML = activeDose && concentration ? activeDose / concentration : null

  const numberOfDoses = activeDose && activeStrength ? Math.floor(activeStrength / activeDose) : null

  const handleCustomDoseChange = (value: string) => {
    setCustomDose(value)
    if (value) setSelectedDose(null)
  }

  const handleCustomStrengthChange = (value: string) => {
    setCustomStrength(value)
    if (value) setSelectedStrength(null)
  }

  const handleCustomWaterChange = (value: string) => {
    setCustomWater(value)
    if (value) setSelectedWater(null)
  }

  const handleDoseSelect = (dose: number) => {
    setSelectedDose(dose)
    setCustomDose("")
  }

  const handleStrengthSelect = (strength: number) => {
    setSelectedStrength(strength)
    setCustomStrength("")
  }

  const handleWaterSelect = (water: number) => {
    setSelectedWater(water)
    setCustomWater("")
  }

  return (
    <ProtectedRoute allowedRoles={["provider"]}>
      <DashboardLayout>
        <div className="space-y-8">
          <div className="text-center">
            <h2 className="text-4xl font-bold tracking-tight text-primary">Peptide Calculator</h2>
            <p className="text-muted-foreground mt-2">
              Calculate accurate dosages for your patients with our Peptide Reconstitution Calculator
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {/* Dose Selection */}
            <Card>
              <CardHeader>
                <CardTitle className="text-primary">Dose of Peptide</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-2">
                  {doseOptions.map((dose) => (
                    <Button
                      key={dose}
                      variant={selectedDose === dose ? "default" : "outline"}
                      onClick={() => handleDoseSelect(dose)}
                      className={cn(
                        "h-12",
                        selectedDose === dose && "bg-blue-400 hover:bg-blue-500 text-white border-blue-400",
                      )}
                    >
                      {dose}mg
                    </Button>
                  ))}
                </div>
                <div className="mt-4">
                  <Input
                    type="number"
                    step="0.1"
                    placeholder="Enter custom dosage (mg)"
                    value={customDose}
                    onChange={(e) => handleCustomDoseChange(e.target.value)}
                    className="h-12 text-center"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Strength Selection */}
            <Card>
              <CardHeader>
                <CardTitle className="text-primary">Strength of Peptide</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-2">
                  {strengthOptions.map((strength) => (
                    <Button
                      key={strength}
                      variant={selectedStrength === strength ? "default" : "outline"}
                      onClick={() => handleStrengthSelect(strength)}
                      className={cn(
                        "h-12",
                        selectedStrength === strength && "bg-blue-400 hover:bg-blue-500 text-white border-blue-400",
                      )}
                    >
                      {strength}mg
                    </Button>
                  ))}
                </div>
                <div className="mt-4">
                  <Input
                    type="number"
                    step="1"
                    placeholder="Enter custom strength (mg)"
                    value={customStrength}
                    onChange={(e) => handleCustomStrengthChange(e.target.value)}
                    className="h-12 text-center"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Water Selection */}
            <Card>
              <CardHeader>
                <CardTitle className="text-primary">Bacteriostatic Water</CardTitle>
                <CardDescription className="text-xs">(Benzyl Alcohol 0.09% Only)</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-2">
                  {waterOptions.map((water) => (
                    <Button
                      key={water}
                      variant={selectedWater === water ? "default" : "outline"}
                      onClick={() => handleWaterSelect(water)}
                      className={cn(
                        "h-12",
                        selectedWater === water && "bg-blue-400 hover:bg-blue-500 text-white border-blue-400",
                      )}
                    >
                      {water}mL
                    </Button>
                  ))}
                </div>
                <div className="mt-4">
                  <Input
                    type="number"
                    step="0.1"
                    placeholder="Enter custom water (mL)"
                    value={customWater}
                    onChange={(e) => handleCustomWaterChange(e.target.value)}
                    className="h-12 text-center"
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-2xl text-center text-primary">Results</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 text-center">
                <div>
                  <p className="text-sm text-muted-foreground uppercase tracking-wide">Peptide Dose</p>
                  <p className="text-lg font-semibold">{activeDose ? `${activeDose}mg` : "Select dose"}</p>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground uppercase tracking-wide">Draw Syringe To</p>
                  <p className="text-2xl font-bold text-primary">
                    {syringeAmount !== null && syringeML !== null
                      ? `${syringeAmount.toFixed(1)} units (${syringeML.toFixed(2)}mL)`
                      : "Select values"}
                  </p>
                </div>
              </div>

              <div className="flex justify-center py-8">
                <div className="relative w-full max-w-2xl">
                  <svg width="700" height="180" viewBox="0 0 700 180" className="w-full">
                    {/* Needle on the left */}
                    <rect x="10" y="75" width="60" height="8" fill="#888" stroke="#666" strokeWidth="1" />
                    <path d="M 10 75 L 5 79 L 10 83 Z" fill="#666" />

                    {/* Needle hub/connector */}
                    <rect x="70" y="70" width="20" height="18" fill="#ddd" stroke="#333" strokeWidth="2" rx="2" />

                    {/* Main barrel body */}
                    <rect x="90" y="50" width="500" height="58" fill="#fff" stroke="#333" strokeWidth="3" rx="3" />

                    {/* Major tick marks (every 10 units) - longer marks */}
                    {Array.from({ length: 11 }, (_, i) => {
                      const x = 90 + i * 50
                      return (
                        <g key={`major-${i}`}>
                          {/* Top tick - extends down into barrel */}
                          <line x1={x} y1="53" x2={x} y2="65" stroke="#333" strokeWidth="2" />
                          {/* Bottom tick - extends up into barrel */}
                          <line x1={x} y1="105" x2={x} y2="93" stroke="#333" strokeWidth="2" />
                        </g>
                      )
                    })}

                    {/* Medium tick marks (every 5 units, but not 10s) */}
                    {Array.from({ length: 21 }, (_, i) => {
                      if (i % 2 !== 0) {
                        const x = 90 + i * 25
                        return (
                          <g key={`medium-${i}`}>
                            {/* Top tick - medium length */}
                            <line x1={x} y1="53" x2={x} y2="61" stroke="#666" strokeWidth="1.5" />
                            {/* Bottom tick - medium length */}
                            <line x1={x} y1="105" x2={x} y2="97" stroke="#666" strokeWidth="1.5" />
                          </g>
                        )
                      }
                      return null
                    })}

                    {/* Small tick marks (every 1 unit) */}
                    {Array.from({ length: 101 }, (_, i) => {
                      // Skip marks that are already drawn (every 5 units)
                      if (i % 5 !== 0) {
                        const x = 90 + i * 5
                        return (
                          <g key={`unit-${i}`}>
                            {/* Top tick - short */}
                            <line x1={x} y1="53" x2={x} y2="58" stroke="#999" strokeWidth="1" />
                            {/* Bottom tick - short */}
                            <line x1={x} y1="105" x2={x} y2="100" stroke="#999" strokeWidth="1" />
                          </g>
                        )
                      }
                      return null
                    })}

                    {/* Blue fill showing the dose amount - fills from left */}
                    {syringeAmount !== null && syringeAmount <= 100 && (
                      <rect
                        x="92"
                        y="52"
                        width={syringeAmount * 5}
                        height="54"
                        fill="rgba(96, 165, 250, 0.6)"
                        stroke="rgba(59, 130, 246, 0.8)"
                        strokeWidth="1"
                      />
                    )}

                    {/* Plunger on the right */}
                    <rect x="590" y="45" width="30" height="68" fill="#555" stroke="#333" strokeWidth="2" rx="2" />

                    {/* Plunger handle */}
                    <rect x="620" y="60" width="60" height="38" fill="#444" stroke="#333" strokeWidth="2" rx="4" />
                    <circle cx="650" cy="79" r="8" fill="#666" stroke="#333" strokeWidth="1" />

                    {/* Numbers at every 10 units (0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100) */}
                    {Array.from({ length: 11 }, (_, i) => {
                      const x = 90 + i * 50
                      const unitNumber = i * 10
                      return (
                        <text
                          key={`number-${i}`}
                          x={x}
                          y="125"
                          textAnchor="middle"
                          fontSize="12"
                          fill="#333"
                          fontWeight="500"
                        >
                          {unitNumber}
                        </text>
                      )
                    })}
                  </svg>
                </div>
              </div>

              <div className="grid gap-4 text-center pt-4 border-t">
                <div>
                  <p className="text-sm text-muted-foreground uppercase tracking-wide">Your Vial Contains</p>
                  <p className="text-lg font-semibold">
                    {activeStrength && activeWater ? `${activeStrength}mg in ${activeWater}mL` : "Select values"}
                  </p>
                  {numberOfDoses !== null && (
                    <p className="text-sm text-muted-foreground mt-1">
                      ({numberOfDoses} {numberOfDoses === 1 ? "dose" : "doses"} per vial)
                    </p>
                  )}
                </div>

                <div>
                  <p className="text-sm text-muted-foreground uppercase tracking-wide">Concentration</p>
                  <p className="text-lg font-semibold">
                    {concentration !== null ? `${concentration.toFixed(2)}mg/mL` : "Select values"}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>How to Calculate Peptide Dosage</CardTitle>
              <CardDescription>Follow these steps for accurate results</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div>
                  <h4 className="font-semibold">Step 1: Set Your Dose</h4>
                  <p className="text-sm text-muted-foreground">
                    Choose the desired dose in milligrams (mg). This is the amount of peptide to inject each time.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold">Step 2: Determine Peptide Amount</h4>
                  <p className="text-sm text-muted-foreground">
                    Select the amount of peptide in the vial. Common amounts include 1mg, 5mg, 10mg, or 15mg.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold">Step 3: Add Water Volume</h4>
                  <p className="text-sm text-muted-foreground">
                    Select the volume of bacteriostatic water (in milliliters, mL) used for mixing.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold">Step 4: Check the Visual Dosage Meter</h4>
                  <p className="text-sm text-muted-foreground">
                    The calculator will show a visual meter indicating the exact amount to draw up in the syringe.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Important Safety Information</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
                <li>
                  Always use bacteriostatic water <strong>with 0.9% Benzyl Alcohol</strong> for reconstitution
                </li>
                <li>Store reconstituted peptides in the refrigerator</li>
                <li>Use within 30 days of reconstitution</li>
                <li>Always use a new sterile needle for each injection</li>
                <li>
                  Do not buy syringes/needles from Amazon as they are most likely for lab use and may not be sterile
                </li>
                <li>Rotate injection sites to prevent tissue damage</li>
                <li>If unsure about dosing, consult with the prescribing provider immediately</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  )
}
