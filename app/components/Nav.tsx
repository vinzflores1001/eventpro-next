'use client'

import { Disc, Play, Calendar, Music } from 'lucide-react'

const navItems = [
  { label: 'Services',  id: 'services',  Icon: Disc     },
  { label: 'Gallery',   id: 'gallery',   Icon: Play     },
  { label: 'Packages',  id: 'packages',  Icon: Calendar },
  { label: 'Contact',   id: 'contact',   Icon: Music    },
]

export default function Nav() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 nav-pill rounded-full px-2 py-2 flex gap-1 animate-slide-down">
      {navItems.map(({ label, id, Icon }) => (
        <button
          key={id}
          onClick={() => scrollTo(id)}
          className="flex items-center gap-2 px-4 py-2 rounded-full font-mono-ep text-[.65rem] tracking-widest uppercase text-white/70 hover:text-white hover:bg-white/[.08] transition-all"
        >
          <Icon className="w-3 h-3" strokeWidth={2} />
          {label}
        </button>
      ))}
    </nav>
  )
}
