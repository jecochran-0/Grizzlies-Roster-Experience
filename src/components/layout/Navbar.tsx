'use client'

import { useState } from 'react'
import Link from 'next/link'

const NAV_LINKS = ['Tickets', 'Team', 'Schedule', 'Media', 'Shop']

function IconFacebook() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden="true">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  )
}

function IconX() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
}

function IconInstagram() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current stroke-2" aria-hidden="true" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
    </svg>
  )
}

function IconYouTube() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden="true">
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58zM9.75 15.02V8.98L15.5 12l-5.75 3.02z" />
    </svg>
  )
}

function IconTikTok() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden="true">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.79 1.53V6.75a4.84 4.84 0 0 1-1.02-.06z" />
    </svg>
  )
}

function IconSearch() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current stroke-2" aria-hidden="true" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  )
}

function IconMenu() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6 fill-none stroke-current stroke-2" aria-hidden="true" strokeLinecap="round">
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  )
}

function IconClose() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6 fill-none stroke-current stroke-2" aria-hidden="true" strokeLinecap="round">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  )
}

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="relative z-50 bg-midnight">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-6" aria-label="Main navigation">
        {/* Logo */}
        <Link href="/" className="flex-shrink-0" aria-label="Memphis Grizzlies home">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://cdn.nba.com/logos/nba/1610612763/primary/L/logo.svg"
            alt="Memphis Grizzlies"
            className="h-10 w-10"
          />
        </Link>

        {/* Desktop nav links */}
        <ul className="hidden items-center gap-6 md:flex">
          {NAV_LINKS.map((label) => (
            <li key={label}>
              <a
                href="#"
                className="flex items-center gap-1 text-sm font-semibold uppercase tracking-wider text-white/80 transition-colors hover:text-white"
              >
                {label}
                {label === 'Shop' && (
                  <svg viewBox="0 0 24 24" className="h-3 w-3 fill-current" aria-hidden="true">
                    <path d="M7 10l5 5 5-5z" />
                  </svg>
                )}
              </a>
            </li>
          ))}
        </ul>

        {/* Desktop social + search */}
        <div className="hidden items-center gap-4 text-white/80 md:flex">
          <a href="#" aria-label="Facebook" className="transition-colors hover:text-white"><IconFacebook /></a>
          <a href="#" aria-label="X / Twitter" className="transition-colors hover:text-white"><IconX /></a>
          <a href="#" aria-label="Instagram" className="transition-colors hover:text-white"><IconInstagram /></a>
          <a href="#" aria-label="YouTube" className="transition-colors hover:text-white"><IconYouTube /></a>
          <a href="#" aria-label="TikTok" className="transition-colors hover:text-white"><IconTikTok /></a>
          <button aria-label="Search" className="transition-colors hover:text-white"><IconSearch /></button>
        </div>

        {/* Mobile hamburger */}
        <button
          className="text-white md:hidden"
          onClick={() => setMobileOpen((o) => !o)}
          aria-expanded={mobileOpen}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
        >
          {mobileOpen ? <IconClose /> : <IconMenu />}
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-t border-beale/30 bg-midnight md:hidden">
          <ul className="flex flex-col px-4 py-4">
            {NAV_LINKS.map((label) => (
              <li key={label}>
                <a
                  href="#"
                  onClick={() => setMobileOpen(false)}
                  className="block py-3 text-sm font-semibold uppercase tracking-wider text-white/80 hover:text-white"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
          <div className="flex gap-5 px-4 pb-4 text-white/70">
            <a href="#" aria-label="Facebook"><IconFacebook /></a>
            <a href="#" aria-label="X / Twitter"><IconX /></a>
            <a href="#" aria-label="Instagram"><IconInstagram /></a>
            <a href="#" aria-label="YouTube"><IconYouTube /></a>
            <a href="#" aria-label="TikTok"><IconTikTok /></a>
          </div>
        </div>
      )}
    </header>
  )
}
