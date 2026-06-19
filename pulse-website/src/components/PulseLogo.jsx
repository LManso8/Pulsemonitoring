export default function PulseLogo({ size = 'md', showText = true, light = false }) {
  const sizes = {
    sm: { svg: 36, text: 'text-lg', sub: 'text-xs' },
    md: { svg: 52, text: 'text-2xl', sub: 'text-sm' },
    lg: { svg: 72, text: 'text-4xl', sub: 'text-base' },
    xl: { svg: 96, text: 'text-5xl', sub: 'text-lg' },
  }
  const s = sizes[size] || sizes.md

  return (
    <div className="flex items-center gap-3">
      {/* SVG Icon – cityscape + seismic line */}
      <svg
        width={s.svg}
        height={Math.round(s.svg * 0.65)}
        viewBox="0 0 80 52"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="buildGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#3B82F6" />
            <stop offset="100%" stopColor="#06B6D4" />
          </linearGradient>
          <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#3B82F6" />
            <stop offset="60%" stopColor="#06B6D4" />
            <stop offset="100%" stopColor="#10B981" />
          </linearGradient>
        </defs>

        {/* Building 1 – small left */}
        <rect x="2" y="22" width="7" height="28" rx="1" fill="url(#buildGrad)" opacity="0.9" />
        {/* Windows */}
        <rect x="3.5" y="24" width="2" height="2" rx="0.3" fill="white" opacity="0.4" />
        <rect x="6.5" y="24" width="2" height="2" rx="0.3" fill="white" opacity="0.4" />
        <rect x="3.5" y="28" width="2" height="2" rx="0.3" fill="white" opacity="0.4" />
        <rect x="6.5" y="28" width="2" height="2" rx="0.3" fill="white" opacity="0.4" />

        {/* Building 2 – tall left-center */}
        <rect x="11" y="10" width="9" height="40" rx="1" fill="url(#buildGrad)" opacity="0.95" />
        {/* Antenna */}
        <rect x="15" y="4" width="1.5" height="8" rx="0.5" fill="#3B82F6" opacity="0.8" />
        <circle cx="15.75" cy="3.5" r="1.2" fill="#3B82F6" />
        {/* Windows */}
        <rect x="12.5" y="13" width="2.5" height="2.5" rx="0.3" fill="white" opacity="0.35" />
        <rect x="16.5" y="13" width="2.5" height="2.5" rx="0.3" fill="white" opacity="0.35" />
        <rect x="12.5" y="19" width="2.5" height="2.5" rx="0.3" fill="white" opacity="0.35" />
        <rect x="16.5" y="19" width="2.5" height="2.5" rx="0.3" fill="white" opacity="0.35" />
        <rect x="12.5" y="25" width="2.5" height="2.5" rx="0.3" fill="white" opacity="0.35" />
        <rect x="16.5" y="25" width="2.5" height="2.5" rx="0.3" fill="white" opacity="0.35" />

        {/* Building 3 – wide center */}
        <rect x="22" y="16" width="12" height="34" rx="1" fill="url(#buildGrad)" opacity="0.85" />
        <rect x="24" y="19" width="2.5" height="2.5" rx="0.3" fill="white" opacity="0.3" />
        <rect x="28" y="19" width="2.5" height="2.5" rx="0.3" fill="white" opacity="0.3" />
        <rect x="24" y="25" width="2.5" height="2.5" rx="0.3" fill="white" opacity="0.3" />
        <rect x="28" y="25" width="2.5" height="2.5" rx="0.3" fill="white" opacity="0.3" />
        <rect x="24" y="31" width="2.5" height="2.5" rx="0.3" fill="white" opacity="0.3" />
        <rect x="28" y="31" width="2.5" height="2.5" rx="0.3" fill="white" opacity="0.3" />

        {/* Building 4 – small right */}
        <rect x="36" y="24" width="6" height="26" rx="1" fill="url(#buildGrad)" opacity="0.75" />
        <rect x="37" y="27" width="2" height="2" rx="0.3" fill="white" opacity="0.3" />
        <rect x="37" y="32" width="2" height="2" rx="0.3" fill="white" opacity="0.3" />

        {/* Seismic / ECG line – runs across the middle */}
        <polyline
          points="0,32 6,32 9,32 11,32 13,28 15,38 17,22 19,40 21,32 24,32 30,32 34,32 40,32 44,32 50,32 80,32"
          stroke="url(#lineGrad)"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />

        {/* Glow dot on the heartbeat peak */}
        <circle cx="17" cy="22" r="2" fill="#06B6D4" opacity="0.9" />
      </svg>

      {showText && (
        <div className="flex flex-col leading-tight">
          <span
            className={`${s.text} font-bold tracking-tight bg-gradient-to-r from-blue-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent`}
          >
            Pulse
          </span>
          {size !== 'sm' && (
            <span className={`${s.sub} font-medium tracking-widest uppercase ${light ? 'text-gray-500' : 'text-gray-400'}`}>
              Smart Vibrations Monitoring
            </span>
          )}
        </div>
      )}
    </div>
  )
}
