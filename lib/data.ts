// ========================================
// PROJECTS DATA
// ========================================

import { Project, Skill, Testimonial } from './types'

export const projects: Project[] = [
    {
        id: 'discord-bot-1',
        title: 'Premium Discord Bot',
        description: 'Multi-purpose bot with AI-powered features',
        longDescription: 'A fully-featured Discord bot with music playback, advanced moderation, custom economy system, and AI-powered responses using GPT-4. Currently serving over 100+ active servers with 99.9% uptime. Features include auto-moderation, welcome/farewell messages, role management, and custom commands.',
        image: '/projects/bot1.png',
        emoji: '🤖',
        tags: ['Featured', 'Production'],
        techStack: ['Python', 'Discord.py', 'MongoDB', 'OpenAI', 'Redis'],
        liveUrl: 'https://discord.com/oauth2/authorize',
        githubUrl: 'https://github.com',
        featured: true,
        features: [
            'AI-powered chat responses with GPT-4',
            'High-quality music playback with queue management',
            'Advanced moderation with auto-mod rules',
            'Custom economy and leveling system',
            'Dashboard for server configuration',
        ],
    },
    {
        id: 'automation-suite',
        title: 'Automation Suite',
        description: 'Python tools for web scraping & data processing',
        longDescription: 'A comprehensive suite of automation scripts for web scraping, data extraction, and processing. Built to handle millions of records daily with built-in error recovery, logging, and notification systems.',
        image: '/projects/automation.png',
        emoji: '⚡',
        tags: ['Automation'],
        techStack: ['Python', 'Selenium', 'BeautifulSoup', 'Pandas', 'Celery'],
        githubUrl: 'https://github.com',
        features: [
            'Multi-threaded scraping for high performance',
            'Automatic proxy rotation and CAPTCHA solving',
            'Data cleaning and transformation pipelines',
            'Export to multiple formats (CSV, JSON, Excel)',
        ],
    },
    {
        id: 'music-bot',
        title: 'Music Bot Pro',
        description: 'High-quality music playback for Discord',
        longDescription: 'Premium music bot with Spotify integration, queue management, custom playlists, and audio effects. Supports YouTube, Spotify, SoundCloud, and more with crystal-clear 320kbps audio.',
        image: '/projects/music.png',
        emoji: '🎵',
        tags: ['Music', 'Production'],
        techStack: ['Python', 'Lavalink', 'Spotify API', 'Redis', 'PostgreSQL'],
        liveUrl: 'https://discord.com/oauth2/authorize',
        features: [
            'Support for YouTube, Spotify, SoundCloud',
            'Advanced queue management with shuffle',
            'Audio filters (bass boost, nightcore, etc.)',
            '24/7 playback mode',
        ],
    },
    {
        id: 'moderation-bot',
        title: 'AutoMod System',
        description: 'AI-powered moderation for communities',
        longDescription: 'Intelligent moderation bot with machine learning-based content filtering, raid protection, and customizable auto-responses. Protects over 50+ servers from spam, raids, and inappropriate content.',
        image: '/projects/mod.png',
        emoji: '🛡️',
        tags: ['Security', 'AI'],
        techStack: ['Python', 'TensorFlow', 'PostgreSQL', 'Redis', 'FastAPI'],
        githubUrl: 'https://github.com',
        features: [
            'ML-powered spam and toxicity detection',
            'Raid protection with auto-lockdown',
            'Customizable word filters and rules',
            'Comprehensive logging and analytics',
        ],
    },
    {
        id: 'trading-bot',
        title: 'Crypto Trading Bot',
        description: 'Automated trading with technical analysis',
        longDescription: 'Crypto trading bot with real-time market analysis, multiple trading strategies, and comprehensive risk management. Backtested on 5 years of historical data with consistent positive returns.',
        image: '/projects/trading.png',
        emoji: '📈',
        tags: ['Crypto', 'Private'],
        techStack: ['Python', 'ccxt', 'NumPy', 'TA-Lib', 'PostgreSQL'],
        features: [
            'Multiple trading strategies (DCA, Grid, etc.)',
            'Real-time technical analysis',
            'Risk management with stop-loss/take-profit',
            'Telegram notifications',
        ],
    },
    {
        id: 'api-wrapper',
        title: 'API Wrapper Library',
        description: 'Easy-to-use Python library for Discord API',
        longDescription: 'A lightweight, async-first Python wrapper for the Discord API with full type hints, automatic rate limiting, and comprehensive documentation. Makes building Discord bots easier and faster.',
        image: '/projects/api.png',
        emoji: '📦',
        tags: ['Open Source'],
        techStack: ['Python', 'aiohttp', 'pytest', 'Sphinx'],
        githubUrl: 'https://github.com',
        features: [
            '100% async/await support',
            'Full type hints for IDE autocompletion',
            'Automatic rate limit handling',
            'Comprehensive documentation and examples',
        ],
    },
]

// ========================================
// SKILLS DATA
// ========================================

export const skills: Skill[] = [
    { name: 'Python', level: 95, color: '#3776AB' },
    { name: 'Discord.py', level: 90, color: '#5865F2' },
    { name: 'JavaScript', level: 85, color: '#F7DF1E' },
    { name: 'TypeScript', level: 80, color: '#3178C6' },
    { name: 'React', level: 75, color: '#61DAFB' },
    { name: 'Node.js', level: 80, color: '#339933' },
    { name: 'AI/ML', level: 70, color: '#FF6B6B' },
    { name: 'Web Scraping', level: 85, color: '#00D4AA' },
    { name: 'Automation', level: 90, color: '#9B59B6' },
    { name: 'APIs', level: 88, color: '#FF9500' },
    { name: 'SQL', level: 75, color: '#336791' },
    { name: 'Git', level: 85, color: '#F05032' },
]

// ========================================
// TESTIMONIALS DATA
// ========================================

export const testimonials: Testimonial[] = [
    {
        id: '1',
        name: 'John Doe',
        role: 'Server Owner • 50k+ members',
        content: 'Absolutely incredible work! The bot exceeded all expectations. Fast delivery, great communication, and the code quality is top-notch. Will definitely work with again!',
        rating: 5,
    },
    {
        id: '2',
        name: 'Jane Smith',
        role: 'Community Manager',
        content: 'Best developer I\'ve worked with. The automation scripts saved our team hours of manual work every day. Professional and responsive throughout the project.',
        rating: 5,
    },
    {
        id: '3',
        name: 'Mike Johnson',
        role: 'Startup Founder',
        content: 'Amazing talent for such a young developer! Delivered exactly what we needed for our Discord community. Highly recommend for any bot development needs.',
        rating: 5,
    },
]
