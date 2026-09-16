/**
 * Error type carrying an HTTP status so the error handler can turn it into a
 * response without inspecting message strings.
 */
export class HttpError extends Error {
  constructor(status, message, { code = 'Error', details } = {}) {
    super(message);
    this.name = 'HttpError';
    this.status = status;
    this.code = code;
    this.details = details;
  }

  static badRequest(message, options) {
    return new HttpError(400, message, { code: 'Bad Request', ...options });
  }

  static unauthorized(message, options) {
    return new HttpError(401, message, { code: 'Unauthorized', ...options });
  }

  static forbidden(message, options) {
    return new HttpError(403, message, { code: 'Forbidden', ...options });
  }

  static notFound(message, options) {
    return new HttpError(404, message, { code: 'Not Found', ...options });
  }

  static conflict(message, options) {
    return new HttpError(409, message, { code: 'Conflict', ...options });
  }
}
