'use client'

import { Ticket, Eye } from 'lucide-react'
import { useScrollReveal } from './hooks/useScrollReveal'

export type Package = {
  id: number
  name: string
  price: string
  status: 'available' | 'soon' | 'booked'
  desc: string
  img: string
  inclusions: string[]
}

export const packages: Package[] = [
  {
    id: 1, name: 'Wedding', price: '₱150,000', status: 'available',
    desc: 'Complete wedding package with venue styling, catering coordination, and full event management.',
    img: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=200&q=70',
    inclusions: ['Full venue styling & floral arrangements','Catering coordination up to 300 guests','Professional emcee & entertainment','Photography & videography team','Sound system & lighting design','Bridal entourage coordination','Day-of event manager','Post-event coordination'],
  },
  {
    id: 2, name: 'Corporate', price: '₱80,000', status: 'available',
    desc: 'Professional corporate events with AV systems, stage setup, and branded materials.',
    img: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=200&q=70',
    inclusions: ['Stage & podium setup','Professional AV & sound system','LED wall or projector screen','Branded backdrops & signage','Live streaming capability','Registration desk setup','Catering coordination','Technical support team'],
  },
  {
    id: 3, name: 'Private Party', price: '₱50,000', status: 'available',
    desc: 'Intimate celebrations with custom decorations, entertainment, and catering services.',
    img: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=200&q=70',
    inclusions: ['Custom theme decorations','Photo booth setup','DJ & entertainment','Catering service (buffet or plated)','Cake & dessert table','Balloon arrangements','Emcee for program','Cleanup crew'],
  },
  {
    id: 4, name: 'Concert', price: '₱200,000', status: 'soon',
    desc: 'Large-scale entertainment with professional sound, lighting, and stage production.',
    img: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=200&q=70',
    inclusions: ['Professional line array sound system','Concert-grade lighting rig','Main & secondary stages','Artist green room setup','Crowd barrier & security coordination','Ticketing support','Merchandise area setup','Full production crew'],
  },
]

const statusConfig = {
  available: { label: '● Available',   cls: 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' },
  booked:    { label: '✕ Fully Booked', cls: 'bg-rose-500/10   text-rose-400   border border-rose-500/20'    },
  soon:      { label: '◌ Coming Soon',  cls: 'bg-amber-500/10  text-amber-400  border border-amber-500/20'   },
}

interface PackagesProps {
  onBook:   (id: number) => void
  onDetail: (id: number) => void
  onQuote:  () => void
}

export default function Packages({ onBook, onDetail, onQuote }: PackagesProps) {
  useScrollReveal()

  return (
    <section id="packages" className="relative py-28 px-4 overflow-hidden" style={{ background: '#9DC4FF' }}>
      {/* Spinning vinyl */}
      <div className="absolute top-12 right-12 w-48 h-48 rounded-full overflow-hidden opacity-70 animate-spin-slow"
        style={{ border: '8px solid rgba(31,31,31,.15)' }}>
        <img src="https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400&q=80" alt="" className="w-full h-full object-cover"/>
      </div>

      <div className="max-w-5xl mx-auto">
        <div className="mb-14">
          <span className="font-mono-ep text-[.65rem] tracking-[.25em] uppercase text-[#1F1F1F]/45 block mb-3">Event Packages</span>
          <h2 className="font-display text-[#1F1F1F] leading-none reveal" style={{ fontSize: 'clamp(3rem,7vw,5.5rem)' }}>
            CHOOSE YOUR<br/>EXPERIENCE
          </h2>
        </div>

        <div className="flex flex-col gap-4">
          {packages.map((pkg, i) => {
            const s = statusConfig[pkg.status]
            return (
              <div key={pkg.id}
                className={`pkg-card relative grid items-center gap-6 rounded-2xl px-8 py-7 cursor-pointer
                  transition-all duration-300 overflow-hidden
                  hover:bg-white/80 hover:translate-x-1
                  reveal reveal-delay-${i as 0|1|2|3}`}
                style={{ background: 'rgba(255,255,255,.5)', border: '1px solid rgba(31,31,31,.1)', backdropFilter: 'blur(8px)',
                  gridTemplateColumns: '1fr auto auto auto' }}
              >
                {/* Main info */}
                <div className="flex items-center gap-6">
                  <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
                    <img src={pkg.img} alt={pkg.name} className="w-full h-full object-cover"/>
                  </div>
                  <div>
                    <h3 className="font-display text-[1.75rem] text-[#1F1F1F] leading-none">{pkg.name}</h3>
                    <p className="text-[.8rem] text-[#1F1F1F]/55 mt-1 max-w-xs">{pkg.desc}</p>
                  </div>
                </div>

                {/* Price */}
                <div className="text-right">
                  <p className="font-mono-ep text-[.6rem] tracking-[.15em] text-[#1F1F1F]/45 mb-1">Starting at</p>
                  <p className="font-display text-[1.25rem] text-[#1F1F1F]">{pkg.price}</p>
                </div>

                {/* Status */}
                <span className={`px-3 py-1 rounded-full font-mono-ep text-[.6rem] tracking-[.12em] whitespace-nowrap ${s.cls}`}>
                  {s.label}
                </span>

                {/* Buttons */}
                <div className="flex gap-2 flex-shrink-0">
                  <button onClick={() => onDetail(pkg.id)}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-full font-mono-ep text-[.62rem] tracking-wider text-[#1F1F1F]/60 transition-all hover:text-[#1F1F1F]"
                    style={{ border: '1px solid rgba(31,31,31,.2)' }}>
                    <Eye className="w-3 h-3"/> Details
                  </button>
                  {pkg.status === 'available' && (
                    <button onClick={() => onBook(pkg.id)}
                      className="flex items-center gap-1.5 px-5 py-2 rounded-full font-mono-ep text-[.62rem] tracking-wider bg-[#1F1F1F] text-white hover:bg-[#1F1F1F]/80 hover:-translate-y-px transition-all">
                      <Ticket className="w-3 h-3"/> Book Now
                    </button>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        {/* CTA */}
        <div className="mt-14 text-center reveal">
          <p className="font-mono-ep text-[.68rem] tracking-[.1em] text-[#1F1F1F]/50 mb-5">
            All packages include professional event coordination and premium equipment
          </p>
          <button onClick={onQuote}
            className="inline-flex items-center gap-3 px-10 py-4 bg-[#1F1F1F] text-white font-display text-lg tracking-wider rounded-full hover:bg-[#1F1F1F]/80 hover:-translate-y-0.5 transition-all">
            Request Custom Quote
          </button>
        </div>
      </div>
    </section>
  )
}
