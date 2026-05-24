'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'

interface LoadingScreenProps {
  show: boolean
}

const MIN_DISPLAY_MS = 700
const FADE_MS = 500

export default function LoadingScreen({ show }: LoadingScreenProps) {
  const [mounted, setMounted] = useState(true)
  const [fadingOut, setFadingOut] = useState(false)
  const [logoVisible, setLogoVisible] = useState(false)
  const mountedAt = useRef(Date.now())

  // Fade the logo in after first paint — overlay is already solid
  useEffect(() => {
    const id = requestAnimationFrame(() =>
      requestAnimationFrame(() => setLogoVisible(true))
    )
    return () => cancelAnimationFrame(id)
  }, [])

  // Fade the whole overlay out once data is ready, respecting minimum time
  useEffect(() => {
    if (show) return
    const elapsed = Date.now() - mountedAt.current
    const delay = Math.max(MIN_DISPLAY_MS - elapsed, 0)

    const fadeTimer = setTimeout(() => {
      setFadingOut(true)
      const unmountTimer = setTimeout(() => setMounted(false), FADE_MS)
      return () => clearTimeout(unmountTimer)
    }, delay)

    return () => clearTimeout(fadeTimer)
  }, [show])

  if (!mounted) return null

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#102037',
        // Overlay is solid from frame 1 — no flash. Only transitions on fade-out.
        opacity: fadingOut ? 0 : 1,
        transition: fadingOut ? `opacity ${FADE_MS}ms cubic-bezier(0.4, 0, 0.2, 1)` : 'none',
        pointerEvents: fadingOut ? 'none' : 'all',
      }}
    >
      <div
        style={{
          opacity: logoVisible ? 1 : 0,
          transform: logoVisible ? 'scale(1)' : 'scale(0.92)',
          transition: 'opacity 450ms cubic-bezier(0.4, 0, 0.2, 1), transform 450ms cubic-bezier(0.4, 0, 0.2, 1)',
          animation: logoVisible ? 'mg-pulse 2s ease-in-out infinite' : 'none',
        }}
      >
        <Image
          src="/mg-icon.png"
          alt="Memphis Grizzlies"
          width={140}
          height={140}
          priority
          style={{ display: 'block' }}
        />
      </div>

    </div>
  )
}
