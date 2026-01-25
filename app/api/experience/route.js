import { fetchContentfulEntries } from '@/lib/contentful';

function normalizeExperience(item) {
  const f = item?.fields || {};

  const toIso = (v) => {
    if (!v) return null;
    const d = new Date(v);
    return Number.isNaN(d.getTime()) ? null : d.toISOString();
  };

  // Contentful field IDs (snake_case)
  const jobTitle = typeof f.job_title === 'string' ? f.job_title : '';
  const company = typeof f.company === 'string' ? f.company : '';
  const location = typeof f.location === 'string' ? f.location : '';
  const locationMode = typeof f.location_mode === 'string' ? f.location_mode : '';

  const startDate = toIso(f.start_date);
  const endDate = toIso(f.end_date);

  // tasks JSON: [{ title, descriptions: [] }]
  const tasksRaw = Array.isArray(f.tasks) ? f.tasks : [];
  const tasks = tasksRaw
    .filter(Boolean)
    .map((t) => {
      if (typeof t === 'string') return t.trim();
      const title = typeof t?.title === 'string' ? t.title.trim() : '';
      const desc = Array.isArray(t?.descriptions)
        ? t.descriptions
        : Array.isArray(t?.bullets)
          ? t.bullets
          : [];
      const descriptions = desc.filter((d) => typeof d === 'string' && d.trim());
      return { title, descriptions };
    })
    .filter((t) => (typeof t === 'string' ? t : t.title || t.descriptions?.length));

  // techGroups JSON field id is tech_groups
  const techGroupsRaw = Array.isArray(f.tech_groups) ? f.tech_groups : [];
  const techGroups = techGroupsRaw
    .filter(Boolean)
    .map((g) => ({
      label: typeof g?.label === 'string' ? g.label : '',
      items: Array.isArray(g?.items) ? g.items.filter((x) => typeof x === 'string' && x.trim()) : [],
    }))
    .filter((g) => g.label && g.items.length);

  return {
    id: item?.sys?.id || null,
    jobTitle,
    company,
    location,
    locationMode,
    startDate,
    endDate,
    techGroups,
    tasks,
  };
}


export async function GET() {
  try {
    const contentType = process.env.CONTENTFUL_EXPERIENCE_CONTENT_TYPE || 'PortfolioExperience';

    const data = await fetchContentfulEntries({
      contentType,
      // Desc by startDate
      order: '-fields.start_date',
    });

    const items = Array.isArray(data?.items) ? data.items.map(normalizeExperience).filter((x) => x.id) : [];

    return Response.json({ ok: true, items });
  } catch (err) {
    return Response.json(
      { ok: false, error: err?.message || 'Unknown error' },
      { status: 500 }
    );
  }
}
