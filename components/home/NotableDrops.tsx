import { COLLECTIONS } from '@/lib/data'
import CollectionCard from '@/components/collection/CollectionCard'

export default function NotableDrops() {
  return (
    <div style={{ display: 'flex', gap: 16, overflowX: 'auto', paddingBottom: 8, scrollbarWidth: 'none' }}>
      <style>{`.notable-scroll::-webkit-scrollbar{display:none}`}</style>
      {COLLECTIONS.map(c => <CollectionCard key={c.id} collection={c} />)}
    </div>
  )
}
