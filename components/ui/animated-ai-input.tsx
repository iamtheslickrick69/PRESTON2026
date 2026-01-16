"use client"

import * as React from "react"
import { AnimatePresence, motion } from "framer-motion"
import { ArrowUp, Square, Building2, UserCog, User, Sparkles } from "lucide-react"
import Image from "next/image"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"

type RoleType = "clinic" | "provider" | "patient"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
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
  responses: Record<string, string>
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
    placeholder: "Ask about clinic operations, analytics, or compliance...",
    prompts: ["Revenue analytics this month", "Provider scheduling conflicts", "HIPAA compliance checklist"],
    responses: {
      "Revenue analytics this month": `**Monthly Revenue Summary - January 2025**

📊 **Total Revenue:** $127,450 (+12% vs last month)

| Category | Amount | Change |
|----------|--------|--------|
| Consultations | $45,200 | +8% |
| Peptide Sales | $67,800 | +18% |
| Follow-ups | $14,450 | +3% |

**Top Performers:**
• Dr. Sarah Chen - $42,300 (33% of total)
• Dr. Michael Ross - $38,150 (30% of total)

**Recommendation:** Peptide sales are driving growth. Consider expanding inventory of BPC-157 and Semaglutide - both showing 25%+ demand increase.`,
      "Provider scheduling conflicts": `**Scheduling Conflicts Detected - This Week**

⚠️ **3 conflicts found:**

1. **Tuesday 2:00 PM** - Dr. Chen double-booked
   • Patient: John Martinez (Follow-up)
   • Patient: Lisa Wong (New consultation)
   • *Suggestion: Move Wong to 3:30 PM slot*

2. **Wednesday 10:00 AM** - Room 2 unavailable
   • Scheduled: Dr. Ross procedure
   • *Suggestion: Relocate to Room 4*

3. **Friday 4:00 PM** - Overtime risk
   • 3 appointments after 4 PM
   • *Suggestion: Redistribute to morning slots*

**Quick Actions:** [Resolve All] [View Calendar] [Notify Providers]`,
      "HIPAA compliance checklist": `**HIPAA Compliance Status - Q1 2025**

✅ **Compliant Areas (8/10):**
• Patient data encryption (AES-256)
• Access logging enabled
• Staff training completed (Dec 2024)
• BAA agreements current
• Incident response plan updated

⚠️ **Action Required (2 items):**

1. **Password Policy Update**
   • Current: 90-day rotation
   • Required: 60-day rotation
   • *Due: Feb 15, 2025*

2. **Workstation Security Audit**
   • 2 stations missing screen locks
   • Locations: Front desk, Lab room
   • *Due: Feb 1, 2025*

**Overall Score:** 87/100 - Good Standing`
    },
  },
  {
    id: "provider",
    label: "Provider",
    icon: <UserCog className="h-4 w-4" strokeWidth={1.5} />,
    color: "text-cyan-400",
    activeColor: "text-cyan-300",
    bgColor: "bg-cyan-500",
    borderColor: "border-cyan-500/30",
    placeholder: "Ask about protocols, dosing, or patient care...",
    prompts: ["BPC-157 dosing calculator", "Compare GH peptide protocols", "Drug interaction check"],
    responses: {
      "BPC-157 dosing calculator": `**BPC-157 Dosing Calculator**

Based on standard protocols for tissue repair and recovery:

📋 **Recommended Dosing:**

| Patient Weight | Daily Dose | Frequency |
|----------------|------------|-----------|
| < 150 lbs | 250 mcg | 2x daily |
| 150-200 lbs | 300 mcg | 2x daily |
| > 200 lbs | 350 mcg | 2x daily |

**Administration:**
• Route: Subcutaneous injection
• Duration: 4-6 week cycles
• Injection sites: Rotate between abdomen, thigh

**Reconstitution:**
• 5mg vial + 2ml BAC water = 250mcg per 0.1ml
• Stable for 28 days refrigerated

⚠️ **Note:** Adjust based on patient response. Start conservative with new patients.`,
      "Compare GH peptide protocols": `**Growth Hormone Peptide Comparison**

| Peptide | Mechanism | Best For | Dosing |
|---------|-----------|----------|--------|
| **CJC-1295/Ipamorelin** | GHRH + GHRP | Anti-aging, sleep | 100mcg each, 2x daily |
| **Tesamorelin** | GHRH analog | Fat reduction | 2mg daily |
| **Sermorelin** | GHRH | Entry-level GH | 200-300mcg nightly |
| **MK-677** | Ghrelin mimetic | Muscle, appetite | 10-25mg oral daily |

**My Recommendation for Most Patients:**

🏆 **CJC-1295/Ipamorelin combo** - Best balance of efficacy and safety

**Why:**
• Synergistic GH release (3-5x natural pulse)
• Minimal side effects
• Doesn't suppress natural production
• Well-studied safety profile

**Cycle:** 12 weeks on, 4 weeks off`,
      "Drug interaction check": `**Drug Interaction Analysis**

Enter the medications to check, or here are common peptide interactions:

⚠️ **Moderate Interactions:**

| Peptide | Interacts With | Effect |
|---------|----------------|--------|
| BPC-157 | Blood thinners | May enhance effect |
| Semaglutide | Insulin | Hypoglycemia risk |
| CJC-1295 | Corticosteroids | Reduced efficacy |

✅ **Generally Safe Combinations:**
• BPC-157 + TB-500 (synergistic healing)
• CJC-1295 + Ipamorelin (standard combo)
• Semaglutide + Metformin (complementary)

🔴 **Avoid:**
• GH peptides + Active cancer treatment
• Semaglutide + Other GLP-1 agonists

**Pro Tip:** Always review patient's full medication list before starting peptide therapy.`
    },
  },
  {
    id: "patient",
    label: "Patient",
    icon: <User className="h-4 w-4" strokeWidth={1.5} />,
    color: "text-rose-400",
    activeColor: "text-rose-300",
    bgColor: "bg-rose-500",
    borderColor: "border-rose-500/30",
    placeholder: "Ask about your treatment, side effects, or next steps...",
    prompts: ["Explain my treatment plan", "Common side effects", "Injection site guidance"],
    responses: {
      "Explain my treatment plan": `**Your Treatment Plan Summary**

Hi! Here's a simple breakdown of your current peptide therapy:

💊 **What You're Taking:**
• **BPC-157** - Helps with tissue healing and gut health
• **Dose:** 250mcg twice daily (morning and evening)

📅 **Your Schedule:**
• **Week 1-2:** Starting phase - you may not notice much yet
• **Week 3-4:** Most patients start feeling improvements
• **Week 5-8:** Full benefits typically achieved

🎯 **Goals We're Working Toward:**
1. Reduce joint discomfort
2. Improve recovery after workouts
3. Support digestive health

📞 **Your Next Steps:**
• Follow-up appointment: **Feb 15, 2025**
• Lab work due: **Feb 10, 2025**

*Questions about your specific treatment? Send a message to your provider anytime!*`,
      "Common side effects": `**Common Side Effects - What to Expect**

Most patients tolerate peptide therapy well. Here's what you might experience:

✅ **Normal & Expected (usually mild):**
• Slight redness at injection site (fades in 30 min)
• Mild fatigue first few days (body adjusting)
• Increased thirst (stay hydrated!)

⚡ **Less Common:**
• Mild headache (usually week 1 only)
• Vivid dreams (actually a sign it's working!)
• Slight nausea if taken without food

🚨 **Contact Your Provider If:**
• Severe pain at injection site
• Difficulty breathing
• Significant swelling
• Symptoms that don't improve

**Tips to Minimize Side Effects:**
1. Stay well-hydrated (8+ glasses water)
2. Take with a small meal if nausea occurs
3. Rotate injection sites each time
4. Don't skip doses - consistency helps

*Most side effects resolve within the first 1-2 weeks as your body adjusts.*`,
      "Injection site guidance": `**Injection Site Guide - Easy Steps**

Don't worry - it gets easier with practice! Here's your guide:

📍 **Best Injection Sites:**

**1. Abdomen (Most Popular)**
• 2 inches away from belly button
• Rotate left and right sides
• Avoid areas with stretch marks

**2. Thigh (Good Alternative)**
• Front or outer thigh
• Middle third of your thigh
• Easy to see and reach

🔄 **Rotation Pattern:**
\`\`\`
Day 1: Left abdomen
Day 2: Right abdomen
Day 3: Left thigh
Day 4: Right thigh
(Repeat)
\`\`\`

📝 **Step-by-Step:**
1. Wash hands thoroughly
2. Clean site with alcohol swab
3. Pinch skin gently
4. Insert needle at 45-90° angle
5. Inject slowly (5-10 seconds)
6. Release pinch, remove needle
7. Light pressure with cotton ball

**Pro Tips:**
• Let medication reach room temp first
• Ice the area beforehand if sensitive
• Never inject into bruised areas

*You've got this! Most patients feel comfortable after 3-4 injections.*`
    },
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
      <span className="text-xs text-neutral-500 ml-2">Bridge AI is thinking...</span>
    </div>
  )
}

// Message component with markdown-like styling
function ChatMessage({ message, roleConfig }: { message: Message; roleConfig: RoleConfig }) {
  const isUser = message.role === "user"

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
        <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden">
          <Image
            src="/bridge-ai-icon.png"
            alt="Bridge AI"
            width={80}
            height={80}
            className="object-contain scale-[3]"
          />
        </div>
      )}
      <div className={cn(
        "max-w-[85%] rounded-2xl px-4 py-3 text-sm",
        isUser
          ? `${roleConfig.bgColor} text-white`
          : "bg-neutral-800 text-neutral-300"
      )}>
        {isUser ? (
          <p>{message.content}</p>
        ) : (
          <div className="space-y-1">{renderContent(message.content)}</div>
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

  const handleSubmit = (query: string) => {
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

    // Simulate AI response
    setTimeout(() => {
      const response = currentRole.responses[query] ||
        `I understand you're asking about "${query}". This is a demo, but in the full version, I'd provide detailed, evidence-based guidance tailored to your ${currentRole.label.toLowerCase()} needs.\n\n**Try one of the suggested prompts** to see a full response example!`

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: response
      }
      setMessages(prev => [...prev, assistantMessage])
      setIsLoading(false)
    }, 1500)
  }

  const handlePromptClick = (prompt: string) => {
    handleSubmit(prompt)
  }

  return (
    <div className={cn("w-full max-w-3xl mx-auto", className)}>
      <div className="relative bg-neutral-900 rounded-2xl border border-neutral-700/50 overflow-hidden shadow-2xl shadow-black/50">
        {/* Header with role tabs */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-neutral-800">
          {/* Role Tabs */}
          <div className="flex items-center gap-1 p-1 rounded-lg bg-neutral-800/50">
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
                    className="absolute inset-0 rounded-md bg-neutral-700/80"
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
            // Empty state
            <div className="h-full flex flex-col items-center justify-center text-center px-8">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4 overflow-hidden">
                <Image
                  src="/bridge-ai-icon.png"
                  alt="Bridge AI"
                  width={200}
                  height={200}
                  className="object-contain scale-[3.5]"
                />
              </div>
              <h3 className="text-white font-medium mb-2">
                {currentRole.label} Assistant Ready
              </h3>
              <p className="text-neutral-500 text-sm max-w-md">
                Ask me anything about {currentRole.id === "clinic" ? "clinic operations and analytics" : currentRole.id === "provider" ? "peptide protocols and patient care" : "your treatment plan and medications"}. Try one of the suggestions below to see me in action.
              </p>
            </div>
          ) : (
            // Messages
            <div className="py-4">
              {messages.map((message) => (
                <ChatMessage key={message.id} message={message} roleConfig={currentRole} />
              ))}
              {isLoading && <TypingIndicator color={currentRole.color} />}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* Suggested Prompts */}
        <div className="px-4 py-3 border-t border-neutral-800/50">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeRole}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.2 }}
              className="flex flex-wrap items-center gap-2"
            >
              <span className="text-xs text-neutral-600">Try:</span>
              {currentRole.prompts.map((prompt, index) => (
                <button
                  key={index}
                  onClick={() => handlePromptClick(prompt)}
                  disabled={isLoading}
                  className={cn(
                    "px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200",
                    "bg-neutral-800/50 border",
                    currentRole.borderColor,
                    "hover:bg-neutral-800 disabled:opacity-50 disabled:cursor-not-allowed",
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
        <div className="px-4 py-3 border-t border-neutral-800 bg-neutral-900/50">
          <div className="flex items-end gap-3">
            <Textarea
              ref={textareaRef}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={currentRole.placeholder}
              disabled={isLoading}
              className={cn(
                "flex-1 bg-neutral-800/50 border border-neutral-700/50 rounded-xl resize-none text-white placeholder:text-neutral-500 focus:ring-1 focus:border-transparent text-sm py-3 px-4 min-h-[48px] max-h-[120px]",
                `focus:ring-${currentRole.id === "clinic" ? "gray" : currentRole.id === "provider" ? "cyan" : "rose"}-500/50`
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
    </div>
  )
}

export default function AnimatedAIInput() {
  return <AI_Prompt />
}
