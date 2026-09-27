import './App.css'
import { Header } from './components/layout/Header'
import { Hero } from './components/layout/Hero'
import { AboutUsSection } from './components/features/AboutUsSection'
import { CitiesGrid } from './components/features/CitiesGrid'
import { EventsList } from './components/features/EventsList'
import { HighlightsSection } from './components/features/HighlightsSection'

function App() {
  return (
    <div className="app-shell">
      <Header />
      <main>
        <Hero />
        <AboutUsSection />
        <CitiesGrid />
        <EventsList />
        <HighlightsSection />
      </main>
    </div>
  )
}

export default App
