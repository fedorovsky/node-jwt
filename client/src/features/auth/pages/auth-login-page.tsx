import { SubmitHandler, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
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
import { useAppDispatch } from '@/shared/hooks/use-app-dispatch.ts';
import { thunks } from '../redux';

interface FormValues {
  email: string;
  password: string;
}

export const AuthLoginPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = async data => {
    console.log('Form Data:', data);

    const resultAction = await dispatch(
      thunks.login({ email: data.email, password: data.password }),
    );

    if (thunks.login.fulfilled.match(resultAction)) {
      navigate('/');
    } else {
      console.error(
        'Login failed:',
        resultAction.payload || resultAction.error,
      );
    }
  };

  const handleLogin = () => {
    dispatch(
      thunks.login({
        email: 'anton.fedorovsky@gmail.com',
        password: '123123',
      }),
    );
  };

  const handleRegister = () => {
    dispatch(
      thunks.register({
        email: `anton.fedorovsky+${Date.now()}@gmail.com`,
        password: '123123',
      }),
    );
  };

  const handleLogout = () => {
    dispatch(thunks.logout());
  };

  return (
    <div className="flex flex-col items-center justify-center gap-1">
      <Button onClick={handleLogin}>login</Button>
      <Button onClick={handleRegister}>register</Button>
      <Button onClick={handleLogout}>logout</Button>
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
            <Button type="submit" className="w-full" disabled={false}>
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
