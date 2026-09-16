import bcrypt from 'bcryptjs';
import { faker } from '@faker-js/faker';
import { HttpError } from '../../lib/http-error.mjs';

/**
 * Business rules for registration and login. Knows nothing about HTTP.
 */
export function createAuthService({ users, tokenService, bcryptSaltRounds }) {
  const generateUsername = () => faker.internet.username();

  // Hash of a throwaway string; compared against when the user is missing so
  // response timing does not reveal whether an email is registered.
  const dummyHash = bcrypt.hashSync('not-a-real-password', bcryptSaltRounds);

  return {
    async register({ email, password }) {
      if (await users.existsByEmail(email)) {
        throw HttpError.conflict('User already exists');
      }

      const passwordHash = await bcrypt.hash(password, bcryptSaltRounds);
      const user = await users.create({
        email,
        passwordHash,
        username: generateUsername(),
      });

      const token = await tokenService.issueForUser(user);
      return { user, token };
    },

    async login({ email, password }) {
      const record = await users.findCredentialsByEmail(email);

      const hash = record?.password ?? dummyHash;
      const isValid = await bcrypt.compare(password, hash);

      if (!record || !isValid) {
        throw HttpError.unauthorized('Invalid credentials');
      }

      const { password: _omit, ...user } = record;
      const token = await tokenService.issueForUser(user);
      return { user, token };
    },

    async refreshToken(user) {
      return tokenService.issueForUser(user);
    },
  };
}
