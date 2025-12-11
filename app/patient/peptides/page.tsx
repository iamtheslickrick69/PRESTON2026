"use client"

export const dynamic = 'force-dynamic'

import { ProtectedRoute } from "@/components/protected-route"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Home,
  ShoppingCart,
  Package,
  Calculator,
  Calendar,
  BookOpen,
  Phone,
  Search,
  Heart,
  Zap,
  Brain,
  Activity,
  Moon,
  Sparkles,
} from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import Image from "next/image"

const categories = [
  { name: "All Peptides", icon: Activity, count: 70 },
  { name: "Healing & Recovery", icon: Heart, count: 12 },
  { name: "Growth Hormone", icon: Zap, count: 20 },
  { name: "Weight Management", icon: Zap, count: 8 },
  { name: "Cognitive Enhancement", icon: Brain, count: 7 },
  { name: "Anti-Aging", icon: Sparkles, count: 5 },
  { name: "Sleep & Recovery", icon: Moon, count: 2 },
]

const peptides = [
  // Healing & Recovery
  {
    id: "bpc-157-5mg",
    name: "BPC-157 (5mg)",
    category: "Healing & Recovery",
    description: "Promotes healing of muscles, tendons, and ligaments. Supports gut health and tissue repair.",
    commonDose: "250-500 mcg",
    frequency: "1-2x daily",
    route: "Subcutaneous or Oral",
    price: 45.0,
    image: "/bpc-157-5mg-peptide-vial-with-blue-cap-and-alpha-b.jpg", // Added product image
  },
  {
    id: "bpc-157-10mg",
    name: "BPC-157 (10mg)",
    category: "Healing & Recovery",
    description: "Higher dose BPC-157 for enhanced healing and recovery protocols.",
    commonDose: "250-500 mcg",
    frequency: "1-2x daily",
    route: "Subcutaneous or Oral",
    price: 75.0,
    image: "/bpc-157-10mg-peptide-vial-with-blue-cap-and-alpha-.jpg", // Added product image
  },
  {
    id: "bpc-157-20mg",
    name: "BPC-157 (20mg)",
    category: "Healing & Recovery",
    description: "Maximum strength BPC-157 for extended treatment protocols.",
    commonDose: "250-500 mcg",
    frequency: "1-2x daily",
    route: "Subcutaneous or Oral",
    price: 135.0,
    image: "/bpc-157-20mg-peptide-vial-with-blue-cap-and-alpha-.jpg", // Added product image
  },
  {
    id: "bpc-157-tablets",
    name: "BPC-157 (500mcg) x 30 Tablets",
    category: "Healing & Recovery",
    description: "Convenient oral tablet form of BPC-157 for gut health and systemic healing.",
    commonDose: "500 mcg",
    frequency: "1-2x daily",
    route: "Oral",
    price: 85.0,
    image: "/bpc-157-oral-tablets-bottle-with-alpha-biomed-labe.jpg", // Added product image
  },
  {
    id: "tb-500-5mg",
    name: "TB-500 (5mg)",
    category: "Healing & Recovery",
    description: "Accelerates wound healing, reduces inflammation, and promotes tissue regeneration.",
    commonDose: "2-2.5 mg",
    frequency: "2x weekly",
    route: "Subcutaneous",
    price: 65.0,
    image: "/tb-500-5mg-peptide-vial-with-blue-cap-and-alpha-bi.jpg", // Added product image
  },
  {
    id: "tb-500-10mg",
    name: "TB-500 (10mg)",
    category: "Healing & Recovery",
    description: "Higher concentration TB-500 for intensive healing protocols.",
    commonDose: "2-2.5 mg",
    frequency: "2x weekly",
    route: "Subcutaneous",
    price: 115.0,
    image: "/tb-500-10mg-peptide-vial-with-blue-cap-and-alpha-b.jpg", // Added product image
  },
  {
    id: "kpv-5mg",
    name: "KPV (5mg)",
    category: "Healing & Recovery",
    description: "Anti-inflammatory peptide for gut health and inflammatory conditions.",
    commonDose: "500 mcg",
    frequency: "1-2x daily",
    route: "Subcutaneous or Oral",
    price: 55.0,
    image: "/kpv-5mg-peptide-vial-with-blue-cap-and-alpha-biome.jpg", // Added product image
  },
  {
    id: "ll-37-5mg",
    name: "LL-37 (5mg)",
    category: "Healing & Recovery",
    description: "Supports immune function and wound healing with antimicrobial properties.",
    commonDose: "200-400 mcg",
    frequency: "Daily",
    route: "Subcutaneous",
    price: 95.0,
    image: "/ll-37-5mg-peptide-vial-with-blue-cap-and-alpha-bio.jpg", // Added product image
  },

  // Growth Hormone
  {
    id: "cjc-1295-no-dac-5mg",
    name: "CJC-1295 No DAC (5mg)",
    category: "Growth Hormone",
    description: "Increases growth hormone production without DAC for more frequent dosing.",
    commonDose: "100-200 mcg",
    frequency: "2-3x daily",
    route: "Subcutaneous",
    price: 55.0,
    image: "/cjc-1295-no-dac-5mg-peptide-vial-with-blue-cap-and.jpg", // Added product image
  },
  {
    id: "cjc-1295-no-dac-10mg",
    name: "CJC-1295 No DAC (10mg)",
    category: "Growth Hormone",
    description: "Higher dose CJC-1295 without DAC for extended protocols.",
    commonDose: "100-200 mcg",
    frequency: "2-3x daily",
    route: "Subcutaneous",
    price: 95.0,
    image: "/cjc-1295-no-dac-10mg-peptide-vial-with-blue-cap-an.jpg", // Added product image
  },
  {
    id: "cjc-1295-with-dac-10mg",
    name: "CJC-1295 with DAC (10mg)",
    category: "Growth Hormone",
    description: "Long-acting GH secretagogue with extended half-life.",
    commonDose: "1-2 mg",
    frequency: "1-2x weekly",
    route: "Subcutaneous",
    price: 95.0,
    image: "/cjc-1295-with-dac-10mg-peptide-vial-with-blue-cap-.jpg", // Added product image
  },
  {
    id: "ipamorelin-5mg",
    name: "Ipamorelin (5mg)",
    category: "Growth Hormone",
    description: "Stimulates natural GH release without affecting cortisol. Improves body composition.",
    commonDose: "200-300 mcg",
    frequency: "1-2x daily",
    route: "Subcutaneous",
    price: 55.0,
    image: "/ipamorelin-5mg-peptide-vial-with-blue-cap-and-alph.jpg", // Added product image
  },
  {
    id: "ipamorelin-10mg",
    name: "Ipamorelin (10mg)",
    category: "Growth Hormone",
    description: "Higher concentration Ipamorelin for extended treatment cycles.",
    commonDose: "200-300 mcg",
    frequency: "1-2x daily",
    route: "Subcutaneous",
    price: 95.0,
    image: "/ipamorelin-10mg-peptide-vial-with-blue-cap-and-alp.jpg", // Added product image
  },
  {
    id: "tesamorelin-5mg",
    name: "Tesamorelin (5mg)",
    category: "Growth Hormone",
    description: "Reduces visceral adipose tissue, particularly effective for abdominal fat.",
    commonDose: "1-2 mg",
    frequency: "Daily",
    route: "Subcutaneous",
    price: 85.0,
    image: "/tesamorelin-5mg-peptide-vial-with-blue-cap-and-alp.jpg", // Added product image
  },
  {
    id: "tesamorelin-10mg",
    name: "Tesamorelin (10mg)",
    category: "Growth Hormone",
    description: "Higher dose Tesamorelin for enhanced visceral fat reduction.",
    commonDose: "1-2 mg",
    frequency: "Daily",
    route: "Subcutaneous",
    price: 155.0,
    image: "/tesamorelin-10mg-peptide-vial-with-blue-cap-and-al.jpg", // Added product image
  },
  {
    id: "sermorelin-5mg",
    name: "Sermorelin (5mg)",
    category: "Growth Hormone",
    description: "Stimulates natural GH production, improves sleep quality and body composition.",
    commonDose: "200-300 mcg",
    frequency: "Daily before bed",
    route: "Subcutaneous",
    price: 65.0,
    image: "/sermorelin-5mg-peptide-vial-with-blue-cap-and-alph.jpg", // Added product image
  },
  {
    id: "ghrp-2-5mg",
    name: "GHRP-2 (5mg)",
    category: "Growth Hormone",
    description: "Potent GH secretagogue that increases appetite and GH levels.",
    commonDose: "100-300 mcg",
    frequency: "2-3x daily",
    route: "Subcutaneous",
    price: 55.0,
    image: "/ghrp-2-5mg-peptide-vial-with-blue-cap-and-alpha-bi.jpg", // Added product image
  },
  {
    id: "ghrp-6-5mg",
    name: "GHRP-6 (5mg)",
    category: "Growth Hormone",
    description: "Stimulates GH release and increases appetite.",
    commonDose: "100-300 mcg",
    frequency: "2-3x daily",
    route: "Subcutaneous",
    price: 55.0,
    image: "/ghrp-6-5mg-peptide-vial-with-blue-cap-and-alpha-bi.jpg", // Added product image
  },
  {
    id: "hexarelin-5mg",
    name: "Hexarelin (5mg)",
    category: "Growth Hormone",
    description: "Powerful GH releaser with cardioprotective properties.",
    commonDose: "100-200 mcg",
    frequency: "2x daily",
    route: "Subcutaneous",
    price: 75.0,
    image: "/hexarelin-5mg-peptide-vial-with-blue-cap-and-alpha.jpg", // Added product image
  },
  {
    id: "mgf-2mg",
    name: "MGF (2mg)",
    category: "Growth Hormone",
    description: "Promotes muscle growth and repair after exercise-induced damage.",
    commonDose: "200-400 mcg",
    frequency: "Post-workout",
    route: "Subcutaneous or IM",
    price: 65.0,
    image: "/mgf-2mg-peptide-vial-with-blue-cap-and-alpha-biome.jpg", // Added product image
  },

  // Peptide Blends
  {
    id: "2x-cjc-ipa-5-5",
    name: "2X Blend CJC-1295 No DAC (5mg) / Ipamorelin (5mg)",
    category: "Peptide Blends",
    description: "Synergistic combination for enhanced GH release and body composition.",
    commonDose: "200-300 mcg combined",
    frequency: "1-2x daily",
    route: "Subcutaneous",
    price: 95.0,
    image: "/2x-blend-cjc-1295-no-dac-5mg-ipamorelin-5mg-peptid.jpg", // Added product image
  },
  {
    id: "2x-tesa-ipa-10-5",
    name: "2X Blend Tesamorelin (10mg) / Ipamorelin (5mg)",
    category: "Peptide Blends",
    description: "Targets visceral fat while promoting GH release.",
    commonDose: "1-2 mg Tesa + 200 mcg Ipa",
    frequency: "Daily",
    route: "Subcutaneous",
    price: 185.0,
    image: "/2x-blend-tesamorelin-10mg-ipamorelin-5mg-peptide-v.jpg", // Added product image
  },
  {
    id: "2x-tesa-ipa-5-5",
    name: "2X Blend Tesamorelin (5mg) / Ipamorelin (5mg)",
    category: "Peptide Blends",
    description: "Balanced blend for fat reduction and GH optimization.",
    commonDose: "1 mg Tesa + 200 mcg Ipa",
    frequency: "Daily",
    route: "Subcutaneous",
    price: 125.0,
    image: "/2x-blend-tesamorelin-5mg-ipamorelin-5mg-peptide-vi.jpg", // Added product image
  },
  {
    id: "3x-tesa-mgf-ipa",
    name: "3X Blend Tesamorelin (5mg) / MGF (500mcg) / Ipamorelin (2.5mg)",
    category: "Peptide Blends",
    description: "Triple-action formula for fat loss, muscle growth, and GH optimization.",
    commonDose: "As directed",
    frequency: "Daily",
    route: "Subcutaneous",
    price: 145.0,
    image: "/3x-blend-tesamorelin-5mg-mgf-500mcg-ipamorelin-2-5.jpg", // Added product image
  },
  {
    id: "4x-ghrp2-tesa-mgf-ipa",
    name: "4X Blend GHRP-2 (5mg) / Tesamorelin (5mg) / MGF (500mcg) / Ipamorelin (2.5mg)",
    category: "Peptide Blends",
    description: "Comprehensive blend for maximum GH release, fat loss, and muscle growth.",
    commonDose: "As directed",
    frequency: "Daily",
    route: "Subcutaneous",
    price: 175.0,
    image: "/4x-blend-ghrp-2-5mg-tesamorelin-5mg-mgf-500mcg-ipa.jpg", // Added product image
  },

  // Weight Management
  {
    id: "semaglutide-5mg",
    name: "Semaglutide (5mg)",
    category: "Weight Management",
    description: "Promotes weight loss, improves glycemic control, and reduces appetite.",
    commonDose: "0.25-2.4 mg",
    frequency: "Weekly",
    route: "Subcutaneous",
    price: 285.0,
    image: "/semaglutide-5mg-peptide-vial-with-blue-cap-and-alp.jpg", // Added product image
  },
  {
    id: "semaglutide-10mg",
    name: "Semaglutide (10mg)",
    category: "Weight Management",
    description: "Higher concentration for extended treatment protocols.",
    commonDose: "0.25-2.4 mg",
    frequency: "Weekly",
    route: "Subcutaneous",
    price: 485.0,
    image: "/semaglutide-10mg-peptide-vial-with-blue-cap-and-al.jpg", // Added product image
  },
  {
    id: "tirzepatide-10mg",
    name: "Tirzepatide (10mg)",
    category: "Weight Management",
    description: "Dual-action weight loss peptide with superior efficacy for metabolic health.",
    commonDose: "2.5-15 mg",
    frequency: "Weekly",
    route: "Subcutaneous",
    price: 385.0,
    image: "/tirzepatide-10mg-peptide-vial-with-blue-cap-and-al.jpg", // Added product image
  },
  {
    id: "tirzepatide-15mg",
    name: "Tirzepatide (15mg)",
    category: "Weight Management",
    description: "Maximum strength Tirzepatide for advanced weight management.",
    commonDose: "2.5-15 mg",
    frequency: "Weekly",
    route: "Subcutaneous",
    price: 525.0,
    image: "/tirzepatide-15mg-peptide-vial-with-blue-cap-and-al.jpg", // Added product image
  },
  {
    id: "aod-9604-3mg",
    name: "AOD 9604 (3mg)",
    category: "Weight Management",
    description: "Modified GH fragment that promotes fat loss without affecting blood sugar.",
    commonDose: "300-600 mcg",
    frequency: "Daily",
    route: "Subcutaneous",
    price: 55.0,
    image: "/aod-9604-3mg-peptide-vial-with-blue-cap-and-alpha-.jpg", // Added product image
  },
  {
    id: "aod-9604-5mg",
    name: "AOD 9604 (5mg)",
    category: "Weight Management",
    description: "Higher dose AOD for enhanced fat loss protocols.",
    commonDose: "300-600 mcg",
    frequency: "Daily",
    route: "Subcutaneous",
    price: 85.0,
    image: "/aod-9604-5mg-peptide-vial-with-blue-cap-and-alpha-.jpg", // Added product image
  },
  {
    id: "5-amino-1mq-tablets",
    name: "5-Amino-1MQ (25mg) x 60 Tablets",
    category: "Weight Management",
    description: "Oral metabolic enhancer that supports fat loss and energy metabolism.",
    commonDose: "25-50 mg",
    frequency: "Daily",
    route: "Oral",
    price: 125.0,
    image: "/5-amino-1mq-25mg-x-60-tablets-bottle-with-alpha-bi.jpg", // Added product image
  },
  {
    id: "mots-c-5mg",
    name: "MOTS-c (5mg)",
    category: "Weight Management",
    description: "Enhances metabolic function and insulin sensitivity.",
    commonDose: "5-10 mg",
    frequency: "2-3x weekly",
    route: "Subcutaneous",
    price: 85.0,
    image: "/mots-c-5mg-peptide-vial-with-blue-cap-and-alpha-bi.jpg", // Added product image
  },

  // Cognitive Enhancement
  {
    id: "bdnf-10mg",
    name: "BDNF (10mg)",
    category: "Cognitive Enhancement",
    description: "Supports neuroplasticity, cognitive function, and neuroprotection.",
    commonDose: "500 mcg - 1 mg",
    frequency: "2-3x weekly",
    route: "Subcutaneous",
    price: 145.0,
    image: "/bdnf-10mg-peptide-vial-with-blue-cap-and-alpha-bio.jpg", // Added product image
  },
  {
    id: "cerebrolysin-5ml",
    name: "Cerebrolysin (5mL)",
    category: "Cognitive Enhancement",
    description: "Neuroprotective and neurotrophic effects for cognitive enhancement.",
    commonDose: "5-10 mL",
    frequency: "Daily for 10-20 days",
    route: "Intramuscular",
    price: 95.0,
    image: "/cerebrolysin-5ml-peptide-vial-with-blue-cap-and-al.jpg", // Added product image
  },
  {
    id: "dihexa-tablets",
    name: "Dihexa (5mg) x 30 Tablets",
    category: "Cognitive Enhancement",
    description: "Potent cognitive enhancer that promotes synaptogenesis.",
    commonDose: "5-10 mg",
    frequency: "Daily",
    route: "Oral",
    price: 165.0,
    image: "/dihexa-5mg-x-30-tablets-bottle-with-alpha-biomed-l.jpg", // Added product image
  },
  {
    id: "semax-5mg",
    name: "Semax (5mg)",
    category: "Cognitive Enhancement",
    description: "Enhances cognitive function, focus, and neuroprotection.",
    commonDose: "300-600 mcg",
    frequency: "1-2x daily",
    route: "Intranasal or Subcutaneous",
    price: 75.0,
    image: "/semax-5mg-peptide-vial-with-blue-cap-and-alpha-bio.jpg", // Added product image
  },
  {
    id: "selank-5mg",
    name: "Selank (5mg)",
    category: "Cognitive Enhancement",
    description: "Reduces anxiety and enhances cognitive function without sedation.",
    commonDose: "250-500 mcg",
    frequency: "1-2x daily",
    route: "Intranasal or Subcutaneous",
    price: 75.0,
    image: "/selank-5mg-peptide-vial-with-blue-cap-and-alpha-bi.jpg", // Added product image
  },
  {
    id: "p21-5mg",
    name: "P21 (5mg)",
    category: "Cognitive Enhancement",
    description: "Promotes neurogenesis and cognitive enhancement.",
    commonDose: "1-5 mg",
    frequency: "Daily",
    route: "Subcutaneous",
    price: 95.0,
    image: "/p21-5mg-peptide-vial-with-blue-cap-and-alpha-biome.jpg", // Added product image
  },
  {
    id: "nsi-189-40mg",
    name: "NSI-189 (40mg)",
    category: "Cognitive Enhancement",
    description: "Promotes hippocampal neurogenesis and mood enhancement.",
    commonDose: "40 mg",
    frequency: "1-2x daily",
    route: "Oral",
    price: 125.0,
    image: "/nsi-189-40mg-peptide-vial-with-blue-cap-and-alpha-.jpg", // Added product image
  },

  // Anti-Aging
  {
    id: "epithalon-10mg",
    name: "Epithalon (10mg)",
    category: "Anti-Aging",
    description: "May increase telomerase activity and promote longevity. Regulates circadian rhythm.",
    commonDose: "5-10 mg",
    frequency: "Daily for 10-20 days",
    route: "Subcutaneous",
    price: 85.0,
    image: "/epithalon-10mg-peptide-vial-with-blue-cap-and-alph.jpg", // Added product image
  },
  {
    id: "ghk-cu-50mg",
    name: "GHK-Cu (50mg)",
    category: "Anti-Aging",
    description: "Promotes collagen production, wound healing, and skin rejuvenation.",
    commonDose: "1-2 mg",
    frequency: "Daily",
    route: "Subcutaneous or Topical",
    price: 95.0,
    image: "/ghk-cu-50mg-peptide-vial-with-blue-cap-and-alpha-b.jpg", // Added product image
  },
  {
    id: "thymalin-10mg",
    name: "Thymalin (10mg)",
    category: "Anti-Aging",
    description: "Supports immune function and promotes longevity.",
    commonDose: "5-10 mg",
    frequency: "Daily for 10 days",
    route: "Subcutaneous or IM",
    price: 95.0,
    image: "/thymalin-10mg-peptide-vial-with-blue-cap-and-alpha.jpg", // Added product image
  },
  {
    id: "thymosin-alpha-1-10mg",
    name: "Thymosin Alpha-1 (10mg)",
    category: "Anti-Aging",
    description: "Enhances immune function and has anti-aging properties.",
    commonDose: "1.6 mg",
    frequency: "2x weekly",
    route: "Subcutaneous",
    price: 125.0,
    image: "/thymosin-alpha-1-10mg-peptide-vial-with-blue-cap-a.jpg", // Added product image
  },
  {
    id: "nad-500mg",
    name: "NAD+ (500mg)",
    category: "Anti-Aging",
    description: "Cellular energy and longevity support.",
    commonDose: "100-500 mg",
    frequency: "1-2x weekly",
    route: "IV or Subcutaneous",
    price: 95.0,
    image: "/nad-500mg-peptide-vial-with-blue-cap-and-alpha-bio.jpg", // Added product image
  },

  // Sexual Health
  {
    id: "pt-141-10mg",
    name: "PT-141 (10mg)",
    category: "Sexual Health",
    description: "Enhances sexual function and libido in both men and women.",
    commonDose: "1-2 mg",
    frequency: "As needed",
    route: "Subcutaneous",
    price: 85.0,
    image: "/pt-141-10mg-peptide-vial-with-blue-cap-and-alpha-b.jpg", // Added product image
  },
  {
    id: "melanotan-2-10mg",
    name: "Melanotan II (10mg)",
    category: "Sexual Health",
    description: "Promotes skin tanning and may enhance libido.",
    commonDose: "250-500 mcg",
    frequency: "2-3x weekly",
    route: "Subcutaneous",
    price: 65.0,
    image: "/melanotan-ii-10mg-peptide-vial-with-blue-cap-and-a.jpg", // Added product image
  },
  {
    id: "kisspeptin-10-5mg",
    name: "Kisspeptin-10 (5mg)",
    category: "Sexual Health",
    description: "Supports reproductive hormone function and libido.",
    commonDose: "1-2 mcg/kg",
    frequency: "As directed",
    route: "Subcutaneous",
    price: 95.0,
    image: "/kisspeptin-10-5mg-peptide-vial-with-blue-cap-and-a.jpg", // Added product image
  },

  // Sleep & Recovery
  {
    id: "dsip-5mg",
    name: "DSIP (5mg)",
    category: "Sleep & Recovery",
    description: "Promotes deep sleep and stress reduction.",
    commonDose: "100-300 mcg",
    frequency: "Before bed",
    route: "Subcutaneous",
    price: 65.0,
    image: "/dsip-5mg-peptide-vial-with-blue-cap-and-alpha-biom.jpg", // Added product image
  },
  {
    id: "dsip-10mg",
    name: "DSIP (10mg)",
    category: "Sleep & Recovery",
    description: "Higher dose for enhanced sleep quality.",
    commonDose: "100-300 mcg",
    frequency: "Before bed",
    route: "Subcutaneous",
    price: 115.0,
    image: "/dsip-10mg-peptide-vial-with-blue-cap-and-alpha-bio.jpg", // Added product image
  },

  // Skin & Aesthetics
  {
    id: "capryloside-10mg",
    name: "Capryloside (10mg)",
    category: "Skin & Aesthetics",
    description: "Promotes skin health and rejuvenation.",
    commonDose: "As directed",
    frequency: "Daily",
    route: "Topical or Subcutaneous",
    price: 85.0,
    image: "/capryloside-10mg-peptide-vial-with-blue-cap-and-al.jpg", // Added product image
  },

  // Performance
  {
    id: "follistatin-344-1mg",
    name: "Follistatin-344 (1mg)",
    category: "Performance",
    description: "Promotes muscle growth by inhibiting myostatin.",
    commonDose: "100 mcg",
    frequency: "Daily",
    route: "Subcutaneous",
    price: 145.0,
    image: "/follistatin-344-1mg-peptide-vial-with-blue-cap-and.jpg", // Added product image
  },
  {
    id: "ace-031-1mg",
    name: "ACE-031 (1mg)",
    category: "Performance",
    description: "Powerful muscle growth promoter.",
    commonDose: "As directed",
    frequency: "Weekly",
    route: "Subcutaneous",
    price: 185.0,
    image: "/ace-031-1mg-peptide-vial-with-blue-cap-and-alpha-b.jpg", // Added product image
  },
]

export default function PatientPeptidesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All Peptides")

  const filteredPeptides = peptides.filter((peptide) => {
    const matchesSearch =
      peptide.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      peptide.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "All Peptides" || peptide.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <ProtectedRoute allowedRoles={["patient"]}>
      <DashboardLayout>
        <div className="space-y-6">
          {/* Header */}
          <div>
            <h1 className="text-3xl font-bold">Peptide Library</h1>
            <p className="text-muted-foreground mt-2">
              Explore our complete catalog of {peptides.length} peptides from Alpha BioMed
            </p>
          </div>

          {/* Search and Filter */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search peptides..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Categories */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            {categories.map((category) => {
              const Icon = category.icon
              return (
                <Button
                  key={category.name}
                  variant={selectedCategory === category.name ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category.name)}
                  className="whitespace-nowrap"
                >
                  <Icon className="w-4 h-4 mr-2" />
                  {category.name}
                  <Badge variant="secondary" className="ml-2">
                    {category.count}
                  </Badge>
                </Button>
              )
            })}
          </div>

          {/* Info Banner */}
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="pt-6">
              <div className="flex items-start gap-3">
                <Activity className="w-5 h-5 text-blue-600 mt-0.5" />
                <div>
                  <p className="font-medium text-blue-900">Prescription Required</p>
                  <p className="text-sm text-blue-700 mt-1">
                    All peptides require a prescription from your healthcare provider. Talk to your provider about which
                    peptides are right for you.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Peptides Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredPeptides.map((peptide) => (
              <Card key={peptide.id} className="hover:shadow-lg transition-shadow overflow-hidden">
                <div className="relative w-full h-48 bg-gradient-to-br from-blue-50 to-white">
                  <Image
                    src={peptide.image || "/placeholder.svg"}
                    alt={peptide.name}
                    fill
                    className="object-contain p-4"
                  />
                </div>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg">{peptide.name}</CardTitle>
                      <Badge variant="outline" className="mt-2">
                        {peptide.category}
                      </Badge>
                    </div>
                    <div className="text-right ml-2">
                      <p className="text-2xl font-bold">${peptide.price}</p>
                      <p className="text-xs text-muted-foreground">per vial</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">{peptide.description}</p>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Common Dose:</span>
                      <span className="font-medium">{peptide.commonDose}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Frequency:</span>
                      <span className="font-medium">{peptide.frequency}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Route:</span>
                      <span className="font-medium">{peptide.route}</span>
                    </div>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Link href={`/patient/peptides/${peptide.id}`} className="flex-1">
                      <Button variant="outline" className="w-full bg-transparent">
                        Learn More
                      </Button>
                    </Link>
                    <Link href="/patient/shop" className="flex-1">
                      <Button className="w-full">
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        Order
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredPeptides.length === 0 && (
            <Card>
              <CardContent className="py-12 text-center">
                <p className="text-muted-foreground">No peptides found matching your search.</p>
              </CardContent>
            </Card>
          )}
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  )
}
