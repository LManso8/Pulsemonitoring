import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Activity, Wifi, ChevronDown } from 'lucide-react'
import PulseLogo from './PulseLogo'

function WaveCanvas() {
  const canvasRef = useRef(null)
  const animRef = useRef(null)
  const tRef = useRef(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const drawWave = (yFrac, amp, freq, phase, color, alpha, lineWidth = 1.2) => {
      const y0 = canvas.height * yFrac
      ctx.beginPath()
      ctx.strokeStyle = color
      ctx.lineWidth = lineWidth
      ctx.globalAlpha = alpha
      for (let x = 0; x <= canvas.width; x += 2) {
        const y = y0 + Math.sin((x / canvas.width) * freq * Math.PI * 2 + tRef.current + phase) * amp
        x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y)
      }
      ctx.stroke()
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.globalAlpha = 1

      drawWave(0.15, 35, 1.8, 0, '#10B981', 0.08, 1)
      drawWave(0.22, 28, 1.5, 1, '#10B981', 0.06, 1.2)
      drawWave(0.30, 45, 2.2, 2, '#059669', 0.05, 0.8)
      drawWave(0.10, 60, 1.1, 0.5, '#10B981', 0.04, 1.5)

      drawWave(0.75, 40, 1.6, 0.8, '#3B82F6', 0.08, 1)
      drawWave(0.82, 32, 2.0, 1.5, '#3B82F6', 0.06, 1.2)
      drawWave(0.88, 50, 1.3, 2.1, '#2563EB', 0.05, 0.9)
      drawWave(0.68, 55, 0.9, 0.3, '#3B82F6', 0.04, 1.5)

      drawWave(0.45, 20, 3.1, 1.2, '#06B6D4', 0.05, 0.8)
      drawWave(0.55, 25, 2.6, 0.7, '#06B6D4', 0.04, 1)

      tRef.current += 0.008
      animRef.current = requestAnimationFrame(animate)
    }

    animate()
    return () => {
      cancelAnimationFrame(animRef.current)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
    />
  )
}

function AccelLine() {
  const canvasRef = useRef(null)
  const animRef = useRef(null)
  const bufRef = useRef([])
  const tRef = useRef(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    const W = 900
    const H = 120
    canvas.width = W
    canvas.height = H

    for (let i = 0; i < W; i++) {
      bufRef.current.push(H / 2)
    }

    const getY = (t) => {
      const base = H / 2
      const h1 = Math.sin(t * 0.8) * 12
      const h2 = Math.sin(t * 2.1) * 6
      const h3 = Math.sin(t * 4.5) * 3
      const noise = (Math.random() - 0.5) * 4
      const spike = Math.abs(Math.sin(t * 0.15)) > 0.98 ? (Math.random() - 0.5) * 60 : 0
      return base + h1 + h2 + h3 + noise + spike
    }

    const animate = () => {
      bufRef.current.shift()
      bufRef.current.push(getY(tRef.current))
      tRef.current += 0.06

      ctx.clearRect(0, 0, W, H)

      const grad = ctx.createLinearGradient(0, 0, W, 0)
      grad.addColorStop(0, 'rgba(59,130,246,0)')
      grad.addColorStop(0.2, 'rgba(59,130,246,0.7)')
      grad.addColorStop(0.7, 'rgba(6,182,212,0.9)')
      grad.addColorStop(0.9, 'rgba(16,185,129,1)')
      grad.addColorStop(1, 'rgba(16,185,129,0.5)')

      ctx.beginPath()
      ctx.strokeStyle = grad
      ctx.lineWidth = 2
      ctx.lineJoin = 'round'
      ctx.globalAlpha = 1
      bufRef.current.forEach((y, x) => {
        x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y)
      })
      ctx.stroke()

      ctx.shadowColor = '#06B6D4'
      ctx.shadowBlur = 8
      ctx.beginPath()
      ctx.strokeStyle = 'rgba(6,182,212,0.4)'
      ctx.lineWidth = 4
      bufRef.current.forEach((y, x) => {
        x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y)
      })
      ctx.stroke()
      ctx.shadowBlur = 0

      const lastY = bufRef.current[W - 1]
      ctx.beginPath()
      ctx.arc(W - 1, lastY, 4, 0, Math.PI * 2)
      ctx.fillStyle = '#10B981'
      ctx.shadowColor = '#10B981'
      ctx.shadowBlur = 12
      ctx.fill()
      ctx.shadowBlur = 0

      animRef.current = requestAnimationFrame(animate)
    }

    animate()
    return () => cancelAnimationFrame(animRef.current)
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="w-full"
      style={{ height: '120px', imageRendering: 'crisp-edges' }}
    />
  )
}

export default function Hero() {
  const scrollToNext = () => {
    document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-pulse-darker">
      <WaveCanvas />
      <div className="absolute inset-0 bg-gradient-hero pointer-events-none" />
      <div className="absolute inset-0 bg-grid opacity-30 pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-gradient-to-b from-pulse-blue/10 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
        {/* Status badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex justify-center mb-8"
        >
          <div className="flex items-center gap-2 glass px-4 py-2 rounded-full border border-pulse-green/30">
            <span className="glow-dot-green" />
            <span className="text-xs font-semibold text-pulse-green tracking-widest uppercase">
              System Online — Monitoring Active
            </span>
            <Wifi size={12} className="text-pulse-green" />
          </div>
        </motion.div>

        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="flex justify-center mb-6"
        >
          <PulseLogo size="xl" />
        </motion.div>

        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.7 }}
          className="text-center mb-6"
        >
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight mb-4 leading-none">
            <span className="block text-white">Sense the</span>
            <span className="block gradient-text text-shadow-glow">Earth's Pulse</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto leading-relaxed font-light">
            Open-source distributed network for real-time vibration monitoring.
            Built on low-cost IoT hardware. Deployed everywhere.
          </p>
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14"
        >
          <button
            onClick={scrollToNext}
            className="flex items-center gap-2 bg-gradient-to-r from-pulse-blue to-pulse-green text-white font-bold px-8 py-4 rounded-2xl hover:shadow-glow-blue hover:scale-105 transition-all duration-300 text-lg"
          >
            Explore the System
            <ArrowRight size={20} />
          </button>
          <Link
            to="/dashboard"
            className="flex items-center gap-2 glass border border-white/20 text-white font-semibold px-8 py-4 rounded-2xl hover:bg-white/10 hover:border-pulse-cyan/50 transition-all duration-300 text-lg"
          >
            <Activity size={20} className="text-pulse-cyan" />
            Live Dashboard
          </Link>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="flex flex-wrap justify-center gap-8 mb-12 text-center"
        >
          {[
            { value: '1', label: 'Active Node' },
            { value: '3-axis', label: 'Acceleration' },
            { value: '< 1s', label: 'Latency' },
            { value: '100%', label: 'Open Source' },
          ].map((stat) => (
            <div key={stat.label} className="flex flex-col items-center">
              <span className="text-3xl font-black gradient-text">{stat.value}</span>
              <span className="text-xs text-gray-500 uppercase tracking-widest mt-1">{stat.label}</span>
            </div>
          ))}
        </motion.div>

        {/* Live accel display */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.8 }}
          className="glass rounded-2xl border border-white/10 overflow-hidden max-w-4xl mx-auto"
        >
          <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/8">
            <div className="flex items-center gap-2">
              <span className="glow-dot-green" />
              <span className="text-xs font-mono text-gray-400">PULSE-001 · ADXL345 · Z-axis</span>
            </div>
            <div className="flex items-center gap-3 text-xs font-mono">
              <span className="text-pulse-cyan">ACC: 0.12 g</span>
              <span className="text-gray-600">|</span>
              <span className="text-gray-400">3-axis</span>
              <span className="glass text-pulse-green px-2 py-0.5 rounded-full text-[10px] font-bold border border-pulse-green/30">
                NORMAL
              </span>
            </div>
          </div>
          <div className="px-2 py-1 bg-pulse-darker">
            <AccelLine />
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        onClick={scrollToNext}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-500 hover:text-gray-300 transition-colors"
      >
        <span className="text-xs uppercase tracking-widest font-medium">Scroll</span>
        <ChevronDown size={20} className="animate-bounce" />
      </motion.button>
    </section>
  )
}
