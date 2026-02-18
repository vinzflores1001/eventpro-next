import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'EventPro — Premium Event Management | Davao City',
  description:
    'Transform your vision into unforgettable experiences. EventPro provides comprehensive event management, stage & sound systems, lighting, tent & equipment rental, and logistics coordination in Davao City, Philippines.',
  keywords: 'event management, wedding, corporate events, Davao City, Philippines, concert, party',
  openGraph: {
    title: 'EventPro — Premium Event Management',
    description: 'Transforming your vision into extraordinary events since 2017.',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
