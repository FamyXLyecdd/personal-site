'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import {
    LayoutDashboard,
    Users,
    ShoppingBag,
    BarChart3,
    Settings,
    Bell,
    Search,
    Menu,
    X,
    TrendingUp,
    TrendingDown,
    DollarSign,
    Package,
    Eye,
    ArrowUpRight,
    MoreHorizontal,
    ChevronDown,
    Calendar,
    Download,
    Filter,
    CheckCircle,
    Clock,
    XCircle,
} from 'lucide-react'

// ========================================
// TYPES
// ========================================

interface Stat {
    label: string
    value: string
    change: number
    icon: React.ReactNode
    color: string
}

interface Order {
    id: string
    customer: string
    email: string
    product: string
    amount: number
    status: 'completed' | 'pending' | 'cancelled'
    date: string
}

// ========================================
// SAMPLE DATA
// ========================================

const stats: Stat[] = [
    {
        label: 'Total Revenue',
        value: '$45,231.89',
        change: 12.5,
        icon: <DollarSign className="w-5 h-5" />,
        color: '#10B981',
    },
    {
        label: 'Total Orders',
        value: '2,345',
        change: 8.2,
        icon: <ShoppingBag className="w-5 h-5" />,
        color: '#3B82F6',
    },
    {
        label: 'Active Users',
        value: '12,789',
        change: -2.4,
        icon: <Users className="w-5 h-5" />,
        color: '#8B5CF6',
    },
    {
        label: 'Conversion Rate',
        value: '3.24%',
        change: 5.7,
        icon: <TrendingUp className="w-5 h-5" />,
        color: '#F59E0B',
    },
]

const recentOrders: Order[] = [
    { id: 'ORD-001', customer: 'John Smith', email: 'john@email.com', product: 'Pro Plan', amount: 299, status: 'completed', date: '2 min ago' },
    { id: 'ORD-002', customer: 'Sarah Johnson', email: 'sarah@email.com', product: 'Team Plan', amount: 599, status: 'pending', date: '15 min ago' },
    { id: 'ORD-003', customer: 'Mike Brown', email: 'mike@email.com', product: 'Basic Plan', amount: 99, status: 'completed', date: '1 hour ago' },
    { id: 'ORD-004', customer: 'Emily Davis', email: 'emily@email.com', product: 'Pro Plan', amount: 299, status: 'cancelled', date: '2 hours ago' },
    { id: 'ORD-005', customer: 'David Wilson', email: 'david@email.com', product: 'Enterprise', amount: 999, status: 'completed', date: '3 hours ago' },
]

const chartData = [35, 50, 40, 60, 45, 65, 55, 70, 60, 80, 75, 85]

// ========================================
// SIDEBAR
// ========================================

function Sidebar({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
    const navItems = [
        { icon: <LayoutDashboard className="w-5 h-5" />, label: 'Dashboard', active: true },
        { icon: <BarChart3 className="w-5 h-5" />, label: 'Analytics' },
        { icon: <ShoppingBag className="w-5 h-5" />, label: 'Orders', badge: 12 },
        { icon: <Users className="w-5 h-5" />, label: 'Customers' },
        { icon: <Package className="w-5 h-5" />, label: 'Products' },
        { icon: <Settings className="w-5 h-5" />, label: 'Settings' },
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

            {/* Sidebar */}
            <motion.aside
                className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-gray-900 text-white transform transition-transform lg:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'
                    }`}
            >
                <div className="p-6">
                    {/* Logo */}
                    <div className="flex items-center gap-3 mb-8">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center font-bold">
                            A
                        </div>
                        <span className="text-xl font-bold">AdminFlow</span>
                    </div>

                    {/* Nav */}
                    <nav className="space-y-2">
                        {navItems.map((item) => (
                            <button
                                key={item.label}
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${item.active
                                        ? 'bg-blue-600 text-white'
                                        : 'text-gray-400 hover:bg-white/5 hover:text-white'
                                    }`}
                            >
                                {item.icon}
                                {item.label}
                                {item.badge && (
                                    <span className="ml-auto px-2 py-0.5 bg-red-500 text-white text-xs rounded-full">
                                        {item.badge}
                                    </span>
                                )}
                            </button>
                        ))}
                    </nav>
                </div>

                {/* User */}
                <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-white/10">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-cyan-500 flex items-center justify-center text-lg">
                            👤
                        </div>
                        <div className="flex-1">
                            <p className="font-medium text-sm">Admin User</p>
                            <p className="text-xs text-gray-400">admin@company.com</p>
                        </div>
                    </div>
                </div>
            </motion.aside>
        </>
    )
}

// ========================================
// HEADER
// ========================================

function Header({ onMenuClick }: { onMenuClick: () => void }) {
    return (
        <header className="bg-white border-b border-gray-200 px-6 py-4">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <button className="lg:hidden p-2 hover:bg-gray-100 rounded-lg" onClick={onMenuClick}>
                        <Menu className="w-6 h-6" />
                    </button>
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search..."
                            className="pl-10 pr-4 py-2 bg-gray-100 rounded-xl w-64 outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <button className="relative p-2 hover:bg-gray-100 rounded-lg">
                        <Bell className="w-6 h-6" />
                        <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
                    </button>
                    <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold">
                            A
                        </div>
                        <ChevronDown className="w-4 h-4 text-gray-400" />
                    </div>
                </div>
            </div>
        </header>
    )
}

// ========================================
// STAT CARD
// ========================================

function StatCard({ stat, index }: { stat: Stat; index: number }) {
    const isPositive = stat.change >= 0

    return (
        <motion.div
            className="bg-white rounded-2xl p-6 border border-gray-100"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
        >
            <div className="flex items-start justify-between">
                <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: `${stat.color}20`, color: stat.color }}
                >
                    {stat.icon}
                </div>
                <div className={`flex items-center gap-1 text-sm font-medium ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                    {isPositive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                    {Math.abs(stat.change)}%
                </div>
            </div>
            <div className="mt-4">
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-gray-500 text-sm">{stat.label}</p>
            </div>
        </motion.div>
    )
}

// ========================================
// CHART
// ========================================

function RevenueChart() {
    const max = Math.max(...chartData)

    return (
        <motion.div
            className="bg-white rounded-2xl p-6 border border-gray-100"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
        >
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h3 className="font-bold text-lg">Revenue Overview</h3>
                    <p className="text-gray-500 text-sm">Monthly revenue for 2025</p>
                </div>
                <div className="flex items-center gap-2">
                    <button className="px-3 py-1.5 bg-blue-100 text-blue-600 rounded-lg text-sm font-medium">
                        Monthly
                    </button>
                    <button className="px-3 py-1.5 text-gray-600 hover:bg-gray-100 rounded-lg text-sm">
                        Weekly
                    </button>
                </div>
            </div>

            <div className="flex items-end justify-between h-48 gap-2">
                {chartData.map((value, index) => (
                    <motion.div
                        key={index}
                        className="flex-1 bg-gradient-to-t from-blue-500 to-purple-500 rounded-t-lg"
                        initial={{ height: 0 }}
                        animate={{ height: `${(value / max) * 100}%` }}
                        transition={{ delay: 0.5 + index * 0.05, duration: 0.5 }}
                    />
                ))}
            </div>
            <div className="flex justify-between mt-4 text-xs text-gray-500">
                <span>Jan</span>
                <span>Mar</span>
                <span>May</span>
                <span>Jul</span>
                <span>Sep</span>
                <span>Nov</span>
            </div>
        </motion.div>
    )
}

// ========================================
// ORDERS TABLE
// ========================================

function OrdersTable() {
    const statusConfig = {
        completed: { icon: <CheckCircle className="w-4 h-4" />, color: 'text-green-600 bg-green-100' },
        pending: { icon: <Clock className="w-4 h-4" />, color: 'text-yellow-600 bg-yellow-100' },
        cancelled: { icon: <XCircle className="w-4 h-4" />, color: 'text-red-600 bg-red-100' },
    }

    return (
        <motion.div
            className="bg-white rounded-2xl border border-gray-100 overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
        >
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
                <div>
                    <h3 className="font-bold text-lg">Recent Orders</h3>
                    <p className="text-gray-500 text-sm">Latest transactions</p>
                </div>
                <div className="flex items-center gap-2">
                    <button className="flex items-center gap-2 px-3 py-1.5 border border-gray-200 rounded-lg text-sm hover:bg-gray-50">
                        <Filter className="w-4 h-4" />
                        Filter
                    </button>
                    <button className="flex items-center gap-2 px-3 py-1.5 border border-gray-200 rounded-lg text-sm hover:bg-gray-50">
                        <Download className="w-4 h-4" />
                        Export
                    </button>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Order ID</th>
                            <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Customer</th>
                            <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Product</th>
                            <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Amount</th>
                            <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Status</th>
                            <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Date</th>
                            <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase"></th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {recentOrders.map((order) => {
                            const status = statusConfig[order.status]
                            return (
                                <tr key={order.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 text-sm font-medium">{order.id}</td>
                                    <td className="px-6 py-4">
                                        <div>
                                            <p className="text-sm font-medium">{order.customer}</p>
                                            <p className="text-xs text-gray-500">{order.email}</p>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-sm">{order.product}</td>
                                    <td className="px-6 py-4 text-sm font-medium">${order.amount}</td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${status.color}`}>
                                            {status.icon}
                                            {order.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-500">{order.date}</td>
                                    <td className="px-6 py-4">
                                        <button className="p-1 hover:bg-gray-100 rounded">
                                            <MoreHorizontal className="w-4 h-4 text-gray-400" />
                                        </button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>

            <div className="p-4 border-t border-gray-100">
                <button className="text-blue-600 text-sm font-medium hover:underline">
                    View all orders →
                </button>
            </div>
        </motion.div>
    )
}

// ========================================
// MAIN PAGE
// ========================================

export default function AdminDashboardPage() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)

    return (
        <div className="min-h-screen bg-gray-50 flex">
            <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

            <div className="flex-1">
                <Header onMenuClick={() => setIsSidebarOpen(true)} />

                <main className="p-6">
                    {/* Page header */}
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h1 className="text-2xl font-bold">Dashboard</h1>
                            <p className="text-gray-500">Welcome back! Here&apos;s what&apos;s happening.</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-xl hover:bg-gray-50">
                                <Calendar className="w-4 h-4" />
                                Last 30 days
                                <ChevronDown className="w-4 h-4" />
                            </button>
                            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700">
                                <Download className="w-4 h-4" />
                                Download Report
                            </button>
                        </div>
                    </div>

                    {/* Stats grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        {stats.map((stat, index) => (
                            <StatCard key={stat.label} stat={stat} index={index} />
                        ))}
                    </div>

                    {/* Chart */}
                    <div className="mb-8">
                        <RevenueChart />
                    </div>

                    {/* Orders table */}
                    <OrdersTable />

                    {/* Footer link */}
                    <div className="text-center mt-8 text-gray-500 text-sm">
                        Demo by{' '}
                        <Link href="/" className="text-blue-600 hover:underline">
                            YourName
                        </Link>
                    </div>
                </main>
            </div>
        </div>
    )
}
