'use client'

import { forwardRef, InputHTMLAttributes, TextareaHTMLAttributes, useState, useId } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import { Check, AlertCircle } from 'lucide-react'

// ========================================
// TEXT INPUT
// ========================================

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string
    error?: string
    success?: boolean
    icon?: React.ReactNode
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ label, error, success, icon, className, id, ...props }, ref) => {
        const [isFocused, setIsFocused] = useState(false)
        const [hasValue, setHasValue] = useState(false)
        const generatedId = useId()
        const inputId = id || generatedId

        return (
            <div className="relative w-full">
                {/* Floating Label */}
                {label && (
                    <motion.label
                        htmlFor={inputId}
                        className={cn(
                            'absolute left-4 pointer-events-none transition-all duration-200 ease-out',
                            'text-muted',
                            (isFocused || hasValue)
                                ? 'top-2 text-xs font-medium'
                                : 'top-1/2 -translate-y-1/2 text-base'
                        )}
                        animate={{
                            color: error ? '#ef4444' : isFocused ? '#0066FF' : '#666666',
                        }}
                    >
                        {label}
                    </motion.label>
                )}

                {/* Input Field */}
                <input
                    ref={ref}
                    id={inputId}
                    className={cn(
                        'w-full px-4 pt-6 pb-2 bg-white/70 backdrop-blur-lg',
                        'border rounded-2xl text-foreground text-base',
                        'transition-all duration-300 ease-out',
                        'placeholder:text-transparent',
                        'focus:outline-none focus:ring-0',
                        error
                            ? 'border-red-400 focus:border-red-500'
                            : success
                                ? 'border-green-400 focus:border-green-500'
                                : 'border-black/[0.08] focus:border-accent-primary',
                        icon && 'pr-12',
                        className
                    )}
                    onFocus={() => setIsFocused(true)}
                    onBlur={(e) => {
                        setIsFocused(false)
                        setHasValue(e.target.value.length > 0)
                    }}
                    onChange={(e) => setHasValue(e.target.value.length > 0)}
                    aria-invalid={!!error}
                    aria-describedby={error ? `${inputId}-error` : undefined}
                    {...props}
                />

                {/* Icon / Status Indicator */}
                <div className="absolute right-4 top-1/2 -translate-y-1/2">
                    {error ? (
                        <AlertCircle className="w-5 h-5 text-red-500" />
                    ) : success ? (
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                        >
                            <Check className="w-5 h-5 text-green-500" />
                        </motion.div>
                    ) : icon ? (
                        icon
                    ) : null}
                </div>

                {/* Error Message */}
                <AnimatePresence>
                    {error && (
                        <motion.p
                            id={`${inputId}-error`}
                            className="mt-2 text-sm text-red-500 pl-4"
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                        >
                            {error}
                        </motion.p>
                    )}
                </AnimatePresence>
            </div>
        )
    }
)

Input.displayName = 'Input'

// ========================================
// TEXTAREA
// ========================================

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: string
    error?: string
    autoExpand?: boolean
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
    ({ label, error, autoExpand = true, className, id, ...props }, ref) => {
        const [isFocused, setIsFocused] = useState(false)
        const [hasValue, setHasValue] = useState(false)
        const generatedId = useId()
        const textareaId = id || generatedId

        const handleInput = (e: React.FormEvent<HTMLTextAreaElement>) => {
            if (autoExpand) {
                const target = e.currentTarget
                target.style.height = 'auto'
                target.style.height = `${target.scrollHeight}px`
            }
            setHasValue(e.currentTarget.value.length > 0)
        }

        return (
            <div className="relative w-full">
                {/* Floating Label */}
                {label && (
                    <motion.label
                        htmlFor={textareaId}
                        className={cn(
                            'absolute left-4 pointer-events-none transition-all duration-200 ease-out',
                            'text-muted',
                            (isFocused || hasValue)
                                ? 'top-2 text-xs font-medium'
                                : 'top-6 text-base'
                        )}
                        animate={{
                            color: error ? '#ef4444' : isFocused ? '#0066FF' : '#666666',
                        }}
                    >
                        {label}
                    </motion.label>
                )}

                {/* Textarea Field */}
                <textarea
                    ref={ref}
                    id={textareaId}
                    className={cn(
                        'w-full px-4 pt-6 pb-4 bg-white/70 backdrop-blur-lg',
                        'border rounded-2xl text-foreground text-base',
                        'transition-all duration-300 ease-out resize-none',
                        'min-h-[120px]',
                        'placeholder:text-transparent',
                        'focus:outline-none focus:ring-0',
                        error
                            ? 'border-red-400 focus:border-red-500'
                            : 'border-black/[0.08] focus:border-accent-primary',
                        className
                    )}
                    onFocus={() => setIsFocused(true)}
                    onBlur={(e) => {
                        setIsFocused(false)
                        setHasValue(e.target.value.length > 0)
                    }}
                    onInput={handleInput}
                    aria-invalid={!!error}
                    aria-describedby={error ? `${textareaId}-error` : undefined}
                    {...props}
                />

                {/* Error Message */}
                <AnimatePresence>
                    {error && (
                        <motion.p
                            id={`${textareaId}-error`}
                            className="mt-2 text-sm text-red-500 pl-4"
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                        >
                            {error}
                        </motion.p>
                    )}
                </AnimatePresence>
            </div>
        )
    }
)

Textarea.displayName = 'Textarea'

// ========================================
// FORM GROUP
// ========================================

interface FormGroupProps {
    children: React.ReactNode
    className?: string
}

export function FormGroup({ children, className }: FormGroupProps) {
    return (
        <div className={cn('space-y-6', className)}>
            {children}
        </div>
    )
}
