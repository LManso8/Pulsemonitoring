import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import About from '../components/About'
import HowItWorks from '../components/HowItWorks'
import Applications from '../components/Applications'
import TechStack from '../components/TechStack'
import DashboardPreview from '../components/DashboardPreview'
import Footer from '../components/Footer'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-pulse-dark">
      <Navbar />
      <main>
        <Hero />
        <About />
        <HowItWorks />
        <Applications />
        <TechStack />
        <DashboardPreview />
      </main>
      <Footer />
    </div>
  )
}
