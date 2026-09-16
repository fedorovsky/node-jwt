import { Router } from 'express';
import { asyncHandler } from '../../lib/async-handler.mjs';
import { validate } from '../../middleware/validate.mjs';
import { updateProfileSchema } from './users.schemas.mjs';

export function createUsersRouter({ controller, authenticate }) {
  const router = Router();

  router.get('/all', asyncHandler(controller.list));
  router.get('/me', authenticate, asyncHandler(controller.me));
  router.patch(
    '/me',
    authenticate,
    validate(updateProfileSchema),
    asyncHandler(controller.updateMe),
  );
  router.delete('/remove-all', asyncHandler(controller.removeAll));

  return router;
}
