import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Media Agua Colectivos',
  description: 'Horarios de colectivos',
  keywords: ['Media Agua', 'Colectivos', 'Horarios', 'Transporte', 'San Juan', 'Argentina'],
  openGraph: {
    title: 'Media Agua Colectivos',
    description: 'Horarios de colectivos',
    type: 'website',
    locale: 'es-AR',
    siteName: 'Media Agua Colectivos',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  )
}
