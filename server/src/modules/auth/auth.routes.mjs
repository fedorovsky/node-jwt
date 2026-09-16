import { Router } from 'express';
import { asyncHandler } from '../../lib/async-handler.mjs';
import { validate } from '../../middleware/validate.mjs';
import { credentialsSchema } from './auth.schemas.mjs';

export function createAuthRouter({ controller }) {
  const router = Router();

  router.post(
    '/register',
    validate(credentialsSchema),
    asyncHandler(controller.register),
  );
  router.post(
    '/login',
    validate(credentialsSchema),
    asyncHandler(controller.login),
  );
  router.post('/validate-token', asyncHandler(controller.validateToken));

  return router;
}
