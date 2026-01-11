'use client'

import { useState, useRef } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import {
    ArrowRight,
    ArrowUpRight,
    Mail,
    Instagram,
    Twitter,
    Dribbble,
    Linkedin,
    ChevronDown,
    X,
    Menu,
} from 'lucide-react'

// ========================================
// NAVIGATION
// ========================================

function Navigation() {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <motion.nav
            className="fixed top-0 left-0 right-0 z-50 px-6 py-6"
            initial={{ y: -100 }}
            animate={{ y: 0 }}
        >
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                <Link href="/demos/creative-portfolio" className="text-2xl font-bold">
                    <span className="text-pink-500">✦</span> Studio
                </Link>

                <div className="hidden md:flex items-center gap-8">
                    {['Work', 'About', 'Services', 'Contact'].map((link) => (
                        <a
                            key={link}
                            href={`#${link.toLowerCase()}`}
                            className="text-gray-600 hover:text-black transition-colors relative group"
                        >
                            {link}
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-pink-500 group-hover:w-full transition-all" />
                        </a>
                    ))}
                </div>

                <button className="hidden md:block px-6 py-3 rounded-full bg-black text-white font-medium hover:bg-gray-800 transition-colors">
                    Let&apos;s Talk
                </button>

                <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? <X /> : <Menu />}
                </button>
            </div>
        </motion.nav>
    )
}

// ========================================
// HERO SECTION
// ========================================

function HeroSection() {
    const { scrollY } = useScroll()
    const y = useTransform(scrollY, [0, 500], [0, 100])
    const opacity = useTransform(scrollY, [0, 200], [1, 0])

    return (
        <section className="min-h-screen flex items-center pt-20 relative overflow-hidden">
            {/* Background elements */}
            <motion.div
                className="absolute top-1/4 right-1/4 w-96 h-96 bg-pink-200 rounded-full blur-3xl opacity-50"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 8, repeat: Infinity }}
            />
            <motion.div
                className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-purple-200 rounded-full blur-3xl opacity-50"
                animate={{ scale: [1.2, 1, 1.2] }}
                transition={{ duration: 10, repeat: Infinity }}
            />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <motion.div style={{ y, opacity }}>
                    <motion.p
                        className="text-pink-500 font-medium mb-4"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        Creative Design Studio
                    </motion.p>

                    <motion.h1
                        className="text-6xl sm:text-7xl lg:text-8xl font-bold leading-tight mb-8"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        We craft
                        <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500">
                            digital experiences
                        </span>
                        <br />
                        that inspire.
                    </motion.h1>

                    <motion.p
                        className="text-xl text-gray-600 max-w-xl mb-10"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                    >
                        Award-winning design studio specializing in brand identity,
                        web design, and digital products that make an impact.
                    </motion.p>

                    <motion.div
                        className="flex flex-col sm:flex-row gap-4"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                    >
                        <button className="px-8 py-4 rounded-full bg-black text-white font-semibold hover:bg-gray-800 transition-colors flex items-center gap-2 justify-center">
                            View Our Work <ArrowRight className="w-5 h-5" />
                        </button>
                        <button className="px-8 py-4 rounded-full border-2 border-black font-semibold hover:bg-black hover:text-white transition-colors">
                            Get in Touch
                        </button>
                    </motion.div>
                </motion.div>

                {/* Scroll indicator */}
                <motion.div
                    className="absolute bottom-10 left-1/2 -translate-x-1/2"
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                >
                    <ChevronDown className="w-8 h-8 text-gray-400" />
                </motion.div>
            </div>
        </section>
    )
}

// ========================================
// WORK SECTION
// ========================================

function WorkSection() {
    const projects = [
        {
            id: 1,
            title: 'Luxe Fashion',
            category: 'Brand Identity',
            image: '👗',
            color: 'from-pink-400 to-rose-500',
        },
        {
            id: 2,
            title: 'TechVision App',
            category: 'UI/UX Design',
            image: '📱',
            color: 'from-blue-400 to-indigo-500',
        },
        {
            id: 3,
            title: 'Artisan Coffee',
            category: 'Web Design',
            image: '☕',
            color: 'from-amber-400 to-orange-500',
        },
        {
            id: 4,
            title: 'Wellness Studio',
            category: 'Brand Strategy',
            image: '🧘',
            color: 'from-green-400 to-emerald-500',
        },
    ]

    return (
        <section id="work" className="py-32 bg-gray-50">
            <div className="max-w-7xl mx-auto px-6">
                <motion.div
                    className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-16"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <div>
                        <p className="text-pink-500 font-medium mb-2">Selected Work</p>
                        <h2 className="text-5xl font-bold">Our Portfolio</h2>
                    </div>
                    <button className="mt-4 sm:mt-0 text-lg font-medium flex items-center gap-2 hover:text-pink-500 transition-colors">
                        View All Projects <ArrowRight className="w-5 h-5" />
                    </button>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-8">
                    {projects.map((project, index) => (
                        <motion.div
                            key={project.id}
                            className="group cursor-pointer"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <div className={`relative aspect-[4/3] rounded-3xl overflow-hidden bg-gradient-to-br ${project.color}`}>
                                <div className="absolute inset-0 flex items-center justify-center text-9xl group-hover:scale-110 transition-transform duration-500">
                                    {project.image}
                                </div>
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                                <div className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                    <ArrowUpRight className="w-5 h-5" />
                                </div>
                            </div>
                            <div className="mt-6">
                                <p className="text-gray-500 text-sm mb-1">{project.category}</p>
                                <h3 className="text-2xl font-bold group-hover:text-pink-500 transition-colors">{project.title}</h3>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}

// ========================================
// SERVICES SECTION
// ========================================

function ServicesSection() {
    const services = [
        {
            number: '01',
            title: 'Brand Identity',
            description: 'We create memorable brand identities that resonate with your audience and stand the test of time.',
        },
        {
            number: '02',
            title: 'Web Design',
            description: 'Beautiful, functional websites that provide exceptional user experiences across all devices.',
        },
        {
            number: '03',
            title: 'UI/UX Design',
            description: 'User-centered design that makes your digital products intuitive, engaging, and delightful.',
        },
        {
            number: '04',
            title: 'Motion Design',
            description: 'Dynamic animations and interactions that bring your brand to life and captivate your audience.',
        },
    ]

    return (
        <section id="services" className="py-32">
            <div className="max-w-7xl mx-auto px-6">
                <motion.div
                    className="text-center mb-20"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <p className="text-pink-500 font-medium mb-2">What We Do</p>
                    <h2 className="text-5xl font-bold">Our Services</h2>
                </motion.div>

                <div className="space-y-0">
                    {services.map((service, index) => (
                        <motion.div
                            key={service.number}
                            className="group py-12 border-t border-gray-200 last:border-b cursor-pointer hover:bg-gray-50 transition-colors"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <div className="flex flex-col md:flex-row md:items-center gap-6">
                                <span className="text-pink-500 font-mono text-lg">{service.number}</span>
                                <h3 className="text-3xl font-bold flex-1 group-hover:text-pink-500 transition-colors">
                                    {service.title}
                                </h3>
                                <p className="text-gray-600 max-w-md">{service.description}</p>
                                <ArrowRight className="w-6 h-6 text-gray-400 group-hover:text-pink-500 group-hover:translate-x-2 transition-all" />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}

// ========================================
// ABOUT SECTION
// ========================================

function AboutSection() {
    const stats = [
        { value: '10+', label: 'Years Experience' },
        { value: '200+', label: 'Projects Completed' },
        { value: '50+', label: 'Happy Clients' },
        { value: '15', label: 'Team Members' },
    ]

    return (
        <section id="about" className="py-32 bg-black text-white">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <p className="text-pink-500 font-medium mb-4">About Us</p>
                        <h2 className="text-5xl font-bold mb-8">
                            We are a team of passionate creatives
                        </h2>
                        <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                            Founded in 2015, we&apos;ve grown from a small design studio to a full-service
                            creative agency. Our mission is to help brands tell their stories through
                            exceptional design and strategic thinking.
                        </p>
                        <p className="text-gray-400 text-lg mb-12 leading-relaxed">
                            Every project we take on is an opportunity to push boundaries and create
                            something truly special. We believe in collaboration, innovation, and
                            delivering work that exceeds expectations.
                        </p>
                        <button className="px-8 py-4 rounded-full bg-white text-black font-semibold hover:bg-pink-500 hover:text-white transition-colors">
                            Learn More About Us
                        </button>
                    </motion.div>

                    <motion.div
                        className="grid grid-cols-2 gap-8"
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        {stats.map((stat, index) => (
                            <motion.div
                                key={stat.label}
                                className="text-center p-8 rounded-3xl bg-white/5 border border-white/10"
                                whileHover={{ scale: 1.05 }}
                            >
                                <div className="text-5xl font-bold text-pink-500 mb-2">{stat.value}</div>
                                <div className="text-gray-400">{stat.label}</div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    )
}

// ========================================
// CONTACT CTA
// ========================================

function ContactCTA() {
    return (
        <section id="contact" className="py-32">
            <div className="max-w-4xl mx-auto text-center px-6">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <p className="text-pink-500 font-medium mb-4">Start a Project</p>
                    <h2 className="text-5xl sm:text-6xl font-bold mb-8">
                        Have an idea?
                        <br />
                        Let&apos;s make it happen.
                    </h2>
                    <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
                        We&apos;re always excited to work on new projects. Get in touch and let&apos;s
                        discuss how we can help bring your vision to life.
                    </p>
                    <button className="px-10 py-5 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold text-lg shadow-2xl hover:shadow-pink-500/30 transition-shadow flex items-center gap-3 mx-auto">
                        <Mail className="w-5 h-5" />
                        hello@studio.design
                    </button>
                </motion.div>
            </div>
        </section>
    )
}

// ========================================
// FOOTER
// ========================================

function Footer() {
    const socials = [
        { icon: <Instagram className="w-5 h-5" />, label: 'Instagram' },
        { icon: <Twitter className="w-5 h-5" />, label: 'Twitter' },
        { icon: <Dribbble className="w-5 h-5" />, label: 'Dribbble' },
        { icon: <Linkedin className="w-5 h-5" />, label: 'LinkedIn' },
    ]

    return (
        <footer className="py-12 border-t border-gray-200">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="text-2xl font-bold">
                        <span className="text-pink-500">✦</span> Studio
                    </div>

                    <div className="flex gap-6">
                        {socials.map((social) => (
                            <a
                                key={social.label}
                                href="#"
                                className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-pink-500 hover:text-white transition-colors"
                            >
                                {social.icon}
                            </a>
                        ))}
                    </div>

                    <p className="text-gray-500 text-sm">
                        Demo by{' '}
                        <Link href="/" className="text-pink-500 hover:underline">
                            YourName
                        </Link>
                    </p>
                </div>
            </div>
        </footer>
    )
}

// ========================================
// MAIN PAGE
// ========================================

export default function CreativePortfolioPage() {
    return (
        <div className="min-h-screen bg-white">
            <Navigation />
            <HeroSection />
            <WorkSection />
            <ServicesSection />
            <AboutSection />
            <ContactCTA />
            <Footer />
        </div>
    )
}
