import HeroCarousel from '@/components/home/HeroCarousel'
import TrendingCollections from '@/components/home/TrendingCollections'
import NotableDrops from '@/components/home/NotableDrops'
import ActivityFeed from '@/components/home/ActivityFeed'
import Link from 'next/link'

export default function HomePage() {
  return (
    <div style={{ maxWidth: 1280, margin: '0 auto' }}>
      <style>{`
        .home-hero { margin-bottom: 32px; }
        .home-section { padding: 0 16px; margin-bottom: 36px; }
        .home-section-title { font-family: var(--font-display); font-size: 18px; font-weight: 800; color: var(--gray-900); }
        @media (min-width: 640px) {
          .home-hero { margin-bottom: 40px; }
          .home-section { padding: 0 24px; margin-bottom: 48px; }
          .home-section-title { font-size: 22px; }
        }
      `}</style>

      {/* Hero — full bleed */}
      <div className="home-hero">
        <HeroCarousel />
      </div>

      {/* Trending */}
      <section className="home-section">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
          <h2 className="home-section-title">Trending Collections</h2>
          <Link href="/rankings" style={{ fontSize: 13, fontWeight: 600, color: 'var(--blue)', textDecoration: 'none' }}>See all →</Link>
        </div>
        <div style={{ overflowX: 'auto' }} className="scrollbar-hide">
          <TrendingCollections />
        </div>
      </section>

      {/* Notable Drops */}
      <section className="home-section">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
          <h2 className="home-section-title">Notable Drops</h2>
          <Link href="/explore" style={{ fontSize: 13, fontWeight: 600, color: 'var(--blue)', textDecoration: 'none' }}>See all →</Link>
        </div>
        <NotableDrops />
      </section>

      {/* Activity Feed */}
      <section className="home-section" style={{ marginBottom: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
          <h2 className="home-section-title">Live Activity</h2>
          <Link href="/explore" style={{ fontSize: 13, fontWeight: 600, color: 'var(--blue)', textDecoration: 'none' }}>Explore →</Link>
        </div>
        <div style={{ overflowX: 'auto' }} className="scrollbar-hide">
          <ActivityFeed />
        </div>
      </section>
    </div>
  )
}
