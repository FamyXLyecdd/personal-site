'use client'

import { useRef, useEffect, useMemo } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { cn } from '@/lib/utils'

// ========================================
// ANIMATED GRADIENT BACKGROUND
// ========================================

interface GradientBackgroundProps {
    className?: string
    variant?: 'default' | 'mesh' | 'aurora' | 'waves'
    animated?: boolean
    children?: React.ReactNode
}

export function GradientBackground({
    className,
    variant = 'default',
    animated = true,
    children
}: GradientBackgroundProps) {
    const variants = {
        default: (
            <>
                {/* Base gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-accent-primary/5" />

                {/* Animated orbs */}
                {animated && (
                    <>
                        <motion.div
                            className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-gradient-to-br from-accent-primary/20 to-accent-secondary/20 blur-3xl"
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
                            className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-gradient-to-tr from-accent-secondary/15 to-accent-primary/15 blur-3xl"
                            animate={{
                                x: [0, -30, 0],
                                y: [0, -50, 0],
                                scale: [1, 1.2, 1],
                            }}
                            transition={{
                                duration: 25,
                                repeat: Infinity,
                                ease: 'easeInOut',
                            }}
                        />
                        <motion.div
                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-gradient-to-br from-pink-300/10 to-purple-300/10 blur-3xl"
                            animate={{
                                scale: [1, 1.3, 1],
                                opacity: [0.3, 0.6, 0.3],
                            }}
                            transition={{
                                duration: 15,
                                repeat: Infinity,
                                ease: 'easeInOut',
                            }}
                        />
                    </>
                )}
            </>
        ),
        mesh: (
            <>
                <div className="absolute inset-0 bg-gradient-to-br from-background to-background">
                    <svg className="absolute inset-0 w-full h-full opacity-30" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(0,102,255,0.1)" strokeWidth="1" />
                            </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#grid)" />
                    </svg>
                </div>
                {animated && (
                    <motion.div
                        className="absolute inset-0"
                        style={{
                            background: 'radial-gradient(circle at var(--x, 50%) var(--y, 50%), rgba(0,102,255,0.1) 0%, transparent 50%)',
                        }}
                        animate={{
                            '--x': ['30%', '70%', '30%'],
                            '--y': ['30%', '60%', '30%'],
                        } as unknown as Record<string, unknown>}
                        transition={{
                            duration: 10,
                            repeat: Infinity,
                            ease: 'easeInOut',
                        }}
                    />
                )}
            </>
        ),
        aurora: (
            <>
                <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-accent-primary/5" />
                {animated && (
                    <>
                        <motion.div
                            className="absolute top-0 left-0 right-0 h-96 bg-gradient-to-b from-accent-primary/10 via-accent-secondary/5 to-transparent blur-2xl"
                            animate={{
                                x: [-100, 100, -100],
                                skewX: [-5, 5, -5],
                            }}
                            transition={{
                                duration: 20,
                                repeat: Infinity,
                                ease: 'easeInOut',
                            }}
                        />
                        <motion.div
                            className="absolute top-20 left-1/4 w-1/2 h-64 bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-cyan-500/10 blur-3xl rounded-full"
                            animate={{
                                x: [0, 50, -50, 0],
                                opacity: [0.3, 0.5, 0.3],
                            }}
                            transition={{
                                duration: 15,
                                repeat: Infinity,
                                ease: 'easeInOut',
                            }}
                        />
                    </>
                )}
            </>
        ),
        waves: (
            <>
                <div className="absolute inset-0 bg-background" />
                <svg
                    className="absolute bottom-0 left-0 right-0 h-64 text-accent-primary/5"
                    viewBox="0 0 1440 320"
                    preserveAspectRatio="none"
                >
                    <motion.path
                        fill="currentColor"
                        d="M0,160L48,176C96,192,192,224,288,229.3C384,235,480,213,576,186.7C672,160,768,128,864,128C960,128,1056,160,1152,165.3C1248,171,1344,149,1392,138.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
                        animate={
                            animated
                                ? {
                                    d: [
                                        'M0,160L48,176C96,192,192,224,288,229.3C384,235,480,213,576,186.7C672,160,768,128,864,128C960,128,1056,160,1152,165.3C1248,171,1344,149,1392,138.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z',
                                        'M0,128L48,149.3C96,171,192,213,288,213.3C384,213,480,171,576,165.3C672,160,768,192,864,197.3C960,203,1056,181,1152,160C1248,139,1344,117,1392,106.7L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z',
                                        'M0,160L48,176C96,192,192,224,288,229.3C384,235,480,213,576,186.7C672,160,768,128,864,128C960,128,1056,160,1152,165.3C1248,171,1344,149,1392,138.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z',
                                    ],
                                }
                                : undefined
                        }
                        transition={{
                            duration: 10,
                            repeat: Infinity,
                            ease: 'easeInOut',
                        }}
                    />
                </svg>
            </>
        ),
    }

    return (
        <div className={cn('relative overflow-hidden', className)}>
            {variants[variant]}
            <div className="relative z-10">{children}</div>
        </div>
    )
}

// ========================================
// PARTICLE FIELD
// ========================================

interface Particle {
    id: number
    x: number
    y: number
    size: number
    speed: number
    opacity: number
}

interface ParticleFieldProps {
    count?: number
    className?: string
    color?: string
}

export function ParticleField({
    count = 50,
    className,
    color = 'rgba(0, 102, 255, 0.5)'
}: ParticleFieldProps) {
    const particles = useMemo<Particle[]>(() => {
        return Array.from({ length: count }, (_, i) => ({
            id: i,
            x: Math.random() * 100,
            y: Math.random() * 100,
            size: Math.random() * 4 + 1,
            speed: Math.random() * 20 + 10,
            opacity: Math.random() * 0.5 + 0.2,
        }))
    }, [count])

    return (
        <div className={cn('absolute inset-0 overflow-hidden pointer-events-none', className)}>
            {particles.map((particle) => (
                <motion.div
                    key={particle.id}
                    className="absolute rounded-full"
                    style={{
                        left: `${particle.x}%`,
                        top: `${particle.y}%`,
                        width: particle.size,
                        height: particle.size,
                        backgroundColor: color,
                        opacity: particle.opacity,
                    }}
                    animate={{
                        y: [0, -20, 0],
                        x: [0, Math.random() * 10 - 5, 0],
                        opacity: [particle.opacity, particle.opacity * 1.5, particle.opacity],
                    }}
                    transition={{
                        duration: particle.speed,
                        repeat: Infinity,
                        ease: 'easeInOut',
                    }}
                />
            ))}
        </div>
    )
}

// ========================================
// FLOATING ELEMENTS
// ========================================

interface FloatingElementsProps {
    className?: string
    elements?: string[]
}

const defaultElements = ['💻', '🚀', '⚡', '🎨', '✨', '🔥', '💡', '🎯']

export function FloatingElements({
    className,
    elements = defaultElements
}: FloatingElementsProps) {
    return (
        <div className={cn('absolute inset-0 overflow-hidden pointer-events-none', className)}>
            {elements.map((emoji, index) => (
                <motion.span
                    key={index}
                    className="absolute text-4xl select-none"
                    style={{
                        left: `${(index / elements.length) * 100}%`,
                        top: `${Math.random() * 80 + 10}%`,
                    }}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{
                        opacity: [0.2, 0.5, 0.2],
                        y: [0, -30, 0],
                        x: [0, Math.sin(index) * 20, 0],
                        rotate: [0, 10, -10, 0],
                    }}
                    transition={{
                        duration: 5 + Math.random() * 5,
                        repeat: Infinity,
                        delay: index * 0.5,
                        ease: 'easeInOut',
                    }}
                >
                    {emoji}
                </motion.span>
            ))}
        </div>
    )
}

// ========================================
// PARALLAX SECTION
// ========================================

interface ParallaxSectionProps {
    children: React.ReactNode
    className?: string
    speed?: number
}

export function ParallaxSection({
    children,
    className,
    speed = 0.5
}: ParallaxSectionProps) {
    const ref = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ['start end', 'end start'],
    })

    const y = useTransform(scrollYProgress, [0, 1], [100 * speed, -100 * speed])
    const springY = useSpring(y, { stiffness: 100, damping: 30 })

    return (
        <motion.div ref={ref} className={cn('relative', className)} style={{ y: springY }}>
            {children}
        </motion.div>
    )
}

// ========================================
// SPOTLIGHT EFFECT
// ========================================

interface SpotlightProps {
    className?: string
    size?: number
}

export function Spotlight({ className, size = 400 }: SpotlightProps) {
    const ref = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!ref.current) return
            const rect = ref.current.getBoundingClientRect()
            const x = e.clientX - rect.left
            const y = e.clientY - rect.top
            ref.current.style.setProperty('--spotlight-x', `${x}px`)
            ref.current.style.setProperty('--spotlight-y', `${y}px`)
        }

        document.addEventListener('mousemove', handleMouseMove)
        return () => document.removeEventListener('mousemove', handleMouseMove)
    }, [])

    return (
        <div
            ref={ref}
            className={cn('absolute inset-0 overflow-hidden pointer-events-none', className)}
            style={{
                background: `radial-gradient(${size}px circle at var(--spotlight-x, 50%) var(--spotlight-y, 50%), rgba(0, 102, 255, 0.1), transparent 80%)`,
            }}
        />
    )
}

// ========================================
// NOISE OVERLAY
// ========================================

interface NoiseOverlayProps {
    opacity?: number
    className?: string
}

export function NoiseOverlay({ opacity = 0.03, className }: NoiseOverlayProps) {
    return (
        <div
            className={cn('absolute inset-0 pointer-events-none', className)}
            style={{
                opacity,
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            }}
        />
    )
}
