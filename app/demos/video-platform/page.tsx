'use client'

import { useState, useEffect, useRef, useMemo } from 'react'
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion'
import Link from 'next/link'
import {
    Play,
    Pause,
    Volume2,
    VolumeX,
    Maximize,
    Minimize,
    SkipBack,
    SkipForward,
    ChevronDown,
    ChevronUp,
    Heart,
    Share2,
    Clock,
    Calendar,
    Eye,
    ThumbsUp,
    MessageSquare,
    Bookmark,
    Check,
    X,
    Menu,
    Search,
    Bell,
    User,
    Home,
    Compass,
    Film,
    Music2,
    Gamepad2,
    Trophy,
    Zap,
    Settings,
    LogOut,
    ChevronLeft,
    ChevronRight,
    MoreVertical,
    Download,
    Flag,
    ListPlus,
} from 'lucide-react'

// ========================================
// TYPES
// ========================================

interface Video {
    id: string
    title: string
    thumbnail: string
    duration: string
    views: string
    uploadedAt: string
    channel: {
        name: string
        avatar: string
        subscribers: string
        verified: boolean
    }
    category: string
    description?: string
    likes?: string
    comments?: number
}

// ========================================
// SAMPLE DATA
// ========================================

const videos: Video[] = [
    {
        id: 'v1',
        title: 'Building a Full-Stack App with Next.js 15 - Complete Tutorial',
        thumbnail: '🎬',
        duration: '2:45:30',
        views: '1.2M views',
        uploadedAt: '2 weeks ago',
        channel: {
            name: 'CodeMaster Pro',
            avatar: '👨‍💻',
            subscribers: '2.5M subscribers',
            verified: true,
        },
        category: 'Programming',
        description: 'Learn how to build a complete full-stack application using Next.js 15, TypeScript, and PostgreSQL. We cover everything from setup to deployment.',
        likes: '45K',
        comments: 2341,
    },
    {
        id: 'v2',
        title: 'I Built a $10,000/month SaaS in 30 Days - Heres How',
        thumbnail: '💰',
        duration: '32:15',
        views: '890K views',
        uploadedAt: '3 days ago',
        channel: {
            name: 'Indie Hackers',
            avatar: '🚀',
            subscribers: '1.8M subscribers',
            verified: true,
        },
        category: 'Business',
        likes: '32K',
        comments: 1567,
    },
    {
        id: 'v3',
        title: 'The ULTIMATE Guide to Modern CSS in 2025',
        thumbnail: '🎨',
        duration: '1:15:45',
        views: '654K views',
        uploadedAt: '1 week ago',
        channel: {
            name: 'CSS Wizard',
            avatar: '✨',
            subscribers: '890K subscribers',
            verified: true,
        },
        category: 'Web Design',
        likes: '28K',
        comments: 892,
    },
    {
        id: 'v4',
        title: 'React vs Vue vs Angular - Which One Should You Learn?',
        thumbnail: '⚔️',
        duration: '45:20',
        views: '2.1M views',
        uploadedAt: '1 month ago',
        channel: {
            name: 'Tech Compare',
            avatar: '📊',
            subscribers: '3.2M subscribers',
            verified: true,
        },
        category: 'Programming',
        likes: '89K',
        comments: 4532,
    },
    {
        id: 'v5',
        title: '10 VS Code Extensions That Will 10x Your Productivity',
        thumbnail: '🔧',
        duration: '18:42',
        views: '1.5M views',
        uploadedAt: '5 days ago',
        channel: {
            name: 'Dev Tools',
            avatar: '🛠️',
            subscribers: '1.1M subscribers',
            verified: false,
        },
        category: 'Tools',
        likes: '56K',
        comments: 1234,
    },
    {
        id: 'v6',
        title: 'TypeScript Best Practices - Stop Making These Mistakes',
        thumbnail: '📘',
        duration: '28:33',
        views: '432K views',
        uploadedAt: '2 days ago',
        channel: {
            name: 'TypeScript Guru',
            avatar: '🎯',
            subscribers: '567K subscribers',
            verified: true,
        },
        category: 'Programming',
        likes: '21K',
        comments: 567,
    },
    {
        id: 'v7',
        title: 'How I Made My First $1 Million From Coding',
        thumbnail: '💎',
        duration: '52:18',
        views: '3.4M views',
        uploadedAt: '2 months ago',
        channel: {
            name: 'Success Stories',
            avatar: '🌟',
            subscribers: '4.5M subscribers',
            verified: true,
        },
        category: 'Inspiration',
        likes: '234K',
        comments: 8921,
    },
    {
        id: 'v8',
        title: 'Docker & Kubernetes Crash Course for Beginners',
        thumbnail: '🐳',
        duration: '1:45:00',
        views: '789K views',
        uploadedAt: '3 weeks ago',
        channel: {
            name: 'DevOps Academy',
            avatar: '☁️',
            subscribers: '920K subscribers',
            verified: true,
        },
        category: 'DevOps',
        likes: '34K',
        comments: 1023,
    },
]

const categories = ['All', 'Programming', 'Web Design', 'Business', 'DevOps', 'Tools', 'Inspiration']

// ========================================
// SIDEBAR
// ========================================

function Sidebar({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
    const menuItems = [
        { icon: <Home className="w-5 h-5" />, label: 'Home', active: true },
        { icon: <Compass className="w-5 h-5" />, label: 'Explore' },
        { icon: <Film className="w-5 h-5" />, label: 'Shorts' },
        { icon: <Music2 className="w-5 h-5" />, label: 'Music' },
        { icon: <Gamepad2 className="w-5 h-5" />, label: 'Gaming' },
        { icon: <Trophy className="w-5 h-5" />, label: 'Trending' },
    ]

    const yourItems = [
        { icon: <Clock className="w-5 h-5" />, label: 'History' },
        { icon: <Heart className="w-5 h-5" />, label: 'Liked videos' },
        { icon: <Bookmark className="w-5 h-5" />, label: 'Watch later' },
        { icon: <Download className="w-5 h-5" />, label: 'Downloads' },
    ]

    const subscriptions = [
        { name: 'CodeMaster Pro', avatar: '👨‍💻', live: false },
        { name: 'Indie Hackers', avatar: '🚀', live: true },
        { name: 'CSS Wizard', avatar: '✨', live: false },
        { name: 'Tech Compare', avatar: '📊', live: false },
    ]

    return (
        <>
            {/* Mobile overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                    />
                )}
            </AnimatePresence>

            <motion.aside
                className={`fixed lg:sticky top-0 left-0 z-50 lg:z-auto h-screen w-64 bg-white border-r border-gray-200 overflow-y-auto transform transition-transform lg:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'
                    }`}
            >
                <div className="p-4">
                    {/* Logo */}
                    <div className="flex items-center gap-2 mb-6">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center">
                            <Play className="w-5 h-5 text-white fill-white" />
                        </div>
                        <span className="text-xl font-bold">VideoHub</span>
                    </div>

                    {/* Main menu */}
                    <nav className="space-y-1 mb-6">
                        {menuItems.map((item) => (
                            <button
                                key={item.label}
                                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors ${item.active
                                        ? 'bg-gray-100 text-black font-medium'
                                        : 'text-gray-600 hover:bg-gray-50'
                                    }`}
                            >
                                {item.icon}
                                {item.label}
                            </button>
                        ))}
                    </nav>

                    <hr className="my-4" />

                    {/* Your stuff */}
                    <p className="px-3 text-sm font-medium text-gray-500 mb-2">You</p>
                    <nav className="space-y-1 mb-6">
                        {yourItems.map((item) => (
                            <button
                                key={item.label}
                                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-gray-600 hover:bg-gray-50 transition-colors"
                            >
                                {item.icon}
                                {item.label}
                            </button>
                        ))}
                    </nav>

                    <hr className="my-4" />

                    {/* Subscriptions */}
                    <p className="px-3 text-sm font-medium text-gray-500 mb-2">Subscriptions</p>
                    <nav className="space-y-1">
                        {subscriptions.map((channel) => (
                            <button
                                key={channel.name}
                                className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-gray-600 hover:bg-gray-50 transition-colors"
                            >
                                <div className="relative">
                                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center text-lg">
                                        {channel.avatar}
                                    </div>
                                    {channel.live && (
                                        <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-red-500 rounded-full border-2 border-white" />
                                    )}
                                </div>
                                <span className="truncate text-sm">{channel.name}</span>
                            </button>
                        ))}
                    </nav>
                </div>
            </motion.aside>
        </>
    )
}

// ========================================
// HEADER
// ========================================

function Header({ onMenuClick }: { onMenuClick: () => void }) {
    const [searchQuery, setSearchQuery] = useState('')

    return (
        <header className="sticky top-0 z-30 bg-white border-b border-gray-200 px-4 py-3">
            <div className="flex items-center justify-between gap-4">
                {/* Left */}
                <div className="flex items-center gap-4">
                    <button
                        className="p-2 hover:bg-gray-100 rounded-full lg:hidden"
                        onClick={onMenuClick}
                    >
                        <Menu className="w-6 h-6" />
                    </button>
                    <div className="hidden lg:flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center">
                            <Play className="w-4 h-4 text-white fill-white" />
                        </div>
                        <span className="font-bold">VideoHub</span>
                    </div>
                </div>

                {/* Search */}
                <div className="flex-1 max-w-2xl">
                    <div className="flex">
                        <div className="relative flex-1">
                            <input
                                type="text"
                                placeholder="Search"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full px-4 py-2.5 rounded-l-full border border-gray-300 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                            />
                        </div>
                        <button className="px-6 py-2.5 bg-gray-100 border border-l-0 border-gray-300 rounded-r-full hover:bg-gray-200 transition-colors">
                            <Search className="w-5 h-5 text-gray-600" />
                        </button>
                    </div>
                </div>

                {/* Right */}
                <div className="flex items-center gap-2">
                    <button className="p-2 hover:bg-gray-100 rounded-full">
                        <Zap className="w-6 h-6" />
                    </button>
                    <button className="p-2 hover:bg-gray-100 rounded-full relative">
                        <Bell className="w-6 h-6" />
                        <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
                    </button>
                    <button className="w-9 h-9 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-sm">
                        Y
                    </button>
                </div>
            </div>
        </header>
    )
}

// ========================================
// VIDEO CARD
// ========================================

function VideoCard({ video, variant = 'default' }: { video: Video; variant?: 'default' | 'horizontal' }) {
    const [isHovered, setIsHovered] = useState(false)

    if (variant === 'horizontal') {
        return (
            <motion.div
                className="group flex gap-3 cursor-pointer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <div className="relative w-40 aspect-video rounded-xl overflow-hidden flex-shrink-0 bg-gray-100">
                    <div className="absolute inset-0 flex items-center justify-center text-4xl">
                        {video.thumbnail}
                    </div>
                    <div className="absolute bottom-1 right-1 px-1.5 py-0.5 bg-black/80 text-white text-xs rounded">
                        {video.duration}
                    </div>
                </div>
                <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-sm line-clamp-2 group-hover:text-blue-600 transition-colors">
                        {video.title}
                    </h3>
                    <p className="text-xs text-gray-500 mt-1">{video.channel.name}</p>
                    <p className="text-xs text-gray-500">{video.views} • {video.uploadedAt}</p>
                </div>
            </motion.div>
        )
    }

    return (
        <motion.div
            className="group cursor-pointer"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="relative aspect-video rounded-xl overflow-hidden bg-gray-100 mb-3">
                <motion.div
                    className="absolute inset-0 flex items-center justify-center text-7xl"
                    animate={{ scale: isHovered ? 1.05 : 1 }}
                    transition={{ duration: 0.3 }}
                >
                    {video.thumbnail}
                </motion.div>
                <div className="absolute bottom-2 right-2 px-2 py-0.5 bg-black/80 text-white text-xs rounded">
                    {video.duration}
                </div>
                {isHovered && (
                    <motion.div
                        className="absolute inset-0 bg-black/20 flex items-center justify-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                    >
                        <div className="w-14 h-14 rounded-full bg-black/60 flex items-center justify-center">
                            <Play className="w-6 h-6 text-white fill-white ml-1" />
                        </div>
                    </motion.div>
                )}
            </div>

            <div className="flex gap-3">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center text-lg flex-shrink-0">
                    {video.channel.avatar}
                </div>
                <div className="flex-1 min-w-0">
                    <h3 className="font-medium line-clamp-2 group-hover:text-blue-600 transition-colors">
                        {video.title}
                    </h3>
                    <div className="flex items-center gap-1 mt-1">
                        <p className="text-sm text-gray-500">{video.channel.name}</p>
                        {video.channel.verified && (
                            <Check className="w-3.5 h-3.5 text-gray-500" />
                        )}
                    </div>
                    <p className="text-sm text-gray-500">{video.views} • {video.uploadedAt}</p>
                </div>
                <button className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-gray-100 rounded-full h-fit">
                    <MoreVertical className="w-5 h-5" />
                </button>
            </div>
        </motion.div>
    )
}

// ========================================
// CATEGORY PILLS
// ========================================

function CategoryPills({ selected, onSelect }: { selected: string; onSelect: (cat: string) => void }) {
    const scrollRef = useRef<HTMLDivElement>(null)
    const [showLeftArrow, setShowLeftArrow] = useState(false)
    const [showRightArrow, setShowRightArrow] = useState(true)

    const scroll = (direction: 'left' | 'right') => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({
                left: direction === 'left' ? -200 : 200,
                behavior: 'smooth',
            })
        }
    }

    return (
        <div className="relative mb-6">
            {showLeftArrow && (
                <button
                    className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white shadow-lg rounded-full flex items-center justify-center"
                    onClick={() => scroll('left')}
                >
                    <ChevronLeft className="w-5 h-5" />
                </button>
            )}

            <div
                ref={scrollRef}
                className="flex gap-3 overflow-x-auto scrollbar-hide px-1"
                onScroll={(e) => {
                    const target = e.target as HTMLDivElement
                    setShowLeftArrow(target.scrollLeft > 0)
                    setShowRightArrow(target.scrollLeft < target.scrollWidth - target.clientWidth - 10)
                }}
            >
                {categories.map((category) => (
                    <button
                        key={category}
                        className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${selected === category
                                ? 'bg-black text-white'
                                : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                            }`}
                        onClick={() => onSelect(category)}
                    >
                        {category}
                    </button>
                ))}
            </div>

            {showRightArrow && (
                <button
                    className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white shadow-lg rounded-full flex items-center justify-center"
                    onClick={() => scroll('right')}
                >
                    <ChevronRight className="w-5 h-5" />
                </button>
            )}
        </div>
    )
}

// ========================================
// SHORTS SECTION
// ========================================

function ShortsSection() {
    const shorts = [
        { id: 1, emoji: '😂', views: '2.3M' },
        { id: 2, emoji: '🔥', views: '1.8M' },
        { id: 3, emoji: '💡', views: '956K' },
        { id: 4, emoji: '🎮', views: '1.2M' },
        { id: 5, emoji: '🎵', views: '3.1M' },
    ]

    return (
        <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-red-500 flex items-center justify-center">
                    <Zap className="w-4 h-4 text-white" />
                </div>
                <h2 className="text-xl font-bold">Shorts</h2>
            </div>
            <div className="flex gap-4 overflow-x-auto pb-2">
                {shorts.map((short) => (
                    <motion.div
                        key={short.id}
                        className="w-40 aspect-[9/16] rounded-xl bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center text-6xl flex-shrink-0 relative cursor-pointer group"
                        whileHover={{ scale: 1.02 }}
                    >
                        {short.emoji}
                        <div className="absolute bottom-2 left-2 right-2 text-white text-sm font-medium">
                            {short.views} views
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    )
}

// ========================================
// MAIN PAGE
// ========================================

export default function VideoHubPage() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)
    const [selectedCategory, setSelectedCategory] = useState('All')

    const filteredVideos = useMemo(() => {
        if (selectedCategory === 'All') return videos
        return videos.filter((v) => v.category === selectedCategory)
    }, [selectedCategory])

    return (
        <div className="min-h-screen bg-white flex">
            <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

            <div className="flex-1 flex flex-col">
                <Header onMenuClick={() => setIsSidebarOpen(true)} />

                <main className="flex-1 p-6">
                    <CategoryPills selected={selectedCategory} onSelect={setSelectedCategory} />
                    <ShortsSection />

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {filteredVideos.map((video) => (
                            <VideoCard key={video.id} video={video} />
                        ))}
                    </div>

                    <div className="text-center mt-12 text-gray-500 text-sm">
                        Demo by{' '}
                        <Link href="/" className="text-red-500 hover:underline">
                            YourName
                        </Link>
                    </div>
                </main>
            </div>
        </div>
    )
}
