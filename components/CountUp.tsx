'use client'

import { useEffect, useRef, useState } from 'react'

interface CountUpProps {
  to: number
  from?: number
  duration?: number
  delay?: number
  className?: string
  separator?: string
}

export default function CountUp({
  to,
  from = 0,
  duration = 2,
  delay = 0,
  className = '',
  separator = ','
}: CountUpProps) {
  const [count, setCount] = useState(from)
  const [hasStarted, setHasStarted] = useState(false)
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (hasStarted) return

    const checkVisibility = () => {
      if (!ref.current) return false

      // Check if element and its parents are visible (opacity > 0)
      let element: HTMLElement | null = ref.current
      while (element) {
        const style = window.getComputedStyle(element)
        if (parseFloat(style.opacity) === 0) {
          return false
        }
        element = element.parentElement
      }
      return true
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasStarted && checkVisibility()) {
          setHasStarted(true)
        }
      },
      { threshold: 0.1 }
    )

    // Also poll for visibility changes (for GSAP opacity animations)
    const intervalId = setInterval(() => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect()
        const isInViewport = rect.top < window.innerHeight && rect.bottom > 0
        if (isInViewport && checkVisibility()) {
          setHasStarted(true)
        }
      }
    }, 100)

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      observer.disconnect()
      clearInterval(intervalId)
    }
  }, [hasStarted])

  useEffect(() => {
    if (!hasStarted) return

    const startTime = performance.now() + delay * 1000
    let animationFrame: number

    const animate = (currentTime: number) => {
      if (currentTime < startTime) {
        animationFrame = requestAnimationFrame(animate)
        return
      }

      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / (duration * 1000), 1)

      // Easing function (ease-out cubic)
      const eased = 1 - Math.pow(1 - progress, 3)

      const currentValue = Math.round(from + (to - from) * eased)
      setCount(currentValue)

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      }
    }

    animationFrame = requestAnimationFrame(animate)

    return () => cancelAnimationFrame(animationFrame)
  }, [hasStarted, from, to, duration, delay])

  const formatNumber = (num: number) => {
    if (separator) {
      return num.toLocaleString('en-US').replace(/,/g, separator)
    }
    return num.toString()
  }

  return (
    <span ref={ref} className={className}>
      {formatNumber(count)}
    </span>
  )
}
