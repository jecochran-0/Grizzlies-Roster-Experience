'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import Navbar from '@/components/layout/Navbar'
import PageHero from '@/components/layout/PageHero'
import SortControls, { type SortStat, type SortOrder } from '@/components/roster/SortControls'
import PlayerGrid from '@/components/roster/PlayerGrid'
import { fetchRoster } from '@/lib/api'
import type { RosterPlayer } from '@/lib/types'
import LoadingScreen from '@/components/ui/LoadingScreen'

export default function RosterPage() {
  const [players, setPlayers] = useState<RosterPlayer[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [sortStat, setSortStat] = useState<SortStat>('ppg')
  const [sortOrder, setSortOrder] = useState<SortOrder>('highest')

  const load = useCallback(() => {
    setError(null)
    setLoading(true)
    fetchRoster()
      .then(setPlayers)
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => { load() }, [load])

  const sorted = useMemo(
    () =>
      [...players].sort((a, b) => {
        const av = a.stats.season[sortStat]
        const bv = b.stats.season[sortStat]
        return sortOrder === 'highest' ? bv - av : av - bv
      }),
    [players, sortStat, sortOrder],
  )

  return (
    <>
      <LoadingScreen show={loading} />
      <div
      className="relative min-h-screen overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #102037 0%, #2A435A 100%)' }}
    >
      {/* Bear watermark — repeating vertically */}
      <div
        className="pointer-events-none absolute inset-0 z-0 flex flex-col items-center"
        aria-hidden="true"
        style={{ gap: '8vw', paddingTop: '22vw', opacity: 0.07 }}
      >
        {Array.from({ length: 10 }).map((_, i) => (
          <img
            key={i}
            src="/grizzlies-bear.png"
            alt=""
            style={{ width: '44vw', maxWidth: '580px', flexShrink: 0 }}
          />
        ))}
      </div>
      <div className="relative z-10">
        <Navbar />
        <PageHero title="Grizzlies Roster" subtitle="Get to know the Grizzlies squad" />
        <main className="mx-auto max-w-7xl px-4 py-8 md:px-6">
          <SortControls
            sortStat={sortStat}
            sortOrder={sortOrder}
            onStatChange={setSortStat}
            onOrderChange={setSortOrder}
          />
          {error ? (
            <div className="py-16 text-center">
              <p className="text-steel">Failed to load roster. Please try again.</p>
              <button
                onClick={load}
                className="mt-4 rounded-full border border-beale px-6 py-2 text-sm font-semibold text-white hover:bg-beale/20"
              >
                Retry
              </button>
            </div>
          ) : (
            <PlayerGrid players={sorted} loading={loading} />
          )}
        </main>
      </div>
      </div>
    </>
  )
}
