'use client'
import { useState } from 'react'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { NFTS, OFFERS, COLLECTIONS } from '@/lib/data'
import { pal, timeAgo, shortAddress } from '@/lib/utils'
import { PLATFORM_FEE } from '@/lib/constants'
import Modal from '@/components/ui/Modal'
import { useToast } from '@/app/layout'

interface Props { params: { id: string } }

const ROYALTY_PCT = 5

export default function NftDetailPage({ params }: Props) {
  const nft = NFTS.find(n => n.id === params.id)
  if (!nft) notFound()

  const collection = COLLECTIONS.find(c => c.id === nft.collectionId)
  const p = pal(nft.paletteIndex)
  const offers = OFFERS.filter(o => o.nftId === nft.id)

  const [buyOpen, setBuyOpen] = useState(false)
  const [offerOpen, setOfferOpen] = useState(false)
  const [offerPrice, setOfferPrice] = useState('')
  const [liked, setLiked] = useState(false)
  const [activeTab, setActiveTab] = useState<'traits' | 'details' | 'offers'>('traits')
  const { showToast } = useToast()

  const fee = nft.price ? nft.price * PLATFORM_FEE : 0
  const royalty = nft.price ? nft.price * (ROYALTY_PCT / 100) : 0

  return (
    <div style={{ maxWidth: 1280, margin: '0 auto', padding: '16px 16px 120px' }}>
      <style>{`
        .nft-detail-wrap { display:grid; grid-template-columns:1fr; gap:20px; align-items:flex-start; }
        .nft-detail-breadcrumb { padding:0 0 12px; font-size:12px; }
        .nft-sticky-buy { position:fixed; bottom:0; left:0; right:0; padding:12px 16px; background:white; border-top:1px solid var(--gray-200); display:flex; gap:10px; z-index:100; }
        .nft-sticky-buy-hidden { display:none; }
        .nft-price-card { display:none; }
        @media (min-width:640px) {
          .nft-detail-wrap { grid-template-columns:1fr 1fr; gap:32px; padding:0; }
          .nft-detail-breadcrumb { font-size:13px; }
          .nft-sticky-buy { display:none !important; }
          .nft-price-card { display:block !important; }
        }
        @media (min-width:1024px) {
          .nft-detail-wrap { gap:48px; }
        }
      `}</style>
      {/* Breadcrumb */}
      <div className="nft-detail-breadcrumb" style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--gray-500)', marginBottom: 16 }}>
        <Link href="/" style={{ color: 'var(--gray-500)', textDecoration: 'none' }}>Home</Link>
        <span>/</span>
        {collection && <Link href={`/collection/${collection.slug}`} style={{ color: 'var(--gray-500)', textDecoration: 'none' }}>{collection.name}</Link>}
        <span>/</span>
        <span style={{ color: 'var(--gray-900)', fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{nft.name}</span>
      </div>

      <div className="nft-detail-wrap">
        {/* Left — Artwork */}
        <div>
          <div style={{ borderRadius: 20, overflow: 'hidden', border: '1px solid var(--gray-200)', position: 'relative', aspectRatio: '1', background: `linear-gradient(135deg,${p.from},${p.to})`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontSize: 120, color: p.accent, opacity: .28, userSelect: 'none', fontWeight: 700 }}>{p.accent[0]}</span>
            <button onClick={() => setLiked(l => !l)}
              style={{ position: 'absolute', top: 16, right: 16, width: 40, height: 40, borderRadius: '50%', background: 'rgba(255,255,255,.9)', border: 'none', cursor: 'pointer', fontSize: 20, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {liked ? '❤️' : '🤍'}
            </button>
            <span style={{ position: 'absolute', top: 16, left: 16, padding: '4px 10px', borderRadius: 999, background: 'rgba(0,0,0,.55)', color: 'white', fontSize: 11, fontWeight: 600 }}>{nft.category}</span>
          </div>

          {/* Tabs */}
          <div style={{ marginTop: 24, border: '1px solid var(--gray-200)', borderRadius: 12, overflow: 'hidden' }}>
            <div style={{ display: 'flex', borderBottom: '1px solid var(--gray-200)' }}>
              {(['traits', 'details', 'offers'] as const).map(t => (
                <button key={t} onClick={() => setActiveTab(t)}
                  style={{ flex: 1, height: 44, border: 'none', background: activeTab === t ? 'var(--gray-50)' : 'white', fontSize: 13, fontWeight: 600, cursor: 'pointer', color: activeTab === t ? 'var(--blue)' : 'var(--gray-600)', borderBottom: `2px solid ${activeTab === t ? 'var(--blue)' : 'transparent'}`, transition: '.15s', textTransform: 'capitalize' as const }}>
                  {t}{t === 'offers' ? ` (${offers.length})` : ''}
                </button>
              ))}
            </div>
            <div style={{ padding: 16 }}>
              {activeTab === 'traits' && (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
                  {nft.traits.map(trait => (
                    <div key={trait.category + trait.value} style={{ padding: '10px 12px', background: 'var(--blue-tint)', borderRadius: 8, border: '1px solid rgba(32,129,226,.15)' }}>
                      <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--blue)', textTransform: 'uppercase', letterSpacing: '.05em', marginBottom: 2 }}>{trait.category}</div>
                      <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--gray-900)' }}>{trait.value}</div>
                      <div style={{ fontSize: 11, color: 'var(--gray-500)', marginTop: 1 }}>{trait.rarity}% have this</div>
                    </div>
                  ))}
                </div>
              )}
              {activeTab === 'details' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {[
                    { label: 'Contract', value: '0xabcd...1234' },
                    { label: 'Token ID', value: nft.tokenId },
                    { label: 'Chain', value: nft.chain },
                    { label: 'Token Standard', value: 'ERC-721' },
                    { label: 'Creator Royalties', value: `${ROYALTY_PCT}%` },
                  ].map(d => (
                    <div key={d.label} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13 }}>
                      <span style={{ color: 'var(--gray-500)' }}>{d.label}</span>
                      <span style={{ fontWeight: 600, color: 'var(--gray-900)' }}>{d.value}</span>
                    </div>
                  ))}
                </div>
              )}
              {activeTab === 'offers' && (
                offers.length === 0
                  ? <div style={{ textAlign: 'center', color: 'var(--gray-400)', fontSize: 13, padding: '12px 0' }}>No offers yet</div>
                  : <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                      {offers.map((o, i) => (
                        <div key={o.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 0', borderBottom: i < offers.length - 1 ? '1px solid var(--gray-150)' : 'none' }}>
                          <div>
                            <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--gray-900)' }}>{o.amount} MATIC</div>
                            <div style={{ fontSize: 11, color: 'var(--gray-500)' }}>{o.amountINR} · expires {timeAgo(o.expiresAt)}</div>
                          </div>
                          <div style={{ fontSize: 12, color: 'var(--gray-500)' }}>{shortAddress(o.offerer)}</div>
                        </div>
                      ))}
                    </div>
              )}
            </div>
          </div>
        </div>

        {/* Right — Info */}
        <div>
          {collection && (
            <Link href={`/collection/${collection.slug}`} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 13, fontWeight: 600, color: 'var(--blue)', textDecoration: 'none', marginBottom: 8 }}>
              {collection.name} {collection.isVerified && <span className="verified-check">✓</span>}
            </Link>
          )}
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 800, color: 'var(--gray-900)', marginBottom: 12 }}>{nft.name}</h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20, fontSize: 13, color: 'var(--gray-500)' }}>
            <span>By <strong style={{ color: 'var(--gray-800)' }}>{nft.creatorName}</strong></span>
            <span>·</span>
            <span>{nft.favorites} favourites</span>
            <span>·</span>
            <span>{nft.views} views</span>
          </div>

          {/* Price card — desktop only */}
          {nft.status !== 'not_for_sale' && (
            <div className="nft-price-card" style={{ border: '1px solid var(--gray-200)', borderRadius: 16, padding: 20, marginBottom: 20 }}>
              {nft.status === 'on_auction' && nft.auctionEndsAt && (
                <div style={{ fontSize: 13, color: 'var(--gray-500)', marginBottom: 8 }}>
                  Sale ends {new Date(nft.auctionEndsAt).toLocaleString('en-IN')}
                </div>
              )}
              {nft.price !== null && (
                <div style={{ marginBottom: 16 }}>
                  <div style={{ fontSize: 12, color: 'var(--gray-400)', marginBottom: 2 }}>Current {nft.status === 'on_auction' ? 'bid' : 'price'}</div>
                  <div style={{ fontSize: 28, fontWeight: 800, color: 'var(--gray-900)', display: 'flex', alignItems: 'baseline', gap: 8 }}>
                    {nft.price} <span style={{ fontSize: 18, fontWeight: 600 }}>MATIC</span>
                    {nft.priceINR && <span style={{ fontSize: 14, color: 'var(--gray-500)', fontWeight: 400 }}>{nft.priceINR}</span>}
                  </div>
                </div>
              )}
              {nft.topOffer && (
                <div style={{ fontSize: 13, color: 'var(--gray-500)', marginBottom: 16 }}>
                  Best offer: <strong style={{ color: 'var(--gray-900)' }}>{nft.topOffer} MATIC</strong>
                </div>
              )}
              <div style={{ display: 'flex', gap: 10 }}>
                {nft.status === 'buy_now' && (
                  <button onClick={() => setBuyOpen(true)}
                    style={{ flex: 1, height: 48, borderRadius: 12, border: 'none', background: 'var(--blue)', color: 'white', fontSize: 15, fontWeight: 700, cursor: 'pointer', transition: '.15s' }}
                    onMouseEnter={e => { e.currentTarget.style.background = 'var(--blue-dark)' }}
                    onMouseLeave={e => { e.currentTarget.style.background = 'var(--blue)' }}>
                    Buy now
                  </button>
                )}
                <button onClick={() => setOfferOpen(true)}
                  style={{ flex: 1, height: 48, borderRadius: 12, border: '1.5px solid var(--blue)', background: 'white', color: 'var(--blue)', fontSize: 15, fontWeight: 700, cursor: 'pointer', transition: '.15s' }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'var(--blue-tint)' }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'white' }}>
                  Make offer
                </button>
              </div>
            </div>
          )}

          {nft.description && (
            <div style={{ marginBottom: 20 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--gray-700)', marginBottom: 6 }}>Description</div>
              <p style={{ fontSize: 14, color: 'var(--gray-600)', lineHeight: 1.65 }}>{nft.description}</p>
            </div>
          )}
        </div>
      </div>

      {/* Sticky buy bar — mobile only */}
      {nft.status !== 'not_for_sale' && (
        <div className="nft-sticky-buy">
          {nft.price !== null && (
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', minWidth: 0 }}>
              <div style={{ fontSize: 11, color: 'var(--gray-400)' }}>{nft.status === 'on_auction' ? 'Current bid' : 'Price'}</div>
              <div style={{ fontSize: 16, fontWeight: 800, color: 'var(--gray-900)' }}>{nft.price} MATIC</div>
            </div>
          )}
          <div style={{ flex: 1 }} />
          {nft.status === 'buy_now' && (
            <button onClick={() => setBuyOpen(true)}
              style={{ height: 44, padding: '0 20px', borderRadius: 12, border: 'none', background: 'var(--blue)', color: 'white', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>
              Buy now
            </button>
          )}
          <button onClick={() => setOfferOpen(true)}
            style={{ height: 44, padding: '0 16px', borderRadius: 12, border: '1.5px solid var(--blue)', background: 'white', color: 'var(--blue)', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>
            Make offer
          </button>
        </div>
      )}

      {/* Buy Modal */}
      {buyOpen && <Modal onClose={() => setBuyOpen(false)}>
        <div style={{ padding: '0 0 8px' }}>
          <div style={{ fontSize: 18, fontWeight: 800, color: 'var(--gray-900)', marginBottom: 16 }}>Complete your purchase</div>
          <div style={{ display: 'flex', gap: 14, padding: '16px 0', borderBottom: '1px solid var(--gray-150)', marginBottom: 16 }}>
            <div style={{ width: 64, height: 64, borderRadius: 10, background: `linear-gradient(135deg,${p.from},${p.to})`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 26, color: p.accent, flexShrink: 0 }}>{p.accent[0]}</div>
            <div>
              <div style={{ fontSize: 12, color: 'var(--gray-500)' }}>{collection?.name}</div>
              <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--gray-900)' }}>{nft.name}</div>
            </div>
          </div>
          {[
            { label: 'Price', value: `${nft.price} MATIC` },
            { label: `Platform fee (${(PLATFORM_FEE * 100).toFixed(1)}%)`, value: `${fee.toFixed(4)} MATIC` },
            { label: `Creator royalties (${ROYALTY_PCT}%)`, value: `${royalty.toFixed(4)} MATIC` },
          ].map(r => (
            <div key={r.label} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, marginBottom: 10 }}>
              <span style={{ color: 'var(--gray-600)' }}>{r.label}</span>
              <span style={{ fontWeight: 600, color: 'var(--gray-900)' }}>{r.value}</span>
            </div>
          ))}
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 15, fontWeight: 700, paddingTop: 12, borderTop: '1px solid var(--gray-200)', marginTop: 4, marginBottom: 20 }}>
            <span>Total</span>
            <span>{nft.price} MATIC</span>
          </div>
          <button onClick={() => { setBuyOpen(false); showToast(`Purchased ${nft.name}!`, 'success') }}
            style={{ width: '100%', height: 48, borderRadius: 12, border: 'none', background: 'var(--blue)', color: 'white', fontSize: 15, fontWeight: 700, cursor: 'pointer' }}>
            Confirm purchase
          </button>
        </div>
      </Modal>}

      {/* Make Offer Modal */}
      {offerOpen && <Modal onClose={() => setOfferOpen(false)}>
        <div style={{ padding: '0 0 8px' }}>
          <div style={{ fontSize: 18, fontWeight: 800, color: 'var(--gray-900)', marginBottom: 16 }}>Make an offer</div>
          <div style={{ marginBottom: 20 }}>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: 'var(--gray-700)', marginBottom: 8 }}>Offer price (MATIC)</label>
            <input type="number" min="0" step="0.01" value={offerPrice} onChange={e => setOfferPrice(e.target.value)} placeholder="0.00"
              style={{ width: '100%', height: 44, borderRadius: 10, border: '1.5px solid var(--gray-200)', padding: '0 14px', fontSize: 15, outline: 'none', boxSizing: 'border-box' }} />
          </div>
          <div style={{ marginBottom: 20 }}>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: 'var(--gray-700)', marginBottom: 8 }}>Offer expiration</label>
            <select style={{ width: '100%', height: 44, borderRadius: 10, border: '1.5px solid var(--gray-200)', padding: '0 14px', fontSize: 14, color: 'var(--gray-700)', outline: 'none', boxSizing: 'border-box', background: 'white' }}>
              <option>3 days</option>
              <option>7 days</option>
              <option>30 days</option>
            </select>
          </div>
          {collection && (
            <div style={{ padding: '10px 14px', background: 'var(--gray-50)', borderRadius: 8, fontSize: 13, color: 'var(--gray-600)', marginBottom: 20 }}>
              Floor price: <strong style={{ color: 'var(--gray-900)' }}>{collection.floorPrice} MATIC</strong>
            </div>
          )}
          <button onClick={() => { if (!offerPrice) return; setOfferOpen(false); showToast('Offer submitted!', 'success') }}
            style={{ width: '100%', height: 48, borderRadius: 12, border: 'none', background: offerPrice ? 'var(--blue)' : 'var(--gray-300)', color: 'white', fontSize: 15, fontWeight: 700, cursor: offerPrice ? 'pointer' : 'default' }}>
            Submit offer
          </button>
        </div>
      </Modal>}
    </div>
  )
}
