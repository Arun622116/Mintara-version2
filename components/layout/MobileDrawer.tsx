'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useDrawer } from '@/app/layout'

const LINKS = [
  { label: 'Home', href: '/', icon: '🏠' },
  { label: 'Explore', href: '/explore', icon: '🔍' },
  { label: 'Rankings', href: '/rankings', icon: '📊' },
  { label: 'Create NFT', href: '/create', icon: '✏️' },
  { label: 'My Portfolio', href: '/portfolio', icon: '💼' },
]

export default function MobileDrawer() {
  const { isOpen, close } = useDrawer()
  const pathname = usePathname()

  return (
    <>
      {/* Overlay */}
      <div
        onClick={close}
        style={{
          position: 'fixed', inset: 0, background: 'rgba(0,0,0,.5)', zIndex: 490,
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? 'auto' : 'none',
          transition: 'opacity .25s ease',
        }}
      />
      {/* Drawer panel */}
      <div style={{
        position: 'fixed', top: 0, left: 0, bottom: 0, width: 280,
        background: 'white', zIndex: 500,
        boxShadow: '4px 0 24px rgba(0,0,0,.15)',
        transform: isOpen ? 'translateX(0)' : 'translateX(-100%)',
        transition: 'transform .3s ease',
        display: 'flex', flexDirection: 'column',
      }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 20px', borderBottom: '1px solid var(--gray-150)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 28, height: 28, borderRadius: 7, background: 'var(--brand)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 12, color: 'white' }}>M</div>
            <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 18, color: 'var(--gray-900)' }}>Mintara</span>
          </div>
          <button onClick={close}
            style={{ width: 32, height: 32, borderRadius: '50%', border: '1px solid var(--gray-200)', background: 'var(--gray-50)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontSize: 18, color: 'var(--gray-500)' }}>
            ×
          </button>
        </div>

        {/* Nav links */}
        <nav style={{ flex: 1, padding: '8px 0', overflowY: 'auto' }}>
          {LINKS.map(l => (
            <Link key={l.href} href={l.href} onClick={close}
              style={{
                display: 'flex', alignItems: 'center', gap: 12,
                padding: '13px 20px', fontSize: 15, fontWeight: pathname === l.href ? 600 : 500,
                color: pathname === l.href ? 'var(--blue)' : 'var(--gray-700)',
                background: pathname === l.href ? 'var(--blue-tint)' : 'transparent',
                borderLeft: pathname === l.href ? '3px solid var(--blue)' : '3px solid transparent',
                transition: 'background .12s',
                textDecoration: 'none',
              }}
            >
              <span style={{ fontSize: 18, lineHeight: 1, width: 24, textAlign: 'center' }}>{l.icon}</span>
              {l.label}
            </Link>
          ))}
        </nav>

        {/* Connect wallet */}
        <div style={{ padding: '16px 20px', borderTop: '1px solid var(--gray-150)', paddingBottom: 'calc(16px + env(safe-area-inset-bottom))' }}>
          <Link href="/login" onClick={close}
            style={{ display: 'block', width: '100%', height: 48, borderRadius: 12, background: 'var(--blue)', color: 'white', fontWeight: 600, fontSize: 15, textAlign: 'center', lineHeight: '48px', textDecoration: 'none', transition: 'background .15s' }}>
            Connect Wallet
          </Link>
        </div>
      </div>
    </>
  )
}
