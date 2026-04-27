'use client'
interface Props {
  toast: { message: string; type: 'info' | 'success'; visible: boolean }
}
export default function Toast({ toast }: Props) {
  if (!toast.visible || !toast.message) return null
  return (
    <div className={`toast${toast.type === 'success' ? ' success' : ''}`} role="status" aria-live="polite">
      <span style={{ fontSize: 16 }}>{toast.type === 'success' ? '✓' : 'ℹ'}</span>
      {toast.message}
    </div>
  )
}
