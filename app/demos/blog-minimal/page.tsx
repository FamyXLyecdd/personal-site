'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import {
    Search,
    Menu,
    X,
    Clock,
    Calendar,
    ArrowRight,
    Tag,
    User,
    ChevronRight,
    Twitter,
    Linkedin,
    Facebook,
    Link2,
    BookOpen,
    TrendingUp,
    Star,
} from 'lucide-react'

// ========================================
// TYPES
// ========================================

interface BlogPost {
    id: number
    title: string
    excerpt: string
    content: string
    author: string
    authorAvatar: string
    date: string
    readTime: number
    category: string
    tags: string[]
    image: string
    featured?: boolean
}

// ========================================
// SAMPLE DATA
// ========================================

const blogPosts: BlogPost[] = [
    {
        id: 1,
        title: 'The Future of AI in Web Development: What Developers Need to Know',
        excerpt: 'Explore how artificial intelligence is transforming the way we build websites and applications, from code generation to user experience optimization.',
        content: '',
        author: 'Alex Johnson',
        authorAvatar: '👨‍💻',
        date: 'Jan 15, 2025',
        readTime: 8,
        category: 'Technology',
        tags: ['AI', 'Web Development', 'Future Tech'],
        image: '🤖',
        featured: true,
    },
    {
        id: 2,
        title: 'Building Scalable Design Systems for Growing Teams',
        excerpt: 'Learn the best practices for creating and maintaining design systems that scale with your organization.',
        content: '',
        author: 'Sarah Chen',
        authorAvatar: '👩‍🎨',
        date: 'Jan 12, 2025',
        readTime: 6,
        category: 'Design',
        tags: ['Design Systems', 'UI/UX', 'Teams'],
        image: '🎨',
    },
    {
        id: 3,
        title: 'Next.js 15: Everything You Need to Know About the Latest Features',
        excerpt: 'A comprehensive guide to the new features and improvements in Next.js 15, including performance enhancements and developer experience improvements.',
        content: '',
        author: 'Mike Williams',
        authorAvatar: '👨‍🔬',
        date: 'Jan 10, 2025',
        readTime: 10,
        category: 'Development',
        tags: ['Next.js', 'React', 'JavaScript'],
        image: '⚛️',
        featured: true,
    },
    {
        id: 4,
        title: 'The Psychology of User Interfaces: Why Some Apps Feel Better',
        excerpt: 'Discover the psychological principles behind great user interfaces and how to apply them in your designs.',
        content: '',
        author: 'Emily Davis',
        authorAvatar: '👩‍💼',
        date: 'Jan 8, 2025',
        readTime: 7,
        category: 'UX',
        tags: ['Psychology', 'UI/UX', 'User Research'],
        image: '🧠',
    },
    {
        id: 5,
        title: 'From Junior to Senior: A Roadmap for Developer Career Growth',
        excerpt: 'Practical advice and strategies for advancing your career as a software developer, from building skills to leadership.',
        content: '',
        author: 'David Kim',
        authorAvatar: '👨‍💼',
        date: 'Jan 5, 2025',
        readTime: 12,
        category: 'Career',
        tags: ['Career', 'Growth', 'Programming'],
        image: '🚀',
    },
    {
        id: 6,
        title: 'Mastering CSS Grid: Advanced Layout Techniques',
        excerpt: 'Take your CSS Grid skills to the next level with these advanced techniques and real-world examples.',
        content: '',
        author: 'Lisa Park',
        authorAvatar: '👩‍💻',
        date: 'Jan 3, 2025',
        readTime: 9,
        category: 'CSS',
        tags: ['CSS', 'Layout', 'Frontend'],
        image: '📐',
    },
]

const categories = ['All', 'Technology', 'Design', 'Development', 'UX', 'Career', 'CSS']

// ========================================
// NAVIGATION
// ========================================

function Navigation() {
    const [isOpen, setIsOpen] = useState(false)
    const [searchOpen, setSearchOpen] = useState(false)

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100">
            <div className="max-w-6xl mx-auto px-6 py-4">
                <div className="flex items-center justify-between">
                    <Link href="/demos/blog-minimal" className="text-2xl font-serif font-bold">
                        Blog<span className="text-amber-500">.</span>
                    </Link>

                    <div className="hidden md:flex items-center gap-8">
                        {['Articles', 'Categories', 'About', 'Newsletter'].map((link) => (
                            <a
                                key={link}
                                href={`#${link.toLowerCase()}`}
                                className="text-gray-600 hover:text-black transition-colors"
                            >
                                {link}
                            </a>
                        ))}
                    </div>

                    <div className="flex items-center gap-4">
                        <button
                            className="p-2 hover:bg-gray-100 rounded-full"
                            onClick={() => setSearchOpen(!searchOpen)}
                        >
                            <Search className="w-5 h-5" />
                        </button>
                        <button className="hidden md:block px-5 py-2 bg-black text-white rounded-full hover:bg-gray-800 text-sm font-medium">
                            Subscribe
                        </button>
                        <button className="md:hidden p-2" onClick={() => setIsOpen(!isOpen)}>
                            {isOpen ? <X /> : <Menu />}
                        </button>
                    </div>
                </div>

                {/* Search bar */}
                <AnimatePresence>
                    {searchOpen && (
                        <motion.div
                            className="mt-4"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                        >
                            <input
                                type="text"
                                placeholder="Search articles..."
                                className="w-full px-4 py-3 rounded-xl bg-gray-100 outline-none focus:ring-2 focus:ring-amber-500"
                                autoFocus
                            />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </nav>
    )
}

// ========================================
// FEATURED POST
// ========================================

function FeaturedPost({ post }: { post: BlogPost }) {
    return (
        <motion.article
            className="grid md:grid-cols-2 gap-8 items-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
        >
            <div className="aspect-[4/3] bg-gradient-to-br from-amber-100 to-orange-100 rounded-3xl flex items-center justify-center text-9xl">
                {post.image}
            </div>
            <div>
                <div className="flex items-center gap-3 mb-4">
                    <span className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-sm font-medium">
                        {post.category}
                    </span>
                    <span className="text-gray-500 text-sm flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {post.readTime} min read
                    </span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-serif font-bold mb-4 hover:text-amber-600 transition-colors cursor-pointer">
                    {post.title}
                </h2>
                <p className="text-gray-600 text-lg mb-6">{post.excerpt}</p>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-2xl">
                            {post.authorAvatar}
                        </div>
                        <div>
                            <p className="font-medium">{post.author}</p>
                            <p className="text-gray-500 text-sm">{post.date}</p>
                        </div>
                    </div>
                    <button className="flex items-center gap-2 text-amber-600 font-medium hover:gap-3 transition-all">
                        Read Article <ArrowRight className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </motion.article>
    )
}

// ========================================
// POST CARD
// ========================================

function PostCard({ post, index }: { post: BlogPost; index: number }) {
    return (
        <motion.article
            className="group"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
        >
            <div className="aspect-[3/2] bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center text-6xl mb-5 group-hover:shadow-xl transition-shadow">
                {post.image}
            </div>
            <div className="flex items-center gap-3 mb-3">
                <span className="px-2.5 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-medium">
                    {post.category}
                </span>
                <span className="text-gray-400 text-sm">{post.readTime} min</span>
            </div>
            <h3 className="text-xl font-serif font-bold mb-2 group-hover:text-amber-600 transition-colors cursor-pointer line-clamp-2">
                {post.title}
            </h3>
            <p className="text-gray-600 text-sm mb-4 line-clamp-2">{post.excerpt}</p>
            <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-lg">
                    {post.authorAvatar}
                </div>
                <div>
                    <p className="text-sm font-medium">{post.author}</p>
                    <p className="text-gray-400 text-xs">{post.date}</p>
                </div>
            </div>
        </motion.article>
    )
}

// ========================================
// NEWSLETTER
// ========================================

function Newsletter() {
    return (
        <section className="py-20 bg-gray-900 text-white">
            <div className="max-w-3xl mx-auto px-6 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <span className="text-amber-400 font-medium text-sm uppercase tracking-wider">Newsletter</span>
                    <h2 className="text-4xl font-serif font-bold mt-4 mb-4">
                        Stay Updated
                    </h2>
                    <p className="text-gray-400 text-lg mb-8">
                        Get the latest articles and insights delivered to your inbox. No spam, unsubscribe anytime.
                    </p>
                    <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="flex-1 px-5 py-4 rounded-xl bg-white/10 border border-white/20 outline-none focus:border-amber-400 text-white placeholder-gray-400"
                        />
                        <button className="px-8 py-4 bg-amber-500 text-black font-semibold rounded-xl hover:bg-amber-400 transition-colors">
                            Subscribe
                        </button>
                    </form>
                    <p className="text-gray-500 text-sm mt-4">
                        Join 5,000+ readers. We respect your privacy.
                    </p>
                </motion.div>
            </div>
        </section>
    )
}

// ========================================
// SIDEBAR
// ========================================

function Sidebar() {
    const popularPosts = blogPosts.slice(0, 3)
    const allTags = Array.from(new Set(blogPosts.flatMap((p) => p.tags)))

    return (
        <aside className="space-y-8">
            {/* About */}
            <div className="p-6 bg-gray-50 rounded-2xl">
                <h3 className="font-bold mb-4 flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-amber-500" />
                    About This Blog
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                    A place for developers, designers, and creators to learn, grow, and share knowledge about building amazing digital experiences.
                </p>
                <button className="text-amber-600 font-medium text-sm hover:underline">
                    Learn more →
                </button>
            </div>

            {/* Popular */}
            <div>
                <h3 className="font-bold mb-4 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-amber-500" />
                    Popular Articles
                </h3>
                <div className="space-y-4">
                    {popularPosts.map((post, index) => (
                        <div key={post.id} className="flex gap-4 group cursor-pointer">
                            <span className="text-3xl font-bold text-gray-200 group-hover:text-amber-400 transition-colors">
                                {String(index + 1).padStart(2, '0')}
                            </span>
                            <div>
                                <h4 className="font-medium text-sm group-hover:text-amber-600 transition-colors line-clamp-2">
                                    {post.title}
                                </h4>
                                <p className="text-gray-500 text-xs mt-1">{post.readTime} min read</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Tags */}
            <div>
                <h3 className="font-bold mb-4 flex items-center gap-2">
                    <Tag className="w-5 h-5 text-amber-500" />
                    Popular Tags
                </h3>
                <div className="flex flex-wrap gap-2">
                    {allTags.map((tag) => (
                        <button
                            key={tag}
                            className="px-3 py-1.5 bg-gray-100 hover:bg-amber-100 hover:text-amber-700 rounded-full text-sm transition-colors"
                        >
                            {tag}
                        </button>
                    ))}
                </div>
            </div>
        </aside>
    )
}

// ========================================
// FOOTER
// ========================================

function Footer() {
    return (
        <footer className="py-12 border-t border-gray-200">
            <div className="max-w-6xl mx-auto px-6">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="text-2xl font-serif font-bold">
                        Blog<span className="text-amber-500">.</span>
                    </div>
                    <div className="flex gap-4">
                        {[Twitter, Linkedin, Facebook, Link2].map((Icon, index) => (
                            <a
                                key={index}
                                href="#"
                                className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-amber-100 hover:text-amber-600 transition-colors"
                            >
                                <Icon className="w-5 h-5" />
                            </a>
                        ))}
                    </div>
                    <p className="text-gray-500 text-sm">
                        Demo by{' '}
                        <Link href="/" className="text-amber-600 hover:underline">
                            YourName
                        </Link>
                    </p>
                </div>
            </div>
        </footer>
    )
}

// ========================================
// MAIN PAGE
// ========================================

export default function BlogMinimalPage() {
    const [selectedCategory, setSelectedCategory] = useState('All')
    const featuredPost = blogPosts.find((p) => p.featured)

    const filteredPosts = selectedCategory === 'All'
        ? blogPosts.filter((p) => !p.featured)
        : blogPosts.filter((p) => p.category === selectedCategory && !p.featured)

    return (
        <div className="min-h-screen bg-white">
            <Navigation />

            <main className="pt-24">
                {/* Featured */}
                {featuredPost && (
                    <section className="max-w-6xl mx-auto px-6 py-16">
                        <div className="flex items-center gap-2 mb-8">
                            <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
                            <span className="text-sm font-medium text-gray-600">Featured Article</span>
                        </div>
                        <FeaturedPost post={featuredPost} />
                    </section>
                )}

                {/* Main content */}
                <section className="max-w-6xl mx-auto px-6 py-16">
                    <div className="flex flex-col lg:flex-row gap-12">
                        {/* Articles */}
                        <div className="flex-1">
                            {/* Categories */}
                            <div className="flex gap-2 overflow-x-auto pb-4 mb-8">
                                {categories.map((category) => (
                                    <button
                                        key={category}
                                        className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${selectedCategory === category
                                                ? 'bg-black text-white'
                                                : 'bg-gray-100 hover:bg-gray-200'
                                            }`}
                                        onClick={() => setSelectedCategory(category)}
                                    >
                                        {category}
                                    </button>
                                ))}
                            </div>

                            {/* Grid */}
                            <div className="grid md:grid-cols-2 gap-8">
                                {filteredPosts.map((post, index) => (
                                    <PostCard key={post.id} post={post} index={index} />
                                ))}
                            </div>

                            {/* Load more */}
                            <div className="text-center mt-12">
                                <button className="px-8 py-3 border-2 border-black rounded-full font-medium hover:bg-black hover:text-white transition-colors">
                                    Load More Articles
                                </button>
                            </div>
                        </div>

                        {/* Sidebar */}
                        <div className="lg:w-80">
                            <Sidebar />
                        </div>
                    </div>
                </section>

                <Newsletter />
            </main>

            <Footer />
        </div>
    )
}
