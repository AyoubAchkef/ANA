'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Image from 'next/image'
import AnimatedButton from './AnimatedButton'

gsap.registerPlugin(ScrollTrigger)

export default function Navigation() {
  const navRef = useRef<HTMLElement>(null)

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
        <div className="flex items-center gap-2">
          <Image
            src="/logo_ANA.svg"
            alt="ANA Logo"
            width={60}
            height={60}
            className="invert"
          />
        </div>

        <AnimatedButton>
          Get Started
        </AnimatedButton>
      </div>
    </nav>
  )
}
