'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import Image from 'next/image'
import { useLanguage } from '@/context/LanguageContext'

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null)
  const { t } = useLanguage()

  useEffect(() => {
    const footer = footerRef.current
    if (!footer) return

    // Reveal animation
    gsap.from(footer, {
      scrollTrigger: {
        trigger: footer,
        start: 'top bottom',
      },
      y: 100,
      opacity: 0,
      duration: 1,
      ease: 'power3.out',
    })
  }, [])

  return (
    <footer ref={footerRef} className="relative px-8 py-20 border-t border-white/10">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-12 mb-20">
          {/* Brand */}
          <div className="md:col-span-2">
            <Image
              src="/logo_ANA.svg"
              alt="ANA"
              width={80}
              height={80}
              className="invert mb-6"
            />
            <p className="text-gray-400 max-w-md">
              {t('footer.description')}
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-bold text-sm uppercase tracking-wider mb-6">{t('footer.platform')}</h3>
            <ul className="space-y-3">
              {[
                { key: 'footer.findPlayers', href: '#players' },
                { key: 'footer.bookCourts', href: '#courts' },
                { key: 'footer.joinMatch', href: '#matches' },
                { key: 'footer.rankings', href: '#rankings' },
              ].map((link) => (
                <li key={link.key}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors"
                    data-cursor-hover
                  >
                    {t(link.key)}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-sm uppercase tracking-wider mb-6">{t('footer.company')}</h3>
            <ul className="space-y-3">
              {[
                { key: 'footer.about', href: '#about' },
                { key: 'footer.blog', href: '#blog' },
                { key: 'footer.careers', href: '#careers' },
                { key: 'footer.contact', href: '#contact' },
              ].map((link) => (
                <li key={link.key}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors"
                    data-cursor-hover
                  >
                    {t(link.key)}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-sm text-gray-400">
            © 2024 ANA. {t('footer.rights')}
          </p>

          <div className="flex gap-6">
            {[
              { key: 'footer.privacy', href: '#privacy' },
              { key: 'footer.terms', href: '#terms' },
              { key: 'footer.cookies', href: '#cookies' },
            ].map((link) => (
              <a
                key={link.key}
                href={link.href}
                className="text-sm text-gray-400 hover:text-white transition-colors"
                data-cursor-hover
              >
                {t(link.key)}
              </a>
            ))}
          </div>

          <div className="flex gap-6">
            {['Twitter', 'LinkedIn', 'Instagram'].map((social) => (
              <a
                key={social}
                href="#"
                className="text-sm text-gray-400 hover:text-white transition-colors"
                data-cursor-hover
              >
                {social}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
