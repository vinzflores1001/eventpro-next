'use client'

import { useEffect } from 'react'
import { X } from 'lucide-react'

export type ToastData = {
  id: number
  msg: string
  type: 'success' | 'error' | 'info'
}

interface ToastProps {
  toasts:    ToastData[]
  onDismiss: (id: number) => void
}

const config = {
  success: { bg: 'rgba(5,25,15,.92)',  border: 'rgba(16,185,129,.25)', color: 'rgba(110,231,183,.9)', icon: '✓' },
  error:   { bg: 'rgba(25,5,5,.92)',   border: 'rgba(239,68,68,.25)',  color: 'rgba(252,165,165,.9)', icon: '✗' },
  info:    { bg: 'rgba(5,10,25,.92)',  border: 'rgba(0,212,255,.15)',  color: 'rgba(157,196,255,.9)', icon: 'ℹ' },
}

export default function Toasts({ toasts, onDismiss }: ToastProps) {
  return (
    <div className="fixed bottom-6 right-6 z-[9999] flex flex-col gap-3 pointer-events-none">
      {toasts.map(t => {
        const c = config[t.type]
        return (
          <div key={t.id}
            className="pointer-events-auto flex items-center gap-3 px-5 py-4 rounded-2xl text-sm animate-toast-in min-w-[280px] max-w-[380px]"
            style={{ background: c.bg, border: `1px solid ${c.border}`, color: c.color, boxShadow: '0 8px 32px rgba(0,0,0,.5)', backdropFilter: 'blur(16px)' }}>
            <span className="text-base flex-shrink-0">{c.icon}</span>
            <span className="flex-1">{t.msg}</span>
            <button onClick={() => onDismiss(t.id)} className="opacity-50 hover:opacity-100 transition-opacity ml-1">
              <X className="w-3.5 h-3.5"/>
            </button>
          </div>
        )
      })}
    </div>
  )
}
