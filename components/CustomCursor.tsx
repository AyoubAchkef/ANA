'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const posRef = useRef({ x: 0, y: 0 })
  const mouseRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const cursor = cursorRef.current
    if (!cursor) return

    // Mouse move handler
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
    }

    // Smooth cursor animation
    const animate = () => {
      const dt = 1.0 - Math.pow(1.0 - 0.95, gsap.ticker.deltaRatio())

      posRef.current.x += (mouseRef.current.x - posRef.current.x) * dt
      posRef.current.y += (mouseRef.current.y - posRef.current.y) * dt

      gsap.set(cursor, {
        x: posRef.current.x,
        y: posRef.current.y,
        xPercent: -50,
        yPercent: -50,
      })

      requestAnimationFrame(animate)
    }

    // Hover effects
    const handleMouseEnter = () => {
      cursor.classList.add('hover')
    }

    const handleMouseLeave = () => {
      cursor.classList.remove('hover')
    }

    // Add listeners
    window.addEventListener('mousemove', handleMouseMove)

    const interactiveElements = document.querySelectorAll('a, button, [data-cursor-hover]')
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnter)
      el.addEventListener('mouseleave', handleMouseLeave)
    })

    animate()

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter)
        el.removeEventListener('mouseleave', handleMouseLeave)
      })
    }
  }, [])

  return <div id="custom-cursor" ref={cursorRef} />
}
