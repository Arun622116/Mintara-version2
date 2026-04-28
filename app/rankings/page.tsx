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
    <div style={{ maxWidth: 1280, margin: '0 auto', padding: '20px 16px 64px' }}>
      <style>{`
        .rank-title { font-size:22px; }
        .rank-controls { display:flex; flex-direction:column; gap:10px; margin-bottom:20px; }
        .rank-cats { display:flex; gap:4px; overflow-x:auto; padding-bottom:4px; }
        .rank-times { display:flex; gap:4px; }
        .rank-head { display:grid; grid-template-columns:32px 1fr 90px 70px; padding:10px 12px; }
        .rank-row  { display:grid; grid-template-columns:32px 1fr 90px 70px; padding:12px; }
        .rank-col-floor { display:none; }
        @media (min-width:480px) {
          .rank-head { grid-template-columns:36px 1fr 100px 90px 70px; }
          .rank-row  { grid-template-columns:36px 1fr 100px 90px 70px; }
          .rank-col-floor { display:flex; }
        }
        @media (min-width:640px) {
          .rank-title { font-size:28px; }
          .rank-controls { flex-direction:row; align-items:center; justify-content:space-between; margin-bottom:24px; }
          .rank-head { grid-template-columns:40px 1fr 140px 140px 80px; padding:12px 20px; }
          .rank-row  { grid-template-columns:40px 1fr 140px 140px 80px; padding:14px 20px; }
        }
        @media (min-width:1024px) {
          .rank-cats { flex-wrap:wrap; }
        }
      `}</style>
      <div style={{ marginBottom: 20 }}>
        <h1 className="rank-title" style={{ fontFamily: 'var(--font-display)', fontWeight: 800, color: 'var(--gray-900)', marginBottom: 4 }}>Rankings</h1>
        <p style={{ fontSize: 13, color: 'var(--gray-500)' }}>Top collections by trading volume</p>
      </div>

      {/* Controls */}
      <div className="rank-controls">
        <div className="rank-cats scrollbar-hide">
          {CATEGORY_TABS.map(tab => (
            <button key={tab} onClick={() => setCategory(tab)}
              style={{ height: 34, padding: '0 14px', borderRadius: 8, border: `1.5px solid ${category === tab ? 'var(--blue)' : 'var(--gray-200)'}`, background: category === tab ? 'var(--blue-tint)' : 'white', color: category === tab ? 'var(--blue)' : 'var(--gray-600)', fontSize: 13, fontWeight: 600, cursor: 'pointer', transition: '.15s', flexShrink: 0 }}>
              {tab}
            </button>
          ))}
        </div>
        <div className="rank-times">
          {TIME_FILTERS.map(tf => (
            <button key={tf} onClick={() => setTimeFilter(tf)}
              style={{ height: 34, padding: '0 12px', borderRadius: 8, border: `1.5px solid ${timeFilter === tf ? 'var(--blue)' : 'var(--gray-200)'}`, background: timeFilter === tf ? 'var(--blue-tint)' : 'white', color: timeFilter === tf ? 'var(--blue)' : 'var(--gray-600)', fontSize: 12, fontWeight: 600, cursor: 'pointer', transition: '.15s', flexShrink: 0 }}>
              {tf}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div style={{ border: '1px solid var(--gray-200)', borderRadius: 16, overflow: 'hidden' }}>
        <div className="rank-head" style={{ borderBottom: '1px solid var(--gray-150)', background: 'var(--gray-50)' }}>
          {['#', 'Collection', 'Volume', 'Floor', 'Change'].map((h, hi) => (
            <div key={h} className={hi === 3 ? 'rank-col-floor' : ''} style={{ fontSize: 11, fontWeight: 700, color: 'var(--gray-400)', textTransform: 'uppercase', letterSpacing: '.06em' }}>{h}</div>
          ))}
        </div>
        {rows.map((col, i) => {
          const ap = pal(col.avatarPaletteIndex)
          const change = col.change24h
          const changeStr = formatChange(change)
          const isPos = change >= 0
          return (
            <div key={col.id}
              onClick={() => router.push(`/collection/${col.slug}`)}
              className="rank-row"
              style={{ borderBottom: i < rows.length - 1 ? '1px solid var(--gray-150)' : 'none', cursor: 'pointer', transition: 'background .15s' }}
              onMouseEnter={e => { e.currentTarget.style.background = 'var(--gray-50)' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'white' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', fontSize: 13, fontWeight: 700, color: 'var(--gray-400)' }}>{i + 1}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, minWidth: 0 }}>
                <div style={{ width: 40, height: 40, borderRadius: 10, background: `linear-gradient(135deg,${ap.from},${ap.to})`, border: '2px solid white', boxShadow: 'var(--shadow-sm)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 15, color: ap.accent, flexShrink: 0 }}>
                  {ap.accent[0]}
                </div>
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--gray-900)', display: 'flex', alignItems: 'center', gap: 4, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {col.name}
                    {col.isVerified && <span className="verified-check">✓</span>}
                  </div>
                  <div style={{ fontSize: 11, color: 'var(--gray-500)' }}>{col.totalItems.toLocaleString()} items</div>
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--gray-900)' }}>{col.volumeAll}</div>
                <div style={{ fontSize: 10, color: 'var(--gray-400)' }}>all time</div>
              </div>
              <div className="rank-col-floor" style={{ flexDirection: 'column', justifyContent: 'center' }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--gray-900)' }}>{col.floorPrice} MATIC</div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', fontSize: 12, fontWeight: 700, color: isPos ? 'var(--green)' : 'var(--red)' }}>
                {isPos ? '↑' : '↓'} {changeStr}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
