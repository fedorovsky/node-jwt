import { z } from 'zod';

export const PASSWORD_MIN_LENGTH = 6;
export const PASSWORD_MAX_LENGTH = 128;

export const emailSchema = z
  .string({ error: 'Valid email is required' })
  .trim()
  .toLowerCase()
  .email('Valid email is required')
  .max(254, 'Email is too long');

export const passwordSchema = z
  .string({ error: 'Password is required' })
  .min(
    PASSWORD_MIN_LENGTH,
    `Password must be at least ${PASSWORD_MIN_LENGTH} characters`,
  )
  .max(
    PASSWORD_MAX_LENGTH,
    `Password must be at most ${PASSWORD_MAX_LENGTH} characters`,
  );

export const credentialsSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

export const emailOnlySchema = z.object({
  email: emailSchema,
});
