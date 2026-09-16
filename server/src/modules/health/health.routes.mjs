import { Router } from 'express';
import { asyncHandler } from '../../lib/async-handler.mjs';

export function createHealthRouter({ db }) {
  const router = Router();

  router.get(
    '/',
    asyncHandler(async (_req, res) => {
      await db.raw('select 1');
      res.status(200).json({
        status: 'ok',
        uptime: Math.round(process.uptime()),
        timestamp: new Date().toISOString(),
      });
    }),
  );

  return router;
}
