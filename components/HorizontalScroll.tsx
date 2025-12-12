'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface Project {
  title: string
  category: string
  description: string
  stats: { label: string; value: string }[]
}

const projects: Project[] = [
  {
    title: 'E-Commerce Revolution',
    category: 'Web Development',
    description: 'Complete platform redesign with 300% increase in conversions',
    stats: [
      { label: 'Revenue Growth', value: '+300%' },
      { label: 'User Engagement', value: '+250%' },
    ],
  },
  {
    title: 'Brand Identity System',
    category: 'Design & Branding',
    description: 'Comprehensive visual identity for a global tech startup',
    stats: [
      { label: 'Brand Recognition', value: '+180%' },
      { label: 'Market Share', value: '+95%' },
    ],
  },
  {
    title: 'AI-Powered Analytics',
    category: 'Product Development',
    description: 'Machine learning platform processing 1M+ data points daily',
    stats: [
      { label: 'Processing Speed', value: '10x' },
      { label: 'Accuracy', value: '99.8%' },
    ],
  },
  {
    title: 'Mobile App Excellence',
    category: 'App Development',
    description: 'Award-winning mobile experience with 4.9★ rating',
    stats: [
      { label: 'Downloads', value: '1M+' },
      { label: 'User Rating', value: '4.9★' },
    ],
  },
]

export default function HorizontalScroll() {
  const sectionRef = useRef<HTMLElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const scroll = scrollRef.current
    if (!section || !scroll) return

    const cards = gsap.utils.toArray('.project-card')

    // Horizontal scroll animation
    const scrollTween = gsap.to(cards, {
      xPercent: -100 * (cards.length - 1),
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        pin: true,
        scrub: 1,
        snap: 1 / (cards.length - 1),
        end: () => '+=' + scroll.offsetWidth,
      },
    })

    // Parallax effect for each card
    cards.forEach((card, i) => {
      const element = card as HTMLElement
      const image = element.querySelector('.project-bg')

      if (image) {
        gsap.to(image, {
          x: -100,
          ease: 'none',
          scrollTrigger: {
            trigger: element,
            containerAnimation: scrollTween,
            start: 'left right',
            end: 'right left',
            scrub: 1,
          },
        })
      }
    })

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-white text-black">
      <div ref={scrollRef} className="flex w-max">
        {projects.map((project, index) => (
          <div
            key={index}
            className="project-card relative w-screen h-screen flex items-center justify-center p-20 overflow-hidden"
          >
            {/* Background */}
            <div className="project-bg absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-300" />

            {/* Content */}
            <div className="relative z-10 max-w-2xl">
              <div className="mb-6">
                <span className="inline-block px-6 py-2 bg-black text-white text-xs uppercase tracking-widest mb-4">
                  {project.category}
                </span>
              </div>

              <h2 className="font-display text-7xl font-black mb-8 leading-none">
                {project.title}
              </h2>

              <p className="text-2xl mb-12 text-gray-700 leading-relaxed">
                {project.description}
              </p>

              <div className="grid grid-cols-2 gap-8">
                {project.stats.map((stat, i) => (
                  <div key={i}>
                    <div className="text-5xl font-black mb-2">{stat.value}</div>
                    <div className="text-sm uppercase tracking-wider text-gray-600">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>

              <button
                className="mt-12 group flex items-center gap-4 text-lg font-bold uppercase tracking-wider"
                data-cursor-hover
              >
                View Case Study
                <span className="inline-block transition-transform group-hover:translate-x-2">
                  →
                </span>
              </button>
            </div>

            {/* Number indicator */}
            <div className="absolute top-20 right-20 text-9xl font-black opacity-5">
              {String(index + 1).padStart(2, '0')}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
