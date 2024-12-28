import { rootApi, ApiTags } from '@/app/root-api.ts';

type User = {
  id: number;
  email: string;
  username: string;
};

export const userApi = rootApi.injectEndpoints({
  endpoints: builder => ({
    fetchUsers: builder.query<User[], void>({
      query: () => '/users',
      providesTags: [ApiTags.Users],
    }),
    addUser: builder.mutation({
      query: newUser => ({
        url: '/users',
        method: 'POST',
        body: newUser,
      }),
      invalidatesTags: [ApiTags.Users],
    }),
  }),
});

export const { useFetchUsersQuery, useAddUserMutation } = userApi;
