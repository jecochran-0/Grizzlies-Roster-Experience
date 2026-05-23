import Link from 'next/link'
import Image from 'next/image'
import localFont from 'next/font/local'
import type { PlayerDetail } from '@/lib/types'
import { getJerseyUrl } from '@/lib/utils'

const hnkani = localFont({ src: '../../fonts/HNkani.ttf' })

interface PlayerHeroProps {
  player: PlayerDetail
}

function InfoBlock({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1 min-w-0">
      <span className="text-[10px] font-semibold uppercase tracking-widest text-steel truncate">
        {label}
      </span>
      <span className="text-sm font-black uppercase tracking-wide text-white truncate">
        {value}
      </span>
    </div>
  )
}

function StatBlock({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex items-baseline gap-1.5">
      <span className="text-4xl font-black leading-none text-white">
        {value.toFixed(1)}
      </span>
      <span className="text-xs font-bold uppercase tracking-widest text-steel">
        {label}
      </span>
    </div>
  )
}

function BarChartIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
      <path d="M3 12h4v9H3v-9zm7-5h4v14h-4V7zm7-4h4v18h-4V3z" />
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

function BackArrow() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
      <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
    </svg>
  )
}

const GRADIENT_TEXT_STYLE = {
  backgroundImage: 'linear-gradient(180deg, rgba(197,158,88,0.85) 0%, rgba(28,48,88,0.18) 100%)',
  WebkitBackgroundClip: 'text' as const,
  WebkitTextFillColor: 'transparent' as const,
  backgroundClip: 'text' as const,
}

const FADE_STYLE = {
  position: 'absolute' as const,
  bottom: 0,
  left: 0,
  width: '100%',
  height: '18%',
  background: 'linear-gradient(to bottom, transparent 0%, #1C3350 100%)',
  pointerEvents: 'none' as const,
}

export default function PlayerHero({ player }: PlayerHeroProps) {
  const yearsInNba = player.info.SEASON_EXP
  const headshotUrl = `https://cdn.nba.com/headshots/nba/latest/1040x760/${player.pid}.png`
  const jerseyUrl = getJerseyUrl(player.name)

  return (
    <section
      className="relative overflow-hidden h-[calc(100vh-64px)] md:h-[640px]"
      style={{ background: 'linear-gradient(135deg, #102037 0%, #2A435A 100%)' }}
    >
      {/* GRIZZLIES watermark — DESKTOP: original position */}
      <div
        className="hidden md:block pointer-events-none select-none absolute z-[5]"
        aria-hidden="true"
        style={{ top: '6%', left: '30%', right: '-4%' }}
      >
        <span
          className={`${hnkani.className} block uppercase leading-none tracking-tighter whitespace-nowrap`}
          style={{ fontSize: 'clamp(80px, 12vw, 172px)', ...GRADIENT_TEXT_STYLE }}
        >
          GRIZZLIES
        </span>
      </div>

      {/* Bear watermark — MOBILE */}
      <div
        className="md:hidden pointer-events-none absolute z-[3] opacity-[0.08]"
        aria-hidden="true"
        style={{ top: '54%', left: '50%', width: '95vw', transform: 'translate(-50%, -50%)' }}
      >
        <img src="/grizzlies-bear.png" alt="" className="w-full" />
      </div>

      {/* Bear watermark — DESKTOP */}
      <div
        className="hidden md:block pointer-events-none absolute z-[3] opacity-[0.07]"
        aria-hidden="true"
        style={{ top: '50%', left: '16%', width: '38vw', maxWidth: '480px', transform: 'translateY(-50%)' }}
      >
        <img src="/grizzlies-bear.png" alt="" className="w-full" />
      </div>

      {/* ── MOBILE LAYOUT ── */}
      <div className="md:hidden relative z-10 flex flex-col h-full">
        <div className="px-5 pt-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-white/80 transition-colors hover:text-white"
          >
            <BackArrow />
            Back to Roster
          </Link>
        </div>

        {/* Top two-column block */}
        <div className="mt-2 flex items-start gap-3 px-5">
          {/* Left: jersey / name / team */}
          <div className="flex-1 min-w-0">
            <span
              className="block font-black leading-none text-gold"
              style={{ fontSize: 'clamp(2.5rem, 11vw, 3.25rem)' }}
            >
              {player.jerseyNumber || '—'}
            </span>
            <div className="mt-0.5">
              <p className="text-sm font-light leading-snug text-white">{player.firstName}</p>
              <p
                className="font-black leading-tight text-white"
                style={{ fontSize: 'clamp(1.25rem, 5.5vw, 1.75rem)' }}
              >
                {player.lastName}
              </p>
            </div>
            <div className="mt-2 flex items-center gap-1.5">
              <img
                src="https://cdn.nba.com/logos/nba/1610612763/primary/L/logo.svg"
                alt="Memphis Grizzlies"
                className="h-7 w-7 shrink-0"
              />
              <span className="text-[10px] font-black uppercase leading-tight tracking-wide text-white">
                {player.teamCity}<br />{player.teamName}
              </span>
            </div>
          </div>

          {/* Right: stats + buttons */}
          <div className="flex-1 min-w-0 flex flex-col gap-2">
            <div
              className="rounded-xl px-3 py-2"
              style={{
                border: '1px solid rgba(255,255,255,0.18)',
                background: 'rgba(255,255,255,0.06)',
              }}
            >
              <p className="mb-1 text-[8px] font-black uppercase tracking-widest text-gold">
                Current Season Stats
              </p>
              <div className="flex items-end justify-between">
                {[
                  { value: player.ppg, label: 'PPG' },
                  { value: player.apg, label: 'APG' },
                  { value: player.rpg, label: 'RPG' },
                ].map(({ value, label }) => (
                  <div key={label} className="flex flex-col items-center">
                    <span className="text-lg font-black leading-none text-white">
                      {value.toFixed(1)}
                    </span>
                    <span className="mt-0.5 text-[8px] font-bold uppercase tracking-widest text-steel">
                      {label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <button className="flex w-full items-center justify-center gap-1.5 rounded-full bg-white py-2 text-xs font-bold text-midnight transition-colors hover:bg-smoke">
              <BarChartIcon />
              See Full Stats
            </button>

            <a
              href={jerseyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full items-center justify-center gap-1.5 rounded-full py-2 text-xs font-bold text-midnight transition-opacity hover:opacity-90"
              style={{ backgroundColor: '#F5B112' }}
            >
              <BagIcon />
              Get #{player.jerseyNumber} Jersey
            </a>
          </div>
        </div>

        {/* Position / Years / From */}
        <div className="mt-3 grid grid-cols-3 gap-2 px-5">
          <InfoBlock label="Position" value={player.position} />
          <InfoBlock
            label="Years in NBA"
            value={`${yearsInNba} ${yearsInNba === 1 ? 'Year' : 'Years'}`}
          />
          <InfoBlock label="From" value={player.country} />
        </div>

        {/* Headshot: flex-1 fills exactly the remaining space, no overlap */}
        <div className="relative flex-1 mt-4">
          <Image
            src={headshotUrl}
            alt={player.name}
            fill
            sizes="100vw"
            className="object-cover object-top"
            priority
          />
          <div style={FADE_STYLE} />
        </div>
      </div>

      {/* ── DESKTOP LAYOUT ── */}
      <div className="hidden md:flex h-full mx-auto max-w-7xl flex-col px-6">
        <div className="shrink-0 pt-5 pb-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-white/80 transition-colors hover:text-white"
          >
            <BackArrow />
            Back to Roster
          </Link>
        </div>

        <div className="relative flex-1">
          {/* Player headshot — center zone */}
          <div
            className="absolute z-[10]"
            style={{ left: '14%', right: '31%', top: 0, bottom: 0 }}
          >
            <Image
              src={headshotUrl}
              alt={player.name}
              fill
              sizes="55vw"
              className="object-contain object-bottom"
              priority
            />
            <div style={FADE_STYLE} />
          </div>

          {/* Left column */}
          <div className="absolute left-0 z-[20]" style={{ top: '16%' }}>
            <span
              className="block font-black leading-none text-gold"
              style={{ fontSize: 'clamp(5rem, 8vw, 8.5rem)' }}
            >
              {player.jerseyNumber || '—'}
            </span>
            <div className="mt-1">
              <p className="text-xl font-light leading-snug text-white">{player.firstName}</p>
              <p
                className="font-black leading-none text-white"
                style={{ fontSize: 'clamp(2rem, 3.5vw, 3.5rem)' }}
              >
                {player.lastName}
              </p>
            </div>
            <div className="mt-4 flex items-center gap-3">
              <img
                src="https://cdn.nba.com/logos/nba/1610612763/primary/L/logo.svg"
                alt="Memphis Grizzlies"
                className="h-14 w-14 shrink-0"
              />
              <span className="text-xs font-black uppercase leading-tight tracking-wide text-white">
                {player.teamCity}<br />{player.teamName}
              </span>
            </div>
          </div>

          {/* Right column */}
          <div className="absolute right-0 z-[20]" style={{ top: '28%', width: '33%' }}>
            <div className="mb-5 flex gap-8">
              <InfoBlock label="Position" value={player.position} />
              <InfoBlock
                label="Years in NBA"
                value={`${yearsInNba} ${yearsInNba === 1 ? 'Year' : 'Years'}`}
              />
              <InfoBlock label="From" value={player.country} />
            </div>

            <div
              className="mb-4 px-5 py-4"
              style={{
                border: '1px solid rgba(255,255,255,0.18)',
                borderRadius: '10px',
                background: 'rgba(255,255,255,0.06)',
              }}
            >
              <p className="mb-3 text-[10px] font-black uppercase tracking-widest text-gold">
                Current Season Stats
              </p>
              <div className="flex items-center gap-7">
                <StatBlock value={player.ppg} label="PPG" />
                <StatBlock value={player.apg} label="APG" />
                <StatBlock value={player.rpg} label="RPG" />
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <button className="flex w-full items-center justify-center gap-2 rounded-full bg-white py-3 text-sm font-bold text-midnight transition-colors hover:bg-smoke">
                <BarChartIcon />
                See Full Stats
              </button>
              <a
                href={jerseyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center justify-center gap-2 rounded-full py-3 text-sm font-bold text-midnight transition-opacity hover:opacity-90"
                style={{ backgroundColor: '#F5B112' }}
              >
                <BagIcon />
                Get a #{player.jerseyNumber} Jersey
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
