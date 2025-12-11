"use client"

export const dynamic = 'force-dynamic'

import { ProtectedRoute } from "@/components/protected-route"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Home, Calendar, Calculator, BookOpen, Phone, Activity, ShoppingCart, Package, Bell, Check, CheckCheck, Clock, Pill, MessageSquare, AlertTriangle, FileText, CreditCard, Settings, Trash2, Filter, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { useState } from "react"
import { toast } from "sonner"

interface Notification {
  id: string
  type: "appointment" | "prescription" | "message" | "alert" | "order" | "billing" | "system"
  title: string
  description: string
  timestamp: string
  date: string
  read: boolean
  actionUrl?: string
  actionLabel?: string
  priority?: "low" | "medium" | "high"
}

const allNotifications: Notification[] = [
  {
    id: "1",
    type: "appointment",
    title: "Upcoming Telehealth Appointment",
    description: "Your telehealth appointment with Dr. Williams is scheduled for tomorrow at 2:00 PM. Make sure your camera and microphone are working properly before the call.",
    timestamp: "30 min ago",
    date: "Jan 19, 2024",
    read: false,
    priority: "high",
    actionLabel: "View Details",
    actionUrl: "/patient/telehealth",
  },
  {
    id: "2",
    type: "prescription",
    title: "Prescription Refill Approved",
    description: "Your refill request for BPC-157 10mg has been approved by Dr. Williams. The medication will be shipped within 1-2 business days.",
    timestamp: "2 hours ago",
    date: "Jan 19, 2024",
    read: false,
    actionLabel: "View Prescription",
    actionUrl: "/patient/prescriptions",
  },
  {
    id: "3",
    type: "order",
    title: "Order Shipped",
    description: "Your order #ORD-2024-001 containing BPC-157, TB-500, and bacteriostatic water has been shipped via FedEx. Expected delivery: January 22, 2024.",
    timestamp: "5 hours ago",
    date: "Jan 19, 2024",
    read: false,
    actionLabel: "Track Order",
    actionUrl: "/patient/orders",
  },
  {
    id: "4",
    type: "message",
    title: "New Message from Dr. Williams",
    description: "Dr. Williams has sent you a message regarding your recent lab results. Please review the message and respond with any questions.",
    timestamp: "Yesterday",
    date: "Jan 18, 2024",
    read: true,
    actionLabel: "Read Message",
  },
  {
    id: "5",
    type: "alert",
    title: "Dose Reminder",
    description: "Reminder: It's time for your evening dose of Semaglutide. Remember to inject on an empty stomach for best results.",
    timestamp: "Yesterday",
    date: "Jan 18, 2024",
    read: true,
  },
  {
    id: "6",
    type: "billing",
    title: "Payment Processed Successfully",
    description: "Your payment of $245.00 for order #ORD-2024-001 has been processed successfully. A receipt has been sent to your email.",
    timestamp: "2 days ago",
    date: "Jan 17, 2024",
    read: true,
    actionLabel: "View Receipt",
  },
  {
    id: "7",
    type: "prescription",
    title: "Prescription Expiring Soon",
    description: "Your prescription for Semaglutide 5mg will expire in 7 days. Please schedule a follow-up appointment to renew your prescription.",
    timestamp: "3 days ago",
    date: "Jan 16, 2024",
    read: true,
    priority: "medium",
    actionLabel: "Schedule Appointment",
  },
  {
    id: "8",
    type: "system",
    title: "Profile Update Required",
    description: "Please update your emergency contact information to ensure we can reach someone in case of an emergency.",
    timestamp: "1 week ago",
    date: "Jan 12, 2024",
    read: true,
    actionLabel: "Update Profile",
  },
  {
    id: "9",
    type: "appointment",
    title: "Appointment Completed",
    description: "Your telehealth appointment with Dr. Williams on January 10th has been completed. Visit notes have been added to your chart.",
    timestamp: "1 week ago",
    date: "Jan 10, 2024",
    read: true,
    actionLabel: "View Notes",
  },
  {
    id: "10",
    type: "order",
    title: "Order Delivered",
    description: "Your order #ORD-2023-089 has been delivered. Please store your peptides in the refrigerator immediately upon receipt.",
    timestamp: "2 weeks ago",
    date: "Jan 5, 2024",
    read: true,
  },
]

export default function PatientNotificationsPage() {
  const [notifications, setNotifications] = useState(allNotifications)
  const [searchQuery, setSearchQuery] = useState("")
  const [typeFilter, setTypeFilter] = useState("all")
  const [selectedIds, setSelectedIds] = useState<string[]>([])

  const getIcon = (type: Notification["type"]) => {
    switch (type) {
      case "appointment":
        return <Calendar className="w-5 h-5 text-blue-500" />
      case "prescription":
        return <Pill className="w-5 h-5 text-green-500" />
      case "message":
        return <MessageSquare className="w-5 h-5 text-purple-500" />
      case "alert":
        return <AlertTriangle className="w-5 h-5 text-orange-500" />
      case "order":
        return <Package className="w-5 h-5 text-indigo-500" />
      case "billing":
        return <CreditCard className="w-5 h-5 text-emerald-500" />
      case "system":
        return <Settings className="w-5 h-5 text-gray-500" />
      default:
        return <Bell className="w-5 h-5 text-gray-500" />
    }
  }

  const filteredNotifications = notifications.filter((n) => {
    const matchesSearch = n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      n.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesType = typeFilter === "all" || n.type === typeFilter
    return matchesSearch && matchesType
  })

  const unreadCount = notifications.filter((n) => !n.read).length

  const handleMarkAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    )
  }

  const handleMarkAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
    toast.success("All notifications marked as read")
  }

  const handleDelete = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id))
    toast.success("Notification deleted")
  }

  const handleDeleteSelected = () => {
    setNotifications((prev) => prev.filter((n) => !selectedIds.includes(n.id)))
    setSelectedIds([])
    toast.success(`${selectedIds.length} notifications deleted`)
  }

  const handleMarkSelectedAsRead = () => {
    setNotifications((prev) =>
      prev.map((n) => (selectedIds.includes(n.id) ? { ...n, read: true } : n))
    )
    setSelectedIds([])
    toast.success(`${selectedIds.length} notifications marked as read`)
  }

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    )
  }

  const toggleSelectAll = () => {
    if (selectedIds.length === filteredNotifications.length) {
      setSelectedIds([])
    } else {
      setSelectedIds(filteredNotifications.map((n) => n.id))
    }
  }

  return (
    <ProtectedRoute allowedRoles={["patient"]}>
      <DashboardLayout>
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">Notifications</h2>
              <p className="text-muted-foreground">
                Stay updated on your appointments, orders, and messages
              </p>
            </div>
            {unreadCount > 0 && (
              <Button variant="outline" onClick={handleMarkAllAsRead}>
                <CheckCheck className="w-4 h-4 mr-2" />
                Mark all as read ({unreadCount})
              </Button>
            )}
          </div>

          {/* Quick Stats */}
          <div className="grid gap-4 md:grid-cols-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Bell className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{notifications.length}</p>
                    <p className="text-sm text-muted-foreground">Total</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-red-100 rounded-lg">
                    <AlertTriangle className="w-5 h-5 text-red-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{unreadCount}</p>
                    <p className="text-sm text-muted-foreground">Unread</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <Calendar className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">
                      {notifications.filter((n) => n.type === "appointment").length}
                    </p>
                    <p className="text-sm text-muted-foreground">Appointments</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <MessageSquare className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">
                      {notifications.filter((n) => n.type === "message").length}
                    </p>
                    <p className="text-sm text-muted-foreground">Messages</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Filters and Search */}
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search notifications..."
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger className="w-[180px]">
                    <Filter className="w-4 h-4 mr-2" />
                    <SelectValue placeholder="Filter by type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="appointment">Appointments</SelectItem>
                    <SelectItem value="prescription">Prescriptions</SelectItem>
                    <SelectItem value="order">Orders</SelectItem>
                    <SelectItem value="message">Messages</SelectItem>
                    <SelectItem value="billing">Billing</SelectItem>
                    <SelectItem value="alert">Alerts</SelectItem>
                    <SelectItem value="system">System</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Bulk Actions */}
              {selectedIds.length > 0 && (
                <div className="flex items-center gap-2 mt-4 p-3 bg-muted rounded-lg">
                  <span className="text-sm font-medium">{selectedIds.length} selected</span>
                  <Button variant="outline" size="sm" onClick={handleMarkSelectedAsRead}>
                    <Check className="w-4 h-4 mr-1" />
                    Mark as read
                  </Button>
                  <Button variant="outline" size="sm" onClick={handleDeleteSelected}>
                    <Trash2 className="w-4 h-4 mr-1" />
                    Delete
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => setSelectedIds([])}>
                    Clear selection
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Notifications List */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle>All Notifications</CardTitle>
                <div className="flex items-center gap-2">
                  <Checkbox
                    checked={selectedIds.length === filteredNotifications.length && filteredNotifications.length > 0}
                    onCheckedChange={toggleSelectAll}
                  />
                  <span className="text-sm text-muted-foreground">Select all</span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y">
                {filteredNotifications.length === 0 ? (
                  <div className="p-12 text-center">
                    <Bell className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">No notifications found</h3>
                    <p className="text-muted-foreground">
                      {searchQuery || typeFilter !== "all"
                        ? "Try adjusting your filters"
                        : "You're all caught up!"}
                    </p>
                  </div>
                ) : (
                  filteredNotifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-4 hover:bg-muted/50 transition-colors ${
                        !notification.read ? "bg-blue-50/50" : ""
                      } ${notification.priority === "high" && !notification.read ? "border-l-4 border-l-red-500" : ""}`}
                    >
                      <div className="flex gap-4">
                        <div className="flex items-start gap-3">
                          <Checkbox
                            checked={selectedIds.includes(notification.id)}
                            onCheckedChange={() => toggleSelect(notification.id)}
                          />
                          <div className="flex-shrink-0 mt-1">
                            {getIcon(notification.type)}
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-4">
                            <div>
                              <div className="flex items-center gap-2 flex-wrap">
                                <p className={`text-sm ${!notification.read ? "font-semibold" : "font-medium"}`}>
                                  {notification.title}
                                </p>
                                {!notification.read && (
                                  <Badge variant="secondary" className="text-xs">New</Badge>
                                )}
                                {notification.priority === "high" && (
                                  <Badge variant="destructive" className="text-xs">Urgent</Badge>
                                )}
                              </div>
                              <p className="text-sm text-muted-foreground mt-1">
                                {notification.description}
                              </p>
                              <div className="flex items-center gap-4 mt-2">
                                <span className="text-xs text-muted-foreground flex items-center gap-1">
                                  <Clock className="w-3 h-3" />
                                  {notification.timestamp}
                                </span>
                                <span className="text-xs text-muted-foreground">
                                  {notification.date}
                                </span>
                              </div>
                            </div>
                            <div className="flex items-center gap-2 flex-shrink-0">
                              {notification.actionLabel && (
                                <Button variant="outline" size="sm">
                                  {notification.actionLabel}
                                </Button>
                              )}
                              {!notification.read && (
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleMarkAsRead(notification.id)}
                                >
                                  <Check className="w-4 h-4" />
                                </Button>
                              )}
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleDelete(notification.id)}
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>

          {/* Notification Settings Link */}
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Settings className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Notification Preferences</p>
                    <p className="text-sm text-muted-foreground">
                      Customize which notifications you receive
                    </p>
                  </div>
                </div>
                <Button variant="outline">
                  Manage Settings
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  )
}
