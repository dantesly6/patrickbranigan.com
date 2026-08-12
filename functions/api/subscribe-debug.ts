interface Env {
  BEEHIIV_API_KEY: string;
  BEEHIIV_PUBLICATION_ID: string;
}

export const onRequestGet: PagesFunction<Env> = async ({ env }) => {
  const info: Record<string, unknown> = {};

  try {
    info.hasApiKey = typeof env.BEEHIIV_API_KEY === 'string' && env.BEEHIIV_API_KEY.length > 0;
    info.apiKeyLen = env.BEEHIIV_API_KEY?.length ?? null;
    info.pubIdRaw = env.BEEHIIV_PUBLICATION_ID ?? null;
    info.pubIdLen = env.BEEHIIV_PUBLICATION_ID?.length ?? null;
  } catch (e) {
    info.envAccessError = e instanceof Error ? e.message : String(e);
  }

  try {
    const pubId = (env.BEEHIIV_PUBLICATION_ID || '').trim();
    const upstream = await fetch(
      `https://api.beehiiv.com/v2/publications/${pubId}/subscriptions?limit=1`,
      {
        method: 'GET',
        headers: { Authorization: `Bearer ${env.BEEHIIV_API_KEY}` },
      }
    );
    info.upstreamStatus = upstream.status;
    info.upstreamOk = upstream.ok;
    info.upstreamBody = await upstream.text().catch(() => '<unreadable>');
  } catch (e) {
    info.fetchErrorName = e instanceof Error ? e.name : typeof e;
    info.fetchErrorMessage = e instanceof Error ? e.message : String(e);
    info.fetchErrorStack = e instanceof Error ? e.stack : null;
  }

  return new Response(JSON.stringify(info, null, 2), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
};
