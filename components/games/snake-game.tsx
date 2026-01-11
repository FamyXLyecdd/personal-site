'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Play, Pause, RotateCcw, Trophy, Zap, ArrowUp, ArrowDown, ArrowLeft, ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

// ========================================
// TYPES
// ========================================

interface Position {
    x: number
    y: number
}

type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT'

interface GameState {
    snake: Position[]
    food: Position
    direction: Direction
    score: number
    highScore: number
    isPlaying: boolean
    isGameOver: boolean
    speed: number
}

// ========================================
// CONSTANTS
// ========================================

const GRID_SIZE = 20
const CELL_SIZE = 16
const INITIAL_SPEED = 150
const SPEED_INCREASE = 5
const MIN_SPEED = 50

// ========================================
// HELPER FUNCTIONS
// ========================================

function getRandomPosition(excludePositions: Position[] = []): Position {
    let position: Position
    do {
        position = {
            x: Math.floor(Math.random() * GRID_SIZE),
            y: Math.floor(Math.random() * GRID_SIZE),
        }
    } while (excludePositions.some((p) => p.x === position.x && p.y === position.y))
    return position
}

function getInitialState(): GameState {
    const initialSnake = [
        { x: 10, y: 10 },
        { x: 9, y: 10 },
        { x: 8, y: 10 },
    ]

    return {
        snake: initialSnake,
        food: getRandomPosition(initialSnake),
        direction: 'RIGHT',
        score: 0,
        highScore: typeof window !== 'undefined'
            ? parseInt(localStorage.getItem('snakeHighScore') || '0', 10)
            : 0,
        isPlaying: false,
        isGameOver: false,
        speed: INITIAL_SPEED,
    }
}

// ========================================
// SNAKE GAME COMPONENT
// ========================================

interface SnakeGameProps {
    className?: string
    onClose?: () => void
}

export function SnakeGame({ className, onClose }: SnakeGameProps) {
    const [gameState, setGameState] = useState<GameState>(getInitialState)
    const [showControls, setShowControls] = useState(true)
    const gameLoopRef = useRef<NodeJS.Timeout | null>(null)
    const directionRef = useRef<Direction>('RIGHT')
    const canvasRef = useRef<HTMLDivElement>(null)

    // Move snake
    const moveSnake = useCallback(() => {
        setGameState((prev) => {
            if (!prev.isPlaying || prev.isGameOver) return prev

            const newSnake = [...prev.snake]
            const head = { ...newSnake[0] }

            // Move head based on direction
            switch (directionRef.current) {
                case 'UP':
                    head.y -= 1
                    break
                case 'DOWN':
                    head.y += 1
                    break
                case 'LEFT':
                    head.x -= 1
                    break
                case 'RIGHT':
                    head.x += 1
                    break
            }

            // Check wall collision
            if (head.x < 0 || head.x >= GRID_SIZE || head.y < 0 || head.y >= GRID_SIZE) {
                const newHighScore = Math.max(prev.score, prev.highScore)
                if (newHighScore > prev.highScore) {
                    localStorage.setItem('snakeHighScore', String(newHighScore))
                }
                return {
                    ...prev,
                    isPlaying: false,
                    isGameOver: true,
                    highScore: newHighScore,
                }
            }

            // Check self collision
            if (newSnake.some((segment) => segment.x === head.x && segment.y === head.y)) {
                const newHighScore = Math.max(prev.score, prev.highScore)
                if (newHighScore > prev.highScore) {
                    localStorage.setItem('snakeHighScore', String(newHighScore))
                }
                return {
                    ...prev,
                    isPlaying: false,
                    isGameOver: true,
                    highScore: newHighScore,
                }
            }

            newSnake.unshift(head)

            // Check food collision
            let newFood = prev.food
            let newScore = prev.score
            let newSpeed = prev.speed

            if (head.x === prev.food.x && head.y === prev.food.y) {
                newFood = getRandomPosition(newSnake)
                newScore += 10
                newSpeed = Math.max(MIN_SPEED, prev.speed - SPEED_INCREASE)
            } else {
                newSnake.pop()
            }

            return {
                ...prev,
                snake: newSnake,
                food: newFood,
                score: newScore,
                speed: newSpeed,
                direction: directionRef.current,
            }
        })
    }, [])

    // Game loop
    useEffect(() => {
        if (gameState.isPlaying && !gameState.isGameOver) {
            gameLoopRef.current = setInterval(moveSnake, gameState.speed)
        }
        return () => {
            if (gameLoopRef.current) {
                clearInterval(gameLoopRef.current)
            }
        }
    }, [gameState.isPlaying, gameState.isGameOver, gameState.speed, moveSnake])

    // Keyboard controls
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (!gameState.isPlaying) return

            const keyDirections: Record<string, Direction> = {
                ArrowUp: 'UP',
                ArrowDown: 'DOWN',
                ArrowLeft: 'LEFT',
                ArrowRight: 'RIGHT',
                KeyW: 'UP',
                KeyS: 'DOWN',
                KeyA: 'LEFT',
                KeyD: 'RIGHT',
            }

            const newDirection = keyDirections[e.code]
            if (!newDirection) return

            // Prevent reversing
            const opposites: Record<Direction, Direction> = {
                UP: 'DOWN',
                DOWN: 'UP',
                LEFT: 'RIGHT',
                RIGHT: 'LEFT',
            }

            if (opposites[newDirection] !== directionRef.current) {
                directionRef.current = newDirection
                e.preventDefault()
            }
        }

        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [gameState.isPlaying])

    // Touch controls
    const handleTouchDirection = (direction: Direction) => {
        if (!gameState.isPlaying) return

        const opposites: Record<Direction, Direction> = {
            UP: 'DOWN',
            DOWN: 'UP',
            LEFT: 'RIGHT',
            RIGHT: 'LEFT',
        }

        if (opposites[direction] !== directionRef.current) {
            directionRef.current = direction
        }
    }

    // Start game
    const startGame = () => {
        if (gameState.isGameOver) {
            setGameState({
                ...getInitialState(),
                highScore: gameState.highScore,
                isPlaying: true,
            })
            directionRef.current = 'RIGHT'
        } else {
            setGameState((prev) => ({ ...prev, isPlaying: true }))
        }
        setShowControls(false)
        canvasRef.current?.focus()
    }

    // Pause game
    const pauseGame = () => {
        setGameState((prev) => ({ ...prev, isPlaying: false }))
    }

    // Reset game
    const resetGame = () => {
        setGameState({
            ...getInitialState(),
            highScore: gameState.highScore,
        })
        directionRef.current = 'RIGHT'
        setShowControls(true)
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
            <div className="px-4 py-3 border-b border-black/[0.05] bg-gradient-to-r from-green-500/10 to-emerald-500/10">
                <div className="flex items-center justify-between">
                    <h3 className="font-bold text-sm flex items-center gap-2">
                        🐍 Snake Game
                    </h3>
                    <div className="flex items-center gap-4 text-sm">
                        <span className="flex items-center gap-1">
                            <Zap className="w-4 h-4 text-yellow-500" />
                            {gameState.score}
                        </span>
                        <span className="flex items-center gap-1 text-muted">
                            <Trophy className="w-4 h-4 text-yellow-600" />
                            {gameState.highScore}
                        </span>
                    </div>
                </div>
            </div>

            {/* Game canvas */}
            <div
                ref={canvasRef}
                className="relative bg-gradient-to-br from-slate-900 to-slate-800 m-4 rounded-xl overflow-hidden"
                style={{
                    width: GRID_SIZE * CELL_SIZE,
                    height: GRID_SIZE * CELL_SIZE,
                }}
                tabIndex={0}
            >
                {/* Grid lines */}
                <div
                    className="absolute inset-0 opacity-10"
                    style={{
                        backgroundImage: `
              linear-gradient(to right, #fff 1px, transparent 1px),
              linear-gradient(to bottom, #fff 1px, transparent 1px)
            `,
                        backgroundSize: `${CELL_SIZE}px ${CELL_SIZE}px`,
                    }}
                />

                {/* Snake */}
                {gameState.snake.map((segment, index) => (
                    <motion.div
                        key={`${segment.x}-${segment.y}-${index}`}
                        className={cn(
                            'absolute rounded-sm',
                            index === 0
                                ? 'bg-gradient-to-br from-green-400 to-green-600'
                                : 'bg-gradient-to-br from-green-500 to-green-700'
                        )}
                        style={{
                            width: CELL_SIZE - 2,
                            height: CELL_SIZE - 2,
                            left: segment.x * CELL_SIZE + 1,
                            top: segment.y * CELL_SIZE + 1,
                        }}
                        initial={index === 0 ? { scale: 0.8 } : false}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.1 }}
                    >
                        {/* Snake head eyes */}
                        {index === 0 && (
                            <div className="absolute inset-0 flex items-center justify-center gap-1">
                                <div className="w-1.5 h-1.5 rounded-full bg-white" />
                                <div className="w-1.5 h-1.5 rounded-full bg-white" />
                            </div>
                        )}
                    </motion.div>
                ))}

                {/* Food */}
                <motion.div
                    className="absolute"
                    style={{
                        width: CELL_SIZE - 2,
                        height: CELL_SIZE - 2,
                        left: gameState.food.x * CELL_SIZE + 1,
                        top: gameState.food.y * CELL_SIZE + 1,
                    }}
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 0.5, repeat: Infinity }}
                >
                    🍎
                </motion.div>

                {/* Start overlay */}
                <AnimatePresence>
                    {showControls && !gameState.isPlaying && !gameState.isGameOver && (
                        <motion.div
                            className="absolute inset-0 bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            <p className="text-white text-sm mb-4">Use arrow keys or WASD</p>
                            <Button onClick={startGame} variant="primary" icon={<Play className="w-4 h-4" />}>
                                Start Game
                            </Button>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Game over overlay */}
                <AnimatePresence>
                    {gameState.isGameOver && (
                        <motion.div
                            className="absolute inset-0 bg-black/70 backdrop-blur-sm flex flex-col items-center justify-center"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ type: 'spring', stiffness: 400 }}
                            >
                                <h3 className="text-2xl font-bold text-white mb-2">Game Over!</h3>
                                <p className="text-white/70 text-sm mb-1">Score: {gameState.score}</p>
                                {gameState.score === gameState.highScore && gameState.score > 0 && (
                                    <p className="text-yellow-400 text-sm mb-4 flex items-center gap-1">
                                        <Trophy className="w-4 h-4" /> New High Score!
                                    </p>
                                )}
                                <div className="flex gap-2 mt-4">
                                    <Button onClick={startGame} variant="primary" icon={<RotateCcw className="w-4 h-4" />}>
                                        Play Again
                                    </Button>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Controls */}
            <div className="px-4 pb-4">
                <div className="flex items-center justify-between mb-3">
                    <div className="flex gap-2">
                        {gameState.isPlaying ? (
                            <Button onClick={pauseGame} variant="secondary" size="sm" icon={<Pause className="w-4 h-4" />}>
                                Pause
                            </Button>
                        ) : (
                            <Button onClick={startGame} variant="primary" size="sm" icon={<Play className="w-4 h-4" />}>
                                {gameState.isGameOver ? 'Restart' : 'Play'}
                            </Button>
                        )}
                        <Button onClick={resetGame} variant="ghost" size="sm" icon={<RotateCcw className="w-4 h-4" />}>
                            Reset
                        </Button>
                    </div>
                    {onClose && (
                        <Button onClick={onClose} variant="ghost" size="sm">
                            Close
                        </Button>
                    )}
                </div>

                {/* Touch controls */}
                <div className="grid grid-cols-3 gap-1 w-32 mx-auto">
                    <div />
                    <motion.button
                        className="w-10 h-10 rounded-lg bg-white/50 border border-black/[0.08] flex items-center justify-center"
                        onClick={() => handleTouchDirection('UP')}
                        whileTap={{ scale: 0.9 }}
                    >
                        <ArrowUp className="w-4 h-4" />
                    </motion.button>
                    <div />
                    <motion.button
                        className="w-10 h-10 rounded-lg bg-white/50 border border-black/[0.08] flex items-center justify-center"
                        onClick={() => handleTouchDirection('LEFT')}
                        whileTap={{ scale: 0.9 }}
                    >
                        <ArrowLeft className="w-4 h-4" />
                    </motion.button>
                    <motion.button
                        className="w-10 h-10 rounded-lg bg-white/50 border border-black/[0.08] flex items-center justify-center"
                        onClick={() => handleTouchDirection('DOWN')}
                        whileTap={{ scale: 0.9 }}
                    >
                        <ArrowDown className="w-4 h-4" />
                    </motion.button>
                    <motion.button
                        className="w-10 h-10 rounded-lg bg-white/50 border border-black/[0.08] flex items-center justify-center"
                        onClick={() => handleTouchDirection('RIGHT')}
                        whileTap={{ scale: 0.9 }}
                    >
                        <ArrowRight className="w-4 h-4" />
                    </motion.button>
                </div>
            </div>
        </motion.div>
    )
}

// ========================================
// FLOATING SNAKE GAME BUTTON
// ========================================

export function SnakeGameTrigger() {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <>
            {/* Trigger button */}
            <motion.button
                className="fixed bottom-24 right-6 z-40 w-12 h-12 rounded-full bg-gradient-to-br from-green-400 to-green-600 text-white shadow-lg flex items-center justify-center"
                onClick={() => setIsOpen(true)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 2 }}
                title="Play Snake!"
            >
                🐍
            </motion.button>

            {/* Game modal */}
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
                            <SnakeGame onClose={() => setIsOpen(false)} />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}
