'use client'
import Link from 'next/link'
import { useDrawer } from '@/app/layout'

const LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Explore', href: '/explore' },
  { label: 'Rankings', href: '/rankings' },
  { label: 'Create', href: '/create' },
  { label: 'My Portfolio', href: '/portfolio' },
  { label: 'Connect wallet', href: '/login' },
]

export default function MobileDrawer() {
  const { isOpen, close } = useDrawer()
  if (!isOpen) return null
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 500 }}>
      <div style={{ position: 'absolute', inset: 0, background: 'var(--modal-overlay)' }} onClick={close} />
      <div style={{
        position: 'absolute', top: 0, left: 0, bottom: 0, width: 280,
        background: 'white', boxShadow: 'var(--shadow-xl)', padding: '24px 0',
        animation: 'slideInLeft .25s ease',
        display: 'flex', flexDirection: 'column',
      }}>
        <div style={{ padding: '0 20px 20px', borderBottom: '1px solid var(--gray-150)', marginBottom: 12 }}>
          <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 20, color: 'var(--gray-900)' }}>Mintara</span>
        </div>
        {LINKS.map(l => (
          <Link key={l.href} href={l.href} onClick={close}
            style={{ padding: '14px 20px', fontSize: 15, fontWeight: 500, color: 'var(--gray-700)', display: 'block', transition: 'background .12s' }}
            onMouseEnter={e => (e.currentTarget.style.background = 'var(--gray-50)')}
            onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
          >{l.label}</Link>
        ))}
      </div>
    </div>
  )
}
