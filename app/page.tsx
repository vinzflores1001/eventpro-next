'use client'

import { useState, useCallback } from 'react'
import Nav      from './components/Nav'
import Hero     from './components/Hero'
import Services from './components/Services'
import Gallery  from './components/Gallery'
import Packages from './components/Packages'
import Footer   from './components/Footer'
import Modals   from './components/Modals'
import Toasts, { type ToastData } from './components/Toasts'

type ModalState = { type: 'booking' | 'detail' | 'quote' | null; pkgId?: number }

export default function Home() {
  const [modal,  setModal]  = useState<ModalState>({ type: null })
  const [toasts, setToasts] = useState<ToastData[]>([])
  let toastId = 0

  const showToast = useCallback((msg: string, type: ToastData['type'] = 'success') => {
    const id = ++toastId
    setToasts(prev => [...prev, { id, msg, type }])
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 5000)
  }, [])

  const dismissToast = (id: number) => setToasts(prev => prev.filter(t => t.id !== id))

  const openBooking = (pkgId?: number) => setModal({ type: 'booking', pkgId })
  const openDetail  = (pkgId: number)  => setModal({ type: 'detail',  pkgId })
  const openQuote   = ()               => setModal({ type: 'quote' })
  const closeModal  = ()               => setModal({ type: null })

  return (
    <main className="relative w-full min-h-screen bg-void-black overflow-x-hidden">
      <Nav />
      <Hero />
      <Services />
      <Gallery />
      <Packages
        onBook={openBooking}
        onDetail={openDetail}
        onQuote={openQuote}
      />
      <Footer
        onBook={() => openBooking()}
        onQuote={openQuote}
        onToast={showToast}
      />
      <Modals
        modal={modal}
        onClose={closeModal}
        onToast={showToast}
        onBook={openBooking}
      />
      <Toasts toasts={toasts} onDismiss={dismissToast} />
    </main>
  )
}
