'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import {
    BookOpen,
    Play,
    Clock,
    Star,
    Users,
    Award,
    BarChart,
    CheckCircle,
    Lock,
    Heart,
    Share2,
    Download,
    ChevronRight,
    ChevronDown,
    Search,
    Filter,
    Grid,
    List,
    Menu,
    X,
    Bell,
    User,
    Settings,
    Home,
    Compass,
    BookMarked,
    GraduationCap,
    Trophy,
    Flame,
    Target,
    Zap,
    MessageSquare,
    FileText,
} from 'lucide-react'

// ========================================
// TYPES
// ========================================

interface Course {
    id: string
    title: string
    description: string
    instructor: {
        name: string
        avatar: string
        title: string
    }
    category: string
    level: 'Beginner' | 'Intermediate' | 'Advanced'
    duration: string
    lessons: number
    students: string
    rating: number
    reviews: number
    price: number
    originalPrice?: number
    image: string
    tags: string[]
    bestseller?: boolean
    new?: boolean
    progress?: number
}

interface Category {
    name: string
    icon: React.ReactNode
    courses: number
}

// ========================================
// SAMPLE DATA
// ========================================

const courses: Course[] = [
    {
        id: 'c1',
        title: 'Complete Web Development Bootcamp 2025',
        description: 'Learn HTML, CSS, JavaScript, React, Node.js and more. Build 20+ real-world projects.',
        instructor: { name: 'Dr. Angela Yu', avatar: '👩‍🏫', title: 'Lead Instructor' },
        category: 'Web Development',
        level: 'Beginner',
        duration: '60+ hours',
        lessons: 450,
        students: '850K',
        rating: 4.9,
        reviews: 234567,
        price: 89.99,
        originalPrice: 199.99,
        image: '💻',
        tags: ['HTML', 'CSS', 'JavaScript', 'React'],
        bestseller: true,
        progress: 35,
    },
    {
        id: 'c2',
        title: 'Python for Data Science & Machine Learning',
        description: 'Master Python programming, NumPy, Pandas, Matplotlib, Scikit-Learn, and TensorFlow.',
        instructor: { name: 'Jose Portilla', avatar: '👨‍💻', title: 'Data Scientist' },
        category: 'Data Science',
        level: 'Intermediate',
        duration: '45 hours',
        lessons: 280,
        students: '620K',
        rating: 4.8,
        reviews: 189432,
        price: 94.99,
        originalPrice: 179.99,
        image: '🐍',
        tags: ['Python', 'Machine Learning', 'NumPy'],
        bestseller: true,
    },
    {
        id: 'c3',
        title: 'iOS & Swift - Complete iOS App Development',
        description: 'Build 25+ apps including ones that use machine learning, augmented reality, and more.',
        instructor: { name: 'Angela Yu', avatar: '👩‍💻', title: 'iOS Developer' },
        category: 'Mobile Development',
        level: 'Beginner',
        duration: '55 hours',
        lessons: 350,
        students: '420K',
        rating: 4.8,
        reviews: 156789,
        price: 99.99,
        image: '📱',
        tags: ['Swift', 'iOS', 'SwiftUI'],
        new: true,
        progress: 68,
    },
    {
        id: 'c4',
        title: 'Advanced React and Redux',
        description: 'Deep dive into React, Redux, React Router, and advanced patterns for building scalable apps.',
        instructor: { name: 'Stephen Grider', avatar: '👨‍🎓', title: 'Engineering Architect' },
        category: 'Web Development',
        level: 'Advanced',
        duration: '30 hours',
        lessons: 200,
        students: '380K',
        rating: 4.7,
        reviews: 98765,
        price: 84.99,
        originalPrice: 149.99,
        image: '⚛️',
        tags: ['React', 'Redux', 'TypeScript'],
    },
    {
        id: 'c5',
        title: 'UI/UX Design Bootcamp',
        description: 'Learn Figma, design systems, user research, and create stunning interfaces.',
        instructor: { name: 'Daniel Scott', avatar: '🎨', title: 'Design Director' },
        category: 'Design',
        level: 'Beginner',
        duration: '35 hours',
        lessons: 180,
        students: '290K',
        rating: 4.9,
        reviews: 67890,
        price: 79.99,
        image: '🎨',
        tags: ['Figma', 'UI Design', 'UX'],
        bestseller: true,
    },
    {
        id: 'c6',
        title: 'AWS Certified Solutions Architect',
        description: 'Prepare for the AWS SAA-C03 exam with hands-on labs and practice tests.',
        instructor: { name: 'Stephane Maarek', avatar: '☁️', title: 'AWS Expert' },
        category: 'Cloud Computing',
        level: 'Intermediate',
        duration: '40 hours',
        lessons: 320,
        students: '510K',
        rating: 4.8,
        reviews: 145678,
        price: 109.99,
        originalPrice: 199.99,
        image: '☁️',
        tags: ['AWS', 'Cloud', 'DevOps'],
    },
]

const categories: Category[] = [
    { name: 'Web Development', icon: <BookOpen className="w-5 h-5" />, courses: 1250 },
    { name: 'Data Science', icon: <BarChart className="w-5 h-5" />, courses: 890 },
    { name: 'Mobile Development', icon: <Zap className="w-5 h-5" />, courses: 650 },
    { name: 'Design', icon: <Target className="w-5 h-5" />, courses: 520 },
    { name: 'Cloud Computing', icon: <FileText className="w-5 h-5" />, courses: 380 },
    { name: 'Marketing', icon: <MessageSquare className="w-5 h-5" />, courses: 420 },
]

// ========================================
// SIDEBAR
// ========================================

function Sidebar() {
    const menuItems = [
        { icon: <Home className="w-5 h-5" />, label: 'Home', active: true },
        { icon: <Compass className="w-5 h-5" />, label: 'Explore' },
        { icon: <BookMarked className="w-5 h-5" />, label: 'My Learning' },
        { icon: <Heart className="w-5 h-5" />, label: 'Wishlist' },
        { icon: <Trophy className="w-5 h-5" />, label: 'Achievements' },
        { icon: <Settings className="w-5 h-5" />, label: 'Settings' },
    ]

    return (
        <aside className="w-64 bg-white border-r border-gray-200 flex flex-col h-full">
            {/* Logo */}
            <div className="p-6">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center">
                        <GraduationCap className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-xl font-bold">LearnHub</span>
                </div>
            </div>

            {/* Search */}
            <div className="px-4 mb-4">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search courses..."
                        className="w-full pl-10 pr-4 py-2.5 bg-gray-100 rounded-xl text-sm outline-none focus:ring-2 focus:ring-purple-500"
                    />
                </div>
            </div>

            {/* Nav */}
            <nav className="px-3 flex-1">
                <div className="space-y-1">
                    {menuItems.map((item) => (
                        <button
                            key={item.label}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${item.active
                                    ? 'bg-purple-100 text-purple-700'
                                    : 'text-gray-600 hover:bg-gray-100'
                                }`}
                        >
                            {item.icon}
                            {item.label}
                        </button>
                    ))}
                </div>
            </nav>

            {/* Stats */}
            <div className="p-4 mx-4 mb-4 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-2xl text-white">
                <div className="flex items-center gap-2 mb-2">
                    <Flame className="w-5 h-5 text-orange-300" />
                    <span className="font-semibold">12 Day Streak!</span>
                </div>
                <p className="text-sm text-purple-100">Keep learning to maintain your streak</p>
            </div>
        </aside>
    )
}

// ========================================
// COURSE CARD
// ========================================

function CourseCard({ course, index }: { course: Course; index: number }) {
    return (
        <motion.div
            className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
        >
            {/* Image */}
            <div className="relative aspect-video bg-gradient-to-br from-purple-100 to-indigo-100">
                <div className="absolute inset-0 flex items-center justify-center text-7xl">
                    {course.image}
                </div>
                {/* Badges */}
                <div className="absolute top-3 left-3 flex gap-2">
                    {course.bestseller && (
                        <span className="px-2 py-1 bg-yellow-500 text-white text-xs font-semibold rounded">
                            Bestseller
                        </span>
                    )}
                    {course.new && (
                        <span className="px-2 py-1 bg-green-500 text-white text-xs font-semibold rounded">
                            New
                        </span>
                    )}
                </div>
                {/* Play button on hover */}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur flex items-center justify-center">
                        <Play className="w-8 h-8 text-white fill-white ml-1" />
                    </div>
                </div>
                {/* Progress bar */}
                {course.progress !== undefined && (
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-200">
                        <div className="h-full bg-purple-600" style={{ width: `${course.progress}%` }} />
                    </div>
                )}
            </div>

            {/* Content */}
            <div className="p-5">
                <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-0.5 bg-purple-100 text-purple-700 text-xs rounded font-medium">
                        {course.category}
                    </span>
                    <span className="text-xs text-gray-500">{course.level}</span>
                </div>
                <h3 className="font-bold line-clamp-2 mb-2 group-hover:text-purple-600 transition-colors">
                    {course.title}
                </h3>
                <p className="text-sm text-gray-500 line-clamp-2 mb-3">{course.description}</p>

                {/* Instructor */}
                <div className="flex items-center gap-2 mb-3">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center text-xs">
                        {course.instructor.avatar}
                    </div>
                    <span className="text-sm text-gray-600">{course.instructor.name}</span>
                </div>

                {/* Stats */}
                <div className="flex items-center gap-4 mb-4 text-sm">
                    <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                        <span className="font-semibold">{course.rating}</span>
                        <span className="text-gray-400">({course.reviews.toLocaleString()})</span>
                    </div>
                    <div className="flex items-center gap-1 text-gray-500">
                        <Clock className="w-4 h-4" />
                        {course.duration}
                    </div>
                </div>

                {/* Price */}
                <div className="flex items-center justify-between">
                    <div>
                        <span className="text-xl font-bold">${course.price}</span>
                        {course.originalPrice && (
                            <span className="text-gray-400 line-through ml-2">${course.originalPrice}</span>
                        )}
                    </div>
                    <button className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
                        <Heart className="w-5 h-5 text-gray-400" />
                    </button>
                </div>
            </div>
        </motion.div>
    )
}

// ========================================
// HERO
// ========================================

function Hero() {
    return (
        <section className="py-12">
            <motion.div
                className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-3xl p-8 md:p-12 text-white"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <div className="max-w-2xl">
                    <span className="inline-block px-3 py-1 bg-white/20 rounded-full text-sm font-medium mb-4">
                        🎉 New Year Sale - Up to 80% Off
                    </span>
                    <h1 className="text-3xl md:text-4xl font-bold mb-4">
                        Learn the Skills to Advance Your Career
                    </h1>
                    <p className="text-lg text-purple-100 mb-6">
                        Access 200,000+ courses taught by real-world experts. Start learning today!
                    </p>
                    <div className="flex flex-wrap gap-4">
                        <button className="px-6 py-3 bg-white text-purple-600 rounded-xl font-semibold hover:bg-gray-100">
                            Browse Courses
                        </button>
                        <button className="px-6 py-3 border border-white/30 rounded-xl font-semibold hover:bg-white/10">
                            View Plans
                        </button>
                    </div>
                </div>
            </motion.div>
        </section>
    )
}

// ========================================
// CATEGORIES
// ========================================

function CategoriesSection() {
    return (
        <section className="py-12">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">Browse Categories</h2>
                <button className="text-purple-600 font-medium">View All</button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {categories.map((cat, index) => (
                    <motion.button
                        key={cat.name}
                        className="p-4 bg-white rounded-2xl text-left hover:shadow-lg transition-shadow group"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                    >
                        <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center mb-3 group-hover:bg-purple-600 group-hover:text-white transition-colors">
                            {cat.icon}
                        </div>
                        <h4 className="font-semibold text-sm mb-1">{cat.name}</h4>
                        <p className="text-xs text-gray-500">{cat.courses} courses</p>
                    </motion.button>
                ))}
            </div>
        </section>
    )
}

// ========================================
// CONTINUE LEARNING
// ========================================

function ContinueLearning() {
    const inProgress = courses.filter(c => c.progress !== undefined)

    return (
        <section className="py-12">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h2 className="text-2xl font-bold">Continue Learning</h2>
                    <p className="text-gray-500">Pick up where you left off</p>
                </div>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
                {inProgress.map((course) => (
                    <div key={course.id} className="flex gap-4 p-4 bg-white rounded-2xl shadow-sm">
                        <div className="w-24 h-24 rounded-xl bg-gradient-to-br from-purple-100 to-indigo-100 flex items-center justify-center text-4xl flex-shrink-0">
                            {course.image}
                        </div>
                        <div className="flex-1">
                            <h4 className="font-semibold mb-1 line-clamp-1">{course.title}</h4>
                            <p className="text-sm text-gray-500 mb-3">{course.instructor.name}</p>
                            <div className="flex items-center gap-3">
                                <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                                    <div className="h-full bg-purple-600 rounded-full" style={{ width: `${course.progress}%` }} />
                                </div>
                                <span className="text-sm font-medium text-purple-600">{course.progress}%</span>
                            </div>
                        </div>
                        <button className="w-12 h-12 rounded-xl bg-purple-600 text-white flex items-center justify-center self-center">
                            <Play className="w-5 h-5 fill-white ml-0.5" />
                        </button>
                    </div>
                ))}
            </div>
        </section>
    )
}

// ========================================
// MAIN PAGE
// ========================================

export default function LearningPlatformPage() {
    return (
        <div className="min-h-screen flex bg-gray-50">
            <Sidebar />

            <main className="flex-1 overflow-auto p-8">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-2xl font-bold">Welcome back, John! 👋</h1>
                        <p className="text-gray-500">Continue your learning journey</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <button className="relative p-2 hover:bg-gray-100 rounded-xl">
                            <Bell className="w-6 h-6" />
                            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
                        </button>
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center text-white font-bold">
                            JD
                        </div>
                    </div>
                </div>

                <Hero />
                <ContinueLearning />
                <CategoriesSection />

                {/* Featured courses */}
                <section className="py-12">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h2 className="text-2xl font-bold">Featured Courses</h2>
                            <p className="text-gray-500">Top-rated courses this week</p>
                        </div>
                        <button className="text-purple-600 font-medium">View All →</button>
                    </div>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {courses.map((course, index) => (
                            <CourseCard key={course.id} course={course} index={index} />
                        ))}
                    </div>
                </section>

                {/* Footer */}
                <div className="text-center py-8 text-gray-500 text-sm">
                    Demo by{' '}
                    <Link href="/" className="text-purple-600 hover:underline">
                        YourName
                    </Link>
                </div>
            </main>
        </div>
    )
}
