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
  Activity,
  ShoppingCart,
  Package,
  Home,
  Calculator,
  Calendar,
  BookOpen,
  Phone,
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
  FileText,
} from "lucide-react"

const conversations = [
  {
    id: "conv-1",
    provider: {
      name: "Dr. Sarah Johnson",
      title: "NP",
      avatar: null,
      initials: "SJ",
      status: "online",
    },
    lastMessage: "Your lab results look great! The BPC-157 seems to be working well.",
    lastMessageTime: "10:32 AM",
    unreadCount: 2,
    isTyping: false,
  },
  {
    id: "conv-2",
    provider: {
      name: "Dr. Michael Chen",
      title: "MD",
      avatar: null,
      initials: "MC",
      status: "offline",
    },
    lastMessage: "Remember to take your dose before meals.",
    lastMessageTime: "Yesterday",
    unreadCount: 0,
    isTyping: false,
  },
  {
    id: "conv-3",
    provider: {
      name: "Clinic Support",
      title: "Support Team",
      avatar: null,
      initials: "CS",
      status: "online",
    },
    lastMessage: "Your order has been shipped! Tracking number: 1Z999AA1...",
    lastMessageTime: "Jan 25",
    unreadCount: 0,
    isTyping: false,
  },
]

const mockMessages = [
  {
    id: "msg-1",
    senderId: "provider",
    content: "Good morning! I wanted to check in on how you're doing with the new BPC-157 protocol.",
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
  {
    id: "msg-5",
    senderId: "provider",
    content: "Excellent progress! Mild injection site reactions are completely normal and typically resolve within 15-30 minutes. That 60% improvement is very encouraging at this stage.",
    timestamp: "10:28 AM",
    status: "read",
  },
  {
    id: "msg-6",
    senderId: "provider",
    content: "Your lab results look great! The BPC-157 seems to be working well. I'd recommend continuing with the current protocol for another 2 weeks, then we can reassess.",
    timestamp: "10:32 AM",
    status: "delivered",
  },
]

export default function PatientMessagesPage() {
  const [selectedConversation, setSelectedConversation] = useState(conversations[0])
  const [messages, setMessages] = useState(mockMessages)
  const [newMessage, setNewMessage] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
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
      senderId: "patient",
      content: newMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      status: "sending",
    }

    setMessages([...messages, message])
    setNewMessage("")

    // Simulate message being sent
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

  const filteredConversations = conversations.filter((conv) =>
    conv.provider.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <ProtectedRoute allowedRoles={["patient"]}>
      <DashboardLayout>
        <div className="h-[calc(100vh-180px)] flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">Messages</h2>
              <p className="text-muted-foreground">Secure messaging with your care team</p>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Lock className="w-4 h-4" />
              <span>End-to-end encrypted</span>
            </div>
          </div>

          <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-4 min-h-0">
            {/* Conversations List */}
            <Card className="lg:col-span-1 flex flex-col">
              <CardHeader className="pb-2">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search conversations..."
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
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
                            <AvatarFallback>{conv.provider.initials}</AvatarFallback>
                          </Avatar>
                          {conv.provider.status === "online" && (
                            <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-background rounded-full" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <p className="font-medium truncate">
                              {conv.provider.name}
                            </p>
                            <span className="text-xs text-muted-foreground">
                              {conv.lastMessageTime}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground truncate">
                            {conv.isTyping ? (
                              <span className="text-primary">typing...</span>
                            ) : (
                              conv.lastMessage
                            )}
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
                      <Avatar>
                        <AvatarFallback>{selectedConversation.provider.initials}</AvatarFallback>
                      </Avatar>
                      {selectedConversation.provider.status === "online" && (
                        <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-background rounded-full" />
                      )}
                    </div>
                    <div>
                      <p className="font-semibold">{selectedConversation.provider.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {selectedConversation.provider.status === "online"
                          ? "Online"
                          : "Last seen yesterday"}
                      </p>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
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
                          message.senderId === "patient" ? "justify-end" : "justify-start"
                        }`}
                      >
                        <div
                          className={`max-w-[70%] rounded-lg px-4 py-2 ${
                            message.senderId === "patient"
                              ? "bg-primary text-primary-foreground"
                              : "bg-muted"
                          }`}
                        >
                          <p className="text-sm">{message.content}</p>
                          <div
                            className={`flex items-center justify-end gap-1 mt-1 ${
                              message.senderId === "patient"
                                ? "text-primary-foreground/70"
                                : "text-muted-foreground"
                            }`}
                          >
                            <span className="text-xs">{message.timestamp}</span>
                            {message.senderId === "patient" && (
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
                <p className="text-xs text-muted-foreground mt-2 text-center">
                  Messages are HIPAA-compliant and encrypted. Do not share sensitive information like SSN or credit card numbers.
                </p>
              </div>
            </Card>
          </div>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  )
}
