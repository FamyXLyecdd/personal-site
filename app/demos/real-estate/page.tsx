'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import {
    Search,
    MapPin,
    Home,
    Building2,
    Bed,
    Bath,
    Square,
    Heart,
    Share2,
    Phone,
    Mail,
    Calendar,
    ChevronDown,
    Filter,
    Grid,
    List,
    SlidersHorizontal,
    Star,
    ChevronLeft,
    ChevronRight,
    X,
    Check,
    Car,
    Wifi,
    Wind,
    Dumbbell,
    Trees,
    Shield,
    Waves,
    User,
    Bell,
    Menu,
} from 'lucide-react'

// ========================================
// TYPES
// ========================================

interface Property {
    id: string
    title: string
    type: 'sale' | 'rent'
    propertyType: 'house' | 'apartment' | 'condo' | 'villa'
    price: number
    priceUnit?: string
    location: string
    address: string
    beds: number
    baths: number
    sqft: number
    image: string
    images: string[]
    featured?: boolean
    new?: boolean
    amenities: string[]
    description: string
    agent: {
        name: string
        avatar: string
        phone: string
        email: string
    }
    rating: number
    reviews: number
}

// ========================================
// SAMPLE DATA
// ========================================

const properties: Property[] = [
    {
        id: 'p1',
        title: 'Modern Luxury Villa with Ocean View',
        type: 'sale',
        propertyType: 'villa',
        price: 2500000,
        location: 'Malibu, CA',
        address: '123 Ocean Drive, Malibu, CA 90265',
        beds: 5,
        baths: 4,
        sqft: 4500,
        image: '🏡',
        images: ['🏡', '🛋️', '🍳', '🛏️'],
        featured: true,
        amenities: ['Pool', 'Garage', 'Garden', 'Security', 'Smart Home'],
        description: 'Stunning oceanfront villa featuring modern architecture, floor-to-ceiling windows, and breathtaking Pacific Ocean views.',
        agent: { name: 'Sarah Johnson', avatar: '👩‍💼', phone: '+1 (555) 123-4567', email: 'sarah@realestate.com' },
        rating: 4.9,
        reviews: 24,
    },
    {
        id: 'p2',
        title: 'Downtown Penthouse Suite',
        type: 'sale',
        propertyType: 'apartment',
        price: 1800000,
        location: 'New York, NY',
        address: '456 Park Avenue, New York, NY 10022',
        beds: 3,
        baths: 3,
        sqft: 2800,
        image: '🏙️',
        images: ['🏙️', '🛋️', '🍳'],
        new: true,
        amenities: ['Gym', 'Concierge', 'Rooftop', 'Parking'],
        description: 'Luxurious penthouse in the heart of Manhattan with skyline views and world-class amenities.',
        agent: { name: 'Michael Chen', avatar: '👨‍💼', phone: '+1 (555) 987-6543', email: 'michael@realestate.com' },
        rating: 4.8,
        reviews: 18,
    },
    {
        id: 'p3',
        title: 'Cozy Family Home with Garden',
        type: 'sale',
        propertyType: 'house',
        price: 750000,
        location: 'Austin, TX',
        address: '789 Maple Street, Austin, TX 78701',
        beds: 4,
        baths: 3,
        sqft: 3200,
        image: '🏠',
        images: ['🏠', '🌳', '🛋️'],
        amenities: ['Garden', 'Garage', 'Fireplace', 'Basement'],
        description: 'Beautiful family home in a quiet neighborhood with a large backyard perfect for entertaining.',
        agent: { name: 'Emily Davis', avatar: '👩', phone: '+1 (555) 456-7890', email: 'emily@realestate.com' },
        rating: 4.7,
        reviews: 31,
    },
    {
        id: 'p4',
        title: 'Modern Studio in Tech Hub',
        type: 'rent',
        propertyType: 'apartment',
        price: 2500,
        priceUnit: '/month',
        location: 'San Francisco, CA',
        address: '321 Tech Boulevard, San Francisco, CA 94102',
        beds: 1,
        baths: 1,
        sqft: 650,
        image: '🏢',
        images: ['🏢', '🛋️'],
        new: true,
        amenities: ['Gym', 'Laundry', 'Pets Allowed', 'Rooftop'],
        description: 'Sleek, modern studio in the heart of SF tech district. Walking distance to public transit.',
        agent: { name: 'Alex Kim', avatar: '🧑', phone: '+1 (555) 321-0987', email: 'alex@realestate.com' },
        rating: 4.5,
        reviews: 45,
    },
    {
        id: 'p5',
        title: 'Beachfront Condo Paradise',
        type: 'sale',
        propertyType: 'condo',
        price: 950000,
        location: 'Miami, FL',
        address: '555 Beach Road, Miami, FL 33139',
        beds: 2,
        baths: 2,
        sqft: 1400,
        image: '🏖️',
        images: ['🏖️', '🌴', '🛋️'],
        featured: true,
        amenities: ['Beach Access', 'Pool', 'Gym', 'Concierge'],
        description: 'Direct beachfront condo with stunning sunrise views and resort-style amenities.',
        agent: { name: 'Maria Rodriguez', avatar: '👩‍🦰', phone: '+1 (555) 654-3210', email: 'maria@realestate.com' },
        rating: 4.9,
        reviews: 52,
    },
    {
        id: 'p6',
        title: 'Mountain Retreat Cabin',
        type: 'sale',
        propertyType: 'house',
        price: 580000,
        location: 'Aspen, CO',
        address: '888 Mountain View, Aspen, CO 81611',
        beds: 3,
        baths: 2,
        sqft: 2200,
        image: '⛰️',
        images: ['⛰️', '🪵', '🔥'],
        amenities: ['Fireplace', 'Hot Tub', 'Ski Access', 'Views'],
        description: 'Charming mountain cabin with ski-in/ski-out access and panoramic mountain views.',
        agent: { name: 'James Wilson', avatar: '👨', phone: '+1 (555) 789-0123', email: 'james@realestate.com' },
        rating: 4.8,
        reviews: 19,
    },
]

const propertyTypes = ['All Types', 'House', 'Apartment', 'Condo', 'Villa']
const priceRanges = ['Any Price', '$0 - $500k', '$500k - $1M', '$1M - $2M', '$2M+']

// ========================================
// NAVIGATION
// ========================================

function Navigation() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">
            <div className="max-w-7xl mx-auto px-6 py-4">
                <div className="flex items-center justify-between">
                    <Link href="/demos/real-estate" className="flex items-center gap-2">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
                            <Building2 className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-xl font-bold">HomeFind</span>
                    </Link>

                    <div className="hidden md:flex items-center gap-8">
                        {['Buy', 'Rent', 'Sell', 'Agents', 'About'].map((item) => (
                            <a key={item} href="#" className="text-gray-600 hover:text-emerald-600 font-medium">
                                {item}
                            </a>
                        ))}
                    </div>

                    <div className="flex items-center gap-4">
                        <button className="hidden md:flex items-center gap-2 px-4 py-2 text-emerald-600 font-medium">
                            <Phone className="w-4 h-4" />
                            Contact
                        </button>
                        <button className="px-5 py-2 bg-emerald-600 text-white rounded-xl font-medium hover:bg-emerald-700">
                            List Property
                        </button>
                        <button className="md:hidden p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                            {isMenuOpen ? <X /> : <Menu />}
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    )
}

// ========================================
// SEARCH HERO
// ========================================

function SearchHero() {
    const [activeTab, setActiveTab] = useState<'buy' | 'rent'>('buy')

    return (
        <section className="pt-24 pb-12 bg-gradient-to-br from-emerald-50 to-teal-50">
            <div className="max-w-7xl mx-auto px-6 py-16">
                <motion.div
                    className="text-center mb-12"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <h1 className="text-4xl sm:text-5xl font-bold mb-4">
                        Find Your <span className="text-emerald-600">Dream Home</span>
                    </h1>
                    <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                        Discover the perfect property from our extensive collection of homes, apartments, and luxury estates.
                    </p>
                </motion.div>

                {/* Search box */}
                <motion.div
                    className="bg-white rounded-2xl shadow-xl p-6 max-w-4xl mx-auto"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    {/* Tabs */}
                    <div className="flex gap-2 mb-6">
                        {(['buy', 'rent'] as const).map((tab) => (
                            <button
                                key={tab}
                                className={`px-6 py-2 rounded-lg font-medium transition-colors ${activeTab === tab
                                        ? 'bg-emerald-600 text-white'
                                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                    }`}
                                onClick={() => setActiveTab(tab)}
                            >
                                {tab === 'buy' ? 'Buy' : 'Rent'}
                            </button>
                        ))}
                    </div>

                    {/* Search fields */}
                    <div className="grid md:grid-cols-4 gap-4">
                        <div className="md:col-span-2">
                            <label className="text-sm text-gray-500 mb-1 block">Location</label>
                            <div className="relative">
                                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Enter city, neighborhood, or ZIP"
                                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-emerald-500"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="text-sm text-gray-500 mb-1 block">Property Type</label>
                            <select className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-emerald-500 appearance-none bg-white">
                                {propertyTypes.map((type) => (
                                    <option key={type}>{type}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="text-sm text-gray-500 mb-1 block">Price Range</label>
                            <select className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-emerald-500 appearance-none bg-white">
                                {priceRanges.map((range) => (
                                    <option key={range}>{range}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <button className="w-full mt-6 py-4 bg-emerald-600 text-white rounded-xl font-semibold hover:bg-emerald-700 flex items-center justify-center gap-2">
                        <Search className="w-5 h-5" />
                        Search Properties
                    </button>
                </motion.div>
            </div>
        </section>
    )
}

// ========================================
// PROPERTY CARD
// ========================================

function PropertyCard({ property, index }: { property: Property; index: number }) {
    const [isLiked, setIsLiked] = useState(false)

    return (
        <motion.div
            className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
        >
            {/* Image */}
            <div className="relative aspect-[4/3] bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center text-8xl">
                    {property.image}
                </div>

                {/* Badges */}
                <div className="absolute top-4 left-4 flex gap-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${property.type === 'sale' ? 'bg-emerald-500 text-white' : 'bg-blue-500 text-white'
                        }`}>
                        For {property.type === 'sale' ? 'Sale' : 'Rent'}
                    </span>
                    {property.featured && (
                        <span className="px-3 py-1 bg-yellow-500 text-white rounded-full text-xs font-semibold">
                            Featured
                        </span>
                    )}
                    {property.new && (
                        <span className="px-3 py-1 bg-purple-500 text-white rounded-full text-xs font-semibold">
                            New
                        </span>
                    )}
                </div>

                {/* Actions */}
                <div className="absolute top-4 right-4 flex gap-2">
                    <button
                        className="w-10 h-10 rounded-full bg-white/90 shadow flex items-center justify-center hover:bg-white transition-colors"
                        onClick={() => setIsLiked(!isLiked)}
                    >
                        <Heart className={`w-5 h-5 ${isLiked ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
                    </button>
                </div>

                {/* Price */}
                <div className="absolute bottom-4 left-4">
                    <div className="px-4 py-2 bg-white/95 rounded-xl shadow">
                        <span className="text-2xl font-bold text-emerald-600">
                            ${property.price.toLocaleString()}
                        </span>
                        {property.priceUnit && (
                            <span className="text-gray-500">{property.priceUnit}</span>
                        )}
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="p-5">
                <h3 className="font-bold text-lg mb-2 group-hover:text-emerald-600 transition-colors line-clamp-1">
                    {property.title}
                </h3>
                <p className="flex items-center gap-1 text-gray-500 text-sm mb-4">
                    <MapPin className="w-4 h-4" />
                    {property.location}
                </p>

                {/* Features */}
                <div className="flex items-center gap-4 pb-4 border-b border-gray-100">
                    <div className="flex items-center gap-1 text-gray-600">
                        <Bed className="w-4 h-4" />
                        <span className="text-sm">{property.beds} Beds</span>
                    </div>
                    <div className="flex items-center gap-1 text-gray-600">
                        <Bath className="w-4 h-4" />
                        <span className="text-sm">{property.baths} Baths</span>
                    </div>
                    <div className="flex items-center gap-1 text-gray-600">
                        <Square className="w-4 h-4" />
                        <span className="text-sm">{property.sqft.toLocaleString()} sqft</span>
                    </div>
                </div>

                {/* Agent & rating */}
                <div className="flex items-center justify-between pt-4">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center text-sm">
                            {property.agent.avatar}
                        </div>
                        <span className="text-sm text-gray-600">{property.agent.name}</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                        <span className="text-sm font-medium">{property.rating}</span>
                        <span className="text-sm text-gray-400">({property.reviews})</span>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}

// ========================================
// FEATURED LISTINGS
// ========================================

function FeaturedListings() {
    return (
        <section className="py-16">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h2 className="text-2xl font-bold mb-2">Featured Properties</h2>
                        <p className="text-gray-500">Hand-picked properties for you</p>
                    </div>
                    <button className="text-emerald-600 font-medium hover:underline">
                        View All →
                    </button>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {properties.slice(0, 6).map((property, index) => (
                        <PropertyCard key={property.id} property={property} index={index} />
                    ))}
                </div>
            </div>
        </section>
    )
}

// ========================================
// STATS SECTION
// ========================================

function StatsSection() {
    const stats = [
        { value: '15K+', label: 'Properties Listed' },
        { value: '8K+', label: 'Happy Customers' },
        { value: '2K+', label: 'Expert Agents' },
        { value: '50+', label: 'Cities Covered' },
    ]

    return (
        <section className="py-16 bg-emerald-600 text-white">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={stat.label}
                            className="text-center"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <p className="text-4xl font-bold mb-2">{stat.value}</p>
                            <p className="text-emerald-100">{stat.label}</p>
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
        <footer className="py-16 bg-gray-900 text-white">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid md:grid-cols-4 gap-12 mb-12">
                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
                                <Building2 className="w-5 h-5 text-white" />
                            </div>
                            <span className="text-xl font-bold">HomeFind</span>
                        </div>
                        <p className="text-gray-400 text-sm">
                            Your trusted partner in finding the perfect home. Quality properties, expert guidance.
                        </p>
                    </div>

                    {['Quick Links', 'Property Types', 'Support'].map((title) => (
                        <div key={title}>
                            <h4 className="font-semibold mb-4">{title}</h4>
                            <ul className="space-y-2 text-gray-400">
                                {['Link 1', 'Link 2', 'Link 3', 'Link 4'].map((link) => (
                                    <li key={link}><a href="#" className="hover:text-white">{link}</a></li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <div className="pt-8 border-t border-white/10 text-center text-gray-400 text-sm">
                    Demo by{' '}
                    <Link href="/" className="text-emerald-400 hover:underline">
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

export default function RealEstatePage() {
    return (
        <div className="min-h-screen bg-gray-50">
            <Navigation />
            <SearchHero />
            <FeaturedListings />
            <StatsSection />
            <Footer />
        </div>
    )
}
