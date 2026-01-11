'use client'

import { useEffect, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useToast } from '@/components/ui/toast'

// ========================================
// KONAMI CODE EASTER EGG
// ========================================

const KONAMI_CODE = [
    'ArrowUp',
    'ArrowUp',
    'ArrowDown',
    'ArrowDown',
    'ArrowLeft',
    'ArrowRight',
    'ArrowLeft',
    'ArrowRight',
    'KeyB',
    'KeyA',
]

export function KonamiCode() {
    const [sequence, setSequence] = useState<string[]>([])
    const [activated, setActivated] = useState(false)
    const { success } = useToast()

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (activated) return

            setSequence((prev) => {
                const newSequence = [...prev, e.code].slice(-KONAMI_CODE.length)

                // Check if sequence matches
                if (
                    newSequence.length === KONAMI_CODE.length &&
                    newSequence.every((key, i) => key === KONAMI_CODE[i])
                ) {
                    setActivated(true)
                    success('🎉 You found the secret! DM me for 10% off!')

                    // Reset after some time
                    setTimeout(() => setActivated(false), 10000)
                }

                return newSequence
            })
        }

        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [activated, success])

    return (
        <AnimatePresence>
            {activated && <ConfettiExplosion />}
        </AnimatePresence>
    )
}

// ========================================
// CONFETTI EXPLOSION
// ========================================

function ConfettiExplosion() {
    const colors = ['#0066FF', '#00D4AA', '#FF6B6B', '#FFD93D', '#9B59B6', '#FF9500']
    const confettiCount = 100

    return (
        <div className="fixed inset-0 pointer-events-none z-[9999]">
            {Array.from({ length: confettiCount }).map((_, i) => {
                const color = colors[i % colors.length]
                const startX = 50 + (Math.random() - 0.5) * 20
                const startY = 50
                const endX = startX + (Math.random() - 0.5) * 100
                const endY = startY + Math.random() * 100 + 20
                const rotation = Math.random() * 720
                const size = 8 + Math.random() * 8
                const duration = 1.5 + Math.random() * 1.5

                return (
                    <motion.div
                        key={i}
                        className="absolute rounded-sm"
                        style={{
                            width: size,
                            height: size,
                            backgroundColor: color,
                            left: `${startX}%`,
                            top: `${startY}%`,
                        }}
                        initial={{
                            scale: 0,
                            rotate: 0,
                            opacity: 1,
                        }}
                        animate={{
                            scale: [0, 1, 1, 0.5, 0],
                            rotate: rotation,
                            x: `${endX - startX}vw`,
                            y: `${endY - startY}vh`,
                            opacity: [0, 1, 1, 1, 0],
                        }}
                        transition={{
                            duration,
                            delay: Math.random() * 0.3,
                            ease: [0.25, 0.1, 0.25, 1],
                        }}
                    />
                )
            })}
        </div>
    )
}

// ========================================
// SECRET MESSAGE (Hidden in console)
// ========================================

export function SecretConsoleMessage() {
    useEffect(() => {
        console.log(
            `%c
╔══════════════════════════════════════════╗
║                                          ║
║   👋 Hey, fellow developer!              ║
║                                          ║
║   Looking for the source code?           ║
║   DM me on Discord for access!           ║
║                                          ║
║   Or try the Konami Code... 🎮           ║
║   ↑ ↑ ↓ ↓ ← → ← → B A                    ║
║                                          ║
╚══════════════════════════════════════════╝
      `,
            'color: #0066FF; font-family: monospace; font-size: 12px;'
        )
    }, [])

    return null
}

// ========================================
// CURSOR TRAIL (Optional)
// ========================================

interface TrailParticle {
    id: number
    x: number
    y: number
}

export function CursorTrail({ enabled = false }: { enabled?: boolean }) {
    const [particles, setParticles] = useState<TrailParticle[]>([])
    const [isEnabled, setIsEnabled] = useState(enabled)

    useEffect(() => {
        if (!isEnabled) return

        let id = 0
        const handleMouseMove = (e: MouseEvent) => {
            id++
            const particle: TrailParticle = {
                id,
                x: e.clientX,
                y: e.clientY,
            }

            setParticles((prev) => [...prev.slice(-20), particle])

            // Remove particle after timeout
            setTimeout(() => {
                setParticles((prev) => prev.filter((p) => p.id !== particle.id))
            }, 1000)
        }

        window.addEventListener('mousemove', handleMouseMove)
        return () => window.removeEventListener('mousemove', handleMouseMove)
    }, [isEnabled])

    if (!isEnabled) return null

    return (
        <div className="fixed inset-0 pointer-events-none z-[9998]">
            {particles.map((particle, index) => {
                const opacity = (index + 1) / particles.length
                const scale = 0.2 + (opacity * 0.8)

                return (
                    <motion.div
                        key={particle.id}
                        className="absolute w-3 h-3 rounded-full bg-accent-primary"
                        style={{
                            left: particle.x - 6,
                            top: particle.y - 6,
                        }}
                        initial={{ opacity: 0.8, scale: 1 }}
                        animate={{ opacity: 0, scale: 0 }}
                        transition={{ duration: 1, ease: 'easeOut' }}
                    />
                )
            })}
        </div>
    )
}

// ========================================
// SECTION EMOJI CURSOR
// ========================================

const sectionEmojis: Record<string, string> = {
    hero: '👋',
    projects: '🚀',
    skills: '⚡',
    contact: '💬',
    default: '✨',
}

export function useEmojiCursor() {
    const [emoji, setEmoji] = useState('✨')

    useEffect(() => {
        const handleScroll = () => {
            const sections = ['hero', 'projects', 'skills', 'contact']

            for (const section of sections) {
                const element = document.getElementById(section)
                if (element) {
                    const rect = element.getBoundingClientRect()
                    if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
                        setEmoji(sectionEmojis[section] || sectionEmojis.default)
                        return
                    }
                }
            }

            setEmoji(sectionEmojis.default)
        }

        window.addEventListener('scroll', handleScroll, { passive: true })
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return emoji
}
