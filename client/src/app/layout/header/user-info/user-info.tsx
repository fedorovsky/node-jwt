import { Link } from 'react-router-dom';
import { useAuth } from '@/features/auth';
import { useFetchMyProfileQuery } from '@/features/profile/api/profile-api.ts';

export const UserInfo = () => {
  const { isAuthenticated } = useAuth();

  const { data } = useFetchMyProfileQuery(undefined, {
    skip: !isAuthenticated,
  });

  return isAuthenticated ? (
    <Link to="/profile/view" className="flex items-center space-x-2">
      <img
        src="https://avatar.iran.liara.run/public"
        alt="User Avatar"
        className="h-10 w-10 rounded-full"
      />
      <span className="text-white">{data?.username}</span>
    </Link>
  ) : null;
};
