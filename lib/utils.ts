import { PALETTES } from './data'

export const pal = (i: number) => PALETTES[i % PALETTES.length]

export const nftArtStyle = (paletteIndex: number) => {
  const p = pal(paletteIndex)
  return {
    background: `linear-gradient(135deg, ${p.from} 0%, ${p.to} 100%)`,
    color: p.accent,
  }
}

export const formatPrice = (matic: number | null): string => {
  if (matic === null) return '—'
  return matic % 1 === 0 ? `${matic} MATIC` : `${matic.toFixed(2)} MATIC`
}

export const formatChange = (n: number): string =>
  `${n >= 0 ? '+' : ''}${n.toFixed(1)}%`

export const shortAddress = (addr: string): string =>
  addr.length > 10 ? `${addr.slice(0, 6)}...${addr.slice(-4)}` : addr

export const timeAgo = (iso: string): string => {
  const diff = Date.now() - new Date(iso).getTime()
  const m = Math.floor(diff / 60000)
  if (m < 1) return 'just now'
  if (m < 60) return `${m}m ago`
  const h = Math.floor(m / 60)
  if (h < 24) return `${h}h ago`
  return `${Math.floor(h / 24)}d ago`
}

export const countdownStr = (iso: string): string => {
  const diff = new Date(iso).getTime() - Date.now()
  if (diff <= 0) return 'Ended'
  const h = Math.floor(diff / 3600000)
  const m = Math.floor((diff % 3600000) / 60000)
  return `${h}h ${m}m`
}

export const cn = (...classes: (string | undefined | false | null)[]): string =>
  classes.filter(Boolean).join(' ')
