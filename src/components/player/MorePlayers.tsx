import PlayerCard from '@/components/roster/PlayerCard'
import type { RosterPlayer } from '@/lib/types'

interface MorePlayersProps {
  players: RosterPlayer[]
}

export default function MorePlayers({ players }: MorePlayersProps) {
  if (players.length === 0) return null

  return (
    <section className="px-6 py-12">
      <div className="mx-auto max-w-7xl">
        <h2 className="mb-8 text-3xl font-black uppercase text-white">
          More Players
        </h2>
        <ul className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6" role="list">
          {players.map((player) => (
            <li key={player.id}>
              <PlayerCard player={player} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
