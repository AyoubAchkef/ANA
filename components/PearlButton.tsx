'use client'

import React from 'react'

interface PearlButtonProps {
  children: React.ReactNode
  onClick?: () => void
}

export default function PearlButton({ children, onClick }: PearlButtonProps) {
  const text = typeof children === 'string' ? children : String(children)

  return (
    <>
      <button className="glitch-button" onClick={onClick} data-text={text}>
        {children}
      </button>

      <style jsx>{`
        .glitch-button,
        .glitch-button::after {
          padding: 12px 40px;
          font-size: 0.875rem;
          border-radius: 5px;
          color: white;
          background-color: transparent;
          position: relative;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          font-weight: 500;
          cursor: pointer;
        }

        .glitch-button {
          border: 1px solid rgba(255, 255, 255, 0.8);
          box-shadow: 0px 10px 10px -10px rgba(255, 255, 255, 0.5);
        }

        .glitch-button::after {
          --move1: inset(50% 50% 50% 50%);
          --move2: inset(31% 0 40% 0);
          --move3: inset(39% 0 15% 0);
          --move4: inset(45% 0 40% 0);
          --move5: inset(45% 0 6% 0);
          --move6: inset(14% 0 61% 0);
          clip-path: var(--move1);
          content: attr(data-text);
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          display: block;
          padding: 12px 40px;
          border: none;
        }

        .glitch-button:hover::after {
          animation: glitch_4011 1s;
          animation-timing-function: steps(2, end);
          text-shadow: -3px -3px 0px rgba(255, 255, 255, 0.8), 3px 3px 0px rgba(255, 255, 255, 0.8);
          background-color: transparent;
          border: 3px solid rgba(255, 255, 255, 0.9);
        }

        .glitch-button:hover {
          text-shadow: -1px -1px 0px rgba(255, 255, 255, 0.6), 1px 1px 0px rgba(255, 255, 255, 0.6);
          background-color: transparent;
          border: none;
          box-shadow: none;
        }

        @keyframes glitch_4011 {
          0% {
            clip-path: var(--move1);
            transform: translate(0px, -10px);
          }

          10% {
            clip-path: var(--move2);
            transform: translate(-10px, 10px);
          }

          20% {
            clip-path: var(--move3);
            transform: translate(10px, 0px);
          }

          30% {
            clip-path: var(--move4);
            transform: translate(-10px, 10px);
          }

          40% {
            clip-path: var(--move5);
            transform: translate(10px, -10px);
          }

          50% {
            clip-path: var(--move6);
            transform: translate(-10px, 10px);
          }

          60% {
            clip-path: var(--move1);
            transform: translate(10px, -10px);
          }

          70% {
            clip-path: var(--move3);
            transform: translate(-10px, 10px);
          }

          80% {
            clip-path: var(--move2);
            transform: translate(10px, -10px);
          }

          90% {
            clip-path: var(--move4);
            transform: translate(-10px, 10px);
          }

          100% {
            clip-path: var(--move1);
            transform: translate(0);
          }
        }
      `}</style>
    </>
  )
}
