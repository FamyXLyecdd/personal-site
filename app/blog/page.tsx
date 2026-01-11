import { Metadata } from 'next'
import { BlogPageContent } from '@/components/pages'

export const metadata: Metadata = {
    title: 'Blog | Portfolio',
    description: 'Thoughts, tutorials, and insights about development, freelancing, and tech.',
}

export default function BlogPage() {
    return <BlogPageContent />
}
