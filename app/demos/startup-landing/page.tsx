'use client'

import { useState, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Link from 'next/link'
import {
    ArrowRight,
    Check,
    Sparkles,
    Zap,
    Shield,
    Globe,
    BarChart3,
    Users,
    Rocket,
    Star,
    Play,
    ChevronDown,
    Menu,
    X,
} from 'lucide-react'

// ========================================
// NAVIGATION
// ========================================

function Navigation() {
    const [isScrolled, setIsScrolled] = useState(false)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 50)
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const navLinks = ['Features', 'Pricing', 'Testimonials', 'FAQ']

    return (
        <motion.nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all ${isScrolled ? 'bg-white/90 backdrop-blur-xl shadow-lg' : 'bg-transparent'
                }`}
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                <Link href="/demos/startup-landing" className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                        <Rocket className="w-5 h-5 text-white" />
                    </div>
                    <span className="font-bold text-xl">StartupLaunch</span>
                </Link>

                {/* Desktop menu */}
                <div className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <a key={link} href={`#${link.toLowerCase()}`} className="text-gray-600 hover:text-gray-900 transition-colors">
                            {link}
                        </a>
                    ))}
                </div>

                <div className="hidden md:flex items-center gap-4">
                    <button className="text-gray-600 hover:text-gray-900">Log in</button>
                    <button className="px-5 py-2.5 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-medium hover:shadow-lg transition-shadow">
                        Start Free Trial
                    </button>
                </div>

                {/* Mobile menu button */}
                <button
                    className="md:hidden p-2"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? <X /> : <Menu />}
                </button>
            </div>

            {/* Mobile menu */}
            {isMobileMenuOpen && (
                <motion.div
                    className="md:hidden bg-white border-t p-6"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                >
                    {navLinks.map((link) => (
                        <a key={link} href={`#${link.toLowerCase()}`} className="block py-3 text-gray-600">
                            {link}
                        </a>
                    ))}
                    <button className="w-full mt-4 px-5 py-3 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-medium">
                        Start Free Trial
                    </button>
                </motion.div>
            )}
        </motion.nav>
    )
}

// ========================================
// HERO SECTION
// ========================================

function HeroSection() {
    const { scrollY } = useScroll()
    const y = useTransform(scrollY, [0, 500], [0, 150])
    const opacity = useTransform(scrollY, [0, 300], [1, 0])

    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-indigo-950 to-purple-950 text-white">
            {/* Animated background */}
            <div className="absolute inset-0">
                <motion.div
                    className="absolute top-20 left-10 w-72 h-72 bg-indigo-500/20 rounded-full blur-3xl"
                    animate={{ x: [0, 50, 0], y: [0, 30, 0] }}
                    transition={{ duration: 10, repeat: Infinity }}
                />
                <motion.div
                    className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"
                    animate={{ x: [0, -30, 0], y: [0, -50, 0] }}
                    transition={{ duration: 12, repeat: Infinity }}
                />
            </div>

            <motion.div
                className="relative z-10 text-center px-6 max-w-5xl mx-auto"
                style={{ y, opacity }}
            >
                <motion.div
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur border border-white/20 mb-8"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <Sparkles className="w-4 h-4 text-yellow-400" />
                    <span className="text-sm">Now with AI-powered analytics</span>
                </motion.div>

                <motion.h1
                    className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                >
                    Launch Your Startup
                    <br />
                    <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                        10x Faster
                    </span>
                </motion.h1>

                <motion.p
                    className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                >
                    The all-in-one platform that helps startups build, launch, and scale.
                    Join 10,000+ companies already growing with us.
                </motion.p>

                <motion.div
                    className="flex flex-col sm:flex-row items-center justify-center gap-4"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                >
                    <button className="px-8 py-4 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold text-lg shadow-2xl shadow-indigo-500/30 hover:shadow-indigo-500/50 transition-shadow flex items-center gap-2">
                        Start Free Trial <ArrowRight className="w-5 h-5" />
                    </button>
                    <button className="px-8 py-4 rounded-full bg-white/10 backdrop-blur border border-white/20 font-semibold text-lg hover:bg-white/20 transition-colors flex items-center gap-2">
                        <Play className="w-5 h-5" /> Watch Demo
                    </button>
                </motion.div>

                {/* Stats */}
                <motion.div
                    className="grid grid-cols-3 gap-8 mt-20 pt-10 border-t border-white/10"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                >
                    {[
                        { value: '10K+', label: 'Active Users' },
                        { value: '$50M+', label: 'Revenue Generated' },
                        { value: '99.9%', label: 'Uptime SLA' },
                    ].map((stat) => (
                        <div key={stat.label} className="text-center">
                            <div className="text-4xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                                {stat.value}
                            </div>
                            <div className="text-gray-400 text-sm mt-1">{stat.label}</div>
                        </div>
                    ))}
                </motion.div>
            </motion.div>

            {/* Scroll indicator */}
            <motion.div
                className="absolute bottom-10 left-1/2 -translate-x-1/2"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
            >
                <ChevronDown className="w-8 h-8 text-white/50" />
            </motion.div>
        </section>
    )
}

// ========================================
// FEATURES SECTION
// ========================================

function FeaturesSection() {
    const features = [
        {
            icon: <Zap className="w-6 h-6" />,
            title: 'Lightning Fast',
            description: 'Deploy in minutes, not days. Our platform handles all the complexity.',
            color: 'from-yellow-400 to-orange-500',
        },
        {
            icon: <Shield className="w-6 h-6" />,
            title: 'Enterprise Security',
            description: 'Bank-level encryption and compliance with SOC2, GDPR, and HIPAA.',
            color: 'from-green-400 to-emerald-500',
        },
        {
            icon: <BarChart3 className="w-6 h-6" />,
            title: 'Advanced Analytics',
            description: 'Real-time insights and AI-powered recommendations to grow faster.',
            color: 'from-blue-400 to-cyan-500',
        },
        {
            icon: <Globe className="w-6 h-6" />,
            title: 'Global Scale',
            description: 'CDN edge network with 200+ locations for blazing-fast performance.',
            color: 'from-purple-400 to-pink-500',
        },
        {
            icon: <Users className="w-6 h-6" />,
            title: 'Team Collaboration',
            description: 'Built-in tools for seamless collaboration across your entire team.',
            color: 'from-indigo-400 to-violet-500',
        },
        {
            icon: <Rocket className="w-6 h-6" />,
            title: 'Auto Scaling',
            description: 'Handle any traffic spike automatically. Pay only for what you use.',
            color: 'from-red-400 to-rose-500',
        },
    ]

    return (
        <section id="features" className="py-32 bg-white">
            <div className="max-w-7xl mx-auto px-6">
                <motion.div
                    className="text-center mb-20"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <span className="text-indigo-600 font-semibold text-sm uppercase tracking-wider">Features</span>
                    <h2 className="text-4xl sm:text-5xl font-bold mt-4 mb-6">
                        Everything you need to
                        <br />
                        <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                            succeed online
                        </span>
                    </h2>
                    <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                        A complete toolkit designed for modern startups. Build better, launch faster, scale easier.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <motion.div
                            key={feature.title}
                            className="group p-8 rounded-3xl bg-gray-50 hover:bg-white hover:shadow-2xl transition-all cursor-pointer border border-transparent hover:border-gray-100"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ y: -5 }}
                        >
                            <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform`}>
                                {feature.icon}
                            </div>
                            <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                            <p className="text-gray-600">{feature.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}

// ========================================
// PRICING SECTION
// ========================================

function PricingSection() {
    const [isAnnual, setIsAnnual] = useState(true)

    const plans = [
        {
            name: 'Starter',
            description: 'Perfect for small teams getting started',
            price: isAnnual ? 29 : 39,
            features: ['Up to 5 team members', '10GB storage', 'Basic analytics', 'Email support'],
            cta: 'Start Free Trial',
            popular: false,
        },
        {
            name: 'Pro',
            description: 'For growing startups that need more',
            price: isAnnual ? 79 : 99,
            features: ['Up to 20 team members', '100GB storage', 'Advanced analytics', 'Priority support', 'API access', 'Custom integrations'],
            cta: 'Start Free Trial',
            popular: true,
        },
        {
            name: 'Enterprise',
            description: 'For large organizations with custom needs',
            price: null,
            features: ['Unlimited team members', 'Unlimited storage', 'Custom analytics', 'Dedicated support', 'SLA guarantee', 'On-premise option'],
            cta: 'Contact Sales',
            popular: false,
        },
    ]

    return (
        <section id="pricing" className="py-32 bg-gradient-to-b from-gray-50 to-white">
            <div className="max-w-7xl mx-auto px-6">
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <span className="text-indigo-600 font-semibold text-sm uppercase tracking-wider">Pricing</span>
                    <h2 className="text-4xl sm:text-5xl font-bold mt-4 mb-6">
                        Simple, transparent pricing
                    </h2>
                    <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-10">
                        No hidden fees. No surprises. Choose the plan that works for you.
                    </p>

                    {/* Toggle */}
                    <div className="inline-flex items-center gap-4 bg-gray-100 rounded-full p-1">
                        <button
                            className={`px-6 py-2 rounded-full transition-all ${!isAnnual ? 'bg-white shadow' : ''
                                }`}
                            onClick={() => setIsAnnual(false)}
                        >
                            Monthly
                        </button>
                        <button
                            className={`px-6 py-2 rounded-full transition-all ${isAnnual ? 'bg-white shadow' : ''
                                }`}
                            onClick={() => setIsAnnual(true)}
                        >
                            Annual <span className="text-green-600 text-sm">Save 25%</span>
                        </button>
                    </div>
                </motion.div>

                <div className="grid md:grid-cols-3 gap-8">
                    {plans.map((plan, index) => (
                        <motion.div
                            key={plan.name}
                            className={`relative rounded-3xl p-8 ${plan.popular
                                    ? 'bg-gradient-to-br from-indigo-600 to-purple-600 text-white shadow-2xl shadow-indigo-500/30 scale-105'
                                    : 'bg-white border border-gray-200'
                                }`}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                        >
                            {plan.popular && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-sm font-semibold rounded-full">
                                    Most Popular
                                </div>
                            )}

                            <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                            <p className={`text-sm mb-6 ${plan.popular ? 'text-indigo-200' : 'text-gray-600'}`}>
                                {plan.description}
                            </p>

                            <div className="mb-8">
                                {plan.price ? (
                                    <>
                                        <span className="text-5xl font-bold">${plan.price}</span>
                                        <span className={plan.popular ? 'text-indigo-200' : 'text-gray-600'}>/month</span>
                                    </>
                                ) : (
                                    <span className="text-3xl font-bold">Custom</span>
                                )}
                            </div>

                            <ul className="space-y-4 mb-8">
                                {plan.features.map((feature) => (
                                    <li key={feature} className="flex items-center gap-3">
                                        <Check className={`w-5 h-5 ${plan.popular ? 'text-indigo-300' : 'text-green-500'}`} />
                                        <span className={plan.popular ? 'text-indigo-100' : 'text-gray-700'}>{feature}</span>
                                    </li>
                                ))}
                            </ul>

                            <button
                                className={`w-full py-4 rounded-xl font-semibold transition-all ${plan.popular
                                        ? 'bg-white text-indigo-600 hover:bg-indigo-50'
                                        : 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:shadow-lg'
                                    }`}
                            >
                                {plan.cta}
                            </button>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}

// ========================================
// TESTIMONIALS SECTION
// ========================================

function TestimonialsSection() {
    const testimonials = [
        {
            quote: "StartupLaunch transformed how we build products. We shipped 3x faster after switching.",
            author: "Sarah Chen",
            role: "CTO at TechFlow",
            avatar: "👩‍💻",
            rating: 5,
        },
        {
            quote: "The best investment we made this year. Our team productivity went through the roof.",
            author: "Mike Johnson",
            role: "Founder at GrowthLabs",
            avatar: "👨‍💼",
            rating: 5,
        },
        {
            quote: "Finally, a platform that actually delivers on its promises. Highly recommend!",
            author: "Emily Davis",
            role: "VP Engineering at ScaleUp",
            avatar: "👩‍🔬",
            rating: 5,
        },
    ]

    return (
        <section id="testimonials" className="py-32 bg-indigo-950 text-white">
            <div className="max-w-7xl mx-auto px-6">
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <span className="text-indigo-400 font-semibold text-sm uppercase tracking-wider">Testimonials</span>
                    <h2 className="text-4xl sm:text-5xl font-bold mt-4">
                        Loved by startups worldwide
                    </h2>
                </motion.div>

                <div className="grid md:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, index) => (
                        <motion.div
                            key={testimonial.author}
                            className="p-8 rounded-3xl bg-white/5 backdrop-blur border border-white/10"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <div className="flex gap-1 mb-6">
                                {[...Array(testimonial.rating)].map((_, i) => (
                                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                                ))}
                            </div>
                            <p className="text-lg text-indigo-100 mb-8">&ldquo;{testimonial.quote}&rdquo;</p>
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-2xl">
                                    {testimonial.avatar}
                                </div>
                                <div>
                                    <div className="font-semibold">{testimonial.author}</div>
                                    <div className="text-sm text-indigo-300">{testimonial.role}</div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}

// ========================================
// CTA SECTION
// ========================================

function CTASection() {
    return (
        <section className="py-32 bg-gradient-to-r from-indigo-600 to-purple-600">
            <motion.div
                className="max-w-4xl mx-auto text-center px-6"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
            >
                <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
                    Ready to launch your startup?
                </h2>
                <p className="text-xl text-indigo-100 mb-10">
                    Join 10,000+ companies already growing with StartupLaunch. Start your free trial today.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <button className="px-8 py-4 rounded-full bg-white text-indigo-600 font-semibold text-lg shadow-2xl hover:shadow-3xl transition-shadow flex items-center gap-2">
                        Start Free Trial <ArrowRight className="w-5 h-5" />
                    </button>
                    <button className="px-8 py-4 rounded-full border-2 border-white/30 text-white font-semibold text-lg hover:bg-white/10 transition-colors">
                        Schedule Demo
                    </button>
                </div>
            </motion.div>
        </section>
    )
}

// ========================================
// FOOTER
// ========================================

function Footer() {
    const links = {
        Product: ['Features', 'Pricing', 'Integrations', 'Changelog'],
        Company: ['About', 'Blog', 'Careers', 'Press'],
        Resources: ['Documentation', 'Help Center', 'Community', 'API'],
        Legal: ['Privacy', 'Terms', 'Security', 'Cookies'],
    }

    return (
        <footer className="bg-slate-900 text-white py-20">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
                    <div className="lg:col-span-1">
                        <div className="flex items-center gap-2 mb-6">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                                <Rocket className="w-5 h-5 text-white" />
                            </div>
                            <span className="font-bold text-xl">StartupLaunch</span>
                        </div>
                        <p className="text-gray-400 text-sm">
                            The all-in-one platform for modern startups. Build, launch, and scale with confidence.
                        </p>
                    </div>

                    {Object.entries(links).map(([category, items]) => (
                        <div key={category}>
                            <h4 className="font-semibold mb-4">{category}</h4>
                            <ul className="space-y-3">
                                {items.map((item) => (
                                    <li key={item}>
                                        <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                                            {item}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-gray-400 text-sm">
                        © 2025 StartupLaunch. All rights reserved.
                    </p>
                    <p className="text-gray-500 text-sm">
                        Demo site created by{' '}
                        <Link href="/" className="text-indigo-400 hover:underline">
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

export default function StartupLandingPage() {
    return (
        <div className="min-h-screen">
            <Navigation />
            <HeroSection />
            <FeaturesSection />
            <PricingSection />
            <TestimonialsSection />
            <CTASection />
            <Footer />
        </div>
    )
}
