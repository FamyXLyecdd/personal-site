'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    Users,
    Eye,
    Clock,
    MapPin,
    Globe,
    Activity,
    TrendingUp,
    Zap,
} from 'lucide-react'
import { cn, formatNumber } from '@/lib/utils'

// ========================================
// SIMULATED LIVE DATA
// ========================================

interface VisitorData {
    total: number
    online: number
    today: number
    countries: string[]
    recentActivity: ActivityItem[]
    peakHour: number
    avgTimeOnSite: number
}

interface ActivityItem {
    id: string
    type: 'view' | 'click' | 'scroll' | 'contact' | 'project'
    message: string
    timestamp: Date
    location?: string
    flag?: string
}

// Country flags
const countryFlags: Record<string, string> = {
    'United States': '🇺🇸',
    'Philippines': '🇵🇭',
    'United Kingdom': '🇬🇧',
    'Germany': '🇩🇪',
    'Japan': '🇯🇵',
    'Canada': '🇨🇦',
    'Australia': '🇦🇺',
    'France': '🇫🇷',
    'Brazil': '🇧🇷',
    'India': '🇮🇳',
    'South Korea': '🇰🇷',
    'Netherlands': '🇳🇱',
    'Singapore': '🇸🇬',
    'Mexico': '🇲🇽',
    'Spain': '🇪🇸',
}

const countries = Object.keys(countryFlags)

// Generate random activity
function generateActivity(): ActivityItem {
    const types: ActivityItem['type'][] = ['view', 'click', 'scroll', 'project']
    const type = types[Math.floor(Math.random() * types.length)]
    const country = countries[Math.floor(Math.random() * countries.length)]

    const messages: Record<ActivityItem['type'], string[]> = {
        view: [
            'Someone is viewing the portfolio',
            'New visitor arrived',
            'Someone started exploring',
        ],
        click: [
            'Someone clicked a button',
            'Someone interacted with the page',
            'A button was pressed',
        ],
        scroll: [
            'Someone is scrolling through projects',
            'Someone explored the Skills section',
            'Someone reached the Contact section',
        ],
        contact: [
            'Someone submitted a message!',
            'New contact form submission!',
        ],
        project: [
            'Someone viewed a project',
            'Project details opened',
            'Someone checked out the work',
        ],
    }

    return {
        id: Math.random().toString(36).substring(2, 9),
        type,
        message: messages[type][Math.floor(Math.random() * messages[type].length)],
        timestamp: new Date(),
        location: country,
        flag: countryFlags[country],
    }
}

// ========================================
// ANIMATED NUMBER
// ========================================

function AnimatedNumber({ value, duration = 1000 }: { value: number; duration?: number }) {
    const [displayValue, setDisplayValue] = useState(0)

    useEffect(() => {
        let startTime: number
        let animationFrame: number
        const startValue = displayValue

        const animate = (timestamp: number) => {
            if (!startTime) startTime = timestamp
            const progress = Math.min((timestamp - startTime) / duration, 1)

            const eased = 1 - Math.pow(1 - progress, 3)
            setDisplayValue(Math.floor(startValue + (value - startValue) * eased))

            if (progress < 1) {
                animationFrame = requestAnimationFrame(animate)
            }
        }

        animationFrame = requestAnimationFrame(animate)
        return () => cancelAnimationFrame(animationFrame)
    }, [value, duration])

    return <>{formatNumber(displayValue)}</>
}

// ========================================
// STAT CARD
// ========================================

interface StatCardProps {
    icon: React.ReactNode
    label: string
    value: number | string
    suffix?: string
    trend?: number
    color?: string
}

function StatCard({ icon, label, value, suffix, trend, color = '#0066FF' }: StatCardProps) {
    return (
        <div className="flex items-center gap-3 p-3 rounded-xl bg-white/50 border border-black/[0.05]">
            <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: `${color}15` }}
            >
                <div style={{ color }}>{icon}</div>
            </div>
            <div>
                <p className="text-xs text-muted">{label}</p>
                <div className="flex items-baseline gap-1">
                    <span className="text-lg font-bold">
                        {typeof value === 'number' ? <AnimatedNumber value={value} /> : value}
                    </span>
                    {suffix && <span className="text-xs text-muted">{suffix}</span>}
                    {trend !== undefined && (
                        <span className={cn(
                            'text-xs font-medium flex items-center gap-0.5',
                            trend >= 0 ? 'text-green-600' : 'text-red-600'
                        )}>
                            <TrendingUp className="w-3 h-3" />
                            {trend >= 0 ? '+' : ''}{trend}%
                        </span>
                    )}
                </div>
            </div>
        </div>
    )
}

// ========================================
// ACTIVITY FEED ITEM
// ========================================

function ActivityFeedItem({ activity }: { activity: ActivityItem }) {
    const typeIcons: Record<ActivityItem['type'], React.ReactNode> = {
        view: <Eye className="w-3 h-3" />,
        click: <Zap className="w-3 h-3" />,
        scroll: <Activity className="w-3 h-3" />,
        contact: <Users className="w-3 h-3" />,
        project: <Globe className="w-3 h-3" />,
    }

    const typeColors: Record<ActivityItem['type'], string> = {
        view: '#0066FF',
        click: '#00D4AA',
        scroll: '#9B59B6',
        contact: '#FF6B6B',
        project: '#FFD93D',
    }

    const timeAgo = () => {
        const seconds = Math.floor((Date.now() - activity.timestamp.getTime()) / 1000)
        if (seconds < 60) return 'Just now'
        if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`
        return `${Math.floor(seconds / 3600)}h ago`
    }

    return (
        <motion.div
            className="flex items-center gap-3 py-2 border-b border-black/[0.03] last:border-0"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            layout
        >
            <div
                className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ background: `${typeColors[activity.type]}20`, color: typeColors[activity.type] }}
            >
                {typeIcons[activity.type]}
            </div>
            <div className="flex-1 min-w-0">
                <p className="text-sm truncate">{activity.message}</p>
                <div className="flex items-center gap-2 text-xs text-muted">
                    <span>{timeAgo()}</span>
                    {activity.flag && (
                        <>
                            <span>•</span>
                            <span>{activity.flag}</span>
                        </>
                    )}
                </div>
            </div>
        </motion.div>
    )
}

// ========================================
// LIVE VISITOR COUNTER
// ========================================

interface LiveVisitorCounterProps {
    className?: string
}

export function LiveVisitorCounter({ className }: LiveVisitorCounterProps) {
    const [data, setData] = useState<VisitorData>({
        total: 12847,
        online: 3,
        today: 47,
        countries: ['United States', 'Philippines', 'Germany'],
        recentActivity: [],
        peakHour: 14,
        avgTimeOnSite: 240,
    })

    // Simulate live updates
    useEffect(() => {
        // Add initial activities
        const initialActivities: ActivityItem[] = []
        for (let i = 0; i < 5; i++) {
            const activity = generateActivity()
            activity.timestamp = new Date(Date.now() - Math.random() * 600000)
            initialActivities.push(activity)
        }
        setData((prev) => ({
            ...prev,
            recentActivity: initialActivities.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime()),
        }))

        // Simulate new activity
        const activityInterval = setInterval(() => {
            if (Math.random() > 0.6) {
                const newActivity = generateActivity()
                setData((prev) => ({
                    ...prev,
                    recentActivity: [newActivity, ...prev.recentActivity].slice(0, 10),
                    today: prev.today + (Math.random() > 0.8 ? 1 : 0),
                    total: prev.total + (Math.random() > 0.9 ? 1 : 0),
                }))
            }
        }, 3000)

        // Simulate online count changes
        const onlineInterval = setInterval(() => {
            setData((prev) => ({
                ...prev,
                online: Math.max(1, prev.online + (Math.random() > 0.5 ? 1 : -1)),
            }))
        }, 10000)

        return () => {
            clearInterval(activityInterval)
            clearInterval(onlineInterval)
        }
    }, [])

    return (
        <motion.div
            className={cn(
                'fixed top-24 left-6 z-40 w-72',
                'bg-white/90 backdrop-blur-xl rounded-2xl border border-black/[0.08] shadow-lg',
                'overflow-hidden',
                className
            )}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
        >
            {/* Header */}
            <div className="px-4 py-3 border-b border-black/[0.05] bg-gradient-to-r from-accent-primary/5 to-accent-secondary/5">
                <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-sm flex items-center gap-2">
                        <div className="relative">
                            <Activity className="w-4 h-4 text-accent-primary" />
                            <motion.div
                                className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-green-500"
                                animate={{ scale: [1, 1.3, 1] }}
                                transition={{ duration: 2, repeat: Infinity }}
                            />
                        </div>
                        Live Activity
                    </h3>
                    <div className="flex items-center gap-1.5">
                        <motion.div
                            className="w-2 h-2 rounded-full bg-green-500"
                            animate={{ opacity: [1, 0.5, 1] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                        />
                        <span className="text-xs text-green-600 font-medium">
                            {data.online} online
                        </span>
                    </div>
                </div>
            </div>

            {/* Stats grid */}
            <div className="p-3 grid grid-cols-2 gap-2">
                <StatCard
                    icon={<Eye className="w-4 h-4" />}
                    label="Total Views"
                    value={data.total}
                    color="#0066FF"
                />
                <StatCard
                    icon={<Clock className="w-4 h-4" />}
                    label="Today"
                    value={data.today}
                    trend={12}
                    color="#00D4AA"
                />
            </div>

            {/* Country flags */}
            <div className="px-4 pb-2">
                <p className="text-xs text-muted mb-2 flex items-center gap-1">
                    <Globe className="w-3 h-3" />
                    Recent visitors from:
                </p>
                <div className="flex gap-1">
                    {data.countries.slice(0, 6).map((country) => (
                        <span key={country} className="text-lg" title={country}>
                            {countryFlags[country]}
                        </span>
                    ))}
                    {data.countries.length > 6 && (
                        <span className="text-xs text-muted">+{data.countries.length - 6}</span>
                    )}
                </div>
            </div>

            {/* Activity feed */}
            <div className="px-4 py-3 border-t border-black/[0.05]">
                <p className="text-xs text-muted mb-2">Recent activity</p>
                <div className="max-h-48 overflow-y-auto">
                    <AnimatePresence mode="popLayout">
                        {data.recentActivity.slice(0, 5).map((activity) => (
                            <ActivityFeedItem key={activity.id} activity={activity} />
                        ))}
                    </AnimatePresence>
                </div>
            </div>
        </motion.div>
    )
}

// ========================================
// COMPACT VISITOR BADGE
// ========================================

interface VisitorBadgeProps {
    className?: string
}

export function VisitorBadge({ className }: VisitorBadgeProps) {
    const [online, setOnline] = useState(3)
    const [total, setTotal] = useState(12847)

    useEffect(() => {
        const interval = setInterval(() => {
            setOnline(Math.max(1, online + (Math.random() > 0.5 ? 1 : -1)))
            if (Math.random() > 0.9) setTotal((prev) => prev + 1)
        }, 5000)
        return () => clearInterval(interval)
    }, [online])

    return (
        <motion.div
            className={cn(
                'inline-flex items-center gap-3 px-4 py-2 rounded-full',
                'bg-white/80 backdrop-blur-lg border border-black/[0.08] shadow-sm',
                className
            )}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
        >
            <div className="flex items-center gap-1.5">
                <motion.div
                    className="w-2 h-2 rounded-full bg-green-500"
                    animate={{ scale: [1, 1.3, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                />
                <span className="text-sm font-medium">{online} online</span>
            </div>
            <div className="w-px h-4 bg-black/10" />
            <div className="flex items-center gap-1.5">
                <Eye className="w-3.5 h-3.5 text-muted" />
                <span className="text-sm text-muted">
                    <AnimatedNumber value={total} /> views
                </span>
            </div>
        </motion.div>
    )
}

// ========================================
// YOU ARE VISITOR NUMBER
// ========================================

interface VisitorNumberProps {
    className?: string
}

export function VisitorNumber({ className }: VisitorNumberProps) {
    const [number, setNumber] = useState(12848)

    return (
        <motion.div
            className={cn(
                'text-center p-6 rounded-2xl',
                'bg-gradient-to-br from-accent-primary/10 to-accent-secondary/10',
                'border border-accent-primary/20',
                className
            )}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
        >
            <p className="text-sm text-muted mb-2">You are visitor number</p>
            <motion.div
                className="text-4xl font-bold gradient-text"
                initial={{ scale: 0.5 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 400 }}
            >
                #{formatNumber(number)}
            </motion.div>
            <p className="text-xs text-muted mt-2">Thanks for stopping by! 🎉</p>
        </motion.div>
    )
}
