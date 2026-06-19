import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Globe, Shield, Zap, BookOpen, Network, TrendingUp } from 'lucide-react'

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.6, ease: 'easeOut' },
  }),
}

const pillars = []

const colorMap = {
  blue: {
    bg: 'bg-pulse-blue/10',
    border: 'border-pulse-blue/20',
    icon: 'text-pulse-blue',
    glow: 'group-hover:shadow-glow-blue',
  },
  green: {
    bg: 'bg-pulse-green/10',
    border: 'border-pulse-green/20',
    icon: 'text-pulse-green',
    glow: 'group-hover:shadow-glow-green',
  },
  cyan: {
    bg: 'bg-pulse-cyan/10',
    border: 'border-pulse-cyan/20',
    icon: 'text-pulse-cyan',
    glow: 'group-hover:shadow-glow-cyan',
  },
}

export default function About() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="about" ref={ref} className="py-28 bg-pulse-dark relative overflow-hidden">
      {/* Subtle grid */}
      <div className="absolute inset-0 bg-grid opacity-20" />

      {/* Radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-pulse-blue/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          custom={0}
          variants={fadeUp}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="text-center mb-16"
        >
          <div className="tag-blue mb-4 inline-flex">
            <span className="glow-dot-blue" />
            About Pulse
          </div>
          <h2 className="section-heading mb-4">
            What is{' '}
            <span className="gradient-text">Pulse</span>?
          </h2>
          <p className="section-sub mx-auto">
            Pulse is an open-source vibration monitoring platform built around low-cost IoT hardware,
            designed for real-world deployment across cities, industrial sites, and critical infrastructure.
            Inspired by the Raspberry Shake ecosystem, built for accessibility.
          </p>
        </motion.div>

        {/* Intro block */}
        <motion.div
          custom={1}
          variants={fadeUp}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="glass rounded-3xl border border-white/10 p-8 md:p-12 mb-16 relative overflow-hidden"
        >
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-pulse-green/5 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-pulse-blue/5 rounded-full blur-3xl" />

          <div className="relative grid md:grid-cols-2 gap-10 items-center">
            <div>
              <h3 className="text-2xl font-bold text-white mb-4">
                Scientific Monitoring at a Fraction of the Cost
              </h3>
              <p className="text-gray-400 leading-relaxed mb-4">
                Traditional vibration monitoring systems cost tens of thousands of euros and require
                specialist installation. Pulse brings quality monitoring to anyone — a
                first-year engineering student, a city council, a mining company — at a fraction of
                the cost.
              </p>
              <p className="text-gray-400 leading-relaxed">
                Each node captures tri-axial acceleration data using an ADXL345 digital accelerometer
                connected directly to a Raspberry Pi Pico W via SPI. Data is logged locally to a
                microSD card and transmitted wirelessly in real time — no external ADC or amplifier
                required.
              </p>
            </div>

            {/* Mini stat grid */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: 'Node Cost', value: '≈ €30', sub: 'per node' },
                { label: 'Resolution', value: '13-bit', sub: 'ADXL345 precision' },
                { label: 'Range', value: '±16g', sub: 'max acceleration' },
                { label: 'Network', value: 'Wi-Fi', sub: '+ LoRa ready' },
              ].map((s) => (
                <div
                  key={s.label}
                  className="bg-pulse-surface/80 border border-white/8 rounded-2xl p-5 text-center"
                >
                  <div className="text-2xl font-black gradient-text mb-1">{s.value}</div>
                  <div className="text-xs font-semibold text-white mb-0.5">{s.label}</div>
                  <div className="text-[11px] text-gray-500">{s.sub}</div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Pillars grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {pillars.map((p, i) => {
            const c = colorMap[p.color]
            return (
              <motion.div
                key={p.title}
                custom={i + 2}
                variants={fadeUp}
                initial="hidden"
                animate={inView ? 'visible' : 'hidden'}
                className={`group glass-hover rounded-2xl p-6 border ${c.border} ${c.glow} transition-all duration-300`}
              >
                <div className={`w-12 h-12 ${c.bg} rounded-xl flex items-center justify-center mb-4`}>
                  <p.icon size={22} className={c.icon} />
                </div>
                <h4 className="font-bold text-white mb-2">{p.title}</h4>
                <p className="text-sm text-gray-400 leading-relaxed">{p.desc}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}