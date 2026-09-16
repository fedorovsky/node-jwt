import { HttpError } from '../lib/http-error.mjs';
import { TokenExpiredError } from '../lib/token-service.mjs';

const BEARER_PREFIX = /^Bearer\s+(.+)$/i;

export function extractBearerToken(req) {
  const header = req.headers.authorization;
  if (typeof header !== 'string') return null;
  const match = header.match(BEARER_PREFIX);
  return match ? match[1].trim() : null;
}

/**
 * Resolves the user behind a bearer token or fails with a specific 401.
 * Shared by the auth middleware and the validate-token endpoint so both
 * behave identically.
 */
export async function resolveUserFromRequest(req, { tokenService, users }) {
  const token = extractBearerToken(req);

  if (!token) {
    throw HttpError.unauthorized('Authentication token is missing or invalid.');
  }

  let payload;
  try {
    payload = await tokenService.verify(token);
  } catch (err) {
    if (err instanceof TokenExpiredError) {
      throw HttpError.unauthorized(
        'The authentication token has expired. Please log in again.',
        { code: 'Token Expired' },
      );
    }
    throw HttpError.unauthorized('Authentication token is invalid.');
  }

  // Tokens issued by the previous implementation carry only `email`.
  const user = payload.sub
    ? await users.findById(Number(payload.sub))
    : payload.email
      ? await users.findByEmail(payload.email)
      : null;

  if (!user) {
    throw HttpError.unauthorized('Authentication failed. User not found.');
  }

  return user;
}

export function createAuthenticate(deps) {
  return async (req, _res, next) => {
    try {
      req.user = await resolveUserFromRequest(req, deps);
      next();
    } catch (err) {
      next(err);
    }
  };
}
