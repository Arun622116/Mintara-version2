'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { RANKINGS } from '@/lib/data'
import { pal, formatChange } from '@/lib/utils'

const TIME_TABS = ['1h','6h','24h','7d','30d'] as const

export default function TrendingCollections() {
  const [tab, setTab] = useState<'trending'|'top'>('trending')
  const [time, setTime] = useState<typeof TIME_TABS[number]>('24h')
  const router = useRouter()

  const sorted = [...RANKINGS].sort((a, b) =>
    tab === 'trending' ? b.change24h - a.change24h : b.volumeAll - a.volumeAll
  )

  return (
    <div>
      {/* Controls */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, flexWrap: 'wrap', gap: 10 }}>
        <div style={{ display: 'flex', gap: 4 }}>
          {(['trending','top'] as const).map(t => (
            <button key={t} onClick={() => setTab(t)}
              style={{ padding: '6px 14px', borderRadius: 8, border: '1px solid', fontSize: 13, fontWeight: 600, cursor: 'pointer', transition: '.15s',
                background: tab === t ? 'var(--gray-900)' : 'white', color: tab === t ? 'white' : 'var(--gray-600)', borderColor: tab === t ? 'var(--gray-900)' : 'var(--gray-200)' }}>
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 4 }}>
          {TIME_TABS.map(t => (
            <button key={t} onClick={() => setTime(t)}
              style={{ padding: '4px 10px', borderRadius: 6, border: 'none', fontSize: 12, fontWeight: 600, cursor: 'pointer',
                background: time === t ? 'var(--gray-100)' : 'transparent', color: time === t ? 'var(--gray-900)' : 'var(--gray-500)' }}>
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div style={{ border: '1px solid var(--gray-200)', borderRadius: 12, overflow: 'hidden' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '48px 1fr 120px 120px 90px', padding: '10px 20px', borderBottom: '1px solid var(--gray-150)', background: 'var(--gray-50)' }}>
          {['#','Collection','Floor','Volume','Change'].map(h => (
            <div key={h} style={{ fontSize: 11, fontWeight: 700, color: 'var(--gray-400)', textTransform: 'uppercase', letterSpacing: '.06em', textAlign: h === 'Change' ? 'right' : 'left' }}>{h}</div>
          ))}
        </div>
        {sorted.slice(0, 6).map((col, i) => {
          const p = pal(col.avatarPaletteIndex)
          const pos = col.change24h >= 0
          return (
            <div key={col.id} onClick={() => router.push(`/collection/${col.slug}`)}
              style={{ display: 'grid', gridTemplateColumns: '48px 1fr 120px 120px 90px', padding: '14px 20px', borderBottom: i < 5 ? '1px solid var(--gray-150)' : 'none', cursor: 'pointer', transition: 'background .12s', alignItems: 'center' }}
              onMouseEnter={e => (e.currentTarget.style.background = 'var(--gray-50)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'white')}
            >
              <span style={{ fontSize: 13, color: 'var(--gray-400)', fontFamily: 'monospace' }}>{i + 1}</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, minWidth: 0 }}>
                <div style={{ width: 40, height: 40, borderRadius: 8, background: `linear-gradient(135deg,${p.from},${p.to})`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, color: p.accent, flexShrink: 0 }}>{p.accent[0]}</div>
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--gray-900)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', display: 'flex', alignItems: 'center', gap: 6 }}>
                    {col.name}
                    {col.isVerified && <span className="verified-check">✓</span>}
                  </div>
                  <div style={{ fontSize: 12, color: 'var(--gray-500)' }}>{col.category}</div>
                </div>
              </div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--gray-900)' }}>{col.floorPrice} MATIC</div>
                <div style={{ fontSize: 11, color: 'var(--gray-500)' }}>{col.floorPriceINR}</div>
              </div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--gray-900)' }}>{col.volumeAll.toLocaleString()} MATIC</div>
                <div style={{ fontSize: 11, color: 'var(--gray-500)' }}>{col.volumeAllINR}</div>
              </div>
              <div style={{ textAlign: 'right', fontSize: 13, fontWeight: 700, color: pos ? '#16a34a' : '#dc2626', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 2 }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points={pos ? '18 15 12 9 6 15' : '6 9 12 15 18 9'}/></svg>
                {formatChange(col.change24h)}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
