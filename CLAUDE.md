@AGENTS.md

# Grizzlies Roster — Fan-Facing Player Experience

## Project Overview
A responsive fan-facing player experience for the Memphis Grizzlies.
Two core screens: a roster view and a player detail view.
Built with Next.js (App Router), TypeScript, and Tailwind CSS.
CSR (client-side rendering) — all data fetched client-side.
Deploying to Vercel.

## API Endpoints
- Roster: https://content-api-prod.nba.com/public/1/leagues/nba/teams/1610612763/roster
- Player detail: https://content-api-prod.nba.com/public/1/leagues/nba/player/{playerId}
- Player headshots: https://cdn.nba.com/headshots/nba/latest/1040x760/{playerId}.png

If CORS blocks direct client-side fetch, proxy through Next.js API routes
at /api/roster and /api/player/[id].

## Design System
- Memphis Midnight: #12173F (dark backgrounds)
- Beale Street Blue: #5D76A9 (primary accent, links, borders)
- Smoke Blue: #BED4E9 (light accent, secondary surfaces)
- Grizzlies Gold: #F5B112 (CTAs, highlights, jersey numbers, awards)
- Steel Gray: #707271 (secondary text, labels)
- White: #FFFFFF (primary text on dark backgrounds)

## Component Architecture
Reusable components in src/components/:
- layout/: Navbar, Footer, PageHero
- roster/: PlayerCard, PlayerGrid, SortControls
- player/: PlayerHero, CareerStats, AwardsBadges, PlayerBio, 
  RecentGames, FanEngagement, MorePlayers
- ui/: StatDisplay, StatRow, PlayerImage, Button, Badge, 
  Skeleton, ErrorState

## Data Handling Rules
- Always handle null/missing fields gracefully (no jersey number, 
  no weight, empty bio, no awards)
- PlayerImage must have onError fallback to a silhouette placeholder
- cmsBio is raw HTML — parse into sections (Professional Career, 
  Before NBA, Personal Life)
- Awards array — filter out weekly/monthly awards (KIPWK, KIRMO), 
  show only major awards
- Professional Career bio section should truncate with "Read More" expand

## Code Standards
- Use semantic HTML (nav, main, section, article, footer)
- All images need meaningful alt text
- Use next/image for optimized image loading
- Use next/link for client-side navigation
- Keep components small and focused
- TypeScript interfaces in src/lib/types.ts
- API functions in src/lib/api.ts
- Utility functions in src/lib/utils.ts

## Pages
- / → Roster page (roster grid with sort controls)
- /player/[id] → Player detail page

## Responsive Breakpoints
- Mobile: < 768px (single column cards, stacked layout)
- Tablet: 768px-1024px (2 column cards)
- Desktop: > 1024px (3 column cards, side-by-side layouts)
