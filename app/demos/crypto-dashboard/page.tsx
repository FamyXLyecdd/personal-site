'use client'

import { useState, useMemo, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import {
    TrendingUp,
    TrendingDown,
    DollarSign,
    Bitcoin,
    Wallet,
    ArrowUpRight,
    ArrowDownRight,
    RefreshCw,
    Star,
    Bell,
    Settings,
    Search,
    ChevronDown,
    MoreHorizontal,
    Eye,
    EyeOff,
    Copy,
    Send,
    Download,
    Plus,
    Minus,
    Zap,
    Shield,
    Clock,
    Activity,
    PieChart,
    BarChart3,
    LineChart,
} from 'lucide-react'

// ========================================
// TYPES
// ========================================

interface Cryptocurrency {
    id: string
    name: string
    symbol: string
    price: number
    change24h: number
    change7d: number
    marketCap: string
    volume: string
    icon: string
    color: string
    sparkline: number[]
    holdings?: number
}

interface Transaction {
    id: string
    type: 'buy' | 'sell' | 'receive' | 'send'
    coin: string
    coinIcon: string
    amount: number
    value: number
    date: string
    status: 'completed' | 'pending'
}

// ========================================
// SAMPLE DATA
// ========================================

const cryptocurrencies: Cryptocurrency[] = [
    {
        id: 'bitcoin',
        name: 'Bitcoin',
        symbol: 'BTC',
        price: 42567.89,
        change24h: 2.34,
        change7d: 5.67,
        marketCap: '$834.2B',
        volume: '$28.5B',
        icon: '₿',
        color: '#F7931A',
        sparkline: [38000, 39500, 40200, 41000, 39800, 42000, 42567],
        holdings: 0.5234,
    },
    {
        id: 'ethereum',
        name: 'Ethereum',
        symbol: 'ETH',
        price: 2245.67,
        change24h: -1.23,
        change7d: 3.45,
        marketCap: '$270.1B',
        volume: '$12.3B',
        icon: 'Ξ',
        color: '#627EEA',
        sparkline: [2100, 2150, 2200, 2180, 2220, 2190, 2245],
        holdings: 3.567,
    },
    {
        id: 'solana',
        name: 'Solana',
        symbol: 'SOL',
        price: 98.45,
        change24h: 5.67,
        change7d: 12.34,
        marketCap: '$42.3B',
        volume: '$3.2B',
        icon: '◎',
        color: '#00FFA3',
        sparkline: [80, 85, 88, 92, 90, 95, 98],
        holdings: 25.0,
    },
    {
        id: 'cardano',
        name: 'Cardano',
        symbol: 'ADA',
        price: 0.567,
        change24h: -0.45,
        change7d: 2.12,
        marketCap: '$19.8B',
        volume: '$890M',
        icon: '₳',
        color: '#0033AD',
        sparkline: [0.52, 0.54, 0.55, 0.53, 0.56, 0.55, 0.567],
        holdings: 5000,
    },
    {
        id: 'polkadot',
        name: 'Polkadot',
        symbol: 'DOT',
        price: 7.23,
        change24h: 3.21,
        change7d: -1.45,
        marketCap: '$9.2B',
        volume: '$456M',
        icon: '●',
        color: '#E6007A',
        sparkline: [6.8, 7.0, 7.1, 7.0, 6.9, 7.1, 7.23],
        holdings: 150,
    },
    {
        id: 'ripple',
        name: 'XRP',
        symbol: 'XRP',
        price: 0.612,
        change24h: 1.56,
        change7d: 4.32,
        marketCap: '$33.5B',
        volume: '$1.8B',
        icon: '✕',
        color: '#23292F',
        sparkline: [0.55, 0.57, 0.58, 0.59, 0.60, 0.61, 0.612],
    },
]

const transactions: Transaction[] = [
    { id: 't1', type: 'buy', coin: 'Bitcoin', coinIcon: '₿', amount: 0.0234, value: 996.56, date: '2 hours ago', status: 'completed' },
    { id: 't2', type: 'sell', coin: 'Ethereum', coinIcon: 'Ξ', amount: 1.5, value: 3368.50, date: '5 hours ago', status: 'completed' },
    { id: 't3', type: 'receive', coin: 'Solana', coinIcon: '◎', amount: 10, value: 984.50, date: '1 day ago', status: 'completed' },
    { id: 't4', type: 'send', coin: 'Bitcoin', coinIcon: '₿', amount: 0.1, value: 4256.78, date: '2 days ago', status: 'completed' },
    { id: 't5', type: 'buy', coin: 'Cardano', coinIcon: '₳', amount: 1000, value: 567, date: '3 days ago', status: 'pending' },
]

// ========================================
// SIDEBAR
// ========================================

function Sidebar() {
    const menuItems = [
        { icon: <BarChart3 className="w-5 h-5" />, label: 'Dashboard', active: true },
        { icon: <Wallet className="w-5 h-5" />, label: 'Portfolio' },
        { icon: <Activity className="w-5 h-5" />, label: 'Markets' },
        { icon: <RefreshCw className="w-5 h-5" />, label: 'Exchange' },
        { icon: <Clock className="w-5 h-5" />, label: 'History' },
        { icon: <Star className="w-5 h-5" />, label: 'Watchlist' },
    ]

    return (
        <aside className="w-64 bg-gray-900 text-white flex flex-col h-full">
            {/* Logo */}
            <div className="p-6">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center">
                        <Bitcoin className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-xl font-bold">CryptoHub</span>
                </div>
            </div>

            {/* Nav */}
            <nav className="px-3 flex-1">
                <div className="space-y-1">
                    {menuItems.map((item) => (
                        <button
                            key={item.label}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${item.active
                                    ? 'bg-gradient-to-r from-yellow-500/20 to-orange-500/20 text-yellow-400'
                                    : 'text-gray-400 hover:bg-white/5 hover:text-white'
                                }`}
                        >
                            {item.icon}
                            {item.label}
                        </button>
                    ))}
                </div>
            </nav>

            {/* Card */}
            <div className="p-4">
                <div className="p-4 rounded-2xl bg-gradient-to-br from-yellow-500 to-orange-600 text-white">
                    <Zap className="w-8 h-8 mb-3" />
                    <h4 className="font-bold mb-1">Upgrade to Pro</h4>
                    <p className="text-sm text-white/80 mb-3">Get advanced features and lower fees</p>
                    <button className="w-full py-2 bg-white text-orange-600 rounded-xl font-semibold text-sm">
                        Upgrade Now
                    </button>
                </div>
            </div>
        </aside>
    )
}

// ========================================
// HEADER
// ========================================

function Header() {
    return (
        <header className="h-16 bg-white border-b border-gray-200 px-6 flex items-center justify-between">
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                    type="text"
                    placeholder="Search coins..."
                    className="pl-10 pr-4 py-2 bg-gray-100 rounded-xl text-sm outline-none focus:ring-2 focus:ring-yellow-500 w-64"
                />
            </div>

            <div className="flex items-center gap-4">
                <button className="p-2 hover:bg-gray-100 rounded-xl relative">
                    <Bell className="w-5 h-5 text-gray-600" />
                    <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-xl">
                    <Settings className="w-5 h-5 text-gray-600" />
                </button>
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center text-white font-bold">
                    JD
                </div>
            </div>
        </header>
    )
}

// ========================================
// PORTFOLIO CARD
// ========================================

function PortfolioCard() {
    const [showBalance, setShowBalance] = useState(true)
    const totalBalance = 45678.90
    const change24h = 2.34
    const changeValue = totalBalance * (change24h / 100)

    return (
        <motion.div
            className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-6 text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
        >
            <div className="flex items-center justify-between mb-4">
                <p className="text-gray-400">Total Balance</p>
                <button onClick={() => setShowBalance(!showBalance)} className="text-gray-400 hover:text-white">
                    {showBalance ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
                </button>
            </div>
            <div className="mb-4">
                <span className="text-4xl font-bold">
                    {showBalance ? `$${totalBalance.toLocaleString()}` : '••••••'}
                </span>
                <div className={`flex items-center gap-1 mt-2 ${change24h >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {change24h >= 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                    <span className="font-medium">{change24h >= 0 ? '+' : ''}{change24h}%</span>
                    <span className="text-gray-400">({showBalance ? `$${changeValue.toFixed(2)}` : '••••'})</span>
                </div>
            </div>
            <div className="flex gap-3">
                <button className="flex-1 flex items-center justify-center gap-2 py-3 bg-yellow-500 text-black rounded-xl font-semibold">
                    <Send className="w-4 h-4" />
                    Send
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 py-3 bg-white/10 rounded-xl font-semibold">
                    <Download className="w-4 h-4" />
                    Receive
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 py-3 bg-white/10 rounded-xl font-semibold">
                    <RefreshCw className="w-4 h-4" />
                    Swap
                </button>
            </div>
        </motion.div>
    )
}

// ========================================
// COIN ROW
// ========================================

function CoinRow({ coin, index }: { coin: Cryptocurrency; index: number }) {
    const max = Math.max(...coin.sparkline)
    const min = Math.min(...coin.sparkline)
    const range = max - min

    return (
        <motion.div
            className="flex items-center gap-4 p-4 hover:bg-gray-50 rounded-xl transition-colors cursor-pointer"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
        >
            {/* Coin info */}
            <div className="w-10 h-10 rounded-full flex items-center justify-center text-xl font-bold" style={{ backgroundColor: `${coin.color}20`, color: coin.color }}>
                {coin.icon}
            </div>
            <div className="flex-1 min-w-0">
                <p className="font-semibold">{coin.name}</p>
                <p className="text-sm text-gray-500">{coin.symbol}</p>
            </div>

            {/* Sparkline */}
            <div className="w-24 h-10 hidden md:block">
                <svg viewBox="0 0 100 40" className="w-full h-full">
                    <polyline
                        fill="none"
                        stroke={coin.change24h >= 0 ? '#10B981' : '#EF4444'}
                        strokeWidth="2"
                        points={coin.sparkline.map((val, i) => `${(i / (coin.sparkline.length - 1)) * 100},${40 - ((val - min) / range) * 35}`).join(' ')}
                    />
                </svg>
            </div>

            {/* Price */}
            <div className="w-32 text-right">
                <p className="font-semibold">${coin.price.toLocaleString()}</p>
                <p className={`text-sm ${coin.change24h >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                    {coin.change24h >= 0 ? '+' : ''}{coin.change24h}%
                </p>
            </div>

            {/* Holdings */}
            {coin.holdings !== undefined && (
                <div className="w-32 text-right hidden lg:block">
                    <p className="font-semibold">${(coin.holdings * coin.price).toLocaleString()}</p>
                    <p className="text-sm text-gray-500">{coin.holdings} {coin.symbol}</p>
                </div>
            )}

            {/* Actions */}
            <button className="p-2 hover:bg-gray-100 rounded-lg">
                <Star className="w-4 h-4 text-gray-400" />
            </button>
        </motion.div>
    )
}

// ========================================
// TRANSACTIONS
// ========================================

function TransactionsList() {
    const typeConfig = {
        buy: { icon: <Plus className="w-4 h-4" />, color: 'text-green-500 bg-green-100' },
        sell: { icon: <Minus className="w-4 h-4" />, color: 'text-red-500 bg-red-100' },
        receive: { icon: <Download className="w-4 h-4" />, color: 'text-blue-500 bg-blue-100' },
        send: { icon: <Send className="w-4 h-4" />, color: 'text-purple-500 bg-purple-100' },
    }

    return (
        <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold text-lg">Recent Transactions</h3>
                <button className="text-sm text-yellow-600 font-medium">View All</button>
            </div>
            <div className="space-y-4">
                {transactions.map((tx) => {
                    const config = typeConfig[tx.type]
                    return (
                        <div key={tx.id} className="flex items-center gap-4">
                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${config.color}`}>
                                {config.icon}
                            </div>
                            <div className="flex-1">
                                <p className="font-medium capitalize">{tx.type} {tx.coin}</p>
                                <p className="text-sm text-gray-500">{tx.date}</p>
                            </div>
                            <div className="text-right">
                                <p className="font-semibold">{tx.type === 'sell' || tx.type === 'send' ? '-' : '+'}{tx.amount} {tx.coinIcon}</p>
                                <p className="text-sm text-gray-500">${tx.value.toLocaleString()}</p>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

// ========================================
// MAIN PAGE
// ========================================

export default function CryptoDashboardPage() {
    return (
        <div className="h-screen flex bg-gray-50">
            <Sidebar />

            <div className="flex-1 flex flex-col overflow-hidden">
                <Header />

                <main className="flex-1 overflow-auto p-6">
                    <div className="grid lg:grid-cols-3 gap-6 mb-6">
                        <div className="lg:col-span-2">
                            <PortfolioCard />
                        </div>
                        <div className="bg-white rounded-2xl p-6 shadow-sm">
                            <h3 className="font-bold mb-4">Quick Buy</h3>
                            <select className="w-full p-3 border border-gray-200 rounded-xl mb-4">
                                {cryptocurrencies.slice(0, 4).map((coin) => (
                                    <option key={coin.id}>{coin.name} ({coin.symbol})</option>
                                ))}
                            </select>
                            <input
                                type="number"
                                placeholder="Enter amount (USD)"
                                className="w-full p-3 border border-gray-200 rounded-xl mb-4"
                            />
                            <button className="w-full py-3 bg-yellow-500 text-black rounded-xl font-semibold">
                                Buy Now
                            </button>
                        </div>
                    </div>

                    <div className="grid lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="font-bold text-lg">Your Assets</h3>
                                <button className="text-sm text-yellow-600 font-medium">See All</button>
                            </div>
                            <div className="space-y-2">
                                {cryptocurrencies.filter(c => c.holdings).map((coin, index) => (
                                    <CoinRow key={coin.id} coin={coin} index={index} />
                                ))}
                            </div>
                        </div>
                        <TransactionsList />
                    </div>

                    <div className="text-center mt-8 text-gray-500 text-sm">
                        Demo by{' '}
                        <Link href="/" className="text-yellow-600 hover:underline">
                            YourName
                        </Link>
                    </div>
                </main>
            </div>
        </div>
    )
}
