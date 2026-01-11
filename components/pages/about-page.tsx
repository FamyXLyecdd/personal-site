'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import {
    Calendar,
    MapPin,
    Code,
    Heart,
    Coffee,
    Gamepad2,
    Music,
    BookOpen,
    Award,
    Zap,
    Star,
} from 'lucide-react'
import { GlassCard } from '@/components/ui/glass-card'
import { Badge, TechPill, ProgressBar } from '@/components/ui/index'

// ========================================
// TIMELINE DATA
// ========================================

const timelineEvents = [
    {
        year: '2023',
        title: 'Started Coding',
        description: 'Discovered Python and fell in love with programming. Built my first "Hello World" and never looked back.',
        icon: '🚀',
        highlight: true,
    },
    {
        year: '2024',
        title: 'First Discord Bot',
        description: 'Created my first Discord bot for a small server. It was buggy but I was hooked!',
        icon: '🤖',
    },
    {
        year: '2024',
        title: 'First Client',
        description: 'Landed my first freelance client through Fiverr. Earned ₱5,000 for a custom bot.',
        icon: '💰',
        highlight: true,
    },
    {
        year: '2025',
        title: 'Full-Time Freelancing',
        description: 'Now working with multiple clients worldwide, earning ₱20k+/month. Living the dream!',
        icon: '🌟',
        highlight: true,
    },
]

const skills = [
    { name: 'Python', level: 95, icon: '🐍' },
    { name: 'Discord.py', level: 90, icon: '🤖' },
    { name: 'JavaScript', level: 75, icon: '⚡' },
    { name: 'React/Next.js', level: 70, icon: '⚛️' },
    { name: 'Web Scraping', level: 85, icon: '🕷️' },
    { name: 'API Integration', level: 88, icon: '🔗' },
]

const funFacts = [
    { icon: <Coffee className="w-5 h-5" />, label: 'Cups of coffee', value: '500+', color: '#8B4513' },
    { icon: <Code className="w-5 h-5" />, label: 'Lines of code', value: '100,000+', color: '#0066FF' },
    { icon: <Gamepad2 className="w-5 h-5" />, label: 'Gaming breaks', value: 'Too many', color: '#9B59B6' },
    { icon: <Music className="w-5 h-5" />, label: 'Lo-fi hours', value: '∞', color: '#00D4AA' },
]

const interests = ['Gaming 🎮', 'Anime 🎌', 'Music 🎵', 'Tech News 📰', 'Coffee ☕', 'Coding 💻']

// ========================================
// ABOUT PAGE CONTENT
// ========================================

export function AboutPageContent() {
    const containerRef = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end end'],
    })

    const headerY = useTransform(scrollYProgress, [0, 0.2], [0, -50])

    return (
        <div ref={containerRef} className="min-h-screen py-24">
            <div className="container">
                {/* Hero section */}
                <motion.div
                    className="text-center mb-16"
                    style={{ y: headerY }}
                >
                    <motion.div
                        className="inline-block text-8xl mb-6"
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ type: 'spring', stiffness: 200 }}
                    >
                        👋
                    </motion.div>
                    <h1 className="text-4xl sm:text-5xl font-bold mb-4">
                        About <span className="gradient-text">Me</span>
                    </h1>
                    <p className="text-muted max-w-2xl mx-auto text-lg">
                        16-year-old developer from the Philippines, building cool stuff with code since 2023.
                    </p>
                </motion.div>

                {/* Main content grid */}
                <div className="grid lg:grid-cols-3 gap-8 mb-16">
                    {/* Left column - Bio */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Introduction */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                        >
                            <GlassCard>
                                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                                    <BookOpen className="w-6 h-6 text-accent-primary" />
                                    My Story
                                </h2>
                                <div className="space-y-4 text-muted leading-relaxed">
                                    <p>
                                        Hey! I&apos;m a self-taught developer who discovered programming at 14 and never looked back.
                                        What started as curiosity about how Discord bots work turned into a full-blown passion
                                        for coding and creating.
                                    </p>
                                    <p>
                                        Today, I specialize in <strong className="text-foreground">Python development</strong>,
                                        particularly Discord bots and automation tools. I&apos;ve built 50+ projects and work with
                                        clients from around the world through platforms like Fiverr.
                                    </p>
                                    <p>
                                        When I&apos;m not coding, you&apos;ll find me gaming, watching anime, or experimenting with new
                                        technologies. I believe in continuous learning and pushing myself to grow every day.
                                    </p>
                                </div>
                            </GlassCard>
                        </motion.div>

                        {/* Skills */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            <GlassCard>
                                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                                    <Zap className="w-6 h-6 text-accent-primary" />
                                    Skills
                                </h2>
                                <div className="space-y-5">
                                    {skills.map((skill, index) => (
                                        <motion.div
                                            key={skill.name}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.1 * index }}
                                        >
                                            <div className="flex items-center justify-between mb-2">
                                                <span className="flex items-center gap-2 font-medium">
                                                    <span>{skill.icon}</span>
                                                    {skill.name}
                                                </span>
                                                <span className="text-sm text-muted">{skill.level}%</span>
                                            </div>
                                            <ProgressBar value={skill.level} max={100} animated />
                                        </motion.div>
                                    ))}
                                </div>
                            </GlassCard>
                        </motion.div>
                    </div>

                    {/* Right column - Stats & Info */}
                    <div className="space-y-6">
                        {/* Quick info */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                        >
                            <GlassCard className="text-center">
                                <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-accent-primary to-accent-secondary flex items-center justify-center text-4xl mb-4">
                                    👨‍💻
                                </div>
                                <h3 className="text-xl font-bold mb-1">YourName</h3>
                                <p className="text-muted mb-4">Full-Stack Developer</p>

                                <div className="flex flex-col gap-2 text-sm">
                                    <div className="flex items-center justify-center gap-2 text-muted">
                                        <MapPin className="w-4 h-4" />
                                        Philippines 🇵🇭
                                    </div>
                                    <div className="flex items-center justify-center gap-2 text-muted">
                                        <Calendar className="w-4 h-4" />
                                        16 years old
                                    </div>
                                    <div className="flex items-center justify-center gap-2 text-green-600">
                                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                        Available for work
                                    </div>
                                </div>
                            </GlassCard>
                        </motion.div>

                        {/* Fun facts */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                        >
                            <GlassCard>
                                <h3 className="font-bold mb-4 flex items-center gap-2">
                                    <Star className="w-5 h-5 text-yellow-500" />
                                    Fun Facts
                                </h3>
                                <div className="space-y-3">
                                    {funFacts.map((fact, index) => (
                                        <div key={index} className="flex items-center gap-3">
                                            <div
                                                className="w-10 h-10 rounded-xl flex items-center justify-center"
                                                style={{ background: `${fact.color}20`, color: fact.color }}
                                            >
                                                {fact.icon}
                                            </div>
                                            <div>
                                                <div className="font-semibold text-sm">{fact.value}</div>
                                                <div className="text-xs text-muted">{fact.label}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </GlassCard>
                        </motion.div>

                        {/* Interests */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                        >
                            <GlassCard>
                                <h3 className="font-bold mb-4 flex items-center gap-2">
                                    <Heart className="w-5 h-5 text-red-500" />
                                    Interests
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {interests.map((interest) => (
                                        <Badge key={interest} variant="secondary">
                                            {interest}
                                        </Badge>
                                    ))}
                                </div>
                            </GlassCard>
                        </motion.div>
                    </div>
                </div>

                {/* Timeline */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                >
                    <h2 className="text-2xl font-bold mb-8 text-center flex items-center justify-center gap-2">
                        <Award className="w-6 h-6 text-accent-primary" />
                        My Journey
                    </h2>

                    <div className="relative max-w-3xl mx-auto">
                        {/* Timeline line */}
                        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-accent-primary via-accent-secondary to-accent-primary" />

                        {timelineEvents.map((event, index) => (
                            <motion.div
                                key={index}
                                className="relative pl-20 pb-10 last:pb-0"
                                initial={{ opacity: 0, x: -30 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.1 * index }}
                            >
                                {/* Dot */}
                                <div className={`absolute left-6 w-5 h-5 rounded-full border-4 ${event.highlight ? 'bg-accent-primary border-accent-primary/30' : 'bg-white border-accent-primary/50'}`} />

                                {/* Content */}
                                <GlassCard className={event.highlight ? 'border-accent-primary/30' : ''}>
                                    <div className="flex items-start gap-4">
                                        <span className="text-4xl">{event.icon}</span>
                                        <div>
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-accent-primary/10 text-accent-primary">
                                                    {event.year}
                                                </span>
                                                {event.highlight && (
                                                    <Badge variant="primary" size="sm">Milestone</Badge>
                                                )}
                                            </div>
                                            <h3 className="font-bold text-lg">{event.title}</h3>
                                            <p className="text-muted text-sm">{event.description}</p>
                                        </div>
                                    </div>
                                </GlassCard>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </div>
    )
}
