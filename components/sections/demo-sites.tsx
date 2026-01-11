'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import Link from 'next/link'
import {
    ExternalLink,
    Smartphone,
    Monitor,
    Tablet,
    ChevronLeft,
    ChevronRight,
    Maximize2,
    X,
    Globe,
    Sparkles,
    Zap,
    Code,
    Eye,
    Star,
} from 'lucide-react'
import { GlassCard } from '@/components/ui/glass-card'
import { Button } from '@/components/ui/button'
import { Badge, TechPill } from '@/components/ui/index'
import { cn } from '@/lib/utils'

// ========================================
// DEMO SITES DATA
// ========================================

export interface DemoSite {
    id: string
    name: string
    description: string
    thumbnail: string
    emoji: string
    url: string
    category: string
    technologies: string[]
    features: string[]
    featured?: boolean
    color: string
}

export const demoSites: DemoSite[] = [
    {
        id: 'landing-startup',
        name: 'StartupLaunch Pro',
        description: 'Modern SaaS landing page with animated hero, pricing tables, and testimonials.',
        thumbnail: '/demos/startup.png',
        emoji: '🚀',
        url: '/demos/startup-landing',
        category: 'Landing Page',
        technologies: ['Next.js', 'Tailwind CSS', 'Framer Motion'],
        features: ['Responsive Design', 'Dark Mode', 'Animations'],
        featured: true,
        color: '#6366F1',
    },
    {
        id: 'portfolio-creative',
        name: 'Creative Portfolio',
        description: 'Stunning portfolio for designers and creatives with gallery and case studies.',
        thumbnail: '/demos/portfolio.png',
        emoji: '🎨',
        url: '/demos/creative-portfolio',
        category: 'Portfolio',
        technologies: ['React', 'CSS Grid', 'GSAP'],
        features: ['Image Gallery', 'Smooth Scroll', 'Contact Form'],
        featured: true,
        color: '#EC4899',
    },
    {
        id: 'ecommerce-store',
        name: 'ShopFlow Store',
        description: 'E-commerce storefront with product grid, cart, and checkout flow.',
        thumbnail: '/demos/ecommerce.png',
        emoji: '🛍️',
        url: '/demos/ecommerce-store',
        category: 'E-commerce',
        technologies: ['Next.js', 'Stripe', 'Tailwind'],
        features: ['Shopping Cart', 'Product Filter', 'Wishlist'],
        color: '#10B981',
    },
    {
        id: 'dashboard-admin',
        name: 'AdminFlow Dashboard',
        description: 'Modern admin dashboard with charts, tables, and analytics widgets.',
        thumbnail: '/demos/dashboard.png',
        emoji: '📊',
        url: '/demos/admin-dashboard',
        category: 'Dashboard',
        technologies: ['React', 'Chart.js', 'Tailwind'],
        features: ['Analytics', 'Data Tables', 'Dark Theme'],
        featured: true,
        color: '#3B82F6',
    },
    {
        id: 'blog-minimal',
        name: 'BlogSpace',
        description: 'Clean, minimal blog with markdown support and reading progress.',
        thumbnail: '/demos/blog.png',
        emoji: '✍️',
        url: '/demos/blog-minimal',
        category: 'Blog',
        technologies: ['Next.js', 'MDX', 'Tailwind'],
        features: ['Reading Time', 'Categories', 'Search'],
        color: '#F59E0B',
    },
    {
        id: 'restaurant-menu',
        name: 'GourmetBite',
        description: 'Restaurant website with menu, reservations, and location map.',
        thumbnail: '/demos/restaurant.png',
        emoji: '🍽️',
        url: '/demos/restaurant',
        category: 'Restaurant',
        technologies: ['HTML', 'CSS', 'JavaScript'],
        features: ['Menu Display', 'Reservations', 'Gallery'],
        color: '#EF4444',
    },
]

// ========================================
// DEVICE FRAME COMPONENT
// ========================================

type DeviceType = 'desktop' | 'tablet' | 'mobile'

interface DeviceFrameProps {
    type: DeviceType
    children: React.ReactNode
    className?: string
}

function DeviceFrame({ type, children, className }: DeviceFrameProps) {
    const frames = {
        desktop: {
            width: '100%',
            height: '100%',
            borderRadius: '12px',
        },
        tablet: {
            width: '768px',
            height: '1024px',
            borderRadius: '24px',
        },
        mobile: {
            width: '375px',
            height: '812px',
            borderRadius: '40px',
        },
    }

    return (
        <div
            className={cn(
                'bg-gray-900 border-4 border-gray-800 shadow-2xl overflow-hidden',
                className
            )}
            style={{
                ...frames[type],
                maxWidth: '100%',
                maxHeight: type === 'desktop' ? '600px' : undefined,
            }}
        >
            {/* Browser chrome for desktop */}
            {type === 'desktop' && (
                <div className="h-8 bg-gray-800 flex items-center px-3 gap-2">
                    <div className="flex gap-1.5">
                        <div className="w-3 h-3 rounded-full bg-red-500" />
                        <div className="w-3 h-3 rounded-full bg-yellow-500" />
                        <div className="w-3 h-3 rounded-full bg-green-500" />
                    </div>
                    <div className="flex-1 mx-4">
                        <div className="h-5 bg-gray-700 rounded-md" />
                    </div>
                </div>
            )}

            {/* Notch for mobile */}
            {type === 'mobile' && (
                <div className="h-6 bg-gray-900 flex justify-center pt-2">
                    <div className="w-24 h-4 bg-gray-800 rounded-full" />
                </div>
            )}

            <div className="w-full h-full bg-white overflow-auto">
                {children}
            </div>
        </div>
    )
}

// ========================================
// DEMO SITE CARD
// ========================================

interface DemoSiteCardProps {
    site: DemoSite
    onPreview: (site: DemoSite) => void
}

function DemoSiteCard({ site, onPreview }: DemoSiteCardProps) {
    const [isHovered, setIsHovered] = useState(false)

    return (
        <motion.div
            className="group"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
        >
            <GlassCard
                padding="none"
                className="overflow-hidden cursor-pointer h-full"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                {/* Preview image */}
                <div className="relative h-56 overflow-hidden">
                    <motion.div
                        className="absolute inset-0 flex items-center justify-center"
                        style={{ backgroundColor: `${site.color}20` }}
                        animate={{ scale: isHovered ? 1.05 : 1 }}
                        transition={{ duration: 0.4 }}
                    >
                        <span className="text-8xl">{site.emoji}</span>
                    </motion.div>

                    {/* Overlay on hover */}
                    <motion.div
                        className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end p-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: isHovered ? 1 : 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="flex gap-2">
                            <Button
                                variant="primary"
                                size="sm"
                                icon={<Eye className="w-4 h-4" />}
                                onClick={(e) => {
                                    e.stopPropagation()
                                    onPreview(site)
                                }}
                            >
                                Preview
                            </Button>
                            <Link href={site.url}>
                                <Button
                                    variant="secondary"
                                    size="sm"
                                    icon={<ExternalLink className="w-4 h-4" />}
                                >
                                    Open
                                </Button>
                            </Link>
                        </div>
                    </motion.div>

                    {/* Featured badge */}
                    {site.featured && (
                        <div className="absolute top-3 left-3">
                            <Badge variant="primary" className="flex items-center gap-1">
                                <Star className="w-3 h-3" />
                                Featured
                            </Badge>
                        </div>
                    )}

                    {/* Category badge */}
                    <div className="absolute top-3 right-3">
                        <Badge variant="secondary" size="sm">{site.category}</Badge>
                    </div>
                </div>

                {/* Content */}
                <div className="p-5">
                    <h3 className="font-bold text-lg mb-1 group-hover:text-accent-primary transition-colors">
                        {site.name}
                    </h3>
                    <p className="text-sm text-muted mb-4 line-clamp-2">
                        {site.description}
                    </p>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-1.5 mb-3">
                        {site.technologies.map((tech) => (
                            <TechPill key={tech} name={tech} />
                        ))}
                    </div>

                    {/* Features */}
                    <div className="flex flex-wrap gap-2">
                        {site.features.map((feature) => (
                            <span
                                key={feature}
                                className="text-xs px-2 py-0.5 rounded-full bg-black/[0.03] text-muted"
                            >
                                {feature}
                            </span>
                        ))}
                    </div>
                </div>
            </GlassCard>
        </motion.div>
    )
}

// ========================================
// DEMO PREVIEW MODAL
// ========================================

interface DemoPreviewModalProps {
    site: DemoSite | null
    isOpen: boolean
    onClose: () => void
}

function DemoPreviewModal({ site, isOpen, onClose }: DemoPreviewModalProps) {
    const [deviceType, setDeviceType] = useState<DeviceType>('desktop')

    if (!site) return null

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                >
                    <motion.div
                        className="w-full max-w-6xl h-[90vh] flex flex-col"
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-4">
                                <span className="text-4xl">{site.emoji}</span>
                                <div>
                                    <h2 className="text-xl font-bold text-white">{site.name}</h2>
                                    <p className="text-sm text-white/60">{site.description}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                {/* Device switcher */}
                                <div className="flex bg-white/10 rounded-xl p-1">
                                    {[
                                        { type: 'mobile' as const, icon: <Smartphone className="w-4 h-4" /> },
                                        { type: 'tablet' as const, icon: <Tablet className="w-4 h-4" /> },
                                        { type: 'desktop' as const, icon: <Monitor className="w-4 h-4" /> },
                                    ].map((device) => (
                                        <button
                                            key={device.type}
                                            className={cn(
                                                'p-2 rounded-lg transition-colors',
                                                deviceType === device.type
                                                    ? 'bg-white text-gray-900'
                                                    : 'text-white/60 hover:text-white'
                                            )}
                                            onClick={() => setDeviceType(device.type)}
                                        >
                                            {device.icon}
                                        </button>
                                    ))}
                                </div>

                                {/* Open in new tab */}
                                <Link href={site.url} target="_blank">
                                    <Button variant="secondary" size="sm" icon={<ExternalLink className="w-4 h-4" />}>
                                        Open
                                    </Button>
                                </Link>

                                {/* Close */}
                                <button
                                    className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
                                    onClick={onClose}
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>
                        </div>

                        {/* Preview frame */}
                        <div className="flex-1 flex items-center justify-center overflow-hidden">
                            <DeviceFrame type={deviceType}>
                                <iframe
                                    src={site.url}
                                    className="w-full h-full border-0"
                                    title={site.name}
                                />
                            </DeviceFrame>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}

// ========================================
// DEMO SITES SECTION
// ========================================

export function DemoSitesSection() {
    const [selectedSite, setSelectedSite] = useState<DemoSite | null>(null)
    const [filter, setFilter] = useState('all')
    const containerRef = useRef<HTMLDivElement>(null)

    const categories = ['all', ...new Set(demoSites.map((s) => s.category))]
    const filteredSites = filter === 'all'
        ? demoSites
        : demoSites.filter((s) => s.category === filter)

    return (
        <section id="demos" className="section" ref={containerRef}>
            <div className="container">
                {/* Header */}
                <motion.div
                    className="text-center mb-12"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <Badge variant="primary" className="mb-4">
                        <Globe className="w-3 h-3 mr-1" />
                        Live Demos
                    </Badge>
                    <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                        Website <span className="gradient-text">Showcase</span>
                    </h2>
                    <p className="text-muted max-w-2xl mx-auto">
                        Explore my web development skills! These are fully functional demo sites
                        showcasing different styles, industries, and technologies. Click to preview or open them.
                    </p>
                </motion.div>

                {/* Filter buttons */}
                <motion.div
                    className="flex justify-center gap-2 flex-wrap mb-10"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    {categories.map((category) => (
                        <motion.button
                            key={category}
                            className={cn(
                                'px-4 py-2 rounded-full text-sm font-medium transition-all capitalize',
                                filter === category
                                    ? 'bg-accent-primary text-white'
                                    : 'bg-white/70 border border-black/[0.08] hover:border-accent-primary/30'
                            )}
                            onClick={() => setFilter(category)}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            {category}
                        </motion.button>
                    ))}
                </motion.div>

                {/* Sites grid */}
                <motion.div
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                    layout
                >
                    <AnimatePresence mode="popLayout">
                        {filteredSites.map((site) => (
                            <DemoSiteCard
                                key={site.id}
                                site={site}
                                onPreview={setSelectedSite}
                            />
                        ))}
                    </AnimatePresence>
                </motion.div>

                {/* CTA */}
                <motion.div
                    className="text-center mt-12"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <p className="text-muted mb-4">
                        Need a custom website? Let&apos;s build something amazing together!
                    </p>
                    <Button
                        variant="primary"
                        size="lg"
                        icon={<Sparkles className="w-5 h-5" />}
                        onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                    >
                        Get Your Website
                    </Button>
                </motion.div>
            </div>

            {/* Preview modal */}
            <DemoPreviewModal
                site={selectedSite}
                isOpen={!!selectedSite}
                onClose={() => setSelectedSite(null)}
            />
        </section>
    )
}
