'use client'

export type SortStat = 'ppg' | 'rpg' | 'apg'
export type SortOrder = 'highest' | 'lowest'

interface SortControlsProps {
  sortStat: SortStat
  sortOrder: SortOrder
  onStatChange: (stat: SortStat) => void
  onOrderChange: (order: SortOrder) => void
}

const STAT_PILLS: { key: SortStat; label: string }[] = [
  { key: 'ppg', label: 'PPG' },
  { key: 'apg', label: 'APG' },
  { key: 'rpg', label: 'RPG' },
]

export default function SortControls({
  sortStat,
  sortOrder,
  onStatChange,
  onOrderChange,
}: SortControlsProps) {
  return (
    <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center">
      <span className="text-xs font-black uppercase tracking-widest text-white">
        Sort By
      </span>
      <div className="flex gap-2">
        {STAT_PILLS.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => onStatChange(key)}
            className={`rounded-full border px-5 py-1.5 text-sm font-semibold transition-colors ${
              sortStat === key
                ? 'border-white bg-white text-midnight'
                : 'border-white/50 bg-transparent text-white hover:border-white'
            }`}
          >
            {label}
          </button>
        ))}
      </div>
      <div className="relative">
        <select
          value={sortOrder}
          onChange={(e) => onOrderChange(e.target.value as SortOrder)}
          className="cursor-pointer appearance-none rounded-full border border-white/50 bg-midnight py-1.5 pl-4 pr-10 text-sm font-semibold text-white focus:outline-none"
        >
          <option value="highest">Highest to Lowest</option>
          <option value="lowest">Lowest to Highest</option>
        </select>
        <svg
          viewBox="0 0 24 24"
          className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 fill-white"
          aria-hidden="true"
        >
          <path d="M7 10l5 5 5-5z" />
        </svg>
      </div>
    </div>
  )
}
