'use client'

import { useState, useRef, useEffect, useMemo } from 'react'
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from 'framer-motion'
import Link from 'next/link'
import {
    Home,
    Search,
    Heart,
    MessageCircle,
    Send,
    Bookmark,
    MoreHorizontal,
    PlusSquare,
    Settings,
    User,
    Compass,
    Film,
    Users,
    Bell,
    X,
    Camera,
    Image as ImageIcon,
    Smile,
    MapPin,
    ChevronLeft,
    ChevronRight,
    Play,
    Pause,
    Volume2,
    VolumeX,
    Share2,
    Copy,
    ExternalLink,
    Flag,
    UserMinus,
} from 'lucide-react'

// ========================================
// TYPES
// ========================================

interface Post {
    id: string
    user: {
        username: string
        avatar: string
        verified: boolean
    }
    content: {
        type: 'image' | 'video' | 'carousel'
        items: string[]
    }
    caption: string
    likes: number
    comments: number
    timestamp: string
    location?: string
    liked?: boolean
    saved?: boolean
}

interface Story {
    id: string
    username: string
    avatar: string
    viewed: boolean
}

interface User {
    id: string
    username: string
    name: string
    avatar: string
    bio: string
    posts: number
    followers: string
    following: number
    verified: boolean
}

// ========================================
// SAMPLE DATA
// ========================================

const stories: Story[] = [
    { id: 's1', username: 'your_story', avatar: '➕', viewed: false },
    { id: 's2', username: 'sarah_design', avatar: '👩‍🎨', viewed: false },
    { id: 's3', username: 'tech_mike', avatar: '👨‍💻', viewed: false },
    { id: 's4', username: 'travel_lisa', avatar: '✈️', viewed: true },
    { id: 's5', username: 'food_alex', avatar: '🍕', viewed: true },
    { id: 's6', username: 'fitness_sam', avatar: '💪', viewed: false },
    { id: 's7', username: 'music_beats', avatar: '🎵', viewed: true },
    { id: 's8', username: 'art_studio', avatar: '🎨', viewed: false },
]

const posts: Post[] = [
    {
        id: 'p1',
        user: { username: 'sarah_design', avatar: '👩‍🎨', verified: true },
        content: { type: 'image', items: ['🖼️'] },
        caption: 'Just finished this new UI design! What do you think? 🎨✨ #design #ui #creative',
        likes: 2453,
        comments: 89,
        timestamp: '2 hours ago',
        location: 'San Francisco, CA',
        liked: true,
    },
    {
        id: 'p2',
        user: { username: 'tech_mike', avatar: '👨‍💻', verified: false },
        content: { type: 'carousel', items: ['💻', '⚡', '🚀'] },
        caption: 'Swipe to see my coding setup evolution! From 2020 to 2025 🔥 #tech #coding #setup',
        likes: 5672,
        comments: 234,
        timestamp: '5 hours ago',
    },
    {
        id: 'p3',
        user: { username: 'travel_lisa', avatar: '✈️', verified: true },
        content: { type: 'image', items: ['🏝️'] },
        caption: 'Paradise found! 🌴 This place is absolutely breathtaking. #travel #vacation #beach',
        likes: 12456,
        comments: 567,
        timestamp: '1 day ago',
        location: 'Maldives',
    },
    {
        id: 'p4',
        user: { username: 'food_alex', avatar: '🍕', verified: false },
        content: { type: 'image', items: ['🍝'] },
        caption: 'Homemade pasta night! Recipe in bio 👨‍🍳 #food #cooking #homeChef',
        likes: 3421,
        comments: 156,
        timestamp: '3 hours ago',
        location: 'Home Kitchen',
    },
]

const suggestions: User[] = [
    { id: 'u1', username: 'design_daily', name: 'Design Daily', avatar: '🎨', bio: '', posts: 234, followers: '45K', following: 123, verified: true },
    { id: 'u2', username: 'code_tips', name: 'Code Tips', avatar: '💡', bio: '', posts: 567, followers: '120K', following: 89, verified: true },
    { id: 'u3', username: 'startup_life', name: 'Startup Life', avatar: '🚀', bio: '', posts: 123, followers: '23K', following: 456, verified: false },
    { id: 'u4', username: 'photo_master', name: 'Photo Master', avatar: '📷', bio: '', posts: 890, followers: '78K', following: 234, verified: true },
]

// ========================================
// SIDEBAR
// ========================================

function Sidebar() {
    const navItems = [
        { icon: <Home className="w-6 h-6" />, label: 'Home', active: true },
        { icon: <Search className="w-6 h-6" />, label: 'Search' },
        { icon: <Compass className="w-6 h-6" />, label: 'Explore' },
        { icon: <Film className="w-6 h-6" />, label: 'Reels' },
        { icon: <Send className="w-6 h-6" />, label: 'Messages', badge: 3 },
        { icon: <Bell className="w-6 h-6" />, label: 'Notifications' },
        { icon: <PlusSquare className="w-6 h-6" />, label: 'Create' },
        { icon: <User className="w-6 h-6" />, label: 'Profile' },
    ]

    return (
        <aside className="fixed left-0 top-0 bottom-0 w-[72px] xl:w-64 bg-white border-r border-gray-200 z-50 p-3">
            {/* Logo */}
            <div className="py-6 px-3">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 flex items-center justify-center text-white font-bold">
                        IG
                    </div>
                    <span className="hidden xl:block text-xl font-bold">Socialgram</span>
                </div>
            </div>

            {/* Navigation */}
            <nav className="space-y-1">
                {navItems.map((item) => (
                    <button
                        key={item.label}
                        className={`w-full flex items-center gap-4 px-3 py-3 rounded-xl transition-colors ${item.active
                                ? 'font-bold'
                                : 'hover:bg-gray-100'
                            }`}
                    >
                        <div className="relative">
                            {item.icon}
                            {item.badge && (
                                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                                    {item.badge}
                                </span>
                            )}
                        </div>
                        <span className="hidden xl:block">{item.label}</span>
                    </button>
                ))}
            </nav>

            {/* Settings */}
            <div className="absolute bottom-4 left-3 right-3">
                <button className="w-full flex items-center gap-4 px-3 py-3 rounded-xl hover:bg-gray-100 transition-colors">
                    <MoreHorizontal className="w-6 h-6" />
                    <span className="hidden xl:block">More</span>
                </button>
            </div>
        </aside>
    )
}

// ========================================
// STORIES
// ========================================

function Stories() {
    const scrollRef = useRef<HTMLDivElement>(null)

    return (
        <div className="bg-white border border-gray-200 rounded-lg mb-6 p-4">
            <div
                ref={scrollRef}
                className="flex gap-4 overflow-x-auto scrollbar-hide"
            >
                {stories.map((story, index) => (
                    <motion.button
                        key={story.id}
                        className="flex flex-col items-center gap-1 flex-shrink-0"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.05 }}
                    >
                        <div className={`p-0.5 rounded-full ${story.viewed
                                ? 'bg-gray-300'
                                : 'bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600'
                            }`}>
                            <div className="w-14 h-14 rounded-full bg-white p-0.5">
                                <div className="w-full h-full rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center text-2xl">
                                    {story.avatar}
                                </div>
                            </div>
                        </div>
                        <span className="text-xs truncate w-16 text-center">
                            {story.username === 'your_story' ? 'Your story' : story.username}
                        </span>
                    </motion.button>
                ))}
            </div>
        </div>
    )
}

// ========================================
// POST CARD
// ========================================

function PostCard({ post }: { post: Post }) {
    const [isLiked, setIsLiked] = useState(post.liked || false)
    const [isSaved, setIsSaved] = useState(post.saved || false)
    const [currentSlide, setCurrentSlide] = useState(0)
    const [showComments, setShowComments] = useState(false)

    const likeCount = isLiked ? post.likes + 1 : post.likes

    return (
        <motion.article
            className="bg-white border border-gray-200 rounded-lg mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
        >
            {/* Header */}
            <div className="flex items-center justify-between p-3">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center text-lg">
                        {post.user.avatar}
                    </div>
                    <div>
                        <div className="flex items-center gap-1">
                            <span className="font-semibold text-sm">{post.user.username}</span>
                            {post.user.verified && (
                                <svg className="w-3.5 h-3.5 text-blue-500 fill-blue-500" viewBox="0 0 24 24">
                                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            )}
                        </div>
                        {post.location && (
                            <span className="text-xs text-gray-500">{post.location}</span>
                        )}
                    </div>
                </div>
                <button className="p-1 hover:bg-gray-100 rounded-full">
                    <MoreHorizontal className="w-5 h-5" />
                </button>
            </div>

            {/* Content */}
            <div className="relative bg-gray-100 aspect-square">
                <div className="absolute inset-0 flex items-center justify-center text-9xl">
                    {post.content.items[currentSlide]}
                </div>

                {/* Carousel navigation */}
                {post.content.items.length > 1 && (
                    <>
                        {currentSlide > 0 && (
                            <button
                                className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/90 shadow flex items-center justify-center"
                                onClick={() => setCurrentSlide((s) => s - 1)}
                            >
                                <ChevronLeft className="w-4 h-4" />
                            </button>
                        )}
                        {currentSlide < post.content.items.length - 1 && (
                            <button
                                className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/90 shadow flex items-center justify-center"
                                onClick={() => setCurrentSlide((s) => s + 1)}
                            >
                                <ChevronRight className="w-4 h-4" />
                            </button>
                        )}
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1">
                            {post.content.items.map((_, i) => (
                                <div
                                    key={i}
                                    className={`w-1.5 h-1.5 rounded-full ${i === currentSlide ? 'bg-blue-500' : 'bg-white/60'
                                        }`}
                                />
                            ))}
                        </div>
                    </>
                )}
            </div>

            {/* Actions */}
            <div className="p-3">
                <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-4">
                        <motion.button
                            onClick={() => setIsLiked(!isLiked)}
                            whileTap={{ scale: 0.8 }}
                        >
                            <Heart
                                className={`w-6 h-6 ${isLiked ? 'fill-red-500 text-red-500' : ''}`}
                            />
                        </motion.button>
                        <button onClick={() => setShowComments(!showComments)}>
                            <MessageCircle className="w-6 h-6" />
                        </button>
                        <button>
                            <Send className="w-6 h-6" />
                        </button>
                    </div>
                    <motion.button
                        onClick={() => setIsSaved(!isSaved)}
                        whileTap={{ scale: 0.8 }}
                    >
                        <Bookmark className={`w-6 h-6 ${isSaved ? 'fill-black' : ''}`} />
                    </motion.button>
                </div>

                {/* Likes */}
                <p className="font-semibold text-sm mb-1">
                    {likeCount.toLocaleString()} likes
                </p>

                {/* Caption */}
                <p className="text-sm">
                    <span className="font-semibold">{post.user.username}</span>{' '}
                    {post.caption}
                </p>

                {/* View comments */}
                <button className="text-sm text-gray-500 mt-1">
                    View all {post.comments} comments
                </button>

                {/* Timestamp */}
                <p className="text-xs text-gray-400 mt-2 uppercase">{post.timestamp}</p>
            </div>

            {/* Add comment */}
            <div className="border-t border-gray-200 p-3 flex items-center gap-3">
                <Smile className="w-6 h-6 text-gray-400" />
                <input
                    type="text"
                    placeholder="Add a comment..."
                    className="flex-1 text-sm outline-none"
                />
                <button className="text-blue-500 font-semibold text-sm opacity-50">
                    Post
                </button>
            </div>
        </motion.article>
    )
}

// ========================================
// SUGGESTIONS
// ========================================

function Suggestions({ users }: { users: User[] }) {
    return (
        <div className="bg-white p-4 rounded-lg">
            <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-semibold text-gray-500">Suggested for you</span>
                <button className="text-xs font-semibold">See All</button>
            </div>
            <div className="space-y-4">
                {users.map((user) => (
                    <div key={user.id} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center text-xl">
                                {user.avatar}
                            </div>
                            <div>
                                <div className="flex items-center gap-1">
                                    <span className="font-semibold text-sm">{user.username}</span>
                                    {user.verified && (
                                        <svg className="w-3.5 h-3.5 text-blue-500 fill-blue-500" viewBox="0 0 24 24">
                                            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    )}
                                </div>
                                <span className="text-xs text-gray-500">{user.followers} followers</span>
                            </div>
                        </div>
                        <button className="text-xs font-semibold text-blue-500">Follow</button>
                    </div>
                ))}
            </div>
        </div>
    )
}

// ========================================
// MAIN PAGE
// ========================================

export default function SocialgramPage() {
    return (
        <div className="min-h-screen bg-gray-50">
            <Sidebar />

            <div className="ml-[72px] xl:ml-64">
                <div className="max-w-2xl mx-auto py-8 px-4">
                    {/* Stories */}
                    <Stories />

                    {/* Feed */}
                    <div className="flex gap-8">
                        {/* Posts */}
                        <div className="flex-1">
                            {posts.map((post) => (
                                <PostCard key={post.id} post={post} />
                            ))}
                        </div>

                        {/* Sidebar content - hidden on smaller screens */}
                        <div className="hidden lg:block w-72 flex-shrink-0">
                            {/* Current user */}
                            <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent-primary to-accent-secondary flex items-center justify-center text-2xl">
                                        👤
                                    </div>
                                    <div>
                                        <p className="font-semibold text-sm">yourname</p>
                                        <p className="text-sm text-gray-500">Your Name</p>
                                    </div>
                                </div>
                                <button className="text-xs font-semibold text-blue-500">Switch</button>
                            </div>

                            {/* Suggestions */}
                            <Suggestions users={suggestions} />

                            {/* Footer links */}
                            <div className="mt-6 text-xs text-gray-400">
                                <p className="mb-4">About · Help · Press · API · Jobs · Privacy · Terms</p>
                                <p>
                                    Demo by{' '}
                                    <Link href="/" className="text-gray-600 hover:underline">
                                        YourName
                                    </Link>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
