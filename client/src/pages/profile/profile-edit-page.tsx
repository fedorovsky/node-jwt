import { useNavigate } from 'react-router-dom';
import { EditProfileForm, useFetchMyProfileQuery } from '@/features/profile';
import { ROUTES } from '@/shared/config/routes';
import { PageTitle } from '@/shared/ui/page-title';

export const ProfileEditPage = () => {
  const navigate = useNavigate();
  const { data: profile, isLoading, isError } = useFetchMyProfileQuery();

  return (
    <div>
      <PageTitle>Edit profile</PageTitle>
      {isLoading && <p>Loading…</p>}
      {isError && <p className="text-red-600">Failed to load profile.</p>}
      {profile && (
        <EditProfileForm
          key={profile.username}
          profile={profile}
          onSaved={() => navigate(ROUTES.profile)}
          onCancel={() => navigate(ROUTES.profile)}
        />
      )}
    </div>
  );
};
