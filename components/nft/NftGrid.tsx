import type { Nft } from '@/lib/types'
import NftCard from './NftCard'

interface Props { nfts: Nft[]; cols?: number }

export default function NftGrid({ nfts }: Props) {
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
    <>
      <style>{`
        .nft-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 10px;
        }
        @media (min-width: 640px) { .nft-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 14px; } }
        @media (min-width: 768px) { .nft-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 16px; } }
        @media (min-width: 1024px) { .nft-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 16px; } }
        @media (min-width: 1280px) { .nft-grid { grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 16px; } }
      `}</style>
      <div className="nft-grid">
        {nfts.map(n => <NftCard key={n.id} nft={n} />)}
      </div>
    </>
  )
}
