"use client"

export const dynamic = 'force-dynamic'

import { ProtectedRoute } from "@/components/protected-route"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Activity, Users, Calendar, ShoppingCart, BookOpen, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function DosingGuidePage() {
  return (
    <ProtectedRoute allowedRoles={["provider"]}>
      <DashboardLayout>
        <div className="space-y-6">
          <div className="space-y-4">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">Peptide Dosing Guide</h2>
              <p className="text-muted-foreground mt-2">
                Comprehensive dosing protocols and administration guidelines from Alpha BioMed
              </p>
            </div>
            <Button
              asChild
              className="bg-[#33669A] hover:bg-[#2a5580] text-white text-lg px-8 py-6 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200"
            >
              <a href="https://alphabiomedlabs.com/pages/dosing-guide" target="_blank" rel="noopener noreferrer">
                <ExternalLink className="w-5 h-5 mr-2" />
                Alpha BioMed Dosing Guide
              </a>
            </Button>
          </div>

          <Card className="bg-primary/5 border-primary/20">
            <CardHeader>
              <CardTitle>Clinical Resources</CardTitle>
              <CardDescription>Additional support and information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <p>
                <strong>For Questions:</strong> Contact Alpha BioMed clinical support at (888) 890-8143
              </p>
              <p>
                <strong>Ordering:</strong> All peptides available through provider portal
              </p>
              <p>
                <strong>Patient Education:</strong> Downloadable guides available in Resources section
              </p>
              <p>
                <strong>Continuing Education:</strong> Monthly webinars on peptide therapy protocols
              </p>
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  )
}
