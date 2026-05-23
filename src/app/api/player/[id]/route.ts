import type { NextRequest } from "next/server";

const UPSTREAM_BASE = "https://content-api-prod.nba.com/public/1/leagues/nba/player";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const res = await fetch(`${UPSTREAM_BASE}/${id}`, { next: { revalidate: 60 } });
  if (!res.ok) {
    return Response.json({ error: "upstream error" }, { status: res.status });
  }
  const data = await res.json();
  return Response.json(data);
}
