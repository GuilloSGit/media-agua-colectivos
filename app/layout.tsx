import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Media Agua Colectivos',
  description: 'Horarios de colectivos y rutas actualizadas',
  keywords: ['Media Agua', 'Colectivos', 'Horarios', 'Transporte', 'San Juan', 'Argentina'],
  openGraph: {
    title: 'Media Agua Colectivos',
    description: 'Horarios de colectivos y rutas actualizadas',
    type: 'website',
    locale: 'es-AR',
    siteName: 'Media Agua Colectivos',
    countryName: 'Argentina',
    emails: ['admin@ga-software.dev'],
    images: [
      {
        url: '/logo.png',
        alt: 'Media Agua Colectivos',
      },
    ],
    phoneNumbers: ['+54 9 387 629-5801'],
    ttl: 4800    
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/logo.png" />
      </head>
      <body>{children}</body>
    </html>
  )
}
