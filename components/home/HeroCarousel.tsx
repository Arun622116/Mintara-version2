'use client'
import { useState, useEffect, useCallback, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { COLLECTIONS, NFTS } from '@/lib/data'
import { pal } from '@/lib/utils'

const SLIDES = COLLECTIONS.slice(0, 3)

export default function HeroCarousel() {
  const [idx, setIdx] = useState(0)
  const [paused, setPaused] = useState(false)
  const router = useRouter()
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const goTo = useCallback((i: number) => {
    setIdx((i + SLIDES.length) % SLIDES.length)
  }, [])

  useEffect(() => {
    if (paused) return
    intervalRef.current = setInterval(() => setIdx(p => (p + 1) % SLIDES.length), 5000)
    return () => { if (intervalRef.current) clearInterval(intervalRef.current) }
  }, [paused])

  const col = SLIDES[idx]
  const bp = pal(col.bannerPaletteIndex)
  const ap = pal(col.avatarPaletteIndex)
  const nft = NFTS.find(n => n.collectionId === col.id)
  const np = nft ? pal(nft.paletteIndex) : bp

  return (
    <div onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}
      style={{ position: 'relative', background: 'white', borderBottom: '1px solid var(--gray-150)', overflow: 'hidden' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '40px 24px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40, alignItems: 'center' }}
        className="hero-grid">
        <style>{`@media(max-width:768px){.hero-grid{grid-template-columns:1fr!important;}.hero-art{max-width:100%!important;height:220px!important;}}`}</style>

        {/* Left: artwork */}
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div className="hero-art" style={{
            width: '100%', maxWidth: 420, aspectRatio: '1', borderRadius: 20,
            background: `linear-gradient(135deg,${np.from},${np.to})`,
            boxShadow: '0 20px 60px rgba(0,0,0,.15)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            position: 'relative', overflow: 'hidden', cursor: 'pointer',
          }} onClick={() => nft && router.push(`/nft/${nft.id}`)}>
            <span style={{ fontSize: 80, color: np.accent, opacity: .32, userSelect: 'none' }}>{np.accent[0]}</span>
          </div>
        </div>

        {/* Right: info */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
            <div style={{ width: 52, height: 52, borderRadius: 12, background: `linear-gradient(135deg,${ap.from},${ap.to})`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, color: ap.accent, fontWeight: 700, flexShrink: 0 }}>{ap.accent[0]}</div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--gray-600)' }}>{col.name}</div>
              <div style={{ fontSize: 12, color: 'var(--gray-400)' }}>by {col.creatorName}</div>
            </div>
            <span style={{ marginLeft: 8, padding: '3px 9px', borderRadius: 999, fontSize: 11, fontWeight: 600, background: 'rgba(34,197,94,.1)', color: 'var(--brand-dark)' }}>{col.category}</span>
          </div>

          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 36, fontWeight: 800, color: 'var(--gray-900)', lineHeight: 1.2, marginBottom: 14 }}>{col.name}</h2>
          <p style={{ fontSize: 15, color: 'var(--gray-600)', lineHeight: 1.65, marginBottom: 20, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical' as const, overflow: 'hidden' }}>{col.description}</p>

          <div style={{ display: 'flex', gap: 24, marginBottom: 28, flexWrap: 'wrap' }}>
            {[
              { label: 'Floor', value: `${col.floorPrice} MATIC` },
              { label: 'Items', value: col.totalItems.toLocaleString() },
              { label: 'Owners', value: col.totalOwners.toLocaleString() },
            ].map(s => (
              <div key={s.label}>
                <div style={{ fontSize: 11, color: 'var(--gray-400)', marginBottom: 2 }}>{s.label}</div>
                <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--gray-900)' }}>{s.value}</div>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <button onClick={() => router.push(`/collection/${col.slug}`)}
              style={{ height: 44, padding: '0 20px', borderRadius: 10, border: '1px solid var(--gray-300)', background: 'white', fontSize: 14, fontWeight: 600, cursor: 'pointer', color: 'var(--gray-700)', transition: 'border-color .15s' }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--brand)')}
              onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--gray-300)')}
            >View collection</button>
            {nft && (
              <button onClick={() => router.push(`/nft/${nft.id}`)}
                style={{ height: 44, padding: '0 20px', borderRadius: 10, background: 'var(--blue)', border: 'none', color: 'white', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}
                onMouseEnter={e => (e.currentTarget.style.background = 'var(--blue-dark)')}
                onMouseLeave={e => (e.currentTarget.style.background = 'var(--blue)')}
              >View item</button>
            )}
          </div>
        </div>
      </div>

      {/* Arrows */}
      {['prev','next'].map(dir => (
        <button key={dir} onClick={() => goTo(idx + (dir === 'next' ? 1 : -1))}
          style={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)', [dir === 'prev' ? 'left' : 'right']: 16, width: 40, height: 40, borderRadius: '50%', background: 'white', border: '1px solid var(--gray-200)', boxShadow: 'var(--shadow-sm)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', zIndex: 10 }}
          aria-label={dir}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--gray-700)" strokeWidth="2" strokeLinecap="round"><polyline points={dir === 'prev' ? '15 18 9 12 15 6' : '9 18 15 12 9 6'}/></svg>
        </button>
      ))}

      {/* Dots */}
      <div style={{ position: 'absolute', bottom: 16, left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 6 }}>
        {SLIDES.map((_, i) => (
          <button key={i} onClick={() => goTo(i)}
            style={{ width: 6, height: 6, borderRadius: '50%', border: 'none', cursor: 'pointer', background: i === idx ? 'var(--gray-700)' : 'var(--gray-300)', transition: 'background .2s', padding: 0 }}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
