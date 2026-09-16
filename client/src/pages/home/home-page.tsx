import { Link } from 'react-router-dom';
import { useAuth } from '@/features/auth';
import { ROUTES } from '@/shared/config/routes';
import { PageTitle } from '@/shared/ui/page-title';

const linkClassName = 'text-blue-500 hover:underline';

export const HomePage = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div>
      <PageTitle>Home</PageTitle>
      <p className="text-gray-700">
        A small React + Express playground for JWT authentication.
      </p>
      <p className="mt-2 text-gray-700">
        {isAuthenticated ? (
          <>
            You are signed in. Browse the{' '}
            <Link to={ROUTES.users} className={linkClassName}>
              users list
            </Link>{' '}
            or open your{' '}
            <Link to={ROUTES.profile} className={linkClassName}>
              profile
            </Link>
            .
          </>
        ) : (
          <>
            <Link to={ROUTES.login} className={linkClassName}>
              Log in
            </Link>{' '}
            or{' '}
            <Link to={ROUTES.register} className={linkClassName}>
              create an account
            </Link>{' '}
            to see protected pages.
          </>
        )}
      </p>
    </div>
  );
};
