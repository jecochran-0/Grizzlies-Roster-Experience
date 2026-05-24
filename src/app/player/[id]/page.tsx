'use client'

import { useCallback, useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import PlayerHero from '@/components/player/PlayerHero'
import AwardsBadges from '@/components/player/AwardsBadges'
import PlayerBio from '@/components/player/PlayerBio'
import MorePlayers from '@/components/player/MorePlayers'
import RecentGames from '@/components/player/RecentGames'
import PlayerHighlights from '@/components/player/PlayerHighlights'
import FanEngagement from '@/components/player/FanEngagement'
import { fetchPlayer, fetchRoster } from '@/lib/api'
import type { PlayerDetail, RosterPlayer } from '@/lib/types'
import LoadingScreen from '@/components/ui/LoadingScreen'

type PlayerNav = { id: number; name: string }

function buildPageState(
  p: PlayerDetail,
  roster: RosterPlayer[],
): { prev: PlayerNav | null; next: PlayerNav | null; related: RosterPlayer[] } {
  const idx = roster.findIndex((r) => r.id === p.pid)
  const prev = idx > 0 ? { id: roster[idx - 1].id, name: roster[idx - 1].lastName } : null
  const next = idx < roster.length - 1 ? { id: roster[idx + 1].id, name: roster[idx + 1].lastName } : null

  const others = roster.filter((r) => r.id !== p.pid)
  const top = (key: keyof (typeof others)[0]['stats']['season']) =>
    [...others].sort((a, b) => (b.stats?.season?.[key] ?? 0) - (a.stats?.season?.[key] ?? 0)).slice(0, 5)
  const pool = [...new Map(
    [...top('ppg'), ...top('rpg'), ...top('apg')].map((r) => [r.id, r])
  ).values()]
  const related = pool.sort(() => Math.random() - 0.5).slice(0, 3)

  return { prev, next, related }
}

export default function PlayerPage() {
  const { id } = useParams<{ id: string }>()
  const [player, setPlayer] = useState<PlayerDetail | null>(null)
  const [relatedPlayers, setRelatedPlayers] = useState<RosterPlayer[]>([])
  const [prevPlayer, setPrevPlayer] = useState<PlayerNav | null>(null)
  const [nextPlayer, setNextPlayer] = useState<PlayerNav | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const load = useCallback(() => {
    setError(null)
    setLoading(true)
    Promise.all([fetchPlayer(id), fetchRoster()])
      .then(([p, roster]) => {
        const { prev, next, related } = buildPageState(p, roster)
        setPlayer(p)
        setPrevPlayer(prev)
        setNextPlayer(next)
        setRelatedPlayers(related)
      })
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false))
  }, [id])

  useEffect(() => { load() }, [load])

  return (
    <>
      <LoadingScreen show={loading} />
      <div
        className="min-h-screen overflow-x-hidden"
        style={{ background: 'linear-gradient(135deg, #102037 0%, #2A435A 100%)' }}
      >
        <Navbar />

        {error && (
          <div className="flex min-h-[600px] flex-col items-center justify-center gap-4">
            <p className="text-steel">Failed to load player.</p>
            <button
              onClick={load}
              className="rounded-full border border-beale px-6 py-2 text-sm font-semibold text-white hover:bg-beale/20"
            >
              Retry
            </button>
          </div>
        )}

        {player && (
          <>
            <PlayerHero player={player} prev={prevPlayer} next={nextPlayer} />
            <div style={{ background: '#1A2F4E' }} className="pt-12">
              <AwardsBadges player={player} />
              <PlayerBio player={player} />
            </div>
            <RecentGames player={player} />
            <PlayerHighlights player={player} />
            <FanEngagement player={player} />
            <MorePlayers players={relatedPlayers} />
          </>
        )}

        <Footer />
      </div>
    </>
  )
}
