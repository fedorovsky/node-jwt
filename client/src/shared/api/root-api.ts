import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { tokenStorage } from '@/shared/lib/token-storage';

export const ApiTags = {
  Users: 'Users',
  Profile: 'Profile',
} as const;

export const rootApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api',
    prepareHeaders: headers => {
      const token = tokenStorage.get();
      if (token) headers.set('Authorization', `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: Object.values(ApiTags),
  endpoints: () => ({}),
});
