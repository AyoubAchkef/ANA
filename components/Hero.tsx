'use client'

import { useEffect, useMemo, useRef } from 'react'
import { gsap } from 'gsap'
import dynamic from 'next/dynamic'
import Shuffle from './Shuffle'
import PearlButton from './PearlButton'
import TextType from './TextType'
import { useLanguage } from '@/context/LanguageContext'

const Silk = dynamic(() => import('./Silk'), { ssr: false })

export default function Hero() {
  const subtitleRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const { t, language } = useLanguage()

  // Memoize subtitle texts to prevent unnecessary re-renders
  const subtitleTexts = useMemo(() => [
    t('hero.subtitle1'),
    t('hero.subtitle2'),
    t('hero.subtitle3'),
    t('hero.subtitle4'),
  ], [t])

  // Initial entrance animations - scoped to this instance
  useEffect(() => {
    const subtitle = subtitleRef.current
    const cta = ctaRef.current

    if (!subtitle || !cta) return

    // Set initial visible state
    gsap.set([subtitle, cta], { opacity: 1, y: 0 })

    const tl = gsap.timeline({ delay: 1.5 })

    tl.from(subtitle, {
      opacity: 0,
      y: 20,
      duration: 0.8,
      ease: 'power3.out',
    }).from(
      cta,
      {
        opacity: 0,
        y: 30,
        duration: 0.6,
        ease: 'power2.out',
      },
      '-=0.3'
    )

    return () => {
      tl.kill()
    }
  }, [language])

  return (
    <section
      className="relative min-h-screen flex items-center justify-center px-8 overflow-hidden"
    >
      {/* Silk Background */}
      <div className="absolute inset-0">
        <Silk
          speed={1}
          scale={1}
          color="#555555"
          noiseIntensity={3.5}
          rotation={0}
        />
      </div>

      {/* Gradient overlay for better text contrast */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70 z-[1] pointer-events-none" />

      {/* Grain texture for extra depth */}
      <div className="absolute inset-0 opacity-20 z-[2] mix-blend-overlay pointer-events-none" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
      }} />

      {/* Content */}
      <div className="relative z-10 w-full mx-auto text-center">
        <div className="mb-8 flex flex-col items-center w-full">
          <Shuffle
            key={`title1-${language}`}
            text={t('hero.title1')}
            tag="h1"
            className="font-display text-5xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[10rem] 2xl:text-[12rem] font-black leading-[0.9] tracking-tighter w-full"
            shuffleDirection="right"
            duration={0.35}
            animationMode="evenodd"
            shuffleTimes={1}
            ease="power3.out"
            stagger={0.03}
            threshold={0.1}
            triggerOnce={false}
            triggerOnHover={false}
            respectReducedMotion={true}
            loop={true}
            loopDelay={5}
          />
          <Shuffle
            key={`title2-${language}`}
            text={t('hero.title2')}
            tag="h1"
            className="font-display text-5xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[10rem] 2xl:text-[12rem] font-black leading-[0.9] tracking-tighter w-full"
            shuffleDirection="right"
            duration={0.35}
            animationMode="evenodd"
            shuffleTimes={1}
            ease="power3.out"
            stagger={0.03}
            threshold={0.1}
            triggerOnce={false}
            triggerOnHover={false}
            respectReducedMotion={true}
            loop={true}
            loopDelay={5}
          />
          <Shuffle
            key={`title3-${language}`}
            text={t('hero.title3')}
            tag="h1"
            className="font-display text-5xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[10rem] 2xl:text-[12rem] font-black leading-[0.9] tracking-tighter w-full"
            shuffleDirection="right"
            duration={0.35}
            animationMode="evenodd"
            shuffleTimes={1}
            ease="power3.out"
            stagger={0.03}
            threshold={0.1}
            triggerOnce={false}
            triggerOnHover={false}
            respectReducedMotion={true}
            loop={true}
            loopDelay={5}
          />
          <Shuffle
            key={`title4-${language}`}
            text={t('hero.title4')}
            tag="h1"
            className="font-display text-5xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[10rem] 2xl:text-[12rem] font-black leading-[0.9] tracking-tighter w-full"
            shuffleDirection="right"
            duration={0.35}
            animationMode="evenodd"
            shuffleTimes={1}
            ease="power3.out"
            stagger={0.03}
            threshold={0.1}
            triggerOnce={false}
            triggerOnHover={false}
            respectReducedMotion={true}
            loop={true}
            loopDelay={5}
          />
        </div>

        <div ref={subtitleRef} className="hero-subtitle h-16 md:h-20 flex items-center justify-center max-w-3xl mx-auto mb-12">
          <TextType
            key={`subtitle-${language}`}
            text={subtitleTexts}
            as="p"
            className="text-xl md:text-2xl text-gray-300 leading-relaxed"
            typingSpeed={60}
            deletingSpeed={25}
            pauseDuration={2500}
            initialDelay={1800}
            showCursor={true}
            cursorCharacter="|"
            cursorClassName="text-white/60"
            loop={true}
          />
        </div>

        <div ref={ctaRef} className="hero-cta flex gap-6 justify-center items-center">
          <PearlButton>
            {t('hero.findPlayers')}
          </PearlButton>

          <PearlButton>
            {t('hero.bookCourt')}
          </PearlButton>
        </div>
      </div>
    </section>
  )
}
