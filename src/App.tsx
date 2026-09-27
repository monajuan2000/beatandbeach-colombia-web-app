import './App.css'
import { Header } from './components/layout/Header'
import { Hero } from './components/layout/Hero'
import { ProjectsSection } from './components/features/ProjectsSection'
import { AboutUsSection } from './components/features/AboutUsSection'
import { CitiesGrid } from './components/features/CitiesGrid'
import { EventsList } from './components/features/EventsList'
import { HighlightsSection } from './components/features/HighlightsSection'
import maravillasImage from './assets/MARAVILLAS_COLOMBIA.jpeg'
import edcImage from './assets/EDC_COLOMBIA2026.jpeg'

function App() {
  return (
    <div className="app-shell">
      <Header />
      <main>
        <Hero />

        <section className="highlighted-events-header" aria-label="Popular events heading">
          <h2>Colombia’s most unforgettable events</h2>
        </section>

        <section className="maravillas-showcase" aria-label="Colombia highlights banner">
          <div
            className="maravillas-showcase-visual"
            style={{ backgroundImage: `url("${maravillasImage}")` }}
          />
          <div className="maravillas-showcase-copy">
            <span className="eyebrow">A country of contrasts</span>
            <h2>Maravillas de Colombia</h2>
            <p>
              From the Caribbean coast to the Andes and the Pacific, Colombia offers a rich mix of
              culture, color, and unforgettable landscapes in every region.
            </p>
          </div>
        </section>

        <section className="featured-event-spotlight" aria-label="Featured event spotlight">
          <div className="featured-event-visual" style={{ backgroundImage: `url("${edcImage}")` }} />
          <div className="featured-event-copy">
            <span className="eyebrow">Popular event</span>
            <h2>EDC Colombia 2026</h2>
            <p>
              Experience the city’s most electrifying festival weekend with world-class electronic acts,
              immersive stages, and a late-night atmosphere unlike any other in Medellín.
            </p>
            <div className="featured-event-meta">
              <span>10–11 Oct 2026</span>
              <span>Medellín</span>
            </div>
          </div>
        </section>

        <ProjectsSection />
        <AboutUsSection />
        <CitiesGrid />
        <EventsList />
        <HighlightsSection />
      </main>
    </div>
  )
}

export default App
