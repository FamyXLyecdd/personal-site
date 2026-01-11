'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import {
    Cloud,
    Sun,
    CloudRain,
    CloudSnow,
    CloudLightning,
    CloudDrizzle,
    Wind,
    Droplets,
    Thermometer,
    Eye,
    Compass,
    Sunrise,
    Sunset,
    MapPin,
    Search,
    ChevronRight,
    ChevronDown,
    Plus,
    Heart,
    RefreshCw,
    Settings,
    Menu,
    Star,
    Moon,
    CloudFog,
    Umbrella,
} from 'lucide-react'

// ========================================
// TYPES
// ========================================

interface WeatherData {
    location: string
    country: string
    temp: number
    tempMin: number
    tempMax: number
    feelsLike: number
    condition: string
    description: string
    humidity: number
    windSpeed: number
    windDirection: string
    visibility: number
    pressure: number
    uv: number
    sunrise: string
    sunset: string
    icon: string
}

interface HourlyForecast {
    time: string
    temp: number
    icon: string
    precipitation: number
}

interface DailyForecast {
    day: string
    date: string
    tempMin: number
    tempMax: number
    icon: string
    condition: string
    precipitation: number
}

// ========================================
// SAMPLE DATA
// ========================================

const currentWeather: WeatherData = {
    location: 'San Francisco',
    country: 'United States',
    temp: 18,
    tempMin: 14,
    tempMax: 22,
    feelsLike: 17,
    condition: 'Partly Cloudy',
    description: 'Partly cloudy with a chance of fog in the evening',
    humidity: 72,
    windSpeed: 15,
    windDirection: 'NW',
    visibility: 16,
    pressure: 1015,
    uv: 4,
    sunrise: '6:45 AM',
    sunset: '7:32 PM',
    icon: '⛅',
}

const hourlyForecast: HourlyForecast[] = [
    { time: 'Now', temp: 18, icon: '⛅', precipitation: 0 },
    { time: '1PM', temp: 20, icon: '🌤️', precipitation: 0 },
    { time: '2PM', temp: 21, icon: '☀️', precipitation: 0 },
    { time: '3PM', temp: 22, icon: '☀️', precipitation: 0 },
    { time: '4PM', temp: 21, icon: '🌤️', precipitation: 5 },
    { time: '5PM', temp: 19, icon: '⛅', precipitation: 10 },
    { time: '6PM', temp: 17, icon: '🌥️', precipitation: 15 },
    { time: '7PM', temp: 16, icon: '🌥️', precipitation: 20 },
    { time: '8PM', temp: 15, icon: '☁️', precipitation: 25 },
    { time: '9PM', temp: 14, icon: '🌧️', precipitation: 40 },
]

const dailyForecast: DailyForecast[] = [
    { day: 'Today', date: 'Jan 11', tempMin: 14, tempMax: 22, icon: '⛅', condition: 'Partly Cloudy', precipitation: 10 },
    { day: 'Tomorrow', date: 'Jan 12', tempMin: 12, tempMax: 18, icon: '🌧️', condition: 'Rainy', precipitation: 80 },
    { day: 'Monday', date: 'Jan 13', tempMin: 11, tempMax: 16, icon: '🌧️', condition: 'Heavy Rain', precipitation: 90 },
    { day: 'Tuesday', date: 'Jan 14', tempMin: 10, tempMax: 15, icon: '🌥️', condition: 'Cloudy', precipitation: 30 },
    { day: 'Wednesday', date: 'Jan 15', tempMin: 12, tempMax: 19, icon: '🌤️', condition: 'Mostly Sunny', precipitation: 5 },
    { day: 'Thursday', date: 'Jan 16', tempMin: 14, tempMax: 22, icon: '☀️', condition: 'Sunny', precipitation: 0 },
    { day: 'Friday', date: 'Jan 17', tempMin: 15, tempMax: 24, icon: '☀️', condition: 'Clear', precipitation: 0 },
]

const savedLocations = [
    { name: 'New York', country: 'US', temp: 2, icon: '❄️', condition: 'Snowing' },
    { name: 'London', country: 'UK', temp: 8, icon: '🌧️', condition: 'Rainy' },
    { name: 'Tokyo', country: 'JP', temp: 12, icon: '☀️', condition: 'Sunny' },
    { name: 'Sydney', country: 'AU', temp: 28, icon: '⛅', condition: 'Partly Cloudy' },
]

// ========================================
// WEATHER ICON COMPONENT
// ========================================

function WeatherIcon({ condition, size = 'md' }: { condition: string; size?: 'sm' | 'md' | 'lg' | 'xl' }) {
    const sizeClasses = {
        sm: 'text-2xl',
        md: 'text-4xl',
        lg: 'text-6xl',
        xl: 'text-8xl',
    }

    return <span className={sizeClasses[size]}>{condition}</span>
}

// ========================================
// CURRENT WEATHER
// ========================================

function CurrentWeather({ weather }: { weather: WeatherData }) {
    return (
        <motion.div
            className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-3xl p-8 text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
        >
            <div className="flex items-start justify-between mb-6">
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <MapPin className="w-5 h-5" />
                        <span className="text-lg">{weather.location}, {weather.country}</span>
                    </div>
                    <p className="text-blue-100">{weather.description}</p>
                </div>
                <button className="p-2 bg-white/20 rounded-xl hover:bg-white/30">
                    <RefreshCw className="w-5 h-5" />
                </button>
            </div>

            <div className="flex items-center justify-between">
                <div>
                    <div className="flex items-start">
                        <span className="text-8xl font-light">{weather.temp}</span>
                        <span className="text-3xl mt-4">°C</span>
                    </div>
                    <p className="text-xl text-blue-100">{weather.condition}</p>
                </div>
                <div className="text-9xl">{weather.icon}</div>
            </div>

            <div className="flex items-center gap-6 mt-6 text-blue-100">
                <div className="flex items-center gap-2">
                    <Thermometer className="w-5 h-5" />
                    <span>Feels like {weather.feelsLike}°</span>
                </div>
                <div className="flex items-center gap-2">
                    <ChevronDown className="w-5 h-5 text-blue-300" />
                    <span>{weather.tempMin}°</span>
                </div>
                <div className="flex items-center gap-2">
                    <ChevronDown className="w-5 h-5 rotate-180 text-orange-300" />
                    <span>{weather.tempMax}°</span>
                </div>
            </div>
        </motion.div>
    )
}

// ========================================
// WEATHER DETAILS
// ========================================

function WeatherDetails({ weather }: { weather: WeatherData }) {
    const details = [
        { icon: <Wind className="w-5 h-5" />, label: 'Wind', value: `${weather.windSpeed} km/h ${weather.windDirection}` },
        { icon: <Droplets className="w-5 h-5" />, label: 'Humidity', value: `${weather.humidity}%` },
        { icon: <Eye className="w-5 h-5" />, label: 'Visibility', value: `${weather.visibility} km` },
        { icon: <Compass className="w-5 h-5" />, label: 'Pressure', value: `${weather.pressure} hPa` },
        { icon: <Sun className="w-5 h-5" />, label: 'UV Index', value: weather.uv.toString() },
        { icon: <Sunrise className="w-5 h-5" />, label: 'Sunrise', value: weather.sunrise },
        { icon: <Sunset className="w-5 h-5" />, label: 'Sunset', value: weather.sunset },
        { icon: <Umbrella className="w-5 h-5" />, label: 'Precipitation', value: '10%' },
    ]

    return (
        <motion.div
            className="bg-white rounded-3xl p-6 shadow-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
        >
            <h3 className="font-bold text-lg mb-4">Weather Details</h3>
            <div className="grid grid-cols-2 gap-4">
                {details.map((detail) => (
                    <div key={detail.label} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                        <div className="text-blue-500">{detail.icon}</div>
                        <div>
                            <p className="text-xs text-gray-500">{detail.label}</p>
                            <p className="font-semibold">{detail.value}</p>
                        </div>
                    </div>
                ))}
            </div>
        </motion.div>
    )
}

// ========================================
// HOURLY FORECAST
// ========================================

function HourlyForecastSection({ forecast }: { forecast: HourlyForecast[] }) {
    return (
        <motion.div
            className="bg-white rounded-3xl p-6 shadow-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
        >
            <h3 className="font-bold text-lg mb-4">Hourly Forecast</h3>
            <div className="flex gap-4 overflow-x-auto pb-2">
                {forecast.map((hour, index) => (
                    <motion.div
                        key={hour.time}
                        className="flex flex-col items-center gap-2 min-w-[60px] p-3 rounded-2xl bg-gray-50"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                    >
                        <span className="text-sm text-gray-500">{hour.time}</span>
                        <span className="text-2xl">{hour.icon}</span>
                        <span className="font-semibold">{hour.temp}°</span>
                        {hour.precipitation > 0 && (
                            <span className="text-xs text-blue-500">{hour.precipitation}%</span>
                        )}
                    </motion.div>
                ))}
            </div>
        </motion.div>
    )
}

// ========================================
// DAILY FORECAST
// ========================================

function DailyForecastSection({ forecast }: { forecast: DailyForecast[] }) {
    return (
        <motion.div
            className="bg-white rounded-3xl p-6 shadow-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
        >
            <h3 className="font-bold text-lg mb-4">7-Day Forecast</h3>
            <div className="space-y-3">
                {forecast.map((day, index) => (
                    <motion.div
                        key={day.day}
                        className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 transition-colors"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                    >
                        <div className="w-24">
                            <p className="font-medium">{day.day}</p>
                            <p className="text-xs text-gray-500">{day.date}</p>
                        </div>
                        <span className="text-3xl">{day.icon}</span>
                        <div className="flex-1">
                            <p className="text-sm">{day.condition}</p>
                        </div>
                        {day.precipitation > 0 && (
                            <div className="flex items-center gap-1 text-blue-500 text-sm">
                                <Droplets className="w-4 h-4" />
                                {day.precipitation}%
                            </div>
                        )}
                        <div className="flex items-center gap-3 w-24 justify-end">
                            <span className="font-semibold">{day.tempMax}°</span>
                            <span className="text-gray-400">{day.tempMin}°</span>
                        </div>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    )
}

// ========================================
// SAVED LOCATIONS
// ========================================

function SavedLocations() {
    return (
        <motion.div
            className="bg-white rounded-3xl p-6 shadow-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
        >
            <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-lg">Saved Locations</h3>
                <button className="p-2 hover:bg-gray-100 rounded-xl">
                    <Plus className="w-5 h-5" />
                </button>
            </div>
            <div className="grid grid-cols-2 gap-3">
                {savedLocations.map((loc) => (
                    <button
                        key={loc.name}
                        className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors text-left"
                    >
                        <span className="text-2xl">{loc.icon}</span>
                        <div className="flex-1">
                            <p className="font-medium">{loc.name}</p>
                            <p className="text-xs text-gray-500">{loc.country}</p>
                        </div>
                        <span className="text-xl font-semibold">{loc.temp}°</span>
                    </button>
                ))}
            </div>
        </motion.div>
    )
}

// ========================================
// HEADER
// ========================================

function Header() {
    const [searchQuery, setSearchQuery] = useState('')

    return (
        <header className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                    <Cloud className="w-6 h-6 text-white" />
                </div>
                <div>
                    <h1 className="text-xl font-bold">WeatherNow</h1>
                    <p className="text-sm text-gray-500">Live weather updates</p>
                </div>
            </div>

            <div className="flex items-center gap-4">
                <div className="relative hidden md:block">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search location..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-64 pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <button className="p-2.5 bg-white border border-gray-200 rounded-xl hover:bg-gray-50">
                    <Settings className="w-5 h-5" />
                </button>
            </div>
        </header>
    )
}

// ========================================
// MAIN PAGE
// ========================================

export default function WeatherAppPage() {
    return (
        <div className="min-h-screen bg-gray-100 p-6 md:p-8">
            <div className="max-w-6xl mx-auto">
                <Header />

                <div className="grid lg:grid-cols-3 gap-6">
                    {/* Main column */}
                    <div className="lg:col-span-2 space-y-6">
                        <CurrentWeather weather={currentWeather} />
                        <HourlyForecastSection forecast={hourlyForecast} />
                        <DailyForecastSection forecast={dailyForecast} />
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        <WeatherDetails weather={currentWeather} />
                        <SavedLocations />
                    </div>
                </div>

                {/* Footer */}
                <div className="text-center mt-12 text-gray-500 text-sm">
                    Demo by{' '}
                    <Link href="/" className="text-blue-600 hover:underline">
                        YourName
                    </Link>
                </div>
            </div>
        </div>
    )
}
