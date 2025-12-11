"use client"

export const dynamic = 'force-dynamic'

import { ProtectedRoute } from "@/components/protected-route"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Home, Calendar, Calculator, BookOpen, Phone, Activity, ShoppingCart, Package, BookMarked, Plus, Camera, Smile, Frown, Meh, TrendingUp, TrendingDown, Minus, Image, FileText, Clock, ChevronRight, Edit, Trash2, Droplets, Moon, Zap, Brain, Heart, Scale, Thermometer } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { useState } from "react"
import { toast } from "sonner"

const moodOptions = [
  { value: "great", label: "Great", icon: Smile, color: "text-green-500" },
  { value: "good", label: "Good", icon: Smile, color: "text-lime-500" },
  { value: "okay", label: "Okay", icon: Meh, color: "text-yellow-500" },
  { value: "poor", label: "Poor", icon: Frown, color: "text-orange-500" },
  { value: "bad", label: "Bad", icon: Frown, color: "text-red-500" },
]

const symptomCategories = [
  {
    name: "Energy & Fatigue",
    icon: Zap,
    symptoms: ["Low energy", "Fatigue", "Improved stamina", "Brain fog"],
  },
  {
    name: "Sleep",
    icon: Moon,
    symptoms: ["Insomnia", "Vivid dreams", "Better sleep quality", "Waking up refreshed"],
  },
  {
    name: "Digestive",
    icon: Droplets,
    symptoms: ["Nausea", "Appetite changes", "Bloating", "Improved digestion"],
  },
  {
    name: "Mental",
    icon: Brain,
    symptoms: ["Anxiety", "Improved focus", "Better mood", "Mental clarity"],
  },
  {
    name: "Physical",
    icon: Heart,
    symptoms: ["Headache", "Muscle soreness", "Joint pain", "Injection site reaction"],
  },
]

const mockJournalEntries = [
  {
    id: "1",
    date: "January 19, 2024",
    time: "8:30 AM",
    mood: "good",
    overallWellbeing: 7,
    weight: 175.5,
    energyLevel: 8,
    sleepQuality: 7,
    symptoms: ["Improved focus", "Better sleep quality"],
    notes: "Feeling much better today. BPC-157 seems to be helping with gut issues. Energy levels are improving.",
    peptidesTaken: ["BPC-157 500mcg", "TB-500 2.5mg"],
    photos: [],
  },
  {
    id: "2",
    date: "January 18, 2024",
    time: "9:00 AM",
    mood: "okay",
    overallWellbeing: 5,
    weight: 176.0,
    energyLevel: 5,
    sleepQuality: 6,
    symptoms: ["Low energy", "Mild nausea"],
    notes: "Experienced some nausea after Semaglutide injection yesterday. Will try taking it later in the evening next time.",
    peptidesTaken: ["Semaglutide 0.5mg"],
    photos: [],
  },
  {
    id: "3",
    date: "January 17, 2024",
    time: "8:15 AM",
    mood: "great",
    overallWellbeing: 9,
    weight: 176.2,
    energyLevel: 9,
    sleepQuality: 8,
    symptoms: ["Improved stamina", "Mental clarity", "Better mood"],
    notes: "Best day in weeks! Slept great, woke up refreshed. Workout was excellent.",
    peptidesTaken: ["BPC-157 500mcg"],
    photos: ["progress-1.jpg"],
  },
  {
    id: "4",
    date: "January 15, 2024",
    time: "7:45 AM",
    mood: "poor",
    overallWellbeing: 4,
    weight: 177.0,
    energyLevel: 3,
    sleepQuality: 4,
    symptoms: ["Fatigue", "Brain fog", "Headache"],
    notes: "Rough night of sleep. Possible coming down with something or adjusting to new peptide protocol.",
    peptidesTaken: ["BPC-157 500mcg", "TB-500 2.5mg"],
    photos: [],
  },
]

const mockProgressPhotos = [
  { id: "1", date: "Jan 19, 2024", category: "front", url: "/placeholder-photo.jpg" },
  { id: "2", date: "Jan 12, 2024", category: "front", url: "/placeholder-photo.jpg" },
  { id: "3", date: "Jan 5, 2024", category: "front", url: "/placeholder-photo.jpg" },
  { id: "4", date: "Dec 29, 2023", category: "front", url: "/placeholder-photo.jpg" },
]

export default function PatientJournalPage() {
  const [isNewEntryOpen, setIsNewEntryOpen] = useState(false)
  const [isPhotoUploadOpen, setIsPhotoUploadOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("entries")

  // New entry form state
  const [newEntry, setNewEntry] = useState({
    mood: "",
    overallWellbeing: [5],
    weight: "",
    energyLevel: [5],
    sleepQuality: [5],
    symptoms: [] as string[],
    notes: "",
    peptidesTaken: "",
  })

  const getMoodIcon = (mood: string) => {
    const option = moodOptions.find((m) => m.value === mood)
    if (!option) return null
    const Icon = option.icon
    return <Icon className={`w-5 h-5 ${option.color}`} />
  }

  const getTrendIcon = (current: number, target: number = 5) => {
    if (current > target) return <TrendingUp className="w-4 h-4 text-green-500" />
    if (current < target) return <TrendingDown className="w-4 h-4 text-red-500" />
    return <Minus className="w-4 h-4 text-gray-400" />
  }

  const handleSymptomToggle = (symptom: string) => {
    setNewEntry((prev) => ({
      ...prev,
      symptoms: prev.symptoms.includes(symptom)
        ? prev.symptoms.filter((s) => s !== symptom)
        : [...prev.symptoms, symptom],
    }))
  }

  const handleSaveEntry = () => {
    if (!newEntry.mood) {
      toast.error("Please select your mood")
      return
    }
    toast.success("Journal entry saved successfully")
    setIsNewEntryOpen(false)
    setNewEntry({
      mood: "",
      overallWellbeing: [5],
      weight: "",
      energyLevel: [5],
      sleepQuality: [5],
      symptoms: [],
      notes: "",
      peptidesTaken: "",
    })
  }

  const handlePhotoUpload = () => {
    toast.success("Progress photo uploaded successfully")
    setIsPhotoUploadOpen(false)
  }

  // Calculate averages for the week
  const avgWellbeing = (mockJournalEntries.reduce((acc, e) => acc + e.overallWellbeing, 0) / mockJournalEntries.length).toFixed(1)
  const avgEnergy = (mockJournalEntries.reduce((acc, e) => acc + e.energyLevel, 0) / mockJournalEntries.length).toFixed(1)
  const avgSleep = (mockJournalEntries.reduce((acc, e) => acc + e.sleepQuality, 0) / mockJournalEntries.length).toFixed(1)

  return (
    <ProtectedRoute allowedRoles={["patient"]}>
      <DashboardLayout>
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">Health Journal</h2>
              <p className="text-muted-foreground">
                Track your symptoms, progress, and treatment outcomes
              </p>
            </div>
            <div className="flex gap-2">
              <Dialog open={isPhotoUploadOpen} onOpenChange={setIsPhotoUploadOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline">
                    <Camera className="w-4 h-4 mr-2" />
                    Add Photo
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Upload Progress Photo</DialogTitle>
                    <DialogDescription>
                      Take or upload a progress photo to track your transformation
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="border-2 border-dashed border-gray-200 rounded-lg p-8 text-center">
                      <Camera className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-sm font-medium mb-2">Drag and drop or click to upload</p>
                      <p className="text-xs text-muted-foreground">PNG, JPG up to 10MB</p>
                      <Button variant="outline" className="mt-4">
                        Choose File
                      </Button>
                    </div>
                    <div className="space-y-2">
                      <Label>Photo Category</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="front">Front View</SelectItem>
                          <SelectItem value="side">Side View</SelectItem>
                          <SelectItem value="back">Back View</SelectItem>
                          <SelectItem value="area">Specific Area</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Notes (optional)</Label>
                      <Input placeholder="Any notes about this photo..." />
                    </div>
                  </div>
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button onClick={handlePhotoUpload}>Upload Photo</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              <Dialog open={isNewEntryOpen} onOpenChange={setIsNewEntryOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    New Entry
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>New Journal Entry</DialogTitle>
                    <DialogDescription>
                      Record how you&apos;re feeling today and track your progress
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-6 py-4">
                    {/* Mood Selection */}
                    <div className="space-y-3">
                      <Label className="text-base font-semibold">How are you feeling today?</Label>
                      <div className="flex gap-2 justify-between">
                        {moodOptions.map((option) => {
                          const Icon = option.icon
                          return (
                            <button
                              key={option.value}
                              onClick={() => setNewEntry({ ...newEntry, mood: option.value })}
                              className={`flex flex-col items-center p-3 rounded-lg border-2 transition-all flex-1 ${
                                newEntry.mood === option.value
                                  ? "border-primary bg-primary/5"
                                  : "border-gray-200 hover:border-gray-300"
                              }`}
                            >
                              <Icon className={`w-8 h-8 ${option.color}`} />
                              <span className="text-xs mt-1">{option.label}</span>
                            </button>
                          )
                        })}
                      </div>
                    </div>

                    {/* Metrics */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <Label className="flex items-center gap-2">
                          <Heart className="w-4 h-4" />
                          Overall Wellbeing: {newEntry.overallWellbeing[0]}/10
                        </Label>
                        <Slider
                          value={newEntry.overallWellbeing}
                          onValueChange={(v) => setNewEntry({ ...newEntry, overallWellbeing: v })}
                          max={10}
                          min={1}
                          step={1}
                        />
                      </div>
                      <div className="space-y-3">
                        <Label className="flex items-center gap-2">
                          <Zap className="w-4 h-4" />
                          Energy Level: {newEntry.energyLevel[0]}/10
                        </Label>
                        <Slider
                          value={newEntry.energyLevel}
                          onValueChange={(v) => setNewEntry({ ...newEntry, energyLevel: v })}
                          max={10}
                          min={1}
                          step={1}
                        />
                      </div>
                      <div className="space-y-3">
                        <Label className="flex items-center gap-2">
                          <Moon className="w-4 h-4" />
                          Sleep Quality: {newEntry.sleepQuality[0]}/10
                        </Label>
                        <Slider
                          value={newEntry.sleepQuality}
                          onValueChange={(v) => setNewEntry({ ...newEntry, sleepQuality: v })}
                          max={10}
                          min={1}
                          step={1}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="flex items-center gap-2">
                          <Scale className="w-4 h-4" />
                          Weight (lbs)
                        </Label>
                        <Input
                          type="number"
                          step="0.1"
                          placeholder="Enter your weight"
                          value={newEntry.weight}
                          onChange={(e) => setNewEntry({ ...newEntry, weight: e.target.value })}
                        />
                      </div>
                    </div>

                    {/* Symptoms */}
                    <div className="space-y-3">
                      <Label className="text-base font-semibold">Symptoms & Effects</Label>
                      <div className="space-y-4">
                        {symptomCategories.map((category) => {
                          const Icon = category.icon
                          return (
                            <div key={category.name} className="space-y-2">
                              <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                                <Icon className="w-4 h-4" />
                                {category.name}
                              </div>
                              <div className="flex flex-wrap gap-2">
                                {category.symptoms.map((symptom) => (
                                  <button
                                    key={symptom}
                                    onClick={() => handleSymptomToggle(symptom)}
                                    className={`px-3 py-1.5 text-sm rounded-full border transition-all ${
                                      newEntry.symptoms.includes(symptom)
                                        ? "bg-primary text-primary-foreground border-primary"
                                        : "bg-white border-gray-200 hover:border-gray-300"
                                    }`}
                                  >
                                    {symptom}
                                  </button>
                                ))}
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    </div>

                    {/* Peptides Taken */}
                    <div className="space-y-2">
                      <Label>Peptides Taken Today</Label>
                      <Input
                        placeholder="e.g., BPC-157 500mcg, Semaglutide 0.5mg"
                        value={newEntry.peptidesTaken}
                        onChange={(e) => setNewEntry({ ...newEntry, peptidesTaken: e.target.value })}
                      />
                    </div>

                    {/* Notes */}
                    <div className="space-y-2">
                      <Label>Additional Notes</Label>
                      <Textarea
                        placeholder="How did you feel today? Any observations about your treatment?"
                        rows={4}
                        value={newEntry.notes}
                        onChange={(e) => setNewEntry({ ...newEntry, notes: e.target.value })}
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button onClick={handleSaveEntry}>Save Entry</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          {/* Weekly Summary */}
          <div className="grid gap-4 md:grid-cols-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Wellbeing</p>
                    <p className="text-2xl font-bold">{avgWellbeing}/10</p>
                  </div>
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Heart className="w-5 h-5 text-blue-600" />
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-2">7-day average</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Energy</p>
                    <p className="text-2xl font-bold">{avgEnergy}/10</p>
                  </div>
                  <div className="p-2 bg-yellow-100 rounded-lg">
                    <Zap className="w-5 h-5 text-yellow-600" />
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-2">7-day average</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Sleep</p>
                    <p className="text-2xl font-bold">{avgSleep}/10</p>
                  </div>
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <Moon className="w-5 h-5 text-purple-600" />
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-2">7-day average</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Entries</p>
                    <p className="text-2xl font-bold">{mockJournalEntries.length}</p>
                  </div>
                  <div className="p-2 bg-green-100 rounded-lg">
                    <BookMarked className="w-5 h-5 text-green-600" />
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-2">This week</p>
              </CardContent>
            </Card>
          </div>

          {/* Main Content Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList>
              <TabsTrigger value="entries">
                <FileText className="w-4 h-4 mr-2" />
                Journal Entries
              </TabsTrigger>
              <TabsTrigger value="photos">
                <Image className="w-4 h-4 mr-2" />
                Progress Photos
              </TabsTrigger>
              <TabsTrigger value="trends">
                <TrendingUp className="w-4 h-4 mr-2" />
                Trends
              </TabsTrigger>
            </TabsList>

            <TabsContent value="entries" className="mt-4">
              <div className="space-y-4">
                {mockJournalEntries.map((entry) => (
                  <Card key={entry.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-4">
                          <div className="flex flex-col items-center">
                            {getMoodIcon(entry.mood)}
                            <span className="text-xs text-muted-foreground mt-1 capitalize">{entry.mood}</span>
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <span className="font-semibold">{entry.date}</span>
                              <span className="text-sm text-muted-foreground">{entry.time}</span>
                              {entry.photos.length > 0 && (
                                <Badge variant="secondary">
                                  <Camera className="w-3 h-3 mr-1" />
                                  Photo
                                </Badge>
                              )}
                            </div>

                            {/* Metrics Row */}
                            <div className="flex flex-wrap gap-4 mb-3 text-sm">
                              <div className="flex items-center gap-1">
                                <Heart className="w-4 h-4 text-blue-500" />
                                <span>Wellbeing: {entry.overallWellbeing}/10</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Zap className="w-4 h-4 text-yellow-500" />
                                <span>Energy: {entry.energyLevel}/10</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Moon className="w-4 h-4 text-purple-500" />
                                <span>Sleep: {entry.sleepQuality}/10</span>
                              </div>
                              {entry.weight && (
                                <div className="flex items-center gap-1">
                                  <Scale className="w-4 h-4 text-green-500" />
                                  <span>{entry.weight} lbs</span>
                                </div>
                              )}
                            </div>

                            {/* Symptoms */}
                            {entry.symptoms.length > 0 && (
                              <div className="flex flex-wrap gap-1 mb-3">
                                {entry.symptoms.map((symptom) => (
                                  <Badge key={symptom} variant="outline" className="text-xs">
                                    {symptom}
                                  </Badge>
                                ))}
                              </div>
                            )}

                            {/* Notes */}
                            {entry.notes && (
                              <p className="text-sm text-muted-foreground">{entry.notes}</p>
                            )}

                            {/* Peptides Taken */}
                            {entry.peptidesTaken.length > 0 && (
                              <div className="mt-3 pt-3 border-t">
                                <p className="text-xs text-muted-foreground">
                                  <span className="font-medium">Peptides:</span> {entry.peptidesTaken.join(", ")}
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="flex gap-1">
                          <Button variant="ghost" size="icon">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="photos" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Progress Photos</CardTitle>
                  <CardDescription>Track your physical transformation over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {mockProgressPhotos.map((photo) => (
                      <div key={photo.id} className="relative group">
                        <div className="aspect-[3/4] bg-gray-100 rounded-lg flex items-center justify-center">
                          <Image className="w-12 h-12 text-gray-300" />
                        </div>
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                          <Button variant="secondary" size="sm">View</Button>
                        </div>
                        <p className="text-xs text-center mt-2 text-muted-foreground">{photo.date}</p>
                        <p className="text-xs text-center capitalize text-muted-foreground">{photo.category}</p>
                      </div>
                    ))}
                    <button
                      onClick={() => setIsPhotoUploadOpen(true)}
                      className="aspect-[3/4] border-2 border-dashed border-gray-200 rounded-lg flex flex-col items-center justify-center hover:border-gray-300 transition-colors"
                    >
                      <Plus className="w-8 h-8 text-gray-400" />
                      <span className="text-sm text-muted-foreground mt-2">Add Photo</span>
                    </button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="trends" className="mt-4">
              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Wellbeing Over Time</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-48 flex items-center justify-center bg-muted/50 rounded-lg">
                      <p className="text-muted-foreground text-sm">Chart visualization would go here</p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Energy Levels</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-48 flex items-center justify-center bg-muted/50 rounded-lg">
                      <p className="text-muted-foreground text-sm">Chart visualization would go here</p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Sleep Quality</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-48 flex items-center justify-center bg-muted/50 rounded-lg">
                      <p className="text-muted-foreground text-sm">Chart visualization would go here</p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Weight Tracking</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-48 flex items-center justify-center bg-muted/50 rounded-lg">
                      <p className="text-muted-foreground text-sm">Chart visualization would go here</p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Common Symptoms */}
              <Card className="mt-4">
                <CardHeader>
                  <CardTitle className="text-lg">Most Reported Symptoms (This Week)</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {["Improved focus", "Better sleep quality", "Improved stamina", "Low energy", "Mild nausea"].map((symptom, i) => (
                      <div key={symptom} className="flex items-center gap-3">
                        <div className="w-32 text-sm truncate">{symptom}</div>
                        <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                          <div
                            className="h-full bg-primary rounded-full"
                            style={{ width: `${100 - i * 20}%` }}
                          />
                        </div>
                        <div className="w-8 text-sm text-muted-foreground text-right">{5 - i}</div>
                      </div>
                    ))}
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
