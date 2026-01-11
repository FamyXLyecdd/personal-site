'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { RotateCcw, Trophy, Timer, Brain, Star, Zap } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

// ========================================
// MEMORY GAME CONFIGURATION
// ========================================

// Card content - emojis for tech/programming theme
const cardEmojis = [
    '💻', '🐍', '⚛️', '🚀',
    '🎮', '🤖', '💡', '⚡',
    '🔥', '🌟', '💎', '🎨',
]

interface Card {
    id: number
    emoji: string
    isFlipped: boolean
    isMatched: boolean
}

interface GameStats {
    moves: number
    time: number
    matches: number
    stars: number
}

// ========================================
// CARD COMPONENT
// ========================================

interface MemoryCardProps {
    card: Card
    onClick: () => void
    disabled: boolean
}

function MemoryCard({ card, onClick, disabled }: MemoryCardProps) {
    return (
        <motion.button
            className={cn(
                'aspect-square rounded-xl cursor-pointer perspective-1000',
                'transition-transform duration-300',
                disabled && 'cursor-not-allowed'
            )}
            onClick={onClick}
            disabled={disabled}
            whileHover={!card.isFlipped && !disabled ? { scale: 1.05 } : undefined}
            whileTap={!card.isFlipped && !disabled ? { scale: 0.95 } : undefined}
        >
            <motion.div
                className="relative w-full h-full preserve-3d"
                animate={{ rotateY: card.isFlipped || card.isMatched ? 180 : 0 }}
                transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                style={{ transformStyle: 'preserve-3d' }}
            >
                {/* Card back */}
                <div
                    className={cn(
                        'absolute inset-0 rounded-xl backface-hidden',
                        'bg-gradient-to-br from-accent-primary to-accent-secondary',
                        'flex items-center justify-center',
                        'border-2 border-white/20 shadow-lg'
                    )}
                    style={{ backfaceVisibility: 'hidden' }}
                >
                    <span className="text-3xl text-white/30">?</span>
                </div>

                {/* Card front */}
                <div
                    className={cn(
                        'absolute inset-0 rounded-xl backface-hidden',
                        'bg-white border-2 shadow-lg',
                        'flex items-center justify-center',
                        card.isMatched
                            ? 'border-green-400 bg-green-50'
                            : 'border-black/10'
                    )}
                    style={{
                        backfaceVisibility: 'hidden',
                        transform: 'rotateY(180deg)',
                    }}
                >
                    <motion.span
                        className="text-3xl sm:text-4xl"
                        animate={card.isMatched ? { scale: [1, 1.2, 1] } : {}}
                        transition={{ duration: 0.3 }}
                    >
                        {card.emoji}
                    </motion.span>
                </div>
            </motion.div>
        </motion.button>
    )
}

// ========================================
// MEMORY GAME COMPONENT
// ========================================

interface MemoryGameProps {
    className?: string
    onClose?: () => void
    gridSize?: 4 | 6
}

export function MemoryGame({ className, onClose, gridSize = 4 }: MemoryGameProps) {
    const [cards, setCards] = useState<Card[]>([])
    const [flippedCards, setFlippedCards] = useState<number[]>([])
    const [moves, setMoves] = useState(0)
    const [matches, setMatches] = useState(0)
    const [isGameOver, setIsGameOver] = useState(false)
    const [isStarted, setIsStarted] = useState(false)
    const [time, setTime] = useState(0)
    const [highScore, setHighScore] = useState<number | null>(null)

    const timerRef = useRef<NodeJS.Timeout | null>(null)

    const totalPairs = (gridSize * gridSize) / 2

    // Initialize game
    const initializeGame = useCallback(() => {
        const selectedEmojis = cardEmojis.slice(0, totalPairs)
        const cardPairs = [...selectedEmojis, ...selectedEmojis]
            .sort(() => Math.random() - 0.5)
            .map((emoji, index) => ({
                id: index,
                emoji,
                isFlipped: false,
                isMatched: false,
            }))

        setCards(cardPairs)
        setFlippedCards([])
        setMoves(0)
        setMatches(0)
        setIsGameOver(false)
        setIsStarted(false)
        setTime(0)

        // Load high score
        const saved = localStorage.getItem(`memoryHighScore_${gridSize}`)
        if (saved) setHighScore(parseInt(saved, 10))
    }, [gridSize, totalPairs])

    useEffect(() => {
        initializeGame()
    }, [initializeGame])

    // Timer
    useEffect(() => {
        if (isStarted && !isGameOver) {
            timerRef.current = setInterval(() => {
                setTime((prev) => prev + 1)
            }, 1000)
        }
        return () => {
            if (timerRef.current) clearInterval(timerRef.current)
        }
    }, [isStarted, isGameOver])

    // Handle card click
    const handleCardClick = (cardId: number) => {
        const card = cards.find((c) => c.id === cardId)
        if (!card || card.isFlipped || card.isMatched || flippedCards.length >= 2) {
            return
        }

        // Start timer on first click
        if (!isStarted) {
            setIsStarted(true)
        }

        // Flip the card
        setCards((prev) =>
            prev.map((c) =>
                c.id === cardId ? { ...c, isFlipped: true } : c
            )
        )

        const newFlippedCards = [...flippedCards, cardId]
        setFlippedCards(newFlippedCards)

        // Check for match if two cards are flipped
        if (newFlippedCards.length === 2) {
            setMoves((prev) => prev + 1)

            const [firstId, secondId] = newFlippedCards
            const firstCard = cards.find((c) => c.id === firstId)
            const secondCard = cards.find((c) => c.id === secondId)

            if (firstCard && secondCard && firstCard.emoji === secondCard.emoji) {
                // Match found!
                setTimeout(() => {
                    setCards((prev) =>
                        prev.map((c) =>
                            c.id === firstId || c.id === secondId
                                ? { ...c, isMatched: true }
                                : c
                        )
                    )
                    setMatches((prev) => {
                        const newMatches = prev + 1
                        if (newMatches === totalPairs) {
                            setIsGameOver(true)

                            // Check high score (lower is better)
                            const score = moves + 1
                            if (!highScore || score < highScore) {
                                setHighScore(score)
                                localStorage.setItem(`memoryHighScore_${gridSize}`, String(score))
                            }
                        }
                        return newMatches
                    })
                    setFlippedCards([])
                }, 500)
            } else {
                // No match - flip back
                setTimeout(() => {
                    setCards((prev) =>
                        prev.map((c) =>
                            c.id === firstId || c.id === secondId
                                ? { ...c, isFlipped: false }
                                : c
                        )
                    )
                    setFlippedCards([])
                }, 1000)
            }
        }
    }

    // Calculate stars based on moves
    const calculateStars = () => {
        const perfectMoves = totalPairs
        if (moves <= perfectMoves) return 3
        if (moves <= perfectMoves * 1.5) return 2
        return 1
    }

    // Format time
    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60)
        const secs = seconds % 60
        return `${mins}:${secs.toString().padStart(2, '0')}`
    }

    return (
        <motion.div
            className={cn(
                'bg-white/95 backdrop-blur-xl rounded-2xl border border-black/[0.08] shadow-2xl overflow-hidden',
                className
            )}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
        >
            {/* Header */}
            <div className="px-6 py-4 border-b border-black/[0.05] bg-gradient-to-r from-purple-500/10 to-pink-500/10">
                <div className="flex items-center justify-between">
                    <h3 className="font-bold flex items-center gap-2">
                        <Brain className="w-5 h-5 text-purple-600" />
                        Memory Game
                    </h3>
                    <div className="flex items-center gap-4 text-sm">
                        <span className="flex items-center gap-1.5">
                            <Zap className="w-4 h-4 text-yellow-500" />
                            {moves} moves
                        </span>
                        <span className="flex items-center gap-1.5 text-muted">
                            <Timer className="w-4 h-4" />
                            {formatTime(time)}
                        </span>
                    </div>
                </div>
            </div>

            {/* Game board */}
            <div className="p-6">
                <div
                    className={cn(
                        'grid gap-2 sm:gap-3 mx-auto',
                        gridSize === 4 ? 'grid-cols-4 max-w-sm' : 'grid-cols-6 max-w-md'
                    )}
                >
                    {cards.map((card) => (
                        <MemoryCard
                            key={card.id}
                            card={card}
                            onClick={() => handleCardClick(card.id)}
                            disabled={flippedCards.length >= 2 || card.isFlipped || card.isMatched}
                        />
                    ))}
                </div>

                {/* Progress */}
                <div className="mt-6">
                    <div className="flex justify-between text-sm text-muted mb-2">
                        <span>{matches} / {totalPairs} pairs found</span>
                        <div className="flex gap-0.5">
                            {[1, 2, 3].map((star) => (
                                <Star
                                    key={star}
                                    className={cn(
                                        'w-4 h-4',
                                        star <= calculateStars()
                                            ? 'text-yellow-400 fill-yellow-400'
                                            : 'text-gray-200'
                                    )}
                                />
                            ))}
                        </div>
                    </div>
                    <div className="h-2 bg-black/[0.05] rounded-full overflow-hidden">
                        <motion.div
                            className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
                            animate={{ width: `${(matches / totalPairs) * 100}%` }}
                            transition={{ duration: 0.3 }}
                        />
                    </div>
                </div>
            </div>

            {/* Game over overlay */}
            <AnimatePresence>
                {isGameOver && (
                    <motion.div
                        className="absolute inset-0 bg-white/95 backdrop-blur-sm flex items-center justify-center p-6"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <motion.div
                            className="text-center"
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                        >
                            <motion.div
                                className="text-6xl mb-4"
                                animate={{ rotate: [0, -10, 10, 0] }}
                                transition={{ duration: 0.5 }}
                            >
                                🎉
                            </motion.div>

                            <h3 className="text-2xl font-bold mb-2">Congratulations!</h3>

                            <div className="flex justify-center gap-1 mb-4">
                                {[1, 2, 3].map((star) => (
                                    <motion.div
                                        key={star}
                                        initial={{ scale: 0, rotate: -180 }}
                                        animate={{ scale: 1, rotate: 0 }}
                                        transition={{ delay: 0.3 + star * 0.1, type: 'spring' }}
                                    >
                                        <Star
                                            className={cn(
                                                'w-8 h-8',
                                                star <= calculateStars()
                                                    ? 'text-yellow-400 fill-yellow-400'
                                                    : 'text-gray-200'
                                            )}
                                        />
                                    </motion.div>
                                ))}
                            </div>

                            <div className="space-y-1 text-sm text-muted mb-6">
                                <p>Completed in <strong>{moves}</strong> moves</p>
                                <p>Time: <strong>{formatTime(time)}</strong></p>
                                {highScore === moves && (
                                    <p className="text-yellow-600 flex items-center justify-center gap-1">
                                        <Trophy className="w-4 h-4" /> New Best Score!
                                    </p>
                                )}
                            </div>

                            <div className="flex gap-3 justify-center">
                                <Button onClick={initializeGame} variant="primary" icon={<RotateCcw className="w-4 h-4" />}>
                                    Play Again
                                </Button>
                                {onClose && (
                                    <Button onClick={onClose} variant="secondary">
                                        Close
                                    </Button>
                                )}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Footer */}
            <div className="px-6 py-3 border-t border-black/[0.05] flex justify-between items-center">
                <Button onClick={initializeGame} variant="ghost" size="sm" icon={<RotateCcw className="w-4 h-4" />}>
                    Restart
                </Button>
                <div className="text-xs text-muted">
                    Best: {highScore ? `${highScore} moves` : '-'}
                </div>
                {onClose && (
                    <Button onClick={onClose} variant="ghost" size="sm">
                        Close
                    </Button>
                )}
            </div>
        </motion.div>
    )
}

// ========================================
// MEMORY GAME TRIGGER
// ========================================

export function MemoryGameTrigger() {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <>
            <motion.button
                className="fixed bottom-24 right-[136px] z-40 w-12 h-12 rounded-full bg-gradient-to-br from-purple-400 to-pink-600 text-white shadow-lg flex items-center justify-center"
                onClick={() => setIsOpen(true)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 2.4 }}
                title="Memory Game"
            >
                <Brain className="w-5 h-5" />
            </motion.button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsOpen(false)}
                    >
                        <div onClick={(e) => e.stopPropagation()}>
                            <MemoryGame onClose={() => setIsOpen(false)} />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}
