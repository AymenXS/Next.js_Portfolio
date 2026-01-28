export function getContentfulManagementConfig() {
  const spaceId = process.env.CONTENTFUL_SPACE_ID;
  const managementToken = process.env.CONTENTFUL_MANAGEMENT_TOKEN;
  const environment = process.env.CONTENTFUL_ENVIRONMENT || 'master';
  const locale = process.env.CONTENTFUL_LOCALE || 'en-US';

  if (!spaceId || !managementToken) {
    throw new Error(
      'Missing Contentful management config: CONTENTFUL_SPACE_ID and/or CONTENTFUL_MANAGEMENT_TOKEN'
    );
  }

  return { spaceId, managementToken, environment, locale };
}

export async function fetchContentfulManagementEntries({
  contentType,
  query,
} = {}) {
  if (!contentType) throw new Error('fetchContentfulManagementEntries requires contentType');

  const { spaceId, managementToken, environment } = getContentfulManagementConfig();
  const params = new URLSearchParams();
  params.set('content_type', contentType);
  if (query) {
    Object.entries(query).forEach(([key, value]) => {
      if (value !== undefined && value !== null) params.set(key, String(value));
    });
  }

  const url = `https://api.contentful.com/spaces/${spaceId}/environments/${environment}/entries?${params.toString()}`;
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${managementToken}`,
      'Content-Type': 'application/vnd.contentful.management.v1+json',
    },
  });

  if (!res.ok) {
    const body = await res.text().catch(() => '');
    throw new Error(`Contentful management request failed (${res.status}): ${body.slice(0, 200)}`);
  }

  return res.json();
}

export async function createContentfulManagementEntry({ contentType, fields }) {
  if (!contentType) throw new Error('createContentfulManagementEntry requires contentType');
  if (!fields || typeof fields !== 'object') {
    throw new Error('createContentfulManagementEntry requires fields');
  }

  const { spaceId, managementToken, environment, locale } =
    getContentfulManagementConfig();

  const url = `https://api.contentful.com/spaces/${spaceId}/environments/${environment}/entries`;
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${managementToken}`,
      'Content-Type': 'application/vnd.contentful.management.v1+json',
      'X-Contentful-Content-Type': contentType,
    },
    body: JSON.stringify({
      fields: Object.fromEntries(
        Object.entries(fields).map(([key, value]) => [key, { [locale]: value }])
      ),
    }),
  });

  if (!res.ok) {
    const body = await res.text().catch(() => '');
    throw new Error(`Contentful create failed (${res.status}): ${body.slice(0, 200)}`);
  }

  return res.json();
}
