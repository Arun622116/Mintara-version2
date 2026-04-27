'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { COLLECTIONS } from '@/lib/data'
import { NFT_CATEGORIES } from '@/lib/constants'
import { useToast } from '@/app/layout'

const STEPS = ['Upload', 'Details', 'Settings', 'Review']

export default function CreatePage() {
  const [step, setStep] = useState(0)
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('')
  const [collection, setCollection] = useState('')
  const [price, setPrice] = useState('')
  const [royalty, setRoyalty] = useState('5')
  const [listType, setListType] = useState<'fixed' | 'auction'>('fixed')
  const router = useRouter()
  const { showToast } = useToast()

  const canNext = [
    true,
    name.length > 0,
    true,
    true,
  ][step]

  const next = () => { if (step < 3) setStep(s => s + 1) }
  const back = () => { if (step > 0) setStep(s => s - 1) }
  const mint = () => {
    showToast(`${name || 'NFT'} minted successfully!`, 'success')
    router.push('/')
  }

  return (
    <div style={{ maxWidth: 720, margin: '40px auto', padding: '0 24px 64px' }}>
      <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 800, color: 'var(--gray-900)', marginBottom: 8 }}>Create NFT</h1>
      <p style={{ fontSize: 14, color: 'var(--gray-500)', marginBottom: 32 }}>Mint your artwork on the Mintara marketplace</p>

      {/* Step indicator */}
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: 40 }}>
        {STEPS.map((s, i) => (
          <div key={s} style={{ display: 'flex', alignItems: 'center', flex: i < STEPS.length - 1 ? 1 : 'none' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
              <div style={{ width: 32, height: 32, borderRadius: '50%', border: `2px solid ${i <= step ? 'var(--blue)' : 'var(--gray-300)'}`, background: i < step ? 'var(--blue)' : i === step ? 'var(--blue-tint)' : 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, color: i < step ? 'white' : i === step ? 'var(--blue)' : 'var(--gray-400)', transition: '.2s' }}>
                {i < step ? '✓' : i + 1}
              </div>
              <span style={{ fontSize: 11, fontWeight: 600, color: i === step ? 'var(--blue)' : 'var(--gray-400)' }}>{s}</span>
            </div>
            {i < STEPS.length - 1 && (
              <div style={{ flex: 1, height: 2, background: i < step ? 'var(--blue)' : 'var(--gray-200)', margin: '0 8px', marginBottom: 20, transition: '.2s' }} />
            )}
          </div>
        ))}
      </div>

      {/* Step 0 — Upload */}
      {step === 0 && (
        <div>
          <div style={{ border: '2px dashed var(--gray-200)', borderRadius: 16, padding: 48, textAlign: 'center', cursor: 'pointer', transition: '.2s', marginBottom: 24 }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--blue)'; e.currentTarget.style.background = 'var(--blue-tint)' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--gray-200)'; e.currentTarget.style.background = 'white' }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>🖼️</div>
            <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--gray-700)', marginBottom: 6 }}>Drag & drop your file here</div>
            <div style={{ fontSize: 13, color: 'var(--gray-400)', marginBottom: 16 }}>PNG, JPG, GIF, SVG, MP4, WEBM — max 100MB</div>
            <button style={{ height: 38, padding: '0 20px', borderRadius: 8, border: '1px solid var(--blue)', background: 'white', color: 'var(--blue)', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>Browse files</button>
          </div>
          <div style={{ padding: 16, background: 'var(--gray-50)', borderRadius: 10, fontSize: 13, color: 'var(--gray-600)' }}>
            <strong>Supported formats:</strong> PNG, JPG, GIF, SVG, MP4, WEBM, MP3, WAV, OGG, GLB, GLTF
          </div>
        </div>
      )}

      {/* Step 1 — Details */}
      {step === 1 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 700, color: 'var(--gray-700)', marginBottom: 8 }}>Name <span style={{ color: 'var(--red)' }}>*</span></label>
            <input value={name} onChange={e => setName(e.target.value)} placeholder="e.g. Warli Dancer #001"
              style={{ width: '100%', height: 44, borderRadius: 10, border: '1.5px solid var(--gray-200)', padding: '0 14px', fontSize: 15, outline: 'none', boxSizing: 'border-box' }} />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 700, color: 'var(--gray-700)', marginBottom: 8 }}>Description</label>
            <textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="Describe your NFT..." rows={4}
              style={{ width: '100%', borderRadius: 10, border: '1.5px solid var(--gray-200)', padding: '10px 14px', fontSize: 14, outline: 'none', resize: 'vertical', boxSizing: 'border-box', fontFamily: 'var(--font-sans)', lineHeight: 1.5 }} />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 700, color: 'var(--gray-700)', marginBottom: 8 }}>Category</label>
            <select value={category} onChange={e => setCategory(e.target.value)}
              style={{ width: '100%', height: 44, borderRadius: 10, border: '1.5px solid var(--gray-200)', padding: '0 14px', fontSize: 14, color: 'var(--gray-700)', outline: 'none', background: 'white', boxSizing: 'border-box' }}>
              <option value="">Select category</option>
              {NFT_CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 700, color: 'var(--gray-700)', marginBottom: 8 }}>Collection</label>
            <select value={collection} onChange={e => setCollection(e.target.value)}
              style={{ width: '100%', height: 44, borderRadius: 10, border: '1.5px solid var(--gray-200)', padding: '0 14px', fontSize: 14, color: 'var(--gray-700)', outline: 'none', background: 'white', boxSizing: 'border-box' }}>
              <option value="">No collection</option>
              {COLLECTIONS.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </div>
        </div>
      )}

      {/* Step 2 — Settings */}
      {step === 2 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--gray-700)', marginBottom: 12 }}>Listing type</div>
            <div style={{ display: 'flex', gap: 12 }}>
              {(['fixed', 'auction'] as const).map(t => (
                <button key={t} onClick={() => setListType(t)}
                  style={{ flex: 1, padding: '14px 20px', borderRadius: 12, border: `2px solid ${listType === t ? 'var(--blue)' : 'var(--gray-200)'}`, background: listType === t ? 'var(--blue-tint)' : 'white', cursor: 'pointer', transition: '.15s', textAlign: 'left' }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: listType === t ? 'var(--blue)' : 'var(--gray-800)', marginBottom: 4 }}>
                    {t === 'fixed' ? '🏷️ Fixed price' : '🔨 Auction'}
                  </div>
                  <div style={{ fontSize: 12, color: 'var(--gray-500)' }}>
                    {t === 'fixed' ? 'Sell at a set price' : 'Highest bid wins'}
                  </div>
                </button>
              ))}
            </div>
          </div>
          <div>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 700, color: 'var(--gray-700)', marginBottom: 8 }}>
              {listType === 'fixed' ? 'Price (MATIC)' : 'Starting bid (MATIC)'}
            </label>
            <input type="number" min="0" step="0.01" value={price} onChange={e => setPrice(e.target.value)} placeholder="0.00"
              style={{ width: '100%', height: 44, borderRadius: 10, border: '1.5px solid var(--gray-200)', padding: '0 14px', fontSize: 15, outline: 'none', boxSizing: 'border-box' }} />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 700, color: 'var(--gray-700)', marginBottom: 8 }}>Creator royalties (%)</label>
            <input type="number" min="0" max="15" step="0.5" value={royalty} onChange={e => setRoyalty(e.target.value)}
              style={{ width: '100%', height: 44, borderRadius: 10, border: '1.5px solid var(--gray-200)', padding: '0 14px', fontSize: 15, outline: 'none', boxSizing: 'border-box' }} />
            <div style={{ fontSize: 12, color: 'var(--gray-400)', marginTop: 6 }}>You earn {royalty}% on all secondary sales. Max 15%.</div>
          </div>
        </div>
      )}

      {/* Step 3 — Review */}
      {step === 3 && (
        <div>
          <div style={{ border: '1px solid var(--gray-200)', borderRadius: 16, overflow: 'hidden', marginBottom: 24 }}>
            <div style={{ height: 200, background: 'linear-gradient(135deg,#6366f1,#ec4899)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 60, color: 'rgba(255,255,255,.3)', fontWeight: 700 }}>🖼️</div>
            <div style={{ padding: 20 }}>
              <div style={{ fontSize: 20, fontWeight: 800, color: 'var(--gray-900)', marginBottom: 4 }}>{name || 'Untitled NFT'}</div>
              {description && <div style={{ fontSize: 13, color: 'var(--gray-500)', marginBottom: 12 }}>{description}</div>}
              <div style={{ display: 'flex', gap: 20, fontSize: 13 }}>
                {category && <div><span style={{ color: 'var(--gray-500)' }}>Category: </span><strong>{category}</strong></div>}
                {price && <div><span style={{ color: 'var(--gray-500)' }}>Price: </span><strong>{price} MATIC</strong></div>}
                <div><span style={{ color: 'var(--gray-500)' }}>Royalty: </span><strong>{royalty}%</strong></div>
              </div>
            </div>
          </div>
          <div style={{ padding: 16, background: 'var(--gray-50)', borderRadius: 10, fontSize: 13, color: 'var(--gray-600)', marginBottom: 24 }}>
            By minting, you confirm that this artwork is your original creation. Platform fee: <strong>2.5%</strong> on primary sales.
          </div>
        </div>
      )}

      {/* Navigation */}
      <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end', marginTop: 32 }}>
        {step > 0 && (
          <button onClick={back}
            style={{ height: 44, padding: '0 24px', borderRadius: 10, border: '1px solid var(--gray-200)', background: 'white', fontSize: 14, fontWeight: 600, color: 'var(--gray-700)', cursor: 'pointer' }}>
            Back
          </button>
        )}
        {step < 3 ? (
          <button onClick={next} disabled={!canNext}
            style={{ height: 44, padding: '0 32px', borderRadius: 10, border: 'none', background: canNext ? 'var(--blue)' : 'var(--gray-300)', color: 'white', fontSize: 14, fontWeight: 700, cursor: canNext ? 'pointer' : 'default', transition: '.15s' }}>
            Continue
          </button>
        ) : (
          <button onClick={mint}
            style={{ height: 44, padding: '0 32px', borderRadius: 10, border: 'none', background: 'var(--brand)', color: 'white', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>
            Mint NFT
          </button>
        )}
      </div>
    </div>
  )
}
