'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import PlayerHero from '@/components/player/PlayerHero'
import CareerStats from '@/components/player/CareerStats'
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
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    Promise.all([fetchPlayer(id), fetchRoster()])
      .then(([p, roster]) => {
        setPlayer(p)
        setRelatedPlayers(roster.filter((r) => r.id !== p.pid).slice(0, 3))
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

      {loading && (
        <div className="flex min-h-[600px] items-center justify-center">
          <p className="text-steel">Loading...</p>
        </div>
      )}

      {error && (
        <div className="flex min-h-[600px] items-center justify-center">
          <p className="text-steel">Failed to load player.</p>
        </div>
      )}

      {player && (
        <>
          <PlayerHero player={player} />
          <div style={{ background: '#1A2F4E' }}>
            <CareerStats player={player} />
            <AwardsBadges player={player} />
            <PlayerBio player={player} />
          </div>
          <MorePlayers players={relatedPlayers} />
          <RecentGames player={player} />
          <PlayerHighlights player={player} />
          <FanEngagement player={player} />
        </>
      )}

      <Footer />
    </div>
    </>
  )
}
