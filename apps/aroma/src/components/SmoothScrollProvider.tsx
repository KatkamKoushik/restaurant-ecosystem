'use client'
import { ReactLenis } from '@studio-freight/react-lenis'
import React from 'react'

export default function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  return (
    <ReactLenis
      root
      options={{
        duration: 0.8,
        smoothWheel: true,
        wheelMultiplier: 1.2,
        touchMultiplier: 1.5,
        syncTouch: false,
      }}
    >
      {/* @ts-ignore */}
      {children}
    </ReactLenis>
  )
}
