"use client"

export const dynamic = 'force-dynamic'

import { ProtectedRoute } from "@/components/protected-route"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Home,
  ShoppingBag,
  Calendar,
  Calculator,
  BookOpen,
  Phone,
  AlertTriangle,
  MessageSquare,
  Video,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function EmergencyPage() {
  const handleEmergencyCall = () => {
    alert("Connecting you to your provider via telemedicine...")
  }

  const handleEmergencyText = () => {
    alert("Emergency text sent to your provider. They will respond shortly.")
  }

  return (
    <ProtectedRoute allowedRoles={["patient"]}>
      <DashboardLayout>
        <div className="space-y-6">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Emergency Contact</h2>
            <p className="text-muted-foreground">Get immediate help from your healthcare provider</p>
          </div>

          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Life-Threatening Emergency?</AlertTitle>
            <AlertDescription>
              If you are experiencing a life-threatening emergency, call 911 immediately or go to your nearest emergency
              room.
            </AlertDescription>
          </Alert>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Video Telemedicine</CardTitle>
                <CardDescription>Connect with your provider via video call</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Start an immediate video consultation with your healthcare provider for urgent peptide-related
                  concerns.
                </p>
                <Button onClick={handleEmergencyCall} className="w-full" size="lg">
                  <Video className="w-4 h-4 mr-2" />
                  Start Video Call
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Emergency Text</CardTitle>
                <CardDescription>Send an urgent message to your provider</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Send an emergency text message to your provider. They will be notified immediately and respond as soon
                  as possible.
                </p>
                <Button onClick={handleEmergencyText} variant="outline" className="w-full bg-transparent" size="lg">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Send Emergency Text
                </Button>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Your Provider Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <p className="text-sm font-medium">Primary Provider</p>
                  <p className="text-sm text-muted-foreground">Dr. Sarah Johnson, NP</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Office Phone</p>
                  <p className="text-sm text-muted-foreground">(555) 123-4567</p>
                </div>
                <div>
                  <p className="text-sm font-medium">After Hours</p>
                  <p className="text-sm text-muted-foreground">(555) 123-4568</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Email</p>
                  <p className="text-sm text-muted-foreground">sjohnson@clinic.com</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>When to Contact Your Provider</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
                <li>Severe allergic reaction (difficulty breathing, swelling, hives)</li>
                <li>Severe injection site reaction (excessive swelling, redness, pain)</li>
                <li>Unexpected severe side effects</li>
                <li>Questions about dosing or administration</li>
                <li>Concerns about peptide storage or contamination</li>
                <li>Any other urgent peptide-related concerns</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  )
}
