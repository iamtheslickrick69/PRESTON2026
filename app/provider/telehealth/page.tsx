"use client"

export const dynamic = 'force-dynamic'

import { ProtectedRoute } from "@/components/protected-route"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Activity, Calendar, ShoppingCart, BookOpen, Calculator, FileText, BarChart, Video, Mic, MicOff, VideoOff, Phone, PhoneOff, Monitor, MessageSquare, Settings, Clock, User, Maximize2, Minimize2, MoreVertical } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useState, useEffect } from "react"
import { toast } from "sonner"

const upcomingAppointments = [
  {
    id: "1",
    patientName: "Sarah Johnson",
    patientId: "P001",
    time: "2:00 PM",
    duration: "30 min",
    type: "Follow-up",
    status: "ready",
  },
  {
    id: "2",
    patientName: "Michael Chen",
    patientId: "P002",
    time: "2:45 PM",
    duration: "45 min",
    type: "Initial Consultation",
    status: "waiting",
  },
  {
    id: "3",
    patientName: "Emily Rodriguez",
    patientId: "P003",
    time: "3:30 PM",
    duration: "30 min",
    type: "Dose Adjustment",
    status: "scheduled",
  },
]

const mockChatMessages = [
  { id: 1, sender: "patient", text: "Hi Dr. Williams, I'm ready for the call.", time: "1:58 PM" },
  { id: 2, sender: "provider", text: "Great! Starting the video now.", time: "2:00 PM" },
]

export default function ProviderTelehealthPage() {
  const [inCall, setInCall] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [isVideoOn, setIsVideoOn] = useState(true)
  const [isScreenSharing, setIsScreenSharing] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [showChat, setShowChat] = useState(false)
  const [callDuration, setCallDuration] = useState(0)
  const [chatMessage, setChatMessage] = useState("")
  const [chatMessages, setChatMessages] = useState(mockChatMessages)
  const [currentPatient, setCurrentPatient] = useState<typeof upcomingAppointments[0] | null>(null)

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (inCall) {
      interval = setInterval(() => {
        setCallDuration((prev) => prev + 1)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [inCall])

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const startCall = (appointment: typeof upcomingAppointments[0]) => {
    setCurrentPatient(appointment)
    setInCall(true)
    setCallDuration(0)
    toast.success(`Starting call with ${appointment.patientName}`)
  }

  const endCall = () => {
    setInCall(false)
    setCurrentPatient(null)
    setIsMuted(false)
    setIsVideoOn(true)
    setIsScreenSharing(false)
    setShowChat(false)
    setCallDuration(0)
    toast.info("Call ended")
  }

  const toggleMute = () => {
    setIsMuted(!isMuted)
    toast.info(isMuted ? "Microphone unmuted" : "Microphone muted")
  }

  const toggleVideo = () => {
    setIsVideoOn(!isVideoOn)
    toast.info(isVideoOn ? "Camera off" : "Camera on")
  }

  const toggleScreenShare = () => {
    setIsScreenSharing(!isScreenSharing)
    toast.info(isScreenSharing ? "Screen sharing stopped" : "Screen sharing started")
  }

  const sendChatMessage = () => {
    if (!chatMessage.trim()) return
    const newMessage = {
      id: chatMessages.length + 1,
      sender: "provider",
      text: chatMessage,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    }
    setChatMessages([...chatMessages, newMessage])
    setChatMessage("")
  }

  return (
    <ProtectedRoute allowedRoles={["provider"]}>
      <DashboardLayout>
        {inCall ? (
          /* In-Call View */
          <div className={`${isFullscreen ? "fixed inset-0 z-50 bg-gray-900" : "space-y-4"}`}>
            <div className={`${isFullscreen ? "h-full" : "h-[600px]"} bg-gray-900 rounded-lg overflow-hidden relative`}>
              {/* Main Video Area */}
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-b from-gray-800 to-gray-900">
                {/* Remote Video (Patient) */}
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-32 h-32 mx-auto bg-gray-700 rounded-full flex items-center justify-center mb-4">
                      <User className="w-16 h-16 text-gray-500" />
                    </div>
                    <p className="text-white text-xl font-semibold">{currentPatient?.patientName}</p>
                    <p className="text-gray-400 text-sm">{currentPatient?.type}</p>
                  </div>
                </div>

                {/* Local Video (Provider - PiP) */}
                <div className="absolute bottom-24 right-4 w-48 h-36 bg-gray-800 rounded-lg border-2 border-gray-700 overflow-hidden">
                  {isVideoOn ? (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-b from-blue-900 to-blue-950">
                      <User className="w-12 h-12 text-blue-300" />
                    </div>
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <VideoOff className="w-8 h-8 text-gray-500" />
                    </div>
                  )}
                  <div className="absolute bottom-2 left-2 text-xs text-white bg-black/50 px-2 py-1 rounded">
                    You
                  </div>
                </div>

                {/* Call Info */}
                <div className="absolute top-4 left-4 flex items-center gap-4">
                  <Badge variant="secondary" className="bg-red-600 text-white">
                    <span className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse" />
                    LIVE
                  </Badge>
                  <span className="text-white text-sm font-mono">{formatDuration(callDuration)}</span>
                </div>

                {/* Screen Share Indicator */}
                {isScreenSharing && (
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-green-600 text-white">
                      <Monitor className="w-3 h-3 mr-1" />
                      Sharing Screen
                    </Badge>
                  </div>
                )}

                {/* Chat Panel */}
                {showChat && (
                  <div className="absolute right-4 top-16 bottom-24 w-80 bg-white rounded-lg shadow-xl flex flex-col">
                    <div className="p-3 border-b flex items-center justify-between">
                      <h4 className="font-semibold">Chat</h4>
                      <Button variant="ghost" size="sm" onClick={() => setShowChat(false)}>
                        <Minimize2 className="w-4 h-4" />
                      </Button>
                    </div>
                    <ScrollArea className="flex-1 p-3">
                      <div className="space-y-3">
                        {chatMessages.map((msg) => (
                          <div
                            key={msg.id}
                            className={`flex ${msg.sender === "provider" ? "justify-end" : "justify-start"}`}
                          >
                            <div
                              className={`max-w-[80%] rounded-lg px-3 py-2 text-sm ${
                                msg.sender === "provider"
                                  ? "bg-primary text-primary-foreground"
                                  : "bg-gray-100 text-gray-900"
                              }`}
                            >
                              <p>{msg.text}</p>
                              <p className={`text-xs mt-1 ${msg.sender === "provider" ? "text-primary-foreground/70" : "text-gray-500"}`}>
                                {msg.time}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                    <div className="p-3 border-t">
                      <div className="flex gap-2">
                        <Input
                          placeholder="Type a message..."
                          value={chatMessage}
                          onChange={(e) => setChatMessage(e.target.value)}
                          onKeyPress={(e) => e.key === "Enter" && sendChatMessage()}
                        />
                        <Button size="sm" onClick={sendChatMessage}>Send</Button>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Control Bar */}
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                <div className="flex items-center justify-center gap-3">
                  <Button
                    variant={isMuted ? "destructive" : "secondary"}
                    size="lg"
                    className="rounded-full w-14 h-14"
                    onClick={toggleMute}
                  >
                    {isMuted ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
                  </Button>

                  <Button
                    variant={isVideoOn ? "secondary" : "destructive"}
                    size="lg"
                    className="rounded-full w-14 h-14"
                    onClick={toggleVideo}
                  >
                    {isVideoOn ? <Video className="w-6 h-6" /> : <VideoOff className="w-6 h-6" />}
                  </Button>

                  <Button
                    variant={isScreenSharing ? "default" : "secondary"}
                    size="lg"
                    className="rounded-full w-14 h-14"
                    onClick={toggleScreenShare}
                  >
                    <Monitor className="w-6 h-6" />
                  </Button>

                  <Button
                    variant={showChat ? "default" : "secondary"}
                    size="lg"
                    className="rounded-full w-14 h-14"
                    onClick={() => setShowChat(!showChat)}
                  >
                    <MessageSquare className="w-6 h-6" />
                  </Button>

                  <Button
                    variant="destructive"
                    size="lg"
                    className="rounded-full w-14 h-14"
                    onClick={endCall}
                  >
                    <PhoneOff className="w-6 h-6" />
                  </Button>

                  <Button
                    variant="secondary"
                    size="lg"
                    className="rounded-full w-14 h-14"
                    onClick={() => setIsFullscreen(!isFullscreen)}
                  >
                    {isFullscreen ? <Minimize2 className="w-6 h-6" /> : <Maximize2 className="w-6 h-6" />}
                  </Button>
                </div>
              </div>
            </div>

            {/* Patient Notes Panel (Only visible when not fullscreen) */}
            {!isFullscreen && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Quick Notes - {currentPatient?.patientName}</CardTitle>
                </CardHeader>
                <CardContent>
                  <textarea
                    className="w-full h-24 p-3 border rounded-lg resize-none text-sm"
                    placeholder="Take notes during the call..."
                  />
                  <div className="flex justify-end gap-2 mt-2">
                    <Button variant="outline" size="sm">Save Draft</Button>
                    <Button size="sm">Add to Chart</Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        ) : (
          /* Pre-Call Dashboard */
          <div className="space-y-6">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">Telehealth</h2>
              <p className="text-muted-foreground">Manage your virtual appointments</p>
            </div>

            {/* Quick Stats */}
            <div className="grid gap-4 md:grid-cols-3">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <Video className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">{upcomingAppointments.filter(a => a.status === "ready").length}</p>
                      <p className="text-sm text-muted-foreground">Ready to Start</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-yellow-100 rounded-lg">
                      <Clock className="w-5 h-5 text-yellow-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">{upcomingAppointments.filter(a => a.status === "waiting").length}</p>
                      <p className="text-sm text-muted-foreground">Patients Waiting</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <Calendar className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">{upcomingAppointments.length}</p>
                      <p className="text-sm text-muted-foreground">Today&apos;s Appointments</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Upcoming Appointments */}
            <Card>
              <CardHeader>
                <CardTitle>Today&apos;s Telehealth Appointments</CardTitle>
                <CardDescription>Click &quot;Start Call&quot; when ready to begin</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingAppointments.map((appointment) => (
                    <div
                      key={appointment.id}
                      className={`flex items-center justify-between p-4 rounded-lg border ${
                        appointment.status === "ready"
                          ? "border-green-200 bg-green-50"
                          : appointment.status === "waiting"
                          ? "border-yellow-200 bg-yellow-50"
                          : "border-gray-200"
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <Avatar className="w-12 h-12">
                          <AvatarFallback>{appointment.patientName.split(" ").map(n => n[0]).join("")}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-semibold">{appointment.patientName}</h4>
                            <Badge variant={appointment.status === "ready" ? "default" : appointment.status === "waiting" ? "secondary" : "outline"}>
                              {appointment.status === "ready" ? "Ready" : appointment.status === "waiting" ? "In Waiting Room" : "Scheduled"}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {appointment.time} • {appointment.duration} • {appointment.type}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">
                          View Chart
                        </Button>
                        <Button
                          size="sm"
                          disabled={appointment.status === "scheduled"}
                          onClick={() => startCall(appointment)}
                        >
                          <Video className="w-4 h-4 mr-2" />
                          {appointment.status === "ready" || appointment.status === "waiting" ? "Start Call" : "Not Ready"}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Settings */}
            <Card>
              <CardHeader>
                <CardTitle>Call Settings</CardTitle>
                <CardDescription>Configure your audio and video preferences</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Camera</label>
                    <select className="w-full p-2 border rounded-lg text-sm">
                      <option>FaceTime HD Camera</option>
                      <option>External Webcam</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Microphone</label>
                    <select className="w-full p-2 border rounded-lg text-sm">
                      <option>Built-in Microphone</option>
                      <option>External Microphone</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Speaker</label>
                    <select className="w-full p-2 border rounded-lg text-sm">
                      <option>Built-in Speaker</option>
                      <option>External Speaker</option>
                    </select>
                  </div>
                </div>
                <div className="mt-4">
                  <Button variant="outline" size="sm">
                    <Settings className="w-4 h-4 mr-2" />
                    Test Audio & Video
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </DashboardLayout>
    </ProtectedRoute>
  )
}
