import type { Config } from 'tailwindcss'

const config: Config = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                background: '#FAFAFA',
                foreground: '#1a1a1a',
                muted: '#666666',
                accent: {
                    primary: '#0066FF',
                    secondary: '#00D4AA',
                },
                glass: {
                    white: 'rgba(255, 255, 255, 0.7)',
                    border: 'rgba(0, 0, 0, 0.08)',
                },
            },
            fontFamily: {
                sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
            },
            fontSize: {
                'display-lg': ['5rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
                'display-md': ['3.5rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
                'display-sm': ['2.5rem', { lineHeight: '1.2', letterSpacing: '-0.02em' }],
                'heading-lg': ['2.25rem', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
                'heading-md': ['1.75rem', { lineHeight: '1.3', letterSpacing: '-0.01em' }],
                'heading-sm': ['1.25rem', { lineHeight: '1.4' }],
            },
            boxShadow: {
                'glass': '0 8px 32px rgba(0, 0, 0, 0.04)',
                'glass-hover': '0 16px 48px rgba(0, 0, 0, 0.08)',
                'glow-blue': '0 0 40px rgba(0, 102, 255, 0.3)',
                'glow-teal': '0 0 40px rgba(0, 212, 170, 0.3)',
            },
            backdropBlur: {
                'glass': '24px',
            },
            borderRadius: {
                '2xl': '1rem',
                '3xl': '1.5rem',
                '4xl': '2rem',
            },
            animation: {
                'float': 'float 6s ease-in-out infinite',
                'float-slow': 'float 8s ease-in-out infinite',
                'pulse-slow': 'pulse 3s ease-in-out infinite',
                'gradient': 'gradient 15s ease infinite',
                'fade-in': 'fadeIn 0.5s ease-out forwards',
                'fade-in-up': 'fadeInUp 0.6s ease-out forwards',
                'scale-in': 'scaleIn 0.4s ease-out forwards',
                'slide-in-right': 'slideInRight 0.5s ease-out forwards',
                'bounce-gentle': 'bounceGentle 2s ease-in-out infinite',
                'spin-slow': 'spin 20s linear infinite',
                'typing': 'typing 3.5s steps(40, end), blink 0.75s step-end infinite',
            },
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translateY(0px)' },
                    '50%': { transform: 'translateY(-20px)' },
                },
                gradient: {
                    '0%, 100%': { backgroundPosition: '0% 50%' },
                    '50%': { backgroundPosition: '100% 50%' },
                },
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                fadeInUp: {
                    '0%': { opacity: '0', transform: 'translateY(30px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                scaleIn: {
                    '0%': { opacity: '0', transform: 'scale(0.9)' },
                    '100%': { opacity: '1', transform: 'scale(1)' },
                },
                slideInRight: {
                    '0%': { opacity: '0', transform: 'translateX(30px)' },
                    '100%': { opacity: '1', transform: 'translateX(0)' },
                },
                bounceGentle: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-10px)' },
                },
                typing: {
                    'from': { width: '0' },
                    'to': { width: '100%' },
                },
                blink: {
                    'from, to': { borderColor: 'transparent' },
                    '50%': { borderColor: 'currentColor' },
                },
            },
            transitionTimingFunction: {
                'bounce-in': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
                'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
            },
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
                'gradient-subtle': 'linear-gradient(135deg, #F0F4FF 0%, #FFF0F5 50%, #F0FFF4 100%)',
                'gradient-mesh': 'radial-gradient(at 40% 20%, hsla(217, 100%, 95%, 1) 0px, transparent 50%), radial-gradient(at 80% 0%, hsla(189, 100%, 95%, 1) 0px, transparent 50%), radial-gradient(at 0% 50%, hsla(339, 100%, 95%, 1) 0px, transparent 50%)',
            },
        },
    },
    plugins: [],
}

export default config
