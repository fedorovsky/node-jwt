import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export enum ApiTags {
  Users = 'Users',
  Profile = 'Profile',
}

export const rootApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api',
    prepareHeaders: headers => {
      const token = localStorage.getItem('token');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: Object.values(ApiTags),
  endpoints: () => ({}),
});
