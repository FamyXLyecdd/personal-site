'use client'

import { useRef, useState } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { ArrowUpRight, ExternalLink, Github } from 'lucide-react'
import { GlassCard } from '@/components/ui/glass-card'
import { TechPill, Badge } from '@/components/ui/index'
import { staggerContainer, fadeInUp } from '@/lib/animations'
import { cn } from '@/lib/utils'

// ========================================
// PROJECT DATA
// ========================================

interface Project {
    id: string
    title: string
    description: string
    longDescription: string
    image: string
    emoji: string
    tags: string[]
    techStack: string[]
    liveUrl?: string
    githubUrl?: string
    featured?: boolean
}

const projects: Project[] = [
    {
        id: 'discord-bot-1',
        title: 'Premium Discord Bot',
        description: 'Multi-purpose bot with AI-powered features',
        longDescription: 'A fully-featured Discord bot with music, moderation, economy system, and AI-powered responses using GPT-4. Currently serving 100+ active servers with 99.9% uptime.',
        image: '/projects/bot1.png',
        emoji: '🤖',
        tags: ['Featured', 'Production'],
        techStack: ['Python', 'Discord.py', 'MongoDB', 'OpenAI'],
        liveUrl: 'https://discord.com/oauth2/authorize',
        githubUrl: 'https://github.com',
        featured: true,
    },
    {
        id: 'automation-suite',
        title: 'Automation Suite',
        description: 'Python tools for web scraping & data processing',
        longDescription: 'A collection of automation scripts for web scraping, data extraction, and processing. Handles millions of records daily with error recovery and logging.',
        image: '/projects/automation.png',
        emoji: '⚡',
        tags: ['Automation'],
        techStack: ['Python', 'Selenium', 'BeautifulSoup', 'Pandas'],
        githubUrl: 'https://github.com',
    },
    {
        id: 'music-bot',
        title: 'Music Bot Pro',
        description: 'High-quality music playback for Discord',
        longDescription: 'Premium music bot with Spotify integration, queue management, custom playlists, and audio effects. Supports YouTube, Spotify, and SoundCloud.',
        image: '/projects/music.png',
        emoji: '🎵',
        tags: ['Music', 'Production'],
        techStack: ['Python', 'Lavalink', 'Spotify API', 'Redis'],
        liveUrl: 'https://discord.com/oauth2/authorize',
    },
    {
        id: 'moderation-bot',
        title: 'AutoMod System',
        description: 'AI-powered moderation for communities',
        longDescription: 'Intelligent moderation bot with ML-based content filtering, raid protection, and customizable auto-responses. Protects over 50+ servers.',
        image: '/projects/mod.png',
        emoji: '🛡️',
        tags: ['Security', 'AI'],
        techStack: ['Python', 'TensorFlow', 'PostgreSQL', 'Redis'],
        githubUrl: 'https://github.com',
    },
    {
        id: 'trading-bot',
        title: 'Crypto Trading Bot',
        description: 'Automated trading with technical analysis',
        longDescription: 'Crypto trading bot with real-time market analysis, multiple trading strategies, and risk management. Backtested on 5 years of historical data.',
        image: '/projects/trading.png',
        emoji: '📈',
        tags: ['Crypto', 'Private'],
        techStack: ['Python', 'ccxt', 'NumPy', 'TA-Lib'],
    },
    {
        id: 'api-wrapper',
        title: 'API Wrapper Library',
        description: 'Easy-to-use Python library for Discord API',
        longDescription: 'A lightweight, async-first Python wrapper for the Discord API with type hints, rate limiting, and comprehensive documentation.',
        image: '/projects/api.png',
        emoji: '📦',
        tags: ['Open Source'],
        techStack: ['Python', 'aiohttp', 'pytest'],
        githubUrl: 'https://github.com',
    },
]

// ========================================
// PROJECT CARD
// ========================================

interface ProjectCardProps {
    project: Project
    index: number
}

function ProjectCard({ project, index }: ProjectCardProps) {
    const [isHovered, setIsHovered] = useState(false)

    return (
        <motion.div
            className="horizontal-scroll-item w-[320px] sm:w-[380px] flex-shrink-0"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
        >
            <GlassCard
                className="h-full group cursor-pointer"
                padding="none"
                animated={false}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                data-cursor-text="View"
            >
                {/* Project image / preview */}
                <div className="relative h-44 overflow-hidden rounded-t-3xl">
                    <motion.div
                        className="absolute inset-0 bg-gradient-to-br from-accent-primary/30 to-accent-secondary/30 flex items-center justify-center"
                        animate={{
                            scale: isHovered ? 1.05 : 1,
                            rotateY: isHovered ? 5 : 0,
                        }}
                        transition={{ duration: 0.4 }}
                    >
                        <span className="text-6xl">{project.emoji}</span>
                    </motion.div>

                    {/* Overlay */}
                    <motion.div
                        className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: isHovered ? 1 : 0 }}
                    />

                    {/* Tags */}
                    <div className="absolute top-3 left-3 flex gap-2">
                        {project.tags.map((tag) => (
                            <Badge
                                key={tag}
                                variant={tag === 'Featured' ? 'primary' : 'default'}
                                size="sm"
                            >
                                {tag}
                            </Badge>
                        ))}
                    </div>

                    {/* Hover actions */}
                    <motion.div
                        className="absolute bottom-3 right-3 flex gap-2"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}
                    >
                        {project.githubUrl && (
                            <motion.a
                                href={project.githubUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-9 h-9 rounded-full bg-white/90 backdrop-blur flex items-center justify-center"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={(e) => e.stopPropagation()}
                            >
                                <Github className="w-4 h-4" />
                            </motion.a>
                        )}
                        {project.liveUrl && (
                            <motion.a
                                href={project.liveUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-9 h-9 rounded-full bg-white/90 backdrop-blur flex items-center justify-center"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={(e) => e.stopPropagation()}
                            >
                                <ExternalLink className="w-4 h-4" />
                            </motion.a>
                        )}
                    </motion.div>
                </div>

                {/* Content */}
                <div className="p-5">
                    <h3 className="text-lg font-semibold mb-1 group-hover:text-accent-primary transition-colors">
                        {project.title}
                    </h3>
                    <p className="text-sm text-muted mb-4 line-clamp-2">
                        {project.description}
                    </p>

                    {/* Tech stack */}
                    <div className="flex flex-wrap gap-1.5">
                        {project.techStack.slice(0, 3).map((tech) => (
                            <TechPill key={tech} name={tech} />
                        ))}
                        {project.techStack.length > 3 && (
                            <TechPill name={`+${project.techStack.length - 3}`} />
                        )}
                    </div>
                </div>
            </GlassCard>
        </motion.div>
    )
}

// ========================================
// SCROLL PROGRESS BAR
// ========================================

function ScrollProgressBar({ progress }: { progress: number }) {
    return (
        <div className="h-1 bg-black/[0.05] rounded-full overflow-hidden">
            <motion.div
                className="h-full bg-gradient-to-r from-accent-primary to-accent-secondary rounded-full"
                style={{ width: `${progress * 100}%` }}
                transition={{ duration: 0.1 }}
            />
        </div>
    )
}

// ========================================
// PROJECTS SHOWCASE SECTION
// ========================================

export function ProjectsShowcase() {
    const sectionRef = useRef<HTMLElement>(null)
    const scrollContainerRef = useRef<HTMLDivElement>(null)
    const isInView = useInView(sectionRef, { once: true, margin: '-100px' })
    const [scrollProgress, setScrollProgress] = useState(0)

    // Track horizontal scroll progress
    const handleScroll = () => {
        if (!scrollContainerRef.current) return
        const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current
        const progress = scrollLeft / (scrollWidth - clientWidth)
        setScrollProgress(progress)
    }

    return (
        <section
            ref={sectionRef}
            className="section relative overflow-hidden"
            aria-label="Projects showcase"
        >
            {/* Background gradient */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background: 'linear-gradient(180deg, transparent 0%, rgba(0,102,255,0.03) 50%, transparent 100%)',
                }}
            />

            <div className="container relative">
                {/* Section header */}
                <motion.div
                    className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8"
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                >
                    <div>
                        <h2 className="text-3xl sm:text-4xl font-bold mb-2">
                            Featured <span className="gradient-text">Projects</span>
                        </h2>
                        <p className="text-muted">
                            A selection of my best work. Scroll to explore →
                        </p>
                    </div>

                    <motion.a
                        href="#all-projects"
                        className="inline-flex items-center gap-2 text-accent-primary font-medium hover:gap-3 transition-all"
                        whileHover={{ x: 4 }}
                    >
                        View All Projects <ArrowUpRight className="w-4 h-4" />
                    </motion.a>
                </motion.div>

                {/* Progress bar */}
                <motion.div
                    className="mb-6"
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ delay: 0.3 }}
                >
                    <ScrollProgressBar progress={scrollProgress} />
                </motion.div>
            </div>

            {/* Horizontal scroll container */}
            <div className="relative">
                {/* Gradient fades on edges */}
                <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
                <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

                <div
                    ref={scrollContainerRef}
                    className="flex gap-6 overflow-x-auto hide-scrollbar px-[max(1rem,calc((100vw-1280px)/2+1rem))] py-4"
                    onScroll={handleScroll}
                >
                    {projects.map((project, index) => (
                        <ProjectCard key={project.id} project={project} index={index} />
                    ))}

                    {/* View all card */}
                    <motion.div
                        className="horizontal-scroll-item w-[280px] flex-shrink-0"
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: projects.length * 0.1 }}
                    >
                        <a href="#all-projects" className="block h-full">
                            <GlassCard
                                className="h-full min-h-[280px] flex flex-col items-center justify-center text-center cursor-pointer group"
                                animated={false}
                            >
                                <motion.div
                                    className="w-16 h-16 rounded-full bg-gradient-to-br from-accent-primary/10 to-accent-secondary/10 flex items-center justify-center mb-4 group-hover:from-accent-primary/20 group-hover:to-accent-secondary/20 transition-colors"
                                    whileHover={{ scale: 1.1, rotate: 5 }}
                                >
                                    <ArrowUpRight className="w-8 h-8 text-accent-primary" />
                                </motion.div>
                                <h3 className="text-lg font-semibold mb-1">View All</h3>
                                <p className="text-sm text-muted">{projects.length}+ projects</p>
                            </GlassCard>
                        </a>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
