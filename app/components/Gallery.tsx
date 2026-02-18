'use client'

import { useEffect, useRef } from 'react'
import { useScrollReveal } from './hooks/useScrollReveal'

const stripImages = [
  { src: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=700&q=75', alt: 'Wedding' },
  { src: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=700&q=75', alt: 'Corporate' },
  { src: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=700&q=75', alt: 'Birthday' },
  { src: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=700&q=75', alt: 'Concert' },
  { src: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=700&q=75', alt: 'Gala' },
  { src: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=700&q=75', alt: 'Festival' },
]

const gridImages = [
  { src: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800&q=80', title: 'Elegant Garden Wedding', date: '2024.12.15', span: 2 },
  { src: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=80', title: 'Tech Summit', date: '2024.11.28', span: 1 },
  { src: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=600&q=80', title: 'Milestone Birthday', date: '2024.11.10', span: 1 },
  { src: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&q=80', title: 'Summer Music Fest', date: '2024.10.20', span: 1 },
  { src: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&q=80', title: 'Charity Gala Night', date: '2024.09.15', span: 2 },
  { src: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=600&q=80', title: 'Community Festival', date: '2024.08.25', span: 1 },
]

export default function Gallery() {
  useScrollReveal()
  const topRef    = useRef<HTMLDivElement>(null)
  const botRef    = useRef<HTMLDivElement>(null)
  const stripsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const update = () => {
      if (!stripsRef.current || !topRef.current || !botRef.current) return
      const rect     = stripsRef.current.getBoundingClientRect()
      const winH     = window.innerHeight
      if (rect.bottom < 0 || rect.top > winH) return
      const progress = (winH - rect.top) / (winH + rect.height)
      const offset   = progress * 180
      topRef.current.style.transform = `translateX(${-offset}px)`
      botRef.current.style.transform = `translateX(${offset - 80}px)`
    }
    window.addEventListener('scroll', update, { passive: true })
    update()
    return () => window.removeEventListener('scroll', update)
  }, [])

  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section id="gallery" className="bg-void-black overflow-hidden">
      {/* Intro */}
      <div className="px-4 pt-20 pb-8 max-w-6xl mx-auto">
        <p className="label-text reveal mb-3">Our Portfolio</p>
        <h2 className="font-display reveal reveal-delay-1 text-white leading-none"
          style={{ fontSize: 'clamp(3rem,7vw,5.5rem)' }}>
          MEMORABLE<br/>MOMENTS
        </h2>
      </div>

      {/* Parallax strips */}
      <div ref={stripsRef} className="py-8 overflow-hidden">
        <div ref={topRef} className="flex gap-4 mb-4 will-change-transform">
          {[...stripImages, ...stripImages].map((img, i) => (
            <div key={i} className="flex-shrink-0 w-[360px] h-[220px] rounded-xl overflow-hidden">
              <img src={img.src} alt={img.alt} className="w-full h-full object-cover saturate-[.7] brightness-[.65] hover:brightness-[.85] transition-all duration-300"/>
            </div>
          ))}
        </div>
        <div ref={botRef} className="flex gap-4 will-change-transform" style={{ marginLeft: '-120px' }}>
          {[...stripImages.slice().reverse(), ...stripImages.slice().reverse()].map((img, i) => (
            <div key={i} className="flex-shrink-0 w-[360px] h-[220px] rounded-xl overflow-hidden">
              <img src={img.src} alt={img.alt} className="w-full h-full object-cover saturate-[.7] brightness-[.65] hover:brightness-[.85] transition-all duration-300"/>
            </div>
          ))}
        </div>
      </div>

      {/* Marquee */}
      <div className="py-6 overflow-hidden border-y border-white/[.05]" style={{ background: 'rgba(255,255,255,.02)' }}>
        <div className="flex whitespace-nowrap animate-marquee">
          {Array(4).fill(null).map((_, i) => (
            <span key={i} className="flex items-center gap-8 px-8 font-display text-2xl text-white/[.12]">
              WEDDINGS
              <span className="w-1.5 h-1.5 rounded-full bg-[#00D4FF]/30 flex-shrink-0"/>
              CORPORATE
              <span className="w-1.5 h-1.5 rounded-full bg-[#00D4FF]/30 flex-shrink-0"/>
              CONCERTS
              <span className="w-1.5 h-1.5 rounded-full bg-[#00D4FF]/30 flex-shrink-0"/>
              BIRTHDAYS
              <span className="w-1.5 h-1.5 rounded-full bg-[#00D4FF]/30 flex-shrink-0"/>
              GALAS
              <span className="w-1.5 h-1.5 rounded-full bg-[#00D4FF]/30 flex-shrink-0"/>
              FESTIVALS
            </span>
          ))}
        </div>
      </div>

      {/* Gallery grid */}
      <div className="px-4 py-16 max-w-6xl mx-auto">
        <div className="flex items-end justify-between mb-10 flex-wrap gap-4 reveal">
          <div>
            <p className="label-text mb-2">Past Events</p>
            <h2 className="font-display text-white" style={{ fontSize: 'clamp(2rem,5vw,3.5rem)' }}>EVENT GALLERY</h2>
          </div>
          <button onClick={() => scrollTo('packages')}
            className="px-6 py-2 border border-white/25 text-white text-sm rounded-full hover:border-[#00D4FF] hover:text-[#00D4FF] transition-all font-display tracking-wider">
            Book Your Event →
          </button>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {gridImages.map((img, i) => (
            <div key={i}
              className={`gallery-item group relative overflow-hidden rounded-xl cursor-pointer
                hover:scale-[1.02] transition-transform duration-350
                ${img.span === 2 ? 'col-span-2' : 'col-span-1'}
                ${i === 0 || i === 4 ? 'aspect-video' : i === 3 ? 'aspect-video' : 'aspect-square'}`}
            >
              <img src={img.src} alt={img.title}
                className="w-full h-full object-cover saturate-[.75] brightness-[.7] group-hover:saturate-100 group-hover:brightness-[.85] group-hover:scale-105 transition-all duration-500"/>
              <div className="absolute inset-0 bg-gradient-to-t from-[#050508]/85 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"/>
              <div className="gallery-item-info absolute bottom-4 left-5">
                <p className="font-mono-ep text-[.6rem] tracking-[.15em] text-[#9DC4FF]/70 mb-1">{img.date}</p>
                <h3 className="font-display text-xl">{img.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
