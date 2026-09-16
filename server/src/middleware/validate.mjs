import { HttpError } from '../lib/http-error.mjs';

/**
 * Validates `req[source]` against a zod schema and replaces it with the parsed
 * (typed, trimmed, defaulted) value. On failure responds with 400 and a
 * field-level breakdown; `message` stays a single human-readable sentence
 * because that is what the client renders.
 */
export const validate =
  (schema, source = 'body') =>
  (req, _res, next) => {
    const result = schema.safeParse(req[source] ?? {});

    if (!result.success) {
      const details = result.error.issues.map((issue) => ({
        field: issue.path.join('.') || source,
        message: issue.message,
      }));

      return next(
        HttpError.badRequest(details[0].message, {
          code: 'Validation Error',
          details,
        }),
      );
    }

    req[source] = result.data;
    return next();
  };
