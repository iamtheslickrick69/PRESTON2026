"use client"

export const dynamic = 'force-dynamic'

import { useState } from "react"
import { ProtectedRoute } from "@/components/protected-route"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Calendar } from "@/components/ui/calendar"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import {
  Activity,
  ShoppingCart,
  Package,
  Home,
  Calculator,
  Calendar as CalendarIcon,
  BookOpen,
  Phone,
  MessageSquare,
  Clock,
  Video,
  MapPin,
  User,
  CheckCircle,
  ChevronRight,
} from "lucide-react"
import { toast } from "sonner"

const providers = [
  {
    id: "prov-1",
    name: "Dr. Sarah Johnson",
    title: "NP",
    specialty: "Peptide Therapy",
    initials: "SJ",
    availableDays: [1, 2, 3, 4, 5],
    rating: 4.9,
    reviewCount: 127,
  },
  {
    id: "prov-2",
    name: "Dr. Michael Chen",
    title: "MD",
    specialty: "Regenerative Medicine",
    initials: "MC",
    availableDays: [1, 3, 5],
    rating: 4.8,
    reviewCount: 94,
  },
  {
    id: "prov-3",
    name: "Dr. Emily Rodriguez",
    title: "DO",
    specialty: "Integrative Medicine",
    initials: "ER",
    availableDays: [2, 4],
    rating: 4.9,
    reviewCount: 156,
  },
]

const appointmentTypes = [
  {
    id: "initial",
    name: "Initial Consultation",
    duration: 45,
    description: "First-time patient visit to discuss treatment goals",
    price: 150,
  },
  {
    id: "followup",
    name: "Follow-up Consultation",
    duration: 20,
    description: "Check-in on current treatment progress",
    price: 75,
  },
  {
    id: "lab-review",
    name: "Lab Review",
    duration: 15,
    description: "Review and discuss recent lab results",
    price: 50,
  },
  {
    id: "protocol-adjustment",
    name: "Protocol Adjustment",
    duration: 30,
    description: "Modify current peptide protocol based on progress",
    price: 100,
  },
]

const upcomingAppointments = [
  {
    id: "apt-1",
    date: "2024-02-05",
    time: "10:00 AM",
    provider: "Dr. Sarah Johnson",
    providerInitials: "SJ",
    type: "Follow-up Consultation",
    duration: 20,
    location: "Telehealth",
    status: "confirmed",
  },
  {
    id: "apt-2",
    date: "2024-02-15",
    time: "2:30 PM",
    provider: "Dr. Michael Chen",
    providerInitials: "MC",
    type: "Lab Review",
    duration: 15,
    location: "Telehealth",
    status: "confirmed",
  },
]

const pastAppointments = [
  {
    id: "apt-3",
    date: "2024-01-15",
    time: "11:00 AM",
    provider: "Dr. Sarah Johnson",
    providerInitials: "SJ",
    type: "Initial Consultation",
    duration: 45,
    location: "Telehealth",
    status: "completed",
  },
  {
    id: "apt-4",
    date: "2024-01-08",
    time: "9:30 AM",
    provider: "Dr. Sarah Johnson",
    providerInitials: "SJ",
    type: "Lab Review",
    duration: 15,
    location: "Telehealth",
    status: "completed",
  },
]

const generateTimeSlots = () => {
  return [
    { time: "9:00 AM", available: true },
    { time: "9:30 AM", available: false },
    { time: "10:00 AM", available: true },
    { time: "10:30 AM", available: true },
    { time: "11:00 AM", available: false },
    { time: "11:30 AM", available: true },
    { time: "1:00 PM", available: true },
    { time: "1:30 PM", available: true },
    { time: "2:00 PM", available: false },
    { time: "2:30 PM", available: true },
    { time: "3:00 PM", available: true },
    { time: "3:30 PM", available: false },
    { time: "4:00 PM", available: true },
    { time: "4:30 PM", available: true },
  ]
}

export default function PatientSchedulePage() {
  const [activeTab, setActiveTab] = useState("upcoming")
  const [showBookingDialog, setShowBookingDialog] = useState(false)
  const [showCancelDialog, setShowCancelDialog] = useState(false)
  const [appointmentToCancel, setAppointmentToCancel] = useState<string | null>(null)

  const [bookingStep, setBookingStep] = useState(1)
  const [selectedProvider, setSelectedProvider] = useState<string | null>(null)
  const [selectedType, setSelectedType] = useState<string | null>(null)
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [visitType, setVisitType] = useState<"telehealth" | "in-person">("telehealth")

  const selectedProviderData = providers.find(p => p.id === selectedProvider)
  const selectedTypeData = appointmentTypes.find(t => t.id === selectedType)
  const timeSlots = selectedProvider && selectedDate ? generateTimeSlots() : []

  const resetBooking = () => {
    setBookingStep(1)
    setSelectedProvider(null)
    setSelectedType(null)
    setSelectedDate(undefined)
    setSelectedTime(null)
    setVisitType("telehealth")
  }

  const handleBookAppointment = () => {
    const dateStr = selectedDate ? selectedDate.toLocaleDateString() : ""
    toast.success("Appointment booked successfully!", {
      description: `${selectedTypeData?.name} with ${selectedProviderData?.name} on ${dateStr} at ${selectedTime}`,
    })
    setShowBookingDialog(false)
    resetBooking()
  }

  const handleCancelAppointment = () => {
    toast.success("Appointment cancelled", {
      description: "You will receive a confirmation email shortly.",
    })
    setShowCancelDialog(false)
    setAppointmentToCancel(null)
  }

  const isDateDisabled = (date: Date) => {
    if (!selectedProviderData) return true
    const day = date.getDay()
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    return !selectedProviderData.availableDays.includes(day) || date < today
  }

  const canProceedToStep = (step: number) => {
    switch (step) {
      case 2: return !!selectedProvider && !!selectedType
      case 3: return !!selectedDate
      case 4: return !!selectedTime
      default: return true
    }
  }

  const formatSelectedDate = (date: Date | undefined) => {
    if (!date) return ""
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric"
    })
  }

  const formatFullDate = (date: Date | undefined) => {
    if (!date) return ""
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric"
    })
  }

  return (
    <ProtectedRoute allowedRoles={["patient"]}>
      <DashboardLayout>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">Schedule</h2>
              <p className="text-muted-foreground">Manage your appointments with your care team</p>
            </div>
            <Button onClick={() => setShowBookingDialog(true)}>
              <CalendarIcon className="w-4 h-4 mr-2" />
              Book Appointment
            </Button>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
              <TabsTrigger value="past">Past Appointments</TabsTrigger>
            </TabsList>

            <TabsContent value="upcoming" className="space-y-4">
              {upcomingAppointments.length === 0 ? (
                <Card>
                  <CardContent className="flex flex-col items-center justify-center py-12">
                    <CalendarIcon className="w-12 h-12 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-semibold mb-2">No Upcoming Appointments</h3>
                    <p className="text-muted-foreground text-center mb-4">
                      You don&apos;t have any scheduled appointments. Book one to get started.
                    </p>
                    <Button onClick={() => setShowBookingDialog(true)}>
                      Book Appointment
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                upcomingAppointments.map((apt) => (
                  <Card key={apt.id}>
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-4">
                          <Avatar className="h-12 w-12">
                            <AvatarFallback>{apt.providerInitials}</AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="font-semibold text-lg">{apt.type}</h3>
                            <p className="text-muted-foreground">{apt.provider}</p>
                            <div className="flex items-center gap-4 mt-2 text-sm">
                              <div className="flex items-center gap-1">
                                <CalendarIcon className="w-4 h-4 text-muted-foreground" />
                                <span>{apt.date}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Clock className="w-4 h-4 text-muted-foreground" />
                                <span>{apt.time} ({apt.duration} min)</span>
                              </div>
                              <div className="flex items-center gap-1">
                                {apt.location === "Telehealth" ? (
                                  <Video className="w-4 h-4 text-muted-foreground" />
                                ) : (
                                  <MapPin className="w-4 h-4 text-muted-foreground" />
                                )}
                                <span>{apt.location}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <Badge variant="secondary" className="bg-green-100 text-green-700">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Confirmed
                        </Badge>
                      </div>
                      <Separator className="my-4" />
                      <div className="flex items-center justify-between">
                        <p className="text-sm text-muted-foreground">
                          You will receive a reminder 24 hours before your appointment
                        </p>
                        <div className="flex items-center gap-2">
                          {apt.location === "Telehealth" && (
                            <Button>
                              <Video className="w-4 h-4 mr-2" />
                              Join Video Call
                            </Button>
                          )}
                          <Button variant="outline" className="bg-transparent">
                            Reschedule
                          </Button>
                          <Button
                            variant="outline"
                            className="bg-transparent text-destructive hover:text-destructive"
                            onClick={() => {
                              setAppointmentToCancel(apt.id)
                              setShowCancelDialog(true)
                            }}
                          >
                            Cancel
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </TabsContent>

            <TabsContent value="past" className="space-y-4">
              {pastAppointments.map((apt) => (
                <Card key={apt.id} className="opacity-75">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4">
                        <Avatar className="h-12 w-12">
                          <AvatarFallback>{apt.providerInitials}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-semibold text-lg">{apt.type}</h3>
                          <p className="text-muted-foreground">{apt.provider}</p>
                          <div className="flex items-center gap-4 mt-2 text-sm">
                            <div className="flex items-center gap-1">
                              <CalendarIcon className="w-4 h-4 text-muted-foreground" />
                              <span>{apt.date}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="w-4 h-4 text-muted-foreground" />
                              <span>{apt.time} ({apt.duration} min)</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <Badge variant="secondary">Completed</Badge>
                    </div>
                    <Separator className="my-4" />
                    <div className="flex items-center justify-end gap-2">
                      <Button variant="outline" className="bg-transparent">
                        View Notes
                      </Button>
                      <Button variant="outline" className="bg-transparent">
                        Book Follow-up
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
          </Tabs>

          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Your Care Team</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {providers.slice(0, 2).map((provider) => (
                    <div key={provider.id} className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="text-xs">{provider.initials}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">{provider.name}</p>
                        <p className="text-xs text-muted-foreground">{provider.specialty}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Telehealth Info</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-3">
                  All video appointments are conducted through our secure, HIPAA-compliant platform.
                </p>
                <div className="text-sm space-y-1">
                  <p className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    Works on any device
                  </p>
                  <p className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    No download required
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Cancellation Policy</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Please cancel or reschedule at least 24 hours before your appointment to avoid a cancellation fee.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        <Dialog open={showBookingDialog} onOpenChange={(open) => {
          setShowBookingDialog(open)
          if (!open) resetBooking()
        }}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Book an Appointment</DialogTitle>
              <DialogDescription>
                Schedule a visit with your care team
              </DialogDescription>
            </DialogHeader>

            <div className="flex items-center justify-between mb-6">
              {[1, 2, 3, 4].map((step) => (
                <div key={step} className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    bookingStep >= step
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                  }`}>
                    {bookingStep > step ? <CheckCircle className="w-4 h-4" /> : step}
                  </div>
                  {step < 4 && (
                    <div className={`w-16 h-1 mx-2 ${
                      bookingStep > step ? "bg-primary" : "bg-muted"
                    }`} />
                  )}
                </div>
              ))}
            </div>

            {bookingStep === 1 && (
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium mb-3">Select Provider</h3>
                  <div className="grid gap-3">
                    {providers.map((provider) => (
                      <div
                        key={provider.id}
                        className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                          selectedProvider === provider.id
                            ? "border-primary bg-primary/5"
                            : "hover:bg-muted"
                        }`}
                        onClick={() => setSelectedProvider(provider.id)}
                      >
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarFallback>{provider.initials}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <p className="font-medium">{provider.name}, {provider.title}</p>
                            <p className="text-sm text-muted-foreground">{provider.specialty}</p>
                          </div>
                          <div className="text-right text-sm">
                            <p className="font-medium">{provider.rating} stars</p>
                            <p className="text-muted-foreground">{provider.reviewCount} reviews</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-3">Appointment Type</h3>
                  <div className="grid gap-3">
                    {appointmentTypes.map((type) => (
                      <div
                        key={type.id}
                        className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                          selectedType === type.id
                            ? "border-primary bg-primary/5"
                            : "hover:bg-muted"
                        }`}
                        onClick={() => setSelectedType(type.id)}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">{type.name}</p>
                            <p className="text-sm text-muted-foreground">{type.description}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">${type.price}</p>
                            <p className="text-sm text-muted-foreground">{type.duration} min</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-3">Visit Type</h3>
                  <div className="flex gap-3">
                    <Button
                      variant={visitType === "telehealth" ? "default" : "outline"}
                      className={visitType !== "telehealth" ? "bg-transparent" : ""}
                      onClick={() => setVisitType("telehealth")}
                    >
                      <Video className="w-4 h-4 mr-2" />
                      Telehealth
                    </Button>
                    <Button
                      variant={visitType === "in-person" ? "default" : "outline"}
                      className={visitType !== "in-person" ? "bg-transparent" : ""}
                      onClick={() => setVisitType("in-person")}
                    >
                      <MapPin className="w-4 h-4 mr-2" />
                      In-Person
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {bookingStep === 2 && (
              <div className="space-y-4">
                <div className="flex items-center justify-center">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    disabled={isDateDisabled}
                    className="rounded-md border"
                  />
                </div>
                {selectedProviderData && (
                  <p className="text-sm text-center text-muted-foreground">
                    {selectedProviderData.name} is available on{" "}
                    {selectedProviderData.availableDays.map(d =>
                      ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][d]
                    ).join(", ")}
                  </p>
                )}
              </div>
            )}

            {bookingStep === 3 && (
              <div className="space-y-4">
                <h3 className="font-medium text-center">
                  Available times for {formatSelectedDate(selectedDate)}
                </h3>
                <div className="grid grid-cols-4 gap-2">
                  {timeSlots.map((slot) => (
                    <Button
                      key={slot.time}
                      variant={selectedTime === slot.time ? "default" : "outline"}
                      className={`${
                        selectedTime !== slot.time ? "bg-transparent" : ""
                      } ${!slot.available ? "opacity-50 cursor-not-allowed" : ""}`}
                      disabled={!slot.available}
                      onClick={() => setSelectedTime(slot.time)}
                    >
                      {slot.time}
                    </Button>
                  ))}
                </div>
                <p className="text-sm text-center text-muted-foreground">
                  All times shown in your local timezone
                </p>
              </div>
            )}

            {bookingStep === 4 && (
              <div className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Appointment Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-3">
                      <User className="w-5 h-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm text-muted-foreground">Provider</p>
                        <p className="font-medium">{selectedProviderData?.name}, {selectedProviderData?.title}</p>
                      </div>
                    </div>
                    <Separator />
                    <div className="flex items-center gap-3">
                      <CalendarIcon className="w-5 h-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm text-muted-foreground">Date & Time</p>
                        <p className="font-medium">
                          {formatFullDate(selectedDate)} at {selectedTime}
                        </p>
                      </div>
                    </div>
                    <Separator />
                    <div className="flex items-center gap-3">
                      {visitType === "telehealth" ? (
                        <Video className="w-5 h-5 text-muted-foreground" />
                      ) : (
                        <MapPin className="w-5 h-5 text-muted-foreground" />
                      )}
                      <div>
                        <p className="text-sm text-muted-foreground">Visit Type</p>
                        <p className="font-medium capitalize">{visitType}</p>
                      </div>
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Appointment Type</p>
                        <p className="font-medium">{selectedTypeData?.name}</p>
                        <p className="text-sm text-muted-foreground">{selectedTypeData?.duration} minutes</p>
                      </div>
                      <p className="text-2xl font-bold">${selectedTypeData?.price}</p>
                    </div>
                  </CardContent>
                </Card>
                <p className="text-sm text-muted-foreground text-center">
                  By booking this appointment, you agree to our cancellation policy.
                  Payment will be collected at the time of your visit.
                </p>
              </div>
            )}

            <DialogFooter className="flex items-center justify-between">
              <div>
                {bookingStep > 1 && (
                  <Button
                    variant="outline"
                    className="bg-transparent"
                    onClick={() => setBookingStep(bookingStep - 1)}
                  >
                    Back
                  </Button>
                )}
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  className="bg-transparent"
                  onClick={() => {
                    setShowBookingDialog(false)
                    resetBooking()
                  }}
                >
                  Cancel
                </Button>
                {bookingStep < 4 ? (
                  <Button
                    onClick={() => setBookingStep(bookingStep + 1)}
                    disabled={!canProceedToStep(bookingStep + 1)}
                  >
                    Continue
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                ) : (
                  <Button onClick={handleBookAppointment}>
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Confirm Booking
                  </Button>
                )}
              </div>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <AlertDialog open={showCancelDialog} onOpenChange={setShowCancelDialog}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Cancel Appointment?</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to cancel this appointment? If you cancel within 24 hours of your scheduled time, a cancellation fee may apply.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Keep Appointment</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleCancelAppointment}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              >
                Cancel Appointment
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </DashboardLayout>
    </ProtectedRoute>
  )
}
