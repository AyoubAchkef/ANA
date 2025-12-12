'use client'

import { useState } from 'react'

interface AnimatedButtonProps {
  children: React.ReactNode
  onClick?: () => void
}

export default function AnimatedButton({ children, onClick }: AnimatedButtonProps) {
  const [isActive, setIsActive] = useState(false)

  return (
    <button
      onClick={onClick}
      onMouseDown={() => setIsActive(true)}
      onMouseUp={() => setIsActive(false)}
      onMouseLeave={() => setIsActive(false)}
      className="group relative p-2 mb-5 uppercase font-bold text-sm tracking-wider cursor-pointer bg-transparent border-none text-white transition-all duration-150 ease-in-out"
    >
      {/* Top border */}
      <div
        className={`absolute top-0 left-0 right-0 h-[calc(50%-5px)] border border-white border-b-0 transition-all duration-150 ease-in-out ${
          isActive ? 'top-[3px] left-[3px] right-[3px]' : ''
        }`}
      />

      {/* Bottom border */}
      <div
        className={`absolute bottom-0 left-0 right-0 h-[calc(50%-5px)] border border-white border-t-0 transition-all duration-150 ease-in-out ${
          isActive ? 'bottom-[3px] left-[3px] right-[3px]' : ''
        }`}
      />

      {/* Main button content */}
      <span className="relative block px-8 py-4 bg-black overflow-hidden shadow-[inset_0px_0px_0px_1px_transparent]">
        {/* Top-left corner */}
        <span className="absolute top-0 left-0 w-[2px] h-[2px] bg-black" />

        {/* Bottom-right corner */}
        <span className="absolute right-0 bottom-0 w-1 h-1 bg-black group-hover:bg-white transition-all duration-200 ease-in-out" />

        {/* Slide effect */}
        <span className="absolute top-0 -bottom-px -left-2 w-0 bg-white skew-x-[-15deg] group-hover:w-[calc(100%+15px)] transition-all duration-200 ease-in-out" />

        {/* Button text */}
        <span className="relative z-10 group-hover:text-black transition-colors duration-200">
          {children}
        </span>
      </span>
    </button>
  )
}
