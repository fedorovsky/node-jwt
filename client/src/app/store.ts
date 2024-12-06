import { configureStore } from '@reduxjs/toolkit';
import { authModule } from '@/features/auth';

export const store = configureStore({
  reducer: {
    [authModule.name]: authModule.reducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
