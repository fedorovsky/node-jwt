import { Link } from 'react-router-dom';
import { useFetchMyProfileQuery } from '@/features/profile';
import { ROUTES } from '@/shared/config/routes';
import { Button } from '@/shared/styled-system/components/ui/button';
import { PageTitle } from '@/shared/ui/page-title';

export const ProfileViewPage = () => {
  const { data: profile, isLoading, isError } = useFetchMyProfileQuery();

  return (
    <div>
      <PageTitle>Profile</PageTitle>
      {isLoading && <p>Loading…</p>}
      {isError && <p className="text-red-600">Failed to load profile.</p>}
      {profile && (
        <>
          <dl className="grid max-w-md grid-cols-[auto_1fr] gap-x-6 gap-y-2">
            <dt className="text-gray-500">ID</dt>
            <dd>{profile.id}</dd>
            <dt className="text-gray-500">Email</dt>
            <dd>{profile.email}</dd>
            <dt className="text-gray-500">Username</dt>
            <dd>{profile.username}</dd>
          </dl>
          <Button asChild variant="outline" className="mt-4">
            <Link to={ROUTES.profileEdit}>Edit profile</Link>
          </Button>
        </>
      )}
    </div>
  );
};
