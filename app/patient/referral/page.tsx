"use client"

export const dynamic = 'force-dynamic'

import { ProtectedRoute } from "@/components/protected-route"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Home, Calendar, Calculator, BookOpen, Phone, Activity, ShoppingCart, Package, Gift, Users, Mail, Copy, Share2, DollarSign, CheckCircle, Clock, Trophy, ChevronRight, Sparkles, Heart, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useState } from "react"
import { toast } from "sonner"

const referralHistory = [
  { id: "1", name: "John Smith", email: "john.s***@email.com", date: "Jan 15, 2024", status: "completed", reward: "$50" },
  { id: "2", name: "Mary Johnson", email: "mary.j***@email.com", date: "Jan 10, 2024", status: "completed", reward: "$50" },
  { id: "3", name: "Robert Davis", email: "robert.d***@email.com", date: "Jan 5, 2024", status: "pending", reward: "$50" },
  { id: "4", name: "Lisa Wilson", email: "lisa.w***@email.com", date: "Dec 28, 2023", status: "completed", reward: "$50" },
]

const rewards = [
  { tier: "Bronze", referrals: 1, reward: "$50 credit", achieved: true },
  { tier: "Silver", referrals: 3, reward: "$75 credit + free shipping", achieved: true },
  { tier: "Gold", referrals: 5, reward: "$100 credit + 10% off orders", achieved: false },
  { tier: "Platinum", referrals: 10, reward: "$150 credit + 15% off orders", achieved: false },
]

export default function PatientReferralPage() {
  const [referralEmails, setReferralEmails] = useState(["", "", ""])
  const [personalMessage, setPersonalMessage] = useState("")

  const referralCode = "SARAH2024"
  const referralLink = `https://bridgemdx.com/signup?ref=${referralCode}`

  const totalReferrals = 4
  const completedReferrals = 3
  const pendingReferrals = 1
  const totalEarned = 150

  const handleCopyCode = () => {
    navigator.clipboard.writeText(referralCode)
    toast.success("Referral code copied to clipboard!")
  }

  const handleCopyLink = () => {
    navigator.clipboard.writeText(referralLink)
    toast.success("Referral link copied to clipboard!")
  }

  const handleShare = (platform: string) => {
    const message = encodeURIComponent(`I've been using Bridge MDX for my peptide therapy and it's been great! Use my referral code ${referralCode} to get $25 off your first order. ${referralLink}`)

    const urls: Record<string, string> = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(referralLink)}`,
      twitter: `https://twitter.com/intent/tweet?text=${message}`,
      email: `mailto:?subject=Try Bridge MDX&body=${message}`,
    }

    if (urls[platform]) {
      window.open(urls[platform], "_blank")
    }
    toast.success(`Opening ${platform}...`)
  }

  const handleSendInvites = () => {
    const validEmails = referralEmails.filter(email => email.trim() && email.includes("@"))
    if (validEmails.length === 0) {
      toast.error("Please enter at least one valid email address")
      return
    }
    toast.success(`Invitations sent to ${validEmails.length} friend${validEmails.length > 1 ? "s" : ""}!`)
    setReferralEmails(["", "", ""])
    setPersonalMessage("")
  }

  const currentTier = rewards.filter(r => r.achieved).pop()
  const nextTier = rewards.find(r => !r.achieved)
  const progressToNext = nextTier ? (completedReferrals / nextTier.referrals) * 100 : 100

  return (
    <ProtectedRoute allowedRoles={["patient"]}>
      <DashboardLayout>
        <div className="space-y-6">
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <div className="p-4 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full">
                <Gift className="w-8 h-8 text-white" />
              </div>
            </div>
            <h2 className="text-3xl font-bold tracking-tight">Refer a Friend</h2>
            <p className="text-muted-foreground mt-2">
              Share the gift of health and earn rewards for every friend who joins
            </p>
          </div>

          {/* Stats Overview */}
          <div className="grid gap-4 md:grid-cols-4">
            <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <Users className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-purple-700">{totalReferrals}</p>
                    <p className="text-sm text-purple-600">Total Referrals</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{completedReferrals}</p>
                    <p className="text-sm text-muted-foreground">Completed</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-yellow-100 rounded-lg">
                    <Clock className="w-5 h-5 text-yellow-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{pendingReferrals}</p>
                    <p className="text-sm text-muted-foreground">Pending</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <DollarSign className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-green-700">${totalEarned}</p>
                    <p className="text-sm text-green-600">Total Earned</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Reward Tier Progress */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <Trophy className={`w-6 h-6 ${currentTier?.tier === "Silver" ? "text-gray-400" : "text-amber-500"}`} />
                  <div>
                    <p className="font-semibold">Current Tier: {currentTier?.tier || "None"}</p>
                    <p className="text-sm text-muted-foreground">{currentTier?.reward}</p>
                  </div>
                </div>
                {nextTier && (
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">Next: {nextTier.tier}</p>
                    <p className="text-sm font-medium">{nextTier.referrals - completedReferrals} more to unlock</p>
                  </div>
                )}
              </div>
              <Progress value={progressToNext} className="h-2 mb-4" />
              <div className="flex justify-between">
                {rewards.map((reward) => (
                  <div key={reward.tier} className={`text-center ${reward.achieved ? "" : "opacity-50"}`}>
                    <div className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center ${
                      reward.achieved ? "bg-primary text-primary-foreground" : "bg-muted"
                    }`}>
                      {reward.achieved ? <CheckCircle className="w-4 h-4" /> : reward.referrals}
                    </div>
                    <p className="text-xs mt-1 font-medium">{reward.tier}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-6 md:grid-cols-2">
            {/* Share Your Code */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Share2 className="w-5 h-5" />
                  Share Your Code
                </CardTitle>
                <CardDescription>
                  Your friend gets $25 off, you get $50 credit when they make their first purchase
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Your Referral Code</Label>
                  <div className="flex gap-2">
                    <div className="flex-1 p-3 bg-muted rounded-lg font-mono text-lg text-center font-bold tracking-wider">
                      {referralCode}
                    </div>
                    <Button variant="outline" onClick={handleCopyCode}>
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Your Referral Link</Label>
                  <div className="flex gap-2">
                    <Input value={referralLink} readOnly className="font-mono text-sm" />
                    <Button variant="outline" onClick={handleCopyLink}>
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <Label className="mb-3 block">Share via</Label>
                  <div className="flex gap-2">
                    <Button variant="outline" className="flex-1" onClick={() => handleShare("facebook")}>
                      Facebook
                    </Button>
                    <Button variant="outline" className="flex-1" onClick={() => handleShare("twitter")}>
                      Twitter
                    </Button>
                    <Button variant="outline" className="flex-1" onClick={() => handleShare("email")}>
                      <Mail className="w-4 h-4 mr-2" />
                      Email
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Send Email Invites */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Send className="w-5 h-5" />
                  Send Email Invites
                </CardTitle>
                <CardDescription>
                  Invite friends directly via email with a personalized message
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  {referralEmails.map((email, index) => (
                    <div key={index} className="space-y-1">
                      <Label htmlFor={`email-${index}`}>Friend&apos;s Email {index + 1}</Label>
                      <Input
                        id={`email-${index}`}
                        type="email"
                        placeholder="friend@email.com"
                        value={email}
                        onChange={(e) => {
                          const newEmails = [...referralEmails]
                          newEmails[index] = e.target.value
                          setReferralEmails(newEmails)
                        }}
                      />
                    </div>
                  ))}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Personal Message (optional)</Label>
                  <Textarea
                    id="message"
                    placeholder="Add a personal note to your invitation..."
                    rows={3}
                    value={personalMessage}
                    onChange={(e) => setPersonalMessage(e.target.value)}
                  />
                </div>

                <Button className="w-full" onClick={handleSendInvites}>
                  <Send className="w-4 h-4 mr-2" />
                  Send Invitations
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Referral History */}
          <Card>
            <CardHeader>
              <CardTitle>Referral History</CardTitle>
              <CardDescription>Track your referrals and rewards</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Friend</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Date Referred</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Reward</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {referralHistory.map((referral) => (
                    <TableRow key={referral.id}>
                      <TableCell className="font-medium">{referral.name}</TableCell>
                      <TableCell className="text-muted-foreground">{referral.email}</TableCell>
                      <TableCell>{referral.date}</TableCell>
                      <TableCell>
                        {referral.status === "completed" ? (
                          <Badge className="bg-green-100 text-green-800">Completed</Badge>
                        ) : (
                          <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        {referral.status === "completed" ? (
                          <span className="font-medium text-green-600">{referral.reward}</span>
                        ) : (
                          <span className="text-muted-foreground">Pending</span>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* How It Works */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="w-5 h-5" />
                How It Works
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-3">
                <div className="text-center">
                  <div className="w-12 h-12 mx-auto bg-purple-100 rounded-full flex items-center justify-center mb-3">
                    <Share2 className="w-6 h-6 text-purple-600" />
                  </div>
                  <h4 className="font-semibold mb-1">1. Share Your Code</h4>
                  <p className="text-sm text-muted-foreground">
                    Share your unique referral code or link with friends and family
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 mx-auto bg-blue-100 rounded-full flex items-center justify-center mb-3">
                    <Users className="w-6 h-6 text-blue-600" />
                  </div>
                  <h4 className="font-semibold mb-1">2. Friend Signs Up</h4>
                  <p className="text-sm text-muted-foreground">
                    Your friend uses your code when they create their account and make their first purchase
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-3">
                    <Gift className="w-6 h-6 text-green-600" />
                  </div>
                  <h4 className="font-semibold mb-1">3. Both Get Rewarded</h4>
                  <p className="text-sm text-muted-foreground">
                    Your friend gets $25 off and you receive $50 in account credit
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Terms */}
          <Card>
            <CardContent className="p-4">
              <p className="text-xs text-muted-foreground text-center">
                Referral rewards are credited to your account after your friend&apos;s first purchase is confirmed.
                Credits can be applied to future orders and do not expire.
                See full <button className="underline">Terms & Conditions</button> for details.
              </p>
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  )
}
