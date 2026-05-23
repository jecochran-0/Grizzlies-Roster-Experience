import type { PlayerDetail } from '@/lib/types'
import { getTicketsUrl, getJerseyUrl } from '@/lib/utils'

interface FanEngagementProps {
  player: PlayerDetail
}

function TicketIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
      <path d="M22 10V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v4a2 2 0 0 1 0 4v4a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-4a2 2 0 0 1 0-4zm-2-1.46A4 4 0 0 0 18 12a4 4 0 0 0 2 3.46V18H4v-2.54A4 4 0 0 0 6 12a4 4 0 0 0-2-3.46V6h16v2.54z" />
    </svg>
  )
}

function BagIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4H6zm1.5 4h9A.5.5 0 0 1 17 6.5V7a5 5 0 0 1-10 0v-.5A.5.5 0 0 1 7.5 6z" />
    </svg>
  )
}

export default function FanEngagement({ player }: FanEngagementProps) {
  const ticketsUrl = getTicketsUrl()
  const jerseyUrl = getJerseyUrl(player.name)

  return (
    <section className="px-6 py-12">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-wrap items-center justify-center gap-4">
          <a
            href={ticketsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-white px-7 py-3 text-sm font-bold text-white transition-colors hover:bg-white/10"
          >
            <TicketIcon />
            See {player.firstName} Live
          </a>
          <a
            href={jerseyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full px-7 py-3 text-sm font-bold text-midnight transition-opacity hover:opacity-90"
            style={{ backgroundColor: '#F5B112' }}
          >
            <BagIcon />
            Get a #{player.jerseyNumber} Jersey
          </a>
        </div>
      </div>
    </section>
  )
}
