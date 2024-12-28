import { rootApi } from '@/app/root-api.ts';

type User = {
  id: number;
  email: string;
  username: string;
};

export const userApi = rootApi.injectEndpoints({
  endpoints: builder => ({
    fetchUsers: builder.query<User[], void>({
      query: () => '/users',
      providesTags: ['User'],
    }),
    addUser: builder.mutation({
      query: newUser => ({
        url: '/users',
        method: 'POST',
        body: newUser,
      }),
      invalidatesTags: ['User'],
    }),
  }),
});

export const { useFetchUsersQuery, useAddUserMutation } = userApi;
