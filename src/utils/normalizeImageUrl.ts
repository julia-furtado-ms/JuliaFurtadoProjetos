const FALLBACK_IMAGE_URL = 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=1200';

export function normalizeImageUrl(url: string | undefined | null): string {
  if (!url) return '';

  const trimmed = url.trim();
  if (!trimmed) return '';

  const googleDrivePatterns = [
    /(?:drive\.google\.com\/file\/d\/|drive\.google\.com\/open\?id=|drive\.google\.com\/uc\?[^#]*id=|drive\.google\.com\/thumbnail\?id=)([a-zA-Z0-9_-]+)/i,
    /(?:drive\.google\.com\/file\/d\/)([^/]+)/i,
    /(?:drive\.google\.com\/uc\?export=view&id=)([a-zA-Z0-9_-]+)/i
  ];

  const fileId = googleDrivePatterns
    .map((pattern) => trimmed.match(pattern)?.[1])
    .find(Boolean);

  if (fileId) {
    return `https://lh3.googleusercontent.com/d/${fileId}?authuser=0`;
  }

  return trimmed;
}

export function getImageFallbackUrl(_url?: string): string {
  return FALLBACK_IMAGE_URL;
}
