'use client'

import { useState, useRef } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import {
    Play,
    Code,
    Copy,
    Check,
    ChevronDown,
    Sparkles,
    Zap,
    MousePointer,
    Eye,
    Layers,
    Box,
} from 'lucide-react'
import { GlassCard } from '@/components/ui/glass-card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/index'
import { cn, copyToClipboard } from '@/lib/utils'
import {
    stagger,
    fadeUp,
    fadeIn,
    scaleUp,
    slideIn,
    spring,
    smooth,
    bouncy,
} from '@/lib/animations'

// ========================================
// ANIMATION CATEGORIES
// ========================================

interface AnimationDemo {
    id: string
    name: string
    description: string
    category: string
    component: React.ReactNode
    code: string
    tags: string[]
}

const categories = [
    { id: 'entrance', name: 'Entrance', icon: <Sparkles className="w-4 h-4" /> },
    { id: 'hover', name: 'Hover', icon: <MousePointer className="w-4 h-4" /> },
    { id: 'scroll', name: 'Scroll', icon: <Layers className="w-4 h-4" /> },
    { id: 'transition', name: 'Transition', icon: <Zap className="w-4 h-4" /> },
    { id: '3d', name: '3D Effects', icon: <Box className="w-4 h-4" /> },
]

// ========================================
// ANIMATION DEMOS
// ========================================

const animations: AnimationDemo[] = [
    // Entrance animations
    {
        id: 'fade-up',
        name: 'Fade Up',
        description: 'Element fades in while moving up.',
        category: 'entrance',
        tags: ['opacity', 'transform', 'y'],
        component: (
            <motion.div
                key="fade-up"
                className="w-20 h-20 rounded-xl bg-gradient-to-br from-accent-primary to-accent-secondary"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            />
        ),
        code: `<motion.div
  initial={{ opacity: 0, y: 30 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
/>`,
    },
    {
        id: 'scale-up',
        name: 'Scale Up',
        description: 'Element scales from small to full size.',
        category: 'entrance',
        tags: ['scale', 'opacity'],
        component: (
            <motion.div
                key="scale-up"
                className="w-20 h-20 rounded-xl bg-gradient-to-br from-green-400 to-green-600"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: 'spring', stiffness: 400, damping: 20 }}
            />
        ),
        code: `<motion.div
  initial={{ opacity: 0, scale: 0 }}
  animate={{ opacity: 1, scale: 1 }}
  transition={{ type: 'spring', stiffness: 400, damping: 20 }}
/>`,
    },
    {
        id: 'slide-in',
        name: 'Slide In',
        description: 'Element slides in from the left.',
        category: 'entrance',
        tags: ['x', 'opacity'],
        component: (
            <motion.div
                key="slide-in"
                className="w-20 h-20 rounded-xl bg-gradient-to-br from-purple-400 to-purple-600"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4 }}
            />
        ),
        code: `<motion.div
  initial={{ opacity: 0, x: -50 }}
  animate={{ opacity: 1, x: 0 }}
  transition={{ duration: 0.4 }}
/>`,
    },
    {
        id: 'rotate-in',
        name: 'Rotate In',
        description: 'Element rotates while fading in.',
        category: 'entrance',
        tags: ['rotate', 'scale', 'opacity'],
        component: (
            <motion.div
                key="rotate-in"
                className="w-20 h-20 rounded-xl bg-gradient-to-br from-yellow-400 to-orange-500"
                initial={{ opacity: 0, rotate: -180, scale: 0 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                transition={{ type: 'spring', stiffness: 200 }}
            />
        ),
        code: `<motion.div
  initial={{ opacity: 0, rotate: -180, scale: 0 }}
  animate={{ opacity: 1, rotate: 0, scale: 1 }}
  transition={{ type: 'spring', stiffness: 200 }}
/>`,
    },
    {
        id: 'stagger',
        name: 'Stagger Children',
        description: 'Children animate one after another.',
        category: 'entrance',
        tags: ['stagger', 'children'],
        component: (
            <motion.div
                key="stagger"
                className="flex gap-2"
                initial="hidden"
                animate="visible"
                variants={{
                    visible: { transition: { staggerChildren: 0.1 } },
                }}
            >
                {[0, 1, 2, 3].map((i) => (
                    <motion.div
                        key={i}
                        className="w-8 h-8 rounded-lg bg-gradient-to-br from-pink-400 to-red-500"
                        variants={{
                            hidden: { opacity: 0, y: 20 },
                            visible: { opacity: 1, y: 0 },
                        }}
                    />
                ))}
            </motion.div>
        ),
        code: `<motion.div
  initial="hidden"
  animate="visible"
  variants={{
    visible: { transition: { staggerChildren: 0.1 } },
  }}
>
  {items.map((item) => (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
      }}
    />
  ))}
</motion.div>`,
    },

    // Hover animations
    {
        id: 'hover-scale',
        name: 'Hover Scale',
        description: 'Element scales up on hover.',
        category: 'hover',
        tags: ['scale', 'hover'],
        component: (
            <motion.div
                key="hover-scale"
                className="w-20 h-20 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-500 cursor-pointer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
            />
        ),
        code: `<motion.div
  whileHover={{ scale: 1.1 }}
  whileTap={{ scale: 0.95 }}
/>`,
    },
    {
        id: 'hover-rotate',
        name: 'Hover Rotate',
        description: 'Element rotates on hover.',
        category: 'hover',
        tags: ['rotate', 'hover'],
        component: (
            <motion.div
                key="hover-rotate"
                className="w-20 h-20 rounded-xl bg-gradient-to-br from-indigo-400 to-indigo-600 cursor-pointer"
                whileHover={{ rotate: 15 }}
                transition={{ type: 'spring', stiffness: 300 }}
            />
        ),
        code: `<motion.div
  whileHover={{ rotate: 15 }}
  transition={{ type: 'spring', stiffness: 300 }}
/>`,
    },
    {
        id: 'hover-glow',
        name: 'Hover Glow',
        description: 'Element glows on hover.',
        category: 'hover',
        tags: ['shadow', 'hover'],
        component: (
            <motion.div
                key="hover-glow"
                className="w-20 h-20 rounded-xl bg-gradient-to-br from-accent-primary to-accent-secondary cursor-pointer"
                whileHover={{
                    boxShadow: '0 0 30px rgba(0, 102, 255, 0.6)',
                    scale: 1.05,
                }}
                transition={{ duration: 0.2 }}
            />
        ),
        code: `<motion.div
  whileHover={{ 
    boxShadow: '0 0 30px rgba(0, 102, 255, 0.6)',
    scale: 1.05,
  }}
/>`,
    },
    {
        id: 'hover-float',
        name: 'Hover Float',
        description: 'Element floats up on hover.',
        category: 'hover',
        tags: ['y', 'shadow', 'hover'],
        component: (
            <motion.div
                key="hover-float"
                className="w-20 h-20 rounded-xl bg-gradient-to-br from-teal-400 to-teal-600 cursor-pointer shadow-lg"
                whileHover={{
                    y: -10,
                    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)',
                }}
                transition={{ type: 'spring', stiffness: 400 }}
            />
        ),
        code: `<motion.div
  whileHover={{ 
    y: -10,
    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)',
  }}
  transition={{ type: 'spring', stiffness: 400 }}
/>`,
    },
    {
        id: 'magnetic',
        name: 'Magnetic Button',
        description: 'Button follows cursor position.',
        category: 'hover',
        tags: ['magnetic', 'cursor'],
        component: (
            <motion.button
                key="magnetic"
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-accent-primary to-accent-secondary text-white font-medium cursor-pointer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
                Hover me
            </motion.button>
        ),
        code: `// See components/ui/button.tsx for full magnetic implementation`,
    },

    // 3D Effects
    {
        id: 'flip-card',
        name: 'Flip Card',
        description: '3D card flip effect.',
        category: '3d',
        tags: ['rotateY', '3d', 'preserve-3d'],
        component: (
            <motion.div
                key="flip-card"
                className="w-20 h-20 cursor-pointer perspective-1000"
                whileHover="flipped"
                initial="unflipped"
            >
                <motion.div
                    className="w-full h-full relative"
                    style={{ transformStyle: 'preserve-3d' }}
                    variants={{
                        unflipped: { rotateY: 0 },
                        flipped: { rotateY: 180 },
                    }}
                    transition={{ duration: 0.6 }}
                >
                    <div
                        className="absolute inset-0 rounded-xl bg-gradient-to-br from-accent-primary to-accent-secondary flex items-center justify-center text-white"
                        style={{ backfaceVisibility: 'hidden' }}
                    >
                        Front
                    </div>
                    <div
                        className="absolute inset-0 rounded-xl bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center text-white"
                        style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
                    >
                        Back
                    </div>
                </motion.div>
            </motion.div>
        ),
        code: `<motion.div
  className="perspective-1000"
  whileHover="flipped"
>
  <motion.div
    style={{ transformStyle: 'preserve-3d' }}
    variants={{
      unflipped: { rotateY: 0 },
      flipped: { rotateY: 180 },
    }}
  >
    {/* Front and Back faces */}
  </motion.div>
</motion.div>`,
    },
    {
        id: 'tilt-card',
        name: 'Tilt Card',
        description: '3D tilt effect following cursor.',
        category: '3d',
        tags: ['rotateX', 'rotateY', 'perspective'],
        component: (
            <motion.div
                key="tilt-card"
                className="w-24 h-24 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 cursor-pointer shadow-xl"
                whileHover={{
                    rotateX: 10,
                    rotateY: -10,
                    scale: 1.05,
                }}
                transition={{ type: 'spring', stiffness: 400, damping: 20 }}
            />
        ),
        code: `<motion.div
  whileHover={{ 
    rotateX: 10, 
    rotateY: -10,
    scale: 1.05,
  }}
  transition={{ type: 'spring', stiffness: 400, damping: 20 }}
/>`,
    },

    // Scroll animations
    {
        id: 'parallax',
        name: 'Parallax',
        description: 'Element moves at different speed while scrolling.',
        category: 'scroll',
        tags: ['useScroll', 'useTransform', 'y'],
        component: (
            <div className="relative h-24 w-full overflow-hidden rounded-xl bg-black/5">
                <motion.div
                    className="absolute left-1/2 -translate-x-1/2 w-12 h-12 rounded-lg bg-gradient-to-br from-orange-400 to-red-500"
                    animate={{ y: [0, -20, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                />
            </div>
        ),
        code: `const { scrollYProgress } = useScroll()
const y = useTransform(scrollYProgress, [0, 1], [0, -100])

<motion.div style={{ y }} />`,
    },
    {
        id: 'reveal-on-scroll',
        name: 'Reveal on Scroll',
        description: 'Element reveals as it enters viewport.',
        category: 'scroll',
        tags: ['whileInView', 'viewport'],
        component: (
            <motion.div
                key="reveal-scroll"
                className="w-20 h-20 rounded-xl bg-gradient-to-br from-emerald-400 to-green-600"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
            />
        ),
        code: `<motion.div
  initial={{ opacity: 0, y: 50 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.5 }}
/>`,
    },

    // Transition animations
    {
        id: 'spring',
        name: 'Spring Physics',
        description: 'Natural spring-based animation.',
        category: 'transition',
        tags: ['spring', 'stiffness', 'damping'],
        component: (
            <motion.div
                key="spring"
                className="w-20 h-20 rounded-xl bg-gradient-to-br from-lime-400 to-green-500 cursor-pointer"
                whileHover={{ scale: 1.3 }}
                transition={{ type: 'spring', stiffness: 500, damping: 15 }}
            />
        ),
        code: `<motion.div
  whileHover={{ scale: 1.3 }}
  transition={{ 
    type: 'spring', 
    stiffness: 500, 
    damping: 15 
  }}
/>`,
    },
    {
        id: 'bouncy',
        name: 'Bouncy',
        description: 'Over-the-top bouncy animation.',
        category: 'transition',
        tags: ['spring', 'bounce'],
        component: (
            <motion.div
                key="bouncy"
                className="w-20 h-20 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 cursor-pointer"
                whileHover={{ y: -30 }}
                transition={{ type: 'spring', stiffness: 700, damping: 10 }}
            />
        ),
        code: `<motion.div
  whileHover={{ y: -30 }}
  transition={{ 
    type: 'spring', 
    stiffness: 700, 
    damping: 10 
  }}
/>`,
    },
    {
        id: 'keyframes',
        name: 'Keyframes',
        description: 'Multi-step keyframe animation.',
        category: 'transition',
        tags: ['keyframes', 'array'],
        component: (
            <motion.div
                key="keyframes"
                className="w-20 h-20 rounded-xl bg-gradient-to-br from-fuchsia-400 to-pink-600"
                animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 10, -10, 0],
                    borderRadius: ['20%', '50%', '20%'],
                }}
                transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                }}
            />
        ),
        code: `<motion.div
  animate={{ 
    scale: [1, 1.2, 1],
    rotate: [0, 10, -10, 0],
    borderRadius: ['20%', '50%', '20%'],
  }}
  transition={{ 
    duration: 2, 
    repeat: Infinity,
  }}
/>`,
    },
]

// ========================================
// ANIMATION CARD
// ========================================

interface AnimationCardProps {
    animation: AnimationDemo
}

function AnimationCard({ animation }: AnimationCardProps) {
    const [isPlaying, setIsPlaying] = useState(true)
    const [copied, setCopied] = useState(false)
    const [showCode, setShowCode] = useState(false)

    const handleCopy = async () => {
        await copyToClipboard(animation.code)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    const handleReplay = () => {
        setIsPlaying(false)
        setTimeout(() => setIsPlaying(true), 50)
    }

    return (
        <GlassCard className="overflow-hidden">
            {/* Preview */}
            <div className="h-40 flex items-center justify-center bg-gradient-to-br from-black/[0.02] to-black/[0.05] relative">
                <AnimatePresence mode="wait">
                    {isPlaying && (
                        <motion.div
                            key={animation.id}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            {animation.component}
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Replay button */}
                <motion.button
                    className="absolute top-2 right-2 w-8 h-8 rounded-lg bg-white/80 backdrop-blur flex items-center justify-center text-muted hover:text-foreground transition-colors"
                    onClick={handleReplay}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                >
                    <Play className="w-3.5 h-3.5" />
                </motion.button>
            </div>

            {/* Info */}
            <div className="p-4">
                <h3 className="font-semibold mb-1">{animation.name}</h3>
                <p className="text-sm text-muted mb-3">{animation.description}</p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1 mb-4">
                    {animation.tags.map((tag) => (
                        <span
                            key={tag}
                            className="text-xs px-2 py-0.5 rounded-full bg-accent-primary/10 text-accent-primary"
                        >
                            {tag}
                        </span>
                    ))}
                </div>

                {/* Code toggle */}
                <button
                    className="flex items-center gap-2 text-sm text-muted hover:text-accent-primary transition-colors w-full"
                    onClick={() => setShowCode(!showCode)}
                >
                    <Code className="w-4 h-4" />
                    {showCode ? 'Hide code' : 'View code'}
                    <ChevronDown
                        className={cn(
                            'w-4 h-4 ml-auto transition-transform',
                            showCode && 'rotate-180'
                        )}
                    />
                </button>

                <AnimatePresence>
                    {showCode && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                        >
                            <div className="mt-3 relative">
                                <pre className="p-3 rounded-xl bg-gray-900 text-gray-100 text-xs overflow-x-auto">
                                    <code>{animation.code}</code>
                                </pre>
                                <button
                                    className="absolute top-2 right-2 p-1.5 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                                    onClick={handleCopy}
                                >
                                    {copied ? (
                                        <Check className="w-3.5 h-3.5 text-green-400" />
                                    ) : (
                                        <Copy className="w-3.5 h-3.5 text-gray-400" />
                                    )}
                                </button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </GlassCard>
    )
}

// ========================================
// ANIMATION SHOWCASE
// ========================================

export function AnimationShowcase() {
    const [selectedCategory, setSelectedCategory] = useState('all')

    const filteredAnimations = selectedCategory === 'all'
        ? animations
        : animations.filter((a) => a.category === selectedCategory)

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="text-center">
                <h2 className="text-3xl font-bold mb-2">
                    Animation <span className="gradient-text">Showcase</span>
                </h2>
                <p className="text-muted max-w-xl mx-auto">
                    Explore the animation library used throughout this portfolio.
                    Click &quot;View code&quot; to see the Framer Motion implementation.
                </p>
            </div>

            {/* Categories */}
            <div className="flex justify-center gap-2 flex-wrap">
                <motion.button
                    className={cn(
                        'px-4 py-2 rounded-full text-sm font-medium transition-all',
                        selectedCategory === 'all'
                            ? 'bg-accent-primary text-white'
                            : 'bg-white/70 border border-black/[0.08] hover:border-accent-primary/30'
                    )}
                    onClick={() => setSelectedCategory('all')}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                >
                    All
                </motion.button>
                {categories.map((category) => (
                    <motion.button
                        key={category.id}
                        className={cn(
                            'inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all',
                            selectedCategory === category.id
                                ? 'bg-accent-primary text-white'
                                : 'bg-white/70 border border-black/[0.08] hover:border-accent-primary/30'
                        )}
                        onClick={() => setSelectedCategory(category.id)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        {category.icon}
                        {category.name}
                    </motion.button>
                ))}
            </div>

            {/* Grid */}
            <motion.div
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                layout
            >
                <AnimatePresence mode="popLayout">
                    {filteredAnimations.map((animation) => (
                        <motion.div
                            key={animation.id}
                            layout
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                        >
                            <AnimationCard animation={animation} />
                        </motion.div>
                    ))}
                </AnimatePresence>
            </motion.div>
        </div>
    )
}
