import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from '@/app/layout/layout.tsx';
import { ProfileRoutes } from '@/features/profile';
import { AuthRoutes } from '@/features/auth';
import { UsersRoutes } from '@/features/users';
import { HomePage } from '@/features/home';

export const RouterProvider = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/auth/*" element={<AuthRoutes />} />
          <Route path="/profile/*" element={<ProfileRoutes />} />
          <Route path="/users/*" element={<UsersRoutes />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
