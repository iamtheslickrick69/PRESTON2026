"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import BlogModal from "./blog-modal"

interface BlogPost {
  id: number
  title: string
  description: string
  category: string
  readTime: string
  image: string
  content: string
}

const placeholderContent = `# Placeholder Content

## The Growing Demand for Peptide Therapy

Peptide therapy is experiencing unprecedented growth as patients seek personalized, targeted treatments. Clinics that position themselves at the forefront of this movement are seeing remarkable patient outcomes and practice growth.

## Understanding the Regulatory Landscape

Navigating RUO (Research Use Only) compliance is essential for any peptide therapy practice. The regulatory environment continues to evolve, and staying informed protects both your practice and your patients.

**Key compliance areas:**
- Proper documentation protocols
- Patient consent requirements
- Storage and handling standards
- Provider credentialing
- Audit trail maintenance

## Building a Compliant Practice

Success in peptide therapy requires more than clinical expertise—it demands operational excellence and meticulous attention to compliance.

**Essential systems:**
1. Comprehensive patient screening protocols
2. Standardized dosing documentation
3. Outcome tracking and reporting
4. Continuous education programs
5. Regular compliance audits

## The Patient Experience Advantage

Practices that invest in proper systems see dramatic improvements:
- 40% reduction in administrative burden
- 3x improvement in patient retention
- 60% faster patient onboarding
- 95% compliance audit success rate

## Scaling Your Practice

**Phase 1: Foundation**
- Implement proper EHR systems
- Establish protocol libraries
- Train staff on compliance

**Phase 2: Growth**
- Expand peptide offerings
- Add provider capacity
- Optimize patient flow

**Phase 3: Scale**
- Multi-location expansion
- Advanced outcome tracking
- Referral network development

## The Future is Now

The clinics that will lead the peptide therapy revolution aren't those with the most treatments—they're the ones with the best systems. The opportunity is here. The question is: are you ready?

---

*Stay informed on the latest in peptide therapy and practice management.*`

const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "The Rise of Peptide Therapy: What Clinics Need to Know",
    description: "Understanding the Peptide Revolution",
    category: "Industry Trends",
    readTime: "6 min read",
    image: "/blog-peptide-rise.jpg",
    content: `# The Rise of Peptide Therapy: What Clinics Need to Know

## The Peptide Revolution is Here

Peptide therapy has emerged as one of the fastest-growing segments in regenerative medicine. With over 7,000 naturally occurring peptides identified in the human body, we're only beginning to unlock their therapeutic potential. For clinics, this represents both a tremendous opportunity and a significant responsibility.

## Why Patients Are Seeking Peptide Therapy

The demand is being driven by patients who want more than symptom management—they want optimization. Peptides offer targeted mechanisms of action that traditional pharmaceuticals often can't match.

**Key patient drivers:**
- Desire for personalized medicine
- Frustration with one-size-fits-all treatments
- Interest in anti-aging and longevity
- Athletes seeking recovery optimization
- Chronic condition management

## The Most In-Demand Peptides

Understanding what patients are asking for helps clinics prepare their offerings and protocols.

**Top categories by demand:**
1. BPC-157 and TB-500 for healing and recovery
2. Semaglutide and Tirzepatide for weight management
3. CJC-1295/Ipamorelin for growth hormone optimization
4. PT-141 for sexual health
5. Selank and Semax for cognitive enhancement

## Building a Peptide Practice

Success requires more than clinical knowledge. Modern peptide practices need robust systems for compliance, patient education, and outcome tracking.

**Essential infrastructure:**
- Comprehensive patient screening protocols
- Standardized dosing documentation
- Outcome tracking and reporting systems
- Patient education materials
- Compliance management tools

## The Regulatory Reality

Operating in the peptide space means navigating a complex regulatory environment. RUO (Research Use Only) compliance isn't optional—it's the foundation of a sustainable practice.

**Compliance essentials:**
- Proper documentation for every protocol
- Clear patient consent processes
- Audit-ready record keeping
- Provider credentialing verification
- Ongoing compliance monitoring

## The Bottom Line

The clinics that will lead the peptide therapy revolution aren't those offering the most treatments—they're the ones with the best systems, clearest protocols, and strongest compliance frameworks. The opportunity is massive. Are you ready to seize it?

---

*Position your practice at the forefront of peptide therapy with the right foundation.*`,
  },
  {
    id: 2,
    title: "RUO Compliance: Why It Matters for Your Practice",
    description: "Navigating Regulatory Requirements",
    category: "Compliance",
    readTime: "8 min read",
    image: "/blog-compliance.jpg",
    content: `# RUO Compliance: Why It Matters for Your Practice

## The Compliance Imperative

Research Use Only (RUO) compliance isn't just a regulatory checkbox—it's the foundation of a sustainable peptide therapy practice. Clinics that treat compliance as an afterthought are building on sand. Those who make it central to their operations are building practices that will thrive.

## Understanding the RUO Framework

RUO peptides exist in a unique regulatory space. Understanding this framework is essential for any provider offering peptide therapy.

**Key regulatory concepts:**
- RUO designation and its implications
- Documentation requirements
- Patient consent protocols
- Provider responsibilities
- Record retention standards

## The 7 Pillars of Peptide Compliance

**1. Patient Screening**
Comprehensive intake processes that document medical history, contraindications, and informed consent are non-negotiable.

**2. Protocol Documentation**
Every peptide protocol must be documented with dosing, administration route, and expected outcomes clearly recorded.

**3. Provider Credentialing**
Ensure all providers administering peptide therapy have appropriate credentials and ongoing education.

**4. Storage & Handling**
Temperature monitoring, expiration tracking, and proper storage conditions must be maintained and documented.

**5. Audit Trails**
Every action—from ordering to administration—must be traceable with timestamps and responsible parties.

**6. Patient Communication**
Clear documentation of patient education, expectations, and any adverse events or changes in protocol.

**7. Continuous Monitoring**
Regular compliance audits and system updates to stay current with evolving regulations.

## Real-World Compliance Failures

**The Documentation Gap**
A growing practice was audited and found to have incomplete consent documentation for 40% of their peptide patients. The remediation cost them significant resources and reputation.

**The Protocol Problem**
Another clinic used generic protocols without patient-specific modifications. When outcomes varied, they had no documentation to explain why or adjust treatment.

## Building a Compliance-First Practice

**Foundation:**
- Implement purpose-built EHR systems for peptide therapy
- Create standardized templates for all documentation
- Train every team member on compliance requirements

**Operations:**
- Regular internal audits
- Clear escalation procedures for compliance questions
- Continuous education on regulatory updates

**Technology:**
- Automated compliance monitoring
- Built-in audit trails
- Real-time alerts for documentation gaps

## The ROI of Compliance

Practices with strong compliance frameworks see measurable benefits:
- 95% audit success rates
- 60% reduction in administrative rework
- Higher patient confidence and retention
- Lower liability exposure

---

*Compliance isn't a burden—it's your competitive advantage.*`,
  },
  {
    id: 3,
    title: "Patient Safety in Peptide Protocols",
    description: "Building Trust Through Excellence",
    category: "Patient Care",
    readTime: "7 min read",
    image: "/blog-patient-safety.jpg",
    content: `# Patient Safety in Peptide Protocols: Building Trust Through Excellence

## Safety as the Foundation

In peptide therapy, patient safety isn't just important—it's everything. The practices that build enduring success are those that make safety the non-negotiable foundation of every protocol, every interaction, and every decision.

## The Patient Safety Framework

Building a safe peptide practice requires systematic approaches, not good intentions. Here's how leading clinics approach patient safety.

**Core safety principles:**
- Comprehensive screening before any treatment
- Evidence-based protocol development
- Continuous monitoring and adjustment
- Clear communication at every step
- Rapid response procedures for adverse events

## Critical Screening Protocols

Not every patient is a candidate for peptide therapy. Proper screening protects patients and your practice.

**Essential screening elements:**
1. Complete medical history review
2. Current medication assessment
3. Lab work baseline establishment
4. Contraindication evaluation
5. Patient expectation alignment

## Building Safe Protocols

**Protocol Development:**
- Start with established dosing guidelines
- Consider patient-specific factors
- Build in monitoring checkpoints
- Document expected outcomes and timelines

**Monitoring Requirements:**
- Regular follow-up schedules
- Clear metrics for success
- Early warning indicators
- Adjustment thresholds

## Managing Adverse Events

Even with perfect protocols, adverse events can occur. How you respond defines your practice.

**Response framework:**
- Immediate assessment protocols
- Clear escalation procedures
- Documentation requirements
- Patient communication guidelines
- Root cause analysis process

## The Technology Enabler

Modern EHR systems designed for peptide therapy can dramatically improve safety outcomes.

**Safety-enhancing features:**
- Automated contraindication alerts
- Dosing calculators with safety limits
- Follow-up scheduling automation
- Outcome tracking and trend analysis
- Audit trails for every decision

## Building Patient Confidence

Patients who feel safe become your best advocates. Safety transparency builds trust.

**Trust-building practices:**
- Clear explanation of all procedures
- Honest discussion of risks and benefits
- Accessible provider communication
- Visible commitment to protocols
- Responsive follow-up care

## The Safety Dividend

Practices that invest in safety see measurable returns:
- Higher patient retention
- Stronger referral networks
- Lower liability exposure
- Better clinical outcomes
- Enhanced reputation

---

*When patients trust your commitment to their safety, everything else follows.*`,
  },
  {
    id: 4,
    title: "Scaling Your Peptide Practice",
    description: "From Startup to Multi-Location",
    category: "Growth",
    readTime: "5 min read",
    image: "/chess-board-close-up-strategic-game.jpg",
    content: placeholderContent.replace("# Placeholder Content", "# Scaling Your Peptide Practice"),
  },
  {
    id: 5,
    title: "The Future of Regenerative Medicine",
    description: "Where Peptide Therapy is Heading",
    category: "Industry Trends",
    readTime: "6 min read",
    image: "/blog-future-medicine.jpg",
    content: placeholderContent.replace("# Placeholder Content", "# The Future of Regenerative Medicine"),
  },
  {
    id: 6,
    title: "Building Patient Trust in Peptide Treatments",
    description: "Communication and Transparency",
    category: "Patient Care",
    readTime: "7 min read",
    image: "/blog-patient-trust.jpg",
    content: placeholderContent.replace("# Placeholder Content", "# Building Patient Trust in Peptide Treatments"),
  },
]

interface Card {
  id: number
  contentType: number
}

const initialCards: Card[] = [
  { id: 1, contentType: 0 },
  { id: 2, contentType: 1 },
  { id: 3, contentType: 2 },
]

const positionStyles = [
  { scale: 1, y: 12 },
  { scale: 0.95, y: -16 },
  { scale: 0.9, y: -44 },
]

const exitAnimation = {
  y: 340,
  scale: 1,
  zIndex: 10,
}

const enterAnimation = {
  y: -16,
  scale: 0.9,
}

function CardContent({
  contentType,
  onReadClick,
}: {
  contentType: number
  onReadClick: () => void
}) {
  const post = blogPosts[contentType % blogPosts.length]

  return (
    <div className="flex h-full w-full flex-col gap-4">
      <div className="relative -outline-offset-1 flex h-[200px] w-full items-center justify-center overflow-hidden rounded-lg outline outline-black/10 dark:outline-white/10">
        <img
          src={post.image || "/placeholder.svg"}
          alt={post.title}
          className="h-full w-full select-none object-cover"
        />
        <div className="absolute left-3 top-3 flex items-center gap-2">
          <span className="rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground shadow-sm">
            {post.category}
          </span>
        </div>
        <div className="absolute right-3 top-3">
          <span className="rounded-full bg-background/95 px-2.5 py-1 text-xs font-medium text-foreground shadow-sm backdrop-blur-sm">
            {post.readTime}
          </span>
        </div>
      </div>
      <div className="flex w-full items-center justify-between gap-2 px-3 pb-6">
        <div className="flex min-w-0 flex-1 flex-col">
          <span className="truncate font-semibold text-foreground">{post.title}</span>
          <span className="text-sm text-muted-foreground">{post.description}</span>
        </div>
        <button
          onClick={onReadClick}
          className="flex h-10 shrink-0 cursor-pointer select-none items-center gap-0.5 rounded-full bg-primary pl-4 pr-3 text-sm font-medium text-primary-foreground transition-transform hover:scale-105 active:scale-95"
        >
          Read
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="square"
          >
            <path d="M9.5 18L15.5 12L9.5 6" />
          </svg>
        </button>
      </div>
    </div>
  )
}

function AnimatedCard({
  card,
  index,
  isAnimating,
  onReadClick,
}: {
  card: Card
  index: number
  isAnimating: boolean
  onReadClick: () => void
}) {
  const { scale, y } = positionStyles[index] ?? positionStyles[2]
  const zIndex = index === 0 && isAnimating ? 10 : 3 - index

  const exitAnim = index === 0 ? exitAnimation : undefined
  const initialAnim = index === 2 ? enterAnimation : undefined

  return (
    <motion.div
      key={card.id}
      initial={initialAnim}
      animate={{ y, scale }}
      exit={exitAnim}
      transition={{
        type: "spring",
        duration: 1,
        bounce: 0,
      }}
      style={{
        zIndex,
        left: "50%",
        x: "-50%",
        bottom: 0,
      }}
      className="absolute flex h-[280px] w-[324px] items-center justify-center overflow-hidden rounded-t-xl border-x border-t border-border bg-card p-1 shadow-lg will-change-transform sm:w-[512px]"
    >
      <CardContent contentType={card.contentType} onReadClick={onReadClick} />
    </motion.div>
  )
}

export default function BlogCardStack() {
  const [cards, setCards] = useState(initialCards)
  const [isAnimating, setIsAnimating] = useState(false)
  const [nextId, setNextId] = useState(4)
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null)

  const handleAnimate = () => {
    setIsAnimating(true)

    const nextContentType = (cards[2].contentType + 1) % blogPosts.length

    setCards([...cards.slice(1), { id: nextId, contentType: nextContentType }])
    setNextId((prev) => prev + 1)
    setIsAnimating(false)
  }

  const handleReadClick = (contentType: number) => {
    setSelectedPost(blogPosts[contentType % blogPosts.length])
  }

  return (
    <>
      <div className="flex w-full flex-col items-center justify-center pt-2">
        <div className="relative h-[380px] w-full overflow-hidden sm:w-[644px]">
          <AnimatePresence initial={false}>
            {cards.slice(0, 3).map((card, index) => (
              <AnimatedCard
                key={card.id}
                card={card}
                index={index}
                isAnimating={isAnimating}
                onReadClick={() => handleReadClick(card.contentType)}
              />
            ))}
          </AnimatePresence>
        </div>

        <div className="relative z-10 -mt-px flex w-full items-center justify-center border-t border-border bg-card py-4">
          <button
            onClick={handleAnimate}
            className="flex h-9 cursor-pointer select-none items-center justify-center gap-1 overflow-hidden rounded-lg border border-border bg-secondary px-4 font-medium text-secondary-foreground transition-all hover:bg-secondary/80 active:scale-[0.98]"
          >
            Next Article
          </button>
        </div>
      </div>

      <BlogModal
        isOpen={selectedPost !== null}
        onClose={() => setSelectedPost(null)}
        title={selectedPost?.title ?? ""}
        content={selectedPost?.content ?? ""}
        category={selectedPost?.category}
        readTime={selectedPost?.readTime}
      />
    </>
  )
}
