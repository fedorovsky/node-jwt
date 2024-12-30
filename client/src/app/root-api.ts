import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export enum ApiTags {
  Users = 'Users',
  Profile = 'Profile',
}

export const rootApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api', // Укажите базовый URL для вашего API
    prepareHeaders: headers => {
      const token = localStorage.getItem('token'); // Забираем токен из localStorage
      if (token) {
        headers.set('Authorization', `Bearer ${token}`); // Прокидываем токен в заголовки
      }
      return headers;
    },
  }),
  tagTypes: Object.values(ApiTags), // Определите теги для обновления данных
  endpoints: () => ({}), // Здесь будет расширение эндпоинтов
});
