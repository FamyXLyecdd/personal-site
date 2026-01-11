'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import {
    Menu,
    X,
    MapPin,
    Phone,
    Mail,
    Clock,
    Star,
    ChevronRight,
    Instagram,
    Facebook,
    Twitter,
    ArrowRight,
    Utensils,
    Wine,
    Cake,
    Coffee,
} from 'lucide-react'

// ========================================
// TYPES
// ========================================

interface MenuItem {
    id: number
    name: string
    description: string
    price: number
    category: string
    image: string
    popular?: boolean
    spicy?: boolean
    vegetarian?: boolean
}

// ========================================
// SAMPLE DATA
// ========================================

const menuItems: MenuItem[] = [
    { id: 1, name: 'Truffle Risotto', description: 'Creamy arborio rice with black truffle and parmesan', price: 28, category: 'Mains', image: '🍚', popular: true },
    { id: 2, name: 'Wagyu Steak', description: 'A5 Japanese wagyu with seasonal vegetables', price: 65, category: 'Mains', image: '🥩', popular: true },
    { id: 3, name: 'Lobster Bisque', description: 'Rich creamy soup with fresh lobster and herbs', price: 18, category: 'Starters', image: '🦞' },
    { id: 4, name: 'Caesar Salad', description: 'Romaine lettuce, parmesan, croutons, and our house dressing', price: 14, category: 'Starters', image: '🥗', vegetarian: true },
    { id: 5, name: 'Grilled Salmon', description: 'Atlantic salmon with lemon butter sauce', price: 32, category: 'Mains', image: '🐟' },
    { id: 6, name: 'Spicy Tuna Tartare', description: 'Fresh tuna with avocado and wasabi', price: 22, category: 'Starters', image: '🍣', spicy: true },
    { id: 7, name: 'Tiramisu', description: 'Classic Italian dessert with mascarpone and espresso', price: 12, category: 'Desserts', image: '🍰', popular: true },
    { id: 8, name: 'Crème Brûlée', description: 'Vanilla custard with caramelized sugar', price: 11, category: 'Desserts', image: '🍮' },
    { id: 9, name: 'Vintage Wine', description: 'Selection of premium wines from our cellar', price: 45, category: 'Drinks', image: '🍷' },
    { id: 10, name: 'Artisan Cocktails', description: 'Handcrafted cocktails by our mixologist', price: 16, category: 'Drinks', image: '🍸' },
]

const categories = ['All', 'Starters', 'Mains', 'Desserts', 'Drinks']

const reviews = [
    { name: 'Michael S.', rating: 5, text: 'Exceptional dining experience. The wagyu was cooked to perfection!', date: '2 days ago' },
    { name: 'Jennifer L.', rating: 5, text: 'Beautiful ambiance and outstanding service. Will definitely return.', date: '1 week ago' },
    { name: 'Robert K.', rating: 5, text: 'The truffle risotto is the best I\'ve ever had. Highly recommend!', date: '2 weeks ago' },
]

// ========================================
// NAVIGATION
// ========================================

function Navigation() {
    const [isOpen, setIsOpen] = useState(false)
    const [isScrolled, setIsScrolled] = useState(false)

    if (typeof window !== 'undefined') {
        window.addEventListener('scroll', () => setIsScrolled(window.scrollY > 50))
    }

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all ${isScrolled ? 'bg-black/90 backdrop-blur' : ''}`}>
            <div className="max-w-7xl mx-auto px-6 py-4">
                <div className="flex items-center justify-between">
                    <Link href="/demos/restaurant" className="text-2xl font-serif text-white">
                        Gourmet<span className="text-amber-400">Bite</span>
                    </Link>

                    <div className="hidden md:flex items-center gap-8">
                        {['Home', 'Menu', 'Reservations', 'About', 'Contact'].map((link) => (
                            <a
                                key={link}
                                href={`#${link.toLowerCase()}`}
                                className="text-white/80 hover:text-amber-400 transition-colors"
                            >
                                {link}
                            </a>
                        ))}
                    </div>

                    <button className="hidden md:block px-6 py-2.5 border border-amber-400 text-amber-400 rounded-full hover:bg-amber-400 hover:text-black transition-colors text-sm font-medium">
                        Book a Table
                    </button>

                    <button className="md:hidden text-white p-2" onClick={() => setIsOpen(!isOpen)}>
                        {isOpen ? <X /> : <Menu />}
                    </button>
                </div>
            </div>
        </nav>
    )
}

// ========================================
// HERO SECTION
// ========================================

function HeroSection() {
    return (
        <section className="relative min-h-screen flex items-center justify-center bg-black text-white overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black z-10" />
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1920')] bg-cover bg-center opacity-60" />

            <div className="relative z-20 text-center px-6 max-w-4xl">
                <motion.p
                    className="text-amber-400 font-medium tracking-widest uppercase mb-4"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    Welcome to Gourmet Bite
                </motion.p>
                <motion.h1
                    className="text-5xl sm:text-7xl font-serif font-bold mb-6"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                >
                    Experience Fine Dining at Its Best
                </motion.h1>
                <motion.p
                    className="text-xl text-white/70 mb-10 max-w-2xl mx-auto"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                >
                    Indulge in an exquisite culinary journey where every dish tells a story of passion, tradition, and innovation.
                </motion.p>
                <motion.div
                    className="flex flex-col sm:flex-row gap-4 justify-center"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                >
                    <button className="px-8 py-4 bg-amber-400 text-black font-semibold rounded-full hover:bg-amber-300 transition-colors">
                        Reserve a Table
                    </button>
                    <button className="px-8 py-4 border border-white/30 rounded-full hover:bg-white/10 transition-colors">
                        View Menu
                    </button>
                </motion.div>
            </div>

            {/* Scroll indicator */}
            <motion.div
                className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
            >
                <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
                    <div className="w-1 h-2 bg-amber-400 rounded-full" />
                </div>
            </motion.div>
        </section>
    )
}

// ========================================
// FEATURES
// ========================================

function FeaturesSection() {
    const features = [
        { icon: <Utensils className="w-6 h-6" />, title: 'Fine Cuisine', description: 'Crafted by award-winning chefs' },
        { icon: <Wine className="w-6 h-6" />, title: 'Premium Wines', description: 'Curated selection from around the world' },
        { icon: <Clock className="w-6 h-6" />, title: 'Perfect Timing', description: 'Every dish served at its best' },
    ]

    return (
        <section className="py-20 bg-neutral-900 text-white">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid md:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <motion.div
                            key={feature.title}
                            className="text-center"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <div className="w-16 h-16 mx-auto rounded-full bg-amber-400/10 text-amber-400 flex items-center justify-center mb-4">
                                {feature.icon}
                            </div>
                            <h3 className="text-xl font-serif mb-2">{feature.title}</h3>
                            <p className="text-white/60">{feature.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}

// ========================================
// MENU SECTION
// ========================================

function MenuSection() {
    const [selectedCategory, setSelectedCategory] = useState('All')

    const filteredItems = selectedCategory === 'All'
        ? menuItems
        : menuItems.filter((item) => item.category === selectedCategory)

    return (
        <section id="menu" className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-6">
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <p className="text-amber-600 font-medium tracking-widest uppercase mb-2">Our Menu</p>
                    <h2 className="text-4xl sm:text-5xl font-serif font-bold">Culinary Excellence</h2>
                </motion.div>

                {/* Categories */}
                <div className="flex justify-center gap-4 mb-12 overflow-x-auto">
                    {categories.map((category) => (
                        <button
                            key={category}
                            className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all ${selectedCategory === category
                                    ? 'bg-black text-white'
                                    : 'bg-gray-100 hover:bg-gray-200'
                                }`}
                            onClick={() => setSelectedCategory(category)}
                        >
                            {category}
                        </button>
                    ))}
                </div>

                {/* Menu grid */}
                <motion.div className="grid md:grid-cols-2 gap-6" layout>
                    <AnimatePresence mode="popLayout">
                        {filteredItems.map((item) => (
                            <motion.div
                                key={item.id}
                                className="flex gap-6 p-6 rounded-2xl bg-gray-50 hover:bg-amber-50 transition-colors group"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                layout
                            >
                                <div className="w-20 h-20 rounded-xl bg-amber-100 flex items-center justify-center text-4xl flex-shrink-0">
                                    {item.image}
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-start justify-between mb-2">
                                        <div>
                                            <h3 className="font-bold text-lg group-hover:text-amber-600 transition-colors">
                                                {item.name}
                                                {item.popular && (
                                                    <span className="ml-2 px-2 py-0.5 bg-amber-400 text-black text-xs rounded-full">Popular</span>
                                                )}
                                            </h3>
                                            <div className="flex gap-2 mt-1">
                                                {item.spicy && <span className="text-red-500 text-xs">🌶️ Spicy</span>}
                                                {item.vegetarian && <span className="text-green-600 text-xs">🌱 Vegetarian</span>}
                                            </div>
                                        </div>
                                        <span className="font-bold text-xl text-amber-600">${item.price}</span>
                                    </div>
                                    <p className="text-gray-600 text-sm">{item.description}</p>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>
            </div>
        </section>
    )
}

// ========================================
// RESERVATION SECTION
// ========================================

function ReservationSection() {
    return (
        <section id="reservations" className="py-24 bg-neutral-900 text-white">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <p className="text-amber-400 font-medium tracking-widest uppercase mb-2">Reservations</p>
                        <h2 className="text-4xl sm:text-5xl font-serif font-bold mb-6">Book Your Table</h2>
                        <p className="text-white/60 text-lg mb-8">
                            Reserve your spot for an unforgettable dining experience.
                            We recommend booking at least 24 hours in advance for weekend reservations.
                        </p>
                        <div className="space-y-4">
                            <div className="flex items-center gap-4">
                                <Clock className="w-5 h-5 text-amber-400" />
                                <span>Tue - Sun: 5:00 PM - 11:00 PM</span>
                            </div>
                            <div className="flex items-center gap-4">
                                <Phone className="w-5 h-5 text-amber-400" />
                                <span>+1 (555) 123-4567</span>
                            </div>
                            <div className="flex items-center gap-4">
                                <MapPin className="w-5 h-5 text-amber-400" />
                                <span>123 Gourmet Street, Food City</span>
                            </div>
                        </div>
                    </motion.div>

                    <motion.form
                        className="bg-white text-black p-8 rounded-3xl"
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <div className="grid sm:grid-cols-2 gap-4 mb-4">
                            <input
                                type="text"
                                placeholder="Your Name"
                                className="px-4 py-3 rounded-xl bg-gray-100 outline-none focus:ring-2 focus:ring-amber-400"
                            />
                            <input
                                type="email"
                                placeholder="Email"
                                className="px-4 py-3 rounded-xl bg-gray-100 outline-none focus:ring-2 focus:ring-amber-400"
                            />
                        </div>
                        <div className="grid sm:grid-cols-2 gap-4 mb-4">
                            <input
                                type="date"
                                className="px-4 py-3 rounded-xl bg-gray-100 outline-none focus:ring-2 focus:ring-amber-400"
                            />
                            <input
                                type="time"
                                className="px-4 py-3 rounded-xl bg-gray-100 outline-none focus:ring-2 focus:ring-amber-400"
                            />
                        </div>
                        <select className="w-full px-4 py-3 rounded-xl bg-gray-100 outline-none focus:ring-2 focus:ring-amber-400 mb-4">
                            <option>Number of Guests</option>
                            {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                                <option key={n} value={n}>{n} {n === 1 ? 'Guest' : 'Guests'}</option>
                            ))}
                        </select>
                        <textarea
                            placeholder="Special Requests (optional)"
                            rows={3}
                            className="w-full px-4 py-3 rounded-xl bg-gray-100 outline-none focus:ring-2 focus:ring-amber-400 mb-4 resize-none"
                        />
                        <button className="w-full py-4 bg-amber-400 text-black font-semibold rounded-xl hover:bg-amber-300 transition-colors">
                            Reserve Now
                        </button>
                    </motion.form>
                </div>
            </div>
        </section>
    )
}

// ========================================
// REVIEWS SECTION
// ========================================

function ReviewsSection() {
    return (
        <section className="py-24 bg-amber-50">
            <div className="max-w-7xl mx-auto px-6">
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <p className="text-amber-600 font-medium tracking-widest uppercase mb-2">Testimonials</p>
                    <h2 className="text-4xl font-serif font-bold">What Our Guests Say</h2>
                </motion.div>

                <div className="grid md:grid-cols-3 gap-8">
                    {reviews.map((review, index) => (
                        <motion.div
                            key={index}
                            className="bg-white p-8 rounded-2xl shadow-lg"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <div className="flex gap-1 mb-4">
                                {[...Array(review.rating)].map((_, i) => (
                                    <Star key={i} className="w-5 h-5 text-amber-400 fill-amber-400" />
                                ))}
                            </div>
                            <p className="text-gray-600 mb-6">&ldquo;{review.text}&rdquo;</p>
                            <div className="flex items-center justify-between">
                                <span className="font-semibold">{review.name}</span>
                                <span className="text-gray-400 text-sm">{review.date}</span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}

// ========================================
// FOOTER
// ========================================

function Footer() {
    return (
        <footer className="py-16 bg-black text-white">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid md:grid-cols-4 gap-12 mb-12">
                    <div>
                        <h3 className="text-2xl font-serif mb-4">
                            Gourmet<span className="text-amber-400">Bite</span>
                        </h3>
                        <p className="text-white/60 text-sm">
                            An exquisite dining experience in the heart of the city. Fine cuisine, premium wines, and impeccable service.
                        </p>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-4">Quick Links</h4>
                        <ul className="space-y-2 text-white/60">
                            {['Menu', 'Reservations', 'About Us', 'Contact'].map((link) => (
                                <li key={link}>
                                    <a href="#" className="hover:text-amber-400 transition-colors">{link}</a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-4">Hours</h4>
                        <ul className="space-y-2 text-white/60 text-sm">
                            <li>Tuesday - Thursday: 5PM - 10PM</li>
                            <li>Friday - Saturday: 5PM - 11PM</li>
                            <li>Sunday: 5PM - 9PM</li>
                            <li>Monday: Closed</li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-4">Follow Us</h4>
                        <div className="flex gap-3">
                            {[Instagram, Facebook, Twitter].map((Icon, i) => (
                                <a
                                    key={i}
                                    href="#"
                                    className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-amber-400 hover:text-black transition-colors"
                                >
                                    <Icon className="w-5 h-5" />
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="pt-8 border-t border-white/10 text-center text-white/40 text-sm">
                    Demo by{' '}
                    <Link href="/" className="text-amber-400 hover:underline">
                        YourName
                    </Link>
                </div>
            </div>
        </footer>
    )
}

// ========================================
// MAIN PAGE
// ========================================

export default function RestaurantPage() {
    return (
        <div className="min-h-screen">
            <Navigation />
            <HeroSection />
            <FeaturesSection />
            <MenuSection />
            <ReservationSection />
            <ReviewsSection />
            <Footer />
        </div>
    )
}
