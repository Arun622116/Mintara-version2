'use client'
import { useState, useMemo } from 'react'
import { NFTS } from '@/lib/data'
import { SORT_OPTIONS, NFT_CATEGORIES } from '@/lib/constants'
import FilterSidebar from '@/components/collection/FilterSidebar'
import NftGrid from '@/components/nft/NftGrid'
import { useFilter } from '@/hooks/useFilter'
import type { Nft, NftCategory, FilterState } from '@/lib/types'

export default function ExplorePage() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
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
    <div style={{ maxWidth: 1280, margin: '0 auto', padding: '32px 24px 64px' }}>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 800, color: 'var(--gray-900)', marginBottom: 4 }}>Explore</h1>
        <p style={{ fontSize: 14, color: 'var(--gray-500)' }}>Discover, collect, and sell extraordinary NFTs</p>
      </div>

      {/* Category pills */}
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 24 }}>
        {(['All', ...NFT_CATEGORIES] as string[]).map(cat => {
          const active = cat === 'All' ? filters.categories.length === 0 : filters.categories.includes(cat as NftCategory)
          return (
            <button key={cat}
              onClick={() => cat !== 'All' ? toggleCategory(cat as NftCategory) : clearAll()}
              style={{ height: 34, padding: '0 16px', borderRadius: 999, border: `1.5px solid ${active ? 'var(--blue)' : 'var(--gray-200)'}`, background: active ? 'var(--blue-tint)' : 'white', color: active ? 'var(--blue)' : 'var(--gray-600)', fontSize: 13, fontWeight: 600, cursor: 'pointer', transition: '.15s' }}>
              {cat}
            </button>
          )
        })}
      </div>

      {/* Toolbar */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
        <button onClick={() => setSidebarOpen(o => !o)}
          style={{ height: 38, padding: '0 16px', borderRadius: 8, border: '1px solid var(--gray-200)', background: sidebarOpen ? 'var(--gray-100)' : 'white', fontSize: 13, fontWeight: 600, color: 'var(--gray-700)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}>
          <span>☰</span> Filters {activeCount > 0 && <span style={{ background: 'var(--blue)', color: 'white', borderRadius: 999, fontSize: 11, padding: '1px 6px', fontWeight: 700 }}>{activeCount}</span>}
        </button>
        <div style={{ flex: 1, fontSize: 13, color: 'var(--gray-500)' }}>{filtered.length} items</div>
        <select value={filters.sortBy} onChange={e => setSort(e.target.value as FilterState['sortBy'])}
          style={{ height: 38, padding: '0 12px', borderRadius: 8, border: '1px solid var(--gray-200)', background: 'white', fontSize: 13, color: 'var(--gray-700)', cursor: 'pointer', outline: 'none' }}>
          {SORT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
      </div>

      {/* Active filter chips */}
      {activeCount > 0 && (
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 16 }}>
          {filters.status.map(s => (
            <span key={s} onClick={() => toggleStatus(s)} style={{ height: 28, padding: '0 10px', borderRadius: 999, background: 'var(--blue-tint)', color: 'var(--blue)', fontSize: 12, fontWeight: 600, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 6 }}>{s} ×</span>
          ))}
          {filters.categories.map(c => (
            <span key={c} onClick={() => toggleCategory(c)} style={{ height: 28, padding: '0 10px', borderRadius: 999, background: 'var(--blue-tint)', color: 'var(--blue)', fontSize: 12, fontWeight: 600, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 6 }}>{c} ×</span>
          ))}
          <button onClick={clearAll} style={{ height: 28, padding: '0 10px', borderRadius: 999, border: '1px solid var(--gray-200)', background: 'white', fontSize: 12, fontWeight: 600, color: 'var(--gray-600)', cursor: 'pointer' }}>Clear all</button>
        </div>
      )}

      {/* Layout */}
      <div style={{ display: 'flex', gap: 20, alignItems: 'flex-start' }}>
        <FilterSidebar
          filters={filters}
          collapsed={!sidebarOpen}
          onToggleStatus={toggleStatus}
          onToggleCategory={(c: string) => toggleCategory(c as NftCategory)}
          onToggleTrait={() => {}}
          onSetPrice={setPrice}
        />
        <div style={{ flex: 1, minWidth: 0 }}>
          <NftGrid nfts={filtered} />
        </div>
      </div>
    </div>
  )
}
