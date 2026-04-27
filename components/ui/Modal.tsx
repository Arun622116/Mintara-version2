'use client'
import { useEffect } from 'react'
import type { ReactNode } from 'react'

interface Props {
  onClose: () => void
  children: ReactNode
  maxWidth?: number
}

export default function Modal({ onClose, children, maxWidth = 480 }: Props) {
  useEffect(() => {
    const h = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', h)
    return () => window.removeEventListener('keydown', h)
  }, [onClose])

  return (
    <div className="modal-overlay" onClick={e => { if (e.target === e.currentTarget) onClose() }}>
      <div className="modal-box" style={{ maxWidth }} role="dialog" aria-modal="true">
        {children}
      </div>
    </div>
  )
}
