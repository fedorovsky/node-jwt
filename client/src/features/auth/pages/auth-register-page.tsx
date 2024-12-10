import { useForm, SubmitHandler } from 'react-hook-form';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/shared/components/ui/card.tsx';
import { Label } from '@/shared/components/ui/label.tsx';
import { Input } from '@/shared/components/ui/input.tsx';
import { Button } from '@/shared/components/ui/button.tsx';
import { Link } from 'react-router-dom';

interface FormValues {
  email: string;
  password: string;
  confirmPassword: string;
}

export const AuthRegisterPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch
  } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log('Form Data:', data);
  };

  return (
    <div className='flex items-center justify-center'>
      <Card>
        <CardHeader>
          <CardTitle>Register</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className='mb-4'>
              <Label htmlFor='email'>Email</Label>
              <Input
                type='email'
                id='email'
                placeholder='Enter your email'
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                    message: 'Invalid email format'
                  }
                })}
              ></Input>
              {errors.email && <p className='text-sm text-red-500 mt-1'>{errors.email.message}</p>}
            </div>
            <div className='mb-4'>
              <Label htmlFor='password'>Password</Label>
              <Input
                type='password'
                id='password'
                placeholder='Enter your password'
                {...register('password', {
                  required: 'Password is required',
                  minLength: {
                    value: 6,
                    message: 'Password must be at least 6 characters'
                  }
                })}
              />
              {errors.password && (
                <p className='text-sm text-red-500 mt-1'>{errors.password.message}</p>
              )}
            </div>
            <div className='mb-4'>
              <Label htmlFor='password'>Password</Label>
              <Input
                type='password'
                id='confirm-password'
                placeholder='Enter your password'
                {...register('confirmPassword', {
                  required: 'Confirm Password is required',
                  validate: (value) => value === watch('password') || 'Passwords do not match'
                })}
              />
              {errors.confirmPassword && (
                <p className='text-sm text-red-500 mt-1'>{errors.confirmPassword.message}</p>
              )}
            </div>
            <Button type='submit' className='w-full'>
              Register
            </Button>
          </form>
        </CardContent>
        <CardFooter>
          <p>
            Have an account?{' '}
            <Link to='/auth/login' className='text-blue-500 hover:underline'>
              Login
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};
