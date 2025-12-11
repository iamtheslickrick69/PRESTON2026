"use client"

export const dynamic = 'force-dynamic'

import { ProtectedRoute } from "@/components/protected-route"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { Activity } from "lucide-react"
import {
  Truck,
  CheckCircle,
  Clock,
  ShoppingCart,
  Package,
  Home,
  Calculator,
  Calendar,
  BookOpen,
  Phone,
  FileText,
  ChevronDown,
  Building2,
  CalendarClock,
} from "lucide-react"

const orders = [
  {
    id: "ORD-001234",
    date: "2024-01-20",
    status: "delivered",
    items: [
      {
        name: "BPC-157 (5mg)",
        quantity: 2,
        price: 89.99,
        lotNumber: "LOT-2024-0142",
        expirationDate: "2025-06-15",
        manufacturer: "Alpha BioMed",
        coaAvailable: true,
      },
      {
        name: "Bacteriostatic Water",
        quantity: 1,
        price: 19.99,
        lotNumber: "LOT-2024-0089",
        expirationDate: "2026-01-30",
        manufacturer: "BellMed Supplies",
        coaAvailable: false,
      },
    ],
    total: 199.97,
    trackingNumber: "1Z999AA10123456784",
    deliveredDate: "2024-01-23",
  },
  {
    id: "ORD-001235",
    date: "2024-01-25",
    status: "shipped",
    items: [
      {
        name: "TB-500 (5mg)",
        quantity: 1,
        price: 119.99,
        lotNumber: "LOT-2024-0156",
        expirationDate: "2025-07-20",
        manufacturer: "Alpha BioMed",
        coaAvailable: true,
      },
      {
        name: "Insulin Syringes (100 pack)",
        quantity: 1,
        price: 24.99,
        lotNumber: null,
        expirationDate: "2027-12-31",
        manufacturer: "BellMed Supplies",
        coaAvailable: false,
      },
    ],
    total: 144.98,
    trackingNumber: "1Z999AA10123456785",
    estimatedDelivery: "2024-01-28",
  },
  {
    id: "ORD-001236",
    date: "2024-01-26",
    status: "processing",
    items: [
      {
        name: "BPC-157 (5mg)",
        quantity: 3,
        price: 89.99,
        lotNumber: "LOT-2024-0163",
        expirationDate: "2025-08-10",
        manufacturer: "Alpha BioMed",
        coaAvailable: true,
      }
    ],
    total: 269.97,
    estimatedShip: "2024-01-27",
  },
]

const statusConfig = {
  processing: {
    icon: Clock,
    color: "text-blue-500",
    bg: "bg-blue-500/10",
    label: "Processing",
  },
  shipped: {
    icon: Truck,
    color: "text-amber-500",
    bg: "bg-amber-500/10",
    label: "Shipped",
  },
  delivered: {
    icon: CheckCircle,
    color: "text-green-500",
    bg: "bg-green-500/10",
    label: "Delivered",
  },
}

export default function PatientOrdersPage() {
  return (
    <ProtectedRoute allowedRoles={["patient"]}>
      <DashboardLayout>
        <div className="space-y-6">
          {orders.map((order) => {
            const config = statusConfig[order.status as keyof typeof statusConfig]
            const StatusIcon = config.icon

            return (
              <Card key={order.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">Order {order.id}</CardTitle>
                      <CardDescription>Placed on {order.date}</CardDescription>
                    </div>
                    <div className={`flex items-center gap-2 px-3 py-1 rounded-full ${config.bg}`}>
                      <StatusIcon className={`w-4 h-4 ${config.color}`} />
                      <span className={`text-sm font-medium ${config.color}`}>{config.label}</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Items with Batch/Lot Info */}
                  <div className="space-y-3">
                    {order.items.map((item, idx) => (
                      <Collapsible key={idx}>
                        <div className="border rounded-lg p-3">
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <div className="flex items-center gap-2">
                                <span className="font-medium">{item.name}</span>
                                <span className="text-muted-foreground">x{item.quantity}</span>
                              </div>
                              {item.lotNumber && (
                                <p className="text-xs text-muted-foreground mt-1">
                                  Lot: {item.lotNumber}
                                </p>
                              )}
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                              <CollapsibleTrigger asChild>
                                <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                                  <ChevronDown className="h-4 w-4" />
                                </Button>
                              </CollapsibleTrigger>
                            </div>
                          </div>
                          <CollapsibleContent className="mt-3 pt-3 border-t">
                            <div className="grid grid-cols-2 gap-3 text-sm">
                              <div className="flex items-center gap-2">
                                <Package className="h-4 w-4 text-muted-foreground" />
                                <div>
                                  <p className="text-xs text-muted-foreground">Lot Number</p>
                                  <p className="font-medium">{item.lotNumber || "N/A"}</p>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <CalendarClock className="h-4 w-4 text-muted-foreground" />
                                <div>
                                  <p className="text-xs text-muted-foreground">Expiration</p>
                                  <p className="font-medium">{item.expirationDate}</p>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <Building2 className="h-4 w-4 text-muted-foreground" />
                                <div>
                                  <p className="text-xs text-muted-foreground">Manufacturer</p>
                                  <p className="font-medium">{item.manufacturer}</p>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <FileText className="h-4 w-4 text-muted-foreground" />
                                <div>
                                  <p className="text-xs text-muted-foreground">COA</p>
                                  {item.coaAvailable ? (
                                    <Button variant="link" size="sm" className="h-auto p-0 text-primary">
                                      View Certificate
                                    </Button>
                                  ) : (
                                    <span className="text-muted-foreground">Not available</span>
                                  )}
                                </div>
                              </div>
                            </div>
                          </CollapsibleContent>
                        </div>
                      </Collapsible>
                    ))}
                  </div>

                  <div className="pt-2 border-t flex justify-between font-semibold">
                    <span>Total</span>
                    <span>${order.total.toFixed(2)}</span>
                  </div>

                  {/* Tracking Info */}
                  {order.status === "shipped" && (
                    <div className="p-3 bg-muted rounded-lg space-y-1">
                      <p className="text-sm font-medium">Tracking Number: {order.trackingNumber}</p>
                      <p className="text-xs text-muted-foreground">Estimated Delivery: {order.estimatedDelivery}</p>
                      <Button size="sm" variant="outline" className="mt-2 bg-transparent">
                        Track Package
                      </Button>
                    </div>
                  )}

                  {order.status === "delivered" && (
                    <div className="p-3 bg-green-500/10 rounded-lg">
                      <p className="text-sm font-medium text-green-700 dark:text-green-400">
                        Delivered on {order.deliveredDate}
                      </p>
                    </div>
                  )}

                  {order.status === "processing" && (
                    <div className="p-3 bg-muted rounded-lg">
                      <p className="text-sm text-muted-foreground">
                        Your order is being prepared. Estimated ship date: {order.estimatedShip}
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            )
          })}
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  )
}
