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

  const goTo = useCallback((i: number) => setIdx((i + SLIDES.length) % SLIDES.length), [])

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
      <style>{`
        .hero-inner {
          max-width: 1280px; margin: 0 auto;
          padding: 24px 16px 32px;
          display: flex; flex-direction: column; gap: 20px; align-items: center;
        }
        .hero-art-wrap { width: 100%; max-width: 260px; }
        .hero-art {
          width: 100%; aspect-ratio: 1; border-radius: 16px;
          box-shadow: 0 12px 40px rgba(0,0,0,.18);
          display: flex; align-items: center; justify-content: center;
          position: relative; overflow: hidden; cursor: pointer;
        }
        .hero-info { width: 100%; text-align: center; }
        .hero-title { font-family: var(--font-display); font-size: 22px; font-weight: 800; color: var(--gray-900); line-height: 1.2; margin-bottom: 10px; }
        .hero-desc { display: none; }
        .hero-stats { display: flex; justify-content: center; gap: 20px; margin-bottom: 16px; }
        .hero-btns { display: flex; gap: 10px; justify-content: center; }
        .hero-btn { height: 40px; padding: 0 16px; border-radius: 10px; font-size: 13px; font-weight: 600; cursor: pointer; }
        @media (min-width: 640px) {
          .hero-inner { padding: 32px 24px; flex-direction: row; gap: 32px; align-items: center; }
          .hero-art-wrap { width: 45%; max-width: 380px; flex-shrink: 0; }
          .hero-art { border-radius: 20px; }
          .hero-info { text-align: left; }
          .hero-title { font-size: 28px; margin-bottom: 12px; }
          .hero-desc { display: block; }
          .hero-stats { justify-content: flex-start; gap: 28px; }
          .hero-btns { justify-content: flex-start; }
          .hero-btn { height: 44px; padding: 0 20px; font-size: 14px; }
        }
        @media (min-width: 1024px) {
          .hero-inner { padding: 40px 24px; gap: 48px; }
          .hero-art-wrap { width: 44%; max-width: 440px; }
          .hero-title { font-size: 34px; }
        }
      `}</style>

      <div className="hero-inner">
        {/* Artwork */}
        <div className="hero-art-wrap">
          <div className="hero-art"
            style={{ background: `linear-gradient(135deg,${np.from},${np.to})` }}
            onClick={() => nft && router.push(`/nft/${nft.id}`)}>
            <span style={{ fontSize: 72, color: np.accent, opacity: .32, userSelect: 'none' }}>{np.accent[0]}</span>
          </div>
        </div>

        {/* Info */}
        <div className="hero-info">
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10, justifyContent: 'inherit' }}>
            <div style={{ width: 40, height: 40, borderRadius: 10, background: `linear-gradient(135deg,${ap.from},${ap.to})`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, color: ap.accent, fontWeight: 700, flexShrink: 0 }}>{ap.accent[0]}</div>
            <div>
              <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--gray-600)' }}>{col.name}</div>
              <div style={{ fontSize: 11, color: 'var(--gray-400)' }}>by {col.creatorName}</div>
            </div>
            <span style={{ marginLeft: 4, padding: '2px 8px', borderRadius: 999, fontSize: 10, fontWeight: 600, background: 'rgba(34,197,94,.1)', color: 'var(--brand-dark)' }}>{col.category}</span>
          </div>

          <h2 className="hero-title">{col.name}</h2>

          <p className="hero-desc" style={{ fontSize: 14, color: 'var(--gray-600)', lineHeight: 1.65, marginBottom: 16, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical' as const, overflow: 'hidden' }}>{col.description}</p>

          <div className="hero-stats">
            {[
              { label: 'Floor', value: `${col.floorPrice} MATIC` },
              { label: 'Items', value: col.totalItems.toLocaleString() },
              { label: 'Owners', value: col.totalOwners.toLocaleString() },
            ].map(s => (
              <div key={s.label} style={{ textAlign: 'inherit' as const }}>
                <div style={{ fontSize: 10, color: 'var(--gray-400)', marginBottom: 2 }}>{s.label}</div>
                <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--gray-900)' }}>{s.value}</div>
              </div>
            ))}
          </div>

          <div className="hero-btns">
            <button className="hero-btn" onClick={() => router.push(`/collection/${col.slug}`)}
              style={{ border: '1px solid var(--gray-300)', background: 'white', color: 'var(--gray-700)', transition: 'border-color .15s' }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--brand)')}
              onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--gray-300)')}>
              View collection
            </button>
            {nft && (
              <button className="hero-btn" onClick={() => router.push(`/nft/${nft.id}`)}
                style={{ background: 'var(--blue)', border: 'none', color: 'white', transition: 'background .15s' }}
                onMouseEnter={e => (e.currentTarget.style.background = 'var(--blue-dark)')}
                onMouseLeave={e => (e.currentTarget.style.background = 'var(--blue)')}>
                View item
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Prev/Next arrows — hidden on very small screens */}
      {['prev', 'next'].map(dir => (
        <button key={dir} onClick={() => goTo(idx + (dir === 'next' ? 1 : -1))}
          style={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)', [dir === 'prev' ? 'left' : 'right']: 8, width: 36, height: 36, borderRadius: '50%', background: 'white', border: '1px solid var(--gray-200)', boxShadow: 'var(--shadow-sm)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', zIndex: 10 }}
          aria-label={dir}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--gray-700)" strokeWidth="2" strokeLinecap="round"><polyline points={dir === 'prev' ? '15 18 9 12 15 6' : '9 18 15 12 9 6'}/></svg>
        </button>
      ))}

      {/* Dots */}
      <div style={{ position: 'absolute', bottom: 10, left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 6 }}>
        {SLIDES.map((_, i) => (
          <button key={i} onClick={() => goTo(i)}
            style={{ width: 6, height: 6, borderRadius: '50%', border: 'none', cursor: 'pointer', background: i === idx ? 'var(--gray-700)' : 'var(--gray-300)', transition: 'background .2s', padding: 0 }}
            aria-label={`Slide ${i + 1}`} />
        ))}
      </div>
    </div>
  )
}
