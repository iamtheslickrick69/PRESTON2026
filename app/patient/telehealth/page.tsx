"use client"

export const dynamic = 'force-dynamic'

import { ProtectedRoute } from "@/components/protected-route"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Home, Calendar, Calculator, BookOpen, Phone, Activity, ShoppingCart, Package, Video, Mic, MicOff, VideoOff, PhoneOff, MessageSquare, Settings, Clock, User, Maximize2, Minimize2, CheckCircle, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useState, useEffect } from "react"
import { toast } from "sonner"
import Link from "next/link"

const myAppointments = [
  {
    id: "1",
    providerName: "Dr. Sarah Williams, NP",
    time: "2:00 PM",
    date: "Today",
    duration: "30 min",
    type: "Follow-up",
    status: "ready",
    notes: "Review BPC-157 progress, discuss any side effects",
  },
  {
    id: "2",
    providerName: "Dr. Sarah Williams, NP",
    time: "10:00 AM",
    date: "Jan 25, 2024",
    duration: "45 min",
    type: "Lab Review",
    status: "scheduled",
    notes: "Review latest blood work results",
  },
]

const mockChatMessages = [
  { id: 1, sender: "provider", text: "Hello! I'll be with you in just a moment.", time: "1:59 PM" },
  { id: 2, sender: "patient", text: "No problem, thank you!", time: "2:00 PM" },
]

const systemCheckItems = [
  { name: "Internet Connection", status: "pass", message: "Strong connection" },
  { name: "Camera", status: "pass", message: "Working" },
  { name: "Microphone", status: "pass", message: "Working" },
  { name: "Speaker", status: "pass", message: "Working" },
  { name: "Browser Permissions", status: "pass", message: "Granted" },
]

export default function PatientTelehealthPage() {
  const [inWaitingRoom, setInWaitingRoom] = useState(false)
  const [inCall, setInCall] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [isVideoOn, setIsVideoOn] = useState(true)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [showChat, setShowChat] = useState(false)
  const [callDuration, setCallDuration] = useState(0)
  const [chatMessage, setChatMessage] = useState("")
  const [chatMessages, setChatMessages] = useState(mockChatMessages)
  const [currentAppointment, setCurrentAppointment] = useState<typeof myAppointments[0] | null>(null)
  const [waitingTime, setWaitingTime] = useState(0)

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (inCall) {
      interval = setInterval(() => {
        setCallDuration((prev) => prev + 1)
      }, 1000)
    } else if (inWaitingRoom) {
      interval = setInterval(() => {
        setWaitingTime((prev) => prev + 1)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [inCall, inWaitingRoom])

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const joinWaitingRoom = (appointment: typeof myAppointments[0]) => {
    setCurrentAppointment(appointment)
    setInWaitingRoom(true)
    setWaitingTime(0)
    toast.success("You've joined the waiting room")

    // Simulate provider joining after 5 seconds
    setTimeout(() => {
      if (inWaitingRoom) {
        setInWaitingRoom(false)
        setInCall(true)
        setCallDuration(0)
        toast.success("Dr. Williams has started the call")
      }
    }, 5000)
  }

  const leaveWaitingRoom = () => {
    setInWaitingRoom(false)
    setCurrentAppointment(null)
    setWaitingTime(0)
    toast.info("You've left the waiting room")
  }

  const endCall = () => {
    setInCall(false)
    setCurrentAppointment(null)
    setIsMuted(false)
    setIsVideoOn(true)
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

  const sendChatMessage = () => {
    if (!chatMessage.trim()) return
    const newMessage = {
      id: chatMessages.length + 1,
      sender: "patient",
      text: chatMessage,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    }
    setChatMessages([...chatMessages, newMessage])
    setChatMessage("")
  }

  // Waiting Room View
  if (inWaitingRoom) {
    return (
      <ProtectedRoute allowedRoles={["patient"]}>
        <DashboardLayout>
          <div className="max-w-2xl mx-auto space-y-6">
            <Card className="border-2 border-primary">
              <CardHeader className="text-center">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <Clock className="w-8 h-8 text-primary animate-pulse" />
                </div>
                <CardTitle className="text-2xl">Waiting Room</CardTitle>
                <CardDescription>
                  Your provider will be with you shortly
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">Appointment with</p>
                  <p className="text-lg font-semibold">{currentAppointment?.providerName}</p>
                  <p className="text-sm text-muted-foreground">{currentAppointment?.type}</p>
                </div>

                <div className="text-center py-8 bg-muted rounded-lg">
                  <p className="text-sm text-muted-foreground mb-2">Time in waiting room</p>
                  <p className="text-4xl font-mono font-bold text-primary">{formatDuration(waitingTime)}</p>
                </div>

                {/* Self-preview */}
                <div className="space-y-2">
                  <p className="text-sm font-medium">Camera Preview</p>
                  <div className="aspect-video bg-gray-900 rounded-lg flex items-center justify-center">
                    {isVideoOn ? (
                      <div className="text-center">
                        <User className="w-16 h-16 text-gray-500 mx-auto" />
                        <p className="text-gray-400 text-sm mt-2">Your camera preview</p>
                      </div>
                    ) : (
                      <div className="text-center">
                        <VideoOff className="w-12 h-12 text-gray-500 mx-auto" />
                        <p className="text-gray-400 text-sm mt-2">Camera is off</p>
                      </div>
                    )}
                  </div>
                  <div className="flex justify-center gap-4 mt-4">
                    <Button
                      variant={isMuted ? "destructive" : "outline"}
                      onClick={toggleMute}
                    >
                      {isMuted ? <MicOff className="w-4 h-4 mr-2" /> : <Mic className="w-4 h-4 mr-2" />}
                      {isMuted ? "Unmute" : "Mute"}
                    </Button>
                    <Button
                      variant={isVideoOn ? "outline" : "destructive"}
                      onClick={toggleVideo}
                    >
                      {isVideoOn ? <Video className="w-4 h-4 mr-2" /> : <VideoOff className="w-4 h-4 mr-2" />}
                      {isVideoOn ? "Stop Video" : "Start Video"}
                    </Button>
                  </div>
                </div>

                <div className="flex justify-center">
                  <Button variant="destructive" onClick={leaveWaitingRoom}>
                    Leave Waiting Room
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </DashboardLayout>
      </ProtectedRoute>
    )
  }

  // In-Call View
  if (inCall) {
    return (
      <ProtectedRoute allowedRoles={["patient"]}>
        <DashboardLayout>
          <div className={`${isFullscreen ? "fixed inset-0 z-50 bg-gray-900" : "space-y-4"}`}>
            <div className={`${isFullscreen ? "h-full" : "h-[600px]"} bg-gray-900 rounded-lg overflow-hidden relative`}>
              {/* Main Video Area - Provider */}
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-b from-gray-800 to-gray-900">
                <div className="text-center">
                  <div className="w-32 h-32 mx-auto bg-blue-900 rounded-full flex items-center justify-center mb-4">
                    <User className="w-16 h-16 text-blue-300" />
                  </div>
                  <p className="text-white text-xl font-semibold">{currentAppointment?.providerName}</p>
                  <p className="text-gray-400 text-sm">Your Provider</p>
                </div>

                {/* Local Video (Patient - PiP) */}
                <div className="absolute bottom-24 right-4 w-48 h-36 bg-gray-800 rounded-lg border-2 border-gray-700 overflow-hidden">
                  {isVideoOn ? (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-b from-green-900 to-green-950">
                      <User className="w-12 h-12 text-green-300" />
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
                  <Badge variant="secondary" className="bg-green-600 text-white">
                    <span className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse" />
                    Connected
                  </Badge>
                  <span className="text-white text-sm font-mono">{formatDuration(callDuration)}</span>
                </div>

                {/* Chat Panel */}
                {showChat && (
                  <div className="absolute right-4 top-16 bottom-24 w-80 bg-white rounded-lg shadow-xl flex flex-col">
                    <div className="p-3 border-b flex items-center justify-between">
                      <h4 className="font-semibold">Chat with Provider</h4>
                      <Button variant="ghost" size="sm" onClick={() => setShowChat(false)}>
                        <Minimize2 className="w-4 h-4" />
                      </Button>
                    </div>
                    <ScrollArea className="flex-1 p-3">
                      <div className="space-y-3">
                        {chatMessages.map((msg) => (
                          <div
                            key={msg.id}
                            className={`flex ${msg.sender === "patient" ? "justify-end" : "justify-start"}`}
                          >
                            <div
                              className={`max-w-[80%] rounded-lg px-3 py-2 text-sm ${
                                msg.sender === "patient"
                                  ? "bg-primary text-primary-foreground"
                                  : "bg-gray-100 text-gray-900"
                              }`}
                            >
                              <p>{msg.text}</p>
                              <p className={`text-xs mt-1 ${msg.sender === "patient" ? "text-primary-foreground/70" : "text-gray-500"}`}>
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
          </div>
        </DashboardLayout>
      </ProtectedRoute>
    )
  }

  // Pre-Call Dashboard
  return (
    <ProtectedRoute allowedRoles={["patient"]}>
      <DashboardLayout>
        <div className="space-y-6">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Telehealth</h2>
            <p className="text-muted-foreground">Connect with your provider through secure video calls</p>
          </div>

          {/* Next Appointment Alert */}
          {myAppointments.some(a => a.status === "ready") && (
            <Alert className="border-green-200 bg-green-50">
              <Video className="h-4 w-4 text-green-600" />
              <AlertTitle className="text-green-800">Your appointment is ready!</AlertTitle>
              <AlertDescription className="text-green-700">
                Dr. Williams is ready to see you. Click &quot;Join Call&quot; to enter the waiting room.
              </AlertDescription>
            </Alert>
          )}

          {/* Upcoming Appointments */}
          <Card>
            <CardHeader>
              <CardTitle>My Telehealth Appointments</CardTitle>
              <CardDescription>View and join your upcoming virtual visits</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {myAppointments.map((appointment) => (
                  <div
                    key={appointment.id}
                    className={`flex flex-col md:flex-row md:items-center justify-between p-4 rounded-lg border gap-4 ${
                      appointment.status === "ready"
                        ? "border-green-200 bg-green-50"
                        : "border-gray-200"
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <Avatar className="w-12 h-12">
                        <AvatarFallback className="bg-primary text-primary-foreground">SW</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <h4 className="font-semibold">{appointment.providerName}</h4>
                          <Badge variant={appointment.status === "ready" ? "default" : "outline"}>
                            {appointment.status === "ready" ? "Ready to Join" : "Scheduled"}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {appointment.date} at {appointment.time} • {appointment.duration}
                        </p>
                        <p className="text-sm font-medium mt-1">{appointment.type}</p>
                        {appointment.notes && (
                          <p className="text-sm text-muted-foreground mt-1">{appointment.notes}</p>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-2 md:flex-col lg:flex-row">
                      {appointment.status === "ready" ? (
                        <Button onClick={() => joinWaitingRoom(appointment)}>
                          <Video className="w-4 h-4 mr-2" />
                          Join Call
                        </Button>
                      ) : (
                        <Button variant="outline" disabled>
                          <Clock className="w-4 h-4 mr-2" />
                          Not Yet
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* System Check */}
          <Card>
            <CardHeader>
              <CardTitle>System Check</CardTitle>
              <CardDescription>Make sure your device is ready for video calls</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-5">
                {systemCheckItems.map((item) => (
                  <div
                    key={item.name}
                    className={`flex items-center gap-3 p-3 rounded-lg border ${
                      item.status === "pass" ? "border-green-200 bg-green-50" : "border-red-200 bg-red-50"
                    }`}
                  >
                    {item.status === "pass" ? (
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                    ) : (
                      <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                    )}
                    <div>
                      <p className="text-sm font-medium">{item.name}</p>
                      <p className={`text-xs ${item.status === "pass" ? "text-green-600" : "text-red-600"}`}>
                        {item.message}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4">
                <Button variant="outline" size="sm">
                  <Settings className="w-4 h-4 mr-2" />
                  Test Audio & Video
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Tips */}
          <Card>
            <CardHeader>
              <CardTitle>Tips for a Great Video Visit</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="grid gap-3 md:grid-cols-2 text-sm">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Find a quiet, well-lit space with a stable internet connection</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Have your current medications and any questions ready</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Test your camera and microphone before the appointment</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Join the waiting room 5 minutes before your scheduled time</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* No Appointments */}
          {myAppointments.length === 0 && (
            <Card>
              <CardContent className="p-12 text-center">
                <Video className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No Upcoming Appointments</h3>
                <p className="text-muted-foreground mb-4">Schedule a telehealth visit with your provider</p>
                <Link href="/patient/schedule">
                  <Button>
                    <Calendar className="w-4 h-4 mr-2" />
                    Schedule Appointment
                  </Button>
                </Link>
              </CardContent>
            </Card>
          )}
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  )
}
