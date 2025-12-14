'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLanguage } from '@/context/LanguageContext'

gsap.registerPlugin(ScrollTrigger)

export default function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null)
  const { t } = useLanguage()

  const testimonials = [
    {
      quoteKey: 'testimonials.quote1',
      authorKey: 'testimonials.author1',
      roleKey: 'testimonials.role1',
      locationKey: 'testimonials.location1',
    },
    {
      quoteKey: 'testimonials.quote2',
      authorKey: 'testimonials.author2',
      roleKey: 'testimonials.role2',
      locationKey: 'testimonials.location2',
    },
    {
      quoteKey: 'testimonials.quote3',
      authorKey: 'testimonials.author3',
      roleKey: 'testimonials.role3',
      locationKey: 'testimonials.location3',
    },
  ]

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const cards = section.querySelectorAll('.testimonial-card')

    // Stagger animation
    gsap.from(cards, {
      scrollTrigger: {
        trigger: section,
        start: 'top 70%',
      },
      y: 100,
      opacity: 0,
      stagger: 0.2,
      duration: 1,
      ease: 'power3.out',
    })

    // Continuous rotation animation
    gsap.to('.testimonial-orbit', {
      rotation: 360,
      duration: 20,
      repeat: -1,
      ease: 'none',
    })
  }, [])

  return (
    <section ref={sectionRef} className="relative py-40 px-8 overflow-hidden bg-white text-black">
      {/* Decorative element */}
      <div className="testimonial-orbit absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-black/5 rounded-full" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="text-center mb-24">
          <h2 className="font-display text-6xl md:text-8xl font-black mb-6">
            {t('testimonials.title')}
          </h2>
          <p className="text-xl text-gray-600">
            {t('testimonials.subtitle')}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="testimonial-card group p-12 border-2 border-black hover:bg-black hover:text-white transition-all duration-500 cursor-pointer"
              data-cursor-hover
            >
              <div className="text-6xl mb-8 opacity-20 group-hover:opacity-40 transition-opacity">
                &ldquo;
              </div>

              <p className="text-xl mb-12 leading-relaxed">
                {t(testimonial.quoteKey)}
              </p>

              <div>
                <div className="font-bold text-lg mb-1">{t(testimonial.authorKey)}</div>
                <div className="text-sm opacity-60 mb-1">{t(testimonial.roleKey)}</div>
                <div className="text-xs uppercase tracking-wider opacity-40">
                  {t(testimonial.locationKey)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
