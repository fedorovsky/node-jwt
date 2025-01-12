import { Link } from 'react-router-dom';
import { useAuth } from '@/features/auth';
import { UserInfo } from './user-info';

export const Header = () => {
  const { isAuthenticated } = useAuth();

  return (
    <nav className="container mx-auto flex items-center justify-between p-4">
      <ul className="flex space-x-4">
        <li>
          <Link to="/" className="text-white hover:text-gray-400">
            Home
          </Link>
        </li>
        {isAuthenticated && (
          <li>
            <Link to="/profile" className="text-white hover:text-gray-400">
              Profile
            </Link>
            <ul className="ml-4 mt-2 space-y-2">
              <li>
                <Link
                  to="/profile/view"
                  className="text-gray-300 hover:text-white"
                >
                  Profile - View
                </Link>
              </li>
              <li>
                <Link
                  to="/profile/edit"
                  className="text-gray-300 hover:text-white"
                >
                  Profile - Edit
                </Link>
              </li>
            </ul>
          </li>
        )}
        <li>
          <Link to="/users" className="text-white hover:text-gray-400">
            Users
          </Link>
          <ul className="ml-4 mt-2 space-y-2">
            <li>
              <Link to="/users/list" className="text-gray-300 hover:text-white">
                Users - List
              </Link>
            </li>
          </ul>
        </li>
        <li>
          <Link to="/auth" className="text-white hover:text-gray-400">
            Auth
          </Link>
          <ul className="ml-4 mt-2 space-y-2">
            <li>
              <Link to="/auth/login" className="text-gray-300 hover:text-white">
                Auth - Login
              </Link>
            </li>
            <li>
              <Link
                to="/auth/register"
                className="text-gray-300 hover:text-white"
              >
                Auth - Register
              </Link>
            </li>
          </ul>
        </li>
      </ul>
      <UserInfo />
    </nav>
  );
};
