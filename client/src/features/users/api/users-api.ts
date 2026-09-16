import { rootApi, ApiTags } from '@/shared/api/root-api';
import type { User } from '@/shared/types/user';

export const usersApi = rootApi.injectEndpoints({
  endpoints: builder => ({
    fetchUsers: builder.query<User[], void>({
      query: () => '/users/all',
      providesTags: [ApiTags.Users],
    }),
  }),
});

export const { useFetchUsersQuery, useLazyFetchUsersQuery } = usersApi;
