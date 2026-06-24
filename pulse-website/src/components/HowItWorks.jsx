import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowRight, Cpu, Zap, BarChart2, Cloud, Radio } from 'lucide-react'

const steps = [
  {
    id: '01',
    icon: '📡',
    label: 'ADXL345',
    sublabel: '3-Axis Accelerometer',
    desc: 'Digital MEMS accelerometer measures ground acceleration along X, Y, and Z axes simultaneously. Selectable range (±2g to ±16g) with 13-bit resolution — no external ADC required.',
    color: 'from-blue-600 to-blue-400',
    border: 'border-blue-500/30',
    badge: 'Sensor',
    badgeColor: 'tag-blue',
  },
  {
    id: '02',
    icon: '🖥️',
    label: 'Pi Pico W',
    sublabel: 'Microcontroller',
    desc: 'Raspberry Pi Pico W reads the ADXL345 via I2C, timestamps each sample with NTP-synchronized time, applies pre-processing, and manages data routing to storage and Wi-Fi.',
    color: 'from-violet-600 to-violet-400',
    border: 'border-violet-500/30',
    badge: 'MCU',
    badgeColor: 'tag-blue',
  },
  {
    id: '03',
    icon: '💾',
    label: 'MicroSD',
    sublabel: 'Local Storage',
    desc: 'Raw acceleration samples are logged continuously to a microSD card via SPI. This ensures no data is lost during network outages and enables post-event offline analysis.',
    color: 'from-emerald-600 to-emerald-400',
    border: 'border-emerald-500/30',
    badge: 'Storage',
    badgeColor: 'tag-green',
  },
  {
    id: '04',
    icon: '📶',
    label: 'Wi-Fi / MQTT',
    sublabel: 'Wireless Transmission',
    desc: 'Processed data is streamed in real time over Wi-Fi using MQTT. The lightweight publish-subscribe protocol keeps end-to-end latency below one second.',
    color: 'from-cyan-600 to-cyan-400',
    border: 'border-cyan-500/30',
    badge: 'Network',
    badgeColor: 'tag-cyan',
  },
  {
    id: '05',
    icon: '🐍',
    label: 'Python',
    sublabel: 'Signal Processing',
    desc: 'NumPy-based pipeline performs FFT analysis, bandpass filtering, peak acceleration extraction, and event detection against configurable thresholds.',
    color: 'from-emerald-600 to-emerald-400',
    border: 'border-emerald-500/30',
    badge: 'Software',
    badgeColor: 'tag-green',
  },
  {
    id: '06',
    icon: '📊',
    label: 'Dashboard',
    sublabel: 'Live Visualization',
    desc: 'Web-based monitoring center displays tri-axial waveforms, frequency spectra, sensor health, and event history in real time.',
    color: 'from-green-600 to-teal-400',
    border: 'border-green-500/30',
    badge: 'Frontend',
    badgeColor: 'tag-green',
  },
]

export default function HowItWorks() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="how-it-works" ref={ref} className="py-28 bg-pulse-darker relative overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-15" />

      {/* Top gradient */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-pulse-blue/30 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-pulse-green/30 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="tag-cyan mb-4 inline-flex">
            <Radio size={10} />
            Signal Pipeline
          </div>
          <h2 className="section-heading mb-4">
            How{' '}
            <span className="gradient-text">It Works</span>
          </h2>
          <p className="section-sub mx-auto">
            From ground motion to dashboard — a complete signal chain from digital sensing to live intelligence.
          </p>
        </motion.div>

        {/* Pipeline — desktop horizontal, mobile vertical */}
        <div className="hidden lg:flex items-stretch gap-0 mb-16">
          {steps.map((step, i) => (
            <div key={step.id} className="flex items-center flex-1 min-w-0">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className={`flex-1 glass border ${step.border} rounded-2xl p-5 h-full group hover:scale-[1.03] hover:bg-white/8 transition-all duration-300`}
              >
                {/* Step number */}
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono font-bold text-gray-600">{step.id}</span>
                  <span className={step.badgeColor}>{step.badge}</span>
                </div>
                {/* Icon */}
                <div className="text-3xl mb-3">{step.icon}</div>
                {/* Labels */}
                <div className="font-bold text-white text-sm mb-0.5">{step.label}</div>
                <div className="text-xs text-gray-500 mb-3">{step.sublabel}</div>
                {/* Desc */}
                <p className="text-xs text-gray-400 leading-relaxed">{step.desc}</p>
              </motion.div>

              {i < steps.length - 1 && (
                <motion.div
                  initial={{ opacity: 0, scaleX: 0 }}
                  animate={inView ? { opacity: 1, scaleX: 1 } : {}}
                  transition={{ delay: i * 0.1 + 0.3, duration: 0.3 }}
                  className="flex-shrink-0 px-1 text-gray-600"
                >
                  <ArrowRight size={16} />
                </motion.div>
              )}
            </div>
          ))}
        </div>

        {/* Mobile: vertical timeline */}
        <div className="lg:hidden flex flex-col gap-4 mb-16">
          {steps.map((step, i) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, x: -30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className={`flex gap-4 glass border ${step.border} rounded-2xl p-5`}
            >
              <div className="text-3xl">{step.icon}</div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-bold text-white text-sm">{step.label}</span>
                  <span className={step.badgeColor + ' text-[10px]'}>{step.badge}</span>
                </div>
                <div className="text-xs text-gray-500 mb-2">{step.sublabel}</div>
                <p className="text-xs text-gray-400 leading-relaxed">{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* System architecture visual */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="glass rounded-3xl border border-white/10 p-8 overflow-hidden relative"
        >
          <div className="absolute -top-10 right-10 w-48 h-48 bg-pulse-green/5 rounded-full blur-3xl" />
          <h3 className="text-lg font-bold text-white mb-6 text-center">Network Architecture</h3>
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 text-center">
            {/* Sensor nodes */}
            <div className="flex flex-col items-center gap-3">
              <div className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-1">Sensor Nodes</div>
              <div className="flex gap-3">
                {['PULSE-001', 'PULSE-002', 'PULSE-003', 'PULSE-004'].map((id, idx) => (
                  <div
                    key={id}
                    className="flex flex-col items-center gap-1 bg-pulse-surface border border-white/10 rounded-xl px-3 py-3"
                  >
                    <span className={idx === 0 ? 'glow-dot-green' : 'w-2 h-2 rounded-full bg-gray-600'} />
                    <span className="text-[10px] font-mono text-gray-400">{id}</span>
                  </div>
                ))}
              </div>
              <p className="text-[10px] text-gray-600 italic">1 active · 3 planned</p>
            </div>

            <ArrowRight size={20} className="text-gray-600 rotate-0 md:rotate-0 rotate-90" />

            {/* Gateway */}
            <div className="flex flex-col items-center gap-2 bg-pulse-surface border border-pulse-blue/30 rounded-2xl px-6 py-4">
              <Radio size={22} className="text-pulse-blue" />
              <span className="text-xs font-semibold text-white">Wi-Fi Gateway</span>
              <span className="text-[10px] text-gray-500">MQTT / HTTP</span>
            </div>

            <ArrowRight size={20} className="text-gray-600" />

            {/* Processing */}
            <div className="flex flex-col items-center gap-2 bg-pulse-surface border border-pulse-cyan/30 rounded-2xl px-6 py-4">
              <Cpu size={22} className="text-pulse-cyan" />
              <span className="text-xs font-semibold text-white">Python Backend</span>
              <span className="text-[10px] text-gray-500">FastAPI + NumPy</span>
            </div>

            <ArrowRight size={20} className="text-gray-600" />

            {/* Dashboard */}
            <div className="flex flex-col items-center gap-2 bg-pulse-surface border border-pulse-green/30 rounded-2xl px-6 py-4">
              <BarChart2 size={22} className="text-pulse-green" />
              <span className="text-xs font-semibold text-white">Dashboard</span>
              <span className="text-[10px] text-gray-500">React + WebSockets</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
