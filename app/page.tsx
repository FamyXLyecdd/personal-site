'use client'

import { Suspense } from 'react'
import { motion } from 'framer-motion'

// Section imports
import { HeroSection } from '@/components/sections/hero'
import { BentoGridSection } from '@/components/sections/bento-grid'
import { ProjectsShowcase } from '@/components/sections/projects-showcase'
import { SkillsSection } from '@/components/sections/skills-section'
import { ProcessTimeline } from '@/components/sections/process-timeline'
import { ContactSection } from '@/components/sections/contact'
import { Footer } from '@/components/sections/footer'
import { DemoSitesSection } from '@/components/sections/demo-sites'

// Engagement features
import { Navbar } from '@/components/navbar'
import { Chatbot } from '@/components/chatbot'
import { MascotPet } from '@/components/mascot-pet'
import { LiveVisitorCounter } from '@/components/visitor-counter'
import { SnakeGameTrigger, TypingTestTrigger, MemoryGameTrigger } from '@/components/games'
import { TestimonialsCarousel } from '@/components/testimonials'
import { GlassCard } from '@/components/ui/glass-card'

// ========================================
// LOADING SKELETON
// ========================================

function SectionSkeleton() {
    return (
        <div className="section">
            <div className="container">
                <div className="h-96 rounded-3xl skeleton" />
            </div>
        </div>
    )
}

// ========================================
// PAGE TRANSITION WRAPPER
// ========================================

function PageWrapper({ children }: { children: React.ReactNode }) {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            {children}
        </motion.div>
    )
}

// ========================================
// TESTIMONIALS SECTION
// ========================================

function TestimonialsSection() {
    return (
        <section className="section bg-gradient-to-b from-transparent to-accent-primary/5">
            <div className="container">
                <motion.div
                    className="text-center mb-12"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                        Client <span className="gradient-text">Testimonials</span>
                    </h2>
                    <p className="text-muted max-w-2xl mx-auto">
                        What my clients say about working with me.
                    </p>
                </motion.div>
                <TestimonialsCarousel />
            </div>
        </section>
    )
}

// ========================================
// MAIN PAGE
// ========================================

export default function Home() {
    return (
        <PageWrapper>
            {/* Navigation */}
            <Navbar />

            {/* Hero Section - Full viewport with 3D ball */}
            <HeroSection />

            {/* Bento Grid - About & highlights */}
            <Suspense fallback={<SectionSkeleton />}>
                <BentoGridSection />
            </Suspense>

            {/* Demo Sites Showcase - NEW */}
            <Suspense fallback={<SectionSkeleton />}>
                <DemoSitesSection />
            </Suspense>

            {/* Projects Showcase - Horizontal scroll */}
            <Suspense fallback={<SectionSkeleton />}>
                <ProjectsShowcase />
            </Suspense>

            {/* Skills Section - 3D Globe */}
            <Suspense fallback={<SectionSkeleton />}>
                <SkillsSection />
            </Suspense>

            {/* Testimonials - NEW */}
            <Suspense fallback={<SectionSkeleton />}>
                <TestimonialsSection />
            </Suspense>

            {/* Process Timeline - Work process */}
            <Suspense fallback={<SectionSkeleton />}>
                <ProcessTimeline />
            </Suspense>

            {/* Contact Section - Form */}
            <Suspense fallback={<SectionSkeleton />}>
                <ContactSection />
            </Suspense>

            {/* Footer */}
            <Footer />

            {/* Floating Engagement Features */}
            <Chatbot />
            <MascotPet />
            <LiveVisitorCounter />

            {/* Game triggers */}
            <SnakeGameTrigger />
            <TypingTestTrigger />
            <MemoryGameTrigger />
        </PageWrapper>
    )
}
