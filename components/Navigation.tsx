'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Image from 'next/image'
import AnimatedButton from './AnimatedButton'
import { useLanguage } from '@/context/LanguageContext'

gsap.registerPlugin(ScrollTrigger)

export default function Navigation() {
  const navRef = useRef<HTMLElement>(null)
  const { language, toggleLanguage, t } = useLanguage()

  useEffect(() => {
    const nav = navRef.current
    if (!nav) return

    // Initial animation
    gsap.from(nav, {
      y: -100,
      opacity: 0,
      duration: 1,
      delay: 0.5,
      ease: 'power3.out',
    })

    // Hide/show on scroll
    ScrollTrigger.create({
      start: 'top top',
      end: 'max',
      onUpdate: (self) => {
        if (self.direction === -1) {
          gsap.to(nav, { y: 0, duration: 0.3 })
        } else if (self.direction === 1 && self.progress > 0.1) {
          gsap.to(nav, { y: -100, duration: 0.3 })
        }
      },
    })
  }, [])

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-50 px-8 py-6 mix-blend-difference"
    >
      <div className="max-w-screen-2xl mx-auto flex items-center justify-between">
        {/* Left side: Logo + Language Toggle */}
        <div className="flex items-center gap-6">
          <Image
            src="/logo_ANA.svg"
            alt="ANA Logo"
            width={90}
            height={90}
            className="invert"
          />

          {/* Language Toggle - Elegant text style */}
          <div className="flex items-center text-sm font-medium tracking-wider">
            <button
              onClick={language === 'en' ? toggleLanguage : undefined}
              className={`transition-all duration-300 ${
                language === 'fr'
                  ? 'text-white'
                  : 'text-white/40 hover:text-white/70'
              }`}
              aria-label="Français"
            >
              FR
            </button>
            <span className="mx-2 text-white/30">|</span>
            <button
              onClick={language === 'fr' ? toggleLanguage : undefined}
              className={`transition-all duration-300 ${
                language === 'en'
                  ? 'text-white'
                  : 'text-white/40 hover:text-white/70'
              }`}
              aria-label="English"
            >
              EN
            </button>
          </div>
        </div>

        {/* Right side: CTA only */}
        <AnimatedButton>
          {t('nav.playNow')}
        </AnimatedButton>
      </div>
    </nav>
  )
}
