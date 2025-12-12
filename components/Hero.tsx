'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SplitType from 'split-type'
import dynamic from 'next/dynamic'
import Shuffle from './Shuffle'
import PearlButton from './PearlButton'

const Silk = dynamic(() => import('./Silk'), { ssr: false })

gsap.registerPlugin(ScrollTrigger)

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    const hero = heroRef.current
    const subtitle = subtitleRef.current
    if (!hero || !subtitle) return

    // Split text animation for subtitle
    const splitSubtitle = new SplitType(subtitle, { types: 'words' })

    // Initial animation
    const tl = gsap.timeline({ delay: 1.5 })

    tl.from(
        splitSubtitle.words,
        {
          opacity: 0,
          y: 50,
          stagger: 0.03,
          duration: 0.8,
          ease: 'power3.out',
        }
      )
      .from(
        '.hero-cta',
        {
          opacity: 0,
          y: 30,
          duration: 0.6,
          ease: 'power2.out',
        },
        '-=0.3'
      )

    // Parallax scroll effect
    gsap.to(hero, {
      scrollTrigger: {
        trigger: hero,
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
      },
      y: 300,
      opacity: 0.3,
      scale: 0.9,
    })

    // Cleanup
    return () => {
      splitSubtitle.revert()
      tl.kill()
    }
  }, [])

  return (
    <section
      ref={heroRef}
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
            text="WHERE"
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
            text="TALENT"
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
            text="MEETS"
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
            text="VISION"
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

        <p
          ref={subtitleRef}
          className="text-xl md:text-2xl max-w-3xl mx-auto mb-12 text-gray-300 leading-relaxed"
        >
          ANA connects forward-thinking companies with exceptional freelancers.
          Transform your projects with elite talent.
        </p>

        <div className="hero-cta flex gap-6 justify-center items-center">
          <PearlButton>
            Find Talent
          </PearlButton>

          <PearlButton>
            Join as Freelancer
          </PearlButton>
        </div>
      </div>
    </section>
  )
}
