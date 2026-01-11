'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import dynamic from 'next/dynamic'
import { cn } from '@/lib/utils'

// Dynamic import for 3D skills globe
const SkillsGlobe = dynamic(
    () => import('@/components/3d/skills-globe').then(mod => mod.SkillsGlobe),
    { ssr: false }
)

// ========================================
// SKILLS DATA
// ========================================

interface SkillCategory {
    name: string
    skills: string[]
}

const skillCategories: SkillCategory[] = [
    {
        name: 'Languages',
        skills: ['Python', 'JavaScript', 'TypeScript', 'SQL'],
    },
    {
        name: 'Frameworks',
        skills: ['Discord.py', 'FastAPI', 'React', 'Next.js'],
    },
    {
        name: 'Tools',
        skills: ['Git', 'Docker', 'MongoDB', 'PostgreSQL'],
    },
    {
        name: 'Specialties',
        skills: ['Web Scraping', 'Automation', 'AI/ML', 'API Design'],
    },
]

// ========================================
// SKILL PILL
// ========================================

function SkillPill({ skill, index }: { skill: string; index: number }) {
    return (
        <motion.span
            className="inline-block px-4 py-2 rounded-full bg-white/70 backdrop-blur-lg border border-black/[0.08] text-sm font-medium text-foreground hover:bg-white/90 hover:border-accent-primary/20 transition-all cursor-default"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{
                delay: index * 0.05,
                type: 'spring',
                stiffness: 400,
                damping: 25,
            }}
            whileHover={{ y: -2, scale: 1.05 }}
        >
            {skill}
        </motion.span>
    )
}

// ========================================
// SKILLS SECTION
// ========================================

export function SkillsSection() {
    const sectionRef = useRef<HTMLElement>(null)
    const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

    return (
        <section
            ref={sectionRef}
            className="section relative overflow-hidden"
            aria-label="Skills"
        >
            {/* Background decoration */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <motion.div
                    className="absolute -top-1/4 -right-1/4 w-[600px] h-[600px] rounded-full opacity-20"
                    style={{
                        background: 'radial-gradient(circle, rgba(0,212,170,0.1) 0%, transparent 70%)',
                    }}
                    animate={{
                        scale: [1, 1.1, 1],
                        rotate: [0, 180, 360],
                    }}
                    transition={{
                        duration: 30,
                        repeat: Infinity,
                        ease: 'linear',
                    }}
                />
            </div>

            <div className="container">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                    {/* 3D Globe */}
                    <motion.div
                        className="order-2 lg:order-1 h-[400px] lg:h-[500px]"
                        initial={{ opacity: 0, x: -50 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.6 }}
                    >
                        <SkillsGlobe className="w-full h-full" />
                    </motion.div>

                    {/* Skills list */}
                    <motion.div
                        className="order-1 lg:order-2"
                        initial={{ opacity: 0, x: 50 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        {/* Section header */}
                        <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                            Skills & <span className="gradient-text">Technologies</span>
                        </h2>
                        <p className="text-muted mb-8">
                            I specialize in Python development with a focus on Discord bots, automation,
                            and web scraping. Here&apos;s my tech stack:
                        </p>

                        {/* Skill categories */}
                        <div className="space-y-6">
                            {skillCategories.map((category, catIndex) => (
                                <motion.div
                                    key={category.name}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                                    transition={{ delay: catIndex * 0.1 + 0.3 }}
                                >
                                    <h3 className="text-sm font-semibold text-muted uppercase tracking-wider mb-3">
                                        {category.name}
                                    </h3>
                                    <div className="flex flex-wrap gap-2">
                                        {category.skills.map((skill, skillIndex) => (
                                            <SkillPill
                                                key={skill}
                                                skill={skill}
                                                index={catIndex * 4 + skillIndex}
                                            />
                                        ))}
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Experience highlight */}
                        <motion.div
                            className="mt-8 p-4 rounded-2xl bg-gradient-to-r from-accent-primary/10 to-accent-secondary/10 border border-accent-primary/20"
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: 0.6 }}
                        >
                            <p className="text-sm text-muted">
                                <span className="font-semibold text-foreground">2+ years</span> of hands-on
                                experience building production-ready applications and automation tools.
                            </p>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
