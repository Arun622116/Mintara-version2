import type { Nft } from '@/lib/types'
import NftCard from './NftCard'

interface Props { nfts: Nft[]; cols?: number }

export default function NftGrid({ nfts, cols = 4 }: Props) {
  if (nfts.length === 0) {
    return (
      <div style={{ padding: '64px 0', textAlign: 'center', color: 'var(--gray-400)' }}>
        <div style={{ fontSize: 40, marginBottom: 12 }}>🔍</div>
        <div style={{ fontSize: 16, fontWeight: 600, color: 'var(--gray-600)', marginBottom: 4 }}>No items found</div>
        <div style={{ fontSize: 14 }}>Try adjusting your filters</div>
      </div>
    )
  }
  return (
    <div style={{ display: 'grid', gridTemplateColumns: `repeat(${cols}, minmax(0,1fr))`, gap: 16 }}
      className="nft-grid-resp">
      <style>{`
        @media (max-width:1280px) { .nft-grid-resp { grid-template-columns: repeat(3,minmax(0,1fr)) !important; } }
        @media (max-width:900px)  { .nft-grid-resp { grid-template-columns: repeat(2,minmax(0,1fr)) !important; } }
        @media (max-width:480px)  { .nft-grid-resp { grid-template-columns: repeat(2,minmax(0,1fr)) !important; gap: 10px !important; } }
      `}</style>
      {nfts.map(n => <NftCard key={n.id} nft={n} />)}
    </div>
  )
}
