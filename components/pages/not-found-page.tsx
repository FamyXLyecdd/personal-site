'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Home, Search, ArrowLeft, Gamepad2, RefreshCw } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { SnakeGame } from '@/components/games/snake-game'

// ========================================
// 404 ERROR PAGE
// ========================================

const funMessages = [
    { emoji: '🔍', title: 'Lost in the void', subtitle: 'This page doesn\'t exist... or does it? 🤔' },
    { emoji: '🕳️', title: 'Down the rabbit hole', subtitle: 'You\'ve wandered into uncharted territory!' },
    { emoji: '👻', title: 'Boo!', subtitle: 'This page is as real as a ghost!' },
    { emoji: '🚀', title: 'Houston, we have a problem', subtitle: 'The page you\'re looking for is in another galaxy.' },
    { emoji: '🎯', title: 'Almost!', subtitle: 'So close, yet so far from that perfect URL.' },
    { emoji: '🗺️', title: 'Wrong turn', subtitle: 'Even the best explorers get lost sometimes.' },
]

export function NotFoundPage() {
    const [message, setMessage] = useState(funMessages[0])
    const [showGame, setShowGame] = useState(false)
    const [searchQuery, setSearchQuery] = useState('')

    useEffect(() => {
        setMessage(funMessages[Math.floor(Math.random() * funMessages.length)])
    }, [])

    const shuffleMessage = () => {
        const current = funMessages.indexOf(message)
        const others = funMessages.filter((_, i) => i !== current)
        setMessage(others[Math.floor(Math.random() * others.length)])
    }

    return (
        <div className="min-h-screen flex items-center justify-center p-6">
            <div className="max-w-xl w-full text-center">
                {/* Animated 404 */}
                <motion.div
                    className="text-[150px] sm:text-[200px] font-black leading-none gradient-text mb-4"
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                >
                    404
                </motion.div>

                {/* Fun message */}
                <motion.div
                    key={message.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="mb-8"
                >
                    <div className="text-6xl mb-4">{message.emoji}</div>
                    <h1 className="text-2xl sm:text-3xl font-bold mb-2">{message.title}</h1>
                    <p className="text-muted">{message.subtitle}</p>
                </motion.div>

                {/* Shuffle button */}
                <motion.button
                    onClick={shuffleMessage}
                    className="inline-flex items-center gap-2 text-sm text-muted hover:text-accent-primary transition-colors mb-8"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <RefreshCw className="w-4 h-4" />
                    Shuffle message
                </motion.button>

                {/* Search bar */}
                <motion.div
                    className="mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <div className="relative max-w-md mx-auto">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
                        <input
                            type="text"
                            placeholder="Search for something..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full h-12 pl-12 pr-4 rounded-xl bg-white/70 border border-black/[0.08] outline-none focus:border-accent-primary/30 focus:ring-2 focus:ring-accent-primary/10 transition-all"
                        />
                    </div>
                </motion.div>

                {/* Action buttons */}
                <motion.div
                    className="flex flex-wrap justify-center gap-3 mb-12"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                >
                    <Link href="/">
                        <Button variant="primary" icon={<Home className="w-4 h-4" />}>
                            Go Home
                        </Button>
                    </Link>
                    <Button
                        variant="secondary"
                        icon={<ArrowLeft className="w-4 h-4" />}
                        onClick={() => window.history.back()}
                    >
                        Go Back
                    </Button>
                    <Button
                        variant="ghost"
                        icon={<Gamepad2 className="w-4 h-4" />}
                        onClick={() => setShowGame(!showGame)}
                    >
                        {showGame ? 'Hide Game' : 'Play Snake!'}
                    </Button>
                </motion.div>

                {/* Snake game */}
                {showGame && (
                    <motion.div
                        className="flex justify-center"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                    >
                        <SnakeGame />
                    </motion.div>
                )}

                {/* Fun easter egg */}
                <motion.p
                    className="text-xs text-muted/50 mt-8"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                >
                    Pro tip: Try clicking the 404 numbers... nothing happens, but it&apos;s fun to try! 😄
                </motion.p>
            </div>
        </div>
    )
}
