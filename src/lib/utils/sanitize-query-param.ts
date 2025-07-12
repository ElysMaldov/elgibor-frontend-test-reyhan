/**
 * Only stores alphanumeric characters.
 */
export const sanitizeQueryParam = (q: string) =>
  q.replace(/[^a-z0-9\s]/gi, "").toLowerCase();
