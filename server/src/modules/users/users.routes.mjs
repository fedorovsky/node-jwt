import { Router } from 'express';
import { asyncHandler } from '../../lib/async-handler.mjs';

export function createUsersRouter({ controller, authenticate }) {
  const router = Router();

  router.get('/all', asyncHandler(controller.list));
  router.get('/me', authenticate, asyncHandler(controller.me));
  router.delete('/remove-all', asyncHandler(controller.removeAll));

  return router;
}
