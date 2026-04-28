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
      <style>{`
        .cb-banner { height: 160px; }
        .cb-avatar { width: 64px; height: 64px; border-radius: 10px; border: 3px solid white; margin-top: -32px; }
        .cb-title { font-size: 20px; }
        .cb-body { padding: 0 16px 16px; }
        .cb-stats { display: flex; gap: 20px; overflow-x: auto; padding: 12px 0; border-top: 1px solid var(--gray-150); }
        .cb-stat { flex-shrink: 0; min-width: 70px; }
        @media (min-width: 640px) {
          .cb-banner { height: 200px; }
          .cb-avatar { width: 76px; height: 76px; border-radius: 14px; margin-top: -38px; }
          .cb-title { font-size: 24px; }
          .cb-body { padding: 0 24px 20px; }
          .cb-stats { gap: 28px; padding: 14px 0; }
          .cb-stat { min-width: 80px; }
        }
        @media (min-width: 768px) {
          .cb-banner { height: 260px; }
          .cb-avatar { width: 88px; height: 88px; border-radius: var(--r-lg); border-width: 4px; margin-top: -44px; }
          .cb-title { font-size: 26px; }
        }
      `}</style>

      {/* Banner */}
      <div className="cb-banner" style={{ background: `linear-gradient(135deg,${bp.from},${bp.to})`, position: 'relative', overflow: 'hidden' }}>
        <span style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', fontSize: 100, color: bp.accent, opacity: .15, userSelect: 'none', fontWeight: 700 }}>{bp.accent[0]}</span>
      </div>

      {/* Header */}
      <div className="cb-body" style={{ background: 'white' }}>
        <div style={{ display: 'flex', gap: 12, alignItems: 'flex-end', marginBottom: 12 }}>
          {/* Avatar */}
          <div className="cb-avatar collection-avatar" style={{ background: `linear-gradient(135deg,${ap.from},${ap.to})`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <span style={{ fontSize: 28, color: ap.accent, opacity: .6 }}>{ap.accent[0]}</span>
          </div>
          <div style={{ flex: 1, paddingBottom: 4, minWidth: 0 }}>
            <h1 className="cb-title" style={{ fontFamily: 'var(--font-display)', fontWeight: 800, color: 'var(--gray-900)', display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
              <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{c.name}</span>
              {c.isVerified && <span className="verified-check" title="Verified">✓</span>}
            </h1>
            <div style={{ fontSize: 13, color: 'var(--gray-500)', marginTop: 2 }}>
              by{' '}
              <span style={{ color: 'var(--blue)', cursor: 'pointer' }} onClick={() => router.push(`/artist/${c.creatorId}`)}>
                {c.creatorName} →
              </span>
            </div>
          </div>
          <button onClick={() => showToast('Link copied!')} style={{ padding: '7px 14px', borderRadius: 8, border: '1px solid var(--gray-200)', background: 'white', fontSize: 12, fontWeight: 600, cursor: 'pointer', color: 'var(--gray-700)', flexShrink: 0 }}>Share</button>
        </div>

        {/* Description */}
        <p style={{ fontSize: 13, color: 'var(--gray-600)', lineHeight: 1.6, maxWidth: 600, marginBottom: 12 }}>
          {expanded ? c.description : c.description.slice(0, 120) + (c.description.length > 120 ? '…' : '')}
          {c.description.length > 120 && (
            <button onClick={() => setExpanded(e => !e)} style={{ background: 'none', border: 'none', color: 'var(--blue)', cursor: 'pointer', fontWeight: 600, fontSize: 13, marginLeft: 4 }}>
              {expanded ? 'Less' : 'Read more'}
            </button>
          )}
        </p>

        {/* Stats strip — horizontally scrollable on mobile */}
        <div className="cb-stats scrollbar-hide">
          {[
            { label: 'Total volume', value: c.volumeAllINR },
            { label: 'Floor price', value: `${c.floorPrice} MATIC` },
            { label: 'Best offer', value: `${c.topOffer} MATIC` },
            { label: 'Listed', value: `${c.listed}%` },
            { label: 'Owners', value: c.totalOwners.toLocaleString() },
          ].map(s => (
            <div key={s.label} className="cb-stat">
              <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--gray-900)' }}>{s.value}</div>
              <div style={{ fontSize: 11, color: 'var(--gray-500)', marginTop: 2 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
