"use client"

export const dynamic = 'force-dynamic'

import { ProtectedRoute } from "@/components/protected-route"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Activity, Calendar, ShoppingCart, BookOpen, Calculator, FileText, BarChart, Settings, User, Mail, Phone, Lock, Bell, Shield, Camera, Briefcase, GraduationCap, Award, MapPin, Clock, Globe, Eye, EyeOff, Check, Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { ThemeSelector } from "@/components/theme-toggle"
import { useState } from "react"
import { toast } from "sonner"

export default function ProviderSettingsPage() {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)

  // Profile form state
  const [profile, setProfile] = useState({
    firstName: "Sarah",
    lastName: "Williams",
    email: "dr.williams@bridgemdx.com",
    phone: "(555) 123-4567",
    title: "Nurse Practitioner",
    npi: "1234567890",
    licenseNumber: "NP-12345",
    licenseState: "AZ",
    licenseExpiry: "2025-06-15",
    deaNumber: "AW1234567",
    specialties: ["Peptide Therapy", "Weight Management", "Anti-Aging"],
    bio: "Board-certified Nurse Practitioner specializing in peptide therapy and regenerative medicine with over 10 years of experience.",
    clinicName: "Bridge MDX Clinic",
    clinicAddress: "123 Medical Plaza, Suite 100",
    clinicCity: "Phoenix",
    clinicState: "AZ",
    clinicZip: "85001",
    timezone: "America/Phoenix",
  })

  // Notification settings
  const [notifications, setNotifications] = useState({
    emailNewPatient: true,
    emailAppointment: true,
    emailRefillRequest: true,
    emailLabResults: true,
    emailMessages: true,
    pushNewPatient: true,
    pushAppointment: true,
    pushRefillRequest: false,
    pushLabResults: true,
    pushMessages: true,
    smsAppointmentReminders: true,
    smsUrgentAlerts: true,
  })

  // Availability settings
  const [availability, setAvailability] = useState({
    monday: { enabled: true, start: "09:00", end: "17:00" },
    tuesday: { enabled: true, start: "09:00", end: "17:00" },
    wednesday: { enabled: true, start: "09:00", end: "17:00" },
    thursday: { enabled: true, start: "09:00", end: "17:00" },
    friday: { enabled: true, start: "09:00", end: "15:00" },
    saturday: { enabled: false, start: "09:00", end: "12:00" },
    sunday: { enabled: false, start: "09:00", end: "12:00" },
  })

  const handleSaveProfile = () => {
    toast.success("Profile updated successfully")
  }

  const handleSaveNotifications = () => {
    toast.success("Notification preferences saved")
  }

  const handleSaveAvailability = () => {
    toast.success("Availability updated")
  }

  const handleChangePassword = () => {
    toast.success("Password changed successfully")
  }

  return (
    <ProtectedRoute allowedRoles={["provider"]}>
      <DashboardLayout>
        <div className="space-y-6">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
            <p className="text-muted-foreground">Manage your profile, preferences, and account settings</p>
          </div>

          <Tabs defaultValue="profile" className="w-full">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="profile">
                <User className="w-4 h-4 mr-2" />
                Profile
              </TabsTrigger>
              <TabsTrigger value="credentials">
                <Award className="w-4 h-4 mr-2" />
                Credentials
              </TabsTrigger>
              <TabsTrigger value="availability">
                <Clock className="w-4 h-4 mr-2" />
                Availability
              </TabsTrigger>
              <TabsTrigger value="notifications">
                <Bell className="w-4 h-4 mr-2" />
                Notifications
              </TabsTrigger>
              <TabsTrigger value="security">
                <Shield className="w-4 h-4 mr-2" />
                Security
              </TabsTrigger>
            </TabsList>

            {/* Profile Tab */}
            <TabsContent value="profile" className="mt-6 space-y-6">
              {/* Avatar Section */}
              <Card>
                <CardHeader>
                  <CardTitle>Profile Photo</CardTitle>
                  <CardDescription>This will be displayed to your patients</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-6">
                    <Avatar className="w-24 h-24">
                      <AvatarImage src="" />
                      <AvatarFallback className="text-2xl bg-primary text-primary-foreground">SW</AvatarFallback>
                    </Avatar>
                    <div className="space-y-2">
                      <div className="flex gap-2">
                        <Button variant="outline">
                          <Camera className="w-4 h-4 mr-2" />
                          Upload Photo
                        </Button>
                        <Button variant="ghost">Remove</Button>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Recommended: 400x400px, JPG or PNG, max 2MB
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Personal Information */}
              <Card>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription>Your basic profile information</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        value={profile.firstName}
                        onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        value={profile.lastName}
                        onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={profile.email}
                        onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={profile.phone}
                        onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="title">Professional Title</Label>
                    <Select
                      value={profile.title}
                      onValueChange={(v) => setProfile({ ...profile, title: v })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Nurse Practitioner">Nurse Practitioner (NP)</SelectItem>
                        <SelectItem value="Physician Assistant">Physician Assistant (PA)</SelectItem>
                        <SelectItem value="Physician">Physician (MD/DO)</SelectItem>
                        <SelectItem value="Chiropractor">Chiropractor (DC)</SelectItem>
                        <SelectItem value="Naturopath">Naturopathic Doctor (ND)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bio">Professional Bio</Label>
                    <Textarea
                      id="bio"
                      rows={4}
                      placeholder="Tell patients about your experience and specialties..."
                      value={profile.bio}
                      onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                    />
                    <p className="text-xs text-muted-foreground">
                      This will be displayed on your public profile
                    </p>
                  </div>
                  <Button onClick={handleSaveProfile}>
                    <Save className="w-4 h-4 mr-2" />
                    Save Changes
                  </Button>
                </CardContent>
              </Card>

              {/* Clinic Information */}
              <Card>
                <CardHeader>
                  <CardTitle>Clinic Information</CardTitle>
                  <CardDescription>Your practice location details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="clinicName">Clinic Name</Label>
                    <Input
                      id="clinicName"
                      value={profile.clinicName}
                      onChange={(e) => setProfile({ ...profile, clinicName: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="clinicAddress">Street Address</Label>
                    <Input
                      id="clinicAddress"
                      value={profile.clinicAddress}
                      onChange={(e) => setProfile({ ...profile, clinicAddress: e.target.value })}
                    />
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="clinicCity">City</Label>
                      <Input
                        id="clinicCity"
                        value={profile.clinicCity}
                        onChange={(e) => setProfile({ ...profile, clinicCity: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="clinicState">State</Label>
                      <Input
                        id="clinicState"
                        value={profile.clinicState}
                        onChange={(e) => setProfile({ ...profile, clinicState: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="clinicZip">ZIP Code</Label>
                      <Input
                        id="clinicZip"
                        value={profile.clinicZip}
                        onChange={(e) => setProfile({ ...profile, clinicZip: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="timezone">Timezone</Label>
                    <Select
                      value={profile.timezone}
                      onValueChange={(v) => setProfile({ ...profile, timezone: v })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="America/Los_Angeles">Pacific Time (PT)</SelectItem>
                        <SelectItem value="America/Phoenix">Arizona (MST)</SelectItem>
                        <SelectItem value="America/Denver">Mountain Time (MT)</SelectItem>
                        <SelectItem value="America/Chicago">Central Time (CT)</SelectItem>
                        <SelectItem value="America/New_York">Eastern Time (ET)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button onClick={handleSaveProfile}>
                    <Save className="w-4 h-4 mr-2" />
                    Save Changes
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Credentials Tab */}
            <TabsContent value="credentials" className="mt-6 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Professional Credentials</CardTitle>
                  <CardDescription>Your licenses and certifications</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>NPI Number</Label>
                      <Input value={profile.npi} onChange={(e) => setProfile({ ...profile, npi: e.target.value })} />
                    </div>
                    <div className="space-y-2">
                      <Label>DEA Number</Label>
                      <Input value={profile.deaNumber} onChange={(e) => setProfile({ ...profile, deaNumber: e.target.value })} />
                    </div>
                  </div>
                  <Separator />
                  <div className="space-y-4">
                    <h4 className="font-medium">State Licenses</h4>
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="p-2 bg-green-100 rounded-lg">
                          <Award className="w-5 h-5 text-green-600" />
                        </div>
                        <div>
                          <p className="font-medium">Arizona NP License</p>
                          <p className="text-sm text-muted-foreground">
                            License #: {profile.licenseNumber} | Expires: {profile.licenseExpiry}
                          </p>
                        </div>
                      </div>
                      <Badge className="bg-green-100 text-green-800">Active</Badge>
                    </div>
                    <Button variant="outline">
                      <Award className="w-4 h-4 mr-2" />
                      Add License
                    </Button>
                  </div>
                  <Separator />
                  <div className="space-y-4">
                    <h4 className="font-medium">Certifications</h4>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="secondary">Board Certified - AANP</Badge>
                      <Badge variant="secondary">BLS Certified</Badge>
                      <Badge variant="secondary">ACLS Certified</Badge>
                      <Badge variant="secondary">Peptide Therapy Certified</Badge>
                    </div>
                    <Button variant="outline">
                      <GraduationCap className="w-4 h-4 mr-2" />
                      Add Certification
                    </Button>
                  </div>
                  <Button onClick={handleSaveProfile}>
                    <Save className="w-4 h-4 mr-2" />
                    Save Changes
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Availability Tab */}
            <TabsContent value="availability" className="mt-6 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Working Hours</CardTitle>
                  <CardDescription>Set your availability for appointments</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {Object.entries(availability).map(([day, schedule]) => (
                    <div key={day} className="flex items-center gap-4 p-3 border rounded-lg">
                      <Switch
                        checked={schedule.enabled}
                        onCheckedChange={(checked) =>
                          setAvailability({ ...availability, [day]: { ...schedule, enabled: checked } })
                        }
                      />
                      <div className="w-24 capitalize font-medium">{day}</div>
                      {schedule.enabled ? (
                        <div className="flex items-center gap-2">
                          <Input
                            type="time"
                            value={schedule.start}
                            className="w-32"
                            onChange={(e) =>
                              setAvailability({ ...availability, [day]: { ...schedule, start: e.target.value } })
                            }
                          />
                          <span className="text-muted-foreground">to</span>
                          <Input
                            type="time"
                            value={schedule.end}
                            className="w-32"
                            onChange={(e) =>
                              setAvailability({ ...availability, [day]: { ...schedule, end: e.target.value } })
                            }
                          />
                        </div>
                      ) : (
                        <span className="text-muted-foreground">Not available</span>
                      )}
                    </div>
                  ))}
                  <Button onClick={handleSaveAvailability}>
                    <Save className="w-4 h-4 mr-2" />
                    Save Availability
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Notifications Tab */}
            <TabsContent value="notifications" className="mt-6 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Email Notifications</CardTitle>
                  <CardDescription>Choose what emails you receive</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { key: "emailNewPatient", label: "New patient registration" },
                    { key: "emailAppointment", label: "Appointment reminders" },
                    { key: "emailRefillRequest", label: "Prescription refill requests" },
                    { key: "emailLabResults", label: "New lab results" },
                    { key: "emailMessages", label: "Patient messages" },
                  ].map((item) => (
                    <div key={item.key} className="flex items-center justify-between">
                      <span>{item.label}</span>
                      <Switch
                        checked={notifications[item.key as keyof typeof notifications]}
                        onCheckedChange={(checked) =>
                          setNotifications({ ...notifications, [item.key]: checked })
                        }
                      />
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Push Notifications</CardTitle>
                  <CardDescription>In-app and browser notifications</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { key: "pushNewPatient", label: "New patient registration" },
                    { key: "pushAppointment", label: "Appointment reminders" },
                    { key: "pushRefillRequest", label: "Prescription refill requests" },
                    { key: "pushLabResults", label: "New lab results" },
                    { key: "pushMessages", label: "Patient messages" },
                  ].map((item) => (
                    <div key={item.key} className="flex items-center justify-between">
                      <span>{item.label}</span>
                      <Switch
                        checked={notifications[item.key as keyof typeof notifications]}
                        onCheckedChange={(checked) =>
                          setNotifications({ ...notifications, [item.key]: checked })
                        }
                      />
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Button onClick={handleSaveNotifications}>
                <Save className="w-4 h-4 mr-2" />
                Save Preferences
              </Button>
            </TabsContent>

            {/* Security Tab */}
            <TabsContent value="security" className="mt-6 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Change Password</CardTitle>
                  <CardDescription>Update your account password</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="currentPassword">Current Password</Label>
                    <div className="relative">
                      <Input
                        id="currentPassword"
                        type={showCurrentPassword ? "text" : "password"}
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 -translate-y-1/2"
                        onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                      >
                        {showCurrentPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="newPassword">New Password</Label>
                    <div className="relative">
                      <Input
                        id="newPassword"
                        type={showNewPassword ? "text" : "password"}
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 -translate-y-1/2"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                      >
                        {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm New Password</Label>
                    <Input id="confirmPassword" type="password" />
                  </div>
                  <Button onClick={handleChangePassword}>Update Password</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Two-Factor Authentication</CardTitle>
                  <CardDescription>Add an extra layer of security</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Authenticator App</p>
                      <p className="text-sm text-muted-foreground">Use an app like Google Authenticator</p>
                    </div>
                    <Button variant="outline">Enable</Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Appearance</CardTitle>
                  <CardDescription>Customize how the app looks</CardDescription>
                </CardHeader>
                <CardContent>
                  <ThemeSelector />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  )
}
