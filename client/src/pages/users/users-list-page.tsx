import { useFetchUsersQuery, UsersTable } from '@/features/users';
import { PageTitle } from '@/shared/ui/page-title';

export const UsersListPage = () => {
  const { data: users, isLoading, isError } = useFetchUsersQuery();

  return (
    <div>
      <PageTitle>Users</PageTitle>
      {isLoading && <p>Loading…</p>}
      {isError && <p className="text-red-600">Failed to load users.</p>}
      {users && <UsersTable users={users} className="mt-2" />}
    </div>
  );
};
