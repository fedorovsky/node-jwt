import { useFetchMyProfileQuery } from '@/features/profile/api/profile-api.ts';

export const ProfileViewPage = () => {
  const { data } = useFetchMyProfileQuery();

  return (
    <div>
      <h2 className="mb-4 text-4xl font-bold leading-tight tracking-tight text-gray-800">
        View
      </h2>
      {data && (
        <div>
          <div>id: {data.id}</div>
          <div>email: {data.email}</div>
          <div>username: {data.username}</div>
        </div>
      )}
    </div>
  );
};
