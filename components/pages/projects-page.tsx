'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import {
    Search,
    Filter,
    Grid,
    List,
    ArrowUpRight,
    ExternalLink,
    Github,
    Star,
    Code,
    Zap,
    Clock,
    Calendar,
    Tag,
    X,
} from 'lucide-react'
import { GlassCard } from '@/components/ui/glass-card'
import { Button } from '@/components/ui/button'
import { Badge, TechPill } from '@/components/ui/index'
import { projects } from '@/lib/data'
import { type Project } from '@/lib/types'
import { cn } from '@/lib/utils'

// ========================================
// FILTER CATEGORIES
// ========================================

const categories = [
    { id: 'all', name: 'All Projects', icon: <Grid className="w-4 h-4" /> },
    { id: 'featured', name: 'Featured', icon: <Star className="w-4 h-4" /> },
    { id: 'discord', name: 'Discord Bots', icon: <Zap className="w-4 h-4" /> },
    { id: 'automation', name: 'Automation', icon: <Code className="w-4 h-4" /> },
    { id: 'open-source', name: 'Open Source', icon: <Github className="w-4 h-4" /> },
]

const techFilters = [
    'Python', 'Discord.py', 'JavaScript', 'TypeScript',
    'React', 'Node.js', 'MongoDB', 'PostgreSQL',
]

// ========================================
// PROJECT CARD
// ========================================

interface ProjectCardProps {
    project: Project
    view: 'grid' | 'list'
}

function ProjectCard({ project, view }: ProjectCardProps) {
    const [isHovered, setIsHovered] = useState(false)

    if (view === 'list') {
        return (
            <motion.div
                className="group"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                layout
            >
                <GlassCard
                    className="flex gap-6 cursor-pointer"
                    animated={false}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    {/* Image */}
                    <div className="w-32 h-32 rounded-xl bg-gradient-to-br from-accent-primary/20 to-accent-secondary/20 flex items-center justify-center flex-shrink-0 overflow-hidden">
                        <motion.span
                            className="text-5xl"
                            animate={{ scale: isHovered ? 1.1 : 1 }}
                        >
                            {project.emoji}
                        </motion.span>
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-4 mb-2">
                            <div>
                                <h3 className="text-lg font-semibold group-hover:text-accent-primary transition-colors">
                                    {project.title}
                                </h3>
                                <p className="text-sm text-muted">{project.description}</p>
                            </div>
                            <div className="flex gap-2 flex-shrink-0">
                                {project.tags.map((tag) => (
                                    <Badge
                                        key={tag}
                                        variant={tag === 'Featured' ? 'primary' : 'default'}
                                        size="sm"
                                    >
                                        {tag}
                                    </Badge>
                                ))}
                            </div>
                        </div>

                        <p className="text-sm text-muted line-clamp-2 mb-3">
                            {project.longDescription}
                        </p>

                        <div className="flex items-center justify-between">
                            <div className="flex flex-wrap gap-1.5">
                                {project.techStack.slice(0, 4).map((tech) => (
                                    <TechPill key={tech} name={tech} />
                                ))}
                                {project.techStack.length > 4 && (
                                    <TechPill name={`+${project.techStack.length - 4}`} />
                                )}
                            </div>

                            <div className="flex gap-2">
                                {project.githubUrl && (
                                    <Button variant="ghost" size="sm" icon={<Github className="w-4 h-4" />}>
                                        <span className="sr-only">Github</span>
                                    </Button>
                                )}
                                {project.liveUrl && (
                                    <Button variant="ghost" size="sm" icon={<ExternalLink className="w-4 h-4" />}>
                                        <span className="sr-only">Live Demo</span>
                                    </Button>
                                )}
                                <Button variant="primary" size="sm" icon={<ArrowUpRight className="w-4 h-4" />}>
                                    View
                                </Button>
                            </div>
                        </div>
                    </div>
                </GlassCard>
            </motion.div>
        )
    }

    return (
        <motion.div
            className="group"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            layout
        >
            <GlassCard
                className="h-full cursor-pointer overflow-hidden"
                padding="none"
                animated={false}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                    <motion.div
                        className="absolute inset-0 bg-gradient-to-br from-accent-primary/20 to-accent-secondary/20 flex items-center justify-center"
                        animate={{ scale: isHovered ? 1.05 : 1 }}
                        transition={{ duration: 0.4 }}
                    >
                        <span className="text-6xl">{project.emoji}</span>
                    </motion.div>

                    {/* Overlay */}
                    <motion.div
                        className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: isHovered ? 1 : 0 }}
                    />

                    {/* Tags */}
                    <div className="absolute top-3 left-3 flex gap-2">
                        {project.tags.map((tag) => (
                            <Badge
                                key={tag}
                                variant={tag === 'Featured' ? 'primary' : 'default'}
                                size="sm"
                            >
                                {tag}
                            </Badge>
                        ))}
                    </div>

                    {/* Action buttons on hover */}
                    <motion.div
                        className="absolute bottom-3 right-3 flex gap-2"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}
                    >
                        {project.githubUrl && (
                            <motion.a
                                href={project.githubUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-9 h-9 rounded-full bg-white/90 backdrop-blur flex items-center justify-center"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={(e) => e.stopPropagation()}
                            >
                                <Github className="w-4 h-4" />
                            </motion.a>
                        )}
                        {project.liveUrl && (
                            <motion.a
                                href={project.liveUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-9 h-9 rounded-full bg-white/90 backdrop-blur flex items-center justify-center"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={(e) => e.stopPropagation()}
                            >
                                <ExternalLink className="w-4 h-4" />
                            </motion.a>
                        )}
                    </motion.div>
                </div>

                {/* Content */}
                <div className="p-5">
                    <h3 className="text-lg font-semibold mb-1 group-hover:text-accent-primary transition-colors">
                        {project.title}
                    </h3>
                    <p className="text-sm text-muted mb-4 line-clamp-2">
                        {project.description}
                    </p>

                    {/* Tech stack */}
                    <div className="flex flex-wrap gap-1.5">
                        {project.techStack.slice(0, 3).map((tech) => (
                            <TechPill key={tech} name={tech} />
                        ))}
                        {project.techStack.length > 3 && (
                            <TechPill name={`+${project.techStack.length - 3}`} />
                        )}
                    </div>
                </div>
            </GlassCard>
        </motion.div>
    )
}

// ========================================
// PROJECTS PAGE CONTENT
// ========================================

export function ProjectsPageContent() {
    const [searchQuery, setSearchQuery] = useState('')
    const [selectedCategory, setSelectedCategory] = useState('all')
    const [selectedTechs, setSelectedTechs] = useState<string[]>([])
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
    const [showFilters, setShowFilters] = useState(false)

    // Filter projects
    const filteredProjects = useMemo(() => {
        return projects.filter((project) => {
            // Search filter
            if (searchQuery) {
                const query = searchQuery.toLowerCase()
                const matchesSearch =
                    project.title.toLowerCase().includes(query) ||
                    project.description.toLowerCase().includes(query) ||
                    project.techStack.some((tech) => tech.toLowerCase().includes(query))
                if (!matchesSearch) return false
            }

            // Category filter
            if (selectedCategory !== 'all') {
                if (selectedCategory === 'featured' && !project.featured) return false
                if (selectedCategory === 'discord' && !project.techStack.includes('Discord.py')) return false
                if (selectedCategory === 'automation' && !project.tags.includes('Automation')) return false
                if (selectedCategory === 'open-source' && !project.tags.includes('Open Source')) return false
            }

            // Tech filter
            if (selectedTechs.length > 0) {
                const hasTech = selectedTechs.some((tech) => project.techStack.includes(tech))
                if (!hasTech) return false
            }

            return true
        })
    }, [searchQuery, selectedCategory, selectedTechs])

    const toggleTech = (tech: string) => {
        setSelectedTechs((prev) =>
            prev.includes(tech)
                ? prev.filter((t) => t !== tech)
                : [...prev, tech]
        )
    }

    const clearFilters = () => {
        setSearchQuery('')
        setSelectedCategory('all')
        setSelectedTechs([])
    }

    const hasActiveFilters = searchQuery || selectedCategory !== 'all' || selectedTechs.length > 0

    return (
        <div className="min-h-screen py-24">
            <div className="container">
                {/* Header */}
                <motion.div
                    className="text-center mb-12"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <h1 className="text-4xl sm:text-5xl font-bold mb-4">
                        All <span className="gradient-text">Projects</span>
                    </h1>
                    <p className="text-muted max-w-2xl mx-auto">
                        Explore my complete portfolio of projects, from Discord bots to automation tools.
                        Use the filters to find exactly what you&apos;re looking for.
                    </p>
                </motion.div>

                {/* Search and filters */}
                <motion.div
                    className="mb-8 space-y-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                >
                    {/* Search bar */}
                    <div className="flex gap-3 flex-wrap">
                        <div className="flex-1 min-w-[200px] relative">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
                            <input
                                type="text"
                                placeholder="Search projects..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full h-12 pl-12 pr-4 rounded-xl bg-white/70 border border-black/[0.08] outline-none focus:border-accent-primary/30 focus:ring-2 focus:ring-accent-primary/10 transition-all"
                            />
                        </div>

                        <Button
                            variant={showFilters ? 'primary' : 'secondary'}
                            icon={<Filter className="w-4 h-4" />}
                            onClick={() => setShowFilters(!showFilters)}
                        >
                            Filters {selectedTechs.length > 0 && `(${selectedTechs.length})`}
                        </Button>

                        <div className="flex rounded-xl border border-black/[0.08] overflow-hidden">
                            <button
                                className={cn(
                                    'w-10 h-10 flex items-center justify-center transition-colors',
                                    viewMode === 'grid' ? 'bg-accent-primary text-white' : 'bg-white/70 hover:bg-white/90'
                                )}
                                onClick={() => setViewMode('grid')}
                            >
                                <Grid className="w-4 h-4" />
                            </button>
                            <button
                                className={cn(
                                    'w-10 h-10 flex items-center justify-center transition-colors',
                                    viewMode === 'list' ? 'bg-accent-primary text-white' : 'bg-white/70 hover:bg-white/90'
                                )}
                                onClick={() => setViewMode('list')}
                            >
                                <List className="w-4 h-4" />
                            </button>
                        </div>
                    </div>

                    {/* Categories */}
                    <div className="flex gap-2 flex-wrap">
                        {categories.map((category) => (
                            <motion.button
                                key={category.id}
                                className={cn(
                                    'inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all',
                                    selectedCategory === category.id
                                        ? 'bg-accent-primary text-white'
                                        : 'bg-white/70 border border-black/[0.08] hover:border-accent-primary/30'
                                )}
                                onClick={() => setSelectedCategory(category.id)}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                {category.icon}
                                {category.name}
                            </motion.button>
                        ))}
                    </div>

                    {/* Tech filters */}
                    <AnimatePresence>
                        {showFilters && (
                            <motion.div
                                className="p-4 rounded-xl bg-white/70 border border-black/[0.08]"
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                            >
                                <div className="flex items-center justify-between mb-3">
                                    <h4 className="font-medium text-sm flex items-center gap-2">
                                        <Tag className="w-4 h-4" />
                                        Filter by Technology
                                    </h4>
                                    {hasActiveFilters && (
                                        <button
                                            className="text-sm text-accent-primary hover:underline"
                                            onClick={clearFilters}
                                        >
                                            Clear all
                                        </button>
                                    )}
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {techFilters.map((tech) => (
                                        <button
                                            key={tech}
                                            className={cn(
                                                'px-3 py-1.5 rounded-full text-sm transition-all',
                                                selectedTechs.includes(tech)
                                                    ? 'bg-accent-primary text-white'
                                                    : 'bg-white border border-black/[0.08] hover:border-accent-primary/30'
                                            )}
                                            onClick={() => toggleTech(tech)}
                                        >
                                            {tech}
                                        </button>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>

                {/* Results count */}
                <div className="flex items-center justify-between mb-6">
                    <p className="text-sm text-muted">
                        Showing <strong>{filteredProjects.length}</strong> of {projects.length} projects
                    </p>
                    {hasActiveFilters && (
                        <button
                            className="text-sm text-accent-primary hover:underline flex items-center gap-1"
                            onClick={clearFilters}
                        >
                            <X className="w-3 h-3" />
                            Clear filters
                        </button>
                    )}
                </div>

                {/* Projects grid/list */}
                <motion.div
                    className={cn(
                        viewMode === 'grid'
                            ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'
                            : 'space-y-4'
                    )}
                    layout
                >
                    <AnimatePresence mode="popLayout">
                        {filteredProjects.map((project) => (
                            <ProjectCard key={project.id} project={project} view={viewMode} />
                        ))}
                    </AnimatePresence>
                </motion.div>

                {/* Empty state */}
                {filteredProjects.length === 0 && (
                    <motion.div
                        className="text-center py-16"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                    >
                        <div className="text-6xl mb-4">🔍</div>
                        <h3 className="text-xl font-semibold mb-2">No projects found</h3>
                        <p className="text-muted mb-4">Try adjusting your filters or search query.</p>
                        <Button variant="primary" onClick={clearFilters}>
                            Clear Filters
                        </Button>
                    </motion.div>
                )}
            </div>
        </div>
    )
}
