'use client'

import { forwardRef, ReactNode, useRef, useState, useCallback, MouseEvent } from 'react'
import { motion, HTMLMotionProps } from 'framer-motion'
import { cn, lerp } from '@/lib/utils'
import { buttonVariants as motionVariants } from '@/lib/animations'

// ========================================
// BUTTON VARIANTS
// ========================================

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'outline'
type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
    children: ReactNode
    variant?: ButtonVariant
    size?: ButtonSize
    magnetic?: boolean
    ripple?: boolean
    loading?: boolean
    icon?: ReactNode
    iconPosition?: 'left' | 'right'
    fullWidth?: boolean
}

const variantClasses: Record<ButtonVariant, string> = {
    primary: `
    bg-gradient-to-r from-accent-primary to-accent-secondary text-white
    shadow-lg shadow-accent-primary/25
    hover:shadow-xl hover:shadow-accent-primary/30
  `,
    secondary: `
    bg-white/70 backdrop-blur-lg text-foreground
    border border-black/[0.08]
    hover:bg-white/90
  `,
    ghost: `
    bg-transparent text-foreground
    hover:bg-black/5
  `,
    outline: `
    bg-transparent border-2 border-accent-primary text-accent-primary
    hover:bg-accent-primary/10
  `,
}

const sizeClasses: Record<ButtonSize, string> = {
    sm: 'px-4 py-2 text-sm gap-1.5',
    md: 'px-6 py-3 text-base gap-2',
    lg: 'px-8 py-4 text-lg gap-2.5',
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    (
        {
            children,
            variant = 'primary',
            size = 'md',
            magnetic = true,
            ripple = true,
            loading = false,
            icon,
            iconPosition = 'right',
            fullWidth = false,
            className,
            onClick,
            disabled,
            ...props
        },
        ref
    ) => {
        const buttonRef = useRef<HTMLButtonElement>(null)
        const [magneticPos, setMagneticPos] = useState({ x: 0, y: 0 })
        const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([])

        // Magnetic effect
        const handleMouseMove = useCallback(
            (e: MouseEvent<HTMLButtonElement>) => {
                if (!magnetic || disabled || !buttonRef.current) return

                const rect = buttonRef.current.getBoundingClientRect()
                const centerX = rect.left + rect.width / 2
                const centerY = rect.top + rect.height / 2

                const deltaX = e.clientX - centerX
                const deltaY = e.clientY - centerY

                // Limit the magnetic pull
                const maxMove = 8
                const x = lerp(0, deltaX * 0.2, 1)
                const y = lerp(0, deltaY * 0.2, 1)

                setMagneticPos({
                    x: Math.max(-maxMove, Math.min(maxMove, x)),
                    y: Math.max(-maxMove, Math.min(maxMove, y)),
                })
            },
            [magnetic, disabled]
        )

        const handleMouseLeave = useCallback(() => {
            setMagneticPos({ x: 0, y: 0 })
        }, [])

        // Ripple effect
        const handleClick = useCallback(
            (e: MouseEvent<HTMLButtonElement>) => {
                if (ripple && buttonRef.current && !disabled) {
                    const rect = buttonRef.current.getBoundingClientRect()
                    const x = e.clientX - rect.left
                    const y = e.clientY - rect.top
                    const id = Date.now()

                    setRipples((prev) => [...prev, { id, x, y }])

                    // Remove ripple after animation
                    setTimeout(() => {
                        setRipples((prev) => prev.filter((r) => r.id !== id))
                    }, 600)
                }

                onClick?.(e)
            },
            [ripple, onClick, disabled]
        )

        const combinedRef = (node: HTMLButtonElement) => {
            ; (buttonRef as React.MutableRefObject<HTMLButtonElement | null>).current = node
            if (typeof ref === 'function') {
                ref(node)
            } else if (ref) {
                ref.current = node
            }
        }

        return (
            <motion.button
                ref={combinedRef}
                className={cn(
                    'relative inline-flex items-center justify-center font-medium rounded-full',
                    'transition-all duration-300 ease-out',
                    'overflow-hidden will-change-transform',
                    'disabled:opacity-50 disabled:pointer-events-none',
                    variantClasses[variant],
                    sizeClasses[size],
                    fullWidth && 'w-full',
                    className
                )}
                variants={motionVariants}
                initial="rest"
                whileHover="hover"
                whileTap="tap"
                onClick={handleClick}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                disabled={disabled || loading}
                style={{
                    x: magneticPos.x,
                    y: magneticPos.y,
                }}
                {...props}
            >
                {/* Shimmer overlay for primary */}
                {variant === 'primary' && (
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                )}

                {/* Ripple effects */}
                {ripples.map((r) => (
                    <span
                        key={r.id}
                        className="ripple-circle"
                        style={{
                            left: r.x,
                            top: r.y,
                            width: 20,
                            height: 20,
                            marginLeft: -10,
                            marginTop: -10,
                        }}
                    />
                ))}

                {/* Content */}
                <span className="relative z-10 flex items-center gap-inherit">
                    {loading ? (
                        <span className="spinner w-5 h-5" />
                    ) : (
                        <>
                            {icon && iconPosition === 'left' && icon}
                            {children}
                            {icon && iconPosition === 'right' && icon}
                        </>
                    )}
                </span>
            </motion.button>
        )
    }
)

Button.displayName = 'Button'

// ========================================
// ICON BUTTON
// ========================================

interface IconButtonProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
    icon: ReactNode
    size?: ButtonSize
    variant?: ButtonVariant
    label: string // Required for accessibility
}

const iconSizeClasses: Record<ButtonSize, string> = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
    ({ icon, size = 'md', variant = 'ghost', label, className, ...props }, ref) => {
        return (
            <motion.button
                ref={ref}
                className={cn(
                    'inline-flex items-center justify-center rounded-full',
                    'transition-all duration-300 ease-out',
                    variantClasses[variant],
                    iconSizeClasses[size],
                    className
                )}
                variants={motionVariants}
                initial="rest"
                whileHover="hover"
                whileTap="tap"
                aria-label={label}
                {...props}
            >
                {icon}
            </motion.button>
        )
    }
)

IconButton.displayName = 'IconButton'

// ========================================
// LINK BUTTON (styled as button but semantic link)
// ========================================

interface LinkButtonProps extends Omit<HTMLMotionProps<'a'>, 'children'> {
    children: ReactNode
    variant?: ButtonVariant
    size?: ButtonSize
    icon?: ReactNode
    iconPosition?: 'left' | 'right'
}

export const LinkButton = forwardRef<HTMLAnchorElement, LinkButtonProps>(
    (
        {
            children,
            variant = 'primary',
            size = 'md',
            icon,
            iconPosition = 'right',
            className,
            ...props
        },
        ref
    ) => {
        return (
            <motion.a
                ref={ref}
                className={cn(
                    'relative inline-flex items-center justify-center font-medium rounded-full',
                    'transition-all duration-300 ease-out cursor-pointer',
                    variantClasses[variant],
                    sizeClasses[size],
                    className
                )}
                variants={motionVariants}
                initial="rest"
                whileHover="hover"
                whileTap="tap"
                {...props}
            >
                {icon && iconPosition === 'left' && icon}
                {children}
                {icon && iconPosition === 'right' && icon}
            </motion.a>
        )
    }
)

LinkButton.displayName = 'LinkButton'
