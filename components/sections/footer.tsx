'use client'

import { motion } from 'framer-motion'
import { Github, Twitter, Linkedin, Mail, Heart, Coffee, ArrowUp } from 'lucide-react'
import { IconButton } from '@/components/ui/button'
import { cn } from '@/lib/utils'

// ========================================
// SOCIAL LINKS
// ========================================

const socialLinks = [
    {
        name: 'GitHub',
        icon: Github,
        href: 'https://github.com',
        color: '#333',
    },
    {
        name: 'Twitter',
        icon: Twitter,
        href: 'https://twitter.com',
        color: '#1DA1F2',
    },
    {
        name: 'LinkedIn',
        icon: Linkedin,
        href: 'https://linkedin.com',
        color: '#0A66C2',
    },
    {
        name: 'Email',
        icon: Mail,
        href: 'mailto:hello@example.com',
        color: '#EA4335',
    },
]

// ========================================
// FOOTER
// ========================================

export function Footer() {
    const currentYear = new Date().getFullYear()

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    return (
        <footer className="relative mt-20 py-12 border-t border-black/[0.05]">
            {/* Background gradient */}
            <div
                className="absolute inset-0 pointer-events-none opacity-50"
                style={{
                    background: 'linear-gradient(to top, rgba(0,102,255,0.02) 0%, transparent 100%)',
                }}
            />

            <div className="container relative">
                <div className="flex flex-col items-center">
                    {/* Logo / Name */}
                    <motion.div
                        className="mb-6"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <a
                            href="#"
                            className="text-2xl font-bold gradient-text"
                            onClick={(e) => {
                                e.preventDefault()
                                scrollToTop()
                            }}
                        >
                            YourName
                        </a>
                        <p className="text-sm text-muted text-center mt-1">
                            Discord Bot Developer & Python Enthusiast
                        </p>
                    </motion.div>

                    {/* Social links */}
                    <motion.div
                        className="flex gap-3 mb-8"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                    >
                        {socialLinks.map((social, index) => (
                            <motion.a
                                key={social.name}
                                href={social.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-11 h-11 rounded-full bg-white/70 backdrop-blur-lg border border-black/[0.08] flex items-center justify-center text-foreground hover:text-white transition-all group"
                                style={{
                                    ['--hover-bg' as string]: social.color,
                                }}
                                whileHover={{
                                    y: -4,
                                    backgroundColor: social.color,
                                }}
                                whileTap={{ scale: 0.9 }}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                                aria-label={social.name}
                            >
                                <social.icon className="w-5 h-5 transition-colors group-hover:text-white" />
                            </motion.a>
                        ))}
                    </motion.div>

                    {/* Built with love */}
                    <motion.p
                        className="text-sm text-muted mb-4 flex items-center gap-1"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                    >
                        Built with{' '}
                        <motion.span
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 1, repeat: Infinity }}
                        >
                            <Heart className="w-4 h-4 text-red-500 fill-red-500 inline" />
                        </motion.span>
                        {' '}and way too much{' '}
                        <Coffee className="w-4 h-4 inline text-amber-600" />
                    </motion.p>

                    {/* Copyright */}
                    <motion.p
                        className="text-xs text-muted/70"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                    >
                        © {currentYear} YourName. All rights reserved.
                    </motion.p>

                    {/* Back to top button */}
                    <motion.button
                        onClick={scrollToTop}
                        className="mt-8 group flex items-center gap-2 text-sm text-muted hover:text-accent-primary transition-colors"
                        whileHover={{ y: -2 }}
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 }}
                    >
                        Back to top
                        <motion.span
                            animate={{ y: [0, -3, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                        >
                            <ArrowUp className="w-4 h-4" />
                        </motion.span>
                    </motion.button>
                </div>
            </div>

            {/* Bottom accent line */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-accent-primary/30 to-transparent" />
        </footer>
    )
}
