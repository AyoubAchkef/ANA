'use client'

import { useRef } from 'react'
import { useLanguage } from '@/context/LanguageContext'
import CountUp from './CountUp'

interface StatsContentProps {
  isPreview?: boolean
}

export default function StatsContent({ isPreview = false }: StatsContentProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const { t } = useLanguage()

  const stats = [
    { value: 2500, suffix: '+', labelKey: 'stats.activePlayers', delay: 0 },
    { value: 1200, suffix: '+', labelKey: 'stats.matchesPlayed', delay: 0.1 },
    { value: 96, suffix: '%', labelKey: 'stats.successRate', delay: 0.2 },
    { value: 45, suffix: '+', labelKey: 'stats.partnerCourts', delay: 0.3 },
  ]

  return (
    <section ref={sectionRef} className="relative min-h-screen py-32 overflow-hidden flex items-center justify-center">
      {/* Animated background */}
      <div className="stats-bg absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-white rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-8 w-full">
        <div className="stats-title text-center mb-20">
          <h2 className="font-display text-6xl md:text-8xl font-black mb-6">
            {t('stats.title')}
          </h2>
          <p className="text-xl text-gray-400">
            {t('stats.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
          {stats.map((stat, index) => (
            <div key={index} className="stat-item text-center group cursor-pointer" data-cursor-hover>
              <div className="mb-4 transition-transform group-hover:scale-110 duration-300 flex items-baseline justify-center">
                {isPreview ? (
                  <span className="text-5xl md:text-7xl font-black">
                    {stat.value.toLocaleString()}{stat.suffix}
                  </span>
                ) : (
                  <>
                    <CountUp
                      from={0}
                      to={stat.value}
                      separator=","
                      duration={2.5}
                      delay={stat.delay}
                      className="text-5xl md:text-7xl font-black"
                    />
                    <span className="text-5xl md:text-7xl font-black">{stat.suffix}</span>
                  </>
                )}
              </div>
              <p className="text-sm uppercase tracking-widest text-gray-400">
                {t(stat.labelKey)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
