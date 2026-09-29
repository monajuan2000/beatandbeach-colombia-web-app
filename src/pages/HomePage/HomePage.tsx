import { PageSection } from '@/components/layout/PageSection/PageSection'
import { SiteFooter } from '@/components/layout/SiteFooter/SiteFooter'
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
import { useTranslation } from '@/i18n/context/LanguageContext'
import './HomePage.css'

export function HomePage() {
    const { t } = useTranslation()
    const sections = t.home.sections

    return (
        <div className="home-page">
            <SiteHeader />
            <main>
                <PageSection index={0} label={sections.discover} hideDivider>
                    <HeroSection />
                </PageSection>
                <PageSection index={1} label={sections.featured} surface="dark">
                    <HighlightedEventsHeading />
                    <ColombiaWondersShowcase />
                    <FeaturedEventSpotlight />
                </PageSection>
                <PageSection index={2} label={sections.about} surface="light">
                    <ProjectsSection />
                    <AboutUsSection />
                </PageSection>
                <PageSection index={3} label={sections.destinations} surface="dark">
                    <CitiesGrid />
                </PageSection>
                <PageSection index={4} label={sections.events} surface="dark">
                    <EventsList />
                </PageSection>
                <PageSection index={5} label={sections.whyUs} surface="light">
                    <HighlightsSection />
                </PageSection>
            </main>
            <SiteFooter />
        </div>
    )
}
