import { Navigate, Route, Routes } from 'react-router-dom'
import { ScrollManager } from '@/components/routing/ScrollManager/ScrollManager'
import { TripPlannerModal } from '@/features/trip/components/TripPlannerModal/TripPlannerModal'
import { TripProvider } from '@/features/trip/context/TripProvider'
import { LanguageProvider } from '@/i18n/context/LanguageProvider'
import { CityPage } from '@/pages/CityPage/CityPage'
import { HomePage } from '@/pages/HomePage/HomePage'
import { SurveyPage } from '@/pages/SurveyPage/SurveyPage'

export function App() {
    return (
        <LanguageProvider>
            <TripProvider>
                <ScrollManager />
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/cities/:cityId" element={<CityPage />} />
                    <Route path="/surveys/:surveyId" element={<SurveyPage />} />
                    {/* Old URL kept so previously shared links still work. */}
                    <Route path="/medellin-events" element={<Navigate to="/cities/medellin" replace />} />
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
                <TripPlannerModal />
            </TripProvider>
        </LanguageProvider>
    )
}
