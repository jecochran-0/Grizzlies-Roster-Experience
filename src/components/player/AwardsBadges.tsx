import type { PlayerDetail, Award } from '@/lib/types'

interface AwardsBadgesProps {
  player: PlayerDetail
}

function extractYear(season: string): string {
  const parts = season.split('-')
  if (parts.length < 2) return season
  const suffix = parts[1]
  if (suffix.length === 2) return '20' + suffix
  return suffix
}

function groupAwards(awards: Award[]): string[] {
  const filtered = awards.filter((a) => {
    const desc = a.DESCRIPTION.toLowerCase()
    return !desc.includes('week') && !desc.includes('month')
  })

  const map = new Map<string, string[]>()
  for (const award of filtered) {
    const key = award.DESCRIPTION
    const year = extractYear(award.SEASON)
    const existing = map.get(key) ?? []
    existing.push(year)
    map.set(key, existing)
  }

  const result: string[] = []
  for (const [desc, years] of map.entries()) {
    const count = years.length
    const yearList = years.sort().join(', ')
    const label = desc.toUpperCase()
    if (count > 1) {
      result.push(`${count}X ${label} ${yearList}`)
    } else {
      result.push(`${label} ${yearList}`)
    }
  }

  return result
}

export default function AwardsBadges({ player }: AwardsBadgesProps) {
  const grouped = groupAwards(player.awards)

  if (grouped.length === 0) return null

  return (
    <section className="px-6 pb-12">
      <div className="mx-auto max-w-7xl">
        <p className="mb-4 text-xs font-black uppercase tracking-widest text-steel">
          Awards
        </p>
        <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {grouped.map((label) => (
            <li
              key={label}
              className="rounded-lg border border-white/20 px-4 py-3 text-xs font-bold uppercase text-white"
            >
              {label}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
