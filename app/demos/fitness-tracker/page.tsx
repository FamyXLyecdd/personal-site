'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import {
    Activity,
    Flame,
    Footprints,
    Heart,
    Moon,
    Droplets,
    Apple,
    Dumbbell,
    Timer,
    TrendingUp,
    Target,
    Award,
    Calendar,
    ChevronRight,
    ChevronLeft,
    Plus,
    MoreHorizontal,
    Bell,
    Settings,
    User,
    Home,
    BarChart3,
    Utensils,
    Zap,
    Sun,
    CloudRain,
} from 'lucide-react'

// ========================================
// TYPES
// ========================================

interface WorkoutSession {
    id: string
    type: string
    name: string
    duration: number
    calories: number
    time: string
    emoji: string
}

interface DailyStats {
    steps: number
    stepsGoal: number
    calories: number
    caloriesGoal: number
    activeMinutes: number
    activeGoal: number
    distance: number
    heartRate: number
    sleep: number
    water: number
    waterGoal: number
}

interface WeeklyData {
    day: string
    steps: number
    calories: number
}

// ========================================
// SAMPLE DATA
// ========================================

const dailyStats: DailyStats = {
    steps: 8432,
    stepsGoal: 10000,
    calories: 1850,
    caloriesGoal: 2200,
    activeMinutes: 45,
    activeGoal: 60,
    distance: 6.2,
    heartRate: 72,
    sleep: 7.5,
    water: 6,
    waterGoal: 8,
}

const workouts: WorkoutSession[] = [
    { id: 'w1', type: 'strength', name: 'Upper Body Workout', duration: 45, calories: 320, time: '7:30 AM', emoji: '💪' },
    { id: 'w2', type: 'cardio', name: 'Morning Run', duration: 30, calories: 280, time: '6:00 AM', emoji: '🏃' },
    { id: 'w3', type: 'yoga', name: 'Evening Yoga', duration: 25, calories: 120, time: '8:00 PM', emoji: '🧘' },
]

const weeklyData: WeeklyData[] = [
    { day: 'Mon', steps: 9500, calories: 2100 },
    { day: 'Tue', steps: 7200, calories: 1800 },
    { day: 'Wed', steps: 8800, calories: 1950 },
    { day: 'Thu', steps: 6500, calories: 1650 },
    { day: 'Fri', steps: 8432, calories: 1850 },
    { day: 'Sat', steps: 0, calories: 0 },
    { day: 'Sun', steps: 0, calories: 0 },
]

const achievements = [
    { id: 'a1', name: 'Early Bird', description: '5 morning workouts', icon: '🌅', progress: 80, color: '#F59E0B' },
    { id: 'a2', name: '10K Steps', description: 'Walk 10,000 steps', icon: '👟', progress: 84, color: '#10B981' },
    { id: 'a3', name: 'Hydration Hero', description: 'Drink 8 glasses', icon: '💧', progress: 75, color: '#3B82F6' },
    { id: 'a4', name: 'Sleep Champion', description: 'Sleep 8+ hours', icon: '😴', progress: 60, color: '#8B5CF6' },
]

// ========================================
// CIRCULAR PROGRESS
// ========================================

function CircularProgress({
    value,
    max,
    size = 120,
    strokeWidth = 10,
    color,
    children,
}: {
    value: number
    max: number
    size?: number
    strokeWidth?: number
    color: string
    children?: React.ReactNode
}) {
    const radius = (size - strokeWidth) / 2
    const circumference = radius * 2 * Math.PI
    const progress = Math.min(value / max, 1)
    const offset = circumference - progress * circumference

    return (
        <div className="relative" style={{ width: size, height: size }}>
            <svg className="transform -rotate-90" width={size} height={size}>
                <circle
                    className="text-gray-200"
                    strokeWidth={strokeWidth}
                    stroke="currentColor"
                    fill="transparent"
                    r={radius}
                    cx={size / 2}
                    cy={size / 2}
                />
                <motion.circle
                    stroke={color}
                    strokeWidth={strokeWidth}
                    strokeDasharray={circumference}
                    initial={{ strokeDashoffset: circumference }}
                    animate={{ strokeDashoffset: offset }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                    strokeLinecap="round"
                    fill="transparent"
                    r={radius}
                    cx={size / 2}
                    cy={size / 2}
                />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
                {children}
            </div>
        </div>
    )
}

// ========================================
// SIDEBAR
// ========================================

function Sidebar() {
    const menuItems = [
        { icon: <Home className="w-5 h-5" />, label: 'Dashboard', active: true },
        { icon: <Activity className="w-5 h-5" />, label: 'Activity' },
        { icon: <Dumbbell className="w-5 h-5" />, label: 'Workouts' },
        { icon: <Utensils className="w-5 h-5" />, label: 'Nutrition' },
        { icon: <Moon className="w-5 h-5" />, label: 'Sleep' },
        { icon: <BarChart3 className="w-5 h-5" />, label: 'Reports' },
    ]

    return (
        <aside className="w-20 bg-gray-900 text-white flex flex-col items-center py-6">
            {/* Logo */}
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center mb-8">
                <Zap className="w-6 h-6" />
            </div>

            {/* Nav */}
            <nav className="flex-1 space-y-2">
                {menuItems.map((item) => (
                    <button
                        key={item.label}
                        className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${item.active
                                ? 'bg-green-500 text-white'
                                : 'text-gray-400 hover:bg-white/10 hover:text-white'
                            }`}
                        title={item.label}
                    >
                        {item.icon}
                    </button>
                ))}
            </nav>

            {/* Settings */}
            <button className="w-12 h-12 rounded-xl text-gray-400 hover:bg-white/10 hover:text-white flex items-center justify-center mt-auto">
                <Settings className="w-5 h-5" />
            </button>
        </aside>
    )
}

// ========================================
// STAT CARD
// ========================================

function StatCard({
    icon,
    label,
    value,
    unit,
    goal,
    color,
    trend,
}: {
    icon: React.ReactNode
    label: string
    value: number
    unit: string
    goal?: number
    color: string
    trend?: number
}) {
    return (
        <motion.div
            className="bg-white rounded-2xl p-5 shadow-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
        >
            <div className="flex items-start justify-between mb-4">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${color}20`, color }}>
                    {icon}
                </div>
                {trend !== undefined && (
                    <div className={`flex items-center gap-1 text-sm ${trend >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                        <TrendingUp className={`w-4 h-4 ${trend < 0 ? 'rotate-180' : ''}`} />
                        {Math.abs(trend)}%
                    </div>
                )}
            </div>
            <p className="text-gray-500 text-sm mb-1">{label}</p>
            <div className="flex items-baseline gap-1">
                <span className="text-2xl font-bold">{value.toLocaleString()}</span>
                <span className="text-gray-400 text-sm">{unit}</span>
            </div>
            {goal && (
                <div className="mt-3">
                    <div className="flex justify-between text-xs text-gray-500 mb-1">
                        <span>Goal</span>
                        <span>{Math.round((value / goal) * 100)}%</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <motion.div
                            className="h-full rounded-full"
                            style={{ backgroundColor: color }}
                            initial={{ width: 0 }}
                            animate={{ width: `${Math.min((value / goal) * 100, 100)}%` }}
                            transition={{ duration: 1, ease: 'easeOut' }}
                        />
                    </div>
                </div>
            )}
        </motion.div>
    )
}

// ========================================
// WORKOUT CARD
// ========================================

function WorkoutCard({ workout }: { workout: WorkoutSession }) {
    return (
        <motion.div
            className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-sm"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            whileHover={{ scale: 1.02 }}
        >
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-100 to-emerald-100 flex items-center justify-center text-2xl">
                {workout.emoji}
            </div>
            <div className="flex-1">
                <h4 className="font-semibold">{workout.name}</h4>
                <p className="text-sm text-gray-500">{workout.time}</p>
            </div>
            <div className="text-right">
                <p className="font-semibold text-green-600">{workout.calories} kcal</p>
                <p className="text-sm text-gray-500">{workout.duration} min</p>
            </div>
        </motion.div>
    )
}

// ========================================
// WEEKLY CHART
// ========================================

function WeeklyChart({ data }: { data: WeeklyData[] }) {
    const maxSteps = Math.max(...data.map((d) => d.steps), 1)

    return (
        <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold text-lg">Weekly Activity</h3>
                <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-green-500" />
                        Steps
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-orange-500" />
                        Calories
                    </div>
                </div>
            </div>

            <div className="flex items-end justify-between h-40 gap-3">
                {data.map((day, index) => (
                    <div key={day.day} className="flex-1 flex flex-col items-center gap-2">
                        <motion.div
                            className="w-full bg-green-500 rounded-t-lg"
                            initial={{ height: 0 }}
                            animate={{ height: `${(day.steps / maxSteps) * 100}%` }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        />
                        <span className="text-xs text-gray-500">{day.day}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}

// ========================================
// ACHIEVEMENT CARD
// ========================================

function AchievementCard({ achievement }: { achievement: typeof achievements[0] }) {
    return (
        <motion.div
            className="p-4 bg-white rounded-xl shadow-sm"
            whileHover={{ scale: 1.02 }}
        >
            <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl" style={{ backgroundColor: `${achievement.color}20` }}>
                    {achievement.icon}
                </div>
                <div>
                    <h4 className="font-semibold text-sm">{achievement.name}</h4>
                    <p className="text-xs text-gray-500">{achievement.description}</p>
                </div>
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <motion.div
                    className="h-full rounded-full"
                    style={{ backgroundColor: achievement.color }}
                    initial={{ width: 0 }}
                    animate={{ width: `${achievement.progress}%` }}
                    transition={{ duration: 1 }}
                />
            </div>
            <p className="text-right text-xs text-gray-500 mt-1">{achievement.progress}%</p>
        </motion.div>
    )
}

// ========================================
// MAIN PAGE
// ========================================

export default function FitnessTrackerPage() {
    return (
        <div className="min-h-screen flex bg-gray-50">
            <Sidebar />

            <main className="flex-1 p-8 overflow-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-2xl font-bold">Good morning, John! 👋</h1>
                        <p className="text-gray-500">Here&apos;s your fitness overview for today</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <button className="relative p-2 hover:bg-gray-100 rounded-xl">
                            <Bell className="w-6 h-6" />
                            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
                        </button>
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center text-white font-bold">
                            JD
                        </div>
                    </div>
                </div>

                {/* Main ring */}
                <div className="grid lg:grid-cols-3 gap-8 mb-8">
                    <div className="lg:col-span-1 bg-white rounded-2xl p-8 shadow-sm flex flex-col items-center">
                        <CircularProgress
                            value={dailyStats.calories}
                            max={dailyStats.caloriesGoal}
                            size={200}
                            strokeWidth={16}
                            color="#10B981"
                        >
                            <div className="text-center">
                                <Flame className="w-8 h-8 mx-auto text-orange-500 mb-2" />
                                <p className="text-3xl font-bold">{dailyStats.calories}</p>
                                <p className="text-gray-500 text-sm">/ {dailyStats.caloriesGoal} kcal</p>
                            </div>
                        </CircularProgress>
                        <h3 className="font-bold text-lg mt-6 mb-4">Daily Goal</h3>
                        <div className="flex gap-8 text-center">
                            <div>
                                <p className="text-2xl font-bold text-green-500">{dailyStats.steps.toLocaleString()}</p>
                                <p className="text-sm text-gray-500">Steps</p>
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-blue-500">{dailyStats.distance}</p>
                                <p className="text-sm text-gray-500">km</p>
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-purple-500">{dailyStats.activeMinutes}</p>
                                <p className="text-sm text-gray-500">min</p>
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-2">
                        {/* Stats grid */}
                        <div className="grid sm:grid-cols-2 gap-4 mb-6">
                            <StatCard
                                icon={<Footprints className="w-5 h-5" />}
                                label="Steps"
                                value={dailyStats.steps}
                                unit="steps"
                                goal={dailyStats.stepsGoal}
                                color="#10B981"
                                trend={12}
                            />
                            <StatCard
                                icon={<Heart className="w-5 h-5" />}
                                label="Heart Rate"
                                value={dailyStats.heartRate}
                                unit="bpm"
                                color="#EF4444"
                                trend={-3}
                            />
                            <StatCard
                                icon={<Moon className="w-5 h-5" />}
                                label="Sleep"
                                value={dailyStats.sleep}
                                unit="hours"
                                goal={8}
                                color="#8B5CF6"
                                trend={5}
                            />
                            <StatCard
                                icon={<Droplets className="w-5 h-5" />}
                                label="Water"
                                value={dailyStats.water}
                                unit="glasses"
                                goal={dailyStats.waterGoal}
                                color="#3B82F6"
                            />
                        </div>
                    </div>
                </div>

                {/* Weekly chart & workouts */}
                <div className="grid lg:grid-cols-2 gap-8 mb-8">
                    <WeeklyChart data={weeklyData} />

                    <div className="bg-white rounded-2xl p-6 shadow-sm">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="font-bold text-lg">Today&apos;s Workouts</h3>
                            <button className="p-2 hover:bg-gray-100 rounded-xl">
                                <Plus className="w-5 h-5" />
                            </button>
                        </div>
                        <div className="space-y-3">
                            {workouts.map((workout) => (
                                <WorkoutCard key={workout.id} workout={workout} />
                            ))}
                        </div>
                    </div>
                </div>

                {/* Achievements */}
                <div className="mb-8">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="font-bold text-lg">Achievements</h3>
                        <button className="text-sm text-green-600 font-medium">View all</button>
                    </div>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {achievements.map((achievement) => (
                            <AchievementCard key={achievement.id} achievement={achievement} />
                        ))}
                    </div>
                </div>

                {/* Footer */}
                <div className="text-center text-gray-500 text-sm py-4">
                    Demo by{' '}
                    <Link href="/" className="text-green-600 hover:underline">
                        YourName
                    </Link>
                </div>
            </main>
        </div>
    )
}
