import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { SmoothScrollProvider } from '@/components/providers/smooth-scroll'
import { ToastProvider } from '@/components/ui/toast'
import { CustomCursor } from '@/components/ui/custom-cursor'
import { BackToTop, ScrollProgress } from '@/components/ui/navigation'

// ========================================
// FONTS
// ========================================

const inter = Inter({
    subsets: ['latin'],
    variable: '--font-inter',
    display: 'swap',
})

// ========================================
// METADATA
// ========================================

export const metadata: Metadata = {
    metadataBase: new URL('https://yourwebsite.com'),
    title: 'YourName | Discord Bot Developer & Python Automation Expert',
    description: '16-year-old developer from the Philippines, specializing in premium Discord bots, Python automation, and web scraping. Making ₱20k/mo building things that don\'t suck.',
    keywords: [
        'Discord Bot Developer',
        'Python Developer',
        'Automation Expert',
        'Web Scraping',
        'Discord.py',
        'Freelance Developer',
        'Philippines Developer',
    ],
    authors: [{ name: 'YourName' }],
    creator: 'YourName',
    openGraph: {
        type: 'website',
        locale: 'en_US',
        url: 'https://yourwebsite.com',
        siteName: 'YourName Portfolio',
        title: 'YourName | Discord Bot Developer & Python Expert',
        description: '16-year-old developer specializing in premium Discord bots and Python automation.',
        images: [
            {
                url: '/og-image.png',
                width: 1200,
                height: 630,
                alt: 'YourName - Discord Bot Developer',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'YourName | Discord Bot Developer',
        description: '16-year-old developer specializing in premium Discord bots and Python automation.',
        images: ['/og-image.png'],
        creator: '@yourusername',
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
    icons: {
        icon: '/favicon.ico',
        shortcut: '/favicon-16x16.png',
        apple: '/apple-touch-icon.png',
    },
    manifest: '/site.webmanifest',
}

export const viewport: Viewport = {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
    themeColor: [
        { media: '(prefers-color-scheme: light)', color: '#FAFAFA' },
        { media: '(prefers-color-scheme: dark)', color: '#0a0a0a' },
    ],
}

// ========================================
// ROOT LAYOUT
// ========================================

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en" className={inter.variable}>
            <body className="antialiased bg-background text-foreground">
                <SmoothScrollProvider>
                    <ToastProvider>
                        {/* Skip to content link for accessibility */}
                        <a
                            href="#main-content"
                            className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2 focus:bg-accent-primary focus:text-white focus:rounded-lg"
                        >
                            Skip to content
                        </a>

                        {/* Custom cursor (desktop only) */}
                        <CustomCursor />

                        {/* Scroll progress indicator */}
                        <ScrollProgress />

                        {/* Main content */}
                        <main id="main-content">
                            {children}
                        </main>

                        {/* Back to top button */}
                        <BackToTop />
                    </ToastProvider>
                </SmoothScrollProvider>
            </body>
        </html>
    )
}
