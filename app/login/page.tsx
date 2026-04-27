'use client'
import { useRouter } from 'next/navigation'
import { useToast } from '@/app/layout'

const WALLETS = [
  { name: 'MetaMask', icon: '🦊', desc: 'Popular browser extension wallet' },
  { name: 'WalletConnect', icon: '🔗', desc: 'Connect via QR code' },
  { name: 'Coinbase Wallet', icon: '🔵', desc: 'Coinbase self-custody wallet' },
  { name: 'Phantom', icon: '👻', desc: 'Multi-chain wallet' },
]

export default function LoginPage() {
  const router = useRouter()
  const { showToast } = useToast()

  const connect = (wallet: string) => {
    showToast(`${wallet} connected!`, 'success')
    router.push('/')
  }

  return (
    <div style={{ maxWidth: 420, margin: '60px auto', padding: '0 24px 64px' }}>
      <div style={{ textAlign: 'center', marginBottom: 40 }}>
        <div style={{ fontSize: 40, marginBottom: 16 }}>🌿</div>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 26, fontWeight: 800, color: 'var(--gray-900)', marginBottom: 8 }}>Connect your wallet</h1>
        <p style={{ fontSize: 14, color: 'var(--gray-500)', lineHeight: 1.6 }}>Connect with one of our available wallet providers or create a new one.</p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24 }}>
        {WALLETS.map(w => (
          <button key={w.name} onClick={() => connect(w.name)}
            style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '16px 20px', borderRadius: 12, border: '1.5px solid var(--gray-200)', background: 'white', cursor: 'pointer', transition: '.15s', textAlign: 'left', width: '100%' }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--blue)'; e.currentTarget.style.background = 'var(--blue-tint)' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--gray-200)'; e.currentTarget.style.background = 'white' }}>
            <span style={{ fontSize: 28, flexShrink: 0 }}>{w.icon}</span>
            <div>
              <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--gray-900)' }}>{w.name}</div>
              <div style={{ fontSize: 12, color: 'var(--gray-500)' }}>{w.desc}</div>
            </div>
            <span style={{ marginLeft: 'auto', fontSize: 16, color: 'var(--gray-300)' }}>›</span>
          </button>
        ))}
      </div>

      <div style={{ textAlign: 'center', position: 'relative', marginBottom: 24 }}>
        <div style={{ height: 1, background: 'var(--gray-200)' }} />
        <span style={{ position: 'absolute', top: -10, left: '50%', transform: 'translateX(-50%)', background: 'white', padding: '0 12px', fontSize: 12, color: 'var(--gray-400)', fontWeight: 600 }}>OR</span>
      </div>

      <button style={{ width: '100%', height: 48, borderRadius: 12, border: '1.5px solid var(--gray-200)', background: 'white', fontSize: 14, fontWeight: 600, color: 'var(--gray-700)', cursor: 'pointer' }}>
        Continue with email
      </button>

      <p style={{ textAlign: 'center', fontSize: 12, color: 'var(--gray-400)', marginTop: 24, lineHeight: 1.6 }}>
        By connecting a wallet, you agree to Mintara&apos;s Terms of Service and Privacy Policy.
      </p>
    </div>
  )
}
