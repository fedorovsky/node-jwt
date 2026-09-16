import type { SerializedError } from '@reduxjs/toolkit';
import type { FetchBaseQueryError } from '@reduxjs/toolkit/query';

/** Human-readable text for an RTK Query error; prefers the API's `message`. */
export function getQueryErrorMessage(
  error: FetchBaseQueryError | SerializedError | undefined,
  fallback: string,
): string {
  if (!error) return fallback;

  if ('status' in error) {
    const data = error.data as { message?: unknown } | undefined;
    if (typeof data?.message === 'string' && data.message.trim()) {
      return data.message;
    }
    return typeof error.status === 'number'
      ? `Request failed with status ${error.status}`
      : fallback;
  }

  return error.message ?? fallback;
}
