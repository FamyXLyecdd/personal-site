'use client'

import { useCallback, useRef, useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// ========================================
// CONFETTI TYPES
// ========================================

interface ConfettiPiece {
    id: number
    x: number
    y: number
    rotation: number
    scale: number
    color: string
    shape: 'circle' | 'square' | 'triangle'
    velocity: { x: number; y: number }
}

interface ConfettiConfig {
    count?: number
    spread?: number
    startVelocity?: number
    decay?: number
    gravity?: number
    colors?: string[]
    shapes?: ('circle' | 'square' | 'triangle')[]
    duration?: number
}

const defaultColors = [
    '#FF6B6B', // red
    '#4ECDC4', // teal
    '#45B7D1', // blue
    '#FED766', // yellow
    '#F77FBE', // pink
    '#A855F7', // purple
    '#22C55E', // green
    '#3B82F6', // blue
]

const defaultConfig: Required<ConfettiConfig> = {
    count: 100,
    spread: 360,
    startVelocity: 30,
    decay: 0.95,
    gravity: 1,
    colors: defaultColors,
    shapes: ['circle', 'square', 'triangle'],
    duration: 3000,
}

// ========================================
// CONFETTI PIECE COMPONENT
// ========================================

interface ConfettiPieceProps {
    piece: ConfettiPiece
    duration: number
}

function ConfettiPieceElement({ piece, duration }: ConfettiPieceProps) {
    const shapeStyles: Record<string, React.CSSProperties> = {
        circle: {
            borderRadius: '50%',
        },
        square: {
            borderRadius: '2px',
        },
        triangle: {
            width: 0,
            height: 0,
            background: 'transparent',
            borderLeft: '6px solid transparent',
            borderRight: '6px solid transparent',
            borderBottom: `10px solid ${piece.color}`,
        },
    }

    return (
        <motion.div
            className="absolute pointer-events-none"
            style={{
                left: piece.x,
                top: piece.y,
                width: piece.shape === 'triangle' ? 0 : 10 * piece.scale,
                height: piece.shape === 'triangle' ? 0 : 10 * piece.scale,
                backgroundColor: piece.shape === 'triangle' ? 'transparent' : piece.color,
                ...shapeStyles[piece.shape],
            }}
            initial={{
                opacity: 1,
                x: 0,
                y: 0,
                rotate: 0,
                scale: piece.scale,
            }}
            animate={{
                opacity: [1, 1, 0],
                x: piece.velocity.x * 20,
                y: [0, piece.velocity.y * 10, window.innerHeight],
                rotate: piece.rotation + Math.random() * 720,
                scale: [piece.scale, piece.scale * 0.5],
            }}
            transition={{
                duration: duration / 1000,
                ease: 'easeOut',
            }}
        />
    )
}

// ========================================
// CONFETTI HOOK
// ========================================

export function useConfetti() {
    const [pieces, setPieces] = useState<ConfettiPiece[]>([])
    const [isActive, setIsActive] = useState(false)
    const timeoutRef = useRef<NodeJS.Timeout | null>(null)

    const fire = useCallback((config: ConfettiConfig = {}) => {
        const mergedConfig = { ...defaultConfig, ...config }

        const newPieces: ConfettiPiece[] = Array.from({ length: mergedConfig.count }, (_, i) => {
            const angle = (Math.random() * mergedConfig.spread - mergedConfig.spread / 2) * (Math.PI / 180)
            const velocity = mergedConfig.startVelocity * (0.5 + Math.random() * 0.5)

            return {
                id: Date.now() + i,
                x: window.innerWidth / 2,
                y: window.innerHeight / 2,
                rotation: Math.random() * 360,
                scale: 0.5 + Math.random() * 0.5,
                color: mergedConfig.colors[Math.floor(Math.random() * mergedConfig.colors.length)],
                shape: mergedConfig.shapes[Math.floor(Math.random() * mergedConfig.shapes.length)],
                velocity: {
                    x: Math.cos(angle) * velocity,
                    y: -Math.sin(angle) * velocity,
                },
            }
        })

        setPieces(newPieces)
        setIsActive(true)

        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current)
        }

        timeoutRef.current = setTimeout(() => {
            setPieces([])
            setIsActive(false)
        }, mergedConfig.duration)
    }, [])

    const fireFromPosition = useCallback((x: number, y: number, config: ConfettiConfig = {}) => {
        const mergedConfig = { ...defaultConfig, ...config }

        const newPieces: ConfettiPiece[] = Array.from({ length: mergedConfig.count }, (_, i) => {
            const angle = (Math.random() * mergedConfig.spread - mergedConfig.spread / 2) * (Math.PI / 180) - Math.PI / 2
            const velocity = mergedConfig.startVelocity * (0.5 + Math.random() * 0.5)

            return {
                id: Date.now() + i,
                x,
                y,
                rotation: Math.random() * 360,
                scale: 0.5 + Math.random() * 0.5,
                color: mergedConfig.colors[Math.floor(Math.random() * mergedConfig.colors.length)],
                shape: mergedConfig.shapes[Math.floor(Math.random() * mergedConfig.shapes.length)],
                velocity: {
                    x: Math.cos(angle) * velocity,
                    y: Math.sin(angle) * velocity,
                },
            }
        })

        setPieces((prev) => [...prev, ...newPieces])
        setIsActive(true)

        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current)
        }

        timeoutRef.current = setTimeout(() => {
            setPieces([])
            setIsActive(false)
        }, mergedConfig.duration)
    }, [])

    const cannon = useCallback((side: 'left' | 'right' | 'both' = 'both', config: ConfettiConfig = {}) => {
        const mergedConfig = { ...defaultConfig, count: 50, spread: 55, ...config }

        if (side === 'left' || side === 'both') {
            fireFromPosition(0, window.innerHeight, {
                ...mergedConfig,
                spread: 55,
            })
        }

        if (side === 'right' || side === 'both') {
            fireFromPosition(window.innerWidth, window.innerHeight, {
                ...mergedConfig,
                spread: 55,
            })
        }
    }, [fireFromPosition])

    useEffect(() => {
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current)
            }
        }
    }, [])

    return {
        pieces,
        isActive,
        fire,
        fireFromPosition,
        cannon,
    }
}

// ========================================
// CONFETTI CONTAINER
// ========================================

interface ConfettiContainerProps {
    pieces: ConfettiPiece[]
    duration?: number
}

export function ConfettiContainer({ pieces, duration = 3000 }: ConfettiContainerProps) {
    return (
        <div className="fixed inset-0 pointer-events-none z-50">
            <AnimatePresence>
                {pieces.map((piece) => (
                    <ConfettiPieceElement key={piece.id} piece={piece} duration={duration} />
                ))}
            </AnimatePresence>
        </div>
    )
}

// ========================================
// CONFETTI PROVIDER
// ========================================

import { createContext, useContext, ReactNode } from 'react'

interface ConfettiContextType {
    fire: (config?: ConfettiConfig) => void
    fireFromPosition: (x: number, y: number, config?: ConfettiConfig) => void
    cannon: (side?: 'left' | 'right' | 'both', config?: ConfettiConfig) => void
}

const ConfettiContext = createContext<ConfettiContextType | null>(null)

interface ConfettiProviderProps {
    children: ReactNode
}

export function ConfettiProvider({ children }: ConfettiProviderProps) {
    const { pieces, fire, fireFromPosition, cannon } = useConfetti()

    return (
        <ConfettiContext.Provider value={{ fire, fireFromPosition, cannon }}>
            {children}
            <ConfettiContainer pieces={pieces} />
        </ConfettiContext.Provider>
    )
}

export function useConfettiContext() {
    const context = useContext(ConfettiContext)
    if (!context) {
        throw new Error('useConfettiContext must be used within ConfettiProvider')
    }
    return context
}

// ========================================
// CELEBRATION EFFECTS
// ========================================

export function celebrationPresets() {
    return {
        success: {
            count: 100,
            colors: ['#22C55E', '#10B981', '#34D399', '#6EE7B7'],
            spread: 70,
        },
        party: {
            count: 150,
            colors: defaultColors,
            spread: 360,
            startVelocity: 45,
        },
        minimal: {
            count: 30,
            colors: ['#3B82F6', '#60A5FA'],
            spread: 45,
        },
        rainbow: {
            count: 200,
            colors: ['#EF4444', '#F97316', '#EAB308', '#22C55E', '#3B82F6', '#8B5CF6', '#EC4899'],
            spread: 180,
            startVelocity: 40,
        },
        gold: {
            count: 80,
            colors: ['#FCD34D', '#FBBF24', '#F59E0B', '#D97706'],
            shapes: ['circle', 'square'] as const,
        },
    }
}

// ========================================
// FIREWORKS EFFECT
// ========================================

interface FireworkBurst {
    id: number
    x: number
    y: number
    color: string
    particles: { angle: number; distance: number }[]
}

export function useFireworks() {
    const [bursts, setBursts] = useState<FireworkBurst[]>([])

    const launch = useCallback((x: number, y: number) => {
        const burst: FireworkBurst = {
            id: Date.now(),
            x,
            y,
            color: defaultColors[Math.floor(Math.random() * defaultColors.length)],
            particles: Array.from({ length: 20 }, () => ({
                angle: Math.random() * Math.PI * 2,
                distance: 50 + Math.random() * 100,
            })),
        }

        setBursts((prev) => [...prev, burst])

        setTimeout(() => {
            setBursts((prev) => prev.filter((b) => b.id !== burst.id))
        }, 1500)
    }, [])

    const random = useCallback(() => {
        const x = Math.random() * window.innerWidth
        const y = Math.random() * (window.innerHeight / 2)
        launch(x, y)
    }, [launch])

    return { bursts, launch, random }
}

export function FireworksContainer({ bursts }: { bursts: FireworkBurst[] }) {
    return (
        <div className="fixed inset-0 pointer-events-none z-50">
            <AnimatePresence>
                {bursts.map((burst) => (
                    <div key={burst.id} className="absolute" style={{ left: burst.x, top: burst.y }}>
                        {burst.particles.map((particle, i) => (
                            <motion.div
                                key={i}
                                className="absolute w-2 h-2 rounded-full"
                                style={{ backgroundColor: burst.color }}
                                initial={{ x: 0, y: 0, opacity: 1 }}
                                animate={{
                                    x: Math.cos(particle.angle) * particle.distance,
                                    y: Math.sin(particle.angle) * particle.distance,
                                    opacity: 0,
                                }}
                                transition={{ duration: 1, ease: 'easeOut' }}
                            />
                        ))}
                    </div>
                ))}
            </AnimatePresence>
        </div>
    )
}
