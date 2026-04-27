import HeroCarousel from '@/components/home/HeroCarousel'
import TrendingCollections from '@/components/home/TrendingCollections'
import NotableDrops from '@/components/home/NotableDrops'
import ActivityFeed from '@/components/home/ActivityFeed'
import Link from 'next/link'

export default function HomePage() {
  return (
    <main style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px 64px' }}>
      {/* Hero */}
      <section style={{ marginBottom: 48, marginLeft: -24, marginRight: -24 }}>
        <HeroCarousel />
      </section>

      {/* Trending & Top Collections */}
      <section style={{ marginBottom: 48 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 800, color: 'var(--gray-900)' }}>Trending Collections</h2>
          <Link href="/rankings" style={{ fontSize: 13, fontWeight: 600, color: 'var(--blue)', textDecoration: 'none' }}>See all →</Link>
        </div>
        <TrendingCollections />
      </section>

      {/* Notable Drops */}
      <section style={{ marginBottom: 48 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 800, color: 'var(--gray-900)' }}>Notable Drops</h2>
          <Link href="/explore" style={{ fontSize: 13, fontWeight: 600, color: 'var(--blue)', textDecoration: 'none' }}>See all →</Link>
        </div>
        <NotableDrops />
      </section>

      {/* Activity Feed */}
      <section>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 800, color: 'var(--gray-900)' }}>Live Activity</h2>
          <Link href="/explore" style={{ fontSize: 13, fontWeight: 600, color: 'var(--blue)', textDecoration: 'none' }}>Explore →</Link>
        </div>
        <ActivityFeed />
      </section>
    </main>
  )
}
