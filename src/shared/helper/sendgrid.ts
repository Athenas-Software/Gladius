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

export const extractPlainTextFromMime = (rawMime: string): string | null => {
  const boundaryMatch = rawMime.match(/boundary="([^"]+)"/i);
  if (!boundaryMatch) {
    return extractFallbackPlainText(rawMime);
  }

  const boundary = boundaryMatch[1];
  const parts = rawMime.split(`--${boundary}`);

  for (const part of parts) {
    if (
      /Content-Type:\s*text\/plain/i.test(part) &&
      !/Content-Disposition:\s*attachment/i.test(part)
    ) {
      const splitPart = part.split(/\r?\n\r?\n/);
      if (splitPart.length > 1) {
        const content = splitPart.slice(1).join("\n");
        return cleanMimeContent(content);
      }
    }
  }

  return extractFallbackPlainText(rawMime);
}

// ✅ Clean MIME content by removing encoding & trailing boundary marks
function cleanMimeContent(content: string): string {
  return content
    .replace(/\r/g, "")
    .replace(/--$/gm, "")
    .trim();
}

// ✅ If no proper MIME parts, fallback safely
function extractFallbackPlainText(rawMime: string): string | null {
  const split = rawMime.split(/\r?\n\r?\n/);
  if (split.length > 1) {
    return cleanMimeContent(split.slice(1).join("\n"));
  }
  return null;
}
