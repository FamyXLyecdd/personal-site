'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    Copy,
    Check,
    Play,
    Code,
    Terminal,
    FileCode,
    Maximize2,
    Minimize2,
    Sun,
    Moon,
    ChevronDown,
    ChevronRight,
    Type,
    Palette,
} from 'lucide-react'
import { cn, copyToClipboard } from '@/lib/utils'

// ========================================
// CODE LANGUAGES
// ========================================

type Language =
    | 'typescript'
    | 'javascript'
    | 'python'
    | 'bash'
    | 'json'
    | 'css'
    | 'html'
    | 'jsx'
    | 'tsx'

const languageConfig: Record<Language, {
    name: string
    icon: React.ReactNode
    color: string
}> = {
    typescript: { name: 'TypeScript', icon: <FileCode className="w-4 h-4" />, color: '#3178C6' },
    javascript: { name: 'JavaScript', icon: <FileCode className="w-4 h-4" />, color: '#F7DF1E' },
    python: { name: 'Python', icon: <FileCode className="w-4 h-4" />, color: '#3776AB' },
    bash: { name: 'Bash', icon: <Terminal className="w-4 h-4" />, color: '#4EAA25' },
    json: { name: 'JSON', icon: <Code className="w-4 h-4" />, color: '#000000' },
    css: { name: 'CSS', icon: <Palette className="w-4 h-4" />, color: '#1572B6' },
    html: { name: 'HTML', icon: <Code className="w-4 h-4" />, color: '#E34F26' },
    jsx: { name: 'JSX', icon: <FileCode className="w-4 h-4" />, color: '#61DAFB' },
    tsx: { name: 'TSX', icon: <FileCode className="w-4 h-4" />, color: '#3178C6' },
}

// ========================================
// SIMPLE SYNTAX HIGHLIGHTING
// ========================================

function highlightCode(code: string, language: Language): React.ReactNode[] {
    // Very basic syntax highlighting - in production you'd use a proper library
    const patterns: Record<string, { regex: RegExp; className: string }[]> = {
        typescript: [
            { regex: /(\/\/.*$)/gm, className: 'text-gray-400' },
            { regex: /(['"`].*?['"`])/g, className: 'text-green-400' },
            { regex: /\b(const|let|var|function|return|if|else|for|while|import|export|from|async|await|class|interface|type|extends|implements)\b/g, className: 'text-purple-400' },
            { regex: /\b(true|false|null|undefined)\b/g, className: 'text-orange-400' },
            { regex: /\b(\d+)\b/g, className: 'text-blue-400' },
        ],
        javascript: [
            { regex: /(\/\/.*$)/gm, className: 'text-gray-400' },
            { regex: /(['"`].*?['"`])/g, className: 'text-green-400' },
            { regex: /\b(const|let|var|function|return|if|else|for|while|import|export|from|async|await|class)\b/g, className: 'text-purple-400' },
            { regex: /\b(true|false|null|undefined)\b/g, className: 'text-orange-400' },
            { regex: /\b(\d+)\b/g, className: 'text-blue-400' },
        ],
        python: [
            { regex: /(#.*$)/gm, className: 'text-gray-400' },
            { regex: /(['"].*?['"])/g, className: 'text-green-400' },
            { regex: /\b(def|class|return|if|else|elif|for|while|import|from|as|try|except|finally|with|lambda)\b/g, className: 'text-purple-400' },
            { regex: /\b(True|False|None)\b/g, className: 'text-orange-400' },
            { regex: /\b(\d+)\b/g, className: 'text-blue-400' },
        ],
        bash: [
            { regex: /(#.*$)/gm, className: 'text-gray-400' },
            { regex: /(['"].*?['"])/g, className: 'text-green-400' },
            { regex: /\b(echo|cd|ls|mkdir|rm|cp|mv|cat|grep|npm|npx|yarn|pnpm|node|python)\b/g, className: 'text-purple-400' },
            { regex: /(\$\w+)/g, className: 'text-blue-400' },
        ],
        json: [
            { regex: /(".*?")\s*:/g, className: 'text-purple-400' },
            { regex: /:\s*(".*?")/g, className: 'text-green-400' },
            { regex: /:\s*(\d+)/g, className: 'text-blue-400' },
            { regex: /:\s*(true|false|null)/g, className: 'text-orange-400' },
        ],
        css: [
            { regex: /(\/\*[\s\S]*?\*\/)/g, className: 'text-gray-400' },
            { regex: /([.#][\w-]+)/g, className: 'text-purple-400' },
            { regex: /([\w-]+)\s*:/g, className: 'text-blue-400' },
            { regex: /:\s*([\w\d#%]+)/g, className: 'text-green-400' },
        ],
        html: [
            { regex: /(&lt;\/?[\w-]+)/g, className: 'text-red-400' },
            { regex: /([\w-]+)=/g, className: 'text-purple-400' },
            { regex: /=(['"].*?['"])/g, className: 'text-green-400' },
        ],
        jsx: [
            { regex: /(\/\/.*$)/gm, className: 'text-gray-400' },
            { regex: /(['"`].*?['"`])/g, className: 'text-green-400' },
            { regex: /(<\/?[\w]+)/g, className: 'text-red-400' },
            { regex: /\b(const|let|var|function|return|if|else|import|export|from)\b/g, className: 'text-purple-400' },
        ],
        tsx: [
            { regex: /(\/\/.*$)/gm, className: 'text-gray-400' },
            { regex: /(['"`].*?['"`])/g, className: 'text-green-400' },
            { regex: /(<\/?[\w]+)/g, className: 'text-red-400' },
            { regex: /\b(const|let|var|function|return|if|else|import|export|from|interface|type)\b/g, className: 'text-purple-400' },
        ],
    }

    // For simplicity, just return the code as-is with basic styling
    // In production, use Prism.js or highlight.js
    return [
        <span key="code" className="text-gray-100">{code}</span>
    ]
}

// ========================================
// CODE BLOCK COMPONENT
// ========================================

interface CodeBlockProps {
    code: string
    language?: Language
    filename?: string
    showLineNumbers?: boolean
    highlightLines?: number[]
    className?: string
    maxHeight?: number
}

export function CodeBlock({
    code,
    language = 'typescript',
    filename,
    showLineNumbers = true,
    highlightLines = [],
    className,
    maxHeight = 400,
}: CodeBlockProps) {
    const [copied, setCopied] = useState(false)
    const [isExpanded, setIsExpanded] = useState(false)

    const lines = code.split('\n')
    const config = languageConfig[language]

    const handleCopy = async () => {
        await copyToClipboard(code)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    return (
        <div className={cn('rounded-xl overflow-hidden border border-black/[0.1]', className)}>
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-2 bg-gray-900 border-b border-gray-800">
                <div className="flex items-center gap-2">
                    {/* Window controls */}
                    <div className="flex gap-1.5">
                        <div className="w-3 h-3 rounded-full bg-red-500" />
                        <div className="w-3 h-3 rounded-full bg-yellow-500" />
                        <div className="w-3 h-3 rounded-full bg-green-500" />
                    </div>

                    {/* Filename / Language */}
                    <div className="flex items-center gap-2 ml-3">
                        <span style={{ color: config.color }}>{config.icon}</span>
                        <span className="text-sm text-gray-400">
                            {filename || config.name}
                        </span>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2">
                    <motion.button
                        className="p-1.5 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                        onClick={() => setIsExpanded(!isExpanded)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        title={isExpanded ? 'Collapse' : 'Expand'}
                    >
                        {isExpanded ? (
                            <Minimize2 className="w-4 h-4" />
                        ) : (
                            <Maximize2 className="w-4 h-4" />
                        )}
                    </motion.button>
                    <motion.button
                        className={cn(
                            'p-1.5 rounded-lg transition-colors',
                            copied
                                ? 'bg-green-500/20 text-green-400'
                                : 'hover:bg-white/10 text-gray-400 hover:text-white'
                        )}
                        onClick={handleCopy}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        title="Copy code"
                    >
                        {copied ? (
                            <Check className="w-4 h-4" />
                        ) : (
                            <Copy className="w-4 h-4" />
                        )}
                    </motion.button>
                </div>
            </div>

            {/* Code content */}
            <div
                className="bg-gray-950 overflow-auto"
                style={{ maxHeight: isExpanded ? 'none' : maxHeight }}
            >
                <div className="p-4">
                    <table className="w-full border-collapse">
                        <tbody>
                            {lines.map((line, index) => {
                                const lineNumber = index + 1
                                const isHighlighted = highlightLines.includes(lineNumber)

                                return (
                                    <tr
                                        key={index}
                                        className={cn(
                                            'leading-relaxed',
                                            isHighlighted && 'bg-yellow-500/10'
                                        )}
                                    >
                                        {showLineNumbers && (
                                            <td className="text-right pr-4 select-none text-gray-600 text-sm align-top w-10">
                                                {lineNumber}
                                            </td>
                                        )}
                                        <td className="font-mono text-sm whitespace-pre text-gray-100">
                                            {line || ' '}
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

// ========================================
// TABBED CODE BLOCKS
// ========================================

interface TabbedCodeBlockProps {
    tabs: {
        filename: string
        code: string
        language?: Language
    }[]
    className?: string
}

export function TabbedCodeBlock({ tabs, className }: TabbedCodeBlockProps) {
    const [activeTab, setActiveTab] = useState(0)

    return (
        <div className={cn('rounded-xl overflow-hidden border border-black/[0.1]', className)}>
            {/* Tabs */}
            <div className="flex bg-gray-900 border-b border-gray-800 overflow-x-auto">
                {tabs.map((tab, index) => {
                    const lang = tab.language || 'typescript'
                    const config = languageConfig[lang]

                    return (
                        <button
                            key={index}
                            className={cn(
                                'flex items-center gap-2 px-4 py-2.5 text-sm transition-colors border-b-2 -mb-px whitespace-nowrap',
                                activeTab === index
                                    ? 'text-white border-accent-primary bg-gray-800'
                                    : 'text-gray-400 hover:text-gray-200 border-transparent'
                            )}
                            onClick={() => setActiveTab(index)}
                        >
                            <span style={{ color: config.color }}>{config.icon}</span>
                            {tab.filename}
                        </button>
                    )
                })}
            </div>

            {/* Active code */}
            <CodeBlock
                code={tabs[activeTab].code}
                language={tabs[activeTab].language}
                showLineNumbers
                className="border-0 rounded-none"
            />
        </div>
    )
}

// ========================================
// INLINE CODE
// ========================================

interface InlineCodeProps {
    children: React.ReactNode
    className?: string
}

export function InlineCode({ children, className }: InlineCodeProps) {
    return (
        <code
            className={cn(
                'px-1.5 py-0.5 rounded-md bg-black/[0.05] text-accent-primary font-mono text-sm',
                className
            )}
        >
            {children}
        </code>
    )
}

// ========================================
// COLLAPSIBLE CODE
// ========================================

interface CollapsibleCodeProps {
    title: string
    code: string
    language?: Language
    defaultOpen?: boolean
    className?: string
}

export function CollapsibleCode({
    title,
    code,
    language = 'typescript',
    defaultOpen = false,
    className,
}: CollapsibleCodeProps) {
    const [isOpen, setIsOpen] = useState(defaultOpen)

    return (
        <div className={cn('rounded-xl border border-black/[0.08] overflow-hidden', className)}>
            <button
                className="w-full flex items-center justify-between px-4 py-3 bg-white/70 hover:bg-white transition-colors"
                onClick={() => setIsOpen(!isOpen)}
            >
                <div className="flex items-center gap-2">
                    <Code className="w-4 h-4 text-muted" />
                    <span className="font-medium text-sm">{title}</span>
                </div>
                <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                >
                    <ChevronDown className="w-4 h-4 text-muted" />
                </motion.div>
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: 'auto' }}
                        exit={{ height: 0 }}
                        className="overflow-hidden"
                    >
                        <CodeBlock
                            code={code}
                            language={language}
                            className="border-0 rounded-none border-t border-black/[0.05]"
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

// ========================================
// TERMINAL OUTPUT
// ========================================

interface TerminalOutputProps {
    lines: string[]
    title?: string
    className?: string
}

export function TerminalOutput({ lines, title = 'Terminal', className }: TerminalOutputProps) {
    return (
        <div className={cn('rounded-xl overflow-hidden border border-black/[0.1]', className)}>
            {/* Header */}
            <div className="flex items-center gap-2 px-4 py-2 bg-gray-900 border-b border-gray-800">
                <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                </div>
                <span className="text-sm text-gray-400 ml-2">{title}</span>
            </div>

            {/* Output */}
            <div className="bg-gray-950 p-4 font-mono text-sm">
                {lines.map((line, index) => (
                    <div key={index} className="flex">
                        <span className="text-green-400 mr-2">❯</span>
                        <span className="text-gray-100">{line}</span>
                    </div>
                ))}
                <div className="flex items-center mt-2">
                    <span className="text-green-400 mr-2">❯</span>
                    <span className="w-2 h-4 bg-gray-100 animate-pulse" />
                </div>
            </div>
        </div>
    )
}
