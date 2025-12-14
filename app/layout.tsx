import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import SmoothScroll from '@/components/SmoothScroll'
import Navigation from '@/components/Navigation'
import TranslatedMenu from '@/components/TranslatedMenu'
import { LanguageProvider } from '@/context/LanguageContext'

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'ANA - Find Your Padel Partner',
  description: 'Connect with padel players, form groups, find opponents, and book courts. The ultimate padel community platform.',
  keywords: ['padel', 'tennis', 'sports', 'players', 'booking', 'courts'],
  openGraph: {
    title: 'ANA - Find Your Padel Partner',
    description: 'Connect with padel players, form groups, find opponents, and book courts.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr" className={inter.variable}>
      <body className="font-sans">
        <LanguageProvider>
          <Navigation />
          <TranslatedMenu />
          <SmoothScroll>
            {children}
          </SmoothScroll>
        </LanguageProvider>
      </body>
    </html>
  )
}
