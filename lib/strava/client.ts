const STRAVA_AUTH_URL = "https://www.strava.com/oauth/authorize";
const STRAVA_TOKEN_URL = "https://www.strava.com/oauth/token";
const STRAVA_API = "https://www.strava.com/api/v3";

export function buildAuthorizeUrl(state: string): string {
  const params = new URLSearchParams({
    client_id: process.env.STRAVA_CLIENT_ID ?? "",
    response_type: "code",
    redirect_uri: process.env.STRAVA_REDIRECT_URI ?? "",
    approval_prompt: "auto",
    scope: "read,activity:read",
    state
  });
  return `${STRAVA_AUTH_URL}?${params.toString()}`;
}

export async function exchangeCodeForToken(code: string) {
  const res = await fetch(STRAVA_TOKEN_URL, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      client_id: process.env.STRAVA_CLIENT_ID,
      client_secret: process.env.STRAVA_CLIENT_SECRET,
      code,
      grant_type: "authorization_code"
    })
  });
  if (!res.ok) throw new Error(`Strava token exchange failed: ${res.status}`);
  return (await res.json()) as {
    access_token: string;
    refresh_token: string;
    expires_at: number;
    athlete: { id: number; firstname?: string; lastname?: string; profile?: string };
  };
}

export async function refreshAccessToken(refreshToken: string) {
  const res = await fetch(STRAVA_TOKEN_URL, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      client_id: process.env.STRAVA_CLIENT_ID,
      client_secret: process.env.STRAVA_CLIENT_SECRET,
      refresh_token: refreshToken,
      grant_type: "refresh_token"
    })
  });
  if (!res.ok) throw new Error(`Strava refresh failed: ${res.status}`);
  return (await res.json()) as {
    access_token: string;
    refresh_token: string;
    expires_at: number;
  };
}

export async function getLatestActivity(accessToken: string) {
  const res = await fetch(`${STRAVA_API}/athlete/activities?per_page=1`, {
    headers: { Authorization: `Bearer ${accessToken}` }
  });
  if (!res.ok) return null;
  const list = (await res.json()) as Array<{
    id: number;
    name: string;
    distance: number;
    moving_time: number;
    start_date: string;
  }>;
  return list[0] ?? null;
}
