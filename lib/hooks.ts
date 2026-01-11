'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { lerp, debounce, throttle, isTouchDevice, prefersReducedMotion } from './utils'

// ========================================
// USE WINDOW SIZE
// ========================================

interface WindowSize {
    width: number
    height: number
}

export function useWindowSize(): WindowSize {
    const [windowSize, setWindowSize] = useState<WindowSize>({
        width: typeof window !== 'undefined' ? window.innerWidth : 0,
        height: typeof window !== 'undefined' ? window.innerHeight : 0,
    })

    useEffect(() => {
        const handleResize = debounce(() => {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            })
        }, 100)

        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    return windowSize
}

// ========================================
// USE SCROLL POSITION
// ========================================

interface ScrollPosition {
    x: number
    y: number
    direction: 'up' | 'down' | null
    progress: number
}

export function useScrollPosition(): ScrollPosition {
    const [scrollPosition, setScrollPosition] = useState<ScrollPosition>({
        x: 0,
        y: 0,
        direction: null,
        progress: 0,
    })
    const lastY = useRef(0)

    useEffect(() => {
        const handleScroll = throttle(() => {
            const y = window.scrollY
            const x = window.scrollX
            const direction = y > lastY.current ? 'down' : y < lastY.current ? 'up' : null
            const docHeight = document.documentElement.scrollHeight - window.innerHeight
            const progress = docHeight > 0 ? y / docHeight : 0

            setScrollPosition({ x, y, direction, progress })
            lastY.current = y
        }, 16)

        window.addEventListener('scroll', handleScroll, { passive: true })
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return scrollPosition
}

// ========================================
// USE MOUSE POSITION
// ========================================

interface MousePosition {
    x: number
    y: number
    normalizedX: number // -1 to 1
    normalizedY: number // -1 to 1
}

export function useMousePosition(): MousePosition {
    const [mousePosition, setMousePosition] = useState<MousePosition>({
        x: 0,
        y: 0,
        normalizedX: 0,
        normalizedY: 0,
    })

    useEffect(() => {
        if (isTouchDevice()) return

        const handleMouseMove = throttle((e: MouseEvent) => {
            const x = e.clientX
            const y = e.clientY
            const normalizedX = (x / window.innerWidth) * 2 - 1
            const normalizedY = (y / window.innerHeight) * 2 - 1

            setMousePosition({ x, y, normalizedX, normalizedY })
        }, 16)

        window.addEventListener('mousemove', handleMouseMove)
        return () => window.removeEventListener('mousemove', handleMouseMove)
    }, [])

    return mousePosition
}

// ========================================
// USE INTERSECTION OBSERVER
// ========================================

interface UseIntersectionOptions {
    threshold?: number | number[]
    rootMargin?: string
    triggerOnce?: boolean
}

export function useIntersection<T extends HTMLElement>(
    options: UseIntersectionOptions = {}
): [React.RefObject<T>, boolean] {
    const { threshold = 0, rootMargin = '0px', triggerOnce = false } = options
    const ref = useRef<T>(null)
    const [isIntersecting, setIsIntersecting] = useState(false)

    useEffect(() => {
        const element = ref.current
        if (!element) return

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsIntersecting(true)
                    if (triggerOnce) {
                        observer.unobserve(element)
                    }
                } else if (!triggerOnce) {
                    setIsIntersecting(false)
                }
            },
            { threshold, rootMargin }
        )

        observer.observe(element)
        return () => observer.disconnect()
    }, [threshold, rootMargin, triggerOnce])

    return [ref, isIntersecting]
}

// ========================================
// USE MEDIA QUERY
// ========================================

export function useMediaQuery(query: string): boolean {
    const [matches, setMatches] = useState(false)

    useEffect(() => {
        const mediaQuery = window.matchMedia(query)
        setMatches(mediaQuery.matches)

        const handler = (e: MediaQueryListEvent) => setMatches(e.matches)
        mediaQuery.addEventListener('change', handler)
        return () => mediaQuery.removeEventListener('change', handler)
    }, [query])

    return matches
}

// Preset media queries
export function useIsMobile(): boolean {
    return useMediaQuery('(max-width: 768px)')
}

export function useIsTablet(): boolean {
    return useMediaQuery('(min-width: 769px) and (max-width: 1024px)')
}

export function useIsDesktop(): boolean {
    return useMediaQuery('(min-width: 1025px)')
}

export function usePrefersReducedMotion(): boolean {
    return useMediaQuery('(prefers-reduced-motion: reduce)')
}

export function usePrefersDarkMode(): boolean {
    return useMediaQuery('(prefers-color-scheme: dark)')
}

// ========================================
// USE LOCAL STORAGE
// ========================================

export function useLocalStorage<T>(
    key: string,
    initialValue: T
): [T, (value: T | ((prev: T) => T)) => void] {
    const [storedValue, setStoredValue] = useState<T>(() => {
        if (typeof window === 'undefined') {
            return initialValue
        }
        try {
            const item = window.localStorage.getItem(key)
            return item ? JSON.parse(item) : initialValue
        } catch (error) {
            console.error('Error reading from localStorage:', error)
            return initialValue
        }
    })

    const setValue = useCallback(
        (value: T | ((prev: T) => T)) => {
            try {
                const valueToStore = value instanceof Function ? value(storedValue) : value
                setStoredValue(valueToStore)
                if (typeof window !== 'undefined') {
                    window.localStorage.setItem(key, JSON.stringify(valueToStore))
                }
            } catch (error) {
                console.error('Error writing to localStorage:', error)
            }
        },
        [key, storedValue]
    )

    return [storedValue, setValue]
}

// ========================================
// USE DEBOUNCED VALUE
// ========================================

export function useDebouncedValue<T>(value: T, delay: number): T {
    const [debouncedValue, setDebouncedValue] = useState(value)

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedValue(value)
        }, delay)

        return () => clearTimeout(timer)
    }, [value, delay])

    return debouncedValue
}

// ========================================
// USE COUNTDOWN
// ========================================

interface CountdownResult {
    days: number
    hours: number
    minutes: number
    seconds: number
    isComplete: boolean
}

export function useCountdown(targetDate: Date): CountdownResult {
    const [countdown, setCountdown] = useState<CountdownResult>({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        isComplete: false,
    })

    useEffect(() => {
        const calculateTimeLeft = () => {
            const now = new Date().getTime()
            const target = targetDate.getTime()
            const difference = target - now

            if (difference <= 0) {
                return { days: 0, hours: 0, minutes: 0, seconds: 0, isComplete: true }
            }

            return {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / (1000 * 60)) % 60),
                seconds: Math.floor((difference / 1000) % 60),
                isComplete: false,
            }
        }

        setCountdown(calculateTimeLeft())
        const timer = setInterval(() => {
            setCountdown(calculateTimeLeft())
        }, 1000)

        return () => clearInterval(timer)
    }, [targetDate])

    return countdown
}

// ========================================
// USE MOUNTED
// ========================================

export function useMounted(): boolean {
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    return mounted
}

// ========================================
// USE PREVIOUS
// ========================================

export function usePrevious<T>(value: T): T | undefined {
    const ref = useRef<T>()

    useEffect(() => {
        ref.current = value
    }, [value])

    return ref.current
}

// ========================================
// USE GYROSCOPE
// ========================================

interface GyroscopeData {
    alpha: number | null // rotation around z-axis
    beta: number | null  // rotation around x-axis
    gamma: number | null // rotation around y-axis
    supported: boolean
}

export function useGyroscope(): GyroscopeData {
    const [data, setData] = useState<GyroscopeData>({
        alpha: null,
        beta: null,
        gamma: null,
        supported: false,
    })

    useEffect(() => {
        if (typeof window === 'undefined') return

        const handleOrientation = (e: DeviceOrientationEvent) => {
            setData({
                alpha: e.alpha,
                beta: e.beta,
                gamma: e.gamma,
                supported: true,
            })
        }

        if ('DeviceOrientationEvent' in window) {
            window.addEventListener('deviceorientation', handleOrientation)
            return () => window.removeEventListener('deviceorientation', handleOrientation)
        }
    }, [])

    return data
}
