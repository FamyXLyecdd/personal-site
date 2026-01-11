'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// ========================================
// LOADING SCREEN
// ========================================

interface LoadingScreenProps {
    minimumDuration?: number
}

export function LoadingScreen({ minimumDuration = 1500 }: LoadingScreenProps) {
    const [isLoading, setIsLoading] = useState(true)
    const [progress, setProgress] = useState(0)

    useEffect(() => {
        // Simulate loading progress
        const progressInterval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(progressInterval)
                    return 100
                }
                return prev + Math.random() * 15
            })
        }, 100)

        // Minimum duration
        const timer = setTimeout(() => {
            setProgress(100)
        }, minimumDuration - 300)

        // Complete loading
        const completeTimer = setTimeout(() => {
            setIsLoading(false)
        }, minimumDuration)

        return () => {
            clearInterval(progressInterval)
            clearTimeout(timer)
            clearTimeout(completeTimer)
        }
    }, [minimumDuration])

    return (
        <AnimatePresence>
            {isLoading && (
                <motion.div
                    className="fixed inset-0 bg-background z-[9999] flex flex-col items-center justify-center"
                    initial={{ opacity: 1 }}
                    exit={{
                        opacity: 0,
                        transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }
                    }}
                >
                    {/* Logo / Name */}
                    <motion.div
                        className="text-4xl font-bold gradient-text mb-8"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        YN.
                    </motion.div>

                    {/* Loading bar */}
                    <div className="w-48 h-1 bg-black/[0.05] rounded-full overflow-hidden">
                        <motion.div
                            className="h-full bg-gradient-to-r from-accent-primary to-accent-secondary rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: `${Math.min(progress, 100)}%` }}
                            transition={{ duration: 0.1 }}
                        />
                    </div>

                    {/* Loading text */}
                    <motion.p
                        className="mt-4 text-sm text-muted"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                    >
                        Loading magic...
                    </motion.p>
                </motion.div>
            )}
        </AnimatePresence>
    )
}

// ========================================
// SIMPLE SPINNER
// ========================================

interface SpinnerProps {
    size?: 'sm' | 'md' | 'lg'
    className?: string
}

const spinnerSizes = {
    sm: 'w-4 h-4 border-2',
    md: 'w-6 h-6 border-2',
    lg: 'w-8 h-8 border-3',
}

export function Spinner({ size = 'md', className }: SpinnerProps) {
    return (
        <div
            className={`
        ${spinnerSizes[size]}
        border-black/[0.1] border-t-accent-primary
        rounded-full animate-spin
        ${className}
      `}
            role="status"
            aria-label="Loading"
        />
    )
}

// ========================================
// DOTS LOADER
// ========================================

export function DotsLoader({ className }: { className?: string }) {
    return (
        <div className={`flex items-center gap-1 ${className}`}>
            {[0, 1, 2].map((i) => (
                <motion.div
                    key={i}
                    className="w-2 h-2 rounded-full bg-accent-primary"
                    animate={{
                        y: [-4, 4, -4],
                        opacity: [0.5, 1, 0.5],
                    }}
                    transition={{
                        duration: 0.8,
                        repeat: Infinity,
                        delay: i * 0.15,
                    }}
                />
            ))}
        </div>
    )
}

// ========================================
// PULSE LOADER
// ========================================

export function PulseLoader({ className }: { className?: string }) {
    return (
        <div className={`relative ${className}`}>
            <motion.div
                className="w-8 h-8 rounded-full bg-accent-primary/30"
                animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.5, 0, 0.5],
                }}
                transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: 'easeInOut',
                }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-4 h-4 rounded-full bg-accent-primary" />
            </div>
        </div>
    )
}
