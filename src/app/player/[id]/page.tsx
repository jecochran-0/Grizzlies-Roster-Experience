'use client'

import { useEffect, useState } from 'react'
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

export default function PlayerPage() {
  const { id } = useParams<{ id: string }>()
  const [player, setPlayer] = useState<PlayerDetail | null>(null)
  const [relatedPlayers, setRelatedPlayers] = useState<RosterPlayer[]>([])
  const [prevPlayer, setPrevPlayer] = useState<{ id: number; name: string } | null>(null)
  const [nextPlayer, setNextPlayer] = useState<{ id: number; name: string } | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    Promise.all([fetchPlayer(id), fetchRoster()])
      .then(([p, roster]) => {
        setPlayer(p)
        const idx = roster.findIndex((r) => r.id === p.pid)
        setPrevPlayer(idx > 0 ? { id: roster[idx - 1].id, name: roster[idx - 1].lastName } : null)
        setNextPlayer(idx < roster.length - 1 ? { id: roster[idx + 1].id, name: roster[idx + 1].lastName } : null)
        const others = roster.filter((r) => r.id !== p.pid)
        const top = (key: keyof typeof others[0]['stats']['season']) =>
          [...others].sort((a, b) => (b.stats?.season?.[key] ?? 0) - (a.stats?.season?.[key] ?? 0)).slice(0, 5)
        const pool = [...new Map(
          [...top('ppg'), ...top('rpg'), ...top('apg')].map((r) => [r.id, r])
        ).values()]
        const picked = pool.sort(() => Math.random() - 0.5).slice(0, 3)
        setRelatedPlayers(picked)
      })
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false))
  }, [id])

  return (
    <>
    <LoadingScreen show={loading} />
    <div
      className="min-h-screen overflow-x-hidden"
      style={{ background: 'linear-gradient(135deg, #102037 0%, #2A435A 100%)' }}
    >
      <Navbar />

      {error && (
        <div className="flex min-h-[600px] items-center justify-center">
          <p className="text-steel">Failed to load player.</p>
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
