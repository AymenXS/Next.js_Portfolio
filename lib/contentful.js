export function getContentfulConfig() {
  const spaceId = process.env.CONTENTFUL_SPACE_ID;
  const accessToken = process.env.CONTENTFUL_ACCESS_TOKEN;
  const environment = process.env.CONTENTFUL_ENVIRONMENT || 'master';

  if (!spaceId || !accessToken) {
    throw new Error('Missing Contentful environment variables: CONTENTFUL_SPACE_ID and/or CONTENTFUL_ACCESS_TOKEN');
  }

  return { spaceId, accessToken, environment };
}

export async function fetchContentfulEntries({ contentType, order, limit } = {}) {
  if (!contentType) {
    throw new Error('fetchContentfulEntries requires contentType');
  }

  const { spaceId, accessToken, environment } = getContentfulConfig();

  const params = new URLSearchParams();
  params.set('content_type', contentType);
  if (order) params.set('order', order);
  if (limit) params.set('limit', String(limit));
  params.set('include', '0');

  const url = `https://cdn.contentful.com/spaces/${spaceId}/environments/${environment}/entries?${params.toString()}`;

  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    // Cache lightly; can be tuned later
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    const body = await res.text().catch(() => '');
    throw new Error(`Contentful request failed (${res.status}): ${body.slice(0, 200)}`);
  }

  return res.json();
}
