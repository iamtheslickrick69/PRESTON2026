"use client"

import { useEffect, useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Share2 } from "lucide-react"

interface BlogModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  content: string
  category?: string
  readTime?: string
}

export default function BlogModal({ isOpen, onClose, title, content, category, readTime }: BlogModalProps) {
  const [scrollProgress, setScrollProgress] = useState(0)
  const [copied, setCopied] = useState(false)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
      setScrollProgress(0)
    } else {
      document.body.style.overflow = "unset"
    }
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", handleEscape)
    return () => window.removeEventListener("keydown", handleEscape)
  }, [onClose])

  const handleScroll = () => {
    if (contentRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = contentRef.current
      const progress = (scrollTop / (scrollHeight - clientHeight)) * 100
      setScrollProgress(Math.min(100, Math.max(0, progress)))
    }
  }

  const handleShare = async () => {
    const shareData = {
      title: title,
      text: `Check out this article: ${title}`,
      url: window.location.href,
    }

    if (navigator.share && navigator.canShare(shareData)) {
      try {
        await navigator.share(shareData)
      } catch (err) {
        // User cancelled or share failed - silently ignore
        if ((err as Error).name !== "AbortError") {
          // Fallback to clipboard if share fails for other reasons
          navigator.clipboard.writeText(window.location.href)
        }
      }
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(window.location.href)
      alert("Link copied to clipboard!")
    }
  }

  const scrollToHeading = (heading: string) => {
    if (contentRef.current) {
      const elements = contentRef.current.querySelectorAll("h2")
      elements.forEach((el) => {
        if (el.textContent === heading) {
          el.scrollIntoView({ behavior: "smooth", block: "start" })
        }
      })
    }
  }

  // Extract headings for table of contents
  const headings = content.match(/^## .+$/gm)?.map((h) => h.replace("## ", "")) || []

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", duration: 0.5, bounce: 0.1 }}
            className="fixed left-1/2 top-1/2 z-50 flex max-h-[90vh] w-[95vw] max-w-4xl -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-2xl"
          >
            <div className="absolute left-0 right-0 top-0 z-10 h-1 bg-secondary">
              <motion.div
                className="h-full bg-primary"
                initial={{ width: 0 }}
                animate={{ width: `${scrollProgress}%` }}
                transition={{ duration: 0.1 }}
              />
            </div>

            {/* Header */}
            <div className="flex items-start justify-between border-b border-border px-6 py-5 pt-6">
              <div className="flex flex-col gap-2 pr-4">
                <div className="flex items-center gap-2">
                  {category && (
                    <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                      {category}
                    </span>
                  )}
                  {readTime && <span className="text-xs text-muted-foreground">{readTime}</span>}
                </div>
                <h2 className="text-xl font-bold text-foreground sm:text-2xl text-balance">{title}</h2>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleShare}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary text-secondary-foreground transition-colors hover:bg-secondary/80"
                  aria-label="Share article"
                >
                  <Share2 className="h-4 w-4" />
                </button>
                <button
                  onClick={onClose}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary text-secondary-foreground transition-colors hover:bg-secondary/80"
                  aria-label="Close modal"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {headings.length > 2 && (
              <div className="border-b border-border px-6 py-3">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-medium text-muted-foreground">Jump to:</span>
                  {headings.slice(0, 5).map((heading, i) => (
                    <button
                      key={i}
                      onClick={() => scrollToHeading(heading)}
                      className="rounded-full bg-secondary px-2.5 py-1 text-xs font-medium text-secondary-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
                    >
                      {heading.length > 25 ? heading.slice(0, 25) + "..." : heading}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Content */}
            <div ref={contentRef} onScroll={handleScroll} className="flex-1 overflow-y-auto px-6 py-8 sm:px-10">
              <article className="prose prose-sm dark:prose-invert max-w-none">
                <div
                  className="text-muted-foreground leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: formatContent(content) }}
                />
              </article>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

function formatContent(content: string): string {
  return content
    .replace(/^### (.+)$/gm, '<h3 class="text-lg font-semibold text-foreground mt-8 mb-3">$1</h3>')
    .replace(/^## (.+)$/gm, '<h2 class="text-xl font-bold text-foreground mt-10 mb-4 scroll-mt-4">$1</h2>')
    .replace(/^# (.+)$/gm, '<h1 class="text-2xl font-bold text-foreground mb-6 hidden">$1</h1>')
    .replace(/\*\*(.+?)\*\*/g, '<strong class="text-foreground font-semibold">$1</strong>')
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    .replace(/^- (.+)$/gm, '<li class="ml-4 list-disc mb-1">$1</li>')
    .replace(/^(\d+)\. (.+)$/gm, '<li class="ml-4 list-decimal mb-1">$2</li>')
    .replace(/`(.+?)`/g, '<code class="bg-secondary px-1.5 py-0.5 rounded text-sm font-mono">$1</code>')
    .replace(
      /^> (.+)$/gm,
      '<blockquote class="border-l-4 border-primary/50 pl-4 italic my-6 text-foreground/80">$1</blockquote>',
    )
    .replace(/---/g, '<hr class="my-8 border-border" />')
    .replace(/\n\n/g, '</p><p class="mb-4">')
}
