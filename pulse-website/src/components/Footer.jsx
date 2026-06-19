import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { GitBranch, Activity, Mail, Globe } from 'lucide-react'
import PulseLogo from './PulseLogo'

const footerLinks = {
  Project: [
    { label: 'About', href: '#about' },
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'Applications', href: '#applications' },
  ],
  Technology: [
    { label: 'Tech Stack', href: '#tech' },
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'GitHub', href: 'https://github.com/rosariothamirez-creator/Pulsemonitoring/tree/main/hardware' },
  ],
  Resources: [
    { label: 'Documentation', href: '#' },
    { label: 'Hardware Guide', href: '#' },
    { label: 'API Reference', href: '#' },
  ],
}

export default function Footer() {
  const scrollTo = (href) => {
    if (href.startsWith('#')) {
      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <footer className="bg-pulse-darker border-t border-white/8 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-10" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-pulse-blue/20 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main footer */}
        <div className="py-14 grid md:grid-cols-5 gap-10">
          {/* Brand col */}
          <div className="md:col-span-2">
            <PulseLogo size="sm" />
            <p className="mt-4 text-sm text-gray-400 leading-relaxed max-w-xs">
              Open-source distributed vibration and micro-seismic monitoring system.
              Built at Instituto Superior Técnico, Lisboa.
            </p>
            <div className="mt-5 flex items-center gap-3">
              <a
                href="https://github.com/rosariothamirez-creator/Pulsemonitoring/tree/main/hardware"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 glass border border-white/10 rounded-xl flex items-center justify-center text-gray-400 hover:text-white hover:border-white/30 transition-all"
              >
                <GitBranch size={15} />
              </a>
              <a
                href="mailto:pulse@tecnico.pt"
                className="w-9 h-9 glass border border-white/10 rounded-xl flex items-center justify-center text-gray-400 hover:text-white hover:border-white/30 transition-all"
              >
                <Mail size={15} />
              </a>
              <a
                href="#"
                className="w-9 h-9 glass border border-white/10 rounded-xl flex items-center justify-center text-gray-400 hover:text-white hover:border-white/30 transition-all"
              >
                <Globe size={15} />
              </a>
            </div>

            {/* Status */}
            <div className="mt-6 flex items-center gap-2 glass border border-pulse-green/20 rounded-xl px-3 py-2 w-fit">
              <span className="glow-dot-green" />
              <span className="text-xs text-gray-400">All systems operational</span>
            </div>
          </div>

          {/* Link cols */}
          {Object.entries(footerLinks).map(([group, links]) => (
            <div key={group}>
              <div className="text-xs font-bold text-white uppercase tracking-widest mb-4">{group}</div>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    {link.href.startsWith('/') ? (
                      <Link
                        to={link.href}
                        className="text-sm text-gray-400 hover:text-white transition-colors"
                      >
                        {link.label}
                      </Link>
                    ) : link.href.startsWith('http') ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-gray-400 hover:text-white transition-colors"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <button
                        onClick={() => scrollTo(link.href)}
                        className="text-sm text-gray-400 hover:text-white transition-colors text-left"
                      >
                        {link.label}
                      </button>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="py-5 border-t border-white/8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-gray-600">
            © 2026 Pulse – Smart Vibrations Monitoring. Released under{' '}
            <span className="text-gray-400">MIT License</span>.
          </p>
          <p className="text-xs text-gray-600">
            Projeto Integrador — LEME 2025/26 ·{' '}
            <span className="text-gray-400">Instituto Superior Técnico</span>
          </p>
          <div className="flex items-center gap-1.5 text-xs text-gray-600">
            <Activity size={11} className="text-pulse-green" />
            <span>Monitoring 24/7</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
