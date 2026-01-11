'use client'

import { useState, useEffect, useCallback, useRef, createContext, useContext, ReactNode } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    Search,
    Command,
    ArrowUp,
    ArrowDown,
    CornerDownLeft,
    Home,
    User,
    Briefcase,
    Mail,
    BookOpen,
    Code,
    Moon,
    Sun,
    Volume2,
    VolumeX,
    Palette,
    Settings,
    X,
    Hash,
    AtSign,
    ExternalLink,
    Github,
    Twitter,
    Linkedin,
    Gamepad2,
} from 'lucide-react'
import { cn } from '@/lib/utils'

// ========================================
// TYPES
// ========================================

interface CommandItem {
    id: string
    name: string
    description?: string
    icon?: React.ReactNode
    shortcut?: string[]
    action: () => void
    category?: string
    keywords?: string[]
}

interface CommandGroup {
    id: string
    name: string
    commands: CommandItem[]
}

// ========================================
// DEFAULT COMMANDS
// ========================================

const defaultCommands: CommandGroup[] = [
    {
        id: 'navigation',
        name: 'Navigation',
        commands: [
            {
                id: 'go-home',
                name: 'Go to Home',
                description: 'Navigate to the homepage',
                icon: <Home className="w-4 h-4" />,
                shortcut: ['G', 'H'],
                action: () => window.location.href = '/',
            },
            {
                id: 'go-about',
                name: 'Go to About',
                description: 'Learn more about me',
                icon: <User className="w-4 h-4" />,
                shortcut: ['G', 'A'],
                action: () => window.location.href = '/about',
            },
            {
                id: 'go-projects',
                name: 'Go to Projects',
                description: 'View all projects',
                icon: <Briefcase className="w-4 h-4" />,
                shortcut: ['G', 'P'],
                action: () => window.location.href = '/projects',
            },
            {
                id: 'go-blog',
                name: 'Go to Blog',
                description: 'Read my articles',
                icon: <BookOpen className="w-4 h-4" />,
                shortcut: ['G', 'B'],
                action: () => window.location.href = '/blog',
            },
            {
                id: 'go-contact',
                name: 'Go to Contact',
                description: 'Get in touch',
                icon: <Mail className="w-4 h-4" />,
                shortcut: ['G', 'C'],
                action: () => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }),
            },
        ],
    },
    {
        id: 'actions',
        name: 'Actions',
        commands: [
            {
                id: 'toggle-theme',
                name: 'Toggle Theme',
                description: 'Switch between light and dark mode',
                icon: <Moon className="w-4 h-4" />,
                shortcut: ['T'],
                action: () => console.log('Toggle theme'),
            },
            {
                id: 'toggle-sounds',
                name: 'Toggle Sounds',
                description: 'Enable or disable UI sounds',
                icon: <Volume2 className="w-4 h-4" />,
                shortcut: ['S'],
                action: () => console.log('Toggle sounds'),
            },
            {
                id: 'play-games',
                name: 'Play Games',
                description: 'Access hidden games',
                icon: <Gamepad2 className="w-4 h-4" />,
                action: () => console.log('Open games'),
                keywords: ['snake', 'typing', 'memory'],
            },
            {
                id: 'view-source',
                name: 'View Source Code',
                description: 'Open the GitHub repository',
                icon: <Code className="w-4 h-4" />,
                action: () => window.open('https://github.com/yourname/portfolio', '_blank'),
            },
        ],
    },
    {
        id: 'social',
        name: 'Social Links',
        commands: [
            {
                id: 'open-github',
                name: 'Open GitHub',
                description: 'View my GitHub profile',
                icon: <Github className="w-4 h-4" />,
                action: () => window.open('https://github.com/yourname', '_blank'),
            },
            {
                id: 'open-twitter',
                name: 'Open Twitter',
                description: 'Follow me on Twitter',
                icon: <Twitter className="w-4 h-4" />,
                action: () => window.open('https://twitter.com/yourname', '_blank'),
            },
            {
                id: 'open-linkedin',
                name: 'Open LinkedIn',
                description: 'Connect on LinkedIn',
                icon: <Linkedin className="w-4 h-4" />,
                action: () => window.open('https://linkedin.com/in/yourname', '_blank'),
            },
        ],
    },
]

// ========================================
// COMMAND PALETTE CONTEXT
// ========================================

interface CommandPaletteContextType {
    isOpen: boolean
    open: () => void
    close: () => void
    toggle: () => void
    registerCommand: (group: string, command: CommandItem) => void
}

const CommandPaletteContext = createContext<CommandPaletteContextType | null>(null)

// ========================================
// COMMAND PALETTE PROVIDER
// ========================================

interface CommandPaletteProviderProps {
    children: ReactNode
    commands?: CommandGroup[]
}

export function CommandPaletteProvider({
    children,
    commands = defaultCommands
}: CommandPaletteProviderProps) {
    const [isOpen, setIsOpen] = useState(false)
    const [query, setQuery] = useState('')
    const [selectedIndex, setSelectedIndex] = useState(0)
    const [customCommands, setCustomCommands] = useState<CommandGroup[]>([])
    const inputRef = useRef<HTMLInputElement>(null)

    const allCommands = [...commands, ...customCommands]

    // Filter commands based on query
    const filteredGroups = allCommands.map((group) => ({
        ...group,
        commands: group.commands.filter((cmd) => {
            const searchStr = `${cmd.name} ${cmd.description || ''} ${cmd.keywords?.join(' ') || ''}`.toLowerCase()
            return searchStr.includes(query.toLowerCase())
        }),
    })).filter((group) => group.commands.length > 0)

    const flattenedCommands = filteredGroups.flatMap((group) => group.commands)

    // Keyboard shortcuts
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            // Open with Cmd+K or Ctrl+K
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault()
                setIsOpen((prev) => !prev)
            }
            // Close with Escape
            if (e.key === 'Escape' && isOpen) {
                setIsOpen(false)
            }
        }

        document.addEventListener('keydown', handleKeyDown)
        return () => document.removeEventListener('keydown', handleKeyDown)
    }, [isOpen])

    // Focus input when opened
    useEffect(() => {
        if (isOpen) {
            inputRef.current?.focus()
            setQuery('')
            setSelectedIndex(0)
        }
    }, [isOpen])

    // Reset selection when query changes
    useEffect(() => {
        setSelectedIndex(0)
    }, [query])

    // Handle keyboard navigation
    const handleKeyDown = (e: React.KeyboardEvent) => {
        switch (e.key) {
            case 'ArrowDown':
                e.preventDefault()
                setSelectedIndex((prev) =>
                    prev < flattenedCommands.length - 1 ? prev + 1 : prev
                )
                break
            case 'ArrowUp':
                e.preventDefault()
                setSelectedIndex((prev) => (prev > 0 ? prev - 1 : prev))
                break
            case 'Enter':
                e.preventDefault()
                if (flattenedCommands[selectedIndex]) {
                    flattenedCommands[selectedIndex].action()
                    setIsOpen(false)
                }
                break
        }
    }

    const open = useCallback(() => setIsOpen(true), [])
    const close = useCallback(() => setIsOpen(false), [])
    const toggle = useCallback(() => setIsOpen((prev) => !prev), [])

    const registerCommand = useCallback((groupId: string, command: CommandItem) => {
        setCustomCommands((prev) => {
            const existingGroup = prev.find((g) => g.id === groupId)
            if (existingGroup) {
                return prev.map((g) =>
                    g.id === groupId
                        ? { ...g, commands: [...g.commands, command] }
                        : g
                )
            }
            return [...prev, { id: groupId, name: groupId, commands: [command] }]
        })
    }, [])

    let currentIndex = -1

    return (
        <CommandPaletteContext.Provider value={{ isOpen, open, close, toggle, registerCommand }}>
            {children}

            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={close}
                        />

                        {/* Palette */}
                        <motion.div
                            className="fixed top-[20%] left-1/2 -translate-x-1/2 w-full max-w-xl z-50 p-4"
                            initial={{ opacity: 0, scale: 0.95, y: -20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: -20 }}
                            transition={{ type: 'spring', damping: 25, stiffness: 400 }}
                        >
                            <div className="bg-white rounded-2xl shadow-2xl border border-black/[0.08] overflow-hidden">
                                {/* Search input */}
                                <div className="flex items-center gap-3 px-4 py-3 border-b border-black/[0.05]">
                                    <Search className="w-5 h-5 text-muted" />
                                    <input
                                        ref={inputRef}
                                        type="text"
                                        placeholder="Type a command or search..."
                                        value={query}
                                        onChange={(e) => setQuery(e.target.value)}
                                        onKeyDown={handleKeyDown}
                                        className="flex-1 bg-transparent outline-none text-sm"
                                    />
                                    <div className="flex items-center gap-1">
                                        <kbd className="px-1.5 py-0.5 rounded bg-black/[0.05] text-xs text-muted">
                                            esc
                                        </kbd>
                                    </div>
                                </div>

                                {/* Results */}
                                <div className="max-h-[400px] overflow-y-auto py-2">
                                    {filteredGroups.length === 0 ? (
                                        <div className="px-4 py-8 text-center text-muted text-sm">
                                            No commands found
                                        </div>
                                    ) : (
                                        filteredGroups.map((group) => (
                                            <div key={group.id}>
                                                <div className="px-4 py-2 text-xs font-medium text-muted uppercase tracking-wider">
                                                    {group.name}
                                                </div>
                                                {group.commands.map((cmd) => {
                                                    currentIndex++
                                                    const isSelected = currentIndex === selectedIndex
                                                    const itemIndex = currentIndex

                                                    return (
                                                        <motion.button
                                                            key={cmd.id}
                                                            className={cn(
                                                                'w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors',
                                                                isSelected ? 'bg-accent-primary/10 text-accent-primary' : 'hover:bg-black/[0.02]'
                                                            )}
                                                            onClick={() => {
                                                                cmd.action()
                                                                close()
                                                            }}
                                                            onMouseEnter={() => setSelectedIndex(itemIndex)}
                                                            whileTap={{ scale: 0.99 }}
                                                        >
                                                            <div className={cn(
                                                                'w-8 h-8 rounded-lg flex items-center justify-center',
                                                                isSelected ? 'bg-accent-primary/20' : 'bg-black/[0.05]'
                                                            )}>
                                                                {cmd.icon}
                                                            </div>
                                                            <div className="flex-1 min-w-0">
                                                                <div className="font-medium text-sm">{cmd.name}</div>
                                                                {cmd.description && (
                                                                    <div className="text-xs text-muted truncate">{cmd.description}</div>
                                                                )}
                                                            </div>
                                                            {cmd.shortcut && (
                                                                <div className="flex gap-1">
                                                                    {cmd.shortcut.map((key) => (
                                                                        <kbd
                                                                            key={key}
                                                                            className="px-1.5 py-0.5 rounded bg-black/[0.05] text-xs text-muted"
                                                                        >
                                                                            {key}
                                                                        </kbd>
                                                                    ))}
                                                                </div>
                                                            )}
                                                        </motion.button>
                                                    )
                                                })}
                                            </div>
                                        ))
                                    )}
                                </div>

                                {/* Footer */}
                                <div className="px-4 py-2 border-t border-black/[0.05] flex items-center gap-4 text-xs text-muted">
                                    <span className="flex items-center gap-1">
                                        <ArrowUp className="w-3 h-3" />
                                        <ArrowDown className="w-3 h-3" />
                                        to navigate
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <CornerDownLeft className="w-3 h-3" />
                                        to select
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <Command className="w-3 h-3" />K
                                        to open
                                    </span>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </CommandPaletteContext.Provider>
    )
}

// ========================================
// HOOKS
// ========================================

export function useCommandPalette() {
    const context = useContext(CommandPaletteContext)
    if (!context) {
        throw new Error('useCommandPalette must be used within CommandPaletteProvider')
    }
    return context
}

// ========================================
// TRIGGER BUTTON
// ========================================

interface CommandPaletteTriggerProps {
    className?: string
}

export function CommandPaletteTrigger({ className }: CommandPaletteTriggerProps) {
    const { open } = useCommandPalette()

    return (
        <motion.button
            className={cn(
                'flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/70 border border-black/[0.08]',
                'text-sm text-muted hover:text-foreground transition-colors',
                className
            )}
            onClick={open}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
        >
            <Search className="w-4 h-4" />
            <span>Search...</span>
            <kbd className="hidden sm:inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-black/[0.05] text-xs">
                <Command className="w-3 h-3" />K
            </kbd>
        </motion.button>
    )
}

// ========================================
// KEYBOARD SHORTCUTS HELP
// ========================================

interface ShortcutItem {
    keys: string[]
    description: string
}

const shortcuts: ShortcutItem[] = [
    { keys: ['Cmd', 'K'], description: 'Open command palette' },
    { keys: ['G', 'H'], description: 'Go to Home' },
    { keys: ['G', 'A'], description: 'Go to About' },
    { keys: ['G', 'P'], description: 'Go to Projects' },
    { keys: ['G', 'B'], description: 'Go to Blog' },
    { keys: ['G', 'C'], description: 'Go to Contact' },
    { keys: ['T'], description: 'Toggle theme' },
    { keys: ['S'], description: 'Toggle sounds' },
    { keys: ['?'], description: 'Show shortcuts' },
]

export function KeyboardShortcutsHelp() {
    const [isOpen, setIsOpen] = useState(false)

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === '?' && !e.metaKey && !e.ctrlKey) {
                setIsOpen((prev) => !prev)
            }
        }
        document.addEventListener('keydown', handleKeyDown)
        return () => document.removeEventListener('keydown', handleKeyDown)
    }, [])

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsOpen(false)}
                    />
                    <motion.div
                        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md z-50"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                    >
                        <div className="bg-white rounded-2xl shadow-2xl border border-black/[0.08] p-6">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-bold">Keyboard Shortcuts</h3>
                                <button
                                    className="w-8 h-8 rounded-full hover:bg-black/5 flex items-center justify-center"
                                    onClick={() => setIsOpen(false)}
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </div>
                            <div className="space-y-3">
                                {shortcuts.map((shortcut, index) => (
                                    <div key={index} className="flex items-center justify-between">
                                        <span className="text-sm text-muted">{shortcut.description}</span>
                                        <div className="flex gap-1">
                                            {shortcut.keys.map((key) => (
                                                <kbd
                                                    key={key}
                                                    className="px-2 py-1 rounded bg-black/[0.05] text-xs font-medium"
                                                >
                                                    {key}
                                                </kbd>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <p className="mt-4 text-xs text-center text-muted">
                                Press <kbd className="px-1 py-0.5 rounded bg-black/[0.05]">?</kbd> to toggle this panel
                            </p>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    )
}
