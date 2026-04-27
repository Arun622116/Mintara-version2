'use client'
import { useState } from 'react'
import type { FilterState, CollectionTraitGroup } from '@/lib/types'

interface Props {
  filters: FilterState
  collapsed: boolean
  onToggleStatus:   (s: string) => void
  onToggleCategory: (c: string) => void
  onToggleTrait:    (g: string, v: string) => void
  onSetPrice:       (min: string, max: string) => void
  traits?: CollectionTraitGroup[]
}

function Section({ title, children, defaultOpen = true }: { title: string; children: React.ReactNode; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div style={{ borderBottom: '1px solid var(--gray-150)' }}>
      <button onClick={() => setOpen(o => !o)}
        style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}>
        <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--gray-800)' }}>{title}</span>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--gray-400)" strokeWidth="2" strokeLinecap="round" style={{ transform: open ? 'rotate(180deg)' : 'none', transition: '.2s' }}>
          <polyline points="6 9 12 15 18 9"/>
        </svg>
      </button>
      {open && <div style={{ padding: '4px 16px 14px' }}>{children}</div>}
    </div>
  )
}

function CheckRow({ label, checked, count, onChange }: { label: string; checked: boolean; count?: number; onChange: () => void }) {
  return (
    <label style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '5px 0', cursor: 'pointer' }}>
      <input type="checkbox" checked={checked} onChange={onChange} style={{ accentColor: 'var(--blue)', width: 16, height: 16, borderRadius: 4, flexShrink: 0 }} />
      <span style={{ flex: 1, fontSize: 13, color: 'var(--gray-700)' }}>{label}</span>
      {count !== undefined && <span style={{ fontSize: 12, color: 'var(--gray-400)' }}>({count})</span>}
    </label>
  )
}

export default function FilterSidebar({ filters, collapsed, onToggleStatus, onToggleCategory, onToggleTrait, onSetPrice, traits }: Props) {
  const [priceMin, setPriceMin] = useState(filters.priceMin)
  const [priceMax, setPriceMax] = useState(filters.priceMax)

  return (
    <div className={`filter-sidebar${collapsed ? ' collapsed' : ''}`}>
      <div style={{ padding: '12px 16px 8px', borderBottom: '1px solid var(--gray-150)' }}>
        <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--gray-700)' }}>Filter</span>
      </div>

      <Section title="Status">
        <CheckRow label="Buy now"    checked={filters.status.includes('buy_now')}    onChange={() => onToggleStatus('buy_now')} />
        <CheckRow label="On auction" checked={filters.status.includes('on_auction')} onChange={() => onToggleStatus('on_auction')} />
        <CheckRow label="Has offers" checked={filters.status.includes('has_offers')} onChange={() => onToggleStatus('has_offers')} />
        <CheckRow label="New"        checked={filters.status.includes('new')}        onChange={() => onToggleStatus('new')} />
      </Section>

      <Section title="Price">
        <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 8 }}>
          <input value={priceMin} onChange={e => setPriceMin(e.target.value)} placeholder="Min"
            style={{ flex: 1, padding: '6px 8px', border: '1px solid var(--gray-200)', borderRadius: 8, fontSize: 12, color: 'var(--gray-700)', background: 'var(--gray-50)' }} />
          <span style={{ color: 'var(--gray-400)', fontSize: 12 }}>–</span>
          <input value={priceMax} onChange={e => setPriceMax(e.target.value)} placeholder="Max"
            style={{ flex: 1, padding: '6px 8px', border: '1px solid var(--gray-200)', borderRadius: 8, fontSize: 12, color: 'var(--gray-700)', background: 'var(--gray-50)' }} />
        </div>
        <button onClick={() => onSetPrice(priceMin, priceMax)}
          style={{ width: '100%', padding: '6px', border: '1px solid var(--gray-300)', borderRadius: 8, fontSize: 12, fontWeight: 600, background: 'white', cursor: 'pointer' }}>
          Apply
        </button>
      </Section>

      {traits ? (
        traits.map(group => (
          <Section key={group.name} title={`${group.name} (${group.values.length})`} defaultOpen={false}>
            {group.values.map(v => (
              <CheckRow key={v.label} label={v.label} count={v.count}
                checked={(filters.traits[group.name] ?? []).includes(v.label)}
                onChange={() => onToggleTrait(group.name, v.label)} />
            ))}
          </Section>
        ))
      ) : (
        <Section title="Categories" defaultOpen={false}>
          {['Art','Photography','Music','Gaming','PFP','Collectibles','Sports'].map(c => (
            <CheckRow key={c} label={c}
              checked={filters.categories.includes(c as never)}
              onChange={() => onToggleCategory(c)} />
          ))}
        </Section>
      )}

      <Section title="Chains" defaultOpen={false}>
        <CheckRow label="Polygon"  checked={filters.chains.includes('Polygon')}  onChange={() => {}} />
        <CheckRow label="Ethereum" checked={filters.chains.includes('Ethereum')} onChange={() => {}} />
        <CheckRow label="Solana"   checked={filters.chains.includes('Solana')}   onChange={() => {}} />
      </Section>
    </div>
  )
}
