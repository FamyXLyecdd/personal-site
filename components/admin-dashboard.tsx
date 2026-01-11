'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    LayoutDashboard,
    BarChart3,
    Users,
    Eye,
    MessageSquare,
    Settings,
    Bell,
    Search,
    TrendingUp,
    TrendingDown,
    Globe,
    Clock,
    Calendar,
    ArrowUpRight,
    MoreHorizontal,
    Download,
} from 'lucide-react'
import { GlassCard } from '@/components/ui/glass-card'
import { Button } from '@/components/ui/button'
import { Avatar, Badge, ProgressBar } from '@/components/ui/index'
import { cn, formatNumber } from '@/lib/utils'

// ========================================
// MOCK DATA
// ========================================

const statsData = [
    {
        label: 'Total Views',
        value: 12847,
        change: 12.5,
        icon: <Eye className="w-5 h-5" />,
        color: '#0066FF',
    },
    {
        label: 'Unique Visitors',
        value: 4231,
        change: 8.2,
        icon: <Users className="w-5 h-5" />,
        color: '#00D4AA',
    },
    {
        label: 'Messages',
        value: 47,
        change: -3.1,
        icon: <MessageSquare className="w-5 h-5" />,
        color: '#9B59B6',
    },
    {
        label: 'Avg. Time',
        value: '3:42',
        change: 15.7,
        icon: <Clock className="w-5 h-5" />,
        color: '#FF6B6B',
    },
]

const recentMessages = [
    {
        id: 1,
        name: 'Alex Chen',
        email: 'alex@example.com',
        message: 'Hey! Love your work. Would you be interested in a collaboration?',
        time: '2 hours ago',
        unread: true,
    },
    {
        id: 2,
        name: 'Maria Santos',
        email: 'maria@example.com',
        message: 'I need a custom Discord bot for my gaming server...',
        time: '5 hours ago',
        unread: true,
    },
    {
        id: 3,
        name: 'John Doe',
        email: 'john@example.com',
        message: 'Great portfolio! Bookmarking this for future reference.',
        time: '1 day ago',
        unread: false,
    },
]

const topCountries = [
    { name: 'United States', flag: '🇺🇸', visitors: 2453, percent: 35 },
    { name: 'Philippines', flag: '🇵🇭', visitors: 1821, percent: 26 },
    { name: 'Germany', flag: '🇩🇪', visitors: 892, percent: 13 },
    { name: 'Japan', flag: '🇯🇵', visitors: 654, percent: 9 },
    { name: 'Others', flag: '🌍', visitors: 1180, percent: 17 },
]

const trafficData = [45, 62, 48, 75, 82, 68, 90, 78, 95, 88, 72, 85]

// ========================================
// STAT CARD
// ========================================

interface StatCardProps {
    label: string
    value: number | string
    change: number
    icon: React.ReactNode
    color: string
}

function StatCard({ label, value, change, icon, color }: StatCardProps) {
    const isPositive = change >= 0

    return (
        <GlassCard className="p-5">
            <div className="flex items-start justify-between">
                <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: `${color}15`, color }}
                >
                    {icon}
                </div>
                <div className={cn(
                    'flex items-center gap-1 text-sm font-medium',
                    isPositive ? 'text-green-600' : 'text-red-600'
                )}>
                    {isPositive ? (
                        <TrendingUp className="w-4 h-4" />
                    ) : (
                        <TrendingDown className="w-4 h-4" />
                    )}
                    {Math.abs(change)}%
                </div>
            </div>
            <div className="mt-4">
                <p className="text-2xl font-bold">
                    {typeof value === 'number' ? formatNumber(value) : value}
                </p>
                <p className="text-sm text-muted">{label}</p>
            </div>
        </GlassCard>
    )
}

// ========================================
// TRAFFIC CHART
// ========================================

function TrafficChart() {
    const max = Math.max(...trafficData)

    return (
        <GlassCard className="h-full">
            <div className="flex items-center justify-between mb-6">
                <h3 className="font-semibold flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-accent-primary" />
                    Traffic Overview
                </h3>
                <div className="flex items-center gap-2">
                    <Badge variant="secondary" size="sm">Last 12 months</Badge>
                    <button className="p-1.5 rounded-lg hover:bg-black/5">
                        <MoreHorizontal className="w-4 h-4 text-muted" />
                    </button>
                </div>
            </div>

            <div className="flex items-end justify-between h-32 gap-1">
                {trafficData.map((value, index) => (
                    <motion.div
                        key={index}
                        className="flex-1 bg-gradient-to-t from-accent-primary to-accent-secondary rounded-t-sm"
                        initial={{ height: 0 }}
                        animate={{ height: `${(value / max) * 100}%` }}
                        transition={{ delay: index * 0.05, duration: 0.5 }}
                    />
                ))}
            </div>
            <div className="flex justify-between mt-2 text-xs text-muted">
                <span>Jan</span>
                <span>Jun</span>
                <span>Dec</span>
            </div>
        </GlassCard>
    )
}

// ========================================
// COUNTRIES LIST
// ========================================

function CountriesList() {
    return (
        <GlassCard className="h-full">
            <div className="flex items-center justify-between mb-6">
                <h3 className="font-semibold flex items-center gap-2">
                    <Globe className="w-5 h-5 text-accent-primary" />
                    Top Countries
                </h3>
                <button className="text-sm text-accent-primary hover:underline">
                    View all
                </button>
            </div>

            <div className="space-y-4">
                {topCountries.map((country, index) => (
                    <motion.div
                        key={country.name}
                        className="flex items-center gap-3"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                    >
                        <span className="text-2xl">{country.flag}</span>
                        <div className="flex-1">
                            <div className="flex items-center justify-between mb-1">
                                <span className="text-sm font-medium">{country.name}</span>
                                <span className="text-xs text-muted">{formatNumber(country.visitors)}</span>
                            </div>
                            <ProgressBar value={country.percent} max={100} />
                        </div>
                    </motion.div>
                ))}
            </div>
        </GlassCard>
    )
}

// ========================================
// MESSAGES LIST
// ========================================

function MessagesList() {
    return (
        <GlassCard>
            <div className="flex items-center justify-between mb-6">
                <h3 className="font-semibold flex items-center gap-2">
                    <MessageSquare className="w-5 h-5 text-accent-primary" />
                    Recent Messages
                    <Badge variant="primary" size="sm">2 new</Badge>
                </h3>
                <button className="text-sm text-accent-primary hover:underline">
                    View all
                </button>
            </div>

            <div className="space-y-4">
                {recentMessages.map((message, index) => (
                    <motion.div
                        key={message.id}
                        className={cn(
                            'flex items-start gap-3 p-3 rounded-xl transition-colors cursor-pointer',
                            message.unread ? 'bg-accent-primary/5' : 'hover:bg-black/[0.02]'
                        )}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ x: 5 }}
                    >
                        <Avatar
                            fallback={message.name.slice(0, 2).toUpperCase()}
                            size="md"
                        />
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                                <span className="font-medium text-sm">{message.name}</span>
                                <span className="text-xs text-muted">{message.time}</span>
                            </div>
                            <p className="text-sm text-muted truncate">{message.message}</p>
                        </div>
                        {message.unread && (
                            <div className="w-2 h-2 rounded-full bg-accent-primary flex-shrink-0 mt-2" />
                        )}
                    </motion.div>
                ))}
            </div>

            <Button variant="secondary" className="w-full mt-4">
                View All Messages
            </Button>
        </GlassCard>
    )
}

// ========================================
// DASHBOARD SIDEBAR
// ========================================

const sidebarItems = [
    { icon: <LayoutDashboard className="w-5 h-5" />, label: 'Dashboard', active: true },
    { icon: <BarChart3 className="w-5 h-5" />, label: 'Analytics' },
    { icon: <MessageSquare className="w-5 h-5" />, label: 'Messages', badge: 2 },
    { icon: <Users className="w-5 h-5" />, label: 'Visitors' },
    { icon: <Settings className="w-5 h-5" />, label: 'Settings' },
]

function DashboardSidebar() {
    return (
        <aside className="w-64 p-4 border-r border-black/[0.05]">
            <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent-primary to-accent-secondary flex items-center justify-center text-white font-bold">
                    P
                </div>
                <div>
                    <h2 className="font-bold">Portfolio</h2>
                    <p className="text-xs text-muted">Admin Dashboard</p>
                </div>
            </div>

            <nav className="space-y-1">
                {sidebarItems.map((item) => (
                    <button
                        key={item.label}
                        className={cn(
                            'w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors',
                            item.active
                                ? 'bg-accent-primary/10 text-accent-primary'
                                : 'text-muted hover:bg-black/[0.02] hover:text-foreground'
                        )}
                    >
                        {item.icon}
                        {item.label}
                        {item.badge && (
                            <span className="ml-auto bg-accent-primary text-white text-xs px-2 py-0.5 rounded-full">
                                {item.badge}
                            </span>
                        )}
                    </button>
                ))}
            </nav>
        </aside>
    )
}

// ========================================
// DASHBOARD HEADER
// ========================================

function DashboardHeader() {
    return (
        <header className="flex items-center justify-between p-6 border-b border-black/[0.05]">
            <div>
                <h1 className="text-2xl font-bold">Dashboard</h1>
                <p className="text-sm text-muted">Welcome back! Here&apos;s what&apos;s happening.</p>
            </div>

            <div className="flex items-center gap-4">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
                    <input
                        type="text"
                        placeholder="Search..."
                        className="pl-10 pr-4 py-2 rounded-xl bg-white/70 border border-black/[0.08] text-sm outline-none focus:border-accent-primary/30 w-64"
                    />
                </div>

                <Button variant="ghost" size="sm" icon={<Bell className="w-4 h-4" />} />

                <Button variant="primary" size="sm" icon={<Download className="w-4 h-4" />}>
                    Export
                </Button>

                <Avatar fallback="YN" size="md" />
            </div>
        </header>
    )
}

// ========================================
// MAIN DASHBOARD
// ========================================

export function AdminDashboard() {
    return (
        <div className="min-h-screen bg-background flex">
            <DashboardSidebar />

            <main className="flex-1">
                <DashboardHeader />

                <div className="p-6">
                    {/* Stats grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                        {statsData.map((stat) => (
                            <StatCard key={stat.label} {...stat} />
                        ))}
                    </div>

                    {/* Charts & Lists */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                        <div className="lg:col-span-2">
                            <TrafficChart />
                        </div>
                        <CountriesList />
                    </div>

                    {/* Messages */}
                    <MessagesList />
                </div>
            </main>
        </div>
    )
}
