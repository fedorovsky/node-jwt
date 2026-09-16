import { rootApi, ApiTags } from '@/shared/api/root-api';
import type { User } from '@/shared/types/user';

export interface UpdateProfileInput {
  username: string;
}

export const profileApi = rootApi.injectEndpoints({
  endpoints: builder => ({
    fetchMyProfile: builder.query<User, void>({
      query: () => '/users/me',
      providesTags: [ApiTags.Profile],
    }),
    updateMyProfile: builder.mutation<User, UpdateProfileInput>({
      query: body => ({ url: '/users/me', method: 'PATCH', body }),
      // The users list shows usernames too, so refresh both.
      invalidatesTags: [ApiTags.Profile, ApiTags.Users],
    }),
  }),
});

export const { useFetchMyProfileQuery, useUpdateMyProfileMutation } =
  profileApi;
