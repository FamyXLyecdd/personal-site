'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion'
import Link from 'next/link'
import {
    Menu,
    X,
    Home,
    User,
    Briefcase,
    Mail,
    Gamepad2,
    BookOpen,
    ChevronDown,
    Sun,
    Moon,
    Command,
} from 'lucide-react'
import { cn } from '@/lib/utils'

// ========================================
// TYPES
// ========================================

interface NavLink {
    name: string
    href: string
    icon: React.ReactNode
    isExternal?: boolean
}

// ========================================
// NAV LINKS
// ========================================

const navLinks: NavLink[] = [
    { name: 'Home', href: '#hero', icon: <Home className="w-4 h-4" /> },
    { name: 'About', href: '#about', icon: <User className="w-4 h-4" /> },
    { name: 'Demos', href: '#demos', icon: <Briefcase className="w-4 h-4" /> },
    { name: 'Projects', href: '#projects', icon: <Briefcase className="w-4 h-4" /> },
    { name: 'Contact', href: '#contact', icon: <Mail className="w-4 h-4" /> },
]

const moreLinks: NavLink[] = [
    { name: 'Blog', href: '/blog', icon: <BookOpen className="w-4 h-4" /> },
    { name: 'Games', href: '/games', icon: <Gamepad2 className="w-4 h-4" /> },
    { name: 'About', href: '/about', icon: <User className="w-4 h-4" /> },
]

// ========================================
// NAVBAR COMPONENT
// ========================================

export function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false)
    const [isMobileOpen, setIsMobileOpen] = useState(false)
    const [isMoreOpen, setIsMoreOpen] = useState(false)
    const { scrollY } = useScroll()

    useMotionValueEvent(scrollY, 'change', (latest) => {
        setIsScrolled(latest > 50)
    })

    // Close mobile menu on resize
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 768) {
                setIsMobileOpen(false)
            }
        }
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    // Close menu on escape
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                setIsMobileOpen(false)
                setIsMoreOpen(false)
            }
        }
        document.addEventListener('keydown', handleEscape)
        return () => document.removeEventListener('keydown', handleEscape)
    }, [])

    const scrollToSection = (href: string) => {
        if (href.startsWith('#')) {
            const element = document.querySelector(href)
            element?.scrollIntoView({ behavior: 'smooth' })
            setIsMobileOpen(false)
        }
    }

    return (
        <>
            <motion.header
                className={cn(
                    'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
                    isScrolled
                        ? 'py-3'
                        : 'py-5'
                )}
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className="container">
                    <motion.nav
                        className={cn(
                            'relative flex items-center justify-between px-6 py-3 rounded-2xl transition-all duration-300',
                            isScrolled
                                ? 'bg-white/80 backdrop-blur-xl shadow-lg border border-black/[0.05]'
                                : 'bg-transparent'
                        )}
                    >
                        {/* Logo */}
                        <Link
                            href="/"
                            className="flex items-center gap-2 font-bold text-xl"
                        >
                            <motion.div
                                className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent-primary to-accent-secondary flex items-center justify-center text-white text-lg font-bold"
                                whileHover={{ scale: 1.05, rotate: 5 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Y
                            </motion.div>
                            <span className="hidden sm:inline">YourName</span>
                        </Link>

                        {/* Desktop Navigation */}
                        <div className="hidden md:flex items-center gap-1">
                            {navLinks.map((link) => (
                                <motion.button
                                    key={link.name}
                                    onClick={() => scrollToSection(link.href)}
                                    className="px-4 py-2 rounded-xl text-sm font-medium text-muted hover:text-foreground hover:bg-black/[0.03] transition-colors"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    {link.name}
                                </motion.button>
                            ))}

                            {/* More dropdown */}
                            <div className="relative">
                                <motion.button
                                    className="flex items-center gap-1 px-4 py-2 rounded-xl text-sm font-medium text-muted hover:text-foreground hover:bg-black/[0.03] transition-colors"
                                    onClick={() => setIsMoreOpen(!isMoreOpen)}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    More
                                    <ChevronDown className={cn(
                                        'w-3 h-3 transition-transform',
                                        isMoreOpen && 'rotate-180'
                                    )} />
                                </motion.button>

                                <AnimatePresence>
                                    {isMoreOpen && (
                                        <motion.div
                                            className="absolute top-full right-0 mt-2 py-2 w-48 bg-white rounded-xl shadow-xl border border-black/[0.05]"
                                            initial={{ opacity: 0, y: -10, scale: 0.95 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            exit={{ opacity: 0, y: -10, scale: 0.95 }}
                                        >
                                            {moreLinks.map((link) => (
                                                <Link
                                                    key={link.name}
                                                    href={link.href}
                                                    className="flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-black/[0.03] transition-colors"
                                                    onClick={() => setIsMoreOpen(false)}
                                                >
                                                    {link.icon}
                                                    {link.name}
                                                </Link>
                                            ))}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-3">
                            {/* Command palette trigger (desktop) */}
                            <motion.button
                                className="hidden md:flex items-center gap-2 px-3 py-2 rounded-xl bg-black/[0.03] text-sm text-muted hover:text-foreground transition-colors"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <Command className="w-3 h-3" />
                                <span>K</span>
                            </motion.button>

                            {/* CTA button */}
                            <motion.button
                                className="hidden sm:block px-5 py-2.5 rounded-xl bg-gradient-to-r from-accent-primary to-accent-secondary text-white font-medium text-sm shadow-lg shadow-accent-primary/20"
                                whileHover={{ scale: 1.02, boxShadow: '0 10px 30px -10px var(--accent-primary)' }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => scrollToSection('#contact')}
                            >
                                Hire Me
                            </motion.button>

                            {/* Mobile menu button */}
                            <motion.button
                                className="md:hidden w-10 h-10 rounded-xl flex items-center justify-center hover:bg-black/[0.03] transition-colors"
                                onClick={() => setIsMobileOpen(!isMobileOpen)}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                {isMobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                            </motion.button>
                        </div>
                    </motion.nav>
                </div>
            </motion.header>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsMobileOpen(false)}
                        />

                        {/* Menu panel */}
                        <motion.div
                            className="fixed top-20 left-4 right-4 z-50 md:hidden"
                            initial={{ opacity: 0, y: -20, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -20, scale: 0.95 }}
                            transition={{ type: 'spring', damping: 25, stiffness: 400 }}
                        >
                            <div className="bg-white rounded-2xl shadow-2xl border border-black/[0.05] p-4">
                                {/* Main links */}
                                <div className="space-y-1 mb-4">
                                    {navLinks.map((link, index) => (
                                        <motion.button
                                            key={link.name}
                                            onClick={() => scrollToSection(link.href)}
                                            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left hover:bg-black/[0.03] transition-colors"
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: index * 0.05 }}
                                        >
                                            <span className="w-8 h-8 rounded-lg bg-accent-primary/10 text-accent-primary flex items-center justify-center">
                                                {link.icon}
                                            </span>
                                            <span className="font-medium">{link.name}</span>
                                        </motion.button>
                                    ))}
                                </div>

                                {/* Divider */}
                                <div className="h-px bg-black/[0.05] my-4" />

                                {/* More links */}
                                <div className="space-y-1 mb-4">
                                    {moreLinks.map((link, index) => (
                                        <motion.div
                                            key={link.name}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.25 + index * 0.05 }}
                                        >
                                            <Link
                                                href={link.href}
                                                className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-black/[0.03] transition-colors"
                                                onClick={() => setIsMobileOpen(false)}
                                            >
                                                <span className="w-8 h-8 rounded-lg bg-black/[0.05] flex items-center justify-center">
                                                    {link.icon}
                                                </span>
                                                <span className="font-medium">{link.name}</span>
                                            </Link>
                                        </motion.div>
                                    ))}
                                </div>

                                {/* CTA */}
                                <motion.button
                                    className="w-full py-4 rounded-xl bg-gradient-to-r from-accent-primary to-accent-secondary text-white font-semibold shadow-lg"
                                    onClick={() => {
                                        scrollToSection('#contact')
                                        setIsMobileOpen(false)
                                    }}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.4 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    Hire Me
                                </motion.button>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    )
}
