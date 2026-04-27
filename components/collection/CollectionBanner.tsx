'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import type { Collection } from '@/lib/types'
import { pal } from '@/lib/utils'
import { useToast } from '@/app/layout'

interface Props { collection: Collection }

export default function CollectionBanner({ collection: c }: Props) {
  const bp = pal(c.bannerPaletteIndex)
  const ap = pal(c.avatarPaletteIndex)
  const router = useRouter()
  const { showToast } = useToast()
  const [expanded, setExpanded] = useState(false)

  return (
    <div>
      {/* Banner */}
      <div style={{ height: 280, background: `linear-gradient(135deg,${bp.from},${bp.to})`, position: 'relative', overflow: 'hidden' }}>
        <span style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', fontSize: 120, color: bp.accent, opacity: .15, userSelect: 'none', fontWeight: 700 }}>{bp.accent[0]}</span>
      </div>

      {/* Header */}
      <div style={{ background: 'white', padding: '0 24px 20px' }}>
        <div style={{ display: 'flex', gap: 16, alignItems: 'flex-end', marginBottom: 16 }}>
          {/* Avatar overlapping banner */}
          <div className="collection-avatar" style={{ background: `linear-gradient(135deg,${ap.from},${ap.to})`, marginTop: -44, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontSize: 32, color: ap.accent, opacity: .6 }}>{ap.accent[0]}</span>
          </div>
          <div style={{ flex: 1, paddingBottom: 4 }}>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 26, fontWeight: 800, color: 'var(--gray-900)', display: 'flex', alignItems: 'center', gap: 8 }}>
              {c.name}
              {c.isVerified && <span className="verified-check" title="Verified">✓</span>}
            </h1>
            <div style={{ fontSize: 14, color: 'var(--gray-500)', marginTop: 2 }}>
              by{' '}
              <span style={{ color: 'var(--blue)', cursor: 'pointer' }} onClick={() => router.push(`/artist/${c.creatorId}`)}>
                {c.creatorName} →
              </span>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button onClick={() => showToast('Link copied!')} style={{ padding: '8px 16px', borderRadius: 8, border: '1px solid var(--gray-200)', background: 'white', fontSize: 13, fontWeight: 600, cursor: 'pointer', color: 'var(--gray-700)' }}>Share</button>
          </div>
        </div>

        {/* Description */}
        <p style={{ fontSize: 14, color: 'var(--gray-600)', lineHeight: 1.6, maxWidth: 600, marginBottom: 16 }}>
          {expanded ? c.description : c.description.slice(0, 120) + (c.description.length > 120 ? '…' : '')}
          {c.description.length > 120 && (
            <button onClick={() => setExpanded(e => !e)} style={{ background: 'none', border: 'none', color: 'var(--blue)', cursor: 'pointer', fontWeight: 600, fontSize: 14, marginLeft: 4 }}>
              {expanded ? 'Less' : 'Read more'}
            </button>
          )}
        </p>

        {/* Stats strip */}
        <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap', paddingTop: 16, borderTop: '1px solid var(--gray-150)' }}>
          {[
            { label: 'Total volume', value: c.volumeAllINR },
            { label: 'Floor price', value: `${c.floorPrice} MATIC` },
            { label: 'Best offer', value: `${c.topOffer} MATIC` },
            { label: 'Listed', value: `${c.listed}%` },
            { label: 'Owners', value: c.totalOwners.toLocaleString() },
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
