"use client"

export const dynamic = 'force-dynamic'

import { ProtectedRoute } from "@/components/protected-route"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Users,
  Activity,
  Calendar,
  ShoppingCart,
  BookOpen,
  Calculator,
  FileText,
  Video,
  ExternalLink,
  BarChart,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const articles = [
  {
    title: "Clinical Guidelines for BPC-157 Administration",
    description: "Evidence-based protocols for prescribing and monitoring BPC-157 therapy.",
    type: "article",
  },
  {
    title: "Peptide Storage and Handling Best Practices",
    description: "Professional guidelines for maintaining peptide potency and safety.",
    type: "article",
  },
  {
    title: "Patient Education: Injection Techniques",
    description: "Resources for teaching patients safe subcutaneous administration.",
    type: "article",
  },
  {
    title: "GLP-1 Agonists in Weight Management",
    description: "Clinical evidence and prescribing guidelines for semaglutide and tirzepatide.",
    type: "article",
  },
  {
    title: "Monitoring Patient Response to Peptide Therapy",
    description: "Key metrics and assessment tools for tracking treatment outcomes.",
    type: "article",
  },
  {
    title: "Managing Side Effects in Peptide Therapy",
    description: "Common adverse reactions and intervention strategies.",
    type: "article",
  },
]

const videos = [
  {
    title: "Peptide Reconstitution Demonstration",
    description: "Step-by-step visual guide for proper peptide preparation.",
    duration: "8:45",
  },
  {
    title: "Patient Consultation Best Practices",
    description: "Effective communication strategies for peptide therapy discussions.",
    duration: "12:30",
  },
  {
    title: "Advanced Dosing Protocols",
    description: "Complex dosing scenarios and calculation methods.",
    duration: "15:20",
  },
  {
    title: "Regulatory Compliance in Peptide Prescribing",
    description: "Legal and regulatory considerations for providers.",
    duration: "10:15",
  },
]

export default function ProviderResourcesPage() {
  return (
    <ProtectedRoute allowedRoles={["provider"]}>
      <DashboardLayout>
        <div className="space-y-6">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Provider Resources</h2>
            <p className="text-muted-foreground">Clinical guidelines and educational materials for peptide therapy</p>
          </div>

          <Tabs defaultValue="articles" className="space-y-4">
            <TabsList>
              <TabsTrigger value="articles">Clinical Articles</TabsTrigger>
              <TabsTrigger value="videos">Training Videos</TabsTrigger>
              <TabsTrigger value="protocols">Protocols</TabsTrigger>
              <TabsTrigger value="reports">Reports</TabsTrigger>
            </TabsList>

            <TabsContent value="articles" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                {articles.map((article, idx) => (
                  <Card key={idx}>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <FileText className="w-5 h-5 text-primary" />
                        <Button variant="ghost" size="sm">
                          <ExternalLink className="w-4 h-4" />
                        </Button>
                      </div>
                      <CardTitle className="text-lg">{article.title}</CardTitle>
                      <CardDescription>{article.description}</CardDescription>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="videos" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                {videos.map((video, idx) => (
                  <Card key={idx}>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <Video className="w-5 h-5 text-primary" />
                        <span className="text-sm text-muted-foreground">{video.duration}</span>
                      </div>
                      <CardTitle className="text-lg">{video.title}</CardTitle>
                      <CardDescription>{video.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button className="w-full">Watch Video</Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="protocols" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Standard Treatment Protocols</CardTitle>
                  <CardDescription>Evidence-based protocols for common peptide therapies</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <h4 className="font-semibold">BPC-157 for Tissue Repair</h4>
                    <p className="text-sm text-muted-foreground">
                      <strong>Initial Dose:</strong> 250-500mcg subcutaneously, once or twice daily
                      <br />
                      <strong>Duration:</strong> 4-6 weeks for acute injuries, up to 12 weeks for chronic conditions
                      <br />
                      <strong>Monitoring:</strong> Assess pain levels and functional improvement every 2 weeks
                    </p>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-semibold">Semaglutide for Weight Management</h4>
                    <p className="text-sm text-muted-foreground">
                      <strong>Starting Dose:</strong> 0.25mg subcutaneously once weekly
                      <br />
                      <strong>Titration:</strong> Increase by 0.25mg every 4 weeks as tolerated
                      <br />
                      <strong>Maintenance:</strong> 1.0-2.4mg weekly based on response and tolerance
                      <br />
                      <strong>Monitoring:</strong> Weight, BMI, and metabolic markers monthly
                    </p>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-semibold">TB-500 for Recovery Enhancement</h4>
                    <p className="text-sm text-muted-foreground">
                      <strong>Loading Phase:</strong> 2-2.5mg subcutaneously twice weekly for 4-6 weeks
                      <br />
                      <strong>Maintenance:</strong> 2-2.5mg once weekly or as needed
                      <br />
                      <strong>Monitoring:</strong> Track recovery metrics and adjust frequency based on response
                    </p>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-semibold">General Safety Guidelines</h4>
                    <p className="text-sm text-muted-foreground">
                      • Always use bacteriostatic water with Benzyl Alcohol 0.09% for reconstitution
                      <br />• Educate patients on proper injection technique and site rotation
                      <br />• Monitor for adverse reactions, especially during dose titration
                      <br />• Document all dosing changes and patient responses in medical records
                      <br />• Ensure patients understand storage requirements and expiration dates
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="reports" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Reports</CardTitle>
                  <CardDescription>
                    Access and generate various reports for patient monitoring and analysis
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <h4 className="font-semibold">Patient Response Report</h4>
                    <p className="text-sm text-muted-foreground">
                      Track and analyze patient responses to peptide therapy
                    </p>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-semibold">Adverse Reactions Report</h4>
                    <p className="text-sm text-muted-foreground">Monitor and document adverse reactions</p>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-semibold">Dosing History Report</h4>
                    <p className="text-sm text-muted-foreground">Review patient dosing history and adjustments</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  )
}
