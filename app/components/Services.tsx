'use client'

import Image from 'next/image'
import { useScrollReveal } from './hooks/useScrollReveal'

const services = [
  { num: '01', title: 'EVENT MANAGEMENT', sub: 'Full-Service Planning',   tag: 'From Concept to Execution', img: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=600&q=80' },
  { num: '02', title: 'STAGE & SOUND',    sub: 'Professional Audio Systems', tag: 'Concert-Grade Equipment', img: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=600&q=80' },
  { num: '03', title: 'LIGHTING DESIGN',  sub: 'Atmospheric Illumination', tag: 'Custom Rig Setup',          img: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=600&q=80' },
  { num: '04', title: 'TENT & EQUIPMENT', sub: 'Premium Rentals',          tag: 'All Sizes Available',       img: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=600&q=80' },
]

export default function Services() {
  useScrollReveal()

  return (
    <section id="services" className="bg-void-black py-28 px-4 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-end justify-between gap-8 mb-16 flex-wrap">
          <div>
            <p className="label-text reveal mb-3">What We Do</p>
            <h2 className="font-display reveal reveal-delay-1 text-white leading-none"
              style={{ fontSize: 'clamp(3rem,7vw,6rem)' }}>
              OUR<br/>SERVICES
            </h2>
          </div>
          <p className="reveal reveal-delay-2 max-w-xs text-sm text-white/40 leading-relaxed">
            From intimate celebrations to grand productions — we handle every detail so you can focus on the moments.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {services.map((s, i) => (
            <div key={s.num}
              className={`service-card group relative overflow-hidden rounded-2xl cursor-pointer border border-white/[.06]
                hover:-translate-y-2 hover:shadow-[0_24px_60px_rgba(0,0,0,.5)] transition-all duration-400
                reveal reveal-delay-${i as 0|1|2|3}`}
              style={{ aspectRatio: '3/4' }}
            >
              <img src={s.img} alt={s.title}
                className="absolute inset-0 w-full h-full object-cover transition-all duration-700
                  group-hover:scale-[1.08] saturate-[.7] brightness-[.6] group-hover:saturate-90 group-hover:brightness-75"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050508]/95 via-[#050508]/30 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-7">
                <p className="font-mono-ep text-[.62rem] tracking-[.2em] text-[#00D4FF]/60 mb-2">{s.num}</p>
                <h3 className="font-display text-2xl leading-tight mb-1">{s.title}</h3>
                <p className="font-mono-ep text-[.65rem] tracking-[.15em] text-[#9DC4FF]/55">{s.sub}</p>
                <span className="service-card-tag inline-block mt-3 px-3 py-1 rounded-full font-mono-ep text-[.6rem] tracking-wider text-[#00D4FF]"
                  style={{ background: 'rgba(0,212,255,.1)', border: '1px solid rgba(0,212,255,.2)' }}>
                  {s.tag}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
