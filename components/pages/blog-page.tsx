'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import {
    Calendar,
    Clock,
    Tag,
    ArrowRight,
    Search,
    BookOpen,
    TrendingUp,
} from 'lucide-react'
import { GlassCard } from '@/components/ui/glass-card'
import { Badge } from '@/components/ui/index'
import { cn } from '@/lib/utils'

// ========================================
// BLOG DATA
// ========================================

export interface BlogPost {
    id: string
    slug: string
    title: string
    excerpt: string
    content: string
    coverImage: string
    emoji: string
    category: string
    tags: string[]
    author: {
        name: string
        avatar: string
    }
    publishedAt: Date
    readingTime: number
    featured?: boolean
}

export const blogPosts: BlogPost[] = [
    {
        id: '1',
        slug: 'building-discord-bot-from-scratch',
        title: 'Building a Discord Bot from Scratch with Python',
        excerpt: 'A comprehensive guide to creating your first Discord bot using discord.py. We\'ll cover everything from setup to deployment.',
        content: '',
        coverImage: '/blog/discord-bot.png',
        emoji: '🤖',
        category: 'Tutorial',
        tags: ['Python', 'Discord.py', 'Bots'],
        author: { name: 'YourName', avatar: '' },
        publishedAt: new Date('2025-12-15'),
        readingTime: 12,
        featured: true,
    },
    {
        id: '2',
        slug: 'web-scraping-best-practices',
        title: 'Web Scraping Best Practices in 2025',
        excerpt: 'Learn the ethical and efficient ways to scrape websites, handle rate limiting, and avoid getting blocked.',
        content: '',
        coverImage: '/blog/scraping.png',
        emoji: '🕷️',
        category: 'Tutorial',
        tags: ['Python', 'Web Scraping', 'Automation'],
        author: { name: 'YourName', avatar: '' },
        publishedAt: new Date('2025-12-10'),
        readingTime: 8,
    },
    {
        id: '3',
        slug: 'freelancing-as-teen-developer',
        title: 'How I Started Freelancing at 16',
        excerpt: 'My journey from hobby coding to earning ₱20k/month. Tips for young developers looking to start freelancing.',
        content: '',
        coverImage: '/blog/freelancing.png',
        emoji: '💰',
        category: 'Personal',
        tags: ['Freelancing', 'Career', 'Tips'],
        author: { name: 'YourName', avatar: '' },
        publishedAt: new Date('2025-12-05'),
        readingTime: 6,
        featured: true,
    },
    {
        id: '4',
        slug: 'understanding-async-await-python',
        title: 'Understanding Async/Await in Python',
        excerpt: 'Demystifying asynchronous programming in Python. Perfect for Discord bot developers and API builders.',
        content: '',
        coverImage: '/blog/async.png',
        emoji: '⚡',
        category: 'Technical',
        tags: ['Python', 'Async', 'Programming'],
        author: { name: 'YourName', avatar: '' },
        publishedAt: new Date('2025-11-28'),
        readingTime: 10,
    },
    {
        id: '5',
        slug: 'deploying-bots-vps',
        title: 'Deploying Discord Bots to a VPS',
        excerpt: 'Complete guide to deploying your Discord bot to a Linux VPS with systemd, Docker, and more.',
        content: '',
        coverImage: '/blog/deployment.png',
        emoji: '🚀',
        category: 'DevOps',
        tags: ['Deployment', 'Linux', 'Docker'],
        author: { name: 'YourName', avatar: '' },
        publishedAt: new Date('2025-11-20'),
        readingTime: 15,
    },
    {
        id: '6',
        slug: 'ai-integration-discord-bots',
        title: 'Adding AI to Your Discord Bots',
        excerpt: 'Integrate OpenAI GPT-4 into your Discord bot for intelligent conversations and commands.',
        content: '',
        coverImage: '/blog/ai.png',
        emoji: '🧠',
        category: 'Tutorial',
        tags: ['AI', 'OpenAI', 'Discord.py'],
        author: { name: 'YourName', avatar: '' },
        publishedAt: new Date('2025-11-15'),
        readingTime: 11,
    },
]

const categories = ['All', 'Tutorial', 'Technical', 'Personal', 'DevOps']

// ========================================
// FEATURED POST CARD
// ========================================

interface FeaturedPostCardProps {
    post: BlogPost
}

function FeaturedPostCard({ post }: FeaturedPostCardProps) {
    return (
        <Link href={`/blog/${post.slug}`}>
            <motion.div
                className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-accent-primary/20 to-accent-secondary/20 p-8 min-h-[300px] flex flex-col justify-end cursor-pointer"
                whileHover={{ scale: 1.01 }}
                transition={{ duration: 0.3 }}
            >
                {/* Background emoji */}
                <div className="absolute top-1/2 right-8 -translate-y-1/2 text-[150px] opacity-20 group-hover:scale-110 transition-transform">
                    {post.emoji}
                </div>

                {/* Content */}
                <div className="relative z-10">
                    <Badge variant="primary" className="mb-4">Featured</Badge>
                    <h2 className="text-2xl sm:text-3xl font-bold mb-3 group-hover:text-accent-primary transition-colors">
                        {post.title}
                    </h2>
                    <p className="text-muted mb-4 line-clamp-2 max-w-xl">
                        {post.excerpt}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-muted">
                        <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {post.publishedAt.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </span>
                        <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {post.readingTime} min read
                        </span>
                    </div>
                </div>
            </motion.div>
        </Link>
    )
}

// ========================================
// BLOG POST CARD
// ========================================

interface PostCardProps {
    post: BlogPost
}

function PostCard({ post }: PostCardProps) {
    const [isHovered, setIsHovered] = useState(false)

    return (
        <Link href={`/blog/${post.slug}`}>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                layout
            >
                <GlassCard
                    className="h-full cursor-pointer group overflow-hidden"
                    padding="none"
                    animated={false}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    {/* Cover */}
                    <div className="relative h-44 overflow-hidden">
                        <motion.div
                            className="absolute inset-0 bg-gradient-to-br from-accent-primary/20 to-accent-secondary/20 flex items-center justify-center"
                            animate={{ scale: isHovered ? 1.05 : 1 }}
                            transition={{ duration: 0.4 }}
                        >
                            <span className="text-6xl">{post.emoji}</span>
                        </motion.div>

                        <div className="absolute top-3 left-3">
                            <Badge variant="secondary" size="sm">{post.category}</Badge>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="p-5">
                        <h3 className="text-lg font-semibold mb-2 line-clamp-2 group-hover:text-accent-primary transition-colors">
                            {post.title}
                        </h3>
                        <p className="text-sm text-muted mb-4 line-clamp-2">
                            {post.excerpt}
                        </p>

                        <div className="flex items-center justify-between text-sm text-muted">
                            <span className="flex items-center gap-1">
                                <Calendar className="w-3.5 h-3.5" />
                                {post.publishedAt.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                            </span>
                            <span className="flex items-center gap-1">
                                <Clock className="w-3.5 h-3.5" />
                                {post.readingTime} min
                            </span>
                        </div>
                    </div>
                </GlassCard>
            </motion.div>
        </Link>
    )
}

// ========================================
// BLOG PAGE CONTENT
// ========================================

export function BlogPageContent() {
    const [searchQuery, setSearchQuery] = useState('')
    const [selectedCategory, setSelectedCategory] = useState('All')

    const featuredPosts = blogPosts.filter((post) => post.featured)

    const filteredPosts = blogPosts.filter((post) => {
        if (searchQuery) {
            const query = searchQuery.toLowerCase()
            const matchesSearch =
                post.title.toLowerCase().includes(query) ||
                post.excerpt.toLowerCase().includes(query) ||
                post.tags.some((tag) => tag.toLowerCase().includes(query))
            if (!matchesSearch) return false
        }

        if (selectedCategory !== 'All' && post.category !== selectedCategory) {
            return false
        }

        return true
    })

    return (
        <div className="min-h-screen py-24">
            <div className="container">
                {/* Header */}
                <motion.div
                    className="text-center mb-12"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <h1 className="text-4xl sm:text-5xl font-bold mb-4">
                        <span className="gradient-text">Blog</span> & Articles
                    </h1>
                    <p className="text-muted max-w-2xl mx-auto">
                        Thoughts, tutorials, and insights about development, freelancing, and tech.
                        Learn from my experiences and discoveries.
                    </p>
                </motion.div>

                {/* Featured posts */}
                {featuredPosts.length > 0 && (
                    <motion.div
                        className="mb-12"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                    >
                        <div className="flex items-center gap-2 mb-6">
                            <TrendingUp className="w-5 h-5 text-accent-primary" />
                            <h2 className="text-xl font-semibold">Featured Posts</h2>
                        </div>
                        <div className="grid md:grid-cols-2 gap-6">
                            {featuredPosts.map((post) => (
                                <FeaturedPostCard key={post.id} post={post} />
                            ))}
                        </div>
                    </motion.div>
                )}

                {/* Search and filters */}
                <motion.div
                    className="mb-8 space-y-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <div className="flex gap-4 flex-wrap">
                        <div className="flex-1 min-w-[200px] relative">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
                            <input
                                type="text"
                                placeholder="Search posts..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full h-12 pl-12 pr-4 rounded-xl bg-white/70 border border-black/[0.08] outline-none focus:border-accent-primary/30 focus:ring-2 focus:ring-accent-primary/10 transition-all"
                            />
                        </div>
                    </div>

                    <div className="flex gap-2 flex-wrap">
                        {categories.map((category) => (
                            <motion.button
                                key={category}
                                className={cn(
                                    'px-4 py-2 rounded-full text-sm font-medium transition-all',
                                    selectedCategory === category
                                        ? 'bg-accent-primary text-white'
                                        : 'bg-white/70 border border-black/[0.08] hover:border-accent-primary/30'
                                )}
                                onClick={() => setSelectedCategory(category)}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                {category}
                            </motion.button>
                        ))}
                    </div>
                </motion.div>

                {/* All posts header */}
                <div className="flex items-center gap-2 mb-6">
                    <BookOpen className="w-5 h-5 text-accent-primary" />
                    <h2 className="text-xl font-semibold">All Posts</h2>
                    <span className="text-sm text-muted">({filteredPosts.length})</span>
                </div>

                {/* Posts grid */}
                <motion.div
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                    layout
                >
                    <AnimatePresence mode="popLayout">
                        {filteredPosts.map((post) => (
                            <PostCard key={post.id} post={post} />
                        ))}
                    </AnimatePresence>
                </motion.div>

                {/* Empty state */}
                {filteredPosts.length === 0 && (
                    <motion.div
                        className="text-center py-16"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                    >
                        <div className="text-6xl mb-4">📝</div>
                        <h3 className="text-xl font-semibold mb-2">No posts found</h3>
                        <p className="text-muted">Try adjusting your search or category filter.</p>
                    </motion.div>
                )}
            </div>
        </div>
    )
}
