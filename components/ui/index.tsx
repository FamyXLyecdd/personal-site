'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

// ========================================
// BADGE / PILL
// ========================================

interface BadgeProps {
    children: React.ReactNode
    variant?: 'default' | 'primary' | 'secondary' | 'outline' | 'success' | 'warning' | 'error'
    size?: 'sm' | 'md' | 'lg'
    className?: string
    icon?: React.ReactNode
}

const badgeVariants = {
    default: 'bg-white/70 backdrop-blur-lg border-black/[0.08] text-muted',
    primary: 'bg-accent-primary/10 border-accent-primary/20 text-accent-primary',
    secondary: 'bg-accent-secondary/10 border-accent-secondary/20 text-accent-secondary',
    outline: 'bg-transparent border-black/[0.15] text-foreground',
    success: 'bg-green-500/10 border-green-500/20 text-green-500',
    warning: 'bg-yellow-500/10 border-yellow-500/20 text-yellow-500',
    error: 'bg-red-500/10 border-red-500/20 text-red-500',
}

const badgeSizes = {
    sm: 'px-2.5 py-1 text-xs',
    md: 'px-3 py-1.5 text-sm',
    lg: 'px-4 py-2 text-base',
}

export function Badge({
    children,
    variant = 'default',
    size = 'sm',
    className,
    icon,
}: BadgeProps) {
    return (
        <span
            className={cn(
                'inline-flex items-center gap-1.5 rounded-full border font-medium',
                'transition-all duration-200',
                badgeVariants[variant],
                badgeSizes[size],
                className
            )}
        >
            {icon}
            {children}
        </span>
    )
}

// ========================================
// TECH PILL (for showing technologies)
// ========================================

interface TechPillProps {
    name: string
    icon?: React.ReactNode
    className?: string
}

export function TechPill({ name, icon, className }: TechPillProps) {
    return (
        <motion.span
            className={cn(
                'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full',
                'bg-white/70 backdrop-blur-lg border border-black/[0.08]',
                'text-xs font-medium text-muted',
                'transition-all duration-200 hover:bg-white/90 hover:text-foreground',
                className
            )}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
        >
            {icon}
            {name}
        </motion.span>
    )
}

// ========================================
// SKELETON LOADERS
// ========================================

interface SkeletonProps {
    className?: string
    rounded?: 'sm' | 'md' | 'lg' | 'full'
}

const roundedClasses = {
    sm: 'rounded',
    md: 'rounded-lg',
    lg: 'rounded-2xl',
    full: 'rounded-full',
}

export function Skeleton({ className, rounded = 'md' }: SkeletonProps) {
    return (
        <div
            className={cn(
                'skeleton animate-pulse bg-black/[0.06]',
                roundedClasses[rounded],
                className
            )}
        />
    )
}

export function SkeletonText({ lines = 3, className }: { lines?: number; className?: string }) {
    return (
        <div className={cn('space-y-3', className)}>
            {Array.from({ length: lines }).map((_, i) => (
                <Skeleton
                    key={i}
                    className={cn('h-4', i === lines - 1 && 'w-3/4')}
                />
            ))}
        </div>
    )
}

export function SkeletonCard({ className }: { className?: string }) {
    return (
        <div className={cn('p-6 glass-card', className)}>
            <Skeleton className="w-full h-40 mb-4" rounded="lg" />
            <Skeleton className="w-3/4 h-6 mb-2" />
            <Skeleton className="w-1/2 h-4" />
        </div>
    )
}

// ========================================
// STAR RATING
// ========================================

interface StarRatingProps {
    rating: number
    max?: number
    size?: 'sm' | 'md' | 'lg'
    animated?: boolean
}

const starSizes = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
}

export function StarRating({ rating, max = 5, size = 'md', animated = true }: StarRatingProps) {
    return (
        <div className="flex gap-0.5" role="img" aria-label={`${rating} out of ${max} stars`}>
            {Array.from({ length: max }).map((_, i) => (
                <motion.svg
                    key={i}
                    className={cn(starSizes[size], 'text-amber-400')}
                    fill={i < rating ? 'currentColor' : 'none'}
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                    initial={animated ? { opacity: 0, scale: 0 } : false}
                    animate={animated ? { opacity: 1, scale: 1 } : false}
                    transition={{ delay: i * 0.1, type: 'spring', stiffness: 400 }}
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                    />
                </motion.svg>
            ))}
        </div>
    )
}

// ========================================
// PULSE DOT (Available indicator)
// ========================================

interface PulseDotProps {
    color?: 'green' | 'red' | 'yellow' | 'blue'
    size?: 'sm' | 'md' | 'lg'
}

const dotColors = {
    green: 'bg-green-500 border-green-500',
    red: 'bg-red-500 border-red-500',
    yellow: 'bg-yellow-500 border-yellow-500',
    blue: 'bg-blue-500 border-blue-500',
}

const dotSizes = {
    sm: 'w-2 h-2',
    md: 'w-2.5 h-2.5',
    lg: 'w-3 h-3',
}

export function PulseDot({ color = 'green', size = 'md' }: PulseDotProps) {
    return (
        <span className="relative inline-flex">
            <span
                className={cn(
                    'rounded-full',
                    dotColors[color],
                    dotSizes[size]
                )}
            />
            <span
                className={cn(
                    'absolute inset-0 rounded-full animate-ping opacity-75',
                    dotColors[color].split(' ')[0]
                )}
            />
        </span>
    )
}

// ========================================
// DIVIDER
// ========================================

interface DividerProps {
    className?: string
    orientation?: 'horizontal' | 'vertical'
}

export function Divider({ className, orientation = 'horizontal' }: DividerProps) {
    return (
        <div
            className={cn(
                'bg-black/[0.08]',
                orientation === 'horizontal' ? 'h-px w-full' : 'w-px h-full',
                className
            )}
            role="separator"
            aria-orientation={orientation}
        />
    )
}

// ========================================
// AVATAR
// ========================================

interface AvatarProps {
    src?: string
    alt: string
    fallback?: string
    size?: 'sm' | 'md' | 'lg' | 'xl'
    className?: string
}

const avatarSizes = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-12 h-12 text-base',
    xl: 'w-16 h-16 text-lg',
}

export function Avatar({ src, alt, fallback, size = 'md', className }: AvatarProps) {
    const initials = fallback || alt.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()

    return (
        <div
            className={cn(
                'relative rounded-full overflow-hidden',
                'bg-gradient-to-br from-accent-primary to-accent-secondary',
                'flex items-center justify-center font-medium text-white',
                avatarSizes[size],
                className
            )}
        >
            {src ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                    src={src}
                    alt={alt}
                    className="w-full h-full object-cover"
                />
            ) : (
                <span>{initials}</span>
            )}
        </div>
    )
}

// ========================================
// PROGRESS BAR
// ========================================

interface ProgressBarProps {
    value: number
    max?: number
    className?: string
    showLabel?: boolean
}

export function ProgressBar({ value, max = 100, className, showLabel = false }: ProgressBarProps) {
    const percentage = Math.min(100, Math.max(0, (value / max) * 100))

    return (
        <div className={cn('w-full', className)}>
            <div className="h-2 rounded-full bg-black/[0.06] overflow-hidden">
                <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-accent-primary to-accent-secondary"
                    initial={{ width: 0 }}
                    animate={{ width: `${percentage}%` }}
                    transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                />
            </div>
            {showLabel && (
                <p className="mt-1 text-xs text-muted text-right">{Math.round(percentage)}%</p>
            )}
        </div>
    )
}
