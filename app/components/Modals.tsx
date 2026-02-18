'use client'

import { useState, useEffect } from 'react'
import { X, CheckCircle2 } from 'lucide-react'
import { packages, type Package } from './Packages'

/* ─── Types ──────────────────────────────────────────────── */
type ModalType = 'booking' | 'detail' | 'quote' | null

interface ModalsProps {
  modal:    { type: ModalType; pkgId?: number }
  onClose:  () => void
  onToast:  (msg: string, type: 'success'|'error'|'info') => void
  onBook:   (id: number) => void
}

/* ─── Helpers ────────────────────────────────────────────── */
function todayISO() { return new Date().toISOString().split('T')[0] }
function isValidEmail(e: string) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e) }

/* ─── Field component ────────────────────────────────────── */
function Field({ label, optional, children }: { label: string; optional?: boolean; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5 mb-4">
      <label className="font-mono-ep text-[.62rem] tracking-[.15em] uppercase text-white/40">
        {label} {optional && <span className="normal-case tracking-normal font-sans text-white/25">optional</span>}
      </label>
      {children}
    </div>
  )
}

const inputCls = (err?: string) =>
  `w-full px-4 py-3 rounded-xl text-sm text-white placeholder-white/20 outline-none transition-all
   bg-white/[.04] border ${err ? 'border-rose-500/50' : 'border-white/[.08] focus:border-[#00D4FF]/40 focus:bg-[#00D4FF]/[.03]'}
   [color-scheme:dark]`

/* ═══════════════════════════════════════════════════════════
   BOOKING MODAL
═══════════════════════════════════════════════════════════ */
function BookingModal({ pkgId, onClose, onToast }: { pkgId?: number; onClose: () => void; onToast: ModalsProps['onToast'] }) {
  const pkg = packages.find(p => p.id === pkgId)

  const [form, setForm] = useState({ package: pkg?.name || '', name: '', email: '', phone: '', date: '', guests: '', notes: '' })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(false)

  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement|HTMLSelectElement|HTMLTextAreaElement>) =>
    setForm(f => ({ ...f, [k]: e.target.value }))

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    const errs: Record<string,string> = {}
    if (!form.name)                     errs.name   = 'Full name is required'
    if (!isValidEmail(form.email))      errs.email  = 'Valid email required'
    if (!form.phone)                    errs.phone  = 'Phone number is required'
    if (!form.date)                     errs.date   = 'Event date is required'
    if (!form.guests || +form.guests<1) errs.guests = 'Guest count required'
    setErrors(errs)
    if (Object.keys(errs).length) return
    setLoading(true)

    // Call the API route
    await fetch('/api/booking', {
      method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form),
    })

    setLoading(false)
    onClose()
    onToast(`Booking received! We'll contact ${form.email} within 24 hours.`, 'success')
  }

  return (
    <>
      <div className="sticky top-0 z-10 bg-[#09090f] px-8 pt-8 pb-5 border-b border-white/[.04] flex items-start justify-between gap-4">
        <div>
          <span className="label-text block mb-1">EventPro</span>
          <h2 className="font-display text-[1.75rem] text-white tracking-wider">Book an Event</h2>
          {pkg && <p className="text-sm text-white/35 mt-0.5">{pkg.name} Package — Starting at {pkg.price}</p>}
        </div>
        <button onClick={onClose} className="w-9 h-9 rounded-full flex items-center justify-center text-white/45 hover:text-white transition-all border border-white/10 hover:border-white/25">
          <X className="w-4 h-4"/>
        </button>
      </div>

      <form onSubmit={submit} className="px-8 py-6">
        <Field label="Package">
          <select value={form.package} onChange={set('package')} className={inputCls()}>
            <option value="">Select a package</option>
            {packages.filter(p => p.status !== 'booked').map(p => (
              <option key={p.id} value={p.name} className="bg-[#09090f]">{p.name} — {p.price}</option>
            ))}
          </select>
        </Field>

        <Field label="Full Name">
          <input type="text" placeholder="Juan dela Cruz" value={form.name} onChange={set('name')} className={inputCls(errors.name)}/>
          {errors.name && <p className="font-mono-ep text-[.62rem] text-rose-400">{errors.name}</p>}
        </Field>

        <div className="grid grid-cols-2 gap-4">
          <Field label="Email">
            <input type="email" placeholder="you@email.com" value={form.email} onChange={set('email')} className={inputCls(errors.email)}/>
            {errors.email && <p className="font-mono-ep text-[.62rem] text-rose-400">{errors.email}</p>}
          </Field>
          <Field label="Phone">
            <input type="tel" placeholder="+63 9xx xxx xxxx" value={form.phone} onChange={set('phone')} className={inputCls(errors.phone)}/>
            {errors.phone && <p className="font-mono-ep text-[.62rem] text-rose-400">{errors.phone}</p>}
          </Field>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Field label="Event Date">
            <input type="date" min={todayISO()} value={form.date} onChange={set('date')} className={inputCls(errors.date)}/>
            {errors.date && <p className="font-mono-ep text-[.62rem] text-rose-400">{errors.date}</p>}
          </Field>
          <Field label="Expected Guests">
            <input type="number" placeholder="100" min="1" value={form.guests} onChange={set('guests')} className={inputCls(errors.guests)}/>
            {errors.guests && <p className="font-mono-ep text-[.62rem] text-rose-400">{errors.guests}</p>}
          </Field>
        </div>

        <Field label="Additional Notes" optional>
          <textarea rows={3} placeholder="Tell us about your vision or special requirements..." value={form.notes} onChange={set('notes')} className={`${inputCls()} resize-none`}/>
        </Field>

        <button type="submit" disabled={loading}
          className="w-full mt-2 py-4 bg-white text-[#050508] font-display text-lg tracking-wider rounded-xl hover:bg-[#9DC4FF] disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2">
          {loading ? <><span className="spinner"/>&nbsp;Sending...</> : 'Send Booking Request'}
        </button>
        <p className="text-center font-mono-ep text-[.62rem] text-white/20 mt-3">We'll confirm availability and follow up within 24 hours.</p>
      </form>
    </>
  )
}

/* ═══════════════════════════════════════════════════════════
   DETAIL MODAL
═══════════════════════════════════════════════════════════ */
function DetailModal({ pkgId, onClose, onBook }: { pkgId?: number; onClose: () => void; onBook: (id: number) => void }) {
  const pkg = packages.find(p => p.id === pkgId)
  if (!pkg) return null

  const statusMap = {
    available: { cls: 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20', label: '● Available' },
    soon:      { cls: 'bg-amber-500/10  text-amber-400  border border-amber-500/20',     label: '◌ Coming Soon' },
    booked:    { cls: 'bg-rose-500/10   text-rose-400   border border-rose-500/20',       label: '✕ Fully Booked' },
  }
  const s = statusMap[pkg.status]

  return (
    <>
      <div className="relative rounded-t-3xl overflow-hidden h-56 flex-shrink-0">
        <img src={pkg.img.replace('w=200', 'w=800')} alt={pkg.name} className="w-full h-full object-cover"/>
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top,#09090f 0%,transparent 50%)' }}/>
        <button onClick={onClose} className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center text-white/70 hover:text-white bg-black/50 backdrop-blur-sm border border-white/10 transition-all">
          <X className="w-3.5 h-3.5"/>
        </button>
      </div>

      <div className="px-8 py-7">
        <div className="flex items-start justify-between gap-4 mb-5 flex-wrap">
          <div>
            <span className="label-text block mb-1">Package Details</span>
            <h2 className="font-display text-[2rem] text-white">{pkg.name}</h2>
          </div>
          <div className="text-right">
            <p className="font-mono-ep text-[.6rem] tracking-wider text-white/35 mb-1">Starting at</p>
            <p className="font-display text-[2rem] text-white">{pkg.price}</p>
            <span className={`inline-block mt-1 px-3 py-1 rounded-full font-mono-ep text-[.6rem] tracking-wider ${s.cls}`}>{s.label}</span>
          </div>
        </div>

        <p className="text-sm text-white/50 leading-relaxed mb-7">{pkg.desc}</p>

        <p className="font-mono-ep text-[.62rem] tracking-[.15em] uppercase text-white/35 mb-4">What's Included</p>
        <div className="grid grid-cols-2 gap-2 mb-7">
          {pkg.inclusions.map(item => (
            <div key={item} className="flex items-start gap-2 text-sm text-white/60">
              <span className="text-[#00D4FF] mt-0.5 text-xs flex-shrink-0">✓</span>
              {item}
            </div>
          ))}
        </div>

        <div className="p-4 rounded-xl text-sm text-white/35 leading-relaxed mb-6" style={{ background: 'rgba(255,255,255,.03)', border: '1px solid rgba(255,255,255,.06)' }}>
          <strong className="text-white/50">Note:</strong> Final pricing depends on guest count, venue, and specific requirements.
        </div>

        <div className={`grid gap-3 ${pkg.status === 'available' ? 'grid-cols-2' : 'grid-cols-1'}`}>
          <button onClick={onClose} className="py-3 rounded-xl font-mono-ep text-[.7rem] tracking-wider text-white/50 hover:text-white transition-all border border-white/10 hover:border-white/20">Close</button>
          {pkg.status === 'available' && (
            <button onClick={() => { onClose(); onBook(pkg.id) }} className="py-3 bg-white text-[#050508] rounded-xl font-display text-lg tracking-wider hover:bg-[#9DC4FF] transition-all">
              Book This Package
            </button>
          )}
        </div>
      </div>
    </>
  )
}

/* ═══════════════════════════════════════════════════════════
   QUOTE MODAL
═══════════════════════════════════════════════════════════ */
function QuoteModal({ onClose, onToast }: { onClose: () => void; onToast: ModalsProps['onToast'] }) {
  const [form, setForm] = useState({ name:'', email:'', phone:'', type:'', date:'', guests:'', budget:'', details:'' })
  const [loading, setLoading] = useState(false)
  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement|HTMLSelectElement|HTMLTextAreaElement>) =>
    setForm(f => ({ ...f, [k]: e.target.value }))

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    await fetch('/api/quote', {
      method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form),
    })
    setLoading(false)
    onClose()
    onToast('Quote request received! Our team will send a tailored proposal shortly.', 'success')
  }

  return (
    <>
      <div className="sticky top-0 z-10 bg-[#09090f] px-8 pt-8 pb-5 border-b border-white/[.04] flex items-start justify-between gap-4">
        <div>
          <span className="label-text block mb-1">EventPro</span>
          <h2 className="font-display text-[1.75rem] text-white tracking-wider">Request Custom Quote</h2>
          <p className="text-sm text-white/35 mt-0.5">We'll tailor a package just for you.</p>
        </div>
        <button onClick={onClose} className="w-9 h-9 rounded-full flex items-center justify-center text-white/45 hover:text-white transition-all border border-white/10 hover:border-white/25">
          <X className="w-4 h-4"/>
        </button>
      </div>

      <form onSubmit={submit} className="px-8 py-6">
        <div className="grid grid-cols-2 gap-4">
          <Field label="Name"><input type="text" placeholder="Your name" required value={form.name} onChange={set('name')} className={inputCls()}/></Field>
          <Field label="Email"><input type="email" placeholder="you@email.com" required value={form.email} onChange={set('email')} className={inputCls()}/></Field>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Field label="Phone"><input type="tel" placeholder="+63 9xx xxx xxxx" value={form.phone} onChange={set('phone')} className={inputCls()}/></Field>
          <Field label="Event Type">
            <select required value={form.type} onChange={set('type')} className={inputCls()}>
              <option value="" disabled>Select type</option>
              {['Wedding','Corporate Event','Birthday / Party','Concert / Festival','Other'].map(t => <option key={t} className="bg-[#09090f]">{t}</option>)}
            </select>
          </Field>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Field label="Preferred Date"><input type="date" min={todayISO()} value={form.date} onChange={set('date')} className={inputCls()}/></Field>
          <Field label="Guest Count"><input type="number" placeholder="Approx. guests" min="1" value={form.guests} onChange={set('guests')} className={inputCls()}/></Field>
        </div>
        <Field label="Approx. Budget (PHP)">
          <select value={form.budget} onChange={set('budget')} className={inputCls()}>
            <option value="" disabled>Select budget range</option>
            {['₱50,000 – ₱100,000','₱100,000 – ₱200,000','₱200,000 – ₱500,000','₱500,000+','Flexible / Open to discuss'].map(b => <option key={b} className="bg-[#09090f]">{b}</option>)}
          </select>
        </Field>
        <Field label="Event Details" optional>
          <textarea rows={3} placeholder="Describe your dream event, theme, or special requests..." value={form.details} onChange={set('details')} className={`${inputCls()} resize-none`}/>
        </Field>
        <button type="submit" disabled={loading}
          className="w-full mt-2 py-4 bg-white text-[#050508] font-display text-lg tracking-wider rounded-xl hover:bg-[#9DC4FF] disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2">
          {loading ? <><span className="spinner"/>&nbsp;Sending...</> : 'Request My Custom Quote'}
        </button>
        <p className="text-center font-mono-ep text-[.62rem] text-white/20 mt-3">Our team will reach out with a tailored proposal within 24 hours.</p>
      </form>
    </>
  )
}

/* ═══════════════════════════════════════════════════════════
   MODALS WRAPPER
═══════════════════════════════════════════════════════════ */
export default function Modals({ modal, onClose, onToast, onBook }: ModalsProps) {
  useEffect(() => {
    document.body.style.overflow = modal.type ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [modal.type])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  if (!modal.type) return null

  return (
    <div className={`modal-overlay fixed inset-0 z-[500] flex items-center justify-center p-4 open`}
      style={{ background: 'rgba(0,0,0,.8)', backdropFilter: 'blur(8px)' }}
      onClick={e => { if (e.target === e.currentTarget) onClose() }}>
      <div className={`modal-box relative bg-[#09090f] rounded-3xl w-full max-h-[92vh] overflow-y-auto open
        ${modal.type === 'detail' ? 'max-w-[680px]' : 'max-w-[520px]'}`}
        style={{ border: '1px solid rgba(255,255,255,.08)', scrollbarWidth: 'thin' }}>
        {modal.type === 'booking' && <BookingModal pkgId={modal.pkgId} onClose={onClose} onToast={onToast}/>}
        {modal.type === 'detail'  && <DetailModal  pkgId={modal.pkgId} onClose={onClose} onBook={onBook}/>}
        {modal.type === 'quote'   && <QuoteModal   onClose={onClose} onToast={onToast}/>}
      </div>
    </div>
  )
}
