const PUBLIC_COLUMNS = ['id', 'email', 'username'];

/**
 * All SQL for the `users` table lives here. Callers never see the password
 * hash unless they explicitly ask for credentials.
 */
export function createUsersRepository(db) {
  const table = () => db('users');

  return {
    findAll() {
      return table().select(PUBLIC_COLUMNS).orderBy('id', 'asc');
    },

    findById(id) {
      return table().select(PUBLIC_COLUMNS).where({ id }).first();
    },

    findByEmail(email) {
      return table().select(PUBLIC_COLUMNS).where({ email }).first();
    },

    /** Includes the password hash; for authentication only. */
    findCredentialsByEmail(email) {
      return table()
        .select([...PUBLIC_COLUMNS, 'password'])
        .where({ email })
        .first();
    },

    existsByEmail(email) {
      return table()
        .where({ email })
        .first('id')
        .then((row) => Boolean(row));
    },

    async create({ email, passwordHash, username }) {
      const [id] = await table().insert({
        email,
        password: passwordHash,
        username,
      });
      return { id, email, username };
    },

    deleteAll() {
      return table().del();
    },
  };
}
