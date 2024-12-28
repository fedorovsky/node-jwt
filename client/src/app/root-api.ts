import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export enum ApiTags {
  Users = 'Users',
}

export const rootApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api', // Укажите базовый URL для вашего API
  }),
  tagTypes: Object.values(ApiTags), // Определите теги для обновления данных
  endpoints: () => ({}), // Здесь будет расширение эндпоинтов
});
