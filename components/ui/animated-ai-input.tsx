"use client"

import * as React from "react"
import { AnimatePresence, motion } from "framer-motion"
import { ArrowUp, Square, Building2, UserCog, User, Sparkles, BookOpen } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { AtlasSourcesModal } from "@/components/ui/atlas-sources-modal"
import { AtlasIcon } from "@/components/ui/atlas-icon"
import { type AtlasSource, ATLAS_CAPABILITIES } from "@/lib/atlas-config"

type RoleType = "clinic" | "provider" | "patient"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  sources?: AtlasSource[]
}

interface RoleConfig {
  id: RoleType
  label: string
  icon: React.ReactNode
  color: string
  activeColor: string
  bgColor: string
  borderColor: string
  placeholder: string
  prompts: string[]
}

const roleConfigs: RoleConfig[] = [
  {
    id: "clinic",
    label: "Clinic",
    icon: <Building2 className="h-4 w-4" strokeWidth={1.5} />,
    color: "text-gray-400",
    activeColor: "text-gray-300",
    bgColor: "bg-gray-600",
    borderColor: "border-gray-500/30",
    placeholder: "Ask Atlas about clinic operations, analytics, or compliance...",
    prompts: ["How's my clinic performing this quarter?", "Show me provider scheduling gaps", "Check our HIPAA compliance status"]
  },
  {
    id: "provider",
    label: "Provider",
    icon: <UserCog className="h-4 w-4" strokeWidth={1.5} />,
    color: "text-blue-400",
    activeColor: "text-blue-300",
    bgColor: "bg-blue-500",
    borderColor: "border-blue-500/30",
    placeholder: "Ask Atlas about protocols, dosing, or patient care...",
    prompts: ["What's the best BPC-157 protocol?", "Compare GH peptide options for me", "Any interactions with semaglutide?"]
  },
  {
    id: "patient",
    label: "Patient",
    icon: <User className="h-4 w-4" strokeWidth={1.5} />,
    color: "text-red-400",
    activeColor: "text-red-300",
    bgColor: "bg-red-500",
    borderColor: "border-red-500/30",
    placeholder: "Ask Atlas about your treatment, side effects, or next steps...",
    prompts: ["How do I inject safely?", "What does BPC-157 actually do?", "What side effects should I watch for?"]
  },
]

// Typing indicator component
function TypingIndicator({ color }: { color: string }) {
  return (
    <div className="flex items-center gap-1 px-4 py-3">
      <div className={cn("flex items-center gap-1", color)}>
        <motion.span
          className="w-2 h-2 rounded-full bg-current"
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 1, repeat: Infinity, delay: 0 }}
        />
        <motion.span
          className="w-2 h-2 rounded-full bg-current"
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
        />
        <motion.span
          className="w-2 h-2 rounded-full bg-current"
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
        />
      </div>
      <span className="text-xs text-neutral-500 ml-2">Atlas AI is thinking...</span>
    </div>
  )
}

// Quick action buttons component
function QuickActionButtons({ roleId, onAction }: { roleId: RoleType; onAction: (action: string) => void }) {
  const actions = {
    clinic: [
      { label: "Show trends", value: "Show me detailed trends and analytics" },
      { label: "Suggestions", value: "What are your suggestions based on this?" },
    ],
    provider: [
      { label: "Protocol details", value: "Give me the full protocol details" },
      { label: "Dosing calculator", value: "Help me calculate the right dosage" },
    ],
    patient: [
      { label: "Learn more", value: "Tell me more about this" },
      { label: "What's next?", value: "What should I do next?" },
    ],
  }

  return (
    <div className="flex flex-wrap gap-2 mt-3 pt-3 border-t border-white/10">
      {actions[roleId].map((action, i) => (
        <button
          key={i}
          onClick={() => onAction(action.value)}
          className="px-3 py-1.5 rounded-lg text-xs font-medium bg-white/5 backdrop-blur-md hover:bg-white/10 text-neutral-300 hover:text-white transition-all duration-200 border border-white/10"
        >
          {action.label}
        </button>
      ))}
    </div>
  )
}

// Message component with markdown-like styling
function ChatMessage({
  message,
  roleConfig,
  onViewSources,
  onQuickAction,
  isLatestAssistant
}: {
  message: Message
  roleConfig: RoleConfig
  onViewSources?: (sources: AtlasSource[]) => void
  onQuickAction?: (action: string) => void
  isLatestAssistant?: boolean
}) {
  const isUser = message.role === "user"

  // Friendly greetings for AI responses (shown at start)
  const getGreeting = () => {
    const greetings = {
      clinic: ["Great question!", "Let me help with that.", "I've got you covered."],
      provider: ["Good thinking!", "Let's dive into this.", "I can help with that."],
      patient: ["Happy to help!", "I'm here for you.", "Let me explain that."],
    }
    const options = greetings[roleConfig.id]
    return options[Math.floor(Math.random() * options.length)]
  }

  // Helpful closers (shown at end)
  const getCloser = () => {
    const closers = {
      clinic: ["Need anything else about your operations?", "What else can I help you optimize?", "Any other clinic questions?"],
      provider: ["Anything else about this protocol?", "Need more clinical guidance?", "Other patient care questions?"],
      patient: ["Any other questions about your treatment?", "Is there anything else I can explain?", "What else would you like to know?"],
    }
    const options = closers[roleConfig.id]
    return options[Math.floor(Math.random() * options.length)]
  }

  // Get current time
  const getTimeString = () => {
    const now = new Date()
    return now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
  }

  // Simple markdown-like rendering
  const renderContent = (content: string) => {
    return content.split('\n').map((line, i) => {
      // Headers
      if (line.startsWith('**') && line.endsWith('**')) {
        return <p key={i} className="font-semibold text-white mb-2">{line.replace(/\*\*/g, '')}</p>
      }
      // Bold text within lines
      if (line.includes('**')) {
        const parts = line.split(/(\*\*.*?\*\*)/g)
        return (
          <p key={i} className="mb-1">
            {parts.map((part, j) =>
              part.startsWith('**') && part.endsWith('**')
                ? <strong key={j} className="text-white">{part.replace(/\*\*/g, '')}</strong>
                : part
            )}
          </p>
        )
      }
      // List items
      if (line.startsWith('• ') || line.startsWith('- ')) {
        return <p key={i} className="ml-4 mb-1">{line}</p>
      }
      // Numbered lists
      if (/^\d+\./.test(line)) {
        return <p key={i} className="ml-4 mb-1">{line}</p>
      }
      // Table rows (simplified display)
      if (line.startsWith('|')) {
        return <p key={i} className="font-mono text-xs mb-1 text-neutral-400">{line}</p>
      }
      // Empty lines
      if (line.trim() === '') {
        return <br key={i} />
      }
      // Regular text
      return <p key={i} className="mb-1">{line}</p>
    })
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        "flex gap-3 px-4 py-3",
        isUser ? "justify-end" : "justify-start"
      )}
    >
      {!isUser && (
        <div className="w-8 h-8 flex items-center justify-center flex-shrink-0">
          <AtlasIcon size={32} />
        </div>
      )}
      <div className={cn(
        "max-w-[85%] rounded-2xl px-4 py-3 text-sm backdrop-blur-md border",
        isUser
          ? `${roleConfig.bgColor} text-white border-white/20`
          : "bg-white/5 text-neutral-300 border-white/10"
      )}>
        {isUser ? (
          <>
            <p>{message.content}</p>
            <p className="text-xs opacity-60 mt-2">{getTimeString()}</p>
          </>
        ) : (
          <>
            {/* Friendly greeting */}
            <p className="text-xs font-medium text-blue-400 mb-2">{getGreeting()}</p>

            {/* Main content */}
            <div className="space-y-1">{renderContent(message.content)}</div>

            {/* Helpful closer */}
            <p className="text-xs text-neutral-500 mt-3 italic">{getCloser()}</p>

            {/* Sources button */}
            {message.sources && message.sources.length > 0 && onViewSources && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onViewSources(message.sources!)}
                className="mt-3 h-7 text-xs text-blue-400 hover:text-blue-300 hover:bg-blue-500/10 gap-1.5"
              >
                <BookOpen className="h-3 w-3" />
                View {message.sources.length} Source{message.sources.length > 1 ? 's' : ''}
              </Button>
            )}

            {/* Quick actions for latest message */}
            {isLatestAssistant && onQuickAction && (
              <QuickActionButtons roleId={roleConfig.id} onAction={onQuickAction} />
            )}
          </>
        )}
      </div>
      {isUser && (
        <div className="w-8 h-8 rounded-lg bg-neutral-700 flex items-center justify-center flex-shrink-0">
          <User className="w-4 h-4 text-neutral-300" strokeWidth={1.5} />
        </div>
      )}
    </motion.div>
  )
}

interface AIInputProps {
  className?: string
}

export function AI_Prompt({ className }: AIInputProps) {
  const [value, setValue] = React.useState("")
  const [isLoading, setIsLoading] = React.useState(false)
  const [activeRole, setActiveRole] = React.useState<RoleType>("provider")
  const [messages, setMessages] = React.useState<Message[]>([])
  const [sourcesModalOpen, setSourcesModalOpen] = React.useState(false)
  const [selectedSources, setSelectedSources] = React.useState<AtlasSource[]>([])
  const textareaRef = React.useRef<HTMLTextAreaElement>(null)
  const messagesEndRef = React.useRef<HTMLDivElement>(null)

  const currentRole = roleConfigs.find((r) => r.id === activeRole) || roleConfigs[1]

  // Scroll to bottom when new messages
  React.useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, isLoading])

  // Clear messages when role changes
  React.useEffect(() => {
    setMessages([])
  }, [activeRole])

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      if (value.trim() && !isLoading) {
        handleSubmit(value.trim())
      }
    }
  }

  const handleSubmit = async (query: string) => {
    if (!query.trim() || isLoading) return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: query
    }
    setMessages(prev => [...prev, userMessage])
    setValue("")
    setIsLoading(true)

    try {
      // Convert role to API format
      const apiRole = activeRole === 'clinic' ? 'clinic_admin' : activeRole

      // Call Atlas AI API
      const response = await fetch('/api/atlas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: query,
          role: apiRole,
          conversationHistory: messages.map(m => ({
            role: m.role,
            content: m.content
          }))
        })
      })

      if (!response.ok) {
        throw new Error('Failed to get response from Atlas AI')
      }

      const data = await response.json()

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: data.message,
        sources: data.sources || []
      }
      setMessages(prev => [...prev, assistantMessage])
    } catch (error) {
      console.error('Atlas AI Error:', error)
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "I apologize, but I'm having trouble connecting right now. Please try again in a moment."
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handlePromptClick = (prompt: string) => {
    handleSubmit(prompt)
  }

  const handleViewSources = (sources: AtlasSource[]) => {
    setSelectedSources(sources)
    setSourcesModalOpen(true)
  }

  return (
    <div className={cn("w-full max-w-3xl mx-auto", className)}>
      <div className="relative bg-neutral-900/60 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden shadow-2xl shadow-black/50">
        {/* Header with role tabs */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 backdrop-blur-sm">
          {/* Role Tabs */}
          <div className="flex items-center gap-1 p-1 rounded-lg bg-white/5 backdrop-blur-md border border-white/10">
            {roleConfigs.map((role) => (
              <button
                key={role.id}
                onClick={() => setActiveRole(role.id)}
                className={cn(
                  "relative flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200",
                  activeRole === role.id
                    ? `${role.activeColor}`
                    : "text-neutral-500 hover:text-neutral-300"
                )}
              >
                {activeRole === role.id && (
                  <motion.div
                    layoutId="active-role-tab"
                    className="absolute inset-0 rounded-md bg-white/10 backdrop-blur-md"
                    transition={{ type: "spring", duration: 0.4, bounce: 0.15 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-2">
                  {role.icon}
                  {role.label}
                </span>
              </button>
            ))}
          </div>

          {/* Status indicator */}
          <div className="flex items-center gap-2 text-xs">
            <span className="flex items-center gap-1.5">
              <Sparkles className={cn("h-3.5 w-3.5", currentRole.color)} strokeWidth={1.5} />
              <span className={cn("transition-colors", currentRole.color)}>
                {currentRole.label} Mode
              </span>
            </span>
          </div>
        </div>

        {/* Chat Messages Area */}
        <div className="h-[400px] overflow-y-auto">
          {messages.length === 0 ? (
            // Empty state with personality
            <div className="h-full flex flex-col items-center justify-center text-center px-8">
              <motion.div
                className="w-16 h-16 flex items-center justify-center mb-4"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                <AtlasIcon size={64} />
              </motion.div>
              <motion.div
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1, duration: 0.4 }}
              >
                <h3 className="text-white font-medium mb-2 text-lg">
                  {currentRole.id === "clinic"
                    ? "Hi! I'm Atlas, your clinic intelligence partner."
                    : currentRole.id === "provider"
                    ? "Hi! I'm Atlas, here to help you provide exceptional care."
                    : "Welcome! I'm Atlas, your personal peptide guide."}
                </h3>
                <p className="text-neutral-400 text-sm max-w-md mb-4 leading-relaxed">
                  {currentRole.id === "clinic"
                    ? "I can help you understand your metrics, optimize scheduling, and stay compliant. What would you like to know?"
                    : currentRole.id === "provider"
                    ? "I'm here to assist with protocols, dosing guidance, and patient care decisions. How can I help today?"
                    : "I'll help you understand your treatment, answer questions about peptides, and guide you through your wellness journey. What's on your mind?"}
                </p>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 backdrop-blur-md border border-white/10">
                  <Sparkles className={cn("h-3 w-3", currentRole.color)} strokeWidth={1.5} />
                  <span className="text-xs text-neutral-500">Try a question below to get started</span>
                </div>
              </motion.div>
            </div>
          ) : (
            // Messages
            <div className="py-4">
              {messages.map((message, index) => {
                // Check if this is the latest assistant message
                const isLatestAssistant = message.role === "assistant" && index === messages.length - 1
                return (
                  <ChatMessage
                    key={message.id}
                    message={message}
                    roleConfig={currentRole}
                    onViewSources={handleViewSources}
                    onQuickAction={handleSubmit}
                    isLatestAssistant={isLatestAssistant}
                  />
                )
              })}
              {isLoading && <TypingIndicator color={currentRole.color} />}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* Suggested Prompts */}
        <div className="px-4 py-3 border-t border-white/10 backdrop-blur-sm bg-white/5">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeRole}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.2 }}
              className="flex flex-wrap items-center gap-2"
            >
              <span className="text-xs text-neutral-500 font-medium">Popular questions:</span>
              {currentRole.prompts.map((prompt, index) => (
                <button
                  key={index}
                  onClick={() => handlePromptClick(prompt)}
                  disabled={isLoading}
                  className={cn(
                    "px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200",
                    "bg-white/5 backdrop-blur-md border border-white/10",
                    "hover:bg-white/10 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed",
                    currentRole.color
                  )}
                >
                  {prompt}
                </button>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Input Area */}
        <div className="px-4 py-3 border-t border-white/10 bg-white/5 backdrop-blur-md">
          <div className="flex items-end gap-3">
            <Textarea
              ref={textareaRef}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={currentRole.placeholder}
              disabled={isLoading}
              className={cn(
                "flex-1 bg-white/5 backdrop-blur-md border border-white/10 rounded-xl resize-none text-white placeholder:text-neutral-500 focus:ring-1 focus:border-transparent text-sm py-3 px-4 min-h-[48px] max-h-[120px]",
                `focus:ring-${currentRole.id === "clinic" ? "gray" : currentRole.id === "provider" ? "blue" : "red"}-500/50`
              )}
              rows={1}
            />
            <AnimatePresence mode="wait">
              {isLoading ? (
                <motion.button
                  key="stop"
                  type="button"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="p-3 rounded-xl bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-colors"
                >
                  <Square className="h-5 w-5 fill-current" strokeWidth={1.5} />
                </motion.button>
              ) : (
                <motion.button
                  key="send"
                  type="button"
                  onClick={() => handleSubmit(value)}
                  disabled={!value.trim()}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className={cn(
                    "p-3 rounded-xl transition-all",
                    value.trim()
                      ? `${currentRole.bgColor} text-white hover:opacity-90`
                      : "bg-neutral-800 text-neutral-500 cursor-not-allowed"
                  )}
                >
                  <ArrowUp className="h-5 w-5" strokeWidth={1.5} />
                </motion.button>
              )}
            </AnimatePresence>
          </div>
          <div className="flex items-center justify-between mt-2 px-1">
            <span className="text-xs text-neutral-600">
              Trained for {currentRole.label.toLowerCase()} workflows
            </span>
            <span className="text-xs text-neutral-500">
              Press Enter to send
            </span>
          </div>
        </div>
      </div>

      {/* Atlas Sources Modal */}
      <AtlasSourcesModal
        open={sourcesModalOpen}
        onOpenChange={setSourcesModalOpen}
        sources={selectedSources}
      />
    </div>
  )
}

export default function AnimatedAIInput() {
  return <AI_Prompt />
}
