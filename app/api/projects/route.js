import { fetchContentfulEntries } from '@/lib/contentful';

function normalizeProject(item) {
  const f = item?.fields || {};

  const str = (v) => (typeof v === 'string' ? v.trim() : '');
  const strArr = (v) =>
    Array.isArray(v) ? v.filter((x) => typeof x === 'string' && x.trim()).map((x) => x.trim()) : [];

  // techStack JSON: [{ concept, tech }]
  const techStackRaw = Array.isArray(f.tech_stack) ? f.tech_stack : [];
  const techStack = techStackRaw
    .filter(Boolean)
    .map((t) => ({
      concept: str(t?.concept),
      tech: str(t?.tech),
    }))
    .filter((t) => t.concept && t.tech);

  // metrics object: { performance, accessibility, bestPractices, seo }
  const metricsRaw = f.metrics && typeof f.metrics === 'object' ? f.metrics : {};
  const toNum = (v) => {
    const n = typeof v === 'number' ? v : Number(v);
    return Number.isFinite(n) ? n : null;
  };

  const metrics = {
    performance: toNum(metricsRaw.performance),
    accessibility: toNum(metricsRaw.accessibility),
    bestPractices: toNum(metricsRaw.best_practices ?? metricsRaw.bestPractices),
    seo: toNum(metricsRaw.seo),
  };

  // extraMetrics object (freeform key/value strings)
  const extraRaw = f.extra_metrics && typeof f.extra_metrics === 'object' ? f.extra_metrics : {};
  const extraMetrics = Object.fromEntries(
    Object.entries(extraRaw)
      .map(([k, v]) => [String(k), typeof v === 'string' ? v : typeof v === 'number' ? String(v) : ''])
      .filter(([k, v]) => k && v)
  );

  return {
    id: item?.sys?.id || null,
    category: str(f.category),
    title: str(f.title),
    thumbnail: str(f.thumbnail),

    miniDescription: str(f.mini_description),
    keyFeatures: strArr(f.key_features),

    techStack,

    modalTitle: str(f.modal_title),
    modalMiniDescription: str(f.modal_mini_description),
    liveDemoUrl: str(f.live_demo_url),

    problem: str(f.problem),
    answer: str(f.answer),
    visualDesign: strArr(f.visual_design),
    architecture: strArr(f.architecture),
    standoutSections: strArr(f.standout_sections),

    metrics,
    extraMetrics,
  };
}

export async function GET() {
  try {
    const contentType = process.env.CONTENTFUL_PROJECTS_CONTENT_TYPE || 'PortfolioProject';

    const data = await fetchContentfulEntries({
      contentType,
      order: '-fields.start_date',
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
