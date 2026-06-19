import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { SeismicProvider } from './hooks/SeismicContext'
import LandingPage from './pages/LandingPage'
import DashboardPage from './pages/DashboardPage'

function App() {
  return (
    <SeismicProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
        </Routes>
      </Router>
    </SeismicProvider>
  )
}

export default App