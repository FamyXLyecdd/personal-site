'use client'

import { useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ExternalLink, Github, ArrowRight } from 'lucide-react'
import { createPortal } from 'react-dom'
import { Button } from '@/components/ui/button'
import { Badge, TechPill } from '@/components/ui/index'
import { modalOverlay, modalContent } from '@/lib/animations'
import { cn } from '@/lib/utils'

// ========================================
// PROJECT MODAL
// ========================================

interface Project {
    id: string
    title: string
    description: string
    longDescription: string
    image: string
    emoji: string
    tags: string[]
    techStack: string[]
    liveUrl?: string
    githubUrl?: string
    features?: string[]
}

interface ProjectModalProps {
    project: Project | null
    isOpen: boolean
    onClose: () => void
}

export function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
    const overlayRef = useRef<HTMLDivElement>(null)

    // Close on escape key
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onClose()
            }
        }

        if (isOpen) {
            document.addEventListener('keydown', handleKeyDown)
            document.body.style.overflow = 'hidden'
        }

        return () => {
            document.removeEventListener('keydown', handleKeyDown)
            document.body.style.overflow = ''
        }
    }, [isOpen, onClose])

    // Close on overlay click
    const handleOverlayClick = (e: React.MouseEvent) => {
        if (e.target === overlayRef.current) {
            onClose()
        }
    }

    if (typeof window === 'undefined') return null

    return createPortal(
        <AnimatePresence>
            {isOpen && project && (
                <motion.div
                    ref={overlayRef}
                    className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
                    variants={modalOverlay}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    onClick={handleOverlayClick}
                >
                    <motion.div
                        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white rounded-3xl shadow-2xl"
                        variants={modalContent}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="modal-title"
                    >
                        {/* Close button */}
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-white/80 backdrop-blur-lg border border-black/[0.08] hover:bg-black/5 transition-colors"
                            aria-label="Close modal"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        {/* Image */}
                        <div className="relative h-64 sm:h-80 bg-gradient-to-br from-accent-primary/20 to-accent-secondary/20 overflow-hidden rounded-t-3xl">
                            <div className="absolute inset-0 flex items-center justify-center">
                                <span className="text-8xl">{project.emoji}</span>
                            </div>

                            {/* Tags */}
                            <div className="absolute bottom-4 left-4 flex gap-2">
                                {project.tags.map((tag) => (
                                    <Badge
                                        key={tag}
                                        variant={tag === 'Featured' ? 'primary' : 'default'}
                                    >
                                        {tag}
                                    </Badge>
                                ))}
                            </div>
                        </div>

                        {/* Content */}
                        <div className="p-6 sm:p-8">
                            <h2 id="modal-title" className="text-2xl sm:text-3xl font-bold mb-4">
                                {project.title}
                            </h2>

                            <p className="text-muted mb-6 leading-relaxed">
                                {project.longDescription}
                            </p>

                            {/* Features */}
                            {project.features && project.features.length > 0 && (
                                <div className="mb-6">
                                    <h3 className="font-semibold mb-3">Features</h3>
                                    <ul className="space-y-2">
                                        {project.features.map((feature, index) => (
                                            <li key={index} className="flex items-start gap-2 text-sm text-muted">
                                                <span className="text-accent-primary mt-0.5">•</span>
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {/* Tech stack */}
                            <div className="mb-8">
                                <h3 className="font-semibold mb-3">Built with</h3>
                                <div className="flex flex-wrap gap-2">
                                    {project.techStack.map((tech) => (
                                        <TechPill key={tech} name={tech} />
                                    ))}
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex flex-col sm:flex-row gap-3">
                                {project.liveUrl && (
                                    <Button
                                        variant="primary"
                                        icon={<ExternalLink className="w-4 h-4" />}
                                        onClick={() => window.open(project.liveUrl, '_blank')}
                                    >
                                        View Live
                                    </Button>
                                )}
                                {project.githubUrl && (
                                    <Button
                                        variant="secondary"
                                        icon={<Github className="w-4 h-4" />}
                                        iconPosition="left"
                                        onClick={() => window.open(project.githubUrl, '_blank')}
                                    >
                                        View Source
                                    </Button>
                                )}
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>,
        document.body
    )
}

// ========================================
// GENERIC MODAL
// ========================================

interface ModalProps {
    isOpen: boolean
    onClose: () => void
    title?: string
    children: React.ReactNode
    className?: string
}

export function Modal({ isOpen, onClose, title, children, className }: ModalProps) {
    const overlayRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onClose()
            }
        }

        if (isOpen) {
            document.addEventListener('keydown', handleKeyDown)
            document.body.style.overflow = 'hidden'
        }

        return () => {
            document.removeEventListener('keydown', handleKeyDown)
            document.body.style.overflow = ''
        }
    }, [isOpen, onClose])

    const handleOverlayClick = (e: React.MouseEvent) => {
        if (e.target === overlayRef.current) {
            onClose()
        }
    }

    if (typeof window === 'undefined') return null

    return createPortal(
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    ref={overlayRef}
                    className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
                    variants={modalOverlay}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    onClick={handleOverlayClick}
                >
                    <motion.div
                        className={cn(
                            'relative w-full max-w-lg bg-white rounded-3xl shadow-2xl p-6',
                            className
                        )}
                        variants={modalContent}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby={title ? 'modal-title' : undefined}
                    >
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full hover:bg-black/5 transition-colors"
                            aria-label="Close modal"
                        >
                            <X className="w-4 h-4" />
                        </button>

                        {title && (
                            <h2 id="modal-title" className="text-xl font-bold mb-4 pr-8">
                                {title}
                            </h2>
                        )}

                        {children}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>,
        document.body
    )
}
