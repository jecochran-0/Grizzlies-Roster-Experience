import Link from 'next/link'
import PlayerImage from '@/components/ui/PlayerImage'
import type { RosterPlayer } from '@/lib/types'

interface PlayerCardProps {
  player: RosterPlayer
}

function StatCell({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center gap-1">
      <span className="text-2xl font-bold text-white">{(value ?? 0).toFixed(1)}</span>
      <span className="text-xs font-semibold uppercase tracking-widest text-steel">{label}</span>
    </div>
  )
}

export default function PlayerCard({ player }: PlayerCardProps) {
  const { id, number, firstName, lastName, displayName, position, stats } = player
  const { ppg, rpg, apg } = stats.season

  return (
    <article
      className="overflow-hidden transition-transform duration-200 hover:-translate-y-1"
      style={{
        border: '1px solid rgba(255, 255, 255, 0.15)',
        borderRadius: '12px',
      }}
    >
      {/* Gradient covers header + image only */}
      <div
        style={{
          background: 'linear-gradient(180deg, rgba(16, 32, 55, 0.5) 0%, #39475B 100%)',
        }}
      >
        {/* Header row: jersey number | divider | name */}
        <div className="flex items-start gap-2 px-4 pt-4">
          <span
            className="shrink-0 font-black leading-none text-gold"
            style={{ fontSize: 'clamp(3rem, 6vw, 4rem)' }}
            aria-label={`Jersey number ${number || 'none'}`}
          >
            {number || '—'}
          </span>
          {/* Vertical divider */}
          <div className="mx-1 mt-1 self-stretch w-[2px] shrink-0 rounded-full bg-white/30" />
          {/* Name block */}
          <div className="flex flex-col justify-start pt-0.5">
            <span className="text-xs font-normal leading-tight text-white/60">{firstName}</span>
            <span className="text-xl font-bold leading-tight text-white">{lastName}</span>
          </div>
        </div>

        {/* Position — own row below header */}
        <div className="px-4 pb-1 pt-1">
          <span className="text-[11px] font-semibold uppercase tracking-widest text-steel">
            {position}
          </span>
        </div>

        {/* Headshot */}
        <div className="relative w-full" style={{ aspectRatio: '1040 / 760' }}>
          <PlayerImage playerId={id} playerName={displayName} />
        </div>
      </div>

      {/* Stats + bio — no background, transparent over page gradient */}
      <div className="grid grid-cols-3 px-4 py-4">
        <StatCell value={ppg} label="PPG" />
        <StatCell value={rpg} label="RPG" />
        <StatCell value={apg} label="APG" />
      </div>

      <div className="px-4 pb-4">
        <Link
          href={`/player/${id}`}
          className="block w-full rounded-full bg-white py-2.5 text-center text-sm font-bold text-midnight transition-colors hover:bg-smoke"
        >
          {displayName} Bio
        </Link>
      </div>
    </article>
  )
}
