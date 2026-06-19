import { useState, useEffect, useRef, useCallback } from 'react'

const WINDOW_SIZE = 300
const UPDATE_INTERVAL = 60 // ms → ~16Hz

function generateSeismicSample(t, sensorId = 0) {
  const offset = sensorId * 2.3
  // Multi-frequency harmonic components (realistic seismic background)
  const h1 = Math.sin(t * 0.7 + offset) * 0.18
  const h2 = Math.sin(t * 1.4 + offset * 1.3) * 0.10
  const h3 = Math.sin(t * 2.8 + offset * 0.7) * 0.05
  const h4 = Math.sin(t * 5.2 + offset * 1.9) * 0.025
  // High-frequency micro-tremor
  const hf = Math.sin(t * 12.1 + offset) * 0.01
  // Gaussian-like noise
  const noise = (Math.random() + Math.random() + Math.random() - 1.5) * 0.015
  return h1 + h2 + h3 + h4 + hf + noise
}

function generateFFTData() {
  return Array.from({ length: 32 }, (_, i) => {
    const freq = (i + 1) * 0.5
    let amplitude
    if (freq < 2) amplitude = 0.6 + Math.random() * 0.3
    else if (freq < 5) amplitude = 0.3 + Math.random() * 0.25
    else if (freq < 10) amplitude = 0.15 + Math.random() * 0.2
    else amplitude = 0.05 + Math.random() * 0.1
    return { freq: freq.toFixed(1), amplitude: parseFloat(amplitude.toFixed(3)) }
  })
}

const SENSORS = [
  { id: 'PULSE-001', name: 'Lisboa Centro', lat: 38.717, lng: -9.142, status: 'online' },
  { id: 'PULSE-002', name: 'Lisboa Norte', lat: 38.756, lng: -9.138, status: 'online' },
  { id: 'PULSE-003', name: 'Lisboa Sul', lat: 38.689, lng: -9.177, status: 'online' },
  { id: 'PULSE-004', name: 'Setúbal', lat: 38.524, lng: -8.893, status: 'alert' },
]

export function useSeismicData() {
  const tRef = useRef(0)
  const [waveformData, setWaveformData] = useState(() =>
    Array.from({ length: WINDOW_SIZE }, (_, i) => ({
      t: i,
      ch1: generateSeismicSample(i * 0.1, 0),
      ch2: generateSeismicSample(i * 0.1, 1),
      ch3: generateSeismicSample(i * 0.1, 2),
    }))
  )
  const [fftData, setFftData] = useState(() => generateFFTData())
  const [sensorStats, setSensorStats] = useState(() =>
    SENSORS.map((s, i) => ({
      ...s,
      pgv: parseFloat((0.1 + Math.random() * 0.4).toFixed(3)),
      freq: parseFloat((1 + Math.random() * 8).toFixed(1)),
      temp: parseFloat((18 + Math.random() * 10).toFixed(1)),
      battery: parseFloat((70 + Math.random() * 30).toFixed(0)),
      lastUpdate: new Date().toLocaleTimeString(),
    }))
  )
  const [events, setEvents] = useState([
    { id: 1, time: '14:32:05', sensor: 'PULSE-004', magnitude: '0.8', type: 'Micro-tremor', pgv: '0.47' },
    { id: 2, time: '14:28:41', sensor: 'PULSE-001', magnitude: '0.3', type: 'Traffic', pgv: '0.12' },
    { id: 3, time: '14:15:19', sensor: 'PULSE-002', magnitude: '1.1', type: 'Blast (far)', pgv: '0.83' },
    { id: 4, time: '13:58:02', sensor: 'PULSE-003', magnitude: '0.2', type: 'Ambient', pgv: '0.07' },
    { id: 5, time: '13:44:37', sensor: 'PULSE-001', magnitude: '0.6', type: 'Rail traffic', pgv: '0.31' },
  ])

  const eventCounterRef = useRef(6)

  useEffect(() => {
    const interval = setInterval(() => {
      tRef.current += 0.06

      setWaveformData(prev => {
        const newPoint = {
          t: prev[prev.length - 1].t + 1,
          ch1: generateSeismicSample(tRef.current, 0),
          ch2: generateSeismicSample(tRef.current, 1),
          ch3: generateSeismicSample(tRef.current, 2),
        }
        return [...prev.slice(1), newPoint]
      })

      // FFT update every ~1s
      if (Math.round(tRef.current * 100) % 17 === 0) {
        setFftData(generateFFTData())
      }

      // Sensor stats update every ~2s
      if (Math.round(tRef.current * 100) % 33 === 0) {
        setSensorStats(prev =>
          prev.map((s, i) => ({
            ...s,
            pgv: parseFloat((Math.max(0, s.pgv + (Math.random() - 0.5) * 0.05)).toFixed(3)),
            freq: parseFloat((Math.max(0.5, s.freq + (Math.random() - 0.5) * 0.3)).toFixed(1)),
            lastUpdate: new Date().toLocaleTimeString(),
          }))
        )
      }

      // Random event generation
      if (Math.random() < 0.003) {
        const types = ['Micro-tremor', 'Traffic', 'Rail traffic', 'Ambient', 'Unknown']
        const sensor = SENSORS[Math.floor(Math.random() * SENSORS.length)]
        const pgv = parseFloat((0.05 + Math.random() * 1.2).toFixed(2))
        setEvents(prev => [
          {
            id: eventCounterRef.current++,
            time: new Date().toLocaleTimeString(),
            sensor: sensor.id,
            magnitude: parseFloat((Math.random() * 2).toFixed(1)).toString(),
            type: types[Math.floor(Math.random() * types.length)],
            pgv: pgv.toString(),
          },
          ...prev.slice(0, 9),
        ])
      }
    }, UPDATE_INTERVAL)

    return () => clearInterval(interval)
  }, [])

  return { waveformData, fftData, sensorStats, events, sensors: SENSORS }
}
