"use client"

export const dynamic = 'force-dynamic'

import { useState } from "react"
import { ProtectedRoute } from "@/components/protected-route"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Users,
  Activity,
  Calendar as CalendarIcon,
  ShoppingCart,
  BookOpen,
  Calculator,
  FileText,
  BarChart,
  Clock,
  Video,
  MapPin,
  User,
  Phone,
  Mail,
  ChevronLeft,
  ChevronRight,
  Plus,
} from "lucide-react"
import Link from "next/link"

// Mock appointments data
const appointments = [
  {
    id: "APT-001",
    patientId: "P-001234",
    patientName: "Sarah Johnson",
    patientEmail: "sarah.j@email.com",
    patientPhone: "(555) 123-4567",
    date: "2024-02-05",
    time: "09:00",
    duration: 30,
    type: "Follow-up",
    status: "confirmed",
    location: "telehealth",
    notes: "Review BPC-157 progress, check injection site",
    activePeptides: ["BPC-157", "TB-500"],
  },
  {
    id: "APT-002",
    patientId: "P-001235",
    patientName: "Michael Chen",
    patientEmail: "m.chen@email.com",
    patientPhone: "(555) 234-5678",
    date: "2024-02-05",
    time: "10:00",
    duration: 45,
    type: "Initial Consultation",
    status: "confirmed",
    location: "in-person",
    notes: "New patient - interested in weight management peptides",
    activePeptides: [],
  },
  {
    id: "APT-003",
    patientId: "P-001236",
    patientName: "Emily Rodriguez",
    patientEmail: "e.rodriguez@email.com",
    patientPhone: "(555) 345-6789",
    date: "2024-02-05",
    time: "11:00",
    duration: 30,
    type: "Lab Review",
    status: "confirmed",
    location: "telehealth",
    notes: "Review recent hormone panel results",
    activePeptides: ["CJC-1295", "Ipamorelin"],
  },
  {
    id: "APT-004",
    patientId: "P-001237",
    patientName: "James Wilson",
    patientEmail: "j.wilson@email.com",
    patientPhone: "(555) 456-7890",
    date: "2024-02-05",
    time: "14:00",
    duration: 30,
    type: "Follow-up",
    status: "pending",
    location: "telehealth",
    notes: "Check Semaglutide response, discuss dosing adjustment",
    activePeptides: ["Semaglutide"],
  },
  {
    id: "APT-005",
    patientId: "P-001238",
    patientName: "Amanda Foster",
    patientEmail: "a.foster@email.com",
    patientPhone: "(555) 567-8901",
    date: "2024-02-05",
    time: "15:30",
    duration: 60,
    type: "Treatment Planning",
    status: "confirmed",
    location: "in-person",
    notes: "Develop comprehensive peptide therapy plan",
    activePeptides: ["Tirzepatide"],
  },
  {
    id: "APT-006",
    patientId: "P-001239",
    patientName: "Robert Martinez",
    patientEmail: "r.martinez@email.com",
    patientPhone: "(555) 678-9012",
    date: "2024-02-06",
    time: "09:30",
    duration: 30,
    type: "Follow-up",
    status: "confirmed",
    location: "telehealth",
    notes: "2-week check-in on new protocol",
    activePeptides: ["BPC-157"],
  },
  {
    id: "APT-007",
    patientId: "P-001240",
    patientName: "Jennifer Lee",
    patientEmail: "j.lee@email.com",
    patientPhone: "(555) 789-0123",
    date: "2024-02-07",
    time: "11:00",
    duration: 45,
    type: "Initial Consultation",
    status: "pending",
    location: "in-person",
    notes: "Referral from Dr. Smith - gut health concerns",
    activePeptides: [],
  },
]

const timeSlots = [
  "08:00", "08:30", "09:00", "09:30", "10:00", "10:30",
  "11:00", "11:30", "12:00", "12:30", "13:00", "13:30",
  "14:00", "14:30", "15:00", "15:30", "16:00", "16:30",
  "17:00"
]

const appointmentTypes = [
  { value: "follow-up", label: "Follow-up", color: "bg-blue-100 text-blue-800" },
  { value: "initial", label: "Initial Consultation", color: "bg-green-100 text-green-800" },
  { value: "lab-review", label: "Lab Review", color: "bg-purple-100 text-purple-800" },
  { value: "treatment-planning", label: "Treatment Planning", color: "bg-amber-100 text-amber-800" },
]

function getAppointmentTypeStyle(type: string) {
  const typeMap: Record<string, string> = {
    "Follow-up": "bg-blue-100 text-blue-800 border-blue-200",
    "Initial Consultation": "bg-green-100 text-green-800 border-green-200",
    "Lab Review": "bg-purple-100 text-purple-800 border-purple-200",
    "Treatment Planning": "bg-amber-100 text-amber-800 border-amber-200",
  }
  return typeMap[type] || "bg-gray-100 text-gray-800 border-gray-200"
}

export default function ProviderSchedulePage() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date(2024, 1, 5))
  const [viewMode, setViewMode] = useState<"day" | "week">("day")
  const [selectedAppointment, setSelectedAppointment] = useState<typeof appointments[0] | null>(null)

  const formattedSelectedDate = selectedDate
    ? selectedDate.toISOString().split("T")[0]
    : ""

  const todaysAppointments = appointments.filter(
    (apt) => apt.date === formattedSelectedDate
  )

  const upcomingAppointments = appointments
    .filter((apt) => apt.date >= formattedSelectedDate)
    .slice(0, 5)

  // Get dates that have appointments for calendar highlighting
  const appointmentDates = [...new Set(appointments.map(apt => apt.date))]

  return (
    <ProtectedRoute allowedRoles={["provider"]}>
      <DashboardLayout>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">Schedule</h2>
              <p className="text-muted-foreground">Manage your appointments and patient visits</p>
            </div>
            <div className="flex items-center gap-3">
              <Select value={viewMode} onValueChange={(v) => setViewMode(v as "day" | "week")}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="day">Day View</SelectItem>
                  <SelectItem value="week">Week View</SelectItem>
                </SelectContent>
              </Select>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                New Appointment
              </Button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid gap-4 md:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Today's Appointments</CardTitle>
                <CalendarIcon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{todaysAppointments.length}</div>
                <p className="text-xs text-muted-foreground">
                  {todaysAppointments.filter(a => a.status === "confirmed").length} confirmed
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">This Week</CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{appointments.length}</div>
                <p className="text-xs text-muted-foreground">Total scheduled</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Telehealth</CardTitle>
                <Video className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {appointments.filter(a => a.location === "telehealth").length}
                </div>
                <p className="text-xs text-muted-foreground">Virtual visits</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">In-Person</CardTitle>
                <MapPin className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {appointments.filter(a => a.location === "in-person").length}
                </div>
                <p className="text-xs text-muted-foreground">Clinic visits</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {/* Calendar & Day Schedule */}
            <div className="lg:col-span-2 space-y-6">
              {/* Mini Calendar */}
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle>
                      {selectedDate?.toLocaleDateString("en-US", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </CardTitle>
                    <div className="flex gap-1">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => {
                          if (selectedDate) {
                            const newDate = new Date(selectedDate)
                            newDate.setDate(newDate.getDate() - 1)
                            setSelectedDate(newDate)
                          }
                        }}
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedDate(new Date())}
                      >
                        Today
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => {
                          if (selectedDate) {
                            const newDate = new Date(selectedDate)
                            newDate.setDate(newDate.getDate() + 1)
                            setSelectedDate(newDate)
                          }
                        }}
                      >
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    className="rounded-md border"
                    modifiers={{
                      hasAppointment: (date) =>
                        appointmentDates.includes(date.toISOString().split("T")[0]),
                    }}
                    modifiersStyles={{
                      hasAppointment: {
                        fontWeight: "bold",
                        textDecoration: "underline",
                        textDecorationColor: "#3b82f6",
                      },
                    }}
                  />
                </CardContent>
              </Card>

              {/* Day Schedule */}
              <Card>
                <CardHeader>
                  <CardTitle>Day Schedule</CardTitle>
                  <CardDescription>
                    {todaysAppointments.length} appointments scheduled
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {todaysAppointments.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                      <CalendarIcon className="w-12 h-12 mx-auto mb-3 opacity-50" />
                      <p>No appointments scheduled for this day</p>
                      <Button variant="outline" className="mt-4">
                        <Plus className="w-4 h-4 mr-2" />
                        Schedule Appointment
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {todaysAppointments.map((apt) => (
                        <Dialog key={apt.id}>
                          <DialogTrigger asChild>
                            <div
                              className={`p-4 border rounded-lg cursor-pointer hover:shadow-md transition-shadow ${getAppointmentTypeStyle(apt.type)}`}
                              onClick={() => setSelectedAppointment(apt)}
                            >
                              <div className="flex items-start justify-between">
                                <div className="flex items-start gap-3">
                                  <div className="text-center min-w-[60px]">
                                    <p className="text-lg font-bold">{apt.time}</p>
                                    <p className="text-xs opacity-75">{apt.duration} min</p>
                                  </div>
                                  <div>
                                    <p className="font-semibold">{apt.patientName}</p>
                                    <p className="text-sm opacity-75">{apt.type}</p>
                                    {apt.activePeptides.length > 0 && (
                                      <div className="flex gap-1 mt-1">
                                        {apt.activePeptides.map((p) => (
                                          <Badge key={p} variant="outline" className="text-xs">
                                            {p}
                                          </Badge>
                                        ))}
                                      </div>
                                    )}
                                  </div>
                                </div>
                                <div className="flex items-center gap-2">
                                  {apt.location === "telehealth" ? (
                                    <Badge variant="secondary" className="gap-1">
                                      <Video className="w-3 h-3" />
                                      Telehealth
                                    </Badge>
                                  ) : (
                                    <Badge variant="outline" className="gap-1">
                                      <MapPin className="w-3 h-3" />
                                      In-Person
                                    </Badge>
                                  )}
                                  <Badge variant={apt.status === "confirmed" ? "default" : "secondary"}>
                                    {apt.status}
                                  </Badge>
                                </div>
                              </div>
                            </div>
                          </DialogTrigger>
                          <DialogContent className="max-w-md">
                            <DialogHeader>
                              <DialogTitle>Appointment Details</DialogTitle>
                              <DialogDescription>
                                {apt.date} at {apt.time}
                              </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4">
                              <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                                  <User className="w-6 h-6 text-primary" />
                                </div>
                                <div>
                                  <p className="font-semibold">{apt.patientName}</p>
                                  <p className="text-sm text-muted-foreground">{apt.patientId}</p>
                                </div>
                              </div>

                              <div className="grid grid-cols-2 gap-4 text-sm">
                                <div className="flex items-center gap-2">
                                  <Clock className="w-4 h-4 text-muted-foreground" />
                                  <span>{apt.time} ({apt.duration} min)</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  {apt.location === "telehealth" ? (
                                    <>
                                      <Video className="w-4 h-4 text-muted-foreground" />
                                      <span>Telehealth</span>
                                    </>
                                  ) : (
                                    <>
                                      <MapPin className="w-4 h-4 text-muted-foreground" />
                                      <span>In-Person</span>
                                    </>
                                  )}
                                </div>
                                <div className="flex items-center gap-2">
                                  <Mail className="w-4 h-4 text-muted-foreground" />
                                  <span className="truncate">{apt.patientEmail}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Phone className="w-4 h-4 text-muted-foreground" />
                                  <span>{apt.patientPhone}</span>
                                </div>
                              </div>

                              <div>
                                <p className="text-sm font-medium mb-1">Visit Type</p>
                                <Badge className={getAppointmentTypeStyle(apt.type)}>{apt.type}</Badge>
                              </div>

                              {apt.activePeptides.length > 0 && (
                                <div>
                                  <p className="text-sm font-medium mb-1">Active Peptides</p>
                                  <div className="flex gap-1 flex-wrap">
                                    {apt.activePeptides.map((p) => (
                                      <Badge key={p} variant="secondary">{p}</Badge>
                                    ))}
                                  </div>
                                </div>
                              )}

                              <div>
                                <p className="text-sm font-medium mb-1">Notes</p>
                                <p className="text-sm text-muted-foreground">{apt.notes}</p>
                              </div>

                              <div className="flex gap-2 pt-2">
                                {apt.location === "telehealth" && (
                                  <Button className="flex-1">
                                    <Video className="w-4 h-4 mr-2" />
                                    Start Video Call
                                  </Button>
                                )}
                                <Link href={`/provider/patients/${apt.patientId}`} className="flex-1">
                                  <Button variant="outline" className="w-full">
                                    View Patient
                                  </Button>
                                </Link>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Upcoming Appointments */}
              <Card>
                <CardHeader>
                  <CardTitle>Upcoming</CardTitle>
                  <CardDescription>Next appointments</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {upcomingAppointments.map((apt) => (
                    <div
                      key={apt.id}
                      className="p-3 border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors"
                      onClick={() => {
                        const [year, month, day] = apt.date.split("-").map(Number)
                        setSelectedDate(new Date(year, month - 1, day))
                      }}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <p className="font-medium text-sm">{apt.patientName}</p>
                        {apt.location === "telehealth" ? (
                          <Video className="w-3 h-3 text-muted-foreground" />
                        ) : (
                          <MapPin className="w-3 h-3 text-muted-foreground" />
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground">{apt.type}</p>
                      <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                        <CalendarIcon className="w-3 h-3" />
                        <span>{apt.date}</span>
                        <Clock className="w-3 h-3 ml-1" />
                        <span>{apt.time}</span>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Appointment Types Legend */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Appointment Types</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {appointmentTypes.map((type) => (
                    <div key={type.value} className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded ${type.color.split(" ")[0]}`} />
                      <span className="text-sm">{type.label}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button variant="outline" className="w-full justify-start">
                    <Plus className="w-4 h-4 mr-2" />
                    New Appointment
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <CalendarIcon className="w-4 h-4 mr-2" />
                    Block Time Off
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Users className="w-4 h-4 mr-2" />
                    View All Patients
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  )
}
