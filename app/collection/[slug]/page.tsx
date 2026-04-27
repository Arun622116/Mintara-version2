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
      <CollectionBanner collection={collection} />

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px 64px' }}>
        {/* Tabs */}
        <div style={{ display: 'flex', gap: 4, borderBottom: '1px solid var(--gray-200)', marginBottom: 24, marginTop: 8 }}>
          {(['items', 'activity'] as const).map(t => (
            <button key={t} onClick={() => setTab(t)}
              style={{ height: 44, padding: '0 20px', border: 'none', background: 'none', fontSize: 14, fontWeight: 600, cursor: 'pointer', color: tab === t ? 'var(--blue)' : 'var(--gray-500)', borderBottom: `2px solid ${tab === t ? 'var(--blue)' : 'transparent'}`, transition: '.15s', textTransform: 'capitalize' as const }}>
              {t === 'items' ? `Items (${collectionNfts.length})` : 'Activity'}
            </button>
          ))}
        </div>

        {tab === 'items' && (
          <>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
              <button onClick={() => setSidebarOpen(o => !o)}
                style={{ height: 38, padding: '0 16px', borderRadius: 8, border: '1px solid var(--gray-200)', background: sidebarOpen ? 'var(--gray-100)' : 'white', fontSize: 13, fontWeight: 600, color: 'var(--gray-700)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}>
                ☰ Filters {activeCount > 0 && <span style={{ background: 'var(--blue)', color: 'white', borderRadius: 999, fontSize: 11, padding: '1px 6px' }}>{activeCount}</span>}
              </button>
              <div style={{ flex: 1, fontSize: 13, color: 'var(--gray-500)' }}>{collectionNfts.length} items</div>
              <select value={filters.sortBy} onChange={e => setSort(e.target.value as FilterState['sortBy'])}
                style={{ height: 38, padding: '0 12px', borderRadius: 8, border: '1px solid var(--gray-200)', background: 'white', fontSize: 13, color: 'var(--gray-700)', cursor: 'pointer', outline: 'none' }}>
                {SORT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
            </div>
            <div style={{ display: 'flex', gap: 20, alignItems: 'flex-start' }}>
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
          <div style={{ border: '1px solid var(--gray-200)', borderRadius: 12, overflow: 'hidden' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 100px 120px 80px 80px', padding: '10px 16px', borderBottom: '1px solid var(--gray-150)', background: 'var(--gray-50)' }}>
              {['Item', 'Event', 'Price', 'From', 'Time'].map(h => (
                <div key={h} style={{ fontSize: 11, fontWeight: 700, color: 'var(--gray-400)', textTransform: 'uppercase', letterSpacing: '.06em' }}>{h}</div>
              ))}
            </div>
            {collectionActivity.length === 0 && (
              <div style={{ padding: 40, textAlign: 'center', color: 'var(--gray-400)', fontSize: 14 }}>No activity yet</div>
            )}
            {collectionActivity.map((a, i) => {
              const p = pal((parseInt(a.nftId.replace('nft', '')) - 1) % 12)
              const ev = EVENT_COLORS[a.eventType] ?? EVENT_COLORS.Transfer
              return (
                <div key={a.id} className="activity-row"
                  style={{ display: 'grid', gridTemplateColumns: '1fr 100px 120px 80px 80px', padding: '12px 16px', borderBottom: i < collectionActivity.length - 1 ? '1px solid var(--gray-150)' : 'none' }}>
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
