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
      <td className="py-4 pr-4">
        <span className="block text-base font-black text-white">{formatDate(game.GAME_DATE)}</span>
        <span className="block text-xs font-semibold uppercase tracking-wide text-white/50">{formatMatchup(game.MATCHUP)}</span>
      </td>
      <td className="px-3 py-4 text-base font-bold text-white md:px-5">{game.PTS}</td>
      <td className="px-3 py-4 text-base font-bold text-white md:px-5">{game.REB}</td>
      <td className="px-3 py-4 text-base font-bold text-white md:px-5">{game.AST}</td>
      <td className="py-4 pl-3 md:pl-5">
        <span className={`text-base font-black ${isWin ? 'text-gold' : 'text-white/40'}`}>
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
        <div className="overflow-x-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/20">
                <th className="pb-3 pr-4 text-left text-[10px] font-black uppercase tracking-widest text-white/50">
                  Game
                </th>
                <th className="px-3 pb-3 text-left text-[10px] font-black uppercase tracking-widest text-white/50 md:px-5">
                  PTS
                </th>
                <th className="px-3 pb-3 text-left text-[10px] font-black uppercase tracking-widest text-white/50 md:px-5">
                  REB
                </th>
                <th className="px-3 pb-3 text-left text-[10px] font-black uppercase tracking-widest text-white/50 md:px-5">
                  AST
                </th>
                <th className="pb-3 pl-3 text-left text-[10px] font-black uppercase tracking-widest text-white/50 md:pl-5">
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
