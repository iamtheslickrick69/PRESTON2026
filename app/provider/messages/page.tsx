"use client"

export const dynamic = 'force-dynamic'

import { useState, useRef, useEffect } from "react"
import { ProtectedRoute } from "@/components/protected-route"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Users,
  Activity,
  Calendar,
  ShoppingCart,
  BookOpen,
  Calculator,
  FileText,
  BarChart,
  MessageSquare,
  Send,
  Paperclip,
  Search,
  MoreVertical,
  Check,
  CheckCheck,
  Clock,
  Lock,
  Image as ImageIcon,
  AlertCircle,
  Star,
  Filter,
} from "lucide-react"
import Link from "next/link"

const patientConversations = [
  {
    id: "conv-1",
    patient: {
      id: "P-001234",
      name: "Sarah Johnson",
      avatar: null,
      initials: "SJ",
      status: "online",
    },
    activePeptides: ["BPC-157", "TB-500"],
    lastMessage: "My knee pain has definitely improved - probably about 60% better than before.",
    lastMessageTime: "10:25 AM",
    unreadCount: 1,
    isUrgent: false,
    isStarred: true,
  },
  {
    id: "conv-2",
    patient: {
      id: "P-001235",
      name: "Michael Chen",
      avatar: null,
      initials: "MC",
      status: "offline",
    },
    activePeptides: ["Semaglutide"],
    lastMessage: "I've been experiencing some nausea after my last dose. Is this normal?",
    lastMessageTime: "9:45 AM",
    unreadCount: 2,
    isUrgent: true,
    isStarred: false,
  },
  {
    id: "conv-3",
    patient: {
      id: "P-001236",
      name: "Emily Rodriguez",
      avatar: null,
      initials: "ER",
      status: "online",
    },
    activePeptides: ["CJC-1295", "Ipamorelin"],
    lastMessage: "Thanks for the lab review! I'll schedule a follow-up.",
    lastMessageTime: "Yesterday",
    unreadCount: 0,
    isUrgent: false,
    isStarred: false,
  },
  {
    id: "conv-4",
    patient: {
      id: "P-001237",
      name: "James Wilson",
      avatar: null,
      initials: "JW",
      status: "offline",
    },
    activePeptides: ["BPC-157", "PT-141"],
    lastMessage: "Just wanted to confirm my appointment for tomorrow.",
    lastMessageTime: "Yesterday",
    unreadCount: 0,
    isUrgent: false,
    isStarred: true,
  },
  {
    id: "conv-5",
    patient: {
      id: "P-001238",
      name: "Amanda Foster",
      avatar: null,
      initials: "AF",
      status: "offline",
    },
    activePeptides: ["Tirzepatide"],
    lastMessage: "I received my order today. Thank you!",
    lastMessageTime: "Jan 25",
    unreadCount: 0,
    isUrgent: false,
    isStarred: false,
  },
]

const mockMessages = [
  {
    id: "msg-1",
    senderId: "provider",
    content: "Good morning Sarah! I wanted to check in on how you're doing with the new BPC-157 protocol.",
    timestamp: "10:15 AM",
    status: "read",
  },
  {
    id: "msg-2",
    senderId: "patient",
    content: "Hi Dr. Johnson! Things are going well. I've been following the dosing schedule you recommended - 250mcg twice daily.",
    timestamp: "10:20 AM",
    status: "read",
  },
  {
    id: "msg-3",
    senderId: "provider",
    content: "That's great to hear! Have you noticed any changes in your symptoms? Any side effects?",
    timestamp: "10:22 AM",
    status: "read",
  },
  {
    id: "msg-4",
    senderId: "patient",
    content: "My knee pain has definitely improved - probably about 60% better than before. No real side effects other than some mild redness at the injection site which goes away quickly.",
    timestamp: "10:25 AM",
    status: "read",
  },
]

export default function ProviderMessagesPage() {
  const [selectedConversation, setSelectedConversation] = useState(patientConversations[0])
  const [messages, setMessages] = useState(mockMessages)
  const [newMessage, setNewMessage] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const [filter, setFilter] = useState("all")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = () => {
    if (!newMessage.trim()) return

    const message = {
      id: `msg-${Date.now()}`,
      senderId: "provider",
      content: newMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      status: "sending",
    }

    setMessages([...messages, message])
    setNewMessage("")

    setTimeout(() => {
      setMessages((prev) =>
        prev.map((m) => (m.id === message.id ? { ...m, status: "delivered" } : m))
      )
    }, 1000)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const filteredConversations = patientConversations.filter((conv) => {
    const matchesSearch = conv.patient.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesFilter =
      filter === "all" ||
      (filter === "unread" && conv.unreadCount > 0) ||
      (filter === "urgent" && conv.isUrgent) ||
      (filter === "starred" && conv.isStarred)
    return matchesSearch && matchesFilter
  })

  const totalUnread = patientConversations.reduce((sum, conv) => sum + conv.unreadCount, 0)
  const urgentCount = patientConversations.filter((c) => c.isUrgent).length

  return (
    <ProtectedRoute allowedRoles={["provider"]}>
      <DashboardLayout>
        <div className="h-[calc(100vh-180px)] flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">Patient Messages</h2>
              <p className="text-muted-foreground">
                {totalUnread} unread messages • {urgentCount} urgent
              </p>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Lock className="w-4 h-4" />
              <span>HIPAA Compliant</span>
            </div>
          </div>

          <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-4 min-h-0">
            {/* Conversations List */}
            <Card className="lg:col-span-1 flex flex-col">
              <CardHeader className="pb-2 space-y-3">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search patients..."
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Select value={filter} onValueChange={setFilter}>
                  <SelectTrigger>
                    <Filter className="w-4 h-4 mr-2" />
                    <SelectValue placeholder="Filter" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Messages</SelectItem>
                    <SelectItem value="unread">Unread ({totalUnread})</SelectItem>
                    <SelectItem value="urgent">Urgent ({urgentCount})</SelectItem>
                    <SelectItem value="starred">Starred</SelectItem>
                  </SelectContent>
                </Select>
              </CardHeader>
              <CardContent className="flex-1 p-0 overflow-hidden">
                <ScrollArea className="h-full">
                  <div className="p-2">
                    {filteredConversations.map((conv) => (
                      <div
                        key={conv.id}
                        className={`flex items-start gap-3 p-3 rounded-lg cursor-pointer transition-colors ${
                          selectedConversation.id === conv.id
                            ? "bg-primary/10"
                            : "hover:bg-muted"
                        }`}
                        onClick={() => setSelectedConversation(conv)}
                      >
                        <div className="relative">
                          <Avatar>
                            <AvatarFallback>{conv.patient.initials}</AvatarFallback>
                          </Avatar>
                          {conv.patient.status === "online" && (
                            <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-background rounded-full" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-1">
                              <p className="font-medium truncate">{conv.patient.name}</p>
                              {conv.isStarred && (
                                <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                              )}
                              {conv.isUrgent && (
                                <AlertCircle className="w-3 h-3 text-red-500" />
                              )}
                            </div>
                            <span className="text-xs text-muted-foreground">
                              {conv.lastMessageTime}
                            </span>
                          </div>
                          <div className="flex gap-1 mt-1">
                            {conv.activePeptides.slice(0, 2).map((p) => (
                              <Badge key={p} variant="outline" className="text-xs px-1.5 py-0">
                                {p}
                              </Badge>
                            ))}
                            {conv.activePeptides.length > 2 && (
                              <Badge variant="outline" className="text-xs px-1.5 py-0">
                                +{conv.activePeptides.length - 2}
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground truncate mt-1">
                            {conv.lastMessage}
                          </p>
                        </div>
                        {conv.unreadCount > 0 && (
                          <Badge className="rounded-full">{conv.unreadCount}</Badge>
                        )}
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>

            {/* Chat Area */}
            <Card className="lg:col-span-2 flex flex-col">
              {/* Chat Header */}
              <CardHeader className="pb-3 border-b">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback>{selectedConversation.patient.initials}</AvatarFallback>
                      </Avatar>
                      {selectedConversation.patient.status === "online" && (
                        <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-background rounded-full" />
                      )}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-semibold">{selectedConversation.patient.name}</p>
                        <span className="text-xs text-muted-foreground">
                          ({selectedConversation.patient.id})
                        </span>
                        {selectedConversation.isUrgent && (
                          <Badge variant="destructive" className="text-xs">Urgent</Badge>
                        )}
                      </div>
                      <div className="flex gap-1">
                        {selectedConversation.activePeptides.map((p) => (
                          <Badge key={p} variant="secondary" className="text-xs">
                            {p}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Link href={`/provider/patients/${selectedConversation.patient.id}`}>
                      <Button variant="outline" size="sm">View Chart</Button>
                    </Link>
                    <Button variant="ghost" size="icon">
                      <Star
                        className={`h-4 w-4 ${
                          selectedConversation.isStarred
                            ? "fill-yellow-400 text-yellow-400"
                            : ""
                        }`}
                      />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>

              {/* Messages */}
              <CardContent className="flex-1 p-0 overflow-hidden">
                <ScrollArea className="h-full p-4">
                  <div className="space-y-4">
                    {/* Date Separator */}
                    <div className="flex items-center gap-4 my-4">
                      <Separator className="flex-1" />
                      <span className="text-xs text-muted-foreground">Today</span>
                      <Separator className="flex-1" />
                    </div>

                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${
                          message.senderId === "provider" ? "justify-end" : "justify-start"
                        }`}
                      >
                        <div
                          className={`max-w-[70%] rounded-lg px-4 py-2 ${
                            message.senderId === "provider"
                              ? "bg-primary text-primary-foreground"
                              : "bg-muted"
                          }`}
                        >
                          <p className="text-sm">{message.content}</p>
                          <div
                            className={`flex items-center justify-end gap-1 mt-1 ${
                              message.senderId === "provider"
                                ? "text-primary-foreground/70"
                                : "text-muted-foreground"
                            }`}
                          >
                            <span className="text-xs">{message.timestamp}</span>
                            {message.senderId === "provider" && (
                              <>
                                {message.status === "sending" && (
                                  <Clock className="w-3 h-3" />
                                )}
                                {message.status === "delivered" && (
                                  <Check className="w-3 h-3" />
                                )}
                                {message.status === "read" && (
                                  <CheckCheck className="w-3 h-3" />
                                )}
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                    <div ref={messagesEndRef} />
                  </div>
                </ScrollArea>
              </CardContent>

              {/* Message Input */}
              <div className="p-4 border-t">
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon">
                    <Paperclip className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <ImageIcon className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <FileText className="h-4 w-4" />
                  </Button>
                  <Input
                    placeholder="Type a message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="flex-1"
                  />
                  <Button onClick={handleSendMessage} disabled={!newMessage.trim()}>
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <p className="text-xs text-muted-foreground">
                    Press Enter to send, Shift+Enter for new line
                  </p>
                  <p className="text-xs text-muted-foreground">
                    All messages are logged for compliance
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  )
}
