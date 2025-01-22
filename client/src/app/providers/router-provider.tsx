import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from '@/app/layout/layout';
import { ProfileRoutes } from '@/pages/profile';
import { AuthRoutes } from '@/pages/auth';
import { UsersRoutes } from '@/pages/users';
import { HomePage } from '@/pages/home';

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
