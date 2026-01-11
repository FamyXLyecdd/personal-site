'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import {
    Plane,
    Hotel,
    Car,
    MapPin,
    Calendar,
    Search,
    Star,
    User,
    Menu,
    X,
    ChevronDown,
    Globe,
    Heart,
    Shield,
    CreditCard,
    CheckCircle,
    ArrowRight,
    Filter,
    SlidersHorizontal,
    Sun,
    Umbrella,
    Camera,
    Coffee,
    Wifi,
    Utensils,
    Music,
    Tv,
} from 'lucide-react'

// ========================================
// TYPES
// ========================================

interface Destination {
    id: string
    name: string
    country: string
    image: string
    rating: number
    reviews: number
    price: number
    description: string
    tags: string[]
    temperature: number
}

interface HotelData {
    id: string
    name: string
    location: string
    image: string
    stars: number
    rating: number
    reviews: number
    price: number
    amenities: string[]
    featured?: boolean
}

// ========================================
// SAMPLE DATA
// ========================================

const destinations: Destination[] = [
    {
        id: 'd1',
        name: 'Santorini',
        country: 'Greece',
        image: '🏝️',
        rating: 4.9,
        reviews: 1250,
        price: 1299,
        description: 'Experience the stunning sunsets and white-washed architecture of this Aegean paradise.',
        tags: ['Beach', 'Romance', 'Luxury'],
        temperature: 28,
    },
    {
        id: 'd2',
        name: 'Kyoto',
        country: 'Japan',
        image: '⛩️',
        rating: 4.8,
        reviews: 980,
        price: 1599,
        description: 'Immerse yourself in ancient culture, beautiful temples, and cherry blossoms.',
        tags: ['Culture', 'History', 'Nature'],
        temperature: 22,
    },
    {
        id: 'd3',
        name: 'Bali',
        country: 'Indonesia',
        image: '🌴',
        rating: 4.7,
        reviews: 2100,
        price: 899,
        description: 'Discover lush jungles, sacred temples, and beautiful beaches in this tropical haven.',
        tags: ['Nature', 'Wellness', 'Adventure'],
        temperature: 30,
    },
    {
        id: 'd4',
        name: 'Paris',
        country: 'France',
        image: '🗼',
        rating: 4.6,
        reviews: 3200,
        price: 1199,
        description: 'The city of light awaits with world-class cuisine, art, and iconic landmarks.',
        tags: ['City', 'Art', 'Food'],
        temperature: 18,
    },
    {
        id: 'd5',
        name: 'Machu Picchu',
        country: 'Peru',
        image: '⛰️',
        rating: 4.9,
        reviews: 850,
        price: 1499,
        description: 'Trek to the lost city of the Incas high in the Andes mountains.',
        tags: ['Adventure', 'History', 'Hiking'],
        temperature: 15,
    },
    {
        id: 'd6',
        name: 'Maldives',
        country: 'Maldives',
        image: '🏖️',
        rating: 4.9,
        reviews: 1500,
        price: 2499,
        description: 'Relax in overwater bungalows surrounded by crystal clear turquoise waters.',
        tags: ['Luxury', 'Beach', 'Relaxation'],
        temperature: 29,
    },
]

const hotels: HotelData[] = [
    {
        id: 'h1',
        name: 'Grand Luxury Resort',
        location: 'Santorini, Greece',
        image: '🏨',
        stars: 5,
        rating: 4.9,
        reviews: 420,
        price: 450,
        amenities: ['Pool', 'Spa', 'WiFi', 'Restaurant'],
        featured: true,
    },
    {
        id: 'h2',
        name: 'City Center Boutique',
        location: 'Paris, France',
        image: '🏩',
        stars: 4,
        rating: 4.7,
        reviews: 310,
        price: 280,
        amenities: ['Gym', 'Bar', 'Concierge'],
        featured: true,
    },
    {
        id: 'h3',
        name: 'Jungle Villa Retreat',
        location: 'Bali, Indonesia',
        image: '🏡',
        stars: 5,
        rating: 4.8,
        reviews: 180,
        price: 320,
        amenities: ['Private Pool', 'Yoga Deck', 'Spa'],
    },
]

// ========================================
// HERO SECTION
// ========================================

function Hero() {
    const [activeTab, setActiveTab] = useState<'stays' | 'flights' | 'cars'>('stays')

    return (
        <div className="relative h-[600px] flex items-center justify-center text-white overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-indigo-900">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?ixlib=rb-4.0.3&auto=format&fit=crop&w=2021&q=80')] bg-cover bg-center opacity-40 mix-blend-overlay" />
                <div className="absolute inset-0 bg-black/20" />
            </div>

            <div className="relative z-10 max-w-5xl w-full px-6">
                <motion.div
                    className="text-center mb-12"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <h1 className="text-5xl md:text-6xl font-bold mb-6">
                        Discover Your Next Adventure
                    </h1>
                    <p className="text-xl text-blue-100 max-w-2xl mx-auto">
                        Explore the world&apos;s most beautiful destinations and book your perfect trip today.
                    </p>
                </motion.div>

                {/* Search Widget */}
                <motion.div
                    className="bg-white rounded-2xl p-2 shadow-2xl max-w-4xl mx-auto"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <div className="flex gap-2 mb-2 p-2">
                        {[
                            { id: 'stays', icon: <Hotel className="w-5 h-5" />, label: 'Stays' },
                            { id: 'flights', icon: <Plane className="w-5 h-5" />, label: 'Flights' },
                            { id: 'cars', icon: <Car className="w-5 h-5" />, label: 'Car Rentals' },
                        ].map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id as any)}
                                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${activeTab === tab.id
                                        ? 'bg-blue-600 text-white shadow-lg'
                                        : 'text-gray-600 hover:bg-gray-100'
                                    }`}
                            >
                                {tab.icon}
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    <div className="grid md:grid-cols-[1fr,auto,auto,auto] gap-2 p-2">
                        <div className="bg-gray-50 rounded-xl p-3 px-4 border border-gray-100 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent transition-all">
                            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1 block">Location</label>
                            <div className="flex items-center gap-2">
                                <MapPin className="w-5 h-5 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Where are you going?"
                                    className="bg-transparent w-full outline-none font-medium text-gray-900 placeholder:text-gray-400"
                                />
                            </div>
                        </div>

                        <div className="bg-gray-50 rounded-xl p-3 px-4 border border-gray-100">
                            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1 block">Check in - Check out</label>
                            <div className="flex items-center gap-2">
                                <Calendar className="w-5 h-5 text-gray-400" />
                                <span className="font-medium text-gray-900">Add Dates</span>
                            </div>
                        </div>

                        <div className="bg-gray-50 rounded-xl p-3 px-4 border border-gray-100">
                            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1 block">Travelers</label>
                            <div className="flex items-center gap-2">
                                <User className="w-5 h-5 text-gray-400" />
                                <span className="font-medium text-gray-900">2 Adults</span>
                            </div>
                        </div>

                        <button className="bg-blue-600 text-white rounded-xl px-8 font-bold hover:bg-blue-700 transition-colors flex items-center gap-2">
                            <Search className="w-6 h-6" />
                            Search
                        </button>
                    </div>
                </motion.div>
            </div>
        </div>
    )
}

// ========================================
// DESTINATION CARD
// ========================================

function DestinationCard({ dest, index }: { dest: Destination; index: number }) {
    const [isLiked, setIsLiked] = useState(false)

    return (
        <motion.div
            className="group relative h-[400px] rounded-3xl overflow-hidden cursor-pointer"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
        >
            {/* Background Image Placeholder */}
            <div className="absolute inset-0 bg-gray-200">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-900/50 to-black/50" />
                <div className="absolute inset-0 flex items-center justify-center text-9xl select-none group-hover:scale-110 transition-transform duration-700">
                    {dest.image}
                </div>
            </div>

            {/* Content */}
            <div className="absolute inset-0 p-6 flex flex-col justify-between text-white">
                <div className="flex justify-between items-start">
                    <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-sm font-medium border border-white/20">
                        {dest.temperature}°C
                    </span>
                    <button
                        onClick={() => setIsLiked(!isLiked)}
                        className="p-3 bg-white/20 backdrop-blur-md rounded-full hover:bg-white/30 transition-colors border border-white/20"
                    >
                        <Heart className={`w-5 h-5 ${isLiked ? 'fill-red-500 text-red-500' : 'text-white'}`} />
                    </button>
                </div>

                <div>
                    <h3 className="text-3xl font-bold mb-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                        {dest.name}
                    </h3>
                    <div className="flex items-center gap-2 mb-4 translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">
                        <MapPin className="w-4 h-4 text-blue-400" />
                        <span className="text-blue-100">{dest.country}</span>
                    </div>

                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-4 group-hover:translate-y-0 delay-100">
                        <p className="text-sm text-gray-200 line-clamp-2 mb-4">
                            {dest.description}
                        </p>
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-xs text-gray-300">Starting from</p>
                                <p className="text-xl font-bold">${dest.price}</p>
                            </div>
                            <button className="px-6 py-2 bg-white text-blue-900 rounded-xl font-bold hover:bg-blue-50 transition-colors">
                                Explore
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}

// ========================================
// POPULAR DESTINATIONS
// ========================================

function PopularDestinations() {
    return (
        <section className="py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex items-end justify-between mb-12">
                    <div>
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">Popular Destinations</h2>
                        <p className="text-xl text-gray-600">Most visited places this month</p>
                    </div>
                    <button className="hidden md:flex items-center gap-2 text-blue-600 font-bold hover:gap-3 transition-all">
                        View All Destinations <ArrowRight className="w-5 h-5" />
                    </button>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {destinations.map((dest, index) => (
                        <DestinationCard key={dest.id} dest={dest} index={index} />
                    ))}
                </div>
            </div>
        </section>
    )
}

// ========================================
// HOTEL CARD
// ========================================

function HotelCard({ hotel }: { hotel: HotelData }) {
    return (
        <motion.div
            className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow border border-gray-100"
            whileHover={{ y: -5 }}
        >
            <div className="relative aspect-[4/3] bg-gray-100 flex items-center justify-center text-6xl">
                {hotel.image}
                <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-lg shadow-sm font-bold text-blue-600">
                    ${hotel.price}
                    <span className="text-xs text-gray-400 font-normal">/night</span>
                </div>
            </div>
            <div className="p-5">
                <div className="flex justify-between items-start mb-2">
                    <div>
                        <h3 className="font-bold text-lg mb-1">{hotel.name}</h3>
                        <p className="text-sm text-gray-500 flex items-center gap-1">
                            <MapPin className="w-3 h-3" /> {hotel.location}
                        </p>
                    </div>
                    <div className="flex items-center gap-1 bg-blue-50 px-2 py-1 rounded-lg">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-bold text-blue-900">{hotel.rating}</span>
                    </div>
                </div>
                <div className="flex gap-2 mb-4">
                    {hotel.amenities.map(amenity => (
                        <span key={amenity} className="text-xs px-2 py-1 bg-gray-100 rounded-md text-gray-600">
                            {amenity}
                        </span>
                    ))}
                </div>
                <button className="w-full py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-colors">
                    View Details
                </button>
            </div>
        </motion.div>
    )
}

// ========================================
// FEATURES
// ========================================

function Features() {
    const features = [
        { icon: <Shield className="w-8 h-8 text-blue-600" />, title: 'Secure Booking', desc: 'Your payments and data are always secure with us.' },
        { icon: <Heart className="w-8 h-8 text-red-500" />, title: '24/7 Support', desc: 'Our support team is available around the clock.' },
        { icon: <CreditCard className="w-8 h-8 text-green-600" />, title: 'Best Price', desc: 'We guarantee the best prices for your trips.' },
        { icon: <Globe className="w-8 h-8 text-purple-600" />, title: 'Global Coverage', desc: 'Destinations in over 190 countries worldwide.' },
    ]

    return (
        <section className="py-20">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid md:grid-cols-4 gap-8">
                    {features.map((feature, index) => (
                        <motion.div
                            key={feature.title}
                            className="text-center p-6 rounded-2xl hover:bg-gray-50 transition-colors"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <div className="w-16 h-16 mx-auto bg-white shadow-lg rounded-2xl flex items-center justify-center mb-6">
                                {feature.icon}
                            </div>
                            <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
                            <p className="text-gray-500">{feature.desc}</p>
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
        <footer className="bg-gray-900 text-white pt-20 pb-10">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid md:grid-cols-4 gap-12 mb-16">
                    <div>
                        <div className="flex items-center gap-2 mb-6">
                            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center">
                                <Plane className="w-6 h-6 text-white" />
                            </div>
                            <span className="text-2xl font-bold">TravelGo</span>
                        </div>
                        <p className="text-gray-400">
                            Making your travel dreams a reality. Book flights, hotels, and cars at the best prices.
                        </p>
                    </div>

                    <div>
                        <h4 className="font-bold mb-6">Company</h4>
                        <ul className="space-y-4 text-gray-400">
                            <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Press</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold mb-6">Support</h4>
                        <ul className="space-y-4 text-gray-400">
                            <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold mb-6">Newsletter</h4>
                        <p className="text-gray-400 mb-4">Subscribe for travel deals and updates.</p>
                        <div className="flex gap-2">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="bg-gray-800 border-none rounded-xl px-4 py-3 w-full focus:ring-2 focus:ring-blue-600 outline-none"
                            />
                            <button className="bg-blue-600 px-4 py-3 rounded-xl hover:bg-blue-700 transition-colors">
                                <ArrowRight className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-800 pt-10 text-center text-gray-500">
                    <p>© 2025 TravelGo. All rights reserved. Demo by YourName.</p>
                </div>
            </div>
        </footer>
    )
}

// ========================================
// NAV
// ========================================

function Nav() {
    const [isScrolled, setIsScrolled] = useState(false)

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md py-4' : 'bg-transparent py-6'}`}>
            <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
                <Link href="/demos/travel-booking" className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center">
                        <Plane className="w-6 h-6 text-white" />
                    </div>
                    <span className={`text-2xl font-bold ${isScrolled ? 'text-gray-900' : 'text-white'}`}>TravelGo</span>
                </Link>

                <div className="hidden md:flex items-center gap-8">
                    {['Destinations', 'Hotels', 'Flights', 'Packages'].map((item) => (
                        <a
                            key={item}
                            href="#"
                            className={`font-medium hover:text-blue-500 transition-colors ${isScrolled ? 'text-gray-600' : 'text-white/90'}`}
                        >
                            {item}
                        </a>
                    ))}
                </div>

                <div className="flex items-center gap-4">
                    <button className={`px-6 py-2.5 rounded-xl font-bold transition-all ${isScrolled
                            ? 'bg-blue-600 text-white hover:bg-blue-700'
                            : 'bg-white text-blue-900 hover:bg-blue-50'
                        }`}>
                        Sign In
                    </button>
                </div>
            </div>
        </nav>
    )
}

// ========================================
// PAGE
// ========================================

export default function TravelBookingPage() {
    return (
        <div className="min-h-screen bg-white">
            <Nav />
            <Hero />
            <PopularDestinations />
            <Features />

            <section className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex items-center justify-between mb-12">
                        <h2 className="text-4xl font-bold text-gray-900">Trending Hotels</h2>
                        <button className="text-blue-600 font-bold hover:underline">View All</button>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8">
                        {hotels.map((hotel) => (
                            <HotelCard key={hotel.id} hotel={hotel} />
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    )
}
