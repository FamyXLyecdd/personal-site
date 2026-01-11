'use client'

import { useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { MessageSquare, Code, Rocket, Headphones } from 'lucide-react'
import { GlassCard } from '@/components/ui/glass-card'
import { cn } from '@/lib/utils'

// ========================================
// PROCESS STEPS DATA
// ========================================

interface ProcessStep {
    number: string
    title: string
    description: string
    icon: typeof MessageSquare
    color: string
}

const processSteps: ProcessStep[] = [
    {
        number: '01',
        title: 'Consult',
        description: 'We discuss your project requirements, goals, and timeline. I provide a detailed proposal with transparent pricing.',
        icon: MessageSquare,
        color: '#0066FF',
    },
    {
        number: '02',
        title: 'Build',
        description: 'I develop your project with regular updates and demonstrations. You get access to progress and can provide feedback.',
        icon: Code,
        color: '#00D4AA',
    },
    {
        number: '03',
        title: 'Deliver',
        description: 'Final testing, deployment, and handover. Complete documentation and source code provided.',
        icon: Rocket,
        color: '#FF6B6B',
    },
    {
        number: '04',
        title: 'Support',
        description: 'Ongoing support, bug fixes, and updates. I&apos;m here to help your project grow and evolve.',
        icon: Headphones,
        color: '#9B59B6',
    },
]

// ========================================
// PROCESS STEP CARD
// ========================================

interface ProcessStepCardProps {
    step: ProcessStep
    index: number
    isLast: boolean
}

function ProcessStepCard({ step, index, isLast }: ProcessStepCardProps) {
    const cardRef = useRef<HTMLDivElement>(null)
    const isInView = useInView(cardRef, { once: true, margin: '-100px' })

    const Icon = step.icon

    return (
        <div ref={cardRef} className="relative">
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.15 }}
            >
                <GlassCard className="relative z-10" animated={false}>
                    <div className="flex gap-4 sm:gap-6">
                        {/* Number badge */}
                        <div className="flex-shrink-0">
                            <motion.div
                                className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center text-white font-bold text-lg"
                                style={{
                                    background: `linear-gradient(135deg, ${step.color}, ${step.color}CC)`,
                                    boxShadow: `0 8px 24px ${step.color}40`,
                                }}
                                whileHover={{ scale: 1.1, rotate: 5 }}
                                transition={{ type: 'spring', stiffness: 400 }}
                            >
                                {step.number}
                            </motion.div>
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-3 mb-2">
                                <Icon
                                    className="w-5 h-5 flex-shrink-0"
                                    style={{ color: step.color }}
                                />
                                <h3 className="text-xl font-semibold">{step.title}</h3>
                            </div>
                            <p className="text-muted text-sm sm:text-base">
                                {step.description}
                            </p>
                        </div>
                    </div>
                </GlassCard>
            </motion.div>

            {/* Connecting line */}
            {!isLast && (
                <motion.div
                    className="absolute left-6 sm:left-7 top-full w-0.5 h-8 origin-top"
                    style={{ background: `linear-gradient(to bottom, ${step.color}, ${processSteps[index + 1]?.color || step.color})` }}
                    initial={{ scaleY: 0 }}
                    animate={isInView ? { scaleY: 1 } : {}}
                    transition={{ duration: 0.4, delay: index * 0.15 + 0.3 }}
                />
            )}
        </div>
    )
}

// ========================================
// PROCESS/TIMELINE SECTION
// ========================================

export function ProcessTimeline() {
    const sectionRef = useRef<HTMLElement>(null)
    const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

    return (
        <section
            ref={sectionRef}
            className="section relative overflow-hidden"
            aria-label="Work process"
        >
            {/* Background decoration */}
            <div className="absolute inset-0 pointer-events-none">
                <div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-30"
                    style={{
                        background: 'radial-gradient(circle, rgba(0,102,255,0.05) 0%, transparent 70%)',
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
                        How I <span className="gradient-text">Work</span>
                    </h2>
                    <p className="text-muted max-w-xl mx-auto">
                        A simple, transparent process from initial consultation to ongoing support.
                    </p>
                </motion.div>

                {/* Process steps */}
                <div className="max-w-2xl mx-auto space-y-8">
                    {processSteps.map((step, index) => (
                        <ProcessStepCard
                            key={step.number}
                            step={step}
                            index={index}
                            isLast={index === processSteps.length - 1}
                        />
                    ))}
                </div>

                {/* CTA */}
                <motion.div
                    className="text-center mt-12"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.6 }}
                >
                    <p className="text-muted mb-4">Ready to start your project?</p>
                    <motion.a
                        href="#contact"
                        className="btn-primary inline-flex"
                        whileHover={{ scale: 1.02, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        Let&apos;s Talk
                    </motion.a>
                </motion.div>
            </div>
        </section>
    )
}
