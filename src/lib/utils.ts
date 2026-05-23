export function getJerseyUrl(playerName: string): string {
  const query = encodeURIComponent(`${playerName} jersey`)
  return `https://store.nba.com/memphis-grizzlies/?query=${query}`
}

export function getTicketsUrl(): string {
  return 'https://www.nba.com/grizzlies/tickets'
}
