'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    Heart,
    MessageSquare,
    Send,
    Smile,
    Sparkles,
    ThumbsUp,
    Star,
    Flame,
    Coffee,
    Rocket,
    PartyPopper,
    Music,
    Code,
    Zap,
    User,
} from 'lucide-react'
import { cn, generateId } from '@/lib/utils'
import { Avatar, Badge } from './ui/index'
import { Button } from './ui/button'

// ========================================
// GUESTBOOK TYPES
// ========================================

interface GuestbookEntry {
    id: string
    name: string
    message: string
    emoji: string
    reactions: Record<string, number>
    timestamp: Date
    isNew?: boolean
    avatar?: string
    country?: string
    flag?: string
}

interface Reaction {
    emoji: string
    name: string
    icon: React.ReactNode
}

// Available reactions
const reactions: Reaction[] = [
    { emoji: '❤️', name: 'love', icon: <Heart className="w-3 h-3" /> },
    { emoji: '👍', name: 'like', icon: <ThumbsUp className="w-3 h-3" /> },
    { emoji: '⭐', name: 'star', icon: <Star className="w-3 h-3" /> },
    { emoji: '🔥', name: 'fire', icon: <Flame className="w-3 h-3" /> },
    { emoji: '🚀', name: 'rocket', icon: <Rocket className="w-3 h-3" /> },
    { emoji: '☕', name: 'coffee', icon: <Coffee className="w-3 h-3" /> },
]

// Emoji picker options
const emojiOptions = ['😊', '🚀', '💻', '🎉', '❤️', '⭐', '🔥', '💡', '🎨', '☕', '🌟', '👋']

// Country flags for fake data
const countryData: Record<string, string> = {
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
}

// Sample entries
const sampleEntries: GuestbookEntry[] = [
    {
        id: '1',
        name: 'Alex Chen',
        message: "This portfolio is absolutely stunning! The animations are so smooth. Keep up the amazing work! 🔥",
        emoji: '💻',
        reactions: { love: 15, fire: 8, rocket: 5 },
        timestamp: new Date(Date.now() - 3600000 * 2),
        country: 'United States',
        flag: '🇺🇸',
    },
    {
        id: '2',
        name: 'Maria Santos',
        message: "Fellow Filipino developer here! So proud to see this level of work from our country. Amazing! 🇵🇭",
        emoji: '🌟',
        reactions: { love: 23, star: 12 },
        timestamp: new Date(Date.now() - 3600000 * 5),
        country: 'Philippines',
        flag: '🇵🇭',
    },
    {
        id: '3',
        name: 'Kenji Yamamoto',
        message: "The 3D effects and physics are incredible. What libraries did you use? Very impressive work!",
        emoji: '🚀',
        reactions: { like: 9, fire: 4 },
        timestamp: new Date(Date.now() - 3600000 * 12),
        country: 'Japan',
        flag: '🇯🇵',
    },
    {
        id: '4',
        name: 'Emma Wilson',
        message: "Love the chatbot companion! Such a creative touch. This is next-level portfolio design!",
        emoji: '❤️',
        reactions: { love: 18, rocket: 7, star: 3 },
        timestamp: new Date(Date.now() - 3600000 * 24),
        country: 'United Kingdom',
        flag: '🇬🇧',
    },
    {
        id: '5',
        name: 'Lucas Schmidt',
        message: "The attention to detail is remarkable. Every micro-interaction feels intentional and polished.",
        emoji: '✨',
        reactions: { like: 14, fire: 6 },
        timestamp: new Date(Date.now() - 3600000 * 48),
        country: 'Germany',
        flag: '🇩🇪',
    },
]

// ========================================
// REACTION BUTTON
// ========================================

interface ReactionButtonProps {
    reaction: Reaction
    count: number
    onReact: () => void
    reacted?: boolean
}

function ReactionButton({ reaction, count, onReact, reacted }: ReactionButtonProps) {
    return (
        <motion.button
            className={cn(
                'inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs',
                'bg-white/50 border transition-all',
                reacted
                    ? 'border-accent-primary/30 bg-accent-primary/10 text-accent-primary'
                    : 'border-black/[0.05] hover:border-accent-primary/20 hover:bg-accent-primary/5'
            )}
            onClick={onReact}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
        >
            <span>{reaction.emoji}</span>
            <span className="font-medium">{count}</span>
        </motion.button>
    )
}

// ========================================
// GUESTBOOK ENTRY CARD
// ========================================

interface EntryCardProps {
    entry: GuestbookEntry
    onReact: (entryId: string, reactionName: string) => void
}

function EntryCard({ entry, onReact }: EntryCardProps) {
    const [showReactionPicker, setShowReactionPicker] = useState(false)
    const [reactedTo, setReactedTo] = useState<Set<string>>(new Set())

    const handleReact = (reactionName: string) => {
        onReact(entry.id, reactionName)
        setReactedTo((prev) => new Set([...prev, reactionName]))
        setShowReactionPicker(false)
    }

    const timeAgo = () => {
        const seconds = Math.floor((Date.now() - entry.timestamp.getTime()) / 1000)
        if (seconds < 60) return 'Just now'
        if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`
        if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`
        return `${Math.floor(seconds / 86400)}d ago`
    }

    return (
        <motion.div
            className={cn(
                'p-4 rounded-2xl bg-white/70 backdrop-blur-lg border border-black/[0.08]',
                'hover:shadow-lg transition-shadow',
                entry.isNew && 'ring-2 ring-accent-primary/30'
            )}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.3 }}
            layout
        >
            {/* Header */}
            <div className="flex items-start gap-3 mb-3">
                <Avatar
                    src={entry.avatar}
                    alt={entry.name}
                    fallback={entry.name.slice(0, 2).toUpperCase()}
                    size="md"
                />
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-semibold text-sm">{entry.name}</span>
                        <span className="text-lg">{entry.emoji}</span>
                        {entry.flag && (
                            <span className="text-sm" title={entry.country}>
                                {entry.flag}
                            </span>
                        )}
                        {entry.isNew && (
                            <Badge variant="primary" size="sm">New!</Badge>
                        )}
                    </div>
                    <p className="text-xs text-muted">{timeAgo()}</p>
                </div>
            </div>

            {/* Message */}
            <p className="text-sm leading-relaxed mb-4">{entry.message}</p>

            {/* Reactions */}
            <div className="flex items-center gap-2 flex-wrap">
                {reactions
                    .filter((r) => entry.reactions[r.name])
                    .map((reaction) => (
                        <ReactionButton
                            key={reaction.name}
                            reaction={reaction}
                            count={entry.reactions[reaction.name]}
                            onReact={() => handleReact(reaction.name)}
                            reacted={reactedTo.has(reaction.name)}
                        />
                    ))}

                {/* Add reaction button */}
                <div className="relative">
                    <motion.button
                        className="w-7 h-7 rounded-full bg-white/50 border border-black/[0.05] flex items-center justify-center text-muted hover:text-accent-primary hover:border-accent-primary/20 transition-colors"
                        onClick={() => setShowReactionPicker(!showReactionPicker)}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        <Smile className="w-3.5 h-3.5" />
                    </motion.button>

                    {/* Reaction picker */}
                    <AnimatePresence>
                        {showReactionPicker && (
                            <motion.div
                                className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-white rounded-xl shadow-lg border border-black/[0.08] p-2 flex gap-1"
                                initial={{ opacity: 0, y: 10, scale: 0.9 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 10, scale: 0.9 }}
                            >
                                {reactions.map((reaction) => (
                                    <motion.button
                                        key={reaction.name}
                                        className="w-8 h-8 rounded-lg hover:bg-accent-primary/10 flex items-center justify-center text-lg"
                                        onClick={() => handleReact(reaction.name)}
                                        whileHover={{ scale: 1.2 }}
                                        whileTap={{ scale: 0.9 }}
                                    >
                                        {reaction.emoji}
                                    </motion.button>
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </motion.div>
    )
}

// ========================================
// NEW ENTRY FORM
// ========================================

interface NewEntryFormProps {
    onSubmit: (entry: Omit<GuestbookEntry, 'id' | 'reactions' | 'timestamp'>) => void
}

function NewEntryForm({ onSubmit }: NewEntryFormProps) {
    const [name, setName] = useState('')
    const [message, setMessage] = useState('')
    const [selectedEmoji, setSelectedEmoji] = useState('😊')
    const [showEmojiPicker, setShowEmojiPicker] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!name.trim() || !message.trim()) return

        setIsSubmitting(true)

        // Simulate submission delay
        await new Promise((resolve) => setTimeout(resolve, 800))

        onSubmit({
            name: name.trim(),
            message: message.trim(),
            emoji: selectedEmoji,
        })

        setName('')
        setMessage('')
        setSelectedEmoji('😊')
        setIsSubmitting(false)
    }

    return (
        <motion.form
            onSubmit={handleSubmit}
            className="p-4 rounded-2xl bg-gradient-to-br from-accent-primary/5 to-accent-secondary/5 border border-accent-primary/20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
        >
            <h3 className="font-semibold mb-4 flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-accent-primary" />
                Leave a message!
            </h3>

            <div className="space-y-3">
                {/* Name input */}
                <div className="flex gap-3">
                    <div className="relative flex-shrink-0">
                        <button
                            type="button"
                            className="w-12 h-12 rounded-xl bg-white border border-black/[0.08] flex items-center justify-center text-2xl hover:border-accent-primary/30 transition-colors"
                            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                        >
                            {selectedEmoji}
                        </button>

                        {/* Emoji picker */}
                        <AnimatePresence>
                            {showEmojiPicker && (
                                <motion.div
                                    className="absolute top-full mt-2 left-0 bg-white rounded-xl shadow-lg border border-black/[0.08] p-2 grid grid-cols-4 gap-1 z-10"
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                >
                                    {emojiOptions.map((emoji) => (
                                        <motion.button
                                            key={emoji}
                                            type="button"
                                            className={cn(
                                                'w-9 h-9 rounded-lg flex items-center justify-center text-xl',
                                                selectedEmoji === emoji ? 'bg-accent-primary/20' : 'hover:bg-accent-primary/10'
                                            )}
                                            onClick={() => {
                                                setSelectedEmoji(emoji)
                                                setShowEmojiPicker(false)
                                            }}
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.9 }}
                                        >
                                            {emoji}
                                        </motion.button>
                                    ))}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    <input
                        type="text"
                        placeholder="Your name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="flex-1 h-12 px-4 rounded-xl bg-white border border-black/[0.08] outline-none focus:border-accent-primary/30 focus:ring-2 focus:ring-accent-primary/10 transition-all"
                        maxLength={50}
                        required
                    />
                </div>

                {/* Message input */}
                <textarea
                    placeholder="Write something nice..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full h-24 px-4 py-3 rounded-xl bg-white border border-black/[0.08] outline-none focus:border-accent-primary/30 focus:ring-2 focus:ring-accent-primary/10 transition-all resize-none"
                    maxLength={280}
                    required
                />

                {/* Character count */}
                <div className="flex items-center justify-between">
                    <span className="text-xs text-muted">
                        {message.length}/280 characters
                    </span>
                    <Button
                        type="submit"
                        variant="primary"
                        size="sm"
                        loading={isSubmitting}
                        disabled={!name.trim() || !message.trim()}
                        icon={<Send className="w-4 h-4" />}
                    >
                        Post
                    </Button>
                </div>
            </div>
        </motion.form>
    )
}

// ========================================
// MAIN GUESTBOOK COMPONENT
// ========================================

interface GuestbookProps {
    className?: string
}

export function Guestbook({ className }: GuestbookProps) {
    const [entries, setEntries] = useState<GuestbookEntry[]>(sampleEntries)
    const [showConfetti, setShowConfetti] = useState(false)

    const handleNewEntry = (entryData: Omit<GuestbookEntry, 'id' | 'reactions' | 'timestamp'>) => {
        const countries = Object.keys(countryData)
        const randomCountry = countries[Math.floor(Math.random() * countries.length)]

        const newEntry: GuestbookEntry = {
            ...entryData,
            id: generateId(),
            reactions: {},
            timestamp: new Date(),
            isNew: true,
            country: randomCountry,
            flag: countryData[randomCountry],
        }

        setEntries((prev) => [newEntry, ...prev])
        setShowConfetti(true)
        setTimeout(() => setShowConfetti(false), 3000)
    }

    const handleReact = (entryId: string, reactionName: string) => {
        setEntries((prev) =>
            prev.map((entry) =>
                entry.id === entryId
                    ? {
                        ...entry,
                        reactions: {
                            ...entry.reactions,
                            [reactionName]: (entry.reactions[reactionName] || 0) + 1,
                        },
                    }
                    : entry
            )
        )
    }

    return (
        <div className={cn('space-y-6', className)}>
            {/* Confetti effect */}
            <AnimatePresence>
                {showConfetti && (
                    <div className="fixed inset-0 pointer-events-none z-50">
                        {Array.from({ length: 50 }).map((_, i) => (
                            <motion.div
                                key={i}
                                className="absolute w-3 h-3 rounded-sm"
                                style={{
                                    background: ['#0066FF', '#00D4AA', '#FF6B6B', '#FFD93D', '#9B59B6'][i % 5],
                                    left: `${Math.random() * 100}%`,
                                    top: '-20px',
                                }}
                                initial={{ y: 0, opacity: 1 }}
                                animate={{
                                    y: window.innerHeight + 100,
                                    rotate: Math.random() * 720,
                                    opacity: 0,
                                }}
                                transition={{
                                    duration: 2 + Math.random() * 2,
                                    delay: Math.random() * 0.5,
                                }}
                            />
                        ))}
                    </div>
                )}
            </AnimatePresence>

            {/* Stats */}
            <div className="flex items-center gap-4 text-sm text-muted">
                <span className="flex items-center gap-1.5">
                    <MessageSquare className="w-4 h-4" />
                    {entries.length} messages
                </span>
                <span className="flex items-center gap-1.5">
                    <Heart className="w-4 h-4 text-red-500" />
                    {entries.reduce((sum, entry) => sum + (entry.reactions.love || 0), 0)} reactions
                </span>
            </div>

            {/* New entry form */}
            <NewEntryForm onSubmit={handleNewEntry} />

            {/* Entries list */}
            <div className="space-y-4">
                <AnimatePresence mode="popLayout">
                    {entries.map((entry) => (
                        <EntryCard
                            key={entry.id}
                            entry={entry}
                            onReact={handleReact}
                        />
                    ))}
                </AnimatePresence>
            </div>
        </div>
    )
}
