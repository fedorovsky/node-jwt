import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

import { createTokenService } from './lib/token-service.mjs';
import { createAuthenticate } from './middleware/authenticate.mjs';
import {
  createErrorHandler,
  notFoundHandler,
} from './middleware/error-handler.mjs';
import { createUsersRepository } from './modules/users/users.repository.mjs';
import { createUsersController } from './modules/users/users.controller.mjs';
import { createUsersRouter } from './modules/users/users.routes.mjs';
import { createAuthService } from './modules/auth/auth.service.mjs';
import { createAuthController } from './modules/auth/auth.controller.mjs';
import { createAuthRouter } from './modules/auth/auth.routes.mjs';
import { createHealthRouter } from './modules/health/health.routes.mjs';

/**
 * Builds the Express application from explicit dependencies. Nothing here
 * opens connections or reads global state, which keeps the app testable with
 * an in-memory database and any configuration.
 */
export function createApp({ config, db, logger = console }) {
  // --- Composition root -----------------------------------------------------
  const users = createUsersRepository(db);
  const tokenService = createTokenService(config.jwt);
  const authService = createAuthService({
    users,
    tokenService,
    bcryptSaltRounds: config.bcryptSaltRounds,
  });
  const authenticate = createAuthenticate({ tokenService, users });

  const authController = createAuthController({
    authService,
    tokenService,
    users,
  });
  const usersController = createUsersController({ users });

  // --- Application ----------------------------------------------------------
  const app = express();

  app.disable('x-powered-by');

  app.use(helmet());
  app.use(
    cors({
      origin: config.corsOrigin === '*' ? true : config.corsOrigin.split(','),
    }),
  );
  app.use(express.json({ limit: '16kb' }));

  if (!config.isTest) {
    app.use(morgan(config.isProduction ? 'combined' : 'dev'));
  }

  app.use('/health', createHealthRouter({ db }));
  app.use('/auth', createAuthRouter({ controller: authController }));
  app.use(
    '/users',
    createUsersRouter({ controller: usersController, authenticate }),
  );
  app.get('/protected', authenticate, usersController.protectedDemo);

  app.use(notFoundHandler);
  app.use(createErrorHandler({ logger, exposeStack: !config.isProduction }));

  return app;
}
