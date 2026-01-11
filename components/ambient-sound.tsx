'use client'

import { createContext, useContext, useState, useEffect, useRef, useCallback, ReactNode } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Volume2, VolumeX, Music, Settings } from 'lucide-react'
import { cn } from '@/lib/utils'

// ========================================
// SOUND TYPES
// ========================================

type SoundType =
    | 'click'
    | 'hover'
    | 'success'
    | 'error'
    | 'notification'
    | 'pop'
    | 'whoosh'
    | 'toggle'
    | 'type'

interface SoundConfig {
    enabled: boolean
    volume: number
    ambientEnabled: boolean
    ambientVolume: number
}

interface AmbientSoundContextType {
    config: SoundConfig
    playSound: (type: SoundType) => void
    toggleSounds: () => void
    toggleAmbient: () => void
    setVolume: (volume: number) => void
    setAmbientVolume: (volume: number) => void
}

// ========================================
// SOUND URLS (Base64 encoded tiny sounds)
// ========================================

// These are placeholder data URIs - in production you'd use actual audio files
const soundUrls: Record<SoundType, string> = {
    click: 'data:audio/wav;base64,UklGRl4AAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YToAAAABAAAAAP9/AABcAC0A8P/e/9//IgBDAAsAuf+d/9//JgAuAN3/vf/b/xcAHwDc/9H/6/8IAAgA7f/o//b/+v/+//r/9//3//r/+//6//f/9f/1//b/9v/3//f/+P/4//n/+f/6//r/+//7//v/+//',
    hover: 'data:audio/wav;base64,UklGRl4AAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YToAAAA+AFIACwC7/8D/IgB3AFwA1/+Q/7r/RQBlAPn/mP+e/xQAUwALAKb/tv8TAEAAAQCs/8P/CQAyAP3/tv/R/wUAJAD7/8L/3f8AABcA9//L/+r/+v8NAO//1P/z//b/BADm/9r/9v/y//z/4f/f//b/8P/4/+H/4P/0/+//9v/i/+H/8v/v//T/5P/i//H/7//y/+X/5P/w//D/8f/m/+X/7//w/+//5//l/+//7//v/+f/',
    success: 'data:audio/wav;base64,UklGRl4AAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YToAAABKAGYAQQDw/+H/MAB4AGEA7/+k/9n/XQB/APz/oP/C/z4AZQDV/5n/wf84AFkArv+Q/8T/RABOAKj/kv/W/z8APgCu/6X/4P8rACkAtv+4/+3/EwATAN//0//4/wAABQDp/+H/9//x//f/7P/p//P/7P/w/+f/5//v/+z/7P/m/+T/7P/r/+r/5f/k/+v/6f/p/+X/5P/q/+n/6P/l/+T/6f/o/+f/5f/l/+j/5//n/+X/',
    error: 'data:audio/wav;base64,UklGRl4AAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YToAAABGAE8AJwDk/+P/EQBUAFcA7f+z/8//PgBfAO7/mv+6/zkAVQC5/4f/tv85AEoApP+D/8j/PQA+AKH/kP/X/zIALQCw/6b/4P8bABkAyf/A/+3/AQAFAOb/2v/3/+3/9v/o/+T/8//p/+//4//h/+//6P/r/+D/3v/s/+X/5//d/9z/6v/j/+T/3P/b/+j/4v/i/9v/2v/m/+D/4P/a/9r/5f/f/9//2f/Z/+T/3v/e/9n/',
    notification: 'data:audio/wav;base64,UklGRl4AAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YToAAABIAGAAQgDz/+T/LgB2AGEAAACp/9P/VAB+AAoAov++/zUAYQDe/5z/vP8tAFYAv/+R/8L/MQBNALH/kf/N/zUAPgCx/6P/2/8mACkAvv+4/+j/DwATAN//0//z//3/AgDq/+D/9P/v//T/6//o//H/7P/u/+b/5f/u/+r/6//k/+P/7P/p/+j/4//j/+r/5//n/+P/4v/p/+b/5v/i/+L/6P/l/+T/4f/h/+f/5P/k/+H/',
    pop: 'data:audio/wav;base64,UklGRl4AAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YToAAABCAFQAKQDn/+H/GABdAF8A+P+1/87/SABoAAEAoP+5/zgAXADo/5r/uf8sAFAAxf+P/8L/LABEALK/kP/N/ysANQC0/6P/2v8gACIAwP+4/+b/CwAOAN//1P/x//n//v/o/+H/8v/s//H/6P/m/+7/6f/r/+T/4//r/+f/5//i/+H/6P/l/+T/4P/f/+b/4//i/97/3v/k/+H/4P/d/9z/4v/f/97/2//b/+D/3f/d/9r/',
    whoosh: 'data:audio/wav;base64,UklGRl4AAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YToAAABAAFoAOwDr/9//IgBqAGQA/v+q/8//UAB7AAkAnv+4/zYAYQDj/5f/t/8uAFMAwf+M/7//LQBHALDoT/7M/ysANwCy/6L/2P8fACIAwP+3/+T/CgANAN7/1P/w//j//P/n/+D/8f/r//D/5//l/+3/6P/q/+P/4v/q/+b/5v/h/+D/5//k/+P/3//e/+X/4v/h/93/3f/j/+D/3//c/9v/4f/e/93/2v/a/9//3P/c/9n/',
    toggle: 'data:audio/wav;base64,UklGRl4AAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YToAAABEAFgAMgDu/+H/GgBfAGAA/P+1/87/RwBnAAoAoP+3/zQAXADp/5r/t/8pAE8AxP+O/7//KQBCALGVj//M/ykAMwCz/6L/1/8dACAAv/+2/+P/CAAMANz/0v/v//b/+v/l/97/7//p/+7/5f/k/+v/5v/o/+H/4P/o/+P/5P/e/93/5f/h/+D/2//a/+L/3v/d/9n/2P/f/9v/2v/W/9b/3P/Y/9f/1P/U/9n/1v/V/9L/',
    type: 'data:audio/wav;base64,UklGRl4AAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YToAAAA0AEQAIADo/+L/DQBRAF0A9v+s/8//QgBlAAsAnf+3/zIAWgDp/5j/tf8oAEsAxP+N/7z/JwBAALH/jf/J/ycAMgCy/6H/1f8bAB4Avv+0/+H/BwAKANv/0f/t//T/+P/k/93/7f/n/+z/5P/i/+n/5P/m/9//3v/m/+H/4v/c/9v/4v/e/93/2f/Y/97/2v/Z/9X/1f/a/9b/1f/S/9H/1//T/9L/z/',
}

const AmbientSoundContext = createContext<AmbientSoundContextType | null>(null)

// ========================================
// AMBIENT SOUND PROVIDER
// ========================================

interface AmbientSoundProviderProps {
    children: ReactNode
}

export function AmbientSoundProvider({ children }: AmbientSoundProviderProps) {
    const [config, setConfig] = useState<SoundConfig>({
        enabled: false,
        volume: 0.3,
        ambientEnabled: false,
        ambientVolume: 0.1,
    })

    const audioCache = useRef<Map<SoundType, HTMLAudioElement>>(new Map())
    const ambientRef = useRef<HTMLAudioElement | null>(null)

    // Load saved preferences
    useEffect(() => {
        const saved = localStorage.getItem('soundConfig')
        if (saved) {
            try {
                setConfig(JSON.parse(saved))
            } catch { }
        }
    }, [])

    // Save preferences
    useEffect(() => {
        localStorage.setItem('soundConfig', JSON.stringify(config))
    }, [config])

    // Preload sounds
    useEffect(() => {
        Object.entries(soundUrls).forEach(([type, url]) => {
            const audio = new Audio(url)
            audio.preload = 'auto'
            audioCache.current.set(type as SoundType, audio)
        })
    }, [])

    const playSound = useCallback((type: SoundType) => {
        if (!config.enabled) return

        const audio = audioCache.current.get(type)
        if (audio) {
            const clone = audio.cloneNode() as HTMLAudioElement
            clone.volume = config.volume
            clone.play().catch(() => { })
        }
    }, [config.enabled, config.volume])

    const toggleSounds = useCallback(() => {
        setConfig((prev) => ({ ...prev, enabled: !prev.enabled }))
    }, [])

    const toggleAmbient = useCallback(() => {
        setConfig((prev) => ({ ...prev, ambientEnabled: !prev.ambientEnabled }))
    }, [])

    const setVolume = useCallback((volume: number) => {
        setConfig((prev) => ({ ...prev, volume }))
    }, [])

    const setAmbientVolume = useCallback((ambientVolume: number) => {
        setConfig((prev) => ({ ...prev, ambientVolume }))
    }, [])

    return (
        <AmbientSoundContext.Provider
            value={{
                config,
                playSound,
                toggleSounds,
                toggleAmbient,
                setVolume,
                setAmbientVolume,
            }}
        >
            {children}
        </AmbientSoundContext.Provider>
    )
}

// ========================================
// HOOK
// ========================================

export function useAmbientSound() {
    const context = useContext(AmbientSoundContext)
    if (!context) {
        throw new Error('useAmbientSound must be used within AmbientSoundProvider')
    }
    return context
}

// ========================================
// SOUND TOGGLE BUTTON
// ========================================

interface SoundToggleProps {
    className?: string
}

export function SoundToggle({ className }: SoundToggleProps) {
    const { config, toggleSounds, setVolume } = useAmbientSound()
    const [showVolume, setShowVolume] = useState(false)

    return (
        <div className={cn('relative', className)}>
            <motion.button
                className={cn(
                    'w-10 h-10 rounded-full backdrop-blur flex items-center justify-center transition-colors',
                    config.enabled
                        ? 'bg-accent-primary/20 text-accent-primary'
                        : 'bg-white/80 text-muted hover:text-foreground'
                )}
                onClick={toggleSounds}
                onMouseEnter={() => setShowVolume(true)}
                onMouseLeave={() => setShowVolume(false)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label={config.enabled ? 'Disable sounds' : 'Enable sounds'}
            >
                {config.enabled ? (
                    <Volume2 className="w-4 h-4" />
                ) : (
                    <VolumeX className="w-4 h-4" />
                )}
            </motion.button>

            {/* Volume slider */}
            <AnimatePresence>
                {showVolume && config.enabled && (
                    <motion.div
                        className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-white rounded-xl shadow-lg border border-black/[0.08] p-3 w-32"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                    >
                        <input
                            type="range"
                            min="0"
                            max="1"
                            step="0.1"
                            value={config.volume}
                            onChange={(e) => setVolume(parseFloat(e.target.value))}
                            className="w-full accent-accent-primary"
                        />
                        <p className="text-xs text-center text-muted mt-1">
                            Volume: {Math.round(config.volume * 100)}%
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

// ========================================
// SOUND SETTINGS PANEL
// ========================================

interface SoundSettingsProps {
    className?: string
}

export function SoundSettings({ className }: SoundSettingsProps) {
    const { config, toggleSounds, toggleAmbient, setVolume, setAmbientVolume } = useAmbientSound()
    const [isOpen, setIsOpen] = useState(false)

    return (
        <div className={cn('relative', className)}>
            <motion.button
                className="w-10 h-10 rounded-full bg-white/80 backdrop-blur flex items-center justify-center text-muted hover:text-foreground transition-colors"
                onClick={() => setIsOpen(!isOpen)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
                <Settings className="w-4 h-4" />
            </motion.button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className="absolute bottom-full mb-2 right-0 bg-white rounded-xl shadow-lg border border-black/[0.08] p-4 w-64"
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    >
                        <h4 className="font-semibold text-sm mb-4 flex items-center gap-2">
                            <Music className="w-4 h-4" />
                            Sound Settings
                        </h4>

                        <div className="space-y-4">
                            {/* UI Sounds */}
                            <div>
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-sm">UI Sounds</span>
                                    <button
                                        className={cn(
                                            'w-10 h-5 rounded-full transition-colors relative',
                                            config.enabled ? 'bg-accent-primary' : 'bg-gray-200'
                                        )}
                                        onClick={toggleSounds}
                                    >
                                        <motion.div
                                            className="absolute top-0.5 w-4 h-4 rounded-full bg-white shadow"
                                            animate={{ left: config.enabled ? 'calc(100% - 18px)' : '2px' }}
                                        />
                                    </button>
                                </div>
                                {config.enabled && (
                                    <input
                                        type="range"
                                        min="0"
                                        max="1"
                                        step="0.1"
                                        value={config.volume}
                                        onChange={(e) => setVolume(parseFloat(e.target.value))}
                                        className="w-full accent-accent-primary"
                                    />
                                )}
                            </div>

                            {/* Ambient */}
                            <div>
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-sm">Ambient Music</span>
                                    <button
                                        className={cn(
                                            'w-10 h-5 rounded-full transition-colors relative',
                                            config.ambientEnabled ? 'bg-accent-primary' : 'bg-gray-200'
                                        )}
                                        onClick={toggleAmbient}
                                    >
                                        <motion.div
                                            className="absolute top-0.5 w-4 h-4 rounded-full bg-white shadow"
                                            animate={{ left: config.ambientEnabled ? 'calc(100% - 18px)' : '2px' }}
                                        />
                                    </button>
                                </div>
                                {config.ambientEnabled && (
                                    <input
                                        type="range"
                                        min="0"
                                        max="1"
                                        step="0.1"
                                        value={config.ambientVolume}
                                        onChange={(e) => setAmbientVolume(parseFloat(e.target.value))}
                                        className="w-full accent-accent-primary"
                                    />
                                )}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
