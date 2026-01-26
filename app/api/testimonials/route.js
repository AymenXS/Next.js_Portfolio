import { fetchContentfulEntries } from '@/lib/contentful';

function normalizeTestimonial(item) {
  const f = item?.fields || {};

  const str = (v) => (typeof v === 'string' ? v.trim() : '');

  const toIso = (v) => {
    if (!v) return null;
    const d = new Date(v);
    return Number.isNaN(d.getTime()) ? null : d.toISOString();
  };

  const platform = str(f.platform) || 'guest';

  return {
    id: item?.sys?.id || null,
    name: str(f.name),
    website: str(f.website) || 'N/A',
    platform,
    platformLabel: str(f.platform_label) || (platform === 'linkedin' ? 'LinkedIn' : platform === 'github' ? 'GitHub' : platform === 'google' ? 'Google' : 'Guest'),
    platformIcon: str(f.platform_icon) || (platform === 'linkedin' ? 'in' : platform === 'github' ? 'gh' : platform === 'google' ? 'G' : 'guest'),
    message: str(f.message),
    timestamp: str(f.timestamp),
    avatar: str(f.avatar_text) || 'default-avatar.png',
    createdAt: toIso(f.created_at),
  };
}

export async function GET() {
  try {
    const contentType =
      process.env.CONTENTFUL_TESTIMONIALS_CONTENT_TYPE || 'PortfolioTestimonial';

    const data = await fetchContentfulEntries({
      contentType,
      order: '-fields.created_at',
    });

    const items = Array.isArray(data?.items)
      ? data.items.map(normalizeTestimonial).filter((x) => x.id)
      : [];

    return Response.json({ ok: true, items });
  } catch (err) {
    return Response.json(
      { ok: false, error: err?.message || 'Unknown error' },
      { status: 500 }
    );
  }
}
