'use client'

import { useEffect, useRef, useState, useMemo } from 'react'
import { gsap } from 'gsap'

interface BeamsProps {
  count?: number
}

export default function BeamsCSS({ count = 12 }: BeamsProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [mounted, setMounted] = useState(false)

  // Generate fixed random values on mount
  const beamConfigs = useMemo(() => {
    if (!mounted) return []

    return Array.from({ length: count }, (_, i) => ({
      leftPosition: (i / count) * 100,
      height: 40 + Math.random() * 40, // 40-80
      blur: 20 + Math.random() * 40, // 20-60
    }))
  }, [count, mounted])

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return

    const container = containerRef.current
    if (!container) return

    const beams = container.querySelectorAll('.beam')

    beams.forEach((beam, i) => {
      // Animation de mouvement vertical
      gsap.to(beam, {
        y: '100vh',
        duration: 15 + Math.random() * 10, // 15-25
        repeat: -1,
        ease: 'none',
        delay: i * 0.5,
      })

      // Animation de pulse
      gsap.to(beam, {
        opacity: 0.1 + Math.random() * 0.2, // 0.1-0.3
        duration: 2 + Math.random() * 2, // 2-4
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      })

      // Animation de largeur
      gsap.to(beam, {
        scaleX: 0.8 + Math.random() * 0.4, // 0.8-1.2
        duration: 3 + Math.random() * 3, // 3-6
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      })
    })
  }, [mounted])

  if (!mounted) return null

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden">
      {beamConfigs.map((config, i) => (
        <div
          key={i}
          className="beam absolute top-0"
          style={{
            left: `${config.leftPosition}%`,
            width: '2px',
            height: `${config.height}vh`,
            background: `linear-gradient(to bottom,
              transparent 0%,
              rgba(255, 255, 255, 0.6) 20%,
              rgba(255, 255, 255, 0.8) 50%,
              rgba(255, 255, 255, 0.6) 80%,
              transparent 100%
            )`,
            filter: `blur(${config.blur}px)`,
            transform: `translateY(-${config.height}vh)`,
            transformOrigin: 'center',
          }}
        />
      ))}
    </div>
  )
}
