'use client'

import { useState, ReactNode } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    Heart,
    Bookmark,
    Share2,
    MessageCircle,
    MoreHorizontal,
    Camera,
    MapPin,
    Clock,
    ThumbsUp,
    Smile,
    Send,
    Image as ImageIcon,
    Link2,
    AtSign,
    Hash,
    ChevronDown,
    ChevronUp,
    Eye,
    EyeOff,
    Check,
    X,
    AlertCircle,
    Info,
    AlertTriangle,
    CheckCircle,
    XCircle,
    Loader2,
    RefreshCw,
    Download,
    Upload,
    Trash2,
    Edit,
    Copy,
    Maximize2,
    Minimize2,
    Volume2,
    VolumeX,
    Play,
    Pause,
    SkipBack,
    SkipForward,
    Shuffle,
    Repeat,
    Moon,
    Sun,
    Monitor,
    Bell,
    BellOff,
    Search,
    Filter,
    Grid,
    List,
    Settings,
    User,
    LogOut,
    Menu,
    Home,
    Folder,
    File,
    Calendar,
    Mail,
    Phone,
    Globe,
    Lock,
    Unlock,
    Key,
    Shield,
    Zap,
    Star,
    Flag,
    Tag,
    Bookmark as BookmarkIcon,
} from 'lucide-react'
import { GlassCard } from '@/components/ui/glass-card'
import { Button } from '@/components/ui/button'
import { Badge, Avatar, StarRating, ProgressBar, PulseDot, Skeleton } from '@/components/ui/index'
import { Input, Textarea } from '@/components/ui/input'
import { cn } from '@/lib/utils'

// ========================================
// COMPONENT CATEGORIES
// ========================================

interface ComponentDemo {
    id: string
    name: string
    description: string
    category: string
    component: ReactNode
}

// ========================================
// BUTTON VARIANTS
// ========================================

const buttonVariants: ComponentDemo[] = [
    {
        id: 'btn-primary',
        name: 'Primary Button',
        description: 'Main call-to-action button',
        category: 'buttons',
        component: (
            <div className="flex gap-3 flex-wrap">
                <Button variant="primary">Primary</Button>
                <Button variant="primary" size="sm">Small</Button>
                <Button variant="primary" size="lg">Large</Button>
            </div>
        ),
    },
    {
        id: 'btn-secondary',
        name: 'Secondary Button',
        description: 'Alternative action button',
        category: 'buttons',
        component: (
            <div className="flex gap-3 flex-wrap">
                <Button variant="secondary">Secondary</Button>
                <Button variant="secondary" icon={<Download className="w-4 h-4" />}>With Icon</Button>
            </div>
        ),
    },
    {
        id: 'btn-ghost',
        name: 'Ghost Button',
        description: 'Subtle button for less emphasis',
        category: 'buttons',
        component: (
            <div className="flex gap-3 flex-wrap">
                <Button variant="ghost">Ghost</Button>
                <Button variant="ghost" icon={<Settings className="w-4 h-4" />} />
            </div>
        ),
    },
    {
        id: 'btn-loading',
        name: 'Loading Button',
        description: 'Button with loading state',
        category: 'buttons',
        component: (
            <div className="flex gap-3 flex-wrap">
                <Button variant="primary" loading>Loading</Button>
                <Button variant="secondary" loading>Processing</Button>
            </div>
        ),
    },
    {
        id: 'btn-icon',
        name: 'Icon Buttons',
        description: 'Buttons with icons',
        category: 'buttons',
        component: (
            <div className="flex gap-3 flex-wrap">
                <Button variant="primary" icon={<Heart className="w-4 h-4" />}>Like</Button>
                <Button variant="secondary" icon={<Share2 className="w-4 h-4" />}>Share</Button>
                <Button variant="ghost" icon={<Bookmark className="w-4 h-4" />}>Save</Button>
            </div>
        ),
    },
]

// ========================================
// BADGE VARIANTS
// ========================================

const badgeVariants: ComponentDemo[] = [
    {
        id: 'badge-variants',
        name: 'Badge Variants',
        description: 'Different badge styles',
        category: 'badges',
        component: (
            <div className="flex gap-2 flex-wrap">
                <Badge variant="default">Default</Badge>
                <Badge variant="primary">Primary</Badge>
                <Badge variant="secondary">Secondary</Badge>
                <Badge variant="success">Success</Badge>
                <Badge variant="warning">Warning</Badge>
                <Badge variant="error">Error</Badge>
            </div>
        ),
    },
    {
        id: 'badge-sizes',
        name: 'Badge Sizes',
        description: 'Different badge sizes',
        category: 'badges',
        component: (
            <div className="flex gap-2 items-center flex-wrap">
                <Badge variant="primary" size="sm">Small</Badge>
                <Badge variant="primary" size="md">Medium</Badge>
                <Badge variant="primary" size="lg">Large</Badge>
            </div>
        ),
    },
    {
        id: 'badge-with-icons',
        name: 'Badges with Icons',
        description: 'Badges containing icons',
        category: 'badges',
        component: (
            <div className="flex gap-2 flex-wrap">
                <Badge variant="success" className="flex items-center gap-1">
                    <Check className="w-3 h-3" />
                    Verified
                </Badge>
                <Badge variant="warning" className="flex items-center gap-1">
                    <AlertTriangle className="w-3 h-3" />
                    Warning
                </Badge>
                <Badge variant="error" className="flex items-center gap-1">
                    <X className="w-3 h-3" />
                    Failed
                </Badge>
            </div>
        ),
    },
]

// ========================================
// ALERT VARIANTS
// ========================================

interface AlertProps {
    variant: 'info' | 'success' | 'warning' | 'error'
    title: string
    description: string
}

function Alert({ variant, title, description }: AlertProps) {
    const icons = {
        info: <Info className="w-5 h-5" />,
        success: <CheckCircle className="w-5 h-5" />,
        warning: <AlertTriangle className="w-5 h-5" />,
        error: <XCircle className="w-5 h-5" />,
    }

    const colors = {
        info: 'bg-blue-50 border-blue-200 text-blue-800',
        success: 'bg-green-50 border-green-200 text-green-800',
        warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
        error: 'bg-red-50 border-red-200 text-red-800',
    }

    return (
        <div className={cn('flex gap-3 p-4 rounded-xl border', colors[variant])}>
            {icons[variant]}
            <div>
                <h4 className="font-semibold text-sm">{title}</h4>
                <p className="text-sm opacity-80">{description}</p>
            </div>
        </div>
    )
}

const alertVariants: ComponentDemo[] = [
    {
        id: 'alert-info',
        name: 'Info Alert',
        description: 'Informational message',
        category: 'alerts',
        component: <Alert variant="info" title="Did you know?" description="This is an informational message." />,
    },
    {
        id: 'alert-success',
        name: 'Success Alert',
        description: 'Success message',
        category: 'alerts',
        component: <Alert variant="success" title="Success!" description="Your action was completed successfully." />,
    },
    {
        id: 'alert-warning',
        name: 'Warning Alert',
        description: 'Warning message',
        category: 'alerts',
        component: <Alert variant="warning" title="Heads up!" description="This action might have consequences." />,
    },
    {
        id: 'alert-error',
        name: 'Error Alert',
        description: 'Error message',
        category: 'alerts',
        component: <Alert variant="error" title="Error" description="Something went wrong. Please try again." />,
    },
]

// ========================================
// INPUT VARIANTS
// ========================================

const inputVariants: ComponentDemo[] = [
    {
        id: 'input-basic',
        name: 'Basic Input',
        description: 'Standard text input',
        category: 'inputs',
        component: (
            <div className="space-y-3 w-full max-w-sm">
                <Input placeholder="Enter your name" />
                <Input placeholder="Enter email" type="email" />
                <Input placeholder="Password" type="password" />
            </div>
        ),
    },
    {
        id: 'input-with-label',
        name: 'Floating Label',
        description: 'Input with floating label',
        category: 'inputs',
        component: (
            <div className="space-y-4 w-full max-w-sm">
                <Input label="Full Name" placeholder="John Doe" />
                <Input label="Email Address" placeholder="john@example.com" type="email" />
            </div>
        ),
    },
    {
        id: 'input-states',
        name: 'Input States',
        description: 'Different input states',
        category: 'inputs',
        component: (
            <div className="space-y-3 w-full max-w-sm">
                <Input placeholder="Default state" />
                <Input placeholder="Error state" error="This field is required" />
                <Input placeholder="Disabled state" disabled />
            </div>
        ),
    },
    {
        id: 'textarea',
        name: 'Textarea',
        description: 'Multi-line text input',
        category: 'inputs',
        component: (
            <div className="w-full max-w-sm">
                <Textarea label="Message" placeholder="Write your message here..." />
            </div>
        ),
    },
]

// ========================================
// AVATAR VARIANTS
// ========================================

const avatarVariants: ComponentDemo[] = [
    {
        id: 'avatar-sizes',
        name: 'Avatar Sizes',
        description: 'Different avatar sizes',
        category: 'avatars',
        component: (
            <div className="flex items-center gap-3">
                <Avatar size="sm" fallback="SM" />
                <Avatar size="md" fallback="MD" />
                <Avatar size="lg" fallback="LG" />
                <Avatar size="xl" fallback="XL" />
            </div>
        ),
    },
    {
        id: 'avatar-status',
        name: 'Avatar with Status',
        description: 'Avatar with online status indicator',
        category: 'avatars',
        component: (
            <div className="flex items-center gap-4">
                <div className="relative">
                    <Avatar size="lg" fallback="ON" />
                    <div className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-green-500 border-2 border-white" />
                </div>
                <div className="relative">
                    <Avatar size="lg" fallback="AW" />
                    <div className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-yellow-500 border-2 border-white" />
                </div>
                <div className="relative">
                    <Avatar size="lg" fallback="OF" />
                    <div className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-gray-400 border-2 border-white" />
                </div>
            </div>
        ),
    },
    {
        id: 'avatar-group',
        name: 'Avatar Group',
        description: 'Stacked avatars',
        category: 'avatars',
        component: (
            <div className="flex -space-x-3">
                <Avatar size="md" fallback="A" className="border-2 border-white" />
                <Avatar size="md" fallback="B" className="border-2 border-white" />
                <Avatar size="md" fallback="C" className="border-2 border-white" />
                <Avatar size="md" fallback="D" className="border-2 border-white" />
                <div className="w-10 h-10 rounded-full bg-accent-primary text-white text-xs font-medium flex items-center justify-center border-2 border-white">
                    +5
                </div>
            </div>
        ),
    },
]

// ========================================
// LOADING VARIANTS
// ========================================

const loadingVariants: ComponentDemo[] = [
    {
        id: 'loading-spinner',
        name: 'Spinner',
        description: 'Rotating spinner',
        category: 'loading',
        component: (
            <div className="flex items-center gap-4">
                <Loader2 className="w-6 h-6 animate-spin text-accent-primary" />
                <Loader2 className="w-8 h-8 animate-spin text-accent-secondary" />
                <Loader2 className="w-10 h-10 animate-spin text-muted" />
            </div>
        ),
    },
    {
        id: 'loading-dots',
        name: 'Loading Dots',
        description: 'Animated dots',
        category: 'loading',
        component: (
            <div className="flex items-center gap-1">
                {[0, 1, 2].map((i) => (
                    <motion.div
                        key={i}
                        className="w-3 h-3 rounded-full bg-accent-primary"
                        animate={{ y: [0, -8, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
                    />
                ))}
            </div>
        ),
    },
    {
        id: 'loading-pulse',
        name: 'Pulse Dot',
        description: 'Pulsing indicator',
        category: 'loading',
        component: (
            <div className="flex items-center gap-4">
                <PulseDot color="green" />
                <PulseDot color="blue" />
                <PulseDot color="red" />
            </div>
        ),
    },
    {
        id: 'loading-skeleton',
        name: 'Skeleton',
        description: 'Content placeholder',
        category: 'loading',
        component: (
            <div className="space-y-3 w-full max-w-sm">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-20 w-full" />
            </div>
        ),
    },
]

// ========================================
// PROGRESS VARIANTS
// ========================================

const progressVariants: ComponentDemo[] = [
    {
        id: 'progress-basic',
        name: 'Progress Bar',
        description: 'Basic progress indicator',
        category: 'progress',
        component: (
            <div className="space-y-4 w-full max-w-md">
                <ProgressBar value={25} max={100} />
                <ProgressBar value={50} max={100} />
                <ProgressBar value={75} max={100} />
                <ProgressBar value={100} max={100} />
            </div>
        ),
    },
    {
        id: 'progress-animated',
        name: 'Animated Progress',
        description: 'Progress with animation',
        category: 'progress',
        component: (
            <div className="w-full max-w-md">
                <ProgressBar value={65} max={100} animated />
            </div>
        ),
    },
    {
        id: 'progress-star',
        name: 'Star Rating',
        description: 'Star-based rating',
        category: 'progress',
        component: (
            <div className="space-y-3">
                <StarRating rating={5} />
                <StarRating rating={4} />
                <StarRating rating={3.5} />
                <StarRating rating={2} />
            </div>
        ),
    },
]

// ========================================
// CARD VARIANTS
// ========================================

const cardVariants: ComponentDemo[] = [
    {
        id: 'card-glass',
        name: 'Glass Card',
        description: 'Glassmorphism card',
        category: 'cards',
        component: (
            <GlassCard className="max-w-sm">
                <h3 className="font-semibold mb-2">Glass Card</h3>
                <p className="text-sm text-muted">
                    This card has a beautiful glassmorphism effect with backdrop blur.
                </p>
            </GlassCard>
        ),
    },
    {
        id: 'card-hover',
        name: 'Hover Card',
        description: 'Card with hover effect',
        category: 'cards',
        component: (
            <GlassCard className="max-w-sm" hover>
                <h3 className="font-semibold mb-2">Hover Me!</h3>
                <p className="text-sm text-muted">
                    This card lifts up when you hover over it.
                </p>
            </GlassCard>
        ),
    },
    {
        id: 'card-with-image',
        name: 'Card with Image',
        description: 'Full featured card',
        category: 'cards',
        component: (
            <GlassCard padding="none" className="max-w-sm overflow-hidden">
                <div className="h-32 bg-gradient-to-br from-accent-primary to-accent-secondary flex items-center justify-center text-4xl">
                    🚀
                </div>
                <div className="p-4">
                    <Badge variant="primary" size="sm" className="mb-2">Featured</Badge>
                    <h3 className="font-semibold mb-1">Project Title</h3>
                    <p className="text-sm text-muted">
                        A brief description of this amazing project.
                    </p>
                </div>
            </GlassCard>
        ),
    },
]

// ========================================
// ALL COMPONENTS
// ========================================

const allComponents = [
    ...buttonVariants,
    ...badgeVariants,
    ...alertVariants,
    ...inputVariants,
    ...avatarVariants,
    ...loadingVariants,
    ...progressVariants,
    ...cardVariants,
]

const componentCategories = [
    { id: 'all', name: 'All Components' },
    { id: 'buttons', name: 'Buttons' },
    { id: 'badges', name: 'Badges' },
    { id: 'alerts', name: 'Alerts' },
    { id: 'inputs', name: 'Inputs' },
    { id: 'avatars', name: 'Avatars' },
    { id: 'loading', name: 'Loading' },
    { id: 'progress', name: 'Progress' },
    { id: 'cards', name: 'Cards' },
]

// ========================================
// COMPONENT LIBRARY
// ========================================

export function ComponentLibrary() {
    const [selectedCategory, setSelectedCategory] = useState('all')

    const filteredComponents = selectedCategory === 'all'
        ? allComponents
        : allComponents.filter((c) => c.category === selectedCategory)

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="text-center">
                <h2 className="text-3xl font-bold mb-2">
                    Component <span className="gradient-text">Library</span>
                </h2>
                <p className="text-muted max-w-xl mx-auto">
                    A collection of reusable UI components built with React, Tailwind CSS, and Framer Motion.
                </p>
            </div>

            {/* Categories */}
            <div className="flex justify-center gap-2 flex-wrap">
                {componentCategories.map((category) => (
                    <motion.button
                        key={category.id}
                        className={cn(
                            'px-4 py-2 rounded-full text-sm font-medium transition-all',
                            selectedCategory === category.id
                                ? 'bg-accent-primary text-white'
                                : 'bg-white/70 border border-black/[0.08] hover:border-accent-primary/30'
                        )}
                        onClick={() => setSelectedCategory(category.id)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        {category.name}
                    </motion.button>
                ))}
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <AnimatePresence mode="popLayout">
                    {filteredComponents.map((comp) => (
                        <motion.div
                            key={comp.id}
                            layout
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                        >
                            <GlassCard className="h-full">
                                <h3 className="font-semibold mb-1">{comp.name}</h3>
                                <p className="text-sm text-muted mb-4">{comp.description}</p>
                                <div className="p-4 rounded-xl bg-black/[0.02] flex items-center justify-center min-h-[100px]">
                                    {comp.component}
                                </div>
                            </GlassCard>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </div>
    )
}
