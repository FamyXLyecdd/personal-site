'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from 'framer-motion'
import { ChevronLeft, ChevronRight, Quote, Star, Pause, Play } from 'lucide-react'
import { GlassCard } from '@/components/ui/glass-card'
import { Avatar, StarRating } from '@/components/ui/index'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { testimonials, type Testimonial } from '@/lib/data'

// ========================================
// 3D CARD EFFECT
// ========================================

interface Card3DProps {
    children: React.ReactNode
    className?: string
}

function Card3D({ children, className }: Card3DProps) {
    const ref = useRef<HTMLDivElement>(null)
    const x = useMotionValue(0)
    const y = useMotionValue(0)

    const rotateX = useSpring(useTransform(y, [-100, 100], [10, -10]), { stiffness: 300, damping: 30 })
    const rotateY = useSpring(useTransform(x, [-100, 100], [-10, 10]), { stiffness: 300, damping: 30 })

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!ref.current) return
        const rect = ref.current.getBoundingClientRect()
        const centerX = rect.left + rect.width / 2
        const centerY = rect.top + rect.height / 2
        x.set(e.clientX - centerX)
        y.set(e.clientY - centerY)
    }

    const handleMouseLeave = () => {
        x.set(0)
        y.set(0)
    }

    return (
        <motion.div
            ref={ref}
            className={cn('perspective-1000', className)}
            style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            {children}
        </motion.div>
    )
}

// ========================================
// TESTIMONIAL CARD
// ========================================

interface TestimonialCardProps {
    testimonial: Testimonial
    className?: string
    featured?: boolean
}

function TestimonialCard({ testimonial, className, featured }: TestimonialCardProps) {
    return (
        <Card3D className={className}>
            <GlassCard
                className={cn(
                    'h-full transition-all',
                    featured && 'border-accent-primary/30 bg-gradient-to-br from-accent-primary/5 to-accent-secondary/5'
                )}
            >
                {/* Quote icon */}
                <div className="absolute top-4 right-4 text-accent-primary/20">
                    <Quote className="w-8 h-8" />
                </div>

                {/* Content */}
                <div className="space-y-4">
                    {/* Rating */}
                    <StarRating rating={testimonial.rating} size="sm" />

                    {/* Quote */}
                    <p className="text-muted leading-relaxed italic">
                        &ldquo;{testimonial.content}&rdquo;
                    </p>

                    {/* Author */}
                    <div className="flex items-center gap-3 pt-4 border-t border-black/[0.05]">
                        <Avatar
                            src={testimonial.avatar}
                            alt={testimonial.name}
                            fallback={testimonial.name.slice(0, 2).toUpperCase()}
                            size="md"
                        />
                        <div>
                            <h4 className="font-semibold text-sm">{testimonial.name}</h4>
                            <p className="text-xs text-muted">{testimonial.title}</p>
                            {testimonial.company && (
                                <p className="text-xs text-accent-primary">{testimonial.company}</p>
                            )}
                        </div>
                        {testimonial.flag && (
                            <span className="ml-auto text-xl">{testimonial.flag}</span>
                        )}
                    </div>
                </div>
            </GlassCard>
        </Card3D>
    )
}

// ========================================
// TESTIMONIALS CAROUSEL
// ========================================

interface TestimonialsCarouselProps {
    className?: string
    autoPlay?: boolean
    autoPlayInterval?: number
}

export function TestimonialsCarousel({
    className,
    autoPlay = true,
    autoPlayInterval = 5000,
}: TestimonialsCarouselProps) {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [isPlaying, setIsPlaying] = useState(autoPlay)
    const [direction, setDirection] = useState(0)

    const totalSlides = testimonials.length

    // Auto-play
    useEffect(() => {
        if (!isPlaying) return

        const timer = setInterval(() => {
            setDirection(1)
            setCurrentIndex((prev) => (prev + 1) % totalSlides)
        }, autoPlayInterval)

        return () => clearInterval(timer)
    }, [isPlaying, autoPlayInterval, totalSlides])

    const goTo = (index: number) => {
        setDirection(index > currentIndex ? 1 : -1)
        setCurrentIndex(index)
    }

    const goNext = () => {
        setDirection(1)
        setCurrentIndex((prev) => (prev + 1) % totalSlides)
    }

    const goPrev = () => {
        setDirection(-1)
        setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides)
    }

    const slideVariants = {
        enter: (direction: number) => ({
            x: direction > 0 ? 300 : -300,
            opacity: 0,
            scale: 0.9,
        }),
        center: {
            x: 0,
            opacity: 1,
            scale: 1,
        },
        exit: (direction: number) => ({
            x: direction > 0 ? -300 : 300,
            opacity: 0,
            scale: 0.9,
        }),
    }

    return (
        <div className={cn('relative', className)}>
            {/* Main carousel */}
            <div className="relative overflow-hidden">
                {/* Featured testimonial */}
                <div className="relative h-[300px] sm:h-[280px]">
                    <AnimatePresence mode="wait" custom={direction}>
                        <motion.div
                            key={currentIndex}
                            custom={direction}
                            variants={slideVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{
                                x: { type: 'spring', stiffness: 300, damping: 30 },
                                opacity: { duration: 0.2 },
                            }}
                            className="absolute inset-0"
                        >
                            <TestimonialCard
                                testimonial={testimonials[currentIndex]}
                                featured
                                className="h-full"
                            />
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Navigation arrows */}
                <motion.button
                    className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-white/80 backdrop-blur border border-black/[0.08] shadow-lg flex items-center justify-center hover:bg-white transition-colors z-10"
                    onClick={goPrev}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                >
                    <ChevronLeft className="w-5 h-5" />
                </motion.button>
                <motion.button
                    className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-10 h-10 rounded-full bg-white/80 backdrop-blur border border-black/[0.08] shadow-lg flex items-center justify-center hover:bg-white transition-colors z-10"
                    onClick={goNext}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                >
                    <ChevronRight className="w-5 h-5" />
                </motion.button>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-center gap-4 mt-6">
                {/* Play/Pause */}
                <motion.button
                    className="w-8 h-8 rounded-full bg-white/80 backdrop-blur border border-black/[0.08] flex items-center justify-center hover:bg-white transition-colors"
                    onClick={() => setIsPlaying(!isPlaying)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                >
                    {isPlaying ? (
                        <Pause className="w-3.5 h-3.5" />
                    ) : (
                        <Play className="w-3.5 h-3.5" />
                    )}
                </motion.button>

                {/* Dots */}
                <div className="flex gap-2">
                    {testimonials.map((_, index) => (
                        <motion.button
                            key={index}
                            className={cn(
                                'w-2 h-2 rounded-full transition-all',
                                index === currentIndex
                                    ? 'bg-accent-primary w-6'
                                    : 'bg-black/20 hover:bg-black/40'
                            )}
                            onClick={() => goTo(index)}
                            whileHover={{ scale: 1.2 }}
                            whileTap={{ scale: 0.9 }}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}

// ========================================
// TESTIMONIALS GRID
// ========================================

interface TestimonialsGridProps {
    className?: string
    limit?: number
}

export function TestimonialsGrid({ className, limit }: TestimonialsGridProps) {
    const displayTestimonials = limit ? testimonials.slice(0, limit) : testimonials

    return (
        <div className={cn('grid gap-6 sm:grid-cols-2 lg:grid-cols-3', className)}>
            {displayTestimonials.map((testimonial, index) => (
                <motion.div
                    key={testimonial.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                >
                    <TestimonialCard testimonial={testimonial} />
                </motion.div>
            ))}
        </div>
    )
}

// ========================================
// TESTIMONIALS MASONRY
// ========================================

interface TestimonialsMasonryProps {
    className?: string
}

export function TestimonialsMasonry({ className }: TestimonialsMasonryProps) {
    return (
        <div className={cn('columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6', className)}>
            {testimonials.map((testimonial, index) => (
                <motion.div
                    key={testimonial.id}
                    className="break-inside-avoid"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                >
                    <TestimonialCard testimonial={testimonial} />
                </motion.div>
            ))}
        </div>
    )
}

// ========================================
// TESTIMONIALS MARQUEE
// ========================================

interface TestimonialsMarqueeProps {
    className?: string
    speed?: number
}

export function TestimonialsMarquee({ className, speed = 30 }: TestimonialsMarqueeProps) {
    const duplicatedTestimonials = [...testimonials, ...testimonials]

    return (
        <div className={cn('overflow-hidden', className)}>
            <motion.div
                className="flex gap-6"
                animate={{ x: ['0%', '-50%'] }}
                transition={{
                    x: {
                        duration: speed,
                        repeat: Infinity,
                        ease: 'linear',
                    },
                }}
            >
                {duplicatedTestimonials.map((testimonial, index) => (
                    <div key={`${testimonial.id}-${index}`} className="flex-shrink-0 w-[350px]">
                        <TestimonialCard testimonial={testimonial} />
                    </div>
                ))}
            </motion.div>
        </div>
    )
}
