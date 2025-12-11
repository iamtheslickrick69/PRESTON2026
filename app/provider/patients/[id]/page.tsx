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
  ArrowLeft,
  Edit,
  Plus,
  FileText,
  Pill,
  BookOpen,
  Search,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"
import { useState } from "react"

const peptides = [
  // Healing & Recovery
  {
    id: "bpc-157-5mg",
    name: "BPC-157 (5mg)",
    fullName: "Body Protection Compound-157",
    category: "Healing & Recovery",
    description: "Promotes healing of muscles, tendons, and ligaments. Supports gut health and tissue repair.",
    commonDose: "250-500 mcg",
    frequency: "1-2x daily",
    route: "Subcutaneous or Oral",
    price: "$45",
    popular: true,
  },
  {
    id: "bpc-157-10mg",
    name: "BPC-157 (10mg)",
    fullName: "Body Protection Compound-157",
    category: "Healing & Recovery",
    description: "Higher dose BPC-157 for enhanced healing and recovery protocols.",
    commonDose: "250-500 mcg",
    frequency: "1-2x daily",
    route: "Subcutaneous or Oral",
    price: "$75",
    popular: true,
  },
  {
    id: "bpc-157-20mg",
    name: "BPC-157 (20mg)",
    fullName: "Body Protection Compound-157",
    category: "Healing & Recovery",
    description: "Maximum strength BPC-157 for extended treatment protocols.",
    commonDose: "250-500 mcg",
    frequency: "1-2x daily",
    route: "Subcutaneous or Oral",
    price: "$135",
    popular: false,
  },
  {
    id: "bpc-157-tablets",
    name: "BPC-157 (500mcg) x 30 Tablets",
    fullName: "Body Protection Compound-157 Oral Tablets",
    category: "Healing & Recovery",
    description: "Convenient oral tablet form of BPC-157 for gut health and systemic healing.",
    commonDose: "500 mcg",
    frequency: "1-2x daily",
    route: "Oral",
    price: "$85",
    popular: false,
  },
  {
    id: "tb-500-5mg",
    name: "TB-500 (5mg)",
    fullName: "Thymosin Beta-4",
    category: "Healing & Recovery",
    description: "Accelerates wound healing, reduces inflammation, and promotes tissue regeneration.",
    commonDose: "2-2.5 mg",
    frequency: "2x weekly",
    route: "Subcutaneous",
    price: "$65",
    popular: true,
  },
  {
    id: "tb-500-10mg",
    name: "TB-500 (10mg)",
    fullName: "Thymosin Beta-4",
    category: "Healing & Recovery",
    description: "Higher concentration TB-500 for intensive healing protocols.",
    commonDose: "2-2.5 mg",
    frequency: "2x weekly",
    route: "Subcutaneous",
    price: "$115",
    popular: false,
  },
  {
    id: "kpv-5mg",
    name: "KPV (5mg)",
    fullName: "Lysine-Proline-Valine",
    category: "Healing & Recovery",
    description: "Anti-inflammatory peptide for gut health and inflammatory conditions.",
    commonDose: "500 mcg",
    frequency: "1-2x daily",
    route: "Subcutaneous or Oral",
    price: "$55",
    popular: false,
  },
  {
    id: "ll-37-5mg",
    name: "LL-37 (5mg)",
    fullName: "Antimicrobial Peptide",
    category: "Healing & Recovery",
    description: "Supports immune function and wound healing with antimicrobial properties.",
    commonDose: "200-400 mcg",
    frequency: "Daily",
    route: "Subcutaneous",
    price: "$95",
    popular: false,
  },
  {
    id: "cjc-1295-no-dac-5mg",
    name: "CJC-1295 No DAC (5mg)",
    fullName: "Modified Growth Hormone Releasing Hormone",
    category: "Growth Hormone",
    description: "Increases growth hormone production without DAC for more frequent dosing.",
    commonDose: "100-200 mcg",
    frequency: "2-3x daily",
    route: "Subcutaneous",
    price: "$55",
    popular: true,
  },
  {
    id: "cjc-1295-no-dac-10mg",
    name: "CJC-1295 No DAC (10mg)",
    fullName: "Modified Growth Hormone Releasing Hormone",
    category: "Growth Hormone",
    description: "Higher dose CJC-1295 without DAC for extended protocols.",
    commonDose: "100-200 mcg",
    frequency: "2-3x daily",
    route: "Subcutaneous",
    price: "$95",
    popular: false,
  },
  {
    id: "cjc-1295-with-dac-10mg",
    name: "CJC-1295 with DAC (10mg)",
    fullName: "Drug Affinity Complex GHRH",
    category: "Growth Hormone",
    description: "Long-acting GH secretagogue with extended half-life.",
    commonDose: "1-2 mg",
    frequency: "1-2x weekly",
    route: "Subcutaneous",
    price: "$95",
    popular: true,
  },
  {
    id: "ipamorelin-5mg",
    name: "Ipamorelin (5mg)",
    fullName: "Growth Hormone Secretagogue",
    category: "Growth Hormone",
    description: "Stimulates natural GH release without affecting cortisol. Improves body composition.",
    commonDose: "200-300 mcg",
    frequency: "1-2x daily",
    route: "Subcutaneous",
    price: "$55",
    popular: true,
  },
  {
    id: "ipamorelin-10mg",
    name: "Ipamorelin (10mg)",
    fullName: "Growth Hormone Secretagogue",
    category: "Growth Hormone",
    description: "Higher concentration Ipamorelin for extended treatment cycles.",
    commonDose: "200-300 mcg",
    frequency: "1-2x daily",
    route: "Subcutaneous",
    price: "$95",
    popular: false,
  },
  {
    id: "tesamorelin-5mg",
    name: "Tesamorelin (5mg)",
    fullName: "Growth Hormone Releasing Hormone Analog",
    category: "Growth Hormone",
    description: "Reduces visceral adipose tissue, particularly effective for abdominal fat.",
    commonDose: "1-2 mg",
    frequency: "Daily",
    route: "Subcutaneous",
    price: "$85",
    popular: true,
  },
  {
    id: "tesamorelin-10mg",
    name: "Tesamorelin (10mg)",
    fullName: "Growth Hormone Releasing Hormone Analog",
    category: "Growth Hormone",
    description: "Higher dose Tesamorelin for enhanced visceral fat reduction.",
    commonDose: "1-2 mg",
    frequency: "Daily",
    route: "Subcutaneous",
    price: "$155",
    popular: false,
  },
  {
    id: "sermorelin-5mg",
    name: "Sermorelin (5mg)",
    fullName: "Growth Hormone Releasing Hormone",
    category: "Growth Hormone",
    description: "Stimulates natural GH production, improves sleep quality and body composition.",
    commonDose: "200-300 mcg",
    frequency: "Daily before bed",
    route: "Subcutaneous",
    price: "$65",
    popular: false,
  },
  {
    id: "ghrp-2-5mg",
    name: "GHRP-2 (5mg)",
    fullName: "Growth Hormone Releasing Peptide-2",
    category: "Growth Hormone",
    description: "Potent GH secretagogue that increases appetite and GH levels.",
    commonDose: "100-300 mcg",
    frequency: "2-3x daily",
    route: "Subcutaneous",
    price: "$55",
    popular: false,
  },
  {
    id: "ghrp-6-5mg",
    name: "GHRP-6 (5mg)",
    fullName: "Growth Hormone Releasing Peptide-6",
    category: "Growth Hormone",
    description: "Stimulates GH release and increases appetite.",
    commonDose: "100-300 mcg",
    frequency: "2-3x daily",
    route: "Subcutaneous",
    price: "$55",
    popular: false,
  },
  {
    id: "hexarelin-5mg",
    name: "Hexarelin (5mg)",
    fullName: "Growth Hormone Secretagogue",
    category: "Growth Hormone",
    description: "Powerful GH releaser with cardioprotective properties.",
    commonDose: "100-200 mcg",
    frequency: "2x daily",
    route: "Subcutaneous",
    price: "$75",
    popular: false,
  },
  {
    id: "mgf-2mg",
    name: "MGF (2mg)",
    fullName: "Mechano Growth Factor",
    category: "Growth Hormone",
    description: "Promotes muscle growth and repair after exercise-induced damage.",
    commonDose: "200-400 mcg",
    frequency: "Post-workout",
    route: "Subcutaneous or IM",
    price: "$65",
    popular: false,
  },
  {
    id: "2x-cjc-ipa-5-5",
    name: "2X Blend CJC-1295 No DAC (5mg) / Ipamorelin (5mg)",
    fullName: "Growth Hormone Optimization Blend",
    category: "Peptide Blends",
    description: "Synergistic combination for enhanced GH release and body composition.",
    commonDose: "200-300 mcg combined",
    frequency: "1-2x daily",
    route: "Subcutaneous",
    price: "$95",
    popular: true,
  },
  {
    id: "2x-tesa-ipa-10-5",
    name: "2X Blend Tesamorelin (10mg) / Ipamorelin (5mg)",
    fullName: "Fat Loss & GH Blend",
    category: "Peptide Blends",
    description: "Targets visceral fat while promoting GH release.",
    commonDose: "1-2 mg Tesa + 200 mcg Ipa",
    frequency: "Daily",
    route: "Subcutaneous",
    price: "$185",
    popular: true,
  },
  {
    id: "2x-tesa-ipa-5-5",
    name: "2X Blend Tesamorelin (5mg) / Ipamorelin (5mg)",
    fullName: "Fat Loss & GH Blend",
    category: "Peptide Blends",
    description: "Balanced blend for fat reduction and GH optimization.",
    commonDose: "1 mg Tesa + 200 mcg Ipa",
    frequency: "Daily",
    route: "Subcutaneous",
    price: "$125",
    popular: false,
  },
  {
    id: "3x-tesa-mgf-ipa",
    name: "3X Blend Tesamorelin (5mg) / MGF (500mcg) / Ipamorelin (2.5mg)",
    fullName: "Advanced Body Recomposition Blend",
    category: "Peptide Blends",
    description: "Triple-action formula for fat loss, muscle growth, and GH optimization.",
    commonDose: "As directed",
    frequency: "Daily",
    route: "Subcutaneous",
    price: "$145",
    popular: false,
  },
  {
    id: "4x-ghrp2-tesa-mgf-ipa",
    name: "4X Blend GHRP-2 (5mg) / Tesamorelin (5mg) / MGF (500mcg) / Ipamorelin (2.5mg)",
    fullName: "Ultimate Performance Blend",
    category: "Peptide Blends",
    description: "Comprehensive blend for maximum GH release, fat loss, and muscle growth.",
    commonDose: "As directed",
    frequency: "Daily",
    route: "Subcutaneous",
    price: "$175",
    popular: false,
  },
  {
    id: "semaglutide-5mg",
    name: "Semaglutide (5mg)",
    fullName: "GLP-1 Receptor Agonist",
    category: "Weight Management",
    description: "Promotes weight loss, improves glycemic control, and reduces appetite.",
    commonDose: "0.25-2.4 mg",
    frequency: "Weekly",
    route: "Subcutaneous",
    price: "$285",
    popular: true,
  },
  {
    id: "semaglutide-10mg",
    name: "Semaglutide (10mg)",
    fullName: "GLP-1 Receptor Agonist",
    category: "Weight Management",
    description: "Higher concentration for extended treatment protocols.",
    commonDose: "0.25-2.4 mg",
    frequency: "Weekly",
    route: "Subcutaneous",
    price: "$485",
    popular: true,
  },
  {
    id: "tirzepatide-10mg",
    name: "Tirzepatide (10mg)",
    fullName: "GLP-1/GIP Dual Agonist",
    category: "Weight Management",
    description: "Dual-action weight loss peptide with superior efficacy for metabolic health.",
    commonDose: "2.5-15 mg",
    frequency: "Weekly",
    route: "Subcutaneous",
    price: "$385",
    popular: true,
  },
  {
    id: "tirzepatide-15mg",
    name: "Tirzepatide (15mg)",
    fullName: "GLP-1/GIP Dual Agonist",
    category: "Weight Management",
    description: "Maximum strength Tirzepatide for advanced weight management.",
    commonDose: "2.5-15 mg",
    frequency: "Weekly",
    route: "Subcutaneous",
    price: "$525",
    popular: false,
  },
  {
    id: "aod-9604-3mg",
    name: "AOD 9604 (3mg)",
    fullName: "Anti-Obesity Drug Fragment",
    category: "Weight Management",
    description: "Modified GH fragment that promotes fat loss without affecting blood sugar.",
    commonDose: "300-600 mcg",
    frequency: "Daily",
    route: "Subcutaneous",
    price: "$55",
    popular: false,
  },
  {
    id: "aod-9604-5mg",
    name: "AOD 9604 (5mg)",
    fullName: "Anti-Obesity Drug Fragment",
    category: "Weight Management",
    description: "Higher dose AOD for enhanced fat loss protocols.",
    commonDose: "300-600 mcg",
    frequency: "Daily",
    route: "Subcutaneous",
    price: "$85",
    popular: false,
  },
  {
    id: "5-amino-1mq-tablets",
    name: "5-Amino-1MQ (25mg) x 60 Tablets",
    fullName: "NNMT Inhibitor",
    category: "Weight Management",
    description: "Oral metabolic enhancer that supports fat loss and energy metabolism.",
    commonDose: "25-50 mg",
    frequency: "Daily",
    route: "Oral",
    price: "$125",
    popular: false,
  },
  {
    id: "mots-c-5mg",
    name: "MOTS-c (5mg)",
    fullName: "Mitochondrial-Derived Peptide",
    category: "Weight Management",
    description: "Enhances metabolic function and insulin sensitivity.",
    commonDose: "5-10 mg",
    frequency: "2-3x weekly",
    route: "Subcutaneous",
    price: "$85",
    popular: false,
  },
  {
    id: "bdnf-10mg",
    name: "BDNF (10mg)",
    fullName: "Brain-Derived Neurotrophic Factor",
    category: "Cognitive Enhancement",
    description: "Supports neuroplasticity, cognitive function, and neuroprotection.",
    commonDose: "500 mcg - 1 mg",
    frequency: "2-3x weekly",
    route: "Subcutaneous",
    price: "$145",
    popular: false,
  },
  {
    id: "cerebrolysin-5ml",
    name: "Cerebrolysin (5mL)",
    fullName: "Neurotrophic Peptide Complex",
    category: "Cognitive Enhancement",
    description: "Neuroprotective and neurotrophic effects for cognitive enhancement.",
    commonDose: "5-10 mL",
    frequency: "Daily for 10-20 days",
    route: "Intramuscular",
    price: "$95",
    popular: false,
  },
  {
    id: "dihexa-tablets",
    name: "Dihexa (5mg) x 30 Tablets",
    fullName: "Cognitive Enhancement Peptide",
    category: "Cognitive Enhancement",
    description: "Potent cognitive enhancer that promotes synaptogenesis.",
    commonDose: "5-10 mg",
    frequency: "Daily",
    route: "Oral",
    price: "$165",
    popular: false,
  },
  {
    id: "semax-5mg",
    name: "Semax (5mg)",
    fullName: "Neuroprotective Peptide",
    category: "Cognitive Enhancement",
    description: "Enhances cognitive function, focus, and neuroprotection.",
    commonDose: "300-600 mcg",
    frequency: "1-2x daily",
    route: "Intranasal or Subcutaneous",
    price: "$75",
    popular: false,
  },
  {
    id: "selank-5mg",
    name: "Selank (5mg)",
    fullName: "Anxiolytic Peptide",
    category: "Cognitive Enhancement",
    description: "Reduces anxiety and enhances cognitive function without sedation.",
    commonDose: "250-500 mcg",
    frequency: "1-2x daily",
    route: "Intranasal or Subcutaneous",
    price: "$75",
    popular: false,
  },
  {
    id: "p21-5mg",
    name: "P21 (5mg)",
    fullName: "Cerebrolysin-Derived Peptide",
    category: "Cognitive Enhancement",
    description: "Promotes neurogenesis and cognitive enhancement.",
    commonDose: "1-5 mg",
    frequency: "Daily",
    route: "Subcutaneous",
    price: "$95",
    popular: false,
  },
  {
    id: "nsi-189-40mg",
    name: "NSI-189 (40mg)",
    fullName: "Neurogenic Compound",
    category: "Cognitive Enhancement",
    description: "Promotes hippocampal neurogenesis and mood enhancement.",
    commonDose: "40 mg",
    frequency: "1-2x daily",
    route: "Oral",
    price: "$125",
    popular: false,
  },
  {
    id: "epithalon-10mg",
    name: "Epithalon (10mg)",
    fullName: "Epitalon Tetrapeptide",
    category: "Anti-Aging",
    description: "May increase telomerase activity and promote longevity. Regulates circadian rhythm.",
    commonDose: "5-10 mg",
    frequency: "Daily for 10-20 days",
    route: "Subcutaneous",
    price: "$85",
    popular: false,
  },
  {
    id: "ghk-cu-50mg",
    name: "GHK-Cu (50mg)",
    fullName: "Copper Peptide",
    category: "Anti-Aging",
    description: "Promotes collagen production, wound healing, and skin rejuvenation.",
    commonDose: "1-2 mg",
    frequency: "Daily",
    route: "Subcutaneous or Topical",
    price: "$95",
    popular: false,
  },
  {
    id: "thymalin-10mg",
    name: "Thymalin (10mg)",
    fullName: "Thymus Extract Peptide",
    category: "Anti-Aging",
    description: "Supports immune function and promotes longevity.",
    commonDose: "5-10 mg",
    frequency: "Daily for 10 days",
    route: "Subcutaneous or IM",
    price: "$95",
    popular: false,
  },
  {
    id: "thymosin-alpha-1-10mg",
    name: "Thymosin Alpha-1 (10mg)",
    fullName: "Immune Modulating Peptide",
    category: "Anti-Aging",
    description: "Enhances immune function and has anti-aging properties.",
    commonDose: "1.6 mg",
    frequency: "2x weekly",
    route: "Subcutaneous",
    price: "$125",
    popular: false,
  },
  {
    id: "nad-500mg",
    name: "NAD+ (500mg)",
    fullName: "Nicotinamide Adenine Dinucleotide",
    category: "Anti-Aging",
    description: "Cellular energy and longevity support.",
    commonDose: "100-500 mg",
    frequency: "1-2x weekly",
    route: "IV or Subcutaneous",
    price: "$95",
    popular: false,
  },
  {
    id: "pt-141-10mg",
    name: "PT-141 (10mg)",
    fullName: "Bremelanotide",
    category: "Sexual Health",
    description: "Enhances sexual function and libido in both men and women.",
    commonDose: "1-2 mg",
    frequency: "As needed",
    route: "Subcutaneous",
    price: "$85",
    popular: true,
  },
  {
    id: "melanotan-2-10mg",
    name: "Melanotan II (10mg)",
    fullName: "MT-2",
    category: "Sexual Health",
    description: "Promotes skin tanning and may enhance libido.",
    commonDose: "250-500 mcg",
    frequency: "2-3x weekly",
    route: "Subcutaneous",
    price: "$65",
    popular: false,
  },
  {
    id: "kisspeptin-10-5mg",
    name: "Kisspeptin-10 (5mg)",
    fullName: "Reproductive Hormone Regulator",
    category: "Sexual Health",
    description: "Supports reproductive hormone function and libido.",
    commonDose: "1-2 mcg/kg",
    frequency: "As directed",
    route: "Subcutaneous",
    price: "$95",
    popular: false,
  },
  {
    id: "dsip-5mg",
    name: "DSIP (5mg)",
    fullName: "Delta Sleep-Inducing Peptide",
    category: "Sleep & Recovery",
    description: "Promotes deep sleep and stress reduction.",
    commonDose: "100-300 mcg",
    frequency: "Before bed",
    route: "Subcutaneous",
    price: "$65",
    popular: false,
  },
  {
    id: "dsip-10mg",
    name: "DSIP (10mg)",
    fullName: "Delta Sleep-Inducing Peptide",
    category: "Sleep & Recovery",
    description: "Higher dose for enhanced sleep quality.",
    commonDose: "100-300 mcg",
    frequency: "Before bed",
    route: "Subcutaneous",
    price: "$115",
    popular: false,
  },
  {
    id: "capryloside-10mg",
    name: "Capryloside (10mg)",
    fullName: "Skin Rejuvenation Peptide",
    category: "Skin & Aesthetics",
    description: "Promotes skin health and rejuvenation.",
    commonDose: "As directed",
    frequency: "Daily",
    route: "Topical or Subcutaneous",
    price: "$85",
    popular: false,
  },
  {
    id: "follistatin-344-1mg",
    name: "Follistatin-344 (1mg)",
    fullName: "Myostatin Inhibitor",
    category: "Performance",
    description: "Promotes muscle growth by inhibiting myostatin.",
    commonDose: "100 mcg",
    frequency: "Daily",
    route: "Subcutaneous",
    price: "$145",
    popular: false,
  },
  {
    id: "ace-031-1mg",
    name: "ACE-031 (1mg)",
    fullName: "Myostatin Inhibitor",
    category: "Performance",
    description: "Powerful muscle growth promoter.",
    commonDose: "As directed",
    frequency: "Weekly",
    route: "Subcutaneous",
    price: "$185",
    popular: false,
  },
]

export default function PatientRecordPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [activeTab, setActiveTab] = useState("overview")

  const filteredPeptides = peptides.filter((peptide) => {
    const matchesSearch =
      peptide.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      peptide.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      peptide.fullName.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || peptide.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const popularPeptides = filteredPeptides.filter((p) => p.popular)
  const otherPeptides = filteredPeptides.filter((p) => !p.popular)

  return (
    <ProtectedRoute allowedRoles={["provider", "clinic_admin"]}>
      <DashboardLayout>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/provider/patients">
                <Button variant="ghost" size="icon">
                  <ArrowLeft className="w-4 h-4" />
                </Button>
              </Link>
              <div>
                <h2 className="text-3xl font-bold tracking-tight">Sarah Johnson</h2>
                <p className="text-muted-foreground">42 years old • Female • Patient ID: P-001234</p>
              </div>
            </div>
            <Button variant="outline" className="bg-transparent">
              <Edit className="w-4 h-4 mr-2" />
              Edit Record
            </Button>
          </div>

          {/* Quick Stats */}
          <div className="grid gap-4 md:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Peptides</CardTitle>
                <Pill className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2</div>
                <p className="text-xs text-muted-foreground">BPC-157, TB-500</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Last Visit</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">Jan 15</div>
                <p className="text-xs text-muted-foreground">2024</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
                <ShoppingCart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">8</div>
                <p className="text-xs text-muted-foreground">Since Nov 2023</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Next Appointment</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">Feb 5</div>
                <p className="text-xs text-muted-foreground">10:00 AM</p>
              </CardContent>
            </Card>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="peptides">Active Peptides</TabsTrigger>
              <TabsTrigger value="library">Peptide Library</TabsTrigger>
              <TabsTrigger value="labs">Lab Results</TabsTrigger>
              <TabsTrigger value="visits">Visit History</TabsTrigger>
              <TabsTrigger value="notes">Notes</TabsTrigger>
            </TabsList>

            {/* Overview */}
            <TabsContent value="overview" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Demographics</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Date of Birth:</span>
                      <span className="font-medium">March 15, 1982</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Gender:</span>
                      <span className="font-medium">Female</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Phone:</span>
                      <span className="font-medium">(555) 123-4567</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Email:</span>
                      <span className="font-medium">sarah.j@email.com</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Address:</span>
                      <span className="font-medium">123 Main St, Los Angeles, CA</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Medical Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Height:</span>
                      <span className="font-medium">5'6"</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Weight:</span>
                      <span className="font-medium">145 lbs</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Blood Type:</span>
                      <span className="font-medium">O+</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Allergies:</span>
                      <span className="font-medium">Penicillin</span>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Current Medical Conditions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <Badge variant="outline">Chronic Joint Pain</Badge>
                    <Badge variant="outline">Mild Hypertension</Badge>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Current Medications</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li>• Lisinopril 10mg - Once daily</li>
                    <li>• Vitamin D3 2000 IU - Once daily</li>
                    <li>• Omega-3 Fish Oil - Twice daily</li>
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Active Peptides */}
            <TabsContent value="peptides" className="space-y-4">
              <div className="flex justify-end">
                <Button onClick={() => setActiveTab("library")} className="bg-[#33669A] hover:bg-[#2a5580] text-white">
                  <Plus className="w-4 h-4 mr-2" />
                  Prescribe Peptide
                </Button>
              </div>

              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>BPC-157</CardTitle>
                      <CardDescription>Body Protection Compound</CardDescription>
                    </div>
                    <Badge>Active</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Dosage:</span>
                      <p className="font-medium">250 mcg</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Frequency:</span>
                      <p className="font-medium">Twice daily</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Route:</span>
                      <p className="font-medium">Subcutaneous injection</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Started:</span>
                      <p className="font-medium">Nov 15, 2023</p>
                    </div>
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground">Indication:</span>
                    <p className="text-sm">Joint pain and tissue repair</p>
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground">Reconstitution:</span>
                    <p className="text-sm">5mg vial + 2ml bacteriostatic water</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>TB-500</CardTitle>
                      <CardDescription>Thymosin Beta-4</CardDescription>
                    </div>
                    <Badge>Active</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Dosage:</span>
                      <p className="font-medium">2 mg</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Frequency:</span>
                      <p className="font-medium">Twice weekly</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Route:</span>
                      <p className="font-medium">Subcutaneous injection</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Started:</span>
                      <p className="font-medium">Dec 1, 2023</p>
                    </div>
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground">Indication:</span>
                    <p className="text-sm">Muscle recovery and inflammation</p>
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground">Reconstitution:</span>
                    <p className="text-sm">5mg vial + 2ml bacteriostatic water</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="library" className="space-y-4">
              <div className="flex gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search peptides by name or indication..."
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-[220px]">
                    <SelectValue placeholder="All Categories" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="Healing & Recovery">Healing & Recovery</SelectItem>
                    <SelectItem value="Growth Hormone">Growth Hormone</SelectItem>
                    <SelectItem value="Peptide Blends">Peptide Blends</SelectItem>
                    <SelectItem value="Weight Management">Weight Management</SelectItem>
                    <SelectItem value="Cognitive Enhancement">Cognitive Enhancement</SelectItem>
                    <SelectItem value="Anti-Aging">Anti-Aging</SelectItem>
                    <SelectItem value="Sexual Health">Sexual Health</SelectItem>
                    <SelectItem value="Sleep & Recovery">Sleep & Recovery</SelectItem>
                    <SelectItem value="Skin & Aesthetics">Skin & Aesthetics</SelectItem>
                    <SelectItem value="Performance">Performance</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {popularPeptides.length > 0 && (
                <div>
                  <h3 className="text-xl font-semibold mb-4">Most Prescribed</h3>
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {popularPeptides.map((peptide) => (
                      <Card key={peptide.id} className="hover:shadow-lg transition-shadow">
                        <CardHeader>
                          <div className="flex items-start justify-between">
                            <div>
                              <CardTitle className="text-lg">{peptide.name}</CardTitle>
                              <CardDescription className="text-xs">{peptide.fullName}</CardDescription>
                            </div>
                            <Badge variant="secondary">{peptide.category}</Badge>
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <p className="text-sm text-muted-foreground line-clamp-2">{peptide.description}</p>
                          <div className="space-y-1 text-sm">
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Common Dose:</span>
                              <span className="font-medium">{peptide.commonDose}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Frequency:</span>
                              <span className="font-medium">{peptide.frequency}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Route:</span>
                              <span className="font-medium">{peptide.route}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Price:</span>
                              <span className="font-semibold text-primary">{peptide.price}</span>
                            </div>
                          </div>
                          <Button className="w-full bg-[#33669A] hover:bg-[#2a5580] text-white">
                            <Plus className="w-4 h-4 mr-2" />
                            Prescribe to Patient
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}

              {otherPeptides.length > 0 && (
                <div>
                  <h3 className="text-xl font-semibold mb-4">All Peptides ({otherPeptides.length})</h3>
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {otherPeptides.map((peptide) => (
                      <Card key={peptide.id} className="hover:shadow-lg transition-shadow">
                        <CardHeader>
                          <div className="flex items-start justify-between">
                            <div>
                              <CardTitle className="text-lg">{peptide.name}</CardTitle>
                              <CardDescription className="text-xs">{peptide.fullName}</CardDescription>
                            </div>
                            <Badge variant="secondary">{peptide.category}</Badge>
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <p className="text-sm text-muted-foreground line-clamp-2">{peptide.description}</p>
                          <div className="space-y-1 text-sm">
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Common Dose:</span>
                              <span className="font-medium">{peptide.commonDose}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Frequency:</span>
                              <span className="font-medium">{peptide.frequency}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Route:</span>
                              <span className="font-medium">{peptide.route}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Price:</span>
                              <span className="font-semibold text-primary">{peptide.price}</span>
                            </div>
                          </div>
                          <Button className="w-full bg-[#33669A] hover:bg-[#2a5580] text-white">
                            <Plus className="w-4 h-4 mr-2" />
                            Prescribe to Patient
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}

              {filteredPeptides.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">No peptides found matching your search criteria.</p>
                </div>
              )}
            </TabsContent>

            {/* Lab Results */}
            <TabsContent value="labs" className="space-y-4">
              <div className="flex justify-end">
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Lab Results
                </Button>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Complete Blood Count (CBC)</CardTitle>
                  <CardDescription>January 10, 2024</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">WBC:</span>
                      <span className="font-medium">7.2 K/uL (Normal)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">RBC:</span>
                      <span className="font-medium">4.5 M/uL (Normal)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Hemoglobin:</span>
                      <span className="font-medium">13.8 g/dL (Normal)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Platelets:</span>
                      <span className="font-medium">245 K/uL (Normal)</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Comprehensive Metabolic Panel</CardTitle>
                  <CardDescription>January 10, 2024</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Glucose:</span>
                      <span className="font-medium">92 mg/dL (Normal)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Creatinine:</span>
                      <span className="font-medium">0.9 mg/dL (Normal)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">ALT:</span>
                      <span className="font-medium">28 U/L (Normal)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">AST:</span>
                      <span className="font-medium">24 U/L (Normal)</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Visit History */}
            <TabsContent value="visits" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>January 15, 2024</CardTitle>
                  <CardDescription>Follow-up Visit</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <p>
                    <strong>Chief Complaint:</strong> Follow-up on BPC-157 and TB-500 treatment
                  </p>
                  <p>
                    <strong>Assessment:</strong> Patient reports significant improvement in joint pain. No adverse
                    effects noted.
                  </p>
                  <p>
                    <strong>Plan:</strong> Continue current peptide regimen. Schedule follow-up in 4 weeks.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>December 1, 2023</CardTitle>
                  <CardDescription>Initial Consultation</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <p>
                    <strong>Chief Complaint:</strong> Chronic joint pain, seeking peptide therapy
                  </p>
                  <p>
                    <strong>Assessment:</strong> Patient is good candidate for BPC-157 and TB-500 therapy
                  </p>
                  <p>
                    <strong>Plan:</strong> Initiate BPC-157 250mcg twice daily and TB-500 2mg twice weekly
                  </p>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Notes */}
            <TabsContent value="notes" className="space-y-4">
              <div className="flex justify-end">
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Note
                </Button>
              </div>

              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-base">Progress Note</CardTitle>
                      <CardDescription>January 15, 2024 - Dr. Sarah Johnson, NP</CardDescription>
                    </div>
                    <FileText className="w-4 h-4 text-muted-foreground" />
                  </div>
                </CardHeader>
                <CardContent className="text-sm">
                  <p>
                    Patient continues to show excellent response to peptide therapy. Joint pain has decreased from 7/10
                    to 3/10. Patient is compliant with dosing schedule and reports no side effects. Will continue
                    current treatment plan.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-base">Initial Assessment</CardTitle>
                      <CardDescription>December 1, 2023 - Dr. Sarah Johnson, NP</CardDescription>
                    </div>
                    <FileText className="w-4 h-4 text-muted-foreground" />
                  </div>
                </CardHeader>
                <CardContent className="text-sm">
                  <p>
                    New patient presenting with chronic joint pain. Medical history reviewed, consent forms signed.
                    Patient educated on peptide therapy, RUO disclosure provided. Initiated treatment plan with BPC-157
                    and TB-500.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  )
}
