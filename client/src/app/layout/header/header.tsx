import { NavLink } from 'react-router-dom';
import { useAuth } from '@/features/auth';
import { ROUTES } from '@/shared/config/routes';
import { Button } from '@/shared/styled-system/components/ui/button';
import { cn } from '@/shared/styled-system/lib/utils';
import { UserInfo } from './user-info';

interface NavItem {
  to: string;
  label: string;
}

const publicLinks: NavItem[] = [{ to: ROUTES.home, label: 'Home' }];
const privateLinks: NavItem[] = [
  { to: ROUTES.users, label: 'Users' },
  { to: ROUTES.profile, label: 'Profile' },
];
const guestLinks: NavItem[] = [
  { to: ROUTES.login, label: 'Login' },
  { to: ROUTES.register, label: 'Register' },
];

const linkClassName = ({ isActive }: { isActive: boolean }) =>
  cn('hover:text-gray-300', isActive && 'font-semibold underline');

export const Header = () => {
  const { isAuthenticated, signOut } = useAuth();
  const links = [
    ...publicLinks,
    ...(isAuthenticated ? privateLinks : guestLinks),
  ];

  return (
    <nav className="container mx-auto flex items-center justify-between p-4">
      <ul className="flex items-center gap-4">
        {links.map(({ to, label }) => (
          <li key={to}>
            <NavLink to={to} className={linkClassName}>
              {label}
            </NavLink>
          </li>
        ))}
      </ul>

      {isAuthenticated && (
        <div className="flex items-center gap-4">
          <UserInfo />
          <Button variant="secondary" size="sm" onClick={() => signOut()}>
            Logout
          </Button>
        </div>
      )}
    </nav>
  );
};
