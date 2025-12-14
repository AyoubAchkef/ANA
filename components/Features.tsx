'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLanguage } from '@/context/LanguageContext'

gsap.registerPlugin(ScrollTrigger)

export default function Features() {
  const sectionRef = useRef<HTMLElement>(null)
  const { t } = useLanguage()

  const features = [
    {
      number: '01',
      titleKey: 'features.smartMatching.title',
      descriptionKey: 'features.smartMatching.description',
      keywordsKey: 'features.smartMatching.keywords',
    },
    {
      number: '02',
      titleKey: 'features.groupFormation.title',
      descriptionKey: 'features.groupFormation.description',
      keywordsKey: 'features.groupFormation.keywords',
    },
    {
      number: '03',
      titleKey: 'features.courtBooking.title',
      descriptionKey: 'features.courtBooking.description',
      keywordsKey: 'features.courtBooking.keywords',
    },
    {
      number: '04',
      titleKey: 'features.matchOrganization.title',
      descriptionKey: 'features.matchOrganization.description',
      keywordsKey: 'features.matchOrganization.keywords',
    },
  ]

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const featureCards = section.querySelectorAll('.feature-card')

    featureCards.forEach((feature, i) => {
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
            {t('features.title')}
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
                {t(feature.titleKey)}
              </h3>

              <p className="text-gray-400 text-lg leading-relaxed mb-8">
                {t(feature.descriptionKey)}
              </p>

              <div className="flex gap-3 flex-wrap">
                {t(feature.keywordsKey).split(',').map((keyword, i) => (
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
