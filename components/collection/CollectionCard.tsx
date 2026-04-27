'use client'
import { useRouter } from 'next/navigation'
import type { Collection } from '@/lib/types'
import { pal } from '@/lib/utils'

interface Props { collection: Collection }

export default function CollectionCard({ collection: c }: Props) {
  const router = useRouter()
  const bp = pal(c.bannerPaletteIndex)
  const ap = pal(c.avatarPaletteIndex)

  return (
    <div
      onClick={() => router.push(`/collection/${c.slug}`)}
      style={{ width: 280, border: '1px solid var(--gray-200)', borderRadius: 16, overflow: 'hidden', cursor: 'pointer', background: 'white', transition: 'border-color .2s, box-shadow .2s', flexShrink: 0 }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--gray-300)'; e.currentTarget.style.boxShadow = 'var(--shadow-card-hover)' }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--gray-200)'; e.currentTarget.style.boxShadow = 'none' }}
    >
      {/* Banner */}
      <div style={{ height: 160, background: `linear-gradient(135deg,${bp.from},${bp.to})`, position: 'relative', overflow: 'hidden' }}>
        <span style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', fontSize: 60, color: bp.accent, opacity: .2, userSelect: 'none' }}>{bp.accent[0]}</span>
      </div>
      {/* Body */}
      <div style={{ padding: '16px 16px 16px' }}>
        {/* Avatar overlapping banner */}
        <div style={{
          width: 52, height: 52, borderRadius: 10,
          background: `linear-gradient(135deg,${ap.from},${ap.to})`,
          border: '3px solid white', boxShadow: 'var(--shadow-sm)',
          marginTop: -42, marginBottom: 8,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 22, color: ap.accent, position: 'relative', zIndex: 1,
        }}>{ap.accent[0]}</div>
        <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--gray-900)', display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
          {c.name}
          {c.isVerified && <span className="verified-check">✓</span>}
          {c.isNew && <span className="badge badge-new" style={{ fontSize: 10 }}>New</span>}
        </div>
        <div style={{ fontSize: 12, color: 'var(--gray-500)', marginBottom: 12 }}>by {c.creatorName}</div>
        <div style={{ display: 'flex', gap: 16, marginBottom: 14 }}>
          <div><div style={{ fontSize: 12, color: 'var(--gray-400)', marginBottom: 2 }}>Floor</div><div style={{ fontSize: 13, fontWeight: 700, color: 'var(--gray-900)' }}>{c.floorPrice} MATIC</div></div>
          <div><div style={{ fontSize: 12, color: 'var(--gray-400)', marginBottom: 2 }}>Items</div><div style={{ fontSize: 13, fontWeight: 700, color: 'var(--gray-900)' }}>{c.totalItems.toLocaleString()}</div></div>
        </div>
        <button style={{ width: '100%', height: 36, border: '1px solid var(--gray-200)', borderRadius: 8, background: 'white', fontSize: 13, fontWeight: 600, color: 'var(--gray-700)', cursor: 'pointer', transition: '.15s' }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--blue)'; e.currentTarget.style.color = 'var(--blue)' }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--gray-200)'; e.currentTarget.style.color = 'var(--gray-700)' }}
        >View collection</button>
      </div>
    </div>
  )
}
