'use client'

import { useEffect, useState } from 'react'
import { Disc } from 'lucide-react'

const TARGET = 'CREATE MEMORIES'
const CHARS  = '!@#$%^&*()_+-=[]{}|;:,.<>?ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

export default function Hero() {
  const [displayText, setDisplayText] = useState(' '.repeat(TARGET.length))
  const [decoding, setDecoding]       = useState(true)

  useEffect(() => {
    let iter = 0
    const max = TARGET.length * 8
    const iv  = setInterval(() => {
      setDisplayText(
        TARGET.split('').map((_, i) =>
          i < iter / 8 ? TARGET[i] : CHARS[Math.floor(Math.random() * CHARS.length)]
        ).join('')
      )
      iter++
      if (iter >= max) { clearInterval(iv); setDisplayText(TARGET); setDecoding(false) }
    }, 35)
    return () => clearInterval(iv)
  }, [])

  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section id="hero" className="relative w-full h-screen overflow-hidden bg-void-black flex flex-col items-center justify-end pb-20">
      {/* Background */}
      <div className="absolute inset-0"
        style={{ background: 'linear-gradient(180deg,rgba(5,5,8,.2) 0%,rgba(5,5,8,.55) 50%,rgba(5,5,8,.95) 100%), linear-gradient(135deg,#0a0a18 0%,#050508 60%)' }}
      />
      {/* Grid */}
      <div className="absolute inset-0 hero-grid" />
      {/* Orbs */}
      <div className="absolute top-[-100px] right-[-100px] w-[500px] h-[500px] rounded-full animate-float"
        style={{ background: 'rgba(0,212,255,.08)', filter: 'blur(80px)' }} />
      <div className="absolute bottom-0 left-[-100px] w-[400px] h-[400px] rounded-full animate-float animation-delay-2"
        style={{ background: 'rgba(77,159,255,.06)', filter: 'blur(80px)' }} />

      {/* Brand */}
      <div className="absolute top-8 left-8 flex items-center gap-3 z-10">
        <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: 'rgba(0,212,255,.15)', border: '1px solid rgba(0,212,255,.3)' }}>
          <Disc className="w-4 h-4 text-[#00D4FF]" />
        </div>
        <span className="font-display text-xl tracking-widest">EVENTPRO</span>
      </div>

      {/* Corner */}
      <div className="absolute top-8 right-8 text-right z-10">
        <p className="font-mono-ep text-[.62rem] tracking-[.2em] uppercase text-white/35">DAVAO CITY</p>
        <p className="font-mono-ep text-[.62rem] text-[#9DC4FF]/55">Premium Event Services</p>
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center">
        <h1 className={`font-mono-ep font-bold text-white text-center mb-5 text-glow-cyan animate-fade-up
          text-[clamp(2.5rem,10vw,8rem)] leading-none tracking-tight
          ${decoding ? 'text-[#00D4FF]' : ''} transition-colors duration-500`}
          style={{ animationDelay: '1s', animationFillMode: 'both' }}
        >
          {displayText}
        </h1>
        <p className="font-mono-ep text-[.7rem] tracking-[.25em] uppercase text-[#9DC4FF]/60 mb-10 text-center max-w-md animate-fade-up"
          style={{ animationDelay: '1.3s', animationFillMode: 'both' }}>
          Transforming your vision into extraordinary events since 2017
        </p>
        <div className="flex gap-4 animate-fade-up" style={{ animationDelay: '1.5s', animationFillMode: 'both' }}>
          <button onClick={() => scrollTo('packages')}
            className="px-9 py-3 bg-white text-[#050508] font-display text-base tracking-wider rounded-full hover:bg-[#9DC4FF] transition-all hover:-translate-y-0.5">
            Book an Event
          </button>
          <button onClick={() => scrollTo('gallery')}
            className="px-9 py-3 border border-white/25 text-white font-display text-base tracking-wider rounded-full hover:border-[#00D4FF] hover:text-[#00D4FF] transition-all hover:-translate-y-0.5">
            View Gallery
          </button>
        </div>
      </div>

      {/* Bottom line */}
      <div className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg,transparent,rgba(0,212,255,.3),transparent)' }} />
    </section>
  )
}
