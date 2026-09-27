import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import { MedellinEventsPage } from './pages/MedellinEventsPage'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/medellin-events" element={<MedellinEventsPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
