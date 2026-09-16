import { Navigate, Route, Routes } from 'react-router-dom';
import { ProtectedRoute } from '@/features/auth';
import { ROUTES } from '@/shared/config/routes';
import { UsersListPage } from './users-list-page';

export const UsersRoutes = () => (
  <ProtectedRoute>
    <Routes>
      <Route path="list" element={<UsersListPage />} />
      <Route path="*" element={<Navigate to={ROUTES.users} replace />} />
    </Routes>
  </ProtectedRoute>
);
