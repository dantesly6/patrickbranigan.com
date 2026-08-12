interface Env {
  BEEHIIV_API_KEY: string;
  BEEHIIV_PUBLICATION_ID: string;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  let payload: { email?: string };
  try {
    payload = await request.json();
  } catch {
    return json({ error: 'Invalid request' }, 400);
  }

  const email = (payload.email || '').trim().toLowerCase();
  if (!email || !EMAIL_RE.test(email)) {
    return json({ error: 'invalid_email' }, 400);
  }

  if (!env.BEEHIIV_API_KEY || !env.BEEHIIV_PUBLICATION_ID) {
    return json({ error: 'server_misconfigured' }, 500);
  }

  const publicationId = env.BEEHIIV_PUBLICATION_ID.trim();

  let upstream: Response;
  try {
    upstream = await fetch(
      `https://api.beehiiv.com/v2/publications/${publicationId}/subscriptions`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${env.BEEHIIV_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          reactivate_existing: true,
          send_welcome_email: true,
          utm_source: 'patrickbranigan.com',
        }),
      }
    );
  } catch (e) {
    console.error('Beehiiv fetch threw', e instanceof Error ? e.message : e);
    // 500, not 502/504 — Cloudflare's edge intercepts gateway-style 5xx codes
    // and replaces the body with its own generic error page, masking this
    // response entirely from the client.
    return json({ error: 'upstream_unreachable' }, 500);
  }

  if (!upstream.ok) {
    const text = await upstream.text().catch(() => '');
    console.error('Beehiiv error', upstream.status, text);
    return json({ error: 'subscribe_failed' }, 500);
  }

  return json({ ok: true });
};
