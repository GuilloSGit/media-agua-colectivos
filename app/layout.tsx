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
        {/* enlaces */}
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/logo.png" />
        <link rel="shortcut icon" href="/logo.png" />
        <link rel="apple-touch-icon" href="/logo.png" />
        <link rel="apple-touch-icon-precomposed" href="/logo.png" />
        <link rel="apple-touch-startup-image" href="/logo.png" />

        {/* metadatos */}
        <meta name="author" content="云贵正 (YunGuiZheng)" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="application-name" content="Media Agua Colectivos" />
        <meta name="description" content="Horarios de colectivos y rutas actualizadas" />
        <meta name="robots" content="index, follow" />
        <meta name="theme-color" content="#0a0a0a" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@MediaAguaColectivos" />
        <meta name="twitter:title" content="Media Agua Colectivos" />
        <meta name="twitter:description" content="Horarios de colectivos y rutas actualizadas" />
        <meta name="twitter:image" content="https://media-agua-colectivos.vercel.app/logo.png" />
        <meta name="twitter:creator" content="@MediaAguaColectivos" />
        <meta name="twitter:domain" content="media-agua-colectivos.vercel.app" />

        {/* tags y palabras clave */}
        <meta name="keywords" content="Media Agua, Colectivos, Horarios, Transporte, San Juan, Argentina" />
      </head>
      <body>{children}</body>
    </html>
  )
}
