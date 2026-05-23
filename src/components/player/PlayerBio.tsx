'use client'

import { useState } from 'react'
import type { PlayerDetail } from '@/lib/types'

interface PlayerBioProps {
  player: PlayerDetail
}

function stripHtml(html: string): string {
  return html
    .replace(/<[^>]+>/g, ' ')
    .replace(/&amp;/g, '&').replace(/&nbsp;/g, ' ')
    .replace(/&lt;/g, '<').replace(/&gt;/g, '>')
    .replace(/\s+/g, ' ').trim()
}

function parseBioSections(html: string) {
  const sections: { heading: string; start: number }[] = []
  const headingRegex = /<h[1-6][^>]*>([\s\S]*?)<\/h[1-6]>/gi
  let m: RegExpExecArray | null
  while ((m = headingRegex.exec(html)) !== null) {
    sections.push({ heading: stripHtml(m[1]), start: m.index + m[0].length })
  }
  const result: { career?: string; beforeNba?: string } = {}
  for (let i = 0; i < sections.length; i++) {
    const { heading, start } = sections[i]
    const end = sections[i + 1]?.start ?? html.length
    const content = stripHtml(html.slice(start, end))
    const h = heading.toLowerCase()
    if (h.includes('professional') || h.includes('career') || h.includes('personal')) {
      result.career = (result.career ? result.career + ' ' : '') + content
    } else if (h.includes('before') || h.includes('college') || h.includes('nba')) {
      result.beforeNba = content
    }
  }
  if (!result.career && !result.beforeNba) result.career = stripHtml(html)
  return result
}

const TRUNCATE_LENGTH = 500

export default function PlayerBio({ player }: PlayerBioProps) {
  const [expanded, setExpanded] = useState(false)

  const { career, beforeNba } = parseBioSections(player.cmsBio || '')

  const shouldTruncate = (career?.length ?? 0) > TRUNCATE_LENGTH
  const displayedCareer =
    career && !expanded && shouldTruncate
      ? career.slice(0, TRUNCATE_LENGTH) + '…'
      : career

  if (!career && !beforeNba) return null

  return (
    <section className="px-6 pb-12">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-10 md:flex-row md:gap-12">
          {career && (
            <div style={{ flex: '0 0 45%' }}>
              <h2 className="mb-4 text-3xl font-black uppercase text-white">
                About {player.firstName.toUpperCase()}
              </h2>
              <p className="text-sm leading-relaxed text-white/80">
                {displayedCareer}
              </p>
              {shouldTruncate && (
                <button
                  onClick={() => setExpanded((e) => !e)}
                  className="mt-4 inline-flex items-center gap-2 rounded-full border border-white px-5 py-2 text-sm font-bold text-white transition-colors hover:bg-white/10"
                >
                  {expanded ? 'Read Less' : 'Read Full Bio'}
                </button>
              )}
            </div>
          )}
          {beforeNba && (
            <div style={{ flex: '1 1 0%' }}>
              <h3 className="mb-3 text-xl font-black uppercase text-white">
                Before the NBA
              </h3>
              <p className="text-sm leading-relaxed text-white/70">
                {beforeNba}
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
