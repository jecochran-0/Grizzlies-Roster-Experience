export function getHeadshotUrl(playerId: number | string): string {
  return `https://cdn.nba.com/headshots/nba/latest/1040x760/${playerId}.png`
}

export function getJerseyUrl(playerName: string): string {
  const query = encodeURIComponent(`${playerName} jersey`)
  return `https://www.fanatics.com/search#q=${query}&start=0`
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
