import React from 'react'

export function BarChart({ data = [], labels = [], vbWidth = 360, vbHeight = 88, barColor = '#5b16a6' }) {
  const max = Math.max(...data, 1)
  const padding = 12
  const usableWidth = Math.max(vbWidth - padding * 2, 40)
  const barGap = 6
  const barWidth = Math.max(4, Math.floor(usableWidth / Math.max(data.length, 1)) - barGap)

  return (
    <svg width="100%" height={vbHeight} viewBox={`0 0 ${vbWidth} ${vbHeight}`} preserveAspectRatio="xMidYMid meet">
      {data.map((v, i) => {
        const barHeight = (v / max) * (vbHeight - 28)
        const x = padding + i * (barWidth + barGap)
        const y = vbHeight - barHeight - 12
        return (
          <g key={i}>
            <rect x={x} y={y} width={barWidth} height={barHeight} rx={3} fill={barColor} opacity={0.95} />
            <text x={x + barWidth / 2} y={vbHeight - 2} fontSize={9} textAnchor="middle" fill="#6e6872">{labels[i] || ''}</text>
          </g>
        )
      })}
    </svg>
  )
}

export function Sparkline({ data = [], vbWidth = 360, vbHeight = 60, stroke = '#5b16a6' }) {
  const max = Math.max(...data, 1)
  const min = Math.min(...data, 0)
  const points = data.map((v, i) => {
    const x = (i / Math.max(data.length - 1, 1)) * vbWidth
    const y = vbHeight - ((v - min) / Math.max(max - min || 1, 1)) * vbHeight
    return `${x},${y}`
  }).join(' ')

  return (
    <svg width="100%" height={vbHeight} viewBox={`0 0 ${vbWidth} ${vbHeight}`} preserveAspectRatio="xMidYMid meet">
      <polyline fill="none" stroke={stroke} strokeWidth={2} points={points} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default BarChart
