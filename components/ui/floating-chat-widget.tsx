"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"
import Image from "next/image"
import { AI_Prompt } from "./animated-ai-input"

export function FloatingChatWidget() {
  const [isOpen, setIsOpen] = React.useState(false)

  // Listen for custom event to open widget
  React.useEffect(() => {
    const handleOpen = () => setIsOpen(true)
    window.addEventListener("open-chat-widget", handleOpen)
    return () => window.removeEventListener("open-chat-widget", handleOpen)
  }, [])

  return (
    <>
      {/* Floating Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-neutral-800 border border-neutral-700 shadow-2xl shadow-black/50 flex items-center justify-center overflow-hidden hover:bg-neutral-700 hover:scale-105 transition-all duration-200"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: isOpen ? 0 : 1, scale: isOpen ? 0.8 : 1, pointerEvents: isOpen ? "none" : "auto" }}
        transition={{ duration: 0.2 }}
      >
        <Image
          src="/bridge-ai-icon.png"
          alt="Bridge AI"
          width={80}
          height={80}
          className="object-contain scale-[3]"
        />
      </motion.button>

      {/* Chat Modal Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
              onClick={() => setIsOpen(false)}
            />

            {/* Chat Window */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", duration: 0.4, bounce: 0.15 }}
              className="fixed bottom-6 right-6 z-50 w-[95vw] max-w-2xl"
            >
              {/* Close Button */}
              <button
                onClick={() => setIsOpen(false)}
                className="absolute -top-3 -right-3 z-10 w-8 h-8 rounded-full bg-neutral-800 border border-neutral-700 flex items-center justify-center text-neutral-400 hover:text-white hover:bg-neutral-700 transition-colors shadow-lg"
              >
                <X className="w-4 h-4" strokeWidth={1.5} />
              </button>

              <AI_Prompt />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

export default FloatingChatWidget
