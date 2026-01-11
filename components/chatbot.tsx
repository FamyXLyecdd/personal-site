'use client'

import { useState, useRef, useEffect, KeyboardEvent } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    MessageCircle,
    X,
    Send,
    Minimize2,
    Maximize2,
    Sparkles,
    Bot,
    User,
    Coffee,
    Code,
    Heart,
    Zap,
    Clock,
    MapPin,
} from 'lucide-react'
import { cn } from '@/lib/utils'

// ========================================
// CHATBOT CONFIGURATION
// ========================================

interface ChatMessage {
    id: string
    type: 'user' | 'bot'
    content: string
    timestamp: Date
    typing?: boolean
}

interface QuickReply {
    id: string
    text: string
    icon?: React.ReactNode
}

const BOT_NAME = 'Byte'
const BOT_AVATAR = '🤖'

const quickReplies: QuickReply[] = [
    { id: 'projects', text: 'Show me your projects', icon: <Code className="w-3 h-3" /> },
    { id: 'skills', text: 'What are your skills?', icon: <Zap className="w-3 h-3" /> },
    { id: 'hire', text: 'I want to hire you!', icon: <Heart className="w-3 h-3" /> },
    { id: 'about', text: 'Tell me about yourself', icon: <User className="w-3 h-3" /> },
    { id: 'contact', text: 'How can I contact you?', icon: <MessageCircle className="w-3 h-3" /> },
    { id: 'fun', text: 'Tell me something fun!', icon: <Sparkles className="w-3 h-3" /> },
]

// Bot responses database
const botResponses: Record<string, string[]> = {
    greeting: [
        "Hey there! 👋 I'm Byte, your friendly AI assistant! How can I help you today?",
        "Welcome! ✨ I'm Byte, and I'm here to answer any questions about this portfolio!",
        "Hi! 🎉 Great to see you! I'm Byte - ask me anything!",
    ],
    projects: [
        "I've built some really cool stuff! 🚀\n\n• **Premium Discord Bot** - AI-powered with 100+ servers\n• **Automation Suite** - Web scraping & data processing\n• **Music Bot Pro** - High-quality playback with Spotify\n• **AutoMod System** - ML-based content filtering\n\nWant me to tell you more about any of these?",
        "Here are the highlight projects! 💻\n\nMy most popular one is the **Premium Discord Bot** - it has AI responses, music, moderation, and an economy system. Currently serving 100+ servers!\n\nScroll down to the Projects section to see them all in action!",
    ],
    skills: [
        "I'm pretty skilled in several areas! 💪\n\n**Languages:** Python (95%), JavaScript, TypeScript, SQL\n**Frameworks:** Discord.py, FastAPI, React, Next.js\n**Specialties:** Web Scraping, Automation, AI/ML, APIs\n\n2+ years of hands-on experience building real stuff!",
        "Let me break it down! 🔥\n\n**Main weapon:** Python - I breathe it!\n**Also good at:** JavaScript/TypeScript, React, Next.js\n**Special powers:** Making bots, automating boring stuff, AI integration\n\nCheck out the Skills section for the cool 3D visualization!",
    ],
    hire: [
        "Awesome! I'd love to work with you! 🎉\n\n**Hourly Rate:** $15-25/hr (depends on complexity)\n**Availability:** Open for new projects!\n**Timezone:** GMT+8 (Philippines)\n\nDrop me a message in the Contact section and let's make something amazing together!",
        "That's exciting to hear! 🚀\n\nI'm currently available for freelance work! My rates are pretty reasonable for the quality you'll get.\n\nScroll to the Contact section or email me at **hello@example.com** - I typically respond within 24 hours!",
    ],
    about: [
        "Here's the quick version! 📖\n\n• 16 years old from the Philippines 🇵🇭\n• Self-taught developer since age 14\n• Specializing in Discord bots & Python automation\n• Currently making ₱20k/month from freelancing\n• Coffee addict ☕ (don't judge!)\n\nBasically, I build things that don't suck!",
        "A bit about me! 🌟\n\nI started coding at 14 because I wanted to make cool Discord bots. Two years later, I've built 50+ projects and work with clients worldwide!\n\nI'm obsessed with clean code, smooth animations, and making things that actually work properly.",
    ],
    contact: [
        "Here's how to reach me! 📬\n\n**Email:** hello@example.com\n**Discord:** username#0000\n**GitHub:** github.com/username\n**Twitter:** @username\n\nOr just use the Contact form below - I check it every day!",
        "Let's connect! 🤝\n\nThe fastest way is probably Discord or email. I'm pretty responsive!\n\nScroll down to the Contact section - there's a nice form there that'll send your message straight to my inbox.",
    ],
    fun: [
        "Here's a fun fact! 🎮\n\nTry pressing **↑ ↑ ↓ ↓ ← → ← → B A** on your keyboard... something magical might happen! 😉\n\n(That's the Konami Code, a classic gaming easter egg!)",
        "Did you know? 🤓\n\n• I've written over 100,000 lines of code\n• My longest coding session was 14 hours straight\n• The first program I ever made was a calculator (very original, I know)\n• I name all my projects after anime characters\n\nAlso, there might be a hidden game somewhere on this site... 👀",
    ],
    fallback: [
        "Hmm, I'm not sure about that one! 🤔 Try asking about my projects, skills, or how to hire me!",
        "Interesting question! 💭 I might not have the perfect answer, but feel free to explore the portfolio or reach out through the Contact section!",
        "I'm still learning! 🌱 For now, try the quick reply buttons below or scroll around to explore the portfolio!",
    ],
    thanks: [
        "You're welcome! 😊 Happy to help! Anything else you'd like to know?",
        "No problem at all! ✨ Let me know if there's anything else!",
        "Glad I could help! 🎉 Feel free to ask more questions!",
    ],
    bye: [
        "Goodbye! 👋 Thanks for stopping by! Hope to work with you someday!",
        "See ya! ✨ Don't forget to check out the Contact section if you need anything!",
        "Bye for now! 🚀 Come back anytime - I'm always here!",
    ],
}

// Simple keyword matching for responses
function getBotResponse(message: string): string {
    const lower = message.toLowerCase()

    if (lower.includes('project') || lower.includes('work') || lower.includes('portfolio')) {
        return randomChoice(botResponses.projects)
    }
    if (lower.includes('skill') || lower.includes('tech') || lower.includes('stack') || lower.includes('language')) {
        return randomChoice(botResponses.skills)
    }
    if (lower.includes('hire') || lower.includes('work together') || lower.includes('freelance') || lower.includes('rate') || lower.includes('price')) {
        return randomChoice(botResponses.hire)
    }
    if (lower.includes('about') || lower.includes('who are') || lower.includes('yourself') || lower.includes('tell me about')) {
        return randomChoice(botResponses.about)
    }
    if (lower.includes('contact') || lower.includes('email') || lower.includes('discord') || lower.includes('reach')) {
        return randomChoice(botResponses.contact)
    }
    if (lower.includes('fun') || lower.includes('joke') || lower.includes('secret') || lower.includes('easter')) {
        return randomChoice(botResponses.fun)
    }
    if (lower.includes('thank') || lower.includes('thanks') || lower.includes('appreciate')) {
        return randomChoice(botResponses.thanks)
    }
    if (lower.includes('bye') || lower.includes('goodbye') || lower.includes('see you') || lower.includes('later')) {
        return randomChoice(botResponses.bye)
    }
    if (lower.includes('hi') || lower.includes('hello') || lower.includes('hey') || lower.match(/^(yo|sup|what'?s up)/)) {
        return randomChoice(botResponses.greeting)
    }

    return randomChoice(botResponses.fallback)
}

function randomChoice<T>(arr: T[]): T {
    return arr[Math.floor(Math.random() * arr.length)]
}

function generateId(): string {
    return Math.random().toString(36).substring(2, 9)
}

// ========================================
// CHAT MESSAGE COMPONENT
// ========================================

interface ChatBubbleProps {
    message: ChatMessage
}

function ChatBubble({ message }: ChatBubbleProps) {
    const isBot = message.type === 'bot'

    return (
        <motion.div
            className={cn(
                'flex gap-2 max-w-[85%]',
                isBot ? 'self-start' : 'self-end flex-row-reverse'
            )}
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.2 }}
        >
            {/* Avatar */}
            {isBot && (
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-accent-primary to-accent-secondary flex items-center justify-center text-white text-sm flex-shrink-0">
                    {BOT_AVATAR}
                </div>
            )}

            {/* Message bubble */}
            <div
                className={cn(
                    'px-4 py-2.5 rounded-2xl text-sm leading-relaxed',
                    isBot
                        ? 'bg-white/80 border border-black/[0.08] text-foreground rounded-tl-md'
                        : 'bg-gradient-to-r from-accent-primary to-accent-secondary text-white rounded-tr-md'
                )}
            >
                {message.typing ? (
                    <div className="flex items-center gap-1 py-1">
                        {[0, 1, 2].map((i) => (
                            <motion.div
                                key={i}
                                className="w-2 h-2 rounded-full bg-current opacity-60"
                                animate={{ y: [0, -4, 0] }}
                                transition={{
                                    duration: 0.6,
                                    repeat: Infinity,
                                    delay: i * 0.15,
                                }}
                            />
                        ))}
                    </div>
                ) : (
                    <div
                        className="whitespace-pre-wrap"
                        dangerouslySetInnerHTML={{
                            __html: message.content
                                .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                                .replace(/\n/g, '<br />')
                        }}
                    />
                )}
            </div>
        </motion.div>
    )
}

// ========================================
// QUICK REPLIES
// ========================================

interface QuickRepliesProps {
    replies: QuickReply[]
    onSelect: (text: string) => void
    disabled?: boolean
}

function QuickRepliesSection({ replies, onSelect, disabled }: QuickRepliesProps) {
    return (
        <div className="flex flex-wrap gap-2 mt-3">
            {replies.map((reply) => (
                <motion.button
                    key={reply.id}
                    className={cn(
                        'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium',
                        'bg-white/60 border border-black/[0.08] text-muted',
                        'hover:bg-white/80 hover:text-foreground hover:border-accent-primary/30',
                        'transition-all disabled:opacity-50 disabled:cursor-not-allowed'
                    )}
                    onClick={() => onSelect(reply.text)}
                    disabled={disabled}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                >
                    {reply.icon}
                    {reply.text}
                </motion.button>
            ))}
        </div>
    )
}

// ========================================
// MAIN CHATBOT COMPONENT
// ========================================

interface ChatbotProps {
    className?: string
}

export function Chatbot({ className }: ChatbotProps) {
    const [isOpen, setIsOpen] = useState(false)
    const [isMinimized, setIsMinimized] = useState(false)
    const [messages, setMessages] = useState<ChatMessage[]>([])
    const [input, setInput] = useState('')
    const [isTyping, setIsTyping] = useState(false)
    const [hasInteracted, setHasInteracted] = useState(false)

    const messagesEndRef = useRef<HTMLDivElement>(null)
    const inputRef = useRef<HTMLInputElement>(null)

    // Auto-open after delay if user hasn't interacted
    useEffect(() => {
        const timer = setTimeout(() => {
            if (!hasInteracted) {
                // Show notification badge instead of opening
            }
        }, 10000)
        return () => clearTimeout(timer)
    }, [hasInteracted])

    // Scroll to bottom when new messages
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [messages])

    // Focus input when opened
    useEffect(() => {
        if (isOpen && !isMinimized) {
            inputRef.current?.focus()
        }
    }, [isOpen, isMinimized])

    // Initial greeting
    useEffect(() => {
        if (isOpen && messages.length === 0) {
            const greeting: ChatMessage = {
                id: generateId(),
                type: 'bot',
                content: randomChoice(botResponses.greeting),
                timestamp: new Date(),
            }
            setMessages([greeting])
        }
    }, [isOpen, messages.length])

    const handleOpen = () => {
        setIsOpen(true)
        setIsMinimized(false)
        setHasInteracted(true)
    }

    const handleClose = () => {
        setIsOpen(false)
    }

    const handleMinimize = () => {
        setIsMinimized(!isMinimized)
    }

    const sendMessage = (text: string) => {
        if (!text.trim() || isTyping) return

        // Add user message
        const userMessage: ChatMessage = {
            id: generateId(),
            type: 'user',
            content: text.trim(),
            timestamp: new Date(),
        }
        setMessages((prev) => [...prev, userMessage])
        setInput('')

        // Show typing indicator
        setIsTyping(true)
        const typingMessage: ChatMessage = {
            id: 'typing',
            type: 'bot',
            content: '',
            timestamp: new Date(),
            typing: true,
        }
        setMessages((prev) => [...prev, typingMessage])

        // Simulate response delay
        const delay = 1000 + Math.random() * 1500
        setTimeout(() => {
            setIsTyping(false)
            const response = getBotResponse(text)
            const botMessage: ChatMessage = {
                id: generateId(),
                type: 'bot',
                content: response,
                timestamp: new Date(),
            }
            setMessages((prev) => prev.filter((m) => m.id !== 'typing').concat(botMessage))
        }, delay)
    }

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            sendMessage(input)
        }
    }

    return (
        <>
            {/* Chat button */}
            <AnimatePresence>
                {!isOpen && (
                    <motion.button
                        className={cn(
                            'fixed bottom-6 right-6 z-50',
                            'w-14 h-14 rounded-full',
                            'bg-gradient-to-r from-accent-primary to-accent-secondary',
                            'text-white shadow-lg',
                            'flex items-center justify-center',
                            'hover:shadow-xl hover:scale-105 transition-all',
                            className
                        )}
                        onClick={handleOpen}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        aria-label="Open chat"
                    >
                        <MessageCircle className="w-6 h-6" />

                        {/* Notification pulse */}
                        {!hasInteracted && (
                            <motion.div
                                className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-500"
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                            />
                        )}
                    </motion.button>
                )}
            </AnimatePresence>

            {/* Chat window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className={cn(
                            'fixed bottom-6 right-6 z-50',
                            'w-[360px] bg-white/95 backdrop-blur-xl',
                            'rounded-2xl border border-black/[0.08] shadow-2xl',
                            'flex flex-col overflow-hidden',
                            isMinimized ? 'h-14' : 'h-[500px]'
                        )}
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between px-4 py-3 border-b border-black/[0.05] bg-gradient-to-r from-accent-primary/5 to-accent-secondary/5">
                            <div className="flex items-center gap-3">
                                <div className="relative">
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent-primary to-accent-secondary flex items-center justify-center text-white">
                                        {BOT_AVATAR}
                                    </div>
                                    <div className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-green-500 border-2 border-white" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-sm">{BOT_NAME}</h3>
                                    <p className="text-xs text-green-600">Online</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-1">
                                <button
                                    onClick={handleMinimize}
                                    className="p-2 rounded-lg hover:bg-black/5 transition-colors"
                                    aria-label={isMinimized ? 'Maximize' : 'Minimize'}
                                >
                                    {isMinimized ? (
                                        <Maximize2 className="w-4 h-4 text-muted" />
                                    ) : (
                                        <Minimize2 className="w-4 h-4 text-muted" />
                                    )}
                                </button>
                                <button
                                    onClick={handleClose}
                                    className="p-2 rounded-lg hover:bg-black/5 transition-colors"
                                    aria-label="Close chat"
                                >
                                    <X className="w-4 h-4 text-muted" />
                                </button>
                            </div>
                        </div>

                        {/* Chat content (hidden when minimized) */}
                        {!isMinimized && (
                            <>
                                {/* Messages area */}
                                <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-transparent to-accent-primary/[0.02]">
                                    {messages.map((message) => (
                                        <ChatBubble key={message.id} message={message} />
                                    ))}
                                    <div ref={messagesEndRef} />
                                </div>

                                {/* Quick replies */}
                                {messages.length <= 2 && (
                                    <div className="px-4 pb-2">
                                        <QuickRepliesSection
                                            replies={quickReplies}
                                            onSelect={sendMessage}
                                            disabled={isTyping}
                                        />
                                    </div>
                                )}

                                {/* Input area */}
                                <div className="p-4 border-t border-black/[0.05]">
                                    <div className="flex items-center gap-2 bg-black/[0.03] rounded-xl px-4 py-2">
                                        <input
                                            ref={inputRef}
                                            type="text"
                                            value={input}
                                            onChange={(e) => setInput(e.target.value)}
                                            onKeyDown={handleKeyDown}
                                            placeholder="Type a message..."
                                            className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted/50"
                                            disabled={isTyping}
                                        />
                                        <motion.button
                                            onClick={() => sendMessage(input)}
                                            disabled={!input.trim() || isTyping}
                                            className={cn(
                                                'p-2 rounded-lg transition-colors',
                                                input.trim() && !isTyping
                                                    ? 'text-accent-primary hover:bg-accent-primary/10'
                                                    : 'text-muted/30 cursor-not-allowed'
                                            )}
                                            whileHover={input.trim() ? { scale: 1.05 } : undefined}
                                            whileTap={input.trim() ? { scale: 0.95 } : undefined}
                                        >
                                            <Send className="w-4 h-4" />
                                        </motion.button>
                                    </div>
                                    <p className="text-[10px] text-center text-muted/50 mt-2">
                                        Powered by Byte AI 🤖
                                    </p>
                                </div>
                            </>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}
