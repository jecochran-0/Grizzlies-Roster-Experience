import type { PlayerDetail, GameLog } from '@/lib/types'

interface RecentGamesProps {
  player: PlayerDetail
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr)
  if (isNaN(date.getTime())) return dateStr
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

function formatMatchup(matchup: string): string {
  const vsIndex = matchup.indexOf(' vs. ')
  const atIndex = matchup.indexOf(' @ ')
  if (vsIndex !== -1) {
    return 'vs ' + matchup.slice(vsIndex + 5)
  }
  if (atIndex !== -1) {
    return '@ ' + matchup.slice(atIndex + 3)
  }
  return matchup
}

function GameRow({ game }: { game: GameLog }) {
  const isWin = game.WL === 'W'
  return (
    <tr className="border-b border-white/10">
      <td className="py-3 pr-4 text-sm text-white">
        <span className="block font-semibold">{formatDate(game.GAME_DATE)}</span>
        <span className="block text-xs text-steel">{formatMatchup(game.MATCHUP)}</span>
      </td>
      <td className="px-4 py-3 text-sm text-white">{game.PTS} PTS</td>
      <td className="px-4 py-3 text-sm text-white">{game.REB} REB</td>
      <td className="px-4 py-3 text-sm text-white">{game.AST} AST</td>
      <td className="py-3 pl-4 text-sm font-bold">
        <span className={isWin ? 'text-beale' : 'text-steel'}>
          {game.WL}
        </span>
      </td>
    </tr>
  )
}

export default function RecentGames({ player }: RecentGamesProps) {
  const games = (player.latestGames ?? []).slice(0, 5)

  if (games.length === 0) return null

  return (
    <section className="px-6 py-12">
      <div className="mx-auto max-w-7xl">
        <h2 className="mb-8 text-3xl font-black uppercase text-white">
          Last 5 Games
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[480px]">
            <thead>
              <tr className="border-b border-white/20">
                <th className="pb-3 pr-4 text-left text-xs font-black uppercase tracking-widest text-steel">
                  Game
                </th>
                <th className="px-4 pb-3 text-left text-xs font-black uppercase tracking-widest text-steel">
                  Points
                </th>
                <th className="px-4 pb-3 text-left text-xs font-black uppercase tracking-widest text-steel">
                  Rebounds
                </th>
                <th className="px-4 pb-3 text-left text-xs font-black uppercase tracking-widest text-steel">
                  Assists
                </th>
                <th className="pb-3 pl-4 text-left text-xs font-black uppercase tracking-widest text-steel">
                  W/L
                </th>
              </tr>
            </thead>
            <tbody>
              {games.map((game) => (
                <GameRow key={game.Game_ID} game={game} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}
