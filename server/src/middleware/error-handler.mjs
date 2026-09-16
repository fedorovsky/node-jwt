import { HttpError } from '../lib/http-error.mjs';

export function notFoundHandler(req, _res, next) {
  next(HttpError.notFound(`Route ${req.method} ${req.originalUrl} not found`));
}

/**
 * Single place that turns errors into JSON. Anything that is not an HttpError
 * is treated as unexpected: it is logged with its stack and hidden from the
 * client behind a generic 500.
 */
export function createErrorHandler({ logger = console, exposeStack = false }) {
  // eslint-disable-next-line no-unused-vars
  return (err, req, res, _next) => {
    if (err instanceof HttpError) {
      const body = { error: err.code, message: err.message };
      if (err.details) body.details = err.details;
      return res.status(err.status).json(body);
    }

    // body-parser rejects malformed JSON with a SyntaxError carrying a status.
    if (err?.type === 'entity.parse.failed') {
      return res
        .status(400)
        .json({ error: 'Bad Request', message: 'Malformed JSON body.' });
    }

    if (err?.type === 'entity.too.large') {
      return res.status(413).json({
        error: 'Payload Too Large',
        message: 'Request body exceeds the allowed size.',
      });
    }

    logger.error(`[${req.method} ${req.originalUrl}]`, err);

    const body = {
      error: 'Internal Server Error',
      message: 'An unexpected error occurred.',
    };
    if (exposeStack && err?.stack) body.stack = err.stack;

    return res.status(500).json(body);
  };
}
