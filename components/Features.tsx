'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const features = [
  {
    number: '01',
    title: 'Curated Talent',
    description: 'Every freelancer is vetted through our rigorous selection process. Only the top 3% make it through.',
    keywords: ['Expert', 'Verified', 'Elite'],
  },
  {
    number: '02',
    title: 'Seamless Matching',
    description: 'Our AI-powered algorithm connects you with the perfect freelancer for your project in minutes.',
    keywords: ['Fast', 'Intelligent', 'Precise'],
  },
  {
    number: '03',
    title: 'Secure Payments',
    description: 'Built-in escrow system ensures both parties are protected throughout the entire project lifecycle.',
    keywords: ['Safe', 'Transparent', 'Protected'],
  },
  {
    number: '04',
    title: 'Project Management',
    description: 'Comprehensive tools to track progress, communicate, and deliver exceptional results.',
    keywords: ['Organized', 'Efficient', 'Clear'],
  },
]

export default function Features() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const features = section.querySelectorAll('.feature-card')

    features.forEach((feature, i) => {
      gsap.from(feature, {
        scrollTrigger: {
          trigger: feature,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse',
        },
        y: 100,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        delay: i * 0.1,
      })

      // Reveal animation for keywords
      const keywords = feature.querySelectorAll('.feature-keyword')
      gsap.from(keywords, {
        scrollTrigger: {
          trigger: feature,
          start: 'top 70%',
        },
        opacity: 0,
        x: -20,
        stagger: 0.1,
        duration: 0.6,
        ease: 'power2.out',
      })
    })
  }, [])

  return (
    <section ref={sectionRef} className="py-40 px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-24">
          <h2 className="font-display text-6xl md:text-8xl font-black mb-6">
            Why Choose ANA
          </h2>
          <div className="w-32 h-1 bg-white" />
        </div>

        <div className="grid md:grid-cols-2 gap-20">
          {features.map((feature, index) => (
            <div
              key={index}
              className="feature-card group cursor-pointer"
              data-cursor-hover
            >
              <div className="mb-6">
                <span className="text-8xl font-black text-transparent bg-clip-text bg-gradient-to-br from-white to-gray-600">
                  {feature.number}
                </span>
              </div>

              <h3 className="font-display text-4xl font-black mb-6 group-hover:translate-x-4 transition-transform duration-300">
                {feature.title}
              </h3>

              <p className="text-gray-400 text-lg leading-relaxed mb-8">
                {feature.description}
              </p>

              <div className="flex gap-3">
                {feature.keywords.map((keyword, i) => (
                  <span
                    key={i}
                    className="feature-keyword px-4 py-2 border border-white/20 text-xs uppercase tracking-wider"
                  >
                    {keyword}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
