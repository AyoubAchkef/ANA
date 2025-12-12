'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const testimonials = [
  {
    quote: "ANA transformed how we find talent. The quality of freelancers is unmatched.",
    author: "Sarah Chen",
    role: "CEO, TechVision Inc",
    company: "Fortune 500"
  },
  {
    quote: "In 48 hours, we had the perfect developer. The platform is a game-changer.",
    author: "Marcus Rodriguez",
    role: "CTO, StartupX",
    company: "Series B Startup"
  },
  {
    quote: "The caliber of professionals on ANA is exceptional. Worth every penny.",
    author: "Emily Watson",
    role: "Product Director, InnovateCo",
    company: "Global Enterprise"
  },
]

export default function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null)

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
            Loved by Thousands
          </h2>
          <p className="text-xl text-gray-600">
            See what our clients say about working with ANA
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
                "
              </div>

              <p className="text-xl mb-12 leading-relaxed">
                {testimonial.quote}
              </p>

              <div>
                <div className="font-bold text-lg mb-1">{testimonial.author}</div>
                <div className="text-sm opacity-60 mb-1">{testimonial.role}</div>
                <div className="text-xs uppercase tracking-wider opacity-40">
                  {testimonial.company}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
