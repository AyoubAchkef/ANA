'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SplitType from 'split-type'
import dynamic from 'next/dynamic'
import Shuffle from './Shuffle'
import PearlButton from './PearlButton'
import StatsContent from './StatsContent'

const Silk = dynamic(() => import('./Silk'), { ssr: false })

gsap.registerPlugin(ScrollTrigger)

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const circleRevealRef = useRef<HTMLDivElement>(null)
  const [titleChars, setTitleChars] = useState<HTMLElement[]>([])
  const charsCollectedRef = useRef(new Set<HTMLElement>())

  // Calculate 3D rotations for each letter based on position relative to center
  const calculateRotations = (char: HTMLElement) => {
    const rect = char.getBoundingClientRect()
    const centerX = window.innerWidth / 2
    const centerY = window.innerHeight / 2
    const charCenterX = rect.left + rect.width / 2
    const charCenterY = rect.top + rect.height / 2

    const deltaX = charCenterX - centerX
    const deltaY = charCenterY - centerY
    const angle = Math.atan2(deltaY, deltaX)

    return {
      rotateX: -deltaY * 0.5,
      rotateY: deltaX * 0.5,
      rotateZ: angle * (180 / Math.PI),
    }
  }

  // Capture characters from Shuffle components (memoized to prevent re-renders)
  const handleCharsReady = useCallback((chars: HTMLElement[]) => {
    // Only add chars that haven't been collected yet
    const newChars = chars.filter(char => !charsCollectedRef.current.has(char))

    if (newChars.length > 0) {
      newChars.forEach(char => charsCollectedRef.current.add(char))
      setTitleChars((prev) => [...prev, ...newChars])
    }
  }, [])

  // Initial entrance animations
  useEffect(() => {
    const subtitle = subtitleRef.current
    if (!subtitle) return

    // Split text animation for subtitle
    const splitSubtitle = new SplitType(subtitle, { types: 'words' })

    // Initial animation
    const tl = gsap.timeline({ delay: 1.5 })

    tl.from(splitSubtitle.words, {
      opacity: 0,
      y: 50,
      stagger: 0.03,
      duration: 0.8,
      ease: 'power3.out',
    }).from(
      '.hero-cta',
      {
        opacity: 0,
        y: 30,
        duration: 0.6,
        ease: 'power2.out',
      },
      '-=0.3'
    )

    // Cleanup
    return () => {
      splitSubtitle.revert()
      tl.kill()
    }
  }, [])

  // GPU acceleration for letters
  useEffect(() => {
    if (titleChars.length === 0) return

    gsap.set(titleChars, {
      force3D: true,
      willChange: 'transform',
      transformOrigin: 'center center',
      transformPerspective: 1000,
    })
  }, [titleChars])

  // Master scroll-driven transition timeline
  useEffect(() => {
    const hero = heroRef.current
    const circleReveal = circleRevealRef.current
    const subtitle = subtitleRef.current

    if (!hero || !circleReveal || titleChars.length === 0) return

    const masterTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: hero,
        start: 'top top',
        end: '+=100vh',
        scrub: 1,
        pin: true,
        anticipatePin: 1,
      },
    })

    // Phase 1: Reduced parallax (0-40%)
    masterTimeline.to(
      hero,
      {
        y: 120,
        opacity: 0.7,
        scale: 0.95,
        duration: 0.4,
        ease: 'none',
      },
      0
    )

    // Phase 2: Letters roll out in 3D (40-80%)
    masterTimeline.to(
      titleChars,
      {
        rotateX: (i, target) => calculateRotations(target).rotateX,
        rotateY: (i, target) => calculateRotations(target).rotateY,
        rotateZ: (i, target) => calculateRotations(target).rotateZ,
        opacity: 0,
        scale: 1.5,
        z: -500,
        duration: 0.4,
        stagger: { each: 0.02, from: 'center' },
        ease: 'power2.inOut',
      },
      0.4
    )

    // Phase 2.5: Fade buttons and subtitle (40-70%)
    masterTimeline.to(
      ['.hero-cta', subtitle],
      {
        opacity: 0,
        y: -50,
        duration: 0.3,
        ease: 'power2.in',
      },
      0.4
    )

    // Phase 3: Circle reveal (60-100%)
    masterTimeline.to(
      circleReveal,
      {
        clipPath: 'circle(5% at 50% 50%)',
        duration: 0.1,
        ease: 'power2.out',
      },
      0.6
    )

    masterTimeline.to(
      circleReveal,
      {
        clipPath: 'circle(100% at 50% 50%)',
        duration: 0.3,
        ease: 'power1.in',
      },
      0.7
    )

    // Cleanup
    return () => {
      masterTimeline.kill()
      gsap.set(titleChars, { clearProps: 'all' })
      gsap.set(circleReveal, { clearProps: 'all' })
    }
  }, [titleChars])

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
        <div className="mb-8 flex flex-col items-center w-full perspective-1000 preserve-3d">
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
            onCharsReady={handleCharsReady}
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
            onCharsReady={handleCharsReady}
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
            onCharsReady={handleCharsReady}
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
            onCharsReady={handleCharsReady}
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

      {/* Circular reveal overlay */}
      <div
        ref={circleRevealRef}
        className="fixed inset-0 pointer-events-none z-50"
        style={{ clipPath: 'circle(0% at 50% 50%)' }}
      >
        <div className="w-full h-screen flex items-center justify-center">
          <StatsContent isPreview={true} />
        </div>
      </div>
    </section>
  )
}
