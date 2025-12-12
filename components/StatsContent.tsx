'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const stats = [
  { value: 10000, suffix: '+', label: 'Active Freelancers' },
  { value: 5000, suffix: '+', label: 'Companies Trust Us' },
  { value: 98, suffix: '%', label: 'Success Rate' },
  { value: 50, suffix: 'M+', label: 'Projects Delivered' },
]

interface StatsContentProps {
  isPreview?: boolean
}

export default function StatsContent({ isPreview = false }: StatsContentProps) {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (isPreview) return // Skip animations when used as preview

    const section = sectionRef.current
    if (!section) return

    const statElements = section.querySelectorAll('.stat-value')

    statElements.forEach((el, i) => {
      const target = stats[i].value
      const obj = { value: 0 }

      gsap.to(obj, {
        value: target,
        duration: 2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 80%',
        },
        onUpdate: () => {
          ;(el as HTMLElement).textContent = Math.round(obj.value).toLocaleString()
        },
      })
    })

    // Parallax background
    gsap.to('.stats-bg', {
      y: -200,
      scrollTrigger: {
        trigger: section,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1,
      },
    })
  }, [isPreview])

  return (
    <section ref={sectionRef} className="relative py-40 overflow-hidden">
      {/* Animated background */}
      <div className="stats-bg absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-white rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-8">
        <div className="text-center mb-20">
          <h2 className="font-display text-6xl md:text-8xl font-black mb-6">
            By The Numbers
          </h2>
          <p className="text-xl text-gray-400">
            Trusted by thousands worldwide
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
          {stats.map((stat, index) => (
            <div key={index} className="text-center group cursor-pointer" data-cursor-hover>
              <div className="mb-4 transition-transform group-hover:scale-110 duration-300">
                <span className="stat-value text-6xl md:text-7xl font-black inline-block">
                  0
                </span>
                <span className="text-6xl md:text-7xl font-black">{stat.suffix}</span>
              </div>
              <p className="text-sm uppercase tracking-widest text-gray-400">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
