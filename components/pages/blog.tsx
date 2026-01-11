'use client'

import { useState, useEffect, useCallback, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import {
    FileText,
    Tag,
    Clock,
    Calendar,
    Search,
    ChevronRight,
    ArrowLeft,
    ArrowRight,
    BookOpen,
    User,
    Share2,
    Bookmark,
    Heart,
    Twitter,
    Facebook,
    Linkedin,
    Copy,
    ExternalLink,
    MessageSquare,
    Eye,
    Menu,
    X,
    Home,
} from 'lucide-react'
import { GlassCard } from '@/components/ui/glass-card'
import { Button } from '@/components/ui/button'
import { Badge, TechPill, Skeleton } from '@/components/ui/index'
import { cn } from '@/lib/utils'

// ========================================
// TYPES
// ========================================

export interface BlogPostData {
    id: string
    title: string
    slug: string
    excerpt: string
    content: string
    author: {
        name: string
        avatar: string
        bio: string
        twitter?: string
    }
    publishedAt: string
    updatedAt?: string
    readTime: number
    category: string
    tags: string[]
    featured: boolean
    image: string
    emoji: string
    views: number
    likes: number
    comments: number
}

// ========================================
// SAMPLE BLOG DATA
// ========================================

export const blogPostsData: BlogPostData[] = [
    {
        id: 'post-discord-bot-guide',
        title: 'The Ultimate Guide to Building Discord Bots with Python in 2025',
        slug: 'discord-bot-python-guide-2025',
        excerpt: 'Learn how to create powerful Discord bots from scratch using Python and Discord.py. This comprehensive guide covers everything from setup to deployment.',
        content: `
# Introduction

Discord bots have become an essential part of managing communities, from small friend groups to massive servers with hundreds of thousands of members. In this comprehensive guide, we'll walk through everything you need to know to build your own Discord bot using Python.

## Prerequisites

Before we dive in, make sure you have:
- Python 3.10 or higher installed
- A Discord account
- Basic understanding of Python programming
- A text editor (VS Code recommended)

## Setting Up Your Development Environment

First, let's create a new project directory and set up a virtual environment:

\`\`\`bash
mkdir my-discord-bot
cd my-discord-bot
python -m venv venv
source venv/bin/activate  # On Windows: venv\\Scripts\\activate
\`\`\`

Now install the required packages:

\`\`\`bash
pip install discord.py python-dotenv
\`\`\`

## Creating Your Bot Application

1. Go to the [Discord Developer Portal](https://discord.com/developers/applications)
2. Click "New Application" and give it a name
3. Navigate to the "Bot" section
4. Click "Reset Token" to get your bot token
5. Save this token securely - never share it!

## Your First Bot

Create a new file called \`bot.py\`:

\`\`\`python
import discord
from discord.ext import commands
import os
from dotenv import load_dotenv

load_dotenv()

intents = discord.Intents.default()
intents.message_content = True

bot = commands.Bot(command_prefix='!', intents=intents)

@bot.event
async def on_ready():
    print(f'{bot.user} has connected to Discord!')

@bot.command(name='ping')
async def ping(ctx):
    await ctx.send(f'Pong! {round(bot.latency * 1000)}ms')

bot.run(os.getenv('DISCORD_TOKEN'))
\`\`\`

## Adding More Commands

Let's add some more useful commands:

\`\`\`python
@bot.command(name='info')
async def info(ctx, member: discord.Member = None):
    member = member or ctx.author
    embed = discord.Embed(
        title=f"Info about {member.name}",
        color=discord.Color.blue()
    )
    embed.add_field(name="ID", value=member.id)
    embed.add_field(name="Joined", value=member.joined_at.strftime("%Y-%m-%d"))
    embed.set_thumbnail(url=member.avatar.url if member.avatar else None)
    await ctx.send(embed=embed)
\`\`\`

## Best Practices

1. **Use Cogs for Organization** - Split your bot into multiple files
2. **Handle Errors Properly** - Implement error handlers
3. **Rate Limiting** - Be mindful of Discord's rate limits
4. **Security** - Never hardcode tokens or sensitive data

## Deployment Options

- **Railway** - Easy deployment with free tier
- **Heroku** - Popular choice for small bots
- **VPS** - Full control with DigitalOcean or AWS
- **Raspberry Pi** - Host at home 24/7

## Conclusion

You now have the foundation to build amazing Discord bots! Start small, experiment, and gradually add more complex features as you learn.
    `,
        author: {
            name: 'YourName',
            avatar: '👨‍💻',
            bio: '16-year-old developer specializing in Discord bots and Python automation.',
            twitter: '@yourname',
        },
        publishedAt: '2025-01-15',
        updatedAt: '2025-01-18',
        readTime: 15,
        category: 'Tutorial',
        tags: ['Discord', 'Python', 'Bots', 'Development'],
        featured: true,
        image: '/blog/discord-bot.png',
        emoji: '🤖',
        views: 12456,
        likes: 892,
        comments: 134,
    },
    {
        id: 'post-web-scraping-ethics',
        title: 'Web Scraping Ethics and Best Practices for 2025',
        slug: 'web-scraping-ethics-best-practices-2025',
        excerpt: 'Understanding the legal and ethical considerations of web scraping. Learn how to scrape responsibly while respecting website terms of service.',
        content: `
# Web Scraping Ethics

Web scraping is a powerful tool, but with great power comes great responsibility. Let's explore how to scrape ethically and legally.

## What is Web Scraping?

Web scraping is the automated extraction of data from websites. It's used for:
- Price monitoring
- Lead generation
- Research and analysis
- Content aggregation

## Legal Considerations

### Terms of Service
Always read and respect the website's ToS. Many explicitly prohibit scraping.

### Robots.txt
Check the robots.txt file to understand what's allowed:

\`\`\`
User-agent: *
Disallow: /private/
Allow: /public/
Crawl-delay: 10
\`\`\`

### Data Protection Laws
- GDPR (Europe)
- CCPA (California)
- LGPD (Brazil)

## Best Practices

1. **Identify Your Scraper**
   - Use a descriptive User-Agent
   - Provide contact information

2. **Respect Rate Limits**
   - Add delays between requests
   - Don't overwhelm servers

3. **Cache When Possible**
   - Store data locally
   - Avoid redundant requests

4. **Handle Errors Gracefully**
   - Implement retry logic
   - Back off when receiving errors

## Ethical Framework

Ask yourself:
- Would I want my site scraped this way?
- Am I harming the website or its users?
- Is there a public API available instead?
- Am I respecting user privacy?

## Conclusion

Scrape responsibly, respect others, and always stay informed about evolving regulations.
    `,
        author: {
            name: 'YourName',
            avatar: '👨‍💻',
            bio: '16-year-old developer specializing in Discord bots and Python automation.',
        },
        publishedAt: '2025-01-12',
        readTime: 10,
        category: 'Guide',
        tags: ['Web Scraping', 'Ethics', 'Python', 'Automation'],
        featured: true,
        image: '/blog/scraping.png',
        emoji: '⚖️',
        views: 8234,
        likes: 567,
        comments: 89,
    },
    {
        id: 'post-freelancing-journey',
        title: 'From Zero to ₱20k/Month: My Teen Developer Journey',
        slug: 'freelancing-journey-teen-developer',
        excerpt: 'How I went from learning Python at 14 to earning ₱20k/month freelancing at 16. Tips, challenges, and lessons learned.',
        content: `
# My Journey

At 14, I couldn't even write a basic Python script. Now at 16, I'm earning ₱20k/month doing what I love. Here's my story.

## The Beginning (Age 14)

I discovered Python through a YouTube tutorial on making Discord bots. Something clicked - I was hooked.

### First Steps
- Completed Python basics on freeCodeCamp
- Made a simple "Hello World" bot
- Joined Discord bot development communities

## Building Skills (Age 15)

I spent every free moment coding:
- Built my own game server bots
- Learned databases (SQLite, then PostgreSQL)
- Started contributing to open source

## First Clients (Age 16)

My breakthrough came when I offered to build a free bot for a popular gaming server. Word spread:

- Got my first paid client ($20 for a simple bot)
- Built a portfolio website
- Started offering automation services

## Current State

Today I have:
- 10+ regular clients
- Multiple bots running 24/7
- A steady income of ₱20k/month

## Lessons Learned

1. **Start Free, Charge Later** - Build reputation first
2. **Specialize** - Don't try to do everything
3. **Network** - Join communities, help others
4. **Keep Learning** - Technology changes fast

## Tips for Teen Developers

- You don't need formal education to start
- Build projects you're passionate about
- Save most of what you earn
- Focus on quality over quantity

## What's Next?

My goals for the future:
- Reach ₱50k/month
- Launch my own SaaS product
- Learn web development deeply
- Maybe try university?

The journey continues! 🚀
    `,
        author: {
            name: 'YourName',
            avatar: '👨‍💻',
            bio: '16-year-old developer from the Philippines.',
        },
        publishedAt: '2025-01-08',
        readTime: 12,
        category: 'Personal',
        tags: ['Freelancing', 'Career', 'Personal Story', 'Teen Developer'],
        featured: true,
        image: '/blog/journey.png',
        emoji: '🚀',
        views: 15678,
        likes: 1234,
        comments: 256,
    },
    {
        id: 'post-framer-motion',
        title: 'Creating Stunning Animations with Framer Motion in React',
        slug: 'framer-motion-react-animations',
        excerpt: 'Master Framer Motion to create smooth, performant animations in your React applications. From basics to advanced techniques.',
        content: `
# Framer Motion Guide

Framer Motion is the best animation library for React. Let's learn how to use it.

## Installation

\`\`\`bash
npm install framer-motion
\`\`\`

## Basic Animations

\`\`\`jsx
import { motion } from 'framer-motion'

function AnimatedBox() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      Hello World!
    </motion.div>
  )
}
\`\`\`

## More examples and techniques in the full article...
    `,
        author: {
            name: 'YourName',
            avatar: '👨‍💻',
            bio: 'Developer and animation enthusiast.',
        },
        publishedAt: '2025-01-05',
        readTime: 8,
        category: 'Tutorial',
        tags: ['React', 'Animation', 'Framer Motion', 'Frontend'],
        featured: false,
        image: '/blog/framer.png',
        emoji: '✨',
        views: 5432,
        likes: 345,
        comments: 67,
    },
    {
        id: 'post-optimization',
        title: 'Optimizing Discord.py Bots for Large Servers',
        slug: 'optimizing-discord-bots-large-servers',
        excerpt: 'Performance tips for running Discord bots on servers with thousands of members. Caching, sharding, and database optimization.',
        content: `
# Optimization Guide

Running a bot on large servers requires special considerations...
    `,
        author: {
            name: 'YourName',
            avatar: '👨‍💻',
            bio: 'Bot developer.',
        },
        publishedAt: '2025-01-02',
        readTime: 18,
        category: 'Technical',
        tags: ['Discord', 'Performance', 'Python', 'Optimization'],
        featured: false,
        image: '/blog/optimization.png',
        emoji: '⚡',
        views: 3456,
        likes: 234,
        comments: 45,
    },
]

// ========================================
// BLOG POST CARD
// ========================================

interface BlogPostCardProps {
    post: BlogPostData
    variant?: 'default' | 'featured' | 'compact'
}

export function BlogPostCard({ post, variant = 'default' }: BlogPostCardProps) {
    const [isLiked, setIsLiked] = useState(false)
    const [isBookmarked, setIsBookmarked] = useState(false)

    if (variant === 'featured') {
        return (
            <motion.article
                className="group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
            >
                <Link href={`/blog/${post.slug}`}>
                    <GlassCard
                        padding="none"
                        className="overflow-hidden"
                    >
                        <div className="grid md:grid-cols-2 gap-0">
                            <div className="aspect-square md:aspect-auto bg-gradient-to-br from-accent-primary/20 to-accent-secondary/20 flex items-center justify-center text-9xl md:text-[12rem]">
                                {post.emoji}
                            </div>
                            <div className="p-8 flex flex-col">
                                <div className="flex items-center gap-2 mb-4">
                                    <Badge variant="primary">{post.category}</Badge>
                                    <Badge variant="secondary">Featured</Badge>
                                </div>
                                <h2 className="text-2xl md:text-3xl font-bold mb-4 group-hover:text-accent-primary transition-colors">
                                    {post.title}
                                </h2>
                                <p className="text-muted mb-6 line-clamp-3">{post.excerpt}</p>

                                <div className="flex items-center gap-4 mt-auto">
                                    <div className="flex items-center gap-2">
                                        <span className="text-2xl">{post.author.avatar}</span>
                                        <div>
                                            <p className="font-medium text-sm">{post.author.name}</p>
                                            <p className="text-xs text-muted">{post.publishedAt}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4 ml-auto text-sm text-muted">
                                        <span className="flex items-center gap-1">
                                            <Clock className="w-4 h-4" />
                                            {post.readTime} min
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <Eye className="w-4 h-4" />
                                            {post.views.toLocaleString()}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </GlassCard>
                </Link>
            </motion.article>
        )
    }

    if (variant === 'compact') {
        return (
            <motion.article
                className="group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
            >
                <Link href={`/blog/${post.slug}`}>
                    <div className="flex gap-4 p-4 rounded-xl hover:bg-black/[0.02] transition-colors">
                        <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-accent-primary/20 to-accent-secondary/20 flex items-center justify-center text-3xl flex-shrink-0">
                            {post.emoji}
                        </div>
                        <div className="flex-1 min-w-0">
                            <h3 className="font-semibold mb-1 group-hover:text-accent-primary transition-colors line-clamp-2">
                                {post.title}
                            </h3>
                            <div className="flex items-center gap-2 text-xs text-muted">
                                <span>{post.category}</span>
                                <span>•</span>
                                <span>{post.readTime} min read</span>
                            </div>
                        </div>
                    </div>
                </Link>
            </motion.article>
        )
    }

    return (
        <motion.article
            className="group"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
        >
            <Link href={`/blog/${post.slug}`}>
                <GlassCard padding="none" className="overflow-hidden h-full">
                    <div className="aspect-[3/2] bg-gradient-to-br from-accent-primary/10 to-accent-secondary/10 flex items-center justify-center text-7xl">
                        {post.emoji}
                    </div>
                    <div className="p-6">
                        <div className="flex items-center gap-2 mb-3">
                            <Badge variant="secondary" size="sm">{post.category}</Badge>
                            <span className="text-xs text-muted">{post.readTime} min read</span>
                        </div>
                        <h3 className="font-bold text-lg mb-2 group-hover:text-accent-primary transition-colors line-clamp-2">
                            {post.title}
                        </h3>
                        <p className="text-sm text-muted mb-4 line-clamp-2">{post.excerpt}</p>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <span className="text-xl">{post.author.avatar}</span>
                                <span className="text-sm">{post.author.name}</span>
                            </div>
                            <span className="text-xs text-muted">{post.publishedAt}</span>
                        </div>
                    </div>
                </GlassCard>
            </Link>
        </motion.article>
    )
}

// ========================================
// BLOG PAGE CONTENT
// ========================================

export function BlogPageContent() {
    const [searchQuery, setSearchQuery] = useState('')
    const [selectedCategory, setSelectedCategory] = useState('All')
    const [currentPage, setCurrentPage] = useState(1)
    const postsPerPage = 6

    const categories = useMemo(() => {
        const cats = new Set(blogPostsData.map((p) => p.category))
        return ['All', ...Array.from(cats)]
    }, [])

    const filteredPosts = useMemo(() => {
        return blogPostsData.filter((post) => {
            const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
            const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory
            return matchesSearch && matchesCategory
        })
    }, [searchQuery, selectedCategory])

    const featuredPosts = filteredPosts.filter((p) => p.featured)
    const regularPosts = filteredPosts.filter((p) => !p.featured)

    const paginatedPosts = regularPosts.slice(
        (currentPage - 1) * postsPerPage,
        currentPage * postsPerPage
    )

    const totalPages = Math.ceil(regularPosts.length / postsPerPage)

    return (
        <div className="min-h-screen pt-24 pb-20">
            <div className="container">
                {/* Header */}
                <motion.div
                    className="text-center mb-12"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <Badge variant="primary" className="mb-4">
                        <BookOpen className="w-3 h-3 mr-1" />
                        Blog
                    </Badge>
                    <h1 className="text-4xl sm:text-5xl font-bold mb-4">
                        Insights & <span className="gradient-text">Articles</span>
                    </h1>
                    <p className="text-muted max-w-2xl mx-auto">
                        Tutorials, guides, and thoughts on Discord bot development, Python automation, and web development.
                    </p>
                </motion.div>

                {/* Search & Filters */}
                <motion.div
                    className="flex flex-col sm:flex-row gap-4 mb-12"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                >
                    <div className="relative flex-1">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
                        <input
                            type="text"
                            placeholder="Search articles..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/70 border border-black/[0.08] outline-none focus:ring-2 focus:ring-accent-primary/20"
                        />
                    </div>
                    <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0">
                        {categories.map((category) => (
                            <button
                                key={category}
                                className={cn(
                                    'px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all',
                                    selectedCategory === category
                                        ? 'bg-accent-primary text-white'
                                        : 'bg-white/70 border border-black/[0.08] hover:border-accent-primary/30'
                                )}
                                onClick={() => {
                                    setSelectedCategory(category)
                                    setCurrentPage(1)
                                }}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </motion.div>

                {/* Featured Posts */}
                {featuredPosts.length > 0 && (
                    <div className="mb-12">
                        <h2 className="text-xl font-bold mb-6">Featured Articles</h2>
                        <div className="space-y-6">
                            {featuredPosts.slice(0, 2).map((post) => (
                                <BlogPostCard key={post.id} post={post} variant="featured" />
                            ))}
                        </div>
                    </div>
                )}

                {/* Regular Posts Grid */}
                <div className="mb-12">
                    <h2 className="text-xl font-bold mb-6">All Articles</h2>
                    {paginatedPosts.length > 0 ? (
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {paginatedPosts.map((post) => (
                                <BlogPostCard key={post.id} post={post} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <p className="text-muted">No articles found matching your criteria.</p>
                        </div>
                    )}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="flex items-center justify-center gap-2">
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                            disabled={currentPage === 1}
                        >
                            <ArrowLeft className="w-4 h-4" />
                        </Button>
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                            <button
                                key={page}
                                className={cn(
                                    'w-10 h-10 rounded-xl text-sm font-medium transition-colors',
                                    currentPage === page
                                        ? 'bg-accent-primary text-white'
                                        : 'hover:bg-black/[0.03]'
                                )}
                                onClick={() => setCurrentPage(page)}
                            >
                                {page}
                            </button>
                        ))}
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                            disabled={currentPage === totalPages}
                        >
                            <ArrowRight className="w-4 h-4" />
                        </Button>
                    </div>
                )}
            </div>
        </div>
    )
}
