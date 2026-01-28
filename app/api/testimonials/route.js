import { fetchContentfulEntries } from '@/lib/contentful';
import {
  createContentfulManagementEntry,
  fetchContentfulManagementEntries,
} from '@/lib/contentful-management';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import crypto from 'crypto';

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
    website: str(f.website),
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

const MAX_MESSAGE_LENGTH = 1000;
const MAX_NAME_LENGTH = 80;
const MAX_WEBSITE_LENGTH = 200;

function getClientIp(req) {
  const forwarded = req.headers.get('x-forwarded-for');
  if (forwarded) return forwarded.split(',')[0].trim();
  return req.headers.get('x-real-ip') || '127.0.0.1';
}

function hashValue(value) {
  return crypto.createHash('sha256').update(value).digest('hex');
}

function initialsFromName(name) {
  const parts = String(name || '')
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2);
  if (parts.length === 0) return 'NA';
  return parts.map((p) => p[0]?.toUpperCase()).join('');
}

export async function POST(req) {
  try {
    const body = await req.json().catch(() => null);
    if (!body || typeof body !== 'object') {
      return Response.json({ ok: false, error: 'Invalid payload' }, { status: 400 });
    }

    const { mode, name, website, message, honeypot } = body;
    if (honeypot) {
      return Response.json({ ok: false, error: 'Invalid submission' }, { status: 400 });
    }

    const cleanMessage = typeof message === 'string' ? message.trim() : '';
    const cleanName = typeof name === 'string' ? name.trim() : '';
    const cleanWebsite = typeof website === 'string' ? website.trim() : '';

    if (!cleanMessage) {
      return Response.json({ ok: false, error: 'Message is required' }, { status: 400 });
    }
    if (cleanMessage.length > MAX_MESSAGE_LENGTH) {
      return Response.json(
        { ok: false, error: `Message exceeds ${MAX_MESSAGE_LENGTH} characters` },
        { status: 400 }
      );
    }
    if (cleanName.length > MAX_NAME_LENGTH) {
      return Response.json(
        { ok: false, error: `Name exceeds ${MAX_NAME_LENGTH} characters` },
        { status: 400 }
      );
    }
    if (cleanWebsite.length > MAX_WEBSITE_LENGTH) {
      return Response.json(
        { ok: false, error: `Website exceeds ${MAX_WEBSITE_LENGTH} characters` },
        { status: 400 }
      );
    }

    const session = await getServerSession(authOptions);
    const useGithub = mode === 'github';

    if (useGithub && !session?.user) {
      return Response.json({ ok: false, error: 'Sign in with GitHub to submit' }, { status: 401 });
    }

    const ip = getClientIp(req);
    const salt = process.env.TESTIMONIALS_IP_SALT;
    if (!salt) {
      return Response.json({ ok: false, error: 'Server not configured' }, { status: 500 });
    }

    const ipHash = hashValue(`${ip}:${salt}`);
    const messageHash = hashValue(`${cleanMessage}:${cleanName}:${salt}`);

    const contentType =
      process.env.CONTENTFUL_TESTIMONIALS_CONTENT_TYPE || 'PortfolioTestimonial';

    const cutoff = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
    const recent = await fetchContentfulManagementEntries({
      contentType,
      query: {
        'fields.ip_hash': ipHash,
        'sys.createdAt[gte]': cutoff,
        limit: 1,
      },
    });

    if (Array.isArray(recent?.items) && recent.items.length > 0) {
      return Response.json(
        { ok: false, error: 'Only one submission per 24 hours is allowed' },
        { status: 429 }
      );
    }

    const dupes = await fetchContentfulManagementEntries({
      contentType,
      query: {
        'fields.message_hash': messageHash,
        limit: 1,
      },
    });

    if (Array.isArray(dupes?.items) && dupes.items.length > 0) {
      return Response.json(
        { ok: false, error: 'Duplicate submission detected' },
        { status: 409 }
      );
    }

    const nowIso = new Date().toISOString();
    const nameValue =
      useGithub ? session?.user?.name || 'GitHub User' : cleanName || 'Anonymous';
    const websiteValue =
      useGithub ? session?.user?.profileUrl || '' : cleanWebsite || '';

    const platform = useGithub ? 'github' : 'guest';
    const platformLabel = useGithub ? 'GitHub' : 'Guest';
    const platformIcon = useGithub ? 'gh' : 'guest';

    await createContentfulManagementEntry({
      contentType,
      fields: {
        name: nameValue,
        message: cleanMessage,
        platform,
        platform_icon: platformIcon,
        platform_label: platformLabel,
        website: websiteValue,
        timestamp: nowIso,
        avatar_text: initialsFromName(nameValue),
        created_at: nowIso,
        ip_hash: ipHash,
        message_hash: messageHash,
        auth_provider: platform,
      },
    });

    return Response.json({ ok: true });
  } catch (err) {
    return Response.json(
      { ok: false, error: err?.message || 'Unknown error' },
      { status: 500 }
    );
  }
}
