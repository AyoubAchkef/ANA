'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import Image from 'next/image'

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const footer = footerRef.current
    if (!footer) return

    // Reveal animation
    gsap.from(footer, {
      scrollTrigger: {
        trigger: footer,
        start: 'top bottom',
      },
      y: 100,
      opacity: 0,
      duration: 1,
      ease: 'power3.out',
    })
  }, [])

  return (
    <footer ref={footerRef} className="relative px-8 py-20 border-t border-white/10">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-12 mb-20">
          {/* Brand */}
          <div className="md:col-span-2">
            <Image
              src="/logo_ANA.svg"
              alt="ANA"
              width={80}
              height={80}
              className="invert mb-6"
            />
            <p className="text-gray-400 max-w-md">
              Connecting exceptional talent with visionary companies.
              Transform your business with ANA.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-bold text-sm uppercase tracking-wider mb-6">Platform</h3>
            <ul className="space-y-3">
              {['Find Talent', 'For Freelancers', 'Enterprise', 'Pricing'].map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                    data-cursor-hover
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-sm uppercase tracking-wider mb-6">Company</h3>
            <ul className="space-y-3">
              {['About', 'Blog', 'Careers', 'Contact'].map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                    data-cursor-hover
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-sm text-gray-400">
            © 2024 ANA. All rights reserved.
          </p>

          <div className="flex gap-6">
            {['Privacy', 'Terms', 'Cookies'].map((link) => (
              <a
                key={link}
                href="#"
                className="text-sm text-gray-400 hover:text-white transition-colors"
                data-cursor-hover
              >
                {link}
              </a>
            ))}
          </div>

          <div className="flex gap-6">
            {['Twitter', 'LinkedIn', 'Instagram'].map((social) => (
              <a
                key={social}
                href="#"
                className="text-sm text-gray-400 hover:text-white transition-colors"
                data-cursor-hover
              >
                {social}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
