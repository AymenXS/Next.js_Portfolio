import { fetchContentfulEntries } from '@/lib/contentful';

function normalizeProject(item) {
  const f = item?.fields || {};

  const str = (v) => (typeof v === 'string' ? v.trim() : '');

  const toIso = (v) => {
    if (!v) return null;
    const d = new Date(v);
    return Number.isNaN(d.getTime()) ? null : d.toISOString();
  };

  const toNum = (v) => {
    const n = typeof v === 'number' ? v : Number(v);
    return Number.isFinite(n) ? n : null;
  };

  // tech_concepts JSON (Format 1): [{ concept, tech }]
  const techRaw = Array.isArray(f.tech_concepts) ? f.tech_concepts : [];
  const techConcepts = techRaw
    .filter(Boolean)
    .map((t) => ({
      concept: str(t?.concept),
      tech: str(t?.tech),
    }))
    .filter((t) => t.concept && t.tech);

  // key_features JSON: ["..."]
  const keyFeaturesRaw = Array.isArray(f.key_features) ? f.key_features : [];
  const keyFeatures = keyFeaturesRaw
    .filter((x) => typeof x === 'string' && x.trim())
    .map((x) => x.trim());

  const listFromJson = (v) =>
    Array.isArray(v) ? v.filter((x) => typeof x === 'string' && x.trim()).map((x) => x.trim()) : [];

  // metrics JSON: { performance, accessibility, best_practices, seo }
  const metricsRaw = f.metrics && typeof f.metrics === 'object' ? f.metrics : {};
  const metrics = {
    performance: toNum(metricsRaw.performance),
    accessibility: toNum(metricsRaw.accessibility),
    bestPractices: toNum(metricsRaw.best_practices ?? metricsRaw.bestPractices),
    seo: toNum(metricsRaw.seo),
  };

  const extraRaw = f.extra_metrics && typeof f.extra_metrics === 'object' ? f.extra_metrics : {};
  const extraMetrics = Object.fromEntries(
    Object.entries(extraRaw)
      .map(([k, v]) => [
        String(k),
        typeof v === 'string' ? v : typeof v === 'number' ? String(v) : '',
      ])
      .filter(([k, v]) => k && v)
  );

  // pictures assets (legacy kept, but useful)
  const picturesRaw = Array.isArray(f.pictures) ? f.pictures : [];
  const pictures = picturesRaw
    .map((asset) => {
      const url = asset?.fields?.file?.url ? `https:${asset.fields.file.url}` : '';
      const alt = str(asset?.fields?.title) || str(asset?.fields?.description) || 'Project image';
      return { src: url, alt };
    })
    .filter((p) => p.src);

  const startDate = toIso(f.start_date);
  const endDate = toIso(f.end_date);

  const featured = Boolean(f.featured);
  const slug = str(f.slug);

  return {
    id: item?.sys?.id || null,

    title: str(f.title),
    subtitle: str(f.subtitle),

    cardMiniDescription: str(f.card_mini_description),

    modalTitle: str(f.modal_title),
    modalDescription: str(f.modal_description),

    liveUrl: str(f.live_url),

    techConcepts,
    keyFeatures,

    problem: str(f.problem),
    answer: str(f.answer),

    visualDesign: listFromJson(f.visual_design),
    architecture: listFromJson(f.architecture),
    standoutSections: listFromJson(f.standout_sections),

    metrics,
    extraMetrics,

    pictures,

    featured,
    startDate,
    endDate,
    slug,
  };
}

export async function GET() {
  try {
    const contentType = process.env.CONTENTFUL_PROJECTS_CONTENT_TYPE || 'project';

    const data = await fetchContentfulEntries({
      contentType,
      // Featured first, then newest first
      order: ['-fields.featured', '-fields.start_date'],
    });

    const items = Array.isArray(data?.items)
      ? data.items.map(normalizeProject).filter((x) => x.id)
      : [];

    return Response.json({ ok: true, items });
  } catch (err) {
    return Response.json(
      { ok: false, error: err?.message || 'Unknown error' },
      { status: 500 }
    );
  }
}
