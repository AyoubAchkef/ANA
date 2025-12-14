'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Image from 'next/image'
import Hero from './Hero'
import Stats from './Stats'

gsap.registerPlugin(ScrollTrigger)

export default function HeroStatsTransition() {
  const containerRef = useRef<HTMLDivElement>(null)
  const topHalfRef = useRef<HTMLDivElement>(null)
  const bottomHalfRef = useRef<HTMLDivElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)
  const parallaxBackRef = useRef<HTMLDivElement>(null)
  const parallaxFrontRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    const topHalf = topHalfRef.current
    const bottomHalf = bottomHalfRef.current
    const stats = statsRef.current
    const parallaxBack = parallaxBackRef.current
    const parallaxFront = parallaxFrontRef.current

    if (!container || !topHalf || !bottomHalf || !stats || !parallaxBack || !parallaxFront) return

    // Set initial states
    gsap.set(stats, { opacity: 0 })
    gsap.set(parallaxBack, { opacity: 0 })
    gsap.set(parallaxFront, { opacity: 0 })

    // Main timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: 'top top',
        end: '+=500%',
        scrub: 1.2,
        pin: true,
        anticipatePin: 1,
      }
    })

    // Phase 1: Split animation
    tl.to(topHalf, {
      yPercent: -50,
      ease: 'power2.inOut',
      duration: 0.18,
    }, 0)

    tl.to(bottomHalf, {
      yPercent: 50,
      ease: 'power2.inOut',
      duration: 0.18,
    }, 0)

    // Phase 2: Stats fade in
    tl.to(stats, {
      opacity: 1,
      duration: 0.08,
    }, 0.12)

    // Phase 3: Parallax layers appear
    tl.to(parallaxBack, {
      opacity: 1,
      duration: 0.07,
    }, 0.16)

    tl.to(parallaxFront, {
      opacity: 1,
      duration: 0.07,
    }, 0.18)

    // Phase 4: Parallax animations
    // Note: yPercent is relative to element's own height, so large elements need smaller values
    // All elements must exit the top of the screen before section ends
    const parallaxItems = [
      // Back layer (slower but must still exit)
      { selector: '.parallax-homme', yPercent: -220, rotation: 0 }, // Large element (900px), needs ~2000px travel
      { selector: '.parallax-balle-back', yPercent: -1200, rotation: 240 },
      { selector: '.parallax-raquette-back', yPercent: -650, rotation: -35 },

      // Front layer (faster, smaller elements need higher yPercent)
      { selector: '.parallax-balle', yPercent: -1800, rotation: 360 },
      { selector: '.parallax-balle-2', yPercent: -2200, rotation: -300 },
      { selector: '.parallax-gourde', yPercent: -900, rotation: -25 },
      { selector: '.parallax-gourde-2', yPercent: -1100, rotation: 18 },
      { selector: '.parallax-raquette', yPercent: -700, rotation: 45 },
      { selector: '.parallax-raquette2', yPercent: -800, rotation: -50 },
    ]

    parallaxItems.forEach(({ selector, yPercent, rotation }) => {
      const el = container.querySelector(selector)
      if (!el) return

      tl.to(el, {
        yPercent,
        rotation,
        ease: 'none',
        duration: 0.82,
      }, 0.18)
    })

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
      tl.kill()
    }
  }, [])

  return (
    <div ref={containerRef} className="relative h-screen bg-black overflow-hidden">
      {/* Stats Layer */}
      <div ref={statsRef} className="absolute inset-0 z-10">
        <Stats />
      </div>

      {/* Parallax Back Layer (behind Stats) */}
      <div ref={parallaxBackRef} className="absolute inset-0 z-[5] pointer-events-none">
        {/* Homme - center */}
        <Image
          src="/homme.png"
          alt="Padel player"
          width={600}
          height={900}
          className="parallax-homme absolute left-1/2 -translate-x-1/2 bottom-[-650px] drop-shadow-2xl opacity-90"
        />

        {/* Back balle - blurred, far left */}
        <Image
          src="/balle.png"
          alt=""
          width={200}
          height={200}
          className="parallax-balle-back absolute left-[5%] bottom-[-400px] blur-[4px] opacity-30"
        />

        {/* Back raquette - blurred, tilted left */}
        <Image
          src="/raquette.png"
          alt=""
          width={280}
          height={480}
          className="parallax-raquette-back absolute right-[8%] bottom-[-500px] blur-[3px] opacity-25"
          style={{ transform: 'rotate(-15deg)' }}
        />
      </div>

      {/* Parallax Front Layer (in front of Stats) */}
      <div ref={parallaxFrontRef} className="absolute inset-0 z-20 pointer-events-none">
        {/* Main balle - far left */}
        <Image
          src="/balle.png"
          alt="Padel ball"
          width={140}
          height={140}
          className="parallax-balle absolute left-[3%] bottom-[-180px] drop-shadow-2xl"
        />

        {/* Secondary balle - right side */}
        <Image
          src="/balle.png"
          alt=""
          width={80}
          height={80}
          className="parallax-balle-2 absolute right-[30%] bottom-[-100px] drop-shadow-xl opacity-85"
        />

        {/* Main Gourde - far right */}
        <Image
          src="/gourde.png"
          alt="Water bottle"
          width={160}
          height={320}
          className="parallax-gourde absolute right-[2%] bottom-[-250px] drop-shadow-2xl opacity-85"
        />

        {/* Second Gourde - left side */}
        <Image
          src="/gourde.png"
          alt="Water bottle"
          width={120}
          height={240}
          className="parallax-gourde-2 absolute left-[18%] bottom-[-200px] drop-shadow-2xl opacity-75"
          style={{ transform: 'rotate(8deg)' }}
        />

        {/* Main Raquette - left side, tilted right */}
        <Image
          src="/raquette.png"
          alt="Padel racket"
          width={300}
          height={520}
          className="parallax-raquette absolute left-[5%] bottom-[-380px] drop-shadow-2xl"
          style={{ transform: 'rotate(20deg)' }}
        />

        {/* Raquette 2 - right side, tilted opposite */}
        <Image
          src="/raquette_2.png"
          alt="Padel racket 2"
          width={260}
          height={450}
          className="parallax-raquette2 absolute right-[5%] bottom-[-280px] drop-shadow-2xl blur-[1px] opacity-75"
          style={{ transform: 'rotate(-25deg)' }}
        />
      </div>

      {/* Hero Split - Top Half */}
      <div
        ref={topHalfRef}
        className="absolute inset-0 z-30"
        style={{ clipPath: 'polygon(0 0, 100% 0, 100% 50%, 0 50%)' }}
      >
        <Hero />
      </div>

      {/* Hero Split - Bottom Half */}
      <div
        ref={bottomHalfRef}
        className="absolute inset-0 z-30"
        style={{ clipPath: 'polygon(0 50%, 100% 50%, 100% 100%, 0 100%)' }}
      >
        <Hero />
      </div>
    </div>
  )
}
