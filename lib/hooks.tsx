'use client'

import { useState, useEffect, useRef, useMemo, useCallback } from 'react'
import { motion, AnimatePresence, useSpring, useMotionValue, useTransform } from 'framer-motion'

// ========================================
// CUSTOM HOOKS LIBRARY
// ========================================

/**
 * Hook to track mouse position
 */
export function useMousePosition() {
    const [position, setPosition] = useState({ x: 0, y: 0 })

    useEffect(() => {
        const updatePosition = (e: MouseEvent) => {
            setPosition({ x: e.clientX, y: e.clientY })
        }
        window.addEventListener('mousemove', updatePosition)
        return () => window.removeEventListener('mousemove', updatePosition)
    }, [])

    return position
}

/**
 * Hook for smooth spring-based mouse position
 */
export function useSmoothMousePosition(config = { stiffness: 150, damping: 15 }) {
    const mouseX = useMotionValue(0)
    const mouseY = useMotionValue(0)

    const smoothX = useSpring(mouseX, config)
    const smoothY = useSpring(mouseY, config)

    useEffect(() => {
        const updatePosition = (e: MouseEvent) => {
            mouseX.set(e.clientX)
            mouseY.set(e.clientY)
        }
        window.addEventListener('mousemove', updatePosition)
        return () => window.removeEventListener('mousemove', updatePosition)
    }, [mouseX, mouseY])

    return { x: smoothX, y: smoothY, rawX: mouseX, rawY: mouseY }
}

/**
 * Hook to track window size
 */
export function useWindowSize() {
    const [size, setSize] = useState({ width: 0, height: 0 })

    useEffect(() => {
        const updateSize = () => {
            setSize({ width: window.innerWidth, height: window.innerHeight })
        }
        updateSize()
        window.addEventListener('resize', updateSize)
        return () => window.removeEventListener('resize', updateSize)
    }, [])

    return size
}

/**
 * Hook to detect if element is in viewport
 */
export function useInView(options?: IntersectionObserverInit) {
    const ref = useRef<HTMLElement>(null)
    const [isInView, setIsInView] = useState(false)

    useEffect(() => {
        const element = ref.current
        if (!element) return

        const observer = new IntersectionObserver(([entry]) => {
            setIsInView(entry.isIntersecting)
        }, options)

        observer.observe(element)
        return () => observer.disconnect()
    }, [options])

    return { ref, isInView }
}

/**
 * Hook for detecting mobile devices
 */
export function useIsMobile(breakpoint = 768) {
    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < breakpoint)
        }
        checkMobile()
        window.addEventListener('resize', checkMobile)
        return () => window.removeEventListener('resize', checkMobile)
    }, [breakpoint])

    return isMobile
}

/**
 * Hook for detecting reduced motion preference
 */
export function useReducedMotion() {
    const [prefersReduced, setPrefersReduced] = useState(false)

    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
        setPrefersReduced(mediaQuery.matches)

        const handler = (e: MediaQueryListEvent) => setPrefersReduced(e.matches)
        mediaQuery.addEventListener('change', handler)
        return () => mediaQuery.removeEventListener('change', handler)
    }, [])

    return prefersReduced
}

/**
 * Hook for scroll position
 */
export function useScrollPosition() {
    const [position, setPosition] = useState({ x: 0, y: 0 })

    useEffect(() => {
        const updatePosition = () => {
            setPosition({ x: window.scrollX, y: window.scrollY })
        }
        updatePosition()
        window.addEventListener('scroll', updatePosition)
        return () => window.removeEventListener('scroll', updatePosition)
    }, [])

    return position
}

/**
 * Hook for scroll direction
 */
export function useScrollDirection() {
    const [direction, setDirection] = useState<'up' | 'down' | null>(null)
    const lastScrollY = useRef(0)

    useEffect(() => {
        const updateDirection = () => {
            const currentScrollY = window.scrollY
            if (currentScrollY > lastScrollY.current) {
                setDirection('down')
            } else if (currentScrollY < lastScrollY.current) {
                setDirection('up')
            }
            lastScrollY.current = currentScrollY
        }
        window.addEventListener('scroll', updateDirection)
        return () => window.removeEventListener('scroll', updateDirection)
    }, [])

    return direction
}

/**
 * Hook for local storage state
 */
export function useLocalStorage<T>(key: string, initialValue: T) {
    const [storedValue, setStoredValue] = useState<T>(() => {
        if (typeof window === 'undefined') return initialValue
        try {
            const item = window.localStorage.getItem(key)
            return item ? JSON.parse(item) : initialValue
        } catch (error) {
            console.error(`Error reading localStorage key "${key}":`, error)
            return initialValue
        }
    })

    const setValue = useCallback((value: T | ((val: T) => T)) => {
        try {
            const valueToStore = value instanceof Function ? value(storedValue) : value
            setStoredValue(valueToStore)
            if (typeof window !== 'undefined') {
                window.localStorage.setItem(key, JSON.stringify(valueToStore))
            }
        } catch (error) {
            console.error(`Error setting localStorage key "${key}":`, error)
        }
    }, [key, storedValue])

    return [storedValue, setValue] as const
}

/**
 * Hook for session storage state
 */
export function useSessionStorage<T>(key: string, initialValue: T) {
    const [storedValue, setStoredValue] = useState<T>(() => {
        if (typeof window === 'undefined') return initialValue
        try {
            const item = window.sessionStorage.getItem(key)
            return item ? JSON.parse(item) : initialValue
        } catch (error) {
            return initialValue
        }
    })

    const setValue = useCallback((value: T | ((val: T) => T)) => {
        const valueToStore = value instanceof Function ? value(storedValue) : value
        setStoredValue(valueToStore)
        if (typeof window !== 'undefined') {
            window.sessionStorage.setItem(key, JSON.stringify(valueToStore))
        }
    }, [key, storedValue])

    return [storedValue, setValue] as const
}

/**
 * Hook for debounced value
 */
export function useDebounce<T>(value: T, delay: number): T {
    const [debouncedValue, setDebouncedValue] = useState<T>(value)

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value)
        }, delay)

        return () => clearTimeout(handler)
    }, [value, delay])

    return debouncedValue
}

/**
 * Hook for throttled callback
 */
export function useThrottle<T extends (...args: any[]) => any>(
    callback: T,
    delay: number
): T {
    const lastRun = useRef(Date.now())

    const throttled = useCallback(
        (...args: Parameters<T>) => {
            if (Date.now() - lastRun.current >= delay) {
                callback(...args)
                lastRun.current = Date.now()
            }
        },
        [callback, delay]
    )

    return throttled as T
}

/**
 * Hook for previous value
 */
export function usePrevious<T>(value: T): T | undefined {
    const ref = useRef<T>()

    useEffect(() => {
        ref.current = value
    }, [value])

    return ref.current
}

/**
 * Hook for toggle state
 */
export function useToggle(initialValue = false) {
    const [value, setValue] = useState(initialValue)

    const toggle = useCallback(() => setValue(v => !v), [])
    const setTrue = useCallback(() => setValue(true), [])
    const setFalse = useCallback(() => setValue(false), [])

    return { value, toggle, setTrue, setFalse, setValue }
}

/**
 * Hook for counter
 */
export function useCounter(initialValue = 0, min = -Infinity, max = Infinity) {
    const [count, setCount] = useState(initialValue)

    const increment = useCallback(() => {
        setCount(c => Math.min(c + 1, max))
    }, [max])

    const decrement = useCallback(() => {
        setCount(c => Math.max(c - 1, min))
    }, [min])

    const reset = useCallback(() => {
        setCount(initialValue)
    }, [initialValue])

    const set = useCallback((value: number) => {
        setCount(Math.max(min, Math.min(value, max)))
    }, [min, max])

    return { count, increment, decrement, reset, set }
}

/**
 * Hook for detecting clicks outside element
 */
export function useClickOutside(callback: () => void) {
    const ref = useRef<HTMLElement>(null)

    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                callback()
            }
        }
        document.addEventListener('mousedown', handleClick)
        return () => document.removeEventListener('mousedown', handleClick)
    }, [callback])

    return ref
}

/**
 * Hook for keyboard shortcuts
 */
export function useKeyPress(targetKey: string, callback: () => void, options?: {
    ctrl?: boolean
    shift?: boolean
    alt?: boolean
    meta?: boolean
}) {
    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            if (e.key.toLowerCase() !== targetKey.toLowerCase()) return
            if (options?.ctrl && !e.ctrlKey) return
            if (options?.shift && !e.shiftKey) return
            if (options?.alt && !e.altKey) return
            if (options?.meta && !e.metaKey) return

            e.preventDefault()
            callback()
        }

        window.addEventListener('keydown', handler)
        return () => window.removeEventListener('keydown', handler)
    }, [targetKey, callback, options])
}

/**
 * Hook for document title
 */
export function useDocumentTitle(title: string) {
    useEffect(() => {
        const previousTitle = document.title
        document.title = title
        return () => {
            document.title = previousTitle
        }
    }, [title])
}

/**
 * Hook for element hover state
 */
export function useHover<T extends HTMLElement>() {
    const ref = useRef<T>(null)
    const [isHovered, setIsHovered] = useState(false)

    useEffect(() => {
        const element = ref.current
        if (!element) return

        const handleMouseEnter = () => setIsHovered(true)
        const handleMouseLeave = () => setIsHovered(false)

        element.addEventListener('mouseenter', handleMouseEnter)
        element.addEventListener('mouseleave', handleMouseLeave)

        return () => {
            element.removeEventListener('mouseenter', handleMouseEnter)
            element.removeEventListener('mouseleave', handleMouseLeave)
        }
    }, [])

    return { ref, isHovered }
}

/**
 * Hook for element focus state
 */
export function useFocus<T extends HTMLElement>() {
    const ref = useRef<T>(null)
    const [isFocused, setIsFocused] = useState(false)

    useEffect(() => {
        const element = ref.current
        if (!element) return

        const handleFocus = () => setIsFocused(true)
        const handleBlur = () => setIsFocused(false)

        element.addEventListener('focus', handleFocus)
        element.addEventListener('blur', handleBlur)

        return () => {
            element.removeEventListener('focus', handleFocus)
            element.removeEventListener('blur', handleBlur)
        }
    }, [])

    return { ref, isFocused }
}

/**
 * Hook for copy to clipboard
 */
export function useCopyToClipboard() {
    const [copied, setCopied] = useState(false)

    const copy = useCallback(async (text: string) => {
        try {
            await navigator.clipboard.writeText(text)
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
            return true
        } catch (error) {
            console.error('Failed to copy:', error)
            setCopied(false)
            return false
        }
    }, [])

    return { copied, copy }
}

/**
 * Hook for async operations
 */
export function useAsync<T>(
    asyncFunction: () => Promise<T>,
    immediate = true
) {
    const [status, setStatus] = useState<'idle' | 'pending' | 'success' | 'error'>('idle')
    const [data, setData] = useState<T | null>(null)
    const [error, setError] = useState<Error | null>(null)

    const execute = useCallback(async () => {
        setStatus('pending')
        setData(null)
        setError(null)

        try {
            const response = await asyncFunction()
            setData(response)
            setStatus('success')
            return response
        } catch (e) {
            setError(e instanceof Error ? e : new Error('Unknown error'))
            setStatus('error')
            throw e
        }
    }, [asyncFunction])

    useEffect(() => {
        if (immediate) {
            execute()
        }
    }, [execute, immediate])

    return { execute, status, data, error, isLoading: status === 'pending' }
}

/**
 * Hook for media query
 */
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

/**
 * Hook for interval
 */
export function useInterval(callback: () => void, delay: number | null) {
    const savedCallback = useRef(callback)

    useEffect(() => {
        savedCallback.current = callback
    }, [callback])

    useEffect(() => {
        if (delay === null) return

        const id = setInterval(() => savedCallback.current(), delay)
        return () => clearInterval(id)
    }, [delay])
}

/**
 * Hook for timeout
 */
export function useTimeout(callback: () => void, delay: number | null) {
    const savedCallback = useRef(callback)

    useEffect(() => {
        savedCallback.current = callback
    }, [callback])

    useEffect(() => {
        if (delay === null) return

        const id = setTimeout(() => savedCallback.current(), delay)
        return () => clearTimeout(id)
    }, [delay])
}

/**
 * Hook for element dimensions
 */
export function useElementSize<T extends HTMLElement>() {
    const ref = useRef<T>(null)
    const [size, setSize] = useState({ width: 0, height: 0 })

    useEffect(() => {
        const element = ref.current
        if (!element) return

        const resizeObserver = new ResizeObserver((entries) => {
            for (const entry of entries) {
                setSize({
                    width: entry.contentRect.width,
                    height: entry.contentRect.height,
                })
            }
        })

        resizeObserver.observe(element)
        return () => resizeObserver.disconnect()
    }, [])

    return { ref, ...size }
}

/**
 * Hook for online/offline status
 */
export function useOnlineStatus() {
    const [isOnline, setIsOnline] = useState(true)

    useEffect(() => {
        setIsOnline(navigator.onLine)

        const handleOnline = () => setIsOnline(true)
        const handleOffline = () => setIsOnline(false)

        window.addEventListener('online', handleOnline)
        window.addEventListener('offline', handleOffline)

        return () => {
            window.removeEventListener('online', handleOnline)
            window.removeEventListener('offline', handleOffline)
        }
    }, [])

    return isOnline
}

/**
 * Hook for page visibility
 */
export function usePageVisibility() {
    const [isVisible, setIsVisible] = useState(true)

    useEffect(() => {
        const handleVisibilityChange = () => {
            setIsVisible(document.visibilityState === 'visible')
        }
        document.addEventListener('visibilitychange', handleVisibilityChange)
        return () => document.removeEventListener('visibilitychange', handleVisibilityChange)
    }, [])

    return isVisible
}

/**
 * Hook for battery status
 */
export function useBattery() {
    const [battery, setBattery] = useState<{
        level: number
        charging: boolean
    } | null>(null)

    useEffect(() => {
        const getBattery = async () => {
            if ('getBattery' in navigator) {
                const batteryManager = await (navigator as any).getBattery()
                const updateBattery = () => {
                    setBattery({
                        level: batteryManager.level * 100,
                        charging: batteryManager.charging,
                    })
                }
                updateBattery()
                batteryManager.addEventListener('levelchange', updateBattery)
                batteryManager.addEventListener('chargingchange', updateBattery)
            }
        }
        getBattery()
    }, [])

    return battery
}

/**
 * Hook for geolocation
 */
export function useGeolocation() {
    const [location, setLocation] = useState<{
        latitude: number
        longitude: number
        accuracy: number
    } | null>(null)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        if (!navigator.geolocation) {
            setError('Geolocation is not supported')
            return
        }

        const success = (position: GeolocationPosition) => {
            setLocation({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                accuracy: position.coords.accuracy,
            })
        }

        const failure = (err: GeolocationPositionError) => {
            setError(err.message)
        }

        navigator.geolocation.getCurrentPosition(success, failure)
    }, [])

    return { location, error }
}

/**
 * Hook for idle detection
 */
export function useIdle(timeout = 30000) {
    const [isIdle, setIsIdle] = useState(false)
    const timeoutRef = useRef<NodeJS.Timeout>()

    useEffect(() => {
        const resetTimer = () => {
            setIsIdle(false)
            if (timeoutRef.current) clearTimeout(timeoutRef.current)
            timeoutRef.current = setTimeout(() => setIsIdle(true), timeout)
        }

        const events = ['mousedown', 'mousemove', 'keydown', 'scroll', 'touchstart']
        events.forEach(event => document.addEventListener(event, resetTimer))
        resetTimer()

        return () => {
            events.forEach(event => document.removeEventListener(event, resetTimer))
            if (timeoutRef.current) clearTimeout(timeoutRef.current)
        }
    }, [timeout])

    return isIdle
}
