'use client'
import { useState } from 'react'
import { notFound } from 'next/navigation'
import { CREATORS, NFTS, ACTIVITY } from '@/lib/data'
import CreatorProfileHeader from '@/components/creator/CreatorProfileHeader'
import NftGrid from '@/components/nft/NftGrid'
import { pal, timeAgo } from '@/lib/utils'

interface Props { params: { username: string } }

const EVENT_COLORS: Record<string, { bg: string; color: string }> = {
  Sale:     { bg: 'rgba(34,197,94,.1)',   color: '#16a34a' },
  Offer:    { bg: 'rgba(32,129,226,.1)',  color: '#2081e2' },
  List:     { bg: 'rgba(139,92,246,.1)',  color: '#7c3aed' },
  Transfer: { bg: 'rgba(107,114,128,.1)', color: '#374151' },
  Mint:     { bg: 'rgba(245,158,11,.1)',  color: '#d97706' },
}

export default function ArtistPage({ params }: Props) {
  const creator = CREATORS.find(c => c.username === params.username)
  if (!creator) notFound()

  const [tab, setTab] = useState<'created' | 'collected' | 'activity'>('created')

  const createdNfts = NFTS.filter(n => n.creatorId === creator.id)
  const collectedNfts = NFTS.filter(n => n.creatorId !== creator.id).slice(0, 4)
  const activity = ACTIVITY.filter(a => a.from === creator.username || a.to === creator.username)

  return (
    <div>
      <CreatorProfileHeader creator={creator} />

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px 64px' }}>
        {/* Tabs */}
        <div style={{ display: 'flex', gap: 4, borderBottom: '1px solid var(--gray-200)', marginBottom: 28, marginTop: 8 }}>
          {(['created', 'collected', 'activity'] as const).map(t => (
            <button key={t} onClick={() => setTab(t)}
              style={{ height: 44, padding: '0 20px', border: 'none', background: 'none', fontSize: 14, fontWeight: 600, cursor: 'pointer', color: tab === t ? 'var(--blue)' : 'var(--gray-500)', borderBottom: `2px solid ${tab === t ? 'var(--blue)' : 'transparent'}`, transition: '.15s', textTransform: 'capitalize' }}>
              {t === 'created' ? `Created (${createdNfts.length})` : t === 'collected' ? `Collected (${collectedNfts.length})` : 'Activity'}
            </button>
          ))}
        </div>

        {tab === 'created' && <NftGrid nfts={createdNfts} />}
        {tab === 'collected' && (
          collectedNfts.length > 0
            ? <NftGrid nfts={collectedNfts} />
            : <div style={{ textAlign: 'center', padding: 60, color: 'var(--gray-400)', fontSize: 14 }}>No collected items</div>
        )}
        {tab === 'activity' && (
          <div style={{ border: '1px solid var(--gray-200)', borderRadius: 12, overflow: 'hidden' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 100px 120px 80px 80px', padding: '10px 16px', borderBottom: '1px solid var(--gray-150)', background: 'var(--gray-50)' }}>
              {['Item', 'Event', 'Price', 'From', 'Time'].map(h => (
                <div key={h} style={{ fontSize: 11, fontWeight: 700, color: 'var(--gray-400)', textTransform: 'uppercase', letterSpacing: '.06em' }}>{h}</div>
              ))}
            </div>
            {activity.length === 0 && (
              <div style={{ padding: 40, textAlign: 'center', color: 'var(--gray-400)', fontSize: 14 }}>No activity yet</div>
            )}
            {activity.map((a, i) => {
              const p = pal((parseInt(a.nftId.replace('nft', '')) - 1) % 12)
              const ev = EVENT_COLORS[a.eventType] ?? EVENT_COLORS.Transfer
              return (
                <div key={a.id} className="activity-row"
                  style={{ display: 'grid', gridTemplateColumns: '1fr 100px 120px 80px 80px', padding: '12px 16px', borderBottom: i < activity.length - 1 ? '1px solid var(--gray-150)' : 'none' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{ width: 44, height: 44, borderRadius: 8, background: `linear-gradient(135deg,${p.from},${p.to})`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, color: p.accent, flexShrink: 0 }}>{p.accent[0]}</div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--gray-900)' }}>{a.nftName}</div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <span style={{ padding: '3px 9px', borderRadius: 999, fontSize: 11, fontWeight: 600, background: ev.bg, color: ev.color }}>{a.eventType}</span>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    {a.price && <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--gray-900)' }}>{a.price} MATIC</span>}
                    {a.priceINR && <span style={{ fontSize: 11, color: 'var(--gray-500)' }}>{a.priceINR}</span>}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', fontSize: 12, color: 'var(--gray-500)' }}>{a.from}</div>
                  <div style={{ display: 'flex', alignItems: 'center', fontSize: 12, color: 'var(--gray-400)' }}>{timeAgo(a.timestamp)}</div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
