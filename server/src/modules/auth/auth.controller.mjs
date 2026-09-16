import { resolveUserFromRequest } from '../../middleware/authenticate.mjs';

export function createAuthController({ authService, tokenService, users }) {
  return {
    async register(req, res) {
      const { token } = await authService.register(req.body);
      res.status(201).json({ message: 'User registered successfully', token });
    },

    async login(req, res) {
      const { token } = await authService.login(req.body);
      res.status(200).json({ message: 'Login successful', token });
    },

    async checkEmail(req, res) {
      const exists = await authService.isEmailRegistered(req.body.email);
      res.status(200).json({
        exists,
        message: exists ? 'Email is already registered' : 'Email is available',
      });
    },

    async validateToken(req, res) {
      const user = await resolveUserFromRequest(req, { tokenService, users });
      const token = await authService.refreshToken(user);
      res.status(200).json({
        message: 'Token is valid and has been renewed.',
        token,
      });
    },
  };
}
