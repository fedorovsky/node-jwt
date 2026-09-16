/**
 * Permissive email check for forms: anything@domain.tld with no whitespace.
 * Allows plus-addressing (user+tag@example.com) and long TLDs.
 * The server performs the authoritative validation.
 */
export const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const isValidEmail = (value: string): boolean =>
  EMAIL_PATTERN.test(value.trim());
