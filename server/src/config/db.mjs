import knex from 'knex';
import knexConfig from '../../knexfile.cjs';

/**
 * Creates the knex instance. The knexfile stays CommonJS so the knex CLI can
 * load it for migrations; pass a custom config (e.g. in-memory) for tests.
 */
export function createDb(overrides = knexConfig.development) {
  return knex(overrides);
}
