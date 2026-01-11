'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import {
    Briefcase,
    MapPin,
    DollarSign,
    Clock,
    Building2,
    Search,
    Filter,
    Bookmark,
    Heart,
    ExternalLink,
    ChevronDown,
    Users,
    Globe,
    Zap,
    Shield,
    Star,
    CheckCircle,
    ArrowRight,
    Menu,
    X,
    Bell,
    User,
    Home,
    Compass,
    FileText,
    Settings,
    TrendingUp,
} from 'lucide-react'

// ========================================
// TYPES
// ========================================

interface Job {
    id: string
    title: string
    company: {
        name: string
        logo: string
        verified: boolean
    }
    location: string
    type: 'Full-time' | 'Part-time' | 'Contract' | 'Remote'
    experience: string
    salary: {
        min: number
        max: number
        currency: string
    }
    skills: string[]
    posted: string
    description: string
    applicants: number
    saved?: boolean
    featured?: boolean
}

// ========================================
// SAMPLE DATA
// ========================================

const jobs: Job[] = [
    {
        id: 'j1',
        title: 'Senior Frontend Developer',
        company: { name: 'TechCorp Inc.', logo: '🏢', verified: true },
        location: 'San Francisco, CA',
        type: 'Full-time',
        experience: '5+ years',
        salary: { min: 150000, max: 200000, currency: 'USD' },
        skills: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS'],
        posted: '2 days ago',
        description: 'We are looking for a Senior Frontend Developer to join our team and help build the next generation of our product.',
        applicants: 45,
        featured: true,
    },
    {
        id: 'j2',
        title: 'Product Designer',
        company: { name: 'DesignStudio', logo: '🎨', verified: true },
        location: 'Remote',
        type: 'Remote',
        experience: '3-5 years',
        salary: { min: 120000, max: 160000, currency: 'USD' },
        skills: ['Figma', 'UI/UX', 'Design Systems', 'Prototyping'],
        posted: '1 day ago',
        description: 'Join our design team to create beautiful and intuitive user experiences for millions of users.',
        applicants: 78,
        featured: true,
    },
    {
        id: 'j3',
        title: 'Full Stack Engineer',
        company: { name: 'StartupXYZ', logo: '🚀', verified: false },
        location: 'New York, NY',
        type: 'Full-time',
        experience: '3+ years',
        salary: { min: 130000, max: 180000, currency: 'USD' },
        skills: ['Node.js', 'React', 'PostgreSQL', 'AWS'],
        posted: '3 days ago',
        description: 'Help us build and scale our platform as we grow from startup to enterprise.',
        applicants: 62,
    },
    {
        id: 'j4',
        title: 'DevOps Engineer',
        company: { name: 'CloudNative', logo: '☁️', verified: true },
        location: 'Austin, TX',
        type: 'Full-time',
        experience: '4+ years',
        salary: { min: 140000, max: 190000, currency: 'USD' },
        skills: ['Kubernetes', 'Docker', 'CI/CD', 'Terraform'],
        posted: '5 days ago',
        description: 'Manage and optimize our cloud infrastructure to support millions of users worldwide.',
        applicants: 34,
    },
    {
        id: 'j5',
        title: 'Data Scientist',
        company: { name: 'DataDriven', logo: '📊', verified: true },
        location: 'Seattle, WA',
        type: 'Full-time',
        experience: '3-5 years',
        salary: { min: 140000, max: 180000, currency: 'USD' },
        skills: ['Python', 'Machine Learning', 'SQL', 'TensorFlow'],
        posted: '1 week ago',
        description: 'Use data and machine learning to drive business decisions and product improvements.',
        applicants: 89,
    },
    {
        id: 'j6',
        title: 'Mobile Developer (iOS)',
        company: { name: 'AppWorks', logo: '📱', verified: false },
        location: 'Los Angeles, CA',
        type: 'Contract',
        experience: '2+ years',
        salary: { min: 100000, max: 140000, currency: 'USD' },
        skills: ['Swift', 'iOS', 'SwiftUI', 'Xcode'],
        posted: '4 days ago',
        description: 'Build and maintain our iOS applications used by thousands of customers daily.',
        applicants: 28,
    },
]

const categories = ['All Jobs', 'Tech', 'Design', 'Marketing', 'Sales', 'Finance', 'HR']
const jobTypes = ['All Types', 'Full-time', 'Part-time', 'Remote', 'Contract']

// ========================================
// NAVIGATION
// ========================================

function Navigation() {
    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-6 py-4">
                <div className="flex items-center justify-between">
                    <Link href="/demos/job-board" className="flex items-center gap-2">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center">
                            <Briefcase className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-xl font-bold">JobHub</span>
                    </Link>

                    <div className="hidden md:flex items-center gap-8">
                        {['Find Jobs', 'Companies', 'Salaries', 'Resources'].map((item) => (
                            <a key={item} href="#" className="text-gray-600 hover:text-blue-600 font-medium">
                                {item}
                            </a>
                        ))}
                    </div>

                    <div className="flex items-center gap-4">
                        <button className="hidden md:block px-5 py-2 text-blue-600 font-medium">
                            Sign In
                        </button>
                        <button className="px-5 py-2 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700">
                            Post a Job
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    )
}

// ========================================
// SEARCH HERO
// ========================================

function SearchHero() {
    return (
        <section className="pt-24 pb-12 bg-gradient-to-br from-blue-600 to-indigo-700 text-white">
            <div className="max-w-7xl mx-auto px-6 py-16">
                <motion.div
                    className="text-center mb-12"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <h1 className="text-4xl sm:text-5xl font-bold mb-4">
                        Find Your <span className="text-blue-200">Dream Job</span>
                    </h1>
                    <p className="text-lg text-blue-100 max-w-2xl mx-auto">
                        Discover 10,000+ job opportunities from top companies worldwide
                    </p>
                </motion.div>

                <motion.div
                    className="bg-white rounded-2xl shadow-xl p-4 max-w-4xl mx-auto"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1 relative">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Job title, keywords, or company"
                                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                            />
                        </div>
                        <div className="flex-1 relative">
                            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="text"
                                placeholder="City, state, or remote"
                                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                            />
                        </div>
                        <button className="px-8 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 flex items-center justify-center gap-2">
                            <Search className="w-5 h-5" />
                            Search
                        </button>
                    </div>
                </motion.div>

                {/* Stats */}
                <motion.div
                    className="flex flex-wrap justify-center gap-12 mt-12"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                >
                    {[
                        { value: '10K+', label: 'Active Jobs' },
                        { value: '5K+', label: 'Companies' },
                        { value: '2M+', label: 'Job Seekers' },
                    ].map((stat) => (
                        <div key={stat.label} className="text-center">
                            <p className="text-3xl font-bold">{stat.value}</p>
                            <p className="text-blue-200">{stat.label}</p>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    )
}

// ========================================
// JOB CARD
// ========================================

function JobCard({ job, index }: { job: Job; index: number }) {
    const [isSaved, setIsSaved] = useState(job.saved || false)

    const formatSalary = (min: number, max: number) => {
        return `$${(min / 1000).toFixed(0)}K - $${(max / 1000).toFixed(0)}K`
    }

    return (
        <motion.div
            className={`bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-shadow border ${job.featured ? 'border-blue-200 bg-blue-50/50' : 'border-gray-100'
                }`}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
        >
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-4">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center text-2xl">
                        {job.company.logo}
                    </div>
                    <div>
                        <div className="flex items-center gap-2">
                            <h3 className="font-bold text-lg">{job.title}</h3>
                            {job.featured && (
                                <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs rounded-full font-medium">
                                    Featured
                                </span>
                            )}
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                            <span className="text-gray-600">{job.company.name}</span>
                            {job.company.verified && (
                                <CheckCircle className="w-4 h-4 text-blue-500 fill-blue-100" />
                            )}
                        </div>
                    </div>
                </div>
                <button
                    className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
                    onClick={() => setIsSaved(!isSaved)}
                >
                    <Bookmark className={`w-5 h-5 ${isSaved ? 'fill-blue-500 text-blue-500' : 'text-gray-400'}`} />
                </button>
            </div>

            {/* Details */}
            <div className="flex flex-wrap gap-3 mb-4">
                <span className="flex items-center gap-1 px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-600">
                    <MapPin className="w-4 h-4" />
                    {job.location}
                </span>
                <span className="flex items-center gap-1 px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-600">
                    <Briefcase className="w-4 h-4" />
                    {job.type}
                </span>
                <span className="flex items-center gap-1 px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-600">
                    <Clock className="w-4 h-4" />
                    {job.experience}
                </span>
            </div>

            {/* Salary */}
            <div className="flex items-center gap-1 mb-4">
                <DollarSign className="w-5 h-5 text-green-600" />
                <span className="font-semibold text-green-600">
                    {formatSalary(job.salary.min, job.salary.max)}
                </span>
                <span className="text-gray-500">/year</span>
            </div>

            {/* Skills */}
            <div className="flex flex-wrap gap-2 mb-4">
                {job.skills.map((skill) => (
                    <span
                        key={skill}
                        className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-lg font-medium"
                    >
                        {skill}
                    </span>
                ))}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        {job.applicants} applicants
                    </span>
                    <span>{job.posted}</span>
                </div>
                <button className="px-5 py-2 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 flex items-center gap-2">
                    Apply Now
                    <ArrowRight className="w-4 h-4" />
                </button>
            </div>
        </motion.div>
    )
}

// ========================================
// FILTERS
// ========================================

function Filters() {
    const [selectedCategory, setSelectedCategory] = useState('All Jobs')
    const [selectedType, setSelectedType] = useState('All Types')

    return (
        <div className="flex flex-wrap gap-4 mb-8">
            <div className="flex gap-2 overflow-x-auto">
                {categories.map((cat) => (
                    <button
                        key={cat}
                        className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-colors ${selectedCategory === cat
                                ? 'bg-blue-600 text-white'
                                : 'bg-white border border-gray-200 text-gray-600 hover:border-blue-300'
                            }`}
                        onClick={() => setSelectedCategory(cat)}
                    >
                        {cat}
                    </button>
                ))}
            </div>
            <div className="ml-auto flex gap-2">
                <select
                    className="px-4 py-2 rounded-xl border border-gray-200 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                >
                    {jobTypes.map((type) => (
                        <option key={type}>{type}</option>
                    ))}
                </select>
                <button className="px-4 py-2 border border-gray-200 rounded-xl flex items-center gap-2 text-sm hover:bg-gray-50">
                    <Filter className="w-4 h-4" />
                    More Filters
                </button>
            </div>
        </div>
    )
}

// ========================================
// FOOTER
// ========================================

function Footer() {
    return (
        <footer className="py-16 bg-gray-900 text-white">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid md:grid-cols-4 gap-12 mb-12">
                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                                <Briefcase className="w-5 h-5 text-white" />
                            </div>
                            <span className="text-xl font-bold">JobHub</span>
                        </div>
                        <p className="text-gray-400 text-sm">
                            Connecting talent with opportunity. Find your dream job today.
                        </p>
                    </div>

                    {['For Job Seekers', 'For Employers', 'Company'].map((title) => (
                        <div key={title}>
                            <h4 className="font-semibold mb-4">{title}</h4>
                            <ul className="space-y-2 text-gray-400">
                                {['Link 1', 'Link 2', 'Link 3', 'Link 4'].map((link) => (
                                    <li key={link}><a href="#" className="hover:text-white">{link}</a></li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <div className="pt-8 border-t border-white/10 text-center text-gray-400 text-sm">
                    Demo by{' '}
                    <Link href="/" className="text-blue-400 hover:underline">
                        YourName
                    </Link>
                </div>
            </div>
        </footer>
    )
}

// ========================================
// MAIN PAGE
// ========================================

export default function JobBoardPage() {
    return (
        <div className="min-h-screen bg-gray-50">
            <Navigation />
            <SearchHero />

            <main className="max-w-7xl mx-auto px-6 py-12">
                <Filters />
                <div className="grid lg:grid-cols-2 gap-6">
                    {jobs.map((job, index) => (
                        <JobCard key={job.id} job={job} index={index} />
                    ))}
                </div>

                <div className="text-center mt-12">
                    <button className="px-8 py-3 border-2 border-blue-600 text-blue-600 rounded-xl font-semibold hover:bg-blue-600 hover:text-white transition-colors">
                        Load More Jobs
                    </button>
                </div>
            </main>

            <Footer />
        </div>
    )
}
