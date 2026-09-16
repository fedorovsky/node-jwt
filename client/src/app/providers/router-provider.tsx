import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Layout } from '@/app/layout';
import { AuthRoutes } from '@/pages/auth';
import { HomePage } from '@/pages/home';
import { ProfileRoutes } from '@/pages/profile';
import { UsersRoutes } from '@/pages/users';

export const RouterProvider = () => (
  <BrowserRouter>
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="auth/*" element={<AuthRoutes />} />
        <Route path="profile/*" element={<ProfileRoutes />} />
        <Route path="users/*" element={<UsersRoutes />} />
      </Route>
    </Routes>
  </BrowserRouter>
);
