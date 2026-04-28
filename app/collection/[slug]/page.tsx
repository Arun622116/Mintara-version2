'use client'
import { useState, useMemo } from 'react'
import { notFound } from 'next/navigation'
import { COLLECTIONS, NFTS, ACTIVITY } from '@/lib/data'
import { SORT_OPTIONS } from '@/lib/constants'
import CollectionBanner from '@/components/collection/CollectionBanner'
import FilterSidebar from '@/components/collection/FilterSidebar'
import NftGrid from '@/components/nft/NftGrid'
import { useFilter } from '@/hooks/useFilter'
import { pal, timeAgo } from '@/lib/utils'
import type { FilterState } from '@/lib/types'

interface Props { params: { slug: string } }

const EVENT_COLORS: Record<string, { bg: string; color: string }> = {
  Sale:     { bg: 'rgba(34,197,94,.1)',   color: '#16a34a' },
  Offer:    { bg: 'rgba(32,129,226,.1)',  color: '#2081e2' },
  List:     { bg: 'rgba(139,92,246,.1)',  color: '#7c3aed' },
  Transfer: { bg: 'rgba(107,114,128,.1)', color: '#374151' },
  Mint:     { bg: 'rgba(245,158,11,.1)',  color: '#d97706' },
}

export default function CollectionPage({ params }: Props) {
  const collection = COLLECTIONS.find(c => c.slug === params.slug)
  if (!collection) notFound()

  const [tab, setTab] = useState<'items' | 'activity'>('items')
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const { filters, toggleStatus, toggleCategory, toggleTrait, setPrice, setSort, activeCount } = useFilter()

  const collectionNfts = useMemo(() => {
    let list = NFTS.filter(n => n.collectionId === collection.id)
    if (filters.status.length) list = list.filter(n => filters.status.includes(n.status))
    if (filters.priceMin !== '') list = list.filter(n => n.price !== null && n.price >= parseFloat(filters.priceMin))
    if (filters.priceMax !== '') list = list.filter(n => n.price !== null && n.price <= parseFloat(filters.priceMax))
    if (filters.sortBy === 'price_low_high') list.sort((a, b) => (a.price ?? Infinity) - (b.price ?? Infinity))
    else if (filters.sortBy === 'price_high_low') list.sort((a, b) => (b.price ?? 0) - (a.price ?? 0))
    return list
  }, [filters, collection.id])

  const collectionActivity = ACTIVITY.filter(a => a.collectionId === collection.id)

  return (
    <div>
      <style>{`
        .col-page { max-width:1280px; margin:0 auto; padding:0 16px 64px; }
        .col-toolbar { display:flex; align-items:center; gap:8px; margin-bottom:16px; flex-wrap:wrap; }
        .col-sort { height:38px; padding:0 12px; border-radius:8px; border:1px solid var(--gray-200); background:white; font-size:13px; color:var(--gray-700); cursor:pointer; outline:none; max-width:160px; }
        .act-table { border:1px solid var(--gray-200); border-radius:12px; overflow:hidden; }
        .act-head { display:grid; grid-template-columns:1fr 90px 100px 70px; padding:10px 12px; border-bottom:1px solid var(--gray-150); background:var(--gray-50); }
        .act-row  { display:grid; grid-template-columns:1fr 90px 100px 70px; padding:12px; border-bottom:1px solid var(--gray-150); }
        .act-col-from { display:none; }
        @media (min-width:640px) {
          .col-page { padding:0 24px 64px; }
          .act-head { grid-template-columns:1fr 100px 120px 80px 80px; padding:10px 16px; }
          .act-row  { grid-template-columns:1fr 100px 120px 80px 80px; padding:12px 16px; }
          .act-col-from { display:flex; }
        }
      `}</style>
      <CollectionBanner collection={collection} />

      <div className="col-page">
        {/* Tabs */}
        <div style={{ display: 'flex', gap: 4, borderBottom: '1px solid var(--gray-200)', marginBottom: 20, marginTop: 8, overflowX: 'auto' }}>
          {(['items', 'activity'] as const).map(t => (
            <button key={t} onClick={() => setTab(t)}
              style={{ height: 44, padding: '0 16px', border: 'none', background: 'none', fontSize: 14, fontWeight: 600, cursor: 'pointer', color: tab === t ? 'var(--blue)' : 'var(--gray-500)', borderBottom: `2px solid ${tab === t ? 'var(--blue)' : 'transparent'}`, transition: '.15s', textTransform: 'capitalize' as const, whiteSpace: 'nowrap', flexShrink: 0 }}>
              {t === 'items' ? `Items (${collectionNfts.length})` : 'Activity'}
            </button>
          ))}
        </div>

        {tab === 'items' && (
          <>
            <div className="col-toolbar">
              <button onClick={() => setSidebarOpen(o => !o)}
                style={{ height: 38, padding: '0 14px', borderRadius: 8, border: '1px solid var(--gray-200)', background: sidebarOpen ? 'var(--gray-100)' : 'white', fontSize: 13, fontWeight: 600, color: 'var(--gray-700)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, flexShrink: 0 }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="4" y1="6" x2="20" y2="6"/><line x1="8" y1="12" x2="20" y2="12"/><line x1="12" y1="18" x2="20" y2="18"/></svg>
                Filters {activeCount > 0 && <span style={{ background: 'var(--blue)', color: 'white', borderRadius: 999, fontSize: 10, padding: '1px 6px' }}>{activeCount}</span>}
              </button>
              <span style={{ fontSize: 12, color: 'var(--gray-500)' }}>{collectionNfts.length} items</span>
              <div style={{ flex: 1 }} />
              <select value={filters.sortBy} onChange={e => setSort(e.target.value as FilterState['sortBy'])} className="col-sort">
                {SORT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
            </div>
            <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
              <FilterSidebar
                filters={filters}
                collapsed={!sidebarOpen}
                traits={collection.traits}
                onToggleStatus={toggleStatus}
                onToggleCategory={(c: string) => toggleCategory(c as import('@/lib/types').NftCategory)}
                onToggleTrait={toggleTrait}
                onSetPrice={setPrice}
              />
              <div style={{ flex: 1, minWidth: 0 }}>
                <NftGrid nfts={collectionNfts} />
              </div>
            </div>
          </>
        )}

        {tab === 'activity' && (
          <div className="act-table">
            <div className="act-head">
              {['Item', 'Event', 'Price', 'From', 'Time'].map((h, hi) => (
                <div key={h} className={hi === 3 ? 'act-col-from' : ''} style={{ fontSize: 11, fontWeight: 700, color: 'var(--gray-400)', textTransform: 'uppercase', letterSpacing: '.06em' }}>{h}</div>
              ))}
            </div>
            {collectionActivity.length === 0 && (
              <div style={{ padding: 40, textAlign: 'center', color: 'var(--gray-400)', fontSize: 14 }}>No activity yet</div>
            )}
            {collectionActivity.map((a, i) => {
              const p = pal((parseInt(a.nftId.replace('nft', '')) - 1) % 12)
              const ev = EVENT_COLORS[a.eventType] ?? EVENT_COLORS.Transfer
              return (
                <div key={a.id} className="activity-row act-row"
                  style={{ borderBottom: i < collectionActivity.length - 1 ? '1px solid var(--gray-150)' : 'none' }}>
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
                  <div className="act-col-from" style={{ alignItems: 'center', fontSize: 12, color: 'var(--gray-500)' }}>{a.from}</div>
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
