'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import type { Creator } from '@/lib/types'
import { pal } from '@/lib/utils'
import { useToast } from '@/app/layout'

interface Props { creator: Creator }

export default function CreatorCard({ creator: c }: Props) {
  const [following, setFollowing] = useState(false)
  const { showToast } = useToast()
  const router = useRouter()
  const p = pal(c.paletteIndex)

  return (
    <div style={{ border: '1px solid var(--gray-200)', borderRadius: 16, overflow: 'hidden', background: 'white', cursor: 'pointer', transition: '.2s' }}
      onMouseEnter={e => { e.currentTarget.style.boxShadow = 'var(--shadow-card-hover)'; e.currentTarget.style.borderColor = 'var(--gray-300)' }}
      onMouseLeave={e => { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.borderColor = 'var(--gray-200)' }}
    >
      {/* Banner */}
      <div style={{ height: 80, background: `linear-gradient(135deg,${p.from},${p.to})`, cursor: 'pointer' }} onClick={() => router.push(`/artist/${c.username}`)} />
      <div style={{ padding: '0 16px 16px' }}>
        {/* Avatar */}
        <div onClick={() => router.push(`/artist/${c.username}`)}
          style={{ width: 56, height: 56, borderRadius: '50%', background: `linear-gradient(135deg,${p.from},${p.to})`, border: '3px solid white', marginTop: -28, marginBottom: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, fontWeight: 700, color: p.accent, position: 'relative', zIndex: 1 }}>
          {c.displayName[0]}
        </div>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 8, marginBottom: 8 }}>
          <div onClick={() => router.push(`/artist/${c.username}`)}>
            <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--gray-900)', display: 'flex', alignItems: 'center', gap: 6 }}>
              {c.displayName}
              {c.verified && <span className="verified-check">✓</span>}
            </div>
            <div style={{ fontSize: 12, color: 'var(--gray-500)' }}>@{c.username}</div>
          </div>
          <button onClick={() => { setFollowing(f => !f); showToast(following ? `Unfollowed ${c.displayName}` : `Following ${c.displayName}!`, following ? 'info' : 'success') }}
            style={{ height: 32, padding: '0 14px', borderRadius: 8, border: `1px solid ${following ? 'var(--blue)' : 'var(--gray-200)'}`, background: following ? 'var(--blue-tint)' : 'white', color: following ? 'var(--blue)' : 'var(--gray-700)', fontSize: 12, fontWeight: 600, cursor: 'pointer', flexShrink: 0 }}>
            {following ? 'Following ✓' : '+ Follow'}
          </button>
        </div>
        <div style={{ display: 'flex', gap: 16 }}>
          <div><div style={{ fontSize: 11, color: 'var(--gray-400)' }}>Volume</div><div style={{ fontSize: 13, fontWeight: 700, color: 'var(--gray-900)' }}>{c.totalVolumeINR}</div></div>
          <div><div style={{ fontSize: 11, color: 'var(--gray-400)' }}>Sales</div><div style={{ fontSize: 13, fontWeight: 700, color: 'var(--gray-900)' }}>{c.totalSales.toLocaleString()}</div></div>
          <div><div style={{ fontSize: 11, color: 'var(--gray-400)' }}>Followers</div><div style={{ fontSize: 13, fontWeight: 700, color: 'var(--gray-900)' }}>{c.followers.toLocaleString()}</div></div>
        </div>
      </div>
    </div>
  )
}
