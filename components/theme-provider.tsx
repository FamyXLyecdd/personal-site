'use client'

import { useState, useEffect, useRef, createContext, useContext, ReactNode, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Moon, Sun, Monitor, Palette, Check } from 'lucide-react'
import { cn } from '@/lib/utils'

// ========================================
// THEME TYPES
// ========================================

type Theme = 'light' | 'dark' | 'system'
type AccentColor = 'violet' | 'blue' | 'green' | 'orange' | 'rose' | 'cyan'

interface ThemeConfig {
    theme: Theme
    accentColor: AccentColor
    fontSize: 'small' | 'medium' | 'large'
    reducedMotion: boolean
}

const defaultConfig: ThemeConfig = {
    theme: 'light',
    accentColor: 'violet',
    fontSize: 'medium',
    reducedMotion: false,
}

// ========================================
// ACCENT COLOR DEFINITIONS
// ========================================

export const accentColors: Record<AccentColor, {
    name: string
    primary: string
    secondary: string
    css: Record<string, string>
}> = {
    violet: {
        name: 'Violet',
        primary: '#8B5CF6',
        secondary: '#A78BFA',
        css: {
            '--accent-primary': '#8B5CF6',
            '--accent-secondary': '#A78BFA',
            '--accent-primary-rgb': '139, 92, 246',
        },
    },
    blue: {
        name: 'Blue',
        primary: '#3B82F6',
        secondary: '#60A5FA',
        css: {
            '--accent-primary': '#3B82F6',
            '--accent-secondary': '#60A5FA',
            '--accent-primary-rgb': '59, 130, 246',
        },
    },
    green: {
        name: 'Green',
        primary: '#10B981',
        secondary: '#34D399',
        css: {
            '--accent-primary': '#10B981',
            '--accent-secondary': '#34D399',
            '--accent-primary-rgb': '16, 185, 129',
        },
    },
    orange: {
        name: 'Orange',
        primary: '#F59E0B',
        secondary: '#FBBF24',
        css: {
            '--accent-primary': '#F59E0B',
            '--accent-secondary': '#FBBF24',
            '--accent-primary-rgb': '245, 158, 11',
        },
    },
    rose: {
        name: 'Rose',
        primary: '#EC4899',
        secondary: '#F472B6',
        css: {
            '--accent-primary': '#EC4899',
            '--accent-secondary': '#F472B6',
            '--accent-primary-rgb': '236, 72, 153',
        },
    },
    cyan: {
        name: 'Cyan',
        primary: '#06B6D4',
        secondary: '#22D3EE',
        css: {
            '--accent-primary': '#06B6D4',
            '--accent-secondary': '#22D3EE',
            '--accent-primary-rgb': '6, 182, 212',
        },
    },
}

// ========================================
// THEME CONTEXT
// ========================================

interface ThemeContextType extends ThemeConfig {
    setTheme: (theme: Theme) => void
    setAccentColor: (color: AccentColor) => void
    setFontSize: (size: 'small' | 'medium' | 'large') => void
    setReducedMotion: (reduced: boolean) => void
    resolvedTheme: 'light' | 'dark'
}

const ThemeContext = createContext<ThemeContextType | null>(null)

// ========================================
// THEME PROVIDER
// ========================================

interface ThemeProviderProps {
    children: ReactNode
    defaultTheme?: Theme
    defaultAccent?: AccentColor
}

export function ThemeProvider({
    children,
    defaultTheme = 'light',
    defaultAccent = 'violet',
}: ThemeProviderProps) {
    const [config, setConfig] = useState<ThemeConfig>({
        ...defaultConfig,
        theme: defaultTheme,
        accentColor: defaultAccent,
    })
    const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>('light')

    // Load from localStorage
    useEffect(() => {
        const stored = localStorage.getItem('theme-config')
        if (stored) {
            try {
                const parsed = JSON.parse(stored)
                setConfig(prev => ({ ...prev, ...parsed }))
            } catch (e) {
                console.error('Error parsing theme config')
            }
        }
    }, [])

    // Save to localStorage
    useEffect(() => {
        localStorage.setItem('theme-config', JSON.stringify(config))
    }, [config])

    // Handle system theme changes
    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

        const updateResolvedTheme = () => {
            if (config.theme === 'system') {
                setResolvedTheme(mediaQuery.matches ? 'dark' : 'light')
            } else {
                setResolvedTheme(config.theme)
            }
        }

        updateResolvedTheme()
        mediaQuery.addEventListener('change', updateResolvedTheme)
        return () => mediaQuery.removeEventListener('change', updateResolvedTheme)
    }, [config.theme])

    // Apply theme to document
    useEffect(() => {
        const root = document.documentElement

        // Remove existing class
        root.classList.remove('light', 'dark')
        root.classList.add(resolvedTheme)

        // Apply accent colors
        const accent = accentColors[config.accentColor]
        Object.entries(accent.css).forEach(([key, value]) => {
            root.style.setProperty(key, value)
        })

        // Apply font size
        const fontSizes = {
            small: '14px',
            medium: '16px',
            large: '18px',
        }
        root.style.fontSize = fontSizes[config.fontSize]

        // Apply reduced motion
        if (config.reducedMotion) {
            root.style.setProperty('--animation-duration', '0.01ms')
        } else {
            root.style.removeProperty('--animation-duration')
        }
    }, [resolvedTheme, config.accentColor, config.fontSize, config.reducedMotion])

    const setTheme = (theme: Theme) => setConfig(prev => ({ ...prev, theme }))
    const setAccentColor = (accentColor: AccentColor) => setConfig(prev => ({ ...prev, accentColor }))
    const setFontSize = (fontSize: 'small' | 'medium' | 'large') => setConfig(prev => ({ ...prev, fontSize }))
    const setReducedMotion = (reducedMotion: boolean) => setConfig(prev => ({ ...prev, reducedMotion }))

    return (
        <ThemeContext.Provider
            value={{
                ...config,
                setTheme,
                setAccentColor,
                setFontSize,
                setReducedMotion,
                resolvedTheme,
            }}
        >
            {children}
        </ThemeContext.Provider>
    )
}

// ========================================
// HOOK
// ========================================

export function useTheme() {
    const context = useContext(ThemeContext)
    if (!context) {
        throw new Error('useTheme must be used within ThemeProvider')
    }
    return context
}

// ========================================
// THEME TOGGLE
// ========================================

export function ThemeToggle({ className }: { className?: string }) {
    const { theme, setTheme, resolvedTheme } = useTheme()

    const handleClick = () => {
        if (theme === 'light') setTheme('dark')
        else if (theme === 'dark') setTheme('system')
        else setTheme('light')
    }

    return (
        <motion.button
            className={cn(
                'p-2.5 rounded-xl bg-white/70 border border-black/[0.08] hover:bg-white transition-colors',
                className
            )}
            onClick={handleClick}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            title={`Current: ${theme}`}
        >
            <AnimatePresence mode="wait">
                <motion.div
                    key={theme}
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                >
                    {theme === 'light' && <Sun className="w-5 h-5" />}
                    {theme === 'dark' && <Moon className="w-5 h-5" />}
                    {theme === 'system' && <Monitor className="w-5 h-5" />}
                </motion.div>
            </AnimatePresence>
        </motion.button>
    )
}

// ========================================
// ACCENT COLOR PICKER
// ========================================

export function AccentColorPicker({ className }: { className?: string }) {
    const { accentColor, setAccentColor } = useTheme()
    const [isOpen, setIsOpen] = useState(false)

    return (
        <div className={cn('relative', className)}>
            <motion.button
                className="p-2.5 rounded-xl bg-white/70 border border-black/[0.08] hover:bg-white transition-colors"
                onClick={() => setIsOpen(!isOpen)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
                <div
                    className="w-5 h-5 rounded-full"
                    style={{ backgroundColor: accentColors[accentColor].primary }}
                />
            </motion.button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className="absolute top-full right-0 mt-2 p-3 bg-white rounded-xl shadow-xl border border-black/[0.05] z-50"
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    >
                        <p className="text-xs text-muted mb-2">Accent Color</p>
                        <div className="flex gap-2">
                            {Object.entries(accentColors).map(([key, value]) => (
                                <motion.button
                                    key={key}
                                    className={cn(
                                        'w-8 h-8 rounded-full flex items-center justify-center transition-all',
                                        accentColor === key && 'ring-2 ring-offset-2 ring-black/20'
                                    )}
                                    style={{ backgroundColor: value.primary }}
                                    onClick={() => {
                                        setAccentColor(key as AccentColor)
                                        setIsOpen(false)
                                    }}
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    title={value.name}
                                >
                                    {accentColor === key && (
                                        <Check className="w-4 h-4 text-white" />
                                    )}
                                </motion.button>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

// ========================================
// THEME SETTINGS PANEL
// ========================================

export function ThemeSettings({ className }: { className?: string }) {
    const {
        theme,
        setTheme,
        accentColor,
        setAccentColor,
        fontSize,
        setFontSize,
        reducedMotion,
        setReducedMotion,
    } = useTheme()

    return (
        <div className={cn('p-6 bg-white rounded-2xl border border-black/[0.08]', className)}>
            <h3 className="font-bold text-lg mb-6">Appearance Settings</h3>

            {/* Theme */}
            <div className="mb-6">
                <p className="text-sm text-muted mb-3">Theme</p>
                <div className="flex gap-2">
                    {[
                        { key: 'light' as const, icon: <Sun className="w-4 h-4" />, label: 'Light' },
                        { key: 'dark' as const, icon: <Moon className="w-4 h-4" />, label: 'Dark' },
                        { key: 'system' as const, icon: <Monitor className="w-4 h-4" />, label: 'System' },
                    ].map((item) => (
                        <button
                            key={item.key}
                            className={cn(
                                'flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors',
                                theme === item.key
                                    ? 'bg-accent-primary text-white'
                                    : 'bg-black/[0.03] hover:bg-black/[0.05]'
                            )}
                            onClick={() => setTheme(item.key)}
                        >
                            {item.icon}
                            {item.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Accent Color */}
            <div className="mb-6">
                <p className="text-sm text-muted mb-3">Accent Color</p>
                <div className="flex gap-2 flex-wrap">
                    {Object.entries(accentColors).map(([key, value]) => (
                        <button
                            key={key}
                            className={cn(
                                'w-10 h-10 rounded-xl flex items-center justify-center transition-all',
                                accentColor === key && 'ring-2 ring-offset-2 ring-black/20'
                            )}
                            style={{ backgroundColor: value.primary }}
                            onClick={() => setAccentColor(key as AccentColor)}
                            title={value.name}
                        >
                            {accentColor === key && <Check className="w-5 h-5 text-white" />}
                        </button>
                    ))}
                </div>
            </div>

            {/* Font Size */}
            <div className="mb-6">
                <p className="text-sm text-muted mb-3">Font Size</p>
                <div className="flex gap-2">
                    {[
                        { key: 'small' as const, label: 'Small' },
                        { key: 'medium' as const, label: 'Medium' },
                        { key: 'large' as const, label: 'Large' },
                    ].map((item) => (
                        <button
                            key={item.key}
                            className={cn(
                                'flex-1 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors',
                                fontSize === item.key
                                    ? 'bg-accent-primary text-white'
                                    : 'bg-black/[0.03] hover:bg-black/[0.05]'
                            )}
                            onClick={() => setFontSize(item.key)}
                        >
                            {item.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Reduced Motion */}
            <div>
                <label className="flex items-center justify-between cursor-pointer">
                    <span className="text-sm">Reduce motion</span>
                    <button
                        className={cn(
                            'w-12 h-7 rounded-full transition-colors',
                            reducedMotion ? 'bg-accent-primary' : 'bg-black/10'
                        )}
                        onClick={() => setReducedMotion(!reducedMotion)}
                    >
                        <motion.div
                            className="w-5 h-5 rounded-full bg-white shadow ml-1"
                            animate={{ x: reducedMotion ? 20 : 0 }}
                        />
                    </button>
                </label>
            </div>
        </div>
    )
}
