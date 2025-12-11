"use client"

export const dynamic = 'force-dynamic'

import { ProtectedRoute } from "@/components/protected-route"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Activity } from "lucide-react"
import {
  ShoppingCart,
  Package,
  CheckCircle,
  Plus,
  Minus,
  Home,
  Calculator,
  Calendar,
  BookOpen,
  Phone,
} from "lucide-react"
import Link from "next/link"
import { useState } from "react"

const prescribedPeptides = [
  {
    id: "bpc-157",
    name: "BPC-157",
    fullName: "Body Protection Compound-157",
    prescribedDose: "250 mcg twice daily",
    vialSize: "5mg",
    price: 89.99,
    inStock: true,
    estimatedDuration: "20 days per vial",
  },
  {
    id: "tb-500",
    name: "TB-500",
    fullName: "Thymosin Beta-4",
    prescribedDose: "2 mg twice weekly",
    vialSize: "5mg",
    price: 119.99,
    inStock: true,
    estimatedDuration: "2.5 weeks per vial",
  },
]

const accessories = [
  {
    id: "bac-water",
    name: "Bacteriostatic Water",
    description: "30ml sterile water for reconstitution",
    price: 19.99,
    inStock: true,
  },
  {
    id: "syringes",
    name: "Insulin Syringes (100 pack)",
    description: "31G 1ml syringes with needles",
    price: 24.99,
    inStock: true,
  },
  {
    id: "alcohol-swabs",
    name: "Alcohol Prep Pads (200 pack)",
    description: "Sterile alcohol swabs",
    price: 12.99,
    inStock: true,
  },
]

export default function PatientShopPage() {
  const [cart, setCart] = useState<Record<string, number>>({})

  const addToCart = (id: string) => {
    setCart((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }))
  }

  const removeFromCart = (id: string) => {
    setCart((prev) => {
      const newCart = { ...prev }
      if (newCart[id] > 1) {
        newCart[id]--
      } else {
        delete newCart[id]
      }
      return newCart
    })
  }

  const cartTotal = Object.entries(cart).reduce((total, [id, quantity]) => {
    const peptide = prescribedPeptides.find((p) => p.id === id)
    const accessory = accessories.find((a) => a.id === id)
    const price = peptide?.price || accessory?.price || 0
    return total + price * quantity
  }, 0)

  const cartItemCount = Object.values(cart).reduce((sum, qty) => sum + qty, 0)

  return (
    <ProtectedRoute allowedRoles={["patient"]}>
      <DashboardLayout>
        <div className="space-y-8">
          {/* Prescribed Peptides */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <h2 className="text-2xl font-bold">Your Prescribed Peptides</h2>
            </div>
            <p className="text-muted-foreground mb-6">
              These peptides have been prescribed by your healthcare provider
            </p>

            <div className="grid gap-6 md:grid-cols-2">
              {prescribedPeptides.map((peptide) => (
                <Card key={peptide.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-xl">{peptide.name}</CardTitle>
                        <CardDescription>{peptide.fullName}</CardDescription>
                      </div>
                      <Badge variant={peptide.inStock ? "default" : "secondary"}>
                        {peptide.inStock ? "In Stock" : "Out of Stock"}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Prescribed Dose:</span>
                        <span className="font-medium">{peptide.prescribedDose}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Vial Size:</span>
                        <span className="font-medium">{peptide.vialSize}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Duration:</span>
                        <span className="font-medium">{peptide.estimatedDuration}</span>
                      </div>
                    </div>

                    <div className="pt-4 border-t">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-2xl font-bold">${peptide.price}</p>
                          <p className="text-xs text-muted-foreground">per vial</p>
                        </div>
                        {cart[peptide.id] ? (
                          <div className="flex items-center gap-2">
                            <Button
                              size="icon"
                              variant="outline"
                              onClick={() => removeFromCart(peptide.id)}
                              className="bg-transparent"
                            >
                              <Minus className="w-4 h-4" />
                            </Button>
                            <span className="w-8 text-center font-semibold">{cart[peptide.id]}</span>
                            <Button
                              size="icon"
                              variant="outline"
                              onClick={() => addToCart(peptide.id)}
                              className="bg-transparent"
                            >
                              <Plus className="w-4 h-4" />
                            </Button>
                          </div>
                        ) : (
                          <Button onClick={() => addToCart(peptide.id)} disabled={!peptide.inStock}>
                            <ShoppingCart className="w-4 h-4 mr-2" />
                            Add to Cart
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Accessories */}
          <div>
            <h2 className="text-2xl font-bold mb-4">Supplies & Accessories</h2>
            <p className="text-muted-foreground mb-6">Everything you need for safe peptide administration</p>

            <div className="grid gap-4 md:grid-cols-3">
              {accessories.map((item) => (
                <Card key={item.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-lg">{item.name}</CardTitle>
                    <CardDescription className="text-sm">{item.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <p className="text-xl font-bold">${item.price}</p>
                      {cart[item.id] ? (
                        <div className="flex items-center gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => removeFromCart(item.id)}
                            className="bg-transparent"
                          >
                            <Minus className="w-3 h-3" />
                          </Button>
                          <span className="w-6 text-center text-sm font-semibold">{cart[item.id]}</span>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => addToCart(item.id)}
                            className="bg-transparent"
                          >
                            <Plus className="w-3 h-3" />
                          </Button>
                        </div>
                      ) : (
                        <Button size="sm" onClick={() => addToCart(item.id)}>
                          Add
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Cart Summary */}
          {cartItemCount > 0 && (
            <Card className="sticky bottom-4 shadow-xl">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Cart Total</p>
                    <p className="text-3xl font-bold">${cartTotal.toFixed(2)}</p>
                  </div>
                  <Link href="/patient/shop/cart">
                    <Button size="lg">
                      Proceed to Checkout
                      <ShoppingCart className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  )
}
