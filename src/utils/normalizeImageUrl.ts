export function normalizeImageUrl(url: string | undefined | null): string {
  if (!url) return '';

  const trimmed = url.trim();
  if (!trimmed) return '';

  const googleDriveMatch = trimmed.match(/(?:drive\.google\.com\/file\/d\/|drive\.google\.com\/open\?id=|drive\.google\.com\/uc\?[^#]*id=)([^/&?]+)/i);
  const googleDriveFolderMatch = trimmed.match(/drive\.google\.com\/file\/d\/([^/]+)/i);
  const fileId = googleDriveMatch?.[1] || googleDriveFolderMatch?.[1];

  if (fileId) {
    return `https://drive.google.com/uc?export=view&id=${fileId}`;
  }

  return trimmed;
}
