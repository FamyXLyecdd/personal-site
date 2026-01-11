'use client'

import { useState, useRef, useEffect, useMemo, useCallback } from 'react'
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion'
import Link from 'next/link'
import {
    Play,
    Pause,
    SkipBack,
    SkipForward,
    Shuffle,
    Repeat,
    Repeat1,
    Volume2,
    VolumeX,
    Volume1,
    Heart,
    ListMusic,
    Mic2,
    MonitorSpeaker,
    Maximize2,
    ChevronUp,
    ChevronDown,
    Plus,
    Search,
    Home,
    Library,
    Clock,
    Music,
    Radio,
    User,
    Settings,
    MoreHorizontal,
    PlusCircle,
    ChevronRight,
} from 'lucide-react'

// ========================================
// TYPES
// ========================================

interface Track {
    id: string
    title: string
    artist: string
    album: string
    duration: string
    durationMs: number
    cover: string
    liked?: boolean
}

interface Playlist {
    id: string
    name: string
    cover: string
    songs: number
    creator: string
}

interface Artist {
    id: string
    name: string
    image: string
    followers: string
}

// ========================================
// SAMPLE DATA
// ========================================

const currentTrack: Track = {
    id: 't1',
    title: 'Starlight Symphony',
    artist: 'Cosmic Dreams',
    album: 'Galactic Journey',
    duration: '4:32',
    durationMs: 272000,
    cover: '🌌',
    liked: true,
}

const queue: Track[] = [
    { id: 't2', title: 'Midnight Drive', artist: 'NeonWave', album: 'Synthwave Nights', duration: '3:45', durationMs: 225000, cover: '🌃' },
    { id: 't3', title: 'Summer Breeze', artist: 'Chill Vibes', album: 'Relaxation', duration: '5:12', durationMs: 312000, cover: '🏖️' },
    { id: 't4', title: 'Electric Dreams', artist: 'Future Sound', album: 'Tomorrow', duration: '4:01', durationMs: 241000, cover: '⚡' },
    { id: 't5', title: 'Mountain Echo', artist: 'Nature Sounds', album: 'Peaceful', duration: '6:30', durationMs: 390000, cover: '🏔️' },
]

const recentlyPlayed: Track[] = [
    { id: 'r1', title: 'City Lights', artist: 'Urban Flow', album: 'Metropolitan', duration: '3:28', durationMs: 208000, cover: '🌆' },
    { id: 'r2', title: 'Ocean Waves', artist: 'Calm Waters', album: 'Serenity', duration: '7:15', durationMs: 435000, cover: '🌊' },
    { id: 'r3', title: 'Forest Walk', artist: 'Nature Sounds', album: 'Outdoors', duration: '4:45', durationMs: 285000, cover: '🌲' },
    { id: 'r4', title: 'Jazz Night', artist: 'Smooth Sax', album: 'After Hours', duration: '5:30', durationMs: 330000, cover: '🎷' },
]

const playlists: Playlist[] = [
    { id: 'pl1', name: 'Liked Songs', cover: '❤️', songs: 234, creator: 'You' },
    { id: 'pl2', name: 'Workout Hits', cover: '💪', songs: 56, creator: 'You' },
    { id: 'pl3', name: 'Chill Vibes', cover: '😌', songs: 89, creator: 'You' },
    { id: 'pl4', name: 'Focus Mode', cover: '🎯', songs: 42, creator: 'You' },
    { id: 'pl5', name: 'Party Mix', cover: '🎉', songs: 123, creator: 'You' },
]

const featuredPlaylists: Playlist[] = [
    { id: 'fp1', name: 'Today\'s Top Hits', cover: '🔥', songs: 50, creator: 'MusicHub' },
    { id: 'fp2', name: 'Chill Hits', cover: '✨', songs: 60, creator: 'MusicHub' },
    { id: 'fp3', name: 'Workout', cover: '🏋️', songs: 45, creator: 'MusicHub' },
    { id: 'fp4', name: 'Sleep', cover: '😴', songs: 30, creator: 'MusicHub' },
    { id: 'fp5', name: 'Focus', cover: '📚', songs: 40, creator: 'MusicHub' },
    { id: 'fp6', name: 'Party', cover: '🪩', songs: 80, creator: 'MusicHub' },
]

// ========================================
// SIDEBAR
// ========================================

function Sidebar() {
    const [activeSection, setActiveSection] = useState('home')

    return (
        <aside className="w-64 bg-black text-white flex flex-col h-full">
            {/* Logo */}
            <div className="p-6">
                <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center">
                        <Music className="w-5 h-5 text-black" />
                    </div>
                    <span className="text-xl font-bold">MusicHub</span>
                </div>
            </div>

            {/* Main nav */}
            <nav className="px-3 space-y-1">
                {[
                    { id: 'home', icon: <Home className="w-6 h-6" />, label: 'Home' },
                    { id: 'search', icon: <Search className="w-6 h-6" />, label: 'Search' },
                    { id: 'library', icon: <Library className="w-6 h-6" />, label: 'Your Library' },
                ].map((item) => (
                    <button
                        key={item.id}
                        className={`w-full flex items-center gap-4 px-3 py-3 rounded-md transition-colors ${activeSection === item.id
                                ? 'text-white'
                                : 'text-gray-400 hover:text-white'
                            }`}
                        onClick={() => setActiveSection(item.id)}
                    >
                        {item.icon}
                        <span className="font-semibold">{item.label}</span>
                    </button>
                ))}
            </nav>

            {/* Create playlist */}
            <div className="px-3 mt-6 space-y-1">
                <button className="w-full flex items-center gap-4 px-3 py-3 text-gray-400 hover:text-white transition-colors">
                    <div className="w-6 h-6 bg-gray-400 rounded flex items-center justify-center">
                        <Plus className="w-4 h-4 text-black" />
                    </div>
                    <span className="font-semibold">Create Playlist</span>
                </button>
                <button className="w-full flex items-center gap-4 px-3 py-3 text-gray-400 hover:text-white transition-colors">
                    <div className="w-6 h-6 bg-gradient-to-br from-purple-700 to-blue-300 rounded flex items-center justify-center">
                        <Heart className="w-3 h-3 text-white" />
                    </div>
                    <span className="font-semibold">Liked Songs</span>
                </button>
            </div>

            {/* Divider */}
            <div className="mx-6 my-3 border-t border-gray-800" />

            {/* Playlists */}
            <div className="flex-1 overflow-y-auto px-3">
                {playlists.map((playlist) => (
                    <button
                        key={playlist.id}
                        className="w-full text-left px-3 py-2 text-sm text-gray-400 hover:text-white transition-colors truncate"
                    >
                        {playlist.name}
                    </button>
                ))}
            </div>
        </aside>
    )
}

// ========================================
// HEADER
// ========================================

function Header() {
    return (
        <header className="h-16 bg-gray-900/50 backdrop-blur-lg flex items-center justify-between px-6 sticky top-0 z-10">
            <div className="flex items-center gap-4">
                <button className="w-8 h-8 rounded-full bg-black/40 flex items-center justify-center text-gray-400 hover:text-white">
                    <ChevronRight className="w-5 h-5 rotate-180" />
                </button>
                <button className="w-8 h-8 rounded-full bg-black/40 flex items-center justify-center text-gray-400 hover:text-white">
                    <ChevronRight className="w-5 h-5" />
                </button>
            </div>

            <div className="flex items-center gap-4">
                <button className="px-4 py-1.5 rounded-full bg-white text-black font-semibold text-sm hover:scale-105 transition-transform">
                    Upgrade
                </button>
                <button className="w-8 h-8 rounded-full bg-black flex items-center justify-center">
                    <User className="w-4 h-4" />
                </button>
            </div>
        </header>
    )
}

// ========================================
// TRACK ROW
// ========================================

function TrackRow({ track, index, showAlbum = true }: { track: Track; index: number; showAlbum?: boolean }) {
    const [isHovered, setIsHovered] = useState(false)
    const [isLiked, setIsLiked] = useState(track.liked || false)

    return (
        <div
            className="group flex items-center gap-4 px-4 py-2 rounded-md hover:bg-white/10 transition-colors"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="w-4 text-center">
                {isHovered ? (
                    <Play className="w-4 h-4 fill-white" />
                ) : (
                    <span className="text-gray-400 text-sm">{index}</span>
                )}
            </div>
            <div className="w-10 h-10 rounded bg-gray-800 flex items-center justify-center text-xl flex-shrink-0">
                {track.cover}
            </div>
            <div className="flex-1 min-w-0">
                <p className="font-medium truncate">{track.title}</p>
                <p className="text-sm text-gray-400 truncate">{track.artist}</p>
            </div>
            {showAlbum && (
                <div className="w-48 hidden md:block">
                    <p className="text-sm text-gray-400 truncate">{track.album}</p>
                </div>
            )}
            <button
                className={`opacity-0 group-hover:opacity-100 transition-opacity ${isLiked ? 'opacity-100' : ''}`}
                onClick={() => setIsLiked(!isLiked)}
            >
                <Heart className={`w-4 h-4 ${isLiked ? 'fill-green-500 text-green-500' : 'text-gray-400'}`} />
            </button>
            <div className="w-12 text-right">
                <span className="text-sm text-gray-400">{track.duration}</span>
            </div>
            <button className="opacity-0 group-hover:opacity-100 transition-opacity">
                <MoreHorizontal className="w-5 h-5 text-gray-400" />
            </button>
        </div>
    )
}

// ========================================
// PLAYLIST CARD
// ========================================

function PlaylistCard({ playlist }: { playlist: Playlist }) {
    const [isHovered, setIsHovered] = useState(false)

    return (
        <motion.div
            className="p-4 bg-gray-800/40 rounded-lg hover:bg-gray-800/80 transition-colors cursor-pointer group"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            whileHover={{ scale: 1.02 }}
        >
            <div className="relative mb-4">
                <div className="aspect-square rounded-md bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center text-5xl shadow-xl">
                    {playlist.cover}
                </div>
                <AnimatePresence>
                    {isHovered && (
                        <motion.button
                            className="absolute bottom-2 right-2 w-12 h-12 rounded-full bg-green-500 shadow-xl flex items-center justify-center"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                        >
                            <Play className="w-5 h-5 text-black fill-black ml-0.5" />
                        </motion.button>
                    )}
                </AnimatePresence>
            </div>
            <h3 className="font-bold truncate">{playlist.name}</h3>
            <p className="text-sm text-gray-400 truncate">{playlist.creator}</p>
        </motion.div>
    )
}

// ========================================
// PLAYER BAR
// ========================================

function PlayerBar() {
    const [isPlaying, setIsPlaying] = useState(true)
    const [isLiked, setIsLiked] = useState(currentTrack.liked)
    const [progress, setProgress] = useState(30)
    const [volume, setVolume] = useState(70)
    const [shuffle, setShuffle] = useState(false)
    const [repeat, setRepeat] = useState<'off' | 'all' | 'one'>('off')

    const formatTime = (percent: number) => {
        const totalSeconds = Math.floor((currentTrack.durationMs / 1000) * (percent / 100))
        const minutes = Math.floor(totalSeconds / 60)
        const seconds = totalSeconds % 60
        return `${minutes}:${seconds.toString().padStart(2, '0')}`
    }

    return (
        <footer className="h-24 bg-gray-900 border-t border-gray-800 px-4 flex items-center">
            {/* Current track */}
            <div className="flex items-center gap-4 w-72">
                <div className="w-14 h-14 rounded bg-gray-800 flex items-center justify-center text-3xl flex-shrink-0">
                    {currentTrack.cover}
                </div>
                <div className="min-w-0">
                    <p className="font-medium truncate">{currentTrack.title}</p>
                    <p className="text-sm text-gray-400 truncate">{currentTrack.artist}</p>
                </div>
                <button onClick={() => setIsLiked(!isLiked)}>
                    <Heart className={`w-4 h-4 ${isLiked ? 'fill-green-500 text-green-500' : 'text-gray-400'}`} />
                </button>
            </div>

            {/* Controls */}
            <div className="flex-1 flex flex-col items-center gap-2">
                <div className="flex items-center gap-6">
                    <button
                        className={shuffle ? 'text-green-500' : 'text-gray-400 hover:text-white'}
                        onClick={() => setShuffle(!shuffle)}
                    >
                        <Shuffle className="w-4 h-4" />
                    </button>
                    <button className="text-gray-400 hover:text-white">
                        <SkipBack className="w-5 h-5 fill-current" />
                    </button>
                    <button
                        className="w-8 h-8 rounded-full bg-white flex items-center justify-center hover:scale-105 transition-transform"
                        onClick={() => setIsPlaying(!isPlaying)}
                    >
                        {isPlaying ? (
                            <Pause className="w-4 h-4 text-black fill-black" />
                        ) : (
                            <Play className="w-4 h-4 text-black fill-black ml-0.5" />
                        )}
                    </button>
                    <button className="text-gray-400 hover:text-white">
                        <SkipForward className="w-5 h-5 fill-current" />
                    </button>
                    <button
                        className={repeat !== 'off' ? 'text-green-500' : 'text-gray-400 hover:text-white'}
                        onClick={() => setRepeat(repeat === 'off' ? 'all' : repeat === 'all' ? 'one' : 'off')}
                    >
                        {repeat === 'one' ? <Repeat1 className="w-4 h-4" /> : <Repeat className="w-4 h-4" />}
                    </button>
                </div>

                <div className="flex items-center gap-2 w-full max-w-xl">
                    <span className="text-xs text-gray-400 w-10 text-right">{formatTime(progress)}</span>
                    <div className="flex-1 h-1 bg-gray-600 rounded-full group cursor-pointer">
                        <div
                            className="h-full bg-white group-hover:bg-green-500 rounded-full relative"
                            style={{ width: `${progress}%` }}
                        >
                            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full opacity-0 group-hover:opacity-100" />
                        </div>
                    </div>
                    <span className="text-xs text-gray-400 w-10">{currentTrack.duration}</span>
                </div>
            </div>

            {/* Volume & extras */}
            <div className="flex items-center gap-4 w-72 justify-end">
                <button className="text-gray-400 hover:text-white">
                    <ListMusic className="w-4 h-4" />
                </button>
                <button className="text-gray-400 hover:text-white">
                    <MonitorSpeaker className="w-4 h-4" />
                </button>
                <div className="flex items-center gap-2">
                    <button className="text-gray-400 hover:text-white">
                        {volume === 0 ? <VolumeX className="w-4 h-4" /> : volume < 50 ? <Volume1 className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                    </button>
                    <div className="w-24 h-1 bg-gray-600 rounded-full group cursor-pointer">
                        <div
                            className="h-full bg-white group-hover:bg-green-500 rounded-full"
                            style={{ width: `${volume}%` }}
                        />
                    </div>
                </div>
                <button className="text-gray-400 hover:text-white">
                    <Maximize2 className="w-4 h-4" />
                </button>
            </div>
        </footer>
    )
}

// ========================================
// MAIN PAGE
// ========================================

export default function MusicPlayerPage() {
    return (
        <div className="h-screen flex flex-col bg-gradient-to-b from-gray-900 to-black text-white overflow-hidden">
            <div className="flex-1 flex overflow-hidden">
                <Sidebar />

                <main className="flex-1 overflow-y-auto">
                    <Header />

                    <div className="p-6">
                        {/* Welcome section */}
                        <section className="mb-8">
                            <h1 className="text-3xl font-bold mb-6">Good evening</h1>
                            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                                {playlists.slice(0, 6).map((playlist) => (
                                    <button
                                        key={playlist.id}
                                        className="flex items-center gap-4 bg-white/10 rounded overflow-hidden hover:bg-white/20 transition-colors group"
                                    >
                                        <div className="w-16 h-16 bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center text-2xl">
                                            {playlist.cover}
                                        </div>
                                        <span className="font-bold truncate">{playlist.name}</span>
                                        <div className="ml-auto mr-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center shadow-xl">
                                                <Play className="w-5 h-5 text-black fill-black ml-0.5" />
                                            </div>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </section>

                        {/* Featured playlists */}
                        <section className="mb-8">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-2xl font-bold">Made For You</h2>
                                <button className="text-sm text-gray-400 font-semibold hover:underline">Show all</button>
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
                                {featuredPlaylists.map((playlist) => (
                                    <PlaylistCard key={playlist.id} playlist={playlist} />
                                ))}
                            </div>
                        </section>

                        {/* Recently played */}
                        <section className="mb-8">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-2xl font-bold">Recently Played</h2>
                                <button className="text-sm text-gray-400 font-semibold hover:underline">Show all</button>
                            </div>
                            <div className="bg-gray-900/50 rounded-lg">
                                {recentlyPlayed.map((track, index) => (
                                    <TrackRow key={track.id} track={track} index={index + 1} />
                                ))}
                            </div>
                        </section>

                        {/* Footer */}
                        <div className="text-center py-8 text-gray-500 text-sm">
                            Demo by{' '}
                            <Link href="/" className="text-green-500 hover:underline">
                                YourName
                            </Link>
                        </div>
                    </div>
                </main>
            </div>

            <PlayerBar />
        </div>
    )
}
