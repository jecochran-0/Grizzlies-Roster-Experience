export function getJerseyUrl(playerName: string): string {
  const query = encodeURIComponent(`${playerName} jersey`)
  return `https://store.nba.com/memphis-grizzlies/?query=${query}`
}

export function getTicketsUrl(): string {
  return 'https://www.nba.com/grizzlies/tickets'
}

function getNbaSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, '')
    .trim()
    .replace(/\s+/g, '-')
}

export function getNbaStatsUrl(playerId: number, playerName: string): string {
  return `https://www.nba.com/player/${playerId}/${getNbaSlug(playerName)}`
}

export function getNbaBioUrl(playerId: number, playerName: string): string {
  return `https://www.nba.com/player/${playerId}/${getNbaSlug(playerName)}/bio`
}
