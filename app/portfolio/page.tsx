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
    <div style={{ maxWidth: 1280, margin: '0 auto', padding: '16px 16px 64px' }}>
      <style>{`
        .pf-summary { display:flex; align-items:center; gap:14px; margin-bottom:24px; padding:16px; border:1px solid var(--gray-200); border-radius:16px; background:white; }
        .pf-avatar { width:56px; height:56px; font-size:22px; }
        .pf-name { font-size:16px; }
        .pf-address { font-size:12px; }
        .pf-stats { display:flex; gap:16px; }
        .port-act-head { display:grid; grid-template-columns:1fr 90px 100px 70px; padding:10px 12px; border-bottom:1px solid var(--gray-150); background:var(--gray-50); }
        .port-act-row  { display:grid; grid-template-columns:1fr 90px 100px 70px; padding:12px; }
        .port-act-from { display:none; }
        .port-off-head { display:grid; grid-template-columns:1fr 110px 80px; padding:10px 12px; border-bottom:1px solid var(--gray-150); background:var(--gray-50); }
        .port-off-row  { display:grid; grid-template-columns:1fr 110px 80px; padding:14px 12px; align-items:center; }
        .port-off-col-exp { display:none; }
        @media (min-width:640px) {
          .pf-summary { gap:20px; padding:24px; margin-bottom:32px; }
          .pf-avatar { width:72px; height:72px; font-size:28px; }
          .pf-name { font-size:20px; }
          .pf-address { font-size:14px; }
          .pf-stats { gap:24px; }
          .port-act-head { grid-template-columns:1fr 100px 120px 80px 80px; padding:10px 16px; }
          .port-act-row  { grid-template-columns:1fr 100px 120px 80px 80px; padding:12px 16px; }
          .port-act-from { display:flex; }
          .port-off-head { grid-template-columns:1fr 140px 100px 100px; padding:10px 16px; }
          .port-off-row  { grid-template-columns:1fr 140px 100px 100px; padding:14px 16px; }
          .port-off-col-exp { display:flex; }
        }
      `}</style>
      {/* Profile summary */}
      <div className="pf-summary">
        <div className="pf-avatar" style={{ borderRadius: '50%', background: 'linear-gradient(135deg,#6366f1,#ec4899)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, color: 'white', flexShrink: 0 }}>A</div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div className="pf-name" style={{ fontWeight: 800, color: 'var(--gray-900)', fontFamily: 'var(--font-display)' }}>My Portfolio</div>
          <div className="pf-address" style={{ color: 'var(--gray-500)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>0x1234...abcd · Connect wallet</div>
        </div>
        <div className="pf-stats">
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
          <div className="port-act-head">
            {['Item', 'Event', 'Price', 'From', 'Time'].map((h, hi) => (
              <div key={h} className={hi === 3 ? 'port-act-from' : ''} style={{ fontSize: 11, fontWeight: 700, color: 'var(--gray-400)', textTransform: 'uppercase', letterSpacing: '.06em' }}>{h}</div>
            ))}
          </div>
          {ACTIVITY.map((a, i) => {
            const p = pal((parseInt(a.nftId.replace('nft', '')) - 1) % 12)
            const ev = EVENT_COLORS[a.eventType] ?? EVENT_COLORS.Transfer
            return (
              <div key={a.id} className="activity-row port-act-row"
                style={{ borderBottom: i < ACTIVITY.length - 1 ? '1px solid var(--gray-150)' : 'none' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, minWidth: 0 }}>
                  <div style={{ width: 36, height: 36, borderRadius: 8, background: `linear-gradient(135deg,${p.from},${p.to})`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, color: p.accent, flexShrink: 0 }}>{p.accent[0]}</div>
                  <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--gray-900)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{a.nftName}</div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <span style={{ padding: '3px 8px', borderRadius: 999, fontSize: 11, fontWeight: 600, background: ev.bg, color: ev.color }}>{a.eventType}</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  {a.price && <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--gray-900)' }}>{a.price} MATIC</span>}
                  {a.priceINR && <span style={{ fontSize: 11, color: 'var(--gray-500)' }}>{a.priceINR}</span>}
                </div>
                <div className="port-act-from" style={{ alignItems: 'center', fontSize: 12, color: 'var(--gray-500)' }}>{a.from}</div>
                <div style={{ display: 'flex', alignItems: 'center', fontSize: 12, color: 'var(--gray-400)' }}>{timeAgo(a.timestamp)}</div>
              </div>
            )
          })}
        </div>
      )}
      {(tab === 'offers_made' || tab === 'offers_received') && (
        <div style={{ border: '1px solid var(--gray-200)', borderRadius: 12, overflow: 'hidden' }}>
          <div className="port-off-head">
            {['Item', 'Offer Price', 'Status', 'Expires'].map((h, hi) => (
              <div key={h} className={hi === 3 ? 'port-off-col-exp' : ''} style={{ fontSize: 11, fontWeight: 700, color: 'var(--gray-400)', textTransform: 'uppercase', letterSpacing: '.06em' }}>{h}</div>
            ))}
          </div>
          {(tab === 'offers_made' ? offersMade : offersReceived).map((o, i) => {
            const nft = NFTS.find(n => n.id === o.nftId)
            const p = pal(nft?.paletteIndex ?? 0)
            return (
              <div key={o.id} className="port-off-row"
                style={{ borderBottom: i < offersMade.length - 1 ? '1px solid var(--gray-150)' : 'none' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, minWidth: 0 }}>
                  <div style={{ width: 36, height: 36, borderRadius: 8, background: `linear-gradient(135deg,${p.from},${p.to})`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, color: p.accent, flexShrink: 0 }}>{p.accent[0]}</div>
                  <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--gray-900)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{nft?.name ?? o.nftId}</div>
                </div>
                <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--gray-900)' }}>{o.amount} MATIC<div style={{ fontSize: 11, color: 'var(--gray-500)' }}>{o.amountINR}</div></div>
                <div><span style={{ padding: '3px 9px', borderRadius: 999, fontSize: 11, fontWeight: 600, background: 'rgba(32,129,226,.1)', color: '#2081e2' }}>Active</span></div>
                <div className="port-off-col-exp" style={{ fontSize: 12, color: 'var(--gray-500)', alignItems: 'center' }}>{timeAgo(o.expiresAt)}</div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
