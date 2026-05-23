import type { PlayerDetail } from '@/lib/types'

interface CareerStatsProps {
  player: PlayerDetail
}

function BarChartIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
      <path d="M3 12h4v9H3v-9zm7-5h4v14h-4V7zm7-4h4v18h-4V3z" />
    </svg>
  )
}

function StatItem({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <span className="text-6xl font-black leading-none text-white">
        {value.toFixed(1)}
      </span>
      <span className="text-xs font-bold uppercase tracking-widest text-steel">
        {label}
      </span>
    </div>
  )
}

export default function CareerStats({ player }: CareerStatsProps) {
  const { stats, pid } = player

  return (
    <section className="px-6 py-12">
      <div className="mx-auto max-w-7xl">
        <h2 className="mb-8 text-3xl font-black uppercase tracking-wide text-white">
          Career Stats
        </h2>
        <div className="mb-8 flex items-center justify-around gap-8 sm:justify-start sm:gap-16">
          <StatItem value={stats.PTS} label="PPG" />
          <StatItem value={stats.AST} label="APG" />
          <StatItem value={stats.REB} label="RPG" />
        </div>
        <a
          href={`https://www.nba.com/player/${pid}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-white px-6 py-2.5 text-sm font-bold text-white transition-colors hover:bg-white/10"
        >
          <BarChartIcon />
          See Full Stats
        </a>
      </div>
    </section>
  )
}
