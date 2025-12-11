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
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { toast } from "sonner"
import {
  Activity,
  Trash2,
  CreditCard,
  Lock,
  ShoppingCart,
  Package,
  Home,
  Calculator,
  Calendar,
  BookOpen,
  Phone,
  MapPin,
  Truck,
  CheckCircle,
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  Building2,
  Clock,
} from "lucide-react"
import Link from "next/link"

const steps = [
  { id: 1, name: "Cart", icon: ShoppingCart },
  { id: 2, name: "Shipping", icon: Truck },
  { id: 3, name: "Consent", icon: AlertTriangle },
  { id: 4, name: "Payment", icon: CreditCard },
  { id: 5, name: "Confirm", icon: CheckCircle },
]

const cartItems = [
  {
    id: "bpc-157",
    name: "BPC-157 (5mg)",
    quantity: 2,
    price: 89.99,
    isRuo: true,
    manufacturer: "Alpha BioMed",
    lotNumber: "LOT-2024-0163",
  },
  {
    id: "tb-500",
    name: "TB-500 (5mg)",
    quantity: 1,
    price: 119.99,
    isRuo: true,
    manufacturer: "Alpha BioMed",
    lotNumber: "LOT-2024-0156",
  },
  {
    id: "bac-water",
    name: "Bacteriostatic Water",
    quantity: 1,
    price: 19.99,
    isRuo: false,
    manufacturer: "BellMed Supplies",
    lotNumber: "LOT-2024-0089",
  },
]

export default function CheckoutPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [isProcessing, setIsProcessing] = useState(false)

  // Shipping state
  const [shippingMethod, setShippingMethod] = useState("standard")
  const [shipToClinic, setShipToClinic] = useState(false)
  const [shippingAddress, setShippingAddress] = useState({
    firstName: "Sarah",
    lastName: "Johnson",
    address: "123 Main St",
    city: "Los Angeles",
    state: "CA",
    zip: "90001",
    phone: "(555) 123-4567",
  })

  // Consent state
  const [ruoConsent, setRuoConsent] = useState(false)
  const [holdHarmless, setHoldHarmless] = useState(false)
  const [understandRisks, setUnderstandRisks] = useState(false)
  const [consentToResearch, setConsentToResearch] = useState(false)

  // Payment state
  const [paymentMethod, setPaymentMethod] = useState("card")
  const [cardNumber, setCardNumber] = useState("")
  const [expiry, setExpiry] = useState("")
  const [cvv, setCvv] = useState("")
  const [saveCard, setSaveCard] = useState(false)

  // Calculations
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shippingCost = shippingMethod === "express" ? 19.99 : 9.99
  const tax = subtotal * 0.08
  const total = subtotal + shippingCost + tax

  const hasRuoProducts = cartItems.some((item) => item.isRuo)

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return cartItems.length > 0
      case 2:
        return (
          shippingAddress.firstName &&
          shippingAddress.lastName &&
          shippingAddress.address &&
          shippingAddress.city &&
          shippingAddress.state &&
          shippingAddress.zip
        )
      case 3:
        return !hasRuoProducts || (ruoConsent && holdHarmless && understandRisks && consentToResearch)
      case 4:
        return cardNumber && expiry && cvv
      default:
        return true
    }
  }

  const handleNext = () => {
    if (!canProceed()) {
      toast.error("Please complete all required fields")
      return
    }

    if (currentStep < 5) {
      // Skip consent step if no RUO products
      if (currentStep === 2 && !hasRuoProducts) {
        setCurrentStep(4)
      } else {
        setCurrentStep(currentStep + 1)
      }
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      // Skip consent step going back if no RUO products
      if (currentStep === 4 && !hasRuoProducts) {
        setCurrentStep(2)
      } else {
        setCurrentStep(currentStep - 1)
      }
    }
  }

  const handlePlaceOrder = async () => {
    setIsProcessing(true)
    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2500))
    setIsProcessing(false)
    setCurrentStep(5)
    toast.success("Order placed successfully!")
  }

  const progress = (currentStep / steps.length) * 100

  return (
    <ProtectedRoute allowedRoles={["patient"]}>
      <DashboardLayout>
        <div className="space-y-6">
          {/* Header & Progress */}
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <Link href="/patient/peptides">
                <Button variant="ghost" size="icon">
                  <ArrowLeft className="h-4 w-4" />
                </Button>
              </Link>
              <div>
                <h2 className="text-3xl font-bold tracking-tight">Checkout</h2>
                <p className="text-muted-foreground">Complete your order</p>
              </div>
            </div>

            {/* Step Indicator */}
            <div className="space-y-2">
              <Progress value={progress} className="h-2" />
              <div className="flex justify-between">
                {steps.map((step) => {
                  const StepIcon = step.icon
                  const isActive = step.id === currentStep
                  const isCompleted = step.id < currentStep
                  const isSkipped = step.id === 3 && !hasRuoProducts

                  if (isSkipped) return null

                  return (
                    <div
                      key={step.id}
                      className={`flex items-center gap-2 ${
                        isActive
                          ? "text-primary"
                          : isCompleted
                          ? "text-green-600"
                          : "text-muted-foreground"
                      }`}
                    >
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          isActive
                            ? "bg-primary text-primary-foreground"
                            : isCompleted
                            ? "bg-green-100 text-green-600"
                            : "bg-muted"
                        }`}
                      >
                        {isCompleted ? (
                          <CheckCircle className="w-4 h-4" />
                        ) : (
                          <StepIcon className="w-4 h-4" />
                        )}
                      </div>
                      <span className="text-sm font-medium hidden sm:inline">{step.name}</span>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Step 1: Cart Review */}
              {currentStep === 1 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Review Your Cart</CardTitle>
                    <CardDescription>Verify your items before proceeding</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <p className="font-medium">{item.name}</p>
                            {item.isRuo && (
                              <Badge variant="outline" className="text-amber-600 border-amber-300">
                                RUO
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground">
                            Qty: {item.quantity} • {item.manufacturer}
                          </p>
                          <p className="text-xs text-muted-foreground">Lot: {item.lotNumber}</p>
                        </div>
                        <div className="flex items-center gap-4">
                          <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                          <Button variant="ghost" size="icon" className="text-destructive">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}

                    {hasRuoProducts && (
                      <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
                        <div className="flex gap-3">
                          <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="font-medium text-amber-800">Research Use Only Products</p>
                            <p className="text-sm text-amber-700 mt-1">
                              Your cart contains RUO products. You will be required to review and accept
                              the Research Use Only disclosure during checkout.
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}

              {/* Step 2: Shipping */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Shipping Method</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <RadioGroup value={shippingMethod} onValueChange={setShippingMethod}>
                        <div className="flex items-center space-x-2 p-4 border rounded-lg">
                          <RadioGroupItem value="standard" id="standard" />
                          <Label htmlFor="standard" className="flex-1 cursor-pointer">
                            <div className="flex justify-between items-center">
                              <div>
                                <p className="font-medium">Standard Shipping</p>
                                <p className="text-sm text-muted-foreground">3-5 business days</p>
                              </div>
                              <p className="font-semibold">$9.99</p>
                            </div>
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2 p-4 border rounded-lg">
                          <RadioGroupItem value="express" id="express" />
                          <Label htmlFor="express" className="flex-1 cursor-pointer">
                            <div className="flex justify-between items-center">
                              <div>
                                <p className="font-medium">Express Shipping</p>
                                <p className="text-sm text-muted-foreground">1-2 business days</p>
                              </div>
                              <p className="font-semibold">$19.99</p>
                            </div>
                          </Label>
                        </div>
                      </RadioGroup>

                      <div className="flex items-center space-x-2 p-4 bg-muted rounded-lg">
                        <Checkbox
                          id="shipToClinic"
                          checked={shipToClinic}
                          onCheckedChange={(checked) => setShipToClinic(checked as boolean)}
                        />
                        <Label htmlFor="shipToClinic" className="cursor-pointer">
                          <div>
                            <p className="font-medium">Ship to my clinic instead</p>
                            <p className="text-sm text-muted-foreground">
                              Functional Medicine Clinic - 456 Health Blvd, Los Angeles, CA
                            </p>
                          </div>
                        </Label>
                      </div>
                    </CardContent>
                  </Card>

                  {!shipToClinic && (
                    <Card>
                      <CardHeader>
                        <CardTitle>Shipping Address</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="firstName">First Name *</Label>
                            <Input
                              id="firstName"
                              value={shippingAddress.firstName}
                              onChange={(e) =>
                                setShippingAddress({ ...shippingAddress, firstName: e.target.value })
                              }
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="lastName">Last Name *</Label>
                            <Input
                              id="lastName"
                              value={shippingAddress.lastName}
                              onChange={(e) =>
                                setShippingAddress({ ...shippingAddress, lastName: e.target.value })
                              }
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="address">Street Address *</Label>
                          <Input
                            id="address"
                            value={shippingAddress.address}
                            onChange={(e) =>
                              setShippingAddress({ ...shippingAddress, address: e.target.value })
                            }
                          />
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="city">City *</Label>
                            <Input
                              id="city"
                              value={shippingAddress.city}
                              onChange={(e) =>
                                setShippingAddress({ ...shippingAddress, city: e.target.value })
                              }
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="state">State *</Label>
                            <Input
                              id="state"
                              value={shippingAddress.state}
                              onChange={(e) =>
                                setShippingAddress({ ...shippingAddress, state: e.target.value })
                              }
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="zip">ZIP *</Label>
                            <Input
                              id="zip"
                              value={shippingAddress.zip}
                              onChange={(e) =>
                                setShippingAddress({ ...shippingAddress, zip: e.target.value })
                              }
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone Number</Label>
                          <Input
                            id="phone"
                            value={shippingAddress.phone}
                            onChange={(e) =>
                              setShippingAddress({ ...shippingAddress, phone: e.target.value })
                            }
                          />
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>
              )}

              {/* Step 3: RUO Consent */}
              {currentStep === 3 && hasRuoProducts && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <AlertTriangle className="w-5 h-5 text-amber-500" />
                      Research Use Only Disclosure
                    </CardTitle>
                    <CardDescription>
                      Please review and accept the following disclosures to proceed
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg text-sm">
                      <p className="font-semibold text-amber-800 mb-2">Important Notice</p>
                      <p className="text-amber-700">
                        The peptide products in your order are designated as "Research Use Only" (RUO).
                        These products have not been approved by the FDA for human therapeutic use. By
                        proceeding with this purchase, you acknowledge and accept the following terms.
                      </p>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-start space-x-3 p-4 border rounded-lg">
                        <Checkbox
                          id="ruoConsent"
                          checked={ruoConsent}
                          onCheckedChange={(checked) => setRuoConsent(checked as boolean)}
                        />
                        <div className="space-y-1">
                          <Label htmlFor="ruoConsent" className="cursor-pointer font-medium">
                            Research Use Only Acknowledgment *
                          </Label>
                          <p className="text-sm text-muted-foreground">
                            I understand that these products are for research purposes only and have not
                            been approved by the FDA for human therapeutic use. I am participating in a
                            research protocol under the supervision of a licensed healthcare provider.
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-3 p-4 border rounded-lg">
                        <Checkbox
                          id="understandRisks"
                          checked={understandRisks}
                          onCheckedChange={(checked) => setUnderstandRisks(checked as boolean)}
                        />
                        <div className="space-y-1">
                          <Label htmlFor="understandRisks" className="cursor-pointer font-medium">
                            Understanding of Risks *
                          </Label>
                          <p className="text-sm text-muted-foreground">
                            I understand the potential risks and benefits of peptide therapy. My provider
                            has discussed these with me, and I have had the opportunity to ask questions.
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-3 p-4 border rounded-lg">
                        <Checkbox
                          id="holdHarmless"
                          checked={holdHarmless}
                          onCheckedChange={(checked) => setHoldHarmless(checked as boolean)}
                        />
                        <div className="space-y-1">
                          <Label htmlFor="holdHarmless" className="cursor-pointer font-medium">
                            Hold Harmless Agreement *
                          </Label>
                          <p className="text-sm text-muted-foreground">
                            I agree to hold harmless the clinic, providers, and suppliers from any claims
                            arising from the use of these research products, except in cases of gross
                            negligence or willful misconduct.
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-3 p-4 border rounded-lg">
                        <Checkbox
                          id="consentToResearch"
                          checked={consentToResearch}
                          onCheckedChange={(checked) => setConsentToResearch(checked as boolean)}
                        />
                        <div className="space-y-1">
                          <Label htmlFor="consentToResearch" className="cursor-pointer font-medium">
                            Research Data Consent *
                          </Label>
                          <p className="text-sm text-muted-foreground">
                            I consent to my de-identified health outcomes being used for research purposes
                            to advance the understanding of peptide therapies. I understand my personal
                            information will remain confidential.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 bg-muted rounded-lg">
                      <p className="text-sm text-muted-foreground">
                        <strong>Electronic Signature:</strong> By checking the boxes above and proceeding
                        with this order, I am providing my electronic signature, which is equivalent to
                        a handwritten signature. This consent is being recorded with timestamp and IP
                        address for compliance purposes.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Step 4: Payment */}
              {currentStep === 4 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Payment Method</CardTitle>
                    <CardDescription>Your payment information is encrypted and secure</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                      <div className="flex items-center space-x-2 p-4 border rounded-lg">
                        <RadioGroupItem value="card" id="card" />
                        <Label htmlFor="card" className="cursor-pointer">
                          Credit or Debit Card
                        </Label>
                      </div>
                    </RadioGroup>

                    {paymentMethod === "card" && (
                      <div className="space-y-4 p-4 border rounded-lg">
                        <div className="space-y-2">
                          <Label htmlFor="cardNumber">Card Number *</Label>
                          <Input
                            id="cardNumber"
                            placeholder="1234 5678 9012 3456"
                            value={cardNumber}
                            onChange={(e) => setCardNumber(e.target.value)}
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="expiry">Expiry Date *</Label>
                            <Input
                              id="expiry"
                              placeholder="MM/YY"
                              value={expiry}
                              onChange={(e) => setExpiry(e.target.value)}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="cvv">CVV *</Label>
                            <Input
                              id="cvv"
                              placeholder="123"
                              value={cvv}
                              onChange={(e) => setCvv(e.target.value)}
                            />
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="saveCard"
                            checked={saveCard}
                            onCheckedChange={(checked) => setSaveCard(checked as boolean)}
                          />
                          <Label htmlFor="saveCard" className="text-sm cursor-pointer">
                            Save card for future purchases
                          </Label>
                        </div>
                      </div>
                    )}

                    <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                      <Lock className="w-4 h-4" />
                      <span>Secure 256-bit SSL encryption powered by Stripe</span>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Step 5: Confirmation */}
              {currentStep === 5 && (
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center space-y-4">
                      <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                        <CheckCircle className="w-10 h-10 text-green-600" />
                      </div>
                      <h2 className="text-2xl font-bold">Order Confirmed!</h2>
                      <p className="text-muted-foreground">
                        Thank you for your order. You will receive a confirmation email shortly.
                      </p>

                      <div className="p-4 bg-muted rounded-lg text-left">
                        <p className="font-medium mb-2">Order Details</p>
                        <div className="space-y-1 text-sm">
                          <p>
                            <span className="text-muted-foreground">Order Number:</span>{" "}
                            <span className="font-mono">ORD-2024-0047</span>
                          </p>
                          <p>
                            <span className="text-muted-foreground">Estimated Delivery:</span>{" "}
                            {shippingMethod === "express" ? "Feb 7-8, 2024" : "Feb 10-12, 2024"}
                          </p>
                          <p>
                            <span className="text-muted-foreground">Total Charged:</span> $
                            {total.toFixed(2)}
                          </p>
                        </div>
                      </div>

                      {hasRuoProducts && (
                        <div className="p-4 bg-blue-50 rounded-lg text-left">
                          <p className="font-medium text-blue-800 mb-1">RUO Consent Recorded</p>
                          <p className="text-sm text-blue-700">
                            Your Research Use Only consent has been recorded and stored securely.
                            Reference: RUO-2024-0142
                          </p>
                        </div>
                      )}

                      <div className="flex gap-3 justify-center pt-4">
                        <Link href="/patient/orders">
                          <Button>Track Order</Button>
                        </Link>
                        <Link href="/patient/peptides">
                          <Button variant="outline">Continue Shopping</Button>
                        </Link>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Navigation Buttons */}
              {currentStep < 5 && (
                <div className="flex justify-between">
                  <Button variant="outline" onClick={handleBack} disabled={currentStep === 1}>
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back
                  </Button>
                  {currentStep === 4 ? (
                    <Button onClick={handlePlaceOrder} disabled={!canProceed() || isProcessing}>
                      {isProcessing ? (
                        <>
                          <Clock className="w-4 h-4 mr-2 animate-spin" />
                          Processing...
                        </>
                      ) : (
                        <>
                          <Lock className="w-4 h-4 mr-2" />
                          Place Order - ${total.toFixed(2)}
                        </>
                      )}
                    </Button>
                  ) : (
                    <Button onClick={handleNext} disabled={!canProceed()}>
                      Continue
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  )}
                </div>
              )}
            </div>

            {/* Order Summary Sidebar */}
            <div className="lg:col-span-1">
              <Card className="sticky top-4">
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex justify-between text-sm">
                        <span>
                          {item.name} x{item.quantity}
                        </span>
                        <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>

                  <Separator />

                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        Shipping ({shippingMethod === "express" ? "Express" : "Standard"})
                      </span>
                      <span>${shippingCost.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Tax</span>
                      <span>${tax.toFixed(2)}</span>
                    </div>
                  </div>

                  <Separator />

                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>

                  {currentStep >= 2 && !shipToClinic && (
                    <div className="p-3 bg-muted rounded-lg text-sm">
                      <div className="flex items-center gap-2 mb-1">
                        <MapPin className="w-4 h-4 text-muted-foreground" />
                        <span className="font-medium">Shipping to:</span>
                      </div>
                      <p className="text-muted-foreground">
                        {shippingAddress.firstName} {shippingAddress.lastName}
                        <br />
                        {shippingAddress.address}
                        <br />
                        {shippingAddress.city}, {shippingAddress.state} {shippingAddress.zip}
                      </p>
                    </div>
                  )}

                  {currentStep >= 2 && shipToClinic && (
                    <div className="p-3 bg-muted rounded-lg text-sm">
                      <div className="flex items-center gap-2 mb-1">
                        <Building2 className="w-4 h-4 text-muted-foreground" />
                        <span className="font-medium">Shipping to Clinic:</span>
                      </div>
                      <p className="text-muted-foreground">
                        Functional Medicine Clinic
                        <br />
                        456 Health Blvd
                        <br />
                        Los Angeles, CA 90002
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  )
}
