import type { RosterPlayer, PlayerDetail, RosterApiResponse, PlayerApiResponse } from "./types";

export async function fetchRoster(): Promise<RosterPlayer[]> {
  const res = await fetch("/api/roster");
  if (!res.ok) throw new Error(`Failed to fetch roster: ${res.status}`);
  const data: RosterApiResponse = await res.json();
  return data.results.roster;
}

export async function fetchPlayer(playerId: string | number): Promise<PlayerDetail> {
  const res = await fetch(`/api/player/${playerId}`);
  if (!res.ok) throw new Error(`Failed to fetch player ${playerId}: ${res.status}`);
  const data: PlayerApiResponse = await res.json();
  return data.results;
}

