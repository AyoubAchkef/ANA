'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function CTA() {
  const sectionRef = useRef<HTMLElement>(null)
  const textRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const text = textRef.current
    if (!section || !text) return

    // Clip path reveal animation
    gsap.from(section, {
      scrollTrigger: {
        trigger: section,
        start: 'top bottom',
        end: 'top top',
        scrub: 1,
      },
      clipPath: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)',
      ease: 'none',
    })

    // Text scale animation
    gsap.from(text, {
      scrollTrigger: {
        trigger: section,
        start: 'top 80%',
      },
      scale: 0.8,
      opacity: 0,
      duration: 1.2,
      ease: 'power3.out',
    })

    // Magnetic button effect
    const button = section.querySelector('.cta-button')
    if (button) {
      const handleMouseMove = (e: MouseEvent) => {
        const rect = button.getBoundingClientRect()
        const x = e.clientX - rect.left - rect.width / 2
        const y = e.clientY - rect.top - rect.height / 2

        gsap.to(button, {
          x: x * 0.3,
          y: y * 0.3,
          duration: 0.3,
          ease: 'power2.out',
        })
      }

      const handleMouseLeave = () => {
        gsap.to(button, {
          x: 0,
          y: 0,
          duration: 0.5,
          ease: 'elastic.out(1, 0.5)',
        })
      }

      section.addEventListener('mousemove', handleMouseMove)
      button.addEventListener('mouseleave', handleMouseLeave)

      return () => {
        section.removeEventListener('mousemove', handleMouseMove)
        button.removeEventListener('mouseleave', handleMouseLeave)
      }
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative py-60 px-8 bg-white text-black overflow-hidden"
    >
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-gray-100" />

      <div className="relative z-10 max-w-5xl mx-auto text-center">
        <h2
          ref={textRef}
          className="font-display text-6xl md:text-9xl font-black mb-12 leading-none"
        >
          Ready to Start
          <br />
          Your Journey?
        </h2>

        <p className="text-2xl mb-16 text-gray-600 max-w-2xl mx-auto">
          Join thousands of companies and freelancers already transforming
          the way they work.
        </p>

        <button
          className="cta-button inline-flex items-center gap-4 px-16 py-8 bg-black text-white text-lg font-bold uppercase tracking-wider hover:gap-6 transition-all duration-300"
          data-cursor-hover
        >
          Get Started Now
          <span className="text-2xl">→</span>
        </button>

        {/* Trust indicators */}
        <div className="mt-20 flex justify-center gap-12 text-sm uppercase tracking-widest text-gray-400">
          <div>No Credit Card Required</div>
          <div className="w-px bg-gray-300" />
          <div>Free 14-Day Trial</div>
          <div className="w-px bg-gray-300" />
          <div>Cancel Anytime</div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-20 left-20 w-32 h-32 border-4 border-black rounded-full opacity-10" />
      <div className="absolute bottom-20 right-20 w-48 h-48 border-4 border-black opacity-10" />
    </section>
  )
}
