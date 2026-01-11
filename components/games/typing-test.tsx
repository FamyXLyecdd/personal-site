'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { RotateCcw, Trophy, Timer, Keyboard, Zap } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

// ========================================
// TYPING TEST CONFIGURATION
// ========================================

const sampleTexts = [
    "The quick brown fox jumps over the lazy dog. This sentence contains every letter of the alphabet.",
    "Programming is the art of telling a computer what to do through a set of instructions called code.",
    "React is a JavaScript library for building user interfaces. It was developed by Facebook.",
    "TypeScript adds optional static typing to JavaScript, making it easier to catch errors early.",
    "Next.js is a React framework that enables server-side rendering and generates static websites.",
    "Tailwind CSS is a utility-first CSS framework for rapidly building custom user interfaces.",
    "Python is a high-level programming language known for its simplicity and readability.",
    "Discord bots can automate tasks, moderate servers, play music, and provide interactive experiences.",
    "Web development combines creativity and logic to build engaging online experiences for users.",
    "Machine learning enables computers to learn from data and make predictions without explicit programming.",
]

interface TypingStats {
    wpm: number
    accuracy: number
    time: number
    characters: number
    errors: number
}

// ========================================
// TYPING TEST COMPONENT
// ========================================

interface TypingTestProps {
    className?: string
    onClose?: () => void
}

export function TypingTest({ className, onClose }: TypingTestProps) {
    const [text, setText] = useState('')
    const [userInput, setUserInput] = useState('')
    const [isStarted, setIsStarted] = useState(false)
    const [isFinished, setIsFinished] = useState(false)
    const [startTime, setStartTime] = useState<number | null>(null)
    const [currentTime, setCurrentTime] = useState(0)
    const [stats, setStats] = useState<TypingStats | null>(null)
    const [highScore, setHighScore] = useState(0)

    const inputRef = useRef<HTMLInputElement>(null)
    const timerRef = useRef<NodeJS.Timeout | null>(null)

    // Load high score and set random text
    useEffect(() => {
        setText(sampleTexts[Math.floor(Math.random() * sampleTexts.length)])
        const saved = localStorage.getItem('typingHighScore')
        if (saved) setHighScore(parseInt(saved, 10))
    }, [])

    // Timer
    useEffect(() => {
        if (isStarted && !isFinished) {
            timerRef.current = setInterval(() => {
                if (startTime) {
                    setCurrentTime(Math.floor((Date.now() - startTime) / 1000))
                }
            }, 100)
        }
        return () => {
            if (timerRef.current) clearInterval(timerRef.current)
        }
    }, [isStarted, isFinished, startTime])

    // Calculate stats when finished
    const calculateStats = useCallback(() => {
        if (!startTime) return null

        const endTime = Date.now()
        const timeInMinutes = (endTime - startTime) / 60000
        const timeInSeconds = Math.floor((endTime - startTime) / 1000)

        let correctChars = 0
        let errors = 0

        for (let i = 0; i < userInput.length; i++) {
            if (userInput[i] === text[i]) {
                correctChars++
            } else {
                errors++
            }
        }

        const words = correctChars / 5 // Standard: 5 characters = 1 word
        const wpm = Math.round(words / timeInMinutes)
        const accuracy = Math.round((correctChars / userInput.length) * 100)

        return {
            wpm,
            accuracy,
            time: timeInSeconds,
            characters: userInput.length,
            errors,
        }
    }, [startTime, userInput, text])

    // Handle input change
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value

        // Start timer on first keystroke
        if (!isStarted && value.length > 0) {
            setIsStarted(true)
            setStartTime(Date.now())
        }

        // Check if finished
        if (value.length >= text.length) {
            const finalStats = calculateStats()
            setStats(finalStats)
            setIsFinished(true)

            // Update high score
            if (finalStats && finalStats.wpm > highScore) {
                setHighScore(finalStats.wpm)
                localStorage.setItem('typingHighScore', String(finalStats.wpm))
            }
        }

        setUserInput(value)
    }

    // Reset game
    const resetGame = () => {
        setText(sampleTexts[Math.floor(Math.random() * sampleTexts.length)])
        setUserInput('')
        setIsStarted(false)
        setIsFinished(false)
        setStartTime(null)
        setCurrentTime(0)
        setStats(null)
        inputRef.current?.focus()
    }

    // Render text with highlighting
    const renderText = () => {
        return text.split('').map((char, index) => {
            let className = 'text-muted/40'

            if (index < userInput.length) {
                if (userInput[index] === char) {
                    className = 'text-green-600'
                } else {
                    className = 'text-red-500 bg-red-100 rounded'
                }
            } else if (index === userInput.length) {
                className = 'text-muted border-l-2 border-accent-primary animate-pulse'
            }

            return (
                <span key={index} className={className}>
                    {char}
                </span>
            )
        })
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
                'bg-white/95 backdrop-blur-xl rounded-2xl border border-black/[0.08] shadow-2xl overflow-hidden w-full max-w-2xl',
                className
            )}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
        >
            {/* Header */}
            <div className="px-6 py-4 border-b border-black/[0.05] bg-gradient-to-r from-blue-500/10 to-purple-500/10">
                <div className="flex items-center justify-between">
                    <h3 className="font-bold flex items-center gap-2">
                        <Keyboard className="w-5 h-5 text-accent-primary" />
                        Typing Speed Test
                    </h3>
                    <div className="flex items-center gap-4 text-sm">
                        <span className="flex items-center gap-1.5">
                            <Timer className="w-4 h-4 text-muted" />
                            {formatTime(currentTime)}
                        </span>
                        <span className="flex items-center gap-1.5 text-muted">
                            <Trophy className="w-4 h-4 text-yellow-600" />
                            {highScore} WPM
                        </span>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="p-6">
                {!isFinished ? (
                    <>
                        {/* Text to type */}
                        <div
                            className="p-4 rounded-xl bg-black/[0.02] border border-black/[0.05] mb-4 font-mono text-lg leading-relaxed"
                            onClick={() => inputRef.current?.focus()}
                        >
                            {renderText()}
                        </div>

                        {/* Hidden input */}
                        <input
                            ref={inputRef}
                            type="text"
                            value={userInput}
                            onChange={handleInputChange}
                            className="absolute opacity-0 pointer-events-none"
                            autoFocus
                        />

                        {/* Instructions */}
                        {!isStarted && (
                            <motion.p
                                className="text-center text-muted text-sm"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                            >
                                Click on the text above and start typing to begin!
                            </motion.p>
                        )}

                        {/* Progress */}
                        {isStarted && (
                            <div className="space-y-2">
                                <div className="flex justify-between text-sm text-muted">
                                    <span>{userInput.length} / {text.length} characters</span>
                                    <span>{Math.round((userInput.length / text.length) * 100)}% complete</span>
                                </div>
                                <div className="h-2 bg-black/[0.05] rounded-full overflow-hidden">
                                    <motion.div
                                        className="h-full bg-gradient-to-r from-accent-primary to-accent-secondary"
                                        initial={{ width: 0 }}
                                        animate={{ width: `${(userInput.length / text.length) * 100}%` }}
                                        transition={{ duration: 0.1 }}
                                    />
                                </div>
                            </div>
                        )}
                    </>
                ) : (
                    // Results
                    <motion.div
                        className="text-center"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <motion.div
                            className="text-6xl mb-4"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: 'spring', stiffness: 400 }}
                        >
                            🎉
                        </motion.div>

                        <h3 className="text-2xl font-bold mb-2">Test Complete!</h3>

                        {stats && (
                            <div className="grid grid-cols-2 gap-4 my-6">
                                <div className="p-4 rounded-xl bg-gradient-to-br from-accent-primary/10 to-accent-secondary/10 border border-accent-primary/20">
                                    <div className="text-3xl font-bold gradient-text">{stats.wpm}</div>
                                    <div className="text-sm text-muted">Words per minute</div>
                                    {stats.wpm > highScore - stats.wpm && stats.wpm === highScore && (
                                        <span className="text-xs text-yellow-600 flex items-center justify-center gap-1 mt-1">
                                            <Trophy className="w-3 h-3" /> New Record!
                                        </span>
                                    )}
                                </div>
                                <div className="p-4 rounded-xl bg-white/50 border border-black/[0.05]">
                                    <div className="text-3xl font-bold">{stats.accuracy}%</div>
                                    <div className="text-sm text-muted">Accuracy</div>
                                </div>
                                <div className="p-4 rounded-xl bg-white/50 border border-black/[0.05]">
                                    <div className="text-2xl font-bold">{formatTime(stats.time)}</div>
                                    <div className="text-sm text-muted">Time</div>
                                </div>
                                <div className="p-4 rounded-xl bg-white/50 border border-black/[0.05]">
                                    <div className="text-2xl font-bold text-red-500">{stats.errors}</div>
                                    <div className="text-sm text-muted">Errors</div>
                                </div>
                            </div>
                        )}

                        <div className="flex gap-3 justify-center">
                            <Button onClick={resetGame} variant="primary" icon={<RotateCcw className="w-4 h-4" />}>
                                Try Again
                            </Button>
                            {onClose && (
                                <Button onClick={onClose} variant="secondary">
                                    Close
                                </Button>
                            )}
                        </div>
                    </motion.div>
                )}
            </div>

            {/* Footer */}
            {!isFinished && (
                <div className="px-6 py-3 border-t border-black/[0.05] flex justify-between items-center">
                    <Button onClick={resetGame} variant="ghost" size="sm" icon={<RotateCcw className="w-4 h-4" />}>
                        New Text
                    </Button>
                    {onClose && (
                        <Button onClick={onClose} variant="ghost" size="sm">
                            Close
                        </Button>
                    )}
                </div>
            )}
        </motion.div>
    )
}

// ========================================
// TYPING TEST TRIGGER
// ========================================

export function TypingTestTrigger() {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <>
            <motion.button
                className="fixed bottom-24 right-20 z-40 w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-purple-600 text-white shadow-lg flex items-center justify-center"
                onClick={() => setIsOpen(true)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 2.2 }}
                title="Typing Speed Test"
            >
                <Keyboard className="w-5 h-5" />
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
                            <TypingTest onClose={() => setIsOpen(false)} />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}
