'use client'

import { useRef, useState, FormEvent } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { Send, Check, AlertCircle, Sparkles } from 'lucide-react'
import { GlassCard } from '@/components/ui/glass-card'
import { Button } from '@/components/ui/button'
import { Input, Textarea } from '@/components/ui/input'
import { cn } from '@/lib/utils'

// ========================================
// CONFETTI EFFECT
// ========================================

function Confetti() {
    const colors = ['#0066FF', '#00D4AA', '#FF6B6B', '#FFD93D', '#9B59B6']
    const confettiPieces = Array.from({ length: 50 })

    return (
        <div className="fixed inset-0 pointer-events-none z-50">
            {confettiPieces.map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute w-3 h-3 rounded-sm"
                    style={{
                        backgroundColor: colors[i % colors.length],
                        left: `${Math.random() * 100}%`,
                        top: '-20px',
                    }}
                    initial={{ y: 0, rotate: 0, opacity: 1 }}
                    animate={{
                        y: window.innerHeight + 100,
                        rotate: Math.random() * 720,
                        opacity: 0,
                    }}
                    transition={{
                        duration: 2 + Math.random() * 2,
                        delay: Math.random() * 0.5,
                        ease: 'easeIn',
                    }}
                />
            ))}
        </div>
    )
}

// ========================================
// SUCCESS STATE
// ========================================

function SuccessState({ onReset }: { onReset: () => void }) {
    return (
        <motion.div
            className="text-center py-8"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
        >
            <motion.div
                className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-green-400 to-green-500 flex items-center justify-center"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 400 }}
            >
                <Check className="w-10 h-10 text-white" />
            </motion.div>

            <h3 className="text-2xl font-bold mb-2">Message Sent!</h3>
            <p className="text-muted mb-6">
                Thanks for reaching out! I&apos;ll get back to you within 24 hours.
            </p>

            <Button variant="secondary" onClick={onReset}>
                Send Another Message
            </Button>
        </motion.div>
    )
}

// ========================================
// CONTACT FORM
// ========================================

interface FormData {
    name: string
    email: string
    message: string
}

interface FormErrors {
    name?: string
    email?: string
    message?: string
}

export function ContactSection() {
    const sectionRef = useRef<HTMLElement>(null)
    const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

    const [formData, setFormData] = useState<FormData>({
        name: '',
        email: '',
        message: '',
    })
    const [errors, setErrors] = useState<FormErrors>({})
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)
    const [showConfetti, setShowConfetti] = useState(false)

    // Validate email
    const validateEmail = (email: string): boolean => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        return re.test(email)
    }

    // Validate form
    const validateForm = (): boolean => {
        const newErrors: FormErrors = {}

        if (!formData.name.trim()) {
            newErrors.name = 'Name is required'
        }

        if (!formData.email.trim()) {
            newErrors.email = 'Email is required'
        } else if (!validateEmail(formData.email)) {
            newErrors.email = 'Please enter a valid email'
        }

        if (!formData.message.trim()) {
            newErrors.message = 'Message is required'
        } else if (formData.message.length < 10) {
            newErrors.message = 'Message is too short'
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    // Handle submit
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()

        if (!validateForm()) return

        setIsSubmitting(true)

        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1500))

        setIsSubmitting(false)
        setIsSuccess(true)
        setShowConfetti(true)

        // Hide confetti after animation
        setTimeout(() => setShowConfetti(false), 3000)
    }

    // Reset form
    const resetForm = () => {
        setFormData({ name: '', email: '', message: '' })
        setErrors({})
        setIsSuccess(false)
    }

    // Handle input change
    const handleChange = (field: keyof FormData) => (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setFormData((prev) => ({ ...prev, [field]: e.target.value }))
        // Clear error when typing
        if (errors[field]) {
            setErrors((prev) => ({ ...prev, [field]: undefined }))
        }
    }

    return (
        <section
            ref={sectionRef}
            id="contact"
            className="section relative overflow-hidden"
            aria-label="Contact"
        >
            {/* Confetti effect */}
            <AnimatePresence>
                {showConfetti && <Confetti />}
            </AnimatePresence>

            {/* Background decoration */}
            <div className="absolute inset-0 pointer-events-none">
                <div
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[400px] opacity-30"
                    style={{
                        background: 'radial-gradient(ellipse at bottom, rgba(0,102,255,0.1) 0%, transparent 70%)',
                    }}
                />
            </div>

            <div className="container relative">
                {/* Section header */}
                <motion.div
                    className="text-center mb-12"
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                        Let&apos;s <span className="gradient-text">Connect</span>
                    </h2>
                    <p className="text-muted max-w-xl mx-auto">
                        Have a project in mind or just want to chat? Drop me a message and
                        I&apos;ll get back to you as soon as possible.
                    </p>
                </motion.div>

                {/* Contact form */}
                <motion.div
                    className="max-w-xl mx-auto"
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    <GlassCard className="relative overflow-hidden" animated={false}>
                        {/* Decorative gradient */}
                        <div
                            className="absolute top-0 right-0 w-32 h-32 opacity-50 pointer-events-none"
                            style={{
                                background: 'radial-gradient(circle, rgba(0,212,170,0.15) 0%, transparent 70%)',
                            }}
                        />

                        <AnimatePresence mode="wait">
                            {isSuccess ? (
                                <SuccessState key="success" onReset={resetForm} />
                            ) : (
                                <motion.form
                                    key="form"
                                    onSubmit={handleSubmit}
                                    className="space-y-6"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                >
                                    <Input
                                        label="Name"
                                        type="text"
                                        value={formData.name}
                                        onChange={handleChange('name')}
                                        error={errors.name}
                                        success={formData.name.length > 0 && !errors.name}
                                        disabled={isSubmitting}
                                    />

                                    <Input
                                        label="Email"
                                        type="email"
                                        value={formData.email}
                                        onChange={handleChange('email')}
                                        error={errors.email}
                                        success={validateEmail(formData.email)}
                                        disabled={isSubmitting}
                                    />

                                    <Textarea
                                        label="Message"
                                        value={formData.message}
                                        onChange={handleChange('message')}
                                        error={errors.message}
                                        disabled={isSubmitting}
                                        rows={4}
                                    />

                                    <Button
                                        type="submit"
                                        variant="primary"
                                        fullWidth
                                        loading={isSubmitting}
                                        icon={<Send className="w-4 h-4" />}
                                    >
                                        {isSubmitting ? 'Sending...' : 'Send Message'}
                                    </Button>

                                    <p className="text-xs text-center text-muted">
                                        <Sparkles className="w-3 h-3 inline mr-1" />
                                        I typically respond within 24 hours
                                    </p>
                                </motion.form>
                            )}
                        </AnimatePresence>
                    </GlassCard>
                </motion.div>
            </div>
        </section>
    )
}
