'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const TABS = [
  { label: 'Home',     href: '/',          icon: (a: boolean) => <svg width="22" height="22" viewBox="0 0 24 24" fill={a?'currentColor':'none'} stroke="currentColor" strokeWidth="2"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg> },
  { label: 'Explore',  href: '/explore',   icon: (a: boolean) => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg> },
  { label: 'Create',   href: '/create',    icon: (_: boolean) => <span style={{fontSize:22,lineHeight:1}}>+</span>, special: true },
  { label: 'Rankings', href: '/rankings',  icon: (a: boolean) => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg> },
  { label: 'Profile',  href: '/portfolio', icon: (a: boolean) => <svg width="22" height="22" viewBox="0 0 24 24" fill={a?'currentColor':'none'} stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg> },
] as const

export default function MobileNav() {
  const pathname = usePathname()
  return (
    <nav className="mobile-nav" style={{ display: 'none', alignItems: 'stretch' }}>
      <style>{`.mobile-nav { display: flex !important; } @media (min-width: 769px) { .mobile-nav { display: none !important; } }`}</style>
      {TABS.map(tab => {
        const active = pathname === tab.href
        const isCreate = tab.label === 'Create'
        return (
          <Link key={tab.href} href={tab.href}
            style={{
              flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              gap: 3, color: active ? 'var(--brand)' : 'var(--gray-400)',
              fontSize: 10, fontWeight: 600, textDecoration: 'none',
            }}
          >
            {isCreate ? (
              <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'var(--brand)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', marginTop: -16 }}>
                {tab.icon(active)}
              </div>
            ) : tab.icon(active)}
            <span style={{ marginTop: isCreate ? 2 : 0 }}>{tab.label}</span>
          </Link>
        )
      })}
    </nav>
  )
}
