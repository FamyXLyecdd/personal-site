import { Metadata } from 'next'
import { ProjectsPageContent } from '@/components/pages'

export const metadata: Metadata = {
    title: 'Projects | Portfolio',
    description: 'Explore my complete portfolio of projects, from Discord bots to automation tools.',
}

export default function ProjectsPage() {
    return <ProjectsPageContent />
}
