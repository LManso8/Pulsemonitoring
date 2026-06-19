import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { GitBranch, Star, BookOpen, Users, Package, Code2, ArrowRight } from 'lucide-react'

const repoStructure = [
  { name: 'firmware/', type: 'dir', desc: 'MicroPython for Pi Pico W — ADXL345 SPI, MicroSD logging, Wi-Fi' },
  { name: 'processing/', type: 'dir', desc: 'Python signal processing — FFT, filtering, peak acceleration, events' },
  { name: 'backend/', type: 'dir', desc: 'FastAPI server — MQTT ingestion, REST API, WebSocket' },
  { name: 'frontend/', type: 'dir', desc: 'React dashboard — monitoring interface (this repo)' },
  { name: 'hardware/', type: 'dir', desc: 'Schematics, PCB design, enclosure 3D models' },
  { name: 'docs/', type: 'dir', desc: 'Full documentation — calibration, deployment, API reference' },
  { name: 'README.md', type: 'file', desc: 'Project overview, quick start guide' },
  { name: 'LICENSE', type: 'file', desc: 'MIT License — free to use, modify, redistribute' },
]

const contributions = [
  {
    icon: Code2,
    title: 'Contribute Code',
    desc: 'Submit pull requests for firmware improvements, new signal processing algorithms, or dashboard features.',
    color: 'blue',
  },
  {
    icon: BookOpen,
    title: 'Improve Docs',
    desc: 'Help with deployment guides, calibration procedures, and API documentation in multiple languages.',
    color: 'green',
  },
  {
    icon: Package,
    title: 'Share Hardware',
    desc: 'Submit alternative hardware configurations, PCB designs, or enclosure models for different deployment scenarios.',
    color: 'cyan',
  },
  {
    icon: Users,
    title: 'Build Community',
    desc: 'Share your deployment, report issues, suggest features, and help others set up their own Pulse networks.',
    color: 'purple',
  },
]

const colorMap = {
  blue: { bg: 'bg-blue-500/10', border: 'border-blue-500/20', icon: 'text-blue-400' },
  green: { bg: 'bg-emerald-500/10', border: 'border-emerald-500/20', icon: 'text-emerald-400' },
  cyan: { bg: 'bg-cyan-500/10', border: 'border-cyan-500/20', icon: 'text-cyan-400' },
  purple: { bg: 'bg-purple-500/10', border: 'border-purple-500/20', icon: 'text-purple-400' },
}

export default function OpenSource() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="open-source" ref={ref} className="py-28 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-pulse-darker via-pulse-dark to-pulse-darker" />
      <div className="absolute inset-0 bg-grid opacity-15" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-pulse-green/20 to-transparent" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-r from-pulse-blue/5 to-pulse-green/5 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="tag-green mb-4 inline-flex">
            <GitBranch size={10} />
            Open Source
          </div>
          <p className="section-sub mx-auto">
            Pulse is 100% open source under MIT license. Every component — from embedded
            firmware to the React dashboard — is documented, modular, and free to adapt.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Repository structure */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="glass border border-white/10 rounded-3xl overflow-hidden"
          >
            <div className="flex items-center gap-3 px-4 py-3 bg-pulse-surface/80 border-b border-white/8">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/70" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
                <div className="w-3 h-3 rounded-full bg-green-500/70" />
              </div>
              <span className="text-xs font-mono text-gray-500">github.com / pulse-monitoring</span>
              <div className="ml-auto flex items-center gap-3">
                <span className="flex items-center gap-1 text-xs font-semibold text-yellow-400">
                  <Star size={11} fill="currentColor" /> 142
                </span>
                <span className="flex items-center gap-1 text-xs font-semibold text-gray-400">
                  <GitBranch size={11} /> 18
                </span>
              </div>
            </div>

            <div className="p-4 font-mono text-xs">
              <div className="text-gray-500 mb-3">
                <span className="text-pulse-green">pulse-monitoring</span>
                <span className="text-gray-600"> / main</span>
              </div>
              <div className="space-y-1">
                {repoStructure.map((item, i) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: -10 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.3 + i * 0.05 }}
                    className="flex items-center gap-3 px-2 py-1.5 rounded-lg hover:bg-white/5 transition-colors group"
                  >
                    <span className="text-base leading-none">
                      {item.type === 'dir' ? '📁' : '📄'}
                    </span>
                    <span className={`flex-shrink-0 ${item.type === 'dir' ? 'text-pulse-blue' : 'text-gray-300'}`}>
                      {item.name}
                    </span>
                    <span className="text-gray-600 truncate text-[10px]">{item.desc}</span>
                  </motion.div>
                ))}
              </div>

              <div className="mt-4 pt-4 border-t border-white/8">
                <div className="text-gray-600 mb-2">Latest commits</div>
                {[
                  ['feat', 'ADXL345 SPI driver + 3-axis logging', '2h ago'],
                  ['feat', 'MicroSD write buffer for offline storage', '1d ago'],
                  ['docs', 'calibration procedure guide', '3d ago'],
                ].map(([type, msg, time]) => (
                  <div key={msg} className="flex items-center gap-2 py-1 text-[11px]">
                    <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold ${
                      type === 'feat' ? 'bg-blue-500/20 text-blue-400' :
                      type === 'fix' ? 'bg-red-500/20 text-red-400' :
                      'bg-gray-500/20 text-gray-400'
                    }`}>{type}</span>
                    <span className="text-gray-400 truncate">{msg}</span>
                    <span className="text-gray-600 flex-shrink-0">{time}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Contribution paths */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="flex flex-col gap-4"
          >
            <div className="text-sm font-bold text-white mb-2">Ways to Contribute</div>
            {contributions.map((c, i) => {
              const col = colorMap[c.color]
              return (
                <motion.div
                  key={c.title}
                  initial={{ opacity: 0, x: 20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.4 + i * 0.1 }}
                  className={`glass-hover border ${col.border} rounded-2xl p-4 flex gap-4`}
                >
                  <div className={`w-10 h-10 ${col.bg} rounded-xl flex items-center justify-center flex-shrink-0`}>
                    <c.icon size={18} className={col.icon} />
                  </div>
                  <div>
                    <div className="font-semibold text-white text-sm mb-1">{c.title}</div>
                    <p className="text-xs text-gray-400 leading-relaxed">{c.desc}</p>
                  </div>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
