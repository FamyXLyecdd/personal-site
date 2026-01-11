'use client'

import { forwardRef, ReactNode } from 'react'
import { motion, HTMLMotionProps } from 'framer-motion'
import { cn } from '@/lib/utils'
import { cardHover, cardVariants } from '@/lib/animations'

interface GlassCardProps extends HTMLMotionProps<'div'> {
    children: ReactNode
    className?: string
    hover?: boolean
    padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl'
    variant?: 'default' | 'strong' | 'subtle'
    animated?: boolean
    delay?: number
}

const paddingClasses = {
    none: 'p-0',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
    xl: 'p-10',
}

const variantClasses = {
    default: 'bg-white/70 backdrop-blur-[24px] border border-black/[0.08] shadow-glass',
    strong: 'bg-white/85 backdrop-blur-[40px] border border-black/[0.08] shadow-glass',
    subtle: 'bg-white/50 backdrop-blur-[16px] border border-black/[0.05] shadow-glass',
}

export const GlassCard = forwardRef<HTMLDivElement, GlassCardProps>(
    (
        {
            children,
            className,
            hover = true,
            padding = 'lg',
            variant = 'default',
            animated = true,
            delay = 0,
            ...props
        },
        ref
    ) => {
        const baseClasses = cn(
            'rounded-3xl relative overflow-hidden will-change-transform',
            paddingClasses[padding],
            variantClasses[variant],
            className
        )

        if (!animated) {
            return (
                <div ref={ref} className={baseClasses}>
                    {children}
                </div>
            )
        }

        return (
            <motion.div
                ref={ref}
                className={baseClasses}
                variants={hover ? { ...cardVariants, ...cardHover } : cardVariants}
                initial="hidden"
                whileInView="visible"
                whileHover={hover ? 'hover' : undefined}
                viewport={{ once: true, margin: '-50px' }}
                transition={{
                    duration: 0.5,
                    delay,
                    ease: [0.25, 0.1, 0.25, 1],
                }}
                style={{
                    transform: 'translateZ(0)', // GPU acceleration
                }}
                {...props}
            >
                {children}
            </motion.div>
        )
    }
)

GlassCard.displayName = 'GlassCard'

// Bento-specific card variants with size presets
interface BentoCardProps extends GlassCardProps {
    size?: '1x1' | '1x2' | '2x1' | '2x2'
}

const sizeClasses = {
    '1x1': 'col-span-1 row-span-1',
    '1x2': 'col-span-1 row-span-2',
    '2x1': 'col-span-2 row-span-1 max-lg:col-span-1',
    '2x2': 'col-span-2 row-span-2 max-lg:col-span-1 max-lg:row-span-1',
}

export const BentoCard = forwardRef<HTMLDivElement, BentoCardProps>(
    ({ size = '1x1', className, ...props }, ref) => {
        return (
            <GlassCard
                ref={ref}
                className={cn(sizeClasses[size], className)}
                {...props}
            />
        )
    }
)

BentoCard.displayName = 'BentoCard'

// Featured card with gradient border option
interface FeaturedCardProps extends GlassCardProps {
    gradientBorder?: boolean
}

export const FeaturedCard = forwardRef<HTMLDivElement, FeaturedCardProps>(
    ({ gradientBorder = false, className, children, ...props }, ref) => {
        if (gradientBorder) {
            return (
                <div className="relative p-[1px] rounded-3xl bg-gradient-to-br from-accent-primary to-accent-secondary">
                    <GlassCard
                        ref={ref}
                        className={cn('bg-white/90', className)}
                        {...props}
                    >
                        {children}
                    </GlassCard>
                </div>
            )
        }

        return (
            <GlassCard ref={ref} className={className} {...props}>
                {children}
            </GlassCard>
        )
    }
)

FeaturedCard.displayName = 'FeaturedCard'
