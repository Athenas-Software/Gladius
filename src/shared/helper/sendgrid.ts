import { decode as quotedPrintableDecode } from 'quoted-printable';

export const extractTrackingFromSubject = (subject: string) => {
  const matches = subject.match(/-\s*([a-zA-Z0-9_-]+)\((\d+)\)/i);

  if (matches) {
    const subdomain = matches[1].trim();
    const codigoChat = matches[2].trim();

    return {
      success: true,
      subdomain: subdomain,
      codigoChat: codigoChat
    };
  }

  return { success: false };
}

/**
 * Extract the first meaningful plain text from a raw MIME email.
 */
export function extractPlainTextFromMime(rawEmail: string): string | null {
  // Normalize line endings
  rawEmail = rawEmail.replace(/\r\n/g, '\n');

  // Split headers and body
  const [headerPart, ...bodyParts] = rawEmail.split('\n\n');
  let body = bodyParts.join('\n\n') || rawEmail;

  let textPart: string | null = null;

  // Try to find first text/plain part (multipart)
  const boundaryMatch = headerPart.match(/Content-Type:\s*multipart\/[^\;]+;\s*boundary="?([^"\s;]+)"?/i);
  if (boundaryMatch) {
    const boundary = boundaryMatch[1];
    const parts = body.split(new RegExp(`--${boundary}(?:--)?\n?`));
    for (const part of parts) {
      const trimmed = part.trim();
      if (!trimmed) continue;

      const [partHeaders, ...partBodyParts] = trimmed.split('\n\n');
      const partBody = partBodyParts.join('\n\n').trim();

      if (/Content-Type:\s*text\/plain/i.test(partHeaders)) {
        textPart = partBody;
        const encMatch = partHeaders.match(/Content-Transfer-Encoding:\s*(\S+)/i);
        if (encMatch) {
          const encoding = encMatch[1].toLowerCase();
          if (encoding === 'quoted-printable') textPart = quotedPrintableDecode(textPart);
          if (encoding === 'base64') textPart = Buffer.from(textPart, 'base64').toString('utf8');
        }
        break;
      }
    }
  }

  // Fallback: take body if no multipart found
  if (!textPart) textPart = body;

  textPart = textPart.trim();

  // Remove common quoted reply chains
  const replyMarkers = [
    /\nEm [^\n]{0,200}escreveu:/u,
    /\nOn [^\n]{0,200}wrote:/u,
    /\n[-]{2,} ?Original Message ?[-]{2,}/i,
    /\n> /,
  ];
  for (const pat of replyMarkers) {
    const match = textPart.match(pat);
    if (match && match.index !== undefined) {
      textPart = textPart.slice(0, match.index).trim();
      break;
    }
  }

  // Return first non-empty line
  for (const line of textPart.split('\n')) {
    const trimmed = line.trim();
    if (trimmed && !/^Content-Type:/i.test(trimmed)) return trimmed;
  }

  return null;
}
