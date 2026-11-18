interface Env {
  DB: D1Database;
}

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  if (!env.DB) return json({ error: 'db_unavailable' }, 503);

  let payload: { seconds?: number };
  try {
    payload = await request.json();
  } catch {
    return json({ error: 'invalid_json' }, 400);
  }

  const seconds = Number(payload?.seconds);
  // Sanity range: positive, under one hour.
  if (!Number.isFinite(seconds) || seconds <= 0 || seconds > 3600) {
    return json({ error: 'invalid_duration' }, 400);
  }
  const sec = Math.round(seconds * 1000) / 1000;

  try {
    await env.DB
      .prepare('INSERT INTO flights (seconds, created_at) VALUES (?, ?)')
      .bind(sec, Date.now())
      .run();

    const [betterRes, totalRes] = await Promise.all([
      env.DB.prepare('SELECT COUNT(*) AS c FROM flights WHERE seconds > ?')
        .bind(sec)
        .first<{ c: number }>(),
      env.DB.prepare('SELECT COUNT(*) AS c FROM flights').first<{ c: number }>(),
    ]);

    const rank = (betterRes?.c ?? 0) + 1;
    const total = totalRes?.c ?? 1;

    return json({ rank, total, seconds: sec });
  } catch (e) {
    console.error('flight insert/rank failed', e);
    return json({ error: 'server_error' }, 500);
  }
};
