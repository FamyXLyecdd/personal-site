'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, MessageCircle, ChevronDown } from 'lucide-react'
import dynamic from 'next/dynamic'
import { Button, LinkButton } from '@/components/ui/button'
import { staggerContainer, fadeInUp, fadeIn } from '@/lib/animations'
import { cn } from '@/lib/utils'

// Dynamic import for 3D ball to avoid SSR issues
const SimpleRubberBall = dynamic(
    () => import('@/components/3d/rubber-ball').then(mod => mod.SimpleRubberBall),
    { ssr: false }
)

// ========================================
// TYPING ANIMATION COMPONENT
// ========================================

function TypingText({ texts, className }: { texts: string[]; className?: string }) {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [displayText, setDisplayText] = useState('')
    const [isDeleting, setIsDeleting] = useState(false)

    useEffect(() => {
        const currentText = texts[currentIndex]
        const timeout = isDeleting ? 50 : 100

        if (!isDeleting && displayText === currentText) {
            // Pause at full text
            setTimeout(() => setIsDeleting(true), 2000)
            return
        }

        if (isDeleting && displayText === '') {
            setIsDeleting(false)
            setCurrentIndex((prev) => (prev + 1) % texts.length)
            return
        }

        const timer = setTimeout(() => {
            setDisplayText((prev) =>
                isDeleting
                    ? prev.slice(0, -1)
                    : currentText.slice(0, prev.length + 1)
            )
        }, timeout)

        return () => clearTimeout(timer)
    }, [displayText, isDeleting, currentIndex, texts])

    return (
        <span className={className}>
            {displayText}
            <span className="animate-pulse">|</span>
        </span>
    )
}

// ========================================
// ANIMATED GRADIENT BACKGROUND
// ========================================

function AnimatedGradient() {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* Animated gradient mesh */}
            <div
                className="absolute inset-0 opacity-60"
                style={{
                    background: `
            radial-gradient(ellipse 80% 50% at 20% 40%, rgba(0, 102, 255, 0.08) 0%, transparent 50%),
            radial-gradient(ellipse 60% 40% at 80% 20%, rgba(0, 212, 170, 0.08) 0%, transparent 50%),
            radial-gradient(ellipse 50% 30% at 40% 80%, rgba(255, 107, 107, 0.05) 0%, transparent 50%)
          `,
                }}
            />

            {/* Animated blobs */}
            <motion.div
                className="absolute w-[500px] h-[500px] rounded-full blur-[100px] opacity-30"
                style={{
                    background: 'linear-gradient(135deg, #0066FF20, #00D4AA20)',
                    top: '10%',
                    left: '10%',
                }}
                animate={{
                    x: [0, 50, 0],
                    y: [0, 30, 0],
                    scale: [1, 1.1, 1],
                }}
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: 'easeInOut',
                }}
            />

            <motion.div
                className="absolute w-[400px] h-[400px] rounded-full blur-[80px] opacity-25"
                style={{
                    background: 'linear-gradient(135deg, #00D4AA20, #FF6B6B20)',
                    bottom: '20%',
                    right: '10%',
                }}
                animate={{
                    x: [0, -40, 0],
                    y: [0, -20, 0],
                    scale: [1, 1.05, 1],
                }}
                transition={{
                    duration: 15,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: 2,
                }}
            />

            {/* Floating particles */}
            {[...Array(6)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute w-2 h-2 rounded-full bg-accent-primary/20"
                    style={{
                        left: `${15 + i * 15}%`,
                        top: `${20 + (i % 3) * 25}%`,
                    }}
                    animate={{
                        y: [0, -30, 0],
                        opacity: [0.2, 0.5, 0.2],
                    }}
                    transition={{
                        duration: 4 + i,
                        repeat: Infinity,
                        ease: 'easeInOut',
                        delay: i * 0.5,
                    }}
                />
            ))}
        </div>
    )
}

// ========================================
// SCROLL INDICATOR
// ========================================

function ScrollIndicator() {
    const [isVisible, setIsVisible] = useState(true)

    useEffect(() => {
        const handleScroll = () => {
            setIsVisible(window.scrollY < 100)
        }
        window.addEventListener('scroll', handleScroll, { passive: true })
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    if (!isVisible) return null

    return (
        <motion.div
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2, duration: 0.5 }}
        >
            <span className="text-xs font-medium uppercase tracking-widest">Scroll</span>
            <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            >
                <ChevronDown className="w-5 h-5" />
            </motion.div>
        </motion.div>
    )
}

// ========================================
// HERO SECTION
// ========================================

export function HeroSection() {
    const containerRef = useRef<HTMLElement>(null)
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end start'],
    })

    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
    const y = useTransform(scrollYProgress, [0, 0.5], [0, 100])

    const typingTexts = [
        'Discord Bots',
        'Python Automation',
        'Web Scraping',
        'AI Integration',
    ]

    return (
        <section
            ref={containerRef}
            className="relative min-h-screen flex items-center justify-center overflow-hidden"
            aria-label="Hero section"
        >
            {/* Animated background */}
            <AnimatedGradient />

            {/* Main content */}
            <motion.div
                className="container relative z-10 grid lg:grid-cols-2 gap-12 lg:gap-8 items-center py-20 lg:py-0"
                style={{ opacity, y }}
            >
                {/* Text content */}
                <motion.div
                    className="text-center lg:text-left order-2 lg:order-1"
                    variants={staggerContainer}
                    initial="hidden"
                    animate="visible"
                >
                    {/* Badge */}
                    <motion.div
                        variants={fadeInUp}
                        className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full bg-white/70 backdrop-blur-lg border border-black/[0.08]"
                    >
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                        </span>
                        <span className="text-sm font-medium text-muted">Available for work</span>
                    </motion.div>

                    {/* Main heading */}
                    <motion.h1
                        variants={fadeInUp}
                        className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight mb-6"
                    >
                        I Build Things That{' '}
                        <span className="gradient-text">Don&apos;t Suck</span>
                    </motion.h1>

                    {/* Subheading with typing effect */}
                    <motion.p
                        variants={fadeInUp}
                        className="text-lg sm:text-xl text-muted mb-4"
                    >
                        <TypingText texts={typingTexts} className="text-accent-primary font-medium" />
                        {' '}• 16 & Making ₱20k/mo
                    </motion.p>

                    <motion.p
                        variants={fadeInUp}
                        className="text-base sm:text-lg text-muted mb-8 max-w-lg mx-auto lg:mx-0"
                    >
                        I&apos;m a self-taught developer from the Philippines, specializing in
                        building premium Discord bots and Python automation tools that actually work.
                    </motion.p>

                    {/* CTA Buttons */}
                    <motion.div
                        variants={fadeInUp}
                        className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
                    >
                        <Button
                            variant="primary"
                            size="lg"
                            icon={<ArrowRight className="w-5 h-5" />}
                            data-cursor-text="View"
                        >
                            See My Work
                        </Button>
                        <Button
                            variant="secondary"
                            size="lg"
                            icon={<MessageCircle className="w-5 h-5" />}
                            iconPosition="left"
                        >
                            Let&apos;s Talk
                        </Button>
                    </motion.div>

                    {/* Quick stats */}
                    <motion.div
                        variants={fadeInUp}
                        className="flex gap-8 mt-12 justify-center lg:justify-start"
                    >
                        {[
                            { value: '50+', label: 'Projects' },
                            { value: '30+', label: 'Clients' },
                            { value: '2+ yrs', label: 'Experience' },
                        ].map((stat, i) => (
                            <div key={i} className="text-center lg:text-left">
                                <div className="text-2xl sm:text-3xl font-bold gradient-text">{stat.value}</div>
                                <div className="text-sm text-muted">{stat.label}</div>
                            </div>
                        ))}
                    </motion.div>
                </motion.div>

                {/* 3D Ball */}
                <motion.div
                    className="order-1 lg:order-2 flex items-center justify-center"
                    variants={fadeIn}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: 0.5 }}
                >
                    <div className="relative w-full max-w-md aspect-square">
                        <SimpleRubberBall className="w-full h-full" />

                        {/* Glow effect under ball */}
                        <div
                            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-64 h-32 rounded-full blur-3xl opacity-30"
                            style={{
                                background: 'linear-gradient(to top, #0066FF40, transparent)',
                            }}
                        />
                    </div>
                </motion.div>
            </motion.div>

            {/* Scroll indicator */}
            <ScrollIndicator />
        </section>
    )
}
