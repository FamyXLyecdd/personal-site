// ========================================
// TYPES FOR DATA STRUCTURES
// ========================================

export interface Project {
    id: string
    title: string
    description: string
    longDescription?: string
    image: string
    emoji?: string
    tags: string[]
    techStack: string[]
    githubUrl?: string
    liveUrl?: string
    featured?: boolean
    features?: string[]
}

export interface Skill {
    name: string
    level: number
    color: string
}

export interface Testimonial {
    id: string
    name: string
    role: string
    content: string
    rating: number
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
