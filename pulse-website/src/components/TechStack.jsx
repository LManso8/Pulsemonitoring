import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Cpu, Code2, Wifi, Database, GitBranch, Activity } from 'lucide-react'

const techItems = [
  {
    name: 'Raspberry Pi Pico W',
    category: 'Microcontroller',
    desc: 'RP2040 dual-core ARM Cortex-M0+ @ 133MHz with integrated Wi-Fi 802.11n. Reads the ADXL345 via I2C, timestamps samples, and transmits data wirelessly. Built-in 12-bit ADC at 500 ksps.',
    icon: Cpu,
    color: 'from-red-500/20 to-red-500/5',
    border: 'border-red-500/30',
    iconColor: 'text-red-400',
    specs: ['133 MHz', '264KB SRAM', 'Wi-Fi 2.4GHz', 'I²C'],
  },
  {
    name: 'ADXL345',
    category: '3-Axis Accelerometer',
    desc: 'Analog Devices low-power digital accelerometer with I²C interface. No external ADC required — digitization is built in. Selectable measurement range from ±2g to ±16g with 13-bit resolution.',
    icon: Activity,
    color: 'from-blue-500/20 to-blue-500/5',
    border: 'border-blue-500/30',
    iconColor: 'text-blue-400',
    specs: ['±2g–±16g', '13-bit', 'I²C', '3 axes'],
  },
  {
    name: 'MicroSD Module',
    category: 'Local Storage',
    desc: 'SPI-interface microSD card module for on-device data logging. Records raw acceleration samples locally, enabling post-event analysis even without a network connection.',
    icon: Database,
    color: 'from-emerald-500/20 to-emerald-500/5',
    border: 'border-emerald-500/30',
    iconColor: 'text-emerald-400',
    specs: ['SPI interface', 'FAT32', 'Local logging', 'Hot-swap ready'],
  },
  {
    name: 'Mean Well RS-15-5',
    category: 'Power Supply',
    desc: 'Industrial-grade 5 VDC / 3 A regulated power supply. Provides clean, stable power to the node electronics, ensuring noise-free sensor readings.',
    icon: Activity,
    color: 'from-yellow-500/20 to-yellow-500/5',
    border: 'border-yellow-500/30',
    iconColor: 'text-yellow-400',
    specs: ['5 VDC', '3 A / 15 W', 'Industrial', 'Low noise'],
  },
  {
    name: 'Python / NumPy',
    category: 'Signal Processing',
    desc: 'Scientific computing stack for real-time signal processing. FFT analysis, Butterworth bandpass filtering, peak acceleration calculation, and event detection pipelines.',
    icon: Code2,
    color: 'from-yellow-500/20 to-yellow-500/5',
    border: 'border-yellow-500/30',
    iconColor: 'text-yellow-400',
    specs: ['NumPy FFT', 'SciPy filters', 'FastAPI server', 'MicroPython FW'],
  },
  {
    name: 'Wi-Fi / MQTT',
    category: 'Communication',
    desc: 'Lightweight MQTT protocol for publish-subscribe data streaming between sensor nodes and the central processing server. Sub-second end-to-end latency.',
    icon: Wifi,
    color: 'from-violet-500/20 to-violet-500/5',
    border: 'border-violet-500/30',
    iconColor: 'text-violet-400',
    specs: ['MQTT 3.1.1', '< 1s latency', 'LoRa ready', 'TLS optional'],
  },
  {
    name: 'React + Recharts',
    category: 'Frontend',
    desc: 'Modern React dashboard with Framer Motion animations, Recharts for real-time data visualization, and Tailwind CSS for responsive, premium design.',
    icon: Code2,
    color: 'from-pink-500/20 to-pink-500/5',
    border: 'border-pink-500/30',
    iconColor: 'text-pink-400',
    specs: ['React 18', 'Recharts', 'Framer Motion', 'WebSockets ready'],
  },
  {
    name: 'Open Source / GitHub',
    category: 'Infrastructure',
    desc: 'All code, schematics, and documentation published under MIT license. Modular repository structure for firmware, backend, and frontend separation.',
    icon: GitBranch,
    color: 'from-gray-500/20 to-gray-500/5',
    border: 'border-gray-500/30',
    iconColor: 'text-gray-300',
    specs: ['MIT License', 'GitHub', 'Docker ready', 'Full docs'],
  },
]

export default function TechStack() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="tech" ref={ref} className="py-28 bg-pulse-darker relative overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-15" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-pulse-blue/20 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-pulse-green/20 to-transparent" />

      {/* Corner glows */}
      <div className="absolute top-20 left-20 w-72 h-72 bg-pulse-blue/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-20 w-72 h-72 bg-pulse-green/5 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="tag-blue mb-4 inline-flex">
            <Cpu size={10} />
            Technology
          </div>
          <h2 className="section-heading mb-4">
            The{' '}
            <span className="gradient-text">Tech Stack</span>
          </h2>
          <p className="section-sub mx-auto">
            Every component chosen for precision, affordability, and open-source compatibility.
            Hardware-to-cloud, fully documented.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {techItems.map((item, i) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.07, duration: 0.5 }}
              className={`group relative overflow-hidden rounded-2xl border ${item.border} bg-pulse-surface/50 hover:bg-pulse-surface transition-all duration-300 hover:scale-[1.02]`}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-50 group-hover:opacity-100 transition-opacity duration-300`} />

              <div className="relative z-10 p-5">
                {/* Header */}
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="font-bold text-white text-sm">{item.name}</div>
                    <div className={`text-xs font-semibold ${item.iconColor} mt-0.5`}>{item.category}</div>
                  </div>
                  <item.icon size={18} className={`${item.iconColor} flex-shrink-0 mt-0.5`} />
                </div>

                {/* Description */}
                <p className="text-xs text-gray-400 leading-relaxed mb-4 group-hover:text-gray-300 transition-colors">
                  {item.desc}
                </p>

                {/* Specs chips */}
                <div className="flex flex-wrap gap-1.5">
                  {item.specs.map((spec) => (
                    <span
                      key={spec}
                      className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 border border-white/10 text-gray-400"
                    >
                      {spec}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Hardware BOM */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="mt-12 glass border border-white/10 rounded-3xl p-6"
        >
          <div className="text-center mb-6">
            <h3 className="text-base font-bold text-white">Complete Hardware BOM</h3>
            <p className="text-xs text-gray-500 mt-1">Bill of Materials — single node estimated cost</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-white/10">
                  {['Component', 'Model', 'Qty', 'Est. Cost', 'Purpose'].map((h) => (
                    <th key={h} className="px-4 py-2 text-left text-gray-500 font-semibold uppercase tracking-wider">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {[
                  ['Microcontroller', 'Raspberry Pi Pico W', '1', '€7', 'Data acquisition & Wi-Fi'],
                  ['Accelerometer', 'ADXL345 module', '1', '€5', '3-axis acceleration sensing'],
                  ['Storage', 'MicroSD SPI module', '1', '€3', 'Local data logging'],
                  ['Power', 'Mean Well RS-15-5', '1', '€11', 'Clean 5 VDC supply'],
                  ['Enclosure', '3D printed box', '1', '...', 'Field protection'],
                  ['Misc.', 'PCB, connectors, cables', '—', '€4', 'Assembly'],
                ].map(([comp, model, qty, cost, purpose]) => (
                  <tr key={comp} className="hover:bg-white/3 transition-colors">
                    <td className="px-4 py-2.5 font-medium text-white">{comp}</td>
                    <td className="px-4 py-2.5 font-mono text-gray-400">{model}</td>
                    <td className="px-4 py-2.5 text-center text-gray-400">{qty}</td>
                    <td className="px-4 py-2.5 text-pulse-green font-semibold">{cost}</td>
                    <td className="px-4 py-2.5 text-gray-500">{purpose}</td>
                  </tr>
                ))}
                <tr className="border-t border-white/20">
                  <td colSpan={3} className="px-4 py-2.5 font-bold text-white">Total</td>
                  <td className="px-4 py-2.5 font-black text-pulse-green text-sm">≈ €30</td>
                  <td className="px-4 py-2.5 text-gray-500 italic">per deployed node</td>
                </tr>
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

