'use client'

import { useState } from 'react'
import { Instagram, Facebook, Youtube, Music2, Mail, Phone, MapPin, ExternalLink, CheckCircle2 } from 'lucide-react'

const quickLinks = [
  { label: 'Home',       id: '' },
  { label: 'Services',   id: 'services' },
  { label: 'Gallery',    id: 'gallery' },
  { label: 'Packages',   id: 'packages' },
]

const miniImgs = [
  'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=200&q=60',
  'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=200&q=60',
  'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=200&q=60',
  'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=200&q=60',
  'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=200&q=60',
  'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=200&q=60',
  'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=200&q=60',
  'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=200&q=60',
]

interface FooterProps {
  onBook:  () => void
  onQuote: () => void
  onToast: (msg: string, type: 'success'|'info') => void
}

export default function Footer({ onBook, onQuote, onToast }: FooterProps) {
  const [nlEmail, setNlEmail]       = useState('')
  const [nlState, setNlState]       = useState<'idle'|'loading'|'success'|'error'>('idle')
  const [nlMsg, setNlMsg]           = useState('')

  const scrollTo = (id: string) => {
    if (!id) { window.scrollTo({ top: 0, behavior: 'smooth' }); return }
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleNewsletter = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(nlEmail)) {
      setNlState('error'); setNlMsg('Please enter a valid email address.'); return
    }
    setNlState('loading')
    await new Promise(r => setTimeout(r, 1300))
    setNlState('success')
    onToast("Subscribed! We'll keep you updated on our latest events.", 'success')
  }

  return (
    <section id="contact" className="bg-void-black overflow-hidden">
      {/* Hero banner */}
      <div className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <img src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=700&q=80"
            alt="" className="w-full max-w-xl object-cover" style={{ aspectRatio: '2/3', filter: 'saturate(.5) brightness(.5)' }}/>
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to top,#050508 0%,rgba(5,5,8,.5) 40%,transparent 70%), linear-gradient(to bottom,#050508 0%,transparent 30%)' }}/>
        </div>
        <div className="relative z-10 text-center">
          <h2 className="font-display text-white" style={{ fontSize: 'clamp(4rem,15vw,12rem)', lineHeight: .9 }}>LET&apos;S<br/>CREATE</h2>
          <p className="font-mono-ep text-[.75rem] tracking-[.4em] text-[#9DC4FF]/50 uppercase mt-4">Something Extraordinary</p>
        </div>
        <div className="absolute bottom-16 left-12 z-10">
          <span className="label-text block mb-2">Est. 2017</span>
          <h3 className="font-display text-4xl">EVENTPRO</h3>
          <p className="font-mono-ep text-[.65rem] tracking-[.2em] text-[#9DC4FF]/50 mt-1">DAVAO CITY, PHILIPPINES</p>
        </div>
      </div>

      {/* Footer grid */}
      <div className="px-4 py-24 border-t border-white/[.05]">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">

            {/* Brand */}
            <div>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: 'rgba(0,212,255,.1)', border: '1px solid rgba(0,212,255,.2)' }}>
                  <Music2 className="w-4 h-4 text-[#00D4FF]"/>
                </div>
                <span className="font-display text-2xl tracking-wider">EVENTPRO</span>
              </div>
              <p className="text-sm text-white/40 leading-relaxed mb-5">
                Your premier partner in creating unforgettable events. From concept to execution, we deliver excellence in every detail.
              </p>
              <div className="flex gap-3">
                {[
                  { Icon: Instagram, href: 'https://instagram.com/eventpro', label: 'Instagram' },
                  { Icon: Facebook,  href: 'https://facebook.com/eventpro',  label: 'Facebook'  },
                  { Icon: Youtube,   href: 'https://youtube.com/eventpro',   label: 'YouTube'   },
                  { Icon: Music2,    href: 'https://tiktok.com/@eventpro',   label: 'TikTok'    },
                ].map(({ Icon, href, label }) => (
                  <a key={label} href={href} target="_blank" rel="noopener noreferrer" title={label}
                    className="w-9 h-9 rounded-full flex items-center justify-center text-white/50 hover:text-[#00D4FF] transition-all"
                    style={{ border: '1px solid rgba(255,255,255,.1)' }}>
                    <Icon className="w-4 h-4" strokeWidth={2}/>
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-display text-sm tracking-wider mb-5">Quick Links</h4>
              <ul className="space-y-3">
                {quickLinks.map(l => (
                  <li key={l.label}>
                    <button onClick={() => scrollTo(l.id)}
                      className="flex items-center gap-2 text-sm text-white/40 hover:text-[#9DC4FF] transition-colors group">
                      {l.label}
                      <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity"/>
                    </button>
                  </li>
                ))}
                <li><button onClick={onBook}  className="flex items-center gap-2 text-sm text-white/40 hover:text-[#9DC4FF] transition-colors group">Book an Event <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity"/></button></li>
                <li><button onClick={onQuote} className="flex items-center gap-2 text-sm text-white/40 hover:text-[#9DC4FF] transition-colors group">Custom Quote  <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity"/></button></li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-display text-sm tracking-wider mb-5">Contact Us</h4>
              <div className="space-y-4">
                {[
                  { Icon: Mail,    label: 'Email',   value: 'hello@eventpro.ph',         href: 'mailto:hello@eventpro.ph' },
                  { Icon: Phone,   label: 'Phone',   value: '+63 (82) 123 4567',          href: 'tel:+6382123456' },
                  { Icon: MapPin,  label: 'Address', value: '123 Event Street, Davao City', href: 'https://maps.google.com/?q=123+Event+Street+Davao+City' },
                ].map(({ Icon, label, value, href }) => (
                  <div key={label} className="flex items-start gap-3">
                    <div className="w-7 h-7 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Icon className="w-3.5 h-3.5 text-[#9DC4FF]/50"/>
                    </div>
                    <div>
                      <p className="font-mono-ep text-[.6rem] tracking-wider text-white/35 mb-0.5">{label}</p>
                      <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer"
                        className="text-sm text-white hover:text-[#9DC4FF] transition-colors underline underline-offset-2 decoration-white/15">
                        {value}
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Newsletter */}
            <div>
              <h4 className="font-display text-sm tracking-wider mb-5">Stay Updated</h4>
              <p className="text-sm text-white/40 leading-relaxed mb-4">Subscribe to get updates on our latest packages and promotions.</p>
              {nlState === 'success' ? (
                <div className="flex items-start gap-2 p-3 rounded-xl text-sm text-emerald-300" style={{ background: 'rgba(16,185,129,.08)', border: '1px solid rgba(16,185,129,.2)' }}>
                  <CheckCircle2 className="w-4 h-4 flex-shrink-0 mt-0.5"/>
                  <span>You&apos;re subscribed! Thanks for joining us.</span>
                </div>
              ) : (
                <form onSubmit={handleNewsletter} className="space-y-2">
                  <div className="flex gap-2">
                    <input type="email" value={nlEmail} onChange={e => { setNlEmail(e.target.value); setNlState('idle') }}
                      placeholder="your@email.com" required
                      className={`flex-1 px-4 py-3 rounded-lg text-sm text-white placeholder-white/25 outline-none transition-all
                        ${nlState === 'error' ? 'border-rose-500/50' : 'border-white/10 focus:border-[#00D4FF]/40'}
                        bg-white/5 border`}/>
                    <button type="submit" disabled={nlState === 'loading'}
                      className="px-4 py-3 rounded-lg font-mono-ep text-[.65rem] tracking-wider text-[#00D4FF] min-w-[80px] flex items-center justify-center disabled:opacity-50 transition-all hover:bg-[#00D4FF]/25"
                      style={{ background: 'rgba(0,212,255,.15)' }}>
                      {nlState === 'loading' ? <span className="spinner spinner-cyan"/> : 'Subscribe'}
                    </button>
                  </div>
                  {nlState === 'error' && <p className="font-mono-ep text-[.65rem] text-rose-400">{nlMsg}</p>}
                </form>
              )}
            </div>
          </div>

          {/* Mini gallery */}
          <div className="mb-14">
            <span className="label-text block mb-4">Gallery</span>
            <div className="grid grid-cols-8 gap-2">
              {miniImgs.map((src, i) => (
                <div key={i} className="aspect-square rounded-lg overflow-hidden cursor-pointer">
                  <img src={src} alt="" className="w-full h-full object-cover brightness-[.6] hover:brightness-90 hover:scale-110 transition-all duration-300"/>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom bar */}
          <div className="pt-6 border-t border-white/[.04] flex flex-wrap items-center justify-between gap-4">
            <p className="font-mono-ep text-[.65rem] tracking-wider text-white/20">© 2024 EventPro. All rights reserved.</p>
            <div className="flex gap-5">
              {['Privacy Policy','Terms of Service','Cookie Policy'].map(link => (
                <button key={link} onClick={() => onToast(`${link} page coming soon.`, 'info')}
                  className="font-mono-ep text-[.65rem] tracking-wider text-white/20 hover:text-white/50 transition-colors">
                  {link}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
