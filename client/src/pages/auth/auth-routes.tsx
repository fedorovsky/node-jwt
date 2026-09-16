import { Navigate, Route, Routes } from 'react-router-dom';
import { Login, Register } from '@/features/auth';
import { ROUTES } from '@/shared/config/routes';

export const AuthRoutes = () => (
  <Routes>
    <Route path="login" element={<Login />} />
    <Route path="register" element={<Register />} />
    <Route path="*" element={<Navigate to={ROUTES.login} replace />} />
  </Routes>
);
