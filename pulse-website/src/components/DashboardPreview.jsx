import { useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  AreaChart, Area, XAxis, YAxis, BarChart, Bar,
  ResponsiveContainer, CartesianGrid, ReferenceLine,
} from 'recharts'
import { Activity, ExternalLink, Maximize2 } from 'lucide-react'
import { useSeismic } from '../hooks/SeismicContext'

const Y_RANGE   = 2.0
const PREVIEW_N = 120

const SENSORS_MOCK = [
  { id: 'PULSE-001', loc: 'Node 1 — Active', status: 'normal' },
  { id: 'PULSE-002', loc: 'Planned',          status: 'offline' },
  { id: 'PULSE-003', loc: 'Planned',          status: 'offline' },
  { id: 'PULSE-004', loc: 'Planned',          status: 'offline' },
]

// ─── Mini sismógrafo ───────────────────────────────────────────────────────────
function MiniWaveform() {
  const { waveformData } = useSeismic()
  const visible = waveformData.slice(-PREVIEW_N)

  return (
    <ResponsiveContainer width="100%" height={100}>
      <AreaChart data={visible} margin={{ top: 4, right: 0, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="waveGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%"  stopColor="#06B6D4" stopOpacity={0.25} />
            <stop offset="95%" stopColor="#06B6D4" stopOpacity={0}    />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
        <YAxis
          domain={[-Y_RANGE, Y_RANGE]}
          ticks={[-Y_RANGE, 0, Y_RANGE]}
          tick={{ fill: '#4B5563', fontSize: 8, fontFamily: 'monospace' }}
          tickLine={false}
          axisLine={false}
          width={28}
          tickFormatter={(v) => v.toFixed(1)}
        />
        <ReferenceLine y={0} stroke="rgba(255,255,255,0.15)" strokeWidth={1} />
        <Area
          type="linear"
          dataKey="az"
          stroke="#06B6D4"
          strokeWidth={1.5}
          fill="url(#waveGrad)"
          dot={false}
          isAnimationActive={false}
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}

// ─── Energia por segmento ─────────────────────────────────────────────────────
function MiniFFT() {
  const { waveformData } = useSeismic()
  const BINS = 16

  const fftData = Array.from({ length: BINS }, (_, i) => {
    const start  = Math.floor((i / BINS) * waveformData.length)
    const end    = Math.floor(((i + 1) / BINS) * waveformData.length)
    const slice  = waveformData.slice(start, end)
    const energy = slice.reduce((s, d) => s + Math.abs(d.az || 0), 0) / (slice.length || 1)
    return { bin: i, amplitude: energy }
  })

  return (
    <ResponsiveContainer width="100%" height={80}>
      <BarChart data={fftData} margin={{ top: 4, right: 0, left: 0, bottom: 0 }} barSize={5}>
        <defs>
          <linearGradient id="fftGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="#10B981" stopOpacity={0.9} />
            <stop offset="100%" stopColor="#10B981" stopOpacity={0.3} />
          </linearGradient>
        </defs>
        <Bar dataKey="amplitude" fill="url(#fftGrad)" radius={[2, 2, 0, 0]} isAnimationActive={false} />
      </BarChart>
    </ResponsiveContainer>
  )
}

// ─── Componente principal ──────────────────────────────────────────────────────
export default function DashboardPreview() {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [time, setTime] = useState(new Date().toLocaleTimeString())

  const { waveformData, totalAmostras, ultimoEvento } = useSeismic()

  useEffect(() => {
    const t = setInterval(() => setTime(new Date().toLocaleTimeString()), 1000)
    return () => clearInterval(t)
  }, [])

  const ultimoPonto = waveformData[waveformData.length - 1]
  const azAtual = ultimoPonto?.az ?? 0
  const axAtual = ultimoPonto?.ax ?? 0
  const pico    = waveformData.reduce((acc, d) => Math.max(acc, Math.abs(d.az || 0)), 0)
  const temDados = totalAmostras > 0

  return (
    <section id="dashboard" ref={ref} className="py-28 bg-pulse-dark relative overflow-hidden">
      <div className="absolute inset-0 bg-dots opacity-20" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-pulse-green/20 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="tag-green mb-4 inline-flex">
            <Activity size={10} />
            Live Preview
          </div>
          <h2 className="section-heading mb-4">
            Monitoring <span className="gradient-text">Dashboard</span>
          </h2>
          <p className="section-sub mx-auto">
            A preview of the real-time monitoring interface. When connected to the active node,
            this dashboard displays live acceleration data from the ADXL345 sensor.
          </p>
        </motion.div>

        {/* ── Dashboard mockup ──────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.97 }}
          animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="glass border border-white/10 rounded-3xl overflow-hidden shadow-glass"
        >
          {/* Barra de topo */}
          <div className="flex items-center justify-between px-4 py-3 bg-pulse-surface/80 border-b border-white/8">
            <div className="flex items-center gap-3">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/70" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
                <div className="w-3 h-3 rounded-full bg-green-500/70" />
              </div>
              <span className="text-xs font-mono text-gray-500">pulse-monitor — preview</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono text-gray-500">
                {ultimoEvento !== '—' ? ultimoEvento : time}
              </span>
              <Link
                to="/dashboard"
                className="flex items-center gap-1.5 text-xs font-semibold text-pulse-blue hover:text-pulse-cyan transition-colors"
              >
                <Maximize2 size={12} />
                Full View
              </Link>
            </div>
          </div>

          <div className="p-5 grid lg:grid-cols-3 gap-5">
            {/* ── Esquerda: lista de sensores ─────────────────────────────── */}
            <div className="flex flex-col gap-3">
              <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">
                Sensor Network
              </div>
              {SENSORS_MOCK.map((s) => {
                const isActive   = s.status === 'normal'
                const displayAcc = isActive ? Math.abs(azAtual).toFixed(3) : '—'
                return (
                  <div
                    key={s.id}
                    className={`flex items-center gap-3 p-3 rounded-xl border transition-all ${
                      s.status === 'offline'
                        ? 'bg-white/2 border-white/5 opacity-50'
                        : 'bg-white/3 border-white/8 hover:bg-white/6'
                    }`}
                  >
                    <span className={`w-2 h-2 rounded-full flex-shrink-0 ${
                      s.status === 'offline' ? 'bg-gray-600'
                        : temDados ? 'bg-emerald-400' : 'bg-yellow-500'
                    }`} />
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-semibold text-white font-mono">{s.id}</div>
                      <div className="text-[10px] text-gray-500">{s.loc}</div>
                    </div>
                    <div className="text-right">
                      <div className={`text-xs font-mono font-bold ${
                        s.status === 'offline' ? 'text-gray-600' : 'text-pulse-cyan'
                      }`}>
                        {displayAcc}
                      </div>
                      <div className="text-[10px] text-gray-600">{isActive ? 'm/s²' : '—'}</div>
                    </div>
                  </div>
                )
              })}

              <div className="mt-2 p-3 rounded-xl bg-pulse-blue/5 border border-pulse-blue/20">
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-1.5 h-1.5 bg-pulse-blue rounded-full" />
                  <span className="text-[10px] font-bold text-pulse-blue uppercase tracking-wider">
                    Network Status
                  </span>
                </div>
                <p className="text-[10px] text-gray-400">
                  1 node active · 3 nodes planned for future deployment
                </p>
                <p className="text-[10px] text-gray-600 mt-0.5 font-mono">
                  {totalAmostras > 0
                    ? `${totalAmostras.toLocaleString('pt')} amostras recebidas`
                    : time}
                </p>
              </div>
            </div>

            {/* ── Centro: Waveform + FFT ───────────────────────────────────── */}
            <div className="lg:col-span-2 flex flex-col gap-4">
              <div className="bg-pulse-surface/60 rounded-2xl p-4 border border-white/8">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <span className="text-xs font-semibold text-white">Z-Axis — PULSE-001</span>
                    <span className="ml-2 text-[10px] text-gray-500">ADXL345</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs font-mono">
                    <span className="text-pulse-cyan">{azAtual.toFixed(4)} m/s²</span>
                    <span className="text-gray-600">pico {pico.toFixed(3)}</span>
                  </div>
                </div>
                <MiniWaveform />
                <div className="flex items-center justify-between mt-1 text-[10px] font-mono text-gray-600">
                  <span>-{PREVIEW_N} pts</span>
                  <span>Tempo →</span>
                  <span>Agora</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-pulse-surface/60 rounded-2xl p-4 border border-white/8">
                  <div className="text-xs font-semibold text-white mb-2">Energia por segmento</div>
                  <MiniFFT />
                  <div className="flex items-center justify-between mt-1 text-[10px] font-mono text-gray-600">
                    <span>Início</span>
                    <span>Janela →</span>
                    <span>Fim</span>
                  </div>
                </div>

                <div className="bg-pulse-surface/60 rounded-2xl p-4 border border-white/8 flex flex-col gap-3">
                  <div className="text-xs font-semibold text-white mb-1">Node Stats</div>
                  {[
                    { label: 'Online nodes', value: temDados ? '1/4' : '0/4', color: temDados ? 'text-emerald-400' : 'text-gray-500' },
                    { label: 'Sensor',       value: 'ADXL345',                color: 'text-pulse-cyan' },
                    { label: 'Axes',         value: 'X · Y · Z',              color: 'text-pulse-cyan' },
                    { label: 'AX actual',    value: `${axAtual.toFixed(4)} m/s²`, color: 'text-blue-400' },
                    { label: 'AZ actual',    value: `${azAtual.toFixed(4)} m/s²`, color: 'text-amber-400' },
                  ].map((s) => (
                    <div key={s.label} className="flex items-center justify-between">
                      <span className="text-[11px] text-gray-500">{s.label}</span>
                      <span className={`text-[11px] font-bold font-mono ${s.color}`}>{s.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="px-5 py-2.5 bg-pulse-surface/60 border-t border-white/5 flex items-center justify-between">
            <span className="text-[10px] font-mono text-gray-600">
              PULSE v1.0 · ADXL345 · Supabase
            </span>
            <Link
              to="/dashboard"
              className="flex items-center gap-1.5 text-xs font-semibold text-pulse-blue hover:text-white transition-colors"
            >
              Open Full Dashboard <ExternalLink size={11} />
            </Link>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="mt-8 text-center"
        >
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-pulse-blue to-pulse-green text-white font-bold px-8 py-4 rounded-2xl hover:shadow-glow-blue hover:scale-105 transition-all duration-300 text-sm"
          >
            <Activity size={16} />
            Open Full Monitoring Dashboard
            <ExternalLink size={14} />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
