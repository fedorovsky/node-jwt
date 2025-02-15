import { configureStore } from '@reduxjs/toolkit';
import { authModule } from '@/features/auth';
import { rootApi } from '@/shared/api/root-api.ts';

export const store = configureStore({
  reducer: {
    [rootApi.reducerPath]: rootApi.reducer,
    [authModule.name]: authModule.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(rootApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
