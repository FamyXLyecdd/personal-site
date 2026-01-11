'use client'

import { useState, useEffect, createContext, useContext, ReactNode, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    Trophy,
    Star,
    Zap,
    Target,
    Clock,
    MousePointer,
    Scroll,
    MessageSquare,
    Eye,
    Code,
    Coffee,
    Gamepad2,
    Gift,
    Lock,
} from 'lucide-react'
import { cn } from '@/lib/utils'

// ========================================
// ACHIEVEMENT TYPES
// ========================================

export interface Achievement {
    id: string
    name: string
    description: string
    icon: React.ReactNode
    emoji: string
    rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary'
    unlockedAt?: Date
    progress?: number
    maxProgress?: number
    secret?: boolean
}

interface AchievementContextType {
    achievements: Achievement[]
    unlockedAchievements: string[]
    unlockAchievement: (id: string) => void
    updateProgress: (id: string, progress: number) => void
    getAchievement: (id: string) => Achievement | undefined
    totalPoints: number
}

// ========================================
// RARITY COLORS
// ========================================

const rarityColors: Record<Achievement['rarity'], string> = {
    common: '#9CA3AF',
    uncommon: '#10B981',
    rare: '#3B82F6',
    epic: '#8B5CF6',
    legendary: '#F59E0B',
}

const rarityGradients: Record<Achievement['rarity'], string> = {
    common: 'from-gray-400 to-gray-500',
    uncommon: 'from-green-400 to-green-600',
    rare: 'from-blue-400 to-blue-600',
    epic: 'from-purple-400 to-purple-600',
    legendary: 'from-yellow-400 to-orange-500',
}

const rarityPoints: Record<Achievement['rarity'], number> = {
    common: 10,
    uncommon: 25,
    rare: 50,
    epic: 100,
    legendary: 250,
}

// ========================================
// DEFAULT ACHIEVEMENTS
// ========================================

const defaultAchievements: Achievement[] = [
    {
        id: 'first_visit',
        name: 'First Steps',
        description: 'Welcome! You visited the portfolio for the first time.',
        icon: <Eye className="w-5 h-5" />,
        emoji: '👋',
        rarity: 'common',
    },
    {
        id: 'explorer',
        name: 'Explorer',
        description: 'Scrolled through the entire page.',
        icon: <Scroll className="w-5 h-5" />,
        emoji: '🧭',
        rarity: 'common',
    },
    {
        id: 'curious',
        name: 'Curious Mind',
        description: 'Clicked on 10 interactive elements.',
        icon: <MousePointer className="w-5 h-5" />,
        emoji: '🔍',
        rarity: 'uncommon',
        maxProgress: 10,
    },
    {
        id: 'time_traveler',
        name: 'Time Traveler',
        description: 'Spent 5 minutes exploring the site.',
        icon: <Clock className="w-5 h-5" />,
        emoji: '⏰',
        rarity: 'uncommon',
        maxProgress: 300, // 5 minutes in seconds
    },
    {
        id: 'contact_hero',
        name: 'Contact Hero',
        description: 'Submitted a message through the contact form.',
        icon: <MessageSquare className="w-5 h-5" />,
        emoji: '📬',
        rarity: 'rare',
    },
    {
        id: 'project_viewer',
        name: 'Project Enthusiast',
        description: 'Viewed all project details.',
        icon: <Code className="w-5 h-5" />,
        emoji: '💻',
        rarity: 'rare',
        maxProgress: 4, // number of projects
    },
    {
        id: 'gamer',
        name: 'Gamer',
        description: 'Played one of the hidden games.',
        icon: <Gamepad2 className="w-5 h-5" />,
        emoji: '🎮',
        rarity: 'uncommon',
    },
    {
        id: 'snake_master',
        name: 'Snake Master',
        description: 'Scored 100+ points in Snake.',
        icon: <Trophy className="w-5 h-5" />,
        emoji: '🐍',
        rarity: 'epic',
    },
    {
        id: 'speed_demon',
        name: 'Speed Demon',
        description: 'Achieved 80+ WPM in the typing test.',
        icon: <Zap className="w-5 h-5" />,
        emoji: '⚡',
        rarity: 'epic',
    },
    {
        id: 'memory_genius',
        name: 'Memory Genius',
        description: 'Completed the memory game in under 1 minute.',
        icon: <Star className="w-5 h-5" />,
        emoji: '🧠',
        rarity: 'epic',
    },
    {
        id: 'konami_master',
        name: 'Konami Master',
        description: 'Discovered the Konami code easter egg.',
        icon: <Gift className="w-5 h-5" />,
        emoji: '🎁',
        rarity: 'legendary',
        secret: true,
    },
    {
        id: 'caffeine_addict',
        name: 'Night Owl',
        description: 'Visited the site between midnight and 4 AM.',
        icon: <Coffee className="w-5 h-5" />,
        emoji: '🦉',
        rarity: 'rare',
        secret: true,
    },
    {
        id: 'completionist',
        name: 'Completionist',
        description: 'Unlocked all other achievements.',
        icon: <Trophy className="w-5 h-5" />,
        emoji: '👑',
        rarity: 'legendary',
    },
]

// ========================================
// CONTEXT
// ========================================

const AchievementContext = createContext<AchievementContextType | null>(null)

// ========================================
// PROVIDER
// ========================================

interface AchievementProviderProps {
    children: ReactNode
}

export function AchievementProvider({ children }: AchievementProviderProps) {
    const [achievements, setAchievements] = useState<Achievement[]>(defaultAchievements)
    const [unlockedAchievements, setUnlockedAchievements] = useState<string[]>([])
    const [showNotification, setShowNotification] = useState<Achievement | null>(null)

    // Load saved achievements
    useEffect(() => {
        const saved = localStorage.getItem('achievements')
        if (saved) {
            try {
                const parsed = JSON.parse(saved)
                setUnlockedAchievements(parsed.unlocked || [])
                // Merge progress
                setAchievements((prev) =>
                    prev.map((a) => ({
                        ...a,
                        progress: parsed.progress?.[a.id] || 0,
                        unlockedAt: parsed.unlocked?.includes(a.id)
                            ? new Date(parsed.unlockedDates?.[a.id])
                            : undefined,
                    }))
                )
            } catch { }
        }

        // First visit achievement
        if (!localStorage.getItem('hasVisited')) {
            localStorage.setItem('hasVisited', 'true')
            setTimeout(() => unlockAchievement('first_visit'), 2000)
        }

        // Night owl check
        const hour = new Date().getHours()
        if (hour >= 0 && hour < 4) {
            setTimeout(() => unlockAchievement('caffeine_addict'), 5000)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    // Save achievements
    useEffect(() => {
        const progress: Record<string, number> = {}
        const unlockedDates: Record<string, string> = {}

        achievements.forEach((a) => {
            if (a.progress) progress[a.id] = a.progress
            if (a.unlockedAt) unlockedDates[a.id] = a.unlockedAt.toISOString()
        })

        localStorage.setItem('achievements', JSON.stringify({
            unlocked: unlockedAchievements,
            progress,
            unlockedDates,
        }))
    }, [achievements, unlockedAchievements])

    const unlockAchievement = useCallback((id: string) => {
        if (unlockedAchievements.includes(id)) return

        setUnlockedAchievements((prev) => [...prev, id])
        setAchievements((prev) =>
            prev.map((a) =>
                a.id === id ? { ...a, unlockedAt: new Date() } : a
            )
        )

        // Show notification
        const achievement = achievements.find((a) => a.id === id)
        if (achievement) {
            setShowNotification(achievement)
            setTimeout(() => setShowNotification(null), 4000)
        }

        // Check for completionist
        const otherAchievements = achievements.filter((a) => a.id !== 'completionist')
        const allUnlocked = otherAchievements.every(
            (a) => unlockedAchievements.includes(a.id) || a.id === id
        )
        if (allUnlocked && unlockedAchievements.length === otherAchievements.length - 1) {
            setTimeout(() => unlockAchievement('completionist'), 1000)
        }
    }, [achievements, unlockedAchievements])

    const updateProgress = useCallback((id: string, progress: number) => {
        setAchievements((prev) =>
            prev.map((achievement) => {
                if (achievement.id !== id) return achievement

                const newProgress = Math.min(progress, achievement.maxProgress || progress)
                const shouldUnlock = achievement.maxProgress && newProgress >= achievement.maxProgress

                if (shouldUnlock && !unlockedAchievements.includes(id)) {
                    unlockAchievement(id)
                }

                return { ...achievement, progress: newProgress }
            })
        )
    }, [unlockedAchievements, unlockAchievement])

    const getAchievement = useCallback((id: string) => {
        return achievements.find((a) => a.id === id)
    }, [achievements])

    const totalPoints = unlockedAchievements.reduce((sum, id) => {
        const achievement = achievements.find((a) => a.id === id)
        return sum + (achievement ? rarityPoints[achievement.rarity] : 0)
    }, 0)

    return (
        <AchievementContext.Provider
            value={{
                achievements,
                unlockedAchievements,
                unlockAchievement,
                updateProgress,
                getAchievement,
                totalPoints,
            }}
        >
            {children}

            {/* Achievement notification */}
            <AnimatePresence>
                {showNotification && (
                    <AchievementNotification achievement={showNotification} />
                )}
            </AnimatePresence>
        </AchievementContext.Provider>
    )
}

// ========================================
// HOOK
// ========================================

export function useAchievements() {
    const context = useContext(AchievementContext)
    if (!context) {
        throw new Error('useAchievements must be used within AchievementProvider')
    }
    return context
}

// ========================================
// NOTIFICATION
// ========================================

interface AchievementNotificationProps {
    achievement: Achievement
}

function AchievementNotification({ achievement }: AchievementNotificationProps) {
    return (
        <motion.div
            className="fixed top-24 right-6 z-50"
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 100, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
        >
            <div className={cn(
                'flex items-center gap-4 p-4 rounded-2xl shadow-2xl border',
                'bg-gradient-to-r',
                rarityGradients[achievement.rarity],
                'text-white'
            )}>
                <motion.div
                    className="w-14 h-14 rounded-xl bg-white/20 backdrop-blur flex items-center justify-center text-3xl"
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.2, type: 'spring' }}
                >
                    {achievement.emoji}
                </motion.div>
                <div>
                    <p className="text-xs font-medium opacity-80">Achievement Unlocked!</p>
                    <h4 className="font-bold text-lg">{achievement.name}</h4>
                    <p className="text-sm opacity-90">{achievement.description}</p>
                </div>
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.4, type: 'spring' }}
                >
                    <Trophy className="w-6 h-6" />
                </motion.div>
            </div>
        </motion.div>
    )
}

// ========================================
// ACHIEVEMENTS DISPLAY
// ========================================

interface AchievementsDisplayProps {
    className?: string
}

export function AchievementsDisplay({ className }: AchievementsDisplayProps) {
    const { achievements, unlockedAchievements, totalPoints } = useAchievements()

    return (
        <div className={cn('space-y-6', className)}>
            {/* Stats */}
            <div className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-accent-primary/10 to-accent-secondary/10 border border-accent-primary/20">
                <div>
                    <p className="text-sm text-muted">Achievements</p>
                    <p className="text-2xl font-bold">
                        {unlockedAchievements.length} / {achievements.length}
                    </p>
                </div>
                <div className="text-right">
                    <p className="text-sm text-muted">Total Points</p>
                    <p className="text-2xl font-bold gradient-text">{totalPoints}</p>
                </div>
            </div>

            {/* List */}
            <div className="grid gap-3">
                {achievements.map((achievement) => {
                    const isUnlocked = unlockedAchievements.includes(achievement.id)
                    const isSecret = achievement.secret && !isUnlocked

                    return (
                        <motion.div
                            key={achievement.id}
                            className={cn(
                                'flex items-center gap-4 p-4 rounded-xl border transition-all',
                                isUnlocked
                                    ? 'bg-white/70 border-black/[0.08]'
                                    : 'bg-black/[0.02] border-transparent opacity-60'
                            )}
                            whileHover={{ scale: 1.01 }}
                        >
                            <div
                                className={cn(
                                    'w-12 h-12 rounded-xl flex items-center justify-center text-2xl',
                                    isUnlocked
                                        ? `bg-gradient-to-br ${rarityGradients[achievement.rarity]} text-white`
                                        : 'bg-gray-200'
                                )}
                            >
                                {isSecret ? <Lock className="w-5 h-5 text-gray-400" /> : achievement.emoji}
                            </div>
                            <div className="flex-1">
                                <div className="flex items-center gap-2">
                                    <h4 className={cn('font-semibold', !isUnlocked && 'text-muted')}>
                                        {isSecret ? '???' : achievement.name}
                                    </h4>
                                    <span
                                        className="text-xs px-2 py-0.5 rounded-full font-medium"
                                        style={{
                                            backgroundColor: `${rarityColors[achievement.rarity]}20`,
                                            color: rarityColors[achievement.rarity],
                                        }}
                                    >
                                        {achievement.rarity}
                                    </span>
                                </div>
                                <p className="text-sm text-muted">
                                    {isSecret ? 'Complete special actions to unlock this secret achievement.' : achievement.description}
                                </p>
                                {achievement.maxProgress && !isUnlocked && (
                                    <div className="mt-2">
                                        <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-accent-primary rounded-full"
                                                style={{ width: `${((achievement.progress || 0) / achievement.maxProgress) * 100}%` }}
                                            />
                                        </div>
                                        <p className="text-xs text-muted mt-1">
                                            {achievement.progress || 0} / {achievement.maxProgress}
                                        </p>
                                    </div>
                                )}
                            </div>
                            <div className="text-right">
                                <span className="text-sm font-bold" style={{ color: rarityColors[achievement.rarity] }}>
                                    +{rarityPoints[achievement.rarity]}
                                </span>
                            </div>
                        </motion.div>
                    )
                })}
            </div>
        </div>
    )
}
