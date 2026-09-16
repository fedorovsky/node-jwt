import { Link } from 'react-router-dom';
import { useFetchMyProfileQuery } from '@/features/profile';
import { ROUTES } from '@/shared/config/routes';

/** Current user's initial and name; rendered only for authenticated users. */
export const UserInfo = () => {
  const { data: profile } = useFetchMyProfileQuery();

  if (!profile) return null;

  return (
    <Link to={ROUTES.profile} className="flex items-center gap-2">
      <span
        aria-hidden
        className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary text-sm font-semibold uppercase text-secondary-foreground"
      >
        {profile.username.charAt(0)}
      </span>
      <span>{profile.username}</span>
    </Link>
  );
};
