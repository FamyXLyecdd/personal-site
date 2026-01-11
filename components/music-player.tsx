'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Play, Pause, Volume2, VolumeX, Music } from 'lucide-react'
import { cn } from '@/lib/utils'

// ========================================
// FLOATING MUSIC PLAYER
// ========================================

interface Track {
    title: string
    artist: string
    url?: string
    duration: number
}

const defaultTrack: Track = {
    title: 'Lofi Beats',
    artist: 'Coding Vibes',
    duration: 180,
}

interface MusicPlayerProps {
    track?: Track
    className?: string
}

export function MusicPlayer({ track = defaultTrack, className }: MusicPlayerProps) {
    const [isPlaying, setIsPlaying] = useState(false)
    const [isMuted, setIsMuted] = useState(false)
    const [progress, setProgress] = useState(0)
    const [isExpanded, setIsExpanded] = useState(false)
    const intervalRef = useRef<NodeJS.Timeout | null>(null)

    // Simulate progress (replace with actual audio implementation)
    useEffect(() => {
        if (isPlaying) {
            intervalRef.current = setInterval(() => {
                setProgress((prev) => {
                    if (prev >= 100) {
                        setIsPlaying(false)
                        return 0
                    }
                    return prev + 100 / track.duration
                })
            }, 1000)
        } else {
            if (intervalRef.current) {
                clearInterval(intervalRef.current)
            }
        }

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current)
            }
        }
    }, [isPlaying, track.duration])

    return (
        <motion.div
            className={cn(
                'fixed bottom-20 right-6 z-50',
                className
            )}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2 }}
        >
            <motion.div
                className={cn(
                    'bg-white/80 backdrop-blur-xl border border-black/[0.08] rounded-2xl shadow-lg overflow-hidden',
                    isExpanded ? 'w-64' : 'w-12 h-12'
                )}
                layout
                transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            >
                {/* Collapsed state */}
                {!isExpanded ? (
                    <motion.button
                        onClick={() => setIsExpanded(true)}
                        className="w-12 h-12 flex items-center justify-center text-accent-primary hover:bg-black/5 transition-colors"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        aria-label="Open music player"
                    >
                        <motion.div
                            animate={isPlaying ? { rotate: 360 } : { rotate: 0 }}
                            transition={isPlaying ? { duration: 3, repeat: Infinity, ease: 'linear' } : {}}
                        >
                            <Music className="w-5 h-5" />
                        </motion.div>
                    </motion.button>
                ) : (
                    <div className="p-4">
                        {/* Header */}
                        <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-2 min-w-0">
                                <motion.div
                                    className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent-primary to-accent-secondary flex items-center justify-center flex-shrink-0"
                                    animate={isPlaying ? { scale: [1, 1.05, 1] } : {}}
                                    transition={{ duration: 1, repeat: Infinity }}
                                >
                                    <Music className="w-4 h-4 text-white" />
                                </motion.div>
                                <div className="min-w-0">
                                    <p className="text-sm font-medium truncate">{track.title}</p>
                                    <p className="text-xs text-muted truncate">{track.artist}</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsExpanded(false)}
                                className="text-muted hover:text-foreground transition-colors"
                                aria-label="Minimize player"
                            >
                                ✕
                            </button>
                        </div>

                        {/* Progress bar */}
                        <div className="h-1 bg-black/[0.05] rounded-full overflow-hidden mb-3">
                            <motion.div
                                className="h-full bg-gradient-to-r from-accent-primary to-accent-secondary"
                                style={{ width: `${progress}%` }}
                            />
                        </div>

                        {/* Visualizer */}
                        <div className="flex items-end justify-center gap-0.5 h-6 mb-3">
                            {[...Array(16)].map((_, i) => (
                                <motion.div
                                    key={i}
                                    className="w-1 bg-accent-primary/50 rounded-full"
                                    animate={isPlaying ? {
                                        height: [4, 8 + Math.random() * 16, 4],
                                    } : { height: 4 }}
                                    transition={{
                                        duration: 0.4,
                                        repeat: Infinity,
                                        repeatType: 'reverse',
                                        delay: i * 0.05,
                                    }}
                                />
                            ))}
                        </div>

                        {/* Controls */}
                        <div className="flex items-center justify-center gap-4">
                            <button
                                onClick={() => setIsMuted(!isMuted)}
                                className="p-2 rounded-full hover:bg-black/5 transition-colors"
                                aria-label={isMuted ? 'Unmute' : 'Mute'}
                            >
                                {isMuted ? (
                                    <VolumeX className="w-4 h-4 text-muted" />
                                ) : (
                                    <Volume2 className="w-4 h-4 text-muted" />
                                )}
                            </button>

                            <motion.button
                                onClick={() => setIsPlaying(!isPlaying)}
                                className="w-10 h-10 rounded-full bg-gradient-to-r from-accent-primary to-accent-secondary flex items-center justify-center text-white shadow-lg"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                aria-label={isPlaying ? 'Pause' : 'Play'}
                            >
                                {isPlaying ? (
                                    <Pause className="w-4 h-4" />
                                ) : (
                                    <Play className="w-4 h-4 ml-0.5" />
                                )}
                            </motion.button>

                            <button
                                onClick={() => setProgress(0)}
                                className="p-2 rounded-full hover:bg-black/5 transition-colors text-xs text-muted font-medium"
                                aria-label="Restart"
                            >
                                ↺
                            </button>
                        </div>

                        <p className="text-[10px] text-center text-muted mt-2">
                            Fake player • Add your audio!
                        </p>
                    </div>
                )}
            </motion.div>
        </motion.div>
    )
}
