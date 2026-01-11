'use client'

import { useState, useEffect, createContext, useContext, ReactNode, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    Twitter,
    Linkedin,
    Facebook,
    Link2,
    Copy,
    Check,
    Share2,
    Mail,
    MessageCircle,
    X,
    QrCode,
} from 'lucide-react'
import { GlassCard } from '@/components/ui/glass-card'
import { Button } from '@/components/ui/button'
import { cn, copyToClipboard } from '@/lib/utils'

// ========================================
// SOCIAL SHARE TYPES
// ========================================

interface ShareData {
    url: string
    title: string
    text?: string
    hashtags?: string[]
    via?: string
}

type SharePlatform = 'twitter' | 'linkedin' | 'facebook' | 'whatsapp' | 'email' | 'copy'

interface ShareConfig {
    platforms?: SharePlatform[]
    showQR?: boolean
    showCopyToast?: boolean
}

// ========================================
// SHARE URLS
// ========================================

function getShareUrl(platform: SharePlatform, data: ShareData): string {
    const encodedUrl = encodeURIComponent(data.url)
    const encodedTitle = encodeURIComponent(data.title)
    const encodedText = encodeURIComponent(data.text || data.title)
    const hashtags = data.hashtags?.join(',') || ''

    switch (platform) {
        case 'twitter':
            return `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedText}${hashtags ? `&hashtags=${hashtags}` : ''}${data.via ? `&via=${data.via}` : ''}`
        case 'linkedin':
            return `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`
        case 'facebook':
            return `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`
        case 'whatsapp':
            return `https://wa.me/?text=${encodedText}%20${encodedUrl}`
        case 'email':
            return `mailto:?subject=${encodedTitle}&body=${encodedText}%20${encodedUrl}`
        default:
            return data.url
    }
}

// ========================================
// PLATFORM CONFIG
// ========================================

const platformConfig: Record<SharePlatform, {
    name: string
    icon: React.ReactNode
    color: string
    hoverColor: string
}> = {
    twitter: {
        name: 'Twitter',
        icon: <Twitter className="w-5 h-5" />,
        color: '#1DA1F2',
        hoverColor: 'hover:bg-[#1DA1F2]',
    },
    linkedin: {
        name: 'LinkedIn',
        icon: <Linkedin className="w-5 h-5" />,
        color: '#0A66C2',
        hoverColor: 'hover:bg-[#0A66C2]',
    },
    facebook: {
        name: 'Facebook',
        icon: <Facebook className="w-5 h-5" />,
        color: '#1877F2',
        hoverColor: 'hover:bg-[#1877F2]',
    },
    whatsapp: {
        name: 'WhatsApp',
        icon: <MessageCircle className="w-5 h-5" />,
        color: '#25D366',
        hoverColor: 'hover:bg-[#25D366]',
    },
    email: {
        name: 'Email',
        icon: <Mail className="w-5 h-5" />,
        color: '#EA4335',
        hoverColor: 'hover:bg-[#EA4335]',
    },
    copy: {
        name: 'Copy Link',
        icon: <Link2 className="w-5 h-5" />,
        color: '#6B7280',
        hoverColor: 'hover:bg-gray-500',
    },
}

// ========================================
// SHARE BUTTON COMPONENT
// ========================================

interface ShareButtonProps {
    platform: SharePlatform
    data: ShareData
    onShare?: () => void
    size?: 'sm' | 'md' | 'lg'
}

export function ShareButton({ platform, data, onShare, size = 'md' }: ShareButtonProps) {
    const [copied, setCopied] = useState(false)
    const config = platformConfig[platform]

    const sizeClasses = {
        sm: 'w-8 h-8',
        md: 'w-10 h-10',
        lg: 'w-12 h-12',
    }

    const handleClick = async () => {
        if (platform === 'copy') {
            await copyToClipboard(data.url)
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
        } else {
            window.open(getShareUrl(platform, data), '_blank', 'width=600,height=400')
        }
        onShare?.()
    }

    return (
        <motion.button
            className={cn(
                'rounded-full flex items-center justify-center transition-all',
                'bg-white/80 backdrop-blur border border-black/[0.08]',
                'text-gray-600 hover:text-white',
                config.hoverColor,
                sizeClasses[size]
            )}
            onClick={handleClick}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            title={config.name}
        >
            {platform === 'copy' && copied ? (
                <Check className="w-4 h-4 text-green-500" />
            ) : (
                config.icon
            )}
        </motion.button>
    )
}

// ========================================
// SHARE BUTTONS GROUP
// ========================================

interface ShareButtonsProps {
    data: ShareData
    platforms?: SharePlatform[]
    size?: 'sm' | 'md' | 'lg'
    className?: string
}

export function ShareButtons({
    data,
    platforms = ['twitter', 'linkedin', 'facebook', 'whatsapp', 'copy'],
    size = 'md',
    className,
}: ShareButtonsProps) {
    return (
        <div className={cn('flex gap-2', className)}>
            {platforms.map((platform) => (
                <ShareButton key={platform} platform={platform} data={data} size={size} />
            ))}
        </div>
    )
}

// ========================================
// SHARE MODAL
// ========================================

interface ShareModalProps {
    isOpen: boolean
    onClose: () => void
    data: ShareData
    config?: ShareConfig
}

export function ShareModal({ isOpen, onClose, data, config = {} }: ShareModalProps) {
    const [copied, setCopied] = useState(false)
    const platforms = config.platforms || ['twitter', 'linkedin', 'facebook', 'whatsapp', 'email', 'copy']

    const handleCopyLink = async () => {
        await copyToClipboard(data.url)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="fixed inset-0 z-50 flex items-center justify-center p-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    {/* Backdrop */}
                    <motion.div
                        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                        onClick={onClose}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        transition={{ type: 'spring', damping: 25, stiffness: 400 }}
                    >
                        <GlassCard className="relative w-full max-w-md">
                            {/* Close button */}
                            <button
                                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/5 hover:bg-black/10 flex items-center justify-center transition-colors"
                                onClick={onClose}
                            >
                                <X className="w-4 h-4" />
                            </button>

                            {/* Content */}
                            <div className="text-center mb-6">
                                <div className="w-12 h-12 mx-auto rounded-full bg-accent-primary/10 flex items-center justify-center mb-4">
                                    <Share2 className="w-6 h-6 text-accent-primary" />
                                </div>
                                <h3 className="text-xl font-bold mb-1">Share this</h3>
                                <p className="text-sm text-muted">{data.title}</p>
                            </div>

                            {/* Share buttons */}
                            <div className="flex justify-center gap-3 mb-6">
                                {platforms.filter((p) => p !== 'copy').map((platform) => (
                                    <ShareButton
                                        key={platform}
                                        platform={platform}
                                        data={data}
                                        size="lg"
                                    />
                                ))}
                            </div>

                            {/* Copy link section */}
                            <div className="flex gap-2">
                                <div className="flex-1 px-4 py-3 rounded-xl bg-black/[0.03] text-sm text-muted truncate">
                                    {data.url}
                                </div>
                                <Button
                                    variant={copied ? 'secondary' : 'primary'}
                                    onClick={handleCopyLink}
                                    icon={copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                                >
                                    {copied ? 'Copied!' : 'Copy'}
                                </Button>
                            </div>

                            {/* QR Code */}
                            {config.showQR && (
                                <div className="mt-6 flex justify-center">
                                    <div className="p-4 bg-white rounded-xl border border-black/[0.05]">
                                        <QrCode className="w-24 h-24 text-gray-900" />
                                        <p className="text-xs text-center text-muted mt-2">Scan to open</p>
                                    </div>
                                </div>
                            )}
                        </GlassCard>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}

// ========================================
// SHARE CONTEXT
// ========================================

interface ShareContextType {
    share: (data: ShareData, config?: ShareConfig) => void
    closeShare: () => void
}

const ShareContext = createContext<ShareContextType | null>(null)

interface ShareProviderProps {
    children: ReactNode
}

export function ShareProvider({ children }: ShareProviderProps) {
    const [isOpen, setIsOpen] = useState(false)
    const [shareData, setShareData] = useState<ShareData | null>(null)
    const [config, setConfig] = useState<ShareConfig>({})

    const share = useCallback((data: ShareData, shareConfig: ShareConfig = {}) => {
        // Try native share first
        if (navigator.share && !shareConfig.platforms) {
            navigator.share({
                title: data.title,
                text: data.text,
                url: data.url,
            }).catch(() => {
                // Fall back to modal on error/cancel
                setShareData(data)
                setConfig(shareConfig)
                setIsOpen(true)
            })
        } else {
            setShareData(data)
            setConfig(shareConfig)
            setIsOpen(true)
        }
    }, [])

    const closeShare = useCallback(() => {
        setIsOpen(false)
    }, [])

    return (
        <ShareContext.Provider value={{ share, closeShare }}>
            {children}
            {shareData && (
                <ShareModal
                    isOpen={isOpen}
                    onClose={closeShare}
                    data={shareData}
                    config={config}
                />
            )}
        </ShareContext.Provider>
    )
}

export function useShare() {
    const context = useContext(ShareContext)
    if (!context) {
        throw new Error('useShare must be used within ShareProvider')
    }
    return context
}

// ========================================
// FLOATING SHARE BUTTON
// ========================================

interface FloatingShareButtonProps {
    data: ShareData
    className?: string
}

export function FloatingShareButton({ data, className }: FloatingShareButtonProps) {
    const [isExpanded, setIsExpanded] = useState(false)
    const platforms: SharePlatform[] = ['twitter', 'linkedin', 'whatsapp', 'copy']

    return (
        <div className={cn('relative', className)}>
            <AnimatePresence>
                {isExpanded && (
                    <motion.div
                        className="absolute bottom-full mb-2 right-0 flex flex-col gap-2"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                    >
                        {platforms.map((platform, index) => (
                            <motion.div
                                key={platform}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 10 }}
                                transition={{ delay: index * 0.05 }}
                            >
                                <ShareButton platform={platform} data={data} />
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.button
                className="w-12 h-12 rounded-full bg-accent-primary text-white shadow-lg flex items-center justify-center"
                onClick={() => setIsExpanded(!isExpanded)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
            >
                <motion.div
                    animate={{ rotate: isExpanded ? 45 : 0 }}
                    transition={{ duration: 0.2 }}
                >
                    <Share2 className="w-5 h-5" />
                </motion.div>
            </motion.button>
        </div>
    )
}
