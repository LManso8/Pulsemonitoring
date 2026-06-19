import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Activity } from 'lucide-react'
import PulseLogo from './PulseLogo'

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Applications', href: '#applications' },
  { label: 'Tech Stack', href: '#tech' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()
  const isDashboard = location.pathname === '/dashboard'

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  const handleNavClick = (href) => {
    setMenuOpen(false)
    if (href.startsWith('#') && !isDashboard) {
      const el = document.querySelector(href)
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-pulse-dark/90 backdrop-blur-xl border-b border-white/10 shadow-glass'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex-shrink-0">
              <PulseLogo size="sm" />
            </Link>

            {/* Desktop nav */}
            {!isDashboard && (
              <div className="hidden md:flex items-center gap-1">
                {navLinks.map((link) => (
                  <button
                    key={link.label}
                    onClick={() => handleNavClick(link.href)}
                    className="px-3 py-2 text-sm font-medium text-gray-400 hover:text-white transition-colors duration-200 rounded-lg hover:bg-white/5"
                  >
                    {link.label}
                  </button>
                ))}
              </div>
            )}

            {/* CTA + mobile toggle */}
            <div className="flex items-center gap-3">
              {isDashboard ? (
                <Link to="/" className="btn-secondary text-sm py-2 px-4">
                  ← Back to Home
                </Link>
              ) : (
                <Link
                  to="/dashboard"
                  className="hidden sm:flex items-center gap-2 bg-gradient-to-r from-pulse-blue to-pulse-green text-white text-sm font-semibold px-4 py-2 rounded-xl hover:shadow-glow-blue hover:scale-105 transition-all duration-300"
                >
                  <Activity size={14} />
                  Live Dashboard
                </Link>
              )}
              {!isDashboard && (
                <button
                  className="md:hidden p-2 rounded-lg glass text-gray-400 hover:text-white"
                  onClick={() => setMenuOpen(!menuOpen)}
                >
                  {menuOpen ? <X size={20} /> : <Menu size={20} />}
                </button>
              )}
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed top-16 left-0 right-0 z-40 bg-pulse-dark/95 backdrop-blur-xl border-b border-white/10 md:hidden"
          >
            <div className="px-4 py-4 flex flex-col gap-1">
              {navLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={() => handleNavClick(link.href)}
                  className="w-full text-left px-4 py-3 text-sm font-medium text-gray-300 hover:text-white hover:bg-white/5 rounded-xl transition-colors"
                >
                  {link.label}
                </button>
              ))}
              <Link
                to="/dashboard"
                onClick={() => setMenuOpen(false)}
                className="mt-2 flex items-center justify-center gap-2 bg-gradient-to-r from-pulse-blue to-pulse-green text-white text-sm font-semibold px-4 py-3 rounded-xl"
              >
                <Activity size={14} />
                Live Dashboard
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
