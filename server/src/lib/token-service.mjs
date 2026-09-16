import { SignJWT, jwtVerify, errors as joseErrors } from 'jose';

export class TokenExpiredError extends Error {
  constructor() {
    super('Token has expired');
    this.name = 'TokenExpiredError';
  }
}

export class TokenInvalidError extends Error {
  constructor() {
    super('Token is invalid');
    this.name = 'TokenInvalidError';
  }
}

/**
 * Thin wrapper around jose that owns the signing key and algorithm, so the
 * rest of the app never touches raw JWT primitives.
 */
export function createTokenService({ secret, expiresIn }) {
  const key = new TextEncoder().encode(secret);
  const algorithm = 'HS256';

  return {
    /**
     * @param {{ id: number, email: string }} user
     */
    async issueForUser(user) {
      return new SignJWT({ email: user.email })
        .setProtectedHeader({ alg: algorithm })
        .setSubject(String(user.id))
        .setIssuedAt()
        .setExpirationTime(expiresIn)
        .sign(key);
    },

    /**
     * @returns {Promise<{ sub?: string, email?: string }>}
     */
    async verify(token) {
      try {
        const { payload } = await jwtVerify(token, key, {
          algorithms: [algorithm],
        });
        return payload;
      } catch (err) {
        if (err instanceof joseErrors.JWTExpired) {
          throw new TokenExpiredError();
        }
        throw new TokenInvalidError();
      }
    },
  };
}
