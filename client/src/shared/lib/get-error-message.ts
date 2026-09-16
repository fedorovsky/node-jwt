import axios from 'axios';

/**
 * Extracts a human-readable message from an unknown error.
 * Prefers the API's `message` field, then the error's own message.
 */
export function getErrorMessage(error: unknown, fallback: string): string {
  if (axios.isAxiosError(error)) {
    const apiMessage = (
      error.response?.data as { message?: unknown } | undefined
    )?.message;
    if (typeof apiMessage === 'string' && apiMessage.trim()) return apiMessage;
  }
  if (error instanceof Error && error.message) return error.message;
  return fallback;
}
