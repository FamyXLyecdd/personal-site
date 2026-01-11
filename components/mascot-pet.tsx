'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

// ========================================
// MASCOT CONFIGURATION
// ========================================

interface MascotState {
    mood: 'happy' | 'curious' | 'sleepy' | 'excited' | 'thinking'
    message?: string
}

interface MascotMessage {
    text: string
    duration?: number
    mood?: MascotState['mood']
}

// Random messages the mascot can say
const idleMessages: MascotMessage[] = [
    { text: "Hey! 👋 Need help?", mood: 'happy' },
    { text: "Scroll down to see more!", mood: 'curious' },
    { text: "Try the Konami code! 🎮", mood: 'excited' },
    { text: "I love watching you explore!", mood: 'happy' },
    { text: "This portfolio is pretty cool, right?", mood: 'curious' },
    { text: "Click on the projects to see more!", mood: 'excited' },
    { text: "Don't forget to check the Contact section!", mood: 'happy' },
    { text: "Zzzz... *yawn* 😴", mood: 'sleepy' },
    { text: "Hmm, what shall we do next?", mood: 'thinking' },
    { text: "I'm your friendly guide! 🌟", mood: 'happy' },
]

const scrollMessages: MascotMessage[] = [
    { text: "Wheee! 🎢", mood: 'excited', duration: 1500 },
    { text: "Keep going!", mood: 'happy', duration: 1500 },
    { text: "Almost there!", mood: 'curious', duration: 1500 },
]

const clickMessages: MascotMessage[] = [
    { text: "Good choice! ✨", mood: 'excited', duration: 2000 },
    { text: "Nice click!", mood: 'happy', duration: 2000 },
    { text: "Ooh, interesting!", mood: 'curious', duration: 2000 },
]

// ========================================
// MASCOT EMOJIS BY MOOD
// ========================================

const moodEmojis: Record<MascotState['mood'], string> = {
    happy: '😊',
    curious: '🤔',
    sleepy: '😴',
    excited: '🤩',
    thinking: '💭',
}

const moodColors: Record<MascotState['mood'], string> = {
    happy: '#00D4AA',
    curious: '#0066FF',
    sleepy: '#9B59B6',
    excited: '#FF6B6B',
    thinking: '#FFD93D',
}

// ========================================
// MASCOT PET COMPONENT
// ========================================

interface MascotPetProps {
    className?: string
    enabled?: boolean
}

export function MascotPet({ className, enabled = true }: MascotPetProps) {
    const [state, setState] = useState<MascotState>({ mood: 'happy' })
    const [message, setMessage] = useState<string | null>(null)
    const [isVisible, setIsVisible] = useState(true)
    const [isDragging, setIsDragging] = useState(false)
    const [position, setPosition] = useState({ x: 20, y: 200 })

    const constraintsRef = useRef<HTMLDivElement>(null)
    const messageTimeoutRef = useRef<NodeJS.Timeout>()
    const idleTimeoutRef = useRef<NodeJS.Timeout>()

    // Motion values for smooth following
    const x = useMotionValue(position.x)
    const y = useMotionValue(position.y)
    const springX = useSpring(x, { stiffness: 300, damping: 30 })
    const springY = useSpring(y, { stiffness: 300, damping: 30 })

    // Show a message
    const showMessage = useCallback((msg: MascotMessage) => {
        if (messageTimeoutRef.current) {
            clearTimeout(messageTimeoutRef.current)
        }

        setMessage(msg.text)
        if (msg.mood) {
            setState((prev) => ({ ...prev, mood: msg.mood! }))
        }

        messageTimeoutRef.current = setTimeout(() => {
            setMessage(null)
            setState((prev) => ({ ...prev, mood: 'happy' }))
        }, msg.duration || 3000)
    }, [])

    // Random idle messages
    useEffect(() => {
        if (!enabled) return

        const scheduleIdleMessage = () => {
            const delay = 15000 + Math.random() * 30000 // 15-45 seconds
            idleTimeoutRef.current = setTimeout(() => {
                const randomMessage = idleMessages[Math.floor(Math.random() * idleMessages.length)]
                showMessage(randomMessage)
                scheduleIdleMessage()
            }, delay)
        }

        // Initial delay before first message
        setTimeout(scheduleIdleMessage, 5000)

        return () => {
            if (idleTimeoutRef.current) clearTimeout(idleTimeoutRef.current)
            if (messageTimeoutRef.current) clearTimeout(messageTimeoutRef.current)
        }
    }, [enabled, showMessage])

    // React to scroll
    useEffect(() => {
        if (!enabled) return

        let lastScrollY = window.scrollY
        let scrollTimeout: NodeJS.Timeout

        const handleScroll = () => {
            const currentScrollY = window.scrollY
            const scrollDelta = Math.abs(currentScrollY - lastScrollY)

            if (scrollDelta > 200) {
                lastScrollY = currentScrollY

                clearTimeout(scrollTimeout)
                scrollTimeout = setTimeout(() => {
                    const randomMessage = scrollMessages[Math.floor(Math.random() * scrollMessages.length)]
                    showMessage(randomMessage)
                }, 300)
            }
        }

        window.addEventListener('scroll', handleScroll, { passive: true })
        return () => {
            window.removeEventListener('scroll', handleScroll)
            clearTimeout(scrollTimeout)
        }
    }, [enabled, showMessage])

    // React to clicks
    useEffect(() => {
        if (!enabled) return

        let clickCount = 0
        let clickTimeout: NodeJS.Timeout

        const handleClick = (e: MouseEvent) => {
            clickCount++

            clearTimeout(clickTimeout)
            clickTimeout = setTimeout(() => {
                if (clickCount >= 3) {
                    const randomMessage = clickMessages[Math.floor(Math.random() * clickMessages.length)]
                    showMessage(randomMessage)
                }
                clickCount = 0
            }, 500)
        }

        document.addEventListener('click', handleClick)
        return () => {
            document.removeEventListener('click', handleClick)
            clearTimeout(clickTimeout)
        }
    }, [enabled, showMessage])

    // Track mouse position for looking direction
    const [lookDirection, setLookDirection] = useState({ x: 0, y: 0 })

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            const mascotX = position.x + 30
            const mascotY = position.y + 30

            const dx = e.clientX - mascotX
            const dy = e.clientY - mascotY

            // Normalize to -1 to 1
            const distance = Math.sqrt(dx * dx + dy * dy)
            if (distance > 0) {
                setLookDirection({
                    x: Math.min(Math.max(dx / 200, -1), 1),
                    y: Math.min(Math.max(dy / 200, -1), 1),
                })
            }
        }

        window.addEventListener('mousemove', handleMouseMove, { passive: true })
        return () => window.removeEventListener('mousemove', handleMouseMove)
    }, [position])

    if (!enabled) return null

    return (
        <div ref={constraintsRef} className="fixed inset-0 pointer-events-none z-40">
            <motion.div
                className={cn(
                    'fixed pointer-events-auto cursor-grab active:cursor-grabbing',
                    className
                )}
                style={{ x: springX, y: springY }}
                drag
                dragConstraints={constraintsRef}
                dragElastic={0.1}
                onDragStart={() => setIsDragging(true)}
                onDragEnd={(_, info) => {
                    setIsDragging(false)
                    setPosition({
                        x: position.x + info.offset.x,
                        y: position.y + info.offset.y,
                    })
                }}
                whileDrag={{ scale: 1.1 }}
            >
                {/* Mascot body */}
                <motion.div
                    className="relative"
                    animate={isDragging ? { rotate: [0, -10, 10, -10, 0] } : {}}
                    transition={{ duration: 0.3 }}
                >
                    {/* Main body */}
                    <motion.div
                        className="w-16 h-16 rounded-full bg-gradient-to-br shadow-lg flex items-center justify-center text-3xl relative overflow-hidden"
                        style={{
                            background: `linear-gradient(135deg, ${moodColors[state.mood]}, ${moodColors[state.mood]}CC)`,
                            boxShadow: `0 8px 32px ${moodColors[state.mood]}40`,
                        }}
                        animate={
                            state.mood === 'excited'
                                ? { scale: [1, 1.1, 1], y: [0, -5, 0] }
                                : state.mood === 'sleepy'
                                    ? { y: [0, 2, 0] }
                                    : {}
                        }
                        transition={{
                            duration: state.mood === 'excited' ? 0.5 : 2,
                            repeat: Infinity,
                        }}
                    >
                        {/* Eyes */}
                        <div className="absolute inset-0 flex items-center justify-center gap-3">
                            {/* Left eye */}
                            <motion.div
                                className="w-3 h-3 bg-white rounded-full relative"
                                style={{
                                    x: lookDirection.x * 2,
                                    y: lookDirection.y * 2,
                                }}
                            >
                                <motion.div
                                    className="absolute w-1.5 h-1.5 bg-black rounded-full"
                                    style={{
                                        top: '50%',
                                        left: '50%',
                                        x: '-50%',
                                        y: '-50%',
                                    }}
                                    animate={{
                                        x: lookDirection.x * 3 - 3,
                                        y: lookDirection.y * 3 - 3,
                                    }}
                                />
                            </motion.div>

                            {/* Right eye */}
                            <motion.div
                                className="w-3 h-3 bg-white rounded-full relative"
                                style={{
                                    x: lookDirection.x * 2,
                                    y: lookDirection.y * 2,
                                }}
                            >
                                <motion.div
                                    className="absolute w-1.5 h-1.5 bg-black rounded-full"
                                    style={{
                                        top: '50%',
                                        left: '50%',
                                        x: '-50%',
                                        y: '-50%',
                                    }}
                                    animate={{
                                        x: lookDirection.x * 3 - 3,
                                        y: lookDirection.y * 3 - 3,
                                    }}
                                />
                            </motion.div>
                        </div>

                        {/* Blink animation */}
                        <motion.div
                            className="absolute inset-0 flex items-center justify-center gap-3 pointer-events-none"
                            animate={{ scaleY: [1, 0.1, 1] }}
                            transition={{
                                duration: 0.15,
                                repeat: Infinity,
                                repeatDelay: 3 + Math.random() * 2,
                            }}
                        >
                            <div
                                className="w-3 h-3 rounded-full"
                                style={{ background: moodColors[state.mood] }}
                            />
                            <div
                                className="w-3 h-3 rounded-full"
                                style={{ background: moodColors[state.mood] }}
                            />
                        </motion.div>

                        {/* Mouth */}
                        <motion.div
                            className="absolute bottom-3 left-1/2 -translate-x-1/2"
                            animate={state.mood === 'happy' || state.mood === 'excited' ? { scaleY: [1, 1.2, 1] } : {}}
                            transition={{ duration: 2, repeat: Infinity }}
                        >
                            {state.mood === 'sleepy' ? (
                                <div className="w-4 h-0.5 bg-white/80 rounded-full" />
                            ) : state.mood === 'thinking' ? (
                                <div className="w-3 h-3 border-2 border-white/80 rounded-full" />
                            ) : (
                                <div
                                    className="w-4 h-2 bg-white/80 rounded-b-full"
                                    style={{
                                        transform: state.mood === 'excited' ? 'scaleY(1.3)' : 'scaleY(1)',
                                    }}
                                />
                            )}
                        </motion.div>
                    </motion.div>

                    {/* Floating particles when excited */}
                    <AnimatePresence>
                        {state.mood === 'excited' && (
                            <>
                                {[0, 1, 2].map((i) => (
                                    <motion.div
                                        key={i}
                                        className="absolute w-2 h-2 rounded-full"
                                        style={{
                                            background: '#FFD93D',
                                            left: 24 + i * 12,
                                            top: -8,
                                        }}
                                        initial={{ y: 0, opacity: 0 }}
                                        animate={{
                                            y: [-10, -30],
                                            opacity: [1, 0],
                                            x: (i - 1) * 20,
                                        }}
                                        exit={{ opacity: 0 }}
                                        transition={{
                                            duration: 1,
                                            repeat: Infinity,
                                            delay: i * 0.2,
                                        }}
                                    />
                                ))}
                            </>
                        )}
                    </AnimatePresence>

                    {/* Zzz when sleepy */}
                    <AnimatePresence>
                        {state.mood === 'sleepy' && (
                            <motion.div
                                className="absolute -top-4 -right-2 text-lg"
                                initial={{ opacity: 0, y: 5 }}
                                animate={{ opacity: 1, y: -5 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 1, repeat: Infinity }}
                            >
                                💤
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>

                {/* Speech bubble */}
                <AnimatePresence>
                    {message && (
                        <motion.div
                            className="absolute left-full ml-3 top-1/2 -translate-y-1/2 bg-white rounded-2xl rounded-bl-md px-4 py-2 shadow-lg border border-black/[0.08] max-w-[200px]"
                            initial={{ opacity: 0, scale: 0.8, x: -10 }}
                            animate={{ opacity: 1, scale: 1, x: 0 }}
                            exit={{ opacity: 0, scale: 0.8, x: -10 }}
                            transition={{ duration: 0.2 }}
                        >
                            <p className="text-sm font-medium">{message}</p>
                            {/* Speech bubble tail */}
                            <div
                                className="absolute left-0 top-1/2 -translate-x-2 -translate-y-1/2 w-0 h-0"
                                style={{
                                    borderTop: '8px solid transparent',
                                    borderBottom: '8px solid transparent',
                                    borderRight: '8px solid white',
                                }}
                            />
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>

            {/* Toggle visibility button */}
            <motion.button
                className="fixed bottom-6 left-6 w-10 h-10 rounded-full bg-white/80 backdrop-blur-lg border border-black/[0.08] shadow-lg flex items-center justify-center pointer-events-auto hover:bg-white/90 transition-colors z-50"
                onClick={() => setIsVisible(!isVisible)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Toggle mascot"
            >
                <span className="text-lg">{isVisible ? '🐾' : '👻'}</span>
            </motion.button>
        </div>
    )
}
