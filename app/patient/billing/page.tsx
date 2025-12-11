"use client"

export const dynamic = 'force-dynamic'

import { ProtectedRoute } from "@/components/protected-route"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Home, Calendar, Calculator, BookOpen, Phone, Activity, ShoppingCart, Package, CreditCard, Receipt, Download, Eye, FileText, CheckCircle, Clock, AlertCircle, Printer, Mail, ChevronRight, DollarSign, TrendingUp, Filter, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Separator } from "@/components/ui/separator"
import { useState } from "react"
import { toast } from "sonner"

interface Invoice {
  id: string
  number: string
  date: string
  dueDate: string
  status: "paid" | "pending" | "overdue"
  amount: number
  items: {
    description: string
    quantity: number
    unitPrice: number
    total: number
  }[]
  subtotal: number
  tax: number
  shipping: number
  total: number
  paymentMethod?: string
  paymentDate?: string
}

const mockInvoices: Invoice[] = [
  {
    id: "1",
    number: "INV-2024-001",
    date: "January 18, 2024",
    dueDate: "January 25, 2024",
    status: "paid",
    amount: 245.00,
    items: [
      { description: "BPC-157 10mg Vial", quantity: 2, unitPrice: 85.00, total: 170.00 },
      { description: "Bacteriostatic Water 30mL", quantity: 1, unitPrice: 15.00, total: 15.00 },
      { description: "Insulin Syringes (100 pack)", quantity: 1, unitPrice: 25.00, total: 25.00 },
    ],
    subtotal: 210.00,
    tax: 17.85,
    shipping: 17.15,
    total: 245.00,
    paymentMethod: "Visa ending in 4242",
    paymentDate: "January 18, 2024",
  },
  {
    id: "2",
    number: "INV-2024-002",
    date: "January 15, 2024",
    dueDate: "January 22, 2024",
    status: "paid",
    amount: 189.50,
    items: [
      { description: "Semaglutide 5mg Vial", quantity: 1, unitPrice: 175.00, total: 175.00 },
    ],
    subtotal: 175.00,
    tax: 14.50,
    shipping: 0,
    total: 189.50,
    paymentMethod: "Visa ending in 4242",
    paymentDate: "January 15, 2024",
  },
  {
    id: "3",
    number: "INV-2024-003",
    date: "January 10, 2024",
    dueDate: "January 17, 2024",
    status: "paid",
    amount: 325.00,
    items: [
      { description: "Tirzepatide 10mg Vial", quantity: 1, unitPrice: 285.00, total: 285.00 },
      { description: "Alcohol Prep Pads (200 pack)", quantity: 1, unitPrice: 8.00, total: 8.00 },
    ],
    subtotal: 293.00,
    tax: 24.85,
    shipping: 7.15,
    total: 325.00,
    paymentMethod: "Visa ending in 4242",
    paymentDate: "January 10, 2024",
  },
  {
    id: "4",
    number: "INV-2023-089",
    date: "December 20, 2023",
    dueDate: "December 27, 2023",
    status: "paid",
    amount: 450.00,
    items: [
      { description: "CJC-1295/Ipamorelin Blend 10mg", quantity: 2, unitPrice: 195.00, total: 390.00 },
      { description: "Bacteriostatic Water 30mL", quantity: 2, unitPrice: 15.00, total: 30.00 },
    ],
    subtotal: 420.00,
    tax: 15.00,
    shipping: 15.00,
    total: 450.00,
    paymentMethod: "Visa ending in 4242",
    paymentDate: "December 20, 2023",
  },
]

const paymentMethods = [
  { id: "1", type: "Visa", last4: "4242", expiry: "12/25", isDefault: true },
  { id: "2", type: "Mastercard", last4: "8888", expiry: "06/26", isDefault: false },
]

export default function PatientBillingPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null)

  const filteredInvoices = mockInvoices.filter((inv) => {
    const matchesSearch = inv.number.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || inv.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const totalSpent = mockInvoices.reduce((acc, inv) => acc + inv.total, 0)
  const thisMonthSpent = mockInvoices
    .filter(inv => inv.date.includes("January 2024"))
    .reduce((acc, inv) => acc + inv.total, 0)

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "paid":
        return <Badge className="bg-green-100 text-green-800">Paid</Badge>
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>
      case "overdue":
        return <Badge variant="destructive">Overdue</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const handleDownloadInvoice = (invoice: Invoice) => {
    toast.success(`Downloading ${invoice.number}...`)
  }

  const handleEmailInvoice = (invoice: Invoice) => {
    toast.success(`Invoice ${invoice.number} sent to your email`)
  }

  const handlePrintInvoice = (invoice: Invoice) => {
    toast.success(`Opening print dialog for ${invoice.number}...`)
  }

  return (
    <ProtectedRoute allowedRoles={["patient"]}>
      <DashboardLayout>
        <div className="space-y-6">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Billing & Invoices</h2>
            <p className="text-muted-foreground">View your payment history and download invoices</p>
          </div>

          {/* Summary Cards */}
          <div className="grid gap-4 md:grid-cols-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <DollarSign className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">${thisMonthSpent.toFixed(2)}</p>
                    <p className="text-sm text-muted-foreground">This Month</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <TrendingUp className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">${totalSpent.toFixed(2)}</p>
                    <p className="text-sm text-muted-foreground">Total Spent</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <Receipt className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{mockInvoices.length}</p>
                    <p className="text-sm text-muted-foreground">Invoices</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-orange-100 rounded-lg">
                    <Clock className="w-5 h-5 text-orange-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">${mockInvoices.filter(i => i.status === "pending").reduce((acc, i) => acc + i.total, 0).toFixed(2)}</p>
                    <p className="text-sm text-muted-foreground">Pending</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="invoices" className="w-full">
            <TabsList>
              <TabsTrigger value="invoices">
                <Receipt className="w-4 h-4 mr-2" />
                Invoices
              </TabsTrigger>
              <TabsTrigger value="payment-methods">
                <CreditCard className="w-4 h-4 mr-2" />
                Payment Methods
              </TabsTrigger>
            </TabsList>

            <TabsContent value="invoices" className="mt-4">
              <Card>
                <CardHeader>
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <CardTitle>Invoice History</CardTitle>
                      <CardDescription>View and download your past invoices</CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          placeholder="Search invoices..."
                          className="pl-10 w-48"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                        />
                      </div>
                      <Select value={statusFilter} onValueChange={setStatusFilter}>
                        <SelectTrigger className="w-[130px]">
                          <SelectValue placeholder="Status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Status</SelectItem>
                          <SelectItem value="paid">Paid</SelectItem>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="overdue">Overdue</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {filteredInvoices.map((invoice) => (
                      <div
                        key={invoice.id}
                        className="flex items-center justify-between p-4 rounded-lg border hover:bg-muted/50 transition-colors"
                      >
                        <div className="flex items-center gap-4">
                          <div className="p-2 bg-muted rounded-lg">
                            <Receipt className="w-5 h-5 text-muted-foreground" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-medium">{invoice.number}</span>
                              {getStatusBadge(invoice.status)}
                            </div>
                            <p className="text-sm text-muted-foreground">{invoice.date}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <p className="font-semibold">${invoice.total.toFixed(2)}</p>
                            <p className="text-xs text-muted-foreground">
                              {invoice.items.length} item{invoice.items.length !== 1 ? "s" : ""}
                            </p>
                          </div>
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="outline" size="sm" onClick={() => setSelectedInvoice(invoice)}>
                                <Eye className="w-4 h-4 mr-2" />
                                View
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-2xl">
                              <DialogHeader>
                                <DialogTitle>Invoice {invoice.number}</DialogTitle>
                                <DialogDescription>
                                  {invoice.date} • {getStatusBadge(invoice.status)}
                                </DialogDescription>
                              </DialogHeader>

                              <div className="space-y-6 py-4">
                                {/* Invoice Header */}
                                <div className="flex justify-between">
                                  <div>
                                    <h3 className="font-bold text-lg">Bridge MDX</h3>
                                    <p className="text-sm text-muted-foreground">Peptide Therapy Clinic</p>
                                    <p className="text-sm text-muted-foreground">123 Medical Plaza, Suite 100</p>
                                    <p className="text-sm text-muted-foreground">Phoenix, AZ 85001</p>
                                  </div>
                                  <div className="text-right">
                                    <p className="font-bold text-2xl">${invoice.total.toFixed(2)}</p>
                                    <p className="text-sm text-muted-foreground">Invoice #{invoice.number}</p>
                                    <p className="text-sm text-muted-foreground">Date: {invoice.date}</p>
                                  </div>
                                </div>

                                <Separator />

                                {/* Line Items */}
                                <Table>
                                  <TableHeader>
                                    <TableRow>
                                      <TableHead>Item</TableHead>
                                      <TableHead className="text-right">Qty</TableHead>
                                      <TableHead className="text-right">Price</TableHead>
                                      <TableHead className="text-right">Total</TableHead>
                                    </TableRow>
                                  </TableHeader>
                                  <TableBody>
                                    {invoice.items.map((item, index) => (
                                      <TableRow key={index}>
                                        <TableCell>{item.description}</TableCell>
                                        <TableCell className="text-right">{item.quantity}</TableCell>
                                        <TableCell className="text-right">${item.unitPrice.toFixed(2)}</TableCell>
                                        <TableCell className="text-right">${item.total.toFixed(2)}</TableCell>
                                      </TableRow>
                                    ))}
                                  </TableBody>
                                </Table>

                                {/* Totals */}
                                <div className="flex justify-end">
                                  <div className="w-64 space-y-2">
                                    <div className="flex justify-between text-sm">
                                      <span>Subtotal</span>
                                      <span>${invoice.subtotal.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                      <span>Tax</span>
                                      <span>${invoice.tax.toFixed(2)}</span>
                                    </div>
                                    {invoice.shipping > 0 && (
                                      <div className="flex justify-between text-sm">
                                        <span>Shipping</span>
                                        <span>${invoice.shipping.toFixed(2)}</span>
                                      </div>
                                    )}
                                    <Separator />
                                    <div className="flex justify-between font-bold">
                                      <span>Total</span>
                                      <span>${invoice.total.toFixed(2)}</span>
                                    </div>
                                  </div>
                                </div>

                                {/* Payment Info */}
                                {invoice.status === "paid" && invoice.paymentMethod && (
                                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                                    <div className="flex items-center gap-2 text-green-700">
                                      <CheckCircle className="w-5 h-5" />
                                      <span className="font-medium">Paid on {invoice.paymentDate}</span>
                                    </div>
                                    <p className="text-sm text-green-600 mt-1">
                                      Payment method: {invoice.paymentMethod}
                                    </p>
                                  </div>
                                )}
                              </div>

                              <DialogFooter>
                                <div className="flex gap-2 w-full justify-between">
                                  <div className="flex gap-2">
                                    <Button variant="outline" size="sm" onClick={() => handleEmailInvoice(invoice)}>
                                      <Mail className="w-4 h-4 mr-2" />
                                      Email
                                    </Button>
                                    <Button variant="outline" size="sm" onClick={() => handlePrintInvoice(invoice)}>
                                      <Printer className="w-4 h-4 mr-2" />
                                      Print
                                    </Button>
                                  </div>
                                  <Button onClick={() => handleDownloadInvoice(invoice)}>
                                    <Download className="w-4 h-4 mr-2" />
                                    Download PDF
                                  </Button>
                                </div>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>
                          <Button variant="ghost" size="icon" onClick={() => handleDownloadInvoice(invoice)}>
                            <Download className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}

                    {filteredInvoices.length === 0 && (
                      <div className="text-center py-12">
                        <Receipt className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                        <h3 className="text-lg font-semibold mb-2">No invoices found</h3>
                        <p className="text-muted-foreground">
                          {searchQuery || statusFilter !== "all"
                            ? "Try adjusting your filters"
                            : "Your invoices will appear here"}
                        </p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="payment-methods" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Payment Methods</CardTitle>
                  <CardDescription>Manage your saved payment methods</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {paymentMethods.map((method) => (
                      <div
                        key={method.id}
                        className={`flex items-center justify-between p-4 rounded-lg border ${
                          method.isDefault ? "border-primary bg-primary/5" : ""
                        }`}
                      >
                        <div className="flex items-center gap-4">
                          <div className="p-2 bg-muted rounded-lg">
                            <CreditCard className="w-5 h-5 text-muted-foreground" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-medium">{method.type} ending in {method.last4}</span>
                              {method.isDefault && (
                                <Badge variant="secondary">Default</Badge>
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground">Expires {method.expiry}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {!method.isDefault && (
                            <Button variant="outline" size="sm">
                              Set as Default
                            </Button>
                          )}
                          <Button variant="ghost" size="sm">
                            Remove
                          </Button>
                        </div>
                      </div>
                    ))}

                    <Button variant="outline" className="w-full mt-4">
                      <CreditCard className="w-4 h-4 mr-2" />
                      Add Payment Method
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Billing Address */}
              <Card className="mt-4">
                <CardHeader>
                  <CardTitle>Billing Address</CardTitle>
                  <CardDescription>Address used for billing and receipts</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-medium">John Doe</p>
                      <p className="text-sm text-muted-foreground">123 Main Street</p>
                      <p className="text-sm text-muted-foreground">Apt 4B</p>
                      <p className="text-sm text-muted-foreground">Phoenix, AZ 85001</p>
                    </div>
                    <Button variant="outline" size="sm">
                      Edit
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  )
}
