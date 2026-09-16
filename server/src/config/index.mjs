/**
 * Application settings. Kept in code for now; when they move to environment
 * variables this is the only module that has to change.
 */
const defaults = Object.freeze({
  nodeEnv: 'development',
  host: '0.0.0.0',
  port: 3000,
  jwt: Object.freeze({
    secret: 'your_secret_key',
    expiresIn: '1h',
  }),
  bcryptSaltRounds: 10,
  corsOrigin: '*',
});

export function createConfig(overrides = {}) {
  const merged = {
    ...defaults,
    ...overrides,
    jwt: { ...defaults.jwt, ...overrides.jwt },
  };

  return Object.freeze({
    ...merged,
    isProduction: merged.nodeEnv === 'production',
    isTest: merged.nodeEnv === 'test',
  });
}

export const config = createConfig();
