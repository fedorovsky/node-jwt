const TOKEN_KEY = 'token';

/**
 * The only place that touches localStorage for the auth token.
 * Wrapped in try/catch because storage may be unavailable (private mode, quota).
 */
export const tokenStorage = {
  get(): string | null {
    try {
      return localStorage.getItem(TOKEN_KEY);
    } catch {
      return null;
    }
  },
  set(token: string): void {
    try {
      localStorage.setItem(TOKEN_KEY, token);
    } catch {
      // Ignore: the session simply will not survive a reload.
    }
  },
  clear(): void {
    try {
      localStorage.removeItem(TOKEN_KEY);
    } catch {
      // Ignore.
    }
  },
};
