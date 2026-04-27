'use client'
import { useState } from 'react'
import type { Creator } from '@/lib/types'
import { pal } from '@/lib/utils'
import { useToast } from '@/app/layout'

interface Props { creator: Creator }

export default function CreatorProfileHeader({ creator: c }: Props) {
  const [following, setFollowing] = useState(false)
  const [expanded, setExpanded] = useState(false)
  const { showToast } = useToast()
  const p = pal(c.paletteIndex)

  return (
    <div>
      {/* Banner */}
      <div style={{ height: 320, background: `linear-gradient(135deg,${p.from},${p.to})`, position: 'relative', overflow: 'hidden' }}>
        <span style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', fontSize: 160, color: p.accent, opacity: .12, userSelect: 'none', fontWeight: 700 }}>{p.accent[0]}</span>
      </div>
      <div style={{ background: 'white', padding: '0 24px 24px' }}>
        {/* Avatar */}
        <div style={{ width: 96, height: 96, borderRadius: '50%', background: `linear-gradient(135deg,${p.from},${p.to})`, border: '4px solid white', marginTop: -48, marginBottom: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 38, fontWeight: 700, color: p.accent, position: 'relative', zIndex: 1 }}>
          {c.displayName[0]}
        </div>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12, marginBottom: 12 }}>
          <div>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 800, color: 'var(--gray-900)', display: 'flex', alignItems: 'center', gap: 8 }}>
              {c.displayName}
              {c.verified && <span className="verified-check">✓</span>}
            </h1>
            <div style={{ fontSize: 14, color: 'var(--gray-500)' }}>@{c.username} · Joined {new Date(c.joinedAt).toLocaleDateString('en-IN', { month: 'short', year: 'numeric' })}</div>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button onClick={() => showToast('Link copied!')} style={{ height: 38, padding: '0 16px', borderRadius: 8, border: '1px solid var(--gray-200)', background: 'white', fontSize: 13, fontWeight: 600, cursor: 'pointer', color: 'var(--gray-700)' }}>Share</button>
            <button onClick={() => { setFollowing(f => !f); showToast(following ? `Unfollowed ${c.displayName}` : `Following ${c.displayName}!`, following ? 'info' : 'success') }}
              style={{ height: 38, padding: '0 20px', borderRadius: 8, border: `1.5px solid ${following ? 'var(--blue)' : 'var(--gray-300)'}`, background: following ? 'var(--blue)' : 'white', color: following ? 'white' : 'var(--gray-700)', fontSize: 13, fontWeight: 600, cursor: 'pointer', transition: '.2s' }}>
              {following ? 'Following ✓' : '+ Follow'}
            </button>
          </div>
        </div>
        <p style={{ fontSize: 14, color: 'var(--gray-600)', lineHeight: 1.65, maxWidth: 560, marginBottom: 16 }}>
          {expanded ? c.bio : c.bio.slice(0, 140) + (c.bio.length > 140 ? '…' : '')}
          {c.bio.length > 140 && <button onClick={() => setExpanded(e => !e)} style={{ background: 'none', border: 'none', color: 'var(--blue)', cursor: 'pointer', fontWeight: 600, fontSize: 14, marginLeft: 4 }}>{expanded ? 'Less' : 'Read more'}</button>}
        </p>
        <div style={{ display: 'flex', gap: 28, flexWrap: 'wrap', paddingTop: 16, borderTop: '1px solid var(--gray-150)' }}>
          {[
            { label: 'Total volume', value: c.totalVolumeINR },
            { label: 'Total sales', value: c.totalSales.toLocaleString() },
            { label: 'Followers', value: c.followers.toLocaleString() },
            { label: 'Following', value: c.following.toLocaleString() },
          ].map(s => (
            <div key={s.label}>
              <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--gray-900)' }}>{s.value}</div>
              <div style={{ fontSize: 12, color: 'var(--gray-500)', marginTop: 2 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
