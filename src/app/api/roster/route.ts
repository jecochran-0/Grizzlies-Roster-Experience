const UPSTREAM = "https://content-api-prod.nba.com/public/1/leagues/nba/teams/1610612763/roster";

export async function GET() {
  const res = await fetch(UPSTREAM, { next: { revalidate: 3600 } });
  if (!res.ok) {
    return Response.json({ error: "upstream error" }, { status: res.status });
  }
  const data = await res.json();
  return Response.json(data);
}
