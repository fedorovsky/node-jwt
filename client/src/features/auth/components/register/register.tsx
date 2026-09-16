import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/shared/styled-system/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/shared/styled-system/components/ui/card';
import { Input } from '@/shared/styled-system/components/ui/input';
import { Label } from '@/shared/styled-system/components/ui/label';
import { ROUTES } from '@/shared/config/routes';
import { EMAIL_PATTERN } from '@/shared/utils/email';
import { useAuth } from '../../hooks/use-auth';
import { PASSWORD_MIN_LENGTH } from '../../constants';
import { FieldError } from '../ui/field-error';
import { FormError } from '../ui/form-error';

interface RegisterFormValues {
  email: string;
  password: string;
  confirmPassword: string;
}

export const Register = () => {
  const navigate = useNavigate();
  const { signUp, isLoading, error, dismissError } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>();

  useEffect(() => dismissError, [dismissError]);

  const onSubmit = handleSubmit(async ({ email, password }) => {
    const ok = await signUp({ email, password });
    if (ok) navigate(ROUTES.profile, { replace: true });
  });

  return (
    <div className="flex justify-center">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Register</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit} noValidate>
            <FormError message={error} />

            <div className="mb-4">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                autoComplete="email"
                placeholder="Enter your email"
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: EMAIL_PATTERN,
                    message: 'Invalid email format',
                  },
                })}
              />
              <FieldError message={errors.email?.message} />
            </div>

            <div className="mb-4">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                autoComplete="new-password"
                placeholder="Create a password"
                {...register('password', {
                  required: 'Password is required',
                  minLength: {
                    value: PASSWORD_MIN_LENGTH,
                    message: `Password must be at least ${PASSWORD_MIN_LENGTH} characters`,
                  },
                })}
              />
              <FieldError message={errors.password?.message} />
            </div>

            <div className="mb-4">
              <Label htmlFor="confirm-password">Confirm password</Label>
              <Input
                id="confirm-password"
                type="password"
                autoComplete="new-password"
                placeholder="Repeat the password"
                {...register('confirmPassword', {
                  required: 'Please confirm your password',
                  validate: (value, { password }) =>
                    value === password || 'Passwords do not match',
                })}
              />
              <FieldError message={errors.confirmPassword?.message} />
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Creating account…' : 'Register'}
            </Button>
          </form>
        </CardContent>
        <CardFooter>
          <p className="text-sm">
            Have an account?{' '}
            <Link to={ROUTES.login} className="text-blue-500 hover:underline">
              Login
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};
