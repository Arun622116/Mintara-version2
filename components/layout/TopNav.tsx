'use client'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useToast, useSearch, useDrawer } from '@/app/layout'

const NAV = [
  { label: 'Explore', href: '/explore' },
  { label: 'Rankings', href: '/rankings' },
  { label: 'Create', href: '/create' },
]

export default function TopNav() {
  const pathname = usePathname()
  const router = useRouter()
  const { showToast } = useToast()
  const { open: openSearch } = useSearch()
  const { toggle: toggleDrawer } = useDrawer()

  return (
    <>
      <style>{`
        .tn-nav { display:flex; align-items:center; padding:0 16px; gap:12px; }
        .tn-hamburger { display:none; }
        .tn-logo-text { display:inline; }
        .tn-nav-links { display:flex; gap:4px; margin-left:8px; }
        .tn-search { display:flex; flex:1; max-width:480px; }
        .tn-right { display:flex; align-items:center; gap:8px; flex-shrink:0; }
        .tn-connect-text { display:inline; }
        .tn-connect-short { display:none; }
        @media (max-width:1023px) { .tn-nav-links { display:none; } }
        @media (max-width:767px) {
          .tn-nav { padding:0 12px; }
          .tn-hamburger { display:flex; }
          .tn-search { display:none; }
          .tn-bell { display:none; }
          .tn-connect-text { display:none; }
          .tn-connect-short { display:inline; }
        }
      `}</style>
      <nav className="topnav tn-nav">
        {/* Hamburger — mobile only */}
        <button
          onClick={toggleDrawer}
          aria-label="Menu"
          className="tn-hamburger"
          style={{ width: 40, height: 40, alignItems: 'center', justifyContent: 'center', background: 'none', border: 'none', borderRadius: 8, flexShrink: 0, cursor: 'pointer' }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
          </svg>
        </button>

        {/* Logo */}
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0, textDecoration: 'none' }}>
          <div style={{ width: 32, height: 32, borderRadius: 8, background: 'var(--brand)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 14, color: 'white' }}>M</div>
          <span className="tn-logo-text" style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 20, color: 'var(--gray-900)' }}>Mintara</span>
        </Link>

        {/* Desktop nav links */}
        <div className="tn-nav-links">
          {NAV.map(n => (
            <Link key={n.href} href={n.href}
              style={{
                padding: '6px 12px', borderRadius: 8, fontSize: 14, fontWeight: 500,
                color: pathname === n.href ? 'var(--gray-900)' : 'var(--gray-600)',
                background: pathname === n.href ? 'var(--gray-100)' : 'transparent',
                transition: 'all .15s',
              }}
            >{n.label}</Link>
          ))}
        </div>

        {/* Search bar — hidden on mobile */}
        <button
          onClick={openSearch}
          className="tn-search"
          style={{
            height: 44, borderRadius: 22,
            border: '1px solid var(--gray-200)', background: 'var(--gray-50)',
            alignItems: 'center', gap: 10, padding: '0 14px',
            cursor: 'text', transition: 'border-color .15s', textAlign: 'left',
          }}
          aria-label="Search"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--gray-400)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
            <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
          </svg>
          <span style={{ flex: 1, fontSize: 13, color: 'var(--gray-400)' }}>Search NFTs, collections, artists…</span>
          <span style={{ fontSize: 11, fontFamily: 'monospace', color: 'var(--gray-400)', background: 'var(--gray-100)', padding: '2px 6px', borderRadius: 4, flexShrink: 0 }}>/</span>
        </button>

        {/* Right group */}
        <div className="tn-right">
          {/* Bell — hidden on mobile */}
          <button onClick={() => showToast('No new notifications')}
            className="tn-bell"
            style={{ width: 40, height: 40, borderRadius: '50%', background: 'var(--gray-50)', border: '1px solid var(--gray-200)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
            aria-label="Notifications"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--gray-600)" strokeWidth="2" strokeLinecap="round">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/>
            </svg>
          </button>
          <button
            onClick={() => router.push('/login')}
            style={{ height: 40, padding: '0 18px', borderRadius: 20, background: 'var(--blue)', color: 'white', border: 'none', fontWeight: 600, fontSize: 14, transition: 'background .15s', cursor: 'pointer', whiteSpace: 'nowrap' }}
            onMouseEnter={e => (e.currentTarget.style.background = 'var(--blue-dark)')}
            onMouseLeave={e => (e.currentTarget.style.background = 'var(--blue)')}
          >
            <span className="tn-connect-text">Connect wallet</span>
            <span className="tn-connect-short">Connect</span>
          </button>
        </div>
      </nav>
    </>
  )
}
