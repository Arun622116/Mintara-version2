'use client'
import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { useSearch } from '@/app/layout'
import { NFTS, COLLECTIONS, CREATORS } from '@/lib/data'
import { pal } from '@/lib/utils'

export default function SearchModal() {
  const { close } = useSearch()
  const [query, setQuery] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  useEffect(() => { inputRef.current?.focus() }, [])

  const q = query.toLowerCase()
  const matchCols = q ? COLLECTIONS.filter(c => c.name.toLowerCase().includes(q) || c.creatorName.toLowerCase().includes(q)).slice(0, 3) : COLLECTIONS.slice(0, 4)
  const matchNfts = q ? NFTS.filter(n => n.name.toLowerCase().includes(q) || n.collectionName.toLowerCase().includes(q)).slice(0, 5) : []
  const matchCreators = q ? CREATORS.filter(c => c.displayName.toLowerCase().includes(q) || c.username.toLowerCase().includes(q)).slice(0, 3) : []

  function go(href: string) { close(); router.push(href) }

  return (
    <div className="search-overlay" onClick={e => { if (e.target === e.currentTarget) close() }}>
      <div className="search-box-modal">
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--gray-400)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ position: 'absolute', left: 18, flexShrink: 0 }}>
            <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
          </svg>
          <input ref={inputRef} value={query} onChange={e => setQuery(e.target.value)}
            placeholder="Search NFTs, collections, artists..."
            style={{ width: '100%', padding: '18px 52px', fontSize: 16, border: 'none', outline: 'none', background: 'transparent', color: 'var(--gray-900)' }}
          />
          <span style={{ position: 'absolute', right: 16, fontSize: 11, fontFamily: 'monospace', color: 'var(--gray-400)', background: 'var(--gray-100)', padding: '3px 8px', borderRadius: 4 }}>Esc</span>
        </div>
        <div style={{ borderTop: '1px solid var(--gray-150)', maxHeight: 480, overflowY: 'auto' }}>
          {matchCols.length > 0 && (
            <div>
              <div style={{ padding: '8px 20px 4px', fontSize: 11, fontWeight: 700, color: 'var(--gray-400)', textTransform: 'uppercase', letterSpacing: '.06em' }}>Collections</div>
              {matchCols.map(c => {
                const p = pal(c.avatarPaletteIndex)
                return (
                  <div key={c.id} onClick={() => go(`/collection/${c.slug}`)}
                    style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 20px', cursor: 'pointer' }}
                    onMouseEnter={e => (e.currentTarget.style.background = 'var(--gray-50)')}
                    onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                  >
                    <div style={{ width: 36, height: 36, borderRadius: 8, background: `linear-gradient(135deg,${p.from},${p.to})`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, color: p.accent, flexShrink: 0 }}>{p.accent[0]}</div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--gray-900)' }}>{c.name}</div>
                      <div style={{ fontSize: 12, color: 'var(--gray-500)' }}>{c.category}</div>
                    </div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--gray-700)', flexShrink: 0 }}>{c.floorPrice} MATIC</div>
                  </div>
                )
              })}
            </div>
          )}
          {matchNfts.length > 0 && (
            <div>
              <div style={{ padding: '8px 20px 4px', fontSize: 11, fontWeight: 700, color: 'var(--gray-400)', textTransform: 'uppercase', letterSpacing: '.06em' }}>NFTs</div>
              {matchNfts.map(n => {
                const p = pal(n.paletteIndex)
                return (
                  <div key={n.id} onClick={() => go(`/nft/${n.id}`)}
                    style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 20px', cursor: 'pointer' }}
                    onMouseEnter={e => (e.currentTarget.style.background = 'var(--gray-50)')}
                    onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                  >
                    <div style={{ width: 36, height: 36, borderRadius: 8, background: `linear-gradient(135deg,${p.from},${p.to})`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, color: p.accent, flexShrink: 0 }}>{p.accent[0]}</div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--gray-900)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{n.name}</div>
                      <div style={{ fontSize: 12, color: 'var(--gray-500)' }}>{n.collectionName}</div>
                    </div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--gray-700)', flexShrink: 0 }}>{n.price ? `${n.price} MATIC` : '—'}</div>
                  </div>
                )
              })}
            </div>
          )}
          {matchCreators.length > 0 && (
            <div>
              <div style={{ padding: '8px 20px 4px', fontSize: 11, fontWeight: 700, color: 'var(--gray-400)', textTransform: 'uppercase', letterSpacing: '.06em' }}>Artists</div>
              {matchCreators.map(c => {
                const p = pal(c.paletteIndex)
                return (
                  <div key={c.id} onClick={() => go(`/artist/${c.username}`)}
                    style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 20px', cursor: 'pointer' }}
                    onMouseEnter={e => (e.currentTarget.style.background = 'var(--gray-50)')}
                    onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                  >
                    <div style={{ width: 36, height: 36, borderRadius: '50%', background: `linear-gradient(135deg,${p.from},${p.to})`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, color: p.accent, fontWeight: 700, flexShrink: 0 }}>{c.displayName[0]}</div>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--gray-900)' }}>{c.displayName} {c.verified && <span style={{ fontSize: 10, background: 'var(--blue)', color: 'white', borderRadius: '50%', padding: '1px 4px' }}>✓</span>}</div>
                      <div style={{ fontSize: 12, color: 'var(--gray-500)' }}>@{c.username}</div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
          {query && matchCols.length === 0 && matchNfts.length === 0 && matchCreators.length === 0 && (
            <div style={{ padding: '32px 20px', textAlign: 'center', color: 'var(--gray-400)', fontSize: 14 }}>No results for &ldquo;{query}&rdquo;</div>
          )}
        </div>
        <div style={{ borderTop: '1px solid var(--gray-150)', padding: '10px 20px', fontSize: 11, color: 'var(--gray-400)', display: 'flex', gap: 12 }}>
          <span>↑↓ navigate</span><span>↵ select</span><span>Esc close</span>
        </div>
      </div>
    </div>
  )
}
