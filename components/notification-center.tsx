"use client"

import { Bell, Check, CheckCheck, Clock, Calendar, Pill, MessageSquare, AlertTriangle, FileText, CreditCard, X, Settings, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useState } from "react"
import { toast } from "sonner"

export interface Notification {
  id: string
  type: "appointment" | "prescription" | "message" | "alert" | "order" | "billing" | "system"
  title: string
  description: string
  timestamp: string
  read: boolean
  actionUrl?: string
  actionLabel?: string
  priority?: "low" | "medium" | "high"
}

interface NotificationCenterProps {
  notifications: Notification[]
  onMarkAsRead?: (id: string) => void
  onMarkAllAsRead?: () => void
  onDelete?: (id: string) => void
  onClearAll?: () => void
}

export function NotificationCenter({
  notifications: initialNotifications,
  onMarkAsRead,
  onMarkAllAsRead,
  onDelete,
  onClearAll,
}: NotificationCenterProps) {
  const [notifications, setNotifications] = useState(initialNotifications)
  const [isOpen, setIsOpen] = useState(false)

  const unreadCount = notifications.filter((n) => !n.read).length

  const getIcon = (type: Notification["type"]) => {
    switch (type) {
      case "appointment":
        return <Calendar className="w-4 h-4 text-blue-500" />
      case "prescription":
        return <Pill className="w-4 h-4 text-green-500" />
      case "message":
        return <MessageSquare className="w-4 h-4 text-purple-500" />
      case "alert":
        return <AlertTriangle className="w-4 h-4 text-orange-500" />
      case "order":
        return <FileText className="w-4 h-4 text-indigo-500" />
      case "billing":
        return <CreditCard className="w-4 h-4 text-emerald-500" />
      case "system":
        return <Settings className="w-4 h-4 text-gray-500" />
      default:
        return <Bell className="w-4 h-4 text-gray-500" />
    }
  }

  const handleMarkAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    )
    onMarkAsRead?.(id)
  }

  const handleMarkAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
    onMarkAllAsRead?.()
    toast.success("All notifications marked as read")
  }

  const handleDelete = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id))
    onDelete?.(id)
    toast.success("Notification deleted")
  }

  const handleClearAll = () => {
    setNotifications([])
    onClearAll?.()
    toast.success("All notifications cleared")
  }

  const unreadNotifications = notifications.filter((n) => !n.read)
  const readNotifications = notifications.filter((n) => n.read)

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center font-medium">
              {unreadCount > 9 ? "9+" : unreadCount}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-96 p-0" align="end">
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold">Notifications</h3>
            {unreadCount > 0 && (
              <Badge variant="secondary" className="text-xs">
                {unreadCount} new
              </Badge>
            )}
          </div>
          <div className="flex items-center gap-1">
            {unreadCount > 0 && (
              <Button variant="ghost" size="sm" onClick={handleMarkAllAsRead}>
                <CheckCheck className="w-4 h-4 mr-1" />
                Mark all read
              </Button>
            )}
          </div>
        </div>

        <Tabs defaultValue="unread" className="w-full">
          <TabsList className="w-full justify-start rounded-none border-b bg-transparent p-0">
            <TabsTrigger
              value="unread"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
            >
              Unread ({unreadNotifications.length})
            </TabsTrigger>
            <TabsTrigger
              value="all"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
            >
              All ({notifications.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="unread" className="m-0">
            <ScrollArea className="h-[400px]">
              {unreadNotifications.length === 0 ? (
                <div className="p-8 text-center">
                  <Check className="w-12 h-12 text-green-500 mx-auto mb-3" />
                  <p className="text-sm font-medium">All caught up!</p>
                  <p className="text-xs text-muted-foreground">No new notifications</p>
                </div>
              ) : (
                <div className="divide-y">
                  {unreadNotifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-4 hover:bg-muted/50 cursor-pointer transition-colors ${
                        notification.priority === "high" ? "bg-red-50" : ""
                      }`}
                      onClick={() => handleMarkAsRead(notification.id)}
                    >
                      <div className="flex gap-3">
                        <div className="flex-shrink-0 mt-1">
                          {getIcon(notification.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <p className="text-sm font-medium leading-tight">
                              {notification.title}
                            </p>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-6 w-6 flex-shrink-0"
                              onClick={(e) => {
                                e.stopPropagation()
                                handleDelete(notification.id)
                              }}
                            >
                              <X className="w-3 h-3" />
                            </Button>
                          </div>
                          <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                            {notification.description}
                          </p>
                          <div className="flex items-center justify-between mt-2">
                            <span className="text-xs text-muted-foreground flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {notification.timestamp}
                            </span>
                            {notification.actionLabel && (
                              <Button variant="link" size="sm" className="h-auto p-0 text-xs">
                                {notification.actionLabel}
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </ScrollArea>
          </TabsContent>

          <TabsContent value="all" className="m-0">
            <ScrollArea className="h-[400px]">
              {notifications.length === 0 ? (
                <div className="p-8 text-center">
                  <Bell className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                  <p className="text-sm font-medium">No notifications</p>
                  <p className="text-xs text-muted-foreground">You&apos;re all caught up!</p>
                </div>
              ) : (
                <div className="divide-y">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-4 hover:bg-muted/50 cursor-pointer transition-colors ${
                        !notification.read ? "bg-blue-50/50" : ""
                      } ${notification.priority === "high" && !notification.read ? "bg-red-50" : ""}`}
                      onClick={() => !notification.read && handleMarkAsRead(notification.id)}
                    >
                      <div className="flex gap-3">
                        <div className="flex-shrink-0 mt-1">
                          {getIcon(notification.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <p className={`text-sm leading-tight ${!notification.read ? "font-medium" : ""}`}>
                              {notification.title}
                            </p>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-6 w-6 flex-shrink-0"
                              onClick={(e) => {
                                e.stopPropagation()
                                handleDelete(notification.id)
                              }}
                            >
                              <X className="w-3 h-3" />
                            </Button>
                          </div>
                          <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                            {notification.description}
                          </p>
                          <div className="flex items-center justify-between mt-2">
                            <span className="text-xs text-muted-foreground flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {notification.timestamp}
                            </span>
                            {!notification.read && (
                              <span className="w-2 h-2 rounded-full bg-blue-500" />
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </ScrollArea>
          </TabsContent>
        </Tabs>

        {notifications.length > 0 && (
          <div className="p-2 border-t">
            <Button
              variant="ghost"
              size="sm"
              className="w-full text-muted-foreground"
              onClick={handleClearAll}
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Clear all notifications
            </Button>
          </div>
        )}
      </PopoverContent>
    </Popover>
  )
}

// Example mock notifications for different user types
export const patientNotifications: Notification[] = [
  {
    id: "1",
    type: "appointment",
    title: "Upcoming Appointment",
    description: "Your telehealth appointment with Dr. Williams is in 30 minutes",
    timestamp: "30 min ago",
    read: false,
    priority: "high",
    actionLabel: "Join Now",
    actionUrl: "/patient/telehealth",
  },
  {
    id: "2",
    type: "prescription",
    title: "Prescription Refill Ready",
    description: "Your BPC-157 refill has been approved and is ready for pickup",
    timestamp: "2 hours ago",
    read: false,
    actionLabel: "View Details",
    actionUrl: "/patient/prescriptions",
  },
  {
    id: "3",
    type: "order",
    title: "Order Shipped",
    description: "Your order #ORD-2024-001 has been shipped. Expected delivery: Jan 25",
    timestamp: "Yesterday",
    read: false,
    actionLabel: "Track Order",
    actionUrl: "/patient/orders",
  },
  {
    id: "4",
    type: "message",
    title: "New Message from Provider",
    description: "Dr. Williams sent you a message about your lab results",
    timestamp: "2 days ago",
    read: true,
    actionLabel: "Read Message",
  },
  {
    id: "5",
    type: "alert",
    title: "Dose Reminder",
    description: "Don't forget to take your evening dose of Semaglutide",
    timestamp: "3 days ago",
    read: true,
  },
  {
    id: "6",
    type: "billing",
    title: "Payment Successful",
    description: "Your payment of $145.00 has been processed successfully",
    timestamp: "1 week ago",
    read: true,
    actionLabel: "View Receipt",
  },
]

export const providerNotifications: Notification[] = [
  {
    id: "1",
    type: "appointment",
    title: "Patient in Waiting Room",
    description: "Sarah Johnson has joined the waiting room for her 2:00 PM appointment",
    timestamp: "Just now",
    read: false,
    priority: "high",
    actionLabel: "Start Call",
    actionUrl: "/provider/telehealth",
  },
  {
    id: "2",
    type: "prescription",
    title: "Refill Request",
    description: "Michael Chen has requested a refill for CJC-1295",
    timestamp: "1 hour ago",
    read: false,
    actionLabel: "Review",
    actionUrl: "/provider/prescriptions",
  },
  {
    id: "3",
    type: "alert",
    title: "Adverse Event Report",
    description: "Emily Rodriguez reported mild nausea with Semaglutide",
    timestamp: "3 hours ago",
    read: false,
    priority: "medium",
    actionLabel: "View Report",
  },
  {
    id: "4",
    type: "message",
    title: "New Patient Message",
    description: "James Wilson sent a question about injection technique",
    timestamp: "Yesterday",
    read: true,
    actionLabel: "Reply",
  },
  {
    id: "5",
    type: "system",
    title: "Lab Results Available",
    description: "New lab results uploaded for 3 patients",
    timestamp: "2 days ago",
    read: true,
    actionLabel: "View Labs",
  },
]

export const clinicNotifications: Notification[] = [
  {
    id: "1",
    type: "billing",
    title: "New Subscription Payment",
    description: "Monthly subscription payment of $499 received",
    timestamp: "2 hours ago",
    read: false,
    actionLabel: "View Invoice",
  },
  {
    id: "2",
    type: "alert",
    title: "Compliance Alert",
    description: "3 providers have consent forms expiring this week",
    timestamp: "4 hours ago",
    read: false,
    priority: "high",
    actionLabel: "Review",
  },
  {
    id: "3",
    type: "system",
    title: "New Provider Registration",
    description: "Dr. John Smith has registered and is pending approval",
    timestamp: "Yesterday",
    read: false,
    actionLabel: "Approve",
  },
  {
    id: "4",
    type: "order",
    title: "Low Inventory Alert",
    description: "BPC-157 10mg is running low (5 units remaining)",
    timestamp: "2 days ago",
    read: true,
    actionLabel: "Reorder",
  },
  {
    id: "5",
    type: "system",
    title: "Monthly Report Ready",
    description: "Your December 2024 analytics report is ready to view",
    timestamp: "1 week ago",
    read: true,
    actionLabel: "View Report",
  },
]
