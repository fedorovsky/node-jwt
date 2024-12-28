import { rootApi } from '@/app/root-api';

export interface RegisterRequest {
  email: string;
  password: string;
}

export interface RegisterResponse {
  message: string;
  token: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  message: string;
  token: string;
}

export const authApi = rootApi.injectEndpoints({
  endpoints: builder => ({
    register: builder.mutation<RegisterResponse, RegisterRequest>({
      query: data => ({
        url: 'auth/register',
        method: 'POST',
        body: data,
      }),
      async onQueryStarted(_, { queryFulfilled, dispatch }) {
        try {
          const { data } = await queryFulfilled;
          if (data.token) {
            dispatch(rootApi.util.invalidateTags(['Users']));
            localStorage.setItem('token', data.token);
          }
        } catch (error) {
          console.error('Error:', error);
        }
      },
    }),
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: data => ({
        url: 'auth/login',
        method: 'POST',
        body: data,
      }),
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data.token) {
            localStorage.setItem('token', data.token);
          }
        } catch (error) {
          console.error('Error:', error);
        }
      },
    }),
    logout: builder.mutation<void, void>({
      queryFn: async () => {
        localStorage.removeItem('token'); // Удаляем токен из localStorage
        return { data: undefined }; // Успешное завершение запроса
      },
    }),
  }),
  overrideExisting: false, // Позволяет избежать замены существующих эндпоинтов
});

export const { useRegisterMutation, useLoginMutation, useLogoutMutation } =
  authApi;