import type { APIRoute } from 'astro';
import { SITE, writing } from '../lib/site';

export const GET: APIRoute = async () => {
  const urls = ['/', ...(await writing()).map(it => `/log/${it.slug}/`)];
  return new Response(`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map(u => `  <url><loc>${SITE}${u}</loc></url>`).join('\n')}\n</urlset>\n`, { headers: { 'Content-Type': 'application/xml' } });
};
