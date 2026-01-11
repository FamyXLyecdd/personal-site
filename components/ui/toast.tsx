'use client'

import { createContext, useContext, useState, useCallback, ReactNode } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import { toastVariants } from '@/lib/animations'
import { X, Check, AlertCircle, Info, AlertTriangle } from 'lucide-react'

// ========================================
// TOAST TYPES
// ========================================

type ToastType = 'success' | 'error' | 'warning' | 'info'

interface Toast {
    id: string
    message: string
    type: ToastType
    duration?: number
}

interface ToastContextType {
    toasts: Toast[]
    addToast: (message: string, type?: ToastType, duration?: number) => void
    removeToast: (id: string) => void
    success: (message: string, duration?: number) => void
    error: (message: string, duration?: number) => void
    warning: (message: string, duration?: number) => void
    info: (message: string, duration?: number) => void
}

const ToastContext = createContext<ToastContextType | null>(null)

// ========================================
// HOOK
// ========================================

export function useToast() {
    const context = useContext(ToastContext)
    if (!context) {
        throw new Error('useToast must be used within a ToastProvider')
    }
    return context
}

// ========================================
// PROVIDER
// ========================================

interface ToastProviderProps {
    children: ReactNode
}

export function ToastProvider({ children }: ToastProviderProps) {
    const [toasts, setToasts] = useState<Toast[]>([])

    const removeToast = useCallback((id: string) => {
        setToasts((prev) => prev.filter((toast) => toast.id !== id))
    }, [])

    const addToast = useCallback(
        (message: string, type: ToastType = 'info', duration: number = 3000) => {
            const id = `toast-${Date.now()}-${Math.random().toString(36).slice(2)}`

            setToasts((prev) => [...prev, { id, message, type, duration }])

            // Auto dismiss
            if (duration > 0) {
                setTimeout(() => {
                    removeToast(id)
                }, duration)
            }
        },
        [removeToast]
    )

    const success = useCallback(
        (message: string, duration?: number) => addToast(message, 'success', duration),
        [addToast]
    )

    const error = useCallback(
        (message: string, duration?: number) => addToast(message, 'error', duration),
        [addToast]
    )

    const warning = useCallback(
        (message: string, duration?: number) => addToast(message, 'warning', duration),
        [addToast]
    )

    const info = useCallback(
        (message: string, duration?: number) => addToast(message, 'info', duration),
        [addToast]
    )

    return (
        <ToastContext.Provider
            value={{ toasts, addToast, removeToast, success, error, warning, info }}
        >
            {children}
            <ToastContainer toasts={toasts} onRemove={removeToast} />
        </ToastContext.Provider>
    )
}

// ========================================
// TOAST CONTAINER
// ========================================

interface ToastContainerProps {
    toasts: Toast[]
    onRemove: (id: string) => void
}

function ToastContainer({ toasts, onRemove }: ToastContainerProps) {
    return (
        <div
            className="fixed top-4 right-4 z-[9999] flex flex-col gap-3 max-w-[400px] w-full pointer-events-none"
            aria-live="polite"
            aria-label="Notifications"
        >
            <AnimatePresence mode="popLayout">
                {toasts.map((toast) => (
                    <ToastItem key={toast.id} toast={toast} onRemove={onRemove} />
                ))}
            </AnimatePresence>
        </div>
    )
}

// ========================================
// TOAST ITEM
// ========================================

interface ToastItemProps {
    toast: Toast
    onRemove: (id: string) => void
}

const iconMap: Record<ToastType, typeof Check> = {
    success: Check,
    error: AlertCircle,
    warning: AlertTriangle,
    info: Info,
}

const colorMap: Record<ToastType, { bg: string; icon: string; border: string }> = {
    success: {
        bg: 'bg-green-50/90',
        icon: 'text-green-500',
        border: 'border-green-200',
    },
    error: {
        bg: 'bg-red-50/90',
        icon: 'text-red-500',
        border: 'border-red-200',
    },
    warning: {
        bg: 'bg-amber-50/90',
        icon: 'text-amber-500',
        border: 'border-amber-200',
    },
    info: {
        bg: 'bg-blue-50/90',
        icon: 'text-blue-500',
        border: 'border-blue-200',
    },
}

function ToastItem({ toast, onRemove }: ToastItemProps) {
    const Icon = iconMap[toast.type]
    const colors = colorMap[toast.type]

    return (
        <motion.div
            layout
            variants={toastVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className={cn(
                'pointer-events-auto flex items-center gap-3 p-4 rounded-2xl',
                'backdrop-blur-xl border shadow-lg',
                colors.bg,
                colors.border
            )}
            role="alert"
        >
            <div className={cn('flex-shrink-0', colors.icon)}>
                <Icon className="w-5 h-5" />
            </div>

            <p className="flex-1 text-sm text-foreground font-medium">
                {toast.message}
            </p>

            <button
                onClick={() => onRemove(toast.id)}
                className="flex-shrink-0 p-1 rounded-full hover:bg-black/5 transition-colors"
                aria-label="Dismiss notification"
            >
                <X className="w-4 h-4 text-muted" />
            </button>
        </motion.div>
    )
}

// ========================================
// STANDALONE TOAST COMPONENT (for single use)
// ========================================

interface StandaloneToastProps {
    message: string
    type?: ToastType
    visible: boolean
    onClose: () => void
}

export function StandaloneToast({ message, type = 'info', visible, onClose }: StandaloneToastProps) {
    const Icon = iconMap[type]
    const colors = colorMap[type]

    return (
        <AnimatePresence>
            {visible && (
                <motion.div
                    variants={toastVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className={cn(
                        'fixed top-4 right-4 z-[9999] flex items-center gap-3 p-4 rounded-2xl',
                        'backdrop-blur-xl border shadow-lg max-w-[400px]',
                        colors.bg,
                        colors.border
                    )}
                    role="alert"
                >
                    <div className={cn('flex-shrink-0', colors.icon)}>
                        <Icon className="w-5 h-5" />
                    </div>

                    <p className="flex-1 text-sm text-foreground font-medium">
                        {message}
                    </p>

                    <button
                        onClick={onClose}
                        className="flex-shrink-0 p-1 rounded-full hover:bg-black/5 transition-colors"
                        aria-label="Dismiss notification"
                    >
                        <X className="w-4 h-4 text-muted" />
                    </button>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
