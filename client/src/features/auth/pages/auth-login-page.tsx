import { SubmitHandler, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { Input } from '@/shared/components/ui/input.tsx';
import { Label } from '@/shared/components/ui/label.tsx';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from '@/shared/components/ui/card.tsx';
import { Button } from '@/shared/components/ui/button.tsx';
import { useLoginMutation, useLogoutMutation } from '../api/auth-api.ts';

interface FormValues {
  email: string;
  password: string;
}

export const AuthLoginPage = () => {
  const [loginUser, { isLoading, isError, error }] = useLoginMutation();
  const [logoutUser] = useLogoutMutation();

  console.log('=======');
  console.log('isError', isError);
  console.log('ErrorFromServer', error);
  console.log('=======');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = data => {
    console.log('Form Data:', data);
    loginUser({ email: data.email, password: data.password });
  };

  const handleLogout = () => {
    logoutUser();
  };

  return (
    <div className="flex items-center justify-center">
      <Card>
        <CardHeader>
          <CardTitle>Login</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className="mb-4">
              <Label htmlFor="email">Email</Label>
              <Input
                type="email"
                id="email"
                placeholder="Enter your email"
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                    message: 'Invalid email format',
                  },
                })}
              ></Input>
              {errors.email && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div className="mb-4">
              <Label htmlFor="password">Password</Label>
              <Input
                type="password"
                id="password"
                placeholder="Enter your password"
                {...register('password', {
                  required: 'Password is required',
                  minLength: {
                    value: 6,
                    message: 'Password must be at least 6 characters',
                  },
                })}
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              Login
            </Button>
            <Button
              type="button"
              className="mt-2 w-full"
              onClick={handleLogout}
            >
              Logout
            </Button>
          </form>
        </CardContent>
        <CardFooter>
          <p>
            Don't have an account?{' '}
            <Link to="/auth/register" className="text-blue-500 hover:underline">
              Register
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};
