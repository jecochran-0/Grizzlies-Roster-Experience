import Link from 'next/link'
import PlayerImage from '@/components/ui/PlayerImage'
import type { RosterPlayer } from '@/lib/types'

interface PlayerCardProps {
  player: RosterPlayer
  featured?: boolean
}

function StatCell({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center gap-1">
      <span className="text-2xl font-bold text-white">{(value ?? 0).toFixed(1)}</span>
      <span className="text-xs font-semibold uppercase tracking-widest text-steel">{label}</span>
    </div>
  )
}

export default function PlayerCard({ player, featured = false }: PlayerCardProps) {
  const { id, number, firstName, lastName, displayName, position, stats } = player
  const { ppg, rpg, apg } = stats.season

  return (
    <article
      className="group overflow-hidden"
      style={{
        border: featured ? '1px solid rgba(245,177,18,0.55)' : '1px solid rgba(255,255,255,0.15)',
        borderRadius: '12px',
        boxShadow: featured ? '0 0 28px rgba(245,177,18,0.12)' : undefined,
        transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease, border-color 0.3s ease',
      }}
      onMouseEnter={e => {
        const el = e.currentTarget
        el.style.transform = 'translateY(-8px)'
        el.style.boxShadow = featured
          ? '0 20px 40px rgba(0,0,0,0.5), 0 0 32px rgba(245,177,18,0.18)'
          : '0 24px 48px rgba(0,0,0,0.5)'
        el.style.borderColor = featured ? 'rgba(245,177,18,0.8)' : 'rgba(255,255,255,0.32)'
      }}
      onMouseLeave={e => {
        const el = e.currentTarget
        el.style.transform = ''
        el.style.boxShadow = featured ? '0 0 28px rgba(245,177,18,0.12)' : ''
        el.style.borderColor = featured ? 'rgba(245,177,18,0.55)' : 'rgba(255,255,255,0.15)'
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
        <div className="flex items-center gap-2 px-4 pb-1 pt-1">
          <span className="text-[11px] font-semibold uppercase tracking-widest text-steel">
            {position}
          </span>
          {featured && (
            <span className="rounded-full bg-gold px-2 py-0.5 text-[9px] font-black uppercase tracking-widest text-midnight">
              Top Scorer
            </span>
          )}
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
          className="block w-full rounded-full bg-white py-2.5 text-center text-sm font-bold text-midnight transition-all duration-200 hover:bg-smoke hover:tracking-wide active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
        >
          {displayName} Bio
        </Link>
      </div>
    </article>
  )
}
