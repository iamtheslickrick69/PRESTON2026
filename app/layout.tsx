import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono, Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { AuthProvider } from "@/lib/auth-context"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/sonner"
import { FloatingChatWidget } from "@/components/ui/floating-chat-widget"
import { Suspense } from "react"
import "./globals.css"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
})

export const metadata: Metadata = {
  title: "Bridge MDX | Intelligence-First Peptide Care",
  description: "Where AI meets clinical expertise. Providers get data-driven protocols. Patients get answers they understand. The only peptide therapy EHR with built-in AI intelligence.",
  generator: "v0.app",
  icons: {
    icon: "/bridge-ai-icon.png",
    shortcut: "/bridge-ai-icon.png",
    apple: "/bridge-ai-icon.png",
  },
  openGraph: {
    title: "Bridge MDX | Intelligence-First Peptide Care",
    description: "Where AI meets clinical expertise. Providers get data-driven protocols. Patients get answers they understand.",
    url: "https://mdx.haestus.dev",
    siteName: "Bridge MDX",
    images: [
      {
        url: "/new.png",
        width: 1200,
        height: 630,
        alt: "Bridge MDX - Intelligence-first peptide care platform",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bridge MDX | Intelligence-First Peptide Care",
    description: "Where AI meets clinical expertise. Providers get data-driven protocols. Patients get answers they understand.",
    images: ["/new.png"],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} ${inter.variable}`} suppressHydrationWarning>
      <body className="font-sans antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Suspense fallback={null}>
            <AuthProvider>{children}</AuthProvider>
          </Suspense>
          <Toaster />
          <FloatingChatWidget />
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
