'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { motion, useSpring, useMotionValue } from 'framer-motion'
import { lerp, isTouchDevice } from '@/lib/utils'

interface CursorState {
    isHovering: boolean
    isClicking: boolean
    text: string
    scale: number
}

export function CustomCursor() {
    const [isVisible, setIsVisible] = useState(false)
    const [cursorState, setCursorState] = useState<CursorState>({
        isHovering: false,
        isClicking: false,
        text: '',
        scale: 1,
    })

    const cursorRef = useRef<HTMLDivElement>(null)
    const cursorDotRef = useRef<HTMLDivElement>(null)
    const requestRef = useRef<number>()

    // Use motion values for smooth interpolation
    const cursorX = useMotionValue(0)
    const cursorY = useMotionValue(0)

    // Spring physics for smooth following
    const springConfig = { damping: 25, stiffness: 400, mass: 0.5 }
    const cursorXSpring = useSpring(cursorX, springConfig)
    const cursorYSpring = useSpring(cursorY, springConfig)

    // Mouse position tracking (raw)
    const mousePos = useRef({ x: 0, y: 0 })
    const currentPos = useRef({ x: 0, y: 0 })

    const handleMouseMove = useCallback((e: MouseEvent) => {
        mousePos.current = { x: e.clientX, y: e.clientY }
        cursorX.set(e.clientX)
        cursorY.set(e.clientY)

        if (!isVisible) setIsVisible(true)
    }, [cursorX, cursorY, isVisible])

    const handleMouseEnter = useCallback(() => {
        setIsVisible(true)
    }, [])

    const handleMouseLeave = useCallback(() => {
        setIsVisible(false)
    }, [])

    const handleMouseDown = useCallback(() => {
        setCursorState(prev => ({ ...prev, isClicking: true }))
    }, [])

    const handleMouseUp = useCallback(() => {
        setCursorState(prev => ({ ...prev, isClicking: false }))
    }, [])

    // Animation loop for smooth cursor movement (lerp-based for outer ring)
    useEffect(() => {
        if (isTouchDevice()) return

        const animate = () => {
            currentPos.current.x = lerp(currentPos.current.x, mousePos.current.x, 0.15)
            currentPos.current.y = lerp(currentPos.current.y, mousePos.current.y, 0.15)

            if (cursorRef.current) {
                cursorRef.current.style.transform =
                    `translate3d(${currentPos.current.x}px, ${currentPos.current.y}px, 0)`
            }

            requestRef.current = requestAnimationFrame(animate)
        }

        requestRef.current = requestAnimationFrame(animate)

        return () => {
            if (requestRef.current) {
                cancelAnimationFrame(requestRef.current)
            }
        }
    }, [])

    // Set up hover detection for interactive elements
    useEffect(() => {
        if (isTouchDevice()) return

        const handleElementMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement

            // Check for data attributes
            const cursorText = target.closest('[data-cursor-text]') as HTMLElement | null
            const cursorScale = target.closest('[data-cursor-scale]') as HTMLElement | null
            const isClickable = target.closest('a, button, [role="button"], input, textarea, select, [data-cursor-hover]')

            if (cursorText) {
                setCursorState(prev => ({
                    ...prev,
                    isHovering: true,
                    text: cursorText.getAttribute('data-cursor-text') || '',
                    scale: 3,
                }))
            } else if (cursorScale) {
                setCursorState(prev => ({
                    ...prev,
                    isHovering: true,
                    scale: parseFloat(cursorScale.getAttribute('data-cursor-scale') || '1.5'),
                }))
            } else if (isClickable) {
                setCursorState(prev => ({
                    ...prev,
                    isHovering: true,
                    scale: 1.5,
                }))
            }
        }

        const handleElementMouseOut = (e: MouseEvent) => {
            const target = e.target as HTMLElement
            const relatedTarget = e.relatedTarget as HTMLElement | null

            // Check if we're leaving an interactive element
            const wasInteractive = target.closest('a, button, [role="button"], input, textarea, select, [data-cursor-hover], [data-cursor-text], [data-cursor-scale]')
            const isStillInteractive = relatedTarget?.closest('a, button, [role="button"], input, textarea, select, [data-cursor-hover], [data-cursor-text], [data-cursor-scale]')

            if (wasInteractive && !isStillInteractive) {
                setCursorState(prev => ({
                    ...prev,
                    isHovering: false,
                    text: '',
                    scale: 1,
                }))
            }
        }

        document.addEventListener('mousemove', handleMouseMove)
        document.addEventListener('mouseenter', handleMouseEnter)
        document.addEventListener('mouseleave', handleMouseLeave)
        document.addEventListener('mousedown', handleMouseDown)
        document.addEventListener('mouseup', handleMouseUp)
        document.addEventListener('mouseover', handleElementMouseOver)
        document.addEventListener('mouseout', handleElementMouseOut)

        // Hide default cursor on body
        document.body.style.cursor = 'none'

        return () => {
            document.removeEventListener('mousemove', handleMouseMove)
            document.removeEventListener('mouseenter', handleMouseEnter)
            document.removeEventListener('mouseleave', handleMouseLeave)
            document.removeEventListener('mousedown', handleMouseDown)
            document.removeEventListener('mouseup', handleMouseUp)
            document.removeEventListener('mouseover', handleElementMouseOver)
            document.removeEventListener('mouseout', handleElementMouseOut)
            document.body.style.cursor = 'auto'
        }
    }, [handleMouseMove, handleMouseEnter, handleMouseLeave, handleMouseDown, handleMouseUp])

    // Don't render on touch devices
    if (typeof window !== 'undefined' && isTouchDevice()) {
        return null
    }

    return (
        <>
            {/* Outer ring (lerp-based, slower) */}
            <div
                ref={cursorRef}
                className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
                style={{
                    opacity: isVisible ? 1 : 0,
                    transition: 'opacity 0.3s ease',
                }}
            >
                <motion.div
                    className="relative flex items-center justify-center"
                    style={{
                        width: cursorState.isHovering ? 60 * cursorState.scale : 40,
                        height: cursorState.isHovering ? 60 * cursorState.scale : 40,
                        marginLeft: cursorState.isHovering ? -30 * cursorState.scale : -20,
                        marginTop: cursorState.isHovering ? -30 * cursorState.scale : -20,
                    }}
                    animate={{
                        scale: cursorState.isClicking ? 0.8 : 1,
                    }}
                    transition={{
                        type: 'spring',
                        stiffness: 400,
                        damping: 25,
                    }}
                >
                    <div
                        className="absolute inset-0 rounded-full border-2 border-white transition-all duration-300 ease-out"
                        style={{
                            opacity: cursorState.isHovering ? 0.5 : 0.3,
                        }}
                    />
                    {cursorState.text && (
                        <span className="text-white text-xs font-medium whitespace-nowrap">
                            {cursorState.text}
                        </span>
                    )}
                </motion.div>
            </div>

            {/* Inner dot (spring-based, faster) */}
            <motion.div
                ref={cursorDotRef}
                className="fixed top-0 left-0 pointer-events-none z-[10000] mix-blend-difference"
                style={{
                    x: cursorXSpring,
                    y: cursorYSpring,
                    opacity: isVisible ? 1 : 0,
                }}
            >
                <motion.div
                    className="w-2 h-2 -ml-1 -mt-1 rounded-full bg-white"
                    animate={{
                        scale: cursorState.isHovering ? 0 : cursorState.isClicking ? 0.5 : 1,
                    }}
                    transition={{
                        type: 'spring',
                        stiffness: 400,
                        damping: 25,
                    }}
                />
            </motion.div>
        </>
    )
}
