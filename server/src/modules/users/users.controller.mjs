export function createUsersController({ users }) {
  return {
    async list(_req, res) {
      res.status(200).json(await users.findAll());
    },

    async me(req, res) {
      const { id, email, username } = req.user;
      res.status(200).json({ id, email, username });
    },

    async removeAll(_req, res) {
      const deleted = await users.deleteAll();
      res.status(200).json({
        message: 'All users have been deleted successfully.',
        deleted,
      });
    },

    /** Legacy demo endpoint kept for backwards compatibility. */
    async protectedDemo(_req, res) {
      res.status(200).json({
        message: 'This is a protected route',
        users: await users.findAll(),
      });
    },
  };
}
