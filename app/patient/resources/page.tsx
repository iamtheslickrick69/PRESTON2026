"use client"

export const dynamic = 'force-dynamic'

import { ProtectedRoute } from "@/components/protected-route"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Home, ShoppingBag, Calendar, Calculator, BookOpen, Phone, FileText, Video, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const articles = [
  {
    title: "Understanding BPC-157: Benefits and Usage",
    description: "Learn about the healing properties of BPC-157 and how to use it effectively.",
    type: "article",
  },
  {
    title: "Peptide Storage and Handling Guide",
    description: "Best practices for storing and handling your peptides to maintain potency.",
    type: "article",
  },
  {
    title: "Injection Techniques for Subcutaneous Administration",
    description: "Step-by-step guide to safe and effective peptide injections.",
    type: "article",
  },
  {
    title: "Semaglutide for Weight Management",
    description: "How GLP-1 agonists work and what to expect during treatment.",
    type: "article",
  },
]

const videos = [
  {
    title: "How to Reconstitute Peptides",
    description: "Visual guide to properly mixing your peptides with bacteriostatic water.",
    duration: "5:32",
  },
  {
    title: "Proper Injection Technique",
    description: "Demonstration of safe subcutaneous injection methods.",
    duration: "4:18",
  },
  {
    title: "Managing Side Effects",
    description: "What to watch for and when to contact your provider.",
    duration: "6:45",
  },
]

export default function ResourcesPage() {
  return (
    <ProtectedRoute allowedRoles={["patient"]}>
      <DashboardLayout>
        <div className="space-y-6">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Educational Resources</h2>
            <p className="text-muted-foreground">Learn more about your peptide therapy</p>
          </div>

          <Tabs defaultValue="articles" className="space-y-4">
            <TabsList>
              <TabsTrigger value="articles">Articles</TabsTrigger>
              <TabsTrigger value="videos">Videos</TabsTrigger>
              <TabsTrigger value="faqs">FAQs</TabsTrigger>
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

            <TabsContent value="faqs" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Frequently Asked Questions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <h4 className="font-semibold">How long do reconstituted peptides last?</h4>
                    <p className="text-sm text-muted-foreground">
                      Most reconstituted peptides remain stable for 30 days when stored properly in the refrigerator.
                      Always check with your provider for specific peptide storage requirements.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-semibold">What should I do if I miss a dose?</h4>
                    <p className="text-sm text-muted-foreground">
                      Take the missed dose as soon as you remember, unless it's close to your next scheduled dose. Never
                      double up on doses. Contact your provider if you have questions.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-semibold">Are there any side effects I should watch for?</h4>
                    <p className="text-sm text-muted-foreground">
                      Common side effects include mild injection site reactions, nausea, or headaches. Serious side
                      effects are rare but should be reported immediately to your provider.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-semibold">Can I travel with my peptides?</h4>
                    <p className="text-sm text-muted-foreground">
                      Yes, but keep them refrigerated when possible. Use a cooler bag with ice packs for travel. Bring
                      your prescription documentation when traveling.
                    </p>
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
