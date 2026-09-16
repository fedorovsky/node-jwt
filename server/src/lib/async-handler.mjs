/**
 * Express 4 does not forward rejected promises to the error middleware.
 * Wrapping async handlers keeps route code free of try/catch boilerplate.
 */
export const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};
