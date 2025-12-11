"use client"

export const dynamic = 'force-dynamic'

import { ProtectedRoute } from "@/components/protected-route"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Activity, Calendar, ShoppingCart, Search, BookOpen } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
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
    image: "/bpc-157-5mg-peptide-vial-with-blue-cap-and-alpha-b.jpg",
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
    image: "/bpc-157-10mg-peptide-vial-with-blue-cap-and-alpha-.jpg",
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
    image: "/bpc-157-20mg-peptide-vial-with-blue-cap-and-alpha-.jpg",
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
    image: "/bpc-157-oral-tablets-bottle-with-alpha-biomed-labe.jpg",
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
    image: "/tb-500-5mg-peptide-vial-with-blue-cap-and-alpha-bi.jpg",
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
    image: "/tb-500-10mg-peptide-vial-with-blue-cap-and-alpha-b.jpg",
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
    image: "/kpv-5mg-peptide-vial-with-blue-cap-and-alpha-biome.jpg",
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
    image: "/ll-37-5mg-peptide-vial-with-blue-cap-and-alpha-bio.jpg",
  },

  // Growth Hormone & Blends
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
    image: "/cjc-1295-no-dac-5mg-peptide-vial-with-blue-cap-and.jpg",
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
    image: "/cjc-1295-no-dac-10mg-peptide-vial-with-blue-cap-an.jpg",
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
    image: "/cjc-1295-with-dac-10mg-peptide-vial-with-blue-cap-.jpg",
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
    image: "/ipamorelin-5mg-peptide-vial-with-blue-cap-and-alph.jpg",
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
    image: "/ipamorelin-10mg-peptide-vial-with-blue-cap-and-alp.jpg",
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
    image: "/tesamorelin-5mg-peptide-vial-with-blue-cap-and-alp.jpg",
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
    image: "/tesamorelin-10mg-peptide-vial-with-blue-cap-and-al.jpg",
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
    image: "/placeholder.svg?height=300&width=300",
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
    image: "/placeholder.svg?height=300&width=300",
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
    image: "/placeholder.svg?height=300&width=300",
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
    image: "/placeholder.svg?height=300&width=300",
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
    image: "/placeholder.svg?height=300&width=300",
  },

  // Peptide Blends
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
    image: "/placeholder.svg?height=300&width=300",
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
    image: "/placeholder.svg?height=300&width=300",
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
    image: "/placeholder.svg?height=300&width=300",
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
    image: "/placeholder.svg?height=300&width=300",
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
    image: "/placeholder.svg?height=300&width=300",
  },

  // Weight Management & Metabolic
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
    image: "/placeholder.svg?height=300&width=300",
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
    image: "/placeholder.svg?height=300&width=300",
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
    image: "/placeholder.svg?height=300&width=300",
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
    image: "/placeholder.svg?height=300&width=300",
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
    image: "/placeholder.svg?height=300&width=300",
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
    image: "/placeholder.svg?height=300&width=300",
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
    image: "/placeholder.svg?height=300&width=300",
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
    image: "/placeholder.svg?height=300&width=300",
  },

  // Cognitive & Neurological
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
    image: "/placeholder.svg?height=300&width=300",
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
    image: "/placeholder.svg?height=300&width=300",
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
    image: "/placeholder.svg?height=300&width=300",
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
    image: "/placeholder.svg?height=300&width=300",
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
    image: "/placeholder.svg?height=300&width=300",
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
    image: "/placeholder.svg?height=300&width=300",
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
    image: "/placeholder.svg?height=300&width=300",
  },

  // Anti-Aging & Longevity
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
    image: "/placeholder.svg?height=300&width=300",
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
    image: "/placeholder.svg?height=300&width=300",
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
    image: "/placeholder.svg?height=300&width=300",
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
    image: "/placeholder.svg?height=300&width=300",
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
    image: "/placeholder.svg?height=300&width=300",
  },

  // Sexual Health & Performance
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
    image: "/placeholder.svg?height=300&width=300",
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
    image: "/placeholder.svg?height=300&width=300",
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
    image: "/placeholder.svg?height=300&width=300",
  },

  // Sleep & Recovery
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
    image: "/placeholder.svg?height=300&width=300",
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
    image: "/placeholder.svg?height=300&width=300",
  },

  // Skin & Aesthetics
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
    image: "/placeholder.svg?height=300&width=300",
  },

  // Performance & Muscle
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
    image: "/placeholder.svg?height=300&width=300",
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
    image: "/placeholder.svg?height=300&width=300",
  },
]

export default function PeptideLibraryPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

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
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Peptide Library</h2>
            <p className="text-muted-foreground">
              Browse Alpha BioMed's complete peptide catalog - {peptides.length} products available
            </p>
          </div>

          {/* Search and Filter */}
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

          {/* Popular Peptides */}
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
                      <div className="w-full h-48 bg-muted rounded-lg overflow-hidden mb-3">
                        <img
                          src={peptide.image || "/placeholder.svg"}
                          alt={peptide.name}
                          className="w-full h-full object-contain"
                        />
                      </div>
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
                      <Link href={`/provider/peptides/${peptide.id}`}>
                        <Button variant="outline" className="w-full bg-transparent">
                          View Details
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* All Peptides */}
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
                      <div className="w-full h-48 bg-muted rounded-lg overflow-hidden mb-3">
                        <img
                          src={peptide.image || "/placeholder.svg"}
                          alt={peptide.name}
                          className="w-full h-full object-contain"
                        />
                      </div>
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
                      <Link href={`/provider/peptides/${peptide.id}`}>
                        <Button variant="outline" className="w-full bg-transparent">
                          View Details
                        </Button>
                      </Link>
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
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  )
}
