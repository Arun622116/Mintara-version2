'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { RANKINGS } from '@/lib/data'
import { TIME_FILTERS } from '@/lib/constants'
import { pal, formatChange } from '@/lib/utils'

const CATEGORY_TABS = ['All', 'Art', 'Music', 'Sports', 'Photography', 'Collectibles']

export default function RankingsPage() {
  const [timeFilter, setTimeFilter] = useState('24h')
  const [category, setCategory] = useState('All')
  const router = useRouter()

  const rows = RANKINGS.slice(0, 20)

  return (
    <div style={{ maxWidth: 1280, margin: '0 auto', padding: '32px 24px 64px' }}>
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 800, color: 'var(--gray-900)', marginBottom: 4 }}>Rankings</h1>
        <p style={{ fontSize: 14, color: 'var(--gray-500)' }}>Top collections by trading volume</p>
      </div>

      {/* Controls */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12, marginBottom: 24 }}>
        {/* Category tabs */}
        <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
          {CATEGORY_TABS.map(tab => (
            <button key={tab} onClick={() => setCategory(tab)}
              style={{ height: 34, padding: '0 16px', borderRadius: 8, border: `1.5px solid ${category === tab ? 'var(--blue)' : 'var(--gray-200)'}`, background: category === tab ? 'var(--blue-tint)' : 'white', color: category === tab ? 'var(--blue)' : 'var(--gray-600)', fontSize: 13, fontWeight: 600, cursor: 'pointer', transition: '.15s' }}>
              {tab}
            </button>
          ))}
        </div>
        {/* Time filter */}
        <div style={{ display: 'flex', gap: 4 }}>
          {TIME_FILTERS.map(tf => (
            <button key={tf} onClick={() => setTimeFilter(tf)}
              style={{ height: 34, padding: '0 14px', borderRadius: 8, border: `1.5px solid ${timeFilter === tf ? 'var(--blue)' : 'var(--gray-200)'}`, background: timeFilter === tf ? 'var(--blue-tint)' : 'white', color: timeFilter === tf ? 'var(--blue)' : 'var(--gray-600)', fontSize: 13, fontWeight: 600, cursor: 'pointer', transition: '.15s' }}>
              {tf}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div style={{ border: '1px solid var(--gray-200)', borderRadius: 16, overflow: 'hidden' }}>
        {/* Header */}
        <div style={{ display: 'grid', gridTemplateColumns: '40px 1fr 140px 140px 80px', padding: '12px 20px', borderBottom: '1px solid var(--gray-150)', background: 'var(--gray-50)' }}>
          {['#', 'Collection', 'Volume', 'Floor', 'Change'].map(h => (
            <div key={h} style={{ fontSize: 11, fontWeight: 700, color: 'var(--gray-400)', textTransform: 'uppercase', letterSpacing: '.06em' }}>{h}</div>
          ))}
        </div>
        {rows.map((col, i) => {
          const bp = pal(col.bannerPaletteIndex)
          const ap = pal(col.avatarPaletteIndex)
          const change = col.change24h
          const changeStr = formatChange(change)
          const isPos = change >= 0
          return (
            <div key={col.id}
              onClick={() => router.push(`/collection/${col.slug}`)}
              style={{ display: 'grid', gridTemplateColumns: '40px 1fr 140px 140px 80px', padding: '14px 20px', borderBottom: i < rows.length - 1 ? '1px solid var(--gray-150)' : 'none', cursor: 'pointer', transition: 'background .15s' }}
              onMouseEnter={e => { e.currentTarget.style.background = 'var(--gray-50)' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'white' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', fontSize: 14, fontWeight: 700, color: 'var(--gray-400)' }}>{i + 1}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, minWidth: 0 }}>
                <div style={{ width: 44, height: 44, borderRadius: 10, background: `linear-gradient(135deg,${ap.from},${ap.to})`, border: '2px solid white', boxShadow: 'var(--shadow-sm)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, color: ap.accent, flexShrink: 0 }}>
                  {ap.accent[0]}
                </div>
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--gray-900)', display: 'flex', alignItems: 'center', gap: 6, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {col.name}
                    {col.isVerified && <span className="verified-check">✓</span>}
                  </div>
                  <div style={{ fontSize: 12, color: 'var(--gray-500)' }}>{col.totalItems.toLocaleString()} items</div>
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--gray-900)' }}>{col.volumeAll}</div>
                <div style={{ fontSize: 11, color: 'var(--gray-400)' }}>all time</div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--gray-900)' }}>{col.floorPrice} MATIC</div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', fontSize: 13, fontWeight: 700, color: isPos ? 'var(--green)' : 'var(--red)' }}>
                {isPos ? '↑' : '↓'} {changeStr}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
