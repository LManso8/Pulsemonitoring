import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import {
  Activity, Wifi, GitBranch, Network, Zap, BarChart2,
  DollarSign, Layers, Bell, Clock, Globe, Lock,
} from 'lucide-react'

const features = [
  {
    icon: Activity,
    title: 'Real-Time Monitoring',
    desc: 'Continuous tri-axial acceleration acquisition and live display. All three axes — X, Y, Z — streamed simultaneously from the sensor node.',
    color: 'blue',
    gradient: 'from-blue-500/20 to-blue-500/5',
  },
  {
    icon: GitBranch,
    title: 'Open-Source Architecture',
    desc: 'Fully open firmware, signal processing, and dashboard. Fork, modify, deploy — zero licensing fees.',
    color: 'green',
    gradient: 'from-emerald-500/20 to-emerald-500/5',
  },
  {
    icon: Wifi,
    title: 'Wireless Connectivity',
    desc: 'Wi-Fi 802.11n built into the Pico W, with LoRa expansion ready for remote deployments without network coverage.',
    color: 'cyan',
    gradient: 'from-cyan-500/20 to-cyan-500/5',
  },
  {
    icon: Network,
    title: 'Scalable IoT Network',
    desc: 'Designed for multi-node deployment. Currently operating with one active node — the architecture supports adding more without reconfiguring existing ones.',
    color: 'blue',
    gradient: 'from-blue-500/20 to-blue-500/5',
  },
  {
    icon: Zap,
    title: 'Digital Sensor — No Analog Chain',
    desc: 'The ADXL345 digitizes acceleration internally via SPI. No external ADC or instrumentation amplifier needed, reducing cost and simplifying the design.',
    color: 'yellow',
    gradient: 'from-yellow-500/20 to-yellow-500/5',
  },
  {
    icon: BarChart2,
    title: 'Data Visualization',
    desc: 'Time-domain waveforms, FFT frequency spectra, peak acceleration trends, and event history — all in one dashboard.',
    color: 'green',
    gradient: 'from-emerald-500/20 to-emerald-500/5',
  },
  {
    icon: DollarSign,
    title: 'Ultra Low-Cost Hardware',
    desc: 'Complete node under €30 using off-the-shelf components. Scale networks affordably where professional systems cannot reach.',
    color: 'green',
    gradient: 'from-green-500/20 to-green-500/5',
  },
  {
    icon: Layers,
    title: 'Local Data Logging',
    desc: 'MicroSD card logs raw acceleration data locally. No data is lost during network outages, enabling full post-event offline analysis.',
    color: 'cyan',
    gradient: 'from-cyan-500/20 to-cyan-500/5',
  },
  {
    icon: Bell,
    title: 'Smart Alerting',
    desc: 'Configurable thresholds trigger alerts via email, webhook, or MQTT when peak acceleration limits are exceeded.',
    color: 'red',
    gradient: 'from-red-500/20 to-red-500/5',
  },
  {
    icon: Clock,
    title: 'Precise Timestamping',
    desc: 'NTP-synchronized timestamps on every sample enable accurate inter-sensor event correlation and source location as the network grows.',
    color: 'blue',
    gradient: 'from-blue-500/20 to-blue-500/5',
  },
  {
    icon: Globe,
    title: 'Web-Based Dashboard',
    desc: 'Access your monitoring data from any browser. No desktop software required — pure React frontend with WebSocket streaming.',
    color: 'green',
    gradient: 'from-emerald-500/20 to-emerald-500/5',
  },
  {
    icon: Lock,
    title: 'Standards Aware',
    desc: 'Analysis oriented toward ISO 4866 and DIN 4150 vibration evaluation standards. Designed as a research and educational tool.',
    color: 'cyan',
    gradient: 'from-cyan-500/20 to-cyan-500/5',
  },
]

const colorMap = {
  blue: { iconBg: 'bg-blue-500/15', icon: 'text-blue-400', dot: 'bg-blue-400' },
  green: { iconBg: 'bg-emerald-500/15', icon: 'text-emerald-400', dot: 'bg-emerald-400' },
  cyan: { iconBg: 'bg-cyan-500/15', icon: 'text-cyan-400', dot: 'bg-cyan-400' },
  yellow: { iconBg: 'bg-yellow-500/15', icon: 'text-yellow-400', dot: 'bg-yellow-400' },
  red: { iconBg: 'bg-red-500/15', icon: 'text-red-400', dot: 'bg-red-400' },
}

export default function Features() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="features" ref={ref} className="py-28 relative overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-pulse-dark via-pulse-darker to-pulse-dark" />
      <div className="absolute inset-0 bg-dots opacity-30" />

      {/* Center glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-pulse-blue/8 rounded-full blur-3xl" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 bg-pulse-green/8 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="tag-green mb-4 inline-flex">
            <Zap size={10} />
            Capabilities
          </div>
          <p className="section-sub mx-auto">
            Every feature is designed for practical deployment — from a single research node
            to a city-wide sensor network.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {features.map((f, i) => {
            const c = colorMap[f.color] || colorMap.blue
            return (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.05, duration: 0.5 }}
                className={`group relative glass-hover rounded-2xl p-5 border border-white/8 overflow-hidden cursor-default`}
              >
                {/* Background gradient on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${f.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl`} />

                <div className="relative z-10">
                  <div className={`w-11 h-11 ${c.iconBg} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <f.icon size={20} className={c.icon} />
                  </div>
                  <h4 className="font-bold text-white text-sm mb-2 group-hover:text-white transition-colors">
                    {f.title}
                  </h4>
                  <p className="text-xs text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors">
                    {f.desc}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}