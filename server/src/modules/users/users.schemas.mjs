import { z } from 'zod';

export const USERNAME_MIN_LENGTH = 3;
export const USERNAME_MAX_LENGTH = 32;

export const usernameSchema = z
  .string({ error: 'Username is required' })
  .trim()
  .min(
    USERNAME_MIN_LENGTH,
    `Username must be at least ${USERNAME_MIN_LENGTH} characters`,
  )
  .max(
    USERNAME_MAX_LENGTH,
    `Username must be at most ${USERNAME_MAX_LENGTH} characters`,
  )
  .regex(
    /^[A-Za-z0-9._-]+$/,
    'Username may contain letters, digits, dots, underscores and hyphens',
  );

export const updateProfileSchema = z
  .object({
    username: usernameSchema.optional(),
  })
  .refine((body) => Object.keys(body).length > 0, {
    message: 'Nothing to update',
  });
