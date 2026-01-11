import { Variants } from 'framer-motion'

/**
 * Premium animation variants for Framer Motion
 * All animations are optimized for 120fps smoothness
 */

// ========================================
// FADE ANIMATIONS
// ========================================

export const fadeIn: Variants = {
    hidden: {
        opacity: 0
    },
    visible: {
        opacity: 1,
        transition: {
            duration: 0.5,
            ease: [0.25, 0.1, 0.25, 1],
        },
    },
}

export const fadeInUp: Variants = {
    hidden: {
        opacity: 0,
        y: 30,
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            ease: [0.25, 0.1, 0.25, 1],
        },
    },
}

export const fadeInDown: Variants = {
    hidden: {
        opacity: 0,
        y: -30,
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            ease: [0.25, 0.1, 0.25, 1],
        },
    },
}

export const fadeInLeft: Variants = {
    hidden: {
        opacity: 0,
        x: -30,
    },
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            duration: 0.6,
            ease: [0.25, 0.1, 0.25, 1],
        },
    },
}

export const fadeInRight: Variants = {
    hidden: {
        opacity: 0,
        x: 30,
    },
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            duration: 0.6,
            ease: [0.25, 0.1, 0.25, 1],
        },
    },
}

// ========================================
// SCALE ANIMATIONS
// ========================================

export const scaleIn: Variants = {
    hidden: {
        opacity: 0,
        scale: 0.9,
    },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            duration: 0.4,
            ease: [0.25, 0.1, 0.25, 1],
        },
    },
}

export const scaleInBounce: Variants = {
    hidden: {
        opacity: 0,
        scale: 0.8,
    },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            type: 'spring',
            stiffness: 400,
            damping: 25,
        },
    },
}

// ========================================
// STAGGER CONTAINERS
// ========================================

export const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.1,
        },
    },
}

export const staggerContainerFast: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.05,
            delayChildren: 0.05,
        },
    },
}

export const staggerContainerSlow: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15,
            delayChildren: 0.2,
        },
    },
}

// ========================================
// HOVER ANIMATIONS
// ========================================

export const hoverLift = {
    rest: {
        y: 0,
        scale: 1,
        transition: {
            duration: 0.3,
            ease: [0.25, 0.1, 0.25, 1],
        },
    },
    hover: {
        y: -4,
        scale: 1.02,
        transition: {
            duration: 0.3,
            ease: [0.25, 0.1, 0.25, 1],
        },
    },
    tap: {
        scale: 0.98,
        transition: {
            duration: 0.1,
        },
    },
}

export const hoverScale = {
    rest: {
        scale: 1,
        transition: {
            duration: 0.3,
            ease: [0.25, 0.1, 0.25, 1],
        },
    },
    hover: {
        scale: 1.05,
        transition: {
            duration: 0.3,
            ease: [0.25, 0.1, 0.25, 1],
        },
    },
    tap: {
        scale: 0.95,
        transition: {
            duration: 0.1,
        },
    },
}

export const hoverGlow = {
    rest: {
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.04)',
        transition: {
            duration: 0.3,
            ease: [0.25, 0.1, 0.25, 1],
        },
    },
    hover: {
        boxShadow: '0 16px 48px rgba(0, 0, 0, 0.08)',
        transition: {
            duration: 0.3,
            ease: [0.25, 0.1, 0.25, 1],
        },
    },
}

// ========================================
// CARD ANIMATIONS
// ========================================

export const cardVariants: Variants = {
    hidden: {
        opacity: 0,
        y: 40,
        scale: 0.95,
    },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            duration: 0.5,
            ease: [0.25, 0.1, 0.25, 1],
        },
    },
}

export const cardHover = {
    rest: {
        y: 0,
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.04)',
        transition: {
            duration: 0.3,
            ease: [0.25, 0.1, 0.25, 1],
        },
    },
    hover: {
        y: -8,
        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.1)',
        transition: {
            duration: 0.3,
            ease: [0.25, 0.1, 0.25, 1],
        },
    },
}

// ========================================
// BUTTON ANIMATIONS
// ========================================

export const buttonVariants = {
    rest: {
        scale: 1,
        transition: {
            duration: 0.2,
            ease: [0.25, 0.1, 0.25, 1],
        },
    },
    hover: {
        scale: 1.02,
        transition: {
            duration: 0.2,
            ease: [0.25, 0.1, 0.25, 1],
        },
    },
    tap: {
        scale: 0.98,
        transition: {
            duration: 0.1,
        },
    },
}

// ========================================
// TEXT ANIMATIONS
// ========================================

export const textReveal: Variants = {
    hidden: {
        opacity: 0,
        y: 20,
    },
    visible: (i: number = 0) => ({
        opacity: 1,
        y: 0,
        transition: {
            delay: i * 0.05,
            duration: 0.5,
            ease: [0.25, 0.1, 0.25, 1],
        },
    }),
}

export const letterAnimation: Variants = {
    hidden: {
        opacity: 0,
        y: 50,
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
            ease: [0.25, 0.1, 0.25, 1],
        },
    },
}

// ========================================
// SLIDE ANIMATIONS
// ========================================

export const slideInFromLeft: Variants = {
    hidden: {
        x: -100,
        opacity: 0,
    },
    visible: {
        x: 0,
        opacity: 1,
        transition: {
            duration: 0.6,
            ease: [0.25, 0.1, 0.25, 1],
        },
    },
}

export const slideInFromRight: Variants = {
    hidden: {
        x: 100,
        opacity: 0,
    },
    visible: {
        x: 0,
        opacity: 1,
        transition: {
            duration: 0.6,
            ease: [0.25, 0.1, 0.25, 1],
        },
    },
}

export const slideInFromBottom: Variants = {
    hidden: {
        y: 100,
        opacity: 0,
    },
    visible: {
        y: 0,
        opacity: 1,
        transition: {
            duration: 0.6,
            ease: [0.25, 0.1, 0.25, 1],
        },
    },
}

// ========================================
// FLOATING / CONTINUOUS ANIMATIONS
// ========================================

export const floatingAnimation = {
    initial: { y: 0 },
    animate: {
        y: [-10, 10, -10],
        transition: {
            duration: 6,
            repeat: Infinity,
            repeatType: 'loop' as const,
            ease: 'easeInOut',
        },
    },
}

export const rotatingAnimation = {
    initial: { rotate: 0 },
    animate: {
        rotate: 360,
        transition: {
            duration: 20,
            repeat: Infinity,
            repeatType: 'loop' as const,
            ease: 'linear',
        },
    },
}

export const pulsingAnimation = {
    initial: { scale: 1, opacity: 1 },
    animate: {
        scale: [1, 1.05, 1],
        opacity: [1, 0.8, 1],
        transition: {
            duration: 2,
            repeat: Infinity,
            repeatType: 'loop' as const,
            ease: 'easeInOut',
        },
    },
}

// ========================================
// SCROLL TRIGGERED ANIMATIONS
// ========================================

export const scrollFadeIn: Variants = {
    offscreen: {
        opacity: 0,
        y: 50,
    },
    onscreen: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            ease: [0.25, 0.1, 0.25, 1],
        },
    },
}

export const scrollScaleIn: Variants = {
    offscreen: {
        opacity: 0,
        scale: 0.8,
    },
    onscreen: {
        opacity: 1,
        scale: 1,
        transition: {
            duration: 0.5,
            ease: [0.25, 0.1, 0.25, 1],
        },
    },
}

// ========================================
// MODAL / OVERLAY ANIMATIONS
// ========================================

export const modalOverlay: Variants = {
    hidden: {
        opacity: 0,
    },
    visible: {
        opacity: 1,
        transition: {
            duration: 0.3,
        },
    },
    exit: {
        opacity: 0,
        transition: {
            duration: 0.2,
        },
    },
}

export const modalContent: Variants = {
    hidden: {
        opacity: 0,
        scale: 0.95,
        y: 20,
    },
    visible: {
        opacity: 1,
        scale: 1,
        y: 0,
        transition: {
            type: 'spring',
            stiffness: 400,
            damping: 30,
        },
    },
    exit: {
        opacity: 0,
        scale: 0.95,
        y: 20,
        transition: {
            duration: 0.2,
        },
    },
}

// ========================================
// TOAST ANIMATIONS
// ========================================

export const toastVariants: Variants = {
    hidden: {
        opacity: 0,
        y: -20,
        scale: 0.95,
    },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            type: 'spring',
            stiffness: 400,
            damping: 25,
        },
    },
    exit: {
        opacity: 0,
        y: -20,
        scale: 0.95,
        transition: {
            duration: 0.2,
        },
    },
}

// ========================================
// PAGE TRANSITIONS
// ========================================

export const pageTransition: Variants = {
    initial: {
        opacity: 0,
    },
    animate: {
        opacity: 1,
        transition: {
            duration: 0.4,
            ease: [0.25, 0.1, 0.25, 1],
        },
    },
    exit: {
        opacity: 0,
        transition: {
            duration: 0.3,
        },
    },
}

// ========================================
// SPRING CONFIGURATIONS
// ========================================

export const springConfig = {
    gentle: { type: 'spring', stiffness: 120, damping: 14 },
    wobbly: { type: 'spring', stiffness: 180, damping: 12 },
    stiff: { type: 'spring', stiffness: 400, damping: 30 },
    slow: { type: 'spring', stiffness: 80, damping: 20 },
    molasses: { type: 'spring', stiffness: 40, damping: 15 },
} as const

// ========================================
// EASING CURVES
// ========================================

export const easings = {
    smooth: [0.25, 0.1, 0.25, 1],
    easeOut: [0, 0, 0.2, 1],
    easeIn: [0.4, 0, 1, 1],
    easeInOut: [0.4, 0, 0.2, 1],
    bounce: [0.68, -0.55, 0.265, 1.55],
    expo: [0.16, 1, 0.3, 1],
} as const

// ========================================
// VIEWPORT CONFIG
// ========================================

export const viewportConfig = {
    once: true,
    margin: '-100px',
    amount: 0.3,
} as const
