'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import {
    Search,
    ShoppingCart,
    Heart,
    User,
    Menu,
    X,
    Star,
    Plus,
    Minus,
    Trash2,
    ChevronRight,
    Filter,
    Grid,
    List,
    Truck,
    Shield,
    RotateCcw,
    CreditCard,
} from 'lucide-react'

// ========================================
// TYPES
// ========================================

interface Product {
    id: number
    name: string
    price: number
    originalPrice?: number
    rating: number
    reviews: number
    image: string
    category: string
    badge?: string
    colors?: string[]
}

interface CartItem extends Product {
    quantity: number
}

// ========================================
// SAMPLE DATA
// ========================================

const products: Product[] = [
    {
        id: 1,
        name: 'Premium Wireless Headphones',
        price: 299,
        originalPrice: 399,
        rating: 4.8,
        reviews: 2341,
        image: '🎧',
        category: 'Electronics',
        badge: 'Best Seller',
        colors: ['#1F2937', '#F3F4F6', '#3B82F6'],
    },
    {
        id: 2,
        name: 'Designer Leather Watch',
        price: 189,
        rating: 4.9,
        reviews: 892,
        image: '⌚',
        category: 'Accessories',
        badge: 'New',
        colors: ['#92400E', '#1F2937', '#D97706'],
    },
    {
        id: 3,
        name: 'Minimalist Backpack',
        price: 129,
        originalPrice: 159,
        rating: 4.7,
        reviews: 1567,
        image: '🎒',
        category: 'Bags',
        colors: ['#1F2937', '#059669', '#DC2626'],
    },
    {
        id: 4,
        name: 'Smart Fitness Tracker',
        price: 149,
        rating: 4.6,
        reviews: 3210,
        image: '📱',
        category: 'Electronics',
        badge: 'Hot',
        colors: ['#1F2937', '#EC4899', '#3B82F6'],
    },
    {
        id: 5,
        name: 'Organic Cotton Sneakers',
        price: 119,
        rating: 4.8,
        reviews: 756,
        image: '👟',
        category: 'Footwear',
        colors: ['#F3F4F6', '#1F2937', '#059669'],
    },
    {
        id: 6,
        name: 'Bamboo Sunglasses',
        price: 79,
        originalPrice: 99,
        rating: 4.5,
        reviews: 432,
        image: '🕶️',
        category: 'Accessories',
        colors: ['#92400E', '#1F2937'],
    },
    {
        id: 7,
        name: 'Ceramic Coffee Set',
        price: 89,
        rating: 4.9,
        reviews: 1123,
        image: '☕',
        category: 'Home',
        badge: 'Editor Choice',
        colors: ['#F3F4F6', '#1F2937', '#D97706'],
    },
    {
        id: 8,
        name: 'Yoga Mat Premium',
        price: 69,
        rating: 4.7,
        reviews: 2890,
        image: '🧘',
        category: 'Fitness',
        colors: ['#8B5CF6', '#EC4899', '#059669'],
    },
]

const categories = ['All', 'Electronics', 'Accessories', 'Bags', 'Footwear', 'Home', 'Fitness']

// ========================================
// NAVIGATION
// ========================================

interface NavigationProps {
    cartItems: CartItem[]
    onCartClick: () => void
}

function Navigation({ cartItems, onCartClick }: NavigationProps) {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0)

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-6 py-4">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <Link href="/demos/ecommerce-store" className="text-2xl font-bold">
                        Shop<span className="text-emerald-500">Flow</span>
                    </Link>

                    {/* Search bar - desktop */}
                    <div className="hidden md:flex flex-1 max-w-md mx-8">
                        <div className="relative w-full">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search products..."
                                className="w-full pl-12 pr-4 py-3 rounded-full bg-gray-100 outline-none focus:ring-2 focus:ring-emerald-500"
                            />
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-4">
                        <button className="hidden md:flex p-2 hover:bg-gray-100 rounded-full transition-colors">
                            <Heart className="w-6 h-6" />
                        </button>
                        <button className="hidden md:flex p-2 hover:bg-gray-100 rounded-full transition-colors">
                            <User className="w-6 h-6" />
                        </button>
                        <button
                            className="relative p-2 hover:bg-gray-100 rounded-full transition-colors"
                            onClick={onCartClick}
                        >
                            <ShoppingCart className="w-6 h-6" />
                            {cartCount > 0 && (
                                <span className="absolute -top-1 -right-1 w-5 h-5 bg-emerald-500 text-white text-xs rounded-full flex items-center justify-center">
                                    {cartCount}
                                </span>
                            )}
                        </button>
                        <button
                            className="md:hidden p-2"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                        >
                            {isMenuOpen ? <X /> : <Menu />}
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    )
}

// ========================================
// PRODUCT CARD
// ========================================

interface ProductCardProps {
    product: Product
    onAddToCart: (product: Product) => void
    onAddToWishlist: (product: Product) => void
}

function ProductCard({ product, onAddToCart, onAddToWishlist }: ProductCardProps) {
    const [isHovered, setIsHovered] = useState(false)

    return (
        <motion.div
            className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Image */}
            <div className="relative aspect-square bg-gray-100 flex items-center justify-center overflow-hidden">
                <motion.span
                    className="text-7xl"
                    animate={{ scale: isHovered ? 1.1 : 1 }}
                    transition={{ duration: 0.3 }}
                >
                    {product.image}
                </motion.span>

                {/* Badge */}
                {product.badge && (
                    <div className="absolute top-4 left-4 px-3 py-1 bg-emerald-500 text-white text-xs font-semibold rounded-full">
                        {product.badge}
                    </div>
                )}

                {/* Quick actions */}
                <motion.div
                    className="absolute top-4 right-4 flex flex-col gap-2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : 20 }}
                >
                    <button
                        className="w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-emerald-500 hover:text-white transition-colors"
                        onClick={() => onAddToWishlist(product)}
                    >
                        <Heart className="w-5 h-5" />
                    </button>
                </motion.div>

                {/* Add to cart button */}
                <motion.button
                    className="absolute bottom-4 left-4 right-4 py-3 rounded-xl bg-black text-white font-semibold hover:bg-emerald-500 transition-colors"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
                    onClick={() => onAddToCart(product)}
                >
                    Add to Cart
                </motion.button>
            </div>

            {/* Details */}
            <div className="p-5">
                <p className="text-gray-500 text-sm mb-1">{product.category}</p>
                <h3 className="font-semibold mb-2 group-hover:text-emerald-500 transition-colors">
                    {product.name}
                </h3>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-3">
                    <div className="flex">
                        {[...Array(5)].map((_, i) => (
                            <Star
                                key={i}
                                className={`w-4 h-4 ${i < Math.floor(product.rating)
                                        ? 'text-yellow-400 fill-yellow-400'
                                        : 'text-gray-300'
                                    }`}
                            />
                        ))}
                    </div>
                    <span className="text-sm text-gray-500">({product.reviews})</span>
                </div>

                {/* Price */}
                <div className="flex items-center gap-2">
                    <span className="text-xl font-bold">${product.price}</span>
                    {product.originalPrice && (
                        <span className="text-gray-400 line-through">${product.originalPrice}</span>
                    )}
                </div>

                {/* Colors */}
                {product.colors && (
                    <div className="flex gap-2 mt-3">
                        {product.colors.map((color) => (
                            <div
                                key={color}
                                className="w-5 h-5 rounded-full border-2 border-white shadow cursor-pointer hover:scale-110 transition-transform"
                                style={{ backgroundColor: color }}
                            />
                        ))}
                    </div>
                )}
            </div>
        </motion.div>
    )
}

// ========================================
// CART SIDEBAR
// ========================================

interface CartSidebarProps {
    isOpen: boolean
    onClose: () => void
    cartItems: CartItem[]
    onUpdateQuantity: (id: number, quantity: number) => void
    onRemoveItem: (id: number) => void
}

function CartSidebar({ isOpen, onClose, cartItems, onUpdateQuantity, onRemoveItem }: CartSidebarProps) {
    const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        className="fixed inset-0 bg-black/50 z-50"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                    />

                    {/* Sidebar */}
                    <motion.div
                        className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-white z-50 flex flex-col"
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25 }}
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-6 border-b">
                            <h2 className="text-xl font-bold">Your Cart ({cartItems.length})</h2>
                            <button
                                className="w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center"
                                onClick={onClose}
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Items */}
                        <div className="flex-1 overflow-auto p-6">
                            {cartItems.length === 0 ? (
                                <div className="text-center py-12">
                                    <ShoppingCart className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                                    <p className="text-gray-500">Your cart is empty</p>
                                </div>
                            ) : (
                                <div className="space-y-6">
                                    {cartItems.map((item) => (
                                        <div key={item.id} className="flex gap-4">
                                            <div className="w-20 h-20 rounded-xl bg-gray-100 flex items-center justify-center text-3xl">
                                                {item.image}
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="font-medium mb-1">{item.name}</h3>
                                                <p className="text-emerald-500 font-bold">${item.price}</p>
                                                <div className="flex items-center gap-3 mt-2">
                                                    <button
                                                        className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200"
                                                        onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                                                    >
                                                        <Minus className="w-4 h-4" />
                                                    </button>
                                                    <span className="font-medium">{item.quantity}</span>
                                                    <button
                                                        className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200"
                                                        onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                                                    >
                                                        <Plus className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </div>
                                            <button
                                                className="text-gray-400 hover:text-red-500"
                                                onClick={() => onRemoveItem(item.id)}
                                            >
                                                <Trash2 className="w-5 h-5" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Footer */}
                        {cartItems.length > 0 && (
                            <div className="p-6 border-t">
                                <div className="flex items-center justify-between mb-4">
                                    <span className="text-gray-500">Subtotal</span>
                                    <span className="text-xl font-bold">${total.toFixed(2)}</span>
                                </div>
                                <button className="w-full py-4 rounded-xl bg-emerald-500 text-white font-semibold hover:bg-emerald-600 transition-colors">
                                    Checkout
                                </button>
                                <p className="text-center text-gray-500 text-sm mt-4">
                                    Shipping calculated at checkout
                                </p>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    )
}

// ========================================
// HERO BANNER
// ========================================

function HeroBanner() {
    return (
        <section className="pt-24 pb-12">
            <div className="max-w-7xl mx-auto px-6">
                <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-emerald-500 to-teal-600 text-white p-12 md:p-16">
                    <motion.div
                        className="relative z-10 max-w-lg"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <span className="inline-block px-4 py-1 rounded-full bg-white/20 text-sm font-medium mb-4">
                            New Collection 2025
                        </span>
                        <h1 className="text-4xl sm:text-5xl font-bold mb-4">
                            Discover Premium Products
                        </h1>
                        <p className="text-lg text-white/80 mb-8">
                            Up to 40% off on select items. Free shipping on orders over $50.
                        </p>
                        <button className="px-8 py-4 rounded-full bg-white text-emerald-600 font-semibold hover:bg-gray-100 transition-colors flex items-center gap-2">
                            Shop Now <ChevronRight className="w-5 h-5" />
                        </button>
                    </motion.div>

                    {/* Decorative elements */}
                    <div className="absolute right-0 top-0 bottom-0 w-1/2 flex items-center justify-center text-[200px] opacity-20">
                        🛍️
                    </div>
                </div>
            </div>
        </section>
    )
}

// ========================================
// FEATURES STRIP
// ========================================

function FeaturesStrip() {
    const features = [
        { icon: <Truck className="w-6 h-6" />, title: 'Free Shipping', desc: 'On orders over $50' },
        { icon: <Shield className="w-6 h-6" />, title: 'Secure Payment', desc: '100% protected' },
        { icon: <RotateCcw className="w-6 h-6" />, title: 'Easy Returns', desc: '30-day return policy' },
        { icon: <CreditCard className="w-6 h-6" />, title: 'Flexible Payment', desc: 'Pay in installments' },
    ]

    return (
        <section className="py-8 border-y border-gray-100">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {features.map((feature) => (
                        <div key={feature.title} className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center">
                                {feature.icon}
                            </div>
                            <div>
                                <h4 className="font-semibold text-sm">{feature.title}</h4>
                                <p className="text-gray-500 text-xs">{feature.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

// ========================================
// PRODUCTS SECTION
// ========================================

interface ProductsSectionProps {
    onAddToCart: (product: Product) => void
}

function ProductsSection({ onAddToCart }: ProductsSectionProps) {
    const [selectedCategory, setSelectedCategory] = useState('All')
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

    const filteredProducts = selectedCategory === 'All'
        ? products
        : products.filter((p) => p.category === selectedCategory)

    return (
        <section className="py-12">
            <div className="max-w-7xl mx-auto px-6">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                    <div>
                        <h2 className="text-2xl font-bold">Featured Products</h2>
                        <p className="text-gray-500">Discover our carefully curated selection</p>
                    </div>

                    <div className="flex items-center gap-4">
                        {/* View mode toggle */}
                        <div className="flex bg-gray-100 rounded-lg p-1">
                            <button
                                className={`p-2 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-white shadow' : ''}`}
                                onClick={() => setViewMode('grid')}
                            >
                                <Grid className="w-5 h-5" />
                            </button>
                            <button
                                className={`p-2 rounded-lg transition-colors ${viewMode === 'list' ? 'bg-white shadow' : ''}`}
                                onClick={() => setViewMode('list')}
                            >
                                <List className="w-5 h-5" />
                            </button>
                        </div>

                        <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50">
                            <Filter className="w-5 h-5" />
                            Filter
                        </button>
                    </div>
                </div>

                {/* Categories */}
                <div className="flex gap-3 overflow-x-auto pb-4 mb-8">
                    {categories.map((category) => (
                        <button
                            key={category}
                            className={`px-5 py-2 rounded-full font-medium whitespace-nowrap transition-all ${selectedCategory === category
                                    ? 'bg-black text-white'
                                    : 'bg-gray-100 hover:bg-gray-200'
                                }`}
                            onClick={() => setSelectedCategory(category)}
                        >
                            {category}
                        </button>
                    ))}
                </div>

                {/* Products grid */}
                <motion.div
                    className={
                        viewMode === 'grid'
                            ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'
                            : 'space-y-4'
                    }
                    layout
                >
                    <AnimatePresence mode="popLayout">
                        {filteredProducts.map((product) => (
                            <ProductCard
                                key={product.id}
                                product={product}
                                onAddToCart={onAddToCart}
                                onAddToWishlist={() => { }}
                            />
                        ))}
                    </AnimatePresence>
                </motion.div>
            </div>
        </section>
    )
}

// ========================================
// FOOTER
// ========================================

function Footer() {
    return (
        <footer className="bg-gray-900 text-white py-16">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid md:grid-cols-4 gap-12 mb-12">
                    <div>
                        <h3 className="text-2xl font-bold mb-4">
                            Shop<span className="text-emerald-400">Flow</span>
                        </h3>
                        <p className="text-gray-400 text-sm">
                            Premium products for modern living. Quality you can trust, style you&apos;ll love.
                        </p>
                    </div>

                    {['Shop', 'Company', 'Support'].map((title) => (
                        <div key={title}>
                            <h4 className="font-semibold mb-4">{title}</h4>
                            <ul className="space-y-3">
                                {['Link 1', 'Link 2', 'Link 3', 'Link 4'].map((link) => (
                                    <li key={link}>
                                        <a href="#" className="text-gray-400 hover:text-white text-sm">
                                            {link}
                                        </a>
                                    </li>
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

export default function EcommerceStorePage() {
    const [cartItems, setCartItems] = useState<CartItem[]>([])
    const [isCartOpen, setIsCartOpen] = useState(false)

    const addToCart = (product: Product) => {
        setCartItems((prev) => {
            const existing = prev.find((item) => item.id === product.id)
            if (existing) {
                return prev.map((item) =>
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                )
            }
            return [...prev, { ...product, quantity: 1 }]
        })
        setIsCartOpen(true)
    }

    const updateQuantity = (id: number, quantity: number) => {
        if (quantity < 1) {
            removeItem(id)
            return
        }
        setCartItems((prev) =>
            prev.map((item) => (item.id === id ? { ...item, quantity } : item))
        )
    }

    const removeItem = (id: number) => {
        setCartItems((prev) => prev.filter((item) => item.id !== id))
    }

    return (
        <div className="min-h-screen bg-white">
            <Navigation cartItems={cartItems} onCartClick={() => setIsCartOpen(true)} />
            <HeroBanner />
            <FeaturesStrip />
            <ProductsSection onAddToCart={addToCart} />
            <Footer />
            <CartSidebar
                isOpen={isCartOpen}
                onClose={() => setIsCartOpen(false)}
                cartItems={cartItems}
                onUpdateQuantity={updateQuantity}
                onRemoveItem={removeItem}
            />
        </div>
    )
}
