import { getCollection } from 'astro:content';
import type { CollectionEntry } from 'astro:content';

// File ids look like "2026-06-17-the-bare-minimum". Strip the leading
// YYYY-MM-DD- so the public URL is a clean /log/the-bare-minimum.
export function entrySlug(id: string): string {
  return id.replace(/^\d{4}-\d{2}-\d{2}-/, '');
}

// "2026.06.17 — Entry 005" — matches the home page log treatment.
export function formatEntryDate(d: Date, number: number): string {
  const y = d.getUTCFullYear();
  const m = String(d.getUTCMonth() + 1).padStart(2, '0');
  const day = String(d.getUTCDate()).padStart(2, '0');
  return `${y}.${m}.${day} — Entry ${String(number).padStart(3, '0')}`;
}

export type WritingItem = {
  entry: CollectionEntry<'writing'>;
  slug: string;
  number: number;
  date: string;
  title: string;
  excerpt?: string;
};

// Single source of truth for the writing list: newest first, with the same
// entry numbering the home page and standalone /log pages both rely on.
export async function getWritingItems(): Promise<WritingItem[]> {
  const raw = await getCollection('writing');
  const sorted = raw.sort(
    (a, b) => b.data.date.getTime() - a.data.date.getTime()
  );
  return sorted.map((entry, i) => {
    const number = sorted.length - i;
    return {
      entry,
      slug: entrySlug(entry.id),
      number,
      date: formatEntryDate(entry.data.date, number),
      title: entry.data.title,
      excerpt: entry.data.excerpt,
    };
  });
}
