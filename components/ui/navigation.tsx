'use client'

import { useEffect, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUp } from 'lucide-react'
import { cn } from '@/lib/utils'

interface BackToTopProps {
    showAfter?: number
    className?: string
}

export function BackToTop({ showAfter = 500, className }: BackToTopProps) {
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setIsVisible(window.scrollY > showAfter)
        }

        window.addEventListener('scroll', handleScroll, { passive: true })
        return () => window.removeEventListener('scroll', handleScroll)
    }, [showAfter])

    const scrollToTop = useCallback(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }, [])

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.button
                    className={cn(
                        'fixed bottom-6 right-6 z-50',
                        'w-12 h-12 rounded-full',
                        'bg-white/80 backdrop-blur-xl border border-black/[0.08]',
                        'flex items-center justify-center',
                        'shadow-lg hover:shadow-xl',
                        'transition-shadow duration-300',
                        className
                    )}
                    onClick={scrollToTop}
                    initial={{ opacity: 0, y: 20, scale: 0.8 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 20, scale: 0.8 }}
                    whileHover={{ y: -4 }}
                    whileTap={{ scale: 0.9 }}
                    aria-label="Back to top"
                >
                    <ArrowUp className="w-5 h-5 text-foreground" />
                </motion.button>
            )}
        </AnimatePresence>
    )
}

// ========================================
// SCROLL PROGRESS BAR
// ========================================

export function ScrollProgress() {
    const [progress, setProgress] = useState(0)

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY
            const docHeight = document.documentElement.scrollHeight - window.innerHeight
            const scrollPercent = (scrollTop / docHeight) * 100
            setProgress(scrollPercent)
        }

        window.addEventListener('scroll', handleScroll, { passive: true })
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <div className="fixed top-0 left-0 right-0 z-[100] h-1 bg-black/[0.05]">
            <motion.div
                className="h-full bg-gradient-to-r from-accent-primary to-accent-secondary"
                style={{ width: `${progress}%` }}
                transition={{ duration: 0.1 }}
            />
        </div>
    )
}

// ========================================
// SCROLL INDICATOR (for hero section)
// ========================================

interface ScrollIndicatorProps {
    className?: string
    hideAfter?: number
}

export function ScrollIndicator({ className, hideAfter = 200 }: ScrollIndicatorProps) {
    const [isVisible, setIsVisible] = useState(true)

    useEffect(() => {
        const handleScroll = () => {
            setIsVisible(window.scrollY < hideAfter)
        }

        window.addEventListener('scroll', handleScroll, { passive: true })
        return () => window.removeEventListener('scroll', handleScroll)
    }, [hideAfter])

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    className={cn(
                        'absolute bottom-8 left-1/2 -translate-x-1/2',
                        'flex flex-col items-center gap-2',
                        className
                    )}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ delay: 1 }}
                >
                    <span className="text-xs text-muted font-medium tracking-wider uppercase">
                        Scroll
                    </span>
                    <motion.div
                        className="w-6 h-10 rounded-full border-2 border-black/[0.15] flex justify-center pt-2"
                    >
                        <motion.div
                            className="w-1.5 h-1.5 rounded-full bg-foreground"
                            animate={{ y: [0, 16, 0] }}
                            transition={{
                                duration: 1.5,
                                repeat: Infinity,
                                repeatType: 'loop',
                                ease: 'easeInOut',
                            }}
                        />
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}

// ========================================
// SECTION TRANSITION OBSERVER
// ========================================

interface SectionTransitionProps {
    children: React.ReactNode
    className?: string
    delay?: number
}

export function SectionTransition({ children, className, delay = 0 }: SectionTransitionProps) {
    return (
        <motion.div
            className={className}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{
                duration: 0.7,
                delay,
                ease: [0.25, 0.1, 0.25, 1],
            }}
        >
            {children}
        </motion.div>
    )
}
