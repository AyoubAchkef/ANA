import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import SmoothScroll from '@/components/SmoothScroll'
import Navigation from '@/components/Navigation'
import StaggeredMenu from '@/components/StaggeredMenu'

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'ANA - Connect with Top Freelancers',
  description: 'The ultimate platform connecting businesses with elite freelancers. Transform your projects with exceptional talent.',
  keywords: ['freelance', 'platform', 'business', 'talent', 'remote work'],
  openGraph: {
    title: 'ANA - Connect with Top Freelancers',
    description: 'The ultimate platform connecting businesses with elite freelancers.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans">
        <Navigation />
        <StaggeredMenu
          position="right"
          items={[
            { label: 'Home', ariaLabel: 'Go to home page', link: '#' },
            { label: 'About', ariaLabel: 'Learn about ANA', link: '#about' },
            { label: 'Services', ariaLabel: 'View our services', link: '#services' },
            { label: 'Talent', ariaLabel: 'Browse talent', link: '#talent' },
            { label: 'Contact', ariaLabel: 'Get in touch', link: '#contact' }
          ]}
          socialItems={[
            { label: 'LinkedIn', link: 'https://linkedin.com' },
            { label: 'Twitter', link: 'https://twitter.com' },
            { label: 'Instagram', link: 'https://instagram.com' },
            { label: 'Email', link: 'mailto:contact@ana.com' }
          ]}
          displaySocials={true}
          displayItemNumbering={true}
          menuButtonColor="#fff"
          openMenuButtonColor="#000"
          changeMenuColorOnOpen={true}
          colors={['#1a1a1a', '#2a2a2a']}
          logoUrl="/logo_ANA.svg"
          accentColor="#fff"
          isFixed={true}
        />
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  )
}
