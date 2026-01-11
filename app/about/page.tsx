import { Metadata } from 'next'
import { AboutPageContent } from '@/components/pages'

export const metadata: Metadata = {
    title: 'About | Portfolio',
    description: '16-year-old developer from the Philippines, building cool stuff with code since 2023.',
}

export default function AboutPage() {
    return <AboutPageContent />
}
