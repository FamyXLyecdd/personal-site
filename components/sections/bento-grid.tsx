'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useInView, useAnimation, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import {
    Github,
    Mail,
    MessageSquare,
    Music,
    Clock,
    Star,
    Code,
    Coffee,
    Zap,
    ArrowUpRight,
    Copy,
    Check,
} from 'lucide-react'
import { GlassCard, BentoCard } from '@/components/ui/glass-card'
import { Badge, TechPill, StarRating, PulseDot, Avatar } from '@/components/ui/index'
import { staggerContainer, fadeInUp, cardVariants } from '@/lib/animations'
import { cn, copyToClipboard, formatNumber } from '@/lib/utils'
import { useToast } from '@/components/ui/toast'

// Dynamic imports for 3D components
const FloatingScene = dynamic(
    () => import('@/components/3d/floating-scene').then(mod => mod.FloatingScene),
    { ssr: false }
)

const SkillsRadar = dynamic(
    () => import('@/components/3d/skills-globe').then(mod => mod.SkillsRadar),
    { ssr: false }
)

// ========================================
// ANIMATED COUNTER
// ========================================

function AnimatedCounter({
    target,
    duration = 2,
    suffix = '',
    prefix = '',
}: {
    target: number
    duration?: number
    suffix?: string
    prefix?: string
}) {
    const [count, setCount] = useState(0)
    const ref = useRef<HTMLSpanElement>(null)
    const isInView = useInView(ref, { once: true, margin: '-100px' })

    useEffect(() => {
        if (!isInView) return

        let startTime: number
        let animationFrame: number

        const animate = (timestamp: number) => {
            if (!startTime) startTime = timestamp
            const progress = Math.min((timestamp - startTime) / (duration * 1000), 1)

            // Easing function
            const eased = 1 - Math.pow(1 - progress, 3)
            setCount(Math.floor(eased * target))

            if (progress < 1) {
                animationFrame = requestAnimationFrame(animate)
            }
        }

        animationFrame = requestAnimationFrame(animate)
        return () => cancelAnimationFrame(animationFrame)
    }, [isInView, target, duration])

    return (
        <span ref={ref}>
            {prefix}{formatNumber(count)}{suffix}
        </span>
    )
}

// ========================================
// FEATURED PROJECT CARD
// ========================================

function FeaturedProjectCard() {
    const [isHovered, setIsHovered] = useState(false)

    return (
        <BentoCard
            size="2x2"
            padding="none"
            className="group cursor-pointer overflow-hidden"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            data-cursor-text="View Project"
        >
            {/* Project image */}
            <div className="relative h-48 sm:h-56 overflow-hidden">
                <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-accent-primary/20 to-accent-secondary/20"
                    animate={{ scale: isHovered ? 1.05 : 1 }}
                    transition={{ duration: 0.4 }}
                >
                    {/* Placeholder for project image */}
                    <div className="w-full h-full flex items-center justify-center">
                        <div className="text-6xl opacity-50">🤖</div>
                    </div>
                </motion.div>

                {/* Overlay on hover */}
                <motion.div
                    className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isHovered ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                />

                {/* Featured badge */}
                <div className="absolute top-4 left-4">
                    <Badge variant="primary">
                        <Star className="w-3 h-3" /> Featured
                    </Badge>
                </div>
            </div>

            {/* Content */}
            <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 group-hover:text-accent-primary transition-colors">
                    Premium Discord Bot
                </h3>
                <p className="text-muted text-sm mb-4 line-clamp-2">
                    A fully-featured Discord bot with music, moderation, economy, and AI-powered responses.
                    Serving over 100+ servers.
                </p>

                {/* Tech stack */}
                <div className="flex flex-wrap gap-2 mb-4">
                    <TechPill name="Python" />
                    <TechPill name="Discord.py" />
                    <TechPill name="MongoDB" />
                    <TechPill name="OpenAI" />
                </div>

                {/* View project link */}
                <motion.div
                    className="flex items-center gap-2 text-accent-primary font-medium text-sm"
                    animate={{ x: isHovered ? 4 : 0 }}
                >
                    View Project <ArrowUpRight className="w-4 h-4" />
                </motion.div>
            </div>
        </BentoCard>
    )
}

// ========================================
// SKILLS RADAR CARD
// ========================================

function SkillsCard() {
    return (
        <BentoCard size="1x1" className="overflow-hidden">
            <h3 className="text-lg font-semibold mb-2">Skills</h3>
            <div className="relative h-[180px] -mx-4 -mb-4">
                <SkillsRadar className="absolute inset-0" />
            </div>
        </BentoCard>
    )
}

// ========================================
// LIVE STATS CARD
// ========================================

function StatsCard() {
    return (
        <BentoCard size="1x1">
            <h3 className="text-lg font-semibold mb-4">Quick Stats</h3>

            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-muted">
                        <Code className="w-4 h-4" />
                        <span className="text-sm">Projects</span>
                    </div>
                    <span className="text-xl font-bold gradient-text">
                        <AnimatedCounter target={50} suffix="+" />
                    </span>
                </div>

                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-muted">
                        <Zap className="w-4 h-4" />
                        <span className="text-sm">Lines of Code</span>
                    </div>
                    <span className="text-xl font-bold gradient-text">
                        <AnimatedCounter target={100} suffix="K+" />
                    </span>
                </div>

                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-muted">
                        <Coffee className="w-4 h-4" />
                        <span className="text-sm">Coffee</span>
                    </div>
                    <span className="text-xl font-bold gradient-text">
                        <AnimatedCounter target={999} suffix=" ☕" />
                    </span>
                </div>
            </div>
        </BentoCard>
    )
}

// ========================================
// 3D SCENE CARD
// ========================================

function Scene3DCard() {
    return (
        <BentoCard size="2x1" padding="none" className="overflow-hidden relative min-h-[200px]">
            <FloatingScene className="absolute inset-0" />
            <div className="absolute bottom-4 left-4 right-4">
                <Badge variant="secondary" className="backdrop-blur-md">
                    Interactive 3D
                </Badge>
            </div>
        </BentoCard>
    )
}

// ========================================
// SPOTIFY CARD
// ========================================

function SpotifyCard() {
    return (
        <BentoCard size="1x1">
            <div className="flex items-start gap-3">
                <motion.div
                    className="w-12 h-12 rounded-lg bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center flex-shrink-0"
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                >
                    <Music className="w-6 h-6 text-white" />
                </motion.div>
                <div className="min-w-0">
                    <p className="text-xs text-muted mb-1">Currently coding to:</p>
                    <p className="font-medium text-sm truncate">Lofi Hip Hop</p>
                    <p className="text-xs text-muted truncate">ChilledCow</p>
                </div>
            </div>

            {/* Waveform visualization */}
            <div className="flex items-end gap-1 mt-4 h-8">
                {[...Array(12)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="flex-1 bg-green-500 rounded-full"
                        animate={{
                            height: [`${20 + Math.random() * 60}%`, `${20 + Math.random() * 60}%`],
                        }}
                        transition={{
                            duration: 0.5,
                            repeat: Infinity,
                            repeatType: 'reverse',
                            delay: i * 0.1,
                        }}
                    />
                ))}
            </div>
        </BentoCard>
    )
}

// ========================================
// AVAILABILITY CARD
// ========================================

function AvailabilityCard() {
    const [isFlipped, setIsFlipped] = useState(false)

    return (
        <BentoCard
            size="1x1"
            className="cursor-pointer perspective-1000"
            onClick={() => setIsFlipped(!isFlipped)}
        >
            <AnimatePresence mode="wait">
                {!isFlipped ? (
                    <motion.div
                        key="front"
                        initial={{ rotateY: 180, opacity: 0 }}
                        animate={{ rotateY: 0, opacity: 1 }}
                        exit={{ rotateY: -180, opacity: 0 }}
                        transition={{ duration: 0.4 }}
                    >
                        <div className="flex items-center gap-2 mb-3">
                            <PulseDot color="green" />
                            <span className="font-medium">Available for work</span>
                        </div>
                        <div className="flex items-center gap-2 text-muted text-sm">
                            <Clock className="w-4 h-4" />
                            <span>GMT+8 (Philippines)</span>
                        </div>
                        <p className="text-xs text-muted mt-4">Click to see rates →</p>
                    </motion.div>
                ) : (
                    <motion.div
                        key="back"
                        initial={{ rotateY: -180, opacity: 0 }}
                        animate={{ rotateY: 0, opacity: 1 }}
                        exit={{ rotateY: 180, opacity: 0 }}
                        transition={{ duration: 0.4 }}
                    >
                        <h4 className="font-semibold mb-2">Hourly Rate</h4>
                        <p className="text-2xl font-bold gradient-text mb-2">$15-25/hr</p>
                        <p className="text-xs text-muted">Depending on project complexity</p>
                        <p className="text-xs text-muted mt-2">← Click to flip back</p>
                    </motion.div>
                )}
            </AnimatePresence>
        </BentoCard>
    )
}

// ========================================
// QUICK CONTACT CARD
// ========================================

function QuickContactCard() {
    const { success } = useToast()
    const [copiedItem, setCopiedItem] = useState<string | null>(null)

    const contacts = [
        { id: 'email', icon: Mail, label: 'Email', value: 'hello@example.com' },
        { id: 'discord', icon: MessageSquare, label: 'Discord', value: 'username#0000' },
        { id: 'github', icon: Github, label: 'GitHub', value: 'github.com/username' },
    ]

    const handleCopy = async (id: string, value: string) => {
        const copied = await copyToClipboard(value)
        if (copied) {
            setCopiedItem(id)
            success(`${id.charAt(0).toUpperCase() + id.slice(1)} copied!`)
            setTimeout(() => setCopiedItem(null), 2000)
        }
    }

    return (
        <BentoCard size="1x2">
            <h3 className="text-lg font-semibold mb-4">Quick Contact</h3>

            <div className="space-y-3">
                {contacts.map((contact) => (
                    <motion.button
                        key={contact.id}
                        className="w-full flex items-center gap-3 p-3 rounded-xl bg-white/50 hover:bg-white/80 transition-colors group"
                        onClick={() => handleCopy(contact.id, contact.value)}
                        whileHover={{ y: -2 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent-primary/10 to-accent-secondary/10 flex items-center justify-center group-hover:from-accent-primary/20 group-hover:to-accent-secondary/20 transition-colors">
                            <contact.icon className="w-5 h-5 text-accent-primary" />
                        </div>
                        <div className="flex-1 text-left">
                            <p className="text-sm font-medium">{contact.label}</p>
                            <p className="text-xs text-muted truncate">{contact.value}</p>
                        </div>
                        <motion.div
                            initial={false}
                            animate={{ scale: copiedItem === contact.id ? [1, 1.2, 1] : 1 }}
                        >
                            {copiedItem === contact.id ? (
                                <Check className="w-4 h-4 text-green-500" />
                            ) : (
                                <Copy className="w-4 h-4 text-muted opacity-0 group-hover:opacity-100 transition-opacity" />
                            )}
                        </motion.div>
                    </motion.button>
                ))}
            </div>
        </BentoCard>
    )
}

// ========================================
// TESTIMONIAL CARD
// ========================================

function TestimonialCard() {
    return (
        <BentoCard size="2x1">
            <div className="flex gap-4">
                <Avatar
                    src=""
                    alt="Client Name"
                    fallback="JD"
                    size="lg"
                />
                <div className="flex-1">
                    <StarRating rating={5} size="sm" animated />
                    <blockquote className="mt-2 text-sm text-muted italic">
                        &ldquo;Absolutely incredible work! The bot exceeded all expectations.
                        Fast delivery, great communication, and the code quality is top-notch.&rdquo;
                    </blockquote>
                    <div className="mt-2">
                        <p className="font-medium text-sm">John Doe</p>
                        <p className="text-xs text-muted">Server Owner • 50k+ members</p>
                    </div>
                </div>
            </div>
        </BentoCard>
    )
}

// ========================================
// BENTO GRID SECTION
// ========================================

export function BentoGridSection() {
    const containerRef = useRef<HTMLElement>(null)
    const isInView = useInView(containerRef, { once: true, margin: '-100px' })

    return (
        <section
            ref={containerRef}
            className="section relative"
            aria-label="About and highlights"
        >
            <div className="container">
                {/* Section header */}
                <motion.div
                    className="text-center mb-12"
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                        A Bit About <span className="gradient-text">Me</span>
                    </h2>
                    <p className="text-muted max-w-2xl mx-auto">
                        Here&apos;s a quick overview of what I do, my skills, and how you can reach me.
                    </p>
                </motion.div>

                {/* Bento grid */}
                <motion.div
                    className="bento-grid"
                    variants={staggerContainer}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                >
                    <FeaturedProjectCard />
                    <SkillsCard />
                    <StatsCard />
                    <Scene3DCard />
                    <SpotifyCard />
                    <AvailabilityCard />
                    <QuickContactCard />
                    <TestimonialCard />
                </motion.div>
            </div>
        </section>
    )
}
