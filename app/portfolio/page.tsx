'use client'
import { useState } from 'react'
import { NFTS, OFFERS, ACTIVITY } from '@/lib/data'
import NftGrid from '@/components/nft/NftGrid'
import { pal, timeAgo } from '@/lib/utils'

const EVENT_COLORS: Record<string, { bg: string; color: string }> = {
  Sale:     { bg: 'rgba(34,197,94,.1)',   color: '#16a34a' },
  Offer:    { bg: 'rgba(32,129,226,.1)',  color: '#2081e2' },
  List:     { bg: 'rgba(139,92,246,.1)',  color: '#7c3aed' },
  Transfer: { bg: 'rgba(107,114,128,.1)', color: '#374151' },
  Mint:     { bg: 'rgba(245,158,11,.1)',  color: '#d97706' },
}

type Tab = 'collected' | 'created' | 'activity' | 'offers_made' | 'offers_received'

export default function PortfolioPage() {
  const [tab, setTab] = useState<Tab>('collected')

  const collectedNfts = NFTS.slice(0, 6)
  const createdNfts = NFTS.slice(0, 4)
  const offersMade = OFFERS.slice(0, 2)
  const offersReceived = OFFERS.slice(1, 3)

  const TABS: { key: Tab; label: string }[] = [
    { key: 'collected', label: 'Collected' },
    { key: 'created', label: 'Created' },
    { key: 'activity', label: 'Activity' },
    { key: 'offers_made', label: 'Offers Made' },
    { key: 'offers_received', label: 'Offers Received' },
  ]

  return (
    <div style={{ maxWidth: 1280, margin: '0 auto', padding: '32px 24px 64px' }}>
      {/* Profile summary */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 32, padding: 24, border: '1px solid var(--gray-200)', borderRadius: 16, background: 'white' }}>
        <div style={{ width: 72, height: 72, borderRadius: '50%', background: 'linear-gradient(135deg,#6366f1,#ec4899)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28, fontWeight: 700, color: 'white', flexShrink: 0 }}>A</div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 20, fontWeight: 800, color: 'var(--gray-900)', fontFamily: 'var(--font-display)' }}>My Portfolio</div>
          <div style={{ fontSize: 14, color: 'var(--gray-500)' }}>0x1234...abcd · Connect wallet to see full portfolio</div>
        </div>
        <div style={{ display: 'flex', gap: 24 }}>
          {[
            { label: 'Items', value: collectedNfts.length },
            { label: 'Offers', value: offersMade.length },
          ].map(s => (
            <div key={s.label} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 18, fontWeight: 700, color: 'var(--gray-900)' }}>{s.value}</div>
              <div style={{ fontSize: 12, color: 'var(--gray-500)' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: 4, borderBottom: '1px solid var(--gray-200)', marginBottom: 28, overflowX: 'auto' }}>
        {TABS.map(t => (
          <button key={t.key} onClick={() => setTab(t.key)}
            style={{ height: 44, padding: '0 20px', border: 'none', background: 'none', fontSize: 14, fontWeight: 600, cursor: 'pointer', color: tab === t.key ? 'var(--blue)' : 'var(--gray-500)', borderBottom: `2px solid ${tab === t.key ? 'var(--blue)' : 'transparent'}`, transition: '.15s', whiteSpace: 'nowrap' }}>
            {t.label}
          </button>
        ))}
      </div>

      {tab === 'collected' && <NftGrid nfts={collectedNfts} />}
      {tab === 'created' && <NftGrid nfts={createdNfts} />}
      {tab === 'activity' && (
        <div style={{ border: '1px solid var(--gray-200)', borderRadius: 12, overflow: 'hidden' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 100px 120px 80px 80px', padding: '10px 16px', borderBottom: '1px solid var(--gray-150)', background: 'var(--gray-50)' }}>
            {['Item', 'Event', 'Price', 'From', 'Time'].map(h => (
              <div key={h} style={{ fontSize: 11, fontWeight: 700, color: 'var(--gray-400)', textTransform: 'uppercase', letterSpacing: '.06em' }}>{h}</div>
            ))}
          </div>
          {ACTIVITY.map((a, i) => {
            const p = pal((parseInt(a.nftId.replace('nft', '')) - 1) % 12)
            const ev = EVENT_COLORS[a.eventType] ?? EVENT_COLORS.Transfer
            return (
              <div key={a.id} className="activity-row"
                style={{ display: 'grid', gridTemplateColumns: '1fr 100px 120px 80px 80px', padding: '12px 16px', borderBottom: i < ACTIVITY.length - 1 ? '1px solid var(--gray-150)' : 'none' }}>
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
      {(tab === 'offers_made' || tab === 'offers_received') && (
        <div style={{ border: '1px solid var(--gray-200)', borderRadius: 12, overflow: 'hidden' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 140px 100px 100px', padding: '10px 16px', borderBottom: '1px solid var(--gray-150)', background: 'var(--gray-50)' }}>
            {['Item', 'Offer Price', 'Status', 'Expires'].map(h => (
              <div key={h} style={{ fontSize: 11, fontWeight: 700, color: 'var(--gray-400)', textTransform: 'uppercase', letterSpacing: '.06em' }}>{h}</div>
            ))}
          </div>
          {(tab === 'offers_made' ? offersMade : offersReceived).map((o, i) => {
            const nft = NFTS.find(n => n.id === o.nftId)
            const p = pal(nft?.paletteIndex ?? 0)
            return (
              <div key={o.id} style={{ display: 'grid', gridTemplateColumns: '1fr 140px 100px 100px', padding: '14px 16px', borderBottom: i < offersMade.length - 1 ? '1px solid var(--gray-150)' : 'none', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{ width: 44, height: 44, borderRadius: 8, background: `linear-gradient(135deg,${p.from},${p.to})`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, color: p.accent, flexShrink: 0 }}>{p.accent[0]}</div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--gray-900)' }}>{nft?.name ?? o.nftId}</div>
                </div>
                <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--gray-900)' }}>{o.amount} MATIC<div style={{ fontSize: 11, color: 'var(--gray-500)' }}>{o.amountINR}</div></div>
                <div><span style={{ padding: '3px 9px', borderRadius: 999, fontSize: 11, fontWeight: 600, background: 'rgba(32,129,226,.1)', color: '#2081e2' }}>Active</span></div>
                <div style={{ fontSize: 12, color: 'var(--gray-500)' }}>{timeAgo(o.expiresAt)}</div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
