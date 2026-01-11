// ========================================
// TYPES FOR DATA STRUCTURES
// ========================================

export interface Project {
    id: string
    title: string
    description: string
    shortDescription: string
    image: string
    category: string
    technologies: string[]
    github: string | null
    live: string | null
    featured: boolean
    stats: Record<string, number>
    features: string[]
    testimonials: Array<{ user: string; quote: string; rating: number }>
}

export interface Skill {
    name: string
    category: string
    level: number
    icon: string
    yearsOfExperience: number
}

export interface Testimonial {
    id: string
    name: string
    title: string
    company: string
    content: string
    avatar: string
    rating: number
    flag: string
}

export interface ProcessStep {
    number: number
    title: string
    description: string
    icon: string
    duration: string
}

export interface BlogPost {
    id: string
    title: string
    slug: string
    excerpt: string
    content: string
    author: string
    authorAvatar: string
    publishedAt: string
    readTime: number
    category: string
    tags: string[]
    featured: boolean
    image: string
}

export interface FAQ {
    question: string
    answer: string
    category: string
}

export interface SocialLink {
    name: string
    url: string
    icon: string
    color: string
    username: string
}
