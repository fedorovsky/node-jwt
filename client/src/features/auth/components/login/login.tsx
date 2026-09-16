import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
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

interface LoginFormValues {
  email: string;
  password: string;
}

export const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { signIn, isLoading, error, dismissError } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>();

  // Do not carry an error from a previous attempt into a fresh form.
  useEffect(() => dismissError, [dismissError]);

  const onSubmit = handleSubmit(async values => {
    const ok = await signIn(values);
    if (ok) {
      const from = (location.state as { from?: Location } | null)?.from;
      navigate(from?.pathname ?? ROUTES.profile, { replace: true });
    }
  });

  return (
    <div className="flex justify-center">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Login</CardTitle>
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
                autoComplete="current-password"
                placeholder="Enter your password"
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

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Signing in…' : 'Login'}
            </Button>
          </form>
        </CardContent>
        <CardFooter>
          <p className="text-sm">
            Don&apos;t have an account?{' '}
            <Link
              to={ROUTES.register}
              className="text-blue-500 hover:underline"
            >
              Register
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};
