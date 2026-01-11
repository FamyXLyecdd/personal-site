'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import {
    Newspaper,
    TrendingUp,
    Clock,
    Share2,
    Bookmark,
    MessageSquare,
    Search,
    Menu,
    Bell,
    User,
    ChevronRight,
    Play,
    MoreHorizontal,
    ThumbsUp,
    Eye,
    Hash,
    Filter,
    ArrowRight,
} from 'lucide-react'

// ========================================
// TYPES
// ========================================

interface Article {
    id: string
    title: string
    excerpt: string
    category: string
    author: {
        name: string
        avatar: string
    }
    image: string
    date: string
    readTime: string
    views: string
    likes: number
    featured?: boolean
    trending?: boolean
}

// ========================================
// SAMPLE DATA
// ========================================

const articles: Article[] = [
    {
        id: 'a1',
        title: 'The Future of AI: How Artificial Intelligence is Transforming Industries',
        excerpt: 'From healthcare to finance, AI is revolutionizing the way we work and live. Explore the potential impacts and ethical considerations.',
        category: 'Technology',
        author: { name: 'Sarah Connor', avatar: '👩‍💻' },
        image: '🤖',
        date: '2 hours ago',
        readTime: '5 min read',
        views: '12.5K',
        likes: 1240,
        featured: true,
    },
    {
        id: 'a2',
        title: 'Global Markets Rally as Inflation Showing Signs of Cooling Down',
        excerpt: 'Stock markets hit new highs this week as economic data suggests inflation is finally under control.',
        category: 'Finance',
        author: { name: 'Michael Ross', avatar: '👨‍💼' },
        image: '📈',
        date: '4 hours ago',
        readTime: '3 min read',
        views: '8.2K',
        likes: 850,
        trending: true,
    },
    {
        id: 'a3',
        title: 'Minimalist Living: A Guide to Decluttering Your Home and Mind',
        excerpt: 'Discover the benefits of minimalism and practical tips to simplify your life for better mental clarity.',
        category: 'Lifestyle',
        author: { name: 'Emma Green', avatar: '🌿' },
        image: '🏡',
        date: '6 hours ago',
        readTime: '6 min read',
        views: '5.1K',
        likes: 2100,
    },
    {
        id: 'a4',
        title: 'SpaceX Successful Launch Marks New Era for Commercial Space Travel',
        excerpt: 'The latest Starship mission achieved all objectives, paving the way for future Mars expeditions.',
        category: 'Science',
        author: { name: 'Elon M.', avatar: '🚀' },
        image: '🌌',
        date: '1 hour ago',
        readTime: '4 min read',
        views: '25K',
        likes: 5400,
        trending: true,
    },
    {
        id: 'a5',
        title: 'Healthy Eating on a Budget: 10 Nutritious Meals Under $5',
        excerpt: 'Eating healthy doesn\'t have to be expensive. Check out these delicious and affordable recipes.',
        category: 'Health',
        author: { name: 'Chef Jamie', avatar: '👨‍🍳' },
        image: '🥗',
        date: '8 hours ago',
        readTime: '7 min read',
        views: '15K',
        likes: 3200,
    },
]

const categories = ['All', 'Technology', 'Finance', 'Science', 'Health', 'Lifestyle', 'Entertainment', 'Sports']

// ========================================
// HEADER
// ========================================

function Header() {
    return (
        <header className="border-b border-gray-200 bg-white sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                <div className="flex items-center gap-8">
                    <Link href="/demos/news-portal" className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center text-white font-bold">N</div>
                        <span className="text-xl font-bold tracking-tight">NewsDaily</span>
                    </Link>
                    <nav className="hidden md:flex items-center gap-6">
                        {['World', 'Politics', 'Business', 'Tech', 'Science', 'Health'].map(link => (
                            <a key={link} href="#" className="text-sm font-medium text-gray-600 hover:text-red-600 transition-colors">
                                {link}
                            </a>
                        ))}
                    </nav>
                </div>

                <div className="flex items-center gap-4">
                    <div className="relative hidden lg:block">
                        <input
                            type="text"
                            placeholder="Search news..."
                            className="bg-gray-100 px-4 py-2 pl-10 rounded-full text-sm outline-none focus:ring-2 focus:ring-red-500 w-64"
                        />
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    </div>
                    <button className="p-2 hover:bg-gray-100 rounded-full relative">
                        <Bell className="w-5 h-5 text-gray-600" />
                        <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
                    </button>
                    <button className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center font-bold text-gray-600">
                        JD
                    </button>
                </div>
            </div>
        </header>
    )
}

// ========================================
// FEATURED ARTICLE
// ========================================

function FeaturedArticle({ article }: { article: Article }) {
    return (
        <section className="py-8">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid lg:grid-cols-2 gap-8 items-center bg-gray-50 rounded-3xl p-6 lg:p-12">
                    <div className="order-2 lg:order-1">
                        <span className="text-red-600 font-bold tracking-wider text-sm uppercase mb-3 block">
                            Featured Story
                        </span>
                        <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
                            {article.title}
                        </h1>
                        <p className="text-xl text-gray-600 mb-6">
                            {article.excerpt}
                        </p>
                        <div className="flex items-center gap-4 mb-8">
                            <div className="flex items-center gap-2">
                                <span className="text-2xl">{article.author.avatar}</span>
                                <span className="font-medium">{article.author.name}</span>
                            </div>
                            <span className="text-gray-300">•</span>
                            <span className="text-gray-500">{article.date}</span>
                            <span className="text-gray-300">•</span>
                            <span className="text-gray-500">{article.readTime}</span>
                        </div>
                        <button className="px-8 py-3 bg-gray-900 text-white rounded-full font-medium hover:bg-black transition-colors flex items-center gap-2">
                            Read Full Story <ArrowRight className="w-4 h-4" />
                        </button>
                    </div>
                    <div className="order-1 lg:order-2">
                        <div className="aspect-[4/3] bg-gradient-to-br from-gray-200 to-gray-300 rounded-2xl flex items-center justify-center text-9xl shadow-lg">
                            {article.image}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

// ========================================
// ARTICLE CARD
// ========================================

function ArticleCard({ article }: { article: Article }) {
    return (
        <motion.div
            className="group flex flex-col h-full"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
        >
            <div className="aspect-video bg-gray-100 rounded-xl mb-4 overflow-hidden relative">
                <div className="absolute inset-0 flex items-center justify-center text-6xl group-hover:scale-105 transition-transform duration-500">
                    {article.image}
                </div>
                <span className="absolute top-3 left-3 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-gray-900">
                    {article.category}
                </span>
            </div>
            <div className="flex-1">
                <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                    <span>{article.date}</span>
                    <span>•</span>
                    <span>{article.readTime}</span>
                </div>
                <h3 className="text-xl font-bold mb-2 group-hover:text-red-600 transition-colors line-clamp-2">
                    {article.title}
                </h3>
                <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                    {article.excerpt}
                </p>
            </div>
            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div className="flex items-center gap-2 text-sm font-medium">
                    <span>{article.author.name}</span>
                </div>
                <div className="flex gap-3 text-gray-400">
                    <button className="hover:text-red-600"><Bookmark className="w-4 h-4" /></button>
                    <button className="hover:text-blue-600"><Share2 className="w-4 h-4" /></button>
                </div>
            </div>
        </motion.div>
    )
}

// ========================================
// TRENDING SIDEBAR
// ========================================

function TrendingSidebar() {
    const trendingArticles = articles.filter(a => a.trending || a.likes > 2000)

    return (
        <aside className="lg:w-80 flex-shrink-0">
            <div className="sticky top-24">
                <div className="bg-white border boundary-gray-200 rounded-2xl p-6 mb-8">
                    <h3 className="font-bold text-lg mb-6 flex items-center gap-2">
                        <TrendingUp className="w-5 h-5 text-red-600" /> Trending Now
                    </h3>
                    <div className="space-y-6">
                        {trendingArticles.map((article, index) => (
                            <div key={article.id} className="flex gap-4 group cursor-pointer">
                                <span className="text-3xl font-bold text-gray-200 group-hover:text-red-100 transition-colors">
                                    0{index + 1}
                                </span>
                                <div>
                                    <h4 className="font-bold text-sm mb-1 group-hover:text-red-600 transition-colors line-clamp-2">
                                        {article.title}
                                    </h4>
                                    <p className="text-xs text-gray-500">{article.views} views</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-gray-900 rounded-2xl p-6 text-white text-center">
                    <h4 className="font-bold text-lg mb-2">Subscribe to NewsDaily</h4>
                    <p className="text-gray-400 text-sm mb-4">Get the latest headlines delivered to your inbox daily.</p>
                    <input
                        type="email"
                        placeholder="Your email address"
                        className="w-full bg-gray-800 border-none rounded-lg px-4 py-3 mb-3 text-sm focus:ring-2 focus:ring-red-600"
                    />
                    <button className="w-full bg-red-600 text-white font-bold py-3 rounded-lg hover:bg-red-700 transition-colors">
                        Subscribe
                    </button>
                </div>
            </div>
        </aside>
    )
}

// ========================================
// PAGE
// ========================================

export default function NewsPortalPage() {
    const featured = articles.find(a => a.featured) || articles[0]

    return (
        <div className="min-h-screen bg-white">
            <Header />
            <FeaturedArticle article={featured} />

            <main className="max-w-7xl mx-auto px-6 py-12">
                <div className="flex flex-col lg:flex-row gap-12">
                    {/* Main Content */}
                    <div className="flex-1">
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-2xl font-bold">Latest News</h2>
                            <div className="flex gap-2">
                                {categories.slice(0, 4).map(cat => (
                                    <button
                                        key={cat}
                                        className="px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-100 transition-colors"
                                    >
                                        {cat}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-8 mb-12">
                            {articles.map(article => (
                                <ArticleCard key={article.id} article={article} />
                            ))}
                        </div>

                        <button className="w-full py-4 border border-gray-200 rounded-xl font-bold text-gray-600 hover:bg-gray-50 transition-colors">
                            Load More Stories
                        </button>
                    </div>

                    <TrendingSidebar />
                </div>
            </main>

            <footer className="bg-gray-50 border-t border-gray-200 py-12">
                <div className="max-w-7xl mx-auto px-6 text-center text-gray-500 text-sm">
                    <p>© 2025 NewsDaily. All rights reserved. Demo by YourName.</p>
                </div>
            </footer>
        </div>
    )
}
