'use client'
import { useRouter } from 'next/navigation'
import { ACTIVITY } from '@/lib/data'
import { pal, timeAgo } from '@/lib/utils'

const EVENT_COLORS: Record<string, { bg: string; color: string }> = {
  Sale:     { bg: 'rgba(34,197,94,.1)',   color: '#16a34a' },
  Offer:    { bg: 'rgba(32,129,226,.1)',  color: '#2081e2' },
  List:     { bg: 'rgba(139,92,246,.1)',  color: '#7c3aed' },
  Transfer: { bg: 'rgba(107,114,128,.1)', color: '#374151' },
  Mint:     { bg: 'rgba(245,158,11,.1)',  color: '#d97706' },
}

export default function ActivityFeed() {
  const router = useRouter()
  return (
    <div style={{ border: '1px solid var(--gray-200)', borderRadius: 12, overflow: 'hidden' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 100px 120px 80px 80px', padding: '10px 16px', borderBottom: '1px solid var(--gray-150)', background: 'var(--gray-50)' }}>
        {['Item','Event','Price','From','Time'].map(h => (
          <div key={h} style={{ fontSize: 11, fontWeight: 700, color: 'var(--gray-400)', textTransform: 'uppercase', letterSpacing: '.06em' }}>{h}</div>
        ))}
      </div>
      {ACTIVITY.map((a, i) => {
        const nftIdx = parseInt(a.nftId.replace('nft','')) - 1
        const p = pal(nftIdx % 12)
        const ev = EVENT_COLORS[a.eventType] ?? EVENT_COLORS.Transfer
        return (
          <div key={a.id} className="activity-row"
            style={{ display: 'grid', gridTemplateColumns: '1fr 100px 120px 80px 80px', padding: '12px 16px', borderBottom: i < ACTIVITY.length - 1 ? '1px solid var(--gray-150)' : 'none' }}
            onClick={() => router.push(`/nft/${a.nftId}`)}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, minWidth: 0 }}>
              <div style={{ width: 44, height: 44, borderRadius: 8, background: `linear-gradient(135deg,${p.from},${p.to})`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, color: p.accent, flexShrink: 0 }}>{p.accent[0]}</div>
              <div style={{ minWidth: 0 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--gray-900)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{a.nftName}</div>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <span style={{ padding: '3px 9px', borderRadius: 999, fontSize: 11, fontWeight: 600, background: ev.bg, color: ev.color }}>{a.eventType}</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              {a.price && <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--gray-900)' }}>{a.price} MATIC</span>}
              {a.priceINR && <span style={{ fontSize: 11, color: 'var(--gray-500)' }}>{a.priceINR}</span>}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', fontSize: 12, color: 'var(--gray-500)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{a.from}</div>
            <div style={{ display: 'flex', alignItems: 'center', fontSize: 12, color: 'var(--gray-400)' }}>{timeAgo(a.timestamp)}</div>
          </div>
        )
      })}
    </div>
  )
}
