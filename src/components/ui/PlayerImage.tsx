'use client'

import Image from 'next/image'
import { useState } from 'react'

interface PlayerImageProps {
  playerId: number
  playerName: string
  sizes?: string
  className?: string
}

export default function PlayerImage({
  playerId,
  playerName,
  sizes = '(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw',
  className = '',
}: PlayerImageProps) {
  const [hasError, setHasError] = useState(false)

  if (hasError) {
    return (
      <div className={`flex items-end justify-center ${className}`}>
        <svg
          viewBox="0 0 100 130"
          className="w-3/5 opacity-20 fill-smoke"
          aria-hidden="true"
        >
          <circle cx="50" cy="28" r="22" />
          <path d="M15 130 Q15 72 50 72 Q85 72 85 130Z" />
        </svg>
      </div>
    )
  }

  return (
    <Image
      src={`https://cdn.nba.com/headshots/nba/latest/1040x760/${playerId}.png`}
      alt={playerName}
      fill
      sizes={sizes}
      className={`object-contain object-top ${className}`}
      onError={() => setHasError(true)}
    />
  )
}
