'use client'

import { useEffect, useRef, createContext, useContext, ReactNode } from 'react'
import Lenis from 'lenis'

interface SmoothScrollContextType {
    lenis: Lenis | null
}

const SmoothScrollContext = createContext<SmoothScrollContextType>({ lenis: null })

export function useSmoothScroll() {
    return useContext(SmoothScrollContext)
}

interface SmoothScrollProviderProps {
    children: ReactNode
}

export function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
    const lenisRef = useRef<Lenis | null>(null)

    useEffect(() => {
        // Check for reduced motion preference
        const prefersReducedMotion = window.matchMedia(
            '(prefers-reduced-motion: reduce)'
        ).matches

        if (prefersReducedMotion) {
            return
        }

        // Initialize Lenis for butter-smooth scrolling
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // easeOutExpo
            orientation: 'vertical',
            gestureOrientation: 'vertical',
            smoothWheel: true,
            wheelMultiplier: 1,
            touchMultiplier: 2,
            infinite: false,
        })

        lenisRef.current = lenis

        // Animation frame loop
        function raf(time: number) {
            lenis.raf(time)
            requestAnimationFrame(raf)
        }

        requestAnimationFrame(raf)

        // Add lenis class to html
        document.documentElement.classList.add('lenis', 'lenis-smooth')

        // Cleanup
        return () => {
            lenis.destroy()
            document.documentElement.classList.remove('lenis', 'lenis-smooth')
        }
    }, [])

    return (
        <SmoothScrollContext.Provider value={{ lenis: lenisRef.current }}>
            {children}
        </SmoothScrollContext.Provider>
    )
}

// Hook to scroll to specific position
export function useScrollTo() {
    const { lenis } = useSmoothScroll()

    const scrollTo = (
        target: string | HTMLElement | number,
        options?: {
            offset?: number
            immediate?: boolean
            duration?: number
        }
    ) => {
        if (lenis) {
            lenis.scrollTo(target, {
                offset: options?.offset ?? 0,
                immediate: options?.immediate ?? false,
                duration: options?.duration ?? 1.2,
            })
        }
    }

    return scrollTo
}

// Hook to get scroll progress
export function useScrollProgress() {
    const { lenis } = useSmoothScroll()

    const getScrollProgress = (): number => {
        if (!lenis) return 0
        return lenis.progress
    }

    return getScrollProgress
}
