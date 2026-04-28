'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import type { Nft } from '@/lib/types'
import { pal, countdownStr } from '@/lib/utils'
import { useToast } from '@/app/layout'

interface Props { nft: Nft }

export default function NftCard({ nft }: Props) {
  const [liked, setLiked] = useState(false)
  const router = useRouter()
  const { showToast } = useToast()
  const p = pal(nft.paletteIndex)

  return (
    <div className="nft-card" onClick={() => router.push(`/nft/${nft.id}`)} style={{ minWidth: 0 }}>
      {/* Artwork */}
      <div className="nft-artwork">
        <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(135deg,${p.from},${p.to})` }} />
        <span className="nft-artwork-symbol" style={{ color: p.accent }}>{p.accent[0]}</span>

        {/* Category badge */}
        <div style={{ position: 'absolute', top: 8, left: 8, background: 'rgba(0,0,0,.5)', backdropFilter: 'blur(4px)', color: 'white', fontSize: 10, fontWeight: 600, padding: '3px 8px', borderRadius: 999 }}>
          {nft.category}
        </div>

        {/* Auction timer */}
        {nft.auctionEndsAt && (
          <div style={{ position: 'absolute', bottom: 8, left: 8, background: 'rgba(0,0,0,.6)', color: 'white', fontSize: 10, padding: '3px 8px', borderRadius: 999, display: 'flex', alignItems: 'center', gap: 4, fontFamily: 'monospace' }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#ef4444', animation: 'pulse-dot 2s infinite', display: 'inline-block', flexShrink: 0 }} />
            {countdownStr(nft.auctionEndsAt)}
          </div>
        )}

        {/* Favorite — always visible on touch devices via CSS */}
        <button
          className={`nft-card-favorite${liked ? ' active' : ''}`}
          onClick={e => { e.stopPropagation(); setLiked(l => !l); showToast(liked ? 'Removed from favorites' : 'Added to favorites', liked ? 'info' : 'success') }}
          aria-label={liked ? 'Unlike' : 'Like'}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill={liked ? '#ef4444' : 'none'} stroke={liked ? '#ef4444' : 'var(--gray-400)'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
          </svg>
        </button>

        {/* Quick buy — always visible on touch devices via CSS */}
        <div className="nft-card-buy-btn">
          <button
            style={{ width: '100%', height: 36, background: 'var(--blue)', color: 'white', border: 'none', borderRadius: 8, fontSize: 12, fontWeight: 600, cursor: 'pointer' }}
            onClick={e => { e.stopPropagation(); showToast(`Added to cart — ${nft.name}`, 'success') }}
          >
            {nft.status === 'buy_now' ? `Buy now · ${nft.price} MATIC` : nft.status === 'on_auction' ? `Bid · ${nft.price} MATIC` : 'Make offer'}
          </button>
        </div>
      </div>

      {/* Card body */}
      <div style={{ padding: '8px 10px 10px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginBottom: 3 }}>
          <div style={{ width: 14, height: 14, borderRadius: '50%', background: `linear-gradient(135deg,${p.from},${p.to})`, flexShrink: 0 }} />
          <span style={{ fontSize: 11, color: 'var(--gray-500)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{nft.collectionName}</span>
          {nft.creatorVerified && <span className="verified-check" style={{ width: 13, height: 13, fontSize: 8 }}>✓</span>}
        </div>
        <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--gray-900)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', marginBottom: 6 }}>{nft.name}</div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <div>
            <div style={{ fontSize: 10, color: 'var(--gray-400)', marginBottom: 1 }}>Price</div>
            <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--gray-900)' }}>{nft.price ? `${nft.price} MATIC` : '—'}</div>
            {nft.priceINR && <div style={{ fontSize: 11, color: 'var(--gray-500)' }}>{nft.priceINR}</div>}
          </div>
          {nft.hasOffers && nft.topOffer && (
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: 10, color: 'var(--gray-400)', marginBottom: 1 }}>Best offer</div>
              <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--blue)' }}>{nft.topOffer} MATIC</div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
