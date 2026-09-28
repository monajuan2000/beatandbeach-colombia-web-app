import { SiteHeader } from '@/components/layout/SiteHeader/SiteHeader'
import { CitiesGrid } from '@/features/cities/components/CitiesGrid/CitiesGrid'
import { EventsList } from '@/features/events/components/EventsList/EventsList'
import { AboutUsSection } from '@/features/home/components/AboutUsSection/AboutUsSection'
import { ColombiaWondersShowcase } from '@/features/home/components/ColombiaWondersShowcase/ColombiaWondersShowcase'
import { FeaturedEventSpotlight } from '@/features/home/components/FeaturedEventSpotlight/FeaturedEventSpotlight'
import { HeroSection } from '@/features/home/components/HeroSection/HeroSection'
import { HighlightedEventsHeading } from '@/features/home/components/HighlightedEventsHeading/HighlightedEventsHeading'
import { HighlightsSection } from '@/features/home/components/HighlightsSection/HighlightsSection'
import { ProjectsSection } from '@/features/home/components/ProjectsSection/ProjectsSection'
import './HomePage.css'

export function HomePage() {
    return (
        <div className="home-page">
            <SiteHeader />
            <main>
                <HeroSection />
                <HighlightedEventsHeading />
                <ColombiaWondersShowcase />
                <FeaturedEventSpotlight />
                <div className="surface-light surface-band">
                    <ProjectsSection />
                    <AboutUsSection />
                </div>
                <CitiesGrid />
                <EventsList />
                <div className="surface-light surface-band">
                    <HighlightsSection />
                </div>
            </main>
        </div>
    )
}
