import PlayerCard from './PlayerCard'
import Skeleton from '@/components/ui/Skeleton'
import type { RosterPlayer } from '@/lib/types'

interface PlayerGridProps {
  players: RosterPlayer[]
  loading?: boolean
}

function CardSkeleton() {
  return (
    <div
      className="overflow-hidden"
      style={{
        border: '1px solid rgba(255, 255, 255, 0.15)',
        borderRadius: '12px',
      }}
    >
      <div
        style={{
          background: 'linear-gradient(180deg, rgba(16, 32, 55, 0.5) 0%, #39475B 100%)',
        }}
      >
        <div className="flex items-start gap-3 p-4 pb-2">
          <Skeleton className="h-14 w-10" />
          <div className="flex flex-col gap-2">
            <Skeleton className="h-3 w-20" />
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-3 w-16" />
          </div>
        </div>
        <Skeleton className="aspect-[1040/760] w-full rounded-none" />
      </div>
      <div className="grid grid-cols-3 gap-4 p-4">
        <Skeleton className="h-10" />
        <Skeleton className="h-10" />
        <Skeleton className="h-10" />
      </div>
      <div className="px-4 pb-4">
        <Skeleton className="h-10 rounded-full" />
      </div>
    </div>
  )
}

export default function PlayerGrid({ players, loading = false }: PlayerGridProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-3">
        {Array.from({ length: 9 }).map((_, i) => (
          <CardSkeleton key={i} />
        ))}
      </div>
    )
  }

  if (players.length === 0) {
    return (
      <p className="py-16 text-center text-steel">No players found.</p>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-3">
      {players.map((player) => (
        <PlayerCard key={player.id} player={player} />
      ))}
    </div>
  )
}
