'use client'
import { useState, useMemo } from 'react'
import { NFTS } from '@/lib/data'
import { SORT_OPTIONS, NFT_CATEGORIES } from '@/lib/constants'
import FilterSidebar from '@/components/collection/FilterSidebar'
import NftGrid from '@/components/nft/NftGrid'
import { useFilter } from '@/hooks/useFilter'
import type { Nft, NftCategory, FilterState } from '@/lib/types'

export default function ExplorePage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { filters, toggleStatus, toggleCategory, setPrice, setSort, clearAll, activeCount } = useFilter()

  const filtered = useMemo(() => {
    let list: Nft[] = [...NFTS]
    if (filters.status.length) list = list.filter(n => filters.status.includes(n.status))
    if (filters.categories.length) list = list.filter(n => filters.categories.includes(n.category))
    if (filters.chains.length) list = list.filter(n => filters.chains.includes(n.chain))
    if (filters.priceMin !== '') list = list.filter(n => n.price !== null && n.price >= parseFloat(filters.priceMin))
    if (filters.priceMax !== '') list = list.filter(n => n.price !== null && n.price <= parseFloat(filters.priceMax))
    const sort = filters.sortBy
    if (sort === 'price_low_high') list.sort((a, b) => (a.price ?? Infinity) - (b.price ?? Infinity))
    else if (sort === 'price_high_low') list.sort((a, b) => (b.price ?? 0) - (a.price ?? 0))
    else if (sort === 'recently_listed') list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    else if (sort === 'most_viewed') list.sort((a, b) => b.views - a.views)
    else if (sort === 'most_favorited') list.sort((a, b) => b.favorites - a.favorites)
    else if (sort === 'rarity_rare_first') list.sort((a, b) => (a.rarity ?? 999) - (b.rarity ?? 999))
    return list
  }, [filters])

  return (
    <div style={{ maxWidth: 1280, margin: '0 auto' }}>
      <style>{`
        .explore-header { padding: 20px 16px 0; }
        .explore-title { font-family: var(--font-display); font-size: 22px; font-weight: 800; color: var(--gray-900); margin-bottom: 4px; }
        .explore-cats { display: flex; gap: 8px; flex-wrap: wrap; padding: 12px 16px; overflow-x: auto; }
        .explore-toolbar { display: flex; align-items: center; gap: 8px; padding: 10px 16px; border-bottom: 1px solid var(--gray-200); position: sticky; top: 60px; background: white; z-index: 20; }
        .explore-body { padding: 16px; }
        @media (min-width: 640px) {
          .explore-header { padding: 28px 24px 0; }
          .explore-title { font-size: 26px; }
          .explore-cats { padding: 16px 24px; }
          .explore-toolbar { top: 72px; padding: 12px 24px; gap: 12px; }
          .explore-body { padding: 20px 24px; }
        }
        @media (min-width: 1024px) {
          .explore-sidebar-desktop { display: block !important; }
        }
      `}</style>

      {/* Header */}
      <div className="explore-header">
        <h1 className="explore-title">Explore</h1>
        <p style={{ fontSize: 13, color: 'var(--gray-500)' }}>Discover, collect, and sell extraordinary NFTs</p>
      </div>

      {/* Category pills */}
      <div className="explore-cats scrollbar-hide">
        {(['All', ...NFT_CATEGORIES] as string[]).map(cat => {
          const active = cat === 'All' ? filters.categories.length === 0 : filters.categories.includes(cat as NftCategory)
          return (
            <button key={cat}
              onClick={() => cat !== 'All' ? toggleCategory(cat as NftCategory) : clearAll()}
              style={{ height: 32, padding: '0 14px', borderRadius: 999, border: `1.5px solid ${active ? 'var(--blue)' : 'var(--gray-200)'}`, background: active ? 'var(--blue-tint)' : 'white', color: active ? 'var(--blue)' : 'var(--gray-600)', fontSize: 12, fontWeight: 600, cursor: 'pointer', transition: '.15s', whiteSpace: 'nowrap', flexShrink: 0 }}>
              {cat}
            </button>
          )
        })}
      </div>

      {/* Sticky toolbar */}
      <div className="explore-toolbar">
        <button onClick={() => setSidebarOpen(o => !o)}
          style={{ height: 36, padding: '0 14px', borderRadius: 8, border: '1px solid var(--gray-200)', background: 'white', fontSize: 13, fontWeight: 600, color: 'var(--gray-700)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, flexShrink: 0 }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="4" y1="6" x2="20" y2="6"/><line x1="8" y1="12" x2="20" y2="12"/><line x1="12" y1="18" x2="20" y2="18"/></svg>
          <span>Filter</span>
          {activeCount > 0 && <span style={{ background: 'var(--blue)', color: 'white', borderRadius: 999, fontSize: 10, padding: '1px 6px', fontWeight: 700 }}>{activeCount}</span>}
        </button>
        <span style={{ fontSize: 12, color: 'var(--gray-500)' }}>{filtered.length} items</span>
        <div style={{ flex: 1 }} />
        <select value={filters.sortBy} onChange={e => setSort(e.target.value as FilterState['sortBy'])}
          style={{ height: 36, padding: '0 10px', borderRadius: 8, border: '1px solid var(--gray-200)', background: 'white', fontSize: 12, color: 'var(--gray-700)', cursor: 'pointer', outline: 'none', maxWidth: 160 }}>
          {SORT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
      </div>

      {/* Active filter chips */}
      {activeCount > 0 && (
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', padding: '8px 16px', borderBottom: '1px solid var(--gray-100)' }}>
          {filters.status.map(s => (
            <span key={s} onClick={() => toggleStatus(s)} style={{ height: 26, padding: '0 10px', borderRadius: 999, background: 'var(--blue-tint)', color: 'var(--blue)', fontSize: 12, fontWeight: 600, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 4 }}>{s} ×</span>
          ))}
          {filters.categories.map(c => (
            <span key={c} onClick={() => toggleCategory(c)} style={{ height: 26, padding: '0 10px', borderRadius: 999, background: 'var(--blue-tint)', color: 'var(--blue)', fontSize: 12, fontWeight: 600, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 4 }}>{c} ×</span>
          ))}
          <button onClick={clearAll} style={{ height: 26, padding: '0 10px', borderRadius: 999, border: '1px solid var(--gray-200)', background: 'white', fontSize: 12, fontWeight: 600, color: 'var(--gray-600)', cursor: 'pointer' }}>Clear all</button>
        </div>
      )}

      {/* Sidebar + Grid flex row */}
      <div style={{ display: 'flex', alignItems: 'flex-start' }}>
        <FilterSidebar
          filters={filters}
          collapsed={!sidebarOpen}
          onToggleStatus={toggleStatus}
          onToggleCategory={(c: string) => toggleCategory(c as NftCategory)}
          onToggleTrait={() => {}}
          onSetPrice={setPrice}
        />
        <div className="explore-body" style={{ flex: 1, minWidth: 0 }}>
          <NftGrid nfts={filtered} />
        </div>
      </div>
    </div>
  )
}
